import { SigninInput} from "@hitemup09/blogsite-common"
import axios from "axios"
import { ChangeEvent, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { SuccessAlert } from "./Alert"
import { Backend_Api } from "../config"

export const Authfields2 = () => {
    const navigate = useNavigate();

    const [postInputs, setInputs] = useState<SigninInput>({
        email: "",
        password: ""
    })
    const [success, setsuccess] = useState("");
    const [msg, setmsg] = useState("");
    const [loading, setLoading] = useState("");

    const handler = () => {
        if (loading == "") {
            return <button onClick={async () => {
                setLoading("loading");
                try {
                    const response = await axios.post(`${Backend_Api}/api/v1/user/signin`, {
                        email: postInputs.email,
                        password: postInputs.password
                    });
                    localStorage.setItem("token", response.data.jwt);
                    setsuccess("success");
                    setmsg("Successfully Logged In")
                    navigate('/home')

                } catch (e: any) {
                    const status = e.response.status;
                    if (status == "403" || "422") {
                        setsuccess("warning");
                        setmsg("Invalid Login Credentials")
                    }
                    else {
                        setsuccess("invalid");
                        setmsg("Something Went Wrong")
                    }
                }
               
            }
            } type="button" className="text-white bg-gray-800 w-2/5 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-md px-5 py-2.5  dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Login</button>
        }
        else {
            return <button disabled type="button" className="text-white bg-gray-800 w-2/5 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-md px-5 py-2.5  dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 inline-flex items-center">
                <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                </svg>
                Loading...
            </button>
        }
    }


    return <div>
        <div className="flex justify-center">
            <div className="flex flex-col justify-center w-1/2">
                <div className="text-center">
                    <div className="font-bold text-4xl mb-2 text-black">
                        Sign in
                    </div>
                    <div className="font-semibold text-white">
                        Don't have an account? <Link to={"/"} className="underline">Signup</Link>
                    </div>
                </div>
                <div className="mt-6">
                    <LabelledInput title="Email" placeholder="example@email.com" type="email" onChange={(e) => {
                        setInputs({
                            ...postInputs,
                            email: e.target.value
                        })
                    }}></LabelledInput>
                    <LabelledInput title="Password" placeholder="password" type="password" onChange={(e) => {
                        setInputs({
                            ...postInputs,
                            password: e.target.value
                        })
                    }}></LabelledInput>

                </div>
                <SuccessAlert success={success} msg={msg}></SuccessAlert>
                <div className="w-full flex justify-center mt-4">
                    {handler()}
                </div>

            </div>

        </div>
    </div>
}

type label = {
    title: String
    placeholder: any
    type: any
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

function LabelledInput(props: label) {
    return <div className="m-2">
        <label className="block mb-2 text-sm font-medium text-black dark:text-white">{props.title}</label>
        <input type={props.type} onChange={props.onChange} className="border border-black text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder={props.placeholder} required />
    </div>
}