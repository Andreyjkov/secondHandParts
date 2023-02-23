import { doc, deleteDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { db } from "../../firebase";

const deleteDocFirebase = async (docId: string) => {
  const docRef = doc(db, "base", docId);

  try {
    await deleteDoc(docRef);
    console.log("Success document delete");

    toast.warn("Позиция удалена!", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  } catch (error) {
    console.error("Error delete document: ", error);
    toast.error(`Error delete document: ${error}`, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }
};

export default deleteDocFirebase;
