export const siteConfig = {
  name: "Yashica Prasad",
  email: "yashica.prasad@gmail.com",
  github: "https://github.com/yashica-prasad",
  linkedin: "https://www.linkedin.com/in/yashicaprasad/",
  showContactForm: true,
};

export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function withBasePath(path: string) {
  if (!path.startsWith("/")) {
    return path;
  }
  return `${basePath}${path}`;
}
