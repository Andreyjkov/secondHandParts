import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase";

const deleteDocFirebase = async (docId: string) => {
  const docRef = doc(db, "base", docId);

  try {
    await deleteDoc(docRef);
    console.log("Success document delete");
  } catch (error) {
    console.error("Error delete document: ", error);
  }
}

export default deleteDocFirebase;