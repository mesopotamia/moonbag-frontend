import Image from 'next/image';

export default function Logo () {
    return (
        <div className="flex items-center logo">
            <Image width={60} height={34} src="/blockchain.svg" alt="Bayzed Logo"/>
            <div className="font-black text-xl pl-2 ml-2 border-l text-primary-text-color">Bayzed</div>
        </div>
     )
}
