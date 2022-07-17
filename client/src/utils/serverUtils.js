export const getErrorMessageFromServer = (errors) => {
  if (!errors) return;
  return errors[0].message;
};
