import {Collection} from "./backend.type";
import {CollectionSummary} from "./summary.type";


export const getCollection = async(id: string) => {
    const url = `https://collections.palmyra-flair01.workers.dev/api/collections/details/${id}`;
    const response = await fetch(url);
    const collection = await response.json();
    return {
        status: response.status,
        body: {
            collections: response.ok && collection.data
        }
    };
}

export async function getCollections(collectionIds: string[]) {
    const collectionsPromises = collectionIds.map(getCollection);
    const throttle = 300;
    const delay = () => new Promise(resolve => setTimeout(resolve, throttle));
    const collections = [];
    for (const collectionPromise of collectionsPromises) {
        console.log(collectionPromise);
        console.log('before delay');
        await delay();
        console.log('after delay');
        const collection = await collectionPromise;
        console.dir(collection.body.collections.metadata.primary_asset_contracts);
        collections.push(collection);
    }

    const collectionData = collections.map(item => item.body.collections).map(transform);
    return collectionData;
}
export function transform(collection: Collection): CollectionSummary {
    const currentDate = new Date();
    return {
        lastUpdated: currentDate,
        currentFloor: collection.stats.floor_price.toString(),
        name: collection.name,
        imageURL: collection.metadata.image_url,
        slug: collection.metadata.slug,
        sales: {
            oneDay: decorateWithK(collection.stats.one_day_sales.toFixed(2)),
            sevenDays: decorateWithK(collection.stats.seven_day_sales.toFixed(2)),
            thirtyDays: decorateWithK(collection.stats.thirty_day_sales.toFixed(2)),
            dailyAverageAgainstSevenDays: getDailyAverageRatio(collection.stats.one_day_sales, collection.stats.seven_day_sales, 7),
            dailyAverageAgainstThirtyDays: getDailyAverageRatio(collection.stats.one_day_sales, collection.stats.thirty_day_sales, 30),
            totalSales: decorateWithK(collection.stats.total_sales.toFixed(2)),
        },
        volume: {
            oneDay: decorateWithK(collection.stats.one_day_volume.toFixed(2)),
            sevenDays: decorateWithK(collection.stats.seven_day_volume.toFixed(2)),
            thirtyDays: decorateWithK(collection.stats.thirty_day_volume.toFixed(2)),
            dailyAverageAgainstSevenDays: getDailyAverageRatio(collection.stats.one_day_sales, collection.stats.seven_day_volume, 7),
            dailyAverageAgainstThirtyDays: getDailyAverageRatio(collection.stats.one_day_sales, collection.stats.thirty_day_volume, 30),
            totalVolume: decorateWithK(collection.stats.total_volume.toFixed(2)),
        }
    };
}


function getDailyAverageRatio(daily: number, target: number, targetNumberOfDays: number): string {
    return (Number(daily) / (Number(target) / targetNumberOfDays)).toFixed(2);
}

function decorateWithK(amount: string | number) {
    const formatter = Intl.NumberFormat('en', { notation: 'compact' });
    return formatter.format(Number(amount))
}
