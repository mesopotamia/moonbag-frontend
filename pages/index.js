import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className="h-screen flex flex-col">
      <Head>
        <title>Bayzed</title>
        <meta name="description" content="Track your NFTs across blockchains" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="py-4 px-4 border-b-2 border-gray-100">
        BAYZED
      </header>
      <main className="h-full px-4 py-4">
        <h1 className={styles.title}>
          Welcome to Bayzed
        </h1>
      </main>

      <footer className={`${styles.footer} border-t-2 border-gray-100 py-4 px-4`}>
        Bayzed.xyz
      </footer>
    </div>
  )
}
