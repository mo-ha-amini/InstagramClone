import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ReactTimeAgo from 'react-time-ago';
import { useRecoilState } from 'recoil';

import { HeartIcon } from '@heroicons/react/outline';
import { HeartIcon as HeartIconFilled } from '@heroicons/react/solid';
import { commentLikesModalState } from '../../atoms/modalAtom';
import { commentIdState, photoIdState } from '../../atoms/idAtom';

function Comment({ photoId, commentId, userId, username, image, comment, postedAt, totalLikes }) {
  const [toggledLiked, setToggledLiked] = useState(false);
  const [likes, setLikes] = useState(totalLikes);
  const [open, setOpen] = useRecoilState(commentLikesModalState);
  const [currentCommentId, setCurrentCommentId] = useRecoilState(commentIdState);
  const [currentPhotoId, setCurrentPhotoId] = useRecoilState(photoIdState);
  
  const handleToggleActive = async () => {
    setOpen(true);
    setCurrentCommentId(commentId);
    setCurrentPhotoId(photoId);
  };

  return (
    <div className="my-3 ml-10 mr-5 flex items-center space-x-2">
      <div className="flex flex-1">
        <img
          className="aspect-square h-9 w-9 rounded-full border border-gray-300 object-cover p-[1px]"
          src={image}
          alt="User Image"
        />
        <div className=" ml-2 text-base">
          <p>
            <Link to={`/profile/${username}`}>
              <span className="mr-2 font-bold">{username}</span>
            </Link>
            {comment}
          </p>
          <div className=" space-x-4 text-xs text-gray-400">
            {postedAt && <ReactTimeAgo date={postedAt.toDate()} locale="en-US" timeStyle="mini" />}
            {likes > 0 ? (
              <p className=" -mt-4 cursor-pointer px-5 font-semibold" onClick={handleToggleActive}>
                {likes === 1 ? `${likes} like` : `${likes} likes`}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Comment;

