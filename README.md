# AkashVahini (akashvahini)

> **Where intelligence meets the sky.**  
> Official web platform for AkashVahini Private Limited — an innovation-driven deep-tech aerospace startup developing intelligent, autonomous heavy-lift drone platforms for mission-critical applications.

---

## 🛰️ Overview

**AkashVahini** designs and builds indigenous, perception-first aerial robotics engineered for missions where failure is not an option. From wildfire perimeters and disaster search-and-rescue to utility-scale powerline and solar inspection, AkashVahini integrates high-throughput neural AI accelerators directly at the edge to enable full autonomy without reliance on external cloud infrastructure.

- **Incubated At:** FTBI · National Institute of Technology (NIT) Rourkela
- **Recognition:** DPIIT Recognized Startup (Ministry of Commerce and Industry, Govt. of India)
- **Grant & Backing:** MeitY Genesis EIR 2.0 (Ministry of Electronics and Information Technology)
- **Base of Operations:** TIIR Building, NIT Rourkela Campus, Odisha 769008, India
- **Official Inquiries:** [assist.akashvahini@gmail.com](mailto:assist.akashvahini@gmail.com)

---

## 🚁 Flagship Platform: SEERIA

SEERIA is a proprietary heavy-lift hybrid drone architecture built around real-time spatial awareness and robust fail-safe redundancy:

- **Effective Payload Capacity:** Up to 40 kg (modular sensor/cargo bay)
- **Max Takeoff Weight (MTOW):** 105 kg
- **Flight Range:** 30 km BVLOS (Beyond Visual Line of Sight)
- **Endurance:** 30+ minutes of continuous flight via hybrid propulsion
- **Edge AI Compute:** 26 TOPS onboard neural processing (Hailo-8 accelerator)
- **Autopilot:** Industrial triple-redundant PX4 avionics with EKF3 state estimation
- **Vision & Sensing:** Sony IMX500 edge sensor + radiometric thermal infrared + LiDAR
- **Datalink:** Encrypted MAVLink v2 & ultra-low-latency ZeroMQ telemetry pipeline

---

## ✨ Web Platform Features

- **Cinematic Brand Entrance Sequence:**
  - Dynamic boot sequence featuring the vector emblem with a blinking amber telemetry square (`@keyframes akv-square-blink`).
  - Seamless glide-and-dock transition into the header navbar accompanied by an elastic slide-out wordmark (`akashvahini`).
  - Native reduced-motion and immediate scroll-bypass failsafes.
- **Interactive 3D WebGL Globe:**
  - Real-time Three.js Earth sphere mapped with high-resolution atmospheric, specular, and elevation normal textures.
  - Automatically calibrated to orient India (`~79° E, 21° N`) toward the observer during scroll.
  - Graceful fallback canvas for low-power or WebGL-disabled devices.
- **Tactical Vector India Map Panel:**
  - Interactive SVG map featuring state-level terrain stratification and animated radar range rings.
  - Telemetry leader line with live animated particle pulses tracing directly to AkashVahini HQ at NIT Rourkela (`22.255471° N / 84.903671° E`).
  - Sequenced typewriter HUD telemetry readout.
- **Real-Time Mission Telemetry Console:**
  - Live GCS (Ground Control Station) feeds displaying real flight passes (Canopy Survey, Grid Mapping, FPV Patrol) with synchronized video, live coordinate readouts, and event logs.
- **Lead Capture & Contact Engine:**
  - Integrated contact form with honeypot bot detection, client-side rate limiting, formula injection sanitization, and automated dispatch.
- **Responsive Architecture & Smart Controls:**
  - Contextual header call-to-action buttons that dynamically adapt between desktop and mobile viewport constraints.
  - Dynamic back-to-top floating navigation that auto-hides above fold threshold.

---

## 🎨 Brand Identity Guidelines

- **Wordmark Format:** Strictly lowercase `akashvahini` with zero spacing between `akash` and `vahini` (`<span>akash</span><span className="text-amber">vahini</span>`).
- **Primary Typography:** 
  - **Display / Headers:** `Magz` (geometric bold display font)
  - **Body / Subheadings:** `Space Grotesk` & `Inter`
  - **Telemetry / HUD:** `IBM Plex Mono`
- **Color Palette:**
  - **Deep Aerospace Navy (`--navy`):** `#0a0e14`
  - **Secondary Surface Navy (`--navy-2`):** `#0e131b`
  - **Telemetry Amber (`--amber`):** `#f2a93b`
  - **Emblem Gold:** `#FFDE59`
  - **Active Status Green:** `#22c55e`
  - **Radar Cyan:** `#38bdf8`

---

## 🛠️ Tech Stack

- **Framework:** [React 19](https://react.dev/)
- **Bundler:** [Vite 8](https://vite.dev/)
- **3D Graphics:** [Three.js](https://threejs.org/) & [@react-three/fiber](https://r3f.docs.pmnd.rs/)
- **Styling:** [Tailwind CSS 3](https://tailwindcss.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Linter:** [Oxlint](https://oxc.rs/docs/guide/usage/linter.html)

---

## 🚀 Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) (v18 or higher recommended) and `npm` installed.

### Installation

```bash
# Clone repository
git clone https://github.com/akvmark1/akv-web-new.git
cd akv-web-new

# Install dependencies
npm install
```

### Development

Run the local development server with Hot Module Replacement (HMR):

```bash
npm run dev
```

### Linting

Lint all source files using Oxlint:

```bash
npm run lint
```

### Production Build

Compile and bundle for production:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

---

## 📂 Project Structure

```text
akv-web/
├── public/
│   ├── fonts/
│   │   └── Magz.otf                     # Magz brand typeface
│   ├── images/
│   │   └── img_1.jpg                    # SEERIA platform photography
│   ├── maps/
│   │   └── india-states-simplified.json # Simplified India GeoJSON boundaries
│   ├── textures/                        # Three.js 2K Earth sphere textures
│   │   ├── earth_atmos_2048.jpg
│   │   ├── earth_normal_2048.jpg
│   │   └── earth_specular_2048.jpg
│   ├── videos/                          # Real flight mission video passes
│   │   ├── AKVD1.mp4
│   │   ├── AKVD2.mp4
│   │   └── AKVD3.mp4
│   ├── CNAME                            # Production custom domain configuration
│   └── favicon.svg                      # AkashVahini vector favicon
├── src/
│   ├── components/
│   │   ├── About.jsx                    # Institutional backing, team, & India map panel
│   │   ├── AkvLogo.jsx                  # Scalable vector emblem with blinking telemetry square
│   │   ├── Applications.jsx             # Mission verticals & commercial use-cases
│   │   ├── BrandIntroSplash.jsx         # Fullscreen boot preloader & header docking glide
│   │   ├── Contact.jsx                  # Sanitized mission inquiry form & direct channels
│   │   ├── Drone3DCanvas.jsx            # Three.js Earth canvas & animated tactical India panel
│   │   ├── Footer.jsx                   # Brand footer, site navigation, & accreditation
│   │   ├── Hero.jsx                     # Value proposition, 3D background, & adaptive CTAs
│   │   ├── Navigation.jsx               # Sticky blurred navbar, slide-out wordmark, & back-to-top
│   │   ├── Product.jsx                  # SEERIA hardware specifications & capabilities
│   │   └── Technology.jsx               # Autonomous GCS telemetry, video feeds, & tech stack
│   ├── lib/
│   │   └── utils.js                     # Utility helpers
│   ├── App.jsx                          # Root application container & intro stage synchronization
│   ├── index.css                        # Global styles, Magz font loading, & custom scrollbars
│   └── main.jsx                         # React entrypoint
├── index.html                           # HTML scaffold with Magz font preload
├── package.json
├── tailwind.config.js
└── vite.config.js
```

---

## 📄 License

&copy; 2026 AkashVahini Private Limited. All rights reserved.
