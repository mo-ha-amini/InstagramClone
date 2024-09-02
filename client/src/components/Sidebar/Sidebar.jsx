import React from 'react';
import MiniProfile from './MiniProfile';
import Copyright from './Copyright';
import { useSelector } from 'react-redux';

function Sidebar() {
  const {user} = useSelector((state) => state.auth )
  // const {
  //   user: { id, username, image, fullName, userId, following }
  // } = useUser();
  return (
    <div className="fixed top-20 bottom-0 overflow-y-scroll scrollbar-hide">
      <MiniProfile username={user.username} fullName={user.name} image={user.image ? user.image : '/images/default.png'} />
      <Copyright />
    </div>
  );
}

export default Sidebar;
