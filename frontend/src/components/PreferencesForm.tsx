import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { preferenceService } from '../services/api';
import { GroupedPreferenceOptions, PreferenceOption, UserPreferences, PreferenceCategory } from '../types/preferences';
import { ApiError } from '../types/error';

type PreferenceFormData = Required<Pick<UserPreferences, 
    'foodPreferences' | 
    'socialComfortZone' | 
    'sharedActivities' | 
    'languages' | 
    'humorTypes' | 
    'background'
>>;

interface Step {
    title: string;
    description: string;
    field: keyof PreferenceFormData;
    type: 'single' | 'multiple';
}

const PreferencesForm = () => {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(0);
    const [options, setOptions] = useState<GroupedPreferenceOptions | null>(null);
    const [error, setError] = useState<string>('');
    const [preferences, setPreferences] = useState<PreferenceFormData>({
        foodPreferences: [],
        socialComfortZone: '',
        sharedActivities: [],
        languages: [],
        humorTypes: [],
        background: []
    });

    useEffect(() => {
        loadPreferenceOptions();
    }, []);

    const loadPreferenceOptions = async () => {
        try {
            const data = await preferenceService.getPreferenceOptions();
            setOptions(data);
        } catch (err) {
            const apiError = err as ApiError;
            setError(apiError.response?.data?.message || 'Failed to load preferences');
        }
    };

    const steps: Step[] = [
        {
            title: 'Food Preferences 🍽️',
            description: 'Bond over bites! What\'s your foodie scene?',
            field: 'foodPreferences',
            type: 'multiple'
        },
        {
            title: 'Social Comfort Zone 🤝',
            description: 'What kind of crowd are you comfy with?',
            field: 'socialComfortZone',
            type: 'single'
        },
        {
            title: 'Activities 🎯',
            description: 'What\'s your jam when hanging out?',
            field: 'sharedActivities',
            type: 'multiple'
        },
        {
            title: 'Languages 🗣️',
            description: 'What\'s your lingo? Connect in your favorite language!',
            field: 'languages',
            type: 'multiple'
        },
        {
            title: 'Humor & Memes 😂',
            description: 'How\'s your meme game? What humor hits right?',
            field: 'humorTypes',
            type: 'multiple'
        },
        {
            title: 'Background 🌱',
            description: 'What\'s your background story?',
            field: 'background',
            type: 'multiple'
        }
    ];

    const handleOptionSelect = (field: keyof PreferenceFormData, value: string) => {
        setPreferences(prev => {
            if (steps[currentStep].type === 'multiple') {
                const currentValues = prev[field] as string[];
                const newValues = currentValues.includes(value)
                    ? currentValues.filter(v => v !== value)
                    : [...currentValues, value];
                return { ...prev, [field]: newValues };
            } else {
                return { ...prev, [field]: value };
            }
        });
    };

    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(prev => prev + 1);
        } else {
            handleSubmit();
        }
    };

    const handleBack = () => {
        setCurrentStep(prev => prev - 1);
    };

    const handleSubmit = async () => {
        try {
            await preferenceService.saveUserPreferences(preferences);
            navigate('/profile');
        } catch (err) {
            const apiError = err as ApiError;
            setError(apiError.response?.data?.message || 'Failed to save preferences');
        }
    };

    if (!options) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    const currentStepData = steps[currentStep];
    const currentOptions = options[currentStepData.field as PreferenceCategory];

    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                {/* Progress bar */}
                <div className="mb-8">
                    <div className="flex justify-between mb-2">
                        {steps.map((step, index) => (
                            <div
                                key={index}
                                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                    index <= currentStep ? 'bg-blue-500 text-white' : 'bg-gray-300'
                                }`}
                            >
                                {index + 1}
                            </div>
                        ))}
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full">
                        <div
                            className="h-full bg-blue-500 rounded-full transition-all duration-300"
                            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                        ></div>
                    </div>
                </div>

                <div className="bg-white shadow rounded-lg p-6">
                    {error && (
                        <div className="mb-4 text-red-500 text-center">
                            {error}
                        </div>
                    )}

                    <div className="mb-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">
                            {currentStepData.title}
                        </h2>
                        <p className="text-gray-600">
                            {currentStepData.description}
                        </p>
                    </div>

                    <div className="space-y-4">
                        {currentOptions.map((option: PreferenceOption) => (
                            <button
                                key={option._id}
                                onClick={() => handleOptionSelect(
                                    currentStepData.field,
                                    option._id
                                )}
                                className={`w-full p-4 rounded-lg border-2 transition-all ${
                                    currentStepData.type === 'multiple'
                                        ? (preferences[currentStepData.field] as string[]).includes(option._id)
                                            ? 'border-blue-500 bg-blue-50'
                                            : 'border-gray-200 hover:border-blue-300'
                                        : preferences[currentStepData.field] === option._id
                                            ? 'border-blue-500 bg-blue-50'
                                            : 'border-gray-200 hover:border-blue-300'
                                }`}
                            >
                                <div className="flex items-center">
                                    <span className="text-2xl mr-3">{option.emoji}</span>
                                    <span className="text-left font-medium">{option.label}</span>
                                </div>
                            </button>
                        ))}
                    </div>

                    <div className="mt-8 flex justify-between">
                        <button
                            onClick={handleBack}
                            disabled={currentStep === 0}
                            className={`px-6 py-2 rounded-md ${
                                currentStep === 0
                                    ? 'bg-gray-300 cursor-not-allowed'
                                    : 'bg-gray-600 hover:bg-gray-700 text-white'
                            }`}
                        >
                            Back
                        </button>
                        <button
                            onClick={handleNext}
                            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                        >
                            {currentStep === steps.length - 1 ? 'Finish' : 'Next'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PreferencesForm;
