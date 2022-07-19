import Head from "next/head";
import styles from '../styles/Home.module.css'
import Logo from "./logo";
import { MdNightlight } from "react-icons/md";
import { useState } from "react";

export type Lighting = 'light' | 'dark';

export default function Layout({children}) {
    const [lighting, setLighting] = useState<Lighting>('light');
    const toggleLighting = () => {
        if (lighting === 'light') {
            setLighting('dark')
        }
        else {
            setLighting('light');
        }
    }
    return (
        <>
            <div className={`h-screen flex flex-col ${lighting} bg-primary-bg-color`}>
                <Head>
                    <title>Bayzed</title>
                    <link rel="manifest" href="/manifest.json" />
                    <meta name="description" content="Track your NFTs across blockchains"/>
                    <link rel="icon" href="/favicon.ico"/>
                </Head>
                <header className="p-4 border-b-2 border-gray-100">
                    <div className="max-w-5xl m-auto flex justify-between">
                        <Logo />
                        <button onClick={toggleLighting}><MdNightlight size="1.5em"/></button>
                    </div>
                </header>
                <main className="h-full p-4">
                    <div className="max-w-5xl m-auto">{children}</div>
                    
                </main>

                <footer className={`${styles.footer} border-t-2 border-gray-100 py-4 px-4`}>
                    <div className="max-w-5xl m-auto text-secondary-text-color">
                        Bayzed.xyz
                    </div>
                    
                </footer>
            </div>
        </>
    )
}
