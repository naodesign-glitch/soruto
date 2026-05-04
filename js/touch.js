window.scrollToMission = function() {
    const el = document.getElementById('daily-mission');
    if(el) {
        const headerOffset = 100;
        const elementPosition = el.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
};

/* ★追加: ハンバーガーメニューの開閉処理 */
window.toggleMobileMenu = function() {
    const menu = document.querySelector('.mobile-menu');
    const hamburger = document.querySelector('.hamburger');
    if(menu) menu.classList.toggle('active');
    if(hamburger) hamburger.classList.toggle('active');
};

document.addEventListener("DOMContentLoaded", () => {
    
    if (typeof lucide !== 'undefined') lucide.createIcons();
    
    // ★追加: スクロールインジケーター & ページトップボタン
    window.addEventListener("scroll", () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (scrollTop / docHeight) * 100;
        const bar = document.getElementById("progressBar");
        if(bar) bar.style.width = scrolled + "%";
        
        const btn = document.getElementById("scroll-to-top");
        if(btn) {
            if(scrollTop > 300) btn.classList.add("visible");
            else btn.classList.remove("visible");
        }
    }, { passive: true });

    const canvas = document.getElementById("starCanvas");
    if (canvas) {
        const ctx = canvas.getContext("2d", { alpha: false });
        let width, height, stars = [], scrollSpeed = 0, lastScrollY = window.scrollY;

        const initStars = () => {
            width = window.innerWidth; height = window.innerHeight;
            const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
            canvas.width = width * dpr; canvas.height = height * dpr; ctx.scale(dpr, dpr);
            stars = [];
            const count = window.innerWidth < 768 ? 100 : 250;
            for (let i = 0; i < count; i++) {
                const isStrong = Math.random() < 0.03;
                stars.push({ x: Math.random()*width, y: Math.random()*height, size: isStrong?Math.random()*2+3:Math.random()*2+0.5, alpha: Math.random(), twinkle: (Math.random()-0.5)*0.02, isStrong: isStrong });
            }
        };

        const animate = () => {
            ctx.fillStyle = "#0b1120"; ctx.fillRect(0, 0, width, height);
            stars.forEach(star => {
                star.alpha += star.twinkle;
                if(star.alpha > 1 || star.alpha < 0.2) star.twinkle *= -1;
                star.y -= (0.2 + scrollSpeed);
                if (star.y < 0) { star.y = height; star.x = Math.random() * width; }
                ctx.globalAlpha = Math.max(0, Math.min(1, star.alpha));
                ctx.fillStyle = star.isStrong ? "#fff" : "#e0f2fe";
                ctx.beginPath(); ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2); ctx.fill();
            });
            ctx.globalAlpha = 1.0; scrollSpeed *= 0.9; requestAnimationFrame(animate);
        };

        window.addEventListener("resize", initStars);
        window.addEventListener("scroll", () => {
            const currentY = window.scrollY; scrollSpeed = (currentY - lastScrollY) * 0.1; lastScrollY = currentY;
        }, { passive: true });

        initStars(); animate();
    }

    const cursor = document.getElementById('custom-cursor');
    const interactiveSelectors = 'a, button, .help-card, .phone-card, input[type="range"], .filter-btn';
    document.querySelectorAll(interactiveSelectors).forEach(el => {
        el.addEventListener('mouseenter', () => { 
            if(cursor && window.innerWidth > 768) cursor.classList.add('hovered'); 
        });
        el.addEventListener('mouseleave', () => { 
            if(cursor && window.innerWidth > 768) cursor.classList.remove('hovered'); 
        });
    });

    const dailyThemes = [
        {
            id: "shadow", title: "「押せそう」に見える影", desc: "ボタンが押せないように見える原因は「高さ」の欠如です。",
            advice: "影があるだけで、ユーザーは無意識に「これは押せる」と判断するんだ。",
            labHtml: `<div class="dynamic-ui-stage"><div style="background:white; padding:40px; border-radius:12px; display:flex; justify-content:center; align-items:center; width:100%; max-width:300px;"><button id="targetUI" class="demo-btn" style="padding:15px 40px; background:#3b82f6; color:white; border:none; border-radius:8px; font-weight:bold; cursor:pointer; transition:transform 0.1s;">TAP ME</button></div></div><div class="control-panel"><div class="control-row"><div class="label-row"><span>影の強さ</span><span id="val1">0px</span></div><input type="range" id="param1" min="0" max="20" value="0"></div></div>`,
            getPreviewStyle: (v) => `background:#3b82f6; width:100px; height:40px; border-radius:6px; box-shadow:0 ${v/2}px ${v}px rgba(0,0,0,0.4); transform:translateY(-${v/4}px); display:flex; justify-content:center; align-items:center; color:white;`,
            init: (t, p) => {
                let currentVal = 0;
                p.addEventListener('input', e => {
                    currentVal = e.target.value;
                    document.getElementById('val1').textContent = currentVal + 'px';
                    t.style.boxShadow = `0 ${currentVal/2}px ${currentVal}px rgba(0,0,0,0.4)`;
                    t.style.transform = `translateY(-${currentVal/4}px)`;
                });
                t.addEventListener('mousedown', () => { t.style.boxShadow = 'none'; t.style.transform = 'translateY(0) scale(0.95)'; });
                t.addEventListener('mouseup', () => { t.style.boxShadow = `0 ${currentVal/2}px ${currentVal}px rgba(0,0,0,0.4)`; t.style.transform = `translateY(-${currentVal/4}px)`; });
            }
        },
        {
            id: "radius", title: "「優しさ」を作る角丸", desc: "尖った四角形は「硬い」印象を与えます。",
            advice: "スマホはずっと手で触るものだから、角が丸い方が心理的に安心するんだよ。",
            labHtml: `<div class="dynamic-ui-stage"><div id="targetUI" style="width:200px; height:120px; background:white; color:#333; display:flex; justify-content:center; align-items:center; font-weight:bold;">CARD UI</div></div><div class="control-panel"><div class="control-row"><div class="label-row"><span>角の丸さ</span><span id="val1">0px</span></div><input type="range" id="param1" min="0" max="60" value="0"></div></div>`,
            getPreviewStyle: (v) => `background:white; width:120px; height:80px; border-radius:${v}px; display:flex; justify-content:center; align-items:center; color:#333;`,
            init: (t, p) => p.addEventListener('input', e => { t.style.borderRadius = `${e.target.value}px`; document.getElementById('val1').textContent = e.target.value + 'px'; })
        },
        {
            id: "space", title: "「読みやすさ」は隙間に宿る", desc: "文字が詰まりすぎていると、読む気を失わせます。",
            advice: "「勿体無い」と思わずに、大胆に空けるのがコツだよ！",
            labHtml: `<div class="dynamic-ui-stage" style="background:white; border-radius:12px; overflow:hidden; color:#333;"><div id="targetUI" style="padding:0px; background:#e2e8f0; transition:0.3s; font-size:1.2rem; font-weight:bold;">コンテンツ</div></div><div class="control-panel"><div class="control-row"><div class="label-row"><span>内側の余白</span><span id="val1">0px</span></div><input type="range" id="param1" min="0" max="60" value="0"></div></div>`,
            getPreviewStyle: (v) => `background:white; width:100%; height:100%; padding:${val/2}px; display:flex; justify-content:center; align-items:center; color:#333; font-size:0.6rem;`,
            init: (t, p) => p.addEventListener('input', e => { t.style.padding = `${e.target.value}px`; document.getElementById('val1').textContent = e.target.value + 'px'; })
        }
    ];

    const today = new Date();
    // ★日替わりロジック: 日付をテーマ数で割った余りで決定
    const dayIndex = today.getDate() % dailyThemes.length;
    const currentData = dailyThemes[dayIndex] || dailyThemes[0];
    const dateStr = today.toLocaleDateString();

    document.getElementById('displayDate').textContent = dateStr;
    document.getElementById('displayThemeTitle').textContent = currentData.title;
    document.getElementById('displayThemeDesc').textContent = currentData.desc;
    document.getElementById('displaySorutoAdvice').textContent = currentData.advice;
    document.getElementById('heroThemeName').textContent = currentData.title;

    const ws = document.getElementById('labWorkspace');
    if(ws) {
        ws.innerHTML = currentData.labHtml;
        currentData.init(document.getElementById('targetUI'), document.getElementById('param1'));
    }

    const timerEl = document.getElementById('nextUpdateTimer');
    setInterval(() => {
        const now = new Date();
        const h = Math.floor((24 - now.getHours() - 1));
        const m = Math.floor((60 - now.getMinutes()));
        if(timerEl) timerEl.textContent = `${h}時間${m}分`;
    }, 1000);

    const STORAGE_KEY = 'soruto_design_gym_history';

    const saveBtn = document.getElementById('saveMemoBtn');
    if(saveBtn) {
        saveBtn.addEventListener('click', () => {
            const val = document.getElementById('userMemo').value.trim();
            const param = document.getElementById('param1').value;
            const history = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
            const newH = history.filter(h => h.date !== dateStr);
            newH.unshift({ date: dateStr, themeId: currentData.id, themeTitle: currentData.title, paramValue: param, memo: val || "メモなし" });
            if(newH.length > 7) newH.pop();
            localStorage.setItem(STORAGE_KEY, JSON.stringify(newH));
            document.getElementById('memoFeedback').textContent = "保存しました！";
            setTimeout(() => document.getElementById('memoFeedback').textContent = "", 2000);
            renderHistory('all');
        });
    }

    window.filterHistory = function(type) {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        event.target.classList.add('active');
        renderHistory(type);
    };

    function renderHistory(type) {
        const list = document.getElementById('historyList');
        const history = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
        list.innerHTML = '';
        
        if(history.length === 0) {
            list.innerHTML = '<div class="empty-msg">保存された履歴はありません。</div>';
            return;
        }

        const filtered = type === 'all' ? history : history.filter(h => h.themeId.includes(type));
        if(filtered.length === 0) {
            list.innerHTML = '<div class="empty-msg">該当する履歴はありません。</div>';
            return;
        }

        filtered.forEach(h => {
            const th = dailyThemes.find(t => t.id === h.themeId) || dailyThemes[0];
            const style = th.getPreviewStyle ? th.getPreviewStyle(h.paramValue) : '';
            const div = document.createElement('div');
            div.className = 'phone-card';
            div.innerHTML = `<div class="screen-preview"><div class="demo-element" style="${style}">UI</div></div><div class="info-area"><span class="date">${h.date}</span><div class="title">${h.themeTitle}</div><div class="memo">${h.memo}</div></div>`;
            div.addEventListener('click', () => {
                document.getElementById('modalDate').textContent = h.date;
                document.getElementById('modalTitle').textContent = h.themeTitle;
                document.getElementById('modalMemo').textContent = h.memo;
                document.getElementById('modalPreviewArea').innerHTML = `<div class="demo-element" style="${style}">UI</div>`;
                document.getElementById('historyModal').classList.add('show');
            });
            list.appendChild(div);
        });
    }
    renderHistory('all');

    document.getElementById('closeModalBtn').addEventListener('click', () => document.getElementById('historyModal').classList.remove('show'));
    document.getElementById('historyModal').addEventListener('click', e => { if(e.target === document.getElementById('historyModal')) e.target.classList.remove('show'); });

    window.addEventListener('mousemove', e => { if(window.innerWidth > 768 && cursor) cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`; });
    const fadeEls = document.querySelectorAll(".fade-up");
    const obs = new IntersectionObserver(e => e.forEach(en => { if(en.isIntersecting) en.target.classList.add('visible'); }), {threshold: 0.1});
    fadeEls.forEach(el => obs.observe(el));
    window.toggleHelp = function(el) { el.classList.toggle('flipped'); };
});