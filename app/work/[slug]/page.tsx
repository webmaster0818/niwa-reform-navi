import { notFound } from "next/navigation";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import works from "@/data/works.json";
import companies from "@/data/companies.json";

export async function generateStaticParams() {
  return works.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const work = works.find((w) => w.slug === slug);
  if (!work) return {};
  return {
    title: `${work.title}の費用相場・業者選び | 庭リフォームナビ`,
    description: `${work.title}の費用相場は${work.costRange}。工期・ポイント・おすすめ業者を詳しく解説します。`,
  };
}

export default async function WorkPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const work = works.find((w) => w.slug === slug);
  if (!work) notFound();

  const recommendedComps = companies.filter((c) => work.recommendedCompanies.includes(c.slug));

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Breadcrumb items={[
        { label: "工事の種類", href: "/work/wood-deck/" },
        { label: work.title },
      ]} />

      {/* Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{work.title}の費用相場・業者選びガイド</h1>
        <p className="text-gray-600 leading-relaxed">{work.description}</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-primary text-white rounded-xl p-4 text-center">
          <div className="text-xs mb-1 text-emerald-100">費用相場</div>
          <div className="font-bold text-sm">{work.costRange}</div>
        </div>
        <div className="bg-secondary text-white rounded-xl p-4 text-center">
          <div className="text-xs mb-1 text-amber-100">工期</div>
          <div className="font-bold text-sm">{work.duration}</div>
        </div>
        <div className="bg-white rounded-xl p-4 text-center border border-gray-200">
          <div className="text-xs text-gray-500 mb-1">難易度</div>
          <div className="font-bold text-gray-800 text-sm">{work.difficulty}</div>
        </div>
      </div>

      {/* Tips */}
      <div className="bg-bg rounded-2xl p-6 mb-6">
        <h2 className="text-lg font-bold mb-4 text-gray-800">工事のポイント・注意点</h2>
        <ul className="space-y-3">
          {work.tips.map((tip, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
              <span className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs shrink-0 font-bold">{i + 1}</span>
              {tip}
            </li>
          ))}
        </ul>
      </div>

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
                <div className="text-xs text-gray-500 mt-1">費用相場: {company.avgCost} | 対応: {company.coverage}</div>
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
                {faq.answer}
              </div>
            </details>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-r from-primary to-emerald-600 rounded-2xl p-8 text-white text-center">
        <h2 className="text-xl font-bold mb-2">{work.title}の無料見積もりを取る</h2>
        <p className="text-emerald-100 mb-4 text-sm">複数業者から見積もりを比較して最安値を見つけましょう</p>
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
