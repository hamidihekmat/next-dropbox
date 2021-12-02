import { useEffect, useRef } from 'react';

import Plyr from 'plyr';
import 'plyr/dist/plyr.css';

import Hls from 'hls.js';

interface customWindow extends Window {
  hls: Hls;
}

declare const window: customWindow;

export default function Home() {
  const videRef = useRef<HTMLVideoElement>(null);
  const sourceRef = useRef<HTMLSourceElement>(null);
  const source =
    'https://next-dropbox.vercel.app/api/stream/p/hls_master_playlist/ABW9m0mEeYvcODqjALgZEbRjRKPd4N8h9c2wNb5KOQthzC3kdGlM97L_LuL2rqIphkltDyf8hls1VLTC-G2MXTBC5-xCLNlESnQF0X2cyYdpgmmhocPShS0Y8-LluwrRDvwqZV2dsP4mjXAI10fYwXHOElbpNc1UiZVLOTI4zDvJG0KA3KKh4nNiv8Ceyh4vFr2ko9iIqcxcwOwl1fJDmDI_CEKBjL1DxdUzemE89AACtEpcZFnwrOA3zFSape-1Iur4WRwaPqOKxRzGH4q2Rr9z6AzK8tL7EUOOg9YzMZD7sCGeY5df84Tzd6yh5QgcUik/p.m3u8';
  const init = () => {
    const defaultOptions: any = {};
    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(sourceRef?.current?.src!);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        const availableQualities = hls.levels.map((l) => l.height);

        defaultOptions.quality = {
          default: availableQualities[0],
          options: availableQualities,
          // this ensures Plyr to use Hls to update quality level
          forced: true,
          onChange: (e: any) => updateQuality(e),
        };
        const plyr = new Plyr(videRef.current!, defaultOptions);
      });
      hls.attachMedia(videRef.current!);
      window.hls = hls;
    } else {
      const plyr = new Plyr(videRef.current!, defaultOptions);
    }

    const updateQuality = (newQuality: any) => {
      window.hls.levels.forEach((level, levelIndex) => {
        if (level.height === newQuality) {
          console.log('Found quality match with ' + newQuality + 'p');
          window.hls.currentLevel = levelIndex;
        }
      });
    };
  };
  useEffect(() => {
    init();
  }, []);

  return (
    <div>
      <video ref={videRef} controls>
        <source
          ref={sourceRef}
          type="application/x-mpegURL"
          src={source}
        ></source>
      </video>
    </div>
  );
}
