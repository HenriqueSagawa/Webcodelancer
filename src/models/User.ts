export interface User {
    length: number;
    name: string,
    email: string,
    password?: string,
    photo: Buffer | string
}