import React from 'react';
import {storage} from '../contexts/FBConnection';
import {ref, uploadBytesResumable, getDownloadURL} from "firebase/storage"

const uploadImage = async (uri, setURL, id) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    const filename = id + '.jpg';
    const storageRef = ref(storage, `images/${filename}`);
    const uploadTask = uploadBytesResumable(storageRef, blob);
    uploadTask.on('state_changed', 
    (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
            case 'paused':
                console.log('Upload is paused');
                break;
            case 'running':
                console.log('Upload is running');
                break;
        }
    }, 
    (error) => {
        console.log(error);
    }, 
    () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setURL(downloadURL);
        });
    });
}

export default uploadImage;
