
import React, { useState } from 'react';
import { FaqItem } from '../types';
import { Phone, Mail, MapPin, Plus, Minus, Send } from 'lucide-react';

const Contact: React.FC = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState<{type: 'success' | 'error', text: string} | null>(null);

  const faqs: FaqItem[] = [
    {
      question: "How do I know my donation actually reaches the beneficiaries?",
      answer: "We publish detailed financial reports and gallery evidence after every distribution on the 30th. You can also track specific project outcomes in our Impact section."
    },
    {
      question: "Can I donate physical items instead of money?",
      answer: "Yes! We accept food items, clothes, and educational materials. Please contact an admin to arrange a drop-off at our logistics center."
    },
    {
      question: "Is the Hive a registered NGO?",
      answer: "Yes, Hanny's Hive is registered with the CAC. Our registration number is publicly available upon request for verification."
    },
    {
      question: "How can I volunteer for the next distribution?",
      answer: "We love volunteers! Fill out the contact form with the subject 'Volunteer' and we will add you to our WhatsApp coordination group."
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);

    // Validation
    if (!formData.name.trim() || !formData.message.trim()) {
      setStatus({ type: 'error', text: 'Name and Message are required.' });
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setStatus({ type: 'error', text: 'Please enter a valid email address.' });
      return;
    }

    // Success Mock
    setStatus({ type: 'success', text: 'Message sent! An admin will reply via WhatsApp/Email shortly.' });
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-2 gap-16">
        
        {/* Left Column: Form & Info */}
        <div>
          <h1 className="text-4xl font-bold mb-2">Get in Touch</h1>
          <p className="text-gray-600 mb-8">Have questions or need to verify a campaign? We are here.</p>

          <div className="bg-gray-50 p-8 rounded-xl border border-gray-100 mb-8">
            <h3 className="font-bold mb-4">Verification Channels</h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="bg-black text-white p-2 rounded-full mr-4"><Phone className="h-4 w-4" /></div>
                <div>
                  <p className="text-xs text-gray-500">Hotline / WhatsApp</p>
                  <p className="font-bold">+234 800 HIVE HELP</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="bg-hive-red text-white p-2 rounded-full mr-4"><Mail className="h-4 w-4" /></div>
                <div>
                  <p className="text-xs text-gray-500">Email Support</p>
                  <p className="font-bold">admin@hannyshive.org</p>
                </div>
              </div>
            </div>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {status && (
               <div className={`p-3 rounded text-sm ${status.type === 'error' ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>
                 {status.text}
               </div>
            )}
            <div className="grid grid-cols-2 gap-4">
              <input 
                type="text" 
                name="name"
                placeholder="Name" 
                value={formData.name}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded focus:border-hive-red outline-none" 
              />
              <input 
                type="email" 
                name="email"
                placeholder="Email" 
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded focus:border-hive-red outline-none" 
              />
            </div>
            <input 
              type="text" 
              name="subject"
              placeholder="Subject (e.g., Verification, Donation, Volunteering)" 
              value={formData.subject}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded focus:border-hive-red outline-none" 
            />
            <textarea 
              name="message"
              placeholder="Your Message" 
              rows={5} 
              value={formData.message}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded focus:border-hive-red outline-none"
            ></textarea>
            <button className="bg-black text-white font-bold py-3 px-8 rounded hover:bg-gray-800 transition flex items-center">
               <Send className="h-4 w-4 mr-2" /> Send Message
            </button>
          </form>
        </div>

        {/* Right Column: FAQ */}
        <div>
          <div className="bg-hive-red p-8 rounded-xl text-white mb-8">
            <h2 className="text-2xl font-bold mb-2">Common Questions</h2>
            <p className="opacity-90">Everything you need to know about how the Hive operates.</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full flex justify-between items-center p-4 text-left font-bold bg-white hover:bg-gray-50 transition"
                >
                  {faq.question}
                  {activeFaq === idx ? <Minus className="h-4 w-4 text-hive-red" /> : <Plus className="h-4 w-4 text-gray-400" />}
                </button>
                {activeFaq === idx && (
                  <div className="p-4 bg-gray-50 text-gray-600 text-sm leading-relaxed border-t border-gray-100">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-8 p-6 border-2 border-dashed border-gray-300 rounded-xl text-center">
            <MapPin className="h-8 w-8 text-gray-400 mx-auto mb-2" />
            <h3 className="font-bold text-gray-800">Visit Our Collection Center</h3>
            <p className="text-sm text-gray-500 mt-1">12 Honeycomb Avenue, Ikeja, Lagos.</p>
            <p className="text-xs text-hive-red mt-2 font-bold">Open Mon-Fri, 9am - 4pm</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Contact;
