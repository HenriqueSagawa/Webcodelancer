"use client"

import { User } from "../models/User";

export function saveUserData(userData: User) {
    localStorage.setItem('tokenWebCodeLancer', JSON.stringify(userData));
}

function getStorageValue(key: any, defaultValue: any) {
    if (typeof window !== "undefined") {
        const saved = localStorage.getItem(key);
        if (saved && saved !== 'undefined') {
            return JSON.parse(saved);
        }
        return defaultValue;
    }
}

export function getUserData(email: string) {
    return getStorageValue("tokenWebCodeLancer", null);
}

export function removeUserData() {
    localStorage.removeItem("tokenWebCodeLancer");
}