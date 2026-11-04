// 庭リフォームナビ TOP 用のロゴマーク・工事アイコン（すべて自作の SVG。48×48 のグリッド）。
// アイコンは太線（stroke 3）＋一部を塗り（solid）。色は currentColor の単色。
// ロゴだけ2色（スレート＝板、シーダー＝柱と床）を使う。

export type Shape = {
  d: string; // path の d
  solid?: boolean; // 塗りつぶす部分
  thin?: boolean; // 細めに描く補助線
};

export type IconDef = { key: string; label: string; shapes: Shape[] };

export const WORK_ICONS: IconDef[] = [
  {
    key: "wood-deck",
    label: "ウッドデッキ",
    shapes: [
      { d: "M6 5V42" },
      { d: "M6 20H38V26H6Z", solid: true },
      { d: "M13 26V42M30 26V42", thin: true },
      { d: "M38 32H44V36H38Z", solid: true },
      { d: "M14 23H30", thin: true },
      { d: "M4 42H44" },
    ],
  },
  {
    key: "carport",
    label: "カーポート",
    shapes: [
      { d: "M4 10L44 7V12L4 15Z", solid: true },
      { d: "M8 15V42M40 12V42" },
      { d: "M14 36V31.5L17 26H31L34 31.5V36Z", solid: true },
      { d: "M16 36V39.5M32 36V39.5", thin: true },
      { d: "M4 42H44", thin: true },
    ],
  },
  {
    key: "fence",
    label: "フェンス・塀",
    shapes: [
      { d: "M7 12L10 9L13 12V40H7Z", solid: true },
      { d: "M17 12L20 9L23 12V40H17Z", solid: true },
      { d: "M27 12L30 9L33 12V40H27Z", solid: true },
      { d: "M37 12L40 9L43 12V40H37Z", solid: true },
      { d: "M4 19H46M4 33H46", thin: true },
      { d: "M3 43H45" },
    ],
  },
  {
    key: "concrete",
    label: "コンクリート舗装",
    shapes: [
      { d: "M4 30L14 20H44L34 30Z", solid: true },
      { d: "M4 30V36H34L44 26V20", thin: true },
      { d: "M34 30V36" , thin: true },
      { d: "M26 16L36 6M30 12L36 14L40 10" },
    ],
  },
  {
    key: "garden-room",
    label: "ガーデンルーム・テラス",
    shapes: [
      { d: "M6 6V42" },
      { d: "M6 12L42 17V21L6 16Z", solid: true },
      { d: "M42 21V42M18 20V42M30 22V42", thin: true },
      { d: "M6 42H42" },
      { d: "M6 31H42", thin: true },
    ],
  },
  {
    key: "gate",
    label: "門扉・門柱",
    shapes: [
      { d: "M5 12H13V42H5Z", solid: true },
      { d: "M35 12H43V42H35Z", solid: true },
      { d: "M13 18H24V40H13M35 18H24" },
      { d: "M35 40H24V18" },
      { d: "M18.5 18V40M29.5 18V40", thin: true },
    ],
  },
  {
    key: "garden-design",
    label: "ガーデンデザイン・植栽",
    shapes: [
      { d: "M24 30V15" },
      { d: "M24 20C24 12 30 7 38 7C38 15 32 20 24 20Z", solid: true },
      { d: "M24 25C24 18.5 19 14 12 14C12 20.5 17 25 24 25Z", solid: true },
      { d: "M6 37C10 33.5 18 33.5 22 37M26 37C30 33.5 38 33.5 42 37", thin: true },
      { d: "M4 42H44" },
    ],
  },
  {
    key: "lighting",
    label: "ガーデンライティング",
    shapes: [
      { d: "M17 10H31L28 20H20Z", solid: true },
      { d: "M24 20V42M17 42H31" },
      { d: "M10 22L6 25M38 22L42 25M12 29L8 31M36 29L40 31", thin: true },
    ],
  },
  {
    key: "storage",
    label: "物置",
    shapes: [
      { d: "M4 18L24 7L44 18Z", solid: true },
      { d: "M8 18V42H40V18" },
      { d: "M14 24H34V42M14 24V42M24 24V42", thin: true },
      { d: "M21 33V35M27 33V35" },
    ],
  },
  {
    key: "delivery-box",
    label: "宅配ボックス",
    shapes: [
      { d: "M9 7H39V42H9Z" },
      { d: "M9 7H39V17H9Z", solid: true },
      { d: "M16 24H32", thin: true },
      { d: "M27 30H32V36H27Z", solid: true },
    ],
  },
  {
    key: "terrace-roof",
    label: "テラス屋根",
    shapes: [
      { d: "M6 6V42" },
      { d: "M6 13L43 19V23L6 17Z", solid: true },
      { d: "M38 22V42" },
      { d: "M14 30H30V42M14 30V42", thin: true },
      { d: "M4 42H44", thin: true },
    ],
  },
];

/** アイコン1つ分の SVG 内側（<svg> 要素の中身）を返す */
export function iconInner(def: IconDef): string {
  return def.shapes
    .map((s) => {
      const fill = s.solid ? "currentColor" : "none";
      const w = s.thin ? 2.2 : 3;
      return `<path d="${s.d}" fill="${fill}" stroke="currentColor" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`;
    })
    .join("");
}

// ロゴマーク「板張りの塀とデッキ」：2本の柱に横板3枚を渡し、足もとにデッキの床を敷いた形。
// a = 横板（スレート）、b = 柱と床（シーダー）
export const LOGO_SLATE = "#2C4148";
export const LOGO_CEDAR = "#A4582B";

export function logoSvg(a: string, b: string): string {
  return (
    `<rect x="7" y="5" width="6" height="33" rx="1" fill="${b}"/>` +
    `<rect x="35" y="5" width="6" height="33" rx="1" fill="${b}"/>` +
    `<rect x="4" y="9" width="40" height="6" rx="1" fill="${a}"/>` +
    `<rect x="4" y="18" width="40" height="6" rx="1" fill="${a}"/>` +
    `<rect x="4" y="27" width="40" height="6" rx="1" fill="${a}"/>` +
    `<rect x="2" y="39" width="44" height="5" rx="1" fill="${b}"/>`
  );
}
