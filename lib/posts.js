import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), "posts");

export function getPostsData() {
  // Récupérer nos MD
  const filenames = fs.readdirSync(postsDirectory);

  const allPostsData = filenames.map((filename) => {
    // filename = nextjs.md
    const id = filename.replace(/\.md$/, "");

    // postPath = ...../posts/nextjs.md
    const postPath = path.join(postsDirectory, filename);
    const fileContent = fs.readFileSync(postPath, "utf-8");

    const matterContent = matter(fileContent);

    console.log("matterContent");
    console.log(matterContent);

    return {
      id,
      // data content
      ...matterContent.data,
    };
  });

  // [ { id, data } ]
  return allPostsData;
}

export function getAllPostIds() {
  /* 
        [
            {
                params: {
                    id: "nextjs"
                }
            },
            {
                params: {
                    id: "react-native"
                }
            }
        ]
    */
  const filenames = fs.readdirSync(postsDirectory);

  return filenames.map((filename) => {
    // filename = nextjs.md
    const id = filename.replace(/\.md$/, "");

    return {
      params: {
        id,
      },
    };
  });
}

export async function getPostData(id) {
  const postPath = path.join(postsDirectory, `${id}.md`);
  const fileContent = fs.readFileSync(postPath, "utf-8");

  const matterContent = matter(fileContent);

  console.log("matterContent");
  console.log(matterContent);

  const processedContent = await remark()
    .use(html)
    .process(matterContent.content);
  const contentHtml = processedContent.toString();

  return {
    id,
    // data content
    ...matterContent.data,
    contentHtml,
  };
}
