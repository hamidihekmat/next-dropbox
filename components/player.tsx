import { JWPlayerStatic } from 'types/jwplayer';
import { useState, useEffect, useRef } from 'react';
import Script from 'next/script';

interface customWindow extends Window {
  jwplayer: JWPlayerStatic;
}

declare const window: customWindow;

export default function Player() {
  const ref = useRef<HTMLDivElement>(null);
  const [player, setPlayer] = useState<{ jwplayer: JWPlayerStatic }>();
  useEffect(() => {
    if (player) {
      player.jwplayer(ref.current?.id).setup({
        playlist: [
          {
            file: 'https://next-dropbox.vercel.app/api/stream/p/hls_master_playlist/ABWsFnzbR5sohbOnG_3zbODygNaJooO4EHiRFaHnLX1MV44bd3r7TkHwC8_n8IMgzBVf-Bivmxuk99zFVIhebseqKV-BRssC4KDuX6OCl-lxm7hTQHBoT2Nssyu3jKRLTrWLKyRPg2yCPdv_8qCSPJazMdjB4NINNSYKIIdNYBeoqLH8s50e7HXU5bzyCORf8g0YXjuZqRVmWEWwxNbmspz-jKI5F3r94SN1p9eOmhKni896lbvKLsiDZbG85vYW-n2S4XgtvG8hLjevlDBe-gnyIh-2NMX6E0v73Vg4E3s5joONlNyqJ1XFu1KAoPPLZEk/p.m3u8',
          },
        ],
      });
    }
  }, [player]);
  return (
    <>
      <Script
        src="https://content.jwplatform.com/libraries/jvJ1Gu3c.js"
        onLoad={() => {
          setPlayer({ jwplayer: window.jwplayer });
        }}
        strategy="afterInteractive"
      />
      <div ref={ref} id="player" />
    </>
  );
}
