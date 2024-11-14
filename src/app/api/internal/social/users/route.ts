import { createClerkClient } from "@clerk/nextjs/server"

export async function GET(req: Request) {

    const clerkClient = createClerkClient({
        secretKey: process.env.CLERK_SECRET_KEY
    })

    const users = await clerkClient.users.getUserList()

    return Response.json(users)
}