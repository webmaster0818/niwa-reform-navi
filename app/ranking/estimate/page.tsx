import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import companies from "@/data/companies.json";

export const metadata = {
  title: "外構工事 一括見積もりおすすめサービス2025 | 庭リフォームナビ",
  description: "外構工事の一括見積もりにおすすめのサービスを比較。タウンライフエクステリアなど無料で複数業者に依頼できるサービスを紹介。",
};

const estimateRanking = [
  companies.find((c) => c.slug === "townlife-exterior")!,
  companies.find((c) => c.slug === "gaiko-partners")!,
  companies.find((c) => c.slug === "garden-plus")!,
  companies.find((c) => c.slug === "rishop-navi")!,
  companies.find((c) => c.slug === "home-pro")!,
];

export default function EstimateRankingPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Breadcrumb items={[
        { label: "ランキング", href: "/ranking/" },
        { label: "見積もりおすすめサービス" },
      ]} />

      {/* Hero */}
      <div className="bg-gradient-to-r from-accent to-blue-700 rounded-2xl p-8 text-white text-center mb-8">
        <div className="text-sm font-bold bg-white text-accent inline-block px-3 py-1 rounded-full mb-3">PR</div>
        <h1 className="text-2xl md:text-3xl font-bold mb-3">
          外構工事 一括見積もりおすすめサービス2025
        </h1>
        <p className="text-blue-100 mb-4">複数業者から無料で見積もりを取って費用を比較しましょう</p>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold">無料</div>
            <div className="text-xs text-blue-200">見積もり費用</div>
          </div>
          <div>
            <div className="text-2xl font-bold">最大5社</div>
            <div className="text-xs text-blue-200">比較可能</div>
          </div>
          <div>
            <div className="text-2xl font-bold">最短即日</div>
            <div className="text-xs text-blue-200">回答</div>
          </div>
        </div>
      </div>

      {/* How to */}
      <div className="bg-bg rounded-2xl p-6 mb-8">
        <h2 className="font-bold text-lg mb-4 text-gray-800">一括見積もりの流れ</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { step: "1", label: "フォーム入力", desc: "工事内容・住所を入力（3分）" },
            { step: "2", label: "業者選定", desc: "条件に合う業者をマッチング" },
            { step: "3", label: "見積もり受信", desc: "各社から見積もりが届く" },
            { step: "4", label: "業者を選ぶ", desc: "価格・内容を比較して決定" },
          ].map((s) => (
            <div key={s.step} className="text-center">
              <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-2">{s.step}</div>
              <div className="font-bold text-sm text-gray-800">{s.label}</div>
              <div className="text-xs text-gray-500 mt-1">{s.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Ranking */}
      <h2 className="text-xl font-bold mb-4 text-gray-800">一括見積もりおすすめサービス</h2>
      <div className="space-y-4 mb-8">
        {estimateRanking.map((company, i) => (
          <div key={company.slug} className={`bg-white rounded-2xl shadow-sm border ${i === 0 ? "border-accent border-2" : "border-gray-100"} p-6`}>
            {i === 0 && (
              <div className="bg-accent text-white text-xs font-bold px-3 py-1 rounded-full inline-block mb-3">
                編集部イチオシ
              </div>
            )}
            <div className="flex items-center gap-3 mb-3">
              <span className={`text-white text-sm font-bold px-3 py-1.5 rounded-xl ${i === 0 ? "bg-yellow-500" : i === 1 ? "bg-gray-400" : i === 2 ? "bg-amber-600" : "bg-gray-300"}`}>
                {i + 1}位
              </span>
              <h3 className="font-bold text-lg text-gray-900">{company.name}</h3>
            </div>
            <p className="text-primary font-medium text-sm mb-2">{company.tagline}</p>
            <p className="text-sm text-gray-600 mb-3">{company.description.slice(0, 100)}...</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {company.features.map((f, j) => (
                <span key={j} className="bg-bg text-primary text-xs px-2 py-0.5 rounded border border-emerald-200">{f}</span>
              ))}
            </div>
            <div className="flex gap-3">
              <Link href={`/company/${company.slug}/`} className="bg-bg text-primary border border-primary px-4 py-2 rounded-lg text-sm font-bold hover:bg-primary hover:text-white transition-colors">
                詳細を見る
              </Link>
              <a href={company.officialUrl} target="_blank" rel="noopener noreferrer nofollow" className="bg-accent text-white px-6 py-2 rounded-lg text-sm font-bold hover:bg-blue-700 transition-colors">
                <span className="text-xs bg-white text-accent px-1 py-0.5 rounded font-bold mr-1">PR</span>
                無料で見積もり依頼
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center">
        <Link href="/ranking/" className="text-primary font-bold hover:underline">← 総合ランキングに戻る</Link>
      </div>
    </div>
  );
}
