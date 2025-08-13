"use server";
import { cookies } from "next/headers";
import {redirect} from "next/navigation";

export async function setCookie(updatedAt: string) {
    const monthInSeconds = 2678400;
    cookies().set("hide-banner", updatedAt, {maxAge: monthInSeconds});

    // Redirect to the same page to avoid the Response.clone issue
    redirect('');  // Empty string redirects to current URL
}
