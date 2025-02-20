"use client"
import qs from "qs";
import {faChevronCircleRight} from "@awesome.me/kit-2a2dc088e2/icons/classic/thin";
import {Employment, Media} from "@/app/types/payloadTypes";
import Image from "next/image";
import Button from "@/app/components/Button";
import {useEffect, useState} from "react";
import Skeleton from "react-loading-skeleton";
import {buttonConfig} from "@/app/components/ButtonConfig";

async function getData(query: any, tag: string, page?: string) {
    const stringifiedQuery = qs.stringify(
        {
            where: query,
        },
        {
            addQueryPrefix: true
        }
    );

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_PAYLOAD_SERVER_URL}/api/employment/${stringifiedQuery}&depth=2&limit=50&sort=title`,
        {
            next: {
                tags: [tag]
            }
        }
    );

    if (res.status !== 200) return null;

    return res.json();
}

const EmploymentBlock = ({block}: {
    block: {
        company: 'crazy-horse' | 'korczak';
        positionType: 'year-round' | 'seasonal';
        id?: string | null;
        blockName?: string | null;
        blockType: 'EmploymentBlock';
    }
}) => {
    const [collectionItems, setEmploymentItems] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        async function getAllCollections() {
            if (!block.company || !block.positionType) {
                setIsLoading(false);
                return null;
            }

            /*const allRes = await Promise.all(block.collectionsToPull?.map(async slug => {
                return await getData({}, slug + "_", slug, "1");
            }))
            console.log(allRes);

            const items = allRes.flatMap(item => item.docs.map((x: any) => {
                return {...x, collectionSlug: item.collectionSlug}
            })).sort((a, b) => Date.parse(b.updatedAt) < Date.parse(a.updatedAt) ? 1 : 0);*/
            const res = await getData({
                and: [
                    {
                        company: {
                            equals: block.company,
                        }
                    },
                    {
                        positionType: {
                            equals: block.positionType,
                        }
                    }

                ],

            }, "employment_");
            
            setEmploymentItems(
                res.docs
            )
            setIsLoading(false);

            /*setEmploymentItems(items.slice(0, block.numberOfItemsToShow || 3));*/
        }

        getAllCollections();

    }, [block.company, block.positionType]);
    const skeletonArr: any[] = [];
    const numberOfItemsToShow = 3;
    for (let i = 0; i < numberOfItemsToShow; i++) {
        skeletonArr.push(i);
    }


    if (isLoading) return <div className="w-full max-w-screen-md mx-auto my-16">
            {
                skeletonArr.map(x => {
                    return <div className="w-full relative overflow-hidden"
                                key={x}>
                            <Skeleton
                                height={25}
                            />
                    </div>
                })
            }
        </div>

    if (!collectionItems || collectionItems.length === 0) return null;

    return <div className="w-full max-w-screen-md mx-auto my-16 p-2">
        <h2 className="font-ptserif font-bold text-3xl my-4">{block.positionType.split("-").map(x => x.charAt(0).toUpperCase() + x.slice(1)).join("-")} Positions
            at {block.company === "crazy-horse" ? "Crazy Horse Memorial®" : "Korczak's Heritage"}</h2>
        {collectionItems.map((position: Employment) => {
            return <div key={position.id} className="flex flex-wrap border border-slate-400 border-l-transparent border-r-transparent py-2">
                {
                    position.featuredImage && typeof position.featuredImage !== "number" ? <div className="w-3/12 mr-2">
                        <Image className="w-full" src={position.featuredImage.url || ""} alt={position.featuredImage.alt || ""}
                               width={position.featuredImage.width || 0} height={position.featuredImage.height || 0}/>
                    </div> : ""
                }
                <div className="w-8/12 grow flex flex-col min-h-24">
                    <h3 className="text-xl font-bold">{position.title}</h3>
                    {position.description ? <p className="text-slate-600">{position.description}</p> : ""}
                    <div className="ml-auto mt-auto">
                        {
                            !position.linksToOnlineEmploymentForm
                            && <Button isExternal={true} config={buttonConfig.secondary} text="View Job Description" href={(position.PDF as Media).url||""}/>
                        }
                        <Button config={buttonConfig.tertiary} icon={faChevronCircleRight} text="Click Here to Apply" href={"/about/employment/employment-application"}/>
                    </div>
                </div>
            </div>
        })}
    </div>
}

export default EmploymentBlock;
