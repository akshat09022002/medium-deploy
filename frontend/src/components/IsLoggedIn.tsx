import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Backend_Api } from "../config";
import { useEffect, useState } from "react";


function getInitials(fname: string, sname: string) {

    if (sname.trim().length > 0) return fname.trim()[0] + sname.trim()[0];
    else if (fname.trim().length == 1) return fname.trim()[0];
    else return fname.trim()[0] + fname.trim()[1];

}


export const IsLoggedIn = () => {
    const navigate = useNavigate();
    const [initials, setinitials] = useState("");

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {

            const getDetails = async () => {
                const response = await axios.get(`${Backend_Api}/api/v1/user/getDetails`, {
                    headers: {
                        Authorization: token
                    }
                })
                console.log(response);
                const data = response.data;

                const initials = getInitials(data.firstname, data.lastname).toUpperCase();
                console.log(initials);

                setinitials(initials);

            }

            getDetails();

        }
    }, []);

    if (initials != "") {
        return <Link to={"/signin"} onClick={() => {
            localStorage.removeItem("token");
            navigate('/signin')
        }}><div className="relative inline-flex items-center justify-center  w-16 h-16 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 hover:ring-2 ring-white">
                <div className="font-medium text-gray-600 dark:text-gray-300">{initials}</div>
            </div></Link>
    }
    else return <div>
        <button onClick={() => navigate('/')} type="button" className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-lg px-5 py-2.5 text-center m-2 w-24">Signup</button>
        <button onClick={() => navigate('/signin')} type="button" className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-lg px-5 py-2.5 text-center m-2 w-24">Login</button>
    </div>;
}