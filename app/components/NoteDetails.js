"use client";

import {app, database} from '../firebaseConfig';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useEffect } from 'react';

export default function NoteDetails({ID}){

    const [singleNote, setSingleNote]=useState({});

    const getSingleNote=async()=>{
        if (ID){
            const singleNote=doc(database, 'notes', ID);
            const data=getDoc(singleNote);
            setSingleNote({...data.data(), id:data.id});
        }
    }

    useEffect(()=>{
        getSingleNote();
    }, [ID])

    return (
        <>
        <h2>{singleNote.noteTitle}</h2>
        <div dangerouslySetInnerHTML={{__html:singleNote.noteDesc}}></div>
        </>
    )
}