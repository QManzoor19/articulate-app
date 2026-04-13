const API = {
  apiKey: null,

  init() {
    this.apiKey = localStorage.getItem('articulate_api_key') || null;
  },

  setKey(key) {
    this.apiKey = key;
    localStorage.setItem('articulate_api_key', key);
  },

  isConfigured() {
    return !!this.apiKey;
  },

  async call(messages, systemPrompt, options = {}) {
    if (!this.apiKey) throw new Error('API key not configured');

    const body = {
      model: options.model || 'claude-sonnet-4-20250514',
      max_tokens: options.maxTokens || 2048,
      system: systemPrompt,
      messages: messages
    };

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': this.apiKey,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true'
      },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.error?.message || `API error: ${response.status}`);
    }

    const data = await response.json();
    return data.content[0].text;
  },

  async getWritingFeedback(text, prompt, task, context = {}) {
    const systemPrompt = `You are an expert writing coach. Your job is to give specific, actionable feedback on the user's writing. You are direct, encouraging but honest.

Your feedback must include:
1. **Rewrite**: A tighter, clearer version of their text (keep their voice, just sharpen it)
2. **Specific Weaknesses**: Name exactly what's weak (e.g., "You buried your main point in sentence 4", "You used 'things' 3 times — which things?", "This sentence is 47 words — break it up"). Use their actual text as examples.
3. **Strengths**: What they did well (be specific — "Your opening line hooks immediately" not "Good job!")
4. **Scores** (1-10): Rate these dimensions:
   - Clarity: Is the main point immediately obvious?
   - Structure: Does the piece flow logically?
   - Precision: Are words chosen carefully? No filler?
   - Depth: Does it go beyond surface-level thinking?
5. **One Key Tip**: The single most impactful thing they could improve

${context.module ? `The user is on Module ${context.module} of their writing course. Adjust your expectations accordingly — Module 1 is paragraphs, Module 5 is advanced essays.` : ''}
${context.weaknesses ? `The user's known weaknesses are: ${context.weaknesses.join(', ')}. Pay extra attention to these.` : ''}

Format your response as JSON:
{
  "rewrite": "...",
  "weaknesses": ["specific weakness 1", "specific weakness 2", ...],
  "strengths": ["specific strength 1", ...],
  "scores": { "clarity": N, "structure": N, "precision": N, "depth": N },
  "tip": "...",
  "overallComment": "2-3 sentence overall assessment"
}

ONLY output the JSON, nothing else.`;

    const userMessage = `Prompt: "${prompt}"${task ? `\nTask: "${task}"` : ''}\n\nMy writing:\n${text}`;

    const response = await this.call(
      [{ role: 'user', content: userMessage }],
      systemPrompt
    );

    try {
      return JSON.parse(response);
    } catch {
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (jsonMatch) return JSON.parse(jsonMatch[0]);
      throw new Error('Could not parse feedback response');
    }
  },

  async getConversationResponse(messages, scenario) {
    const systemPrompt = `${scenario.systemPrompt}

Important guidelines:
- Keep responses conversational and natural (1-3 sentences usually)
- React to HOW they communicate, not just WHAT they say
- If they're being vague, ask them to be specific
- If they use filler words excessively, you can gently note it
- Stay in character
- After about 8-10 exchanges, naturally wrap up and give brief honest feedback on how the conversation went (what they did well, what they could improve)`;

    return await this.call(messages, systemPrompt);
  },

  async getExplainBackFeedback(userExplanation, topic) {
    const systemPrompt = `You are evaluating how well someone explained a topic. Be specific and constructive.

Rate their explanation on:
1. Accuracy — Did they get the facts right?
2. Clarity — Would a listener understand?
3. Structure — Was it logically ordered?
4. Simplicity — Did they avoid unnecessary jargon?

Format as JSON:
{
  "accuracy": { "score": N, "comment": "..." },
  "clarity": { "score": N, "comment": "..." },
  "structure": { "score": N, "comment": "..." },
  "simplicity": { "score": N, "comment": "..." },
  "betterVersion": "A clearer way to explain this would be: ...",
  "overallTip": "..."
}

ONLY output JSON.`;

    const response = await this.call(
      [{ role: 'user', content: `Topic to explain: "${topic}"\n\nTheir explanation:\n${userExplanation}` }],
      systemPrompt
    );

    try {
      return JSON.parse(response);
    } catch {
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (jsonMatch) return JSON.parse(jsonMatch[0]);
      throw new Error('Could not parse feedback');
    }
  },

  async getSentenceUpgradeFeedback(original, upgraded) {
    const systemPrompt = `You are evaluating a sentence upgrade exercise. The user was given a simple sentence and asked to make it more vivid, precise, or sophisticated.

Evaluate their upgrade:
1. Did they improve it? How?
2. Did they overdo it (purple prose)?
3. Is the meaning preserved?
4. Suggest an even better version

Format as JSON:
{
  "improved": true/false,
  "improvements": ["what they did well"],
  "issues": ["any problems"],
  "yourVersion": "your suggested upgrade",
  "tip": "one specific tip"
}

ONLY output JSON.`;

    const response = await this.call(
      [{ role: 'user', content: `Original: "${original}"\nTheir upgrade: "${upgraded}"` }],
      systemPrompt
    );

    try {
      return JSON.parse(response);
    } catch {
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (jsonMatch) return JSON.parse(jsonMatch[0]);
      throw new Error('Could not parse feedback');
    }
  },

  async getReadComprehensionFeedback(passage, userExplanation, mode) {
    const prompts = {
      explain: `The user read a passage and was asked to explain it in their own words. Evaluate:
1. Did they capture the main idea?
2. Did they miss any key points?
3. How clear and well-structured is their explanation?
4. Did they add their own understanding or just paraphrase?

Format as JSON:
{
  "capturedMainIdea": true/false,
  "missedPoints": ["any key ideas they missed"],
  "clarity": N (1-10),
  "depth": N (1-10),
  "comment": "2-3 sentences of specific feedback",
  "betterExplanation": "A model explanation they can learn from"
}`,
      simplify: `The user read a passage and was asked to explain it as if talking to a 10-year-old. Evaluate:
1. Would a child understand this?
2. Did they keep the core meaning?
3. Did they use simple, relatable language?
4. Did they use good analogies or examples?

Format as JSON:
{
  "childFriendly": true/false,
  "meaningPreserved": true/false,
  "clarity": N (1-10),
  "creativity": N (1-10),
  "comment": "2-3 sentences of specific feedback",
  "betterVersion": "A model simplified version"
}`,
      structure: `The user read a well-written passage and was asked to identify its structural skeleton (how the argument/ideas are organised). Evaluate:
1. Did they correctly identify the structure?
2. Did they notice the key transitions and techniques?
3. How insightful is their analysis?

Format as JSON:
{
  "structureIdentified": true/false,
  "insights": ["what they noticed well"],
  "missed": ["structural elements they missed"],
  "score": N (1-10),
  "comment": "2-3 sentences of feedback",
  "actualStructure": "The correct structural breakdown"
}`
    };

    const systemPrompt = (prompts[mode] || prompts.explain) + '\n\nONLY output JSON.';

    const response = await this.call(
      [{ role: 'user', content: `Original passage:\n"${passage}"\n\nTheir response:\n${userExplanation}` }],
      systemPrompt
    );

    try {
      return JSON.parse(response);
    } catch {
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (jsonMatch) return JSON.parse(jsonMatch[0]);
      throw new Error('Could not parse feedback');
    }
  },

  async getQuickFeedback(exercise, userResponse) {
    const systemPrompt = `You are a writing coach giving quick feedback on a short exercise. Be concise but specific. 2-3 sentences max for the comment, then a brief improved version if applicable.

Format as JSON:
{
  "comment": "2-3 sentence specific feedback",
  "improved": "your improved version (or null if not applicable)",
  "score": N (1-10)
}

ONLY output JSON.`;

    const response = await this.call(
      [{ role: 'user', content: `Exercise: ${exercise.instruction}\nContent: ${exercise.content}\n\nTheir response:\n${userResponse}` }],
      systemPrompt
    );

    try {
      return JSON.parse(response);
    } catch {
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (jsonMatch) return JSON.parse(jsonMatch[0]);
      throw new Error('Could not parse feedback');
    }
  }
};

API.init();
