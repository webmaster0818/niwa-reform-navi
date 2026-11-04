import { WORK_ICONS, iconInner } from "./marks";

/** 工事の種類別アイコン（自作 SVG・太線＋一部塗り・currentColor の単色） */
export default function WorkIcon({ name, size = 96, className = "" }: { name: string; size?: number; className?: string }) {
  const def = WORK_ICONS.find((d) => d.key === name);
  if (!def) return null;
  return <svg width={size} height={size} viewBox="0 0 48 48" className={className} aria-hidden="true" dangerouslySetInnerHTML={{ __html: iconInner(def) }} />;
}
