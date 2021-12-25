import {
  BookmarkIcon,
  ChatIcon,
  DotsHorizontalIcon,
  EmojiHappyIcon,
  HeartIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/outline";
import { HeartIcon as HeartIconFilled } from "@heroicons/react/solid";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  serverTimestamp,
  query,
  setDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import Moment from "react-moment";

function Post({ id, username, userImg, img, caption }) {
  const { data: session } = useSession();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);
  const [hasliked, setHasliked] = useState(false);

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "posts", id, "comments"),
          orderBy("timestamp", "desc")
        ),
        (snapshot) => setComments(snapshot.docs)
      ),
    [db]
  );
  useEffect(
    () =>
      onSnapshot(collection(db, "posts", id, "likes"), (snapshot) =>
        setLikes(snapshot.docs)
      ),
    [db, id]
  );
  useEffect(
    () =>
      setHasliked(
        likes.findIndex((like) => like.id === session?.user?.uid) !== -1
      ),
    [likes]
  );

  const likePost = async () => {
    if (hasliked) {
      await deleteDoc(doc(db, "posts", id, "likes", session.user.uid));
    } else {
      await setDoc(doc(db, "posts", id, "likes", session.user.uid), {
        username: session.user.username,
      });
    }
  };

  const sendComment = async (e) => {
    e.preventDefault();

    const commentToSend = comment;
    setComment("");

    await addDoc(collection(db, "posts", id, "comments"), {
      comment: commentToSend,
      userImage: session.user.image,
      username: session.user.username,
      timestamp: serverTimestamp(),
    });
  };

  return (
    <div className="bg-white my-7 border rounded-sm">
      <div className="flex items-center px-5 py-2">
        <img
          src={userImg}
          className="rounded-full h-12 w-12 object-contain border p-1"
        />
        <p className="flex-1 font-bold">{username}</p>
        <DotsHorizontalIcon className="h-5" />
      </div>

      {/* Image */}
      <img src={img} className="object-cover w-full" />

      {/* Buttons */}
      {session && (
        <div className="flex justify-between px-4 py-2">
          <div className="flex space-x-4">
            {hasliked ? (
              <HeartIconFilled
                onClick={likePost}
                className="btn scale-105 text-red-500"
              />
            ) : (
              <HeartIcon onClick={likePost} className="btn" />
            )}
            {/* <ChatIcon className="btn" /> */}
            <PaperAirplaneIcon className="btn rotate-45" />
          </div>
          <BookmarkIcon className="btn" />
        </div>
      )}

      {/* Caption */}
      <p className="px-4 py-2">
        {likes.length > 0 && (
          <p className="font-bold mb-1">{likes.length} likes</p>
        )}
        <span className="font-bold">{username} </span>
        <span>{caption}</span>
      </p>

      {/* Comments */}
      {comments.length > 0 && (
        <div className="ml-10 h-20 overflow-y-scroll scrollbar-thumb-black scrollbar-thin">
          {comments.map((comment) => (
            <div key={comment.id} className="flex items-center space-x-2 mb-3">
              <img
                className="h-7 rounded-full"
                src={comment.data().userImage}
                alt=""
              />
              <p className="text-sm flex-1">
                <span className="font-bold">{comment.data().username}</span>{" "}
                {comment.data().comment}
              </p>
              <Moment fromNow className="pr-5 text-xs">
                {comment.data().timestamp?.toDate()}
              </Moment>
            </div>
          ))}
        </div>
      )}
      {/* Input box/ Add comment */}
      {session && (
        <form className="flex items-center p-4">
          <EmojiHappyIcon className="btn" />
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a comment..."
            className="border-none flex-1 focus:ring-0 outline-none"
          />
          <button
            type="sumbit"
            disabled={!comment}
            // disabled={!comment.trim()} // error- comment.trim() is not a function
            onClick={sendComment}
            className="font-semibold text-blue-600"
          >
            Post
          </button>
        </form>
      )}
    </div>
  );
}

export default Post;
