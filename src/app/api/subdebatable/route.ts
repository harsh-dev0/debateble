import { getAuthSession } from "@/lib/auth"
import { db } from "@/lib/db"
import { SubdebatableValidator } from "@/lib/validators/subdebatable"
import { z } from 'zod'

export async function POST(req: Request) {
    try {
       const session = await getAuthSession()
       if(!session?.user){
        return new Response('Unauthorized', { status: 401})
       }

       const body = await req.json()
       const { name } = SubdebatableValidator.parse(body)

       const subdebatableExists = await db.subdebatable.findFirst({
        where: {
            name,
        },
       })

       if(subdebatableExists){
        return new Response('Subdebatable already exists', { status: 409})
       }

       const subdebatable = await db.subdebatable.create({
           data: {
            name,
            creatorId: session.user.id,
           },
            
       })

       return new Response('subdebatable.name')
    } catch (error) {
        
        if(error instanceof z.ZodError){
            return new Response(error.message, { status: 422 })
        }
        return new Response('Could not create subreddit', { status: 500 })
    }
}