export const cleanDate = (date) => {
  if (date) {
    const segments = date.split('-');
    const readableDate = `${segments[2].slice(0, 2)}.${segments[1]}`;
    return readableDate;
  }
  return null;
};

export const cleanDateWithYear = (date) => {
  if (date) {
    const segments = date.split('-');
    const year = segments[0];
    const readableDate = `${segments[2].slice(0, 2)}.${segments[1]}.${year}`;
    return readableDate;
  }
  return null;
};

export const validateForm = (formData) => {
  if (
    !formData.title ||
    !formData.timeSpent ||
    !formData.username ||
    !formData.assignedOn ||
    !formData.expiresOn
  ) {
    console.log('validation failed');
    return false;
  } else {
    console.log('all fields entered');
    return true;
  }
};
