import {Page} from "@/app/types/payloadTypes";
import Button, {buttonConfig} from "@/app/components/Button";
import {faChevronCircleRight} from "@awesome.me/kit-2a2dc088e2/icons/classic/thin";

const BreakerBlock = ({block}:{block:{
        heading_1?: {
            text?: string | null;
            highlight?: boolean | null;
        };
        heading_2?: {
            text?: string | null;
            highlight?: boolean | null;
        };
        button?: {
            type?: ('primary' | 'secondary' | 'highlight') | null;
            link?: {
                title?: string | null;
                external?: boolean | null;
                Relation?: {
                    relationTo: 'pages';
                    value: number | Page;
                } | null;
                external_url?: string | null;
            };
        };
        id?: string | null;
        blockName?: string | null;
        blockType: 'Breaker';
    }}) => {

    return <div className="w-full max-w-[calc(1800px)] px-7 mx-auto text-white bg-black p-4 pr-24 mb-14">
        <div className="w-full max-w-screen-2xl tracking-widest ml-auto flex flex-wrap gap-4 text-2xl justify-end">
            {
                block.heading_1 ? <h2 className={`leading-relaxed ${block.heading_1.highlight ? "text-brand-yellow uppercase":""}`}>{block.heading_1.text}</h2> : ""
            }
            {
                block.heading_2 || block.button ? <h3 className={`${block.heading_1 ? "max-w-[56ch]":""} leading-relaxed ${block.heading_2?.highlight ? "text-brand-yellow":""}`}><span className="mr-6">{block.heading_2?.text}</span>
                    {block.button && (block.button.link?.title || block.button.link?.external_url || block.button.link?.Relation)
                        ? <Button isInline icon={faChevronCircleRight} config={buttonConfig[block.button.type||"primary"]} text={block.button.link?.title||""} href={block.button.link?.external ? block.button.link.external_url||"" : (block.button.link?.Relation?.value as Page)?.full_path||""}/>
                        : ""
                    }</h3> : ""
            }
        </div>
    </div>
}

export default BreakerBlock;
