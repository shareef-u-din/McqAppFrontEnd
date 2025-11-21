import { Question } from "@/types";

export const MOCK_QUESTIONS: Question[] = [
  // Physics - Mechanics - Newton's Laws
  {
    id: "physics-mechanics-newton-1",
    type: "single",
    question: {
      text: "According to Newton's first law, an object at rest stays at rest unless acted upon by a net external force. This property is also known as:",
    },
    options: [
      { id: "physics-mechanics-newton-1-opt-0", content: { text: "Inertia" }, isCorrect: true },
      { id: "physics-mechanics-newton-1-opt-1", content: { text: "Momentum" }, isCorrect: false },
      { id: "physics-mechanics-newton-1-opt-2", content: { text: "Acceleration" }, isCorrect: false },
      { id: "physics-mechanics-newton-1-opt-3", content: { text: "Velocity" }, isCorrect: false },
    ],
    examType: "NEET",
    subjectId: "physics-neet",
    topicId: "mechanics",
    chapterId: "newton-laws",
    difficulty: "easy",
    explanation: {
      text: "Newton's first law is also known as the law of inertia. It states that an object will maintain its state of rest or uniform motion unless acted upon by an external force.",
    },
    status: "published",
    version: 1,
    tags: ["mechanics", "newton's laws", "inertia"],
  },
  {
    id: "physics-mechanics-newton-2",
    type: "single",
    question: {
      text: "If a resultant force F acts on a body of mass m, the acceleration produced is:",
    },
    options: [
      { id: "physics-mechanics-newton-2-opt-0", content: { text: "F/m" }, isCorrect: true },
      { id: "physics-mechanics-newton-2-opt-1", content: { text: "F×m" }, isCorrect: false },
      { id: "physics-mechanics-newton-2-opt-2", content: { text: "F/m²" }, isCorrect: false },
      { id: "physics-mechanics-newton-2-opt-3", content: { text: "m/F" }, isCorrect: false },
    ],
    examType: "NEET",
    subjectId: "physics-neet",
    topicId: "mechanics",
    chapterId: "newton-laws",
    difficulty: "medium",
    explanation: {
      text: "According to Newton's second law of motion, acceleration (a) is directly proportional to force (F) and inversely proportional to mass (m). Hence, a = F/m.",
    },
    status: "published",
    version: 1,
    tags: ["mechanics", "newton's laws", "force"],
  },

  // Physics - Thermodynamics - Heat Transfer
  {
    id: "physics-thermo-heat-1",
    type: "multiple",
    question: {
      text: "Which of the following are modes of heat transfer?",
    },
    options: [
      { id: "physics-thermo-heat-1-opt-0", content: { text: "Conduction" }, isCorrect: true },
      { id: "physics-thermo-heat-1-opt-1", content: { text: "Convection" }, isCorrect: true },
      { id: "physics-thermo-heat-1-opt-2", content: { text: "Radiation" }, isCorrect: true },
      { id: "physics-thermo-heat-1-opt-3", content: { text: "Reflection" }, isCorrect: false },
    ],
    examType: "NEET",
    subjectId: "physics-neet",
    topicId: "thermodynamics",
    chapterId: "heat-transfer",
    difficulty: "easy",
    explanation: {
      text: "Heat transfer occurs through three modes: conduction (through direct contact), convection (through fluid movement), and radiation (through electromagnetic waves). Reflection is not a mode of heat transfer.",
    },
    status: "published",
    version: 1,
    tags: ["thermodynamics", "heat transfer"],
  },
  {
    id: "physics-thermo-heat-2",
    type: "single",
    question: {
      text: "In which mode of heat transfer does energy transfer occur without any material medium?",
    },
    options: [
      { id: "physics-thermo-heat-2-opt-0", content: { text: "Conduction" }, isCorrect: false },
      { id: "physics-thermo-heat-2-opt-1", content: { text: "Convection" }, isCorrect: false },
      { id: "physics-thermo-heat-2-opt-2", content: { text: "Radiation" }, isCorrect: true },
      { id: "physics-thermo-heat-2-opt-3", content: { text: "All of these" }, isCorrect: false },
    ],
    examType: "NEET",
    subjectId: "physics-neet",
    topicId: "thermodynamics",
    chapterId: "heat-transfer",
    difficulty: "medium",
    explanation: {
      text: "Radiation is the only mode of heat transfer that can occur in vacuum as it doesn't require any material medium. Heat from the Sun reaches Earth through radiation.",
    },
    status: "published",
    version: 1,
    tags: ["thermodynamics", "radiation"],
  },
  {
    id: "physics-thermo-heat-3",
    type: "single",
    question: {
      text: "The thermal conductivity of a material is the measure of:",
    },
    options: [
      { id: "physics-thermo-heat-3-opt-0", content: { text: "Rate of heat flow through unit area" }, isCorrect: false },
      { id: "physics-thermo-heat-3-opt-1", content: { text: "Total heat flow through the material" }, isCorrect: false },
      { id: "physics-thermo-heat-3-opt-2", content: { text: "Temperature difference across the material" }, isCorrect: false },
      { id: "physics-thermo-heat-3-opt-3", content: { text: "Rate of heat flow through unit thickness for unit temperature difference" }, isCorrect: true },
    ],
    examType: "NEET",
    subjectId: "physics-neet",
    topicId: "thermodynamics",
    chapterId: "heat-transfer",
    difficulty: "medium",
    explanation: {
      text: "Thermal conductivity (k) is defined as the rate of heat transfer through a unit thickness of material per unit area per unit temperature difference. It's measured in W/(m·K).",
    },
    status: "published",
    version: 1,
    tags: ["thermodynamics", "conductivity"],
  },
  {
    id: "physics-thermo-heat-4",
    type: "single", // Changed from 'math' to 'single' as it's an MCQ with math content
    question: {
      text: "If the temperature difference across a wall is 20°C and its thermal conductivity is 0.5 W/(m·K), calculate the heat flux through a 0.2m thick wall.",
    },
    options: [
      { id: "physics-thermo-heat-4-opt-0", content: { text: "40 W/m²" }, isCorrect: false },
      { id: "physics-thermo-heat-4-opt-1", content: { text: "50 W/m²" }, isCorrect: true },
      { id: "physics-thermo-heat-4-opt-2", content: { text: "60 W/m²" }, isCorrect: false },
      { id: "physics-thermo-heat-4-opt-3", content: { text: "70 W/m²" }, isCorrect: false },
    ],
    examType: "NEET",
    subjectId: "physics-neet",
    topicId: "thermodynamics",
    chapterId: "heat-transfer",
    difficulty: "hard",
    explanation: {
      text: "Using Fourier's law: q = -k(ΔT/Δx)\nq = -0.5(20/0.2) = -0.5(100) = -50 W/m²\nThe negative sign indicates direction; magnitude is 50 W/m²",
      latex: "q = -k\\frac{\\Delta T}{\\Delta x} = -0.5\\frac{20}{0.2} = -50\\,\\text{W/m}^2",
    },
    status: "published",
    version: 1,
    tags: ["thermodynamics", "heat flux", "calculation"],
  },

  // Chemistry - Organic Chemistry - Alkanes
  {
    id: "chemistry-organic-alkanes-1",
    type: "single",
    question: {
      text: "The general formula for alkanes is:",
    },
    options: [
      { id: "chemistry-organic-alkanes-1-opt-0", content: { text: "CnH2n+2" }, isCorrect: true },
      { id: "chemistry-organic-alkanes-1-opt-1", content: { text: "CnH2n" }, isCorrect: false },
      { id: "chemistry-organic-alkanes-1-opt-2", content: { text: "CnH2n-2" }, isCorrect: false },
      { id: "chemistry-organic-alkanes-1-opt-3", content: { text: "CnHn" }, isCorrect: false },
    ],
    examType: "NEET",
    subjectId: "chemistry-neet",
    topicId: "organic-chemistry",
    chapterId: "alkanes",
    difficulty: "easy",
    explanation: {
      text: "Alkanes are saturated hydrocarbons with single bonds only. Their general formula is CnH2n+2, where n is the number of carbon atoms.",
    },
    status: "published",
    version: 1,
    tags: ["organic chemistry", "alkanes"],
  },
  {
    id: "chemistry-organic-alkanes-2",
    type: "single", // Changed from 'math' to 'single'
    question: {
      text: "Calculate the number of hydrogen atoms in an alkane with 5 carbon atoms using the formula CnH2n+2.",
    },
    options: [
      { id: "chemistry-organic-alkanes-2-opt-0", content: { text: "10" }, isCorrect: false },
      { id: "chemistry-organic-alkanes-2-opt-1", content: { text: "12" }, isCorrect: true },
      { id: "chemistry-organic-alkanes-2-opt-2", content: { text: "8" }, isCorrect: false },
      { id: "chemistry-organic-alkanes-2-opt-3", content: { text: "14" }, isCorrect: false },
    ],
    examType: "NEET",
    subjectId: "chemistry-neet",
    topicId: "organic-chemistry",
    chapterId: "alkanes",
    difficulty: "medium",
    explanation: {
      text: "For an alkane with 5 carbon atoms (n=5), using the formula CnH2n+2:\nNumber of H atoms = 2n + 2\n= 2(5) + 2\n= 10 + 2\n= 12",
      latex: "H = 2n + 2 = 2(5) + 2 = 12",
    },
    status: "published",
    version: 1,
    tags: ["organic chemistry", "alkanes", "calculation"],
  },

  // JEE - Mathematics
  {
    id: "maths-jee-calc-1",
    type: "single", // Changed from 'math' to 'single'
    question: {
      text: "Find the derivative of f(x) = x² + 3x with respect to x.",
    },
    options: [
      { id: "maths-jee-calc-1-opt-0", content: { text: "2x + 3" }, isCorrect: true },
      { id: "maths-jee-calc-1-opt-1", content: { text: "x² + 3" }, isCorrect: false },
      { id: "maths-jee-calc-1-opt-2", content: { text: "2x" }, isCorrect: false },
      { id: "maths-jee-calc-1-opt-3", content: { text: "x + 3" }, isCorrect: false },
    ],
    examType: "JEE",
    subjectId: "maths-jee",
    topicId: "calculus",
    chapterId: "derivatives",
    difficulty: "medium",
    explanation: {
      text: "Using the power rule and constant multiple rule:\n- Derivative of x² is 2x\n- Derivative of 3x is 3\n- Therefore, f'(x) = 2x + 3",
      latex: "\\frac{d}{dx}(x^2 + 3x) = 2x + 3",
    },
    status: "published",
    version: 1,
    tags: ["calculus", "derivatives"],
  },
  
  // Match the Following
  {
    id: "biology-cell-match-1",
    type: "match",
    question: { text: "Match the cell organelles with their functions:" },
    pairs: [
        { id: "p1", left: { text: "Mitochondria" }, right: { text: "Protein Synthesis" } }, // Intentionally mixed for display, but logic handles matching
        { id: "p2", left: { text: "Ribosome" }, right: { text: "Powerhouse of cell" } },
        { id: "p3", left: { text: "Nucleus" }, right: { text: "Photosynthesis" } },
        { id: "p4", left: { text: "Chloroplast" }, right: { text: "Control center" } }
    ],
    correctMatches: {
        "p1": "Powerhouse of cell", // In a real app, we'd use IDs for right side too
        "p2": "Protein Synthesis",
        "p3": "Control center",
        "p4": "Photosynthesis"
    },
    examType: "NEET",
    subjectId: "biology-neet",
    topicId: "cell-biology",
    chapterId: "cell-structure",
    difficulty: "medium",
    explanation: { text: "Mitochondria -> Powerhouse; Ribosome -> Protein Synthesis; Nucleus -> Control Center; Chloroplast -> Photosynthesis" },
    status: "published",
    version: 1,
    tags: ["biology", "cell"]
  },

  // Numerical
  {
    id: "physics-kinematics-num-1",
    type: "numerical",
    question: { text: "A car accelerates from rest at 2 m/s² for 10 seconds. What is the distance covered in meters?" },
    correctValue: 100,
    tolerance: 0.5,
    examType: "JEE",
    subjectId: "physics-jee",
    topicId: "mechanics",
    chapterId: "kinematics",
    difficulty: "easy",
    explanation: { text: "Using s = ut + 1/2at²: u=0, a=2, t=10. s = 0 + 0.5 * 2 * 100 = 100m" },
    status: "published",
    version: 1,
    tags: ["physics", "kinematics"]
  },

  // Assertion-Reason
  {
    id: "chem-bonding-ar-1",
    type: "assertion-reason",
    question: { text: "Assertion-Reason Question" }, // Placeholder text, renderer uses assertion/reason fields
    assertion: { text: "Ionic compounds have high melting points." },
    reason: { text: "Ionic bonds are strong electrostatic forces of attraction." },
    correctOption: "A",
    examType: "NEET",
    subjectId: "chemistry-neet",
    topicId: "bonding",
    chapterId: "ionic-bond",
    difficulty: "medium",
    explanation: { text: "Both statements are true and the strong electrostatic force explains the high melting point." },
    status: "published",
    version: 1,
    tags: ["chemistry", "bonding"]
  },

  // Fill in Blanks
  {
    id: "bio-genetics-fib-1",
    type: "fill-blanks",
    question: { text: "The basic unit of heredity is {{1}} and it is located on {{2}}." },
    correctAnswers: ["gene", "chromosome"],
    examType: "NEET",
    subjectId: "biology-neet",
    topicId: "genetics",
    chapterId: "heredity",
    difficulty: "easy",
    explanation: { text: "Genes are the basic units of heredity, located on chromosomes." },
    status: "published",
    version: 1,
    tags: ["biology", "genetics"]
  },

  // Case Study
  {
    id: "case-study-physics-1",
    type: "case-study",
    question: { 
        text: "Read the following paragraph and answer the questions:\n\nElectromagnetic induction is the process of generating electric current with a magnetic field. It occurs whenever a magnetic field and an electric conductor, such as a coil of wire, move relative to one another. If the conductor is part of a closed circuit, current will flow through it. The voltage induced is proportional to the rate of change of magnetic flux." 
    },
    childQuestions: [
        {
            id: "case-sub-1",
            type: "single",
            question: { text: "Who discovered electromagnetic induction?" },
            options: [
                { id: "opt-1", content: { text: "Faraday" }, isCorrect: true },
                { id: "opt-2", content: { text: "Newton" }, isCorrect: false },
                { id: "opt-3", content: { text: "Einstein" }, isCorrect: false },
                { id: "opt-4", content: { text: "Tesla" }, isCorrect: false }
            ],
            examType: "JEE",
            subjectId: "physics-jee",
            topicId: "electromagnetism",
            chapterId: "emi",
            difficulty: "easy",
            status: "published",
            version: 1,
            tags: []
        },
        {
            id: "case-sub-2",
            type: "single",
            question: { text: "Induced voltage depends on:" },
            options: [
                { id: "opt-a", content: { text: "Rate of change of magnetic flux" }, isCorrect: true },
                { id: "opt-b", content: { text: "Strength of magnetic field only" }, isCorrect: false },
                { id: "opt-c", content: { text: "Resistance of coil" }, isCorrect: false },
                { id: "opt-d", content: { text: "None of these" }, isCorrect: false }
            ],
            examType: "JEE",
            subjectId: "physics-jee",
            topicId: "electromagnetism",
            chapterId: "emi",
            difficulty: "medium",
            status: "published",
            version: 1,
            tags: []
        }
    ],
    examType: "JEE",
    subjectId: "physics-jee",
    topicId: "electromagnetism",
    chapterId: "emi",
    difficulty: "medium",
    status: "published",
    version: 1,
    tags: ["physics", "case study"]
  },
  // JEE - Mathematics - Calculus
  {
    id: "maths-jee-calc-2",
    type: "single",
    question: {
      text: "Evaluate the limit: \\lim_{x \\to 0} \\frac{\\sin x}{x}",
      latex: "\\lim_{x \\to 0} \\frac{\\sin x}{x}"
    },
    options: [
      { id: "opt-calc-1", content: { text: "0" }, isCorrect: false },
      { id: "opt-calc-2", content: { text: "1" }, isCorrect: true },
      { id: "opt-calc-3", content: { text: "Infinity" }, isCorrect: false },
      { id: "opt-calc-4", content: { text: "Undefined" }, isCorrect: false }
    ],
    examType: "JEE",
    subjectId: "maths-jee",
    topicId: "calculus",
    chapterId: "limits",
    difficulty: "easy",
    explanation: {
      text: "This is a standard limit in calculus. As x approaches 0, the ratio of sin(x) to x approaches 1.",
      latex: "\\lim_{x \\to 0} \\frac{\\sin x}{x} = 1"
    },
    status: "published",
    version: 1,
    tags: ["calculus", "limits", "trigonometry"]
  },
  {
    id: "maths-jee-calc-3",
    type: "single",
    question: {
      text: "Find the derivative of f(x) = x³ - 3x² + 2x - 1",
      latex: "f(x) = x^3 - 3x^2 + 2x - 1"
    },
    options: [
      { id: "opt-d1", content: { text: "3x² - 6x + 2", latex: "3x^2 - 6x + 2" }, isCorrect: true },
      { id: "opt-d2", content: { text: "3x² - 3x + 2", latex: "3x^2 - 3x + 2" }, isCorrect: false },
      { id: "opt-d3", content: { text: "x² - 6x + 2", latex: "x^2 - 6x + 2" }, isCorrect: false },
      { id: "opt-d4", content: { text: "3x² - 6x + 1", latex: "3x^2 - 6x + 1" }, isCorrect: false }
    ],
    examType: "JEE",
    subjectId: "maths-jee",
    topicId: "calculus",
    chapterId: "derivatives",
    difficulty: "easy",
    explanation: {
      text: "Using the power rule: d/dx(xⁿ) = nxⁿ⁻¹\nf'(x) = 3x² - 6x + 2",
      latex: "f'(x) = 3x^2 - 6x + 2"
    },
    status: "published",
    version: 1,
    tags: ["calculus", "derivatives", "polynomial"]
  },
  {
    id: "maths-jee-calc-4",
    type: "single",
    question: {
      text: "Evaluate the integral: ∫ 2x dx",
      latex: "\\int 2x \\, dx"
    },
    options: [
      { id: "opt-i1", content: { text: "x² + C", latex: "x^2 + C" }, isCorrect: true },
      { id: "opt-i2", content: { text: "2x² + C", latex: "2x^2 + C" }, isCorrect: false },
      { id: "opt-i3", content: { text: "x²/2 + C", latex: "\\frac{x^2}{2} + C" }, isCorrect: false },
      { id: "opt-i4", content: { text: "2x + C" }, isCorrect: false }
    ],
    examType: "JEE",
    subjectId: "maths-jee",
    topicId: "calculus",
    chapterId: "integrals",
    difficulty: "easy",
    explanation: {
      text: "Using the power rule for integration: ∫ xⁿ dx = xⁿ⁺¹/(n+1) + C\n∫ 2x dx = 2 · x²/2 + C = x² + C",
      latex: "\\int 2x \\, dx = x^2 + C"
    },
    status: "published",
    version: 1,
    tags: ["calculus", "integrals", "integration"]
  },
  {
    id: "maths-jee-calc-5",
    type: "multiple",
    question: {
      text: "Which of the following functions are continuous at x = 0?"
    },
    options: [
      { id: "opt-c1", content: { text: "f(x) = x²", latex: "f(x) = x^2" }, isCorrect: true },
      { id: "opt-c2", content: { text: "f(x) = |x|", latex: "f(x) = |x|" }, isCorrect: true },
      { id: "opt-c3", content: { text: "f(x) = 1/x", latex: "f(x) = \\frac{1}{x}" }, isCorrect: false },
      { id: "opt-c4", content: { text: "f(x) = sin(x)", latex: "f(x) = \\sin(x)" }, isCorrect: true }
    ],
    examType: "JEE",
    subjectId: "maths-jee",
    topicId: "calculus",
    chapterId: "continuity",
    difficulty: "medium",
    explanation: {
      text: "A function is continuous at a point if the limit exists and equals the function value at that point. f(x) = 1/x is not defined at x = 0, so it's not continuous there. The other three functions are continuous at x = 0."
    },
    status: "published",
    version: 1,
    tags: ["calculus", "continuity", "functions"]
  },
  {
    id: "maths-jee-calc-6",
    type: "single",
    question: {
      text: "Find the maximum value of f(x) = -x² + 4x - 3",
      latex: "f(x) = -x^2 + 4x - 3"
    },
    options: [
      { id: "opt-m1", content: { text: "1" }, isCorrect: true },
      { id: "opt-m2", content: { text: "2" }, isCorrect: false },
      { id: "opt-m3", content: { text: "3" }, isCorrect: false },
      { id: "opt-m4", content: { text: "4" }, isCorrect: false }
    ],
    examType: "JEE",
    subjectId: "maths-jee",
    topicId: "calculus",
    chapterId: "applications",
    difficulty: "medium",
    explanation: {
      text: "For a quadratic function f(x) = ax² + bx + c with a < 0, the maximum occurs at x = -b/(2a).\nHere, x = -4/(2·(-1)) = 2\nf(2) = -4 + 8 - 3 = 1",
      latex: "x = -\\frac{b}{2a} = 2, \\quad f(2) = 1"
    },
    status: "published",
    version: 1,
    tags: ["calculus", "maxima", "applications"]
  },
  {
    id: "maths-jee-calc-7",
    type: "numerical",
    question: {
      text: "Find the area under the curve y = x from x = 0 to x = 4.",
      latex: "y = x, \\quad x \\in [0, 4]"
    },
    correctValue: 8,
    tolerance: 0.1,
    examType: "JEE",
    subjectId: "maths-jee",
    topicId: "calculus",
    chapterId: "applications",
    difficulty: "medium",
    explanation: {
      text: "Area = ∫₀⁴ x dx = [x²/2]₀⁴ = 16/2 - 0 = 8 square units",
      latex: "\\int_0^4 x \\, dx = \\left[\\frac{x^2}{2}\\right]_0^4 = 8"
    },
    status: "published",
    version: 1,
    tags: ["calculus", "integration", "area"]
  }
];
