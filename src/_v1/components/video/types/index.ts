export interface Subtitle {
  src: string;
  label: string;
  language: string;
  kind: "subtitles";
  default?: boolean;
}

export interface Chapter {
  src: string;
  kind: "chapters";
  language: string;
  default?: boolean;
}

export type Data = (Subtitle | Chapter)[];
