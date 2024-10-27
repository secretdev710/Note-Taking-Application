import React, { useContext, useEffect, useRef, useState } from 'react';
import NoteItem from './NoteItem';
import noteContext from '../context/notes/noteContext';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Notes = () => {
  const context = useContext(noteContext);
  const { notes, getNotes, editNote } = context;
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      getNotes();
    } else {
      navigate('/login');
    }
    //eslint-disable-next-line
  }, []);

  const ref = useRef(null);
  const [note, setNote] = useState({ id: '', etitle: '', edescription: '', edueDate: null });
  const [search, setSearch] = useState('');

  const updateNote = (currentNote) => {
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      edueDate: currentNote.dueDate,
    });
    // Open the modal
    ref.current.classList.remove('hidden');
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const onSearch = (e) => {
    setSearch(e.target.value);
  };

  const saveChanges = async (e) => {
    e.preventDefault();
    editNote(note.id, note.etitle, note.edescription, note.edueDate);
    ref.current.classList.add('hidden');
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  return (
    <>
      <div className='flex justify'>
        <h2 className='flex-shrink-0 text-2xl m-2 font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-blue-500 to-yellow-500'>Your Notes</h2>
        <Link className=" max-w-sm bg-gradient-to-r from-indigo-500 via-pink-500 to-yellow-500 hover:from-indigo-600 hover:via-pink-600 hover:to-red-600 focus:outline-none text-white text-md uppercase font-bold shadow-md rounded-lg ml-auto px-4 py-2" to="/addnote">
          Add note
        </Link>
      </div>
      <input
        type='input'
        className='text-gray-900 mt-3 h-10 w-full px-3 py-2 border border-gray-300 placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-md'
        name='search'
        placeholder='Search goes here...'
        onChange={onSearch}
      />
      <div className="grid grid-cols-1 gap-x-20">
        {Array.isArray(notes) && notes.length > 0 ? (
          notes.filter((note) => note.title.toLowerCase().includes(search.toLowerCase())).map((note) => (
            <NoteItem key={note.id} updateNote={updateNote} note={note} />
          ))
        ) : (
          <p className="mx-1">No notes found</p>
        )}
      </div>

      {/* Tailwind CSS Modal */}
      <div className="fixed z-10 inset-0 overflow-y-auto hidden" aria-labelledby="modal-title" role="dialog" aria-modal="true" ref={ref}>
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
          <div
            className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <div className="bg-[#28231D] px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="container">
                <div className="mb-3">
                  <label htmlFor="etitle" className="block text-lg font-medium text-[#ECEE81]">
                    Title
                  </label>
                  <input
                    type="text"
                    value={note.etitle}
                    className="mt-1 p-2 text-black w-full border rounded-md"
                    id="etitle"
                    name="etitle"
                    placeholder="Add a title.."
                    onChange={onChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="block text-lg font-medium text-[#82A0D8]">
                    Description
                  </label>
                  <textarea
                    className="mt-1 p-2 w-full text-black border rounded-md"
                    value={note.edescription}
                    id="edescription"
                    name="edescription"
                    rows="1"
                    onChange={onChange}
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label htmlFor="edueDate" className="block text-lg font-medium text-[#EDB7ED]">
                    Due Date
                  </label>
                  <input
                    type='datetime-local'
                    className="mt-1 p-2 text-black w-full border rounded-md"
                    defaultValue={formatDateTime(note.edueDate)}
                    id="edueDate"
                    name="edueDate"
                    onChange={onChange}
                  ></input>
                </div>
              </div>
            </div>
            <div className="bg-[#28231D] px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                type="button"
                className="mx-4 max-w-sm bg-gradient-to-r from-indigo-500 via-pink-500 to-yellow-500 hover:from-indigo-600 hover:via-pink-600 hover:to-red-600 focus:outline-none text-white text-md uppercase font-bold shadow-md rounded-lg px-4 py-2"
                onClick={saveChanges}
              >
                Update note
              </button>
              <button
                type="button"
                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white hover:bg-red-300 bg-red-500 border border-transparent rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                onClick={() => ref.current.classList.add('hidden')}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Notes;