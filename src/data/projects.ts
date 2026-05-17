export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  tags: string[];
  github: string;
  demo?: string;
  blogPost?: string; // blog post ID if exists
  featured: boolean;
  image?: string;
}

export const projects: Project[] = [
  {
    id: "holistic-trigger-poisoning",
    title: "Holistic Trigger Poisoning Attacks",
    description: "Research project exploring backdoor attacks on Graph Attention Networks using holistic triggers.",
    longDescription: "Researched poisoning attacks against Graph Attention Networks by combining graph structure manipulation with feature perturbations to create stealthier backdoor triggers. The project evaluated how localized changes to node features and graph topology could influence model predictions while remaining difficult to detect through explainability methods such as GNN Explainer and gradient-based saliency analysis.",
    tags: ["Python", "PyTorch Geometric", "GNNs", "Adversarial ML", "XAI"],
    github: "https://github.com/layahvigneaud/ECE_117",
    //paperLink: "https://drive.google.com/file/d/1o1GUJhNuRm_pflCLaQQGOrYRy7GA3GuX/view?usp=drive_link",
    featured: true,
  },
  {
    id: "network-analyzer",
    title: "Network Traffic Analyzer",
    description: "Real-time packet inspection tool built with Python and Scapy.",
    longDescription: "Deep packet inspection tool that monitors network traffic in real-time, detects suspicious patterns, and generates comprehensive security reports. Implements custom protocol analysis and anomaly detection algorithms.",
    tags: ["Python", "Scapy", "Network Security", "ML"],
    github: "https://github.com/alexchen/network-analyzer",
    featured: true,
  },
  {
    id: "secure-chat",
    title: "Secure Chat Application",
    description: "End-to-end encrypted messaging app implementing RSA and AES encryption.",
    longDescription: "Full-stack encrypted messaging platform with zero-knowledge architecture. Implements hybrid encryption using RSA-2048 for key exchange and AES-256-GCM for message encryption.",
    tags: ["React", "Node.js", "Cryptography", "WebSockets"],
    github: "https://github.com/alexchen/secure-chat",
    featured: true,
  },
  {
    id: "vuln-scanner",
    title: "Vulnerability Scanner",
    description: "Automated web application security scanner for OWASP Top 10 vulnerabilities.",
    longDescription: "Comprehensive web application security testing tool that crawls sites and tests for common vulnerabilities including XSS, SQL injection, CSRF, and more. Generates detailed reports with remediation guidance.",
    tags: ["Go", "Security", "Web", "OWASP"],
    github: "https://github.com/alexchen/vuln-scanner",
    featured: true,
  },
  {
    id: "password-manager",
    title: "Password Manager",
    description: "Local-first password manager with zero-knowledge architecture.",
    longDescription: "Secure password management solution built with Electron. Features biometric authentication, encrypted local storage, password generation, and breach monitoring. All encryption happens client-side.",
    tags: ["TypeScript", "Electron", "Security", "Crypto"],
    github: "https://github.com/alexchen/password-manager",
    featured: false,
  },
  {
    id: "honeypot",
    title: "SSH Honeypot",
    description: "Deception-based security system to detect and analyze attacks.",
    longDescription: "Low-interaction SSH honeypot that logs attacker behavior, captures credentials, and analyzes attack patterns. Provides insights into common attack vectors and threat intelligence.",
    tags: ["Python", "Security", "Networking"],
    github: "https://github.com/alexchen/ssh-honeypot",
    featured: false,
  },
  {
    id: "malware-analyzer",
    title: "Malware Analysis Toolkit",
    description: "Static and dynamic malware analysis automation framework.",
    longDescription: "Automated malware analysis platform that performs static analysis, sandboxed execution, and behavioral analysis. Generates comprehensive reports on malware capabilities and IOCs.",
    tags: ["Python", "Reverse Engineering", "Security"],
    github: "https://github.com/alexchen/malware-toolkit",
    featured: false,
  },
];
