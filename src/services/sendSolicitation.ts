"use server";

import prisma from "@/prisma/prisma";
import SolicitationType from "@/src/models/SolicitationType";

export async function sendSolicitation(solicitation: SolicitationType) {
    const { projectId, message, freelancerEmail, status, clientEmail } = solicitation;

    const newSolicitation = await prisma.projectApplication.create({
        data: { projectId, message, freelancerEmail, status, clientEmail }
    });
}

export async function getSolicitations() {
    const solicitations = await prisma.projectApplication.findMany();
    console.log(solicitations);
    return solicitations;
}

export async function removeSolicitation(id: string) {
    await prisma.projectApplication.delete({
        where: { id }
    });
}