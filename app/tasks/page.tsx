import pageTitle from "@/utils/pageTitle";
import prisma from "@/utils/prisa";
import { Task } from "@prisma/client";
import Link from "next/link";
import TasksTable from "../tasksTable";

const prismaClient = prisma();

async function getData() {
  let tasks = await prismaClient.task.findMany();

  return tasks;
}

  pageTitle.set("Tasks");
export default async function Page(props) {
  let tasks = await getData();

  return (
    <main>
      <div className="card bg-white h-full shadow-xl p-4 mx-16">
        <div className="overflow-x-auto text-black">
          <Link href="/tasks/new" className="btn btn-primary mb-4">Add Task</Link>
          <TasksTable tasks={tasks} />
        </div>
      </div>
    </main>
  );
}
