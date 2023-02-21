import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";

export interface IUserData {
  email: string;
  name: string;
  phone: string
}

const setUserFirebase = async (userInfo: IUserData) => {
  const docRef = doc(db, "users", userInfo.email)
  const payload = { ...userInfo }

  try {
    await setDoc(docRef, payload);
    console.log("Document written with ID: ");
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export default setUserFirebase;
