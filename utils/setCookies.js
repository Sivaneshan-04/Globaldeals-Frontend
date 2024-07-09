'use server';
import { cookies } from "next/headers";

export const setJWTokens = async (data) => {
    cookies().set('Token',(data),{
        httpOnly: true,
        maxAge: 60 * 60 * 24,  // One day
    });
}

export const setUserCookies = async (data) => {
    cookies().set('User',(data),{
        httpOnly: true,
        maxAge: 60 * 60 * 24,  // One day
        path: '/',
    });
}
