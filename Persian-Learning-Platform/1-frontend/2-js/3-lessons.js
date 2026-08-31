/* ============================================================================
   آموزش وب فارسی — 3-lessons.js
   دادهٔ مکان‌نمای درس‌های فونداسیون و منطق صفحهٔ درس.
   در این فاز حتماً هیچ پیشرفت واقعی یا دادهٔ پایگاه‌داده وجود ندارد.
   ============================================================================ */

(() => {
  "use strict";

  const qs = (selector, root = document) => root.querySelector(selector);

  const lessonCatalog = [
    {
      id: "html-intro",
      course: "html",
      number: 1,
      title: "آشنایی با HTML",
      description:
        "با ساختار پایهٔ HTML آشنا می‌شویم و اولین صفحهٔ وب را می‌سازیم.",
      url: "4-lesson.html",
    },
    {
      id: "html-headings",
      course: "html",
      number: 2,
      title: "عنوان‌ها و متن",
      description: "با عنصرهای عنوان، پاراگراف و فرمت‌بندی متن کار می‌کنیم.",
      url: "4-lesson.html",
    },
    {
      id: "html-links",
      course: "html",
      number: 3,
      title: "لینک‌ها",
      description: "می‌آموزیم چگونه با عنصر a بین صفحه‌ها حرکت کنیم.",
      url: "4-lesson.html",
    },
    {
      id: "css-intro",
      course: "css",
      number: 1,
      title: "آشنایی با CSS",
      description: "با نحوهٔ اتصال CSS به HTML و مفهوم استایل آشنا می‌شویم.",
      url: "4-lesson.html",
    },
    {
      id: "css-colors",
      course: "css",
      number: 2,
      title: "رنگ‌ها",
      description: "با روش‌های تعریف رنگ و رنگ‌های مختلف کار می‌کنیم.",
      url: "4-lesson.html",
    },
  ];

  const getCatalogForCourse = (courseId) =>
    lessonCatalog.filter((lesson) => lesson.course === courseId);

  const renderLessonList = (courseId) => {
    const list = qs("[data-lesson-nav-list]");
    if (!list) return;

    const lessons = getCatalogForCourse(courseId);
    if (!lessons.length) {
      list.innerHTML =
        '<div class="muted">هنوز درسی در این بخش ثبت نشده است.</div>';
      return;
    }

    list.innerHTML = lessons
      .map((lesson) => {
        const active = lesson.id === qs("[data-course-id]", list)?.dataset.id;
        return `
          <a
            class="lesson-nav-link ${active ? "is-active" : ""}"
            href="${lesson.url}"
            data-course-id="${courseId}"
            data-lesson-id="${lesson.id}"
            ${active ? 'aria-current="page"' : ""}
          >
            <span class="lesson-dot" aria-hidden="true"></span>
            <span>${lesson.title}</span>
            <span class="lesson-num">${lesson.number}</span>
          </a>
        `;
      })
      .join("");
  };

  const initLessonPage = () => {
    const courseId = qs("[data-course-id]")?.getAttribute("data-course-id");
    if (courseId) {
      renderLessonList(courseId);
    }

    const completion = qs("[data-lesson-complete]");
    if (completion) {
      completion.addEventListener("click", () => {
        const info = qs("[data-completion-info]");
        if (info) info.hidden = false;
      });
    }
  };

  window.plpLessons = {
    catalog: lessonCatalog,
    getCatalogForCourse: getCatalogForCourse,
    renderLessonList: renderLessonList,
    init: initLessonPage,
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initLessonPage);
  } else {
    initLessonPage();
  }
})();
