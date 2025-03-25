import MenuButton from "@/app/components/BlockRenderer/blocks/MenuButton";
import MenuWithSubMenu from "@/app/components/BlockRenderer/blocks/MenuWithSubMenu";
import PhotoMenuBlock from "@/app/components/BlockRenderer/blocks/PhotoMenuBlock";
import {ForwardedRef, forwardRef} from "react";
import Columns from "@/app/components/BlockRenderer/blocks/Columns";
import MediaBlock from "@/app/components/BlockRenderer/blocks/MediaBlock";
import TextBlock from "@/app/components/BlockRenderer/blocks/TextBlock";
import BreakerBlock from "@/app/components/BlockRenderer/blocks/BreakerBlock";
import HeaderBlock from "@/app/components/BlockRenderer/blocks/HeaderBlock";
import CompareSliderBlock from "@/app/components/BlockRenderer/blocks/CompareSliderBlock";
import FormBlock from "@/app/components/BlockRenderer/blocks/FormBlock";
import EmploymentBlock from "@/app/components/BlockRenderer/blocks/EmploymentBlock";
import CollectionCardsBlock from "@/app/components/BlockRenderer/blocks/CollectionCardsBlock";
import SingleCollectionBlock from "@/app/components/BlockRenderer/blocks/SingleCollectionBlock";
import SpacerBlock from "@/app/components/BlockRenderer/blocks/SpacerBlock";
import {GalleryBlock} from "@/app/components/BlockRenderer/blocks/GalleryBlock";
import TimeLine from "@/app/components/BlockRenderer/blocks/TimeLine";
import ImageCard from "@/app/components/BlockRenderer/blocks/ImageCard";
import {CalendarBlock} from "@/app/components/BlockRenderer/blocks/CalendarBlock";
import HoursBlock from "./blocks/HoursBlock";
import AdmissionBlock from "@/app/components/BlockRenderer/blocks/AdmissionBlock";
import CollectionList from "@/app/components/BlockRenderer/blocks/CollectionList";
import WebcamBlock from "@/app/components/BlockRenderer/blocks/WebcamBlock";
import IFrameBlock from "@/app/components/BlockRenderer/blocks/IFrameBlock";
import BookNowButton from "@/app/components/BlockRenderer/blocks/BookNowButton";

const BlockRenderer = forwardRef(function BlockRenderer({blocks, tabIndex}: {
    blocks: any,
    tabIndex?: number
}, ref: ForwardedRef<any>) {
    return <>{
        blocks.map((block: any, index: number) => {
            let typedBlock = block as { blockType: string };
            switch (typedBlock.blockType) {
                case "MenuButton":
                    return <MenuButton tabIndex={tabIndex}
                                       block={block}/>
                case "MenuWithSubMenu":
                    return <MenuWithSubMenu tabIndex={tabIndex} block={block}
                                            key={(block).id}/>
                case "photoMenu":
                    return <PhotoMenuBlock tabIndex={tabIndex} block={block}
                                           key={(block).id}/>
                case "SimpleMenu":
                    return <div key={(block).id}
                                className="bg-red-100 text-red-800 text-center w-96 mx-auto p-8">Unknown</div>
                case "Breaker":
                    return <BreakerBlock block={block} key={(block).id}/>
                case "collectionCards":
                    return <CollectionCardsBlock key={(block).id} block={block}/>
                case "MediaBlock":
                    return <MediaBlock block={block} key={(block).id}/>
                case "TextBlock":
                    return <TextBlock block={block} key={(block).id}/>
                case "column":
                    return <Columns block={block} key={(block).id}
                                    altMobileBackground={(block).grayBackground ? "" : index % 2 === 0 ? "bg-pale-1 md:bg-transparent" : "bg-pale-2 md:bg-transparent"}/>
                case "HeaderBlock":
                    return <HeaderBlock key={(block).id} block={block}/>
                case "CompareSliderBlock":
                    return <CompareSliderBlock block={block} key={(block).id}/>
                case "FormBlock":
                    return <FormBlock key={(block).id} block={block}/>
                case "EmploymentBlock":
                    return <EmploymentBlock key={(block).id} block={block}/>
                case "singleCollectionBlock":
                    return <SingleCollectionBlock block={block} key={(block).id}/>
                case "SpacerBlock":
                    return <SpacerBlock block={block} key={(block).id}/>
                case "gallery":
                    return <GalleryBlock block={block} key={(block).id}/>
                case "timeline":
                    return <TimeLine block={block} key={(block).id}/>
                case "ImageCard":
                    return <ImageCard block={block} key={(block).id}/>
                case "CalendarBlock":
                    return <CalendarBlock block={block} key={(block).id}/>
                case "HoursBlock":
                    return <HoursBlock block={block} key={block.id} />
                case "AdmissionBlock":
                    return <AdmissionBlock block={block} key={block.id}/>
                case "collectionList":
                    return <CollectionList block={block} key={block.id}/>
                case "WebcamBlock":
                    return <WebcamBlock key={block.id}/>
                case "BookNowButton":
                    return <BookNowButton key={block.id}/>
                case "IFrame":
                    return <IFrameBlock block={block} key={block.id}/>
                default:
                    return <div key={(block).id}
                                className="bg-red-100 text-red-800 text-center w-96 mx-auto p-8">Unknown Block
                        Type</div>
            }
        })
    }</>
})

export default BlockRenderer;
