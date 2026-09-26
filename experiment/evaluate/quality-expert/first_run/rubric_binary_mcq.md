# AI Question Quality Evaluation Rubric (Binary)

Use this rubric for the **125-question** evaluation study (5 domains × 25 questions per domain).

## Study design

A total of **125** multiple-choice questions (MCQs) were generated across **five** computer science domains. Each domain has **five subtopics** with **five questions per subtopic** (25 questions per domain).

**Domains in this repository** (`evaluate/llm-evaluation/batch_plan.example.json`):

1. C++ Programming  
2. Python Programming  
3. Java Programming  
4. Data Structures  
5. Database Systems  

*(If your paper lists a different fifth domain, e.g. Flutter Development, update the batch plan JSON and re-run generation.)*

**Raters:** Two instructors review all questions **independently**. When scores disagree, resolve by **discussion and consensus** (record final scores in the consensus sheet).

## Evaluation criteria (score each 0 or 1)

| Criterion | 1 = Acceptable | 0 = Unacceptable |
|-----------|----------------|------------------|
| **Topic relevance** | Question matches requested domain, subtopic, and prompt | Off-topic or wrong subtopic |
| **Semantic correctness** | Stem and options are technically/conceptually sound | Factual or conceptual error |
| **Answer key correctness** | The designated correct option is actually correct | Wrong key or multiple correct options |
| **Question clarity** | Readable, clear, understandable wording | Confusing, ambiguous, or ungrammatical |

## Overall acceptability

Recommended rule for automated reporting:

- **acceptable = 1** only if **all four** criteria = 1  
- **acceptable = 0** otherwise  

You may also record a separate holistic `acceptable` column if your protocol allows one minor flaw.

## Score (%)

For each domain, subtopic, or overall:

$$\text{Score (\%)} = \frac{\text{Number of acceptable questions}}{\text{Total questions}} \times 100$$

Example: 22 acceptable out of 25 in one domain → **88%**.

## Example

**Prompt:** Generate a multiple-choice question about Binary Search Trees.

**Question:** What is the average search complexity of a balanced Binary Search Tree?  
A. O(n²)  B. O(log n)  C. O(n)  D. O(1)  
**Correct answer:** B

| Criterion | Score |
|-----------|-------|
| Topic relevance | 1 |
| Semantic correctness | 1 |
| Answer key correctness | 1 |
| Question clarity | 1 |
| **Overall acceptable** | **1** |

## References

- Kurdi, S., Leo, J., & Parsia, D. (2020). A Systematic Review of Automatic Question Generation for Educational Purposes. *International Journal of Artificial Intelligence in Education*, 30, 121–204.  
- Du, X., Shao, J., & Cardie, C. (2017). Learning to Ask: Neural Question Generation for Reading Comprehension. *Proceedings of ACL 2017*.
