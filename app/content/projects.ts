export type ProjectKind = "survey" | "travel" | "build" | "trade" | "clinic";

export type CaseText = string | (string | { strong: string; tone?: "result" })[];

type CaseParagraph = {
  heading?: string;
  text: CaseText;
};

type Project = {
  slug: string;
  kind: ProjectKind;
  title: string;
  summary: string;
  proof: string;
  context: string;
  premise: string;
  search: { title: string; description: string };
  caption: string;
  status?: string;
  videoUrl?: string | null;
  actions: { label: string; href: string }[];
  sections: { title: string; body: CaseParagraph[] }[];
  booking: { title: string; description: string };
};

export const projects: Project[] = [
  {
    "slug": "survey-theme-analysis",
    "kind": "survey",
    "summary": "Find recurring themes in feedback and inspect the clause behind each tag.",
    "proof": "80% theme matching · 94% sentiment accuracy",
    "context": "Internal evaluation · 500 open-ended responses",
    "caption": "The flavour clause gets a positive tag. The packaging clause gets a negative one.",
    "title": "Survey Theme Analysis",
    "premise": "Turn hundreds of open-ended responses into themes you can check against what people actually said.",
    "search": {
      "title": "Survey Theme and Sentiment Analysis",
      "description": "A Python and Streamlit tool for open-ended survey analysis. See how it groups themes, scores sentiment by clause, and lets analysts correct tags."
    },
    "actions": [
      {
        "label": "Open Live App",
        "href": "https://thematic-analysis-awais.streamlit.app/"
      }
    ],
    "sections": [
      {
        "title": "The problem",
        "body": [
          {
            "text": "A survey response can praise the flavour and criticize the packaging in the same sentence. A single sentiment label loses that distinction. Manually tagging every response gives analysts more control, but the work grows with each new survey."
          }
        ]
      },
      {
        "title": "What I built",
        "body": [
          {
            "text": [
              "I built a Python pipeline and Streamlit app that take a CSV or Excel file and return a theme catalogue, sentiment by theme, and ",
              { "strong": "the clauses behind each tag" },
              ". Reviewers can adjust the catalogue or correct individual tags, then compare their edited result with the automatic output."
            ]
          },
          {
            "text": [
              "The pipeline first scores overall sentiment. It then uses spaCy to extract candidate phrases, embeds them with local models, and groups similar phrases with ",
              { "strong": "cosine-based agglomerative clustering" },
              ". The last stage checks which themes apply to each response, then scores sentiment on the relevant clauses."
            ]
          }
        ]
      },
      {
        "title": "Why I built it this way",
        "body": [
          {
            "heading": "Start from the phrases respondents used.",
            "text": "Clustering candidate phrases lets themes emerge from the survey. I included threshold-based discovery and a fixed-count option for cases where an analyst needs a particular level of detail."
          },
          {
            "heading": "Score sentiment at the clause level.",
            "text": "Linking each tag to a specific clause lets reviewers see why one response received different sentiments for flavour and packaging."
          },
          {
            "heading": "Keep review changes reproducible.",
            "text": [
              "Theme changes ",
              { "strong": "reuse saved embeddings" },
              " and rerun the scoring step. A one-off tag correction saves a review revision without running the models again. The pipeline runs with local models."
            ]
          }
        ]
      },
      {
        "title": "What I measured",
        "body": [
          {
            "text": [
              "On an internal evaluation set of 500 open-ended responses, the pipeline reached ",
              { "strong": "80% theme matching and 94% sentiment accuracy", "tone": "result" },
              ". In a separate reproducibility check, the modular version matched the saved notebook run’s theme catalogue, binary tags, and aspect scores."
            ]
          }
        ]
      }
    ],
    "booking": {
      "title": "Have feedback your team still tags by hand?",
      "description": "Bring a sample survey or a set of comments. We can talk through which decisions to automate and which should stay with your reviewers."
    }
  },
  {
    slug: "clinic-waitlist-automation",
    kind: "clinic",
    title: "Clinic Waitlist Automation",
    summary: "Offer a cancelled appointment to the next eligible patient on the waitlist.",
    proof: "Five-Zap workflow design",
    context: "Fictional clinic data · Interactive walkthrough",
    premise: "When a patient cancels, give the next person on the waitlist a chance to take the appointment.",
    search: {
      title: "Clinic Waitlist Automation Case Study",
      description: "Explore a five-Zap clinic waitlist design and try an interactive demo of cancellations, offers, expiry, and rebooking.",
    },
    caption: "The calendar preview shows the 2:30 p.m. slot confirmed for the next available patient.",
    videoUrl: null,
    actions: [],
    sections: [
      {
        title: "The problem",
        body: [
          {
            text: "A last-minute cancellation leaves reception with an empty slot and a list of people to call. Staff have to check who wants that appointment type, who can make the time and when to move on if someone is silent.",
          },
        ],
      },
      {
        title: "What I built",
        body: [
          {
            text: "Three Zaps handle matching, replies, and offer expiry. I designed two more to connect the waitlist to the clinic calendar. The interactive walkthrough shows how all five would work together.",
          },
          {
            heading: "Detect Calendar Cancellation (planned)",
            text: "A cancellation in the clinic calendar opens the matching slot in Google Sheets. Reception can then see that the time is available for an offer.",
          },
          {
            heading: "Send Offer",
            text: "A ready slot in Google Sheets starts the workflow. Zapier checks who opted in, needs that appointment type and is free for the full slot. It emails the first eligible patient in join order and holds the slot for five minutes.",
          },
          {
            heading: "Waitlist - Process Reply",
            text: "The patient uses the offer link to accept or decline. An acceptance records the patient’s reply and emails reception. A decline reopens the slot so the next eligible person gets an offer.",
          },
          {
            heading: "Waitlist - Expire Offer",
            text: "When the deadline passes, the Zap checks that the same offer is still active before it reopens the slot. The next patient gets a fresh offer. If the list runs out, reception gets a review email.",
          },
          {
            heading: "Book Accepted Appointment (planned)",
            text: "An acceptance triggers a fresh availability check. If the slot is still free, the Zap creates the calendar booking and sends a confirmation. If another booking took the slot, reception gets the case to review.",
          },
        ],
      },
    ],
    booking: {
      title: "Still filling cancellations by hand?",
      description: "Bring your booking and waitlist process. We can map what can be automated and when a slot needs reception’s attention.",
    },
  },
  {
    "slug": "pakistan-north-travel-ai",
    "kind": "travel",
    "summary": "A chatbot that shows the guide pages behind its answers.",
    "proof": "49 searchable passages",
    "context": "Extracted from a 92-page travel guide",
    "caption": "An example answer with its source pages from the travel guide.",
    "title": "Pakistan North Travel AI",
    "premise": "Ask about northern Pakistan and see the pages behind each answer.",
    "search": {
      "title": "RAG Chatbot with PDF Citations",
      "description": "See how Pakistan North Travel AI answers questions from a 92-page travel guide and cites the PDF pages behind its answers. Try the live RAG chatbot."
    },
    "actions": [
      {
        "label": "Open Live App",
        "href": "https://pakistan-north-travel-ai.streamlit.app/"
      },
      {
        "label": "View GitHub Repository",
        "href": "https://github.com/awaisarif18/pakistan-north-travel-buddy"
      }
    ],
    "sections": [
      {
        "title": "The problem",
        "body": [
          {
            "text": "The useful details in a travel guide are rarely all on one page. A question about a route can depend on transport, fuel, and terrain. Travellers also need a way to check where an answer came from, especially when they’re planning around a constraint."
          }
        ]
      },
      {
        "title": "What I built",
        "body": [
          {
            "text": [
              "I turned a 92-page guide into ",
              { "strong": "49 searchable passages", "tone": "result" },
              ", preserving page ranges and extracting fare tables alongside the text. The Streamlit app uses Gemini, LangChain, LangGraph, and a bundled Chroma index. It supports follow-up questions, shows the original passages, and offers a trip planner and beta destination comparisons."
            ]
          }
        ]
      },
      {
        "title": "Why I built it this way",
        "body": [
          {
            "heading": "Compare retrieval methods before adding complexity.",
            "text": [
              "I evaluated dense similarity, BM25 keyword search, and hybrid retrieval. ",
              { "strong": "Dense remained the default" },
              " and retrieved complete evidence in the top five for ",
              { "strong": "30 of 31 eligible held-out cases", "tone": "result" },
              "."
            ]
          },
          {
            "heading": "Carry context forward and keep citations inspectable.",
            "text": [
              "LangGraph keeps recent turns in the session so a follow-up can refer to the last destination or preference. Source IDs resolve to ",
              { "strong": "stored passages and page ranges users can open" },
              "."
            ]
          },
          {
            "heading": "Keep recommendation searches bounded.",
            "text": "The beta can make up to two targeted searches for a comparison. Its answers distinguish what the guide documents, what suitability the model infers, and what still needs checking."
          }
        ]
      },
      {
        "title": "What I measured",
        "body": [
          {
            "text": [
              "On 32 answerable held-out questions, dense retrieval achieved ",
              { "strong": "93.75% Hit@1 and 100% Hit@5", "tone": "result" },
              ". Those figures measure whether the system found relevant evidence."
            ]
          },
          {
            "text": [
              "In a separate development evaluation, ",
              { "strong": "three of six recommendation cases fully passed", "tone": "result" },
              ". One case cited useful pages but recommended a 3–4-hour walk to someone who asked for minimal walking. That result shows why I evaluate the recommendation itself as well as the citation. The app draws on the travel guide and provides no live road, weather, or booking data."
            ]
          }
        ]
      }
    ],
    "booking": {
      "title": "Have a knowledge base people struggle to search?",
      "description": "Bring a few questions and the documents that answer them. We can use those examples to define how a first version should retrieve, cite, and handle gaps."
    }
  },
  {
    "slug": "overnight-ai-build-lab",
    "kind": "build",
    "summary": "Send a brief from your phone. Review the plan, build, and checks from one report.",
    "proof": "Checkpointed builds",
    "context": "Private build environment",
    "caption": "A Telegram brief starts a checkpointed OpenCode build on a remote VM. The bot sends back a report for review.",
    "title": "Overnight AI Build Lab",
    "premise": "I close my laptop. The build keeps running.",
    "search": {
      "title": "Overnight AI Build Lab and Invoice Review",
      "description": "An AI development workflow that runs on a remote VM with checkpoints. See how it produced a tool that compares invoices, purchase orders, and contracts."
    },
    "status": "Private build environment.",
    "actions": [],
    "sections": [
      {
        "title": "The problem",
        "body": [
          {
            "text": "I wanted to test small product ideas without spending every evening starting from an empty repo. The build needed to run independently of my laptop, preserve progress, and leave me enough evidence to review the result in the morning."
          }
        ]
      },
      {
        "title": "What I built",
        "body": [
          {
            "text": "I set up one Ubuntu ARM64 VM on Oracle Cloud for remote development and overnight builds. During the day I connect over Tailscale with VS Code Remote SSH. For an overnight build, I send a brief to a Telegram bot. OpenCode agents plan the work, implement it, run checks, and review it before sending a report. Systemd keeps the bot and preview services running."
          }
        ]
      },
      {
        "title": "Why I built it this way",
        "body": [
          {
            "heading": "Use Telegram for input and progress.",
            "text": "I can submit a brief or check a run from my phone. Code, logs, and artifacts stay on the VM."
          },
          {
            "heading": "Save checkpoints between tasks.",
            "text": [
              "The ",
              { "strong": "plan and task ledger" },
              " show what finished and where the run stopped. A recoverable failure can retry or switch model providers. A blocked task can report what happened and wait for me to intervene."
            ]
          },
          {
            "heading": "Give builds and previews their own runtimes.",
            "text": [
              "Builds run inside ",
              { "strong": "rootless Podman" },
              ". Published previews use a separate runtime with CPU and memory limits. Provider and signing credentials stay on the host."
            ]
          }
        ]
      },
      {
        "title": "A build from the lab",
        "body": [
          {
            "text": [
              "The Supplier Invoice Reviewer checks invoices against purchase orders and contract terms. In the demo, both the invoice and purchase order listed $12 per unit. The contract listed $10. Across 100 units, the reviewer flagged ",
              { "strong": "a $200 discrepancy", "tone": "result" },
              " and pointed to the invoice row and pricing amendment."
            ]
          },
          {
            "text": [
              "Prototype previews can use Tailscale Funnel. The invoice reviewer has a separate path: GitHub Actions tests and builds the React app, sends the artifact to the VM over restricted SSH, and switches the Caddy-served HTTPS release. It ",
              { "strong": "retains the prior build for rollback" },
              "."
            ]
          }
        ]
      }
    ],
    "booking": {
      "title": "Have a workflow you’d like to prototype?",
      "description": "Bring one task that can be defined and checked independently. We’ll work out what a first run should produce and how you’ll know it succeeded."
    }
  },
  {
    "slug": "tradesync-pro",
    "kind": "trade",
    "summary": "Copy trades across MetaTrader 5 accounts with independent risk settings.",
    "proof": "New signals delivered after reconnect",
    "context": "Backend-restart smoke test · Demo planned",
    "caption": "The Socket.IO gateway routes the MT5 provider’s signal. Each copier applies its own risk limits and position sizing.",
    "title": "TradeSync Pro",
    "premise": "Copy a trade across MetaTrader 5 accounts while respecting each account’s own risk settings.",
    "search": {
      "title": "TradeSync Pro MT5 Copy Trading System",
      "description": "A MetaTrader 5 copy trading case study covering real-time signal delivery, position sizing for each account, and recovery after reconnecting."
    },
    "status": "Live deployment planned.",
    "actions": [
      {
        "label": "View GitHub Repository",
        "href": "https://github.com/awaisarif18/TradeSync_Pro/"
      }
    ],
    "sections": [
      {
        "title": "The problem",
        "body": [
          {
            "text": "Trade copying involves more than relaying a buy or sell message. Brokers can use different symbols for the same instrument, accounts need different position sizes, and a later close has to target the position the copier actually opened."
          }
        ]
      },
      {
        "title": "What I built",
        "body": [
          {
            "text": [
              "I built a real-time system with Python and PySide6 desktop clients, a ",
              { "strong": "NestJS and Socket.IO gateway" },
              ", a SQL Server database, and a Next.js dashboard. The provider client watches positions in its MT5 terminal and emits open and close events. The gateway routes the signal to subscribers. Each copier applies its local rules and submits the order through its own terminal."
            ]
          }
        ]
      },
      {
        "title": "Why I built it this way",
        "body": [
          {
            "heading": "Route by subscription.",
            "text": "Socket.IO rooms give the gateway a way to deliver each provider’s signals to the right group of clients. The web dashboard handles subscriptions, account views, trade history, and admin controls."
          },
          {
            "heading": "Resolve the trade locally.",
            "text": [
              "The copier maps broker symbols, applies fixed or multiplier sizing, and checks configured equity, loss, position, and price-drift limits. After opening a trade, it ",
              { "strong": "maps the provider’s ticket to the local ticket" },
              " so a later close targets the right position."
            ]
          },
          {
            "heading": "Make reconnection observable.",
            "text": "Clients register again after reconnecting. Acknowledgments and trace IDs help follow a signal across the provider, gateway, and copier."
          }
        ]
      },
      {
        "title": "What I verified",
        "body": [
          {
            "text": [
              "In the documented restart smoke test, the system delivered a signal before the gateway restarted. After clients reconnected and registered again, ",
              { "strong": "it delivered a new signal", "tone": "result" },
              ". That test covers reconnect and new delivery. Replay of signals missed during downtime remains outside the verified flow."
            ]
          }
        ]
      }
    ],
    "booking": {
      "title": "Building a system that has to react in real time?",
      "description": "We can start by mapping what must happen when an event arrives, and what the system should do when part of the connection drops."
    }
  },
];
