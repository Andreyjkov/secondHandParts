import { getAuth } from "firebase/auth";
import { addDoc, collection, doc, getDoc } from "firebase/firestore";
import { IFormData } from "../../components/AddPositionForm/AddPositionForm";
import { db } from "../../firebase";

interface IAddDataFirebase {
  name: string;
  phone: string;
  userOwn: string;
  brand: string;
  model: string;
  parts: string;
  description: string;
}

const addDataFirebase = async (formData: IAddDataFirebase) => {
  try {
    await addDoc(collection(db, "base"), formData);
    console.log("Document Add ");
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export default addDataFirebase;
