document.addEventListener("DOMContentLoaded", () => {
    if(typeof lucide !== 'undefined') lucide.createIcons();
    initStarfield();
    initScrollUI();
    initDailyContent(); 
    
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
    
    const observer = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if(e.isIntersecting) e.target.classList.add('visible');
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.fade-in-up').forEach(el => observer.observe(el));
});

// ==========================================
// Data Sources
// ==========================================
// (省略なしで全て記載)
const DAILY_TIPS = [
    { 
        title: "警告の赤", 
        category: "color", 
        desc: "「危険」「エラー」を本能的に伝える色。", 
        intent: "ユーザーの足を止め、注意を喚起する。", 
        scene: "削除ボタン、エラーメッセージ",
        visualClass: "color-red",
        visualContent: `<div class="mock-alert" style="color:#ef4444; font-weight:bold; display:flex; gap:0.5rem; background:white; padding:0.5rem 1rem; border-radius:8px;"><i data-lucide="alert-circle"></i> Error</div>`
    },
    { 
        title: "丸いボタン", 
        category: "shape", 
        desc: "角が丸いと「優しさ」「押しやすさ」を感じさせる。", 
        intent: "指にフィットする形状で親しみやすさを演出。", 
        scene: "ポジティブなアクション、決定ボタン",
        visualClass: "shape-round",
        visualContent: `<button class="mock-btn-round" style="background:#3b82f6; color:white; padding:0.5rem 1.5rem; border:none; border-radius:99px;">Push Me</button>`
    },
    { 
        title: "読みやすい余白", 
        category: "space", 
        desc: "行間を適度に空けると、目の移動が楽になる。", 
        intent: "情報の塊を認識させ、読み疲れを防ぐ。", 
        scene: "ブログ記事、長文テキスト",
        visualClass: "space-readable",
        visualContent: `<div class="lines" style="width:60%; display:flex; flex-direction:column; gap:8px;"><span style="display:block; width:100%; height:6px; background:rgba(255,255,255,0.6); border-radius:4px;"></span><span style="display:block; width:100%; height:6px; background:rgba(255,255,255,0.6); border-radius:4px;"></span><span style="display:block; width:70%; height:6px; background:rgba(255,255,255,0.6); border-radius:4px;"></span></div>`
    },
    { 
        title: "整列の魔法", 
        category: "shape", 
        desc: "左端や上端などの「見えない線」を揃える。", 
        intent: "視線の動きをスムーズにし、信頼感を与える。", 
        scene: "フォームのラベル、カードリスト",
        visualClass: "shape-align",
        visualContent: `<i data-lucide="align-left" class="icon-lg" style="width:48px; height:48px;"></i>`
    },
    { 
        title: "成功の緑", 
        category: "color", 
        desc: "「できた！」「安全」という安心感を与える。", 
        intent: "タスク完了を伝え、肯定感を出す。", 
        scene: "完了画面、正解通知",
        visualClass: "color-green",
        visualContent: `<i data-lucide="check-circle" class="icon-lg success" style="width:48px; height:48px; color:#22c55e;"></i>`
    },
    { 
        title: "グループ化", 
        category: "space", 
        desc: "関係あるもの同士を近づけ、関係ないものは離す。", 
        intent: "「何と何がセットか」を言葉なしで伝える。", 
        scene: "画像とキャプション、ラベルと入力欄",
        visualClass: "space-group",
        visualContent: `<div style="display:flex; gap:4px;"><div style="width:30px; height:30px; background:#818cf8; border-radius:6px;"></div><div style="width:30px; height:30px; background:#818cf8; border-radius:6px;"></div></div>`
    },
    { 
        title: "リンクの青色", 
        category: "color", 
        desc: "インターネット初期からの「押せる場所」の共通言語。", 
        intent: "学習コストを下げ、迷わずクリックさせる。", 
        scene: "テキストリンク、詳細ページへの誘導",
        visualClass: "color-blue",
        visualContent: `<span class="link-text" style="color:#3b82f6; text-decoration:underline; font-weight:bold; font-size:1.2rem;">Click Here</span>`
    },
    { 
        title: "注意の黄色", 
        category: "color", 
        desc: "「危険ではないが、気をつけたほうがいい」を伝える。", 
        intent: "作業を中断させずに、リスクを知らせる。", 
        scene: "パスワードヒント、未保存アラート",
        visualClass: "color-yellow",
        visualContent: `<i data-lucide="alert-triangle" class="icon-lg warning" style="width:48px; height:48px; color:#eab308;"></i>`
    },
    { 
        title: "円形アイコン", 
        category: "shape", 
        desc: "人の顔や、独立したシンボルに使われる形。", 
        intent: "四角い画面の中で目立たせ、有機的な印象を与える。", 
        scene: "プロフィール画像、フローティングボタン",
        visualClass: "shape-circle",
        visualContent: `<div class="circle-icon" style="width:60px; height:60px; background:#ec4899; border-radius:50%; box-shadow:0 4px 10px rgba(0,0,0,0.2);"></div>`
    },
    { 
        title: "マージン", 
        category: "space", 
        desc: "要素の「外側」の余白。隣との距離感を決める。", 
        intent: "情報の独立性を保ち、圧迫感を減らす。", 
        scene: "セクション間の区切り、カードの間隔",
        visualClass: "space-margin",
        visualContent: `<div class="box-margin" style="border:2px dashed #94a3b8; padding:1rem; color:#94a3b8; border-radius:8px;">Margin</div>`
    },
    { 
        title: "ダークモード", 
        category: "color", 
        desc: "暗い背景に白い文字。目の疲れを軽減し、没入感を高める。", 
        intent: "コンテンツ（写真や動画）を際立たせる。", 
        scene: "動画アプリ、夜間モード",
        visualClass: "color-dark",
        visualContent: `<span style="font-weight:bold; color:white;">Dark</span>`
    },
    { 
        title: "角ばった形", 
        category: "shape", 
        desc: "「真面目」「信頼」「安定」「厳格」といった印象を与える。", 
        intent: "遊びを排除し、情報の正確さを伝える。", 
        scene: "金融系アプリ、ニュースサイト",
        visualClass: "shape-square",
        visualContent: `<div class="square-box" style="width:100px; height:40px; background:#2dd4bf; border-radius:2px; box-shadow:2px 2px 0 rgba(0,0,0,0.1);"></div>`
    },
    { 
        title: "近接の法則", 
        category: "space", 
        desc: "近くにあるものは関係があると認識される。", 
        intent: "レイアウトだけで論理構造を伝える。", 
        scene: "見出しと本文、画像とテキスト",
        visualClass: "space-proximity",
        visualContent: `<div class="dots-group" style="display:flex; gap:4px;"><span style="display:inline-block; width:12px; height:12px; background:#818cf8; border-radius:50%;"></span><span style="display:inline-block; width:12px; height:12px; background:#818cf8; border-radius:50%;"></span><span style="display:inline-block; width:12px; height:12px; background:#818cf8; border-radius:50%;"></span></div>`
    },
    { 
        title: "押した反応", 
        category: "motion", 
        desc: "ボタンを押した瞬間に凹んだり色が濃くなる動き。", 
        intent: "「自分の操作が伝わった」という手応えを返す。", 
        scene: "すべてのボタン、タップ要素",
        visualClass: "motion-press",
        visualContent: `<button class="mock-btn-press" style="background:white; color:#3b82f6; padding:0.5rem 1.5rem; border-radius:8px; border:none; box-shadow:0 4px 0 #e2e8f0; transform:translateY(0);">Press</button>`
    },
    { 
        title: "広がるUI", 
        category: "motion", 
        desc: "必要なときだけ場所を取り、普段は小さく収まる工夫。", 
        intent: "画面のスペースを有効活用し、ノイズを減らす。", 
        scene: "検索バー、ドロワーメニュー",
        visualClass: "motion-expand",
        visualContent: `<div class="mock-search-bar" style="background:white; padding:0.5rem; border-radius:99px; width:40px; color:#94a3b8; display:flex; align-items:center; justify-content:center;"><i data-lucide="search"></i></div>`
    }
];

const DAILY_QUIZZES = [
    {
        q: "ユーザーの視線を「自然に」誘導する、最も効果的な余白の使い方は？",
        options: [
            { label: "均等に空ける", val: "bad" },
            { label: "関連を近づける", val: "good" },
            { label: "ランダムにする", val: "bad" }
        ],
        msg: "これらの工夫、<br>君ならどう使う？",
        ansComment: {
            good: "正解！<br>関連するものを近づける（近接）と、視線がスムーズに動くよ。",
            bad: "うーん...<br>メリハリがないと、どれがセットなのか脳が混乱しちゃうよ。"
        }
    },
    {
        q: "「削除する」ボタンの色、どれが一番適切？",
        options: [
            { label: "緑色", val: "bad" },
            { label: "赤色", val: "good" },
            { label: "青色", val: "bad" }
        ],
        msg: "危険な操作、<br>どう伝える？",
        ansComment: {
            good: "正解！<br>赤は「危険」「停止」を本能的に伝える色だから、事故を防げるよ。",
            bad: "それだと...<br>安全なボタンだと勘違いして、間違って消しちゃうかも！"
        }
    },
    {
        q: "親しみやすい子供向けアプリ、ボタンの形は？",
        options: [
            { label: "真四角", val: "bad" },
            { label: "カクカク", val: "bad" },
            { label: "丸っこい", val: "good" }
        ],
        msg: "子供たちが<br>押したくなるのは？",
        ansComment: {
            good: "その通り！<br>丸い形は「優しさ」や「安全」を感じさせるから、触りたくなるんだ。",
            bad: "ちょっと固いかも...<br>尖った形は「痛そう」「怖い」という印象を与えがちだよ。"
        }
    }
];

// ==========================================
// Logic
// ==========================================

function initDailyContent() {
    const today = new Date();
    const dateStr = today.getFullYear() + '.' + (today.getMonth()+1) + '.' + today.getDate();
    const seed = today.getFullYear() * 1000 + (today.getMonth() + 1) * 100 + today.getDate();
    
    // 1. TODAY'S TIP 更新 (UI含む)
    const dateEl = document.getElementById('today-date');
    if(dateEl) dateEl.textContent = dateStr;
    
    const tipIndex = seed % DAILY_TIPS.length;
    const tip = DAILY_TIPS[tipIndex];
    const tipContainer = document.getElementById('today-tip-container');
    
    if(tipContainer) {
        // ★修正: レイアウトをFlexboxにして左にビジュアル、右にテキストを表示
        tipContainer.innerHTML = `
            <div class="today-layout" style="display:flex; align-items:center; gap:2rem; flex-wrap:wrap;">
                <div class="tip-visual ${tip.visualClass}" style="flex-shrink:0; width:140px; height:140px; border-radius:16px; display:flex; align-items:center; justify-content:center; background:rgba(0,0,0,0.2); border:1px solid rgba(255,255,255,0.1);">
                    ${tip.visualContent}
                </div>
                <div class="today-text" style="flex:1; min-width:200px;">
                    <div class="today-tags" style="margin-bottom:0.5rem;"><span class="tag" style="background:#fcd34d; color:#0b1120; font-weight:bold; padding:2px 8px; border-radius:4px; font-size:0.8rem;">${tip.category.toUpperCase()}</span></div>
                    <h3 style="font-size:1.8rem; font-weight:bold; margin-bottom:0.5rem;">${tip.title}</h3>
                    <p style="font-size:1rem; line-height:1.6; margin-bottom:1rem; color:#e2e8f0;">${tip.desc}</p>
                    <div class="tip-detail" style="border-top:1px solid rgba(255,255,255,0.1); padding-top:0.8rem;">
                        <h4 style="font-size:0.9rem; color:#fcd34d; margin-bottom:0.2rem; display:flex; align-items:center; gap:0.3rem;"><i data-lucide="lightbulb" style="width:16px;"></i> 意図</h4>
                        <p style="font-size:0.9rem; color:#94a3b8;">${tip.intent}</p>
                    </div>
                </div>
            </div>
        `;
    }

    // 2. 思考のトレーニング 更新
    const quizIndex = seed % DAILY_QUIZZES.length;
    const quiz = DAILY_QUIZZES[quizIndex];
    
    const sorutoMsg = document.getElementById('soruto-msg');
    if(sorutoMsg) sorutoMsg.innerHTML = quiz.msg;
    
    const qEl = document.getElementById('daily-quiz-q');
    if(qEl) qEl.textContent = "Q. " + quiz.q;
    
    const optsEl = document.getElementById('daily-quiz-options');
    if(optsEl) {
        optsEl.innerHTML = '';
        quiz.options.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            btn.textContent = opt.label;
            btn.onclick = () => checkDailyQuiz(opt.val, quiz);
            optsEl.appendChild(btn);
        });
    }
    
    lucide.createIcons();
}

window.checkDailyQuiz = function(val, quizData) {
    const bubble = document.getElementById('soruto-msg');
    let msg = "";
    if(val === 'good') msg = quizData.ansComment.good;
    else msg = quizData.ansComment.bad;
    
    bubble.innerHTML = msg;
    bubble.style.transform = "translateX(-50%) scale(1.1)";
    setTimeout(() => {
        bubble.style.transform = "translateX(-50%) scale(1)";
    }, 200);
}

window.filterTips = function(cat) {
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    const cards = document.querySelectorAll('.tip-card');
    cards.forEach(card => {
        if(cat === 'all' || card.dataset.category === cat) {
            card.style.display = 'flex';
            setTimeout(() => card.style.opacity = '1', 50);
        } else {
            card.style.display = 'none';
            card.style.opacity = '0';
        }
    });
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

function initScrollUI() {
    window.addEventListener("scroll", () => {
        const scrolled = window.scrollY;
        const max = document.body.scrollHeight - window.innerHeight;
        const bar = document.getElementById("progressBar");
        if(bar) bar.style.width = (scrolled / max * 100) + "%";
        const btn = document.getElementById('scroll-to-top');
        if(btn) { if(scrolled > 300) btn.classList.add('visible'); else btn.classList.remove('visible'); }
    });
}

window.toggleMobileMenu = function() {
    const menu = document.querySelector('.mobile-menu');
    const hamburger = document.querySelector('.hamburger');
    if(menu) menu.classList.toggle('active');
    if(hamburger) hamburger.classList.toggle('active');
};