"use server"

import { GoogleGenAI } from '@google/genai';
import mammoth from 'mammoth';
import * as cheerio from 'cheerio';

export async function handleResume(formData: FormData) {
    try {
        const file = formData.get("resume") as File | null;
        const portfolioUrl = formData.get("portfolioUrl") as string | null;

        let extractedText = "";

        if (file && file.size > 0) {
            const buffer = Buffer.from(await file.arrayBuffer());
            if (file.name.endsWith('.pdf')) {
                const { PDFParse } = await import('pdf-parse');
                const parser = new PDFParse({ data: buffer });
                const pdfData = await parser.getText();
                extractedText = pdfData.text;
            } else if (file.name.endsWith('.docx')) {
                const result = await mammoth.extractRawText({ buffer });
                extractedText = result.value;
            } else {
                return { error: "Unsupported file type. Please upload a PDF or DOCX." };
            }
        }
        else if (portfolioUrl) {
            try {
                const urlToFetch = portfolioUrl.startsWith('http') ? portfolioUrl : `https://${portfolioUrl}`;
                const res = await fetch(urlToFetch, { headers: { 'User-Agent': 'Mozilla/5.0' } });
                if (!res.ok) return { error: "An unknown error occurred" };
                const html = await res.text();
                const $ = cheerio.load(html);
                extractedText = $('body').text().replace(/\s+/g, ' ');
            } catch (err) {
                return { error: "An unknown error occurred" };
            }
        } else {
            return { error: "Please provide a resume file or portfolio URL." };
        }

        if (!extractedText || extractedText.trim().length < 20) {
            return { error: "Not enough text content found to analyze your expertise." };
        }

        let searchQuery = "";
        let detectedExpertise = "";
        let expertiseList: string[] = [];

        const apiKey = process.env.GEMINI_API_KEY;

        if (apiKey) {
            const fallbackModels = ['gemini-2.0-flash', 'gemini-2.5-flash', 'gemini-flash-latest', 'gemini-2.5-pro'];
            let response;
            
            for (const modelName of fallbackModels) {
                try {
                    const ai = new GoogleGenAI({ apiKey });
                    const prompt = `Analyze this resume/portfolio text and extract the top 3 best matching job titles or core expertises. Respond ONLY with a comma-separated list of 3 titles (each 1-3 words max). Example: Software Engineer, Front End Developer, UI UX Designer.\n\nText:\n${extractedText.substring(0, 15000)}`;

                    response = await ai.models.generateContent({
                        model: modelName,
                        contents: prompt
                    });

                    if (response?.text) {
                        const rawTitles = response.text.trim().replace(/[".]/g, '');
                        expertiseList = rawTitles.split(',').map(s => s.trim()).filter(Boolean);
                        if (expertiseList.length > 0) {
                            searchQuery = expertiseList[0];
                            detectedExpertise = expertiseList[0];
                            break;
                        }
                    }
                } catch (e) {
                    console.error(`Gemini model ${modelName} failed`, e);
                }
            }
        } else {
            console.warn("No GEMINI_API_KEY found. Falling back to default search.");
        }

        if (expertiseList.length === 0 && searchQuery) {
            expertiseList = [searchQuery];
        }

        const res = await fetch(
            `https://jobstreet.p.rapidapi.com/search?query=${encodeURIComponent(searchQuery)}&countryCode=my`,
            {
                headers: {
                    'x-rapidapi-key': process.env.RAPIDAPI_KEY || "",
                    'x-rapidapi-host': 'jobstreet.p.rapidapi.com'
                }
            }
        )

        if (!res.ok) {
            return { error: "An unknown error occurred", extractedText }
        }

        const data = await res.json()
        const jobs = data.data || (Array.isArray(data) ? data : (data.results || []));

        return { data: jobs, expertise: detectedExpertise, expertiseList, extractedText }

    } catch (err: any) {
        console.error(err);
        return { error: err.message || "An unexpected error occurred during processing." };
    }
}

export async function fetchJobsForExpertise(searchQuery: string) {
    try {
        if (!searchQuery) return { error: "Search query is required." };

        const res = await fetch(
            `https://jobstreet.p.rapidapi.com/search?query=${encodeURIComponent(searchQuery)}&countryCode=my`,
            {
                headers: {
                    'x-rapidapi-key': process.env.RAPIDAPI_KEY || "",
                    'x-rapidapi-host': 'jobstreet.p.rapidapi.com'
                }
            }
        )

        if (!res.ok) {
            return { error: "An unknown error occurred" }
        }

        const data = await res.json()
        const jobs = data.data || (Array.isArray(data) ? data : (data.results || []));

        return { data: jobs }
    } catch (err: any) {
        console.error(err);
        return { error: err.message || "An unexpected error occurred during processing." };
    }
}