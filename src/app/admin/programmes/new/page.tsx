"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { GraduationCap, Home, ArrowLeft } from "lucide-react"

const formSchema = z.object({
  Prog_ID: z.string().min(1, "Programme ID is required").max(10),
  Prog_Name: z.string().min(1, "Programme name is required").max(50),
  Prog_Short_Name: z.string().min(1, "Short name is required").max(20),
  Regulatory_Body_Name: z.string().max(50).optional(),
  Regulatory_Body_ShortName: z.string().max(10).optional(),
  University_School: z.string().min(1, "University/School is required").max(10),
  Semester_Annual: z.enum(["1", "0"], {
    required_error: "System type is required",
  }),
  Min_Duration_in_years: z
    .string()
    .min(1, "Minimum duration is required")
    .transform((val) => Number.parseInt(val))
    .refine((val) => val > 0 && val <= 99, "Duration must be between 1 and 99 years"),
  Max_Duration_in_years: z
    .string()
    .min(1, "Maximum duration is required")
    .transform((val) => Number.parseInt(val))
    .refine((val) => val > 0 && val <= 99, "Duration must be between 1 and 99 years"),
})

type FormValues = z.infer<typeof formSchema>

export default function NewProgrammePage() {
  const router = useRouter()

  const form = useForm<FormValues>({
    // resolver: zodResolver(formSchema),
    defaultValues: {
      Prog_ID: "",
      Prog_Name: "",
      Prog_Short_Name: "",
      Regulatory_Body_Name: "",
      Regulatory_Body_ShortName: "",
      University_School: "",
      Semester_Annual: undefined,
      Min_Duration_in_years: 0,
      Max_Duration_in_years: 0,
    },
  })

  const onSubmit = async (values: FormValues) => {
    try {
      // Here you would typically send the data to your backend
      console.log("Programme data:", values)

      // Show success message and redirect
      alert("Programme added successfully!")
      router.push("/admin/programmes")
    } catch (error) {
      console.error("Error adding programme:", error)
      alert("Error adding programme. Please try again.")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-[#0c4da2] text-white py-4 px-6 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <GraduationCap className="h-6 w-6 mr-2" />
            <h1 className="text-xl font-bold">BPIT - Add New Programme</h1>
          </div>
          <div className="flex gap-2">
            <Link href="/admin/programmes">
              <Button variant="outline" className="text-white border-white hover:bg-white hover:text-[#0c4da2]">
                <ArrowLeft className="h-4 w-4 mr-2" /> Back to Programmes
              </Button>
            </Link>
            <Link href="/">
              <Button variant="outline" className="text-white border-white hover:bg-white hover:text-[#0c4da2]">
                <Home className="h-4 w-4 mr-2" /> Home
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto py-8 px-4">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl">Add New Programme</CardTitle>
            <CardDescription>Create a new academic programme for the institute</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="Prog_ID"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Programme ID*</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., BTECH001" {...field} />
                        </FormControl>
                        <FormDescription>Unique identifier for the programme (max 10 characters)</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="Prog_Short_Name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Short Name*</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., B.Tech" {...field} />
                        </FormControl>
                        <FormDescription>Abbreviated programme name (max 20 characters)</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="Prog_Name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Programme Name*</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Bachelor of Technology" {...field} />
                      </FormControl>
                      <FormDescription>Full name of the programme (max 50 characters)</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="Regulatory_Body_Name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Regulatory Body Name</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., All India Council for Technical Education" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="Regulatory_Body_ShortName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Regulatory Body Short Name</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., AICTE" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <FormField
                    control={form.control}
                    name="University_School"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>University/School*</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., GGSIPU" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="Min_Duration_in_years"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Min Duration (Years)*</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="4" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="Max_Duration_in_years"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Max Duration (Years)*</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="6" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="Semester_Annual"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>System Type*</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select system type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="1">Semester System</SelectItem>
                          <SelectItem value="0">Annual System</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end space-x-4">
                  <Link href="/admin/programmes">
                    <Button variant="outline">Cancel</Button>
                  </Link>
                  <Button type="submit">Add Programme</Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}