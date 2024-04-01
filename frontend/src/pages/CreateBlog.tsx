import React, { useState } from 'react';
import { EditorState, ContentState } from 'draft-js';
import {convertToHTML} from 'draft-convert';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import './CreateBlog.css'
import { Navbar } from '../components/Navbar';
import axios from 'axios';
import { Backend_Api } from '../config';


export const CreateBlog = () => {
  const [editorState, setEditorState] = useState(
    () => EditorState.createEmpty(),
  );

  const [title, setTitle] = useState("");

  const postMaker = async () => {
    const contentState: ContentState = editorState.getCurrentContent();
    const contentStateJSON:string = convertToHTML(contentState);
    console.log(contentStateJSON);

    // try {
    //   await axios.post(`${Backend_Api}/api/v1/blog/post`, {
    //     "title": title,
    //     content:
    //   }, {
    //     headers: {
    //       "Authorization": localStorage.getItem("token")
    //     }
    //   });
    // }
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
          <Editor editorState={editorState}
            onEditorStateChange={setEditorState}
            wrapperClassName="wrapper-class"
            editorClassName="editor-class"
            toolbarClassName="toolbar-class"
            placeholder="Content"
          />
        </div>
      </div>
      <div>{ }</div>
      <div className='flex justify-center mt-8'>
        <button onClick={postMaker} type="button" className="text-white bg-gray-800 hover:bg-gray-900 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 w-48">Post</button>
      </div>

    </div>
  </div>

}