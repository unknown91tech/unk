import { Hono } from 'hono'
import { decode , sign , verify } from 'hono/jwt'
import { userRouter } from './routes/user'
import { blogRouter } from './routes/blog'


const app = new Hono<{
  Bindings:{
    DATABASE_URL: string,
    SECRET : string
  }
}>()

app.route("/api/v1/user", userRouter);
app.route("/api/v1/blog", blogRouter);


// app.use('*' , async (c,next) => {

//   const prisma = new PrismaClient({
//     datasources: {
//       db: {
//         url: c.env.DATABASE_URL
//       }
//     }
//   }).$extends(withAccelerate())

//   c.set('prisma' , prisma)
//   await next()
// })

app.use('api/v1/blog/*' ,  async (c,next) => {

  // get the header
  // verfiy the header
  // if the header is corret , we need to proceed ,
  // if not then give staus of 403 and json with error

  const header =  c.req.header("authorization") || "";
  const token = header.split(" ")[1];
  const respone = await verify(token , c.env.SECRET)

  if(respone.id){
    await next()
  }
  else{
    c.status(403)
    return c.json({
      error: "unauthorized"
    })
  }
})


export default app
