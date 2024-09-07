import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { createBlogInput, updateBlogInput } from "@unknown_9190002/common-meduim";
import { Hono } from "hono";
import { verify } from "hono/jwt";

export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL : string
        SECRET : string
    },
    Variables :{
        userId : any
    }
}>();

blogRouter.use('/', async (c, next) => {

    const authHeader  = c.req.header("authorization") || "";
    const user  = await verify(authHeader , c.env.SECRET)
    if(user){
        c.set("userId", user.id);
        await next();
    }
    else{
        c.status(403)
        return c.json({
            message: "You are not logged in"
        })
    }
    
})

blogRouter.post('/',  async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate())

    const body = await c.req.json();

    const {success} = createBlogInput.safeParse(body);
    if(!success){
        c.status(411)
        return c.json({
            message: "Imputs are not correct"
        })
    }

    const authorId = c.get("userId")

    const blog = await prisma.blog.create({
        data: {
            title: body.title,
            content: body.content,
            authorId: Number(authorId)
        }
    })
    return c.json({
        id: blog.id
    })

})
  
blogRouter.put('/', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate())

    const body = await c.req.json();
    const {success} = updateBlogInput.safeParse(body);
      if(!success){
        c.status(411)
        return c.json({
            message: "Imputs are not correct"
        })
      }

    const blog = await prisma.blog.update({
        where: {
            id: body.id
        },
        data: {
            title: body.title,
            content: body.content,
        }
    })
    return c.json({
        id: blog.id
    })
})

blogRouter.get('/bulk',async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate())

    try{
        const blogs = await prisma.blog.findMany({
            select: {
                id: true,
                content:true,
                title:true,
                authorId:true,
                author:{
                    select:{
                        name:true
                    }
                }
            }
        }); 
        return c.json({blogs})
    }
    catch(e){
        c.json(411);
        return c.json({error: "not valid"})
    }
})
  

blogRouter.get('/:id', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate())

    const id =  c.req.param("id");

    try{
        const blog = await prisma.blog.findFirst({
            where: {
                id: Number(id)
            },
            select: {
                id: true,
                title: true,
                content: true,
                author: {
                    select: {
                        name: true
                    }
                }
            }
        })
    
        return c.json({
            blog
        });
    }
    catch(e){
        c.status(411);
        return c.json({error: "invalid request"})
    }
})
