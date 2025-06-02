import {Impact, Media, MuseumCollection, Page, Passion, PressRelease, StudentSpotlight} from "@/app/types/payloadTypes";

export function getImage(item: Page | MuseumCollection | StudentSpotlight | Passion | Impact | PressRelease): Media | null {
    if (item.intro_content?.thumbnail) return item.intro_content.thumbnail as Media;
    if (item.intro_content?.images?.[0]) return item.intro_content.images[0].media as Media;
    return null;
}

export function camelCaseToKebabCase(str: string) {
    return str.replace(/[A-Z]+(?![a-z])|[A-Z]/g, ($, ofs) => (ofs ? "-" : "") + $.toLowerCase())
}


export function getSlugFromCollection(item: (Page | MuseumCollection | StudentSpotlight | Passion | Impact | Media | PressRelease | null | undefined | number), collectionSlug: string): string {
    if (!item || typeof item === "number") return "";
    if (collectionSlug === "pages") {
        return `/${(item as Page)?.full_path}`
    }
    if (collectionSlug === "media") {
        return `${(item as Media)?.url}`
    }
    if (collectionSlug === "pressReleases" && (item as PressRelease)?.pdf) {
        return `${((item as PressRelease).pdf as Media)?.url}`
    }
    if(collectionSlug === "eventCat"){
        return `/event/category/${(item as Impact)?.slug}`
    }
    else {
        return `/${camelCaseToKebabCase(collectionSlug)}/${(item as Impact)?.slug}`
    }
}
