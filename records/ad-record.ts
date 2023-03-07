import {AdEntity, NewAddEntity, SimpleAdEntity} from "../types";
import {ValidationError} from "../utils/errors";
import {pool} from "../utils/db";
import {FieldPacket} from "mysql2";
import {v4 as uuid} from "uuid";

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
            throw new ValidationError('Cena ogłoszenia nie może być niższa niż 0 ani wyższa niz 9999999');
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

    async insert(): Promise<void> {
        if (!this.id) {
            this.id = uuid();
        } else {
            throw new Error('Cannot insert sth that is already inserted!');
        }
        await pool.execute('INSERT INTO `ads` (`id`, `name`, `description`, `price`, `url`, `lat`, `lon`) VALUES (:id, :name, :description, :price, :url, :lat, :lon)', this)
    }

    static async getOne(id: string): Promise<AdRecord | null> {
        const [results] = (await pool.execute('SELECT * FROM `ads` WHERE `id` = :id', {
            id,
        })) as AdRecordResults;
        return results.length === 0 ? null : new AdRecord(results[0]);
    }

    static async findAll(name: string): Promise<SimpleAdEntity[]> {
        const [results] = await pool.execute('SELECT * FROM `ads` WHERE `name` LIKE :search', {
            search: `%${name}%`
        }) as AdRecordResults;
        return results.map(result => {
            const {id, lat, lon} = result;
            return {
                id, lat, lon
            }
        })
    }
}
