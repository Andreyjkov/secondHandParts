import { addDoc, collection } from "firebase/firestore";
import { toast } from "react-toastify";
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
    toast.success('Позиция добавлина успешно!', {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    return docRef
  } catch (e) {
    console.error("Error adding document: ", e);
    toast.error(`Error adding document${e}`, {
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
}

export default addDataFirebase;
