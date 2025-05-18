import { Button } from "@/components/ui/button";
import Link from "next/link";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-sm">
        <div className="mb-8">
          <Link href="/" className="text-blue-600 hover:text-blue-800 text-sm">
            <Button className="flex items-center" variant={"mainButton"}>
              &larr; Back to Home Page
            </Button>
          </Link>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Privacy Policy
        </h1>
        <p className="text-gray-600 mb-6 text-sm">Last Updated: Mars 1, 2025</p>

        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              1. Introduction
            </h2>
            <p className="text-gray-600 mb-4">
              Welcome to Estudy . We are committed to protecting your personal
              information and your right to privacy. This Privacy Policy
              explains how we collect, use, and disclose your information when
              you use our educational platform.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              2. Information We Collect
            </h2>
            <ul className="list-disc pl-6 space-y-3 text-gray-600">
              <li>
                <strong>Account Information:</strong> Name, email, institution,
                and user credentials
              </li>
              <li>
                <strong>Academic Data:</strong> Course enrollments, grades,
                assignments, and progress
              </li>
              <li>
                <strong>Usage Data:</strong> IP addresses, browser type, pages
                visited, and timestamps
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              3. How We Use Your Information
            </h2>
            <div className="grid md:grid-cols-2 gap-4 text-gray-600">
              <div>
                <h3 className="font-medium mb-2">Core Functions</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Provide and maintain our services</li>
                  <li>Process transactions and enrollments</li>
                  <li>Personalize learning experience</li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium mb-2">Improvements</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Develop new features</li>
                  <li>Analyze usage patterns</li>
                  <li>Prevent fraudulent activities</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              4. Data Protection
            </h2>
            <div className="bg-blue-50 p-4 rounded-lg">
              <ul className="list-disc pl-6 space-y-3 text-gray-600">
                <li>SSL/TLS encryption for data transmission</li>
                <li>Regular security audits</li>
                <li>Role-based access control</li>
                <li>GDPR compliance measures</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              5. Your Rights
            </h2>
            <div className="grid md:grid-cols-2 gap-4 text-gray-600">
              <div>
                <h3 className="font-medium mb-2">Access & Control</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Request data access</li>
                  <li>Update personal information</li>
                  <li>Delete account</li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium mb-2">Preferences</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Opt-out of marketing</li>
                  <li>Manage cookie settings</li>
                  <li>Download course data</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              6. Policy Updates
            </h2>
            <p className="text-gray-600">
              We may update this policy periodically. Significant changes will
              be notified through platform announcements or email. Continued use
              after changes constitutes acceptance of the revised policy.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
