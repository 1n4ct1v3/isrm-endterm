import React from 'react';
import { Shield, CheckCircle2, AlertCircle } from 'lucide-react';

function GDPRPage() {
  const sections = [
    {
      title: "1. Understand Your Data Processing Obligations",
      items: [
        "Identify and document all personal data collected, processed, and stored.",
        "Determine the lawful basis for processing personal data (e.g., consent, contract, legal obligation).",
        "Maintain a data processing register with details on data sources, storage, and sharing."
      ]
    },
    {
      title: "2. Obtain Clear and Explicit User Consent",
      items: [
        "Ensure all consent requests are clear, transparent, and easy to understand.",
        "Use separate consent forms for different data processing purposes.",
        "Provide users with the option to withdraw consent easily.",
        "Keep records of when and how consent was obtained."
      ]
    },
    {
      title: "3. Implement Strong Data Security Measures",
      items: [
        "Encrypt stored and transmitted personal data.",
        "Apply strong access controls and authentication mechanisms.",
        "Use pseudonymization or anonymization where possible.",
        "Conduct regular security risk assessments and penetration tests."
      ]
    },
    {
      title: "4. Provide User Rights and Controls",
      items: [
        "Allow users to access, correct, or delete their personal data upon request.",
        "Implement a process to respond to Data Subject Access Requests (DSARs) within 30 days.",
        "Provide an option for users to export their data in a machine-readable format.",
        "Ensure users can object to data processing or restrict processing when applicable."
      ]
    },
    {
      title: "5. Implement a Clear and Transparent Privacy Policy",
      items: [
        "Write a concise, transparent, and easily accessible privacy policy.",
        "Clearly explain what data is collected, why, and how it's used.",
        "List all third parties with whom personal data is shared.",
        "Regularly update the privacy policy to reflect changes in data processing."
      ]
    },
    {
      title: "6. Ensure Third-Party and Vendor Compliance",
      items: [
        "Conduct due diligence on all third-party processors (e.g., payment providers, analytics services).",
        "Sign Data Processing Agreements (DPAs) with all third-party vendors handling user data.",
        "Regularly audit vendors for GDPR compliance."
      ]
    },
    {
      title: "7. Appoint a Data Protection Officer (DPO) if Required",
      items: [
        "Determine if a DPO is necessary (mandatory for large-scale processing or monitoring).",
        "Assign a DPO responsible for data protection policies and GDPR compliance.",
        "Publish the DPO's contact details on the website."
      ]
    },
    {
      title: "8. Establish a Data Breach Response Plan",
      items: [
        "Implement real-time monitoring for potential data breaches.",
        "Develop an incident response plan to handle security breaches.",
        "Notify the supervisory authority within 72 hours of a data breach.",
        "Inform affected users promptly if their data is compromised."
      ]
    },
    {
      title: "9. Comply with Data Retention and Deletion Requirements",
      items: [
        "Define data retention policies for different types of personal data.",
        "Regularly review and securely delete outdated or unnecessary data.",
        "Ensure backup systems also comply with data retention policies."
      ]
    },
    {
      title: "10. Conduct Regular GDPR Audits and Staff Training",
      items: [
        "Train employees on GDPR principles and best practices.",
        "Conduct internal audits to ensure ongoing compliance.",
        "Review policies, procedures, and contracts at least annually."
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center gap-3 mb-8 border-b pb-6">
            <Shield className="w-10 h-10 text-indigo-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-800">GDPR Compliance Checklist</h1>
              <p className="text-gray-600 mt-2">for Online Store</p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {sections.map((section, index) => (
              <div 
                key={index} 
                className="bg-gradient-to-br from-indigo-50 to-white rounded-xl p-6 border border-indigo-100 shadow-sm"
              >
                <div className="flex items-start gap-3 mb-4">
                  <AlertCircle className="w-6 h-6 text-indigo-600 flex-shrink-0 mt-1" />
                  <h2 className="text-xl font-semibold text-gray-800">{section.title}</h2>
                </div>
                <ul className="space-y-3">
                  {section.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default GDPRPage;