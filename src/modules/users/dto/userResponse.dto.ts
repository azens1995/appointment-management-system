interface UserResponse extends IdAndDate {
  firstName: string;
  lastName: string;
  address: string;
  phoneNumber: string;
  email: string;
  isActive: boolean;
  isVerified: boolean;
}

export default UserResponse;
