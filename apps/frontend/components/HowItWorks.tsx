import React from 'react';
import { Plus, Bell, BarChart3 } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: Plus,
      title: 'Add Your Website',
      description: 'Simply enter your website URL and configure monitoring settings in under 2 minutes.',
      color: 'bg-blue-500'
    },
    {
      icon: Bell,
      title: 'Get Instant Alerts',
      description: 'Receive immediate notifications via email, SMS, Slack, or webhooks when issues are detected.',
      color: 'bg-teal-500'
    },
    {
      icon: BarChart3,
      title: 'Track Performance',
      description: 'View detailed analytics, uptime reports, and performance metrics in your dashboard.',
      color: 'bg-green-500'
    }
  ];

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
            How it works
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto transition-colors duration-300">
            Get started in minutes with our simple three-step process
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <div key={index} className="text-center group">
              <div className="relative mb-6">
                <div className={`${step.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200`}>
                  <step.icon className="h-8 w-8 text-white" />
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-gray-200 -translate-y-px">
                    <div className="absolute right-0 top-1/2 w-3 h-3 bg-gray-200 dark:bg-gray-600 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                  </div>
                )}
                <div className="absolute -top-2 -left-2 w-6 h-6 bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 rounded-full flex items-center justify-center text-sm font-semibold text-gray-600 dark:text-gray-300 transition-colors duration-300">
                  {index + 1}
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 transition-colors duration-300">{step.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed transition-colors duration-300">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <button className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors duration-200 transform hover:scale-105">
            Start Your Free Trial
          </button>
          <p className="text-gray-500 dark:text-gray-400 mt-3 transition-colors duration-300">No credit card required • 14-day free trial</p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;