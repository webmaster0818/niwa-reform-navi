import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import companies from "@/data/companies.json";
import networks from "@/data/exterior-networks.json";

// 2026-11-01 新設。両社の公式サイト（施工店一覧・サービス店一覧・会社概要・ご購入/ご依頼の流れ・保証）を 2026-11-01 に取得して確認した内容のみ。
// data/companies.json からは社名・slug・公式URLのみを使用（features/pros/cons は出典がないため本ページでは使わない）。金額の比較はしない。
const CHECKED = "2026年11月1日";
const PATH = "/compare/ex-shop-vs-garden-plus/";

type Source = { name: string; url: string };
const EX = "https://www.ex-shop.net/index.php";
const GP = "https://www.garden.ne.jp/index.php";
const SRC = {
  exPartner: { name: "地域密着あんしんのエクスショップ施工店 | エクステリアのエクスショップ", url: `${EX}?action=public_static_partner` },
  exFlow: { name: "ご購入までの流れ│エクステリア激安販売施工のエクスショップ", url: `${EX}?action=public_static&path=flow.html` },
  exGuarantee: { name: "保証について│エクステリア激安販売施工のエクスショップ", url: `${EX}?action=public_static&path=guarantee.html` },
  exCorporate: { name: "エクスショップ　会社概要", url: `${EX}?action=public_static_partner&path=corporate.html` },
  gpTop: { name: "エクステリア外構工事を激安で提案 | 外構工事のガーデンプラス", url: "https://www.garden.ne.jp/" },
  gpServiceArea: { name: "全国の外構工事サービス店 | 外構工事のガーデンプラス", url: `${GP}?action=public_static&path=service-area/index.html` },
  gpFlow: { name: "ご依頼（外構工事・お庭完成）までの流れ | 外構工事のガーデンプラス", url: `${GP}?action=public_static&path=construction-flow/index.html` },
  gpGuarantee: { name: "保証について | 外構工事のガーデンプラス", url: `${GP}?action=public_static&path=guidance/guarantee.html` },
  gpCorporate: { name: "運営会社情報 | 外構工事のガーデンプラス", url: `${GP}?action=public_static_partner&path=corporate.html` },
} satisfies Record<string, Source>;

const exShop = companies.find((c) => c.slug === "ex-shop")!;
const gardenPlus = companies.find((c) => c.slug === "garden-plus")!;
const exTotal = networks.exShop.prefs.reduce((s, [, n]) => s + (n as number), 0);
const gpTotal = networks.gardenPlus.prefs.reduce((s, [, n]) => s + (n as number), 0);

const rows: { label: string; ex: string; gp: string }[] = [
  { label: "運営会社", ex: "株式会社エクスショップ", gp: "株式会社ガーデンプラス" },
  { label: "株主", ex: "デジアラホールディングス 100％", gp: "デジアラホールディングス 100％" },
  { label: "本社所在地", ex: "兵庫県神戸市東灘区向洋町中6丁目9番", gp: "兵庫県神戸市東灘区向洋町中6丁目9番" },
  {
    label: "事業内容（会社概要の記載）",
    ex: "インターネットを利用した大型住宅設備機器等の販売、インターネットを介したエクステリア外構工事等の全国展開",
    gp: "外構工事・外壁工事・その他住環境にかかわるデザイン、施工管理、メンテナンス、庭に関する商品の企画・立案・販売ほか",
  },
  {
    label: "依頼の始め方",
    ex: "商品を選び、自動お見積機能で概算を確認してから現場調査を依頼。工事込みのほか商品のみの注文も可",
    gp: "フォーム・フリーダイヤル・無料相談会で相談し、専門スタッフの現場調査を経てプランと見積もりを受け取る",
  },
  {
    label: "見積もりが出るまでの目安",
    ex: "現場調査の依頼から通常2営業日程度で訪問日決定、調査から通常3営業日程度で正式見積り",
    gp: "現場調査からプラン・見積りの提示までおよそ1週間〜10日程度",
  },
  { label: "着手金", ex: "工事代金の総額が100万円（税込）を超える契約で契約金額の50%", gp: "1契約の総額が50万円（税込）以上で契約金額の50%" },
  { label: "支払い時期", ex: "施工完了後、メールでの請求から7日以内", gp: "工事完了の確認後、請求の日から7日以内" },
  {
    label: "商品の保証",
    ex: "工事完了日から2年（電気的に駆動する部分は1年。物置・ゴミステーションのカテゴリの商品などは対象外）",
    gp: "エクステリア商品はメーカー基準で2年。外構工事は工種ごとに保証期間を設定（基礎躯体等10年、左官・組積2年、塗装1年など）",
  },
  { label: "工事の補償", ex: "工事の引渡し日から10年、上限1億円（対人・対物の合算）", gp: "工事引渡し日から10年、対人・対物とも上限1億円" },
  {
    label: "店舗・施工店の数",
    ex: `表示は「全国工事対応1610店以上」。施工店一覧の掲載は46都道府県・${exTotal.toLocaleString()}店舗`,
    gp: `表示は「全国1577拠点」。サービス店一覧の都道府県別の表示は46都道府県・合計${gpTotal.toLocaleString()}`,
  },
  {
    label: "対応外・注意の記載",
    ex: "沖縄県、一部の離島は対応エリア外",
    gp: "沖縄県のサービス店は一覧に表示なし。離島・山岳などでは施工対応できない場合がある",
  },
];

const faqs: { q: string; a: string; src: Source[] }[] = [
  {
    q: "エクスショップとガーデンプラスは同じ会社ですか",
    a: "運営会社は別で、エクスショップは株式会社エクスショップ、ガーデンプラスは株式会社ガーデンプラスです。両社の会社概要には、どちらも株主がデジアラホールディングス（100％）で、本社所在地が同じ（兵庫県神戸市東灘区向洋町中6丁目9番）と記載されています。ガーデンプラスのトップページでは、エクスショップをグループ会社として案内しています。",
    src: [SRC.exCorporate, SRC.gpCorporate, SRC.gpTop],
  },
  {
    q: "カーポートやフェンスなど1点だけ付けたい場合はどちらですか",
    a: "ガーデンプラスのトップページでは、エクステリア単体工事はグループ会社のエクスショップが承ると案内しています。エクスショップのサイトでは、外構一式を考えている場合の依頼先としてガーデンプラスを案内しています。商品を指定して取り付けを頼むならエクスショップ、庭や外構全体のプランから相談するならガーデンプラスが、両社の案内に沿った使い分けです。",
    src: [SRC.gpTop, SRC.exPartner],
  },
  {
    q: "保証はどちらが手厚いですか",
    a: "工事の補償は、どちらも工事の引渡し日から10年・上限1億円です。商品の保証は、エクスショップが工事完了日から2年（電気的に駆動する部分は1年）、ガーデンプラスはエクステリア商品がメーカー基準で2年、外構工事は工種ごとに期間が決まっています（基礎躯体等10年、左官・組積2年、塗装1年など）。対象外となる条件はそれぞれの保証ページでご確認ください。",
    src: [SRC.exGuarantee, SRC.gpGuarantee],
  },
];

export const metadata = {
  title: "エクスショップとガーデンプラスの違い｜商品の通販・施工と外構一式を公式情報で比較 | 庭リフォームナビ",
  description: `エクスショップとガーデンプラスは運営会社が別で、株主（デジアラホールディングス）と本社所在地は同じです。依頼の始め方、見積もりまでの目安、着手金、保証、店舗・施工店の数（${CHECKED}確認）を公式情報で比較しました。`,
  alternates: { canonical: PATH },
};

export default function CompareExShopGardenPlusPage() {
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <Breadcrumb items={[
        { label: "ランキング", href: "/ranking/" },
        { label: "エクスショップとガーデンプラスの違い" },
      ]} />

      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">エクスショップとガーデンプラスの違い</h1>
      <p className="text-sm text-gray-500 mb-6">{CHECKED}に両社の公式サイトで確認</p>

      {/* 即答 */}
      <div className="bg-bg rounded-2xl p-6 mb-8 text-sm text-gray-700 leading-relaxed space-y-3">
        <h2 className="font-bold text-lg text-gray-800">要点</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>運営会社は別で、グループは同じです。</strong>株主はどちらもデジアラホールディングス（100％）で、本社所在地も同じです。</li>
          <li><strong>エクスショップはエクステリア商品の通販と取り付け工事</strong>、<strong>ガーデンプラスは外構工事のデザイン・施工管理</strong>を事業内容としています。ガーデンプラスはエクステリア単体工事をエクスショップに、エクスショップは外構一式をガーデンプラスに案内しています。</li>
          <li><strong>見積もりまでの目安</strong>は、エクスショップが現場調査から通常3営業日程度、ガーデンプラスがプラン付きでおよそ1週間〜10日程度です。</li>
          <li><strong>工事の補償</strong>はどちらも10年・上限1億円です。着手金が必要になる金額は、エクスショップが100万円（税込）超、ガーデンプラスが50万円（税込）以上です。</li>
        </ul>
        <p className="text-xs text-gray-500">出典は下の比較表の各項目に対応する公式ページです（{CHECKED}確認）。</p>
      </div>

      {/* 比較表 */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-gray-900 mb-4">公式情報の比較表</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm bg-white border border-gray-200 rounded-xl">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-3 border-b w-1/5">項目</th>
                <th className="text-left p-3 border-b">{exShop.name}</th>
                <th className="text-left p-3 border-b">{gardenPlus.name}</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.label} className="align-top">
                  <th className="text-left p-3 border-b font-bold text-gray-800">{r.label}</th>
                  <td className="p-3 border-b text-gray-700">{r.ex}</td>
                  <td className="p-3 border-b text-gray-700">{r.gp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-3 text-xs text-gray-500 space-y-1">
          <p>
            エクスショップの出典：
            {[SRC.exCorporate, SRC.exFlow, SRC.exGuarantee, SRC.exPartner].map((s, j) => (
              <a key={j} href={s.url} target="_blank" rel="noopener noreferrer" className="underline mr-2">{s.name}</a>
            ))}（{CHECKED}確認）
          </p>
          <p>
            ガーデンプラスの出典：
            {[SRC.gpCorporate, SRC.gpFlow, SRC.gpGuarantee, SRC.gpTop, SRC.gpServiceArea].map((s, j) => (
              <a key={j} href={s.url} target="_blank" rel="noopener noreferrer" className="underline mr-2">{s.name}</a>
            ))}（{CHECKED}確認）
          </p>
        </div>
      </section>

      {/* 使い分け */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-gray-900 mb-4">どちらに相談するかの目安</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
            <h3 className="font-bold text-gray-900 mb-2">エクスショップが向いている場合</h3>
            <ul className="list-disc pl-5 text-sm text-gray-700 leading-relaxed space-y-1">
              <li>カーポート・フェンス・物置など、付けたい商品が決まっている</li>
              <li>概算を自動見積もりで先に確認したい</li>
              <li>工事なしで商品だけを購入したい</li>
            </ul>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
            <h3 className="font-bold text-gray-900 mb-2">ガーデンプラスが向いている場合</h3>
            <ul className="list-disc pl-5 text-sm text-gray-700 leading-relaxed space-y-1">
              <li>新築外構や庭全体を、プランから考えたい</li>
              <li>店舗や無料相談会で直接相談したい</li>
              <li>現場調査をもとにしたプランと見積もりを受け取りたい</li>
            </ul>
          </div>
        </div>
        <p className="mt-3 text-sm text-gray-600 leading-relaxed">
          上の目安は、両社が公式サイトでお互いを案内している内容（エクステリア単体工事はエクスショップ、外構一式はガーデンプラス）と、各社の依頼の流れにもとづいています。どちらに頼む場合も、同じ条件で他社の見積もりも取り、総額と内訳で比べることをおすすめします。
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
          <li><Link href="/company/ex-shop/" className="text-primary underline">エクスショップの口コミ・評判・特徴</Link></li>
          <li><Link href="/company/ex-shop/area/" className="text-primary underline">エクスショップの施工対応エリア（都道府県別の施工店数）</Link></li>
          <li><Link href="/company/garden-plus/" className="text-primary underline">ガーデンプラスの口コミ・評判・特徴</Link></li>
          <li><Link href="/company/garden-plus/shop/" className="text-primary underline">ガーデンプラスの店舗・対応エリア</Link></li>
          <li><Link href="/ranking/cheap/" className="text-primary underline">外構工事の費用を抑える方法と見積もりの確認点</Link></li>
        </ul>
      </section>
    </div>
  );
}
