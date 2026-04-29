import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";

export const metadata = {
  title: "予算別 外構・庭リフォームプランガイド | 庭リフォームナビ",
  description: "100万円・200万円・300万円など予算別の外構工事プランを紹介。予算に合わせた最適な外構づくりをサポートします。",
};

const budgetPlans = [
  {
    budget: "〜50万円",
    color: "bg-green-100 text-green-800",
    title: "コンパクトプラン",
    description: "小規模な工事や部分的なリフォームに最適",
    works: [
      "フェンス・塀の設置（延長10m程度）",
      "門扉の交換・設置",
      "ガーデンライティングの設置",
      "植栽・グラウンドカバーの整備",
      "小型ウッドデッキ（6〜8㎡）",
    ],
    tips: "まずは必要な部分だけ工事して、予算ができたら追加するのもおすすめ",
  },
  {
    budget: "50〜100万円",
    color: "bg-blue-100 text-blue-800",
    title: "スタンダードプラン",
    description: "一般的な外構の主要工事をカバー",
    works: [
      "カーポート1台用の設置",
      "ウッドデッキ（10〜15㎡）の設置",
      "コンクリート舗装（駐車場20㎡）",
      "フェンス＋門扉のセット",
      "植栽・庭デザイン（小規模）",
    ],
    tips: "カーポートやウッドデッキなど一つのメイン工事をしっかり作るなら十分な予算",
  },
  {
    budget: "100〜200万円",
    color: "bg-yellow-100 text-yellow-800",
    title: "スタンダードプラス",
    description: "新築外構や本格的な庭リフォームに対応",
    works: [
      "駐車場コンクリート＋カーポート",
      "アプローチ＋門柱・ポストの設置",
      "フェンス・目隠しの設置",
      "ウッドデッキ＋植栽",
      "ライティング演出",
    ],
    tips: "新築外構の平均的な予算。家全体の外観をきれいに整えられる",
  },
  {
    budget: "200〜300万円",
    color: "bg-orange-100 text-orange-800",
    title: "プレミアムプラン",
    description: "本格的なガーデンデザインや充実した設備",
    works: [
      "2台用カーポート＋コンクリート舗装",
      "本格ガーデンデザイン・植栽",
      "ウッドデッキ＋ガーデンルーム",
      "自動門扉＋セキュリティ設備",
      "庭全体のトータルデザイン",
    ],
    tips: "こだわりの庭づくりが可能な予算。デザイン性と機能性を両立",
  },
  {
    budget: "300万円〜",
    color: "bg-purple-100 text-purple-800",
    title: "フルリフォームプラン",
    description: "高級感あふれる本格外構の実現",
    works: [
      "大規模ガーデンデザイン全般",
      "ガレージ・本格カーポート",
      "庭全体の造成・排水整備",
      "高品質素材の全面舗装",
      "プール・ガーデンルームなど大型設備",
    ],
    tips: "住まいの価値を高める本格外構。デザイン会社への依頼を推奨",
  },
];

export default function BudgetPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Breadcrumb items={[
        { label: "費用相場", href: "/cost/total/" },
        { label: "予算別プランガイド" },
      ]} />

      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
        予算別 外構・庭リフォームプランガイド
      </h1>
      <p className="text-gray-600 mb-8">
        予算に合わせた外構工事のプランを紹介します。それぞれの予算でどんな工事ができるかの目安として参考にしてください。
      </p>

      {/* Budget Plans */}
      <div className="space-y-6 mb-8">
        {budgetPlans.map((plan) => (
          <div key={plan.budget} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center gap-3 mb-3">
              <span className={`text-sm font-bold px-4 py-2 rounded-full ${plan.color}`}>
                {plan.budget}
              </span>
              <h2 className="text-lg font-bold text-gray-800">{plan.title}</h2>
            </div>
            <p className="text-gray-600 text-sm mb-4">{plan.description}</p>
            <div className="bg-bg rounded-xl p-4 mb-3">
              <h3 className="text-sm font-bold text-gray-700 mb-2">この予算でできる工事の例</h3>
              <ul className="space-y-1">
                {plan.works.map((work, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                    <span className="text-primary"></span>
                    {work}
                  </li>
                ))}
              </ul>
            </div>
            <div className="text-xs text-gray-500 bg-yellow-50 rounded-lg p-3 border border-yellow-200">
               {plan.tips}
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-r from-primary to-emerald-600 rounded-2xl p-8 text-white text-center">
        <h2 className="text-xl font-bold mb-2">予算に合わせた見積もりを取る</h2>
        <p className="text-emerald-100 mb-4">予算をフォームに入力するだけで、対応できる業者から見積もりが届きます</p>
        <Link
          href="/ranking/estimate/"
          className="bg-white text-primary px-8 py-3 rounded-full font-bold hover:bg-emerald-50 transition-colors inline-block"
        >
          <span className="text-xs bg-primary text-white px-1.5 py-0.5 rounded font-bold mr-2">PR</span>
          無料で見積もりを比較する →
        </Link>
      </div>

      {/* Related Links */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link href="/cost/total/" className="bg-bg rounded-xl p-4 hover:bg-emerald-100 transition-colors">
          <div className="font-bold text-gray-800"> 費用相場の詳細を見る</div>
          <div className="text-sm text-gray-500 mt-1">工事の種類別の詳しい費用相場</div>
        </Link>
        <Link href="/ranking/" className="bg-bg rounded-xl p-4 hover:bg-emerald-100 transition-colors">
          <div className="font-bold text-gray-800"> 業者ランキングを見る</div>
          <div className="text-sm text-gray-500 mt-1">おすすめ外構業者10社を比較</div>
        </Link>
      </div>
    </div>
  );
}
