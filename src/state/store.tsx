import { createContext, useContext, useEffect, useMemo, useReducer, useRef, type ReactNode } from "react";
import type { Lead, Notif, Route, SourceTouch, TeamUser, Toast, WebhookEvent, Weights } from "../lib/types";
import { scoreLead, uid } from "../lib/types";
import {
  AUDIT, BOARD_STAGES, CALLS, CAMPAIGNS, COMMUNITIES, DEALS, DEVELOPERS, DOCS, EMAILS, EMAIL_TEMPLATES,
  INTEGRATIONS, LANDING_PAGES, LEADS, LIVE_SOURCES, LIVE_TEMPLATES, NOTIFS, OWNERS, PROJECTS, PROPERTIES,
  RENTAL_CONTRACTS, RERA_INTEGRATIONS, RULES, SLA_DEFAULT, STAGES, TASKS, THREADS, UNITS, USERS, VIEWINGS,
  WA_AUTOMATIONS, WEBHOOKS, WEIGHTS_DEFAULT,
} from "../data/seed";

export interface State {
  user: TeamUser; users: TeamUser[]; route: Route; leads: Lead[]; properties: typeof PROPERTIES; projects: typeof PROJECTS;
  developers: typeof DEVELOPERS; communities: typeof COMMUNITIES; owners: typeof OWNERS; viewings: typeof VIEWINGS;
  deals: typeof DEALS; campaigns: typeof CAMPAIGNS; integrations: typeof INTEGRATIONS; webhooks: typeof WEBHOOKS;
  rules: typeof RULES; audit: typeof AUDIT; notifs: typeof NOTIFS; stages: typeof STAGES; boardStages: string[];
  threads: typeof THREADS; tasks: typeof TASKS; calls: typeof CALLS; emails: typeof EMAILS; docs: typeof DOCS;
  toasts: Toast[]; liveFeed: boolean; weights: Weights; sla: number; dir: "ltr" | "rtl";
  units: typeof UNITS; landingPages: typeof LANDING_PAGES; rentalContracts: typeof RENTAL_CONTRACTS;
  reraIntegrations: typeof RERA_INTEGRATIONS; emailTemplates: typeof EMAIL_TEMPLATES; waAutomations: typeof WA_AUTOMATIONS;
}

export type Action =
  | { t: "nav"; route: Route } | { t: "setUser"; id: string } | { t: "toast"; toast: Toast } | { t: "untoast"; id: number }
  | { t: "moveStage"; id: string; stage: string } | { t: "assign"; id: string; agentId: string | null }
  | { t: "updateLead"; id: string; patch: Partial<Lead> } | { t: "addLead"; lead: Lead; webhook?: WebhookEvent }
  | { t: "mergeLead"; id: string; touch: SourceTouch; text: string } | { t: "addViewing"; viewing: any }
  | { t: "viewingStatus"; id: string; status: any; feedback?: string } | { t: "addTask"; task: any }
  | { t: "toggleTask"; id: string } | { t: "toggleIntegration"; id: string } | { t: "webhook"; ev: WebhookEvent }
  | { t: "webhookRetry"; id: string } | { t: "toggleRule"; id: string } | { t: "addCommunity"; c: any }
  | { t: "renameStage"; id: string; label: string } | { t: "setWeights"; w: Weights } | { t: "setSla"; v: number }
  | { t: "setDir"; dir: "ltr" | "rtl" } | { t: "markNotifs" } | { t: "notify"; n: Notif }
  | { t: "sendWA"; leadId: string; text: string } | { t: "logCall"; call: any } | { t: "convertEmail"; id: string }
  | { t: "setLiveFeed"; on: boolean } | { t: "ingest"; lead: Lead; webhook: WebhookEvent; notif: Notif }
  | { t: "audit"; e: any } | { t: "toggleAvail"; id: string } | { t: "reset" };

const seedState = (): State => ({
  user: USERS[1], users: USERS, route: { page: "dashboard" }, leads: LEADS, properties: PROPERTIES, projects: PROJECTS,
  developers: DEVELOPERS, communities: COMMUNITIES, owners: OWNERS, viewings: VIEWINGS, deals: DEALS, campaigns: CAMPAIGNS,
  integrations: INTEGRATIONS, webhooks: WEBHOOKS, rules: RULES, audit: AUDIT, notifs: NOTIFS, stages: STAGES,
  boardStages: BOARD_STAGES, threads: THREADS, tasks: TASKS, calls: CALLS, emails: EMAILS, docs: DOCS, toasts: [],
  liveFeed: true, weights: WEIGHTS_DEFAULT, sla: SLA_DEFAULT, dir: "ltr", units: UNITS, landingPages: LANDING_PAGES,
  rentalContracts: RENTAL_CONTRACTS, reraIntegrations: RERA_INTEGRATIONS, emailTemplates: EMAIL_TEMPLATES,
  waAutomations: WA_AUTOMATIONS,
});

function reducer(s: State, a: Action): State {
  switch (a.t) {
    case "nav": return { ...s, route: a.route };
    case "setUser": { const u = s.users.find((x) => x.id === a.id); return u ? { ...s, user: u, route: { page: "dashboard" } } : s; }
    case "toast": return { ...s, toasts: [...s.toasts, a.toast].slice(-4) };
    case "untoast": return { ...s, toasts: s.toasts.filter((t) => t.id !== a.id) };
    case "moveStage": {
      const lead = s.leads.find((l) => l.id === a.id);
      if (!lead || lead.stage === a.stage) return s;
      const label = s.stages.find((st) => st.id === a.stage)?.label ?? a.stage;
      const leads = s.leads.map((l) => l.id === a.id ? { ...l, stage: a.stage, firstContactMin: l.firstContactMin ?? (a.stage === "contacted" || a.stage === "attempted" ? Math.max(1, Math.round((Date.now() - l.receivedAt) / 60000)) : l.firstContactMin), activities: [{ id: uid("a"), at: Date.now(), kind: "stage" as const, text: `Stage → ${label}`, user: s.user.name }, ...l.activities] } : l);
      return { ...s, leads };
    }
    case "assign": {
      const lead = s.leads.find((l) => l.id === a.id);
      if (!lead) return s;
      const agent = s.users.find((u) => u.id === a.agentId);
      const leads = s.leads.map((l) => l.id === a.id ? { ...l, assignedTo: a.agentId, activities: [{ id: uid("a"), at: Date.now(), kind: "assign" as const, text: agent ? `Assigned to ${agent.name}` : "Unassigned", user: s.user.name }, ...l.activities] } : l);
      return { ...s, leads };
    }
    case "updateLead": return { ...s, leads: s.leads.map((l) => l.id === a.id ? { ...l, ...a.patch } : l) };
    case "addLead": return { ...s, leads: [a.lead, ...s.leads], webhooks: a.webhook ? [a.webhook, ...s.webhooks].slice(0, 40) : s.webhooks };
    case "mergeLead": {
      const lead = s.leads.find((l) => l.id === a.id);
      if (!lead) return s;
      const leads = s.leads.map((l) => l.id === a.id ? { ...l, touches: [...l.touches, a.touch], whatsappEngaged: a.touch.source === "WhatsApp" ? true : l.whatsappEngaged, activities: [{ id: uid("a"), at: Date.now(), kind: "system" as const, text: a.text, user: "Duplicate Engine" }, ...l.activities] } : l);
      return { ...s, leads };
    }
    case "addViewing": {
      const leads = s.leads.map((l) => l.id === a.viewing.leadId ? { ...l, viewingRequested: true, activities: [{ id: uid("a"), at: Date.now(), kind: "viewing" as const, text: `Viewing scheduled · ${a.viewing.date} ${a.viewing.time}`, user: s.user.name }, ...l.activities] } : l);
      return { ...s, viewings: [a.viewing, ...s.viewings], leads };
    }
    case "viewingStatus": return { ...s, viewings: s.viewings.map((v) => v.id === a.id ? { ...v, status: a.status, feedback: a.feedback ?? v.feedback } : v) };
    case "addTask": return { ...s, tasks: [a.task, ...s.tasks] };
    case "toggleTask": return { ...s, tasks: s.tasks.map((t) => t.id === a.id ? { ...t, done: !t.done } : t) };
    case "toggleIntegration": return { ...s, integrations: s.integrations.map((i) => i.id === a.id ? { ...i, status: i.status === "Connected" ? "Off" as const : "Connected" as const, lastSync: i.status === "Connected" ? i.lastSync : Date.now() } : i) };
    case "webhook": return { ...s, webhooks: [a.ev, ...s.webhooks].slice(0, 40) };
    case "webhookRetry": return { ...s, webhooks: s.webhooks.map((wh) => wh.id === a.id ? { ...wh, status: "Processed" as const, error: undefined } : wh) };
    case "toggleRule": return { ...s, rules: s.rules.map((r) => r.id === a.id ? { ...r, active: !r.active } : r) };
    case "addCommunity": return { ...s, communities: [...s.communities, a.c] };
    case "renameStage": return { ...s, stages: s.stages.map((st) => st.id === a.id ? { ...st, label: a.label } : st) };
    case "setWeights": return { ...s, weights: a.w };
    case "setSla": return { ...s, sla: a.v };
    case "setDir": return { ...s, dir: a.dir };
    case "markNotifs": return { ...s, notifs: s.notifs.map((n) => ({ ...n, read: true })) };
    case "notify": return { ...s, notifs: [a.n, ...s.notifs].slice(0, 30) };
    case "sendWA": {
      const existing = s.threads.find((t) => t.leadId === a.leadId);
      const msg = { from: "us" as const, text: a.text, at: Date.now(), status: "Sent" as const };
      const threads = existing ? s.threads.map((t) => t.leadId === a.leadId ? { ...t, messages: [...t.messages, msg] } : t) : [{ leadId: a.leadId, messages: [msg] }, ...s.threads];
      const leads = s.leads.map((l) => l.id === a.leadId ? { ...l, whatsappEngaged: true, activities: [{ id: uid("a"), at: Date.now(), kind: "whatsapp" as const, text: `WhatsApp sent: "${a.text.slice(0, 60)}${a.text.length > 60 ? "…" : ""}"`, user: s.user.name }, ...l.activities] } : l);
      return { ...s, threads, leads };
    }
    case "logCall": {
      const leads = a.call.leadId ? s.leads.map((l) => l.id === a.call.leadId ? { ...l, firstContactMin: l.firstContactMin ?? Math.max(1, Math.round((Date.now() - l.receivedAt) / 60000)), activities: [{ id: uid("a"), at: Date.now(), kind: "call" as const, text: `Outgoing call · ${Math.floor(a.call.duration / 60)}m ${a.call.duration % 60}s · ${a.call.outcome}`, user: s.user.name }, ...l.activities] } : l) : s.leads;
      return { ...s, calls: [a.call, ...s.calls], leads };
    }
    case "convertEmail": return { ...s, emails: s.emails.map((e) => e.id === a.id ? { ...e, converted: true } : e) };
    case "setLiveFeed": return { ...s, liveFeed: a.on };
    case "ingest": return { ...s, leads: [a.lead, ...s.leads], webhooks: [a.webhook, ...s.webhooks].slice(0, 40), notifs: [a.notif, ...s.notifs].slice(0, 30) };
    case "audit": return { ...s, audit: [{ id: uid("AU"), at: Date.now(), ...a.e }, ...s.audit].slice(0, 80) };
    case "toggleAvail": { const users = s.users.map((u) => u.id === a.id ? { ...u, available: !u.available } : u); return { ...s, users, user: s.user.id === a.id ? users.find((u) => u.id === a.id)! : s.user }; }
    case "reset": return { ...seedState(), route: s.route, user: s.user };
    default: return s;
  }
}

const PERSIST_KEYS: (keyof State)[] = ["leads", "users", "communities", "viewings", "deals", "integrations", "webhooks", "rules", "notifs", "stages", "threads", "tasks", "calls", "emails", "weights", "sla", "audit", "user", "liveFeed", "units", "landingPages", "rentalContracts", "reraIntegrations", "emailTemplates", "waAutomations"];

function load(): State {
  const base = seedState();
  try {
    const raw = localStorage.getItem("leadslogic-v1");
    if (!raw) return base;
    const saved = JSON.parse(raw) as Partial<State>;
    const b = base as unknown as Record<string, unknown>;
    for (const k of PERSIST_KEYS) { if (saved[k] !== undefined) b[k] = saved[k]; }
    return base;
  } catch { return base; }
}

interface Ctx { s: State; d: (a: Action) => void; toast: (kind: Toast["kind"], text: string) => void; score: (l: Lead) => number; nav: (page: string, param?: string) => void; }
const StoreCtx = createContext<Ctx | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [s, d] = useReducer(reducer, undefined, load);
  const sRef = useRef(s); sRef.current = s;
  const liveIdx = useRef(0);

  useEffect(() => {
    const t: Partial<State> = {};
    for (const k of PERSIST_KEYS) (t as Record<string, unknown>)[k] = s[k];
    try { localStorage.setItem("leadslogic-v1", JSON.stringify(t)); } catch { /* ignore */ }
  }, [s]);

  useEffect(() => { document.documentElement.dir = s.dir; }, [s.dir]);

  useEffect(() => {
    const iv = setInterval(() => {
      const st = sRef.current;
      if (!st.liveFeed) return;
      const tpl = LIVE_TEMPLATES[liveIdx.current % LIVE_TEMPLATES.length];
      const [source, event] = LIVE_SOURCES[liveIdx.current % LIVE_SOURCES.length];
      liveIdx.current += 1;
      const receivedAt = Date.now();
      const agents = st.users.filter((u) => ["Sales Agent", "Leasing Agent"].includes(u.role) && u.available);
      const agent = tpl.type === "Tenant" ? agents.find((u) => u.role === "Leasing Agent") ?? agents[0] : agents.find((u) => u.areas.includes(tpl.area ?? "")) ?? agents[liveIdx.current % agents.length];
      const lead: Lead = {
        id: `LD-${1021 + st.leads.length}`, name: tpl.name ?? "New Lead", phone: tpl.phone ?? "+971 50 000 0000",
        email: undefined, nationality: tpl.nationality ?? "—", country: tpl.country ?? "UAE", language: "EN",
        type: tpl.type ?? "Buyer", purpose: tpl.purpose ?? "Investment", budget: tpl.budget ?? 1000000,
        area: tpl.area ?? "Dubai Marina", propertyType: tpl.propertyType ?? "Apartment", bedrooms: tpl.bedrooms ?? 1,
        timeline: tpl.timeline ?? "1–3 months", cash: tpl.cash ?? false, mortgageApproved: tpl.mortgageApproved,
        furnished: tpl.furnished, stage: "new", assignedTo: agent?.id ?? null, receivedAt, firstContactMin: null,
        touches: [{ source, at: receivedAt, sourceLeadId: `${source.slice(0, 2).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}` }],
        activities: [{ id: uid("a"), at: receivedAt, kind: "system" as const, text: `Lead captured from ${source}`, user: "Integration Engine" }, ...(agent ? [{ id: uid("a"), at: receivedAt + 500, kind: "assign" as const, text: `Auto-assigned to ${agent.name}`, user: "Automation Engine" }] : [])],
      };
      const sc = scoreLead(lead, st.weights);
      d({ t: "ingest", lead, webhook: { id: uid("WH"), source, event, status: "Processed", at: receivedAt, detail: `${event} → ${lead.name}`, leadId: lead.id }, notif: { id: uid("N"), kind: "lead", text: `New ${sc >= 80 ? "HOT" : ""} lead from ${source}: ${lead.name}${agent ? ` → ${agent.name}` : " — unassigned"}`, at: receivedAt, read: false } });
      d({ t: "toast", toast: { id: Date.now(), kind: "info", text: `⚡ ${source} webhook → ${lead.name} ingested & scored ${sc}` } });
    }, 22000);
    return () => clearInterval(iv);
  }, []);

  const value = useMemo<Ctx>(() => ({ s, d, toast: (kind, text) => d({ t: "toast", toast: { id: Date.now() + Math.random(), kind, text } }), score: (l) => scoreLead(l, s.weights), nav: (page, param) => d({ t: "nav", route: { page, param } }) }), [s]);

  return <StoreCtx.Provider value={value}>{children}</StoreCtx.Provider>;
}

export function useStore() { const ctx = useContext(StoreCtx); if (!ctx) throw new Error("store"); return ctx; }
