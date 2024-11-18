"use client"
import {Media} from "@/app/types/payloadTypes";
import Image from "next/image";
import 'photoswipe/dist/photoswipe.css'

import {Gallery, Item} from 'react-photoswipe-gallery'

export const GalleryBlock = ({block}: {
    block: {
        items?:
            | {
            image: Media|undefined;
            caption?: string | null;
            id?: string | null;
        }[]
            | null;
        id?: string | null;
        blockName?: string | null;
        blockType: 'gallery';
    }
}) => {
    if (!block.items) return;
    return <Gallery withCaption  id={block.id||"0"}>
        <div className="flex flex-wrap gap-3">
            {block.items.map(item => {
                return <Item caption={`<h2 class="text-4xl font-ptserif">${item.caption||""}</h2>`||undefined} key={item.id} original={item?.image?.url || ""}
                             thumbnail={item?.image?.sizes?.thumbnail?.url || ""}
                             height={item?.image?.height || 0}
                             width={item?.image?.width || 0}>
                    {({ref, open}) => (
                        <div className="grow flex md:max-w-[49%] lg:max-w-[24%]" onClick={open}><Image className="grow" ref={ref} key={item.id} src={item?.image?.sizes?.thumbnail?.url || ""}
                               alt={item?.image?.alt || ""}
                               height={item?.image?.sizes?.thumbnail?.height || 0}
                                    width={item?.image?.sizes?.thumbnail?.width || 0}/></div>
                    )}
                </Item>
            })}
        </div>

    </Gallery>
}
