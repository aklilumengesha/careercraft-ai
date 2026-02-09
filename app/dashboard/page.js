import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import {
  FileText,
  MessageSquare,
  Mail,
  TrendingUp,
  ArrowRight,
} from "lucide-react";
import { getUserWithResumes } from "@/actions/user";
import { checkUser } from "@/lib/checkUser";

export default async function DashboardPage() {
  const user = await currentUser();

  if (!user) {
    redirect("/");
  }

  // Ensure user exists in database
  await checkUser();

  const userData = await getUserWithResumes();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-primary/10 via-primary/5 to-background overflow-hidden">
        <div className="container mx-auto py-12 px-4">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="animate-in fade-in slide-in-from-left duration-700">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                Welcome back, {user.firstName}!
              </h1>
              <p className="text-muted-foreground text-lg">
                Continue your career journey with AI-powered tools.
              </p>
            </div>
            <div className="relative h-[200px] lg:h-[250px] rounded-lg overflow-hidden shadow-lg group animate-in fade-in slide-in-from-right duration-700">
              <Image
                src="https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=2070&auto=format&fit=crop"
                alt="Career success and growth"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto py-8 px-4">

      {/* Quick Stats */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <Card className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-primary/30 cursor-pointer group">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium group-hover:text-primary transition-colors">Resumes</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:scale-110 transition-all" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold group-hover:scale-110 transition-transform">
              {userData?.resumes?.length || 0}
            </div>
            <p className="text-xs text-muted-foreground">Total created</p>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-primary/30 cursor-pointer group">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium group-hover:text-primary transition-colors">Interviews</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:scale-110 transition-all" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold group-hover:scale-110 transition-transform">
              {userData?.interviews?.length || 0}
            </div>
            <p className="text-xs text-muted-foreground">Practice sessions</p>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-primary/30 cursor-pointer group">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium group-hover:text-primary transition-colors">
              Cover Letters
            </CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:scale-110 transition-all" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold group-hover:scale-110 transition-transform">
              {userData?.coverLetters?.length || 0}
            </div>
            <p className="text-xs text-muted-foreground">Generated</p>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-primary/30 cursor-pointer group">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium group-hover:text-primary transition-colors">Progress</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:scale-110 transition-all" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold group-hover:scale-110 transition-transform">
              {((userData?.resumes?.length || 0) +
                (userData?.interviews?.length || 0)) *
                10}
              %
            </div>
            <p className="text-xs text-muted-foreground">Profile completion</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-2 hover:border-primary/50 group">
          <CardHeader>
            <div className="p-3 rounded-full bg-primary/10 w-fit group-hover:bg-primary group-hover:shadow-lg transition-all duration-300">
              <FileText className="h-8 w-8 text-primary mb-2 group-hover:text-white group-hover:scale-110 transition-all duration-300" />
            </div>
            <CardTitle className="group-hover:text-primary transition-colors duration-300">Create Resume</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Build an ATS-optimized resume with AI assistance.
            </p>
            <Link href="/resume/new">
              <Button className="w-full group/btn transition-all duration-300 hover:scale-105">
                Start Building
                <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-2 hover:border-primary/50 group">
          <CardHeader>
            <div className="p-3 rounded-full bg-primary/10 w-fit group-hover:bg-primary group-hover:shadow-lg transition-all duration-300">
              <MessageSquare className="h-8 w-8 text-primary mb-2 group-hover:text-white group-hover:scale-110 transition-all duration-300" />
            </div>
            <CardTitle className="group-hover:text-primary transition-colors duration-300">Practice Interview</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Get AI-powered interview preparation and feedback.
            </p>
            <Link href="/interview/new">
              <Button className="w-full group/btn transition-all duration-300 hover:scale-105">
                Start Practice
                <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-2 hover:border-primary/50 group">
          <CardHeader>
            <div className="p-3 rounded-full bg-primary/10 w-fit group-hover:bg-primary group-hover:shadow-lg transition-all duration-300">
              <Mail className="h-8 w-8 text-primary mb-2 group-hover:text-white group-hover:scale-110 transition-all duration-300" />
            </div>
            <CardTitle className="group-hover:text-primary transition-colors duration-300">Generate Cover Letter</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Create personalized cover letters for any job.
            </p>
            <Link href="/cover-letter/new">
              <Button className="w-full group/btn transition-all duration-300 hover:scale-105">
                Create Letter
                <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Recent Activity</h2>
        <Card>
          <CardContent className="pt-6">
            {userData?.resumes?.length === 0 &&
            userData?.interviews?.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <p>No activity yet. Start by creating your first resume!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {userData?.resumes?.slice(0, 3).map((resume) => (
                  <div
                    key={resume.id}
                    className="flex items-center justify-between border-b pb-4 last:border-0"
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">{resume.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(resume.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <Link href={`/resume/${resume.id}`}>
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      </div>
    </div>
  );
}
