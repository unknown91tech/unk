import { BlogType } from "../hooks"
import { Appbar } from "./Appbar"

export const FullBlog = ({blog}: {blog: BlogType}) => {
    console.log(blog)
    return <div>
            <Appbar/> 
        <div className="grid grid-cols-4 px-10  w-full bg-yellow-300 pt-20">
            <div className=" col-span-3 ">
                <div className="text-5xl bg-red-300 font-extrabold">
                        gg
                </div>
                <div className="text-xl bg-green-300 font-medium">
                      gg
                </div>
            </div>
            <div className="col-span-1 ">
                di
            </div>
        </div>
    </div>

}