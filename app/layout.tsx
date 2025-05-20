import type {Metadata} from "next";
import {open_sans, pt_serif} from "@/app/fonts";
import "@/app/globals.css";
import Script from "next/script";
import {GoogleAnalytics, GoogleTagManager} from '@next/third-parties/google'
import GoogleAnalyticsPageView from "@/app/components/GoogleAnalyticsPageView";
import {Suspense} from "react";

async function getMeta() {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_PAYLOAD_SERVER_URL}/api/globals/site-options?locale=undefined&draft=false&depth=1`,
        {
            next: {
                tags: ["siteOptions_"]
            }
        });
    return await res.json();
}


export async function generateMetadata(): Promise<Metadata> {

    const meta = await getMeta();


    return {
        title: meta.siteTitle,
        description: meta.siteDescription,
    }
}

export default async function RootLayout({
                                             children,
                                         }: Readonly<{
    children: React.ReactNode;
}>) {
    const meta = await getMeta();
    return (
        <html lang="en">
        <Script id={"fundRaiseUp"}>
            {
                `<!-- Fundraise Up: the new standard for online giving -->
<script>(function(w,d,s,n,a){if(!w[n]){var l='call,catch,on,once,set,then,track,openCheckout'.split(','),i=0;o=function(n){return function(){return i?o.l.push([n,arguments]):o._.push([n,arguments])}},i=0;o._=[];for(;i<l.length;i++)o[l[i]]=o(l[i]);w[n]=o;
t=d.getElementsByTagName(s)[0];j=d.createElement(s);j.async=1;j.src='https://cdn.fundraiseup.com/widget/'+a+'.js';
t.parentNode.insertBefore(j,t);o.l=[];o._=[];o.v=5;o.h=w.location.href;o.t=[];for(i=0;i<8;i++)o.t[i]=0;l[1]=o;l[2]=[]}})(window,document,'script','FundraiseUp','AMHYAEEN');</script>
<!-- End Fundraise Up -->`
            }
        </Script>
        <Script src="https://js.adsrvr.org/up_loader.1.1.0.js" type="text/javascript"/>
{/*        <Script strategy="lazyOnload" id="ttduniveralPixelAPI" type="text/javascript">
            {
                `                ttd_dom_ready( function () {if (typeof TTDUniversalPixelApi === 'function') {var universalPixelApi = new TTDUniversalPixelApi(); universalPixelApi.init("yh6tlla", ["7un71c4"], "https://insight.adsrvr.org/track/up");}})
`}
        </Script>*/}
        <Script strategy="lazyOnload" id="ttduniveralPixelAPI" type="text/javascript">
            {
                `           ttd_dom_ready( function() {

if (typeof TTDUniversalPixelApi === 'function') {

var universalPixelApi = new TTDUniversalPixelApi();

universalPixelApi.init("j59v8fs", ["3ywytgo"], "https://insight.adsrvr.org/track/up");

}

});
`}
        </Script>
        <Script
            src="//https://linkprotect.cudasvc.com/url?a=https%3a%2f%2f%2f%2ftag.brandcdn.com%2fautoscript%2fcrazyhorsememorial_vgtsqk5fmvvsve09%2fCrazy_Horse_Memorial.js&c=E,1,-HJw6C0kycDXGRiVnsdST6VP3vcPRWtgjwIUtPnXdd_37gl5XrGUyEuIsC0nt3o6YkjXuXZQ6XtHNdMpX6ul8EIUeAh3G4RAJx1QebC9fsRu4wM,&typo=1"/>
        <Script src="https://fareharbor.com/embeds/api/v1/?autolightframe=yes"/>
        <body className={`${open_sans.variable} ${pt_serif.variable}`}>
            {children}
            {/* GoogleAnalyticsPageView component for tracking page views on route changes */}
            <Suspense>
                <div id="analytics-wrapper">
                    <GoogleAnalyticsPageView />
                </div>
            </Suspense>
        </body>
        <GoogleAnalytics gaId="G-YDSBS7V3D3"/>
        <GoogleTagManager gtmId="GTM-58SJF86R"/>
        </html>
    );
}
