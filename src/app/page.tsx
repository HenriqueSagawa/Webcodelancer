import { ToggleTheme } from "./components/ToggleTheme/ToggleTheme";
import { NavBar } from "./components/Navbar/Navbar";
import { Button, autocomplete } from "@nextui-org/react";
import { Arrow } from "./components/Decorations/Arrow";
import Image from "next/image";
import { StarLight } from "./components/Decorations/StarLight";
import { Light } from "./components/Decorations/Light";
import HeaderImg from "@/public/img/ilustracao-header.png";

export default function Home() {
  return (
    <div className="relative overflow-hidden">
      <NavBar />
      <header className="flex justify-around items-center py-5 w-screen h-full !max-h-[300px] my-32 max-w-screen-2xl m-auto">
        <div>
          <h1 className="text-5xl font-semibold relative shadow-sm">
            <StarLight className="text-sm !top-[-35px] !left-[20px]" />
            <StarLight className="!left-[-55px] !top-[40px] text-2xl z-0" />
            Precisando de ‎
            <span className="bg-gradient-to-r from-[#E60599] to-[#025CA4] inline-block text-transparent bg-clip-text relative">
              <Light className="-right-[12px]" />
              uma luz
            </span>
            <br /> para seus projetos?
          </h1>
          <p className="text-sm text-gray-500 my-4">
            Encontre freelancers de programação web para transformar suas ideias{" "}
            <br /> em realidade. Vamos acender a luz do seu projeto!
          </p>
          <Button variant="shadow" color="secondary">
            Get Started <Arrow />
          </Button>
        </div>
        <div className="relative">
          <Light className="right-[4rem] top-[4rem] !w-44 !h-44 !blur-3xl !z-0" />
          <Image
            src={HeaderImg}
            alt=""
            className="w-[500px] h-fit !z-[999] animate-slide-down"
          />
        </div>
      </header>
    </div>
  );
}
