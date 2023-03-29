import { Image } from '../interfaces/Images'

export interface Problem {
    uuid: string,
    description: string,
    address: string,
    longitude: string,
    latitude: string,
    status: string,
    reporterUsername: string,
    reporterName: string,
    country: string,
    state: string,
    city: string,
    neighborhood: string,
    dataJson?: {
        googleMapsData: Object
    },
    photos?: Image[]
    createdAt: string,
    updatedAt: string
}