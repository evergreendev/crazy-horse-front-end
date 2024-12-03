"use client"
import {Media, Modal, Page} from "@/app/types/payloadTypes";
import React, {useCallback, useEffect, useState} from "react";
import Image from "next/image";
import renderText from "@/app/components/BlockRenderer/utils/renderText";
import Link from "next/link";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@awesome.me/kit-2a2dc088e2/icons/classic/regular";

const ModalComponent = ({modal}: { modal: Modal }) => {
    const [isOpen, setIsOpen] = useState(true);
    const escFunction = useCallback((event: { key: string; }) => {
        if (event.key === "Escape") {
            setIsOpen(false);
        }
    }, []);

    useEffect(() => {
        document.addEventListener("keydown", escFunction, false);

        return () => {
            document.removeEventListener("keydown", escFunction, false);
        };
    }, [escFunction]);
    if (!isOpen) {
        return null;
    }

    const primaryAction = modal.primaryAction?.external ? modal.primaryAction.external_url : modal.primaryAction?.Relation?.value;
    const secondaryAction = modal.secondaryAction?.external ? modal.secondaryAction.external_url : modal.secondaryAction?.Relation?.value;

    return <div>
        <div
            className="bg-white max-h-screen z-50 fixed overflow-x-auto top-4 left-0 sm:top-1/2 lg:top-1/3 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 w-full max-w-screen-md">
            <div className="bg-[#0079bf] text-white p-8">
                <div className="flex flex-wrap justify-around">
                    {
                        modal.headerImages && modal.headerImages.map(image => {
                            const curr = image.image as Media;
                            return <Image src={curr.url || ""} alt={curr.alt || ""} width={curr.width || 0}
                                          height={curr.height || 0} key={image.id}/>;
                        })
                    }
                </div>
            </div>
            <div className="p-12">
                {
                    renderText(modal.bodyText?.root, modal.id, "0")
                }
            </div>
            <div className="flex flex-wrap gap-4 justify-center w-full p-2">
                {
                    typeof secondaryAction === "string" && secondaryAction ?
                        <a className="px-16 py-3 text-xl hover:bg-gray-50"
                           href={secondaryAction as string}>{modal.secondaryAction?.title}</a> :
                        <Link className="px-16 py-3 text-xl hover:bg-gray-50"
                              href={`/${(secondaryAction as Page).full_path}`}>{modal.secondaryAction?.title}</Link>
                }
                {
                    typeof primaryAction === "string" && primaryAction ?
                        <a className="px-16 py-3 bg-brand-yellow hover:bg-brand-yellow/80 font-black uppercase text-xl"
                           href={primaryAction as string}>{modal.primaryAction?.title}</a> :
                        <Link
                            className="px-16 py-3 bg-brand-yellow hover:bg-brand-yellow/80 font-black uppercase text-xl"
                            href={`/${(primaryAction as Page).full_path}`}>{modal.primaryAction?.title}</Link>
                }
            </div>
        </div>
        <button className="fixed right-4 top-4 z-50 bg-white bg-opacity-50 flex items-center justify-center p-4" onClick={() => setIsOpen(false)}>
            <FontAwesomeIcon className="size-5" icon={faXmark}/>
        </button>
        <div onClick={() => setIsOpen(false)} className="inset-0 bg-black bg-opacity-50 z-40 fixed"/>
    </div>
}

export default ModalComponent;
