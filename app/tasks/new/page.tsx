import pageTitle from "@/utils/pageTitle";
import NewTaskForm from "./newTaskForm";

export default async function Page(props: any) {
  pageTitle.set("Add New Task");

  return (
    <main>
      <section>
        <div className="card bg-white h-full shadow-xl p-4 mx-16">
          <NewTaskForm />
        </div>
      </section>
    </main>
  );
}
