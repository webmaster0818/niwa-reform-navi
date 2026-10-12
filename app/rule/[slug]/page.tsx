import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumb from "@/components/Breadcrumb";
import rules from "@/data/rules.json";
import works from "@/data/works.json";

const SITE = "https://garden-reform-navi.com";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return rules.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const rule = rules.find((r) => r.slug === slug);
  if (!rule) return {};
  const url = `${SITE}/rule/${rule.slug}/`;
  return {
    title: rule.metaTitle,
    description: rule.metaDescription,
    alternates: { canonical: url },
    openGraph: { title: rule.metaTitle, description: rule.metaDescription, url, type: "article" },
  };
}

export default async function RulePage({ params }: Props) {
  const { slug } = await params;
  const rule = rules.find((r) => r.slug === slug);
  if (!rule) notFound();

  const url = `${SITE}/rule/${rule.slug}/`;
  const UPDATED = rule.updated;
  const refs: { name: string; url: string }[] = "refs" in rule && Array.isArray(rule.refs) ? rule.refs : [];
  const sameGroup = rules.filter((r) => r.slug !== rule.slug && r.group === rule.group);
  const otherGroups = rules.filter((r) => r.group !== rule.group);
  const related = rule.relatedWorks
    .map((w) => works.find((x) => x.slug === w))
    .filter((w): w is (typeof works)[number] => Boolean(w));

  const toc = [
    { id: "laws", label: "根拠になる条文" },
    { id: "table", label: rule.tableHeading },
    ...rule.sections.map((s, i) => ({ id: `s${i + 1}`, label: s.heading })),
    { id: "checklist", label: rule.checklistHeading },
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
          { "@type": "ListItem", position: 3, name: rule.name, item: url },
        ],
      },
      {
        "@type": "Article",
        headline: rule.h1,
        description: rule.metaDescription,
        mainEntityOfPage: url,
        dateModified: UPDATED,
        author: { "@type": "Organization", name: "庭リフォームナビ" },
        publisher: { "@type": "Organization", name: "庭リフォームナビ" },
      },
      {
        "@type": "FAQPage",
        mainEntity: rule.faqs.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      },
    ],
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <Breadcrumb items={[{ label: "法令・手続きガイド", href: "/rule/" }, { label: rule.name }]} />

      {/* Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 leading-snug">{rule.h1}</h1>
        <p className="text-gray-600 leading-relaxed">{rule.lead}</p>
        <p className="text-xs text-gray-400 mt-4">最終更新日：{UPDATED}</p>
      </div>

      {/* Editorial note */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 mb-6">
        <h2 className="text-base font-bold text-amber-900 mb-2">このページの読み方</h2>
        <ul className="space-y-1.5 text-sm text-amber-900/90 leading-relaxed">
          <li>
            引用している条文は、e-Gov法令検索で公開されている現行の条文をそのまま転記したものです。読みやすさのため中略した箇所は「（中略）」と示しています。
          </li>
          <li>
            条文に書かれていることと、個別の敷地・計画についての判断は別です。当サイトは個別の案件について適法・違法の判定を行っていません。
          </li>
          <li>
            自治体や道路管理者ごとに異なる手続きの様式・手数料・処理期間は、このページには記載していません（条文自体に書かれている数値のみ扱っています）。
          </li>
        </ul>
      </div>

      {/* TOC */}
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

      {/* Laws */}
      <section id="laws" className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6 scroll-mt-4">
        <h2 className="text-lg font-bold mb-4 text-gray-800">根拠になる条文</h2>
        <div className="space-y-4">
          {rule.laws.map((l, i) => (
            <figure key={i} className="border-l-4 border-primary bg-bg rounded-r-xl p-4 m-0">
              <figcaption className="text-sm font-bold text-gray-800 mb-2">
                {l.name} {l.article}
              </figcaption>
              <blockquote className="text-sm text-gray-700 leading-relaxed m-0">{l.quote}</blockquote>
              <a
                href={l.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-3 text-xs text-primary hover:underline"
              >
                出典：e-Gov法令検索（{l.name}）
              </a>
            </figure>
          ))}
        </div>
      </section>

      {/* Table */}
      <section id="table" className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6 scroll-mt-4">
        <h2 className="text-lg font-bold mb-1 text-gray-800">{rule.tableHeading}</h2>
        <p className="text-xs text-gray-500 mb-4 leading-relaxed">{rule.tableNote}</p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-bg text-left">
                {rule.tableColumns.map((c, i) => (
                  <th key={i} className="p-3 font-bold text-gray-700 whitespace-nowrap">
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rule.tableRows.map((row, i) => (
                <tr key={i} className="border-t border-gray-100 align-top">
                  {row.map((cell, j) => (
                    <td
                      key={j}
                      className={
                        j === 0
                          ? "p-3 font-bold text-gray-800 whitespace-nowrap"
                          : "p-3 text-gray-700 leading-relaxed"
                      }
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Sections */}
      {rule.sections.map((s, i) => (
        <section
          key={i}
          id={`s${i + 1}`}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6 scroll-mt-4"
        >
          <h2 className="text-lg font-bold mb-3 text-gray-800">{s.heading}</h2>
          <p className="text-sm text-gray-600 leading-relaxed">{s.body}</p>
          {s.points.length > 0 && (
            <div className="space-y-3 mt-5">
              {s.points.map((p, j) => (
                <div key={j} className="bg-bg rounded-xl p-4">
                  <h3 className="font-bold text-gray-800 mb-1 text-sm">{p.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{p.body}</p>
                </div>
              ))}
            </div>
          )}
        </section>
      ))}

      {/* Checklist */}
      <section id="checklist" className="bg-bg rounded-2xl p-6 mb-6 scroll-mt-4">
        <h2 className="text-lg font-bold mb-4 text-gray-800">{rule.checklistHeading}</h2>
        <ul className="space-y-3">
          {rule.checklist.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-gray-700 bg-white rounded-xl p-3">
              <span className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs shrink-0 font-bold">
                {i + 1}
              </span>
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* Related works */}
      {related.length > 0 && (
        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          <h2 className="text-lg font-bold mb-4 text-gray-800">関連する工事の解説</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {related.map((w) => (
              <Link
                key={w.slug}
                href={`/work/${w.slug}/`}
                className="bg-bg rounded-xl p-4 hover:bg-emerald-100 transition-colors"
              >
                <div className="font-bold text-gray-800 mb-1">{w.title}</div>
                <div className="text-xs text-gray-500">費用の目安 {w.costRange}</div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* FAQ */}
      <section id="faq" className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6 scroll-mt-4">
        <h2 className="text-lg font-bold mb-4 text-gray-800">よくある質問</h2>
        <div className="space-y-4">
          {rule.faqs.map((faq, i) => (
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

      {/* Sources */}
      <section id="sources" className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6 scroll-mt-4">
        <h2 className="text-lg font-bold mb-3 text-gray-800">出典</h2>
        <ul className="space-y-2 text-sm">
          {Array.from(new Map(rule.laws.map((l) => [l.url, l])).values()).map((l) => (
            <li key={l.url}>
              <a href={l.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                {l.name}（e-Gov法令検索）
              </a>
            </li>
          ))}
          {refs.map((r) => (
            <li key={r.url}>
              <a href={r.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                {r.name}
              </a>
            </li>
          ))}
        </ul>
        <p className="text-xs text-gray-500 mt-4 leading-relaxed">
          条文は{UPDATED}時点でe-Gov法令検索に掲載されていた内容を確認して転記しています。法令は改正されることがあるため、実際の手続きの前には最新の条文と、所管する窓口の案内をご確認ください。
        </p>
      </section>

      {/* Other rules */}
      <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
        {sameGroup.length > 0 && (
          <>
            <h2 className="text-lg font-bold mb-4 text-gray-800">同じ分野（{rule.group}）のガイド</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {sameGroup.map((r) => (
                <Link
                  key={r.slug}
                  href={`/rule/${r.slug}/`}
                  className="bg-bg rounded-xl p-4 hover:bg-emerald-100 transition-colors"
                >
                  <div className="font-bold text-gray-800 mb-1">{r.name}</div>
                  <div className="text-xs text-gray-500 leading-relaxed line-clamp-2">{r.laws[0].name} {r.laws[0].article}</div>
                </Link>
              ))}
            </div>
          </>
        )}
        <h2 className="text-base font-bold mb-3 text-gray-800">ほかの法令・手続きを見る</h2>
        <ul className="flex flex-wrap gap-2 text-sm">
          {otherGroups.map((r) => (
            <li key={r.slug}>
              <Link href={`/rule/${r.slug}/`} className="inline-block bg-bg rounded-full px-3 py-1.5 text-gray-700 hover:bg-emerald-100 transition-colors">
                {r.name}
              </Link>
            </li>
          ))}
          <li>
            <Link href="/rule/" className="inline-block rounded-full px-3 py-1.5 text-primary font-bold hover:underline">
              ガイド一覧へ
            </Link>
          </li>
        </ul>
      </section>

      {/* CTA */}
      <div className="bg-gradient-to-r from-accent to-blue-700 rounded-2xl p-8 text-white text-center">
        <h2 className="text-xl font-bold mb-2">手続きの要否は、見積もりの段階で確認しておく</h2>
        <p className="text-blue-100 mb-4 text-sm">
          複数の業者に同じ条件で相談すると、申請の扱いや工程の違いが比べられます
        </p>
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
