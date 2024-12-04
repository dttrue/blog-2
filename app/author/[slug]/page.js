import { client } from "../../../sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import { PortableText } from "@portabletext/react";
import { notFound } from "next/navigation";
import Link from "next/link";

const urlFor = (source) => imageUrlBuilder(client).image(source);

const AUTHOR_QUERY = `*[_type == "author" && slug.current == $slug][0]{
  name,
  bio,
  image {
    asset->{
      _id,
      url
    }
  },
  "posts": *[_type == "post" && references(^._id)]{
    title,
    slug {
      current
    }
  }
}`;

export async function generateMetadata({ params }) {
  const { slug } = params;
  const author = await client.fetch(AUTHOR_QUERY, { slug });

  if (!author) {
    return {
      title: "Author Not Found",
      description: "The requested author could not be found.",
    };
  }

  return {
    title: `${author.name} - Author Profile`,
    description: `Learn more about ${author.name} and their posts.`,
  };
}

export async function generateStaticParams() {
  const slugs = await client.fetch(`*[_type == "author"].slug.current`);
  return slugs.map((slug) => ({ slug }));
}

export default async function AuthorPage({ params }) {
  const { slug } = params;
  const author = await client.fetch(AUTHOR_QUERY, { slug });

  if (!author) {
    notFound();
  }

  return (
    <main className="container mx-auto min-h-screen max-w-3xl p-8">
      <h1 className="text-4xl font-bold text-center">{author.name}</h1>
      {author.image && (
        <img
          src={urlFor(author.image).width(200).height(200).url()}
          alt={author.name}
          className="w-32 h-32 rounded-full mx-auto mt-4"
        />
      )}
      {author.bio && (
        <div className="prose mt-4">
          <PortableText value={author.bio} />
        </div>
      )}
      <h2 className="text-2xl font-semibold mt-8">Posts by {author.name}</h2>
      <ul>
        {author.posts.map((post) => (
          <li key={post.slug.current} className="hover:underline">
            <Link href={`/${post.slug.current}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
