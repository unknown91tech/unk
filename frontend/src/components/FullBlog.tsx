import { BlogType } from "../hooks"
import { Appbar } from "./Appbar"
import { Avatar } from "./BlogCard"

export const FullBlog = ({blog}: {blog: BlogType}) => {
    console.log(blog.id)
    return <div>
            <Appbar/> 
        <div className="grid grid-cols-4 mx-20  w-full pt-12 max-w-screen-2xl">
            <div className=" col-span-3 ">
                <div className="text-5xl font-extrabold">
                        {blog.title}
                </div>
                <div className="text-slate-500 py-2 ">
                    Posted on 2nd Sept 7098
                </div>
                <div className="text-lg  font-medium">
                      {blog.content}
                </div>
            </div>
            <div className="col-span-1">
                Author
                <div className="flex">
                    <div className="pr-4 flex flex-col justify-center">
                        <Avatar size="big" name={blog.author.name || "Anonymous"} />

                    </div>    
                <div>
                    <div className="text-xl font-bold">
                    {blog.author.name || "Anonymous"}
                </div>
                <div className="pt-2 text-slate-500">
                    Random info about the author
                </div>
                    </div>
                </div>
                
            </div>
            <div>

            </div>
        </div>
    </div>

}