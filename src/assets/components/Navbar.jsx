import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"
import { signOut } from "../lib/reducers/authReducer";

export default function Navbar() {
    const [floatingNav, setFloatingNav] = useState(false)
    const dispatch = useDispatch();
    
    const user = useSelector(state => state.authReducer.user)
    
    const nav = useNavigate();

    return (
        <div className="w-screen bg-white h-16">
            <div className="max-w-[90rem] mx-auto h-full flex justify-between items-center">
                <span className="text-lg font-bold text-neutral-700">Chirper</span>
                <div>
                    <button
                        className="flex items-center gap-2"
                        onClick={() => setFloatingNav(!floatingNav)}
                    >
                        {user.username}
                        {
                            floatingNav ?
                                <svg width="18" height="18" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="m6 15 6-6 6 6"></path>
                                </svg>
                                :
                                <svg width="18" height="18" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="m6 9 6 6 6-6"></path>
                                </svg>
                        }
                    </button>
                    {floatingNav &&
                        <div className="fixed mt-2 bg-white w-24 border-2 border-neutral-400">
                            <button
                                onClick={() => {
                                    dispatch(signOut({
                                        type: 'auth/signOut'
                                    }))
                                    nav('/login')
                                }}
                                className="hover:bg-neutral-200 py-2 w-full text-left"
                            >
                                <span className="mx-2">Log out</span>
                            </button>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}