'use client'
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Button, Card, CardBody, CardHeader, Divider } from '@nextui-org/react';
import { Footer } from '@/src/components/Footer/Footer';
import henriqueImg from "@/public/img/foto-henrique.jpg";
import Image from 'next/image';
import rafaelImg from "@/public/img/foto rafael.jpg";

export default function Sobre() {
    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true
        });
    }, []);

    return (
        <div className="relative">
            <div className="max-w-screen-xl mx-auto px-4 py-16">
                <div className="text-center mb-16 relative">
                    <div className="absolute w-64 h-64 bg-purple-500/10 rounded-full blur-3xl -top-10 -left-10 z-0" />
                    <div className="absolute w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -top-10 -right-10 z-0" />
                    <h1 className="text-4xl lg:text-6xl font-bold mb-6 relative z-10" data-aos="fade-down">
                        Sobre a <span className="bg-gradient-to-r from-[#E60599] to-[#025CA4] inline-block text-transparent bg-clip-text">WebCodeLancer</span>
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400 relative z-10" data-aos="fade-up">
                        Conectando talentos e transformando ideias em realidade desde 2023
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-16 mb-16">
                    <Card className="p-4" data-aos="fade-right">
                        <CardHeader>
                            <h2 className="text-2xl font-semibold">Nossa Missão</h2>
                        </CardHeader>
                        <CardBody>
                            <p className="text-gray-600 dark:text-gray-400">
                                Facilitar a conexão entre empresas e freelancers talentosos, promovendo um ambiente 
                                colaborativo onde projetos digitais ganham vida. Nosso compromisso é com a qualidade, 
                                transparência e sucesso de cada projeto.
                            </p>
                        </CardBody>
                    </Card>

                    <Card className="p-4" data-aos="fade-left">
                        <CardHeader>
                            <h2 className="text-2xl font-semibold">Nossa Visão</h2>
                        </CardHeader>
                        <CardBody>
                            <p className="text-gray-600 dark:text-gray-400">
                                Ser a principal plataforma de freelancing no Brasil, reconhecida pela excelência 
                                em conectar profissionais qualificados a projetos desafiadores, contribuindo para 
                                o crescimento do mercado digital.
                            </p>
                        </CardBody>
                    </Card>
                </div>

                <Card className="mb-16" data-aos="fade-up">
                    <CardHeader>
                        <h2 className="text-2xl font-semibold text-center w-full">Nossos Valores</h2>
                    </CardHeader>
                    <CardBody>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            <Card className="text-center" data-aos="zoom-in" data-aos-delay="100">
                                <CardBody>
                                    <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <span className="text-2xl">✨</span>
                                    </div>
                                    <h3 className="font-semibold mb-2">Qualidade</h3>
                                    <p className="text-gray-600 dark:text-gray-400">
                                        Comprometimento com a excelência em cada projeto
                                    </p>
                                </CardBody>
                            </Card>

                            <Card className="text-center" data-aos="zoom-in" data-aos-delay="200">
                                <CardBody>
                                    <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <span className="text-2xl">🤝</span>
                                    </div>
                                    <h3 className="font-semibold mb-2">Transparência</h3>
                                    <p className="text-gray-600 dark:text-gray-400">
                                        Comunicação clara e honesta em todas as interações
                                    </p>
                                </CardBody>
                            </Card>

                            <Card className="text-center" data-aos="zoom-in" data-aos-delay="300">
                                <CardBody>
                                    <div className="w-16 h-16 bg-pink-100 dark:bg-pink-900 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <span className="text-2xl">💡</span>
                                    </div>
                                    <h3 className="font-semibold mb-2">Inovação</h3>
                                    <p className="text-gray-600 dark:text-gray-400">
                                        Busca constante por soluções criativas e eficientes
                                    </p>
                                </CardBody>
                            </Card>
                        </div>
                    </CardBody>
                </Card>

                <div className="mb-16" data-aos="fade-up">
                    <h2 className="text-2xl font-semibold mb-8 text-center">Nossa Equipe</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        <Card className="p-6 text-center" data-aos="flip-left">
                            <CardBody>
                                <div className="w-32 h-32 rounded-full bg-gradient-to-r from-[#E60599] to-[#025CA4] mx-auto mb-4">
                                    <Image src={henriqueImg} alt="Henrique Sagawa" className="rounded-full"></Image>
                                </div>
                                <h3 className="text-xl font-semibold mb-2">Henrique Sagawa</h3>
                                <p className="text-gray-600 dark:text-gray-400 mb-2">Desenvolvedor Full Stack</p>
                                <p className="text-gray-500 dark:text-gray-400">
                                    Especialista em desenvolvimento web com foco em soluções inovadoras e escaláveis
                                </p>
                            </CardBody>
                        </Card>

                        <Card className="p-6 text-center" data-aos="flip-right">
                            <CardBody>
                                <div className="w-32 h-32 rounded-full bg-gradient-to-r from-[#E60599] to-[#025CA4] mx-auto mb-4">
                                    <Image src={rafaelImg} alt="Rafael Alcantara" className="w-full h-full rounded-full"></Image>
                                </div>
                                <h3 className="text-xl font-semibold mb-2">Rafael Alcantara</h3>
                                <p className="text-gray-600 dark:text-gray-400 mb-2">Desenvolvedor Full Stack</p>
                                <p className="text-gray-500 dark:text-gray-400">
                                    Apaixonado por criar experiências digitais excepcionais e interfaces intuitivas
                                </p>
                            </CardBody>
                        </Card>
                    </div>
                </div>

                <div className="mb-16">
                    <h2 className="text-2xl font-semibold mb-8 text-center" data-aos="fade-down">Por que escolher a WebCodeLancer?</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <Card className="p-4" data-aos="fade-up" data-aos-delay="100">
                            <CardBody>
                                <h3 className="font-semibold mb-3">Profissionais Verificados</h3>
                                <p className="text-gray-600 dark:text-gray-400">
                                    Todos os freelancers passam por um processo de verificação
                                </p>
                            </CardBody>
                        </Card>

                        <Card className="p-4" data-aos="fade-up" data-aos-delay="200">
                            <CardBody>
                                <h3 className="font-semibold mb-3">Pagamento Seguro</h3>
                                <p className="text-gray-600 dark:text-gray-400">
                                    Sistema de pagamento protegido e garantido
                                </p>
                            </CardBody>
                        </Card>

                        <Card className="p-4" data-aos="fade-up" data-aos-delay="300">
                            <CardBody>
                                <h3 className="font-semibold mb-3">Suporte 24/7</h3>
                                <p className="text-gray-600 dark:text-gray-400">
                                    Equipe sempre disponível para ajudar
                                </p>
                            </CardBody>
                        </Card>

                        <Card className="p-4" data-aos="fade-up" data-aos-delay="400">
                            <CardBody>
                                <h3 className="font-semibold mb-3">Garantia de Qualidade</h3>
                                <p className="text-gray-600 dark:text-gray-400">
                                    Satisfação garantida em todos os projetos
                                </p>
                            </CardBody>
                        </Card>
                    </div>
                </div>

                <Card className="text-center p-8" data-aos="zoom-in">
                    <CardBody>
                        <h2 className="text-2xl font-semibold mb-4">Pronto para começar?</h2>
                        <p className="text-gray-600 dark:text-gray-400 mb-6">
                            Junte-se a milhares de profissionais e empresas em nossa plataforma
                        </p>
                        <Button 
                            className="bg-gradient-to-r from-[#E60599] to-[#025CA4]"
                            color="primary"
                            size="lg"
                        >
                            Comece Agora
                        </Button>
                    </CardBody>
                </Card>
            </div>
            <Footer />
        </div>
    )
}