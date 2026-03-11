import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-8">
      <div className="w-full max-w-md text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-gray-300">404</h1>
          <h2 className="mb-4 text-2xl font-semibold text-gray-700">
            Page Not Found
          </h2>
          <p className="mb-8 text-gray-600">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => navigate('/')}
            className="w-full rounded-md bg-primary px-6 py-3 text-white transition-colors"
          >
            Go to Home
          </button>

          <button
            onClick={() => navigate(-1)}
            className="w-full rounded-md bg-gray-200 px-6 py-3 text-gray-700 transition-colors hover:bg-gray-300"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
