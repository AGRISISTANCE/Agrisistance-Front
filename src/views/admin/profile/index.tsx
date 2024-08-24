import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Flex } from '@chakra-ui/react';
import { EditOutlined } from '@ant-design/icons';
import { updateUser } from '../../../redux/userSlice';

const UserProfile: React.FC = () => {
  const user = useSelector((state: any) => state.user);
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState({
    firstName: false,
    lastName: false,
    email: false,
    phoneNumber: false,
  });

  const [formData, setFormData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phoneNumber: user.phoneNumber,
  });

  const handleEditToggle = (field: keyof typeof isEditing) => {
    setIsEditing((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSaveChanges = () => {
    dispatch(updateUser(formData));
    setIsEditing({
      firstName: false,
      lastName: false,
      email: false,
      phoneNumber: false,
    });
  };

  return (
    <Flex
      width="100%"
      display="flex"
      direction="column"
      justify="center"
      align="center"
      gap="40px"
    >
      <Flex
        direction="column"
        align="center"
        width={{ base: '100%', xl: '600px' }}
        background="#fff"
        padding="40px"
        gap="20px"
      >
        <form
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {['firstName', 'lastName', 'email', 'phoneNumber'].map((field) => (
            <div
              key={field}
              style={{
                display: 'flex',
                width: '80%',
                gap: '20px',
                border: `1px solid ${!isEditing[field as keyof typeof isEditing] ? '#78747A' : '#2ACC32'}`,
                borderRadius: '8px',
                padding: '0 10px 0 4px',
              }}
            >
              <input
                style={{
                  border: 'none',
                  outline: 'none',
                  boxShadow: 'none',
                }}
                type="text"
                value={formData[field as keyof typeof formData]}
                readOnly={!isEditing[field as keyof typeof isEditing]}
                onChange={(e) => handleInputChange(field as keyof typeof formData, e.target.value)}
              />
              <EditOutlined
                onClick={() => handleEditToggle(field as keyof typeof isEditing)}
                style={{
                  color: isEditing[field as keyof typeof isEditing] ? 'green' : 'inherit',
                }}
              />
            </div>
          ))}
          <button className="btn-save" type="button" onClick={handleSaveChanges}>
            Save changes
          </button>
        </form>
      </Flex>
    </Flex>
  );
};

export default UserProfile;
