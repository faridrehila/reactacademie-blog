import React from "react";
import Layout from "../../components/Layout/layout";
import { getAllPostIds, getPostData } from "../../lib/posts";

export default function Post({ postData }) {
  console.log("postData", postData);
  return (
    <Layout>
      <h1>{postData.title}</h1>
      <p>{postData.date}</p>

      <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
    </Layout>
  );
}

// getStaticPaths()
export function getStaticPaths() {
  const paths = getAllPostIds();

  return {
    paths,
    fallback: false,
  };
}

// getStaticProps()
export async function getStaticProps({ params }) {
  // params.id
  // Get data du post
  const postData = await getPostData(params.id);

  return {
    props: {
      postData,
    },
  };
}
