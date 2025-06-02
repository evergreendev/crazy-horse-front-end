"use client";

import {useEffect, useState} from "react";
import {MuseumCollection, Page, PressRelease} from "@/app/types/payloadTypes";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'
import {getImage, getSlugFromCollection} from "@/app/components/BlockRenderer/blocks/blockHelpers";
import Pagination from "@/app/components/Pagination";
import {useSearchParams} from "next/navigation";

const CollectionListClient = ({
    initialData,
    block,
    totalPages: initialTotalPages
}: {
    initialData: any[];
    block: {
        perPage?: number | null;
        collectionsToPull:
            | 'pages'
            | 'museumCollections'
            | 'impact'
            | 'passions'
            | 'studentSpotlight'
            | 'support'
            | 'event'
            | 'news'
            | 'pressReleases';
        id?: string | null;
        blockName?: string | null;
        blockType: 'collectionList';
        isMinimal: boolean
    };
    totalPages: number;
}) => {
    const [collectionItems, setCollectionItems] = useState<any>(initialData);
    const [totalPages, setTotalPages] = useState(initialTotalPages);
    const [isLoading, setIsLoading] = useState(false);
    const searchParams = useSearchParams();

    const currentPage = searchParams.get("page") || "1";

    useEffect(() => {
        async function getAllCollections() {
            if (!block.collectionsToPull) {
                return null;
            }

            setIsLoading(true);

            try {
                const response = await fetch(
                    `/api/collections?collectionsToPull=${block.collectionsToPull}&page=${currentPage}&perPage=${block.perPage || 3}`
                );
                
                if (!response.ok) {
                    throw new Error('Failed to fetch collection data');
                }
                
                const data = await response.json();
                
                setTotalPages(data.totalPages);
                setCollectionItems(data.docs);
            } catch (error) {
                console.error('Error fetching collection data:', error);
            } finally {
                setIsLoading(false);
            }
        }

        getAllCollections();
    }, [block.collectionsToPull, block.perPage, currentPage]);

    const skeletonArr: any[] = [];
    const numberOfItemsToShow = block.perPage || 3;
    const monthArr = ["January","February","March","April","May","June","July",
        "August","September","October","November","December"];
    for (let i = 0; i < numberOfItemsToShow; i++) {
        skeletonArr.push(i);
    }

    if (isLoading) return <div className="max-w-full w-full gap-6 relative flex flex-wrap justify-between mb-14">
        {
            skeletonArr.map(x => {
                return <Skeleton key={x+block.id}
                              className="w-full h-96 bg-gray-100 group sm:w-[30%] relative overflow-hidden"
                              containerClassName="w-full h-40 bg-gray-100 group sm:w-[30%] relative overflow-hidden h-96"/>
            })
        }
    </div>;

    if (!block.collectionsToPull || !collectionItems) return null;

    return (
        <div className="max-w-full w-full gap-6 relative flex flex-wrap justify-between mb-14">
            {
                collectionItems.map((collectionItem: (Page | MuseumCollection | PressRelease)) => {
                    const image = getImage(collectionItem);
                    const dateObj = collectionItem.publishedAt ? new Date(collectionItem.publishedAt) : null;
                    return <Link href={getSlugFromCollection(collectionItem, block.collectionsToPull || "")}
                                 className={`w-full group ${block.isMinimal ? "":"sm:w-[30%] bg-gray-100"} relative overflow-hidden flex flex-col`}
                                 key={collectionItem.id}>
                        {
                            image && !block.isMinimal ? <div className="overflow-hidden"><Image
                                style={{objectPosition: `${image.focalX}% ${image.focalY}%`}}
                                className="aspect-[4/3] group-hover:scale-110 duration-1000 transition-all object-cover object-center"
                                src={image.url || ""}
                                alt={image.alt || ""} width={image.width || 0}
                                height={image.height || 0}/></div> : null
                        }
                        <div className={`${block.isMinimal ? "p-0" : "p-7"} px-3 my-auto`}>
                            <h2
                                className={`${block.isMinimal ? "mb-1":"mb-6 font-bold underline underline-offset-8 decoration-brand-yellow decoration-4"} text-center text-2xl font-ptserif`}>{collectionItem.title}</h2>
                            {
                                dateObj ? <h3 className="italic text-sm text-center mb-6">{monthArr[dateObj.getMonth()]} {dateObj.getDate()}, {dateObj.getFullYear()}</h3> : null
                            }
                            {
                                collectionItem.excerpt ? <p className="text-center">
                                    {collectionItem.excerpt} <span className="underline italic">More</span>
                                </p> : ""
                            }
                        </div>

                    </Link>
                })
            }
            <div className="w-full flex justify-center">
                <Pagination totalPages={totalPages}/>
            </div>
        </div>
    )
}

export default CollectionListClient;
