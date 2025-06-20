"use client"
import {Media, Page} from "@/app/types/payloadTypes";
import Image from "next/image";
import ReactPlayer from "react-player";
import PlayButton from "@/public/play-button.svg"
import NeedsWindow from "@/app/components/NeedsWindow";
import {sendGAEvent} from "@next/third-parties/google";
import Link from "next/link";
import getUrlFromPageOrExternal from "@/app/utilities/getUrlFromPageOrExternal";

const MaybeLink = ({href, children, className}: { href?: string, children: React.ReactNode, className?: string }) => {
    console.log(href);
    if (href) {
        return <Link className={className} href={href} target="_blank" rel="noreferrer">{children}</Link>
    }
    return <div className={className}>{children}</div>
}

const MediaBlock = ({block}: {
    block: Extract<NonNullable<Page['layout']>[number], { blockType: 'MediaBlock' }>;
}) => {
    const alignmentClass = {
        left: "mr-auto",
        right: "ml-auto",
        center: "mx-auto",
    }
    if (typeof block.media === "number") return null;
    if (block.media?.mimeType?.includes("image")) {
        return <MaybeLink href={getUrlFromPageOrExternal(block).url} className={"w-full"}>
            <Image className={`max-w-full ${alignmentClass[block.align||"center"]} ${block.expandImage ? "w-full" : ""}`}
                   src={block.media?.url || ""} alt={block.media?.alt || ""}
                   width={block.media?.width || 0}
                   height={block.media?.height || 0}/>
        </MaybeLink>
    }
    if(block.url){
        return <MaybeLink href={getUrlFromPageOrExternal(block).url} className={`${block.expandImage ? "md:aspect-auto aspect-square h-full w-full" : "aspect-video"} group  mx-auto`}>
            {
                <NeedsWindow>
                    <ReactPlayer
                        onStart={() => {
                            console.log("video play")
                            sendGAEvent('event', 'video_play', { value: block.url })
                        }}
                        config={{ file: {
                                attributes: {
                                    controlsList: 'nodownload'
                                }
                            }}}
                        playsinline={true} playing={true} width="100%" height="100%"
                                 playIcon={<Image className="size-14 xl:size-52 group-hover:opacity-100 transition-opacity opacity-70"
                                                  src={PlayButton} alt="Play"/>} controls={true}
                                 light={typeof block.thumbnail === "number" ? "" : block.thumbnail?.url || ""}
                                 url={block.url || ""}/>
                </NeedsWindow>
            }
        </MaybeLink>
    }
    return <MaybeLink className={`${block.expandImage ? "md:aspect-auto aspect-square h-full w-full" : "aspect-video"} group  mx-auto`}>
        {
            <NeedsWindow>
                <ReactPlayer
                    onStart={() => {
                        console.log("video play")
                        sendGAEvent('event', 'video_play', { value: (block.media as Media)?.url })
                    }}
                    config={{ file: {
                        attributes: {
                            controlsList: 'nodownload'
                        }
                    }}} playsinline={true} playing={true} width="100%" height="100%"
                             playIcon={<Image className="size-14 xl:size-52 group-hover:opacity-100 transition-opacity opacity-70"
                                              src={PlayButton} alt="Play"/>} controls={true}
                             light={typeof block.thumbnail === "number" ? "" : block.thumbnail?.url || ""}
                             url={block.media?.url || ""}/>
            </NeedsWindow>
        }
    </MaybeLink>
}

export default MediaBlock;
