import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signUp } from "../lib/reducers/authReducer";

export default function Register() {
    const {
        register,
        handleSubmit,
    } = useForm()

    const authStatus = useSelector(state => state.authReducer.authStatus)

    const nav = useNavigate()

    const dispatch = useDispatch();

    async function onSubmit(data) {
        if (data.password != data.conpass) return alert('Error: Passwords do not match!');
        try {
            const response = await dispatch(signUp(data)).unwrap()
            alert('Account successfully created')
            if (response) nav('/login')
        } catch (error) {
            alert('An error occurred');
            console.error(error);
        }
    }

    return (
        <div className="min-h-screen max-w-lg m-auto flex flex-col justify-center gap-4 font-serif">
            <span className="text-2xl font-bold text-center uppercase">Chirper</span>
            <div className="bg-white rounded-lg w-full p-4">
                <span className="flex justify-center font-bold text-lg my-4">Register an Account</span>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col gap-4"
                >
                    <div className="flex flex-col">
                        <label htmlFor="email" className="text-md text-neutral-600">Username</label>
                        <input
                            type="text"
                            className="border border-neutral-400 rounded-sm px-2"
                            placeholder="Enter your username"
                            required
                            {...register("username")}
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="email" className="text-md text-neutral-600">Email Address</label>
                        <input
                            type="email"
                            className="border border-neutral-400 rounded-sm px-2"
                            placeholder="Enter your email address"
                            required
                            {...register("email")}
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="password" className="text-md text-neutral-600">Password</label>
                        <input
                            type="password"
                            className="border border-neutral-400 rounded-sm px-2"
                            placeholder="Enter your password"
                            required
                            {...register("password")}
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="conpass" className="text-md text-neutral-600">Confirm Password</label>
                        <input
                            type="password"
                            className="border border-neutral-400 rounded-sm px-2"
                            placeholder="Re-enter your password"
                            required
                            {...register("conpass")}
                        />
                    </div>
                    <div className="flex gap-1">
                        <button
                            className={`bg-neutral-400 w-1/3 rounded-md text-white ${authStatus != 'loading' && "hover:bg-neutral-600"}`}
                            disabled={authStatus == 'loading'}
                        >
                            {authStatus == 'loading' ? "Registering..." : "Register"}
                        </button>
                        <span>or</span>
                        <Link to='/login' className="underline text-blue-500">log in an existing account</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}