import prisma from "@/utils/prisa";
import { NextResponse } from "next/server";

const prismaClient = prisma();

export async function GET(req: Request) {
  let tasks = await prismaClient.task.findMany();  
  
  return NextResponse.json({ data: { tasks }}, { status: 200 } );
}

export async function POST(req: Request) {
  let pendingTask = await req.json();
  
  let task = await prismaClient.task.create({
    data: {
      ...pendingTask,
      assignees: {}, 
      categories: {}, 
    },
  });

  return NextResponse.json(task, { status: 200 });
}
