if (!self.define) {
  let i,
    n = {};
  const e = (e, a) => (
    (e = new URL(e + ".js", a).href),
    n[e] ||
      new Promise((n) => {
        if ("document" in self) {
          const i = document.createElement("script");
          (i.src = e), (i.onload = n), document.head.appendChild(i);
        } else (i = e), importScripts(e), n();
      }).then(() => {
        let i = n[e];
        if (!i) throw new Error(`Module ${e} didn’t register its module`);
        return i;
      })
  );
  self.define = (a, s) => {
    const c =
      i ||
      ("document" in self ? document.currentScript.src : "") ||
      location.href;
    if (n[c]) return;
    let o = {};
    const r = (i) => e(i, c),
      l = { module: { uri: c }, exports: o, require: r };
    n[c] = Promise.all(a.map((i) => l[i] || r(i))).then((i) => (s(...i), o));
  };
}
define(["./workbox-a0adc145"], function (i) {
  "use strict";
  self.skipWaiting(),
    i.clientsClaim(),
    i.precacheAndRoute(
      [
        {
          url: "apple-touch-icon-180x180.png",
          revision: "5b98caf6d9ca88d0040edcbe81fbe69a",
        },
        { url: "assets/agent-sf42eb279ae-Cuyx0sGO.png", revision: null },
        { url: "assets/appdownload-icon-BkaWC_nB.svg", revision: null },
        { url: "assets/axios-I_wKO6Q1.js", revision: null },
        { url: "assets/bg-login-skyEX-BDKnYdGR.jpg", revision: null },
        { url: "assets/bg-sdfd3971a83-DVUUv4aK.png", revision: null },
        { url: "assets/chakra-mpaYxI_z.js", revision: null },
        { url: "assets/cover-live-vLnvfDN0.png", revision: null },
        { url: "assets/cryptoJs-DCZ-Ftzy.js", revision: null },
        { url: "assets/email-BFFicsFs.png", revision: null },
        { url: "assets/icon-account-iJt9Ra3a.svg", revision: null },
        { url: "assets/icon-account-statement-BdVcR2kf.svg", revision: null },
        { url: "assets/icon-casino-Cxpwh_n1.svg", revision: null },
        { url: "assets/icon-deposit-D7oHjQcG.png", revision: null },
        { url: "assets/icon-games-66e5qsDQ.svg", revision: null },
        { url: "assets/icon-history-B2Cl4PNG.png", revision: null },
        { url: "assets/icon-kyc-D9W880KA.svg", revision: null },
        { url: "assets/icon-mobcasino-DVtknX72.svg", revision: null },
        { url: "assets/icon-mobgames-BkuA065X.svg", revision: null },
        { url: "assets/icon-nodata-hP5sQ6P7.svg", revision: null },
        { url: "assets/icon-profit-loss-BuX685Qw.svg", revision: null },
        { url: "assets/icon-recommendfriend-7mIr3mL0.svg", revision: null },
        { url: "assets/icon-resetpasswords-BMt_Go0V.png", revision: null },
        { url: "assets/icon-sport-0Xf0MBP1.svg", revision: null },
        { url: "assets/icon-table-DAr18Nla.svg", revision: null },
        { url: "assets/icon-total-COY77BUv.svg", revision: null },
        { url: "assets/icon-withdrawal-DFYrodGF.png", revision: null },
        { url: "assets/image112-4UbUQ40t.jpg", revision: null },
        { url: "assets/index-_We0Nukf.js", revision: null },
        { url: "assets/index-KfBgQUG1.css", revision: null },
        { url: "assets/index-llaQ0qDo.js", revision: null },
        { url: "assets/left-s71761d14ca-C2JUf8y4.png", revision: null },
        { url: "assets/live-tv-or-score-DqqK_CYw.js", revision: null },
        { url: "assets/login-s43e1ddf31a-DDthY8ru.png", revision: null },
        { url: "assets/main-s1aea395e8c-DudeGKkU.png", revision: null },
        { url: "assets/main-se21de741bc-Pd4WoSzB.png", revision: null },
        { url: "assets/member-header-bg-oXclHZc7.png", revision: null },
        { url: "assets/memberpic-lv1-CqSgFBy5.png", revision: null },
        { url: "assets/mobile-login-3Hb97Xcp.png", revision: null },
        { url: "assets/promotion-bg-oqCtXcYu.svg", revision: null },
        { url: "assets/reactDayPicker-C43KlTe7.js", revision: null },
        { url: "assets/reactIcons-Dmit337i.js", revision: null },
        { url: "assets/reactSpinners-Dgc5KUkx.js", revision: null },
        { url: "assets/reactUse-DTnvhcUA.js", revision: null },
        { url: "assets/right-s96d53b4782-CJ94rRuO.png", revision: null },
        { url: "assets/router-Ua64hkZi.js", revision: null },
        { url: "assets/royalboss-l0sNRNKZ.js", revision: null },
        { url: "assets/royalbossReact-GIjSXeXc.js", revision: null },
        { url: "assets/sky247-Byi_unOs.png", revision: null },
        { url: "assets/slots-Mur3gW-c.png", revision: null },
        { url: "assets/swiper-Ck2cIqjZ.js", revision: null },
        { url: "assets/telegram-Qnx6qJpw.png", revision: null },
        { url: "assets/toolbar-icon-deposit-aW4LtGu2.svg", revision: null },
        { url: "assets/toolbar-icon-home-DIDgaJ5e.svg", revision: null },
        { url: "assets/toolbar-icon-mine-C51MvN00.svg", revision: null },
        { url: "assets/toolbar-icon-promotion-4if9kuHi.svg", revision: null },
        { url: "assets/top-s027a1c2cc6-Bf_OlHdk.png", revision: null },
        { url: "assets/whatsapp-Dw4npED2.png", revision: null },
        { url: "index.html", revision: "83dee3318e90fb267311e3a104fea6d5" },
        {
          url: "maskable-icon-512x512.png",
          revision: "3040e73688051220e64180b6255ab504",
        },
        {
          url: "pub-images/big-icon-black.png",
          revision: "80e20f6be6d9944346b0fcc80676619b",
        },
        {
          url: "pub-images/big-icon.png",
          revision: "6c0742bd545d757d056405e88b6b5695",
        },
        {
          url: "pub-images/country-flag/bangladesh.png",
          revision: "8de1d2896e0cc65d28172f05b42dd57d",
        },
        {
          url: "pub-images/country-flag/brazil.png",
          revision: "54449669c079350c75c4203f2383d39b",
        },
        {
          url: "pub-images/country-flag/camodia.png",
          revision: "8403cd7c9d3ff8d56c46fe37fb05f38c",
        },
        {
          url: "pub-images/country-flag/india.png",
          revision: "d906087381b0027f2ca1a0af1b620a40",
        },
        {
          url: "pub-images/country-flag/pakistan.png",
          revision: "642157108ce250857a1722591771ab97",
        },
        {
          url: "pub-images/fancywin/icon/active/icon-all-provider.svg",
          revision: "164ea254f846bf12ae544b0da8d61cd8",
        },
        {
          url: "pub-images/fancywin/icon/active/icon-arcade.svg",
          revision: "5bfefa173ce8e0b2f255f5caa6d3869d",
        },
        {
          url: "pub-images/fancywin/icon/active/icon-casino.svg",
          revision: "24dd942fb203c40df25598930d5b88c1",
        },
        {
          url: "pub-images/fancywin/icon/active/icon-crash.svg",
          revision: "e368049fd61e5776b85d5c4c4ee2e385",
        },
        {
          url: "pub-images/fancywin/icon/active/icon-fish.svg",
          revision: "c75c03ee82d60f6c4e713fe1ad678a86",
        },
        {
          url: "pub-images/fancywin/icon/active/icon-hot.svg",
          revision: "9677e43e8c59b276a4ee7ade904c5b68",
        },
        {
          url: "pub-images/fancywin/icon/active/icon-lottery.svg",
          revision: "5294efbdbba598e9848be68851e8e277",
        },
        {
          url: "pub-images/fancywin/icon/active/icon-slot.svg",
          revision: "4ca6439a64736d4a0a7cdc0461074a96",
        },
        {
          url: "pub-images/fancywin/icon/active/icon-sport.svg",
          revision: "4da1b6ac34672b1374b6da7fc17fd78b",
        },
        {
          url: "pub-images/fancywin/icon/active/icon-table.svg",
          revision: "6c601a1c58da763d789d2aeea7e1b6aa",
        },
        {
          url: "pub-images/fancywin/icon/active/license1.png",
          revision: "7c74b06f7f9d80e0f6cf30e6c686492b",
        },
        {
          url: "pub-images/fancywin/icon/flag/BD.png",
          revision: "946a902cc074099e31a55001ec7cff4d",
        },
        {
          url: "pub-images/fancywin/icon/normal/icon-activitiy-log.svg",
          revision: "0bb97933c9313c1a865cdb6d756488dc",
        },
        {
          url: "pub-images/fancywin/icon/normal/icon-affiliate.svg",
          revision: "7c22b88f1f6810a8626f233620de05f6",
        },
        {
          url: "pub-images/fancywin/icon/normal/icon-arcade.svg",
          revision: "9d2afb5cc092208b0a7dad931210574d",
        },
        {
          url: "pub-images/fancywin/icon/normal/icon-bet-records.png",
          revision: "aaac78adbabef22953f44670a91e4f56",
        },
        {
          url: "pub-images/fancywin/icon/normal/icon-bet-records.svg",
          revision: "662e295e8b09e331b8d02f63036f2a8c",
        },
        {
          url: "pub-images/fancywin/icon/normal/icon-bonuses.svg",
          revision: "6e837aea34a5b2723b8a683d3d218537",
        },
        {
          url: "pub-images/fancywin/icon/normal/icon-casino.svg",
          revision: "46a7449b3b6b3fa69d322b38cb7cfe60",
        },
        {
          url: "pub-images/fancywin/icon/normal/icon-crash.svg",
          revision: "887336e95df62314297de384dbe8210d",
        },
        {
          url: "pub-images/fancywin/icon/normal/icon-deposit.svg",
          revision: "7873dedbc40737ca7a2241e863efcfd8",
        },
        {
          url: "pub-images/fancywin/icon/normal/icon-download.svg",
          revision: "5d052fcfe87848784bbdb4c2ebf87b1f",
        },
        {
          url: "pub-images/fancywin/icon/normal/icon-fish.svg",
          revision: "50c7d2edf88a938cc213c12b9559e3cd",
        },
        {
          url: "pub-images/fancywin/icon/normal/icon-home.svg",
          revision: "b57b48030528cd1fdb029cc21048e157",
        },
        {
          url: "pub-images/fancywin/icon/normal/icon-hot.svg",
          revision: "a05e5ae6ec4ece3049e14f7affe9060e",
        },
        {
          url: "pub-images/fancywin/icon/normal/icon-info.svg",
          revision: "6bdbeb5d535ee771317b5482751aff06",
        },
        {
          url: "pub-images/fancywin/icon/normal/icon-language.svg",
          revision: "c2a163d36fd1e30396c1281134f6c75c",
        },
        {
          url: "pub-images/fancywin/icon/normal/icon-login.svg",
          revision: "41999d7e7e574612157ecd2f7aa7ffe7",
        },
        {
          url: "pub-images/fancywin/icon/normal/icon-logout.svg",
          revision: "4ae01d5f7f03af8d52686287e263648e",
        },
        {
          url: "pub-images/fancywin/icon/normal/icon-lottery.svg",
          revision: "a1a0e7f76a6c4fd0e5a4c219abeaa04f",
        },
        {
          url: "pub-images/fancywin/icon/normal/icon-promotion.svg",
          revision: "a98e52ea21ce49632e7718082122e41e",
        },
        {
          url: "pub-images/fancywin/icon/normal/icon-records.svg",
          revision: "71ac048f6d5d662035fa20d48295a736",
        },
        {
          url: "pub-images/fancywin/icon/normal/icon-referral.svg",
          revision: "0833c5ecb5393ffd40ac8e961691d5cb",
        },
        {
          url: "pub-images/fancywin/icon/normal/icon-resetpasswords.svg",
          revision: "d249190b58b09084545b8bf525630f21",
        },
        {
          url: "pub-images/fancywin/icon/normal/icon-slot.svg",
          revision: "770fbf556183ce3da562a1846dfa0a6e",
        },
        {
          url: "pub-images/fancywin/icon/normal/icon-sport.svg",
          revision: "35c0ef9bfdfb8cd5aac628a79626b944",
        },
        {
          url: "pub-images/fancywin/icon/normal/icon-switches.svg",
          revision: "fab625e278b7b44dce48c5a9d4073823",
        },
        {
          url: "pub-images/fancywin/icon/normal/icon-table.svg",
          revision: "f5ef2baab3f27c0ac203d861ecab7247",
        },
        {
          url: "pub-images/fancywin/icon/normal/icon-turnover.png",
          revision: "f151742f26f5a0d297406851cb7cedf0",
        },
        {
          url: "pub-images/fancywin/icon/normal/icon-turnover.svg",
          revision: "5cc987ca051e7051b638ea66b3ecf20d",
        },
        {
          url: "pub-images/fancywin/icon/normal/icon-withdrawal.svg",
          revision: "e008854a8e4abc3aca4b4597ec16f552",
        },
        {
          url: "pub-images/fancywin/icon/other/card-triangle.svg",
          revision: "4b70369f18b19edcf3586a9b1ebfe6fb",
        },
        {
          url: "pub-images/fancywin/icon/other/check.svg",
          revision: "bad0d3bdb13944ea82c8e85012acfc40",
        },
        {
          url: "pub-images/fancywin/icon/other/icon-9wickets.svg",
          revision: "ef24567a83f283cdcc368f1beab87b68",
        },
        {
          url: "pub-images/fancywin/icon/other/icon-all-provider.svg",
          revision: "164ea254f846bf12ae544b0da8d61cd8",
        },
        {
          url: "pub-images/fancywin/icon/other/logo-9wickets.svg",
          revision: "aaf7ed1792bf61013b4532ba7db89ed3",
        },
        {
          url: "pub-images/fancywin/icon/other/velki-icon.svg",
          revision: "3edf2b8fa684637f8578c365aca7ab40",
        },
        {
          url: "pub-images/fancywin/icon/social/facebook.svg",
          revision: "0206103977aa8d71850e46853191684d",
        },
        {
          url: "pub-images/fancywin/icon/social/icon-facebook.svg",
          revision: "0ec0f9aecc2656a631c813957f38fa2f",
        },
        {
          url: "pub-images/fancywin/icon/social/icon-imo.svg",
          revision: "24e3614875ff05f4a31ca544610e347e",
        },
        {
          url: "pub-images/fancywin/icon/social/icon-instagram.svg",
          revision: "86688336833e43863dd8fff6d5c57de3",
        },
        {
          url: "pub-images/fancywin/icon/social/icon-pinterest.svg",
          revision: "3df24804a6cb596435ea7e81d272a9cd",
        },
        {
          url: "pub-images/fancywin/icon/social/icon-telegram.svg",
          revision: "f07474b8afc4a05d7b0951f7d6c105e9",
        },
        {
          url: "pub-images/fancywin/icon/social/icon-twitter.svg",
          revision: "99b7975d06e3b9f9664fb3e95347117c",
        },
        {
          url: "pub-images/fancywin/icon/social/icon-whatsapp.svg",
          revision: "fd671074fe2fc5fb4b1b0349a68b915b",
        },
        {
          url: "pub-images/fancywin/icon/social/instagram.svg",
          revision: "18d16b4a6943b9808aa4b6db4f665adc",
        },
        {
          url: "pub-images/fancywin/icon/social/pinterest.svg",
          revision: "7234477726b39df4da70df480dec3bd8",
        },
        {
          url: "pub-images/fancywin/icon/social/twitter.svg",
          revision: "7fd1c22f3360eb1b57621a8df2af74ae",
        },
        {
          url: "pub-images/fancywin/icon/sports-icon/icon-badminton.svg",
          revision: "b8b35ffcea9e59cec155661d7f89b25b",
        },
        {
          url: "pub-images/fancywin/icon/sports-icon/icon-basketball.svg",
          revision: "94b5f82ea17e353ba69f6cf1549876bf",
        },
        {
          url: "pub-images/fancywin/icon/sports-icon/icon-cricket.svg",
          revision: "acb1fa466e62ad82e7d931aad3cf3af2",
        },
        {
          url: "pub-images/fancywin/icon/sports-icon/icon-horsebook.svg",
          revision: "6fb1fa66866da459d951b8239937a71e",
        },
        {
          url: "pub-images/fancywin/icon/sports-icon/icon-kabaddi.svg",
          revision: "3fdeb195cb59bfae036c595456343822",
        },
        {
          url: "pub-images/fancywin/icon/sports-icon/icon-sbov2.svg",
          revision: "b3f3f22e389bfc8488e7ffeb45a2a1b2",
        },
        {
          url: "pub-images/fancywin/icon/sports-icon/icon-soccer.svg",
          revision: "9f58f17d3c1341f8fcc6a5ed953bda40",
        },
        {
          url: "pub-images/fancywin/icon/sports-icon/icon-sportbook.svg",
          revision: "a3996276238c3687445ca9ef26cd327a",
        },
        {
          url: "pub-images/fancywin/icon/sports-icon/icon-tennis.svg",
          revision: "8d866c7329fece5df11b77e9c72801ef",
        },
        {
          url: "pub-images/fancywin/icon/sports-icon/icon-virtual.svg",
          revision: "692b63744a206c0034b871bebb01c08f",
        },
        {
          url: "pub-images/fancywin/other/age-limit.svg",
          revision: "1cd6de908376b1820bb110877fb339c2",
        },
        {
          url: "pub-images/fancywin/other/gamcare.svg",
          revision: "eaf8c621a5870996276392210d51a3f0",
        },
        {
          url: "pub-images/fancywin/other/license1.png",
          revision: "7c74b06f7f9d80e0f6cf30e6c686492b",
        },
        {
          url: "pub-images/fancywin/other/referral_banner.png",
          revision: "047beb10989dc53ad63a9450b23df6e5",
        },
        {
          url: "pub-images/fancywin/other/regulations.svg",
          revision: "829754b81bc64976a3e367979a4d9ae1",
        },
        {
          url: "pub-images/fancywin/other/under-construction.png",
          revision: "718820e130364f73ffdaebc761d9c4a7",
        },
        {
          url: "pub-images/fancywin/payment/bank-card.png",
          revision: "81e6601da10ba3faebd5304ac071c203",
        },
        {
          url: "pub-images/fancywin/payment/bird.svg",
          revision: "86b2ba7cf9ce8a1193faaa34f19fd6ca",
        },
        {
          url: "pub-images/fancywin/payment/bkash.png",
          revision: "1cd0221473677171cbdc7efceca45768",
        },
        {
          url: "pub-images/fancywin/payment/cryptoswitch.png",
          revision: "8f17eadc1386e1473ee078015a39100f",
        },
        {
          url: "pub-images/fancywin/payment/deposit-ewallet-rocket.svg",
          revision: "781447bbe3b1ef53614668dde4fdafa0",
        },
        {
          url: "pub-images/fancywin/payment/gpay.png",
          revision: "d09a972b0ebf2776a18b61f5a7c914c2",
        },
        {
          url: "pub-images/fancywin/payment/nagad.png",
          revision: "9a7bdbbf87f86ee2d896794b3a5145bf",
        },
        {
          url: "pub-images/fancywin/payment/pay16.png",
          revision: "309a26c5506b6483fe258cd982552f3e",
        },
        {
          url: "pub-images/fancywin/payment/pay17.png",
          revision: "65a3a302a2688c82e0288a3d6640b86a",
        },
        {
          url: "pub-images/fancywin/payment/pay18.png",
          revision: "93e6fc40d93149c729f8710838a6b64f",
        },
        {
          url: "pub-images/fancywin/payment/pay19.png",
          revision: "630c8d895bffd92e8bde74b845a23d35",
        },
        {
          url: "pub-images/fancywin/payment/pay20.png",
          revision: "8de0c86e87bf755ba43d3bcb90e1dc68",
        },
        {
          url: "pub-images/fancywin/payment/pay21.png",
          revision: "4728b136936f9d9c3cedd3ef254ecfda",
        },
        {
          url: "pub-images/fancywin/payment/pay22.png",
          revision: "51c7fb6affb30e17ba55757ec0122f32",
        },
        {
          url: "pub-images/fancywin/payment/pay33.png",
          revision: "4eca3f2a0c4b68b93e9b434d541d8752",
        },
        {
          url: "pub-images/fancywin/payment/pay34.png",
          revision: "dfbb32e8bad90a625ca9c007dcc7b34a",
        },
        {
          url: "pub-images/fancywin/payment/pay35.png",
          revision: "ef29aaf3e5268f09633d31c8d074ffab",
        },
        {
          url: "pub-images/fancywin/payment/pay36.png",
          revision: "c8fcc878e77526e9da4e5e26f6e7c2e1",
        },
        {
          url: "pub-images/fancywin/payment/pay37.png",
          revision: "ea927814854dd2b68264766798350fc6",
        },
        {
          url: "pub-images/fancywin/payment/pay43.png",
          revision: "6a13a03cadb1e3f1bbccd74ccf180dd6",
        },
        {
          url: "pub-images/fancywin/payment/pay45.png",
          revision: "53195e8383080b27aa4abda0cb102084",
        },
        {
          url: "pub-images/fancywin/payment/pay47.png",
          revision: "738c794213d94dbdd1e719e715b97df1",
        },
        {
          url: "pub-images/fancywin/payment/pay59.png",
          revision: "c4078b74ce31ac2f5acc572784219fed",
        },
        {
          url: "pub-images/fancywin/payment/pay60.png",
          revision: "47459596332426c4c03d2adb71feb0de",
        },
        {
          url: "pub-images/fancywin/payment/pay61.png",
          revision: "ba66b7499247a8475b21e0f680b5b374",
        },
        {
          url: "pub-images/fancywin/payment/pay8.png",
          revision: "7c1dc6e0d2081ea12506594aa581ec28",
        },
        {
          url: "pub-images/fancywin/payment/paytm.png",
          revision: "4570df34b4aeb9638543094194008871",
        },
        {
          url: "pub-images/fancywin/payment/phonepe.png",
          revision: "6318c542c5b8fb5e6142aff773f09463",
        },
        {
          url: "pub-images/fancywin/payment/rocket.svg",
          revision: "3f737f0c4d168fa57dd07ed3a5688da3",
        },
        {
          url: "pub-images/fancywin/payment/safe1.png",
          revision: "029a01be3197983290467bbfca91a4c6",
        },
        {
          url: "pub-images/fancywin/payment/safe2.png",
          revision: "0ae42e410c41ffde27764d6dd98534c0",
        },
        {
          url: "pub-images/fancywin/payment/safe3.png",
          revision: "d87205dbbdb39f63ad5b492318351e44",
        },
        {
          url: "pub-images/logo.png",
          revision: "67dde30efe2f7d6cea0bbe65f7e80208",
        },
        { url: "registerSW.js", revision: "1872c500de691dce40960bb85481de07" },
        { url: "favicon.ico", revision: "f51ed01cad7917a599618b95fc2b5305" },
        {
          url: "manifest.webmanifest",
          revision: "8dfccfab5d1108eee17771b4e79e60e5",
        },
      ],
      {}
    ),
    i.cleanupOutdatedCaches(),
    i.registerRoute(
      new i.NavigationRoute(i.createHandlerBoundToURL("index.html"))
    );
});
