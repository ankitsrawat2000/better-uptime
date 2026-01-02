"use client"
import React, { useState } from 'react';
import { UserPlus, Eye, EyeOff, Check } from 'lucide-react';
import axios from 'axios';
import { BACKEND_URL } from '@/lib/utils';
import { useRouter } from 'next/navigation';

interface SignUpProps {
    onSwitchToSignIn: () => void;
}

const SignUp: React.FC<SignUpProps> = ({ onSwitchToSignIn }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        setIsLoading(true);

        // Simulate API call
        try {
            let response = await axios.post(`${BACKEND_URL}/user/signup`, {
                username: username,
                password: password
            })

            setIsLoading(false);
            router.push("/signin");
        }catch (e) {
            setIsLoading(false);
        }
    };

    const passwordMatch = password === confirmPassword && password.length > 0;

    return (
            <div className="w-full max-w-6xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
                <div className="flex flex-col lg:flex-row min-h-[600px]">
                    {/* Left side - Welcome content */}
                    <div className="lg:w-1/2 bg-gradient-to-br from-indigo-600 to-purple-700 p-12 flex flex-col justify-center text-white">
                        <div className="max-w-md mx-auto lg:mx-0">
                            <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                                Join Our Community
                            </h1>
                            <p className="text-xl mb-8 text-indigo-100 leading-relaxed">
                                Create your account to unlock powerful features, connect with others, and start building something amazing together.
                            </p>
                            <div className="space-y-4">
                                <div className="flex items-center space-x-3">
                                    <Check className="w-5 h-5 text-indigo-300" />
                                    <span className="text-indigo-100">Free to get started</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <Check className="w-5 h-5 text-indigo-300" />
                                    <span className="text-indigo-100">No credit card required</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <Check className="w-5 h-5 text-indigo-300" />
                                    <span className="text-indigo-100">Setup in under 2 minutes</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right side - Sign up form */}
                    <div className="lg:w-1/2 p-12 flex flex-col justify-center">
                        <div className="max-w-md mx-auto w-full">
                            <div className="text-center mb-8">
                                <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
                                    <UserPlus className="w-8 h-8 text-indigo-600" />
                                </div>
                                <h2 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h2>
                                <p className="text-gray-600">Join us and start your journey today</p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="username" className="block text-sm font-semibold text-gray-700 mb-2">
                                        Username
                                    </label>
                                    <input
                                        type="text"
                                        id="username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
                                        placeholder="Choose a username"
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            id="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
                                            placeholder="Create a password"
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                                        >
                                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700 mb-2">
                                        Confirm Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={showConfirmPassword ? 'text' : 'password'}
                                            id="confirmPassword"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            className={`w-full px-4 py-3 pr-12 border rounded-lg focus:ring-2 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white ${confirmPassword.length > 0
                                                    ? passwordMatch
                                                        ? 'border-green-300 focus:ring-green-500'
                                                        : 'border-red-300 focus:ring-red-500'
                                                    : 'border-gray-300 focus:ring-indigo-500'
                                                }`}
                                            placeholder="Confirm your password"
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                                        >
                                            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                        </button>
                                    </div>
                                    {confirmPassword.length > 0 && !passwordMatch && (
                                        <p className="text-red-500 text-sm mt-1">Passwords do not match</p>
                                    )}
                                    {passwordMatch && (
                                        <p className="text-green-500 text-sm mt-1 flex items-center">
                                            <Check size={16} className="mr-1" />
                                            Passwords match
                                        </p>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    disabled={isLoading || !passwordMatch}
                                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
                                >
                                    {isLoading ? (
                                        <div className="flex items-center justify-center space-x-2">
                                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            <span>Creating account...</span>
                                        </div>
                                    ) : (
                                        'Create Account'
                                    )}
                                </button>
                            </form>

                            <div className="mt-8 text-center">
                                <p className="text-gray-600">
                                    Already have an account?{' '}
                                    <button
                                        onClick={onSwitchToSignIn}
                                        className="text-indigo-600 font-semibold hover:text-indigo-700 transition-colors underline decoration-2 underline-offset-2"
                                    >
                                        Sign in here
                                    </button>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
};

export default SignUp;