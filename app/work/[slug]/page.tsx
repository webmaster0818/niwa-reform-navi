import { notFound } from "next/navigation";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import works from "@/lib/works";
import InlineLinks from "@/components/InlineLinks";
import companies from "@/data/companies.json";
import rules from "@/data/rules.json";

export async function generateStaticParams() {
  return works.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const work = works.find((w) => w.slug === slug);
  if (!work) return {};
  if (work.guide) {
    return {
      title: work.guide.metaTitle,
      description: work.guide.metaDescription,
      alternates: { canonical: `/work/${work.slug}/` },
    };
  }
  return {
    title: `${work.title}の費用相場・業者選び | 庭リフォームナビ`,
    description: `${work.title}の費用相場（掲載サービスの記事に記載された金額と出典）、工期、注意点、おすすめ業者を解説しています。`,
    alternates: { canonical: `/work/${work.slug}/` },
  };
}

export default async function WorkPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const work = works.find((w) => w.slug === slug);
  if (!work) notFound();

  const recommendedComps = companies.filter((c) => work.recommendedCompanies.includes(c.slug));
  const relatedRules = rules.filter((r) => r.relatedWorks.includes(work.slug));
  const guide = work.guide;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Breadcrumb items={[
        { label: "工事の種類", href: "/work/wood-deck/" },
        { label: work.title },
      ]} />

      {/* Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{guide ? guide.h1 : `${work.title}の費用相場・業者選びガイド`}</h1>
        <p className="text-gray-600 leading-relaxed">{guide ? guide.lead : work.description}</p>
        {guide && (
          <p className="text-xs text-gray-500 mt-3">各メーカーの公式サイトの記載を{guide.checked}に確認しています。製品の仕様は変更されることがあるため、購入・発注の前に最新のカタログで確認してください。</p>
        )}
      </div>

      {/* Guide sections（メーカー公式の記載） */}
      {guide && guide.sections.map((sec, si) => (
        <section key={si} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          <h2 className="text-lg font-bold mb-4 text-gray-800">{sec.heading}</h2>
          <div className="space-y-4 text-sm text-gray-700 leading-relaxed">
            {sec.blocks.map((b, bi) => {
              if ("p" in b) return <p key={bi}><InlineLinks text={b.p} /></p>;
              if ("list" in b)
                return (
                  <ul key={bi} className="list-disc pl-5 space-y-2">
                    {b.list.map((item, li) => <li key={li}><InlineLinks text={item} /></li>)}
                  </ul>
                );
              return (
                <div key={bi} className="overflow-x-auto">
                  <table className="w-full text-sm border border-gray-200 min-w-[480px]">
                    <thead>
                      <tr className="bg-bg">
                        {b.table.columns.map((c) => (
                          <th key={c} className="text-left px-3 py-2 border-b border-gray-200 font-semibold text-gray-800 whitespace-nowrap">{c}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {b.table.rows.map((row, ri) => (
                        <tr key={ri} className="border-b border-gray-100 last:border-0 align-top">
                          {row.map((cell, ci) => (
                            <td key={ci} className={`px-3 py-2 ${ci === 0 ? "font-medium text-gray-800" : "text-gray-700"}`}>{cell}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              );
            })}
          </div>
          {sec.sources.length > 0 && (
            <p className="mt-4 text-xs text-gray-500 leading-relaxed">
              出典（{guide.checked}確認）：
              {sec.sources.map((l, li) => (
                <span key={l.url}>
                  {li > 0 && "、"}
                  {l.url.startsWith("/") ? (
                    <Link href={l.url} className="text-primary hover:underline">{l.label}</Link>
                  ) : (
                    <a href={l.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">{l.label}</a>
                  )}
                </span>
              ))}
            </p>
          )}
        </section>
      ))}

      {/* Quick Stats */}
      {work.duration && work.difficulty && (
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-secondary text-white rounded-xl p-4 text-center">
          <div className="text-xs mb-1 text-amber-100">工期</div>
          <div className="font-bold text-sm">{work.duration}</div>
        </div>
        <div className="bg-white rounded-xl p-4 text-center border border-gray-200">
          <div className="text-xs text-gray-500 mb-1">難易度</div>
          <div className="font-bold text-gray-800 text-sm">{work.difficulty}</div>
        </div>
      </div>
      )}

      {/* Tips */}
      {work.tips && work.tips.length > 0 && (
      <div className="bg-bg rounded-2xl p-6 mb-6">
        <h2 className="text-lg font-bold mb-4 text-gray-800">工事の要点・注意点</h2>
        <ul className="space-y-3">
          {work.tips.map((tip, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
              <span className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs shrink-0 font-bold">{i + 1}</span>
              {tip}
            </li>
          ))}
        </ul>
      </div>
      )}

      {/* Recommended Companies */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
        <h2 className="text-lg font-bold mb-4 text-gray-800">{work.title}におすすめの業者</h2>
        <div className="space-y-4">
          {recommendedComps.map((company, i) => (
            <div key={company.slug} className="flex items-start gap-4 p-4 bg-bg rounded-xl">
              <span className={`text-white text-sm font-bold px-2 py-1 rounded shrink-0 ${i === 0 ? "bg-yellow-500" : i === 1 ? "bg-gray-400" : "bg-amber-600"}`}>
                {i + 1}位
              </span>
              <div className="flex-1">
                <div className="font-bold text-gray-800">{company.name}</div>
                <div className="text-sm text-primary">{company.tagline}</div>
                <div className="text-xs text-gray-500 mt-1">対応: {company.coverage}</div>
              </div>
              <Link
                href={`/company/${company.slug}/`}
                className="bg-accent text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-blue-700 transition-colors shrink-0"
              >
                詳細
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Related rules */}
      {relatedRules.length > 0 && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          <h2 className="text-lg font-bold mb-2 text-gray-800">{work.title}に関係する法令・手続きガイド</h2>
          <p className="text-sm text-gray-600 mb-4">工事の前に確認すべき決まりを、条文を引用して整理しています。</p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {relatedRules.map((r) => (
              <li key={r.slug}>
                <Link href={`/rule/${r.slug}/`} className="block bg-bg rounded-xl p-4 hover:bg-emerald-100 transition-colors h-full">
                  <div className="font-bold text-gray-800 text-sm mb-1">{r.name}</div>
                  <div className="text-xs text-gray-500">{r.laws[0].name} {r.laws[0].article}</div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* FAQ */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
        <h2 className="text-lg font-bold mb-4 text-gray-800">{work.title}に関するよくある質問</h2>
        <div className="space-y-4">
          {work.faqs.map((faq, i) => (
            <details key={i} className="border border-gray-200 rounded-xl">
              <summary className="px-4 py-3 cursor-pointer font-medium text-gray-800 text-sm list-none flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <span className="text-primary font-bold">Q</span>
                  {faq.question}
                </span>
                <span className="text-primary shrink-0 ml-2">▼</span>
              </summary>
              <div className="px-4 pb-3 pt-2 text-sm text-gray-600 border-t border-gray-100">
                <span className="text-secondary font-bold mr-1">A</span>
                <InlineLinks text={faq.answer} />
                {faq.source && (
                  <p className="mt-2 text-xs text-gray-500 leading-relaxed">
                    出典：{faq.source.text}
                    {faq.source.links.map((l) => (
                      <span key={l.url}>
                        {" "}
                        <a href={l.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">{l.label}</a>
                      </span>
                    ))}
                  </p>
                )}
              </div>
            </details>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-r from-primary to-emerald-600 rounded-2xl p-8 text-white text-center">
        <h2 className="text-xl font-bold mb-2">{work.title}の無料見積もり</h2>
        <p className="text-emerald-100 mb-4 text-sm">複数の業者から見積もりを取得し、費用を比較できます</p>
        <Link
          href="/ranking/estimate/"
          className="bg-white text-primary px-8 py-3 rounded-full font-bold hover:bg-emerald-50 transition-colors inline-block"
        >
          <span className="text-xs bg-primary text-white px-1.5 py-0.5 rounded font-bold mr-2">PR</span>
          無料で見積もりを比較する →
        </Link>
      </div>
    </div>
  );
}
