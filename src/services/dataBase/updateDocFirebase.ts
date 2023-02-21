import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { IFormData } from "../../pages/AddPosition";

const updateDocFirebase = async (docId: string, newData: IFormData) => {
  const docRef = doc(db, "base", docId);
  const payload = { ...newData }

  try {
    await updateDoc(docRef, payload);
    console.log("Success document update");

  } catch (error) {
    console.error("Error update document: ", error);
  }
}

export default updateDocFirebase;
