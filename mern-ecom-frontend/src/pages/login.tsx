import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useState } from "react";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { auth } from "../firebase";
import { useLoginMutation } from "../redux/api/userAPI";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { MessageResponse } from "../types/api-types";

const Login = () => {

    const [gender, setGender] = useState<string>("");
    const [date, setDate] = useState<string>("");

    const [login] = useLoginMutation();

    const loginHandler = async() => {
        try {
            const provider = new GoogleAuthProvider();
            const {user} = await signInWithPopup(auth, provider);

            const res = await login({
                name: user.displayName!,
                email: user.email!,
                photo: user.photoURL!,
                gender,
                role: "user",
                dob: date,
                _id: user.uid
            });

            if ( "data" in res) {
                toast.success(res.data.message)
            }
            else {
                const error = res.error as FetchBaseQueryError;
                const resMsg = error.data as MessageResponse;
                toast.error(resMsg.message)
            }

            console.log(user);

        } catch (error) {
            toast.error("Sign In Failed");
        }
    };

  return (
    <div className="login">
        <main>
            <h1 className="heading">Login</h1>
            <div>
                <label>Gender</label>
                <select value={gender} onChange={e=>setGender(e.target.value)}>
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="others">Others</option>
                </select>
            </div>
            <div>
                <label>Date of Birth</label>
                <input type="date" value={date} onChange={e=>setDate(e.target.value)}/>
            </div>
            <div>
                <p>Already Signed In Once</p>
                <button onClick={loginHandler}>
                    <FcGoogle/>
                    <span>Sign In with Google</span>
                </button>
            </div>
        </main>
    </div>
  )
}

export default Login; 
