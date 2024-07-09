'use server';
import axios from "axios";
import { cookies } from "next/headers";

export const logoutHandler = async() => {
    try{
        const token = await JSON.parse(cookies().get("Token").value);
        const resp = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/auth/logout`,{refreshToken:token.refresh.token});
        
        if(resp){
            cookies().delete("User");
            cookies().delete("Token");
        }
    }catch(e){
        throw new Error("Error logging out");
    }
};