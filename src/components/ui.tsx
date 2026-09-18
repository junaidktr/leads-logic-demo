import { useEffect, useState, type ReactNode } from "react";
import { cx, heatOf, initials, SOURCES } from "../lib/types";
import type { Stage } from "../lib/types";
import { I } from "./icons";
import { useStore } from "../state/store";

export function Avatar({ name, hue, size = 32 }: { name: string; hue: number; size?: number }) {
  return <div className="flex shrink-0 items-center justify-center rounded-full font-bold text-white/95 select-none" style={{ width: size, height: size, fontSize: size * 0.36, background: `linear-gradient(135deg, hsl(${hue} 38% 38%), hsl(${hue + 30} 42% 26%))` }}>{initials(name)}</div>;
}

const TONES: Record<string, string> = { ok: "bg-oksoft text-ok border-ok/25", warn: "bg-warnsoft text-warn border-warn/25", danger: "bg-dangersoft text-danger border-danger/25", info: "bg-coldsoft text-cold border-cold/25", neutral: "bg-mint/70 text-moss border-line", gold: "bg-goldsoft text-gold2 border-gold/30" };

export function Badge({ tone = "neutral", children, className }: { tone?: string; children: ReactNode; className?: string }) {
  return <span className={cx("chip", TONES[tone] ?? TONES.neutral, className)}>{children}</span>;
}

export function HeatBadge({ score, size = "md" }: { score: number; size?: "sm" | "md" }) {
  const h = heatOf(score);
  return <span className={cx("inline-flex items-center gap-1 rounded-full border font-bold tracking-wide", size === "sm" ? "px-1.5 py-px text-[10px]" : "px-2 py-0.5 text-[11px]")} style={{ color: h.color, background: h.soft, borderColor: "transparent" }}><I n={h.icon} size={size === "sm" ? 11 : 13} sw={2.2} />{h.label} {score}</span>;
}

export function SourceChip({ source }: { source: string }) {
  const meta = SOURCES[source];
  return <span className="chip" style={{ borderLeft: `3px solid ${meta?.color ?? "#888"}` }}>{source}</span>;
}

export function StagePill({ id, stages }: { id: string; stages: Stage[] }) {
  const st = stages.find((x) => x.id === id);
  const tone = st?.tone === "won" ? "bg-oksoft text-ok" : st?.tone === "lost" ? "bg-dangersoft text-danger" : st?.tone === "late" ? "bg-goldsoft text-gold2" : st?.tone === "start" ? "bg-coldsoft text-cold" : "bg-mint text-moss";
  return <span className={cx("chip border-transparent", tone)}>{st?.label ?? id}</span>;
}

export function Modal({ open, onClose, title, children, wide }: { open: boolean; onClose: () => void; title: ReactNode; children: ReactNode; wide?: boolean }) {
  useEffect(() => { const h = (e: KeyboardEvent) => e.key === "Escape" && onClose(); if (open) window.addEventListener("keydown", h); return () => window.removeEventListener("keydown", h); }, [open, onClose]);
  if (!open) return null;
  return <div className="fixed inset-0 z-[70] flex items-start justify-center overflow-y-auto bg-ink/55 p-4 pt-[8vh] anim-in" onMouseDown={onClose}><div className={cx("card anim-up w-full shadow-[var(--shadow-pop)]", wide ? "max-w-2xl" : "max-w-lg")} onMouseDown={(e) => e.stopPropagation()}><div className="flex items-center justify-between border-b border-line px-5 py-3.5"><h3 className="font-display text-[16px] font-bold">{title}</h3><button onClick={onClose} className="rounded-md p-1.5 text-slate hover:bg-mint"><I n="x" size={16} /></button></div><div className="p-5">{children}</div></div></div>;
}

export function Toggle({ on, onChange }: { on: boolean; onChange: (v: boolean) => void }) {
  return <button onClick={() => onChange(!on)} className="relative rounded-full transition-colors duration-200" style={{ height: 22, width: 40, background: on ? "var(--color-fern)" : "var(--color-line2)" }} role="switch" aria-checked={on}><span className="absolute top-0.5 rounded-full bg-card shadow transition-all duration-200" style={{ height: 18, width: 18, left: on ? 20 : 2 }} /></button>;
}

export function Seg<T extends string>({ options, value, onChange }: { options: { v: T; label: string }[]; value: T; onChange: (v: T) => void }) {
  return <div className="inline-flex rounded-lg border border-line bg-mint/50 p-0.5">{options.map((o) => <button key={o.v} onClick={() => onChange(o.v)} className={cx("rounded-md px-3 py-1.5 text-[12.5px] font-semibold transition-all", value === o.v ? "bg-card text-ink shadow-sm" : "text-slate hover:text-ink")}>{o.label}</button>)}</div>;
}

export function EmptyState({ icon, title, sub }: { icon: string; title: string; sub?: string }) {
  return <div className="flex flex-col items-center justify-center gap-2 py-12 text-center"><div className="flex h-12 w-12 items-center justify-center rounded-xl bg-mint text-moss"><I n={icon} size={22} /></div><p className="font-display text-[15px] font-bold">{title}</p>{sub && <p className="max-w-xs text-[12.5px] text-slate">{sub}</p>}</div>;
}

export function Toasts() {
  const { s, d } = useStore();
  useEffect(() => { if (s.toasts.length === 0) return; const timers = s.toasts.map((t) => setTimeout(() => d({ t: "untoast", id: t.id }), 4600)); return () => timers.forEach(clearTimeout); }, [s.toasts, d]);
  const icons = { success: "check", info: "radar", warn: "warning", danger: "warning" } as const;
  const colors = { success: "border-ok/40 text-ok", info: "border-cold/40 text-cold", warn: "border-warn/40 text-warn", danger: "border-danger/40 text-danger" } as const;
  return <div className="pointer-events-none fixed bottom-5 right-5 z-[80] flex w-[340px] flex-col gap-2">{s.toasts.map((t) => <div key={t.id} className={cx("card anim-left pointer-events-auto flex items-start gap-2.5 border-l-4 px-3.5 py-3 shadow-[var(--shadow-pop)]", colors[t.kind])}><I n={icons[t.kind]} size={16} className="mt-0.5 shrink-0" sw={2.2} /><p className="flex-1 text-[12.5px] font-medium text-ink">{t.text}</p><button onClick={() => d({ t: "untoast", id: t.id })} className="text-slate hover:text-ink"><I n="x" size={13} /></button></div>)}</div>;
}

export function Meter({ value, color = "var(--color-fern)", className }: { value: number; color?: string; className?: string }) {
  return <div className={cx("h-1.5 overflow-hidden rounded-full bg-mint", className)}><div className="h-full rounded-full transition-all duration-500" style={{ width: `${Math.min(100, value)}%`, background: color }} /></div>;
}

export function InventoryBar({ total, available }: { total: number; available: number }) {
  const sold = total - available;
  return <div className="flex h-2 overflow-hidden rounded-full bg-mint"><div className="bar-grow h-full bg-gold" style={{ width: `${(sold / total) * 100}%` }} /><div className="h-full bg-fern/70" style={{ width: `${(available / total) * 100}%` }} /></div>;
}

export function Sparkline({ data, w = 120, h = 34, color = "var(--color-fern)" }: { data: number[]; w?: number; h?: number; color?: string }) {
  const max = Math.max(...data, 1);
  const pts = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - 3 - (v / max) * (h - 8)}`).join(" ");
  return <svg width={w} height={h} className="overflow-visible"><polyline points={pts} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ strokeDasharray: 400, animation: "drawLine 1s ease forwards" }} /><polygon points={`0,${h} ${pts} ${w},${h}`} fill={color} opacity="0.08" /></svg>;
}

export function HBars({ rows, fmt, color }: { rows: { label: string; value: number; color?: string }[]; fmt: (n: number) => string; color?: string }) {
  const max = Math.max(...rows.map((r) => r.value), 1);
  return <div className="flex flex-col gap-2.5">{rows.map((r, i) => <div key={r.label} className="grid grid-cols-[110px_1fr_44px] items-center gap-2.5"><span className="truncate text-[12px] font-semibold text-slate">{r.label}</span><div className="h-2.5 overflow-hidden rounded-full bg-mint/80"><div className="bar-grow h-full rounded-full" style={{ width: `${(r.value / max) * 100}%`, background: r.color ?? color ?? "var(--color-fern)", animationDelay: `${i * 60}ms` }} /></div><span className="num text-right text-[12px] font-semibold">{fmt(r.value)}</span></div>)}</div>;
}

export function Funnel({ rows, fmt }: { rows: { label: string; value: number }[]; fmt: (n: number) => string }) {
  const max = Math.max(...rows.map((r) => r.value), 1);
  return <div className="flex flex-col gap-1.5">{rows.map((r, i) => { const w = Math.max(14, (r.value / max) * 100); const conv = i > 0 && rows[i - 1].value > 0 ? Math.round((r.value / rows[i - 1].value) * 100) : 100; return <div key={r.label} className="flex items-center gap-3"><span className="w-28 shrink-0 truncate text-right text-[11.5px] font-semibold text-slate">{r.label}</span><div className="relative h-7 flex-1"><div className="bar-grow flex h-full items-center rounded-r-md rounded-l-sm" style={{ width: `${w}%`, background: `linear-gradient(90deg, hsl(${160 - i * 9} 45% ${34 + i * 2}%), hsl(${150 - i * 9} 42% ${42 + i * 2}%))`, animationDelay: `${i * 70}ms` }} /><span className="num absolute left-full ml-2 top-1/2 -translate-y-1/2 text-[11.5px] font-bold">{fmt(r.value)}</span></div><span className="num w-10 shrink-0 text-right text-[10.5px] text-slate2">{i > 0 ? `${conv}%` : ""}</span></div>; })}</div>;
}

export function Donut({ segments, size = 132, label, sub }: { segments: { label: string; value: number; color: string }[]; size?: number; label: string; sub?: string }) {
  const total = Math.max(segments.reduce((a, s) => a + s.value, 0), 1);
  const r = size / 2 - 10; const c = 2 * Math.PI * r; let acc = 0;
  return <div className="flex items-center gap-4"><div className="relative" style={{ width: size, height: size }}><svg width={size} height={size} className="-rotate-90"><circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--color-mint)" strokeWidth="13" />{segments.map((s) => { const frac = s.value / total; const off = acc; acc += frac; return <circle key={s.label} cx={size / 2} cy={size / 2} r={r} fill="none" stroke={s.color} strokeWidth="13" strokeDasharray={`${frac * c} ${c}`} strokeDashoffset={-off * c} strokeLinecap="butt" style={{ transition: "stroke-dasharray .6s ease" }} />; })}</svg><div className="absolute inset-0 flex flex-col items-center justify-center"><span className="num text-[19px] font-bold leading-none">{label}</span>{sub && <span className="lbl mt-1">{sub}</span>}</div></div><div className="flex flex-col gap-1.5">{segments.map((s) => <div key={s.label} className="flex items-center gap-2 text-[12px] font-semibold text-slate"><span className="h-2.5 w-2.5 rounded-sm" style={{ background: s.color }} />{s.label}<span className="num ml-auto pl-3 text-ink">{s.value}</span></div>)}</div></div>;
}

export function PageHeader({ title, kicker, right }: { title: string; kicker?: string; right?: React.ReactNode }) {
  return <div className="mb-5 flex flex-wrap items-end justify-between gap-3"><div>{kicker && <p className="lbl mb-1 text-gold2">{kicker}</p>}<h1 className="font-display text-[24px] font-bold leading-none tracking-tight">{title}</h1></div>{right && <div className="flex items-center gap-2">{right}</div>}</div>;
}

export const NAV_GROUPS = [
  { label: "Command Center", items: [{ key: "dashboard", label: "Dashboard", icon: "dashboard", page: "dashboard", access: "dashboard" }, { key: "leads", label: "Leads", icon: "leads", page: "leads", access: "leads" }, { key: "pipeline", label: "Pipeline Board", icon: "pipeline", page: "pipeline", access: "pipeline" }] },
  { label: "Customers", items: [{ key: "buyers", label: "Buyers", icon: "key", page: "contacts", param: "buyers", access: "contacts" }, { key: "tenants", label: "Tenants", icon: "door", page: "contacts", param: "tenants", access: "contacts" }, { key: "owners", label: "Owners", icon: "owner", page: "contacts", param: "owners", access: "contacts" }] },
  { label: "Portfolio", items: [{ key: "properties", label: "Properties", icon: "building", page: "portfolio", param: "properties", access: "portfolio" }, { key: "projects", label: "Projects", icon: "project", page: "portfolio", param: "projects", access: "portfolio" }, { key: "developers", label: "Developers", icon: "skyline", page: "portfolio", param: "developers", access: "portfolio" }, { key: "communities", label: "Communities", icon: "pins", page: "portfolio", param: "communities", access: "portfolio" }] },
  { label: "Activity", items: [{ key: "viewings", label: "Viewings & Calendar", icon: "eye", page: "viewings", param: "list", access: "viewings" }, { key: "deals", label: "Deals & Commissions", icon: "briefcase", page: "deals", param: "deals", access: "deals" }, { key: "rental", label: "Rental Contracts", icon: "contract", page: "rental", access: "rental" }, { key: "comms", label: "WhatsApp & Comms", icon: "bubble", page: "comms", param: "whatsapp", access: "comms" }] },
  { label: "Growth", items: [{ key: "marketing", label: "Campaigns", icon: "megaphone", page: "marketing", param: "campaigns", access: "marketing" }, { key: "landing", label: "Landing Pages", icon: "landing", page: "marketing", param: "landing", access: "marketing" }, { key: "reports", label: "Source ROI & Reports", icon: "chart", page: "reports", param: "roi", access: "marketing" }, { key: "team", label: "Team", icon: "users", page: "team", access: "team" }] },
  { label: "System", items: [{ key: "integrations", label: "Integrations", icon: "plug", page: "integrations", access: "integrations" }, { key: "rera", label: "RERA / DLD", icon: "shield", page: "rera", access: "integrations" }, { key: "automation", label: "Automation", icon: "bolt", page: "automation", access: "automation" }, { key: "audit", label: "Audit Logs", icon: "audit", page: "audit", access: "audit" }, { key: "settings", label: "Settings", icon: "gear", page: "settings", access: "settings" }] },
];

export function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { s, nav } = useStore();
  const ROLE_ACCESS: Record<string, string[]> = { "Managing Director": ["*"], "Sales Manager": ["*"], "Sales Agent": ["dashboard", "leads", "pipeline", "contacts", "portfolio", "viewings", "deals", "comms", "marketing", "team", "automation", "settings"], "Leasing Agent": ["dashboard", "leads", "pipeline", "contacts", "portfolio", "viewings", "deals", "comms", "rental", "team", "settings"], "Listing Agent": ["dashboard", "contacts", "portfolio", "viewings", "comms", "team", "settings"], "Marketing Manager": ["dashboard", "leads", "marketing", "team", "integrations", "automation", "settings"], Telecaller: ["dashboard", "leads", "comms", "team"], "Accounts / Finance": ["dashboard", "deals", "team", "settings"], "Admin / Operations": ["*"], Viewer: ["dashboard"] };
  const access = ROLE_ACCESS[s.user.role] ?? ROLE_ACCESS["Sales Agent"];
  const allowed = (a: string) => access.includes("*") || access.includes(a);
  const unassigned = s.leads.filter((l) => !l.assignedTo && !["won", "lost", "not_interested"].includes(l.stage)).length;
  const isActive = (it: any) => s.route.page === it.page && (it.param === undefined || s.route.param === it.param);
  return <><div className="fixed inset-0 z-40 bg-ink/50 lg:hidden" onClick={onClose} /><aside className={`sidebar-grain fixed inset-y-0 left-0 z-50 flex w-[236px] flex-col bg-pine text-mint transition-transform duration-300 lg:translate-x-0 lg:static ${open ? "translate-x-0" : "-translate-x-full"}`}><div className="flex items-center gap-3 px-5 pb-4 pt-5"><div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gold/15 ring-1 ring-gold/40"><svg width="18" height="18" viewBox="0 0 32 32" fill="none"><path d="M9 7v18h14" stroke="var(--color-gold)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" /><circle cx="23" cy="9" r="3.2" fill="var(--color-gold)" /></svg></div><div><p className="font-display text-[15.5px] font-bold leading-tight tracking-tight text-white">Leads Logic</p><p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-gold/90">Estate CRM · Dubai</p></div></div><nav className="flex-1 overflow-y-auto px-3 pb-4">{NAV_GROUPS.filter((g) => g.items.some((it) => allowed(it.access))).map((g) => <div key={g.label} className="mb-1.5"><p className="px-2 py-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-mint/40">{g.label}</p>{g.items.filter((it) => allowed(it.access)).map((it) => { const active = isActive(it); const badge = it.key === "leads" ? unassigned : 0; return <button key={it.key} onClick={() => { nav(it.page, it.param); onClose(); }} className={`group relative mb-0.5 flex w-full items-center gap-2.5 rounded-lg px-2.5 py-[7.5px] text-left text-[13px] font-semibold transition-all ${active ? "bg-white/8 text-white" : "text-mint/75 hover:bg-white/5 hover:text-white"}`}>{active && <span className="absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-r bg-gold" />}<I n={it.icon} size={16.5} className={active ? "text-gold" : "text-mint/50 group-hover:text-mint/80"} /><span className="flex-1 truncate">{it.label}</span>{badge > 0 && <span className="num rounded-full bg-hot/20 px-1.5 py-px text-[10px] font-bold text-[#ff9b82]">{badge}</span>}</button>; })}</div>)}</nav><div className="border-t border-white/8 px-4 py-3"><div className="mb-2 flex items-center gap-2 rounded-lg bg-white/4 px-2.5 py-2"><span className={`pulse-dot h-2 w-2 rounded-full ${s.liveFeed ? "bg-gold" : "bg-mint/30"}`} /><div className="flex-1 leading-tight"><p className="text-[11px] font-bold text-white/90">Lead Ingestion Engine</p><p className="text-[10px] text-mint/50">{s.liveFeed ? "Listening · live webhooks" : "Paused"}</p></div></div><p className="text-[10px] leading-relaxed text-mint/35">Asia/Dubai · AED · v2.4.0<br />RERA-compliant architecture</p></div></aside></>;
}

export function Topbar({ onMenu }: { onMenu: () => void }) {
  const { s, d, nav } = useStore();
  const [q, setQ] = useState(""); const [focus, setFocus] = useState(false); const [bellOpen, setBellOpen] = useState(false); const [userOpen, setUserOpen] = useState(false);
  const unread = s.notifs.filter((n) => !n.read).length;
  const results = q.trim().length >= 2 ? { leads: s.leads.filter((l) => [l.name, l.phone, l.email ?? "", l.id, l.area].some((x) => x.toLowerCase().includes(q.toLowerCase()))).slice(0, 5), properties: s.properties.filter((p) => [p.title, p.id, p.listingId, p.community].some((x) => x.toLowerCase().includes(q.toLowerCase()))).slice(0, 4) } : null;
  return <header className="sticky top-0 z-30 border-b border-line bg-paper/90 backdrop-blur"><div className="flex items-center gap-3 px-4 py-2.5 lg:px-6"><button className="rounded-lg border border-line bg-card p-2 text-slate lg:hidden" onClick={onMenu}><I n="more" size={16} /></button><div className="hidden min-w-0 md:block"><p className="lbl text-[9.5px] leading-none text-gold2">Dubai Real Estate Sales OS</p><h2 className="font-display text-[16px] font-bold leading-tight tracking-tight">Command Center</h2></div><div className="relative ml-auto w-full max-w-[420px]"><I n="search" size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate2" /><input value={q} onChange={(e) => setQ(e.target.value)} onFocus={() => setFocus(true)} onBlur={() => setTimeout(() => setFocus(false), 150)} placeholder="Search leads, phone, property, project…" className="input pl-9 pr-14" /><kbd className="num pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 rounded border border-line bg-mint/60 px-1.5 py-px text-[10px] text-slate">⌘K</kbd>{focus && results && <div className="card anim-up absolute left-0 right-0 top-full z-40 mt-1.5 max-h-[420px] overflow-y-auto p-1.5 shadow-[var(--shadow-pop)]">{results.leads.length + results.properties.length === 0 && <p className="px-3 py-4 text-center text-[12.5px] text-slate">No matches for "{q}".</p>}{results.leads.length > 0 && <p className="lbl px-2.5 pb-1 pt-2">Leads</p>}{results.leads.map((l) => <button key={l.id} onMouseDown={() => { nav("lead", l.id); setQ(""); }} className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-left hover:bg-mint/70"><I n="leads" size={14} className="text-fern" /><span className="flex-1 truncate text-[12.5px] font-semibold">{l.name}</span></button>)}{results.properties.length > 0 && <p className="lbl px-2.5 pb-1 pt-2">Properties</p>}{results.properties.map((p) => <button key={p.id} onMouseDown={() => { nav("portfolio", `properties:${p.id}`); setQ(""); }} className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-left hover:bg-mint/70"><I n="building" size={14} className="text-moss" /><span className="flex-1 truncate text-[12.5px] font-semibold">{p.title}</span></button>)}</div>}</div><button onClick={() => d({ t: "setLiveFeed", on: !s.liveFeed })} className={`relative rounded-lg border p-2 transition-colors ${s.liveFeed ? "border-gold/50 bg-goldsoft text-gold2" : "border-line bg-card text-slate"}`}><I n="radar" size={16} />{s.liveFeed && <span className="pulse-dot absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-gold" />}</button><div className="relative"><button onClick={() => { setBellOpen(!bellOpen); setUserOpen(false); }} className="relative rounded-lg border border-line bg-card p-2 text-slate hover:text-ink"><I n="bell" size={16} />{unread > 0 && <span className="num absolute -right-1.5 -top-1.5 flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-hot px-1 text-[10px] font-bold text-white" style={{ height: 18, minWidth: 18 }}>{unread}</span>}</button>{bellOpen && <div className="card anim-up absolute right-0 top-full z-40 mt-1.5 w-[360px] shadow-[var(--shadow-pop)]"><div className="flex items-center justify-between border-b border-line px-4 py-2.5"><p className="font-display text-[13.5px] font-bold">Notifications</p><button className="text-[11.5px] font-semibold text-fern hover:underline" onClick={() => d({ t: "markNotifs" })}>Mark all read</button></div><div className="max-h-[380px] overflow-y-auto p-1.5">{s.notifs.map((n) => <div key={n.id} className={`flex items-start gap-2.5 rounded-lg px-2.5 py-2 ${!n.read ? "bg-mint/50" : ""}`}><span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${n.read ? "bg-line2" : "bg-gold"}`} /><div className="min-w-0"><p className="text-[12px] font-medium leading-snug">{n.text}</p></div></div>)}</div></div>}</div><div className="relative"><button onClick={() => { setUserOpen(!userOpen); setBellOpen(false); }} className="flex items-center gap-2 rounded-lg border border-line bg-card py-1 pl-1 pr-2.5 hover:border-line2"><Avatar name={s.user.name} hue={s.user.hue} size={28} /><span className="hidden text-left leading-tight sm:block"><span className="block text-[12px] font-bold">{s.user.name}</span><span className="block text-[10px] font-semibold uppercase tracking-wide text-slate2">{s.user.role}</span></span><I n="chevD" size={13} className="text-slate" /></button>{userOpen && <div className="card anim-up absolute right-0 top-full z-40 mt-1.5 w-[280px] p-1.5 shadow-[var(--shadow-pop)]"><p className="lbl px-2.5 pb-1 pt-1.5">Switch role</p>{s.users.filter((u) => ["Managing Director", "Sales Manager", "Sales Agent", "Leasing Agent", "Marketing Manager", "Admin / Operations", "Viewer"].includes(u.role)).map((u) => <button key={u.id} onClick={() => { d({ t: "setUser", id: u.id }); setUserOpen(false); }} className={`flex w-full items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-left hover:bg-mint/70 ${u.id === s.user.id ? "bg-mint" : ""}`}><Avatar name={u.name} hue={u.hue} size={26} /><span className="flex-1 leading-tight"><span className="block text-[12.5px] font-bold">{u.name}</span><span className="block text-[10.5px] text-slate">{u.role}</span></span>{u.id === s.user.id && <I n="check" size={14} className="text-fern" />}</button>)}</div>}</div></div></header>;
}
