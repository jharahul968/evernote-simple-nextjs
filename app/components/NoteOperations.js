"use client";
import styles from "../Evernote.module.scss";
import { useState, useEffect } from "react";
import { app, database } from "../firebaseConfig";
import { collection, addDoc, getDocs } from "firebase/firestore";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


const dbInstance = collection(database, "notes");

export default function NoteOperations({getSingleNote}) {
  const [isInputVisible, setInputVisible] = useState(false);
  const [noteTitle, setNoteTitle] = useState("");
  const [noteDesc, setNoteDesc]=useState('');
  const [notesArray, setNotesArray]=useState([]);
  const inputToggle = () => {
    setInputVisible(!isInputVisible);
  };
  const saveNote = () => {
    addDoc(dbInstance, {
      noteTitle: noteTitle,
      noteDesc: noteDesc
    })
    .then(()=>{
        setNoteTitle('');
        setNoteDesc('');
        getNotes();
    })
  };
  const addDesc=(value)=>{
    setNoteDesc(value);
  }
  const getNotes=()=>{
    getDocs(dbInstance)
    .then((data)=>{
        setNotesArray(data.docs.map((item)=>{
            return {...item.data(), id:item.id}
        }));
    })
  }
  useEffect(()=>{
    getNotes();
  }, [])

  return (
    <>
      <div className={styles.btnContainer}>
        <button onClick={inputToggle} className={styles.button}>
          Add a New Note
        </button>
      </div>
      {isInputVisible ? (
        <div className={styles.inputContainer}>
          <input
            className={styles.input}
            placeholder="Enter the title.."
            onChange={(e) => setNoteTitle(e.target.value)}
            value={noteTitle}
          />
          <div className={styles.ReactQuill}>
            <ReactQuill
            onChange={addDesc}
            value={noteDesc}
            />
          </div>

          <button className={styles.saveBtn} onClick={saveNote}>
            Save Note
          </button>
        </div>
      ) : (
        <></>
      )}

      <div className={styles.notesDisplay}>
        {notesArray.map((note)=>{
            return (
                <div className={styles.notesInner}
                onClick={()=>getSingleNote(note.id)}
                >
                    <h4>{note.noteTitle}</h4>
                    {/* <p>{note.noteDesc}</p> */}
                    {/* <div dangerouslySetInnerHTML={{__html:note.noteDesc}}></div> */}
                </div>

            )
        })}
      </div>

    </>
  );
}

