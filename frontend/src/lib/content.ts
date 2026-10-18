export const SUMMARY =
  "Backend engineer with 6 years building production APIs, microservices, and data backends in Java, Python, and C#. I focus on reliability — observability, database optimization, and automated tooling that eliminates recurring production issues — and actively integrate AI-assisted tooling like Claude Code into my day-to-day engineering workflow.";

export type ExperienceEntry = {
  role: string;
  company: string;
  location: string;
  dates: string;
  bullets: string[];
};

export const EXPERIENCE: ExperienceEntry[] = [
  {
    role: "Software Engineer",
    company: "Atos (client: Thomas Built Buses)",
    location: "High Point, NC",
    dates: "Aug 2022 – Aug 2026",
    bullets: [
      "Built reliability into 5 .NET Core/C# microservices with async job queuing, structured retry logic, and input validation, eliminating weekly production outages.",
      "Built a Prometheus + Splunk observability stack from scratch with SLI/SLO baselines and alert thresholds, cutting incident detection time by 40% and post-mortem investigation from hours to under 2.",
      "Eliminated recurring on-call escalations across three high-traffic APIs by analyzing Oracle DB execution plans and adding missing composite indexes.",
      "Built an autonomous remediation agent for two manufacturing checkpoints, polling every 15 minutes against SAP records and triggering corrective RFC calls automatically.",
      "Cut documentation effort from several weeks to under one week by integrating Claude Code into daily workflows for specs and boilerplate across 80 applications, later extending adoption to root-cause analysis and feature development.",
      "Led requirements-gathering, scoping, and sign-off directly with client business users across 3 internal teams, owning solution design end to end.",
    ],
  },
  {
    role: "Software Engineer Intern",
    company: "Nok Nok",
    location: "San Jose, CA",
    dates: "Jun 2021 – Dec 2021",
    bullets: [
      "Cut pre-release test runtime by 60% by parallelizing JMeter load test plans across isolated Kubernetes pods on GCP.",
      "Caught 3 concurrency bugs and 2 memory leaks invisible at normal load by building a 10,000-concurrent-request simulation.",
      "Integrated automated security/compliance scanning into 3 CI/CD pipelines with merge-blocking on scan failures.",
    ],
  },
  {
    role: "Software Engineer",
    company: "Advanced (One Advanced)",
    location: "Vadodara, Gujarat, India",
    dates: "May 2017 – Dec 2019",
    bullets: [
      "Built and owned the backend for a live sports ticketing platform for Premier League clubs (Liverpool, Everton, Sheffield United, Nottingham Forest), handling 30,000–55,000-attendee on-sale traffic spikes without downtime.",
      "Led migration of IBM AS400/RPG business logic into Spring Boot microservices, improving deployment frequency by 40%.",
    ],
  },
];

export type EducationEntry = {
  degree: string;
  school: string;
  location: string;
  dates: string;
};

export const EDUCATION: EducationEntry[] = [
  {
    degree: "M.S. Information Systems",
    school: "Northeastern University",
    location: "Boston, MA",
    dates: "Jan 2020 – May 2022",
  },
  {
    degree: "B.E. Computer Engineering",
    school: "Gujarat Technological University",
    location: "Anand, Gujarat, India",
    dates: "Aug 2013 – May 2017",
  },
];

export const SKILLS: Record<string, string[]> = {
  Languages: ["Java", "Python", "C#", "C++", "JavaScript", "SQL", "Bash"],
  Backend: ["Spring Boot", "FastAPI", ".NET Core", "REST APIs", "microservices", "async processing"],
  "AI & Dev Tools": ["Claude Code", "LLM-assisted development", "Sentence-BERT", "NLP", "semantic search"],
  Databases: ["PostgreSQL", "Oracle DB", "MySQL", "SQL Server"],
  "Cloud & Infra": ["AWS", "GCP", "Docker", "Kubernetes"],
  Observability: ["Prometheus", "Grafana", "Splunk", "New Relic", "SLI/SLO"],
};

export type FeaturedProject = {
  name: string;
  tagline: string;
  dates: string;
  url: string;
  demoUrl?: string;
  bullets: string[];
};

export const FEATURED_PROJECTS: FeaturedProject[] = [
  {
    name: "HuntLoop",
    tagline: "Job Aggregation & Resume-Matching Platform",
    dates: "Jun 2026 – Present",
    url: "https://github.com/Niramay-Kelkar/HuntLoop",
    demoUrl: "https://huntloop-demo.vercel.app/dashboard",
    bullets: [
      "Aggregates 130K+ job postings from 743 companies across 7 ATS platforms, fuzzy-matched against 1.4M DOL LCA records.",
      "Ranks postings by resume fit using Sentence-BERT embeddings via pgvector at 100% coverage, tuned against an 11-job validation harness for match quality.",
      "Live company-research feature built on the Tavily search API, surfacing summaries, news, funding, and hiring signals for all 389 tracked companies via a credit-conscious single-call extraction pattern and a calendar-month-aware budget ledger.",
      "Anonymous feedback and triage pipeline: a capture endpoint returning 202 with async LLM triage through a Groq/Gemini router, per-IP rate limiting, a public status page showing only reviewed items, and a live Grafana panel tracking feedback volume by category.",
    ],
  },
  {
    name: "Hands-Off",
    tagline: "LLM Agent for Operating Legacy Web Consoles",
    dates: "Aug 2026",
    url: "https://github.com/Niramay-Kelkar/hands-off",
    bullets: [
      "An LLM-driven discovery agent that explores a live UI once to complete a task, then compiles what it learned into a typed, replayable capability artifact — no model in the loop on replay.",
      "Replays are deterministic: given a compiled artifact and new inputs, the same flow runs again exactly, with structured handling for runtime outcomes like validation errors and permission denials instead of a crash.",
      "Safety guardrails gate destructive or ambiguous actions behind a checkpoint, and human-in-the-loop escalation hands control of the live session to an operator when replay hits a condition it can't recover from.",
      "Proven across tenants: the same compiled capability was replayed unmodified against a second, differently-branded console (a credit-union-style interface with its own layout, markup, and class naming) with identical behavior — verified through a capability API, a chatbot interface, and an operations dashboard built on top of the recorded capabilities.",
    ],
  },
];
