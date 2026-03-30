//import microcms from 'microcms-js-sdk';
import { createClient } from 'microcms-js-sdk';

export const client = createClient({
  serviceDomain: import.meta.env.MICROCMS_SERVICE_DOMAIN,
  apiKey: import.meta.env.MICROCMS_API_KEY,
});

// 記事の型定義（スキーマ）を作成
export type Blog = {
  id: string;
  title: string;
  description: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  thumbnail?: {
    url: string;
  };
  author: Author;
};

export type Author = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  name: string;
  profile: string;
  image: {
    url: string;
    height: number;
    width: number;
  };
};
