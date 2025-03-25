'use client';
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {Media} from "@/app/types/payloadTypes";
import Image from "next/image";

const ImageSlider = ({images, headerText, bodyText}: { images: Media[], headerText: string, bodyText: string }) => {

    const sliderSettings = {
        dots: true,
        dotsClass: "dots",
        arrows: false,
        autoplay: true,
        draggable: true,
        speed: 700,
        autoplaySpeed: 6000,
        adaptiveHeight: false,
        slidesToScroll: 1,
        infinite: true,
    }
    if(images.length === 0){
        return <div
            className="w-full bg-pale-1 xl:bg-transparent p-4 xl:p-0 flex flex-col mx-auto max-w-screen-lg xl:mt-6 text-center">
            <div className="flex xl:justify-center xl:mx-auto">
                <h1 className="font-ptserif text-2xl text-left xl:text-4xl font-bold border-b-brand-yellow border-b-4">{headerText}</h1>
            </div>
            <p className="text-lg text-left xl:text-center xl:text-3xl font-normal max-w-full">
                {bodyText}
            </p>
        </div>
    }

    return <div className="sm:max-h-screen max-w-full relative w-full">
        {images.length === 1
            ? <div className="flex w-full bg-pale-2"><Image priority style={{
                maxWidth: `${(images[0].width || 0) * 1.1}px`,
                objectPosition: `${images[0].focalX}% ${images[0].focalY}%`
            }} className="aspect-square sm:aspect-auto max-h-[80vh] w-full object-cover grow mx-auto" src={images[0].url || ""}
                                                            alt={images[0].alt || ""} width={images[0].width || 0}
                                                            height={images[0].height || 0} key={images[0].url}/></div>
            : <Slider  {...sliderSettings}>
                {
                    images.map(img => {
                        return <Image style={{objectPosition: `${img.focalX}% ${img.focalY}%`}} src={img.url || ""}
                                      alt={img.alt || ""} width={img.width || 0}
                                      height={img.height || 0} key={img.url}/>
                    })
                }
            </Slider>}
        <div
            className="w-full bg-pale-1 xl:bg-transparent p-4 xl:p-0 flex flex-col mx-auto xl:mt-6 text-center xl:hidden">
            <div className="flex xl:justify-center xl:mx-auto font-ptserif">
                <h2 className="font-ptserif text-2xl text-left xl:text-4xl font-bold border-b-brand-yellow border-b-4">{headerText}</h2>
            </div>
            <p className="text-lg text-left xl:text-center xl:text-3xl font-normal max-w-full">
                {bodyText}
            </p>
        </div>
        <div className="max-w-top h-4 relative right-0 bottom-0 ml-auto hidden xl:block">
            <div className="absolute bottom-0 left-0 w-full max-w-[68ch] p-8 bg-white text-center font-ptserif">
                <h1 className="text-3xl font-bold underline underline-offset-8 decoration-brand-yellow mb-4 decoration-4">{headerText}</h1>
                <p className="text-2xl font-opensans">
                    {bodyText}
                </p>
            </div>
        </div>
    </div>
}

export default ImageSlider;
