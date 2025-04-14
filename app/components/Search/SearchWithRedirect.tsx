"use client"

import {useRouter} from "next/navigation";
import React, {useRef} from "react";
import {faMagnifyingGlass} from "@awesome.me/kit-2a2dc088e2/icons/classic/regular";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";



const SearchWithRedirect = ({}) => {
    const router = useRouter();
    const searchRef = useRef<HTMLInputElement>(null);

    return <form className="mb-6 flex items-center" onSubmit={(e) => {
        e.preventDefault();
        if (searchRef.current) {
            router.push(`/search?search=${searchRef.current.value}`);
        }
    }}><FontAwesomeIcon className="size-5 mr-2" icon={faMagnifyingGlass} size="sm"/>
        <div
            className="flex flex-col flex-wrap w-full">
            <label className="font-opensans font-normal text-sm hidden"
                   htmlFor="search">Search</label>

            <div className="max-w-full mt-auto">
                <input ref={searchRef} type="text"
                       className="p-2 bg-white w-full"
                       name="search"
                       placeholder="Search"
                       id="search"/>
            </div>
        </div>
        <input className="bg-blue-900 p-8 py-2 text-white" type="submit" value="Submit"/>
    </form>
}

export default SearchWithRedirect;
