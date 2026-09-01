/* ============================================================================
   آموزش وب فارسی — 5-progress.js
   آماده‌سازی UI پیشرفت و دش‌بورد.
   در این فاز هیچ پیشرفت واقعی، XP یا دستاورد محاسبه نمی‌شود.
   تمام داده‌های نمایشی فقط برای ساخت رابط کاربری فونداسیون هستند.
   ============================================================================ */

(() => {
  "use strict";

  const qs = (selector, root = document) => root.querySelector(selector);

  /* دادهٔ تظاهری و ثابت — بدون هیچ API یا پایگاه‌داده */
  const placeholderProfile = {
    name: "کاربر مهمان",
    email: "ایمیل شما بعد از ورود نمایش داده می‌شود",
    level: 1,
    xp: 0,
    xpToNextLevel: 100,
    streakDays: 0,
    completedLessons: 0,
    achievements: [],
    recentActivity: [],
  };

  const initProgress = () => {
    const level = qs("[data-level]");
    const xp = qs("[data-xp]");
    const xpToNextLevel = qs("[data-xp-to-next-level]");
    const streak = qs("[data-streak]");
    const completed = qs("[data-completed-lessons]");

    const xpPercent = Math.min(
      100,
      Math.round(
        (placeholderProfile.xp / placeholderProfile.xpToNextLevel) * 100
      )
    );

    if (level) level.textContent = placeholderProfile.level;
    if (xp) xp.textContent = placeholderProfile.xp;
    if (xpToNextLevel) xpToNextLevel.textContent = placeholderProfile.xpToNextLevel;
    if (streak) streak.textContent = placeholderProfile.streakDays;
    if (completed) completed.textContent = placeholderProfile.completedLessons;

    const bar = qs("[data-xp-progress]");
    if (bar) {
      bar.style.width = xpPercent + "%";
      bar.setAttribute("aria-valuenow", String(xpPercent));
    }

    const avatar = qs("[data-avatar-initials]");
    if (avatar) {
      avatar.textContent = placeholderProfile.name.trim().charAt(0) || "؟";
    }

    const name = qs("[data-account-name]");
    if (name) name.textContent = placeholderProfile.name;

    const email = qs("[data-account-email]");
    if (email) email.textContent = placeholderProfile.email;

    const achievements = qs("[data-achievements-empty]");
    if (achievements) {
      achievements.hidden = placeholderProfile.achievements.length > 0;
    }

    const recent = qs("[data-recent-empty]");
    if (recent) {
      recent.hidden = placeholderProfile.recentActivity.length > 0;
    }
  };

  window.plpProgress = {
    init: initProgress,
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initProgress);
  } else {
    initProgress();
  }
})();
