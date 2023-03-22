import "./posts.scss"
import Post from "../post/Post";
import { useQuery } from '@tanstack/react-query';
import { makeRequest } from '../../axios';

const Posts = () => {

    // const posts = [
    //     {
    //         id: 1,
    //         name: "John Doe",
    //         userId: 1,
    //         profilePic: "https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg",
    //         desc: "All natural",
    //         img: "https://www.muscleandfitness.com/wp-content/uploads/2020/01/machinepreachercurls.jpg?w=800&h=731&crop=1&quality=86&strip=all",

    //     },
    //     {
    //         id: 2,
    //         name: "John Goober",
    //         userId: 2,
    //         profilePic: "https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg",
    //         desc: "All natural",
    //         img: "https://i.ytimg.com/vi/_nuSonmZVoM/mqdefault.jpg",

    //     }
    // ]
    
    const { isLoading, error, data } = useQuery(['posts'], () =>
        makeRequest.get("/posts").then((res)=>{
            return res.data;
        })
    );

    // console.log(data)
    

    return (
        <div className="posts">
            {error 
                ? "Something went wrong!" 
                : isLoading 
                ? "loading" 
                : data.map((post) => <Post post={post} key={post.id}/>)}
    </div>
);
};

export default Posts