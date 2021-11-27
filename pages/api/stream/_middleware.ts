import {
  createMasterPlaylistLink,
  createPlaylistLink,
  createSegmentLink,
  fetchHLS,
  fetchPlaylist,
} from 'lib/dropbox';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const { pathname, searchParams } = req.nextUrl;
  console.log({ url: req.url });
  // master m3u8
  if (pathname.includes('hls_master_playlist')) {
    try {
      const url = createMasterPlaylistLink(req.url);
      return await fetchPlaylist(url);
    } catch (error) {
      return new Response(JSON.stringify(error));
    }
  }

  if (pathname.includes('hls_playlist')) {
    try {
      const url = createPlaylistLink(searchParams, pathname);
      return await fetchPlaylist(url);
    } catch (error) {}
  }

  if (pathname.includes('hls_segment')) {
    try {
      const url = createSegmentLink(searchParams, pathname);
      return await fetchHLS(url);
    } catch (error) {
      return new Response(JSON.stringify(error));
    }
  }
  return new Response(
    JSON.stringify({ message: 'You are not allowed to be here!' })
  );
}
