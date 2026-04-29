import { notFound } from "next/navigation";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import scenes from "@/data/scenes.json";
import companies from "@/data/companies.json";
import works from "@/data/works.json";

export async function generateStaticParams() {
  return scenes.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const scene = scenes.find((s) => s.slug === slug);
  if (!scene) return {};
  return {
    title: `${scene.title}の外構・庭リフォームガイド | 庭リフォームナビ`,
    description: `${scene.title}の外構工事について詳しく解説。費用相場・おすすめ業者・注意点を紹介します。`,
  };
}

export default async function ScenePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const scene = scenes.find((s) => s.slug === slug);
  if (!scene) notFound();

  const recommendedComps = companies.filter((c) => scene.recommendedCompanies.includes(c.slug));
  const recommendedWorkList = works.filter((w) => scene.recommendedWorks.includes(w.slug));

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Breadcrumb items={[
        { label: "シーン別ガイド", href: "/scene/new-house/" },
        { label: scene.title },
      ]} />

      {/* Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">{scene.title}の外構・庭リフォームガイド</h1>
        <p className="text-gray-600 leading-relaxed">{scene.description}</p>
        <div className="flex flex-wrap gap-2 mt-4">
          {scene.keywords.map((kw, i) => (
            <span key={i} className="bg-bg text-primary text-xs px-3 py-1 rounded-full border border-emerald-200">
              #{kw}
            </span>
          ))}
        </div>
      </div>

      {/* Tips */}
      <div className="bg-bg rounded-2xl p-6 mb-6">
        <h2 className="text-lg font-bold mb-4 text-gray-800">{scene.title}の重要ポイント</h2>
        <ul className="space-y-3">
          {scene.tips.map((tip, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-gray-700 bg-white rounded-xl p-3">
              <span className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs shrink-0 font-bold">{i + 1}</span>
              {tip}
            </li>
          ))}
        </ul>
      </div>

      {/* Recommended Works */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
        <h2 className="text-lg font-bold mb-4 text-gray-800">{scene.title}におすすめの工事</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {recommendedWorkList.map((work) => (
            <Link
              key={work.slug}
              href={`/work/${work.slug}/`}
              className="bg-bg rounded-xl p-4 hover:bg-emerald-100 transition-colors"
            >
              <div className="font-bold text-gray-800 mb-1">{work.title}</div>
              <div className="text-sm text-primary">{work.costRange}</div>
              <div className="text-xs text-gray-500 mt-1">工期: {work.duration}</div>
            </Link>
          ))}
        </div>
      </div>

      {/* Recommended Companies */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
        <h2 className="text-lg font-bold mb-4 text-gray-800">{scene.title}におすすめの業者</h2>
        <div className="space-y-4">
          {recommendedComps.map((company, i) => (
            <div key={company.slug} className="flex items-start gap-4 p-4 bg-bg rounded-xl">
              <span className={`text-white text-sm font-bold px-2 py-1 rounded shrink-0 ${i === 0 ? "bg-yellow-500" : i === 1 ? "bg-gray-400" : "bg-amber-600"}`}>
                {i + 1}位
              </span>
              <div className="flex-1">
                <div className="font-bold text-gray-800">{company.name}</div>
                <div className="text-sm text-primary">{company.tagline}</div>
                <div className="text-xs text-gray-500 mt-1">{company.avgCost} | {company.coverage}</div>
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

      {/* FAQ */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
        <h2 className="text-lg font-bold mb-4 text-gray-800">{scene.title}に関するよくある質問</h2>
        <div className="space-y-4">
          {scene.faqs.map((faq, i) => (
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
                {faq.answer}
              </div>
            </details>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-r from-accent to-blue-700 rounded-2xl p-8 text-white text-center">
        <h2 className="text-xl font-bold mb-2">{scene.title}の無料見積もりを取る</h2>
        <p className="text-blue-100 mb-4 text-sm">まずは複数業者に相談して、最適なプランを見つけましょう</p>
        <Link
          href="/ranking/estimate/"
          className="bg-white text-accent px-8 py-3 rounded-full font-bold hover:bg-blue-50 transition-colors inline-block"
        >
          <span className="text-xs bg-accent text-white px-1.5 py-0.5 rounded font-bold mr-2">PR</span>
          無料で見積もりを比較する →
        </Link>
      </div>
    </div>
  );
}
