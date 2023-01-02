# cors-proxy-server

[![CI](https://github.com/9sako6/cors-proxy-server/actions/workflows/ci.yml/badge.svg)](https://github.com/9sako6/cors-proxy-server/actions/workflows/ci.yml)

This is a proxy which adds CORS headers to the proxied request.

Because there is a limit to the number of requests that can be processed per
day, **I recommend that you fork the repository and host it yourself with Deno
deploy.**

Furthermore, the server may be shut down without notice.

## Limitation

Now cors-proxy-server is hosted on [Deno Deploy](https://deno.com/deploy) free
plan.

The limitation is 100,000 requests per day.

## Usage

Specify the URL you wish to request in the `quest` query parameter.

Then, cors-proxy-server a returns response with
`access-control-allow-origin": *` header.

```text
https://9sako6-cors-proxy-server.deno.dev?quest=<URL>
```

Notes:

- Only GET method is allowed
- Response specified by URL must return HTML

Request examples:

- `https://9sako6-cors-proxy-server.deno.dev?quest=https://www.google.com`
- `https://9sako6-cors-proxy-server.deno.dev?quest=https://github.com`

### Docker Image

A Docker image is available to start the server. The server runs on
`http://localhost:8000/` by the following command.

```bash
docker run -p 8000:8000 ghcr.io/9sako6/cors-proxy-server:latest
```

To authenticate to the Container registry (`ghcr.io`), please see the following
documentation.

[Authenticating to the Container registry - GitHub Docs](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry#authenticating-to-the-container-registry)
