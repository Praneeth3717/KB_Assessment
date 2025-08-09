const axios = require('axios');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');

const generateToken = (userId, name) => {
  return jwt.sign({ userId, name }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

const verifyUser = (req, res) => {
  res.status(200).json({
    userId: req.userId,
    name: req.name,
  });
};

const googleLogin = (_req, res) => {
  const redirectUri = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.GOOGLE_CLIENT_ID}&redirect_uri=${process.env.BACKEND_URL}/auth/google/callback&response_type=code&scope=openid%20email%20profile&access_type=offline&prompt=consent`;
  res.redirect(redirectUri);
};

const googleCallback = async (req, res) => {
  const code = req.query.code;

  try {
    const { data } = await axios.post('https://oauth2.googleapis.com/token', null, {
      params: {
        code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: `${process.env.BACKEND_URL}/auth/google/callback`,
        grant_type: 'authorization_code',
      },
    });

    const userInfo = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: { Authorization: `Bearer ${data.access_token}` },
    });

    const { sub, name, email } = userInfo.data;
    let user = await User.findOne({ email });

    if (user && !user.googleId) {
      return res.status(400).send("Email registered manually. Use password login.");
    }

    if (!user) {
      user = await User.create({ googleId: sub, name, email });
    }

    const token = generateToken(user._id.toString(), user.name);

    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });

    return res.redirect(`${process.env.FRONTEND_URL}/home`);
  } catch (err) {
    console.error('OAuth Error:', err.message);
    res.status(500).send('Authentication failed');
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).select('+password');
    if (!user || !user.password) {
      return res.status(400).json({ message: 'Invalid or Google account' });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: 'Invalid credentials' });

    const token = generateToken(user._id.toString(), user.name);
    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });

    res.status(200).json({ message: 'Login successful' });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Login failed' });
  }
};

const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existing = await User.findOne({ email });
    if (existing) {
      if (!existing.password) {
        return res.status(400).json({ message: 'Registered with Google. Use Google login.' });
      }
      return res.status(400).json({ message: 'User already exists.' });
    }

    const hashed = await bcrypt.hash(password, 10);
    await User.create({ name, email, password: hashed });
    res.status(201).json({ message: 'Registered successfully. Please login.' });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ message: 'Registration failed' });
  }
};

module.exports = {
  verifyUser,
  googleLogin,
  googleCallback,
  login,
  register,
};
