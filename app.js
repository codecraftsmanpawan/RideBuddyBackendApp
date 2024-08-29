require('dotenv').config();
const express = require('express');
const cors = require('cors'); 
const connectDB = require('./config/db');

const Register = require('./routes/register');
const Login = require('./routes/login');
const Profile = require('./routes/userProfile');
const OfferRide = require('./routes/offerRide');
const BookRide = require('./routes/bookRide');
const Wallet = require('./routes/wallet');
const Vehical = require('./routes/vehicle');
const Emergency = require('./routes/emergencyContacts');
const Verification = require('./routes/verification');
const Message = require('./routes/message');
const Community = require('./routes/community');
const Coupon = require('./routes/coupon');

const app = express();

// Apply CORS middleware
app.use(cors()); 

app.use(express.json());
// app.use(cookieparser())

// Connect to MongoDB
connectDB();

// Routes
app.use('/api', Register);
app.use('/api', Login);
app.use('/api', Profile);
app.use('/api', OfferRide);
app.use('/api', BookRide);
app.use('/api', Wallet);
app.use('/api', Vehical);
app.use('/api', Emergency);
app.use('/api', Verification);
app.use('/api', Message);
app.use('/api', Community);
app.use('/api', Coupon);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
