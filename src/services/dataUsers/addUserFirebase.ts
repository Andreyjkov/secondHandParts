import { getAuth } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { IFormData } from "../../components/AddPositionForm/AddPositionForm";
import { db } from "../../firebase";


export const addUserFirebase = async (userInfo: IFormData) => {
  const auth = getAuth();
  const email = auth.currentUser?.email

  const data = {
    ...userInfo,
  }

  console.log('data: ', data);

  try {
    await addDoc(collection(db, "users", ), data);
    console.log("Document written with ID: ");
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}