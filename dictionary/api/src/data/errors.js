const errors = {
  notFound: {
    status: 404,
    error: 'Not found',
  },
  invalidPassword: {
    status: 403,
    error: 'Invalid password',
  },
  wordInDictionary: {
    status: 409,
    error: 'This word is already in your dictionary.',
  },
  userExists: {
    status: 409,
    error: 'User with this email exists.',
  },
  failedTokenAuth: {
    status: 502,
    message: 'Failed to authenticate token.',
  },
  notToken: {
    status: 502,
    error: 'No token provided',
  },
};

module.exports = {
  errors,
};
