import { useState } from "react";
import Image from "next/image";
import { firestore } from "../../firebase";
import { getDoc, doc, collection, addDoc, getDocs, updateDoc, deleteDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { toast } from 'react-toastify';
import { FaTrashAlt } from "react-icons/fa"

export default function Story({ story, user, comments }) {
    const [comment, setComment] = useState("")
    const [allComments, setAllComments] = useState(comments)
    const router = useRouter()
    const { id } = router.query

    const handleComment = async (e) => {
        e.preventDefault()

        if (!user) {
            toast.error("You must Log In First!", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } else {
            await addDoc(collection(doc(firestore, "stories", id), "comments"), {
                text: comment,
                username: user.displayName
            })
        }

        const commentsQuery = await getDocs(collection(doc(firestore, "stories", id), "comments"))
        setAllComments(commentsQuery.docs.map(docSnap => docSnap.data()))

        setTimeout(function () {
            window.location.reload()
        }, 1000)

    }
    
    const deleteStory = async (id) => {
        {/* 
        
        await deleteDoc(doc(firestore, "stories", id))
        setTimeout(() => {
            toast.success('Story Has Been Deleted!', {
                position: "top-center",
                autoClose: 1800,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

            router.push('/')
        }, 500);
        
        */}
        
        toast.warning('Permission Denied!', {
            position: "top-center",
            autoClose: 1800,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        
        setTimeout(() => {
            toast.info('Only Admins are able to Delete!', {
            position: "top-center",
            autoClose: 1800,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        }, 1000);
        
    }

    return (
        <>
            <div className="container-lg my-5">

                <div className="row  text-center justify-content-center">

                    <div className="rounded">
                        <Image src={story.imageUrl} alt={story.title} height="300px" width="200px" />
                    </div>
                    <h2 className="lead fw-bold mt-5">{story.title}</h2>
                    <h4 className="lead text-primary fw-bold my-5">Written By {story.postedBy} </h4>
                    <p className="lead">{story.body}</p>

                    <div className="justify-content-center py-5">
                        <button className="btn btn-danger lead fw-bold text-white text-decoration-none" onClick={() => deleteStory(id)}><FaTrashAlt className="mb-1 mx-1" />Delete</button>
                    </div>

                    <form className="row justify-content-center">
                        <div className="mb-2">
                            <input type="text" placeholder="Add a Comment" className="form-control" value={comment} onChange={(e) => setComment(e.target.value)} />
                        </div>
                        <div>
                            <button className="btn btn-primary" onClick={handleComment}>Comment</button>
                        </div>
                    </form>

                    <hr className="my-5" />

                    <div className="text-start">
                        {allComments.map(item => {
                            return <div key={item.username}>
                                <h4 className="fw-bold fs-5">{item.username}<span className="lead fw-normal fs-6 mx-2">{item.text}</span></h4>
                            </div>
                        })}
                    </div>

                </div>
            </div>
        </>
    )

}


export async function getServerSideProps({ params: { id } }) {

    const result = await getDoc(doc(firestore, "stories", id))
    const commentSnapshot = await getDocs(collection(doc(firestore, "stories", id), "comments"))

    const comments = commentSnapshot.docs.map(CommentSnap => CommentSnap.data())

    return {
        props: {
            story: {
                ...result.data(),
                createdAt: result.data().createdAt.toMillis()
            },
            comments
        }
    }
}
