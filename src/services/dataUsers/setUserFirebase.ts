import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";

export interface IUserData {
  email: string;
  name: string;
  phone: string
}

const setUserFirebase = async (userInfo: IUserData) => {
  const data = {
    ...userInfo,
  }
  try {
    await setDoc(doc(db, "users", userInfo.email), data);
    console.log("Document written with ID: ");
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export default setUserFirebase;
