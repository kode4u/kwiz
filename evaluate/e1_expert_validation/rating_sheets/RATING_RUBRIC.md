# EXPERT EVALUATION RUBRIC (5-Point Likert Scale)

## Dimension 1: Technical & Factual Correctness (TC)
- 5: Flawless. Key answer is unequivocally correct, explanations and statements are factually sound.
- 4: Minor wording ambiguity, but clearly correct upon standard interpretation.
- 3: Partially correct or open to multiple edge-case interpretations.
- 2: Factually inaccurate or misleading premise.
- 1: Fundamentally wrong key or contradictory question premise.

## Dimension 2: Distractor Plausibility (DP)
- 5: Highly plausible. Distractors directly target common student misconceptions or typical operator errors.
- 4: Plausible distractors, good difficulty balance.
- 3: At least two distractors are obviously eliminated; one good distractor.
- 2: Weak, trivial, or nonsense distractors.
- 1: Absurd or duplicate choices.

## Dimension 3: Pedagogical Relevance (PR)
- 5: Directly aligns with standard CS1/CS2 learning objectives and core programming concepts.
- 4: Relevant, appropriate for introductory to intermediate learners.
- 3: Marginal relevance or overly obscure edge case.
- 2: Poor pedagogical value; tests trivia rather than programming mastery.
- 1: Irrelevant to course goals.

## Dimension 4: Code Executability & Syntax (CE)
- 5: Flawless syntax, valid AST, executes cleanly and deterministically.
- 4: Valid syntax with minor stylistic/PEP8 deviations.
- 3: Requires minor fix to run (e.g., missing print statement wrapper).
- 2: Multiple runtime errors or syntax errors.
- 1: Completely invalid code or hallucinated syntax.

## Dimension 5: Context Groundedness & Evidence Support (CG)
- 5: Fully Supported. Question premises, code behavior, and distractor concepts are directly referenced or logically derived from the retrieved slide chunks.
- 4: Largely Supported. Core concepts are covered in the slides with minor standard language assumptions.
- 3: Partially Supported. Some terminology or syntax assumed without direct mention in retrieved slides.
- 2: Weakly Supported. Only loosely related to slide topics.
- 1: Unsupported / Hallucinated. Concepts or APIs not present in or contrary to the course slides.

