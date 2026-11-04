import { notFound } from "next/navigation";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import networks from "@/data/exterior-networks.json";

// 2026-11-01 新設。エクスショップ公式「施工対応エリア」（施工店一覧）と都道府県別ページ46件の掲載店舗数を
// 2026-11-01 に取得し、一覧ページの数と各都道府県ページの数が一致することを確認した。金額は記載しない。
// このルートはエクスショップのみ（他社の施工店一覧は未確認）。
const CHECKED = "2026年11月1日";
const SLUG = "ex-shop";
const PATH = "/company/ex-shop/area/";

const PARTNER_URL = "https://www.ex-shop.net/index.php?action=public_static_partner";
const prefUrl = (pref: string) => `${PARTNER_URL}&pref=${encodeURIComponent(pref)}`;

type Source = { name: string; url: string };
const SRC = {
  partner: { name: "地域密着あんしんのエクスショップ施工店 | エクステリアのエクスショップ", url: PARTNER_URL },
  flow: { name: "ご購入までの流れ│エクステリア激安販売施工のエクスショップ", url: "https://www.ex-shop.net/index.php?action=public_static&path=flow.html" },
  guarantee: { name: "保証について│エクステリア激安販売施工のエクスショップ", url: "https://www.ex-shop.net/index.php?action=public_static&path=guarantee.html" },
  corporate: { name: "エクスショップ　会社概要", url: "https://www.ex-shop.net/index.php?action=public_static_partner&path=corporate.html" },
} satisfies Record<string, Source>;

const ex = networks.exShop;
const total = ex.prefs.reduce((s, [, n]) => s + (n as number), 0);
const sorted = [...ex.prefs].sort((a, b) => (b[1] as number) - (a[1] as number));
const top5 = sorted.slice(0, 5);
const fewest = [...sorted].reverse().slice(0, 4);

const faqs: { q: string; a: string; src: Source[] }[] = [
  {
    q: "エクスショップは沖縄県でも工事を頼めますか",
    a: "公式の施工店一覧には「※沖縄県、一部の離島は対応エリア外となっております。」と記載されており、沖縄県の施工店は掲載されていません。離島にお住まいの場合は、依頼の前にエクスショップへ対応の可否をご確認ください。",
    src: [SRC.partner],
  },
  {
    q: "エクスショップの施工店は全国に何店ありますか",
    a: `${CHECKED}時点で、公式の施工店一覧に掲載されている店舗数は46都道府県の合計${total.toLocaleString()}店舗です。サイト上部などでは「全国工事対応1610店以上」、ご購入までの流れのページでは「1,613店」と表示されており、一覧の掲載数とは一致しません。お住まいの地域で対応できるかは、公式の郵便番号検索または問い合わせでご確認ください。`,
    src: [SRC.partner, SRC.flow],
  },
  {
    q: "近くの施工店はどうやって探せばよいですか",
    a: "公式の施工店一覧ページで「郵便番号から探す」または「都道府県から探す」を使うと、お住まいの地域の施工店を確認できます。このページの都道府県別の表からも、公式の都道府県ページを開けます。",
    src: [SRC.partner],
  },
  {
    q: "施工店に工事を頼むと、保証は施工店ごとに違いますか",
    a: "公式の保証ページでは、エクスショップで販売・設置工事をした商品について、商品の2年保証（電気的に駆動する部分は1年、物置・ゴミステーションのカテゴリの商品などは対象外）と、工事の引渡し日から10年間・上限1億円の工事補償を定めています。保証の主体はエクスショップとして記載されています。",
    src: [SRC.guarantee],
  },
];

export const dynamicParams = false;

export async function generateStaticParams() {
  return [{ slug: SLUG }];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (slug !== SLUG) return {};
  return {
    title: "エクスショップの施工対応エリア｜都道府県別の施工店数と沖縄県の扱い | 庭リフォームナビ",
    description: `エクスショップ公式の施工店一覧（${CHECKED}確認）では、46都道府県に計${total.toLocaleString()}店舗が掲載されています。沖縄県と一部の離島は対応エリア外です。都道府県別の施工店数と、近くの施工店の探し方をまとめました。`,
    alternates: { canonical: PATH },
  };
}

export default async function ExShopAreaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (slug !== SLUG) notFound();

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <Breadcrumb items={[
        { label: "外構業者の比較", href: "/ranking/" },
        { label: "エクスショップ", href: "/company/ex-shop/" },
        { label: "施工対応エリア" },
      ]} />

      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">エクスショップの施工対応エリアと都道府県別の施工店数</h1>
      <p className="text-sm text-gray-500 mb-6">{CHECKED}に公式サイトで確認</p>

      {/* 即答 */}
      <div className="bg-bg rounded-2xl p-6 mb-8 text-sm text-gray-700 leading-relaxed space-y-3">
        <h2 className="font-bold text-lg text-gray-800">要点</h2>
        <p>
          エクスショップ公式の施工店一覧には、<strong>46都道府県に計{total.toLocaleString()}店舗</strong>が掲載されています（{CHECKED}確認）。
          <strong>沖縄県と一部の離島は対応エリア外</strong>と明記されています。
        </p>
        <p>
          掲載数が多いのは{top5.map(([p, n]) => `${p}（${n}店舗）`).join("・")}、少ないのは{fewest.map(([p, n]) => `${p}（${n}店舗）`).join("・")}です。
        </p>
        <p>
          サイト上部などの表示は「全国工事対応1610店以上」で、一覧の掲載数とは一致しません。お住まいの地域で工事ができるかは、公式の郵便番号検索か問い合わせで確認するのが確実です。
        </p>
        <p className="text-xs text-gray-500">
          出典：<a href={SRC.partner.url} target="_blank" rel="noopener noreferrer" className="underline mr-2">{SRC.partner.name}</a>（{CHECKED}確認）
        </p>
      </div>

      {/* 地方別 */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-gray-900 mb-2">地方別の施工店数</h2>
        <p className="text-sm text-gray-600 mb-4">公式の施工店一覧ページの地方区分と表示数です。</p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm bg-white border border-gray-200 rounded-xl">
            <thead className="bg-gray-50">
              <tr><th className="text-left p-3 border-b">地方（公式の区分）</th><th className="text-right p-3 border-b">施工店数</th></tr>
            </thead>
            <tbody>
              {ex.regions.map(([r, n]) => (
                <tr key={r as string}><td className="p-3 border-b">{r}</td><td className="p-3 border-b text-right">{n}店舗</td></tr>
              ))}
              <tr className="font-bold"><td className="p-3">合計</td><td className="p-3 text-right">{total.toLocaleString()}店舗</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 都道府県別 */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-gray-900 mb-2">都道府県別の施工店数</h2>
        <p className="text-sm text-gray-600 mb-4">
          都道府県名のリンクから、公式の都道府県別ページ（施工店名の一覧）を開けます。各都道府県ページの表示数が、一覧ページの数と一致することを{CHECKED}に確認しました。施工店は増減するため、最新の状況は公式ページでご確認ください。
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm bg-white border border-gray-200 rounded-xl">
            <thead className="bg-gray-50">
              <tr><th className="text-left p-3 border-b">都道府県</th><th className="text-right p-3 border-b">施工店数</th></tr>
            </thead>
            <tbody>
              {ex.prefs.map(([p, n]) => (
                <tr key={p as string}>
                  <td className="p-3 border-b">
                    <a href={prefUrl(p as string)} target="_blank" rel="noopener noreferrer" className="text-primary underline">{p}</a>
                  </td>
                  <td className="p-3 border-b text-right">{n}店舗</td>
                </tr>
              ))}
              <tr>
                <td className="p-3 border-b">沖縄県</td>
                <td className="p-3 border-b text-right">対応エリア外（公式記載）</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-xs text-gray-500">
          出典：<a href={SRC.partner.url} target="_blank" rel="noopener noreferrer" className="underline mr-2">{SRC.partner.name}</a>、各都道府県ページ（例：<a href={prefUrl("高知県")} target="_blank" rel="noopener noreferrer" className="underline">高知県のエクスショップ施工店 | エクステリアのエクスショップ</a>）（{CHECKED}確認）
        </p>
      </section>

      {/* 探し方と流れ */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-gray-900 mb-4">近くの施工店の探し方と、依頼後の流れ</h2>
        <ol className="space-y-4">
          <li className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
            <h3 className="font-bold text-gray-900 mb-2">1. 公式の施工店一覧で地域を確認する</h3>
            <p className="text-sm text-gray-700 leading-relaxed">施工店一覧ページには「郵便番号から探す」と「都道府県から探す」があります。都道府県ページには、その都道府県の施工店名が並びます。</p>
          </li>
          <li className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
            <h3 className="font-bold text-gray-900 mb-2">2. 商品を選び、現場調査を依頼する</h3>
            <p className="text-sm text-gray-700 leading-relaxed">公式の「ご購入までの流れ」では、自動お見積機能で概算を確認したうえで現場調査を依頼する手順になっています。現場調査の依頼から通常2営業日程度で訪問日が決まり、現場調査の実施から通常3営業日程度で正式なお見積りが提示されます。お見積りや相談は無料で、見送る場合も費用はかからないと記載されています。</p>
          </li>
          <li className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
            <h3 className="font-bold text-gray-900 mb-2">3. 発注後に施工日を調整する</h3>
            <p className="text-sm text-gray-700 leading-relaxed">正式な発注から通常2営業日程度で施工日を調整します。支払いは施工完了後のメールでの請求から7日以内で、工事代金の総額が100万円（税込）を超える契約では、契約金額の50%を着手金として申込み時に支払うと記載されています。</p>
          </li>
        </ol>
        <p className="mt-2 text-xs text-gray-500">
          出典：<a href={SRC.partner.url} target="_blank" rel="noopener noreferrer" className="underline mr-2">{SRC.partner.name}</a>
          <a href={SRC.flow.url} target="_blank" rel="noopener noreferrer" className="underline mr-2">{SRC.flow.name}</a>（{CHECKED}確認）
        </p>
      </section>

      {/* FAQ */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-gray-900 mb-4">よくある質問</h2>
        <div className="space-y-3">
          {faqs.map((f, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-100 p-4">
              <h3 className="font-bold text-gray-900 text-sm mb-2">Q. {f.q}</h3>
              <p className="text-sm text-gray-700 leading-relaxed">{f.a}</p>
              <p className="mt-1 text-xs text-gray-500">
                出典：{f.src.map((s, j) => (
                  <a key={j} href={s.url} target="_blank" rel="noopener noreferrer" className="underline mr-2">{s.name}</a>
                ))}（{CHECKED}確認）
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
        <h2 className="text-lg font-bold mb-3 text-gray-800">関連ページ</h2>
        <ul className="space-y-2 text-sm">
          <li><Link href="/company/ex-shop/" className="text-primary underline">エクスショップの特徴・メリット・デメリット</Link></li>
          <li><Link href="/compare/ex-shop-vs-garden-plus/" className="text-primary underline">エクスショップとガーデンプラスの違い</Link></li>
          <li><Link href="/company/garden-plus/shop/" className="text-primary underline">ガーデンプラスの店舗・対応エリア</Link></li>
        </ul>
        <p className="mt-4 text-xs text-gray-500">
          運営会社：株式会社エクスショップ（兵庫県神戸市東灘区）。出典：<a href={SRC.corporate.url} target="_blank" rel="noopener noreferrer" className="underline">{SRC.corporate.name}</a>（{CHECKED}確認）
        </p>
      </section>
    </div>
  );
}
