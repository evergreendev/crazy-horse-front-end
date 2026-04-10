"use client"
import {GoogleReCaptchaProvider} from "react-google-recaptcha-v3";

export default function ReCaptchaProviderWrapper({
    children,
    siteKey,
    version
}: {
    children: React.ReactNode;
    siteKey: string | undefined;
    version: string | undefined;
}) {
    if (version === 'v3' && siteKey) {
        return (
            <GoogleReCaptchaProvider reCaptchaKey={siteKey}>
                {children}
            </GoogleReCaptchaProvider>
        )
    }
    return <>{children}</>;
}
