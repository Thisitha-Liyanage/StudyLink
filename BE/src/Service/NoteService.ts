import Note from "../Models/Note";

export const createNote = async (
  userId: string,
  title: string,
  content: string
) => {
  const note = new Note({
    userId,
    title,
    content,
  });

  return await note.save();
};

export const getNotesByUserId = async (
  userId: string
) => {
  return await Note.find({ userId })
    .sort({ createdAt: -1 });
};

export const getNoteById = async (id: string) => {
  return await Note.findById(id);
};

export const updateNote = async (
  id: string,
  title: string,
  content: string
) => {
  return await Note.findByIdAndUpdate(
    id,
    { title, content },
    { new: true }
  );
};

export const deleteNote = async (id: string) => {
  return await Note.findByIdAndDelete(id);
};

export const getNotesByUserService = async (userId: string) => {
  return await Note.find({ userId })
    .sort({ updatedAt: -1 });
};