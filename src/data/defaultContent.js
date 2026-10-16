import { withProjectDetails } from "./projectDetails.js";

export const ADMIN_DEFAULTS = {
  username: "admin",
  password: "admin123",
};

export const defaultContent = {
  site: {
    name: "Brooklyn",
    logoText: "B",
    logoImage: "/images/logo.png",
    title: "Brooklyn | Personal Portfolio",
    favicon: "/images/logo.png",
  },
  nav: {
    items: [
      { id: "home", label: "Home", href: "introduction" },
      { id: "about", label: "About", href: "profile" },
      { id: "process", label: "Process", href: "work-process" },
      { id: "portfolio", label: "Projects", href: "projects" },
      { id: "services", label: "Services", href: "services" },
    ],
    contactLabel: "Contact",
    contactHref: "contact",
  },
  hero: {
    eyebrow: "Freelance UI / UX Designer",
    greeting: "Hello, I’m",
    name: "Brooklyn Gilbert",
    description:
      "I'm a Freelance UI/UX Designer and Developer based in London, England. I strives to build immersive and beautiful web applications through carefully crafted code and user-centric design.",
    buttonText: "Say Hello!",
    buttonHref: "contact",
    image: "/images/person.png",
    stats: [
      { id: "exp", value: "15 Y.", label: "Experience" },
      { id: "projects", value: "250+", label: "Projects Completed" },
      { id: "clients", value: "58", label: "Happy Clients" },
    ],
  },
  about: {
    image: "/images/person-about.png",
    title: "I am Professional User Experience Designer",
    paragraph1:
      "I design and develop services for customers specializing creating stylish, modern websites, web services and online stores. My passion is to design digital user experiences.",
    paragraph2:
      "I design and develop services for customers specializing creating stylish, modern websites, web services.",
    primaryButton: "My Projects",
    primaryHref: "projects",
    secondaryButton: "Download CV",
    cvUrl: "#",
    socials: [
      { id: "fb", label: "Facebook", url: "https://facebook.com" },
      { id: "dribbble", label: "Dribbble", url: "https://dribbble.com" },
      { id: "ig", label: "Instagram", url: "https://instagram.com" },
      { id: "linkedin", label: "LinkedIn", url: "https://linkedin.com" },
    ],
  },
  process: {
    title: "Work Process",
    paragraph1:
      "Driven by design and powered by code, I create digital interfaces that feel intuitive and perform seamlessly. Every layout, animation, and component is crafted with intention — merging usability with visual clarity.",
    paragraph2:
      "I blend clean design with efficient code to build engaging, user-friendly web experiences that stand out.",
    steps: [
      {
        id: "research",
        number: "1",
        title: "Research",
        description:
          "Design meets function in every pixel, blending clarity with intuitive motion.",
        icon: "research",
      },
      {
        id: "analyze",
        number: "2",
        title: "Analyze",
        description:
          "Crafting clean, thoughtful interfaces where form flows seamlessly into function and clarity.",
        icon: "analyze",
      },
      {
        id: "design",
        number: "3",
        title: "Design",
        description:
          "I design seamless digital experiences with precision, purpose, and a touch of elegance.",
        icon: "design",
      },
      {
        id: "launch",
        number: "4",
        title: "Launch",
        description:
          "I craft digital products where thoughtful design meets performance-driven, responsive development.",
        icon: "launch",
      },
    ],
  },
  portfolio: {
    title: "Projects",
    subtitle:
      "Here's a selection of my recent work, showcasing my skills in creating user-centric and visually appealing interfaces.",
    moreButton: "More Project",
    moreHref: "#",
    items: [
      withProjectDetails({
        id: "p1",
        image: "/images/portfolio/card-1.png",
        category: "UI-UX DESIGN",
        title: "Product Admin Dashboard",
        description:
          "I focus on crafting smooth, responsive interfaces that balance aesthetic appeal with practical functionality.",
        linkLabel: "Case Study",
        client: "SaaS Product Team",
        year: "2024",
        role: "UI/UX Designer",
        technologies: ["Figma", "Design System", "Prototyping", "Dashboard UX"],
        gallery: ["/images/portfolio/card-1.png", "/images/portfolio/card-2.png"],
      }),
      withProjectDetails({
        id: "p2",
        image: "/images/portfolio/card-2.png",
        category: "UI-UX DESIGN",
        title: "Product Admin Dashboard",
        description:
          "Designed an intuitive dashboard for product management, emphasizing clarity and user efficiency.",
        linkLabel: "Case Study",
        client: "Operations Platform",
        year: "2024",
        role: "Product Designer",
        technologies: ["Figma", "Wireframes", "User Flows", "UI Kit"],
        gallery: ["/images/portfolio/card-2.png", "/images/portfolio/card-3.png"],
      }),
      withProjectDetails({
        id: "p3",
        image: "/images/portfolio/card-3.png",
        category: "UI-UX DESIGN",
        title: "Product Admin Dashboard",
        description:
          "Developed a modern admin panel with a focus on usability and seamless navigation for end users and so on.",
        linkLabel: "Case Study",
        client: "Analytics Startup",
        year: "2023",
        role: "UI/UX Designer",
        technologies: ["Figma", "Responsive Design", "Interaction Design"],
        gallery: ["/images/portfolio/card-3.png", "/images/portfolio/card-4.png"],
      }),
      withProjectDetails({
        id: "p4",
        image: "/images/portfolio/card-4.png",
        category: "UI-UX DESIGN",
        title: "Product Admin Dashboard",
        description:
          "Created a responsive dashboard layout that adapts smoothly across devices and screen sizes and so on.",
        linkLabel: "Case Study",
        client: "Retail Brand",
        year: "2023",
        role: "UX Designer",
        technologies: ["Figma", "Mobile-first", "Usability Testing"],
        gallery: ["/images/portfolio/card-4.png", "/images/portfolio/card-5.png"],
      }),
      withProjectDetails({
        id: "p5",
        image: "/images/portfolio/card-5.png",
        category: "UI-UX DESIGN",
        title: "Product Admin Dashboard",
        description:
          "Implemented interactive charts and widgets to visualize product data effectively for stakeholders.",
        linkLabel: "Case Study",
        client: "Data Insights Co.",
        year: "2022",
        role: "UI Designer",
        technologies: ["Figma", "Data Visualization", "Design Tokens"],
        gallery: ["/images/portfolio/card-5.png", "/images/portfolio/card-6.png"],
      }),
      withProjectDetails({
        id: "p6",
        image: "/images/portfolio/card-6.png",
        category: "UI-UX DESIGN",
        title: "Product Admin Dashboard",
        description:
          "Enhanced user experience by streamlining workflows and optimizing interface components and so on.",
        linkLabel: "Case Study",
        client: "Workflow Studio",
        year: "2022",
        role: "Product Designer",
        technologies: ["Figma", "Component Library", "Accessibility"],
        gallery: ["/images/portfolio/card-6.png", "/images/portfolio/card-1.png"],
      }),
    ],
  },
  cta: {
    title: "Do you have a Project Idea? Let's discuss your project!",
    description:
      "I'm always open to discussing new projects and creative ideas. Let's connect and build something amazing together.",
    buttonText: "Let's work Together",
    buttonHref: "contact",
  },
  services: {
    title: "What I do?",
    paragraph1:
      "I specialize in designing user experiences, crafting engaging interfaces, and building robust web applications that deliver value and usability.",
    paragraph2:
      "My approach combines creativity and technical expertise to deliver solutions that are both visually appealing and highly functional for users.",
    buttonText: "Say Hello!",
    buttonHref: "contact",
    items: [
      {
        id: "ux",
        title: "User Experience (UX)",
        description:
          "I design intuitive and enjoyable experiences by understanding user needs, conducting research, and creating wireframes and prototypes that enhance usability.",
        icon: "ux",
      },
      {
        id: "ui",
        title: "User Interface (UI)",
        description:
          "I craft visually appealing and consistent interfaces, focusing on layout, color, and typography to ensure a seamless and engaging user journey.",
        icon: "ui",
      },
      {
        id: "web",
        title: "Web Development",
        description:
          "I build responsive and high-performance web applications using modern technologies, ensuring accessibility, scalability, and maintainability.",
        icon: "web",
      },
    ],
  },
  clients: {
    title: "Happy Clients",
    subtitle:
      "I've had the pleasure of working with a diverse range of companies, from startups to established brands.",
    items: [
      { id: "c1", name: "google" },
      { id: "c2", name: "autodesk" },
      { id: "c3", name: "Linkedin" },
      { id: "c4", name: "amazon" },
      { id: "c5", name: "Mediaro" },
      { id: "c6", name: "google" },
    ],
  },
  testimonials: {
    title: "Testimonial",
    subtitle:
      "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration.",
    items: [
      {
        id: "t1",
        message:
          "Working with this team was a fantastic experience. Their attention to detail and commitment to quality exceeded our expectations.",
        quote:
          "From the initial consultation to the final delivery, every step was handled professionally. The end result was a product that not only met our needs but also impressed our stakeholders. Highly recommended!",
        name: "Esther Howard",
        role: "Managing Director, ABC Company",
      },
      {
        id: "t2",
        message:
          "Their expertise in UI/UX design helped us transform our digital presence and improve user engagement.",
        quote:
          "The team demonstrated a deep understanding of our requirements and delivered a solution that was both visually appealing and highly functional. Communication was clear throughout the project.",
        name: "Ali Haider",
        role: "COO, XYZ Company",
      },
      {
        id: "t3",
        message:
          "Professional, reliable, and creative—everything you want in a development partner.",
        quote:
          "They delivered our project on time and went above and beyond to ensure our satisfaction. The new features have made a significant difference for our users. We look forward to working together again.",
        name: "Elon Max",
        role: "Managing Director, KFC Company",
      },
    ],
  },
  contact: {
    title: "Let’s discuss your Project",
    description:
      "I'm available for freelance work. Drop me a line if you have a project you think I'd be a good fit for.",
    formTitle: "Let’s discuss your Project",
    formDescription:
      "I'm always open to discussing product design work or partnership opportunities.",
    submitText: "Submit",
    details: [
      { id: "address", icon: "location", title: "Address:", value: "New Mexico, 31134" },
      { id: "email", icon: "email", title: "My Email:", value: "mymail@mail.com" },
      { id: "phone", icon: "phone", title: "Call Me Now:", value: "00-123 00000" },
    ],
    fields: {
      name: "Name*",
      email: "Email*",
      location: "Location",
      budget: "Budget*",
      subject: "Subject*",
      message: "Message*",
    },
  },
  footer: {
    copyright: "Copyright \u00A9 {year} NEXVIA INNOVATION.",
    credit: "Developed by NEXVIA INNOVATION",
  },
};
