'use client'
import { Button } from "@nextui-org/react";
import { Arrow } from "../components/Decorations/Arrow";
import Image from "next/image";
import { StarLight } from "../components/Decorations/StarLight";
import { Light } from "../components/Decorations/Light";
import HeaderImg from "@/public/img/ilustracao-header.png";
import { CardComponent } from "../components/Card/Card";
import pageCards from "../components/Card/pageCards";
import { IoDocumentOutline, IoShieldOutline, IoStatsChartOutline, IoTimeOutline } from "react-icons/io5";
import { CiUser } from "react-icons/ci";
import { Footer } from "../components/Footer/Footer";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Home() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true
    });
  }, []);

  return (
    <div className="relative h-full overflow-hidden">
      <header className="flex flex-col lg:flex-row justify-around items-center py-5 w-full px-4 h-full !max-h-none lg:!max-h-[450px] my-8 lg:my-32 max-w-screen-2xl mx-auto">
        <div className="text-center lg:text-left mb-8 lg:mb-0" data-aos="fade-right">
          <h1 className="text-4xl lg:text-6xl font-semibold relative">
            <StarLight className="hidden lg:block text-sm !top-[-35px] !left-[20px]" />
            <StarLight className="hidden lg:block !left-[-55px] !top-[40px] text-2xl z-0" />
            Precisando de{" "}
            <span className="bg-gradient-to-r from-[#E60599] to-[#025CA4] inline-block text-transparent bg-clip-text relative">
              <Light className="hidden lg:block -right-[12px]" />
              uma luz
            </span>
            <br /> para seus projetos?
          </h1>
          <p className="text-md text-gray-500 my-4 px-4 lg:px-0">
            Encontre freelancers de programação web para transformar suas ideias em realidade.
            <br className="hidden lg:block" /> Vamos acender a luz do seu projeto!
          </p>
          <Button variant="shadow" color="secondary" className="mt-4">
            Começar <Arrow />
          </Button>
        </div>
        <div className="relative w-full lg:w-auto px-4 lg:px-0" data-aos="fade-left">
          <Light className="right-[4rem] top-[4rem] !w-44 !h-44 !blur-3xl !z-0" />
          <Image
            src={HeaderImg}
            alt=""
            className="w-full max-w-[500px] h-auto animate-slide-down !relative mx-auto"
          />
        </div>
      </header>

      <main className="w-full pt-12 lg:pt-24 px-4 lg:px-0">
        <section>
          <h1 className="text-3xl lg:text-5xl font-semibold text-center" data-aos="fade-up">
            Encontre{" "}
            <span className="bg-gradient-to-b from-sky-400 to-sky-500 inline-block text-transparent bg-clip-text font-semibold">
              freelancers
            </span>{" "}
            para
          </h1>
          <div className="relative flex flex-wrap justify-center gap-4 mt-8 lg:mt-12">
            <Light className="!w-24 !h-24 left-[37%] top-[9rem] blur-3xl bg-green-400 shadow-green-400" />
            <Light className="!w-24 !h-24 left-[10%] blur-3xl" />
            <Light className="!w-24 !h-24 right-[18%] blur-3xl bg-orange-400 shadow-orange-400" />
            {pageCards.map((item, index) => (
              <CardComponent
                key={index}
                icon={item.icon}
                title={item.title}
                href={item.href}
                data-aos="zoom-in"
                data-aos-delay={index * 100}
              />
            ))}
          </div>
        </section>

        <section className="mt-20 lg:mt-36">
          <h1 className="text-3xl lg:text-5xl font-semibold text-center" data-aos="fade-up">Como funciona?</h1>
          <div className="flex flex-wrap justify-center gap-8 mt-8 lg:mt-10">
            <div className="w-full sm:w-80 flex flex-col items-center p-5" data-aos="fade-up" data-aos-delay="100">
              <IoDocumentOutline size={65} />
              <h3 className="font-semibold text-xl lg:text-2xl text-center mt-4">
                Publique uma vaga
              </h3>
              <p className="text-center mt-2">
                Publique a sua vaga para milhares de profissionais, você irá
                receber propostas de freelancers talentosos em poucos minutos.
              </p>
            </div>
            <div className="w-full sm:w-80 flex flex-col items-center p-5" data-aos="fade-up" data-aos-delay="200">
              <CiUser size={65} />
              <h3 className="font-semibold text-xl lg:text-2xl text-center mt-4">
                Contrate
              </h3>
              <p className="text-center mt-2">
                Reveja o histórico de trabalho, feedback de clientes e portfólio
                para limitar os candidatos. Então faça uma entrevista pelo chat
                e escolha o melhor.
              </p>
            </div>
            <div className="w-full sm:w-80 flex flex-col items-center p-5" data-aos="fade-up" data-aos-delay="300">
              <IoShieldOutline size={65} />
              <h3 className="font-semibold text-xl lg:text-2xl text-center mt-4">
                Pague com segurança
              </h3>
              <p className="text-center mt-2">
                Com o pagamento seguro da WebCodeLancer, o pagamento será
                repassado para o freelancer somente quando o projeto estiver
                concluído.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-20 lg:mt-36 relative overflow-hidden">
          <div className="absolute w-72 h-72 bg-purple-500/10 rounded-full blur-3xl -top-20 -left-20" />
          <div className="absolute w-72 h-72 bg-blue-500/10 rounded-full blur-3xl -top-20 -right-20" />
          
          <h1 className="text-3xl lg:text-5xl font-semibold text-center mb-16" data-aos="fade-up">
            Recursos <span className="bg-gradient-to-r from-[#E60599] to-[#025CA4] inline-block text-transparent bg-clip-text">Exclusivos</span>
          </h1>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
            <div className="bg-white/5 backdrop-blur-xl rounded-xl p-8 border border-gray-200/20 hover:border-purple-500/50 transition-all duration-300" data-aos="fade-up" data-aos-delay="100">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-6">
                <IoTimeOutline size={32} className="text-white" />
              </div>
              <h3 className="font-semibold text-xl mb-4">
                Rastreamento Inteligente
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Monitore o tempo e progresso dos seus projetos com nossa ferramenta avançada de rastreamento.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-xl rounded-xl p-8 border border-gray-200/20 hover:border-blue-500/50 transition-all duration-300" data-aos="fade-up" data-aos-delay="200">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mb-6">
                <IoStatsChartOutline size={32} className="text-white" />
              </div>
              <h3 className="font-semibold text-xl mb-4">
                Análises em Tempo Real
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Visualize métricas e insights importantes para tomar as melhores decisões.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-xl rounded-xl p-8 border border-gray-200/20 hover:border-pink-500/50 transition-all duration-300" data-aos="fade-up" data-aos-delay="300">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-500 rounded-lg flex items-center justify-center mb-6">
                <IoShieldOutline size={32} className="text-white" />
              </div>
              <h3 className="font-semibold text-xl mb-4">
                Segurança Garantida
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Proteção total dos seus dados e transações com criptografia avançada.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}