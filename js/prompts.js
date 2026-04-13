const PROMPTS = {
  argument: {
    label: "Argument & Opinion",
    icon: "shield",
    prompts: [
      "Argue whether technology improves or damages human connection.",
      "Should university be free?",
      "Is discipline more important than motivation?",
      "Are humans naturally selfish?",
      "Should social media be regulated?",
      "Is talent or hard work more important?",
      "Does modern life make people mentally weaker or stronger?",
      "Is beauty a social construct?",
      "Should failure be celebrated?",
      "Is privacy still possible in the modern world?",
      "Is it better to be feared or respected?",
      "Should children be shielded from failure?",
      "Is ambition a virtue or a vice?",
      "Does money buy happiness?",
      "Is tradition holding society back?"
    ],
    tasks: [
      "Write a balanced argument (both sides).",
      "Write a persuasive essay.",
      "Write a rebuttal to an opposing view.",
      "Write an introduction only.",
      "Write a conclusion only."
    ]
  },
  analysis: {
    label: "Critical Thinking & Analysis",
    icon: "microscope",
    prompts: [
      "Analyse why people idolise celebrities.",
      "Explain how fear influences decision-making.",
      "Analyse the psychology of procrastination.",
      "Break down what makes someone charismatic.",
      "Analyse how childhood affects adult personality.",
      "Examine the impact of comparison culture.",
      "Analyse why humans seek meaning.",
      "Explain why change is uncomfortable.",
      "Analyse the role of habits in success.",
      "Examine the relationship between confidence and competence."
    ],
    tasks: [
      "Define a concept.",
      "Break it into parts.",
      "Explain cause and effect.",
      "Compare two theories.",
      "Evaluate strengths and weaknesses."
    ]
  },
  compare: {
    label: "Compare & Contrast",
    icon: "scale",
    prompts: [
      "Compare confidence vs arrogance.",
      "Compare discipline vs motivation.",
      "Compare happiness vs pleasure.",
      "Compare loneliness vs solitude.",
      "Compare intelligence vs wisdom.",
      "Compare comfort vs growth.",
      "Compare online communication vs face-to-face.",
      "Compare childhood vs adulthood.",
      "Compare freedom vs security.",
      "Compare fitting in vs belonging."
    ],
    tasks: [
      "Point-by-point comparison.",
      "Similarities first, differences second.",
      "Argue which is more valuable."
    ]
  },
  research: {
    label: "Research & Explain",
    icon: "book",
    prompts: [
      "Explain how habits are formed.",
      "Explain what cognitive bias is.",
      "Explain how anxiety works in the brain.",
      "Explain what stoicism is.",
      "Explain how language shapes thinking.",
      "Explain dopamine and motivation.",
      "Explain how memory works.",
      "Explain what emotional intelligence is.",
      "Explain how culture shapes identity.",
      "Explain how trauma affects behaviour."
    ],
    tasks: [
      "Write for a 12-year-old.",
      "Write for a university student.",
      "Summarise in 150 words.",
      "Write a full article-style explanation."
    ]
  },
  reflective: {
    label: "Reflective & Personal",
    icon: "mirror",
    prompts: [
      "What belief about yourself have you outgrown?",
      "When do you feel most like yourself?",
      "What does 'self-acceptance' actually mean?",
      "What patterns keep repeating in your life?",
      "What emotions do you avoid and why?",
      "What are you currently afraid of changing?",
      "What gives your life meaning right now?",
      "What makes you feel confident?",
      "How has your thinking changed in the last year?",
      "What kind of person are you becoming?"
    ],
    tasks: [
      "Write a reflective essay.",
      "Write a letter to your past self.",
      "Write a letter to your future self.",
      "Analyse a difficult experience.",
      "Describe an internal conflict."
    ]
  },
  articulation: {
    label: "Thinking & Articulation Drills",
    icon: "target",
    prompts: [
      "Take one belief you have and question it.",
      "Write your opinion, then argue against yourself.",
      "Explain something you believe in the clearest way possible.",
      "Take a vague thought and make it precise.",
      "Turn emotions into structured ideas.",
      "Write about a complex idea simply.",
      "Take a messy thought and organise it logically.",
      "Describe something abstract concretely.",
      "Define a word like 'confidence', 'success', or 'identity'.",
      "Explain why you think the way you do."
    ],
    tasks: [
      "One-paragraph clarity challenge.",
      "Write without using 'very', 'really', or 'stuff'.",
      "Write using only short sentences.",
      "Write one idea in three different ways."
    ]
  },
  creative: {
    label: "Creative but Intellectual",
    icon: "feather",
    prompts: [
      "Write a scene that shows insecurity without naming it.",
      "Write about a character who fears being seen.",
      "Write a monologue of someone having an identity shift.",
      "Write a short story about change.",
      "Write about a person who realises they were wrong.",
      "Write a scene driven only by internal thoughts.",
      "Write about someone confronting their younger self.",
      "Write about loneliness in a crowded place.",
      "Write a story where nothing happens externally but everything changes internally.",
      "Write a metaphor for personal growth."
    ],
    tasks: [
      "Show, don't tell.",
      "First-person perspective.",
      "Stream of consciousness.",
      "Philosophical short story."
    ]
  },
  philosophical: {
    label: "Philosophical & Deep Thinking",
    icon: "brain",
    prompts: [
      "What makes a life meaningful?",
      "Are humans more emotional or rational?",
      "Do we choose who we become?",
      "Is suffering necessary for growth?",
      "Can people truly change?",
      "What does it mean to 'be yourself'?",
      "Is identity discovered or created?",
      "Is happiness a choice?",
      "What does freedom really mean?",
      "What is the self?"
    ],
    tasks: [
      "Define your position.",
      "Use examples from life.",
      "Challenge your own conclusion."
    ]
  },
  micro: {
    label: "School-Style Micro Tasks",
    icon: "pencil",
    prompts: [
      "Write only an introduction.",
      "Write only a thesis statement.",
      "Improve a weak paragraph.",
      "Summarise an article.",
      "Paraphrase a complex idea.",
      "Write topic sentences for 5 paragraphs.",
      "Write a structured plan for an essay.",
      "Turn bullet points into a paragraph.",
      "Edit a paragraph for clarity.",
      "Rewrite something more formally."
    ],
    tasks: []
  },
  articulation_builders: {
    label: "Articulation Builders",
    icon: "layers",
    prompts: [
      "Explain your opinion to a beginner.",
      "Explain it to an expert.",
      "Explain it in 3 sentences.",
      "Explain it in 1 sentence.",
      "Explain it without emotional language.",
      "Explain it persuasively.",
      "Explain it neutrally.",
      "Explain it as a story.",
      "Explain it using examples only.",
      "Explain it using logic only."
    ],
    tasks: []
  },
  summarise: {
    label: "Summarising",
    icon: "compress",
    prompts: [
      "Summarise the last movie or show you watched for a friend.",
      "Summarise today in 5 words.",
      "How would you explain World War II in under 60 seconds?",
      "Summarise a chapter of a book you've read recently.",
      "Take a complex idea and summarise it for a 10-year-old."
    ],
    tasks: [
      "Summarise in 3 sentences.",
      "Summarise in 1 sentence.",
      "Summarise for someone who knows nothing about the topic."
    ]
  },
  explain: {
    label: "Explaining Things",
    icon: "lightbulb",
    prompts: [
      "Explain how to make tea as if I've never done it before.",
      "Explain what OOP is in Python without using jargon.",
      "Explain why we need sleep.",
      "Explain how the internet works to a grandparent.",
      "Explain what gravity is to a child."
    ],
    tasks: [
      "Explain it like I'm 5.",
      "Explain it casually to a friend.",
      "Explain it formally for a presentation."
    ]
  },
  reviews: {
    label: "Reviews & Opinions",
    icon: "star",
    prompts: [
      "What's the last show you watched, and how would you rate it?",
      "Describe your opinion on social media — pros and cons.",
      "Is studying late at night better than in the morning? What do you think?",
      "Review a meal you had recently.",
      "Review a book, game, or app you've used."
    ],
    tasks: [
      "Write a short review (3-5 sentences).",
      "Write a detailed review with pros and cons.",
      "Give a recommendation and explain why."
    ]
  },
  advice: {
    label: "Giving Advice & Tips",
    icon: "heart",
    prompts: [
      "Someone's struggling to stay focused — what would you suggest?",
      "Your friend is nervous about public speaking. What advice would you give?",
      "What's your top productivity tip?",
      "If you could tell your younger self one thing, what would it be?",
      "How would you comfort someone going through a hard time?"
    ],
    tasks: [
      "Give your top 3 tips.",
      "Write it as a supportive message to a friend.",
      "Give advice without being preachy."
    ]
  },
  storytelling: {
    label: "Storytelling From Your Life",
    icon: "book-open",
    prompts: [
      "Tell me about a time you felt most proud.",
      "What's something you learned the hard way?",
      "Describe the funniest thing that's happened to you recently.",
      "Tell a story about a time you got lost.",
      "Describe a moment that changed how you see the world."
    ],
    tasks: [
      "Tell the story in 3 parts: setup, struggle, result.",
      "Write it as if telling a friend.",
      "Focus on what you felt, not just what happened."
    ]
  },
  sentence_upgrade: {
    label: "Sentence Upgrades",
    icon: "trending-up",
    prompts: [
      "The weather was bad, so we stayed inside.",
      "She was sad about what happened.",
      "The city was busy and loud.",
      "He worked really hard to get where he is.",
      "The food was good.",
      "It was a nice day.",
      "They had a long conversation about life.",
      "The movie was interesting.",
      "She felt nervous before the interview.",
      "The sunset was beautiful."
    ],
    tasks: [
      "Upgrade to a vivid version with imagery.",
      "Upgrade to a formal/academic version.",
      "Rewrite without using any adjectives."
    ]
  }
};

const EXERCISES = {
  vocabulary: {
    label: "Vocabulary & Word Recall",
    exercises: [
      { name: "Synonym Storm", description: "Name 10 synonyms for a feeling word (e.g., 'anxious')." },
      { name: "Word Association", description: "Pick a word and list all related words and synonyms." },
      { name: "Describe Without", description: "Describe the word 'freedom' without using the word." },
      { name: "Use It or Lose It", description: "Take 3 new vocabulary words and use each in a sentence." },
      { name: "Define & Exemplify", description: "Define a word in your own words, then give an example." }
    ]
  },
  clarity: {
    label: "Clarity & Precision",
    exercises: [
      { name: "Fog Clearer", description: "Take a fuzzy thought you had today and write it as one clear sentence." },
      { name: "Banned Words", description: "Write a paragraph without using 'very', 'really', 'stuff', or 'things'." },
      { name: "Short Only", description: "Explain an idea using only sentences of 10 words or fewer." },
      { name: "Three Ways", description: "Write one idea in three completely different ways." },
      { name: "Paragraph Surgeon", description: "Take a messy paragraph and rewrite it to be half the length but clearer." }
    ]
  },
  structure: {
    label: "Structure & Logic",
    exercises: [
      { name: "Claim-Evidence-Conclusion", description: "Pick any opinion. State your claim, give evidence, write a conclusion." },
      { name: "Because Chain", description: "Start with a statement and add 'because' five times, going deeper each time." },
      { name: "Outline First", description: "Plan an essay in bullet points before writing a single sentence." },
      { name: "Topic Sentences", description: "Write 5 topic sentences for an essay on a given subject." },
      { name: "Reverse Engineer", description: "Read a well-written paragraph and identify its structural skeleton." }
    ]
  },
  social: {
    label: "Social & Conversational",
    exercises: [
      { name: "Explain to a Friend", description: "Pick something you learned today and explain it as if texting a friend." },
      { name: "The Comfort Message", description: "Write a message comforting someone who's going through a hard time." },
      { name: "Polite Disagreement", description: "Write a response where you disagree with someone respectfully." },
      { name: "Give Advice", description: "Someone asks for your advice on a problem. Write your response." },
      { name: "Small Talk Starter", description: "Write 5 interesting things you could say to start a conversation." }
    ]
  }
};

const COURSE_MODULES = [
  {
    id: 1,
    title: "Foundations — Clarity & Paragraphs",
    description: "Turn vague thoughts into clear points. Write strong topic sentences. Stay on one idea per paragraph.",
    skills: ["Turning vague thoughts into clear points", "Writing strong topic sentences", "Explaining and expanding ideas", "Staying on one idea per paragraph"],
    weeklyTasks: [
      "Write 1 paragraph explaining a concept (e.g., confidence, anxiety, discipline, identity)",
      "Write 1 paragraph giving your opinion on a small issue",
      "Write 1 paragraph analysing a behaviour or habit",
      "Rewrite one paragraph to make it clearer"
    ],
    promptCategories: ["articulation", "explain", "micro"],
    focus: "Structure over length"
  },
  {
    id: 2,
    title: "Thinking Skills — Analysis & Logic",
    description: "Cause and effect. Breaking ideas into parts. Connecting emotions to reasoning. Explaining why, not just what.",
    skills: ["Cause and effect", "Breaking ideas into parts", "Connecting emotions to reasoning", "Explaining why, not just what"],
    weeklyTasks: [
      "Analyse a behaviour (e.g., procrastination, jealousy, motivation)",
      "Compare two ideas (e.g., confidence vs arrogance)",
      "Explain a psychological or life concept",
      "Write a 'why' essay (why something happens)"
    ],
    promptCategories: ["analysis", "compare", "research"],
    focus: "Depth and reasoning"
  },
  {
    id: 3,
    title: "Academic Writing — Mini Essays",
    description: "Introductions & conclusions. Logical flow. Building arguments. Supporting claims.",
    skills: ["Introductions & conclusions", "Logical flow", "Building arguments", "Supporting claims"],
    weeklyTasks: [
      "Write 1 opinion essay (300-600 words)",
      "Write 1 balanced discussion (both sides)",
      "Write 1 analytical essay",
      "Plan 2 essays without writing them"
    ],
    promptCategories: ["argument", "analysis", "philosophical"],
    focus: "Structure, not perfection"
  },
  {
    id: 4,
    title: "Voice — Reflective & Articulate Self-Expression",
    description: "Articulating inner experiences. Emotional precision. Personal meaning. Clear self-expression.",
    skills: ["Articulating inner experiences", "Emotional precision", "Personal meaning", "Clear self-expression"],
    weeklyTasks: [
      "Reflect on a recent experience",
      "Analyse a belief you hold",
      "Write about a fear, change, or goal",
      "Rewrite something to make it more precise"
    ],
    promptCategories: ["reflective", "storytelling", "creative"],
    focus: "Honest clarity, not aesthetics"
  },
  {
    id: 5,
    title: "Advanced — Argument, Depth & Style",
    description: "Nuanced thinking. Anticipating counter-arguments. Precision of language. Sophisticated structure.",
    skills: ["Nuanced thinking", "Anticipating counter-arguments", "Precision of language", "Sophisticated structure"],
    weeklyTasks: [
      "Argue against your own view",
      "Write a deep concept essay",
      "Teach back something you learned",
      "Edit an old piece seriously"
    ],
    promptCategories: ["philosophical", "argument", "articulation_builders"],
    focus: "Maturity of thought"
  }
];

const ASSESSMENT_QUESTIONS = [
  {
    id: "explain",
    question: "When you try to explain something to someone, how does it usually go?",
    options: [
      { text: "I struggle to find the right words and it comes out jumbled", score: 1, weakness: "explaining" },
      { text: "I can get the point across but it takes me a while", score: 2, weakness: "explaining" },
      { text: "I'm decent but sometimes lose people with too much detail", score: 3, weakness: "structure" },
      { text: "I'm usually clear and concise", score: 4, weakness: null }
    ]
  },
  {
    id: "vocabulary",
    question: "How often do you find yourself stuck searching for the right word?",
    options: [
      { text: "Constantly — I use 'thing' and 'stuff' a lot", score: 1, weakness: "vocabulary" },
      { text: "Fairly often, especially for emotions or abstract ideas", score: 2, weakness: "vocabulary" },
      { text: "Sometimes, but I can usually find a close enough word", score: 3, weakness: "vocabulary" },
      { text: "Rarely — I have a strong vocabulary", score: 4, weakness: null }
    ]
  },
  {
    id: "clarity",
    question: "When you have a thought or opinion, how clear is it in your own mind before you try to express it?",
    options: [
      { text: "Usually foggy — I feel it but can't pin it down", score: 1, weakness: "clarity" },
      { text: "Somewhat clear but it falls apart when I try to explain it", score: 2, weakness: "clarity" },
      { text: "Pretty clear, I just need to organise it", score: 3, weakness: "structure" },
      { text: "Very clear — I know what I think and why", score: 4, weakness: null }
    ]
  },
  {
    id: "structure",
    question: "When you write or speak at length, do people follow your logic easily?",
    options: [
      { text: "I tend to ramble and jump between points", score: 1, weakness: "structure" },
      { text: "I sometimes lose the thread or bury my main point", score: 2, weakness: "structure" },
      { text: "Usually clear but I could be more organised", score: 3, weakness: "structure" },
      { text: "Yes, I structure my thoughts well", score: 4, weakness: null }
    ]
  },
  {
    id: "social",
    question: "How comfortable are you in conversations with people?",
    options: [
      { text: "I often don't know what to say or how to respond", score: 1, weakness: "social" },
      { text: "I can hold a conversation but I'm not great at it", score: 2, weakness: "social" },
      { text: "I'm okay but I want to be more engaging or charismatic", score: 3, weakness: "social" },
      { text: "I'm confident and enjoy conversations", score: 4, weakness: null }
    ]
  },
  {
    id: "writing",
    question: "How do you feel about your writing?",
    options: [
      { text: "I avoid writing when I can — it feels hard", score: 1, weakness: "writing" },
      { text: "I can write but it takes a long time and doesn't feel natural", score: 2, weakness: "writing" },
      { text: "I write okay but want to be clearer and more expressive", score: 3, weakness: "clarity" },
      { text: "I'm a confident writer", score: 4, weakness: null }
    ]
  },
  {
    id: "persuasion",
    question: "When you need to convince someone of something, how effective are you?",
    options: [
      { text: "I struggle to make my case — I feel unheard", score: 1, weakness: "persuasion" },
      { text: "I can present my view but don't always convince people", score: 2, weakness: "persuasion" },
      { text: "I'm decent but could be sharper with arguments", score: 3, weakness: "persuasion" },
      { text: "I'm persuasive and can adjust my approach to the listener", score: 4, weakness: null }
    ]
  },
  {
    id: "recall",
    question: "How quickly can you recall words, examples, or ideas when you need them?",
    options: [
      { text: "Very slow — I often think of the right thing to say afterwards", score: 1, weakness: "recall" },
      { text: "It takes me a moment, which makes conversations awkward", score: 2, weakness: "recall" },
      { text: "Fairly quick for familiar topics, slower for new ones", score: 3, weakness: "recall" },
      { text: "Quick — I can pull from my mental library easily", score: 4, weakness: null }
    ]
  }
];

const CONVERSATION_SCENARIOS = [
  {
    id: "explain_concept",
    title: "Explain a Concept",
    description: "Your friend asks you to explain something. Make it clear and engaging.",
    systemPrompt: "You are a curious friend who wants to understand something. Ask follow-up questions if the explanation is unclear. Be natural and conversational. If they explain well, say so. If something is confusing, say 'wait, what do you mean by...' Start by asking them to explain a topic you pick (something like how the internet works, why we dream, how habits form, etc.).",
    difficulty: "beginner"
  },
  {
    id: "give_advice",
    title: "Give Advice",
    description: "Someone comes to you with a problem. Listen, empathise, and help.",
    systemPrompt: "You are a friend going through a difficult time (pick from: stress about career choices, feeling stuck in life, dealing with self-doubt, struggling with motivation). Share your problem naturally and respond to their advice. If their advice is generic, push back gently: 'Yeah but how do I actually do that?' If they're empathetic and specific, acknowledge it. Be realistic, not easily solved.",
    difficulty: "intermediate"
  },
  {
    id: "polite_disagree",
    title: "Disagree Respectfully",
    description: "You have a different opinion. Express it without being rude or dismissive.",
    systemPrompt: "You are someone with a strong opinion on a topic (pick one: social media is mostly positive, university degrees are overrated, money is the most important factor in happiness). State your opinion firmly. When the user disagrees, push back but stay respectful. Evaluate whether they disagree well — are they clear? Do they acknowledge your point before countering? Do they use evidence? Give natural conversational feedback.",
    difficulty: "intermediate"
  },
  {
    id: "small_talk",
    title: "Small Talk & Connection",
    description: "Make conversation with someone new. Be interesting and interested.",
    systemPrompt: "You are someone the user just met at a casual social event. Be friendly but not overly enthusiastic. Respond naturally to their attempts at conversation. If they ask interesting questions, engage more. If they're generic or awkward, reflect that naturally (short responses, not much to work with). The goal is for them to practice being engaging, asking good questions, and finding common ground.",
    difficulty: "beginner"
  },
  {
    id: "persuade",
    title: "Persuade Someone",
    description: "You need to convince someone to see things your way.",
    systemPrompt: "You are a reasonable but skeptical person. The user will try to persuade you of something (let them choose the topic, or suggest one like: why they should try a new hobby, why a certain approach to work is better, why a change would be good). Don't be easily convinced — ask for evidence, point out weaknesses in their argument, but be fair. If they make a genuinely good point, acknowledge it. Rate their persuasiveness naturally in conversation.",
    difficulty: "advanced"
  },
  {
    id: "comfort",
    title: "Comfort Someone",
    description: "Someone is upset. Show empathy and support without being dismissive.",
    systemPrompt: "You are someone who is genuinely upset about something (pick from: a friendship falling apart, feeling like a failure, being overwhelmed by life, losing something important to you). Express your emotions naturally — you might be tearful, angry, or withdrawn. React to how the user responds: if they jump to solutions too fast, say 'I don't need fixing, I just need someone to listen.' If they're dismissive ('it's not that bad'), show frustration. If they're genuinely empathetic, open up more.",
    difficulty: "intermediate"
  },
  {
    id: "storytelling",
    title: "Tell an Engaging Story",
    description: "Tell a story from your life in a way that captivates the listener.",
    systemPrompt: "You are a friend hanging out with the user. Ask them to tell you about something interesting that happened to them. As they tell the story, react naturally — laugh, ask questions, show interest. If the story drags, look distracted or say 'wait, where is this going?' If they tell it well (good pacing, vivid details, a clear point), be genuinely engaged. After the story, give honest feedback on how engaging it was.",
    difficulty: "beginner"
  },
  {
    id: "debate",
    title: "Friendly Debate",
    description: "Debate a topic with someone. Stay sharp, fair, and composed.",
    systemPrompt: "You are an intelligent friend who loves a good debate. Pick a debatable topic (AI replacing jobs, whether social media does more harm than good, whether people can truly change). Take a clear position and argue it well. Challenge the user's points, ask them to clarify vague statements, and acknowledge when they make good arguments. The goal is a respectful, intellectually stimulating exchange. After a few rounds, reflect on the quality of the debate.",
    difficulty: "advanced"
  }
];

const QUICK_MODE_EXERCISES = [
  { type: "upgrade", instruction: "Upgrade this sentence to be more vivid and precise:", content: () => randomFrom(PROMPTS.sentence_upgrade.prompts) },
  { type: "define", instruction: "Define this word in one clear sentence, then use it in an example:", content: () => randomFrom(["resilience", "integrity", "empathy", "ambiguity", "nuance", "conviction", "perspective", "vulnerability", "authenticity", "eloquence", "tenacity", "pragmatism", "intuition", "paradox", "catharsis"]) },
  { type: "explain", instruction: "Explain this in 3 sentences or fewer:", content: () => randomFrom(["Why do people procrastinate?", "What is cognitive bias?", "Why is change uncomfortable?", "What makes someone trustworthy?", "Why do we compare ourselves to others?", "What is emotional intelligence?", "Why do habits matter?", "What makes a good listener?"]) },
  { type: "opinion", instruction: "Give your opinion in one clear paragraph:", content: () => randomFrom(["Is it better to be honest or kind?", "Is social media making us lonelier?", "Should you follow passion or practicality?", "Is it possible to be too empathetic?", "Is failure necessary for success?"]) },
  { type: "rewrite", instruction: "Rewrite this to be half the length but keep the meaning:", content: () => randomFrom(["The reason why I think that people should probably try to be more disciplined is because it really helps them to actually achieve the things that they want to achieve in their daily lives and overall.", "In my personal opinion, I believe that social media has both good and bad aspects to it, and there are many different reasons for this that I could probably talk about.", "When you think about it, the thing that makes communication really hard is that people don't always say what they actually mean and sometimes they don't even know what they mean themselves."]) },
  { type: "synonym", instruction: "List 8+ synonyms for this word, then pick your favourite and use it in a sentence:", content: () => randomFrom(["happy", "sad", "angry", "scared", "confused", "tired", "excited", "worried", "surprised", "confident"]) }
];

const READ_LEARN_PASSAGES = [
  {
    id: "stoicism",
    title: "On Stoicism",
    text: "The happiness of your life depends upon the quality of your thoughts. We suffer more often in imagination than in reality. It is not things that disturb us, but our judgements about things. If you are distressed by anything external, the pain is not due to the thing itself, but to your estimate of it — and this you have the power to revoke at any moment. You have power over your mind, not outside events. Realise this, and you will find strength.",
    source: "Adapted from Marcus Aurelius & Epictetus",
    keywords: ["stoicism", "judgement", "perception", "resilience", "mindset"],
    vocabWords: [
      { word: "distressed", definition: "Suffering from anxiety, sorrow, or pain", example: "She was visibly distressed after hearing the news." },
      { word: "revoke", definition: "To officially cancel or take back", example: "He revoked his earlier statement after learning the full story." },
      { word: "estimate", definition: "A judgement or assessment of the value or nature of something", example: "Her estimate of the situation turned out to be wrong." }
    ]
  },
  {
    id: "habits",
    title: "How Habits Shape Us",
    text: "Every action you take is a vote for the type of person you wish to become. No single instance will transform your beliefs, but as the votes build up, so does the evidence of your new identity. The most practical way to change who you are is to change what you do. Each habit not only gets results but also teaches you something far more important: to trust yourself. When the votes mount up and the evidence begins to change, so does the story you tell yourself.",
    source: "Adapted from James Clear, Atomic Habits",
    keywords: ["habits", "identity", "behaviour", "self-improvement", "consistency"],
    vocabWords: [
      { word: "instance", definition: "A single occurrence or example of something", example: "In this instance, patience proved more effective than force." },
      { word: "transform", definition: "To change completely in form, nature, or character", example: "Travel has the power to transform how you see the world." },
      { word: "mount up", definition: "To gradually increase in quantity or degree", example: "Small daily improvements mount up into significant change over time." }
    ]
  },
  {
    id: "empathy",
    title: "The Nature of Empathy",
    text: "Empathy is not about having the same experience as another person. It is about the willingness to be moved by their experience. It requires us to slow down, suspend our own agenda, and genuinely attend to what someone else is going through. This is harder than it sounds. Our instinct is often to fix, advise, or compare — but empathy asks us to simply witness. The paradox is that this witnessing, this quiet presence, often does more to heal than any solution we could offer.",
    source: "Original",
    keywords: ["empathy", "listening", "presence", "emotional intelligence", "connection"],
    vocabWords: [
      { word: "suspend", definition: "To temporarily stop or set aside", example: "She suspended her judgement until she heard the full story." },
      { word: "agenda", definition: "An underlying intention or motive", example: "He listened without any agenda of his own." },
      { word: "paradox", definition: "A statement or situation that seems contradictory but reveals a truth", example: "The paradox of choice is that more options can lead to less satisfaction." }
    ]
  },
  {
    id: "confidence",
    title: "Real Confidence",
    text: "Confidence is not the absence of doubt. It is the willingness to act despite it. Truly confident people are not those who never feel uncertain — they are the ones who have learned to move through uncertainty without needing it to resolve first. Confidence is quiet. It does not need external validation to exist. It comes from repeated evidence that you can handle difficulty, that you can survive discomfort, and that your worth is not determined by any single outcome.",
    source: "Original",
    keywords: ["confidence", "self-worth", "doubt", "resilience", "courage"],
    vocabWords: [
      { word: "validation", definition: "Recognition or affirmation that a person's feelings or opinions are worthwhile", example: "She stopped seeking validation from people who didn't understand her." },
      { word: "resolve", definition: "To settle or find a solution to a problem; also: firm determination", example: "He waited for his anxiety to resolve before making a decision." },
      { word: "discomfort", definition: "A state of physical or mental unease", example: "Growth often lives on the other side of discomfort." }
    ]
  },
  {
    id: "language_thought",
    title: "How Language Shapes Thought",
    text: "The limits of your language are the limits of your world. When you lack a word for something, that experience becomes harder to think about clearly. Languages that have specific words for complex emotions — like the Japanese 'mono no aware' (the bittersweet awareness of impermanence) or the German 'Schadenfreude' (pleasure from another's misfortune) — allow their speakers to recognise and articulate those feelings more readily. Expanding your vocabulary is not just about sounding smarter. It is about perceiving more of reality.",
    source: "Adapted from Wittgenstein & linguistic relativity research",
    keywords: ["language", "vocabulary", "perception", "thought", "cognition"],
    vocabWords: [
      { word: "articulate", definition: "To express an idea or feeling clearly and effectively", example: "She struggled to articulate exactly why the painting moved her." },
      { word: "impermanence", definition: "The state of not lasting forever; transience", example: "Buddhism teaches awareness of the impermanence of all things." },
      { word: "perceiving", definition: "Becoming aware of something through the senses or the mind", example: "He began perceiving patterns he had never noticed before." }
    ]
  },
  {
    id: "fear_change",
    title: "Why We Fear Change",
    text: "The brain is wired to prefer the familiar, even when the familiar is painful. This is because the brain's primary job is not to make you happy — it is to keep you alive. And from a survival standpoint, the known is safer than the unknown. Change represents unpredictability, and unpredictability triggers the same neural circuits as physical threat. This is why people stay in jobs they hate, relationships that drain them, and patterns that no longer serve them. The discomfort of change feels like danger, even when it is actually growth.",
    source: "Adapted from neuroscience and psychology research",
    keywords: ["change", "fear", "brain", "comfort zone", "growth"],
    vocabWords: [
      { word: "unpredictability", definition: "The quality of being impossible to foresee or expect", example: "The unpredictability of life is both terrifying and exciting." },
      { word: "neural circuits", definition: "Networks of neurons in the brain that process specific types of information", example: "Repeated practice strengthens the neural circuits involved in a skill." },
      { word: "serve", definition: "To be useful or beneficial to; to fulfil a purpose", example: "Ask yourself whether your current habits still serve the person you're becoming." }
    ]
  },
  {
    id: "listening",
    title: "The Art of Listening",
    text: "Most people do not listen with the intent to understand — they listen with the intent to reply. While someone is speaking, they are already formulating their response, waiting for a gap to insert their own story or opinion. True listening requires a kind of ego surrender. You must temporarily let go of your own perspective and enter someone else's. This is uncomfortable, because it means sitting with uncertainty, with not-knowing, with the possibility that you might be changed by what you hear.",
    source: "Adapted from Stephen Covey and Carl Rogers",
    keywords: ["listening", "communication", "empathy", "ego", "understanding"],
    vocabWords: [
      { word: "formulating", definition: "Creating or developing carefully and methodically", example: "She was already formulating her argument before he finished speaking." },
      { word: "surrender", definition: "To give up control or possession of something", example: "Good conversation requires a surrender of the need to be right." },
      { word: "perspective", definition: "A particular way of viewing things based on one's experience and beliefs", example: "Travelling broadened his perspective on what a 'normal' life looks like." }
    ]
  },
  {
    id: "procrastination",
    title: "The Truth About Procrastination",
    text: "Procrastination is not a time management problem — it is an emotion regulation problem. People procrastinate not because they are lazy, but because the task triggers an uncomfortable emotion: anxiety, boredom, self-doubt, fear of failure. The brain then seeks relief by switching to something that provides immediate comfort. Understanding this changes everything. The solution is not better scheduling or more willpower. It is learning to tolerate discomfort long enough to begin. Once you start, the negative emotions typically diminish, because action creates momentum.",
    source: "Adapted from Dr. Tim Pychyl's research",
    keywords: ["procrastination", "emotion", "self-regulation", "motivation", "discomfort"],
    vocabWords: [
      { word: "regulation", definition: "The process of controlling or managing something", example: "Emotional regulation is a skill that improves with practice." },
      { word: "tolerate", definition: "To accept or endure something unpleasant without complaint", example: "Learning to tolerate boredom is an underrated life skill." },
      { word: "diminish", definition: "To become or make smaller, fewer, or less", example: "Her fears diminished as she gained more experience." }
    ]
  },
  {
    id: "identity",
    title: "Who Are You, Really?",
    text: "Identity is not something you discover like a hidden treasure. It is something you construct, piece by piece, through the choices you make and the stories you tell yourself. The danger is in treating identity as fixed — 'I am this kind of person' — because it closes off the possibility of change. A healthier view is that identity is a living process. You are not the same person you were five years ago, and you will not be the same person five years from now. The question is not 'who am I?' but 'who am I choosing to become?'",
    source: "Original, informed by narrative psychology",
    keywords: ["identity", "self", "change", "growth", "narrative"],
    vocabWords: [
      { word: "construct", definition: "To build or create something systematically", example: "We construct meaning from our experiences, not just absorb it." },
      { word: "narrative", definition: "A story or account of connected events", example: "The narrative you tell yourself about your life shapes how you experience it." },
      { word: "fixed", definition: "Firmly established and not subject to change", example: "A fixed mindset assumes talent is innate rather than developed." }
    ]
  },
  {
    id: "communication",
    title: "Why Communication Breaks Down",
    text: "The biggest illusion in communication is that it has taken place. We assume that because we said something, the other person understood it the way we intended. But meaning does not transfer cleanly between minds. Every message passes through two filters: the speaker's ability to encode their thoughts into words, and the listener's ability to decode those words back into meaning. Both filters are shaped by different experiences, assumptions, and emotional states. This is why clarifying, checking understanding, and asking 'what did you hear me say?' matters more than eloquence.",
    source: "Adapted from George Bernard Shaw and communication theory",
    keywords: ["communication", "understanding", "misunderstanding", "clarity", "language"],
    vocabWords: [
      { word: "illusion", definition: "A false idea or belief; something that deceives the senses or mind", example: "Control is often an illusion — we have less of it than we think." },
      { word: "encode", definition: "To convert thoughts or information into a particular form (e.g., words)", example: "She struggled to encode her complex feelings into simple language." },
      { word: "eloquence", definition: "The art of using language in a fluent, persuasive, and expressive way", example: "His eloquence made even mundane topics feel fascinating." }
    ]
  }
];

const STRUCTURE_EXERCISES = [
  {
    id: "argue_structure",
    title: "The Argument Structure",
    model: "Claim: Social media does more harm than good for young people.\n\nEvidence: Research from the University of Pennsylvania found that limiting social media to 30 minutes per day led to significant reductions in loneliness and depression. The constant exposure to curated highlight reels distorts our perception of normal life, creating unrealistic expectations.\n\nCounterargument: Proponents argue that social media fosters connection, especially for isolated individuals. This is valid — but the net effect, when we weigh compulsive use, anxiety, and comparison culture against occasional genuine connection, tips negative.\n\nConclusion: The platforms themselves are not inherently evil, but their design — optimised for engagement, not wellbeing — makes moderation nearly impossible for developing minds.",
    skeleton: "Claim → Evidence (with source) → Counterargument (acknowledged fairly) → Conclusion (nuanced, not absolute)",
    topic: "Write your own argument using this structure on the topic: 'Is remote work better than office work?'"
  },
  {
    id: "explain_structure",
    title: "The Clear Explanation",
    model: "Cognitive bias is a systematic pattern of deviation from rational thinking. In simpler terms, it's a mental shortcut that your brain takes which can lead you to inaccurate conclusions.\n\nHere's a common example: the confirmation bias. Once you believe something, your brain automatically pays more attention to information that supports that belief and ignores information that contradicts it. If you think a certain diet works, you'll notice every success story and dismiss every failure.\n\nWhy does this matter? Because these biases operate invisibly. You don't feel yourself being irrational — you feel certain. Awareness is the first step to thinking more clearly.",
    skeleton: "Definition (formal) → Simplified version → Concrete example → Why it matters → Takeaway",
    topic: "Explain 'the Dunning-Kruger effect' using this structure."
  },
  {
    id: "reflect_structure",
    title: "The Reflective Piece",
    model: "I used to believe that being busy meant being productive. My calendar was packed, I wore exhaustion like a badge, and I measured my worth by how much I could fit into a day.\n\nThe shift happened slowly. I noticed that my busiest weeks produced the least meaningful work. I was moving fast but going nowhere. The activities that actually mattered — deep thinking, creative work, real conversation — needed space, not speed.\n\nNow I protect empty time fiercely. Not laziness — intentional stillness. The irony is that I accomplish more in a half-full day than I ever did in an overflowing one.",
    skeleton: "Old belief → What changed (the trigger) → New understanding → Current practice → Insight/irony",
    topic: "Write a reflective piece about a belief you've changed your mind about, using this structure."
  },
  {
    id: "compare_structure",
    title: "The Comparison",
    model: "Loneliness and solitude look similar from the outside — both involve being alone. But internally, they could not be more different.\n\nLoneliness is the feeling of lacking connection even when you crave it. It's an ache, an absence. You can feel lonely in a crowded room if no one truly sees you. Solitude, by contrast, is chosen. It's the experience of being alone without feeling alone. It's restorative, not depleting.\n\nThe key difference is agency. Solitude has it; loneliness doesn't. One is a retreat; the other is a prison with invisible walls.",
    skeleton: "Surface similarity → Definition A (with feeling) → Definition B (with contrast) → Key distinguishing factor → Metaphor/image",
    topic: "Compare 'confidence' and 'arrogance' using this structure."
  },
  {
    id: "persuade_structure",
    title: "The Persuasive Piece",
    model: "You should start journaling. Not because it's trendy, and not because someone told you to — but because your brain is lying to you, and you don't even know it.\n\nWhen thoughts stay in your head, they loop. They feel bigger than they are. They tangle together until you can't tell anxiety from intuition, or a real problem from a manufactured one. Writing forces these thoughts into a line. It makes them visible, finite, and manageable.\n\nYou don't need a fancy notebook. You don't need to write well. You just need five minutes and the willingness to be honest with yourself on paper. Try it for one week. If it doesn't help, you've lost nothing. If it does, you've gained a tool for life.",
    skeleton: "Hook (unexpected angle) → Problem (what's wrong without it) → Solution (how it helps) → Lower the barrier (make it easy) → Challenge/call to action",
    topic: "Write a persuasive piece convincing someone to try a habit you believe in, using this structure."
  }
];

function randomFrom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomPrompt(category) {
  if (category && PROMPTS[category]) {
    return {
      prompt: randomFrom(PROMPTS[category].prompts),
      task: PROMPTS[category].tasks.length ? randomFrom(PROMPTS[category].tasks) : null,
      category: category
    };
  }
  const categories = Object.keys(PROMPTS);
  const cat = randomFrom(categories);
  return {
    prompt: randomFrom(PROMPTS[cat].prompts),
    task: PROMPTS[cat].tasks.length ? randomFrom(PROMPTS[cat].tasks) : null,
    category: cat
  };
}

function getQuickExercise() {
  const exercise = randomFrom(QUICK_MODE_EXERCISES);
  return {
    type: exercise.type,
    instruction: exercise.instruction,
    content: exercise.content()
  };
}
