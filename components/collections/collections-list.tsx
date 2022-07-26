import PullToRefresh from "react-simple-pull-to-refresh";
import CollectionItem from "./collection-item";

export default function CollectionsList({collections, onRefresh}) {
    return (
        <div className="mt-6">
            <div className="grid grid-cols-4 text-secondary-text-color mb-3 gap-2 ">
                <div className="col-span-2">Collection</div>
                <div>Price</div>
                <div>Tokens</div>
            </div>
            <PullToRefresh pullingContent="" onRefresh={() => onRefresh()} >
                <>
                    <div>
                        {collections.map(collection => (
                            <CollectionItem key={collection.slug} collection={collection} />
                        ))}
                    </div>
                    <div style={{ height: 200 }}></div>
                </>
            </PullToRefresh>
        </div>
    )
}
