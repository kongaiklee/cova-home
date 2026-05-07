import React from 'react';
import { useNavigate } from 'react-router-dom';
import LandingHeader from './landing/LandingHeader';
import LandingFooter from './landing/LandingFooter';

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <section className="relative flex-1 flex flex-col overflow-hidden min-h-[600px]">
        <img
          src="/assets/images/404/harbour-pause.jpg"
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover object-[60%_center]"
        />
        <div
          className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.45),rgba(0,0,0,0.2)_40%,transparent_70%)]"
          aria-hidden
        />
        <div className="relative z-10 flex flex-col flex-1">
          <LandingHeader />
          <div className="flex flex-1 items-center px-6 sm:px-12 lg:px-24">
            <div className="w-full max-w-md text-left">
              <p className="font-serif text-8xl text-white/40 leading-none mb-2">
                404
              </p>
              <h1 className="mb-4 font-serif text-4xl tracking-tight text-white sm:text-5xl">
                Off course.
              </h1>
              <p className="mb-8 text-white/95">
                Happens. Let's get you back to the harbour.
              </p>
              <button
                onClick={() => navigate('/')}
                className="inline-flex items-center gap-2 rounded-md bg-white px-6 py-3 text-sm font-medium text-text-primary shadow-lg transition-all hover:bg-white/95 hover:shadow-xl"
              >
                Take me home
                <span aria-hidden>→</span>
              </button>
            </div>
          </div>
        </div>
      </section>
      <LandingFooter />
    </div>
  );
};

export default NotFound;
