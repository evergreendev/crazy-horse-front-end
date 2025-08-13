import BreadCrumbs from "@/app/components/BreadCrumbs";
import JumpMenu from "@/app/components/JumpMenu";
import React from "react";
import Image from "next/image";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClock, faTicket} from "@awesome.me/kit-2a2dc088e2/icons/classic/regular";
import Link from "next/link";
import {faChevronCircleRight} from "@awesome.me/kit-2a2dc088e2/icons/classic/thin";
import {faHeart, faLocationDot, faPhoneVolume} from "@awesome.me/kit-2a2dc088e2/icons/classic/solid";
import Button from "@/app/components/Button";
import {
    faFacebookSquare,
    faInstagramSquare,
    faSquareXTwitter,
    faYoutubeSquare
} from "@awesome.me/kit-2a2dc088e2/icons/classic/brands";
import {getCurrentSchedule, getHoursFromSchedule} from "@/app/utilities/hours";
import {Media, Modal, Page} from "@/app/types/payloadTypes";
import Video from "@/app/components/Video";
import {Meta} from "@/app/types/types";
import Footer from "@/app/components/Footer";
import MegaMenu from "@/app/components/MegaMenu";
import BlockRenderer from "@/app/components/BlockRenderer";
import SearchBar from "@/app/components/Search";
import {buttonConfig} from "@/app/components/ButtonConfig";
import Announcement from "@/app/components/Announcement/Announcement";
import {open_sans, pt_serif} from "@/app/fonts";
import ModalComponent from "@/app/components/Modal";

const MobileOnlyInfo = ({meta}: { meta: Meta }) => {
    const currentSchedule = getCurrentSchedule(meta.hours)
    return <div className="xl:hidden">
        <div className="mb-7 text-center flex flex-col justify-center">
            <div className="flex items-center justify-center text-xl mb-7">
                <FontAwesomeIcon className="size-5 mr-6" icon={faClock} size="sm"/>
                Open Today: {currentSchedule?.hours?.[0] ? getHoursFromSchedule(currentSchedule.hours[0]) : ""}
            </div>
            <Link className="flex items-center justify-center text-xl mb-7"
                  href={`/plan-your-visit/information/pricing-and-admission`}>
                <FontAwesomeIcon transform={{rotate: 5}} className="size-5 mr-6" icon={faTicket} size="sm"/>
                <p>Admission:</p>
                <FontAwesomeIcon className="size-5 ml-2" icon={faChevronCircleRight}/>
            </Link>
            <a className="flex items-center justify-center text-xl mb-7" href="tel:605-673-4681">
                <FontAwesomeIcon className="size-5 mr-6" icon={faPhoneVolume}/>
                Call: 605.673.4681
            </a>
            <div className="flex items-start justify-center text-xl mb-7">

                <address className="not-italic text-center">
                    <FontAwesomeIcon className="size-6 mr-5 mt-1" icon={faLocationDot}/>
                    Crazy Horse Memorial<sup>&reg;</sup><br/>
                    12151 Avenue of the Chiefs<br/>
                    Crazy Horse, SD 57730-8900<br/>
                    <Link className="underline" href={`/plan-your-visit#location-hours`}>more
                        direction
                        information</Link>
                </address>
            </div>
        </div>
        <div className="flex w-72 mx-auto">
            <Button config={buttonConfig.primary + " mb-5 w-96"} text="Plan Your Visit" href="/plan-your-visit"
                    icon={faChevronCircleRight}/>
        </div>
        <div className="flex w-72 mx-auto">
            <Button config={buttonConfig.primary + " mb-5 w-full"} text="Book Tickets"
                    href="https://fareharbor.com/embeds/book/crazyhorsememorial/items/354688/?full-items=yes&flow=680245&u=47a370f1-2caf-4219-b33e-3daf581fa1e0&from-ssl=yes&ga=UA-7000283-1%2C1694069336.1703794957%3BUA-156164615-1%2C1694069336.1703794957%3B&ga4t=AW-16566712924%2Cundefined__undefined%3BG-YDSBS7V3D3%2C1694069336.1703794957__1729092627%3B&g4=yes&cp=no&csp=no&back=https%3A%2F%2Fcrazyhorsememorial.org%2Fvisit&language=en-us"
                    icon={faChevronCircleRight}/>
        </div>
    </div>
}

const SideBar = ({meta}: { meta: Meta }) => {

    const currentSchedule = getCurrentSchedule(meta.hours);

    return <div className="border-r-[3px] border-black pr-8 hidden xl:block">
        {
            typeof meta.siteOptions.siteLogo !== "number" ?
                <Image className="max-w-md mb-16" src={`${meta.siteOptions.siteLogo.url}`}
                       alt={meta.siteOptions.siteLogo.alt || ""}
                       width={meta.siteOptions.siteLogo.width || 100}
                       height={meta.siteOptions.siteLogo.height || 100}/> : ""
        }

        <div className="mb-32">
            <div className="flex items-center text-xl mb-7">
                <FontAwesomeIcon className="size-5 mr-6" icon={faClock} size="sm"/>
                Open Today: {currentSchedule?.hours?.[0] ? getHoursFromSchedule(currentSchedule.hours[0]) : ""}
            </div>
            <Link className="flex items-center text-xl mb-7"
                  href={`/plan-your-visit/information/pricing-and-admission`}>
                <FontAwesomeIcon transform={{rotate: 5}} className="size-5 mr-6" icon={faTicket} size="sm"/>
                <p>Admission:</p>
                <FontAwesomeIcon className="size-5 ml-2" icon={faChevronCircleRight}/>
            </Link>
            <a className="flex items-center text-xl mb-7" href="tel:605-673-4681">
                <FontAwesomeIcon className="size-5 mr-6" icon={faPhoneVolume}/>
                Call: 605.673.4681
            </a>
            <div className="flex items-start text-xl mb-7">
                <FontAwesomeIcon className="size-6 mr-5 mt-1" icon={faLocationDot}/>
                <address className="not-italic">
                    Crazy Horse Memorial<sup>&reg;</sup><br/>
                    12151 Avenue of the Chiefs<br/>
                    Crazy Horse, SD 57730-8900<br/>
                    <Link className="underline" href={`/plan-your-visit#location-hours`}>more
                        direction
                        information</Link>
                </address>
            </div>
        </div>
        <Button config={buttonConfig.primary + " mb-5 w-full"} text="Plan Your Visit" href="/plan-your-visit"
                icon={faChevronCircleRight}/>
        <Button config={buttonConfig.primary + " mb-5 w-full"} text="Book Tickets"
                href="https://fareharbor.com/embeds/book/crazyhorsememorial/items/354688/?full-items=yes&flow=680245&u=47a370f1-2caf-4219-b33e-3daf581fa1e0&from-ssl=yes&ga=UA-7000283-1%2C1694069336.1703794957%3BUA-156164615-1%2C1694069336.1703794957%3B&ga4t=AW-16566712924%2Cundefined__undefined%3BG-YDSBS7V3D3%2C1694069336.1703794957__1729092627%3B&g4=yes&cp=no&csp=no&back=https%3A%2F%2Fcrazyhorsememorial.org%2Fvisit&language=en-us"
                icon={faChevronCircleRight}/>
        <div className="flex gap-6">
            <a href="https://www.facebook.com/crazyhorsememorial">
                <FontAwesomeIcon className="size-14 text-gray-800" icon={faFacebookSquare}/>
            </a>
            <a href="https://x.com/CrazyHorseMem"><FontAwesomeIcon className="size-14" icon={faSquareXTwitter}/></a>
            <a href="https://www.instagram.com/crazyhorsememorial/"><FontAwesomeIcon className="size-14 text-gray-800"
                                                                                     icon={faInstagramSquare}/></a>
            <a href="https://www.youtube.com/@CrazyHorseMemorial"><FontAwesomeIcon className="size-14"
                                                                                   icon={faYoutubeSquare}/></a>
        </div>
    </div>
}

const HomeLayout = ({data, meta, modal}: { data: Page, meta: Meta, modal: Modal}) => {
    return (
        <main className={`${open_sans.variable} ${pt_serif.variable} flex min-h-screen flex-col justify-between`}>
            {
                modal ?
                    <ModalComponent modal={modal} /> : ""
            }
                <Announcement data={meta.banner}/>
            <div className="flex flex-wrap xl:flex-nowrap w-full mb-4 max-w-top ml-auto mt-4 pl-0 xl:pl-7">
                <SideBar meta={meta}/>
                <div className="font-ptserif mx-auto grow pl-0 xl:pl-10">
                    <div
                        className="flex justify-between items-start max-w-screen-xl p-2 pl-0 gap-x-4 xl:gap-x-0 xl:p-0">
                        <div className="flex flex-col justify-start gap-2">
                            <Link href="/" className="xl:hidden">
                                <Image className="w-52 ml-2" src={(meta.siteOptions.siteLogoSmall as Media).url || ""}
                                       alt={(meta.siteOptions.siteLogoSmall as Media).alt || ""}
                                       width={(meta.siteOptions.siteLogoSmall as Media).width || 0}
                                       height={(meta.siteOptions.siteLogoSmall as Media).height || 0}
                                />
                            </Link>
                            <MegaMenu nav={meta.nav}/>
                            <div className="my-8 hidden xl:block">
                                <SearchBar/>
                            </div>

                        </div>
                        <div>
                            <Button isDonate isExternal text="DONATE" href="https://donate.crazyhorsememorial.org/"
                                    config={buttonConfig.highlight + " text-center justify-around"} icon={faHeart}/>
                        </div>
                    </div>
                    {
                        data.intro_content?.videoFile ?
                            <div className="w-full">
                                <Video
                                    thumbnail={typeof data.intro_content.thumbnail === "number" ? undefined : data.intro_content.thumbnail}
                                    src={(data.intro_content.videoFile as Media)?.url || ""}
                                    mobileSrc={(data.intro_content.mobileVideoFile as Media)?.url || ""}
                                />
                                <p className="text-sm font-bold text-center italic font-opensans">©Crazy Horse Memorial Foundation</p>
                            </div> :
                            ""
                    }
                    <div
                        className="w-full bg-pale-1 xl:bg-transparent p-4 xl:p-0 flex flex-col mx-auto max-w-screen-lg xl:mt-6 text-center">
                        <div className="flex xl:justify-center xl:mx-auto">
                            <h1 className="font-ptserif text-2xl text-left xl:text-4xl font-bold border-b-brand-yellow border-b-4">{data.intro_content?.header}</h1>
                        </div>
                        <p className="font-ptserif text-xl text-left xl:text-center xl:text-3xl font-normal max-w-full">
                            {data.intro_content?.content}
                        </p>
                    </div>

                </div>
            </div>
            <div className="w-full mt-6 max-w-top ml-auto pl-7 hidden xl:flex">
                <div className="max-w-md w-full flex items-center mr-14">
                    <BreadCrumbs fullPath={data?.full_path || ""}/>
                </div>

                {
                    data?.jump_menu && <JumpMenu items={data.jump_menu}/>
                }
            </div>
            <MobileOnlyInfo meta={meta}/>
            <div className="w-full xl:pt-16">
                <BlockRenderer blocks={data.layout}/>
            </div>

            <Footer footer={meta.footer}/>
        </main>
    );
}

export default HomeLayout;
