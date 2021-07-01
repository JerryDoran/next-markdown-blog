import Head from "next/head";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Post from "../components/Post";
import { sortByDate } from "../utils";

function Home({ posts }) {
  console.log(posts);

  return (
    <div>
      <Head>
        <title>Next Markdown Blog</title>
      </Head>
      <div className="posts">
        {posts.map((post, index) => {
          return <Post post={post} key={index} />;
        })}
      </div>
    </div>
  );
}

export default Home;

// fetch data at build time
export async function getStaticProps() {
  // get files from the posts directory
  const files = fs.readdirSync(path.join("posts"));

  // get slug and frontmatter from posts
  const posts = files.map((filename) => {
    // create slug
    const slug = filename.replace(".md", "");

    // get frontmatter
    const markdownWithMeta = fs.readFileSync(
      path.join("posts", filename),
      "utf-8"
    );

    const { data: frontMatter } = matter(markdownWithMeta);

    return {
      slug: slug,
      frontMatter: frontMatter
    };
  });

  console.log(posts);

  return {
    props: {
      posts: posts.sort(sortByDate)
    }
  };
}
