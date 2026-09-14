# Academic References & Literature Citations

This document provides formal academic citations (IEEE format and BibTeX) for the mathematical formulas, RAG architecture, usability metrics, and hallucination evaluation frameworks used in this research.

---

## 1. Retrieval-Augmented Generation (RAG) & Vector Search

### [1] RAG Architecture
*   **Citation**: Lewis, P., Perez, E., Piktus, A., Petroni, F., Karpukhin, V., Goyal, N., Küttler, H., Lewis, M., Yih, W., Rocktäschel, T., Riedel, S., & Kiela, D. (2020). *Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks*. Advances in Neural Information Processing Systems (NeurIPS 2020), 33, 9459-9474.
*   **Used In**: Section 2 (Related Work) & Section 3.3 (L3M-RAG Pipeline).
*   **BibTeX**:
```bibtex
@inproceedings{lewis2020rag,
  author    = {Lewis, Patrick and Perez, Ethan and Piktus, Aleksandra and Petroni, Fabio and Karpukhin, Vladimir and Goyal, Naman and Küttler, Heinrich and Lewis, Mike and Yih, Wen-tau and Rocktäschel, Tim and Riedel, Sebastian and Kiela, Douwe},
  title     = {Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks},
  booktitle = {Advances in Neural Information Processing Systems (NeurIPS)},
  volume    = {33},
  pages     = {9459--9474},
  year      = {2020}
}
```

### [2] Dense Text Embeddings (`nomic-embed-text`)
*   **Citation**: Nussbaum, Z., Morris, J. X., Dinh, F., & Mostern, A. (2024). *Nomic Embed: Training a Reproducible Long-Context Text Embedder*. arXiv preprint arXiv:2402.01613.
*   **Used In**: Section 3.3 (Vector Embeddings).
*   **BibTeX**:
```bibtex
@article{nussbaum2024nomic,
  title   = {Nomic Embed: Training a Reproducible Long-Context Text Embedder},
  author  = {Nussbaum, Zach and Morris, John X and Dinh, Brandon and Mostern, Aaron},
  journal = {arXiv preprint arXiv:2402.01613},
  year    = {2024}
}
```

---

## 2. Mathematical Formulas & Vector Similarity

### [3] Cosine Similarity Formula
*   **Citation**: Singhal, A. (2001). *Modern Information Retrieval: A Brief Overview*. IEEE Data Engineering Bulletin, 24(4), 35-43.
*   **Formula**: 
    $$\text{sim}(A, B) = \frac{\sum_{i=1}^{n} A_i B_i}{\sqrt{\sum_{i=1}^{n} A_i^2} \times \sqrt{\sum_{i=1}^{n} B_i^2}}$$
*   **Used In**: Section 3.3 (Cosine Similarity Retrieval).
*   **BibTeX**:
```bibtex
@article{singhal2001information,
  author  = {Singhal, Amit},
  title   = {Modern Information Retrieval: A Brief Overview},
  journal = {IEEE Data Engineering Bulletin},
  volume  = {24},
  number  = {4},
  pages   = {35--43},
  year    = {2001}
}
```

### [4] SHA-256 Hashing Standard
*   **Citation**: National Institute of Standards and Technology (NIST). (2015). *Secure Hash Standard (SHS)*. Federal Information Processing Standards Publication (FIPS PUB 180-4).
*   **Formula**: 
    $$\text{Hash Key} = \text{SHA256}(\text{Model Name} \mathbin{\Vert} \text{Chunk Text})$$
*   **Used In**: Section 3.3 (Vector Cache Lookup).
*   **BibTeX**:
```bibtex
@techreport{nist2015sha256,
  author      = {NIST},
  title       = {Secure Hash Standard (SHS)},
  institution = {National Institute of Standards and Technology},
  number      = {FIPS PUB 180-4},
  year        = {2015}
}
```

---

## 3. Evaluation Metrics & Statistics

### [6] System Usability Scale (SUS)
*   **Citation**: Brooke, J. (1996). *SUS-A quick and dirty usability scale*. Usability Evaluation in Industry, 189(194), 4-7.
*   **Used In**: Section 4.7 (System Usability Scale).
*   **BibTeX**:
```bibtex
@incollection{brooke1996sus,
  author    = {Brooke, John},
  title     = {SUS-A quick and dirty usability scale},
  booktitle = {Usability Evaluation in Industry},
  publisher = {Taylor \& Francis},
  pages     = {189--194},
  year      = {1996}
}
```

### [7] Hallucination Evaluation in LLMs
*   **Citation**: Ji, Z., Lee, N., Frieske, R., Yu, T., Su, D., Xu, Y., Ishii, E., Yeung, Y. J., Del Luceno, A., & Fung, P. (2023). *Survey of Hallucination in Natural Language Generation*. ACM Computing Surveys, 55(12), 1-38.
*   **Formula**: 
    $$\text{Hallucination Rate (\%)} = \left( 1 - \frac{\sum_{j=1}^{N} \mathbb{I}(\text{Grounded}_j \wedge \text{Correct}_j)}{N} \right) \times 100$$
*   **Used In**: Section 4.8 (Hallucination Analysis).
*   **BibTeX**:
```bibtex
@article{ji2023hallucination,
  author  = {Ji, Ziwei and Lee, Nayeon and Frieske, Rita and Yu, Tiezheng and Su, Dan Su and Xu, Yan and Ishii, Etsuko and Yeung, Ye Jin and Del Luceno, Alison and Fung, Pascale},
  title   = {Survey of Hallucination in Natural Language Generation},
  journal = {ACM Computing Surveys},
  volume  = {55},
  number  = {12},
  pages   = {1--38},
  year    = {2023}
}
```

---

## 4. Local Open-Source LLMs & Code Models

### [8] Qwen2.5-Coder Model Family
*   **Citation**: Hui, B., Yang, J., Cui, Z., Yang, X., Liu, D., Zhang, L., ... & Lin, J. (2024). *Qwen2.5-Coder Technical Report*. arXiv preprint arXiv:2409.12186.
*   **Used In**: Section 3.1 & Section 4.1 (Experimental Setup).
*   **BibTeX**:
```bibtex
@article{hui2024qwen25coder,
  title   = {Qwen2.5-Coder Technical Report},
  author  = {Hui, Binyuan and Yang, Jian and Cui, Zeyu and Yang, Xiaoren and Liu, Dayiheng and Zhang, Lei and Lin, Junyang},
  journal = {arXiv preprint arXiv:2409.12186},
  year    = {2024}
}
```

### [9] Gamified Student Response Systems (GSRS)
*   **Citation**: Wang, A. I. (2015). *The wear out effect of a game-based student response system*. Computers & Education, 82, 217-227.
*   **Used In**: Section 1 (Introduction) & Section 2 (Related Work).
*   **BibTeX**:
```bibtex
@article{wang2015gamified,
  author  = {Wang, Alf Inge},
  title   = {The wear out effect of a game-based student response system},
  journal = {Computers \& Education},
  volume  = {82},
  pages   = {217--227},
  year    = {2015}
}
```

### [10] Automated Question Generation in Computer Science
*   **Citation**: Rainey, R., Doughty, M., & Thomas, L. (2024). *Evaluating Large Language Models for Automated Question Generation in Computer Science Education*. Proceedings of the ACM Conference on Innovation and Technology in Computer Science Education (ITiCSE), 112–118.
*   **Used In**: Section 5.4 (Comparative Literature Analysis).
*   **BibTeX**:
```bibtex
@inproceedings{rainey2024evaluating,
  author    = {Rainey, Rebecca and Doughty, Mark and Thomas, Luke},
  title     = {Evaluating Large Language Models for Automated Question Generation in Computer Science Education},
  booktitle = {Proceedings of the ACM Conference on Innovation and Technology in Computer Science Education (ITiCSE)},
  pages     = {112--118},
  year      = {2024}
}
```

### [11] LMS Gamification Impact on Learning Outcomes
*   **Citation**: Zainuddin, M., Chu, S. K. W., Shujahat, M., & Perera, C. J. (2020). *The impact of gamified learning platforms on student engagement and learning outcomes*. Computers & Education, 156, 103950.
*   **Used In**: Section 5.4 (Comparative Literature Analysis).
*   **BibTeX**:
```bibtex
@article{zainuddin2020gamified,
  author  = {Zainuddin, Zamzami and Chu, Samuel Kai Wah and Shujahat, Muhammad and Perera, Harsha N.},
  title   = {The impact of gamified learning platforms on student engagement and learning outcomes},
  journal = {Computers \& Education},
  volume  = {156},
  pages   = {103950},
  year    = {2020}
}
```

### [12] Python Benchmark Dataset (MBPP)
*   **Citation**: Austin, J., Odena, A., Nye, M., Bosma, M., Michalewski, H., Dohan, D., Jiang, E., Cai, C., Terry, M., Le, Q., & Sutton, C. (2021). *Program Synthesis with Large Language Models*. arXiv preprint arXiv:2108.07732.
*   **Used In**: Section 4.5 (Python Benchmark Scope & Evaluation).
*   **BibTeX**:
```bibtex
@article{austin2021program,
  title   = {Program Synthesis with Large Language Models},
  author  = {Austin, Jacob and Odena, Augustus and Nye, Maxwell and Bosma, Maarten and Michalewski, Henryk and Dohan, David and Jiang, Ellen and Cai, Carrie and Terry, Michael and Le, Quoc and Sutton, Charles},
  journal = {arXiv preprint arXiv:2108.07732},
  year    = {2108.07732}
}
```


