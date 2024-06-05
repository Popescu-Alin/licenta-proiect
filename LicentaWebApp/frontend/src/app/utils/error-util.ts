import { HttpErrorResponse } from "@angular/common/http";

export class ErrorUtil{

    public static isHttpError(error: any): boolean {
        return error instanceof HttpErrorResponse;
    }

    public static is404Error(error: any): boolean {
        return this.isHttpError(error) && error.status === 404;
    }

}

