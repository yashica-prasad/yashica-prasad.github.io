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
    tags: ["Python", "PyTorch Geometric", "AI/ML", "Adversarial ML"],
    github: "https://github.com/layahvigneaud/ECE_117",
    //paperLink: "https://drive.google.com/file/d/1o1GUJhNuRm_pflCLaQQGOrYRy7GA3GuX/view?usp=drive_link",
    featured: true,
  },
  {
    id: "strange-attractors",
    title: "Strange Attractors with Python",
    description: "Certified Lyapunov Exponents for Low-Dimensional Dynamical Systems",
    longDescription: "A Python tool that computes Lyapunov exponents with explicit numerical error bounds for discrete-time dynamical systems, and demonstrate where naïve methods fail.",
    tags: ["Python", "Math"],
    github: "TODO",
    blogPost: "TODO",
    featured: true,
  },
  {
    id: "speed-read",
    title: "Speed Reading Application",
    description: "TODO",
    longDescription: "TODO",
    tags: ["TODO"],
    github: "TODO",
    blogPost: "TODO",
    featured: true,
  },
  {
    id: "ad-blocker",
    title: "Ad Blocker",
    description: "TODO",
    longDescription: "TODO",
    tags: ["TODO"],
    github: "TODO",
    blogPost: "TODO",
    featured: true,
  },
  {
    id: "dead-plant-society",
    title: "Dead Plant Society",
    description: "TODO",
    longDescription: "TODO",
    tags: ["TODO"],
    github: "TODO",
    blogPost: "TODO",
    featured: false,
  },
  {
    id: "3d-tetris",
    title: "3D Tetris",
    description: "TODO",
    longDescription: "TODO",
    tags: ["TODO"],
    github: "TODO",
    blogPost: "TODO",
    featured: false,
  },
];
