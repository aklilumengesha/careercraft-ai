import { notFound, redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, Edit, Trash2, Copy } from "lucide-react";
import { getCoverLetterById } from "@/actions/cover-letter";
import Link from "next/link";

export default async function CoverLetterPage({ params }) {
  const user = await currentUser();
  if (!user) redirect("/");

  const { id } = params;
  const result = await getCoverLetterById(id);

  if (!result.success || !result.data) {
    notFound();
  }

  const coverLetter = result.data;

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">
            {coverLetter.jobTitle} at {coverLetter.company}
          </h1>
          <p className="text-muted-foreground">
            Created {new Date(coverLetter.createdAt).toLocaleDateString()}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Copy className="mr-2 h-4 w-4" />
            Copy
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
          <Button variant="destructive" size="sm">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Cover Letter</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose max-w-none">
            <div className="whitespace-pre-wrap leading-relaxed">
              {coverLetter.content}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="mt-6">
        <Link href="/dashboard">
          <Button variant="outline">Back to Dashboard</Button>
        </Link>
      </div>
    </div>
  );
}
