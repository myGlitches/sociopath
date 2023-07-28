import { useState, useEffect } from "react";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../firebase_setup/firebase";
import { useNavigate } from "react-router-dom";

function CreatePost({ isAuth }) {
  const [title, setTitle] = useState("");
  const [postText, setPostText] = useState("");

  const postsCollectionRef = collection(db, "posts");

  let navigate = useNavigate();

  const createPost = async () => {
    await addDoc(postsCollectionRef, {
      title,
      postText,
      author: {
        name: auth.currentUser?.displayName,
        id: auth.currentUser?.uid,
      },
    });
    navigate("/");
  };

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, []);

  return (
    <div>
      <div className="container mx-auto px-4 py-4 bg-gray-500 flex flex-col w-96 mt-36 rounded-xl">
        <div className="flex justify-center items-center">
          <h1 className="text-4xl text-white font-semibold">Create a Post</h1>
        </div>
        <div className="cpContainer flex flex-col">
          <div className="cpInput flex flex-col">
            <label className="text-2xl text-white py-4" htmlFor="">
              Title :
            </label>
            <input
              className="rounded-sm p-2"
              type="text"
              placeholder="Title..."
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </div>
          <div className=" flex flex-col">
            <label className="text-2xl text-white py-4" htmlFor="">
              Post :
            </label>
            <textarea
              className="rounded-sm p-2 max-h-36"
              name=""
              id=""
              placeholder="Post..."
              onChange={(e) => {
                setPostText(e.target.value);
              }}
            ></textarea>
          </div>
          <button
            className="rounded-sm p-2 text-white bg-slate-800 hover:bg-slate-400 hover:text-black mt-4"
            type="submit"
            onClick={createPost}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreatePost;
