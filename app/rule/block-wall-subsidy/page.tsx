import type { Metadata } from "next";
import SubsidyHubPage from "@/components/SubsidyHubPage";
import { blockWall } from "@/lib/subsidies";
import { OG_IMAGE } from "@/lib/og";

const PATH = "/rule/block-wall-subsidy/";
const url = `https://garden-reform-navi.com${PATH}`;

export const metadata: Metadata = {
  title: blockWall.metaTitle,
  description: blockWall.metaDescription,
  alternates: { canonical: url },
  openGraph: { title: blockWall.metaTitle, description: blockWall.metaDescription, url, type: "article", images: [OG_IMAGE] },
};

export default function BlockWallSubsidyPage() {
  return (
    <SubsidyHubPage
      hub={blockWall}
      path={PATH}
      name="ブロック塀撤去の補助金一覧"
      childPath={PATH}
      related={[
        { href: "/rule/block-wall/", label: "ブロック塀の基準（建築基準法施行令第62条の8）", note: "高さ2.2m・厚さ・控壁・基礎の7項目を条文で確認" },
        { href: "/rule/ikegaki-subsidy/", label: "生垣・緑化の助成制度一覧", note: "撤去した塀の代わりに生垣をつくる場合の助成" },
        { href: "/work/fence/", label: "フェンス工事の解説", note: "撤去後にフェンスを設置する場合の基本" },
      ]}
    />
  );
}
