import Image from 'next/image';

export default function Logo () {
    return (
        <div className="flex items-center logo">
            <div className="h-full flex items-center">
                <img width="30" src="/moonbag.svg" alt="Moonbag Logo"/>
            </div>
            <div>
                <img style={{top: 5}} width="140" src="/moonbag-text.svg" className="relative font-black text-xl text-primary-text-color" />
            </div>
        </div>
     )
}
