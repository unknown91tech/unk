import { PrismaClient } from "@prisma/client/extension";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { use } from "hono/jsx";
import { sign } from "hono/jwt";

export const userRouter =  new Hono<{
    Bindings: {
        DATABASE_URL: string
        SECRET: string
    }
}>();


userRouter.post('/signup',async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  // const prisma = c.get('prisma')
  
  const body = await c.req.json();

  const user = await prisma.user.create({
    data:{
      email: body.email,
      password: body.password,
    },
  })

  const secret = c.env.SECRET;
  const token = await sign({id: user.id, email: user.email , password: user.password}, c.env.SECRET);

  return c.json({
    jwt:  token
  })
})

userRouter.post('/signin', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  const body = await c.req.json();

  try{
    const checker = await prisma.user.findUnique({
    where: {
      email :  body.email,
      password : body.password
    }
  })
  if(!checker){
    c.status(403)
    return c.json({
      error: "user not found"
    })
  }
  const token = await sign({id: checker.id, email: checker.email , password: checker.password}, c.env.SECRET);

    return c.json({
      message: "you are signed in"
    })
  }

  catch(e){
    c.status(403);
    return c.json({
      error: "Invalid"
    })  
  }
})
