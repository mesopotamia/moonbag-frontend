export default function PortfolioTotal({amount}) {
    return (
        <div className="p-5 bg-accent-primary-color">
            <div className="text-white text-sm">Total</div>
            <div className="flex items-center">
                <span>
                    <img style={{width: "18px", height: "18px"}} src="/eth-currency.svg" alt="Ethereum Currency Symbol"/>
                </span>
                <span className="text-white ml-1 text-xl">{amount}</span>
            </div>
        </div>
    )
}
