export type PageParams<T = {}> = {
  params: Promise<T>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export type LayoutParams<T = {}> = {
  children: React.ReactNode;
  params: Promise<T>;
}; 