import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign } from "hono/jwt";
import { signinInput , signupInput } from "@unknown_9190002/common-meduim";
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

  
  const body = await c.req.json();
  const { success } = signupInput.safeParse(body);
if (!success) {
    c.status(411);
    return c.json({
        message: "Inputs are not correct"
    })
}
  try{
  const user = await prisma.user.create({
    data:{
      email: body.email,
      password: body.password,
    },
  })

  const token = await sign({id: user.id}, c.env.SECRET);

  return c.json({
    jwt:  token
  })
}
catch(e){
    console.log(e)
    c.status(403)
    return c.json({error: 'request invalid'})
}
})

userRouter.post('/signin', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  const body = await c.req.json();

  const { success } = signinInput.safeParse(body);
if (!success) {
    c.status(411);
    return c.json({
        message: "Inputs are not correct"
    })
}

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
  const token = await sign({id: checker.id}, c.env.SECRET);

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
