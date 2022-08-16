import { IApiSettings } from '../models/ApiModels';

export default abstract class BaseApiService {
    constructor(public apiSettings: IApiSettings) {}

    public createUrl(apiUrl: string, params?: { [key: string]: any }): URL {
        const { protocol, base } = this.apiSettings;

        const url = new URL(apiUrl, `${protocol}://${base}`);

        if (params) {
            Object.keys(params).forEach((key) => {
                if (params[key]) {
                    url.searchParams.set(key, params[key]);
                }
            });
        }

        return url;
    }

    protected handleError(error: Error): string {
        return null;
    }
}
