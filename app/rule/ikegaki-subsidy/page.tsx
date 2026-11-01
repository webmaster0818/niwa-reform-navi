import type { Metadata } from "next";
import SubsidyHubPage from "@/components/SubsidyHubPage";
import { ikegaki } from "@/lib/subsidies";
import { OG_IMAGE } from "@/lib/og";

const PATH = "/rule/ikegaki-subsidy/";
const url = `https://garden-reform-navi.com${PATH}`;

export const metadata: Metadata = {
  title: ikegaki.metaTitle,
  description: ikegaki.metaDescription,
  alternates: { canonical: url },
  openGraph: { title: ikegaki.metaTitle, description: ikegaki.metaDescription, url, type: "article", images: [OG_IMAGE] },
};

export default function IkegakiSubsidyPage() {
  return (
    <SubsidyHubPage
      hub={ikegaki}
      path={PATH}
      name="生垣・緑化の助成制度一覧"
      related={[
        { href: "/rule/block-wall-subsidy/", label: "ブロック塀撤去の補助金一覧", note: "政令指定都市20市・東京8区の制度と上限額" },
        { href: "/rule/ryokka-chiiki/", label: "緑化地域と緑化率", note: "敷地の緑化が義務になる地域の決まり" },
        { href: "/rule/block-wall/", label: "ブロック塀の基準（建築基準法施行令第62条の8）", note: "既存の塀を残す場合に確認する条文" },
      ]}
    />
  );
}
