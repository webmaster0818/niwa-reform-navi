import Link from "next/link";
import { regionGroups, tokyoWards, type CityLink } from "@/data/areaRegions";

const Chevron = () => (
  <svg className="gr-chev h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const Arrow = ({ className = "h-3.5 w-3.5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
    <polyline points="9 6 15 12 9 18" />
  </svg>
);

/** 市区ごとの補助金・助成ページ。リンクが2本ある市区は2行に分ける */
function CityTiles({ items }: { items: CityLink[] }) {
  return (
    <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((c) => (
        <li key={c.slug} className="border border-[color:var(--gr-border)] bg-white">
          <p className="border-b border-[color:var(--gr-border)] px-3.5 py-2 text-[14px] font-bold">{c.name}</p>
          <ul>
            {c.links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="flex min-h-[44px] items-center justify-between gap-2 px-3.5 text-[13px] font-bold text-[color:var(--gr-slate)] transition-colors hover:bg-[color:var(--gr-wash)]"
                >
                  {l.label}
                  <span className="text-[color:var(--gr-cedar)]"><Arrow /></span>
                </Link>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}

const summaryCls = "flex min-h-[60px] items-center justify-between gap-3 px-4 md:px-5";

/** TOP「エリアから探す」。東京都は最上部の別枠、地方は折りたたみ（JS 不要の details）。 */
export default function AreaFinder() {
  return (
    <div>
      <p className="mb-5 text-[14px] leading-relaxed text-[color:var(--gr-muted)]">
        地方ごとの外構業者の比較ページ（{regionGroups.length}地方）と、市区のブロック塀撤去・生垣緑化の補助金ページがあります。地方名を押すと一覧が開きます。
      </p>

      <details className="gr-acc group mb-4 border-2 border-[color:var(--gr-slate)] bg-white" open data-reveal="0">
        <summary className={`${summaryCls} bg-[color:var(--gr-slate)] text-white`}>
          <span className="flex flex-wrap items-baseline gap-x-3">
            <span className="text-[18px] font-bold tracking-[0.06em]">東京都</span>
            <span className="text-[12px] text-white/80">23区の補助金・助成ページ</span>
          </span>
          <span className="flex items-center gap-2 text-[12px] font-bold text-white/85">
            {tokyoWards.length}区
            <Chevron />
          </span>
        </summary>
        <div className="grid gap-5 p-4 md:p-6">
          <Link href="/area/kanto/" className="gr-btn w-full sm:w-fit">
            東京都を含む関東の比較を見る
            <Arrow className="h-4 w-4" />
          </Link>
          <CityTiles items={tokyoWards} />
        </div>
      </details>

      <div className="grid gap-3">
        {regionGroups.map((r, i) => (
          <details key={r.slug} className="gr-acc group border border-[color:var(--gr-border-strong)] bg-white" data-reveal={String((i % 4) + 1)}>
            <summary className={`${summaryCls} bg-white group-open:border-b group-open:border-[color:var(--gr-border)]`}>
              <span className="flex flex-wrap items-baseline gap-x-3">
                <span className="text-[16px] font-bold tracking-[0.04em] text-[color:var(--gr-slate)]">{r.name}</span>
                <span className="hidden text-[12px] text-[color:var(--gr-muted)] sm:inline">{r.prefectures.join("・")}</span>
              </span>
              <span className="flex shrink-0 items-center gap-2 text-[12px] font-bold text-[color:var(--gr-muted)]">
                {r.cities.length > 0 ? `${r.cities.length}市` : ""}
                <span className="text-[color:var(--gr-cedar)]"><Chevron /></span>
              </span>
            </summary>
            <div className="grid gap-4 bg-[color:var(--gr-paper)] p-4 md:p-6">
              <p className="text-[13px] text-[color:var(--gr-muted)] sm:hidden">{r.prefectures.join("・")}</p>
              <Link href={r.href} className="gr-btn w-full sm:w-fit">
                {r.name}の比較を見る
                <Arrow className="h-4 w-4" />
              </Link>
              {r.cities.length > 0 ? <CityTiles items={r.cities} /> : null}
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}
