import { isValidUrl } from "../url/is_valid_url.ts";

const MissingQuestResponse = new Response(
  JSON.stringify({
    title: "Query parameter `quest` is missing.",
  }),
  {
    status: 400,
    headers: {
      "content-type": "application/problem+json",
    },
  },
);

const InvalidQuestResponse = new Response(
  JSON.stringify({
    title: "Invalid URL.",
  }),
  {
    status: 400,
    headers: {
      "content-type": "application/problem+json",
    },
  },
);

const InvalidMethodResponse = new Response(
  JSON.stringify({
    title: "Only GET method is allowd.",
  }),
  {
    status: 403,
    headers: {
      "content-type": "application/problem+json",
    },
  },
);

const InvalidContentTypeResponse = new Response(
  JSON.stringify({
    title: "Response specified by URL must return HTML.",
  }),
  {
    status: 403,
    headers: {
      "content-type": "application/problem+json",
    },
  },
);

export const handler = async (req: Request) => {
  const url = (new URL(req.url)).searchParams.get("quest");

  if (!url) {
    return MissingQuestResponse;
  } else if (!isValidUrl(url)) {
    return InvalidQuestResponse;
  } else if (req.method !== "GET") {
    return InvalidMethodResponse;
  }

  const res = await fetch(url);
  const contentType = res.headers.get("content-type");

  if (!contentType || !contentType.match("text/html")) {
    return InvalidContentTypeResponse;
  }

  const html = await res.text();

  return new Response(html, {
    status: res.status,
    headers: {
      ...res.headers,
      "access-control-allow-origin": "*",
    },
  });
};
