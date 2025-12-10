document.addEventListener("DOMContentLoaded", function () {
  // Target date and time (local time)
  const targetDate = new Date("2026-01-29T16:00:00").getTime();

  // Find all countdown containers
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

    // Run immediately
    updateCountdown();

    // Update every second
    const interval = setInterval(updateCountdown, 1000);
  });
});

window.addEventListener('scroll', function() {
  const header = document.getElementById('header');
  const headerMobile = document.getElementById('headerMobile');
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
    headerMobile.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
    headerMobile.classList.remove('scrolled');
  }
});