import Head from "next/head";

export default function SEO({ title, description }) {
  return (
    <Head>
      <title>{title ? `${title} | MyStore` : "MyStore"}</title>
      <meta name="description" content={description || "An awesome e-commerce store built with Next.js"} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />

      {/* Open Graph / Social Preview */}
      <meta property="og:title" content={title || "MyStore"} />
      <meta property="og:description" content={description || "Shop the best products online"} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://yourdomain.com" />
      <meta property="og:image" content="https://yourdomain.com/preview.png" />
    </Head>
  );
}
