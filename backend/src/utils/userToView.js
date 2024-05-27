export const userToView = (user) => {
  if (Array.isArray(user)) {
    return user.map((item) => {
      return {
        _id: item._id,
        firstname: item.firstname,
        lastname: item.lastname,
        username: item.username,
        email: item.email,
        isEmailVerified: item.isEmailVerified,
        isFollowerOf: item.isFollowerOf,
        profileImg: item.profileImg,
        description: item.description,
        createdAt: item.createdAt,
        website: item.website,
      };
    });
  }

  return {
    _id: user._id,
    firstname: user.firstname,
    lastname: user.lastname,
    username: user.username,
    email: user.email,
    isEmailVerified: user.isEmailVerified,
    isFollowerOf: user.isFollowerOf,
    profileImg: user.profileImg,
    description: user.description,
    createdAt: user.createdAt,
    website: user.website,
  };
};
