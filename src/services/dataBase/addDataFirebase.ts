import { getAuth } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { IFormData } from "../../components/AddPositionForm/AddPositionForm";
import { db } from "../../firebase";


const addDataFirebase = async (formData: IFormData) => {
  const auth = getAuth();
  const email = auth.currentUser?.email

  const data = {
    ...formData,
    userOwn: email,
    phone: '+375 29 ....',
    name: 'Andrey',
  }

  console.log('data: ', data);

  try {
    await addDoc(collection(db, "base"), data);
    console.log("Document written with ID: "/* , docRef.id */);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export default addDataFirebase;
