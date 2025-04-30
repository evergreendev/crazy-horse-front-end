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

export const getHoursFromSchedule = (hours: Hours) => {
    if (!hours.hour_start || !hours.hour_end) return null;
    // Backend now provides hour_start and hour_end as formatted strings
    return hours.hour_start + " - " + hours.hour_end;
}
