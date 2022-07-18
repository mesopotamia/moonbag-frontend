import Head from "next/head";
import styles from '../styles/Home.module.css'

export default function Layout({children}) {
    return (
        <>
            <div className="h-screen flex flex-col">
                <Head>
                    <title>Bayzed</title>
                    <link rel="manifest" href="/manifest.json" />
                    <meta name="description" content="Track your NFTs across blockchains"/>
                    <link rel="icon" href="/favicon.ico"/>
                </Head>
                <header className="p-4 border-b-2 border-gray-100">
                    <div className="max-w-5xl m-auto">
                        BAYZED
                    </div>
                </header>
                <main className="h-full p-4">
                    <div className="max-w-5xl m-auto">{children}</div>
                    
                </main>

                <footer className={`${styles.footer} border-t-2 border-gray-100 py-4 px-4`}>
                    <div className="max-w-5xl m-auto">
                        Bayzed.xyz
                    </div>
                    
                </footer>
            </div>
        </>
    )
}
