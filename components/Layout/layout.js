import Image from "next/image";
import Link from "next/link";
import React from "react";
import styles from "./layout.module.css";

export default function Layout({ children, home }) {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Image
          src="/images/react_logo.svg"
          height={90}
          width={90}
          alt="React Logo"
          quality={50}
        />

        <h1 className={styles.title}>React Académie</h1>
      </header>

      <main>{children}</main>

      {!home && (
        <div className={styles.back}>
          <Link href="/">
            <a>Retour à l{`'`}acceuil</a>
          </Link>
        </div>
      )}
    </div>
  );
}
