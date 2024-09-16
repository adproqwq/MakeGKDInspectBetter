export default (): string => {
  return location.pathname.split('/')[2];
};