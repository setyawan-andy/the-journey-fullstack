import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { API } from '../../config/api';

const CreateJourney = () => {

    // console.clear();

    let history = useHistory();
    const [preview, setPreview] = useState(null);

    const [form, setForm] = useState({
        title: "",
        description: "",
        image: "",
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.type === "file" ? e.target.files : e.target.value,
        });

        //create image preview
        if(e.target.type === "file"){
            let url = URL.createObjectURL(e.target.files[0]);
            setPreview(url);
        }
        console.log(form)
    };

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();

            //config
            const config = {
                headers: {
                    "Content-type": "multipart/form-data",
                },
            };


            //store data as object
            const formData = new FormData();
            formData.set("image", form.image[0], form.image[0].name);
            formData.set("title", form.title);
            formData.set("description", form.description);

            console.log(form);

            //insert data into database
            const response = await API.post("/addarticle", formData, config);
            console.log(response);

            history.push("/");
        } catch (error) {
            console.log(error);
            console.log(form);
        }
    };

  return (
    <div className='container mt-16 pl-20 pr-10'>
        <form action="" onSubmit={handleSubmit}>
            <div className='flex flex-col gap-3'>
                <label htmlFor="title" className='text-2xl font-semibold font-roboto'>Title</label>
                <input type="text" id="title" name="title" onChange={handleChange} autoComplete='off' className='px-4 py-3 rounded-md focus:outline-none'/>
            </div>
            <div className='mt-8 flex flex-col gap-3'>
                <h2 className='text-2xl font-semibold font-roboto'>Thumbnail</h2>
                {preview ? 
                    <div className='w-32'>
                        <img src={preview} alt="preview" className='rounded-md object-cover w-full h-full' />
                    </div>  
                : 
                    null
                }
                <label htmlFor="upload" className='btn-dark w-32'>Choose..</label>
                <input type="file" id="upload" name="image" hidden onChange={handleChange} />
            </div>
            <div className='mt-8'>
                <CKEditor
                    editor={ClassicEditor}
                    data={form.description}
                    onChange={(e, editor) => {
                        const data = editor.getData();
                        setForm({ 
                            ...form,
                            description: data })
                    }}
                />
            </div>
            <div className='mt-8 flex justify-end'>
                <button type='submit' className='btn btn-blue w-32'>Post</button>
            </div>
        </form>
    </div>
  )
}

export default CreateJourney