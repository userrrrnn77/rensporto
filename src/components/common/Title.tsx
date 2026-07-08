// src/components/common/Title.tsx
import { Helmet } from "react-helmet-async";

interface TitleProps {
  title: string;
  description?: string;
  path?: string;
  image?: string;
  raw?: boolean;
}

const SITE_URL = "https://rensdev.my.id";
const DEFAULT_DESCRIPTION =
  "Full-stack developer spesialis React, Express, dan React Native (Expo). Bikin web yang cepat dan API yang bisa diandalkan.";
const DEFAULT_IMAGE = `${SITE_URL}/og-image.png`;

export function Title({
  title,
  description = DEFAULT_DESCRIPTION,
  path = "/",
  image,
  raw = false,
}: TitleProps) {
  const fullTitle = raw ? title : `${title} | Rendy`;
  const canonicalUrl = `${SITE_URL}${path === "/" ? "" : path}`;
  const ogImage = image
    ? image.startsWith("http")
      ? image
      : `${SITE_URL}${image}`
    : DEFAULT_IMAGE;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />

      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  );
}
