import React from 'react';
import { Star, Quote } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'CTO at TechFlow',
      avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      content: 'UptimeWatch has been a game-changer for our operations. The instant alerts saved us from a major outage last month.',
      rating: 5
    },
    {
      name: 'Michael Rodriguez',
      role: 'DevOps Engineer at StartupXYZ',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      content: 'The best monitoring service we\'ve used. Simple setup, reliable alerts, and the status pages look professional.',
      rating: 5
    },
    {
      name: 'Emily Johnson',
      role: 'Product Manager at WebCorp',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      content: 'Love the detailed analytics and the fact that it monitors from multiple locations. Peace of mind for our global users.',
      rating: 5
    }
  ];

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
            Trusted by developers worldwide
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto transition-colors duration-300">
            Join thousands of companies who rely on UptimeWatch to keep their websites running
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-white dark:bg-gray-700 p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-600 hover:shadow-md transition-all duration-300"
            >
              <div className="mb-6">
                <Quote className="h-8 w-8 text-blue-500 mb-4" />
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed transition-colors duration-300">{testimonial.content}</p>
              </div>
              
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>

              <div className="flex items-center">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full mr-4 object-cover"
                />
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white transition-colors duration-300">{testimonial.name}</div>
                  <div className="text-gray-600 dark:text-gray-300 text-sm transition-colors duration-300">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16">
          <div className="bg-white dark:bg-gray-700 rounded-xl p-8 border border-gray-100 dark:border-gray-600 transition-colors duration-300">
            <div className="text-center mb-8">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
                Trusted by leading companies
              </h3>
              <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
                <div className="text-2xl font-bold text-gray-400 dark:text-gray-500">TechFlow</div>
                <div className="text-2xl font-bold text-gray-400 dark:text-gray-500">StartupXYZ</div>
                <div className="text-2xl font-bold text-gray-400 dark:text-gray-500">WebCorp</div>
                <div className="text-2xl font-bold text-gray-400 dark:text-gray-500">DevTools</div>
                <div className="text-2xl font-bold text-gray-400 dark:text-gray-500">CloudSync</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;