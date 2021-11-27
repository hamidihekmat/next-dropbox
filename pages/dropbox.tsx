import { NextPage } from 'next';
import { useRef, useEffect } from 'react';
import HLS from 'hls.js';

const Dropbox: NextPage = () => {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const hls = new HLS();
    hls.loadSource(
      'https://next-dropbox.vercel.app/api/stream/p/hls_master_playlist/ABWsFnzbR5sohbOnG_3zbODygNaJooO4EHiRFaHnLX1MV44bd3r7TkHwC8_n8IMgzBVf-Bivmxuk99zFVIhebseqKV-BRssC4KDuX6OCl-lxm7hTQHBoT2Nssyu3jKRLTrWLKyRPg2yCPdv_8qCSPJazMdjB4NINNSYKIIdNYBeoqLH8s50e7HXU5bzyCORf8g0YXjuZqRVmWEWwxNbmspz-jKI5F3r94SN1p9eOmhKni896lbvKLsiDZbG85vYW-n2S4XgtvG8hLjevlDBe-gnyIh-2NMX6E0v73Vg4E3s5joONlNyqJ1XFu1KAoPPLZEk/p.m3u8'
    );
    hls.attachMedia(ref.current!);

    hls.on(HLS.Events.MANIFEST_PARSED, () => {
      ref.current?.play();
    });
  }, []);

  return (
    <div>
      <video ref={ref} preload="none" id="player" controls />
    </div>
  );
};

export default Dropbox;
