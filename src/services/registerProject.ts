"use server";

import prisma from "@/prisma/prisma";
import Project from "@/src/models/Project";
import OnGoingProject from "@/src/models/onGoingProject";
import { removeSolicitation } from "./sendSolicitation";
import { OngoingProject } from "@prisma/client";

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

export async function registerOnGoingProject(project: OnGoingProject) {
    const newProject = await prisma.ongoingProject.create({
        data: project
    });

    await prisma.projectApplication.update({
        where: {
            id: project.id
        },
        data: {
            status: "ACEITO"
        }
    });

    await prisma.project.update({
        where: {
            id: project.projectId
        },
        data: {
            status: "IN_PROGRESS"
        }
    });

    return newProject;
}

export async function getOngoingProjects() {
    const ongoingProjects = await prisma.ongoingProject.findMany();

    return ongoingProjects;
}

export async function finishProject(project: OnGoingProject) {
    const finishedProject = await prisma.ongoingProject.update({
        where: { id: project.id },
        data: { status: "FINISHED" }
    });

    await prisma.project.update({
        where: { id: project.projectId },
        data: { status: "FINISHED" }
    });
}

export async function abandonProject(project: OnGoingProject) {

    console.log(project);
    

    await prisma.ongoingProject.update({
        where: { id: project.id },
        data: { status: "ABANDONED" }
    });

    await prisma.project.update({
        where: { id: project.projectId },
        data: { status: "ABANDONED" }
    });
}

export async function reopenProject(project: OnGoingProject) {
    await prisma.ongoingProject.delete({
        where: { id: project.id }
    });

    await prisma.project.update({
        where: { id: project.projectId },
        data: { status: "OPEN" }
    });
}

export async function reopenClientProject(project: Project) {
    await prisma.project.update({
        where: { id: project.id },
        data: { status: "OPEN" }
    });
}

export async function deleteProject(project: OnGoingProject) {
    await prisma.ongoingProject.delete({
        where: { id: project.id }
    });

    await prisma.project.delete({
        where: { id: project.projectId }
    });
}

export async function closeProject(project: OnGoingProject) {
    await prisma.project.update({
        where: { id: project.id },
        data: { status: "CLOSED" }
    });

    await prisma.ongoingProject.update({
        where: { id: project.id },
        data: { status: "CLOSED" }
    });
}