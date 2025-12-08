// For now, you can use a placeholder image
// Download a professional avatar from: https://ui-avatars.com/
// Or use this default avatar

export const getPlaceholderAvatar = (name = 'Backend Engineer') => {
  // Using a placeholder service
  const encodedName = encodeURIComponent(name);
  return `https://ui-avatars.com/api/?name=${encodedName}&background=667eea&color=fff&size=512&bold=true&font-size=0.5`;
};

export const defaultProfilePhoto = getPlaceholderAvatar('Backend Engineer');