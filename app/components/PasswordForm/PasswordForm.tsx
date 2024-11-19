"use client"
import {useFormState} from "react-dom";
import {submitPassword} from "@/app/components/PasswordForm/actions";

const PasswordForm = ({password,cookieKey}: { password: string, cookieKey:string }) => {
    const initialState = {
        message: null,
        password: password,
        cookieKey: cookieKey
    }

    const [state, formAction] = useFormState(submitPassword, initialState);

    return <form className={`flex flex-col mx-auto justify-center max-w-prose gap-3 border-gray-300 mb-4 border p-4`}
                 action={formAction}>
        {state.message && <div className="text-center bg-red-100 text-red-800 font-bold">{state.message}</div>}
        <div>
            <label htmlFor="password" className="mr-2">Password:</label>
            <input className="bg-blue-50" type="password" name="password"/>
        </div>
        <div>
            <label htmlFor="savePassword" className="mr-2">Remember Password:</label>
            <input type="checkbox" name="savePassword"/>
        </div>
        <button className="bg-blue-900 text-white font-bold" type="submit">Submit</button>
    </form>
}

export default PasswordForm;
