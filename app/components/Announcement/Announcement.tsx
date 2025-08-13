import {Banner} from "@/app/types/payloadTypes";
import renderText from "@/app/components/BlockRenderer/utils/renderText";
import AnnouncementCloseButton from "@/app/components/AnnouncementCloseButton";
import { cookies } from "next/headers"


const Announcement = async ({data}: { data: Banner }) => {
    console.log(data);
    const startDate = data.banner_start ? new Date(data.banner_start) : null;
    startDate?.setUTCHours(0, 0, 0, 0);
    const endDate = data.banner_end ? new Date(data.banner_end) : null;
    endDate?.setUTCHours(23, 59, 59, 999);
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);
    const cookieStore = await cookies();
    const hideBanner = cookieStore.get('hide-banner')?.value


    if (
        hideBanner === data.updatedAt ||
        (startDate && endDate
            && (startDate.getTime() > today.getTime() || endDate.getTime() < today.getTime()))
        || (startDate
            && (startDate.getTime() > today.getTime()))
        || (endDate
            && (endDate.getTime() < today.getTime()))
    ) {
        return null;
    }

    if (!data.message || !data.message.root) {
        return null;
    }

    return <div className={`bg-blue-100 p-2 pt-7 sm:pt-2 w-full text-center top-0 z-30`}>{
        renderText(data.message.root, 1, "top-banner")
    }
        <AnnouncementCloseButton updatedAt={data.updatedAt||""} />
    </div>
}

export default Announcement;
