import Image from 'next/image';

export default function Logo () {
    return (
        <div className="flex items-center logo">
            <div>
                <img width="110" src="/moonbag-text.svg" className="relative font-black text-xl text-primary-text-color" />
            </div>
        </div>
     )
}
