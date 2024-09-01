import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import Header from './Header';
import Image from './Image';
import Buttons from './Buttons';
import Captions from './Captions';
import Comments from './Comments';
import { useSelector } from 'react-redux';

function Post({ content }) {
  const {user} = useSelector((state)=> state.auth)
  const handleFocus = () => commentInput.current.focus();
  const commentInput = useRef(null);
  const [toggledLiked, setToggledLiked] = useState(false);
  const [likes, setLikes] = useState(content.likes?.length);
  console.log(content)
  const imageSrc = `data:image/jpeg;base64,${content.media}`;

  const checklike = ( userId, likes) => {
    likes.forEach(like => {
        if(like.userId == userId){
          setToggledLiked(true)
          return;
        }
      });
  }

  useEffect(()=>{
    checklike(user.id , content.likes)
  },[user])

  return (
    <div className="container my-5 divide-y rounded-md border bg-white shadow-md">
      <Header id={content.id} username={content.username} userImage={content.userImage} />
      <Image
        src={imageSrc}
        caption={content.caption}
        id={content.id}
        toggledLiked={toggledLiked}
        setToggledLiked={setToggledLiked}
        likes={likes}
        setLikes={setLikes}
      />
      <div>
        <Buttons
          id={content.id}
          handleFocus={handleFocus}
          toggledLiked={toggledLiked}
          setToggledLiked={setToggledLiked}
          likes={likes}
          setLikes={setLikes}
        />
        <Captions caption={content.caption} username={content.username} />
      </div>
      <div>
        {/* <Comments id={content.id} postedAt={content.timestamp} commentInput={commentInput} /> */}
      </div>
    </div>
  );
}

export default Post;

Post.propTypes = {
  content: PropTypes.shape({
    username: PropTypes.string.isRequired,
    userImage: PropTypes.string.isRequired,
    imageSrc: PropTypes.string.isRequired,
    caption: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    userLikedPhoto: PropTypes.bool.isRequired,
    likes: PropTypes.array,
    timestamp: PropTypes.object.isRequired
  })
};
