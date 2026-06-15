import api from "./api";
import * as pdfjsLib from "pdfjs-dist";
import workerSrc from "pdfjs-dist/build/pdf.worker.min?url";

pdfjsLib.GlobalWorkerOptions.workerSrc = workerSrc;

export const extractTextFromPDF = async (file: File) => {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

    let text = "";

    for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();

        text += content.items.map((item: any) => item.str).join(" ") + "\n";
    }

    return text.trim();
};

// Notes API
export const getNotes = async () => {
    const res = await api.get("/notes");
    return res.data;
};

export const updateNote = async (
    id: string,
    title: string,
    content: string
) => {
    const res = await api.put(`/notes/${id}`, {
        title,
        content,
    });

    return res.data;
};


export const createNote = async (title: string, content: string) => {
    const res = await api.post("/notes", { title, content });
    return res.data;
};

export const deleteNote = async (id: string) => {
    const res = await api.delete(`/notes/${id}`);
    return res.data;
};

export const getNoteById = async (id: string) => {
    const res = await api.get(`/notes/${id}`);
    return res.data;
};

export const getMyNotes = async () => {
  const res = await api.get("/notes/my");
  return res.data;
};
