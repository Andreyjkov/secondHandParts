import { getAuth } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

import { db } from "../../firebase";



const setDataFirebase = async () => {
    // const auth = getAuth();
    // const email = auth.currentUser?.email

    // const data = {
    //     ...formData,
    //     userOwn: email,
    // }

    // try {
    //     const docRef = await setDoc(doc(db, "base"), data);
    //     console.log("Document written with ID: ", docRef);
    // } catch (e) {
    //     console.error("Error adding document: ", e);
    // }
}

export default setDataFirebase;
