import { PortableText } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "../../sanity/client";
import Link from "next/link";
import Head from "next/head";

// Build image URLs from Sanity
const { projectId, dataset } = client.config();
const urlFor = (source) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

// Pre-generate all slugs for static paths
export async function generateStaticParams() {
  const slugs = await client.fetch(`*[_type == "post"].slug.current`);
  return slugs.map((slug) => ({ slug }));
}

// Fetch data for each page
export default async function Page({ params }) {
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

  const page = await client.fetch(PAGE_QUERY, { slug: params.slug });

  if (!page) {
    return { notFound: true }; // Handle 404 for invalid slugs
  }

  const pageImageUrl = page.image
    ? urlFor(page.image).width(550).height(310).url()
    : null;

  return (
    <>
      <Head>
        <title>{page.title}</title>
        <meta
          name="description"
          content={
            page.metaDescription || "Default meta description for the post."
          }
        />
        {pageImageUrl && <meta property="og:image" content={pageImageUrl} />}
      </Head>
      <main className="container mx-auto min-h-screen max-w-3xl p-8">
        <Link href="/posts" className="text-blue-600 hover:underline">
          ← Back to posts
        </Link>
        {pageImageUrl && (
          <img
            src={pageImageUrl}
            alt={page.title}
            className="rounded-lg shadow-md"
          />
        )}
        <h1 className="text-5xl font-bold mt-4">{page.title}</h1>
        <div className="text-gray-500 mb-4">
          Published: {new Date(page.publishedAt).toLocaleDateString()}
        </div>
        <div className="prose">
          {Array.isArray(page.body) && <PortableText value={page.body} />}
        </div>
      </main>
    </>
  );
}
