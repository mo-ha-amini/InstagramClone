import React, { useEffect } from 'react';
import Post from './Post';
import Loader from './Loader';
import { useDispatch, useSelector } from 'react-redux';
import { getFeedPosts} from '../../features/post/postAction'

function Feed() {
  const dispatch = useDispatch()
  const {Loading, FeedPosts, getFeedPostError, getFeedPostSuccess} = useSelector((state)=> state.post)

  useEffect(()=>{
    dispatch(getFeedPosts({}))
  }, [])

  return !FeedPosts || Loading ? (
    <Loader />
  ) : FeedPosts?.length > 0 ? (
    <>
      {FeedPosts.map((content) => (
        <div className="" key={content.id}>
          <Post key={content.id} content={content} />
        </div>
      ))}
    </>
  ) : (
    <>
      <div className="my-4 flex h-[25vh] flex-col items-center justify-center space-y-4 text-center ">
        <p className="text-3xl font-bold">Hey There !!!</p>
        <p className="text-lg font-semibold text-gray-600">
          Please follow some accounts from the suggestions list to view their posts.
        </p>
      </div>
    </>
  );
}

export default Feed;
