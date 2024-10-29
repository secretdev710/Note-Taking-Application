import React, { useContext, useState } from 'react';
import noteContext from '../context/notes/noteContext';
import CompleteConfirm from './CompleteConfirm';

const NoteItem = (props) => {
  const context = useContext(noteContext);
  const { deleteNote, completeNote } = context;
  const { note, updateNote } = props;
  const [showModal, setShowModal] = useState(false);

  const onComplete = () => {
    setShowModal(true);
  }

  return (
    // Remove the unnecessary div element
    <div style={{ backgroundColor: "#ecee81" }} className='p-4 rounded-lg mt-8'>
      <h5 className="text-2xl text-gray-800 font-bold mb-2">{note.title}</h5>
      <p className="text-xl text-gray-800">{note.description}.</p>
      <h6 className="text-lg text-right font-semibold text-gray-700 mb-2">Due: {new Date(note.dueDate).toLocaleString()}</h6>
      <div className='flex justify-between'>
        <div>
          <p className="text-sm text-gray-400">Created on: {new Date(note.created_at).toLocaleDateString()}</p>
          <p className="text-sm text-gray-400">Last updated on: {new Date(note.updated_at).toLocaleDateString()}</p>
        </div>
        <div className="flex justify-between mt-4">
          <i
            className="fas fa-trash text-gray-800 cursor-pointer mr-4"
            onClick={() => {
              deleteNote(note._id);
            }}
          ></i>
          <i
            className="fas fa-edit text-gray-800 cursor-pointer"
            onClick={() => updateNote(note)}
          ></i>
          <i
            title={note.completed ? "Completed" : "Uncompleted"}
            className={`fas fa-check text-gray-800 cursor-pointer ml-4 rounded-full w-5 h-5 complete-before relative ${note.completed ? 'bg-gray-700 text-white' : ''}`}
            onClick={onComplete}
          ></i>
        </div>
      </div>
      {
        showModal && (
          <CompleteConfirm
            closeModal={() => setShowModal(false)}
            confirmCompletion={() => {
              completeNote(note._id);
              setShowModal(false);
              props.completeNote(note._id);
            }}
          />
        )
      }
    </div>

  );
};

export default NoteItem;
