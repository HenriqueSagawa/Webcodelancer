"use client"

import Link from "next/link";
import Image from "next/image";
import logo from "@/public/logo.svg";
import { Input, Checkbox, Button } from "@nextui-org/react";
import googleIcon from "@/public/google.svg";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";



export default function Register() {

    const { data: session, status } = useSession();

    const router = useRouter();



    useEffect(() => {
        if (session) {
          router.push("/"); // Redireciona para a página inicial se logado
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
                                <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl dark:text-gray-300 mt-5">Cadastre sua conta</h3>
                            </div>
                        </div>
                        <form className="flex flex-col gap-6">
                            <Input type="text" variant="bordered" label="Nome completo" />
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
                            </div>
                            <Button color="primary" variant="solid">Entrar</Button>
                        </form>

                        <Button onClick={() => signIn('google')} color="default" variant="bordered" className="w-full">
                            <Image src={googleIcon} alt="" width={20} height={20} />
                            Continuar com o Google
                        </Button>
                        <p className="text-center">Já possuí conta? <Link href="/Login" className="font-medium text-indigo-600 hover:text-indigo-500">Entrar</Link></p>
                    </div>
                </main>
            </div>
        )
    }