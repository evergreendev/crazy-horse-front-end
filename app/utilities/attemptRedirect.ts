import {redirect} from "next/navigation";
import qs from "qs";

async function getRedirect(query: any){
    const stringifiedQuery = qs.stringify(
        {
            where: query,
        },
        {
            addQueryPrefix: true
        }
    );

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_PAYLOAD_SERVER_URL}/api/redirects/${stringifiedQuery}&depth=0`,
        {
            cache: "no-cache"
        }
    );

    if (res.status !== 200) return null;

    return res.json();
}

async function attemptRedirect(slug:string[]){
    const redirects = await getRedirect({
        from: {
            like: slug.join("/"),
        },
    });

    if (redirects.docs.length > 0){
        const to = redirects.docs[0].to

        if (to.type === "reference"){
            redirect(`/id-redirect-to-slug/${to.reference.relationTo}/${to.reference.value}`);
        } else {
            redirect(to.url);
        }
    }
}

export default attemptRedirect;
