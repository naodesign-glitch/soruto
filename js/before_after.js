document.addEventListener("DOMContentLoaded", () => {
    // ==========================================
    // 0. Init & Common
    // ==========================================
    const fadeEls = document.querySelectorAll(".fade-up");
    fadeEls.forEach(el => el.classList.add("initial-hidden")); 
    setTimeout(() => {
        fadeEls.forEach(el => el.classList.add("visible"));
    }, 100);

    if(typeof lucide !== 'undefined') lucide.createIcons();

    // ★追加: ハンバーガーメニュー制御
    window.toggleMobileMenu = function() {
        const menu = document.querySelector('.mobile-menu');
        const hamburger = document.querySelector('.hamburger');
        if(menu) menu.classList.toggle('active');
        if(hamburger) hamburger.classList.toggle('active');
    };

    // ==========================================
    // 1. Custom Cursor
    // ==========================================
    const cursor = document.getElementById("custom-cursor");
    let mouseX = 0, mouseY = 0;
    let isCursorVisible = false;

    window.addEventListener("mousemove", e => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        if (!isCursorVisible && window.innerWidth > 768) {
            isCursorVisible = true;
            if(cursor) cursor.style.opacity = '1';
        }
    }, { passive: true });

    function updateCursor() {
        if (cursor && isCursorVisible) {
            cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
        }
        requestAnimationFrame(updateCursor);
    }
    requestAnimationFrame(updateCursor);

    document.querySelectorAll("a, button, input, .switch-btn").forEach(el => { 
        el.addEventListener("mouseenter", () => cursor?.classList.add("hovered")); 
        el.addEventListener("mouseleave", () => cursor?.classList.remove("hovered")); 
    });

    // ==========================================
    // 2. Background Starfield (Kirakira)
    // ==========================================
    const canvas = document.getElementById("baStarCanvas");
    if(canvas) {
        try {
            const ctx = canvas.getContext("2d", {alpha: false});
            let width, height, stars = [], scrollSpeed = 0, lastScrollY = window.scrollY;

            const initStars = () => {
                width = window.innerWidth; height = window.innerHeight;
                const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
                canvas.width = width * dpr; canvas.height = height * dpr; ctx.scale(dpr, dpr);
                stars = []; const count = window.innerWidth < 768 ? 100 : 250;
                for(let i=0; i<count; i++) {
                    const isStrong = Math.random() < 0.03;
                    stars.push({
                        x: Math.random() * width, y: Math.random() * height,
                        size: isStrong ? Math.random() * 2 + 5 : Math.random() * 2 + 0.5,
                        baseSpeed: Math.random() * 0.2 + 0.05, alpha: Math.random(),
                        twinkle: (Math.random() - 0.5) * (isStrong ? 0.04 : 0.02),
                        isStrong: isStrong, hasGlow: Math.random() < 0.4
                    });
                }
            };

            const animateStars = () => {
                ctx.fillStyle = "#0b1120"; ctx.fillRect(0, 0, width, height);
                stars.forEach(star => {
                    star.alpha += star.twinkle;
                    if(star.alpha > 1 || star.alpha < 0.2) star.twinkle *= -1;
                    star.y -= (star.baseSpeed + scrollSpeed);
                    if(star.y < -10) { star.y = height + 10; star.x = Math.random() * width; }
                    
                    if (star.hasGlow) { 
                        ctx.shadowBlur = star.isStrong ? 15 : 6; 
                        ctx.shadowColor = "rgba(255, 255, 255, 0.5)"; 
                    } else { 
                        ctx.shadowBlur = 0; 
                    }
                    
                    ctx.globalAlpha = Math.max(0, Math.min(1, star.alpha));
                    ctx.fillStyle = star.isStrong ? "#fff" : "#e0f2fe";
                    ctx.beginPath(); ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2); ctx.fill();
                });
                ctx.shadowBlur = 0; ctx.globalAlpha = 1.0; scrollSpeed *= 0.9; 
                requestAnimationFrame(animateStars);
            };

            window.addEventListener("resize", initStars);
            
            // スクロールイベント (プログレスバー更新)
            window.addEventListener("scroll", () => {
                const y = window.scrollY; scrollSpeed = (y - lastScrollY) * 0.1; lastScrollY = y;
                
                // トップへ戻るボタン
                const btn = document.getElementById("scroll-to-top");
                if(btn) { y > 300 ? btn.classList.add("visible") : btn.classList.remove("visible"); }

                // プログレスバー
                const docHeight = document.body.scrollHeight - window.innerHeight;
                const scrolled = (y / docHeight) * 100;
                const bar = document.getElementById("progressBar");
                if(bar) bar.style.width = scrolled + "%";

            }, {passive: true});
            
            initStars(); animateStars();
        } catch(e) { console.error("Canvas Error:", e); }
    }

    // ==========================================
    // 3. Daily Theme Logic
    // ==========================================
    const themes = [
        { 
            title: "ボタンの押しやすさ", 
            before: `<div style="padding:40px 20px;text-align:center;"><button style="background:#94a3b8;border:none;padding:10px;width:100%;color:white;">送信</button></div>`, 
            after: `<div style="padding:40px 20px;text-align:center;"><button style="background:linear-gradient(135deg,#3b82f6,#60a5fa);border:none;padding:15px;width:100%;border-radius:99px;color:white;font-weight:bold;box-shadow:0 5px 15px rgba(59,130,246,0.4);cursor:pointer;transition:0.2s;">送信する</button></div>`, 
            points: ["立体感（影）で押せることを示唆", "指で押しやすいサイズ(44px以上)", "「送信する」という能動的な言葉"], 
            bads: ["フラットすぎてただの帯に見える", "色が地味で重要度が伝わらない"], 
            hints: [{top:"50%", left:"50%", text:"Check!"}] 
        },
        { 
            title: "フォームの余白", 
            before: `<div style="padding:30px;"><input placeholder="氏名" style="display:block;margin:0;width:100%;padding:8px;"><input placeholder="住所" style="display:block;margin:0;width:100%;padding:8px;"></div>`, 
            after: `<div style="padding:30px;"><div style="margin-bottom:20px;"><label style="font-size:0.8rem;color:#666;font-weight:bold;display:block;margin-bottom:6px;">氏名</label><input style="width:100%;padding:10px;border:1px solid #ddd;border-radius:6px;box-sizing:border-box;"></div><div><label style="font-size:0.8rem;color:#666;font-weight:bold;display:block;margin-bottom:6px;">住所</label><input style="width:100%;padding:10px;border:1px solid #ddd;border-radius:6px;box-sizing:border-box;"></div></div>`, 
            points: ["項目ごとに余白で区切る", "ラベルを表示して認知負荷を下げる", "入力エリアを広く確保"], 
            bads: ["全部くっついていて圧迫感がある", "何を入力するかわかりにくい"], 
            hints: [{top:"30%", left:"90%", text:"Margin"}] 
        }
    ];

    const loadDailyTheme = () => {
        const today = new Date().toDateString(); 
        let hash = 0;
        for(let i=0; i<today.length; i++) hash = today.charCodeAt(i) + ((hash << 5) - hash);
        const index = Math.abs(hash) % themes.length; 
        const theme = themes[index] || themes[0];

        const setText = (id, text) => { const el=document.getElementById(id); if(el) el.textContent=text; };
        const setHTML = (id, html) => { const el=document.getElementById(id); if(el) el.innerHTML=html; };

        setText("todayThemeTitle", theme.title); 
        setHTML("uiCanvas", theme.before);
        setHTML("learningPoints", theme.points.map(p => `<li>${p}</li>`).join(""));
        setHTML("badPatterns", theme.bads.map(b => `<li>${b}</li>`).join(""));

        const btn = document.getElementById("baSwitchBtn"); 
        const mockup = document.getElementById("baMockup");

        if(btn && mockup) {
            btn.onclick = () => {
                const isBefore = mockup.getAttribute("data-state") === "before"; 
                const newState = isBefore ? "after" : "before";
                
                mockup.setAttribute("data-state", newState); 
                btn.classList.toggle("is-after");
                setHTML("uiCanvas", newState === "after" ? theme.after : theme.before);

                if(newState === "after") {
                    document.querySelector(".label.bad").classList.remove("active"); 
                    document.querySelector(".label.good").classList.add("active");
                    if(theme.hints) setHTML("overlayHints", theme.hints.map(h => `<div class="hint-spot" style="top:${h.top};left:${h.left}" data-text="${h.text}"></div>`).join(""));
                } else {
                    document.querySelector(".label.bad").classList.add("active"); 
                    document.querySelector(".label.good").classList.remove("active");
                    setHTML("overlayHints", "");
                }
                if(typeof lucide !== 'undefined') lucide.createIcons();
            };
            document.querySelector(".label.bad").classList.add("active");
        }
    };
    loadDailyTheme();

    setInterval(() => {
        const now = new Date(); 
        const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
        const diff = tomorrow - now; 
        const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const m = Math.floor((diff / (1000 * 60)) % 60); 
        const s = Math.floor((diff / 1000) % 60);
        const el = document.getElementById("baCountdown"); 
        if(el) el.textContent = `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
    }, 1000);

    const chatInput = document.getElementById("chatInput"); 
    const sendBtn = document.getElementById("chatSendBtn"); 
    const logs = document.getElementById("chatLogs");

    if(sendBtn && chatInput && logs) {
        const addLog = (text, type) => {
            const div = document.createElement("div"); 
            div.className = `msg ${type} fade-in`;
            if(type === 'left') {
                div.innerHTML = `<div class="avatar-fixed"><img src="./images/soruto.png"></div><div class="bubble">${text}</div>`;
            } else {
                div.innerHTML = `<div class="bubble">${text}</div>`;
            }
            logs.appendChild(div); 
            logs.scrollTop = logs.scrollHeight;
        };

        const getReply = (text) => {
            if(text.includes("余白")) return "余白（マージン）に気づいたね！<br>情報をグループ化するには一番大切な要素だよ。";
            if(text.includes("色")) return "色使い、大事だよね。<br>メインカラーを絞ると、ユーザーが迷わなくなるんだ。";
            if(text.includes("文字") || text.includes("フォント")) return "文字の大きさや太さ（ジャンプ率）を変えると、<br>どこから読めばいいかわかりやすくなるよ！";
            return "なるほど、いい視点だね！<br>その調子で「なぜ使いやすいのか」を言語化してみよう。";
        };

        sendBtn.addEventListener("click", () => {
            const val = chatInput.value.trim(); 
            if(!val) return; 
            addLog(val, "right"); 
            chatInput.value = "";
            setTimeout(() => addLog(getReply(val), "left"), 800);
        });

        chatInput.addEventListener("keydown", (e) => { 
            if(e.key === "Enter") sendBtn.click(); 
        });
    }
});