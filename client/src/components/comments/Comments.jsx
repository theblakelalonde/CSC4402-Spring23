import "./comments.scss"
import { useContext } from "react";
import {AuthContext} from "../../context/authContext"

const Comments = () => {

    const{currentUser} = useContext(AuthContext)

    const comments = [
        {
          id: 1,
          desc: "Dude massive cannon arms you got there! :O",
          name: "John Doe",
          userId: 1,
          profilePic:
            "https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg",
        },
        {
          id: 2,
          desc: "Wow! 😘",
          name: "John Goober",
          userId: 2,
          profilePic:
            "https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg",
        },
      ];
    return (
        <div className="comments">
            <div className="write">
            <img src={currentUser.profilePic} alt=""/>
            <input type="text" placeholder="Write a comment" />
            <button>Send</button>
            </div>
            {comments.map(comment=>(
                <div className="comment">
                    <img src={comment.profilePic} alt="" />
                    <div className="info">
                        <span>{comment.name}</span>
                        <p>{comment.desc}</p>
                    </div>
                    <span className="date">1 hour ago</span>
                </div>
            ))
            }</div>
    )
}

export default Comments