import React from 'react';
import { useParams } from 'react-router-dom';

const PostDetail = () => {
  const { postId } = useParams();

  return (
    <div>
      <h3>Blog Post Detail (Dynamic)</h3>
      <p>Viewing post with ID: <strong>{postId}</strong></p>
      <p>This URL structure allows us to load specific content based on the parameter.</p>
    </div>
  );
};

export default PostDetail;