const getFileTypesParams = (type: string) => {
  switch (type) {
    case 'documents':
      return ['document'];
    case 'images':
      return ['image'];
    case 'media':
      return ['video', 'audio'];
    case 'others':
      return ['other'];
    default:
      return ['document'];
  }
};

export default getFileTypesParams;
