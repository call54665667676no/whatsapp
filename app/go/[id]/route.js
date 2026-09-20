import { NextResponse } from 'next/server';

const targetUrls = {
  doc1: 'https://b.urlxx342.com/?utm_source=Raees&utm_medium=SK',
  doc2: 'https://docs.google.com/document/d/YOUR_DOC_ID_2/edit',
  link1: 'https://b.urlxx342.com/?utm_source=Raees&utm_medium=SK',
};

export async function GET(request, { params }) {
  const { id } = await params;
  const destination = targetUrls[id];

  if (!destination) {
    return NextResponse.redirect(new URL('/', request.url), 307);
  }

  const finalUrl = new URL(destination);
  const incomingUrl = new URL(request.url);

  // Sirf UTM parameters forward honge
  incomingUrl.searchParams.forEach((value, key) => {
    if (key.startsWith('utm_')) {
      finalUrl.searchParams.set(key, value);
    }
  });

  return NextResponse.redirect(finalUrl, 307);
}
