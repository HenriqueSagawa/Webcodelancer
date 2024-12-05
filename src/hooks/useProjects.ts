import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

interface Project {
    id: string;
    title: string;
    description: string;
    budget: number;
    deadline: Date;
    status: string;
    requiredSkills: string;
    clientEmail: string;
}

export function useProjects() {
    const { data: session } = useSession();
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchProjects = async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/projects/create');
            const data = await response.json();

            if (data.success) {
                setProjects(data.data);
                setError('');
            } else {
                setError(data.error);
            }
        } catch (err) {
            setError('Erro ao carregar projetos');
        } finally {
            setLoading(false);
        }
    };

    const createProject = async (projectData: Omit<Project, 'id' | 'clientEmail' | 'status'>) => {
        try {
            const response = await fetch('/api/projects/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(projectData),
            });

            const data = await response.json();

            if (data.success) {
                await fetchProjects(); // Recarrega a lista de projetos
                return { success: true };
            } else {
                return { success: false, error: data.error };
            }
        } catch (err) {
            return { success: false, error: 'Erro ao criar projeto' };
        }
    };

    useEffect(() => {
        if (session?.user?.email) {
            fetchProjects();
        }
    }, [session]);

    return {
        projects,
        loading,
        error,
        createProject,
        refreshProjects: fetchProjects
    };
} 