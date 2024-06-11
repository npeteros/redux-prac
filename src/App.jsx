import { useDispatch, useSelector } from "react-redux"
import { Navbar, CreatePost } from "./assets/ComponentLibrary"
import { useEffect } from "react"
import { fetchPosts } from "./assets/lib/reducers/postReducer";
import Post from "./assets/components/Post";
import './App.css'
import { fetchUsers } from "./assets/lib/reducers/userReducer";
import { useNavigate } from "react-router-dom";
import { validateAuth } from "./assets/lib/reducers/authReducer";

export default function App() {

    const posts = useSelector(state => state.postReducer.posts)
    const users = useSelector(state => state.userReducer.users);
    const auth = useSelector(state => state.authReducer);
    const dispatch = useDispatch();

    const postStatus = useSelector(state => state.postReducer.status);
    const userStatus = useSelector(state => state.userReducer.status);
    const authStatus = useSelector(state => state.authReducer.status);

    useEffect(() => {
        async function fetch() {
            try {
                await dispatch(fetchUsers(auth.token.token)).unwrap()
            } catch (error) {
                nav('/login')
            }
        }
        
        fetch()
    }, [userStatus, dispatch]);

    useEffect(() => {
        async function fetch() {
            try {
                await dispatch(fetchPosts(auth.token.token)).unwrap()
            } catch (error) {
                nav('/login')
            }
        }
        
        fetch()
    }, [])

    useEffect(() => {
        async function validate() {
            try {
                await dispatch(validateAuth(auth.token.token)).unwrap()
            } catch (error) {
                nav('/login')
            }
        }
        
        validate()
    }, [authStatus, dispatch]);

    const nav = useNavigate();

    return (
        <div className="overflow-x-hidden font-serif">
            <nav>
                <Navbar />
            </nav>
            <main className="flex flex-col items-center gap-6 my-12">
                <CreatePost />
                <section className="flex flex-col max-w-2xl w-full">
                    {
                        posts.map((p, index) => {
                            return <Post key={p.id} post={p} index={index} />
                        })
                    }
                </section>
            </main>
        </div>
    )
}