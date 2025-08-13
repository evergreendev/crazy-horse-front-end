import Link from "next/link";
import Image from "next/image";
import MegaMenu from "@/app/components/MegaMenu";
import Button from "@/app/components/Button";
import React from "react";
import {Media, Navigation, SiteOption} from "@/app/types/payloadTypes";
import SearchBar from "@/app/components/Search";
import {buttonConfig} from "@/app/components/ButtonConfig";
import {faHeart} from "@awesome.me/kit-2a2dc088e2/icons/classic/solid";

const TopBar = ({siteOption, nav}: { siteOption: SiteOption, nav: Navigation }) => {

    return <>
        <div className="hidden lg:flex flex-wrap max-w-screen-2xl w-full justify-end lg:justify-between items-center">
            <Link href='/' className="lg:border-r-[3px] border-black lg:pr-8 flex lg:mr-8 mx-auto sm:mx-0 md:grow-0">
                {
                    typeof siteOption.siteLogoSmall !== "number" ?
                        <Image className="max-w-md mx-auto my-3 w-full grow lg:w-96"
                               src={`${siteOption.siteLogoSmall.url}`}
                               alt={siteOption.siteLogoSmall.alt || ""}
                               width={siteOption.siteLogoSmall.width || "0"}
                               height={siteOption.siteLogoSmall.height || "0"}/>
                        : ""
                }

            </Link>

            <div
                className="flex-col ml-auto mb-4 lg:mb-0 lg:ml-0 w-full sm:w-auto items-end lg:items-start hidden lg:flex">
                <MegaMenu nav={nav}/>
                <div className="mt-auto hidden lg:block">
                    <SearchBar/>
                </div>

            </div>

            <div className="ml-auto">
                <Button config={buttonConfig.highlight + " mb-5 self-start ml-auto w-48  text-center justify-around"}
                        text="DONATE" href="https://donate.crazyhorsememorial.org/" icon={faHeart}/>
            </div>
            <div className="flex-col ml-auto mb-4 lg:mb-0 lg:ml-0 w-full items-end lg:items-start lg:hidden flex">
                <MegaMenu nav={nav}/>
            </div>
        </div>
        <div className="w-full flex flex-wrap lg:hidden">
            <div
                className="flex w-full lg:hidden justify-between items-start max-w-screen-xl pl-0 pt-6 gap-x-4 xl:gap-x-0 xl:p-0">
                <div className="flex flex-col justify-start gap-2">
                    <Link href="/" className="xl:hidden">
                        <Image className="w-52 ml-2" src={(siteOption.siteLogoSmall as Media).url || ""}
                               alt={(siteOption.siteLogoSmall as Media).alt || ""}
                               width={(siteOption.siteLogoSmall as Media).width || 0}
                               height={(siteOption.siteLogoSmall as Media).height || 0}
                        />
                    </Link>
                </div>
                <div>
                    <Button text="DONATE" href="https://donate.crazyhorsememorial.org/"
                            config={buttonConfig.highlight + " text-center justify-around"} icon={faHeart}/>
                </div>
            </div>
            <div className="w-full flex justify-end">
                <MegaMenu nav={nav}/>
            </div>
        </div>


    </>
}

export default TopBar;
