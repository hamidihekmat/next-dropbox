export type SegmentType = {
  uuid: string;
  // deno-lint-ignore camelcase
  segment_num: string;
  // deno-lint-ignore camelcase
  segment_type: 'audio' | 'video';
  size?: string;
};

export type PlaylistType = {
  uuid: string;
  bps?: string;
  type: 'audio' | 'video';
  size?: string;
};
interface customWindow extends Window {
  jwplayer: JWPlayerStatic;
}

declare const window: customWindow;
