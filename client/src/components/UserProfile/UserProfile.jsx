import React, { useEffect, useReducer } from 'react';
import Header from './Header';
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