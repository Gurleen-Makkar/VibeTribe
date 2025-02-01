const express = require('express');
const router = express.Router();
const PreferenceOption = require('../models/PreferenceOption');
const UserPreference = require('../models/UserPreference');
const jwt = require('jsonwebtoken');

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token' });
        }
        req.user = user;
        next();
    });
};

// Get all preference options by category
router.get('/options/:category', async (req, res) => {
    try {
        const { category } = req.params;
        const options = await PreferenceOption.find({ 
            category, 
            isActive: true 
        }).sort('order');
        res.json(options);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching preference options' });
    }
});

// Get all preference options
router.get('/options', async (req, res) => {
    try {
        const options = await PreferenceOption.find({ isActive: true })
            .sort('category order');
        
        // Group options by category
        const groupedOptions = options.reduce((acc, option) => {
            if (!acc[option.category]) {
                acc[option.category] = [];
            }
            acc[option.category].push(option);
            return acc;
        }, {});

        res.json(groupedOptions);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching preference options' });
    }
});

// Save user preferences
router.post('/user-preferences', authenticateToken, async (req, res) => {
    try {
        const { userId } = req.user;
        const preferences = req.body;

        const userPreference = await UserPreference.findOneAndUpdate(
            { user: userId },
            {
                ...preferences,
                isProfileComplete: true
            },
            { 
                new: true, 
                upsert: true 
            }
        ).populate('foodPreferences socialComfortZone sharedActivities languages humorTypes background');

        res.json(userPreference);
    } catch (error) {
        res.status(500).json({ message: 'Error saving preferences' });
    }
});

// Get user preferences
router.get('/user-preferences', authenticateToken, async (req, res) => {
    try {
        const { userId } = req.user;
        const preferences = await UserPreference.findOne({ user: userId })
            .populate('foodPreferences socialComfortZone sharedActivities languages humorTypes background');

        if (!preferences) {
            return res.status(404).json({ message: 'Preferences not found' });
        }

        res.json(preferences);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching preferences' });
    }
});

// Check if user has completed preferences
router.get('/profile-status', authenticateToken, async (req, res) => {
    try {
        const { userId } = req.user;
        const preferences = await UserPreference.findOne({ user: userId });
        
        res.json({
            isProfileComplete: preferences?.isProfileComplete || false
        });
    } catch (error) {
        res.status(500).json({ message: 'Error checking profile status' });
    }
});

module.exports = router;
