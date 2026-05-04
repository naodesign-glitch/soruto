console.log("about.js loaded");

// ==========================================
// Custom Cursor Logic (High Performance)
// ==========================================
const cursor = document.getElementById('custom-cursor');
let mouseX = 0;
let mouseY = 0;
let isCursorVisible = false;
let lastSparkleTime = 0; // キラキラの間引き用

// マウス座標の更新のみ行う（重い処理は入れない）
window.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (!isCursorVisible && window.innerWidth > 1024) {
        isCursorVisible = true;
        if(cursor) cursor.style.opacity = '1';
    }
}, { passive: true });

// 描画ループで位置更新 (rAF)
function updateCursor() {
    if (cursor && isCursorVisible) {
        // translate3d でGPU合成を促進
        cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
    }
    requestAnimationFrame(updateCursor);
}
requestAnimationFrame(updateCursor);

// ホバー時のエフェクト
const interactiveSelectors = 'a, button, .flip-card, .flow-card, .glass-cta, .acc-head, .logo, .nav-link, .hamburger, #scroll-to-top';
document.querySelectorAll(interactiveSelectors).forEach(el => {
    el.addEventListener('mouseenter', () => { 
        if(cursor && window.innerWidth > 1024) cursor.classList.add('hovered'); 
    });
    el.addEventListener('mouseleave', () => { 
        if(cursor && window.innerWidth > 1024) cursor.classList.remove('hovered'); 
    });
});

// CONFIG
const CONF = {
    // 星の数を少し減らして負荷軽減
    STAR_COUNT: window.innerWidth < 768 ? 100 : 250,
    SCROLL_ACCEL: 0.6
};

document.addEventListener("DOMContentLoaded", () => {
    
    // アイコン初期化 (Lucide)
    if(typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // モバイルメニュー機能
    window.toggleMobileMenu = function() {
        const menu = document.querySelector('.mobile-menu');
        const hamburger = document.querySelector('.hamburger');
        if(menu) menu.classList.toggle('active');
        if(hamburger) hamburger.classList.toggle('active');
    };

    // ==========================================
    // 1. Starfield Canvas Implementation (Optimized)
    // ==========================================
    const canvas = document.getElementById("starCanvas");
    const ctx = canvas.getContext("2d", { alpha: false }); // alpha: false で高速化の可能性
    let width, height;
    let stars = [];
    let scrollSpeedY = 0;
    let lastScrollY = window.scrollY;
    let particles = [];
    let ripple = { active: false, x: 0, y: 0, r: 0, a: 0 };

    // Resize Handler
    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        // DPRを制限して描画負荷を下げる (最大1.5倍)
        const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        ctx.scale(dpr, dpr);
        initStars();
    }

    // Initialize Stars
    function initStars() {
        stars = [];
        for(let i=0; i<CONF.STAR_COUNT; i++) {
            const isStrong = Math.random() < 0.03;
            stars.push({
                x: Math.random() * width,
                y: Math.random() * height,
                size: isStrong ? Math.random() * 2 + 3 : Math.random() * 2 + 0.5,
                baseSpeed: Math.random() * 0.2 + 0.05,
                alpha: Math.random(),
                twinkle: (Math.random() - 0.5) * (isStrong ? 0.04 : 0.02),
                isStrong: isStrong,
                // 光彩効果の使用率を下げる
                hasGlow: isStrong // 強い星だけ光らせる
            });
        }
    }

    // Sparkle Burst Logic
    function createSparkleBurst() {
        const cx = width / 2 + (Math.random() - 0.5) * 400;
        const cy = height / 2 + (Math.random() - 0.5) * 400;
        const count = window.innerWidth < 768 ? 8 : 12; // パーティクル数を調整
        
        for(let i=0; i<count; i++) {
            particles.push({
                x: cx, y: cy,
                vx: (Math.random() - 0.5) * 6,
                vy: (Math.random() - 0.5) * 6,
                life: 1.0,
                color: Math.random() > 0.8 ? "#fcd34d" : "#ffffff",
                size: Math.random() * 3
            });
        }
    }

    // Ripple Logic
    function triggerRipple() {
        if(ripple.active) return; // 重複起動防止
        ripple.active = true;
        ripple.x = width/2;
        ripple.y = height/2;
        ripple.r = 0;
        ripple.a = 0.4;
    }

    // Main Animation Loop
    function animate() {
        // 全画面クリアはコストがかかるが、背景アニメーションには必要
        ctx.fillStyle = "#0b1120"; // 背景色で塗りつぶし (clearRectより速い場合がある)
        ctx.fillRect(0, 0, width, height);
        
        // 星の描画
        // 重い shadowBlur は極力避ける
        ctx.shadowBlur = 0;
        
        stars.forEach(star => {
            star.alpha += star.twinkle;
            if(star.alpha > 1 || star.alpha < 0.2) star.twinkle *= -1;
            star.y -= (star.baseSpeed + scrollSpeedY);
            
            // 画面外判定とリセット
            if(star.y < -10) { star.y = height + 10; star.x = Math.random() * width; }
            if(star.y > height + 10) { star.y = -10; star.x = Math.random() * width; }

            ctx.globalAlpha = Math.max(0, Math.min(1, star.alpha));
            ctx.fillStyle = star.isStrong ? "#fff" : "#e0f2fe";
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
            ctx.fill();
            
            // 強い星だけ簡易的な光彩（shadowBlurを使わず円を重ねる）
            if(star.isStrong) {
                 ctx.globalAlpha = Math.max(0, Math.min(1, star.alpha)) * 0.3;
                 ctx.beginPath();
                 ctx.arc(star.x, star.y, star.size * 2, 0, Math.PI * 2);
                 ctx.fill();
            }
        });
        
        ctx.globalAlpha = 1.0;

        // パーティクル
        if(particles.length > 0) {
            for(let i=particles.length-1; i>=0; i--) {
                let p = particles[i];
                p.x += p.vx; p.y += p.vy; p.life -= 0.04;
                if(p.life <= 0) { particles.splice(i, 1); } else {
                    ctx.globalAlpha = p.life; ctx.fillStyle = p.color;
                    ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2); ctx.fill();
                }
            }
        }

        // リップル
        if (ripple.active) {
            ctx.strokeStyle = `rgba(255, 255, 255, ${ripple.a})`;
            ctx.lineWidth = 2; ctx.beginPath();
            ctx.arc(ripple.x, ripple.y, ripple.r, 0, Math.PI * 2); ctx.stroke();
            ripple.r += 8 + Math.abs(scrollSpeedY)*2; ripple.a -= 0.015;
            if(ripple.a <= 0) ripple.active = false;
        }

        scrollSpeedY *= 0.9;
        requestAnimationFrame(animate);
    }

    window.addEventListener("resize", resize);
    resize();
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if(!mediaQuery.matches) animate();

    // ==========================================
    // 2. Scroll Interaction
    // ==========================================
    const scrollToTopBtn = document.getElementById('scroll-to-top');

    window.addEventListener("scroll", () => {
        const currentY = window.scrollY;
        const delta = currentY - lastScrollY;
        const now = Date.now();
        
        scrollSpeedY = delta * 0.1;
        
        // エフェクト発火条件: スクロール量が5px以上 かつ 前回から一定時間経過
        if(Math.abs(delta) > 5 && now - lastSparkleTime > 100) {
            createSparkleBurst();
            triggerRipple();
            lastSparkleTime = now;
        }
        
        lastScrollY = currentY;

        const docH = document.documentElement.scrollHeight - window.innerHeight;
        const progress = currentY / docH;
        const progressBar = document.getElementById("progressBar");
        if(progressBar) progressBar.style.width = `${progress * 100}%`;
        
        // トップへ戻るボタン制御
        if(scrollToTopBtn) {
            if (currentY > 300) {
                scrollToTopBtn.classList.add('visible');
            } else {
                scrollToTopBtn.classList.remove('visible');
            }
        }
    }, { passive: true });


    // ==========================================
    // 3. UI Logic (Observer) (維持)
    // ==========================================
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if(e.isIntersecting) e.target.classList.add("visible");
        });
    }, { threshold: 0.1 });
    document.querySelectorAll(".fade-in-up").forEach(el => observer.observe(el));

    // Stepper Logic
    const stepObserver = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if(e.isIntersecting) {
                const target = e.target.dataset.target;
                document.querySelectorAll(".detail-item").forEach(el => el.classList.remove("active"));
                e.target.classList.add("active");
                document.querySelectorAll(".screen-content").forEach(el => {
                    el.classList.remove("active");
                    if(el.dataset.step === target) el.classList.add("active");
                });
            }
        });
    }, { rootMargin: "-40% 0px -40% 0px" });
    document.querySelectorAll(".detail-item").forEach(el => stepObserver.observe(el));

    // ==========================================
    // 4. Manual Interactions (Tap) (維持)
    // ==========================================
    
    // Particle Burst on Click
    function createClickParticles(e) {
        const count = 8;
        const rect = e.target.getBoundingClientRect();
        const cx = e.clientX; const cy = e.clientY;
        for(let i=0; i<count; i++) {
            const p = document.createElement("div");
            p.style.position = "fixed"; p.style.left = cx + "px"; p.style.top = cy + "px";
            p.style.width = "6px"; p.style.height = "6px";
            p.style.background = "white"; p.style.borderRadius = "50%";
            p.style.pointerEvents = "none"; p.style.zIndex = 9999; p.style.boxShadow = "0 0 8px white";
            document.body.appendChild(p);
            const angle = Math.random() * Math.PI * 2; const dist = 30 + Math.random() * 50;
            p.animate([
                { transform: 'translate(0,0) scale(1)', opacity: 1 },
                { transform: `translate(${Math.cos(angle)*dist}px, ${Math.sin(angle)*dist}px) scale(0)`, opacity: 0 }
            ], { duration: 500, easing: 'ease-out' }).onfinish = () => p.remove();
        }
    }

    // Bind to specific interactive elements
    document.querySelectorAll(".flip-card, .flow-card, .glass-cta").forEach(el => {
        el.addEventListener("click", (e) => createClickParticles(e));
    });

    // Flip Card
    window.toggleCard = function(el) { el.classList.toggle("flipped"); }
    // Flow Step
    window.toggleFlow = function(el) { el.classList.toggle("open"); }
    // Accordion
    window.toggleAcc = function(btn) { btn.parentElement.classList.toggle("open"); }
});