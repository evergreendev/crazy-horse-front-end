"use client"

import React, {ReactNode, useCallback, useEffect, useState} from "react";
import {Calendar} from "@/app/types/payloadTypes";
import Link from "next/link";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

async function getCalendarData(): Promise<Calendar> {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_PAYLOAD_SERVER_URL}/api/globals/calendar?locale=undefined&draft=false&depth=1`,
        {
            next: {
                tags: ["siteOptions_"]
            }
        });
    return await res.json();
}

const firstDayOfWeek = (date = new Date()) =>
    new Date(date.getFullYear(), date.getMonth(), 1).getDay();

const lastDayOfWeek = (date = new Date()) =>
    new Date(date.getFullYear(), date.getMonth() + 1, 0).getDay();

function getDaysInMonth(month: number, year: number): number {
    if (month > 11) {
        month = 0;
        year = year + 1;
    }
    if (month < 0) {
        month = 11;
        year = year - 1;
    }
    const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    return month === 1 && year % 4 === 0 ? 29 : daysInMonth[month];
}

// @ts-ignore
function hasEventToday(calendarItem: Calendar["calendarItems"][0], currDate: Date): boolean {

    if (!calendarItem || !calendarItem.dates) return false;

    return calendarItem.dates.find((date: any) => {
        const dateToCheck = new Date(date.date);
        const year = currDate.getFullYear();
        const month = currDate.getMonth();
        const day = currDate.getDate();

        return year === dateToCheck.getFullYear() && month === dateToCheck.getMonth() && day === dateToCheck.getDate();
    });
}

const CalendarButton = (
    {
        onClick,
        isSelected,
        isCurrentMonth,
        date,
        currYear,
        currMonth,
        items
    }: {
        onClick: () => void,
        isSelected: boolean,
        isCurrentMonth: boolean,
        date: number,
        currMonth: number,
        currYear: number,
        items: Calendar["calendarItems"]
    }
) => {
    if (currMonth < 0) {
        currMonth = 11;
        currYear -= 1;
    }
    if (currMonth > 11) {
        currMonth = 0;
        currYear += 1;
    }

    return <button
        onClick={onClick}
        className={`
        ${isSelected
            ? "font-bold border-brand-yellow bg-white"
            : ""} 
            size-[14%] grow hover:bg-blue-100 border border-slate-200 aspect-[1/2] sm:aspect-square ${isCurrentMonth ? "bg-slate-50" : "bg-gray-400"} flex flex-col p-1`}
    >
        {date}
        {
            items?.filter(x => {
                return hasEventToday(x, new Date(currYear, currMonth, date));
            }).map((item) => {
                return <div className="text-sm font-normal w-full bg-blue-100 mb-1 size-2 sm:size-auto sm:w-full"
                            key={item.id}><span className="hidden sm:inline">{item.title}</span></div>
            })
        }
    </button>
}


export const CalendarBlock = ({block}: { block: any }) => {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const {replace} = useRouter();
    const dateObj = new Date();

    const [currDateObj, setCurrentDateObj] = useState(dateObj);
    const [currMonth, setCurrMonth] = useState<number>(dateObj.getMonth());
    const [currYear, setCurrYear] = useState<number>(dateObj.getFullYear());
    const [dateElements, setDateElements] = useState<ReactNode[]>([]);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [calendarItems, setCalendarItems] = useState<Calendar["calendarItems"] | null>(null);


    useEffect(() => {
        async function getData() {
            const data = await getCalendarData();

            setCalendarItems(data.calendarItems)
        }

        getData();

        if (searchParams.has("month") && searchParams.has("year") && searchParams.has("date")) {
            const month = parseInt(searchParams.get("month") || "");
            const year = parseInt(searchParams.get("year") || "");
            const date = parseInt(searchParams.get("date") || "");

            setCurrMonth(month);

            setCurrYear(year);
            setSelectedDate(new Date(year, month, date));
        }
    }, []);

    const isCurrSelected = useCallback((date: number, month: number, year: number) => {
        if (selectedDate === null) return false;

        if (month > 11) {
            month = 0;
            year = year + 1;
        }
        if (month < 0) {
            month = 11;
            year = year - 1;
        }

        return selectedDate.getDate() === date && selectedDate.getMonth() === month && selectedDate.getFullYear() === year
    }, [selectedDate]);

    function handleDateClick(date: number, month: number, year: number) {
        if (month > 11) {
            month = 0;
            year = year + 1;
        }
        if (month < 0) {
            month = 11;
            year = year - 1;
        }
        const params = new URLSearchParams(searchParams);

        params.set('month', month.toString());
        params.set('date', date.toString());
        params.set('year', year.toString());


        setCurrMonth(month);

        setCurrYear(year);
        setSelectedDate(new Date(year, month, date));

        replace(`${pathname}?${params.toString()}`, {scroll: false});
    }

    function handleMonthClick(month: number) {
        if (month < 0) {
            setCurrMonth(11);
            setCurrYear(currYear - 1);
            return;
        }
        if (month > 11) {
            setCurrMonth(0);
            setCurrYear(currYear + 1);
            return;
        }

        setCurrMonth(Math.min(Math.max(month, 0), 11));
    }

    useEffect(() => {

        const dayOffset = firstDayOfWeek(currDateObj) || 7;


        const updatedDateElements = [];

        for (let i = 0; i < dayOffset; i++) {
            updatedDateElements.push(
                <CalendarButton
                    onClick={() => handleDateClick((getDaysInMonth(currMonth - 1, currYear) + (i + 1)) - dayOffset, currMonth - 1, currYear)}
                    isSelected={false}
                    isCurrentMonth={false}
                    date={(getDaysInMonth(currMonth - 1, currYear) + (i + 1)) - dayOffset}
                    currMonth={currMonth - 1}
                    currYear={currYear}
                    items={calendarItems}/>
            )
        }

        for (let i = 0; i < getDaysInMonth(currMonth, currYear); i++) {
            updatedDateElements.push(
                <CalendarButton
                    key={block.id + i}
                    items={calendarItems}
                    currMonth={currMonth}
                    currYear={currYear}
                    date={i + 1}
                    onClick={() => handleDateClick(i + 1, currMonth, currYear)}
                    isCurrentMonth={true}
                    isSelected={isCurrSelected(i + 1, currMonth, currYear)}/>
            )
        }

        const lastDayOfMonth = lastDayOfWeek(new Date(currYear, currMonth, getDaysInMonth(currMonth, currYear)));

        let lastDay = 0;
        for (let i = 0; i < 6 - lastDayOfMonth; i++) {
            updatedDateElements.push(
                <CalendarButton
                    onClick={() => handleDateClick((i + 1), currMonth + 1, currYear)}
                    isSelected={false}
                    isCurrentMonth={false} date={i + 1} currMonth={currMonth + 1} currYear={currYear}
                    items={calendarItems}/>
            )
            lastDay = i + 1;
        }

        while (updatedDateElements.length < 42){
            const date = lastDay + 1;
            updatedDateElements.push(
                <CalendarButton
                    onClick={() => handleDateClick((date), currMonth + 1, currYear)}
                    isSelected={false}
                    isCurrentMonth={false} date={date} currMonth={currMonth + 1} currYear={currYear}
                    items={calendarItems}/>
            )
            lastDay++;
        }

        setDateElements(updatedDateElements);
    }, [calendarItems, currDateObj, currMonth, currYear, isCurrSelected]);

    useEffect(() => {
        setCurrentDateObj(new Date(currYear, currMonth, 1));
    }, [currYear, currMonth]);


    return <div className="max-w-screen-lg mx-auto">
        <div className="flex justify-between">
            <button onClick={() => handleMonthClick(currMonth - 1)}>prev</button>
            <DatePicker dateFormat="MMMM, yyyy" selected={currDateObj} onChange={(date) => {
                if (date) {
                    handleDateClick(date.getDate(), date.getMonth(), date.getFullYear())
                }
                setSelectedDate(date);
            }}/>
            <button onClick={() => handleMonthClick(currMonth + 1)}>next</button>
        </div>
        <div className="flex">
            <div className="font-bold w-[14%] grow text-center">Su</div>
            <div className="font-bold w-[14%] grow text-center">Mo</div>
            <div className="font-bold w-[14%] grow text-center">Tu</div>
            <div className="font-bold w-[14%] grow text-center">We</div>
            <div className="font-bold w-[14%] grow text-center">Th</div>
            <div className="font-bold w-[14%] grow text-center">Fr</div>
            <div className="font-bold w-[14%] grow text-center">Sa</div>
        </div>
        <div className="flex flex-wrap">
            {dateElements.map(x => x)}
        </div>
        <div
            className="sticky bottom-0 sm:relative bg-white py-1 shadow-sm max-h-[30vh] sm:max-h-screen overflow-y-auto">
            {
                selectedDate
                    ?
                    <h3 className={`font-ptserif text-center font-bold underline underline-offset-8 decoration-brand-yellow decoration-4 text-lg sm:text-3xl mb-6 mt-2`}>
                        Happening {selectedDate?.getMonth() + 1}/{selectedDate.getDate()}/{selectedDate.getFullYear()}
                    </h3>
                    : ""
            }
            {
                selectedDate
                    ?
                    calendarItems?.filter(x => hasEventToday(x, new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate()))).map((item) => {
                        return <div className="sm:text-center sm:mb-6 p-2" key={item.id}>
                            <h4 className="font-bold sm:text-xl">{item.title} {item.location ? `- ${item.location}` : ""} </h4>
                            {
                                item.description ?
                                    <div
                                        className="hidden sm:block max-w-prose mx-auto mb-4">{item.description}</div> : ""
                            }
                            {
                                item?.times?.map(time => {
                                    if (!time.hour_start) return;

                                    // Backend now provides hour_start and hour_end as formatted strings
                                    if (!time.hour_end) {
                                        return <div key={time.id}>
                                            {time.hour_start}
                                        </div>
                                    }

                                    return <div key={time.id}>
                                        {time.hour_start} - {time.hour_end}
                                    </div>


                                })
                            }
                            {
                                item.eventPage && typeof item?.eventPage?.value !== "number"
                                    ? <Link className="italic font-bold underline"
                                            href={"/event/" + item.eventPage.value.slug || "/"}>More Info</Link>
                                    : ""
                            }
                        </div>
                    })
                    : ""
            }
        </div>
    </div>
}
