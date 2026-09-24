/**
 * SIVASURIYA PORTFOLIO - MASTER APPLICATION LOGIC
 * Editorial interaction controller, filtering, routing, theme engine, and modal manager.
 */

import { PORTFOLIO_INFO, DISCIPLINES, SERVICES, PROJECTS, TOOL_CATEGORIES, TOOL_ARCHIVE_ROWS, EXPERIENCES } from './data.js';
import { MotionBackgroundPlayer } from './bg-player.js?v=3.0';
import { Lightbox } from './lightbox.js';
import { InteractivityEngine } from './interactive.js?v=3.0';

// SVG Icon Library for Tools & UI (24x24 viewBox, crisp inline rendering)
const TOOL_ICONS = {
  photoshop: `<svg viewBox="0 0 24 24"><rect width="24" height="24" rx="4" fill="#001E36"/><path d="M7 6.5h3.2c1.7 0 2.8.9 2.8 2.4 0 1.6-1.1 2.5-2.8 2.5H8.7v4.6H7V6.5zm1.7 3.5h1.3c.8 0 1.3-.4 1.3-1.1 0-.7-.5-1.1-1.3-1.1H8.7V10zm5.1 4.2c.4.4 1 .7 1.7.7.9 0 1.3-.4 1.3-.9 0-1.2-3.1-.7-3.1-2.9 0-1.2 1-2.1 2.6-2.1.8 0 1.5.2 2 .6l-.5 1.1c-.4-.3-.9-.5-1.5-.5-.7 0-1.1.4-1.1.8 0 1.2 3.1.7 3.1 2.9 0 1.3-1 2.2-2.7 2.2-.9 0-1.8-.3-2.3-.8l.5-1.1z" fill="#31A8FF"/></svg>`,
  illustrator: `<svg viewBox="0 0 24 24"><rect width="24" height="24" rx="4" fill="#330000"/><path d="M6.5 16l3.2-9.5h1.6L14.5 16h-1.6l-.8-2.6H8.9L8.1 16H6.5zm2.8-3.9h2.4l-1.2-3.9-1.2 3.9zm6.3-5.6h1.6V8h-1.6V6.5zm0 3.2h1.6V16h-1.6V9.7z" fill="#FF9A00"/></svg>`,
  indesign: `<svg viewBox="0 0 24 24"><rect width="24" height="24" rx="4" fill="#49021F"/><path d="M7 6.5h1.7V16H7V6.5zm3.5 0h2.8c2.4 0 4.2 1.8 4.2 4.7 0 3-1.8 4.8-4.2 4.8h-2.8V6.5zm1.7 8h1.1c1.5 0 2.5-1.2 2.5-3.3 0-2-1-3.2-2.5-3.2h-1.1v6.5z" fill="#FF3366"/></svg>`,
  figma: `<svg viewBox="0 0 24 24"><path d="M8 3.5h4v4H8a2 2 0 0 1-2-2 2 2 0 0 1 2-2zm4 0h4a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-4v-4zm0 4h4a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-4v-4zm-4 0h4v4H8a2 2 0 0 1-2-2 2 2 0 0 1 2-2zm4 4v4H8a2 2 0 0 1-2-2 2 2 0 0 1 2-2h4zm0 4v2a2 2 0 0 1-2 2 2 2 0 0 1-2-2 2 2 0 0 1 2-2h2z" fill="#F24E1E"/></svg>`,
  canva: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#00C4CC"/><path d="M14.5 9c-.6-.6-1.5-1-2.5-1-2.2 0-3.8 1.8-3.8 4 0 2.3 1.6 4 3.8 4 1.1 0 2-.4 2.6-1.1l-1-1c-.4.5-1 .8-1.6.8-1.4 0-2.3-1.1-2.3-2.7s.9-2.7 2.3-2.7c.6 0 1.2.3 1.6.7l.9-1z" fill="#ffffff"/></svg>`,
  coreldraw: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#00A651"/><path d="M7 6.5h10v11H7z" fill="none"/><path d="M8 8.5h8v7H8z" fill="#ffffff" rx="1.5"/></svg>`,
  affinitydesigner: `<svg viewBox="0 0 24 24"><path d="M12 2L2 19.5h5.5l1.8-3.3h5.4l1.8 3.3H22L12 2zm0 5.4l3.2 6H8.8l3.2-6z" fill="#00A8FF"/><path d="M9.3 16.2h5.4L12 11.2l-2.7 5z" fill="#1692E5"/></svg>`,
  affinityphoto: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#942069"/><path d="M12 5.5a6.5 6.5 0 1 0 6.5 6.5A6.5 6.5 0 0 0 12 5.5zm0 9.5a3 3 0 1 1 3-3 3 3 0 0 1-3 3z" fill="#E84A96"/><circle cx="12" cy="12" r="1.8" fill="#ffffff"/></svg>`,
  sketch: `<svg viewBox="0 0 24 24"><path d="M6 4l-4 5 10 11 10-11-4-5H6z" fill="#F7B500"/><path d="M12 20L6 9h12l-6 11z" fill="#FDB300"/><path d="M2 9l4-5h4l-2 5H2zm20 0l-4-5h-4l2 5h6z" fill="#EA6C00"/></svg>`,
  express: `<svg viewBox="0 0 24 24"><rect width="24" height="24" rx="4" fill="#EB1000"/><path d="M8 7h8v2H8zm0 4h8v2H8zm0 4h5v2H8z" fill="#ffffff"/></svg>`,
  notion: `<svg viewBox="0 0 24 24"><rect width="24" height="24" rx="4" fill="#000000"/><path d="M7 6.5l8.5.5c.6 0 1 .4 1 1v9.5l-8.5-.5c-.6 0-1-.4-1-1V6.5zm2 2.5v6.5l1.5.1v-3.8l3 3.9 1.5.1V9.2l-1.5-.1v3.7L10.5 8.9 9 9z" fill="#ffffff"/></svg>`,
  framer: `<svg viewBox="0 0 24 24"><path d="M5 3h14v6H12l7 6v6l-14-12h7V3z" fill="#0055FF"/></svg>`,
  webflow: `<svg viewBox="0 0 24 24"><path d="M18.8 7.3c-.6-.3-1.4-.4-2-.1-.7.3-1.2.9-1.5 1.6l-2.4 6-2-5.4c-.4-1.1-1.4-1.8-2.6-1.8-1.5 0-2.8 1.1-3 2.6L3 17.5h3.6l1.3-4.4 2.1 4.4h3.2l3.4-7.8c.2-.4.4-.7.8-.7.4 0 .8.2 1 .5l.4 8h3.6l-1.6-9.1c-.2-.7-.9-1-1.6-1.1z" fill="#146EF5"/></svg>`,
  protopie: `<svg viewBox="0 0 24 24"><rect width="24" height="24" rx="4" fill="#FF4000"/><path d="M7 6.5h5.5a4 4 0 0 1 4 4 4 4 0 0 1-4 4H9.5V17H7V6.5zm2.5 5.5h3a1.5 1.5 0 0 0 1.5-1.5 1.5 1.5 0 0 0-1.5-1.5h-3V12z" fill="#ffffff"/><path d="M13.5 10.5l4.5 4.5h-4.5v-4.5z" fill="#FFD000"/></svg>`,
  figjam: `<svg viewBox="0 0 24 24"><rect width="24" height="24" rx="4" fill="#9747FF"/><path d="M7 7.5h10v3H7zm0 6h6v3H7z" fill="#ffffff"/><circle cx="15.5" cy="15" r="1.5" fill="#00D2FF"/></svg>`,
  html5: `<svg viewBox="0 0 24 24"><path d="M4 3l1.5 16.5L12 22l6.5-2.5L20 3H4zm13.2 5.5H9.6l.2 2.2h7.1l-.6 6.3-4.3 1.2-4.3-1.2-.3-3.3h2.1l.1 1.7 2.1.6 2.1-.6.3-3.1H7.2L6.6 6.5h10.9l-.3 2z" fill="#E34F26"/></svg>`,
  css3: `<svg viewBox="0 0 24 24"><path d="M4 3l1.5 16.5L12 22l6.5-2.5L20 3H4zm13.2 5.5H9.6l.2 2.2h7.1l-.6 6.3-4.3 1.2-4.3-1.2-.3-3.3h2.1l.1 1.7 2.1.6 2.1-.6.3-3.1H7.2L6.6 6.5h10.9l-.3 2z" fill="#1572B6"/></svg>`,
  javascript: `<svg viewBox="0 0 24 24"><rect width="24" height="24" rx="4" fill="#F7DF1E"/><path d="M12.5 16.8c.4.6.9 1 1.8 1 .8 0 1.3-.4 1.3-1 0-.7-.5-1-1.5-1.4l-.5-.2c-1.5-.6-2.5-1.4-2.5-3 0-1.5 1.2-2.7 3-2.7 1.3 0 2.2.5 2.8 1.5l-1.3.8c-.3-.5-.7-.8-1.5-.8-.7 0-1.1.4-1.1.9 0 .6.4.9 1.4 1.3l.5.2c1.7.7 2.7 1.5 2.7 3.1 0 1.8-1.4 2.8-3.3 2.8-1.8 0-2.9-.9-3.4-1.9l1.6-.7zm-5.5.3c.3.4.6.6 1.2.6.6 0 1-.3 1-1.1v-6h1.9v6.1c0 1.8-1.1 2.6-2.7 2.6-1.5 0-2.4-.8-2.8-1.6l1.4-.6z" fill="#000000"/></svg>`,
  react: `<svg viewBox="0 0 24 24"><ellipse cx="12" cy="12" rx="4" ry="10" transform="rotate(30 12 12)" fill="none" stroke="#61DAFB" stroke-width="1.2"/><ellipse cx="12" cy="12" rx="4" ry="10" transform="rotate(90 12 12)" fill="none" stroke="#61DAFB" stroke-width="1.2"/><ellipse cx="12" cy="12" rx="4" ry="10" transform="rotate(150 12 12)" fill="none" stroke="#61DAFB" stroke-width="1.2"/><circle cx="12" cy="12" r="1.8" fill="#61DAFB"/></svg>`,
  nextjs: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#000000"/><path d="M15.5 8.5v7l-5.5-7H8v7h1.8v-4.5l4.5 5.7h1.2V8.5h-1.8z" fill="#ffffff"/></svg>`,
  threejs: `<svg viewBox="0 0 24 24"><path d="M12 2l9 5.2v10.4l-9 5.2-9-5.2V7.2L12 2zm0 2.3L5.3 8.2 12 12l6.7-3.8L12 4.3zm-7 5.5v6.4l7 4v-6.4l-7-4zm14 0l-7 4v6.4l7-4V9.8z" fill="#ffffff"/></svg>`,
  aftereffects: `<svg viewBox="0 0 24 24"><rect width="24" height="24" rx="4" fill="#00005B"/><path d="M6.5 16l3.2-9.5h1.6L14.5 16h-1.6l-.8-2.6H8.9L8.1 16H6.5zm2.8-3.9h2.4l-1.2-3.9-1.2 3.9zm6.2-.6c0-1.8 1.4-3.1 3.2-3.1 1.7 0 3 1.2 3 3.1v.6h-4.6c.1 1 .8 1.7 1.8 1.7.7 0 1.3-.3 1.7-.8l1 1c-.7.8-1.6 1.3-2.8 1.3-2.1 0-3.3-1.6-3.3-3.8zm3.2-1.7c-.8 0-1.4.6-1.5 1.4h3.1c-.1-.8-.7-1.4-1.6-1.4z" fill="#9999FF"/></svg>`,
  animate: `<svg viewBox="0 0 24 24"><rect width="24" height="24" rx="4" fill="#2E001F"/><path d="M6.5 16l3.2-9.5h1.6L14.5 16h-1.6l-.8-2.6H8.9L8.1 16H6.5zm2.8-3.9h2.4l-1.2-3.9-1.2 3.9zm5.7 3.9V9.7h1.5v1.2c.4-.8 1.3-1.4 2.2-1.4 1.7 0 2.6 1.1 2.6 2.8V16H17v-3.5c0-.9-.4-1.4-1.2-1.4-.7 0-1.3.6-1.3 1.5V16H15z" fill="#FF5C00"/></svg>`,
  motion: `<svg viewBox="0 0 24 24"><rect width="24" height="24" rx="4" fill="#1C1C1E"/><path d="M6 16V8l4 4.5L14 8v8h-1.8v-4.8L10 13.8l-2.2-2.6V16H6z" fill="#007AFF"/></svg>`,
  premiere: `<svg viewBox="0 0 24 24"><rect width="24" height="24" rx="4" fill="#260033"/><path d="M7 6.5h3.2c1.7 0 2.8.9 2.8 2.4 0 1.6-1.1 2.5-2.8 2.5H8.7v4.6H7V6.5zm1.7 3.5h1.3c.8 0 1.3-.4 1.3-1.1 0-.7-.5-1.1-1.3-1.1H8.7V10zm5.6 6V9.7h1.5v1.2c.4-.8 1.2-1.4 2.1-1.4.3 0 .6.1.8.2l-.4 1.5c-.3-.1-.6-.2-.9-.2-1 0-1.6.8-1.6 2V16h-1.5z" fill="#EA77FF"/></svg>`,
  davinci: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#1E2024"/><circle cx="12" cy="8" r="3" fill="#E84A5F"/><circle cx="8" cy="15" r="3" fill="#4B89DC"/><circle cx="16" cy="15" r="3" fill="#FFCE54"/></svg>`,
  finalcut: `<svg viewBox="0 0 24 24"><rect width="24" height="24" rx="4" fill="#2C2C2E"/><path d="M7 7h10l-2 5H5L7 7zm-3 7h14l-2 4H2l2-4z" fill="#00D2FF"/></svg>`,
  capcut: `<svg viewBox="0 0 24 24"><rect width="24" height="24" rx="4" fill="#000000"/><path d="M6 8l5 4-5 4V8zm12 0v8l-5-4 5-4z" fill="#ffffff"/></svg>`,
  blender: `<svg viewBox="0 0 24 24"><circle cx="12" cy="13" r="3" fill="#ffffff"/><path d="M12 7a6 6 0 1 0 6 6 6 6 0 0 0-6-6zm0 9a3 3 0 1 1 3-3 3 3 0 0 1-3 3z" fill="#E87D0D"/><path d="M5 6l6 3M19 6l-6 3" stroke="#E87D0D" stroke-width="2" stroke-linecap="round"/></svg>`,
  unreal: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#0E1118"/><path d="M12 4a8 8 0 0 0-6.9 12l2.3-1.3A5.4 5.4 0 1 1 12 17.4v2.6A8 8 0 0 0 12 4z" fill="#ffffff"/></svg>`,
  unity: `<svg viewBox="0 0 24 24"><path d="M12 2l8 4.6v9.2L12 20.4 4 15.8V6.6L12 2zm0 3.2L6.8 8v5.5l5.2 2.8 5.2-2.8V8L12 5.2z" fill="#ffffff"/></svg>`,
  lightroom: `<svg viewBox="0 0 24 24"><rect width="24" height="24" rx="4" fill="#001E36"/><path d="M7 6.5h1.7V14h3.5v1.5H7V6.5zm6.5 4.7h1.4v1.1c.4-.7 1.1-1.3 2-1.3.3 0 .6.1.8.2l-.4 1.4c-.3-.1-.5-.1-.8-.1-.9 0-1.5.7-1.5 1.8V16h-1.5v-4.8z" fill="#31A8FF"/></svg>`,
  midjourney: `<svg viewBox="0 0 24 24"><rect width="24" height="24" rx="4" fill="#12141A"/><path d="M7 16V8l5 4 5-4v8l-5-3-5 3z" fill="#ffffff"/></svg>`,
  firefly: `<svg viewBox="0 0 24 24"><rect width="24" height="24" rx="4" fill="#331A00"/><path d="M12 4l2.5 5.5L20 12l-5.5 2.5L12 20l-2.5-5.5L4 12l5.5-2.5L12 4z" fill="#FF7700"/></svg>`,
  stablediffusion: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#0F172A"/><path d="M8 8h3v3H8zm5 0h3v3h-3zm-5 5h3v3H8zm5 0h3v3h-3z" fill="#38BDF8"/></svg>`,
  flux: `<svg viewBox="0 0 24 24"><rect width="24" height="24" rx="4" fill="#000000"/><path d="M7 7h10v2H7zm0 4h7v2H7zm0 4h9v2H7z" fill="#00F0FF"/></svg>`,
  dalle: `<svg viewBox="0 0 24 24"><rect width="24" height="24" rx="4" fill="#10A37F"/><path d="M12 6v12m-6-6h12" stroke="#ffffff" stroke-width="2.5" stroke-linecap="square"/></svg>`,
  adobexd: `<svg viewBox="0 0 24 24"><rect width="24" height="24" rx="4" fill="#470137"/><path d="M7 6.5h3.2c1.7 0 2.8.9 2.8 2.4 0 1.6-1.1 2.5-2.8 2.5H8.7v4.6H7V6.5zm1.7 3.5h1.3c.8 0 1.3-.4 1.3-1.1 0-.7-.5-1.1-1.3-1.1H8.7V10zm5.6 6l2.4-4.8 2.3 4.8h1.9l-3.3-6.6 3.1-6.2h-1.9l-2.1 4.5-2.1-4.5h-1.9l3.1 6.2-3.3 6.6h1.8z" fill="#FF61F6"/></svg>`,
  cinema4d: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#00186B"/><path d="M12 5.5A6.5 6.5 0 1 0 18.5 12h-3A3.5 3.5 0 1 1 12 8.5v-3z" fill="#ffffff"/><circle cx="12" cy="12" r="2" fill="#00D2FF"/></svg>`,
  maya: `<svg viewBox="0 0 24 24"><rect width="24" height="24" rx="4" fill="#001824"/><path d="M6 16.5l3-9h2.2l2.3 6 2.3-6H18l3 9h-2l-1.8-5.5-2.2 5.5h-1.5l-2.2-5.5L7.8 16.5H6z" fill="#00C4D4"/></svg>`,
  threedsmax: `<svg viewBox="0 0 24 24"><rect width="24" height="24" rx="4" fill="#001D21"/><path d="M7 6.5h3.5c1.4 0 2.3.7 2.3 1.8 0 .8-.5 1.4-1.3 1.6 1 .3 1.6 1 1.6 2 0 1.3-1.1 2.1-2.6 2.1H7V6.5zm1.8 3.1h1.5c.5 0 .8-.3.8-.7s-.3-.7-.8-.7H8.8v1.4zm0 2.9h1.7c.6 0 .9-.3.9-.8s-.3-.8-.9-.8H8.8v1.6zm6-4.5l2 3.8 2-3.8h2l-3 5.5 3.2 5.5h-2.1l-2.1-4-2.1 4h-2.1l3.2-5.5-3-5.5h2z" fill="#00A88F"/></svg>`,
  houdini: `<svg viewBox="0 0 24 24"><rect width="24" height="24" rx="4" fill="#1C1004"/><path d="M6.5 5h3v5.2h5V5h3v14h-3v-6h-5v6h-3V5z" fill="#FF5E00"/></svg>`,
  runway: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#0D0D12"/><path d="M7 7h10v2H7zm0 4h10v2H7zm0 4h6v2H7z" fill="#E2E8F0"/><circle cx="16.5" cy="16" r="1.5" fill="#38BDF8"/></svg>`,
  kling: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#111827"/><path d="M7 6.5h2.5v4.2L13.8 6.5h3.2L12 11.8l5.2 5.7h-3.3L9.5 13v4.5H7V6.5z" fill="#A855F7"/></svg>`,
  luma: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#0A0E1A"/><circle cx="12" cy="12" r="5" fill="#3B82F6"/><circle cx="12" cy="12" r="2" fill="#ffffff"/></svg>`,
  leonardo: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#181126"/><path d="M12 4l6.5 5.5-2.5 9.5h-8L5.5 9.5 12 4z" fill="none" stroke="#A855F7" stroke-width="1.5"/><circle cx="12" cy="12" r="3" fill="#EC4899"/></svg>`,
  vscode: `<svg viewBox="0 0 24 24"><path d="M17.8 2.2l-8.6 7.9L4.6 6.5 2 7.8v8.4l2.6 1.3 4.6-3.6 8.6 7.9 4.2-2.1V4.3l-4.2-2.1zm-8.6 11.2l-3.8 2.9v-4.6l3.8 1.7zm8.6 4.3l-6.8-5.7 6.8-5.7v11.4z" fill="#007ACC"/></svg>`,
  github: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>`,
  principle: `<svg viewBox="0 0 24 24"><rect width="24" height="24" rx="4" fill="#5B5EA6"/><path d="M7 6.5h5.5a3.5 3.5 0 0 1 0 7H9.5V17H7V6.5zm2.5 4.8h3a1.3 1.3 0 0 0 0-2.6h-3v2.6z" fill="#ffffff"/><circle cx="15.5" cy="15.5" r="2" fill="#00D2FF"/></svg>`,
  rive: `<svg viewBox="0 0 24 24"><rect width="24" height="24" rx="4" fill="#000000"/><path d="M7 6.5h5.5c2 0 3.5 1.3 3.5 3.2 0 1.5-.9 2.6-2.2 3l2.8 4.3H14l-2.4-3.8H9.5V17H7V6.5zm2.5 4.8h3c.8 0 1.4-.5 1.4-1.2 0-.7-.6-1.2-1.4-1.2h-3v2.4z" fill="#00E5FF"/></svg>`,
  spline: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#0A0E1A"/><path d="M12 4l7 4-7 4-7-4 7-4zm-7 6.5l7 4v6.5l-7-4v-6.5zm14 0v6.5l-7 4v-6.5l7-4z" fill="none" stroke="#38BDF8" stroke-width="1.3"/></svg>`,
  miro: `<svg viewBox="0 0 24 24"><rect width="24" height="24" rx="4" fill="#FFD02F"/><path d="M7 6.5l3.2 5.5L7 17.5h2.5l3.2-5.5-3.2-5.5H7zm4.5 0l3.2 5.5-3.2 5.5h2.5l3.2-5.5-3.2-5.5h-2.5z" fill="#050038"/></svg>`,
  python: `<svg viewBox="0 0 24 24"><path d="M11.9 2c-3.1 0-2.9 1.3-2.9 1.3v1.4h5.9v.9H6.6s-1.8.2-1.8 2.7 1.6 2.6 1.6 2.6h1v-1.3c0-1.5 1.3-1.4 1.3-1.4h5.7s1.3 0 1.3-1.3V3.3S15.9 2 11.9 2zm-1.6 1.1c.4 0 .7.3.7.7s-.3.7-.7.7-.7-.3-.7-.7.3-.7.7-.7z" fill="#3776AB"/><path d="M12.1 22c3.1 0 2.9-1.3 2.9-1.3v-1.4H9.1v-.9h8.3s1.8-.2 1.8-2.7-1.6-2.6-1.6-2.6h-1v1.3c0 1.5-1.3 1.4-1.3 1.4H9.6s-1.3 0-1.3 1.3v5.6s-.2 1.3 3.8 1.3zm1.6-1.1c-.4 0-.7-.3-.7-.7s.3-.7.7-.7.7.3.7.7-.3.7-.7.7z" fill="#FFD438"/></svg>`,
  java: `<svg viewBox="0 0 24 24"><path d="M9.5 18.2s-1.5.1-.8.9c.9.9 2.2 1 3.5.7 1.3-.3 2.3-.9 2.3-.9s-.7.3-1.7.5c-1.4.2-2.8 0-3.3-1.2zm-.6-2.4s-1.7.2-.8 1.1c1.2 1.2 3.1 1.1 5 .7 1.5-.3 2.5-.9 2.5-.9s-.8.3-2 .5c-1.8.3-3.6.1-4.7-1.4zm5.5-5.3c.7 1.5-.4 2.8-.4 2.8s1.6-.8 1.2-2.5c-.4-1.5-1.9-2.2-1.9-2.2s.3.4.7 1.2c.4.8.4.7.4.7zm-2.8-4.5c.8 1.2-.3 2.5-.3 2.5s1.3-.7.9-2.1c-.3-1.2-1.6-1.8-1.6-1.8s.3.4.6 1c.4.4.4.4.4.4zm3.6 8.7c.3-.3.5-.7.5-1.1 0-.9-.7-1.6-1.6-1.6h-.3c.4-.7.6-1.4.5-2.2-.2-1.5-1.4-2.7-2.9-2.8-.3 0-.6 0-.8.1.1-.3.2-.6.2-.9 0-1.3-.9-2.4-2.2-2.7-.3-.1-.6-.1-.9 0 .4.4.6 1 .4 1.5-.2.8-1 1.3-1.8 1.1-.3-.1-.5-.2-.7-.4.2.8.7 1.5 1.4 1.9.4.2.9.3 1.4.2-.1.4-.2.8-.2 1.2 0 1.9 1.4 3.5 3.3 3.7h.3c-.2.3-.3.6-.3 1 0 .6.3 1.1.8 1.4-1.9.2-3.8-.1-4.8-1.6-.3-.4-.7-.5-1.1-.4s-.7.6-.6 1c.5 1.5 1.8 2.6 3.4 2.9 1.8.4 3.8.3 5.4-.5.8-.4 1.2-1.2 1-2.1z" fill="#EA2D2E"/></svg>`,
  cpp: `<svg viewBox="0 0 24 24"><path d="M12 2l9 5.2v10.4l-9 5.2-9-5.2V7.2L12 2z" fill="#00599C"/><path d="M11 8.5a4 4 0 0 0-3.5 2.1 4 4 0 0 0 0 3.8A4 4 0 0 0 11 16.5c1.4 0 2.5-.7 3.1-1.7l-1.6-.9c-.4.6-.9.9-1.5.9-1.1 0-2-.7-2.3-1.7h5.8v-1H8.7c.3-1 1.2-1.7 2.3-1.7.6 0 1.1.3 1.5.9l1.6-.9C13.5 9.2 12.4 8.5 11 8.5zm5.5 2.5v1.2h-1.2v1.6h1.2v1.2h1.6v-1.2h1.2v-1.6h-1.2V11h-1.6zm4 0v1.2h-1.2v1.6h1.2v1.2h1.6v-1.2h1.2v-1.6h-1.2V11h-1.6z" fill="#ffffff"/></svg>`,
  nodejs: `<svg viewBox="0 0 24 24"><path d="M12 2l9 5.2v10.4l-9 5.2-9-5.2V7.2L12 2z" fill="#339933"/><path d="M12 6.5l5.2 3v6l-5.2 3-5.2-3v-6l5.2-3z" fill="#ffffff" opacity="0.2"/><path d="M10 9.5h4v1.5h-2.5v1.2h2v1.5h-2v1.8H10V9.5z" fill="#ffffff"/></svg>`,
  sql: `<svg viewBox="0 0 24 24"><ellipse cx="12" cy="6" rx="8" ry="3" fill="#00758F"/><path d="M4 6v5c0 1.66 3.58 3 8 3s8-1.34 8-3V6" fill="none" stroke="#00758F" stroke-width="1.8"/><path d="M4 11v5c0 1.66 3.58 3 8 3s8-1.34 8-3v-5" fill="none" stroke="#00758F" stroke-width="1.8"/></svg>`,
  git: `<svg viewBox="0 0 24 24"><path d="M21.6 10.9L13.1 2.4a1.6 1.6 0 0 0-2.3 0L8.6 4.6l3 3a1.9 1.9 0 0 1 2.4 2.4l2.9 2.9a1.9 1.9 0 1 1-1.2 1.2l-2.7-2.7v4.4a1.9 1.9 0 1 1-1.7 0V11a1.9 1.9 0 0 1-1-2.5l-3-3L2.4 10.8a1.6 1.6 0 0 0 0 2.3l8.5 8.5a1.6 1.6 0 0 0 2.3 0l8.4-8.4a1.6 1.6 0 0 0 0-2.3z" fill="#F05032"/></svg>`
};

class PortfolioApp {
  constructor() {
    this.activeFilter = 'ALL';
    this.searchQuery = '';
    this.viewMode = 'grid'; // 'grid' | 'list'
    this.lightbox = null;
    this.threeViewer = null;
    this.motionPlayer = null;
    this.interactivity = null;

    this.init();
  }

  init() {
    window.app = this;

    // 1. Initialize Motion Background Video Player
    this.motionPlayer = new MotionBackgroundPlayer('bg-video');

    // 2. Initialize Lightbox
    this.lightbox = new Lightbox();

    // 3. Setup Editorial Scroll Reading Progress & Keyboard Power Navigation
    this.setupScrollProgress();
    this.setupKeyboardNavigation();

    // 4. Render All Dynamic Content
    this.renderHero();
    this.initHeroConnectButton();
    this.renderDisciplines();
    this.renderSelectedWork();
    this.renderAllWork();
    this.renderExperience();
    this.renderServices();
    this.renderTools();
    this.renderContact();

    // 5. Initialize 3D Interactive Viewer
    this.initThreeViewer();

    // 6. Navigation & Routing
    this.setupNavigation();
    this.setupMagneticCTA();
    this.initModalAmbientEngine();
    this.setupModalRouting();
    this.setupTimeClock();
    this.setupAudioSound();

    // 7. High-Impact Restrained Interactivity Engine
    this.interactivity = new InteractivityEngine();

    // 8. Editorial Section Entrance Choreography
    this.setupSectionEntrance();
  }

  /* ------------------------------------------------------------------------
     HERO SECTION
     ------------------------------------------------------------------------ */
  renderHero() {
    const nameEl = document.getElementById('hero-name');
    const roleEl = document.getElementById('hero-role');
    const disciplinesEl = document.getElementById('hero-disciplines');
    const statusEl = document.getElementById('hero-status');
    const introEl = document.getElementById('intro-text');

    if (nameEl) nameEl.textContent = PORTFOLIO_INFO.name;
    if (roleEl) roleEl.textContent = PORTFOLIO_INFO.role;
    if (disciplinesEl && !disciplinesEl.classList.contains('hero-marquee-wrap')) {
      disciplinesEl.textContent = PORTFOLIO_INFO.disciplinesText;
    }
    if (statusEl) statusEl.textContent = PORTFOLIO_INFO.status;
    if (introEl) introEl.textContent = PORTFOLIO_INFO.intro;
  }

  /* ------------------------------------------------------------------------
     HERO ROTATING CONNECT CTA BUTTON
     Continuous editorial rotation with synchronized motion background texture
     ------------------------------------------------------------------------ */
  initHeroConnectButton() {
    const btn = document.getElementById('hero-connect-btn');
    const viewport = document.getElementById('hero-connect-viewport');
    const canvas = document.getElementById('hero-connect-canvas');
    if (!btn || !viewport) return;

    let isHovered = false;

    // 1. Synchronized Motion Texture on internal button canvas
    if (canvas && this.motionPlayer && typeof this.motionPlayer.registerFrameObserver === 'function') {
      const ctx = canvas.getContext('2d');
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

      const resizeCanvas = () => {
        const rect = canvas.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) {
          const w = Math.round(rect.width * dpr);
          const h = Math.round(rect.height * dpr);
          if (canvas.width !== w || canvas.height !== h) {
            canvas.width = w;
            canvas.height = h;
          }
        }
      };

      resizeCanvas();
      window.addEventListener('resize', resizeCanvas, { passive: true });

      this.motionPlayer.registerFrameObserver((source) => {
        if (!canvas.width || !canvas.height) resizeCanvas();
        if (!canvas.width || !canvas.height || !source) return;

        const cw = canvas.width;
        const ch = canvas.height;
        const nw = source.naturalWidth || source.videoWidth || source.width || 640;
        const nh = source.naturalHeight || source.videoHeight || source.height || 360;
        if (nw === 0 || nh === 0) return;

        // Cover fill algorithm preserving aspect ratio
        const scale = Math.max(cw / nw, ch / nh);
        const sw = nw * scale;
        const sh = nh * scale;
        const dx = (cw - sw) / 2;
        const dy = (ch - sh) / 2;

        ctx.drawImage(source, dx, dy, sw, sh);
      });

      // On-demand sampling lifecycle: sample ONLY when Connect button is in viewport and active
      let isButtonIntersecting = true;
      const updateSamplingState = () => {
        const shouldSample = isButtonIntersecting && !isHovered && !document.hidden;
        if (typeof this.motionPlayer.setSamplingActive === 'function') {
          this.motionPlayer.setSamplingActive(shouldSample);
        }
      };

      if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            isButtonIntersecting = entry.isIntersecting;
            updateSamplingState();
          });
        }, { threshold: 0.05 });
        observer.observe(btn);
      }

      this.updateConnectSamplingState = updateSamplingState;
      updateSamplingState();
    }

    // 2. Continuous Sequential Phrase Rotation
    const PHRASES = [
      'CONNECT',
      'MAKE SOMETHING',
      'COLLABORATE',
      'START A PROJECT',
      "LET'S TALK",
      'SAY HELLO',
      'WORK TOGETHER'
    ];

    let currentIndex = 0;
    const ROTATION_INTERVAL = 2800; // ~2.8 seconds per phrase

    const rotatePhrase = () => {
      // Don't rotate if tab is in the background
      if (document.hidden) return;

      const nextIndex = (currentIndex + 1) % PHRASES.length;
      const nextText = PHRASES[nextIndex];
      const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      const currentPhraseEl = viewport.querySelector('.hero-connect-phrase--current');

      if (isReducedMotion) {
        if (currentPhraseEl) {
          currentPhraseEl.textContent = nextText;
        }
        currentIndex = nextIndex;
        return;
      }

      // Smooth vertical reel transition
      const nextPhraseEl = document.createElement('span');
      nextPhraseEl.className = 'hero-connect-phrase hero-connect-phrase--enter';
      nextPhraseEl.textContent = nextText;
      viewport.appendChild(nextPhraseEl);

      if (currentPhraseEl) {
        currentPhraseEl.classList.remove('hero-connect-phrase--current');
        currentPhraseEl.classList.add('hero-connect-phrase--exit');
        setTimeout(() => {
          if (currentPhraseEl.parentNode === viewport) {
            currentPhraseEl.remove();
          }
        }, 500);
      }

      // Force layout reflow so the transition fires reliably
      void nextPhraseEl.offsetHeight;

      nextPhraseEl.classList.remove('hero-connect-phrase--enter');
      nextPhraseEl.classList.add('hero-connect-phrase--current');

      currentIndex = nextIndex;
    };

    // Continuous indefinite rotation
    let rotationTimer = setInterval(rotatePhrase, ROTATION_INTERVAL);

    const pauseRotation = () => {
      if (rotationTimer) {
        clearInterval(rotationTimer);
        rotationTimer = null;
      }
    };

    const resumeRotation = () => {
      if (!rotationTimer && !isHovered && !document.hidden) {
        rotationTimer = setInterval(rotatePhrase, ROTATION_INTERVAL);
      }
    };

    // On hover: Freeze the current text, stop text animation
    btn.addEventListener('mouseenter', () => {
      isHovered = true;
      pauseRotation();
      if (this.updateConnectSamplingState) this.updateConnectSamplingState();

      // Cleanly resolve any in-flight transition so text is firmly frozen
      const exiting = viewport.querySelectorAll('.hero-connect-phrase--exit');
      exiting.forEach((el) => el.remove());
      const entering = viewport.querySelectorAll('.hero-connect-phrase--enter');
      entering.forEach((el) => {
        el.classList.remove('hero-connect-phrase--enter');
        el.classList.add('hero-connect-phrase--current');
      });
    });

    // When pointer leaves: Resume the text movement
    btn.addEventListener('mouseleave', () => {
      isHovered = false;
      resumeRotation();
      if (this.updateConnectSamplingState) this.updateConnectSamplingState();
    });

    // Pause on hidden tab to save CPU/battery, resume when tab is active
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        pauseRotation();
      } else {
        resumeRotation();
      }
      if (this.updateConnectSamplingState) this.updateConnectSamplingState();
    });
  }

  /* ------------------------------------------------------------------------
     DISCIPLINES SECTION
     Visual Matrix with Authentic Project References & Zero Touch Interruption
     ------------------------------------------------------------------------ */
  renderDisciplines() {
    const container = document.getElementById('disciplines-grid');
    if (!container) return;

    // Authentic visual mapping referencing existing project assets
    const disciplineVisuals = {
      'branding': 'assets/projects/branding/zesis/ZESIS (1).jpeg',
      'graphic-design': 'assets/projects/graphic/mus26/MUS26.jpeg',
      'poster-print': 'assets/projects/poster-print/emysc/EMYSC_01.jpeg',
      'digital-design': 'assets/projects/digital/mkegg/MKEGG (1).jpeg',
      'ui-ux': 'assets/projects/ui/arimm/ARIMM (1).jpeg',
      'motion': 'assets/projects/digital/atllis/ATLLIS (1).jpeg',
      '3d-design': 'assets/3d/EARTH3D.webp',
      'image-making': 'assets/projects/poster-print/tekzzo/TEKZZO_01.jpeg',
      'art-direction': 'assets/projects/digital/logeer/LOGEER (1).jpeg',
      'experimental-media': 'assets/projects/graphic/stdeed/Stdeed.jpeg'
    };

    container.innerHTML = DISCIPLINES.map((d) => {
      const visualSrc = disciplineVisuals[d.id] || '';
      return `
        <div class="discipline-card discipline-${d.number}" data-discipline="${d.name}" tabindex="0" role="button" aria-label="Explore ${d.name} projects in archive">
          ${visualSrc ? `<div class="discipline-card-bg-visual" data-bg-src="${visualSrc}" aria-hidden="true"></div>` : ''}
          <div class="discipline-card-header">
            <span class="discipline-card-number">${d.number}</span>
            <span class="discipline-card-kicker">${d.kicker}</span>
          </div>
          <div class="discipline-card-content">
            <h3 class="discipline-card-title">${d.name}</h3>
            <p class="discipline-card-desc">${d.description}</p>
          </div>
          <div class="discipline-card-detail">
            <span>${d.detail}</span>
            <span class="discipline-card-view-link">VIEW INDEX ↗</span>
          </div>
        </div>
      `;
    }).join('');

    // Lazy-hydrate card background images when Section approaches viewport
    const hydrateVisuals = () => {
      container.querySelectorAll('.discipline-card-bg-visual[data-bg-src]').forEach((el) => {
        const src = el.getAttribute('data-bg-src');
        if (src) {
          el.style.backgroundImage = `url('${src}')`;
          el.removeAttribute('data-bg-src');
        }
      });
    };

    const discSection = document.getElementById('disciplines');
    if ('IntersectionObserver' in window && discSection) {
      const discObserver = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            hydrateVisuals();
            discObserver.disconnect();
          }
        });
      }, { rootMargin: '300px 0px' });
      discObserver.observe(discSection);
    } else {
      setTimeout(hydrateVisuals, 2000);
    }

    // Clicking or pressing Enter/Space on a discipline card filters All Work and scrolls down smoothly
    container.querySelectorAll('.discipline-card').forEach((card) => {
      // Immediate hydration on pointer hover/focus
      card.addEventListener('pointerenter', () => {
        const bg = card.querySelector('.discipline-card-bg-visual[data-bg-src]');
        if (bg) {
          bg.style.backgroundImage = `url('${bg.getAttribute('data-bg-src')}')`;
          bg.removeAttribute('data-bg-src');
        }
      }, { once: true, passive: true });

      const activate = () => {
        const discName = card.getAttribute('data-discipline');
        this.setFilter(discName);
        const target = document.getElementById('archive') || document.getElementById('all-work');
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      };
      card.addEventListener('click', activate);
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          activate();
        }
      });
    });
  }

  /* ------------------------------------------------------------------------
     SELECTED WORK (EDITORIAL CURATION)
     Strict Hierarchy: Number / Title / Discipline & Year / Visual / View Project
     ------------------------------------------------------------------------ */
  renderSelectedWork() {
    const container = document.getElementById('selected-work-grid');
    if (!container) return;

    // Strict 4 Curated Projects in exact order (Zero numbering, clean editorial alignment)
    const FEATURED_IDS = ['zesis', 'emysc', 'mkegg', 'arimm'];
    const selectedProjects = FEATURED_IDS
      .map((id) => PROJECTS.find((p) => p.id === id))
      .filter(Boolean);

    container.innerHTML = selectedProjects.map((p, idx) => {
      const secPills = (p.secondaryCategories || []).map((c) => `<span class="pill-secondary">${c}</span>`).join('');
      const heroImg = p.heroImage || (p.images[0] ? p.images[0].src : '');

      return `
        <article class="editorial-project-row" data-project-id="${p.id}" data-category="${p.primaryCategory}">
          <div class="project-media-col">
            <div class="project-row-lead">
              <div class="project-heading-group">
                <h3 class="project-entry-title" data-open-project="${p.id}">${p.title}</h3>
                <div class="project-meta-strip">
                  <span class="project-strip-cat">${p.primaryCategory}</span>
                  <span class="project-strip-sep">&bull;</span>
                  <span class="project-strip-year">${p.year}</span>
                </div>
              </div>
            </div>
            <div class="project-visual-frame" data-open-project="${p.id}" data-category="${p.primaryCategory}" data-aspect="${p.aspect || 'wide'}" tabindex="0" role="button" aria-label="Open case study for ${p.title}">
              <img src="${heroImg}" alt="${p.title} — ${p.subtitle}" ${idx === 0 ? 'loading="eager" fetchpriority="high"' : 'loading="lazy"'} decoding="async" />
            </div>
          </div>
          <div class="project-info-col">
            <div class="project-meta-pills">
              <span class="pill-category" data-category="${p.primaryCategory}">${p.primaryCategory}</span>
              ${secPills}
            </div>
            <p class="project-entry-subtitle">${p.subtitle}</p>
            <p class="project-entry-desc">${p.description}</p>
            <div class="project-footer-action">
              <button type="button" class="archive-card-action-btn project-editorial-btn" data-project-id="${p.id}" data-open-project="${p.id}" aria-label="View Project ${p.title}">
                <span class="btn-label-text">VIEW PROJECT</span>
                <span class="btn-arrow-icon" aria-hidden="true">↗</span>
              </button>
            </div>
          </div>
        </article>
      `;
    }).join('');

    // Attach open project triggers
    container.querySelectorAll('[data-open-project]').forEach((el) => {
      el.addEventListener('click', (e) => {
        const pid = el.getAttribute('data-open-project');
        this.openProjectModal(pid);
      });
      el.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const pid = el.getAttribute('data-open-project');
          this.openProjectModal(pid);
        }
      });
    });

    if (this.interactivity && typeof this.interactivity.refreshCards === 'function') {
      this.interactivity.refreshCards();
    }
  }

  /* ------------------------------------------------------------------------
     ALL WORK ARCHIVE & HORIZONTAL MARQUEE (Section 12-16)
     ------------------------------------------------------------------------ */
  renderAllWork() {
    const marqueeContainer = document.getElementById('archive-marquee-container');
    const filterContainer = document.getElementById('filter-bar');
    const gridContainer = document.getElementById('archive-grid');

    // 1. Render Infinite Horizontal Project Marquee (Section 12-16)
    if (marqueeContainer) {
      const projectItemsHTML = PROJECTS.map((p, idx) => `
        <div class="archive-marquee-card" data-open-project="${p.id}" tabindex="0" role="button" aria-label="Open ${p.title} Case Study">
          <div class="archive-card-strip">
            <span class="archive-item-num">ARCH-${String(idx + 1).padStart(2, '0')}</span>
            <span class="archive-item-cat" data-category="${p.primaryCategory}">${p.primaryCategory}</span>
            <span class="archive-item-year">${p.year}</span>
          </div>
          <div class="archive-card-main">
            <h3 class="archive-item-title">${p.title}</h3>
            <span class="archive-item-arrow" aria-hidden="true">→</span>
          </div>
          <div class="archive-card-sub">
            <span>${p.subtitle || p.description}</span>
          </div>
        </div>
      `).join('');

      // Track A + Track B for seamless infinite horizontal loop
      marqueeContainer.innerHTML = `
        <div class="archive-marquee-track">
          ${projectItemsHTML}
          ${projectItemsHTML}
        </div>
      `;

      // Attach click and keyboard triggers on marquee cards
      marqueeContainer.querySelectorAll('[data-open-project]').forEach((card) => {
        card.addEventListener('click', () => {
          const pid = card.getAttribute('data-open-project');
          this.openProjectModal(pid);
        });
        card.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            const pid = card.getAttribute('data-open-project');
            this.openProjectModal(pid);
          }
        });
      });
    }

    // 2. Render Catalog Filter Pills & Specimen Grid
    if (filterContainer && gridContainer) {
      const filterCategories = [
        'ALL',
        'BRANDING',
        'GRAPHIC DESIGN',
        'POSTER & PRINT',
        'DIGITAL DESIGN',
        'UI/UX DESIGN',
        'MOTION DESIGN',
        '3D DESIGN',
        'IMAGE MAKING',
        'ART DIRECTION',
        'EXPERIMENTAL MEDIA'
      ];

      const counts = {};
      filterCategories.forEach((cat) => {
        if (cat === 'ALL') {
          counts[cat] = PROJECTS.length;
        } else {
          counts[cat] = PROJECTS.filter((p) => {
            const primMatch = p.primaryCategory.toUpperCase() === cat.toUpperCase();
            const secMatch = (p.secondaryCategories || []).some((sc) => sc.toUpperCase() === cat.toUpperCase());
            return primMatch || secMatch;
          }).length;
        }
      });

      filterContainer.innerHTML = filterCategories.map((cat) => `
        <button
          type="button"
          class="filter-pill-btn ${cat === this.activeFilter ? 'active' : ''}"
          data-filter="${cat}"
          data-category="${cat}"
        >
          <span>${cat}</span>
          <span class="pill-count">(${counts[cat] || 0})</span>
        </button>
      `).join('');

      filterContainer.querySelectorAll('.filter-pill-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
          const cat = btn.getAttribute('data-filter');
          this.setFilter(cat);
        });
      });

      // Defer initial archive grid rendering until Section 04 approaches viewport
      const archiveSection = document.getElementById('archive');
      let archiveGridRendered = false;
      const loadArchiveGrid = () => {
        if (archiveGridRendered) return;
        archiveGridRendered = true;
        this.renderFilteredArchiveGrid();
      };
      this.ensureArchiveGrid = loadArchiveGrid;

      if ('IntersectionObserver' in window && archiveSection) {
        const obs = new IntersectionObserver((entries) => {
          entries.forEach(e => {
            if (e.isIntersecting) {
              loadArchiveGrid();
              obs.disconnect();
            }
          });
        }, { rootMargin: '600px 0px' });
        obs.observe(archiveSection);
      } else {
        setTimeout(loadArchiveGrid, 2500);
      }

      // Initialize Real-time Search and View Mode Toggle Controls
      this.setupArchiveControls();
    }
  }

  setupArchiveControls() {
    const searchInput = document.getElementById('archive-search-input');
    const searchClear = document.getElementById('archive-search-clear');
    const gridBtn = document.getElementById('archive-view-grid');
    const listBtn = document.getElementById('archive-view-list');

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.searchQuery = e.target.value;
        if (searchClear) {
          searchClear.style.display = this.searchQuery ? 'flex' : 'none';
        }
        if (this.ensureArchiveGrid) this.ensureArchiveGrid();
        this.renderFilteredArchiveGrid();
      });

      // Clear search when ESC is pressed while focused in search input
      searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          if (this.searchQuery) {
            e.stopPropagation();
            this.searchQuery = '';
            searchInput.value = '';
            if (searchClear) searchClear.style.display = 'none';
            this.renderFilteredArchiveGrid();
          }
        }
      });
    }

    if (searchClear) {
      searchClear.addEventListener('click', () => {
        this.searchQuery = '';
        if (searchInput) {
          searchInput.value = '';
          searchInput.focus();
        }
        searchClear.style.display = 'none';
        if (this.ensureArchiveGrid) this.ensureArchiveGrid();
        this.renderFilteredArchiveGrid();
      });
    }

    const setViewMode = (mode) => {
      this.viewMode = mode;
      if (gridBtn) {
        gridBtn.classList.toggle('active', mode === 'grid');
        gridBtn.setAttribute('aria-pressed', mode === 'grid' ? 'true' : 'false');
      }
      if (listBtn) {
        listBtn.classList.toggle('active', mode === 'list');
        listBtn.setAttribute('aria-pressed', mode === 'list' ? 'true' : 'false');
      }
      if (this.ensureArchiveGrid) this.ensureArchiveGrid();
      this.renderFilteredArchiveGrid();
    };

    if (gridBtn) {
      gridBtn.addEventListener('click', () => setViewMode('grid'));
    }
    if (listBtn) {
      listBtn.addEventListener('click', () => setViewMode('list'));
    }
  }

  setFilter(category) {
    this.activeFilter = category;
    const buttons = document.querySelectorAll('.filter-pill-btn');
    buttons.forEach((btn) => {
      btn.classList.toggle('active', btn.getAttribute('data-filter') === category);
    });
    if (this.ensureArchiveGrid) this.ensureArchiveGrid();
    this.renderFilteredArchiveGrid();
  }

  escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  renderFilteredArchiveGrid() {
    const gridContainer = document.getElementById('archive-grid');
    if (!gridContainer) return;

    const query = (this.searchQuery || '').trim().toLowerCase();
    const activeCategory = (this.activeFilter || 'ALL').toUpperCase();

    const filtered = PROJECTS.filter((p) => {
      // 1. Discipline / Category filter
      let matchesCat = true;
      if (activeCategory !== 'ALL') {
        const prim = (p.primaryCategory || '').toUpperCase() === activeCategory;
        const sec = (p.secondaryCategories || []).some((sc) => sc.toUpperCase() === activeCategory);
        matchesCat = prim || sec;
      }
      if (!matchesCat) return false;

      // 2. Real-time Search query matching across existing metadata only
      if (!query) return true;

      const titleMatch = (p.title || '').toLowerCase().includes(query);
      const subtitleMatch = (p.subtitle || '').toLowerCase().includes(query);
      const catMatch = (p.primaryCategory || '').toLowerCase().includes(query);
      const secMatch = (p.secondaryCategories || []).some((sc) => sc.toLowerCase().includes(query));
      const toolsMatch = (p.tools || []).some((t) => t.toLowerCase().includes(query));
      const yearMatch = (p.year ? String(p.year) : '').toLowerCase().includes(query);
      const tagsMatch = (p.tags || []).some((tag) => tag.toLowerCase().includes(query));
      const descMatch = (p.description || '').toLowerCase().includes(query);
      const sysMatch = (p.visualSystem || '').toLowerCase().includes(query);

      return titleMatch || subtitleMatch || catMatch || secMatch || toolsMatch || yearMatch || tagsMatch || descMatch || sysMatch;
    });

    // Update container class for grid vs list
    if (this.viewMode === 'list') {
      gridContainer.className = 'archive-project-container is-list';
    } else {
      gridContainer.className = 'archive-project-grid archive-project-container is-grid';
    }

    // Handle Empty Results
    if (filtered.length === 0) {
      const escapedQuery = this.escapeHtml(query);
      gridContainer.innerHTML = `
        <div class="archive-empty-state">
          <div class="archive-empty-code">00 / NO MATCHING SPECIMENS</div>
          <p class="archive-empty-msg">No archive projects match the current query "${escapedQuery}"${activeCategory !== 'ALL' ? ` under ${activeCategory}` : ''}.</p>
          <button type="button" class="archive-reset-btn" id="archive-reset-filters">CLEAR FILTERS</button>
        </div>
      `;

      const resetBtn = gridContainer.querySelector('#archive-reset-filters');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          this.searchQuery = '';
          const searchInput = document.getElementById('archive-search-input');
          const searchClear = document.getElementById('archive-search-clear');
          if (searchInput) searchInput.value = '';
          if (searchClear) searchClear.style.display = 'none';
          this.setFilter('ALL');
        });
      }
      return;
    }

    if (this.viewMode === 'list') {
      // LIST VIEW: Transform projects into a compact architectural editorial list
      gridContainer.innerHTML = filtered.map((p, index) => {
        const itemNumber = String(index + 1).padStart(2, '0');
        const secText = (p.secondaryCategories && p.secondaryCategories.length)
          ? `<span class="archive-list-subcat">${p.secondaryCategories.join(' &bull; ')}</span>`
          : '';
        const toolsMarkup = (p.tools || []).slice(0, 3).map((t) => `<span class="archive-list-tool-tag">${t}</span>`).join('');

        return `
          <article
            class="archive-list-row"
            data-open-project="${p.id}"
            tabindex="0"
            role="button"
            aria-label="Inspect ${p.title} dossier"
          >
            <div class="archive-list-cell archive-list-cell-num">
              <span class="archive-list-index">${itemNumber}</span>
            </div>
            <div class="archive-list-cell archive-list-cell-main">
              <h4 class="archive-list-title">${p.title}</h4>
              <span class="archive-list-subtitle">${p.subtitle || ''}</span>
            </div>
            <div class="archive-list-cell archive-list-cell-discipline">
              <span class="archive-list-category-badge">${p.primaryCategory}</span>
              ${secText}
            </div>
            <div class="archive-list-cell archive-list-cell-tools">
              <div class="archive-list-tool-tags">
                ${toolsMarkup}
              </div>
            </div>
            <div class="archive-list-cell archive-list-cell-year">
              <span class="archive-list-year-tag">${p.year}</span>
            </div>
            <div class="archive-list-cell archive-list-cell-action" aria-hidden="true">
              <span class="archive-list-cta">
                <span>VIEW PROJECT</span>
                <span class="action-btn-icon" aria-hidden="true">↗</span>
              </span>
            </div>
          </article>
        `;
      }).join('');
    } else {
      // GRID VIEW: Preserve exact current Archive card design with polished VIEW PROJECT button
      gridContainer.innerHTML = filtered.map((p) => {
        const heroImg = p.heroImage || (p.images[0] ? p.images[0].src : '');
        const secTags = (p.secondaryCategories || []).map((sc) => `<span class="archive-secondary-tag">${sc}</span>`).join('');

        return `
          <article class="archive-card" data-open-project="${p.id}" data-category="${p.primaryCategory}">
            <div class="archive-card-thumb" data-category="${p.primaryCategory}">
              <img src="${heroImg}" alt="${p.title}" loading="lazy" decoding="async" />
            </div>
            <div class="archive-card-body">
              <div class="archive-card-meta">
                <span class="archive-card-category" data-category="${p.primaryCategory}">${p.primaryCategory}</span>
                <span>${p.year}</span>
              </div>
              <h4 class="archive-card-title">${p.title}</h4>
              <div class="archive-card-secondary-tags">
                ${secTags}
              </div>
              <button
                type="button"
                class="archive-card-action-btn"
                data-project-id="${p.id}"
                data-open-project="${p.id}"
                aria-label="View ${p.title} project details"
              >
                <span class="action-btn-text">VIEW PROJECT</span>
                <span class="action-btn-icon" aria-hidden="true">↗</span>
              </button>
            </div>
          </article>
        `;
      }).join('');
    }

    // Direct event handlers for VIEW PROJECT buttons (with stopPropagation to prevent conflict with card hover/scrub)
    gridContainer.querySelectorAll('.archive-card-action-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const pid = btn.getAttribute('data-project-id') || btn.getAttribute('data-open-project');
        if (pid) this.openProjectModal(pid);
      });
      btn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          e.stopPropagation();
          const pid = btn.getAttribute('data-project-id') || btn.getAttribute('data-open-project');
          if (pid) this.openProjectModal(pid);
        }
      });
    });

    // Card-level click handlers for the rest of the card
    gridContainer.querySelectorAll('[data-open-project]').forEach((card) => {
      if (card.classList.contains('archive-card-action-btn')) return;
      const pid = card.getAttribute('data-open-project');
      card.addEventListener('click', () => {
        this.openProjectModal(pid);
      });
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.openProjectModal(pid);
        }
      });
    });

    // Container event delegation guard: guarantees that dynamic re-rendering or filtering never loses click handling
    if (!gridContainer.dataset.delegationAttached) {
      gridContainer.dataset.delegationAttached = 'true';
      gridContainer.addEventListener('click', (e) => {
        const btn = e.target.closest('.archive-card-action-btn');
        if (btn) {
          e.preventDefault();
          e.stopPropagation();
          const pid = btn.getAttribute('data-project-id') || btn.getAttribute('data-open-project');
          if (pid) this.openProjectModal(pid);
          return;
        }

        const card = e.target.closest('[data-open-project]');
        if (card && !e.target.closest('.archive-card-thumb')) {
          const pid = card.getAttribute('data-open-project');
          if (pid) this.openProjectModal(pid);
        }
      });
    }

    if (this.interactivity && typeof this.interactivity.refreshCards === 'function') {
      this.interactivity.refreshCards();
    }
  }

  /* ------------------------------------------------------------------------
     THREE.JS 3D SHOWCASE (SECTION 03 — WORLD / GLOBAL CREATIVE NETWORK)
     Deferred loading: only loads Three.js & earth.glb when approaching viewport
     ------------------------------------------------------------------------ */
  initThreeViewer() {
    const section = document.getElementById('3d-model');
    const viewport = document.getElementById('three-viewport');
    if (!viewport) return;

    let isLoadingThree = false;
    let pendingDiscipline = null;

    const loadThree = async () => {
      if (this.threeViewer || isLoadingThree) return;
      isLoadingThree = true;

      try {
        const { ThreeViewer } = await import('./three-viewer.js');
        this.threeViewer = new ThreeViewer('three-viewport', 'assets/3d/earth.glb');
        if (pendingDiscipline && this.threeViewer) {
          this.threeViewer.filterByDiscipline(pendingDiscipline);
          pendingDiscipline = null;
        }
      } catch (err) {
        console.error('Three.js viewer deferred initialization failed:', err);
      } finally {
        isLoadingThree = false;
      }
    };

    this.loadThreeViewer = loadThree;

    // If page is opened directly at #3d-model or deep linked, load immediately
    if (window.location.hash === '#3d-model') {
      loadThree();
    } else if ('IntersectionObserver' in window && section) {
      // Defer loading until Section 03 approaches the viewport (600px rootMargin)
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            loadThree();
            observer.disconnect();
          }
        });
      }, { rootMargin: '600px 0px' });

      observer.observe(section);
    } else {
      // Fallback: load after window load when main thread is idle
      window.addEventListener('load', () => {
        if ('requestIdleCallback' in window) {
          requestIdleCallback(() => loadThree(), { timeout: 3000 });
        } else {
          setTimeout(loadThree, 1500);
        }
      }, { once: true });
    }

    // Creative Discipline Filter Bar
    const filterBar = document.getElementById('world-discipline-filters');
    if (filterBar) {
      const filterBtns = filterBar.querySelectorAll('.world-filter-btn');
      filterBtns.forEach(btn => {
        btn.addEventListener('click', async () => {
          filterBtns.forEach(b => b.classList.remove('is-active'));
          btn.classList.add('is-active');
          const discipline = btn.getAttribute('data-discipline');
          if (this.threeViewer) {
            this.threeViewer.filterByDiscipline(discipline);
          } else {
            pendingDiscipline = discipline;
            loadThree();
          }
          const hint = document.getElementById('world-interaction-hint');
          if (hint) hint.classList.add('is-faded');
        });
      });
    }

    // Location Intelligence Panel Close Trigger
    const panelClose = document.getElementById('world-panel-close');
    if (panelClose) {
      panelClose.addEventListener('click', () => {
        if (this.threeViewer) {
          this.threeViewer.resetView();
        } else {
          const panel = document.getElementById('world-location-panel');
          if (panel) {
            panel.classList.remove('is-visible');
            panel.setAttribute('hidden', '');
          }
        }
      });
    }

    // Location Intelligence Panel "VIEW WORK ->" Trigger
    const panelViewWork = document.getElementById('world-panel-view-work');
    if (panelViewWork) {
      panelViewWork.addEventListener('click', () => {
        const workSection = document.getElementById('work');
        if (workSection) {
          workSection.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }
  }

  /* ------------------------------------------------------------------------
     TOOLS SECTION — 8 COMPACT HORIZONTAL MARQUEE ROWS
     STATIC CATEGORY COLUMN + MOVING TOOLS MARQUEE
     ------------------------------------------------------------------------ */
  renderTools() {
    const container = document.getElementById('tools-container');
    if (!container) return;

    const rows = TOOL_ARCHIVE_ROWS || [];

    const makeRowHTML = (rowDef, index) => {
      const isLeft = rowDef.direction === 'left';
      const rowClass = isLeft ? 'row-rtl' : 'row-ltr';
      const duration = 85; // Calm, smooth, premium editorial speed across all 8 rows

      // Render one complete cycle of the 7 tools with [logo] ToolName [ • CORE ] •
      const renderCycle = () => rowDef.tools.map((t) => `
        <span class="tool-unit ${t.isCore ? 'is-core' : ''}" title="${t.fullName || t.name}${t.isCore ? ' — Core Tool' : ''}">
          <span class="tool-icon" aria-hidden="true">${TOOL_ICONS[t.icon] || `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="6" fill="currentColor"/></svg>`}</span>
          <span class="tool-name">${t.name}</span>
          ${t.isCore ? `<span class="tool-core-marker" aria-label="Core Tool"><span class="tool-core-dot" aria-hidden="true">&bull;</span><span class="tool-core-text">CORE</span></span>` : ''}
        </span>
        <span class="tool-sep" aria-hidden="true">&bull;</span>
      `).join('');

      // Two complete cycles per group ensure seamless infinite coverage while keeping DOM lean
      const groupContent = renderCycle() + renderCycle();

      return `
        <div class="tools-marquee-row ${rowClass}" data-row="${rowDef.number}" style="--marquee-duration: ${duration}s;" title="Hover to pause">
          <div class="tools-row-static-label">
            <span class="tool-cat-name">${rowDef.label}</span>
            <span class="tool-cat-arrow" aria-hidden="true">${isLeft ? '←' : '→'}</span>
          </div>
          <div class="tools-row-marquee-viewport">
            <div class="tools-marquee-track">
              <div class="tools-marquee-group">
                ${groupContent}
              </div>
              <div class="tools-marquee-group" aria-hidden="true">
                ${groupContent}
              </div>
            </div>
          </div>
        </div>
      `;
    };

    container.innerHTML = `
      <div class="tools-marquee-container" aria-label="Instrumentation and Creative Software Archive">
        ${rows.map(makeRowHTML).join('')}
      </div>
    `;
  }

  /* ------------------------------------------------------------------------
     05 — EXPERIENCE SECTION (INTERACTIVE PROFESSIONAL TIMELINE)
     ------------------------------------------------------------------------ */
  renderExperience() {
    const container = document.getElementById('experience-entries-list');
    const counterEl = document.getElementById('exp-counter');
    const previewImg = document.getElementById('exp-preview-img');
    const previewBadge = document.getElementById('exp-preview-badge');
    const previewCaption = document.getElementById('exp-preview-caption');
    const progressBar = document.getElementById('exp-progress-line');
    const previewFrame = document.getElementById('exp-preview-frame');

    if (!container || !EXPERIENCES || EXPERIENCES.length === 0) return;

    let activeIndex = 0;
    let expandedIndex = 0;

    // Render the strict 4 Experience entries
    container.innerHTML = EXPERIENCES.map((exp, idx) => `
      <div class="experience-row ${idx === 0 ? 'active is-expanded' : ''}" data-exp-index="${idx}" id="exp-row-${idx}" role="tab" tabindex="0" aria-expanded="${idx === 0 ? 'true' : 'false'}">
        <div class="experience-row-header">
          <div class="experience-row-meta">
            <span class="experience-row-year">${exp.year}</span>
            <span class="experience-row-type">${exp.type}</span>
          </div>
          <div class="experience-row-main">
            <h3 class="experience-row-title">${exp.role}</h3>
            <button class="experience-toggle-indicator" type="button" aria-label="Toggle ${exp.role} details">
              <span class="indicator-icon">${idx === 0 ? '&minus;' : '+'}</span>
            </button>
          </div>
        </div>
        <div class="experience-row-drawer" id="exp-drawer-${idx}">
          <div class="experience-drawer-content">
            <div class="experience-drawer-category">${exp.category}</div>
            <p class="experience-drawer-summary">${exp.description}</p>
            <div class="experience-drawer-block">
              <div class="experience-drawer-section-title">FOCUS</div>
              <div class="experience-focus-pills">
                ${exp.focus.map(f => `<span class="experience-focus-pill">${f}</span>`).join('')}
              </div>
            </div>
            <div class="experience-drawer-block">
              <div class="experience-drawer-section-title">INSTRUMENTATION & SOFTWARE</div>
              <div class="experience-tools-pills">
                ${exp.tools.map(t => `<span class="experience-tool-pill">${t}</span>`).join('')}
              </div>
            </div>
          </div>
        </div>
      </div>
    `).join('');

    const rows = container.querySelectorAll('.experience-row');

    const updatePreview = (index) => {
      const exp = EXPERIENCES[index];
      if (!exp) return;

      if (counterEl) {
        counterEl.textContent = `${exp.number} / 04`;
      }

      if (progressBar) {
        const pct = (index / (EXPERIENCES.length - 1)) * 100;
        progressBar.style.height = `${pct}%`;
      }

      rows.forEach((row, i) => {
        if (i === index) {
          row.classList.add('active');
        } else {
          row.classList.remove('active');
        }
      });

      if (previewImg && exp.previewImage) {
        if (previewImg.getAttribute('data-current-src') !== exp.previewImage) {
          previewImg.setAttribute('data-current-src', exp.previewImage);
          previewImg.style.opacity = '0.35';
          previewImg.style.transform = 'scale(0.98)';
          setTimeout(() => {
            previewImg.src = exp.previewImage;
            previewImg.alt = exp.previewAlt || exp.role;
            if (previewBadge) previewBadge.textContent = `${exp.number} // ${exp.year}`;
            if (previewCaption) previewCaption.textContent = exp.previewCaption || exp.role;
            previewImg.style.opacity = '1';
            previewImg.style.transform = 'scale(1)';
          }, 150);
        }
      }
    };

    const toggleRow = (index) => {
      rows.forEach((row, i) => {
        const indicator = row.querySelector('.indicator-icon');
        if (i === index) {
          const isNowExpanded = !row.classList.contains('is-expanded');
          if (isNowExpanded) {
            row.classList.add('is-expanded');
            row.setAttribute('aria-expanded', 'true');
            if (indicator) indicator.innerHTML = '&minus;';
            expandedIndex = index;
          } else {
            row.classList.remove('is-expanded');
            row.setAttribute('aria-expanded', 'false');
            if (indicator) indicator.innerHTML = '+';
            expandedIndex = -1;
          }
        } else {
          row.classList.remove('is-expanded');
          row.setAttribute('aria-expanded', 'false');
          if (indicator) indicator.innerHTML = '+';
        }
      });
      activeIndex = index;
      updatePreview(index);
    };

    // Attach row events
    rows.forEach((row, idx) => {
      // Hover activates visual preview & highlight
      row.addEventListener('mouseenter', () => {
        container.classList.add('is-hovering');
        activeIndex = idx;
        updatePreview(idx);
      });

      // Click expands row & locks view
      row.addEventListener('click', () => {
        toggleRow(idx);
      });

      // Keyboard navigation
      row.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggleRow(idx);
        }
      });
    });

    // Reset hover to currently expanded row on mouseleave
    container.addEventListener('mouseleave', () => {
      container.classList.remove('is-hovering');
      if (expandedIndex >= 0) {
        activeIndex = expandedIndex;
        updatePreview(expandedIndex);
      }
    });

    // Click on preview frame opens in lightbox
    if (previewFrame) {
      previewFrame.addEventListener('click', () => {
        const exp = EXPERIENCES[activeIndex] || EXPERIENCES[0];
        if (this.lightbox && exp.previewImage) {
          this.lightbox.open([{
            src: exp.previewImage,
            caption: `${exp.number} · ${exp.role} (${exp.year})`
          }], 0);
        }
      });
    }

    // Scroll progress observer for timeline progression
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !container.classList.contains('is-hovering')) {
            const idx = parseInt(entry.target.getAttribute('data-exp-index'), 10);
            if (!isNaN(idx)) {
              activeIndex = idx;
              updatePreview(idx);
            }
          }
        });
      }, {
        rootMargin: '-30% 0px -30% 0px',
        threshold: 0.2
      });

      rows.forEach(r => observer.observe(r));
    }

    // Initialize with first entry
    updatePreview(0);
  }

  /* ------------------------------------------------------------------------
     06 — SERVICES SECTION (INTERACTIVE CREATIVE SERVICE INDEX & FLOATING THUMBNAIL SHOWCASE)
     ------------------------------------------------------------------------ */
  renderServices() {
    const listContainer = document.getElementById('services-index-list');
    const counterEl = document.getElementById('services-counter');
    const viewportEl = document.getElementById('service-thumbnail-viewport');
    const layer0 = document.getElementById('service-thumb-layer-0');
    const layer1 = document.getElementById('service-thumb-layer-1');
    const img0 = document.getElementById('service-thumb-img-0');
    const img1 = document.getElementById('service-thumb-img-1');
    const curIdxEl = document.getElementById('service-thumb-cur-idx');
    const totalCountEl = document.getElementById('service-thumb-total-count');
    const navPillsEl = document.getElementById('service-thumb-nav-pills');
    const projectTitleEl = document.getElementById('service-showcase-project-title');
    const projectCategoryEl = document.getElementById('service-showcase-category');
    const kickerEl = document.getElementById('service-kicker');
    const titleEl = document.getElementById('service-title');
    const descEl = document.getElementById('service-desc');
    const deliverablesEl = document.getElementById('service-deliverables');
    const toolsEl = document.getElementById('service-tools');
    const relatedEl = document.getElementById('service-related');
    const ctaBtn = document.getElementById('services-contact-trigger');

    if (!listContainer || !SERVICES || SERVICES.length === 0) return;

    // Direct verified mapping of the 10 services to actual projects in repository
    const SERVICE_ITEMS = [
      {
        number: "01",
        name: "BRANDING",
        kicker: "IDENTITY / SYSTEM / CULTURE",
        description: "Building distinctive identities and visual systems for brands, products, and creative projects.",
        deliverables: ["Logo Architecture", "Identity Systems", "Typography Standards", "Art Direction", "Brand Guidelines"],
        tools: ["Illustrator", "Photoshop", "Figma"],
        projects: [
          { id: "zesis", title: "ZESIS", category: "BRANDING", image: "assets/projects/branding/zesis/ZESIS (1).jpeg" }
        ]
      },
      {
        number: "02",
        name: "GRAPHIC DESIGN",
        kicker: "TYPE / IMAGE / COMPOSITION",
        description: "Graphic systems built through typography, imagery, and visual rhythm across print, digital, and architectural scales.",
        deliverables: ["Editorial Layouts", "Typographic Systems", "Key Visuals", "Posters & Billboards", "Marketing Collateral"],
        tools: ["Illustrator", "Photoshop", "InDesign"],
        projects: [
          { id: "kijgo", title: "KIJGO", category: "GRAPHIC DESIGN", image: "assets/projects/graphic/kijgo/Kijgo.jpeg" },
          { id: "mus26", title: "MUS26", category: "GRAPHIC DESIGN", image: "assets/projects/graphic/mus26/MUS26.jpeg" },
          { id: "stdeed", title: "STDEED", category: "GRAPHIC DESIGN", image: "assets/projects/graphic/stdeed/Stdeed.jpeg" }
        ]
      },
      {
        number: "03",
        name: "POSTER & PRINT",
        kicker: "PRINT / TACTILITY / POSTER",
        description: "High-impact poster artwork, screen-printed collateral, and physical print systems engineered with material tactility.",
        deliverables: ["Screen-Print Posters", "Exhibition Print Suites", "Packaging Die-Lines", "Publication Design", "Print Collateral"],
        tools: ["Photoshop", "Illustrator", "InDesign"],
        projects: [
          { id: "emysc", title: "EMYSC", category: "POSTER & PRINT", image: "assets/projects/poster-print/emysc/EMYSC_01.jpeg" },
          { id: "tekzzo", title: "TEKZZO", category: "POSTER & PRINT", image: "assets/projects/poster-print/tekzzo/TEKZZO_01.jpeg" },
          { id: "tukeet", title: "TUKEET", category: "POSTER & PRINT", image: "assets/projects/poster-print/tukeet/TUKEET_01.jpeg" }
        ]
      },
      {
        number: "04",
        name: "DIGITAL DESIGN",
        kicker: "SCREEN / ENVIRONMENT / PIXELS",
        description: "Digital campaign visual systems, social media architectures, immersive screen graphics, and interactive online presence.",
        deliverables: ["Digital Campaign Suites", "Social Visual Systems", "Web Visual Content", "Presentation Keyframes", "Digital Advertising Assets"],
        tools: ["Figma", "Photoshop", "Illustrator"],
        projects: [
          { id: "mkegg", title: "MKEGG", category: "DIGITAL DESIGN", image: "assets/projects/digital/mkegg/MKEGG (1).jpeg" },
          { id: "atllis", title: "ATLLIS", category: "DIGITAL DESIGN", image: "assets/projects/digital/atllis/ATLLIS (1).jpeg" },
          { id: "logeer", title: "LOGEER", category: "DIGITAL DESIGN", image: "assets/projects/digital/logeer/LOGEER (1).jpeg" }
        ]
      },
      {
        number: "05",
        name: "UI / UX DESIGN",
        kicker: "SYSTEM / INTERFACE / PRODUCT",
        description: "Designing digital interfaces and product systems with architectural clarity, responsive behavior, and robust usability.",
        deliverables: ["Interface Architecture", "UX Systems", "Wireframes", "Interactive Prototyping", "Design Systems"],
        tools: ["Figma", "Design Systems", "Prototyping"],
        projects: [
          { id: "arimm", title: "ARIMM", category: "UI/UX DESIGN", image: "assets/projects/ui/arimm/ARIMM (1).jpeg" },
          { id: "calott", title: "CALOTT", category: "UI/UX DESIGN", image: "assets/projects/ui/calott/CALOTT (5).jpeg" },
          { id: "nkitt", title: "NKITT", category: "UI/UX DESIGN", image: "assets/projects/ui/nkitt/NKITT_01.jpeg" },
          { id: "pitso", title: "PITSO", category: "UI/UX DESIGN", image: "assets/projects/ui/pitso/PITSO (4).jpeg" }
        ]
      },
      {
        number: "06",
        name: "MOTION DESIGN",
        kicker: "TIME / KINETICS / DYNAMICS",
        description: "Kinetic typography, brand motion identities, visual animation, and temporal storytelling that bring static assets to life.",
        deliverables: ["Kinetic Typography", "Motion Identity Systems", "Logo Idents & Title Cards", "Social Motion Content", "UI Animation Specs"],
        tools: ["After Effects", "Premiere Pro"],
        projects: [
          { id: "mus26", title: "MUS26", category: "MOTION DESIGN", image: "assets/projects/graphic/mus26/MUS26.jpeg" }
        ]
      },
      {
        number: "07",
        name: "3D DESIGN",
        kicker: "SPACE / FORM / MATERIAL",
        description: "Dimensional visual modeling, photorealistic rendering, spatial branding, and real-time WebGL asset optimization.",
        deliverables: ["3D Visual Artwork", "Optimized WebGL Assets", "Material & Lighting Systems", "Spatial Product Renders", "Dimensional Form Studies"],
        tools: ["Blender", "Three.js", "glTF Pipeline"],
        projects: [
          { id: "earth-3d", title: "EARTH 3D", category: "3D DESIGN", image: "assets/3d/EARTH3D.webp" }
        ]
      },
      {
        number: "08",
        name: "IMAGE MAKING",
        kicker: "COMPOSITING / ART / TEXTURE",
        description: "Digital art, photographic compositing, expressive illustration, texture synthesis, and experimental imagery.",
        deliverables: ["Digital Art Pieces", "Photographic Composites", "Key Visual Collateral", "Texture & Lighting Artifacts", "Stylized Visual Treatments"],
        tools: ["Photoshop", "Lightroom"],
        projects: [
          { id: "emysc", title: "EMYSC", category: "IMAGE MAKING", image: "assets/projects/poster-print/emysc/EMYSC_01.jpeg" },
          { id: "mkegg", title: "MKEGG", category: "IMAGE MAKING", image: "assets/projects/digital/mkegg/MKEGG (1).jpeg" }
        ]
      },
      {
        number: "09",
        name: "ART DIRECTION",
        kicker: "VISION / CURATION / STORY",
        description: "Comprehensive creative direction, conceptual framing, and visual stewardship across multidisciplinary campaigns.",
        deliverables: ["Creative Concepts", "Visual Direction Briefs", "Moodboards & Style Guides", "Campaign Stewardship", "Editorial Curation"],
        tools: ["Creative Direction", "Editorial Design", "Figma"],
        projects: [
          { id: "zesis", title: "ZESIS", category: "ART DIRECTION", image: "assets/projects/branding/zesis/ZESIS (1).jpeg" },
          { id: "mus26", title: "MUS26", category: "ART DIRECTION", image: "assets/projects/graphic/mus26/MUS26.jpeg" }
        ]
      },
      {
        number: "10",
        name: "EXPERIMENTAL MEDIA",
        kicker: "CODE / GENERATIVE / FUTURE",
        description: "Frontier visual exploration bridging creative technology, generative structures, spatial sound, and audiovisual experiments.",
        deliverables: ["Generative Visual Systems", "Interactive Web Experiences", "Algorithmic Art Studies", "Spatial Visual Experiments", "Code-Driven Graphics"],
        tools: ["Three.js", "WebGL", "Creative Code"],
        projects: [
          { id: "mus26", title: "MUS26", category: "EXPERIMENTAL MEDIA", image: "assets/projects/graphic/mus26/MUS26.jpeg" },
          { id: "earth-3d", title: "EARTH 3D", category: "EXPERIMENTAL MEDIA", image: "assets/3d/EARTH3D.webp" }
        ]
      }
    ];

    let selectedServiceIndex = 0;
    let hoveredServiceIndex = null;
    let currentProjectIndex = 0;
    let activeLayer = 0;
    let displayedImageSrc = '';

    // 1. Defer preloading project images until Section 07 (Services) approaches viewport
    let servicesPreloaded = false;
    const preloadServiceImages = () => {
      if (servicesPreloaded) return;
      servicesPreloaded = true;
      SERVICE_ITEMS.forEach((s) => {
        s.projects.forEach((p) => {
          if (p.image) {
            const img = new Image();
            img.decoding = 'async';
            img.src = p.image;
          }
        });
      });
    };

    const servicesSection = document.getElementById('services');
    if ('IntersectionObserver' in window && servicesSection) {
      const servicesObs = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            preloadServiceImages();
            servicesObs.disconnect();
          }
        });
      }, { rootMargin: '300px 0px' });
      servicesObs.observe(servicesSection);
    }
    if (listContainer) {
      listContainer.addEventListener('pointerenter', preloadServiceImages, { once: true, passive: true });
    }

    // 2. Render the 10 services in the left column with inline mobile drawers
    listContainer.innerHTML = SERVICE_ITEMS.map((s, idx) => {
      const primaryProj = s.projects[0];
      return `
      <div class="service-index-row ${idx === 0 ? 'is-active is-locked' : ''}" data-service-index="${idx}" id="service-row-${idx}" role="tab" tabindex="0" aria-selected="${idx === 0 ? 'true' : 'false'}">
        <div class="service-row-left">
          <span class="service-row-num">${s.number}</span>
          <h3 class="service-row-name">${s.name}</h3>
        </div>
        <div class="service-row-right">
          <span class="service-row-arrow" aria-hidden="true">&rarr;</span>
        </div>

        <!-- Mobile drawer for inline touch viewports: SERVICE -> THUMBNAIL -> DETAILS -->
        <div class="service-mobile-drawer" id="service-mobile-drawer-${idx}">
          <div class="service-mobile-preview-frame" data-project-id="${primaryProj.id}" role="button" tabindex="0" aria-label="Open ${primaryProj.title} case study">
            <img class="service-mobile-preview-img" src="${primaryProj.image}" alt="${primaryProj.title}" loading="lazy" />
          </div>
          <div class="service-mobile-caption" style="display:flex; justify-content:space-between; align-items:baseline; margin-top:0.25rem;">
            <span style="font-family:var(--font-display); font-weight:800; font-size:1.1rem; color:var(--text-primary); text-transform:uppercase;">${primaryProj.title}</span>
            <span style="font-family:var(--font-mono); font-size:0.7rem; color:var(--text-muted); text-transform:uppercase;">${primaryProj.category}</span>
          </div>
          <p class="service-detail-desc" style="margin-top:0.5rem;">${s.description}</p>
          <div class="service-intel-heading" style="margin-top: 0.5rem;">DELIVERABLES</div>
          <ul class="service-deliverables-list">
            ${s.deliverables.map((d) => `<li class="service-deliverable-item">${d}</li>`).join('')}
          </ul>
          <div class="service-intel-heading" style="margin-top: 0.5rem;">TOOLS</div>
          <div class="service-tools-cluster">
            ${s.tools.map((t) => `<span class="service-tool-pill">${t}</span>`).join('')}
          </div>
          <div class="service-intel-heading" style="margin-top: 0.5rem;">RELATED WORK</div>
          <div class="service-related-links">
            ${s.projects.map((p) => `<button type="button" class="service-related-btn" data-project-id="${p.id}"><span>${p.title}</span><span aria-hidden="true">&rarr;</span></button>`).join('')}
          </div>
        </div>
      </div>
      `;
    }).join('');

    const rows = listContainer.querySelectorAll('.service-index-row');

    /**
     * Unified State Controller:
     * When service or project changes:
     * 1. Smoothly transitions thumbnail via dual layer cross-fade & scale (400-600ms)
     * 2. Updates project title, category, project counter (e.g. 01 / 03)
     * 3. Updates service counter (01 / 10), kicker, title, description, deliverables, tools, related buttons
     * 4. Renders multi-project indicator pills
     */
    const updateShowcaseState = (serviceIdx, projIdx = 0) => {
      const service = SERVICE_ITEMS[serviceIdx];
      if (!service) return;

      const safeProjIdx = Math.min(projIdx, service.projects.length - 1);
      currentProjectIndex = safeProjIdx;
      const project = service.projects[safeProjIdx];

      // 1. Dynamic Thumbnail Transition (400-600ms crossfade & subtle scale)
      if (project && project.image !== displayedImageSrc) {
        const nextLayerIdx = 1 - activeLayer;
        const nextLayer = nextLayerIdx === 0 ? layer0 : layer1;
        const currentLayer = activeLayer === 0 ? layer0 : layer1;
        const nextImg = nextLayerIdx === 0 ? img0 : img1;

        if (nextImg && nextLayer && currentLayer) {
          nextImg.src = project.image;
          nextImg.alt = `${project.title} Project Showcase`;

          // Trigger crossfade & scale
          nextLayer.classList.add('is-active');
          currentLayer.classList.remove('is-active');

          activeLayer = nextLayerIdx;
          displayedImageSrc = project.image;
        }
      }

      // Store active project ID on the clickable viewport
      if (viewportEl && project) {
        viewportEl.setAttribute('data-project-id', project.id);
      }

      // 2. Project Counter Pill & Names
      if (curIdxEl) curIdxEl.textContent = String(safeProjIdx + 1).padStart(2, '0');
      if (totalCountEl) totalCountEl.textContent = String(service.projects.length).padStart(2, '0');
      if (projectTitleEl && project) projectTitleEl.textContent = project.title;
      if (projectCategoryEl && project) projectCategoryEl.textContent = project.category;

      // 3. Multi-project selector pills (if service has >1 project)
      if (navPillsEl) {
        if (service.projects.length > 1) {
          navPillsEl.innerHTML = service.projects.map((p, pIndex) => `
            <button type="button" class="service-thumb-pill-btn ${pIndex === safeProjIdx ? 'is-active' : ''}" data-proj-index="${pIndex}" title="Switch to ${p.title}">
              ${p.title}
            </button>
          `).join('');

          navPillsEl.querySelectorAll('.service-thumb-pill-btn').forEach((pBtn) => {
            pBtn.addEventListener('click', (e) => {
              e.stopPropagation();
              const targetPIdx = parseInt(pBtn.getAttribute('data-proj-index'), 10);
              if (!isNaN(targetPIdx)) {
                updateShowcaseState(serviceIdx, targetPIdx);
              }
            });
            pBtn.addEventListener('mouseenter', (e) => {
              e.stopPropagation();
              const targetPIdx = parseInt(pBtn.getAttribute('data-proj-index'), 10);
              if (!isNaN(targetPIdx) && targetPIdx !== currentProjectIndex) {
                updateShowcaseState(serviceIdx, targetPIdx);
              }
            });
          });
        } else {
          navPillsEl.innerHTML = '';
        }
      }

      // 4. Service Counter & Typography
      if (counterEl) counterEl.textContent = `${service.number} / 10`;
      if (kickerEl) kickerEl.textContent = service.kicker;
      if (titleEl) titleEl.textContent = service.name;
      if (descEl) descEl.textContent = service.description;

      // 5. Deliverables List
      if (deliverablesEl) {
        deliverablesEl.innerHTML = service.deliverables.map((d) => `
          <li class="service-deliverable-item">${d}</li>
        `).join('');
      }

      // 6. Tools Cluster
      if (toolsEl) {
        toolsEl.innerHTML = service.tools.map((t) => `
          <span class="service-tool-pill">${t}</span>
        `).join('');
      }

      // 7. Related Work Buttons
      if (relatedEl) {
        relatedEl.innerHTML = service.projects.map((p) => `
          <button type="button" class="service-related-btn" data-project-id="${p.id}">
            <span>${p.title}</span>
            <span aria-hidden="true">&rarr;</span>
          </button>
        `).join('');

        relatedEl.querySelectorAll('.service-related-btn').forEach((btn) => {
          btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const pid = btn.getAttribute('data-project-id');
            if (pid) this.openProjectModal(pid);
          });
        });
      }

      // 8. Update Row Selection States
      rows.forEach((row, i) => {
        if (i === serviceIdx) {
          row.classList.add('is-active');
          row.setAttribute('aria-selected', 'true');
        } else {
          row.classList.remove('is-active');
          row.setAttribute('aria-selected', 'false');
        }
      });
    };

    // Clicking the showcase thumbnail viewport opens the corresponding project modal
    if (viewportEl) {
      viewportEl.addEventListener('click', () => {
        const pid = viewportEl.getAttribute('data-project-id');
        if (pid) this.openProjectModal(pid);
      });
      viewportEl.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const pid = viewportEl.getAttribute('data-project-id');
          if (pid) this.openProjectModal(pid);
        }
      });
    }

    // Caption explore link click opens the project modal
    const captionLink = document.querySelector('.service-showcase-explore-link');
    if (captionLink && viewportEl) {
      captionLink.addEventListener('click', () => {
        const pid = viewportEl.getAttribute('data-project-id');
        if (pid) this.openProjectModal(pid);
      });
    }

    // Wire up row hover, click, and keyboard focus events
    rows.forEach((row, idx) => {
      row.addEventListener('mouseenter', () => {
        listContainer.classList.add('is-hovering');
        hoveredServiceIndex = idx;
        updateShowcaseState(idx, 0);
      });

      row.addEventListener('click', () => {
        selectedServiceIndex = idx;
        rows.forEach((r) => r.classList.remove('is-locked'));
        row.classList.add('is-locked');
        updateShowcaseState(idx, 0);
      });

      row.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          selectedServiceIndex = idx;
          rows.forEach((r) => r.classList.remove('is-locked'));
          row.classList.add('is-locked');
          updateShowcaseState(idx, 0);
        }
      });

      // Mobile inline drawer thumbnail and buttons
      const mobileThumb = row.querySelector('.service-mobile-preview-frame');
      if (mobileThumb) {
        mobileThumb.addEventListener('click', (e) => {
          e.stopPropagation();
          const pid = mobileThumb.getAttribute('data-project-id');
          if (pid) this.openProjectModal(pid);
        });
      }

      row.querySelectorAll('.service-related-btn').forEach((btn) => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const pid = btn.getAttribute('data-project-id');
          if (pid) this.openProjectModal(pid);
        });
      });
    });

    // On mouseleave, restore to locked/selected service
    listContainer.addEventListener('mouseleave', () => {
      listContainer.classList.remove('is-hovering');
      hoveredServiceIndex = null;
      updateShowcaseState(selectedServiceIndex, 0);
    });

    // Synchronize active service during vertical page scrolling through Services section
    if ('IntersectionObserver' in window) {
      const scrollSyncObserver = new IntersectionObserver((entries) => {
        if (listContainer.classList.contains('is-hovering')) return; // Prioritize manual hover
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            const rowIdx = parseInt(entry.target.getAttribute('data-service-index'), 10);
            if (!isNaN(rowIdx) && rowIdx !== selectedServiceIndex) {
              selectedServiceIndex = rowIdx;
              rows.forEach((r) => r.classList.remove('is-locked'));
              entry.target.classList.add('is-locked');
              updateShowcaseState(rowIdx, 0);
            }
          }
        });
      }, {
        rootMargin: '-25% 0px -25% 0px',
        threshold: 0.5
      });

      rows.forEach((row) => scrollSyncObserver.observe(row));
    }

    // Contact smooth scroll CTA
    if (ctaBtn) {
      ctaBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const contactSection = document.getElementById('contact');
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }

    // Initialize with first service (01 BRANDING -> ZESIS)
    updateShowcaseState(0, 0);
  }

  /* ------------------------------------------------------------------------
     CONTACT & FOOTER INTEGRATION (Section 20, 21, 23)
     ------------------------------------------------------------------------ */
  renderContact() {
    const emailEl = document.getElementById('contact-email-link');
    const phoneEl = document.getElementById('contact-phone-link');
    const locEl = document.getElementById('contact-location-text');
    const footerEmailLink = document.getElementById('footer-get-in-touch');
    const footerLocationEl = document.getElementById('footer-location-text');
    const footerStatusEl = document.getElementById('footer-status-text');

    if (emailEl) {
      emailEl.href = `mailto:${PORTFOLIO_INFO.email}`;
      emailEl.textContent = PORTFOLIO_INFO.email;
    }
    if (footerEmailLink) {
      footerEmailLink.href = `mailto:${PORTFOLIO_INFO.email}`;
    }
    if (phoneEl) {
      phoneEl.href = `tel:${PORTFOLIO_INFO.phone}`;
      phoneEl.textContent = PORTFOLIO_INFO.phone;
    }
    if (locEl) {
      locEl.textContent = PORTFOLIO_INFO.location;
    }
    if (footerLocationEl) {
      footerLocationEl.textContent = PORTFOLIO_INFO.location;
    }
    if (footerStatusEl) {
      footerStatusEl.textContent = PORTFOLIO_INFO.status;
    }

    // Bind real social URLs without mock placeholders (Section 21)
    const social = PORTFOLIO_INFO.social || {};
    document.querySelectorAll('[data-social]').forEach((link) => {
      const net = link.getAttribute('data-social');
      if (social[net]) {
        link.href = social[net];
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
      }
    });
  }

  /* ------------------------------------------------------------------------
     CANONICAL PROJECT MODAL VIEW (ONE CANONICAL URL PER PROJECT)
     ------------------------------------------------------------------------ */
  openProjectModal(projectId) {
    if (!projectId) return;
    const cleanId = String(projectId).trim().toLowerCase();

    // 1. Exact ID match
    let project = PROJECTS.find((p) => p.id && p.id.toLowerCase() === cleanId);
    // 2. Exact Title match
    if (!project) {
      project = PROJECTS.find((p) => p.title && p.title.toLowerCase() === cleanId);
    }
    // 3. Slug-normalized match (strip hyphens and non-alphanumeric)
    if (!project) {
      project = PROJECTS.find((p) => {
        const slugA = (p.id || '').toLowerCase().replace(/[^a-z0-9]/g, '');
        const slugB = cleanId.replace(/[^a-z0-9]/g, '');
        return slugA && slugA === slugB;
      });
    }
    if (!project) return;

    window.location.hash = `project-${project.id}`;

    const modal = document.getElementById('project-modal');
    const content = document.getElementById('project-modal-body');
    if (!modal || !content) return;

    // Format secondary tags
    const secTags = (project.secondaryCategories || []).map((sc) => `<span class="pill-secondary">${sc}</span>`).join('');
    const toolTags = (project.tools || []).map((t) => `<span class="pill-category">${t}</span>`).join('');
    const appTags = (project.applications || []).map((a) => `<span class="pill-secondary">${a}</span>`).join('');

    // Design Director Case Study Dossier
    let dossierContent = '';
    if (project.caseStudyDossier) {
      const d = project.caseStudyDossier;
      const artifactItems = (d.artifacts || []).map((art, idx) => `
        <li class="dossier-artifact-item">
          <span class="dossier-artifact-bullet">SPEC-${String(idx + 1).padStart(2, '0')}</span>
          <span class="dossier-artifact-text">${art}</span>
        </li>
      `).join('');

      dossierContent = `
        <section class="case-study-dossier" aria-label="Executive Design Dossier">
          <div class="dossier-header-bar">
            <div class="dossier-meta-pill">
              <span class="dossier-pulse-dot"></span>
              <span>EXECUTIVE DESIGN DOSSIER &bull; ARCHITECTURAL STRATEGY</span>
            </div>
            <h3 class="dossier-heading">DESIGN DIRECTOR CASE STUDY &amp; SYSTEM SPECIFICATION</h3>
            <p class="dossier-lead-text">${d.overview}</p>
          </div>

          <div class="dossier-columns-grid">
            <div class="dossier-card dossier-card-problem">
              <div class="dossier-card-index">01 / TENSION &amp; PROBLEM STATEMENT</div>
              <h4 class="dossier-card-title">Architectural Challenge</h4>
              <p class="dossier-card-desc">${d.problem}</p>
            </div>

            <div class="dossier-card dossier-card-process">
              <div class="dossier-card-index">02 / PROCESS &amp; DESIGN SYSTEM</div>
              <h4 class="dossier-card-title">Methodology &amp; Grid Foundation</h4>
              <p class="dossier-card-desc">${d.process}</p>
            </div>
          </div>

          <div class="dossier-columns-grid" style="margin-top: 1.5rem;">
            <div class="dossier-card dossier-card-artifacts">
              <div class="dossier-card-index">03 / KEY ARTIFACTS &amp; DELIVERABLES</div>
              <h4 class="dossier-card-title">Delivered Technical Assets</h4>
              <ul class="dossier-artifacts-list">
                ${artifactItems}
              </ul>
            </div>

            <div class="dossier-card dossier-card-results">
              <div class="dossier-card-index">04 / FACTUAL SCOPE &amp; EXECUTION</div>
              <h4 class="dossier-card-title">Production &amp; System Specifications</h4>
              <div class="dossier-results-box">
                <p class="dossier-results-text">${d.results}</p>
              </div>
            </div>
          </div>
        </section>
      `;
    }

    let customContent = '';

    // UI/UX Projects: Exact 5-Section Architecture
    if (project.isUIUX && project.uiuxSections) {
      const s = project.uiuxSections;
      const s2 = s.uiScreens || s.designSystem;
      customContent = `
        <div class="uiux-sections-suite">
          <!-- SECTION 01 — FULL UI -->
          <div class="uiux-block-module" id="uiux-01">
            <div class="uiux-block-header">
              <h3 class="uiux-block-title">${s.fullUI.title}</h3>
              <p class="uiux-block-desc">${s.fullUI.description}</p>
            </div>
            <div class="uiux-block-image-frame" data-lightbox-index="0" title="Click to inspect full resolution interface">
              <img src="${s.fullUI.image}" alt="${s.fullUI.title}" loading="lazy" />
            </div>
          </div>

          <!-- SECTION 02 — UI SCREENS -->
          <div class="uiux-block-module" id="uiux-02">
            <div class="uiux-block-header">
              <h3 class="uiux-block-title">${s2.title}</h3>
              <p class="uiux-block-desc">${s2.description}</p>
            </div>
            <div class="uiux-block-image-frame" data-lightbox-index="1" title="Click to inspect full resolution interface">
              <img src="${s2.image}" alt="${s2.title}" loading="lazy" />
            </div>
          </div>

          <!-- SECTION 03 — CASE STUDY -->
          <div class="uiux-block-module" id="uiux-03">
            <div class="uiux-block-header">
              <h3 class="uiux-block-title">${s.caseStudy.title}</h3>
              <p class="uiux-block-desc">${s.caseStudy.description}</p>
            </div>
            <div class="uiux-block-image-frame" data-lightbox-index="2" title="Click to inspect full resolution case study">
              <img src="${s.caseStudy.image}" alt="${s.caseStudy.title}" loading="lazy" />
            </div>
          </div>

          <!-- SECTION 04 — PROTOTYPE -->
          <div class="uiux-block-module" id="uiux-04">
            <div class="uiux-block-header">
              <h3 class="uiux-block-title">${s.prototype.title}</h3>
              <p class="uiux-block-desc">${s.prototype.description}</p>
            </div>
            <div class="uiux-block-image-frame" data-lightbox-index="3" title="Click to inspect full resolution prototype flow">
              <img src="${s.prototype.image}" alt="${s.prototype.title}" loading="lazy" />
            </div>
          </div>

          <!-- SECTION 05 — FINAL EXPERIENCE -->
          <div class="uiux-block-module" id="uiux-05">
            <div class="uiux-block-header">
              <h3 class="uiux-block-title">${s.finalExperience.title}</h3>
              <p class="uiux-block-desc">${s.finalExperience.description}</p>
            </div>
            <div class="uiux-block-image-frame" data-lightbox-index="4" title="Click to inspect full resolution design system & final experience">
              <img src="${s.finalExperience.image}" alt="${s.finalExperience.title}" loading="lazy" />
            </div>
          </div>
        </div>
      `;
    } else if (project.is3D) {
      customContent = `
        <div style="margin-top: 3rem;">
          <div class="three-viewer-wrapper" style="height: 520px;">
            <div id="modal-three-viewport" style="width: 100%; height: 100%;"></div>
          </div>
        </div>
      `;
    } else {
      // General Image Gallery
      customContent = `
        <div class="project-gallery-grid">
          ${project.images.map((img, idx) => `
            <div class="gallery-image-card" data-lightbox-index="${idx}">
              <img src="${img.src}" alt="${img.caption}" loading="lazy" />
              <div class="gallery-image-caption">
                <span>${img.caption}</span>
              </div>
            </div>
          `).join('')}
        </div>
      `;
    }

    this.currentModalProject = project;

    const currentIndex = PROJECTS.findIndex((p) => p.id === project.id);
    const prevProject = PROJECTS[(currentIndex - 1 + PROJECTS.length) % PROJECTS.length];
    const nextProject = PROJECTS[(currentIndex + 1) % PROJECTS.length];
    const currentNum = String(currentIndex + 1).padStart(2, '0');
    const totalNum = String(PROJECTS.length).padStart(2, '0');
    const heroVisual = project.heroImage || (project.images[0] ? project.images[0].src : '');

    content.innerHTML = `
      <div class="project-detail-hero">
        <div class="project-meta-pills" style="margin-bottom: 1.5rem;">
          <span class="pill-category">${project.primaryCategory}</span>
          ${secTags}
          <span class="pill-category">${project.year}</span>
        </div>
        <h1 class="section-title-editorial" style="font-size: clamp(2.5rem, 6.5vw, 6.5rem);">${project.title}</h1>
        <p class="section-subtitle-editorial" style="margin-top: 1rem;">${project.subtitle}</p>
      </div>

      ${heroVisual ? `
        <div class="modal-hero-visual-frame" data-lightbox-index="0" title="Click to inspect full resolution specimen" tabindex="0" role="button" aria-label="Inspect ${project.title} specimen in lightbox">
          <img src="${heroVisual}" alt="${project.title} — Primary Specimen" loading="eager" decoding="async" />
          <div class="modal-hero-visual-badge">
            <span class="badge-text">FULL RESOLUTION SPECIMEN</span>
            <span class="badge-icon">⊕</span>
          </div>
        </div>
      ` : ''}

      <div class="modal-editorial-specs-grid">
        <div class="specs-grid-main">
          <div class="specs-block">
            <span class="specs-label">OVERVIEW &amp; ARCHITECTURE</span>
            <p class="specs-body-lead">${project.description}</p>
          </div>
          ${project.visualSystem ? `
            <div class="specs-block" style="margin-top: 1.5rem;">
              <span class="specs-label">VISUAL SYSTEM</span>
              <p class="specs-body-text">${project.visualSystem}</p>
            </div>
          ` : ''}
          ${project.motionNote ? `
            <div class="specs-callout">
              <span class="specs-label">MOTION ARCHITECTURE</span>
              <p class="specs-callout-text">${project.motionNote}</p>
            </div>
          ` : ''}
        </div>
        <div class="specs-grid-aside">
          <div class="specs-aside-item">
            <span class="specs-label">DISCIPLINE</span>
            <div class="specs-pills-wrap">
              <span class="pill-category">${project.primaryCategory}</span>
              ${secTags}
            </div>
          </div>
          <div class="specs-aside-item">
            <span class="specs-label">ROLE</span>
            <span class="specs-role-val">Visual Designer</span>
          </div>
          <div class="specs-aside-item">
            <span class="specs-label">TOOLS APPLIED</span>
            <div class="specs-pills-wrap">${toolTags}</div>
          </div>
          ${appTags ? `
            <div class="specs-aside-item">
              <span class="specs-label">APPLICATIONS</span>
              <div class="specs-pills-wrap">${appTags}</div>
            </div>
          ` : ''}
        </div>
      </div>

      ${dossierContent}

      ${customContent}

      <!-- 10 — RELATED PROJECTS -->
      ${(() => {
        const relatedProjects = (project.related || [])
          .map((rid) => PROJECTS.find((p) => p.id === rid))
          .filter(Boolean);

        if (relatedProjects.length === 0) return '';

        return `
          <div class="modal-related-section" style="margin-top: 4rem; padding-top: 2.5rem; border-top: 1px solid var(--border-subtle);">
            <h4 style="font-family: var(--font-mono); font-size: 0.8rem; letter-spacing: 0.16em; color: var(--text-muted); text-transform: uppercase; margin-bottom: 1.5rem;">RELATED WORK &amp; CASE STUDIES</h4>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1.5rem;">
              ${relatedProjects.map((rp) => `
                <div class="modal-related-card" data-open-project="${rp.id}" style="cursor: pointer; background: var(--surface-panel); border: 1px solid var(--border-subtle); padding: 1rem; display: flex; flex-direction: column; gap: 0.75rem; transition: border-color var(--transition-fast);">
                  <div style="aspect-ratio: 16/10; overflow: hidden; background: #000; display: flex; align-items: center; justify-content: center;">
                    <img src="${rp.heroImage || (rp.images[0] ? rp.images[0].src : '')}" alt="${rp.title}" loading="lazy" style="max-width: 100%; max-height: 100%; object-fit: contain;" />
                  </div>
                  <div>
                    <span style="font-family: var(--font-mono); font-size: 0.68rem; letter-spacing: 0.12em; color: var(--text-muted); text-transform: uppercase;">${rp.primaryCategory}</span>
                    <h5 style="font-family: var(--font-display); font-size: 1.1rem; color: var(--text-primary); text-transform: uppercase; margin-top: 0.25rem;">${rp.title}</h5>
                    <p style="font-size: 0.82rem; color: var(--text-secondary); line-height: 1.4; margin-top: 0.25rem;">${rp.subtitle}</p>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        `;
      })()}

      <!-- Bottom Pagination Bar: PREVIOUS ← / NEXT → -->
      <nav class="modal-pagination-bar" aria-label="Project Case Study Navigation">
        <button type="button" class="modal-pagination-btn modal-pagination-prev" data-nav-project="${prevProject.id}" aria-label="Previous project: ${prevProject.title}">
          <span class="modal-pagination-kicker">PREVIOUS &larr;</span>
          <span class="modal-pagination-title">${prevProject.title}</span>
          <span class="modal-pagination-cat">${prevProject.primaryCategory}</span>
        </button>
        <div class="modal-pagination-indicator" aria-hidden="true">
          <span class="modal-pagination-count">${currentNum} &sol; ${totalNum}</span>
          <span class="modal-pagination-hint">&larr; ARROW KEYS &rarr;</span>
        </div>
        <button type="button" class="modal-pagination-btn modal-pagination-next" data-nav-project="${nextProject.id}" aria-label="Next project: ${nextProject.title}">
          <span class="modal-pagination-kicker">NEXT &rarr;</span>
          <span class="modal-pagination-title">${nextProject.title}</span>
          <span class="modal-pagination-cat">${nextProject.primaryCategory}</span>
        </button>
      </nav>
    `;

    // Attach Lightbox event listeners to all clickable specimen cards
    content.querySelectorAll('[data-lightbox-index]').forEach((el) => {
      const openLightbox = () => {
        const idx = parseInt(el.getAttribute('data-lightbox-index'), 10);
        this.lightbox.open(project.images, idx);
      };
      el.addEventListener('click', openLightbox);
      el.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openLightbox();
        }
      });
    });

    // Attach Related Project click triggers inside modal
    content.querySelectorAll('[data-open-project]').forEach((el) => {
      el.addEventListener('click', () => {
        const pid = el.getAttribute('data-open-project');
        this.openProjectModal(pid);
      });
    });

    // Attach Previous/Next Project pagination triggers inside modal
    content.querySelectorAll('[data-nav-project]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const navPid = btn.getAttribute('data-nav-project');
        this.openProjectModal(navPid);
      });
    });

    // If 3D project, instantiate viewer in modal
    if (project.is3D) {
      setTimeout(async () => {
        const modalViewport = document.getElementById('modal-three-viewport');
        if (modalViewport) {
          const { ThreeViewer } = await import('./three-viewer.js');
          new ThreeViewer('modal-three-viewport', project.modelPath);
        }
      }, 100);
    }

    // Select primary project hero image for ambient color extraction
    const ambientImage = project.heroImage || (project.images && project.images[0] ? project.images[0].src : null);
    this.updateModalAmbient(project.id, ambientImage);

    modal.classList.add('is-active');
    document.body.style.overflow = 'hidden';

    // Refresh magnetic interaction on pagination buttons
    if (this.interactivity && typeof this.interactivity.refreshMagnetic === 'function') {
      this.interactivity.refreshMagnetic();
    }

    // Intelligent idle-time prefetch of next project hero image for instant navigation
    if ('requestIdleCallback' in window && nextProject) {
      window.requestIdleCallback(() => {
        const nextHero = nextProject.heroImage || (nextProject.images && nextProject.images[0] ? nextProject.images[0].src : '');
        if (nextHero && !document.querySelector(`link[rel="prefetch"][href="${nextHero}"]`)) {
          const prefetchLink = document.createElement('link');
          prefetchLink.rel = 'prefetch';
          prefetchLink.as = 'image';
          prefetchLink.href = nextHero;
          document.head.appendChild(prefetchLink);
        }
      }, { timeout: 2000 });
    }
  }

  navigateModalProject(direction) {
    if (!this.currentModalProject) return;
    const currentIndex = PROJECTS.findIndex((p) => p.id === this.currentModalProject.id);
    if (currentIndex === -1) return;
    const nextIndex = (currentIndex + direction + PROJECTS.length) % PROJECTS.length;
    this.openProjectModal(PROJECTS[nextIndex].id);
  }

  closeProjectModal() {
    const modal = document.getElementById('project-modal');
    if (!modal) return;
    modal.classList.remove('is-active');
    this.resetModalAmbient();
    document.body.style.overflow = '';
    if (window.location.hash.startsWith('#project-')) {
      history.pushState('', document.title, window.location.pathname + window.location.search);
    }
  }

  /* ------------------------------------------------------------------------
     DYNAMIC PROJECT MODAL AMBIENT BACKGROUND SYSTEM
     Extracts project-specific ambient tones, caches them, and projects
     a subtle, gallery-like atmospheric radial glow behind the case study.
     ------------------------------------------------------------------------ */
  initModalAmbientEngine() {
    this.modalAmbientLayerIndex = 0;
    this.modalAmbientLayers = [
      document.getElementById('modal-ambient-layer-0'),
      document.getElementById('modal-ambient-layer-1')
    ];

    // Pre-computed restrained fallback tones per project ID for instant zero-flash opening
    this.ambientColorCache = new Map([
      ['zesis', [20, 35, 55]],      // Architectural slate monochrome
      ['mus26', [95, 32, 65]],      // Subtle dark magenta / violet
      ['emysc', [70, 58, 50]],      // Warm deep sepia poster tone
      ['tekzzo', [75, 64, 58]],     // Warm deep clay
      ['mkegg', [24, 38, 62]],      // Subtle midnight cobalt
      ['arimm', [85, 92, 105]],     // Subtle steel UI tone
      ['calott', [55, 58, 72]],     // Deep slate violet
      ['earth-3d', [48, 72, 94]],   // Subtle atmospheric Earth cyan/blue
      ['stdeed', [115, 42, 38]],    // Subtle deep crimson
      ['atllis', [20, 28, 38]],     // Midnight cyan
      ['kijgo', [95, 78, 72]],      // Warm terracotta
      ['tukeet', [68, 58, 52]],     // Warm bronze print
      ['logeer', [26, 28, 34]],     // Dark carbon
      ['nkitt', [75, 115, 148]],    // Subtle digital blue
      ['pitso', [40, 42, 54]]       // Dark slate violet
    ]);

    // Off-screen canvas for dynamic image color sampling
    this.ambientCanvas = document.createElement('canvas');
    this.ambientCanvas.width = 48;
    this.ambientCanvas.height = 48;
    this.ambientCtx = this.ambientCanvas.getContext('2d', { willReadFrequently: true });
  }

  /**
   * Dynamically extracts dominant accent color from project image
   * @param {string} src Image URL
   * @returns {Promise<number[]>} RGB array [r, g, b]
   */
  async extractProjectAmbientColor(src) {
    if (!src) return [45, 50, 60];

    return new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';

      const timer = setTimeout(() => {
        resolve([45, 50, 60]);
      }, 1200);

      img.onload = () => {
        clearTimeout(timer);
        try {
          if (!this.ambientCtx) {
            this.ambientCtx = this.ambientCanvas.getContext('2d', { willReadFrequently: true });
          }
          this.ambientCtx.clearRect(0, 0, 48, 48);
          this.ambientCtx.drawImage(img, 0, 0, 48, 48);

          const data = this.ambientCtx.getImageData(0, 0, 48, 48).data;
          let totalWeight = 0;
          let rSum = 0, gSum = 0, bSum = 0;

          // Sample pixels
          for (let i = 0; i < data.length; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];

            const max = Math.max(r, g, b);
            const min = Math.min(r, g, b);
            const val = max / 255;
            const sat = max > 0 ? (max - min) / max : 0;

            // Filter out near-black, near-white, or extreme highlights
            if (val > 0.12 && val < 0.94 && sat > 0.14) {
              const weight = sat * val + 0.1;
              rSum += r * weight;
              gSum += g * weight;
              bSum += b * weight;
              totalWeight += weight;
            }
          }

          if (totalWeight > 0) {
            let r = Math.round(rSum / totalWeight);
            let g = Math.round(gSum / totalWeight);
            let b = Math.round(bSum / totalWeight);

            // Calibrate: darker, moody tone, subtle desaturation (max channel clamped to 135)
            const peak = Math.max(r, g, b);
            if (peak > 135) {
              const scale = 135 / peak;
              r = Math.round(r * scale);
              g = Math.round(g * scale);
              b = Math.round(b * scale);
            }
            resolve([r, g, b]);
          } else {
            resolve([45, 50, 60]);
          }
        } catch {
          resolve([45, 50, 60]);
        }
      };

      img.onerror = () => {
        clearTimeout(timer);
        resolve([45, 50, 60]);
      };

      img.src = src;
    });
  }

  /**
   * Applies the ambient radial glow with a smooth 850ms dual-layer crossfade
   * @param {string} projectId 
   * @param {string} imageSrc 
   */
  updateModalAmbient(projectId, imageSrc) {
    if (!this.modalAmbientLayers || !this.modalAmbientLayers[0]) return;

    // Check if color is already in cache
    const cachedColor = this.ambientColorCache.get(projectId);

    const applyColor = (rgb) => {
      // Toggle between Layer 0 and Layer 1 for hardware-accelerated 850ms crossfade
      const nextIndex = 1 - this.modalAmbientLayerIndex;
      const targetLayer = this.modalAmbientLayers[nextIndex];
      const prevLayer = this.modalAmbientLayers[this.modalAmbientLayerIndex];

      if (targetLayer) {
        const [r, g, b] = rgb;
        // Refined subtle 5-10% visual intensity: soft expansive ellipse fading to #080808
        targetLayer.style.background = `radial-gradient(ellipse 110% 85% at 50% 36%, rgba(${r}, ${g}, ${b}, 0.11) 0%, rgba(${r}, ${g}, ${b}, 0.045) 36%, rgba(${r}, ${g}, ${b}, 0.012) 58%, rgba(8, 8, 8, 0) 75%)`;
        targetLayer.classList.add('is-active');
      }

      if (prevLayer) {
        prevLayer.classList.remove('is-active');
      }

      this.modalAmbientLayerIndex = nextIndex;
    };

    if (cachedColor) {
      applyColor(cachedColor);
    } else {
      // Temporary fallback while extracting
      applyColor([45, 50, 60]);
      this.extractProjectAmbientColor(imageSrc).then((extractedRgb) => {
        this.ambientColorCache.set(projectId, extractedRgb);
        applyColor(extractedRgb);
      });
    }
  }

  /**
   * Fades ambient layers out to #080808 when modal closes
   */
  resetModalAmbient() {
    if (!this.modalAmbientLayers) return;
    this.modalAmbientLayers.forEach((layer) => {
      if (layer) layer.classList.remove('is-active');
    });
  }

  setupModalRouting() {
    const modalCloseBtn = document.getElementById('modal-close-trigger');
    if (modalCloseBtn) {
      modalCloseBtn.addEventListener('click', () => this.closeProjectModal());
    }

    // Keydown dismissal is unified inside setupKeyboardNavigation()

    // Handle deep-link direct navigation (#project-zesis)
    window.addEventListener('hashchange', () => {
      this.checkHashRoute();
    });

    this.checkHashRoute();
  }

  checkHashRoute() {
    const hash = window.location.hash;
    if (hash && hash.startsWith('#project-')) {
      const pid = hash.replace('#project-', '');
      this.openProjectModal(pid);
    }
  }



  /* ------------------------------------------------------------------------
     NAVIGATION, SCROLL COMPACTING & ACTIVE INDICATOR (Section 1-5, 24, 25)
     ------------------------------------------------------------------------ */
  setupNavigation() {
    const header = document.getElementById('header');
    const trigger = document.getElementById('mobile-menu-open');
    const closeBtn = document.getElementById('mobile-menu-close');
    const drawer = document.getElementById('mobile-drawer');

    // 1. Scroll-triggered Compact Navbar Transformation (Section 2)
    const onScroll = () => {
      if (header) {
        if (window.scrollY > 35) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // 2. Active Section Indicator
    const navLinks = document.querySelectorAll('.site-header .nav-link');
    const sections = [
      { id: 'hero', label: 'ABOUT' },
      { id: 'work', label: 'WORK' },
      { id: 'disciplines', label: 'DISCIPLINES' },
      { id: '3d-model', label: '3D MODEL' },
      { id: 'archive', label: 'ARCHIVE' },
      { id: 'experience', label: 'EXPERIENCE' },
      { id: 'services', label: 'SERVICES' },
      { id: 'tools', label: 'TOOLS' },
      { id: 'contact', label: 'CONTACT' }
    ];

    const setActiveLink = (targetId) => {
      navLinks.forEach((link) => {
        const sectionAttr = link.getAttribute('data-section');
        const hrefAttr = link.getAttribute('href');
        if (sectionAttr === targetId || hrefAttr === `#${targetId}`) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
    };

    setActiveLink('hero');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveLink(entry.target.id);
        }
      });
    }, {
      rootMargin: '-20% 0px -60% 0px',
      threshold: [0, 0.1, 0.2]
    });

    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    // 3. Smooth scrolling for internal anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', (e) => {
        const href = anchor.getAttribute('href');
        if (!href || href === '#') return;
        if (href === '#3d-model' && this.loadThreeViewer) {
          this.loadThreeViewer();
        }
        if (href === '#hero') {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        }
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });

    // 4. Mobile Menu Drawer (Section 5)
    if (trigger && drawer) {
      trigger.addEventListener('click', () => {
        drawer.classList.add('is-open');
        document.body.style.overflow = 'hidden';
      });
    }

    if (closeBtn && drawer) {
      closeBtn.addEventListener('click', () => {
        drawer.classList.remove('is-open');
        document.body.style.overflow = '';
      });
    }

    document.querySelectorAll('.mobile-menu-link, .mobile-social-item').forEach((link) => {
      link.addEventListener('click', () => {
        if (drawer) drawer.classList.remove('is-open');
        document.body.style.overflow = '';
      });
    });

    // Mobile drawer Escape key dismissal is unified inside setupKeyboardNavigation()

    // 5. Back to Top Smooth Scroll (Section 26)
    document.querySelectorAll('#footer-back-to-top, .footer-top-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    });
  }

  /* ------------------------------------------------------------------------
     DESKTOP MAGNETIC CTA (Max 8-12px movement, disabled on mobile/touch)
     ------------------------------------------------------------------------ */
  setupMagneticCTA() {
    const btn = document.getElementById('contact-magnetic-btn');
    if (!btn) return;

    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const maxMove = 10;

      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const deltaX = (e.clientX - centerX) / (rect.width / 2);
        const deltaY = (e.clientY - centerY) / (rect.height / 2);

        const moveX = Math.max(-maxMove, Math.min(maxMove, deltaX * maxMove));
        const moveY = Math.max(-maxMove, Math.min(maxMove, deltaY * maxMove));

        btn.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
      });

      btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate3d(0, 0, 0)';
      });
    }
  }

  /* ------------------------------------------------------------------------
     LIVE TIME CLOCK (CHENNAI / IST)
     ------------------------------------------------------------------------ */
  setupTimeClock() {
    const clockEl = document.getElementById('ist-clock');
    if (!clockEl) return;

    const updateClock = () => {
      const now = new Date();
      // Chennai is IST (UTC +5:30)
      const options = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      };
      const timeStr = new Intl.DateTimeFormat('en-GB', options).format(now);
      clockEl.textContent = `${timeStr} IST`;
    };

    updateClock();
    setInterval(updateClock, 1000);
  }

  /* ------------------------------------------------------------------------
     WEBSITE AUDIO SOUND ENGINE (sound.mp3)
     Subtle ambient audio loop with toggle control & state persistence
     Deferred initialization: Audio instance only created upon user interaction
     ------------------------------------------------------------------------ */
  setupAudioSound() {
    const soundToggle = document.getElementById('sound-toggle');
    const soundLabel = document.getElementById('sound-toggle-label');
    if (!soundToggle) return;

    // Deferred Audio instance - instantiated only when user plays sound
    const audioPath = 'assets/audio/sound.mp3';
    this.bgAudio = null;

    const getAudio = () => {
      if (!this.bgAudio) {
        this.bgAudio = new Audio(audioPath);
        this.bgAudio.loop = true;
        this.bgAudio.volume = 0.25; // 25% subtle ambient volume
      }
      return this.bgAudio;
    };

    // Sound state: 'on' | 'off'
    let soundPref = localStorage.getItem('sivasuriya-sound-state');
    let isPlaying = false;

    const updateUI = (active) => {
      isPlaying = active;
      if (active) {
        soundToggle.classList.add('is-playing');
        soundToggle.setAttribute('aria-pressed', 'true');
        soundToggle.setAttribute('aria-label', 'Turn background sound OFF');
        soundToggle.title = 'Sound: ON (Click to mute)';
        if (soundLabel) soundLabel.textContent = '';
      } else {
        soundToggle.classList.remove('is-playing');
        soundToggle.setAttribute('aria-pressed', 'false');
        soundToggle.setAttribute('aria-label', 'Turn background sound ON');
        soundToggle.title = 'Sound: OFF (Click to play)';
        if (soundLabel) soundLabel.textContent = '';
      }
    };

    const playAudio = async () => {
      try {
        const audio = getAudio();
        await audio.play();
        updateUI(true);
        localStorage.setItem('sivasuriya-sound-state', 'on');
      } catch (err) {
        // Autoplay policy prevented playback until user interaction
        updateUI(false);
      }
    };

    const pauseAudio = () => {
      if (this.bgAudio) {
        this.bgAudio.pause();
      }
      updateUI(false);
      localStorage.setItem('sivasuriya-sound-state', 'off');
    };

    // Toggle button click listener
    soundToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      if (isPlaying) {
        pauseAudio();
      } else {
        playAudio();
      }
    });

    // Support keyboard activation via Space / Enter
    soundToggle.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (isPlaying) {
          pauseAudio();
        } else {
          playAudio();
        }
      }
    });

    // If user previously turned sound ON, start upon first user interaction
    if (soundPref === 'on') {
      const resumeOnFirstInteraction = () => {
        window.removeEventListener('pointerdown', resumeOnFirstInteraction);
        window.removeEventListener('keydown', resumeOnFirstInteraction);
        if (localStorage.getItem('sivasuriya-sound-state') === 'on' && !isPlaying) {
          playAudio();
        }
      };
      window.addEventListener('pointerdown', resumeOnFirstInteraction, { once: true, passive: true });
      window.addEventListener('keydown', resumeOnFirstInteraction, { once: true, passive: true });
      updateUI(false);
    } else {
      updateUI(false);
    }

    // Page visibility management: pause when backgrounded, resume when active if enabled
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        if (isPlaying && this.bgAudio) {
          this.bgAudio.pause();
        }
      } else {
        const currentPref = localStorage.getItem('sivasuriya-sound-state');
        if (currentPref === 'on' && isPlaying && this.bgAudio) {
          this.bgAudio.play().catch(() => { });
        }
      }
    });
  }

  /* ------------------------------------------------------------------------
     FEATURE 2: EDITORIAL READING PROGRESS
     Razor-thin (2px) scroll indicator fixed to the top (#38bdf8)
     Hardware-friendly (transform: scaleX), no permanent animation loop
     Respects prefers-reduced-motion
     ------------------------------------------------------------------------ */
  setupScrollProgress() {
    const progressBar = document.getElementById('scroll-progress');
    if (!progressBar) return;

    let ticking = false;

    const updateScrollProgress = () => {
      const scrollY = window.scrollY || window.pageYOffset || 0;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollHeight > 0 ? Math.min(1, Math.max(0, scrollY / scrollHeight)) : 0;
      progressBar.style.transform = `scaleX(${progress})`;
      ticking = false;
    };

    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollProgress);
        ticking = true;
      }
    }, { passive: true });

    window.addEventListener('resize', () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollProgress);
        ticking = true;
      }
    }, { passive: true });

    updateScrollProgress();
  }

  /* ------------------------------------------------------------------------
     FEATURE 3: KEYBOARD POWER NAVIGATION
     1..5 section jumping, ESC overlay dismissal, M audio toggle, '?' guide
     Strict guard against interrupting input/textarea editing
     ------------------------------------------------------------------------ */
  setupKeyboardNavigation() {
    const guideModal = document.getElementById('keyboard-guide-modal');
    const guideCloseBtn = document.getElementById('keyboard-guide-close');
    const guideBackdrop = document.getElementById('keyboard-guide-backdrop');

    const openGuide = () => {
      if (!guideModal) return;
      guideModal.classList.add('is-active');
      guideModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      if (guideCloseBtn) guideCloseBtn.focus();
    };

    const closeGuide = () => {
      if (!guideModal) return;
      guideModal.classList.remove('is-active');
      guideModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    };

    const isGuideOpen = () => guideModal && guideModal.classList.contains('is-active');

    if (guideCloseBtn) guideCloseBtn.addEventListener('click', closeGuide);
    if (guideBackdrop) guideBackdrop.addEventListener('click', closeGuide);

    window.addEventListener('keydown', (e) => {
      // 1. Do NOT hijack browser/system shortcuts (Ctrl, Meta, Alt)
      if (e.ctrlKey || e.metaKey || e.altKey) return;

      const activeEl = document.activeElement;
      const isEditing = activeEl && (
        activeEl.tagName === 'INPUT' ||
        activeEl.tagName === 'TEXTAREA' ||
        activeEl.isContentEditable ||
        activeEl.getAttribute('contenteditable') === 'true'
      );

      // 2. ESC key: Dismiss open overlays or blur focused input
      if (e.key === 'Escape') {
        if (isGuideOpen()) {
          e.preventDefault();
          closeGuide();
          return;
        }

        if (this.lightbox && this.lightbox.isOpen) {
          e.preventDefault();
          this.lightbox.close();
          return;
        }

        const projectModal = document.getElementById('project-modal');
        if (projectModal && (projectModal.classList.contains('is-active') || projectModal.classList.contains('is-open'))) {
          e.preventDefault();
          this.closeProjectModal();
          return;
        }

        const drawer = document.getElementById('mobile-drawer');
        if (drawer && drawer.classList.contains('is-open')) {
          e.preventDefault();
          drawer.classList.remove('is-open');
          document.body.style.overflow = '';
          return;
        }

        if (isEditing) {
          activeEl.blur();
          return;
        }

        return;
      }

      // 3. When focused in input or textarea, DO NOT intercept normal typing
      if (isEditing) return;

      // 4. Shortcut '?': Toggle keyboard shortcuts guide overlay
      if (e.key === '?' || (e.shiftKey && e.key === '/')) {
        e.preventDefault();
        if (isGuideOpen()) {
          closeGuide();
        } else {
          openGuide();
        }
        return;
      }

      // If the guide modal is open, don't execute section shortcuts underneath
      if (isGuideOpen()) return;

      // 5. Shortcut '/': Focus archive search input without typing '/'
      if (e.key === '/') {
        e.preventDefault();
        const searchInput = document.getElementById('archive-search-input');
        const archiveSec = document.getElementById('archive') || document.getElementById('all-work');
        if (archiveSec) archiveSec.scrollIntoView({ behavior: 'smooth' });
        if (searchInput) {
          setTimeout(() => {
            searchInput.focus();
            searchInput.select();
          }, 200);
        }
        return;
      }

      // 6. Modal Navigation: ArrowLeft / ArrowRight
      const projectModal = document.getElementById('project-modal');
      const isModalActive = projectModal && (projectModal.classList.contains('is-active') || projectModal.classList.contains('is-open'));
      if (isModalActive && (!this.lightbox || !this.lightbox.isOpen)) {
        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          this.navigateModalProject(-1);
          return;
        }
        if (e.key === 'ArrowRight') {
          e.preventDefault();
          this.navigateModalProject(1);
          return;
        }
      }

      // 7. Shortcut 'M' / 'm': Toggle existing sound system or menu
      if (e.key === 'm' || e.key === 'M') {
        e.preventDefault();
        const soundBtn = document.getElementById('sound-toggle');
        if (soundBtn) soundBtn.click();
        return;
      }

      // 8. Editorial Section Navigation: 1..8
      if (e.key === '1') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (e.key === '2') {
        e.preventDefault();
        const el = document.getElementById('work');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      } else if (e.key === '3') {
        e.preventDefault();
        const el = document.getElementById('disciplines');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      } else if (e.key === '4') {
        e.preventDefault();
        if (this.loadThreeViewer) this.loadThreeViewer();
        const el = document.getElementById('3d-model');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      } else if (e.key === '5') {
        e.preventDefault();
        const el = document.getElementById('archive') || document.getElementById('all-work');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      } else if (e.key === '6') {
        e.preventDefault();
        const el = document.getElementById('experience');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      } else if (e.key === '7') {
        e.preventDefault();
        const el = document.getElementById('services') || document.getElementById('tools');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      } else if (e.key === '8') {
        e.preventDefault();
        const el = document.getElementById('contact');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  /* ------------------------------------------------------------------------
     SECTION ENTRANCE CHOREOGRAPHY
     Subtle, restrained editorial reveal using IntersectionObserver
     Strictly disabled / instant for prefers-reduced-motion
     ------------------------------------------------------------------------ */
  setupSectionEntrance() {
    const isReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const targets = document.querySelectorAll(
      '.section-header-editorial, .editorial-project-row, .discipline-card, .exp-card-redesign, .service-card, .tools-category-card'
    );

    if (isReducedMotion || !('IntersectionObserver' in window)) {
      targets.forEach((el) => el.classList.add('is-inview'));
      return;
    }

    targets.forEach((el) => el.classList.add('editorial-reveal-block'));

    const entranceObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-inview');
          observer.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.08
    });

    targets.forEach((el) => entranceObserver.observe(el));
  }
}

// Bootstrap Application on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  window.portfolioApp = new PortfolioApp();
});
