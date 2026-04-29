import Link from "next/link";
import companies from "@/data/companies.json";
import works from "@/data/works.json";

const workIcons: Record<string, string> = {
  "wood-deck": "🪵",
  "carport": "🚗",
  "fence": "🔲",
  "concrete": "⬜",
  "garden-room": "🏡",
  "gate": "🚪",
  "garden-design": "🌸",
  "lighting": "💡",
};

const faqData = [
  {
    q: "庭・外構リフォームの費用相場はいくらですか？",
    a: "工事の種類や規模によって異なりますが、一般的な外構工事全般では100〜300万円が相場です。ウッドデッキや植栽のみなら30〜80万円、フルリフォームでは300万円以上になる場合もあります。",
  },
  {
    q: "外構業者はどうやって選べばいいですか？",
    a: "一括見積もりサービスを使って複数の業者から見積もりを取り、価格・プラン・実績・口コミを比較するのがおすすめです。最低3社から見積もりを取ることで相場感がわかります。",
  },
  {
    q: "見積もりは無料ですか？",
    a: "タウンライフエクステリア・ガーデンプラスなど、当サイトで紹介している一括見積もりサービスはすべて無料です。費用は一切かかりません。",
  },
  {
    q: "工事期間はどのくらいかかりますか？",
    a: "工事の種類によって異なります。カーポートや門扉なら1〜3日、ウッドデッキや舗装工事は3〜7日、大規模なリフォームでは2〜4週間かかる場合があります。",
  },
];

export default function Home() {
  const top3 = companies.slice(0, 3);

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary to-emerald-700 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
            理想の庭が見つかる。
          </h1>
          <p className="text-lg md:text-xl mb-8 text-emerald-100">
            外構・庭リフォームの費用相場・業者比較・見積もりならお任せ
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/ranking/estimate/"
              className="bg-accent hover:bg-blue-700 text-white px-8 py-4 rounded-full font-bold text-lg transition-colors shadow-lg"
            >
              <span className="text-xs bg-white text-accent px-1.5 py-0.5 rounded font-bold mr-2">PR</span>
              無料で見積もりを比較する
            </Link>
            <Link
              href="/ranking/"
              className="bg-white text-primary px-8 py-4 rounded-full font-bold text-lg hover:bg-emerald-50 transition-colors shadow-lg"
            >
              業者ランキングを見る
            </Link>
          </div>
        </div>
      </section>

      {/* Work Type Navigation */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">
          工事の種類から探す
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {works.map((work) => (
            <Link
              key={work.slug}
              href={`/work/${work.slug}/`}
              className="bg-white rounded-xl p-4 text-center shadow-sm hover:shadow-md border border-gray-100 hover:border-primary transition-all group"
            >
              <div className="text-3xl mb-2">{workIcons[work.slug] || "🌿"}</div>
              <div className="font-bold text-gray-800 group-hover:text-primary text-sm">{work.title}</div>
              <div className="text-xs text-gray-500 mt-1">{work.costRange}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* TOP3 Ranking */}
      <section className="bg-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-2 text-gray-800">
            おすすめ外構業者 TOP3
          </h2>
          <p className="text-center text-sm text-gray-500 mb-8">編集部が厳選した信頼できる業者を紹介します</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {top3.map((company, i) => (
              <div key={company.slug} className="relative bg-bg rounded-xl p-6 border-2 border-emerald-100 hover:border-primary transition-colors">
                <div className="absolute -top-3 left-4">
                  <span className={`text-white text-xs font-bold px-3 py-1 rounded-full ${i === 0 ? "bg-yellow-500" : i === 1 ? "bg-gray-400" : "bg-amber-600"}`}>
                    {i === 0 ? "🥇 1位" : i === 1 ? "🥈 2位" : "🥉 3位"}
                  </span>
                </div>
                <h3 className="font-bold text-lg mt-2 mb-1 text-gray-800">{company.name}</h3>
                <p className="text-sm text-primary font-medium mb-3">{company.tagline}</p>
                <ul className="text-sm text-gray-600 space-y-1 mb-4">
                  {company.pros.slice(0, 2).map((pro, j) => (
                    <li key={j} className="flex items-start gap-1">
                      <span className="text-primary mt-0.5">✓</span>
                      <span>{pro}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/company/${company.slug}/`}
                  className="block text-center bg-accent text-white py-2 rounded-lg text-sm font-bold hover:bg-blue-700 transition-colors"
                >
                  詳細を見る
                </Link>
              </div>
            ))}
          </div>
          <div className="text-center mt-6">
            <Link href="/ranking/" className="text-primary font-bold hover:underline">
              全10社のランキングを見る →
            </Link>
          </div>
        </div>
      </section>

      {/* Cost Comparison */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">
          工事別 費用相場早見表
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full bg-white rounded-xl shadow-sm border border-gray-100">
            <thead>
              <tr className="bg-primary text-white">
                <th className="text-left px-4 py-3 rounded-tl-xl">工事の種類</th>
                <th className="text-left px-4 py-3">費用相場</th>
                <th className="text-left px-4 py-3">工期</th>
                <th className="text-left px-4 py-3 rounded-tr-xl">難易度</th>
              </tr>
            </thead>
            <tbody>
              {works.map((work, i) => (
                <tr key={work.slug} className={i % 2 === 0 ? "bg-white" : "bg-bg"}>
                  <td className="px-4 py-3">
                    <Link href={`/work/${work.slug}/`} className="font-medium text-primary hover:underline flex items-center gap-2">
                      <span>{workIcons[work.slug]}</span>
                      <span>{work.title}</span>
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">{work.costRange}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{work.duration}</td>
                  <td className="px-4 py-3 text-sm">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      work.difficulty.includes("低") ? "bg-green-100 text-green-700" :
                      work.difficulty.includes("高") ? "bg-red-100 text-red-700" :
                      "bg-yellow-100 text-yellow-700"
                    }`}>
                      {work.difficulty}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="text-center mt-6">
          <Link href="/cost/total/" className="text-primary font-bold hover:underline">
            詳しい費用相場を見る →
          </Link>
        </div>
      </section>

      {/* Scene Links */}
      <section className="bg-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">
            シーン別で探す
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { href: "/scene/new-house/", label: "新築外構", desc: "建物に合った外構をゼロから計画", icon: "🏠" },
              { href: "/scene/reform/", label: "庭リフォーム", desc: "既存の庭を一新したい", icon: "🔨" },
              { href: "/scene/barrier-free/", label: "バリアフリー", desc: "安全で使いやすい庭づくり", icon: "♿" },
              { href: "/scene/diy/", label: "DIY×プロ", desc: "費用を抑えて理想の庭へ", icon: "🛠️" },
              { href: "/scene/narrow/", label: "狭小・変形地", desc: "限られたスペースを最大活用", icon: "📐" },
              { href: "/cost/budget/", label: "予算別プラン", desc: "予算に合わせたプランを提案", icon: "💰" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-4 bg-bg rounded-xl p-4 hover:bg-emerald-100 transition-colors border border-transparent hover:border-primary"
              >
                <span className="text-3xl">{item.icon}</span>
                <div>
                  <div className="font-bold text-gray-800">{item.label}</div>
                  <div className="text-sm text-gray-500">{item.desc}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">よくある質問</h2>
        <div className="space-y-4">
          {faqData.map((item, i) => (
            <details key={i} className="bg-white rounded-xl border border-gray-200 shadow-sm group">
              <summary className="flex items-center justify-between px-6 py-4 cursor-pointer font-medium text-gray-800 list-none">
                <span className="flex items-start gap-2">
                  <span className="text-primary font-bold text-lg">Q</span>
                  <span>{item.q}</span>
                </span>
                <span className="text-primary text-xl ml-4 shrink-0">▼</span>
              </summary>
              <div className="px-6 pb-4 text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                <span className="text-secondary font-bold text-lg mr-2">A</span>
                {item.a}
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* CTA Bottom */}
      <section className="bg-gradient-to-r from-accent to-blue-700 text-white py-12 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-3">まずは無料見積もりから</h2>
          <p className="text-blue-100 mb-6">最大5社から一括見積もり。費用を比較して最安値を見つけましょう。</p>
          <Link
            href="/ranking/estimate/"
            className="bg-white text-accent px-10 py-4 rounded-full font-bold text-lg hover:bg-blue-50 transition-colors shadow-lg inline-block"
          >
            <span className="text-xs bg-accent text-white px-1.5 py-0.5 rounded font-bold mr-2">PR</span>
            無料見積もりを依頼する
          </Link>
        </div>
      </section>
    </div>
  );
}
