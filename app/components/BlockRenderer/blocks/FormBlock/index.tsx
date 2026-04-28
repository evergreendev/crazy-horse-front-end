"use client"
import {Form} from "@/app/types/payloadTypes";
import {useFormState, useFormStatus} from "react-dom";
import {submitPayloadForm} from "./actions";
import {useRef, useState} from "react";
import FieldError from "@/app/components/BlockRenderer/blocks/FormBlock/FieldError";
import {Country} from "@/app/components/BlockRenderer/blocks/FormBlock/Country";
import {Email} from "@/app/components/BlockRenderer/blocks/FormBlock/Email";
import {Number} from "@/app/components/BlockRenderer/blocks/FormBlock/Number";
import {Select} from "@/app/components/BlockRenderer/blocks/FormBlock/Select";
import renderText from "@/app/components/BlockRenderer/utils/renderText";
import {State} from "@/app/components/BlockRenderer/blocks/FormBlock/State";
import {Text} from "@/app/components/BlockRenderer/blocks/FormBlock/Text";
import {TextArea} from "@/app/components/BlockRenderer/blocks/FormBlock/TextArea";
import {useRouter} from "next/navigation";
import {Upload} from "@/app/components/BlockRenderer/blocks/FormBlock/Upload";
import ReCAPTCHA from "react-google-recaptcha";
import {useGoogleReCaptcha} from "react-google-recaptcha-v3";

const SubmitButton = ({submitText}: { submitText:string }) => {
    const {pending} = useFormStatus();

    return (
        <button className="print:hidden m-3 bg-blue-900 p-8 py-2 text-white ml-auto flex" type="submit"
                disabled={pending}>
            {pending ?
                <div className="size-8 border-2 border-l-blue-500 border-white animate-spin rounded-full"/> : submitText}
        </button>
    )
}
const CheckBox = ({field, errors}: {
    field: {
        name: string,
        label?: string | null,
        width?: number | null,
        required?: boolean | null,
        defaultValue?: boolean | null,
        id?: string | null,
    },
    errors: { message: string, fieldName: string } | null
}) => {
    const checkRef = useRef<HTMLInputElement | null>(null);

    return <div key={field.id}
                className={`${errors?.fieldName === field.name ? "border-2 border-dashed border-red-200" : ""} p-4 flex items-center flex-wrap`}
                style={{width: `${field.width || "100"}%`}}>
        {errors?.fieldName === field.name ? <FieldError message={errors.message}/> : ""}
        <label className="mr-2 font-opensans font-normal text-sm" htmlFor={field.name}>{field.label || field.name}</label>
        <input id={field.name} className="size-4" ref={checkRef} value="Yes" required={field.required || false}
               defaultChecked={field.defaultValue || false} name={field.name}
               type={"checkbox"}/>
        {
            checkRef.current && !checkRef.current.checked &&
            <input hidden value="No" name={field.name}/>
        }
    </div>
}

const FormBlock = ({block}: {
    block: {
        form?: (number | null) | Form;
        id?: string | null;
        blockName?: string | null;
        blockType: 'FormBlock';
    }
}) => {
    const initialState: {
        message: boolean | null,
        error: { message: string, fieldName: string } | null
        fields: any,
        form: null|number
    } = {
        message: false,
        error: null,
        fields: typeof block.form !== "number" ? block.form?.fields : null,
        form: typeof block.form !== "number" ? block.form?.id || null : block.form || null
    }

    const [state, formAction] = useFormState(submitPayloadForm, initialState);
    const router = useRouter();
    const recaptchaRef = useRef<ReCAPTCHA>(null);
    const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
    const { executeRecaptcha } = useGoogleReCaptcha();

    if (typeof block.form === "number" || !block.form) return null;

    if (state.message && block.form.confirmationType === "redirect" && block.form.redirect){
        router.push(block.form.redirect.url);
    }

    const handleSubmit = async (formData: FormData) => {
        if (process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY) {
            console.log("recaptchaToken", recaptchaToken);
            if (process.env.NEXT_PUBLIC_RECAPTCHA_VERSION === 'v3') {
                if (executeRecaptcha) {
                    const token = await executeRecaptcha('form_submit');
                    formData.set("g-recaptcha-response", token);
                }
            } else if (process.env.NEXT_PUBLIC_RECAPTCHA_SIZE === 'invisible') {
                if (!recaptchaToken) {
                    const token = await recaptchaRef.current?.executeAsync();
                    if (token) {
                        formData.set("g-recaptcha-response", token);
                    }
                }
            }
        }
        formAction(formData);
    }

    return <div className="max-w-screen-lg w-full mx-auto bg-gray-100">
        {
            state.message && block.form.confirmationType === "message" &&
            <div className="p-16 min-h-96 flex justify-center flex-col">{renderText(block.form.confirmationMessage?.root,0,block.id+"message"||"0")}</div>
        }
        <form className={`flex flex-wrap w-full ${state.message ? "hidden" : ""}`}
              action={handleSubmit}>
            {
                block.form.fields?.map(field => {
                    switch (field.blockType) {
                        case "checkbox":
                            return <CheckBox errors={state.error} field={field} key={field.id}/>
                        case "country":
                            return <Country field={field} errors={state.error} key={field.id}/>
                        case "email":
                            return <Email field={field} errors={state.error} key={field.id}/>
                        case "message":
                            return <div className="w-full p-4" key={field.id}>{renderText(field.message?.root, 1, field.id||"0", "max-w-full")}</div>
                        case "number":
                            return <Number field={field} errors={state.error} key={field.id}/>
                        case "select":
                            return <Select field={field} errors={state.error} key={field.id}/>
                        case "state":
                            return <State field={field} errors={state.error} key={field.id}/>
                        case "text":
                            return <Text field={field} errors={state.error} key={field.id}/>
                        case "textarea":
                            return <TextArea field={field} errors={state.error} key={field.id}/>
                        case "FileUpload":
                            return <Upload field={field} errors={state.error} key={field.id}/>
                    }
                })
            }
            {
                state.error?.fieldName === "all" || state.error?.fieldName ?
                    <div className="w-full mx-6 p-2 bg-red-100 border border-red-500 text-red-950 font-bold">{state.error.message}</div> : ""
            }
            <div className="w-full">
                {process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY && (
                    <div className="mx-6 mb-4">
                        {process.env.NEXT_PUBLIC_RECAPTCHA_VERSION !== 'v3' && (
                            <ReCAPTCHA
                                ref={recaptchaRef}
                                size={(process.env.NEXT_PUBLIC_RECAPTCHA_SIZE as any) || "normal"}
                                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                                onChange={(token) => {
                                    setRecaptchaToken(token);
                                }}
                            />
                        )}
                    </div>
                )}
                <SubmitButton submitText={block.form.submitButtonLabel||"Submit"}/>
            </div>
        </form>
    </div>
}

export default FormBlock;
