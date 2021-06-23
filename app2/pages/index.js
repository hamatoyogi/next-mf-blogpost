import React from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import dynamic from "next/dynamic";

// We need to use top level await on these modules as they are async.
// This is actually what let's module federation work with NextJS
// const Nav = (await import('app1/nav')).default;
const Nav = dynamic(() => import("app1/nav"), {
  ssr: false,
});
export default function Home() {
  const [add, setAdd] = React.useState(undefined);
  const [multiplyByTwo, setMultiplyByTwo] = React.useState(undefined);

  React.useEffect(() => {
    async function loadDynamicImports() {
      const importedAdd = (await import("app1/add")).default;
      const importedMultiplyByTwo = (await import("app1/multiplyByTwo"))
        .default;
      setAdd(() => importedAdd);
      setMultiplyByTwo(() => importedMultiplyByTwo);
    }

    if (typeof window !== "undefined") {
      loadDynamicImports();
    }
  }, []);
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Nav name="pva" />
        <h2>
          {`Adding 2 and 3 ==>`}
          {add ? add(2, 3) : null}
        </h2>
        <h2>
          {`Multiplying 5 by 2  ==>`}
          {multiplyByTwo ? multiplyByTwo(5) : null}
        </h2>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <p className={styles.description}>
          Get started by editing{" "}
          <code className={styles.code}>pages/index.js</code>
        </p>

        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h3>Documentation &rarr;</h3>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h3>Learn &rarr;</h3>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/master/examples"
            className={styles.card}
          >
            <h3>Examples &rarr;</h3>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/import?filter=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h3>Deploy &rarr;</h3>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  );
}
