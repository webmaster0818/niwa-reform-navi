import { notFound } from "next/navigation";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import networks from "@/data/exterior-networks.json";

// 2026-11-01 新設。ガーデンプラス公式（トップの「全国のサービス店一覧」・全国のサービス店ページ・店舗ページ・運営会社情報・ご依頼の流れ）を
// 2026-11-01 に取得して確認した内容のみ。都道府県別の数はトップページの一覧の表示。金額は記載しない。
// このルートはガーデンプラスのみ。
const CHECKED = "2026年11月1日";
const SLUG = "garden-plus";
const PATH = "/company/garden-plus/shop/";

const BASE = "https://www.garden.ne.jp/index.php";
const prefUrl = (pref: string) => `${BASE}?action=public_shop_search_execute&address=${encodeURIComponent(pref)}`;

type Source = { name: string; url: string };
const SRC = {
  top: { name: "エクステリア外構工事を激安で提案 | 外構工事のガーデンプラス", url: "https://www.garden.ne.jp/" },
  serviceArea: { name: "全国の外構工事サービス店 | 外構工事のガーデンプラス", url: `${BASE}?action=public_static&path=service-area/index.html` },
  shopExample: { name: "ガーデンプラス 小牧 | 東海エリア 愛知県のサービス店 | 外構工事のガーデンプラス", url: `${BASE}?action=public_static&path=service-area/aichi/komaki.html` },
  prefExample: { name: "東京都の外構工事サービス店(関東エリア) | 外構工事のガーデンプラス", url: prefUrl("東京都") },
  corporate: { name: "運営会社情報 | 外構工事のガーデンプラス", url: `${BASE}?action=public_static_partner&path=corporate.html` },
  flow: { name: "ご依頼（外構工事・お庭完成）までの流れ | 外構工事のガーデンプラス", url: `${BASE}?action=public_static&path=construction-flow/index.html` },
} satisfies Record<string, Source>;

const gp = networks.gardenPlus;
const total = gp.prefs.reduce((s, [, n]) => s + (n as number), 0);
const sorted = [...gp.prefs].sort((a, b) => (b[1] as number) - (a[1] as number));
const top5 = sorted.slice(0, 5);
const fewest = [...sorted].reverse().slice(0, 4);

const faqs: { q: string; a: string; src: Source[] }[] = [
  {
    q: "ガーデンプラスの店舗は全国に何拠点ありますか",
    a: `公式サイトでは「全国1577拠点」と表示されています（${CHECKED}確認）。トップページの「全国のサービス店一覧」に表示されている都道府県別の数を合計すると、46都道府県で${total.toLocaleString()}です。`,
    src: [SRC.top, SRC.serviceArea],
  },
  {
    q: "沖縄県や離島でも依頼できますか",
    a: "公式の地方区分には「九州・沖縄」がありますが、都道府県別の一覧に沖縄県のサービス店は表示されていません。また、全国のサービス店ページには「離島・山岳などをはじめとするエリアでは、施工対応できない場合がございます。」と記載されています。該当する地域の場合は、依頼の前にガーデンプラスへ対応の可否をご確認ください。",
    src: [SRC.top, SRC.serviceArea],
  },
  {
    q: "店舗から離れた場所でも現場調査に来てもらえますか",
    a: "店舗ごとに案内が異なります。例として「ガーデンプラス 小牧」の店舗ページでは、店舗から離れたエリアについてもスタッフが現場調査に伺うこと、対応エリアに記載のない周辺エリアも対応しているケースがあることが記載されています。依頼したい店舗のページで営業案内をご確認ください。",
    src: [SRC.shopExample],
  },
  {
    q: "見積もりが出るまでどのくらいかかりますか",
    a: "公式の「ご依頼の流れ」では、現場調査の実施からプラン・お見積りの提示まで、およそ1週間〜10日程度かかると記載されています。プラン・お見積りの変更や追加の相談も無料で対応すると案内されています。",
    src: [SRC.flow],
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
    title: "ガーデンプラスの店舗・対応エリア｜都道府県別の拠点数と探し方 | 庭リフォームナビ",
    description: `ガーデンプラスは公式に「全国1577拠点」と表示しています（${CHECKED}確認）。都道府県別のサービス店数、沖縄県・離島の扱い、郵便番号や都道府県での店舗の探し方、店舗ページで確認できる内容をまとめました。`,
    alternates: { canonical: PATH },
  };
}

export default async function GardenPlusShopPage({ params }: { params: Promise<{ slug: string }> }) {
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
        { label: "ガーデンプラス", href: "/company/garden-plus/" },
        { label: "店舗・対応エリア" },
      ]} />

      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">ガーデンプラスの店舗・対応エリアと探し方</h1>
      <p className="text-sm text-gray-500 mb-6">{CHECKED}に公式サイトで確認</p>

      {/* 即答 */}
      <div className="bg-bg rounded-2xl p-6 mb-8 text-sm text-gray-700 leading-relaxed space-y-3">
        <h2 className="font-bold text-lg text-gray-800">要点</h2>
        <p>
          ガーデンプラスは公式サイトで<strong>「全国1577拠点」</strong>と表示しています。トップページの「全国のサービス店一覧」では、<strong>46都道府県</strong>に都道府県別の数が表示されており、合計は{total.toLocaleString()}です（{CHECKED}確認）。
        </p>
        <p>
          数が多いのは{top5.map(([p, n]) => `${p}（${n}）`).join("・")}、少ないのは{fewest.map(([p, n]) => `${p}（${n}）`).join("・")}です。沖縄県のサービス店は一覧に表示されていません。
        </p>
        <p>
          近くの店舗は、全国のサービス店ページの「郵便番号から探す」か、都道府県別の一覧から探せます。施工を行うサービス店について、公式では「ガーデンプラス規定の厳しい審査をクリアした、経験豊富で信頼のおけるサービス店が施工を行います。」と説明しています。
        </p>
        <p className="text-xs text-gray-500">
          出典：<a href={SRC.top.url} target="_blank" rel="noopener noreferrer" className="underline mr-2">{SRC.top.name}</a>
          <a href={SRC.serviceArea.url} target="_blank" rel="noopener noreferrer" className="underline mr-2">{SRC.serviceArea.name}</a>（{CHECKED}確認）
        </p>
      </div>

      {/* 地方別 */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-gray-900 mb-2">地方別のサービス店数</h2>
        <p className="text-sm text-gray-600 mb-4">全国のサービス店ページに表示されている地方区分と数です。</p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm bg-white border border-gray-200 rounded-xl">
            <thead className="bg-gray-50">
              <tr><th className="text-left p-3 border-b">地方（公式の区分）</th><th className="text-right p-3 border-b">サービス店数</th></tr>
            </thead>
            <tbody>
              {gp.regions.map(([r, n]) => (
                <tr key={r as string}><td className="p-3 border-b">{r}</td><td className="p-3 border-b text-right">{n}店</td></tr>
              ))}
              <tr className="font-bold"><td className="p-3">合計</td><td className="p-3 text-right">{total.toLocaleString()}店</td></tr>
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-xs text-gray-500">公式の表示「全国1577拠点」とは2の差があります。</p>
      </section>

      {/* 都道府県別 */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-gray-900 mb-2">都道府県別のサービス店数</h2>
        <p className="text-sm text-gray-600 mb-4">
          トップページの「全国のサービス店一覧」に表示されている数です。都道府県名のリンクから、公式の都道府県別のサービス店一覧を開けます。店舗は増減するため、最新の状況は公式ページでご確認ください。
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm bg-white border border-gray-200 rounded-xl">
            <thead className="bg-gray-50">
              <tr><th className="text-left p-3 border-b">都道府県</th><th className="text-right p-3 border-b">サービス店数</th></tr>
            </thead>
            <tbody>
              {gp.prefs.map(([p, n]) => (
                <tr key={p as string}>
                  <td className="p-3 border-b">
                    <a href={prefUrl(p as string)} target="_blank" rel="noopener noreferrer" className="text-primary underline">{p}</a>
                  </td>
                  <td className="p-3 border-b text-right">{n}</td>
                </tr>
              ))}
              <tr>
                <td className="p-3 border-b">沖縄県</td>
                <td className="p-3 border-b text-right">一覧に表示なし</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-xs text-gray-500">
          出典：<a href={SRC.top.url} target="_blank" rel="noopener noreferrer" className="underline mr-2">{SRC.top.name}</a>、都道府県別の一覧（例：<a href={SRC.prefExample.url} target="_blank" rel="noopener noreferrer" className="underline">{SRC.prefExample.name}</a>）（{CHECKED}確認）
        </p>
      </section>

      {/* 店舗ページで分かること */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-gray-900 mb-4">店舗の探し方と、店舗ページで確認できること</h2>
        <ol className="space-y-4">
          <li className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
            <h3 className="font-bold text-gray-900 mb-2">1. 郵便番号か都道府県で店舗を探す</h3>
            <p className="text-sm text-gray-700 leading-relaxed">全国のサービス店ページで郵便番号を入力すると、近くの店舗を検索できます。地方・都道府県ごとの一覧からも店舗ページを開けます。</p>
          </li>
          <li className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
            <h3 className="font-bold text-gray-900 mb-2">2. 店舗ページで営業案内・施工事例・相談会の日程を見る</h3>
            <p className="text-sm text-gray-700 leading-relaxed">店舗ページには「トップ」「スタッフ」「施工事例」「お知らせ」「ギャラリー」「クチコミ」「営業案内」の項目があります。例として「ガーデンプラス 小牧」のページでは、土曜日・日曜日の営業、広域エリアへの対応、無料相談会の開催カレンダーが掲載されています。営業日や対応エリアは店舗ごとに異なるため、依頼したい店舗のページでご確認ください。</p>
          </li>
          <li className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
            <h3 className="font-bold text-gray-900 mb-2">3. 現場調査を依頼し、プランと見積もりを受け取る</h3>
            <p className="text-sm text-gray-700 leading-relaxed">公式の「ご依頼の流れ」では、専門スタッフが現場調査を行い、実施からおよそ1週間〜10日程度でプラン・お見積りが提示されます。1契約の総額が50万円（税込）以上の場合は、契約金額の50%を着手金として支払うと記載されています。</p>
          </li>
        </ol>
        <p className="mt-2 text-xs text-gray-500">
          出典：<a href={SRC.serviceArea.url} target="_blank" rel="noopener noreferrer" className="underline mr-2">{SRC.serviceArea.name}</a>
          <a href={SRC.shopExample.url} target="_blank" rel="noopener noreferrer" className="underline mr-2">{SRC.shopExample.name}</a>
          <a href={SRC.flow.url} target="_blank" rel="noopener noreferrer" className="underline mr-2">{SRC.flow.name}</a>（{CHECKED}確認）
        </p>
      </section>

      {/* 直営店 */}
      <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-10 text-sm text-gray-700 leading-relaxed">
        <h2 className="text-lg font-bold mb-3 text-gray-800">直営店について</h2>
        <p>
          運営会社情報の沿革には、直営店として「ガーデンプラス神戸（ショールーム）」「ガーデンプラス神戸北町」「ガーデンプラス千葉」「ガーデンプラス相模原」「ガーデンプラス神戸垂水」「ガーデンプラス横浜」の開設が記載されています。運営会社情報の所在地欄には、このうち神戸と神戸北町の住所が掲載されています。
        </p>
        <p className="mt-2 text-xs text-gray-500">
          出典：<a href={SRC.corporate.url} target="_blank" rel="noopener noreferrer" className="underline">{SRC.corporate.name}</a>（{CHECKED}確認）
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
          <li><Link href="/company/garden-plus/" className="text-primary underline">ガーデンプラスの特徴・メリット・デメリット</Link></li>
          <li><Link href="/compare/ex-shop-vs-garden-plus/" className="text-primary underline">エクスショップとガーデンプラスの違い</Link></li>
          <li><Link href="/company/ex-shop/area/" className="text-primary underline">エクスショップの施工対応エリア</Link></li>
        </ul>
      </section>
    </div>
  );
}
