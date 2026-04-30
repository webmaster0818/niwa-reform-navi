import Breadcrumb from "@/components/Breadcrumb";

export const metadata = {
  title: "記事の制作ポリシー | 庭リフォームナビ",
  description: "庭リフォームナビの編集方針・記事制作ポリシーです。正確で信頼できる情報提供を目指しています。",
};

export default function ContentPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Breadcrumb items={[{ label: "記事の制作ポリシー" }]} />

      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">記事の制作ポリシー</h1>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 space-y-8 text-gray-700 leading-relaxed">

        <p>
          庭リフォームナビは、庭・外構リフォームを検討するユーザーに対して、
          正確で有益な情報をお届けすることを使命としています。
          以下の編集方針に基づいてコンテンツを制作しています。
        </p>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3 pb-2 border-b border-gray-200">編集方針</h2>
          <p className="mb-3">
            当サービスの記事は、外構・造園工事に関する専門知識を持つ編集スタッフが制作・監修しています。
            ユーザーが外構リフォームを検討する際に本当に必要な情報を、
            わかりやすく・正直に・公平に伝えることを最優先としています。
          </p>
          <ul className="list-disc list-inside space-y-2 pl-2">
            <li>ユーザーの利益を最優先に情報を選定する</li>
            <li>専門家の知見・実績データに基づいてコンテンツを作成する</li>
            <li>広告主の意向に左右されない独立した編集判断を行う</li>
            <li>わかりやすく実用的な情報提供を心がける</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3 pb-2 border-b border-gray-200">情報の正確性について</h2>
          <p className="mb-3">
            掲載する費用相場・業者情報・工法情報については、以下のプロセスで正確性を確認しています。
          </p>
          <ul className="list-disc list-inside space-y-2 pl-2">
            <li>複数の業者への取材・ヒアリングに基づく情報収集</li>
            <li>公的機関・業界団体の統計データの参照</li>
            <li>掲載前の編集チームによるファクトチェック</li>
            <li>定期的な情報の見直しと更新</li>
          </ul>
          <p className="mt-3 text-sm text-gray-500">
            ※費用相場は地域・業者・仕様によって大きく変動します。掲載情報はあくまで参考値としてご活用ください。
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3 pb-2 border-b border-gray-200">広告・アフィリエイトとの関係</h2>
          <p className="mb-3">
            当サービスは一部アフィリエイトリンクおよび広告を掲載しており、
            これらを通じた申し込み・購入により当社に報酬が発生する場合があります。
          </p>
          <p className="mb-3">
            しかし、編集コンテンツと広告は明確に分離されています。
          </p>
          <ul className="list-disc list-inside space-y-2 pl-2">
            <li>ランキングや評価は、広告費用・掲載料に影響されません</li>
            <li>PR・広告表示がある箇所は明示しています</li>
            <li>編集部は広告主から独立した基準で評価を行います</li>
            <li>ユーザーにとって不利益な情報も正直に記載します</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3 pb-2 border-b border-gray-200">更新頻度・情報鮮度</h2>
          <p className="mb-3">
            外構業界の情報・価格相場は変動します。当サービスでは以下の基準で情報を更新しています。
          </p>
          <ul className="list-disc list-inside space-y-2 pl-2">
            <li>業者ランキング・評価: 半年ごとに見直し</li>
            <li>費用相場情報: 年1回以上の更新</li>
            <li>法令・制度関連情報: 改正時に随時更新</li>
            <li>読者からの指摘・誤情報の報告: 迅速に対応</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3 pb-2 border-b border-gray-200">引用元・参考資料の明示</h2>
          <p className="mb-3">
            記事内で統計データや外部情報を引用する場合は、出典を明記します。
          </p>
          <ul className="list-disc list-inside space-y-2 pl-2">
            <li>国土交通省・業界団体等の公的データを参照する場合は出典を明記</li>
            <li>他サイト・メディアのコンテンツを参照する場合はリンクを掲載</li>
            <li>独自調査・アンケート結果は調査概要とともに掲載</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3 pb-2 border-b border-gray-200">お問い合わせ・誤情報の報告</h2>
          <p>
            記事内容に誤りや古い情報を発見された場合、または情報の訂正・削除のご要望がある場合は、
            お問い合わせフォームよりご連絡ください。いただいたご意見は編集部で確認のうえ、
            必要に応じて速やかに対応いたします。
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
