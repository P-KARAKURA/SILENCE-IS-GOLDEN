
"use strict";

/* =========================================
   40 DAYS OF SILENCE
   Personal reflection app
   Data is stored in this browser only.
========================================= */

const JOURNEY_START = "2026-10-26";
const TOTAL_DAYS = 40;
const STORAGE_KEY = "silence40-reflections-v4";

const SESSIONS = [
  {
    id: "morning",
    label: "Morning",
    time: "6:30 AM",
    hour: 6,
    minute: 30,
    title: "Begin with yourself.",
    prompt:
      "Before the world asks anything of you, take a moment to notice what is happening within you.",
    question:
      "What do you want to remember about yourself today?",
    quote:
      "You do not have to be understood by everyone to live a meaningful life."
  },
  {
    id: "afternoon",
    label: "Afternoon",
    time: "1:30 PM",
    hour: 13,
    minute: 30,
    title: "Return to what matters.",
    prompt:
      "Pause in the middle of your responsibilities. Notice what is influencing you, and choose what deserves your energy.",
    question:
      "What deserves your attention today, and what noise can you let pass?",
    quote:
      "Not every opinion deserves a place in your heart."
  },
  {
    id: "evening",
    label: "Evening",
    time: "8:30 PM",
    hour: 20,
    minute: 30,
    title: "Let the day settle.",
    prompt:
      "You do not need to solve your whole life tonight. Look honestly at your choices, release what you cannot control, and learn from what you can.",
    question:
      "What did today teach you about the person you are becoming?",
    quote:
      "Growth is often quiet. You do not need an audience for it to be real."
  }
];

const $ = (selector) => document.querySelector(selector);

const elements = {
  dayHeading: $("#day-heading"),
  dateLabel: $("#date-label"),
  progressBar: $("#journey-progress-bar"),
  progressLabel: $("#journey-progress-label"),
  sessionTabs: [...document.querySelectorAll(".session-tab")],
  sessionLabel: $("#session-label"),
  entryState: $("#entry-state"),
  reflectionTitle: $("#reflection-title"),
  reflectionPrompt: $("#reflection-prompt"),
  dailyQuote: $("#daily-quote"),
  journalLabel: $("#journal-label"),
  form: $("#reflection-form"),
  input: $("#reflection-input"),
  completeButton: $("#complete-button"),
  formView: $("#reflection-form-view"),
  waitingView: $("#waiting-view"),
  reviewButton: $("#review-button"),
  nextSessionLabel: $("#next-session-label"),
  countHours: $("#count-hours"),
  countMinutes: $("#count-minutes"),
  countSeconds: $("#count-seconds"),
  completedSessions: $("#completed-sessions"),
  completedDays: $("#completed-days"),
  journeyDays: $("#journey-days"),
  historyList: $("#history-list"),
  todayButton: $("#today-button"),
  exportButton: $("#export-button"),
  toast: $("#toast")
};

let records = loadRecords();
let selectedDate = localDateKey(new Date());
let selectedSession = getCurrentSession().id;
let reviewMode = false;
let toastTimeout = null;

/* ---------- Date and time helpers ---------- */

function localDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function dateFromKey(key) {
  const [year, month, day] = key.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function addDays(key, amount) {
  const date = dateFromKey(key);
  date.setDate(date.getDate() + amount);
  return localDateKey(date);
}

function formatDate(key, options = {}) {
  return dateFromKey(key).toLocaleDateString(undefined, {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    ...options
  });
}

function journeyDayNumber(key) {
  const start = dateFromKey(JOURNEY_START);
  const target = dateFromKey(key);
  const difference = Math.round(
    (target - start) / (24 * 60 * 60 * 1000)
  );

  return difference + 1;
}

function isJourneyDate(key) {
  const day = journeyDayNumber(key);
  return day >= 1 && day <= TOTAL_DAYS;
}

function getCurrentSession() {
  const now = new Date();
  const minutes = now.getHours() * 60 + now.getMinutes();

  if (minutes >= 20 * 60 + 30) return SESSIONS[2];
  if (minutes >= 13 * 60 + 30) return SESSIONS[2];
  if (minutes >= 6 * 60 + 30) return SESSIONS[1];

  return SESSIONS[0];
}

function getSession(id) {
  return SESSIONS.find((session) => session.id === id) || SESSIONS[0];
}

function getRecord(dateKey, sessionId) {
  return records[dateKey]?.[sessionId] || null;
}

function isCompleted(dateKey, sessionId) {
  return Boolean(getRecord(dateKey, sessionId)?.completedAt);
}

function loadRecords() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : {};
  } catch (error) {
    console.error("Could not load saved reflections:", error);
    return {};
  }
}

function saveRecords() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
    return true;
  } catch (error) {
    console.error("Could not save reflections:", error);
    showToast("Your browser could not save this entry. Export your journal if possible.");
    return false;
  }
}

function ensureDateRecord(dateKey) {
  if (!records[dateKey]) records[dateKey] = {};
}

/* ---------- Main rendering ---------- */

function renderDay() {
  const todayKey = localDateKey(new Date());
  const dayNumber = journeyDayNumber(selectedDate);
  const session = getSession(selectedSession);
  const record = getRecord(selectedDate, selectedSession);
  const completed = Boolean(record?.completedAt);
  const isToday = selectedDate === todayKey;
  const isPast = selectedDate < todayKey;
  const canWrite = !completed && isJourneyDate(selectedDate);

  elements.dayHeading.textContent =
    isJourneyDate(selectedDate)
      ? `Day ${dayNumber} of ${TOTAL_DAYS}`
      : "Outside your 40-day journey";

  elements.dateLabel.textContent = formatDate(selectedDate);

  const overallProgress = Math.min(
    100,
    Math.max(0, (Math.min(dayNumber, TOTAL_DAYS) / TOTAL_DAYS) * 100)
  );

  elements.progressBar.style.width = `${overallProgress}%`;
  elements.progressLabel.textContent =
    `${Math.round(overallProgress)}% through your 40-day journey`;

  elements.sessionTabs.forEach((tab) => {
    const id = tab.dataset.session;
    const done = isCompleted(selectedDate, id);

    tab.classList.toggle("active", id === selectedSession);
    tab.classList.toggle("completed", done);
    tab.setAttribute("aria-pressed", String(id === selectedSession));

    const status = document.querySelector(`#status-${id}`);
    if (status) status.textContent = done ? "✓" : "○";
  });

  elements.sessionLabel.textContent =
    `${session.label.toUpperCase()} REFLECTION`;

  elements.reflectionTitle.textContent = session.title;
  elements.reflectionPrompt.textContent = session.prompt;
  elements.dailyQuote.textContent = session.quote;
  elements.journalLabel.textContent = session.question;

  elements.entryState.textContent = completed
    ? "Completed"
    : isPast
      ? "Missed session"
      : "Your time";

  elements.input.value = record?.text || "";
  elements.input.readOnly = !canWrite || reviewMode;
  elements.completeButton.hidden = !canWrite || reviewMode;

  if (completed && isToday && !reviewMode) {
    elements.formView.hidden = true;
    elements.waitingView.hidden = false;
    elements.reviewButton.textContent = "Review my reflection";
  } else {
    elements.formView.hidden = false;
    elements.waitingView.hidden = true;
  }

  if (reviewMode && completed) {
    showReturnToWaitingButton();
  } else {
    removeReturnToWaitingButton();
  }

  if (!canWrite) {
    elements.input.placeholder = completed
      ? "Your saved reflection appears here."
      : "This date is outside the 40-day journey.";
  } else if (isPast) {
    elements.input.placeholder =
      "You can still complete this missed reflection. Take your time.";
  } else {
    elements.input.placeholder =
      "Write honestly. This space is for you, not for an audience.";
  }

  renderStats();
  renderHistory();
}

function showReturnToWaitingButton() {
  let button = $("#back-to-waiting");

  if (!button) {
    button = document.createElement("button");
    button.id = "back-to-waiting";
    button.type = "button";
    button.className = "secondary-button";
    button.textContent = "Return to waiting screen";
    button.addEventListener("click", () => {
      reviewMode = false;
      renderDay();
    });

    const footer = document.querySelector(".form-footer");
    footer.appendChild(button);
  }

  button.hidden = false;
}

function removeReturnToWaitingButton() {
  const button = $("#back-to-waiting");
  if (button) button.remove();
}

/* ---------- Complete a reflection ---------- */

elements.form.addEventListener("submit", (event) => {
  event.preventDefault();

  const text = elements.input.value.trim();

  if (!text) {
    showToast("Take a moment to write a few honest words first.");
    elements.input.focus();
    return;
  }

  if (isCompleted(selectedDate, selectedSession)) {
    showToast("This reflection has already been completed.");
    return;
  }

  if (!isJourneyDate(selectedDate)) {
    showToast("This date is outside your 40-day journey.");
    return;
  }

  ensureDateRecord(selectedDate);

  records[selectedDate][selectedSession] = {
    text,
    completedAt: new Date().toISOString()
  };

  if (!saveRecords()) return;

  reviewMode = false;
  renderDay();
  showToast("Well done. You showed up for yourself.");
});

elements.sessionTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    selectedSession = tab.dataset.session;
    reviewMode = false;
    renderDay();
  });
});

elements.todayButton.addEventListener("click", () => {
  selectedDate = localDateKey(new Date());
  selectedSession = getCurrentSession().id;
  reviewMode = false;
  renderDay();
  window.scrollTo({ top: 0, behavior: "smooth" });
});

elements.reviewButton.addEventListener("click", () => {
  reviewMode = true;
  renderDay();
  elements.input.focus();
});

/* ---------- Progress statistics ---------- */

function renderStats() {
  let totalSessions = 0;
  let fullDays = 0;

  for (let offset = 0; offset < TOTAL_DAYS; offset++) {
    const dateKey = addDays(JOURNEY_START, offset);
    const doneCount = SESSIONS.filter((session) =>
      isCompleted(dateKey, session.id)
    ).length;

    totalSessions += doneCount;

    if (doneCount === SESSIONS.length) {
      fullDays++;
    }
  }

  elements.completedSessions.textContent = `${totalSessions} / 120`;
  elements.completedDays.textContent = `${fullDays} / 40`;

  const currentDay = journeyDayNumber(localDateKey(new Date()));
  elements.journeyDays.textContent =
    currentDay < 1
      ? "Not started"
      : currentDay > TOTAL_DAYS
        ? "Complete"
        : `Day ${currentDay}`;
}

/* ---------- Journal history ---------- */

function renderHistory() {
  elements.historyList.replaceChildren();

  const todayKey = localDateKey(new Date());
  const todayDay = journeyDayNumber(todayKey);
  const lastDay = Math.min(TOTAL_DAYS, Math.max(0, todayDay));

  const dates = [];

  for (let offset = lastDay - 1; offset >= 0; offset--) {
    dates.push(addDays(JOURNEY_START, offset));
  }

  if (dates.length === 0) {
    const empty = document.createElement("p");
    empty.className = "empty-history";
    empty.textContent =
      "Your journey starts on October 26, 2026. Your reflections will appear here as you complete them.";
    elements.historyList.appendChild(empty);
    return;
  }

  let foundEntry = false;

  dates.forEach((dateKey) => {
    const completed = SESSIONS.filter((session) =>
      isCompleted(dateKey, session.id)
    ).length;

    if (completed === 0 && dateKey !== todayKey) return;

    foundEntry = true;

    const row = document.createElement("article");
    row.className = "history-day";

    const details = document.createElement("div");
    const heading = document.createElement("h4");
    heading.textContent = `Day ${journeyDayNumber(dateKey)} · ${formatDate(
      dateKey,
      { weekday: "short", day: "numeric", month: "short", year: undefined }
    )}`;

    const description = document.createElement("p");
    description.textContent =
      `${completed} of 3 sessions completed` +
      (completed === 3 ? " · Full day" : "");

    details.append(heading, description);

    const button = document.createElement("button");
    button.type = "button";
    button.className = "secondary-button";
    button.textContent = "Open day";
    button.addEventListener("click", () => {
      selectedDate = dateKey;
      selectedSession = SESSIONS.find(
        (session) => !isCompleted(dateKey, session.id)
      )?.id || "morning";

      reviewMode = false;
      renderDay();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    row.append(details, button);
    elements.historyList.appendChild(row);
  });

  if (!foundEntry) {
    const empty = document.createElement("p");
    empty.className = "empty-history";
    empty.textContent =
      "Your journal is waiting for your first reflection. There is no need to rush.";
    elements.historyList.appendChild(empty);
  }
}

/* ---------- Countdown to next scheduled session ---------- */

function getNextSessionTime(now = new Date()) {
  const candidates = [];

  for (let offset = 0; offset <= 1; offset++) {
    const date = new Date(now);
    date.setDate(date.getDate() + offset);

    SESSIONS.forEach((session) => {
      const candidate = new Date(date);
      candidate.setHours(session.hour, session.minute, 0, 0);

      if (candidate.getTime() > now.getTime()) {
        candidates.push({
          date: candidate,
          session
        });
      }
    });
  }

  candidates.sort((a, b) => a.date - b.date);
  return candidates[0];
}

function updateCountdown() {
  const now = new Date();
  const next = getNextSessionTime(now);

  if (!next) return;

  const remaining = Math.max(0, next.date.getTime() - now.getTime());
  const totalSeconds = Math.floor(remaining / 1000);

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  elements.countHours.textContent = String(hours).padStart(2, "0");
  elements.countMinutes.textContent = String(minutes).padStart(2, "0");
  elements.countSeconds.textContent = String(seconds).padStart(2, "0");

  elements.nextSessionLabel.textContent =
    `${next.session.label} · ${next.date.toLocaleDateString(undefined, {
      weekday: "long",
      day: "numeric",
      month: "long"
    })} at ${next.session.time}`;
}

/* ---------- Export a backup ---------- */

elements.exportButton.addEventListener("click", () => {
  const backup = {
    app: "40 Days of Silence",
    exportedAt: new Date().toISOString(),
    journeyStart: JOURNEY_START,
    totalDays: TOTAL_DAYS,
    reflections: records
  };

  const blob = new Blob(
    [JSON.stringify(backup, null, 2)],
    { type: "application/json;charset=utf-8" }
  );

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `40-days-of-silence-backup-${localDateKey(new Date())}.json`;

  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);

  showToast("Your journal backup has been exported.");
});

/* ---------- Small status message ---------- */

function showToast(message) {
  elements.toast.textContent = message;
  elements.toast.classList.add("show");

  window.clearTimeout(toastTimeout);
  toastTimeout = window.setTimeout(() => {
    elements.toast.classList.remove("show");
  }, 3500);
}

/* ---------- Start the app ---------- */

function initializeApp() {
  const todayKey = localDateKey(new Date());
  const todayNumber = journeyDayNumber(todayKey);

  if (todayNumber < 1) {
    selectedDate = JOURNEY_START;
    selectedSession = "morning";
  } else if (todayNumber > TOTAL_DAYS) {
    selectedDate = addDays(JOURNEY_START, TOTAL_DAYS - 1);
    selectedSession = "evening";
  } else {
    selectedDate = todayKey;
    selectedSession = getCurrentSession().id;
  }

  renderDay();
  updateCountdown();

  // Refresh the countdown and session selection as time passes.
  window.setInterval(() => {
    updateCountdown();

    const nowKey = localDateKey(new Date());

    if (selectedDate !== nowKey && selectedDate === addDays(nowKey, -1)) {
      // Preserve the day being reviewed; do not force navigation.
      return;
    }

    if (selectedDate === nowKey && !reviewMode) {
      const current = getCurrentSession().id;

      if (current !== selectedSession &&
          !isCompleted(selectedDate, selectedSession)) {
        selectedSession = current;
        renderDay();
      }
    }
  }, 1000);
}

initializeApp();
