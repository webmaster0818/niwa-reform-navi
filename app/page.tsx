import Link from "next/link";
import Image from "next/image";
import companies from "@/data/companies.json";
import works from "@/data/works.json";

const workIcons: Record<string, string> = {
  "wood-deck": "",
  "carport": "",
  "fence": "",
  "concrete": "⬜",
  "garden-room": "",
  "gate": "",
  "garden-design": "",
  "lighting": "",
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
      <section className="relative overflow-hidden min-h-[520px] md:min-h-[620px] flex items-center">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="/images/hero-a.png"
            alt="モダンな庭とウッドデッキ"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          {/* Emerald green gradient overlay */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, rgba(5,150,105,0.82) 0%, rgba(4,120,87,0.70) 50%, rgba(5,150,105,0.45) 100%)",
            }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 w-full max-w-4xl mx-auto px-4 py-20 text-center text-white">
          <div className="inline-block bg-white/20 backdrop-blur-sm border border-white/30 text-white text-xs font-bold px-4 py-1.5 rounded-full mb-6 tracking-widest uppercase">
            外構・庭リフォーム専門ガイド
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-5 leading-tight tracking-tight drop-shadow-lg">
            理想の庭が見つかる。
          </h1>
          <p className="text-lg md:text-xl mb-10 text-emerald-50 max-w-2xl mx-auto leading-relaxed drop-shadow">
            外構・庭リフォームの費用相場・業者比較・見積もりならお任せ
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/ranking/estimate/"
              className="group bg-white text-primary px-8 py-4 rounded-full font-bold text-lg hover:bg-emerald-50 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-0.5 flex items-center justify-center gap-2"
            >
              <span className="text-xs bg-accent text-white px-1.5 py-0.5 rounded font-bold">PR</span>
              無料で見積もりを比較する
            </Link>
            <Link
              href="/ranking/"
              className="bg-white/15 backdrop-blur-sm border-2 border-white/60 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/25 transition-all shadow-lg hover:-translate-y-0.5"
            >
              業者ランキングを見る
            </Link>
          </div>
          {/* Trust badges */}
          <div className="mt-10 flex flex-wrap justify-center gap-6 text-sm text-emerald-100">
            <span className="flex items-center gap-1.5"> 完全無料</span>
            <span className="flex items-center gap-1.5"> 最大5社比較</span>
            <span className="flex items-center gap-1.5"> しつこい営業なし</span>
          </div>
        </div>
      </section>

      {/* Work Type Navigation */}
      <section className="max-w-6xl mx-auto px-4 py-14">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
            工事の種類から探す
          </h2>
          <p className="text-sm text-gray-500">気になる工事を選んで費用相場・施工例をチェック</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {works.map((work) => (
            <Link
              key={work.slug}
              href={`/work/${work.slug}/`}
              className="group bg-white rounded-2xl p-5 text-center shadow-sm hover:shadow-lg border border-gray-100 hover:border-primary transition-all hover:-translate-y-1"
            >
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform inline-block">
                {workIcons[work.slug] || ""}
              </div>
              <div className="font-bold text-gray-800 group-hover:text-primary text-sm mb-1">
                {work.title}
              </div>
              <div className="text-xs text-primary font-semibold bg-emerald-50 rounded-full px-2 py-0.5 inline-block mt-1">
                {work.costRange}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* TOP3 Ranking */}
      <section className="bg-white py-14 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
              おすすめ外構業者 TOP3
            </h2>
            <p className="text-sm text-gray-500">編集部が厳選した信頼できる業者を紹介します</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {top3.map((company, i) => (
              <div
                key={company.slug}
                className={`relative bg-white rounded-2xl p-6 border-2 transition-all hover:shadow-xl hover:-translate-y-1 ${
                  i === 0
                    ? "border-yellow-400 shadow-md shadow-yellow-100"
                    : i === 1
                    ? "border-gray-300 shadow-sm"
                    : "border-amber-300 shadow-sm"
                }`}
              >
                {/* Rank badge */}
                <div className="absolute -top-4 left-5">
                  <span
                    className={`text-white text-sm font-black px-4 py-1.5 rounded-full shadow-md ${
                      i === 0
                        ? "bg-gradient-to-r from-yellow-400 to-yellow-500"
                        : i === 1
                        ? "bg-gradient-to-r from-gray-400 to-gray-500"
                        : "bg-gradient-to-r from-amber-500 to-amber-600"
                    }`}
                  >
                    {i === 0 ? " 1位" : i === 1 ? " 2位" : " 3位"}
                  </span>
                </div>
                {i === 0 && (
                  <div className="absolute -top-4 right-5">
                    <span className="bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
                      人気No.1
                    </span>
                  </div>
                )}
                <h3 className="font-black text-lg mt-3 mb-1 text-gray-900">{company.name}</h3>
                <p className="text-sm text-primary font-semibold mb-4">{company.tagline}</p>
                <ul className="text-sm text-gray-600 space-y-2 mb-5">
                  {company.pros.slice(0, 2).map((pro, j) => (
                    <li key={j} className="flex items-start gap-2">
                      <span className="text-primary font-bold mt-0.5 shrink-0"></span>
                      <span>{pro}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/company/${company.slug}/`}
                  className={`block text-center py-3 rounded-xl text-sm font-bold transition-all hover:-translate-y-0.5 ${
                    i === 0
                      ? "bg-accent text-white hover:bg-blue-700 shadow-md shadow-blue-200"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  詳細を見る →
                </Link>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/ranking/"
              className="inline-flex items-center gap-2 text-primary font-bold hover:underline text-sm"
            >
              全10社のランキングを見る →
            </Link>
          </div>
        </div>
      </section>

      {/* Cost Comparison */}
      <section className="max-w-6xl mx-auto px-4 py-14">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
            工事別 費用相場早見表
          </h2>
          <p className="text-sm text-gray-500">工事の種類・規模別の目安費用と工期をまとめました</p>
        </div>
        <div className="overflow-x-auto rounded-2xl shadow-sm border border-gray-100">
          <table className="w-full bg-white">
            <thead>
              <tr className="bg-primary text-white">
                <th className="text-left px-5 py-4 rounded-tl-2xl font-semibold">工事の種類</th>
                <th className="text-left px-5 py-4 font-semibold">費用相場</th>
                <th className="text-left px-5 py-4 font-semibold">工期</th>
                <th className="text-left px-5 py-4 rounded-tr-2xl font-semibold">難易度</th>
              </tr>
            </thead>
            <tbody>
              {works.map((work, i) => (
                <tr
                  key={work.slug}
                  className={`border-b border-gray-50 hover:bg-emerald-50/50 transition-colors ${
                    i % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                  }`}
                >
                  <td className="px-5 py-3.5">
                    <Link
                      href={`/work/${work.slug}/`}
                      className="font-medium text-primary hover:underline flex items-center gap-2"
                    >
                      <span>{workIcons[work.slug]}</span>
                      <span>{work.title}</span>
                    </Link>
                  </td>
                  <td className="px-5 py-3.5 text-sm text-gray-700 font-medium">{work.costRange}</td>
                  <td className="px-5 py-3.5 text-sm text-gray-600">{work.duration}</td>
                  <td className="px-5 py-3.5 text-sm">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        work.difficulty.includes("低")
                          ? "bg-green-100 text-green-700"
                          : work.difficulty.includes("高")
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {work.difficulty}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="text-center mt-6">
          <Link href="/cost/total/" className="text-primary font-bold hover:underline text-sm">
            詳しい費用相場を見る →
          </Link>
        </div>
      </section>

      {/* Scene Links */}
      <section className="bg-white py-14 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
              シーン別で探す
            </h2>
            <p className="text-sm text-gray-500">あなたの状況・目的に合ったリフォームプランを探す</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { href: "/scene/new-house/", label: "新築外構", desc: "建物に合った外構をゼロから計画", icon: "", color: "from-emerald-50 to-emerald-100" },
              { href: "/scene/reform/", label: "庭リフォーム", desc: "既存の庭を一新したい", icon: "", color: "from-amber-50 to-amber-100" },
              { href: "/scene/barrier-free/", label: "バリアフリー", desc: "安全で使いやすい庭づくり", icon: "", color: "from-blue-50 to-blue-100" },
              { href: "/scene/diy/", label: "DIY×プロ", desc: "費用を抑えて理想の庭へ", icon: "", color: "from-purple-50 to-purple-100" },
              { href: "/scene/narrow/", label: "狭小・変形地", desc: "限られたスペースを最大活用", icon: "", color: "from-rose-50 to-rose-100" },
              { href: "/cost/budget/", label: "予算別プラン", desc: "予算に合わせたプランを提案", icon: "", color: "from-yellow-50 to-yellow-100" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`group flex items-center gap-4 bg-gradient-to-br ${item.color} rounded-2xl p-5 hover:shadow-md transition-all hover:-translate-y-0.5 border border-white`}
              >
                <div className="text-4xl group-hover:scale-110 transition-transform shrink-0">
                  {item.icon}
                </div>
                <div>
                  <div className="font-bold text-gray-800 group-hover:text-primary transition-colors mb-0.5">
                    {item.label}
                  </div>
                  <div className="text-xs text-gray-500 leading-relaxed">{item.desc}</div>
                </div>
                <div className="ml-auto text-gray-400 group-hover:text-primary transition-colors shrink-0">
                  →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-4 py-14">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">よくある質問</h2>
          <p className="text-sm text-gray-500">外構・庭リフォームに関するよくあるご質問をまとめました</p>
        </div>
        <div className="space-y-3">
          {faqData.map((item, i) => (
            <details key={i} className="group bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <summary className="flex items-center justify-between px-6 py-5 cursor-pointer font-medium text-gray-800 list-none hover:bg-gray-50 transition-colors">
                <span className="flex items-start gap-3">
                  <span className="text-white bg-primary font-bold text-xs w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    Q
                  </span>
                  <span className="text-sm md:text-base">{item.q}</span>
                </span>
                <span className="text-primary text-sm ml-4 shrink-0 transition-transform group-open:rotate-180">
                  ▼
                </span>
              </summary>
              <div className="px-6 pb-5 pt-4 text-sm text-gray-600 leading-relaxed border-t border-gray-100 bg-emerald-50/30">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-secondary text-white font-bold text-xs mr-3 shrink-0 float-left mt-0.5">
                  A
                </span>
                {item.a}
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* CTA Bottom */}
      <section className="relative overflow-hidden bg-gradient-to-r from-accent to-blue-700 text-white py-16 px-4">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-10 -left-10 w-64 h-64 bg-white rounded-full" />
          <div className="absolute -bottom-20 -right-10 w-80 h-80 bg-white rounded-full" />
        </div>
        <div className="relative max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-black mb-3">まずは無料見積もりから</h2>
          <p className="text-blue-100 mb-8 text-base leading-relaxed">
            最大5社から一括見積もり。費用を比較して最安値を見つけましょう。
          </p>
          <Link
            href="/ranking/estimate/"
            className="inline-flex items-center gap-2 bg-white text-accent px-10 py-4 rounded-full font-bold text-lg hover:bg-blue-50 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-0.5"
          >
            <span className="text-xs bg-accent text-white px-1.5 py-0.5 rounded font-bold">PR</span>
            無料見積もりを依頼する
          </Link>
          <div className="mt-6 flex flex-wrap justify-center gap-6 text-sm text-blue-200">
            <span> 完全無料・登録不要</span>
            <span> 最大5社比較</span>
            <span> 断るのも自由</span>
          </div>
        </div>
      </section>
    </div>
  );
}
