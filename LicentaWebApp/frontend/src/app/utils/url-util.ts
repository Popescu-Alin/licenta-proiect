import { API_URL } from "../constants/constants";

export class UrlUtil{

    public static getBaseUrl(): string {
        return API_URL;
    }

    public static getFullUrl(url: string): string {
        return this.getBaseUrl() +'/public/'+ url;
    }

}