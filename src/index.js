import { initializeApp } from 'firebase/app'
import {
    getFirestore, collection, getDocs,
    addDoc, deleteDoc, doc
} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDxE3m--hATNFKweAbtMTxoN7CYDMwmEco",
    authDomain: "fir-9-f0a43.firebaseapp.com",
    projectId: "fir-9-f0a43",
    storageBucket: "fir-9-f0a43.appspot.com",
    messagingSenderId: "630417697355",
    appId: "1:630417697355:web:5b0341e2c878cc6f663bce"
}

// init firebase app
initializeApp(firebaseConfig)

// init services
const db = getFirestore()


// collection ref
const colRef = collection(db, 'books')

// get collection data 
getDocs(colRef)
    .then((snapshot) =>{
        let books = []
        snapshot.docs.forEach((doc) => {
            books.push({ ...doc.data(), id: doc.id })
        })
        console.log(books)
    })
    .catch(error => {
        console.log(error.message)
    })

 // adding documents
const addBookForm = document.querySelector('.add')
addBookForm.addEventListener('submit', (e) => {
    e.preventDefault()

    addDoc(colRef, {
        title: addBookForm.title.value,
        author: addBookForm.author.value,
    })
    .then(() => {
        addBookForm.reset()
    })

})


// deleting documents
const deleteBookForm = document.querySelector('.delete')
deleteBookForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const docRef = doc(db, 'books', deleteBookForm.id.value)

    deleteDoc(docRef)
    .then(() => {
        deleteBookForm.reset()
    })


})