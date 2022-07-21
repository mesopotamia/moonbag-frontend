export default function CollectionItem({ collection }) {
    return (
        <div className={`border-primary-border-color border-b-2 bg-primary-bg-color grid-cols-3 relative grid compact-view mb-4 items-center gap-2`}>
            {/*<button type="button"
                className="absolute top-0 right-0 p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset">
                <span className="sr-only">Close menu</span>

                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                    aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>*/}
            <div className="mb-2 flex items-center">
                <img height="30" width="30" src={collection.image_url} alt="" />
                <span className="ml-2">{collection.name}</span>
            </div>
            <div className="text-primary-text-color flex flex-col mb-2">
                {collection.floor_price}
            </div>
            <div className="text-primary-text-color flex flex-col mb-2">
                1
            </div>
        </div>
    )
}
