export default function CollectionItem({collection}) {
    return (
        <div className="bg-white p-5 flex items-center flex-col relative">
            <button type="button"
                    className="absolute top-0 right-0 p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset">
                <span className="sr-only">Close menu</span>
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none"
                     viewBox="0 0 24 24" stroke="currentColor"
                     aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                          d="M6 18L18 6M6 6l12 12"/>
                </svg>
            </button>
            <h1 className="text-2xl font-bold mb-2">{collection?.name}</h1>

            <div className="mb-2 md:mb-4">
                <img height="120" width="120" src={collection?.image_url} alt=""/>
            </div>
        </div>
    )
}
