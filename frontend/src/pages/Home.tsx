import { useEffect, useState } from "react"
import { BlogCard } from "../components/BlogCard"
import { Navbar } from "../components/Navbar"
import axios from "axios"
import { Backend_Api } from "../config"
import { useNavigate } from "react-router-dom"


type blogdata = {
    id: string
    title: string
    content: string
    published: string
    author: {
        firstname: string
        lastname: string
    }
}

export const Home = () => {
    const [blogs, setblogs] = useState([]);
    const navigate= useNavigate();

    useEffect(() => {
        const getBlogs = async () => {
            const response = await axios.get(`${Backend_Api}/api/v1/blog/bulk`, {
            });
            setblogs((e) => {
                e = response.data.blog;
                return e;
            });
        }

        getBlogs();


    }, []);

    return <div>
        <Navbar></Navbar>
        <div className="pt-36 grid grid-cols-5 h-screen bg-[#def2f1]">
            <div className="col-span-3 flex flex-row justify-end  h-full overflow-y-auto">
                <div className="w-3/4 mr-20">

                    {
                        blogs.map((blog: blogdata) => {
                            return <BlogCard title={blog.title} content={blog.content} published={blog.published} firstname={blog.author.firstname} lastname={blog.author.lastname}></BlogCard>
                        })
                    }

                </div>

            </div>
            <div className="col-span-2 border-opacity ml-10 h-full">
                <div className="ml-20">
                    <button type="button" onClick={()=>{
                        navigate('/createblog');
                    }} className="text-white bg-gray-800 mb-4 hover:bg-gray-900 w-1/4 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2">Create New Blog</button>
                </div>


            </div>
        </div>


    </div>
}