import Image from "next/image";

export default function PortfolioTotal({amount}) {
    return (
        <div className="p-5 bg-accent-primary-color">
            <div className="text-white text-sm">Total</div>
            <div className="flex items-center">
                <Image width={18} height={18} src="/eth-currency.svg" alt="Ethereum Currency Symbol"/>
                <span className="text-white ml-1 text-xl">{amount.toFixed(4)}</span>
            </div>
        </div>
    )
}
