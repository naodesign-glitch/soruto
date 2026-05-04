// ==========================================
// 0. Splash Screen Logic
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    const splash = document.getElementById('splash-screen');
    const navEntries = performance.getEntriesByType("navigation");
    const navType = navEntries.length > 0 ? navEntries[0].type : 'navigate';
    const isVisited = sessionStorage.getItem('soruto_visited');

    if (navType === 'reload' || !isVisited) {
        if(splash) {
            splash.style.display = 'flex';
            splash.style.opacity = '1';
            splash.style.zIndex = '10000';
            sessionStorage.setItem('soruto_visited', 'true');
            setTimeout(launchAppAuto, 1500); 
        }
    } else {
        if (splash) {
            splash.style.display = 'none';
            splash.style.opacity = '0';
            splash.style.zIndex = '-1';
            splash.style.pointerEvents = 'none';
        }
    }
    if(typeof lucide !== 'undefined') lucide.createIcons();
});

function launchAppAuto() {
    const splash = document.getElementById('splash-screen');
    if(!splash) return;
    const frame = splash.querySelector('.phone-frame');
    const icon = splash.querySelector('.app-icon');
    if(icon) icon.style.transform = "scale(0.9)";
    setTimeout(() => {
        if(frame) frame.classList.add('active');
        setTimeout(() => {
            if(frame) { frame.style.transform = "scale(30)"; frame.style.opacity = "0"; }
            if(splash) { splash.style.backgroundColor = "transparent"; splash.style.transition = "opacity 0.8s ease 0.2s"; }
            setTimeout(() => {
                if(splash) splash.style.opacity = "0";
                setTimeout(() => { 
                    if(splash) {
                        splash.style.display = "none"; 
                        splash.style.zIndex = "-1";
                        splash.style.pointerEvents = "none";
                    }
                    ScrollTrigger.refresh(); 
                }, 1000);
            }, 200);
        }, 200);
    }, 300);
}

window.launchAppManual = function() { launchAppAuto(); }

// ==========================================
// 1. Initialization (Window Load)
// ==========================================
window.onload = function() {
    initThreeJS();
    setTimeout(() => {
        checkCarouselLayout('all');
        ScrollTrigger.refresh();
    }, 100);
};

// ==========================================
// 2. Carousel Logic (Fix: PC Slider Sync)
// ==========================================
let draggables = []; 

window.checkCarouselLayout = function(filterType) {
    draggables.forEach(d => { if(d.kill) d.kill(); });
    draggables = [];

    initSliderFinal('#carousel-content', '.carousel-track', '#scroll-bar', filterType);
    initSliderFinal('#ui-carousel', '.carousel-track', '#ui-scroll-bar', 'all');
};

function initSliderFinal(wrapSelector, trackSelector, barSelector, filterType) {
    const wrap = document.querySelector(wrapSelector);
    if (!wrap) return;
    const track = wrap.querySelector(trackSelector);
    const bar = document.querySelector(barSelector);
    const trackParent = bar ? bar.parentElement : null;

    if (filterType !== 'all' && wrapSelector === '#carousel-content') {
        track.querySelectorAll('.gallery-item').forEach(el => {
            if (el.classList.contains(filterType)) {
                el.style.display = 'flex';
                gsap.set(el, { opacity: 1, scale: 1 });
            } else {
                el.style.display = 'none';
            }
        });
    } else if (filterType === 'all' && wrapSelector === '#carousel-content') {
        track.querySelectorAll('.gallery-item').forEach(el => {
            el.style.display = 'flex';
            gsap.set(el, { opacity: 1, scale: 1 });
        });
    }

    const images = track.querySelectorAll('img');
    const promises = Array.from(images).map(img => {
        if (img.complete) return Promise.resolve();
        return new Promise(resolve => {
            img.onload = resolve;
            img.onerror = resolve; 
        });
    });

    Promise.all(promises).then(() => {
        setupSlider(wrap, track, bar, trackParent);
    });
}

function setupSlider(wrap, track, bar, trackParent) {
    const visibleItems = Array.from(track.children).filter(el => {
        return window.getComputedStyle(el).display !== 'none';
    });
    
    if (visibleItems.length === 0) {
        if(trackParent) trackParent.style.opacity = '0';
        return;
    }

    if (window.innerWidth > 1024) {
        wrap.style.overflowX = 'hidden';
        track.style.transform = 'translate3d(0,0,0)';
        track.style.paddingRight = '0';
        track.style.width = 'max-content';

        const firstItem = visibleItems[0];
        const style = window.getComputedStyle(firstItem);
        const itemWidth = firstItem.offsetWidth + parseFloat(style.marginLeft) + parseFloat(style.marginRight) + 32; 
        const totalContentWidth = (itemWidth * visibleItems.length) + 100;
        
        track.style.width = `${totalContentWidth}px`; 

        if (totalContentWidth <= wrap.offsetWidth) {
            if(trackParent) trackParent.style.opacity = '0';
            gsap.set(track, { x: 0 });
            if(bar) gsap.set(bar, { x: 0 });
            return;
        }
        
        if(trackParent) trackParent.style.opacity = '1';

        const maxScroll = wrap.offsetWidth - totalContentWidth;

        gsap.set(track, { x: 0 });
        if(bar) gsap.set(bar, { x: 0 });

        const contentDrag = Draggable.create(track, {
            type: "x",
            bounds: { minX: maxScroll, maxX: 0 },
            edgeResistance: 0.65,
            inertia: true,
            onDrag: function() { syncBarFromContent(this.x, maxScroll, bar, trackParent); },
            onThrowUpdate: function() { syncBarFromContent(this.x, maxScroll, bar, trackParent); }
        })[0];
        draggables.push(contentDrag);

        if (bar && trackParent) {
            const barDrag = Draggable.create(bar, {
                type: "x",
                bounds: trackParent,
                inertia: true,
                onDrag: function() {
                    const progress = this.x / (trackParent.offsetWidth - bar.offsetWidth);
                    const destX = maxScroll * progress;
                    gsap.set(track, { x: destX });
                    if(contentDrag) contentDrag.update();
                },
                onThrowUpdate: function() {
                    const progress = this.x / (trackParent.offsetWidth - bar.offsetWidth);
                    const destX = maxScroll * progress;
                    gsap.set(track, { x: destX });
                    if(contentDrag) contentDrag.update();
                }
            })[0];
            draggables.push(barDrag);
        }

    } else {
        wrap.style.overflowX = 'auto';
        track.style.transform = 'none'; 
        track.style.width = 'max-content';
        track.style.paddingRight = '120px'; 

        if(trackParent) trackParent.style.opacity = '1';

        const onScrollSync = () => {
            if (!bar || !trackParent) return;
            const maxScroll = wrap.scrollWidth - wrap.clientWidth;
            if (maxScroll <= 0) return;

            const progress = wrap.scrollLeft / maxScroll;
            const barMax = trackParent.clientWidth - bar.clientWidth;
            
            bar.style.transform = `translate3d(${progress * barMax}px, 0, 0)`;
        };

        wrap.removeEventListener('scroll', onScrollSync);
        wrap.addEventListener('scroll', onScrollSync, { passive: true });
        
        wrap.scrollLeft = 0;
        onScrollSync();
    }
}

function syncBarFromContent(currentX, maxScroll, bar, trackParent) {
    if (!bar || !trackParent || maxScroll === 0) return;
    let progress = currentX / maxScroll; 
    progress = Math.max(0, Math.min(1, progress));
    const barMaxMove = trackParent.offsetWidth - bar.offsetWidth;
    gsap.set(bar, { x: progress * barMaxMove });
}

// ==========================================
// UI Logic
// ==========================================
window.filterGallery = function(cat) {
    const btns = document.querySelectorAll('.category-btn');
    btns.forEach(b => b.classList.remove('active'));
    const clickedBtn = event.target.closest('button');
    if(clickedBtn) clickedBtn.classList.add('active');

    checkCarouselLayout(cat);
    
    if(window.innerWidth > 1024) {
        const track = document.querySelector('#carousel-content .carousel-track');
        if(track) {
            const visible = Array.from(track.children).filter(el => el.style.display !== 'none');
            visible.forEach((el, i) => {
                gsap.fromTo(el, 
                    { opacity: 0, scale: 0.9 }, 
                    { opacity: 1, scale: 1, duration: 0.4, delay: i * 0.05, overwrite: true }
                );
            });
        }
    }
}

window.toggleLike = function(btn) {
    btn.classList.toggle('liked');
    if(btn.classList.contains('liked')) {
        gsap.fromTo(btn.querySelector('svg'), { scale: 1 }, { scale: 1.3, duration: 0.15, yoyo: true, repeat: 1, ease: "power2.out" });
        const icon = btn.querySelector('svg');
        if(icon) {
            icon.style.setProperty('fill', '#f472b6', 'important');
            icon.style.setProperty('color', '#f472b6', 'important');
            icon.style.setProperty('stroke', '#f472b6', 'important');
        }
    } else {
        const icon = btn.querySelector('svg');
        if(icon) { icon.style.fill = ''; icon.style.color = ''; icon.style.stroke = ''; }
    }
};

window.pressBtn = function(btn) { btn.classList.add('pressed'); };
window.releaseBtn = function(btn) { setTimeout(() => { btn.classList.remove('pressed'); }, 100); };

window.toggleSecret = function(card) {
    if (window.innerWidth <= 1024) {
        card.classList.toggle('active');
    }
}

window.toggleComparison = function(type) {
    const badBtn = document.getElementById('bad-btn');
    const goodBtn = document.getElementById('good-btn');
    const badExample = document.getElementById('bad-example');
    const goodExample = document.getElementById('good-example');
    
    if(type === 'bad') {
        badBtn.classList.add('primary');
        goodBtn.classList.remove('primary');
        badExample.classList.remove('opacity-0');
        goodExample.classList.add('opacity-0');
        updateComparisonBubble('うーん、これはちょっと<br>使いにくいかも…');
    } else {
        goodBtn.classList.add('primary');
        badBtn.classList.remove('primary');
        goodExample.classList.remove('opacity-0');
        badExample.classList.add('opacity-0');
        updateComparisonBubble('これなら直感的で<br>わかりやすいね！');
    }
}

window.updateComparisonBubble = function(msg) {
    const bubble = document.querySelector('#comparison .speech-bubble');
    if(bubble) {
        gsap.to(bubble, { scale: 0.9, duration: 0.1, onComplete: () => {
            bubble.innerHTML = msg;
            gsap.to(bubble, { scale: 1, duration: 0.2, ease: "back.out(1.7)" });
        }});
    }
};

window.scrollToSection = function(id) { gsap.to(window, { duration: 1.5, scrollTo: id, ease: "power3.inOut" }); };

window.handleNavClick = function(e, id) {
    e.preventDefault(); scrollToSection(id);
    const menu = document.querySelector('.mobile-menu');
    if (menu && menu.classList.contains('active')) {
        menu.classList.remove('active');
        document.querySelector('.hamburger').classList.remove('active');
    }
};

// ★修正: ハンバーガーメニュー開閉処理
window.toggleMobileMenu = function() {
    const menu = document.querySelector('.mobile-menu');
    const hamburger = document.querySelector('.hamburger');
    if(menu) menu.classList.toggle('active');
    if(hamburger) hamburger.classList.toggle('active');
}

window.addEventListener('resize', () => {
    adjustThreeJSOnResize();
    const activeBtn = document.querySelector('.category-btn.active');
    let currentFilter = 'all';
    if (activeBtn) {
        const match = activeBtn.getAttribute('onclick').match(/'([^']+)'/);
        if (match) currentFilter = match[1];
    }
    checkCarouselLayout(currentFilter);
});

function adjustThreeJSOnResize() {
    if(typeof renderer !== 'undefined' && typeof camera !== 'undefined') {
        const width = window.innerWidth;
        const height = window.innerHeight;
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        
        const aspect = width / height;
        let targetZ = 30; 
        if (aspect < 1.0) { targetZ = 30 / aspect; }
        camera.position.z = targetZ;
    }
}

const cursor = document.getElementById('custom-cursor');
window.addEventListener('mousemove', e => { if(cursor && window.innerWidth > 1024) { cursor.style.left = e.clientX + 'px'; cursor.style.top = e.clientY + 'px'; } });
document.querySelectorAll('a, button, .cursor-pointer, input, label, .char-box, .neu-card, .glass-panel, .gallery-item, #drag-item, .carousel-item, #scroll-to-top, #toggle-btn, .logo, .phone-frame, .ui-phone-card').forEach(el => {
    el.addEventListener('mouseenter', () => { if(cursor && window.innerWidth > 1024) cursor.classList.add('hovered'); });
    el.addEventListener('mouseleave', () => { if(cursor && window.innerWidth > 1024) cursor.classList.remove('hovered'); });
});

const scrollTopBtn = document.getElementById('scroll-to-top');
window.addEventListener('scroll', () => {
    if(scrollTopBtn) { if (window.scrollY > 500) { scrollTopBtn.classList.add('visible'); } else { scrollTopBtn.classList.remove('visible'); } }
    const comparisonSection = document.getElementById('comparison');
    if(comparisonSection) { const top = comparisonSection.offsetTop; if (window.scrollY > top - 200) { document.body.classList.add('deep-mode'); } else { document.body.classList.remove('deep-mode'); } }
});

// Three.js Setup
let scene, camera, renderer, wires = [], iconsGroup, parts, archGroup, glassMat, iconMat, clock, mx = 0, my = 0;
function initThreeJS() {
    const container = document.getElementById('webgl-container');
    if(!container) return;
    scene = new THREE.Scene(); scene.background = new THREE.Color(0xf0f9ff); scene.fog = new THREE.FogExp2(0xf0f9ff, 0.015);
    camera = new THREE.PerspectiveCamera(50, window.innerWidth/window.innerHeight, 0.1, 1000); camera.position.set(0, 0, 30);
    
    adjustThreeJSOnResize();
    
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setSize(window.innerWidth, window.innerHeight); renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    container.appendChild(renderer.domElement);
    scene.add(new THREE.AmbientLight(0xffffff, 0.7));
    const dl = new THREE.DirectionalLight(0xffffff, 0.8); dl.position.set(10, 20, 15); scene.add(dl);
    const bl = new THREE.PointLight(0x3b82f6, 3.0, 50); bl.position.set(-15, 10, 5); scene.add(bl);
    glassMat = new THREE.MeshPhysicalMaterial({ color: 0xffffff, metalness: 0.1, roughness: 0.1, transmission: 0.6, thickness: 1.0, clearcoat: 1.0, side: THREE.DoubleSide });
    iconMat = new THREE.MeshPhysicalMaterial({ color: 0x60a5fa, metalness: 0.4, roughness: 0.2, transmission: 0.1, thickness: 1.0, clearcoat: 1.0, emissive: 0x2563eb, emissiveIntensity: 0.2 });
    archGroup = new THREE.Group();
    const ring1 = new THREE.Mesh(new THREE.TorusGeometry(12, 1.5, 64, 100), glassMat); archGroup.add(ring1);
    const pGeo = new THREE.BufferGeometry(); const pCount = 600; const pPos = new Float32Array(pCount*3);
    for(let i=0; i<pCount*3; i++) pPos[i] = (Math.random()-0.5)*100;
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    parts = new THREE.Points(pGeo, new THREE.PointsMaterial({color:0x60a5fa, size:0.3, transparent:true, opacity:0.6}));
    scene.add(parts); archGroup.position.set(0, 0, -10); scene.add(archGroup); iconsGroup = new THREE.Group(); scene.add(iconsGroup);
    const createDetailedUI = (type, x, y, z) => {
        const g = new THREE.Group(); g.position.set(x, y, z);
        const plate = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 0.2), glassMat); let sym = new THREE.Group();
        if(type === 'search'){ const r = new THREE.Mesh(new THREE.TorusGeometry(1.0, 0.2, 16, 32), iconMat); const h = new THREE.Mesh(new THREE.BoxGeometry(0.3, 1.2, 0.2), iconMat); h.position.set(0.8, -0.8, 0); h.rotation.z = -Math.PI/4; sym.add(r); sym.add(h); }
        else if (type === 'play') { const shape = new THREE.Shape(); shape.moveTo(0, 1.0); shape.lineTo(1.0, -0.5); shape.lineTo(-1.0, -0.5); shape.lineTo(0, 1.0); const tGeo = new THREE.ExtrudeGeometry(shape, { depth: 0.3, bevelEnabled: false }); const t = new THREE.Mesh(tGeo, iconMat); t.rotation.z = -Math.PI/2; t.position.x = -0.3; t.position.y = 0.3; sym.add(t); }
        else if (type === 'cursor') { const shape = new THREE.Shape(); shape.moveTo(0,0); shape.lineTo(0.6, -1.8); shape.lineTo(0, -1.4); shape.lineTo(-0.6, -1.8); shape.lineTo(0,0); const cGeo = new THREE.ExtrudeGeometry(shape, {depth:0.2, bevelEnabled:false}); const cur = new THREE.Mesh(cGeo, iconMat); cur.rotation.z = -Math.PI/4; cur.position.set(-0.3, 1.0, 0); sym.add(cur); }
        else if (type === 'toggle') { const cyl = new THREE.Mesh(new THREE.CylinderGeometry(0.6, 0.6, 2.0, 32), glassMat); cyl.rotation.z = Math.PI/2; const ball = new THREE.Mesh(new THREE.SphereGeometry(0.7, 32, 32), iconMat); ball.position.x = 0.6; sym.add(cyl); sym.add(ball); }
        else if (type === 'volume') { const spk = new THREE.Mesh(new THREE.BoxGeometry(0.8, 1.2, 0.4), iconMat); spk.position.x = -0.4; const cone = new THREE.Mesh(new THREE.ConeGeometry(0.8, 1.2, 32), iconMat); cone.rotation.z = -Math.PI/2; cone.position.x = 0.4; sym.add(spk); sym.add(cone); }
        else if (type === 'menu') { const b1 = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.3, 0.2), iconMat); b1.position.y = 0.6; const b2 = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.3, 0.2), iconMat); const b3 = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.3, 0.2), iconMat); b3.position.y = -0.6; sym.add(b1); sym.add(b2); sym.add(b3); }
        sym.position.z = 0.2; g.add(plate); g.add(sym);
        g.userData = { rotX: (Math.random() - 0.5) * 0.01, rotY: (Math.random() - 0.5) * 0.01 + 0.005, rotZ: (Math.random() - 0.5) * 0.005, floatSpeed: Math.random() * 0.02 + 0.01 };
        g.scale.set(1.5, 1.5, 1.5);
        iconsGroup.add(g);
    };
    for(let i=0; i<30; i++) { createDetailedUI(['search','play','toggle','volume','menu','cursor'][i%6], (Math.random()-0.5)*90, (Math.random()-0.5)*70, (Math.random()-0.5)*50 - 15); }
    wires = []; 
    const wireGeo = new THREE.CylinderGeometry(0.1, 0.1, 80, 4, 1, true); 
    const wireMat = new THREE.MeshBasicMaterial({ color: 0x3b82f6, transparent: true, opacity: 0.15, blending: THREE.AdditiveBlending, wireframe: true });
    for (let i = 0; i < 40; i++) {
        const wire = new THREE.Mesh(wireGeo, wireMat);
        wire.position.set((Math.random() - 0.5) * 80, (Math.random() - 0.5) * 80, (Math.random() - 0.5) * 60 - 20);
        wire.rotation.x = Math.random() * Math.PI; wire.rotation.z = Math.random() * Math.PI * 0.5;
        wire.userData = { speed: Math.random() * 0.02 + 0.01 };
        scene.add(wire); wires.push(wire);
    }
    clock = new THREE.Clock();
    window.addEventListener('mousemove', e=>{mx=(e.clientX/window.innerWidth)*2-1; my=-(e.clientY/window.innerHeight)*2+1;});
    animate();
    const colors = ["#f0f9ff", "#bae6fd", "#1e40af", "#020617"];
    gsap.timeline({scrollTrigger:{trigger:"#hero", start:"top top", end:"bottom top", scrub:1}})
        .to(camera.position, {z: -15, ease: "power2.in"}, 0)
        .to(archGroup.position, {z: 20, ease: "power2.in"}, 0)
        .to(archGroup.scale, {x:5, y:5}, 0)
        .to(glassMat, {opacity: 0}, 0.8) 
        .set(archGroup, {visible: false}, 1);
    gsap.timeline({scrollTrigger:{trigger:"body", start:"top top", end:"bottom bottom", scrub:1,
        onUpdate: (self) => { if (self.progress > 0.4) { document.body.classList.add('deep-mode'); } else { document.body.classList.remove('deep-mode'); } }
    }})
    .to('body', {backgroundColor: colors[1]}, 0).to(scene.background, {r:0.73, g:0.9, b:0.99}, 0).to(scene.fog.color, {r:0.73, g:0.9, b:0.99}, 0)
    .to('body', {backgroundColor: colors[2]}, 0.5).to(scene.background, {r:0.12, g:0.25, b:0.69}, 0.5).to(scene.fog.color, {r:0.12, g:0.25, b:0.69}, 0.5)
    .to('body', {backgroundColor: colors[3]}, 1).to(scene.background, {r:0.01, g:0.02, b:0.09}, 1).to(scene.fog.color, {r:0.01, g:0.02, b:0.09}, 1);
    
    gsap.utils.toArray('.stagger-up').forEach(el => {
        gsap.to(el, {scrollTrigger:{trigger:el, start:"top 85%", toggleActions: "play none none reverse"}, opacity:1, y:0, duration:1, ease:"power3.out"});
    });
};

const animate = () => {
    requestAnimationFrame(animate);
    if (!clock || !scene || !camera || !renderer) return;
    const t = clock.getElapsedTime();
    if(parts) parts.rotation.y = t * 0.02; 
    if(iconsGroup) {
        iconsGroup.children.forEach(g => { 
            g.rotation.x += g.userData.rotX; g.rotation.y += g.userData.rotY; g.rotation.z += g.userData.rotZ;
            if(camera) { g.position.z += g.userData.floatSpeed; if(g.position.z > camera.position.z + 10) g.position.z = camera.position.z - 60; }
        });
    }
    if(wires) wires.forEach(w=>{ w.position.z += w.userData.speed*2; if(w.position.z > 20) w.position.z = -50; });
    if(camera) { camera.position.x += (mx*0.3 - camera.position.x)*0.05; camera.position.y += (my*0.3 - camera.position.y)*0.05; camera.lookAt(0,0,0); renderer.render(scene, camera); }
};