import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import reviewsData from "@/data/reviews.json";
import Breadcrumb from "@/components/Breadcrumb";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return reviewsData.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const r = reviewsData.find((x) => x.slug === slug);
  if (!r) return {};
  const url = `https://garden-reform-navi.com/review/${r.slug}/`;
  return {
    title: r.title,
    description: r.metaDescription,
    alternates: { canonical: url },
    openGraph: { title: r.title, description: r.metaDescription, url, type: "article" },
  };
}

export default async function ReviewPage({ params }: Props) {
  const { slug } = await params;
  const r = reviewsData.find((x) => x.slug === slug) as any;
  if (!r) notFound();

  const rating = r.ratingBlock; // optional (Google rating)

  const toc = [
    { id: "basic", label: `${r.companyName}とは（運営会社・基本情報）` },
    { id: "reviews", label: r.reviewsHeading },
    { id: "strengths", label: "口コミからわかる強み・特徴" },
    { id: "cautions", label: "利用前に知っておきたい注意点" },
    { id: "recommended", label: "どんな人におすすめか" },
    { id: "faq", label: "よくある質問" },
    { id: "summary", label: "まとめ" },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: r.title,
        description: r.metaDescription,
        image: `https://garden-reform-navi.com${r.heroImage}`,
        dateModified: "2026-06-16",
        author: { "@type": "Organization", name: "庭リフォームナビ" },
        publisher: { "@type": "Organization", name: "庭リフォームナビ", url: "https://garden-reform-navi.com/" },
        mainEntityOfPage: `https://garden-reform-navi.com/review/${r.slug}/`,
      },
      {
        "@type": "FAQPage",
        mainEntity: r.faqs.map((f: any) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <article className="max-w-3xl mx-auto px-4 py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <Breadcrumb items={[{ label: "口コミ・評判", href: "/review/" }, { label: r.companyName }]} />

      <header className="mt-2">
        <span className="label inline-block mb-3 text-primary">業者レビュー</span>
        <h1 className="text-2xl sm:text-3xl font-bold leading-snug text-text-primary mb-4">{r.title}</h1>
        <div className="flex items-center gap-3 text-sm text-text-muted mb-6">
          <time dateTime="2026-06-16">最終更新：{r.updatedAt}</time>
          <span className="w-px h-3 bg-border" />
          <span>庭リフォームナビ編集部</span>
        </div>
        <figure className="mb-6">
          <img src={r.heroImage} alt={r.heroAlt} width={1200} height={630}
            className="w-full rounded-2xl border border-border object-cover aspect-[1200/630]" />
        </figure>
        <p className="text-[15px] leading-8 text-text-secondary">{r.lead}</p>
      </header>

      {/* Google rating callout (only when a Google rating exists) */}
      {rating && (
        <div className="my-8 rounded-2xl border border-border bg-surface p-5 sm:p-6 flex items-center gap-5 flex-wrap">
          <div className="text-center">
            <div className="text-4xl font-bold text-primary leading-none">{rating.rating}</div>
            <div className="mt-1 text-warning text-sm">★★★★★</div>
          </div>
          <div className="flex-1 min-w-[200px]">
            <p className="text-sm text-text-secondary leading-6">
              <a href={rating.mapsUri} target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-2">{rating.sourceLabel}</a>
              での評価です。口コミ {rating.reviewCount} 件の平均（{rating.fetchedAt}時点）。本記事の口コミはGoogleマップに実際に投稿されたレビューの抜粋です。
            </p>
          </div>
        </div>
      )}

      {/* TOC */}
      <nav className="mb-10 rounded-2xl border border-border bg-surface-alt p-5">
        <p className="font-bold text-text-primary mb-3 text-sm">目次</p>
        <ol className="space-y-2 text-sm list-decimal list-inside marker:text-text-muted">
          {toc.map((t) => (
            <li key={t.id}>
              <a href={`#${t.id}`} className="text-primary hover:underline">{t.label}</a>
            </li>
          ))}
        </ol>
      </nav>

      {/* Basic info */}
      <section id="basic" className="scroll-mt-20 mb-12">
        <h2 className="text-xl font-bold text-text-primary border-l-4 border-primary pl-3 mb-5">{r.companyName}とは（運営会社・基本情報）</h2>
        <p className="text-[15px] leading-8 text-text-secondary mb-5">{r.basicLead}</p>
        <div className="overflow-hidden rounded-2xl border border-border">
          <table className="w-full text-sm">
            <tbody>
              {r.basicInfo.map((i: any, idx: number) => (
                <tr key={i.label} className={idx % 2 ? "bg-surface-alt" : "bg-surface"}>
                  <th className="text-left align-top font-semibold text-text-primary px-4 py-3 w-32 whitespace-nowrap">{i.label}</th>
                  <td className="px-4 py-3 text-text-secondary leading-7">{i.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-text-muted">{r.infoSource}</p>
      </section>

      {/* Reviews / testimonials */}
      <section id="reviews" className="scroll-mt-20 mb-12">
        <h2 className="text-xl font-bold text-text-primary border-l-4 border-primary pl-3 mb-5">{r.reviewsHeading}</h2>
        <p className="text-[15px] leading-8 text-text-secondary mb-6">{r.reviewsIntro}</p>
        {r.reviews.length > 0 ? (
          <div className="space-y-4">
            {r.reviews.map((rv: any, i: number) => (
              <figure key={i} className="rounded-2xl border border-border bg-surface p-5">
                <div className="flex items-center justify-between mb-2 gap-3">
                  <figcaption className="text-sm font-semibold text-text-primary">{rv.author}</figcaption>
                  {rv.rating ? (
                    <span className="text-warning text-sm" aria-label={`評価${rv.rating}`}>{"★".repeat(rv.rating)}<span className="text-border">{"★".repeat(5 - rv.rating)}</span></span>
                  ) : null}
                </div>
                <blockquote className="text-[15px] leading-8 text-text-secondary">「{rv.excerpt}」</blockquote>
                {rv.sourceUrl && (
                  <a href={rv.sourceUrl} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-xs text-primary underline">出典（公式サイト）</a>
                )}
              </figure>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-border bg-surface-alt p-5 text-[15px] leading-8 text-text-secondary">
            {r.reviewsEmptyNote}
          </div>
        )}
        <p className="mt-4 text-xs text-text-muted">{r.reviewsSourceNote}</p>

        <figure className="mt-8">
          <img src={r.subImage} alt={r.subAlt} width={1200} height={630}
            className="w-full rounded-2xl border border-border object-cover aspect-[1200/630]" />
          <figcaption className="mt-2 text-xs text-text-muted text-center">外構・庭リフォームは工事内容（カーポート・ウッドデッキ・フェンス・植栽等）によって費用が異なります。</figcaption>
        </figure>
      </section>

      {/* Strengths */}
      <section id="strengths" className="scroll-mt-20 mb-12">
        <h2 className="text-xl font-bold text-text-primary border-l-4 border-primary pl-3 mb-5">口コミからわかる強み・特徴</h2>
        <div className="space-y-5">
          {r.strengths.map((s: any, i: number) => (
            <div key={i}>
              <h3 className="font-bold text-text-primary mb-2 flex items-start gap-2">
                <span className="mono text-primary">{String(i + 1).padStart(2, "0")}</span>
                <span>{s.h}</span>
              </h3>
              <p className="text-[15px] leading-8 text-text-secondary pl-7">{s.b}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Cautions */}
      <section id="cautions" className="scroll-mt-20 mb-12">
        <h2 className="text-xl font-bold text-text-primary border-l-4 border-primary pl-3 mb-5">利用前に知っておきたい注意点</h2>
        <div className="space-y-4">
          {r.cautions.map((c: any, i: number) => (
            <div key={i} className="rounded-2xl border border-border bg-surface-alt p-5">
              <h3 className="font-bold text-text-primary mb-2">{c.h}</h3>
              <p className="text-[15px] leading-8 text-text-secondary">{c.b}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Recommended */}
      <section id="recommended" className="scroll-mt-20 mb-12">
        <h2 className="text-xl font-bold text-text-primary border-l-4 border-primary pl-3 mb-5">どんな人におすすめか</h2>
        <ul className="space-y-3">
          {r.recommended.map((x: string, i: number) => (
            <li key={i} className="flex items-start gap-3 text-[15px] leading-8 text-text-secondary">
              <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
              <span>{x}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* FAQ */}
      <section id="faq" className="scroll-mt-20 mb-12">
        <h2 className="text-xl font-bold text-text-primary border-l-4 border-primary pl-3 mb-5">よくある質問</h2>
        <div className="space-y-4">
          {r.faqs.map((f: any, i: number) => (
            <div key={i} className="rounded-2xl border border-border bg-surface p-5">
              <h3 className="font-bold text-text-primary mb-2">Q. {f.q}</h3>
              <p className="text-[15px] leading-8 text-text-secondary">A. {f.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Summary */}
      <section id="summary" className="scroll-mt-20 mb-10">
        <h2 className="text-xl font-bold text-text-primary border-l-4 border-primary pl-3 mb-5">まとめ</h2>
        <p className="text-[15px] leading-8 text-text-secondary">{r.summary}</p>
      </section>

      {/* CTA */}
      <div className="rounded-2xl border border-border bg-surface-alt p-6 text-center">
        <p className="text-sm text-text-secondary mb-4">公式サイトで対応エリアや見積もりの流れを確認できます。</p>
        <a href={r.officialUrl} target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-primary text-white font-bold hover:opacity-90 transition-opacity">
          {r.companyName} 公式サイト
        </a>
        <p className="mt-3 text-xs text-text-muted">本ページにはPR（広告）を含む場合があります。掲載情報は{r.updatedAt}時点のものです。</p>
      </div>

      <div className="mt-8 flex flex-wrap gap-4 text-sm">
        <Link href="/review/" className="text-primary hover:underline">他の業者の口コミ・評判を見る</Link>
        <Link href="/ranking/" className="text-primary hover:underline">外構・庭リフォーム業者ランキングを見る</Link>
      </div>
    </article>
  );
}
