import { getSession } from '@/utils/session';
import Image from 'next/image'
import Link from 'next/link';
import pageTitle from '@/utils/pageTitle';
import prisma from '@/utils/prisa';
import TasksTable from './tasksTable';
import { Task } from '@prisma/client';

const prismaClient = prisma();

async function getData() {
  let tasks = await prismaClient.task.findMany();

  return tasks;
}

export default async function Home() {
  pageTitle.set('Dashboard');
  let tasks = await getData();

  return (
    <main className="flex min-h-screen w-full h-full flex-col">
      <section className="grid grid-cols-3 gap-6 px-16 py-4">
        <div className="card col-span-3 bg-white h-96 text-base-200 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">My Tasks</h2>
            <TasksTable tasks={tasks} />
          </div>
        </div>
        <div className="card col-span-2 text-base-200 bg-white h-80 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Active & Upcoming Tasks</h2>
            <table className="table table-zebra text-black">
              <thead>
                <tr className="text-black">
                  <th>Title</th>
                  <th>Status</th>
                  <th>Due Date</th>
                </tr>
              </thead>
              <tbody>
                {
                  tasks.filter((task: Task) => {
                    return task.startAt > new Date(Date.now());
                  }).map((task: Task, index: number) => {
                    return (
                      <tr className={`${index % 2 == 0 ? "text-black" : "text-white"}`}>
                        <td>{task.title}</td>
                        <td className="text-capitaize">{task.status}</td>
                        <td>{task.endAt?.toDateString()}</td>
                      </tr>
                    );
                  })
                }
              </tbody>
            </table>
          </div>
        </div>
        <div className="card col-span-1 text-base-200 bg-white h-80 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Overdue Tasks</h2>
            <table className="table table-zebra text-black">
              <thead>
                <tr className="text-black">
                  <th>Title</th>
                  <th>Due Date</th>
                </tr>
              </thead>
              <tbody>
                {
                  tasks.filter((task: Task) => {
                    return task.endAt && task.endAt < new Date(Date.now());
                  }).map((task: Task, index: number) => {
                    return (
                      <tr className={`${index % 2 == 0 ? "text-black" : "text-white"}`}>
                        <td>{task.title}</td>
                        <td>{task.endAt?.toDateString()}</td>
                      </tr>
                    );
                  })
                }
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>
  );
}
