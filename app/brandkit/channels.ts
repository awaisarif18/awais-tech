type Sample = {
  id: string;
  format: string;
  title: string;
  url: string;
  embedUrl: string;
};

type Channel = {
  slug: string;
  label: string;
  handle: string;
  metric: string;
  platform: "Instagram" | "YouTube" | "Facebook";
  url: string;
  description: string;
  samples: Sample[];
};

export const channels: Channel[] = [
  {
    slug: "m-awais-arif",
    label: "Travel and Photography",
    handle: "@m.awais_arif",
    metric: "1,212 followers",
    platform: "Instagram",
    url: "https://www.instagram.com/m.awais_arif/",
    description: "Travel films, outdoor photography, and the stories behind the images.",
    samples: [
      {
        id: "kashmir-photography",
        format: "Photography Reel",
        title: "Keeping Present Through Photography in Kashmir",
        url: "https://www.instagram.com/reel/DbNyJUhKtK0/",
        embedUrl: "https://www.instagram.com/reel/DbNyJUhKtK0/embed/",
      },
      {
        id: "mountain-journeys",
        format: "Travel Reel",
        title: "Journeys Through Kashmir and Hunza",
        url: "https://www.instagram.com/reel/DdRdIdWqveS/",
        embedUrl: "https://www.instagram.com/reel/DdRdIdWqveS/embed/",
      },
    ],
  },
  {
    slug: "awais-deploys",
    label: "Tech and AI",
    handle: "@awais.deploys",
    metric: "69 followers",
    platform: "Instagram",
    url: "https://www.instagram.com/awais.deploys/",
    description: "AI tools, product demos, and the engineering decisions behind what I build.",
    samples: [
      {
        id: "overnight-build",
        format: "Tech Carousel",
        title: "I Close My Laptop. The Build Keeps Running.",
        url: "https://www.instagram.com/p/Df70rSViLiv/",
        embedUrl: "https://www.instagram.com/p/Df70rSViLiv/embed/",
      },
      {
        id: "sql-interview",
        format: "Tech Reel",
        title: "Reading a Messy SQL Interview Question",
        url: "https://www.instagram.com/reel/DgD0Cp8oa3c/",
        embedUrl: "https://www.instagram.com/reel/DgD0Cp8oa3c/embed/",
      },
    ],
  },
  {
    slug: "youtube",
    label: "Long-Form Video",
    handle: "@MuhammadAwaisArif",
    metric: "611 subscribers",
    platform: "YouTube",
    url: "https://www.youtube.com/muhammadawaisarif",
    description: "Travel vlogs from Kashmir and Mushkpuri Top, plus a short film from IAC Film Fest 2023.",
    samples: [
      {
        id: "kashmir-vlog",
        format: "Travel Vlog",
        title: "My First Kashmir Travel Vlog",
        url: "https://www.youtube.com/watch?v=A7q03e-TYo4",
        embedUrl: "https://www.youtube-nocookie.com/embed/A7q03e-TYo4",
      },
      {
        id: "mushkpuri-top",
        format: "Travel Vlog",
        title: "Mushkpuri Top: The Adventure You Didn’t Know You Needed",
        url: "https://www.youtube.com/watch?v=3R8WjWfgK8A",
        embedUrl: "https://www.youtube.com/embed/3R8WjWfgK8A?feature=oembed",
      },
      {
        id: "try-new-things",
        format: "Short Film",
        title: "Try New Things | IAC Film Fest 2023",
        url: "https://www.youtube.com/watch?v=KI4J12JhH4U",
        embedUrl: "https://www.youtube-nocookie.com/embed/KI4J12JhH4U",
      },
    ],
  },
  {
    slug: "facebook",
    label: "Facebook Page",
    handle: "Muhammad Awais",
    metric: "440 followers",
    platform: "Facebook",
    url: "https://www.facebook.com/mawaisarif18/",
    description: "Photography and short videos. Facebook cross-posting is available as an additional placement for campaigns.",
    samples: [],
  },
];
