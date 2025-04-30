import {Hour} from "@/app/types/payloadTypes";

type Hours = {
    title?: string | null;
    hour_start?: string | null;
    hour_end?: string | null;
    id?: string | null;
}

export const getFutureSchedules = (hour: Hour) => {
    const schedules = hour.Schedules

    if (!schedules) return null;

    return schedules.filter((schedule) => {
        if (!schedule.schedule_start) return false;
        if (!schedule.schedule_end) return false;

        const start = new Date(schedule.schedule_start);
        start.setUTCHours(0,0,0,0);
        const end = new Date(schedule.schedule_end);
        const today = new Date();
        today.setUTCHours(0,0,0,0);

        end.setUTCHours(23,59,59,999);

        return start.getTime() >= today.getTime();
    })
}

export const getCurrentSchedule = (hour: Hour) => {
    const schedules = hour.Schedules

    if (!schedules) return null;

    return schedules.find((schedule) => {
        if (!schedule.schedule_start) return false;
        if (!schedule.schedule_end) return false;

        const start = new Date(schedule.schedule_start);
        start.setUTCHours(0,0,0,0);
        const end = new Date(schedule.schedule_end);
        const today = new Date();
        today.setUTCHours(0,0,0,0);

        end.setUTCHours(23,59,59,999);

        return today.getTime() >= start.getTime() && today.getTime() < end.getTime();
    })
}

const getHourText = (hour: number, minutes: string) => {
    const a = hour > 12 ? "pm" : "am";
    const hourText = a === "am" ? hour||12 : (hour - 12)||12;

    return hourText + ":" + minutes + a;
}

export const getHoursFromSchedule = (hours: Hours) => {
    if (!hours.hour_start || !hours.hour_end) return null;
    const start = new Date(hours.hour_start);

    const end = new Date(hours.hour_end);

    return getHourText(start.getHours(), (start.getMinutes() < 10 ? '0' : '') + start.getMinutes()) + " - " + getHourText(end.getHours(), (end.getMinutes() < 10 ? '0' : '') + end.getMinutes());
}
