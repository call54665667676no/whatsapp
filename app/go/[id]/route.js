import { NextResponse } from 'next/server';

// Server-side dynamic behavior forced
export const dynamic = 'force-dynamic';

const targetUrls = {
  doc1: 'https://b.urlxx342.com/?utm_source=Reels&utm_medium=SK',
  doc2: 'https://docs.google.com/document/d/YOUR_DOC_ID_2/edit',
  link1: 'https://b.urlxx342.com/?utm_source=Reels&utm_medium=SK',
};

export async function GET(request, { params }) {
  // Dynamic Route Parameters await karein
  const { id } = await params;
  const destination = targetUrls[id];

  // Agar ID match na ho toh root domain par bhej dein
  if (!destination) {
    return NextResponse.redirect(new URL('/', request.url), 307);
  }

  const finalUrl = new URL(destination);
  const incomingUrl = new URL(request.url);

  // Incoming UTM parameters copy aur append karein
  incomingUrl.searchParams.forEach((value, key) => {
    finalUrl.searchParams.set(key, value);
  });

  return NextResponse.redirect(finalUrl.toString(), 307);
}
