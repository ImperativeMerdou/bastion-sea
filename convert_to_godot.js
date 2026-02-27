#!/usr/bin/env node
/**
 * GODTIDE Data Converter
 * Converts TypeScript story/combat/world data files to Godot-ready JSON.
 * Run: node convert_to_godot.js
 */

const fs = require('fs');
const path = require('path');

const SRC = path.join(__dirname, 'src');
const OUT = path.join(__dirname, '..', 'godtide-godot', 'resources');

// Ensure output dirs exist
const dirs = ['story', 'combat', 'world', 'systems'];
dirs.forEach(d => {
  const dir = path.join(OUT, d);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

// ============================================================================
// STORY FILES
// ============================================================================
const storyDir = path.join(SRC, 'data', 'story');
const storyFiles = fs.readdirSync(storyDir).filter(f => f.endsWith('.ts'));

console.log(`\nConverting ${storyFiles.length} story files...`);

storyFiles.forEach(file => {
  const filePath = path.join(storyDir, file);
  const content = fs.readFileSync(filePath, 'utf-8');

  // Extract the exported object/variable
  const data = extractStoryData(content, file);
  if (data) {
    const outFile = file.replace('.ts', '.json');
    const outPath = path.join(OUT, 'story', outFile);
    fs.writeFileSync(outPath, JSON.stringify(data, null, 2));
    console.log(`  ✓ ${file} -> ${outFile}`);
  } else {
    console.log(`  ✗ ${file} (could not extract data)`);
  }
});

// ============================================================================
// COMBAT FILES
// ============================================================================
console.log(`\nConverting combat files...`);

// encounters.ts
convertDataFile(
  path.join(SRC, 'data', 'combat', 'encounters.ts'),
  path.join(OUT, 'combat', 'encounters.json'),
  'combat encounters'
);

// boss_encounters.ts
convertDataFile(
  path.join(SRC, 'data', 'combat', 'boss_encounters.ts'),
  path.join(OUT, 'combat', 'boss_encounters.json'),
  'boss encounters'
);

// Player actions from combat.ts
extractPlayerActions(
  path.join(SRC, 'systems', 'combat.ts'),
  path.join(OUT, 'combat', 'player_actions.json')
);

// Dragon Fruit actions from godfruit.ts
extractDragonFruitActions(
  path.join(SRC, 'systems', 'godfruit.ts'),
  path.join(OUT, 'combat', 'dragon_fruit_actions.json')
);

// Crew assists from combat.ts
extractCrewAssists(
  path.join(SRC, 'systems', 'combat.ts'),
  path.join(OUT, 'combat', 'crew_assists.json')
);

// ============================================================================
// WORLD FILES
// ============================================================================
console.log(`\nConverting world files...`);

convertDataFile(
  path.join(SRC, 'data', 'islands.ts'),
  path.join(OUT, 'world', 'islands.json'),
  'islands'
);

convertDataFile(
  path.join(SRC, 'data', 'crew.ts'),
  path.join(OUT, 'world', 'crew.json'),
  'crew'
);

convertDataFile(
  path.join(SRC, 'data', 'mc.ts'),
  path.join(OUT, 'world', 'mc.json'),
  'MC'
);

// ============================================================================
// SYSTEMS FILES
// ============================================================================
console.log(`\nConverting systems files...`);

convertDataFile(
  path.join(SRC, 'systems', 'randomEvents.ts'),
  path.join(OUT, 'systems', 'random_events.json'),
  'random events'
);

convertDataFile(
  path.join(SRC, 'systems', 'seaTravel.ts'),
  path.join(OUT, 'systems', 'travel_events.json'),
  'travel events'
);

convertDataFile(
  path.join(SRC, 'systems', 'territory.ts'),
  path.join(OUT, 'systems', 'territory.json'),
  'territory'
);

convertDataFile(
  path.join(SRC, 'systems', 'trade.ts'),
  path.join(OUT, 'systems', 'trade.json'),
  'trade'
);

convertDataFile(
  path.join(SRC, 'systems', 'objectives.ts'),
  path.join(OUT, 'systems', 'objectives.json'),
  'objectives'
);

convertDataFile(
  path.join(SRC, 'systems', 'worldReactions.ts'),
  path.join(OUT, 'systems', 'world_reactions.json'),
  'world reactions'
);

convertDataFile(
  path.join(SRC, 'systems', 'grimoireBroadcasts.ts'),
  path.join(OUT, 'systems', 'grimoire_broadcasts.json'),
  'grimoire broadcasts'
);

convertDataFile(
  path.join(SRC, 'systems', 'dominion.ts'),
  path.join(OUT, 'systems', 'dominion.json'),
  'dominion'
);

convertDataFile(
  path.join(SRC, 'systems', 'korvaan.ts'),
  path.join(OUT, 'systems', 'korvaan.json'),
  'korvaan'
);

convertDataFile(
  path.join(SRC, 'systems', 'wardenscale.ts'),
  path.join(OUT, 'systems', 'wardenscale.json'),
  'wardenscale'
);

console.log('\n=== Conversion complete ===\n');

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

function extractStoryData(content, filename) {
  try {
    // Remove TypeScript-specific syntax
    let cleaned = content;

    // Remove imports
    cleaned = cleaned.replace(/^import\s+.*$/gm, '');

    // Remove type annotations from variable declarations
    cleaned = cleaned.replace(/:\s*(StoryScene|StoryBeat\[\]|StoryChoice\[\]|StoryEffect\[\]|CrewMember\[\])/g, '');

    // Remove 'as const' and 'satisfies' expressions
    cleaned = cleaned.replace(/\s+as\s+const/g, '');
    cleaned = cleaned.replace(/\s+satisfies\s+\w+/g, '');

    // Find the main export
    // Pattern: export const varName = { ... };
    // or: export default { ... };
    let match = cleaned.match(/export\s+(?:const|let|var)\s+\w+\s*(?::\s*\w+)?\s*=\s*(\{[\s\S]*\});?\s*$/m);
    if (!match) {
      match = cleaned.match(/export\s+default\s+(\{[\s\S]*\});?\s*$/m);
    }

    if (!match) {
      // Try to find any large object literal
      match = cleaned.match(/(?:const|let|var)\s+\w+\s*(?::\s*\w+)?\s*=\s*(\{[\s\S]*\});?\s*$/m);
    }

    if (!match) return null;

    let objStr = match[1];

    // Clean up TypeScript/JS quirks for JSON parsing
    objStr = cleanForJSON(objStr);

    // Try to parse
    try {
      return JSON.parse(objStr);
    } catch (e) {
      // Try eval as last resort (safe since it's our own source)
      try {
        return eval('(' + objStr + ')');
      } catch (e2) {
        // Try a more aggressive extraction approach
        return extractViaEval(content, filename);
      }
    }
  } catch (e) {
    console.log(`    Error extracting ${filename}: ${e.message}`);
    return null;
  }
}

function extractViaEval(content, filename) {
  try {
    // Build a minimal execution context
    let code = content;

    // Remove imports
    code = code.replace(/^import\s+.*$/gm, '');

    // Remove export keywords
    code = code.replace(/export\s+(const|let|var|default)/g, '$1');

    // Remove type annotations
    code = code.replace(/:\s*(?:StoryScene|StoryBeat|StoryChoice|StoryEffect|CrewMember|CombatEncounter|EnemyTemplate|CombatAction|ActionEffect|Island|IslandRoute|IslandNPC|GameNotification|Character|MC|Resources|TerritoryBonus|TerritoryEffect|TerritoryUpgrade|TerritoryState|RandomEvent|TravelEvent|TravelChoice|BountyPoster)(?:\[\])?\s*=/g, ' =');
    code = code.replace(/as\s+(?:const|StoryScene|any)/g, '');

    // Find variable name
    const varMatch = code.match(/(?:const|let|var)\s+(\w+)\s*=\s*\{/);
    if (!varMatch) return null;

    const varName = varMatch[1];

    // Execute and extract
    const fn = new Function(`${code}; return ${varName};`);
    return fn();
  } catch (e) {
    return null;
  }
}

function convertDataFile(inputPath, outputPath, label) {
  if (!fs.existsSync(inputPath)) {
    console.log(`  ✗ ${label} (file not found: ${inputPath})`);
    return;
  }

  const content = fs.readFileSync(inputPath, 'utf-8');

  // Try to find all exported arrays and objects
  const data = extractAllExports(content);

  if (data) {
    fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));
    console.log(`  ✓ ${label} -> ${path.basename(outputPath)}`);
  } else {
    // Write the raw content as a comment file so it can be manually converted
    fs.writeFileSync(outputPath.replace('.json', '.ts.txt'), content);
    console.log(`  ~ ${label} -> saved as .ts.txt for manual conversion`);
  }
}

function extractAllExports(content) {
  try {
    let code = content;

    // Remove imports
    code = code.replace(/^import\s+.*$/gm, '');

    // Remove export keywords
    code = code.replace(/export\s+(const|let|var|default|function|type|interface|enum)/g, '$1');

    // Remove type/interface/enum declarations
    code = code.replace(/^type\s+\w+\s*=[\s\S]*?;\s*$/gm, '');
    code = code.replace(/^interface\s+\w+\s*\{[\s\S]*?\}\s*$/gm, '');
    code = code.replace(/^enum\s+\w+\s*\{[\s\S]*?\}\s*$/gm, '');

    // Remove function declarations (keep data only)
    code = code.replace(/^(?:const|let|var)\s+\w+\s*=\s*\([^)]*\)\s*(?::\s*\w+)?\s*=>\s*\{[\s\S]*?\};\s*$/gm, '');
    code = code.replace(/^function\s+\w+[\s\S]*?\n\}\s*$/gm, '');

    // Remove type annotations
    code = code.replace(/:\s*(?:readonly\s+)?(?:\w+(?:\[\])?(?:\s*\|\s*\w+(?:\[\])?)*)\s*(?==)/g, ' ');

    // Remove 'as Type' assertions
    code = code.replace(/\s+as\s+\w+(?:\[\])?/g, '');

    // Find all const/let/var = data declarations
    const varNames = [];
    const regex = /(?:const|let|var)\s+(\w+)\s*=\s*[\[{]/g;
    let m;
    while ((m = regex.exec(code)) !== null) {
      varNames.push(m[1]);
    }

    if (varNames.length === 0) return null;

    // Try to execute and return the first meaningful data
    for (const varName of varNames) {
      try {
        const fn = new Function(`${code}; return ${varName};`);
        const result = fn();
        if (result && (Array.isArray(result) || typeof result === 'object')) {
          return result;
        }
      } catch (e) {
        continue;
      }
    }

    // If we have multiple, return them all as a combined object
    if (varNames.length > 1) {
      try {
        const returnExpr = '{' + varNames.map(v => `"${v}": ${v}`).join(', ') + '}';
        const fn = new Function(`${code}; return ${returnExpr};`);
        return fn();
      } catch (e) {
        return null;
      }
    }

    return null;
  } catch (e) {
    return null;
  }
}

function cleanForJSON(str) {
  // Remove trailing commas
  str = str.replace(/,\s*([\]}])/g, '$1');

  // Quote unquoted keys
  str = str.replace(/(\w+)\s*:/g, '"$1":');

  // Convert single quotes to double quotes (careful with apostrophes)
  str = str.replace(/'/g, '"');

  return str;
}

function extractPlayerActions(combatPath, outputPath) {
  if (!fs.existsSync(combatPath)) {
    console.log('  ✗ player actions (combat.ts not found)');
    return;
  }
  const content = fs.readFileSync(combatPath, 'utf-8');

  // Look for the KARYUDON_ACTIONS or similar array
  try {
    let code = content;
    code = code.replace(/^import\s+.*$/gm, '');
    code = code.replace(/export\s+(const|let|var)/g, '$1');
    code = code.replace(/:\s*CombatAction\[\]/g, '');
    code = code.replace(/:\s*CombatAction/g, '');
    code = code.replace(/\s+as\s+const/g, '');

    // Find the actions array variable name
    const actionsMatch = code.match(/(?:const|let|var)\s+(KARYUDON_ACTIONS|playerActions|BASE_ACTIONS|karyudonActions)\s*=\s*\[/i);
    if (actionsMatch) {
      const varName = actionsMatch[1];
      // Remove type annotations more aggressively
      code = code.replace(/:\s*(?:ActionCategory|TargetType|DamageType|CombatAnimation|ActionEffect\[\])\s*/g, ' ');
      code = code.replace(/:\s*(?:'[^']*'(?:\s*\|\s*'[^']*')*)\s*/g, ' ');

      try {
        const fn = new Function(`${code}; return ${varName};`);
        const actions = fn();
        fs.writeFileSync(outputPath, JSON.stringify(actions, null, 2));
        console.log(`  ✓ player actions -> player_actions.json`);
        return;
      } catch (e) {
        // Continue to fallback
      }
    }
    console.log('  ~ player actions -> needs manual extraction from combat.ts');
    fs.writeFileSync(outputPath.replace('.json', '.ts.txt'), '// Extract KARYUDON_ACTIONS array from combat.ts');
  } catch (e) {
    console.log(`  ✗ player actions: ${e.message}`);
  }
}

function extractDragonFruitActions(godfruitPath, outputPath) {
  if (!fs.existsSync(godfruitPath)) {
    console.log('  ✗ dragon fruit actions (godfruit.ts not found)');
    return;
  }
  const content = fs.readFileSync(godfruitPath, 'utf-8');
  try {
    let code = content;
    code = code.replace(/^import\s+.*$/gm, '');
    code = code.replace(/export\s+(const|let|var)/g, '$1');
    code = code.replace(/:\s*CombatAction\[\]/g, '');
    code = code.replace(/\s+as\s+const/g, '');
    code = code.replace(/:\s*(?:ActionCategory|TargetType|DamageType|CombatAnimation|ActionEffect\[\])\s*/g, ' ');

    const match = code.match(/(?:const|let|var)\s+(DRAGON_FRUIT_ACTIONS|dragonActions|dragonFruitActions)\s*=\s*\[/i);
    if (match) {
      const fn = new Function(`${code}; return ${match[1]};`);
      const actions = fn();
      fs.writeFileSync(outputPath, JSON.stringify(actions, null, 2));
      console.log(`  ✓ dragon fruit actions -> dragon_fruit_actions.json`);
      return;
    }
    console.log('  ~ dragon fruit actions -> needs manual extraction');
  } catch (e) {
    console.log(`  ✗ dragon fruit actions: ${e.message}`);
  }
}

function extractCrewAssists(combatPath, outputPath) {
  if (!fs.existsSync(combatPath)) {
    console.log('  ✗ crew assists (combat.ts not found)');
    return;
  }
  const content = fs.readFileSync(combatPath, 'utf-8');
  try {
    let code = content;
    code = code.replace(/^import\s+.*$/gm, '');
    code = code.replace(/export\s+(const|let|var)/g, '$1');
    code = code.replace(/\s+as\s+const/g, '');
    code = code.replace(/:\s*(?:ActionCategory|TargetType|DamageType|CombatAnimation|ActionEffect\[\]|Record<string,\s*CombatAction\[\]>)\s*/g, ' ');

    const match = code.match(/(?:const|let|var)\s+(CREW_ASSISTS|crewAssists|CREW_ASSIST_ACTIONS)\s*=\s*\{/i);
    if (match) {
      const fn = new Function(`${code}; return ${match[1]};`);
      const assists = fn();
      fs.writeFileSync(outputPath, JSON.stringify(assists, null, 2));
      console.log(`  ✓ crew assists -> crew_assists.json`);
      return;
    }
    console.log('  ~ crew assists -> needs manual extraction');
  } catch (e) {
    console.log(`  ✗ crew assists: ${e.message}`);
  }
}
