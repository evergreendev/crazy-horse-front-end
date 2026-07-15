'use client';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {IconProp} from "@fortawesome/fontawesome-svg-core";
import Link from "next/link";
import {buttonConfig, Config} from "@/app/components/ButtonConfig";
import LeavingSiteLink from "@/app/components/LeavingSiteLink";
import {useEffect, useState} from "react";

const DONATE_URL_PREFIX = "https://donate.crazyhorsememorial.org";

function mergeCurrentUrlParamsIntoDonateUrl(href: string) {
    if (typeof window === "undefined" || !href.startsWith(DONATE_URL_PREFIX)) return href;

    const currentParams = new URLSearchParams(window.location.search);
    if (!Array.from(currentParams.keys()).length) return href;

    try {
        const donateUrl = new URL(href);
        currentParams.forEach((value, key) => {
            donateUrl.searchParams.set(key, value);
        });
        return donateUrl.toString();
    } catch {
        return href;
    }
}

const Button = ({text, href, icon, config, tabIndex, isExternal, isInline, isDonate}: {
    text: string,
    href: string,
    icon?: IconProp,
    config?: Config,
    tabIndex?: number,
    isExternal?: boolean | null
    isInline?: boolean | null
    isDonate?: boolean | null
}) => {

    if (!config) config = buttonConfig.primary;

    const [resolvedHref, setResolvedHref] = useState(href);

    useEffect(() => {
        setResolvedHref(mergeCurrentUrlParamsIntoDonateUrl(href));
    }, [href]);

    return <>{
                 isExternal
                     ? <LeavingSiteLink tabIndex={tabIndex} href={resolvedHref}
                                        className={`${isDonate ? "" : "xl:w-96 flex-row-reverse justify-between"} ${isInline ? "inline-flex" : "flex"} w-full md:w-48 justify-center items-center gap-4 px-6 group py-2 text-xl grow ${config}`}>
                         {
                             icon &&
                             <div className="relative">
                                 {
                                     <>
                                         {
                                             isDonate ?
                                                 <>                                                 <FontAwesomeIcon
                                                     className={`absolute top-0 group-hover:animate-ping size-4 my-auto rounded-full bg-white p-2`}
                                                     icon={icon}/>
                                                     <FontAwesomeIcon className={`size-4 p-2 my-auto rounded-full bg-white`}
                                                                      icon={icon}/>
                                                 </>
                                                 : <>
                                                     <FontAwesomeIcon className="size-6 p-1 ml-4 my-auto" icon={icon}/>
                                                 </>

                                         }

                                     </>

                                 }
                             </div>
                         }
                         <span
                             className={`font-opensans`}>{text}</span>
                     </LeavingSiteLink>
                     :
                     <Link tabIndex={tabIndex} href={resolvedHref}
                           className={`${isDonate ? "" : "xl:w-96 flex-row-reverse justify-between"} ${isInline ? "inline-flex" : "flex"}  w-full md:w-48 justify-center items-center gap-4 px-6 py-2 text-xl group grow ${config}`}>
                         {
                             icon &&
                             <div className="relative">
                                 {
                                     <>
                                         {
                                             isDonate ?
                                                 <>                                                 <FontAwesomeIcon
                                                     className={`absolute top-0 group-hover:animate-ping size-4 my-auto rounded-full bg-white p-2`}
                                                     icon={icon}/>
                                                     <FontAwesomeIcon className={`size-4 p-2 my-auto rounded-full bg-white`}
                                                                      icon={icon}/>
                                                 </>
                                                 : <>
                                                     <FontAwesomeIcon className="size-6 p-1 ml-4 my-auto" icon={icon}/>
                                                 </>

                                         }

                                     </>

                                 }
                             </div>
                         }
                         <span className={`font-opensans`}>{
                             text
                         }</span>
                     </Link>
             }</>
}

export default Button;
