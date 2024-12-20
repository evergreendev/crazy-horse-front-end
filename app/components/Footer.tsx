import {Footer as FooterType} from "@/app/types/payloadTypes";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faFacebookSquare,
    faInstagramSquare,
    faSquareXTwitter,
    faYoutubeSquare
} from "@awesome.me/kit-2a2dc088e2/icons/classic/brands";
import React from "react";
import renderText from "@/app/components/BlockRenderer/utils/renderText";

const Footer = ({footer}: { footer: FooterType }) => {
    const widths = {
        "1/3": "md:w-4/12",
        "2/3": "md:w-8/12",
        "1/4": "md:w-3/12",
        "1/2": "md:w-6/12",
        "3/4": "md:w-9/12",
    }

    return <div className="bg-black text-white text-lg w-full">
        <div className="gap-2 flex flex-wrap justify-between m-8 w-full max-w-screen-2xl mx-auto font-semibold px-2">
            {
                footer?.columns?.map(column => {
                    return <div className={`${widths[column.width || "1/4"]}`} key={column.id}>
                        {renderText(column.content?.root,0,column.id||"","","text-white mb-2 block")}
                    </div>
                })
            }
            <div className="md:w-3/12 flex gap-4 mt-4 flex-wrap">
                <a href="https://www.facebook.com/crazyhorsememorial">
                    <FontAwesomeIcon className="size-14 text-gray-400 hover:text-gray-100" icon={faFacebookSquare}/>
                </a>
                <a href="https://x.com/CrazyHorseMem"><FontAwesomeIcon
                    className="size-14 text-gray-400 hover:text-gray-100" icon={faSquareXTwitter}/></a>
                <a href="https://www.instagram.com/crazyhorsememorial/"><FontAwesomeIcon
                    className="size-14 text-gray-400 hover:text-gray-100"
                    icon={faInstagramSquare}/></a>
                <a href="https://www.youtube.com/@CrazyHorseMemorial"><FontAwesomeIcon
                    className="size-14 text-gray-400 hover:text-gray-100"
                    icon={faYoutubeSquare}/></a>
            </div>
            <div className="w-full">
                <p className="text-sm italic">Photos and videos ©Crazy Horse Memorial Foundation</p>
            </div>
        </div>
    </div>
}

export default Footer;
