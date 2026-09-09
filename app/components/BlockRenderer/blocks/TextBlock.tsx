import {Page} from "@/app/types/payloadTypes";
import Link from "next/link";
import React from "react";
import renderText from "@/app/components/BlockRenderer/utils/renderText";
import {getSlugFromCollection} from "@/app/components/BlockRenderer/blocks/blockHelpers";

const TextBlock = ({block}: {
    block: {
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
            text_html?: string | null;
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
}) => {
    return <div className="p-6">
        <div className="mb-6">
            {
                block.heading_1 ?
                    <div className="flex justify-start xl:justify-center"><h2
                        className="mb-2 xl:text-center text-2xl text-left xl:text-4xl font-bold font-ptserif underline underline-offset-8 decoration-brand-yellow decoration-4">{block.heading_1}</h2>
                    </div> : ""
            }
            {
                block.heading_2 ?
                    <h2 className="xl:text-center text-left font-ptserif text-xl font-normal xl:text-3xl mx-auto max-w-full">{block.heading_2}</h2> : ""
            }
            {
                block.heading_link
                    ? block?.heading_link?.external
                        ? <div
                            className="text-xl text-center font-ptserif italic">{block.heading_link?.label ? block.heading_link?.title + " " : ""}
                            {
                                block.heading_link?.external_url ? <a
                                        className="font-ptserif underline"
                                        href={block.heading_link?.external_url || ""}>{block.heading_link?.label ? block.heading_link?.label : block.heading_link?.title}</a>
                                    : ""
                            }
                        </div>
                        : <div
                            className="text-xl text-center font-ptserif italic">{block.heading_link?.label ? block.heading_link?.title + " " : ""}
                            {
                                block.heading_link?.Relation?.value ? <Link
                                    className="font-ptserif underline"
                                    href={getSlugFromCollection((block.heading_link as any)?.Relation?.value || "", (block.heading_link as any)?.Relation?.relationTo || "pages")}>{block.heading_link?.label ? block.heading_link?.label : block.heading_link?.title}</Link> : ""
                            }

                        </div>
                    : ""
            }
        </div>
        {
            renderText(block.body?.text?.root, 1, block.id || "0")
        }
        {
            block.body?.link_list?.map(item => {
                return item.external
                    ? <div
                        className="text-lg font-semibold text-center font-opensans italic">{item.label ? item.title + " " : ""}<a
                        className="font-opensans underline"
                        href={item.external_url || ""}>{item.label ? item.label : item.title}</a></div>
                    : <div
                        className="text-lg font-semibold text-center font-opensans italic">{item.label ? item.title + " " : ""}<Link
                        className="font-opensans underline"
                        href={getSlugFromCollection((item as any)?.Relation?.value || "", (item as any)?.Relation?.relationTo || "pages")}>{item.label ? item.label : item.title}</Link>
                    </div>
            })
        }
    </div>
}

export default TextBlock;
