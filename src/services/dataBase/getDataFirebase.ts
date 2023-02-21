import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";


const getDataFirebase = async (collectionName: string, docId: string) => {
  // const docRef = doc(db, collectionName, docId);
  // const docSnap = await getDoc(docRef);

  // if (docSnap.exists()) {
  //   console.log("Document data:", docSnap.data());
  // } else {
  //   console.log("No such document!");
  // }
}

export default getDataFirebase;
