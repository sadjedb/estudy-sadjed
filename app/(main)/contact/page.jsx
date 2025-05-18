"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import {
  FiMail,
  FiPhone,
  FiLinkedin,
  FiGithub,
  FiSend,
  FiFacebook,
} from "react-icons/fi";

const page = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const floatingVariants = {
    float: {
      y: [0, -15, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        repeatType: "mirror",
        ease: "easeInOut",
      },
    },
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <section className="py-20 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Contact The Administration
          </motion.h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto mb-6" />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto"
          >
            If you have any issues, please contact the administration.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8 relative"
          >
            <motion.div
              variants={floatingVariants}
              animate="float"
              className="p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <FiMail className="text-3xl text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Email</h3>
              <p className="text-gray-600">estudyInIkama@gmail.com</p>
            </motion.div>

            <motion.div
              variants={floatingVariants}
              animate="float"
              className="p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
              style={{ transitionDelay: "0.2s" }}
            >
              <FiPhone className="text-3xl text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Phone</h3>
              <p className="text-gray-600">+213 (123) 45-6789</p>
            </motion.div>

            <div className="flex space-x-6 justify-center mt-8">
              <motion.a
                whileHover={{ scale: 1.1, color: "#2563eb" }}
                className="text-gray-600 hover:text-blue-600 transition-colors"
                href="https://www.linkedin.com"
              >
                <FiLinkedin className="text-3xl" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1, color: "#2563eb" }}
                className="text-gray-600 hover:text-blue-600 transition-colors"
                href="https://facebook.com"
              >
                <FiFacebook className="text-3xl" />
              </motion.a>
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded-2xl shadow-lg"
          >
            <div className="space-y-6">
              <div>
                <label className="block text-gray-700 mb-2">Name</label>
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type="text"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Email</label>
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type="email"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Message</label>
                <motion.textarea
                  whileFocus={{ scale: 1.02 }}
                  className="w-full px-4 py-2 border rounded-lg h-32 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
              >
                <FiSend className="text-lg" />
                Send Message
              </motion.button>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default page;
