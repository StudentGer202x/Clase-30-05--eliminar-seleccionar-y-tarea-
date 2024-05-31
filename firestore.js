// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js"
import { addDoc, collection, deleteDoc, doc,getDoc, getFirestore, onSnapshot } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-firestore.js"
// DOCUMENTANCIÓN: 
// https://firebase.google.com/docs/web/setup#available-libraries

//configuración de la app de firebase, poner su configuración 
const firebaseConfig = {
    apiKey: "AIzaSyBY_-SUgdITB-CXwOVDmuxjA6MmmaA7M8I",
    authDomain: "test1-75b08.firebaseapp.com",
    projectId: "test1-75b08",
    storageBucket: "test1-75b08.appspot.com",
    messagingSenderId: "679034674176",
    appId: "1:679034674176:web:52575678e2b6b01d688ce5"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
//getFirestore función que permite retornar la base de datos para su utilización 
const db = getFirestore(app)
//función para guardar un registro 
export const save = (emp) => {
    //addDoc es una función de firestore que permite añadir un nuevo documento
    //colletion es una función de firesotre que permite recibir la db y la colección
    addDoc(collection(db, 'Empleados'), emp)
}
//función para traer todos los documentos de la colección 
export const getData = (data) => {
    //onSnapshot es la función que permite retornar la colección y asigarla a una variable
    onSnapshot(collection(db, 'Empleados'), data)
}

//función eliminar un registro de la colección 
export const remove = (id) => {
    //deleteDoc permite eliminar un documento de la colección 
    //doc permite buscar un documento según su id 
    deleteDoc(doc(db, 'Empleados', id))
}

//obetener documento 
export const getDocumento = (id) => getDoc(doc(db,'Empleados',id))