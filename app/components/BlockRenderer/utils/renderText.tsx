import React, {Fragment} from "react";
import Link from "next/link";
import Button from "@/app/components/Button";
import {getSlugFromCollection} from "@/app/components/BlockRenderer/blocks/blockHelpers";
import LeavingSiteLink from "@/app/components/LeavingSiteLink";
import BlockRenderer from "@/app/components/BlockRenderer";

const lexicalFormats = [[""]
,["bold"]
,["italic"]
,["italic",
    "bold"]
,["strike"]
,["strike",
    "bold"]
,["strike",
    "italic"]
,["strike",
    "italic",
    "bold"]
,["underline"]
,["underline",
    "bold"]
,["underline",
    "italic"]
,["underline",
    "italic",
    "bold"]
,["underline",
    "strike"]
,["underline",
    "strike",
    "bold"]
,["underline",
    "strike",
    "italic"]
,["underline",
    "strike",
    "italic",
    "bold"]
,["code"]
,["code",
    "bold"]
,["code",
    "italic"]
,["code",
    "italic",
    "bold"]
,["code",
    "strike"]
,["code",
    "strike",
    "bold"]
,["code",
    "strike",
    "italic"]
,["code",
    "strike",
    "italic",
    "bold"]
,["code",
    "underline"]
,["code",
    "underline",
    "bold"]
,["code",
    "underline",
    "italic"]
,["code",
    "underline",
    "italic",
    "bold"]
,["code",
    "underline",
    "strike"]
,["code",
    "underline",
    "strike",
    "bold"]
,["code",
    "underline",
    "strike",
    "italic"]
,["code",
    "underline",
    "strike",
    "italic",
    "bold"]
,["subscript"]
,["subscript",
    "bold"]
,["subscript",
    "italic"]
,["subscript",
    "italic",
    "bold"]
,["subscript",
    "strike"]
,["subscript",
    "strike",
    "bold"]
,["subscript",
    "strike",
    "italic"]
,["subscript",
    "strike",
    "italic",
    "bold"]
,["subscript",
    "underline"]
,["subscript",
    "underline",
    "bold"]
,["subscript",
    "underline",
    "italic"]
,["subscript",
    "underline",
    "italic",
    "bold"]
,["subscript",
    "underline",
    "strike"]
,["subscript",
    "underline",
    "strike",
    "bold"]
,["subscript",
    "underline",
    "strike",
    "italic"]
,["subscript",
    "underline",
    "strike",
    "italic",
    "bold"]
,["subscript",
    "code"]
,["subscript",
    "code",
    "bold"]
,["subscript",
    "code",
    "italic"]
,["subscript",
    "code",
    "italic",
    "bold"]
,["subscript",
    "code",
    "strike"]
,["subscript",
    "code",
    "strike",
    "bold"]
,["subscript",
    "code",
    "strike",
    "italic"]
,["subscript",
    "code",
    "strike",
    "italic",
    "bold"]
,["subscript",
    "code",
    "underline"]
,["subscript",
    "code",
    "underline",
    "bold"]
,["subscript",
    "code",
    "underline",
    "italic"]
,["subscript",
    "code",
    "underline",
    "italic",
    "bold"]
,["subscript",
    "code",
    "underline",
    "strike"]
,["subscript",
    "code",
    "underline",
    "strike",
    "bold"]
,["subscript",
    "code",
    "underline",
    "strike",
    "italic"]
,["subscript",
    "code",
    "underline",
    "strike",
    "italic",
    "bold"]
,["superscript"]
,["superscript",
    "bold"]
,["superscript",
    "italic"]
,["superscript",
    "italic",
    "bold"]
,["superscript",
    "strike"]
,["superscript",
    "strike",
    "bold"]
,["superscript",
    "strike",
    "italic"]
,["superscript",
    "strike",
    "italic",
    "bold"]
,["superscript",
    "underline"]
,["superscript",
    "underline",
    "bold"]
,["superscript",
    "underline",
    "italic"]
,["superscript",
    "underline",
    "italic",
    "bold"]
,["superscript",
    "underline",
    "strike"]
,["superscript",
    "underline",
    "strike",
    "bold"]
,["superscript",
    "underline",
    "strike",
    "italic"]
,["superscript",
    "underline",
    "strike",
    "italic",
    "bold"]
,["superscript",
    "code"]
,["superscript",
    "code",
    "bold"]
,["superscript",
    "code",
    "italic"]
,["superscript",
    "code",
    "italic",
    "bold"]
,["superscript",
    "code",
    "strike"]
,["superscript",
    "code",
    "strike",
    "bold"]
,["superscript",
    "code",
    "strike",
    "italic"]
,["superscript",
    "code",
    "strike",
    "italic",
    "bold"]
,["superscript",
    "code",
    "underline"]
,["superscript",
    "code",
    "underline",
    "bold"]
,["superscript",
    "code",
    "underline",
    "italic"]
,["superscript",
    "code",
    "underline",
    "italic",
    "bold"]
,["superscript",
    "code",
    "underline",
    "strike"]
,["superscript",
    "code",
    "underline",
    "strike",
    "bold"]
,["superscript",
    "code",
    "underline",
    "strike",
    "italic"]
,["superscript",
    "code",
    "underline",
    "strike",
    "italic",
    "bold"]
,["superscript",
    "subscript"]
,["superscript",
    "subscript",
    "bold"]
,["superscript",
    "subscript",
    "italic"]
,["superscript",
    "subscript",
    "italic",
    "bold"]
,["superscript",
    "subscript",
    "strike"]
,["superscript",
    "subscript",
    "strike",
    "bold"]
,["superscript",
    "subscript",
    "strike",
    "italic"]
,["superscript",
    "subscript",
    "strike",
    "italic",
    "bold"]
,["superscript",
    "subscript",
    "underline"]
,["superscript",
    "subscript",
    "underline",
    "bold"]
,["superscript",
    "subscript",
    "underline",
    "italic"]
,["superscript",
    "subscript",
    "underline",
    "italic",
    "bold"]
,["superscript",
    "subscript",
    "underline",
    "strike"]
,["superscript",
    "subscript",
    "underline",
    "strike",
    "bold"]
,["superscript",
    "subscript",
    "underline",
    "strike",
    "italic"]
,["superscript",
    "subscript",
    "underline",
    "strike",
    "italic",
    "bold"]
,["superscript",
    "subscript",
    "code"]
,["superscript",
    "subscript",
    "code",
    "bold"]
,["superscript",
    "subscript",
    "code",
    "italic"]
,["superscript",
    "subscript",
    "code",
    "italic",
    "bold"]
,["superscript",
    "subscript",
    "code",
    "strike"]
,["superscript",
    "subscript",
    "code",
    "strike",
    "bold"]
,["superscript",
    "subscript",
    "code",
    "strike",
    "italic"]
,["superscript",
    "subscript",
    "code",
    "strike",
    "italic",
    "bold"]
,["superscript",
    "subscript",
    "code",
    "underline"]
,["superscript",
    "subscript",
    "code",
    "underline",
    "bold"]
,["superscript",
    "subscript",
    "code",
    "underline",
    "italic"]
,["superscript",
    "subscript",
    "code",
    "underline",
    "italic",
    "bold"]
,["superscript",
    "subscript",
    "code",
    "underline",
    "strike"]
,["superscript",
    "subscript",
    "code",
    "underline",
    "strike",
    "bold"]
,["superscript",
    "subscript",
    "code",
    "underline",
    "strike",
    "italic"]
,["superscript",
    "subscript",
    "code",
    "underline",
    "strike",
    "italic",
    "bold"]];

const styles = {
    bold: "font-bold",
    italic: "italic",
    strike: "line-through",
    underline: "underline",
    code: "",
    subscript: "",
    superscript: "",
}
const alignment = {
    center: "md:text-center text-left",
    left: "md:text-left text-left",
    right: "md:text-right text-left",
    justify: "md:text-justify text-left",
}

function getStyles(formats: string[]) {
    if (!formats) return "";
    let className = "";

    formats.forEach(format => {
        className += " " + styles[format as keyof {}];
    })

    return className.trim();
}

const FormattedText = ({formats, children}: { formats: string[], children: React.ReactNode }) => {
    const curr = formats?.pop();

    if (curr) {
        switch (curr) {
            case "code":
                return <code><FormattedText formats={formats}>
                    {children}
                </FormattedText> </code>
            case "subscript":
                return <sub className="-z-10"><FormattedText formats={formats}>{children}</FormattedText></sub>
            case "superscript":
                return <sup className="-z-10"><FormattedText formats={formats}>{children}</FormattedText></sup>
            default:
                return <FormattedText formats={formats}>
                    {children}
                </FormattedText>
        }

    }

    if (formats?.length === 0) {
        return <>{children}</>
    }
}

function renderText(root: any, key: number, id:string, styleOverride?: string, linkStyleOverride?: string) {
    if (!root) return;

    const children = root.children?.map((child: any,i:number) => {
        return renderText(child, key + i, id,styleOverride,linkStyleOverride);
    });

    switch (root.type) {
        case "root":
            break;
        case "heading":
            switch (root.tag) {
                case "h1":
                    return <h1 key={key + id}
                               className={`mb-6 text-4xl font-bold underline underline-offset-8 decoration-brand-yellow decoration-4 font-ptserif ${alignment[root.format as keyof {}]}`}>{root.children.map((child: any) => renderText(child, key + 1, id, styleOverride,linkStyleOverride))}</h1>
                case "h2":
                    return <h2 key={key + id}
                               className={`mb-6 text-4xl font-bold underline underline-offset-8 decoration-brand-yellow decoration-4 font-ptserif ${alignment[root.format as keyof {}]}`}>{root.children.map((child: any) => renderText(child, key + 1, id, styleOverride,linkStyleOverride))}</h2>
                case "h3":
                    return <h3 key={key + id}
                               className={`mb-3 text-2xl font-normal font-opensans ${alignment[root.format as keyof {}]}`}>{root.children.map((child: any) => renderText(child, key + 1, id, styleOverride,linkStyleOverride))}</h3>
                case "h4":
                    return <h4 key={key + id}
                               className={`mb-3 text-xl font-bold ${alignment[root.format as keyof {}]}`}>{root.children.map((child: any) => renderText(child, key + 1, id, styleOverride,linkStyleOverride))}</h4>
                case "h5":
                    return <h5 key={key + id}
                               className={`mb-3 text-xl ${alignment[root.format as keyof {}]}`}>{root.children.map((child: any) => renderText(child, key + 1, id, styleOverride,linkStyleOverride))}</h5>
                case "h6":
                    return <h6 key={key + id}
                               className={`mb-2 text-lg ${alignment[root.format as keyof {}]}`}>{root.children.map((child: any) => renderText(child, key + 1, id, styleOverride,linkStyleOverride))}</h6>
                default:
                    return <Fragment key={key + id}></Fragment>
            }
        case "paragraph":
            return root.children?.length > 0 ? <p key={key}
                      className={`${styleOverride||"text-lg xl:text-xl max-w-[43rem] mx-auto font-opensans"}   mx-auto 
                      ${alignment[root.format as keyof {}]||""}
                      
                      `}>{root.children.map((child: any,i:number) => {
                return renderText(child, key + i, id,styleOverride,linkStyleOverride);
            })}</p> : <br key={key + id}/>
        case "text":
            if(!root.format) return <span>{root.text}</span>;
            return <FormattedText key={key + id} formats={lexicalFormats[root.format].concat([])}>
                <span className={getStyles(lexicalFormats[root.format].concat([]))?`${getStyles(lexicalFormats[root.format].concat([]))}`:undefined}>{root.text}</span>
            </FormattedText>
        case "horizontalrule":
            return <hr key={key + id} className="my-3"/>
        case "link":
            return root.fields.linkType === "internal" ?
                <Link download={root.fields.autoDownload} key={key + id} className={`max-w-[43rem] mx-auto underline text-slate-700 ${linkStyleOverride||""} ${alignment[root.format as keyof {}]}`}
                      href={getSlugFromCollection(root.fields.doc.value, root.fields.doc.relationTo)}>{root.children.map((child: any,i:number) => renderText(child, key + i, id, styleOverride,linkStyleOverride))}</Link> :
                <LeavingSiteLink rel={root.fields.newTab ? "noopener noreferrer" : ""} key={key + id} href={root.fields.url} className={`max-w-[43rem] mx-auto underline text-slate-700 ${linkStyleOverride||""} ${alignment[root.format as keyof {}]}`}>
                    {root.children.map((child: any,i:number) => renderText(child, key + i, id, styleOverride,linkStyleOverride))}
                </LeavingSiteLink>
        case "relationship":
            return <Button key={key + id} text={root.value.title} href={"/" + root.value?.full_path}/>
        case "list":
            if (root.tag === "ol") {
                return <ol key={key + id}
                           className={`max-w-[43rem] mx-auto list-decimal list-inside pl-4 ${alignment[root.format as keyof {}]}`}>{root.children.map((child: any, i:number) => renderText(child, key + i, id, styleOverride,linkStyleOverride))}</ol>
            }
            return <ul key={key + id}
                       className={`max-w-[43rem] mx-auto list-disc pl-4 list-inside ${alignment[root.format as keyof {}]}`}>{root.children.map((child: any, i:number) => renderText(child, key + i, id, styleOverride,linkStyleOverride))}</ul>
        case "listitem":
            return <li key={key + id}
                       className={`mb-2 ${alignment[root.format as keyof {}]}`}>{root.children.map((child: any, i:number) => renderText(child, key + i, id, styleOverride,linkStyleOverride))}</li>
        case "quote":
            return <blockquote key={key + id}
                               className={`max-w-[43rem] mx-auto border-l-2 pl-6 py-4 ${alignment[root.format as keyof {}]}`}>{root.children.map((child: any, i:number) => renderText(child, key + i, id, styleOverride,linkStyleOverride))}</blockquote>
        case "block":
            return <BlockRenderer blocks={[root.fields]}/>
        default:
            break;
    }


    return children;
}


export default renderText;
