/* ==========================================
   Master Data & Logic
   ========================================== */
const GALLERY_DATA = [
    // --- Screens ---
    { id: 101, type: "screen", title: "ログイン画面", category: "login", elements: ["form", "cta"], level: "beginner", desc: "迷わせないシンプルな認証画面。", img: "./images/登録画面（サインアップ）.jpg", tags: ["Login", "Mobile"], date: "2025-01-10", likes: 120 },
    { id: 102, type: "screen", title: "ダッシュボード", category: "dashboard", elements: ["space", "hierarchy"], level: "advanced", desc: "情報量が多いデータを整理。", img: "./images/デイリーUI. 42日目 To-Do List.jpg", tags: ["Admin", "Data"], date: "2025-01-12", likes: 200 },
    { id: 103, type: "screen", title: "音楽プレイヤー", category: "media", elements: ["color", "feedback"], level: "intermediate", desc: "没入感を高める配色と配置。", img: "./images/デイリーUI 9日目 Music Player.jpg", tags: ["Music", "App"], date: "2025-01-15", likes: 85 },
    { id: 105, type: "screen", title: "チャット一覧", category: "sns", elements: ["hierarchy", "typo"], level: "intermediate", desc: "未読・既読がわかるリスト。", img: "./images/デイリーUI 13日目 Direct Message.jpg", tags: ["Chat", "List"], date: "2025-01-20", likes: 90 },
    { id: 106, type: "screen", title: "設定メニュー", category: "system", elements: ["space", "icon"], level: "beginner", desc: "探しやすいリストナビ。", img: "./images/デイリーUI 7日目 settings.jpg", tags: ["Settings", "Nav"], date: "2025-01-22", likes: 70 },
    { id: 109, type: "screen", title: "プロフィール", category: "sns", elements: ["hierarchy", "image"], level: "beginner", desc: "個性を表現するレイアウト。", img: "./images/デイリーUI 6日目 User Profile .jpg", tags: ["Profile", "User"], date: "2025-01-25", likes: 95 },
    { id: 110, type: "screen", title: "マップ検索", category: "system", elements: ["ui", "map"], level: "advanced", desc: "地図と情報の重ね合わせ。", img: "./images/デイリーUI 20日目 Location Tracker.jpg", tags: ["Map", "Search"], date: "2025-01-26", likes: 160 },
    { id: 111, type: "screen", title: "カレンダー", category: "system", elements: ["grid", "color"], level: "intermediate", desc: "予定が見やすいグリッド。", img: "./images/デイリーUI 38日目 Calendar.png", tags: ["Calendar", "Date"], date: "2025-01-27", likes: 105 },
    { id: 112, type: "screen", title: "天気予報", category: "system", elements: ["list", "icon"], level: "beginner", desc: "アイコンで情報を伝える。", img: "./images/デイリーUI 37日目 Weather Design.jpg", tags: ["Weather", "Icon"], date: "2025-01-28", likes: 80 },
    { id: 113, type: "screen", title: "カメラ", category: "media", elements: ["ui", "feedback"], level: "intermediate", desc: "撮影に集中できるUI。", img: "./images/デイリーUI 73日目 Virtual Reality.png", tags: ["Camera", "Media"], date: "2025-01-29", likes: 110 },
    
    // --- Buttons ---
    { id: 201, type: "button", title: "Primary Button", category: "system", elements: ["cta", "color"], level: "beginner", desc: "最も重要なアクション。", html: '<button style="background:#3b82f6; color:white; padding:10px 24px; border-radius:8px; border:none; font-weight:bold;">Save</button>', tags: ["Primary", "CTA"], date: "2025-01-01", likes: 50 },
    { id: 202, type: "button", title: "Ghost Button", category: "system", elements: ["space", "typo"], level: "beginner", desc: "背景に溶け込むサブボタン。", html: '<button style="background:transparent; color:#3b82f6; padding:10px 24px; border:2px solid #3b82f6; border-radius:8px; font-weight:bold;">Cancel</button>', tags: ["Secondary", "Ghost"], date: "2025-01-02", likes: 40 },
    { id: 203, type: "button", title: "FAB (Floating)", category: "media", elements: ["shadow", "cta"], level: "intermediate", desc: "画面に常駐する重要ボタン。", html: '<button style="width:50px; height:50px; background:#fcd34d; color:#0b1120; border-radius:50%; border:none; display:flex; align-items:center; justify-content:center; box-shadow:0 4px 10px rgba(0,0,0,0.3);"><i data-lucide="plus"></i></button>', tags: ["FAB", "Mobile"], date: "2025-01-03", likes: 80 },
    { id: 204, type: "button", title: "Icon Button", category: "system", elements: ["icon", "space"], level: "beginner", desc: "省スペースな操作ボタン。", html: '<button style="background:#1e293b; color:white; padding:10px; border-radius:8px; border:none;"><i data-lucide="settings"></i></button>', tags: ["Icon", "Tool"], date: "2025-01-04", likes: 30 },
    { id: 205, type: "button", title: "Disabled", category: "system", elements: ["color", "feedback"], level: "intermediate", desc: "押せない状態の表現。", html: '<button style="background:#475569; color:#94a3b8; padding:10px 24px; border-radius:8px; border:none; font-weight:bold; cursor:not-allowed;">Send</button>', tags: ["State", "Form"], date: "2025-01-05", likes: 25 },
    { id: 206, type: "button", title: "Loading", category: "system", elements: ["feedback", "motion"], level: "advanced", desc: "処理中を伝えるボタン。", html: '<button style="background:#3b82f6; color:white; padding:10px 24px; border-radius:8px; border:none; font-weight:bold; opacity:0.8;"><i data-lucide="loader-2" class="animate-spin"></i></button>', tags: ["State", "Feedback"], date: "2025-01-06", likes: 60 },
    { id: 207, type: "button", title: "Destructive", category: "system", elements: ["color", "alert"], level: "intermediate", desc: "危険な操作（削除など）。", html: '<button style="background:#ef4444; color:white; padding:10px 24px; border-radius:8px; border:none; font-weight:bold;">Delete</button>', tags: ["Danger", "Alert"], date: "2025-01-07", likes: 45 },
    { id: 208, type: "button", title: "Toggle Switch", category: "system", elements: ["motion", "state"], level: "intermediate", desc: "ON/OFFの切り替え。", html: '<div style="width:50px; height:28px; background:#3b82f6; border-radius:14px; position:relative;"><div style="width:24px; height:24px; background:white; border-radius:50%; position:absolute; top:2px; right:2px;"></div></div>', tags: ["Switch", "Form"], date: "2025-01-08", likes: 70 },
    { id: 209, type: "button", title: "Chip", category: "ec", elements: ["typo"], level: "beginner", desc: "選択肢。", html: '<span style="background:rgba(255,255,255,0.1);padding:6px 12px;border-radius:99px;color:white;border:1px solid #555;">Option</span>', tags: ["Chip", "UI"], date: "2025-01-09", likes: 60 },
    { id: 210, type: "button", title: "Link", category: "system", elements: ["typo"], level: "beginner", desc: "テキストリンク。", html: '<span style="color:#3b82f6;text-decoration:underline;cursor:pointer;">Read more</span>', tags: ["Text", "Link"], date: "2025-01-10", likes: 60 },

    // --- Icons ---
    { id: 301, type: "icon", title: "Home", category: "system", html: '<i data-lucide="home" size="32"></i>', tags: ["Nav"], date: "2025-01-01", likes: 10 },
    { id: 302, type: "icon", title: "Search", category: "system", html: '<i data-lucide="search" size="32"></i>', tags: ["Action"], date: "2025-01-01", likes: 10 },
    { id: 303, type: "icon", title: "Menu", category: "system", html: '<i data-lucide="menu" size="32"></i>', tags: ["Nav"], date: "2025-01-01", likes: 10 },
    { id: 304, type: "icon", title: "User", category: "sns", html: '<i data-lucide="user" size="32"></i>', tags: ["Profile"], date: "2025-01-01", likes: 10 },
    { id: 305, type: "icon", title: "Bell", category: "sns", html: '<i data-lucide="bell" size="32"></i>', tags: ["Status"], date: "2025-01-01", likes: 10 },
    { id: 306, type: "icon", title: "Heart", category: "sns", html: '<i data-lucide="heart" size="32"></i>', tags: ["Action"], date: "2025-01-01", likes: 10 },
    { id: 307, type: "icon", title: "Edit", category: "system", html: '<i data-lucide="edit" size="32"></i>', tags: ["Action"], date: "2025-01-01", likes: 10 },
    { id: 308, type: "icon", title: "Trash", category: "system", html: '<i data-lucide="trash-2" size="32"></i>', tags: ["Action"], date: "2025-01-01", likes: 10 },
    { id: 309, type: "icon", title: "Settings", category: "system", html: '<i data-lucide="settings" size="32"></i>', tags: ["Action"], date: "2025-01-01", likes: 10 },
    { id: 310, type: "icon", title: "Check", category: "system", html: '<i data-lucide="check-circle" size="32"></i>', tags: ["Status"], date: "2025-01-01", likes: 10 },
    { id: 311, type: "icon", title: "Alert", category: "system", html: '<i data-lucide="alert-triangle" size="32"></i>', tags: ["Status"], date: "2025-01-01", likes: 10 },
    { id: 312, type: "icon", title: "Image", category: "media", html: '<i data-lucide="image" size="32"></i>', tags: ["Media"], date: "2025-01-01", likes: 10 },
    { id: 313, type: "icon", title: "Video", category: "media", html: '<i data-lucide="video" size="32"></i>', tags: ["Media"], date: "2025-01-01", likes: 10 },
    { id: 314, type: "icon", title: "Share", category: "sns", html: '<i data-lucide="share-2" size="32"></i>', tags: ["Action"], date: "2025-01-01", likes: 10 },
    { id: 315, type: "icon", title: "Download", category: "system", html: '<i data-lucide="download" size="32"></i>', tags: ["Action"], date: "2025-01-01", likes: 10 },
    { id: 316, type: "icon", title: "Arrow", category: "system", html: '<i data-lucide="arrow-right" size="32"></i>', tags: ["Nav"], date: "2025-01-01", likes: 10 },
];

/* Logic */
let state = { search: "", filters: {}, sort: "new", showFavorites: false };
let favoriteIds = JSON.parse(localStorage.getItem('soruto_favorites')) || [];

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
        if (e.target.closest('a, button, .filter-head, .gallery-card, .theme-card, .fav-toggle-label, input, select')) {
            cursor.classList.add('hovered');
        } else {
            cursor.classList.remove('hovered');
        }
    });
}

window.forceFilter = function(type, value) {
    if (type === 'theme') {
        window.location.href = `gallery_detail.html?theme=${value}`;
    }
};

window.goToDetail = function(id) {
    window.location.href = `gallery_detail.html?id=${id}`;
};

// ★追加: ハンバーガーメニュー制御
window.toggleMobileMenu = function() {
    const menu = document.querySelector('.mobile-menu');
    const hamburger = document.querySelector('.hamburger');
    if(menu) menu.classList.toggle('active');
    if(hamburger) hamburger.classList.toggle('active');
};

document.addEventListener("DOMContentLoaded", () => {
    initCursor();
    if(typeof lucide !== 'undefined') lucide.createIcons();
    initStarfield();
    initGallery();
    
    const observer = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if(e.isIntersecting) e.target.classList.add('visible');
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.fade-in-up').forEach(el => observer.observe(el));
});

function initGallery() {
    setupFilters();
    renderGallery();
}

function setupFilters() {
    const searchInput = document.getElementById('gallery-search');
    if(searchInput) {
        searchInput.addEventListener('input', (e) => {
            state.search = e.target.value.toLowerCase();
            renderGallery();
        });
    }

    document.querySelectorAll('input[type="checkbox"]:not(#fav-filter-checkbox)').forEach(input => {
        input.addEventListener('change', () => {
            const name = input.name;
            if(!state.filters[name]) state.filters[name] = [];
            
            if(input.checked) state.filters[name].push(input.value);
            else state.filters[name] = state.filters[name].filter(v => v !== input.value);
            
            syncCheckboxes(name, input.value, input.checked);
            renderGallery();
        });
    });

    const sortSelect = document.getElementById('gallery-sort');
    if(sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            state.sort = e.target.value;
            renderGallery();
        });
    }
}

window.toggleFavFilter = function(checkbox) {
    state.showFavorites = checkbox.checked;
    renderGallery();
};

function syncCheckboxes(name, value, checked) {
    const allInputs = document.querySelectorAll(`input[name="${name}"][value="${value}"]`);
    allInputs.forEach(input => input.checked = checked);
}

window.toggleFavorite = function(event, id) {
    event.stopPropagation();
    const btn = event.currentTarget;
    
    if (favoriteIds.includes(id)) {
        favoriteIds = favoriteIds.filter(favId => favId !== id);
        btn.classList.remove('active');
        const icon = btn.querySelector('i');
        if(icon) { icon.classList.remove('text-pink-500', 'fill-pink-500'); }
    } else {
        favoriteIds.push(id);
        btn.classList.add('active');
        const icon = btn.querySelector('i');
        if(icon) {
            gsap.fromTo(icon, { scale: 0.8 }, { scale: 1.2, duration: 0.2, yoyo: true, repeat: 1 });
        }
    }
    localStorage.setItem('soruto_favorites', JSON.stringify(favoriteIds));
    if (state.showFavorites) renderGallery();
};

function renderGallery() {
    let filtered = GALLERY_DATA.filter(item => {
        if (state.showFavorites && !favoriteIds.includes(item.id)) return false;

        const hitSearch = (item.title + (item.desc||"") + (item.tags||[]).join("")).toLowerCase().includes(state.search);
        let hitFilter = true;
        for (const key in state.filters) {
            if (state.filters[key].length > 0) {
                if (key === 'element' && item.elements) {
                     if (!item.elements.some(e => state.filters[key].includes(e))) hitFilter = false;
                } else {
                     if (!state.filters[key].includes(item[key])) hitFilter = false;
                }
            }
        }
        return hitSearch && hitFilter;
    });

    if(state.sort === 'level_asc') filtered.sort((a, b) => (a.level === 'beginner' ? -1 : 1));

    renderGrid('grid-screen', filtered.filter(i => i.type === 'screen'));
    renderGrid('grid-button', filtered.filter(i => i.type === 'button'));
    renderGrid('grid-icon', filtered.filter(i => i.type === 'icon'));

    const countEl = document.getElementById('display-count');
    if(countEl) countEl.innerText = filtered.length + '件';
    
    const chipsEl = document.getElementById('active-chips');
    if(chipsEl) chipsEl.innerHTML = createChips();
    
    if(typeof lucide !== 'undefined') lucide.createIcons();
    setTimeout(() => {
        document.querySelectorAll('.fade-in-up').forEach(el => el.classList.add('visible'));
    }, 100);
}

function renderGrid(containerId, items) {
    const container = document.getElementById(containerId);
    if (!container) return;
    const section = container.closest('.gallery-section-group');
    
    if (items.length === 0) {
        container.innerHTML = '';
        if (section) section.style.display = 'none';
        return;
    }
    
    if (section) section.style.display = 'block';
    container.innerHTML = '';

    items.forEach(item => {
        const cardClass = item.type === 'screen' ? 'gallery-card card-screen fade-in-up' : 'gallery-card fade-in-up';
        const card = document.createElement('div');
        card.className = cardClass;
        
        let visual = '';
        if(item.type === 'screen') {
            const imgContent = item.img 
                ? `<img src="${item.img}" alt="${item.title}">` 
                : `<div class="mock-ui"><i data-lucide="layout" style="width:40px;height:40px;margin-bottom:10px;"></i><br>${item.title} UI</div>`;
            visual = `<div class="card-img-wrapper">${imgContent}</div>`;
        } else if(item.type === 'button') {
            visual = `<div class="card-demo-area">${item.html}</div>`;
        } else {
            visual = `<div class="card-icon-area">${item.html}</div>`;
        }

        const isFav = favoriteIds.includes(item.id);
        const activeClass = isFav ? 'active' : '';

        card.innerHTML = `
            <button class="card-fav-btn ${activeClass}" onclick="toggleFavorite(event, ${item.id})">
                <i data-lucide="heart" class="w-5 h-5 ${isFav ? 'text-pink-500 fill-pink-500' : ''}"></i>
            </button>
            <div onclick="goToDetail(${item.id})" style="height:100%; display:flex; flex-direction:column; cursor:pointer;">
                ${visual}
                <div class="card-content">
                    <h3>${item.title}</h3>
                    ${item.desc ? `<p class="desc">${item.desc}</p>` : ''}
                    <div class="tags">
                        ${(item.tags || []).map(t => `<span>#${t}</span>`).join('')}
                    </div>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

function createChips() {
    let html = '';
    for(const key in state.filters) {
        state.filters[key].forEach(val => {
            html += `<div class="chip" onclick="removeFilter('${key}', '${val}')">${val} <i data-lucide="x" size="12"></i></div>`;
        });
    }
    return html;
}

window.removeFilter = function(key, val) {
    const input = document.querySelector(`input[name="${key}"][value="${val}"]`);
    if(input) input.click();
}

// スマホ用フィルター（追加）
window.toggleSpFilter = function() {
    const sheet = document.getElementById('sp-bottom-sheet');
    const overlay = document.querySelector('.sheet-overlay');
    if(sheet) sheet.classList.toggle('active');
    if(overlay) overlay.classList.toggle('active');
    
    // 中身を移動させる簡易ロジック（PC用サイドバーの中身をスマホ用にコピー）
    const pcInner = document.querySelector('.gallery-sidebar .sidebar-inner');
    const spContainer = document.getElementById('sp-filter-container');
    if (pcInner && spContainer && spContainer.innerHTML.trim() === '') {
        spContainer.innerHTML = pcInner.innerHTML;
        // ID重複を避けるためIDを削除または変更する処理が必要だが、今回は簡易的にコピーのみ
        // 本格的にはイベントリスナーの再設定が必要になるため、今回はコピー元のHTML構造を利用するだけに留める
    }
}

window.toggleMobileMenu = function() {
    const menu = document.querySelector('.mobile-menu');
    const hamburger = document.querySelector('.hamburger');
    if(menu) menu.classList.toggle('active');
    if(hamburger) hamburger.classList.toggle('active');
}

// フィルター開閉
window.toggleFilter = function(header) {
    const group = header.parentElement;
    group.classList.toggle('open');
};

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
        ctx.clearRect(0,0,w,h);
        ctx.fillStyle = "#fff";
        stars.forEach(s => { s.y -= s.speed; if(s.y < 0) s.y = h; ctx.beginPath(); ctx.arc(s.x, s.y, s.size, 0, Math.PI*2); ctx.fill(); });
        requestAnimationFrame(animate);
    };
    animate();
}