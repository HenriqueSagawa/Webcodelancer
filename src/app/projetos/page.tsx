"use client"

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Card, CardBody, CardHeader, Chip, Button, Divider, Pagination, Skeleton, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Textarea } from "@nextui-org/react";
import Project from "@/src/models/Project";
import { getProjects } from "@/src/services/registerProject";
import { Footer } from "@/src/components/Footer/Footer";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { sendSolicitation } from "../../services/sendSolicitation";

export default function ProjetosDisponiveis() {
    const { data: session } = useSession();
    const [projects, setProjects] = useState<Project[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
    const projectsPerPage = 5;

    useEffect(() => {
        getProjects()
            .then(setProjects)
            .finally(() => setIsLoading(false));
    }, []);

    const SolicitationScheme = z.object({
        projectId: z.string().default(() => selectedProject?.id || ""),
        message: z.string().min(10, { message: "A mensagem deve ter pelo menos 10 caracteres" }),
        freelancerEmail: z.string().email().default(() => session?.user?.email || ""),
        status: z.string().default("PENDING"),
        clientEmail: z.string().email().default(() => selectedProject?.clientEmail || ""),
    });

    type SolicitationType = z.infer<typeof SolicitationScheme>;

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SolicitationType>({
        resolver: zodResolver(SolicitationScheme),
    });

    const onSubmit = async (data: SolicitationType) => {
        try {
            await sendSolicitation(data);
            console.log("Solicitação enviada com sucesso");
        } catch (err) {
            console.log("Erro ao enviar solicitação:", err);
        }
    };

    const indexOfLastProject = currentPage * projectsPerPage;
    const indexOfFirstProject = indexOfLastProject - projectsPerPage;
    const currentProjects = projects.slice(indexOfFirstProject, indexOfLastProject);
    const totalPages = Math.ceil(projects.length / projectsPerPage);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const truncateText = (text: string, maxLength: number) => {
        if (text.length <= maxLength) return text;
        return text.slice(0, maxLength) + "...";
    };

    const handleProjectClick = (project: Project) => {
        setSelectedProject(project);
        setIsModalOpen(true);
    };

    const handleApplyClick = (project: Project) => {
        setSelectedProject(project);
        setIsApplyModalOpen(true);
    };

    const handleSubmitApplication = () => {
        setIsApplyModalOpen(false);
    };

    const renderSkeletons = () => (
        Array(projectsPerPage).fill(0).map((_, index) => (
            <Card key={index} className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-lg">
                <CardHeader className="flex justify-between items-center">
                    <Skeleton className="w-1/3 rounded-lg">
                        <div className="h-6 rounded-lg bg-default-200"></div>
                    </Skeleton>
                    <Skeleton className="w-24 rounded-lg">
                        <div className="h-6 rounded-lg bg-default-200"></div>
                    </Skeleton>
                </CardHeader>
                <Divider />
                <CardBody>
                    <Skeleton className="w-full rounded-lg mb-4">
                        <div className="h-20 rounded-lg bg-default-200"></div>
                    </Skeleton>

                    <Skeleton className="w-32 rounded-lg mb-4">
                        <div className="h-6 rounded-lg bg-default-200"></div>
                    </Skeleton>

                    <div className="flex justify-between items-center">
                        <div className="space-y-2">
                            <Skeleton className="w-48 rounded-lg">
                                <div className="h-4 rounded-lg bg-default-200"></div>
                            </Skeleton>
                            <Skeleton className="w-36 rounded-lg">
                                <div className="h-4 rounded-lg bg-default-200"></div>
                            </Skeleton>
                        </div>
                        <Skeleton className="w-32 rounded-lg">
                            <div className="h-9 rounded-lg bg-default-200"></div>
                        </Skeleton>
                    </div>
                </CardBody>
            </Card>
        ))
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 pt-20">
            <div className="container mx-auto p-8 max-w-6xl">
                <h1 className="text-2xl font-bold mb-6">Projetos Disponíveis</h1>

                <div className="grid gap-6">
                    {isLoading ? (
                        renderSkeletons()
                    ) : (
                        <>
                            {currentProjects.map((project) => (
                                <Card key={project.id} className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-lg">
                                    <CardHeader className="flex justify-between items-center">
                                        <h2 className="text-xl font-semibold">{truncateText(project.title, 50)}</h2>
                                        <Chip color="success" variant="flat">
                                            R$ {project.budget.toLocaleString('pt-BR')}
                                        </Chip>
                                    </CardHeader>
                                    <Divider />
                                    <CardBody>
                                        <p className="text-default-500 mb-4">
                                            {truncateText(project.description, 150)}
                                        </p>

                                        <div className="flex flex-wrap gap-2 mb-4">
                                            <Chip variant="flat" size="sm">
                                                {project.skills}
                                            </Chip>
                                        </div>

                                        <div className="flex justify-between items-center">
                                            <div className="text-sm text-default-500">
                                                <p>Cliente: {project.clientEmail}</p>
                                                <p>Prazo: {new Date(project.deadline).toLocaleDateString('pt-BR')}</p>
                                            </div>
                                            <div className="flex gap-2">
                                                <Button
                                                    color="secondary"
                                                    variant="light"
                                                    onClick={() => handleProjectClick(project)}
                                                >
                                                    Ver Detalhes
                                                </Button>
                                                <Button
                                                    color="primary"
                                                    className="hover:scale-105 transition-transform"
                                                    onClick={() => handleApplyClick(project)}
                                                >
                                                    Candidatar-se
                                                </Button>
                                            </div>
                                        </div>
                                    </CardBody>
                                </Card>
                            ))}

                            {projects.length === 0 && (
                                <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-lg">
                                    <CardBody>
                                        <p className="text-center text-default-500">
                                            Nenhum projeto disponível no momento.
                                        </p>
                                    </CardBody>
                                </Card>
                            )}

                            <Modal
                                isOpen={isModalOpen}
                                onClose={() => setIsModalOpen(false)}
                                size="2xl"
                            >
                                <ModalContent>
                                    {selectedProject && (
                                        <>
                                            <ModalHeader>
                                                <h2 className="text-xl font-semibold">{selectedProject.title}</h2>
                                            </ModalHeader>
                                            <ModalBody className="pb-6">
                                                <div className="space-y-4">
                                                    <div>
                                                        <h3 className="font-semibold mb-2">Descrição:</h3>
                                                        <p className="text-default-500">{selectedProject.description}</p>
                                                    </div>
                                                    <div>
                                                        <h3 className="font-semibold mb-2">Habilidades Necessárias:</h3>
                                                        <div className="flex flex-wrap gap-2">
                                                            <Chip variant="flat" size="sm">
                                                                {selectedProject.skills}
                                                            </Chip>
                                                        </div>
                                                    </div>
                                                    <div className="flex justify-between items-center">
                                                        <div>
                                                            <p className="font-semibold">Orçamento:</p>
                                                            <p className="text-success">R$ {selectedProject.budget.toLocaleString('pt-BR')}</p>
                                                        </div>
                                                        <div>
                                                            <p className="font-semibold">Prazo:</p>
                                                            <p>{new Date(selectedProject.deadline).toLocaleDateString('pt-BR')}</p>
                                                        </div>
                                                        <Button
                                                            color="primary"
                                                            className="hover:scale-105 transition-transform"
                                                            onClick={() => {
                                                                setIsModalOpen(false);
                                                                handleApplyClick(selectedProject);
                                                            }}
                                                        >
                                                            Candidatar-se
                                                        </Button>
                                                    </div>
                                                </div>
                                            </ModalBody>
                                        </>
                                    )}
                                </ModalContent>
                            </Modal>

                            <Modal
                                isOpen={isApplyModalOpen}
                                onClose={() => setIsApplyModalOpen(false)}
                                size="2xl"
                            >
                                <ModalContent>
                                    {selectedProject && (
                                        <>
                                            <form onSubmit={handleSubmit(onSubmit)}>
                                                <ModalHeader>
                                                    <h2 className="text-xl font-semibold">Candidatar-se ao Projeto</h2>
                                                </ModalHeader>
                                                <ModalBody>

                                                    <div className="space-y-4">
                                                        <div>
                                                            <h3 className="font-semibold">Projeto: {selectedProject.title}</h3>
                                                            <p className="text-default-500">Orçamento: R$ {selectedProject.budget.toLocaleString('pt-BR')}</p>
                                                        </div>
                                                        <div>
                                                            <label className="block font-semibold mb-2">
                                                                Sua Proposta:
                                                            </label>
                                                            <Textarea
                                                                placeholder="Descreva por que você seria a melhor escolha para este projeto..."
                                                                minRows={4}
                                                                className="w-full"
                                                                {...register("message")}
                                                            />
                                                        </div>
                                                    </div>
                                                </ModalBody>
                                                <ModalFooter>
                                                    <Button
                                                        color="danger"
                                                        variant="light"
                                                        onClick={() => setIsApplyModalOpen(false)}
                                                    >
                                                        Cancelar
                                                    </Button>
                                                    <Button
                                                        type="submit"
                                                        color="primary"
                                                    >
                                                        Enviar Candidatura
                                                    </Button>
                                                </ModalFooter>
                                            </form>
                                        </>
                                    )}
                                </ModalContent>
                            </Modal>
                        </>
                    )}
                </div>

                {!isLoading && projects.length > 0 && (
                    <div className="flex justify-center mt-8">
                        <Pagination
                            total={totalPages}
                            initialPage={1}
                            page={currentPage}
                            onChange={handlePageChange}
                            showControls
                            color="primary"
                            className="gap-2"
                        />
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
}
