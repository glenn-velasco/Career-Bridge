"use client"
import { FileInput,Send } from "lucide-react"

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
} from "@/components/ui/input-group"
import TextareaAutosize from "react-textarea-autosize"

export function InputGroupCustom() {
  return (
    <div className="grid w-full max-w-sm gap-6">
      <InputGroup>
        <TextareaAutosize
          data-slot="input-group-control"
          className="flex field-sizing-content min-h-16 w-full resize-none rounded-md bg-transparent px-3 py-2.5 text-base transition-[color,box-shadow] outline-none md:text-sm"
          placeholder="Job"
        />
       
        <InputGroupAddon align="block-end">
            <InputGroupButton className="" size="sm" variant="default">
                <FileInput/>
                Upload
            </InputGroupButton>
            <InputGroupButton className="" size="sm" variant="default">
                <Send/>
                Submit
            </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}
