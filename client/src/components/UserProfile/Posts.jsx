import React from 'react';
import PropTypes from 'prop-types';
import Post from './Post';

function Posts({ posts }) {
  // console.log(posts)
  return posts.length > 0 ? (
    <div className="grid h-0 grid-cols-3 justify-center gap-1 ">
      {posts.map((post) => (
        <div
          key={post.id}
          className="group relative h-0 w-auto cursor-pointer overflow-hidden py-[75%] px-0 pt-0"
        >
          <Post image={post.media} photoId={post.id} likes={post.likes ? post.likes.length : 0} comments={post.comments ? post.comments.length : 0} />
        </div>
      ))}
    </div>
  ) : (
    <div className="my-4 text-center text-3xl">No Posts Yet...</div>
  );
}

export default Posts;

