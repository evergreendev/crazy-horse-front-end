import qs from "qs";
import React from "react";
import getMeta from "@/app/data/getMeta";
import TopBar from "@/app/components/TopBar";
import {Search} from "@/app/types/payloadTypes";
import BreadCrumbs from "@/app/components/BreadCrumbs";
import Footer from "@/app/components/Footer";
import Pagination from "@/app/components/Pagination";
import Link from "next/link";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFile} from "@awesome.me/kit-2a2dc088e2/icons/classic/thin";
import SearchWithRedirect from "@/app/components/Search/SearchWithRedirect";

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
        `${process.env.NEXT_PUBLIC_PAYLOAD_SERVER_URL}/api/search/${stringifiedQuery}&depth=1&page=${page}`,
        {
            next: {
                tags: [tag]
            }
        }
    );

    //if (res.status !== 200) notFound();

    return res.json();
}

export default async function SearchPage({searchParams}: {
    searchParams?: { search?: string; page?: string }
}) {

    const search = searchParams?.search;
    const page = searchParams?.page || "1";
    const meta = await getMeta();
    if (!search) {
        return <main className="flex min-h-screen flex-col items-center w-full">
            <div className="px-24 py-7 flex flex-col items-center w-full">
                <TopBar siteOption={meta.siteOptions} nav={meta.nav}/>
            </div>
            <div className="px-24 py-7 flex flex-col items-center w-full">
                <div className="flex max-w-[calc(1800px-3.5rem)] w-full justify-between">
                    {
                        <BreadCrumbs fullPath={"search"}/>
                    }
                </div>
            </div>
            <div className="w-full pt-16 bg-slate-50">
                <h1 className="max-w-screen-md mb-6 mx-auto text-4xl font-ptserif underline underline-offset-8 decoration-brand-yellow decoration-4">Search</h1>
                <div className="max-w-screen-sm mx-auto flex-col">
                    <SearchWithRedirect/>
                </div>

            </div>
            <Footer footer={meta.footer}/>
        </main>
    }

    const data = await getData({
        or: [
            // array of OR conditions
            {
                title: {
                    like: search,
                },
            },
            {
                searchKeywords: {
                    like: search,
                }
            }
        ]
    }, "search_", page);

    return <main className="flex min-h-screen flex-col items-center w-full">
        <div className="px-24 py-7 flex flex-col items-center w-full">
            <TopBar siteOption={meta.siteOptions} nav={meta.nav}/>
        </div>
        <div className="px-24 py-7 flex flex-col items-center w-full">
            <div className="flex max-w-[calc(1800px-3.5rem)] w-full justify-between">
                {
                    <BreadCrumbs fullPath={"search"}/>
                }
            </div>
        </div>
        <div className="w-full pt-16 bg-slate-50">
            <h1 className="max-w-screen-md mb-6 mx-auto text-4xl font-ptserif underline underline-offset-8 decoration-brand-yellow decoration-4">Results</h1>
            <div className="max-w-screen-sm mx-auto flex-col">
                {data.docs && data.docs.map((doc: Search) => {
                    return <Link className="w-full text-xl bg-slate-100 hover:bg-slate-200 p-2 my-2 flex flex-wrap"
                                 key={doc.id} href={`/id-redirect-to-slug/${doc.doc.relationTo}/${doc.doc.value}`}>
                        <FontAwesomeIcon className="text-slate-900 mr-2" size="lg" icon={faFile}/>
                        <p>{doc.title}</p>
                    </Link>
                })}
                <Pagination totalPages={data.totalPages}/>
            </div>

        </div>
        <Footer footer={meta.footer}/>
    </main>
}