import React from 'react';
import { CreditCard, CheckCircle2, AlertCircle } from 'lucide-react';

function PCIDSSPage() {
  const sections = [
    {
      title: "1. Determine Compliance Level",
      items: [
        "Identify the total number of card transactions processed annually.",
        "Determine the appropriate PCI DSS compliance level (1-4).",
        "Assess whether a Self-Assessment Questionnaire (SAQ) or a Qualified Security Assessor (QSA) is required."
      ]
    },
    {
      title: "2. Secure Network and Systems",
      items: [
        "Install and configure firewalls to restrict unauthorized access.",
        "Regularly update and review firewall rules and policies.",
        "Restrict inbound and outbound traffic to only necessary services.",
        "Ensure routers and wireless access points are securely configured."
      ]
    },
    {
      title: "3. Protect Cardholder Data",
      items: [
        "Never store CVV, PIN, or sensitive authentication data after authorization.",
        "Use strong encryption (AES-256) for storing cardholder data.",
        "Encrypt cardholder data when transmitting over open/public networks.",
        "Mask PAN (Primary Account Number) when displayed (show only the last four digits)."
      ]
    },
    {
      title: "4. Implement Strong Authentication and Access Control",
      items: [
        "Require passwords of at least 7 characters (mix of letters, numbers, symbols).",
        "Enforce password changes every 90 days.",
        "Disable vendor-supplied default passwords on all systems.",
        "Implement multi-factor authentication (MFA) for all administrative and remote access.",
        "Restrict access to cardholder data on a need-to-know basis (role-based access control).",
        "Assign unique user IDs for all employees accessing sensitive systems."
      ]
    },
    {
      title: "5. Monitor and Test Networks Regularly",
      items: [
        "Implement logging and monitoring of all access to cardholder data.",
        "Enable audit logs for all system components and review them regularly.",
        "Conduct vulnerability scans and penetration testing at least quarterly.",
        "Use intrusion detection/prevention systems (IDS/IPS)."
      ]
    },
    {
      title: "6. Maintain a Secure Software Development Process",
      items: [
        "Ensure all applications are securely coded following OWASP best practices.",
        "Regularly test web applications for security vulnerabilities (e.g., SQL Injection, XSS).",
        "Apply security patches and updates promptly.",
        "Use Web Application Firewalls (WAF) to protect against online threats."
      ]
    },
    {
      title: "7. Implement Physical Security Measures",
      items: [
        "Restrict physical access to servers, cardholder data, and network devices.",
        "Use video surveillance in areas with sensitive data access.",
        "Secure backups in a locked, restricted location."
      ]
    },
    {
      title: "8. Develop an Incident Response Plan",
      items: [
        "Create a documented Incident Response Plan (IRP) for security breaches.",
        "Train employees on how to identify and report suspicious activity.",
        "Regularly test and update the incident response plan."
      ]
    },
    {
      title: "9. Regularly Train Employees on Security Awareness",
      items: [
        "Conduct mandatory cybersecurity awareness training for all employees.",
        "Educate staff on phishing attacks, password hygiene, and secure payment processing."
      ]
    },
    {
      title: "10. Maintain PCI DSS Compliance Validation",
      items: [
        "Complete and submit an Attestation of Compliance (AOC) annually.",
        "Undergo annual audits if required (for Level 1 merchants).",
        "Keep all compliance records and policies up to date."
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center gap-3 mb-8 border-b pb-6">
            <CreditCard className="w-10 h-10 text-indigo-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-800">PCI DSS Compliance Checklist</h1>
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


export default PCIDSSPage;