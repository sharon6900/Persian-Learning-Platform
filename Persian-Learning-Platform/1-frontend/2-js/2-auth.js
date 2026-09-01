/* ============================================================================
   آموزش وب فارسی — 2-auth.js
   آماده‌سازی رابط ورود و ثبت‌نام.
   در این فاز هیچ احراز هویت واقعی انجام نمی‌شود؛ این فایل فقط فرم‌ها را
   آماده می‌کند و هنگام رسیدن فاز احراز هویت، جایگزین خواهد شد.
   ============================================================================ */

(() => {
  "use strict";

  const qs = (selector, root = document) => root.querySelector(selector);

  const initAuthPage = () => {
    const form = qs("[data-auth-form]");
    if (!form) return;

    const password = qs("[data-password]", form);
    if (password) {
      const toggle = qs("[data-toggle-password]", form);
      if (toggle) {
        toggle.addEventListener("click", () => {
          const isPassword = password.type === "password";
          password.type = isPassword ? "text" : "password";
          toggle.setAttribute("aria-pressed", isPassword ? "true" : "false");
        });
      }
    }

    const info = qs("[data-auth-info]", form);
    if (info) {
      const paragraph = qs("p", info);
      if (paragraph) {
        paragraph.dataset.baseText = paragraph.textContent;
      }
    }
  };

  window.plpAuth = {
    init: initAuthPage,
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAuthPage);
  } else {
    initAuthPage();
  }
})();
