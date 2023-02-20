import { initializeApp } from "firebase/app";
import { addDoc, collection, doc, getDoc, getDocs, getFirestore, setDoc } from "firebase/firestore";


const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STRAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
    // databaseURL: "https://second-hand-parts-870e7.firebaseio.com"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// console.log(db);


// db.collection("users").add({
//     first: "Ada",
//     last: "Lovelace",
//     born: 1815
// })
// .then((docRef) => {
//     console.log("Document written with ID: ", docRef.id);
// })
// .catch((error) => {
//     console.error("Error adding document: ", error);
// });
// const alovelaceDocumentRef = doc(db, 'users', '03NATzbmipspEUqD1mJu');
// // console.log(alovelaceDocumentRef);
// const usersCollectionRef = collection(db, 'users');
// const baseCollectionRef = collection(db, 'base');

// console.log('user: ', usersCollectionRef);
// console.log('base: ', baseCollectionRef);
const getExample = async () => {
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
    });
}
// getExample()