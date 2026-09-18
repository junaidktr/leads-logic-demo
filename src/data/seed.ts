import type {
  AuditEntry, CallLog, Campaign, Community, Deal, Developer, DocItem, EmailMsg, EmailTemplate, Integration,
  Lead, LandingPage, Notif, Project, Property, RentalContract, RERAIntegration, Rule, Stage, TaskItem, TeamUser, Toast,
  Unit, Viewing, WAAutomation, WAThread, WebhookEvent, Weights,
} from "../lib/types";

const now = Date.now();
const M = 60000, H = 60 * M, D = 24 * H;
const mAgo = (m: number) => now - m * M;
const dAgo = (d: number) => now - d * D;
const day = (offset: number) => new Date(now + offset * D).toISOString().slice(0, 10);

export const WEIGHTS_DEFAULT: Weights = { budget: 30, timeline: 20, cash: 15, source: 15, engagement: 20 };
export const SLA_DEFAULT = 15;

export const PROPERTY_TYPES = [
  "Apartment", "Villa", "Townhouse", "Penthouse", "Duplex", "Studio", "Hotel Apartment",
  "Office", "Retail", "Shop", "Warehouse", "Land", "Commercial Building", "Residential Building", "Compound",
];

export const STAGES: Stage[] = [
  { id: "new", label: "New Lead", tone: "start" }, { id: "attempted", label: "Attempted Contact", tone: "start" },
  { id: "contacted", label: "Contacted", tone: "start" }, { id: "qualified", label: "Qualified", tone: "mid" },
  { id: "requirement", label: "Requirement Confirmed", tone: "mid" }, { id: "property_sent", label: "Property Sent", tone: "mid" },
  { id: "viewing_req", label: "Viewing Requested", tone: "mid" }, { id: "viewing_sched", label: "Viewing Scheduled", tone: "mid" },
  { id: "viewing_done", label: "Viewing Completed", tone: "mid" }, { id: "offer", label: "Offer Submitted", tone: "late" },
  { id: "negotiation", label: "Negotiation", tone: "late" }, { id: "booking", label: "Booking", tone: "late" },
  { id: "contract", label: "Contract", tone: "late" }, { id: "payment", label: "Payment", tone: "late" },
  { id: "won", label: "Deal Won", tone: "won" }, { id: "lost", label: "Deal Lost", tone: "lost" },
  { id: "followup", label: "Follow-up Later", tone: "mid" }, { id: "not_interested", label: "Not Interested", tone: "lost" },
];

export const BOARD_STAGES = ["new", "contacted", "qualified", "property_sent", "viewing_sched", "offer", "negotiation", "booking", "won", "lost"];

export const USERS: TeamUser[] = [
  { id: "u1", name: "Rashid Bin Hadi", role: "Managing Director", areas: ["All Dubai"], languages: ["EN", "AR"], phone: "+971 50 201 0001", email: "rashid@leadslogic.ae", available: true, hue: 42 },
  { id: "u2", name: "Layla Haddad", role: "Sales Manager", areas: ["All Dubai"], languages: ["EN", "AR"], phone: "+971 50 201 0002", email: "layla@leadslogic.ae", available: true, hue: 160 },
  { id: "u3", name: "Aisha Al Mansoori", role: "Sales Agent", areas: ["Dubai Marina", "JBR", "Emaar Beachfront"], languages: ["EN", "AR"], phone: "+971 50 201 0003", email: "aisha@leadslogic.ae", available: true, hue: 200 },
  { id: "u4", name: "Vikram Malhotra", role: "Sales Agent", areas: ["Downtown Dubai", "Business Bay"], languages: ["EN", "HI"], phone: "+971 50 201 0004", email: "vikram@leadslogic.ae", available: true, hue: 20 },
  { id: "u5", name: "Sofia Reyes", role: "Sales Agent", areas: ["Palm Jumeirah", "Jumeirah", "Dubai Harbour"], languages: ["EN", "ES"], phone: "+971 50 201 0005", email: "sofia@leadslogic.ae", available: true, hue: 320 },
  { id: "u6", name: "Imran Shaikh", role: "Leasing Agent", areas: ["JVC", "DSO", "International City", "Al Furjan"], languages: ["EN", "UR", "HI"], phone: "+971 50 201 0006", email: "imran@leadslogic.ae", available: true, hue: 260 },
  { id: "u7", name: "Chen Lu", role: "Listing Agent", areas: ["Dubai Hills", "MBR City"], languages: ["EN", "ZH"], phone: "+971 50 201 0007", email: "chen@leadslogic.ae", available: true, hue: 100 },
  { id: "u8", name: "Mariam Farouk", role: "Marketing Manager", areas: ["—"], languages: ["EN", "AR"], phone: "+971 50 201 0008", email: "mariam@leadslogic.ae", available: true, hue: 350 },
  { id: "u9", name: "Derek Osei", role: "Telecaller", areas: ["—"], languages: ["EN"], phone: "+971 50 201 0009", email: "derek@leadslogic.ae", available: true, hue: 70 },
  { id: "u10", name: "Fatima Noor", role: "Accounts / Finance", areas: ["—"], languages: ["EN", "UR"], phone: "+971 50 201 0010", email: "fatima@leadslogic.ae", available: true, hue: 130 },
  { id: "u11", name: "Hassan Al Ketbi", role: "Admin / Operations", areas: ["—"], languages: ["EN", "AR"], phone: "+971 50 201 0011", email: "hassan@leadslogic.ae", available: true, hue: 55 },
  { id: "u12", name: "Nadia Khalil", role: "Viewer", areas: ["—"], languages: ["EN"], phone: "+971 50 201 0012", email: "nadia@leadslogic.ae", available: true, hue: 280 },
];

export const COMMUNITIES: Community[] = [
  { id: "c1", name: "Downtown Dubai", zone: "Central", avgPsf: 2450, demand: 96, listings: 48 },
  { id: "c2", name: "Dubai Marina", zone: "Coastal", avgPsf: 1850, demand: 98, listings: 63 },
  { id: "c3", name: "Palm Jumeirah", zone: "Coastal", avgPsf: 3100, demand: 88, listings: 21 },
  { id: "c4", name: "Business Bay", zone: "Central", avgPsf: 1720, demand: 91, listings: 44 },
  { id: "c5", name: "Jumeirah Village Circle", zone: "Suburban", avgPsf: 1080, demand: 93, listings: 71 },
  { id: "c6", name: "Dubai Hills Estate", zone: "Suburban", avgPsf: 1780, demand: 90, listings: 33 },
  { id: "c7", name: "Dubai Creek Harbour", zone: "Waterfront", avgPsf: 1690, demand: 87, listings: 28 },
  { id: "c8", name: "Arabian Ranches", zone: "Suburban", avgPsf: 1350, demand: 71, listings: 14 },
  { id: "c9", name: "Emirates Hills", zone: "Luxury", avgPsf: 3600, demand: 58, listings: 6 },
  { id: "c10", name: "Dubai Silicon Oasis", zone: "Suburban", avgPsf: 940, demand: 72, listings: 19 },
  { id: "c11", name: "Tilal Al Ghaf", zone: "Suburban", avgPsf: 1560, demand: 85, listings: 16 },
  { id: "c12", name: "Emaar Beachfront", zone: "Waterfront", avgPsf: 2300, demand: 89, listings: 18 },
];

export const DEVELOPERS: Developer[] = [
  { id: "d1", name: "Emaar", projects: 14, website: "emaar.com", commissionTerms: "5–7% off-plan · 2% secondary", phone: "+971 4 366 1686", hue: 210 },
  { id: "d2", name: "DAMAC", projects: 11, website: "damacproperties.com", commissionTerms: "6% off-plan + bonus slabs", phone: "+971 4 369 7777", hue: 330 },
  { id: "d3", name: "Nakheel", projects: 8, website: "nakheel.com", commissionTerms: "5–7% off-plan · 2% secondary", phone: "+971 4 369 0000", hue: 180 },
  { id: "d4", name: "Sobha", projects: 6, website: "sobharealty.com", commissionTerms: "5% off-plan", phone: "+971 4 429 9999", hue: 15 },
  { id: "d5", name: "Meraas", projects: 7, website: "meraas.com", commissionTerms: "5–6% off-plan", phone: "+971 4 317 3999", hue: 260 },
  { id: "d6", name: "Danube", projects: 9, website: "danubeproperties.com", commissionTerms: "6% + 1% quarterly bonus", phone: "+971 4 561 9999", hue: 200 },
  { id: "d7", name: "Binghatti", projects: 8, website: "binghatti.com", commissionTerms: "6–7% off-plan", phone: "+971 4 873 9999", hue: 25 },
];

export const PROJECTS: Project[] = [
  { id: "pj1", name: "Creek Vista Heights", developer: "Emaar", community: "Dubai Creek Harbour", types: ["Apartment"], completion: "Off-plan", handover: "Q4 2027", startingPrice: 1450000, paymentPlan: "10% booking · 60/40", bookingAmount: 145000, commissionPct: 6, unitsTotal: 320, unitsAvailable: 211, amenities: ["Infinity pool", "Gym", "Retail podium"] },
  { id: "pj2", name: "Azure Palm Residences", developer: "Nakheel", community: "Palm Jumeirah", types: ["Apartment", "Penthouse"], completion: "Off-plan", handover: "Q2 2028", startingPrice: 3200000, paymentPlan: "20% booking · 50/50", bookingAmount: 640000, commissionPct: 5, unitsTotal: 180, unitsAvailable: 96, amenities: ["Private beach", "Marina berth"] },
  { id: "pj3", name: "Hills Park Villas", developer: "Meraas", community: "Dubai Hills Estate", types: ["Townhouse", "Villa"], completion: "Off-plan", handover: "Q1 2027", startingPrice: 3600000, paymentPlan: "10% booking · 70/30", bookingAmount: 360000, commissionPct: 5, unitsTotal: 240, unitsAvailable: 118, amenities: ["Golf course", "Community park"] },
  { id: "pj4", name: "Binghatti Orbit", developer: "Binghatti", community: "Business Bay", types: ["Studio", "Apartment"], completion: "Off-plan", handover: "Q3 2026", startingPrice: 890000, paymentPlan: "20% booking · 1% monthly", bookingAmount: 178000, commissionPct: 7, unitsTotal: 410, unitsAvailable: 87, amenities: ["Sky pool", "Canal views"] },
  { id: "pj5", name: "Danube Oceanz", developer: "Danube", community: "Dubai Silicon Oasis", types: ["Studio", "Apartment"], completion: "Off-plan", handover: "Q2 2027", startingPrice: 720000, paymentPlan: "1% monthly · 10% booking", bookingAmount: 72000, commissionPct: 6, unitsTotal: 520, unitsAvailable: 302, amenities: ["Wave pool", "Cinema", "Gym"] },
];

// NEW: Units inventory for off-plan projects
export const UNITS: Unit[] = [
  { id: "U-101", projectId: "pj1", unitNo: "1204", type: "Apartment", beds: 2, sqft: 1150, price: 2350000, status: "Available", floor: "12", view: "Creek" },
  { id: "U-102", projectId: "pj1", unitNo: "1508", type: "Apartment", beds: 1, sqft: 780, price: 1650000, status: "Reserved", floor: "15", view: "Skyline" },
  { id: "U-103", projectId: "pj1", unitNo: "2001", type: "Penthouse", beds: 3, sqft: 2400, price: 4200000, status: "Available", floor: "20", view: "Creek + Burj" },
  { id: "U-104", projectId: "pj1", unitNo: "0805", type: "Apartment", beds: 2, sqft: 1100, price: 2150000, status: "Sold", floor: "8", view: "Marina" },
  { id: "U-105", projectId: "pj2", unitNo: "G-12", type: "Apartment", beds: 2, sqft: 1400, price: 3800000, status: "Available", floor: "G", view: "Sea" },
  { id: "U-106", projectId: "pj2", unitNo: "PH-03", type: "Penthouse", beds: 4, sqft: 3200, price: 8500000, status: "Reserved", floor: "PH", view: "Sea + Atlantis" },
  { id: "U-107", projectId: "pj4", unitNo: "2207", type: "Studio", beds: 0, sqft: 450, price: 890000, status: "Available", floor: "22", view: "Canal" },
  { id: "U-108", projectId: "pj4", unitNo: "1812", type: "Apartment", beds: 1, sqft: 720, price: 1250000, status: "Available", floor: "18", view: "Canal" },
  { id: "U-109", projectId: "pj5", unitNo: "0903", type: "Studio", beds: 0, sqft: 420, price: 720000, status: "Available", floor: "9", view: "Pool" },
  { id: "U-110", projectId: "pj5", unitNo: "1405", type: "Apartment", beds: 2, sqft: 1050, price: 1850000, status: "Sold", floor: "14", view: "Sea" },
];

type SyndStatus = "Published" | "Pending" | "Failed" | "Removed";
const synd = (s1: SyndStatus = "Published", s2: SyndStatus = "Published"): { portal: string; status: SyndStatus }[] => [
  { portal: "Property Finder", status: s1 }, { portal: "Bayut", status: s2 }, { portal: "Dubizzle", status: "Published" }, { portal: "Website", status: "Published" },
];

export const PROPERTIES: Property[] = [
  { id: "PR-201", listingId: "PF-88213", title: "Marina Quay West · Full Marina Views", type: "Apartment", purpose: "Sale", status: "Active", community: "Dubai Marina", building: "Marina Quay West", developer: "Emaar", ownerId: "OW-1", agentId: "u3", beds: 2, baths: 2, sqft: 1320, floor: "18", view: "Marina + Sea", furnished: false, parking: 1, price: 2850000, serviceCharges: 14, offPlan: false, exclusive: true, amenities: ["Pool", "Gym", "Concierge"], inquiries: 34, permit: "RERA 71-04-B", syndication: synd(), hue: 200, description: "Corner 2BR on the 18th floor with wraparound marina views." },
  { id: "PR-202", listingId: "BY-55127", title: "Silverene Tower B · Chiller Free", type: "Apartment", purpose: "Rent", status: "Active", community: "Dubai Marina", building: "Silverene B", developer: "Nakheel", ownerId: "OW-2", agentId: "u3", beds: 1, baths: 1, sqft: 780, floor: "9", view: "Marina", furnished: true, parking: 1, price: 95000, offPlan: false, exclusive: false, amenities: ["Pool", "Gym", "Chiller free"], inquiries: 27, permit: "RERA 71-11-C", syndication: synd(), hue: 190, description: "Fully furnished 1BR, chiller free, 2 cheques." },
  { id: "PR-203", listingId: "PF-90771", title: "Boulevard Point · Sky Penthouse", type: "Penthouse", purpose: "Sale", status: "Active", community: "Downtown Dubai", building: "Boulevard Point", developer: "Emaar", ownerId: "OW-3", agentId: "u4", beds: 4, baths: 5, sqft: 4100, floor: "51", view: "Burj Khalifa", furnished: true, parking: 3, price: 8900000, serviceCharges: 22, offPlan: false, exclusive: true, amenities: ["Private lift", "Pool", "Valet"], inquiries: 41, permit: "RERA 69-02-A", syndication: synd(), hue: 35, description: "Half-floor penthouse with direct Burj Khalifa views." },
  { id: "PR-204", listingId: "BY-61440", title: "Frond G Signature Villa · Beach Access", type: "Villa", purpose: "Sale", status: "Active", community: "Palm Jumeirah", building: "Frond G", developer: "Nakheel", ownerId: "OW-4", agentId: "u5", beds: 5, baths: 6, sqft: 6800, floor: "G+1", view: "Sea + Atlantis", furnished: false, parking: 3, price: 24500000, offPlan: false, exclusive: true, amenities: ["Private beach", "Pool", "Maid room"], inquiries: 19, permit: "RERA 74-08-A", syndication: synd(), hue: 175, description: "Frond-tip villa with 90ft private beach." },
  { id: "PR-205", listingId: "PF-86120", title: "Maple Townhouse · Park Facing", type: "Townhouse", purpose: "Sale", status: "Active", community: "Dubai Hills Estate", building: "Maple", developer: "Emaar", ownerId: "OW-2", agentId: "u7", beds: 3, baths: 3, sqft: 1900, floor: "G+1", view: "Park", furnished: false, parking: 2, price: 3400000, offPlan: false, exclusive: false, amenities: ["Community pool", "Dog park", "Gym"], inquiries: 23, permit: "RERA 73-19-B", syndication: synd(), hue: 130, description: "Upgraded 3BR+Maid townhouse facing the central park." },
  { id: "PR-206", listingId: "DZ-30981", title: "Golf Vista Studio · High ROI", type: "Studio", purpose: "Rent", status: "Active", community: "Dubai Silicon Oasis", building: "Golf Vista", developer: "Danube", ownerId: "OW-5", agentId: "u6", beds: 0, baths: 1, sqft: 450, floor: "5", view: "Golf course", furnished: true, parking: 1, price: 52000, offPlan: false, exclusive: false, amenities: ["Pool", "Gym"], inquiries: 15, permit: "RERA 80-44-D", syndication: synd("Pending"), hue: 95, description: "Furnished studio with golf course views." },
  { id: "PR-207", listingId: "PF-91230", title: "Creek Vista Heights · 2BR Creek Views", type: "Apartment", purpose: "Sale", status: "Active", community: "Dubai Creek Harbour", building: "Creek Vista Heights", developer: "Emaar", ownerId: "Developer", agentId: "u4", beds: 2, baths: 2, sqft: 1150, floor: "22", view: "Creek + Skyline", furnished: false, parking: 1, price: 2350000, offPlan: true, handover: "Q4 2027", exclusive: false, amenities: ["Infinity pool", "Retail podium"], inquiries: 46, permit: "RERA 67-01-B", syndication: synd(), hue: 215, description: "Off-plan 2BR with full creek views. 60/40 payment plan." },
  { id: "PR-208", listingId: "BY-58803", title: "Arabian Ranches II · Corner Plot", type: "Villa", purpose: "Sale", status: "Active", community: "Arabian Ranches", building: "Palmeral", developer: "Emaar", ownerId: "OW-1", agentId: "u5", beds: 4, baths: 4, sqft: 3600, floor: "G+1", view: "Golf course", furnished: false, parking: 2, price: 4900000, offPlan: false, exclusive: false, amenities: ["Golf access", "Pool", "Community centre"], inquiries: 17, permit: "RERA 72-33-B", syndication: synd(), hue: 25, description: "Corner-plot 4BR villa on the Palmeral." },
];

export const OWNERS = [
  { id: "OW-1", name: "Hamad Al Suwaidi", phone: "+971 55 330 1180", email: "hamad.s@me.com", nationality: "UAE", properties: ["PR-201", "PR-208"], preference: "Serious buyers only", exclusive: true },
  { id: "OW-2", name: "Nour Investment LLC", phone: "+971 4 887 2244", email: "assets@nourinvest.ae", nationality: "UAE", properties: ["PR-202", "PR-205"], preference: "Net return above 6%", exclusive: false },
  { id: "OW-3", name: "James Patterson", phone: "+44 7700 900412", email: "j.patterson@outlook.com", nationality: "United Kingdom", properties: ["PR-203"], preference: "International marketing", exclusive: true },
  { id: "OW-4", name: "Amina Kazmi", phone: "+971 56 410 9921", email: "amina.kazmi@gmail.com", nationality: "Pakistan", properties: ["PR-204"], preference: "Quick close preferred", exclusive: true },
  { id: "OW-5", name: "Sunrise Holdings", phone: "+971 4 223 8810", email: "leasing@sunriseholdings.ae", nationality: "India", properties: ["PR-206"], preference: "Multiple cheques accepted", exclusive: false },
];

let aid = 0;
const uid2 = () => `a${++aid}`;
const act = (at: number, kind: Lead["activities"][number]["kind"], text: string, user = "System") => ({ id: uid2(), at, kind, text, user });

const L = (id: string, name: string, phone: string, type: Lead["type"], purpose: Lead["purpose"], budget: number, area: string, ptype: string, beds: number, stage: string, agent: string | null, receivedAt: number, sources: [string, number][], extra: Partial<Lead> = {}): Lead => ({
  id, name, phone, email: extra.email, nationality: extra.nationality ?? "—", country: extra.country ?? "UAE",
  language: extra.language ?? "EN", type, purpose, budget, area, propertyType: ptype, bedrooms: beds,
  timeline: extra.timeline ?? "1–3 months", cash: extra.cash ?? false, mortgageApproved: extra.mortgageApproved,
  furnished: extra.furnished, moveIn: extra.moveIn, employer: extra.employer,
  stage, assignedTo: agent, receivedAt, firstContactMin: extra.firstContactMin ?? null,
  touches: sources.map(([source, at], i) => ({ source, at, sourceLeadId: i === 0 ? `${source.slice(0, 2).toUpperCase()}-${1000 + aid}` : undefined })),
  utm: extra.utm, gclid: extra.gclid, interestPropertyId: extra.interestPropertyId, interestProjectId: extra.interestProjectId,
  viewingRequested: extra.viewingRequested, whatsappEngaged: extra.whatsappEngaged, message: extra.message,
  activities: extra.activities ?? [act(receivedAt, "system", `Lead captured from ${sources[0][0]}`)],
});

export const LEADS: Lead[] = [
  L("LD-1001", "Rahul Sharma", "+971 52 884 1207", "Buyer", "Investment", 2500000, "Dubai Marina", "Apartment", 2, "qualified", "u3", dAgo(3), [["Facebook", dAgo(3)], ["Property Finder", dAgo(2)]], { email: "rahul.sharma@gmail.com", nationality: "India", timeline: "Immediate", cash: true, firstContactMin: 6, whatsappEngaged: true, viewingRequested: true, interestPropertyId: "PR-201" }),
  L("LD-1002", "Fatima Al Zahra", "+971 50 774 2280", "Buyer", "End User", 3200000, "Dubai Creek Harbour", "Apartment", 2, "viewing_sched", "u4", dAgo(5), [["Property Finder", dAgo(5)]], { email: "fatima.zahra@icloud.com", nationality: "UAE", language: "AR", firstContactMin: 4, mortgageApproved: true, viewingRequested: true, interestPropertyId: "PR-207" }),
  L("LD-1003", "James Whitfield", "+44 7911 123456", "Buyer", "Investment", 9000000, "Downtown Dubai", "Penthouse", 4, "offer", "u4", dAgo(9), [["Google Ads", dAgo(9)]], { email: "j.whitfield@whitcap.co.uk", nationality: "United Kingdom", country: "UK", timeline: "3–6 months", firstContactMin: 11, interestPropertyId: "PR-203" }),
  L("LD-1004", "Chen Wei", "+86 138 0013 8000", "Buyer", "Investment", 5500000, "Tilal Al Ghaf", "Villa", 3, "negotiation", "u7", dAgo(12), [["Website", dAgo(12)]], { email: "chen.wei@163.com", nationality: "China", country: "China", timeline: "1–3 months", cash: true, firstContactMin: 22, interestPropertyId: "PR-204" }),
  L("LD-1005", "Ayesha Khan", "+92 300 8451122", "Tenant", "Rent", 90000, "Jumeirah Village Circle", "Apartment", 1, "property_sent", "u6", dAgo(2), [["Bayut", dAgo(2)]], { email: "ayesha.khan@yahoo.com", nationality: "Pakistan", firstContactMin: 9, furnished: "Furnished" as const, moveIn: day(20), timeline: "Immediate", whatsappEngaged: true }),
  L("LD-1006", "Viktor Petrov", "+7 916 555 0192", "Buyer", "Investment", 12000000, "Palm Jumeirah", "Villa", 5, "viewing_done", "u5", dAgo(7), [["Instagram", dAgo(7)], ["WhatsApp", dAgo(4)]], { email: "v.petrov@mail.ru", nationality: "Russia", country: "Russia", cash: true, firstContactMin: 15, viewingRequested: true, interestPropertyId: "PR-204" }),
  L("LD-1007", "Sophie Martin", "+33 6 12 34 56 78", "Tenant", "Rent", 150000, "Downtown Dubai", "Apartment", 2, "viewing_sched", "u4", dAgo(4), [["Website", dAgo(4)]], { email: "sophie.martin@orange.fr", nationality: "France", furnished: "Furnished" as const, moveIn: day(30), firstContactMin: 7, viewingRequested: true, interestPropertyId: "PR-203" }),
  L("LD-1008", "Omar Bin Sulaiman", "+971 55 210 7743", "Buyer", "End User", 4800000, "Arabian Ranches", "Villa", 4, "new", null, mAgo(12), [["Phone", mAgo(12)]], { nationality: "UAE", timeline: "Immediate", mortgageApproved: true }),
  L("LD-1009", "Priya Nair", "+971 54 998 2210", "Buyer", "Investment", 1600000, "Jumeirah Village Circle", "Apartment", 2, "new", "u6", mAgo(26), [["Property Finder", mAgo(26)]], { email: "priya.nair@emiratesnbd.ae", nationality: "India", cash: false, mortgageApproved: true }),
  L("LD-1010", "Muhammad Usman", "+971 50 113 6629", "Tenant", "Rent", 55000, "Dubai Silicon Oasis", "Studio", 0, "contacted", "u6", mAgo(95), [["Dubizzle", mAgo(95)]], { nationality: "Pakistan", furnished: "Furnished" as const, moveIn: day(10), firstContactMin: 8 }),
];

export const VIEWINGS: Viewing[] = [
  { id: "VW-101", leadId: "LD-1002", propertyId: "PR-207", agentId: "u4", date: day(2), time: "11:00", kind: "In-person", status: "Confirmed" },
  { id: "VW-102", leadId: "LD-1007", propertyId: "PR-203", agentId: "u4", date: day(1), time: "17:30", kind: "In-person", status: "Scheduled" },
  { id: "VW-103", leadId: "LD-1001", propertyId: "PR-201", agentId: "u3", date: day(1), time: "10:30", kind: "In-person", status: "Confirmed" },
  { id: "VW-104", leadId: "LD-1005", propertyId: "PR-206", agentId: "u6", date: day(0), time: "16:00", kind: "In-person", status: "Scheduled" },
];

export const DEALS: Deal[] = [
  { id: "DL-501", leadId: "LD-1005", propertyId: "PR-202", agentId: "u3", kind: "Rent", value: 95000, commissionPct: 5, commission: 4750, agencyShare: 2850, agentShare: 1900, status: "Completed", date: dAgo(6), payments: [{ label: "Agency fee", amount: 4750, status: "Paid", due: day(-6) }, { label: "Deposit cheque", amount: 9500, status: "Paid", due: day(-5) }] },
  { id: "DL-502", leadId: "LD-1004", propertyId: "PR-204", agentId: "u5", kind: "Sale", value: 24500000, commissionPct: 2, commission: 490000, agencyShare: 294000, agentShare: 196000, status: "Contract", date: dAgo(4), payments: [{ label: "Booking deposit (10%)", amount: 2450000, status: "Paid", due: day(-4) }, { label: "Transfer balance", amount: 22050000, status: "Due", due: day(21) }] },
  { id: "DL-503", leadId: "LD-1006", projectId: "pj2", agentId: "u5", kind: "Off-plan", value: 8500000, commissionPct: 5, commission: 425000, agencyShare: 255000, agentShare: 170000, status: "Booking", date: dAgo(1), payments: [{ label: "Booking (20%)", amount: 1700000, status: "Due", due: day(3) }] },
];

export const CAMPAIGNS: Campaign[] = [
  { id: "CP-01", name: "Marina 2BR ROI Push", platform: "Meta", source: "Instagram", budget: 25000, spent: 18400, start: day(-30), end: day(15), area: "Dubai Marina" },
  { id: "CP-02", name: "UK Investors — Downtown", platform: "Google Ads", source: "Google Ads", budget: 30000, spent: 22100, start: day(-45), end: day(30), area: "Downtown Dubai" },
  { id: "CP-03", name: "JVC Yield Studios", platform: "Meta", source: "Facebook", budget: 12000, spent: 9800, start: day(-21), end: day(20), area: "Jumeirah Village Circle" },
  { id: "CP-04", name: "Property Finder Premium", platform: "Portal", source: "Property Finder", budget: 40000, spent: 40000, start: day(-30), end: day(0), area: "All Dubai" },
];

// NEW: Landing pages tracker
export const LANDING_PAGES: LandingPage[] = [
  { id: "LP-01", name: "Marina 2BR Investment", url: "/marina-2br", campaign: "CP-01", source: "Instagram", leads: 42, conversions: 8, status: "Live", created: dAgo(30), lastLead: mAgo(45) },
  { id: "LP-02", name: "Downtown Penthouse", url: "/downtown-penthouse", campaign: "CP-02", source: "Google Ads", leads: 28, conversions: 5, status: "Live", created: dAgo(45), lastLead: mAgo(120) },
  { id: "LP-03", name: "JVC Studio Yield", url: "/jvc-studio", campaign: "CP-03", source: "Facebook", leads: 67, conversions: 12, status: "Live", created: dAgo(21), lastLead: mAgo(15) },
  { id: "LP-04", name: "Creek Harbour Off-plan", url: "/creek-harbour", campaign: "CP-04", source: "Property Finder", leads: 89, conversions: 18, status: "Live", created: dAgo(30), lastLead: mAgo(5) },
  { id: "LP-05", name: "Palm Villa Luxury", url: "/palm-villa", campaign: "CP-02", source: "LinkedIn", leads: 14, conversions: 2, status: "Paused", created: dAgo(60), lastLead: dAgo(15) },
];

export const INTEGRATIONS: Integration[] = [
  { id: "propertyfinder", name: "Property Finder", category: "Property Portal", status: "Connected", lastSync: mAgo(6), today: 7, desc: "Lead sync · listing sync via official API" },
  { id: "bayut", name: "Bayut", category: "Property Portal", status: "Connected", lastSync: mAgo(14), today: 5, desc: "Lead capture · listing feed" },
  { id: "dubizzle", name: "Dubizzle", category: "Property Portal", status: "Connected", lastSync: mAgo(31), today: 3, desc: "Inbound leads + listing ID mapping" },
  { id: "meta", name: "Meta Lead Ads", category: "Social / Ads", status: "Connected", lastSync: mAgo(4), today: 9, desc: "Facebook + Instagram lead forms via Webhook" },
  { id: "whatsapp", name: "WhatsApp Business", category: "Messaging", status: "Connected", lastSync: mAgo(1), today: 42, desc: "Cloud API · 3 numbers · templates" },
  { id: "googleads", name: "Google Ads", category: "Search / Ads", status: "Connected", lastSync: mAgo(22), today: 4, desc: "GCLID capture · offline conversion import" },
  { id: "gmail", name: "Gmail", category: "Email", status: "Connected", lastSync: mAgo(9), today: 12, desc: "IMAP sync · inquiry parsing" },
  { id: "telephony", name: "Cloud Telephony", category: "Calls", status: "Error", lastSync: mAgo(190), today: 0, desc: "Click-to-call · missed-call → lead" },
  { id: "website", name: "Website API", category: "Direct", status: "Connected", lastSync: mAgo(2), today: 6, desc: "POST /api/leads · UTM capture" },
];

// NEW: RERA/DLD integration
export const RERA_INTEGRATIONS: RERAIntegration[] = [
  { id: "rera-1", name: "RERA Permit Verification", status: "Connected", lastCheck: mAgo(30), permits: 156 },
  { id: "rera-2", name: "DLD Title Deed Lookup", status: "Connected", lastCheck: mAgo(45), permits: 89 },
  { id: "rera-3", name: "Ejari Registration", status: "Pending", lastCheck: dAgo(2), permits: 0 },
  { id: "rera-4", name: "Trakheesi Advertising Permit", status: "Connected", lastCheck: mAgo(120), permits: 42 },
];

export const WEBHOOKS: WebhookEvent[] = [
  { id: "WH-9001", source: "Meta", event: "leadgen.new", status: "Processed", at: mAgo(4), detail: "Lead form 'Marina 2BR' → Elena Sorokina", leadId: "LD-1001" },
  { id: "WH-9002", source: "Property Finder", event: "lead.created", status: "Processed", at: mAgo(6), detail: "Inquiry on PF-88213 → merged into Rahul Sharma", leadId: "LD-1001" },
  { id: "WH-9003", source: "Website", event: "form.property_inquiry", status: "Processed", at: mAgo(2), detail: "Property inquiry · Creek Vista Heights", leadId: "LD-1002" },
  { id: "WH-9004", source: "WhatsApp", event: "message.inbound", status: "Processed", at: mAgo(1), detail: "+971 56 220 8890 → Ahmed Mansour" },
  { id: "WH-9005", source: "Telephony", event: "call.missed", status: "Failed", at: mAgo(190), detail: "Missed call +971 55 210 7743", error: "Provider token expired (401)" },
];

export const RULES: Rule[] = [
  { id: "R-1", name: "Hot portal buyer → Senior team", when: "New Property Finder / Bayut lead", ifCond: "Budget > AED 2,000,000 AND type = Buyer", actions: ["Assign Senior Sales Team", "Mark HOT", "Create call task (5 min)", "Notify Sales Manager"], active: true, runs: 214 },
  { id: "R-2", name: "SLA escalation — 15 min", when: "New lead uncontacted", ifCond: "Age > 15 minutes", actions: ["Notify assigned agent", "Mark SLA warning"], active: true, runs: 89 },
  { id: "R-3", name: "Marina area routing", when: "New lead", ifCond: "Preferred area = Dubai Marina / JBR", actions: ["Assign Marina Team (round robin)"], active: true, runs: 156 },
  { id: "R-4", name: "Rental lead → Leasing desk", when: "New lead", ifCond: "Purpose = Rent", actions: ["Assign Leasing Agent"], active: true, runs: 342 },
];

// NEW: Email templates
export const EMAIL_TEMPLATES: EmailTemplate[] = [
  { id: "ET-1", name: "Welcome — New Lead", subject: "Thank you for your inquiry · Leads Logic", body: "Dear {name},\n\nThank you for your interest in {property}. One of our Dubai property consultants will contact you within 15 minutes.\n\nBest regards,\nLeads Logic Team", category: "Welcome" },
  { id: "ET-2", name: "Viewing Confirmation", subject: "Your property viewing is confirmed", body: "Dear {name},\n\nYour viewing for {property} is confirmed for {date} at {time}. Our consultant {agent} will meet you at the lobby.\n\nBest regards", category: "Viewing" },
  { id: "ET-3", name: "Follow-up — Properties Sent", subject: "Properties matching your requirements", body: "Dear {name},\n\nAs discussed, please find attached {count} properties matching your requirements in {area}.\n\nLooking forward to your feedback.\n\nBest regards", category: "Follow-up" },
  { id: "ET-4", name: "Booking Confirmation", subject: "Booking confirmed — {property}", body: "Dear {name},\n\nYour booking for {property} has been confirmed. Booking amount: {amount}. Please arrange transfer within 3 business days.\n\nBest regards", category: "Booking" },
  { id: "ET-5", name: "Tenancy Renewal Reminder", subject: "Your tenancy contract renewal — 90 days notice", body: "Dear {name},\n\nYour tenancy contract for {property} expires on {date}. Please contact us to discuss renewal terms.\n\nBest regards", category: "Renewal" },
];

// NEW: WhatsApp automation triggers
export const WA_AUTOMATIONS: WAAutomation[] = [
  { id: "WA-1", name: "New Lead Welcome", trigger: "Lead created", template: "Thank you for your inquiry. One of our Dubai property consultants will contact you shortly.", delay: "Immediate", active: true },
  { id: "WA-2", name: "Viewing Reminder", trigger: "Viewing scheduled", template: "Reminder: Your property viewing is scheduled for tomorrow at {time}.", delay: "T-24h", active: true },
  { id: "WA-3", name: "Follow-up — No Response", trigger: "Lead uncontacted", template: "Just checking if you would like us to arrange another viewing or send additional properties.", delay: "T+3 days", active: true },
  { id: "WA-4", name: "Booking Confirmation", trigger: "Deal status = Booking", template: "Your booking for {property} has been confirmed. Booking amount: {amount}.", delay: "Immediate", active: true },
  { id: "WA-5", name: "Renewal Reminder", trigger: "Contract expiry -90 days", template: "Your tenancy contract expires on {date}. Please contact us to discuss renewal.", delay: "T-90 days", active: true },
];

// NEW: Rental contracts
export const RENTAL_CONTRACTS: RentalContract[] = [
  { id: "RC-01", leadId: "LD-1005", propertyId: "PR-202", agentId: "u3", tenant: "Ayesha Khan", landlord: "Nour Investment LLC", annualRent: 95000, monthlyRent: 7917, deposit: 4750, agencyFee: 4750, cheques: 2, startDate: day(-30), endDate: day(335), status: "Ejari Registered", ejariNumber: "EJ-2024-88412", documents: ["tenancy_contract.pdf", "ejari_certificate.pdf", "deposit_receipt.pdf"] },
  { id: "RC-02", leadId: "LD-1007", propertyId: "PR-203", agentId: "u4", tenant: "Sophie Martin", landlord: "James Patterson", annualRent: 130000, monthlyRent: 10833, deposit: 6500, agencyFee: 6500, cheques: 4, startDate: day(0), endDate: day(365), status: "Signed", documents: ["tenancy_contract.pdf"] },
  { id: "RC-03", leadId: "LD-1010", propertyId: "PR-206", agentId: "u6", tenant: "Muhammad Usman", landlord: "Sunrise Holdings", annualRent: 52000, monthlyRent: 4333, deposit: 2600, agencyFee: 2600, cheques: 4, startDate: day(-90), endDate: day(275), status: "Ejari Registered", ejariNumber: "EJ-2024-77203", documents: ["tenancy_contract.pdf", "ejari_certificate.pdf"] },
];

export const NOTIFS: Notif[] = [
  { id: "N-1", kind: "lead", text: "New walk-in lead Tariq Aziz — unassigned, SLA clock running", at: mAgo(8), read: false },
  { id: "N-2", kind: "sla", text: "Omar Bin Sulaiman (Phone) uncontacted for 12 min — approaching SLA", at: mAgo(1), read: false },
  { id: "N-3", kind: "deal", text: "Elena Sorokina moved to Booking — Grand Bleu 1BR, deposit 10%", at: mAgo(55), read: false },
];

export const AUDIT: AuditEntry[] = [
  { id: "AU-01", user: "System", action: "Lead merged (duplicate)", entity: "LD-1001 Rahul Sharma", at: mAgo(260), from: "3 sources", to: "1 customer profile" },
  { id: "AU-02", user: "Layla Haddad", action: "Lead assigned", entity: "LD-1009 Priya Nair", at: mAgo(25), from: "Unassigned", to: "Imran Shaikh" },
  { id: "AU-03", user: "Aisha Al Mansoori", action: "Stage changed", entity: "LD-1001 Rahul Sharma", at: mAgo(260), from: "Contacted", to: "Qualified" },
];

export const THREADS: WAThread[] = [
  { leadId: "LD-1001", messages: [
    { from: "them", text: "Hi, I saw your Marina 2BR ad. Is it still available?", at: dAgo(3) },
    { from: "us", text: "Thank you for your inquiry. One of our Dubai property consultants will contact you shortly.", at: dAgo(3), status: "Read" },
    { from: "us", text: "Hello Rahul — Aisha from Leads Logic. Marina Quay West 2BR is available at 2.85M. Cash or mortgage?", at: dAgo(3) + 20 * M, status: "Read" },
    { from: "them", text: "Cash. What's the ROI history?", at: dAgo(3) + 40 * M },
  ]},
  { leadId: "LD-1005", messages: [
    { from: "them", text: "Assalam o Alaikum, looking for 1BR furnished in JVC max 90k", at: dAgo(2) },
    { from: "us", text: "Walaikum Assalam Ayesha! Imran here. Here are 4 options within budget.", at: dAgo(2) + 30 * M, status: "Delivered" },
  ]},
];

export const TASKS: TaskItem[] = [
  { id: "T-1", title: "Call Omar Bin Sulaiman after 6pm", due: mAgo(-240), done: false, leadId: "LD-1008", kind: "Call" },
  { id: "T-2", title: "Send Chen Wei final counter 5.45M", due: mAgo(-120), done: false, leadId: "LD-1004", kind: "Follow-up" },
  { id: "T-3", title: "Collect passport + Emirates ID — KYC", due: mAgo(-1800), done: false, leadId: "LD-1001", kind: "Document" },
];

export const CALLS: CallLog[] = [
  { id: "CL-1", leadId: "LD-1008", number: "+971 55 210 7743", name: "Omar Bin Sulaiman", direction: "Inbound", at: mAgo(12), duration: 160, outcome: "Interested — callback after 6pm", agentId: "u9" },
  { id: "CL-2", leadId: "LD-1002", number: "+971 50 774 2280", name: "Fatima Al Zahra", direction: "Outbound", at: dAgo(4), duration: 252, outcome: "Qualified — viewing booked", agentId: "u4" },
];

export const EMAILS: EmailMsg[] = [
  { id: "EM-1", from: "James Whitfield", email: "j.whitfield@whitcap.co.uk", subject: "RE: Boulevard Point penthouse — offer 8.4M", preview: "Vikram, my solicitor reviewed the MOU. We proceed at 8.4M…", at: mAgo(90), source: "Gmail" },
  { id: "EM-2", from: "Property Finder Noreply", email: "leads@propertyfinder.ae", subject: "New inquiry: PF-88213 Marina Quay West", preview: "A new inquiry has arrived on your listing…", at: mAgo(26), source: "IMAP parse" },
];

export const DOCS: DocItem[] = [
  { id: "DC-1", name: "title_deed_maple.pdf", entity: "PR-205", type: "Title Deed", size: "1.2 MB", at: dAgo(2), by: "Chen Lu" },
  { id: "DC-2", name: "passport_elena_sorokina.pdf", entity: "LD-1001", type: "Passport (KYC)", size: "640 KB", at: dAgo(1), by: "Aisha Al Mansoori" },
];

export const LIVE_TEMPLATES: Partial<Lead>[] = [
  { name: "Yusuf Karim", phone: "+971 58 220 4471", type: "Buyer", purpose: "Investment", budget: 1900000, area: "Business Bay", propertyType: "Apartment", bedrooms: 1, timeline: "1–3 months", nationality: "Egypt" },
  { name: "Amelia Clarke", phone: "+44 7700 900333", type: "Buyer", purpose: "Investment", budget: 2700000, area: "Dubai Marina", propertyType: "Apartment", bedrooms: 2, timeline: "3–6 months", nationality: "United Kingdom", country: "UK" },
  { name: "Sana Malik", phone: "+971 54 771 2208", type: "Tenant", purpose: "Rent", budget: 75000, area: "Jumeirah Village Circle", propertyType: "Apartment", bedrooms: 1, timeline: "Immediate", nationality: "Pakistan", furnished: "Furnished" },
];

export const LIVE_SOURCES: [string, string][] = [
  ["Property Finder", "lead.created"], ["Meta", "leadgen.new"], ["Bayut", "lead.created"],
  ["Website", "form.property_inquiry"], ["WhatsApp", "message.inbound"],
];

export const ROLE_ACCESS: Record<string, string[]> = {
  "Managing Director": ["*"], "Sales Manager": ["*"], Super_Admin: ["*"],
  "Sales Agent": ["dashboard", "leads", "pipeline", "contacts", "portfolio", "viewings", "deals", "comms", "marketing", "team", "automation", "settings"],
  "Leasing Agent": ["dashboard", "leads", "pipeline", "contacts", "portfolio", "viewings", "deals", "comms", "rental", "team", "settings"],
  "Listing Agent": ["dashboard", "contacts", "portfolio", "viewings", "comms", "team", "settings"],
  "Marketing Manager": ["dashboard", "leads", "marketing", "team", "integrations", "automation", "settings"],
  Telecaller: ["dashboard", "leads", "comms", "team"],
  "Accounts / Finance": ["dashboard", "deals", "team", "settings"],
  "Admin / Operations": ["dashboard", "leads", "contacts", "portfolio", "viewings", "deals", "comms", "rental", "team", "integrations", "automation", "settings"],
  Viewer: ["dashboard"],
};
