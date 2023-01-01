import { handler } from "../../src/handler/handler.ts";
import { assertEquals } from "asserts";
import { assertSpyCallArgs, assertSpyCalls, stub } from "mock";

Deno.test('Return HTML with "access-control-allow-origin: *"', async () => {
  const testQuestUrl = "https://9sako6.test";
  const req = new Request(`http://localhost:4444?quest=${testQuestUrl}`);
  const _fetch = fetch;
  const fetchStub = stub(globalThis, "fetch", () => {
    return Promise.resolve(
      new Response("<h1>Test</h1>", {
        headers: {
          "content-type": "text/html; charset=utf-8",
        },
      }),
    );
  });

  const res = await handler(req);

  // Clear stub.
  globalThis.fetch = _fetch;
  // `fetch` was called with `testQuestUrl` arg.
  assertSpyCallArgs(fetchStub, 0, [testQuestUrl]);
  // `fetch` was called once.
  assertSpyCalls(fetchStub, 1);

  assertEquals(res.status, 200);
  assertEquals(await res.text(), "<h1>Test</h1>");
  assertEquals(res.headers.get("access-control-allow-origin"), "*");
});

Deno.test("Return 400 if the quest param is missing", async () => {
  const req = new Request("http://localhost:4444");
  const res = await handler(req);

  assertEquals(res.status, 400);
  assertEquals(await res.json(), {
    title: "Query parameter `quest` is missing.",
  });
  assertEquals(res.headers.get("content-type"), "application/problem+json");
});

Deno.test("Return 400 if the quest param has invalid URL", async () => {
  const req = new Request("http://localhost:4444?quest=invalid");
  const res = await handler(req);

  assertEquals(res.status, 400);
  assertEquals(await res.json(), {
    title: "Invalid URL.",
  });
  assertEquals(res.headers.get("content-type"), "application/problem+json");
});

Deno.test("Return 400 if the request method is not GET", async () => {
  const testQuestUrl = "https://9sako6.test";
  const req = new Request(`http://localhost:4444?quest=${testQuestUrl}`, {
    method: "POST",
  });
  const res = await handler(req);

  assertEquals(res.status, 403);
  assertEquals(await res.json(), {
    title: "Only GET method is allowed.",
  });
  assertEquals(res.headers.get("content-type"), "application/problem+json");
});

Deno.test("Response specified by URL must return HTML", async () => {
  const testQuestUrl = "https://9sako6.test";
  const req = new Request(`http://localhost:4444?quest=${testQuestUrl}`);
  const _fetch = fetch;
  const fetchStub = stub(globalThis, "fetch", () => {
    return Promise.resolve(
      new Response(JSON.stringify({ message: "hello" }), {
        headers: {
          "content-type": "application/json",
        },
      }),
    );
  });
  const res = await handler(req);

  // Clear stub.
  globalThis.fetch = _fetch;
  // `fetch` was called with `testQuestUrl` arg.
  assertSpyCallArgs(fetchStub, 0, [testQuestUrl]);
  // `fetch` was called once.
  assertSpyCalls(fetchStub, 1);

  assertEquals(res.status, 403);
  assertEquals(await res.json(), {
    title: "Response specified by URL must return HTML.",
  });
  assertEquals(res.headers.get("content-type"), "application/problem+json");
});
