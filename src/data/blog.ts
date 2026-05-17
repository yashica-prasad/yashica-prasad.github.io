export interface BlogPost {
  id: string;
  title: string;
  date: string;
  readTime: string;
  excerpt: string;
  content: string;
  tags: string[];
  featured?: boolean;
}

export const blogPosts: BlogPost[] = [
  {
    id: "strange-attractors-python",
    title: "Generating Strange Attractors with Python",
    date: "2025-08-21",
    readTime: "6 min read",
    excerpt: "A small generative math project exploring chaotic systems, Lyapunov exponents, and visualizing strange attractors with Python.",
    tags: ["mini projects", "Python", "Math"],
    featured: true,
    content: `

# Generating Strange Attractors with Python

This mini project started as a simple question: can I randomly generate a system of equations that produces visually interesting chaotic behavior?

The output is generative art, but the interesting part of the project is really the logic behind deciding whether a system is actually chaotic enough to keep. The Python script searches through randomly generated quadratic maps, simulates their trajectories, tests whether the behavior looks like a bounded chaotic attractor, and then renders the accepted results as scatter plots.

## What is a Strange Attractor?

An attractor is a set of states that a system tends to move toward over time. In a simple system, that might be a single fixed point. For example, a value might repeatedly shrink until it settles at zero. In another system, the motion might fall into a repeating loop.

A strange attractor is more interesting. It is an attractor with chaotic behavior: the trajectory stays bounded, but it does not settle into a simple point or cycle. Instead, it keeps moving through a structured region in a way that appears unpredictable at small scales.

That combination is what makes strange attractors visually compelling. They are not random noise, because there is structure. But they are also not simple curves, because the path keeps folding, stretching, and revisiting the same region in complicated ways.

## The System I Generated

The script uses a two-dimensional quadratic map. At each step, the current point (x, y) is transformed into a new point:

\`\`\`text
x_next = a0 + a1*x + a2*x^2 + a3*y + a4*y^2 + a5*x*y
y_next = a6 + a7*x + a8*x^2 + a9*y + a10*y^2 + a11*x*y
\`\`\`

The coefficients are sampled randomly. Each sampled coefficient vector defines a different dynamical system.

The linear terms help move and rotate the trajectory, while the quadratic terms introduce the nonlinear behavior needed for more complex patterns. Without enough nonlinearity, the system usually collapses into a boring fixed point, a simple loop, or diverges completely.

So the search problem became: generate candidate systems, simulate them, and only keep the ones that behave like strange attractors.

## Why the Lyapunov Exponent Matters

The Lyapunov exponent measures how quickly two nearby points separate as the system evolves.

For this project, I track two almost-identical starting points. If the system is chaotic, those points should eventually drift apart, even though they started very close together. That sensitivity to initial conditions is one of the defining traits of chaos.

A positive Lyapunov exponent suggests that nearby trajectories separate over time. A negative value suggests that trajectories collapse together. For strange attractors, I wanted systems that were sensitive enough to be chaotic, but still bounded enough to remain drawable.

My first version used a rough Lyapunov-style score as the main acceptance test. That helped filter out some boring systems, but it was not enough on its own. Some systems could satisfy the score while still producing weak, uninteresting, or barely spread-out shapes.

## The Initial Chaos Check

The early version of the script mostly asked one question:

> Does this generated system appear to have enough divergence between nearby trajectories?

That was a decent starting point because chaos depends on sensitivity to initial conditions. But visually, it was too permissive. A system could show some local stretching without producing a rich attractor.

The missing piece was that a good strange attractor needs more than divergence. It should also:

1. Stay bounded instead of exploding toward infinity
2. Avoid collapsing into a fixed point
3. Avoid becoming a tiny repetitive loop
4. Spread across enough of the plane to form an interesting structure

This changed the project from just checking for chaos to checking for bounded, structured chaos.

## The Improved Acceptance Criteria

The later version uses several checks together.

First, the script ignores the initial burn-in period. This gives the system time to move past its transient behavior before measuring the final trajectory. After burn-in, it evaluates the part of the trajectory that represents the actual attractor.

Then it checks for:

- **Positive average Lyapunov behavior**: nearby points should separate over time
- **Boundedness**: the orbit should stay within a reasonable range instead of blowing up
- **Spatial span**: the points should cover a non-trivial width and height
- **Standard deviation**: the trajectory should not collapse into a tiny cluster
- **Grid occupancy**: the points should fill enough cells in a 2D grid to reject simple loops

The grid occupancy check was especially useful. It gives a simple way to ask whether the attractor is actually using the plane, rather than just tracing a small repetitive path.

## Improving the Generator

I also modified the parameter generation itself.

Instead of sampling every coefficient in a totally uniform way, the generator biases the nonlinear terms more strongly. The terms involving \\(x^2\\), \\(y^2\\), and \\(xy\\) are where much of the interesting folding and stretching behavior comes from, so encouraging those terms increases the chance of finding chaotic systems.

The script also occasionally perturbs known chaotic seed vectors instead of starting completely from scratch. This makes the search less blind while still leaving room for variation.

The result is a generator that finds interesting attractors more reliably, instead of wasting most attempts on systems that immediately diverge, converge, or produce simple loops.

## Rendering the Attractor

Once a candidate passes the checks, the script plots the post-burn-in trajectory.

Each point is drawn very small, and the color changes gradually along the path. This makes the final image show both the structure of the attractor and the direction of the trajectory through time.

The final output is part math experiment and part generative art: the equations define the motion, the chaos checks decide what counts as interesting, and the visualization turns the trajectory into an image.

## Takeaways

This project was a good reminder that generating interesting output is often more about defining good constraints than writing complicated rendering code.

The plotting step is simple. The harder part is deciding what to accept. A strange attractor needs to be chaotic, but not unbounded. It needs structure, but not repetition. It needs sensitivity, but not pure noise.

By combining Lyapunov-style divergence, boundedness, spread, and occupancy checks, the script became much better at finding systems that produce visually rich chaotic behavior.

## Resources

The base generator logic and idea was inspired by the following videos:

[Finding Strange Attractors Part-1](https://youtu.be/AzdpM-vfUCQ?si=z82pUxgZ38bLYxAr)
[Finding Strange Attractors Part-2](https://youtu.be/sGdFR9cpE6A?si=VcKeWHSuBgWzSB86)
    `
  },
  {
    id: "speed-reader-mvp",
    title: "Building a Terminal Speed Reader MVP",
    date: "2026-04-23",
    readTime: "6 min read",
    tags: ["mini projects", "Python", "CLI"],
    excerpt:
      "A small Python speed reader MVP designed as a stepping stone toward a larger tool for processing structured research papers in PDF format.",
    content: `

  # Building a Terminal Speed Reader MVP
  
  This mini project started as a practical first step toward a larger idea: a speed reader built specifically for structured research papers. The eventual goal is not just to flash words on a screen, but to help process dense PDFs with sections, abstracts, equations, citations, figures, and references. Before getting there, I wanted to build the simplest useful version of the core reading interaction.
  
  The result was a terminal-based Python MVP that reads a plain text file, splits it into words, and displays those words one at a time at a user-selected reading speed.
  
  ## Why Start With a Text File?
  
  Research papers are usually distributed as PDFs, but PDF parsing adds a lot of complexity early on. Text extraction can introduce layout issues, broken lines, missing symbols, weird spacing, headers, footers, and citation artifacts. If I started there immediately, I would be debugging document structure before proving the actual reading interface.
  
  So this MVP intentionally limits input to UTF-8 .txt files. That constraint let me focus on the core question: can I build a smooth word-by-word reading loop with basic controls?
  
  The input pipeline is intentionally simple:
  
  1. Ask the user for a file path.
  2. Expand the path using Python's pathlib.
  3. Reject missing files.
  4. Reject non-.txt files.
  5. Read the file as UTF-8 text.
  6. Split the text into words.
  
  That gives the program a clean list of tokens to display.
  
  ## Core Reading Loop
  
  The main feature is the display loop. The user enters a reading speed in words per minute, and the program converts that into a delay:
  
  \`delay = 60.0 / current_wpm\`
  
  From there, the reader advances through the word list based on elapsed time. Instead of relying on a blocking sleep for the full delay, the program uses \`time.monotonic()\` to track when enough time has passed to move to the next word. This makes the loop more responsive to keyboard input.
  
  The display itself uses Python's \`curses\` library. This lets the program clear and redraw the terminal window without printing a new line for every word. Each word is centered in the terminal so the reading experience feels closer to a focused reader than a normal command-line script.
  
  ## Controls
  
  I also wanted the MVP to feel interactive, not like a fixed animation that the user has to restart every time something feels wrong.
  
  The current controls are:
  
  - Space: pause or resume
  - Up arrow: increase speed by 5%
  - Down arrow: decrease speed by 5%
  
  These controls are small, but they make the tool much more usable. Reading speed is not constant across all text. A paragraph of simple prose can be read quickly, while a dense technical explanation may need a slower pace. Being able to adjust speed mid-session is important for the larger research-paper version.
  
  ## What This MVP Proves
  
  This project is small, but it validates a few important pieces:
  
  First, the file input and tokenization flow works. The program can load user-provided text, validate the file type, and convert it into a stream of words.
  
  Second, the timing model works. WPM maps cleanly to seconds-per-word, and the loop can advance through the document at the selected pace.
  
  Third, the terminal interface is good enough for testing. It supports centered display, live controls, pausing, and speed changes without needing a GUI yet.
  
  Most importantly, the MVP separates the reading experience from the document parsing problem. That makes the next stage easier to reason about.
  
  ## Design Tradeoffs
  
  The biggest tradeoff is that this version ignores structure. It treats all words the same, whether they come from a title, paragraph, citation, equation, or section heading. That is fine for a first MVP, but it is not enough for research papers.
  
  A real research-paper reader should probably treat different parts of a paper differently. For example, an abstract might be read continuously, while equations or algorithm blocks might need to pause automatically. Citations and references may need to be skipped, collapsed, or shown differently. Figures and tables cannot be handled as simple word streams at all.
  
  This MVP also uses basic whitespace splitting. That works for simple text, but later versions will need more careful tokenization. Scientific writing includes punctuation-heavy terms, inline math, abbreviations, citations, and formatting artifacts from PDF extraction.
  
  ## Next Steps
  
  The next major step is PDF ingestion. I want to experiment with extracting structured text from research papers while preserving section information. Instead of turning the whole paper into one long stream, the program should understand components like:
  
  - Title
  - Abstract
  - Section headings
  - Body paragraphs
  - Equations
  - Captions
  - References
  
  Once that structure exists, the reader can become more intelligent. It could let the user choose whether to read only the abstract, skip references, slow down for technical sections, or jump between sections.
  
  I also want to improve the actual reading model. Some words may deserve longer display times based on length, punctuation, or complexity. Eventually, the tool could use adaptive pacing rather than a fixed WPM for every word.
  
  ## Reflection
  
  This MVP is intentionally narrow, but that is what made it useful. It gave me a working foundation without getting stuck in PDF parsing too early. The project now has a clear path forward: keep the word-by-word reading interface, then replace the simple .txt input layer with a structured PDF processing pipeline.
  
  For a larger research-paper speed reader, the hard part is not just displaying words quickly. It is deciding what text matters, what structure should be preserved, and when the reader should slow down instead of speed up. This MVP is the first step toward answering those questions.
  `,
  },
  {
    id: "poctf-2024-put-down-thy-wrath",
    title: "POCTF 2024 Writeup: Put Down Thy Wrath",
    date: "2024-09-28",
    readTime: "6 min read",
    excerpt: "A short writeup for the Crypto 300 challenge Put Down Thy Wrath from Pointer Overflow CTF 2024.",
    tags: ["CTF", "Cryptography", "Writeup"],
    content: `

  ## POCTF 2024: Put Down Thy Wrath
  
  This is a writeup for the Crypto 300 challenge **Put Down Thy Wrath** from Pointer Overflow CTF 2024.
  
  ### The Challenge
  
  In this challenge, we were given a public key and an encrypted message that was encrypted using a flawed implementation of homomorphic encryption. The goal was to analyze the encryption algorithm, identify the weakness, and use it to decrypt the message.
  
  Encrypted message:
  
      C: 79,74,3f,0f,5a,27,21,3a,36,48,64,51,64,0f,79,7e,1a,64,64,03,33,0f,64,64,57,21,27,3f,0f,2c,4a,3a,3f,24,27,3f,0f,7e,64,79,1a,64,2c
  
  Public key:
  
      3233
  
  The challenge also linked to the homomorphic encryption implementation.
  
  ### Solution
  
  The solution ended up being much simpler than expected because of an issue with the challenge deployment. Instead of linking to the final version of the challenge file, the challenge linked to a testing script.
  
  Because of that, the answer was effectively exposed through the provided code rather than requiring the intended full cryptanalysis.
  
  ### Flag
  
      poctf{uwsp_T3mp357_4nd_7urnm01l}
  `
  },
  {
    id: "poctf-2024-my-name-is-human",
    title: "POCTF 2024 Writeup: My Name is Human",
    date: "2024-09-23",
    readTime: "6 min read",
    excerpt: "A misc challenge writeup involving a crossword-style puzzle and flag reconstruction.",
    tags: ["CTF", "Misc", "Writeup"],
    content: `

  ## POCTF 2024: My Name is Human
  
  This is a writeup for the Misc 200 challenge **My Name is Human** from Pointer Overflow CTF 2024.
  
  ### The Challenge
  
  The challenge provided a crossword-style puzzle and the following flag format:
  
      poctf{uwsp_[8][6][3]_[5][7][1][2][4]}
  
  ![Crossword puzzle](/blog-images/image-unavailable.svg)
  
  ### Solution
  
  Working through the crossword gave us the following answers:
  
  1. Vexillology — the study of flags
  2. 0xDEADBEEF
  3. Yellow — from yellow-bellied coward / xanthrophobia
  4. Crush
  5. Havoc — part of a quote from Shakespeare's Julius Caesar
  6. Renovate
  7. 7H
  8. Cry
  
  Plugging these values into the given flag format produced:
  
      poctf{uwsp_cryrenovateyellow_havoc4hvexillology0xdeadbeefcrush}
  
  Taking the first letters gave the actual flag.
  
  ### Flag
  
      poctf{uwsp_cry_h4v0c}
  `
  },
  {
    id: "poctf-2024-a-tangle-a-jingle",
    title: "POCTF 2024 Writeup: A Tangle a Jingle",
    date: "2024-09-24",
    readTime: "6 min read",
    excerpt: "An OSINT challenge writeup focused on locating a real-world image and using a nearby phone number as a password.",
    tags: ["CTF", "OSINT", "Writeup"],
    content: `
  ## POCTF 2024: A Tangle a Jingle
  
  This is a writeup for the OSINT 200 challenge **A Tangle a Jingle** from Pointer Overflow CTF 2024.
  
  ### The Challenge
  
  The challenge gave us an image from a social media post and asked us to identify the location where the photo was taken. Once we found the location, we needed to find a business just out of frame, across the street from the building on the corner, to the left of the bollards.
  
  The phone number on that business's sign was the password to the provided archive.
  
  ![Street image from the challenge](/blog-images/image-unavailable.svg)
  
  ### Solution
  
  I could not directly save the original image, so I worked from a screenshot. Using Google Image Search, I found a Reddit post with the same image. Reddit reduced the image quality unless logged in, so I created an account to view the higher-quality version.
  
  With the clearer image, we were able to read the phone number on the red storefront. Looking up the phone number led us to the business address in the UK.
  
  From Google Street View, the phone number on the shopfront to the left was visible:
  
  ![Phone number on shopfront](/blog-images/image-unavailable.svg)
  
  Using that phone number as the password to the zip file revealed the flag.
  
  ### Flag
  
      poctf{uwsp_1_h4v3_4_dr34m}
  `
  },
  {
    id: "poctf-2024-understanding-nonsense",
    title: "POCTF 2024 Writeup: Understanding Nonsense",
    date: "2024-09-26",
    readTime: "6 min read",
    excerpt: "A reverse engineering challenge writeup where the flag could be recovered by completing the unfinished decode logic.",
    tags: ["CTF", "Reverse Engineering", "Writeup"],
    content: `

  ## POCTF 2024: Understanding Nonsense
  
  This is a writeup for the Reverse 100 challenge **Understanding Nonsense** from Pointer Overflow CTF 2024.
  
  ### The Challenge
  
  The challenge gave us an unfinished reverse engineering problem. The provided program already contained the encoded flag and some helper functions, but the decode function was not completed.
  
  The prompt suggested that the decode logic had been started but abandoned, and that finishing it would reveal the flag.
  
  ### Solution
  
  I did not need to spend much time analyzing the compiled binary because the source code already had enough information.
  
  Inside the main function, the program defined an encoded flag and a seed:
  
      unsigned char encoded_flag[] = {
          0x8e, 0x79, 0xa9, 0x9c, 0xac, 0xd5, 0xc5, 0xc7,
          0x91, 0x7a, 0xa5, 0x8a, 0xb8, 0x8d, 0xc6, 0x81,
          0x55, 0x83, 0xa5, 0x59, 0x7b, 0xb9, 0x87, 0xb8,
          0x51, 0x69, 0x7b, 0x58, 0xbb, 0x8b, 0xcd
      };
  
      unsigned int seed = 88974713;
  
  Above main, there was a function called reverse_modify_flag. The comment in main indicated that the reverse modification needed to be applied 10 times.
  
  I added the following loop:
  
      for (int i = 0; i < 10; i++) {
          reverse_modify_flag(encoded_flag, seed);
      }
  
  Running the program produced this hex string:
  
      706f6374667b757773705f627233763137795f31355f3768335f353075317d
  
  Converting the hex in CyberChef gave the final flag.
  
  ### Flag
  
      poctf{uwsp_br3v17y_15_7h3_50u1}
  `
  },
  {
    id: "poctf-2024-things-said-and-unsaid",
    title: "POCTF 2024 Writeup: Things Said and Unsaid",
    date: "2024-09-27",
    readTime: "5 min read",
    excerpt: "A steganography challenge writeup involving strings, binwalk, and a hidden password-protected archive.",
    tags: ["CTF", "Steganography", "Writeup"],
    content: `

  ## POCTF 2024: Things Said and Unsaid
  
  This is a writeup for the Stego 100 challenge **Things Said and Unsaid** from Pointer Overflow CTF 2024.
  
  ### The Challenge
  
  The challenge provided an image file.
  
  ![Challenge image](/blog-images/image-unavailable.svg)
  
  ### Solution
  
  This was a straightforward steganography challenge. I solved it with the following steps:
  
  1. Download the image file.
  2. Open the image in a hex editor or run the strings command on it.
  3. At the end of the file, I found the text:
  
          probably_improbable
  
  4. I then extracted the image contents with binwalk:
  
          binwalk -e Stego100-3.jpeg
  
  5. Inside the extracted folder, there was a zip file.
  6. I unzipped the archive using the password:
  
          probably_improbable
  
  That revealed the flag.
  
  ### Flag
  
      poctf{uwsp_w3_4r3_such_57uff}
  `
  },
  {
    id: "poctf-2024-the-way-out-is-through",
    title: "POCTF 2024 Writeup: The Way Out is Through",
    date: "2024-09-26",
    readTime: "6 min read",
    excerpt: "A web challenge writeup where the flag was split across JavaScript, Base64, hex, and a cookie value.",
    tags: ["CTF", "Web Security", "Writeup"],
    content: `
  ## POCTF 2024: The Way Out is Through
  
  This is a writeup for the Web 100 challenge **The Way Out is Through** from Pointer Overflow CTF 2024.
  
  ### The Challenge
  
  The challenge presented a simulated web-based cybersecurity training course, styled like a security awareness training page. The twist was that the training site itself was vulnerable.
  
  The goal was to inspect the page and recover the flag.
  
  ### Breakdown
  
  Opening the challenge link redirected to a page displaying a Not Found error.
  
  ![Not Found page](/blog-images/image-unavailable.svg)
  
  At first, there was nothing obvious on the page. I decided to view the page source and found something interesting inside the script tags.
  
  ### Script Contents
  
  The page contained JavaScript that split the flag into multiple parts:
  
      let part_1 = [112, 111, 99, 116].map(x => String.fromCharCode(x)).join('');
      let part_2 = atob("Znt1d3NwXw==");
      let part_3 = "document.cookie";
      let part_4 = "XzdydTdoXw==";
      let part_5_hex = [0x31, 0x35, 0x5f, 0x30, 0x75, 0x37, 0x5f, 0x37, 0x68, 0x33, 0x72, 0x33, 0x7d];
  
      console.log("The Tooth is Over There.");
      document.cookie = "\\u0037\\u0068\\u0033";
  
  ### Solution
  
  For parts 1 and 2, I copied the JavaScript into an online JS editor and printed the results to the console.
  
  Part 3 referred to the document.cookie value. When converted from Unicode escape sequences, the cookie value became:
  
      7h3
  
  Part 4 was Base64 encoded, and part 5 was represented as hex values. After decoding each piece and combining all five parts, I got the full flag.
  
  ### Flag
  
      poctf{uwsp_7h3_7ru7h_15_0u7_7h3r3}
  `
  }
];