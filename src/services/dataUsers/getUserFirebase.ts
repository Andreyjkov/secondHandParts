import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";


const getUserFirebase = async (collectionName: string, docId: string) => {
  const docRef = doc(db, collectionName, docId);
  try {
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data()
    } else {
      console.log("No such document!");
      return null
    }

  } catch (error) {
    console.error("Error get document: ", error);
  }


}

export default getUserFirebase;
