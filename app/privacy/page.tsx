import Breadcrumb from "@/components/Breadcrumb";

export const metadata = {
  title: "プライバシーポリシー | 庭リフォームナビ",
  description: "庭リフォームナビのプライバシーポリシーです。個人情報の取り扱いについて説明しています。",
};

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Breadcrumb items={[{ label: "プライバシーポリシー" }]} />

      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">プライバシーポリシー</h1>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 space-y-8 text-gray-700 leading-relaxed">

        <p>
          株式会社MediaX（以下「当社」）は、庭リフォームナビ（以下「本サービス」）における
          ユーザーの個人情報の取り扱いについて、以下のとおりプライバシーポリシーを定めます。
        </p>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3 pb-2 border-b border-gray-200">Cookieの使用について</h2>
          <p className="mb-3">
            本サービスでは、ユーザーの利便性向上およびアクセス解析のためにCookieを使用しています。
            Cookieとは、ウェブサイトがブラウザに保存する小さなデータファイルです。
          </p>
          <p>
            ブラウザの設定によりCookieを無効にすることができますが、
            一部のサービスが正常に機能しなくなる場合があります。
            本サービスへのアクセスを継続することで、Cookieの使用に同意したものとみなします。
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3 pb-2 border-b border-gray-200">Google Analyticsの使用について</h2>
          <p className="mb-3">
            本サービスでは、Googleが提供するアクセス解析ツール「Google Analytics」を使用しています。
            Google Analyticsは、Cookieを利用してユーザーのアクセス情報を収集しますが、
            個人を特定できる情報は収集しません。
          </p>
          <p>
            収集されたデータはGoogleのプライバシーポリシーに基づいて管理されます。
            Google Analyticsのオプトアウトをご希望の場合は、
            <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline ml-1">
              Google Analyticsオプトアウトアドオン
            </a>
            をご利用ください。
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3 pb-2 border-b border-gray-200">アフィリエイトプログラムについて</h2>
          <p>
            本サービスは、各社のアフィリエイトプログラムに参加しており、
            紹介リンクを通じた申し込みにより当社に報酬が発生することがあります。
            アフィリエイトプログラムの運営会社がCookieを通じてユーザーの行動情報を取得する場合があります。
            詳細は各プログラム運営会社のプライバシーポリシーをご確認ください。
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3 pb-2 border-b border-gray-200">個人情報の管理</h2>
          <p className="mb-3">
            当社は、お問い合わせフォーム等から取得した個人情報（氏名・メールアドレス等）を、
            お問い合わせへの対応・サービスの改善のみに使用します。
          </p>
          <ul className="list-disc list-inside space-y-2 pl-2">
            <li>取得した個人情報は第三者へ提供・開示しません（法令に基づく場合を除く）</li>
            <li>個人情報は適切なセキュリティ対策を講じて管理します</li>
            <li>個人情報の開示・訂正・削除のご要望はお問い合わせフォームよりご連絡ください</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3 pb-2 border-b border-gray-200">プライバシーポリシーの変更</h2>
          <p>
            当社は、法令の改正やサービス内容の変更に応じて、本プライバシーポリシーを変更することがあります。
            変更後のポリシーは本ページに掲載された時点より効力を生じます。
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
