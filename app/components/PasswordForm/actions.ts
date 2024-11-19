'use server'

import {cookies} from "next/headers";

export async function submitPassword(prevState: {
    message: string | null,
    password: string,
    cookieKey: string,
}, formData: FormData) {
    const submittedPassword = formData.get('password');
    const cookieStore = await cookies();

    const savePassword = formData.get("savePassword")

    if (!submittedPassword) return {message: null, password: prevState.password, cookieKey: prevState.cookieKey};

    if (submittedPassword !== prevState.password) {
        return {message: "Incorrect Password", password: prevState.password, cookieKey: prevState.cookieKey};
    }

    if (savePassword){
        cookieStore.set(prevState.cookieKey, submittedPassword, {maxAge: 30000000});
    } else {
        cookieStore.set(prevState.cookieKey, submittedPassword);
    }



    return {
        message: null,
        password: prevState.password,
        cookieKey: prevState.cookieKey
    };
}
