import data from "@/data/subsidies.json";

export type SubsidySource = { title: string; url: string };
export type SubsidyAmount = { item: string; detail: string };
export type SubsidyFaq = { question: string; answer: string };

// 自治体の補助・助成制度（2026-11-01 okina 承認。金額は公式で確認し、年度と確認日を明記）
export type Subsidy = {
  slug: string;
  name: string;
  pref: string;
  kind: "政令指定都市" | "東京23区";
  programName: string;
  url: string;
  pageTitle: string;
  pageUpdated: string | null;
  fiscalYear: string | null;
  status: string;
  statusNote: string;
  period: string | null;
  summary: string;
  target: string;
  work: string;
  amounts: SubsidyAmount[];
  applicant: string | null;
  beforeContract: string | null;
  flow: string[];
  contact: string;
  notes: string[];
  extraSources: SubsidySource[];
  checked: string;
  // 自治体別ページを持つ場合のみ
  page?: {
    metaTitle: string;
    metaDescription: string;
    h1: string;
    lead: string;
    faqs: SubsidyFaq[];
  };
};

export type SubsidyHub = {
  updated: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  lead: string;
  sections: { heading: string; body: string; points: string[] }[];
  faqs: SubsidyFaq[];
  items: Subsidy[];
};

const d = data as unknown as { blockWall: SubsidyHub; ikegaki: SubsidyHub };

export const blockWall = d.blockWall;
export const ikegaki = d.ikegaki;
export const blockWallPages = blockWall.items.filter((s) => s.page);
export const KINDS = ["政令指定都市", "東京23区"] as const;
