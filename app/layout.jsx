import "./globals.css";

export const metadata = {
  title: "Sai Teja Jarabala | AI, Cybersecurity & Embedded Intelligence",
  description:
    "Portfolio of Sai Teja Jarabala — Computer Engineer specialising in ML-based IDS, FPGA acceleration, cyber-physical systems, and secure communication.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
        href="https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&display=swap"
        rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
