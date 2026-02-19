export type PageParams<T = {}> = {
  params: T;
  searchParams: { [key: string]: string | string[] | undefined };
};

export type LayoutParams<T = {}> = {
  children: React.ReactNode;
  params: T;
}; 