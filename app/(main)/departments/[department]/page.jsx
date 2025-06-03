import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import dep_data from "@/public/dep_data.json";
import {
  Building2,
  GraduationCap,
  UserRound,
  Mail,
  Phone,
  Globe,
  MapPin,
  BookOpen,
  Users,
  Clock,
} from "lucide-react";

export default function DepartmentPage({ params }) {
  const deps = dep_data.university.departments;
  const department = deps.find(
    (dept) => dept.abbreviation === params.department
  );

  if (!department) {
    return (
      <div className="flex items-center justify-center min-h-[80vh]">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <CardTitle className="text-2xl">Department Not Found</CardTitle>
            <CardDescription className="mt-2">
              The department with abbreviation "{params.department}" could not
              be found.
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-center">
            <Button variant="outline" asChild>
              <a href="/">Return Home</a>
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="px-8 py-8 space-y-8">
      <div className="flex items-center mb-4">
        <Button variant="outline" asChild>
          <a href="/">Home</a>
        </Button>
      </div>
      <div className="relative rounded-xl border-[1px] h-64">
        <div className="absolute inset-0  z-10" />
        <div className="relative z-20 h-full flex flex-col justify-center p-8">
          <div className="max-w-3xl">
            <Badge variant="secondary" className="mb-4">
              <Clock className="w-4 h-4 mr-2" />
              Est. {department.established}
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight ">
              {department.name}
            </h1>
            <p className="mt-2 text-lg">
              {department.tagline ||
                `Excellence in ${department.name} education and research`}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <BookOpen className="w-5 h-5" />
                About the Department
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                {department.description ||
                  `The ${department.name} Department at ${deps.name} has been providing 
                    quality education since ${department.established}. Our department is 
                    committed to excellence in teaching and research, preparing students 
                    for successful careers in their field. We offer a comprehensive 
                    curriculum that combines theoretical knowledge with practical 
                    applications.`}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <GraduationCap className="w-5 h-5" />
                Programs & Courses
              </CardTitle>
              <CardDescription>Explore our academic offerings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {department.courses.map((course, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                  >
                    <div className="bg-primary/10 p-2 rounded-full">
                      <GraduationCap className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">{course}</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {course.length > 20
                          ? "Undergraduate/Graduate Program"
                          : "Core Course"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <Building2 className="w-5 h-5" />
                Department Facts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <UserRound className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    Department Head
                  </p>
                  <p className="font-medium">{department.head}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <MapPin className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="font-medium">{department.building}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Users className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    Faculty Members
                  </p>
                  <p className="font-medium">
                    {department.facultyCount || "25+"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Badge className="w-4 h-4 text-primary bg-transparent" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Abbreviation</p>
                  <p className="font-medium uppercase">
                    {department.abbreviation}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <Mail className="w-5 h-5" />
                Contact Us
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Mail className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">
                    {department.email ||
                      `${department.abbreviation.toLowerCase()}@university.edu`}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Phone className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="font-medium">
                    {department.phone || "(123) 456-7890"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Globe className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    Department Facebook
                  </p>
                  <a
                    href={
                      department.website ||
                      `https://university.edu/${department.abbreviation.toLowerCase()}`
                    }
                    className="font-medium text-primary hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Visit Department Site
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
