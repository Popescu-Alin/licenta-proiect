import { FileParameter } from "../client/client";

export class FileParameterClass implements FileParameter{
    data: any;
    fileName!: string ;

    constructor(data: any, fileName: string) {
        this.data = data;
        this.fileName = fileName;
    }

}