"use client"
import {Media} from "@/app/types/payloadTypes";
import Image from "next/image";
import ReactPlayer from "react-player";
import PlayButton from "@/public/play-button.svg"
import NeedsWindow from "@/app/components/NeedsWindow";
import {sendGAEvent} from "@next/third-parties/google";

const MediaBlock = ({block}: {
    block: {
        media?: number | Media | null;
        thumbnail?: number | Media | null;
        expandImage?: boolean | null;
        id?: string | null;
        url?: string | null;
        blockName?: string | null;
        blockType: 'MediaBlock';
    }
}) => {
    if (typeof block.media === "number") return null;
    if (block.media?.mimeType?.includes("image")) {
        return <Image className={`max-w-full mx-auto ${block.expandImage ? "w-full" : ""}`}
                      src={block.media?.url || ""} alt={block.media?.alt || ""}
                      width={block.media?.width || 0}
                      height={block.media?.height || 0}/>
    }
    if(block.url){
        return <div className={`${block.expandImage ? "md:aspect-auto aspect-square h-full w-full" : "aspect-video"} group  mx-auto`}>
            {
                <NeedsWindow>
                    <ReactPlayer
                        onPlay={() => {
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
        </div>
    }
    return <div className={`${block.expandImage ? "md:aspect-auto aspect-square h-full w-full" : "aspect-video"} group  mx-auto`}>
        {
            <NeedsWindow>
                <ReactPlayer   config={{ file: {
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
    </div>
}

export default MediaBlock;
