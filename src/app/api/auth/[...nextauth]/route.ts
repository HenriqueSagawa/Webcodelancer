import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { getUser } from "@/src/services/register";
import bcrypt from "bcryptjs";



const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            authorization: {
                params: {
                    prompt: "select_account"
                }
            }
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
            authorization: {
                params: {
                    prompt: "select_account"
                }
            }
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "email", type: "email"},
                password: { label: "password", type: "password"},
            },
            async authorize(credentials: any, req: any): Promise<any> {

                try {
                    const user: any = await getUser(credentials.email);

                    if (!user) {
                        return null;
                    }
                    
                    const isValidPassword = credentials.password == user.password;
    
                    if (!isValidPassword) {
                        return null;
                      }
    
                    return user;
                } catch (err) {
                    return null;
                }
                
                
        

            }
        })
    ],
    secret: process.env.NEXTAUTH_SECRET as string
})

export { handler as GET, handler as POST };