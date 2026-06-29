export type ProjectCategory = "web" | "mobile";

export type Project = {
  slug: string;
  category: ProjectCategory;
  private: boolean;
  card: {
    title: string;
    coverCard: string;
    shortDesc: string;
  };
  details: {
    title: string;
    images: string[];
    description: string;
    demo: { icon: string; href: string | null } | null;
    repo: { icon: string; href: string | null } | null;
  };
};

const MOBILE_PLACEHOLDER = (n: number) =>
  `https://placehold.co/450x800/1a1a1a/ffffff?text=Screen+${n}`;

export const PROJECTS: Project[] = [
  {
    slug: "mitra-hasanah",
    category: "web",
    private: false,
    card: {
      title: "KSPPS Berkah Mitra Hasanah",
      coverCard: "",
      shortDesc:
        "Portal web koperasi syariah berbasis React yang terintegrasi penuh dengan dashboard admin — produk, galeri, dan berita update realtime dari API.",
    },
    details: {
      title: "KSPPS Berkah Mitra Hasanah",
      images: ["", "", "", "", "", "", "", "", "", ""],
      description:
        "Portal web utama untuk KSPPS Berkah Mitra Hasanah, koperasi simpan pinjam berbasis syariah. Dibangun dengan React + Vite dan Tailwind CSS, terintegrasi langsung ke backend via Axios — perubahan dari admin (produk, galeri, berita) langsung muncul di sini tanpa perlu deploy ulang. Dilengkapi fitur dynamic SEO per halaman, upload bukti transaksi, halaman Baitul Maal, dan dark mode.",
      demo: {
        icon: "link",
        href: "https://mitra-hasanah.vercel.app/",
      },
      repo: {
        icon: "github",
        href: "https://github.com/userrrrnn77/tugas-akhir-anak-usm",
      },
    },
  },
  {
    slug: "mitra-hasanah-admin",
    category: "web",
    private: true,
    card: {
      title: "KSPPS Mitra Hasanah — Admin Dashboard",
      coverCard: "",
      shortDesc:
        "Dashboard admin internal untuk manajemen produk, galeri, berita, dan user koperasi syariah — CRUD penuh dengan upload Cloudinary.",
    },
    details: {
      title: "KSPPS Mitra Hasanah — Admin Dashboard",
      images: ["", "", "", "", "", "", "", "", "", ""],
      description:
        "Panel kendali internal untuk ekosistem KSPPS Berkah Mitra Hasanah. Dibangun dengan React + Vite, Zustand, dan TypeScript, terhubung ke backend Node.js via Axios. Fitur mencakup manajemen produk (CRUD + upload gambar ke Cloudinary), galeri event, Baitul Maal, berita, manajemen user, dan statistik realtime di dashboard overview. Dilindungi auth guard — hanya admin yang bisa masuk.",
      demo: {
        icon: "link",
        href: null,
      },
      repo: {
        icon: "github",
        href: "https://github.com/userrrrnn77/dashboard-admin-anak-usm",
      },
    },
  },

  {
    slug: "mitra-hasanah-mobile",
    category: "mobile",
    private: false,
    card: {
      title: "KSPPS Mitra Hasanah — Mobile",
      coverCard: MOBILE_PLACEHOLDER(1),
      shortDesc:
        "Aplikasi mobile koperasi syariah untuk nasabah — cek produk, upload bukti transaksi, dan baca berita langsung dari genggaman.",
    },
    details: {
      title: "KSPPS Mitra Hasanah — Mobile",
      images: Array.from({ length: 6 }, (_, i) => MOBILE_PLACEHOLDER(i + 1)),
      description:
        "Versi mobile dari ekosistem KSPPS Berkah Mitra Hasanah, dibangun dengan React Native (Expo) dan di-build via EAS Build. Terhubung ke backend yang sama dengan web client — nasabah bisa melihat produk simpanan & pembiayaan, mengakses galeri event, membaca berita terbaru, hingga upload bukti setoran langsung dari kamera. UI adaptif portrait dengan desain full-screen.",
      demo: {
        icon: "link",
        href: null,
      },
      repo: {
        icon: "github",
        href: "https://github.com/userrrrnn77/mobile-anak-usm",
      },
    },
  },
];
