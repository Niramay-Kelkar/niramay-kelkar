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

export const FEATURED_PROJECT = {
  name: "JobIntel",
  tagline: "Job Aggregation & NLP Matching Platform",
  dates: "Jun 2026 – Present",
  url: "https://github.com/Niramay-Kelkar",
  bullets: [
    "Open-source scraping and ETL pipeline (Scrapy + FastAPI) targeting Greenhouse and Lever ATS platforms, with deduplication and bulk UPSERT into a normalized PostgreSQL schema tuned for write-heavy ingestion.",
    "Sentence-BERT semantic matching to rank jobs by resume fit using embedding similarity rather than keyword overlap, benchmarked across multiple model strategies.",
    "Built end-to-end with Claude Code for LLM-assisted development, code review, and debugging.",
  ],
};
