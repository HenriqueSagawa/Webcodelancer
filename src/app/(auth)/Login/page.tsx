"use client"

import Link from "next/link";
import Image from "next/image";
import { Input, Checkbox, Button } from "@nextui-org/react";
import googleIcon from "@/public/google.svg"
import { FaEye, FaEyeSlash, FaGithub } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { getUser } from "@/src/services/register";

export default function Login() {

    const { data: session, status } = useSession();

    const router = useRouter();

    useEffect(() => {
        if (session) {
          router.push("/");
        }
    
      }, [session, router]);

    const [isVisible, setIsVisible] = useState<boolean>(false);

    function handleVisibility() {
        setIsVisible(!isVisible);
    }
    return (
        <div className="w-full h-screen">
            <main className="w-full mt-12 flex flex-col items-center justify-center px-4">
                <div className="max-w-sm w-full text-gray-600 space-y-5">
                    <div className="text-center pb-8">
                        <div className="">
                            <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl dark:text-gray-300 mt-5">Entre com sua conta</h3>
                        </div>
                    </div>
                    <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                        <Input type="email" variant="bordered" label="Email" />
                        <Input variant="bordered" label="Senha" endContent={
                            <button className="focus:outline-none" type="button" onClick={handleVisibility} aria-label="toggle password visibility">
                                {isVisible ? (
                                    <FaEye className="text-2xl text-default-400 pointer-events-none" />
                                ) : (
                                    <FaEyeSlash className="text-2xl text-default-400 pointer-events-none" />
                                )}
                            </button>
                        }
                            type={isVisible ? "text" : "password"}
                             />
                        <div className="flex items-center justify-between text-sm"> 
                            <Checkbox>Lembre-me</Checkbox>
                            <Link href="javascript:void(0)" className="text-center text-indigo-600 hover:text-indigo-500">Esqueceu sua senha?</Link>
                        </div>
                        <Button color="primary" variant="solid">Entrar</Button>
                    </form>

                    <Button onClick={() => signIn('google')} color="default" variant="bordered" className="w-full">
                        <Image src={googleIcon} alt="" width={20} height={20} />
                        Continuar com o Google
                    </Button>
                    <Button onClick={() => signIn('github') } color="default" variant="bordered" className="w-full">
                        <FaGithub className="text-2xl text-default-400" />
                        Continuar com o Github
                    </Button>
                    <p className="text-center">Não possuí conta? <Link href="/Register" className="font-medium text-indigo-600 hover:text-indigo-500">Cadastra-se</Link></p>
                </div>
            </main>
        </div>
    )
}