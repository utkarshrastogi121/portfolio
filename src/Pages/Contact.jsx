/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { Share2, User, Mail, MessageSquare, Send } from "lucide-react";
import { Link } from "react-router-dom";
import SocialLinks from "../components/SocialLinks";
import Swal from "sweetalert2";
import AOS from "aos";
import "aos/dist/aos.css";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    AOS.init({
      once: false,
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    Swal.fire({
      title: 'Sending Message...',
      html: 'Please wait while we send your message',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    try {
      // Get form data
      const form = e.target;

      // Submit form
      await form.submit();

      // Show success message
      Swal.fire({
        title: 'Success!',
        text: 'Your message has been sent successfully!',
        icon: 'success',
        confirmButtonColor: '#6366f1',
        timer: 2000,
        timerProgressBar: true
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: 'Something went wrong. Please try again later.',
        icon: 'error',
        confirmButtonColor: '#6366f1'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
  <div className="w-full py-10 px-[5%] md:px-[10%] lg:px-[12%]">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start" id="Contact">
    
    {/* Social Links Section — NOW ON LEFT */}
    <div
      data-aos="fade-right"
      data-aos-duration="1200"
      className="bg-white/5 backdrop-blur-xl rounded-3xl p-5 sm:p-10 shadow-2xl flex flex-col justify-center gap-6 transition-all duration-300 hover:shadow-[#6366f1]/10"
    >
      <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7] mb-4">
        Connect with me
      </h3>
      <p className="text-gray-400">
            Always open to exchanging ideas, solving problems, and building great things with curious minds. Let&apos;s connect!


          </p>
      <SocialLinks />
    </div>

    {/* Contact Form Section — NOW ON RIGHT */}
    <div
      data-aos="fade-left"
      data-aos-duration="1200"
      className="bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl p-5 sm:p-10 transition-all duration-300 hover:shadow-[#6366f1]/10"
    >
      <div className="flex justify-between items-start mb-8">
        <div>
          <h2 className="text-3xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]">
            Get in Touch
          </h2>
          <p className="text-gray-400">
            Have something to discuss? Send me a message and let&apos;s talk.
          </p>
        </div>
        <Share2 className="w-10 h-10 text-[#6366f1] opacity-50" />
      </div>

      <form
        action="https://formsubmit.co/utkarsh.2023ug1077@iiitranchi.ac.in"
        method="POST"
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        <input type="hidden" name="_template" value="table" />
        <input type="hidden" name="_captcha" value="false" />

        {/* Name Field */}
        <div className="relative group">
          <User className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            disabled={isSubmitting}
            className="w-full p-4 pl-12 bg-white/10 rounded-xl border border-white/20 placeholder-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-[#6366f1]/30 transition-all duration-300"
            required
          />
        </div>

        {/* Email Field */}
        <div className="relative group">
          <Mail className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            disabled={isSubmitting}
            className="w-full p-4 pl-12 bg-white/10 rounded-xl border border-white/20 placeholder-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-[#6366f1]/30 transition-all duration-300"
            required
          />
        </div>

        {/* Message Field */}
        <div className="relative group">
          <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            disabled={isSubmitting}
            className="w-full p-4 pl-12 bg-white/10 rounded-xl border border-white/20 placeholder-gray-500 text-white resize-none h-30 focus:outline-none focus:ring-2 focus:ring-[#6366f1]/30 transition-all duration-300"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-[#6366f1]/20 active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50"
        >
          <Send className="w-5 h-5" />
          {isSubmitting ? "Sending..." : "Send Message"}
        </button>
      </form>
    </div>
  </div>
</div>
</>
);
};

export default ContactPage;