'use client';

import { useState, useEffect } from 'react';

// Simple Moon and Sun icons as SVG components
const Moon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
  </svg>
);

const Sun = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5"></circle>
    <line x1="12" y1="1" x2="12" y2="3"></line>
    <line x1="12" y1="21" x2="12" y2="23"></line>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
    <line x1="1" y1="12" x2="3" y2="12"></line>
    <line x1="21" y1="12" x2="23" y2="12"></line>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
  </svg>
);

export default function ThemeToggleDemo() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    if (!isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  // Prevent hydration mismatch
  if (!mounted) {
    return null;
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDark ? 'bg-dark-bg-primary' : 'bg-light-bg-primary'
    }`}>
      {/* Header with Theme Toggle */}
      <header className={`border-b transition-colors ${
        isDark ? 'bg-dark-bg-secondary border-dark-border' : 'bg-white border-light-border'
      }`}>
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className={`text-2xl font-bold ${
            isDark ? 'text-dark-text-primary' : 'text-light-text-primary'
          }`}>
            My App
          </h1>

          <button
            onClick={toggleTheme}
            className={`p-3 rounded-lg transition-all duration-200 ${
              isDark
                ? 'bg-dark-bg-tertiary hover:bg-primary-600 text-dark-text-primary'
                : 'bg-light-bg-secondary hover:bg-primary-500 hover:text-white text-light-text-primary'
            }`}
            aria-label="Toggle theme"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="space-y-8">
          {/* Hero Section */}
          <section className={`rounded-2xl p-8 ${
            isDark ? 'bg-dark-bg-secondary' : 'bg-light-bg-secondary'
          }`}>
            <h2 className={`text-4xl font-bold mb-4 ${
              isDark ? 'text-dark-text-primary' : 'text-light-text-primary'
            }`}>
              Welcome to Your App
            </h2>
            <p className={`text-lg mb-6 ${
              isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'
            }`}>
              This is a demo showing the theme toggle functionality with your custom colors.
            </p>
            <button className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-lg font-medium transition-colors">
              Get Started
            </button>
          </section>

          {/* Cards Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: 'Feature 1', color: 'accent-blue', icon: '🚀' },
              { title: 'Feature 2', color: 'accent-green', icon: '✨' },
              { title: 'Feature 3', color: 'accent-pink', icon: '🎯' }
            ].map((feature, idx) => (
              <div
                key={idx}
                className={`rounded-xl p-6 transition-all hover:scale-105 ${
                  isDark ? 'bg-dark-bg-secondary' : 'bg-white border border-light-border'
                }`}
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className={`text-xl font-semibold mb-2 ${
                  isDark ? 'text-dark-text-primary' : 'text-light-text-primary'
                }`}>
                  {feature.title}
                </h3>
                <p className={isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'}>
                  Description of this amazing feature that makes your app stand out.
                </p>
              </div>
            ))}
          </div>

          {/* Status Badges */}
          <section>
            <h3 className={`text-2xl font-bold mb-4 ${
              isDark ? 'text-dark-text-primary' : 'text-light-text-primary'
            }`}>
              Status Indicators
            </h3>
            <div className="flex flex-wrap gap-3">
              <span className="bg-accent-green text-white px-4 py-2 rounded-full font-medium">
                ✓ Success
              </span>
              <span className="bg-error text-white px-4 py-2 rounded-full font-medium">
                ✗ Error
              </span>
              <span className="bg-accent-orange text-white px-4 py-2 rounded-full font-medium">
                ⚠ Warning
              </span>
              <span className="bg-accent-blue text-white px-4 py-2 rounded-full font-medium">
                ℹ Info
              </span>
            </div>
          </section>

          {/* Theme Color Palette */}
          <section>
            <h3 className={`text-2xl font-bold mb-4 ${
              isDark ? 'text-dark-text-primary' : 'text-light-text-primary'
            }`}>
              Primary Color Palette
            </h3>
            <div className="grid grid-cols-5 gap-3">
              {[
                { name: '100', class: 'bg-primary-100' },
                { name: '300', class: 'bg-primary-300' },
                { name: '500', class: 'bg-primary-500' },
                { name: '700', class: 'bg-primary-700' },
                { name: '900', class: 'bg-primary-900' }
              ].map((color) => (
                <div key={color.name} className="text-center">
                  <div className={`${color.class} h-20 rounded-lg mb-2`}></div>
                  <p className={`text-sm ${
                    isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'
                  }`}>
                    {color.name}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
