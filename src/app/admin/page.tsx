import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { GraduationCap, Home, BookOpen, Users, Calendar, FileText, Settings } from "lucide-react"

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-[#0c4da2] text-white py-4 px-6 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <GraduationCap className="h-6 w-6 mr-2" />
            <h1 className="text-xl font-bold">BPIT Admin Dashboard</h1>
          </div>
          <Link href="/">
            <Button variant="outline" className="text-white border-white hover:bg-white hover:text-[#0c4da2]">
              <Home className="h-4 w-4 mr-2" /> Back to Home
            </Button>
          </Link>
        </div>
      </header>

      <div className="container mx-auto py-8 px-4">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h2>
          <p className="text-gray-600">Manage academic programs, courses, and student data</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Programmes Management */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center">
                <div className="bg-blue-100 p-2 rounded-lg mr-3">
                  <BookOpen className="h-6 w-6 text-blue-700" />
                </div>
                <div>
                  <CardTitle>Programmes</CardTitle>
                  <CardDescription>Manage academic programmes</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Link href="/admin/programmes">
                  <Button className="w-full justify-start" variant="outline">
                    View All Programmes
                  </Button>
                </Link>
                <Link href="/admin/programmes/new">
                  <Button className="w-full justify-start" variant="outline">
                    Add New Programme
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Courses Management */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center">
                <div className="bg-green-100 p-2 rounded-lg mr-3">
                  <FileText className="h-6 w-6 text-green-700" />
                </div>
                <div>
                  <CardTitle>Courses</CardTitle>
                  <CardDescription>Manage courses and curriculum</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Link href="/admin/courses">
                  <Button className="w-full justify-start" variant="outline">
                    View All Courses
                  </Button>
                </Link>
                <Link href="/admin/courses/new">
                  <Button className="w-full justify-start" variant="outline">
                    Add New Course
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Course Intake Management */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center">
                <div className="bg-purple-100 p-2 rounded-lg mr-3">
                  <Users className="h-6 w-6 text-purple-700" />
                </div>
                <div>
                  <CardTitle>Course Intake</CardTitle>
                  <CardDescription>Manage yearly intake capacity</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Link href="/admin/intake">
                  <Button className="w-full justify-start" variant="outline">
                    View Intake Data
                  </Button>
                </Link>
                <Link href="/admin/intake/new">
                  <Button className="w-full justify-start" variant="outline">
                    Set Course Intake
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Course Schemes Management */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center">
                <div className="bg-orange-100 p-2 rounded-lg mr-3">
                  <Settings className="h-6 w-6 text-orange-700" />
                </div>
                <div>
                  <CardTitle>Course Schemes</CardTitle>
                  <CardDescription>Manage course schemes and structure</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Link href="/admin/schemes">
                  <Button className="w-full justify-start" variant="outline">
                    View All Schemes
                  </Button>
                </Link>
                <Link href="/admin/schemes/new">
                  <Button className="w-full justify-start" variant="outline">
                    Add New Scheme
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Subject Master Management */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center">
                <div className="bg-red-100 p-2 rounded-lg mr-3">
                  <Calendar className="h-6 w-6 text-red-700" />
                </div>
                <div>
                  <CardTitle>Subjects</CardTitle>
                  <CardDescription>Manage subject master data</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Link href="/admin/subjects">
                  <Button className="w-full justify-start" variant="outline">
                    View All Subjects
                  </Button>
                </Link>
                <Link href="/admin/subjects/new">
                  <Button className="w-full justify-start" variant="outline">
                    Add New Subject
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Students Management */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center">
                <div className="bg-teal-100 p-2 rounded-lg mr-3">
                  <Users className="h-6 w-6 text-teal-700" />
                </div>
                <div>
                  <CardTitle>Students</CardTitle>
                  <CardDescription>Manage student records</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Link href="/admin/students">
                  <Button className="w-full justify-start" variant="outline">
                    View All Students
                  </Button>
                </Link>
                <Link href="/student-registration">
                  <Button className="w-full justify-start" variant="outline">
                    Student Registration
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}