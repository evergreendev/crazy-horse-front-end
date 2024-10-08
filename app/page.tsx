import qs from "qs";
import React from "react";
import {notFound} from "next/navigation";
import {HomeClient} from "@/app/Home.client";
import HomeLayout from "@/app/HomeLayout";
import getMeta from "@/app/data/getMeta";

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

export default async function Home({searchParams}:{searchParams?:{draft?:string; secret?:string}}) {
    const secret = searchParams?.secret;

    const meta = await getMeta();

    const res = await getData({
        slug: {
            equals: "home"
        }
    }, "pages_");
    const data = res.docs[0];

    if (!data) notFound();

    if (secret === process.env.NEXT_PUBLIC_DRAFT_SECRET){
        return (
            <HomeClient page={data} meta={meta}/>
        )
    }

    return (
        <HomeLayout data={data} meta={meta}/>
    );
}
