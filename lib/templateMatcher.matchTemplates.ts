import { matchTemplate } from "./templateMatcher";
import { runtimeTemplates } from "@/templates";

export function matchRuntimeTemplateFromPrompt(prompt: string) {
  return matchTemplate({ prompt, templates: runtimeTemplates, threshold: 2 });
}

