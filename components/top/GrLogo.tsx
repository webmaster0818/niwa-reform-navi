import { logoSvg, LOGO_SLATE, LOGO_CEDAR } from "./marks";

// ロゴマーク「板張りの塀とデッキ」（2026-11-04 刷新）。ファビコン（app/icon.svg・favicon.ico・apple-icon.png）も同じ形。
export function GrMark({ size = 36, tone = "dark" }: { size?: number; tone?: "dark" | "light" }) {
  const a = tone === "light" ? "#FFFFFF" : LOGO_SLATE;
  const b = tone === "light" ? "#E8BE96" : LOGO_CEDAR;
  return <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true" dangerouslySetInnerHTML={{ __html: logoSvg(a, b) }} />;
}

/** ヘッダー・フッター共通のロゴ。表示する文字は従来どおり「庭リフォームナビ」だけ */
export default function GrLogo({ tone = "dark", size = 34 }: { tone?: "dark" | "light"; size?: number }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <GrMark size={size} tone={tone} />
      <span className={`text-[20px] font-bold leading-none tracking-[0.06em] md:text-[22px] ${tone === "light" ? "text-white" : "text-[#2C4148]"}`}>庭リフォームナビ</span>
    </span>
  );
}
