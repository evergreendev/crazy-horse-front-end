import qs from "qs";
import React from "react";
import PageContent from "@/app/components/standardPageContents/PageContent";
import PageClient from "@/app/components/standardPageContents/page.client";
import getMeta from "@/app/data/getMeta";
import attemptRedirect from "@/app/utilities/attemptRedirect";
import {Modal} from "@/app/types/payloadTypes";

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
        `${process.env.NEXT_PUBLIC_PAYLOAD_SERVER_URL}/api/pages/${stringifiedQuery}&depth=2`,
        {
            next: {
                tags: [tag]
            }
        }
    );

    if (res.status !== 200) return null;

    return res.json();
}

async function getModals() {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_PAYLOAD_SERVER_URL}/api/modal/?depth=2`,
        {
            cache: "no-cache",
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
    }, "pages_");
    const data = res.docs[0];
    const meta = await getMeta();
    const modalsRes = await getModals();
    const modalsData = modalsRes.docs.find((modal: Modal) => {
        const now = new Date();
        now.setUTCHours(0, 0, 0)

        if (modal.startShowing){
            const start = new Date(modal.startShowing);
            start.setUTCHours(0,0,0);

            if (start > now){
                return false;
            }
        }
        if(modal.stopShowing){
            const stop = new Date(modal.stopShowing);
            stop.setUTCHours(0,0,0);

            if (stop <= now){
                return false;
            }
        }

        return modal.pages?.find(x => {
            if (typeof x === "number") {
                return x === data.id
            } else {
                return x.slug === data.slug
            }
        });
    });

    if(!data) await attemptRedirect(params.slug);

    if (secret === process.env.NEXT_PUBLIC_DRAFT_SECRET){
        return (
            <PageClient meta={meta} initialPage={data}/>
        )
    }

    return (
        <>
            <PageContent meta={meta} data={data} modal={modalsData}/>
        </>

    );
}
