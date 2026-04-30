const intro = document.getElementById("intro");
const invitation = document.getElementById("invitation");
const openInviteBtn = document.getElementById("openInviteBtn");
const languageSwitcher = document.querySelector(".language-switcher");
const languageButtons = document.querySelectorAll(".language-option");
const musicToggleBtn = document.getElementById("musicToggleBtn");
const backgroundMusic = document.getElementById("backgroundMusic");
const giftCardNumber = document.getElementById("giftCardNumber");
const giftCopyButton = document.getElementById("giftCopyButton");

const targetWeddingDate = new Date("2026-06-13T18:00:00+05:00").getTime();
const OPENING_DURATION_MS = 1000;
const DEFAULT_LANGUAGE = "uz";
const LANGUAGE_STORAGE_KEY = "weddingInvitationLanguage";
const MUSIC_VOLUME = 0.16;
const GIFT_COPY_RESET_MS = 2400;
const ONE_SECOND_MS = 1000;
const ONE_MINUTE_MS = ONE_SECOND_MS * 60;
const ONE_HOUR_MS = ONE_MINUTE_MS * 60;
const ONE_DAY_MS = ONE_HOUR_MS * 24;
const SCROLL_LOCK_CLASS = "scroll-locked";

const LOCALES = {
  ru: {
    pageTitle: "Шахриера и Дилхуша | Свадебное приглашение",
    metaDescription: "Свадебное приглашение Шахриера и Дилхуша на 13 июня 2026 года.",
    previewImageAlt: "Свадебное приглашение Шахриера и Дилхуша",
    ariaIntro: "Экран открытия приглашения",
    ariaEnvelope: "Запечатанный бумажный конверт",
    ariaWeddingDate: "Дата свадьбы",
    ariaCalendar: "Календарь июня 2026 с выделенным 13 июня",
    ariaWeddingDay: "День свадьбы",
    ariaOrnamentHero: "Фотография пары с именами молодоженов",
    ariaVenueDetails: "Место проведения",
    ariaGiftSection: "Подарок жениху",
    ariaCountdown: "Обратный отсчет",
    introTitle:
      "<span class=\"intro-title__line\">ВАМ ПРИШЛО</span><span class=\"intro-title__line\">ПРИГЛАШЕНИЕ</span>",
    unlockHint:
      "<span class=\"intro-unlock__line\">Разблокируйте,</span><span class=\"intro-unlock__line\">нажав на замочек</span>",
    unlockInvitationLabel: "Открыть приглашение",
    envelopeTopNote:
      "<span class=\"flap-note-top\">ВЫ</span><span class=\"flap-note-middle\">ПРИГЛАШЕНЫ</span><span class=\"flap-note-script\">на свадьбу</span>",
    withLove: "с любовью,",
    signatureNames: "Шахриер\u00a0и\u00a0Дилхуш",
    ornamentNames:
      "<span class=\"ornament-name-line\">Шахриер</span><span class=\"ornament-name-amp\">и</span><span class=\"ornament-name-line\">Дилхуш</span><span class=\"ornament-name-amp\">13.06.26</span>",
    ornamentMessage:
      "Аллах объединил их сердца любовью<br />(сура «Аль-Анфаль», аят 63)",
    ornamentDay: "26",
    ornamentMonth: "06",
    ornamentYear: "26",
    heroNames:
      "<span class=\"hero-title__line\">Дорогие наши</span><span class=\"hero-title__line\">родные и близкие!</span>",
    openHere: "нажмите",
    lead: "В этот прекрасный день мы соединяем наши сердца и начинаем новую историю - историю нашей любви.<br /><br />Будем счастливы разделить радость этого особенного момента вместе с вами.<br /><br /><strong>С любовью приглашаем вас на нашу свадьбу.</strong>",
    scrollHint: "Листайте вниз",
    calendarMonth: "ИЮНЬ 2026",
    weekdayMon: "ПН",
    weekdayTue: "ВТ",
    weekdayWed: "СР",
    weekdayThu: "ЧТ",
    weekdayFri: "ПТ",
    weekdaySat: "СБ",
    weekdaySun: "ВС",
    locationTitle: "Место проведения",
    venueName: "Дворец торжеств «Шош»",
    venueAddress: "Адрес: Ташкент, Яшнободский район, махаллинский сход граждан Фидойилар",
    mapLinkYandex: "Яндекс Карты",
    mapLinkGoogle: "Google Maps",
    giftTitle: "Подарок",
    giftLead: "Если вам будет удобно, теплые пожелания можно дополнить подарком на карту жениха.",
    giftRecipientLabel: "Получатель",
    giftRecipientName: "Темурбек",
    giftCardLabel: "Номер карты",
    giftCardNote: "Нажмите на кнопку ниже, чтобы быстро скопировать номер карты.",
    giftCopyAction: "Скопировать номер",
    giftCopySuccess: "Номер скопирован",
    giftCopyError: "Не удалось скопировать",
    countdownTitle: "Считаем каждое мгновение",
    unitDays: "Дней",
    unitHours: "Часов",
    unitMinutes: "Минут",
    unitSeconds: "Секунд",
    countdownWaiting: "Мы ждем вас.",
    countdownToday: "Этот день настал. Мы ждем вас.",
    languageSwitcher: "Выбор языка",
    languageRuLabel: "Русский",
    languageUzLabel: "O'zbekcha",
    musicPlayLabel: "Включить музыку",
    musicPauseLabel: "Остановить музыку",
  },
  uz: {
    pageTitle: "Shahriyor va Dilxush | To'y taklifnomasi",
    metaDescription: "Shahriyor va Dilxush 2026-yil 13-iyun kungi to'y taklifnomasi.",
    previewImageAlt: "Shahriyor va Dilxush to'y taklifnomasi",
    ariaIntro: "Taklifnomani ochish ekrani",
    ariaEnvelope: "Muhrlangan qog'oz konvert",
    ariaWeddingDate: "To'y sanasi",
    ariaCalendar: "2026-yil iyun kalendari, 13-iyun belgilangan",
    ariaWeddingDay: "To'y kuni",
    ariaOrnamentHero: "Yoshlarning rasmi va ismlari tushirilgan bosh sahifa",
    ariaVenueDetails: "To'y manzili",
    ariaGiftSection: "Kuyov uchun to'yona",
    ariaCountdown: "Orqaga sanoq",
    introTitle:
      "<span class=\"intro-title__line\">SIZGA</span><span class=\"intro-title__line\">TAKLIFNOMA</span><span class=\"intro-title__line\">KELDI</span>",
    unlockHint:
      "<span class=\"intro-unlock__line\">Qulfchani bosib,</span><span class=\"intro-unlock__line\">taklifnomani oching</span>",
    unlockInvitationLabel: "Taklifnomani ochish",
    envelopeTopNote:
      "<span class=\"flap-note-top\">SIZ</span><span class=\"flap-note-middle\">TO'YIMIZGA</span><span class=\"flap-note-script\">taklif etilgansiz</span>",
    withLove: "muhabbat ila,",
    signatureNames: "Shahriyor\u00a0va\u00a0Dilxush",
    ornamentNames:
      "<span class=\"ornament-name-line\">Shahriyor</span><span class=\"ornament-name-amp\">va</span><span class=\"ornament-name-line\">Dilxush</span><span class=\"ornament-name-amp\">13.06.26</span>",
    ornamentMessage:
      "Alloh ularni qalbini sevgi ila birlashtirdi<br />(Anfol surasi, 63-oyat)",
    ornamentDay: "26",
    ornamentMonth: "06",
    ornamentYear: "26",
    heroNames:
      "<span class=\"hero-title__line\">Aziz va qadrdon</span><span class=\"hero-title__line\">insonimiz!</span>",
    openHere: "ochish",
    lead: "Hayotimizdagi eng baxtli kunlardan biri - nikoh to'yimizni siz bilan birga nishonlashni niyat qildik.<br /><br />Sizni ushbu kechamizga samimiy taklif etamiz.<br /><br /><strong>Quvonchli kunimizda aziz mehmonimiz bo'lishingizni intizorlik bilan kutamiz.</strong>",
    scrollHint: "Pastga suring",
    calendarMonth: "IYUN 2026",
    weekdayMon: "DU",
    weekdayTue: "SE",
    weekdayWed: "CHOR",
    weekdayThu: "PAY",
    weekdayFri: "JU",
    weekdaySat: "SHA",
    weekdaySun: "YA",
    locationTitle: "To'y manzili",
    venueName: "\"Shosh\" tantanalar saroyi",
    venueAddress: "Manzil: Toshkent, Yashnobod tumani, Fidoyilar mahalla fuqarolar yigʻini",
    mapLinkYandex: "Yandex xaritasi",
    mapLinkGoogle: "Google Maps",
    giftTitle: "To'yona",
    giftLead: "Agar istasangiz, to'yonani kuyov kartasiga yuborishingiz mumkin.",
    giftRecipientLabel: "Qabul qiluvchi",
    giftRecipientName: "Temurbek",
    giftCardLabel: "Karta raqami",
    giftCardNote: "Quyidagi tugma orqali karta raqamini tezda nusxalashingiz mumkin.",
    giftCopyAction: "Raqamni nusxalash",
    giftCopySuccess: "Raqam nusxalandi",
    giftCopyError: "Nusxalab bo'lmadi",
    countdownTitle: "Har lahzani sanayapmiz",
    unitDays: "Kun",
    unitHours: "Soat",
    unitMinutes: "Daqiqa",
    unitSeconds: "Soniya",
    countdownWaiting: "Sizni intiqlik bilan kutamiz.",
    countdownToday: "Bugun aynan o'sha kun. Sizni kutamiz.",
    languageSwitcher: "Til tanlash",
    languageRuLabel: "Ruscha",
    languageUzLabel: "O'zbekcha",
    musicPlayLabel: "Musiqani yoqish",
    musicPauseLabel: "Musiqani to'xtatish",
  },
};

let isOpening = false;
let currentLanguage = DEFAULT_LANGUAGE;
let ornamentNameFitFrame = null;
let introTextFitFrame = null;
let heroTitleFitFrame = null;
let giftCopyResetTimer = null;

function getLocale() {
  return LOCALES[currentLanguage] || LOCALES[DEFAULT_LANGUAGE];
}

function isMusicPlaying() {
  if (!backgroundMusic) {
    return false;
  }

  return !backgroundMusic.paused && !backgroundMusic.ended;
}

function updateMusicToggleState(isPlaying = false) {
  if (!musicToggleBtn) {
    return;
  }

  const locale = getLocale();
  const label = isPlaying ? locale.musicPauseLabel : locale.musicPlayLabel;

  musicToggleBtn.classList.toggle("is-playing", isPlaying);
  musicToggleBtn.setAttribute("aria-pressed", isPlaying ? "true" : "false");
  musicToggleBtn.setAttribute("aria-label", label);
  musicToggleBtn.setAttribute("title", label);
}

function getGiftCardNumberValue() {
  if (!giftCardNumber) {
    return "";
  }

  return (giftCardNumber.textContent || "").replace(/\s+/g, " ").trim();
}

function setGiftCopyButtonState(state = "idle") {
  if (!giftCopyButton) {
    return;
  }

  const locale = getLocale();
  const labelMap = {
    idle: locale.giftCopyAction,
    success: locale.giftCopySuccess,
    error: locale.giftCopyError,
  };
  const label = labelMap[state] || labelMap.idle;

  giftCopyButton.dataset.copyState = state;
  giftCopyButton.textContent = label;
  giftCopyButton.setAttribute("aria-label", label);
  giftCopyButton.setAttribute("title", label);
}

function resetGiftCopyButtonState() {
  if (giftCopyResetTimer !== null) {
    window.clearTimeout(giftCopyResetTimer);
  }

  giftCopyResetTimer = window.setTimeout(() => {
    setGiftCopyButtonState("idle");
    giftCopyResetTimer = null;
  }, GIFT_COPY_RESET_MS);
}

function copyTextWithExecCommand(text) {
  const helperField = document.createElement("textarea");
  helperField.value = text;
  helperField.setAttribute("readonly", "");
  helperField.style.position = "fixed";
  helperField.style.opacity = "0";
  helperField.style.pointerEvents = "none";
  document.body.append(helperField);
  helperField.select();
  helperField.setSelectionRange(0, helperField.value.length);

  let didCopy = false;

  try {
    didCopy = document.execCommand("copy");
  } catch (_error) {
    didCopy = false;
  }

  helperField.remove();
  return didCopy;
}

async function copyGiftCardNumber() {
  const cardNumber = getGiftCardNumberValue();
  if (!cardNumber) {
    setGiftCopyButtonState("error");
    resetGiftCopyButtonState();
    return;
  }

  let didCopy = false;

  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(cardNumber);
      didCopy = true;
    }
  } catch (_error) {
    didCopy = false;
  }

  if (!didCopy) {
    didCopy = copyTextWithExecCommand(cardNumber);
  }

  setGiftCopyButtonState(didCopy ? "success" : "error");
  resetGiftCopyButtonState();
}

function playBackgroundMusic() {
  if (!backgroundMusic) {
    return;
  }

  backgroundMusic.loop = true;
  backgroundMusic.volume = MUSIC_VOLUME;

  const playPromise = backgroundMusic.play();
  if (playPromise && typeof playPromise.then === "function") {
    playPromise
      .then(() => {
        updateMusicToggleState(true);
      })
      .catch(() => {
        updateMusicToggleState(false);
      });
    return;
  }

  updateMusicToggleState(isMusicPlaying());
}

function stopBackgroundMusic() {
  if (!backgroundMusic) {
    return;
  }

  backgroundMusic.pause();
  updateMusicToggleState(false);
}

function toggleBackgroundMusic() {
  if (!backgroundMusic) {
    return;
  }

  if (isMusicPlaying()) {
    stopBackgroundMusic();
    return;
  }

  playBackgroundMusic();
}

function setLanguageSwitcherState(lang) {
  languageButtons.forEach((button) => {
    const isActive = button.dataset.language === lang;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", isActive ? "true" : "false");
  });
}

function saveLanguagePreference(lang) {
  try {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
  } catch (_error) {
    // Ignore storage access issues (private mode, disabled storage, etc.).
  }
}

function getSavedLanguagePreference() {
  try {
    const savedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
    return LOCALES[savedLanguage] ? savedLanguage : null;
  } catch (_error) {
    return null;
  }
}

function detectBrowserLanguage() {
  const preferredLanguages = [navigator.language, ...(navigator.languages || [])].filter(Boolean);
  const matchedLanguage = preferredLanguages
    .map((language) => language.toLowerCase())
    .find((language) => language.startsWith("uz"));

  if (!matchedLanguage) {
    return DEFAULT_LANGUAGE;
  }

  return "uz";
}

function setMetaContent(selector, value) {
  if (!value) {
    return;
  }

  const metaNode = document.querySelector(selector);
  if (metaNode) {
    metaNode.setAttribute("content", value);
  }
}

function getInitialLanguage() {
  return getSavedLanguagePreference() || detectBrowserLanguage();
}

function fitOrnamentNames() {
  const namesBlock = document.querySelector(".photo-hero__names");
  if (!namesBlock) {
    return;
  }

  const nameLines = Array.from(namesBlock.querySelectorAll(".ornament-name-line"));
  if (!nameLines.length) {
    return;
  }

  namesBlock.style.setProperty("--ornament-name-fit-scale", "1");
  nameLines.forEach((line) => {
    line.style.setProperty("--line-fit-scale", "1");
  });

  const availableWidth = namesBlock.clientWidth;
  if (!availableWidth) {
    return;
  }

  const sideSafePadding = Math.max(10, availableWidth * 0.05);
  const safeWidth = Math.max(0, availableWidth - sideSafePadding * 2);
  if (!safeWidth) {
    return;
  }

  const widestLine = nameLines.reduce((maxWidth, line) => {
    const lineWidth = line.scrollWidth;
    return lineWidth ? Math.max(maxWidth, lineWidth) : maxWidth;
  }, 0);
  if (!widestLine) {
    return;
  }

  const fitScale = Math.max(0.7, Math.min(1, (safeWidth / widestLine) * 0.992));
  namesBlock.style.setProperty("--ornament-name-fit-scale", fitScale.toFixed(3));
}

function fitTextLinesToSafeWidth(containerSelector, lineSelector, propertyName, minScale = 0.8) {
  const textBlock = document.querySelector(containerSelector);
  if (!textBlock) {
    return;
  }

  const textLines = Array.from(textBlock.querySelectorAll(lineSelector));
  if (!textLines.length) {
    return;
  }

  textBlock.style.setProperty(propertyName, "1");

  const availableWidth = textBlock.clientWidth;
  if (!availableWidth) {
    return;
  }

  const sideSafePadding = Math.max(6, availableWidth * 0.04);
  const safeWidth = Math.max(0, availableWidth - sideSafePadding * 2);
  if (!safeWidth) {
    return;
  }

  const widestLine = textLines.reduce((maxWidth, line) => {
    const lineWidth = line.scrollWidth;
    return lineWidth ? Math.max(maxWidth, lineWidth) : maxWidth;
  }, 0);
  if (!widestLine) {
    return;
  }

  const fitScale = Math.max(minScale, Math.min(1, (safeWidth / widestLine) * 0.99));
  textBlock.style.setProperty(propertyName, fitScale.toFixed(3));
}

function fitIntroText() {
  fitTextLinesToSafeWidth(".intro-title", ".intro-title__line", "--intro-title-fit-scale", 0.76);
  fitTextLinesToSafeWidth(
    ".intro-unlock__text",
    ".intro-unlock__line",
    "--intro-unlock-fit-scale",
    0.9
  );
}

function fitHeroTitle() {
  fitTextLinesToSafeWidth(".hero-title", ".hero-title__line", "--hero-title-fit-scale", 0.8);
}

function scheduleOrnamentNameFit() {
  if (ornamentNameFitFrame !== null) {
    window.cancelAnimationFrame(ornamentNameFitFrame);
  }

  ornamentNameFitFrame = window.requestAnimationFrame(() => {
    fitOrnamentNames();
    ornamentNameFitFrame = null;
  });
}

function scheduleIntroTextFit() {
  if (introTextFitFrame !== null) {
    window.cancelAnimationFrame(introTextFitFrame);
  }

  introTextFitFrame = window.requestAnimationFrame(() => {
    fitIntroText();
    introTextFitFrame = null;
  });
}

function scheduleHeroTitleFit() {
  if (heroTitleFitFrame !== null) {
    window.cancelAnimationFrame(heroTitleFitFrame);
  }

  heroTitleFitFrame = window.requestAnimationFrame(() => {
    fitHeroTitle();
    heroTitleFitFrame = null;
  });
}

function resetViewportToTop() {
  window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}

function setScrollLock(shouldLock) {
  document.documentElement.classList.toggle(SCROLL_LOCK_CLASS, shouldLock);
  document.body.classList.toggle(SCROLL_LOCK_CLASS, shouldLock);

  if (shouldLock) {
    resetViewportToTop();
  }
}

function applyTranslations(lang = DEFAULT_LANGUAGE) {
  if (!LOCALES[lang]) {
    return;
  }

  currentLanguage = lang;
  setLanguageSwitcherState(lang);
  const locale = getLocale();

  document.documentElement.lang = lang;
  document.title = locale.pageTitle;

  setMetaContent('meta[name="description"]', locale.metaDescription);
  setMetaContent('meta[property="og:title"]', locale.pageTitle);
  setMetaContent('meta[property="og:description"]', locale.metaDescription);
  setMetaContent('meta[property="og:image:alt"]', locale.previewImageAlt);
  setMetaContent('meta[name="twitter:title"]', locale.pageTitle);
  setMetaContent('meta[name="twitter:description"]', locale.metaDescription);

  document.querySelectorAll("[data-i18n]").forEach((node) => {
    const key = node.getAttribute("data-i18n");
    if (key && Object.prototype.hasOwnProperty.call(locale, key)) {
      node.textContent = locale[key];
    }
  });

  document.querySelectorAll("[data-i18n-html]").forEach((node) => {
    const key = node.getAttribute("data-i18n-html");
    if (key && Object.prototype.hasOwnProperty.call(locale, key)) {
      node.innerHTML = locale[key];
    }
  });

  document.querySelectorAll("[data-i18n-attr]").forEach((node) => {
    const rawMapping = node.getAttribute("data-i18n-attr");
    if (!rawMapping) {
      return;
    }

    rawMapping.split(";").forEach((pair) => {
      const [attr, key] = pair.split(":").map((item) => item.trim());
      if (!attr || !key) {
        return;
      }
      if (Object.prototype.hasOwnProperty.call(locale, key)) {
        node.setAttribute(attr, locale[key]);
      }
    });
  });

  const countdownMessage = document.getElementById("countdownMessage");
  if (countdownMessage) {
    countdownMessage.textContent = locale.countdownWaiting;
  }

  setGiftCopyButtonState("idle");
  scheduleOrnamentNameFit();
  scheduleIntroTextFit();
  scheduleHeroTitleFit();
  updateMusicToggleState(isMusicPlaying());
}

function openInvitation() {
  if (isOpening) {
    return;
  }

  isOpening = true;
  resetViewportToTop();
  intro.classList.add("opened");
  openInviteBtn.setAttribute("aria-expanded", "true");
  playBackgroundMusic();

  window.setTimeout(() => {
    resetViewportToTop();
    document.body.classList.add("invitation-visible");
    invitation.setAttribute("aria-hidden", "false");
    intro.classList.add("fade-out");
    scheduleOrnamentNameFit();
    scheduleHeroTitleFit();

    revealVisibleSections();
    setScrollLock(false);
    window.requestAnimationFrame(() => {
      resetViewportToTop();
    });

    window.setTimeout(() => {
      intro.hidden = true;
    }, 900);
  }, OPENING_DURATION_MS);
}

function revealVisibleSections() {
  const reveals = document.querySelectorAll(".reveal");

  if (!("IntersectionObserver" in window)) {
    reveals.forEach((node) => node.classList.add("visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }
        entry.target.classList.add("visible");
        currentObserver.unobserve(entry.target);
      });
    },
    {
      threshold: 0.2,
      rootMargin: "0px 0px -8% 0px",
    }
  );

  reveals.forEach((node, index) => {
    node.style.transitionDelay = `${Math.min(index * 90, 360)}ms`;
    observer.observe(node);
  });
}

function setCountdownValues(days, hours, minutes, seconds) {
  document.getElementById("days").textContent = String(days).padStart(2, "0");
  document.getElementById("hours").textContent = String(hours).padStart(2, "0");
  document.getElementById("minutes").textContent = String(minutes).padStart(2, "0");
  document.getElementById("seconds").textContent = String(seconds).padStart(2, "0");
}

function updateCountdown() {
  const now = Date.now();
  const difference = targetWeddingDate - now;
  const countdownMessage = document.getElementById("countdownMessage");
  const locale = getLocale();

  if (difference <= 0) {
    setCountdownValues(0, 0, 0, 0);
    countdownMessage.textContent = locale.countdownToday;
    return false;
  }

  const days = Math.floor(difference / ONE_DAY_MS);
  const hours = Math.floor((difference % ONE_DAY_MS) / ONE_HOUR_MS);
  const minutes = Math.floor((difference % ONE_HOUR_MS) / ONE_MINUTE_MS);
  const seconds = Math.floor((difference % ONE_MINUTE_MS) / ONE_SECOND_MS);

  setCountdownValues(days, hours, minutes, seconds);
  countdownMessage.textContent = locale.countdownWaiting;
  return true;
}

function handleLanguageSwitcherClick(event) {
  const button = event.target.closest(".language-option");
  if (!button) {
    return;
  }

  const selectedLanguage = button.dataset.language;
  if (!selectedLanguage || selectedLanguage === currentLanguage || !LOCALES[selectedLanguage]) {
    return;
  }

  applyTranslations(selectedLanguage);
  updateCountdown();
  saveLanguagePreference(selectedLanguage);
}

openInviteBtn.addEventListener("click", openInvitation);
if (languageSwitcher) {
  languageSwitcher.addEventListener("click", handleLanguageSwitcherClick);
}
if (musicToggleBtn) {
  musicToggleBtn.addEventListener("click", toggleBackgroundMusic);
}
if (giftCopyButton) {
  giftCopyButton.addEventListener("click", () => {
    void copyGiftCardNumber();
  });
}
if (backgroundMusic) {
  backgroundMusic.loop = true;
  backgroundMusic.volume = MUSIC_VOLUME;
}

if ("scrollRestoration" in window.history) {
  window.history.scrollRestoration = "manual";
}

setScrollLock(true);
applyTranslations(getInitialLanguage());
window.addEventListener("resize", scheduleOrnamentNameFit);
window.addEventListener("resize", scheduleIntroTextFit);
window.addEventListener("resize", scheduleHeroTitleFit);
window.addEventListener("load", resetViewportToTop, { once: true });
if (document.fonts && document.fonts.ready) {
  document.fonts.ready.then(() => {
    scheduleOrnamentNameFit();
    scheduleIntroTextFit();
    scheduleHeroTitleFit();
  });
}
updateCountdown();
const countdownInterval = window.setInterval(() => {
  const hasTimeLeft = updateCountdown();
  if (!hasTimeLeft) {
    window.clearInterval(countdownInterval);
  }
}, 1000);
