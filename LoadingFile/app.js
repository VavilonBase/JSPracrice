import {initializeApp} from 'firebase/app'
import {getStorage, ref, uploadBytesResumable, getDownloadURL} from 'firebase/storage'
import {upload} from './upload'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDhdqcdsKfGSn4mTt4CkzG561uMvwSaXlA",
    authDomain: "fe-upload-ac34e.firebaseapp.com",
    projectId: "fe-upload-ac34e",
    storageBucket: "fe-upload-ac34e.appspot.com",
    messagingSenderId: "32290591357",
    appId: "1:32290591357:web:29cbd8e3e9988d19f09714"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

const storage = getStorage(app)


upload('#file', {
    multi: true,
    accept: ['.png', '.jpg', '.jpeg', '.gif'],
    onUpload(files, blocks) {
        files.forEach((file, index) => {
            console.log(`images/${file.name}`)

            const storageRef = ref(storage,`images/${file.name}`)
            const uploadTask = uploadBytesResumable(storageRef, file)
            uploadTask.on('state_changed', snapshot => {
                const percentage = ((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(0) + '%'
                const block = blocks[index].querySelector('.preview-info-progress')
                block.textContent = percentage
                block.style.width = percentage
            }, error => {
                console.log(error)
            }, () => {
                getDownloadURL(uploadTask.snapshot.ref).then(url => {
                    console.log('Download URL', url)
                })
            })
        })
    }
})