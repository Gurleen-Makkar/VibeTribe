const mongoose = require('mongoose');

const preferenceOptionSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true,
        enum: ['foodPreferences', 'socialComfortZone', 'sharedActivities', 'languages', 'humorTypes', 'background']
    },
    value: {
        type: String,
        required: true
    },
    label: {
        type: String,
        required: true
    },
    emoji: {
        type: String,
        default: ''
    },
    isActive: {
        type: Boolean,
        default: true
    },
    order: {
        type: Number,
        default: 0
    }
});

// Compound index to ensure unique combinations of category and value
preferenceOptionSchema.index({ category: 1, value: 1 }, { unique: true });

module.exports = mongoose.model('PreferenceOption', preferenceOptionSchema);
