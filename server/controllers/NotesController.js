const Note = require('../models/Note');

const getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.json(notes);
  } catch (error) {
    console.error('Error fetching notes:', error);
    res.status(500).json({ message: 'Error fetching notes' });
  }
};

const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;
    await Note.findOneAndDelete({ _id: id, userId: req.userId });
    res.json({ message: 'Note deleted' });
  } catch (error) {
    console.error('Error deleting note:', error);
    res.status(500).json({ message: 'Error deleting note' });
  }
};

const createNote = async (req, res) => {
  try {
    const { title, description, type } = req.body;
    const note = await Note.create({ userId: req.userId, title, description, type });
    res.status(201).json(note);
  } catch (error) {
    console.error('Error creating note:', error);
    res.status(500).json({ message: 'Error creating note' });
  }
};

const updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, type } = req.body;
    const updatedNote = await Note.findOneAndUpdate(
      { _id: id, userId: req.userId },
      { title, description, type },
      { new: true }
    );

    if (!updatedNote) {
      return res.status(404).json({ message: 'Note not found' });
    }

    res.json(updatedNote);
  } catch (error) {
    console.error('Error updating note:', error);
    res.status(500).json({ message: 'Error updating note' });
  }
};

module.exports = {
  getNotes,
  deleteNote,
  createNote,
  updateNote
};
