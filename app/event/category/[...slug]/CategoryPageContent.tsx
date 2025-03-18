import BreadCrumbs from "@/app/components/BreadCrumbs";
import JumpMenu from "@/app/components/JumpMenu";
import React from "react";
import TopBar from "@/app/components/TopBar";
import {Media, Page, Event} from "@/app/types/payloadTypes";
import Footer from "@/app/components/Footer";
import BlockRenderer from "@/app/components/BlockRenderer";
import ImageSlider from "@/app/components/ImageSlider";
import qs from "qs";
import {notFound} from "next/navigation";
import Link from "next/link";
import {getImage, getSlugFromCollection} from "@/app/components/BlockRenderer/blocks/blockHelpers";
import Image from "next/image";


async function getData(query: any, tag: string) {
    const stringifiedQuery = qs.stringify(
        {
            where: query,
            sort: "order",
        },
        {
            addQueryPrefix: true
        }
    );

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_PAYLOAD_SERVER_URL}/api/event/${stringifiedQuery}&depth=2`,
        {
            next: {
                tags: [tag]
            }
        }
    );

    if (res.status !== 200) notFound();

    return res.json();
}

const CategoryPageContent = async ({data, meta}: { data: Page, meta: any }) => {
    const res = await getData({
        eventCategory: {
            equals: data.id
        }
    }, "event_");
    const events:Event[] = res.docs;

    return <main className="flex min-h-screen flex-col items-center w-full">
        <div className="p-2 xl:px-24 xl:py-7 flex flex-col items-center w-full">
            <TopBar siteOption={meta.siteOptions} nav={meta.nav}/>
        </div>
        <ImageSlider headerText={data.intro_content?.header || data.title} bodyText={data.intro_content?.content || ""}
                     images={data.intro_content?.images?.filter((image): image is { media: Media, id: string } => {
                         return !!image.media && typeof image.media !== "number"
                     }).map(image => {
                         return image.media
                     }) || []}/>
        <div className="px-7 xl:px-24 py-7 flex-col items-center w-full hidden lg:flex">
            <div className="flex max-w-[calc(1800px-3.5rem)] w-full justify-between">
                {
                    data?.full_path &&
                    <BreadCrumbs fullPath={data?.full_path}/>
                }
                {
                    data?.jump_menu && data.jump_menu.length > 0 && <JumpMenu items={data.jump_menu}/>
                }
            </div>
        </div>
        <div className="w-full pt-16">
            <BlockRenderer blocks={data.layout}/>
            <div>
                {
                    events.map(event => {
                        const img = getImage(event);
                        return <Link key={event.id} href={getSlugFromCollection(event,"event")}><div className="flex flex-wrap bg-gray-100 max-w-[1800px] mb-14 justify-between mx-auto">
                            <div className="w-full md:w-5/12 p-6 text-center self-center grow">
                                <h2 className="mb-6 text-4xl font-bold underline underline-offset-8 decoration-brand-yellow decoration-4 font-ptserif">{event.title}</h2>
                                <p className="text-xl max-w-[38ch] text-center mx-auto">
                                    {event.intro_content?.content} <div className="underline italic">More</div>
                                </p>
                            </div>
                            {
                                img ? <Image style={{objectPosition: `${img.focalX}% ${img.focalY}%`}} className="aspect-video object-cover w-6/12 grow" src={img.url || ""} alt={img.alt||""} width={img.width || 0} height={img.height || 0}/> : ""
                            }
                        </div></Link>
                    })
                }
            </div>
        </div>
        <Footer footer={meta.footer}/>
    </main>
}

export default CategoryPageContent;
