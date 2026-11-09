import Link from "next/link";
import companies from "@/data/companies.json";
import areas from "@/data/areas.json";
import works, { hasStats } from "@/lib/works";
import { subsidyPageCount } from "@/data/areaRegions";
import WorkIcon from "@/components/top/WorkIcon";
import AreaFinder from "@/components/top/AreaFinder";
import ScrollReveal from "@/components/top/ScrollReveal";

export const metadata = {
  alternates: { canonical: "/" },
};

// 2026-11-04 TOP デザイン刷新（redesign-20261104）。本文・業者情報・リンク先は変えず、見せ方だけを変えている。

const faqData = [
  {
    q: "庭・外構リフォームの費用相場はどのくらいですか？",
    a: "新築の外構工事は100万〜300万円程度、外構のリフォームは50万〜100万円程度が目安です（ミツモア・比較ビズの記事。新築外構の金額はタウンライフリフォームの記事も同じ値。2026年10月25日確認）。工事の内容や広さで変わるため、金額は業者の見積もりで確認してください。",
  },
  {
    q: "外構業者はどのように選べばよいですか？",
    a: "一括見積もりサービスを利用して複数の業者から見積もりを取得し、価格・プラン・実績・口コミを比較することをおすすめします。3社以上から見積もりを取得すると、相場を把握しやすくなります。",
  },
  {
    q: "見積もりは無料ですか？",
    a: "タウンライフエクステリア・ガーデンプラスなど、当サイトで紹介している一括見積もりサービスはいずれも無料で利用できます。見積もりの依頼に費用はかかりません。",
  },
  {
    q: "工事期間はどのくらいかかりますか？",
    a: "工事の種類によって異なります。カーポートや門扉であれば1〜3日、ウッドデッキや舗装工事は3〜7日、大規模な改修では2〜4週間かかる場合があります。",
  },
];

const SCENES = [
  { href: "/scene/new-house/", label: "新築外構", desc: "建物に合わせた外構の計画" },
  { href: "/scene/reform/", label: "庭リフォーム", desc: "既存の庭を改修したい場合" },
  { href: "/scene/barrier-free/", label: "バリアフリー", desc: "安全で使いやすい庭づくり" },
  { href: "/scene/diy/", label: "DIYと業者工事", desc: "費用を抑えた庭づくり" },
  { href: "/scene/narrow/", label: "狭小・変形地", desc: "限られたスペースの活用" },
  { href: "/ranking/cheap/", label: "費用を抑える方法", desc: "見積もりの確認点と依頼先の公式情報" },
];

const Arrow = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="9 6 15 12 9 18" />
  </svg>
);

const PinIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z" />
    <circle cx="12" cy="9.5" r="2.5" />
  </svg>
);

const Pr = () => <span className="gr-pr">PR</span>;

/* ─── FV の主導線（工事・エリア） ─── */
function HeroButtons() {
  return (
    <div className="grid gap-2.5 sm:grid-cols-2">
      <a href="#work" className="gr-btn gr-btn--lg justify-between">
        <span className="flex items-center gap-3">
          <WorkIcon name="wood-deck" size={30} className="h-[30px] w-[30px]" />
          工事の種類から探す
        </span>
        <Arrow className="h-5 w-5" />
      </a>
      <a href="#area" className="gr-btn gr-btn--lg justify-between">
        <span className="flex items-center gap-3">
          <PinIcon />
          エリアから探す
        </span>
        <Arrow className="h-5 w-5" />
      </a>
    </div>
  );
}

function HeroSub({ className = "" }: { className?: string }) {
  return (
    <div className={className}>
      <div className="flex flex-col gap-2.5 sm:flex-row">
        <Link href="/ranking/estimate/" className="gr-btn gr-btn--cedar">
          <Pr />
          無料で見積もりを比較する
        </Link>
        <Link href="/ranking/" className="gr-btn gr-btn--ghost">
          外構業者の比較を見る
        </Link>
      </div>
      <ul className="mt-3 flex gap-4 text-[13px] font-bold text-[color:var(--gr-muted)]">
        <li className="gr-dot">無料</li>
        <li className="gr-dot">最大5社比較</li>
      </ul>
    </div>
  );
}

function Hero() {
  return (
    <section className="relative border-b border-[color:var(--gr-border)] bg-[color:var(--gr-paper)]">
      <div className="md:min-h-[600px] lg:min-h-[640px]">
        {/* 左：見出しと主導線 */}
        <div className="relative z-10 px-4 pb-6 pt-7 md:flex md:min-h-[600px] md:max-w-[min(100%,calc((100vw-1160px)/2+640px))] md:flex-col md:justify-center md:py-14 md:pl-[max(24px,calc((100vw-1160px)/2+24px))] md:pr-0 lg:min-h-[640px]">
          <p className="text-[13px] font-bold tracking-[0.06em] text-[color:var(--gr-cedar)] md:text-[14px]">外構・庭リフォームの比較ガイド</p>
          <h1 className="mt-3 text-[32px] font-bold leading-[1.32] tracking-[0.03em] text-[color:var(--gr-ink)] md:mt-4 md:text-[38px] lg:text-[52px]">
            外構・庭リフォームの
            <br />
            <span className="text-[color:var(--gr-slate)]">業者比較</span>
          </h1>

          {/* PC：見出しの直後に主導線 */}
          <div className="mt-8 hidden md:block md:max-w-[600px]">
            <div className="border border-[color:var(--gr-border-strong)] bg-white p-3">
              <HeroButtons />
            </div>
          </div>
          <p className="mt-6 hidden max-w-[30em] text-[15px] leading-[1.9] text-[color:var(--gr-muted)] md:block">
            外構・庭リフォームの費用相場、業者の比較、見積もりの取り方をまとめています
          </p>
          <HeroSub className="mt-5 hidden md:block" />
        </div>

        {/* 右（PC）：写真を右に置き、左から背景色のグラデーションを重ねる */}
        <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[64%] md:block lg:w-[62%]" aria-hidden>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/fv-deck-pc.jpg" alt="" width={1800} height={1350} className="absolute inset-0 h-full w-full object-cover object-[62%_50%]" fetchPriority="high" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,var(--gr-paper)_0%,var(--gr-paper)_7%,color-mix(in_srgb,var(--gr-paper)_84%,transparent)_24%,color-mix(in_srgb,var(--gr-paper)_38%,transparent)_42%,transparent_60%)]" />
          <p className="absolute bottom-3 right-3 bg-black/50 px-2 py-1 text-[11px] text-white">写真はイメージです</p>
        </div>

        {/* スマホ：写真の中に主導線 */}
        <div className="relative md:hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/fv-deck-sp.jpg" alt="植栽に囲まれたウッドデッキとガーデンファニチャー" width={1200} height={900} className="block h-[340px] w-full object-cover object-[60%_40%]" fetchPriority="high" />
          <p className="absolute right-2 top-2 bg-black/50 px-2 py-0.5 text-[10px] text-white">写真はイメージです</p>
          <div className="absolute inset-x-3 bottom-3">
            <HeroButtons />
          </div>
        </div>
        <div className="px-4 pb-7 pt-5 md:hidden">
          <p className="text-[14px] leading-[1.85] text-[color:var(--gr-muted)]">外構・庭リフォームの費用相場、業者の比較、見積もりの取り方をまとめています</p>
          <HeroSub className="mt-4" />
        </div>
      </div>
    </section>
  );
}

/* ─── 数字（サイト内のデータから数えた値） ─── */
function TrustBadges() {
  const badges: { k: string; v: string; u: string; desc: string }[] = [
    { k: "掲載業者", v: String(companies.length), u: "社", desc: "各社公式サイトの情報をもとに比較" },
    { k: "工事の種類", v: String(works.length), u: "種類", desc: "工期・注意点を工事ごとに掲載" },
    { k: "エリア別の比較", v: String(areas.length), u: "地方", desc: "地方ごとの比較ページ" },
    { k: "補助金・助成", v: String(subsidyPageCount), u: "ページ", desc: "市区のブロック塀撤去・生垣緑化" },
  ];
  return (
    <section className="border-b border-[color:var(--gr-border)] bg-white">
      <div className="gr-container">
        <dl className="grid grid-cols-2 md:grid-cols-4">
          {badges.map((b, i) => (
            <div
              key={b.k}
              className={`px-3 py-5 md:px-6 md:py-7 ${i % 2 === 0 ? "border-r border-[color:var(--gr-border)]" : "md:border-r md:border-[color:var(--gr-border)]"} ${i < 2 ? "border-b border-[color:var(--gr-border)] md:border-b-0" : ""} ${i === 3 ? "md:border-r-0" : ""}`}
            >
              <dt className="text-[12px] font-bold tracking-[0.06em] text-[color:var(--gr-muted)] md:text-[13px]">{b.k}</dt>
              <dd className="mt-1.5">
                <span className="text-[30px] font-bold leading-none text-[color:var(--gr-slate)] md:text-[38px]">{b.v}</span>
                <span className="ml-1 text-[13px] font-bold md:text-[15px]">{b.u}</span>
                <span className="mt-1.5 block text-[12px] text-[color:var(--gr-muted)] md:text-[13px]">{b.desc}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
      <p className="gr-container pb-3 text-[11px] leading-relaxed text-[color:var(--gr-muted)]">
        ※ 数字は当サイトの掲載ページを数えた値です（2026年11月9日時点）。写真はイメージです（Unsplash・撮影 Cameron Smith）。当サイトは工事業者ではなく、依頼前の比較に使う情報サイトです。
      </p>
    </section>
  );
}

/* ─── 工事の種類から探す ─── */
function WorkFinder() {
  return (
    <section id="work" className="gr-section scroll-mt-20">
      <div className="gr-container">
        <h2 className="gr-h2">
          工事の種類から探す
          <small>工事の種類ごとに、工期・注意点・費用の目安やメーカー公式の仕様を出典とともに掲載しています</small>
        </h2>
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 md:gap-4">
          {works.map((work, i) => (
            <li key={work.slug} data-reveal={String(i % 4)}>
              <Link href={`/work/${work.slug}/`} className="gr-card gr-card-link group flex h-full flex-col items-center px-3 pb-5 pt-6 text-center md:pt-8">
                <WorkIcon name={work.slug} size={96} className="h-[72px] w-[72px] text-[color:var(--gr-slate)] md:h-[96px] md:w-[96px]" />
                <span className="mt-3 text-[15px] font-bold leading-snug tracking-[0.02em] md:mt-4 md:text-[17px]">{work.title}</span>
                <span className="mt-2 text-[color:var(--gr-cedar)]"><Arrow className="h-4 w-4 transition-transform group-hover:translate-x-0.5" /></span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ─── エリアから探す ─── */
function AreaSection() {
  return (
    <section id="area" className="gr-section gr-band scroll-mt-20">
      <div className="gr-container">
        <h2 className="gr-h2">エリアから探す</h2>
        <AreaFinder />
      </div>
    </section>
  );
}

/* ─── 掲載業者（掲載順の最初の3社） ─── */
function TopCompanies() {
  const top3 = companies.slice(0, 3);
  return (
    <section className="gr-section scroll-mt-20">
      <div className="gr-container">
        <h2 className="gr-h2">
          掲載している外構業者
          <small>掲載順の最初の3社です。並びは掲載順で、評価による順位ではありません</small>
        </h2>
        <ul className="grid gap-4 md:grid-cols-3">
          {top3.map((company, i) => (
            <li key={company.slug} className="gr-card flex flex-col p-5 md:p-6" data-reveal={String(i)}>
              <p className="flex items-center gap-3">
                <span className="inline-flex h-8 min-w-[44px] items-center justify-center border border-[color:var(--gr-slate)] px-2 text-[13px] font-bold text-[color:var(--gr-slate)]">
                  {`掲載順 ${i + 1}`}
                </span>
              </p>
              <h3 className="mt-3 text-[19px] font-bold">{company.name}</h3>
              <p className="mt-1 text-[14px] font-bold text-[color:var(--gr-cedar)]">{company.tagline}</p>
              {company.pros.length > 0 ? (
                <ul className="mt-4 space-y-2 text-[14px] text-[color:var(--gr-muted)]">
                  {company.pros.slice(0, 2).map((pro, j) => (
                    <li key={j} className="gr-dot">{pro}</li>
                  ))}
                </ul>
              ) : null}
              <Link href={`/company/${company.slug}/`} className="gr-btn gr-btn--ghost mt-auto w-full !min-h-[48px] pt-3">
                詳細を見る
                <Arrow />
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-6">
          <Link href="/ranking/" className="inline-flex min-h-[44px] items-center gap-1.5 text-[15px] font-bold text-[color:var(--gr-slate)] underline decoration-[color:var(--gr-border-strong)] underline-offset-4 hover:decoration-[color:var(--gr-slate)]">
            全{companies.length}社の比較を見る
            <Arrow />
          </Link>
        </p>
      </div>
    </section>
  );
}

/* ─── 工事別の工期と難易度の目安 ─── */
function DurationTable() {
  return (
    <section className="gr-section gr-band">
      <div className="gr-container">
        <h2 className="gr-h2">
          工事別の工期と難易度の目安
          <small>費用の目安は各工事のページに出典とともに掲載しています。金額は業者の見積もりで確認してください</small>
        </h2>
        <div className="overflow-x-auto border border-[color:var(--gr-border)]" data-reveal="0">
          <table className="w-full min-w-[520px] bg-white text-left">
            <thead>
              <tr className="bg-[color:var(--gr-slate)] text-white">
                <th className="px-5 py-3.5 text-[14px] font-bold">工事の種類</th>
                <th className="px-5 py-3.5 text-[14px] font-bold">工期</th>
                <th className="px-5 py-3.5 text-[14px] font-bold">難易度</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[color:var(--gr-border)]">
              {works.filter(hasStats).map((work) => (
                <tr key={work.slug} className="hover:bg-[color:var(--gr-wash)]">
                  <td className="px-5 py-3">
                    <Link href={`/work/${work.slug}/`} className="flex items-center gap-3 font-bold text-[color:var(--gr-slate)] hover:underline">
                      <WorkIcon name={work.slug} size={28} className="h-7 w-7 shrink-0" />
                      <span>{work.title}</span>
                    </Link>
                  </td>
                  <td className="px-5 py-3 text-[14px]">{work.duration}</td>
                  <td className="px-5 py-3 text-[14px]">{work.difficulty}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-5">
          <Link href="/cost/total/" className="inline-flex min-h-[44px] items-center gap-1.5 text-[15px] font-bold text-[color:var(--gr-slate)] underline decoration-[color:var(--gr-border-strong)] underline-offset-4 hover:decoration-[color:var(--gr-slate)]">
            工事別の費用の確認点を見る
            <Arrow />
          </Link>
        </p>
      </div>
    </section>
  );
}

/* ─── シーン別に探す ─── */
function SceneLinks() {
  return (
    <section className="gr-section">
      <div className="gr-container">
        <h2 className="gr-h2">
          シーン別に探す
          <small>目的や敷地の条件に応じたリフォームの情報を掲載しています</small>
        </h2>
        <ul className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
          {SCENES.map((item, i) => (
            <li key={item.href} data-reveal={String(i % 3)}>
              <Link href={item.href} className="gr-card gr-card-link flex min-h-[84px] items-center justify-between gap-4 px-5 py-4">
                <span>
                  <span className="block text-[16px] font-bold">{item.label}</span>
                  <span className="mt-1 block text-[13px] leading-relaxed text-[color:var(--gr-muted)]">{item.desc}</span>
                </span>
                <span className="shrink-0 text-[color:var(--gr-cedar)]"><Arrow className="h-5 w-5" /></span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ─── よくある質問 ─── */
function FAQ() {
  return (
    <section className="gr-section gr-band">
      <div className="gr-container max-w-[880px]">
        <h2 className="gr-h2">
          よくある質問
          <small>外構・庭リフォームに関するよくある質問をまとめています</small>
        </h2>
        <div className="grid gap-3">
          {faqData.map((item, i) => (
            <details key={i} className="gr-acc group border border-[color:var(--gr-border-strong)] bg-white" data-reveal={String(i)}>
              <summary className="flex min-h-[60px] items-center justify-between gap-4 px-5 py-4 text-[15px] font-bold md:text-[16px]">
                <span>{item.q}</span>
                <svg className="gr-chev h-4 w-4 shrink-0 text-[color:var(--gr-cedar)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </summary>
              <div className="border-t border-[color:var(--gr-border)] bg-[color:var(--gr-paper)] px-5 py-4 text-[14px] leading-[1.9]">{item.a}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── 無料見積もりのご案内 ─── */
function CTASection() {
  return (
    <section className="gr-section">
      <div className="gr-container">
        <div className="border-2 border-[color:var(--gr-slate)] bg-white px-5 py-8 md:flex md:items-center md:justify-between md:gap-10 md:px-10 md:py-10" data-reveal="0">
          <div>
            <h2 className="text-[22px] font-bold tracking-[0.03em] md:text-[26px]">無料見積もりのご案内</h2>
            <p className="mt-2 text-[15px] leading-relaxed text-[color:var(--gr-muted)]">最大5社から一括で見積もりを取得し、費用を比較できます。</p>
            <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-[13px] font-bold text-[color:var(--gr-muted)]">
              <li className="gr-dot">無料・登録不要</li>
              <li className="gr-dot">最大5社比較</li>
              <li className="gr-dot">見積もり後の辞退も可能</li>
            </ul>
          </div>
          <Link href="/ranking/estimate/" className="gr-btn gr-btn--cedar gr-btn--lg mt-6 w-full shrink-0 md:mt-0 md:w-auto">
            <Pr />
            無料見積もりを依頼する
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="gr-page">
      <Hero />
      <TrustBadges />
      <WorkFinder />
      <AreaSection />
      <TopCompanies />
      <DurationTable />
      <SceneLinks />
      <FAQ />
      <CTASection />
      <ScrollReveal />
    </div>
  );
}
