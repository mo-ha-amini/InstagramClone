import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getUserByUsername } from '../services/firebase';
import * as ROUTES from '../constants/routes';
import Header from '../components/Header';
import UserProfile from '../components/UserProfile/UserProfile';
import UserEditModal from '../components/Modals/UserEditModal';
import FollowersModal from '../components/Modals/FollowersModal';
import FollowingModal from '../components/Modals/FollowingModal';
import SuggestionsList from '../components/UserProfile/SuggestionsList';
import Loader from '../components/UserProfile/Loader';
import TopScroll from '../components/TopScroll';
import SearchBarModal from '../components/Modals/SearchBarModal';
import PhotoDisplayModal from '../components/Modals/PhotoDisplayModal';
import PostModal from '../components/Modals/PostModal';
import { useDispatch, useSelector } from 'react-redux';
import {getProfile} from '../features/profile/profileActions'

function Profile() {
  // fetch username from url params
  const { username } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {Loading, profile, Error, Success} = useSelector((state) => state.profile)

  useEffect(() => {
    dispatch(getProfile({username}))
   } ,[username]);
  return (
    <div>
      <SearchBarModal />
      <UserEditModal />
      <FollowersModal />
      <FollowingModal />
      <PostModal />
      <SuggestionsList />
      <PhotoDisplayModal />
      <TopScroll />
      <Header />
      <div className="mx-auto mt-20 -mb-6 h-full min-h-screen overflow-x-hidden pb-4 scrollbar-hide sm:max-w-xl md:max-w-2xl lg:max-w-[52rem] xl:max-w-4xl">
        {profile ? <UserProfile profile={profile} /> : <Loader />}
      </div>
    </div>
  );
}

export default Profile;
