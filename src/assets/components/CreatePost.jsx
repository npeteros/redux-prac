import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { addPost } from "../lib/reducers/postReducer";

export default function CreatePost() {

    const [post, setPost] = useState('')
    const dispatch = useDispatch()

    const auth = useSelector(state => state.authReducer);

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(addPost({
            token: auth.token.token,
            user: auth.user,
            data: post
        }))
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-2xl w-full flex flex-col h-full justify-center items-start gap-2"
        >
            <textarea
                className="w-full border border-neutral-600 rounded-md px-4 py-2 placeholder:text-neutral-500"
                placeholder="What&apos;s on your mind?"
                onChange={(e) => setPost(e.target.value)}
                value={post}
            />
            <button
                className="bg-slate-800 text-white px-4 py-2 rounded-lg uppercase hover:bg-slate-900"
            >
                Chirp
            </button>
        </form>

    )
}