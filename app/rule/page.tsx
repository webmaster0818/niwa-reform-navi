import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import rules from "@/data/rules.json";
import { OG_IMAGE } from "@/lib/og";

const SITE = "https://garden-reform-navi.com";
const UPDATED = "2026-10-21";
const GROUPS = ["塀・建物・工作物", "隣地・境界", "道路", "契約・業者・資格", "マンション・賃貸", "工事中の届出・近隣", "農地・土地利用"];

const url = `${SITE}/rule/`;
const title = `外構・庭リフォームの法令・手続きガイド｜条文で確認する${rules.length}の論点 | 庭リフォームナビ`;
const description =
  "ブロック塀の基準、建築確認、擁壁と盛土、防火地域、隣地境界の距離、筆界特定、雨水と排水、道路の工事と使用許可、建設業許可、クーリング・オフ、契約不適合責任、マンションの専用庭、賃貸の原状回復、工事の騒音・振動、解体の届出、農地の転用。外構・庭リフォームの前提になる決まりを、法令の条文を引用して整理しています。";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: url },
  openGraph: { title, description, url, type: "website", images: [OG_IMAGE] },
};

export default function RuleIndexPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "ホーム", item: `${SITE}/` },
          { "@type": "ListItem", position: 2, name: "法令・手続きガイド", item: url },
        ],
      },
      {
        "@type": "ItemList",
        itemListElement: rules.map((r, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: r.name,
          url: `${SITE}/rule/${r.slug}/`,
        })),
      },
    ],
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <Breadcrumb items={[{ label: "法令・手続きガイド" }]} />

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 leading-snug">
          外構・庭リフォームの法令・手続きガイド
        </h1>
        <p className="text-gray-600 leading-relaxed">
          外構や庭の工事では、費用やデザインを決める前に、法令上どこまで工事が可能かを確認する必要があります。塀の高さ、確認申請の要否、隣地との距離や費用の分け方、雨水の行き先、道路にかかる工事、業者との契約や資格、マンションや賃貸住宅での決まり、工事中の届出、そして農地を庭や駐車場にする場合の手続き。いずれも法令に数値や手順が書かれています。本ガイドでは、条文を引用したうえで、条文に定められている事項と個別の判断が必要な事項を分けて整理しています。
        </p>
        <p className="text-xs text-gray-400 mt-4">最終更新日：{UPDATED}</p>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 mb-6">
        <h2 className="text-base font-bold text-amber-900 mb-2">このガイドの方針</h2>
        <ul className="space-y-1.5 text-sm text-amber-900/90 leading-relaxed">
          <li>条文はe-Gov法令検索で公開されている現行の条文を転記し、各ページに出典リンクを置いています。</li>
          <li>個別の敷地・計画について適法か違法かの判定は行いません。判断は所管の窓口や専門家にご確認ください。</li>
          <li>自治体ごとに異なる手数料・様式・補助制度の金額は、数値が確認できないため記載していません。</li>
        </ul>
      </div>

      <nav aria-label="分野" className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-6">
        <h2 className="text-sm font-bold text-gray-800 mb-3">分野から探す</h2>
        <ul className="flex flex-wrap gap-2 text-sm">
          {GROUPS.map((g, gi) => (
            <li key={g}>
              <a href={`#g${gi + 1}`} className="inline-block bg-bg rounded-full px-3 py-1.5 text-gray-700 hover:bg-emerald-100 transition-colors">
                {g}（{rules.filter((r) => r.group === g).length}）
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {GROUPS.map((g, gi) => (
        <section key={g} id={`g${gi + 1}`} className="mb-8 scroll-mt-4">
          <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-4 border-l-4 border-primary pl-3">{g}</h2>
          <div className="grid grid-cols-1 gap-4">
            {rules
              .filter((r) => r.group === g)
              .map((r) => (
                <Link
                  key={r.slug}
                  href={`/rule/${r.slug}/`}
                  className="block bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:border-emerald-300 transition-colors"
                >
                  <div className="flex flex-wrap gap-2 mb-2">
                    {Array.from(new Set(r.laws.map((l) => l.name))).map((n) => (
                      <span key={n} className="bg-bg text-primary text-xs px-3 py-1 rounded-full border border-emerald-200">
                        {n}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2 leading-snug">{r.h1}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{r.lead}</p>
                  <span className="inline-block mt-3 text-sm text-primary font-bold">条文を読む →</span>
                </Link>
              ))}
          </div>
        </section>
      ))}

      <div className="bg-gradient-to-r from-accent to-blue-700 rounded-2xl p-8 text-white text-center">
        <h2 className="text-xl font-bold mb-2">手続きの扱いは、業者によって工程が異なります</h2>
        <p className="text-blue-100 mb-4 text-sm">
          同じ条件で複数社に相談すると、申請の代行範囲や着工までの流れを比較できます
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
