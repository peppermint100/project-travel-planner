export type MapStateType = {
    address: string,
    city?: string,
    area?: string,
    state?: string,
    place: string,
    zoom: number,
    height: number,
    mapPosition: Position,
    markerPosition: Position
}

export type Position = {
    lat: number,
    lng: number
}