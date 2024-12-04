import { AppException } from './app';

export class EntityLimitException extends AppException {
    constructor(message: string) {
        super(message);
    }
}
