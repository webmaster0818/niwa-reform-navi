import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumb from "@/components/Breadcrumb";
import { blockWall, blockWallPages, ikegakiPages } from "@/lib/subsidies";
import { OG_IMAGE } from "@/lib/og";

const SITE = "https://garden-reform-navi.com";
const HUB = "/rule/block-wall-subsidy/";

type Props = { params: Promise<{ city: string }> };

export async function generateStaticParams() {
  return blockWallPages.map((s) => ({ city: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city } = await params;
  const s = blockWallPages.find((x) => x.slug === city);
  if (!s || !s.page) return {};
  const url = `${SITE}${HUB}${s.slug}/`;
  return {
    title: s.page.metaTitle,
    description: s.page.metaDescription,
    alternates: { canonical: url },
    openGraph: { title: s.page.metaTitle, description: s.page.metaDescription, url, type: "article", images: [OG_IMAGE] },
  };
}

const IKEGAKI_LINK_HOLD = new Set(["bunkyo", "kita", "arakawa", "nakano", "shinjuku", "katsushika"]);
// 2026-11-11：江東・渋谷（11/7 新設）・豊島（11/9 新設）のブロック塀ページも7日間は本文を変えないため、
// 同日追加の生垣ページへの案内リンクは出さない（江東・渋谷は11/14以降、豊島は11/16以降に外す）
const IKEGAKI_LINK_HOLD_1111 = new Set(["koto", "shibuya", "toshima"]);
// 2026-11-12：墨田・目黒（11/7 新設）のブロック塀ページも7日間は本文を変えないため、
// 同日追加の生垣ページへの案内リンクは出さない（11/14以降に外す）
const IKEGAKI_LINK_HOLD_1112 = new Set(["sumida", "meguro"]);

export default async function BlockWallSubsidyCityPage({ params }: Props) {
  const { city } = await params;
  const s = blockWallPages.find((x) => x.slug === city);
  if (!s || !s.page) notFound();
  const p = s.page;
  const url = `${SITE}${HUB}${s.slug}/`;
  const others = blockWallPages.filter((x) => x.slug !== s.slug);
  // 2026-11-10：11/7・11/9 に新設した区のブロック塀ページは効果判定中（7日間は本文を変えない）のため、
  // 同日追加の生垣ページへの案内リンクは 11/16 以降に出す（HOLD から外す）
  const ik = IKEGAKI_LINK_HOLD.has(s.slug) || IKEGAKI_LINK_HOLD_1111.has(s.slug) || IKEGAKI_LINK_HOLD_1112.has(s.slug) ? undefined : ikegakiPages.find((x) => x.slug === s.slug);

  const toc = [
    { id: "overview", label: "制度の概要" },
    { id: "amount", label: "補助の内容と上限額" },
    { id: "target", label: "対象になる塀と工事" },
    ...(s.flow.length > 0 ? [{ id: "flow", label: "申請の流れ" }] : []),
    ...(s.notes.length > 0 ? [{ id: "notes", label: "申請前に確認しておきたい点" }] : []),
    { id: "faq", label: "よくある質問" },
    { id: "sources", label: "出典" },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "ホーム", item: `${SITE}/` },
          { "@type": "ListItem", position: 2, name: "法令・手続きガイド", item: `${SITE}/rule/` },
          { "@type": "ListItem", position: 3, name: "ブロック塀撤去の補助金一覧", item: `${SITE}${HUB}` },
          { "@type": "ListItem", position: 4, name: s.name, item: url },
        ],
      },
      {
        "@type": "Article",
        headline: p.h1,
        description: p.metaDescription,
        mainEntityOfPage: url,
        dateModified: s.checked,
        author: { "@type": "Organization", name: "庭リフォームナビ" },
        publisher: { "@type": "Organization", name: "庭リフォームナビ" },
      },
      {
        "@type": "FAQPage",
        mainEntity: p.faqs.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      },
    ],
  };

  const overview: [string, string][] = [
    ["制度名", s.programName],
    ["年度", s.fiscalYear ?? "公式ページに年度の記載なし"],
    ["受付状況", s.statusNote ? `${s.status}（${s.statusNote}）` : s.status],
    ...(s.period ? ([["受付期間", s.period]] as [string, string][]) : []),
    ...(s.applicant ? ([["対象者", s.applicant]] as [string, string][]) : []),
    ...(s.beforeContract ? ([["申請の時期", s.beforeContract]] as [string, string][]) : []),
    ["問い合わせ先", s.contact],
    ["公式ページの更新日", s.pageUpdated ?? "記載なし"],
    ["当サイトの確認日", s.checked],
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <Breadcrumb
        items={[
          { label: "法令・手続きガイド", href: "/rule/" },
          { label: "ブロック塀撤去の補助金一覧", href: HUB },
          { label: s.name },
        ]}
      />

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 leading-snug">{p.h1}</h1>
        <p className="text-gray-600 leading-relaxed">{p.lead}</p>
        <p className="text-xs text-gray-400 mt-4">最終更新日：{s.checked}（{s.name}の公式ページを同日に確認）</p>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 mb-6">
        <h2 className="text-base font-bold text-amber-900 mb-2">本ページの見方</h2>
        <ul className="space-y-1.5 text-sm text-amber-900/90 leading-relaxed">
          <li>金額・条件・受付状況は、{s.checked}に{s.name}の公式ページで確認した内容です。</li>
          <li>補助制度は年度ごとに内容が変わることがあります。申請の前に、公式ページと担当窓口で最新の内容をご確認ください。</li>
          <li>個別の塀が補助の対象になるかどうかの判定は、当サイトでは行っていません。</li>
        </ul>
      </div>

      <nav className="bg-bg rounded-2xl p-6 mb-6" aria-label="目次">
        <h2 className="text-base font-bold text-gray-800 mb-3">目次</h2>
        <ol className="space-y-2 text-sm">
          {toc.map((t, i) => (
            <li key={t.id} className="flex items-start gap-2">
              <span className="text-primary font-bold shrink-0">{i + 1}.</span>
              <a href={`#${t.id}`} className="text-gray-700 hover:text-primary hover:underline leading-relaxed">
                {t.label}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <section id="overview" className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6 scroll-mt-4">
        <h2 className="text-lg font-bold mb-4 text-gray-800">制度の概要</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <tbody>
              {overview.map(([k, v]) => (
                <tr key={k} className="border-t border-gray-100 align-top">
                  <th className="p-3 font-bold text-gray-800 whitespace-nowrap text-left bg-bg w-36">{k}</th>
                  <td className="p-3 text-gray-700 leading-relaxed">{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section id="amount" className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6 scroll-mt-4">
        <h2 className="text-lg font-bold mb-1 text-gray-800">補助の内容と上限額</h2>
        <p className="text-xs text-gray-500 mb-4 leading-relaxed">出典：{s.name}公式ページ（{s.checked} 確認）。補助率・単価・上限の記載をそのまま整理しています。</p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-bg text-left">
                <th className="p-3 font-bold text-gray-700 whitespace-nowrap">区分</th>
                <th className="p-3 font-bold text-gray-700">補助の内容</th>
              </tr>
            </thead>
            <tbody>
              {s.amounts.map((a, i) => (
                <tr key={i} className="border-t border-gray-100 align-top">
                  <td className="p-3 font-bold text-gray-800 whitespace-nowrap">{a.item}</td>
                  <td className="p-3 text-gray-700 leading-relaxed">{a.detail}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section id="target" className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6 scroll-mt-4">
        <h2 className="text-lg font-bold mb-3 text-gray-800">対象になる塀と工事</h2>
        <div className="space-y-3">
          <div className="bg-bg rounded-xl p-4">
            <h3 className="font-bold text-gray-800 mb-1 text-sm">対象になる塀</h3>
            <p className="text-sm text-gray-600 leading-relaxed">{s.target}</p>
          </div>
          <div className="bg-bg rounded-xl p-4">
            <h3 className="font-bold text-gray-800 mb-1 text-sm">対象になる工事</h3>
            <p className="text-sm text-gray-600 leading-relaxed">{s.work}</p>
          </div>
        </div>
        <p className="text-sm text-gray-600 leading-relaxed mt-4">
          塀の構造基準（高さ2.2メートル以下、控壁、基礎など）は、
          <Link href="/rule/block-wall/" className="text-primary hover:underline">
            建築基準法施行令第62条の8の解説
          </Link>
          で条文を引用して整理しています。
        </p>
      </section>

      {s.flow.length > 0 && (
        <section id="flow" className="bg-bg rounded-2xl p-6 mb-6 scroll-mt-4">
          <h2 className="text-lg font-bold mb-4 text-gray-800">申請の流れ</h2>
          <ol className="space-y-3">
            {s.flow.map((step, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-gray-700 bg-white rounded-xl p-3">
                <span className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs shrink-0 font-bold">
                  {i + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
          <p className="text-xs text-gray-500 mt-3">出典：{s.name}公式ページ（{s.checked} 確認）</p>
        </section>
      )}

      {s.notes.length > 0 && (
        <section id="notes" className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6 scroll-mt-4">
          <h2 className="text-lg font-bold mb-3 text-gray-800">申請前に確認しておきたい点</h2>
          <ul className="space-y-2">
            {s.notes.map((n, i) => (
              <li key={i} className="bg-bg rounded-xl p-3 text-sm text-gray-700 leading-relaxed">
                {n}
              </li>
            ))}
          </ul>
        </section>
      )}

      <section id="faq" className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6 scroll-mt-4">
        <h2 className="text-lg font-bold mb-4 text-gray-800">よくある質問</h2>
        <div className="space-y-4">
          {p.faqs.map((faq, i) => (
            <details key={i} className="border border-gray-200 rounded-xl">
              <summary className="px-4 py-3 cursor-pointer font-medium text-gray-800 text-sm list-none flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <span className="text-primary font-bold">Q</span>
                  {faq.question}
                </span>
                <span className="text-primary shrink-0 ml-2">▼</span>
              </summary>
              <div className="px-4 pb-3 pt-2 text-sm text-gray-600 border-t border-gray-100 leading-relaxed">
                <span className="text-secondary font-bold mr-1">A</span>
                {faq.answer}
              </div>
            </details>
          ))}
        </div>
      </section>

      <section id="sources" className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6 scroll-mt-4">
        <h2 className="text-lg font-bold mb-3 text-gray-800">出典</h2>
        <ul className="space-y-2 text-sm">
          {[{ title: s.pageTitle, url: s.url }, ...s.extraSources].map((r) => (
            <li key={r.url}>
              <a href={r.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                {r.title}
              </a>
              <span className="text-xs text-gray-400">（{s.checked} 確認）</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
        <h2 className="text-lg font-bold mb-4 text-gray-800">ほかの自治体のブロック塀撤去補助</h2>
        <ul className="flex flex-wrap gap-2 text-sm">
          {others.map((o) => (
            <li key={o.slug}>
              <Link href={`${HUB}${o.slug}/`} className="inline-block bg-bg rounded-full px-3 py-1.5 text-gray-700 hover:bg-emerald-100 transition-colors">
                {o.name}
              </Link>
            </li>
          ))}
          <li>
            <Link href={HUB} className="inline-block rounded-full px-3 py-1.5 text-primary font-bold hover:underline">
              {blockWall.items.length}自治体の一覧へ
            </Link>
          </li>
        </ul>
        <p className="text-sm text-gray-600 mt-4">
          撤去した塀の代わりに生垣をつくる場合の助成は、
          {ik && (
            <>
              <Link href={`/rule/ikegaki-subsidy/${ik.slug}/`} className="text-primary hover:underline">
                {ik.name}の{ik.programName}
              </Link>
              と
            </>
          )}
          <Link href="/rule/ikegaki-subsidy/" className="text-primary hover:underline">
            生垣・緑化の助成制度一覧
          </Link>
          にまとめています。
        </p>
      </section>

      <div className="bg-gradient-to-r from-accent to-blue-700 rounded-2xl p-8 text-white text-center">
        <h2 className="text-xl font-bold mb-2">補助を使う工事も、見積もりは複数社で比べる</h2>
        <p className="text-blue-100 mb-4 text-sm">申請に必要な見積書や図面の用意に慣れているかどうかも、業者選びの材料になります</p>
        <Link
          href="/ranking/estimate/"
          className="bg-white text-accent px-8 py-3 rounded-full font-bold hover:bg-blue-50 transition-colors inline-block"
        >
          <span className="text-xs bg-accent text-white px-1.5 py-0.5 rounded font-bold mr-2">PR</span>
          一括見積もりサービスを比較する →
        </Link>
      </div>
    </div>
  );
}
