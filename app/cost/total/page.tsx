import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import works from "@/data/works.json";

export const metadata = {
  title: "外構・庭リフォームの費用の確認点まとめ | 庭リフォームナビ",
  description: "外構工事・庭リフォームの費用を確認する際の要点を工事の種類別にまとめています。ウッドデッキ・カーポート・フェンスなど各工事の費用の目安は、出典とともに工事別のページに掲載しています。",  alternates: { canonical: "/cost/total/" },
};


export default function CostTotalPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Breadcrumb items={[
        { label: "費用相場", href: "/cost/total/" },
        { label: "外構費用の総まとめ" },
      ]} />

      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
        外構・庭リフォームの費用の確認点まとめ
      </h1>
      <p className="text-gray-600 mb-8">外構工事の費用を確認する際の要点を、工事の種類別にまとめています。見積もりを依頼する前の参考としてご活用ください。</p>

      {/* Overview：規模別の金額は出典がないため 2026-10-25 に削除 */}
      <div className="bg-bg rounded-2xl p-6 mb-8 text-sm text-gray-700 leading-relaxed">
        外構工事の費用は、敷地の広さ・素材・既存構造物の撤去の有無で大きく変わります。工事ごとの費用の目安は、掲載サービスの記事に記載された金額を出典とともに各工事のページに掲載しています。金額は業者の見積もりで確認してください。
      </div>

      {/* Work by Work */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
        <h2 className="text-xl font-bold mb-4 text-gray-800">工事の種類別の工期と難易度</h2>
        <div className="space-y-4">
          {works.map((work) => (
            <div key={work.slug} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
              <div className="flex items-center justify-between mb-2">
                <Link href={`/work/${work.slug}/`} className="font-bold text-primary hover:underline">{work.title}</Link>
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

      {/* Saving Tips */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
        <h2 className="text-xl font-bold mb-4 text-gray-800">外構費用を抑える方法</h2>
        <ul className="space-y-3">
          {[
            "複数の業者から見積もりを取得して比較する（3社以上）",
            "ハウスメーカーを経由せず、外構専門業者に直接依頼する",
            "工事の時期を閑散期（11月〜2月）に設定する",
            "一度に複数の工事をまとめて依頼する",
            "DIYで行える部分は自分で施工する",
            "外構ローンや補助金制度を利用する",
          ].map((tip, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
              <span className="text-primary font-bold mt-0.5"></span>
              {tip}
            </li>
          ))}
        </ul>
      </div>

      {/* Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <Link href="/ranking/cheap/" className="bg-bg rounded-xl p-4 hover:bg-emerald-100 transition-colors">
          <div className="font-bold text-gray-800 mb-1"> 外構工事の費用を抑える方法</div>
          <div className="text-sm text-gray-500">見積もりの確認点と依頼先の公式情報</div>
        </Link>
        <Link href="/ranking/estimate/" className="bg-accent text-white rounded-xl p-4 hover:bg-blue-700 transition-colors">
          <div className="font-bold mb-1">
            <span className="text-xs bg-white text-accent px-1.5 py-0.5 rounded font-bold mr-1">PR</span>
            無料で見積もりを依頼する
          </div>
          <div className="text-sm text-blue-100">複数の業者に一括で依頼し、費用を比較</div>
        </Link>
      </div>
    </div>
  );
}
