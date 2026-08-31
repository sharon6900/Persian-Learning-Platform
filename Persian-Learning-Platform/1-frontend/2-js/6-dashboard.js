/* ============================================================================
   آموزش وب فارسی — 6-dashboard.js
   فعال‌سازی ناوبری حساب کاربری و بخش‌های داشبورد/پروفایل.
   در این فاز فقط رابط کاربری ساخته می‌شود و هیچ دادهٔ واقعی وجود ندارد.
   ============================================================================ */

(() => {
  "use strict";

  const qs = (selector, root = document) => root.querySelector(selector);
  const qsa = (selector, root = document) =>
    Array.from(root.querySelectorAll(selector));

  const initAccountNav = () => {
    const links = qsa("[data-account-nav]");
    if (!links.length) return;

    links.forEach((link) => {
      link.addEventListener("click", () => {
        /* در فازهای بعدی این بخش برای ناوبری داخلی حساب استفاده می‌شود */
      });
    });
  };

  const initDashboard = () => {
    initAccountNav();
  };

  window.plpDashboard = {
    init: initDashboard,
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initDashboard);
  } else {
    initDashboard();
  }
})();
