import { assert } from "asserts";
import { isValidUrl } from "../../src/url/is_valid_url.ts";

Deno.test("Invalid URL", () => {
  assert(!isValidUrl("a"));
  assert(!isValidUrl(""));
});

Deno.test("Valid URL", () => {
  assert(isValidUrl("http://9sako6.com"));
  assert(isValidUrl("http://9sako6.com?foo=bar"));
});
