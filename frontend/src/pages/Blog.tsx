import { useParams } from "react-router-dom";
import { useBlog } from "../hooks"
import { FullBlog } from "../components/FullBlog";
import { Appbar } from "../components/Appbar";

export const Blog = () => {
    const { id } = useParams();
    const {loading, blog} = useBlog({
        id: id || ""
    });
    console.log(id)
    console.log(blog)
    if (loading || !blog) {
        return <div>
            <Appbar />
        </div>
    }
    return <div>
        {/* {console.log(blog.id)} */}
        <FullBlog blog = {blog} />
    </div>
}