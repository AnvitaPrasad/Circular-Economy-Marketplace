import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';

const PageContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
`;

const Header = styled.div`
  margin-bottom: 2.5rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: ${({ theme }) => theme.colors.primary.main};
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  max-width: 700px;
`;

const ProfileGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr 2fr;
  }
`;

const ProfileSidebar = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const ProfileContent = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const Card = styled.div`
  background: ${({ theme }) => theme.colors.background.paper};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.md};
`;

const CardHeader = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CardTitle = styled.h2`
  font-size: 1.25rem;
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;
`;

const CardContent = styled.div`
  padding: 1.5rem;
`;

const AvatarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 2rem;
`;

const Avatar = styled.div<{ imageUrl: string }>`
  width: 150px;
  height: 150px;
  border-radius: ${({ theme }) => theme.borderRadius.circle};
  background-color: ${({ theme }) => theme.colors.primary.light};
  background-image: ${({ imageUrl }) => imageUrl ? `url(${imageUrl})` : 'none'};
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 3rem;
  font-weight: bold;
`;

const UserName = styled.h3`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;
`;

const UserRole = styled.span`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  background-color: ${({ theme }) => theme.colors.primary.light}30;
  color: ${({ theme }) => theme.colors.primary.dark};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: 0.875rem;
  margin-top: 0.5rem;
  text-transform: capitalize;
`;

const UserDetail = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const DetailLabel = styled.span`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: 0.25rem;
`;

const DetailValue = styled.span`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text.primary};
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: ${({ theme }) => theme.colors.primary.main};
  color: white;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
  width: 100%;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.primary.dark};
  }
`;

const OutlineButton = styled(Button)`
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.colors.primary.main};
  color: ${({ theme }) => theme.colors.primary.main};
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.primary.light}20;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  font-size: 0.9rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  padding: 0.75rem 1rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: 1rem;
  transition: border-color 0.2s;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary.main};
  }
`;

const Select = styled.select`
  padding: 0.75rem 1rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: 1rem;
  transition: border-color 0.2s;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary.main};
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1rem;
`;

const ErrorMessage = styled.p`
  color: ${({ theme }) => theme.colors.error};
  font-size: 0.9rem;
  margin-top: 0.5rem;
`;

const SuccessMessage = styled.p`
  color: ${({ theme }) => theme.colors.success};
  font-size: 0.9rem;
  margin-top: 0.5rem;
`;

const TabsContainer = styled.div`
  display: flex;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  margin-bottom: 1.5rem;
`;

const Tab = styled.button<{ isActive: boolean }>`
  padding: 1rem 1.5rem;
  background-color: transparent;
  border: none;
  border-bottom: 2px solid ${({ isActive, theme }) => 
    isActive ? theme.colors.primary.main : 'transparent'};
  color: ${({ isActive, theme }) => 
    isActive ? theme.colors.primary.main : theme.colors.text.secondary};
  font-weight: ${({ isActive, theme }) => 
    isActive ? theme.typography.fontWeights.medium : theme.typography.fontWeights.regular};
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary.main};
  }
`;

const ProfilePage: React.FC = () => {
  const { userInfo, updateUserInfo } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  
  const [formData, setFormData] = useState({
    name: userInfo.name,
    email: userInfo.email,
    company: 'EcoMaterials Inc.',
    position: 'Materials Manager',
    phone: '+1 (555) 123-4567',
    website: 'www.ecomaterials.com',
    address: '123 Green Street, San Francisco, CA 94110',
    description: 'We specialize in sourcing and supplying sustainable materials for the construction industry.'
  });
  
  const [password, setPassword] = useState({
    current: '',
    new: '',
    confirm: ''
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPassword(prev => ({ ...prev, [name]: value }));
  };
  
  const toggleEdit = () => {
    setIsEditing(!isEditing);
    setError('');
    setSuccess('');
  };
  
  const handleSave = () => {
    // In a real app, this would send the data to an API
    try {
      // Simulating an API call
      updateUserInfo({ name: formData.name });
      setIsEditing(false);
      setSuccess('Profile updated successfully');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to update profile. Please try again.');
    }
  };
  
  const handlePasswordSave = () => {
    // Password validation
    if (password.new !== password.confirm) {
      setError('New passwords do not match');
      return;
    }
    
    if (password.new.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }
    
    // In a real app, this would send the data to an API
    try {
      // Simulating an API call
      setSuccess('Password updated successfully');
      setPassword({ current: '', new: '', confirm: '' });
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to update password. Please try again.');
    }
  };
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };
  
  return (
    <PageContainer>
      <Header>
        <Title>Your Profile</Title>
        <Subtitle>
          Manage your account information and settings
        </Subtitle>
      </Header>
      
      <ProfileGrid>
        <ProfileSidebar
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card>
            <AvatarContainer>
              <Avatar imageUrl={userInfo.avatar}>
                {!userInfo.avatar && getInitials(userInfo.name)}
              </Avatar>
              <UserName>{userInfo.name}</UserName>
              <UserRole>{userInfo.role}</UserRole>
            </AvatarContainer>
            
            <CardContent>
              <UserDetail>
                <DetailLabel>Email</DetailLabel>
                <DetailValue>{userInfo.email}</DetailValue>
              </UserDetail>
              <UserDetail>
                <DetailLabel>Member Since</DetailLabel>
                <DetailValue>January 15, 2023</DetailValue>
              </UserDetail>
              <UserDetail>
                <DetailLabel>Last Login</DetailLabel>
                <DetailValue>Today at 10:30 AM</DetailValue>
              </UserDetail>
              
              <div style={{ marginTop: '1.5rem' }}>
                <OutlineButton>Change Avatar</OutlineButton>
              </div>
            </CardContent>
          </Card>
        </ProfileSidebar>
        
        <ProfileContent
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card>
            <TabsContainer>
              <Tab 
                isActive={activeTab === 'profile'} 
                onClick={() => setActiveTab('profile')}
              >
                Profile Information
              </Tab>
              <Tab 
                isActive={activeTab === 'password'} 
                onClick={() => setActiveTab('password')}
              >
                Change Password
              </Tab>
              <Tab 
                isActive={activeTab === 'preferences'} 
                onClick={() => setActiveTab('preferences')}
              >
                Preferences
              </Tab>
            </TabsContainer>
            
            <CardContent>
              {activeTab === 'profile' && (
                <>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <OutlineButton onClick={toggleEdit}>
                      {isEditing ? 'Cancel' : 'Edit Profile'}
                    </OutlineButton>
                  </CardHeader>
                  
                  {!isEditing ? (
                    <div>
                      <UserDetail>
                        <DetailLabel>Full Name</DetailLabel>
                        <DetailValue>{formData.name}</DetailValue>
                      </UserDetail>
                      <UserDetail>
                        <DetailLabel>Email</DetailLabel>
                        <DetailValue>{formData.email}</DetailValue>
                      </UserDetail>
                      <UserDetail>
                        <DetailLabel>Company</DetailLabel>
                        <DetailValue>{formData.company}</DetailValue>
                      </UserDetail>
                      <UserDetail>
                        <DetailLabel>Position</DetailLabel>
                        <DetailValue>{formData.position}</DetailValue>
                      </UserDetail>
                      <UserDetail>
                        <DetailLabel>Phone</DetailLabel>
                        <DetailValue>{formData.phone}</DetailValue>
                      </UserDetail>
                      <UserDetail>
                        <DetailLabel>Website</DetailLabel>
                        <DetailValue>{formData.website}</DetailValue>
                      </UserDetail>
                      <UserDetail>
                        <DetailLabel>Address</DetailLabel>
                        <DetailValue>{formData.address}</DetailValue>
                      </UserDetail>
                      <UserDetail>
                        <DetailLabel>Description</DetailLabel>
                        <DetailValue>{formData.description}</DetailValue>
                      </UserDetail>
                    </div>
                  ) : (
                    <div>
                      <FormGroup>
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Enter your full name"
                        />
                      </FormGroup>
                      
                      <FormGroup>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Enter your email"
                        />
                      </FormGroup>
                      
                      <FormGroup>
                        <Label htmlFor="company">Company</Label>
                        <Input
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          placeholder="Enter your company name"
                        />
                      </FormGroup>
                      
                      <FormGroup>
                        <Label htmlFor="position">Position</Label>
                        <Input
                          id="position"
                          name="position"
                          value={formData.position}
                          onChange={handleChange}
                          placeholder="Enter your position"
                        />
                      </FormGroup>
                      
                      <FormGroup>
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="Enter your phone number"
                        />
                      </FormGroup>
                      
                      <FormGroup>
                        <Label htmlFor="website">Website</Label>
                        <Input
                          id="website"
                          name="website"
                          value={formData.website}
                          onChange={handleChange}
                          placeholder="Enter your website"
                        />
                      </FormGroup>
                      
                      <FormGroup>
                        <Label htmlFor="address">Address</Label>
                        <Input
                          id="address"
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          placeholder="Enter your address"
                        />
                      </FormGroup>
                      
                      <FormGroup>
                        <Label htmlFor="description">Description</Label>
                        <Input
                          id="description"
                          name="description"
                          value={formData.description}
                          onChange={handleChange}
                          placeholder="Enter a brief description"
                          as="textarea"
                          rows={4}
                        />
                      </FormGroup>
                      
                      {error && <ErrorMessage>{error}</ErrorMessage>}
                      {success && <SuccessMessage>{success}</SuccessMessage>}
                      
                      <ButtonContainer>
                        <OutlineButton onClick={toggleEdit}>
                          Cancel
                        </OutlineButton>
                        <Button onClick={handleSave}>
                          Save Changes
                        </Button>
                      </ButtonContainer>
                    </div>
                  )}
                </>
              )}
              
              {activeTab === 'password' && (
                <>
                  <CardHeader>
                    <CardTitle>Change Password</CardTitle>
                  </CardHeader>
                  
                  <div>
                    <FormGroup>
                      <Label htmlFor="current">Current Password</Label>
                      <Input
                        id="current"
                        name="current"
                        type="password"
                        value={password.current}
                        onChange={handlePasswordChange}
                        placeholder="Enter your current password"
                      />
                    </FormGroup>
                    
                    <FormGroup>
                      <Label htmlFor="new">New Password</Label>
                      <Input
                        id="new"
                        name="new"
                        type="password"
                        value={password.new}
                        onChange={handlePasswordChange}
                        placeholder="Enter your new password"
                      />
                    </FormGroup>
                    
                    <FormGroup>
                      <Label htmlFor="confirm">Confirm New Password</Label>
                      <Input
                        id="confirm"
                        name="confirm"
                        type="password"
                        value={password.confirm}
                        onChange={handlePasswordChange}
                        placeholder="Confirm your new password"
                      />
                    </FormGroup>
                    
                    {error && <ErrorMessage>{error}</ErrorMessage>}
                    {success && <SuccessMessage>{success}</SuccessMessage>}
                    
                    <ButtonContainer>
                      <Button onClick={handlePasswordSave}>
                        Update Password
                      </Button>
                    </ButtonContainer>
                  </div>
                </>
              )}
              
              {activeTab === 'preferences' && (
                <>
                  <CardHeader>
                    <CardTitle>Notification Preferences</CardTitle>
                  </CardHeader>
                  
                  <div>
                    <FormGroup>
                      <Label htmlFor="emailNotifications">Email Notifications</Label>
                      <Select
                        id="emailNotifications"
                        name="emailNotifications"
                        defaultValue="all"
                      >
                        <option value="all">All notifications</option>
                        <option value="important">Important only</option>
                        <option value="none">None</option>
                      </Select>
                    </FormGroup>
                    
                    <FormGroup>
                      <Label htmlFor="marketUpdates">Market Updates</Label>
                      <Select
                        id="marketUpdates"
                        name="marketUpdates"
                        defaultValue="weekly"
                      >
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                        <option value="none">None</option>
                      </Select>
                    </FormGroup>
                    
                    <ButtonContainer>
                      <Button>
                        Save Preferences
                      </Button>
                    </ButtonContainer>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </ProfileContent>
      </ProfileGrid>
    </PageContainer>
  );
};

export default ProfilePage; 