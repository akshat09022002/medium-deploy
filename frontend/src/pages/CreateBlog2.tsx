import React, { useState } from 'react';
import { Editor } from "@tinymce/tinymce-react";
import { Navbar } from '../components/Navbar';
import axios from 'axios';
import { Backend_Api } from '../config';
import { useNavigate } from 'react-router-dom';


export const CreateBlog2 = () => {

    const navigate= useNavigate();

    const [title, setTitle] = useState("");
    const [content, setcontent] = useState("");
    const [loading,setLoading]= useState("");

    const postBlog = async () => {
        setLoading("loading");
        await axios.post(`${Backend_Api}/api/v1/blog/post`, {
            "title": title,
            "content": content
        }, {
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        });
        navigate('/home');
    }

    const handler=()=>{
        if(loading==""){
            return <button type="button" onClick={postBlog} className="text-white bg-gray-800 w-1/6 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-md px-5 py-2.5  dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Post</button>
        }
        else{
            return <button disabled type="button" className="text-white bg-gray-800 w-1/6 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-md px-5 py-2.5  dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 inline-flex items-center">
                <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                </svg>
                Loading...
            </button>
        }
    }


    return <div>
        <div><Navbar></Navbar></div>
        <div className='pt-36 bg-[#def2f1] h-screen'>
            <div className='w-full flex justify-center'>
                <input onChange={(e) => {
                    const value = e.target.value;
                    setTitle(value);
                }} type='text' placeholder='Title' className='border-l-2 bg-[#def2f1] border-slate-400 my-10 h-20 text-2xl p-2 text-slate-600 outline-none'></input>
            </div>
            <div className='flex justify-center w-full'>
                <div className='w-1/2'>
                    <Editor
                        apiKey='k50c9yqdlta3le2g4x2v7cusy7c1s948f7js5jpisfoyd7ms'
                        init={{
                            height: 500,
                            statusbar: false,
                            placeholder: "Type Here...",
                            plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate ai mentions tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss',
                            toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image table | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
                            tinycomments_mode: 'embedded',
                            tinycomments_author: 'Author name',
                            ai_request: (request: any, respondWith: any) => respondWith.string(() => Promise.reject("See docs to implement AI Assistant")),
                        }}
                        initialValue=""
                        onEditorChange={(content: any, editor: any) => {
                            setcontent(content);
                        }}
                    />
                </div>
            </div>
            <div className='flex justify-center mt-8'>
                {handler()}
            </div>

        </div>
    </div>

}