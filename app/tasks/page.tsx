import pageTitle from "@/utils/pageTitle";
import prisma from "@/utils/prisa";
import { Task } from "@prisma/client";
import Link from "next/link";

const prismaClient = prisma();

async function getData() {
  let tasks = await prismaClient.task.findMany();

  return tasks;
}

export default async function Page(props) {
  let tasks = await getData();
  pageTitle.set("Tasks");

  return (
    <main>
      <div className="card bg-white h-full shadow-xl p-4 mx-16">
        <div className="overflow-x-auto">
          <Link href="/tasks/new" className="btn btn-primary mb-4">Add Task</Link>
          <table className="table table-zebra">
            {/* head */}
            <thead>
              <tr>
                <th>Title</th>
                <th>Status</th>
                <th>Priority</th>
                <th>Start Date</th>
                <th>Due Date</th>
              </tr>
            </thead>
            <tbody>
              {
                tasks.map((task: Task) => (
                  <tr key={task.id}>
                    <th>{task.title}</th>
                    <td className="text-capitalize">{task.status}</td>
                    <td className="text-capitalize">{task.priority}</td>
                    <td>{task.startAt.toDateString()}</td>
                    <td>{task.endAt?.toDateString()}</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
