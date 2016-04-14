import {Product} from "./product";
export const PRODUCTS: Product[] = [
    {
        _id: 1,
        name: "Jonagold",
        family_id: "Apfel",
        plantStart: "03-01",
        plantDays: 30,
        harvestStart: "06-15",
        harvestDays: 15,
        storageDays: 60,
        shortDescription: "Kurzbeschreibung die auch bei Thumbnails angezeigt wird.",
        description: "Beschreibung, die Details über das Produkt enthält und bei der Produktdetailseite angezeigt wird."
    },
    {
        _id: 2,
        name: "Karotte",
        family_id: "Karotte",
        plantStart: "03-01",
        plantDays: 30,
        harvestStart: "06-15",
        harvestDays: 15,
        storageDays: 60,
        shortDescription: "Kurzbeschreibung die auch bei Thumbnails angezeigt wird.",
        description: "Beschreibung, die Details über das Produkt enthält und bei der Produktdetailseite angezeigt wird."
    }
]