import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import works from "@/data/works.json";

export const metadata = {
  title: "外構・庭リフォームの費用相場まとめ2025 | 庭リフォームナビ",
  description: "外構工事・庭リフォームの費用相場を工事の種類別に詳しく解説。ウッドデッキ・カーポート・フェンスなど全工種の費用目安を紹介します。",
};

const costDetails = [
  { label: "解体・撤去費用", range: "5〜30万円", note: "既存構造物の撤去が必要な場合" },
  { label: "基礎工事費用", range: "10〜30万円", note: "コンクリート基礎が必要な工事" },
  { label: "材料費", range: "工事費の50〜70%", note: "素材・商品によって大きく変動" },
  { label: "施工費", range: "工事費の30〜50%", note: "職人の技術料・人件費" },
  { label: "設計・デザイン料", range: "0〜10万円", note: "本格設計の場合に発生" },
  { label: "諸経費・廃材処分", range: "2〜10万円", note: "廃材処分や現場管理費" },
];

export default function CostTotalPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Breadcrumb items={[
        { label: "費用相場", href: "/cost/total/" },
        { label: "外構費用の総まとめ" },
      ]} />

      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
        外構・庭リフォームの費用相場まとめ2025
      </h1>
      <p className="text-gray-600 mb-8">外構工事の費用相場を種類別・規模別に詳しく解説します。見積もり前の参考にしてください。</p>

      {/* Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-primary text-white rounded-2xl p-6 text-center">
          <div className="text-sm text-emerald-100 mb-2">小規模工事（部分的）</div>
          <div className="text-2xl font-bold mb-1">10〜80万円</div>
          <div className="text-xs text-emerald-200">フェンス・ライティングなど</div>
        </div>
        <div className="bg-secondary text-white rounded-2xl p-6 text-center">
          <div className="text-sm text-amber-100 mb-2">中規模工事（一般的）</div>
          <div className="text-2xl font-bold mb-1">80〜200万円</div>
          <div className="text-xs text-amber-200">駐車場+フェンス+植栽など</div>
        </div>
        <div className="bg-accent text-white rounded-2xl p-6 text-center">
          <div className="text-sm text-blue-100 mb-2">大規模工事（フル）</div>
          <div className="text-2xl font-bold mb-1">200〜500万円</div>
          <div className="text-xs text-blue-200">全外構のフルリフォーム</div>
        </div>
      </div>

      {/* Work by Work */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
        <h2 className="text-xl font-bold mb-4 text-gray-800">工事の種類別 費用相場</h2>
        <div className="space-y-4">
          {works.map((work) => (
            <div key={work.slug} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
              <div className="flex items-center justify-between mb-2">
                <Link href={`/work/${work.slug}/`} className="font-bold text-primary hover:underline">{work.title}</Link>
                <span className="font-bold text-gray-800">{work.costRange}</span>
              </div>
              <p className="text-sm text-gray-600">{work.description.slice(0, 80)}...</p>
              <div className="flex gap-3 mt-2 text-xs text-gray-500">
                <span>工期: {work.duration}</span>
                <span>難易度: {work.difficulty}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cost Breakdown */}
      <div className="bg-bg rounded-2xl p-6 mb-8">
        <h2 className="text-xl font-bold mb-4 text-gray-800">外構工事費用の内訳</h2>
        <div className="space-y-3">
          {costDetails.map((item, i) => (
            <div key={i} className="bg-white rounded-xl p-4 flex items-center justify-between gap-4">
              <div>
                <div className="font-bold text-sm text-gray-800">{item.label}</div>
                <div className="text-xs text-gray-500">{item.note}</div>
              </div>
              <div className="text-primary font-bold text-sm shrink-0">{item.range}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Saving Tips */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
        <h2 className="text-xl font-bold mb-4 text-gray-800">外構費用を節約するポイント</h2>
        <ul className="space-y-3">
          {[
            "複数業者から見積もりを取って比較する（最低3社）",
            "ハウスメーカーを経由せず外構専門業者に直接依頼する",
            "工事時期をオフシーズン（11月〜2月）にずらす",
            "一度に複数の工事をまとめて依頼する",
            "DIYできる部分は自分でやる",
            "外構ローンや補助金制度を活用する",
          ].map((tip, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
              <span className="text-primary font-bold mt-0.5">✓</span>
              {tip}
            </li>
          ))}
        </ul>
      </div>

      {/* Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <Link href="/cost/budget/" className="bg-bg rounded-xl p-4 hover:bg-emerald-100 transition-colors">
          <div className="font-bold text-gray-800 mb-1">💰 予算別プランガイド</div>
          <div className="text-sm text-gray-500">予算に合わせた工事プランを提案</div>
        </Link>
        <Link href="/ranking/estimate/" className="bg-accent text-white rounded-xl p-4 hover:bg-blue-700 transition-colors">
          <div className="font-bold mb-1">
            <span className="text-xs bg-white text-accent px-1.5 py-0.5 rounded font-bold mr-1">PR</span>
            無料見積もりを取る
          </div>
          <div className="text-sm text-blue-100">複数業者に一括依頼で費用比較</div>
        </Link>
      </div>
    </div>
  );
}
