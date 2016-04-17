var product = {
    _id: 1,
    name: "Jonagold",
    productFamily: 1,
    productCounter: 1,  // --> eventuell rausnehmen, damit es keine Verbindung zur Analyse in diese Richtung gibt
    plantStart: "03-01",
    plantDays: 30,
    harvestStart: "06-15",
    harvestDays: 15,
    storageDays: 60,
    shortDescription: "Kurzbeschreibung die auch bei Thumbnails angezeigt wird.",
    description: "Beschreibung, die Details über das Produkt enthält und bei der Produktdetailseite angezeigt wird."
}

var productFamily = {
    _id: 1,
    name: "Apfel",
    productCategory: 1
}

var productCategory = {
    _id: 1,
    name: "Obst"
}



// ---------------
var recipe = {
    _id: 1,
    name: "Apfelkuchen",
    ingredients: [
        {
            amount: 150,
            unit: "g",
            name: "Äpfel"
        },
        {
            amount: 50,
            unit: "g",
            name: "Zucker"
        }
    ],
    productTags: [1, 2]
}



// ---------------
var productCounter = {
    _id: 1,
    productId: 1,
    relevance: 50
}