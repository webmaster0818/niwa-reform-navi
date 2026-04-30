import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="bg-secondary text-white mt-16">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4"> 庭リフォームナビ</h3>
            <p className="text-sm text-amber-100 leading-relaxed">
              庭・外構リフォームの費用相場、業者比較、見積もりに関する情報を発信する専門メディアです。
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-3 text-amber-200">業者ランキング</h4>
            <ul className="space-y-2 text-sm text-amber-100">
              <li><Link href="/ranking/" className="hover:text-white transition-colors">総合ランキング</Link></li>
              <li><Link href="/ranking/cheap/" className="hover:text-white transition-colors">安い業者ランキング</Link></li>
              <li><Link href="/ranking/estimate/" className="hover:text-white transition-colors">見積もりおすすめ</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-3 text-amber-200">工事の種類</h4>
            <ul className="space-y-2 text-sm text-amber-100">
              <li><Link href="/work/wood-deck/" className="hover:text-white transition-colors">ウッドデッキ</Link></li>
              <li><Link href="/work/carport/" className="hover:text-white transition-colors">カーポート</Link></li>
              <li><Link href="/work/fence/" className="hover:text-white transition-colors">フェンス・塀</Link></li>
              <li><Link href="/work/concrete/" className="hover:text-white transition-colors">コンクリート舗装</Link></li>
              <li><Link href="/work/garden-room/" className="hover:text-white transition-colors">ガーデンルーム</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-3 text-amber-200">費用・シーン</h4>
            <ul className="space-y-2 text-sm text-amber-100">
              <li><Link href="/cost/total/" className="hover:text-white transition-colors">外構費用の総まとめ</Link></li>
              <li><Link href="/cost/budget/" className="hover:text-white transition-colors">予算別プラン</Link></li>
              <li><Link href="/scene/new-house/" className="hover:text-white transition-colors">新築外構</Link></li>
              <li><Link href="/scene/reform/" className="hover:text-white transition-colors">庭リフォーム</Link></li>
              <li><Link href="/scene/barrier-free/" className="hover:text-white transition-colors">バリアフリー</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-amber-700 mt-8 pt-6 text-xs text-amber-200">
          <p className="text-center mb-3">※当サイトは情報提供を目的としています。各サービスの詳細は公式サイトをご確認ください。</p>
          <div className="flex flex-wrap justify-center gap-4 mb-3">
            <Link href="/terms/" className="hover:text-white transition-colors">利用規約</Link>
            <Link href="/privacy/" className="hover:text-white transition-colors">プライバシーポリシー</Link>
            <Link href="/content-policy/" className="hover:text-white transition-colors">記事の制作ポリシー</Link>
          </div>
          <p className="text-center"> 2025 庭リフォームナビ. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
