import pageTitle from "@/utils/pageTitle";

export default async function Page(props) {
  pageTitle.set("Profile");

  return (
    <main>
      <div className="card bg-white h-full shadow-xl p-4 mx-16">
      </div>
    </main>
  );
}
