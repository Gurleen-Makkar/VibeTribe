import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/api';
import { RegisterData } from '../types/auth';
import { ApiError } from '../types/error';

const validationSchema = Yup.object({
  name: Yup.string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
  location: Yup.string()
    .required('Location is required')
    .min(2, 'Location must be at least 2 characters'),
  bio: Yup.string()
    .required('Bio is required')
    .min(10, 'Bio must be at least 10 characters')
});

const Register = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string>('');

  const formik = useFormik<RegisterData>({
    initialValues: {
      name: '',
      email: '',
      password: '',
      location: '',
      bio: ''
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await authService.register(values);
        // After successful registration, redirect to preferences
        navigate('/preferences');
      } catch (err) {
        const apiError = err as ApiError;
        setError(apiError.response?.data?.message || 'Registration failed');
      }
    }
  });

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Join VibeTribe and connect with like-minded people!
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {error && (
            <div className="mb-4 text-red-500 text-center">
              {error}
            </div>
          )}

          <form className="space-y-6" onSubmit={formik.handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <div className="mt-1">
                <input
                  id="name"
                  type="text"
                  {...formik.getFieldProps('name')}
                  className="input-field"
                />
                {formik.touched.name && formik.errors.name && (
                  <div className="form-error">{formik.errors.name}</div>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  type="email"
                  {...formik.getFieldProps('email')}
                  className="input-field"
                />
                {formik.touched.email && formik.errors.email && (
                  <div className="form-error">{formik.errors.email}</div>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  type="password"
                  {...formik.getFieldProps('password')}
                  className="input-field"
                />
                {formik.touched.password && formik.errors.password && (
                  <div className="form-error">{formik.errors.password}</div>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                Location
              </label>
              <div className="mt-1">
                <input
                  id="location"
                  type="text"
                  {...formik.getFieldProps('location')}
                  className="input-field"
                  placeholder="e.g., Bangalore, India"
                />
                {formik.touched.location && formik.errors.location && (
                  <div className="form-error">{formik.errors.location}</div>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                Bio
              </label>
              <div className="mt-1">
                <textarea
                  id="bio"
                  {...formik.getFieldProps('bio')}
                  rows={4}
                  className="input-field"
                  placeholder="Tell us a bit about yourself..."
                />
                {formik.touched.bio && formik.errors.bio && (
                  <div className="form-error">{formik.errors.bio}</div>
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="btn-primary w-full"
                disabled={formik.isSubmitting}
              >
                {formik.isSubmitting ? 'Creating Account...' : 'Create Account'}
              </button>
            </div>

            <div className="text-center mt-4">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => navigate('/login')}
                  className="text-blue-600 hover:text-blue-500"
                >
                  Sign in
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
