import {Page} from "@/app/types/payloadTypes";
import Link from "next/link";
import React from "react";
import renderText from "@/app/components/BlockRenderer/utils/renderText";

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
                    <div className="flex justify-center"><h2
                        className="mb-2 text-center text-4xl font-bold font-ptserif underline underline-offset-8 decoration-brand-yellow decoration-4">{block.heading_1}</h2>
                    </div> : ""
            }
            {
                block.heading_2 ?
                    <h2 className="text-center font-ptserif text-2xl mx-auto w-[15em]">{block.heading_2}</h2> : ""
            }
            {
                block.heading_link
                    ? block?.heading_link?.external
                        ? <div
                            className="text-xl text-center font-ptserif italic">{block.heading_link?.label ? block.heading_link?.title + " " : ""}<a
                            className="font-ptserif underline"
                            href={block.heading_link?.external_url || ""}>{block.heading_link?.label ? block.heading_link?.label : block.heading_link?.title}</a></div>
                        : <div className="text-xl text-center font-ptserif italic">{block.heading_link?.label ? block.heading_link?.title + " " : ""}<Link
                            className="font-ptserif underline"
                            href={"/" + (block.heading_link?.Relation?.value as Page)?.full_path}>{block.heading_link?.label ? block.heading_link?.label : block.heading_link?.title}</Link>
                        </div>
                    : ""
            }
        </div>
        {
            renderText(block.body?.text?.root, 1)
        }
        {
            block.body?.link_list?.map(item => {
                return item.external
                    ? <div className="text-xl text-center font-ptserif italic">{item.label ? item.title + " " : ""}<a
                        className="font-ptserif underline"
                        href={item.external_url || ""}>{item.label ? item.label : item.title}</a></div>
                    : <div className="text-xl text-center font-ptserif italic">{item.label ? item.title + " " : ""}<Link
                        className="font-ptserif underline"
                        href={"/" + (item.Relation?.value as Page)?.full_path}>{item.label ? item.label : item.title}</Link>
                    </div>
            })
        }
    </div>
}

export default TextBlock;
