"use server"

export async function handleResume(formData: FormData) {

    const file = formData.get("resume") as File

    // Summarize the resume using AI

    const searchQuery = "Engineer";

    const res = await fetch(
        `https://jobstreet.p.rapidapi.com/search?query=${encodeURIComponent(searchQuery)}&countryCode=my`,
        {
            headers: {
                'x-rapidapi-key': "7ae1bfe668msh42c7a53eee807d5p1af5b6jsnb9edd51c4541",
                'x-rapidapi-host': 'jobstreet.p.rapidapi.com'
            }
        }
    )

    if (!res.ok) {
        return { error: "Failed to fetch jobs" }
    }

    const data = await res.json()

    const jobs = data.data || (Array.isArray(data) ? data : (data.results || []));

    return { data: jobs }

}