/* ============================================================================
   آموزش وب فارسی — 4-playground.js
   مکان‌نما و آماده‌سازی UI نمونهٔ کد.
   در این فاز، نمونهٔ کد فقط تجربهٔ تعاملی کپی را دارد.
   پلتفرم تعاملی واقعی اجرای کد در فاز ۰۴ اضافه می‌شود.
   ============================================================================ */

(() => {
  "use strict";

  const qs = (selector, root = document) => root.querySelector(selector);

  const initPlayground = () => {
    qs("[data-code-example]")?.addEventListener("copy", (event) => {
      event.stopPropagation();
    });
  };

  window.plpPlayground = {
    init: initPlayground,
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initPlayground);
  } else {
    initPlayground();
  }
})();
