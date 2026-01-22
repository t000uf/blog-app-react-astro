import microcms from 'microcms-js-sdk';
const { createClient } = microcms;

export const client = createClient({
  serviceDomain: import.meta.env.MICROCMS_SERVICE_DOMAIN,
  apiKey: import.meta.env.MICROCMS_API_KEY,
});

// 記事の型定義（スキーマ）を作成
export type Blog = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  // microCMSで追加したフィールドがあればここに足す
};
