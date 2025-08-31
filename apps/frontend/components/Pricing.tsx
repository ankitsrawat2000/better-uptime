import React from 'react';
import { Check, Star } from 'lucide-react';

const Pricing = () => {
  const plans = [
    {
      name: 'Starter',
      price: 'Free',
      period: 'forever',
      description: 'Perfect for personal projects and small websites',
      features: [
        'Monitor up to 5 websites',
        'Check every 5 minutes',
        'Email notifications',
        'Basic status page',
        '30-day data retention'
      ],
      buttonText: 'Get Started Free',
      buttonStyle: 'border-2 border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50'
    },
    {
      name: 'Professional',
      price: '$19',
      period: 'per month',
      description: 'Ideal for growing businesses and agencies',
      features: [
        'Monitor up to 50 websites',
        'Check every 1 minute',
        'Email, SMS & Slack alerts',
        'Custom branded status pages',
        '1-year data retention',
        'API access',
        'SSL certificate monitoring'
      ],
      buttonText: 'Start Free Trial',
      buttonStyle: 'bg-blue-600 text-white hover:bg-blue-700',
      popular: true
    },
    {
      name: 'Enterprise',
      price: '$99',
      period: 'per month',
      description: 'Advanced features for large organizations',
      features: [
        'Monitor unlimited websites',
        'Check every 30 seconds',
        'All notification channels',
        'White-label status pages',
        'Unlimited data retention',
        'Advanced API & webhooks',
        'Priority support',
        'Custom integrations'
      ],
      buttonText: 'Contact Sales',
      buttonStyle: 'border-2 border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50'
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
            Simple, transparent pricing
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto transition-colors duration-300">
            Start free and scale as you grow. No hidden fees, no surprises.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div 
              key={index}
              className={`relative bg-white dark:bg-gray-800 rounded-2xl border-2 p-8 transition-all duration-300 hover:shadow-xl ${
                plan.popular 
                  ? 'border-blue-500 shadow-lg transform scale-105' 
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center">
                    <Star className="h-4 w-4 mr-1" />
                    Most Popular
                  </div>
                </div>
              )}
              
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 transition-colors duration-300">{plan.name}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 transition-colors duration-300">{plan.description}</p>
                <div className="flex items-baseline justify-center">
                  <span className="text-4xl font-bold text-gray-900 dark:text-white transition-colors duration-300">{plan.price}</span>
                  <span className="text-gray-600 dark:text-gray-300 ml-2 transition-colors duration-300">/{plan.period}</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300 transition-colors duration-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <button className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-200 ${plan.buttonStyle}`}>
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-600 dark:text-gray-300 mb-4 transition-colors duration-300">
            All plans include 24/7 support and a 30-day money-back guarantee
          </p>
          <p className="text-gray-500 dark:text-gray-400 transition-colors duration-300">
            Need a custom plan? <a href="#contact" className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">Contact us</a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Pricing;