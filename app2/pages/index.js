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
  const vueAppRef = React.useRef(null);

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

  React.useEffect(() => {
    async function loadVueApp() {
      const vue  = (await import('appvue/appVue'));
      const { createApp, h } = vue;
      const HelloText = (await import('appvue/HelloText')).default
      createApp({
        name: 'VueApp',
        render() {
          return h(HelloText, { color: 'red' })
        }
      }).mount(vueAppRef.current)
    }

    if (typeof window !== 'undefined') {
      loadVueApp()
    }
  }, [])

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
        <div ref={vueAppRef} />
      </main>
    </div>
  );
}
