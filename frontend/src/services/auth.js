export const getAuthHeader = () => {
  const token = JSON.parse(localStorage.getItem('token'));
  return token ? { Authorization: `Bearer ${token}` } : {};
};
