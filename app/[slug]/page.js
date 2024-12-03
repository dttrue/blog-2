import { PortableText } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "../../sanity/client";
import Head from "next/head";

const PAGE_QUERY = `*[_type == "post" && slug.current == $slug][0]{
  title,
  body,
  image {
    asset->{
      _id,
      url
    }
  },
  publishedAt,
  metaDescription
}`;

export async function generateStaticParams() {
  const slugs = await client.fetch(`*[_type == "post"].slug.current`);
  return slugs.map((slug) => ({ slug }));
}

export default async function Page({ params }) {
  const { slug } = params;
  const page = await client.fetch(PAGE_QUERY, { slug });

  if (!page) {
    notFound(); // Trigger a 404 if no data exists for the slug
  }

  const { projectId, dataset } = client.config();
  const urlFor = (source) =>
    projectId && dataset
      ? imageUrlBuilder({ projectId, dataset }).image(source)
      : null;

  const pageImageUrl = page.image
    ? urlFor(page.image).width(550).height(310).url()
    : null;

  return (
    <>
      <Head>
        <title>{page.title}</title>
        <meta
          name="description"
          content={page.metaDescription || "Default meta description"}
        />
        {pageImageUrl && <meta property="og:image" content={pageImageUrl} />}
        <meta property="og:title" content={page.title} />
        <meta
          property="og:description"
          content={page.metaDescription || "Default meta description"}
        />
      </Head>

      <main className="container mx-auto min-h-screen max-w-3xl p-8">
        {pageImageUrl && (
          <img
            src={pageImageUrl}
            alt={page.title}
            className="rounded-xl shadow-lg"
            width="550"
            height="310"
          />
        )}
        <h1 className="text-5xl font-extrabold">{page.title}</h1>
        <div className="text-gray-500">
          Published: {new Date(page.publishedAt).toLocaleDateString()}
        </div>
        <div className="prose">
          {Array.isArray(page.body) && <PortableText value={page.body} />}
        </div>
      </main>
    </>
  );
}
