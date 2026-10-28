import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import companies from "@/data/companies.json";

// 2026-10-28 okina 承認（推奨案A）：価格の順位をやめ、費用を抑える方法と各社の公式情報のページにした（balcony /ranking/cheap/ 10/17 と同じ扱い）。
// 金額は記載しない。各社の情報は公式サイトで 2026-10-28 に確認できた内容のみ。
const CHECKED = "2026年10月28日";

export const metadata = {
  title: "外構工事の費用を抑える方法｜見積もりの確認点と依頼先5社の公式情報 | 庭リフォームナビ",
  description: "外構工事の費用は、同じ条件で複数社の見積もりを取り、総額と内訳で比べることで抑えやすくなります。見積書の確認点、住まいるダイヤルの見積チェック、建設業の許可の調べ方と、依頼先5社の公式情報をまとめました。",
  alternates: { canonical: "/ranking/cheap/" },
};

type Source = { name: string; url: string };

/** 冒頭の即答。金額の目安は記載しない。 */
const quickAnswers: { title: string; body: string; src: Source[] }[] = [
  {
    title: "安さは総額と内訳で比べる",
    body: "外構工事の金額は、敷地の広さ・素材・既存の構造物の撤去の有無によって変わります。同じ工事内容・同じ範囲で複数社に見積もりを依頼し、工事本体だけでなく、撤去・処分・残土の搬出などを含めた総額と内訳で比べてください。",
    src: [],
  },
  {
    title: "見積書の内容が分からないときは、契約前に相談窓口で確認する",
    body: "住まいるダイヤル（公益財団法人住宅リフォーム・紛争処理支援センター）は、住宅のリフォーム工事の契約を予定している方から契約前の見積書等を受け取り、相談員が電話で内容を確認する「リフォーム見積チェックサービス」を無料で行っています。ウェブ申込みの場合、予約できる日時は登録時点から最短で14日後以降です。外構工事の見積書が対象になるかは、申込みの前に住まいるダイヤルへご確認ください。",
    src: [{ name: "住まいるダイヤル リフォームの見積書に関する相談", url: "https://www.chord.or.jp/reform/index.html" }],
  },
  {
    title: "訪問して契約を急がせる業者とは、その場で契約しない",
    body: "訪問販売で契約した場合は、法律で決められた書面を受け取った日から数えて8日以内であれば、書面または電磁的記録で申込みの撤回や契約の解除（クーリング・オフ）ができます（特定商取引法第9条）。",
    src: [{ name: "消費者庁 特定商取引法ガイド 訪問販売", url: "https://www.no-trouble.caa.go.jp/what/doortodoorsales/" }],
  },
];

/** 費用を抑えるために見積もりで確認する項目。 */
const checkItems: { title: string; description: string }[] = [
  {
    title: "同じ条件で複数社に見積もりを依頼する",
    description: "工事の範囲・素材・数量を各社に同じ内容で伝えると、見積もりを比べやすくなります。一括見積もりサービスを使うと、一度の入力で複数社に依頼できます。",
  },
  {
    title: "「一式」の項目は内訳の説明を受ける",
    description: "「一式」と記載された項目は、含まれる作業と数量が分からないため、他社の見積もりと同じ条件で比べることができません。作業の内容と数量の説明を業者に依頼してください。",
  },
  {
    title: "撤去・処分・残土の搬出が含まれているかを確認する",
    description: "既存のブロック塀・土間コンクリート・植栽などを撤去する場合は、撤去費・処分費・残土の搬出費が見積もりに含まれているか、別途になっているかで総額が変わります。",
  },
  {
    title: "追加費用が発生する条件を契約前に確認する",
    description: "掘削してから地中の障害物が見つかった場合や、施工範囲を変更した場合などに追加費用が発生することがあります。追加費用が発生する条件と、作業前に金額の説明と承認を行う手順が見積書や契約書に記載されているかをご確認ください。",
  },
  {
    title: "商品の品番と数量を確認する",
    description: "カーポート・フェンス・門扉などの既製品は、メーカー・品番・サイズ・数量が記載されていれば、他社の見積もりと同じ商品で比べられます。",
  },
  {
    title: "保証の期間と対象を書面で確認する",
    description: "金額が低い見積もりでも、保証の範囲が限られている場合は、将来の補修費用が発生することがあります。工事の保証と商品のメーカー保証の期間・対象をそれぞれご確認ください。",
  },
];

/** 依頼先の公式情報。順位付けを避けるため名称の五十音順で表示する。 */
const officialInfo: Record<string, { summary: string; src: Source[] }> = {
  "ex-shop": {
    summary: "株式会社エクスショップ（本社：兵庫県神戸市東灘区）が運営しています。カーポート・テラス屋根・ウッドデッキなどのエクステリアを、インターネットを介して全国で販売・施工すると案内しています。無料の現場調査の申込みを受け付けています。",
    src: [{ name: "株式会社エクスショップ 公式サイト", url: "https://www.ex-shop.co.jp/" }],
  },
  "kurashi-no-market": {
    summary: "暮らしのサービスをオンラインで予約できるサービスです。サービスを利用した利用者の口コミ・満足度・サービス料金で比べられると案内しています。剪定・造園のカテゴリに、防草シート施工・砂利敷き・芝張り・人工芝施工サービスなどがあります。",
    src: [{ name: "くらしのマーケット 公式サイト", url: "https://curama.jp/" }],
  },
  "townlife-exterior": {
    summary: "タウンライフ株式会社が運営する、外構工事の一括見積もりサービスです。見積もりは無料で、見積もりを依頼する会社は自分で選べると案内しています。依頼した会社を断りにくい場合は、タウンライフが代わりに断りを伝えるとしています。",
    src: [{ name: "タウンライフエクステリア 公式サイト", url: "https://www.town-life.jp/reform/exterior/" }],
  },
  "hikaku-biz": {
    summary: "株式会社ワンズマインドが運営する、発注先を探す見積もり比較サービスです。条件に合う会社から見積もりが届き、利用料は無料（受注する会社からの広告費で運営）と案内しています。業種の一覧に「外構・造園・エクステリア工事」があります。",
    src: [{ name: "比較ビズ 公式サイト", url: "https://www.biz.ne.jp/" }],
  },
  "mitsumoa": {
    summary: "質問に答える形で見積もりを依頼できるサービスです。アカウント登録と見積もり依頼に料金は発生せず、支払いはプロに仕事を依頼するときだけと案内しています。外構工事・エクステリアのカテゴリに、フェンス・塀、車庫・駐車場、ガレージ・カーポート、玄関、門扉・門柱があります。",
    src: [{ name: "ミツモア 公式サイト", url: "https://meetsmore.com/" }],
  },
};

const listed = Object.keys(officialInfo)
  .map((slug) => companies.find((c) => c.slug === slug)!)
  .sort((a, b) => a.name.localeCompare(b.name, "ja"));

const faqs = [
  {
    q: "外構工事の安い業者はどう選べばよいですか。",
    a: "金額は現場ごとに異なるため、当サイトでは金額の安さによる順位付けは行っていません。同じ条件で複数社から見積もりを取り、総額と内訳、追加費用が発生する条件、保証の内容を比べて選んでください。",
  },
  {
    q: "見積書が適正かどうかを第三者に確認してもらうことはできますか。",
    a: "住まいるダイヤル（公益財団法人住宅リフォーム・紛争処理支援センター）の「リフォーム見積チェックサービス」は、住宅のリフォーム工事の契約前の見積書等を対象に、相談員が電話で内容を確認する無料のサービスです。外構工事の見積書が対象になるかは、申込みの前にご確認ください。",
  },
  {
    q: "依頼する業者が建設業の許可を持っているかは、どう確認できますか。",
    a: "国土交通省は、建設工事の完成を請け負う営業には建設業法第3条に基づく許可が必要で、「軽微な建設工事」のみを請け負う場合は必ずしも許可を受けなくてもよいと説明しています。許可の有無は、国土交通省の「建設業者・宅建業者等企業情報検索システム」で会社名などから調べられます。",
  },
];

const faqSrc: Source[] = [
  { name: "住まいるダイヤル リフォームの見積書に関する相談", url: "https://www.chord.or.jp/reform/index.html" },
  { name: "国土交通省 建設業の許可とは", url: "https://www.mlit.go.jp/totikensangyo/const/1_6_bt_000080.html" },
  { name: "国土交通省 建設業者・宅建業者等企業情報検索システム", url: "https://etsuran2.mlit.go.jp/TAKKEN/" },
];

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

export default function CheapPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <Breadcrumb items={[
        { label: "ランキング", href: "/ranking/" },
        { label: "外構工事の費用を抑える方法" },
      ]} />

      <div className="text-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
          外構工事の費用を抑える方法と依頼先の公式情報
        </h1>
        <p className="text-gray-600">見積もりで確認する項目と、依頼先5社の公式サイトで確認できる内容をまとめています</p>
      </div>

      {/* 即答 */}
      <div className="bg-bg rounded-2xl p-6 mb-8">
        <h2 className="font-bold text-lg mb-4 text-gray-800">要点</h2>
        <div className="space-y-4">
          {quickAnswers.map((qa, i) => (
            <div key={i}>
              <h3 className="font-bold text-gray-900 mb-1">{qa.title}</h3>
              <p className="text-sm text-gray-700 leading-relaxed">{qa.body}</p>
              {qa.src.length > 0 && (
                <p className="mt-1 text-xs text-gray-500">
                  出典：{qa.src.map((s, j) => (
                    <a key={j} href={s.url} target="_blank" rel="noopener noreferrer" className="underline mr-2">{s.name}</a>
                  ))}（{CHECKED}確認）
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8 text-sm text-gray-700 leading-relaxed">
        外構工事の金額は現場ごとに異なり、同じ業者でも条件によって差が出ます。そのため、当サイトでは金額の安さによる業者の順位付けは行っていません。本ページでは、費用を抑えるために見積もりで確認する項目と、依頼先の公式サイトで確認できる内容をまとめています。工事ごとの費用の目安は、<Link href="/cost/total/" className="text-primary underline">外構・庭リフォームの費用の確認点まとめ</Link>から各工事のページをご覧ください。
      </div>

      {/* 確認項目 */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-gray-900 mb-4">費用を抑えるために見積もりで確認する項目</h2>
        <ol className="space-y-4">
          {checkItems.map((item, i) => (
            <li key={i} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
              <h3 className="font-bold text-gray-900 mb-2">{i + 1}. {item.title}</h3>
              <p className="text-sm text-gray-700 leading-relaxed">{item.description}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* 各社の公式情報 */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-gray-900 mb-2">依頼先5社の公式情報</h2>
        <p className="text-sm text-gray-600 mb-4">名称の五十音順で掲載しており、順位付けは行っていません。いずれも{CHECKED}に各社の公式サイトで確認した内容です。</p>
        <div className="space-y-4">
          {listed.map((company) => {
            const info = officialInfo[company.slug];
            return (
              <div key={company.slug} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h3 className="font-bold text-lg text-gray-900 mb-2">{company.name}</h3>
                <p className="text-sm text-gray-700 leading-relaxed mb-2">{info.summary}</p>
                <p className="text-xs text-gray-500 mb-4">
                  出典：{info.src.map((s, j) => (
                    <a key={j} href={s.url} target="_blank" rel="noopener noreferrer" className="underline mr-2">{s.name}</a>
                  ))}（{CHECKED}確認）
                </p>
                <div className="flex gap-3">
                  <Link href={`/company/${company.slug}/`} className="bg-bg text-primary border border-primary px-4 py-2 rounded-lg text-sm font-bold hover:bg-primary hover:text-white transition-colors">
                    詳細を見る
                  </Link>
                  <a href={company.officialUrl} target="_blank" rel="noopener noreferrer nofollow" className="bg-accent text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-700 transition-colors">
                    <span className="text-xs bg-white text-accent px-1 py-0.5 rounded font-bold mr-1">PR</span>
                    無料見積もり
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* FAQ */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-gray-900 mb-4">よくある質問</h2>
        <div className="space-y-3">
          {faqs.map((f, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-100 p-4">
              <h3 className="font-bold text-gray-900 text-sm mb-2">Q. {f.q}</h3>
              <p className="text-sm text-gray-700 leading-relaxed">{f.a}</p>
            </div>
          ))}
        </div>
        <p className="mt-3 text-xs text-gray-500">
          出典：{faqSrc.map((s, j) => (
            <a key={j} href={s.url} target="_blank" rel="noopener noreferrer" className="underline mr-2">{s.name}</a>
          ))}（{CHECKED}確認）
        </p>
      </section>

      <div className="text-center">
        <Link href="/ranking/" className="text-primary font-bold hover:underline">← 総合ランキングに戻る</Link>
      </div>
    </div>
  );
}
