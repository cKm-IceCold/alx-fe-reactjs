import { useParams } from "react-router-dom";

function BlogPost() {
  const { slug } = useParams();

  return (
    <div>
      <h2>Blog Post</h2>
      <p>Slug: {slug}</p>
    </div>
  );
}

export default BlogPost;
