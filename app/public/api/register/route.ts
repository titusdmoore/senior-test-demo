import prisma from "@/utils/prisa";
import { NextResponse } from "next/server";

const prismaClient = prisma();

export async function POST(req: Request) {
    let pendingUser = await req.json();
    
    if ( !pendingUser.email || !pendingUser.name ) {
        return new NextResponse("Name and Email are required to register.", { status: 400 });
    }

    let user = await prismaClient.user.create({
        data: {
            email: pendingUser.email,
            name: pendingUser.name,
        }
    });

    if ( !user ) {
        return new NextResponse("Unable to create user.", { status: 500 });
    }

    return new NextResponse("User Created", { status: 200 });
}
