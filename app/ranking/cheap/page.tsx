import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import companies from "@/data/companies.json";

export const metadata = {
  title: "外構工事 安い業者ランキング2025 | 庭リフォームナビ",
  description: "外構工事が安い業者ランキング。費用を抑えて高品質な工事をするためのおすすめ業者を紹介します。",
};

// Sort by cheapness (simplified based on avgCost)
const cheapRanking = [
  companies.find((c) => c.slug === "ex-shop")!,
  companies.find((c) => c.slug === "mitsumoa")!,
  companies.find((c) => c.slug === "kurashi-no-market")!,
  companies.find((c) => c.slug === "hikaku-biz")!,
  companies.find((c) => c.slug === "townlife-exterior")!,
];

export default function CheapRankingPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Breadcrumb items={[
        { label: "ランキング", href: "/ranking/" },
        { label: "安い業者ランキング" },
      ]} />

      <div className="text-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
          外構工事 安い業者ランキング2025
        </h1>
        <p className="text-gray-600">費用を抑えながら品質のいい外構工事ができる業者を厳選</p>
      </div>

      {/* Tips */}
      <div className="bg-bg rounded-2xl p-6 mb-8">
        <h2 className="font-bold text-lg mb-3 text-gray-800">外構費用を安くするコツ</h2>
        <ul className="space-y-2 text-sm text-gray-700">
          {[
            "複数業者から見積もりを取って比較する（最低3社推奨）",
            "ハウスメーカー経由ではなく直接業者に依頼する",
            "オフシーズン（11〜2月）に依頼すると値引き交渉しやすい",
            "工事をまとめて依頼することで割引を受けられる場合がある",
            "自分でできる部分はDIYで対応して費用削減",
          ].map((tip, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="text-primary font-bold"></span>
              {tip}
            </li>
          ))}
        </ul>
      </div>

      {/* Ranking */}
      <div className="space-y-4 mb-8">
        {cheapRanking.map((company, i) => (
          <div key={company.slug} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center gap-3 mb-3">
              <span className={`text-white text-sm font-bold px-3 py-1.5 rounded-xl ${i === 0 ? "bg-yellow-500" : i === 1 ? "bg-gray-400" : i === 2 ? "bg-amber-600" : "bg-gray-300"}`}>
                {i + 1}位
              </span>
              <h2 className="font-bold text-lg text-gray-900">{company.name}</h2>
              <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full font-medium ml-auto">{company.avgCost}</span>
            </div>
            <p className="text-sm text-gray-600 mb-3">{company.tagline}</p>
            <ul className="space-y-1 mb-4">
              {company.pros.map((pro, j) => (
                <li key={j} className="text-sm text-gray-700 flex items-start gap-1">
                  <span className="text-green-500">◎</span>{pro}
                </li>
              ))}
            </ul>
            <div className="flex gap-3">
              <Link href={`/company/${company.slug}/`} className="bg-bg text-primary border border-primary px-4 py-2 rounded-lg text-sm font-bold hover:bg-primary hover:text-white transition-colors">
                詳細を見る
              </Link>
              <a href={company.officialUrl} target="_blank" rel="noopener noreferrer nofollow" className="bg-accent text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-700 transition-colors">
                <span className="text-xs bg-white text-accent px-1 py-0.5 rounded font-bold mr-1">PR</span>
                無料見積もり
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
