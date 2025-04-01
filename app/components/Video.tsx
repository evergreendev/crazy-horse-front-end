import React from "react";
import {Media} from "@/app/types/payloadTypes";
import Image from "next/image";

const Video = ({src, mobileSrc, thumbnail}: { src: string, mobileSrc?: string | null, thumbnail?: Media | null }) => {

    return <div className="aspect-video relative bg-slate-300">
        <video
            className={`z-20 ${mobileSrc ? "hidden md:block":""} relative aspect-video w-full`} width="320" height="245" autoPlay muted loop playsInline>
            <source src={src} type="video/mp4"/>
        </video>
        {
            mobileSrc ?
                <video
                    className={`z-20 block md:hidden relative aspect-video w-full`} width="320"
                    height="245" autoPlay muted loop playsInline>
                    <source src={mobileSrc} type="video/mp4"/>
                </video> : null
        }
        {
            thumbnail
                ? <Image className={`z-10 absolute inset-0 w-full h-full aspect-video object-fill`} priority={true}
                         src={thumbnail.url || ""}
                         width={thumbnail.width || 0} height={thumbnail.height || 0}
                         alt={thumbnail.alt || ""}/>
                : null
        }
    </div>
}

export default Video;
