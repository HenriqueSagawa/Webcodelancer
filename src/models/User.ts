export interface User {
    name: string,
    email: string,
    password?: string,
    photo: Buffer | string
}