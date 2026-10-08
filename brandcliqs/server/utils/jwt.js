import jwt from 'jsonwebtoken';

export function signToken(id) {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET,
    {
      expiresIn: '7d',
    }
  );
}

export function setAuthCookie(
  res,
  token
) {
  res.cookie('token', token, {
    httpOnly: true,
    sameSite: 'lax',
    secure:
      process.env.NODE_ENV === 'production',
    maxAge:
      7 * 24 * 60 * 60 * 1000,
  });
}