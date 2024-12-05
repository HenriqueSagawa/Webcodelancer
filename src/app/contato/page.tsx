'use client'
import { useEffect, useRef, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Card, CardBody, Input, Textarea, Button, Modal, ModalContent, ModalHeader, ModalBody } from '@nextui-org/react';
import { Footer } from '@/src/components/Footer/Footer';
import emailjs from '@emailjs/browser';

export default function Contato() {
    const form = useRef<HTMLFormElement>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [modalType, setModalType] = useState<'success' | 'error'>('success');

    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true
        });
    }, []);

    const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (form.current) {
            const formData = new FormData(form.current);
            const templateParams = {
                from_name: formData.get('from_name'),
                from_email: formData.get('from_email'),
                subject: formData.get('subject'),
                message: formData.get('message')
            };

            emailjs.send(
                'service_wqv1z99',
                'template_rz1kcvn',
                templateParams,
                '7ZehpHGHmuYj1a0Wn'
            )
            .then((result) => {
                setModalType('success');
                setModalMessage('Email enviado com sucesso! Entraremos em contato em breve.');
                setIsModalOpen(true);
                if (form.current) form.current.reset();
            }, (error) => {
                setModalType('error');
                setModalMessage('Erro ao enviar email. Por favor, tente novamente mais tarde.');
                setIsModalOpen(true);
            });
        }
    };

    return (
        <div className="relative">
            <div className="max-w-screen-xl mx-auto px-4 py-16">
                <div className="text-center mb-16 relative">
                    <div className="absolute w-64 h-64 bg-purple-500/10 rounded-full blur-3xl -top-10 -left-10 z-0" />
                    <div className="absolute w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -top-10 -right-10 z-0" />
                    <h1 className="text-4xl lg:text-6xl font-bold mb-6 relative z-10" data-aos="fade-down">
                        Entre em <span className="bg-gradient-to-r from-[#E60599] to-[#025CA4] inline-block text-transparent bg-clip-text">Contato</span>
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400 relative z-10" data-aos="fade-up">
                        Estamos aqui para ajudar você com seu próximo projeto
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-16">
                    <Card className="p-6" data-aos="fade-right">
                        <CardBody>
                            <h2 className="text-2xl font-semibold mb-6">Informações de Contato</h2>
                            <div className="space-y-4">
                                <div className="flex items-center space-x-4">
                                    <span className="text-2xl">📧</span>
                                    <div>
                                        <p className="font-semibold">Email</p>
                                        <p className="text-gray-600 dark:text-gray-400">webcodelancer@gmail.com</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <span className="text-2xl">📱</span>
                                    <div>
                                        <p className="font-semibold">Telefone</p>
                                        <p className="text-gray-600 dark:text-gray-400">(11) 99999-9999</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <span className="text-2xl">📍</span>
                                    <div>
                                        <p className="font-semibold">Endereço</p>
                                        <p className="text-gray-600 dark:text-gray-400">Assis Chateubriand, PR - Brasil</p>
                                    </div>
                                </div>
                            </div>
                        </CardBody>
                    </Card>

                    <Card className="p-6" data-aos="fade-left">
                        <CardBody>
                            <h2 className="text-2xl font-semibold mb-6">Envie sua Mensagem</h2>
                            <form ref={form} onSubmit={sendEmail} className="space-y-6">
                                <Input
                                    type="text"
                                    name="from_name"
                                    label="Nome"
                                    placeholder="Digite seu nome"
                                    className="w-full"
                                    required
                                />
                                <Input
                                    type="email"
                                    name="from_email"
                                    label="Email"
                                    placeholder="Digite seu email"
                                    className="w-full"
                                    required
                                />
                                <Input
                                    type="text"
                                    name="subject"
                                    label="Assunto"
                                    placeholder="Digite o assunto"
                                    className="w-full"
                                    required
                                />
                                <Textarea
                                    name="message"
                                    label="Mensagem"
                                    placeholder="Digite sua mensagem"
                                    className="w-full"
                                    minRows={4}
                                    required
                                />
                                <Button
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-[#E60599] to-[#025CA4] text-white"
                                >
                                    Enviar Mensagem
                                </Button>
                            </form>
                        </CardBody>
                    </Card>
                </div>
            </div>
            <Footer />

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <ModalContent>
                    <ModalHeader>
                        <span className={modalType === 'success' ? 'text-green-500' : 'text-red-500'}>
                            {modalType === 'success' ? 'Sucesso!' : 'Erro'}
                        </span>
                    </ModalHeader>
                    <ModalBody className="pb-6">
                        <p>{modalMessage}</p>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </div>
    )
}