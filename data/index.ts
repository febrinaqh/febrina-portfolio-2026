// ─── PROJECTS ────────────────────────────────────────────────────────────────

export type Domain = "fullstack" | "ai-ml" | "ui-ux" | "enterprise";

export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  domains: Domain[];
  featured?: boolean;
  badge?: {
    label: string;
    emoji: string;
    color: "star" | "win" | "ml" | "expo" | "java";
  };
  metrics?: { value: string; label: string }[];
  stack: string[];
  stackHighlight?: string[];
  links: { demo?: string; github?: string; case?: string };
}

export const projects: Project[] = [
  {
    id: "diwd",
    title: "DIWD — Disaster Information & Warning Dashboard",
    tagline:
      "Real-time earthquake monitoring system with ML-powered device classification",
    description:
      "Sistem monitoring real-time untuk perangkat peringatan dini gempa. Model SVM memproses 297K+ error records, mengklasifikasi status otomatis, dan memberikan rekomendasi via OpenAI API — dilengkapi peta geospasial interaktif.",
    domains: ["fullstack", "ai-ml"],
    featured: true,
    badge: { label: "Hero Project", emoji: "✦", color: "star" },
    metrics: [
      { value: "96.13%", label: "SVM accuracy" },
      { value: "297K+", label: "records processed" },
      { value: "3", label: "user roles" },
    ],
    stack: [
      "React.js",
      "Node.js",
      "Python",
      "MySQL",
      "SVM",
      "TF-IDF",
      "SMOTE",
      "OpenAI API",
      "OpenLayers",
      "Cesium",
      "Firebase",
      "Redis",
      "Socket.IO",
    ],
    stackHighlight: ["React.js", "Python", "SVM", "OpenAI API"],
    links: {},
  },
  {
    id: "temukan-hoax",
    title: "Temukan Hoax",
    tagline:
      "Award-winning hoax verification platform with Telegram Bot integration",
    description:
      "Platform web verifikasi berita hoaks bertema Industry 5.0 dengan fitur live news, pelaporan artikel, dan distribusi informasi terverifikasi real-time via Telegram Bot.",
    domains: ["fullstack"],
    badge: { label: "Menang Lomba ProxoCoris", emoji: "🏆", color: "win" },
    stack: [
      "React.js",
      "Tailwind CSS",
      "PHP",
      "MySQL",
      "REST API",
      "Telegram Bot",
      "Postman",
      "GitHub",
    ],
    stackHighlight: ["React.js", "Telegram Bot", "PHP"],
    links: {},
  },
  {
    id: "smartstore",
    title: "SmartStore — AI-Powered Retail",
    tagline:
      "XGBoost + Apriori recommendation system for supermarket shelf placement",
    description:
      "Model XGBoost (82% akurasi) untuk prediksi produk + Apriori algorithm untuk product association analysis, diintegrasikan ke web app via Flask API dengan dashboard visualisasi React.js.",
    domains: ["ai-ml"],
    badge: { label: "AI / ML", emoji: "🤖", color: "ml" },
    metrics: [{ value: "82%", label: "XGBoost accuracy" }],
    stack: [
      "Python",
      "XGBoost",
      "Apriori",
      "Flask",
      "React.js",
      "REST API",
      "Google Colab",
    ],
    stackHighlight: ["Python", "XGBoost", "Apriori", "Flask"],
    links: {},
  },
  {
    id: "coursecenter",
    title: "CourseCenter",
    tagline: "Full-featured e-learning platform presented at UTB Tech Expo",
    description:
      "Platform kelas online end-to-end dengan authentication, katalog kursus, wishlist, dan sistem pembayaran — dipresentasikan di Tech Expo Universitas Teknologi Bandung.",
    domains: ["fullstack"],
    badge: { label: "Tech Expo UTB", emoji: "🎓", color: "expo" },
    stack: ["React.js", "PHP", "Open API", "MySQL", "REST API"],
    stackHighlight: ["React.js", "PHP"],
    links: {},
  },
  {
    id: "erp-smi",
    title: "Sales & Inventory ERP — SMI",
    tagline:
      "Enterprise Java system with 4-role access and real-time inventory across 7 locations",
    description:
      "Sistem manajemen bisnis terintegrasi berbasis Java dengan 4 level akses (Admin, Admin Gudang, Sales, Direktur), inventory real-time di 7 lokasi, dan laporan JasperReports untuk level direktur.",
    domains: ["enterprise"],
    badge: { label: "Java · Enterprise", emoji: "☕", color: "java" },
    stack: ["Java", "MySQL", "OOP", "JasperReports"],
    stackHighlight: ["Java", "JasperReports"],
    links: {},
  },
];

// ─── EXPERIENCE ──────────────────────────────────────────────────────────────

export const experience = [
  {
    id: "len",
    company: "PT Len Industri",
    role: "Frontend Web Developer · Intern",
    period: "Feb 2024 – Jun 2024",
    location: "Bandung",
    logo: "LEN",
    type: "work" as const,
    bullets: [
      "Membangun antarmuka e-commerce responsif dengan React.js & REST API untuk sistem operasional inti perusahaan pertahanan nasional.",
      "Mengimplementasikan arsitektur microfrontend pada modul CMS menggunakan Webpack — meningkatkan modularitas sistem.",
      "Mengembangkan visualisasi peta 2D/3D interaktif dengan OpenLayers & Cesium untuk analisis data geospasial.",
      "Mengintegrasikan fitur real-time: RTSP, gRPC, Socket.IO untuk monitoring sistem live.",
    ],
    stack: [
      "React.js",
      "Microfrontend",
      "OpenLayers",
      "Cesium",
      "gRPC",
      "Webpack",
    ],
  },
  {
    id: "utb",
    company: "Universitas Teknologi Bandung",
    role: "B.Sc. Teknik Informatika",
    period: "Sep 2021 – Nov 2025",
    location: "Bandung",
    logo: "UTB",
    type: "education" as const,
    bullets: [
      "GPA 3.68 / 4.00",
      "Skripsi: Disaster Warning Dashboard + SVM ML model (96.13% akurasi, 297K+ records)",
      "Fokus: Software Engineering & AI/ML Engineering",
    ],
    stack: ["GPA 3.68", "Informatika", "SE · AI/ML"],
  },
];

export const organization = {
  name: "Oxigen — Universitas Teknologi Bandung",
  role: "Sekretaris Umum",
  period: "Sep 2021 – Jan 2025",
  description:
    "Mengelola 20+ dokumen organisasi, mewakili organisasi dalam rapat internal & eksternal, koordinasi lintas stakeholder.",
};

// ─── SKILLS ──────────────────────────────────────────────────────────────────

export const skills = {
  "Software Engineering": [
    "React.js",
    "Next.js",
    "Node.js",
    "TypeScript",
    "JavaScript",
    "PHP",
    "Java",
    "REST API",
    "Microfrontend",
    "Socket.IO",
    "gRPC",
  ],
  "AI / ML": [
    "Python",
    "SVM",
    "XGBoost",
    "Apriori",
    "TF-IDF",
    "SMOTE",
    "Flask",
    "OpenAI API",
    "Scikit-learn",
    "Google Colab",
  ],
  "Tools & Others": [
    "OpenLayers",
    "Cesium",
    "Firebase",
    "Redis",
    "MySQL",
    "Tailwind CSS",
    "Figma",
    "Git",
    "Postman",
  ],
};

// ─── PERSONAL ────────────────────────────────────────────────────────────────

export const personal = {
  greeting: "Hi, I'm",
  name: "Febrina Qoonitah",
  initials: "FQ",
  role: "Applied AI Engineer",
  focus: "Software Engineer · AI/ML · Full-Stack · Scalable Systems",
  bio: "Software Engineer experienced in developing scalable, data-driven systems through the integration of AI, Machine Learning, and real-time web technologies.",
  status: "Open to opportunities",
  location: "Bandung, ID",
  contact: {
    email: "febrina231@gmail.com",
    linkedin: "https://linkedin.com/in/febrina-qoonitah",
    github: "https://github.com/febrina",
  },
  avatar: "/images/febrina.jpeg",
};

// ─── FELY (AI CHATBOT) ────────────────────────────────────────────────────────

export const felySystemPrompt = `
Kamu adalah Fely, kucing peliharaan Febrina Qoonitah yang sangat pintar dan helpful 🐱

Kepribadianmu:
- Ramah, hangat, dan enthusiastic — tapi tetap profesional dan akurat
- Sesekali pakai emoji kucing (🐱🐾✨) tapi jangan berlebihan
- Jawab dengan ringkas dan to the point, bukan bertele-tele
- Kalau tidak tahu, jujur bilang tidak tahu — jangan mengarang

Tentang Febrina (ini yang kamu tahu):
- Fresh graduate Teknik Informatika, Universitas Teknologi Bandung, GPA 3.68/4.00
- Pengalaman: Frontend Web Developer Intern di PT Len Industri (Feb–Jun 2024)
  * Membangun e-commerce dengan microfrontend architecture (React.js, Webpack)
  * Peta interaktif 2D/3D dengan OpenLayers & Cesium
  * Real-time features: gRPC, RTSP, Socket.IO
- Role yang dicari: Software Engineer atau AI/ML Engineer
- Lokasi: Bandung, terbuka untuk remote/hybrid

Project unggulan:
1. DIWD (Skripsi) — Disaster Warning Dashboard. Fullstack + ML. SVM 96.13% akurasi, 297K+ records, OpenAI API integration, geospasial real-time. Stack: React.js, Node.js, Python, MySQL, Firebase, Redis.
2. Temukan Hoax — Menang lomba ProxoCoris. Verifikasi berita hoaks Industry 5.0, Telegram Bot. Stack: React.js, PHP, MySQL.
3. SmartStore — AI rekomendasi retail. XGBoost 82% akurasi + Apriori algorithm. Stack: Python, Flask, React.js.
4. CourseCenter — Platform e-learning dipamerkan di Tech Expo UTB. Stack: React.js, PHP.
5. ERP SMI — Sistem enterprise Java, 4-role access, 7 lokasi inventory. Stack: Java, MySQL, JasperReports.

Skills:
- SE: React.js, Next.js, Node.js, TypeScript, PHP, Java, REST API, Microfrontend
- AI/ML: Python, SVM, XGBoost, Apriori, TF-IDF, SMOTE, Flask, OpenAI API
- Tools: OpenLayers, Cesium, Firebase, Redis, MySQL, Figma, Git

Kepribadian Febrina: profesional tapi playful, detail-oriented, suka problem solving, bisa bekerja di tim maupun mandiri.

Kontak: febrina231@gmail.com | LinkedIn: /in/febrina-qoonitah

Kalau rekruter tanya hal yang sangat spesifik yang tidak ada di sini, suruh mereka kontak Febrina langsung via email. Kamu hanya asisten kucing — bukan Febrina sendiri 🐾
`.trim();
