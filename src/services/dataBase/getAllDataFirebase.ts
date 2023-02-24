import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

import { IBaseData } from "../../interface";

const getAllDataFirebase = async () => {
  const querySnapshot = await getDocs(collection(db, 'base'));

  const baseArr: IBaseData[] = []
  querySnapshot.forEach((doc) => {
    const data = doc.data()

    baseArr.push({
      docId: doc.id,
      brand: data.brand,
      description: data.description,
      model: data.model,
      name: data.name,
      parts: data.parts,
      phone: data.phone,
      userOwn: data.userOwn
    })
  });

  return baseArr
}

export default getAllDataFirebase;
