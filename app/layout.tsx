import type {Metadata} from "next";
import {open_sans, pt_serif} from "@/app/fonts";
import "@/app/globals.css";
import Script from "next/script";
import { GoogleAnalytics } from '@next/third-parties/google'

async function getMeta() {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_PAYLOAD_SERVER_URL}/api/globals/site-options?locale=undefined&draft=false&depth=1`,
        {
            next: {
                tags: ["siteOptions_"]
            }
        });
    return await res.json();
}


export async function generateMetadata(): Promise<Metadata> {

    const meta = await getMeta();


    return {
        title: meta.siteTitle,
        description: meta.siteDescription,
    }
}

export default async function RootLayout({
                                             children,
                                         }: Readonly<{
    children: React.ReactNode;
}>) {
    const meta = await getMeta();
    return (
        <html lang="en">
        <Script
            src="//https://linkprotect.cudasvc.com/url?a=https%3a%2f%2f%2f%2ftag.brandcdn.com%2fautoscript%2fcrazyhorsememorial_vgtsqk5fmvvsve09%2fCrazy_Horse_Memorial.js&c=E,1,-HJw6C0kycDXGRiVnsdST6VP3vcPRWtgjwIUtPnXdd_37gl5XrGUyEuIsC0nt3o6YkjXuXZQ6XtHNdMpX6ul8EIUeAh3G4RAJx1QebC9fsRu4wM,&typo=1"/>
        <Script src="https://fareharbor.com/embeds/api/v1/?autolightframe=yes"/>
        <body className={`${open_sans.variable} ${pt_serif.variable}`}>{children}</body>
        <GoogleAnalytics gaId="G-YDSBS7V3D3" />
        </html>
    );
}
