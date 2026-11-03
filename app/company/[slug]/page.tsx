import { notFound } from "next/navigation";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import companies from "@/data/companies.json";
import reviewPages from "@/data/reviews.json";

// このページの本文に口コミ（出典つき）を載せている社だけ、title に「口コミ・評判」を入れる。
// 2026-11-03 時点ではどの社も本文に口コミが無いため、全社「特徴・メリット・デメリット」になる。
// 口コミは /review/{slug}/ に出典つきでまとめている。
function hasSourcedReviews(company: unknown): boolean {
  const r = (company as { reviews?: unknown[] }).reviews;
  return Array.isArray(r) && r.length > 0;
}

export async function generateStaticParams() {
  return companies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const company = companies.find((c) => c.slug === slug);
  if (!company) return {};
  return {
    title: hasSourcedReviews(company)
      ? `${company.name}の口コミ・評判・特徴 | 庭リフォームナビ`
      : `${company.name}の特徴・メリット・デメリット | 庭リフォームナビ`,
    description: `${company.name}の特徴・メリット・デメリットを解説しています。${company.tagline}。`,
    alternates: { canonical: `/company/${company.slug}/` },
  };
}

export default async function CompanyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const company = companies.find((c) => c.slug === slug);
  if (!company) notFound();

  const rank = companies.findIndex((c) => c.slug === slug) + 1;
  const reviewPage = (reviewPages as { slug: string }[]).find((r) => r.slug === slug);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Breadcrumb items={[
        { label: "ランキング", href: "/ranking/" },
        { label: company.name },
      ]} />

      {/* Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-primary text-white text-xs font-bold px-2 py-1 rounded">総合 {rank}位</span>
              <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">対応エリア: {company.coverage}</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">{company.name}</h1>
            <p className="text-primary font-medium mt-1">{company.tagline}</p>
          </div>
        </div>
        <p className="text-gray-600 leading-relaxed">{company.description}</p>
      </div>

      {/* Key Info */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-bg rounded-xl p-4 text-center">
          <div className="text-xs text-gray-500 mb-1">対応エリア</div>
          <div className="font-bold text-gray-800">{company.coverage}</div>
        </div>
        <div className="bg-accent text-white rounded-xl p-4 text-center">
          <div className="text-xs text-blue-100 mb-1">無料見積もり</div>
          <div className="font-bold">公式サイトで依頼</div>
        </div>
      </div>

      {/* Features */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
        <h2 className="text-lg font-bold mb-4 text-gray-800">主な特徴・サービス</h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {company.features.map((feature, i) => (
            <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
              <span className="w-5 h-5 bg-primary rounded-full flex items-center justify-center text-white text-xs shrink-0"></span>
              {feature}
            </li>
          ))}
        </ul>
      </div>

      {/* Pros & Cons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {company.pros.length > 0 && (
        <div className="bg-green-50 rounded-2xl p-6 border border-green-200">
          <h2 className="text-lg font-bold mb-4 text-green-800">メリット</h2>
          <ul className="space-y-3">
            {company.pros.map((pro, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-green-700">
                <span className="text-green-500 font-bold mt-0.5">◎</span>
                {pro}
              </li>
            ))}
          </ul>
        </div>
        )}
        {company.cons.length > 0 && (
        <div className="bg-red-50 rounded-2xl p-6 border border-red-200">
          <h2 className="text-lg font-bold mb-4 text-red-800">デメリット</h2>
          <ul className="space-y-3">
            {company.cons.map((con, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-red-700">
                <span className="text-red-500 font-bold mt-0.5">△</span>
                {con}
              </li>
            ))}
          </ul>
        </div>
        )}
      </div>

      {reviewPage && (
        <p className="text-sm text-gray-700 mb-6">
          {company.name}の口コミ・評判は、
          <Link href={`/review/${slug}/`} className="text-primary underline">{company.name}の評判（別ページ）</Link>
          にまとめています。
        </p>
      )}

      {/* CTA */}
      <div className="bg-gradient-to-r from-accent to-blue-700 rounded-2xl p-8 text-white text-center mb-6">
        <h2 className="text-xl font-bold mb-2">{company.name}の無料見積もり</h2>
        <p className="text-blue-100 mb-4 text-sm">無料で複数の業者から見積もりを取得し、比較できます</p>
        <a
          href={company.officialUrl}
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="bg-white text-accent px-8 py-3 rounded-full font-bold hover:bg-blue-50 transition-colors inline-block"
        >
          <span className="text-xs bg-accent text-white px-1.5 py-0.5 rounded font-bold mr-2">PR</span>
          公式サイトで無料見積もりを依頼する →
        </a>
      </div>

      {/* ガーデンプラス公式トップで確認した事実（2026-11-04 追加。trust-audit C7 対応。原文の表示を確認したものだけ） */}
      {slug === "garden-plus" && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          <h2 className="text-lg font-bold mb-3 text-gray-800">公式サイトで確認できる施工事例と工事メニュー</h2>
          <div className="text-sm text-gray-700 leading-relaxed space-y-3">
            <p>
              ガーデンプラスの公式サイトのトップページには「施工事例 29818 件掲載中」と表示されています。施工事例は、トップページの「外構メニューから探す」にある次の12の区分から探せます。
            </p>
            <p>
              駐車スペース・車庫／駐輪スペース・自転車置き場／門柱・門まわり／ブロック塀・デザイン塀／アプローチ／境界・外周／デッキ・テラス／庭／花壇・植栽スペース／勝手口まわり・収納／犬走り／土留め・法面
            </p>
            <p>
              掲載件数は増減するため、最新の数は公式サイトでご確認ください。
            </p>
            <p className="text-xs text-gray-500">
              出典：<a href="https://www.garden.ne.jp/" target="_blank" rel="noopener noreferrer" className="underline">エクステリア外構工事を激安で提案 | 外構工事のガーデンプラス</a>（2026年11月4日確認）
            </p>
          </div>
        </div>
      )}

      {/* 公式情報にもとづく関連ページ（2026-11-01 追加。エクスショップ・ガーデンプラスのみ） */}
      {(slug === "ex-shop" || slug === "garden-plus") && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          <h2 className="text-lg font-bold mb-3 text-gray-800">{company.name}の対応エリア・比較</h2>
          <ul className="space-y-2 text-sm">
            {slug === "ex-shop" ? (
              <li><Link href="/company/ex-shop/area/" className="text-primary underline">エクスショップの施工対応エリア（都道府県別の施工店数）</Link></li>
            ) : (
              <li><Link href="/company/garden-plus/shop/" className="text-primary underline">ガーデンプラスの店舗・対応エリア（都道府県別の拠点数）</Link></li>
            )}
            <li><Link href="/compare/ex-shop-vs-garden-plus/" className="text-primary underline">エクスショップとガーデンプラスの違い</Link></li>
          </ul>
        </div>
      )}

      {/* Other Companies */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-bold mb-4 text-gray-800">他の業者との比較</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {companies.filter((c) => c.slug !== slug).slice(0, 6).map((c) => (
            <Link
              key={c.slug}
              href={`/company/${c.slug}/`}
              className="text-center p-3 bg-bg rounded-lg hover:bg-emerald-100 transition-colors text-sm font-medium text-gray-700"
            >
              {c.name}
            </Link>
          ))}
        </div>
        <div className="text-center mt-4">
          <Link href="/ranking/" className="text-primary text-sm font-bold hover:underline">
            全10社のランキングを見る →
          </Link>
        </div>
      </div>
    </div>
  );
}
