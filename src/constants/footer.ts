export type FooterLink = {
  label: string;
  href: string;
  external?: boolean;
};

export type FooterColumn = {
  title: string;
  links: FooterLink[];
};

export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: "Site",
    links: [
      { label: "Home", href: "/" },
      { label: "About", href: "/about" },
      { label: "Projects", href: "/projects" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Connect",
    links: [
      {
        label: "GitHub",
        href: "https://github.com/userrrrnn77",
        external: true,
      },
      {
        label: "Instagram",
        href: "https://instagram.com/userrrrnn77",
        external: true,
      },
      {
        label: "TikTok",
        href: "https://tiktok.com/@userrrrnn77",
        external: true,
      },
    ],
  },
  {
    title: "Other",
    links: [
      {
        label: "Semarang, Indonesia",
        href: "https://maps.app.goo.gl/R7bJsTRRDBAsVo978",
        external: true,
      },
      {
        label: "Design",
        href: "/design.md",
        external: true,
      },
    ],
  },
];

export const FOOTER_NOTE = "Built with React, and a lot of coffee. - Added more bugs to fix later.";
