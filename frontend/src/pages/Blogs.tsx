import { Appbar } from "../components/Appbar"
import { BlogCard } from "../components/BlogCard"
import { BlogSkeleton } from "../components/BlogSkleton";
import { useBlogs } from "../hooks"

export const Blogs = () => {
    const {loading, blogs} = useBlogs();
    // console.log(blogs)
    // console.log(blogs.id)

    if(loading){
        return <div>
            <div>
                <Appbar/>
            </div>
            <div className="flex justify-center">
            
            <div>
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
            </div>
            </div>

        </div>
    }
    return <div>
        <Appbar />
        <div  className="flex justify-center">
            <div>
                {blogs.map(blog => 
                <BlogCard
                    id={blog.id}
                    authorName={blog.author.name || "Anonymous"}
                    title={blog.title}
                    content={blog.content}
                    publishedDate={"12 Aug 1987"}
                />)}
            </div>
        </div>
    </div>
}