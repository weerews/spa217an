/* ============================================
   MASSAGE & REFLEXOLOGY 217 AN — script.js
   ============================================ */

/* ====================================================
   GANTI NOMOR WA ADMIN DI SINI
   Format: 62 + nomor tanpa angka 0 di depan
   Contoh: 0812-3456-7890 → tulis 6281234567890
   ==================================================== */
var NOMOR_WA_ADMIN = '6281770818567';


/* ===== NAVBAR: tambah bayangan saat scroll ===== */
var navbar = document.getElementById('navbar');
window.addEventListener('scroll', function () {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});


/* ===== MOBILE MENU (burger) ===== */
var burger = document.getElementById('burger');
var mobileMenu = document.getElementById('mobileMenu');

burger.addEventListener('click', function () {
  mobileMenu.classList.toggle('open');
});

function closeMobile() {
  mobileMenu.classList.remove('open');
}


/* ===== FILTER TREATMENT ===== */
var tabs = document.querySelectorAll('.tab');
var cards = document.querySelectorAll('.treat-card');

tabs.forEach(function (tab) {
  tab.addEventListener('click', function () {
    /* Hapus active dari semua tab */
    tabs.forEach(function (t) { t.classList.remove('active'); });
    tab.classList.add('active');

    var filter = tab.dataset.filter;

    /* Tampilkan/sembunyikan kartu */
    cards.forEach(function (card) {
      if (filter === 'all' || card.dataset.cat === filter) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });
  });
});


/* ===== PILIH DURASI ===== */
var durBtns = document.querySelectorAll('.dur-btn');
var selectedDur = '60 menit';

durBtns.forEach(function (btn) {
  btn.addEventListener('click', function () {
    durBtns.forEach(function (b) { b.classList.remove('selected'); });
    btn.classList.add('selected');
    selectedDur = btn.dataset.dur;
    updatePreview();
  });
});


/* ===== PILIH PREFERENSI TERAPIS ===== */
var genderBtns = document.querySelectorAll('.gender-btn');
var selectedGender = 'Bebas';

genderBtns.forEach(function (btn) {
  btn.addEventListener('click', function () {
    genderBtns.forEach(function (b) { b.classList.remove('sel'); });
    btn.classList.add('sel');
    selectedGender = btn.dataset.g;
    updatePreview();
  });
});


/* ===== UPDATE PREVIEW PESAN WA ===== */
['bTreat', 'bName', 'bWa', 'bDate', 'bTime', 'bLoc', 'bNotes'].forEach(function (id) {
  var el = document.getElementById(id);
  if (el) {
    el.addEventListener('input', updatePreview);
    el.addEventListener('change', updatePreview);
  }
});

/* Format tanggal dari YYYY-MM-DD ke DD/MM/YYYY */
function formatTanggal(val) {
  if (!val) return '-';
  var p = val.split('-');
  return p[2] + '/' + p[1] + '/' + p[0];
}

/* Bangun teks pesan WhatsApp */
function buildPesan() {
  var treat  = document.getElementById('bTreat').value  || '-';
  var nama   = document.getElementById('bName').value   || '-';
  var wa     = document.getElementById('bWa').value     || '-';
  var tgl    = formatTanggal(document.getElementById('bDate').value);
  var jam    = document.getElementById('bTime').value   || '-';
  var lokasi = document.getElementById('bLoc').value    || '-';
  var catatan = document.getElementById('bNotes').value;

  var pesan = '🔔 *PESANAN BARU — Massage & Reflexology BER 217 AN*\n\n';
  pesan += '• *Treatment* : ' + treat + '\n';
  pesan += '• *Durasi*    : ' + selectedDur + '\n';
  pesan += '• *Nama*      : ' + nama + '\n';
  pesan += '• *WA/HP*     : ' + wa + '\n';
  pesan += '• *Tanggal*   : ' + tgl + '\n';
  pesan += '• *Jam*       : ' + jam + '\n';
  pesan += '• *Lokasi*    : ' + lokasi + '\n';
  pesan += '• *Terapis*   : ' + selectedGender;
  if (catatan) pesan += '\n• *Catatan*   : ' + catatan;

  return pesan;
}

function updatePreview() {
  document.getElementById('waPreview').textContent = buildPesan();
}

updatePreview(); /* Inisialisasi preview saat halaman dibuka */


/* ===== KIRIM BOOKING ===== */
function sendBooking() {
  /* Validasi field wajib */
  var treat  = document.getElementById('bTreat').value;
  var nama   = document.getElementById('bName').value;
  var wa     = document.getElementById('bWa').value;
  var tgl    = document.getElementById('bDate').value;
  var jam    = document.getElementById('bTime').value;
  var lokasi = document.getElementById('bLoc').value;

  if (!treat || !nama || !wa || !tgl || !jam || !lokasi) {
    alert('Mohon lengkapi semua isian yang diperlukan sebelum mengirim booking ya! 🙏');
    return;
  }

  /* Buka WhatsApp dengan pesan otomatis */
  var pesan = buildPesan();
  var url = 'https://wa.me/' + NOMOR_WA_ADMIN + '?text=' + encodeURIComponent(pesan);
  window.open(url, '_blank');

  /* Tampilkan pesan sukses */
  var successEl = document.getElementById('successMsg');
  successEl.style.display = 'block';
  successEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
}


/* ===== SMOOTH SCROLL dengan offset navbar ===== */
document.querySelectorAll('a[href^="#"]').forEach(function (link) {
  link.addEventListener('click', function (e) {
    var targetId = this.getAttribute('href');
    var target = document.querySelector(targetId);
    if (!target) return;
    e.preventDefault();
    var offset = navbar.offsetHeight + 20;
    var top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top: top, behavior: 'smooth' });
  });
});
