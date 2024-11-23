export class SessionExpiryError extends Error {
    constructor() {
        super('Session expired');
    }
}
