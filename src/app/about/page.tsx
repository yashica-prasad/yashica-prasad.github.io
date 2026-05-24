import {
  GraduationCap,
  Award,
  Code2,
  Terminal,
  Download,
} from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { siteConfig } from "@/config";

export default function AboutPage() {
  const education = {
    school: "University of California, Los Angeles",
    degree: "Bachelor of Science, Computer Science and Engineering",
    year: "Expected June 2026",
    //GPA: "3.8/4.0",
    relevant: [
      "Data Structures and Algorithms",
      "Operating Systems",
      "Computer Architecture",
      "Computer Networks",
      "Database Systems",
      "Software Engineering",
      "Machine Learning", 
      "Computer Security (ML Security focus)",     
      "Computer Graphics",
    ],
  };

  const certifications = [
    {
      name: "Google IT Support Professional Certificate",
      issuer: "Coursera / Google",
      status: "Issued Oct 2020"
    },
    {
      name: "Capstone: Retrieving, Processing, and Visualizing Data with Python",
      issuer: "Coursera",
      status: "Issued Feb 2020"
    },
    {
      name: "Professional Certificate in Machine Learning and Artificial Intelligence",
      issuer: "UC Berkeley Online",
      status: "Enrolled — Launches Jun 25, 2026"
    },
  ];

  const skills = {
    ProgrammingLanguages: [
      "C",
      "C++",
      "Python",
      "JavaScript",
      "TypeScript",
      "Java"
    ],
    Systems: [
      "Linux",
      "Windows Administration",
      "PowerShell",
      "Operating Systems",
      "Computer Networking"
    ],
    Security: [
      "Computer Security",
      "Access Control",
      "Endpoint Troubleshooting",
      "Security Procedures",
      "Network Troubleshooting"
    ],
    Concepts: [
      "Version Control",
      "Data Structures",
      "Algorithms",
      "Distributed Systems",
      "Machine Learning",
      "Machine Learning Security"
    ],
    Technologies: [
      "Git",
      "Docker",
      "AWS",
      "PostgreSQL",
      "Three.js",
      "MERN Stack"
    ],
  };

  const experience = [
    {
      role: "Computer Support Technician",
      company: "UCLA Student Affairs IT",
      period: "Apr 2025 - Present",
      description: [
        "Support faculty, staff, and students in a Windows-based environment, resolving hardware, operating system, account, and network issues.",
        "Use Windows administration tools and PowerShell scripts to diagnose and remediate high-priority technical incidents.",
        "Follow security and access-control procedures while handling sensitive user systems and credentials.",
      ],
    },
    {
      role: "Naval ROTC Midshipman",
      company: "UCLA Bruin Battalion",
      period: "Jun 2023 - Apr 2025",
      description: [
        "Completed Naval Science and engineering-focused coursework emphasizing technical problem-solving and operational discipline.",
        "Participated in rigorous summer training programs focused on leadership, systems thinking, and team coordination.",
        "Developed experience working in structured, high-accountability environments requiring clear communication and reliability.",
      ],
    },
    {
      role: "Software Engineer Intern",
      company: "Play Date Care",
      period: "May 2022 - Sep 2022",
      description: [
        "Developed UI flows for account onboarding and user dashboards.",
        "Supported frontend feature implementation and improved user-facing application workflows.",
        "Contributed to testing and QA automation to improve reliability across core application features.",
      ],
    },
    {
      role: "Web Development Intern",
      company: "Àuda.B",
      period: "Dec 2021 - Mar 2022",
      description: [
        "Built and customized Shopify web pages to support ecommerce product experiences.",
        "Implemented product bundling features and other storefront functionality.",
        "Collaborated on frontend updates to improve site usability and support business requirements.",
      ],
    },
  ];

  return (
    <div>
      <section className="px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <div className="mb-12">
            <h1 className="mb-4 font-mono text-4xl sm:text-5xl text-[#22c55e]">
              {">"} About_Me
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              I'm a computer science student focused on cybersecurity, systems, and applied machine learning, with hands-on experience in IT support, security research, and full-stack development.
            </p>
          </div>

          <div className="mb-12">
            <a
              href={`mailto:${siteConfig.email}?subject=${encodeURIComponent("Resume Request")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-[#22c55e] px-6 py-3 font-mono text-sm text-[#22c55e] transition-all hover:bg-[#22c55e]/10 hover:shadow-[0_0_20px_rgba(34,197,94,0.3)]"
            >
              <Download className="h-4 w-4" />
              Download Resume
            </a>
          </div>

          <div className="mb-12">
            <div className="mb-6 flex items-center gap-3">
              <GraduationCap className="h-6 w-6 text-purple-400" />
              <h2 className="font-mono text-2xl text-foreground">Education</h2>
            </div>

            <div className="rounded-lg border border-[#22c55e]/20 bg-background/50 p-6 backdrop-blur-sm">
              <h3 className="mb-2 font-mono text-xl text-[#22c55e]">
                {education.school}
              </h3>
              <p className="mb-1 text-foreground">{education.degree}</p>
              <p className="mb-4 text-sm text-muted-foreground">
                {education.year}
              </p>

              <div>
                <p className="mb-2 font-mono text-sm text-muted-foreground">
                  Relevant Coursework:
                </p>
                <div className="flex flex-wrap gap-2">
                  {education.relevant.map((course, index) => (
                    <span
                      key={index}
                      className="rounded border border-purple-400/30 bg-purple-400/10 px-3 py-1 font-mono text-xs text-purple-400"
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mb-12">
            <div className="mb-6 flex items-center gap-3">
              <Terminal className="h-6 w-6 text-purple-400" />
              <h2 className="font-mono text-2xl text-foreground">Experience</h2>
            </div>

            <div className="space-y-6">
              {experience.map((exp, index) => (
                <div
                  key={index}
                  className="rounded-lg border border-[#22c55e]/20 bg-background/50 p-6 backdrop-blur-sm"
                >
                  <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <h3 className="mb-1 font-mono text-lg text-[#22c55e]">
                        {exp.role}
                      </h3>
                      <p className="text-foreground">{exp.company}</p>
                    </div>
                    <span className="font-mono text-sm text-muted-foreground">
                      {exp.period}
                    </span>
                  </div>

                  <ul className="space-y-2">
                    {exp.description.map((item, i) => (
                      <li
                        key={i}
                        className="flex gap-3 text-sm text-muted-foreground"
                      >
                        <span className="text-[#22c55e]">›</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-12">
            <div className="mb-6 flex items-center gap-3">
              <Code2 className="h-6 w-6 text-purple-400" />
              <h2 className="font-mono text-2xl text-foreground">Skills</h2>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              {Object.entries(skills).map(([category, items]) => (
                <div
                  key={category}
                  className="rounded-lg border border-[#22c55e]/20 bg-background/50 p-6 backdrop-blur-sm"
                >
                  <h3 className="mb-4 font-mono text-sm text-[#22c55e]">
                    {category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {items.map((skill, index) => (
                      <span
                        key={index}
                        className="rounded border border-blue-400/30 bg-blue-400/10 px-3 py-1 font-mono text-xs text-blue-400"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-12">
            <div className="mb-6 flex items-center gap-3">
              <Award className="h-6 w-6 text-purple-400" />
              <h2 className="font-mono text-2xl text-foreground">
                Certifications
              </h2>
            </div>

            <div className="space-y-4">
              {certifications.map((cert, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded-lg border border-[#22c55e]/20 bg-background/50 p-4 backdrop-blur-sm"
                >
                  <div>
                    <h3 className="mb-1 font-mono text-foreground">
                      {cert.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {cert.issuer}
                    </p>
                  </div>
                  <span className="rounded border border-purple-400/30 bg-purple-400/10 px-3 py-1 font-mono text-xs text-purple-400">
                    {cert.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ContactForm />
    </div>
  );
}
