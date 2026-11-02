import worksData from "@/data/works.json";

export type SourceLink = { label: string; url: string };

export type WorkFaq = {
  question: string;
  answer: string;
  source?: { text: string; links: SourceLink[] };
};

export type GuideBlock =
  | { p: string }
  | { list: string[] }
  | { table: { columns: string[]; rows: string[][] } };

export type GuideSection = {
  heading: string;
  blocks: GuideBlock[];
  sources: SourceLink[];
};

// メーカー公式サイトの記載をまとめた工事ページ（費用相場・工期を扱わない）
export type WorkGuide = {
  metaTitle: string;
  metaDescription: string;
  h1: string;
  lead: string;
  checked: string;
  sections: GuideSection[];
};

// 費用相場ページの冒頭に置く答え（出典の記載どおりの値だけ）
export type WorkCostAnswer = {
  heading: string;
  items: string[];
  note: string;
  checked: string;
  sources: SourceLink[];
};

export type WorkMeta = {
  title: string;
  description: string;
  h1: string;
};

export type Work = {
  slug: string;
  title: string;
  description: string;
  duration?: string;
  difficulty?: string;
  tips?: string[];
  recommendedCompanies: string[];
  faqs: WorkFaq[];
  guide?: WorkGuide;
  meta?: WorkMeta;
  costAnswer?: WorkCostAnswer;
};

export type WorkWithStats = Work & { duration: string; difficulty: string };

const works = worksData as unknown as Work[];

export const hasStats = (w: Work): w is WorkWithStats =>
  typeof w.duration === "string" && typeof w.difficulty === "string";

export default works;
