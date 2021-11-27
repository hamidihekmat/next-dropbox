import type { JWPlayerStatic, Playlist } from 'types/jwplayer';
import { useState, useEffect, useRef, FC } from 'react';
import Script from 'next/script';

interface customWindow extends Window {
  jwplayer: JWPlayerStatic;
}

declare const window: customWindow;

export interface PlayerProp {
  playlist: Playlist;
}

export const JWPlayer: FC<PlayerProp> = ({ playlist }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [player, setPlayer] = useState<{ jwplayer: JWPlayerStatic }>();
  useEffect(() => {
    if (player) {
      player.jwplayer(ref.current?.id).setup({
        playlist: [playlist],
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
        strategy="lazyOnload"
      />
      <div ref={ref} id="player" />
    </>
  );
};
