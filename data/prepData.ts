import { PrepQuestion, MockSessionQuestion } from '@/types';

export const PREP_QUESTIONS: PrepQuestion[] = [
  // --- FRONTEND TRACK ---
  {
    id: 'fe-1',
    track: 'frontend',
    title: 'Explain React Server Components (RSC) vs Client Components and Server-Side Rendering (SSR)',
    difficulty: 'Medium',
    category: 'React & Architecture',
    companies: ['Vercel', 'Meta', 'Airbnb', 'Netflix'],
    estimatedMinutes: 15,
    description: 'Candidates often confuse SSR with RSC. Clearly delineate how React Server Components differ from traditional Server-Side Rendering (SSR), how data serialization across the network boundary works, and how bundle sizes are affected.',
    hint: 'Focus on code execution environment, hydration cost, and the JSON-like RSC payload format transmitted to the browser.',
    codeSnippet: `// Server Component (Default in Next.js App Router)
// Never shipped to client bundle, can query DB directly!
export default async function DashboardPage() {
  const data = await db.query('SELECT * FROM metrics');
  return (
    <div className="dashboard">
      <h1>Metrics</h1>
      <ClientInteractiveChart data={data} />
    </div>
  );
}

// Client Component
'use client';
import { useState } from 'react';

export function ClientInteractiveChart({ data }: { data: any[] }) {
  const [zoom, setZoom] = useState(1);
  return <div onClick={() => setZoom(z => z + 1)}>Zoom: {zoom}</div>;
}`,
    solution: `1. Traditional SSR (Server-Side Rendering):
- HTML is generated on the server for initial paint, but the full JavaScript code for all components is still downloaded and executed on the client during hydration.
- Hydration attaches event handlers to pre-rendered HTML DOM nodes.

2. React Server Components (RSC):
- Execute ONLY on the server. Their JavaScript code and dependencies (e.g. heavy markdown parsers, Prisma, date libraries) NEVER get sent to the client bundle.
- The server produces an RSC Wire Format (a serialized virtual DOM stream), not raw HTML alone.
- When an RSC re-renders, it preserves client-side state without destroying DOM or remounting client components.

3. The Boundary ('use client'):
- Marks the entry point where React code enters the browser bundle.
- Props passed from Server to Client Components must be serializable across the wire.`,
    keyTakeaways: [
      'RSC results in zero-bundle-size impact for server-only dependencies.',
      'SSR is a rendering lifecycle strategy; RSC is a component model distinction.',
      'Client components can be nested inside server components as children without forcing server components to become client code.',
    ],
  },
  {
    id: 'fe-2',
    track: 'frontend',
    title: 'Implement an Efficient Custom Virtualized List in React for 100,000 Items',
    difficulty: 'Hard',
    category: 'Performance & Algorithms',
    companies: ['Figma', 'Google', 'Meta', 'Linear'],
    estimatedMinutes: 25,
    description: 'Rendering 100,000 DOM elements causes massive DOM bloat and drops frame rates to single digits. Explain and implement the windowing/virtualization algorithm: calculating start/end indices based on scroll offset, item height, and viewport height.',
    hint: 'Only render the items that fit inside viewportHeight + overscan buffer. Use CSS transform: translateY or padding spacer to keep the scrollbar accurate.',
    codeSnippet: `function VirtualizedList<T>({
  items,
  itemHeight,
  windowHeight,
  renderItem,
}: {
  items: T[];
  itemHeight: number;
  windowHeight: number;
  renderItem: (item: T, index: number) => React.ReactNode;
}) {
  const [scrollTop, setScrollTop] = useState(0);

  const totalHeight = items.length * itemHeight;
  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - 2); // 2 overscan
  const endIndex = Math.min(
    items.length - 1,
    Math.floor((scrollTop + windowHeight) / itemHeight) + 2
  );

  const visibleItems = items.slice(startIndex, endIndex + 1);
  const offsetY = startIndex * itemHeight;

  return (
    <div
      style={{ height: windowHeight, overflowY: 'auto', position: 'relative' }}
      onScroll={(e) => setScrollTop(e.currentTarget.scrollTop)}
    >
      <div style={{ height: totalHeight, position: 'relative' }}>
        <div style={{ transform: \`translateY(\${offsetY}px)\` }}>
          {visibleItems.map((item, idx) => renderItem(item, startIndex + idx))}
        </div>
      </div>
    </div>
  );
}`,
    solution: `Windowing / List Virtualization Core Steps:
1. Container Height & Total Scrollable Height:
   - Total scroll height is items.length * itemHeight. This guarantees native scroll behavior and accurate scrollbar thumb proportions.
2. Calculation of View Window:
   - startIndex = Math.floor(scrollTop / itemHeight) - overscanBuffer
   - endIndex = Math.floor((scrollTop + containerHeight) / itemHeight) + overscanBuffer
3. Coordinate Offsetting:
   - The rendered subset is shifted downward using CSS transform: translateY(startIndex * itemHeight) to position the slice exactly where the user is looking.
4. Performance optimizations:
   - Debounce or throttle onScroll if needed, or prefer using requestAnimationFrame / Passive event listeners.
   - For dynamic heights: maintain a prefix-sum array or Binary Search Tree of item height offsets.`,
    keyTakeaways: [
      'Keeps the active DOM node count constant (~20-40 elements) regardless of whether array has 1,000 or 1,000,000 elements.',
      'Memory footprint remains minimal and layout recalcs take under 1ms.',
      'Use overscan buffer to prevent blank flash during rapid flick scrolling.',
    ],
  },
  {
    id: 'fe-3',
    track: 'frontend',
    title: 'Interaction to Next Paint (INP) and Web Vitals Optimization',
    difficulty: 'Medium',
    category: 'Web Performance',
    companies: ['Google', 'Vercel', 'Shopify'],
    estimatedMinutes: 15,
    description: 'Google replaced FID (First Input Delay) with INP (Interaction to Next Paint) as a Core Web Vital. What does INP measure across the entire user session, and how do you diagnose and eliminate long tasks blocking the main thread?',
    hint: 'INP measures the worst latency of any user tap/click/key press until the browser paints the updated pixels.',
    solution: `1. What INP Measures:
- INP measures the latency of all user interactions (clicks, taps, keyboard inputs) throughout the entire page lifecycle, taking the 98th percentile.
- Breakdown: Input Delay (waiting for main thread) + Processing Time (running JavaScript event callbacks) + Presentation Delay (browser layout/composite/paint).
- Target: Good INP is under 200 milliseconds.

2. Common Culprits:
- Heavy synchronous JavaScript running during event handlers.
- Long tasks (>50ms) blocking the main thread event loop.
- Unnecessary large DOM re-renders cascading down the component tree.

3. Fixes & Strategies:
- Yielding to the main thread using scheduler.yield() or setTimeout(..., 0).
- Using React startTransition / useDeferredValue for non-urgent state updates.
- Web Workers for heavy computations (parsing huge JSON payloads, crypto, image manipulation).
- CSS will-change or content-visibility: auto for rendering containment.`,
    keyTakeaways: [
      'INP covers the full user journey, not just initial page load.',
      'Always yield to main thread before doing secondary heavy tasks.',
      'Use React 19 Actions and transitions to keep the UI responsive while asynchronous work executes.',
    ],
  },

  // --- BACKEND TRACK ---
  {
    id: 'be-1',
    track: 'backend',
    title: 'Designing an Idempotent Payment API and Preventing Double-Charging',
    difficulty: 'Hard',
    category: 'Distributed Systems & Fintech',
    companies: ['Stripe', 'Square', 'PayPal', 'Uber'],
    estimatedMinutes: 20,
    description: 'In unstable mobile networks, a user might tap "Pay $100", the server processes it, but the network drops before returning the HTTP 200 response. The user or client SDK retries the request. How do you guarantee the customer is charged exactly once?',
    hint: 'Use Idempotency Keys stored with distributed locks (Redis + relational database transactions) and cached API responses.',
    codeSnippet: `// Express / Node.js Pseudo-code Pattern
async function handlePayment(req, res) {
  const idempotencyKey = req.headers['idempotency-key'];
  if (!idempotencyKey) return res.status(400).send('Missing Idempotency-Key');

  // 1. Acquire distributed lock on the key
  const lock = await redis.set(\`lock:idemp:\${idempotencyKey}\`, '1', 'NX', 'EX', 10);
  if (!lock) return res.status(409).send('Concurrent request in progress');

  try {
    // 2. Check if key was already processed
    const cachedResponse = await db.idempotencyRecords.findOne({ key: idempotencyKey });
    if (cachedResponse) {
      return res.status(cachedResponse.statusCode).json(cachedResponse.body);
    }

    // 3. Execute transactional payment in DB
    const transaction = await db.runTransaction(async (trx) => {
      const charge = await chargeGateway(req.body);
      const record = await trx.idempotencyRecords.create({
        key: idempotencyKey,
        requestHash: sha256(JSON.stringify(req.body)),
        statusCode: 200,
        body: charge,
      });
      return charge;
    });

    return res.status(200).json(transaction);
  } finally {
    await redis.del(\`lock:idemp:\${idempotencyKey}\`);
  }
}`,
    solution: `Key Architectural Principles:
1. Idempotency Key header:
   - Generated by the client (UUID v4) for every distinct intent.
2. In-flight Locking:
   - Mutex lock in Redis with a short TTL (10s) using SET NX EX. Prevents parallel race conditions if two threads send the same key at the exact millisecond.
3. Request Payload Integrity:
   - Hash the request body (SHA-256). If the same key is submitted with a DIFFERENT payload, immediately reject with HTTP 422 Unprocessable Entity (parameter mismatch).
4. Relational Persistence:
   - Save the HTTP status code, response headers, and response payload in the database in the SAME atomic transaction as the account debit.
5. Return Cached Response on Retries:
   - When a retry arrives with an existing key, bypass the payment gateway entirely and return the saved HTTP response immediately.`,
    keyTakeaways: [
      'Never rely on in-memory caches alone for financial idempotency records; persist them in Postgres/MySQL with transactions.',
      'Guard against payload tampering by hashing the original request.',
      'Always release locks in a finally block or rely on automated Redis TTL expiration.',
    ],
  },
  {
    id: 'be-2',
    track: 'backend',
    title: 'Database Indexing Under the Hood: B-Trees vs LSM-Trees vs Hash Indexes',
    difficulty: 'Medium',
    category: 'Databases & Storage',
    companies: ['Amazon', 'PostgreSQL', 'Datadog', 'CockroachDB'],
    estimatedMinutes: 20,
    description: 'Compare B+ Trees (standard in Postgres, MySQL InnoDB) with LSM-Trees (Log-Structured Merge-Trees used in Cassandra, RocksDB, ScyllaDB). When should you choose each for high-write vs read-intensive workloads?',
    hint: 'B+ Trees do in-place updates causing random disk I/O; LSM-trees append sequentially to MemTable and WAL before flushing to SSTables.',
    solution: `1. B+ Trees (Traditional Relational DBs):
- Structure: Balanced tree with high fan-out (100-1000 pointers per node). All values live in the leaf nodes, which are doubly linked for fast range scans.
- Reads: O(log N) disk reads, extremely fast and predictable point lookups.
- Writes: In-place modifications requiring random disk writes. Page splits occur when nodes fill up, which is costly on spinning disks or high-throughput SSD write endurance.
- Best for: Read-heavy workloads, range queries, ACID transactional relational databases.

2. LSM-Trees (Log-Structured Merge-Trees):
- Structure:
  - Writes enter an append-only Write-Ahead Log (WAL) on disk and an in-memory sorted structure (MemTable, e.g. Red-Black Tree / SkipList).
  - When MemTable fills, it flushes sequentially to disk as an immutable SSTable (Sorted String Table).
  - Background compaction merges and deduplicates SSTables (Size-tiered or Leveled compaction).
- Writes: Sequential disk writes only — orders of magnitude higher write throughput!
- Reads: More complex. May need to check MemTable + multiple SSTables. Mitigated by Bloom Filters to quickly skip SSTables that don’t contain the key.
- Best for: Write-heavy workloads, time-series data, event logging (Datadog, Kafka, Cassandra).`,
    keyTakeaways: [
      'B+ Trees optimize for point reads and range scans via linked leaves.',
      'LSM-Trees optimize for ultra-high write ingestion by converting random writes into sequential appends.',
      'Bloom filters are crucial in LSM-Trees to prevent multi-file disk searches on read misses.',
    ],
  },

  // --- SYSTEM DESIGN TRACK ---
  {
    id: 'sd-1',
    track: 'system-design',
    title: 'Design a Distributed Rate Limiter with Leaky Bucket & Token Bucket at Scale',
    difficulty: 'Hard',
    category: 'System Design',
    companies: ['Cloudflare', 'Stripe', 'Google', 'Meta'],
    estimatedMinutes: 30,
    description: 'Design an API Gateway rate limiter capable of handling 500,000 QPS with sub-millisecond overhead. Address multi-region synchronization, race conditions, and sliding window log vs sliding window counter algorithms.',
    hint: 'Use Redis Cluster with Lua scripts to achieve atomic multi-step counter verification without race conditions.',
    solution: `High-Level Architecture:
1. Placement:
   - Placed at the API Gateway / Reverse Proxy layer (Envoy / Nginx / Cloudflare Worker) before reaching downstream microservices.

2. Algorithm Selection:
   - Sliding Window Counter (Hybrid of fixed window + previous window proportion).
   - Formula: count = previous_window_count * (1 - current_window_elapsed_ratio) + current_window_count.
   - Memory efficient: requires only 2 integers per user/IP/token rather than storing every timestamp like Sliding Window Log.

3. Redis Lua Script Atomicity:
   - To avoid race conditions between GET and INCR, execute an atomic Redis Lua script:
     eval "local current = redis.call('incr', KEYS[1]) if current == 1 then redis.call('expire', KEYS[1], ARGV[1]) end return current" 1 rate:user:123 60

4. Scaling to 500,000 QPS:
   - Local in-memory caching on edge proxies (memory batching: flush token counts to Redis every 50-100ms in batches to reduce Redis network hops).
   - Redis Cluster with consistent hashing on user_id / api_key.
   - Graceful degradation: If Redis becomes unreachable, fail-open with local memory limits rather than taking down the entire website.`,
    keyTakeaways: [
      'Sliding Window Counter offers the best trade-off between memory footprint and boundary spike prevention.',
      'Atomic Lua scripts in Redis prevent distributed race conditions without costly distributed locks.',
      'Fail-open resiliency guarantees that a telemetry/rate-limiting outage does not cause a total platform outage.',
    ],
  },
  {
    id: 'sd-2',
    track: 'system-design',
    title: 'Design a Real-Time Collaborative Document Editor (Google Docs / Figma)',
    difficulty: 'Hard',
    category: 'System Design',
    companies: ['Google', 'Figma', 'Notion', 'Microsoft'],
    estimatedMinutes: 35,
    description: 'How do you design a real-time collaborative text editor supporting millions of concurrent users editing documents without data conflicts, lost keystrokes, or desynchronized cursors?',
    hint: 'Compare Operational Transformation (OT) with Conflict-Free Replicated Data Types (CRDTs, like Yjs and Automerge).',
    solution: `1. Consensus & Conflict Resolution:
- Operational Transformation (OT):
  - Central server acts as the single source of truth. Transforms incoming operations against concurrent operations (e.g. insert at index 5 transformed to index 6).
  - Used by Google Docs. Requires high central server coordination.
- CRDTs (Conflict-Free Replicated Data Types):
  - Mathematically guaranteed eventual consistency without a central coordinator. Each character or node has a unique deterministic identifier (fractional indexing / Lamport timestamps).
  - Used by Figma, Apple Notes, and modern collaborative tools via WebRTC or WebSockets.

2. Transport & Infrastructure:
   - WebSocket connection for bi-directional low-latency operation streaming.
   - Fallback to HTTP Long-Polling or Server-Sent Events (SSE).
   - Ephemeral presence server for cursor positions, user selection highlights, and online status.

3. Persistence & Snapshotting:
   - Store operation logs in Kafka / append-only log.
   - Periodic snapshotting into Amazon S3 / Postgres every 100 operations or 30 seconds to avoid replaying thousands of historical edits upon new document open.`,
    keyTakeaways: [
      'CRDTs allow peer-to-peer and offline editing with mathematical convergence.',
      'Separate the document state channel (guaranteed delivery) from cursor presence channel (loss-tolerant UDP/ephemeral).',
      'Snapshotting is required to keep initial document load time sub-second.',
    ],
  },

  // --- AI & ML TRACK ---
  {
    id: 'aiml-1',
    track: 'ai-ml',
    title: 'Production RAG Pipeline Architecture: Chunking, Embeddings, Hybrid Search & Reranking',
    difficulty: 'Hard',
    category: 'GenAI & Information Retrieval',
    companies: ['Anthropic', 'OpenAI', 'Perplexity', 'Microsoft'],
    estimatedMinutes: 25,
    description: 'Explain how to design an enterprise-grade Retrieval-Augmented Generation (RAG) system with low hallucination rates. Detail chunking strategies, dense vs sparse hybrid search, and cross-encoder re-ranking.',
    hint: 'Dense vectors capture semantic meaning, while BM25 sparse keyword search captures exact SKU/code numbers. Combine with Reciprocal Rank Fusion (RRF).',
    solution: `1. Chunking Strategy:
- Fixed-size chunking (e.g. 500 tokens with 50 token overlap) is naive and often splits sentences.
- Prefer Semantic Chunking: split based on semantic shifts (embedding distance between adjacent sentences) or Markdown / Document Structure headers (H1/H2 boundaries).

2. Hybrid Search (Dense + Sparse):
- Dense Retrieval: Vector embeddings (e.g., text-embedding-3-large) using cosine similarity / HNSW index in Pinecone, Qdrant, or pgvector. Great for conceptual queries.
- Sparse Retrieval: BM25 / SPLADE index. Essential for exact names, error codes, part numbers, and acronyms.
- Fusion: Reciprocal Rank Fusion (RRF) combines scores without needing calibrated score normalization.

3. Re-ranking:
- Pass the top 50 candidates from hybrid search to a Cross-Encoder Re-ranker (e.g. Cohere Rerank, BGE-Reranker).
- Cross-encoders compare query and document tokens jointly with full self-attention, dramatically improving precision for top 5 context chunks passed to the LLM.

4. Context Window Assembly & Guardrails:
- Structure the prompt with clear source attribution delimiters (e.g. <context id="doc_1">...</context>).
- Enforce citations in the system prompt and verify claims using automated hallucination evaluators (e.g., Ragas, TruLens).`,
    keyTakeaways: [
      'Hybrid search (Dense + BM25) outperforms vector-only search on technical and proprietary data.',
      'Re-ranking is the single most cost-effective lever for boosting RAG retrieval accuracy.',
      'Chunk boundary respect is crucial to prevent losing conversational context.',
    ],
  },

  // --- BEHAVIORAL TRACK ---
  {
    id: 'beh-1',
    track: 'behavioral',
    title: 'Tell Me About a Time You Strongly Disagreed with an Engineering Decision or Your Manager',
    difficulty: 'Medium',
    category: 'Leadership & Conflict Resolution',
    companies: ['Amazon', 'Google', 'Meta', 'Stripe', 'Apple'],
    estimatedMinutes: 15,
    description: 'Amazon Leadership Principle: "Have Backbone; Disagree and Commit". Interviewers want to see that you challenge assumptions respectfully with data, remain humble, and commit fully once a team decision is reached.',
    hint: 'Structure using the STAR framework (Situation, Task, Action, Result). Never speak negatively about colleagues; focus on technical tradeoffs and team alignment.',
    starGuide: {
      situation: 'At my previous company, our team planned to rewrite our entire customer checkout service in a trendy new language right before our peak Q4 shopping surge.',
      task: 'I believed the rewrite carried unacceptable operational risks of downtime and missed deadlines during the highest revenue period of the year.',
      action: 'I put together an objective risk-benefit RFC. Instead of opposing the idea emotionally, I benchmarked our existing performance bottlenecks with APM metrics and proved that 90% of our latency came from un-indexed database queries, not language runtime speed. I presented an alternative plan to optimize SQL queries in 2 weeks and defer the architecture rewrite to Q1.',
      result: 'The team and engineering director agreed. We fixed the database indexes, latency dropped by 64%, we had 100% uptime through Black Friday, and scheduled the rewrite cleanly for the spring with thorough integration tests.',
    },
    solution: `Key Elements Evaluated:
1. Objectivity: Disagreement was grounded in real production data and user risk, not personal ego.
2. Constructive Alternative: You didn't just say "No"; you offered a pragmatic, lower-risk path forward.
3. Psychological Safety: Discussed openly with empathy and professional respect.
4. Business Alignment: Centered around company business continuity and revenue protection.`,
    keyTakeaways: [
      'Disagreement is valued when backed by empirical benchmarks rather than dogma.',
      'Always emphasize "Disagree and Commit" — once a decision is made, execute with 100% devotion.',
      'Highlight concrete positive business metrics in your result.',
    ],
  },
  {
    id: 'beh-2',
    track: 'behavioral',
    title: 'Describe a Severe Production Outage You Caused or Led the Resolution For',
    difficulty: 'Hard',
    category: 'Ownership & Incident Management',
    companies: ['Netflix', 'Datadog', 'Stripe', 'AWS'],
    estimatedMinutes: 20,
    description: 'Blameless post-mortem culture is a cornerstone of modern engineering. Interviewers test your ownership, calm under pressure, systematic debugging methodology, and systemic long-term preventative measures.',
    hint: 'Never deflect blame. Show ownership, quick triage to stop the bleeding first, and durable systemic guardrails added afterward.',
    starGuide: {
      situation: 'A database migration I deployed to our production user authentication cluster inadvertently triggered an exclusive table lock on 15 million rows, causing a 14-minute global login outage.',
      task: 'My immediate responsibility was to restore customer access immediately, coordinate the incident response, and ensure this class of lock failure could never happen again.',
      action: 'I immediately declared a Sev-1 incident, joined the incident bridge, rolled back the migration within 3 minutes, and terminated the hanging lock connections. Once services stabilized, I wrote a transparent blameless post-mortem. I then added automated CI linting using pg-query to detect hazardous lock statements and configured zero-downtime gh-ost / pt-online-schema-change tools.',
      result: 'Services returned to normal in under 15 minutes. The new CI linter blocked 4 subsequent unsafe migrations in the next quarter, and our team adopted zero-downtime migration standards across all microservices.',
    },
    solution: `Key Criteria Evaluated:
1. Immediate Focus on Customer Mitigation: Stop the bleeding before analyzing root cause.
2. Communication: Promptly alerting incident commanders and status page.
3. Systemic Thinking: Root cause was addressed via automated CI tooling, not just "be more careful next time".`,
    keyTakeaways: [
      'Great engineers don’t hide outages; they demonstrate extreme ownership and blameless improvement.',
      'Long-term prevention must be automated (linters, feature flags, canary rollouts), not reliant on human memory.',
    ],
  },
];

export const MOCK_INTERVIEW_SESSIONS: MockSessionQuestion[] = [
  {
    id: 'mock-1',
    category: 'System Architecture',
    difficulty: 'Hard',
    question: 'How would you architect a global URL shortener (like Bitly) handling 100 million new URLs per month and 10 billion clicks per month with p99 latency under 20ms?',
    expectedPoints: [
      'Traffic estimation (Writes: ~40 QPS, Reads: ~4,000 QPS - heavy 100:1 read ratio)',
      'Base62 encoding of 64-bit integer IDs vs MD5/SHA256 truncation',
      'Distributed ID Generator (Snowflake / Pre-allocated range counter in Zookeeper)',
      'Multi-tier caching (Redis cluster with LRU eviction for top 20% URLs)',
      'Global CDN edge redirection using HTTP 301 vs 302 analytics trade-off',
    ],
    sampleBestAnswer: `To design a high-throughput URL shortener, we start with the math:
1. Capacity & Ratios:
- 100M writes/mo is ~40 writes/sec; 10B reads/mo is ~4,000 reads/sec. It is 100:1 read heavy.
- In 5 years: 6 billion URLs. Using Base62 (a-z, A-Z, 0-9), 62^7 = 3.5 trillion unique combinations, so a 7-character hash is more than sufficient.

2. Short Link Generation:
- Instead of hashing the URL and resolving collisions, we assign each new URL an auto-incrementing 64-bit unique ID using an ID generator (Twitter Snowflake or Range-based counters in ZooKeeper).
- We convert the ID into Base62 to get the 7-character string.

3. Storage & Partitioning:
- Relational schema or NoSQL Key-Value store (DynamoDB/Cassandra) with partition key on short_code.
- Schema: short_code (PK), original_url, user_id, created_at, expires_at.

4. Caching & Edge Performance:
- 80-20 Pareto Rule: 20% of URLs generate 80% of clicks. We cache top URLs in Redis with LRU eviction.
- Global CDN points of presence handle HTTP 302 (Temporary Redirect) so we can collect real-time click telemetry and analytics without caching stale redirects forever.`,
  },
  {
    id: 'mock-2',
    category: 'Frontend Performance & State',
    difficulty: 'Medium',
    question: 'A large e-commerce dashboard experiences severe UI lag when users filter large product tables with 10,000 rows. Walk me step-by-step through how you profile, identify, and eliminate the lag.',
    expectedPoints: [
      'Chrome DevTools Performance tab profiling (Long tasks, flamechart inspection)',
      'Virtualization of the table rows (TanStack Virtual or react-window)',
      'Debouncing search inputs and using React useTransition / useDeferredValue',
      'Web Workers for heavy client-side filtering/sorting',
      'Memoization (useMemo, React.memo) to avoid cascading child re-renders',
    ],
    sampleBestAnswer: `Here is my systematic diagnostic and resolution plan:
1. Profiling & Measurement:
- Open Chrome DevTools Performance Profiler with 4x CPU throttling.
- Record an interaction while typing in the filter input. Inspect the Flamechart: is the lag caused by Scripting (re-calculating filters), Rendering (rebuilding the Virtual DOM), or Painting (browser layout/paint of 10,000 DOM nodes)?

2. Main Thread Virtualization:
- 10,000 table rows create 100,000+ DOM nodes. I would immediately implement list virtualization so that only the ~25 rows currently visible in the viewport exist in the DOM. This drops DOM node creation time from 400ms to <2ms.

3. Non-blocking State Updates:
- Wrap the filter state update in React startTransition. This keeps typing in the input box immediate and responsive (120fps) while marking the filtered table recomputation as low priority and interruptible.

4. Offloading Computations:
- If sorting and multi-attribute filtering on 10,000 items takes >15ms, offload the filtering logic to a dedicated Web Worker so the main browser thread never freezes.`,
  },
];
