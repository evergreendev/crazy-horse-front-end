import FieldError from "@/app/components/BlockRenderer/blocks/FormBlock/FieldError";
import {BaseField, Errors} from "@/app/components/BlockRenderer/blocks/FormBlock/types";

export const TextArea = ({field, errors}: { field: BaseField & {defaultValue?: string | null}, errors: Errors }) => {
    return <div key={field.id}
                className={`${errors?.fieldName === field.name ? "border-2 border-dashed border-red-200" : ""} p-4 flex flex-col flex-wrap`}
                style={{width: `${field.width || "100"}%`}}>
        {errors?.fieldName === field.name ? <FieldError message={errors.message}/> : ""}
        <label className="mr-2 font-opensans font-normal text-sm" htmlFor={field.name}>{field.label || field.name} {field.required ? "(required field)" : ""}</label>
            <textarea  defaultValue={field.defaultValue||""} className="mt-auto border border-stone-300 p-1.5 bg-white rounded w-full" name={field.name}
                   id={field.name}/>
    </div>
}
