import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";

export const metadata = {
  title: "予算別 外構・庭リフォームプランガイド | 庭リフォームナビ",
  description: "100万円・200万円・300万円など、予算別の外構工事プランを紹介しています。予算に応じて実施できる工事の目安をまとめています。",  alternates: { canonical: "/cost/budget/" },
};

const budgetPlans = [
  {
    budget: "〜50万円",
    color: "bg-green-100 text-green-800",
    title: "コンパクトプラン",
    description: "小規模な工事や部分的な改修に適した予算",
    works: [
      "フェンス・塀の設置（延長10m程度）",
      "門扉の交換・設置",
      "ガーデンライティングの設置",
      "植栽・グラウンドカバーの整備",
      "小型ウッドデッキ（6〜8㎡）",
    ],
    tips: "必要な部分から工事を行い、予算に応じて追加する方法も有効です",
  },
  {
    budget: "50〜100万円",
    color: "bg-blue-100 text-blue-800",
    title: "スタンダードプラン",
    description: "一般的な外構の主要工事に対応",
    works: [
      "カーポート1台用の設置",
      "ウッドデッキ（10〜15㎡）の設置",
      "コンクリート舗装（駐車場20㎡）",
      "フェンス＋門扉のセット",
      "植栽・庭デザイン（小規模）",
    ],
    tips: "カーポートやウッドデッキなど、主要な工事を一つ行うには十分な予算です",
  },
  {
    budget: "100〜200万円",
    color: "bg-yellow-100 text-yellow-800",
    title: "スタンダードプラス",
    description: "新築外構や本格的な庭の改修に対応",
    works: [
      "駐車場コンクリート＋カーポート",
      "アプローチ＋門柱・ポストの設置",
      "フェンス・目隠しの設置",
      "ウッドデッキ＋植栽",
      "ライティング演出",
    ],
    tips: "新築外構の平均的な予算です。住宅全体の外観を整えられます",
  },
  {
    budget: "200〜300万円",
    color: "bg-orange-100 text-orange-800",
    title: "プレミアムプラン",
    description: "本格的なガーデンデザインや設備の導入に対応",
    works: [
      "2台用カーポート＋コンクリート舗装",
      "本格ガーデンデザイン・植栽",
      "ウッドデッキ＋ガーデンルーム",
      "自動門扉＋セキュリティ設備",
      "庭全体のトータルデザイン",
    ],
    tips: "デザイン性と機能性を両立した庭づくりが可能な予算です",
  },
  {
    budget: "300万円〜",
    color: "bg-purple-100 text-purple-800",
    title: "フルリフォームプラン",
    description: "高級感のある本格的な外構に対応",
    works: [
      "大規模ガーデンデザイン全般",
      "ガレージ・本格カーポート",
      "庭全体の造成・排水整備",
      "高品質素材の全面舗装",
      "プール・ガーデンルームなど大型設備",
    ],
    tips: "住まいの価値を高める本格的な外構です。デザイン会社への依頼をおすすめします",
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
        予算に応じた外構工事のプランを紹介しています。それぞれの予算で実施できる工事の目安としてご活用ください。
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
        <h2 className="text-xl font-bold mb-2">予算に応じた見積もりの取得</h2>
        <p className="text-emerald-100 mb-4">フォームに予算を入力すると、対応可能な業者から見積もりが届きます</p>
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
          <div className="text-sm text-gray-500 mt-1">工事の種類別の費用相場</div>
        </Link>
        <Link href="/ranking/" className="bg-bg rounded-xl p-4 hover:bg-emerald-100 transition-colors">
          <div className="font-bold text-gray-800"> 業者ランキングを見る</div>
          <div className="text-sm text-gray-500 mt-1">外構業者10社の比較</div>
        </Link>
      </div>
    </div>
  );
}
