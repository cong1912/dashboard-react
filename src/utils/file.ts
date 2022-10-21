export const readAsDataUrl = (file: File | string) => {
  if (!file) {
    return Promise.resolve(null);
  }

  if (typeof file === 'string') {
    return Promise.resolve(file);
  }

  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.readAsDataURL(file);
  });
};
