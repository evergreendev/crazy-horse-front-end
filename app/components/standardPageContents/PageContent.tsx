import BreadCrumbs from "@/app/components/BreadCrumbs";
import JumpMenu from "@/app/components/JumpMenu";
import React from "react";
import TopBar from "@/app/components/TopBar";
import {Media, Page} from "@/app/types/payloadTypes";
import Footer from "@/app/components/Footer";
import BlockRenderer from "@/app/components/BlockRenderer";
import ImageSlider from "@/app/components/ImageSlider";
import Announcement from "@/app/components/Announcement";
import {cookies} from "next/headers";
import PasswordForm from "@/app/components/PasswordForm/PasswordForm";

const PageContent = async ({data, meta}: { data: Page, meta: any }) => {
    const cookieStore = await cookies();
    const savedPagePassword = cookieStore.get(data.slug+"password");
    const showPasswordForm = data.passwordProtect && savedPagePassword?.value !== data.password

    return <main className="flex min-h-screen flex-col items-center w-full">
        <Announcement data={meta.banner}/>
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
        <div className="w-full">
            {
                showPasswordForm ? <PasswordForm cookieKey={data.slug+"password"} password={data.password as string}/> : <BlockRenderer blocks={data.layout}/>
            }

        </div>
        <Footer footer={meta.footer}/>
    </main>
}

export default PageContent;
