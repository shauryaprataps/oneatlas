import { matchTemplate } from "./templateMatcher";
import { runtimeTemplates } from "../templates";

function run() {
  // eslint-disable-next-line no-console
  console.log("=== Template Matcher Debug ===\n");

  // Show all templates and their tags
  // eslint-disable-next-line no-console
  console.log("Templates loaded:");
  for (const tpl of runtimeTemplates) {
    // eslint-disable-next-line no-console
    console.log(`  ${tpl.name}: [${tpl.tags.join(", ")}]`);
  }
  // eslint-disable-next-line no-console
  console.log();

  const prompts = [
    "Build CRM dashboard",
    "Build HR dashboard",
    "Build inventory system",
    "Build analytics workspace",
    "Build admin panel",
  ];

  for (const prompt of prompts) {
    // eslint-disable-next-line no-console
    console.log(`\nPrompt: "${prompt}"`);

    // Show scores for each template
    const promptTokens = prompt.toLowerCase().replace(/[^a-z0-9\s-]/g, " ").split(/\s+/g).filter(Boolean);
    // eslint-disable-next-line no-console
    console.log(`  Tokens: [${promptTokens.join(", ")}]`);

    for (const tpl of runtimeTemplates) {
      const res = matchTemplate({
        prompt,
        templates: [tpl],
        threshold: 0, // Always match to see score
      });

      if (res.matched) {
        // eslint-disable-next-line no-console
        console.log(`  ${tpl.name}: score=${res.confidence / 10} (matched)`);
      } else {
        // eslint-disable-next-line no-console
        console.log(`  ${tpl.name}: score=${res.confidence / 10} (below threshold)`);
      }
    }

    // Now show the actual match result
    const result = matchTemplate({
      prompt,
      templates: runtimeTemplates,
      threshold: 2,
    });

    if (result.matched) {
      // eslint-disable-next-line no-console
      console.log(`  → MATCHED: ${result.template.name} (confidence: ${result.confidence})`);
    } else {
      // eslint-disable-next-line no-console
      console.log(`  → NO MATCH (best score: ${result.confidence})`);
    }
  }
}

run();