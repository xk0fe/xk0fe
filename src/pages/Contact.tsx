import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import './Contact.css';

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // EmailJS configuration from environment variables
      const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID;
      const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
      const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

      if (!serviceId || !templateId || !publicKey) {
        console.error('EmailJS configuration missing. Please check environment variables.');
        throw new Error('EmailJS configuration missing');
      }

      // Prepare template parameters
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        reply_to: formData.email,
      };

      // Send email using EmailJS
      const response = await emailjs.send(
        serviceId,
        templateId,
        templateParams,
        publicKey
      );

      console.log('Email sent successfully:', response);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      
    } catch (error) {
      console.error('Email sending failed:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }
  };

  const contactMethods = [
    {
      icon: '📧',
      title: 'Email',
      value: 'x.k0fe@yandex.ru',
      link: 'mailto:x.k0fe@yandex.ru'
    },
    {
      icon: '💼',
      title: 'LinkedIn',
      value: '/in/k0fe',
      link: 'https://linkedin.com/in/k0fe'
    },
    {
      icon: '🐙',
      title: 'GitHub',
      value: '/xk0fe',
      link: 'https://github.com/xk0fe'
    },
    {
      icon: '🎮',
      title: 'Discord',
      value: 'k0fe',
      link: undefined // This will make it non-clickable
    }
  ];

  return (
    <div className="contact">
      <div className="contact-header">
        <div className="container">
          <h1>Contact Me</h1>
          <p>Ready to collaborate? Let's build something awesome together!</p>
        </div>
      </div>

      <div className="contact-content">
        <div className="container">
          <div className="contact-grid">
            
            {/* Contact Methods */}
            <div className="contact-methods">
              <h2>Get In Touch</h2>
              <div className="methods-grid">
                {contactMethods.map((method, index) => {
                  // Use different component based on whether there's a link
                  const Component = method.link ? 'a' : 'div';
                  const props = method.link ? {
                    href: method.link,
                    target: "_blank",
                    rel: "noopener noreferrer"
                  } : {};

                  return (
                    <Component
                      key={index}
                      {...props}
                      className={`contact-method ${!method.link ? 'non-clickable' : ''}`}
                    >
                      <span className="method-icon">{method.icon}</span>
                      <div className="method-info">
                        <h3>{method.title}</h3>
                        <p>{method.value}</p>
                      </div>
                    </Component>
                  );
                })}
              </div>
            </div>

            {/* Contact Form */}
            <div className="contact-form-container">
              <h2>Send a Message</h2>
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      placeholder="Your Name"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="subject">Subject *</label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select a subject</option>
                    <option value="freelance">Freelance Project</option>
                    <option value="collaboration">Collaboration</option>
                    <option value="job">Job Opportunity</option>
                    <option value="question">General Question</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    placeholder="Tell me about your project or question..."
                  />
                </div>

                <button 
                  type="submit" 
                  className={`submit-btn ${isSubmitting ? 'submitting' : ''}`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="loading-spinner"></span>
                      Sending...
                    </>
                  ) : (
                    <>
                      <span className="btn-icon">🚀</span>
                      Send Message
                    </>
                  )}
                </button>

                {submitStatus === 'success' && (
                  <div className="form-status success">
                    <span className="status-icon">✅</span>
                    Message sent successfully! I'll get back to you soon.
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="form-status error">
                    <span className="status-icon">❌</span>
                    Oops! Something went wrong. Please try again or email me directly.
                  </div>
                )}
              </form>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact; 