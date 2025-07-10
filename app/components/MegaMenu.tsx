"use client"
import {faBars} from "@awesome.me/kit-2a2dc088e2/icons/classic/solid";
import {faChevronRight, faChevronDown} from "@awesome.me/kit-2a2dc088e2/icons/classic/light";
import {faCircleX} from "@awesome.me/kit-2a2dc088e2/icons/classic/regular";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {createRef, ForwardedRef, forwardRef, RefObject, useCallback, useEffect, useRef, useState} from "react";
import {Navigation, Page} from "@/app/types/payloadTypes";
import Link from "next/link";
import BlockRenderer from "@/app/components/BlockRenderer";
import getUrlFromPageOrExternal from "@/app/utilities/getUrlFromPageOrExternal";
import {getSlugFromCollection} from "@/app/components/BlockRenderer/blocks/blockHelpers";

function useOutsideAlerter(ref: RefObject<HTMLDivElement>, action: (...args: any) => void) {
    useEffect(() => {
        function handleClickOutside(event: any) {
            if (ref.current && !ref.current.contains(event.target)) {
                action();
            }
        }

        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref, action]);
}

const ExpandableButton = forwardRef(function ExpandableButton({
                                                                  id,
                                                                  text,
                                                                  item,
                                                                  setActiveMenuId,
                                                                  tabIndex,
                                                                  isExpanded,
                                                                  firstFocusable,
                                                                  isMobile
                                                              }: {
    id: string,
    text: string,
    item: any,
    setActiveMenuId: (id: string | null) => void,
    tabIndex: number,
    isExpanded: boolean,
    firstFocusable: RefObject<any>,
    isMobile?: boolean
}, ref: ForwardedRef<any>) {
    const linkInfo = getUrlFromPageOrExternal(item);

    const ExpandButton = () => {
        return <button
            aria-label={`Expand ${text} menu`}
            className={`p-3 ${isMobile ? "w-14" : ""} hover:bg-gray-800 hover:text-white focus:bg-gray-700 text-xl`}
            tabIndex={tabIndex}

            onClick={(e) => {
                e.preventDefault();
                setActiveMenuId(isExpanded ? null : id);
            }}>
            {
                isExpanded
                    ? <FontAwesomeIcon size="sm" icon={faChevronDown}/>
                    : <FontAwesomeIcon icon={faChevronRight}/>
            }
        </button>
    }

    return linkInfo.isExternal
        ? <a onMouseEnter={() => {
            if(isMobile) return;
            setActiveMenuId(isExpanded ? null : id);
        }}
             className={`bg-gray-900 ${isMobile ? "w-full": ""} flex border-l border-l-slate-800 border-t-4 border-transparent group text-white ${isExpanded ? "border-t-brand-yellow" : ""}`}
             ref={ref} tabIndex={tabIndex} href={linkInfo.url}>
            <span
                className={`${isMobile ? "w-full" : ""} flex items-center p-4 hover:bg-gray-900 hover:text-white group-focus:bg-gray-700`}>{text}</span>
            <ExpandButton/>
        </a>
        : <Link onMouseEnter={() => {
            if (isMobile) return;
            setActiveMenuId(isExpanded ? null : id);
        }}
                className={`bg-gray-900 ${isMobile ? "w-full": ""} flex border-l border-l-slate-800 border-t-4 border-transparent group text-white ${isExpanded ? "border-t-brand-yellow" : ""}`}
                ref={ref} tabIndex={tabIndex} key={id} href={linkInfo.url}>
            <span
                className={`${isMobile ? "w-full" : ""} flex items-center p-4 hover:bg-gray-900 hover:text-white group-focus:bg-gray-700`}>{text}</span>
            <ExpandButton/>
        </Link>
})

const MegaMenu = ({nav}: { nav: Navigation }) => {
    const [isExpanded, setIsExpanded] = useState<boolean>(false);
    const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
    const firstFocusableElements = useRef<any>(
        Object.fromEntries(nav.items.map(item => {
            return [item.id, createRef()];
        }))
    );

    const escFunction = useCallback((event: { key: string; }) => {
        if (event.key === "Escape") {
            setIsExpanded(false);
            setActiveMenuId(null);
        }
    }, []);

    useEffect(() => {
        document.addEventListener("keydown", escFunction, false);

        return () => {
            document.removeEventListener("keydown", escFunction, false);
        };
    }, [escFunction]);

    const menuRef = useRef<HTMLDivElement>(null);
    const firstFocusableElementRef = useRef<any>(null);

    useOutsideAlerter(menuRef, () => {
        setIsExpanded(false)
    });

    const widths = {
        "1/3": "md:w-4/12",
        "2/3": "md:w-8/12",
        "1/4": "md:w-3/12",
        "1/2": "md:w-6/12",
        "3/4": "md:w-9/12",
        "1/1": "md:w-full"
    }

    return <div className="relative" ref={menuRef}>
        <div
            aria-hidden={!isExpanded}
            className={`
             ${isExpanded ? '' : '-translate-y-full'}
             top-0 left-1/2
             -translate-x-1/2
             fixed
             flex-wrap
             w-full
             items-start
             overflow-hidden
             font-opensans
             justify-between
             p-0
             pt-0
             duration-700 
             z-40 transition-all hidden lg:flex`}>
            <div className="flex w-full bg-slate-900 shadow justify-center items-center">
                {
                    nav.items.map((item, index) => {
                        return <div className="flex" key={item.id}>
                            {
                                item.columns?.length === 0 ? <>
                                    {item.external
                                        ?
                                        <a ref={index === 1 ? firstFocusableElementRef : undefined} className={`bg-gray-900 flex border-l border-l-slate-800 border-t-4 border-transparent group text-white hover:border-t-brand-yellow`}
                                           href={item.external_url || ""}>
                                    <span
                                        className="flex items-center p-4 hover:bg-gray-900 hover:text-white group-focus:bg-gray-700">{item.title || (item.Relation?.value as Page)?.title}</span>
                                        </a>
                                        : <Link
                                            ref={index === 1 ? firstFocusableElementRef : undefined}
                                            className={`bg-gray-900 flex border-l border-l-slate-800 border-t-4 border-transparent group text-white hover:border-t-brand-yellow`}
                                            href={getSlugFromCollection((item.Relation?.value as Page), item.Relation?.relationTo || "page")}>
                                    <span
                                        className="flex items-center p-4 hover:bg-gray-900 hover:text-white group-focus:bg-gray-700">{item.title || (item.Relation?.value as Page)?.title}</span>
                                        </Link>}
                                </> : <>
                                    <ExpandableButton isExpanded={activeMenuId === item.id}
                                                      firstFocusable={firstFocusableElements.current[item.id || ""]}
                                                      ref={index === 0 ? firstFocusableElementRef : null}
                                                      tabIndex={isExpanded ? 0 : -1} item={item}
                                                      setActiveMenuId={() => {
                                                          setActiveMenuId(item.id || null)
                                                      }} id={item.id || ""}
                                                      text={item.title || (item.Relation?.value as Page)?.title}/>
                                </>
                            }
                        </div>
                    })
                }
                <button onClick={() => {
                    setActiveMenuId(null)
                    setIsExpanded(false)
                }} className="text-white z-50 right-0 top-0 p-2 bg-slate-700 hover:bg-slate-800">Close Menu
                </button>
            </div>
            <div className="relative w-full mx-auto max-w-[2000px] h-full overflow-hidden p-0">
                {
                    nav.items.map(item => {
                        return <div key={item.id}
                                    onMouseLeave={() => setActiveMenuId(null)}
                                    className={`bg-gray-200 flex-wrap w-full overflow-hidden top-0 left-0 ${item.id === activeMenuId ? "max-h-screen z-10" : "duration-0 max-h-0"}`}>
                            <div className="p-0 flex flex-wrap justify-center">
                                <div className="flex w-full justify-around bg-gray-300 p-2">
                                    <h2 className="border-b-4 border-b-brand-yellow text-center justify-self-center font-ptserif text-2xl font-bold text-gray-950">{item.title}</h2>
                                </div>
                                <div className="flex flex-wrap w-full p-2 justify-center">
                                    {item.columns?.map((column, index) => {
                                        return <div key={column.id}
                                                    className={`flex flex-col ${widths[column.width || "1/4"]}`}>
                                            <BlockRenderer
                                                ref={index === 0 ? firstFocusableElements.current[item.id || ""] : null}
                                                tabIndex={item.id === activeMenuId && isExpanded ? 0 : -1}
                                                key={column.id}
                                                blocks={column.content}/>
                                        </div>
                                    })}
                                </div>
                            </div>
                        </div>
                    })
                }
            </div>
        </div>
        <div
            aria-hidden={!isExpanded}
            className={`
             ${isExpanded ? '' : '-translate-y-full'}
             top-0 left-1/2
             -translate-x-1/2
             fixed
             flex-wrap
             w-full
             items-start
             overflow-hidden
             font-opensans
             justify-between
             p-0
             pt-0
             duration-700 
             z-40 transition-all lg:hidden flex`}>
            <div className="flex flex-col w-full bg-slate-900 shadow justify-center">
                {
                    nav.items.map((item, index) => {
                        return <div className="flex items-stretch" key={item.id}>
                            {
                                item.columns?.length === 0 ? <>
                                    {item.external
                                        ?
                                        <a className={`bg-gray-900 w-full flex border-l border-l-slate-800 border-t-4 border-transparent group text-white hover:border-t-brand-yellow`}
                                           href={item.external_url || ""}>
                                    <span
                                        className="flex w-full items-center p-4 hover:bg-gray-900 hover:text-white group-focus:bg-gray-700">{item.title || (item.Relation?.value as Page)?.title}</span>
                                        </a>
                                        : <Link
                                            className={`bg-gray-900 w-full flex border-l border-l-slate-800 border-t-4 border-transparent group text-white hover:border-t-brand-yellow`}
                                            href={getSlugFromCollection((item.Relation?.value as Page), item.Relation?.relationTo || "page")}>
                                    <span
                                        className="flex w-full items-center p-4 hover:bg-gray-900 hover:text-white group-focus:bg-gray-700">{item.title || (item.Relation?.value as Page)?.title}</span>
                                        </Link>}
                                </> : <>
                                    <ExpandableButton isMobile isExpanded={activeMenuId === item.id}
                                                      firstFocusable={firstFocusableElements.current[item.id || ""]}
                                                      ref={index === 0 ? firstFocusableElementRef : null}
                                                      tabIndex={isExpanded ? 0 : -1} item={item}
                                                      setActiveMenuId={() => {
                                                          setActiveMenuId(item.id || null)
                                                      }} id={item.id || ""}
                                                      text={item.title || (item.Relation?.value as Page)?.title}/>
                                </>
                            }
                        </div>
                    })
                }
                <button onClick={() => {
                    setActiveMenuId(null)
                    setIsExpanded(false)
                }} className="text-white z-50 right-0 top-0 p-2 bg-slate-700 hover:bg-slate-800">Close Menu
                </button>
            </div>
            <div className="w-full mx-auto max-w-[2000px] h-screen overflow-hidden p-0">
                {
                    nav.items.map(item => {
                        return <div key={item.id}
                                    className={`bg-gray-200 absolute z-50 w-full overflow-hidden top-0 left-0 bottom-0 right-0 transition-all ${item.id === activeMenuId ? "z-10" : "-translate-x-full"}`}>
                            <button className="absolute p-4 right-0 text-slate-800"
                                    onClick={() => setActiveMenuId(null)}><FontAwesomeIcon size="2x" icon={faCircleX}/>
                            </button>
                            <div className="p-0 flex flex-wrap flex-col">
                                <div className="flex flex-col w-full justify-around bg-gray-300">
                                    <h2 className="border-b-4 border-b-brand-yellow text-center justify-self-center font-ptserif text-2xl font-bold text-gray-950">{item.title}</h2>
                                </div>
                                <div className="flex flex-col flex-wrap w-full p-2">
                                    {item.columns?.map((column, index) => {
                                        return <div key={column.id}
                                                    className={`flex flex-col ${widths[column.width || "1/4"]}`}>
                                            <BlockRenderer
                                                ref={index === 0 ? firstFocusableElements.current[item.id || ""] : null}
                                                tabIndex={item.id === activeMenuId && isExpanded ? 0 : -1}
                                                key={column.id}
                                                blocks={column.content}/>
                                        </div>
                                    })}
                                </div>
                            </div>
                        </div>
                    })
                }
            </div>
        </div>
        <button className="p-2 h-15 flex items-center text-black transition-colors hover:bg-gray-100"
                onClick={() => {
                    setIsExpanded(!isExpanded)
                    setActiveMenuId(null)
                }}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        setIsExpanded(false)
                        setActiveMenuId(null)
                    }
                }}
        >
            <FontAwesomeIcon size="2x" icon={faBars}/>
            <p className="uppercase ml-2 font-opensans">Menu</p>
        </button>
    </div>
}

export default MegaMenu;
