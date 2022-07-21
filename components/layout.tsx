import Head from "next/head";
import Logo from "./logo";
import { MdNightlight, MdWbSunny } from "react-icons/md";
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
    const toggleButton = () => {
        if (lighting === 'light') {
            return <MdNightlight size="1.5em" color="var(--bayzed-black-text)"/>
        }
        return <MdWbSunny size="1.5em" color="var(--bayzed-white-text)"/>
    }
    return (
        <>
            <div className={`min-h-screen flex flex-col ${lighting} bg-primary-bg-color`}>
                <Head>
                    <title>Bayzed</title>
                    <link rel="manifest" href="/manifest.json" />
                    <meta name="description" content="Track your NFTs across blockchains"/>
                    <link rel="icon" href="/favicon.ico"/>
                </Head>
                <header className="p-4 border-b border-primary-border-color">
                    <div className="max-w-5xl m-auto flex justify-between">
                        <Logo />
                        <button onClick={toggleLighting}>
                            {toggleButton()}
                        </button>
                    </div>
                </header>
                <main className="h-full p-4">
                    <div className="max-w-5xl m-auto">{children}</div>
                    
                </main>

                <footer className={`border-t border-primary-border-color py-4 px-4`}>
                    <div className="max-w-5xl m-auto text-secondary-text-color">
                        Bayzed.xyz
                    </div>
                    
                </footer>
            </div>
        </>
    )
}
