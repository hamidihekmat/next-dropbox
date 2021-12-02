import { baseUrl, cookie } from './dropbox.config';

const agent =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36';

export async function fetchPlaylist(
  url: string,
  userAgent: string | null
): Promise<Response> {
  const response = await fetch(url, {
    headers: {
      'User-Agent': userAgent ?? agent,
      Cookie: cookie,
    },
  });
  console.log(url);
  const body = await response.text();
  // replace with domain
  const modifiedBody = body.replace(
    /previews.dropbox.com/g,
    process.env.API_URL!
  );

  return new Response(modifiedBody, {
    status: response.status,
    statusText: response.statusText,
    headers: response.headers,
  });
}

export async function fetchHLS(
  url: string,
  userAgent: string | null
): Promise<Response> {
  const response = await fetch(url, {
    headers: {
      'User-Agent': userAgent ?? agent,
      Cookie: cookie,
    },
  });
  return response;
}

export const createMasterPlaylistLink = (pathname: string) => {
  const [_, altererPath] = pathname.split('/api/stream/');
  return `${baseUrl}/${altererPath}`;
};

export const createPlaylistLink = (
  searchParams: URLSearchParams,
  pathname: string
): string => {
  const uuid = pathname.split('/')[5];
  return searchParams.get('type') === 'audio'
    ? `${baseUrl}/p/hls_playlist/${uuid}/p.m3u8?bps=${searchParams.get(
        'bps'
      )}&type=${searchParams.get('type')}`
    : `${baseUrl}/p/hls_playlist/${uuid}/p.m3u8?size=${searchParams.get(
        'size'
      )}&type=${searchParams.get('type')}`;
};

export const createSegmentLink = (
  searchParams: URLSearchParams,
  pathname: string
): string => {
  // parse uuid
  const uuid = pathname.split('/')[5];
  return `${baseUrl}/p/hls_segment/${uuid}/p.ts?segment_num=${searchParams.get(
    'segment_num'
  )}&segment_type=${searchParams.get('segment_type')}`;
};
