import { AppException } from "./app";

export class NotFoundException extends AppException {
    constructor(message: string) {
        super(message);
    }
}
