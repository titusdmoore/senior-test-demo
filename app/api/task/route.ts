import prisma from "@/utils/prisa";
import { NextResponse } from "next/server";

const prismaClient = prisma();

export async function GET(req: Request) {
  let tasks = await prismaClient.task.findMany();  

  return new NextResponse( JSON.stringify( tasks ), { status: 200 } );
}
