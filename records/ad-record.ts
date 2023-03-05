import {AdEntity, NewAddEntity} from "../types";
import {ValidationError} from "../utils/errors";
import {pool} from "../utils/db";
import {FieldPacket} from "mysql2";

type AdRecordResults = [AdEntity[], FieldPacket[]];

export class AdRecord implements AdEntity {
    id: string;
    name: string;
    description: string;
    price: number;
    url: string;
    lat: number;
    lon: number;


    constructor(obj: NewAddEntity) {
        if (!obj.name || obj.name.length > 100) {
            throw new ValidationError('Nazwa ogłoszenia nie może byc psuta, ani przekraczać 100 znaków');
        }
        if (obj.description.length > 1000) {
            throw new ValidationError('Opis ogłoszenia nie może przekraczać 1000 znaków');
        }
        if (obj.price < 0 || obj.price > 9999999) {
            throw new ValidationError('Cena ogłoszenia nie byc nizsza niz 0 ani wyzsza niz 9999999');
        }
        if (!obj.url || obj.url.length > 100) {
            throw new ValidationError('Adres nie moze byc pusty lub dłuższy niz 100');
        }
        if (typeof obj.lat !== 'number' || typeof obj.lon !== 'number') {
            throw new ValidationError('Nie można zlokalizować ogłoszenia');
        }
        const {id, name, description, price, url, lat, lon} = obj;
        this.name = name;
        this.id = id;
        this.description = description;
        this.url = url;
        this.price = price;
        this.lon = lon;
        this.lat = lat;
    }

    static async getOne(id: string): Promise<AdRecord | null> {
        const [results] = (await pool.execute('SELECT * FROM `ads` WHERE `id` = :id', {
            id,
        })) as AdRecordResults;
        return results.length === 0 ? null : new AdRecord(results[0]);
    }
}
