import fs from "fs";

const CF_API = "https://api.cloudflare.com/client/v4";
const TOKEN = process.env.CF_API_TOKEN;
const ZONE = process.env.CF_ZONE_ID;
const DOMAIN = "is-an-ai.dev";

const headers = {
  Authorization: `Bearer ${TOKEN}`,
  "Content-Type": "application/json"
};

const ALLOWED_TYPES = ["A", "AAAA", "CNAME", "MX", "TXT"];

async function getExisting() {
  const res = await fetch(`${CF_API}/zones/${ZONE}/dns_records`, { headers });
  const json = await res.json();
  return json.result;
}

function validateName(name) {
  if (name.includes("*")) throw new Error(`Wildcard not allowed: ${name}`);
  if (name === "@") throw new Error(`Root not allowed`);
  if (name.includes(DOMAIN)) throw new Error(`Full domain not allowed: ${name}`);
}

function buildPayload(record) {
  if (!ALLOWED_TYPES.includes(record.type)) {
    throw new Error(`Unsupported record type: ${record.type}`);
  }

  validateName(record.name);

  const payload = {
    type: record.type,
    name: `${record.name}.${DOMAIN}`,
    content: record.value,
    ttl: 1
  };

  // ---- explicit per-record handling ----

  if (record.type === "A" || record.type === "AAAA") {
    payload.proxied = record.proxied ?? false;
  }

  else if (record.type === "CNAME") {
    payload.proxied = record.proxied ?? false;
  }

  else if (record.type === "MX") {
    payload.priority = record.priority ?? 10;
    payload.proxied = false;
  }

  else if (record.type === "TXT") {
    payload.proxied = false;
  }

  return payload;
}

async function upsert(payload, existing) {
  const found = existing.find(
    r => r.type === payload.type && r.name === payload.name
  );

  const url = found
    ? `${CF_API}/zones/${ZONE}/dns_records/${found.id}`
    : `${CF_API}/zones/${ZONE}/dns_records`;

  const method = found ? "PUT" : "POST";

  console.log(`${found ? "Updating" : "Creating"} ${payload.type} ${payload.name}`);

  const res = await fetch(url, {
    method,
    headers,
    body: JSON.stringify(payload)
  });

  if (!res.ok) {
    throw new Error(await res.text());
  }
}

(async () => {
  const files = fs.readFileSync(process.argv[2], "utf8")
    .split("\n")
    .filter(Boolean);

  const existing = await getExisting();

  for (const file of files) {
    const data = JSON.parse(fs.readFileSync(file, "utf8"));

    // user section intentionally ignored
    for (const record of data.records) {
      const payload = buildPayload(record);
      await upsert(payload, existing);
    }
  }
})();
