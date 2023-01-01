import { serve } from "server";
import { handler } from "./src/handler/handler.ts";

serve(handler);
