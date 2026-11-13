const { startServer } = require('../backend/app');
const { encryptPayload, decryptPayload } = require('../backend/crypto');

const IMAGE_RE = /\.(png|jpe?g|gif|webp|svg)(\?|$)/i;
const IMAGE_HINT_KEYS = new Set([
  'img','image','imgpath','imagepath','image_path','imgurl','img_url','icon','thumb','thumbnail','banner','logo','slug'
]);

function normalizeUrlLike(value) {
  const v = String(value || '').trim();
  if (!v) return '';
  if (IMAGE_RE.test(v)) return v;
  if (/^[\w./-]+$/.test(v) && (v.includes('code_') || v.includes('provider') || v.includes('poster'))) return v;
  return '';
}

function collectImageStrings(node, out = new Set(), keyHint = '') {
  if (Array.isArray(node)) {
    for (const item of node) collectImageStrings(item, out, keyHint);
    return out;
  }
  if (!node || typeof node !== 'object') {
    if (typeof node === 'string' && keyHint) {
      const maybe = normalizeUrlLike(node);
      if (maybe) out.add(maybe);
    }
    return out;
  }

  for (const [k, v] of Object.entries(node)) {
    const hint = IMAGE_HINT_KEYS.has(String(k).toLowerCase());
    if (typeof v === 'string') {
      const maybe = hint ? normalizeUrlLike(v) : IMAGE_RE.test(v) ? v : '';
      if (maybe) out.add(maybe);
    } else if (v && typeof v === 'object') {
      collectImageStrings(v, out, hint ? k : '');
    }
  }
  return out;
}

async function callApi(pathname, payload = {}) {
  const body = new URLSearchParams({ data: encryptPayload(payload) }).toString();
  const res = await fetch(`http://127.0.0.1:3000${pathname}`, {
    method: 'POST',
    headers: {
      'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'x-requested-with': 'XMLHttpRequest'
    },
    body
  });
  const json = await res.json().catch(() => ({}));
  if (json && typeof json.data === 'string') {
    try { return decryptPayload(json.data); } catch { return json; }
  }
  return json;
}

function toLocalUrl(raw) {
  if (!raw) return '';
  if (/^https?:\/\//i.test(raw)) {
    try {
      const u = new URL(raw);
      return `/${u.hostname}${u.pathname}${u.search || ''}`;
    } catch {
      return '';
    }
  }
  if (raw.startsWith('//')) {
    try {
      const u = new URL(`https:${raw}`);
      return `/${u.hostname}${u.pathname}${u.search || ''}`;
    } catch {
      return '';
    }
  }
  if (raw.startsWith('/')) return raw;

  // Likely API games relative paths
  if (/^code_.*\.(png|jpe?g|gif|webp|svg)$/i.test(raw)) return `/api2b.pro/provider/${raw}`;
  if (/^(provider|poster|storage)\//i.test(raw)) return `/api2b.pro/${raw}`;
  if (/\.(png|jpe?g|gif|webp|svg)$/i.test(raw)) return `/api2b.pro/provider/${raw}`;

  return '';
}

(async () => {
  const server = startServer();
  const targets = [
    ['/api/front/casino/tablelist', { gmid: '35', type: 'lc' }],
    ['/api/front/casino/tablelist', { gmid: '36', type: 'lc' }],
    ['/api/front/casino/tablelist', { gmid: '37', type: 'lc' }],
    ['/api/front/casino/tablelist', { gmid: '45', type: 'vc' }],
    ['/api/front/casino/tablelist', { gmid: '55', type: 'slot' }],
    ['/api/front/casino/tablelist', { gmid: '56', type: 'slot' }],
    ['/api/front/casino/tablelist', { gmid: '65', type: 'xgame' }],
    ['/api/front/casino/tablelist', { gmid: '66', type: 'xgame' }],
    ['/api/front/get_casino_table_list', { gmid: '55', type: 'slot' }],
    ['/api/front/casino/slotlist', {}],
    ['/api/front/slot_list_open', {}],
    ['/api/front/casino/other', {}],
    ['/api/front/other_open', {}],
    ['/api/front/casino/data2?type=slot', { type: 'slot' }],
    ['/api/front/casino/data2?type=lc', { type: 'lc' }],
    ['/api/front/vcasino/data2?type=slot', { type: 'slot' }],
    ['/api/front/casino/data2?type=xgame', { type: 'xgame' }]
  ];

  const allImages = new Set();
  const perEndpoint = [];

  try {
    for (const [path, payload] of targets) {
      const data = await callApi(path, payload);
      const found = Array.from(collectImageStrings(data));
      for (const f of found) allImages.add(f);
      perEndpoint.push({ path, count: found.length });
    }

    console.log('ENDPOINT_IMAGE_COUNTS');
    for (const row of perEndpoint) {
      console.log(`${row.path} => ${row.count}`);
    }

    const localUrls = Array.from(allImages).map((raw) => ({ raw, url: toLocalUrl(raw) }));
    const unresolved = localUrls.filter((x) => !x.url);

    const checks = [];
    for (const entry of localUrls) {
      if (!entry.url) continue;
      try {
        const res = await fetch(`http://127.0.0.1:3000${entry.url}`, { method: 'GET' });
        checks.push({ ...entry, status: res.status });
      } catch {
        checks.push({ ...entry, status: 0 });
      }
    }

    const bad = checks.filter((x) => x.status >= 400 || x.status === 0);

    console.log('TOTAL_IMAGE_STRINGS=' + allImages.size);
    console.log('UNRESOLVED_IMAGE_STRINGS=' + unresolved.length);
    unresolved.slice(0, 200).forEach((x) => console.log('UNRESOLVED ' + x.raw));
    console.log('BAD_LOCAL_IMAGE_URLS=' + bad.length);
    bad.slice(0, 500).forEach((x) => console.log(`BAD ${x.status} ${x.url} <= ${x.raw}`));

  } finally {
    await new Promise((resolve) => server.close(resolve));
  }
})();
