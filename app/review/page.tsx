import type { Metadata } from "next";
import Link from "next/link";
import reviewsData from "@/data/reviews.json";
import Breadcrumb from "@/components/Breadcrumb";

export const metadata: Metadata = {
  title: "外構・庭リフォーム業者の口コミ・評判まとめ｜実際のGoogleレビューで検証",
  description: "外構・庭・エクステリアリフォームの比較サービス・業者を、実際のGoogle口コミと運営会社の公開情報で中立的に検証します。",
  alternates: { canonical: "https://garden-reform-navi.com/review/" },
};

export default function ReviewIndex() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <Breadcrumb items={[{ label: "口コミ・評判" }]} />
      <h1 className="text-2xl sm:text-3xl font-bold text-text-primary mt-2 mb-4">外構・庭リフォーム業者の口コミ・評判まとめ</h1>
      <p className="text-[15px] leading-8 text-text-secondary mb-8">
        実際にGoogleマップへ投稿された口コミと、各社の公開情報をもとに、外構・庭・エクステリアリフォームの比較サービス・業者を中立的に検証します。掲載しているのはすべて実在のレビューまたは公式の利用者の声です。
      </p>
      <div className="space-y-4">
        {reviewsData.map((r) => (
          <Link key={r.slug} href={`/review/${r.slug}/`}
            className="block rounded-2xl border border-border bg-surface p-5 hover:border-primary transition-colors">
            <div className="flex items-center justify-between gap-3 mb-2">
              <h2 className="font-bold text-text-primary">{r.companyName}</h2>
              {(r as any).ratingBlock ? (
                <span className="text-sm text-text-muted whitespace-nowrap">
                  <span className="text-warning">★</span> {(r as any).ratingBlock.rating}（{(r as any).ratingBlock.reviewCount}件）
                </span>
              ) : (
                <span className="text-xs text-text-muted whitespace-nowrap">公式の声</span>
              )}
            </div>
            <p className="text-sm text-text-secondary line-clamp-2 leading-7">{r.summary}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
