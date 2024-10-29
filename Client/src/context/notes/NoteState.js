import React from "react";
import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";

  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);

  // Get all notes 
  const getNotes = async () => {
    try {
      const response = await fetch(`${host}/api/notes/fetchnotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });
      if (response.ok) {
        const json = await response.json();
        setNotes(json);
      }
    } catch (error) {
      console.error("Error fetching notes:", error);
    } 
  };

  // Add a note function 
  const addNote = async (title, description, dueDate) => {
    try {
      const response = await fetch(`${host}/api/notes/addnotes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ title, description, dueDate }),
      });
      if (response.ok) {
        const newNote = await response.json();
        setNotes([...notes, newNote]);
      }
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };
  // const json = await response.json();
  // console.log(json);

  // Delete a note 
  const deleteNote = async (id) => {
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = response.json();
    console.log(json);
    //
    const newNotes = notes.filter((note) => note._id !== id);
    setNotes(newNotes);
  };

  // Edit a note
  const editNote = async (id, title, description, dueDate) => {
    try {
      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token")
        },
        body: JSON.stringify({ title, description, dueDate }),
      });
      if (response.ok) {
        const updatedNotes = notes.map((note) =>
          note._id === id ? { ...note, title, description, dueDate } : note
        );
        setNotes(updatedNotes);
      }
    } catch (error) {
      console.error("Error editing note:", error);
    }
  };

  const completeNote = async (id) => {
    try {
      const response = await fetch(`${host}/api/notes/completenote/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });
      if (response.ok) {
        const updatedNotes = notes.map((note) =>
          note._id === id ? { ...note, completed: !note.completed } : note
        );
        setNotes(updatedNotes);
      }
    } catch (error) {
      console.error("Error completing note:", error);
    }
  };

  return (
    <NoteContext.Provider
      value={{ notes, getNotes, addNote, deleteNote, editNote, completeNote }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
