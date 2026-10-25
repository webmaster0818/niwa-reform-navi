import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import companies from "@/data/companies.json";

export const metadata = {
  title: "外構・庭リフォーム業者の比較ランキング｜一括見積もりサービスと外構会社10社の違い | 庭リフォームナビ",
  description:
    "外構・庭リフォームの依頼先10社を比較したランキングです。複数社の見積もりを取り寄せる一括見積もり・紹介サービスと、自社で販売・施工する外構会社の違い、外構・エクステリアパートナーズの仕組み、建設業許可の確認方法を、各社公式サイトと国土交通省の情報（2026年10月22日確認）をもとに整理しています。",
  alternates: { canonical: "/ranking/" },
};

const CHECKED = "2026年10月22日";

const faqs = [
  {
    q: "外構・エクステリアパートナーズはどのようなサービスですか。",
    a: "公式サイトによると、株式会社ソーラーパートナーズが運営する外構工事専門の見積もりサイトで、最大3社の無料見積もり比較ができます。利用者が業者を選ぶ形ではなく、専門アドバイザーがヒアリングをもとに加盟業者を選んで紹介する方式です。加盟業者数は667社（2026年4月現在）と公表されており、契約した方には事前の申し込みを条件に無料で工事の完了を保証するとしています。利用者の口コミは外構・エクステリアパートナーズの評判ページで紹介しています。",
    src: [{ name: "外構・エクステリアパートナーズ 公式サイト", url: "https://www.gaikouexterior-partners.jp/" }],
  },
  {
    q: "一括見積もりサービスと、外構会社に直接依頼する方法は何が違いますか。",
    a: "一括見積もり・紹介サービスは、登録や加盟をしている複数の施工業者から見積もりを集める仕組みで、契約と工事は紹介された業者と行います。外構・エクステリアパートナーズのように、日程調整やお断りの連絡を代行するとしているサービスもあります。一方、外構会社に直接依頼する場合は、その会社が見積もりから施工までを担います。たとえば株式会社エクスショップは、エクステリアをインターネットを介して全国で販売・施工すると公式サイトで案内しています。比較の手間を減らしたい場合は一括見積もり、依頼先が決まっている場合は直接依頼が向いています。",
    src: [
      { name: "外構・エクステリアパートナーズ 公式サイト", url: "https://www.gaikouexterior-partners.jp/" },
      { name: "株式会社エクスショップ 公式サイト", url: "https://www.ex-shop.co.jp/" },
    ],
  },
  {
    q: "依頼する業者が建設業の許可を持っているかは、どう確認できますか。",
    a: "国土交通省は、建設工事の完成を請け負う営業には建設業法第3条に基づく許可が必要で、建築一式工事以外では工事1件の請負代金が500万円未満（消費税を含む）の「軽微な建設工事」のみを請け負う場合は、必ずしも許可を受けなくてもよいと説明しています。許可の有無は、国土交通省の「建設業者・宅建業者等企業情報検索システム」で会社名などから調べられます。同システムの掲載情報は月2回の更新のため、最新の状況は業者に許可証の提示を求めて確認すると確実です。",
    src: [
      { name: "国土交通省 建設業の許可とは", url: "https://www.mlit.go.jp/totikensangyo/const/1_6_bt_000080.html" },
      { name: "国土交通省 建設業者・宅建業者等企業情報検索システム", url: "https://etsuran2.mlit.go.jp/TAKKEN/" },
    ],
  },
];

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

const medals = ["", "", ""];
const medalColors = ["bg-yellow-500", "bg-gray-400", "bg-amber-600"];

export default function RankingPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Breadcrumb items={[{ label: "外構業者ランキング" }]} />

      <div className="text-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
          外構・庭リフォーム業者の比較ランキング
        </h1>
        <p className="text-gray-600">編集部が選んだ外構・庭リフォームの依頼先10社を、総合評価に基づき順位を付けています</p>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8 text-sm text-gray-700 leading-relaxed space-y-3">
        <p>
          外構や庭のリフォームの依頼先は、大きく二つに分かれます。一つは、複数の施工業者から見積もりを集める一括見積もり・紹介サービスで、本ランキングではタウンライフエクステリア、リショップナビ、外構・エクステリアパートナーズなどが当たります。もう一つは、見積もりから施工までを自社で担う外構会社で、エクスショップなどが当たります。
        </p>
        <p>
          同じ工事でも、業者によって見積もりの金額や内訳は異なります。依頼先が決まっていない場合は、一括見積もりサービスで複数社の見積もりを比べると、金額と工事内容の違いを確認しやすくなります。依頼する業者が建設業の許可を持っているかは、国土交通省の検索システムで確認できます（下記「よくある質問」参照）。
        </p>
        <p className="text-xs text-gray-500">
          サービスの区分の出典：<a href="https://www.town-life.jp/" target="_blank" rel="noopener noreferrer" className="underline">タウンライフ</a>（タウンライフエクステリアを「外構工事の一括見積もり」と案内）、<a href="https://rehome-navi.com/" target="_blank" rel="noopener noreferrer" className="underline">リショップナビ</a>（リフォーム会社の無料一括見積もり）、<a href="https://www.gaikouexterior-partners.jp/" target="_blank" rel="noopener noreferrer" className="underline">外構・エクステリアパートナーズ</a>（最大3社の無料見積もり比較）、<a href="https://www.ex-shop.co.jp/" target="_blank" rel="noopener noreferrer" className="underline">株式会社エクスショップ</a>（インターネットを介して全国販売施工）の各公式サイト（{CHECKED}確認）
        </p>
      </div>

      {/* Sub Rankings */}
      <div className="flex gap-3 justify-center mb-8 flex-wrap">
        <Link href="/ranking/cheap/" className="bg-bg border border-primary text-primary px-4 py-2 rounded-full text-sm font-bold hover:bg-primary hover:text-white transition-colors">
           価格重視のランキング
        </Link>
        <Link href="/ranking/estimate/" className="bg-accent text-white px-4 py-2 rounded-full text-sm font-bold hover:bg-blue-700 transition-colors">
          <span className="text-xs bg-white text-accent px-1 py-0.5 rounded font-bold mr-1">PR</span>
          おすすめの見積もりサービス
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

      {/* FAQ */}
      <section className="mt-10 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">よくある質問</h2>
        <div className="space-y-5">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-bold text-gray-800 mb-1">Q. {f.q}</h3>
              <p className="text-sm text-gray-700 leading-relaxed">A. {f.a}</p>
              <p className="text-xs text-gray-500 mt-1">
                出典：
                {f.src.map((s, i) => (
                  <span key={s.url}>
                    {i > 0 && "、"}
                    <a href={s.url} target="_blank" rel="noopener noreferrer" className="underline">{s.name}</a>
                  </span>
                ))}
                （{CHECKED}確認）
              </p>
            </div>
          ))}
        </div>
        <p className="text-sm text-gray-700 mt-5">
          関連ページ：<Link href="/review/gaiko-partners/" className="text-primary underline">外構・エクステリアパートナーズの評判</Link>、<Link href="/rule/kensetsugyo-kyoka/" className="text-primary underline">建設業許可の法令ガイド</Link>、<Link href="/ranking/estimate/" className="text-primary underline">一括見積もりサービスの比較</Link>
        </p>
      </section>

      {/* Bottom CTA */}
      <div className="mt-10 bg-gradient-to-r from-primary to-emerald-600 rounded-2xl p-8 text-white text-center">
        <h2 className="text-xl font-bold mb-2">複数の業者への一括見積もり依頼</h2>
        <p className="text-emerald-100 mb-4">複数社の見積もりを並べると、同じ工事でも金額や内訳の違いを確認できます</p>
        <Link
          href="/ranking/estimate/"
          className="bg-white text-primary px-8 py-3 rounded-full font-bold hover:bg-emerald-50 transition-colors inline-block"
        >
          無料で一括見積もりを依頼する
        </Link>
      </div>
    </div>
  );
}
