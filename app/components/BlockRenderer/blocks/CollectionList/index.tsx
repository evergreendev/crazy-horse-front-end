import qs from "qs";
import CollectionListClient from "./index.client";

async function getData(query: any, tag: string, collectionSlug: string, page: string, limit: string) {
    const stringifiedQuery = qs.stringify(
        {
            where: query,
        },
        {
            addQueryPrefix: true
        }
    );

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_PAYLOAD_SERVER_URL}/api/${collectionSlug}/?${stringifiedQuery}&depth=2&limit=${limit}&page=${page}&sort=-publishedAt`,
        {
            next: {
                tags: [tag]
            }
        }
    );

    if (res.status !== 200) return null;

    const json = await res.json();

    return {...json, collectionSlug};
}

const CollectionList = async ({block}: {
    block: {
        perPage?: number | null;
        collectionsToPull:
            | 'pages'
            | 'museumCollections'
            | 'impact'
            | 'passions'
            | 'studentSpotlight'
            | 'support'
            | 'event'
            | 'news'
            | 'pressReleases';
        id?: string | null;
        blockName?: string | null;
        blockType: 'collectionList';
        isMinimal: boolean
    }
}) => {
    // Default to page 1 for server-side rendering
    const currentPage = "1";

    if (!block.collectionsToPull) {
        return null;
    }

    const res = await getData({}, block.collectionsToPull + "_", block.collectionsToPull, currentPage, `${block.perPage || 3}`);

    if (!res) {
        return null;
    }

    return (
        <CollectionListClient 
            initialData={res.docs} 
            block={block} 
            totalPages={res.totalPages} 
        />
    );
}

export default CollectionList;
