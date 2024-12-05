"use server";

import prisma from "@/prisma/prisma";
import Project from "@/src/models/Project";

export async function registerProject(project: Project) {
    const newProject = await prisma.project.create({
        data: project
    });

    return newProject;
}

export async function getProjects() {
    const projects = await prisma.project.findMany();

    return projects;
}