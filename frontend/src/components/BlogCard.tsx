import { Link } from "react-router-dom";

export interface BlogCardTypes  {
    id: number;
    authorName: string;
    title: string;
    content: string;
    publishedDate: string;
    
}   

export const BlogCard = ({
    id,
    authorName,
    title,
    content,
    publishedDate,
    
}: BlogCardTypes) => {
    // return <div>
    console.log(id)
    console.log(authorName)
    console.log(title)
    console.log(content)
    console.log(publishedDate)

        return    <Link to={`/blog/${id}`}>
            <div className="p-4 pb-2 border-b border-slate-400 max-w-screen-lg cursor-pointer">
        <div className="flex">
            <div className="flex justify-center flex-col">
                <Avatar name={authorName}/>
            </div>
            <div className=" p-2 font-normal text-sm text-black flex justify-center flex-row">
            {authorName} 
            </div>
            <div className="flex justify-center flex-col ">
                <Circle/>
            </div>
            <div className="flex justify-center flex-col font-normal text-slate-400 pl-1.5">
            {publishedDate}
            </div>
        </div>
        <div className="text-xl font-semibold">
            {title}
        </div>
        <div className="text-xl font-thin">
            {(content.length>100) ? content.slice(0,100)+  "..." : content }
        </div>
        <div className="text-slate-400 pt-4">
            {`${Math.ceil(content.length/100)} minute(s) read`}
        </div>
        
    </div>
            </Link>
        {/* </div> */}
    
}
function Circle() {
    return <div className="h-0.5 w-0.5 bg-slate-700 rounded-full">

    </div>
}

export function Avatar({name}: {name: string}) {
    // const split= name.split(" ");
    const firstname= name[0];
    // const lastname = split[1];
    return <div className="relative inline-flex items-center justify-center w-6 h-6 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
    <span className="font-extralight  text-xs text-gray-600 dark:text-gray-300">{firstname[0].toUpperCase()}</span>
    {/* <span className="font-extralight  text-xs text-gray-600 dark:text-gray-300">{lastname[0].toUpperCase()}</span> */}

</div>
}