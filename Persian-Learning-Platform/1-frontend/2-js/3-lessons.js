/* ============================================================================
   آموزش وب فارسی — 3-lessons.js
   دادهٔ درس‌ها و موتور نمایش صفحات دوره و درس.
   در فاز ۰۲ فقط دورهٔ HTML به صورت کامل داده‌محور پیاده‌سازی می‌شود.
   همان معماری در فاز ۰۳ برای CSS نیز استفاده خواهد شد.
   ============================================================================ */

(() => {
  "use strict";

  const qs = (selector, root = document) => root.querySelector(selector);
  const qsa = (selector, root = document) =>
    Array.from(root.querySelectorAll(selector));

  const escapeHtml = (value) =>
    String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");

  const escapeAttr = (value) =>
    String(value)
      .replace(/&/g, "&amp;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

  const icon = {
    info: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></svg>',
    warning: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 9v4M12 17h.01"/><path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z"/></svg>',
    success: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M8 12l3 3 5-6"/></svg>',
    code: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',
    run: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="6 4 20 12 6 20 6 4"/></svg>',
    copy: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>',
    preview:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="15" rx="2"/><path d="M8 2h8"/></svg>',
    clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>',
  };

  const difficultyLabel = (value) =>
    value === "advanced" ? "پیشرفته" : value === "intermediate" ? "متوسط" : "مقدماتی";

  /* ---------------------------------------------------------------
     Curriculum structure
     --------------------------------------------------------------- */
  const htmlSections = [
    { id: "start", title: "شروع کار" },
    { id: "text", title: "متن و ساختار" },
    { id: "links-media", title: "لینک‌ها و تصاویر" },
    { id: "lists-tables", title: "جدول‌ها و فهرست‌ها" },
    { id: "structure", title: "ساختار و استایل" },
    { id: "document", title: "سند و سمنتیک" },
    { id: "forms", title: "فرم‌ها" },
    { id: "professional", title: "کاربرد حرفه‌ای" },
  ];

  const htmlLessons = [
    {
      id: "html-introduction",
      slug: "html-introduction",
      section: "start",
      number: 1,
      title: "مقدمه‌ای بر HTML",
      description:
        "دریابید HTML چیست، چه نقشی در وب دارد و اولین سند HTML را بسازید.",
      difficulty: "basic",
      timeMinutes: 6,
      objectives: [
        "نقش HTML در ساخت صفحهٔ وب را توضیح دهید.",
        "تفاوت HTML با CSS و JavaScript را بشناسید.",
        "ساختار پایهٔ یک سند HTML را بنویسید.",
      ],
      content: [
        {
          type: "h2",
          text: "HTML چه کاری انجام می‌دهد؟",
        },
        {
          type: "p",
          text: "HTML مخفف HyperText Markup Language است. HTML زبان ساختار صفحه است؛ یعنی مشخص می‌کند که یک صفحهٔ وب از چه بخش‌هایی ساخته شده است، مانند عنوان، پاراگراف، لینک یا تصویر.",
        },
        {
          type: "list",
          items: [
            "HTML: ساختار و محتوا",
            "CSS: ظاهر و چیدمان",
            "JavaScript: رفتار و تعامل",
          ],
        },
        {
          type: "p",
          text: "یک سند HTML مجموعه‌ای از تگ‌هاست. هر تگ یک تکه از محتوا را در بر می‌گیرد و به مرورگر می‌گوید که چگونه آن را نمایش دهد.",
        },
        {
          type: "example",
          title: "اولین سند HTML",
          code: "<!DOCTYPE html>\n<html lang=\"fa\">\n  <head>\n    <meta charset=\"UTF-8\">\n    <title>صفحهٔ من</title>\n  </head>\n  <body>\n    <h1>آشنایی با HTML</h1>\n    <p>این اولین صفحهٔ وب من است؛ HTML ساختار محتوا را می‌سازد.</p>\n  </body>\n</html>",
          desc: "این ساختار پایه را در همهٔ درس‌ها می‌بینید.",
        },
        {
          type: "note",
          text: "html را می‌توانید با Notepad، VS Code یا هر ویرایشگر متنی دیگری بنویسید. به یاد داشته باشید که فایل را با پسوند .html ذخیره کنید.",
        },
        {
          type: "note",
          text: "هیچ کدی در HTML اجرا نمی‌شود؛ HTML فقط توصیف محتواست.",
        },
      ],
      exercise: {
        title: "تمرین: اولین سند",
        prompt:
          "یک سند HTML بسازید که یک عنوان h1 با متن «سلام از وب‌آموز» و یک پاراگراف معرفی کوتاه داشته باشد.",
        starterCode: "<!DOCTYPE html>\n<html lang=\"fa\">\n  <head>\n    <meta charset=\"UTF-8\">\n    <title>تمرین HTML</title>\n  </head>\n  <body>\n    <!-- عنوان خود را اینجا بنویسید -->\n  </body>\n</html>",
      },
    },
    {
      id: "html-editors",
      slug: "html-editors",
      section: "start",
      number: 2,
      title: "ویرایشگرها",
      description:
        "ابزارهای نوشتن HTML را بشناسید و یک محیط ساده برای تمرین آماده کنید.",
      difficulty: "basic",
      timeMinutes: 5,
      objectives: [
        "یک ویرایشگر متن ساده یا کد را انتخاب کنید.",
        "فایل HTML را با پسوند درست ذخیره کنید.",
        "صفحه را در مرورگر باز کنید.",
      ],
      content: [
        {
          type: "h2",
          text: "با چه ابزاری بنویسیم؟",
        },
        {
          type: "p",
          text: "HTML با هر ویرایشگر متنی نوشته می‌شود. برای شروع، یادداشت (Notepad) کافی است، اما برای کار واقعی بهتر است از یک ویرایشگر کد استفاده کنید.",
        },
        {
          type: "list",
          items: [
            "VS Code: رایگان، محبوب و مناسب پروژه‌های واقعی",
            "Notepad++: سبک برای ویندوز",
            "Sublime Text: سبک و سریع",
            "ویرایشگر آنلاین: برای تمرین بدون نصب",
          ],
        },
        {
          type: "example",
          title: "ذخیره و اجرا",
          code: "<!DOCTYPE html>\n<html lang=\"fa\">\n  <head>\n    <meta charset=\"UTF-8\">\n    <title>تمرین ویرایشگر</title>\n  </head>\n  <body>\n    <h1>فایل من در مرورگر</h1>\n  </body>\n</html>",
          desc: "فایل را با نام index.html ذخیره کنید و در مرورگر باز کنید.",
        },
        {
          type: "note",
          text: "پسوند فایل باید .html باشد. اگر ثابت نشود، مرورگر ممکن است متن خام را نشان دهد.",
        },
      ],
      exercise: {
        title: "تمرین: آماده‌سازی محیط",
        prompt:
          "یک فایل index.html بسازید، یک عنوان و یک پاراگراف به آن اضافه کنید و آن را در مرورگر باز کنید.",
        starterCode: "<!DOCTYPE html>\n<html lang=\"fa\">\n  <head>\n    <meta charset=\"UTF-8\">\n    <title>محیط من</title>\n  </head>\n  <body>\n    <h1>اولین صفحه</h1>\n    <p>این صفحه را در مرورگر باز کنید.</p>\n  </body>\n</html>",
      },
    },
    {
      id: "html-basic",
      slug: "html-basic",
      section: "start",
      number: 3,
      title: "HTML پایه",
      description:
        "با تگ‌های main، h، p، a و ساختار پایهٔ سند به صورت عملی کار کنید.",
      difficulty: "basic",
      timeMinutes: 10,
      objectives: [
        "ساختار پایهٔ سند را بشناسید.",
        "عنوان، پاراگراف و لینک بسازید.",
        "تفاوت تگ باز و بسته را یاد بگیرید.",
      ],
      content: [
        {
          type: "h2",
          text: "ساختار سند",
        },
        {
          type: "p",
          text: "هر سند HTML با <!DOCTYPE html> شروع می‌شود. تگ html همهٔ محتوا را در بر می‌گیرد و به دو بخش head و body تقسیم می‌شود.",
        },
        {
          type: "list",
          items: [
            "head: اطلاعات دربارهٔ صفحه مانند عنوان و کاراکترها",
            "body: محتوای قابل مشاهده",
          ],
        },
        {
          type: "example",
          title: "ساختار پایه",
          code: "<!DOCTYPE html>\n<html lang=\"fa\">\n\n<head>\n  <meta charset=\"UTF-8\">\n  <title>وب‌آموز</title>\n</head>\n\n<body>\n  <h1>وب‌آموز</h1>\n  <p>یادگیری HTML و CSS به زبان فارسی.</p>\n  <a href=\"2-html-course.html\">دورهٔ HTML</a>\n</body>\n\n</html>",
          desc: "عنوان‌ها، پاراگراف و لینک را در body می‌نویسیم.",
        },
        {
          type: "syntax",
          title: "تگ باز و بسته",
          code: "<p>متن پاراگراف</p>",
        },
        {
          type: "mistake",
          text: "اگر یک تگ را ببندید اما تگ باز را فراموش کنید، مرورگر محتوا را با حدس نمایش می‌دهد و نتیجه نامرتب می‌شود.",
        },
      ],
      exercise: {
        title: "تمرین: صفحهٔ معرفی",
        prompt:
          "یک صفحهٔ ساده با عنوان، دو پاراگراف و یک لینک به صفحهٔ دورهٔ HTML بسازید.",
        starterCode: "<!DOCTYPE html>\n<html lang=\"fa\">\n  <head>\n    <meta charset=\"UTF-8\">\n    <title>معرفی من</title>\n  </head>\n  <body>\n    <!-- عنوان و متن معرفی را اضافه کنید -->\n  </body>\n</html>",
      },
    },
    {
      id: "html-elements",
      slug: "html-elements",
      section: "start",
      number: 4,
      title: "عنصرهای HTML",
      description:
        "جاوا اسکریپت نیست! این درس، مفهوم عنصر، تگ و محتوا را شفاف می‌کند.",
      difficulty: "basic",
      timeMinutes: 8,
      objectives: [
        "تفاوت تگ و عنصر را توضیح دهید.",
        "عنصرهای خالی مانند br و img را بشناسید.",
        "عنصرهای تو در تو را بنویسید.",
      ],
      content: [
        {
          type: "h2",
          text: "عنصر چیست؟",
        },
        {
          type: "p",
          text: "یک عنصر (Element) معمولاً از یک تگ باز، محتوا و یک تگ بسته تشکیل می‌شود. بعضی عنصرها محتوای داخل ندارند و «عنصر خالی» نامیده می‌شوند.",
        },
        {
          type: "syntax",
          title: "ساختار عنصر",
          code: "<tagname>محتوا</tagname>",
        },
        {
          type: "example",
          title: "عنصرهای رایج",
          code: "<h1>عنوان اصلی</h1>\n<p>یک پاراگراف.</p>\n<p>یک پاراگراف با <strong>نکتهٔ مهم</strong>.</p>\n<hr>\n<p>خط جداکنندهٔ بالا با hr ساخته شد.</p>",
          desc: "استrong و hr نمونهٔ عنصرهای مختلف هستند.",
        },
        {
          type: "note",
          text: "عنصرهای خالی مانند hr، br و img تگ بسته ندارند.",
        },
        {
          type: "mistake",
          text: "عبارت «تگ» و «عنصر» را می‌توان گاهی به جای هم استفاده کرد، اما در گفتار فنی «عنصر» به کل باز، محتوا و بسته گفته می‌شود.",
        },
      ],
      exercise: {
        title: "تمرین: عنصرهای تو در تو",
        prompt:
          "یک پاراگراف بسازید که یک عبارت مهم را با strong و یک عبارت را با em نمایش دهد.",
        starterCode: "<!DOCTYPE html>\n<html lang=\"fa\">\n  <head>\n    <meta charset=\"UTF-8\">\n    <title>عنصرها</title>\n  </head>\n  <body>\n    <!-- پاراگراف خود را بنویسید -->\n  </body>\n</html>",
      },
    },
    {
      id: "html-attributes",
      slug: "html-attributes",
      section: "text",
      number: 5,
      title: "ویژگی‌ها (Attributes)",
      description:
        "با ویژگی‌هایی مانند href، src، alt و lang برای تکمیل عنصرها آشنا شوید.",
      difficulty: "basic",
      timeMinutes: 9,
      objectives: [
        "نحوهٔ نوشتن ویژگی را توضیح دهید.",
        "ویژگی‌های href، src و alt را استفاده کنید.",
        "از ابزارهای نقل‌قول و مقدار درست استفاده کنید.",
      ],
      content: [
        {
          type: "h2",
          text: "ویژگی چیست؟",
        },
        {
          type: "p",
          text: "ویژگی (Attribute) اطلاعات بیشتری را به یک عنصر اضافه می‌کند. معمولاً به صورت نام=\"مقدار\" در تگ باز نوشته می‌شود.",
        },
        {
          type: "syntax",
          title: "ساختار ویژگی",
          code: "<tagname attribute=\"value\">محتوا</tagname>",
        },
        {
          type: "example",
          title: "ویژگی‌های کاربردی",
          code: "<a href=\"https://example.com\">یک لینک</a>\n<img src=\"photo.jpg\" alt=\"نمای کوه\" width=\"300\">\n<html lang=\"fa\">",
          desc: "href، src، alt و lang نمونهٔ ویژگی‌های پرکاربرد هستند.",
        },
        {
          type: "note",
          text: "در HTML مدرن، می‌توانید مقدارها را با نقل‌قول نوشته یا بدون آن بنویسید؛ استفاده از نقل‌قول همیشه امن‌تر است.",
        },
        {
          type: "mistake",
          text: "دو ویژگی با یک نام در یک تگ ننویسید — فقط مقدار اول در نظر گرفته می‌شود.",
        },
      ],
      exercise: {
        title: "تمرین: ویژگی‌ها",
        prompt:
          "یک لینک با href و target و یک تصویر با src و alt بسازید.",
        starterCode: "<!DOCTYPE html>\n<html lang=\"fa\">\n  <head>\n    <meta charset=\"UTF-8\">\n    <title>ویژگی‌ها</title>\n  </head>\n  <body>\n    <!-- لینک و تصویر را اضافه کنید -->\n  </body>\n</html>",
      },
    },
    {
      id: "html-headings",
      slug: "html-headings",
      section: "text",
      number: 6,
      title: "عنوان‌ها (Headings)",
      description:
        "سلسله‌مراتب عنوان‌ها h1 تا h6 را برای متنی منظم بیاموزید.",
      difficulty: "basic",
      timeMinutes: 7,
      objectives: [
        "عنوان‌ها از h1 تا h6 را بشناسید.",
        "از سلسله‌مراتب درست استفاده کنید.",
        "عنوان‌ها را برای دسترس‌پذیری مرتب کنید.",
      ],
      content: [
        {
          type: "h2",
          text: "سلسله‌مراتب عنوان‌ها",
        },
        {
          type: "p",
          text: "HTML شش سطح عنوان دارد؛ h1 بزرگ‌ترین و اصلی‌ترین عنوان است و h6 کوچک‌ترین. برای ساختاری خوانا، از h1 به بعد پله‌پله پایین بیایید.",
        },
        {
          type: "example",
          title: "عنوان‌ها",
          code: "<h1>وب‌آموز</h1>\n<h2>دورهٔ HTML</h2>\n<h3>عنوان‌ها</h3>\n<h4>چرا عنوان مهم است؟</h4>",
          desc: "در صفحهٔ وب فقط یک h1 اصلی باشد.",
        },
        {
          type: "note",
          text: "عنوان‌ها فقط برای بزرگ‌کردن متن نیستند؛ آن‌ها ساختار سند را به کاربران و موتورهای جستجو نشان می‌دهند.",
        },
        {
          type: "mistake",
          text: "از h1 تا h6 پرش نکنید؛ مثلاً از h1 مستقیم به h4 نروید، مگر در موارد خاص.",
        },
      ],
      exercise: {
        title: "تمرین: ساختار عناوین",
        prompt:
          "یک صفحهٔ سایت با h1 برای نام سایت، h2 برای هر بخش و h3 برای زیربخش هر بخش بسازید.",
        starterCode: "<!DOCTYPE html>\n<html lang=\"fa\">\n  <head>\n    <meta charset=\"UTF-8\">\n    <title>عنوان‌ها</title>\n  </head>\n  <body>\n    <h1>وب‌آموز</h1>\n    <!-- بخش‌ها و زیربخش‌ها را اضافه کنید -->\n  </body>\n</html>",
      },
    },
    {
      id: "html-paragraphs",
      slug: "html-paragraphs",
      section: "text",
      number: 7,
      title: "پاراگراف‌ها",
      description:
        "متن را با پاراگراف، شکست خط و پیش‌فرض‌های HTML منظم کنید.",
      difficulty: "basic",
      timeMinutes: 7,
      objectives: [
        "پاراگراف را با p بسازید.",
        "با br و پیش‌فرض‌ها فاصله را کنترل کنید.",
        "فاصله‌گذاری خودکار HTML را بشناسید.",
      ],
      content: [
        {
          type: "h2",
          text: "پاراگراف‌سازی با p",
        },
        {
          type: "p",
          text: "عنصر p یک پاراگراف متن را نگه می‌دارد. مرورگر قبل و بعد از هر پاراگراف فاصلهٔ پیش‌فرض می‌گذارد.",
        },
        {
          type: "example",
          title: "پاراگراف‌ها",
          code: "<p>این اولین پاراگراف است.</p>\n<p>این دومین پاراگراف است.</p>\n<p>خط اول<br>خط دوم</p>",
          desc: "br یک شکست خط ساده ایجاد می‌کند.",
        },
        {
          type: "note",
          text: "فاصله‌های متعدد و خطوط خالی در HTML فشرده می‌شوند؛ بنابراین برای خط جدید از br و برای پاراگراف از p استفاده کنید.",
        },
      ],
      exercise: {
        title: "تمرین: متن معرفی",
        prompt:
          "سه پاراگراف دربارهٔ چیزی که دوست دارید یاد بگیرید بنویسید و در یک پاراگراف از br استفاده کنید.",
        starterCode: "<!DOCTYPE html>\n<html lang=\"fa\">\n  <head>\n    <meta charset=\"UTF-8\">\n    <title>پاراگراف‌ها</title>\n  </head>\n  <body>\n    <!-- پاراگراف‌ها را اضافه کنید -->\n  </body>\n</html>",
      },
    },
    {
      id: "html-styles",
      slug: "html-styles",
      section: "text",
      number: 8,
      title: "استایل‌های HTML",
      description:
        "با ویژگی style و کاربرد محدود آن برای استایل‌دهی ساده آشنا شوید.",
      difficulty: "basic",
      timeMinutes: 8,
      objectives: [
        "ویژگی style را به عنصر اضافه کنید.",
        "color و font-size و background-color را آزمایش کنید.",
        "بدانید چرا CSS جداکننده بهتر است.",
      ],
      content: [
        {
          type: "h2",
          text: "ویژگی style",
        },
        {
          type: "p",
          text: "ویژگی style به یک عنصر اجازه می‌دهد استایلهای CSS مستقیماً روی همان عنصر نوشته شود. این روش سریع است اما برای پروژهٔ بزرگ مناسب نیست.",
        },
        {
          type: "example",
          title: "استایل درون‌خطی",
          code: "<h1 style=\"color: #0f766e;\">سلام</h1>\n<p style=\"background-color: #eef2f7; padding: 10px;\">این پاراگراف با استایل نمایش داده می‌شود.</p>",
          desc: "نمونه‌ای ساده برای آموزش؛ بهترین روش استفاده از فایل CSS است.",
        },
        {
          type: "note",
          text: "در پروژه‌های واقعی، استایل‌ها را در فایل CSS جدا کنید تا کد تمیزتر و قابل نگه‌داری باشد.",
        },
        {
          type: "mistake",
          text: "استفادهٔ زیاد از استایل درون‌خطی، تغییر تم و خوانایی کد را سخت می‌کند.",
        },
      ],
      exercise: {
        title: "تمرین: استایل ساده",
        prompt:
          "یک عنوان h1 بسازید که رنگ آن سبز تیره و یک پاراگراف بسازید که رنگ پس‌زمینهٔ آن روشن باشد.",
        starterCode: "<!DOCTYPE html>\n<html lang=\"fa\">\n  <head>\n    <meta charset=\"UTF-8\">\n    <title>استایل</title>\n  </head>\n  <body>\n    <!-- عنوان و پاراگراف استایل‌دار -->\n  </body>\n</html>",
      },
    },
    {
      id: "html-formatting",
      slug: "html-formatting",
      section: "text",
      number: 9,
      title: "قالب‌بندی متن",
      description:
        "با bold، strong، italic، mark، small و سایر عنصرهای متنی کار کنید.",
      difficulty: "basic",
      timeMinutes: 9,
      objectives: [
        "عنصرهای تاکیدی strong و em را بشناسید.",
        "از b و i به صورت ساده استفاده کنید.",
        "mark ،small ،del و ins را آزمایش کنید.",
      ],
      content: [
        {
          type: "h2",
          text: "عنصرهای قالب‌بندی",
        },
        {
          type: "p",
          text: "برای جلب توجه، HTML عنصرهای متنوعی دارد. strong و em معنایی دارند؛ یعنی به موتور جستجو و صفحه‌خوان اهمیت متن را نشان می‌دهند.",
        },
        {
          type: "example",
          title: "قالب‌بندی پرکاربرد",
          code: "<p><strong>مهم:</strong> این موضوع بسیار حیاتی است.</p>\n<p>این یک <em>تأکید</em> در جمله است.</p>\n<p>این یک <mark>هایلایت</mark> و این <small>متن کوچک</small> است.</p>\n<p>این <del>حذف‌شده</del> و این <ins>اضافه‌شده</ins> است.</p>",
          desc: "هر عنصر بر اساس معنا انتخاب می‌شود.",
        },
        {
          type: "note",
          text: "برای تاکید معنایی از strong و em استفاده کنید؛ b و i فقط ظاهر را تغییر می‌دهند.",
        },
      ],
      exercise: {
        title: "تمرین: فرمت متن",
        prompt:
          "یک جمله سوخته‌نوک بسازید که یک کلمه با strong، یک کلمه با em و یک کد کوچک با code مشخص شده باشد.",
        starterCode: "<!DOCTYPE html>\n<html lang=\"fa\">\n  <head>\n    <meta charset=\"UTF-8\">\n    <title>قالب‌بندی</title>\n  </head>\n  <body>\n    <!-- جملهٔ خود را بنویسید -->\n  </body>\n</html>",
      },
    },
    {
      id: "html-quotations",
      slug: "html-quotations",
      section: "text",
      number: 10,
      title: "نقل‌قول‌ها",
      description:
        "نقل‌قول کوتاه و بلند، آدرس نقل‌قول و عنصر address را یاد بگیرید.",
      difficulty: "basic",
      timeMinutes: 6,
      objectives: [
        "q و blockquote را استفاده کنید.",
        "نقش cite در نقل‌قول را توضیح دهید.",
        "عنصر address را بشناسید.",
      ],
      content: [
        {
          type: "h2",
          text: "نقل‌قول کوتاه و بلند",
        },
        {
          type: "p",
          text: "برای نقل‌قول کوتاه داخل متن از q و برای نقل‌قول بلند مستقل از blockquote استفاده می‌شود. ویژگی cite می‌تواند منبع را نشان دهد.",
        },
        {
          type: "example",
          title: "نقل‌قول‌ها",
          code: "<p>استاد گفت: <q>تمرین، کلید یادگیری است.</q></p>\n<blockquote cite=\"https://example.com/book\">\n  <p>یادگیری چیزی است که هیچ‌کس نمی‌تواند آن را از شما بگیرد.</p>\n</blockquote>\n<address>\n  نوشته‌شده توسط وب‌آموز<br>\n  تهران، ایران\n</address>",
          desc: "blockquote برای متن بلند و address برای اطلاعات نویسنده است.",
        },
        {
          type: "note",
          text: "عنصر address برای اطلاعات تماس یا نویسندهٔ محتوا به کار می‌رود.",
        },
      ],
      exercise: {
        title: "تمرین: نقل‌قول",
        prompt:
          "یک جملهٔ نقل‌قول کوتاه با q و یک نقل‌قول بلند با blockquote بسازید و منبع را با cite مشخص کنید.",
        starterCode: "<!DOCTYPE html>\n<html lang=\"fa\">\n  <head>\n    <meta charset=\"UTF-8\">\n    <title>نقل‌قول</title>\n  </head>\n  <body>\n    <!-- نقل‌قول‌ها را بنویسید -->\n  </body>\n</html>",
      },
    },
    {
      id: "html-comments",
      slug: "html-comments",
      section: "text",
      number: 11,
      title: "نظرات (Comments)",
      description:
        "یادداشت‌های داخلی کد را با نظرهای HTML بنویسید بدون این که در صفحه نمایش یابند.",
      difficulty: "basic",
      timeMinutes: 5,
      objectives: [
        "نظر HTML بنویسید.",
        "از نظر برای توضیح بخش‌های پیچیده استفاده کنید.",
        "بدانید نظرها در کد منبع دیده می‌شوند.",
      ],
      content: [
        {
          type: "h2",
          text: "نظر چیست؟",
        },
        {
          type: "p",
          text: "نظر (Comment) متنی است که مرورگر آن را نمایش نمی‌دهد. از نظر برای یادداشت، توضیح بخش‌های بزرگ و یا غیرفعال‌کردن موقت کد استفاده می‌شود.",
        },
        {
          type: "syntax",
          title: "نحوهٔ نوشتن نظر",
          code: "<!-- این یک نظر است -->",
        },
        {
          type: "example",
          title: "نظر در کد",
          code: "<!-- این بخش، نام سایت را نشان می‌دهد -->\n<h1>وب‌آموز</h1>\n\n<!--\n  این بخش موقت غیرفعال است.\n  <p>آیا این پاراگراف دیده می‌شود؟</p>\n-->",
          desc: "محتوای داخل نظر هرگز نمایش داده نمی‌شود.",
        },
        {
          type: "mistake",
          text: "احتمالاً نظرها در کد منبع کاربران دیده می‌شوند؛ پس اطلاعات حساس را در نظر نگذارید.",
        },
      ],
      exercise: {
        title: "تمرین: نظر",
        prompt:
          "یک صفحه با یک h1 بسازید و بالای آن نظر بگذارید که توضیح دهد این بخش معرفی سایت است.",
        starterCode: "<!DOCTYPE html>\n<html lang=\"fa\">\n  <head>\n    <meta charset=\"UTF-8\">\n    <title>نظرها</title>\n  </head>\n  <body>\n    <!-- نظر خود را اضافه کنید -->\n    <h1>وب‌آموز</h1>\n  </body>\n</html>",
      },
    },
    {
      id: "html-colors",
      slug: "html-colors",
      section: "text",
      number: 12,
      title: "رنگ‌ها در HTML",
      description:
        "رنگ متن و پس‌زمینه را با نام رنگ، کد HEX و RGB مشخص کنید.",
      difficulty: "basic",
      timeMinutes: 9,
      objectives: [
        "رنگ را با نام، HEX و RGB تنظیم کنید.",
        "رنگ متن و پس‌زمینه را تغییر دهید.",
        "کنتراست مناسب را درک کنید.",
      ],
      content: [
        {
          type: "h2",
          text: "رنگ متن و پس‌زمینه",
        },
        {
          type: "p",
          text: "HTML به تنهایی رنگ ندارد؛ برای رنگ از ویژگی style و CSS استفاده می‌کنیم.",
        },
        {
          type: "example",
          title: "روش‌های رنگ",
          code: "<p style=\"color: blue;\">نام رنگ</p>\n<p style=\"color: #0f766e;\">کد HEX</p>\n<p style=\"color: rgb(217, 119, 6);\">مقدار RGB</p>\n<p style=\"background-color: #d7f0ee;\">پس‌زمینهٔ سبز روشن</p>",
          desc: "رنگ‌ها را می‌توان به سه روش رایج نوشت.",
        },
        {
          type: "note",
          text: "برای خوانایی، بین رنگ متن و پس‌زمینه کنتراست کافی بگذارید. یک رنگ روشن روی پس‌زمینهٔ روشن قابل خواندن نیست.",
        },
        {
          type: "mistake",
          text: "فقط با نام رنگ مشهور (مثل blue) محدود می‌شوید؛ برای پروژهٔ واقعی از HEX یا متغیرهای CSS استفاده کنید.",
        },
      ],
      exercise: {
        title: "تمرین: رنگ‌ها",
        prompt:
          "یک کارت کوچک بسازید؛ پس‌زمینهٔ آن روشن و متن آن تیره باشد.",
        starterCode: "<!DOCTYPE html>\n<html lang=\"fa\">\n  <head>\n    <meta charset=\"UTF-8\">\n    <title>رنگ‌ها</title>\n  </head>\n  <body>\n    <div style=\"padding: 20px; background-color: #eef2f7;\">\n      <h2 style=\"color: #0f766e;\">کارت آموزشی</h2>\n      <p style=\"color: #172033;\">متن داخل کارت.</p>\n    </div>\n  </body>\n</html>",
      },
    },
    {
      id: "html-links",
      slug: "html-links",
      section: "links-media",
      number: 13,
      title: "لینک‌ها",
      description:
        "لینک داخلی، خارجی، ایمیل و رفتار بازشدن در تب جدید را بسازید.",
      difficulty: "basic",
      timeMinutes: 11,
      objectives: [
        "لینک با عنصر a و ویژگی href بسازید.",
        "لینک داخلی و خارجی را تفکیک کنید.",
        "target و rel را به صورت امن استفاده کنید.",
      ],
      content: [
        {
          type: "h2",
          text: "ساخت لینک",
        },
        {
          type: "p",
          text: "لینک با عنصر a ساخته می‌شود. مقدار href آدرس مقصد است و متن بین تگ‌ها، متن قابل کلیک را می‌سازد.",
        },
        {
          type: "example",
          title: "انواع لینک",
          code: "<a href=\"https://example.com\">لینک خارجی</a>\n<a href=\"4-lesson.html?lesson=html-images\">لینک داخلی</a>\n<a href=\"mailto:hello@example.com\">ارسال ایمیل</a>\n<a href=\"https://example.com\" target=\"_blank\" rel=\"noopener\">پنجرهٔ جدید</a>",
          desc: "برای بازشدن در تب جدید از target=\"_blank\" با rel=\"noopener\" استفاده کنید.",
        },
        {
          type: "note",
          text: "وقتی از target=\"_blank\" استفاده می‌کنید، rel=\"noopener\" از خطر امنیتی در دسترس‌بودن صفحهٔ جدید جلوگیری می‌کند.",
        },
        {
          type: "mistake",
          text: "متن لینک را «اینجا کلیک کنید» نگذارید؛ کاربر و صفحه‌خوان باید بدانند لینک به کجا می‌رود.",
        },
      ],
      exercise: {
        title: "تمرین: لینک‌ها",
        prompt:
          "سه لینک بسازید: یک لینک خارجی، یک لینک داخلی به صفحهٔ دورهٔ HTML و یک لینک ایمیل.",
        starterCode: "<!DOCTYPE html>\n<html lang=\"fa\">\n  <head>\n    <meta charset=\"UTF-8\">\n    <title>لینک‌ها</title>\n  </head>\n  <body>\n    <!-- لینک‌های خود را اضافه کنید -->\n  </body>\n</html>",
      },
    },
    {
      id: "html-images",
      slug: "html-images",
      section: "links-media",
      number: 14,
      title: "تصویرها",
      description:
        "تصویر را با src و alt به صفحه اضافه کنید و ابعاد آن را مدیریت کنید.",
      difficulty: "basic",
      timeMinutes: 10,
      objectives: [
        "عنصر img را به صفحه اضافه کنید.",
        "مقدار alt را برای دسترس‌پذیری بنویسید.",
        "width و height را برای جلوگیری از پرش صفحه تنظیم کنید.",
      ],
      content: [
        {
          type: "h2",
          text: "افزودن تصویر",
        },
        {
          type: "p",
          text: "عنصر img یک تصویر را در صفحه نمایش می‌دهد. src مسیر تصویر و alt متن جایگزین برای وقتی است که تصویر لود نشود یا کاربر از صفحه‌خوان استفاده کند.",
        },
        {
          type: "example",
          title: "تصویر با alt و ابعاد",
          code: "<img src=\"images/logo.jpg\" alt=\"لوگوی وب‌آموز\" width=\"120\" height=\"60\">\n<p>تصویر بالا لوگوی سایت است.</p>",
          desc: "تنظیم width و height باعث می‌شود مرورگر جای تصویر را قبل از لود نگه دارد.",
        },
        {
          type: "note",
          text: "اگر تصویر تزئینی است و اطلاعاتی ندارد، می‌توانید alt را خالی بگذارید: alt=\"\".",
        },
        {
          type: "mistake",
          text: "متن alt را برای حفظ سئو با کلمات تکراری پر نکنید؛ alt باید محتوای تصویر را توصیف کند.",
        },
      ],
      exercise: {
        title: "تمرین: تصویر",
        prompt:
          "یک تصویر از یک لوگو با alt، width و height اضافه کنید.",
        starterCode: "<!DOCTYPE html>\n<html lang=\"fa\">\n  <head>\n    <meta charset=\"UTF-8\">\n    <title>تصویرها</title>\n  </head>\n  <body>\n    <!-- تصویر خود را اضافه کنید -->\n  </body>\n</html>",
      },
    },
    {
      id: "html-tables",
      slug: "html-tables",
      section: "lists-tables",
      number: 15,
      title: "جدول‌ها",
      description:
        "داده‌های دو بعدی را با table، tr، th و td نمایش دهید.",
      difficulty: "intermediate",
      timeMinutes: 12,
      objectives: [
        "جدول ساده با table بسازید.",
        "سر ستون و سلول را تشخیص دهید.",
        "از caption و thead برای جدول معنایی استفاده کنید.",
      ],
      content: [
        {
          type: "h2",
          text: "ساخت جدول",
        },
        {
          type: "p",
          text: "جدول برای نمایش داده‌های سطری و ستونی است. هر جدول با table شروع می‌شود، هر ردیف با tr، هر سلول ستون با th و هر سلول داده با td ساخته می‌شود.",
        },
        {
          type: "example",
          title: "جدول دما",
          code: "<table>\n  <caption>دمای روزهای هفته</caption>\n  <thead>\n    <tr>\n      <th>روز</th>\n      <th>دما</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <td>شنبه</td>\n      <td>۲۵°</td>\n    </tr>\n    <tr>\n      <td>یکشنبه</td>\n      <td>۲۷°</td>\n    </tr>\n  </tbody>\n</table>",
          desc: "thead و tbody ساختار جدول را واضح‌تر می‌کنند.",
        },
        {
          type: "note",
          text: "از colspan برای ادغام ستون‌ها استفاده کنید؛ اما قبل از آن، ساختار ساده‌تر را امتحان کنید.",
        },
        {
          type: "mistake",
          text: "جدول را برای چینش و چیدمان صفحه استفاده نکنید؛ برای چیدمان از CSS و Grid/Flexbox استفاده می‌شود.",
        },
      ],
      exercise: {
        title: "تمرین: جدول",
        prompt:
          "جدولی از سه ردیف و دو ستون بسازید؛ ستون اول عنوان درس و ستون دوم زمان پیشنهادی را نشان دهد.",
        starterCode: "<!DOCTYPE html>\n<html lang=\"fa\">\n  <head>\n    <meta charset=\"UTF-8\">\n    <title>جدول</title>\n  </head>\n  <body>\n    <!-- جدول خود را بسازید -->\n  </body>\n</html>",
      },
    },
    {
      id: "html-lists",
      slug: "html-lists",
      section: "lists-tables",
      number: 16,
      title: "فهرست‌ها",
      description:
        "فهرست نامرتب، مرتب و تو در تو را برای محتوای ساختاریافته بسازید.",
      difficulty: "basic",
      timeMinutes: 8,
      objectives: [
        "فهرست نامرتب ul و مرتب ol بسازید.",
        "فهرست تو در تو بنویسید.",
        "عنصر li را برای آسانی خوانایی استفاده کنید.",
      ],
      content: [
        {
          type: "h2",
          text: "انواع فهرست",
        },
        {
          type: "p",
          text: "برای مواردی که ترتیب مهم نیست از ul و برای مواردی که شماره دارند از ol استفاده می‌شود. هر مورد داخل li قرار می‌گیرد.",
        },
        {
          type: "example",
          title: "فهرست ساده و تو در تو",
          code: "<h2>ابزارها</h2>\n<ul>\n  <li>ویرایشگر کد</li>\n  <li>مرورگر</li>\n  <li>اینترنت</li>\n</ul>\n\n<h2>مراحل:</h2>\n<ol>\n  <li>فایل بسازید</li>\n  <li>کد بزنید</li>\n  <li>در مرورگر باز کنید</li>\n</ol>",
          desc: "فهرست‌های تو در تو برای دسته‌بندی‌های پیچیده کاربردی‌اند.",
        },
        {
          type: "note",
          text: "فهرست‌ها را برای ناوبری و فهرست مطالب سایت هم می‌توانید استفاده کنید؛ فقط از عنصر مناسب و سمنتیک استفاده کنید.",
        },
      ],
      exercise: {
        title: "تمرین: فهرست",
        prompt:
          "یک فهرست نامرتب از سه مهارت و یک فهرست مرتب از سه مرحله‌ی ساختن صفحه بسازید.",
        starterCode: "<!DOCTYPE html>\n<html lang=\"fa\">\n  <head>\n    <meta charset=\"UTF-8\">\n    <title>فهرست‌ها</title>\n  </head>\n  <body>\n    <!-- فهرست‌ها را اضافه کنید -->\n  </body>\n</html>",
      },
    },
    {
      id: "html-block-inline",
      slug: "html-block-inline",
      section: "structure",
      number: 17,
      title: "عنصرهای Block و Inline",
      description:
        "تفاوت عنصرهای بلوکی و درون‌خطی را بشناسید و در چیدمان درست به کار ببرید.",
      difficulty: "basic",
      timeMinutes: 8,
      objectives: [
        "عنصر بلوکی غالباً خط جدید می‌گیرد.",
        "عنصر درون‌خطی در همان خط ادامه می‌یابد.",
        "نمونه‌های رایج هر نوع را بشناسید.",
      ],
      content: [
        {
          type: "h2",
          text: "بلوک و درون‌خطی",
        },
        {
          type: "p",
          text: "عنصرهای بلوکی (Block) مثل p و div کل عرض والد را می‌گیرند و از خط جدید شروع می‌شوند. عنصرهای درون‌خطی (Inline) مثل span و a در همان خط قرار می‌گیرند.",
        },
        {
          type: "example",
          title: "تفاوت نمایش",
          code: "<p>این یک بلوک است.</p>\n<p>این هم یک بلوک است.</p>\n<span>اول</span>\n<span>دوم</span>",
          desc: "هر p خط جدید می‌گیرد، اما spanها کنار هم می‌مانند.",
        },
        {
          type: "list",
          items: [
            "Block: p ،div ،h1-h6 ،ul ،ol ،table",
            "Inline: a ،span ،strong ،em ،img",
          ],
        },
      ],
      exercise: {
        title: "تمرین: block و inline",
        prompt:
          "دو p و دو span کنار هم بنویسید و تفاوت خط‌های آن‌ها را در پیش‌نمایش ببینید.",
        starterCode: "<!DOCTYPE html>\n<html lang=\"fa\">\n  <head>\n    <meta charset=\"UTF-8\">\n    <title>بلوک و خطی</title>\n  </head>\n  <body>\n    <p>پاراگراف اول</p>\n    <p>پاراگراف دوم</p>\n    <span>درون‌خطی</span>\n    <span>درون‌خطی</span>\n  </body>\n</html>",
      },
    },
    {
      id: "html-classes",
      slug: "html-classes",
      section: "structure",
      number: 18,
      title: "کلاس‌ها (Classes)",
      description:
        "با ویژگی class چند عنصر را به یک گروه استایل‌دهی مشترک متصل کنید.",
      difficulty: "intermediate",
      timeMinutes: 8,
      objectives: [
        "با ویژگی class عناصر را گروه‌بندی کنید.",
        "از چند کلاس روی یک عنصر استفاده کنید.",
        "نام‌گذاری خوانا برای کلاس‌ها را تمرین کنید.",
      ],
      content: [
        {
          type: "h2",
          text: "ویژگی class",
        },
        {
          type: "p",
          text: "ویژگی class یک نام برای گروهی از عناصر است. با CSS می‌توانید یک کلاس را یک بار تعریف کنید و روی چند عنصر اعمال کنید.",
        },
        {
          type: "example",
          title: "استفاده از کلاس",
          code: "<style>\n  .card {\n    border: 1px solid #dfe5ed;\n    padding: 16px;\n    border-radius: 8px;\n  }\n</style>\n<div class=\"card\">کارت اول</div>\n<div class=\"card\">کارت دوم</div>",
          desc: "هر دو div دارای یک ظاهر مشترک هستند.",
        },
        {
          type: "note",
          text: "نام کلاس را توصیفی و صریح انتخاب کنید؛ مثلاً product-card بهتر از red-box است.",
        },
      ],
      exercise: {
        title: "تمرین: کلاس",
        prompt:
          "سه کارت با کلاس مشترک card بسازید و با style داخل صفحه، رنگ و پس‌زمینهٔ یکسانی بدهید.",
        starterCode: "<!DOCTYPE html>\n<html lang=\"fa\">\n  <head>\n    <meta charset=\"UTF-8\">\n    <title>کلاس‌ها</title>\n  </head>\n  <body>\n    <!-- کارت‌های کلاس‌دار -->\n  </body>\n</html>",
      },
    },
    {
      id: "html-ids",
      slug: "html-ids",
      section: "structure",
      number: 19,
      title: "شناسه‌ها (IDs)",
      description:
        "با ویژگی id یک عنصر را یکتا معرفی کنید و به بخشی از صفحه لینک بدهید.",
      difficulty: "intermediate",
      timeMinutes: 7,
      objectives: [
        "ویژگی id را به یک عنصر اختصاص دهید.",
        "با href=\"#id\" به بخشی از صفحه لینک بدهید.",
        "تفاوت class و id را توضیح دهید.",
      ],
      content: [
        {
          type: "h2",
          text: "شناسهٔ یکتا",
        },
        {
          type: "p",
          text: "ویژگی id به یک عنصر شناسهٔ یکتا می‌دهد. در هر صفحه فقط یک عنصر می‌تواند یک id مشخص را داشته باشد. با href=\"#id\" می‌توانید به آن بخش بروید.",
        },
        {
          type: "example",
          title: "لینک به بخشی از صفحه",
          code: "<a href=\"#courses\">پرش به دوره‌ها</a>\n\n<h2 id=\"courses\">دوره‌های سایت</h2>\n<p>محتوای دوره‌های HTML و CSS در این بخش قرار دارد.</p>",
          desc: "با کلیک روی لینک، صفحه به بخش مشخص‌شده پرش می‌کند.",
        },
        {
          type: "note",
          text: "از id برای سبک‌های تکراری استفاده نکنید؛ این کار درست نیست و شبیه رفتار کلاس می‌شود.",
        },
      ],
      exercise: {
        title: "تمرین: id",
        prompt:
          "یک لینک به بخش «دربارهٔ ما» بسازید و آن بخش را با id مشخص کنید.",
        starterCode: "<!DOCTYPE html>\n<html lang=\"fa\">\n  <head>\n    <meta charset=\"UTF-8\">\n    <title>شناسه‌ها</title>\n  </head>\n  <body>\n    <a href=\"#about\">دربارهٔ ما</a>\n    <section id=\"about\">\n      <h2>دربارهٔ ما</h2>\n    </section>\n  </body>\n</html>",
      },
    },
    {
      id: "html-iframes",
      slug: "html-iframes",
      section: "structure",
      number: 20,
      title: "Iframe",
      description:
        "با عنصر iframe یک صفحه یا ویدیو را داخل صفحهٔ دیگر جاسازی کنید.",
      difficulty: "intermediate",
      timeMinutes: 6,
      objectives: [
        "iframe را به صفحه اضافه کنید.",
        "ابعاد و title را تنظیم کنید.",
        "موارد امنیتی و دسترس‌پذیری آن را بشناسید.",
      ],
      content: [
        {
          type: "h2",
          text: "جاسازی صفحه",
        },
        {
          type: "p",
          text: "عنصر iframe به شما اجازه می‌دهد یک صفحهٔ دیگر را داخل یک قاب نمایش دهید. برای دسترس‌پذیری، ویژگی title را فراموش نکنید.",
        },
        {
          type: "example",
          title: "Iframe",
          code: "<iframe\n  src=\"https://www.example.com\"\n  width=\"400\"\n  height=\"300\"\n  title=\"پیش‌نمایش سایت نمونه\"\n  loading=\"lazy\">\n</iframe>",
          desc: "loading=\"lazy\" باعث بارگذاری کندتر و بهینه‌تر صفحه می‌شود.",
        },
        {
          type: "note",
          text: "برخی سایت‌ها اجازهٔ جاسازی نمی‌دهند و در iframe خالی نمایش داده می‌شوند؛ این طبیعی است.",
        },
      ],
      exercise: {
        title: "تمرین: iframe",
        prompt:
          "یک iframe با src، title و ابعاد مشخص بسازید.",
        starterCode: "<!DOCTYPE html>\n<html lang=\"fa\">\n  <head>\n    <meta charset=\"UTF-8\">\n    <title>iframe</title>\n  </head>\n  <body>\n    <!-- iframe خود را اضافه کنید -->\n  </body>\n</html>",
      },
    },
    {
      id: "html-file-paths",
      slug: "html-file-paths",
      section: "structure",
      number: 21,
      title: "مسیر فایل‌ها",
      description:
        "مسیرهای نسبی و مطلق را بشناسید تا لینک‌ها و تصویرها درست کار کنند.",
      difficulty: "intermediate",
      timeMinutes: 9,
      objectives: [
        "مسیر نسبی را بفهمید.",
        "مسیر مطلق و Web را تشخیص دهید.",
        "با ../ به پوشهٔ بالاتر اشاره کنید.",
      ],
      content: [
        {
          type: "h2",
          text: "مسیر نسبی و مطلق",
        },
        {
          type: "p",
          text: "مسیر نسبی نسبت به جای فعلی فایل نوشته می‌شود. مسیر مطلق از ریشهٔ وب یا آدرس کامل شروع می‌شود.",
        },
        {
          type: "example",
          title: "مثال مسیر",
          code: "<img src=\"images/logo.jpg\" alt=\"لوگو\">\n<a href=\"../index.html\">صفحه اصلی</a>\n<a href=\"https://example.com\">آدرس کامل</a>\n<img src=\"/images/banner.jpg\" alt=\"بنر\">",
          desc: ".. برای رفتن به پوشهٔ بالاتر استفاده می‌شود.",
        },
        {
          type: "note",
          text: "در پروژه‌های محلی، مسیرهای نسبی به همان اندازه‌ای مهم هستند که مسیرهای کامل در وب‌سرور.",
        },
      ],
      exercise: {
        title: "تمرین: مسیر",
        prompt:
          "صفحه‌ای بسازید که یک تصویر از پوشه‌ی images و یک لینک به صفحهٔ اصلی با مسیر نسبی داشته باشد.",
        starterCode: "<!DOCTYPE html>\n<html lang=\"fa\">\n  <head>\n    <meta charset=\"UTF-8\">\n    <title>مسیر فایل‌ها</title>\n  </head>\n  <body>\n    <!-- تصویر و لینک با مسیر نسبی -->\n  </body>\n</html>",
      },
    },
    {
      id: "html-head",
      slug: "html-head",
      section: "document",
      number: 22,
      title: "عنصر head",
      description:
        "متادیتا، عنوان، کاراکتر و لینک‌های صفحه را در head تنظیم کنید.",
      difficulty: "intermediate",
      timeMinutes: 9,
      objectives: [
        "عناصر پرکاربرد head را بشناسید.",
        "title و meta description را تنظیم کنید.",
        "لینک استایل و favicon را اضافه کنید.",
      ],
      content: [
        {
          type: "h2",
          text: "داخل head",
        },
        {
          type: "p",
          text: "بخش head اطلاعاتی دربارهٔ صفحه دارد که کاربر معمولاً نمی‌بیند. این اطلاعات شامل عنوان، زبان، کاراکترها و اشاره به فایل‌های استایل است.",
        },
        {
          type: "example",
          title: "head کامل",
          code: "<head>\n  <meta charset=\"UTF-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n  <meta name=\"description\" content=\"آموزش HTML و CSS به زبان فارسی\">\n  <title>وب‌آموز</title>\n  <link rel=\"stylesheet\" href=\"style.css\">\n  <link rel=\"icon\" href=\"favicon.ico\">\n</head>",
          desc: "عنوان و توضیحات برای سئو و نمایش نتایج جستجو مهم‌اند.",
        },
        {
          type: "note",
          text: "فایل‌های CSS را با link در head اضافه کنید تا قبل از نمایش صفحه بارگذاری شوند.",
        },
      ],
      exercise: {
        title: "تمرین: head",
        prompt:
          "صفحه‌ای با title، متا description، viewport و لینک به یک فایل استایل بسازید.",
        starterCode: "<!DOCTYPE html>\n<html lang=\"fa\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>وب‌آموز</title>\n</head>\n<body>\n  <h1>حالا head را کامل کنید</h1>\n</body>\n</html>",
      },
    },
    {
      id: "html-layout",
      slug: "html-layout",
      section: "document",
      number: 23,
      title: "چیدمان صفحه",
      description:
        "ساختار مرسوم سربرگ، ناوبری، محتوا و پاورقی را با HTML بسازید.",
      difficulty: "intermediate",
      timeMinutes: 11,
      objectives: [
        "چیدمان دو یا سه بخشی را تشخیص دهید.",
        "از div برای ساختار ساده استفاده کنید.",
        "با classهای معنایی نام‌گذاری کنید.",
      ],
      content: [
        {
          type: "h2",
          text: "ساختار رایج سایت",
        },
        {
          type: "p",
          text: "بیشتر سایت‌ها از سربرگ، ناوبری، اینفوگرافیک اصلی و پاورقی تشکیل می‌شوند. برای سادگی می‌شود با div و کلاس شروع کرد.",
        },
        {
          type: "example",
          title: "اسکلت چیدمان",
          code: "<header class=\"site-header\">\n  <h1>وب‌آموز</h1>\n</header>\n<nav class=\"site-nav\">\n  <a href=\"#\">خانه</a>\n  <a href=\"#\">دوره‌ها</a>\n</nav>\n<main class=\"site-main\">\n  <p>محتوا</p>\n</main>\n<footer class=\"site-footer\">\n  <p>© ۱۴۰۴ وب‌آموز</p>\n</footer>",
          desc: "این اسکلت بعداً با عناصر سمنتیک و CSS کامل می‌شود.",
        },
        {
          type: "note",
          text: "در درس بعدی، عناصر سمنتیک زیرساخت خوانا و دسترس‌پذیرتری فراهم می‌کنند.",
        },
      ],
      exercise: {
        title: "تمرین: چیدمان",
        prompt:
          "یک صفحه با header، nav، main و footer بسازید.",
        starterCode: "<!DOCTYPE html>\n<html lang=\"fa\">\n  <head>\n    <meta charset=\"UTF-8\">\n    <title>چیدمان</title>\n  </head>\n  <body>\n    <!-- ساختار چیدمان خود را بسازید -->\n  </body>\n</html>",
      },
    },
    {
      id: "html-semantic",
      slug: "html-semantic",
      section: "document",
      number: 24,
      title: "عنصرهای معنایی",
      description:
        "از header، nav، main، section، article، aside و footer برای ساختاری واضح استفاده کنید.",
      difficulty: "intermediate",
      timeMinutes: 13,
      objectives: [
        "عناصر سمنتیک مهم را بشناسید.",
        "divهای بی‌معنا را با عناصر مناسب جایگزین کنید.",
        "مزیت دسترس‌پذیری و سئو این ساختار را درک کنید.",
      ],
      content: [
        {
          type: "h2",
          text: "چرا عناصر سمنتیک؟",
        },
        {
          type: "p",
          text: "عناصر معنایی به مرورگر، صفحه‌خوان و موتور جستجو می‌گویند که هر بخش چه نقشی دارد. همین ساختار باعث خوانایی و دسترس‌پذیری بهتر می‌شود.",
        },
        {
          type: "example",
          title: "صفحهٔ معنایی",
          code: "<body>\n  <header>\n    <h1>وب‌آموز</h1>\n  </header>\n  <nav aria-label=\"منوی اصلی\">\n    <a href=\"#\">خانه</a>\n  </nav>\n  <main>\n    <article>\n      <h2>درس HTML</h2>\n      <p>توضیح درس</p>\n    </article>\n    <aside>\n      <h3>پیشنهاد</h3>\n      <p>درس بعدی</p>\n    </aside>\n  </main>\n  <footer>\n    <p>© ۱۴۰۴</p>\n  </footer>\n</body>",
          desc: "article برای محتوای مستقل و aside برای محتوای مکمل است.",
        },
        {
          type: "list",
          items: [
            "header: سربرگ یا بالای بخش",
            "nav: ناوبری اصلی",
            "main: محتوای اصلی یکتا",
            "article: محتوای مستقل",
            "section: بخش موضوعی",
            "aside: محتوای جانبی",
            "footer: پاورقی",
          ],
        },
        {
          type: "note",
          text: "در طول زمان، عنصرهای سمنتیک را با کلاس‌های توصیفی همراه کنید، نه به جای آن‌ها.",
        },
      ],
      exercise: {
        title: "تمرین: سمنتیک",
        prompt:
          "یک صفحهٔ خبر کوچک با header، nav، main، article و footer بسازید.",
        starterCode: "<!DOCTYPE html>\n<html lang=\"fa\">\n  <head>\n    <meta charset=\"UTF-8\">\n    <title>سمنتیک</title>\n  </head>\n  <body>\n    <!-- صفحهٔ سمنتیک خود را بسازید -->\n  </body>\n</html>",
      },
    },
    {
      id: "html-forms",
      slug: "html-forms",
      section: "forms",
      number: 25,
      title: "فرم‌ها",
      description:
        "فرم‌ساز برای ورودی کاربر با form، label و input شروع کنید.",
      difficulty: "intermediate",
      timeMinutes: 11,
      objectives: [
        "ساختار پایهٔ فرم را بشناسید.",
        "label را به ورودی‌ها متصل کنید.",
        "دکمهٔ ارسال را اضافه کنید.",
      ],
      content: [
        {
          type: "h2",
          text: "ساخت فرم",
        },
        {
          type: "p",
          text: "فرم با عنصر form ساخته می‌شود. داخل آن، ورودی‌ها مثل input و textarea قرار می‌گیرند. برای هر ورودی، label مناسب بنویسید.",
        },
        {
          type: "example",
          title: "فرم ساده",
          code: "<form action=\"/register\" method=\"post\">\n  <label for=\"name\">نام</label>\n  <input type=\"text\" id=\"name\" name=\"name\" required>\n\n  <label for=\"email\">ایمیل</label>\n  <input type=\"email\" id=\"email\" name=\"email\" required>\n\n  <button type=\"submit\">عضویت</button>\n</form>",
          desc: "for روی label باید برابر با id مربوطه باشد.",
        },
        {
          type: "note",
          text: "ویژگی name مهم است؛ بدون آن، سرور نمی‌داند هر مقدار متعلق به چه فیلدی است.",
        },
        {
          type: "mistake",
          text: "برای جمع‌آوری اطلاعات مهم، حتماً اعتبارسنجی سمت سرور انجام دهید و فقط به اعتبارسنجی مرورگر تکیه نکنید.",
        },
      ],
      exercise: {
        title: "تمرین: فرم ثبت‌نام",
        prompt:
          "فرمی برای نام، ایمیل و دکمهٔ ارسال بسازید و labelها را با for متصل کنید.",
        starterCode: "<!DOCTYPE html>\n<html lang=\"fa\">\n  <head>\n    <meta charset=\"UTF-8\">\n    <title>فرم</title>\n  </head>\n  <body>\n    <form>\n      <!-- فیلدهای فرم را اضافه کنید -->\n    </form>\n  </body>\n</html>",
      },
    },
    {
      id: "html-form-elements",
      slug: "html-form-elements",
      section: "forms",
      number: 26,
      title: "عنصرهای فرم",
      description:
        "input، select، textarea و دکمه‌ها را با هم در یک فرم کاربردی به کار ببرید.",
      difficulty: "intermediate",
      timeMinutes: 12,
      objectives: [
        "input، select و textarea را بشناسید.",
        "جاوااسکریپت لازم نیست؛ با HTML این‌ها ساخته می‌شوند.",
        "دکمهٔ ارسال و ریست را تمیز کنید.",
      ],
      content: [
        {
          type: "h2",
          text: "ورودی‌های متنوع",
        },
        {
          type: "p",
          text: "فرم‌های واقعی معمولاً ترکیبی از فیلدهای متنی، انتخابگر و ناحیهٔ متن طولانی هستند.",
        },
        {
          type: "example",
          title: "فرم تماس",
          code: "<form action=\"/contact\" method=\"post\">\n  <label for=\"topic\">موضوع</label>\n  <select id=\"topic\" name=\"topic\">\n    <option value=\"html\">HTML</option>\n    <option value=\"css\">CSS</option>\n  </select>\n\n  <label for=\"message\">پیام</label>\n  <textarea id=\"message\" name=\"message\" rows=\"5\" required></textarea>\n\n  <button type=\"submit\">ارسال</button>\n</form>",
          desc: "select برای گزینه‌های محدود و textarea برای متن طولانی است.",
        },
        {
          type: "note",
          text: "برای ورودی‌های چندگزینه‌ای از radio یا checkbox با همان name اما مقادیر متفاوت استفاده کنید.",
        },
      ],
      exercise: {
        title: "تمرین: فرم تماس",
        prompt:
          "فرمی برای موضوع، پیام و یک ناحیهٔ متن بسازید.",
        starterCode: "<!DOCTYPE html>\n<html lang=\"fa\">\n  <head>\n    <meta charset=\"UTF-8\">\n    <title>عنصرهای فرم</title>\n  </head>\n  <body>\n    <!-- فرم تماس خود را بسازید -->\n  </body>\n</html>",
      },
    },
    {
      id: "html-input-types",
      slug: "html-input-types",
      section: "forms",
      number: 27,
      title: "انواع ورودی",
      description:
        "text، email، password، number، date و سایر نوع‌های input را بشناسید.",
      difficulty: "intermediate",
      timeMinutes: 13,
      objectives: [
        "نوع‌های رایج input را بشناسید.",
        "ورودی مناسب را برای هر داده انتخاب کنید.",
        "تفاوت type را در مرورگر ببینید.",
      ],
      content: [
        {
          type: "h2",
          text: "نوع‌های پرکاربرد",
        },
        {
          type: "p",
          text: "ویژگی type تغییر اساسی در رفتار ورودی ایجاد می‌کند؛ مثلاً type=\"email\" صفحه‌کلید مناسب یا تأیید فرمت ایمیل را به صورت پیش‌فرض فعال می‌کند.",
        },
        {
          type: "example",
          title: "انواع input",
          code: "<input type=\"text\" placeholder=\"نام\">\n<input type=\"email\" placeholder=\"ایمیل\">\n<input type=\"password\" placeholder=\"رمز\">\n<input type=\"number\" min=\"1\" max=\"10\">\n<input type=\"date\">\n<input type=\"checkbox\" id=\"news\">\n<label for=\"news\">خبرنامه</label>",
          desc: "هر نوع اعتبارسنجی و رفتار متفاوتی در مرورگر دارد.",
        },
        {
          type: "note",
          text: "تأیید فرمت مرورگر جایگزین تأیید سمت سرور نیست؛ همچنان داده را در سرور بررسی کنید.",
        },
      ],
      exercise: {
        title: "تمرین: انواع ورودی",
        prompt:
          "فرمی با ورودی نام، ایمیل، رمز، عدد و چک‌باکس بسازید.",
        starterCode: "<!DOCTYPE html>\n<html lang=\"fa\">\n  <head>\n    <meta charset=\"UTF-8\">\n    <title>انواع ورودی</title>\n  </head>\n  <body>\n    <!-- انواع ورودی را اضافه کنید -->\n  </body>\n</html>",
      },
    },
    {
      id: "html-input-attributes",
      slug: "html-input-attributes",
      section: "forms",
      number: 28,
      title: "ویژگی‌های ورودی",
      description:
        "required، placeholder، pattern، min/max، autocomplete و disabled را مدیریت کنید.",
      difficulty: "intermediate",
      timeMinutes: 12,
      objectives: [
        "از required برای فیلدهای اجباری استفاده کنید.",
        "placeholder را به عنوان راهنمای محتوا ببینید.",
        "pattern و min/max را برای قالب فیلد به کار ببرید.",
      ],
      content: [
        {
          type: "h2",
          text: "کنترل ورودی",
        },
        {
          type: "p",
          text: "ویژگی‌های ورودی تجربهٔ کاربری را بهتر و دادهٔ ورودی را قابل‌پیش‌بینی‌تر می‌کنند. بعضی از این ویژگی‌ها در مرورگر به صورت پیش‌فرض بررسی می‌شوند.",
        },
        {
          type: "example",
          title: "ویژگی‌های ورودی",
          code: "<input\n  type=\"text\"\n  name=\"code\"\n  required\n  placeholder=\"مثلاً HT-123\"\n  pattern=\"[A-Za-z]{2}-[0-9]{3}\"\n  autocomplete=\"off\">\n\n<input type=\"number\" min=\"1\" max=\"100\" value=\"1\">\n<input type=\"text\" disabled value=\"غیرفعال\">",
          desc: "pattern یک الگوی سادهٔ regex را برای ورودی مشخص می‌کند.",
        },
        {
          type: "note",
          text: "required را با احتیاط به کار ببرید؛ برای فیلدهایی که واقعاً لازم‌اند.",
        },
      ],
      exercise: {
        title: "تمرین: ویژگی ورودی",
        prompt:
          "فیلدی برای کد دوره بسازید که required با placeholder و pattern مشخص کند کد باید حروف و عدد داشته باشد.",
        starterCode: "<!DOCTYPE html>\n<html lang=\"fa\">\n  <head>\n    <meta charset=\"UTF-8\">\n    <title>ویژگی‌های ورودی</title>\n  </head>\n  <body>\n    <!-- فیلد کد دوره -->\n  </body>\n</html>",
      },
    },
    {
      id: "html-buttons",
      slug: "html-buttons",
      section: "forms",
      number: 29,
      title: "دکمه‌ها",
      description:
        "دکمه‌های ارسال، ریست و دکمهٔ سفارشی را در فرم به درستی به کار ببرید.",
      difficulty: "intermediate",
      timeMinutes: 8,
      objectives: [
        "دکمهٔ submit و reset را بشناسید.",
        "دکمهٔ سفارشی با type=\"button\" بسازید.",
        "دکمهٔ داخل فرم و خارج فرم را تفکیک کنید.",
      ],
      content: [
        {
          type: "h2",
          text: "دکمهٔ درست برای هر کار",
        },
        {
          type: "p",
          text: "دکمهٔ ارسال فرم باید type=\"submit\" باشد. دکمهٔ ریست فقط در موارد خاص استفاده می‌شود و دکمه‌های سفارشی که با جاوااسکریپت کار می‌کنند باید type=\"button\" باشند.",
        },
        {
          type: "example",
          title: "دکمه‌ها در فرم",
          code: "<form>\n  <label for=\"city\">شهر</label>\n  <input type=\"text\" id=\"city\" name=\"city\">\n  <button type=\"submit\">ارسال</button>\n  <button type=\"reset\">پاک‌سازی</button>\n</form>\n<button type=\"button\" onclick=\"alert('سلام')\">دکمهٔ سفارشی</button>",
          desc: "استفاده از onclick فقط برای مثال ساده است؛ در کار واقعی از جاوااسکریپت جدا استفاده کنید.",
        },
        {
          type: "note",
          text: "برای اهداف تزئینی یا اکشن با جاوااسکریپت، حتماً type=\"button\" بگذارید تا فرم به اشتباه ارسال نشود.",
        },
      ],
      exercise: {
        title: "تمرین: دکمه",
        prompt:
          "فرمی با دکمهٔ ارسال و دکمهٔ ریست و یک دکمهٔ خارج از فرم با نوع button بسازید.",
        starterCode: "<!DOCTYPE html>\n<html lang=\"fa\">\n  <head>\n    <meta charset=\"UTF-8\">\n    <title>دکمه</title>\n  </head>\n  <body>\n    <!-- فرم و دکمه‌ها -->\n  </body>\n</html>",
      },
    },
    {
      id: "html-accessibility",
      slug: "html-accessibility",
      section: "professional",
      number: 30,
      title: "دسترس‌پذیری",
      description:
        "HTML را طوری بنویسید که همهٔ کاربران، از جمله کاربران صفحه‌خوان، آن را درک کنند.",
      difficulty: "advanced",
      timeMinutes: 13,
      objectives: [
        "سلسله‌مراتب عنوان و لندینگ‌محور را رعایت کنید.",
        "alt، label و aria را به کار ببرید.",
        "کنتراست و هدف کلیک را بررسی کنید.",
      ],
      content: [
        {
          type: "h2",
          text: "وب برای همه",
        },
        {
          type: "p",
          text: "دسترس‌پذیری یعنی محتوا برای بیش‌ترین تعداد کاربر، از جمله کاربرانی که با صفحه‌خوان یا صفحه‌کلید کار می‌کنند، قابل استفاده باشد.",
        },
        {
          type: "example",
          title: "نمونهٔ دسترس‌پذیر",
          code: "<h1>ساختار</h1>\n<p>برای <strong>تاکید</strong> از عنصر معنایی استفاده کنید.</p>\n<label for=\"email\">ایمیل</label>\n<input id=\"email\" type=\"email\" name=\"email\">\n<img src=\"gallery.jpg\" alt=\"گالری کارهای هنری\">",
          desc: "label و alt اطلاعات موردنیاز صفحه‌خوان را تأمین می‌کنند.",
        },
        {
          type: "list",
          items: [
            "همهٔ تصاویر با معنا alt مناسب داشته باشند.",
            "همهٔ ورودی‌ها label داشته باشند.",
            "سلسله‌مراتب عنوان‌ها درست باشد.",
            "هدف لینک و دکمه واضح باشد.",
          ],
        },
        {
          type: "note",
          text: "aria را فقط وقتی استفاده کنید که عنصر HTML معادل ندارد؛ در غیر این صورت HTML ساده بهتر است.",
        },
      ],
      exercise: {
        title: "تمرین: دسترس‌پذیری",
        prompt:
          "فرمی با label و یک تصویر با alt بسازید و یک h1 برای ساختار اصلی قرار دهید.",
        starterCode: "<!DOCTYPE html>\n<html lang=\"fa\">\n  <head>\n    <meta charset=\"UTF-8\">\n    <title>دسترس‌پذیری</title>\n  </head>\n  <body>\n    <h1>بخش دسترس‌پذیر</h1>\n    <!-- فرم و تصویر دسترس‌پذیر -->\n  </body>\n</html>",
      },
    },
    {
      id: "html-best-practices",
      slug: "html-best-practices",
      section: "professional",
      number: 31,
      title: "بهترین روش‌ها",
      description:
        "نکاتی برای نوشتن HTML تمیز، سئوپسند و قابل نگه‌داری.",
      difficulty: "advanced",
      timeMinutes: 14,
      objectives: [
        "کد HTML تمیز و معنایی بنویسید.",
        "از ساختار تکراری و divهی بدون معنی پرهیز کنید.",
        "سئو، سرعت و نگه‌داری را در نظر بگیرید.",
      ],
      content: [
        {
          type: "h2",
          text: "کد تمیز",
        },
        {
          type: "p",
          text: "HTML خوب، معنایی و خوانا است. نام کلاس‌ها و idها را توصیفی بنویسید و اندازهٔ عناصر را به CSS بسپارید.",
        },
        {
          type: "example",
          title: "ساختار تمیز",
          code: "<!DOCTYPE html>\n<html lang=\"fa\">\n<head>\n  <meta charset=\"UTF-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n  <title>بهترین روش‌ها</title>\n</head>\n<body>\n  <header>\n    <h1>وب‌آموز</h1>\n  </header>\n  <main>\n    <article>\n      <h2>درس قالب‌بندی</h2>\n      <p>استفاده از عنصرهای معنایی را تمرین کنید.</p>\n    </article>\n  </main>\n</body>\n</html>",
          desc: "این ساختار ساده، خوانا و قابل توسعه است.",
        },
        {
          type: "list",
          items: [
            "دکتر زبان را در html با lang=\"fa\" مشخص کنید.",
            "از یک h1 در هر صفحه استفاده کنید.",
            "به تصویرها alt و به فیلدها label بدهید.",
            "استایل را در فایل CSS جدا بگذارید.",
            "فایل‌ها را با نام‌گذاری منظم سازمان‌دهی کنید.",
          ],
        },
        {
          type: "mistake",
          text: "کدهای تکراری را کپی‌نکنید؛ به جای آن از کلاس‌ها و قالب‌های مشترک استفاده کنید.",
        },
      ],
      exercise: {
        title: "تمرین: صفحهٔ تمیز",
        prompt:
          "یک صفحهٔ کامل با head معنایی، header، main، article، دو تصویر با alt و یک فرم با label بسازید.",
        starterCode: "<!DOCTYPE html>\n<html lang=\"fa\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>بهترین روش‌ها</title>\n</head>\n<body>\n  <!-- صفحهٔ تمیز و معنایی خود را بسازید -->\n</body>\n</html>",
      },
    },
  ];

  /* ---------------------------------------------------------------
     CSS curriculum
     --------------------------------------------------------------- */
  const cssSections = [
    { id: "foundations", title: "پایه‌های CSS" },
    { id: "visuals", title: "رنگ، متن و ظاهر" },
    { id: "box-model", title: "مدل جعبه" },
    { id: "layout", title: "چیدمان" },
    { id: "selectors", title: "انتخاب‌گرها و تعامل" },
    { id: "components", title: "اجزای رابط" },
    { id: "responsive", title: "واکنش‌گرا" },
    { id: "motion", title: "حرکت و کیفیت کد" },
  ];

  const cssTopicData = [
    ["introduction", "مقدمه‌ای بر CSS", "با نقش CSS در ظاهر و چیدمان صفحه آشنا شوید.", "foundations", "foundations", "CSS ظاهر صفحه را از ساختار HTML جدا می‌کند و تغییرات هماهنگ را ساده‌تر می‌سازد.", "h1 { color: #0f766e; }", "یک عنوان سبز و خوانا ظاهر می‌شود.", "CSS جای HTML را نمی‌گیرد؛ هرکدام مسئولیت جداگانه‌ای دارند.", "نوشتن styleهای تکراری در هر عنصر، نگهداری را دشوار می‌کند."],
    ["how-css-works", "CSS چگونه کار می‌کند؟", "رابطهٔ قانون، انتخاب‌گر و آبشار را درک کنید.", "foundations", "foundations", "مرورگر قوانین CSS را پیدا می‌کند، اولویت آن‌ها را می‌سنجد و سپس مقدار نهایی را به عنصر می‌دهد.", "p { color: #334155; }", "پاراگراف با رنگ تعیین‌شده نمایش داده می‌شود.", "ترتیب، ویژگی و specificity در نتیجه اثر دارند.", "هر قانون دیرتر را همیشه برنده فرض نکنید؛ specificity هم مهم است."],
    ["syntax", "سینتکس CSS", "قالب انتخاب‌گر، ویژگی و مقدار را بنویسید.", "foundations", "foundations", "هر declaration یک ویژگی و مقدار دارد و با نقطه‌ویرگول از declaration بعدی جدا می‌شود.", ".card { padding: 1rem; border-radius: .5rem; }", "کارت فاصلهٔ داخلی و گوشه‌های گرد پیدا می‌کند.", "برای خوانایی، هر ویژگی را در خط جدا بنویسید.", "جا انداختن آکولاد یا نقطه‌ویرگول، عیب‌یابی را سخت می‌کند."],
    ["selectors", "انتخاب‌گرهای CSS", "عنصرهای هدف را با انتخاب‌گرهای مناسب پیدا کنید.", "foundations", "foundations", "انتخاب‌گر تعیین می‌کند قانون روی کدام عنصرها اعمال شود؛ از انتخاب‌گر عنصر، کلاس و id با دقت استفاده کنید.", ".notice { color: #b45309; }", "متن عنصر notice نارنجی می‌شود.", "کلاس برای الگوهای قابل استفادهٔ مجدد مناسب است.", "استفادهٔ افراطی از id انعطاف‌پذیری را کم می‌کند."],
    ["comments", "نظرها در CSS", "کد را با commentهای مفید مستندسازی کنید.", "foundations", "foundations", "نظر CSS بین /* و */ نوشته می‌شود و مرورگر آن را نمایش نمی‌دهد.", "/* رنگ برند */\n.brand { color: #0f766e; }", "فقط رنگ برند دیده می‌شود و متن نظر نه.", "نظر باید دلیل تصمیم را توضیح دهد، نه چیزی بدیهی را تکرار کند.", "از // استفاده نکنید؛ این نشانه در CSS معمولی معتبر نیست."],
    ["colors", "رنگ‌ها", "رنگ متن و پس‌زمینه را با روش‌های رایج تنظیم کنید.", "foundations", "visuals", "نام رنگ، HEX، RGB و HSL راه‌هایی برای بیان رنگ‌اند؛ کنتراست را همیشه با توجه به خوانایی انتخاب کنید.", ".hero { color: #ffffff; background-color: #0f766e; }", "متن سفید روی پس‌زمینهٔ سبز خوانده می‌شود.", "رنگ فقط تزئین نیست و روی دسترس‌پذیری اثر دارد.", "رنگ‌های کم‌کنتراست را برای متن اصلی انتخاب نکنید."],
    ["backgrounds", "پس‌زمینه‌ها", "پس‌زمینهٔ رنگی و تصویری را کنترل کنید.", "foundations", "visuals", "background-color و background-image سطح پشت محتوا را می‌سازند؛ با position و size جای تصویر را کنترل کنید.", ".banner { background: #d7f0ee; padding: 2rem; }", "یک نوار سبز کم‌رنگ با فاصلهٔ مناسب دیده می‌شود.", "پس‌زمینه نباید متن را از بین ببرد.", "تصویر بزرگ را بدون background-size رها نکنید."],
    ["borders", "حاشیه‌ها", "خط دور عنصر و گوشه‌های آن را بسازید.", "foundations", "visuals", "border ضخامت، نوع و رنگ دارد و border-radius گوشه‌ها را نرم می‌کند.", ".card { border: 1px solid #dfe5ed; border-radius: .75rem; }", "کارت حاشیه‌ای ظریف و گوشه‌های گرد دارد.", "حاشیهٔ ظریف برای جداکردن بخش‌ها کافی است.", "border را با outline اشتباه نگیرید؛ border در اندازهٔ جعبه اثر می‌گذارد."],
    ["margins", "فاصلهٔ بیرونی", "فاصلهٔ بین عنصر و همسایه‌اش را تنظیم کنید.", "foundations", "box-model", "margin فضای بیرون جعبه است و می‌تواند برای یک یا چند جهت مقدار بگیرد.", ".section { margin-block: 2rem; }", "بخش از بالا و پایین فاصله می‌گیرد.", "ویژگی‌های منطقی مثل margin-block در RTL و LTR بهتر کار می‌کنند.", "برای ایجاد فضای داخل عنصر از margin به جای padding استفاده نکنید."],
    ["padding", "فاصلهٔ داخلی", "فضای بین محتوا و لبهٔ جعبه را تنظیم کنید.", "foundations", "box-model", "padding فضای درون جعبه است و پس‌زمینهٔ عنصر آن را می‌پوشاند.", ".button { padding: .6rem 1rem; }", "دکمهٔ قابل لمس‌تری با فضای داخلی مناسب ساخته می‌شود.", "padding برای افزایش سطح قابل کلیک هم مفید است.", "padding زیاد می‌تواند ارتفاع کارت را غیرضروری کند."],
    ["height-width", "ارتفاع و عرض", "اندازهٔ عنصر را با محدودیت‌های ایمن کنترل کنید.", "foundations", "box-model", "width و height اندازهٔ پایه را تعیین می‌کنند؛ max-width و min-height برای جلوگیری از شکست محتوا کمک می‌کنند.", ".avatar { width: 4rem; height: 4rem; }", "جعبه‌ای با اندازهٔ چهار rem ساخته می‌شود.", "برای صفحه‌های مختلف، محدودیت‌ها از اندازهٔ ثابت بهترند.", "عرض ثابت بزرگ روی موبایل باعث اسکرول افقی می‌شود."],
    ["box-model", "مدل جعبه", "content، padding، border و margin را کنار هم ببینید.", "foundations", "box-model", "هر عنصر CSS مانند جعبه‌ای از محتوا، فاصلهٔ داخلی، حاشیه و فاصلهٔ بیرونی است.", "* { box-sizing: border-box; }", "عرض اعلام‌شده شامل padding و border هم می‌شود.", "border-box محاسبهٔ اندازه‌ها را قابل پیش‌بینی می‌کند.", "فراموش‌کردن box-sizing در فرم‌ها اندازه‌ها را ناهماهنگ می‌کند."],
    ["outline", "خط بیرونی", "outline را برای تأکید بدون تغییر اندازه به کار ببرید.", "foundations", "visuals", "outline بیرون border رسم می‌شود و فضای چیدمان مصرف نمی‌کند؛ برای focus قابل مشاهده مناسب است.", ":focus-visible { outline: 3px solid #fbbf24; }", "عنصر فوکوس‌شده با حلقه‌ای روشن مشخص می‌شود.", "هرگز focus را بدون جایگزین قابل مشاهده حذف نکنید.", "outline: none بدون ساخت focus جایگزین، دسترسی با صفحه‌کلید را خراب می‌کند."],
    ["text", "متن", "تراز، فاصله و تزئین متن را تنظیم کنید.", "foundations", "visuals", "ویژگی‌های text-align، line-height، letter-spacing و text-decoration خوانایی را شکل می‌دهند.", "p { line-height: 1.8; text-align: start; }", "پاراگراف با فاصلهٔ خطوط راحت خوانده می‌شود.", "line-height مناسب از اندازهٔ فونت مهم‌تر از تزئینات زیاد است.", "برای ترازکردن متن از فاصله‌های دستی استفاده نکنید."],
    ["fonts", "فونت‌ها", "خانواده، اندازه و وزن فونت را انتخاب کنید.", "foundations", "visuals", "font-family، font-size و font-weight ظاهر نوشتار را تعیین می‌کنند؛ fallback مناسب برای زمان نبودن فونت لازم است.", "body { font-family: Vazirmatn, sans-serif; }", "متن با فونت فارسی مناسب نمایش داده می‌شود.", "اندازهٔ متن را با واحدهای انعطاف‌پذیر انتخاب کنید.", "فونت تزئینی کم‌خوانا را برای متن طولانی به کار نبرید."],
    ["icons", "آیکن‌ها", "آیکن را در رابط به شکل معنادار استفاده کنید.", "foundations", "visuals", "آیکن می‌تواند SVG یا فونت آیکن باشد؛ کنار آیکن صرفاً تصویری، نام یا برچسب دسترس‌پذیر قرار دهید.", ".icon { width: 1.25rem; height: 1.25rem; }", "آیکن در اندازه‌ای ثابت کنار متن قرار می‌گیرد.", "SVG کنترل رنگ و اندازهٔ خوبی دارد.", "آیکن بدون label را تنها راه انتقال معنی نکنید."],
    ["links", "لینک‌ها", "حالت‌های مختلف لینک را خوانا طراحی کنید.", "foundations", "visuals", "رنگ، underline و حالت focus باید لینک را از متن عادی جدا کنند.", "a:hover { text-decoration: underline; }", "با رفتن نشانگر، لینک واضح‌تر می‌شود.", "underline برای خوانایی در متن پیوسته مفید است.", "فقط با تغییر رنگ، وضعیت لینک را مشخص نکنید."],
    ["lists", "فهرست‌ها", "فهرست‌های مرتب و نامرتب را استایل بدهید.", "foundations", "visuals", "list-style و padding-inline-start ظاهر marker و فاصلهٔ فهرست را کنترل می‌کنند.", "ul { list-style: square; padding-inline-start: 1.5rem; }", "نشانگر مربع و تورفتگی منطقی دیده می‌شود.", "ساختار معنایی فهرست را با div تقلید نکنید.", "با حذف marker، نشانهٔ ساختاری را بدون جایگزین از بین نبرید."],
    ["tables", "جدول‌ها", "جدول خوانا و قابل اسکن بسازید.", "foundations", "visuals", "border-collapse، padding و تراز متن برای جدول ضروری‌اند؛ سرستون را با th مشخص کنید.", "table { border-collapse: collapse; }\nth, td { padding: .6rem; }", "سلول‌ها بدون فاصلهٔ دوگانه و با فضای مناسب دیده می‌شوند.", "جدول برای دادهٔ جدولی است، نه چیدمان کل صفحه.", "رنگ تنها تفاوت ردیف‌ها نباشد."],
    ["display", "نمایش عنصر", "display و اثر آن بر جریان صفحه را بشناسید.", "foundations", "layout", "block، inline و none رفتار متفاوتی در جریان دارند؛ inline اندازهٔ عمودی را مانند block نمی‌پذیرد.", ".badge { display: inline-block; padding: .25rem .5rem; }", "نشان در کنار متن می‌ماند و padding می‌گیرد.", "display را بر اساس رفتار موردنیاز انتخاب کنید.", "display:none محتوای تعاملی را از دسترس خارج می‌کند."],
    ["position", "موقعیت‌دهی", "عنصر را نسبت به مرجع درست جابه‌جا کنید.", "foundations", "layout", "relative مرجع فرزند absolute می‌سازد و fixed یا sticky به viewport یا اسکرول وابسته‌اند.", ".tooltip { position: absolute; inset-block-start: 100%; }", "راهنما زیر عنصر مرجع قرار می‌گیرد.", "والد position: relative مرجع را روشن می‌کند.", "absolute را برای چیدمان اصلی صفحه استفاده نکنید."],
    ["z-index", "ترتیب لایه‌ها", "هم‌پوشانی عنصرها را کنترل کنید.", "foundations", "layout", "z-index در یک stacking context ترتیب لایه‌ها را تعیین می‌کند و معمولاً همراه position معنا پیدا می‌کند.", ".menu { position: relative; z-index: 2; }", "منو روی محتوای اطراف قرار می‌گیرد.", "مقادیر کوچک و منظم بهتر از z-indexهای تصادفی‌اند.", "z-index بزرگ همیشه از stacking context والد عبور نمی‌کند."],
    ["overflow", "سرریز محتوا", "محتوای بزرگ‌تر از جعبه را مدیریت کنید.", "foundations", "layout", "overflow: auto اسکرول لازم را فراهم می‌کند و hidden بخشی از محتوا را پنهان می‌سازد.", ".code { overflow-x: auto; }", "کد عریض بدون شکستن صفحه اسکرول می‌شود.", "برای محتوای قابل کپی، بریدن بی‌دلیل مناسب نیست.", "overflow:hidden را بدون بررسی focus و محتوا به کار نبرید."],
    ["float", "شناورسازی", "کاربرد محدود float را درک کنید.", "intermediate", "layout", "float عنصر را به یک سمت می‌راند و متن را کنار آن جاری می‌کند؛ برای چیدمان مدرن معمولاً Flexbox یا Grid بهتر است.", ".thumb { float: inline-start; margin-inline-end: 1rem; }", "متن کنار تصویر شناور جاری می‌شود.", "پس از float باید اثر جریان را مدیریت کنید.", "floatهای قدیمی را با چیدمان پیچیده و بدون clear ترکیب نکنید."],
    ["inline-block", "نمایش inline-block", "چند عنصر کنارهم با اندازهٔ قابل کنترل بسازید.", "basic", "layout", "inline-block اجازهٔ قرارگرفتن در خط و پذیرش width و height را هم‌زمان می‌دهد.", ".tag { display: inline-block; margin: .25rem; }", "برچسب‌ها کنار هم و با فاصله دیده می‌شوند.", "برای فاصلهٔ دقیق چند عنصر، flex معمولاً انتخاب بهتری است.", "فاصلهٔ whitespace در HTML می‌تواند بین inline-blockها فاصله ایجاد کند."],
    ["align", "تراز کردن", "عنصرها را با روش‌های قابل اتکا تراز کنید.", "basic", "layout", "برای تراز افقی و عمودی، ابتدا مدل layout را انتخاب کنید؛ در Flexbox، align-items و justify-content ابزارهای اصلی‌اند.", ".row { display: flex; align-items: center; }", "محتوا در محور عمودی ردیف هم‌تراز می‌شود.", "تراز منطقی را با direction و writing mode هماهنگ کنید.", "با marginهای تصادفی تراز عمودی را شبیه‌سازی نکنید."],
    ["combinators", "ترکیب‌گرها", "رابطهٔ والد، فرزند و همسایه را انتخاب کنید.", "intermediate", "selectors", "ترکیب‌گرهای descendant، child، adjacent و sibling دامنهٔ قانون را دقیق‌تر می‌کنند.", ".card > p { margin-block-start: 0; }", "فقط پاراگراف مستقیم کارت تغییر می‌کند.", "انتخاب‌گر دقیق از کلاس‌های اضافی کم می‌کند.", "انتخاب‌گرهای بیش‌ازحد عمیق شکننده‌اند."],
    ["pseudo-classes", "شبه‌کلاس‌ها", "به وضعیت عنصرها مانند hover و focus پاسخ دهید.", "intermediate", "selectors", "شبه‌کلاس وضعیت یا موقعیت عنصر را هدف می‌گیرد و بدون افزودن class دستی تعامل ظاهری می‌سازد.", "button:hover { background: #d7f0ee; }", "پس‌زمینهٔ دکمه هنگام hover تغییر می‌کند.", "focus-visible برای صفحه‌کلید اهمیت ویژه دارد.", "hover را تنها روش فهم وضعیت کنترل نکنید."],
    ["pseudo-elements", "شبه‌عنصرها", "بخش مجازی قبل و بعد محتوا را استایل دهید.", "intermediate", "selectors", "::before و ::after برای تزئین یا نشانگر مناسب‌اند؛ محتوای ضروری را در آن‌ها پنهان نکنید.", ".required::after { content: \" *\"; color: #b91c1c; }", "ستارهٔ کنار برچسب ظاهر می‌شود.", "content برای ::before و ::after لازم است.", "متن مهم فرم را فقط در content قرار ندهید."],
    ["opacity", "شفافیت", "شفافیت را بدون آسیب به خوانایی کنترل کنید.", "basic", "components", "opacity کل عنصر و فرزندانش را شفاف می‌کند؛ برای رنگ پس‌زمینهٔ جداگانه از rgba یا رنگ مدرن استفاده کنید.", ".muted { opacity: .72; }", "عنصر کم‌رنگ‌تر اما همچنان قابل مشاهده است.", "متن کم‌رنگ باید حداقل کنتراست لازم را حفظ کند.", "opacity صفر عنصر را نامرئی می‌کند اما لزوماً از layout حذف نمی‌کند."],
    ["navigation-bars", "نوارهای ناوبری", "یک ناوبری ساده و قابل استفاده بسازید.", "basic", "components", "ناوبری مجموعه‌ای از لینک‌هاست؛ با flex، gap و حالت active آن را خوانا و قابل تشخیص کنید.", ".nav { display: flex; gap: 1rem; }", "لینک‌ها در یک ردیف با فاصله قرار می‌گیرند.", "active و focus باید واضح باشند.", "ناوبری افقی را بدون فکر برای صفحهٔ باریک ثابت نکنید."],
    ["dropdowns", "منوهای بازشونده", "ساختار ظاهری dropdown را با position درک کنید.", "intermediate", "components", "منوی بازشونده معمولاً والد relative و فهرست absolute دارد؛ رفتار بازشدن واقعی به HTML و JavaScript دسترس‌پذیر نیاز دارد.", ".dropdown-menu { position: absolute; inset-block-start: 100%; }", "فهرست زیر کنترل قرار می‌گیرد.", "کنترل باز و بسته‌شدن باید با صفحه‌کلید هم کار کند.", "dropdown صرفاً با hover روی موبایل قابل اتکا نیست."],
    ["images", "تصویرها", "تصویر را واکنش‌گرا و متناسب نمایش دهید.", "basic", "components", "max-width:100% از بیرون‌زدن تصویر جلوگیری می‌کند و object-fit نحوهٔ پرکردن قاب را مشخص می‌سازد.", "img { max-width: 100%; height: auto; }", "تصویر در عرض والد جا می‌شود و نسبتش حفظ می‌گردد.", "alt در HTML برای معنی و دسترس‌پذیری است، نه CSS.", "کشیدن تصویر با width و height ناسازگار کیفیت را کم می‌کند."],
    ["forms", "فرم‌ها", "کنترل‌های فرم را منظم و قابل خواندن استایل دهید.", "basic", "components", "فرم خوب label، فاصلهٔ یکنواخت، focus واضح و اندازهٔ مناسب کنترل‌ها دارد.", ".field { display: grid; gap: .4rem; }", "برچسب و ورودی با فاصلهٔ منظم زیر هم قرار می‌گیرند.", "حالت خطا را فقط با رنگ نشان ندهید.", "outline ورودی را بدون focus جایگزین حذف نکنید."],
    ["variables", "متغیرهای CSS", "مقادیر مشترک را با custom property مدیریت کنید.", "intermediate", "components", "متغیرها با -- تعریف و با var() مصرف می‌شوند و تغییر تم یا برند را سریع می‌کنند.", ":root { --brand: #0f766e; }\n.button { background: var(--brand); }", "دکمه رنگ متغیر برند را می‌گیرد.", "نام متغیر باید نقش آن را توضیح دهد، نه مقدارش را.", "برای متغیر بدون fallback، مقدار پیش‌فرض در نظر بگیرید."],
    ["flexbox", "Flexbox", "چیدمان یک‌بعدی را با Flexbox بسازید.", "intermediate", "layout", "Flexbox برای ردیف یا ستون و توزیع فضای محور اصلی و متقاطع ساخته شده است.", ".toolbar { display: flex; justify-content: space-between; gap: 1rem; }", "دو بخش نوار ابزار از هم فاصله می‌گیرند.", "gap از marginهای زنجیره‌ای قابل پیش‌بینی‌تر است.", "محور اصلی را بدون توجه به flex-direction اشتباه نگیرید."],
    ["grid", "CSS Grid", "چیدمان دوبعدی کارت‌ها را کنترل کنید.", "intermediate", "layout", "Grid ردیف و ستون را هم‌زمان مدیریت می‌کند و برای ساخت شبکه‌های منظم مناسب است.", ".cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; }", "سه ستون هم‌اندازه با فاصله ساخته می‌شود.", "minmax و auto-fit برای عرض‌های انعطاف‌پذیر مفیدند.", "سه ستون ثابت را بدون breakpoint روی موبایل رها نکنید."],
    ["responsive-design", "طراحی واکنش‌گرا", "صفحه‌ای سازگار با اندازه‌های گوناگون بسازید.", "intermediate", "responsive", "واکنش‌گرایی یعنی محتوا در فضای موجود خوانا و قابل استفاده بماند؛ از رویکرد mobile-first شروع کنید.", ".container { width: min(100% - 2rem, 70rem); margin-inline: auto; }", "محتوا در موبایل حاشیه دارد و در نمایشگر بزرگ محدود می‌شود.", "محتوا باید تصمیم‌گیرندهٔ breakpoint باشد.", "طراحی را فقط برای یک عرض مشخص آزمایش نکنید."],
    ["media-queries", "Media Queries", "قواعد را بر اساس ویژگی viewport تغییر دهید.", "intermediate", "responsive", "@media برای شرط‌هایی مانند min-width استفاده می‌شود و باید فقط تغییر لازم را در breakpoint تعریف کند.", "@media (min-width: 48rem) { .nav { display: flex; } }", "از عرض مشخصی به بعد ناوبری ردیفی می‌شود.", "breakpoint را بر اساس شکست محتوا انتخاب کنید.", "تعداد زیاد breakpoint نگهداری را دشوار می‌کند."],
    ["transitions", "گذارها", "تغییر حالت‌ها را نرم و کنترل‌شده کنید.", "intermediate", "motion", "transition زمان و روش تغییر property را تعیین می‌کند و برای hover یا focus مناسب است.", ".link { transition: color 150ms ease; }", "تغییر رنگ لینک نرم‌تر دیده می‌شود.", "فقط propertyهای لازم را transition دهید.", "transition طولانی حس کندی ایجاد می‌کند."],
    ["transforms", "تبدیل‌ها", "عنصر را بدون تغییر جریان جابه‌جا یا بچرخانید.", "intermediate", "motion", "transformهایی مانند translate و scale ظاهر عنصر را تغییر می‌دهند و معمولاً layout همسایه‌ها را جابه‌جا نمی‌کنند.", ".card:hover { transform: translateY(-2px); }", "کارت کمی به بالا می‌رود.", "transform را با transition ترکیب کنید.", "scale زیاد باعث هم‌پوشانی و مشکل خوانایی می‌شود."],
    ["animations", "انیمیشن‌ها", "حرکت چندمرحله‌ای را با keyframes تعریف کنید.", "intermediate", "motion", "@keyframes وضعیت‌های میانی را تعریف می‌کند و animation آن را به عنصر متصل می‌سازد.", "@keyframes pulse { from { opacity: .5; } to { opacity: 1; } }", "شفافیت عنصر به‌آرامی تغییر می‌کند.", "حرکت باید هدف رابط داشته باشد و کوتاه باشد.", "برای کاربرانی که reduced motion خواسته‌اند حرکت شدید نسازید."],
    ["filters", "فیلترها", "افکت‌های تصویری را با احتیاط اعمال کنید.", "intermediate", "motion", "filter مانند grayscale و brightness ظاهر تصویر را تغییر می‌دهد و روی عملکرد و خوانایی اثر دارد.", ".photo { filter: grayscale(1); }", "تصویر به خاکستری تبدیل می‌شود.", "افکت را برای معنی ضروری تصویر به کار نبرید.", "فیلترهای زنجیره‌ای سنگین می‌توانند تجربه را کند کنند."],
    ["best-practices", "بهترین روش‌های CSS", "کد CSS قابل نگهداری و قابل دسترس بنویسید.", "intermediate", "motion", "نام‌گذاری روشن، ترتیب لایه‌ها، متغیرها، ویژگی‌های منطقی و توجه به focus پایه‌های CSS حرفه‌ای‌اند.", ":root { --space: 1rem; }\n.stack { display: grid; gap: var(--space); }", "فاصلهٔ اجزای stack از یک منبع مشترک می‌آید.", "CSS را در اندازه‌های واقعی و با صفحه‌کلید بررسی کنید.", "راه‌حل سریع با specificity زیاد، بدهی فنی ایجاد می‌کند."]
  ];

  const cssLessons = cssTopicData.map((item, index) => {
    const [slug, title, description, difficulty, section, explanation, syntax, result, note, mistake] = item;
    const code = `<style>\nbody {\n  font-family: Arial, sans-serif;\n  padding: 1.5rem;\n  color: #172033;\n}\n\n${syntax}\n</style>\n\n<h1 class="demo">${escapeHtml(title)}</h1>\n<p>نتیجهٔ قابل مشاهدهٔ این تمرین</p>`;
    return {
      id: `css-${slug}`, slug: `css-${slug}`, section, number: index + 1, title,
      description, difficulty, timeMinutes: index < 12 ? 8 : 10,
      objectives: [`مفهوم «${title}» را با زبان ساده توضیح دهید.`, `یک قانون ${title} را در پروژهٔ کوچک خود به کار ببرید.`, "اثر تغییرات CSS را در پیش‌نمایش بررسی کنید."],
      content: [
        { type: "h2", text: `${title} چه کمکی می‌کند؟` }, { type: "p", text: explanation },
        { type: "syntax", title: `سینتکس ${title}`, code: syntax },
        { type: "example", title: `نمونهٔ عملی ${title}`, code, desc: result },
        { type: "note", text: note }, { type: "mistake", text: mistake }
      ],
      exercise: { title: `تمرین: ${title}`, prompt: `یک نمونهٔ کوچک بسازید که کاربرد «${title}» را نشان دهد و نتیجهٔ بصری آن را بررسی کنید.`, starterCode: `<div class="demo">نمونهٔ ${title}</div>\n\n<style>\n.demo {\n  /* قانون ${title} را اینجا بنویسید */\n}\n</style>` }
    };
  });

  /* ---------------------------------------------------------------
     Registry (Phase 03 will add the CSS course here)
     --------------------------------------------------------------- */
  const courses = {
    css: {
      id: "css", title: "دورهٔ آموزش CSS", shortTitle: "آموزش CSS", badge: "CSS",
      icon: '<path d="M4 4h16v16H4z"/><path d="M8 8h8M8 12h5M8 16h3"/>',
      description: "مسیر مرحله‌به‌مرحلهٔ یادگیری CSS از نخستین قانون تا چیدمان واکنش‌گرا و کدنویسی قابل نگهداری.",
      whatYouWillLearn: ["ساخت ظاهر خوانا و دسترس‌پذیر", "مدل جعبه، متن و رنگ", "Flexbox، Grid و طراحی واکنش‌گرا", "تعامل ظاهری و بهترین روش‌های CSS"],
      difficulty: "basic", levelLabel: "از مقدماتی تا متوسط", lessonCount: cssLessons.length, sections: cssSections, lessons: cssLessons,
      estimatedMinutes: cssLessons.reduce((sum, lesson) => sum + (lesson.timeMinutes || 0), 0),
    },
    html: {
      id: "html",
      title: "دورهٔ آموزش HTML",
      shortTitle: "آموزش HTML",
      badge: "HTML",
      icon: '<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>',
      description:
        "مسیر کامل یادگیری HTML از صفر؛ از ساخت پایه تا فرم، سمنتیک و دسترس‌پذیری.",
      whatYouWillLearn: [
        "ساختار و عناصر پایهٔ HTML",
        "متن، لینک، تصویر، جدول و فهرست",
        "فرم‌های واقعی و دسترس‌پذیر",
        "سمنتیک، سئو و بهترین روش‌ها",
      ],
      difficulty: "basic",
      levelLabel: "از مقدماتی تا متوسط",
      lessonCount: htmlLessons.length,
      sections: htmlSections,
    cssSections,
      lessons: htmlLessons,
      estimatedMinutes: htmlLessons.reduce((sum, lesson) => sum + (lesson.timeMinutes || 0), 0),
    },
  };

  const getCourse = (courseId) => courses[courseId] || null;

  const getCourseLessons = (courseId) => {
    const course = getCourse(courseId);
    return course ? course.lessons.slice() : [];
  };

  const getLesson = (courseId, slug) => {
    const course = getCourse(courseId);
    return course ? course.lessons.find((lesson) => lesson.slug === slug) : null;
  };

  const getPrevNext = (courseId, slug) => {
    const lessons = getCourseLessons(courseId);
    const index = lessons.findIndex((lesson) => lesson.slug === slug);
    if (index === -1) {
      return { prev: null, next: null };
    }
    return {
      prev: index > 0 ? lessons[index - 1] : null,
      next: index < lessons.length - 1 ? lessons[index + 1] : null,
    };
  };

  const lessonUrl = (slug, courseId = "html") => {
    const query = `lesson=${encodeURIComponent(slug)}`;
    return courseId === "html" ? `4-lesson.html?${query}` : `4-lesson.html?${query}&course=${encodeURIComponent(courseId)}`;
  };

  /* ---------------------------------------------------------------
     Render helpers
     --------------------------------------------------------------- */
  const highlightHtml = (source) => {
    const highlightTag = (tag) => {
      const match = tag.match(/^(<\/?)([A-Za-z][\w:-]*)([\s\S]*?)(\/?>)$/);
      if (!match) return escapeHtml(tag);
      const [, opener, name, attributes, closer] = match;
      let cursor = 0;
      let highlightedAttributes = "";
      const attributePattern = /([:\w-]+)(\s*=\s*)("[^"]*"|'[^']*'|[^\s]+)/g;
      let attributeMatch;
      while ((attributeMatch = attributePattern.exec(attributes))) {
        highlightedAttributes += escapeHtml(attributes.slice(cursor, attributeMatch.index));
        highlightedAttributes += `<span class="syntax-attribute">${escapeHtml(attributeMatch[1])}</span>`;
        highlightedAttributes += escapeHtml(attributeMatch[2]);
        highlightedAttributes += `<span class="syntax-value">${escapeHtml(attributeMatch[3])}</span>`;
        cursor = attributePattern.lastIndex;
      }
      highlightedAttributes += escapeHtml(attributes.slice(cursor));
      return `<span class="syntax-tag">${escapeHtml(opener)}${escapeHtml(name)}${highlightedAttributes}${escapeHtml(closer)}</span>`;
    };

    const tokenPattern = /<!--[\s\S]*?-->|<!DOCTYPE\s+[^>]*>|<\/?[A-Za-z][^>]*>/gi;
    let result = "";
    let cursor = 0;
    let token;
    while ((token = tokenPattern.exec(source))) {
      const text = source.slice(cursor, token.index);
      if (text) result += `<span class="syntax-text">${escapeHtml(text)}</span>`;
      const value = token[0];
      if (/^<!--/.test(value)) {
        result += `<span class="syntax-comment">${escapeHtml(value)}</span>`;
      } else if (/^<!DOCTYPE/i.test(value)) {
        result += `<span class="syntax-doctype">${escapeHtml(value)}</span>`;
      } else {
        result += highlightTag(value);
      }
      cursor = tokenPattern.lastIndex;
    }
    const remainder = source.slice(cursor);
    if (remainder) result += `<span class="syntax-text">${escapeHtml(remainder)}</span>`;
    return result;
  };

  const previewDocument = (source) => {
    const style = `<style>html,body{margin:0;padding:0;background:#fff;color:#172033;font-family:Arial,"Segoe UI",sans-serif}body{padding:1.25rem;line-height:1.7}h1,h2,h3{color:#0f172a;margin:0 0 .65rem}p{margin:0 0 .8rem;color:#334155}a{color:#075eaa}</style>`;
    return /<head[\s>]/i.test(source)
      ? source.replace(/<\/head>/i, `${style}</head>`)
      : `${style}${source}`;
  };

  const renderContentBlock = (block, index) => {
    switch (block.type) {
      case "h2":
        return `<h2>${escapeHtml(block.text)}</h2>`;
      case "h3":
        return `<h3>${escapeHtml(block.text)}</h3>`;
      case "p":
        return `<p>${escapeHtml(block.text)}</p>`;
      case "list":
        return `<ul>${block.items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`;
      case "note":
        return `<div class="alert alert-info" role="note">${icon.info}<span>${escapeHtml(block.text)}</span></div>`;
      case "tip":
        return `<div class="alert alert-success" role="note">${icon.success}<span>${escapeHtml(block.text)}</span></div>`;
      case "mistake":
        return `<div class="alert alert-danger" role="note">${icon.warning}<span>${escapeHtml(block.text)}</span></div>`;
      case "syntax":
        return `<div class="syntax-block" role="region" aria-label="${escapeAttr(block.title || "سینتکس")}">
          ${block.title ? `<div class="syntax-title">${escapeHtml(block.title)}</div>` : ""}
          <pre><code>${escapeHtml(block.code)}</code></pre>
        </div>`;
      case "example": {
        const id = `lesson-example-${index}`;
        const codeId = `${id}-code`;
        const previewId = `${id}-preview`;
        const code = highlightHtml(block.code);
        const copyText = escapeAttr(block.code);
        return `<div class="code-example" data-code-example>
          <div class="code-example-head">
            <div class="code-example-title">${icon.code}<span>${escapeHtml(block.title || "مثال")}</span></div>
            <div class="code-example-actions">
              <button class="code-tool" type="button" data-copy-target="#${codeId}" data-copy-text="${copyText}" aria-label="کپی کد">${icon.copy}<span data-copy-label>کپی</span></button>
              <button class="code-tool" type="button" data-run="#${previewId}" aria-label="اجرای نمونه">${icon.run}<span>اجرا</span></button>
            </div>
          </div>
          <div class="code-example-body">
            <div class="code-editor"><div class="code-editor__inner"><pre><code id="${codeId}">${code}</code></pre></div></div>
            <div class="code-preview">
              <div class="code-preview-bar">${icon.preview}<span>پیش‌نمایش</span></div>
              <iframe class="code-preview-frame" id="${previewId}" title="پیش‌نمایش ${escapeAttr(block.title || "مثال")}" tabindex="0"></iframe>
            </div>
          </div>
          ${block.desc ? `<div class="code-example-foot"><p>${escapeHtml(block.desc)}</p></div>` : ""}
        </div>`;
      }
      default:
        return "";
    }
  };

  const renderLessonContent = (lesson) =>
    lesson.content.map((block, index) => renderContentBlock(block, index)).join("");

  const renderCourseLessonCount = (course) => {
    const hours = Math.round((course.estimatedMinutes / 60) * 10) / 10;
    return {
      lessons: course.lessonCount,
      minutes: course.estimatedMinutes,
      hours: hours,
      difficulty: course.levelLabel,
    };
  };

  /* ---------------------------------------------------------------
     Course page
     --------------------------------------------------------------- */
  const renderCoursePage = (shell) => {
    const courseId = shell.getAttribute("data-course");
    const course = getCourse(courseId);
    if (!course) return;

    const overview = qs("[data-course-overview]", shell);
    if (overview) {
      const stats = renderCourseLessonCount(course);
      const objectives = course.whatYouWillLearn
        .map((item) => `<li class="objective">${escapeHtml(item)}</li>`)
        .join("");
      overview.innerHTML = `
        <div class="lesson-badges">
          <span class="badge badge-primary">${escapeHtml(course.badge)}</span>
          <span class="badge badge-info">${difficultyLabel(course.difficulty)}</span>
          <span class="badge badge-warning">${stats.lessons} درس</span>
        </div>
        <div class="course-intro">
          <h2 class="course-intro-title">با این دوره چه خواهید آموخت؟</h2>
          <p class="course-intro-text">${escapeHtml(course.description)}</p>
        </div>
        <div class="course-meta-grid">
          <div class="course-meta-card">
            <span class="course-meta-label">سطح</span>
            <strong>${escapeHtml(course.levelLabel)}</strong>
          </div>
          <div class="course-meta-card">
            <span class="course-meta-label">درس‌ها</span>
            <strong>${stats.lessons}</strong>
          </div>
          <div class="course-meta-card">
            <span class="course-meta-label">زمان تقریبی</span>
            <strong>${stats.hours} ساعت</strong>
          </div>
        </div>
        <div class="course-objectives">
          <h3 class="course-objectives-title">اهداف دوره</h3>
          <ul class="objectives-list">${objectives}</ul>
        </div>`;
    }

    const lessonsWrap = qs("[data-course-lessons]", shell);
    if (lessonsWrap) {
      lessonsWrap.innerHTML = course.sections
        .map((section) => {
          const sectionLessons = course.lessons.filter((lesson) => lesson.section === section.id);
          if (!sectionLessons.length) return "";
          const lessonCards = sectionLessons
            .map((lesson) => {
              const badges = `<span class="badge badge-primary">درس ${lesson.number}</span><span class="badge badge-info">${difficultyLabel(lesson.difficulty)}</span>`;
              return `<a class="card card-hover course-lesson-card" href="${lessonUrl(lesson.slug, courseId)}">
                <div class="card-body">
                  <div class="lesson-badges">${badges}</div>
                  <h3 class="card-title">${escapeHtml(lesson.title)}</h3>
                  <p class="card-text">${escapeHtml(lesson.description)}</p>
                </div>
                <div class="card-footer">
                  <span class="card-lesson-meta">${icon.clock} حدود ${lesson.timeMinutes} دقیقه</span>
                  <span class="btn btn-outline btn-sm">شروع درس</span>
                </div>
              </a>`;
            })
            .join("");
          return `<section class="course-section" aria-labelledby="course-section-${escapeAttr(section.id)}">
            <div class="course-section-head">
              <h3 id="course-section-${escapeAttr(section.id)}" class="course-section-title">${escapeHtml(section.title)}</h3>
              <span class="badge badge-primary">${sectionLessons.length} درس</span>
            </div>
            <div class="course-grid">${lessonCards}</div>
          </section>`;
        })
        .join("");
    }
  };

  /* ---------------------------------------------------------------
     Lesson sidebar
     --------------------------------------------------------------- */
  const renderLessonList = (courseId, currentLessonId) => {
    const list = qs("[data-lesson-nav-list]");
    if (!list) return;

    const course = getCourse(courseId);
    if (!course) {
      list.innerHTML = '<div class="muted">دوره‌ای یافت نشد.</div>';
      return;
    }

    list.innerHTML = course.sections
      .map((section) => {
        const sectionLessons = course.lessons.filter((lesson) => lesson.section === section.id);
        if (!sectionLessons.length) return "";
        const items = sectionLessons
          .map((lesson) => {
            const active = lesson.id === currentLessonId;
            return `<a class="lesson-nav-link ${active ? "is-active" : ""}" href="${lessonUrl(lesson.slug, courseId)}" data-lesson-id="${escapeAttr(lesson.id)}" ${active ? 'aria-current="page"' : ""}>
              <span class="lesson-dot" aria-hidden="true"></span>
              <span>${escapeHtml(lesson.title)}</span>
              <span class="lesson-num">${lesson.number}</span>
            </a>`;
          })
          .join("");
        return `<div class="lesson-section">
          <div class="lesson-section-title">${escapeHtml(section.title)}</div>
          <div class="lesson-nav-list">${items}</div>
        </div>`;
      })
      .join("");
  };

  /* ---------------------------------------------------------------
     Lesson page
     --------------------------------------------------------------- */
  const renderLessonPage = (shell) => {
    const shellCourseId = shell.getAttribute("data-course");
    const params = new URLSearchParams(window.location.search);
    const requestedCourseId = params.get("course") || shellCourseId || "html";
    const courseId = getCourse(requestedCourseId) ? requestedCourseId : shellCourseId;
    if (!courseId) return;
    const course = getCourse(courseId);
    const slug = params.get("lesson") || (course ? getCourseLessons(courseId)[0].slug : "");
    const lesson = getLesson(courseId, slug);
    const content = qs("[data-lesson-content]", shell);

    if (!course || !lesson) {
      if (content) {
        content.innerHTML = `
          <section class="state-box state-error">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 9v4M12 17h.01"/><path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z"/></svg>
            <h2 class="state-title">درس موردنظر پیدا نشد</h2>
            <p class="state-text">لینک درس را بررسی کنید یا از فهرست دورهٔ HTML یکی را انتخاب کنید.</p>
            <div class="state-actions"><a class="btn btn-primary" href="2-html-course.html">بازگشت به دوره</a></div>
          </section>`;
      }
      return;
    }

    const breadcrumbCurrent = qs("[data-breadcrumb-current]");
    if (breadcrumbCurrent) breadcrumbCurrent.textContent = lesson.title;
    const breadcrumbCourse = qs("[data-breadcrumb-course]");
    if (breadcrumbCourse) { breadcrumbCourse.textContent = course.shortTitle; breadcrumbCourse.href = courseId === "css" ? "3-css-course.html" : "2-html-course.html"; }

    document.title = `${lesson.title} | ${course.title}`;
    document.body.setAttribute("data-page", "lesson");
    document.body.setAttribute("data-course", courseId);
    document.body.setAttribute("data-lesson", lesson.id);

    const courseTitle = qs("[data-lesson-course-title]");
    if (courseTitle) courseTitle.textContent = course.title;

    renderLessonList(courseId, lesson.id);

    if (!content) return;

    const { prev, next } = getPrevNext(courseId, lesson.id);
    const prevLink = prev ? `<a class="lesson-nav-item prev" href="${lessonUrl(prev.slug, courseId)}"><span class="nav-label">درس قبلی</span><span class="nav-title">${escapeHtml(prev.title)}</span></a>` : "<div></div>";
    const nextLink = next ? `<a class="lesson-nav-item next" href="${lessonUrl(next.slug, courseId)}"><span class="nav-label">درس بعدی</span><span class="nav-title">${escapeHtml(next.title)}</span></a>` : "<div></div>";

    content.innerHTML = `
      <header class="lesson-heading">
        <div class="lesson-badges">
          <span class="badge badge-primary">${escapeHtml(course.badge)}</span>
          <span class="badge badge-primary">درس ${lesson.number}</span>
          <span class="badge badge-info">${difficultyLabel(lesson.difficulty)}</span>
          <span class="badge badge-warning">${lesson.timeMinutes} دقیقه</span>
        </div>
        <h1 id="lesson-title" class="lesson-title">${escapeHtml(lesson.title)}</h1>
        <p class="lesson-subtitle">${escapeHtml(lesson.description)}</p>
        <div class="lesson-progress" aria-hidden="true">
          <div class="progress-label"><span>پیشرفت این درس (پس از فاز پیشرفت)</span><strong>۰٪</strong></div>
          <div class="progress" role="progressbar" aria-label="پیشرفت درس" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0">
            <div class="progress-bar" style="width: 0%"></div>
          </div>
        </div>
      </header>

      <section class="objectives" aria-labelledby="objectives-title">
        <h2 id="objectives-title" class="objectives-title">اهداف یادگیری</h2>
        <ul class="objectives-list">
          ${lesson.objectives.map((item) => `<li class="objective">${escapeHtml(item)}</li>`).join("")}
        </ul>
      </section>

      <div class="prose lesson-prose">${renderLessonContent(lesson)}</div>

      <section class="lesson-exercise" aria-labelledby="exercise-title">
        <div class="exercise-header">
          <h2 id="exercise-title" class="exercise-title">${escapeHtml(lesson.exercise.title || "تمرین")}</h2>
        </div>
        <div class="exercise-body">
          <p class="exercise-text">${escapeHtml(lesson.exercise.prompt)}</p>
          <div class="code-example playground-placeholder">
            <div class="playground-frame">
              <pre class="exercise-starter"><code>${highlightHtml(lesson.exercise.starterCode)}</code></pre>
            </div>
          </div>
        </div>
      </section>

      <div class="completion-panel">
        <div>
          <p class="completion-text">این درس را یاد گرفتید؟</p>
          <p class="completion-hint">ثبت واقعی پیشرفت در فاز پیشرفت انجام می‌شود.</p>
        </div>
        <button class="btn btn-primary" type="button" data-lesson-complete>تکمیل درس</button>
      </div>
      <p class="alert alert-info" data-completion-info hidden role="status">
        ${icon.success}
        خوب! ذخیرهٔ واقعی پیشرفت شما بعد از فعال‌شدن حساب کاربری پر می‌شود.
      </p>

      <nav class="lesson-nav" aria-label="ناوبری بین درس‌ها">
        ${prevLink}
        ${nextLink}
      </nav>`;

    const exampleMap = new Map();
    lesson.content.forEach((block, index) => {
      if (block.type === "example") exampleMap.set(index, block);
    });
    qsa(".code-preview-frame", content).forEach((frame) => {
      const match = frame.id.match(/lesson-example-(\d+)/);
      const example = match ? exampleMap.get(Number(match[1])) : null;
      if (example) frame.srcdoc = previewDocument(example.code);
    });

    const completion = qs("[data-lesson-complete]", content);
    if (completion) {
      completion.addEventListener("click", () => {
        const info = qs("[data-completion-info]", content);
        if (info) info.hidden = false;
      });
    }
  };

  /* ---------------------------------------------------------------
     Init
     --------------------------------------------------------------- */
  const init = () => {
    const courseShell = qs("[data-course-shell]");
    const lessonShell = qs("[data-lesson-shell]");
    if (courseShell) renderCoursePage(courseShell);
    if (lessonShell) renderLessonPage(lessonShell);
  };

  window.plpLessons = {
    courses,
    htmlCourse: courses.html,
    cssCourse: courses.css,
    htmlLessons,
    cssLessons,
    sections: htmlSections,
    cssSections,
    getCourse,
    getCourseLessons,
    getLesson,
    getPrevNext,
    renderCoursePage,
    renderLessonPage,
    init,
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
