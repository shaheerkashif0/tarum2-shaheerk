import { generatedContent } from "@/lib/generatedContent";

export async function GET() {
  return Response.json(generatedContent);
}
