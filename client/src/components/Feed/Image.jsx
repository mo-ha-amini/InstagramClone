import React, { useState } from 'react';
import { HeartIcon } from '@heroicons/react/solid';

import {likePost} from '../../features/post/postAction'
import { useDispatch } from 'react-redux';

function Image({ src, caption, id, toggledLiked, setToggledLiked, likes, setLikes }) {
  const dispatch = useDispatch()
  
  const [visible, setVisible] = useState(false);
  
  const handleLikeAnimation = async (event) => {
    setVisible(true);
    !toggledLiked && setLikes(likes + 1);
    setToggledLiked(true);
    setTimeout(() => setVisible(false), 500);
    dispatch(likePost({PostId:id}))
  };

  return (
    <div className="relative select-none" onDoubleClick={handleLikeAnimation}>
      <img src={src} alt={caption} className="object-cover" />
      <HeartIcon
        className={`absolute top-1/2 bottom-1/2 mx-auto my-auto h-28 w-28 min-w-full text-white duration-200 ease-in-out ${
          visible ? 'scale-100' : 'scale-0'
        }`}
      />
    </div>
  );
}

export default Image;
