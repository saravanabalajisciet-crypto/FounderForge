import { GoogleGenAI } from '@google/genai';
import type {
  Blueprint,
  Architecture,
  Database,
  ApiGroup,
  Persona,
  ImprovementSuggestion,
  FutureSnapshot,
  InspirationAnalysis,
} from '@/types';

function getClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error('GEMINI_API_KEY is not set');
  return new GoogleGenAI({ apiKey });
}

export async function generateJSON<T>(prompt: string, systemContext?: string): Promise<T> {
  const ai = getClient();

  const fullPrompt = `${systemContext || SYSTEM_CONTEXT}

${prompt}

IMPORTANT: Respond ONLY with valid JSON matching the exact structure requested. No markdown code blocks, no explanation, no \`\`\`json tags — just the raw JSON object or array.`;

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: fullPrompt,
  });

  const text = response.text ?? '';

  // Strip any markdown code fences if present
  let cleaned = text
    .replace(/^```(?:json)?\s*/i, '')
    .replace(/\s*```\s*$/i, '')
    .trim();

  // Try to find valid JSON - look for object or array
  let jsonStart = -1;
  let jsonEnd = -1;
  
  // Find first { or [
  for (let i = 0; i < cleaned.length; i++) {
    if (cleaned[i] === '{' || cleaned[i] === '[') {
      jsonStart = i;
      break;
    }
  }
  
  if (jsonStart === -1) {
    throw new Error(`No JSON found in response: ${text.slice(0, 200)}`);
  }
  
  // Find matching closing brace/bracket
  let depth = 0;
  const isArray = cleaned[jsonStart] === '[';
  const openChar = isArray ? '[' : '{';
  const closeChar = isArray ? ']' : '}';
  
  for (let i = jsonStart; i < cleaned.length; i++) {
    if (cleaned[i] === openChar) depth++;
    else if (cleaned[i] === closeChar) depth--;
    
    if (depth === 0) {
      jsonEnd = i;
      break;
    }
  }
  
  if (jsonEnd === -1) {
    throw new Error(`Incomplete JSON in response: ${text.slice(0, 200)}`);
  }
  
  const jsonStr = cleaned.slice(jsonStart, jsonEnd + 1);
  
  try {
    return JSON.parse(jsonStr) as T;
  } catch (parseError) {
    throw new Error(`Invalid JSON: ${parseError instanceof Error ? parseError.message : 'Parse failed'} - Content: ${jsonStr.slice(0, 200)}`);
  }
}

const SYSTEM_CONTEXT = `You are FounderForge AI – an expert AI Product Manager, Solutions Architect, and User Research specialist.
You help founders and builders create detailed, realistic, and actionable product plans.
Always generate comprehensive, production-quality responses with real technical depth.`;

// ─── Blueprint Generation ──────────────────────────────────────────────────────
export async function generateBlueprint(idea: string): Promise<Blueprint> {
  return generateJSON<Blueprint>(
    `Generate a detailed product blueprint for: "${idea}"

Return JSON with this exact structure:
{
  "problemStatement": "clear problem being solved (2-3 sentences)",
  "targetAudience": "primary user segments description",
  "coreFeatures": ["feature 1", "feature 2", "feature 3", "feature 4", "feature 5", "feature 6", "feature 7", "feature 8"],
  "mvpFeatures": ["mvp feature 1", "mvp feature 2", "mvp feature 3", "mvp feature 4", "mvp feature 5"],
  "techStack": ["React/Next.js", "Node.js/Express", "PostgreSQL", "Redis", "AWS S3"],
  "uniqueValue": "what makes this unique vs competitors (2-3 sentences)"
}`,
    SYSTEM_CONTEXT
  );
}

// ─── Architecture Generation ──────────────────────────────────────────────────
export async function generateArchitecture(idea: string, blueprint: Blueprint): Promise<Architecture> {
  return generateJSON<Architecture>(
    `Generate a system architecture for: "${idea}"
Core features: ${blueprint.coreFeatures.slice(0, 5).join(', ')}

Return JSON with this exact structure:
{
  "description": "overall architecture description",
  "nodes": [
    {"id": "users", "label": "End Users", "type": "user", "description": "Web and mobile users", "technologies": ["Web Browser", "Mobile App"]},
    {"id": "frontend", "label": "Frontend Layer", "type": "frontend", "description": "React SPA with SSR", "technologies": ["Next.js", "React", "TailwindCSS"]},
    {"id": "api_gateway", "label": "API Gateway", "type": "service", "description": "Rate limiting and routing", "technologies": ["NGINX", "Rate Limiting"]},
    {"id": "backend", "label": "Backend API", "type": "backend", "description": "Core business logic", "technologies": ["Node.js", "Express", "REST"]},
    {"id": "auth", "label": "Auth Service", "type": "service", "description": "Authentication and authorization", "technologies": ["JWT", "OAuth2"]},
    {"id": "database", "label": "Primary Database", "type": "database", "description": "Persistent data store", "technologies": ["PostgreSQL"]},
    {"id": "cache", "label": "Cache Layer", "type": "database", "description": "In-memory caching", "technologies": ["Redis"]},
    {"id": "storage", "label": "File Storage", "type": "external", "description": "Media and file storage", "technologies": ["AWS S3", "Cloudinary"]}
  ],
  "edges": [
    {"from": "users", "to": "frontend", "label": "HTTPS"},
    {"from": "frontend", "to": "api_gateway", "label": "REST API"},
    {"from": "api_gateway", "to": "backend", "label": "Routes"},
    {"from": "api_gateway", "to": "auth", "label": "Auth Check"},
    {"from": "backend", "to": "database", "label": "SQL"},
    {"from": "backend", "to": "cache", "label": "Cache"},
    {"from": "backend", "to": "storage", "label": "Files"}
  ]
}`,
    SYSTEM_CONTEXT
  );
}

// ─── Database Generation ──────────────────────────────────────────────────────
export async function generateDatabase(idea: string, blueprint: Blueprint): Promise<Database> {
  return generateJSON<Database>(
    `Generate a database schema for: "${idea}"
Core features: ${blueprint.coreFeatures.join(', ')}

Return JSON with this exact structure:
{
  "dbType": "PostgreSQL",
  "description": "database design overview",
  "tables": [
    {
      "name": "users",
      "description": "Stores user accounts and profiles",
      "fields": [
        {"name": "id", "type": "UUID", "constraints": "PRIMARY KEY DEFAULT uuid_generate_v4()"},
        {"name": "email", "type": "VARCHAR(255)", "constraints": "UNIQUE NOT NULL"},
        {"name": "name", "type": "VARCHAR(100)", "constraints": "NOT NULL"},
        {"name": "created_at", "type": "TIMESTAMP", "constraints": "DEFAULT NOW()"}
      ],
      "relationships": ["has_many: sessions", "has_many: bookings"]
    }
  ]
}

Generate 5-7 relevant tables for the product.`,
    SYSTEM_CONTEXT
  );
}

// ─── API Generation ───────────────────────────────────────────────────────────
export async function generateAPI(idea: string, blueprint: Blueprint): Promise<ApiGroup[]> {
  return generateJSON<ApiGroup[]>(
    `Generate REST API endpoints for: "${idea}"
Core features: ${blueprint.coreFeatures.join(', ')}

Return a JSON array with this exact structure:
[
  {
    "group": "Authentication",
    "endpoints": [
      {
        "method": "POST",
        "path": "/api/auth/register",
        "description": "Register a new user",
        "requestBody": "{ email, password, name }",
        "responseExample": "{ user: {...}, token: '...' }",
        "auth": false
      }
    ]
  }
]

Generate 4-6 groups with 3-5 endpoints each. Methods must be exactly: GET, POST, PUT, DELETE, or PATCH.`,
    SYSTEM_CONTEXT
  );
}

// ─── Persona Generation ───────────────────────────────────────────────────────
export async function generatePersonas(idea: string, blueprint: Blueprint): Promise<Persona[]> {
  return generateJSON<Persona[]>(
    `Generate 4 realistic user personas for: "${idea}"
Target audience: ${blueprint.targetAudience}

Return a JSON array with this exact structure:
[
  {
    "name": "Alex Chen",
    "role": "College Student",
    "age": 21,
    "bio": "Junior CS student who travels every semester break on a tight budget",
    "avatar": "👨‍🎓",
    "positiveFeedback": ["Love the budget tracker", "Easy to split expenses", "Smart packing suggestions"],
    "negativeFeedback": ["Onboarding is confusing", "Too many features upfront"],
    "missingFeatures": ["Group trip coordination", "Visa requirement checker"],
    "suggestions": ["Add a trip cost estimator", "Integrate with student ID for discounts"],
    "rating": 4
  }
]

Make personas diverse, realistic, and specific to the product. Rating should be 2-5.`,
    SYSTEM_CONTEXT
  );
}

// ─── Improvement Generation ───────────────────────────────────────────────────
export async function generateImprovement(
  idea: string,
  blueprint: Blueprint,
  personas: Persona[]
): Promise<ImprovementSuggestion> {
  const feedbackSummary = personas.map(p =>
    `${p.role}: likes "${p.positiveFeedback[0]}", dislikes "${p.negativeFeedback[0]}", wants "${p.missingFeatures[0]}"`
  ).join('\n');

  return generateJSON<ImprovementSuggestion>(
    `Analyze user feedback and generate improvements for: "${idea}"

User Feedback:
${feedbackSummary}

Original MVP: ${blueprint.mvpFeatures.join(', ')}

Return JSON with this exact structure:
{
  "toRemove": [
    {"feature": "feature name", "reason": "why remove"},
    {"feature": "feature name", "reason": "why remove"}
  ],
  "toImprove": [
    {"feature": "feature name", "improvement": "how to improve"},
    {"feature": "feature name", "improvement": "how to improve"},
    {"feature": "feature name", "improvement": "how to improve"}
  ],
  "toAdd": [
    {"feature": "new feature", "reason": "why add"},
    {"feature": "new feature", "reason": "why add"},
    {"feature": "new feature", "reason": "why add"}
  ],
  "optimizedMvp": ["feature 1", "feature 2", "feature 3", "feature 4", "feature 5", "feature 6"],
  "originalBlueprint": ${JSON.stringify(blueprint)},
  "improvedBlueprint": {
    "problemStatement": "refined problem statement based on feedback",
    "targetAudience": "refined target audience",
    "coreFeatures": ["improved feature 1", "improved feature 2", "improved feature 3", "improved feature 4", "improved feature 5", "improved feature 6"],
    "mvpFeatures": ["optimized mvp 1", "optimized mvp 2", "optimized mvp 3", "optimized mvp 4"],
    "techStack": ${JSON.stringify(blueprint.techStack)},
    "uniqueValue": "improved unique value proposition based on user feedback"
  }
}`,
    SYSTEM_CONTEXT
  );
}

// ─── Future Snapshot Generation ───────────────────────────────────────────────
export async function generateFutureSnapshot(
  idea: string,
  improvedBlueprint: Blueprint
): Promise<FutureSnapshot> {
  return generateJSON<FutureSnapshot>(
    `Generate a future product visualization for: "${idea}"
Features: ${improvedBlueprint.coreFeatures.join(', ')}

Return JSON with this exact structure:
{
  "appName": "catchy app name",
  "tagline": "compelling one-liner tagline",
  "colorScheme": "describe color palette e.g. Deep indigo primary with coral accents",
  "navigationStructure": ["Home", "Explore", "Plan", "Community", "Profile"],
  "keyWidgets": ["widget 1 description", "widget 2 description", "widget 3 description", "widget 4 description"],
  "designPrinciples": ["principle 1", "principle 2", "principle 3"],
  "screens": [
    {
      "name": "Home Dashboard",
      "description": "Main landing screen with personalized content",
      "layout": "Card-based grid with hero section and quick actions",
      "components": ["Hero Banner", "Quick Action Bar", "Recent Activity Feed", "Featured Content Grid", "Bottom Navigation"]
    },
    {
      "name": "Discovery / Explore",
      "description": "Browse and search core content",
      "layout": "Search bar with category filters and content list",
      "components": ["Search Bar", "Filter Chips", "Content Cards", "Map View Toggle", "Sort Options"]
    },
    {
      "name": "Create / Plan",
      "description": "Core creation or planning workflow",
      "layout": "Step-by-step wizard with progress indicator",
      "components": ["Progress Stepper", "Input Forms", "AI Suggestions Panel", "Preview Card", "Action Buttons"]
    },
    {
      "name": "Detail View",
      "description": "Detailed view of a specific item",
      "layout": "Hero image with scrollable content sections",
      "components": ["Hero Image", "Info Cards", "Action Buttons", "Related Items", "Reviews"]
    },
    {
      "name": "Profile & Settings",
      "description": "User profile and app settings",
      "layout": "Profile header with settings list",
      "components": ["Avatar & Stats", "Recent Activity", "Preferences", "Achievements", "Account Settings"]
    }
  ]
}`,
    SYSTEM_CONTEXT
  );
}

// ─── Inspiration Analysis ─────────────────────────────────────────────────────
export async function analyzeInspirationImage(
  base64Image: string,
  mimeType: string
): Promise<InspirationAnalysis> {
  const ai = getClient();

  const prompt = `Analyze this app screenshot and extract detailed product information.

Return ONLY valid JSON with this exact structure (no markdown, no code blocks):
{
  "appCategory": "e.g. Food Delivery, Social Media, E-commerce",
  "productPurpose": "what the app does and its main value proposition",
  "coreFeatures": ["feature 1", "feature 2", "feature 3", "feature 4", "feature 5", "feature 6"],
  "userFlow": ["step 1", "step 2", "step 3", "step 4", "step 5"],
  "databaseStructure": ["Table: Users (id, name, email)", "Table: Products (id, name, price)"],
  "backendArchitecture": ["REST API with Node.js", "PostgreSQL database", "Redis caching"],
  "monetizationModel": ["model 1", "model 2", "model 3"]
}`;

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-lite',
    contents: [
      {
        role: 'user',
        parts: [
          { text: prompt },
          { inlineData: { mimeType, data: base64Image } },
        ],
      },
    ],
  });

  const text = response.text ?? '';
  const cleaned = text
    .replace(/^```(?:json)?\s*/i, '')
    .replace(/\s*```\s*$/i, '')
    .trim();

  const jsonMatch = cleaned.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error('No JSON in image analysis response');

  return JSON.parse(jsonMatch[0]) as InspirationAnalysis;
}

// ─── Inspired Blueprint Generation ───────────────────────────────────────────
export async function generateInspiredBlueprint(
  analysis: InspirationAnalysis,
  customPrompt: string
): Promise<Blueprint> {
  return generateJSON<Blueprint>(
    `Based on this app analysis and custom requirement, generate a new product blueprint.

Analyzed App: ${analysis.appCategory}
Core Features Found: ${analysis.coreFeatures.join(', ')}
Custom Requirement: "${customPrompt}"

Return JSON with this exact structure:
{
  "problemStatement": "specific problem this niche version solves",
  "targetAudience": "specific target users for this niche",
  "coreFeatures": ["feature 1", "feature 2", "feature 3", "feature 4", "feature 5", "feature 6", "feature 7"],
  "mvpFeatures": ["mvp feature 1", "mvp feature 2", "mvp feature 3", "mvp feature 4"],
  "techStack": ["technology 1", "technology 2", "technology 3", "technology 4", "technology 5"],
  "uniqueValue": "what makes this niche version better than the original"
}`,
    SYSTEM_CONTEXT
  );
}
