import React from 'react';
import { ArrowRight, Shield } from 'lucide-react';

const CTA = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 via-blue-700 to-teal-600 relative overflow-hidden">
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
          Start monitoring your website today
        </h2>
        <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto leading-relaxed">
          Join thousands of developers who trust UptimeWatch to keep their websites online. 
          Get started with our free plan in under 2 minutes.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <button className="group bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-200 transform hover:scale-105 flex items-center">
            Start Free Trial
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
          </button>
          <button className="border-2 border-white/30 text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-all duration-200">
            View Demo
          </button>
        </div>

        <div className="flex items-center justify-center text-blue-100">
          <Shield className="h-5 w-5 mr-2" />
          <span>14-day free trial • No credit card required • Cancel anytime</span>
        </div>
      </div>
    </section>
  );
};

export default CTA;