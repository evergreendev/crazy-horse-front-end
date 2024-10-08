import {Form, Media, Page} from "@/app/types/payloadTypes";
import React, {Fragment} from "react";
import BlockRenderer from "@/app/components/BlockRenderer";
import Link from "next/link";
import {getSlugFromCollection} from "@/app/components/BlockRenderer/blocks/blockHelpers";

const widths = {
    withBorder: {
        "1/3": "md:w-[32.33333%] w-full",
        "2/3": "md:w-[65.66666%] w-full",
        "1/4": "md:w-[24%] w-full",
        "1/2": "md:w-[49%] w-full",
        "3/4": "md:w-[74%] w-full",
        "1/1": "md:w-full w-full"
    },
    noBorder: {
        "1/3": "md:w-[32.33333%] w-full",
        "2/3": "md:w-[65.66666%] w-full",
        "1/4": "md:w-[24%] w-full",
        "1/2": "md:w-[49%] w-full",
        "3/4": "md:w-[74%] w-full",
        "1/1": "md:w-full w-full"
    }
}


const Columns = ({block,altMobileBackground}: {
    block: {
        sectionID?: string | null;
        vertical_separator?: boolean | null;
        fullWidth?: boolean | null;
        narrowRow?: boolean | null;
        wideSpacing?: boolean | null;
        grayBackground?: boolean | null;
        columns?:
            | {
            content?:
                | (
                | {
                media?: number | Media | null;
                thumbnail?: number | Media | null;
                expandImage?: boolean | null;
                id?: string | null;
                blockName?: string | null;
                blockType: 'MediaBlock';
            }
                | {
                heading_1?: string | null;
                heading_2?: string | null;
                heading_link?: {
                    title?: string | null;
                    external?: boolean | null;
                    Relation?: {
                        relationTo: 'pages';
                        value: number | Page;
                    } | null;
                    external_url?: string | null;
                    label?: string | null;
                };
                body?: {
                    text?: {
                        root: {
                            type: string;
                            children: {
                                type: string;
                                version: number;
                                [k: string]: unknown;
                            }[];
                            direction: ('ltr' | 'rtl') | null;
                            format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
                            indent: number;
                            version: number;
                        };
                        [k: string]: unknown;
                    } | null;
                    link_list?:
                        | {
                        title?: string | null;
                        external?: boolean | null;
                        Relation?: {
                            relationTo: 'pages';
                            value: number | Page;
                        } | null;
                        external_url?: string | null;
                        label?: string | null;
                        id?: string | null;
                    }[]
                        | null;
                };
                id?: string | null;
                blockName?: string | null;
                blockType: 'TextBlock';
            }
                | {
                title?: string | null;
                external?: boolean | null;
                Relation?: {
                    relationTo: 'pages';
                    value: number | Page;
                } | null;
                external_url?: string | null;
                buttonStyle?: ('primary' | 'secondary' | 'tertiary' | 'highlight' | 'text') | null;
                hasIcon?: boolean | null;
                id?: string | null;
                blockName?: string | null;
                blockType: 'MenuButton';
            }
                | {
                text?: {
                    root: {
                        type: string;
                        children: {
                            type: string;
                            version: number;
                            [k: string]: unknown;
                        }[];
                        direction: ('ltr' | 'rtl') | null;
                        format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
                        indent: number;
                        version: number;
                    };
                    [k: string]: unknown;
                } | null;
                underlineHighlight?: boolean | null;
                largeText?: boolean | null;
                id?: string | null;
                blockName?: string | null;
                blockType: 'HeaderBlock';
            }
                | {
                media1?: number | Media | null;
                media2?: number | Media | null;
                id?: string | null;
                blockName?: string | null;
                blockType: 'CompareSliderBlock';
            }
                | {
                height?: number | null;
                id?: string | null;
                blockName?: string | null;
                blockType: 'SpacerBlock';
            }
                | {
                form?: (number | null) | Form;
                id?: string | null;
                blockName?: string | null;
                blockType: 'FormBlock';
            }
                )[]
                | null;
            width?: ('1/3' | '2/3' | '1/2' | '1/4' | '3/4' | '1/1') | null;
            center?: boolean | null;
            centerVert?: boolean | null;
            title?: string | null;
            external?: boolean | null;
            Relation?: {
                relationTo: 'pages';
                value: number | Page;
            } | null;
            external_url?: string | null;
            id?: string | null;
        }[]
            | null;
        id?: string | null;
        blockName?: string | null;
        blockType: 'column';
    },
    altMobileBackground?: string
}) => {
    if (!block.columns || !block.columns) return null;

    const currWidth = block.vertical_separator ? widths.withBorder : widths.noBorder;

    return <div id={block.sectionID || ""}
                className={`${altMobileBackground||""} w-full mb-14 flex flex-wrap  ${block.columns.length === 1 ? "justify-around" : "justify-between"}
    ${block.narrowRow && !block.fullWidth ? "max-w-screen-xl mx-auto" : ""}
    ${!block.narrowRow && !block.fullWidth ? "max-w-[1800px] mx-auto" : ""}
    ${block.grayBackground ? "bg-gray-200 px-0 max-w-full" : ""}
    ${block.grayBackground && block.vertical_separator ? "py-7" : ""}
    `}>
        <div className={`w-full flex flex-wrap  ${block.columns.length === 1 ? "justify-around" : "justify-between"}
    ${block.grayBackground ? "max-w-[1800px] mx-auto" : ""}
    `}>
            {block.columns.map((column, index: number) => {
                if (column.Relation && typeof column.Relation.value !== "number") {
                    return <Fragment key={column.id || "0"}><Link
                        className={`${currWidth[column.width || "2/3"]} ${column.center ? "mx-auto flex flex-col items-center" : ""}${column.centerVert ? "my-auto" : ""}`}
                        href={getSlugFromCollection(column.Relation.value, column.Relation.relationTo)}>
                        <BlockRenderer blocks={column.content}/>
                    </Link>
                        {
                            block.vertical_separator && block.columns && index !== block.columns.length - 1
                                ? <div className="w-[2%] flex justify-around self-stretch">
                                    <div className="w-[3px] bg-black"/>
                                </div>
                                : null
                        }
                    </Fragment>;
                }
                if (column.external && column.external_url) {
                    return <Fragment key={column.id || "0"}><a
                        className={`${currWidth[column.width || "2/3"]} ${column.center ? "mx-auto flex flex-col items-center" : ""}${column.centerVert ? "my-auto" : ""}`}
                        href={column.external_url}>
                        <BlockRenderer blocks={column.content}/>
                    </a>
                        {
                            block.vertical_separator && block.columns && index !== block.columns.length - 1
                                ? <div className="w-[2%] flex justify-around self-stretch">
                                    <div className="w-[3px] bg-black"/>
                                </div>
                                : null
                        }
                    </Fragment>;
                }

                return <Fragment key={column.id || "0"}>
                    <div className={`${currWidth[column.width || "2/3"]} ${column.center ? "mx-auto  flex-col items-center flex" : ""} ${column.centerVert ? "my-auto" : ""}`}>
                        <BlockRenderer blocks={column.content}/>
                    </div>
                    {
                        block.vertical_separator && block.columns && index !== block.columns.length - 1
                            ? <div className="w-[2%] flex justify-around self-stretch">
                                <div className="w-[3px] bg-black"/>
                            </div>
                            : null
                    }
                </Fragment>;
            })}
        </div>
    </div>
}

export default Columns;
