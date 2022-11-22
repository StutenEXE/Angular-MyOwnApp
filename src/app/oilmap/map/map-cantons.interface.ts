import { GeoJsonObject } from "geojson"

export interface IMapCantons {
    type: "String",
    features: [{
        type: string,
        geometry: GeoJsonObject[],
        properties: {
            code: string,
            nom: string
        }
    }]
}