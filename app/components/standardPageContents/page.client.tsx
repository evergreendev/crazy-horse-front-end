"use client";
import {useLivePreview} from "@payloadcms/live-preview-react";
import {Media, Page} from "@/app/types/payloadTypes";
import {Meta} from "@/app/types/types";
import TopBar from "@/app/components/TopBar";
import ImageSlider from "@/app/components/ImageSlider";
import BreadCrumbs from "@/app/components/BreadCrumbs";
import JumpMenu from "@/app/components/JumpMenu";
import BlockRenderer from "@/app/components/BlockRenderer";
import Footer from "@/app/components/Footer";
import React from "react";

const PageClient = ({initialPage, meta}:{initialPage:Page, meta:Meta}) => {
    const { data } = useLivePreview({
        initialData: initialPage,
        serverURL: process.env.NEXT_PUBLIC_PAYLOAD_SERVER_URL || "",
        depth: 2,
    });

    return <main className="flex min-h-screen flex-col items-center w-full">
        <div className="p-2 xl:px-24 xl:py-7 flex flex-col items-center w-full">
            <TopBar siteOption={meta.siteOptions} nav={meta.nav} donationLinkOverrideUrl={data.donationLinkOverride ? data.donationLinkOverrideUrl : null}/>
        </div>
        <ImageSlider headerText={data.intro_content?.header||data.title} bodyText={data.intro_content?.content||""} images={data.intro_content?.images?.filter((image): image is { media: Media, id: string } => {
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
        <div className="w-full">
            <BlockRenderer blocks={data.layout}/>
        </div>
        <Footer footer={meta.footer}/>
    </main>
}

export default PageClient;
