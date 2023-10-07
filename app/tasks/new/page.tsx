import pageTitle from "@/utils/pageTitle";

export default async function Page(props) {
  pageTitle.set("Add New Task");

  return (
    <main>
      <section>
        <div className="card bg-white h-full shadow-xl p-4 mx-16">
        </div>
      </section>
    </main>
  );
}
