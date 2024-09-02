import React from 'react';
import { BookmarkIcon, ChatIcon, HeartIcon, PaperAirplaneIcon } from '@heroicons/react/outline';
import { useRecoilState } from 'recoil';
import { likesModalState } from '../../atoms/modalAtom';
import { photoIdState } from '../../atoms/idAtom';
import { HeartIcon as HeartIconFilled } from '@heroicons/react/solid';

import {likePost} from '../../features/post/postAction'
import { useDispatch } from 'react-redux';

function Buttons({ id, handleFocus, toggledLiked, setToggledLiked, likes, setLikes }) {
  const dispatch = useDispatch()

  const [open, setOpen] = useRecoilState(likesModalState);
  const [photoId, setPhotoId] = useRecoilState(photoIdState);
  // update the like count of the photo
  const handleToggleLiked = async () => {
    setToggledLiked((toggledLiked) => !toggledLiked);
    if(!toggledLiked){
      dispatch(likePost({PostId:id}))
    }
    setLikes((likes) => (toggledLiked ? likes - 1 : likes + 1));
  };
  const handleToggleActive = async () => {
    setOpen(true);
    setPhotoId(id);
  };

  return (
    <div>
      <div className="flex justify-between  p-4">
        <div className="flex space-x-3">
          <button
            onClick={handleToggleLiked}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                handleToggleLiked();
              }
            }}
          >
            {toggledLiked ? (
              <HeartIconFilled className="postButton text-red-500" />
            ) : (
              <HeartIcon className="postButton" />
            )}
          </button>
          <ChatIcon
            className="postButton"
            onClick={handleFocus}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                handleFocus();
              }
            }}
          />
          <PaperAirplaneIcon className="postButton -mt-[6px] rotate-60" />
        </div>
        <BookmarkIcon className="postButton" />
      </div>
      {likes > 0 ? (
        <p className="-mt-3 cursor-pointer px-5 font-bold" onClick={handleToggleActive}>
          {likes === 1 ? `${likes} like` : `${likes} likes`}
        </p>
      ) : null}
    </div>
  );
}

export default Buttons;


