import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '¿La IA va a reemplazar tu trabajo? | AI Replaceability Score',
  description:
    'Descubre tu puntuación de reemplazabilidad por IA. Test gratuito basado en datos reales de automatización. Análisis en 30 segundos.',
  keywords: [
    'IA',
    'inteligencia artificial',
    'empleo',
    'automatización',
    'reemplazabilidad',
    'futuro del trabajo',
  ],
  authors: [{ name: 'AI Replaceability Score' }],
  openGraph: {
    type: 'website',
    url: 'https://ai-replaceability-score.vercel.app',
    title: '¿La IA va a reemplazar tu trabajo?',
    description: 'Descubre tu puntuación de reemplazabilidad por IA basado en datos reales',
    images: [
      {
        url: 'https://ai-replaceability-score.vercel.app/og-image.png',
        width: 1200,
        height: 630,
        alt: 'AI Replaceability Score',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '¿La IA va a reemplazar tu trabajo?',
    description: 'Descubre tu puntuación de reemplazabilidad por IA',
    images: ['https://ai-replaceability-score.vercel.app/og-image.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        {/* Favicon as SVG */}
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🤖</text></svg>"
        />
      </head>
      <body className="bg-gray-950 text-white font-sans">
        {children}
      </body>
    </html>
  );
}
