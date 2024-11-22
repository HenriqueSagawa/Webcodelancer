"use client"

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Avatar, Button, Card, CardBody, CardHeader, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Chip, Divider } from "@nextui-org/react";

export default function Dashboard() {
    const [showEditForm, setShowEditForm] = useState(false);
    const [showSkillForm, setShowSkillForm] = useState(false);
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (session === null) {
            router.push("/");
        }
    }, [session, router]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedImage(e.target.files[0]);
        }
    };

    return (
    <div className="w-full h-screen">
        <div className="container mx-auto p-8">
            <Card className="mb-8">
                <CardBody>
                    <div className="flex items-center space-x-4">
                        <Avatar
                            src={session?.user?.image as string} 
                            isBordered
                            name={session?.user?.name as string}
                            className="w-32 h-32"
                        />
                        <div>
                            <h2 className="text-2xl font-bold">{session?.user?.name}</h2>
                            <p className="text-default-500">{session?.user?.email}</p>
                        </div>
                    </div>
                    
                    <div className="mt-6 space-x-4">
                        <Button 
                            color="primary"
                            onClick={() => setShowEditForm(true)}
                        >
                            Editar Dados
                        </Button>
                        <Button 
                            color="default"
                            onClick={() => router.push('/alterar-senha')}
                        >
                            Alterar Senha
                        </Button>
                    </div>
                </CardBody>
            </Card>

            <Modal isOpen={showEditForm} onClose={() => setShowEditForm(false)}>
                <ModalContent>
                    <ModalHeader>Editar Dados</ModalHeader>
                    <ModalBody>
                        <div className="flex flex-col items-center mb-4">
                            <Avatar
                                src={selectedImage ? URL.createObjectURL(selectedImage) : session?.user?.image || '/default-avatar.png'}
                                className="w-32 h-32 mb-2"
                                name={session?.user?.name as string}
                            />
                            <Button color="primary" className="relative">
                                Alterar Foto
                                <input 
                                    type="file" 
                                    className="absolute inset-0 opacity-0 cursor-pointer" 
                                    accept="image/*"
                                    onChange={handleImageChange}
                                />
                            </Button>
                        </div>
                        <Input
                            label="Nome"
                            variant="bordered"
                            className="mb-4"
                        />
                        <Input
                            label="Email"
                            type="email"
                            variant="bordered"
                        />
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" variant="light" onClick={() => {
                            setShowEditForm(false);
                            setSelectedImage(null);
                        }}>
                            Cancelar
                        </Button>
                        <Button color="primary">
                            Salvar
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            <Card className="mb-8">
                <CardBody>
                    <h3 className="text-xl font-bold mb-4">Minhas Habilidades</h3>
                    <div className="flex flex-wrap gap-2">
                        <Chip color="primary">React</Chip>
                        <Chip color="primary">Node.js</Chip>
                        <Button 
                            color="success"
                            size="sm"
                            onClick={() => setShowSkillForm(true)}
                        >
                            + Adicionar Habilidade
                        </Button>
                    </div>
                </CardBody>
            </Card>

            <Modal isOpen={showSkillForm} onClose={() => setShowSkillForm(false)}>
                <ModalContent>
                    <ModalHeader>Adicionar Habilidade</ModalHeader>
                    <ModalBody>
                        <Input
                            label="Nome da Habilidade"
                            variant="bordered"
                        />
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" variant="light" onClick={() => setShowSkillForm(false)}>
                            Cancelar
                        </Button>
                        <Button color="primary">
                            Adicionar
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            <Card className="mb-8">
                <CardBody>
                    <h3 className="text-xl font-bold mb-4">Projetos em Andamento</h3>
                    <div className="space-y-4">
                        <div>
                            <h4 className="font-semibold">Nome do Projeto</h4>
                            <p className="text-default-500">Descrição do projeto...</p>
                            <Chip color="warning">Em progresso</Chip>
                        </div>
                        <Divider />
                    </div>
                </CardBody>
            </Card>

            <Card>
                <CardBody>
                    <h3 className="text-xl font-bold mb-4">Projetos Finalizados</h3>
                    <div className="space-y-4">
                        <div>
                            <h4 className="font-semibold">Nome do Projeto</h4>
                            <p className="text-default-500">Descrição do projeto...</p>
                            <Chip color="success">Concluído</Chip>
                        </div>
                        <Divider />
                    </div>
                </CardBody>
            </Card>
        </div>
    </div>
    )
}
