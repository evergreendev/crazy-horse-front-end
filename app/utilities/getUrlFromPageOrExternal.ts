import {
    Event,
    EventCat,
    Impact,
    Media, MuseumCollection,
    News,
    Page,
    Passion,
    PressRelease,
    StudentSpotlight,
    Support
} from "@/app/types/payloadTypes";


function getUrlFromPageOrExternal(item: {
    Relation?:
        | ({
        relationTo: 'pages';
        value: number | Page;
    } | null)
        | ({
        relationTo: 'museumCollections';
        value: number | MuseumCollection;
    } | null)
        | ({
        relationTo: 'impact';
        value: number | Impact;
    } | null)
        | ({
        relationTo: 'passions';
        value: number | Passion;
    } | null)
        | ({
        relationTo: 'studentSpotlight';
        value: number | StudentSpotlight;
    } | null)
        | ({
        relationTo: 'support';
        value: number | Support;
    } | null)
        | ({
        relationTo: 'event';
        value: number | Event;
    } | null)
        | ({
        relationTo: 'eventCat';
        value: number | EventCat;
    } | null)
        | ({
        relationTo: 'news';
        value: number | News;
    } | null)
        | ({
        relationTo: 'media';
        value: number | Media;
    } | null)
        | ({
        relationTo: 'pressRelease';
        value: number | PressRelease;
    }) | null;
    external_url?: string | null;
} | null | undefined) {
    if (!item) return {
        url: "#",
        isExternal: false
    };

    const internalLink = typeof item.Relation?.value !== "number" && item.Relation?.value
        ? "full_path" in item.Relation.value ? item.Relation.value["full_path"] : (item.Relation.value as Page)?.slug || (item.Relation.value as Media)?.url
        : null;

    if (internalLink) {
        return {
            url: "/" + internalLink,
            isExternal: false
        }
    }
    if (item.external_url) {
        return {
            url: item.external_url,
            isExternal: true
        }
    }

    return {
        url: "#",
        isExternal: false
    };
}

export default getUrlFromPageOrExternal;
