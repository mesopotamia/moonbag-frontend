import Head from "next/head";
import Logo from "./logo";
import { MdNightlight, MdWbSunny } from "react-icons/md";
import { useState } from "react";
import DarkModeToggle, {Lighting} from "./common/dark-mode-toggle";


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
            return <MdNightlight size="1.5em" color="var(--moonbag-black-text)"/>
        }
        return <MdWbSunny size="1.5em" color="var(--moonbag-white-text)"/>
    }
    return (
        <>
            <div className={`h-screen flex flex-col ${lighting} bg-primary-bg-color`}>
                <Head>
                    <title>Moonbag</title>
                    <link rel="manifest" href="/manifest.json" />
                    <meta name="description" content="Track your NFTs across blockchains"/>
                    <link rel="icon" href="/favicon.ico"/>
                </Head>
                <header className="p-4 border-b border-primary-border-color">
                    <div className="max-w-5xl m-auto flex justify-between">
                        <Logo />
                        <button onClick={toggleLighting}>
                            <DarkModeToggle mode={lighting} />
                        </button>
                    </div>
                </header>
                <main className="p-4 bg-primary-bg-color">
                    <div className="max-w-5xl m-auto">{children}</div>
                    
                </main>

                <footer className={`border-t border-primary-border-color py-4 px-4 mt-auto bg-primary-bg-color`}>
                    <div className="max-w-5xl m-auto text-secondary-text-color">
                        © 2022 moonbag.ca
                    </div>
                    
                </footer>
            </div>
        </>
    )
}
