import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import companies from "@/data/companies.json";

export const metadata = {
  title: "外構業者おすすめランキング2025 | 庭リフォームナビ",
  description: "外構・庭リフォーム業者の総合おすすめランキング。タウンライフエクステリアやガーデンプラスなど全10社を徹底比較します。",
};

const medals = ["", "", ""];
const medalColors = ["bg-yellow-500", "bg-gray-400", "bg-amber-600"];

export default function RankingPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Breadcrumb items={[{ label: "外構業者ランキング" }]} />

      <div className="text-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
          外構業者おすすめランキング2025
        </h1>
        <p className="text-gray-600">編集部が厳選したおすすめ外構業者10社を総合評価で順位付け</p>
      </div>

      {/* Sub Rankings */}
      <div className="flex gap-3 justify-center mb-8 flex-wrap">
        <Link href="/ranking/cheap/" className="bg-bg border border-primary text-primary px-4 py-2 rounded-full text-sm font-bold hover:bg-primary hover:text-white transition-colors">
           安さランキング
        </Link>
        <Link href="/ranking/estimate/" className="bg-accent text-white px-4 py-2 rounded-full text-sm font-bold hover:bg-blue-700 transition-colors">
          <span className="text-xs bg-white text-accent px-1 py-0.5 rounded font-bold mr-1">PR</span>
          見積もりおすすめ
        </Link>
      </div>

      {/* Ranking List */}
      <div className="space-y-4">
        {companies.map((company, i) => (
          <div key={company.slug} className={`bg-white rounded-2xl shadow-sm border ${i < 3 ? "border-primary" : "border-gray-100"} p-6`}>
            <div className="flex items-start gap-4">
              <div className="shrink-0 text-center">
                <span className={`text-white text-sm font-bold px-3 py-1.5 rounded-xl inline-block ${i < 3 ? medalColors[i] : "bg-gray-300"}`}>
                  {i < 3 ? medals[i] : `${i + 1}位`}
                </span>
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h2 className="text-lg font-bold text-gray-900">{company.name}</h2>
                    <p className="text-primary text-sm font-medium">{company.tagline}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-xs text-gray-500">費用相場</div>
                    <div className="text-sm font-bold text-gray-800">{company.avgCost}</div>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-2">{company.description.slice(0, 80)}...</p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {company.features.slice(0, 3).map((f, j) => (
                    <span key={j} className="bg-bg text-primary text-xs px-2 py-0.5 rounded border border-emerald-200">{f}</span>
                  ))}
                </div>
                <div className="flex gap-3 mt-4">
                  <Link
                    href={`/company/${company.slug}/`}
                    className="bg-bg text-primary border border-primary px-4 py-2 rounded-lg text-sm font-bold hover:bg-primary hover:text-white transition-colors"
                  >
                    詳細を見る
                  </Link>
                  <a
                    href={company.officialUrl}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="bg-accent text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-700 transition-colors"
                  >
                    <span className="text-xs bg-white text-accent px-1 py-0.5 rounded font-bold mr-1">PR</span>
                    公式サイト
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="mt-10 bg-gradient-to-r from-primary to-emerald-600 rounded-2xl p-8 text-white text-center">
        <h2 className="text-xl font-bold mb-2">複数業者に一括で見積もり依頼</h2>
        <p className="text-emerald-100 mb-4">比較することで最大30%のコスト削減に成功した例も</p>
        <Link
          href="/ranking/estimate/"
          className="bg-white text-primary px-8 py-3 rounded-full font-bold hover:bg-emerald-50 transition-colors inline-block"
        >
          無料一括見積もりを始める
        </Link>
      </div>
    </div>
  );
}
