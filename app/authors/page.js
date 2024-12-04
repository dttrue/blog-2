import { fetchAllAuthors } from "../../lib/authorsData";
import imageUrlBuilder from "@sanity/image-url";
import Link from "next/link";
import { client } from "../../sanity/client";

const urlFor = (source) => imageUrlBuilder(client).image(source);

export default async function AuthorsPage() {
  const authors = await fetchAllAuthors();

  return (
    <main className="container mx-auto min-h-screen max-w-3xl p-8">
      <h1 className="text-4xl font-bold text-center mb-8">Our Authors</h1>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {authors.map((author) => (
          <li
            key={author.slug.current}
            className="flex items-center gap-4 p-4 border rounded-lg hover:shadow-lg"
          >
            {author.image && (
              <img
                src={urlFor(author.image).width(100).height(100).url()}
                alt={author.name}
                className="w-20 h-20 rounded-full"
              />
            )}
            <div>
              <Link
                href={`/author/${author.slug.current}`}
                className="text-blue-600 hover:underline font-medium"
              >
                <h2 className="text-xl font-semibold">{author.name}</h2>
              </Link>
              <p className="text-sm text-gray-600">
                {author.bio[0]?.children[0]?.text || "No bio available"}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
