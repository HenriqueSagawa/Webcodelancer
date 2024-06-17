import { ToggleTheme } from "./components/ToggleTheme/ToggleTheme";
import { NavBar } from "./components/Navbar/Navbar";
import { Button, autocomplete } from "@nextui-org/react";
import { Arrow } from "./components/Decorations/Arrow";
import Image from "next/image";
import { StarLight } from "./components/Decorations/StarLight";
import { Light } from "./components/Decorations/Light";
import HeaderImg from "@/public/img/ilustracao-header.png";
import RedeImg from "@/public/img/rede.png";
import { CardComponent } from "./components/Card/Card";
import pageCards from "./components/Card/pageCards";
import { IoDocumentOutline, IoShieldOutline } from "react-icons/io5";
import { CiUser } from "react-icons/ci";

export default function Home() {
  return (
    <div className="relative h-full overflow-hidden">
      <NavBar />
      <header className="flex justify-around items-center py-5 w-screen h-full !max-h-[300px] my-32 max-w-screen-2xl m-auto">
        <div className="*:z-[999]">
          <h1 className="text-5xl font-semibold relative ">
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
        <div className="relative ">
          <Light className="right-[4rem] top-[4rem] !w-44 !h-44 !blur-3xl !z-0 " />
          <Image
            src={HeaderImg}
            alt=""
            className="w-[500px] h-fit !z-[999] animate-slide-down !relative"
          />
        </div>
      </header>
      <main className="w-screen pt-24 ">
        <section>
          <h1 className="text-5xl font-semibold text-center ">
            Encontre o{" "}
            <span className="bg-gradient-to-b from-sky-400 to-sky-500 inline-block text-transparent bg-clip-text font-semibold">
              freelancers
            </span>{" "}
            para
          </h1>
          <div className="relative flex justify-center gap-1 flex-wrap mt-12">
            <Light className="!w-24 !h-24 left-[37%] top-[9rem] blur-3xl bg-green-400 shadow-green-400" />
            <Light className="!w-24 !h-24 left-[10%] blur-3xl" />
            <Light className="!w-24 !h-24 right-[18%] blur-3xl bg-orange-400 shadow-orange-400" />
            {pageCards.map((item) => {
              return (
                <CardComponent
                  icon={item.icon}
                  title={item.title}
                  href={item.href}
                />
              );
            })}
          </div>
        </section>

        <section className="mt-36">
          <h1 className="text-5xl font-semibold text-center">Como funciona?</h1>
          <div className="flex flex-wrap justify-center gap-8 mt-10">
            <div className="max-w-80 flex flex-col items-center p-5">
              <IoDocumentOutline size={65} />
              <h3 className="font-semibold text-2xl text-center">
                Publique uma vaga
              </h3>
              <p className="text-center">
                Publique a sua vaga para milhares de profissionais, você irá
                receber propostas de freelancers talentosos em poucos minutos.
              </p>
            </div>
            <div className="max-w-80 flex flex-col items-center p-5">
              <CiUser size={65} />
              <h3 className="font-semibold text-2xl text-center">Contrate</h3>
              <p className="text-center">
                Reveja o histórico de trabalho, feedback de clientes e portfólio
                para limitar os candidatos. Então faça uma entrevista pelo chat
                e escolha o melhor.
              </p>
            </div>
            <div className="max-w-80 flex flex-col items-center p-5">
              <IoShieldOutline size={65} />
              <h3 className="font-semibold text-2xl text-center">
                Pague com segurança
              </h3>
              <p className="text-center">
                Com o pagamento seguro da WebCodeLancer, o pagamento será
                repassado para o freelancer somente quando o projeto estiver
                concluído.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
