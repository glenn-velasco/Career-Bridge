# Segue Career Path
 **Segue Career Path** is a dynamic career platform developed for the *InterCICSkwela Hackathon Challenge* to address the critical socio-economic hurdles of unemployment and underemployment in the Philippines. By leveraging AI-driven role matching and interactive preparation tools, **Segue Career Path empowers** the emerging workforce to navigate the labor market with confidence.

---

## Hackathon Challenge & SDG Alignment
### Our project directly addresses Challenge #4: Employment and Economic Opportunities:
 - **The Problem:** High rates of underemployment among young Filipinos and emerging workers.
 - **The Solution:** A digital ecosystem that expands access to employment and strengthens workforce participation.
 - **SDG Impact:** Segue Career Path aligns with SDG 8 especialy SDG 8.6: Promote Youth Employment, Education, and Training
The platform includes interactive mock interviews with "Alice", an AI interviewer that provides real-time practice and feedback. This directly supports the training and preparation of young professionals, reducing the proportion of youth not in employment, education, or training.

---

## Key Features
- **AI Role Match:** Users can upload a resume (PDF) or paste a portfolio link. The system analyzes their background to suggest the most relevant "Detected Expertise" and matching job roles.
- **Real-time Job Discovery:** Integrated with the Jobstreet API via RapidAPI to provide up-to-date job listings in the Philippines.
- **Interactive Mock Interviews with "Alice"**:

    - AI-Powered: Personalized interview sessions based on the specific job description.

    - Multi-input: Users can respond via text or voice.

    - Coext-to-Speech (TTS): Alice provides spoken responses, which users can enable or disable for a customized experience.

---

## Tech Stack
### Based on our project architecture, we utilize a modern, scalable stack:
 - **Framework:** [![Nextjs](https://img.shields.io/badge/NextJS-000.svg?&logo=next.js&style=flat-square)](#) [![TypeScript](https://shields.io/badge/TypeScript-3178C6?logo=TypeScript&logoColor=FFF&style=flat-square)](#)

 - **Styling:** [![Tailwind](https://img.shields.io/badge/Tailwind_CSS-grey?style=flat-square&logo=tailwind-css&logoColor=38BDF8)](#) with Lucide [![React](https://img.shields.io/badge/-ReactJs-61DAFB?logo=react&logoColor=white&style=flat-square)](#) icons and Shadcn/UI components.

 - **AI Engine:** Google Gemini 2.5 Flash (via Google AI Studio) for resume analysis and interview logic.

 - **Data Sourcing:** Jobstreet API via RapidAPI.
 
 - **Voice Integration:** Web Speech API for Speech-to-Text and Text-to-Speech capabilities.

---

## Getting Started

### 1. Prerequisites

Ensure you have [![Node.js](https://img.shields.io/badge/node.js-339933?style=flat-square&logo=Node.js&logoColor=white)](#) installed.


### 2. Environment Variables
To run this project, you will need to add the following environment variables to your `.env` file:

`GEMINI_API_KEY` - Your Google Gemini API Key

`RAPIDAPI_KEY` - Your RapidAPI Key for Jobstreet API

You can refer to `.env.example` for the format.

	You can refer to `.env.example` for the format.
### 3. Installation & Development
``` bash
npm install
npm run dev
```
Open http://localhost:3000 to view the application.

## Environment Variables

To run this project, you will need to add the following environment variables to your `.env` file:

    GEMINI_API_KEY - Your Google Gemini API Key

    RAPIDAPI_KEY - Your RapidAPI Key for Jobstreet API

You can refer to `.env.example` for the format.

## Usage


You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
