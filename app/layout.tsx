import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Provider from './context/client-context'
import { getSession } from '@/utils/session'
import Link from 'next/link'
import pageTitle from '@/utils/pageTitle'
import Image from 'next/image'
import TMLogo from '@/public/tm-logo-light.svg'
import ClientButton from './ClientButton'
import { signOut } from 'next-auth/react'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Titus\' Task Manager',
  description: 'A simple task manager build with nextjs for the senior engineer role',
}

async function logoutAction() {
  "use server";

  signOut();
}


export default async function RootLayout({ children, }: { children: React.ReactNode }) {
  const session = await getSession();

  return (
    <html lang="en">
      <body className={`flex flex-row${inter.className}`}>
        <Provider session={session}>
          <aside className='w-64 min-h-screen h-full'>
            <Link href='/'>
              <div className="flex flex-row justify-center py-4 px-16">
                <Image src={TMLogo} alt="TM Logo"  />
              </div>
            </Link>
            <nav className="mt-12 flex flex-col justify-between min-h-full">
              <ul className='px-4'>
                <li className="mb-4">
                  <Link href='/' className="btn btn-primary w-full py-1">
                    Dashboard
                  </Link>
                </li>
                <li className="mb-4">
                  <Link href='/tasks' className="btn btn-primary w-full py-1">
                    Tasks 
                  </Link>
                </li>
              </ul>
              <ClientButton className="btn btn-neutral mx-4 text-white">
                Logout
              </ClientButton>
            </nav> 
          </aside>
          <div className='flex flex-col w-full'>
            <header className="px-16 py-4 flex flex-row justify-between items-center">
              <h1 className="text-2xl font-bold">{pageTitle.get()}</h1>
              <Link href="/profile" className="group flex flex-row items-center rounded-md p-2 text-white group-hover:bg-base" aria-label="View Profile">
                <div className="avatar">
                  <div className="w-12 rounded bg-blue-600">
                  </div>
                </div>
                <div className="ml-4">
                  <p>
                    {session.user.name}
                  </p>
                  <p className="text-base-content text-xs border-b border-transparent group-hover:border-base-content w-fit">
                    View Profile 
                  </p>
                </div>
              </Link>
            </header>
            {children}
          </div>
        </Provider>
      </body>
    </html>
  );
}
