
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.57.0/+esm";

const URL = "https://xvzkuvxnegcvcjuszlea.supabase.co";
const PUBLISHABLE_KEY = "sb_publishable_ldUDSSDndMEqHZsM_vA7XA_Dy2akS3S";
const COURSE_SLUG = "american-english-speaking-12w-4d";
const supabase = createClient(URL, PUBLISHABLE_KEY, {
  auth: { autoRefreshToken: true, persistSession: true, detectSessionInUrl: true }
});
const $ = (id) => document.getElementById(id);
const escapeHtml = (value) => String(value ?? "").replace(/[&<>"']/g, (c) => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
}[c]));
const formats = {
  voice: ["语音口语", "35 min", "Speak"],
  chat: ["文字聊天", "30 min", "Chat"],
  vocabulary: ["词汇记忆", "25 min", "Vocabulary"]
};
const state = {
  course: null, weeks: [], lessons: [], sessions: [], vocabulary: [],
  lessonProgress: [], sessionProgress: [], vocabularyProgress: [],
  user: null, learner: null, selectedLesson: null, tab: "overview",
  deck: "today", activeCard: null, revealed: false, busy: false,
  reviewedThisVisit: new Set()
};
function notify(message, error = false) {
  const el = $("notification");
  el.textContent = message;
  el.classList.toggle("error", error);
  el.hidden = false;
}
function statusText(status, authenticated = true) {
  if (!authenticated) return "登录后查看";
  return ({ completed: "已完成", in_progress: "进行中", not_started: "未开始" })[status] || "未开始";
}
function statusBadge(status, authenticated = true) {
  const s = authenticated ? (status || "not_started") : "";
  return '<span class="status-pill ' + s + '">' + statusText(s, authenticated) + '</span>';
}
function findProgress(lessonId) {
  return state.lessonProgress.find((p) => p.lesson_id === lessonId);
}
function sessionProgress(lessonId, mode) {
  return state.sessionProgress.find((p) => p.lesson_id === lessonId && p.mode === mode);
}
function vocabularyProgress(id) {
  return state.vocabularyProgress.find((p) => p.vocabulary_id === id);
}
function currentLesson() {
  return state.lessons.find((l) => findProgress(l.id)?.status !== "completed") || state.lessons.at(-1);
}
function selectedLesson() {
  return state.lessons.find((l) => l.id === state.selectedLesson) || currentLesson();
}
async function requireQuery(promise, context) {
  const { data, error } = await promise;
  if (error) throw new Error(context + "：" + error.message);
  return data;
}
async function loadCourse() {
  state.course = await requireQuery(supabase.from("english_courses").select("*").eq("slug", COURSE_SLUG).single(), "读取课程");
  const [weeks, lessons, sessions, vocabulary] = await Promise.all([
    requireQuery(supabase.from("english_weeks").select("*").eq("course_id", state.course.id).order("week_number"), "读取周计划"),
    requireQuery(supabase.from("english_lessons").select("*").eq("course_id", state.course.id).order("lesson_number"), "读取课时"),
    requireQuery(supabase.from("english_sessions").select("*").order("mode"), "读取练习环节"),
    requireQuery(supabase.from("english_vocabulary").select("*").order("sort_order"), "读取词汇")
  ]);
  const lessonIds = new Set(lessons.map((l) => l.id));
  state.weeks = weeks;
  state.lessons = lessons;
  state.sessions = sessions.filter((s) => lessonIds.has(s.lesson_id));
  state.vocabulary = vocabulary.filter((v) => lessonIds.has(v.lesson_id));
  state.selectedLesson = currentLesson()?.id || null;
  $("connection").className = "connection ok";
  $("connection").innerHTML = '<span class="dot"></span>Supabase 已连接';
}
async function loadProgress() {
  if (!state.learner) {
    state.lessonProgress = [];
    state.sessionProgress = [];
    state.vocabularyProgress = [];
    return;
  }
  const learnerId = state.learner.id;
  const [lessons, sessions, vocabulary] = await Promise.all([
    requireQuery(supabase.from("english_lesson_progress").select("*").eq("learner_id", learnerId), "读取课程进度"),
    requireQuery(supabase.from("english_session_progress").select("*").eq("learner_id", learnerId), "读取练习进度"),
    requireQuery(supabase.from("english_vocabulary_progress").select("*").eq("learner_id", learnerId), "读取记忆进度")
  ]);
  state.lessonProgress = lessons;
  state.sessionProgress = sessions;
  state.vocabularyProgress = vocabulary;
}
async function refreshIdentity() {
  const { data: auth, error: authError } = await supabase.auth.getUser();
  if (authError && authError.name !== "AuthSessionMissingError") {
    console.warn("Supabase Auth", authError.message);
  }
  state.user = auth?.user || null;
  state.learner = null;
  if (state.user) {
    const row = await requireQuery(
      supabase.from("english_learners").select("id,handle,auth_user_id").eq("auth_user_id", state.user.id).maybeSingle(),
      "查找学习者"
    );
    state.learner = row || null;
  }
  $("account-button").textContent = state.user ? "退出登录" : "登录同步";
  await loadProgress();
  render();
}
function renderMetrics() {
  const authenticated = Boolean(state.learner);
  const completed = state.lessonProgress.filter((p) => p.status === "completed").length;
  const minutes = state.sessionProgress.reduce((sum, p) => sum + (Number(p.minutes_practiced) || 0), 0);
  const mastered = state.vocabularyProgress.filter((p) => p.status === "mastered").length;
  const due = state.vocabularyProgress.filter((p) => p.next_review_at && new Date(p.next_review_at).getTime() <= Date.now()).length;
  const values = [
    ["已完成课程", authenticated ? completed : "—", "/ " + state.lessons.length, authenticated ? Math.round(completed / Math.max(1, state.lessons.length) * 100) + "% 的课程已完成" : "登录后显示进度"],
    ["总练习时长", authenticated ? minutes : "—", "分钟", "语音 / Chat / 词汇"],
    ["已掌握词汇", authenticated ? mastered : "—", "/ " + state.vocabulary.length, "根据背诵记录计算"],
    ["到期复习", authenticated ? due : "—", "条", "间隔重复"]
  ];
  $("metrics").innerHTML = values.map(([label, value, suffix, foot]) =>
    '<div class="metric"><div class="metric-label">' + label +
    '</div><div class="metric-value">' + value + ' <span>' + escapeHtml(suffix) +
    '</span></div><div class="metric-foot">' + escapeHtml(foot) + '</div></div>'
  ).join("");
}
function renderOverview() {
  const lesson = currentLesson();
  if (!lesson) {
    $("current-lesson").innerHTML = '<div class="empty-card">没有找到课程。</div>';
    return;
  }
  const status = findProgress(lesson.id)?.status || "not_started";
  $("current-lesson").innerHTML =
    '<div class="lesson-card"><div><span class="lesson-number">WEEK ' + lesson.week_number +
    ' · DAY ' + lesson.day_number + ' · LESSON ' + lesson.lesson_number + '</span><h3>' +
    escapeHtml(lesson.title) + '</h3><p>' + escapeHtml(lesson.scenario) + '</p><p class="lesson-goal">' +
    escapeHtml(lesson.learning_goal) + '</p></div><div class="lesson-actions">' +
    statusBadge(status, Boolean(state.learner)) +
    '<button class="primary-button" type="button" data-action="current-words">背诵本课单词 ↗</button></div></div>';
  $("current-sessions").innerHTML = ["voice", "chat", "vocabulary"].map((mode) => {
    const content = state.sessions.find((s) => s.lesson_id === lesson.id && s.mode === mode);
    const progress = sessionProgress(lesson.id, mode);
    const mins = Number(progress?.minutes_practiced || 0);
    const planned = content?.planned_minutes || Number(formats[mode][1].split(" ")[0]);
    const ratio = Math.min(100, Math.round(mins / planned * 100));
    const done = progress?.status === "completed";
    return '<article class="session-card ' + mode + '"><div class="session-top">' +
      '<div><div class="session-name">' + formats[mode][0] + '</div><div class="session-sub">' + planned +
      ' 分钟 · ' + formats[mode][2] + '</div></div>' + statusBadge(progress?.status, Boolean(state.learner)) +
      '</div><div class="session-track"><span style="width:' + ratio + '%"></span></div>' +
      '<div class="session-controls"><label class="muted" for="minutes-' + mode + '">实际分钟</label>' +
      '<input id="minutes-' + mode + '" class="minutes-input" type="number" min="1" max="240" step="1" value="' +
      (mins || planned) + '" aria-label="' + formats[mode][0] + '实际分钟">' +
      '<button class="tiny-button" type="button" data-action="session-start" data-mode="' + mode + '" ' +
      (!state.learner || done ? "disabled" : "") + '>开始</button>' +
      '<button class="tiny-button" type="button" data-action="session-complete" data-mode="' + mode + '" ' +
      (!state.learner || done ? "disabled" : "") + '>完成</button></div>' +
      '<div class="session-hint">' + escapeHtml((content?.activities || []).join(" · ")) + '</div></article>';
  }).join("");
}
function renderWeeks() {
  $("week-list").innerHTML = state.weeks.map((week) => {
    const ls = state.lessons.filter((l) => l.week_number === week.week_number);
    const done = ls.filter((l) => findProgress(l.id)?.status === "completed").length;
    return '<div class="week-card"><div class="week-title"><span>Week ' + week.week_number + ' · ' +
      escapeHtml(week.theme) + '</span><small>' + (state.learner ? done + " / " + ls.length : ls.length + " 节") +
      '</small></div><div class="day-list">' + ls.map((l) =>
      '<button type="button" class="day-button ' + (selectedLesson()?.id === l.id ? "selected" : "") +
      '" data-lesson="' + l.id + '"><span>DAY ' + l.day_number + '</span><strong>' +
      escapeHtml(l.title) + '</strong>' + statusBadge(findProgress(l.id)?.status, Boolean(state.learner)) + '</button>'
    ).join("") + '</div></div>';
  }).join("");
  const lesson = selectedLesson();
  if (!lesson) return;
  const cards = state.vocabulary.filter((v) => v.lesson_id === lesson.id);
  const s = state.sessions.filter((item) => item.lesson_id === lesson.id);
  $("lesson-detail").innerHTML =
    '<div class="detail-card"><span class="lesson-number">WEEK ' + lesson.week_number + ' · DAY ' +
    lesson.day_number + '</span><h3>' + escapeHtml(lesson.title) + '</h3><p>' + escapeHtml(lesson.scenario) +
    '</p><div class="detail-title">学习目标</div><p>' + escapeHtml(lesson.learning_goal) +
    '</p><div class="detail-title">语法与发音</div><p>' + escapeHtml(lesson.grammar_focus) + ' · ' +
    escapeHtml(lesson.pronunciation_focus) + '</p><div class="detail-title">语音角色扮演</div><p>' +
    escapeHtml(lesson.voice_roleplay) + '</p><div class="detail-title">文字聊天练习</div><p>' +
    escapeHtml(lesson.chat_roleplay) + '</p><div class="detail-title">每日练习计划</div><ul class="detail-list">' +
    s.map((x) => '<li>' + formats[x.mode][0] + ' · ' + x.planned_minutes + ' 分钟：' +
    escapeHtml(x.instruction_zh) + '</li>').join("") + '</ul><div class="detail-title">本课词汇与短语</div>' +
    '<div class="vocab-chips">' + cards.map((x) => '<span class="vocab-chip">' + escapeHtml(x.term) +
    '</span>').join("") + '</div><div class="detail-bottom"><button class="primary-button" type="button" ' +
    'data-action="selected-words">背诵这节课的单词 ↗</button></div></div>';
}
function deckCards() {
  const now = Date.now();
  let list;
  if (state.deck === "all") {
    list = [...state.vocabulary];
  } else if (state.deck === "due") {
    list = state.vocabulary.filter((v) => {
      const p = vocabularyProgress(v.id);
      return p?.next_review_at && new Date(p.next_review_at).getTime() <= now &&
        !state.reviewedThisVisit.has(v.id);
    });
  } else {
    const lesson = selectedLesson();
    list = state.vocabulary.filter((v) => v.lesson_id === lesson?.id && !state.reviewedThisVisit.has(v.id));
  }
  return list;
}
function renderVocabulary() {
  document.querySelectorAll("[data-deck]").forEach((b) =>
    b.classList.toggle("active", b.dataset.deck === state.deck));
  const list = deckCards();
  $("deck-counter").textContent = "共 " + list.length + " 张卡片";
  if (!list.length) {
    state.activeCard = null;
    $("flashcards").innerHTML = '<div class="empty-card"><h3>这一组已经复习完成</h3><p>可以切换到其他词卡范围，或返回课程列表。</p></div>';
    return;
  }
  if (!list.some((v) => v.id === state.activeCard)) {
    state.activeCard = list[0].id;
    state.revealed = false;
  }
  const card = list.find((v) => v.id === state.activeCard);
  const index = list.findIndex((v) => v.id === card.id);
  const p = vocabularyProgress(card.id);
  const progressHint = p ? p.status + ' · 已复习 ' + p.review_count + ' 次' : "新单词";
  const answer = state.revealed ?
    '<div class="card-answer"><strong>' + escapeHtml(card.meaning_zh) +
    '</strong><p><em>' + escapeHtml(card.example_en) + '</em></p>' +
    (card.usage_note ? '<p>' + escapeHtml(card.usage_note) + '</p>' : "") + '</div>' :
    '<p>先在心里回忆中文意思，再翻开卡片</p>';
  const ratings = state.revealed ?
    '<div class="rating-buttons">' + [
      ["again", "忘记了"], ["hard", "较困难"], ["good", "记住了"], ["easy", "很熟练"]
    ].map(([value, label]) =>
      '<button type="button" data-rate="' + value + '" ' + (!state.learner || state.busy ? "disabled" : "") +
      '>' + label + '</button>').join("") + '</div>' :
    '<button class="primary-button" type="button" data-action="reveal">显示答案</button>';
  $("flashcards").innerHTML =
    '<div class="flashcard"><div class="card-meta"><span>' + (card.kind === "phrase" ? "PHRASE" : "WORD") +
    ' · ' + escapeHtml(progressHint) + '</span><span>' + (index + 1) + ' / ' + list.length +
    '</span></div><div class="card-main"><h3 lang="en">' + escapeHtml(card.term) +
    '</h3>' + answer + '</div><div class="card-controls">' +
    '<button class="outline-button" type="button" data-action="pronounce">▶ 美式发音</button>' +
    ratings + '</div>' +
    (!state.learner ? '<p class="helper">登录并绑定学习者账号后即可保存背诵评分。</p>' : '') + '</div>' +
    '<aside class="card-list"><h3>词卡目录</h3>' + list.map((v) =>
      '<button type="button" data-card="' + v.id + '" class="' + (v.id === card.id ? "active" : "") +
      '"><strong>' + escapeHtml(v.term) + '</strong><span>' +
      (v.kind === "phrase" ? "短语" : "单词") + '</span></button>').join("") + '</aside>';
}
function renderClaimPrompt() {
  const old = $("claim-banner");
  if (old) old.remove();
  if (!state.user || state.learner) return;
  const div = document.createElement("div");
  div.id = "claim-banner";
  div.className = "auth-callout";
  div.innerHTML = '<h3>首次登录：绑定 ChatGPT 学习记录</h3><p>当前账号尚未关联到学习者 xun。请在这里输入单独提供的一次性绑定码。绑定后，网页与三个 ChatGPT 练习聊天会读取同一套进度。</p>' +
    '<form id="claim-form"><label for="claim-code" class="muted">一次性绑定码</label>' +
    '<input id="claim-code" type="password" autocomplete="off" minlength="64" maxlength="64" required placeholder="输入 64 位绑定码">' +
    '<button type="submit" class="primary-button">绑定现有课程进度</button></form>';
  $("metrics").before(div);
}
function render() {
  renderClaimPrompt();
  renderMetrics();
  renderOverview();
  renderWeeks();
  renderVocabulary();
  switchTab(state.tab);
}
function switchTab(name) {
  state.tab = ["overview", "courses", "vocabulary"].includes(name) ? name : "overview";
  document.querySelectorAll(".panel").forEach((el) => el.hidden = el.id !== "panel-" + state.tab);
  document.querySelectorAll(".tab").forEach((el) => {
    const active = el.dataset.tab === state.tab;
    el.classList.toggle("active", active);
    if (active) el.setAttribute("aria-current", "page");
    else el.removeAttribute("aria-current");
  });
}
async function updateSession(mode, nextStatus) {
  if (!state.learner || state.busy) return;
  const lesson = currentLesson();
  if (!lesson || !formats[mode]) return;
  const prev = sessionProgress(lesson.id, mode);
  if (prev?.status === "completed") return;
  const el = $("minutes-" + mode);
  const minutes = nextStatus === "completed" ? Number(el?.value) : (prev?.minutes_practiced || 0);
  if (!Number.isInteger(minutes) || minutes < 0 || minutes > 240 || (nextStatus === "completed" && minutes < 1)) {
    notify("请填写 1–240 的实际练习分钟数。", true);
    return;
  }
  state.busy = true;
  try {
    const timestamp = new Date().toISOString();
    await requireQuery(supabase.from("english_session_progress").upsert({
      learner_id: state.learner.id, lesson_id: lesson.id, mode,
      status: nextStatus, minutes_practiced: minutes,
      feedback: prev?.feedback || "",
      started_at: prev?.started_at || timestamp,
      completed_at: nextStatus === "completed" ? (prev?.completed_at || timestamp) : null,
      updated_at: timestamp
    }, { onConflict: "learner_id,lesson_id,mode" }), "同步练习进度");
    await loadProgress();
    notify(formats[mode][0] + "已同步到 Supabase：" + (nextStatus === "completed" ? "完成" : "进行中") + "。");
    render();
  } catch (error) {
    notify(error.message || "进度同步失败", true);
  } finally {
    state.busy = false;
  }
}
function pronounce() {
  const card = state.vocabulary.find((v) => v.id === state.activeCard);
  if (!card) return;
  if (!("speechSynthesis" in window)) {
    notify("当前浏览器不支持朗读功能。", true);
    return;
  }
  speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(card.term);
  utterance.lang = "en-US";
  utterance.rate = 0.88;
  speechSynthesis.speak(utterance);
}
async function submitRating(result) {
  if (!state.learner || state.busy || !state.revealed) return;
  const cardId = state.activeCard;
  if (!cardId) return;
  state.busy = true;
  renderVocabulary();
  try {
    await requireQuery(supabase.from("english_review_events").insert({
      learner_id: state.learner.id,
      vocabulary_id: cardId,
      result,
      event_key: crypto.randomUUID()
    }), "保存复习结果");
    const updated = await requireQuery(supabase.from("english_vocabulary_progress").select("*")
      .eq("learner_id", state.learner.id).eq("vocabulary_id", cardId).single(), "获取复习计划");
    state.vocabularyProgress = state.vocabularyProgress.filter((v) => v.vocabulary_id !== cardId).concat([updated]);
    state.reviewedThisVisit.add(cardId);
    state.activeCard = null;
    state.revealed = false;
    notify("复习结果已保存。下次复习时间由 Supabase 自动安排。");
    renderMetrics();
  } catch (error) {
    notify(error.message || "保存失败", true);
  } finally {
    state.busy = false;
    renderVocabulary();
  }
}
function selectLesson(id) {
  if (!state.lessons.some((l) => l.id === id)) return;
  state.selectedLesson = id;
  state.activeCard = null;
  state.revealed = false;
  renderWeeks();
  renderVocabulary();
}
function openDialog() {
  const dialog = $("auth-dialog");
  if (!dialog.open) dialog.showModal();
}
async function sendMagicLink(event) {
  event.preventDefault();
  const email = $("auth-email").value.trim();
  const button = $("send-login");
  button.disabled = true;
  $("auth-message").textContent = "正在发送登录邮件…";
  try {
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: location.origin + "/blog/english/", shouldCreateUser: true }
    });
    if (error) throw error;
    $("auth-message").textContent = "登录链接已发送。如果收不到邮件，请检查垃圾邮箱及 Supabase Auth 邮件配置。";
  } catch (error) {
    $("auth-message").textContent = "发送失败：" + error.message;
  } finally {
    button.disabled = false;
  }
}
async function submitClaim(event) {
  event.preventDefault();
  if (!state.user || state.busy) return;
  state.busy = true;
  try {
    const code = $("claim-code")?.value.trim() || "";
    const value = await requireQuery(supabase.rpc("english_claim_learner", { p_code: code }), "绑定学习记录");
    if (!value) throw new Error("绑定失败：绑定码无效、已经使用、已过期或尝试次数过多。");
    notify("绑定成功！现在网页和 ChatGPT 可以使用同一学习者记录。");
    await refreshIdentity();
  } catch (error) {
    notify(error.message || "绑定失败", true);
  } finally {
    state.busy = false;
  }
}
document.addEventListener("click", async (event) => {
  const button = event.target.closest("button");
  if (!button) return;
  if (button.dataset.tab) { switchTab(button.dataset.tab); return; }
  if (button.dataset.lesson) { selectLesson(button.dataset.lesson); return; }
  if (button.dataset.card) { state.activeCard = button.dataset.card; state.revealed = false; renderVocabulary(); return; }
  if (button.dataset.deck) { state.deck = button.dataset.deck; state.activeCard = null; state.revealed = false; renderVocabulary(); return; }
  if (button.dataset.rate) { await submitRating(button.dataset.rate); return; }
  switch (button.dataset.action) {
    case "reveal": state.revealed = true; renderVocabulary(); break;
    case "pronounce": pronounce(); break;
    case "current-words": selectLesson(currentLesson()?.id); state.deck = "today"; switchTab("vocabulary"); renderVocabulary(); break;
    case "selected-words": state.deck = "today"; state.activeCard = null; switchTab("vocabulary"); renderVocabulary(); break;
    case "session-start": await updateSession(button.dataset.mode, "in_progress"); break;
    case "session-complete": await updateSession(button.dataset.mode, "completed"); break;
  }
});
$("auth-form").addEventListener("submit", sendMagicLink);
$("close-dialog").addEventListener("click", () => $("auth-dialog").close());
document.addEventListener("submit", (event) => {
  if (event.target.id === "claim-form") submitClaim(event);
});
$("account-button").addEventListener("click", async () => {
  if (state.user) {
    if (!confirm("退出当前 Supabase 登录账号？")) return;
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      await refreshIdentity();
      notify("已退出。课程内容仍可以公开浏览。");
    } catch (error) {
      notify(error.message || "退出失败", true);
    }
  } else {
    openDialog();
  }
});
async function init() {
  try {
    await loadCourse();
    await refreshIdentity();
  } catch (error) {
    $("connection").className = "connection error";
    $("connection").innerHTML = '<span class="dot"></span>连接失败';
    $("current-lesson").textContent = "课程加载失败。请检查网络和 Supabase 设置。";
    notify(error.message || "无法访问 Supabase", true);
  }
  supabase.auth.onAuthStateChange(() => {
    setTimeout(() => {
      if (state.course) refreshIdentity().catch((error) => notify(error.message, true));
    }, 0);
  });
}
init();
