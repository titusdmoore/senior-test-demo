import NextAuth from "next-auth"
import type { AuthOptions } from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import EmailProvider from "next-auth/providers/email";
import prisma from "@/utils/prisa";

const prismaClient = prisma();

export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(prismaClient),
    providers: [
        EmailProvider({
            server: {
                host: process.env.EMAIL_SERVER_HOST,
                port: process.env.EMAIL_SERVER_PORT,
                auth: {
                    user: process.env.EMAIL_SERVER_USER,
                    pass: process.env.EMAIL_SERVER_PASSWORD
                }
            },
            from: process.env.EMAIL_FROM
        }),
    ],
    session: { strategy: "jwt" },
    callbacks: {
        async signIn({ user }) { 
            const userExists = await prismaClient.user.findUnique({ 
                where: { email: user.email }
            });
            if (userExists) {
                return true;   
            } else {
                return "/public/register"; 
            }
        },
    },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
