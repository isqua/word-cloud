import { AppException } from './app';

export class ConflictException extends AppException {
    constructor(message: string) {
        super(message);
    }
}
