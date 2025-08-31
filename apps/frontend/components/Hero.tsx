"use client"
import React from 'react';
import { ArrowRight, Play, Shield, Zap, Globe } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-b from-blue-50 to-white dark:from-gray-800 dark:to-gray-900 py-20 lg:py-32 overflow-hidden transition-colors duration-300">
      <div className="absolute inset-0 bg-grid-pattern opacity-5 dark:opacity-10"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center">
          <div className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-8">
            <Shield className="h-4 w-4 mr-2" />
            Trusted by 10,000+ websites worldwide
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-tight transition-colors duration-300">
            Never miss a
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-600">
              downtime again
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed transition-colors duration-300">
            Monitor your website's uptime 24/7 with instant notifications, beautiful status pages, 
            and detailed analytics. Get peace of mind knowing your site is always running.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <button className="group bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-all duration-200 transform hover:scale-105 flex items-center">
              Start monitoring for free
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
            </button>
            <button className="flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200">
              <Play className="h-5 w-5 mr-2" />
              Watch demo (2 min)
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="flex items-center justify-center">
              <div className="flex items-center space-x-3 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm transition-colors duration-300">
                <Zap className="h-6 w-6 text-yellow-500" />
                <span className="text-gray-700 dark:text-gray-300 font-medium">1-minute checks</span>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="flex items-center space-x-3 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm transition-colors duration-300">
                <Globe className="h-6 w-6 text-green-500" />
                <span className="text-gray-700 dark:text-gray-300 font-medium">Global monitoring</span>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="flex items-center space-x-3 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm transition-colors duration-300">
                <Shield className="h-6 w-6 text-blue-500" />
                <span className="text-gray-700 dark:text-gray-300 font-medium">99.99% SLA</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            <img 
              src="https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg" 
              alt="Dashboard preview" 
              className="w-full rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;