const isValidPhoneNumber = (phone: string): boolean => {
  const phoneRegex = /^\+?3?0-9?(0\d{9})$/;
  return phoneRegex.test(phone);
};

export default isValidPhoneNumber;
