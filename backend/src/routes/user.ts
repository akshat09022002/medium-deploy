import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import {decode,sign,verify} from 'hono/jwt'
import { signupInput,signinInput } from '@hitemup09/blogsite-common';

export const userRouter = new Hono<{
	Bindings: {
	DATABASE_URL: string  // to specify that Database_url is a string;
    JWT_SECRET: string
	}
}>();

userRouter.get('/getDetails', async(c)=>{
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

   const token= await c.req.header("authorization");
   if(!token){
    c.status(500);
    return c.json({
      "msg":"Invalid Request"
    })
   }

    try{
    const response=await verify(token,c.env.JWT_SECRET);
    
    const user=await prisma.user.findFirst({
      where:{
        id: response.id
      }
    })

    if(user){
      return c.json({
        firstname: user.firstname,
        lastname: user.lastname

      })
    }
    else{
      c.status(500);
      return c.json({
        "msg":"Invalid Request"
      })
    }
  }catch(err){

  }
})

userRouter.post('/signup', async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    
    const body = await c.req.json();

    const response= signupInput.safeParse(body);

    if(!response.success){
        c.status(422);
        return c.json({
            "msg": "invalid credentials"
        })
    }
  
    try{
      const user= await prisma.user.create({
        data:{
          email: body.email,
          password: body.password,
          firstname: body.firstname,
          lastname: body.lastname
        }
      })
      // c.status(200);
      return c.json({
        "msg":"Account Created Successfully"
      })

    }catch(e){
      c.status(403);
      return c.json({
        "msg":"user alrerady exists"
      })
    }
  })
  
  userRouter.post('/signin', async (c) => {
    const body = await c.req.json();
    console.log(body);
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());


    const response= signinInput.safeParse(body);
    if(!response.success){
        c.status(422);
        return c.json({
            "msg": "Invalid Credentials"
        })
    }
  
    try{
      const user= await prisma.user.findFirst({
        where: {
          email: body.email,
          password: body.password
        }
    })

    if(!user){
      c.status(403);
      return c.json({
        msg: "Login Credentials Are Invalid"
      })
    }

    const token=await sign({id: user.id},c.env.JWT_SECRET)
      
    return c.json({
      jwt: token
    })

    }catch(e){
      c.status(503);
      return c.json({
        msg:"Something Went Wrong"
      })
    }
    
  })

  