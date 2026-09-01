/* ============================================================================
   آموزش وب فارسی — 1-app.js
   راه‌انداز اصلی رابط کاربری: هدر، منوی موبایل، جستجو، مودال،
   کپی کد، فعال‌سازی تب‌ها و سایر رفتارهای مشترک صفحه‌های فونداسیون.
   ============================================================================ */

(() => {
  "use strict";

  const APP = window.PLPApp || {};

  APP.config = {
    storagePrefix: "plp_",
    searchPath: null,
  };

  const qs = (selector, root = document) => root.querySelector(selector);
  const qsa = (selector, root = document) =>
    Array.from(root.querySelectorAll(selector));

  const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const setOpen = (element, open, className = "is-open") => {
    if (!element) return;
    element.classList.toggle(className, open);
  };

  /* -------------------------------------------------------------
     Header navigation active state
     Active state is determined by the canonical body data-page
     attribute so future pages can switch pages without JS rewrites.
     ------------------------------------------------------------- */
  const initActiveNav = () => {
    const page = document.body.getAttribute("data-page");
    if (!page) return;

    qsa("[data-nav-active]").forEach((link) => {
      const targets = (link.getAttribute("data-nav-active") || "").split(" ");
      const active = targets.includes(page);
      link.classList.toggle("is-active", active);
      if (active) {
        link.setAttribute("aria-current", "page");
      }
    });
  };

  /* -------------------------------------------------------------
     Mobile navigation drawer
     ------------------------------------------------------------- */
  const initDrawer = () => {
    const drawer = qs("[data-drawer]");
    const overlay = qs("[data-drawer-overlay]");
    const openers = qsa("[data-drawer-open]");
    const closers = qsa("[data-drawer-close]");

    if (!drawer) return;

    const syncExpanded = (expanded) => {
      openers.forEach((button) => button.setAttribute("aria-expanded", expanded ? "true" : "false"));
    };

    const open = () => {
      setOpen(drawer, true);
      if (overlay) {
        overlay.hidden = false;
        setOpen(overlay, true);
      }
      drawer.setAttribute("aria-hidden", "false");
      drawer.removeAttribute("inert");
      syncExpanded(true);
      document.body.style.overflow = "hidden";
      const focusTarget = qs("[data-drawer-close]", drawer);
      if (focusTarget) focusTarget.focus();
    };

    const close = () => {
      setOpen(drawer, false);
      if (overlay) {
        setOpen(overlay, false);
        overlay.hidden = true;
      }
      drawer.setAttribute("aria-hidden", "true");
      drawer.setAttribute("inert", "");
      syncExpanded(false);
      document.body.style.overflow = "";
    };

    openers.forEach((button) => button.addEventListener("click", open));
    closers.forEach((button) => button.addEventListener("click", close));
    syncExpanded(false);

    if (overlay) overlay.addEventListener("click", close);

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && drawer.classList.contains("is-open")) {
        close();
      }
    });
  };

  /* -------------------------------------------------------------
     Lesson sidebar drawer
     ------------------------------------------------------------- */
  const initLessonSidebar = () => {
    const sidebar = qs("[data-lesson-sidebar]");
    if (!sidebar) return;

    const overlay = qs("[data-lesson-overlay]");
    const openers = qsa("[data-lesson-sidebar-open]");
    const closers = qsa("[data-lesson-sidebar-close]");

    const syncExpanded = (expanded) => {
      openers.forEach((button) => button.setAttribute("aria-expanded", expanded ? "true" : "false"));
    };

    const open = () => {
      setOpen(sidebar, true);
      if (overlay) {
        overlay.hidden = false;
        setOpen(overlay, true);
      }
      sidebar.setAttribute("aria-hidden", "false");
      sidebar.removeAttribute("inert");
      syncExpanded(true);
      document.body.style.overflow = "hidden";
    };

    const close = () => {
      setOpen(sidebar, false);
      if (overlay) {
        setOpen(overlay, false);
        overlay.hidden = true;
      }
      sidebar.setAttribute("aria-hidden", "true");
      sidebar.setAttribute("inert", "");
      syncExpanded(false);
      document.body.style.overflow = "";
    };

    openers.forEach((button) => button.addEventListener("click", open));
    closers.forEach((button) => button.addEventListener("click", close));
    syncExpanded(false);

    if (overlay) overlay.addEventListener("click", close);

    document.addEventListener("keydown", (event) => {
      if (
        event.key === "Escape" &&
        sidebar.classList.contains("is-open")
      ) {
        close();
      }
    });
  };

  /* -------------------------------------------------------------
     Search modal
     ------------------------------------------------------------- */
  const initSearch = () => {
    const modal = qs("[data-search-modal]");
    if (!modal) return;

    const openers = qsa("[data-search-open]");
    const closeButton = qs("[data-search-close]", modal);
    const input = qs("[data-search-input]", modal);
    const form = qs("form", modal);

    const open = () => {
      if (typeof modal.showModal === "function") {
        modal.showModal();
      } else {
        modal.setAttribute("open", "");
      }
      if (input) input.focus();
    };

    const close = () => {
      if (typeof modal.close === "function") {
        modal.close();
      } else {
        modal.removeAttribute("open");
      }
    };

    openers.forEach((button) => button.addEventListener("click", open));

    if (closeButton) closeButton.addEventListener("click", close);

    if (form) {
      form.addEventListener("submit", (event) => {
        event.preventDefault();
      });
    }

    modal.addEventListener("click", (event) => {
      if (event.target === modal) close();
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && modal.hasAttribute("open")) close();
    });

    if (input) {
      input.addEventListener("input", (event) => {
        const value = event.target.value.trim();
        const empty = qs("[data-search-empty]", modal);
        const results = qsa("[data-search-result]", modal);
        const noResults = qs("[data-search-no-results]", modal);

        results.forEach((item) => {
          const text = (item.getAttribute("data-search-text") || "").toLowerCase();
          const match = !value || text.includes(value.toLowerCase());
          item.hidden = !match;
        });

        if (empty) empty.hidden = Boolean(value);
        if (noResults) {
          const anyVisible = results.some((item) => !item.hidden);
          noResults.hidden = anyVisible;
        }
      });
    }
  };

  /* -------------------------------------------------------------
     Dropdowns
     ------------------------------------------------------------- */
  const initDropdowns = () => {
    const dropdowns = qsa("[data-dropdown]");
    if (!dropdowns.length) return;

    const closeAll = (except) => {
      dropdowns.forEach((item) => {
        if (item !== except) item.classList.remove("is-open");
      });
    };

    dropdowns.forEach((item) => {
      const triggers = qsa("[data-dropdown-toggle]", item);
      triggers.forEach((trigger) => {
        trigger.addEventListener("click", (event) => {
          event.stopPropagation();
          const isOpen = item.classList.contains("is-open");
          closeAll(item);
          item.classList.toggle("is-open", !isOpen);
        });
      });
    });

    document.addEventListener("click", () => closeAll(null));
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeAll(null);
    });
  };

  /* -------------------------------------------------------------
     Tabs
     ------------------------------------------------------------- */
  const initTabs = () => {
    qsa("[data-tabs]").forEach((tabs) => {
      const buttons = qsa("[role='tab']", tabs);
      const panels = qsa("[role='tabpanel']", tabs);

      const activate = (button) => {
        const targetId = button.getAttribute("aria-controls");
        buttons.forEach((item) => {
          const active = item === button;
          item.classList.toggle("is-active", active);
          item.setAttribute("aria-selected", active ? "true" : "false");
          item.setAttribute("tabindex", active ? "0" : "-1");
        });
        panels.forEach((panel) => {
          panel.hidden = panel.id !== targetId;
        });
      };

      buttons.forEach((button, index) => {
        button.addEventListener("click", () => activate(button));
        button.addEventListener("keydown", (event) => {
          let nextIndex = null;
          if (["ArrowLeft", "ArrowRight"].includes(event.key)) {
            const direction = event.key === "ArrowLeft" ? -1 : 1;
            nextIndex = (index + direction + buttons.length) % buttons.length;
          }
          if (nextIndex !== null && buttons[nextIndex]) {
            event.preventDefault();
            buttons[nextIndex].focus();
            activate(buttons[nextIndex]);
          }
        });
      });
    });
  };

  /* -------------------------------------------------------------
     Copy to clipboard
     Event delegation is used so dynamically-rendered content
     (lesson pages created from the lesson data module) also works.
     ------------------------------------------------------------- */
  let copyDelegationBound = false;
  const initCopyButtons = () => {
    if (copyDelegationBound) return;
    copyDelegationBound = true;

    document.addEventListener("click", async (event) => {
      const button = event.target.closest("[data-copy-target]");
      if (!button) return;

      const target = qs(button.getAttribute("data-copy-target"));
      if (!target) return;

      const text =
        target.getAttribute("data-copy-text") === null
          ? target.innerText
          : target.getAttribute("data-copy-text");

      try {
        await navigator.clipboard.writeText(text);
      } catch (error) {
        const range = document.createRange();
        range.selectNodeContents(target);
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
        document.execCommand("copy");
        selection.removeAllRanges();
      }

      const original = button.querySelector("[data-copy-label]");
      if (original) {
        const previous = original.textContent;
        original.textContent = "کپی شد ✓";
        await wait(1500);
        original.textContent = previous;
      }
    });
  };

  /* -------------------------------------------------------------
     Run buttons: placeholder behavior
     The interactive playground is implemented in Phase 04.
     Event delegation keeps dynamically-rendered lesson examples working.
     ------------------------------------------------------------- */
  let runDelegationBound = false;
  const initRunButtons = () => {
    if (runDelegationBound) return;
    runDelegationBound = true;

    document.addEventListener("click", (event) => {
      const button = event.target.closest("[data-run]");
      if (!button) return;
      const frame = qs(button.getAttribute("data-run"));
      if (frame) frame.focus();
    });
  };

  /* -------------------------------------------------------------
     Auth forms (UI only, no fake authentication)
     ------------------------------------------------------------- */
  const initAuthForms = () => {
    qsa("[data-auth-form]").forEach((form) => {
      form.addEventListener("submit", (event) => {
        event.preventDefault();
        const info = qs("[data-auth-info]", form);
        if (info) {
          info.classList.add("is-visible");
        }
      });
    });
  };

  const initProfileForms = () => {
    qsa("[data-profile-form]").forEach((form) => {
      form.addEventListener("submit", (event) => {
        event.preventDefault();
        const info = qs("[data-profile-info]", form);
        if (info) {
          info.classList.add("is-visible");
        }
      });
    });
  };

  /* -------------------------------------------------------------
     Back to top
     The button is injected once so every existing shell page uses
     the same consistent component without duplicated markup.
     ------------------------------------------------------------- */
  const initBackToTop = () => {
    const SCROLL_THRESHOLD = 400;

    let button = qs("[data-back-to-top]");
    if (!button) {
      button = document.createElement("button");
      button.type = "button";
      button.className = "back-to-top";
      button.setAttribute("data-back-to-top", "");
      button.setAttribute("aria-label", "بازگشتن به بالای صفحه");
      button.setAttribute("aria-hidden", "true");
      button.setAttribute("tabindex", "-1");
      button.innerHTML =
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 19V5"/><path d="m5 12 7-7 7 7"/></svg>';
      document.body.appendChild(button);
    }

    const setVisibility = (visible) => {
      button.classList.toggle("is-visible", visible);
      if (visible) {
        button.removeAttribute("aria-hidden");
        button.setAttribute("tabindex", "0");
      } else {
        button.setAttribute("aria-hidden", "true");
        button.setAttribute("tabindex", "-1");
      }
    };

    const update = () => {
      setVisibility(window.scrollY > SCROLL_THRESHOLD);
    };

    const prefersReducedMotion = () =>
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: prefersReducedMotion() ? "auto" : "smooth",
      });
    };

    button.addEventListener("click", scrollToTop);
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    update();
  };

  /* -------------------------------------------------------------
     Reveal decorative info note on nav shell
     ------------------------------------------------------------- */
  const initInfoNote = () => {
    const note = qs("[data-info-note]");
    if (!note) return;

    const cookieName = APP.config.storagePrefix + "info_note_seen";
    let seen = false;
    try {
      seen = window.localStorage.getItem(cookieName) === "1";
    } catch (error) {
      seen = false;
    }

    if (!seen) {
      note.classList.add("is-visible");
      try {
        window.localStorage.setItem(cookieName, "1");
      } catch (error) {
        /* ignore */
      }
    }
  };

  /* -------------------------------------------------------------
     Init
     ------------------------------------------------------------- */
  const init = () => {
    initActiveNav();
    initDrawer();
    initLessonSidebar();
    initSearch();
    initDropdowns();
    initTabs();
    initCopyButtons();
    initRunButtons();
    initAuthForms();
    initProfileForms();
    initBackToTop();
    initInfoNote();
  };

  APP.init = init;
  APP.helpers = { qs, qsa };

  window.PLPApp = APP;

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
