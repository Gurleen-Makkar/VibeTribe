const mongoose = require('mongoose');

const userPreferenceSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    foodPreferences: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PreferenceOption'
    }],
    socialComfortZone: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PreferenceOption'
    },
    sharedActivities: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PreferenceOption'
    }],
    languages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PreferenceOption'
    }],
    humorTypes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PreferenceOption'
    }],
    background: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PreferenceOption'
    }],
    isProfileComplete: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

// Ensure one preference document per user
userPreferenceSchema.index({ user: 1 }, { unique: true });

module.exports = mongoose.model('UserPreference', userPreferenceSchema);
