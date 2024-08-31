import React, { useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import { getPhotosByUsername } from '../../services/firebase';
import Posts from './Posts';

function UserProfile({ profile }) {
  return (
    <div>
      <Header
        photosCount={profile.posts ? profile.posts.length : 0}
        profile={profile}        
      />
      <Posts posts={profile.posts} />
    </div>
  );
}

export default UserProfile;

UserProfile.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    bio: PropTypes.string.isRequired,
    fullName: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    emailAddress: PropTypes.string.isRequired,
    followers: PropTypes.array.isRequired,
    following: PropTypes.array.isRequired,
    dateCreated: PropTypes.number.isRequired
  })
};
