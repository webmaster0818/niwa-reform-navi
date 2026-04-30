import Breadcrumb from "@/components/Breadcrumb";

export const metadata = {
  title: "利用規約 | 庭リフォームナビ",
  description: "庭リフォームナビの利用規約です。サービス利用前に必ずお読みください。",
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Breadcrumb items={[{ label: "利用規約" }]} />

      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">利用規約</h1>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 space-y-8 text-gray-700 leading-relaxed">

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3 pb-2 border-b border-gray-200">第1条（サービスの概要）</h2>
          <p>
            庭リフォームナビ（以下「本サービス」）は、庭・外構リフォームに関する情報提供を目的として運営されるメディアサービスです。
            本規約は、本サービスをご利用いただくすべてのユーザーに適用されます。
            本サービスをご利用いただいた時点で、本規約に同意いただいたものとみなします。
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3 pb-2 border-b border-gray-200">第2条（禁止事項）</h2>
          <p className="mb-3">ユーザーは、本サービスの利用にあたり、以下の行為を行ってはなりません。</p>
          <ul className="list-disc list-inside space-y-2 pl-2">
            <li>法令または公序良俗に違反する行為</li>
            <li>本サービスのコンテンツを無断で複製・転載・配布する行為</li>
            <li>本サービスの運営を妨害する行為</li>
            <li>他のユーザーまたは第三者の権利・利益を侵害する行為</li>
            <li>不正アクセスまたはこれを試みる行為</li>
            <li>虚偽の情報を提供する行為</li>
            <li>その他、当社が不適切と判断する行為</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3 pb-2 border-b border-gray-200">第3条（免責事項）</h2>
          <p className="mb-3">
            当社は、本サービスに掲載する情報の正確性・完全性・最新性について最善を尽くしておりますが、
            これを保証するものではありません。本サービスの利用により生じた損害について、当社は一切の責任を負いません。
          </p>
          <p>
            掲載している費用相場・業者情報等は参考情報であり、実際の費用や条件は各業者にご確認ください。
            本サービスを経由して第三者のサービスを利用した場合の損害についても、当社は責任を負いかねます。
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3 pb-2 border-b border-gray-200">第4条（アフィリエイト広告について）</h2>
          <p>
            本サービスは、各社のアフィリエイトプログラムおよび広告プログラムに参加しています。
            本サービス内のリンクを経由して商品・サービスを申し込んだ場合、当社に紹介報酬が発生することがあります。
            ただし、掲載内容の選定・評価は編集部が独立した基準で行っており、広告費用による優遇は行っておりません。
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3 pb-2 border-b border-gray-200">第5条（知的財産権）</h2>
          <p>
            本サービスに掲載されているテキスト・画像・デザインその他一切のコンテンツに関する著作権その他の知的財産権は、
            当社または正当な権利を有する第三者に帰属します。
            ユーザーは、私的使用の範囲を超えて、当社の事前の書面による許可なくこれらを使用することはできません。
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3 pb-2 border-b border-gray-200">第6条（リンクについて）</h2>
          <p>
            本サービスへのリンクは原則として自由に設置いただけますが、
            当社のブランドや信頼性を損なう方法でのリンク設置はお断りします。
            また、本サービス内から外部サイトへのリンクを掲載している場合がありますが、
            外部サイトの内容について当社は責任を負いません。
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3 pb-2 border-b border-gray-200">第7条（規約の変更）</h2>
          <p>
            当社は、必要と判断した場合には、ユーザーへの事前通知なく本規約を変更することがあります。
            変更後の利用規約は、本サービス上に掲載された時点より効力を生じるものとします。
            変更後も本サービスをご利用いただいた場合、変更後の規約に同意したものとみなします。
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3 pb-2 border-b border-gray-200">第8条（準拠法・管轄裁判所）</h2>
          <p>
            本規約の解釈にあたっては、日本法を準拠法とします。
            本サービスに関して紛争が生じた場合には、当社の本店所在地を管轄する裁判所を専属的合意管轄とします。
          </p>
        </section>

        <div className="text-sm text-gray-500 pt-4 border-t border-gray-100">
          <p>運営者: 株式会社MediaX</p>
          <p>制定日: 2025年1月1日</p>
          <p>最終改訂: 2026年4月27日</p>
        </div>
      </div>
    </div>
  );
}
