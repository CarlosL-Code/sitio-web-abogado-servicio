import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
  title: "Myriam Contreras | Abogada",
  description: "Diplomada en derecho de familia, infancia y adolescencia. Licenciada en ciencias jurídicas con más de 3 años de experiencia solucionando problemas en el área digital.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${inter.variable} ${playfair.variable}`}>
        <div style={{ overflowX: 'hidden', width: '100%', position: 'relative', minHeight: '100vh' }}>
          {children}
        </div>
      </body>
    </html>
  );
}
