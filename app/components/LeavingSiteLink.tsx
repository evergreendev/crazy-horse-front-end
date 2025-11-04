"use client"

import {ReactNode, useEffect, useState} from "react";
import {useRouter} from "next/navigation";

const LeavingSiteLink = ({children, href, rel, className,tabIndex}: {
    children: ReactNode,
    href: string,
    rel?: string,
    className?: string,
    tabIndex?: number,
}) => {
    const countdownAmount = 10;
    const searchParams = new URLSearchParams(href.split('?')[1]);
    const [modalIsShowing, setModalIsShowing] = useState(false);
    const [timeRemaining, setTimeRemaining] = useState(countdownAmount);
    const [isRunning, setIsRunning] = useState(false);
    const router = useRouter();

    function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
        if (searchParams.get("show-leaving-site-message")) {
            e.preventDefault();
            setModalIsShowing(true);
            setIsRunning(true);
        }
    }

    useEffect(() => {
        let intervalId: string | number | NodeJS.Timeout | undefined;

        if (isRunning && timeRemaining > 0) {
            intervalId = setInterval(() => {
                setTimeRemaining((prevTime) => prevTime - 1);
            }, 1200);
        }

        return () => clearInterval(intervalId);
    }, [isRunning, timeRemaining]);

    useEffect(() => {
        if (timeRemaining === 0){
            router.push(href);
        }
    }, [href,router,timeRemaining]);

    return <>
        <div className={`${modalIsShowing ? "flex" : "hidden"} fixed inset-0 w-full sm:w-auto`}>
            <div
                className="w-full text-center flex flex-col z-50 bg-white shadow-md max-w-prose absolute sm:left-1/2 top-1/2 sm:-translate-x-1/2 -translate-y-1/2 aspect-video lg:min-h-96 lg:min-w-96">
                <h2 className="bg-slate-800 text-white sm:text-2xl font-bold p-4">You are exiting the Crazy Horse
                    Memorial<sup>®</sup> website.</h2>
                <div className="p-4 my-auto">
                    <p className="text-center mb-4">Thank you for visiting our site.</p>

                    <p className="mb-4">You will be directed to the following website, in {timeRemaining} seconds:</p>
                    <p className="text-center text-sm sm:text-base mb-4">{href.split("?")[0]}</p>
                    <a tabIndex={tabIndex} className="block underline mb-4" href={href}>Click here to redirect now</a>
                    <button className="bg-blue-900 text-white p-2" onClick={()=> {
                        setIsRunning(false);
                        setTimeRemaining(countdownAmount);
                        setModalIsShowing(false);
                    }}>Cancel</button>
                </div>

            </div>
        </div>
        <a onClick={e => handleClick(e)} href={href} className={className} rel={rel}>
            {children}
        </a>
    </>
}

export default LeavingSiteLink;
