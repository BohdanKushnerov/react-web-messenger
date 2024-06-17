const getStoredPhone = () => {
  return localStorage.getItem('phone') ?? '';
};

export default getStoredPhone;
