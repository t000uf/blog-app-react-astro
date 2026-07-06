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
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  thumbnail?: {
    url: string;
  };
  tags?: { id: string; name: string }[];
  author: Author | null;
};

// オブジェクト形式API（endpoint: 'about'）。リスト形式と違い contents 配列ではなく
// オブジェクトが直接返る。プロフィール等の単一ページ用。
export type About = {
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  title: string;
  body: string;
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
