import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { EmojiHappyIcon } from '@heroicons/react/outline';
import { addComment, displayComment } from '../../services/firebase';
import useUser from '../../hooks/use-user';
import { getFirestore, onSnapshot } from 'firebase/firestore';
import { firebaseApp } from '../../lib/firebase';
import ReactTimeAgo from 'react-time-ago';
import Comment from './Comment';
import { useRecoilState } from 'recoil';
import { photoDisplayModalState } from '../../atoms/modalAtom';
import Picker, { SKIN_TONE_MEDIUM_LIGHT } from 'emoji-picker-react';

import { createComment,getComment } from '../../features/comment/commentAction'
import { useDispatch, useSelector } from 'react-redux';

function Comments({ id, commentInput, comments, user }) {

  // const {Loading, Comments, getCommentsError, getCommentsSuccess} = useSelector((state)=>state.comment)
  const dispatch = useDispatch();
  const [comment, setComment] = useState('');
  const [isopen, setIsOpen] = useRecoilState(photoDisplayModalState);
  // realtime update the comments section
  useEffect(() => {
      dispatch(getComment({PostId:id}))
  }, [id]);

  // console.log(comments)
  const sendComment = async (event) => {
    event.preventDefault();
    const commentToSend = comment;
    setComment('');
    setShowEmojis(false);
    dispatch(createComment({ PostId: id, CommentText:commentToSend}));
  };

  const [showEmojis, setShowEmojis] = useState(false);

  return (
    <div>
      {/* Display Comments */}
      {comments && comments.length > 0 && (
        <div
          className={`max-h-[108px] overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-500 ${
            isopen && '-ml-6 md:max-h-80'
          }`}
        >
          {comments.map((comment) => (
            <div className="" key={comment.id}>
              <Comment
                photoId={id}
                commentId={comment.id}
                userId={0}
                username={comment.username}
                image={'/images/default.png'}
                comment={comment.commentText}
                // postedAt={Date.now()}
                totalLikes={0}
              />
            </div>
          ))}
        </div>
      )}
      {/* Comment Input */}
      <div>
        <form className="relative flex items-center border-y border-gray-200 px-4">
          <EmojiHappyIcon
            className="h-7 w-7 cursor-pointer text-gray-700"
            onClick={() => setShowEmojis(!showEmojis)}
          />
          <input
            type="text"
            placeholder="Add a comment..."
            className="flex-1 border-none p-4 outline-none focus:ring-0"
            value={comment}
            aria-label="Add a comment"
            autoComplete="off"
            onChange={(event) => setComment(event.target.value)}
            ref={commentInput}
          />
          <button
            className="font-semibold text-blue-400"
            type="submit"
            disabled={!comment.trim()}
            onClick={sendComment}
          >
            Post
          </button>
          {showEmojis && (
            <div>
              <div>
                <Picker
                  disableSearchBar={true}
                  preload={true}
                  skinTone={SKIN_TONE_MEDIUM_LIGHT}
                  pickerStyle={{
                    position: 'absolute',
                    left: '20px',
                    bottom: '50px',
                    zIndex: '10'
                  }}
                  onEmojiClick={(event, emojiObject) => {
                    setComment(comment + emojiObject.emoji);
                  }}
                />
              </div>
            </div>
          )}
        </form>
      </div>
      <div className="p-4">
        {/* <ReactTimeAgo
          date={Date.now()}
          locale="en-US"
          timeStyle="round"
          className="mt-2 text-xs capitalize text-gray-400"
        /> */}
      </div>
    </div>
  );
}

export default Comments;
