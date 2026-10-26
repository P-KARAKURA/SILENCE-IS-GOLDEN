
"use strict";

/* 40 DAYS OF SILENCE
   Change START_DATE to the first day of your journey.
*/
const START_DATE = "2026-10-26";
const TOTAL_DAYS = 40;
const JOURNAL_KEY = "silence40-journal-v3";
const ASSESSMENT_KEY = "silence40-assessments-v3";

/* Motivational photographs from Unsplash.
   If a photograph fails, the app tries another URL. */
const photos = [
  "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1400&q=85",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=85",
  "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=1400&q=85",
  "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1400&q=85",
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1400&q=85",
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1400&q=85",
  "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1400&q=85",
  "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=1400&q=85",
  "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1400&q=85",
  "https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=1400&q=85",
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=85",
  "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=1400&q=85",
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1400&q=85",
  "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1400&q=85",
  "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=1400&q=85",
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1400&q=85",
  "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1400&q=85",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=85",
  "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1400&q=85",
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1400&q=85"
];

/* Each day has its own quote and reflection question. */
const reflections = [
  ["Silence is not emptiness. It is space to hear what matters.",
   "What am I trying to understand about myself that I cannot hear while surrounded by noise?"],
  ["You do not need to react to everything that reaches you.",
   "What can I allow to pass without giving it my energy?"],
  ["A quiet mind can notice what a hurried mind misses.",
   "What have I been too busy to notice about myself?"],
  ["You can pause before choosing your response.",
   "Where in my life would a pause help me choose better?"],
  ["Not every open door is yours to enter.",
   "Which distractions deserve less of my attention?"],
  ["Rest is part of becoming, not a failure to progress.",
   "What kind of rest would genuinely restore me today?"],
  ["You can be kind without abandoning your boundaries.",
   "Where do I need a clearer boundary?"],
  ["Some answers arrive after the noise has passed.",
   "What question can I carry patiently without forcing an answer?"],
  ["Your worth does not depend on being seen by everyone.",
   "Whose approval have I been trying too hard to earn?"],
  ["Listen to your habits; they often speak before your words do.",
   "Which habit is shaping the person I am becoming?"],
  ["You can learn from the past without living inside it.",
   "What lesson can I keep, and what burden can I set down?"],
  ["Choose what deserves your attention; attention becomes a life.",
   "What deserves more of my attention than it received yesterday?"],
  ["Being alone for a moment can help you return to others with care.",
   "How can this quiet time help me show up better for others?"],
  ["You are allowed to grow beyond an old version of yourself.",
   "What old description of myself no longer fits?"],
  ["Patience is strength that does not need to shout.",
   "Where can I practise patience instead of forcing an outcome?"],
  ["You do not have to explain every private step of your growth.",
   "What part of my growth needs protection rather than an audience?"],
  ["Clarity often begins with an honest admission.",
   "What truth about myself am I ready to acknowledge?"],
  ["A small faithful action is better than a grand promise forgotten.",
   "What one small action would align with my values today?"],
  ["Let your values speak louder than your mood.",
   "Which value do I want to practise even when I feel unsettled?"],
  ["The pause between feeling and action is a place of freedom.",
   "What feeling can I notice without immediately acting on it?"],
  ["You can forgive yourself and still take responsibility.",
   "Where do I need both compassion and accountability?"],
  ["Not every conflict needs your participation.",
   "Which conflict can I step away from without neglecting what matters?"],
  ["Growth can be quiet long before it becomes visible.",
   "What progress might I be overlooking because it is not dramatic?"],
  ["Make room for the person you are becoming.",
   "What do I need to stop carrying into my next chapter?"],
  ["Your attention is precious; spend it deliberately.",
   "What has been consuming my attention without giving anything meaningful back?"],
  ["Honesty with yourself is a form of courage.",
   "Where have I been making excuses instead of facing the truth?"],
  ["You can choose a slower, steadier path.",
   "Where would steadiness serve me better than speed?"],
  ["Peace is not avoiding every difficulty; it is meeting difficulty with intention.",
   "What challenge can I face calmly and responsibly?"],
  ["A boundary can protect both your energy and your kindness.",
   "What boundary would help me remain generous without becoming resentful?"],
  ["You are more than the roles you perform for other people.",
   "Who am I when I am not trying to prove anything?"],
  ["Let your actions become evidence of your intentions.",
   "What action today would make my values visible?"],
  ["You can hear criticism without letting it define you.",
   "What feedback is useful, and what can I release?"],
  ["The life you want is shaped by what you practise repeatedly.",
   "What practice do I want to carry forward after these 40 days?"],
  ["You do not need to solve your whole life today.",
   "What is the next honest step, rather than the entire plan?"],
  ["Silence can prepare you to speak with more care.",
   "What needs to be said, and how can I say it thoughtfully?"],
  ["Return to your responsibilities with a clearer heart.",
   "Who or what needs my care when I return from this quiet moment?"],
  ["You can be present without being available to every demand.",
   "How can I be present while protecting time for what matters?"],
  ["A meaningful change is often built from ordinary choices.",
   "Which ordinary choice can I make differently today?"],
  ["Keep the lesson; do not turn the journey into a performance.",
   "What have I learned that I can practise privately and consistently?"],
  ["Return with intention, not with a need to prove you have changed.",
   "What will I continue doing after day 40 to protect what I have learned?"]
];

const categories = [
  {
    name: "Self-control",
    description: "Did I pause before reacting to a situation?"
  },
  {
    name: "Discipline",
    description: "Did I respect my intentions, commitments, and responsibilities?"
  },
  {
    name: "Listening",
    description: "Did I listen carefully instead of rushing to speak?"
  },
  {
    name: "Emotional awareness",
    description: "Did I recognise my feelings without letting them control me?"
  },
  {
    name: "Respect and kindness",
    description: "Did I treat myself and others with respect?"
  },
  {
    name: "Purposeful silence",
    description: "Did I avoid unnecessary noise while still speaking when needed?"
  }
];

/* DOM elements */
const $ = id => document.getElementById(id);

const photo = $("dailyPhoto");
const photoFallback = $("photoFallback");
const photoLink = $("photoLink");
const journalEntry = $("journalEntry");
const assessmentReflection = $("assessmentReflection");

let currentDay = getCurrentJourneyDay();
let photoToken = 0;
let saveTimer = null;

/* Safe localStorage helpers */
function readStore(key) {
  try {
    const value = JSON.parse(localStorage.getItem(key) || "{}");
    return value && typeof value === "object" && !Array.isArray(value)
      ? value : {};
  } catch {
    return {};
  }
}

function writeStore(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error("Unable to save local data:", error);
    return false;
  }
}

function getJournal() {
  return readStore(JOURNAL_KEY);
}

function getAssessments() {
  return readStore(ASSESSMENT_KEY);
}

function getCurrentJourneyDay() {
  const start = new Date(`${START_DATE}T00:00:00`);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (Number.isNaN(start.getTime())) return 1;

  const difference = Math.floor((today - start) / 86400000);
  return Math.max(1, Math.min(TOTAL_DAYS, difference + 1));
}

/* PHOTO LOADING
   Try each image URL once for the selected day.
   A token prevents old image requests from changing a newer day. */
function loadPhoto(day) {
  const token = ++photoToken;
  let attempts = 0;

  photo.style.display = "none";
  photoFallback.hidden = false;
  photoLink.hidden = true;

  function tryNextPhoto() {
    if (token !== photoToken) return;

    if (attempts >= photos.length) {
      photo.style.display = "none";
      photoFallback.hidden = false;
      photoLink.hidden = true;
      return;
    }

    const index = (day - 1 + attempts) % photos.length;
    const url = photos[index];
    attempts++;

    photo.onload = () => {
      if (token !== photoToken) return;

      photo.style.display = "block";
      photoFallback.hidden = true;
      photoLink.href = url;
      photoLink.hidden = false;
    };

    photo.onerror = tryNextPhoto;
    photo.src = url;
  }

  tryNextPhoto();
}

/* Journal storage */
function saveJournal(showStatus = true) {
  const entries = getJournal();
  entries[String(currentDay)] = journalEntry.value;

  const saved = writeStore(JOURNAL_KEY, entries);

  if (showStatus) {
    $("journalStatus").textContent = saved
      ? `Day ${currentDay} journal saved on this device.`
      : "Unable to save. Check your browser storage settings.";
  }
}

function scheduleJournalSave() {
  $("journalStatus").textContent = "Saving…";
  clearTimeout(saveTimer);
  saveTimer = setTimeout(() => saveJournal(), 350);
}

/* Assessment helpers */
function blankAssessment() {
  return {
    scores: [null, null, null, null, null, null],
    reflection: "",
    assessed: false,
    updatedAt: null
  };
}

function normaliseAssessment(raw) {
  if (!raw || typeof raw !== "object") return blankAssessment();

  const scores = categories.map((_, i) => {
    const score = Array.isArray(raw.scores) ? raw.scores[i] : null;
    return Number.isInteger(score) && score >= 0 && score <= 5
      ? score : null;
  });

  return {
    scores,
    reflection: typeof raw.reflection === "string" ? raw.reflection : "",
    assessed: raw.assessed === true && scores.every(s => s !== null),
    updatedAt: typeof raw.updatedAt === "string" ? raw.updatedAt : null
  };
}

function getAssessment(day = currentDay) {
  const all = getAssessments();
  return normaliseAssessment(all[String(day)]);
}

function calculateTotal(scores) {
  return scores.reduce((sum, score) => sum + (score === null ? 0 : score), 0);
}

function saveAssessment(showStatus = true) {
  const all = getAssessments();
  const previous = getAssessment(currentDay);

  const scores = categories.map((_, i) => {
    const chosen = document.querySelector(
      `.score-button[data-category="${i}"][aria-pressed="true"]`
    );

    return chosen ? Number(chosen.dataset.score) : previous.scores[i];
  });

  const reflection = assessmentReflection.value;
  const assessed = scores.every(score => score !== null);

  all[String(currentDay)] = {
    scores,
    reflection,
    assessed,
    updatedAt: new Date().toISOString()
  };

  const saved = writeStore(ASSESSMENT_KEY, all);

  if (showStatus) {
    $("assessmentStatus").textContent = !saved
      ? "Unable to save. Check browser storage settings."
      : assessed
        ? `Day ${currentDay} assessment saved.`
        : `Saved. Score all ${categories.length} areas to complete this day.`;
  }

  updateDailyScore(scores);
  renderDashboard();
}

function updateDailyScore(scores) {
  const total = calculateTotal(scores);
  $("dailyScore").textContent = total;
  $("scoreProgress").style.width = `${(total / 30) * 100}%`;

  const complete = scores.every(score => score !== null);
  let message = "Complete your assessment at the end of the day.";

  if (complete) {
    if (total === 0) {
      message = "A starting point for honest reflection. What would you like to change tomorrow?";
    } else if (total <= 15) {
      message = "Be honest about the day and choose one thing to improve.";
    } else if (total <= 23) {
      message = "A day of mixed results is still a chance to learn.";
    } else if (total <= 29) {
      message = "Strong effort. Notice what helped you.";
    } else {
      message = "Excellent awareness. Stay humble and keep practising.";
    }
  } else if (scores.some(score => score !== null)) {
    message = "Keep going. Score each area honestly; you do not need to be perfect.";
  }

  $("scoreMessage").textContent = message;
}

function renderScoreCategories(scores) {
  const container = $("scoreCategories");
  container.replaceChildren();

  categories.forEach((category, index) => {
    const wrapper = document.createElement("div");
    wrapper.className = "category";

    const heading = document.createElement("div");
    heading.className = "category-title";

    const title = document.createElement("strong");
    title.textContent = category.name;

    const selected = document.createElement("span");
    selected.className = "category-score";
    selected.id = `categoryScore${index}`;
    selected.textContent = scores[index] === null
      ? "Not scored" : `${scores[index]}/5`;

    heading.append(title, selected);

    const description = document.createElement("p");
    description.className = "category-description";
    description.textContent = category.description;

    const options = document.createElement("div");
    options.className = "score-options";

    for (let n = 0; n <= 5; n++) {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "score-button";
      button.textContent = String(n);
      button.dataset.category = String(index);
      button.dataset.score = String(n);
      button.setAttribute("aria-label", `${category.name}: score ${n} out of 5`);
      button.setAttribute("aria-pressed", String(scores[index] === n));

      button.addEventListener("click", () => {
        const all = getAssessments();
        const record = getAssessment(currentDay);
        record.scores[index] = n;
        record.reflection = assessmentReflection.value;
        record.assessed = record.scores.every(score => score !== null);
        record.updatedAt = new Date().toISOString();

        all[String(currentDay)] = record;
        const saved = writeStore(ASSESSMENT_KEY, all);

        // Update only the selected category's visual controls.
        options.querySelectorAll("button").forEach(item => {
          item.setAttribute(
            "aria-pressed",
            String(Number(item.dataset.score) === n)
          );
        });

        selected.textContent = `${n}/5`;
        updateDailyScore(record.scores);
        renderDashboard();

        $("assessmentStatus").textContent = saved
          ? record.assessed
            ? `Day ${currentDay} assessment complete and saved.`
            : `Score saved. ${record.scores.filter(s => s !== null).length} of 6 areas scored.`
          : "Unable to save. Check browser storage settings.";
      });

      options.appendChild(button);
    }

    wrapper.append(heading, description, options);
    container.appendChild(wrapper);
  });
}

/* Display the selected day */
function renderDay() {
  const [quote, question] = reflections[currentDay - 1];

  $("dayLabel").textContent = `DAY ${currentDay} OF ${TOTAL_DAYS}`;
  const percent = Math.round(currentDay / TOTAL_DAYS * 100);
  $("progressPercent").textContent = `${percent}%`;
  $("journeyProgress").style.width = `${percent}%`;

  $("dailyQuote").textContent = `“${quote}”`;
  $("dailyQuestion").textContent = question;

  journalEntry.value = getJournal()[String(currentDay)] || "";

  const assessment = getAssessment(currentDay);
  assessmentReflection.value = assessment.reflection;

  renderScoreCategories(assessment.scores);
  updateDailyScore(assessment.scores);

  $("journalStatus").textContent = "Saved on this device only.";
  $("assessmentStatus").textContent = assessment.assessed
    ? `Day ${currentDay} assessment complete.`
    : "Not assessed yet.";

  $("previousDay").disabled = currentDay === 1;
  $("nextDay").disabled = currentDay === TOTAL_DAYS;

  loadPhoto(currentDay);
  renderDashboard();
}

/* 40-day statistics and chart */
function renderDashboard() {
  const all = getAssessments();
  const records = [];

  for (let day = 1; day <= TOTAL_DAYS; day++) {
    const record = normaliseAssessment(all[String(day)]);
    if (record.assessed) {
      records.push({
        day,
        total: calculateTotal(record.scores)
      });
    }
  }

  const count = records.length;
  const earned = records.reduce((sum, record) => sum + record.total, 0);
  const possible = count * 30;
  const average = count ? (earned / count).toFixed(1) : "—";

  $("daysAssessed").textContent = `${count}/${TOTAL_DAYS}`;
  $("pointsEarned").textContent = String(earned);
  $("pointsPossible").textContent = String(possible);
  $("averageScore").textContent = count ? `${average}/30` : "—";

  if (count) {
    const highest = Math.max(...records.map(r => r.total));
    const lowest = Math.min(...records.map(r => r.total));
    const highestDays = records.filter(r => r.total === highest).map(r => r.day);
    const lowestDays = records.filter(r => r.total === lowest).map(r => r.day);

    $("highestDay").textContent = `Day ${highestDays.join(", ")} · ${highest}`;
    $("lowestDay").textContent = `Day ${lowestDays.join(", ")} · ${lowest}`;
  } else {
    $("highestDay").textContent = "—";
    $("lowestDay").textContent = "—";
  }

  renderChart(all);
}

function renderChart(all) {
  const chart = $("scoreChart");
  chart.replaceChildren();

  for (let day = 1; day <= TOTAL_DAYS; day++) {
    const record = normaliseAssessment(all[String(day)]);
    const completed = record.assessed;
    const total = completed ? calculateTotal(record.scores) : 0;

    const column = document.createElement("div");
    column.className = "chart-column";
    column.title = completed
      ? `Day ${day}: ${total}/30`
      : `Day ${day}: not assessed`;
    column.setAttribute("aria-label", column.title);

    const bar = document.createElement("div");
    bar.className = completed ? "chart-bar" : "chart-bar missing";
    bar.style.height = completed ? `${Math.max(4, total / 30 * 100)}%` : "3px";

    const label = document.createElement("span");
    label.className = "chart-label";
    label.textContent = String(day);

    column.append(bar, label);
    chart.appendChild(column);
  }
}

/* Reset only the selected day's assessment */
function resetCurrentAssessment() {
  const confirmed = window.confirm(
    `Reset Day ${currentDay}'s assessment and assessment reflection? Your journal and other days will remain untouched.`
  );

  if (!confirmed) return;

  const all = getAssessments();
  delete all[String(currentDay)];

  if (!writeStore(ASSESSMENT_KEY, all)) {
    $("assessmentStatus").textContent = "Unable to reset. Check browser storage settings.";
    return;
  }

  assessmentReflection.value = "";
  renderScoreCategories(blankAssessment().scores);
  updateDailyScore(blankAssessment().scores);
  $("assessmentStatus").textContent = `Day ${currentDay} assessment reset.`;
  renderDashboard();
}

/* Export a local text report */
function exportJourney() {
  const journals = getJournal();
  const assessments = getAssessments();
  const lines = [
    "40 DAYS OF SILENCE — PERSONAL JOURNEY",
    `Journey start date: ${START_DATE}`,
    "",
    "This report was created locally by the user.",
    ""
  ];

  let earned = 0;
  let assessedCount = 0;

  for (let day = 1; day <= TOTAL_DAYS; day++) {
    const [quote, question] = reflections[day - 1];
    const record = normaliseAssessment(assessments[String(day)]);

    lines.push(`DAY ${day}`);
    lines.push(`Quote: ${quote}`);
    lines.push(`Question: ${question}`);
    lines.push(`Journal: ${journals[String(day)] || "(No journal entry)"}`);

    if (record.assessed) {
      const total = calculateTotal(record.scores);
      earned += total;
      assessedCount++;

      lines.push("Assessment:");
      categories.forEach((category, index) => {
        lines.push(`- ${category.name}: ${record.scores[index]}/5`);
      });
      lines.push(`Daily total: ${total}/30`);
      lines.push(`Assessment reflection: ${record.reflection || "(No reflection)"}`);
    } else {
      lines.push("Assessment: Not completed");
    }

    lines.push("");
  }

  lines.push("OVERALL SUMMARY");
  lines.push(`Days assessed: ${assessedCount}/${TOTAL_DAYS}`);
  lines.push(`Points earned: ${earned}`);
  lines.push(`Possible points: ${assessedCount * 30}`);
  lines.push(`Average: ${assessedCount ? (earned / assessedCount).toFixed(1) + "/30" : "No assessments yet"}`);

  const blob = new Blob([lines.join("\n")], {
    type: "text/plain;charset=utf-8"
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = "40-days-of-silence-journal.txt";
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

/* Navigation */
$("previousDay").addEventListener("click", () => {
  if (currentDay > 1) {
    saveJournal(false);
    saveAssessment(false);
    currentDay--;
    renderDay();
  }
});

$("nextDay").addEventListener("click", () => {
  if (currentDay < TOTAL_DAYS) {
    saveJournal(false);
    saveAssessment(false);
    currentDay++;
    renderDay();
  }
});

$("todayButton").addEventListener("click", () => {
  saveJournal(false);
  saveAssessment(false);
  currentDay = getCurrentJourneyDay();
  renderDay();
});

/* Journal and assessment actions */
$("saveJournal").addEventListener("click", () => saveJournal());
journalEntry.addEventListener("input", scheduleJournalSave);
journalEntry.addEventListener("blur", () => {
  clearTimeout(saveTimer);
  saveJournal();
});

$("saveAssessment").addEventListener("click", () => {
  const all = getAssessments();
  const record = getAssessment(currentDay);

  record.reflection = assessmentReflection.value;
  record.assessed = record.scores.every(score => score !== null);
  record.updatedAt = new Date().toISOString();
  all[String(currentDay)] = record;

  const saved = writeStore(ASSESSMENT_KEY, all);
  $("assessmentStatus").textContent = !saved
    ? "Unable to save. Check browser storage settings."
    : record.assessed
      ? `Day ${currentDay} assessment saved.`
      : "Reflection saved. Score all six areas to complete the day.";

  renderDashboard();
});

assessmentReflection.addEventListener("input", () => {
  const all = getAssessments();
  const record = getAssessment(currentDay);
  record.reflection = assessmentReflection.value;
  record.assessed = record.scores.every(score => score !== null);
  record.updatedAt = new Date().toISOString();
  all[String(currentDay)] = record;

  const saved = writeStore(ASSESSMENT_KEY, all);
  $("assessmentStatus").textContent = saved
    ? "Assessment reflection saved."
    : "Unable to save. Check browser storage settings.";

  renderDashboard();
});

$("resetAssessment").addEventListener("click", resetCurrentAssessment);
$("exportData").addEventListener("click", exportJourney);

/* Start the application */
renderDay();
