import React, { useEffect, useState, useCallback } from 'react';
import Navbar from '../components/Navbar';
import Notes from '../components/Notes';
import NoteModal from '../components/NoteModal';
import apiCalls from '../utils/api';

const { fetchNotes, addNote, updateNote, deleteNote }=apiCalls

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [notes, setNotes] = useState([]);
  const [modalState, setModalState] = useState({
    mode: 'add',     
    editNoteId: null,  
    initialData: undefined, 
  });
  
  const fetchNotesData = useCallback(async () => {
    try {
      const res = await fetchNotes();
      setNotes(res.data);
    } catch (error) {
      console.error('Failed to fetch notes:', error);
    }
  }, []);

  useEffect(() => {
    fetchNotesData();
  }, [fetchNotesData]);

  const handleAddNote = () => {
    setModalState({ mode: 'add', editNoteId: null, initialData: undefined });
    setShowModal(true);
  };

  const handleEditNote = (note) => {
    setModalState({ mode: 'edit', editNoteId: note._id, initialData: note });
    setShowModal(true);
  };

  const handleDeleteNote = async (id) => {
    try {
      await deleteNote(id);
      setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
    } catch (error) {
      console.error('Failed to delete note:', error);
    }
  };

  const handleSubmitNote = async (note) => {
    try {
      if (modalState.mode === 'add') {
        const res=await addNote(note);
        setNotes((prevNotes) => [res.data, ...prevNotes]);
      } else if (modalState.editNoteId) {
        const res=await updateNote(modalState.editNoteId, note);
        setNotes((prevNotes) =>
          prevNotes.map((n) => (n._id === modalState.editNoteId ? res.data : n))
        );
      }
      setShowModal(false);
    } catch (error) {
      console.error('Failed to submit note:', error);
    }
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden relative">
      <Navbar />
      <div className="flex-1 overflow-y-auto">
        <Notes
          notes={notes}
          onAddNote={handleAddNote}
          onEditNote={handleEditNote}
          onDeleteNote={(id) => handleDeleteNote(id)}
        />
      </div>

      {showModal && (
        <div className="w-screen fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black opacity-50 z-40"></div>
          <div className="relative z-50 w-full max-w-xs md:max-w-xl px-2 md:px-3">
            <NoteModal
              mode={modalState.mode}
              initialData={modalState.initialData}
              onClose={() => setShowModal(false)}
              onSubmit={handleSubmitNote}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
