import { initializeApp } from 'firebase/app'
import {
    getFirestore, collection, onSnapshot,
    addDoc, deleteDoc, doc,
    query, where,
    orderBy, serverTimestamp,
    getDoc, updateDoc
} from 'firebase/firestore'

import {
    getAuth,
    createUserWithEmailAndPassword
} from 'firebase/auth'

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
const auth = getAuth()


// collection ref
const colRef = collection(db, 'books')


// queries
const q = query(colRef, orderBy('createdAt'))

// real time collection data 
onSnapshot(colRef, (snapshot) => {
    let books = []
    snapshot.docs.forEach((doc) => {
        books.push({ ...doc.data(), id: doc.id })
    })
    console.log(books)
})

 // adding documents
const addBookForm = document.querySelector('.add')
addBookForm.addEventListener('submit', (e) => {
    e.preventDefault()

    addDoc(colRef, {
        title: addBookForm.title.value,
        author: addBookForm.author.value,
        createdAt: serverTimestamp()
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

// // get a single document
// const docRef = doc(db, 'books', 'd7r3Ypoj5AWpdvdTmF43')

// onSnapshot(docRef (doc) => {
//     console.log(doc.data(), doc.id)
// })

// updating a document
const updateForm = document.querySelector('.update')
updateForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const docRef = doc(db, 'books', updateForm.id.value)

    updateDoc(docRef, {
        title: 'updated title'
    })
    .then(() => {
        updateForm.reset()
    })

})

// signing users up
const signupForm = document.querySelector('.signup')
signupForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const email = signupForm.email.value
    const password = signupForm.password.value

    createUserWithEmailAndPassword(auth, email, password).then((cred) => {
        console.log('user created: ', cred.user)
        signupForm.reset()
    }).catch((error) => {
        console.log(error.message)
    })
})