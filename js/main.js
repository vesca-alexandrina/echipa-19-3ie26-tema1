// ── Mobile menu toggle ──
document.addEventListener('DOMContentLoaded', function () {
  const toggle = document.querySelector('.navbar__toggle');
  const mobileMenu = document.querySelector('.navbar__mobile');

  if (toggle && mobileMenu) {
    toggle.addEventListener('click', function () {
      mobileMenu.classList.toggle('open');
      toggle.textContent = mobileMenu.classList.contains('open') ? '✕' : '☰';
    });
  }

  // ── Active nav link ──
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar__links a, .navbar__mobile a').forEach(function (link) {
    const href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
    }
  });

  // ── Gallery lightbox ──
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.querySelector('.lightbox__close');

  document.querySelectorAll('.gallery-item').forEach(function (item) {
    item.addEventListener('click', function () {
      const img = item.querySelector('img');
      if (lightbox && lightboxImg && img) {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightbox.classList.add('open');
      }
    });
  });

  if (lightbox) {
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox || e.target === lightboxClose) {
        lightbox.classList.remove('open');
      }
    });
  }
  if (lightboxClose) {
    lightboxClose.addEventListener('click', function () {
      lightbox.classList.remove('open');
    });
  }

  // ── Contact form validation ──
  const form = document.getElementById('contact-form');
  const successMsg = document.getElementById('form-success');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      let valid = true;

      // Clear previous errors
      document.querySelectorAll('.form-error').forEach(function (el) { el.textContent = ''; });

      const name = form.querySelector('#name');
      const email = form.querySelector('#email');
      const message = form.querySelector('#message');

      if (!name.value.trim()) {
        document.getElementById('name-error').textContent = 'Please enter your name.';
        valid = false;
      }

      if (!email.value.trim()) {
        document.getElementById('email-error').textContent = 'Please enter your email.';
        valid = false;
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
        document.getElementById('email-error').textContent = 'Please enter a valid email address.';
        valid = false;
      }

      if (!message.value.trim()) {
        document.getElementById('message-error').textContent = 'Please enter a message.';
        valid = false;
      } else if (message.value.trim().length < 10) {
        document.getElementById('message-error').textContent = 'Message must be at least 10 characters.';
        valid = false;
      }

      if (valid) {
        form.style.display = 'none';
        if (successMsg) successMsg.style.display = 'block';
      }
    });
  }

  // Send another button
  const sendAnother = document.getElementById('send-another');
  if (sendAnother && form && successMsg) {
    sendAnother.addEventListener('click', function () {
      form.reset();
      successMsg.style.display = 'none';
      form.style.display = 'block';
    });
  }
});
