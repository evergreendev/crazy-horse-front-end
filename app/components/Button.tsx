'use client';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {IconProp} from "@fortawesome/fontawesome-svg-core";
import Link from "next/link";
import {buttonConfig, Config} from "@/app/components/ButtonConfig";
import LeavingSiteLink from "@/app/components/LeavingSiteLink";

const Button = ({text, href, icon, config, tabIndex, isExternal, isInline}: {
    text: string,
    href: string,
    icon?: IconProp,
    config?: Config,
    tabIndex?: number,
    isExternal?: boolean | null
    isInline?: boolean | null
}) => {

    if (!config) config = buttonConfig.primary;

    return <>{
                 isExternal
                     ? <LeavingSiteLink tabIndex={tabIndex} href={href}
                                        className={`${isInline ? "inline-flex" : "flex"} w-full md:w-48 justify-center items-center gap-4 px-6 group py-2 text-xl grow ${config}`}>
                         {
                             icon &&
                             <FontAwesomeIcon className="group-hover:animate-pulse size-6 my-auto rounded-full bg-white p-1.5" icon={icon}/>
                         }
                         <span
                             className={`font-opensans`}>{text}</span>
                     </LeavingSiteLink>
                     :
                     <Link tabIndex={tabIndex} href={href}
                           className={`${isInline ? "inline-flex" : "flex"} w-full md:w-48 justify-center items-center gap-4 px-6 py-2 text-xl group grow ${config}`}>
        {
            icon &&
            <div className="relative"><FontAwesomeIcon className="absolute top-0 group-hover:animate-ping size-6 my-auto rounded-full bg-white p-1.5" icon={icon}/>
                <FontAwesomeIcon className="size-6 my-auto rounded-full bg-white p-1.5" icon={icon}/></div>
        }
        <span className={`font-opensans`}>{
            text
        }</span>
                     </Link>
             }</>
}

export default Button;
