import { PortableText } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "../../sanity/client";
import Link from "next/link";
import Head from "next/head";

// Helper function to build image URLs
const { projectId, dataset } = client.config();
const urlFor = (source) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

// Query for individual post
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

// Generate static paths
export async function generateStaticParams() {
  const slugs = await client.fetch(`*[_type == "post"].slug.current`);
  return slugs.map((slug) => ({ slug }));
}

// Server Component to fetch and render data
export default async function Page({ params }) {
  const { slug } = params;
  const page = await client.fetch(PAGE_QUERY, { slug });

  if (!page) {
    return (
      <main className="container mx-auto min-h-screen p-8">
        <h1 className="text-4xl font-bold">Post Not Found</h1>
        <p>The requested post does not exist.</p>
      </main>
    );
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
        <meta property="og:title" content={page.title} />
        <meta
          property="og:description"
          content={
            page.metaDescription || "Default meta description for the post."
          }
        />
      </Head>

      <main className="container mx-auto min-h-screen max-w-3xl p-8 flex flex-col gap-6">
        <Link
          href="/posts"
          className="text-blue-600 hover:underline font-medium"
        >
          ← Back to posts
        </Link>
        {pageImageUrl && (
          <img
            src={pageImageUrl}
            alt={page.title}
            className="aspect-video rounded-xl shadow-lg object-cover"
            width="550"
            height="310"
          />
        )}
        <h1 className="text-5xl font-extrabold leading-tight text-gray-900 mt-4">
          {page.title}
        </h1>
        <div className="text-gray-500 text-sm mb-6">
          Published: {new Date(page.publishedAt).toLocaleDateString()}
        </div>
        <div className="prose prose-lg max-w-none prose-a:text-blue-600 prose-a:underline">
          {Array.isArray(page.body) && <PortableText value={page.body} />}
        </div>
      </main>
    </>
  );
}
