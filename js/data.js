/**
 * SIVASURIYA PORTFOLIO - CORE DATA ARCHITECTURE
 * Multidisciplinary Graphic Designer / Visual Designer
 * Chennai, India
 */

export const PORTFOLIO_INFO = {
  name: "SIVASURIYA",
  role: "Multidisciplinary Graphic Designer",
  location: "Chennai, India",
  phone: "9042448432",
  email: "sivax10s@gmail.com",
  status: "AVAILABLE FOR SELECT COMMISSIONS",
  disciplinesText: "Branding / Graphic Design / Digital / UI/UX / Motion / 3D / Image Making / Art Direction",
  intro: "I create visual identities, campaigns, digital experiences and experimental visual systems across graphic design, branding, UI/UX, motion, 3D and image making.",
  social: {
    linkedin: "https://www.linkedin.com/in/sivax10s",
    behance: "https://www.behance.net/sivax10s",
    instagram: "https://www.instagram.com",
    dribbble: "https://dribbble.com",
    twitter: "https://x.com/SIVAx10s"
  },
  experience: {
    role: "FREELANCE GRAPHIC DESIGNER",
    type: "Self-Employed / Independent Designer",
    location: "Chennai, India",
    period: "2024 – Present",
    image: "assets/freelance/FREELANCE_HERO_PORTRAIT.jpg",
    imageAlt: "Sivasuriya — Multidisciplinary Visual Designer",
    imageCaption: "FREELANCE GRAPHIC DESIGNER / INDEPENDENT PRACTICE",
    collateralImage: "assets/freelance/FREELANCE_IMAGE.png",
    collateralCaption: "STUDIO ARTIFACTS / FREELANCE GRAPHIC DESIGN COLLATERAL"
  }
};

/* --------------------------------------------------------------------------
   05 — PROFESSIONAL EXPERIENCE TIMELINE (STRICT 4 ENTRIES)
   -------------------------------------------------------------------------- */
export const EXPERIENCES = [
  {
    id: "exp-01",
    number: "01",
    year: "2024",
    role: "FREELANCE GRAPHIC DESIGNER",
    type: "Independent Freelance",
    category: "GRAPHIC DESIGN / VISUAL COMMUNICATION",
    description: "Graphic design and visual communication across selected freelance projects.",
    focus: [
      "Graphic Design",
      "Visual Communication",
      "Branding",
      "Campaign Design",
      "Print & Digital Design"
    ],
    tools: ["Adobe Illustrator", "Adobe Photoshop", "Adobe InDesign", "Figma"],
    previewImage: "assets/freelance/FREELANCE_HERO_PORTRAIT.jpg",
    previewAlt: "Sivasuriya — Freelance Graphic Designer",
    previewCaption: "INDEPENDENT PRACTICE · FREELANCE GRAPHIC DESIGN (2024)"
  },
  {
    id: "exp-02",
    number: "02",
    year: "2025",
    role: "UI/UX DESIGNER",
    type: "Independent / Selected Projects",
    category: "INTERFACE ARCHITECTURE & UX SYSTEMS",
    description: "Digital interface architectures, modular UI systems, wireframe prototypes, and design systems across selected client projects.",
    focus: [
      "Interface Design",
      "UX Systems",
      "Wireframes",
      "Prototyping",
      "Design Systems"
    ],
    tools: ["Figma", "Design Systems", "Prototyping", "Design Architecture"],
    previewImage: "assets/projects/ui/arimm/ARIMM (1).jpeg",
    previewAlt: "UI/UX Systems & Interface Prototypes",
    previewCaption: "DIGITAL INTERACTION SYSTEMS · ARIMM / CALOTT / PITSO (2025)"
  },
  {
    id: "exp-03",
    number: "03",
    year: "2025",
    role: "3D DESIGNER",
    type: "Independent / Selected Projects",
    category: "DIMENSIONAL FORM & SPATIAL RENDERING",
    description: "Dimensional visual modeling, material shaders, photographic lighting, and real-time 3D asset optimization.",
    focus: [
      "3D Modeling",
      "Materials",
      "Lighting",
      "Rendering",
      "3D Visual Experiments"
    ],
    tools: ["Blender", "Three.js", "glTF / WebGL", "Material Shaders"],
    previewImage: "assets/3d/EARTH3D.png",
    previewAlt: "3D Spatial Modeling & Interactive Render",
    previewCaption: "DIMENSIONAL FORM & SPATIAL RENDERING · EARTH 3D (2025)"
  },
  {
    id: "exp-04",
    number: "04",
    year: "2026",
    role: "VIDEO EDITOR",
    type: "Independent / Selected Projects",
    category: "TEMPORAL EDITING & POST-PRODUCTION",
    description: "Dynamic video editing, temporal visual pacing, motion transitions, color correction, and visual storytelling.",
    focus: [
      "Video Editing",
      "Motion-Based Editing",
      "Transitions",
      "Color Correction",
      "Visual Storytelling"
    ],
    tools: ["Adobe Premiere Pro", "After Effects", "DaVinci Resolve"],
    previewImage: "assets/projects/graphic/mus26/MUS26.jpeg",
    previewAlt: "Temporal Video Editing & Motion Dynamics",
    previewCaption: "TEMPORAL EDITING & POST-PRODUCTION · VIDEO & MOTION (2025)"
  }
];

export const DISCIPLINES = [
  {
    id: "branding",
    number: "01",
    name: "BRANDING",
    kicker: "IDENTITY / SYSTEM / CULTURE",
    description: "Building visual identities that extend beyond the logo.",
    detail: "Brand identity, logos, visual systems, packaging, brand campaigns, and cohesive spatial brand ecosystems."
  },
  {
    id: "graphic-design",
    number: "02",
    name: "GRAPHIC DESIGN",
    kicker: "TYPE / IMAGE / COMPOSITION",
    description: "Graphic systems built through typography, imagery and visual rhythm.",
    detail: "Typography, editorial graphics, advertising, social graphics, visual compositions, and layout architecture."
  },
  {
    id: "poster-print",
    number: "03",
    name: "POSTER & PRINT",
    kicker: "PRINT / CAMPAIGN / CULTURE",
    description: "Graphic communication designed to exist physically.",
    detail: "Film posters, event posters, campaigns, brochures, publications, and physical print systems."
  },
  {
    id: "digital-design",
    number: "04",
    name: "DIGITAL DESIGN",
    kicker: "SCREEN / SYSTEM / EXPERIENCE",
    description: "Visual identities translated into digital environments.",
    detail: "Digital campaigns, social media systems, web graphics, screen environments, and digital brand experiences."
  },
  {
    id: "ui-ux",
    number: "05",
    name: "UI/UX DESIGN",
    kicker: "INTERFACE / FLOW / SYSTEM",
    description: "Interfaces designed around clarity, interaction and visual language.",
    detail: "Web UI, mobile apps, dashboards, UX flows, prototypes, design systems, and in-depth case studies."
  },
  {
    id: "motion",
    number: "06",
    name: "MOTION DESIGN",
    kicker: "TIME / RHYTHM / TRANSITION",
    description: "Visual systems explored through movement and interaction.",
    detail: "Motion graphics, kinetic typography, title sequences, logo animation, advertising, and UI motion studies."
  },
  {
    id: "3d-design",
    number: "07",
    name: "3D DESIGN",
    kicker: "SPACE / FORM / MATERIAL",
    description: "Objects and environments built in three dimensions.",
    detail: "3D modeling, product visualization, environments, 3D typography, 3D branding, and interactive WebGL assets."
  },
  {
    id: "image-making",
    number: "08",
    name: "IMAGE MAKING",
    kicker: "IMAGE / COMPOSITION / EXPERIMENT",
    description: "Constructed imagery combining digital techniques and visual experimentation.",
    detail: "Digital art, illustration, image manipulation, compositing, AI-assisted imagery, and visual experiments."
  },
  {
    id: "art-direction",
    number: "09",
    name: "ART DIRECTION",
    kicker: "CONCEPT / LANGUAGE / STORY",
    description: "Visual direction developed from concept through final execution.",
    detail: "Creative direction, campaign concepts, visual storytelling, photography direction, and editorial direction."
  },
  {
    id: "experimental-media",
    number: "10",
    name: "EXPERIMENTAL MEDIA",
    kicker: "CODE / IMAGE / INTERACTION",
    description: "Explorations beyond conventional graphic formats.",
    detail: "Generative design, creative coding, interactive art, AI experiments, installations, and audiovisual work."
  }
];

export const SERVICES = [
  {
    number: "01",
    id: "branding",
    name: "BRANDING",
    kicker: "IDENTITY / SYSTEM / CULTURE",
    description: "Building distinctive identities and visual systems for brands, products, and creative projects.",
    deliverables: [
      "Logo Architecture",
      "Identity Systems",
      "Typography Standards",
      "Art Direction",
      "Brand Guidelines"
    ],
    tools: ["Illustrator", "Photoshop", "Figma"],
    relatedProjects: [
      { id: "zesis", title: "ZESIS" }
    ],
    previewImage: "assets/projects/branding/zesis/ZESIS (1).jpeg",
    previewAlt: "ZESIS Brand Identity Showcase"
  },
  {
    number: "02",
    id: "graphic-design",
    name: "GRAPHIC DESIGN",
    kicker: "TYPE / IMAGE / COMPOSITION",
    description: "Graphic systems built through typography, imagery, and visual rhythm across print, digital, and architectural scales.",
    deliverables: [
      "Editorial Layouts",
      "Typographic Systems",
      "Key Visuals",
      "Posters & Billboards",
      "Marketing Collateral"
    ],
    tools: ["Illustrator", "Photoshop", "InDesign"],
    relatedProjects: [
      { id: "kijgo", title: "KIJGO" },
      { id: "mus26", title: "MUS26" },
      { id: "stdeed", title: "STDEED" }
    ],
    previewImage: "assets/projects/graphic/kijgo/Kijgo.jpeg",
    previewAlt: "KIJGO Graphic Design Showcase"
  },
  {
    number: "03",
    id: "poster-print",
    name: "POSTER & PRINT",
    kicker: "PRINT / TACTILITY / POSTER",
    description: "High-impact poster artwork, screen-printed collateral, and physical print systems engineered with material tactility.",
    deliverables: [
      "Screen-Print Posters",
      "Exhibition Print Suites",
      "Packaging Die-Lines",
      "Publication Design",
      "Print Collateral"
    ],
    tools: ["Photoshop", "Illustrator", "InDesign"],
    relatedProjects: [
      { id: "emysc", title: "EMYSC" },
      { id: "tekzzo", title: "TEKZZO" },
      { id: "tukeet", title: "TUKEET" }
    ],
    previewImage: "assets/projects/poster-print/emysc/EMYSC_01.jpeg",
    previewAlt: "EMYSC Poster & Print Showcase"
  },
  {
    number: "04",
    id: "digital-design",
    name: "DIGITAL DESIGN",
    kicker: "SCREEN / ENVIRONMENT / PIXELS",
    description: "Digital campaign visual systems, social media architectures, immersive screen graphics, and interactive online presence.",
    deliverables: [
      "Digital Campaign Suites",
      "Social Visual Systems",
      "Web Visual Content",
      "Presentation Keyframes",
      "Digital Advertising Assets"
    ],
    tools: ["Figma", "Photoshop", "Illustrator"],
    relatedProjects: [
      { id: "mkegg", title: "MKEGG" },
      { id: "atllis", title: "ATLLIS" },
      { id: "logeer", title: "LOGEER" }
    ],
    previewImage: "assets/projects/digital/mkegg/MKEGG (1).jpeg",
    previewAlt: "MKEGG Digital Design Showcase"
  },
  {
    number: "05",
    id: "ui-ux-design",
    name: "UI / UX DESIGN",
    kicker: "SYSTEM / INTERFACE / PRODUCT",
    description: "Designing digital interfaces and product systems with architectural clarity, responsive behavior, and robust usability.",
    deliverables: [
      "Interface Architecture",
      "UX Systems",
      "Wireframes",
      "Interactive Prototyping",
      "Design Systems"
    ],
    tools: ["Figma", "Design Systems", "Prototyping"],
    relatedProjects: [
      { id: "arimm", title: "ARIMM" },
      { id: "calott", title: "CALOTT" },
      { id: "pitso", title: "PITSO" },
      { id: "nkitt", title: "NKITT" }
    ],
    previewImage: "assets/projects/ui/arimm/ARIMM (1).jpeg",
    previewAlt: "ARIMM UI/UX Systems Showcase"
  },
  {
    number: "06",
    id: "motion-design",
    name: "MOTION DESIGN",
    kicker: "TIME / KINETICS / DYNAMICS",
    description: "Kinetic typography, brand motion identities, visual animation, and temporal storytelling that bring static assets to life.",
    deliverables: [
      "Kinetic Typography",
      "Motion Identity Systems",
      "Logo Idents & Title Cards",
      "Social Motion Content",
      "UI Animation Specs"
    ],
    tools: ["After Effects", "Premiere Pro"],
    relatedProjects: [
      { id: "mus26", title: "MUS26" }
    ],
    previewImage: "assets/projects/graphic/mus26/MUS26.jpeg",
    previewAlt: "MUS26 Motion Dynamics Showcase"
  },
  {
    number: "07",
    id: "3d-design",
    name: "3D DESIGN",
    kicker: "SPACE / FORM / MATERIAL",
    description: "Dimensional visual modeling, photorealistic rendering, spatial branding, and real-time WebGL asset optimization.",
    deliverables: [
      "3D Visual Artwork",
      "Optimized WebGL Assets",
      "Material & Lighting Systems",
      "Spatial Product Renders",
      "Dimensional Form Studies"
    ],
    tools: ["Blender", "Three.js", "glTF Pipeline"],
    relatedProjects: [
      { id: "earth-3d", title: "EARTH 3D" }
    ],
    previewImage: "assets/3d/EARTH3D.png",
    previewAlt: "EARTH 3D Visual Showcase"
  },
  {
    number: "08",
    id: "image-making",
    name: "IMAGE MAKING",
    kicker: "COMPOSITING / ART / TEXTURE",
    description: "Digital art, photographic compositing, expressive illustration, texture synthesis, and experimental imagery.",
    deliverables: [
      "Digital Art Pieces",
      "Photographic Composites",
      "Key Visual Collateral",
      "Texture & Lighting Artifacts",
      "Stylized Visual Treatments"
    ],
    tools: ["Photoshop", "Lightroom"],
    relatedProjects: [
      { id: "emysc", title: "EMYSC" },
      { id: "mus26", title: "MUS26" }
    ],
    previewImage: "assets/projects/poster-print/emysc/EMYSC_01.jpeg",
    previewAlt: "EMYSC Image Making Showcase"
  },
  {
    number: "09",
    id: "art-direction",
    name: "ART DIRECTION",
    kicker: "VISION / CURATION / STORY",
    description: "Comprehensive creative direction, conceptual framing, and visual stewardship across multidisciplinary campaigns.",
    deliverables: [
      "Creative Concepts",
      "Visual Direction Briefs",
      "Moodboards & Style Guides",
      "Campaign Stewardship",
      "Editorial Curation"
    ],
    tools: ["Creative Direction", "Editorial Design", "Figma"],
    relatedProjects: [
      { id: "zesis", title: "ZESIS" },
      { id: "mus26", title: "MUS26" }
    ],
    previewImage: "assets/projects/branding/zesis/ZESIS (1).jpeg",
    previewAlt: "ZESIS Art Direction Showcase"
  },
  {
    number: "10",
    id: "experimental-media",
    name: "EXPERIMENTAL MEDIA",
    kicker: "CODE / GENERATIVE / FUTURE",
    description: "Frontier visual exploration bridging creative technology, generative structures, spatial sound, and audiovisual experiments.",
    deliverables: [
      "Generative Visual Systems",
      "Interactive Web Experiences",
      "Algorithmic Art Studies",
      "Spatial Visual Experiments",
      "Code-Driven Graphics"
    ],
    tools: ["Three.js", "WebGL", "Creative Code"],
    relatedProjects: [
      { id: "mus26", title: "MUS26" },
      { id: "earth-3d", title: "EARTH 3D" }
    ],
    previewImage: "assets/projects/graphic/mus26/MUS26.jpeg",
    previewAlt: "Experimental Media Showcase"
  }
];

export const PROJECTS = [
  {
    id: "zesis",
    title: "ZESIS",
    subtitle: "Acoustic System & Brand Identity Architecture",
    primaryCategory: "BRANDING",
    secondaryCategories: ["Graphic Design", "Digital Design", "Art Direction"],
    year: "2025",
    description: "A comprehensive brand identity and architectural visual system designed for high-fidelity audio equipment and acoustic environments. Built on stark geometric precision, monochrome contrast, and industrial packaging hierarchy.",
    visualSystem: "Geometric letterforms, modular typographic grids, high-density print guidelines, custom packaging die-lines, and tactile material applications.",
    tools: ["Adobe Illustrator", "Adobe Photoshop", "Figma", "Adobe InDesign"],
    heroImage: "assets/projects/branding/zesis/ZESIS (1).jpeg",
    tags: ["Brand Identity", "Packaging", "Visual System", "Typography", "Art Direction"],
    selected: true,
    aspect: "wide",
    images: [
      { src: "assets/projects/branding/zesis/ZESIS (1).jpeg", caption: "ZESIS Master Brand Mark & Primary Logotype Treatment" },
      { src: "assets/projects/branding/zesis/ZESIS (2).jpeg", caption: "Packaging Box Architecture & Label Hierarchies" },
      { src: "assets/projects/branding/zesis/ZESIS (3).jpeg", caption: "Monochrome Print Collateral & Typographic Specifications" },
      { src: "assets/projects/branding/zesis/ZESIS (4).jpeg", caption: "Acoustic Hardware Enclosure Branding" },
      { src: "assets/projects/branding/zesis/ZESIS (5).jpeg", caption: "Visual Guidelines & Spatial Proportion Grid" },
      { src: "assets/projects/branding/zesis/ZESIS (6).jpeg", caption: "Digital Campaign Key Visual" },
      { src: "assets/projects/branding/zesis/ZESIS (7).jpeg", caption: "Minimalist Identity Card & Debossed Stationery" },
      { src: "assets/projects/branding/zesis/ZESIS (8).jpeg", caption: "Tactile Packaging Detail & Sealed Tape Application" },
      { src: "assets/projects/branding/zesis/ZESIS (9).jpeg", caption: "Industrial Product Tagging System" },
      { src: "assets/projects/branding/zesis/ZESIS (10).jpeg", caption: "Editorial Lookbook & Product Specifications" },
      { src: "assets/projects/branding/zesis/ZESIS (11).jpeg", caption: "Large Format Brand Exposure Billboard" },
      { src: "assets/projects/branding/zesis/ZESIS (12).jpeg", caption: "Merchandising Apparel & Silk Screen Print" },
      { src: "assets/projects/branding/zesis/ZESIS (13).jpeg", caption: "Digital Presentation Keyframe" },
      { src: "assets/projects/branding/zesis/ZESIS (14).jpeg", caption: "Complete Identity Suite Overview" }
    ],
    applications: ["Brand Identity", "Packaging Architecture", "Editorial Guidelines", "Spatial Graphics", "Digital Brand Presence"],
    caseStudyDossier: {
      overview: "ZESIS is an architectural acoustic brand identity and packaging system designed for high-fidelity monitoring equipment and spatial sound installations.",
      problem: "Traditional consumer audio branding relies on hyper-commercial ornamentation, loud fluorescent accents, and transient trend motifs that fail to convey industrial precision or acoustic integrity. The design challenge was to construct a stark, timeless monochrome identity system that communicates acoustic purity, modular packaging hierarchy, and material tactility.",
      process: "Built upon a rigorous Swiss modular grid, the identity pairs a custom geometric logotype with disciplined grotesque typography and monospaced technical metadata. The chromatic system was stripped down to deep charcoal (#090A0D), titanium white (#F2F4F8), and high-density matte black to echo anodized aluminum and acoustic dampening materials. Structural packaging die-lines and debossed tactile seals were engineered with physical print specifications.",
      artifacts: [
        "Master Logotype Architecture & Monogram Seal",
        "Modular Industrial Packaging Die-Lines & Unboxing Architecture",
        "Monochrome Editorial Brand Guidelines & Spatial Proportions",
        "Large-Format Architectural Billboards & Spatial Signage",
        "Tactile Hardware Tagging System & Security Seals"
      ],
      results: "Delivered a complete 14-specimen brand universe unifying packaging architecture across 8 SKU lines, structural die-line specifications, debossed seal tolerances, and comprehensive monochrome identity guidelines for physical and digital deployment."
    },
    related: ["mus26", "stdeed", "logeer"]
  },
  {
    id: "mus26",
    title: "MUS26",
    subtitle: "Experimental Typographic & Spatial Sound Identity",
    primaryCategory: "GRAPHIC DESIGN",
    secondaryCategories: ["Art Direction", "Image Making", "Experimental Media", "Motion Design"],
    motionNote: "MOTION STUDY / KINETIC POSTURE: Framework for kinetic typographic momentum, rhythmic scale shifts, and temporal graphic pacing.",
    year: "2026",
    description: "A dynamic visual identity created for contemporary electronic music performance, scaling from handheld club flyers and oversized street posters to monumental urban billboards.",
    visualSystem: "Kinetic typography, high-octane graphic framing, raw duotone treatments, and experimental grid composition.",
    tools: ["Adobe Photoshop", "Adobe Illustrator", "Adobe After Effects", "Adobe InDesign"],
    heroImage: "assets/projects/graphic/mus26/MUS26.jpeg",
    tags: ["Typographic System", "Billboard", "Kinetic Posture", "Flyers", "Editorial Layout"],
    selected: true,
    aspect: "wide",
    images: [
      { src: "assets/projects/graphic/mus26/MUS26.jpeg", caption: "MUS26 Master Panoramic Banner & Typographic Framework" },
      { src: "assets/projects/graphic/mus26/MUS26_POSTER.jpeg", caption: "Official Event Poster & Kinetic Typographic Layout" },
      { src: "assets/projects/graphic/mus26/MUS26_BILLBOARD.jpeg", caption: "High-Impact Urban Billboard In-Situ Installation" },
      { src: "assets/projects/graphic/mus26/MUS26_Flyers.jpeg", caption: "Physical Handbill & Club Flyer Series" },
      { src: "assets/projects/graphic/mus26/MUS26_4.jpeg", caption: "Experimental Typographic Exploration 01" },
      { src: "assets/projects/graphic/mus26/MUS26_5.jpeg", caption: "Experimental Typographic Exploration 02" },
      { src: "assets/projects/graphic/mus26/MUS26_6.jpeg", caption: "Temporal Graphic Grid & Composition Study" }
    ],
    applications: ["Urban Billboards", "Exhibition Posters", "Club Flyers", "Temporal Motion Graphics", "Screen Projection Systems"],
    caseStudyDossier: {
      overview: "MUS26 is an experimental spatial sound performance and electronic music visual identity, engineered to scale across extreme mediums from handheld club ephemera to monumental architectural urban billboards.",
      problem: "Electronic music event branding frequently defaults to repetitive techno tropes or unreadable abstract noise that fails to establish long-term brand equity or legibility from across a crowded city street. The challenge was to create a kinetic typographic system that carries visceral musical momentum while remaining functionally legible at any physical scale.",
      process: "Explored the rhythmic tension between extreme wide horizontal typographic axes and tight vertical poster grids. Leveraged high-contrast duotone ink finishes, experimental raster distortion, and temporal pacing inspired by breakcore and ambient electronic music.",
      artifacts: [
        "Master Panoramic Banner & Kinetic Typographic Framework",
        "Official Exhibition & Tour Poster (High-Density Screen Print)",
        "Monumental Urban Highway Billboard In-Situ Installation",
        "Physical Die-Cut Handbill & Club Flyer Series",
        "Temporal Motion Graphic Sequences & Projection Keyframes"
      ],
      results: "Engineered complete identity suite encompassing large-format 48-sheet highway billboards, high-density screen-printed tour posters, die-cut physical club ephemera, and animated typographic kinetic keyframes for spatial projection."
    },
    related: ["emysc", "tekzzo", "zesis"]
  },
  {
    id: "emysc",
    title: "EMYSC",
    subtitle: "Experimental Media & Graphic Print Archive",
    primaryCategory: "POSTER & PRINT",
    secondaryCategories: ["Graphic Design", "Art Direction", "Image Making", "Experimental Media", "Motion Design"],
    motionNote: "MOTION DIRECTION / VISUAL RHYTHM: Sequential screen transitions, kinetic typographic pulses, and looping print animations.",
    year: "2025",
    description: "An avant-garde graphic print system investigating generative layouts, fractured typographic scales, and digital-to-analog print degradation.",
    visualSystem: "Deconstructed grids, chromatic shifts, experimental micro-copy, and layered graphical fields.",
    tools: ["Adobe Photoshop", "Adobe Illustrator", "Midjourney", "Adobe InDesign"],
    heroImage: "assets/projects/poster-print/emysc/EMYSC_01.jpeg",
    tags: ["Poster System", "Experimental Layout", "Visual Narrative", "Print Artifacts"],
    selected: true,
    aspect: "wide",
    images: [
      { src: "assets/projects/poster-print/emysc/EMYSC_01.jpeg", caption: "EMYSC Primary Exhibition Print 01" },
      { src: "assets/projects/poster-print/emysc/EMYSC_02.jpeg", caption: "EMYSC Exhibition Print 02 - Typographic Tension" },
      { src: "assets/projects/poster-print/emysc/EMYSC_03.jpeg", caption: "EMYSC Vertical Editorial Study 03" },
      { src: "assets/projects/poster-print/emysc/EMYSC_04.jpeg", caption: "EMYSC Print Artifact 04 - Composition & Grain" },
      { src: "assets/projects/poster-print/emysc/EMYSC_05.jpeg", caption: "EMYSC Wide Graphic Specimen 05" },
      { src: "assets/projects/poster-print/emysc/EMYSC_06.jpeg", caption: "EMYSC Modular Screen Print 06" },
      { src: "assets/projects/poster-print/emysc/EMYSC_07.jpeg", caption: "EMYSC Master Sequence 07" }
    ],
    applications: ["Exhibition Posters", "Print Editions", "Digital-Print Transmutations", "Catalog Design"],
    related: ["mus26", "tekzzo", "mkegg"]
  },
  {
    id: "tekzzo",
    title: "TEKZZO",
    subtitle: "Exhibition Poster Series & Screen Print System",
    primaryCategory: "POSTER & PRINT",
    secondaryCategories: ["Graphic Design", "Art Direction", "Image Making"],
    year: "2025",
    description: "A conceptual poster suite exploring the intersections of technological evolution, screen print materiality, and modular typographic structures.",
    visualSystem: "Modular Swiss grids, distressed photographic grain, bold vertical type axes, and high-saturation color accents.",
    tools: ["Adobe Illustrator", "Adobe Photoshop", "Adobe InDesign"],
    heroImage: "assets/projects/poster-print/tekzzo/TEKZZO_01.jpeg",
    tags: ["Exhibition Posters", "Screen Print", "Editorial Layout", "Typography"],
    selected: true,
    aspect: "wide",
    images: [
      { src: "assets/projects/poster-print/tekzzo/TEKZZO_01.jpeg", caption: "TEKZZO Exhibition Poster 01 - Core Specimen" },
      { src: "assets/projects/poster-print/tekzzo/TEKZZO_02.jpeg", caption: "TEKZZO Exhibition Poster 02 - Structural Rhythm" },
      { src: "assets/projects/poster-print/tekzzo/TEKZZO_03.jpeg", caption: "TEKZZO Exhibition Poster 03 - Typographic Density" },
      { src: "assets/projects/poster-print/tekzzo/TEKZZO_04.jpeg", caption: "TEKZZO Exhibition Poster 04 - High-Contrast Ink" },
      { src: "assets/projects/poster-print/tekzzo/TEKZZO_05.jpeg", caption: "TEKZZO Exhibition Poster 05 - Digital Degradation" },
      { src: "assets/projects/poster-print/tekzzo/TEKZZO_06.jpeg", caption: "TEKZZO Exhibition Poster 06 - Spatial Grid" },
      { src: "assets/projects/poster-print/tekzzo/TEKZZO_07.jpeg", caption: "TEKZZO Exhibition Poster 07 - Final Print Specimen" }
    ],
    applications: ["Silkscreen Exhibition Posters", "Cultural Announcements", "Print Archive", "Gallery Ephemera"],
    related: ["emysc", "mus26", "stdeed"]
  },
  {
    id: "mkegg",
    title: "MKEGG",
    subtitle: "Visual Synthetics & Creative Direction",
    primaryCategory: "DIGITAL DESIGN",
    secondaryCategories: ["Art Direction", "Image Making", "Experimental Media", "Motion Design"],
    motionNote: "MOTION DIRECTION / SEQUENTIAL FLOW: Keyframe sequence exploring organic-synthetic transitions, depth parallax, and ambient looping.",
    year: "2025",
    description: "An exploratory digital design collection merging surreal 3D-assisted image composition with refined typographic direction and brand storytelling.",
    visualSystem: "Organic surrealism, chromatic glass textures, dimensional typography, and high-fidelity lighting.",
    tools: ["Adobe Photoshop", "Midjourney", "Blender", "Figma"],
    heroImage: "assets/projects/digital/mkegg/MKEGG (1).jpeg",
    tags: ["Digital Experience", "Image Manipulation", "Visual Synthetics", "Creative Direction"],
    selected: true,
    aspect: "wide",
    images: [
      { src: "assets/projects/digital/mkegg/MKEGG (1).jpeg", caption: "MKEGG Keyframe 01 - Master Synthetic Landscape" },
      { src: "assets/projects/digital/mkegg/MKEGG (2).jpeg", caption: "MKEGG Keyframe 02 - Chromatic Material Study" },
      { src: "assets/projects/digital/mkegg/MKEGG (3).jpeg", caption: "MKEGG Vertical Composition 03" },
      { src: "assets/projects/digital/mkegg/MKEGG (4).jpeg", caption: "MKEGG Portrait Specimen 04" },
      { src: "assets/projects/digital/mkegg/MKEGG (5).jpeg", caption: "MKEGG Form & Void Study 05" },
      { src: "assets/projects/digital/mkegg/MKEGG (6).jpeg", caption: "MKEGG Spatial Composition 06" },
      { src: "assets/projects/digital/mkegg/MKEGG (7).jpeg", caption: "MKEGG Final Synthetic Artifact 07" }
    ],
    applications: ["Digital Art Direction", "Hero Brand Visuals", "Creative Content Architecture", "Digital Exhibition Pieces"],
    related: ["emysc", "tekzzo", "kijgo"]
  },
  {
    id: "arimm",
    title: "ARIMM",
    subtitle: "Next-Gen Mobile Financial Experience",
    primaryCategory: "UI/UX DESIGN",
    secondaryCategories: ["Digital Design", "Graphic Design", "Art Direction"],
    year: "2025",
    description: "An ultra-clean mobile fintech application designed for seamless cross-border wealth management, asset analytics, and instant liquid transfers.",
    tools: ["Figma", "Adobe Illustrator", "Adobe Photoshop"],
    heroImage: "assets/projects/ui/arimm/ARIMM (1).jpeg",
    tags: ["Mobile UX", "Design System", "Case Study", "Visual Prototype"],
    selected: true,
    aspect: "wide",
    isUIUX: true,
    uiuxSections: {
      fullUI: {
        title: "01 — FULL UI",
        description: "Primary architectural discovery interface and mobile application screens shown in uncompromised clarity and scale.",
        image: "assets/projects/ui/arimm/ARIMM (1).jpeg"
      },
      uiScreens: {
        title: "02 — UI SCREENS",
        description: "High-fidelity production screens showcasing responsive mobile views, account balances, asset distributions, and dark-mode UI detailing.",
        image: "assets/projects/ui/arimm/ARIMM (5).jpeg"
      },
      caseStudy: {
        title: "03 — CASE STUDY",
        description: "Problem: High cognitive friction and fragmented account visibility in traditional mobile finance. Solution: Progressive disclosure, clear typographic hierarchy, and instant transaction confirmation flows.",
        image: "assets/projects/ui/arimm/ARIMM (3).jpeg"
      },
      prototype: {
        title: "04 — PROTOTYPE",
        description: "Visual prototype walkthrough displaying screen transitions, sheet-based asset exchanges, and transaction confirmations across sequential flows.",
        image: "assets/projects/ui/arimm/ARIMM (2).jpeg"
      },
      finalExperience: {
        title: "05 — FINAL EXPERIENCE & DESIGN SYSTEM",
        description: "Production-ready mobile component library, typography tokens, chromatic ramps, and complete design system specifications.",
        image: "assets/projects/ui/arimm/ARIMM (4).jpeg"
      }
    },
    images: [
      { src: "assets/projects/ui/arimm/ARIMM (1).jpeg", caption: "01 Full UI - Primary Architecture & Discovery Interface" },
      { src: "assets/projects/ui/arimm/ARIMM (5).jpeg", caption: "02 UI Screens - Production Mobile Interfaces & Detailing" },
      { src: "assets/projects/ui/arimm/ARIMM (3).jpeg", caption: "03 Case Study - UX Architecture, Personas & User Flow" },
      { src: "assets/projects/ui/arimm/ARIMM (2).jpeg", caption: "04 Prototype - Interactive Navigation & Screen Transitions" },
      { src: "assets/projects/ui/arimm/ARIMM (4).jpeg", caption: "05 Design System & Final Experience - Components & Design Tokens" }
    ],
    applications: ["Mobile Application UI", "Design Tokens", "Design System", "Interactive Prototype", "Fintech UX"],
    caseStudyDossier: {
      overview: "ARIMM is a next-generation mobile fintech ecosystem engineered for cross-border wealth management, multi-asset analytics, and instant liquid transfers for modern capital allocators.",
      problem: "Traditional institutional wealth platforms suffer from high cognitive load, fragmented account visibility across borders, and dense, unreadable tables that trigger user hesitation during high-value executions. Our objective was to collapse multi-asset complexity into progressive disclosure flows with instant transaction feedback.",
      process: "We mapped the end-to-end user journey across 4 core states: Discovery, Allocation, Liquidity Verification, and Execution. The UI uses an OLED dark-mode palette (#06070A) with subtle emerald and sapphire indicator tokens for positive yield and liquid reserve states. Strict typographic hierarchy (Inter Display paired with JetBrains Mono for monetary values) ensures zero ambiguity during high-velocity transactions.",
      artifacts: [
        "Complete Mobile Application UI (40+ High-Fidelity Screens)",
        "Biometric Instant-Execution Modal & Triage Sheets",
        "Modular Asset Performance Telemetry & Yield Curves",
        "Interactive Figma Prototype with Micro-Haptic Transition Flows",
        "Comprehensive Atomic Design Token System (Figma to Code Tokens)"
      ],
      results: "Delivered production-ready 40-screen mobile application architecture, atomic design token library for iOS/Android handoff, interactive Figma micro-interaction prototypes, and biometric transfer flows."
    },
    related: ["calott", "pitso", "nkitt"]
  },
  {
    id: "calott",
    title: "CALOTT",
    subtitle: "Enterprise Creative Operations Dashboard",
    primaryCategory: "UI/UX DESIGN",
    secondaryCategories: ["Digital Design", "Graphic Design", "Art Direction"],
    year: "2025",
    description: "A comprehensive web application engineered for global creative directors to orchestrate design systems, asset libraries, and collaborative sprints.",
    tools: ["Figma", "React", "Adobe Illustrator"],
    heroImage: "assets/projects/ui/calott/CALOTT (5).jpeg",
    tags: ["Web Interface", "Design System", "Dashboard", "UX Flow"],
    selected: true,
    aspect: "wide",
    isUIUX: true,
    uiuxSections: {
      fullUI: {
        title: "01 — FULL UI",
        description: "Comprehensive desktop dashboard overview with dual-pane layout, real-time activity metrics, and modular workspace architecture.",
        image: "assets/projects/ui/calott/CALOTT (5).jpeg"
      },
      uiScreens: {
        title: "02 — UI SCREENS",
        description: "Interactive modal states, task cards, analytics telemetry, and detailed inspector panels.",
        image: "assets/projects/ui/calott/CALOTT (2).jpeg"
      },
      caseStudy: {
        title: "03 — CASE STUDY",
        description: "Problem: Fragmented creative asset workflows between designers and managers. Solution: Unified design repository with branch previewing, instant search shortcuts, and granular access control.",
        image: "assets/projects/ui/calott/CALOTT (3).jpeg"
      },
      prototype: {
        title: "04 — PROTOTYPE",
        description: "Visual prototype demonstrating multi-stage review workflows, asset approval statuses, and dynamic filter controls.",
        image: "assets/projects/ui/calott/CALOTT (1).jpeg"
      },
      finalExperience: {
        title: "05 — FINAL EXPERIENCE & DESIGN SYSTEM",
        description: "Pixel-perfect final production screens showcasing dense data readability, component tokens, and restrained accent colors.",
        image: "assets/projects/ui/calott/CALOTT (4).jpeg"
      }
    },
    images: [
      { src: "assets/projects/ui/calott/CALOTT (5).jpeg", caption: "01 Full UI - Master Desktop Dashboard & AI Workspace" },
      { src: "assets/projects/ui/calott/CALOTT (2).jpeg", caption: "02 UI Screens - Modal States, Task Cards & Analytics" },
      { src: "assets/projects/ui/calott/CALOTT (3).jpeg", caption: "03 Case Study - Information Architecture & Strategy" },
      { src: "assets/projects/ui/calott/CALOTT (1).jpeg", caption: "04 Prototype - Operational Flow & Onboarding States" },
      { src: "assets/projects/ui/calott/CALOTT (4).jpeg", caption: "05 Design System & Final Experience - Components & Tokens" }
    ],
    applications: ["Web Dashboard UI", "Enterprise UX", "Design System", "Workflow Prototype"],
    caseStudyDossier: {
      overview: "CALOTT is an enterprise creative operations and design governance platform designed for global design directors to orchestrate design systems, asset versioning, and cross-functional design sprints.",
      problem: "Creative teams at scale face catastrophic drift between Figma libraries, code repositories, and brand governance. Designers and engineers waste up to 35% of sprint cycles manually cross-checking token discrepancies and component versions without unified telemetry.",
      process: "Conducted in-depth workflow audits across 12 enterprise design teams. Developed a dual-pane dashboard architecture featuring real-time activity heatmaps, modular inspection docks, and an automated token synchronizer. Formulated a low-strain charcoal chromatic ramp with crisp 1px neutral borders to minimize fatigue during 8-hour creative director sessions.",
      artifacts: [
        "Desktop Master Command Dashboard & AI Workspace",
        "Interactive Branch Merging & Review Workflow Modals",
        "Automated Design Token Inspector & Live Preview Playgrounds",
        "Granular Access Control & Sprint Progress Telemetry",
        "High-Density Data Table Systems with Contextual Filters"
      ],
      results: "Delivered comprehensive enterprise design system architecture featuring unified design token inspectors, dual-pane desktop workspace views, branch-merging workflow specifications, and scalable component libraries."
    },
    related: ["arimm", "pitso", "atllis"]
  },
  {
    id: "earth-3d",
    title: "EARTH 3D",
    subtitle: "Planetary Environment & Real-Time WebGL",
    primaryCategory: "3D DESIGN",
    secondaryCategories: ["Image Making", "Digital Design", "Motion / Interaction", "Experimental Media", "Art Direction"],
    year: "2025",
    description: "A real-time, interactive 3D planetary environment rendering atmospheric scattering, dynamic cloud layers, and realistic solar illumination using Three.js and WebGL. Converted from the master Blender scene while preserving the original source file.",
    tools: ["Blender", "Three.js", "WebGL", "GLTFLoader", "OrbitControls"],
    heroImage: "assets/3d/EARTH3D.webp",
    modelPath: "assets/3d/earth.glb",
    sourceBlend: "assets/3d/Earth.blend",
    tags: ["3D Modeling", "Planetary Environment", "Interactive Orbit", "Shader Materials", "Real-Time WebGL"],
    selected: true,
    is3D: true,
    aspect: "wide",
    images: [
      { src: "assets/3d/EARTH3D.webp", caption: "EARTH 3D Planetary Environment Key Visual" }
    ],
    applications: ["Real-Time 3D WebGL", "Interactive Model Exploration", "Digital Art Installations", "Atmospheric Visualization"],
    caseStudyDossier: {
      overview: "EARTH 3D is a real-time, interactive planetary WebGL visualization rendering atmospheric Rayleigh scattering, dynamic cloud layers, and solar illumination directly inside the browser at 60 FPS.",
      problem: "Most 3D web experiences suffer from massive asset payloads (>50MB), sluggish framerates on lower-tier hardware, and clumsy touch navigation on mobile. The goal was to convert a high-density master Blender environment into an ultra-optimized glTF/GLB web asset under 5MB while preserving photographic cinematic fidelity.",
      process: "Engineered custom PBR shader passes with normal-mapped continental topology and Fresnel atmospheric rim falloff. Deployed progressive texture loading, camera distance LODs, and smooth quaternion dampening on OrbitControls. Optimized draw calls to under 15 per frame.",
      artifacts: [
        "Master 3D Blender Scene to WebGL glTF Pipeline",
        "Real-Time Three.js Atmospheric Scattering & Cloud Shader",
        "Custom Touch & Mouse OrbitControls with Smooth Inertia Damping",
        "Interactive HUD Interface with Rotation Speed & Reset Controls",
        "Responsive Canvas Architecture with 60 FPS Performance Profile"
      ],
      results: "Engineered real-time Three.js WebGL visualization supporting interactive solid illumination, dynamic wireframe topology mode, smooth OrbitControls damping, and responsive canvas scaling across desktop and mobile browsers."
    },
    related: ["mus26", "atllis", "tukeet"]
  },
  {
    id: "stdeed",
    title: "STDEED",
    subtitle: "Streetwear Apparel Identity & Graphic System",
    primaryCategory: "GRAPHIC DESIGN",
    secondaryCategories: ["Art Direction", "Image Making", "Branding"],
    year: "2025",
    description: "A subversive streetwear identity system merging technical apparel typography, raw outdoor campaign billboards, garment tag architectures, and social media releases.",
    visualSystem: "Utilitarian typography, industrial tag detailing, high-impact billboard crops, and street photography direction.",
    tools: ["Adobe Illustrator", "Adobe Photoshop", "Canva", "Adobe Lightroom"],
    heroImage: "assets/projects/graphic/stdeed/Stdeed.jpeg",
    tags: ["Apparel Identity", "Streetwear Graphics", "Billboard", "Tag System"],
    selected: true,
    aspect: "wide",
    images: [
      { src: "assets/projects/graphic/stdeed/Stdeed.jpeg", caption: "STDEED Master Graphic Specimen" },
      { src: "assets/projects/graphic/stdeed/STEED_BILLBOARD.jpeg", caption: "Urban Street Campaign Billboard" },
      { src: "assets/projects/graphic/stdeed/Stdeed_Logo.jpeg", caption: "Minimal Logotype & Monogram Vector" },
      { src: "assets/projects/graphic/stdeed/Stdeed_StreetLook.jpeg", caption: "Lookbook Photography & Apparel Direction" },
      { src: "assets/projects/graphic/stdeed/STDEED_TAG.jpeg", caption: "Garment Hangtag Construction & Typography" },
      { src: "assets/projects/graphic/stdeed/Steed_insatgrampost.jpeg", caption: "Digital Release & Social Grid Asset" }
    ],
    applications: ["Apparel Graphics", "Street Campaign Billboards", "Garment Tags & Trims", "Digital Lookbook"],
    related: ["zesis", "mus26", "logeer"]
  },
  {
    id: "atllis",
    title: "ATLLIS",
    subtitle: "Futuristic Digital Systems & Screen Language",
    primaryCategory: "DIGITAL DESIGN",
    secondaryCategories: ["Graphic Design", "Art Direction", "Experimental Media"],
    year: "2026",
    description: "A speculative digital design system built for next-generation interactive screens, ambient spatial computing, and high-density information architecture.",
    visualSystem: "Luminescent UI vectors, telemetry data overlays, deep-space color palettes, and cinematic focal points.",
    tools: ["Figma", "Adobe Photoshop", "Adobe Illustrator", "Midjourney"],
    heroImage: "assets/projects/digital/atllis/ATLLIS (1).jpeg",
    tags: ["Digital Campaign", "Visual Systems", "Future Interface", "Creative Direction"],
    selected: true,
    aspect: "wide",
    images: [
      { src: "assets/projects/digital/atllis/ATLLIS (1).jpeg", caption: "ATLLIS Core Screen Composition 01" },
      { src: "assets/projects/digital/atllis/ATLLIS (2).jpeg", caption: "ATLLIS Interface Architecture 02" },
      { src: "assets/projects/digital/atllis/ATLLIS (3).jpeg", caption: "ATLLIS Panoramic Screen System 03" },
      { src: "assets/projects/digital/atllis/ATLLIS (4).jpeg", caption: "ATLLIS Digital Specimen 04" },
      { src: "assets/projects/digital/atllis/ATLLIS (5).jpeg", caption: "ATLLIS Ambient Screen Visual 05" },
      { src: "assets/projects/digital/atllis/ATLLIS (6).jpeg", caption: "ATLLIS Ultra-Wide Telemetry Layout 06" },
      { src: "assets/projects/digital/atllis/ATLLIS (7).jpeg", caption: "ATLLIS Spatial Display Screen 07" }
    ],
    applications: ["Digital Brand Experience", "Futuristic HUD Concepts", "Interactive Screen Systems", "Spatial UI Direction"],
    related: ["calott", "earth-3d", "tukeet"]
  },
  {
    id: "kijgo",
    title: "KIJGO",
    subtitle: "Contemporary Editorial & Typography Campaign",
    primaryCategory: "GRAPHIC DESIGN",
    secondaryCategories: ["Art Direction", "Digital Design"],
    year: "2025",
    description: "An editorial graphic language exploring tension between brutalist grid alignments, bold typographic scale, and contemporary fashion advertising.",
    visualSystem: "High-contrast serif-grotesk pairing, asymmetric multi-column grids, and tactile layout structures.",
    tools: ["Adobe InDesign", "Adobe Illustrator", "Adobe Photoshop"],
    heroImage: "assets/projects/graphic/kijgo/Kijgo.jpeg",
    tags: ["Editorial Graphics", "Advertising", "Typography", "Visual System"],
    selected: false,
    aspect: "square",
    images: [
      { src: "assets/projects/graphic/kijgo/Kijgo.jpeg", caption: "KIJGO Master Editorial Cover" },
      { src: "assets/projects/graphic/kijgo/Kijgo_01.jpeg", caption: "KIJGO Editorial Spread 01" },
      { src: "assets/projects/graphic/kijgo/Kijgo_02.jpeg", caption: "KIJGO Typography Layout 02" },
      { src: "assets/projects/graphic/kijgo/Kijgo_03.jpeg", caption: "KIJGO Wide Campaign Spread 03" },
      { src: "assets/projects/graphic/kijgo/Kijgo_04.jpeg", caption: "KIJGO Fashion Editorial 04" },
      { src: "assets/projects/graphic/kijgo/Kijgo_05.jpeg", caption: "KIJGO Typographic Grid 05" },
      { src: "assets/projects/graphic/kijgo/Kijgo_06.jpeg", caption: "KIJGO Final Lookbook Spread 06" }
    ],
    applications: ["Editorial Layouts", "Campaign Collateral", "Print Ephemera", "Digital Lookbooks"],
    related: ["mkegg", "emysc", "tekzzo"]
  },
  {
    id: "tukeet",
    title: "TUKEET",
    subtitle: "Cinematic Print Campaign & Visual Hierarchy",
    primaryCategory: "POSTER & PRINT",
    secondaryCategories: ["Graphic Design", "Art Direction", "Image Making"],
    year: "2025",
    description: "A sequence of bold vertical print compositions crafted for cinematic release and underground visual dissemination, leveraging dramatic photographic scale.",
    visualSystem: "Strict visual pacing, dominant negative space, micro-editorial captioning, and cinematic lighting.",
    tools: ["Adobe Photoshop", "Adobe Illustrator", "Adobe InDesign"],
    heroImage: "assets/projects/poster-print/tukeet/TUKEET_01.jpeg",
    tags: ["Campaign Posters", "Visual Hierarchy", "Print Series", "Experimental Type"],
    selected: false,
    aspect: "wide",
    images: [
      { src: "assets/projects/poster-print/tukeet/TUKEET_01.jpeg", caption: "TUKEET Primary Release Banner" },
      { src: "assets/projects/poster-print/tukeet/TUKEET_02.jpeg", caption: "TUKEET Vertical Poster 02" },
      { src: "assets/projects/poster-print/tukeet/TUKEET_03.jpeg", caption: "TUKEET Vertical Poster 03" },
      { src: "assets/projects/poster-print/tukeet/TUKEET_04.jpeg", caption: "TUKEET Wide Poster 04" },
      { src: "assets/projects/poster-print/tukeet/TUKEET_05.jpeg", caption: "TUKEET Vertical Composition 05" },
      { src: "assets/projects/poster-print/tukeet/TUKEET_06.jpeg", caption: "TUKEET Exhibition Format 06" },
      { src: "assets/projects/poster-print/tukeet/TUKEET_07.jpeg", caption: "TUKEET Final Release Poster 07" }
    ],
    applications: ["Theatrical Teasers", "Flypost Campaign", "Collector Prints", "Limited Edition Run"],
    related: ["atllis", "earth-3d", "mus26"]
  },
  {
    id: "logeer",
    title: "LOGEER",
    subtitle: "Digital Art Direction & Screen Typography",
    primaryCategory: "DIGITAL DESIGN",
    secondaryCategories: ["Graphic Design", "Art Direction", "Experimental Media"],
    year: "2025",
    description: "A digital campaign identity focused on high-contrast screen dynamics, digital editorial publishing, and modular social system layouts.",
    visualSystem: "Expansive landscape canvas formats, ultra-wide typographic banners, and clean digital grid structures.",
    tools: ["Figma", "Adobe Illustrator", "Adobe Photoshop"],
    heroImage: "assets/projects/digital/logeer/LOGEER (1).jpeg",
    tags: ["Digital Art Direction", "Visual Media", "Brand Graphics", "Screen Systems"],
    selected: false,
    aspect: "wide",
    images: [
      { src: "assets/projects/digital/logeer/LOGEER (1).jpeg", caption: "LOGEER Master Screen Visual 01" },
      { src: "assets/projects/digital/logeer/LOGEER (2).jpeg", caption: "LOGEER Digital Composition 02" },
      { src: "assets/projects/digital/logeer/LOGEER (3).jpeg", caption: "LOGEER Wide Typographic Banner 03" },
      { src: "assets/projects/digital/logeer/LOGEER (4).jpeg", caption: "LOGEER Editorial Screen 04" },
      { src: "assets/projects/digital/logeer/LOGEER (5).jpeg", caption: "LOGEER Key Campaign Visual 05" },
      { src: "assets/projects/digital/logeer/LOGEER (6).jpeg", caption: "LOGEER Display Screen 06" },
      { src: "assets/projects/digital/logeer/LOGEER (7).jpeg", caption: "LOGEER Final Presentation Banner 07" }
    ],
    applications: ["Digital Editorial Publishing", "Interactive Screen Portals", "Responsive Social Systems", "Digital Campaign Assets"],
    related: ["zesis", "stdeed", "mus26"]
  },
  {
    id: "nkitt",
    title: "NKITT",
    subtitle: "Collaborative Product Design System Platform",
    primaryCategory: "UI/UX DESIGN",
    secondaryCategories: ["Digital Design", "Graphic Design", "Art Direction"],
    year: "2025",
    description: "A unified cloud workspace for multi-brand design tokens, UI component synchronizations, and clinical patient workflow management.",
    tools: ["Figma", "Next.js", "Adobe Photoshop"],
    heroImage: "assets/projects/ui/nkitt/NKITT_01.jpeg",
    tags: ["Platform UI", "UX Flows", "Component Library", "Final Interface"],
    selected: false,
    aspect: "wide",
    isUIUX: true,
    uiuxSections: {
      fullUI: {
        title: "01 — FULL UI",
        description: "Master clinical desktop dashboard, appointment scheduling portal, and mobile interface shown in complete uncropped resolution.",
        image: "assets/projects/ui/nkitt/NKITT_01.jpeg"
      },
      uiScreens: {
        title: "02 — UI SCREENS",
        description: "High-fidelity clinical workflow screens, patient record cards, appointment management, and doctor schedules.",
        image: "assets/projects/ui/nkitt/NKITT_05.jpeg"
      },
      caseStudy: {
        title: "03 — CASE STUDY",
        description: "Addressing clinical scheduling bottlenecks and patient coordination through ergonomic UI layout, accessible contrast, and zero-latency data updates.",
        image: "assets/projects/ui/nkitt/NKITT_03.jpeg"
      },
      prototype: {
        title: "04 — PROTOTYPE",
        description: "Interactive triage flows, calendar date selection, patient onboarding modals, and instant booking confirmation states.",
        image: "assets/projects/ui/nkitt/NKITT_02.jpeg"
      },
      finalExperience: {
        title: "05 — FINAL EXPERIENCE & DESIGN SYSTEM",
        description: "Accessible design system tokens, typography scales, health status badges, and scalable atomic component architecture.",
        image: "assets/projects/ui/nkitt/NKITT_04.jpeg"
      }
    },
    images: [
      { src: "assets/projects/ui/nkitt/NKITT_01.jpeg", caption: "01 Full UI - Primary Platform Interface & Booking Portal" },
      { src: "assets/projects/ui/nkitt/NKITT_05.jpeg", caption: "02 UI Screens - Patient Management & Clinical Detail Views" },
      { src: "assets/projects/ui/nkitt/NKITT_03.jpeg", caption: "03 Case Study - UX Workflow, Logic & Information Architecture" },
      { src: "assets/projects/ui/nkitt/NKITT_02.jpeg", caption: "04 Prototype - Interactive Booking & Triage Flow" },
      { src: "assets/projects/ui/nkitt/NKITT_04.jpeg", caption: "05 Design System & Final Experience - Components & Tokens" }
    ],
    applications: ["Platform UI", "Component System", "Design Tokens", "Product Architecture"],
    related: ["arimm", "calott", "pitso"]
  },
  {
    id: "pitso",
    title: "PITSO",
    subtitle: "Intelligent Financial Dashboard & Wealth Experience",
    primaryCategory: "UI/UX DESIGN",
    secondaryCategories: ["Digital Design", "Graphic Design", "Art Direction"],
    year: "2025",
    description: "A high-precision financial intelligence platform featuring real-time net worth tracking, portfolio category analytics, multi-device syncing, and transaction history.",
    tools: ["Figma", "React", "Adobe Illustrator"],
    heroImage: "assets/projects/ui/pitso/PITSO (4).jpeg",
    tags: ["Financial Dashboard", "Mobile UX", "Design System", "Investment UI"],
    selected: false,
    aspect: "wide",
    isUIUX: true,
    uiuxSections: {
      fullUI: {
        title: "01 — FULL UI",
        description: "Full primary financial dashboard on desktop monitor flanked by mobile transaction history and investment goal tracking interfaces.",
        image: "assets/projects/ui/pitso/PITSO (4).jpeg"
      },
      uiScreens: {
        title: "02 — UI SCREENS",
        description: "High-resolution desktop monitor and mobile screens showing portfolio performance curves, asset breakdown, and expenditure categories.",
        image: "assets/projects/ui/pitso/PITSO (2).jpeg"
      },
      caseStudy: {
        title: "03 — CASE STUDY",
        description: "Information architecture, user personas, financial data visualization principles, and frictionless cross-platform wealth management logic.",
        image: "assets/projects/ui/pitso/PITSO (3).jpeg"
      },
      prototype: {
        title: "04 — PROTOTYPE",
        description: "Interactive user journey flows, transaction validation stages, goal completion feedback, and instant buy/sell order execution.",
        image: "assets/projects/ui/pitso/PITSO (1).jpeg"
      },
      finalExperience: {
        title: "05 — FINAL EXPERIENCE & DESIGN SYSTEM",
        description: "Comprehensive financial design system: typography ramps, color ramps, buttons, inputs, chart specs, navigation, alerts, and security badges.",
        image: "assets/projects/ui/pitso/PITSO (5).jpeg"
      }
    },
    images: [
      { src: "assets/projects/ui/pitso/PITSO (4).jpeg", caption: "01 Full UI - Multi-Device Financial Dashboard & Mobile System" },
      { src: "assets/projects/ui/pitso/PITSO (2).jpeg", caption: "02 UI Screens - Portfolio Tracking & Expenditure Analytics" },
      { src: "assets/projects/ui/pitso/PITSO (3).jpeg", caption: "03 Case Study - Information Architecture & Financial UX" },
      { src: "assets/projects/ui/pitso/PITSO (1).jpeg", caption: "04 Prototype - Transaction Flows & Order Execution" },
      { src: "assets/projects/ui/pitso/PITSO (5).jpeg", caption: "05 Design System & Final Experience - Components, Colors & Charts" }
    ],
    applications: ["Financial Dashboard UI", "Investment UX", "Mobile Banking", "Design System"],
    related: ["arimm", "calott", "nkitt"]
  }
];

export const TOOL_CATEGORIES = [
  {
    discipline: "DESIGN",
    tools: [
      { name: "Adobe Photoshop", icon: "photoshop", featured: true, tier: "CORE" },
      { name: "Adobe Illustrator", icon: "illustrator", featured: true, tier: "CORE" },
      { name: "Adobe InDesign", icon: "indesign", featured: true, tier: "CORE" },
      { name: "Figma", icon: "figma", featured: true, tier: "CORE" },
      { name: "Adobe XD", icon: "adobexd", featured: true, tier: "CORE" },
      { name: "Canva", icon: "canva" },
      { name: "CorelDRAW", icon: "coreldraw" },
      { name: "Sketch", icon: "sketch" },
      { name: "Adobe Express", icon: "express" },
      { name: "Notion", icon: "notion" },
      { name: "Framer", icon: "framer", featured: true, tier: "CORE" }
    ]
  },
  {
    discipline: "WEB / CREATIVE DEVELOPMENT",
    tools: [
      { name: "Three.js", icon: "threejs", featured: true, tier: "CORE" },
      { name: "HTML", icon: "html5" },
      { name: "CSS", icon: "css3" },
      { name: "JavaScript", icon: "javascript" },
      { name: "React", icon: "react" },
      { name: "Next.js", icon: "nextjs" }
    ]
  },
  {
    discipline: "MOTION / VIDEO",
    tools: [
      { name: "After Effects", icon: "aftereffects", featured: true, tier: "CORE" },
      { name: "Premiere Pro", icon: "premiere", featured: true, tier: "CORE" },
      { name: "Animate", icon: "animate" },
      { name: "Apple Motion", icon: "motion" },
      { name: "DaVinci Resolve", icon: "davinci", featured: true, tier: "CORE" },
      { name: "Final Cut Pro", icon: "finalcut" },
      { name: "CapCut", icon: "capcut" }
    ]
  },
  {
    discipline: "3D",
    tools: [
      { name: "Blender", icon: "blender", featured: true, tier: "CORE" },
      { name: "Cinema 4D", icon: "cinema4d", featured: true, tier: "CORE" },
      { name: "Maya", icon: "maya" },
      { name: "3ds Max", icon: "threedsmax" },
      { name: "Houdini", icon: "houdini" },
      { name: "Unreal Engine", icon: "unreal", featured: true, tier: "CORE" },
      { name: "Unity", icon: "unity" }
    ]
  },
  {
    discipline: "IMAGE / PHOTO",
    tools: [
      { name: "Adobe Lightroom", icon: "lightroom" }
    ]
  },
  {
    discipline: "AI & GENERATIVE FRAMEWORKS",
    tools: [
      { name: "Midjourney", icon: "midjourney", featured: true, tier: "CORE" },
      { name: "Adobe Firefly", icon: "firefly", featured: true, tier: "CORE" },
      { name: "Stable Diffusion", icon: "stablediffusion", featured: true, tier: "CORE" },
      { name: "Runway", icon: "runway", featured: true, tier: "CORE" },
      { name: "Kling AI", icon: "kling" },
      { name: "Luma AI", icon: "luma" },
      { name: "FLUX", icon: "flux" },
      { name: "DALL·E", icon: "dalle" }
    ]
  }
];

export const TOOL_ARCHIVE_ROWS = [
  {
    id: "01",
    number: "01",
    title: "DESIGN & GRAPHICS",
    direction: "left",
    label: "01 / DESIGN & GRAPHICS",
    tools: [
      { name: "Photoshop", fullName: "Adobe Photoshop", icon: "photoshop", isCore: true },
      { name: "Illustrator", fullName: "Adobe Illustrator", icon: "illustrator", isCore: true },
      { name: "InDesign", fullName: "Adobe InDesign", icon: "indesign", isCore: true },
      { name: "Canva", fullName: "Canva", icon: "canva" },
      { name: "Affinity Designer", fullName: "Affinity Designer", icon: "affinitydesigner" },
      { name: "Affinity Photo", fullName: "Affinity Photo", icon: "affinityphoto" },
      { name: "CorelDRAW", fullName: "CorelDRAW", icon: "coreldraw" }
    ]
  },
  {
    id: "02",
    number: "02",
    title: "UI / UX & DIGITAL",
    direction: "right",
    label: "02 / UI / UX & DIGITAL",
    tools: [
      { name: "Figma", fullName: "Figma", icon: "figma", isCore: true },
      { name: "Sketch", fullName: "Sketch", icon: "sketch", isCore: true },
      { name: "Adobe XD", fullName: "Adobe XD", icon: "adobexd", isCore: true },
      { name: "Framer", fullName: "Framer", icon: "framer" },
      { name: "Webflow", fullName: "Webflow", icon: "webflow" },
      { name: "ProtoPie", fullName: "ProtoPie", icon: "protopie" },
      { name: "FigJam", fullName: "FigJam", icon: "figjam" }
    ]
  },
  {
    id: "03",
    number: "03",
    title: "VIDEO EDITING & MOTION",
    direction: "left",
    label: "03 / VIDEO EDITING & MOTION",
    tools: [
      { name: "After Effects", fullName: "Adobe After Effects", icon: "aftereffects", isCore: true },
      { name: "Premiere Pro", fullName: "Adobe Premiere Pro", icon: "premiere", isCore: true },
      { name: "DaVinci Resolve", fullName: "DaVinci Resolve", icon: "davinci", isCore: true },
      { name: "Final Cut Pro", fullName: "Final Cut Pro", icon: "finalcut" },
      { name: "Apple Motion", fullName: "Apple Motion", icon: "motion" },
      { name: "Adobe Animate", fullName: "Adobe Animate", icon: "animate" },
      { name: "CapCut", fullName: "CapCut", icon: "capcut" }
    ]
  },
  {
    id: "04",
    number: "04",
    title: "3D & REALTIME",
    direction: "right",
    label: "04 / 3D & REALTIME",
    tools: [
      { name: "Blender", fullName: "Blender", icon: "blender", isCore: true },
      { name: "Cinema 4D", fullName: "Cinema 4D", icon: "cinema4d", isCore: true },
      { name: "Maya", fullName: "Maya", icon: "maya", isCore: true },
      { name: "3ds Max", fullName: "3ds Max", icon: "threedsmax" },
      { name: "Houdini", fullName: "Houdini", icon: "houdini" },
      { name: "Unreal Engine", fullName: "Unreal Engine", icon: "unreal" },
      { name: "Unity", fullName: "Unity", icon: "unity" }
    ]
  },
  {
    id: "05",
    number: "05",
    title: "AI & GENERATIVE",
    direction: "left",
    label: "05 / AI & GENERATIVE",
    tools: [
      { name: "Midjourney", fullName: "Midjourney", icon: "midjourney", isCore: true },
      { name: "Adobe Firefly", fullName: "Adobe Firefly", icon: "firefly", isCore: true },
      { name: "Stable Diffusion", fullName: "Stable Diffusion", icon: "stablediffusion", isCore: true },
      { name: "Runway", fullName: "Runway", icon: "runway" },
      { name: "Kling AI", fullName: "Kling AI", icon: "kling" },
      { name: "Luma AI", fullName: "Luma AI", icon: "luma" },
      { name: "Leonardo AI", fullName: "Leonardo AI", icon: "leonardo" }
    ]
  },
  {
    id: "06",
    number: "06",
    title: "WEB & DEVELOPMENT",
    direction: "right",
    label: "06 / WEB & DEVELOPMENT",
    tools: [
      { name: "VS Code", fullName: "VS Code", icon: "vscode" },
      { name: "HTML", fullName: "HTML", icon: "html5" },
      { name: "CSS", fullName: "CSS", icon: "css3" },
      { name: "JavaScript", fullName: "JavaScript", icon: "javascript", isCore: true },
      { name: "React", fullName: "React", icon: "react", isCore: true },
      { name: "Three.js", fullName: "Three.js", icon: "threejs", isCore: true },
      { name: "GitHub", fullName: "GitHub", icon: "github" }
    ]
  },
  {
    id: "07",
    number: "07",
    title: "PROTOTYPING & CREATIVE SYSTEMS",
    direction: "left",
    label: "07 / PROTOTYPING & CREATIVE SYSTEMS",
    tools: [
      { name: "Framer", fullName: "Framer", icon: "framer", isCore: true },
      { name: "Webflow", fullName: "Webflow", icon: "webflow", isCore: true },
      { name: "ProtoPie", fullName: "ProtoPie", icon: "protopie", isCore: true },
      { name: "Principle", fullName: "Principle", icon: "principle" },
      { name: "Rive", fullName: "Rive", icon: "rive" },
      { name: "Spline", fullName: "Spline", icon: "spline" },
      { name: "Miro", fullName: "Miro", icon: "miro" }
    ]
  },
  {
    id: "08",
    number: "08",
    title: "TECHNOLOGIES",
    direction: "right",
    label: "08 / TECHNOLOGIES",
    tools: [
      { name: "Python", fullName: "Python", icon: "python", isCore: true },
      { name: "Java", fullName: "Java", icon: "java" },
      { name: "C++", fullName: "C++", icon: "cpp" },
      { name: "Node.js", fullName: "Node.js", icon: "nodejs", isCore: true },
      { name: "Next.js", fullName: "Next.js", icon: "nextjs", isCore: true },
      { name: "SQL", fullName: "SQL", icon: "sql" },
      { name: "Git", fullName: "Git", icon: "git" }
    ]
  }
];
