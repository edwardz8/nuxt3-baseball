import prisma from "../client";
// import { IHitter } from '~/types/IHitter';

export async function getHitters() {
    const hitters = await prisma.hitter.findMany()
    return hitters
}

export async function getHitterById(id: number) {
    return await prisma.hitter.findUnique({
        where: {
            id: id,
        },
        select: {
            id: true,
            name: true,
            team: true,
            games: true,
            homeruns: true, 
            doubles: true,
            triples: true,
            atBats: true,
            war: true,
            adp: true,
            hits: true,
            walks: true,
            avg: true, 
        },
    })
}
