import { useEffect, useState } from "react";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { db, auth } from "../firebase_setup/firebase";

function Home({ isAuth }) {
  const [postList, setPostList] = useState([] as any);

  const postsCollectionRef = collection(db, "posts");

  const deletePost = async (id) => {
    const postDoc = doc(db, "posts", id);
    await deleteDoc(postDoc);
  };

  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(postsCollectionRef);
      setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getPosts();
  }, [deletePost]);

  return (
    <div className="flex justify-center flex-col items-center">
      {postList.map((post) => {
        return (
          <div
            key={post.id}
            className="w-8/12 max-h-96 rounded overflow-hidden shadow-lg my-5"
          >
            {/* Add Images */}
            {/* <img
              className="w-full"
              src="/img/card-top.jpg"
              alt="Sunset in the mountains"
            /> */}
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2 flex justify-between">
                {post.title}
                <div className="deletePost">
                  {isAuth && post.author.id === auth?.currentUser?.uid && (
                    <button
                      onClick={() => {
                        deletePost(post.id);
                      }}
                    >
                      &#128465;
                    </button>
                  )}
                </div>
              </div>
              <p className="text-gray-700 text-base">{post.postText}</p>
            </div>
            <div className="px-6 pt-4 pb-2">
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                @{post.author.name}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Home;
