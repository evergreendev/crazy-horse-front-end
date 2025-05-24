import type {Metadata} from "next";
import {open_sans, pt_serif} from "@/app/fonts";
import "@/app/globals.css";
import Script from "next/script";
import qs from "qs";
import {Event, MuseumCollection} from "@/app/types/payloadTypes";
import {Meta} from "@/app/types/types";

async function getMeta():Promise<Meta["siteOptions"]> {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_PAYLOAD_SERVER_URL}/api/globals/site-options?locale=undefined&draft=false&depth=1`,
        {
            next: {
                tags: ["siteOptions_"]
            }
        });
    return await res.json();
}

async function getPage(query: any, tag: string, page?: string): Promise<MuseumCollection> {
    const stringifiedQuery = qs.stringify(
        {
            where: query,
        },
        {
            addQueryPrefix: true
        }
    );

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_PAYLOAD_SERVER_URL}/api/museumCollections/${stringifiedQuery}&depth=2`,
        {
            next: {
                tags: [tag]
            }
        }
    );

    const json = await res.json();

    return json.docs[0];
}


export async function generateMetadata({params}: { params: { slug: string[] } }): Promise<Metadata> {

    const page = await getPage({
        slug: {
            equals: params.slug[params.slug.length - 1]
        }
    }, "museumCollections_");

    const meta = await getMeta();

    if (!page){
        return {
            title: meta.siteTitle,
            description: meta.siteDescription
        }
    }

    return {
        title: page.meta?.title || meta.siteTitle + " - " + page.title,
        description: page.meta?.description || meta.siteDescription,
    }
}

export default async function RootLayout({
                                             children,
                                         }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            {children}
        </>
    );
}
