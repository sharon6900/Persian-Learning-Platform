/* ============================================================================
   آموزش وب فارسی — 7-theme.js
   مدیریت تم روشن/تاریک، ذخیره ترجیح کاربر و تشخیص تنظیمات سیستم
   ============================================================================ */

(() => {
  "use strict";

  const STORAGE_KEY = "plp_theme";

  const THEMES = {
    light: "light",
    dark: "dark",
  };

  const getMedia = () =>
    window.matchMedia("(prefers-color-scheme: dark)");

  const getStoredTheme = () => {
    try {
      return window.localStorage.getItem(STORAGE_KEY);
    } catch (error) {
      return null;
    }
  };

  const setStoredTheme = (theme) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, theme);
    } catch (error) {
      /* ذخیره‌سازی در دسترس نیست؛ ادامه با تم فعلی */
    }
  };

  const resolveTheme = () => {
    const stored = getStoredTheme();
    if (stored === THEMES.light || stored === THEMES.dark) {
      return stored;
    }
    return getMedia().matches ? THEMES.dark : THEMES.light;
  };

  const applyTheme = (theme) => {
    const safe = theme === THEMES.dark ? THEMES.dark : THEMES.light;
    document.documentElement.setAttribute("data-theme", safe);
    setStoredTheme(safe);
  };

  const currentTheme = () =>
    document.documentElement.getAttribute("data-theme") === THEMES.dark
      ? THEMES.dark
      : THEMES.light;

  const toggleTheme = () => {
    const next = currentTheme() === THEMES.dark ? THEMES.light : THEMES.dark;
    applyTheme(next);
    return next;
  };

  const initTheme = () => {
    applyTheme(resolveTheme());

    document.querySelectorAll("[data-theme-toggle]").forEach((button) => {
      button.setAttribute("aria-pressed", currentTheme() === THEMES.dark);
      button.addEventListener("click", () => {
        toggleTheme();
        document.querySelectorAll("[data-theme-toggle]").forEach((el) => {
          el.setAttribute("aria-pressed", currentTheme() === THEMES.dark);
        });
      });
    });

    const media = getMedia();
    const handleSystemChange = (event) => {
      if (!getStoredTheme()) {
        applyTheme(event.matches ? THEMES.dark : THEMES.light);
      }
    };

    if (media.addEventListener) {
      media.addEventListener("change", handleSystemChange);
    } else if (media.addListener) {
      media.addListener(handleSystemChange);
    }
  };

  window.plpTheme = {
    get: currentTheme,
    set: applyTheme,
    toggle: toggleTheme,
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initTheme);
  } else {
    initTheme();
  }
})();
