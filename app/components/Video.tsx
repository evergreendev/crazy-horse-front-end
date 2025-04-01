"use client"
import React, { useState } from "react";
import { Media } from "@/app/types/payloadTypes";
import Image from "next/image";
import ReactPlayer from "react-player";

const Video = ({ src, mobileSrc, thumbnail }: { src: string, mobileSrc?: string | null, thumbnail?: Media | null }) => {
    // Check if the src is a YouTube or Vimeo URL
    const isExternalVideo = ReactPlayer.canPlay(src);
    // State to track if the video should be playing
    const [isPlaying, setIsPlaying] = useState(false);

    return (
        <div className="aspect-video relative bg-slate-300">
            {isExternalVideo ? (
                // Render ReactPlayer for YouTube/Vimeo videos
                <ReactPlayer
                    url={src}
                    className="z-20 relative aspect-video w-full"
                    width="100%"
                    height="100%"
                    controls
                    playing={isPlaying}
                    light={isPlaying ? false : (thumbnail?.url || true)} // Use thumbnail until played
                    onClickPreview={() => setIsPlaying(true)} // Start playing when thumbnail is clicked
                />
            ) : (
                // Render standard HTML5 video for MP4 files
                <>
                    <video
                        className={`z-20 ${mobileSrc ? "hidden md:block" : ""} relative aspect-video w-full`}
                        width="320"
                        height="245"
                        autoPlay
                        muted
                        loop
                        playsInline
                    >
                        <source src={src} type="video/mp4" />
                    </video>
                    {mobileSrc ? (
                        <video
                            className={`z-20 block md:hidden relative aspect-video w-full`}
                            width="320"
                            height="245"
                            autoPlay
                            muted
                            loop
                            playsInline
                        >
                            <source src={mobileSrc} type="video/mp4" />
                        </video>
                    ) : null}
                </>
            )}

            {!isExternalVideo && thumbnail ? (
                <Image
                    className={`z-10 absolute inset-0 w-full h-full aspect-video object-fill`}
                    priority={true}
                    src={thumbnail.url || ""}
                    width={thumbnail.width || 0}
                    height={thumbnail.height || 0}
                    alt={thumbnail.alt || ""}
                />
            ) : null}
        </div>
    );
};

export default Video;
