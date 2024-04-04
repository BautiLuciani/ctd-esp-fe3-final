import { IObjectImage } from "./comic";

export interface ICharacterDetail {
    id: number;
    name: string;
    description: string;
    thumbnail: IObjectImage;
}