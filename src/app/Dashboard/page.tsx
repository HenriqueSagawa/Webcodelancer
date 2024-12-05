"use client"

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Avatar, Button, Card, CardBody, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Chip, Divider, Tabs, Tab, Textarea } from "@nextui-org/react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { registerProject, getProjects } from "@/src/services/registerProject";
import Project from "@/src/models/Project";
import { getSolicitations, removeSolicitation } from "@/src/services/sendSolicitation";

export default function Dashboard() {
    const [showEditForm, setShowEditForm] = useState(false);
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const { data: session, status } = useSession();
    const router = useRouter();
    const [selectedTab, setSelectedTab] = useState("freelancer");
    const [showNewProjectModal, setShowNewProjectModal] = useState(false);
    const [showProjectDetailsModal, setShowProjectDetailsModal] = useState(false);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [projects, setProjects] = useState<Project[]>([]);
    const [solicitations, setSolicitations] = useState<any[]>([]);

    useEffect(() => {
        if (session === null) {
            router.push("/");
        }
    }, [session, router]);

    useEffect(() => {
        getProjects()
            .then(setProjects);
        getSolicitations()
            .then(setSolicitations);
    }, []);

    const ProjectSchema = z.object({
        id: z.string().optional(),
        title: z.string().min(1, "O título é obrigatório"),
        description: z.string().min(10, "A descrição deve ter no mínimo 10 caracteres"),
        budget: z.string().transform((val) => Number(val)),
        deadline: z.string().transform((val) => new Date(val)),
        skills: z.string().min(1, "Informe ao menos uma habilidade necessária"),
        status: z.string().default("OPEN"),
        clientEmail: z.string().email().default(session?.user?.email as string),
        createdAt: z.date().default(() => new Date())
    });

    type ProjectType = z.infer<typeof ProjectSchema>;

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ProjectType>({
        resolver: zodResolver(ProjectSchema),
    });

    const onSubumit = async (data: ProjectType) => {
        try {
            await registerProject(data);
            console.log("Projeto registrado com sucesso");
            setShowNewProjectModal(false);
        } catch (error) {
            console.error("Erro ao registrar o projeto:", error);
        }
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedImage(e.target.files[0]);
        }
    };

    const handleRemoveSolicitation = async (id: string) => {
        try {
            await removeSolicitation(id);
            setSolicitations(prevSolicitations => 
                prevSolicitations.filter(solicitation => solicitation.id !== id)
            );
        } catch (error) {
            console.error("Erro ao remover solicitação:", error);
        }
    };

    const handleProjectClick = (project: Project) => {
        setSelectedProject(project);
        setShowProjectDetailsModal(true);
    };

    const FreelancerDashboard = () => (
        <div className="space-y-6">
            <Button
                color="primary"
                size="lg"
                className="w-full hover:scale-105 transition-transform mb-4"
                variant="shadow"
                onClick={() => router.push('/projetos')}
            >
                Encontrar Novos Projetos
            </Button>

            <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-lg">
                <CardBody>
                    <h3 className="text-xl font-bold mb-4">Projetos em Andamento</h3>
                    <div className="space-y-4">
                        <div className="p-4 bg-default-100 rounded-lg hover:bg-default-200 transition-colors">
                            <h4 className="font-semibold">Desenvolvimento de E-commerce</h4>
                            <p className="text-default-500">Criação de loja virtual com React e Node.js</p>
                            <div className="flex justify-between items-center mt-2">
                                <Chip variant="dot" color="warning">Em progresso</Chip>
                                <div className="flex gap-2 items-center">
                                    <p className="text-default-500">Prazo: 30 dias</p>
                                    <Button size="sm" color="primary" variant="ghost">
                                        Ver detalhes
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <Divider />
                    </div>
                </CardBody>
            </Card>
        </div>
    );

    const ClientDashboard = () => (
        <div className="space-y-6">
            <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-lg">
                <CardBody>
                    <h3 className="text-xl font-bold mb-4">Meus Projetos</h3>
                    <div className="space-y-4">
                        {projects.length > 0 ? (
                            projects.filter(project => project.clientEmail === session?.user?.email)
                            .map((project) => (
                                <div key={project.id} className="p-4 bg-default-100 rounded-lg hover:bg-default-200 transition-colors">
                                    <h4 className="font-semibold">{project.title}</h4>
                                    <p className="text-default-500">{project.description}</p>
                                    <div className="flex justify-between items-center mt-2">
                                        <Chip variant="dot" color="warning">{project.status}</Chip>
                                        <div className="flex gap-2 items-center">
                                            <p className="text-default-500">
                                                Prazo: {new Date(project.deadline).toLocaleDateString('pt-BR')}
                                            </p>
                                            <Button 
                                                size="sm" 
                                                color="primary" 
                                                variant="ghost"
                                                onClick={() => handleProjectClick(project)}
                                            >
                                                Ver detalhes
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center text-default-500">
                                Nenhum projeto cadastrado
                            </div>
                        )}
                        <Divider />
                    </div>
                </CardBody>
            </Card>

            <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-lg">
                <CardBody>
                    <h3 className="text-xl font-bold mb-4">Solicitações de Freelancers</h3>
                    <div className="space-y-4">
                        {solicitations.length > 0 ? (
                            solicitations.filter(solicitation => solicitation.clientEmail === session?.user?.email)
                            .map((solicitation) => (
                                <div key={solicitation.id} className="p-4 bg-default-100 rounded-lg">
                                    <div className="flex items-center gap-4 mb-2">
                                        <div>
                                            <h4 className="font-semibold">{solicitation.freelancerEmail}</h4>
                                            <p className="text-small text-default-500">
                                                Para: {projects.find(p => p.id === solicitation.projectId)?.title}
                                            </p>
                                        </div>
                                    </div>
                                    <p className="text-default-500 mb-3">
                                        {solicitation.message}
                                    </p>
                                    <div className="flex justify-end gap-2">
                                        <Button color="danger" variant="flat" size="sm" onClick={() => handleRemoveSolicitation(solicitation.id)}>
                                            Recusar
                                        </Button>
                                        <Button color="success" variant="flat" size="sm">
                                            Aceitar
                                        </Button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center text-default-500">
                                Nenhuma solicitação recebida
                            </div>
                        )}
                        <Divider/>
                    </div>
                </CardBody>
            </Card>

            <Button
                color="primary"
                size="lg"
                className="w-full hover:scale-105 transition-transform"
                variant="shadow"
                onClick={() => setShowNewProjectModal(true)}
            >
                Criar Novo Projeto
            </Button>
        </div>
    );

    return (
        <div className="w-full min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 pt-20">
            <div className="container mx-auto p-8 max-w-6xl">
                <Card className="mb-8 bg-white/60 dark:bg-gray-800/60 backdrop-blur-lg">
                    <CardBody>
                        <div className="flex flex-col md:flex-row items-center md:space-x-6">
                            <Avatar
                                src={session?.user?.image as string}
                                isBordered
                                name={session?.user?.name as string}
                                className="w-32 h-32 mb-4 md:mb-0"
                            />
                            <div className="text-center md:text-left">
                                <h2 className="text-2xl font-bold">{session?.user?.name}</h2>
                                <p className="text-default-500">{session?.user?.email}</p>
                                <div className="mt-4 space-x-2">
                                    <Button
                                        color="primary"
                                        variant="ghost"
                                        onClick={() => setShowEditForm(true)}
                                        className="hover:scale-105 transition-transform"
                                    >
                                        Editar Dados
                                    </Button>
                                    <Button
                                        color="default"
                                        variant="ghost"
                                        onClick={() => router.push('/alterar-senha')}
                                        className="hover:scale-105 transition-transform"
                                    >
                                        Alterar Senha
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </CardBody>
                </Card>

                <Tabs
                    selectedKey={selectedTab}
                    onSelectionChange={setSelectedTab as any}
                    className="mb-6"
                    variant="underlined"
                    aria-label="Dashboard tabs"
                >
                    <Tab key="freelancer" title="Painel Freelancer">
                        <FreelancerDashboard />
                    </Tab>
                    <Tab key="client" title="Painel Cliente">
                        <ClientDashboard />
                    </Tab>
                </Tabs>

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
                                <Button color="primary" variant="ghost" className="relative">
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

                <Modal isOpen={showNewProjectModal} onClose={() => setShowNewProjectModal(false)} size="2xl">
                    <ModalContent>
                        <form onSubmit={handleSubmit(onSubumit)}>
                            <ModalHeader>Criar Novo Projeto</ModalHeader>
                            <ModalBody>
                                <Input
                                    label="Título do Projeto"
                                    variant="bordered"
                                    className="mb-4"
                                    {...register("title")}
                                />
                                <Textarea
                                    label="Descrição"
                                    variant="bordered"
                                    className="mb-4"
                                    {...register("description")}
                                />
                                <Input
                                    label="Orçamento (R$)"
                                    type="number"
                                    variant="bordered"
                                    className="mb-4"
                                    {...register("budget")}
                                />
                                <Input
                                    label="Data Limite"
                                    type="date"
                                    variant="bordered"
                                    className="mb-4"
                                    {...register("deadline")}
                                />
                                <Input
                                    label="Habilidades Necessárias (separadas por vírgula)"
                                    variant="bordered"
                                    {...register("skills")}
                                />

                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onClick={() => setShowNewProjectModal(false)}>
                                    Cancelar
                                </Button>
                                <Button color="primary" type="submit">
                                    Publicar Projeto
                                </Button>
                            </ModalFooter>
                        </form>
                    </ModalContent>
                </Modal>

                <Modal isOpen={showProjectDetailsModal} onClose={() => setShowProjectDetailsModal(false)} size="2xl">
                    <ModalContent>
                        {selectedProject && (
                            <>
                                <ModalHeader>{selectedProject.title}</ModalHeader>
                                <ModalBody>
                                    <div className="space-y-4">
                                        <div>
                                            <h4 className="font-semibold mb-2">Descrição</h4>
                                            <p className="text-default-500">{selectedProject.description}</p>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold mb-2">Orçamento</h4>
                                            <p className="text-default-500">R$ {selectedProject.budget.toFixed(2)}</p>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold mb-2">Data Limite</h4>
                                            <p className="text-default-500">{new Date(selectedProject.deadline).toLocaleDateString('pt-BR')}</p>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold mb-2">Habilidades Necessárias</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {selectedProject.skills.split(',').map((skill, index) => (
                                                    <Chip key={index} variant="flat" color="primary">
                                                        {skill.trim()}
                                                    </Chip>
                                                ))}
                                            </div>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold mb-2">Status</h4>
                                            <Chip variant="dot" color={selectedProject.status === 'OPEN' ? 'success' : 'warning'}>
                                                {selectedProject.status}
                                            </Chip>
                                        </div>
                                    </div>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="danger" variant="light" onClick={() => setShowProjectDetailsModal(false)}>
                                        Fechar
                                    </Button>
                                    <Button color="primary">
                                        Editar Projeto
                                    </Button>
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </Modal>
            </div>
        </div >
    );
}
