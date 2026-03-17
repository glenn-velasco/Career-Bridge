import { ModeToggle } from "@/components/ui/modetoggle"
import { Input} from "@/components/ui/input"
import { Label} from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardDescription, CardFooter, CardAction, CardContent } from "@/components/ui/card"
import { Button} from "@/components/ui/button"
import { ArrowUpIcon} from "lucide-react"
import {InputGroupCustom} from "@/components/ui/inputgroupcustom"
import {Joblistinglink} from "@/components/ui/joblistinglink"
 

export default function ButtonDemo() {
  const joblitingitems = [{
    title : "Title",
    description : "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsum laborum architecto nemo doloremque rerum? Autem repellat illo odit, corrupti voluptates sit laborum ad animi. Fugiat sapiente rem recusandae quasi quia.",
  },
  {
    title : "Title2",
    description : "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsum laborum architecto nemo doloremque rerum? Autem repellat illo odit, corrupti voluptates sit laborum ad animi. Fugiat sapiente rem recusandae quasi quia.",
  }]

  return (
    <div className="flex space-y-6 flex-col items-center justify-around py-5 bg-[--color-background] min-h-screen">
      <div className="flex flex-col justify-start gap-5 overflow-y-auto h-[300px]">
        {joblitingitems.map((item,index) => (
          <Joblistinglink key={index} title={item.title} description={item.description}/>
        ))}  
      </div>
      <InputGroupCustom/>
        
    </div>
    
  )
}

