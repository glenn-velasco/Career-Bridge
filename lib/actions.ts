"use server"

export async function handleResume(formData: FormData) {

    const file = formData.get("resume") as File

    // Summarize the resume using AI

    const searchQuery = "Engineer";

    const res = await fetch(
        `https://jobstreet.p.rapidapi.com/search?query=${encodeURIComponent(searchQuery)}&countryCode=PH`,
        {
            headers: {
                'x-rapidapi-key': "b9a9bf2daamshc0bf31668f50813p19b0e9jsn4746a4fc3f1e",
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