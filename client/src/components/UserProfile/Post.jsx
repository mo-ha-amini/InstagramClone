import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { ChatIcon, HeartIcon } from '@heroicons/react/solid';
import { getCommentsLength } from '../../services/firebase';
import { useRecoilState } from 'recoil';
import { photoDisplayModalState } from '../../atoms/modalAtom';
import { photoIdState } from '../../atoms/idAtom';

function Photo({ image, photoId, likes, comments }) {
  const [open, setOpen] = useRecoilState(photoDisplayModalState);
  const [id, setId] = useRecoilState(photoIdState);
  const imageSrc = `data:image/jpeg;base64,${image}`;
  return (
    <div
      onClick={() => {
        setOpen(true);
        setId(photoId);
      }}
    >
      <img
        src={imageSrc}
        alt="Posted Image"
        className="aspect-square h-40 min-h-full border object-cover object-center xxs:h-32 xs:h-36 sm:h-40 md:h-44 lg:h-48 "
      />
      <div className="absolute inset-0 z-10 hidden min-h-full min-w-full items-center justify-evenly group-hover:flex group-hover:bg-black group-hover:bg-opacity-70">
        <p className="flex items-center font-bold text-white">
          <HeartIcon className="mr-1 h-5 w-5" />
          {likes}
        </p>
        <p className="flex items-center font-bold text-white">
          <ChatIcon className="mr-1 h-5 w-5" />
          {comments}
        </p>
      </div>
    </div>
  );
}

export default Photo;
