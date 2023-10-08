import { Task } from "@prisma/client";

export default function TasksTable({ tasks }: { tasks: Task[] }) {
  return (
    <table className="table table-zebra text-black">
      <thead>
        <tr className="text-black">
          <th>Title</th>
          <th>Status</th>
          <th>Priority</th>
          <th>Start Date</th>
          <th>Due Date</th>
        </tr>
      </thead>
      <tbody className="overflow-scroll">
        {
          tasks.map((task: Task, index: number) => (
            <tr key={task.id} className={`${index % 2 == 0 ? "text-black" : "text-white"}`}>
              <td>{task.title}</td>
              <td className="text-capitalize">{task.status}</td>
              <td className="text-capitalize">{task.priority}</td>
              <td>{task.startAt.toDateString()}</td>
              <td>{task.endAt?.toDateString()}</td>
            </tr>
          ))
        }
      </tbody>
    </table>
  );
}
