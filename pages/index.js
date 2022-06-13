import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { firestore } from "../firebase"
import { collection, getDocs, orderBy, limit, query, startAfter } from "firebase/firestore"

export default function Home({ allStories }) {

  const [stories, setStories] = useState(allStories)
  const [end, setEnd] = useState(false)

  const loadMore = async () => {
    const last = stories[stories.length - 1]
    const res = await getDocs(query(collection(firestore, "stories"), orderBy('createdAt', 'desc'), startAfter(new Date(last.createdAt)), limit(6)))
    const newStories = res.docs.map(docSnap => {
      return {
        ...docSnap.data(),
        createdAt: docSnap.data().createdAt.toMillis(),
        id: docSnap.id
      }
    })

    setStories(stories.concat(newStories))
    if (newStories.length < 6) {
      setEnd(true)
    }
  }

  return (
    <>
      <div className="container-lg my-5">
        <div className="row align-items-center align-content-center">
          <div className="col-md-6 mt-5 mt-md-0">
            <div className="text-center">
              <Image src="/home.png" alt="Home" height="350px" width="450px" />
            </div>
          </div>
          <div className="col-md-6 mt-5 mt-md-0 order-md-first">
            <div>
              <h1 className="text-primary text-uppercase fs-1 fw-bold">Share Stories with Everyone!</h1>
              <p className="mt-4 text-muted">Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam, tenetur
                sequi odit ipsam iusto cupiditate totam aut eligendi dolorem vero, repudiandae magni laudantium
                illum impedit nulla quis et, at omnis?</p>
              <Link href="/Create"><button className="btn btn-primary px-3 my-3 fw-bold">Write a Story</button></Link>
            </div>
          </div>
        </div>

        <div className="my-5">

          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="text-center">
                <h2 className="fw-bold mb-5">Latest Stories</h2>
              </div>
            </div>
          </div>

          <div className="row">
            {stories.map(story => {
              return (
                <div key={story.createdAt} className="col-md-6 col-lg-4 text-center text-decoration-none">
                  <div className="shadow rounded">
                    <Image src={story.imageUrl} alt="" height="300px" width="200px" />
                  </div>
                  <h2 className="lead fw-bold my-5">{story.title}</h2>
                  <Link href={`/Story/${story.id}`}><button className="btn btn-primary text-white lead fw-bold mb-5">Read More</button></Link>
                </div>
              )
            })}
          </div>

          <div className="align-items-center align-content-center text-center mt-5">
            {end == false ?
              <button className="btn btn-primary text-white lead fw-bold text-decoration-none" onClick={() => loadMore()}>Load More</button>
              :
              <h3 className="text-secondary fw-bold fs-2">You reached the end..</h3>

            }
          </div>
        </div>
      </div>
    </>
  )
}

export async function getServerSideProps(context) {

  const querySnapshot = await getDocs(query(collection(firestore, "stories"), orderBy('createdAt', 'desc'), limit(6)))

  const allStories = querySnapshot.docs.map(docSnap => {
    return {
      ...docSnap.data(),
      createdAt: docSnap.data().createdAt.toMillis(),
      id: docSnap.id
    }
  })

  return {
    props: { allStories },
  }
}
