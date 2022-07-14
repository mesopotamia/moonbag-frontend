import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Bayzed</title>
        <meta name="description" content="Track your NFTs across blockchains" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to Bayzed
        </h1>
      </main>

      <footer className={styles.footer}>
        Bayzed.xyz
      </footer>
    </div>
  )
}
