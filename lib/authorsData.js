import { client } from "../sanity/client";

export const AUTHORS_QUERY = `*[_type == "author"]{
  name,
  slug {
    current
  },
  bio,
  image {
    asset->{
      _id,
      url
    }
  }
}`;

export const AUTHOR_PAGE_QUERY = `*[_type == "author" && slug.current == $slug][0]{
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

// Fetch all authors for the /authors page
export async function fetchAllAuthors() {
  return await client.fetch(AUTHORS_QUERY);
}

// Fetch a single author and their posts
export async function fetchAuthorBySlug(slug) {
  return await client.fetch(AUTHOR_PAGE_QUERY, { slug });
}
