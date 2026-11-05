@AGENTS.md

# 庭リフォームナビ（garden-reform-navi.com）運用メモ

- source = webmaster0818/niwa-reform-navi / deploy = webmaster0818/niwa-reform-navi-deploy（静的export。out/ を rsync --exclude .git --exclude CNAME で deploy へ）
- サイト名・ドメイン（garden-reform-navi）とリポ名（niwa-reform-navi）が違う点に注意
- 法令ガイド /rule/ は data/rules.json 駆動。各エントリに group（分野）と updated（最終更新日）を持つ。refs は任意（e-Gov以外の公的出典リンク）
- 条文は e-Gov 法令API v2（laws.e-gov.go.jp/api/2/law_data/{law_id}?elm=MainProvision-Article_N）で取得し、引用は原文と機械照合してから掲載する
- 自治体ごとに違う手数料・期間・補助金額は書かない。個別の適法性判定はしない
  - 2026-11-01 okina 承認で自治体別の助成ページを作成可（金額は公式で確認・年度と確認日を明記）。data/subsidies.json ＋ /rule/block-wall-subsidy/（自治体別は [city]）・/rule/ikegaki-subsidy/。受付終了の制度は「受付終了」と書く

## 作業ログ
- 2026-09-25 エリア別比較 3本 → 8本追加（11地方）。companies.json 公式URL誤り5件修正
- 2026-09-30 /rule/ 法令・手続きガイド 7ページ新設（55→62 URL）。llms.txt の dev URL 修正
- 2026-10-12 /rule/ に8本追加（62→70 URL）: rinchi-shiyou（民法209）/ kyokai-hei（民法223-229）/ usui-haisui（民法214・216・218・220・221）/ kussaku（民法237・238）/ setback（建基法2条1号・42条2項3項・44条）/ kensetsugyo-kyoka（建設業法3・19条、令1条の2）/ cooling-off（特商法9条・26条6項）/ denki-kouji（電気工事士法2・3条、令1条、規則2条、電気事業法38条）。一覧を4分野にグルーピング、ページ下部の関連リンクを同分野優先に変更、フッターの法令リンクを横並びに
- 2026-10-17 /rule/ に11本追加（70→81 URL）: yoheki（令138・142、盛土規制法12・令3）/ bouka-chiiki（建基法6条2項・61・62、令136の2・136の2の2）/ chiku-keikaku（都計法58の2、令38の4・7の6、景観法16）/ hikkai-tokutei（不登法123・131・143・148、刑法262の2）/ douro-shiyou（道交法2・77、道路法32、令7）/ keiyaku-futekigo（民法559・562-564・632・636・637）/ shohisha-keiyaku（消費者契約法2・4・7・9・10）/ mansion-senyoniwa（区分所有法2・6・18・30＋国交省標準管理規約R7）/ chintai-niwa（民法594・599・606・608・616・621・622）/ tokutei-kensetsu（騒音・振動規制法14、各令2・別表第二）/ kensetsu-recycle（建リ法9・10・12、令1・2、廃掃法21の3）。分野に「マンション・賃貸」「工事中の届出・近隣」追加。/work/ に relatedWorks 逆引きの法令ガイド枠
- 2026-11-02 ブロック塀撤去補助の自治体別ページ9本追加（100→109 URL）：/rule/block-wall-subsidy/{kawasaki,chiba,hiroshima,suginami,nerima,ota,itabashi,adachi,edogawa}/。各自治体公式ページを11/2に取得し、対象・工事・金額・流れを公式本文から転記（数値は照合スクリプトで本文と一致を確認）。9件の checked を 2026-11-02 に。江戸川区は公式更新日2025-06-03・受付期間の記載なしのまま。/work/delivery-box/ が被リンク1本（precheck[14]）→ /work/gate/ にFAQ1問（LIXIL スマート宅配ポスト・11/2確認）を足してリンク。
- 2026-11-03 ブロック塀撤去補助の自治体別ページ10本追加（109→119 URL）：/rule/block-wall-subsidy/{sagamihara,niigata,shizuoka,hamamatsu,kyoto,sakai,okayama,kitakyushu,kumamoto,shinagawa}/。各自治体公式ページを11/3に取得し、対象・工事・金額・流れを公式本文から転記（数値は本文と照合）。補足出典：浜松＝地震対策推進事業ページ（【受付中】表示）、京都＝補助金交付要綱（見付面積×11,600円と工事費の少ない額）、北九州＝申請手続きの流れPDF（交付申請11月末）、熊本＝チラシPDF（電話・計算例）。仙台市は令和8年度受付終了のため作らず保留（checkedのみ11/3）。
- 2026-11-04 生垣・緑化助成の自治体別ページ9本追加（119→128 URL）：/rule/ikegaki-subsidy/{sendai,nagoya,kumamoto,setagaya,suginami,nerima,ota,shinagawa,adachi}/（テンプレ app/rule/ikegaki-subsidy/[city]/page.tsx、lib ikegakiPages）。各自治体の公式ページ・PDFを11/4に取得し、対象・経費・単価・上限・流れを本文から転記。9件の checked を 2026-11-04 に（名古屋は公式更新日 2026-11-02）。一覧に自治体別リンク（childPath）、同じ自治体のブロック塀撤去補助ページと相互リンク。横浜（ブロック塀等改善事業の一部で /rule/block-wall-subsidy/yokohama/ と重なる）・新潟（緑地協定地区のみ）・川崎（協会パンフがPDF画像）・相模原（手引きが Google Drive）は保留、さいたまは次の便。
- 2026-11-05 生垣・緑化助成の自治体別ページ2本追加（128→130 URL）：/rule/ikegaki-subsidy/{saitama,kawasaki}/。さいたま＝市のみどりの街並みづくり助成制度ページ（更新 2026-03-31）と協会パンフレットPDF（2026-04-10作成）、川崎＝協会「屋上・壁面緑化／生垣づくり助成」ページと生垣の交付申請書PDF（想定額の計算注記）を11/5に取得し本文から転記。checked 2026-11-05。sitemap は新規2URL・一覧・他の生垣9ページ（自治体別リンクが増えた）・相互リンクが付くブロック塀2ページ（さいたま・川崎）の lastmod を 2026-11-05 に。保留のまま：横浜（ブロック塀等改善事業と重なる）・新潟（緑地協定地区のみ）・相模原（oniwa・zouen に同じ制度のページがあり重複整理が okina 判断待ち）。仙台のブロック塀除却補助は11/5も受付終了。
