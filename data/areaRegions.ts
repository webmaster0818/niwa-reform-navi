// TOP「エリアから探す」用の一覧。すべて当サイトに実在するページから組み立てる（手書きの一覧を持たない）。
// - 地方別の比較ページ: data/areas.json（11地方）
// - 市区の補助金・助成ページ: data/subsidies.json の page を持つ項目（ブロック塀撤去・生垣緑化）
// 東京都は別枠で、23区の補助金・助成ページを区ごとに並べる。
import areas from "@/data/areas.json";
import { blockWallPages, ikegakiPages } from "@/lib/subsidies";

export type CityLink = { slug: string; name: string; pref: string; links: { href: string; label: string }[] };
export type RegionGroup = {
  slug: string;
  name: string;
  prefectures: string[];
  href: string;
  cities: CityLink[];
};

function collect(): CityLink[] {
  const map = new Map<string, CityLink>();
  const add = (s: { slug: string; name: string; pref: string }, href: string, label: string) => {
    const cur = map.get(s.slug) ?? { slug: s.slug, name: s.name, pref: s.pref, links: [] };
    cur.links.push({ href, label });
    map.set(s.slug, cur);
  };
  blockWallPages.forEach((s) => add(s, `/rule/block-wall-subsidy/${s.slug}/`, "ブロック塀撤去の補助金"));
  ikegakiPages.forEach((s) => add(s, `/rule/ikegaki-subsidy/${s.slug}/`, "生垣・緑化の助成"));
  return Array.from(map.values());
}

const allCities = collect();

export const tokyoWards: CityLink[] = allCities.filter((c) => c.pref === "東京都");

export const regionGroups: RegionGroup[] = areas.map((a) => ({
  slug: a.slug,
  name: a.name,
  prefectures: a.prefectures,
  href: `/area/${a.slug}/`,
  // 東京都の区は上の別枠に出すので、地方の中では東京都以外の市だけを並べる
  cities: allCities
    .filter((c) => c.pref !== "東京都" && a.prefectures.includes(c.pref))
    .sort((x, y) => a.prefectures.indexOf(x.pref) - a.prefectures.indexOf(y.pref)),
}));

// どの地方にも入らない市区があればビルドを止める（一覧の取りこぼし防止）
const placed = tokyoWards.length + regionGroups.reduce((n, r) => n + r.cities.length, 0);
if (placed !== allCities.length) {
  throw new Error(`areaRegions: 市区ページ ${allCities.length} 件のうち ${placed} 件しか地方に割り当てられていません`);
}

export const subsidyCityCount = allCities.length;
export const subsidyPageCount = blockWallPages.length + ikegakiPages.length;
