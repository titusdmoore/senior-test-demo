import { getSession } from '@/utils/session';
import Image from 'next/image'
import Link from 'next/link';
import pageTitle from '@/utils/pageTitle';

export default async function Home() {
  pageTitle.set('Dashboard');
  console.log(pageTitle.get())

  return (
    <main className="flex min-h-screen w-full h-full flex-col">
      <section className="grid grid-cols-3 gap-6 px-16 py-4">
        <div className="card col-span-3 bg-white h-96 text-base-200 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">My Tasks</h2>
          </div>
        </div>
        <div className="card col-span-2 text-base-200 bg-white h-80 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Active & Upcoming Tasks</h2>
          </div>
        </div>
        <div className="card col-span-1 text-base-200 bg-white h-80 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Overdue Tasks</h2>
          </div>
        </div>
      </section>
    </main>
  );
}
