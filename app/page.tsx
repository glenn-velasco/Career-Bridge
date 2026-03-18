"use client";

import * as React from "react"
import { ModeToggle } from "@/components/ui/modetoggle"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { UploadCloud, Send } from "lucide-react"
import Link from "next/link"
import { handleResume } from "@/lib/actions";

export default function JobBoard() {

  const [fileName, setFileName] = React.useState<string | null>(null)

  const fileInputRef = React.useRef<HTMLInputElement>(null)

  const [jobs, setJobs] = React.useState<any[]>([])

  const [isPending, setIsPending] = React.useState<boolean>(false)

  const handleUploadClick = () => {

    fileInputRef.current?.click()

  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    const file = e.target.files?.[0]

    if (file) {

      setFileName(file.name)

    }

  }

  const [error, setError] = React.useState<string | null>(null)

  const handleResumeSubmit = async (formData: FormData) => {
    setIsPending(true)
    setError(null)

    try {
      const { data, error: serverError } = await handleResume(formData)

      if (serverError) {
        setError(serverError)
        setJobs([])
      } else if (data) {
        setJobs(data)
      }
    } catch (err) {
      setError("An unexpected error occurred")
    } finally {
      setIsPending(false)
    }
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 font-sans">

      <div className="mx-auto w-full max-w-3xl space-y-8">

        {/* Header Section */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
            Open Positions
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-lg">
            Find your next role and help us build the future.
          </p>

          <p className="text-muted-foreground text-md mt-5">Results Found: {jobs.length}</p>
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>

        {/* Job Listings Area */}
        <div className="space-y-4 overflow-y-auto max-h-[500px] no-scroll-bar">
          {jobs.map((item, index) => (
            <Link key={index} href="/job-info" /*target="_blank"*/>
              <Card className="shadow-sm hover:shadow-md transition-shadow border-slate-200 dark:border-slate-800 m-3">
                <CardHeader className="pb-3">
                  <div className="flex flex-row items-start justify-between gap-4">
                    <div className="space-y-1.5">
                      <CardTitle className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                        {item.title || "Untitled Position"}
                      </CardTitle>
                      <CardDescription className="text-sm font-medium text-slate-500">
                        {item.companyName || item.advertiser?.description || "Unknown Company"} • {item.locations?.[0]?.label || "Remote"}
                      </CardDescription>
                    </div>

                    <span className="shrink-0 inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-800 dark:bg-blue-900/40 dark:text-blue-300">
                      {item.workTypes?.[0]}
                    </span>
                  </div>
                </CardHeader>

                <CardContent>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3">
                    {item.teaser || "No description available."}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
          {!isPending && jobs.length === 0 && !error && (
            <p className="text-center text-slate-500 py-10">No jobs found. Try uploading your resume to see matches.</p>
          )}
          {isPending && (
            <div className="flex justify-center py-10">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          )}
        </div>

        <Card className="mt-8 border-slate-200 shadow-sm dark:border-slate-800">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              Submit your application
            </CardTitle>
            <CardDescription>
              Upload your resume and details to find matching jobs.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form action={handleResumeSubmit} className="space-y-4">
              <input type="file" name="resume" className="hidden" ref={fileInputRef} onChange={handleFileChange} accept=".pdf,.docx" />
              <div className="flex flex-col sm:flex-row gap-3">
                <Button type="button" variant="outline" className="flex items-center gap-2" onClick={handleUploadClick} disabled={isPending}>
                  <UploadCloud className="h-4 w-4" />
                  {fileName ? "Change Resume" : "Upload Resume"}
                </Button>
                <Button type="submit" className="flex items-center gap-2" variant="default" disabled={!fileName || isPending}>
                  {isPending ? "Processing..." : (
                    <>
                      <Send className="h-4 w-4" />
                      Find Jobs
                    </>
                  )}
                </Button>
              </div>

              {fileName && (
                <div className="flex items-center gap-2 text-sm text-green-600 animate-in fade-in slide-in-from-top-1">
                  <Send className="h-4 w-4" />
                  Selected: {fileName}
                </div>
              )}
            </form>
          </CardContent>
        </Card>

        <ModeToggle></ModeToggle>
      </div>
    </div>
  )
}