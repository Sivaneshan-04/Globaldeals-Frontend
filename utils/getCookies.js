'use server'
import { cookies } from "next/headers";

export const getJWTokens = async () => {
    // console.log(cookies()?.get('Token'));
    return (cookies()?.get('Token'));
}

export const getUserCookies = async () => {
    // console.log(cookies()?.get('User'));
    return (cookies()?.get('User'));
}
