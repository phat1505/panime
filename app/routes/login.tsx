import Header from "../components/Header";
import Footer from "../components/Footer";
import { useState, useRef } from "react";
export default function Login() {
    return (
        <div>
            <Header />
            <div className="h-150">
                <div>
                <img src="/images/bg.jpg" className="md:w-full absolute inset-0 -z-5 md:h-[750px] w-[400px] h-[650px] opacity-30 " />
                </div>
                <div className="flex justify-center items-center h-150">
                    <form className="flex flex-col mx-auto w-[500px] h-[300px] bg-gray-500 text-sky-500 opacity-70 font-bold p-20 rounded-2xl gap-5 items-center justify-center">
                        <h1 className="text-5xl text-center ">Login Form</h1>
                        <label>
                            Username:
                            <input type="text" name="username" className="border-b text-white border-sky-500 focus:outline-none" />
                        </label>
                        <label>
                            Password:
                            <input type="password" name="password" className="border-b text-white border-sky-500 focus:outline-none " />
                        </label>
                        <div className="text-center w-20 mx-auto">
                            <button type="submit" className="border rounded-xl p-2 ">Login</button>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
}