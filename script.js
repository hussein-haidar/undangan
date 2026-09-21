/* =====================================================
   UNDANGAN PERNIKAHAN — Script Utama (Supabase)
   ===================================================== */

'use strict';

const $  = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

/* =====================================================
   KONFIGURASI SUPABASE
   Ganti URL dan ANON KEY dengan milik project Anda
   ===================================================== */

const SUPABASE_URL  = 'https://uvngztroskottsfxtgoq.supabase.co';
const SUPABASE_KEY  = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV2bmd6dHJvc2tvdHRzZnh0Z29xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODgwMDgzMzksImV4cCI6MjEwMzU4NDMzOX0.5V-md9L6PSH-XMm_f3xmMyPC7S3sRqORpM-CDgQ5I60';

let db = null;
if (!window.supabase) {
    console.error('Library Supabase (supabase-js) gagal dimuat dari CDN.');
    showToast('Library Supabase gagal dimuat — periksa koneksi internet/CDN');
} else {
    db = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
}

/* =====================================================
   TEMA UNDANGAN
   Menerapkan CSS variables dari tema terpilih (settings.tema).
   Tema bawaan ada di themes.js, tema kustom disimpan di settings.
   ===================================================== */

function resolveWeddingTheme(cfg) {
    const builtins = window.WEDDING_THEMES || {};
    const kustom  = (cfg && Array.isArray(cfg.kustom)) ? cfg.kustom : [];
    const aktif   = (cfg && cfg.aktif) || 'royal-gold';

    const custom = kustom.find(t => t && t.id === aktif && t.vars);
    if (custom) return { id: custom.id, vars: custom.vars, gaya: custom.gaya };
    if (builtins[aktif]) return { id: aktif, vars: builtins[aktif].vars, gaya: builtins[aktif].gaya };
    return null;
}

const DEFAULT_GAYA = { font: 'classic', ornament: 'dove', shape: 'soft', cover: 'center', texture: 'plain', layout: 'klasik' };
const GAYA_ATTRS   = ['font', 'ornament', 'shape', 'cover', 'texture', 'layout'];

/* =====================================================
   SKEMA SUSUNAN HALAMAN (LAYOUT)
   Setiap skema mengatur ULANG urutan seksi di <main> —
   bukan sekadar gaya CSS, tapi komposisi halaman yang
   benar-benar berbeda antar tema.
   ===================================================== */
const LAYOUT_SKEMA = {
    /* urut tampil seksi (id elemen <section> di dalam <main id="content">) */
    'klasik':   ['home', 'mempelai', 'acara', 'galeri', 'hadiah', 'ucapan'],
    'benderang': ['home', 'mempelai', 'galeri', 'acara', 'ucapan', 'hadiah'],
    'modern':   ['home', 'mempelai', 'acara', 'galeri', 'ucapan', 'hadiah'],
    'cerita':   ['home', 'mempelai', 'galeri', 'acara', 'ucapan', 'hadiah'],
    'ringkas':  ['home', 'acara', 'mempelai', 'galeri', 'ucapan', 'hadiah']
};

/* Skema layout bawaan per kelompok font — dipakai bila tema tak set 'layout'. */
const LAYOUT_BY_FONT = {
    classic: 'klasik', luxury: 'benderang', modern: 'modern',
    romantic: 'cerita', minimal: 'ringkas'
};

function applyWeddingLayout(skema) {
    const main = document.getElementById('content');
    if (!main || !LAYOUT_SKEMA[skema]) return;
    /* appendChild memindahkan node ke urutan baru (tidak menggandakan). */
    LAYOUT_SKEMA[skema].forEach(id => {
        const sec = document.getElementById(id);
        if (sec && sec.parentElement === main) main.appendChild(sec);
    });
}

function applyWeddingTheme(cfg) {
    const root = document.documentElement;
    const old  = document.getElementById('wedding-theme-vars');
    if (old) old.remove();
    root.removeAttribute('data-theme');
    GAYA_ATTRS.forEach(a => root.removeAttribute('data-gaya-' + a));

    /* Selalu kembalikan susunan klasik dulu, baru terapkan skema bila tema aktif */
    applyWeddingLayout('klasik');

    if (!cfg || !cfg.aktif || cfg.aktif === 'royal-gold') return;

    const theme = resolveWeddingTheme(cfg);
    if (!theme || theme.id === 'royal-gold') return;

    root.setAttribute('data-theme', theme.id);

    const gaya = Object.assign({}, DEFAULT_GAYA, theme.gaya || {});
    GAYA_ATTRS.forEach(a => {
        if (gaya[a]) root.setAttribute('data-gaya-' + a, gaya[a]);
    });

    /* TERAPKAN SKEMA SUSUNAN: urutan seksi di dalam <main> berubah total */
    applyWeddingLayout(gaya.layout || LAYOUT_BY_FONT[gaya.font] || 'klasik');

    const style = document.createElement('style');
    style.id = 'wedding-theme-vars';
    style.textContent = `html[data-theme="${theme.id}"]{` +
        Object.entries(theme.vars || {}).map(([k, v]) => `${k}:${v};`).join('') +
        '}';
    document.head.appendChild(style);
}

/* =====================================================
   TOAST NOTIFIKASI
   ===================================================== */

let toastTimer;
function showToast(msg) {
    const toast = $('#toast');
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 3200);
}

/* =====================================================
   HELPER — Format Tanggal Indonesia
   ===================================================== */

function tanggalIndo(datetime) {
    const bulan = ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'];
    const hari  = ['Minggu','Senin','Selasa','Rabu','Kamis','Jumat','Sabtu'];
    const ts    = new Date(datetime.replace(' ', 'T') + '+07:00');
    return `${hari[ts.getDay()]}, ${ts.getDate()} ${bulan[ts.getMonth()]} ${ts.getFullYear()}`;
}

function waktuLalu(dateStr) {
    const diff = (Date.now() - new Date(dateStr).getTime()) / 1000;
    if (diff < 60)       return 'baru saja';
    if (diff < 3600)     return Math.floor(diff / 60) + ' menit lalu';
    if (diff < 86400)    return Math.floor(diff / 3600) + ' jam lalu';
    if (diff < 604800)   return Math.floor(diff / 86400) + ' hari lalu';
    return new Date(dateStr).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
}

function gcalUrl(title, start, end, location) {
    const fmt = d => {
        const dt = new Date(d.replace(' ', 'T') + '+07:00');
        return dt.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
    };
    const detail = `Pernikahan ${W.wedding.groom.nama_panggilan} & ${W.wedding.bride.nama_panggilan}`;
    return `https://calendar.google.com/calendar/render?action=TEMPLATE`
         + `&text=${encodeURIComponent(title)}`
         + `&dates=${fmt(start)}/${fmt(end)}`
         + `&details=${encodeURIComponent(detail)}`
         + `&location=${encodeURIComponent(location)}`;
}

function esc(str) {
    const el = document.createElement('span');
    el.textContent = str;
    return el.innerHTML;
}

/* =====================================================
   GLOBAL STATE
   ===================================================== */

const W = {
    wedding: null,
    guestName: new URLSearchParams(window.location.search).get('to') || '',
};

/* =====================================================
   MUSIK LATAR
   ===================================================== */

const music    = $('#bg-music');
const musicBtn = $('#btn-music');

async function loadBackgroundMusic() {
    try {
        const { data, error } = await db
            .from('lagu')
            .select('file_url, title')
            .order('id', { ascending: true })
            .limit(1)
            .maybeSingle();

        if (!error && data?.file_url) {
            music.src = data.file_url;
            music.title = data.title || 'Background Music';
        }
    } catch (err) {
        console.warn('Gagal memuat lagu dari database, menggunakan default:', err);
    }
}

function toggleMusic() {
    if (music.paused) {
        music.play().catch(() => {});
        musicBtn.classList.add('playing');
    } else {
        music.pause();
        musicBtn.classList.remove('playing');
    }
}

musicBtn.addEventListener('click', () => {
    if (!musicBtn.dataset.started) {
        music.play().catch(() => {}).finally(() => musicBtn.classList.add('playing'));
        musicBtn.dataset.started = '1';
        return;
    }
    toggleMusic();
});

/* =====================================================
   COVER / BUKA UNDANGAN
   ===================================================== */

$('#btn-open').addEventListener('click', () => {
    $('#cover').classList.add('opened');
    document.body.classList.remove('locked');
    $('#navbar').hidden = false;
    music.play().catch(() => {});
    musicBtn.hidden = false;
    musicBtn.classList.add('playing');
    musicBtn.dataset.started = '1';
    history.replaceState(null, '', location.pathname);
});

/* =====================================================
   COUNTDOWN
   ===================================================== */

function startCountdown(targetMs) {
    const box = $('#countdown');
    box.dataset.target = targetMs;
    const el = {
        d: $('#cd-days'), h: $('#cd-hours'),
        m: $('#cd-minutes'), s: $('#cd-seconds'),
    };

    function pad(n) { return String(n).padStart(2, '0'); }

    function tick() {
        const diff = targetMs - Date.now();
        if (diff <= 0) {
            box.hidden = true;
            $('#countdown-done').hidden = false;
            return clearInterval(timer);
        }
        el.d.textContent = Math.floor(diff / 86400000);
        el.h.textContent = pad(Math.floor(diff / 3600000) % 24);
        el.m.textContent = pad(Math.floor(diff / 60000) % 60);
        el.s.textContent = pad(Math.floor(diff / 1000) % 60);
    }

    tick();
    const timer = setInterval(tick, 1000);
}

/* =====================================================
   REVEAL SAAT SCROLL
   ===================================================== */

function initReveal() {
    const io = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                io.unobserve(entry.target);
            }
        });
    }, { threshold: .12 });

    $$('.reveal').forEach(el => io.observe(el));
}

/* =====================================================
   NAVBAR BAWAH — status aktif mengikuti section
   ===================================================== */

function initNavSpy() {
    const items = $$('.nav-item');
    const map = new Map();

    items.forEach(item => {
        const section = $(item.getAttribute('href'));
        if (section) map.set(section, item);
    });

    const io = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            items.forEach(i => i.classList.remove('active'));
            map.get(entry.target).classList.add('active');
        });
    }, { rootMargin: '-40% 0px -55% 0px' });

    map.forEach((_, section) => io.observe(section));
}

/* =====================================================
   SALIN NOMOR REKENING
   ===================================================== */

function initCopyButtons() {
    $$('.btn-copy').forEach(btn => {
        btn.addEventListener('click', async () => {
            const text = btn.dataset.copy;
            try {
                await navigator.clipboard.writeText(text);
            } catch {
                const ta = document.createElement('textarea');
                ta.value = text;
                document.body.appendChild(ta);
                ta.select();
                document.execCommand('copy');
                ta.remove();
            }
            showToast('Nomor ' + text + ' berhasil disalin');
        });
    });
}

/* =====================================================
   LIGHTBOX GALERI
   ===================================================== */

function initLightbox() {
    const lb   = $('#lightbox');
    const img  = $('#lightbox-img');
    const pics = $$('.gallery-item').map(f => f.dataset.src);
    let index  = 0;

    function show(i) {
        index = (i + pics.length) % pics.length;
        img.src = pics[index];
    }

    function open(i)  { show(i); lb.hidden = false; document.body.style.overflow = 'hidden'; }
    function close()  { lb.hidden = true; document.body.style.overflow = ''; }

    $$('.gallery-item').forEach((figure, i) =>
        figure.addEventListener('click', () => open(i))
    );

    $('.lb-close').addEventListener('click', close);
    $('.lb-prev').addEventListener('click', e => { e.stopPropagation(); show(index - 1); });
    $('.lb-next').addEventListener('click', e => { e.stopPropagation(); show(index + 1); });

    lb.addEventListener('click', e => { if (e.target === lb) close(); });

    document.addEventListener('keydown', e => {
        if (lb.hidden) return;
        if (e.key === 'Escape')     close();
        if (e.key === 'ArrowLeft')  show(index - 1);
        if (e.key === 'ArrowRight') show(index + 1);
    });
}

/* =====================================================
   RSVP / KONFIRMASI KEHADIRAN
   ===================================================== */

async function loadStats() {
    try {
        const { data, error } = await db.rpc('get_rsvp_stats');
        if (error || !data) return;

        $('#st-hadir').textContent  = data.hadir;
        $('#st-ragu').textContent   = data.ragu;
        $('#st-tidak').textContent  = data.tidak_hadir;
        $('#rsvp-stats').hidden = false;
    } catch { /* diamkan jika gagal */ }
}

$('#form-rsvp').addEventListener('submit', async e => {
    e.preventDefault();

    const form = e.target;
    const btn  = $('#btn-rsvp');
    const name      = form.querySelector('[name="name"]').value.trim();
    const attendance = form.querySelector('[name="attendance"]').value;
    const guests    = parseInt(form.querySelector('[name="guests"]').value, 10);

    if (form.querySelector('[name="website"]').value) return;
    if (!name || !attendance) return;

    const original = btn.innerHTML;
    btn.disabled = true;

    try {
        const { error } = await db.from('rsvps').insert({
            name,
            attendance,
            guests: attendance === 'hadir' ? guests : 0,
        });

        if (error) throw error;

        showToast('Konfirmasi kehadiran terkirim. Terima kasih!');
        form.reset();
        syncGuests();
        loadStats();
    } catch (err) {
        showToast(err.message || 'Gagal mengirim konfirmasi');
    } finally {
        btn.disabled = false;
        btn.innerHTML = original;
    }
});

loadStats();

/* =====================================================
   UCAPAN & DOA
   ===================================================== */

function renderUcapan(item, prepend = false) {
    const list = $('#ucapan-list');
    $('.ucapan-empty')?.remove();

    const div = document.createElement('div');
    div.className = 'ucapan-item';
    div.innerHTML = `
        <div class="ucapan-head">
            <span class="ucapan-name"></span>
            <span class="ucapan-time"></span>
        </div>
        <p class="ucapan-msg"></p>
        <button type="button" class="like-btn" data-id="${item.id}">
            <i class="far fa-heart"></i> <span>${item.likes}</span>
        </button>`;
    div.querySelector('.ucapan-name').textContent = item.name;
    div.querySelector('.ucapan-time').textContent = item.time;
    div.querySelector('.ucapan-msg').textContent  = item.message;

    prepend ? list.prepend(div) : list.append(div);
}

async function loadUcapan() {
    const list = $('#ucapan-list');

    try {
        const { data, error } = await db
            .from('comments')
            .select('id, name, message, likes, created_at')
            .order('id', { ascending: false })
            .limit(100);

        if (error || !data || !data.length) {
            list.innerHTML = '<p class="ucapan-empty">Belum ada ucapan. Jadilah yang pertama memberi doa!</p>';
            return;
        }

        data.forEach(item => renderUcapan({
            id: item.id,
            name: item.name,
            message: item.message,
            likes: item.likes,
            time: waktuLalu(item.created_at),
        }));
    } catch {
        list.innerHTML = '<p class="ucapan-empty">Gagal memuat ucapan.</p>';
    }
}

$('#form-ucapan').addEventListener('submit', async e => {
    e.preventDefault();

    const form  = e.target;
    const btn   = $('#btn-ucapan');
    const name    = form.querySelector('[name="name"]').value.trim();
    const message = form.querySelector('[name="message"]').value.trim();

    if (form.querySelector('[name="website"]').value) return;
    if (!name || !message) return;

    const original = btn.innerHTML;
    btn.disabled = true;

    try {
        const { data, error } = await db
            .from('comments')
            .insert({ name, message })
            .select('id, name, message, likes, created_at')
            .single();

        if (error) throw error;

        renderUcapan({
            id: data.id,
            name: data.name,
            message: data.message,
            likes: data.likes,
            time: 'baru saja',
        }, true);

        $('#ucapan-list').scrollTop = 0;
        form.reset();
        showToast('Ucapan berhasil dikirim. Terima kasih!');
    } catch (err) {
        showToast(err.message || 'Gagal mengirim ucapan');
    } finally {
        btn.disabled = false;
        btn.innerHTML = original;
    }
});

// Like ucapan (event delegation)
$('#ucapan-list').addEventListener('click', async e => {
    const btn = e.target.closest('.like-btn');
    if (!btn || btn.classList.contains('liked')) return;

    btn.classList.add('liked');

    try {
        const { data, error } = await db.rpc('increment_likes', {
            comment_id: parseInt(btn.dataset.id, 10),
        });

        if (error) throw error;

        btn.querySelector('span').textContent = data;
        btn.querySelector('i').className = 'fas fa-heart';
    } catch {
        btn.classList.remove('liked');
    }
});

loadUcapan();

/* =====================================================
   BAGIKAN VIA WHATSAPP
   ===================================================== */

$('#btn-share').addEventListener('click', () => {
    const url  = location.origin + location.pathname +
                 (W.guestName ? '?to=' + encodeURIComponent(W.guestName) : '');
    const groom = W.wedding?.groom?.nama_panggilan || 'Nito';
    const bride = W.wedding?.bride?.nama_panggilan || 'Lusi';
    const date  = W.wedding?.resepsi?.tanggal_waktu
                    ? tanggalIndo(W.wedding.resepsi.tanggal_waktu)
                    : '19 Desember 2026';
    const text  = `*Undangan Pernikahan*\n${groom} & ${bride}\n${date}\n\nSilakan buka undangan berikut ya:\n${url}`;

    window.open('https://wa.me/?text=' + encodeURIComponent(text), '_blank');
});

/* =====================================================
   LOAD DATA DARI SUPABASE & POPULASI HTML
   ===================================================== */

async function loadWeddingData() {
    try {
        const { data, error } = await db
            .from('settings')
            .select('value')
            .eq('key', 'wedding')
            .single();

        if (error || !data) {
            const msg = error ? `${error.message} (code: ${error.code})` : 'data settings kosong';
            console.error('Gagal load data wedding:', error);
            showToast('Gagal memuat data undangan: ' + msg);
            return;
        }

        W.wedding = data.value;
        W.surah = data.value.surah || 'Ar-Rum:21';

        const urlTema = new URLSearchParams(location.search).get('tema');
        const temaCfg = (urlTema && data.value.tema)
            ? Object.assign({}, data.value.tema, { aktif: urlTema })
            : data.value.tema;
        applyWeddingTheme(temaCfg);
        populateHTML(W.wedding);

    } catch (err) {
        console.error('Error loadWeddingData:', err);
        showToast('Error memuat data undangan: ' + (err?.message || err));
    }
}

function populateHTML(w) {
    const gp = w.groom.nama_panggilan;
    const bp = w.bride.nama_panggilan;
    const dateDisplay = tanggalIndo(w.resepsi.tanggal_waktu);

    // Cover
    $('#cv-groom').textContent  = gp;
    $('#cv-bride').textContent  = bp;
    $('#cv-date').textContent   = dateDisplay;
    document.title = `${gp} & ${bp}`;

    // Guest name
    if (W.guestName) {
        $('#cv-guest-name').textContent = W.guestName;
        $('#cover-guest').hidden = false;
    }

    // Hero
    $('#hero-groom').textContent = gp;
    $('#hero-bride').textContent = bp;
    $('#hero-date').textContent  = dateDisplay;

    // Countdown (akad)
    const tsAkad = new Date(w.akad.tanggal_waktu.replace(' ', 'T') + '+07:00').getTime();
    startCountdown(tsAkad);

    // Surah (dynamic, dari settings)
    const surahText = w.surah || 'Ar-Rum:21';
    const surahEl = document.querySelector('#surah-blockquote cite span');
    if (surahEl) surahEl.textContent = surahText;

    // Mempelai
    $('#groom-foto').src        = w.groom.foto;
    $('#groom-foto').alt        = `Foto ${w.groom.nama_lengkap}`;
    $('#groom-nama').textContent = w.groom.nama_lengkap;
    $('#groom-orangtua').textContent = w.groom.putra_dari;
    $('#groom-ig').href         = `https://instagram.com/${w.groom.instagram}`;
    $('#groom-ig-text').textContent = w.groom.instagram;

    $('#bride-foto').src        = w.bride.foto;
    $('#bride-foto').alt        = `Foto ${w.bride.nama_lengkap}`;
    $('#bride-nama').textContent = w.bride.nama_lengkap;
    $('#bride-orangtua').textContent = w.bride.putri_dari;
    $('#bride-ig').href         = `https://instagram.com/${w.bride.instagram}`;
    $('#bride-ig-text').textContent = w.bride.instagram;

    // Fallback kalau foto mempelai belum ada / gagal load
    $('#groom-foto').onerror = function () { this.onerror = null; this.src = 'img/avatar-groom.svg'; };
    $('#bride-foto').onerror = function () { this.onerror = null; this.src = 'img/avatar-bride.svg'; };

    // Acara
    const akadEnd    = new Date(new Date(w.akad.tanggal_waktu.replace(' ', 'T') + '+07:00').getTime() + 2 * 3600000).toISOString().replace('.000Z', '');
    const resepsiEnd = new Date(new Date(w.resepsi.tanggal_waktu.replace(' ', 'T') + '+07:00').getTime() + 3 * 3600000).toISOString().replace('.000Z', '');

    // Acara opsional: Ramah Tamah (tampil hanya jika datanya terisi)
    let extraAcara = '';
    if (w.ramah_tamah && w.ramah_tamah.tanggal_waktu) {
        const r = w.ramah_tamah;
        const rtNama = r.nama || 'Ramah Tamah';
        const rtEnd = new Date(new Date(r.tanggal_waktu.replace(' ', 'T') + '+07:00').getTime() + 2 * 3600000).toISOString().replace('.000Z', '');
        const rtLat = r.lat || '', rtLng = r.lng || '';
        const rtMapsUrl = rtLat && rtLng
            ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(rtLat)},${encodeURIComponent(rtLng)}`
            : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(r.maps_query || r.tempat || '')}`;
        extraAcara = `
        <div class="event-card reveal">
            <div class="event-icon"><i class="fas fa-coffee"></i></div>
            <h3>${esc(rtNama)}</h3>
            <p class="event-date"><i class="far fa-calendar-alt"></i> ${esc(tanggalIndo(r.tanggal_waktu))}</p>
            <p><i class="far fa-clock"></i> ${esc(r.waktu_display || '')}</p>
            <p><i class="fas fa-map-marker-alt"></i> ${esc(r.tempat || '-')}<br><small>${esc(r.alamat || '')}</small></p>
            <div class="event-actions">
                <a class="btn-outline" target="_blank" rel="noopener" href="${rtMapsUrl}">
                    <i class="fas fa-map-marked-alt"></i> Lihat Lokasi
                </a>
                <a class="btn-outline" target="_blank" rel="noopener"
                   href="${esc(gcalUrl(rtNama + ' ' + gp + ' & ' + bp, r.tanggal_waktu, rtEnd, r.tempat || ''))}">
                    <i class="far fa-calendar-plus"></i> Simpan Kalender
                </a>
            </div>
        </div>`;
    }

    // Generate maps URLs from lat/lng if available, fallback to maps_query/maps_embed
    const akadMapsQuery = w.akad.maps_query || '';
    const akadLat = w.akad.lat || '';
    const akadLng = w.akad.lng || '';
    const akadMapsUrl = akadLat && akadLng
        ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(akadLat)},${encodeURIComponent(akadLng)}`
        : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(akadMapsQuery)}`;

    const resepsiMapsEmbed = w.resepsi.maps_embed || '';
    const resepsiLat = w.resepsi.latitude || '';
    const resepsiLng = w.resepsi.longitude || '';
    const resepsiMapsUrl = resepsiLat && resepsiLng
        ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(resepsiLat)},${encodeURIComponent(resepsiLng)}`
        : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(w.resepsi.tempat)}`;

    const showAkad = w.show?.akad !== false;
    const showResepsi = w.show?.resepsi !== false;
    let eventCards = '';
    if (showAkad) eventCards += `
        <div class="event-card reveal">
            <div class="event-icon"><i class="fas fa-ring"></i></div>
            <h3>Akad Nikah</h3>
            <p class="event-date"><i class="far fa-calendar-alt"></i> ${esc(tanggalIndo(w.akad.tanggal_waktu))}</p>
            <p><i class="far fa-clock"></i> ${esc(w.akad.waktu_display)}</p>
            <p><i class="fas fa-map-marker-alt"></i> ${esc(w.akad.tempat)}<br><small>${esc(w.akad.alamat)}</small></p>
            <div class="event-actions">
                <a class="btn-outline" target="_blank" rel="noopener" href="${akadMapsUrl}">
                    <i class="fas fa-map-marked-alt"></i> Lihat Lokasi
                </a>
                <a class="btn-outline" target="_blank" rel="noopener"
                   href="${esc(gcalUrl('Akad Nikah ' + gp + ' & ' + bp, w.akad.tanggal_waktu, akadEnd, w.akad.tempat))}">
                    <i class="far fa-calendar-plus"></i> Simpan Kalender
                </a>
            </div>
        </div>`;
    if (showResepsi) eventCards += `
        <div class="event-card reveal">
            <div class="event-icon"><i class="fas fa-glass-cheers"></i></div>
            <h3>Resepsi</h3>
            <p class="event-date"><i class="far fa-calendar-alt"></i> ${esc(tanggalIndo(w.resepsi.tanggal_waktu))}</p>
            <p><i class="far fa-clock"></i> ${esc(w.resepsi.waktu_display)}</p>
            <p><i class="fas fa-map-marker-alt"></i> ${esc(w.resepsi.tempat)}<br><small>${esc(w.resepsi.alamat)}</small></p>
            <div class="event-actions">
                <a class="btn-outline" target="_blank" rel="noopener" href="${resepsiMapsUrl}">
                    <i class="fas fa-map-marked-alt"></i> Lihat Lokasi
                </a>
                <a class="btn-outline" target="_blank" rel="noopener"
                   href="${esc(gcalUrl('Resepsi ' + gp + ' & ' + bp, w.resepsi.tanggal_waktu, resepsiEnd, w.resepsi.tempat))}">
                    <i class="far fa-calendar-plus"></i> Simpan Kalender
                </a>
            </div>
        </div>`;
    if ((w.show?.ramah_tamah !== false) && extraAcara) eventCards += extraAcara;
    $('#event-grid').innerHTML = eventCards;

    // Galeri (dengan fallback gradient kalau foto belum tersedia / nama salah)
    $('#gallery-grid').innerHTML = w.galeri.map(src => {
        const safe = esc(src);
        return `<figure class="gallery-item reveal" data-src="${safe}">
            <img src="${safe}" alt="Galeri pernikahan" loading="lazy"
                 onerror="this.onerror=null;this.style.display='none';this.parentElement.classList.add('gallery-fallback')">
            <figcaption><i class="fas fa-search-plus"></i></figcaption>
        </figure>`;
    }).join('');

    // Re-init lightbox & reveal setelah DOM berubah
    initLightbox();
    initReveal();

    // Kado
    $('#gift-grid').innerHTML = w.rekening.map(r =>
        `<div class="gift-card reveal">
            <div class="gift-bank">${esc(r.bank)}</div>
            <div class="gift-norek">${esc(r.norek)}</div>
            <p class="gift-aname">a.n. ${esc(r.atas_nama)}</p>
            <button type="button" class="btn-gold btn-copy" data-copy="${esc(r.norek)}">
                <i class="far fa-copy"></i> Salin Nomor
            </button>
        </div>`
    ).join('');

    $('#kado-alamat').textContent = w.kado_alamat;

    // Re-init copy buttons
    initCopyButtons();

    // Footer
    $('#ft-groom').textContent = gp;
    $('#ft-bride').textContent = bp;

    // Meta description
    document.querySelector('meta[name="description"]').content =
        `Undangan pernikahan ${gp} & ${bp} — ${dateDisplay}`;
}
/* =====================================================
   INIT
   ===================================================== */

loadWeddingData();
loadBackgroundMusic();
initReveal();
initNavSpy();

// Fallback lightbox jika gambar gagal load
const lbImg = document.getElementById('lightbox-img');
if (lbImg) lbImg.onerror = function () { this.onerror = null; this.style.display = 'none'; };
