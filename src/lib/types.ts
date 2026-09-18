export type ChannelKind = "portal" | "social" | "search" | "direct" | "meta" | "chat";

export interface SourceTouch { source: string; at: number; campaign?: string; sourceLeadId?: string; listingId?: string }
export type ActivityKind = "call" | "whatsapp" | "email" | "note" | "stage" | "assign" | "viewing" | "system" | "offer" | "task" | "document";
export interface Activity { id: string; at: number; kind: ActivityKind; text: string; user: string }

export interface Lead {
  id: string; name: string; phone: string; email?: string; nationality: string; country: string; language: string;
  type: "Buyer" | "Tenant"; purpose: "Investment" | "End User" | "Rent"; budget: number; area: string;
  propertyType: string; bedrooms: number; timeline: "Immediate" | "1–3 months" | "3–6 months" | "Exploring";
  cash: boolean; mortgageApproved?: boolean; furnished?: "Furnished" | "Unfurnished" | "Either"; moveIn?: string;
  employer?: string; stage: string; assignedTo: string | null; receivedAt: number; firstContactMin: number | null;
  touches: SourceTouch[]; utm?: { source?: string; medium?: string; campaign?: string }; gclid?: string;
  interestPropertyId?: string; interestProjectId?: string; viewingRequested?: boolean; whatsappEngaged?: boolean;
  message?: string; activities: Activity[];
}

export interface Property {
  id: string; listingId: string; title: string; type: string; purpose: "Sale" | "Rent"; status: "Active" | "Reserved" | "Sold" | "Let";
  community: string; building: string; developer: string; ownerId: string; agentId: string; beds: number; baths: number;
  sqft: number; floor?: string; view: string; furnished: boolean; parking: number; price: number; serviceCharges?: number;
  offPlan: boolean; handover?: string; exclusive: boolean; amenities: string[]; inquiries: number; permit: string;
  syndication: { portal: string; status: "Published" | "Pending" | "Failed" | "Removed" }[]; hue: number; description: string;
}

export interface Project {
  id: string; name: string; developer: string; community: string; types: string[]; completion: "Off-plan" | "Ready";
  handover: string; startingPrice: number; paymentPlan: string; bookingAmount: number; commissionPct: number;
  unitsTotal: number; unitsAvailable: number; amenities: string[];
}

export interface Unit {
  id: string; projectId: string; unitNo: string; type: string; beds: number; sqft: number; price: number;
  status: "Available" | "Reserved" | "Sold"; floor: string; view: string;
}

export interface Developer { id: string; name: string; projects: number; website: string; commissionTerms: string; phone: string; hue: number }
export interface Community { id: string; name: string; zone: string; avgPsf: number; demand: number; listings: number }
export interface TeamUser { id: string; name: string; role: string; areas: string[]; languages: string[]; phone: string; email: string; available: boolean; hue: number }
export interface Viewing { id: string; leadId: string; propertyId: string; agentId: string; date: string; time: string; kind: "In-person" | "Virtual" | "Site Visit"; status: "Requested" | "Scheduled" | "Confirmed" | "Completed" | "Cancelled" | "No-show"; feedback?: string }
export interface Payment { label: string; amount: number; status: "Paid" | "Due" | "Overdue"; due: string }
export interface Deal { id: string; leadId: string; propertyId?: string; projectId?: string; agentId: string; kind: "Sale" | "Rent" | "Off-plan"; value: number; commissionPct: number; commission: number; agencyShare: number; agentShare: number; status: "Booking" | "Contract" | "Payment" | "Completed"; date: number; payments: Payment[] }
export interface Campaign { id: string; name: string; platform: string; source: string; budget: number; spent: number; start: string; end: string; area: string }
export interface Integration { id: string; name: string; category: string; status: "Connected" | "Off" | "Error"; lastSync: number; today: number; desc: string }
export interface WebhookEvent { id: string; source: string; event: string; status: "Processed" | "Failed" | "Queued"; at: number; detail: string; leadId?: string; error?: string }
export interface Rule { id: string; name: string; when: string; ifCond: string; actions: string[]; active: boolean; runs: number }
export interface AuditEntry { id: string; user: string; action: string; entity: string; at: number; from?: string; to?: string }
export interface Notif { id: string; kind: string; text: string; at: number; read: boolean }
export interface Stage { id: string; label: string; tone: "start" | "mid" | "late" | "won" | "lost" }
export interface WAMessage { from: "them" | "us"; text: string; at: number; status?: "Sent" | "Delivered" | "Read" }
export interface WAThread { leadId: string; messages: WAMessage[] }
export interface TaskItem { id: string; title: string; due: number; done: boolean; leadId?: string; kind: "Call" | "Follow-up" | "Viewing" | "Document" | "WhatsApp" }
export interface CallLog { id: string; leadId?: string; number: string; name: string; direction: "Inbound" | "Outbound"; at: number; duration: number; outcome: string; agentId: string }
export interface EmailMsg { id: string; from: string; email: string; subject: string; preview: string; at: number; source: string; converted?: boolean }
export interface DocItem { id: string; name: string; entity: string; type: string; size: string; at: number; by: string }
export interface Toast { id: number; kind: "success" | "info" | "warn" | "danger"; text: string }
export interface Route { page: string; param?: string }
export interface Weights { budget: number; timeline: number; cash: number; source: number; engagement: number }

// New types for Phase 6 modules
export interface RentalContract {
  id: string; leadId: string; propertyId: string; agentId: string; tenant: string; landlord: string;
  annualRent: number; monthlyRent: number; deposit: number; agencyFee: number; cheques: number;
  startDate: string; endDate: string; status: "Draft" | "Signed" | "Ejari Registered" | "Expired";
  ejariNumber?: string; documents: string[];
}

export interface LandingPage {
  id: string; name: string; url: string; campaign: string; source: string; leads: number; conversions: number;
  status: "Live" | "Paused" | "Draft"; created: number; lastLead: number;
}

export interface EmailTemplate {
  id: string; name: string; subject: string; body: string; category: "Welcome" | "Follow-up" | "Viewing" | "Booking" | "Renewal";
}

export interface WAAutomation {
  id: string; name: string; trigger: string; template: string; delay: string; active: boolean;
}

export type RERAIntegration = {
  id: string; name: string; status: "Connected" | "Pending" | "Off"; lastCheck: number; permits: number;
}

export const cx = (...parts: (string | false | null | undefined)[]) => parts.filter(Boolean).join(" ");
let counter = 100;
export const uid = (p = "id") => `${p}-${Date.now().toString(36)}-${(counter++).toString(36)}`;
export const initials = (name: string) => name.split(" ").filter(Boolean).slice(0, 2).map((w) => w[0]!.toUpperCase()).join("");
export const normPhone = (p: string) => p.replace(/[^\d]/g, "").replace(/^971/, "0").replace(/^0+/, "");

export const aed = (n: number, compact = false) => {
  if (compact) {
    if (Math.abs(n) >= 1_000_000) return `AED ${(n / 1_000_000).toFixed(n % 1_000_000 === 0 ? 0 : 1)}M`;
    if (Math.abs(n) >= 1_000) return `AED ${(n / 1_000).toFixed(0)}K`;
  }
  return `AED ${Math.round(n).toLocaleString("en-US")}`;
};

const dtf = new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short", timeZone: "Asia/Dubai" });
const dtfy = new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short", year: "numeric", timeZone: "Asia/Dubai" });
const ttf = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", hour12: true, timeZone: "Asia/Dubai" });

export const fmtDate = (ts: number) => dtf.format(ts);
export const fmtDateY = (ts: number) => dtfy.format(ts);
export const fmtTime = (ts: number) => ttf.format(ts);

export const rel = (ts: number) => {
  const d = Math.max(0, Date.now() - ts);
  const m = Math.floor(d / 60000);
  if (m < 1) return "just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const days = Math.floor(h / 24);
  if (days === 1) return "yesterday";
  if (days < 30) return `${days}d ago`;
  return fmtDate(ts);
};

export const dubaiDay = (offset = 0) => {
  const d = new Date(Date.now() + offset * 86400000);
  return d.toISOString().slice(0, 10);
};

export const weekDays = (offsetWeeks = 0) => {
  const now = new Date();
  const day = (now.getDay() + 6) % 7;
  const monday = new Date(now.getTime() - day * 86400000 + offsetWeeks * 7 * 86400000);
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday.getTime() + i * 86400000);
    return {
      iso: d.toISOString().slice(0, 10),
      label: new Intl.DateTimeFormat("en-GB", { weekday: "short", timeZone: "Asia/Dubai" }).format(d),
      num: d.getDate(),
      today: d.toDateString() === new Date().toDateString(),
    };
  });
};

export const SOURCES: Record<string, { channel: ChannelKind; color: string }> = {
  "Property Finder": { channel: "portal", color: "#7b3ff2" }, Bayut: { channel: "portal", color: "#c03b28" },
  Dubizzle: { channel: "portal", color: "#0a5747" }, "Google Ads": { channel: "search", color: "#b9770e" },
  "Google Organic": { channel: "search", color: "#1e7f4f" }, Facebook: { channel: "meta", color: "#2b5fb0" },
  Instagram: { channel: "meta", color: "#c2477f" }, TikTok: { channel: "social", color: "#2b2f33" },
  LinkedIn: { channel: "social", color: "#2264a8" }, Website: { channel: "direct", color: "#0e6b58" },
  WhatsApp: { channel: "chat", color: "#1e7f4f" }, Phone: { channel: "direct", color: "#4e86a6" },
  Email: { channel: "direct", color: "#8a6d1f" }, "Walk-in": { channel: "direct", color: "#5b6a60" },
  Referral: { channel: "direct", color: "#a87f2c" },
};

export const CHANNEL_LABEL: Record<ChannelKind, string> = {
  portal: "Portal", social: "Social", search: "Search", direct: "Direct", meta: "Meta", chat: "Chat",
};

const SOURCE_FACTOR: Record<ChannelKind, number> = { portal: 0.85, chat: 0.9, search: 0.75, meta: 0.7, direct: 1, social: 0.6 };

export function scoreLead(l: Lead, w: Weights): number {
  let pts = 0;
  const budgetMax = l.type === "Buyer" ? 4_000_000 : 250_000;
  pts += Math.min(1, l.budget / budgetMax) * w.budget + (l.budget >= budgetMax * 0.5 ? w.budget * 0.15 : 0);
  const tf: Record<Lead["timeline"], number> = { Immediate: 1, "1–3 months": 0.7, "3–6 months": 0.4, Exploring: 0.15 };
  pts += tf[l.timeline] * w.timeline;
  if (l.cash || l.mortgageApproved) pts += w.cash;
  const channel = SOURCES[l.touches[0]?.source ?? "Website"]?.channel ?? "direct";
  pts += (SOURCE_FACTOR[channel] ?? 0.7) * w.source;
  let eng = 0;
  if (l.viewingRequested) eng += 0.45;
  if (l.touches.length > 1) eng += 0.25;
  if (l.whatsappEngaged) eng += 0.2;
  if (l.interestPropertyId || l.interestProjectId) eng += 0.25;
  pts += Math.min(1, eng) * w.engagement;
  return Math.min(100, Math.round(pts));
}

export const heatOf = (score: number) =>
  score >= 80 ? { label: "HOT", color: "var(--color-hot)", soft: "var(--color-hotsoft)", icon: "flame" as const }
    : score >= 50 ? { label: "WARM", color: "var(--color-warm)", soft: "var(--color-warmsoft)", icon: "sun" as const }
      : { label: "COLD", color: "var(--color-cold)", soft: "var(--color-coldsoft)", icon: "snow" as const };

export function slaState(l: Lead, slaMin: number) {
  if (l.firstContactMin !== null || ["won", "lost", "not_interested"].includes(l.stage)) return { label: "Contacted", tone: "ok" as const, mins: l.firstContactMin };
  const mins = Math.round((Date.now() - l.receivedAt) / 60000);
  if (mins <= slaMin) return { label: `${mins}m waiting`, tone: "ok" as const, mins };
  if (mins <= slaMin * 2) return { label: `${mins}m — warn`, tone: "warn" as const, mins };
  return { label: `${mins}m — breach`, tone: "danger" as const, mins };
}

export interface Match { p: Property; pct: number; reasons: string[] }

export function matchProperties(l: Lead, props: Property[]): Match[] {
  const out: Match[] = [];
  for (const p of props) {
    if (p.status !== "Active") continue;
    if (l.type === "Buyer" && p.purpose !== "Sale") continue;
    if (l.type === "Tenant" && p.purpose !== "Rent") continue;
    let pts = 0; const reasons: string[] = [];
    if (p.community === l.area) { pts += 34; reasons.push(l.area); }
    if (p.type === l.propertyType) { pts += 16; reasons.push(p.type); }
    if (p.beds === l.bedrooms) { pts += 16; reasons.push(`${p.beds}BR`); }
    else if (Math.abs(p.beds - l.bedrooms) === 1) { pts += 8; reasons.push(`${p.beds}BR (close)`); }
    const diff = Math.abs(p.price - l.budget) / l.budget;
    if (diff <= 0.08) { pts += 22; reasons.push("Budget fit"); }
    else if (diff <= 0.2) { pts += 13; reasons.push("Near budget"); }
    if (l.timeline === "Immediate" && !p.offPlan) { pts += 8; reasons.push("Ready unit"); }
    if (l.purpose === "Investment" && p.offPlan) { pts += 6; reasons.push("Off-plan upside"); }
    if (p.exclusive) pts += 3;
    const pct = Math.min(98, pts);
    if (pct >= 30) out.push({ p, pct, reasons: reasons.slice(0, 3) });
  }
  return out.sort((a, b) => b.pct - a.pct).slice(0, 5);
}

export function findDuplicate(leads: Lead[], phone: string, email?: string) {
  const np = normPhone(phone);
  return leads.find((l) => (np.length > 6 && normPhone(l.phone) === np) || (email && l.email && l.email.toLowerCase() === email.toLowerCase()));
}
