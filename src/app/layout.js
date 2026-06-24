import "./globals.css";

export const metadata = {
  title: "Takhleeq",
  description: "A calm AI image-generation inspiration board.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-[100dvh] overflow-x-hidden bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
