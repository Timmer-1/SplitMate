'use client'

import React, { useState } from 'react';
import { 
  Calculator, 
  Sparkles, 
  Search,
  MessageCircle,
  Mail,
  Phone,
  Book,
  Video,
  ChevronRight,
  ChevronDown,
  Users,
  CreditCard,
  Settings,
  Shield,
  HelpCircle,
  Send,
  ArrowLeft,
  ExternalLink,
  Clock,
  CheckCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function HelpSupportPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    category: 'general'
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const faqs = [
    {
      id: 1,
      question: "How do I create a new group?",
      answer: "To create a new group, click on the 'New Group' button on your dashboard or navigate to Groups > Create New Group. Enter a group name, add members by their email addresses, and choose your settings. You can always add more members later!"
    },
    {
      id: 2,
      question: "How does expense splitting work?",
      answer: "When you add an expense, you can choose how to split it: equally among all members, by specific amounts, by percentages, or by shares. SplitMate automatically calculates who owes what and keeps track of balances for you."
    },
    {
      id: 3,
      question: "Can I settle up with someone?",
      answer: "Yes! Go to your group or the main dashboard, find the person you want to settle with, and click 'Settle Up'. You can record payments made outside the app to keep your balances accurate."
    },
    {
      id: 4,
      question: "How do I edit or delete an expense?",
      answer: "Click on any expense to view its details. From there, you can edit the amount, description, or how it's split. Only the person who created the expense can delete it, but anyone in the group can edit it."
    },
    {
      id: 5,
      question: "What if someone leaves the group?",
      answer: "You can remove members from a group, but make sure to settle any outstanding balances first. Removed members will lose access to the group but can still see expenses they were part of in their transaction history."
    },
    {
      id: 6,
      question: "Is my financial data secure?",
      answer: "Absolutely! We use bank-level encryption to protect your data. We never store your banking information, and all data is encrypted both in transit and at rest. Your privacy and security are our top priorities."
    }
  ];

  const quickHelp = [
    {
      icon: Users,
      title: "Managing Groups",
      description: "Learn how to create, manage, and organize your expense groups",
      color: "from-emerald-500 to-teal-600"
    },
    {
      icon: CreditCard,
      title: "Adding Expenses",
      description: "Step-by-step guide to adding and splitting expenses",
      color: "from-blue-500 to-cyan-600"
    },
    {
      icon: Settings,
      title: "Account Settings",
      description: "Customize your profile, notifications, and preferences",
      color: "from-purple-500 to-indigo-600"
    },
    {
      icon: Shield,
      title: "Privacy & Security",
      description: "Learn about our security measures and privacy controls",
      color: "from-orange-500 to-red-600"
    }
  ];

  const contactOptions = [
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Get instant help from our support team",
      availability: "Available 24/7",
      action: "Start Chat",
      color: "emerald"
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "Send us a detailed message",
      availability: "Response within 2 hours",
      action: "Send Email",
      color: "blue"
    },
    {
      icon: Phone,
      title: "Phone Support",
      description: "Speak directly with our team",
      availability: "Mon-Fri, 9AM-6PM EST",
      action: "Call Now",
      color: "purple"
    }
  ];

  const toggleFaq = (id: number) => {
    setExpandedFaq(expandedFaq === id ? null : id);
  };

  const handleContactSubmit = () => {
    setFormSubmitted(true);
    // Here you would normally send the form data to your backend
  };

  if (formSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-emerald-200/20 to-green-200/20 rounded-full blur-2xl animate-pulse [animation-duration:3s]" />
          <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-r from-emerald-200/20 to-teal-200/20 rounded-full blur-2xl animate-pulse [animation-duration:4s]" />
        </div>

        {/* Header */}
        <header className="relative z-10 border-b border-gray-200/50 bg-white/70 backdrop-blur-xl">
          <div className="container mx-auto px-4 py-6 flex items-center justify-between">
            <Link href="/dashboard" className="flex items-center space-x-3 group">
              <div className="relative">
                <Calculator className="h-10 w-10 text-green-600 group-hover:text-green-700 transition-colors duration-300" />
                <Sparkles className="h-4 w-4 text-amber-500 absolute -top-1 -right-1 animate-pulse" />
              </div>
              <h1 className="text-3xl font-black bg-gradient-to-r from-gray-800 to-green-700 bg-clip-text text-transparent">
                SplitMate
              </h1>
            </Link>
            <Button
              onClick={() => setFormSubmitted(false)}
              variant="ghost"
              className="text-gray-600 hover:text-gray-800"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Help
            </Button>
          </div>
        </header>

        {/* Success Message */}
        <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-120px)] px-4 py-12">
          <div className="w-full max-w-md">
            <div className="bg-white/80 backdrop-blur-xl border border-gray-200/50 rounded-3xl p-8 shadow-2xl text-center">
              <div className="mb-6">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-gradient-to-br from-emerald-500 to-green-500 rounded-full">
                    <CheckCircle className="h-8 w-8 text-white" />
                  </div>
                </div>
                <h2 className="text-3xl font-black text-gray-800 mb-3">
                  Message Sent!
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Thanks for contacting us! We've received your message and will get back to you within 2 hours.
                </p>
              </div>

              <div className="space-y-4">
                <p className="text-sm text-gray-500">
                  Reference ID: #SUP-{Math.random().toString(36).substr(2, 9).toUpperCase()}
                </p>

                <div className="flex flex-col gap-3">
                  <Button
                    onClick={() => setFormSubmitted(false)}
                    variant="outline"
                    className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 backdrop-blur-sm transition-all duration-300"
                  >
                    Send Another Message
                  </Button>

                  <Link href="/dashboard">
                    <Button className="w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 border-0 shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 text-white">
                      Back to Dashboard
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-emerald-200/20 to-green-200/20 rounded-full blur-2xl animate-pulse [animation-duration:3s]" />
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-r from-emerald-200/20 to-teal-200/20 rounded-full blur-2xl animate-pulse [animation-duration:4s]" />
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-gray-200/50 bg-white/70 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-6 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center space-x-3 group">
            <div className="relative">
              <Calculator className="h-10 w-10 text-green-600 group-hover:text-green-700 transition-colors duration-300" />
              <Sparkles className="h-4 w-4 text-amber-500 absolute -top-1 -right-1 animate-pulse" />
            </div>
            <h1 className="text-3xl font-black bg-gradient-to-r from-gray-800 to-green-700 bg-clip-text text-transparent">
              SplitMate
            </h1>
          </Link>
          <Link href="/dashboard">
            <Button variant="ghost" className="text-gray-600 hover:text-gray-800">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-12 max-w-6xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-5xl font-black text-gray-800 mb-4">
            How can we help you?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Find answers to common questions, explore our guides, or get in touch with our support team
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for help articles, guides, or FAQs..."
              className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200 bg-white/80 backdrop-blur-sm shadow-lg"
            />
          </div>
        </div>

        {/* Quick Help Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {quickHelp.map((item, index) => (
            <div 
              key={index}
              className="bg-white/80 backdrop-blur-xl border border-gray-200/50 rounded-2xl p-6 hover:shadow-lg hover:shadow-gray-200/50 transition-all duration-300 cursor-pointer group"
            >
              <div className={`w-12 h-12 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <item.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-emerald-600 transition-colors">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {item.description}
              </p>
              <div className="flex items-center mt-4 text-emerald-600 group-hover:text-emerald-700 transition-colors">
                <span className="text-sm font-medium">Learn more</span>
                <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* FAQ Section */}
          <div>
            <h3 className="text-3xl font-bold text-gray-800 mb-8">
              Frequently Asked Questions
            </h3>
            
            <div className="space-y-4">
              {faqs.map((faq) => (
                <div 
                  key={faq.id}
                  className="bg-white/80 backdrop-blur-xl border border-gray-200/50 rounded-2xl overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50/50 transition-colors"
                  >
                    <span className="font-semibold text-gray-800">{faq.question}</span>
                    {expandedFaq === faq.id ? (
                      <ChevronDown className="h-5 w-5 text-gray-600" />
                    ) : (
                      <ChevronRight className="h-5 w-5 text-gray-600" />
                    )}
                  </button>
                  
                  {expandedFaq === faq.id && (
                    <div className="px-6 pb-4">
                      <div className="border-t border-gray-200/50 pt-4">
                        <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-3xl font-bold text-gray-800 mb-8">
              Get in Touch
            </h3>

            {/* Contact Options */}
            <div className="space-y-4 mb-8">
              {contactOptions.map((option, index) => (
                <div 
                  key={index}
                  className="bg-white/80 backdrop-blur-xl border border-gray-200/50 rounded-2xl p-6 hover:shadow-lg hover:shadow-gray-200/50 transition-all duration-300 group cursor-pointer"
                >
                  <div className="flex items-start space-x-4">
                    <div className={`w-12 h-12 bg-gradient-to-br from-${option.color}-500 to-${option.color}-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <option.icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-bold text-gray-800 mb-1 group-hover:text-emerald-600 transition-colors">
                        {option.title}
                      </h4>
                      <p className="text-gray-600 text-sm mb-2">{option.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-xs text-gray-500">
                          <Clock className="h-3 w-3 mr-1" />
                          {option.availability}
                        </div>
                        <Button
                          size="sm"
                          className={`bg-gradient-to-r from-${option.color}-600 to-${option.color}-700 hover:from-${option.color}-700 hover:to-${option.color}-800 border-0 text-white`}
                        >
                          {option.action}
                          <ExternalLink className="h-3 w-3 ml-1" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Contact Form */}
            <div className="bg-white/80 backdrop-blur-xl border border-gray-200/50 rounded-2xl p-6">
              <h4 className="text-xl font-bold text-gray-800 mb-6">
                Send us a message
              </h4>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="block text-sm font-semibold text-gray-700 mb-2">
                      Name
                    </div>
                    <input
                      type="text"
                      value={contactForm.name}
                      onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                      placeholder="Your name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200"
                    />
                  </div>
                  
                  <div>
                    <div className="block text-sm font-semibold text-gray-700 mb-2">
                      Email
                    </div>
                    <input
                      type="email"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                      placeholder="your@email.com"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200"
                    />
                  </div>
                </div>

                <div>
                  <div className="block text-sm font-semibold text-gray-700 mb-2">
                    Category
                  </div>
                  <select
                    value={contactForm.category}
                    onChange={(e) => setContactForm({...contactForm, category: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200"
                  >
                    <option value="general">General Question</option>
                    <option value="technical">Technical Support</option>
                    <option value="billing">Billing & Account</option>
                    <option value="feature">Feature Request</option>
                    <option value="bug">Bug Report</option>
                  </select>
                </div>

                <div>
                  <div className="block text-sm font-semibold text-gray-700 mb-2">
                    Subject
                  </div>
                  <input
                    type="text"
                    value={contactForm.subject}
                    onChange={(e) => setContactForm({...contactForm, subject: e.target.value})}
                    placeholder="Brief description of your issue"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200"
                  />
                </div>

                <div>
                  <div className="block text-sm font-semibold text-gray-700 mb-2">
                    Message
                  </div>
                  <textarea
                    value={contactForm.message}
                    onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                    placeholder="Describe your question or issue in detail..."
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200 resize-none"
                  />
                </div>

                <Button
                  onClick={handleContactSubmit}
                  className="w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 border-0 shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 text-white group"
                >
                  <Send className="h-4 w-4 mr-2 group-hover:translate-x-1 transition-transform" />
                  Send Message
                </Button>
              </div>
                
            </div>
          </div>
        </div>

        {/* Additional Resources */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-emerald-600 to-green-700 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Still need help?
            </h3>
            <p className="text-emerald-100 mb-6 max-w-2xl mx-auto">
              Check out our comprehensive documentation, video tutorials, or join our community forum for more resources and tips.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm">
                <Book className="h-4 w-4 mr-2" />
                Documentation
              </Button>
              <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm">
                <Video className="h-4 w-4 mr-2" />
                Video Tutorials
              </Button>
              <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm">
                <Users className="h-4 w-4 mr-2" />
                Community Forum
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}