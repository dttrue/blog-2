import { client } from "../../sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PortableText } from "@portabletext/react";

// Query to fetch post data by slug, including author details
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
  metaDescription,
author->{
    name,
    slug {
      current
    }
  }
}`;

// Helper for generating image URLs
const urlFor = (source) => imageUrlBuilder(client).image(source);

// Generates dynamic metadata for SEO
export async function generateMetadata({ params }) {
  const { slug } = params;
  const page = await client.fetch(PAGE_QUERY, { slug });

  if (!page) {
    return {
      title: "Post Not Found",
      description: "The requested post could not be found.",
    };
  }

  const pageImageUrl = page.image
    ? urlFor(page.image).width(550).height(310).url()
    : null;

  return {
    title: page.title,
    description:
      page.metaDescription || "Default meta description for the post.",
    openGraph: {
      title: page.title,
      description:
        page.metaDescription || "Default meta description for the post.",
      images: pageImageUrl
        ? [{ url: pageImageUrl, width: 550, height: 310 }]
        : [],
    },
  };
}

// Generates static paths for all posts
export async function generateStaticParams() {
  const slugs = await client.fetch(`*[_type == "post"].slug.current`);
  return slugs.map((slug) => ({ slug }));
}

// Component to render the page content
export default async function Page({ params }) {
  const { slug } = params;
  const page = await client.fetch(PAGE_QUERY, { slug });

  if (!page) {
    notFound();
  }

  const pageImageUrl = page.image
    ? urlFor(page.image).width(550).height(310).url()
    : null;

  return (
    <main className="container mx-auto min-h-screen max-w-3xl p-8 flex flex-col gap-6">
      <Link href="/posts" className="text-blue-600 hover:underline font-medium">
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
      <div className="text-gray-500 text-sm mb-4">
        Published: {new Date(page.publishedAt).toLocaleDateString()}
      </div>
      {/* "By Author" Section */}
      {page.author && (
        <Link
          href={`/author/${page.author.slug.current}`}
          className="link link-info text-blue-600 hover:underline font-medium"
        >
          By {page.author.name}
        </Link>
      )}
      {page.metaDescription && (
        <p className="text-gray-600 italic mb-6">{page.metaDescription}</p>
      )}
      <div className="prose prose-lg max-w-none prose-a:text-blue-600 prose-a:underline">
        {Array.isArray(page.body) ? (
          <PortableText value={page.body} />
        ) : (
          <p>No content available for this post.</p>
        )}
      </div>
    </main>
  );
}
