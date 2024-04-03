export interface IComic {
    characters: ICharacter;
    price?: number;
	oldPrice?: number;
	stock?: number;
    id: number;
    title: string;
    textObjects: IDescriptionItem[];
    images: IObjectImage[];
}

export interface IObjectImage {
    path: string;
    extension: string;
}

export interface ICharacter {
    available: number;
    collectionURI: string;
	items: ICharacterItem[]
}

export interface ICharacterItem {
    resourceURI: string;
	name:string
}

export interface IDescriptionItem {
    type: string;
	language:string;
	text:string
}
