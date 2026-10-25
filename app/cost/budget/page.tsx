import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";

export const metadata = {
  title: "予算に合わせた外構・庭リフォームの見積もりの取り方 | 庭リフォームナビ",
  description: "予算に合わせて外構・庭リフォームを依頼する際の見積もりの取り方をまとめています。予算ごとにできる工事の範囲は、業者の見積もりで確認してください。",  alternates: { canonical: "/cost/budget/" },
};

export default function BudgetPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Breadcrumb items={[
        { label: "費用相場", href: "/cost/total/" },
        { label: "予算に合わせた見積もりの取り方" },
      ]} />

      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
        予算に合わせた外構・庭リフォームの見積もりの取り方
      </h1>
      <p className="text-gray-600 mb-8">
        予算に合わせて外構・庭リフォームを依頼する際の進め方をまとめています。
      </p>

      {/* 予算帯ごとの工事例は出典がないため 2026-10-25 に削除 */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8 text-sm text-gray-700 leading-relaxed">
        予算ごとにできる工事の範囲は、敷地の広さ・素材・既存構造物の撤去の有無によって変わります。予算帯ごとの工事例は公式・公的機関の資料で確認できないため、当サイトでは掲載していません。金額は業者の見積もりで確認してください。工事ごとの費用の目安は、各工事のページに出典つきで掲載しています。
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
          <div className="font-bold text-gray-800"> 費用の確認点を見る</div>
          <div className="text-sm text-gray-500 mt-1">工事の種類別の工期と難易度</div>
        </Link>
        <Link href="/ranking/" className="bg-bg rounded-xl p-4 hover:bg-emerald-100 transition-colors">
          <div className="font-bold text-gray-800"> 業者ランキングを見る</div>
          <div className="text-sm text-gray-500 mt-1">外構業者10社の比較</div>
        </Link>
      </div>
    </div>
  );
}
