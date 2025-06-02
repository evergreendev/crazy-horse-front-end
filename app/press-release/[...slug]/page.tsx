import qs from "qs";
import React from "react";
import PageContent from "@/app/components/standardPageContents/PageContent";
import PageClient from "@/app/components/standardPageContents/page.client";
import getMeta from "@/app/data/getMeta";
import attemptRedirect from "@/app/utilities/attemptRedirect";

async function getData(query: any, tag: string) {
    const stringifiedQuery = qs.stringify(
        {
            where: query,
        },
        {
            addQueryPrefix: true
        }
    );

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_PAYLOAD_SERVER_URL}/api/pressRelease/${stringifiedQuery}&depth=2`,
        {
            next: {
                tags: [tag]
            }
        }
    );

    if (res.status !== 200) return null;

    return res.json();
}

export default async function Page({params, searchParams}: { params: { slug: string[] }, searchParams?:{draft?:string; secret?:string} }) {
    const slug = params.slug;
    const secret = searchParams?.secret;
    const res = await getData({
        slug: {
            equals: slug[slug.length - 1]
        }
    }, "pressRelease_");
    const data = res.docs[0];
    const meta = await getMeta();

    if (!data) await attemptRedirect(params.slug);

    if (secret === process.env.NEXT_PUBLIC_DRAFT_SECRET){
        return (
            <PageClient meta={meta} initialPage={data}/>
        )
    }

    return (
        <PageContent meta={meta} data={data}/>
    );
}
