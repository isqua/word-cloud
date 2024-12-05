import { AppException } from './app';

export class UnexpectedException extends AppException {
    constructor() {
        super('Unexpected server error');
    }
}
