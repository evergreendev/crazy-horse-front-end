"use client"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass} from "@awesome.me/kit-2a2dc088e2/icons/classic/regular";
import React, {useEffect, useRef} from "react";
import qs from "qs";
import {useRouter} from "next/navigation";
import {useDebounce} from "use-debounce";
import {Search} from "@/app/types/payloadTypes";
import Link from "next/link";

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
        `${process.env.NEXT_PUBLIC_PAYLOAD_SERVER_URL}/api/search/${stringifiedQuery}&limit=5`,
        {
            next: {
                tags: [tag]
            }
        }
    );

    return res.json();
}

const SearchBar = () => {
    const resultRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const [value, setValue] = React.useState("");
    const [debouncedValue, setDebouncedValue] = useDebounce(value, 700);
    const [searchQuery, setSearchQuery] = React.useState<any>(null);
    const [results, setResults] = React.useState<Search[]>([]);
    const [totalResults, setTotalResults] = React.useState(0);
    const [hasMoreResults, setHasMoreResults] = React.useState(false);
    const [displayResults, setDisplayResults] = React.useState<boolean>(false);
    const router = useRouter();

    useEffect(() => {
        setSearchQuery({
            or: [
                // array of OR conditions
                {
                    title: {
                        like: debouncedValue,
                    },
                },
                {
                    searchKeywords: {
                        like: debouncedValue,
                    }
                }
            ]
        })

    }, [debouncedValue]);
    useEffect(() => {
        async function getResults() {
            if(debouncedValue === "") {
                setResults([]);
                setTotalResults(0);
                setHasMoreResults(false);
                setDisplayResults(false);
                return;
            }
            const res = await getData(searchQuery, "search_");
            setTotalResults(res.totalDocs);
            setHasMoreResults(res.hasNextPage);
            setResults(res.docs);
            setDisplayResults(true);
        }

        getResults();

    }, [debouncedValue, searchQuery]);

    useEffect(() => {
        const handleOutSideClick = (event: any) => {
            if (!resultRef.current?.contains(event.target)) {
                setDisplayResults(false);
            }
        };

        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setDisplayResults(false);
            }
        }

        window.addEventListener("keydown", handleEscape);
        window.addEventListener("mousedown", handleOutSideClick);

        return () => {
            window.removeEventListener("mousedown", handleOutSideClick);
        };
    }, [resultRef]);

    return <form onSubmit={(e) => {
        e.preventDefault();
        if (value) {
            router.push(`/search?search=${value}`);
        }
    }} className="z-30 flex text-gray-500 items-center text-xl mt-auto ml-2.5 relative">
        <FontAwesomeIcon className="size-5 mr-2" icon={faMagnifyingGlass} size="sm"/>
        <input ref={inputRef} value={value} onChange={(e) => setValue(e.target.value)} placeholder="Search"/>
        {
            displayResults
            && <div ref={resultRef}
                    className="absolute bottom-0 translate-y-full bg-white left-0 right-0 z-20 shadow border">
                {
                    results.length > 0
                        ? <>
                            {results.map(result => {
                                if (!result) return;
                            return <Link className="block p-2 hover:bg-gray-200" href={`/id-redirect-to-slug/${result.doc?.relationTo}/${result.doc?.value}`} key={result.id}>{result.title}</Link>
                        })}
                            {
                                hasMoreResults && <Link className="block p-2 hover:bg-gray-200" href={`/search?search=${debouncedValue}`}>View all {totalResults} results</Link>
                            }
                        </>

                        : <div>No results found</div>
                }
            </div>
        }
    </form>
}

export default SearchBar;
