import { useState, useEffect } from "react"
import { storage, firestore } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { getDownloadURL, uploadBytesResumable, ref } from "firebase/storage";
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

export default function Create({ user }) {
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const [image, setImage] = useState(null)
    const [url, setUrl] = useState("")
    
    const router = useRouter()

    useEffect(() => {
        if (url) {
            try {
                addDoc(collection(firestore, "stories"), {
                    title,
                    body,
                    imageUrl: url,
                    postedBy: user.displayName,
                    createdAt: serverTimestamp(),
                })
                toast.success('Your Story Has Been Created!', {
                    position: "top-center",
                    autoClose: 1800,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                
                setTimeout(function () {
                    router.push('/')
                }, 1800)

            } catch (error) {
                toast.error(error.message, {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        }
    })

    const storageRef = ref(storage, `image/${uuidv4()}`)

    const submitStory = () => {
        if (!title || !body || !image) {
            toast.error('Empty Fields!', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

            return
        }

        var uploadImage = uploadBytesResumable(storageRef, image)

        uploadImage.on('state_changed', (snapshot) => {
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes * 100)
            if (progress == '100') toast.success('Image Uploaded', {
                position: "top-center",
                autoClose: 1800,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        },
            (error) => {
                toast.error(error.message, {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            },
            () => {
                getDownloadURL(uploadImage.snapshot.ref).then((downloadURL) => {
                    console.log('File available at', downloadURL);
                    setUrl(downloadURL)
                })
            })
    }
    
    useEffect(() => {
        if (!user) {
            router.push('/Login')
        }
    })

    return (
        <>
            {user ?
                <div className="container-lg my-5">

                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <div className="text-center">
                                <h2 className="fw-bold mb-5">Write Your Story</h2>
                            </div>
                        </div>
                    </div>

                    <div className="row justify-content-center text-center">

                        <div className="mb-3 rounded">
                            <input type="text" placeholder="Title" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} />
                        </div>

                        <div className="mb-3 rounded">
                            <textarea rows="20" cols="50000" placeholder="Story" className="form-control" value={body} onChange={(e) => setBody(e.target.value)}></textarea>
                        </div>

                        <div className="mb-5 rounded">
                            <input type="file" className="form-control" onChange={(e) => setImage(e.target.files[0])} />
                        </div>

                        <div className="mb-3 rounded">
                            <button type="submit" className="btn btn-primary" onClick={() => submitStory()}>Publish</button>
                        </div>

                    </div>

                </div>
                :
                <>
                </>
            }
        </>
    )
}
