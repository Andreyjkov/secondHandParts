import { doc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
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
    toast.success('Данные изменены успешно!', {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  } catch (e) {
    console.error("Data not changed");
    toast.error('', {
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

export default setUserFirebase;
