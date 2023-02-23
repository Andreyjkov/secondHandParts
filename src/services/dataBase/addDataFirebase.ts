import { addDoc, collection } from "firebase/firestore";
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
  const collectionRef = collection(db, "base")
  const payload = formData
  try {
    const docRef = await addDoc(collectionRef, payload);
    console.log("Document Add ");
    return docRef
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export default addDataFirebase;
