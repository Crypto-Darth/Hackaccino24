"use client"
import Image from "next/image";
import logo from './ai.png'
import logo2 from './Logo.png'
import pfp from './pfp.png'
import { useState,useEffect } from "react";
// import getdata from "./back";
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
const dbRef = ref(getDatabase());




export default function Home() {
 
  const [level,setLevel] = useState(101)
  const [value,setValue] = useState("[['Name',30,'M','Dabra'],[40,101,30],[[''1-2-24 Visit 1','https://firebasestorage.googleapis.com/v0/b/hackaccino24.appspot.com/o/p1%2Fv11.pdf?alt=media&token=e2e411d6-3209-4470-8d2c-76a40caa49d3'],[''1-2-24 Visit 1','https://firebasestorage.googleapis.com/v0/b/hackaccino24.appspot.com/o/p1%2Fv12.pdf?alt=media&token=548cc23a-f23a-4f41-8021-7783fb8831b7'],[''3-2-24 Visit 1','https://firebasestorage.googleapis.com/v0/b/hackaccino24.appspot.com/o/p1%2Fv12.pdf?alt=media&token=548cc23a-f23a-4f41-8021-7783fb8831b7'],[''5-2-24 Visit 1','https://firebasestorage.googleapis.com/v0/b/hackaccino24.appspot.com/o/p1%2Fv13.pdf?alt=media&token=4fbd5154-6f12-46ea-a5a3-2c3e20dc3e38'],[''7-2-24 Visit 1','https://firebasestorage.googleapis.com/v0/b/hackaccino24.appspot.com/o/p1%2Fv14.pdf?alt=media&token=ef82bc52-a529-480b-9342-dcf080166ce9'],[''9-2-24 Visit 1','https://firebasestorage.googleapis.com/v0/b/hackaccino24.appspot.com/o/p1%2Fv1b1.pdf?alt=media&token=974cca9b-7bf6-4187-ae06-9acc72db6290'],[''9-2-24 Visit 1','https://firebasestorage.googleapis.com/v0/b/hackaccino24.appspot.com/o/p1%2Fv5.pdf?alt=media&token=0f19c82c-dcec-4429-b8b4-00aea0d7c941']]]")


  useEffect(() => {
    get(child(dbRef, `/`)).then((snapshot) => {
      const x = snapshot.val()
      setValue(Array(x[level]))

  })
  }, [])

  console.log(value)

 
console.log(value[0][0])
  return (
    

    <>

      <div className="grid grid-cols-7 grid-rows-6 gap-6 h-screen rounded-lg p-5 bg-[#2D2D2D]">
        <div className="col-span-7 rounded-lg">
          <Image src={logo2} />
          <select onChange={(e)=>{setLevel(e.target.value)}}>
            <option value={101}>User 1</option>
            <option value={102}>User 2</option>
            <option value={103}>User 3</option>
          </select>
        </div>
        <div className="col-span-5 row-span-2 row-start-2 bg-[#8A8A8A50] rounded-xl border-8 border-indigo-500">
            <Image src={logo} className="flex m-5"/>
            <h1 className="flex p-5">Loading</h1>
          </div>
        <div className="col-span-2 row-span-5 col-start-6 row-start-2 justify-center items-center bg-blue-600 p-20 bg-[#8A8A8A50] rounded-xl border-8 border-indigo-500">
          <Image src={pfp} className="w-40 h-40 p-50 m-50 rounded-full"/>
          <h1 className=" mt-10">Name : {value[0][0]}</h1>
          <h1 className=" mt-10">Age : {value[0][1]}</h1>
          <h1 className=" mt-10">Gender :{value[0][2]} </h1>
          <h1 className=" mt-10">Address : {value[0][3]}</h1>

        </div>
        <div className="col-span-2 row-span-3 row-start-4 bg-blue-400 bg-[#8A8A8A50] rounded-xl border-8 border-indigo-500">
          <h1 className="m-5 p-15">Patient's Current Status</h1>
          <h2 className="p-50">Weight : </h2>
          <h2 className="p-50">Temperature : </h2>
          <h2 className="p-50">Blood Pressure : </h2>
        </div>
        <div className="col-span-3 row-span-3 col-start-3 row-start-4 bg-blue-500 bg-[#8A8A8A50] rounded-xl border-8 border-indigo-500">
          <h1 className="m-2 p-5">Files</h1>
          <div className="bg-blue-400 w-1/2 h-12 m-6 rounded-xl"></div>

        </div>
      </div>

    </>

  );
}
