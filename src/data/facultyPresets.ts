import { FacultyPreset, SubjectId } from '../types';

export const FACULTY_PRESETS: FacultyPreset[] = [
  {
    id: 'medicine_health',
    facultyName: 'Clinical Sciences & Health Sciences',
    courseExamples: ['Medicine & Surgery (MBBS)', 'Dentistry', 'Nursing Science', 'Medical Rehabilitation', 'Pharmacy'],
    defaultSubjects: ['english', 'biology', 'chemistry', 'physics'],
    averageCutOff: 310,
    tip: 'OAU College of Health Sciences requires a very high aggregate (typically 75%+ composite). Physics and Chemistry calculations are heavily weighted.',
  },
  {
    id: 'engineering_tech',
    facultyName: 'Technology & Engineering',
    courseExamples: ['Electrical & Electronics Eng.', 'Mechanical Eng.', 'Civil Engineering', 'Computer Engineering', 'Chemical Eng.'],
    defaultSubjects: ['english', 'mathematics', 'physics', 'chemistry'],
    averageCutOff: 285,
    tip: 'Speed in calculus, mechanics, and dimensional analysis is critical. Aim for 80%+ in Mathematics and Physics.',
  },
  {
    id: 'science_computing',
    facultyName: 'Science & Computing',
    courseExamples: ['Computer Science with Maths/Economics', 'Microbiology', 'Biochemistry', 'Industrial Chemistry', 'Geology'],
    defaultSubjects: ['english', 'mathematics', 'physics', 'chemistry'],
    averageCutOff: 270,
    tip: 'Computer Science at Great Ife is intensely competitive. High speed in algebra, matrices, and physics gives an edge.',
  },
  {
    id: 'law_legal',
    facultyName: 'Faculty of Law',
    courseExamples: ['Civil Law / Common Law', 'International Law'],
    defaultSubjects: ['english', 'literature', 'government', 'crk'],
    averageCutOff: 300,
    tip: 'Verbal reasoning, reading speed, and mastery of constitutional history in Government and Literature are decisive.',
  },
  {
    id: 'admin_social_sciences',
    facultyName: 'Administration & Social Sciences',
    courseExamples: ['Accounting', 'Economics', 'Business Administration', 'Public Administration', 'International Relations', 'Political Science'],
    defaultSubjects: ['english', 'mathematics', 'economics', 'government'],
    averageCutOff: 275,
    tip: 'Economics graphs, elasticity math, and Nigerian colonial constitutional treaties frequently appear in OAU Post-UTME.',
  },
  {
    id: 'arts_humanities',
    facultyName: 'Faculty of Arts & Humanities',
    courseExamples: ['English Studies', 'History & Diplomatic Studies', 'Philosophy', 'Religious Studies', 'Dramatic Arts'],
    defaultSubjects: ['english', 'literature', 'government', 'crk'],
    averageCutOff: 260,
    tip: 'Mastery of phonetics, grammatical concord, and literary appreciation is key to scoring above 300.',
  },
  {
    id: 'environmental_agric',
    facultyName: 'Environmental Design & Agriculture',
    courseExamples: ['Architecture', 'Estate Management', 'Urban & Regional Planning', 'Agricultural Economics', 'Animal Science'],
    defaultSubjects: ['english', 'mathematics', 'chemistry', 'physics'],
    averageCutOff: 250,
    tip: 'Focus on solid fundamentals in Mathematics and Chemistry stoichiometry.',
  },
];

/**
 * Calculates official OAU Composite Admission Aggregate:
 * OAU Formula: (JAMB Score / 8) + (Post-UTME Score / 4)
 * Max JAMB point = 400 / 8 = 50%
 * Max Post-UTME point = 200 / 4 (or 400 / 8) = 50%
 * Total Composite = 100%
 */
export function calculateOauAggregate(jambScore: number, postUtmeScoreOutOf400: number): {
  jambPoints: number;
  postUtmePoints: number;
  totalAggregate: number;
} {
  const jambPoints = Number(((jambScore / 400) * 50).toFixed(2));
  const postUtmePoints = Number(((postUtmeScoreOutOf400 / 400) * 50).toFixed(2));
  const totalAggregate = Number((jambPoints + postUtmePoints).toFixed(2));
  return { jambPoints, postUtmePoints, totalAggregate };
}

export function getAdmissionRating(totalAggregate: number, targetCourse: string): {
  verdict: string;
  badgeColor: string;
  recommendation: string;
} {
  if (totalAggregate >= 75) {
    return {
      verdict: 'Extremely Competitive (Merit Admission Zone)',
      badgeColor: 'emerald',
      recommendation: 'Exceptional performance! This aggregate is strongly competitive for top-tier competitive courses like Medicine, Law, Pharmacy, and Computer Science.',
    };
  } else if (totalAggregate >= 65) {
    return {
      verdict: 'Very Strong (High Admission Likelihood)',
      badgeColor: 'blue',
      recommendation: 'Solid standing for Engineering, Accounting, Nursing, Economics, and most degree programs at OAU.',
    };
  } else if (totalAggregate >= 55) {
    return {
      verdict: 'Moderate (Competitive for Many Faculties)',
      badgeColor: 'amber',
      recommendation: 'Viable for Sciences, Arts, Environmental Design, and Agriculture. Push Post-UTME practice higher to guarantee merit list.',
    };
  } else {
    return {
      verdict: 'Needs Reinforcement',
      badgeColor: 'rose',
      recommendation: 'Dedicate more daily practice hours on weak subjects using the DLCF Revision Bank and AI Tutor tips.',
    };
  }
}
