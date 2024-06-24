"use client";
import { useFormState } from "react-dom";
import { shorten } from "../action";

// type PostType = {
//   id: number;
//   title: string;
//   body: string;
//   tags: string[];
//   reactions: Reactions;
//   views: number;
//   userId: number;
// };
// type Reactions = {
//   likes: number;
//   dislikes: number;
// };

// const fetchPosts = async () => {
//   const request = await fetch(
//     `https://dummyjson.com/posts/${Math.floor(Math.random() * 100)}`
//   );
//   const posts = await request.json();
//   return posts;
// };

export default function Home() {
  const [state, formAction] = useFormState(shorten, { status: "" });
  return (
    <main className="">
      <h1>URL Shortener</h1>
      <form action={formAction}>
        <input
          className="text-black"
          type="text"
          name="url"
          placeholder="Type URL here"
        ></input>
        <button type="submit" className="bg-rose-300">
          Shorten
        </button>
      </form>
    </main>
  );
}
