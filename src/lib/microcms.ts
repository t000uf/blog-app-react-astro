//import microcms from 'microcms-js-sdk';
import { createClient } from 'microcms-js-sdk';

export const client = createClient({
  serviceDomain: import.meta.env.MICROCMS_SERVICE_DOMAIN,
  apiKey: import.meta.env.MICROCMS_API_KEY,
});

// SSR（下書きプレビュー）ルート用。静的ビルドと違い Cloudflare Worker 上で
// 実行されるため、モジュールスコープの import.meta.env ではシークレットを
// 読めない。呼び出し側でランタイム env を渡してその場でクライアントを作る。
export type MicroCMSEnv = {
  MICROCMS_SERVICE_DOMAIN?: string;
  MICROCMS_API_KEY?: string;
};

export const getClient = (env: MicroCMSEnv) =>
  createClient({
    serviceDomain: env.MICROCMS_SERVICE_DOMAIN as string,
    apiKey: env.MICROCMS_API_KEY as string,
  });

// draftKey を付けて単一記事の下書きを取得する薄いラッパ。
export const getBlogDraft = (env: MicroCMSEnv, contentId: string, draftKey: string) =>
  getClient(env).getListDetail<Blog>({
    endpoint: 'blog',
    contentId,
    queries: { draftKey },
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
