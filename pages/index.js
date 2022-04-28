import { useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import Layout from "../components/Layout/layout";
import { getPostsData } from "../lib/posts";

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <div className={styles.container}>
        <Head>
          <title>Blog React Académie</title>
          <meta name="description" content="Blog React Académie" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
          <div className={styles.grid}>
            {allPostsData.map((post) => (
              <Link href={`/posts/${post.id}`} key={post.id}>
                <a className={styles.card}>
                  <h2>{post.title} &rarr;</h2>
                  <p>{post.date}</p>
                </a>
              </Link>
            ))}
          </div>
        </main>

        <footer className={styles.footer}>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by{" "}
            <span className={styles.logo}>
              <Image
                src="/vercel.svg"
                alt="Vercel Logo"
                width={72}
                height={16}
              />
            </span>
          </a>
        </footer>
      </div>
    </Layout>
  );
}

// getServerSideProps
export function getStaticProps() {
  const allPostsData = getPostsData();

  return {
    props: {
      allPostsData,
    },
    // Incremental Static Regeneration - ISR
    revalidate: 60,
  };
}
