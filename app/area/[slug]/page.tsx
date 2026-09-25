import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumb from "@/components/Breadcrumb";
import areas from "@/data/areas.json";
import companies from "@/data/companies.json";
import reviews from "@/data/reviews.json";

const SITE = "https://garden-reform-navi.com";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return areas.map((a) => ({ slug: a.slug }));
}

/**
 * 各社が公表している対応エリアの表記。
 * 出典は data/reviews.json の basicInfo（label = "対応エリア"、各社公式サイトの記載を転記したもの）。
 * レビュー記事がない場合は data/companies.json の coverage を使う。
 * このサイトで地域別の優劣を推定することはしない。
 */
function coverageOf(slug: string, fallback: string) {
  const r = reviews.find((x) => x.slug === slug);
  const row = r?.basicInfo?.find((b) => b.label === "対応エリア");
  return { text: row?.value ?? fallback, sourced: Boolean(row) };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const area = areas.find((a) => a.slug === slug);
  if (!area) return {};
  const url = `${SITE}/area/${area.slug}/`;
  const title = `${area.name}の外構・庭リフォーム業者を対応エリア表記で比較 | 庭リフォームナビ`;
  const description = `${area.name}（${area.prefectures.join("・")}）で使える外構・庭リフォームの一括見積もり／業者紹介サービス${companies.length}社を、各社が公表している対応エリアの表記で比較。申し込み前の確認手順もまとめました。`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, type: "article" },
  };
}

export default async function AreaPage({ params }: Props) {
  const { slug } = await params;
  const area = areas.find((a) => a.slug === slug);
  if (!area) notFound();

  const url = `${SITE}/area/${area.slug}/`;
  const others = areas.filter((a) => a.slug !== area.slug);

  const rows = companies.map((c) => ({
    ...c,
    ...coverageOf(c.slug, c.coverage),
    hasReview: reviews.some((r) => r.slug === c.slug),
  }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "ホーム", item: `${SITE}/` },
          { "@type": "ListItem", position: 2, name: `${area.name}エリア`, item: url },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: area.faqs.map((f) => ({
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

      <Breadcrumb items={[{ label: `${area.name}エリア` }]} />

      {/* Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
          {area.name}の外構・庭リフォーム業者を対応エリア表記で比較
        </h1>
        <p className="text-gray-600 leading-relaxed">{area.lead}</p>
        <div className="flex flex-wrap gap-2 mt-4">
          {area.prefectures.map((p) => (
            <span key={p} className="bg-bg text-primary text-xs px-3 py-1 rounded-full border border-emerald-200">
              {p}
            </span>
          ))}
        </div>
      </div>

      {/* Editorial note — must stay above the table */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 mb-6">
        <h2 className="text-base font-bold text-amber-900 mb-2">このページの読み方</h2>
        <ul className="space-y-1.5 text-sm text-amber-900/90 leading-relaxed">
          <li>
            掲載しているのは各社が公式サイトで公表している対応エリアの表記そのものです。{area.name}
            での対応可否・紹介可能な会社数は各社へ確認してください。
          </li>
          <li>
            各社は都道府県別の実績や評価を公表していないため、「{area.name}に強い」といった地域別の優劣は判定していません。
          </li>
          <li>地域別の施工件数・平均費用は公表資料で確認できなかったため、このページには記載していません。</li>
        </ul>
      </div>

      {/* Coverage table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
        <h2 className="text-lg font-bold mb-1 text-gray-800">
          {area.name}で使えるサービスの「対応エリア」公表表記
        </h2>
        <p className="text-xs text-gray-500 mb-4">
          出典：各社公式サイトの記載（当サイトの業者レビュー記事「基本情報」欄に転記したもの）
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-bg text-left">
                <th className="p-3 font-bold text-gray-700 whitespace-nowrap">サービス名</th>
                <th className="p-3 font-bold text-gray-700">公表されている対応エリア</th>
                <th className="p-3 font-bold text-gray-700 whitespace-nowrap">{area.name}での可否</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((c) => (
                <tr key={c.slug} className="border-t border-gray-100 align-top">
                  <td className="p-3 whitespace-nowrap">
                    <Link href={`/company/${c.slug}/`} className="font-bold text-primary hover:underline">
                      {c.name}
                    </Link>
                    {c.hasReview && (
                      <div className="mt-1">
                        <Link href={`/review/${c.slug}/`} className="text-xs text-gray-500 hover:underline">
                          口コミを見る
                        </Link>
                      </div>
                    )}
                  </td>
                  <td className="p-3 text-gray-700 leading-relaxed">{c.text}</td>
                  <td className="p-3 text-gray-500 text-xs whitespace-nowrap">各社へ確認</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-500 mt-4 leading-relaxed">
          表記が「全国」であっても、市区町村によって紹介できる加盟店がない場合があるとされています。
          {area.name}の住所での可否は、申し込み前に各社へ直接確認してください。
        </p>
      </div>

      {/* Area-specific angle */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
        <h2 className="text-lg font-bold mb-3 text-gray-800">{area.angleHeading}</h2>
        <p className="text-sm text-gray-600 leading-relaxed mb-5">{area.angleLead}</p>
        <div className="space-y-4">
          {area.anglePoints.map((p, i) => (
            <div key={i} className="bg-bg rounded-xl p-4">
              <div className="font-bold text-gray-800 mb-1 text-sm">{p.title}</div>
              <p className="text-sm text-gray-600 leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Checklist */}
      <div className="bg-bg rounded-2xl p-6 mb-6">
        <h2 className="text-lg font-bold mb-4 text-gray-800">{area.checklistHeading}</h2>
        <ul className="space-y-3">
          {area.checklist.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-gray-700 bg-white rounded-xl p-3">
              <span className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs shrink-0 font-bold">
                {i + 1}
              </span>
              {item}
            </li>
          ))}
        </ul>
        <p className="text-xs text-gray-500 mt-4 leading-relaxed">
          建築確認や自治体の助成制度の要否は、工事内容と所在地によって扱いが異なります。判断は各社および該当の自治体へ確認してください。
        </p>
      </div>

      {/* FAQ */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
        <h2 className="text-lg font-bold mb-4 text-gray-800">{area.name}のエリア対応について寄せられる疑問</h2>
        <div className="space-y-4">
          {area.faqs.map((faq, i) => (
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
      </div>

      {/* Other areas */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
        <h2 className="text-lg font-bold mb-4 text-gray-800">ほかのエリアの対応状況を見る</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {others.map((a) => (
            <Link
              key={a.slug}
              href={`/area/${a.slug}/`}
              className="bg-bg rounded-xl p-4 hover:bg-emerald-100 transition-colors"
            >
              <div className="font-bold text-gray-800 mb-1">{a.name}</div>
              <div className="text-xs text-gray-500">{a.prefectures.join("・")}</div>
            </Link>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-r from-accent to-blue-700 rounded-2xl p-8 text-white text-center">
        <h2 className="text-xl font-bold mb-2">{area.name}の住所で対応可否を確かめる</h2>
        <p className="text-blue-100 mb-4 text-sm">
          複数のサービスに同じ条件で相談すると、紹介可能な会社があるかを比べられます
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
