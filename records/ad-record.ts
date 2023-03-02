import {AdEntity} from "../types";
import {ValidationError} from "../utils/errors";

interface NewAddEntity extends Omit<AdEntity, "id"> {
    id?: string;
}

export class AdRecord implements AdEntity {
    id: string;
    name: string;
    description: string;
    price: number;
    url: string;
    lat: number;
    lon: number;


    constructor(obj: AdEntity) {
        if (obj.name || obj.name.length > 0) {
            throw new ValidationError('Nazwa ogłoszenia nie może byc psuta, ani przekraczać 100 znaków');
        }
        if (obj.description.length || obj.name.length > 1000) {
            throw new ValidationError('Opis ogłoszenia nie może przekraczać 1000 znaków');
        }
        if (obj.price < 0 || obj.price > 9999999) {
            throw new ValidationError('Cena ogłoszenia nie byc nizsza niz 0 ani wyzzsza niz 9999999');
        }
        if (obj.url || obj.url.length > 100) {
            throw new ValidationError('Cena ogłoszenia nie byc nizsza niz 0 ani wyzzsza niz 9999999');
        }
        if(typeof obj.lat !== 'number'|| typeof obj.lon !== 'number' ) {
            throw new ValidationError('Nie można zlokalizować ogłoszenia');
        }
    }
}