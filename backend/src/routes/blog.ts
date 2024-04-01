import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'
import { UpdateBlogInput, CreateBlogInput, createBlogInput, updateBlogInput } from '@hitemup09/blogsite-common'
import { string } from 'zod'

export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string  // to specify that Database_url is a string;
        JWT_SECRET: string
    },
    Variables: {
        userId: string;
    }
}>();

function dateGenerator() {
    let currentDate = new Date();

    let day = currentDate.getDate().toString().padStart(2, '0');
    let month = currentDate.toLocaleString('en-US', { month: 'long' });
    let year = currentDate.getFullYear();

    let formattedDate = `${day} ${month} ${year}`;
    return formattedDate;
}

blogRouter.use("/post/*", async (c, next) => {
    const token = c.req.header("authorization") || "";
    console.log("middle ware called");

    try {
        const user = await verify(token, c.env.JWT_SECRET)
        c.set("userId", user.id);
        await next();
    } catch (err) {
        c.status(403);
        return c.json({
            "msg": "You Are Not Logged In"
        })
    }

})

blogRouter.post('/post', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const body = await c.req.json();

    const success = createBlogInput.safeParse(body);

    if (!success) {
        c.status(422);
        console.log("Invalid Credentials");
    }

    const authorId = c.get("userId");

    const formattedDate = dateGenerator();

    try {
        const blog = await prisma.post.create({
            data: {
                title: body.title,
                content: body.content,
                authorId: authorId,
                published: formattedDate,
            }

        })

        return c.json({
            id: blog.id
        })

    } catch (err) {
        c.status(500);
        return c.json({
            msg: "something went wrong"
        })
    }


})

blogRouter.put('/post', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const body = await c.req.json();

    const success = updateBlogInput.safeParse(body);
    if (!success) {
        c.status(422);
        console.log("Invalid Credentials");
    }

    const authorId = c.get("userId");

    try {

        const blog = await prisma.post.update({
            where: {
                id: body.id,
                authorId: authorId
            },
            data: {
                title: body.title,
                content: body.content
            }
        })

        return c.json({
            "msg": blog.id
        })
    } catch (err: any) {
        c.status(403);
        return c.json({
            "msg": "Something went wrong"
        })
    }

})

blogRouter.get('/get/:id', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const id = c.req.param("id");

    try {
        const blog = await prisma.post.findFirst({
            where: {
                id: id
            }
        })

        return c.json({
            blog
        })

    } catch (e) {

        c.status(411);
        return c.json({
            message: 'Error while fetching blog post'
        })
    }

});

// Todo add: pagination --> to get some todos and get others as user scroll down
blogRouter.get('/bulk', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    
    try {
            const blog = await prisma.post.findMany({
                select: {
                    id: true,
                    title: true,
                    content: true,
                    published: true,
                    author: {
                        select: {
                            firstname: true,
                            lastname: true,
                        }

                    }

                }
            });

            return c.json({
                blog
            })
        
    } catch (err) {
        c.status(500);
        return c.json({
            "msg": "Something Went Wrong"
        })
    }
})
