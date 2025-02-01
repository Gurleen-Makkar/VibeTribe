const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const PreferenceOption = require('../models/PreferenceOption');

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../.env') });

const preferenceOptions = [
    // Food Preferences
    {
        category: 'foodPreferences',
        value: 'street_food',
        label: 'Street Food Explorer',
        emoji: '🌮',
        order: 1
    },
    {
        category: 'foodPreferences',
        value: 'vegan',
        label: 'Vegan or Veggie Lover',
        emoji: '🥗',
        order: 2
    },
    {
        category: 'foodPreferences',
        value: 'non_veg',
        label: 'Hardcore Non-Veg',
        emoji: '🍗',
        order: 3
    },
    {
        category: 'foodPreferences',
        value: 'sweet_tooth',
        label: 'Sweet Tooth',
        emoji: '🍩',
        order: 4
    },

    // Social Comfort Zone
    {
        category: 'socialComfortZone',
        value: 'small',
        label: 'Small and intimate circles',
        emoji: '🧑‍🤝‍🧑',
        order: 1
    },
    {
        category: 'socialComfortZone',
        value: 'medium',
        label: 'Medium-sized groups (5–10 people)',
        emoji: '🎉',
        order: 2
    },
    {
        category: 'socialComfortZone',
        value: 'large',
        label: 'Large, high-energy gatherings',
        emoji: '🎊',
        order: 3
    },

    // Shared Activities
    {
        category: 'sharedActivities',
        value: 'board_games',
        label: 'Board Games',
        emoji: '🎲',
        order: 1
    },
    {
        category: 'sharedActivities',
        value: 'karaoke',
        label: 'Karaoke Nights',
        emoji: '🎤',
        order: 2
    },
    {
        category: 'sharedActivities',
        value: 'workout',
        label: 'Workout Buddies',
        emoji: '🏋️‍♀️',
        order: 3
    },
    {
        category: 'sharedActivities',
        value: 'travel',
        label: 'Travel Partners',
        emoji: '✈️',
        order: 4
    },
    {
        category: 'sharedActivities',
        value: 'study_work',
        label: 'Study/Work Sessions',
        emoji: '📚',
        order: 5
    },

    // Languages
    {
        category: 'languages',
        value: 'hindi',
        label: 'Hindi',
        emoji: '🗣️',
        order: 1
    },
    {
        category: 'languages',
        value: 'english',
        label: 'English',
        emoji: '🗣️',
        order: 2
    },
    {
        category: 'languages',
        value: 'punjabi',
        label: 'Punjabi',
        emoji: '🗣️',
        order: 3
    },
    {
        category: 'languages',
        value: 'tamil',
        label: 'Tamil',
        emoji: '🗣️',
        order: 4
    },
    {
        category: 'languages',
        value: 'bengali',
        label: 'Bengali',
        emoji: '🗣️',
        order: 5
    },
    {
        category: 'languages',
        value: 'multilingual',
        label: 'Multilingual',
        emoji: '🌐',
        order: 6
    },

    // Humor Types
    {
        category: 'humorTypes',
        value: 'dark',
        label: 'Dark Humor',
        emoji: '🌑',
        order: 1
    },
    {
        category: 'humorTypes',
        value: 'memes',
        label: 'Relatable Memes',
        emoji: '😅',
        order: 2
    },
    {
        category: 'humorTypes',
        value: 'sarcasm',
        label: 'Sarcasm',
        emoji: '🤨',
        order: 3
    },
    {
        category: 'humorTypes',
        value: 'dad_jokes',
        label: 'Dad Jokes',
        emoji: '🧢',
        order: 4
    },

    // Background
    {
        category: 'background',
        value: 'student',
        label: 'Students',
        emoji: '🎓',
        order: 1
    },
    {
        category: 'background',
        value: 'professional',
        label: 'Working Professionals',
        emoji: '💻',
        order: 2
    },
    {
        category: 'background',
        value: 'entrepreneur',
        label: 'Entrepreneurs',
        emoji: '🚀',
        order: 3
    },
    {
        category: 'background',
        value: 'creative',
        label: 'Creatives',
        emoji: '🎨',
        order: 4
    },
    {
        category: 'background',
        value: 'digital_nomad',
        label: 'Digital Nomads',
        emoji: '🧳',
        order: 5
    }
];

const initializePreferences = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/vibetribe');
        console.log('Connected to MongoDB');

        // Clear existing preferences
        await PreferenceOption.deleteMany({});
        console.log('Cleared existing preferences');

        // Insert new preferences
        await PreferenceOption.insertMany(preferenceOptions);
        console.log('Successfully initialized preferences');

        await mongoose.connection.close();
        console.log('Disconnected from MongoDB');
        process.exit(0);
    } catch (error) {
        console.error('Error initializing preferences:', error);
        process.exit(1);
    }
};

initializePreferences();
