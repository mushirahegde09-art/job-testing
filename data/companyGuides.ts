import { CompanyBlueprint } from '@/types';

export const COMPANY_BLUEPRINTS: CompanyBlueprint[] = [
  {
    id: 'google',
    name: 'Google',
    logo: '🔍',
    tagline: 'Organizing the worlds information and making it universally accessible',
    hiringBar: 'High algorithmic precision, deep system design, and Googleyness & Leadership',
    averageSalarySenior: '$360,000 - $440,000 total comp (L5)',
    stages: [
      {
        stage: 'Recruiter Screen',
        duration: '30 mins',
        description: 'Resume review, leveling expectations, project highlights, and behavioral vibe check.',
        tips: 'Be crisp on the scale of your current systems and specific contributions using metrics.',
      },
      {
        stage: 'Technical Phone Screen',
        duration: '45 mins',
        description: '1 medium/hard data structures & algorithms problem in a Google Doc / CoderPad.',
        tips: 'Clarify constraints upfront, talk out loud through multiple approaches, and write syntactically clean code.',
      },
      {
        stage: 'Onsite Loop (4-5 rounds)',
        duration: '4-5 hours',
        description: '2x Coding & Algorithms, 1-2x System Design / Architecture, 1x Googleyness & Leadership.',
        tips: 'For Googleyness, emphasize intellectual humility, bias for collaboration, and ethical decision making.',
      },
    ],
    culturePrinciples: [
      {
        title: 'Focus on the user and all else will follow',
        description: 'Prioritize long-term user delight over short-term revenue monetization shortcuts.',
      },
      {
        title: 'Fast is better than slow',
        description: 'Performance is a core feature; build systems with sub-millisecond responsiveness.',
      },
      {
        title: 'Democracy on the web works',
        description: 'Seek consensus through peer code reviews and transparent design documents.',
      },
    ],
    frequentQuestions: [
      {
        question: 'Design Google Drive / Dropbox with chunked deduplication and sync conflict resolution',
        type: 'System Design',
        insight: 'Focus on block-level delta sync, metadata DB vs blob storage (S3/GCS), and push notifications.',
      },
      {
        question: 'Longest Substring Without Repeating Characters / Median of Two Sorted Arrays',
        type: 'Coding',
        insight: 'Expect sliding window and binary search optimization to reach O(log(min(n, m))).',
      },
      {
        question: 'Tell me about an ambiguous project with no clear specifications and how you drove it',
        type: 'Behavioral',
        insight: 'Show how you surveyed stakeholders, established milestones, and unblocked the team.',
      },
    ],
    benefitsHighlight: [
      'Gourmet campus cafeterias & micro-kitchens',
      '401(k) 50% match up to IRS max',
      '20% project exploration time',
      'Extensive family planning & fertility support',
    ],
  },
  {
    id: 'stripe',
    name: 'Stripe',
    logo: '💳',
    tagline: 'Financial infrastructure for the internet',
    hiringBar: 'Exceptional practical programming, real-world bug-fixing, and system durability',
    averageSalarySenior: '$380,000 - $480,000 total comp (L4/L5)',
    stages: [
      {
        stage: 'Recruiter Chat',
        duration: '30 mins',
        description: 'Overview of team domains, experience deep dive, and technical interests.',
        tips: 'Research Stripes API documentation and developer ergonomics principles.',
      },
      {
        stage: 'Technical Integration Screen',
        duration: '45-60 mins',
        description: 'Practical coding screen: parsing JSON/HTTP logs, implementing an API client, or refactoring real code.',
        tips: 'Stripe evaluates how you code in your actual IDE! You can Google docs, test locally, and run unit tests.',
      },
      {
        stage: 'Practical Virtual Onsite (5 rounds)',
        duration: '5 hours',
        description: 'Bug Squash / Real-world Debugging, Feature Extension, System Architecture, Integration & Culture.',
        tips: 'Write clear variable names, handle edge cases gracefully, and write test assertions.',
      },
    ],
    culturePrinciples: [
      {
        title: 'Users First',
        description: 'Obsess over developer experience; APIs should be intuitive and self-documenting.',
      },
      {
        title: 'Move with Urgency',
        description: 'Compound progress through daily high-velocity ship cycles.',
      },
      {
        title: 'Rigorous Thinking',
        description: 'Make decisions based on structured reasoning, written RFCs, and careful analysis.',
      },
    ],
    frequentQuestions: [
      {
        question: 'Implement a currency exchange rate routing engine with multi-hop hops and minimum fee calculation',
        type: 'Coding',
        insight: 'Uses graph traversal (Dijkstras algorithm) with real-world precision handling for currency fractions.',
      },
      {
        question: 'Design a distributed idempotency layer for a multi-region payment gateway',
        type: 'System Design',
        insight: 'Discuss 2-phase commits, distributed mutexes, database transaction isolation, and network partition recovery.',
      },
      {
        question: 'Describe an instance where a software requirement was flawed and how you resolved it',
        type: 'Behavioral',
        insight: 'Show empathy for customers and proactive communication with product managers.',
      },
    ],
    benefitsHighlight: [
      'Transparent leveling and equity refreshers',
      'Generous ergonomic home setup allowance ($2,500)',
      '16 weeks paid parental leave',
      'Dedicated learning & growth stipend',
    ],
  },
  {
    id: 'openai',
    name: 'OpenAI',
    logo: '🤖',
    tagline: 'Ensuring artificial general intelligence benefits all of humanity',
    hiringBar: 'High velocity, AI systems intuition, distributed training & inference infrastructure',
    averageSalarySenior: '$450,000 - $650,000 total comp (Member of Technical Staff)',
    stages: [
      {
        stage: 'Technical Recruiter Screen',
        duration: '30 mins',
        description: 'Background alignment with frontier AI models, research infrastructure, and product scaling.',
        tips: 'Highlight hands-on experience with LLMs, GPU orchestration, or high-throughput streaming systems.',
      },
      {
        stage: 'Take-Home or Live Coding Screen',
        duration: '60 mins',
        description: 'Systems-level or data streaming problem involving concurrency, async I/O, or ML pipelines.',
        tips: 'Demonstrate clean Python/C++/Rust async patterns and zero-copy memory management.',
      },
      {
        stage: 'Onsite Technical Marathon',
        duration: '4-5 rounds',
        description: 'Frontier AI Systems Design, Live Coding & Distributed Compute, Research Collaboration, Culture & Mission.',
        tips: 'Demonstrate curiosity, resilience with fast-changing APIs, and deep mission alignment with AI safety.',
      },
    ],
    culturePrinciples: [
      {
        title: 'Mission Alignment',
        description: 'Everything anchors to safe, beneficial development of artificial general intelligence.',
      },
      {
        title: 'Intense Iteration Speed',
        description: 'Prototype quickly, test against production traffic, and embrace fast empirical feedback.',
      },
      {
        title: 'High Agency',
        description: 'Self-directed problem solvers who unblock themselves without waiting for consensus.',
      },
    ],
    frequentQuestions: [
      {
        question: 'Design an LLM serving gateway handling 100k concurrent streaming tokens/second with dynamic batching',
        type: 'System Design',
        insight: 'Discuss vLLM PagedAttention, KV cache management, continuous batching, and GPU cluster load balancing.',
      },
      {
        question: 'Implement a thread-safe token bucket rate limiter with sliding microsecond windows in Python / C++',
        type: 'Coding',
        insight: 'Show concurrency mastery, lock-free atomics, and memory cache line alignment.',
      },
      {
        question: 'How do you prioritize between building a quick hack vs a foundational abstraction?',
        type: 'Behavioral',
        insight: 'Highlight situational awareness: know when to ship an experiment vs when to build rock-solid core infrastructure.',
      },
    ],
    benefitsHighlight: [
      'Industry-leading equity upside (PPU units)',
      'Full health, dental, vision with 100% company covered premiums',
      'Relocation assistance & concierge services',
      'Catered chef meals daily in SF HQ',
    ],
  },
];
