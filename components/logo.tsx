import Image from 'next/image';

export default function Logo () {
    return (
        <div className="flex items-center logo">
            <img width="30" src="/moonbag.svg" alt="Bayzed Logo"/>
            <div className="font-black text-xl pl-2 ml-2 border-l text-primary-text-color">MOONBAG</div>
        </div>
     )
}
