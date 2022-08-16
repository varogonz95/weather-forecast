export interface IApiSettings {
    protocol: string;
    base: string;
}

export interface IEncodedParam<T = {}> {
    encode(): string | Array<T> | object;
}

export interface IZipCode {
    zip: number;
    country: string;
}

export class ZipCodeParam implements ZipCodeParam, IEncodedParam<string | number> {
    public zip: number;
    public country: string;

    constructor(obj: IZipCode) {
        this.zip = obj.zip;
        this.country = obj.country;
    }

    public encode(): (string | number)[] {
        return [this.zip, this.country];
    }
}
