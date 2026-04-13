const App = {
  currentPage: 'dashboard',
  state: {},

  init() {
    this.loadState();
    this.applyTheme();
    this.bindNav();
    this.bindMobileNav();
    this.route(location.hash.slice(1) || 'dashboard');
    window.addEventListener('hashchange', () => this.route(location.hash.slice(1)));
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
      if (this.getTheme() === 'auto') this.applyTheme();
    });
    this.updateStreakDisplay();
  },

  loadState() {
    const defaults = {
      profile: null,
      entries: [],
      wordBank: [],
      conversations: [],
      streak: 0,
      lastPracticeDate: null,
      currentModule: 1,
      moduleProgress: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
      assessmentDone: false,
      weaknesses: [],
      totalWords: 0,
      practiceCount: 0
    };
    const saved = localStorage.getItem('articulate_state');
    this.state = saved ? { ...defaults, ...JSON.parse(saved) } : defaults;
  },

  saveState() {
    localStorage.setItem('articulate_state', JSON.stringify(this.state));
  },

  bindNav() {
    document.querySelectorAll('.nav-item[data-page]').forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const page = item.dataset.page;
        location.hash = page;
      });
    });
  },

  bindMobileNav() {
    const toggle = document.getElementById('mobile-nav-toggle');
    const sidebar = document.getElementById('sidebar');
    const backdrop = document.getElementById('sidebar-backdrop');

    const openNav = () => {
      sidebar.classList.add('open');
      backdrop.classList.add('active');
    };
    const closeNav = () => {
      sidebar.classList.remove('open');
      backdrop.classList.remove('active');
    };

    const toggleHandler = (e) => {
      e.preventDefault();
      e.stopPropagation();
      sidebar.classList.contains('open') ? closeNav() : openNav();
    };

    if (toggle) {
      toggle.addEventListener('click', toggleHandler);
      toggle.addEventListener('touchend', toggleHandler);
    }
    if (backdrop) {
      backdrop.addEventListener('click', closeNav);
      backdrop.addEventListener('touchend', closeNav);
    }

    sidebar.querySelectorAll('.nav-item').forEach(item => {
      item.addEventListener('click', closeNav);
    });
  },

  route(page) {
    if (!page) page = 'dashboard';
    this.currentPage = page;

    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));

    const pageEl = document.getElementById(`page-${page}`);
    const navEl = document.querySelector(`.nav-item[data-page="${page}"]`);

    if (pageEl) pageEl.classList.add('active');
    if (navEl) navEl.classList.add('active');

    const renderers = {
      dashboard: () => this.renderDashboard(),
      practice: () => this.renderPractice(),
      quick: () => this.renderQuickMode(),
      conversation: () => this.renderConversation(),
      readlearn: () => this.renderReadLearn(),
      wordbank: () => this.renderWordBank(),
      archive: () => this.renderArchive(),
      course: () => this.renderCourse(),
      assessment: () => this.renderAssessment(),
      settings: () => this.renderSettings()
    };

    if (renderers[page]) renderers[page]();
  },

  // ===== STREAK =====
  checkStreak() {
    const today = new Date().toDateString();
    const last = this.state.lastPracticeDate;
    if (last === today) return;

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    if (last === yesterday.toDateString()) {
      this.state.streak += 1;
    } else if (last !== today) {
      this.state.streak = 1;
    }

    this.state.lastPracticeDate = today;
    this.state.practiceCount += 1;
    this.saveState();
    this.updateStreakDisplay();
  },

  updateStreakDisplay() {
    const el = document.getElementById('sidebar-streak');
    if (el) {
      el.textContent = this.state.streak;
    }
  },

  // ===== DASHBOARD =====
  renderDashboard() {
    const el = document.getElementById('page-dashboard');
    const todayEntries = this.state.entries.filter(e => e.date === new Date().toDateString());
    const avgScores = this.getAverageScores();
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const today = new Date().getDay();
    const schedule = ['Rest/Creative', 'Paragraph + Clarity', 'Analysis/Explanation', 'Essay Writing', 'Reflective Writing', 'Editing & Improvement', 'Creative/Philosophical'];

    el.innerHTML = `
      <div class="welcome-card card">
        <h2>Welcome back</h2>
        <p>Keep building your clarity, one thought at a time.</p>
        <div class="welcome-actions">
          <button class="btn" onclick="location.hash='practice'">Start Writing</button>
          <button class="btn" onclick="location.hash='quick'">Quick 5-min</button>
          <button class="btn" onclick="location.hash='conversation'">Practice Conversation</button>
        </div>
      </div>

      <div class="streak-display mt-24">
        <span class="streak-fire">&#128293;</span>
        <span class="streak-count">${this.state.streak}</span>
        <span class="streak-label">day streak &middot; ${this.state.practiceCount} total sessions &middot; ${this.state.totalWords.toLocaleString()} words written</span>
      </div>

      ${!this.state.assessmentDone ? `
      <div class="api-warning">
        <span>&#9888;&#65039;</span>
        <span>Take the <a href="#assessment" style="color:var(--accent);font-weight:600;">diagnostic assessment</a> to get personalised practice recommendations.</span>
      </div>` : ''}

      ${!API.isConfigured() ? `
      <div class="api-warning">
        <span>&#9888;&#65039;</span>
        <span>Add your Claude API key in <a href="#settings" style="color:var(--accent);font-weight:600;">Settings</a> to enable AI feedback on your writing.</span>
      </div>` : ''}

      <div class="grid grid-4 mt-24">
        <div class="card stat-card card-flat">
          <div class="stat-number">${this.state.entries.length}</div>
          <div class="stat-label">Pieces Written</div>
        </div>
        <div class="card stat-card card-flat">
          <div class="stat-number">${avgScores.clarity || '—'}</div>
          <div class="stat-label">Avg Clarity</div>
        </div>
        <div class="card stat-card card-flat">
          <div class="stat-number">${this.state.wordBank.length}</div>
          <div class="stat-label">Words Saved</div>
        </div>
        <div class="card stat-card card-flat">
          <div class="stat-number">${this.state.conversations.length}</div>
          <div class="stat-label">Conversations</div>
        </div>
      </div>

      <div class="grid grid-2 mt-24">
        <div class="card">
          <div class="card-header">
            <h4>Today's Schedule</h4>
            <span class="badge badge-accent">${dayNames[today]}</span>
          </div>
          <p style="font-size:15px;font-weight:500;color:var(--accent);margin-bottom:12px;">${schedule[today]}</p>
          <div>
            ${schedule.map((task, i) => `
              <div class="schedule-day" style="${i === today ? 'background:var(--accent-light);border-radius:6px;padding:12px;' : ''}">
                <span class="schedule-day-name" style="${i === today ? 'color:var(--accent)' : ''}">${dayNames[i]}</span>
                <span class="schedule-day-task">${task}</span>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="card">
          <div class="card-header">
            <h4>Your Progress</h4>
          </div>
          ${avgScores.clarity ? `
            <div class="score-bar">
              <span class="score-label">Clarity</span>
              <div class="score-track"><div class="score-fill" style="width:${avgScores.clarity * 10}%;background:var(--accent)"></div></div>
              <span class="score-value">${avgScores.clarity}</span>
            </div>
            <div class="score-bar">
              <span class="score-label">Structure</span>
              <div class="score-track"><div class="score-fill" style="width:${avgScores.structure * 10}%;background:var(--success)"></div></div>
              <span class="score-value">${avgScores.structure}</span>
            </div>
            <div class="score-bar">
              <span class="score-label">Precision</span>
              <div class="score-track"><div class="score-fill" style="width:${avgScores.precision * 10}%;background:var(--warning)"></div></div>
              <span class="score-value">${avgScores.precision}</span>
            </div>
            <div class="score-bar">
              <span class="score-label">Depth</span>
              <div class="score-track"><div class="score-fill" style="width:${avgScores.depth * 10}%;background:var(--danger)"></div></div>
              <span class="score-value">${avgScores.depth}</span>
            </div>
          ` : `
            <div class="empty-state" style="padding:20px;">
              <p class="text-secondary">Complete some writing exercises to see your scores here.</p>
            </div>
          `}

          ${this.state.weaknesses.length ? `
            <div class="mt-16">
              <h4 class="mb-8" style="font-size:13px;">Focus Areas</h4>
              <div class="flex gap-8" style="flex-wrap:wrap;">
                ${this.state.weaknesses.map(w => `<span class="badge badge-warning">${w}</span>`).join('')}
              </div>
            </div>
          ` : ''}
        </div>
      </div>

      ${this.state.entries.length ? `
      <div class="card mt-24">
        <div class="card-header">
          <h4>Recent Writing</h4>
          <a href="#archive" class="btn btn-ghost btn-sm">View All</a>
        </div>
        ${this.state.entries.slice(-3).reverse().map(entry => `
          <div class="archive-entry" style="margin-bottom:8px;" onclick="App.viewEntry('${entry.id}')">
            <div class="archive-entry-header">
              <span class="badge badge-accent">${PROMPTS[entry.category]?.label || entry.category}</span>
              <span class="archive-entry-date">${entry.date}</span>
            </div>
            <div class="archive-entry-prompt">${entry.prompt}</div>
            <div class="archive-entry-preview">${entry.text.substring(0, 150)}...</div>
          </div>
        `).join('')}
      </div>` : ''}
    `;
  },

  getAverageScores() {
    const withScores = this.state.entries.filter(e => e.feedback?.scores);
    if (!withScores.length) return {};
    const sum = { clarity: 0, structure: 0, precision: 0, depth: 0 };
    withScores.forEach(e => {
      sum.clarity += e.feedback.scores.clarity;
      sum.structure += e.feedback.scores.structure;
      sum.precision += e.feedback.scores.precision;
      sum.depth += e.feedback.scores.depth;
    });
    const n = withScores.length;
    return {
      clarity: (sum.clarity / n).toFixed(1),
      structure: (sum.structure / n).toFixed(1),
      precision: (sum.precision / n).toFixed(1),
      depth: (sum.depth / n).toFixed(1)
    };
  },

  // ===== PRACTICE =====
  renderPractice() {
    const el = document.getElementById('page-practice');
    const categories = Object.entries(PROMPTS);

    el.innerHTML = `
      <h2>Writing Practice</h2>
      <p class="page-subtitle">Choose a category or get a random prompt. Write, then get AI feedback.</p>

      <div class="flex gap-8 mb-24" style="flex-wrap:wrap;" id="category-tags">
        <span class="tag active" data-cat="random">Random</span>
        ${categories.map(([key, val]) => `<span class="tag" data-cat="${key}">${val.label}</span>`).join('')}
      </div>

      <div id="practice-area">
        <div class="text-center" style="padding:40px;">
          <button class="btn btn-primary btn-lg" onclick="App.generatePrompt()">Generate a Prompt</button>
        </div>
      </div>
    `;

    el.querySelectorAll('#category-tags .tag').forEach(tag => {
      tag.addEventListener('click', () => {
        el.querySelectorAll('#category-tags .tag').forEach(t => t.classList.remove('active'));
        tag.classList.add('active');
      });
    });
  },

  selectedCategory() {
    const active = document.querySelector('#category-tags .tag.active');
    return active?.dataset.cat === 'random' ? null : active?.dataset.cat;
  },

  currentPromptData: null,

  generatePrompt() {
    this.currentPromptData = getRandomPrompt(this.selectedCategory());
    const { prompt, task, category } = this.currentPromptData;
    const area = document.getElementById('practice-area');

    area.innerHTML = `
      <div class="prompt-display fade-in">
        <div class="prompt-category">${PROMPTS[category].label}</div>
        <div class="prompt-text">${prompt}</div>
        ${task ? '<div class="prompt-task">Task: ' + task + '</div>' : ''}
      </div>

      <textarea class="writing-area" id="writing-input" placeholder="Start writing here..." oninput="App.updateWordCount()"></textarea>
      <div class="flex-between">
        <div class="word-count" id="word-count">0 words</div>
        <div class="action-bar">
          <button class="btn btn-secondary" onclick="App.generatePrompt()">New Prompt</button>
          <button class="btn btn-primary" onclick="App.submitCurrentWriting()" id="submit-btn">
            ${API.isConfigured() ? 'Get Feedback' : 'Save Entry'}
          </button>
        </div>
      </div>

      <div id="feedback-area"></div>
    `;

    document.getElementById('writing-input').focus();
  },

  submitCurrentWriting() {
    if (!this.currentPromptData) return;
    const { category, prompt, task } = this.currentPromptData;
    this.submitWriting(category, prompt, task || '');
  },

  updateWordCount() {
    const text = document.getElementById('writing-input')?.value || '';
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const el = document.getElementById('word-count');
    if (el) el.textContent = `${words} word${words !== 1 ? 's' : ''}`;
  },

  async submitWriting(category, prompt, task) {
    const text = document.getElementById('writing-input').value.trim();
    if (!text) return alert('Write something first!');

    const words = text.split(/\s+/).length;
    const entry = {
      id: Date.now().toString(),
      date: new Date().toDateString(),
      prompt, task, category, text,
      wordCount: words,
      feedback: null,
      module: this.state.currentModule
    };

    const btn = document.getElementById('submit-btn');
    const feedbackArea = document.getElementById('feedback-area');

    if (API.isConfigured()) {
      btn.disabled = true;
      btn.innerHTML = '<span class="spinner" style="width:16px;height:16px;border-width:2px;"></span> Analysing...';
      feedbackArea.innerHTML = '<div class="loading"><div class="spinner"></div>Getting feedback on your writing...</div>';

      try {
        const feedback = await API.getWritingFeedback(text, prompt, task, {
          module: this.state.currentModule,
          weaknesses: this.state.weaknesses
        });
        entry.feedback = feedback;
        this.renderFeedback(feedback, text);
      } catch (err) {
        feedbackArea.innerHTML = `<div class="api-warning mt-16"><span>&#9888;&#65039;</span> ${err.message}</div>`;
      }

      btn.disabled = false;
      btn.textContent = 'Get Feedback';
    }

    this.state.entries.push(entry);
    this.state.totalWords += words;
    this.checkStreak();
    this.updateModuleProgress(category);
    this.saveState();
  },

  renderFeedback(feedback, originalText) {
    const area = document.getElementById('feedback-area');
    if (!feedback) return;

    const scoreColor = (score) => {
      if (score >= 8) return 'var(--success)';
      if (score >= 5) return 'var(--warning)';
      return 'var(--danger)';
    };

    area.innerHTML = `
      <div class="feedback-panel fade-in mt-24">
        <div class="feedback-header">
          <h3>Your Feedback</h3>
        </div>
        <div class="feedback-body">
          <div class="feedback-section">
            <h4>Overall</h4>
            <p style="font-size:14px;line-height:1.6;">${feedback.overallComment}</p>
          </div>

          <div class="feedback-section">
            <h4>Scores</h4>
            <div class="score-bar">
              <span class="score-label">Clarity</span>
              <div class="score-track"><div class="score-fill" style="width:${feedback.scores.clarity * 10}%;background:${scoreColor(feedback.scores.clarity)}"></div></div>
              <span class="score-value">${feedback.scores.clarity}/10</span>
            </div>
            <div class="score-bar">
              <span class="score-label">Structure</span>
              <div class="score-track"><div class="score-fill" style="width:${feedback.scores.structure * 10}%;background:${scoreColor(feedback.scores.structure)}"></div></div>
              <span class="score-value">${feedback.scores.structure}/10</span>
            </div>
            <div class="score-bar">
              <span class="score-label">Precision</span>
              <div class="score-track"><div class="score-fill" style="width:${feedback.scores.precision * 10}%;background:${scoreColor(feedback.scores.precision)}"></div></div>
              <span class="score-value">${feedback.scores.precision}/10</span>
            </div>
            <div class="score-bar">
              <span class="score-label">Depth</span>
              <div class="score-track"><div class="score-fill" style="width:${feedback.scores.depth * 10}%;background:${scoreColor(feedback.scores.depth)}"></div></div>
              <span class="score-value">${feedback.scores.depth}/10</span>
            </div>
          </div>

          <div class="feedback-section">
            <h4>Rewrite (Tighter Version)</h4>
            <div class="rewrite">${feedback.rewrite}</div>
          </div>

          <div class="before-after mt-16">
            <div class="before-after-panel before">
              <div class="before-after-label">Your Version</div>
              ${originalText}
            </div>
            <div class="before-after-panel after">
              <div class="before-after-label">Improved Version</div>
              ${feedback.rewrite}
            </div>
          </div>

          ${feedback.weaknesses?.length ? `
          <div class="feedback-section mt-24">
            <h4>Weaknesses to Work On</h4>
            <ul class="feedback-list weaknesses">
              ${feedback.weaknesses.map(w => `<li>${w}</li>`).join('')}
            </ul>
          </div>` : ''}

          ${feedback.strengths?.length ? `
          <div class="feedback-section">
            <h4>What You Did Well</h4>
            <ul class="feedback-list strengths">
              ${feedback.strengths.map(s => `<li>${s}</li>`).join('')}
            </ul>
          </div>` : ''}

          <div class="feedback-section">
            <h4>Key Tip</h4>
            <div class="tip-box">${feedback.tip}</div>
          </div>
        </div>
      </div>
    `;
  },

  updateModuleProgress(category) {
    const mod = this.state.currentModule;
    const moduleData = COURSE_MODULES[mod - 1];
    if (moduleData && moduleData.promptCategories.includes(category)) {
      this.state.moduleProgress[mod] = Math.min(100, (this.state.moduleProgress[mod] || 0) + 10);
      if (this.state.moduleProgress[mod] >= 100 && mod < 5) {
        this.state.currentModule = mod + 1;
      }
    }
    this.saveState();
  },

  // ===== QUICK MODE =====
  renderQuickMode() {
    const el = document.getElementById('page-quick');
    el.innerHTML = `
      <h2>Quick 5-Minute Mode</h2>
      <p class="page-subtitle">Short, focused exercises. Perfect for busy days.</p>
      <div id="quick-area" class="text-center" style="padding:40px;">
        <button class="btn btn-primary btn-lg" onclick="App.startQuickExercise()">Start Exercise</button>
      </div>
    `;
  },

  quickTimer: null,
  quickSeconds: 300,

  startQuickExercise() {
    const exercise = getQuickExercise();
    this.quickSeconds = 300;
    const area = document.getElementById('quick-area');

    area.innerHTML = `
      <div class="quick-card fade-in">
        <div class="quick-timer" id="quick-timer">5:00</div>
        <div class="quick-instruction">${exercise.instruction}</div>
        <div class="quick-content">${exercise.content}</div>
        <textarea class="writing-area" id="quick-input" placeholder="Your response..." style="min-height:150px;text-align:left;" oninput="App.updateWordCount()"></textarea>
        <div class="word-count" id="word-count">0 words</div>
        <div class="action-bar mt-16" style="justify-content:center;">
          <button class="btn btn-secondary" onclick="App.startQuickExercise()">Skip / New</button>
          <button class="btn btn-primary" id="quick-submit" onclick="App.submitQuick(${JSON.stringify(exercise).replace(/"/g, '&quot;')})">Submit</button>
        </div>
      </div>
      <div id="quick-feedback"></div>
    `;

    document.getElementById('quick-input').focus();

    clearInterval(this.quickTimer);
    this.quickTimer = setInterval(() => {
      this.quickSeconds--;
      const min = Math.floor(this.quickSeconds / 60);
      const sec = this.quickSeconds % 60;
      const timerEl = document.getElementById('quick-timer');
      if (timerEl) timerEl.textContent = `${min}:${sec.toString().padStart(2, '0')}`;
      if (this.quickSeconds <= 0) {
        clearInterval(this.quickTimer);
        if (timerEl) timerEl.textContent = "Time's up!";
      }
    }, 1000);
  },

  async submitQuick(exercise) {
    const text = document.getElementById('quick-input').value.trim();
    if (!text) return alert('Write something first!');

    clearInterval(this.quickTimer);

    const words = text.split(/\s+/).length;
    this.state.totalWords += words;
    this.checkStreak();
    this.saveState();

    if (!API.isConfigured()) {
      document.getElementById('quick-feedback').innerHTML = '<div class="tip-box mt-16">Entry saved! Add your API key in Settings to get AI feedback.</div>';
      return;
    }

    const btn = document.getElementById('quick-submit');
    const feedbackArea = document.getElementById('quick-feedback');
    btn.disabled = true;
    btn.innerHTML = '<span class="spinner" style="width:16px;height:16px;border-width:2px;"></span>';
    feedbackArea.innerHTML = '<div class="loading"><div class="spinner"></div>Getting feedback...</div>';

    try {
      const feedback = await API.getQuickFeedback(exercise, text);
      feedbackArea.innerHTML = `
        <div class="card fade-in mt-24">
          <div class="flex-between mb-16">
            <h4>Feedback</h4>
            <span class="badge ${feedback.score >= 7 ? 'badge-success' : feedback.score >= 5 ? 'badge-warning' : 'badge-danger'}">${feedback.score}/10</span>
          </div>
          <p style="font-size:14px;line-height:1.6;margin-bottom:16px;">${feedback.comment}</p>
          ${feedback.improved ? `
            <div class="before-after">
              <div class="before-after-panel before">
                <div class="before-after-label">Yours</div>
                ${text}
              </div>
              <div class="before-after-panel after">
                <div class="before-after-label">Improved</div>
                ${feedback.improved}
              </div>
            </div>
          ` : ''}
          <div class="mt-16 text-center">
            <button class="btn btn-primary" onclick="App.startQuickExercise()">Next Exercise</button>
          </div>
        </div>
      `;
    } catch (err) {
      feedbackArea.innerHTML = `<div class="api-warning mt-16"><span>&#9888;&#65039;</span> ${err.message}</div>`;
    }

    btn.disabled = false;
    btn.textContent = 'Submit';
  },

  // ===== CONVERSATION =====
  renderConversation() {
    const el = document.getElementById('page-conversation');

    el.innerHTML = `
      <h2>Conversation Practice</h2>
      <p class="page-subtitle">Practice real conversations with AI. Build your social and communication skills.</p>

      ${!API.isConfigured() ? `
      <div class="api-warning">
        <span>&#9888;&#65039;</span>
        <span>Conversation mode requires a Claude API key. Add it in <a href="#settings" style="color:var(--accent);font-weight:600;">Settings</a>.</span>
      </div>` : ''}

      <div class="grid grid-2" id="scenario-list">
        ${CONVERSATION_SCENARIOS.map(s => `
          <div class="card scenario-card" onclick="App.startConversation('${s.id}')" ${!API.isConfigured() ? 'style="opacity:0.5;pointer-events:none;"' : ''}>
            <h4>${s.title}</h4>
            <p style="font-size:14px;color:var(--text-secondary);margin-top:4px;line-height:1.5;">${s.description}</p>
            <span class="badge difficulty ${s.difficulty === 'beginner' ? 'badge-success' : s.difficulty === 'intermediate' ? 'badge-warning' : 'badge-danger'} mt-8">${s.difficulty}</span>
          </div>
        `).join('')}
      </div>

      <div id="conversation-area" class="hidden"></div>
    `;
  },

  conversationMessages: [],
  currentScenario: null,

  async startConversation(scenarioId) {
    const scenario = CONVERSATION_SCENARIOS.find(s => s.id === scenarioId);
    if (!scenario) return;

    this.currentScenario = scenario;
    this.conversationMessages = [];

    document.getElementById('scenario-list').classList.add('hidden');
    const area = document.getElementById('conversation-area');
    area.classList.remove('hidden');

    area.innerHTML = `
      <div class="card mb-16">
        <div class="flex-between">
          <div>
            <h4>${scenario.title}</h4>
            <p style="font-size:14px;color:var(--text-secondary);">${scenario.description}</p>
          </div>
          <button class="btn btn-secondary btn-sm" onclick="App.endConversation()">End</button>
        </div>
      </div>
      <div class="card chat-container">
        <div class="chat-messages" id="chat-messages">
          <div class="loading"><div class="spinner"></div>Starting conversation...</div>
        </div>
        <div class="chat-input-area">
          <input type="text" id="chat-input" placeholder="Type your response..." onkeydown="if(event.key==='Enter')App.sendChatMessage()">
          <button class="btn btn-primary" onclick="App.sendChatMessage()" id="chat-send">Send</button>
        </div>
      </div>
    `;

    try {
      const response = await API.getConversationResponse(
        [{ role: 'user', content: 'Start the conversation. Say something to begin the scenario naturally.' }],
        scenario
      );
      this.conversationMessages.push({ role: 'assistant', content: response });
      this.renderChatMessages();
      document.getElementById('chat-input').focus();
    } catch (err) {
      document.getElementById('chat-messages').innerHTML = `<div class="api-warning"><span>&#9888;&#65039;</span> ${err.message}</div>`;
    }
  },

  async sendChatMessage() {
    const input = document.getElementById('chat-input');
    const text = input.value.trim();
    if (!text) return;

    input.value = '';
    this.conversationMessages.push({ role: 'user', content: text });
    this.renderChatMessages();

    const btn = document.getElementById('chat-send');
    btn.disabled = true;
    input.disabled = true;

    const messagesEl = document.getElementById('chat-messages');
    const typingEl = document.createElement('div');
    typingEl.className = 'chat-bubble assistant';
    typingEl.innerHTML = '<span class="spinner" style="width:16px;height:16px;border-width:2px;"></span>';
    messagesEl.appendChild(typingEl);
    messagesEl.scrollTop = messagesEl.scrollHeight;

    try {
      const response = await API.getConversationResponse(this.conversationMessages, this.currentScenario);
      this.conversationMessages.push({ role: 'assistant', content: response });
      this.renderChatMessages();
    } catch (err) {
      typingEl.innerHTML = `Error: ${err.message}`;
    }

    btn.disabled = false;
    input.disabled = false;
    input.focus();
  },

  renderChatMessages() {
    const el = document.getElementById('chat-messages');
    el.innerHTML = this.conversationMessages.map(m => `
      <div class="chat-bubble ${m.role} fade-in">${m.content}</div>
    `).join('');
    el.scrollTop = el.scrollHeight;
  },

  endConversation() {
    if (this.conversationMessages.length > 1) {
      this.state.conversations.push({
        id: Date.now().toString(),
        scenario: this.currentScenario.title,
        messages: [...this.conversationMessages],
        date: new Date().toDateString()
      });
      this.checkStreak();
      this.saveState();
    }
    this.renderConversation();
  },

  // ===== READ & LEARN =====
  renderReadLearn() {
    const el = document.getElementById('page-readlearn');

    el.innerHTML = `
      <h2>Read & Learn</h2>
      <p class="page-subtitle">Build the input side. Read passages, absorb vocabulary in context, and learn to steal good structure.</p>

      <div class="tabs" id="readlearn-tabs">
        <button class="tab active" data-tab="explain">Explain Back</button>
        <button class="tab" data-tab="simplify">Simplify It</button>
        <button class="tab" data-tab="structure">Steal the Structure</button>
        <button class="tab" data-tab="vocab">Vocab in Context</button>
      </div>

      <div id="readlearn-area">
        <div id="readlearn-explain" class="readlearn-tab-content active"></div>
        <div id="readlearn-simplify" class="readlearn-tab-content"></div>
        <div id="readlearn-structure" class="readlearn-tab-content"></div>
        <div id="readlearn-vocab" class="readlearn-tab-content"></div>
      </div>
    `;

    el.querySelectorAll('#readlearn-tabs .tab').forEach(tab => {
      tab.addEventListener('click', () => {
        el.querySelectorAll('#readlearn-tabs .tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        el.querySelectorAll('.readlearn-tab-content').forEach(c => c.classList.remove('active'));
        document.getElementById(`readlearn-${tab.dataset.tab}`).classList.add('active');
        this.renderReadLearnTab(tab.dataset.tab);
      });
    });

    this.renderReadLearnTab('explain');
  },

  renderReadLearnTab(tab) {
    const renderers = {
      explain: () => this.renderExplainBack(),
      simplify: () => this.renderSimplify(),
      structure: () => this.renderStealStructure(),
      vocab: () => this.renderVocabInContext()
    };
    if (renderers[tab]) renderers[tab]();
  },

  renderExplainBack() {
    const el = document.getElementById('readlearn-explain');
    el.innerHTML = `
      <div class="card">
        <h4>Read & Explain Back</h4>
        <p class="text-secondary mt-4 mb-16">Read the passage carefully, then explain the main ideas in your own words. Don't just paraphrase — show you understood it.</p>
        <button class="btn btn-primary" onclick="App.startExplainBack()">Get a Passage</button>
      </div>
      <div id="explain-back-area"></div>
    `;
  },

  startExplainBack() {
    const passage = randomFrom(READ_LEARN_PASSAGES);
    const area = document.getElementById('explain-back-area');

    area.innerHTML = `
      <div class="card fade-in mt-16">
        <div class="flex-between mb-8">
          <h4>${passage.title}</h4>
          <span class="text-secondary" style="font-size:12px;">${passage.source}</span>
        </div>
        <div class="rewrite" style="font-size:16px;line-height:1.9;border-left-color:var(--accent);">${passage.text}</div>
        <div class="flex gap-8 mt-12" style="flex-wrap:wrap;">
          ${passage.keywords.map(k => `<span class="tag">${k}</span>`).join('')}
        </div>
      </div>

      <div class="card mt-16">
        <h4 class="mb-8">Now explain it in your own words</h4>
        <p class="text-secondary mb-12" style="font-size:13px;">What is the main idea? What are the key points? Why does it matter?</p>
        <textarea class="writing-area" id="explain-back-input" placeholder="In my own words, this passage is about..." style="min-height:180px;"></textarea>
        <div class="action-bar mt-12">
          <button class="btn btn-secondary" onclick="App.startExplainBack()">Different Passage</button>
          <button class="btn btn-primary" id="explain-back-submit" onclick="App.submitExplainBack('${passage.id}', 'explain')">Get Feedback</button>
        </div>
      </div>
      <div id="explain-back-feedback"></div>
    `;
  },

  renderSimplify() {
    const el = document.getElementById('readlearn-simplify');
    el.innerHTML = `
      <div class="card">
        <h4>Explain It Simply</h4>
        <p class="text-secondary mt-4 mb-16">Read the passage, then explain it as if you're talking to a 10-year-old. Use simple words, analogies, and examples. This forces real understanding.</p>
        <button class="btn btn-primary" onclick="App.startSimplify()">Get a Passage</button>
      </div>
      <div id="simplify-area"></div>
    `;
  },

  startSimplify() {
    const passage = randomFrom(READ_LEARN_PASSAGES);
    const area = document.getElementById('simplify-area');

    area.innerHTML = `
      <div class="card fade-in mt-16">
        <div class="flex-between mb-8">
          <h4>${passage.title}</h4>
          <span class="text-secondary" style="font-size:12px;">${passage.source}</span>
        </div>
        <div class="rewrite" style="font-size:16px;line-height:1.9;border-left-color:var(--warning);">${passage.text}</div>
      </div>

      <div class="card mt-16">
        <h4 class="mb-8">Now explain it to a 10-year-old</h4>
        <p class="text-secondary mb-12" style="font-size:13px;">No big words. Use stories, examples, or "imagine if..." to make it click.</p>
        <textarea class="writing-area" id="simplify-input" placeholder="So basically, imagine you're..." style="min-height:180px;"></textarea>
        <div class="action-bar mt-12">
          <button class="btn btn-secondary" onclick="App.startSimplify()">Different Passage</button>
          <button class="btn btn-primary" id="simplify-submit" onclick="App.submitSimplify('${passage.id}')">Get Feedback</button>
        </div>
      </div>
      <div id="simplify-feedback"></div>
    `;
  },

  async submitExplainBack(passageId, mode) {
    const input = document.getElementById('explain-back-input');
    const text = input ? input.value.trim() : '';
    if (!text) return alert('Write your explanation first!');

    const passage = READ_LEARN_PASSAGES.find(p => p.id === passageId);
    if (!passage) return;

    this.state.totalWords += text.split(/\s+/).length;
    this.checkStreak();
    this.saveState();

    if (!API.isConfigured()) {
      document.getElementById('explain-back-feedback').innerHTML = '<div class="tip-box mt-16">Entry saved! Add your API key in Settings for AI feedback.</div>';
      return;
    }

    const btn = document.getElementById('explain-back-submit');
    const feedbackArea = document.getElementById('explain-back-feedback');
    btn.disabled = true;
    btn.innerHTML = '<span class="spinner" style="width:16px;height:16px;border-width:2px;"></span> Analysing...';
    feedbackArea.innerHTML = '<div class="loading"><div class="spinner"></div>Evaluating your explanation...</div>';

    try {
      const feedback = await API.getReadComprehensionFeedback(passage.text, text, mode);
      feedbackArea.innerHTML = `
        <div class="feedback-panel fade-in mt-16">
          <div class="feedback-header"><h3>Feedback</h3></div>
          <div class="feedback-body">
            <p style="font-size:14px;line-height:1.6;margin-bottom:16px;">${feedback.comment}</p>

            <div class="grid grid-2 mb-16">
              <div class="score-bar">
                <span class="score-label">Clarity</span>
                <div class="score-track"><div class="score-fill" style="width:${feedback.clarity * 10}%;background:var(--accent)"></div></div>
                <span class="score-value">${feedback.clarity}/10</span>
              </div>
              <div class="score-bar">
                <span class="score-label">${mode === 'simplify' ? 'Creativity' : 'Depth'}</span>
                <div class="score-track"><div class="score-fill" style="width:${(feedback.depth || feedback.creativity || 5) * 10}%;background:var(--success)"></div></div>
                <span class="score-value">${feedback.depth || feedback.creativity || 5}/10</span>
              </div>
            </div>

            ${feedback.missedPoints?.length ? `
              <div class="feedback-section">
                <h4>Key Points You Missed</h4>
                <ul class="feedback-list weaknesses">
                  ${feedback.missedPoints.map(p => `<li>${p}</li>`).join('')}
                </ul>
              </div>
            ` : '<div class="badge badge-success mb-16">You captured all the key points!</div>'}

            <div class="feedback-section">
              <h4>Model Explanation</h4>
              <div class="rewrite">${feedback.betterExplanation || feedback.betterVersion || ''}</div>
            </div>

            <div class="before-after mt-16">
              <div class="before-after-panel before">
                <div class="before-after-label">Your Version</div>
                ${text}
              </div>
              <div class="before-after-panel after">
                <div class="before-after-label">Model Version</div>
                ${feedback.betterExplanation || feedback.betterVersion || ''}
              </div>
            </div>
          </div>
        </div>
      `;
    } catch (err) {
      feedbackArea.innerHTML = `<div class="api-warning mt-16"><span>&#9888;&#65039;</span> ${err.message}</div>`;
    }

    btn.disabled = false;
    btn.textContent = 'Get Feedback';
  },

  async submitSimplify(passageId) {
    const input = document.getElementById('simplify-input');
    const text = input ? input.value.trim() : '';
    if (!text) return alert('Write your simplified explanation first!');

    const passage = READ_LEARN_PASSAGES.find(p => p.id === passageId);
    if (!passage) return;

    this.state.totalWords += text.split(/\s+/).length;
    this.checkStreak();
    this.saveState();

    if (!API.isConfigured()) {
      document.getElementById('simplify-feedback').innerHTML = '<div class="tip-box mt-16">Entry saved! Add your API key in Settings for AI feedback.</div>';
      return;
    }

    const btn = document.getElementById('simplify-submit');
    const feedbackArea = document.getElementById('simplify-feedback');
    btn.disabled = true;
    btn.innerHTML = '<span class="spinner" style="width:16px;height:16px;border-width:2px;"></span> Analysing...';
    feedbackArea.innerHTML = '<div class="loading"><div class="spinner"></div>Evaluating...</div>';

    try {
      const feedback = await API.getReadComprehensionFeedback(passage.text, text, 'simplify');
      feedbackArea.innerHTML = `
        <div class="feedback-panel fade-in mt-16">
          <div class="feedback-header"><h3>Feedback</h3></div>
          <div class="feedback-body">
            <p style="font-size:14px;line-height:1.6;margin-bottom:16px;">${feedback.comment}</p>

            <div class="flex gap-16 mb-16">
              <span class="badge ${feedback.childFriendly ? 'badge-success' : 'badge-warning'}">${feedback.childFriendly ? 'Child-friendly' : 'Still too complex'}</span>
              <span class="badge ${feedback.meaningPreserved ? 'badge-success' : 'badge-danger'}">${feedback.meaningPreserved ? 'Meaning preserved' : 'Lost some meaning'}</span>
            </div>

            <div class="grid grid-2 mb-16">
              <div class="score-bar">
                <span class="score-label">Clarity</span>
                <div class="score-track"><div class="score-fill" style="width:${feedback.clarity * 10}%;background:var(--accent)"></div></div>
                <span class="score-value">${feedback.clarity}/10</span>
              </div>
              <div class="score-bar">
                <span class="score-label">Creativity</span>
                <div class="score-track"><div class="score-fill" style="width:${feedback.creativity * 10}%;background:var(--success)"></div></div>
                <span class="score-value">${feedback.creativity}/10</span>
              </div>
            </div>

            <div class="feedback-section">
              <h4>Model Simplified Version</h4>
              <div class="rewrite">${feedback.betterVersion}</div>
            </div>

            <div class="before-after mt-16">
              <div class="before-after-panel before">
                <div class="before-after-label">Your Version</div>
                ${text}
              </div>
              <div class="before-after-panel after">
                <div class="before-after-label">Model Version</div>
                ${feedback.betterVersion}
              </div>
            </div>
          </div>
        </div>
      `;
    } catch (err) {
      feedbackArea.innerHTML = `<div class="api-warning mt-16"><span>&#9888;&#65039;</span> ${err.message}</div>`;
    }

    btn.disabled = false;
    btn.textContent = 'Get Feedback';
  },

  renderStealStructure() {
    const el = document.getElementById('readlearn-structure');

    el.innerHTML = `
      <div class="card">
        <h4>Steal the Structure</h4>
        <p class="text-secondary mt-4 mb-16">Read a well-written piece. Identify its structural skeleton. Then write your own content on that same skeleton. This is how you internalise good writing patterns.</p>
      </div>

      ${STRUCTURE_EXERCISES.map(ex => `
        <div class="card mt-16">
          <h4 class="mb-12">${ex.title}</h4>

          <div class="mb-12">
            <label style="font-size:12px;text-transform:uppercase;letter-spacing:1px;color:var(--accent);">Model Piece</label>
            <div class="rewrite" style="font-size:15px;line-height:1.8;white-space:pre-line;">${ex.model}</div>
          </div>

          <div class="mb-12">
            <label style="font-size:12px;text-transform:uppercase;letter-spacing:1px;color:var(--success);">The Skeleton</label>
            <div style="background:var(--success-light);padding:12px 16px;border-radius:var(--radius-sm);font-size:14px;font-weight:500;">
              ${ex.skeleton}
            </div>
          </div>

          <div class="mb-12">
            <label style="font-size:12px;text-transform:uppercase;letter-spacing:1px;color:var(--warning);">Your Turn</label>
            <p style="font-size:14px;color:var(--text);margin-bottom:8px;">${ex.topic}</p>
            <textarea class="writing-area" id="structure-input-${ex.id}" placeholder="Write your version using the same structure..." style="min-height:200px;"></textarea>
          </div>

          <div class="action-bar">
            <button class="btn btn-primary" onclick="App.submitStructureExercise('${ex.id}')">
              ${API.isConfigured() ? 'Get Feedback' : 'Save'}
            </button>
          </div>
          <div id="structure-feedback-${ex.id}"></div>
        </div>
      `).join('')}
    `;
  },

  async submitStructureExercise(exerciseId) {
    const input = document.getElementById('structure-input-' + exerciseId);
    const text = input ? input.value.trim() : '';
    if (!text) return alert('Write your version first!');

    const exercise = STRUCTURE_EXERCISES.find(e => e.id === exerciseId);
    if (!exercise) return;

    this.state.totalWords += text.split(/\s+/).length;
    this.checkStreak();
    this.saveState();

    if (!API.isConfigured()) {
      document.getElementById('structure-feedback-' + exerciseId).innerHTML = '<div class="tip-box mt-16">Saved! Add your API key for AI feedback.</div>';
      return;
    }

    const feedbackArea = document.getElementById('structure-feedback-' + exerciseId);
    feedbackArea.innerHTML = '<div class="loading"><div class="spinner"></div>Analysing structure...</div>';

    try {
      const passageText = 'Model piece:\n' + exercise.model + '\n\nExpected skeleton: ' + exercise.skeleton;
      const feedback = await API.getReadComprehensionFeedback(passageText, text, 'structure');

      let html = '<div class="card fade-in mt-16" style="border-color:var(--accent);">';
      html += '<h4 class="mb-8">Structure Feedback</h4>';
      html += '<p style="font-size:14px;line-height:1.6;">' + feedback.comment + '</p>';
      html += '<div class="score-bar mt-12"><span class="score-label">Score</span>';
      html += '<div class="score-track"><div class="score-fill" style="width:' + (feedback.score * 10) + '%;background:var(--accent)"></div></div>';
      html += '<span class="score-value">' + feedback.score + '/10</span></div>';

      if (feedback.insights && feedback.insights.length) {
        html += '<div class="mt-12"><h4 style="font-size:13px;">What you did well</h4>';
        html += '<ul class="feedback-list strengths">' + feedback.insights.map(function(i) { return '<li>' + i + '</li>'; }).join('') + '</ul></div>';
      }
      if (feedback.missed && feedback.missed.length) {
        html += '<div class="mt-12"><h4 style="font-size:13px;">What you missed</h4>';
        html += '<ul class="feedback-list weaknesses">' + feedback.missed.map(function(m) { return '<li>' + m + '</li>'; }).join('') + '</ul></div>';
      }
      html += '</div>';
      feedbackArea.innerHTML = html;
    } catch (err) {
      feedbackArea.innerHTML = '<div class="api-warning mt-16"><span>&#9888;&#65039;</span> ' + err.message + '</div>';
    }
  },

  renderVocabInContext() {
    const el = document.getElementById('readlearn-vocab');

    el.innerHTML = `
      <div class="card">
        <h4>Vocabulary in Context</h4>
        <p class="text-secondary mt-4 mb-16">Encounter words in real writing, not flashcards. Read the passage, study the highlighted vocabulary, then practice using the words yourself.</p>
        <button class="btn btn-primary" onclick="App.startVocabInContext()">Get a Passage</button>
      </div>
      <div id="vocab-context-area"></div>
    `;
  },

  startVocabInContext() {
    const passage = randomFrom(READ_LEARN_PASSAGES);
    const area = document.getElementById('vocab-context-area');

    let highlightedText = passage.text;
    passage.vocabWords.forEach(vw => {
      const regex = new RegExp('(\\b' + vw.word + '\\b)', 'gi');
      highlightedText = highlightedText.replace(regex, '<mark style="background:var(--warning-light);padding:2px 4px;border-radius:3px;font-weight:500;">$1</mark>');
    });

    area.innerHTML = `
      <div class="card fade-in mt-16">
        <div class="flex-between mb-8">
          <h4>${passage.title}</h4>
          <span class="text-secondary" style="font-size:12px;">${passage.source}</span>
        </div>
        <div class="rewrite" style="font-size:16px;line-height:1.9;border-left-color:var(--warning);">
          ${highlightedText}
        </div>
      </div>

      <div class="card mt-16">
        <h4 class="mb-16">Vocabulary from this passage</h4>
        <div class="grid grid-3">
          ${passage.vocabWords.map(vw => `
            <div class="word-card">
              <div class="word">${vw.word}</div>
              <div class="definition">${vw.definition}</div>
              <div class="example">"${vw.example}"</div>
              <button class="btn btn-ghost btn-sm mt-8" onclick="App.addWordFromPassage('${vw.word.replace(/'/g, "\\'")}', '${vw.definition.replace(/'/g, "\\'")}', '${vw.example.replace(/'/g, "\\'")}')">
                + Add to Word Bank
              </button>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="card mt-16">
        <h4 class="mb-8">Practice: Use these words</h4>
        <p class="text-secondary mb-12" style="font-size:13px;">Write a short paragraph (3-5 sentences) that uses at least 2 of the vocabulary words above. Try to make it natural, not forced.</p>
        <textarea class="writing-area" id="vocab-practice-input" placeholder="Write your paragraph here using the vocabulary words..." style="min-height:140px;"></textarea>
        <div class="action-bar mt-12">
          <button class="btn btn-secondary" onclick="App.startVocabInContext()">Different Passage</button>
          <button class="btn btn-primary" onclick="App.submitVocabPractice('${passage.id}')">
            ${API.isConfigured() ? 'Get Feedback' : 'Save'}
          </button>
        </div>
        <div id="vocab-practice-feedback"></div>
      </div>
    `;
  },

  addWordFromPassage(word, definition, example) {
    const exists = this.state.wordBank.find(w => w.word.toLowerCase() === word.toLowerCase());
    if (exists) {
      alert('"' + word + '" is already in your word bank!');
      return;
    }

    this.state.wordBank.push({
      id: Date.now().toString(),
      word, definition,
      synonyms: [],
      example,
      userSentence: '',
      dateAdded: new Date().toDateString(),
      timesUsed: 0
    });
    this.saveState();
    alert('"' + word + '" added to your word bank!');
  },

  async submitVocabPractice(passageId) {
    const text = document.getElementById('vocab-practice-input')?.value.trim();
    if (!text) return alert('Write something first!');

    const passage = READ_LEARN_PASSAGES.find(p => p.id === passageId);
    if (!passage) return;

    this.state.totalWords += text.split(/\s+/).length;
    this.checkStreak();
    this.saveState();

    if (!API.isConfigured()) {
      document.getElementById('vocab-practice-feedback').innerHTML = '<div class="tip-box mt-16">Saved! Add your API key for feedback.</div>';
      return;
    }

    const feedbackArea = document.getElementById('vocab-practice-feedback');
    feedbackArea.innerHTML = '<div class="loading"><div class="spinner"></div>Checking vocabulary usage...</div>';

    try {
      const vocabList = passage.vocabWords.map(w => w.word).join(', ');
      const feedback = await API.getQuickFeedback(
        { instruction: 'Use at least 2 of these vocabulary words naturally in a paragraph: ' + vocabList, content: vocabList },
        text
      );
      feedbackArea.innerHTML = `
        <div class="card fade-in mt-16" style="border-color:var(--success);">
          <div class="flex-between mb-8">
            <h4>Feedback</h4>
            <span class="badge ${feedback.score >= 7 ? 'badge-success' : feedback.score >= 5 ? 'badge-warning' : 'badge-danger'}">${feedback.score}/10</span>
          </div>
          <p style="font-size:14px;line-height:1.6;">${feedback.comment}</p>
          ${feedback.improved ? `
            <div class="mt-12">
              <h4 style="font-size:13px;margin-bottom:8px;">Improved version</h4>
              <div class="rewrite">${feedback.improved}</div>
            </div>
          ` : ''}
        </div>
      `;
    } catch (err) {
      feedbackArea.innerHTML = `<div class="api-warning mt-16"><span>&#9888;&#65039;</span> ${err.message}</div>`;
    }
  },

  // ===== WORD BANK =====
  renderWordBank() {
    const el = document.getElementById('page-wordbank');

    el.innerHTML = `
      <h2>Word Bank</h2>
      <p class="page-subtitle">Build your vocabulary. Save words, definitions, and practice using them.</p>

      <div class="card mb-24">
        <h4 class="mb-16">Add a New Word</h4>
        <div class="grid grid-2 gap-16">
          <div>
            <label>Word</label>
            <input type="text" id="wb-word" placeholder="e.g., resilience">
          </div>
          <div>
            <label>Definition</label>
            <input type="text" id="wb-definition" placeholder="The ability to recover from difficulties">
          </div>
        </div>
        <div class="grid grid-2 gap-16 mt-16">
          <div>
            <label>Synonyms (comma-separated)</label>
            <input type="text" id="wb-synonyms" placeholder="toughness, endurance, grit">
          </div>
          <div>
            <label>Example Sentence</label>
            <input type="text" id="wb-example" placeholder="Her resilience helped her through the hardest year of her life.">
          </div>
        </div>
        <button class="btn btn-primary mt-16" onclick="App.addWord()">Add to Word Bank</button>
      </div>

      ${this.state.wordBank.length ? `
        <div class="flex-between mb-16">
          <h4>${this.state.wordBank.length} words saved</h4>
          <button class="btn btn-secondary btn-sm" onclick="App.practiceWordBank()">Practice Words</button>
        </div>
        <div class="grid grid-2">
          ${this.state.wordBank.map((w, i) => `
            <div class="word-card">
              <div class="flex-between">
                <div class="word">${w.word}</div>
                <button class="btn btn-ghost btn-sm" onclick="App.removeWord(${i})" title="Remove" style="color:var(--danger);">&#10005;</button>
              </div>
              <div class="definition">${w.definition}</div>
              ${w.synonyms?.length ? `
              <div class="synonyms">
                ${w.synonyms.map(s => `<span class="tag">${s}</span>`).join('')}
              </div>` : ''}
              ${w.example ? `<div class="example">"${w.example}"</div>` : ''}
              ${w.userSentence ? `<div class="example mt-8" style="border-color:var(--accent);">"${w.userSentence}" <span class="badge badge-accent">yours</span></div>` : ''}
            </div>
          `).join('')}
        </div>
      ` : `
        <div class="empty-state">
          <div class="icon">&#128218;</div>
          <h3>Your word bank is empty</h3>
          <p>Start adding words you learn to build your vocabulary over time.</p>
        </div>
      `}

      <div id="word-practice-area"></div>
    `;
  },

  addWord() {
    const word = document.getElementById('wb-word').value.trim();
    const definition = document.getElementById('wb-definition').value.trim();
    const synonyms = document.getElementById('wb-synonyms').value.split(',').map(s => s.trim()).filter(Boolean);
    const example = document.getElementById('wb-example').value.trim();

    if (!word || !definition) return alert('Word and definition are required.');

    this.state.wordBank.push({
      id: Date.now().toString(),
      word, definition, synonyms, example,
      userSentence: '',
      dateAdded: new Date().toDateString(),
      timesUsed: 0
    });
    this.saveState();
    this.renderWordBank();
  },

  removeWord(index) {
    this.state.wordBank.splice(index, 1);
    this.saveState();
    this.renderWordBank();
  },

  practiceWordBank() {
    if (!this.state.wordBank.length) return;
    const word = randomFrom(this.state.wordBank);
    const area = document.getElementById('word-practice-area');

    area.innerHTML = `
      <div class="card mt-24 fade-in">
        <h4>Practice: Use "${word.word}" in a sentence</h4>
        <p class="text-secondary mt-8">${word.definition}</p>
        <textarea id="word-practice-input" placeholder="Write a sentence using '${word.word}'..." style="min-height:80px;margin-top:16px;"></textarea>
        <div class="action-bar mt-8">
          <button class="btn btn-secondary" onclick="App.practiceWordBank()">Different Word</button>
          <button class="btn btn-primary" onclick="App.saveWordPractice('${word.id}')">Save Sentence</button>
        </div>
      </div>
    `;
  },

  saveWordPractice(wordId) {
    const sentence = document.getElementById('word-practice-input').value.trim();
    if (!sentence) return;
    const word = this.state.wordBank.find(w => w.id === wordId);
    if (word) {
      word.userSentence = sentence;
      word.timesUsed = (word.timesUsed || 0) + 1;
      this.saveState();
    }
    this.renderWordBank();
  },

  // ===== ARCHIVE =====
  renderArchive() {
    const el = document.getElementById('page-archive');
    const entries = [...this.state.entries].reverse();

    el.innerHTML = `
      <h2>Writing Archive</h2>
      <p class="page-subtitle">Your complete writing history. Track your progress over time.</p>

      ${entries.length ? `
        <div class="flex-between mb-16">
          <span class="text-secondary">${entries.length} entries</span>
          <select id="archive-filter" onchange="App.filterArchive()">
            <option value="all">All Categories</option>
            ${Object.entries(PROMPTS).map(([key, val]) => `<option value="${key}">${val.label}</option>`).join('')}
          </select>
        </div>

        <div id="archive-list">
          ${entries.map(entry => this.renderArchiveEntry(entry)).join('')}
        </div>
      ` : `
        <div class="empty-state">
          <div class="icon">&#128196;</div>
          <h3>No entries yet</h3>
          <p>Start writing to build your archive.</p>
          <button class="btn btn-primary" onclick="location.hash='practice'">Start Writing</button>
        </div>
      `}

      <div class="modal-overlay" id="entry-modal">
        <div class="modal" id="entry-modal-content"></div>
      </div>
    `;
  },

  renderArchiveEntry(entry) {
    const scores = entry.feedback?.scores;
    return `
      <div class="archive-entry fade-in" onclick="App.viewEntry('${entry.id}')">
        <div class="archive-entry-header">
          <span class="badge badge-accent">${PROMPTS[entry.category]?.label || entry.category}</span>
          <span class="archive-entry-date">${entry.date} &middot; ${entry.wordCount} words</span>
        </div>
        <div class="archive-entry-prompt">${entry.prompt}</div>
        <div class="archive-entry-preview">${entry.text.substring(0, 200)}...</div>
        ${scores ? `
        <div class="archive-scores">
          <span class="archive-score" style="color:${scores.clarity >= 7 ? 'var(--success)' : 'var(--text-secondary)'}">Clarity: ${scores.clarity}</span>
          <span class="archive-score" style="color:${scores.structure >= 7 ? 'var(--success)' : 'var(--text-secondary)'}">Structure: ${scores.structure}</span>
          <span class="archive-score" style="color:${scores.precision >= 7 ? 'var(--success)' : 'var(--text-secondary)'}">Precision: ${scores.precision}</span>
          <span class="archive-score" style="color:${scores.depth >= 7 ? 'var(--success)' : 'var(--text-secondary)'}">Depth: ${scores.depth}</span>
        </div>` : ''}
      </div>
    `;
  },

  filterArchive() {
    const filter = document.getElementById('archive-filter').value;
    const entries = [...this.state.entries].reverse();
    const filtered = filter === 'all' ? entries : entries.filter(e => e.category === filter);
    document.getElementById('archive-list').innerHTML = filtered.length
      ? filtered.map(e => this.renderArchiveEntry(e)).join('')
      : '<div class="empty-state"><p>No entries in this category.</p></div>';
  },

  viewEntry(id) {
    const entry = this.state.entries.find(e => e.id === id);
    if (!entry) return;

    const modal = document.getElementById('entry-modal');
    const content = document.getElementById('entry-modal-content');

    content.innerHTML = `
      <div class="flex-between mb-16">
        <span class="badge badge-accent">${PROMPTS[entry.category]?.label || entry.category}</span>
        <button class="btn btn-ghost btn-sm" onclick="App.closeModal()">&times; Close</button>
      </div>
      <h3 style="margin-bottom:4px;">${entry.prompt}</h3>
      ${entry.task ? `<p class="text-secondary" style="font-size:14px;font-style:italic;">${entry.task}</p>` : ''}
      <p class="text-secondary" style="font-size:13px;margin-top:4px;">${entry.date} &middot; ${entry.wordCount} words</p>

      <div style="margin-top:20px;padding:16px;background:var(--bg-input);border-radius:var(--radius-sm);font-family:'Newsreader',Georgia,serif;font-size:15px;line-height:1.8;">
        ${entry.text.replace(/\n/g, '<br>')}
      </div>

      ${entry.feedback ? `
        <div class="mt-24">
          <h4 class="mb-8">Feedback</h4>
          <p style="font-size:14px;line-height:1.6;">${entry.feedback.overallComment}</p>

          <div class="mt-16">
            ${['clarity', 'structure', 'precision', 'depth'].map(key => `
              <div class="score-bar">
                <span class="score-label" style="text-transform:capitalize;">${key}</span>
                <div class="score-track"><div class="score-fill" style="width:${entry.feedback.scores[key] * 10}%;background:var(--accent)"></div></div>
                <span class="score-value">${entry.feedback.scores[key]}/10</span>
              </div>
            `).join('')}
          </div>

          <div class="mt-16">
            <h4 class="mb-8">Rewrite</h4>
            <div class="rewrite">${entry.feedback.rewrite}</div>
          </div>

          <div class="tip-box mt-16">${entry.feedback.tip}</div>
        </div>
      ` : ''}
    `;

    modal.classList.add('active');
    modal.addEventListener('click', (e) => {
      if (e.target === modal) this.closeModal();
    });
  },

  closeModal() {
    document.getElementById('entry-modal')?.classList.remove('active');
  },

  // ===== COURSE =====
  renderCourse() {
    const el = document.getElementById('page-course');

    el.innerHTML = `
      <h2>Writing Course</h2>
      <p class="page-subtitle">A structured path from paragraphs to advanced essays. 4-5 days a week, 30-60 minutes per session.</p>

      <div class="card mb-24">
        <div class="flex-between">
          <div>
            <h4>Current Module</h4>
            <p class="text-secondary mt-4">Module ${this.state.currentModule}: ${COURSE_MODULES[this.state.currentModule - 1].title}</p>
          </div>
          <span class="badge badge-accent">${this.state.moduleProgress[this.state.currentModule] || 0}% complete</span>
        </div>
        <div class="module-progress mt-12">
          <div class="module-progress-fill" style="width:${this.state.moduleProgress[this.state.currentModule] || 0}%"></div>
        </div>
      </div>

      ${COURSE_MODULES.map((mod, i) => {
        const progress = this.state.moduleProgress[mod.id] || 0;
        const isCurrent = mod.id === this.state.currentModule;
        const isCompleted = progress >= 100;
        const isLocked = mod.id > this.state.currentModule && !isCompleted;

        return `
          <div class="module-card ${isCurrent ? 'current' : ''} ${isCompleted ? 'completed' : ''} ${isLocked ? 'locked' : ''}">
            <div class="flex-between">
              <div>
                <span class="module-number">${isCompleted ? '&#10003;' : mod.id}</span>
                <h3 style="display:inline;margin-left:12px;">${mod.title}</h3>
              </div>
              ${isCurrent ? '<span class="badge badge-accent">Current</span>' : ''}
              ${isCompleted ? '<span class="badge badge-success">Complete</span>' : ''}
            </div>
            <p style="font-size:14px;color:var(--text-secondary);margin-top:8px;line-height:1.5;">${mod.description}</p>

            <div class="mt-16">
              <h4 style="font-size:13px;margin-bottom:8px;">Skills</h4>
              <div class="flex gap-8" style="flex-wrap:wrap;">
                ${mod.skills.map(s => `<span class="tag">${s}</span>`).join('')}
              </div>
            </div>

            <div class="mt-16">
              <h4 style="font-size:13px;margin-bottom:8px;">Weekly Tasks</h4>
              <ul style="padding-left:20px;font-size:14px;color:var(--text-secondary);line-height:1.8;">
                ${mod.weeklyTasks.map(t => `<li>${t}</li>`).join('')}
              </ul>
            </div>

            <div class="mt-16" style="font-size:13px;color:var(--accent);font-weight:500;">Focus: ${mod.focus}</div>

            <div class="module-progress mt-16">
              <div class="module-progress-fill" style="width:${progress}%"></div>
            </div>

            ${isCurrent ? `
              <button class="btn btn-primary mt-16" onclick="App.practiceModule(${mod.id})">Practice This Module</button>
            ` : ''}
          </div>
        `;
      }).join('')}

      <div class="card mt-24">
        <h4 class="mb-16">Study Method (per session)</h4>
        <div class="grid grid-4">
          <div class="text-center" style="padding:16px;">
            <div style="font-size:24px;margin-bottom:8px;">&#128221;</div>
            <h4 style="font-size:14px;">Plan</h4>
            <p style="font-size:12px;color:var(--text-secondary);">5-10 min</p>
            <p style="font-size:13px;color:var(--text-secondary);margin-top:4px;">Bullet your ideas first</p>
          </div>
          <div class="text-center" style="padding:16px;">
            <div style="font-size:24px;margin-bottom:8px;">&#9997;&#65039;</div>
            <h4 style="font-size:14px;">Write</h4>
            <p style="font-size:12px;color:var(--text-secondary);">20-40 min</p>
            <p style="font-size:13px;color:var(--text-secondary);margin-top:4px;">Focus on structure, not beauty</p>
          </div>
          <div class="text-center" style="padding:16px;">
            <div style="font-size:24px;margin-bottom:8px;">&#128269;</div>
            <h4 style="font-size:14px;">Edit</h4>
            <p style="font-size:12px;color:var(--text-secondary);">10 min</p>
            <p style="font-size:13px;color:var(--text-secondary);margin-top:4px;">Is the point clear? Did I explain why?</p>
          </div>
          <div class="text-center" style="padding:16px;">
            <div style="font-size:24px;margin-bottom:8px;">&#11014;&#65039;</div>
            <h4 style="font-size:14px;">Upgrade</h4>
            <p style="font-size:12px;color:var(--text-secondary);">5 min</p>
            <p style="font-size:13px;color:var(--text-secondary);margin-top:4px;">Rewrite one paragraph better</p>
          </div>
        </div>
      </div>
    `;
  },

  practiceModule(moduleId) {
    const mod = COURSE_MODULES[moduleId - 1];
    if (!mod) return;
    const cat = randomFrom(mod.promptCategories);
    location.hash = 'practice';
    setTimeout(() => {
      const tag = document.querySelector(`#category-tags .tag[data-cat="${cat}"]`);
      if (tag) {
        document.querySelectorAll('#category-tags .tag').forEach(t => t.classList.remove('active'));
        tag.classList.add('active');
      }
      this.generatePrompt();
    }, 100);
  },

  // ===== ASSESSMENT =====
  renderAssessment() {
    const el = document.getElementById('page-assessment');

    if (this.state.assessmentDone) {
      el.innerHTML = `
        <h2>Your Profile</h2>
        <p class="page-subtitle">Based on your diagnostic assessment.</p>

        <div class="card">
          <h4 class="mb-16">Focus Areas</h4>
          <div class="flex gap-8" style="flex-wrap:wrap;">
            ${this.state.weaknesses.map(w => `<span class="badge badge-warning" style="font-size:14px;padding:6px 16px;">${w}</span>`).join('')}
          </div>
          <button class="btn btn-secondary mt-24" onclick="App.retakeAssessment()">Retake Assessment</button>
        </div>
      `;
      return;
    }

    el.innerHTML = `
      <h2>Diagnostic Assessment</h2>
      <p class="page-subtitle">Answer honestly — this helps personalise your practice. Takes 2 minutes.</p>

      <div id="assessment-questions">
        ${ASSESSMENT_QUESTIONS.map((q, qi) => `
          <div class="assessment-question card">
            <h3>${qi + 1}. ${q.question}</h3>
            <div>
              ${q.options.map((opt, oi) => `
                <div class="assessment-option" data-question="${q.id}" data-index="${oi}" onclick="App.selectAssessmentOption(this, '${q.id}', ${oi})">
                  ${opt.text}
                </div>
              `).join('')}
            </div>
          </div>
        `).join('')}
      </div>

      <button class="btn btn-primary btn-lg btn-block mt-24" onclick="App.submitAssessment()" id="assessment-submit" disabled>Complete Assessment</button>
    `;
  },

  assessmentAnswers: {},

  selectAssessmentOption(el, questionId, optionIndex) {
    document.querySelectorAll(`.assessment-option[data-question="${questionId}"]`).forEach(o => o.classList.remove('selected'));
    el.classList.add('selected');
    this.assessmentAnswers[questionId] = optionIndex;

    const allAnswered = ASSESSMENT_QUESTIONS.every(q => this.assessmentAnswers[q.id] !== undefined);
    document.getElementById('assessment-submit').disabled = !allAnswered;
  },

  submitAssessment() {
    const weaknesses = new Set();
    let totalScore = 0;

    ASSESSMENT_QUESTIONS.forEach(q => {
      const answerIdx = this.assessmentAnswers[q.id];
      const option = q.options[answerIdx];
      totalScore += option.score;
      if (option.weakness) weaknesses.add(option.weakness);
    });

    this.state.weaknesses = [...weaknesses];
    this.state.assessmentDone = true;

    if (totalScore <= 12) this.state.currentModule = 1;
    else if (totalScore <= 20) this.state.currentModule = 2;
    else if (totalScore <= 26) this.state.currentModule = 3;
    else this.state.currentModule = 4;

    this.saveState();
    this.renderAssessment();
  },

  retakeAssessment() {
    this.state.assessmentDone = false;
    this.state.weaknesses = [];
    this.assessmentAnswers = {};
    this.saveState();
    this.renderAssessment();
  },

  // ===== SETTINGS =====
  renderSettings() {
    const el = document.getElementById('page-settings');

    el.innerHTML = `
      <h2>Settings</h2>
      <p class="page-subtitle">Configure your app and API access.</p>

      <div class="card">
        <div class="setting-group">
          <label>Claude API Key</label>
          <p class="setting-description">Required for AI feedback, conversation practice, and intelligent analysis. Get your key from <strong>console.anthropic.com</strong>.</p>
          <div class="flex gap-12">
            <input type="password" id="api-key-input" placeholder="sk-ant-..." value="${API.apiKey || ''}">
            <button class="btn btn-primary" onclick="App.saveApiKey()">Save</button>
          </div>
          <div id="api-status" class="mt-8">
            ${API.isConfigured() ? '<span class="badge badge-success">Connected</span>' : '<span class="badge badge-danger">Not configured</span>'}
          </div>
        </div>
      </div>

      <div class="card">
        <div class="setting-group">
          <label>Appearance</label>
          <p class="setting-description">Switch between light and dark mode.</p>
          <div class="flex gap-12 mt-12">
            <button class="btn ${this.getTheme() === 'light' ? 'btn-primary' : 'btn-secondary'}" onclick="App.setTheme('light')">Light</button>
            <button class="btn ${this.getTheme() === 'dark' ? 'btn-primary' : 'btn-secondary'}" onclick="App.setTheme('dark')">Dark</button>
            <button class="btn ${this.getTheme() === 'auto' ? 'btn-primary' : 'btn-secondary'}" onclick="App.setTheme('auto')">Auto</button>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="setting-group">
          <label>Data Management</label>
          <p class="setting-description">Your data is stored locally in your browser. Nothing is sent to any server except the Claude API for feedback.</p>
          <div class="flex gap-12 mt-12">
            <button class="btn btn-secondary" onclick="App.exportData()">Export Data</button>
            <button class="btn btn-danger" onclick="App.clearData()">Clear All Data</button>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="setting-group">
          <label>About</label>
          <p class="setting-description">Articulate is a writing and thinking practice app designed to improve your clarity of thought, communication skills, and articulation. Built for daily practice.</p>
        </div>
      </div>
    `;
  },

  getTheme() {
    return localStorage.getItem('articulate_theme') || 'light';
  },

  setTheme(mode) {
    localStorage.setItem('articulate_theme', mode);
    this.applyTheme();
    this.renderSettings();
  },

  applyTheme() {
    const mode = this.getTheme();
    if (mode === 'auto') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
    } else {
      document.documentElement.setAttribute('data-theme', mode);
    }
  },

  saveApiKey() {
    const key = document.getElementById('api-key-input').value.trim();
    if (!key) return;
    API.setKey(key);
    document.getElementById('api-status').innerHTML = '<span class="badge badge-success">Connected</span>';
  },

  exportData() {
    const data = JSON.stringify(this.state, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `articulate-export-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  },

  clearData() {
    if (confirm('Are you sure? This will delete all your writing entries, word bank, conversations, and progress. This cannot be undone.')) {
      localStorage.removeItem('articulate_state');
      this.loadState();
      this.saveState();
      location.hash = 'dashboard';
      this.route('dashboard');
    }
  }
};

document.addEventListener('DOMContentLoaded', () => App.init());
