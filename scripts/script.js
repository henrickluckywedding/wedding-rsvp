document.addEventListener("DOMContentLoaded", function () {
  /*
   * Countdown
   */
  const targetDate = new Date("2026-01-29T15:30:00").getTime();
  const countdowns = document.querySelectorAll(".jkit-countdown");

  countdowns.forEach(countdown => {
    const daysEl = countdown.querySelector(".timer-days .timer-count");
    const hoursEl = countdown.querySelector(".timer-hours .timer-count");
    const minutesEl = countdown.querySelector(".timer-minutes .timer-count");
    const secondsEl = countdown.querySelector(".timer-seconds .timer-count");

    function updateCountdown() {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance <= 0) {
        daysEl.textContent = "0";
        hoursEl.textContent = "0";
        minutesEl.textContent = "0";
        secondsEl.textContent = "0";
        clearInterval(interval);
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      daysEl.textContent = days;
      hoursEl.textContent = hours;
      minutesEl.textContent = minutes;
      secondsEl.textContent = seconds;
    }

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
  });

  /*
   * RSVP link with ?rsrvd=
   */
  const rsvpLink = document.querySelector(".rsvp-div a");
  const urlParams = new URLSearchParams(window.location.search);
  const rsrvd = urlParams.get("rsrvd");

  if (rsrvd && rsvpLink) {
    const baseUrl = "https://tally.so/r/jaZEOa";
    rsvpLink.href = `${baseUrl}?seats=${encodeURIComponent(rsrvd)}`;
  }

  /*
   * JS mode flag
   */
  document.documentElement.classList.remove("no-js");
  document.documentElement.classList.add("js");

  const grid = document.querySelector('.gallery-grid');

  imagesLoaded(grid, function () {
    new Masonry(grid, {
      itemSelector: '.gallery-item',
      percentPosition: true,
      transitionDuration: '0.3s'
    });
  });
const images = Array.from(document.querySelectorAll(".gallery-img"));
  const modalEl = document.getElementById("galleryModal");
  const modal = new bootstrap.Modal(modalEl);
  const lightboxImage = document.getElementById("lightboxImage");

  let currentIndex = 0;
  let startX = 0;

  function showImage(index) {
    if (index < 0) index = images.length - 1;
    if (index >= images.length) index = 0;

    currentIndex = index;
    lightboxImage.src = images[index].src;

    preload(index + 1);
    preload(index - 1);
  }

  function preload(index) {
    if (index < 0 || index >= images.length) return;
    const img = new Image();
    img.src = images[index].src;
  }

  images.forEach((img, index) => {
    img.addEventListener("click", () => {
      showImage(index);
      modal.show();
    });
  });

  /* Keyboard navigation */
  document.addEventListener("keydown", e => {
    if (!modalEl.classList.contains("show")) return;

    if (e.key === "ArrowRight") showImage(currentIndex + 1);
    if (e.key === "ArrowLeft") showImage(currentIndex - 1);
    if (e.key === "Escape") modal.hide();
  });

  /* Swipe navigation */
  lightboxImage.addEventListener("touchstart", e => {
    startX = e.touches[0].clientX;
  });

  lightboxImage.addEventListener("touchend", e => {
    const diff = startX - e.changedTouches[0].clientX;
    if (diff > 50) showImage(currentIndex + 1);
    if (diff < -50) showImage(currentIndex - 1);
  });

  /* Click outside image closes modal */
  modalEl.querySelector(".gallery-backdrop-click")
    .addEventListener("click", () => modal.hide());

  lightboxImage.addEventListener("click", e => e.stopPropagation());
});

/*
 * Header scroll behavior
 */
window.addEventListener("scroll", function () {
  const header = document.getElementById("header");
  const headerMobile = document.getElementById("headerMobile");

  if (!header || !headerMobile) return;

  if (window.scrollY > 50) {
    header.classList.add("scrolled");
    headerMobile.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
    headerMobile.classList.remove("scrolled");
  }
});