@AGENTS.md

# 庭リフォームナビ（garden-reform-navi.com）運用メモ

- source = webmaster0818/niwa-reform-navi / deploy = webmaster0818/niwa-reform-navi-deploy（静的export。out/ を rsync --exclude .git --exclude CNAME で deploy へ）
- サイト名・ドメイン（garden-reform-navi）とリポ名（niwa-reform-navi）が違う点に注意
- 法令ガイド /rule/ は data/rules.json 駆動。各エントリに group（分野）と updated（最終更新日）を持つ。refs は任意（e-Gov以外の公的出典リンク）
- 条文は e-Gov 法令API v2（laws.e-gov.go.jp/api/2/law_data/{law_id}?elm=MainProvision-Article_N）で取得し、引用は原文と機械照合してから掲載する
- 自治体ごとに違う手数料・期間・補助金額は書かない。個別の適法性判定はしない

## 作業ログ
- 2026-09-25 エリア別比較 3本 → 8本追加（11地方）。companies.json 公式URL誤り5件修正
- 2026-09-30 /rule/ 法令・手続きガイド 7ページ新設（55→62 URL）。llms.txt の dev URL 修正
- 2026-10-12 /rule/ に8本追加（62→70 URL）: rinchi-shiyou（民法209）/ kyokai-hei（民法223-229）/ usui-haisui（民法214・216・218・220・221）/ kussaku（民法237・238）/ setback（建基法2条1号・42条2項3項・44条）/ kensetsugyo-kyoka（建設業法3・19条、令1条の2）/ cooling-off（特商法9条・26条6項）/ denki-kouji（電気工事士法2・3条、令1条、規則2条、電気事業法38条）。一覧を4分野にグルーピング、ページ下部の関連リンクを同分野優先に変更、フッターの法令リンクを横並びに
- 2026-10-17 /rule/ に11本追加（70→81 URL）: yoheki（令138・142、盛土規制法12・令3）/ bouka-chiiki（建基法6条2項・61・62、令136の2・136の2の2）/ chiku-keikaku（都計法58の2、令38の4・7の6、景観法16）/ hikkai-tokutei（不登法123・131・143・148、刑法262の2）/ douro-shiyou（道交法2・77、道路法32、令7）/ keiyaku-futekigo（民法559・562-564・632・636・637）/ shohisha-keiyaku（消費者契約法2・4・7・9・10）/ mansion-senyoniwa（区分所有法2・6・18・30＋国交省標準管理規約R7）/ chintai-niwa（民法594・599・606・608・616・621・622）/ tokutei-kensetsu（騒音・振動規制法14、各令2・別表第二）/ kensetsu-recycle（建リ法9・10・12、令1・2、廃掃法21の3）。分野に「マンション・賃貸」「工事中の届出・近隣」追加。/work/ に relatedWorks 逆引きの法令ガイド枠
