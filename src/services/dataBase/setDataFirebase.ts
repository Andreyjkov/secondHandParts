import { getAuth } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { IFormData } from "../../components/AddPositionForm/AddPositionForm";
import { db } from "../../firebase";



export const setDataFirebase = async (formData: IFormData) => {
    const auth = getAuth();
    const email = auth.currentUser?.email

    const data = {
        ...formData,
        userOwn: email,
        phone: '+375 29...',
        name: 'Andrey',
    }

    try {
        const docRef = await setDoc(doc(db, "base"), data);
        console.log("Document written with ID: ", docRef);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}