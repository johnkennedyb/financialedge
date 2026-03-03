export type WPTitle = {
  rendered: string;
};

export type WPContent = {
  rendered: string;
  protected: boolean;
};

export type WPExcerpt = {
  rendered: string;
  protected: boolean;
};

export type WPCategory = {
  id: number;
  name: string;
  slug: string;
  count: number;
  parent: number;
  link: string;
};

export type WPMediaSize = {
  source_url: string;
  width: number;
  height: number;
};

export type WPMediaDetails = {
  sizes?: Record<string, WPMediaSize>;
};

export type WPMedia = {
  id: number;
  alt_text: string;
  source_url: string;
  media_details?: WPMediaDetails;
};

export type WPEmbedded = {
  "wp:featuredmedia"?: WPMedia[];
  author?: Array<{ id: number; name: string }>; // sometimes available
  "wp:term"?: Array<Array<WPCategory>>;
};

export type WPPost = {
  id: number;
  date: string;
  modified: string;
  slug: string;
  link: string;
  title: WPTitle;
  content: WPContent;
  excerpt: WPExcerpt;
  author: number;
  featured_media: number;
  categories: number[];
  _embedded?: WPEmbedded;
};

export type WPPage = {
  id: number;
  slug: string;
  title: WPTitle;
  content: WPContent;
  excerpt: WPExcerpt;
  featured_media: number;
  _embedded?: WPEmbedded;
};
