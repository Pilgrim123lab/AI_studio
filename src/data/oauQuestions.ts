import { Question, SubjectId, SubjectInfo } from '../types';

export const SUBJECT_METADATA: Record<SubjectId, SubjectInfo> = {
  english: {
    id: 'english',
    name: 'English Language',
    shortName: 'ENG',
    iconName: 'BookOpen',
    category: 'compulsory',
    description: 'Lexis & structure, antonyms, synonyms, comprehension, sentence interpretation & oral forms.',
    questionCountAvailable: 30,
  },
  mathematics: {
    id: 'mathematics',
    name: 'Mathematics',
    shortName: 'MTH',
    iconName: 'Calculator',
    category: 'science',
    description: 'Calculus, algebra, trigonometry, matrices, logarithms, geometry, statistics & probability.',
    questionCountAvailable: 25,
  },
  physics: {
    id: 'physics',
    name: 'Physics',
    shortName: 'PHY',
    iconName: 'Zap',
    category: 'science',
    description: 'Mechanics, wave motion, optics, electromagnetism, modern physics & thermodynamics.',
    questionCountAvailable: 25,
  },
  chemistry: {
    id: 'chemistry',
    name: 'Chemistry',
    shortName: 'CHM',
    iconName: 'FlaskConical',
    category: 'science',
    description: 'Stoichiometry, organic chemistry, periodic trends, equilibrium, electrochemistry & gas laws.',
    questionCountAvailable: 25,
  },
  biology: {
    id: 'biology',
    name: 'Biology',
    shortName: 'BIO',
    iconName: 'Dna',
    category: 'science',
    description: 'Genetics, cell biology, ecology, human physiology, plant transport & reproduction.',
    questionCountAvailable: 25,
  },
  economics: {
    id: 'economics',
    name: 'Economics',
    shortName: 'ECO',
    iconName: 'TrendingUp',
    category: 'commercial',
    description: 'Elasticity, market structures, national income, public finance, inflation & international trade.',
    questionCountAvailable: 20,
  },
  government: {
    id: 'government',
    name: 'Government',
    shortName: 'GOV',
    iconName: 'Landmark',
    category: 'arts',
    description: 'Constitutional development in Nigeria, political systems, federalism, public administration & foreign policy.',
    questionCountAvailable: 20,
  },
  literature: {
    id: 'literature',
    name: 'Literature in English',
    shortName: 'LIT',
    iconName: 'Feather',
    category: 'arts',
    description: 'Literary appreciation, poetic devices, African prose, drama & classical world literature.',
    questionCountAvailable: 20,
  },
  crk: {
    id: 'crk',
    name: 'Christian Religious Knowledge',
    shortName: 'CRK',
    iconName: 'Cross',
    category: 'arts',
    description: 'Old Testament faith, teachings & parables of Christ, Acts of Apostles & Pauline epistles.',
    questionCountAvailable: 20,
  },
  accounting: {
    id: 'accounting',
    name: 'Financial Accounting',
    shortName: 'ACC',
    iconName: 'Receipt',
    category: 'commercial',
    description: 'Double entry system, trial balance, depreciation, manufacturing accounts & partnership accounting.',
    questionCountAvailable: 20,
  },
};

export const OAU_PAST_QUESTIONS: Question[] = [
  // ================= ENGLISH LANGUAGE =================
  {
    id: 'eng_01',
    subjectId: 'english',
    subjectName: 'English Language',
    year: '2023 OAU Post-UTME',
    topic: 'Antonyms & Vocabulary',
    questionText: 'Choose the word that is most nearly OPPOSITE in meaning to the italicized word: "The minister\'s speech was remarkably *equivocal*, leaving journalists puzzled as to the government\'s real intentions."',
    options: [
      'Ambiguous and vague',
      'Lucid and unequivocal',
      'Hostile and sarcastic',
      'Lengthy and tedious',
      'Eloquent and flamboyant'
    ],
    correctOptionIndex: 1,
    explanation: '"Equivocal" means open to more than one interpretation, ambiguous, or misleading. The exact opposite is "lucid and unequivocal", which means clear, transparent, and leaving no doubt.',
    keyConcept: 'Vocabulary in context - Lexical antonyms',
    oauExamTip: 'Look for prefix clues ("equi-" + "vocal" = equal voices / double-meaning). Opposite must denote absolute clarity.',
    difficulty: 'medium'
  },
  {
    id: 'eng_02',
    subjectId: 'english',
    subjectName: 'English Language',
    year: '2022 OAU Post-UTME',
    topic: 'Lexis & Structure (Idiomatic Expressions)',
    questionText: 'Fill in the blank with the most appropriate option: "The newly elected student union executive promised to ________ the financial records of the previous administration without prejudice."',
    options: [
      'look into',
      'look down upon',
      'look through at',
      'look forward over',
      'look after to'
    ],
    correctOptionIndex: 0,
    explanation: 'The phrasal verb "to look into" means to investigate or examine thoroughly. "Look down upon" means to despise, and "look after" means to care for.',
    keyConcept: 'Phrasal verbs in administrative context',
    oauExamTip: 'OAU English tests standard prepositions and phrasal verbs repeatedly. Memorize common multi-word verbs.',
    difficulty: 'easy'
  },
  {
    id: 'eng_03',
    subjectId: 'english',
    subjectName: 'English Language',
    year: '2021 OAU Post-UTME',
    topic: 'Sentence Interpretation & Concord',
    questionText: 'Select the option that best completes the sentence grammatically: "Neither the lecturer nor the students ________ present at the Senate building when the announcement was made."',
    options: [
      'was',
      'were',
      'is',
      'are',
      'have been'
    ],
    correctOptionIndex: 1,
    explanation: 'By the Rule of Proximity in subject-verb concord: when subjects are joined by "neither... nor" or "either... or", the verb agrees in number with the nearer subject. Here, "the students" (plural) is closer to the verb, and the sentence is in past tense, so "were" is correct.',
    keyConcept: 'Proximity Concord with correlative conjunctions',
    oauExamTip: 'Check the subject closest to the verb when "Neither... nor" appears. If plural, use plural verb; if singular, use singular verb.',
    difficulty: 'medium'
  },
  {
    id: 'eng_04',
    subjectId: 'english',
    subjectName: 'English Language',
    year: '2024 OAU Post-UTME',
    topic: 'Synonyms (Nearest in Meaning)',
    questionText: 'Choose the option nearest in meaning to the underlined word: "The Dean commended the research team for their *meticulous* attention to scientific protocol during the vaccine trials."',
    options: [
      'Hasty and superficial',
      'Scrupulous and painstaking',
      'Reckless and indifferent',
      'Casual and relaxed',
      'Pretentious and superficial'
    ],
    correctOptionIndex: 1,
    explanation: '"Meticulous" means showing great attention to detail; very careful and precise. "Scrupulous and painstaking" carries the exact identical meaning.',
    keyConcept: 'Academic vocabulary synonyms',
    oauExamTip: 'Academic prose in OAU often uses descriptors like meticulous, fastidious, and scrupulous.',
    difficulty: 'easy'
  },
  {
    id: 'eng_05',
    subjectId: 'english',
    subjectName: 'English Language',
    year: '2020 OAU Post-UTME',
    topic: 'Oral English / Phonology',
    questionText: 'Choose the word that has the SAME vowel sound as the one represented by the underlined letter(s): b**ir**d',
    options: [
      'Board',
      'Heard',
      'Beard',
      'Hard',
      'Bared'
    ],
    correctOptionIndex: 1,
    explanation: 'The word "bird" contains the long central vowel sound /ɜː/. Among the options, "heard" (/hɜːd/) has the identical vowel sound. "Board" is /ɔː/, "beard" is /ɪə/, and "hard" is /ɑː/.',
    keyConcept: 'Vowel Phonology - /ɜː/ sound discrimination',
    oauExamTip: 'Words spelled with "ear" (heard, earth, learn, pearl) frequently share the /ɜː/ vowel sound of "bird" and "nurse".',
    difficulty: 'medium'
  },
  {
    id: 'eng_06',
    subjectId: 'english',
    subjectName: 'English Language',
    year: '2023 OAU Post-UTME',
    topic: 'Subjunctive Mood',
    questionText: 'Choose the grammatically correct option: "The Vice-Chancellor demanded that every department ________ a detailed curriculum review before Friday."',
    options: [
      'submits',
      'submit',
      'submitted',
      'should have submit',
      'must submit'
    ],
    correctOptionIndex: 1,
    explanation: 'Verbs expressing demand, mandate, insist, recommend, or require trigger the subjunctive mood in standard English, which utilizes the base form of the verb regardless of the subject. Therefore, "that every department submit" (bare infinitive) is strictly required.',
    keyConcept: 'The Mandative Subjunctive Mood',
    oauExamTip: 'A favorite OAU trap: "insist that he GO", "demand that she BE", "require that it SUBMIT". No "-s" is added!',
    difficulty: 'hard'
  },
  {
    id: 'eng_07',
    subjectId: 'english',
    subjectName: 'English Language',
    year: '2022 OAU Post-UTME',
    topic: 'Clause & Sentence Types',
    questionText: 'Identify the grammatical function of the capitalized clause: "WHAT THE GOVERNOR SAID AT THE CONVOCATION impressed the visiting scholars."',
    options: [
      'Noun clause, subject of the verb "impressed"',
      'Adverbial clause of reason modifying "impressed"',
      'Adjectival clause qualifying "scholars"',
      'Prepositional complement to "convocation"',
      'Parenthetical clause'
    ],
    correctOptionIndex: 0,
    explanation: 'The nominal clause "What the governor said at the convocation" functions as the complete grammatical subject of the main finite verb "impressed".',
    keyConcept: 'Nominal Clauses and Syntactic Functions',
    oauExamTip: 'To test if a clause is a noun clause acting as subject, replace the entire clause with the pronoun "It" or "That thing". "It impressed the scholars" makes complete sense!',
    difficulty: 'medium'
  },
  {
    id: 'eng_08',
    subjectId: 'english',
    subjectName: 'English Language',
    year: '2021 OAU Post-UTME',
    topic: 'Stress Pattern',
    questionText: 'Which syllable carries the primary stress in the word: P-H-O-T-O-G-R-A-P-H-Y?',
    options: [
      'First syllable (PHO-)',
      'Second syllable (-TOG-)',
      'Third syllable (-RA-)',
      'Fourth syllable (-PHY)',
      'Stress is neutral'
    ],
    correctOptionIndex: 1,
    explanation: 'In words ending with "-graphy", "-logy", or "-metry", the primary stress falls on the antepenultimate syllable (third from the end). For "pho-TOG-ra-phy", the stress is on the second syllable: /fəˈtɒɡ.rə.fi/. Note contrast with "PHO-to-graph".',
    keyConcept: 'Stress shift in morphological derivatives',
    oauExamTip: 'Rule: Suffixes ending in -graphy, -logy, -cracy, -sophy always pull stress to the syllable immediately preceding them.',
    difficulty: 'hard'
  },

  // ================= MATHEMATICS =================
  {
    id: 'mth_01',
    subjectId: 'mathematics',
    subjectName: 'Mathematics',
    year: '2023 OAU Post-UTME',
    topic: 'Calculus - Differentiation & Tangents',
    questionText: 'Find the gradient of the tangent to the curve y = 3x³ - 5x² + 4x - 7 at the point where x = 2.',
    options: [
      '20',
      '18',
      '24',
      '16',
      '28'
    ],
    correctOptionIndex: 0,
    explanation: 'The gradient of the tangent is given by dy/dx. \ndy/dx = d/dx(3x³ - 5x² + 4x - 7) = 9x² - 10x + 4. \nSubstitute x = 2: \nGradient = 9(2)² - 10(2) + 4 = 9(4) - 20 + 4 = 36 - 20 + 4 = 20.',
    keyConcept: 'Calculus: Derivative as slope of tangent',
    oauExamTip: 'Differentiate term-by-term using the power rule d/dx(axⁿ) = n·a·xⁿ⁻¹, then plug in the given x coordinate.',
    difficulty: 'easy'
  },
  {
    id: 'mth_02',
    subjectId: 'mathematics',
    subjectName: 'Mathematics',
    year: '2022 OAU Post-UTME',
    topic: 'Logarithms & Indices',
    questionText: 'If log₁₀(x + 3) + log₁₀(x - 3) = log₁₀ 16, find the real positive value of x.',
    options: [
      '5',
      '4',
      '7',
      '3',
      '25'
    ],
    correctOptionIndex: 0,
    explanation: 'Using log law log(A) + log(B) = log(A × B): \nlog₁₀[(x + 3)(x - 3)] = log₁₀ 16 \n(x + 3)(x - 3) = 16 \nx² - 9 = 16 \nx² = 25 \nx = ±5. \nSince log argument must be positive (x - 3 > 0 => x > 3), x = 5.',
    keyConcept: 'Logarithmic identities and domain constraints',
    oauExamTip: 'Always verify that your answer satisfies the domain of the original logarithm: arguments must be strictly > 0.',
    difficulty: 'medium'
  },
  {
    id: 'mth_03',
    subjectId: 'mathematics',
    subjectName: 'Mathematics',
    year: '2024 OAU Post-UTME',
    topic: 'Matrices & Determinants',
    questionText: 'Given the 2x2 matrix A = [[k, 4], [3, k - 1]], find the values of k for which the matrix is singular.',
    options: [
      'k = 4 or k = -3',
      'k = 3 or k = -4',
      'k = 2 or k = -6',
      'k = 1 or k = 12',
      'k = 5 or k = -2'
    ],
    correctOptionIndex: 0,
    explanation: 'A matrix is singular if and only if its determinant is zero (det(A) = 0). \ndet(A) = (k)(k - 1) - (4)(3) = 0 \nk² - k - 12 = 0 \nFactoring: (k - 4)(k + 3) = 0 \nTherefore, k = 4 or k = -3.',
    keyConcept: 'Singular matrices and quadratic factorization',
    oauExamTip: 'Remember det([[a, b], [c, d]]) = ad - bc. For singular matrix, set ad - bc = 0.',
    difficulty: 'medium'
  },
  {
    id: 'mth_04',
    subjectId: 'mathematics',
    subjectName: 'Mathematics',
    year: '2023 OAU Post-UTME',
    topic: 'Trigonometry & Special Angles',
    questionText: 'Evaluate without using mathematical tables: (sin 60° · cos 30° + cos 60° · sin 30°)',
    options: [
      '1',
      '0.5',
      '√3 / 2',
      '0',
      '2'
    ],
    correctOptionIndex: 0,
    explanation: 'Using the compound angle identity sin(A + B) = sin A cos B + cos A sin B: \nsin(60° + 30°) = sin 90° = 1. \nAlternatively: (√3/2)(√3/2) + (1/2)(1/2) = 3/4 + 1/4 = 4/4 = 1.',
    keyConcept: 'Compound angle formula sin(A + B)',
    oauExamTip: 'Recognize the identity form immediately: sin A cos B + cos A sin B = sin(A + B). It saves you calculation time in CBT!',
    difficulty: 'easy'
  },
  {
    id: 'mth_05',
    subjectId: 'mathematics',
    subjectName: 'Mathematics',
    year: '2021 OAU Post-UTME',
    topic: 'Definite Integration - Area Under Curve',
    questionText: 'Evaluate the definite integral: ∫₀² (3x² - 4x + 1) dx',
    options: [
      '2',
      '4',
      '6',
      '0',
      '8'
    ],
    correctOptionIndex: 0,
    explanation: 'Indefinite integral: ∫(3x² - 4x + 1) dx = x³ - 2x² + x. \nEvaluate from 0 to 2: \n[ (2)³ - 2(2)² + (2) ] - [ 0³ - 2(0)² + 0 ] \n= [ 8 - 8 + 2 ] - 0 = 2.',
    keyConcept: 'Fundamental Theorem of Calculus',
    oauExamTip: 'Integrate xⁿ to xⁿ⁺¹/(n+1). Compute upper limit first, then subtract lower limit.',
    difficulty: 'medium'
  },
  {
    id: 'mth_06',
    subjectId: 'mathematics',
    subjectName: 'Mathematics',
    year: '2020 OAU Post-UTME',
    topic: 'Coordinate Geometry - Perpendicular Lines',
    questionText: 'Find the equation of the line passing through point (3, -2) and perpendicular to the line 2x + 5y = 10.',
    options: [
      '5x - 2y - 19 = 0',
      '2x + 5y - 4 = 0',
      '5x + 2y - 11 = 0',
      '2x - 5y - 16 = 0',
      '5x - 2y + 19 = 0'
    ],
    correctOptionIndex: 0,
    explanation: 'Rearrange 2x + 5y = 10 into y = mx + c: 5y = -2x + 10 => y = (-2/5)x + 2. Slope m₁ = -2/5. \nSince the lines are perpendicular, m₂ = -1/m₁ = 5/2. \nUsing point-slope equation: y - y₁ = m₂(x - x₁) \ny - (-2) = (5/2)(x - 3) \n2(y + 2) = 5(x - 3) \n2y + 4 = 5x - 15 \n5x - 2y - 19 = 0.',
    keyConcept: 'Perpendicular slope relation m₁·m₂ = -1',
    oauExamTip: 'Fast trick: A line perpendicular to Ax + By = C has the form Bx - Ay = K. Plug in (3, -2) => 5(3) - 2(-2) = 15 + 4 = 19. So 5x - 2y = 19!',
    difficulty: 'medium'
  },
  {
    id: 'mth_07',
    subjectId: 'mathematics',
    subjectName: 'Mathematics',
    year: '2022 OAU Post-UTME',
    topic: 'Combinatorics & Probability',
    questionText: 'In how many ways can a committee of 3 boys and 2 girls be selected from a class of 6 boys and 5 girls?',
    options: [
      '200',
      '120',
      '180',
      '240',
      '720'
    ],
    correctOptionIndex: 0,
    explanation: 'Number of ways = ⁶C₃ × ⁵C₂. \n⁶C₃ = (6 × 5 × 4) / (3 × 2 × 1) = 20. \n⁵C₂ = (5 × 4) / (2 × 1) = 10. \nTotal ways = 20 × 10 = 200.',
    keyConcept: 'Multiplication principle of independent combinations',
    oauExamTip: 'Selection without regard to order uses combinations (ⁿCᵣ), not permutations (ⁿPᵣ).',
    difficulty: 'easy'
  },

  // ================= PHYSICS =================
  {
    id: 'phy_01',
    subjectId: 'physics',
    subjectName: 'Physics',
    year: '2023 OAU Post-UTME',
    topic: 'Mechanics - Projectile Motion',
    questionText: 'A projectile is launched from ground level with an initial velocity of 40 m/s at an angle of 30° to the horizontal. Calculate the maximum height attained. (Take g = 10 m/s²)',
    options: [
      '20 m',
      '40 m',
      '10 m',
      '80 m',
      '25 m'
    ],
    correctOptionIndex: 0,
    explanation: 'Maximum height H = (u² sin² θ) / (2g). \nu = 40 m/s, θ = 30° (sin 30° = 0.5), g = 10 m/s². \nH = (40² × (0.5)²) / (2 × 10) \nH = (1600 × 0.25) / 20 = 400 / 20 = 20 m.',
    keyConcept: 'Kinematics of projectile trajectory',
    oauExamTip: 'Formula: H = (u sin θ)² / (2g). Vertical velocity component is u sin θ = 40(0.5) = 20 m/s. At peak, v_y = 0 => h = v_y² / (2g) = 400 / 20 = 20m.',
    difficulty: 'easy'
  },
  {
    id: 'phy_02',
    subjectId: 'physics',
    subjectName: 'Physics',
    year: '2022 OAU Post-UTME',
    topic: 'Optics - Lens Formula & Magnification',
    questionText: 'An object is placed 15 cm in front of a converging lens of focal length 10 cm. Find the position and nature of the image formed.',
    options: [
      '30 cm behind lens, Real and Inverted',
      '30 cm in front of lens, Virtual and Erect',
      '6 cm behind lens, Real and Diminished',
      '15 cm behind lens, Real and Same size',
      '25 cm behind lens, Virtual and Inverted'
    ],
    correctOptionIndex: 0,
    explanation: 'Lens equation: 1/f = 1/u + 1/v. \nFor converging lens, f = +10 cm, object distance u = +15 cm. \n1/v = 1/f - 1/u = 1/10 - 1/15 = (3 - 2)/30 = 1/30 \nv = +30 cm. \nPositive v indicates a real image formed on the other side (behind) the lens, which is naturally inverted.',
    keyConcept: 'Thin lens equation and sign conventions',
    oauExamTip: 'When u is between f and 2f (10cm < 15cm < 20cm), image is beyond 2f (>20cm), real, inverted, and magnified!',
    difficulty: 'medium'
  },
  {
    id: 'phy_03',
    subjectId: 'physics',
    subjectName: 'Physics',
    year: '2024 OAU Post-UTME',
    topic: 'Current Electricity - Internal Resistance',
    questionText: 'A cell of emf 2.0 V and internal resistance 0.5 Ω is connected across an external resistor of 4.5 Ω. Calculate the terminal potential difference across the cell.',
    options: [
      '1.8 V',
      '2.0 V',
      '0.2 V',
      '1.5 V',
      '0.9 V'
    ],
    correctOptionIndex: 0,
    explanation: 'Total circuit resistance R_total = R + r = 4.5 + 0.5 = 5.0 Ω. \nCircuit current I = E / (R + r) = 2.0 / 5.0 = 0.4 A. \nTerminal potential difference V = I × R = 0.4 × 4.5 = 1.8 V. \n(Or V = E - Ir = 2.0 - (0.4 × 0.5) = 2.0 - 0.2 = 1.8 V).',
    keyConcept: 'Electromotive force vs Terminal voltage',
    oauExamTip: 'V = E - Ir. The lost volts across internal resistance is Ir = 0.4(0.5) = 0.2V. 2.0 - 0.2 = 1.8V.',
    difficulty: 'easy'
  },
  {
    id: 'phy_04',
    subjectId: 'physics',
    subjectName: 'Physics',
    year: '2021 OAU Post-UTME',
    topic: 'Modern Physics - Photoelectric Effect',
    questionText: 'Light of frequency 8.0 × 10¹⁴ Hz is incident on a metal surface whose work function is 2.0 eV. Calculate the maximum kinetic energy of the emitted photoelectrons. (Take h = 6.63 × 10⁻³⁴ J·s, 1 eV = 1.6 × 10⁻¹⁹ J)',
    options: [
      '1.315 eV',
      '3.315 eV',
      '0.85 eV',
      '2.12 eV',
      '4.50 eV'
    ],
    correctOptionIndex: 0,
    explanation: 'Einstein\'s photoelectric equation: E = W₀ + K.E._max => K.E._max = hf - W₀. \nPhoton energy E = hf = (6.63 × 10⁻³⁴) × (8.0 × 10¹⁴) = 5.304 × 10⁻¹⁹ J. \nConvert E to eV: (5.304 × 10⁻¹⁹) / (1.6 × 10⁻¹⁹) = 3.315 eV. \nK.E._max = 3.315 eV - 2.0 eV = 1.315 eV.',
    keyConcept: 'Einstein\'s Photoelectric Equation',
    oauExamTip: 'Watch your units! Convert photon energy hf from Joules to electron-volts (eV) by dividing by 1.6 × 10⁻¹⁹ before subtracting work function.',
    difficulty: 'hard'
  },
  {
    id: 'phy_05',
    subjectId: 'physics',
    subjectName: 'Physics',
    year: '2020 OAU Post-UTME',
    topic: 'Waves & Sound - Resonance & Speed',
    questionText: 'A tuning fork of frequency 340 Hz produces fundamental resonance in a resonance tube closed at one end. If the speed of sound in air is 340 m/s, find the length of the air column (neglecting end correction).',
    options: [
      '0.25 m',
      '0.50 m',
      '1.00 m',
      '0.75 m',
      '0.125 m'
    ],
    correctOptionIndex: 0,
    explanation: 'For a pipe closed at one end, the fundamental wavelength is λ = v / f = 340 / 340 = 1.0 m. \nFundamental resonance occurs at L = λ / 4 = 1.0 / 4 = 0.25 m.',
    keyConcept: 'Standing acoustic waves in closed pipes',
    oauExamTip: 'Closed pipe fundamental: L = λ/4. Open pipe fundamental: L = λ/2. Remember closed pipes only support odd harmonics!',
    difficulty: 'medium'
  },

  // ================= CHEMISTRY =================
  {
    id: 'chm_01',
    subjectId: 'chemistry',
    subjectName: 'Chemistry',
    year: '2023 OAU Post-UTME',
    topic: 'Organic Chemistry - Isomerism & IUPAC',
    questionText: 'Which of the following organic compounds can exhibit optical isomerism (enantiomerism)?',
    options: [
      '2-hydroxypropanoic acid (Lactic acid)',
      'Propanoic acid',
      'Ethanol',
      '2-methylpropane',
      'Propan-2-ol'
    ],
    correctOptionIndex: 0,
    explanation: 'Optical isomerism requires a chiral carbon atom (a carbon bonded to four distinct groups or atoms). In lactic acid (CH₃-CH(OH)-COOH), the central carbon (C-2) is bonded to -H, -OH, -CH₃, and -COOH, making it asymmetric/chiral.',
    keyConcept: 'Chirality and Stereoisomerism',
    oauExamTip: 'Always sketch the carbon skeleton and verify that one carbon has 4 different groups attached.',
    difficulty: 'medium'
  },
  {
    id: 'chm_02',
    subjectId: 'chemistry',
    subjectName: 'Chemistry',
    year: '2022 OAU Post-UTME',
    topic: 'Stoichiometry & Gas Laws',
    questionText: 'What volume of oxygen at s.t.p. is required for the complete combustion of 5.6 dm³ of propane (C₃H₈) at s.t.p.?',
    options: [
      '28.0 dm³',
      '11.2 dm³',
      '22.4 dm³',
      '16.8 dm³',
      '5.6 dm³'
    ],
    correctOptionIndex: 0,
    explanation: 'Balanced combustion equation: C₃H₈(g) + 5O₂(g) → 3CO₂(g) + 4H₂O(l). \nBy Gay-Lussac\'s law of combining volumes at constant T and P: \n1 volume of C₃H₈ requires 5 volumes of O₂. \nVolume of O₂ = 5.6 dm³ × 5 = 28.0 dm³.',
    keyConcept: 'Stoichiometry of hydrocarbon combustion & Avogadro\'s law',
    oauExamTip: 'Balance the hydrocarbon combustion equation: C_x H_y + (x + y/4)O₂ → xCO₂ + (y/2)H₂O. Here (3 + 8/4) = 5. Multiply 5 × 5.6 = 28.0 dm³.',
    difficulty: 'easy'
  },
  {
    id: 'chm_03',
    subjectId: 'chemistry',
    subjectName: 'Chemistry',
    year: '2024 OAU Post-UTME',
    topic: 'Electrochemistry - Faraday\'s Laws',
    questionText: 'A current of 2.5 A is passed through a solution of copper(II) tetraoxosulphate(VI) for 32 minutes and 10 seconds. Calculate the mass of copper deposited. (Cu = 64, 1 Faraday = 96500 C)',
    options: [
      '1.60 g',
      '3.20 g',
      '0.80 g',
      '6.40 g',
      '0.40 g'
    ],
    correctOptionIndex: 0,
    explanation: 'Time in seconds: t = (32 × 60) + 10 = 1920 + 10 = 1930 s. \nQuantity of charge Q = I × t = 2.5 A × 1930 s = 4825 C. \nFor Cu²⁺ + 2e⁻ → Cu: 2 Faradays (2 × 96500 C = 193000 C) deposits 64 g of Cu. \nMass deposited m = (Q × M) / (n × F) = (4825 × 64) / (2 × 96500) = (308800) / 193000 = 1.60 g.',
    keyConcept: 'Faraday\'s First and Second Laws of Electrolysis',
    oauExamTip: 'Formula m = (I · t · Molar mass) / (valence · 96500). Notice that 1930 / 96500 = 1/50 = 0.02. Then (2.5 × 0.02 × 64)/2 = 1.60 g.',
    difficulty: 'medium'
  },
  {
    id: 'chm_04',
    subjectId: 'chemistry',
    subjectName: 'Chemistry',
    year: '2021 OAU Post-UTME',
    topic: 'Chemical Equilibrium - Le Chatelier\'s Principle',
    questionText: 'For the exothermic reaction: N₂(g) + 3H₂(g) ⇌ 2NH₃(g) (ΔH = -92 kJ/mol), which set of conditions will maximize the equilibrium yield of ammonia (NH₃)?',
    options: [
      'Low temperature and high pressure',
      'High temperature and low pressure',
      'High temperature and high pressure',
      'Low temperature and low pressure',
      'Addition of a positive catalyst alone'
    ],
    correctOptionIndex: 0,
    explanation: 'According to Le Chatelier\'s principle: 1) Because the forward reaction is exothermic (ΔH < 0), lowering temperature shifts equilibrium toward the forward exothermic direction. 2) There are 4 moles of gaseous reactants and 2 moles of product; increasing pressure shifts equilibrium toward fewer gas moles (forward). Hence, low temperature and high pressure maximize yield.',
    keyConcept: 'Le Chatelier\'s Principle in the Haber Process',
    oauExamTip: 'Exothermic (ΔH < 0): low T favors products. Fewer gas moles on right: high P favors products.',
    difficulty: 'easy'
  },
  {
    id: 'chm_05',
    subjectId: 'chemistry',
    subjectName: 'Chemistry',
    year: '2020 OAU Post-UTME',
    topic: 'Periodicity & Electronic Configuration',
    questionText: 'An element X has the ground state electronic configuration 1s² 2s² 2p⁶ 3s² 3p⁴. What is the group, period, and oxidation state commonly exhibited by X in its hydride?',
    options: [
      'Group 16 (VIA), Period 3, -2',
      'Group 14 (IVA), Period 3, +4',
      'Group 15 (VA), Period 2, -3',
      'Group 17 (VIIA), Period 3, -1',
      'Group 16 (VIA), Period 4, +2'
    ],
    correctOptionIndex: 0,
    explanation: 'Highest principal quantum number n = 3 (Period 3). Valence electrons = 3s² + 3p⁴ = 6 electrons (Group 16 / VIA, Oxygen family / Chalcogens, element is Sulphur). To complete its octet with hydrogen (e.g. H₂S), it accepts 2 electrons, exhibiting an oxidation state of -2.',
    keyConcept: 'Electronic configurations and Periodic Law',
    oauExamTip: 'Valence s + p electrons determine main group number (2+4 = 6 => Group 16/VIA). Principal quantum number n gives period.',
    difficulty: 'easy'
  },

  // ================= BIOLOGY =================
  {
    id: 'bio_01',
    subjectId: 'biology',
    subjectName: 'Biology',
    year: '2023 OAU Post-UTME',
    topic: 'Genetics - Mendelian Inheritance',
    questionText: 'In humans, normal skin pigmentation is dominant over albinism (a). If a heterozygous carrier man (Aa) marries an albino woman (aa), what is the probability that their first child will be an albino?',
    options: [
      '50% (1/2)',
      '25% (1/4)',
      '75% (3/4)',
      '100% (1/1)',
      '0% (0/4)'
    ],
    correctOptionIndex: 0,
    explanation: 'Cross: Aa × aa. Gametes from father: A, a; gametes from mother: a, a. Offspring genotypes: 2 Aa (normal carriers) : 2 aa (albino). Phenotypic ratio is 1:1, meaning there is a 50% probability (1/2) for any child to be an albino.',
    keyConcept: 'Monohybrid testcross and autosomal recessive traits',
    oauExamTip: 'Punnett square of Aa × aa gives: Aa, Aa, aa, aa. Half are aa (albino). Probability is 2/4 = 50%.',
    difficulty: 'easy'
  },
  {
    id: 'bio_02',
    subjectId: 'biology',
    subjectName: 'Biology',
    year: '2022 OAU Post-UTME',
    topic: 'Human Physiology - Renal System & Osmoregulation',
    questionText: 'In which part of the mammalian nephron does the greatest percentage of water, glucose, and amino acids get reabsorbed back into the peritubular capillaries?',
    options: [
      'Proximal convoluted tubule',
      'Distal convoluted tubule',
      'Loop of Henle',
      'Collecting duct',
      'Bowman\'s capsule'
    ],
    correctOptionIndex: 0,
    explanation: 'The proximal convoluted tubule (PCT) has extensive microvilli (brush border) and dense mitochondria that drive active and passive reabsorption of ~65-70% of water and ions, and 100% of filtered glucose and amino acids under normal conditions.',
    keyConcept: 'Selective reabsorption in renal tubules',
    oauExamTip: 'PCT = Bulk reabsorption (all glucose & amino acids, majority of water). DCT & Collecting duct = hormonal fine-tuning by ADH and Aldosterone.',
    difficulty: 'medium'
  },
  {
    id: 'bio_03',
    subjectId: 'biology',
    subjectName: 'Biology',
    year: '2024 OAU Post-UTME',
    topic: 'Plant Physiology - Transport Mechanisms',
    questionText: 'The upward movement of water and mineral salts from roots to the leaves of tall trees against gravity is primarily driven by:',
    options: [
      'Transpiration pull, cohesion, and adhesion forces',
      'Root pressure alone',
      'Phloem translocation and cytoplasmic streaming',
      'Guttation and active secretion',
      'Atmospheric pressure pushing into stomata'
    ],
    correctOptionIndex: 0,
    explanation: 'According to the Cohesion-Tension theory (Dixon and Joly), transpiration of water from mesophyll leaves creates a negative hydrostatic tension (transpiration pull). Water molecules stick together (cohesion via hydrogen bonds) and adhere to xylem walls (adhesion), lifting the unbroken continuous water column to great heights.',
    keyConcept: 'Cohesion-Tension Theory in Xylem Transport',
    oauExamTip: 'Remember the acronym CAT: Cohesion, Adhesion, Transpiration pull for xylem sap movement.',
    difficulty: 'easy'
  },
  {
    id: 'bio_04',
    subjectId: 'biology',
    subjectName: 'Biology',
    year: '2021 OAU Post-UTME',
    topic: 'Cell Biology & Organelles',
    questionText: 'Which organelle is responsible for the synthesis of lipids, detoxification of drugs and poisons, and storage of calcium ions in muscle cells?',
    options: [
      'Smooth endoplasmic reticulum',
      'Rough endoplasmic reticulum',
      'Golgi apparatus',
      'Lysosome',
      'Peroxisome'
    ],
    correctOptionIndex: 0,
    explanation: 'The Smooth Endoplasmic Reticulum (SER) lacks ribosomes and specializes in lipid synthesis, steroid hormone production, hepatic drug detoxification, and calcium sequestration (as the sarcoplasmic reticulum in myocytes).',
    keyConcept: 'Cellular ultrastructure and organelle compartmentalization',
    oauExamTip: 'Rough ER = Protein synthesis (has ribosomes). Smooth ER = Lipid synthesis + detoxification + calcium storage.',
    difficulty: 'easy'
  },
  {
    id: 'bio_05',
    subjectId: 'biology',
    subjectName: 'Biology',
    year: '2020 OAU Post-UTME',
    topic: 'Ecology - Energy Flow & Trophic Levels',
    questionText: 'In an ecological pyramid of energy, if the primary producers fix 10,000 kJ of solar energy into chemical energy, approximately how much energy is transferred to the secondary consumers according to Lindeman\'s 10% law?',
    options: [
      '100 kJ',
      '1,000 kJ',
      '10 kJ',
      '1 kJ',
      '500 kJ'
    ],
    correctOptionIndex: 0,
    explanation: 'According to Lindeman\'s Law of Trophic Efficiency, only ~10% of energy is transferred from one trophic level to the next: \nTrophic Level 1 (Producers): 10,000 kJ \nTrophic Level 2 (Primary Consumers / Herbivores): 10% of 10,000 = 1,000 kJ \nTrophic Level 3 (Secondary Consumers / Carnivores): 10% of 1,000 = 100 kJ.',
    keyConcept: 'Lindeman\'s 10% Rule of Ecological Efficiency',
    oauExamTip: 'Each step up the food chain loses 90% as metabolic heat/respiration. Move the decimal point one place left for each level!',
    difficulty: 'medium'
  },

  // ================= ECONOMICS =================
  {
    id: 'eco_01',
    subjectId: 'economics',
    subjectName: 'Economics',
    year: '2023 OAU Post-UTME',
    topic: 'Price Elasticity of Demand',
    questionText: 'If a 10% increase in the price of a commodity leads to a 25% decrease in the quantity demanded, the price elasticity coefficient is ________ and demand is said to be ________.',
    options: [
      '2.5; Elastic',
      '0.4; Inelastic',
      '1.0; Unitary elastic',
      '2.5; Perfectly inelastic',
      '0.25; Inelastic'
    ],
    correctOptionIndex: 0,
    explanation: 'Price Elasticity of Demand (Ped) = (% change in Quantity Demanded) / (% change in Price) = 25% / 10% = 2.5. Since |Ped| > 1, the demand is price elastic.',
    keyConcept: 'Calculating and classifying Price Elasticity of Demand',
    oauExamTip: '|Ped| > 1 is Elastic; |Ped| < 1 is Inelastic; |Ped| = 1 is Unitary. Ped = %ΔQd / %ΔP.',
    difficulty: 'easy'
  },
  {
    id: 'eco_02',
    subjectId: 'economics',
    subjectName: 'Economics',
    year: '2022 OAU Post-UTME',
    topic: 'Market Structures & Perfect Competition',
    questionText: 'In the short-run equilibrium of a perfectly competitive firm, profit is maximized at the output level where:',
    options: [
      'Price (P) = Marginal Cost (MC) with MC rising',
      'Total Revenue = Total Cost',
      'Average Variable Cost is at its minimum',
      'Price = Average Fixed Cost',
      'Marginal Revenue = Average Revenue alone'
    ],
    correctOptionIndex: 0,
    explanation: 'A competitive firm maximizes profit where Marginal Revenue (MR) = Marginal Cost (MC). Because price is given (P = MR = AR), profit maximization requires P = MC, provided MC is cutting MR from below (MC is rising).',
    keyConcept: 'Profit Maximization Conditions in Perfect Competition',
    oauExamTip: 'Universal golden rule of profit maximization: MR = MC. In perfect competition, P = MR = AR, so P = MC.',
    difficulty: 'medium'
  },
  {
    id: 'eco_03',
    subjectId: 'economics',
    subjectName: 'Economics',
    year: '2024 OAU Post-UTME',
    topic: 'Macroeconomics - Multiplier & Keynesian Theory',
    questionText: 'If the Marginal Propensity to Consume (MPC) in an economy is 0.8, calculate the value of the investment multiplier (k).',
    options: [
      '5',
      '1.25',
      '0.8',
      '4',
      '10'
    ],
    correctOptionIndex: 0,
    explanation: 'The multiplier k = 1 / (1 - MPC) = 1 / MPS. \nk = 1 / (1 - 0.8) = 1 / 0.2 = 5. \nThis means an increase in autonomous investment of ₦1 billion will expand national income by ₦5 billion.',
    keyConcept: 'Keynesian Investment Multiplier',
    oauExamTip: 'Formula: k = 1 / (1 - MPC). If MPC = 0.75, k = 4; if MPC = 0.8, k = 5; if MPC = 0.9, k = 10.',
    difficulty: 'easy'
  },
  {
    id: 'eco_04',
    subjectId: 'economics',
    subjectName: 'Economics',
    year: '2021 OAU Post-UTME',
    topic: 'Public Finance & Fiscal Policy',
    questionText: 'A tax system where the tax rate increases as the taxpayer\'s income increases is classified as a:',
    options: [
      'Progressive tax',
      'Regressive tax',
      'Proportional tax',
      'Ad valorem tax',
      'Specific excise tax'
    ],
    correctOptionIndex: 0,
    explanation: 'A progressive tax charges a higher percentage rate on higher income brackets (e.g. Pay-As-You-Earn / PAYE in Nigeria). In contrast, proportional taxes maintain a flat rate, and regressive taxes take a larger percentage from low-income earners.',
    keyConcept: 'Principles of Taxation & Income Redistribution',
    oauExamTip: 'Progressive: Higher income = Higher rate. Regressive: Higher income = Lower effective rate.',
    difficulty: 'easy'
  },

  // ================= GOVERNMENT =================
  {
    id: 'gov_01',
    subjectId: 'government',
    subjectName: 'Government',
    year: '2023 OAU Post-UTME',
    topic: 'Constitutional Development in Nigeria',
    questionText: 'Which pre-independence Nigerian constitution first introduced the elective principle that allowed the election of four members into the Legislative Council (three from Lagos and one from Calabar)?',
    options: [
      'Clifford Constitution of 1922',
      'Richards Constitution of 1946',
      'Macpherson Constitution of 1951',
      'Lyttelton Constitution of 1954',
      'Independence Constitution of 1960'
    ],
    correctOptionIndex: 0,
    explanation: 'The Hugh Clifford Constitution of 1922 introduced the historic Elective Principle in Nigeria, granting the franchise to qualified male adult taxpayers in Lagos (3 seats) and Calabar (1 seat), which stimulated the formation of Nigeria\'s first political party (NNDP by Herbert Macaulay in 1923).',
    keyConcept: 'Colonial Constitutional Evolution in Nigeria',
    oauExamTip: 'Clifford (1922) = Elective principle (Lagos 3, Calabar 1). Richards (1946) = Regionalism (North, West, East). Lyttelton (1954) = True Federalism.',
    difficulty: 'easy'
  },
  {
    id: 'gov_02',
    subjectId: 'government',
    subjectName: 'Government',
    year: '2022 OAU Post-UTME',
    topic: 'Federalism & Division of Powers',
    questionText: 'Under the 1999 Constitution of the Federal Republic of Nigeria, subjects listed on the Exclusive Legislative List can be legislated upon ONLY by:',
    options: [
      'The National Assembly (Federal Legislature)',
      'State Houses of Assembly',
      'Local Government Councils',
      'Both National Assembly and State Houses',
      'The Federal Executive Council'
    ],
    correctOptionIndex: 0,
    explanation: 'In Nigerian federalism, the Exclusive Legislative List (containing matters such as defence, foreign affairs, currency, customs, and aviation) is the exclusive preserve of the Federal Legislature (National Assembly). The Concurrent List allows both federal and state legislation.',
    keyConcept: 'Legislative Lists in the 1999 Constitution',
    oauExamTip: 'Exclusive List = Federal only. Concurrent List = Federal and State (Federal prevails if conflict). Residual List = State only.',
    difficulty: 'easy'
  },
  {
    id: 'gov_03',
    subjectId: 'government',
    subjectName: 'Government',
    year: '2024 OAU Post-UTME',
    topic: 'Political Systems & Separation of Powers',
    questionText: 'In a Parliamentary or Cabinet system of government, the concept of "Collective Responsibility" implies that:',
    options: [
      'All cabinet ministers must publicly support government policy decisions or resign',
      'The Head of State is personally accountable for cabinet blunders',
      'Citizens must take responsibility for parliamentary debts',
      'The Judiciary shares legislative powers with the Prime Minister',
      'Ministers cannot be questioned during Parliamentary Question Time'
    ],
    correctOptionIndex: 0,
    explanation: 'Collective responsibility is a cornerstone of Westminster parliamentary systems: all cabinet members share joint responsibility for government decisions. A minister who disagrees must either uphold the policy or resign from office.',
    keyConcept: 'Cabinet System Features and Conventions',
    oauExamTip: 'Parliamentary = Fusion of powers + Collective Responsibility + Dual Executive (Head of State vs Head of Govt).',
    difficulty: 'medium'
  },
  {
    id: 'gov_04',
    subjectId: 'government',
    subjectName: 'Government',
    year: '2021 OAU Post-UTME',
    topic: 'International Organizations - ECOWAS & AU',
    questionText: 'The Economic Community of West African States (ECOWAS) was formally established by the Treaty of Lagos signed on 28th May 1975 under the joint leadership of General Yakubu Gowon of Nigeria and:',
    options: [
      'President Gnassingbé Eyadéma of Togo',
      'President Félix Houphouët-Boigny of Côte d\'Ivoire',
      'President Léopold Sédar Senghor of Senegal',
      'President Kwame Nkrumah of Ghana',
      'President Sekou Touré of Guinea'
    ],
    correctOptionIndex: 0,
    explanation: 'ECOWAS was founded through the joint diplomatic shuttle and collaboration between General Yakubu Gowon (Head of State of Nigeria) and President Gnassingbé Eyadéma of Togo, culminating in the Treaty of Lagos on May 28, 1975.',
    keyConcept: 'Regional Integration and Nigerian Foreign Policy',
    oauExamTip: 'Remember Gowon (Nigeria) & Eyadéma (Togo) as the co-architects of ECOWAS Treaty in 1975.',
    difficulty: 'medium'
  },

  // ================= LITERATURE IN ENGLISH =================
  {
    id: 'lit_01',
    subjectId: 'literature',
    subjectName: 'Literature in English',
    year: '2023 OAU Post-UTME',
    topic: 'Literary Devices & Figures of Speech',
    questionText: 'Read the excerpt: "The leaves whispered secrets in the gentle autumn breeze as the moonlight danced on the rippling lake." The dominant literary device in this sentence is:',
    options: [
      'Personification',
      'Oxymoron',
      'Synecdoche',
      'Hyperbole',
      'Litotes'
    ],
    correctOptionIndex: 0,
    explanation: 'Personification attributes human qualities ("whispered secrets", "danced") to non-human or inanimate objects (leaves and moonlight).',
    keyConcept: 'Figurative Language - Personification',
    oauExamTip: 'When inanimate objects perform human acts (whispering, dancing, weeping), it is personification.',
    difficulty: 'easy'
  },
  {
    id: 'lit_02',
    subjectId: 'literature',
    subjectName: 'Literature in English',
    year: '2022 OAU Post-UTME',
    topic: 'Poetic Forms & Prosody',
    questionText: 'A fourteen-line poem written in iambic pentameter consisting of an octave (eight lines with abbaabba rhyme scheme) and a sestet (six lines with cdecde or cdcdcd rhyme scheme) is known as a(n):',
    options: [
      'Petrarchan (Italian) Sonnet',
      'Shakespearean (English) Sonnet',
      'Spenserian Sonnet',
      'Elegy',
      'Villanelle'
    ],
    correctOptionIndex: 0,
    explanation: 'The Petrarchan (or Italian) sonnet is divided into an octave (rhyming abbaabba) presenting a problem/question, and a sestet (rhyming cdecde or cdcdcd) providing a resolution, separated by the "volta" (turn). Shakespearean sonnets have 3 quatrains and a rhyming couplet (abab cdcd efef gg).',
    keyConcept: 'Sonnet structures: Italian vs English forms',
    oauExamTip: 'Octave + Sestet (abbaabba) = Petrarchan / Italian. 3 Quatrains + Couplet (abab cdcd efef gg) = Shakespearean / English.',
    difficulty: 'medium'
  },
  {
    id: 'lit_03',
    subjectId: 'literature',
    subjectName: 'Literature in English',
    year: '2024 OAU Post-UTME',
    topic: 'Dramatic Terms - Soliloquy & Hubris',
    questionText: 'In classical tragedy, the tragic flaw or error of judgment in the protagonist that leads directly to their downfall is termed:',
    options: [
      'Hamartia',
      'Hubris',
      'Catharsis',
      'Anagnorisis',
      'Peripeteia'
    ],
    correctOptionIndex: 0,
    explanation: 'According to Aristotle\'s Poetics, "Hamartia" is the tragic flaw or mistake in judgment that initiates the tragic hero\'s downfall. (Hubris is excessive pride, which is a specific form of hamartia).',
    keyConcept: 'Aristotelian Dramatic Conventions in Tragedy',
    oauExamTip: 'Hamartia = Tragic flaw; Anagnorisis = Moment of critical discovery; Peripeteia = Reversal of fortune; Catharsis = Purgation of pity and fear.',
    difficulty: 'hard'
  },

  // ================= CHRISTIAN RELIGIOUS KNOWLEDGE (CRK) =================
  {
    id: 'crk_01',
    subjectId: 'crk',
    subjectName: 'Christian Religious Knowledge',
    year: '2023 OAU Post-UTME',
    topic: 'Old Testament - Faith & Courage',
    questionText: 'When King Nebuchadnezzar commanded everyone to fall down and worship the golden image in the plain of Dura, the three Hebrew young men Shadrach, Meshach, and Abednego declared that:',
    options: [
      'Their God is able to deliver them from the burning fiery furnace, but even if He does not, they will never serve the king\'s gods',
      'They would worship in secret while bowing outwardly to avoid the furnace',
      'The king had no legal authority over Jewish captives',
      'Daniel would pray to stop the furnace fire before sundown',
      'They requested a seven-day trial period of eating pulse and drinking water'
    ],
    correctOptionIndex: 0,
    explanation: 'In Daniel 3:16-18, Shadrach, Meshach, and Abednego displayed uncompromising faith: "Our God whom we serve is able to deliver us... but if not, be it known unto thee, O king, that we will not serve thy gods."',
    keyConcept: 'Uncompromising devotion and divine deliverance in Daniel 3',
    oauExamTip: 'Focus on key statements in biblical narratives. "But if not..." epitomizes absolute, non-conditional trust in God.',
    difficulty: 'easy'
  },
  {
    id: 'crk_02',
    subjectId: 'crk',
    subjectName: 'Christian Religious Knowledge',
    year: '2022 OAU Post-UTME',
    topic: 'The Early Church & Apostles',
    questionText: 'According to Acts of the Apostles chapter 6, the seven deacons (including Stephen and Philip) were chosen and ordained primarily to:',
    options: [
      'Oversee the daily distribution of food to widows so the Apostles could devote themselves to prayer and the ministry of the Word',
      'Lead the missionary journey to Antioch and Rome',
      'Collect taxes for the Roman governor in Jerusalem',
      'Write the official history of the Pentecost event',
      'Debate the Sanhedrin on circumcision controversies'
    ],
    correctOptionIndex: 0,
    explanation: 'In Acts 6:1-6, a murmuring arose among the Grecian Jews that their widows were neglected in the daily ministration. The Apostles instructed the brethren to choose seven men full of the Holy Ghost and wisdom to serve tables, freeing the Apostles for prayer and ministry of the Word.',
    keyConcept: 'Church administration and spiritual delegation in Acts 6',
    oauExamTip: 'Seven deacons: Qualifications were good reputation, full of the Holy Spirit, and full of wisdom.',
    difficulty: 'medium'
  },
  {
    id: 'crk_03',
    subjectId: 'crk',
    subjectName: 'Christian Religious Knowledge',
    year: '2024 OAU Post-UTME',
    topic: 'Pauline Epistles - Faith & Justification',
    questionText: 'In his epistle to the Galatians (Galatians 5:22-23), Apostle Paul lists the fruit of the Spirit. Which of the following is NOT included in the nine-fold fruit of the Spirit?',
    options: [
      'Prosperity and material wealth',
      'Love, joy, and peace',
      'Longsuffering, gentleness, and goodness',
      'Faith, meekness, and temperance',
      'Patience and self-control'
    ],
    correctOptionIndex: 0,
    explanation: 'Galatians 5:22-23 lists the 9-fold fruit of the Spirit as: Love, Joy, Peace, Longsuffering (Patience), Gentleness (Kindness), Goodness, Faith (Faithfulness), Meekness (Gentleness), Temperance (Self-control). Material wealth/prosperity is not one of them.',
    keyConcept: 'Fruit of the Spirit vs Works of the Flesh',
    oauExamTip: 'Notice the singular "fruit" (one unified Christian character consisting of 9 virtues).',
    difficulty: 'easy'
  },

  // ================= FINANCIAL ACCOUNTING =================
  {
    id: 'acc_01',
    subjectId: 'accounting',
    subjectName: 'Financial Accounting',
    year: '2023 OAU Post-UTME',
    topic: 'Accounting Principles & Concepts',
    questionText: 'Which accounting concept states that revenue should only be recognized and recorded in the books of account when it is realized (earned), and not merely when an order is placed or cash is promised?',
    options: [
      'Realization (Revenue Recognition) Concept',
      'Going Concern Concept',
      'Prudence (Conservatism) Concept',
      'Matching Concept',
      'Materiality Concept'
    ],
    correctOptionIndex: 0,
    explanation: 'The Realization Concept states that revenue is recognized in the period when goods or services have been delivered to the customer and a legal obligation to pay has been established.',
    keyConcept: 'Fundamental Accounting Concepts and Conventions',
    oauExamTip: 'Realization = Revenue recognized when earned. Matching = Expenses matched to generated revenue in that period.',
    difficulty: 'easy'
  },
  {
    id: 'acc_02',
    subjectId: 'accounting',
    subjectName: 'Financial Accounting',
    year: '2022 OAU Post-UTME',
    topic: 'Depreciation - Straight Line Method',
    questionText: 'A delivery van was purchased for ₦4,500,000 with an estimated useful life of 5 years and a residual scrap value of ₦500,000. Using the straight-line method, calculate the annual depreciation charge.',
    options: [
      '₦800,000',
      '₦900,000',
      '₦1,000,000',
      '₦750,000',
      '₦850,000'
    ],
    correctOptionIndex: 0,
    explanation: 'Straight-line annual depreciation = (Cost - Residual Value) / Useful Life \n= (₦4,500,000 - ₦500,000) / 5 \n= ₦4,000,000 / 5 = ₦800,000 per annum.',
    keyConcept: 'Fixed asset depreciation calculation',
    oauExamTip: 'Annual Depreciation = (Cost - Scrap Value) / Life in Years. Always subtract scrap value first!',
    difficulty: 'easy'
  },
  {
    id: 'acc_03',
    subjectId: 'accounting',
    subjectName: 'Financial Accounting',
    year: '2024 OAU Post-UTME',
    topic: 'Trial Balance & Accounting Errors',
    questionText: 'An error of principle occurs in accounting when:',
    options: [
      'A transaction violates fundamental accounting principles (e.g. treating capital expenditure as revenue expenditure)',
      'The figures of a transaction are completely omitted from the subsidiary books',
      'The debit entry of one transaction compensates for the credit error in another',
      'A correct amount is entered into the wrong personal account of the same class',
      'An entry is made on the wrong side of both affected accounts'
    ],
    correctOptionIndex: 0,
    explanation: 'An error of principle occurs when an entry breaches fundamental accounting principles, notably confusing capital expenditure (e.g. buying machinery) with revenue expenditure (e.g. paying machine repairs).',
    keyConcept: 'Classification of Errors not affecting Trial Balance agreement',
    oauExamTip: 'Error of Commission = Wrong personal account. Error of Principle = Wrong category of account (Capital vs Revenue).',
    difficulty: 'medium'
  },
  {
    id: 'acc_04',
    subjectId: 'accounting',
    subjectName: 'Financial Accounting',
    year: '2021 OAU Post-UTME',
    topic: 'Partnership Accounts - Goodwill & Profit Sharing',
    questionText: 'Ade and Bola share profits and losses in the ratio 3:2. If total net profit for the year is ₦1,200,000 and partner Ade is entitled to a salary of ₦200,000 before distribution, what is Bola\'s share of profit?',
    options: [
      '₦400,000',
      '₦480,000',
      '₦600,000',
      '₦360,000',
      '₦500,000'
    ],
    correctOptionIndex: 0,
    explanation: 'Divisible profit after partner salary = ₦1,200,000 - ₦200,000 = ₦1,000,000. \nBola\'s share = 2 / (3 + 2) × ₦1,000,000 = 2/5 × ₦1,000,000 = ₦400,000.',
    keyConcept: 'Partnership Profit and Loss Appropriation',
    oauExamTip: 'Deduct salary, interest on capital, and other partner appropriations from Net Profit first before applying the profit-sharing ratio.',
    difficulty: 'medium'
  },
  {
    id: 'lit_04',
    subjectId: 'literature',
    subjectName: 'Literature in English',
    year: '2023 OAU Post-UTME',
    topic: 'African Prose & Narrative Techniques',
    questionText: 'A narrative technique where the story begins in the middle of the action or plot rather than at the chronological starting point is known as:',
    options: [
      'In medias res',
      'Deus ex machina',
      'Foreshadowing',
      'Stream of consciousness',
      'Dramatic monologue'
    ],
    correctOptionIndex: 0,
    explanation: '"In medias res" is Latin for "into the middle of things", describing a literary narrative that begins in the midst of the plot rather than from the chronological origin.',
    keyConcept: 'Narrative structures in prose and epics',
    oauExamTip: 'Latin literary phrases are very common in OAU Literature tests (In medias res, Deus ex machina, Carpe diem).',
    difficulty: 'medium'
  },
  {
    id: 'lit_05',
    subjectId: 'literature',
    subjectName: 'Literature in English',
    year: '2021 OAU Post-UTME',
    topic: 'Figures of Speech - Sound Devices',
    questionText: 'Identify the figure of speech in the line: "The sizzling sausages slowly sizzled on the silver skillet."',
    options: [
      'Alliteration and Onomatopoeia',
      'Irony and Sarcasm',
      'Hyperbole and Euphemism',
      'Metonymy and Apostrophe',
      'Synecdoche and Litotes'
    ],
    correctOptionIndex: 0,
    explanation: 'The repetition of the initial consonant /s/ sound is Alliteration ("sizzling sausages slowly sizzled silver skillet"), while "sizzling" imitates the natural acoustic sound of frying meat, which is Onomatopoeia.',
    keyConcept: 'Phonological literary devices',
    oauExamTip: 'Repeated initial consonant sound = Alliteration. Words imitating actual sounds = Onomatopoeia.',
    difficulty: 'easy'
  },
  {
    id: 'crk_04',
    subjectId: 'crk',
    subjectName: 'Christian Religious Knowledge',
    year: '2023 OAU Post-UTME',
    topic: 'The Gospels - The Sermon on the Mount',
    questionText: 'In the Beatitudes (Matthew 5:8), Jesus Christ declared: "Blessed are the pure in heart, for they shall ________."',
    options: [
      'see God',
      'inherit the earth',
      'be called the children of God',
      'obtain mercy',
      'be comforted'
    ],
    correctOptionIndex: 0,
    explanation: 'Matthew 5:8 states: "Blessed are the pure in heart: for they shall see God." (Blessed are the meek = inherit the earth; Blessed are the peacemakers = called children of God; Blessed are the merciful = obtain mercy).',
    keyConcept: 'The Beatitudes in Matthew 5',
    oauExamTip: 'Match each Beatitude virtue with its precise divine reward in Matthew 5:3-12.',
    difficulty: 'easy'
  },
  {
    id: 'crk_05',
    subjectId: 'crk',
    subjectName: 'Christian Religious Knowledge',
    year: '2021 OAU Post-UTME',
    topic: 'Old Testament - Leadership & Wisdom',
    questionText: 'When God appeared to young King Solomon in a dream at Gibeon and asked what he desired, Solomon requested for:',
    options: [
      'An understanding heart and wisdom to judge God\'s great people',
      'Long life and victory over the Philistines',
      'Gold, silver, and immense royal wealth',
      'A majestic temple built with cedars of Lebanon',
      'Multiple alliances with surrounding nations'
    ],
    correctOptionIndex: 0,
    explanation: 'In 1 Kings 3:5-14, Solomon acknowledged his youth and asked God for "an understanding heart to judge thy people, that I may discern between good and bad", which pleased the Lord.',
    keyConcept: 'Divine wisdom and humility in godly leadership',
    oauExamTip: 'Solomon chose wisdom over riches/long life, and God granted him both wisdom and unprecedented honor.',
    difficulty: 'easy'
  },
  {
    id: 'gov_05',
    subjectId: 'government',
    subjectName: 'Government',
    year: '2023 OAU Post-UTME',
    topic: 'Pre-Colonial Political Systems',
    questionText: 'In the pre-colonial Yoruba political system (Old Oyo Empire), the supreme council of kingmakers headed by the Bashorun who acted as a constitutional check on the powers of the Alaafin was the:',
    options: [
      'Oyomesi',
      'Ogboni Society',
      'Eso Ikoyi',
      'Baale Council',
      'Ilari'
    ],
    correctOptionIndex: 0,
    explanation: 'The Oyomesi was the aristocratic council of seven kingmakers led by the Bashorun (Prime Minister). If the Alaafin became tyrannical or violated traditions, the Oyomesi could reject him by presenting an empty calabash or parrot eggs, signifying that he must commit ritual suicide.',
    keyConcept: 'Checks and Balances in the pre-colonial Oyo constitutional framework',
    oauExamTip: 'Oyomesi = 7 Kingmakers led by Bashorun. Ogboni = Judicial/religious mediating body. Eso = Military commanders led by Aare Ona Kakanfo.',
    difficulty: 'medium'
  },
  {
    id: 'eco_05',
    subjectId: 'economics',
    subjectName: 'Economics',
    year: '2022 OAU Post-UTME',
    topic: 'Money & Central Banking',
    questionText: 'Which of the following is a quantitative (monetary policy) instrument utilized by the Central Bank of Nigeria (CBN) to contract money supply in the economy during high inflation?',
    options: [
      'Selling government securities through Open Market Operations (OMO)',
      'Lowering the Cash Reserve Ratio (CRR)',
      'Reducing the Monetary Policy Rate (MPR)',
      'Moral suasion urging commercial banks to lend freely',
      'Buying treasury bills from the public'
    ],
    correctOptionIndex: 0,
    explanation: 'To contract the money supply during inflation, the Central Bank sells government securities (Open Market Operations), which siphons cash reserves away from commercial banks and the public, thereby curbing excess liquidity.',
    keyConcept: 'Monetary Policy Instruments of Central Banking',
    oauExamTip: 'Contractionary policy (fight inflation): Sell OMO securities, Increase MPR, Increase CRR.',
    difficulty: 'medium'
  },
  {
    id: 'mth_08',
    subjectId: 'mathematics',
    subjectName: 'Mathematics',
    year: '2024 OAU Post-UTME',
    topic: 'Arithmetic & Geometric Progressions',
    questionText: 'The third term of a Geometric Progression (G.P.) is 18 and the sixth term is 486. Find the common ratio and the first term.',
    options: [
      'r = 3, a = 2',
      'r = 2, a = 3',
      'r = 3, a = 6',
      'r = 4, a = 1',
      'r = 2, a = 9'
    ],
    correctOptionIndex: 0,
    explanation: 'T₃ = ar² = 18 \nT₆ = ar⁵ = 486 \nDividing: T₆ / T₃ = (ar⁵) / (ar²) = r³ \nr³ = 486 / 18 = 27 \nr = ∛27 = 3. \nSubstitute r = 3 into T₃: a(3)² = 18 => 9a = 18 => a = 2.',
    keyConcept: 'Geometric Progression nth term formula T_n = arⁿ⁻¹',
    oauExamTip: 'Divide higher term by lower term to eliminate \'a\': T_m / T_n = r^(m-n).',
    difficulty: 'easy'
  },
  {
    id: 'phy_06',
    subjectId: 'physics',
    subjectName: 'Physics',
    year: '2023 OAU Post-UTME',
    topic: 'Heat & Thermodynamics - Specific Heat Capacity',
    questionText: 'An electric immersion heater rated 1000 W is used to heat 2.0 kg of water from 25°C to 75°C. Assuming no heat is lost to the surroundings, how long will this process take? (Specific heat capacity of water = 4200 J/kg·K)',
    options: [
      '420 seconds (7 minutes)',
      '210 seconds (3.5 minutes)',
      '840 seconds (14 minutes)',
      '500 seconds (8.3 minutes)',
      '100 seconds (1.6 minutes)'
    ],
    correctOptionIndex: 0,
    explanation: 'Heat energy required Q = m · c · ΔT. \nm = 2.0 kg, c = 4200 J/kg·K, ΔT = 75 - 25 = 50 K. \nQ = 2.0 × 4200 × 50 = 420,000 Joules. \nElectrical energy supplied = Power × time = P × t = 1000 × t. \n1000 t = 420,000 => t = 420 seconds (7.0 minutes).',
    keyConcept: 'Conservation of energy in electrical heating',
    oauExamTip: 'Formula: P · t = m · c · Δθ. Plug in: 1000 · t = 2 · 4200 · 50 => t = 420 s.',
    difficulty: 'easy'
  },
  {
    id: 'chm_06',
    subjectId: 'chemistry',
    subjectName: 'Chemistry',
    year: '2022 OAU Post-UTME',
    topic: 'Acid-Base Titration & pH',
    questionText: 'Calculate the pH of a 0.005 mol/dm³ solution of tetraoxosulphate(VI) acid (H₂SO₄), assuming complete dissociation.',
    options: [
      '2.0',
      '2.3',
      '1.0',
      '3.0',
      '1.7'
    ],
    correctOptionIndex: 0,
    explanation: 'H₂SO₄ is a diprotic acid: H₂SO₄ → 2H⁺ + SO₄²⁻. \n[H⁺] = 2 × 0.005 mol/dm³ = 0.010 mol/dm³ = 10⁻² mol/dm³. \npH = -log₁₀[H⁺] = -log₁₀(10⁻²) = 2.0.',
    keyConcept: 'pH calculation for polyprotic strong acids',
    oauExamTip: 'Don\'t forget that H₂SO₄ produces TWO moles of H⁺ per mole of acid! [H⁺] = 2 × 0.005 = 0.01M => pH = 2.0.',
    difficulty: 'easy'
  },
  {
    id: 'bio_06',
    subjectId: 'biology',
    subjectName: 'Biology',
    year: '2023 OAU Post-UTME',
    topic: 'Human Physiology - Circulatory System',
    questionText: 'Which chamber of the mammalian heart possesses the thickest muscular wall (myocardium) and why?',
    options: [
      'Left ventricle; to generate high systemic pressure to pump blood to all parts of the body',
      'Right ventricle; to pump deoxygenated blood under high pressure to the lungs',
      'Left atrium; to receive oxygenated blood from pulmonary veins',
      'Right atrium; to resist backflow from vena cava',
      'Interventricular septum; to conduct electrical impulses from the AV node'
    ],
    correctOptionIndex: 0,
    explanation: 'The left ventricle has a myocardium wall approximately 3 times thicker than the right ventricle because it must pump blood through the high-resistance systemic circulation (entire body), unlike the right ventricle which only pumps through the low-resistance pulmonary circuit.',
    keyConcept: 'Structure and functional adaptations of the mammalian heart',
    oauExamTip: 'Left Ventricle = Thickest wall (Systemic circulation). Right Ventricle = Thinner wall (Pulmonary circulation).',
    difficulty: 'easy'
  }
];

export const OAU_QUESTION_BANK: Question[] = OAU_PAST_QUESTIONS;

export function getQuestionsForSubject(subjectId: SubjectId, count = 10): Question[] {
  const filtered = OAU_PAST_QUESTIONS.filter((q) => q.subjectId === subjectId);
  const shuffled = [...filtered].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

export function generateMockExam(selectedSubjects: SubjectId[], questionsPerSubject = 5): Question[] {
  const examQuestions: Question[] = [];
  selectedSubjects.forEach((subId) => {
    const subQuestions = getQuestionsForSubject(subId, questionsPerSubject);
    examQuestions.push(...subQuestions);
  });
  return examQuestions;
}

