/**
 * SIVASURIYA PORTFOLIO - SECTION 03: LIVE 3D WORLD & GLOBAL CREATIVE NETWORK
 * Cinematic interactive 3D Earth module rendered in Three.js / WebGL.
 * 
 * Features:
 * - Real-time day/night solar terminator calculated from UTC time and solar declination
 * - 20 Global Creative Network Locations with exact coordinates and timezones
 * - Subtle glowing location nodes with hover, active, and pulsing states
 * - Cinematic spherical camera fly-to with cubic easing
 * - Dynamic great-circle distance calculation (e.g. INDIA -> JAPAN: 5,800 KM)
 * - 3D orbital curved connection arcs with animated traveling signal pulses
 * - Autonomous "World Signal" between active network hubs
 * - Live local time with automatic clock tick and Day/Sunset/Night status
 * - Creative discipline filter integration (ALL, BRANDING, GRAPHIC DESIGN, UI / UX, 3D, MOTION, DIGITAL)
 * - Interactive 20-country directory integration
 * - Keyboard shortcuts: ESC (reset view), R (reset Earth), F (fullscreen)
 * - Double-click zoom, touch drag/pinch, and idle auto-rotation resume
 * - IntersectionObserver viewport pausing for 0% CPU overhead when off-screen
 * - Hard mobile/iOS safety profile: capped DPR, throttled FPS, context lost handling
 */

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

/**
 * Device & Capability Detection
 * Multi-factor heuristic for iOS (iPhone/iPad/iPod, Chrome for iOS CriOS, WebKit mobile)
 */
export const isIOS = (() => {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') return false;
  const ua = navigator.userAgent || '';
  const platform = navigator.platform || '';
  const maxTouchPoints = navigator.maxTouchPoints || 0;
  return (
    /iPad|iPhone|iPod/.test(ua) ||
    /CriOS|FxiOS|Version\/.*Mobile.*Safari/.test(ua) ||
    (platform === 'MacIntel' && maxTouchPoints > 1) ||
    (Boolean(window.webkit) && maxTouchPoints > 0)
  );
})();

export const isMobile = (() => {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') return false;
  if (isIOS) return true;
  const ua = navigator.userAgent || '';
  return (
    /Android|webOS|BlackBerry|IEMobile|Opera Mini/i.test(ua) ||
    window.innerWidth <= 768 ||
    (navigator.maxTouchPoints && navigator.maxTouchPoints > 1 && window.innerWidth <= 1024)
  );
})();

/**
 * Robust device rendering profiles:
 * - Desktop: DPR capped at 1.25, 60 FPS, 64 segments
 * - Mobile: DPR capped at 1.0, 30 FPS, 48 segments
 * - iOS: DPR capped at 0.85, 28 FPS, 36 segments (hard stability profile to prevent WebKit memory pressure)
 */
export const WORLDZ_CONFIG = {
  desktop: {
    maxDpr: 1.25,
    targetFPS: 60,
    frameInterval: 1000 / 60,
    sphereSegments: 64,
    particles: 150,
    arcPoints: 36,
    powerPreference: 'high-performance',
    antialias: true,
    precision: 'highp'
  },
  mobile: {
    maxDpr: 1.0,
    targetFPS: 30,
    frameInterval: 1000 / 30,
    sphereSegments: 48,
    particles: 70,
    arcPoints: 24,
    powerPreference: 'default',
    antialias: false,
    precision: 'mediump'
  },
  ios: {
    maxDpr: 0.85,
    targetFPS: 28,
    frameInterval: 1000 / 28,
    sphereSegments: 36,
    particles: 40,
    arcPoints: 18,
    powerPreference: 'low-power',
    antialias: false,
    precision: 'mediump'
  }
};

let worldzMainInstance = null;
let worldzInitialized = false;
let worldzInitializing = false;
let worldzUnavailable = false;

// Centralized Configuration: 20 Global Creative Locations
export const CREATIVE_LOCATIONS = [
  {
    id: 'india',
    num: '01',
    city: 'CHENNAI',
    country: 'INDIA',
    role: 'Primary Studio & Creative Base',
    isBase: true,
    lat: 13.0827,
    lon: 80.2707,
    timezone: 'Asia/Kolkata',
    tzAbbr: 'IST',
    disciplines: ['BRANDING', 'GRAPHIC DESIGN', 'UI / UX', '3D', 'MOTION', 'DIGITAL'],
    connectedTo: ['japan', 'united-kingdom', 'united-states', 'singapore', 'germany', 'australia'],
    projects: [
      { id: 'zesis', title: 'ZESIS', category: 'BRANDING' },
      { id: 'arimm', title: 'ARIMM', category: 'UI / UX DESIGN' }
    ]
  },
  {
    id: 'united-states',
    num: '02',
    city: 'NEW YORK',
    country: 'UNITED STATES',
    role: 'Digital Systems & Interaction Hub',
    isBase: false,
    lat: 40.7128,
    lon: -74.0060,
    timezone: 'America/New_York',
    tzAbbr: 'EST',
    disciplines: ['UI / UX', 'BRANDING', 'DIGITAL'],
    connectedTo: ['india', 'united-kingdom', 'canada', 'brazil'],
    projects: [
      { id: 'mkegg', title: 'MKEGG', category: 'DIGITAL DESIGN' },
      { id: 'atllis', title: 'ATLLIS', category: 'DIGITAL DESIGN' }
    ]
  },
  {
    id: 'united-kingdom',
    num: '03',
    city: 'LONDON',
    country: 'UNITED KINGDOM',
    role: 'Editorial & Brand Architecture Node',
    isBase: false,
    lat: 51.5074,
    lon: -0.1278,
    timezone: 'Europe/London',
    tzAbbr: 'GMT',
    disciplines: ['BRANDING', 'GRAPHIC DESIGN', 'DIGITAL'],
    connectedTo: ['india', 'united-states', 'france', 'germany', 'netherlands'],
    projects: [
      { id: 'logeer', title: 'LOGEER', category: 'DIGITAL DESIGN' }
    ]
  },
  {
    id: 'japan',
    num: '04',
    city: 'TOKYO',
    country: 'JAPAN',
    role: 'Kinetic Motion & Dimensional Center',
    isBase: false,
    lat: 35.6762,
    lon: 139.6503,
    timezone: 'Asia/Tokyo',
    tzAbbr: 'JST',
    disciplines: ['3D', 'MOTION', 'DIGITAL'],
    connectedTo: ['india', 'south-korea', 'singapore', 'china', 'united-states'],
    projects: [
      { id: 'kijgo', title: 'KIJGO', category: 'GRAPHIC DESIGN' },
      { id: 'mus26', title: 'MUS26', category: 'MOTION DESIGN' }
    ]
  },
  {
    id: 'south-korea',
    num: '05',
    city: 'SEOUL',
    country: 'SOUTH KOREA',
    role: 'Visual Motion & Interface Lab',
    isBase: false,
    lat: 37.5665,
    lon: 126.9780,
    timezone: 'Asia/Seoul',
    tzAbbr: 'KST',
    disciplines: ['MOTION', 'DIGITAL', 'UI / UX'],
    connectedTo: ['japan', 'singapore', 'china'],
    projects: [
      { id: 'mus26', title: 'MUS26', category: 'MOTION DESIGN' }
    ]
  },
  {
    id: 'singapore',
    num: '06',
    city: 'SINGAPORE',
    country: 'SINGAPORE',
    role: 'Southeast Asia Interface & Product Node',
    isBase: false,
    lat: 1.3521,
    lon: 103.8198,
    timezone: 'Asia/Singapore',
    tzAbbr: 'SGT',
    disciplines: ['UI / UX', 'DIGITAL', 'BRANDING'],
    connectedTo: ['india', 'japan', 'australia'],
    projects: [
      { id: 'calott', title: 'CALOTT', category: 'UI / UX DESIGN' }
    ]
  },
  {
    id: 'united-arab-emirates',
    num: '07',
    city: 'DUBAI',
    country: 'UNITED ARAB EMIRATES',
    role: 'Dimensional Systems & Brand Scale',
    isBase: false,
    lat: 25.2048,
    lon: 55.2708,
    timezone: 'Asia/Dubai',
    tzAbbr: 'GST',
    disciplines: ['BRANDING', '3D', 'DIGITAL'],
    connectedTo: ['india', 'united-kingdom', 'germany'],
    projects: [
      { id: 'stdeed', title: 'STDEED', category: 'GRAPHIC DESIGN' }
    ]
  },
  {
    id: 'germany',
    num: '08',
    city: 'BERLIN',
    country: 'GERMANY',
    role: 'Typographic Rigor & Experimental Design',
    isBase: false,
    lat: 52.5200,
    lon: 13.4050,
    timezone: 'Europe/Berlin',
    tzAbbr: 'CET',
    disciplines: ['GRAPHIC DESIGN', 'BRANDING', '3D'],
    connectedTo: ['india', 'united-kingdom', 'france', 'switzerland', 'netherlands'],
    projects: [
      { id: 'tekzzo', title: 'TEKZZO', category: 'POSTER & PRINT' }
    ]
  },
  {
    id: 'france',
    num: '09',
    city: 'PARIS',
    country: 'FRANCE',
    role: 'Editorial Art Direction & Print Culture',
    isBase: false,
    lat: 48.8566,
    lon: 2.3522,
    timezone: 'Europe/Paris',
    tzAbbr: 'CET',
    disciplines: ['GRAPHIC DESIGN', 'BRANDING', 'DIGITAL'],
    connectedTo: ['united-kingdom', 'germany', 'italy', 'spain'],
    projects: [
      { id: 'emysc', title: 'EMYSC', category: 'POSTER & PRINT' }
    ]
  },
  {
    id: 'italy',
    num: '10',
    city: 'MILAN',
    country: 'ITALY',
    role: 'Editorial Craft & Identity Systems',
    isBase: false,
    lat: 45.4642,
    lon: 9.1900,
    timezone: 'Europe/Rome',
    tzAbbr: 'CET',
    disciplines: ['BRANDING', 'GRAPHIC DESIGN'],
    connectedTo: ['france', 'switzerland', 'germany'],
    projects: [
      { id: 'zesis', title: 'ZESIS', category: 'BRANDING' }
    ]
  },
  {
    id: 'netherlands',
    num: '11',
    city: 'AMSTERDAM',
    country: 'NETHERLANDS',
    role: 'Digital Design Systems & Web Standards',
    isBase: false,
    lat: 52.3676,
    lon: 4.9041,
    timezone: 'Europe/Amsterdam',
    tzAbbr: 'CET',
    disciplines: ['UI / UX', 'DIGITAL', 'GRAPHIC DESIGN'],
    connectedTo: ['united-kingdom', 'germany', 'sweden'],
    projects: [
      { id: 'pitso', title: 'PITSO', category: 'UI / UX DESIGN' }
    ]
  },
  {
    id: 'switzerland',
    num: '12',
    city: 'ZURICH',
    country: 'SWITZERLAND',
    role: 'Swiss Editorial & Grid Engineering',
    isBase: false,
    lat: 47.3769,
    lon: 8.5417,
    timezone: 'Europe/Zurich',
    tzAbbr: 'CET',
    disciplines: ['GRAPHIC DESIGN', 'BRANDING', 'UI / UX'],
    connectedTo: ['germany', 'italy', 'france'],
    projects: [
      { id: 'tukeet', title: 'TUKEET', category: 'POSTER & PRINT' }
    ]
  },
  {
    id: 'sweden',
    num: '13',
    city: 'STOCKHOLM',
    country: 'SWEDEN',
    role: 'Minimal Interface Systems & Product',
    isBase: false,
    lat: 59.3293,
    lon: 18.0686,
    timezone: 'Europe/Stockholm',
    tzAbbr: 'CET',
    disciplines: ['UI / UX', 'DIGITAL', 'MOTION'],
    connectedTo: ['netherlands', 'germany', 'united-kingdom'],
    projects: [
      { id: 'nkitt', title: 'NKITT', category: 'UI / UX DESIGN' }
    ]
  },
  {
    id: 'australia',
    num: '14',
    city: 'SYDNEY',
    country: 'AUSTRALIA',
    role: 'Dimensional Visualizations & 3D Form',
    isBase: false,
    lat: -33.8688,
    lon: 151.2093,
    timezone: 'Australia/Sydney',
    tzAbbr: 'AEST',
    disciplines: ['3D', 'MOTION', 'DIGITAL'],
    connectedTo: ['singapore', 'india', 'japan'],
    projects: [
      { id: 'earth-3d', title: 'EARTH 3D', category: '3D DESIGN' }
    ]
  },
  {
    id: 'canada',
    num: '15',
    city: 'TORONTO',
    country: 'CANADA',
    role: 'Interactive Environments & Digital Systems',
    isBase: false,
    lat: 43.6532,
    lon: -79.3832,
    timezone: 'America/Toronto',
    tzAbbr: 'EST',
    disciplines: ['DIGITAL', 'UI / UX', 'MOTION'],
    connectedTo: ['united-states', 'united-kingdom'],
    projects: [
      { id: 'atllis', title: 'ATLLIS', category: 'DIGITAL DESIGN' }
    ]
  },
  {
    id: 'brazil',
    num: '16',
    city: 'SAO PAULO',
    country: 'BRAZIL',
    role: 'Expressive Identity & Brand Color',
    isBase: false,
    lat: -23.5505,
    lon: -46.6333,
    timezone: 'America/Sao_Paulo',
    tzAbbr: 'BRT',
    disciplines: ['GRAPHIC DESIGN', 'BRANDING', 'DIGITAL'],
    connectedTo: ['united-states', 'spain'],
    projects: [
      { id: 'kijgo', title: 'KIJGO', category: 'GRAPHIC DESIGN' }
    ]
  },
  {
    id: 'mexico',
    num: '17',
    city: 'MEXICO CITY',
    country: 'MEXICO',
    role: 'Print Screenwork & Large Scale Media',
    isBase: false,
    lat: 19.4326,
    lon: -99.1332,
    timezone: 'America/Mexico_City',
    tzAbbr: 'CST',
    disciplines: ['GRAPHIC DESIGN', 'BRANDING'],
    connectedTo: ['united-states', 'brazil'],
    projects: [
      { id: 'emysc', title: 'EMYSC', category: 'POSTER & PRINT' }
    ]
  },
  {
    id: 'china',
    num: '18',
    city: 'SHANGHAI',
    country: 'CHINA',
    role: 'Generative Media & Realtime WebGL',
    isBase: false,
    lat: 31.2304,
    lon: 121.4737,
    timezone: 'Asia/Shanghai',
    tzAbbr: 'CST',
    disciplines: ['DIGITAL', '3D', 'MOTION'],
    connectedTo: ['japan', 'south-korea', 'singapore'],
    projects: [
      { id: 'mus26', title: 'MUS26', category: 'MOTION DESIGN' }
    ]
  },
  {
    id: 'spain',
    num: '19',
    city: 'BARCELONA',
    country: 'SPAIN',
    role: 'Visual Synthesis & Editorial Art',
    isBase: false,
    lat: 41.3879,
    lon: 2.1699,
    timezone: 'Europe/Madrid',
    tzAbbr: 'CET',
    disciplines: ['GRAPHIC DESIGN', 'BRANDING', 'DIGITAL'],
    connectedTo: ['france', 'italy', 'brazil'],
    projects: [
      { id: 'tekzzo', title: 'TEKZZO', category: 'POSTER & PRINT' }
    ]
  },
  {
    id: 'south-africa',
    num: '20',
    city: 'CAPE TOWN',
    country: 'SOUTH AFRICA',
    role: 'Brand Culture & Visual Systems',
    isBase: false,
    lat: -33.9249,
    lon: 18.4241,
    timezone: 'Africa/Johannesburg',
    tzAbbr: 'SAST',
    disciplines: ['BRANDING', 'GRAPHIC DESIGN', 'DIGITAL'],
    connectedTo: ['india', 'united-kingdom', 'united-arab-emirates'],
    projects: [
      { id: 'zesis', title: 'ZESIS', category: 'BRANDING' }
    ]
  }
];

/**
 * Calculate great-circle distance between two geographic coordinates using Haversine formula (km).
 */
export function calculateGreatCircleDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth mean radius in kilometers
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c);
}

/**
 * 15 Global Locations for Continuous Live World Clock Marquee
 * Correct IANA timezones, real-time live clock updates & solar day/night tracking
 */
export const MARQUEE_LOCATIONS = [
  { id: 'india', city: 'CHENNAI', timezone: 'Asia/Kolkata', tzAbbr: 'IST', lat: 13.0827, lon: 80.2707 },
  { id: 'japan', city: 'TOKYO', timezone: 'Asia/Tokyo', tzAbbr: 'JST', lat: 35.6762, lon: 139.6503 },
  { id: 'united-kingdom', city: 'LONDON', timezone: 'Europe/London', tzAbbr: 'GMT', lat: 51.5074, lon: -0.1278 },
  { id: 'united-states', city: 'NEW YORK', timezone: 'America/New_York', tzAbbr: 'EST', lat: 40.7128, lon: -74.0060 },
  { id: 'germany', city: 'BERLIN', timezone: 'Europe/Berlin', tzAbbr: 'CET', lat: 52.5200, lon: 13.4050 },
  { id: 'united-arab-emirates', city: 'DUBAI', timezone: 'Asia/Dubai', tzAbbr: 'GST', lat: 25.2048, lon: 55.2708 },
  { id: 'singapore', city: 'SINGAPORE', timezone: 'Asia/Singapore', tzAbbr: 'SGT', lat: 1.3521, lon: 103.8198 },
  { id: 'south-korea', city: 'SEOUL', timezone: 'Asia/Seoul', tzAbbr: 'KST', lat: 37.5665, lon: 126.9780 },
  { id: 'france', city: 'PARIS', timezone: 'Europe/Paris', tzAbbr: 'CET', lat: 48.8566, lon: 2.3522 },
  { id: 'netherlands', city: 'AMSTERDAM', timezone: 'Europe/Amsterdam', tzAbbr: 'CET', lat: 52.3676, lon: 4.9041 },
  { id: 'switzerland', city: 'ZURICH', timezone: 'Europe/Zurich', tzAbbr: 'CET', lat: 47.3769, lon: 8.5417 },
  { id: 'sweden', city: 'STOCKHOLM', timezone: 'Europe/Stockholm', tzAbbr: 'CET', lat: 59.3293, lon: 18.0686 },
  { id: 'australia', city: 'SYDNEY', timezone: 'Australia/Sydney', tzAbbr: 'AEDT', lat: -33.8688, lon: 151.2093 },
  { id: 'canada', city: 'TORONTO', timezone: 'America/Toronto', tzAbbr: 'EST', lat: 43.6532, lon: -79.3832 },
  { id: 'brazil', city: 'SÃO PAULO', timezone: 'America/Sao_Paulo', tzAbbr: 'BRT', lat: -23.5505, lon: -46.6333 }
];

/**
 * Determine local solar elevation status: DAY, SUNSET / TWILIGHT, or NIGHT.
 */
export function getSolarStatus(lat, lon, now = new Date()) {
  const utcHours = now.getUTCHours() + now.getUTCMinutes() / 60 + now.getUTCSeconds() / 3600;
  const startOfYear = new Date(Date.UTC(now.getUTCFullYear(), 0, 1));
  const dayOfYear = (now - startOfYear) / (1000 * 60 * 60 * 24);
  const declination = 23.44 * Math.sin(((dayOfYear - 80) / 365) * 2 * Math.PI) * (Math.PI / 180);
  const sunLon = (12 - utcHours) * 15;
  const hourAngle = (lon - sunLon) * (Math.PI / 180);
  const phi = (lat * Math.PI) / 180;

  const sinAlpha = Math.sin(phi) * Math.sin(declination) + Math.cos(phi) * Math.cos(declination) * Math.cos(hourAngle);
  const alphaDeg = (Math.asin(Math.max(-1, Math.min(1, sinAlpha))) * 180) / Math.PI;

  if (alphaDeg > 6) return { status: 'DAY', label: 'DAY', icon: '☀️' };
  if (alphaDeg >= -6) return { status: 'SUNSET', label: 'SUNSET / TWILIGHT', icon: '🌅' };
  return { status: 'NIGHT', label: 'NIGHT', icon: '🌙' };
}

/**
 * Get formatted local time for given IANA timezone.
 */
export function getLocalTimeString(timezone, now = new Date()) {
  try {
    const formatter = new Intl.DateTimeFormat('en-GB', {
      timeZone: timezone,
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
    return formatter.format(now);
  } catch (e) {
    return '--:--';
  }
}


export class ThreeViewer {
  constructor(containerId, modelUrl = 'assets/3d/earth.glb') {
    this.containerId = containerId;
    this.isMainViewer = (containerId === 'three-viewport');

    // Strict Singleton Guard for WORLDZ
    if (this.isMainViewer) {
      if (worldzUnavailable) {
        console.warn('[WORLDZ] initialization skipped: unavailable for session');
        return;
      }
      if (worldzInitialized || worldzInitializing) {
        return worldzMainInstance;
      }
      worldzInitializing = true;
      worldzMainInstance = this;
    }

    this.container = document.getElementById(containerId);
    if (!this.container) {
      if (this.isMainViewer) worldzInitializing = false;
      return;
    }

    const profileKey = isIOS ? 'ios' : (isMobile ? 'mobile' : 'desktop');
    this.profile = WORLDZ_CONFIG[profileKey];
    this.modelUrl = modelUrl;
    this.isEarthScene = modelUrl.toLowerCase().includes('earth');

    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.controls = null;
    this.model = null;
    this.earthMesh = null;
    this.earthRadius = 1.1;

    // Motion & interaction states
    const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.prefersReducedMotion = prefersReducedMotion;
    this.isAutoRotating = !prefersReducedMotion;
    this.autoRotateBaseSpeed = 0.55;
    this.defaultCamPos = new THREE.Vector3(0, 0, 3.8);
    this.defaultTarget = new THREE.Vector3(0, 0, 0);
    this.renderMode = 'solid';
    this.wireframeObjects = [];

    // Pre-allocated scratch objects to eliminate per-frame GC allocations
    this._scratchVec3_1 = new THREE.Vector3();
    this._scratchVec3_2 = new THREE.Vector3();
    this._scratchQuat_1 = new THREE.Quaternion();
    this._scratchQuat_2 = new THREE.Quaternion();
    this._unitZ = new THREE.Vector3(0, 0, 1);
    this._pointerCoords = { x: 0, y: 0, screenX: 0, screenY: 0 };

    // Idle auto-rotation resume timer
    this.idleTimer = null;
    this.isInteracting = false;

    // Animation & Fly-to state
    this.isFlying = false;
    this.flyStartTime = 0;
    this.flyDuration = 1350; // 1.35s cinematic easing
    this.flyStartPos = new THREE.Vector3();
    this.flyTargetPos = new THREE.Vector3();
    this.flyStartDistance = 3.8;
    this.flyTargetDistance = 2.75;
    this.flyStartQuat = new THREE.Quaternion();
    this.flyTargetQuat = new THREE.Quaternion();

    // Creative locations, markers & connection arcs
    this.markersGroup = null;
    this.markerObjects = [];
    this.arcObjects = [];
    this.hitBoxObjects = [];
    this.activeDiscipline = 'ALL';
    this.selectedLocation = null;
    this.previousSelectedLocation = CREATIVE_LOCATIONS[0]; // Base: Chennai

    // World Signal (autonomous traveling signal between active hubs)
    this.worldSignalTimer = null;
    this.worldSignalArc = null;
    this.worldSignalProgress = 0;
    this.worldSignalPulseMesh = null;
    this.activeSignalHops = ['india', 'singapore', 'japan', 'united-states', 'united-kingdom', 'germany', 'india'];
    this.currentHopIndex = 0;

    // Viewport optimization & single RAF loop guards
    this.isPaused = false;
    this.isOffscreen = false;
    this.animationFrameId = null;
    this.isRendering = false;
    this.lastFrameTime = 0;
    this.intersectionObserver = null;
    this.resizeObserver = null;
    this.resizeRafId = null;

    // Interactive pointer & raycasting
    this.mouse = { x: 0, y: 0 };
    this.time = 0;
    this.raycaster = new THREE.Raycaster();
    this.rayMouse = new THREE.Vector2();
    this.hoveredMarker = null;

    // Clock update interval
    this.clockInterval = null;

    // Event listener tracking for clean disposal
    this._cleanups = [];

    this.init();
  }

  init() {
    console.log('[WORLDZ] initialization started');
    console.log('[WORLDZ] Three.js loaded');

    this.container.innerHTML = '';
    this.container.style.position = 'relative';
    this.container.style.overflow = 'hidden';
    this.container.style.cursor = 'grab';

    // Drag cursor state & idle handling
    const onMouseDown = () => {
      this.container.style.cursor = 'grabbing';
      this.handleUserInteractionStart();
    };
    const onMouseUp = () => {
      this.container.style.cursor = 'grab';
      this.handleUserInteractionEnd();
    };
    const onTouchStart = () => {
      this.handleUserInteractionStart();
    };
    const onTouchEnd = () => {
      this.handleUserInteractionEnd();
    };
    const onDblClick = (e) => {
      this.handleDoubleClick(e);
    };

    this.container.addEventListener('mousedown', onMouseDown);
    this.container.addEventListener('mouseup', onMouseUp);
    this.container.addEventListener('touchstart', onTouchStart, { passive: true });
    this.container.addEventListener('touchend', onTouchEnd, { passive: true });
    this.container.addEventListener('dblclick', onDblClick);

    this._cleanups.push(() => {
      this.container.removeEventListener('mousedown', onMouseDown);
      this.container.removeEventListener('mouseup', onMouseUp);
      this.container.removeEventListener('touchstart', onTouchStart);
      this.container.removeEventListener('touchend', onTouchEnd);
      this.container.removeEventListener('dblclick', onDblClick);
    });

    // Loading overlay
    this.loadingEl = document.createElement('div');
    this.loadingEl.className = 'three-loader';
    this.loadingEl.innerHTML = `
      <div class="three-loader-inner">
        <span class="three-loader-spinner"></span>
        <span class="three-loader-text">INITIALIZING 3D ENVIRONMENT</span>
        <span class="three-loader-pct">0%</span>
      </div>
    `;
    this.container.appendChild(this.loadingEl);

    // Floating 3D Projected Screen Tooltip
    this.tooltipEl = document.createElement('div');
    this.tooltipEl.className = 'world-marker-tooltip';
    this.tooltipEl.id = 'world-marker-3d-tooltip';
    this.tooltipEl.style.display = 'none';
    this.container.appendChild(this.tooltipEl);

    // Scene
    this.scene = new THREE.Scene();
    console.log('[WORLDZ] scene created');

    // Camera
    const width = Math.max(this.container.clientWidth || 800, 100);
    const height = Math.max(this.container.clientHeight || 500, 100);
    this.camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    this.camera.position.copy(this.defaultCamPos);

    // Renderer with try-catch context creation
    try {
      this.renderer = new THREE.WebGLRenderer({
        antialias: this.profile.antialias,
        alpha: true,
        powerPreference: this.profile.powerPreference,
        precision: this.profile.precision,
        failIfMajorPerformanceCaveat: false
      });
      console.log('[WORLDZ] renderer created');
    } catch (err) {
      console.error('[WORLDZ] WebGL initialization failed:', err);
      this.gracefullyDisableWorldz(err);
      if (this.isMainViewer) {
        worldzInitializing = false;
        worldzUnavailable = true;
      }
      return;
    }

    this.renderer.setSize(width, height);
    const dpr = Math.min(window.devicePixelRatio || 1, this.profile.maxDpr);
    this.renderer.setPixelRatio(dpr);
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.15;
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.container.appendChild(this.renderer.domElement);

    // Context loss / restore handlers
    const canvas = this.renderer.domElement;
    this.onContextLost = (e) => {
      e.preventDefault();
      console.warn('[WORLDZ] context lost');
      if (this.isMainViewer) worldzUnavailable = true;
      this.stopAnimation();
      this.isPaused = true;
      if (this.controls) this.controls.enabled = false;
    };
    this.onContextRestored = () => {
      console.log('[WORLDZ] context restored');
    };
    canvas.addEventListener('webglcontextlost', this.onContextLost, false);
    canvas.addEventListener('webglcontextrestored', this.onContextRestored, false);

    // OrbitControls with smooth inertia damping & touch pinch-zoom
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.autoRotate = this.isAutoRotating;
    this.controls.autoRotateSpeed = this.autoRotateBaseSpeed;
    this.controls.enableZoom = true;
    this.controls.enableRotate = true;
    this.controls.touches = { ONE: THREE.TOUCH.ROTATE, TWO: THREE.TOUCH.DOLLY_PAN };
    this.controls.minDistance = 1.65;
    this.controls.maxDistance = 7.5;
    this.controls.enablePan = true;
    this.controls.target.copy(this.defaultTarget);

    // Lighting (Day/Night real-time solar terminator)
    this.setupLighting();

    // Cosmic starfield background particles
    this.setupCosmicParticles();

    // Raycasting for marker hover & click interaction
    this.setupRaycasting();

    // Load Model / Earth
    this.loadModel();

    // Build HUD Controls
    this.buildControlsUI();

    // Directory & Clock only on main section viewer
    if (this.isMainViewer) {
      this.buildCountryDirectory();
      this.buildLiveWorldClock();
      this.clockInterval = setInterval(() => {
        this.updateLiveClocks();
      }, 1000);
      this.startWorldSignalLoop();
    }

    // Viewport Intersection Observer
    this.setupViewportObserver();

    // Global Keyboard Shortcuts
    this.setupKeyboardShortcuts();

    // Throttled Resize handling
    this.resizeObserver = new ResizeObserver(() => {
      if (this.resizeRafId) cancelAnimationFrame(this.resizeRafId);
      this.resizeRafId = requestAnimationFrame(() => {
        this.onResize();
      });
    });
    this.resizeObserver.observe(this.container);

    // Start animation loop
    this.startAnimation();
  }

  handleUserInteractionStart() {
    this.isInteracting = true;
    if (this.controls) this.controls.autoRotate = false;
    if (this.idleTimer) clearTimeout(this.idleTimer);
    this.fadeInteractionHint();
  }

  handleUserInteractionEnd() {
    this.isInteracting = false;
    if (this.idleTimer) clearTimeout(this.idleTimer);
    if (!this.prefersReducedMotion) {
      this.idleTimer = setTimeout(() => {
        if (!this.isInteracting && !this.isFlying && this.controls) {
          this.isAutoRotating = true;
          this.controls.autoRotate = true;
          const btnAuto = this.container.querySelector('#three-btn-autorotate');
          if (btnAuto) btnAuto.classList.add('active');
        }
      }, 4500);
    }
  }

  handleDoubleClick(e) {
    const coords = this.getPointerCoords(e);
    this.rayMouse.x = coords.x;
    this.rayMouse.y = coords.y;
    this.raycaster.setFromCamera(this.rayMouse, this.camera);
    const intersects = this.raycaster.intersectObjects(this.hitBoxObjects);

    if (intersects.length > 0) {
      const loc = intersects[0].object.userData.location;
      if (loc) this.selectLocation(loc);
    } else {
      const currentDist = this.camera.position.distanceTo(this.controls.target);
      if (currentDist > 3.2) {
        this.zoomToDistance(2.4);
      } else {
        this.resetView();
      }
    }
  }

  setupLighting() {
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.48);
    this.scene.add(ambientLight);

    this.sunLight = new THREE.DirectionalLight(0xfff9f0, 2.6);
    this.updateSunPosition();
    this.scene.add(this.sunLight);

    this.nightRimLight = new THREE.DirectionalLight(0x1a2e55, 0.68);
    this.updateNightLightPosition();
    this.scene.add(this.nightRimLight);

    const topLight = new THREE.HemisphereLight(0x88bbff, 0x0a0e1a, 0.35);
    this.scene.add(topLight);
  }

  updateSunPosition() {
    if (!this.sunLight) return;
    const now = new Date();
    const utcHours = now.getUTCHours() + now.getUTCMinutes() / 60 + now.getUTCSeconds() / 3600;
    const sunLonDeg = (12 - utcHours) * 15;
    const startOfYear = new Date(Date.UTC(now.getUTCFullYear(), 0, 1));
    const dayOfYear = (now - startOfYear) / (1000 * 60 * 60 * 24);
    const sunLatDeg = 23.44 * Math.sin(((dayOfYear - 80) / 365) * 2 * Math.PI);

    const phi = (90 - sunLatDeg) * (Math.PI / 180);
    const theta = (sunLonDeg + 180) * (Math.PI / 180);
    const dist = 12;
    const sunX = -(dist * Math.sin(phi) * Math.cos(theta));
    const sunY = dist * Math.cos(phi);
    const sunZ = dist * Math.sin(phi) * Math.sin(theta);

    this.sunLight.position.set(sunX, sunY, sunZ);
  }

  updateNightLightPosition() {
    if (!this.sunLight || !this.nightRimLight) return;
    this._scratchVec3_2.copy(this.sunLight.position).negate().normalize().multiplyScalar(10);
    this.nightRimLight.position.copy(this._scratchVec3_2);
  }

  setupCosmicParticles() {
    const particleCount = this.profile.particles;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 20;
      positions[i + 1] = (Math.random() - 0.5) * 20;
      positions[i + 2] = (Math.random() - 0.5) * 20;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const material = new THREE.PointsMaterial({
      color: 0x88a0cc,
      size: 0.022,
      transparent: true,
      opacity: 0.4
    });

    this.particles = new THREE.Points(geometry, material);
    this.scene.add(this.particles);
  }

  setupViewportObserver() {
    this.isOffscreen = false;
    if ('IntersectionObserver' in window) {
      this.intersectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          this.isOffscreen = !entry.isIntersecting;
          if (this.isOffscreen) {
            this.stopAnimation();
          } else if (!document.hidden) {
            this.startAnimation();
          }
        });
      }, { rootMargin: '200px 0px', threshold: 0.01 });
      this.intersectionObserver.observe(this.container);
    }

    this.onVisibilityChange = () => {
      if (document.hidden) {
        this.stopAnimation();
      } else if (!this.isOffscreen) {
        this.startAnimation();
      }
    };
    document.addEventListener('visibilitychange', this.onVisibilityChange);
  }

  setPaused(paused) {
    this.isPaused = !!paused;
    if (this.isPaused) {
      this.stopAnimation();
    } else if (!this.isOffscreen) {
      this.startAnimation();
    }
  }

  setupKeyboardShortcuts() {
    const onKeyDown = (e) => {
      if (this.isPaused || this.isOffscreen) return;

      if (e.key === 'Escape' || e.key === 'r' || e.key === 'R') {
        this.resetView();
      } else if (e.key === 'f' || e.key === 'F') {
        this.toggleFullscreen();
      } else if (e.key === ' ') {
        if (document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
          e.preventDefault();
          this.toggleAutoRotate();
        }
      }
    };
    window.addEventListener('keydown', onKeyDown);
    this._cleanups.push(() => window.removeEventListener('keydown', onKeyDown));
  }

  fadeInteractionHint() {
    const hint = document.getElementById('world-interaction-hint');
    if (hint && !hint.classList.contains('is-faded')) {
      hint.classList.add('is-faded');
    }
  }

  loadModel() {
    const loader = new GLTFLoader();
    const pctEl = this.loadingEl ? this.loadingEl.querySelector('.three-loader-pct') : null;

    loader.load(
      encodeURI(this.modelUrl),
      (gltf) => {
        this.model = gltf.scene;

        this.model.traverse((child) => {
          if (child.isMesh) {
            const name = (child.name || '').toLowerCase();
            const matName = (child.material?.name || '').toLowerCase();

            // Hide standalone sun geometry and duplicate background spheres
            if (name.includes('sun') || matName.includes('sun') || name === 'sphere.004' || name.endsWith('.001')) {
              child.visible = false;
              return;
            }

            child.userData.originalMaterial = child.material;

            // Atmosphere subtle cyan-blue glow
            if (name.includes('atmosphere') || matName.includes('atmosphere')) {
              child.material.transparent = true;
              child.material.opacity = 0.28;
              child.material.depthWrite = false;
              child.material.blending = THREE.AdditiveBlending;
              if (child.material.color) {
                child.material.color.setHex(0x38bdf8);
              }
            } else if (name.includes('cloud') || matName.includes('cloud')) {
              child.material.transparent = true;
              child.material.opacity = 0.42;
              child.material.depthWrite = false;
            } else if (name.includes('aurora') || matName.includes('aurora')) {
              child.material.transparent = true;
              child.material.opacity = 0.22;
              child.material.depthWrite = false;
            }

            if (name.includes('earth') || matName.includes('earth') || name.includes('sphere')) {
              if (name.includes('earth') || matName.includes('earth')) {
                this.earthMesh = child;
                if (child.material) {
                  child.material.roughness = 0.65;
                  child.material.metalness = 0.05;
                }
              }
            }
          }
        });

        // Center and scale specifically on Earth
        const targetObj = this.earthMesh || this.model;
        const box = new THREE.Box3().setFromObject(targetObj);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);

        const scale = 2.2 / (maxDim || 1);
        this.model.scale.setScalar(scale);

        this.model.position.x = -center.x * scale;
        this.model.position.y = -center.y * scale;
        this.model.position.z = -center.z * scale;

        this.earthRadius = 1.1;

        // Build 20 Creative Locations & Connection Arcs if this is Earth
        if (this.isEarthScene && this.isMainViewer) {
          this.setupCreativeNetwork(this.earthMesh);
        }

        this.scene.add(this.model);
        console.log('[WORLDZ] earth created');

        if (this.isMainViewer) {
          worldzInitialized = true;
          worldzInitializing = false;
        }

        // Apply initial render mode
        this.applyRenderMode();

        // Smoothly dismiss loading overlay
        if (this.loadingEl) {
          this.loadingEl.classList.add('fade-out');
          setTimeout(() => {
            if (this.loadingEl && this.loadingEl.parentNode) {
              this.loadingEl.parentNode.removeChild(this.loadingEl);
            }
          }, 300);
        }
      },
      (xhr) => {
        if (xhr.lengthComputable && pctEl) {
          const percent = Math.round((xhr.loaded / xhr.total) * 100);
          pctEl.textContent = `${percent}%`;
        }
      },
      (error) => {
        console.warn('[WORLDZ] 3D model load failed, creating robust procedural Earth:', error);
        this.createFallbackEarth();
      }
    );
  }

  createFallbackEarth() {
    const segs = this.profile.sphereSegments;
    const geom = new THREE.SphereGeometry(this.earthRadius, segs, Math.round(segs / 2));
    const textureLoader = new THREE.TextureLoader();

    textureLoader.load(
      'assets/3d/EARTH3D.webp',
      (texture) => {
        texture.colorSpace = THREE.SRGBColorSpace;
        const mat = new THREE.MeshStandardMaterial({
          map: texture,
          roughness: 0.65,
          metalness: 0.05
        });
        const mesh = new THREE.Mesh(geom, mat);
        this.earthMesh = mesh;
        this.model = new THREE.Group();
        this.model.add(mesh);

        // Atmosphere shell
        const atmoGeom = new THREE.SphereGeometry(this.earthRadius * 1.025, Math.round(segs / 2), Math.round(segs / 4));
        const atmoMat = new THREE.MeshBasicMaterial({
          color: 0x38bdf8,
          transparent: true,
          opacity: 0.18,
          blending: THREE.AdditiveBlending,
          side: THREE.BackSide
        });
        const atmoMesh = new THREE.Mesh(atmoGeom, atmoMat);
        this.model.add(atmoMesh);

        if (this.isEarthScene && this.isMainViewer) {
          this.setupCreativeNetwork(this.earthMesh);
        }

        this.scene.add(this.model);
        console.log('[WORLDZ] earth created');

        if (this.isMainViewer) {
          worldzInitialized = true;
          worldzInitializing = false;
        }

        if (this.loadingEl && this.loadingEl.parentNode) {
          this.loadingEl.parentNode.removeChild(this.loadingEl);
        }
      },
      undefined,
      (err) => {
        console.error('[WORLDZ] Fallback texture load failed:', err);
        this.gracefullyDisableWorldz(err);
      }
    );
  }

  latLonToVector3(lat, lon, radius) {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);
    const x = -(radius * Math.sin(phi) * Math.cos(theta));
    const y = radius * Math.cos(phi);
    const z = radius * Math.sin(phi) * Math.sin(theta);
    return new THREE.Vector3(x, y, z);
  }

  setupCreativeNetwork(earthMesh) {
    this.markersGroup = new THREE.Group();
    this.markersGroup.name = 'creative-network-markers';

    const baseLoc = CREATIVE_LOCATIONS.find(l => l.isBase) || CREATIVE_LOCATIONS[0];

    CREATIVE_LOCATIONS.forEach((loc, idx) => {
      const pos = this.latLonToVector3(loc.lat, loc.lon, this.earthRadius * 1.018);

      const markerObj = new THREE.Group();
      markerObj.position.copy(pos);
      markerObj.lookAt(pos.clone().multiplyScalar(2));

      // 1. Inner core dot
      const coreGeom = new THREE.CircleGeometry(loc.isBase ? 0.024 : 0.016, isIOS ? 16 : 24);
      const coreMat = new THREE.MeshBasicMaterial({
        color: loc.isBase ? 0x60a5fa : 0xf8fafc,
        side: THREE.DoubleSide
      });
      const coreMesh = new THREE.Mesh(coreGeom, coreMat);
      markerObj.add(coreMesh);

      // 2. Subtle pulsing ring
      const ringGeom = new THREE.RingGeometry(loc.isBase ? 0.032 : 0.022, loc.isBase ? 0.044 : 0.032, isIOS ? 20 : 32);
      const ringMat = new THREE.MeshBasicMaterial({
        color: loc.isBase ? 0x38bdf8 : 0x93c5fd,
        transparent: true,
        opacity: 0.65,
        side: THREE.DoubleSide
      });
      const ringMesh = new THREE.Mesh(ringGeom, ringMat);
      markerObj.add(ringMesh);

      // 3. Selection highlight outer ring
      const selectGeom = new THREE.RingGeometry(loc.isBase ? 0.052 : 0.040, loc.isBase ? 0.060 : 0.046, isIOS ? 20 : 32);
      const selectMat = new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        transparent: true,
        opacity: 0,
        side: THREE.DoubleSide
      });
      const selectMesh = new THREE.Mesh(selectGeom, selectMat);
      markerObj.add(selectMesh);

      // 4. Hit sphere for click/touch interaction
      const hitGeom = new THREE.SphereGeometry(0.08, 8, 8);
      const hitMat = new THREE.MeshBasicMaterial({ visible: false });
      const hitMesh = new THREE.Mesh(hitGeom, hitMat);
      hitMesh.userData = { location: loc, markerGroup: markerObj };
      markerObj.add(hitMesh);
      this.hitBoxObjects.push(hitMesh);

      this.markersGroup.add(markerObj);

      this.markerObjects.push({
        data: loc,
        group: markerObj,
        core: coreMesh,
        ring: ringMesh,
        selectRing: selectMesh,
        hitBox: hitMesh,
        baseScale: loc.isBase ? 1.15 : 1.0,
        phase: idx * 0.45
      });

      // 5. Curved 3D orbital connection arcs
      if (loc.connectedTo && loc.connectedTo.length > 0) {
        loc.connectedTo.forEach((targetId) => {
          const targetLoc = CREATIVE_LOCATIONS.find(l => l.id === targetId);
          if (targetLoc && (loc.isBase || CREATIVE_LOCATIONS.indexOf(targetLoc) > idx)) {
            const destPos = this.latLonToVector3(targetLoc.lat, targetLoc.lon, this.earthRadius * 1.018);
            const dist = pos.distanceTo(destPos);
            const midPoint = pos.clone().lerp(destPos, 0.5);
            const elevation = this.earthRadius + dist * 0.28;
            midPoint.normalize().multiplyScalar(elevation);

            const curve = new THREE.QuadraticBezierCurve3(pos, midPoint, destPos);
            const points = curve.getPoints(this.profile.arcPoints);
            const arcGeom = new THREE.BufferGeometry().setFromPoints(points);

            const arcMat = new THREE.LineBasicMaterial({
              color: loc.isBase ? 0x38bdf8 : 0x60a5fa,
              transparent: true,
              opacity: loc.isBase ? 0.32 : 0.18,
              linewidth: 1
            });
            const arcLine = new THREE.Line(arcGeom, arcMat);
            arcLine.userData = {
              from: loc.id,
              to: targetLoc.id,
              curve,
              disciplines: [...new Set([...loc.disciplines, ...targetLoc.disciplines])]
            };

            this.markersGroup.add(arcLine);
            this.arcObjects.push({
              line: arcLine,
              mat: arcMat,
              from: loc.id,
              to: targetLoc.id,
              curve,
              disciplines: arcLine.userData.disciplines
            });
          }
        });
      }
    });

    // 6. Traveling pulse signal mesh
    const signalGeom = new THREE.SphereGeometry(0.024, 10, 10);
    const signalMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0
    });
    this.worldSignalPulseMesh = new THREE.Mesh(signalGeom, signalMat);
    this.markersGroup.add(this.worldSignalPulseMesh);

    if (earthMesh) {
      earthMesh.add(this.markersGroup);
    } else if (this.model) {
      this.model.add(this.markersGroup);
    }
  }

  getPointerCoords(e) {
    const rect = this.container.getBoundingClientRect();
    const clientX = e.touches && e.touches[0] ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches && e.touches[0] ? e.touches[0].clientY : e.clientY;
    const rw = rect.width || 1;
    const rh = rect.height || 1;
    this._pointerCoords.x = ((clientX - rect.left) / rw) * 2 - 1;
    this._pointerCoords.y = -(((clientY - rect.top) / rh) * 2 - 1);
    this._pointerCoords.screenX = clientX - rect.left;
    this._pointerCoords.screenY = clientY - rect.top;
    return this._pointerCoords;
  }

  setupRaycasting() {
    const handlePointerMove = (e) => {
      if (this.hitBoxObjects.length === 0) return;
      const coords = this.getPointerCoords(e);
      this.rayMouse.x = coords.x;
      this.rayMouse.y = coords.y;

      this.raycaster.setFromCamera(this.rayMouse, this.camera);
      const intersects = this.raycaster.intersectObjects(this.hitBoxObjects);

      if (intersects.length > 0) {
        const hit = intersects[0].object;
        const loc = hit.userData.location;
        if (this.hoveredMarker !== loc) {
          this.hoveredMarker = loc;
          this.container.style.cursor = 'pointer';
          this.updateHoverState(loc, coords);
        }
      } else {
        if (this.hoveredMarker) {
          this.hoveredMarker = null;
          this.container.style.cursor = 'grab';
          this.clearHoverState();
        }
      }
    };

    const handleClick = (e) => {
      if (this.hitBoxObjects.length === 0) return;
      const coords = this.getPointerCoords(e);
      this.rayMouse.x = coords.x;
      this.rayMouse.y = coords.y;

      this.raycaster.setFromCamera(this.rayMouse, this.camera);
      const intersects = this.raycaster.intersectObjects(this.hitBoxObjects);

      if (intersects.length > 0) {
        const hit = intersects[0].object;
        const loc = hit.userData.location;
        if (loc) {
          this.selectLocation(loc);
        }
      } else {
        if (this.selectedLocation) {
          this.resetView();
        }
      }
    };

    let touchStartX = 0;
    let touchStartY = 0;

    const onTouchStart = (e) => {
      if (e.touches && e.touches[0]) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
      }
    };

    const onTouchEnd = (e) => {
      if (e.changedTouches && e.changedTouches[0]) {
        const dist = Math.hypot(e.changedTouches[0].clientX - touchStartX, e.changedTouches[0].clientY - touchStartY);
        if (dist < 12) {
          handleClick(e.changedTouches[0]);
        }
      }
    };

    this.container.addEventListener('mousemove', handlePointerMove, { passive: true });
    this.container.addEventListener('click', handleClick);
    this.container.addEventListener('touchstart', onTouchStart, { passive: true });
    this.container.addEventListener('touchend', onTouchEnd);

    this._cleanups.push(() => {
      this.container.removeEventListener('mousemove', handlePointerMove);
      this.container.removeEventListener('click', handleClick);
      this.container.removeEventListener('touchstart', onTouchStart);
      this.container.removeEventListener('touchend', onTouchEnd);
    });
  }

  updateHoverState(loc, coords) {
    this.markerObjects.forEach(m => {
      if (m.data.id === loc.id) {
        m.ring.material.opacity = 1.0;
        m.core.material.color.setHex(0x38bdf8);
      } else if (this.selectedLocation && m.data.id === this.selectedLocation.id) {
        m.ring.material.opacity = 0.9;
      } else {
        m.ring.material.opacity = 0.25;
      }
    });

    if (this.tooltipEl) {
      this.tooltipEl.textContent = `${loc.num} ${loc.country} · ${loc.city}`;
      this.tooltipEl.style.display = 'block';
      this.tooltipEl.style.left = `${coords.screenX}px`;
      this.tooltipEl.style.top = `${coords.screenY - 14}px`;
    }
  }

  clearHoverState() {
    this.markerObjects.forEach(m => {
      const isSelected = this.selectedLocation && m.data.id === this.selectedLocation.id;
      const isMatch = (this.activeDiscipline === 'ALL') || m.data.disciplines.includes(this.activeDiscipline);
      m.ring.material.opacity = isSelected ? 1.0 : (isMatch ? 0.65 : 0.15);
      m.core.material.color.setHex(m.data.isBase ? 0x60a5fa : 0xf8fafc);
    });

    if (this.tooltipEl) {
      this.tooltipEl.style.display = 'none';
    }
  }

  selectLocation(loc) {
    if (!loc) return;

    const fromLoc = this.selectedLocation || this.previousSelectedLocation || CREATIVE_LOCATIONS[0];
    this.previousSelectedLocation = fromLoc;
    this.selectedLocation = loc;

    const distKm = calculateGreatCircleDistance(fromLoc.lat, fromLoc.lon, loc.lat, loc.lon);
    this.showDistanceIndicator(fromLoc, loc, distKm);

    this.flyToLocation(loc);
    this.showLocationPanel(loc);
    this.updateCountryDirectoryActive(loc.id);
    this.updateWorldLiveClock(loc.id);
    this.highlightActiveLocationVisuals(loc.id);

    this.fadeInteractionHint();
  }

  selectCountryById(countryId) {
    const loc = CREATIVE_LOCATIONS.find(l => l.id.toLowerCase() === countryId.toLowerCase() || l.country.toLowerCase() === countryId.toLowerCase());
    if (loc) {
      this.selectLocation(loc);
    }
  }

  flyToLocation(loc) {
    if (!loc) return;
    const marker = this.markerObjects.find(m => m.data.id === loc.id);
    if (!marker) return;

    const markerWorldPos = new THREE.Vector3();
    marker.group.getWorldPosition(markerWorldPos);

    this.isAutoRotating = false;
    if (this.controls) this.controls.autoRotate = false;
    const btnAuto = this.container.querySelector('#three-btn-autorotate');
    if (btnAuto) btnAuto.classList.remove('active');

    const dir = markerWorldPos.clone().sub(this.controls.target).normalize();
    const targetDistance = 2.75;

    this.flyStartPos.copy(this.camera.position);
    this.flyTargetPos.copy(this.controls.target).add(dir.multiplyScalar(targetDistance));

    this.flyStartDistance = this.camera.position.length();
    this.flyTargetDistance = targetDistance;

    this.flyStartQuat.setFromUnitVectors(this._unitZ, this.flyStartPos.clone().normalize());
    this.flyTargetQuat.setFromUnitVectors(this._unitZ, this.flyTargetPos.clone().normalize());

    this.isFlying = true;
    this.flyStartTime = performance.now();
  }

  zoomToDistance(targetDist) {
    const dir = this.camera.position.clone().sub(this.controls.target).normalize();
    this.flyStartPos.copy(this.camera.position);
    this.flyTargetPos.copy(this.controls.target).add(dir.multiplyScalar(targetDist));
    this.isFlying = true;
    this.flyStartTime = performance.now();
  }

  showDistanceIndicator(fromLoc, toLoc, distKm) {
    const badge = document.getElementById('world-distance-badge');
    const routeEl = document.getElementById('world-dist-route');
    const valEl = document.getElementById('world-dist-value');

    if (!badge || !routeEl || !valEl) return;

    if (fromLoc.id === toLoc.id) {
      badge.classList.remove('is-active');
      return;
    }

    routeEl.innerHTML = `${fromLoc.country} &rarr; ${toLoc.country}`;
    valEl.textContent = `${distKm.toLocaleString()} KM`;

    badge.classList.add('is-active');

    if (this.distBadgeTimer) clearTimeout(this.distBadgeTimer);
    this.distBadgeTimer = setTimeout(() => {
      if (badge) badge.classList.remove('is-active');
    }, 4500);
  }

  showLocationPanel(loc) {
    const panel = document.getElementById('world-location-panel');
    const kickerEl = document.getElementById('world-panel-kicker');
    const cityEl = document.getElementById('world-panel-city');
    const countryEl = document.getElementById('world-panel-country');
    const roleEl = document.getElementById('world-panel-role');
    const coordsEl = document.getElementById('world-panel-coords');
    const timeEl = document.getElementById('world-panel-time');
    const solarEl = document.getElementById('world-panel-solar');
    const tagsEl = document.getElementById('world-panel-tags');
    const connCountEl = document.getElementById('world-panel-conn-count');
    const connListEl = document.getElementById('world-panel-connections');
    const projectsListEl = document.getElementById('world-panel-projects');
    const projectsWrapEl = document.getElementById('world-panel-projects-wrap');

    if (!panel || !loc) return;

    if (kickerEl) kickerEl.textContent = loc.isBase ? 'STUDIO BASE / CHRONOLOGY' : 'GLOBAL CREATIVE NODE';
    if (cityEl) cityEl.textContent = loc.city;
    if (countryEl) countryEl.textContent = loc.country;
    if (roleEl) roleEl.textContent = loc.role;

    if (coordsEl) {
      const latDir = loc.lat >= 0 ? 'N' : 'S';
      const lonDir = loc.lon >= 0 ? 'E' : 'W';
      coordsEl.textContent = `${Math.abs(loc.lat).toFixed(2)}° ${latDir} · ${Math.abs(loc.lon).toFixed(2)}° ${lonDir}`;
    }

    const now = new Date();
    if (timeEl) {
      timeEl.textContent = `${getLocalTimeString(loc.timezone, now)} ${loc.tzAbbr}`;
    }
    if (solarEl) {
      const solar = getSolarStatus(loc.lat, loc.lon, now);
      solarEl.textContent = `${solar.icon} ${solar.label}`;
      solarEl.className = `world-stat-badge is-${solar.status.toLowerCase()}`;
    }

    if (tagsEl && loc.disciplines) {
      tagsEl.innerHTML = loc.disciplines.map(d => `
        <span class="world-panel-discipline-pill ${this.activeDiscipline === d ? 'is-active' : ''}">${d}</span>
      `).join('');
    }

    if (connListEl && loc.connectedTo) {
      if (connCountEl) connCountEl.textContent = String(loc.connectedTo.length).padStart(2, '0');
      connListEl.innerHTML = loc.connectedTo.map(cid => {
        const c = CREATIVE_LOCATIONS.find(l => l.id === cid);
        return c ? `
          <button type="button" class="world-panel-conn-chip" data-location-id="${c.id}">
            <span class="conn-chip-dot"></span>
            <span>${c.country}</span>
          </button>
        ` : '';
      }).join('');

      connListEl.querySelectorAll('.world-panel-conn-chip').forEach(btn => {
        btn.addEventListener('click', () => {
          const targetId = btn.getAttribute('data-location-id');
          this.selectCountryById(targetId);
        });
      });
    }

    if (projectsListEl && projectsWrapEl) {
      if (loc.projects && loc.projects.length > 0) {
        projectsWrapEl.style.display = 'block';
        projectsListEl.innerHTML = loc.projects.map(p => `
          <button type="button" class="world-panel-project-btn" data-project-id="${p.id}" title="Open ${p.title} Case Study">
            <span class="world-proj-name">${p.title}</span>
            <span class="world-proj-cat">${p.category}</span>
            <span class="world-proj-arrow">&rarr;</span>
          </button>
        `).join('');

        projectsListEl.querySelectorAll('.world-panel-project-btn').forEach(btn => {
          btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const pid = btn.getAttribute('data-project-id');
            if (window.app && typeof window.app.openProjectModal === 'function') {
              window.app.openProjectModal(pid);
            }
          });
        });
      } else {
        projectsWrapEl.style.display = 'none';
      }
    }

    panel.removeAttribute('hidden');
    void panel.offsetWidth;
    panel.classList.add('is-visible');
  }

  highlightActiveLocationVisuals(locId) {
    this.markerObjects.forEach(m => {
      const isSelected = m.data.id === locId;
      if (isSelected) {
        m.selectRing.material.opacity = 0.95;
        m.ring.material.opacity = 1.0;
        m.core.material.color.setHex(0x38bdf8);
      } else {
        m.selectRing.material.opacity = 0;
        const isMatch = (this.activeDiscipline === 'ALL') || m.data.disciplines.includes(this.activeDiscipline);
        m.ring.material.opacity = isMatch ? 0.45 : 0.12;
      }
    });

    this.arcObjects.forEach(arc => {
      const isConnected = arc.from === locId || arc.to === locId;
      if (isConnected) {
        arc.line.visible = true;
        arc.mat.opacity = 0.75;
        arc.mat.color.setHex(0x38bdf8);
      } else {
        const isMatch = (this.activeDiscipline === 'ALL') || arc.disciplines.includes(this.activeDiscipline);
        arc.mat.opacity = isMatch ? 0.22 : 0.05;
        arc.mat.color.setHex(0x60a5fa);
      }
    });
  }

  filterByDiscipline(discipline) {
    this.activeDiscipline = discipline || 'ALL';

    this.markerObjects.forEach(m => {
      const isMatch = (this.activeDiscipline === 'ALL') || m.data.disciplines.includes(this.activeDiscipline);
      const isSelected = this.selectedLocation && m.data.id === this.selectedLocation.id;

      if (isMatch || isSelected) {
        m.group.visible = true;
        m.core.material.opacity = 1.0;
        m.ring.material.opacity = isSelected ? 1.0 : 0.65;
        m.hitBox.visible = true;
      } else {
        m.core.material.opacity = 0.2;
        m.ring.material.opacity = 0.12;
      }
    });

    this.arcObjects.forEach(arc => {
      const isMatch = (this.activeDiscipline === 'ALL') || arc.disciplines.includes(this.activeDiscipline);
      const isSelected = this.selectedLocation && (arc.from === this.selectedLocation.id || arc.to === this.selectedLocation.id);

      if (isSelected) {
        arc.line.visible = true;
        arc.mat.opacity = 0.75;
      } else if (isMatch) {
        arc.line.visible = true;
        arc.mat.opacity = 0.35;
      } else {
        arc.mat.opacity = 0.05;
      }
    });

    const dirEl = document.getElementById('world-country-directory');
    if (dirEl) {
      dirEl.querySelectorAll('.world-country-chip').forEach(btn => {
        const cid = btn.getAttribute('data-location-id');
        const loc = CREATIVE_LOCATIONS.find(l => l.id === cid);
        if (loc) {
          const isMatch = (this.activeDiscipline === 'ALL') || loc.disciplines.includes(this.activeDiscipline);
          btn.classList.toggle('is-dimmed', !isMatch);
        }
      });
    }
  }

  buildCountryDirectory() {
    const dirContainer = document.getElementById('world-country-directory');
    if (!dirContainer) return;

    dirContainer.innerHTML = CREATIVE_LOCATIONS.map((loc) => `
      <button type="button" class="world-country-chip ${loc.isBase ? 'is-base' : ''}" data-location-id="${loc.id}" title="${loc.country} · ${loc.city}">
        <span class="world-chip-num">${loc.num}</span>
        <span class="world-chip-name">${loc.country}</span>
        ${loc.isBase ? '<span class="world-chip-base-badge">BASE</span>' : ''}
      </button>
    `).join('');

    dirContainer.querySelectorAll('.world-country-chip').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-location-id');
        this.selectCountryById(id);
      });
    });
  }

  updateCountryDirectoryActive(activeId) {
    const dirContainer = document.getElementById('world-country-directory');
    if (!dirContainer) return;

    dirContainer.querySelectorAll('.world-country-chip').forEach(btn => {
      const isSelected = btn.getAttribute('data-location-id') === activeId;
      btn.classList.toggle('is-selected', isSelected);
      if (isSelected && btn.scrollIntoView) {
        btn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    });
  }

  buildLiveWorldClock() {
    const clockStrip = document.getElementById('world-live-clock-strip');
    if (!clockStrip) return;

    const now = new Date();

    const renderGroup = (isDuplicate = false) => {
      return MARQUEE_LOCATIONS.map((loc) => {
        const timeStr = getLocalTimeString(loc.timezone, now);
        const solar = getSolarStatus(loc.lat, loc.lon, now);
        const isSelected = this.selectedLocation && this.selectedLocation.id === loc.id;
        return `
          <button type="button" class="world-clock-chip ${isSelected ? 'is-selected' : ''}" data-loc-city="${loc.city}" data-location-id="${loc.id}" title="Select ${loc.city}" tabindex="${isDuplicate ? '-1' : '0'}">
            <span class="world-clock-solar">${solar.icon}</span>
            <strong class="world-clock-city">${loc.city}</strong>
            <span class="world-clock-time">${timeStr}</span>
            <span class="world-clock-tz">${loc.tzAbbr}</span>
          </button>
        `;
      }).join('<span class="world-clock-sep" aria-hidden="true">&bull;</span>');
    };

    clockStrip.innerHTML = `
      <div class="world-clock-header">
        <span class="world-clock-pulse"></span>
        <span class="world-clock-title">WORLD / LIVE</span>
      </div>
      <div class="world-clock-marquee-wrap" aria-label="Global Studio Clocks Continuous Marquee">
        <div class="world-clock-marquee-track">
          <div class="world-clock-marquee-group" id="world-clock-group-primary">
            ${renderGroup(false)}
          </div>
          <div class="world-clock-marquee-group" id="world-clock-group-secondary" aria-hidden="true">
            ${renderGroup(true)}
          </div>
        </div>
      </div>
    `;

    clockStrip.querySelectorAll('.world-clock-chip').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-location-id');
        if (id) this.selectCountryById(id);
      });
    });
  }

  updateLiveClocks() {
    const clockStrip = document.getElementById('world-live-clock-strip');
    if (!clockStrip) return;

    if (!clockStrip.querySelector('.world-clock-marquee-track')) {
      this.buildLiveWorldClock();
      return;
    }

    const now = new Date();

    MARQUEE_LOCATIONS.forEach(loc => {
      const chips = clockStrip.querySelectorAll(`.world-clock-chip[data-loc-city="${loc.city}"]`);
      if (chips.length > 0) {
        const timeStr = getLocalTimeString(loc.timezone, now);
        const solar = getSolarStatus(loc.lat, loc.lon, now);
        chips.forEach(chip => {
          const solarEl = chip.querySelector('.world-clock-solar');
          const timeEl = chip.querySelector('.world-clock-time');
          if (solarEl && solarEl.textContent !== solar.icon) {
            solarEl.textContent = solar.icon;
          }
          if (timeEl && timeEl.textContent !== timeStr) {
            timeEl.textContent = timeStr;
          }
          const isSelected = this.selectedLocation && this.selectedLocation.id === loc.id;
          chip.classList.toggle('is-selected', !!isSelected);
        });
      }
    });

    if (this.selectedLocation) {
      const panelTime = document.getElementById('world-panel-time');
      const panelSolar = document.getElementById('world-panel-solar');
      if (panelTime) {
        panelTime.textContent = `${getLocalTimeString(this.selectedLocation.timezone, now)} ${this.selectedLocation.tzAbbr}`;
      }
      if (panelSolar) {
        const solar = getSolarStatus(this.selectedLocation.lat, this.selectedLocation.lon, now);
        panelSolar.textContent = `${solar.icon} ${solar.label}`;
      }
    }

    this.updateSunPosition();
  }

  updateWorldLiveClock(activeId) {
    this.updateLiveClocks();
  }

  startWorldSignalLoop() {
    if (this.worldSignalTimer) clearInterval(this.worldSignalTimer);
    this.worldSignalTimer = setInterval(() => {
      if (this.isPaused || this.isOffscreen || this.isInteracting || this.isFlying || !this.isRendering) return;
      this.triggerNextWorldSignal();
    }, 4500);
  }

  triggerNextWorldSignal() {
    if (this.arcObjects.length === 0) return;

    const fromId = this.activeSignalHops[this.currentHopIndex];
    this.currentHopIndex = (this.currentHopIndex + 1) % (this.activeSignalHops.length - 1);
    const toId = this.activeSignalHops[this.currentHopIndex];

    const arc = this.arcObjects.find(a => (a.from === fromId && a.to === toId) || (a.from === toId && a.to === fromId));
    if (arc && arc.curve) {
      this.worldSignalArc = arc;
      this.worldSignalProgress = 0;
      if (this.worldSignalPulseMesh) {
        this.worldSignalPulseMesh.material.opacity = 0.9;
      }
    }
  }

  setRenderMode(mode) {
    if (this.renderMode === mode) return;
    this.renderMode = mode;
    this.applyRenderMode();
  }

  applyRenderMode() {
    if (!this.model) return;
    const isWireframe = this.renderMode === 'wireframe';

    // Lazy wireframe mesh creation
    if (isWireframe && this.wireframeObjects.length === 0) {
      this.model.traverse((child) => {
        if (child.isMesh && (child === this.earthMesh || (child.name || '').toLowerCase().includes('earth'))) {
          const wireGeom = new THREE.WireframeGeometry(child.geometry);
          const wireMat = new THREE.LineBasicMaterial({
            color: 0x60a5fa,
            transparent: true,
            opacity: 0.4,
            linewidth: 1
          });
          const wireLines = new THREE.LineSegments(wireGeom, wireMat);
          child.add(wireLines);

          child.userData.wireframeLines = wireLines;
          child.userData.wireframeCoreMat = new THREE.MeshBasicMaterial({
            color: 0x06080c,
            polygonOffset: true,
            polygonOffsetFactor: 1,
            polygonOffsetUnits: 1
          });

          this.wireframeObjects.push({ wireGeom, wireMat, coreMat: child.userData.wireframeCoreMat });
        }
      });
    }

    this.model.traverse((child) => {
      if (child.isMesh) {
        const name = (child.name || '').toLowerCase();
        const matName = (child.material?.name || '').toLowerCase();

        if (name.includes('atmosphere') || matName.includes('atmosphere') ||
            name.includes('cloud') || matName.includes('cloud') ||
            name.includes('aurora') || matName.includes('aurora')) {
          child.visible = !isWireframe;
        } else {
          if (child.userData.wireframeLines) {
            child.userData.wireframeLines.visible = isWireframe;
          }
          if (isWireframe && child.userData.wireframeCoreMat) {
            child.material = child.userData.wireframeCoreMat;
          } else if (!isWireframe && child.userData.originalMaterial) {
            child.material = child.userData.originalMaterial;
          }
        }
      }
    });

    if (this.container) {
      this.container.querySelectorAll('.three-mode-tab').forEach((tab) => {
        tab.classList.toggle('active', tab.getAttribute('data-mode') === this.renderMode);
      });
    }
  }

  buildControlsUI() {
    const topBar = document.createElement('div');
    topBar.className = 'three-hud-topbar';
    topBar.innerHTML = `
      <div class="three-mode-segmented" role="group" aria-label="3D Render Mode">
        <button type="button" class="three-mode-tab ${this.renderMode === 'solid' ? 'active' : ''}" data-mode="solid" title="Photorealistic Solid Surface">
          <span class="three-mode-indicator"></span>
          <span>SOLID</span>
        </button>
        <span class="three-mode-divider">|</span>
        <button type="button" class="three-mode-tab ${this.renderMode === 'wireframe' ? 'active' : ''}" data-mode="wireframe" title="Genuine Three.js Geometry Wireframe">
          <span class="three-mode-indicator"></span>
          <span>WIREFRAME</span>
        </button>
      </div>
    `;
    this.container.appendChild(topBar);

    topBar.querySelectorAll('.three-mode-tab').forEach((tab) => {
      tab.addEventListener('click', () => {
        const mode = tab.getAttribute('data-mode');
        this.setRenderMode(mode);
      });
    });

    const controlsContainer = document.createElement('div');
    controlsContainer.className = 'three-hud-controls';
    controlsContainer.setAttribute('aria-label', '3D Scene Controls');

    controlsContainer.innerHTML = `
      <div class="three-hud-group">
        <button type="button" class="three-hud-btn ${this.isAutoRotating ? 'active' : ''}" id="three-btn-autorotate" title="Toggle Auto Rotation (Space)">
          <span class="three-hud-dot"></span>
          <span class="three-hud-label">AUTO ROTATE</span>
        </button>
        <button type="button" class="three-hud-btn" id="three-btn-reset" title="Reset Camera View (ESC / R)">
          <span class="three-hud-label">RESET VIEW</span>
        </button>
        <button type="button" class="three-hud-btn" id="three-btn-fullscreen" title="Toggle Fullscreen (F)">
          <span class="three-hud-label">EXPAND</span>
        </button>
      </div>
      <div class="three-hud-hint">
        <span>DRAG TO ROTATE &bull; SCROLL TO ZOOM &bull; CLICK 20 LOCATIONS</span>
      </div>
    `;

    this.container.appendChild(controlsContainer);

    const btnAuto = controlsContainer.querySelector('#three-btn-autorotate');
    const btnReset = controlsContainer.querySelector('#three-btn-reset');
    const btnFs = controlsContainer.querySelector('#three-btn-fullscreen');

    if (btnAuto) {
      btnAuto.addEventListener('click', () => this.toggleAutoRotate());
    }

    if (btnReset) {
      btnReset.addEventListener('click', () => {
        this.resetView();
        this.fadeInteractionHint();
      });
    }

    if (btnFs) {
      btnFs.addEventListener('click', () => this.toggleFullscreen());
    }

    const onFullscreenChange = () => {
      if (!document.fullscreenElement && btnFs) {
        btnFs.querySelector('.three-hud-label').textContent = 'EXPAND';
      }
      this.onResize();
    };
    document.addEventListener('fullscreenchange', onFullscreenChange);
    this._cleanups.push(() => document.removeEventListener('fullscreenchange', onFullscreenChange));
  }

  toggleAutoRotate() {
    this.isAutoRotating = !this.isAutoRotating;
    if (this.controls) this.controls.autoRotate = this.isAutoRotating;
    const btnAuto = this.container.querySelector('#three-btn-autorotate');
    if (btnAuto) btnAuto.classList.toggle('active', this.isAutoRotating);
    this.fadeInteractionHint();
  }

  toggleFullscreen() {
    const targetEl = document.getElementById('three-wrapper') || this.container;
    const btnFs = this.container.querySelector('#three-btn-fullscreen');
    if (!document.fullscreenElement) {
      if (targetEl.requestFullscreen) {
        targetEl.requestFullscreen();
        if (btnFs) btnFs.querySelector('.three-hud-label').textContent = 'EXIT';
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        if (btnFs) btnFs.querySelector('.three-hud-label').textContent = 'EXPAND';
      }
    }
  }

  resetView() {
    this.isFlying = false;
    this.selectedLocation = null;

    if (this.camera && this.controls) {
      this.camera.position.copy(this.defaultCamPos);
      this.controls.target.copy(this.defaultTarget);
      this.controls.update();
    }

    const panel = document.getElementById('world-location-panel');
    if (panel) {
      panel.classList.remove('is-visible');
      panel.setAttribute('hidden', '');
    }

    const badge = document.getElementById('world-distance-badge');
    if (badge) badge.classList.remove('is-active');

    this.clearHoverState();
    this.updateCountryDirectoryActive(null);

    if (!this.prefersReducedMotion && this.controls) {
      this.isAutoRotating = true;
      this.controls.autoRotate = true;
      const btnAuto = this.container.querySelector('#three-btn-autorotate');
      if (btnAuto) btnAuto.classList.add('active');
    }
  }

  onResize() {
    if (!this.container || !this.renderer || !this.camera) return;
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;
    if (width <= 0 || height <= 0) return;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height, false);
    const dpr = Math.min(window.devicePixelRatio || 1, this.profile.maxDpr);
    this.renderer.setPixelRatio(dpr);
  }

  easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  startAnimation() {
    if (this.isRendering || this.isPaused || this.isOffscreen || worldzUnavailable) return;
    this.isRendering = true;
    console.log('[WORLDZ] animation started');
    this.lastFrameTime = performance.now();
    this.animationFrameId = requestAnimationFrame((t) => this.animate(t));
  }

  stopAnimation() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
    if (this.isRendering) {
      this.isRendering = false;
      console.log('[WORLDZ] animation stopped');
    }
  }

  animate(now = performance.now()) {
    if (!this.isRendering || this.isPaused || this.isOffscreen || worldzUnavailable) {
      this.isRendering = false;
      this.animationFrameId = null;
      return;
    }

    this.animationFrameId = requestAnimationFrame((t) => this.animate(t));

    // Mobile / iOS frame rate throttling
    const elapsed = now - this.lastFrameTime;
    if (elapsed < this.profile.frameInterval) {
      return; // Skip rendering frame until frame interval elapses
    }
    this.lastFrameTime = now - (elapsed % this.profile.frameInterval);

    // Guard against hidden or zero-size container
    if (!this.container || this.container.clientWidth <= 0 || this.container.clientHeight <= 0) {
      return;
    }

    this.time += 0.02;

    // Camera Fly-To Animation with collision-free spherical interpolation
    if (this.isFlying) {
      const flyElapsed = performance.now() - this.flyStartTime;
      const progress = Math.min(flyElapsed / this.flyDuration, 1.0);
      const eased = this.easeInOutCubic(progress);

      this._scratchQuat_1.slerpQuaternions(this.flyStartQuat, this.flyTargetQuat, eased);
      this._scratchVec3_1.copy(this._unitZ).applyQuaternion(this._scratchQuat_1);

      const dist = THREE.MathUtils.lerp(this.flyStartDistance, this.flyTargetDistance, eased) +
                   0.38 * Math.sin(progress * Math.PI);

      this.camera.position.copy(this.controls.target).add(this._scratchVec3_1.multiplyScalar(dist));
      this.controls.update();

      if (progress >= 1.0) {
        this.isFlying = false;
      }
    } else if (this.controls) {
      this.controls.update();
    }

    // Subtle star rotation
    if (this.particles) {
      this.particles.rotation.y += 0.00025;
    }

    // Gentle pulse animation on location markers
    if (this.markerObjects.length > 0) {
      for (let i = 0; i < this.markerObjects.length; i++) {
        const m = this.markerObjects[i];
        const pulse = Math.sin(this.time * 2.8 + m.phase);
        const scale = m.baseScale * (1.0 + 0.18 * pulse);
        m.ring.scale.setScalar(scale);

        const isSelected = this.selectedLocation && m.data.id === this.selectedLocation.id;
        const isMatch = (this.activeDiscipline === 'ALL') || m.data.disciplines.includes(this.activeDiscipline);

        if (isSelected) {
          m.ring.material.opacity = 0.95;
          m.selectRing.scale.setScalar(1.0 + 0.1 * pulse);
        } else if (isMatch) {
          m.ring.material.opacity = 0.45 + 0.35 * pulse;
        }
      }
    }

    // World Signal Pulse along connection arc
    if (this.worldSignalArc && this.worldSignalPulseMesh) {
      this.worldSignalProgress += 0.018;
      if (this.worldSignalProgress <= 1.0) {
        this.worldSignalArc.curve.getPoint(this.worldSignalProgress, this._scratchVec3_2);
        this.worldSignalPulseMesh.position.copy(this._scratchVec3_2);
        this.worldSignalPulseMesh.material.opacity = Math.sin(this.worldSignalProgress * Math.PI) * 0.95;
      } else {
        this.worldSignalArc = null;
        this.worldSignalPulseMesh.material.opacity = 0;
      }
    }

    // Render WebGL frame
    if (this.renderer && this.scene && this.camera) {
      this.renderer.render(this.scene, this.camera);
    }
  }

  gracefullyDisableWorldz(error) {
    console.warn('[WORLDZ] Gracefully disabling 3D Earth module:', error);
    if (this.loadingEl && this.loadingEl.parentNode) {
      this.loadingEl.parentNode.removeChild(this.loadingEl);
    }

    const fallback = document.createElement('div');
    fallback.className = 'three-fallback-view';
    fallback.style.cssText = 'position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; background: radial-gradient(circle at center, #0f172a 0%, #05070c 100%); color: #94a3b8; text-align: center; padding: 2rem; z-index: 2;';
    fallback.innerHTML = `
      <div style="width: 140px; height: 140px; border-radius: 50%; overflow: hidden; margin-bottom: 1.5rem; border: 1px solid rgba(56, 189, 248, 0.3); box-shadow: 0 0 30px rgba(56, 189, 248, 0.15);">
        <img src="assets/3d/EARTH3D.webp" alt="Global Creative Network" style="width: 100%; height: 100%; object-fit: cover; opacity: 0.9;" />
      </div>
      <span style="font-family: 'Space Grotesk', monospace; font-size: 11px; letter-spacing: 0.18em; color: #38bdf8; margin-bottom: 0.5rem;">GLOBAL CREATIVE NETWORK</span>
      <p style="font-size: 13px; max-width: 320px; line-height: 1.5; color: #cbd5e1; margin: 0;">20 Studio hubs connected worldwide. Select any node from the directory to inspect location intelligence.</p>
    `;
    this.container.appendChild(fallback);

    if (this.isMainViewer) {
      this.buildCountryDirectory();
      this.buildLiveWorldClock();
    }
  }

  destroy() {
    this.stopAnimation();

    if (this.clockInterval) {
      clearInterval(this.clockInterval);
      this.clockInterval = null;
    }
    if (this.worldSignalTimer) {
      clearInterval(this.worldSignalTimer);
      this.worldSignalTimer = null;
    }
    if (this.idleTimer) {
      clearTimeout(this.idleTimer);
      this.idleTimer = null;
    }
    if (this.distBadgeTimer) {
      clearTimeout(this.distBadgeTimer);
      this.distBadgeTimer = null;
    }
    if (this.resizeRafId) {
      cancelAnimationFrame(this.resizeRafId);
      this.resizeRafId = null;
    }
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
      this.resizeObserver = null;
    }
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
      this.intersectionObserver = null;
    }
    if (this.onVisibilityChange) {
      document.removeEventListener('visibilitychange', this.onVisibilityChange);
    }

    this._cleanups.forEach((cleanup) => {
      try { cleanup(); } catch (e) {}
    });
    this._cleanups = [];

    this.wireframeObjects.forEach((obj) => {
      if (obj.wireGeom) obj.wireGeom.dispose();
      if (obj.wireMat) obj.wireMat.dispose();
      if (obj.coreMat) obj.coreMat.dispose();
    });
    this.wireframeObjects = [];

    if (this.scene) {
      this.scene.traverse((child) => {
        if (child.isMesh || child.isPoints || child.isLine) {
          if (child.geometry) child.geometry.dispose();
          if (child.material) {
            if (Array.isArray(child.material)) {
              child.material.forEach((m) => {
                if (m.map) m.map.dispose();
                m.dispose();
              });
            } else {
              if (child.material.map) child.material.map.dispose();
              child.material.dispose();
            }
          }
        }
      });
    }

    if (this.controls) {
      this.controls.dispose();
      this.controls = null;
    }

    if (this.renderer) {
      const dom = this.renderer.domElement;
      if (dom) {
        if (this.onContextLost) dom.removeEventListener('webglcontextlost', this.onContextLost);
        if (this.onContextRestored) dom.removeEventListener('webglcontextrestored', this.onContextRestored);
        if (dom.parentNode) dom.parentNode.removeChild(dom);
      }
      this.renderer.dispose();
      this.renderer = null;
    }

    if (this.isMainViewer) {
      worldzInitialized = false;
      worldzInitializing = false;
      worldzMainInstance = null;
    }
  }
}

export function disposeWorldz() {
  if (worldzMainInstance) {
    worldzMainInstance.destroy();
    worldzMainInstance = null;
  }
}
