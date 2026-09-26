import os
import re
import shutil

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MD_SRC = os.path.join(BASE_DIR, 'papers', 'paper.md')
ROOT_PAPERS = os.path.join(os.path.dirname(BASE_DIR), 'papers')

APA_REPLACEMENTS = [
    (r'Mucciaccia et al\. \[1\]', 'Mucciaccia et al. (2025)'),
    (r'Lewis et al\. \[2\]', 'Lewis et al. (2020)'),
    (r'Li et al\. \[3\]', 'Li et al. (2025)'),
    (r'Pradeesh et al\. \[4\]', 'Pradeesh et al. (2025)'),
    (r'Lohr et al\. \[5\]', 'Lohr et al. (2025)'),
    (r'Olibo \[6\]', 'Olibo (2025)'),
    (r'Shintani \[7\]', 'Shintani (2026)'),
    (r'Tran et al\. \[8\]', 'Tran et al. (2026)'),
    (r'Shen et al\. \[9\]', 'Shen et al. (2026)'),
    (r'CacheBlend \[10\]', 'CacheBlend (Yao et al., 2025)'),
    (r'TurboRAG \[11\]', 'TurboRAG (Lu et al., 2025)'),
    (r'Fleiss \[12\]', 'Fleiss (1971)'),
    (r'Koo and Li \[13\]', 'Koo and Li (2016)'),
    (r'Koo & Li \[13\]', 'Koo & Li (2016)'),
    (r'Lee \[14\]', 'Lee (2025)'),
    (r'Nussbaum et al\. \[15\]', 'Nussbaum et al. (2024)'),
    (r'Hui et al\. \[16\]', 'Hui et al. (2024)'),
    (r'NIST \[17\]', 'NIST (2015)'),
    (r'Singhal \[18\]', 'Singhal (2001)'),
    (r'Dougiamas and Taylor \[19\]', 'Dougiamas and Taylor (2003)'),
    (r'Dougiamas & Taylor \[19\]', 'Dougiamas & Taylor (2003)'),
    (r'Anderson and Krathwohl \[20\]', 'Anderson and Krathwohl (2001)'),
    (r'Anderson & Krathwohl \[20\]', 'Anderson & Krathwohl (2001)'),
    (r'Ji et al\. \[21\]', 'Ji et al. (2023)'),
    (r'Zheng et al\. \[22\]', 'Zheng et al. (2023)'),
    (r'\[1\]', '(Mucciaccia et al., 2025)'),
    (r'\[2\]', '(Lewis et al., 2020)'),
    (r'\[3\]', '(Li et al., 2025)'),
    (r'\[4\]', '(Pradeesh et al., 2025)'),
    (r'\[5\]', '(Lohr et al., 2025)'),
    (r'\[6\]', '(Olibo, 2025)'),
    (r'\[7\]', '(Shintani, 2026)'),
    (r'\[8\]', '(Tran et al., 2026)'),
    (r'\[9\]', '(Shen et al., 2026)'),
    (r'\[10\]', '(Yao et al., 2025)'),
    (r'\[11\]', '(Lu et al., 2025)'),
    (r'\[12\]', '(Fleiss, 1971)'),
    (r'\[13\]', '(Koo & Li, 2016)'),
    (r'\[14\]', '(Lee, 2025)'),
    (r'\[15\]', '(Nussbaum et al., 2024)'),
    (r'\[16\]', '(Hui et al., 2024)'),
    (r'\[17\]', '(NIST, 2015)'),
    (r'\[18\]', '(Singhal, 2001)'),
    (r'\[19\]', '(Dougiamas & Taylor, 2003)'),
    (r'\[20\]', '(Anderson & Krathwohl, 2001)'),
    (r'\[21\]', '(Ji et al., 2023)'),
    (r'\[22\]', '(Zheng et al., 2023)'),
]

APA_REFERENCES_MD = """Anderson, L. W., & Krathwohl, D. R. (Eds.). (2001). *A taxonomy for learning, teaching, and assessing: A revision of Bloom's taxonomy of educational objectives*. Longman.

Dougiamas, M., & Taylor, P. C. (2003). Moodle: Using learning communities to create an open source course management system. *Proceedings of the ED-MEDIA 2003 Conference*, 171–178.

Fleiss, J. L. (1971). Measuring nominal scale agreement among many raters. *Psychological Bulletin*, 76(5), 378–382. https://doi.org/10.1037/h0031619

Hui, B., Yang, J., Cui, Z., Yang, X., Liu, D., Zhang, L., & Lin, J. (2024). *Qwen2.5-Coder technical report*. arXiv preprint arXiv:2409.12186.

Ji, Z., Lee, N., Frieske, R., Yu, T., Su, D., Xu, Y., Ishii, E., Yeung, Y. J., Del Luceno, A., & Fung, P. (2023). Survey of hallucination in natural language generation. *ACM Computing Surveys*, 55(12), 1–38. https://doi.org/10.1145/3571730

Koo, T. K., & Li, M. Y. (2016). A guideline of selecting and reporting intraclass correlation coefficients for reliability research. *Journal of Chiropractic Medicine*, 15(2), 155–163. https://doi.org/10.1016/j.jcm.2016.02.012

Lee, Y. (2025). Developing a computer-based tutor utilizing Generative Artificial Intelligence (GAI) and Retrieval-Augmented Generation (RAG). *Education and Information Technologies*, 30(6), 7841–7862. https://doi.org/10.1007/s10639-024-13129-5

Lewis, P., Perez, E., Piktus, A., Petroni, F., Karpukhin, V., Goyal, N., Küttler, H., Lewis, M., Yih, W.-t., Rocktäschel, T., Riedel, S., & Kiela, D. (2020). Retrieval-augmented generation for knowledge-intensive NLP tasks. *Advances in Neural Information Processing Systems*, 33, 9459–9474.

Li, Z., Wang, Z., Wang, W., Hung, K., Xie, H., & Wang, F. L. (2025). Retrieval-augmented generation for educational application: A systematic survey. *Computers and Education: Artificial Intelligence*, 8, 100417. https://doi.org/10.1016/caeai.2025.100417

Lohr, D., Berges, M., Chugh, A., Kohlhase, M., & Müller, D. (2025). Leveraging large language models to generate course-specific semantically annotated learning objects. *Journal of Computer Assisted Learning*, 41(1), e13101. https://doi.org/10.1111/jcal.13101

Lu, S., Wang, H., Rong, Y., Chen, Z., & Tang, Y. (2025). TurboRAG: Accelerating retrieval-augmented generation with precomputed KV caches for chunked text. *Proceedings of the 2025 Conference on Empirical Methods in Natural Language Processing*, 6588–6601. https://doi.org/10.18653/v1/2025.emnlp-main.334

Mucciaccia, S. S., Paixão, T. M., Mutz, F. W., Badue, C. S., de Souza, A. F., & Oliveira-Santos, T. (2025). Automatic multiple-choice question generation and evaluation systems based on LLM: A study case with university resolutions. *Proceedings of the 31st International Conference on Computational Linguistics*, 2246–2260.

National Institute of Standards and Technology (NIST). (2015). *Secure Hash Standard (SHS)*. Federal Information Processing Standards Publication (FIPS PUB 180-4). https://doi.org/10.6028/NIST.FIPS.180-4

Nussbaum, Z., Morris, J. X., Dinh, B., & Mostern, A. (2024). *Nomic Embed: Training a reproducible long-context text embedder*. arXiv preprint arXiv:2402.01613.

Olibo, E. (2025). *Enhancing RAG-based MCQ generation for Java programming education: A modular evaluation of chunking, retrieval and LLM performance* [Bachelor’s thesis, Kristianstad University].

Pradeesh, N., Remya, T., Thushara, M. G., Krishna, K. A., & Pranav, V. (2025). Retrieval-augmented generation for multiple-choice questions and answers generation. *Procedia Computer Science*, 259, 504–511. https://doi.org/10.1016/j.procs.2025.03.352

Shen, X., Feng, L., Hua, S., Liu, D., Xie, Z., & Liu, B. (2026). Towards sustainable AI knowledge-base assistants in computer science education: On-premise deployment and optimization with open educational resources. *Frontiers in Psychology*, 17, 1843444. https://doi.org/10.3389/fpsyg.2026.1843444

Shintani, S. A. (2026). *Self-hosted lecture-to-quiz: Local LLM MCQ generation with deterministic quality control*. arXiv:2603.08729.

Singhal, A. (2001). Modern information retrieval: A brief overview. *IEEE Data Engineering Bulletin*, 24(4), 35–43.

Tran, H. V., Nguyen, P. V., Vu, T. T. N., Luong, H. P., & Le, D.-N. (2026). A course-specific agentic RAG chatbot for IT student support: Architecture, local deployment, and preliminary evaluation at Hai Phong University. *Next-Generation Computing Systems and Technologies*, 2(2), 21–34. https://doi.org/10.62762/NGCST.2026.601800

Yao, J., Li, H., Liu, Y., Ray, S., Cheng, Y., Zhang, Q., Du, K., Lu, S., & Jiang, J. (2025). CacheBlend: Fast large language model serving for RAG with cached knowledge fusion. *Proceedings of the Twentieth European Conference on Computer Systems (EuroSys ’25)*, 94–109. https://doi.org/10.1145/3689031.3696098

Zheng, L., Chiang, W.-L., Sheng, Y., Zhuang, S., Wu, Z., Zhuang, Y., Lin, Z., Li, Z., Li, D., Xing, E. P., Zhang, H., Gonzalez, J. E., & Stoica, I. (2023). Judging LLM-as-a-Judge with MT-Bench and Chatbot Arena. *Advances in Neural Information Processing Systems*, 36, 46595–46623."""

def update_paper_md():
    with open(MD_SRC, 'r', encoding='utf-8') as f:
        content = f.read()

    parts = content.split('## References')
    body = parts[0]

    # Convert in-text citations
    for pat, rep in APA_REPLACEMENTS:
        body = re.sub(pat, rep, body)

    # Check for remaining [\d+]
    remaining = re.findall(r'\[\d+\]', body)
    if remaining:
        print(f"Warning: {len(remaining)} unconverted numeric citations found:", set(remaining))
    else:
        print("Success: All in-text citations successfully converted to APA 7th.")

    # Reconstruct with APA references
    new_content = body.rstrip() + "\n\n## References\n\n" + APA_REFERENCES_MD.strip() + "\n"

    with open(MD_SRC, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print(f"Updated {MD_SRC} with APA references.")

    # Sync to root papers/
    os.makedirs(ROOT_PAPERS, exist_ok=True)
    root_md = os.path.join(ROOT_PAPERS, 'paper.md')
    shutil.copyfile(MD_SRC, root_md)
    print(f"Synced to {root_md}")

if __name__ == '__main__':
    update_paper_md()
