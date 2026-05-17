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
    school: "Tech University",
    degree: "Bachelor of Science in Computer Science",
    year: "Expected May 2027",
    gpa: "3.8/4.0",
    relevant: [
      "Network Security",
      "Cryptography",
      "Operating Systems",
      "Algorithms",
      "Database Systems",
    ],
  };

  const certifications = [
    { name: "eJPT", issuer: "eLearnSecurity", status: "In Progress" },
    { name: "CompTIA Security+", issuer: "CompTIA", status: "Planned 2026" },
    { name: "OSCP", issuer: "Offensive Security", status: "Planned 2027" },
  ];

  const skills = {
    Security: [
      "Penetration Testing",
      "Vulnerability Assessment",
      "Network Security",
      "Cryptography",
      "Reverse Engineering",
    ],
    Languages: [
      "Python",
      "Go",
      "JavaScript/TypeScript",
      "C/C++",
      "Bash",
    ],
    "Tools & Frameworks": [
      "Metasploit",
      "Burp Suite",
      "Wireshark",
      "Nmap",
      "React",
      "Node.js",
    ],
    Technologies: ["Docker", "Linux", "Git", "AWS", "PostgreSQL"],
  };

  const experience = [
    {
      role: "Security Research Intern",
      company: "CyberDefense Labs",
      period: "Summer 2026",
      description: [
        "Conducted vulnerability assessments on web applications",
        "Developed automated security scanning tools in Python",
        "Participated in red team exercises and penetration testing",
      ],
    },
    {
      role: "CTF Team Captain",
      company: "University Security Club",
      period: "2025 - Present",
      description: [
        "Lead team of 8 students in Capture The Flag competitions",
        "Ranked top 50 in National Cyber League competition",
        "Organize weekly security workshops and training sessions",
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
              Cybersecurity enthusiast with a passion for building secure
              systems and understanding how things break.
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
              Request Resume
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
                {education.year} • GPA: {education.gpa}
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
