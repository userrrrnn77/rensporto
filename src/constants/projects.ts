import { mitraHasanahClient } from "@/assets/mitrahasanah-client";
import { mitraHasanahAdmin } from "@/assets/mitrahasanah-admin";

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

export const PROJECTS: Project[] = [
  {
    slug: "mitra-hasanah",
    category: "web",
    private: false,
    card: {
      title: "KSPPS Berkah Mitra Hasanah",
      coverCard: mitraHasanahClient.gambar1,
      shortDesc:
        "Portal web koperasi syariah berbasis React yang terintegrasi penuh dengan dashboard admin — produk, galeri, dan berita update realtime dari API.",
    },
    details: {
      title: "KSPPS Berkah Mitra Hasanah",
      images: [
        mitraHasanahClient.gambar1,
        mitraHasanahClient.gambar2,
        mitraHasanahClient.gambar3,
        mitraHasanahClient.gambar4,
        mitraHasanahClient.gambar5,
        mitraHasanahClient.gambar6,
        mitraHasanahClient.gambar7,
        mitraHasanahClient.gambar8,
        mitraHasanahClient.gambar9,
        mitraHasanahClient.gambar10,
      ],
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
      coverCard: mitraHasanahAdmin.gambar1,
      shortDesc:
        "Dashboard admin internal untuk manajemen produk, galeri, berita, dan user koperasi syariah — CRUD penuh dengan upload Cloudinary.",
    },
    details: {
      title: "KSPPS Mitra Hasanah — Admin Dashboard",
      images: [
        mitraHasanahAdmin.gambar1,
        mitraHasanahAdmin.gambar2,
        mitraHasanahAdmin.gambar3,
        mitraHasanahAdmin.gambar4,
        mitraHasanahAdmin.gambar5,
        mitraHasanahAdmin.gambar6,
        mitraHasanahAdmin.gambar7,
        mitraHasanahAdmin.gambar8,
        mitraHasanahAdmin.gambar9,
        mitraHasanahAdmin.gambar10,
      ],
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
  // mobile projects — tambah di sini ntar
];
