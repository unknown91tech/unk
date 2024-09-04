import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";

export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL : string
        SECRET : string
    }
}>();

blogRouter.use('/', async (c, next) => {

    await next();
})

blogRouter.post('/',  async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate())

    const body = await c.req.json();

    const blog = await prisma.blog.create({
        data: {
            title: body.title,
            content: body.content,
            authorId: 1
        }
    })
    return c.json({
        id: blog.id
    })

})
  
blogRouter.put('/', (c) => {
return c.text('Hello Hono!')
})

blogRouter.get('/:id', (c) => {
return c.text('Hello Hono!')
})

blogRouter.get('/bulk', (c) => {
return c.text('Hello Hono!')
})
  