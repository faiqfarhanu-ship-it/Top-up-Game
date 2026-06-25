### File: script.js
/**
 * Id.Shop – Frontend Application
 * Vanilla JavaScript ES6, class-based, modular, fully client-side.
 * Mengelola navigasi, state transaksi, localStorage, tema, dan UI.
 */
class IdShop {
    constructor() {
        // --- State ---
        this.currentSection = 'home';
        this.selectedGame = null;
        this.selectedNominal = null;
        this.selectedPayment = null;
        this.playerId = '';
        this.currentTransaction = null;
        this.isDarkMode = true;
        this.confirmCallback = null;

        // --- Data Game ---
        this.games = [
            {
                id: 'mlbb',
                name: 'Mobile Legends',
                icon: 'fa-solid fa-mobile-screen-button',
                color: '#3b82f6',
                idLabel: 'User ID (Server ID)',
                idPlaceholder: '123456789 (1234)',
                idPattern: /^\d{8,12}\s*\(\d{4}\)$/,
                idHint: 'Format: 123456789 (1234)',
                nominals: [
                    { label: '86 Diamonds', price: 29000 },
                    { label: '172 Diamonds', price: 55000 },
                    { label: '257 Diamonds', price: 79000 },
                    { label: '344 Diamonds', price: 105000 },
                    { label: '429 Diamonds', price: 130000 },
                    { label: '514 Diamonds', price: 155000 },
                    { label: '706 Diamonds', price: 210000 },
                    { label: '878 Diamonds', price: 260000 },
                ]
            },
            {
                id: 'freefire',
                name: 'Free Fire',
                icon: 'fa-solid fa-fire',
                color: '#f97316',
                idLabel: 'User ID',
                idPlaceholder: '123456789',
                idPattern: /^\d{7,12}$/,
                idHint: 'Format: 123456789 (hanya angka)',
                nominals: [
                    { label: '70 Diamonds', price: 10000 },
                    { label: '140 Diamonds', price: 20000 },
                    { label: '355 Diamonds', price: 50000 },
                    { label: '720 Diamonds', price: 100000 },
                    { label: '1450 Diamonds', price: 200000 },
                    { label: '2180 Diamonds', price: 300000 },
                ]
            },
            {
                id: 'pubgm',
                name: 'PUBG Mobile',
                icon: 'fa-solid fa-gun',
                color: '#22c55e',
                idLabel: 'User ID',
                idPlaceholder: '1234567890',
                idPattern: /^\d{8,15}$/,
                idHint: 'Format: 1234567890 (hanya angka)',
                nominals: [
                    { label: '60 UC', price: 15000 },
                    { label: '120 UC', price: 30000 },
                    { label: '300 UC', price: 75000 },
                    { label: '600 UC', price: 150000 },
                    { label: '1500 UC', price: 375000 },
                    { label: '3000 UC', price: 750000 },
                ]
            },
            {
                id: 'genshin',
                name: 'Genshin Impact',
                icon: 'fa-solid fa-star',
                color: '#a78bfa',
                idLabel: 'UID',
                idPlaceholder: '123456789',
                idPattern: /^\d{7,10}$/,
                idHint: 'Format: 123456789 (hanya angka)',
                nominals: [
                    { label: '60 Genesis Crystals', price: 15000 },
                    { label: '330 Genesis Crystals', price: 80000 },
                    { label: '1090 Genesis Crystals', price: 250000 },
                    { label: '2240 Genesis Crystals', price: 500000 },
                ]
            },
            {
                id: 'valorant',
                name: 'Valorant',
                icon: 'fa-solid fa-crosshairs',
                color: '#ef4444',
                idLabel: 'Riot ID (Username#Tag)',
                idPlaceholder: 'PlayerName#1234',
                idPattern: /^.{3,16}#\d{3,5}$/,
                idHint: 'Format: Username#1234',
                nominals: [
                    { label: '125 VP', price: 15000 },
                    { label: '420 VP', price: 50000 },
                    { label: '700 VP', price: 85000 },
                    { label: '1375 VP', price: 165000 },
                    { label: '2400 VP', price: 290000 },
                ]
            },
            {
                id: 'codm',
                name: 'Call of Duty Mobile',
                icon: 'fa-solid fa-skull',
                color: '#6b7280',
                idLabel: 'UID',
                idPlaceholder: '1234567890123456',
                idPattern: /^\d{10,20}$/,
                idHint: 'Format: 1234567890123456 (hanya angka)',
                nominals: [
                    { label: '80 CP', price: 15000 },
                    { label: '420 CP', price: 75000 },
                    { label: '880 CP', price: 150000 },
                    { label: '2400 CP', price: 400000 },
                ]
            },
            {
                id: 'coc',
                name: 'Clash of Clans',
                icon: 'fa-solid fa-shield-halved',
                color: '#eab308',
                idLabel: 'Player Tag',
                idPlaceholder: '#ABC123DEF',
                idPattern: /^#?[A-Za-z0-9]{6,12}$/,
                idHint: 'Format: #ABC123DEF',
                nominals: [
                    { label: '500 Gems', price: 15000 },
                    { label: '1200 Gems', price: 35000 },
                    { label: '2500 Gems', price: 70000 },
                    { label: '6500 Gems', price: 175000 },
                ]
            },
            {
                id: 'apex',
                name: 'Apex Legends',
                icon: 'fa-solid fa-bolt',
                color: '#a855f7',
                idLabel: 'EA ID',
                idPlaceholder: 'PlayerName',
                idPattern: /^.{3,20}$/,
                idHint: 'Format: Nama pemain (3-20 karakter)',
                nominals: [
                    { label: '500 Apex Coins', price: 15000 },
                    { label: '1000 Apex Coins', price: 30000 },
                    { label: '2150 Apex Coins', price: 60000 },
                    { label: '4350 Apex Coins', price: 120000 },
                ]
            },
        ];

        // --- Data Metode Pembayaran ---
        this.paymentMethods = [
            { id: 'gopay', name: 'GoPay', icon: 'fa-solid fa-wallet', color: '#00aaff' },
            { id: 'dana', name: 'DANA', icon: 'fa-solid fa-building-columns', color: '#1089ff' },
            { id: 'ovo', name: 'OVO', icon: 'fa-solid fa-circle-dot', color: '#4c1d95' },
            { id: 'shopeepay', name: 'ShopeePay', icon: 'fa-solid fa-bag-shopping', color: '#ee4d2d' },
            { id: 'qris', name: 'QRIS', icon: 'fa-solid fa-qrcode', color: '#e11d48' },
            { id: 'bank_bca', name: 'BCA Transfer', icon: 'fa-solid fa-landmark', color: '#0066ae' },
            { id: 'bank_bri', name: 'BRI Transfer', icon: 'fa-solid fa-landmark', color: '#005098' },
            { id: 'bank_mandiri', name: 'Mandiri Transfer', icon: 'fa-solid fa-landmark', color: '#fdb813' },
        ];

        // --- DOM Elements (cached setelah DOM siap) ---
        this.preloader = null;
        this.sections = {};
        this.toastContainer = null;
        this.confirmModal = null;
        this.themeToggle = null;

        this.init();
    }

    /* ========== INISIALISASI ========== */
    init() {
        // Tunggu DOM siap
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.onDOMReady());
        } else {
            this.onDOMReady();
        }
    }

    onDOMReady() {
        this.cacheDOM();
        this.loadPreferences();
        this.renderGameGrid();
        this.renderPaymentMethods();
        this.bindEvents();
        this.hidePreloader();
        this.loadHistoryToDOM();
    }

    cacheDOM() {
        this.preloader = document.getElementById('preloader');
        this.sections.home = document.getElementById('home-section');
        this.sections.nominal = document.getElementById('nominal-section');
        this.sections.payment = document.getElementById('payment-section');
        this.sections.waiting = document.getElementById('waiting-section');
        this.sections.receipt = document.getElementById('receipt-section');
        this.sections.history = document.getElementById('history-section');
        this.toastContainer = document.getElementById('toastContainer');
        this.confirmModal = document.getElementById('confirmModal');
        this.themeToggle = document.getElementById('themeToggle');
    }

    bindEvents() {
        // Toggle tema
        this.themeToggle.addEventListener('click', () => this.toggleTheme());

        // Form input ID pemain
        const idInput = document.getElementById('playerIdInput');
        idInput.addEventListener('input', () => this.validatePlayerId());

        // Tombol lanjutkan ke pembayaran
        document.getElementById('btnContinuePayment').addEventListener('click', () => {
            if (this.canProceedToPayment()) {
                this.renderOrderSummary();
                this.navigateTo('payment');
            }
        });

        // Tombol bayar sekarang
        document.getElementById('btnPayNow').addEventListener('click', () => {
            if (this.selectedPayment) {
                this.showConfirmModal(
                    'Konfirmasi Pembayaran',
                    `Anda akan membeli <strong>${this.selectedNominal.label}</strong> untuk <strong>${this.selectedGame.name}</strong> seharga <strong>${this.formatCurrency(this.selectedNominal.price)}</strong> via <strong>${this.getPaymentName()}</strong>. Lanjutkan?`,
                    () => this.processPayment()
                );
            }
        });

        // Tombol konfirmasi modal
        document.getElementById('btnConfirmYes').addEventListener('click', () => {
            this.closeConfirmModal();
            if (this.confirmCallback) {
                const cb = this.confirmCallback;
                this.confirmCallback = null;
                cb();
            }
        });
        document.getElementById('btnCancelConfirm').addEventListener('click', () => {
            this.closeConfirmModal();
            this.confirmCallback = null;
        });

        // Tutup modal saat klik overlay
        this.confirmModal.addEventListener('click', (e) => {
            if (e.target === this.confirmModal) {
                this.closeConfirmModal();
                this.confirmCallback = null;
            }
        });
    }

    /* ========== NAVIGASI ========== */
    navigateTo(sectionName) {
        // Sembunyikan semua section
        Object.values(this.sections).forEach(s => s.classList.remove('active'));
        // Tampilkan section yang dituju
        const target = this.sections[sectionName];
        if (target) {
            target.classList.add('active');
            this.currentSection = sectionName;
            // Re-trigger animasi
            target.style.animation = 'none';
            target.offsetHeight; // trigger reflow
            target.style.animation = '';

            // Scroll ke atas
            window.scrollTo({ top: 0, behavior: 'smooth' });

            // Handle khusus
            if (sectionName === 'history') {
                this.loadHistoryToDOM();
            }
        }
    }

    /* ========== RENDER GAME GRID ========== */
    renderGameGrid() {
        const grid = document.getElementById('gameGrid');
        grid.innerHTML = this.games.map(game => `
            <div class="game-card" role="button" tabindex="0" aria-label="Top up ${game.name}"
                 onclick="app.selectGame('${game.id}')" onkeydown="if(event.key==='Enter')app.selectGame('${game.id}')">
                <i class="${game.icon} game-icon" style="color: ${game.color};" aria-hidden="true"></i>
                <span class="game-name">${game.name}</span>
                <button class="btn-topup" tabindex="-1">Top Up Sekarang</button>
            </div>
        `).join('');
    }

    /* ========== PILIH GAME ========== */
    selectGame(gameId) {
        const game = this.games.find(g => g.id === gameId);
        if (!game) return;
        this.selectedGame = game;
        this.selectedNominal = null;
        this.selectedPayment = null;
        this.playerId = '';

        // Render info game di section nominal
        document.getElementById('selectedGameInfo').innerHTML = `
            <i class="${game.icon} game-icon-large" style="color: ${game.color};" aria-hidden="true"></i>
            <div class="game-detail">
                <h3>${game.name}</h3>
                <p>Pilih nominal dan masukkan ID pemain</p>
            </div>
        `;

        // Render nominal grid
        const nominalGrid = document.getElementById('nominalGrid');
        nominalGrid.innerHTML = game.nominals.map(n => `
            <div class="nominal-card" role="button" tabindex="0"
                 onclick="app.selectNominal('${n.label}', ${n.price})"
                 onkeydown="if(event.key==='Enter')app.selectNominal('${n.label}', ${n.price})">
                <div class="nominal-value">${n.label}</div>
                <div class="nominal-price">${this.formatCurrency(n.price)}</div>
            </div>
        `).join('');

        // Reset form
        const idInput = document.getElementById('playerIdInput');
        idInput.value = '';
        idInput.className = 'input-field';
        document.getElementById('idFormatHint').textContent = game.idHint;
        document.getElementById('idError').textContent = '';
        document.getElementById('btnContinuePayment').disabled = true;

        this.navigateTo('nominal');
    }

    /* ========== PILIH NOMINAL ========== */
    selectNominal(label, price) {
        this.selectedNominal = { label, price };
        // Update UI
        document.querySelectorAll('.nominal-card').forEach(card => {
            card.classList.remove('selected');
            if (card.querySelector('.nominal-value').textContent === label) {
                card.classList.add('selected');
            }
        });
        this.validatePlayerId();
    }

    /* ========== VALIDASI ID PEMAIN ========== */
    validatePlayerId() {
        const idInput = document.getElementById('playerIdInput');
        const idError = document.getElementById('idError');
        this.playerId = idInput.value.trim();

        if (!this.selectedGame) {
            this.updateContinueButton(false);
            return;
        }

        const pattern = this.selectedGame.idPattern;
        const isValid = pattern.test(this.playerId);

        if (this.playerId === '') {
            idError.textContent = '';
            idInput.className = 'input-field';
        } else if (!isValid) {
            idError.textContent = `Format ID tidak valid. ${this.selectedGame.idHint}`;
            idInput.className = 'input-field error';
        } else {
            idError.textContent = '';
            idInput.className = 'input-field';
        }

        this.updateContinueButton(isValid && this.selectedNominal !== null);
    }

    updateContinueButton(enabled) {
        document.getElementById('btnContinuePayment').disabled = !enabled;
    }

    canProceedToPayment() {
        return this.selectedGame && this.selectedNominal && this.selectedGame.idPattern.test(this.playerId);
    }

    /* ========== RENDER PAYMENT METHODS ========== */
    renderPaymentMethods() {
        const container = document.getElementById('paymentMethods');
        container.innerHTML = this.paymentMethods.map(pm => `
            <div class="payment-card" role="button" tabindex="0"
                 onclick="app.selectPayment('${pm.id}')"
                 onkeydown="if(event.key==='Enter')app.selectPayment('${pm.id}')">
                <i class="${pm.icon} payment-icon" style="color: ${pm.color};" aria-hidden="true"></i>
                <span>${pm.name}</span>
            </div>
        `).join('');
    }

    selectPayment(paymentId) {
        this.selectedPayment = paymentId;
        document.querySelectorAll('.payment-card').forEach(card => {
            card.classList.remove('selected');
        });
        // Tandai yang dipilih
        const cards = document.querySelectorAll('.payment-card');
        const idx = this.paymentMethods.findIndex(p => p.id === paymentId);
        if (idx >= 0 && cards[idx]) {
            cards[idx].classList.add('selected');
        }
        document.getElementById('btnPayNow').disabled = false;
        this.renderOrderSummary();
    }

    getPaymentName() {
        const pm = this.paymentMethods.find(p => p.id === this.selectedPayment);
        return pm ? pm.name : '-';
    }

    /* ========== ORDER SUMMARY ========== */
    renderOrderSummary() {
        const summary = document.getElementById('orderSummary');
        if (!this.selectedGame || !this.selectedNominal) {
            summary.innerHTML = '<h3>Ringkasan Pesanan</h3><p style="color:var(--clr-text-muted)">Pilih nominal dan metode pembayaran.</p>';
            return;
        }
        summary.innerHTML = `
            <h3>Ringkasan Pesanan</h3>
            <div class="summary-row"><span class="label">Game</span><span class="value">${this.selectedGame.name}</span></div>
            <div class="summary-row"><span class="label">Nominal</span><span class="value">${this.selectedNominal.label}</span></div>
            <div class="summary-row"><span class="label">ID Pemain</span><span class="value">${this.playerId}</span></div>
            <div class="summary-row"><span class="label">Metode Bayar</span><span class="value">${this.selectedPayment ? this.getPaymentName() : '<em>Belum dipilih</em>'}</span></div>
            <div class="summary-row total"><span class="label">Total</span><span class="value">${this.formatCurrency(this.selectedNominal.price)}</span></div>
        `;
    }

    /* ========== PROSES PEMBAYARAN ========== */
    processPayment() {
        this.navigateTo('waiting');
        this.startWaitingSimulation();
    }

    startWaitingSimulation() {
        const timerEl = document.getElementById('waitingTimer');
        let seconds = 0;
        const maxSeconds = 5; // simulasi 5 detik
        timerEl.textContent = '00:00';

        const interval = setInterval(() => {
            seconds++;
            const mins = Math.floor(seconds / 60);
            const secs = seconds % 60;
            timerEl.textContent = `${String(mins).padStart(2,'0')}:${String(secs).padStart(2,'0')}`;

            if (seconds >= maxSeconds) {
                clearInterval(interval);
                this.completeTransaction();
            }
        }, 1000);
    }

    completeTransaction() {
        // Generate ID transaksi
        const txId = 'IDS-' + Date.now().toString(36).toUpperCase() + '-' + Math.random().toString(36).substring(2, 6).toUpperCase();
        const now = new Date();
        const dateStr = now.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' });

        this.currentTransaction = {
            id: txId,
            date: dateStr,
            game: this.selectedGame.name,
            gameIcon: this.selectedGame.icon,
            gameColor: this.selectedGame.color,
            nominal: this.selectedNominal.label,
            price: this.selectedNominal.price,
            playerId: this.playerId,
            payment: this.getPaymentName(),
            status: 'Berhasil',
        };

        // Simpan ke localStorage
        this.saveTransaction(this.currentTransaction);

        // Render struk
        this.renderReceipt(this.currentTransaction);

        // Navigasi ke struk
        this.navigateTo('receipt');

        this.showToast('Pembayaran berhasil!', 'success');
    }

    renderReceipt(tx) {
        document.getElementById('receiptBody').innerHTML = `
            <div class="summary-row"><span class="label">ID Transaksi</span><span class="value" style="font-size:0.78rem;">${tx.id}</span></div>
            <div class="summary-row"><span class="label">Tanggal</span><span class="value">${tx.date}</span></div>
            <div class="summary-row"><span class="label">Game</span><span class="value">${tx.game}</span></div>
            <div class="summary-row"><span class="label">Nominal</span><span class="value">${tx.nominal}</span></div>
            <div class="summary-row"><span class="label">ID Pemain</span><span class="value">${tx.playerId}</span></div>
            <div class="summary-row"><span class="label">Metode Bayar</span><span class="value">${tx.payment}</span></div>
            <div class="summary-row total"><span class="label">Total</span><span class="value">${this.formatCurrency(tx.price)}</span></div>
            <div class="summary-row"><span class="label">Status</span><span class="value" style="color:var(--clr-success);">✔ ${tx.status}</span></div>
        `;
    }

    /* ========== AKSI STRUK ========== */
    printReceipt() {
        window.print();
    }

    topUpAgain() {
        this.selectedGame = null;
        this.selectedNominal = null;
        this.selectedPayment = null;
        this.playerId = '';
        this.currentTransaction = null;
        document.getElementById('btnPayNow').disabled = true;
        document.getElementById('btnContinuePayment').disabled = true;
        this.navigateTo('home');
    }

    /* ========== LOCAL STORAGE: TRANSAKSI ========== */
    saveTransaction(tx) {
        const history = this.getHistory();
        history.unshift(tx);
        // Simpan maksimal 20 transaksi
        if (history.length > 20) history.pop();
        localStorage.setItem('idshop_history', JSON.stringify(history));
    }

    getHistory() {
        try {
            return JSON.parse(localStorage.getItem('idshop_history')) || [];
        } catch {
            return [];
        }
    }

    loadHistoryToDOM() {
        const historyList = document.getElementById('historyList');
        const emptyState = document.getElementById('emptyHistory');
        const history = this.getHistory();

        if (history.length === 0) {
            historyList.innerHTML = '';
            emptyState.style.display = 'block';
            return;
        }
        emptyState.style.display = 'none';
        historyList.innerHTML = history.slice(0, 20).map(tx => `
            <div class="history-card" tabindex="0" aria-label="Transaksi ${tx.id}"
                 onclick="app.showTransactionDetail('${tx.id}')"
                 onkeydown="if(event.key==='Enter')app.showTransactionDetail('${tx.id}')">
                <div class="history-top">
                    <span class="history-game">
                        <i class="${tx.gameIcon}" style="color:${tx.gameColor}; margin-right:6px;" aria-hidden="true"></i>${tx.game}
                    </span>
                    <span class="history-date">${tx.date}</span>
                </div>
                <div class="history-detail">${tx.nominal} — ${this.formatCurrency(tx.price)} via ${tx.payment}</div>
                <span class="history-status">✔ ${tx.status}</span>
            </div>
        `).join('');
    }

    showTransactionDetail(txId) {
        const history = this.getHistory();
        const tx = history.find(t => t.id === txId);
        if (!tx) return;
        this.renderReceipt(tx);
        this.navigateTo('receipt');
    }

    /* ========== LOCAL STORAGE: TEMA ========== */
    loadPreferences() {
        // Tema
        const savedTheme = localStorage.getItem('idshop_darkmode');
        if (savedTheme === 'false') {
            this.isDarkMode = false;
            document.documentElement.setAttribute('data-theme', 'light');
            this.updateThemeIcon();
        } else {
            this.isDarkMode = true;
            document.documentElement.setAttribute('data-theme', 'dark');
            this.updateThemeIcon();
        }
    }

    toggleTheme() {
        this.isDarkMode = !this.isDarkMode;
        document.documentElement.setAttribute('data-theme', this.isDarkMode ? 'dark' : 'light');
        localStorage.setItem('idshop_darkmode', String(this.isDarkMode));
        this.updateThemeIcon();
    }

    updateThemeIcon() {
        const icon = this.themeToggle.querySelector('i');
        if (this.isDarkMode) {
            icon.className = 'fa-solid fa-moon';
        } else {
            icon.className = 'fa-solid fa-sun';
        }
    }

    /* ========== PRELOADER ========== */
    hidePreloader() {
        setTimeout(() => {
            if (this.preloader) {
                this.preloader.classList.add('hidden');
            }
        }, 600);
    }

    /* ========== TOAST NOTIFICATION ========== */
    showToast(message, type = '') {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        const iconMap = { error: 'fa-circle-exclamation', success: 'fa-circle-check' };
        const icon = iconMap[type] || 'fa-circle-info';
        toast.innerHTML = `<i class="fa-solid ${icon}" aria-hidden="true"></i> ${message}`;
        this.toastContainer.appendChild(toast);

        // Hapus setelah animasi selesai
        setTimeout(() => {
            if (toast.parentNode) toast.remove();
        }, 3700);
    }

    /* ========== CONFIRM MODAL ========== */
    showConfirmModal(title, message, callback) {
        document.getElementById('confirmTitle').textContent = title;
        document.getElementById('confirmMessage').innerHTML = message;
        this.confirmCallback = callback;
        this.confirmModal.classList.add('open');
        this.confirmModal.removeAttribute('hidden');
        document.getElementById('btnCancelConfirm').focus();
    }

    closeConfirmModal() {
        this.confirmModal.classList.remove('open');
        this.confirmModal.setAttribute('hidden', '');
    }

    /* ========== UTILITY ========== */
    formatCurrency(amount) {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
    }
}

// --- Inisialisasi global ---
const app = new IdShop();