export const userToView = (user) => {
  if (Array.isArray(user)) {
    return user.map((item) => {
      return {
        _id: item._id,
        firstname: item.firstname,
        lastname: item.lastname,
        email: item.email,
        isEmailVerified: item.isEmailVerified,
        isFollowerOf: item.isFollowerOf,
        profileImg: item.profileImg,
        description: item.description,
      }
    })
  }

  return {
    _id: user._id,
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
    isEmailVerified: user.isEmailVerified,
    isFollowerOf: user.isFollowerOf,
    profileImg: user.profileImg,
    description: user.description,
  }
}
