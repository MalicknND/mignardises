import { cookies } from "next/headers";

interface IFetchParams {
  url: string;
  method: "GET"|"POST"|"PUT"|"PATCH"|"DELETE";
  additionnalHeaders?: { [key: string]: string };
  body?: any;
  isFile?: boolean;
  tags?: string[];
}

export async function customFetch(fetchParams: IFetchParams): Promise<{ data?: any, error?: string }> {
  const cookieHeader = (await cookies()).toString()

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}${fetchParams.url}`,
    {
      method: fetchParams.method,
      //credentials: 'include',
      headers: {
        ...(!fetchParams.isFile && {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }),
        ...(fetchParams?.additionnalHeaders && {
          ...fetchParams.additionnalHeaders,
        }),
        ...(cookieHeader && {
          'cookie': cookieHeader,
        })
      },
      ...(fetchParams?.body && {
        body: fetchParams?.isFile ? fetchParams.body : JSON.stringify(fetchParams.body),
      }),
      next: {
        ...(fetchParams?.tags && {
          tags: fetchParams.tags,
        })
      }
    }
  )

  // If error, we try to get the error from the API route response
  if (!res.ok) {
    try {
      const errorData = await res.json();
      return { error: errorData.error || "An error occurred" };
    } catch {
      return { error: res.statusText || "An error occurred" };
    }
  }

  // If no error, we return the data
  return { data: await res.json() }
}