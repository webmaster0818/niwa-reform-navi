import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import { KINDS, type SubsidyHub } from "@/lib/subsidies";

const SITE = "https://garden-reform-navi.com";

type Props = {
  hub: SubsidyHub;
  path: string; // 例: /rule/block-wall-subsidy/
  name: string; // パンくず表示名
  childPath?: string; // 自治体別ページのパス（自治体別ページを持つ一覧のみ）
  related: { href: string; label: string; note: string }[];
};

function statusClass(status: string) {
  if (status === "受付中" || status === "受付期間内") return "bg-emerald-50 text-emerald-800 border-emerald-200";
  if (status === "受付終了" || status === "予算到達で終了") return "bg-gray-100 text-gray-600 border-gray-200";
  return "bg-amber-50 text-amber-800 border-amber-200";
}

export default function SubsidyHubPage({ hub, path, name, childPath, related }: Props) {
  const url = `${SITE}${path}`;
  const toc = [
    ...KINDS.filter((k) => hub.items.some((s) => s.kind === k)).map((k, i) => ({ id: `k${i + 1}`, label: `${k}の制度一覧` })),
    ...hub.sections.map((s, i) => ({ id: `s${i + 1}`, label: s.heading })),
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
          { "@type": "ListItem", position: 3, name, item: url },
        ],
      },
      {
        "@type": "Article",
        headline: hub.h1,
        description: hub.metaDescription,
        mainEntityOfPage: url,
        dateModified: hub.updated,
        author: { "@type": "Organization", name: "庭リフォームナビ" },
        publisher: { "@type": "Organization", name: "庭リフォームナビ" },
      },
      {
        "@type": "FAQPage",
        mainEntity: hub.faqs.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      },
    ],
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <Breadcrumb items={[{ label: "法令・手続きガイド", href: "/rule/" }, { label: name }]} />

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 leading-snug">{hub.h1}</h1>
        <p className="text-gray-600 leading-relaxed">{hub.lead}</p>
        <p className="text-xs text-gray-400 mt-4">最終更新日：{hub.updated}（各自治体の公式ページを同日に確認）</p>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 mb-6">
        <h2 className="text-base font-bold text-amber-900 mb-2">本ページの見方</h2>
        <ul className="space-y-1.5 text-sm text-amber-900/90 leading-relaxed">
          <li>金額・条件・受付状況は、表の右端に記載した確認日に各自治体の公式ページで確認した内容です。年度の記載がない制度は「年度の記載なし」としています。</li>
          <li>受付状況の「受付中」は公式ページに受付中と明記されているもの、「受付期間内」は公式ページに書かれた受付期間・締切の内側で受付終了の告知がないもの、「締切の記載なし」は公式ページに受付期間や締切が書かれていないものです。</li>
          <li>補助制度は年度ごとに内容が変わり、予算に達した時点で受付を終える自治体もあります。申請の前に、必ず各自治体の公式ページと担当窓口で最新の内容をご確認ください。</li>
          <li>個別の塀や敷地が補助の対象になるかどうかの判定は、当サイトでは行っていません。</li>
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

      {KINDS.filter((k) => hub.items.some((s) => s.kind === k)).map((k, ki) => {
        const items = hub.items.filter((s) => s.kind === k);
        return (
          <section key={k} id={`k${ki + 1}`} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6 scroll-mt-4">
            <h2 className="text-lg font-bold mb-1 text-gray-800">
              {k}の制度一覧（{items.length}自治体）
            </h2>
            <p className="text-xs text-gray-500 mb-4 leading-relaxed">
              「主な補助額」は公式ページの記載を要約したものです。補助率・単価・上限の詳細と対象条件は、各自治体の公式ページでご確認ください。
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-bg text-left">
                    <th className="p-3 font-bold text-gray-700 whitespace-nowrap">自治体</th>
                    <th className="p-3 font-bold text-gray-700">制度名</th>
                    <th className="p-3 font-bold text-gray-700">主な補助額</th>
                    <th className="p-3 font-bold text-gray-700 whitespace-nowrap">受付状況</th>
                    <th className="p-3 font-bold text-gray-700 whitespace-nowrap">公式ページ</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((s) => (
                    <tr key={s.slug} className="border-t border-gray-100 align-top">
                      <td className="p-3 font-bold text-gray-800 whitespace-nowrap">
                        {childPath && s.page ? (
                          <Link href={`${childPath}${s.slug}/`} className="text-primary hover:underline">
                            {s.name}
                          </Link>
                        ) : (
                          s.name
                        )}
                        <div className="text-xs font-normal text-gray-400 mt-0.5">{s.pref}</div>
                        {s.sisterPage && (
                          <div className="text-xs font-normal mt-1 whitespace-normal min-w-[8rem]">
                            <a href={s.sisterPage.url} className="text-primary hover:underline">
                              {s.sisterPage.label}
                            </a>
                          </div>
                        )}
                      </td>
                      <td className="p-3 text-gray-700 leading-relaxed">
                        {s.programName}
                        <div className="text-xs text-gray-400 mt-0.5">{s.fiscalYear ?? "年度の記載なし"}</div>
                      </td>
                      <td className="p-3 text-gray-700 leading-relaxed">{s.summary}</td>
                      <td className="p-3 whitespace-nowrap">
                        <span className={`inline-block text-xs px-2 py-0.5 rounded border ${statusClass(s.status)}`}>{s.status}</span>
                        {s.statusNote && <div className="text-xs text-gray-500 mt-1 whitespace-normal min-w-[8rem]">{s.statusNote}</div>}
                      </td>
                      <td className="p-3 text-xs whitespace-nowrap">
                        <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                          公式ページ
                        </a>
                        <div className="text-gray-400 mt-0.5">確認日 {s.checked}</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        );
      })}

      {hub.sections.map((s, i) => (
        <section key={i} id={`s${i + 1}`} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6 scroll-mt-4">
          <h2 className="text-lg font-bold mb-3 text-gray-800">{s.heading}</h2>
          <p className="text-sm text-gray-600 leading-relaxed">{s.body}</p>
          {s.points.length > 0 && (
            <ul className="space-y-2 mt-4">
              {s.points.map((p, j) => (
                <li key={j} className="bg-bg rounded-xl p-3 text-sm text-gray-700 leading-relaxed">
                  {p}
                </li>
              ))}
            </ul>
          )}
        </section>
      ))}

      {related.length > 0 && (
        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          <h2 className="text-lg font-bold mb-4 text-gray-800">関連するページ</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {related.map((r) => (
              <Link key={r.href} href={r.href} className="bg-bg rounded-xl p-4 hover:bg-emerald-100 transition-colors">
                <div className="font-bold text-gray-800 mb-1">{r.label}</div>
                <div className="text-xs text-gray-500">{r.note}</div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section id="faq" className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6 scroll-mt-4">
        <h2 className="text-lg font-bold mb-4 text-gray-800">よくある質問</h2>
        <div className="space-y-4">
          {hub.faqs.map((faq, i) => (
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
        <h2 className="text-lg font-bold mb-3 text-gray-800">出典（各自治体の公式ページ）</h2>
        <ul className="space-y-2 text-sm">
          {hub.items.map((s) => (
            <li key={s.slug}>
              <span className="text-gray-500">{s.name}：</span>
              <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                {s.pageTitle}
              </a>
              <span className="text-xs text-gray-400">（{s.checked} 確認）</span>
            </li>
          ))}
        </ul>
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
