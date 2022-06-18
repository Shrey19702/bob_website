import { useState } from "react";

const BlogCreation = async () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [blogPic, setBlogPic] = useState("");
  const [postTime, setPostTime] = useState(0);
  const [nLikes, setNlikes] = useState(0);
  const [userId, setUserId] = useState(1009);
  const [profilePic, setProfilePic] = useState("");
  const [name, setName] = useState("");

  return (
    <div className="h-10">
      <form
        action={`${process.env.BASE_URL}api/blogs/createBlog`}
        method="POST"
      >
        <label>Enter the Title</label>
        <br />
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />

        <label>Enter the Content</label>
        <br />
        <input
          type="text"
          name="content"
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
          }}
        />

        <label>Enter the Blog Pic</label>
        <br />
        <input
          type="text"
          name="blogPic"
          value={blogPic}
          onChange={(e) => {
            setBlogPic(e.target.value);
          }}
        />

        <label>Enter the Date of Posting</label>
        <br />
        <input
          type="date"
          name="postTime"
          value={postTime}
          onChange={(e) => {
            setPostTime(e.target.value);
          }}
        />

        <label>Enter the likes</label>
        <br />
        <input
          type="number"
          name="nLikes"
          value={nLikes}
          onChange={(e) => {
            setNlikes(e.target.value);
          }}
        />

        <input
          className="hidden"
          type="number"
          name="author"
          value={userId}
          onChange={(e) => {
            userId(e.target.value);
          }}
        />

        <label>Link of Profile Pic</label>
        <br />
        <input
          type="text"
          name="author"
          value={profilePic}
          onChange={(e) => {
            setProfilePic(e.target.value);
          }}
        />

        <label>Enter the Name</label>
        <br />
        <input
          type="text"
          name="author"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />

        <input type="submit" value="Submit" />
      </form>
    </div>
  
  );
};
export default BlogCreation;
