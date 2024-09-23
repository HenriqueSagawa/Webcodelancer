"use client";   

import { NavBar } from "../../components/Navbar/Navbar";
import { Input, Button } from "@nextui-org/react";
import formArt from "@/public/img/formArt.jpeg";
import Image from "next/image";
import Logo from "@/public/logo.svg";
import Link from "next/link";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { getUserData, saveUserData } from "@/src/services/saveLogin";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { getUser } from "@/src/services/register";

export default function Login() {
    const [isVisible, setIsVisible] = useState(false);

    const router = useRouter();

    const userData = getUserData();

    if (userData) {
        router.push("/");
    }

    const User = z.object({
        email: z.string(),
        password: z.string()
    });

    type User = z.infer<typeof User>

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<User> ({
        resolver: zodResolver(User)
    });

    const onSubmit: SubmitHandler<User> = async (data) => {
        const user = await getUser(data.email);

        if (user && user.password === data.password) {
            saveUserData(user);
            router.push("/");
        } else {
            alert("Email ou senha inválidos");
        }
    }

    if (userData) {
        router.push("/");
    }

    function handleVisibility() {
        setIsVisible(!isVisible);
    }

    return (
        <div>
            <NavBar />
            <div className="min-h-screen bg-gray-100 dark:bg-[hsl(240,_10%,_3.9%)] text-gray-900 flex justify-center items-center">
                <div className="max-w-screen-xl h-[750px] m-0 sm:m-10 dark:bg-zinc-700 bg-white shadow sm:rounded-lg flex justify-between flex-1">
                    <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12 flex flex-col items-center justify-center mx-auto">
                        <div className="flex items-center justify-center font-semibold">
                            <Image
                                src={Logo}
                                alt="WebCodeLancer"
                                className="w-14 dark:!invert" />
                            <h1 className="dark:text-white">WebCodeLancer</h1>
                        </div>
                        <div className="mt-4 flex flex-col items-center">
                            <h1 className="text-2xl xl:text-3xl font-extrabold dark:text-white">
                                Sign In
                            </h1>
                            <div className="w-full flex-1 mt-8">
                                <div className="flex flex-col items-center">
                                    <button
                                        className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 dark:bg-zinc-500  bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline">
                                        <div className="bg-white p-2 rounded-full">
                                            <svg className="w-4" viewBox="0 0 533.5 544.3">
                                                <path
                                                    d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z"
                                                    fill="#4285f4" />
                                                <path
                                                    d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z"
                                                    fill="#34a853" />
                                                <path
                                                    d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z"
                                                    fill="#fbbc04" />
                                                <path
                                                    d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z"
                                                    fill="#ea4335" />
                                            </svg>
                                        </div>
                                        <span className="ml-4 dark:text-white">
                                            Sign In with Google
                                        </span>
                                    </button>

                                    <button
                                        className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 dark:bg-zinc-500  bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline mt-5">
                                        <div className="bg-white p-1 rounded-full">
                                            <svg className="w-6" viewBox="0 0 32 32">
                                                <path fill-rule="evenodd"
                                                    d="M16 4C9.371 4 4 9.371 4 16c0 5.3 3.438 9.8 8.207 11.387.602.11.82-.258.82-.578 0-.286-.011-1.04-.015-2.04-3.34.723-4.043-1.609-4.043-1.609-.547-1.387-1.332-1.758-1.332-1.758-1.09-.742.082-.726.082-.726 1.203.086 1.836 1.234 1.836 1.234 1.07 1.836 2.808 1.305 3.492 1 .11-.777.422-1.305.762-1.605-2.664-.301-5.465-1.332-5.465-5.93 0-1.313.469-2.383 1.234-3.223-.121-.3-.535-1.523.117-3.175 0 0 1.008-.32 3.301 1.23A11.487 11.487 0 0116 9.805c1.02.004 2.047.136 3.004.402 2.293-1.55 3.297-1.23 3.297-1.23.656 1.652.246 2.875.12 3.175.77.84 1.231 1.91 1.231 3.223 0 4.61-2.804 5.621-5.476 5.922.43.367.812 1.101.812 2.219 0 1.605-.011 2.898-.011 3.293 0 .32.214.695.824.578C24.566 25.797 28 21.3 28 16c0-6.629-5.371-12-12-12z" />
                                            </svg>
                                        </div>
                                        <span className="ml-4 dark:text-white">
                                            Sign In with GitHub
                                        </span>
                                    </button>
                                </div>

                                <div className="my-12 border-b text-center">
                                    <div
                                        className="leading-none px-2 inline-block text-sm dark:bg-zinc-700 dark:text-white text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                                        Or sign up with e-mail
                                    </div>
                                </div>

                                <form onSubmit={handleSubmit(onSubmit)} className="mx-auto max-w-xs">

                                    <Input {...register('email')} type="text" variant="underlined" label="email" className="min-w-[300px]" />

                                    <Input {...register("password")} type={isVisible ? "text" : "password"} variant="underlined" label="password" className="min-w-[300px]" endContent={
                                        <button className="focus:outline-none" type="button" onClick={handleVisibility}>
                                            {isVisible ? (
                                                <FaEye color="#a7a7a7" />
                                            ) : (
                                                <FaEyeSlash color="#a7a7a7" />
                                            )}
                                        </button>
                                    } />
                                    <Button type="submit"
                                        className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-7 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                                        <svg className="w-6 h-6 -ml-2" fill="none" stroke="currentColor" stroke-width="2"
                                            stroke-linecap="round" stroke-linejoin="round">
                                            <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                                            <circle cx="8.5" cy="7" r="4" />
                                            <path d="M20 8v6M23 11h-6" />
                                        </svg>
                                        <span className="ml-3">
                                            Sign In
                                        </span>
                                    </Button>
                                </form>
                                <p className="mt-6 text-xs text-gray-600 text-center dark:text-white">
                                    Não possui conta? <Link className="!text-blue-500" href="./Register">Clique aqui</Link>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="overflow-hidden lg:flex p-0 sm:hidden w-1/2">
                        <Image alt="" src={formArt} className="rounded rounded-l-none w-full h-fit"
                        >
                        </Image>
                    </div>
                </div>
            </div>
        </div>
    )
}