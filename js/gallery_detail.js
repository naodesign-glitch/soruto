/* ==========================================
   Detail Page Logic (Fully Synced with SCSS)
   ========================================== */

const GALLERY_DATA_DETAIL = [
    // --- Screens (101~113) ---
    { 
        id: 101, type: "screen", title: "ログイン画面", category: "login", elements: ["form", "cta"], level: "beginner", 
        desc: "ユーザーがサービスに初めて触れる、重要なゲートウェイとなるログイン画面です。\n\nこのデザインの最大の目的は、「迷わせないこと」と「安心感を与えること」にあります。画面構成は極めてシンプルで、ロゴ、入力フォーム、そしてログインボタン（CTA）のみで構成されています。\n\n配色は信頼感のあるブルーを基調とし、入力フィールドは指でタップしやすい十分な高さを確保しています。",
        points: ["視線の分散を防ぐシングルカラムレイアウト。", "入力必須項目を明確にするプレースホルダー。", "背景色とのコントラストを強めたCTAボタン。"],
        usage: [ { label: "アプリ起動時", icon: "smartphone" }, { label: "会員限定エリア", icon: "lock" } ],
        img: "./images/01sign.jpg", tags: ["Login", "Mobile"], likes: 120 
    },
    { 
        id: 102, type: "screen", title: "ダッシュボード", category: "dashboard", elements: ["space", "hierarchy"], level: "advanced", 
        desc: "複雑なデータを一目で把握するための管理画面UIです。\n\n情報の優先度に基づいてカードの大きさを変え、視線の動きをコントロールしています。グラフや数値などの重要な情報は上部に配置し、詳細なリストは下部に配置することで、概要から詳細へという自然な情報の流れを作っています。", 
        points: ["情報の階層化による視線誘導。", "カードUIによる情報のグルーピング。", "余白を十分に取った圧迫感のない配置。"], 
        usage: [{label:"管理ツール", icon:"bar-chart-2"}, {label:"分析画面", icon:"activity"}], 
        img: "./images/42to_dolist.jpg", tags: ["Admin", "Data"], likes: 200 
    },
    { 
        id: 103, type: "screen", title: "音楽プレイヤー", category: "media", elements: ["color", "feedback"], level: "intermediate", 
        desc: "没入感を高めるためのダークモード基調の音楽プレイヤーです。\n\nアルバムアートワークを主役に据え、操作ボタンは親指が届きやすい下部に集約しています。再生バーやボタンには微細なグラデーションとシャドウを施し、触れたくなるような質感を表現しています。", 
        points: ["没入感を高めるダークテーマ。", "片手操作を考慮したボタン配置。", "再生状態を視覚的に伝えるプログレスバー。"], 
        usage: [{label:"音楽アプリ", icon:"music"}, {label:"音声配信", icon:"mic"}], 
        img: "./images/09music_player.jpg", tags: ["Music", "App"], likes: 85 
    },
    { 
        id: 104, type: "screen", title: "商品カード", category: "ec", elements: ["cta", "space"], level: "beginner", 
        desc: "ECサイトにおける商品一覧用のカードデザインです。\n\n商品画像の魅力を最大化するために余計な装飾を削ぎ落としています。価格と「カートに入れる」ボタンの距離を近づけることで、購入の意思決定から行動までのスムーズな動線を設計しています。", 
        points: ["商品画像を大きく見せるレイアウト。", "価格とCTAの近接配置。", "セールの視認性を高めるバッジ配置。"], 
        usage: [{label:"ECサイト", icon:"shopping-bag"}, {label:"商品一覧", icon:"grid"}], 
        img: "./images/商品カード.jpg", tags: ["EC", "Card"], likes: 150 
    },
    { 
        id: 105, type: "screen", title: "チャット一覧", category: "sns", elements: ["hierarchy", "typo"], level: "intermediate", 
        desc: "メッセージの未読・既読状態を一目で識別できるチャットリスト画面です。\n\nアイコン、名前、最新メッセージ、時間の4要素をバランスよく配置し、太字と色使いで未読状態を強調しています。スワイプ操作を想定したリストの高さ設定もポイントです。", 
        points: ["未読状態の視覚的な強調。", "サムネイルによる送信者の識別。", "リストの可読性を高める十分なパディング。"], 
        usage: [{label:"メッセージアプリ", icon:"message-circle"}, {label:"SNS", icon:"users"}], 
        img: "./images/13direct_message.jpg", tags: ["Chat", "List"], likes: 90 
    },
    { 
        id: 106, type: "screen", title: "設定メニュー", category: "system", elements: ["space", "icon"], level: "beginner", 
        desc: "ユーザーが迷わず目的の項目に辿り着ける設定画面です。\n\n関連する項目ごとにグループ化し、余白で区切ることで情報のまとまりを表現しています。各項目の先頭にアイコンを配置することで、文字を読まなくても内容を直感的に推測できるようにしています。", 
        points: ["アイコンによる視認性の向上。", "グルーピングによる情報の整理。", "タップエリアを確保したリストデザイン。"], 
        usage: [{label:"マイページ", icon:"settings"}, {label:"アプリ設定", icon:"tool"}], 
        img: "./images//07settings.jpg", tags: ["Settings", "Nav"], likes: 70 
    },
    { 
        id: 109, type: "screen", title: "プロフィール", category: "sns", elements: ["hierarchy", "image"], level: "beginner", 
        desc: "ユーザーの個性を表現するためのプロフィール画面です。\n\nヘッダー画像とアイコンを重ねることで奥行きを出し、フォローボタン等のアクション要素は親指の届く範囲に配置しています。数字（フォロワー数など）を強調し、ステータスを一目でわかるようにしています。", 
        points: ["階層構造による視線の誘導。", "重要な数字データの強調。", "アクションボタンの配置最適化。"], 
        usage: [{label:"SNSプロフィール", icon:"user"}, {label:"ポートフォリオ", icon:"briefcase"}], 
        img: "./images/06user_profile .jpg", tags: ["Profile", "User"], likes: 95 
    },
    { 
        id: 110, type: "screen", title: "マップ検索", category: "system", elements: ["ui", "map"], level: "advanced", 
        desc: "地図情報と検索結果をシームレスに融合させたUIです。\n\n地図の視認性を損なわないように、検索バーや結果カードをフローティング（浮いた状態）で配置しています。現在地ボタンやズーム操作は片手で操作しやすい右下に集約しています。", 
        points: ["地図の可視領域を最大化。", "フローティングカードによる情報表示。", "片手操作を意識したボタン配置。"], 
        usage: [{label:"地図アプリ", icon:"map"}, {label:"店舗検索", icon:"search"}], 
        img: "./images/20location_tracker.jpg", tags: ["Map", "Search"], likes: 160 
    },
    { 
        id: 111, type: "screen", title: "カレンダー", category: "system", elements: ["grid", "color"], level: "intermediate", 
        desc: "予定の有無と内容を把握しやすい月表示カレンダーです。\n\nグリッドレイアウトをベースに、現在の日付や選択中の日付を円形のハイライトで強調しています。予定がある日には小さなドットを表示し、情報を詰め込みすぎずに存在を知らせる工夫をしています。", 
        points: ["グリッドによる整然としたレイアウト。", "色によるステータスの識別。", "最小限のインジケーター（ドット）表示。"], 
        usage: [{label:"スケジュール帳", icon:"calendar"}, {label:"予約システム", icon:"clock"}], 
        img: "./images/38calendar.png", tags: ["Calendar", "Date"], likes: 105 
    },
    { 
        id: 112, type: "screen", title: "天気予報", category: "system", elements: ["list", "icon"], level: "beginner", 
        desc: "ビジュアルで直感的に伝える天気予報UIです。\n\n画面上部に高品質な天気アイコンと気温を大きく配置し、文字を読む前に状況を理解できるようにしています。週間予報はリスト形式で下部に配置し、情報の優先度に応じたサイズコントラストをつけています。", 
        points: ["ビジュアル優先の情報設計。", "情報の優先度に基づくサイズ変更。", "直感的なアイコンの使用。"], 
        usage: [{label:"ウィジェット", icon:"cloud"}, {label:"旅行アプリ", icon:"plane"}], 
        img: "./images/37weather_design.jpg", tags: ["Weather", "Icon"], likes: 80 
    },
    { 
        id: 113, type: "screen", title: "カメラ", category: "media", elements: ["ui", "feedback"], level: "intermediate", 
        desc: "撮影体験を阻害しない、ミニマルなカメラUIです。\n\n被写体を確認するビューファインダーを最大化し、シャッターボタン以外の要素を目立たないように配置しています。モード切替はスワイプで直感的に行えるように設計されています。", 
        points: ["ビューファインダーの最大化。", "半透明UIによる視界の確保。", "直感的なジェスチャー操作。"], 
        usage: [{label:"カメラアプリ", icon:"camera"}, {label:"QRスキャン", icon:"maximize"}], 
        img: "./images/73virtual_reality.png", tags: ["Camera", "Media"], likes: 110 
    },

    // --- Buttons (201~210) ---
    { 
        id: 201, type: "button", title: "Primary Button", category: "system", elements: ["cta", "color"], level: "beginner", 
        desc: "画面内で最も重要なアクション（保存、送信、購入など）を促すためのボタンです。\n\nブランドカラーを使用し、ドロップシャドウで少し浮かせることで「押せる」感覚（アフォーダンス）を強調しています。", 
        points: ["最も目立つ色を使用。", "立体感によるアフォーダンス。", "十分な余白と太字フォント。"], 
        usage: [{label:"フォーム送信", icon:"send"}, {label:"確定アクション", icon:"check"}],
        html: '<button style="background:#3b82f6; color:white; padding:10px 24px; border-radius:8px; border:none; font-weight:bold; box-shadow: 0 4px 6px rgba(59, 130, 246, 0.25);">Save</button>', tags: ["Primary", "CTA"], likes: 50 
    },
    { 
        id: 202, type: "button", title: "Ghost Button", category: "system", elements: ["space", "typo"], level: "beginner", 
        desc: "キャンセルや戻るなど、副次的なアクションに使用するボタンです。\n\n背景色を抜くことでメインボタンとの重要度の差を明確にしています。枠線と文字色を統一し、洗練された印象を与えます。", 
        points: ["背景透過による優先度の調整。", "メインボタンとの対比。", "軽やかな見た目。"], 
        usage: [{label:"キャンセル", icon:"x"}, {label:"詳細を見る", icon:"info"}],
        html: '<button style="background:transparent; color:#3b82f6; padding:10px 24px; border:2px solid #3b82f6; border-radius:8px; font-weight:bold;">Cancel</button>', tags: ["Secondary", "Ghost"], likes: 40 
    },
    { 
        id: 203, type: "button", title: "FAB (Floating)", category: "media", elements: ["shadow", "cta"], level: "intermediate", 
        desc: "画面の最前面に常に表示されるフローティングアクションボタン（FAB）です。\n\n新規作成や追加など、その画面で最も頻繁に行われるアクションに割り当てられます。円形で影をつけることで、コンテンツの上に浮いていることを表現します。", 
        points: ["常にアクセス可能な配置。", "強力なアフォーダンス。", "画面の主役となるアクション。"], 
        usage: [{label:"新規作成", icon:"plus"}, {label:"ツイート", icon:"edit-2"}],
        html: '<button style="width:50px; height:50px; background:#fcd34d; color:#0b1120; border-radius:50%; border:none; display:flex; align-items:center; justify-content:center; box-shadow:0 4px 10px rgba(0,0,0,0.3);"><i data-lucide="plus"></i></button>', tags: ["FAB", "Mobile"], likes: 80 
    },
    { 
        id: 204, type: "button", title: "Icon Button", category: "system", elements: ["icon", "space"], level: "beginner", 
        desc: "テキストを伴わず、アイコンのみで機能を伝える省スペースなボタンです。\n\nツールバーやヘッダーなど、スペースが限られた場所で有効です。誰にでも意味が伝わるユニバーサルなアイコン選定が重要です。", 
        points: ["省スペース化。", "直感的な機能伝達。", "ツールバーへの配置に最適。"], 
        usage: [{label:"設定", icon:"settings"}, {label:"編集", icon:"edit"}],
        html: '<button style="background:#1e293b; color:white; padding:10px; border-radius:8px; border:none;"><i data-lucide="settings"></i></button>', tags: ["Icon", "Tool"], likes: 30 
    },
    { 
        id: 205, type: "button", title: "Disabled", category: "system", elements: ["color", "feedback"], level: "intermediate", 
        desc: "条件が満たされていないため、操作できない状態を示すボタンです。\n\nグレーアウトさせることで「現在は押せない」ことを視覚的に伝えます。フォームの入力完了待ちなどで使用されます。", 
        points: ["操作不可の視覚的フィードバック。", "誤操作の防止。", "システム状態の提示。"], 
        usage: [{label:"入力待ち", icon:"loader"}, {label:"権限なし", icon:"lock"}],
        html: '<button style="background:#475569; color:#94a3b8; padding:10px 24px; border-radius:8px; border:none; font-weight:bold; cursor:not-allowed;">Send</button>', tags: ["State", "Form"], likes: 25 
    },
    { 
        id: 206, type: "button", title: "Loading", category: "system", elements: ["feedback", "motion"], level: "advanced", 
        desc: "処理が実行中であることをユーザーに伝えるローディング状態のボタンです。\n\nスピナーなどのアニメーションを表示し、ボタンを無効化することで、二重送信などのエラーを防ぎつつ、システムが応答している安心感を与えます。", 
        points: ["処理状況のフィードバック。", "二重操作の防止。", "待機時間のストレス軽減。"], 
        usage: [{label:"送信中", icon:"upload-cloud"}, {label:"読み込み中", icon:"refresh-cw"}],
        html: '<button style="background:#3b82f6; color:white; padding:10px 24px; border-radius:8px; border:none; font-weight:bold; opacity:0.8;"><i data-lucide="loader-2" class="animate-spin"></i></button>', tags: ["State", "Feedback"], likes: 60 
    },
    { 
        id: 207, type: "button", title: "Destructive", category: "system", elements: ["color", "alert"], level: "intermediate", 
        desc: "データの削除や解約など、取り返しのつかない危険な操作を示すボタンです。\n\n警告色である赤色を使用し、ユーザーに注意を促します。誤って押さないように、他のボタンと距離を離して配置することもあります。", 
        points: ["警告色（赤）の使用。", "心理的なブレーキ。", "誤操作防止。"], 
        usage: [{label:"削除", icon:"trash-2"}, {label:"退会", icon:"log-out"}],
        html: '<button style="background:#ef4444; color:white; padding:10px 24px; border-radius:8px; border:none; font-weight:bold;">Delete</button>', tags: ["Danger", "Alert"], likes: 45 
    },
    { 
        id: 208, type: "button", title: "Toggle Switch", category: "system", elements: ["motion", "state"], level: "intermediate", 
        desc: "設定のオン/オフを即座に切り替えるためのスイッチUIです。\n\n現実のスイッチを模したデザインで、現在の状態（ONかOFFか）が直感的にわかります。即時反映される設定項目に適しています。", 
        points: ["状態の可視化。", "直感的なメタファー。", "即時反映の設定。"], 
        usage: [{label:"通知設定", icon:"bell"}, {label:"モード切替", icon:"toggle-right"}],
        html: '<div style="width:50px; height:28px; background:#3b82f6; border-radius:14px; position:relative;"><div style="width:24px; height:24px; background:white; border-radius:50%; position:absolute; top:2px; right:2px;"></div></div>', tags: ["Switch", "Form"], likes: 70 
    },
    { 
        id: 209, type: "button", title: "Chip", category: "ec", elements: ["typo"], level: "beginner", 
        desc: "カテゴリ選択やタグ付けに使用されるコンパクトな要素です。\n\nボタンよりも軽量で、複数選択やフィルタリングなどの操作に適しています。角丸を大きく取ることで、親しみやすさを出しています。", 
        points: ["コンパクトな形状。", "複数並列のしやすさ。", "情報の分類。"], 
        usage: [{label:"タグ選択", icon:"tag"}, {label:"フィルタ", icon:"filter"}],
        html: '<span style="background:rgba(255,255,255,0.1);padding:6px 12px;border-radius:99px;color:white;border:1px solid #555;">Option</span>', tags: ["Chip", "UI"], likes: 60 
    },
    { 
        id: 210, type: "button", title: "Link", category: "system", elements: ["typo"], level: "beginner", 
        desc: "文章中やフッターなどで使用される、画面遷移のためのテキストリンクです。\n\n青色や下線を使用することで、通常のテキストとは異なる「クリック可能」な要素であることを示します。", 
        points: ["テキストとの差別化。", "控えめな主張。", "情報の参照。"], 
        usage: [{label:"詳細ページ", icon:"external-link"}, {label:"利用規約", icon:"file-text"}],
        html: '<span style="color:#3b82f6;text-decoration:underline;cursor:pointer;">Read more</span>', tags: ["Text", "Link"], likes: 60 
    },

    // --- Icons (301~316) ---
    { id: 301, type: "icon", title: "Home", category: "system", html: '<i data-lucide="home" size="32"></i>', 
      desc: "アプリケーションのホーム画面へ戻るための標準的なアイコンです。", points: ["普遍的な認知度。", "ナビゲーションの起点。"], usage: [{label:"タブバー", icon:"layout"}], tags: ["Nav"], likes: 10 },
    { id: 302, type: "icon", title: "Search", category: "system", html: '<i data-lucide="search" size="32"></i>', 
      desc: "コンテンツを検索するためのルーペ型アイコンです。", points: ["探す行為のメタファー。", "入力フィールドとのセット。"], usage: [{label:"検索", icon:"search"}], tags: ["Action"], likes: 10 },
    { id: 303, type: "icon", title: "Menu", category: "system", html: '<i data-lucide="menu" size="32"></i>', 
      desc: "ハンバーガーメニューとも呼ばれ、ナビゲーションドロワーを開くアイコンです。", points: ["機能の格納。", "スペースの節約。"], usage: [{label:"ドロワー", icon:"menu"}], tags: ["Nav"], likes: 10 },
    { id: 304, type: "icon", title: "User", category: "sns", html: '<i data-lucide="user" size="32"></i>', 
      desc: "ユーザー自身やプロフィールを表す人型アイコンです。", points: ["個人の識別。", "アカウント管理。"], usage: [{label:"プロフィール", icon:"user"}], tags: ["Profile"], likes: 10 },
    { id: 305, type: "icon", title: "Bell", category: "sns", html: '<i data-lucide="bell" size="32"></i>', 
      desc: "通知やアラートを表すベル型アイコンです。", points: ["注意喚起。", "新着情報の提示。"], usage: [{label:"お知らせ", icon:"bell"}], tags: ["Status"], likes: 10 },
    { id: 306, type: "icon", title: "Heart", category: "sns", html: '<i data-lucide="heart" size="32"></i>', 
      desc: "「いいね」やお気に入りを表すハート型アイコンです。", points: ["好意の表現。", "ブックマーク機能。"], usage: [{label:"いいね", icon:"heart"}], tags: ["Action"], likes: 10 },
    { id: 307, type: "icon", title: "Edit", category: "system", html: '<i data-lucide="edit" size="32"></i>', 
      desc: "内容を編集・修正するためのペン型アイコンです。", points: ["書き込みのメタファー。", "操作の開始。"], usage: [{label:"編集画面", icon:"edit-2"}], tags: ["Action"], likes: 10 },
    { id: 308, type: "icon", title: "Trash", category: "system", html: '<i data-lucide="trash-2" size="32"></i>', 
      desc: "削除や廃棄を表すゴミ箱型アイコンです。", points: ["破棄のメタファー。", "危険な操作の示唆。"], usage: [{label:"削除", icon:"trash"}], tags: ["Action"], likes: 10 },
    { id: 309, type: "icon", title: "Settings", category: "system", html: '<i data-lucide="settings" size="32"></i>', 
      desc: "設定や調整を表す歯車型アイコンです。", points: ["機械的な調整。", "システム管理。"], usage: [{label:"設定画面", icon:"settings"}], tags: ["Action"], likes: 10 },
    { id: 310, type: "icon", title: "Check", category: "system", html: '<i data-lucide="check-circle" size="32"></i>', 
      desc: "完了や成功、承認を表すチェックマークです。", points: ["肯定的フィードバック。", "完了状態。"], usage: [{label:"完了画面", icon:"check-circle"}], tags: ["Status"], likes: 10 },
    { id: 311, type: "icon", title: "Alert", category: "system", html: '<i data-lucide="alert-triangle" size="32"></i>', 
      desc: "注意や警告を表すエクスクラメーションマークです。", points: ["注意喚起。", "エラー表示。"], usage: [{label:"エラー", icon:"alert-triangle"}], tags: ["Status"], likes: 10 },
    { id: 312, type: "icon", title: "Image", category: "media", html: '<i data-lucide="image" size="32"></i>', 
      desc: "画像ファイルや写真を表すアイコンです。", points: ["メディアの種類。", "プレースホルダー。"], usage: [{label:"ギャラリー", icon:"image"}], tags: ["Media"], likes: 10 },
    { id: 313, type: "icon", title: "Video", category: "media", html: '<i data-lucide="video" size="32"></i>', 
      desc: "動画ファイルや録画機能を表すアイコンです。", points: ["動画コンテンツ。", "撮影機能。"], usage: [{label:"プレイヤー", icon:"video"}], tags: ["Media"], likes: 10 },
    { id: 314, type: "icon", title: "Share", category: "sns", html: '<i data-lucide="share-2" size="32"></i>', 
      desc: "コンテンツを外部へ共有するためのアイコンです。", points: ["拡散。", "接続のメタファー。"], usage: [{label:"シェア", icon:"share-2"}], tags: ["Action"], likes: 10 },
    { id: 315, type: "icon", title: "Download", category: "system", html: '<i data-lucide="download" size="32"></i>', 
      desc: "データを保存・ダウンロードするためのアイコンです。", points: ["取り込み。", "オフライン保存。"], usage: [{label:"保存", icon:"download"}], tags: ["Action"], likes: 10 },
    { id: 316, type: "icon", title: "Arrow", category: "system", html: '<i data-lucide="arrow-right" size="32"></i>', 
      desc: "方向や進行を表す矢印アイコンです。", points: ["誘導。", "次のステップ。"], usage: [{label:"次へ", icon:"arrow-right"}], tags: ["Nav"], likes: 10 },
];

const THEME_DATA = {
    'space': { 
        title: "余白の美学 (White Space)", 
        desc: "デザインにおける余白（ホワイトスペース）は、単なる「空きスペース」ではありません。それは情報を整理し、ユーザーの視線を誘導し、ブランドの品格を決定づける「能動的なデザイン要素」です。", 
        points: ["情報のグループ化", "視線の誘導", "高級感の演出"], 
        usage: [{label:"LP", icon:"layout"}], 
        filterKey: "space",
        textbook: [
            {
                title: "1. 関連性の法則 (Law of Proximity)",
                body: "「関係のある要素は近づけ、関係のない要素は離す」。これは余白の基本ルールです。例えば、見出しと本文の間隔よりも、そのセクションと次のセクションの間隔を広く取ることで、ユーザーは直感的に情報のまとまりを認識できます。"
            },
            {
                title: "2. マクロ余白とミクロ余白",
                body: "画面全体のレイアウトを構成する「マクロ余白」（セクション間のマージンなど）と、文字間や行間などの細かい「ミクロ余白」。この2つを意識的に使い分けることで、読みやすさと美しさが両立します。特に行間（line-height）は1.5〜1.8程度確保すると可読性が上がります。"
            },
            {
                title: "3. 8の倍数ルール",
                body: "多くのプロデザイナーは、余白やサイズを「8px」の倍数（8, 16, 24, 32, 40...）で管理しています。基準を設けることで、迷いがなくなり、デザイン全体に統一感とリズムが生まれます。スマホ画面の解像度とも相性が良い数値です。"
            }
        ]
    },
    'color': { 
        title: "色の役割 (Color Theory)", 
        desc: "色はインターフェースにおいて、感情を喚起し、機能（重要度や状態）を直感的に伝える役割を担っています。", 
        points: ["機能の伝達", "感情への訴求", "ブランド統一"], 
        usage: [{label:"アラート", icon:"alert-circle"}], 
        filterKey: "color",
        textbook: [
            {
                title: "1. 配色の黄金比「70：25：5」",
                body: "画面の色使いに迷ったら、この比率を意識しましょう。<br>・ベースカラー（背景など）：70%<br>・アソートカラー（ブランド色）：25%<br>・アクセントカラー（CTAなど）：5%<br>このバランスを守るだけで、素人っぽさが消え、まとまりのある画面になります。"
            },
            {
                title: "2. 色の機能的役割 (Semantic Color)",
                body: "UIデザインでは、色に意味を持たせることが重要です。一般的に、赤は「エラー・削除」、緑は「成功・完了」、青は「リンク・情報」を表します。ユーザーのメンタルモデル（既存の知識）に反する色使い（例：削除ボタンを緑にする）は避けましょう。"
            },
            {
                title: "3. コントラスト比とアクセシビリティ",
                body: "背景色と文字色のコントラスト比は、可読性に直結します。薄いグレーの文字はスタイリッシュに見えますが、読みにくければ機能しません。WCAG基準などを参考に、誰にでも見やすい配色を心がけることが、良いUXの第一歩です。"
            }
        ]
    },
    'form': { 
        title: "入力フォーム (Form Design)", 
        desc: "入力フォームは、ユーザーとシステムが対話する接点です。入力の負担を減らし、エラーを未然に防ぐ設計が求められます。", 
        points: ["認知負荷の低減", "明確なフィードバック", "入力支援"], 
        usage: [{label:"登録", icon:"user-plus"}], 
        filterKey: "form",
        textbook: [
            {
                title: "1. 項目は一列に並べる",
                body: "視線の移動をスムーズにするため、入力項目は基本「縦一列」に配置します。Z字型に視線を動かす必要がある複数列のレイアウトは、ユーザーの疲労感を高め、入力完了率を下げてしまう原因になります。"
            },
            {
                title: "2. ラベルと入力欄の距離",
                body: "「何の入力欄か」を示すラベルは、入力フィールドのすぐ近く（通常は真上）に配置します。距離が離れていると、ユーザーは結びつけに脳のエネルギーを使ってしまいます。スマホでは特に「トップアライン（上揃え）」が推奨されます。"
            },
            {
                title: "3. エラーは「その場」で出す",
                body: "送信ボタンを押してから「エラーがあります」と言うのは不親切です。入力が終わったタイミング（フォーカスが外れた時など）で、即座に、かつ「具体的にどう直せばいいか」を伝えるメッセージを表示しましょう。"
            }
        ]
    },
    'cta': { 
        title: "CTAボタン (Call To Action)", 
        desc: "行動を促す最重要ボタン。色、サイズ、配置によってクリック率が大きく変わります。", 
        points: ["高い視認性", "明確なラベル", "アフォーダンス"], 
        usage: [{label:"購入", icon:"shopping-cart"}], 
        filterKey: "cta",
        textbook: [
            {
                title: "1. 迷わせない「配置」",
                body: "CTAボタンは、ユーザーが画面をスキャンした後の「終点」に置くのが基本です。F型やZ型の視線の流れを意識し、自然に行き着く場所に配置します。また、周囲に十分な余白を取り、他の要素に埋もれないようにします。"
            },
            {
                title: "2. 押せることを伝える「アフォーダンス」",
                body: "フラットデザインでも、ボタンには「ボタンらしさ」が必要です。微かなドロップシャドウや、角丸、立体感のあるグラデーションなどを用いて、「これはクリックできる要素だ」と直感的に認識させる工夫が必要です。"
            },
            {
                title: "3. 行動を促す「マイクロコピー」",
                body: "ボタンのラベルは「送信」のようなシステム的な言葉よりも、「無料で登録する」「資料をもらう」のように、ユーザーが得られるベネフィットや具体的な行動を含めると、クリック率が向上します。"
            }
        ]
    }
};

document.addEventListener("DOMContentLoaded", () => {
    initCursor();
    initStarfield();

    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    const theme = params.get('theme');

    const itemView = document.getElementById('item-detail-view');
    const themeView = document.getElementById('theme-detail-view');

    if (id) {
        const item = GALLERY_DATA_DETAIL.find(d => d.id == id);
        if (item) {
            itemView.classList.remove('hidden');
            renderItemDetail(item);
        } else {
            window.location.href = 'gallery.html';
        }
    } else if (theme) {
        const themeInfo = THEME_DATA[theme];
        if (themeInfo) {
            themeView.classList.remove('hidden');
            renderThemeDetail(themeInfo, theme);
        } else {
            window.location.href = 'gallery.html';
        }
    } else {
        // IDもテーマもない場合は何もしない
    }

    if(typeof lucide !== 'undefined') lucide.createIcons();
});

function initCursor() {
    const cursor = document.getElementById('custom-cursor');
    if(!cursor) return;
    cursor.style.left = '-100px'; 
    cursor.style.top = '-100px';

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    document.addEventListener('mouseover', (e) => {
        if (e.target.closest('a, button, .back-btn, .gallery-card, .usage-card')) {
            cursor.classList.add('hovered');
        } else {
            cursor.classList.remove('hovered');
        }
    });
}

function renderItemDetail(item) {
    document.title = `${item.title} | Soruto Gallery`;
    
    const imgArea = document.getElementById('detail-img-area');
    const card = document.createElement('div');
    
    if (item.type === 'screen') {
        card.className = 'gallery-card card-screen';
        const imgContent = item.img 
            ? `<img src="${item.img}" alt="${item.title}">` 
            : `<div class="mock-ui"><i data-lucide="layout" style="margin-right:8px;"></i>${item.title}</div>`;
        
        card.innerHTML = `
            <div class="card-img-wrapper">${imgContent}</div>
            <div class="card-content">
                <h3>${item.title}</h3>
            </div>
        `;
    } else {
        card.className = 'gallery-card';
        let visual = item.type === 'button' 
            ? `<div class="card-demo-area">${item.html}</div>` 
            : `<div class="card-icon-area" style="color:#3b82f6; transform:scale(2);">${item.html}</div>`;
        
        card.innerHTML = `${visual}<div class="card-content"><h3>${item.title}</h3></div>`;
    }
    imgArea.innerHTML = ''; 
    imgArea.appendChild(card);

    document.getElementById('detail-cat').innerText = item.category.toUpperCase();
    
    const dateEl = document.getElementById('detail-date');
    if(dateEl) dateEl.innerText = ""; 

    document.getElementById('detail-title').innerText = item.title;
    document.getElementById('detail-desc').innerText = item.desc;

    const extraContainer = document.getElementById('detail-extra-content');
    extraContainer.innerHTML = generateExtraContent(item);
    
    const tagsArea = document.getElementById('detail-tags');
    if (item.tags) tagsArea.innerHTML = item.tags.map(t => `<span class="tag-pill">#${t}</span>`).join('');
    
    if(typeof lucide !== 'undefined') lucide.createIcons();
}

function renderThemeDetail(info, key) {
    document.title = `${info.title} | Soruto Gallery`;
    document.getElementById('theme-title').innerText = info.title;
    document.getElementById('theme-desc').innerText = info.desc;

    const extraContainer = document.getElementById('theme-extra-content');
    if(extraContainer) extraContainer.innerHTML = generateExtraContent(info);

    const examplesSection = document.querySelector('.theme-examples');
    const heading = examplesSection.querySelector('h2');
    const grid = document.getElementById('theme-grid');
    
    heading.innerHTML = `<i data-lucide="book-open"></i> このテーマの重要講義`;
    
    grid.innerHTML = '';
    grid.style.display = 'block';
    grid.style.maxWidth = '900px';
    grid.style.margin = '0 auto';

    if (info.textbook && info.textbook.length > 0) {
        let html = '';
        info.textbook.forEach(section => {
            html += `
                <div style="background:rgba(255,255,255,0.05); padding:2.5rem; border-radius:24px; margin-bottom:2rem; border:1px solid rgba(255,255,255,0.1); backdrop-filter:blur(10px);">
                    <h3 style="color:#fcd34d; font-size:1.4rem; font-weight:bold; margin-bottom:1.5rem;">${section.title}</h3>
                    <p style="color:#e2e8f0; font-size:1.1rem; line-height:2.0; margin:0;">${section.body}</p>
                </div>
            `;
        });
        grid.innerHTML = html;
    } else {
        grid.innerHTML = '<p style="text-align:center; color:#94a3b8;">コンテンツ準備中...</p>';
    }

    if(typeof lucide !== 'undefined') lucide.createIcons();
}

function generateExtraContent(data) {
    let html = '';
    if (data.points && data.points.length > 0) {
        html += `<div class="extra-section"><h3><i data-lucide="lightbulb"></i> デザインのポイント</h3><ul class="point-list">${data.points.map(p => `<li>${p}</li>`).join('')}</ul></div>`;
    }
    if (data.usage && data.usage.length > 0) {
        html += `<div class="extra-section"><h3><i data-lucide="map-pin"></i> 主な使用シーン</h3><div class="usage-grid">${data.usage.map(u => `<div class="usage-card"><i data-lucide="${u.icon}" size="24"></i><span>${u.label}</span></div>`).join('')}</div></div>`;
    }
    return html;
}

function initStarfield() {
    const canvas = document.getElementById("starCanvas");
    if(!canvas) return;
    const ctx = canvas.getContext("2d");
    let w, h, stars = [];
    const resize = () => { w = window.innerWidth; h = window.innerHeight; canvas.width = w; canvas.height = h; stars = []; for(let i=0; i<100; i++) stars.push({ x: Math.random()*w, y: Math.random()*h, size: Math.random()*2, speed: Math.random()*0.5 }); };
    window.addEventListener('resize', resize); resize();
    const animate = () => { ctx.clearRect(0,0,w,h); ctx.fillStyle = "#fff"; stars.forEach(s => { s.y -= s.speed; if(s.y < 0) s.y = h; ctx.beginPath(); ctx.arc(s.x, s.y, s.size, 0, Math.PI*2); ctx.fill(); }); requestAnimationFrame(animate); };
    animate();
}

// ★追加: ハンバーガーメニュー制御
window.toggleMobileMenu = function() {
    const menu = document.querySelector('.mobile-menu');
    const hamburger = document.querySelector('.hamburger');
    if(menu) menu.classList.toggle('active');
    if(hamburger) hamburger.classList.toggle('active');
}