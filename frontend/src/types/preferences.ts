export interface PreferenceOption {
  _id: string;
  category: PreferenceCategory;
  value: string;
  label: string;
  emoji: string;
  order: number;
  isActive: boolean;
}

export type PreferenceCategory =
  | "foodPreferences"
  | "socialComfortZone"
  | "sharedActivities"
  | "languages"
  | "humorTypes"
  | "background";

export interface GroupedPreferenceOptions {
  foodPreferences: PreferenceOption[];
  socialComfortZone: PreferenceOption[];
  sharedActivities: PreferenceOption[];
  languages: PreferenceOption[];
  humorTypes: PreferenceOption[];
  background: PreferenceOption[];
}

export interface UserPreferences {
  _id?: string;
  user: string;
  foodPreferences: string[];
  socialComfortZone: string;
  sharedActivities: string[];
  languages: string[];
  humorTypes: string[];
  background: string[];
  isProfileComplete: boolean;
}

export interface ProfileStatus {
  isProfileComplete: boolean;
}
