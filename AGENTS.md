<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

Below is a paste-ready `AGENTS.md` you can put at the root of your portfolio repo.

## Project Context

This is a personal portfolio website and blog intended to be deployed as a static site through GitHub Pages.

The site may include:

- A homepage / landing page
- Portfolio project cards
- Blog posts rendered from local data files
- Markdown-like blog content
- Images and static assets
- Links to GitHub, papers, external demos, and writeups
- Possible Three.js / 3D visuals
- Possible contact links, but no backend unless explicitly added

The project was partially vibe-coded, so changes should prioritize correctness, maintainability, security, and bundle hygiene over adding new features.

## Main Goals

When working on this codebase, prioritize:

1. Security hardening
2. Removing unnecessary bloat
3. Fixing fragile or inconsistent rendering
4. Keeping the site fast and deployable on GitHub Pages
5. Preserving the current visual design unless a change is necessary
6. Avoiding unnecessary dependencies

## Deployment Assumptions

This site is deployed as a static site through GitHub Pages.

Assume:
- There is no trusted backend
- Environment variables are not secret once bundled into frontend code
- Client-side code is public
- Anything in `src`, `public`, or the final build can be inspected
- Contact forms cannot securely send email without a trusted backend or third-party form service
- API keys must not be exposed in frontend code
- User input should not be trusted, even in a static site

## Security Rules

### Secrets and Credentials

Never commit or expose:
- API keys
- GitHub tokens
- Email service private keys
- OAuth client secrets
- Database URLs
- Private URLs
- Personal phone numbers or addresses
- `.env` files containing secrets

Check for hardcoded secrets in:
- `src/`
- `public/`
- `.env*`
- config files
- markdown/blog content
- build output
- Git history if necessary

If a secret is found, remove it and tell the user it should be rotated.

### Static Site Safety

Do not add server-only logic or fake security to the frontend.
Do not claim that frontend-only code can safely:
- Hide secrets
- Authenticate privileged actions
- Send private emails directly
- Protect private files
- Store sensitive user data securely

### XSS Prevention

Be very careful with blog rendering, markdown rendering, and any dynamic HTML.
Avoid:
- `dangerouslySetInnerHTML`
- Raw HTML injection
- Rendering unsanitized markdown
- Rendering user-controlled URLs without validation

If markdown rendering is used:
- Prefer a trusted markdown renderer such as `react-markdown`
- Disable raw HTML unless absolutely necessary
- If raw HTML is needed, sanitize it with a library such as `DOMPurify`
- Validate image URLs and links
- Use safe defaults for external links

External links should use:
```tsx
target="_blank"
rel="noopener noreferrer"
````

Never blindly render blog content as HTML.

### URL and Link Safety

For links in project cards, blog posts, and buttons:

* Ensure links are valid
* Avoid `javascript:` URLs
* Avoid suspicious redirects
* Use explicit labels for external links
* Prefer HTTPS links
* Add `rel="noopener noreferrer"` for external links opening in a new tab

### Image Safety

Images should be local when possible.

For local images:

* Store them in a clear static assets directory
* Use predictable paths
* Avoid giant uncompressed files
* Avoid filenames that break routing or imports
* Prefer lowercase, hyphenated filenames when practical

For remote images:

* Avoid hotlinking unreliable sources
* Prefer stable sources or local copies
* Do not load images from suspicious domains

### Contact Form Safety

If the site has a contact form, audit whether it actually sends email.

For GitHub Pages, acceptable options are:

* `mailto:` link
* Formspree / EmailJS / Basin / similar form service
* A serverless backend
* A separate backend API

Do not expose private email API credentials in the frontend.

If using EmailJS or similar:

* Confirm only public keys are exposed
* Add rate limiting / spam protection if the provider supports it
* Avoid collecting sensitive information
* Add basic validation

### Dependency Safety

Audit all dependencies.

For every dependency, ask:

* Is it still used?
* Is it necessary?
* Is there a smaller alternative?
* Is it maintained?
* Does it significantly increase bundle size?
* Does it introduce security warnings?

Remove unused dependencies.

Run:

```bash
npm audit
npm outdated
npm ls
```

Only apply dependency updates that are compatible with the app.

Do not blindly run force fixes such as:

```bash
npm audit fix --force
```

unless the resulting breaking changes are reviewed and tested.

### Bundle Size and Bloat

Look for:

* Unused components
* Unused imports
* Dead pages
* Large dependencies used for tiny features
* Large image files
* Duplicate icon libraries
* Unused CSS
* Unused animation libraries
* Heavy 3D assets
* Unnecessary runtime markdown processing

If a large library is only used once, consider replacing it with simpler code.

For Three.js or 3D graphics:

* Lazy load the 3D section if possible
* Avoid blocking initial page load
* Provide fallback behavior
* Respect reduced-motion preferences
* Ensure it works on mobile

### Performance

The site should be fast on initial load.

Prioritize:

* Lazy loading images
* Compressing large images
* Avoiding unnecessary JavaScript
* Avoiding massive blog content in the initial bundle if possible
* Code splitting where practical
* Removing console spam
* Avoiding layout shift
* Testing production builds, not just dev mode

Run:

```bash
npm run build
npm run preview
```

Check the production build before deployment.

### Accessibility

Do not sacrifice accessibility for visual design.

Check:

* Semantic HTML
* Button vs link usage
* Keyboard navigation
* Color contrast
* Alt text for meaningful images
* Empty alt text for decorative images
* Focus states
* Reduced-motion handling
* Headings in logical order

### GitHub Pages Compatibility

Make sure routing and assets work on GitHub Pages.

Check:

* Correct `base` config in Vite if deploying to a repo subpath
* No broken image paths
* No broken blog routes on refresh
* No reliance on server-side routing
* No Node-only APIs in frontend code
* No filesystem reads at runtime
* Build output goes to the expected directory

For Vite, verify `vite.config.ts` has the correct base:

```ts
base: "/REPO_NAME/"
```

if deploying to:

```txt
https://USERNAME.github.io/REPO_NAME/
```

Use:

```ts
base: "/"
```

only if deploying to:

```txt
https://USERNAME.github.io/
```

### Code Quality

Prefer simple, readable code.

Avoid:

* Over-engineering
* Unnecessary abstraction
* Huge components
* Repeated logic
* Magic strings scattered everywhere
* Unused state
* Unused props
* Console logs in production
* TypeScript `any` unless justified

Keep components small and understandable.

### Blog Content Rules

Blog posts may be stored as local TypeScript objects.

Each blog post should include:

```ts
{
  id: string;
  title: string;
  date: string;
  readTime: string;
  excerpt: string;
  content: string;
  tags: string[];
  featured?: boolean;
}
```

Audit blog rendering for:

* Broken markdown
* Broken images
* Unescaped characters
* Template literal issues
* Incorrect asset paths
* Duplicate IDs
* Missing fields
* Invalid dates
* Large images
* Unsafe raw HTML

If content is inside template literals, escape backticks or avoid using unescaped backticks inside blog content.

### TypeScript and Linting

Prefer TypeScript-safe fixes.

Run:

```bash
npm run build
```

If linting exists, run:

```bash
npm run lint
```

If there is no linting, suggest adding basic ESLint only if it does not derail the deployment.

### What Not To Do

Do not:

* Rewrite the whole site unnecessarily
* Change the visual style without asking
* Add a backend unless explicitly requested
* Add paid services unless clearly optional
* Add authentication
* Add analytics by default
* Add cookies or tracking by default
* Add complex state management
* Replace the tech stack
* Introduce new dependencies casually
* Hide build errors
* Silence TypeScript errors instead of fixing them

## Audit Workflow

When asked to audit the site, follow this order:

1. Inspect project structure
2. Identify framework, build tool, and deployment target
3. Check `package.json`
4. Check dependencies and scripts
5. Check Vite / deployment config
6. Check routing
7. Check blog rendering pipeline
8. Search for dangerous rendering patterns
9. Search for secrets and exposed keys
10. Check contact form behavior
11. Check image and asset paths
12. Check external links
13. Check performance bottlenecks
14. Run build
15. Fix errors
16. Remove unused code and dependencies
17. Re-run build
18. Summarize all changes clearly

## Commands To Use

Use these commands when relevant:

```bash
npm install
npm run build
npm run preview
npm audit
npm outdated
npm ls
grep -R "dangerouslySetInnerHTML" src
grep -R "apiKey\|secret\|token\|password\|PRIVATE\|EMAIL" .
grep -R "console.log" src
```

If using ripgrep:

```bash
rg "dangerouslySetInnerHTML|innerHTML|eval|Function\\("
rg "apiKey|secret|token|password|PRIVATE|EMAIL"
rg "console\\.log|debugger"
```

## Expected Output From an Audit

When completing an audit, provide:

1. Critical security issues
2. Medium-risk issues
3. Low-risk cleanup
4. Performance / bloat findings
5. GitHub Pages deployment risks
6. Exact files changed
7. Commands run
8. Final build status
9. Remaining recommendations

Use this format:

## Audit Summary
### Critical Issues
### Medium Issues
### Low-Risk Cleanup
### Bloat / Performance
### GitHub Pages Readiness
### Files Changed
### Commands Run
### Final Status

## Definition of Done

The site is ready for GitHub Pages deployment when:
* `npm run build` passes
* Production preview works
* No hardcoded secrets exist
* Blog posts render consistently
* Images load correctly
* External links are safe
* No unsafe raw HTML is rendered
* Contact form behavior is understood and safe
* Unused dependencies are removed where practical
* Bundle size is reasonable
* The site still looks visually consistent


