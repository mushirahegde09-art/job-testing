import { Job, ATSScanResult } from '@/types';

const COMMON_POWER_VERBS = [
  'architected', 'spearheaded', 'engineered', 'orchestrated', 'accelerated',
  'optimized', 'designed', 'developed', 'deployed', 'scaled', 'implemented',
  'reduced', 'mentored', 'authored', 'championed', 'revamped', 'automated'
];

export function analyzeResumeForJob(resumeText: string, targetJob?: Job, customJobDesc?: string): ATSScanResult {
  const normalizedResume = resumeText.toLowerCase();

  // Extract expected keywords from target job or custom description
  const keywordsToLookFor = new Set<string>();

  if (targetJob) {
    targetJob.techStack.forEach(t => keywordsToLookFor.add(t.toLowerCase()));
    targetJob.requirements.forEach(req => {
      // Extract key technical words
      const words = req.toLowerCase().match(/\b[a-z]{3,}\b/g) || [];
      words.forEach(w => {
        if (!['with', 'have', 'from', 'that', 'this', 'years', 'experience', 'using'].includes(w)) {
          keywordsToLookFor.add(w);
        }
      });
    });
  }

  if (customJobDesc) {
    const words = customJobDesc.toLowerCase().match(/\b[a-z]{3,}\b/g) || [];
    words.forEach(w => {
      if (!['with', 'have', 'from', 'that', 'this', 'years', 'experience', 'using', 'will', 'must'].includes(w)) {
        keywordsToLookFor.add(w);
      }
    });
  }

  // Fallback defaults if few keywords extracted
  if (keywordsToLookFor.size === 0) {
    ['react', 'typescript', 'javascript', 'next.js', 'node.js', 'system design', 'api', 'performance', 'git', 'sql', 'testing'].forEach(k => keywordsToLookFor.add(k));
  }

  const matchedKeywords: string[] = [];
  const missingKeywords: string[] = [];

  keywordsToLookFor.forEach(kw => {
    if (normalizedResume.includes(kw)) {
      matchedKeywords.push(kw);
    } else {
      missingKeywords.push(kw);
    }
  });

  // Power verbs detection
  const strongVerbsFound = COMMON_POWER_VERBS.filter(v => normalizedResume.includes(v));

  // Formatting & Quantitative checks
  const formattingIssues: string[] = [];
  const suggestedAdditions: string[] = [];

  const wordCount = resumeText.trim().split(/\s+/).filter(Boolean).length;
  if (wordCount < 150) {
    formattingIssues.push('Resume length is too brief (< 150 words). Aim for 350 - 650 concise words.');
  }

  const hasMetrics = /\b(\d+%\b|\$\d+|\b\d+x\b|\b\d+ms\b|\b\d+k\b|\b\d+m\b)/i.test(resumeText);
  if (!hasMetrics) {
    formattingIssues.push('Missing quantifiable metrics. Modern ATS and hiring managers favor quantified achievements (e.g., "Reduced latency by 45%", "Scaled to 2M users").');
    suggestedAdditions.push('Add specific numbers: latency drops (%), cost savings ($), user scale, or pipeline speedups.');
  }

  const hasContactInfo = /@|linkedin\.com|github\.com/i.test(resumeText);
  if (!hasContactInfo) {
    formattingIssues.push('No obvious email, LinkedIn, or GitHub URL found in text.');
  }

  if (strongVerbsFound.length < 3) {
    suggestedAdditions.push('Replace passive phrases ("was responsible for") with punchy power verbs: "Orchestrated", "Architected", "Accelerated".');
  }

  // Calculate score
  const keywordRatio = matchedKeywords.length / Math.max(1, (matchedKeywords.length + missingKeywords.length));
  const verbScore = Math.min(20, strongVerbsFound.length * 4);
  const metricScore = hasMetrics ? 20 : 5;
  const lengthScore = wordCount >= 200 ? 15 : 5;
  const rawScore = Math.round((keywordRatio * 45) + verbScore + metricScore + lengthScore);
  const score = Math.min(98, Math.max(25, rawScore));

  const matchPercentage = Math.round(keywordRatio * 100);

  let summary = '';
  if (score >= 85) {
    summary = 'Outstanding ATS readiness! Your resume is strongly aligned with technical keywords, uses impactful action verbs, and passes automated screening filters with high confidence.';
  } else if (score >= 68) {
    summary = 'Solid baseline with good relevance. Incorporating the highlighted missing keywords and adding 1-2 quantified metrics will propel your resume into the top 5% applicant tier.';
  } else {
    summary = 'Moderate ATS alignment. Several core keywords and quantifiable metrics from the target job are absent. Review the missing skill tags below to optimize keyword density.';
  }

  return {
    score,
    matchPercentage,
    matchedKeywords: matchedKeywords.slice(0, 15),
    missingKeywords: missingKeywords.slice(0, 12),
    formattingIssues,
    strongVerbsFound,
    suggestedAdditions,
    summary,
  };
}
