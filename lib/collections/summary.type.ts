export interface CollectionSummary {
    imageURL: string;
    name: string;
    currentFloor?: string;
    volume?: Volume,
    sales?: Sale,
    slug?: string,
    isBodyLoading?: boolean;
    lastUpdated?: Date;
}
interface Volume extends TimePeriods, Ratio {
    totalVolume: string;
}
interface Sale extends TimePeriods, Ratio {
    totalSales: string;
}
interface TimePeriods {
    oneDay: string,
    sevenDays: string;
    thirtyDays: string;
}
interface Ratio {
    dailyAverageAgainstSevenDays: string;
    dailyAverageAgainstThirtyDays: string;
}
