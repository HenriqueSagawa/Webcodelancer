"use server"

import { User } from "../models/User";
import prisma from "@/prisma/prisma";
import bcrypt from "bcrypt";

export async function registerUser(user:User) {
    try {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        
        await prisma?.user.create({
            data: {
                ...user,
                password: hashedPassword
            }
        });
    } catch (err) {
        console.log(err);
    }
}

export async function getUser(email: string): Promise<User | null> {
    const result = await prisma?.user.findFirst({
        where: { email: email }
    });

    return result;
}