import AppLayout from "@/components/AppLayout";
import { generatedContent } from "@/lib/generatedContent";

export default function Page() {
  return <AppLayout initialResults={generatedContent} />;
}
