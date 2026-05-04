// ==========================================
// Kufuu Data Source (Master Data)
// ==========================================
// ★重要: データはすべて記述して復元
const KUFUU_DATA = {
    // 1. 警告の赤
    "warning-red": {
        title: "警告の赤",
        category: "COLOR / 色",
        sub: "危険を知らせる本能的な色",
        sorutoMsg: "使いすぎると疲れちゃうから注意だよ！",
        merits: ["ユーザーの操作を瞬時に止める", "重要度が高いことが直感的に伝わる", "事故（誤削除など）を防げる"],
        demerits: ["多用すると「オオカミ少年」になる", "ユーザーにストレスや不安を与える"],
        logicTitle: "生物学的な注意喚起",
        logicDesc: "赤は血や炎の色であり、人間は本能的に赤色を見ると交感神経が刺激され、注意力が上がるようにできています。ユーザーの足を止め、事故を防ぐために使われます。",
        checklist: ["本当に危険な操作（削除など）だけに限る", "色覚多様性に配慮し、アイコンも必ず併用する"],
        mistakes: [{ title: "全部赤文字にする", desc: "見てほしいからと全部赤くすると、どこが重要かわからなくなります。" }],
        quiz: { q: "「ログアウト」ボタン、どっちの色にする？", opts: ["赤色", "グレー"], ans: "グレー", comment: "ログアウトは危険な操作ではないので、赤色だと「エラー？」と勘違いさせてしまいます。" },
        try: "自分のデザインで「赤色」を使っている箇所を探し、それが本当に危険な箇所か見直してみよう。",
        visualIcon: "alert-triangle",
        visualColor: "#ef4444",
        renderUI: (type, container) => {
            if(type === 'bad') {
                container.innerHTML = `<button style="color:blue; background:none; border:none; cursor:pointer;">削除する</button>`;
                return "ただのリンクに見えて、重要度が伝わらない...";
            } else {
                container.innerHTML = `<button style="background:#ef4444; color:white; padding:10px 20px; border-radius:8px; display:flex; align-items:center; gap:8px; border:none; font-weight:bold;"><i data-lucide="alert-triangle"></i> 削除する</button>`;
                return "赤＋アイコンで「危険かも！」と直感的にわかるね。";
            }
        }
    },
    // 2. 丸いボタン
    "round-btn": {
        title: "丸いボタン",
        category: "SHAPE / 形",
        sub: "角が丸いと「優しさ」「押しやすさ」を感じさせる。",
        sorutoMsg: "指に優しそうな形だよね！",
        merits: ["「押せる」ことが直感的にわかる", "親しみやすく、優しい印象を与える", "視線が内側に向きやすい"],
        demerits: ["真面目・厳格な雰囲気には合わないことがある", "場所を取りやすい"],
        logicTitle: "コンターバイアス（Contour Bias）",
        logicDesc: "人間は鋭利な角よりも、曲線的な物体の方を「安全」と認識し、好む傾向があります。",
        checklist: ["クリック可能な要素だとひと目でわかるか？", "半径（border-radius）は統一されているか？", "中の文字に対して余白は十分か？"],
        mistakes: [{ title: "半径がバラバラ", desc: "場所によって丸みが違うと、統一感がなく雑に見えます。" }],
        quiz: { q: "子供向けアプリの「スタート」ボタン、どっち？", opts: ["真四角", "丸っこい"], ans: "丸っこい", comment: "正解！丸い形は楽しさや遊び心を演出するのにピッタリです。" },
        try: "ボタンの角丸を 0px, 4px, 99px と変えてみて、印象の違いを実験してみよう。",
        visualIcon: "circle",
        visualColor: "#3b82f6",
        renderUI: (type, container) => {
            if(type === 'bad') container.innerHTML = `<button style="background:#3b82f6; color:white; padding:10px 20px; border-radius:0px; border:none;">決定</button>`;
            else container.innerHTML = `<button style="background:#3b82f6; color:white; padding:10px 20px; border-radius:99px; border:none; box-shadow:0 4px 10px rgba(59,130,246,0.3);">決定</button>`;
            return type === 'bad' ? "角が尖っていて、ちょっと痛そう？" : "指にフィットしそうで、押したくなるね！";
        }
    },
    // 3. 読みやすい余白
    "readable-space": {
        title: "読みやすい余白",
        category: "SPACE / 余白",
        sub: "行間を適度に空けると、目の移動が楽になる。",
        sorutoMsg: "ギチギチだと読む気なくしちゃうよね...",
        merits: ["視線の移動がスムーズになる", "情報の塊が理解しやすくなる", "高級感・信頼感が出る"],
        demerits: ["スクロール量が増える", "1画面の情報量は減る"],
        logicTitle: "近接の法則と呼吸",
        logicDesc: "適度な行間（line-height）は、文章に「呼吸」を与え、次の行への視線移動を助けます。",
        checklist: ["行間（line-height）は1.5〜1.8程度あるか？", "段落ごとの余白は、行間より広いか？", "文字サイズに対して余白が狭すぎないか？"],
        mistakes: [{ title: "行間が狭すぎる", desc: "行がくっついて見えると、読み飛ばしが発生します。" }],
        quiz: { q: "ニュース記事の本文、どっちが読みやすい？", opts: ["行間 1.0", "行間 1.8"], ans: "行間 1.8", comment: "その通り！長文を読むときは、ゆったりした余白が必要です。" },
        try: "CSSで line-height: 1.0 と 1.8 を切り替えて、読みやすさの違いを体感してみよう。",
        visualIcon: "align-justify",
        visualColor: "#94a3b8",
        renderUI: (type, container) => {
            if(type === 'bad') {
                container.innerHTML = `<p style="line-height:1.2; width:260px; text-align:left; font-size:14px;">これは行間が狭すぎる例です。文字が詰まっていて、どこを読んでいるのかわからなくなってしまいます。読むのが非常に困難です。</p>`;
                return "うっ... 息苦しい...";
            } else {
                container.innerHTML = `<p style="line-height:1.8; width:260px; text-align:left; font-size:14px;">これは適切な行間の例です。<br>文字の間に隙間があり、<br>リズムよく読むことができますね。</p>`;
                return "スラスラ読めるね！";
            }
        }
    },
    // 4. 整列の魔法
    "align-magic": {
        title: "整列の魔法",
        category: "SHAPE / 形",
        sub: "左端や上端などの「見えない線」を揃える。",
        sorutoMsg: "ピシッと揃うと気持ちいいよね！",
        merits: ["視線の動線が一直線になる", "信頼感が出る", "情報処理の負荷が下がる"],
        demerits: ["レイアウトの自由度が少し下がる", "調整に手間がかかる"],
        logicTitle: "グリッドシステム",
        logicDesc: "要素の左端や上端が揃っていると、脳が情報を処理する負荷が下がります。",
        checklist: ["左揃え・中央揃え・右揃えを混ぜていないか？", "見えないグリッド線を意識しているか？"],
        mistakes: [{ title: "軸がブレている", desc: "中央揃えの下に左揃えを置くなど、基準線がブレると視線が迷子になります。" }],
        quiz: { q: "ビジネス文書のタイトル、どっちが無難？", opts: ["左揃え", "ランダム"], ans: "左揃え", comment: "左揃えは視線の起点を作りやすく、読みやすいレイアウトになります。" },
        try: "自分のデザインに定規を当ててみて、要素の端がピシッと揃っているか確認してみよう。",
        visualIcon: "align-left",
        visualColor: "#8b5cf6",
        renderUI: (type, container) => {
            if(type === 'bad') {
                container.innerHTML = `
                    <div style="display:flex; flex-direction:column; gap:10px; text-align:center; width:80%;">
                        <div style="border-bottom:1px solid #ddd; padding-bottom:5px;">
                            <div style="font-size:10px; color:#888;">TITLE</div>
                            <div style="font-weight:bold;">デザイン定例会</div>
                        </div>
                        <div style="border-bottom:1px solid #ddd; padding-bottom:5px;">
                            <div style="font-size:10px; color:#888;">DATE</div>
                            <div style="font-weight:bold;">2025.10.10</div>
                        </div>
                    </div>`;
                return "中央揃えだと、視線の起点がブレる...";
            } else {
                container.innerHTML = `
                    <div style="display:flex; flex-direction:column; gap:10px; text-align:left; width:60%;">
                        <div style="border-bottom:1px solid #8b5cf6; padding-bottom:5px;">
                            <div style="font-size:10px; color:#8b5cf6; font-weight:bold;">TITLE</div>
                            <div style="font-weight:bold;">デザイン定例会</div>
                        </div>
                        <div style="border-bottom:1px solid #8b5cf6; padding-bottom:5px;">
                            <div style="font-size:10px; color:#8b5cf6; font-weight:bold;">DATE</div>
                            <div style="font-weight:bold;">2025.10.10</div>
                        </div>
                    </div>`;
                return "左端が揃っていると、読みやすい！";
            }
        }
    },
    // 5. 成功の緑
    "success-green": {
        title: "成功の緑",
        category: "COLOR / 色",
        sub: "「進め」「安全」「完了」を伝える安心の色。",
        sorutoMsg: "緑を見るとホッとするね〜",
        merits: ["タスク完了を直感的に伝える", "ユーザーに安心感を与える", "ポジティブなフィードバックになる"],
        demerits: ["背景色に使いすぎると目が痛い", "色覚によっては見えにくい場合がある"],
        logicTitle: "文化的刷り込み",
        logicDesc: "信号機の青（緑）と同じく、文化的に「問題なし」「許可」という意味が刷り込まれています。",
        checklist: ["完了メッセージに使っているか？", "エラーの赤と対比させているか？"],
        mistakes: [{ title: "背景色に使いすぎる", desc: "画面全体が緑だと、どこを見ていいかわからなくなります。" }],
        quiz: { q: "「送信完了」のアイコン、何色？", opts: ["赤", "緑"], ans: "緑", comment: "正解！緑は成功や完了を表すのに最適です。" },
        try: "完了画面のアイコンをグレーから緑に変えてみて、達成感がどう変わるか見てみよう。",
        visualIcon: "check-circle",
        visualColor: "#22c55e",
        renderUI: (type, container) => {
            if(type === 'bad') container.innerHTML = `<span style="color:#666; font-weight:bold;">送信しました</span>`;
            else container.innerHTML = `<span style="color:#22c55e; font-weight:bold; display:flex; align-items:center; gap:5px;"><i data-lucide="check-circle"></i> 送信しました</span>`;
            return type === 'bad' ? "本当に送れたのかな？" : "「できた！」って感じがする！";
        }
    },
    // 6. グループ化
    "grouping": {
        title: "グループ化",
        category: "SPACE / 余白",
        sub: "関係あるもの同士を近づけ、関係ないものは離す。",
        sorutoMsg: "仲良しは近くに置こう！",
        merits: ["情報の構造が直感的に伝わる", "枠線や線を減らせる", "画面がスッキリする"],
        demerits: ["余白の調整が難しい", "スペースが必要になる"],
        logicTitle: "ゲシュタルト心理学",
        logicDesc: "脳は距離が近いものを自動的にグループ化して処理します。",
        checklist: ["関連する要素は近づけているか？", "関係ない要素は離しているか？"],
        mistakes: [{ title: "等間隔に並べる", desc: "すべての要素が等間隔だと、どれがどの見出しの内容かわからなくなります。" }],
        quiz: { q: "写真とキャプション、どう配置する？", opts: ["近づける", "離す"], ans: "近づける", comment: "そう！セットで認識させるために近づけます。" },
        try: "名刺のデザインを見てみよう。距離感でグループができているはずです。",
        visualIcon: "layout-grid",
        visualColor: "#6366f1",
        renderUI: (type, container) => {
            if(type === 'bad') container.innerHTML = `<div style="display:flex; gap:20px;"><div style="width:30px; height:30px; background:#ccc;"></div><div style="width:30px; height:30px; background:#ccc;"></div></div>`;
            else container.innerHTML = `<div style="display:flex; gap:5px; border:1px dashed #6366f1; padding:5px;"><div style="width:30px; height:30px; background:#6366f1;"></div><div style="width:30px; height:30px; background:#6366f1;"></div></div>`;
            return type === 'bad' ? "バラバラに見える..." : "チームに見えるね！";
        }
    },
    // 7. リンクの青色
    "link-blue": {
        title: "リンクの青色",
        category: "COLOR / 色",
        sub: "インターネット初期からの「押せる場所」の共通言語。",
        sorutoMsg: "青い文字＝押せる、って皆知ってるね！",
        merits: ["学習コストゼロで「リンク」と伝わる", "迷わせない", "クリック率が上がる"],
        demerits: ["デザインのトーンに合わない場合がある", "古臭く見えることがある"],
        logicTitle: "メンタルモデル",
        logicDesc: "ユーザーは「青文字＝リンク」という経験則（メンタルモデル）を既に持っています。",
        checklist: ["テキストリンクは青色か？", "下線をつけているか？"],
        mistakes: [{ title: "ただの強調に青を使う", desc: "リンクだと勘違いしてクリックしてしまい、ストレスになります。" }],
        quiz: { q: "文章中のリンク、何色にする？", opts: ["青", "黒"], ans: "青", comment: "正解！青色が最もリンクだと認識されやすいです。" },
        try: "Wikipediaのような情報サイトを見てみよう。青色＝リンクというルールが徹底されています。",
        visualIcon: "link",
        visualColor: "#3b82f6",
        renderUI: (type, container) => {
            if(type === 'bad') container.innerHTML = `<span style="text-decoration:none; color:#333;">詳しくはこちら</span>`;
            else container.innerHTML = `<span style="text-decoration:underline; color:#3b82f6; cursor:pointer;">詳しくはこちら</span>`;
            return type === 'bad' ? "ただの文章に見える" : "「押せる」ってすぐわかる！";
        }
    },
    // 8. 注意の黄色
    "caution-yellow": {
        title: "注意の黄色",
        category: "COLOR / 色",
        sub: "「危険ではないが、気をつけたほうがいい」を伝える。",
        sorutoMsg: "信号の黄色と一緒だね！",
        merits: ["作業を中断させずに注意を引く", "赤よりマイルドな警告ができる"],
        demerits: ["白背景だと見えにくい（コントラスト比注意）"],
        logicTitle: "警戒色",
        logicDesc: "自然界でも黄色と黒の組み合わせは警戒色として認識されます。",
        checklist: ["警告レベルの通知に使っているか？", "文字色は黒にしているか？"],
        mistakes: [{ title: "白文字を乗せる", desc: "黄色背景に白文字はコントラストが低く、非常に読みづらくなります。" }],
        quiz: { q: "「保存されていません」の通知、何色？", opts: ["黄色", "緑"], ans: "黄色", comment: "正解！注意を促すときは黄色が適しています。" },
        try: "パスワード入力欄で「文字数が足りません」などのヒントを出すときに黄色を使ってみよう。",
        visualIcon: "alert-triangle",
        visualColor: "#eab308",
        renderUI: (type, container) => {
            if(type === 'bad') container.innerHTML = `<div style="background:#eab308; color:white; padding:5px;">読めますか？</div>`;
            else container.innerHTML = `<div style="background:#fffbeb; color:#b45309; border:1px solid #fcd34d; padding:5px;">読みやすい！</div>`;
            return type === 'bad' ? "まぶしくて読めない..." : "ハッキリ読めるね！";
        }
    },
    // 9. 円形アイコン
    "circle-icon": {
        title: "円形アイコン",
        category: "SHAPE / 形",
        sub: "人の顔や、独立したシンボルに使われる形。",
        sorutoMsg: "人の顔は丸に入れると可愛いね！",
        merits: ["人物写真に適している", "四角い要素の中で目立つ"],
        demerits: ["画像の四隅がトリミングされる"],
        logicTitle: "形状の対比",
        logicDesc: "Webは四角形の集まりです。その中で円形は異質な存在となり、自然と視線を集めます。",
        checklist: ["プロフィール画像に使っているか？", "重要なボタンに使っているか？"],
        mistakes: [{ title: "表データの中で使う", desc: "整列させたい場所で円を使うと、ガタガタに見えます。" }],
        quiz: { q: "SNSのプロフィール画像、どっち？", opts: ["四角", "丸"], ans: "丸", comment: "今は丸が主流だね！親しみやすさが出るよ。" },
        try: "SNSのタイムラインを見てみよう。アイコンが円形であることで、投稿写真と区別がついています。",
        visualIcon: "user-circle",
        visualColor: "#ec4899",
        renderUI: (type, container) => {
            if(type === 'bad') container.innerHTML = `<div style="width:50px; height:50px; background:#ec4899;"></div>`;
            else container.innerHTML = `<div style="width:50px; height:50px; background:#ec4899; border-radius:50%;"></div>`;
            return type === 'bad' ? "ただの画像に見える" : "「人」や「アイコン」だと認識しやすい";
        }
    },
    // 10. マージン
    "margin": {
        title: "マージン",
        category: "SPACE / 余白",
        sub: "要素の「外側」の余白。隣との距離感を決める。",
        sorutoMsg: "スペースは心の余裕だよ！",
        merits: ["情報の独立性を保つ", "圧迫感を減らす", "リズムを生む"],
        demerits: ["スペースを取りすぎる場合がある"],
        logicTitle: "ホワイトスペースの効果",
        logicDesc: "何もない空間（余白）こそが、情報の境界線として機能します。",
        checklist: ["要素同士がくっつきすぎていないか？", "セクションの区切りは明確か？"],
        mistakes: [{ title: "マージン不足", desc: "要素同士がくっつきすぎると、窮屈で安っぽい印象になります。" }],
        quiz: { q: "見出しと本文の間、どうする？", opts: ["くっつける", "少し空ける"], ans: "少し空ける", comment: "少し空けると読みやすくなるよ！" },
        try: "Webサイトの検証ツールで、色々なサイトのマージンを見てみよう。",
        visualIcon: "box-select",
        visualColor: "#94a3b8",
        renderUI: (type, container) => {
            if(type === 'bad') container.innerHTML = `<div style="display:flex;"><div style="background:#ccc; width:40px; height:40px;"></div><div style="background:#ccc; width:40px; height:40px;"></div></div>`;
            else container.innerHTML = `<div style="display:flex; gap:20px;"><div style="background:#94a3b8; width:40px; height:40px;"></div><div style="background:#94a3b8; width:40px; height:40px;"></div></div>`;
            return type === 'bad' ? "くっついて見える..." : "別々のものだとわかる！";
        }
    },
    // 11. ダークモード
    "dark-mode": {
        title: "ダークモード",
        category: "COLOR / 色",
        sub: "暗い背景に白い文字。目の疲れを軽減し、没入感を高める。",
        sorutoMsg: "夜に見るときは目に優しいね。",
        merits: ["写真や動画が映える", "省電力（有機ELの場合）", "目の負担軽減"],
        demerits: ["明るい場所では見にくいことがある"],
        logicTitle: "明度と対比",
        logicDesc: "背景を暗くすることで、発光しているコンテンツがより際立ちます。",
        checklist: ["真っ黒ではなく濃いグレーを使っているか？", "文字のコントラストは十分か？"],
        mistakes: [{ title: "単純な色反転", desc: "色が強すぎて目に痛いデザインになってしまいます。" }],
        quiz: { q: "動画アプリの背景、どっちがいい？", opts: ["白", "黒"], ans: "黒", comment: "映画館と同じで、黒の方が映像に集中できるね。" },
        try: "スマホの設定でライトモードとダークモードを切り替えてみよう。",
        visualIcon: "moon",
        visualColor: "#f8fafc",
        renderUI: (type, container) => {
            if(type === 'bad') container.innerHTML = `<div style="background:white; color:black; padding:10px;">眩しい！</div>`;
            else container.innerHTML = `<div style="background:#1e293b; color:#e2e8f0; padding:10px;">落ち着く...</div>`;
            return type === 'bad' ? "夜だと目が痛いかも" : "目に優しく、集中できる";
        }
    },
    // 12. 角ばった形
    "square-shape": {
        title: "角ばった形",
        category: "SHAPE / 形",
        sub: "「真面目」「信頼」「安定」「厳格」といった印象を与える。",
        sorutoMsg: "カチッとしててかっこいいね！",
        merits: ["信頼感・安定感が出る", "情報量が多い画面で整理しやすい"],
        demerits: ["冷たい印象を与えることがある"],
        logicTitle: "直線と秩序",
        logicDesc: "直線は人工的で整然とした印象を与え、信頼性や論理性を感じさせます。",
        checklist: ["金融系やニュースサイトか？", "グリッドに沿っているか？"],
        mistakes: [{ title: "全部四角にする", desc: "ボタンまで四角すぎると、クリックできるかわかりにくくなります。" }],
        quiz: { q: "銀行のアプリ、どっちの雰囲気？", opts: ["ふわふわ", "カッチリ"], ans: "カッチリ", comment: "お金を扱う場所だから、カッチリした方が安心だね。" },
        try: "高級ブランドのサイトを見てみよう。角ばったデザインが多いよ。",
        visualIcon: "square",
        visualColor: "#2dd4bf",
        renderUI: (type, container) => {
            if(type === 'bad') container.innerHTML = `<div style="background:#2dd4bf; border-radius:20px; padding:10px; color:white;">軽い？</div>`;
            else container.innerHTML = `<div style="background:#0f766e; border-radius:0px; padding:10px; color:white;">重厚</div>`;
            return type === 'bad' ? "少し頼りないかも？" : "どっしりと信頼できそう";
        }
    },
    // 13. 近接の法則
    "proximity": {
        title: "近接の法則",
        category: "SPACE / 余白",
        sub: "近くにあるものは関係があると認識される。",
        sorutoMsg: "これ、デザインの基本中の基本だよ！",
        merits: ["直感的にグループがわかる", "説明文が減らせる"],
        demerits: ["余白の調整がシビア"],
        logicTitle: "ゲシュタルト心理学",
        logicDesc: "脳は距離が近いものを自動的にグループ化して処理します。",
        checklist: ["見出しと本文は近づけているか？", "別の話題とは離しているか？"],
        mistakes: [{ title: "均等配置", desc: "すべて同じ距離だと、どれがセットかわからなくなります。" }],
        quiz: { q: "タイトルと本文、どうする？", opts: ["離す", "近づける"], ans: "近づける", comment: "セットだとわかるように近づけよう！" },
        try: "リモコンのボタン配置を見てみよう。機能ごとに固まっているはず。",
        visualIcon: "minimize-2",
        visualColor: "#818cf8",
        renderUI: (type, container) => {
            if(type === 'bad') {
                container.innerHTML = `
                    <div style="display:flex; flex-direction:column; gap:20px; align-items:center; background:white; padding:20px; border-radius:12px;">
                        <div style="width:60px; height:60px; background:#e2e8f0; border-radius:8px;"></div>
                        <div style="width:100px; height:12px; background:#cbd5e1; border-radius:4px;"></div>
                        <div style="width:60px; height:60px; background:#e2e8f0; border-radius:8px;"></div>
                        <div style="width:100px; height:12px; background:#cbd5e1; border-radius:4px;"></div>
                    </div>
                `;
                return "等間隔すぎて、どれがセットかわからない...";
            } else {
                container.innerHTML = `
                    <div style="display:flex; gap:20px; background:white; padding:20px; border-radius:12px;">
                        <div style="display:flex; flex-direction:column; gap:8px; align-items:center;">
                            <div style="width:60px; height:60px; background:#818cf8; border-radius:8px;"></div>
                            <div style="width:100px; height:12px; background:#818cf8; opacity:0.5; border-radius:4px;"></div>
                        </div>
                        <div style="display:flex; flex-direction:column; gap:8px; align-items:center;">
                            <div style="width:60px; height:60px; background:#818cf8; border-radius:8px;"></div>
                            <div style="width:100px; height:12px; background:#818cf8; opacity:0.5; border-radius:4px;"></div>
                        </div>
                    </div>
                `;
                return "近づけることで「2つのグループ」だとわかる！";
            }
        }
    },
    // 14. 押した反応
    "motion-press": {
        title: "押した反応",
        category: "MOTION / 動き",
        sub: "ボタンを押した瞬間に凹んだり色が濃くなる動き。",
        sorutoMsg: "押せたら「押せたよ！」って言ってほしいよね。",
        merits: ["操作の確実性を伝える", "気持ちよさを生む"],
        demerits: ["過剰な動きは邪魔になる"],
        logicTitle: "フィードバック",
        logicDesc: "自分のアクションに対してリアクションがあることで、システムへの信頼感が生まれます。",
        checklist: ["ボタンを押した時に変化があるか？", "指で隠れて見えなくなっていないか？"],
        mistakes: [{ title: "反応がない", desc: "押せているのか不安になり、連打してしまいます。" }],
        quiz: { q: "ボタンを押した時、どうなるのがいい？", opts: ["無反応", "凹む"], ans: "凹む", comment: "反応があると安心するよね。" },
        try: "身の回りのスイッチを押してみよう。カチッという感触があるはず。",
        visualIcon: "mouse-pointer-click",
        visualColor: "#f472b6",
        renderUI: (type, container) => {
            if(type === 'bad') container.innerHTML = `<button style="background:white; color:#333; padding:10px 20px; border:none;">押す</button>`;
            else {
                container.innerHTML = `<button class="demo-btn" style="background:white; color:#3b82f6; padding:10px 20px; border-radius:8px; border:none; box-shadow:0 4px 0 #e2e8f0; transform:translateY(0); transition:0.1s;">Press</button>`;
                setTimeout(() => {
                    const btn = container.querySelector('.demo-btn');
                    if(btn) {
                        btn.onmousedown = () => { btn.style.transform='translateY(4px)'; btn.style.boxShadow='0 0 0 #e2e8f0'; };
                        btn.onmouseup = () => { btn.style.transform='translateY(0px)'; btn.style.boxShadow='0 4px 0 #e2e8f0'; };
                    }
                }, 100);
            }
            return type === 'bad' ? "押せたかわからない..." : "押した感触がある！";
        }
    },
    // 15. 広がるUI
    "motion-expand": {
        title: "広がるUI",
        category: "MOTION / 動き",
        sub: "必要なときだけ場所を取り、普段は小さく収まる工夫。",
        sorutoMsg: "普段は隠れてて、呼んだら出てくる忍者みたい！",
        merits: ["画面を広く使える", "必要な機能に集中できる"],
        demerits: ["機能があることに気づきにくい場合がある"],
        logicTitle: "プログレッシブディスクロージャー",
        logicDesc: "情報を段階的に表示することで、認知負荷を下げます。",
        checklist: ["よく使う機能まで隠していないか？", "展開アニメーションはスムーズか？"],
        mistakes: [{ title: "動きが遅すぎる", desc: "開くのに時間がかかるとイライラします。" }],
        quiz: { q: "スマホの検索バー、普段はどうする？", opts: ["全開", "アイコンだけ"], ans: "アイコンだけ", comment: "狭い画面ではアイコンだけにしておくとスッキリするね。" },
        try: "スマホのメニューを見てみよう。スクロールすると隠れるのもこの一種。",
        visualIcon: "maximize-2",
        visualColor: "#38bdf8",
        renderUI: (type, container) => {
            if(type === 'bad') {
                container.innerHTML = `<div style="border:1px solid #ccc; width:200px; padding:8px; font-size:14px; background:white; color:#999;">検索ワードを入力...</div>`;
                return "常に場所を取っていて邪魔かも...";
            } else {
                container.innerHTML = `
                    <div class="expand-search" style="display:flex; align-items:center; width:40px; height:40px; background:#38bdf8; border-radius:20px; overflow:hidden; transition:width 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); padding-left:10px; cursor:pointer; box-shadow:0 4px 10px rgba(56,189,248,0.4);">
                        <i data-lucide="search" style="min-width:20px; color:white;"></i>
                        <span style="margin-left:10px; color:white; font-weight:bold; white-space:nowrap; opacity:0; transition:opacity 0.3s;">Search...</span>
                    </div>
                `;
                setTimeout(() => {
                    const el = container.querySelector('.expand-search');
                    const text = el.querySelector('span');
                    if(el && text) {
                        el.onmouseenter = () => { el.style.width = '180px'; text.style.opacity = '1'; };
                        el.onmouseleave = () => { el.style.width = '40px'; text.style.opacity = '0'; };
                    }
                }, 100);
                return "ホバーしてみて！必要な時だけ広がるよ。";
            }
        }
    }
};

// ==========================================
// Initialization & Main Logic
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    if(typeof lucide !== 'undefined') lucide.createIcons();
    initStarfield();
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');

    // ★追加: ハンバーガーメニュー制御
    window.toggleMobileMenu = function() {
        const menu = document.querySelector('.mobile-menu');
        const hamburger = document.querySelector('.hamburger');
        if(menu) menu.classList.toggle('active');
        if(hamburger) hamburger.classList.toggle('active');
    };

    const cursor = document.getElementById('custom-cursor');
    if(cursor) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });
        document.querySelectorAll('a, button').forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('hovered'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('hovered'));
        });
    }

    if (id && KUFUU_DATA[id]) {
        renderDetail(id);
    } else {
        const content = document.getElementById('detail-content');
        const error = document.getElementById('error-content');
        if(content) content.style.display = 'none';
        if(error) error.style.display = 'block';
    }
    
    if(typeof gsap !== 'undefined') {
        gsap.utils.toArray('.fade-in-up').forEach(el => {
            gsap.fromTo(el, 
                { opacity: 0, y: 30 },
                { scrollTrigger: { trigger: el, start: "top 85%" }, opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
            );
        });
    }
});

function renderDetail(id) {
    const data = KUFUU_DATA[id];
    
    setText('d-category', data.category);
    setText('d-title', data.title);
    setText('d-sub', data.sub);
    setText('d-soruto-comment', data.sorutoMsg);
    setText('d-logic-title', data.logicTitle);
    setText('d-logic-desc', data.logicDesc);

    const visualArea = document.getElementById('d-visual-area');
    if(visualArea) {
        visualArea.innerHTML = `<i data-lucide="${data.visualIcon}" style="width:100px; height:100px; color:${data.visualColor};"></i>`;
    }

    const logicVisual = document.getElementById('d-logic-img');
    if(logicVisual) {
        logicVisual.innerHTML = `<i data-lucide="${data.visualIcon}" style="width:80px; height:80px; color:${data.visualColor}; opacity:0.8;"></i>`;
    }

    createList('d-merits', data.merits);
    createList('d-demerits', data.demerits);

    const checklist = document.getElementById('d-checklist');
    if(checklist) {
        checklist.innerHTML = "";
        data.checklist.forEach((p, i) => {
            const li = document.createElement('li');
            li.innerHTML = `<label><input type="checkbox"> ${p}</label>`;
            li.querySelector('input').addEventListener('change', checkAllStatus);
            checklist.appendChild(li);
        });
    }

    const mistakeArea = document.getElementById('d-mistakes');
    if(mistakeArea) {
        mistakeArea.innerHTML = "";
        data.mistakes.forEach(m => {
            const div = document.createElement('div');
            div.className = 'accordion-item';
            div.innerHTML = `
                <div class="acc-header" onclick="this.parentElement.classList.toggle('open')">
                    <span>BAD: ${m.title}</span>
                    <i data-lucide="chevron-down"></i>
                </div>
                <div class="acc-content"><p>${m.desc}</p></div>
            `;
            mistakeArea.appendChild(div);
        });
    }

    setText('d-quiz-q', `Q. ${data.quiz.q}`);
    const quizOpts = document.getElementById('d-quiz-opts');
    if(quizOpts) {
        quizOpts.innerHTML = '';
        data.quiz.opts.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'q-btn'; 
            btn.textContent = opt;
            btn.onclick = () => answerQuiz(opt, data.quiz);
            quizOpts.appendChild(btn);
        });
    }

    window.currentRenderUI = data.renderUI;
    setCompare('bad');
    
    const keys = Object.keys(KUFUU_DATA);
    const currIdx = keys.indexOf(id);
    const nextId = keys[(currIdx + 1) % keys.length];
    const linkNext = document.getElementById('link-next-tip');
    if(linkNext) linkNext.href = `kufuu_detail.html?id=${nextId}`;

    lucide.createIcons();
}

function setText(id, text) {
    const el = document.getElementById(id);
    if(el) el.textContent = text;
}

function createList(id, items) {
    const ul = document.getElementById(id);
    if(!ul) return;
    ul.innerHTML = '';
    items.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        ul.appendChild(li);
    });
}

function setCompare(type) {
    const container = document.getElementById('ui-preview-area');
    const caption = document.getElementById('ui-caption');
    
    document.querySelectorAll('.switch-btn').forEach(btn => btn.classList.remove('active'));
    const btns = document.querySelectorAll('.switch-btn');
    if(type === 'bad' && btns[0]) btns[0].classList.add('active');
    else if(btns[1]) btns[1].classList.add('active');

    if(window.currentRenderUI && container) {
        const capText = window.currentRenderUI(type, container);
        if(caption) {
            caption.textContent = capText;
            caption.className = `ui-caption ${type}`;
        }
        lucide.createIcons();
    }
}

function checkAllStatus() {
    const checks = document.querySelectorAll('.check-list input[type="checkbox"]');
    const allChecked = Array.from(checks).every(c => c.checked);
    const feedback = document.getElementById('check-feedback');
    if(feedback) {
        if(allChecked) {
            feedback.classList.remove('hidden');
            gsap.fromTo(feedback, {scale: 0.8, opacity: 0}, {scale: 1, opacity: 1, duration: 0.5, ease: "back.out"});
        } else {
            feedback.classList.add('hidden');
        }
    }
}

function answerQuiz(selected, quizData) {
    const ansArea = document.getElementById('d-quiz-ans');
    const ansText = document.getElementById('d-quiz-text');
    if(!ansArea || !ansText) return;
    
    ansArea.classList.remove('hidden');
    if (selected === quizData.ans) {
        ansText.innerHTML = `<span style="color:#86efac; font-weight:bold; font-size:1.2em;">正解！</span><br>${quizData.comment}`;
    } else {
        ansText.innerHTML = `<span style="color:#fca5a5; font-weight:bold;">おしい...</span><br>正解は「${quizData.ans}」だよ。<br>${quizData.comment}`;
    }
    gsap.fromTo(ansArea, {y: 10, opacity: 0}, {y: 0, opacity: 1, duration: 0.5});
}

function initStarfield() {
    const canvas = document.getElementById("starCanvas");
    if(!canvas) return;
    const ctx = canvas.getContext("2d");
    let w, h, stars = [];
    const resize = () => {
        w = window.innerWidth; h = window.innerHeight;
        canvas.width = w; canvas.height = h;
        stars = [];
        for(let i=0; i<100; i++) stars.push({ x: Math.random()*w, y: Math.random()*h, size: Math.random()*2, speed: Math.random()*0.5 });
    };
    window.addEventListener('resize', resize);
    resize();
    const animate = () => {
        ctx.fillStyle = "#0b1120"; ctx.fillRect(0,0,w,h);
        ctx.fillStyle = "#fff";
        stars.forEach(s => { s.y -= s.speed; if(s.y < 0) s.y = h; ctx.beginPath(); ctx.arc(s.x, s.y, s.size, 0, Math.PI*2); ctx.fill(); });
        requestAnimationFrame(animate);
    };
    animate();
}