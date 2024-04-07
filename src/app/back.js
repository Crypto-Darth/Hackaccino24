import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get, child } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB_0KMxFTCsqY05NaQGqvPfB460tIAIsiE",
    authDomain: "hackaccino24.firebaseapp.com",
    databaseURL: "https://hackaccino24-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "hackaccino24",
    storageBucket: "hackaccino24.appspot.com",
    messagingSenderId: "708074645866",
    appId: "1:708074645866:web:ddbafe33a21f9f45445d13"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getDatabase(app);








const getdata = async(lvl) => {    
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const dbRef = ref(getDatabase());
    await get(child(dbRef, `/`)).then((snapshot) => {
        return snapshot.val()

    }).catch((error) => {
        console.error(error);
    });
}

export default getdata