import qs from "qs";
import React from "react";
import {notFound} from "next/navigation";
import {HomeClient} from "@/app/Home.client";
import HomeLayout from "@/app/HomeLayout";
import getMeta from "@/app/data/getMeta";
import {Modal} from "@/app/types/payloadTypes";

async function getData(query:any, tag:string){
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

    if (res.status !== 200) notFound();

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

export default async function Home({searchParams}:{searchParams?:{draft?:string; secret?:string}}) {
    const secret = searchParams?.secret;

    const meta = await getMeta();

    const res = await getData({
        slug: {
            equals: "home"
        }
    }, "pages_");
    const data = res.docs[0];

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
                return x.slug === "home"
            }
        });
    });

    if (!data) notFound();

    if (secret === process.env.NEXT_PUBLIC_DRAFT_SECRET){
        return (
            <HomeClient page={data} meta={meta}/>
        )
    }

    return (
        <HomeLayout data={data} meta={meta} modal={modalsData}/>
    );
}
