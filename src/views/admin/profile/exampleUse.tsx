import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUser, activatePremium } from '../../../redux/userSlice';

const UserProfile = () => {
  const user = useSelector((state: any) => state.user);
  const dispatch = useDispatch();

  const handleUpdateUser = () => {
    // Example to update user info
    dispatch(updateUser({ firstName: 'John', lastName: 'Doe' }));
  };

  const handleActivatePremium = () => {
    dispatch(activatePremium());
  };

  return (
    <div>
      <h1>{user.firstName} {user.lastName}</h1>
      <button onClick={handleUpdateUser}>Update User Info</button>
      <button onClick={handleActivatePremium}>Activate Premium</button>
    </div>
  );
};

export default UserProfile;
