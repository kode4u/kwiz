# Evaluation: Expert Question Quality Rubric (English + Khmer)

## Purpose

This rubric evaluates AI-generated multiple-choice questions (MCQs) for publication-grade analysis.
Use the same rubric for all models and both languages.

## Evaluation design

- **Raters:** at least 2 experts (preferably 3)
- **Blind review:** hide model identity from raters
- **Languages:** evaluate English and Khmer separately
- **Scale:** 1 to 5 per criterion

## Scoring scale (for each criterion)

- **1 = Very poor**
- **2 = Poor**
- **3 = Acceptable**
- **4 = Good**
- **5 = Excellent**

## Criteria (score each item 1-5)

1. **Factual correctness**
   - Is the keyed correct answer actually correct?
   - Is there any factual error in stem/options/explanation?

2. **Question clarity**
   - Is the question clear, unambiguous, and easy to interpret?
   - Is wording concise and learner-appropriate?

3. **Distractor quality**
   - Are incorrect options plausible and non-trivial?
   - Are options distinct (not overlapping or duplicate)?

4. **Difficulty alignment**
   - Does question difficulty match requested level (`easy/medium/hard`)?

5. **Language quality**
   - Grammar, fluency, naturalness in target language.
   - For Khmer: script correctness, readability, and natural pedagogical phrasing.

6. **Curriculum/context relevance**
   - Is the question aligned to the given topic/context and course level?

## Overall acceptability

After criterion scoring, assign:

- `acceptable` = 1 (Yes) if question is usable with minimal/no edits
- `acceptable` = 0 (No) if major correction is needed

## Hard-fail flags (binary)

Mark these separately:

- `hard_fail_fact_error` (0/1)
- `hard_fail_multi_correct_or_none` (0/1)
- `hard_fail_unreadable_language` (0/1)

Questions with any hard-fail flag should be highlighted in analysis, even if average score is moderate.

## Reviewer instructions

1. Review independently (no discussion during initial scoring).
2. Use provided language-specific sheet (`rating_sheet_en.csv` / `rating_sheet_km.csv`).
3. Add short notes for major issues.
4. Keep scoring criteria consistent across all models.

## Reporting recommendations

For each model and language, report:

- Mean and SD for each criterion
- Overall mean score
- Acceptability rate (%)
- Hard-fail rate (%)
- Inter-rater reliability (Cohen's kappa for acceptability; weighted agreement for rubric if available)

## Suggested interpretation bands (overall mean)

- **>= 4.50**: Excellent
- **4.00 - 4.49**: Good
- **3.50 - 3.99**: Moderate
- **< 3.50**: Needs improvement
