import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletePost } from "../lib/reducers/postReducer";
import { findAuthorOfPost } from "../lib/reducers/userReducer";

dayjs.extend(relativeTime);

const reactionEmoji = {
    thumbsUp: '👍',
    heart: '❤️',
    // care: '🥰',
    haha: '😆',
    wow: '😮',
    sad: '😢',
    mad: '😡'
}

function ReactionButtons() {
    const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
        return (
            <button key={name} className="hover:-translate-y-1 hover:scale-110 hover:animate-bounce">
                {emoji}
            </button>
        )
    })

    return <div className="flex gap-2 items-center">{reactionButtons}</div>
}

function OpenButton({ id }) {
    const user = useSelector(state => state.authReducer);
    const dispatch = useDispatch();
    return (
        <div className="absolute mt-1 bg-white w-48 right-0 rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
            <button
                className="hover:bg-neutral-200 py-2 w-full text-left"
            >
                <span className="mx-2">Edit</span>
            </button>
            <button
                className="hover:bg-neutral-200 py-2 w-full text-left"
                onClick={() => {

                    dispatch(deletePost({
                        type: 'posts/deletePost',
                        id: id,
                        token: user.token.token
                    }))
                }}
            >
                <span className="mx-2">Delete</span>
            </button>
        </div>
    )
}

export default function Post({ post, index }) {

    const [openBtn, setOpenBtn] = useState(false)

    const user = useSelector(state => state.authReducer.user);
    const author = useSelector(state => findAuthorOfPost(state, post))

    return (
        <article className={`bg-white h-full w-full p-4 mb-2 flex flex-col ${index == 0 ? 'rounded-t-lg' : 'rounded-none'}`}>
            <div className="flex gap-3 items-center justify-between">
                <div className="flex gap-3 items-center">
                    <div className="flex gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600 -scale-x-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        <span className="text-lg">{author.username}</span>
                    </div>
                    <span className="text-sm text-neutral-600">
                        {dayjs(post.createdOn).fromNow()}
                    </span>
                </div>
                {
                    author.id == user.id &&
                    <div className="relative">
                        <button
                            className="block"
                            onClick={() => setOpenBtn(!openBtn)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                            </svg>
                        </button>
                        {openBtn && <OpenButton id={post.id} />}
                    </div>
                }
            </div>
            <span className="mx-8 py-4">{post.post}</span>
            <ReactionButtons />
        </article >
    )
}