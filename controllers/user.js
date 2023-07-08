const bcrypt = require('bcryptjs');
const Seller = require('../models/seller');;



// Logout Funtion 
module.exports.logOut =  async (req, res) => {
    try {
      req.user.tokens = req.user.tokens.filter(tokenObj => tokenObj.token !== req.token);
      await req.user.save();
  
      res.clearCookie('token'); // Clear the token cookie
  
      res.render('login');
      // res.json({ message: 'Logged out successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Logout failed' });
    }
  };
  
  
  
  
  
  
  
  // Login router
 module.exports.login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await Seller.findOne({ email });
  
      if (!user) {
        res.status(401).json({ error: 'Invalid credentials' });
      }
  
      const passwordMatch = await bcrypt.compare(password, user.password);
  
      if (!passwordMatch) {
        res.status(401).json({ error: 'Invalid credentials' });
      }
  
      const token = user.generateAuthToken();
      await user.save();
  
      res.cookie('token', token, { httpOnly: true, maxAge: 3600000 }); // Set the token as a cookie
  
      // res.json({ token });
      res.redirect('dashboard');
    } catch (error) {
      res.status(500).json({ error: 'Login failed' });
    }
  };
  
  
  
  
  
  // Sign up route
  module.exports.signup =  async (req, res) => {
    const { email, businessName, password, confirmPassword } = req.body;
  
    const existingUser = await Seller.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error : 'Email already registered'});
    }

    // Check if the passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({ error: 'Passwords do not match' });
    }
  
    // Generate a unique URL for the seller
    const url = generateUniqueURL();
  
  
  
    // Create a new seller
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(password, salt, function (err, hash) {
        const seller = new Seller({
          email,
          businessName,
          password: hash,
          url,
        });
  
  
        // Save the seller to the database
        seller.save()
          .then(() => {
  
            res.render('login');
            // res.status(201).json({ message: 'Seller registered successfully' });
  
          })
          .catch((error) => {
            res.status(500).json({ error: 'Error registering seller' });
          });
  
  
      });
    });
  };
  
  
  function generateUniqueURL() {
    // Generate a random string or use a unique identifier logic as per your requirements
    const uniqueString = Math.random().toString(36).substr(2, 8);
    return `/seller/${uniqueString}`;
  }