import Link from "next/link";

export default function PostList({ posts }) {
  return (
    <ul className="flex flex-col gap-y-4">
      {posts.map((post) => (
        <li className="hover:underline" key={post._id}>
          <Link href={`/${post.slug.current}`}>
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p>{new Date(post.publishedAt).toLocaleDateString()}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
}
