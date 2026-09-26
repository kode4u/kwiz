import os
import re
from docx import Document
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT
from docx.oxml import parse_xml

import sys
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
from convert_to_word import add_math_runs, add_formatted_text, set_cell_background, set_cell_margins

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
    (r'Koo and Li \[13\]', 'Koo and Li (2016)'),
    (r'Lee \[14\]', 'Lee (2025)'),
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

APA_REFERENCES = [
    "Anderson, L. W., & Krathwohl, D. R. (Eds.). (2001). A taxonomy for learning, teaching, and assessing: A revision of Bloom's taxonomy of educational objectives. Longman.",
    "Dougiamas, M., & Taylor, P. C. (2003). Moodle: Using learning communities to create an open source course management system. Proceedings of the ED-MEDIA 2003 Conference, 171–178.",
    "Fleiss, J. L. (1971). Measuring nominal scale agreement among many raters. Psychological Bulletin, 76(5), 378–382. https://doi.org/10.1037/h0031619",
    "Hui, B., Yang, J., Cui, Z., Yang, X., Liu, D., Zhang, L., & Lin, J. (2024). Qwen2.5-Coder technical report. arXiv preprint arXiv:2409.12186.",
    "Ji, Z., Lee, N., Frieske, R., Yu, T., Su, D., Xu, Y., Ishii, E., Yeung, Y. J., Del Luceno, A., & Fung, P. (2023). Survey of hallucination in natural language generation. ACM Computing Surveys, 55(12), 1–38. https://doi.org/10.1145/3571730",
    "Koo, T. K., & Li, M. Y. (2016). A guideline of selecting and reporting intraclass correlation coefficients for reliability research. Journal of Chiropractic Medicine, 15(2), 155–163. https://doi.org/10.1016/j.jcm.2016.02.012",
    "Lee, Y. (2025). Developing a computer-based tutor utilizing Generative Artificial Intelligence (GAI) and Retrieval-Augmented Generation (RAG). Education and Information Technologies, 30(6), 7841–7862. https://doi.org/10.1007/s10639-024-13129-5",
    "Lewis, P., Perez, E., Piktus, A., Petroni, F., Karpukhin, V., Goyal, N., Küttler, H., Lewis, M., Yih, W.-t., Rocktäschel, T., Riedel, S., & Kiela, D. (2020). Retrieval-augmented generation for knowledge-intensive NLP tasks. Advances in Neural Information Processing Systems, 33, 9459–9474.",
    "Li, Z., Wang, Z., Wang, W., Hung, K., Xie, H., & Wang, F. L. (2025). Retrieval-augmented generation for educational application: A systematic survey. Computers and Education: Artificial Intelligence, 8, 100417. https://doi.org/10.1016/j.caeai.2025.100417",
    "Lohr, D., Berges, M., Chugh, A., Kohlhase, M., & Müller, D. (2025). Leveraging large language models to generate course-specific semantically annotated learning objects. Journal of Computer Assisted Learning, 41(1), e13101. https://doi.org/10.1111/jcal.13101",
    "Lu, S., Wang, H., Rong, Y., Chen, Z., & Tang, Y. (2025). TurboRAG: Accelerating retrieval-augmented generation with precomputed KV caches for chunked text. Proceedings of the 2025 Conference on Empirical Methods in Natural Language Processing, 6588–6601. https://doi.org/10.18653/v1/2025.emnlp-main.334",
    "Mucciaccia, S. S., Paixão, T. M., Mutz, F. W., Badue, C. S., de Souza, A. F., & Oliveira-Santos, T. (2025). Automatic multiple-choice question generation and evaluation systems based on LLM: A study case with university resolutions. Proceedings of the 31st International Conference on Computational Linguistics, 2246–2260.",
    "National Institute of Standards and Technology (NIST). (2015). Secure Hash Standard (SHS). Federal Information Processing Standards Publication (FIPS PUB 180-4). https://doi.org/10.6028/NIST.FIPS.180-4",
    "Nussbaum, Z., Morris, J. X., Dinh, B., & Mostern, A. (2024). Nomic Embed: Training a reproducible long-context text embedder. arXiv preprint arXiv:2402.01613.",
    "Olibo, E. (2025). Enhancing RAG-based MCQ generation for Java programming education: A modular evaluation of chunking, retrieval and LLM performance [Bachelor’s thesis, Kristianstad University].",
    "Pradeesh, N., Remya, T., Thushara, M. G., Krishna, K. A., & Pranav, V. (2025). Retrieval-augmented generation for multiple-choice questions and answers generation. Procedia Computer Science, 259, 504–511. https://doi.org/10.1016/j.procs.2025.03.352",
    "Shen, X., Feng, L., Hua, S., Liu, D., Xie, Z., & Liu, B. (2026). Towards sustainable AI knowledge-base assistants in computer science education: On-premise deployment and optimization with open educational resources. Frontiers in Psychology, 17, 1843444. https://doi.org/10.3389/fpsyg.2026.1843444",
    "Shintani, S. A. (2026). Self-hosted lecture-to-quiz: Local LLM MCQ generation with deterministic quality control. arXiv:2603.08729.",
    "Singhal, A. (2001). Modern information retrieval: A brief overview. IEEE Data Engineering Bulletin, 24(4), 35–43.",
    "Tran, H. V., Nguyen, P. V., Vu, T. T. N., Luong, H. P., & Le, D.-N. (2026). A course-specific agentic RAG chatbot for IT student support: Architecture, local deployment, and preliminary evaluation at Hai Phong University. Next-Generation Computing Systems and Technologies, 2(2), 21–34. https://doi.org/10.62762/NGCST.2026.601800",
    "Yao, J., Li, H., Liu, Y., Ray, S., Cheng, Y., Zhang, Q., Du, K., Lu, S., & Jiang, J. (2025). CacheBlend: Fast large language model serving for RAG with cached knowledge fusion. Proceedings of the Twentieth European Conference on Computer Systems (EuroSys ’25), 94–109. https://doi.org/10.1145/3689031.3696098",
    "Zheng, L., Chiang, W.-L., Sheng, Y., Zhuang, S., Wu, Z., Zhuang, Y., Lin, Z., Li, Z., Li, D., Xing, E. P., Zhang, H., Gonzalez, J. E., & Stoica, I. (2023). Judging LLM-as-a-Judge with MT-Bench and Chatbot Arena. Advances in Neural Information Processing Systems, 36, 46595–46623."
]

EAIT_ABSTRACT = (
    "Integrating large language models (LLMs) and retrieval-augmented generation (RAG) into learning management "
    "systems enables automated assessment, yet repeated course-grounded question authoring faces severe operational constraints "
    "under single-GPU deployments. This paper presents an end-to-end, self-hosted RAG pipeline natively integrated into Moodle "
    "for Python-programming multiple-choice question (MCQ) generation. The architecture couples incremental SHA-256 chunk "
    "hashing and embedding reuse (nomic-embed-text) with bounded retrieval context, local 7B-parameter inference "
    "(Qwen2.5-Coder-7B-Instruct), deterministic abstract syntax tree validation, bounded regeneration, and persistent Moodle "
    "Question Bank insertion. Across four controlled empirical experiments, incremental caching reduced knowledge-base "
    "indexing latency by 4,921.1× to 37,008.4× (compressing maintenance overhead from 2,590.6 ms to 0.07 ms), yielding a "
    "1.06× end-to-end interactive speedup ($T_{\\text{E2E}} = 1462.7\\text{ ms}$) as local LLM token decoding accounts for >96% "
    "of runtime. Under concurrent instructor workloads requesting standardized batches of 5 MCQs on a single NVIDIA RTX 3090, "
    "the system sustained aggregate throughput of 43.8 to 49.2 questions/min ($0.73\\text{--}0.82\\text{ Q/s}$) across $C = 1$ "
    "to $20$ concurrent requests, maintaining sub-3.6 s median latency under typical interactive authoring load ($C \\le 5$) with "
    "100% execution reliability and 13.44 GB peak VRAM utilization. Multi-evaluator panel review achieved 80.0% zero-edit "
    "pedagogical acceptability with 100% code executability. This study provides a reproducible systems characterization of "
    "on-premise educational assessment generation, confirming that targeted pipeline engineering renders local AI authoring "
    "operationally viable and data-sovereign in higher education."
)

EAIT_KEYWORDS = "retrieval-augmented generation; automated assessment; programming education; learning management systems; self-hosted AI"

def convert_to_apa_citations(text):
    res = text
    for pat, rep in APA_REPLACEMENTS:
        res = re.sub(pat, rep, res)
    return res

def create_blinded_manuscript(md_path, docx_path):
    doc = Document()
    for s in doc.sections:
        s.top_margin = Inches(1.0)
        s.bottom_margin = Inches(1.0)
        s.left_margin = Inches(1.0)
        s.right_margin = Inches(1.0)

    with open(md_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    # Preprocess lines to skip author block and declarations
    filtered_lines = []
    skip = False
    in_decl = False
    for line in lines:
        s = line.strip()
        if s.startswith('<div class="author-block">') or s.startswith('<div class="affil-block">'):
            continue
        if s == '---':
            continue
        if s.startswith('## Declarations'):
            in_decl = True
            continue
        if in_decl and s.startswith('## References'):
            in_decl = False
            filtered_lines.append(line)
            continue
        if in_decl:
            continue
        filtered_lines.append(line)

    lines = filtered_lines
    i = 0
    n = len(lines)

    in_abstract = False
    in_references = False

    while i < n:
        line = lines[i].rstrip('\r\n')
        stripped = line.strip()

        if not stripped:
            i += 1
            continue

        # Title
        if stripped.startswith('# '):
            title_text = stripped[2:].strip()
            p = doc.add_paragraph()
            p.alignment = WD_ALIGN_PARAGRAPH.CENTER
            p.paragraph_format.space_before = Pt(0)
            p.paragraph_format.space_after = Pt(8)
            r = p.add_run(title_text)
            r.font.name = 'Times New Roman'
            r.font.size = Pt(16)
            r.bold = True
            r.font.color.rgb = RGBColor(0x0f, 0x17, 0x2a)

            # Blinded subtitle
            p_blind = doc.add_paragraph()
            p_blind.alignment = WD_ALIGN_PARAGRAPH.CENTER
            p_blind.paragraph_format.space_before = Pt(0)
            p_blind.paragraph_format.space_after = Pt(16)
            r_blind = p_blind.add_run("[Anonymous Version for Double-Blind Peer Review]")
            r_blind.font.name = 'Times New Roman'
            r_blind.font.size = Pt(11)
            r_blind.italic = True
            r_blind.font.color.rgb = RGBColor(0x47, 0x55, 0x69)
            i += 1
            continue

        # Abstract header
        if stripped == '## Abstract':
            p = doc.add_paragraph()
            p.paragraph_format.space_before = Pt(12)
            p.paragraph_format.space_after = Pt(4)
            p.paragraph_format.keep_with_next = True
            r = p.add_run("Abstract")
            r.font.name = 'Times New Roman'
            r.font.size = Pt(13)
            r.bold = True
            r.font.color.rgb = RGBColor(0x0f, 0x17, 0x2a)

            # Add tight EAIT abstract
            p_abs = doc.add_paragraph()
            p_abs.paragraph_format.space_before = Pt(2)
            p_abs.paragraph_format.space_after = Pt(6)
            p_abs.paragraph_format.line_spacing = 1.15
            add_formatted_text(p_abs, EAIT_ABSTRACT, base_font_size=10.5)

            # Add EAIT Keywords
            p_kw = doc.add_paragraph()
            p_kw.paragraph_format.space_before = Pt(4)
            p_kw.paragraph_format.space_after = Pt(14)
            r_kw_label = p_kw.add_run("Keywords: ")
            r_kw_label.font.name = 'Times New Roman'
            r_kw_label.font.size = Pt(10.5)
            r_kw_label.bold = True
            r_kw_val = p_kw.add_run(EAIT_KEYWORDS)
            r_kw_val.font.name = 'Times New Roman'
            r_kw_val.font.size = Pt(10.5)

            # Skip the original abstract and keywords in markdown
            i += 1
            while i < n and not lines[i].strip().startswith('## 1 Introduction'):
                i += 1
            continue

        # Headings
        if stripped.startswith('## '):
            h_text = stripped[3:].strip()
            if h_text == 'References':
                in_references = True
                p = doc.add_paragraph()
                p.paragraph_format.space_before = Pt(16)
                p.paragraph_format.space_after = Pt(6)
                p.paragraph_format.keep_with_next = True
                r = p.add_run("References")
                r.font.name = 'Times New Roman'
                r.font.size = Pt(14)
                r.bold = True
                r.font.color.rgb = RGBColor(0x0f, 0x17, 0x2a)

                # Output alphabetized APA references
                for ref in APA_REFERENCES:
                    p_ref = doc.add_paragraph()
                    p_ref.paragraph_format.space_before = Pt(2)
                    p_ref.paragraph_format.space_after = Pt(4)
                    p_ref.paragraph_format.line_spacing = 1.15
                    p_ref.paragraph_format.left_indent = Inches(0.4)
                    p_ref.paragraph_format.first_line_indent = Inches(-0.4)
                    add_formatted_text(p_ref, ref, base_font_size=10)
                break  # End after references

            p = doc.add_paragraph()
            p.paragraph_format.space_before = Pt(14)
            p.paragraph_format.space_after = Pt(4)
            p.paragraph_format.keep_with_next = True
            add_formatted_text(p, convert_to_apa_citations(h_text), base_font_size=14, is_bold=True, text_color=RGBColor(0x0f, 0x17, 0x2a))
            i += 1
            continue

        if stripped.startswith('### '):
            h_text = stripped[4:].strip()
            p = doc.add_paragraph()
            p.paragraph_format.space_before = Pt(10)
            p.paragraph_format.space_after = Pt(3)
            p.paragraph_format.keep_with_next = True
            add_formatted_text(p, convert_to_apa_citations(h_text), base_font_size=12, is_bold=True, text_color=RGBColor(0x1e, 0x29, 0x3b))
            i += 1
            continue

        if stripped.startswith('#### '):
            h_text = stripped[5:].strip()
            p = doc.add_paragraph()
            p.paragraph_format.space_before = Pt(8)
            p.paragraph_format.space_after = Pt(2)
            p.paragraph_format.keep_with_next = True
            add_formatted_text(p, convert_to_apa_citations(h_text), base_font_size=11, is_bold=True, is_italic=True, text_color=RGBColor(0x33, 0x41, 0x55))
            i += 1
            continue

        # Image ![caption](path)
        if stripped.startswith('![') and '](' in stripped:
            img_match = re.match(r'!\[(.*?)\]\((.*?)\)', stripped)
            if img_match:
                img_path = img_match.group(2)
                fig_dir = os.path.join(os.path.dirname(md_path), 'figures')
                if 'pipeline_architecture' in img_path:
                    png_path = os.path.join(fig_dir, 'pipeline_architecture.png')
                elif 'cache_decision_flow' in img_path:
                    png_path = os.path.join(fig_dir, 'cache_decision_flow.png')
                else:
                    png_path = os.path.join(fig_dir, os.path.basename(img_path))

                if os.path.exists(png_path):
                    p_img = doc.add_paragraph()
                    p_img.alignment = WD_ALIGN_PARAGRAPH.CENTER
                    p_img.paragraph_format.space_before = Pt(8)
                    p_img.paragraph_format.space_after = Pt(2)
                    run_img = p_img.add_run()
                    run_img.add_picture(png_path, width=Inches(6.2))
                i += 1
                continue

        # Figure caption
        if stripped.startswith('*Figure ') and stripped.endswith('*'):
            p_cap = doc.add_paragraph()
            p_cap.alignment = WD_ALIGN_PARAGRAPH.CENTER
            p_cap.paragraph_format.space_before = Pt(2)
            p_cap.paragraph_format.space_after = Pt(10)
            add_formatted_text(p_cap, convert_to_apa_citations(stripped[1:-1]), base_font_size=9.5, is_italic=True, text_color=RGBColor(0x47, 0x55, 0x69))
            i += 1
            continue

        # Blockquote
        if stripped.startswith('> '):
            p = doc.add_paragraph()
            p.paragraph_format.left_indent = Inches(0.4)
            p.paragraph_format.right_indent = Inches(0.4)
            p.paragraph_format.space_before = Pt(4)
            p.paragraph_format.space_after = Pt(6)
            add_formatted_text(p, convert_to_apa_citations(stripped[2:]), base_font_size=10.5, is_italic=True)
            i += 1
            continue

        # Display Math
        if stripped.startswith('$$') and stripped.endswith('$$') and len(stripped) > 4:
            math_content = stripped[2:-2].strip()
            if 'sim' in math_content:
                omml_eq1 = '''<m:oMathPara xmlns:m="http://schemas.openxmlformats.org/officeDocument/2006/math">
  <m:oMath>
    <m:r><m:rPr><m:nor/></m:rPr><m:t>sim</m:t></m:r>
    <m:d><m:e><m:r><m:rPr><m:b/></m:rPr><m:t>q</m:t></m:r><m:r><m:t>, </m:t></m:r><m:r><m:rPr><m:b/></m:rPr><m:t>d</m:t></m:r></m:e></m:d>
    <m:r><m:t> = </m:t></m:r>
    <m:f>
      <m:num><m:r><m:rPr><m:b/></m:rPr><m:t>q</m:t></m:r><m:r><m:t> · </m:t></m:r><m:r><m:rPr><m:b/></m:rPr><m:t>d</m:t></m:r></m:num>
      <m:den>
        <m:sSub>
          <m:e><m:d><m:dPr><m:begChr m:val="‖"/><m:endChr m:val="‖"/></m:dPr><m:e><m:r><m:rPr><m:b/></m:rPr><m:t>q</m:t></m:r></m:e></m:d></m:e>
          <m:sub><m:r><m:t>2</m:t></m:r></m:sub>
        </m:sSub>
        <m:r><m:t> </m:t></m:r>
        <m:sSub>
          <m:e><m:d><m:dPr><m:begChr m:val="‖"/><m:endChr m:val="‖"/></m:dPr><m:e><m:r><m:rPr><m:b/></m:rPr><m:t>d</m:t></m:r></m:e></m:d></m:e>
          <m:sub><m:r><m:t>2</m:t></m:r></m:sub>
        </m:sSub>
      </m:den>
    </m:f>
  </m:oMath>
</m:oMathPara>'''
                p_math = doc.add_paragraph()
                p_math.paragraph_format.space_before = Pt(6)
                p_math.paragraph_format.space_after = Pt(6)
                p_math._p.append(parse_xml(omml_eq1))
            elif 'CacheHitRate' in math_content:
                omml_eq2 = '''<m:oMathPara xmlns:m="http://schemas.openxmlformats.org/officeDocument/2006/math">
  <m:oMath>
    <m:r><m:rPr><m:nor/></m:rPr><m:t>CacheHitRate</m:t></m:r>
    <m:r><m:t> = </m:t></m:r>
    <m:d>
      <m:e>
        <m:f>
          <m:num><m:r><m:rPr><m:nor/></m:rPr><m:t>ReusedChunks</m:t></m:r></m:num>
          <m:den><m:r><m:rPr><m:nor/></m:rPr><m:t>EligibleChunks</m:t></m:r></m:den>
        </m:f>
      </m:e>
    </m:d>
    <m:r><m:t> × 100%,     </m:t></m:r>
    <m:r><m:rPr><m:nor/></m:rPr><m:t>Speedup</m:t></m:r>
    <m:r><m:t> = </m:t></m:r>
    <m:f>
      <m:num><m:sSub><m:e><m:r><m:t>T</m:t></m:r></m:e><m:sub><m:r><m:rPr><m:nor/></m:rPr><m:t>full</m:t></m:r></m:sub></m:sSub></m:num>
      <m:den><m:sSub><m:e><m:r><m:t>T</m:t></m:r></m:e><m:sub><m:r><m:rPr><m:nor/></m:rPr><m:t>incremental</m:t></m:r></m:sub></m:sSub></m:den>
    </m:f>
  </m:oMath>
</m:oMathPara>'''
                p_math = doc.add_paragraph()
                p_math.paragraph_format.space_before = Pt(6)
                p_math.paragraph_format.space_after = Pt(6)
                p_math._p.append(parse_xml(omml_eq2))
            elif 'Throughput' in math_content:
                omml_eq3 = '''<m:oMathPara xmlns:m="http://schemas.openxmlformats.org/officeDocument/2006/math">
  <m:oMath>
    <m:r><m:rPr><m:nor/></m:rPr><m:t>Throughput</m:t></m:r>
    <m:r><m:t> = </m:t></m:r>
    <m:f>
      <m:num><m:sSub><m:e><m:r><m:t>N</m:t></m:r></m:e><m:sub><m:r><m:rPr><m:nor/></m:rPr><m:t>successful</m:t></m:r></m:sub></m:sSub></m:num>
      <m:den><m:r><m:t>Δ</m:t></m:r><m:r><m:t>t</m:t></m:r></m:den>
    </m:f>
    <m:r><m:t>,     </m:t></m:r>
    <m:r><m:rPr><m:nor/></m:rPr><m:t>SuccessRate</m:t></m:r>
    <m:r><m:t> = </m:t></m:r>
    <m:d>
      <m:e>
        <m:f>
          <m:num><m:sSub><m:e><m:r><m:t>N</m:t></m:r></m:e><m:sub><m:r><m:rPr><m:nor/></m:rPr><m:t>successful</m:t></m:r></m:sub></m:sSub></m:num>
          <m:den><m:sSub><m:e><m:r><m:t>N</m:t></m:r></m:e><m:sub><m:r><m:rPr><m:nor/></m:rPr><m:t>total</m:t></m:r></m:sub></m:sSub></m:den>
        </m:f>
      </m:e>
    </m:d>
    <m:r><m:t> × 100%</m:t></m:r>
  </m:oMath>
</m:oMathPara>'''
                p_math = doc.add_paragraph()
                p_math.paragraph_format.space_before = Pt(6)
                p_math.paragraph_format.space_after = Pt(6)
                p_math._p.append(parse_xml(omml_eq3))
            else:
                p_math = doc.add_paragraph()
                p_math.alignment = WD_ALIGN_PARAGRAPH.CENTER
                p_math.paragraph_format.space_before = Pt(6)
                p_math.paragraph_format.space_after = Pt(6)
                add_math_runs(p_math, math_content, base_font_size=11)
            i += 1
            continue

        # Tables
        if stripped.startswith('|') and stripped.endswith('|'):
            table_lines = []
            while i < n and lines[i].strip().startswith('|') and lines[i].strip().endswith('|'):
                table_lines.append(lines[i].strip())
                i += 1

            if len(table_lines) >= 2:
                headers = [c.strip() for c in table_lines[0][1:-1].split('|')]
                data_rows = []
                for tl in table_lines[2:]:
                    cols = [c.strip() for c in tl[1:-1].split('|')]
                    data_rows.append(cols)

                table = doc.add_table(rows=len(data_rows) + 1, cols=len(headers))
                table.alignment = WD_TABLE_ALIGNMENT.CENTER
                table.autofit = True

                hdr_cells = table.rows[0].cells
                for col_idx, h_text in enumerate(headers):
                    hdr_cells[col_idx].text = ""
                    p = hdr_cells[col_idx].paragraphs[0]
                    p.paragraph_format.space_before = Pt(3)
                    p.paragraph_format.space_after = Pt(3)
                    p.alignment = WD_ALIGN_PARAGRAPH.CENTER if col_idx > 0 else WD_ALIGN_PARAGRAPH.LEFT
                    add_formatted_text(p, convert_to_apa_citations(h_text), base_font_size=9.5, is_bold=True)
                    set_cell_background(hdr_cells[col_idx], "F1F5F9")
                    set_cell_margins(hdr_cells[col_idx], top=80, bottom=80, left=120, right=120)

                for r_idx, row_data in enumerate(data_rows):
                    row_cells = table.rows[r_idx + 1].cells
                    bg_color = "FFFFFF" if r_idx % 2 == 0 else "F8FAFC"
                    for col_idx, cell_value in enumerate(row_data):
                        if col_idx < len(row_cells):
                            row_cells[col_idx].text = ""
                            p = row_cells[col_idx].paragraphs[0]
                            p.paragraph_format.space_before = Pt(2)
                            p.paragraph_format.space_after = Pt(2)
                            is_center = col_idx > 0 or cell_value.isdigit()
                            p.alignment = WD_ALIGN_PARAGRAPH.CENTER if is_center else WD_ALIGN_PARAGRAPH.LEFT
                            add_formatted_text(p, convert_to_apa_citations(cell_value), base_font_size=9)
                            set_cell_background(row_cells[col_idx], bg_color)
                            set_cell_margins(row_cells[col_idx], top=60, bottom=60, left=100, right=100)

                p_after = doc.add_paragraph()
                p_after.paragraph_format.space_before = Pt(0)
                p_after.paragraph_format.space_after = Pt(6)
            continue

        # Lists
        if re.match(r'^[-*•]\s+', stripped):
            item_text = re.sub(r'^[-*•]\s+', '', stripped)
            # Anonymize repo link if in Section 9
            if 'github.com/kode4u' in item_text:
                item_text = item_text.replace('https://github.com/kode4u/kwiz.git', '[Anonymized Repository URL for Double-Blind Review]')
            p = doc.add_paragraph(style='List Bullet')
            p.paragraph_format.space_before = Pt(1)
            p.paragraph_format.space_after = Pt(2)
            p.paragraph_format.line_spacing = 1.15
            add_formatted_text(p, convert_to_apa_citations(item_text), base_font_size=11)
            i += 1
            continue

        if re.match(r'^\d+\.\s+', stripped):
            item_text = re.sub(r'^\d+\.\s+', '', stripped)
            if 'github.com/kode4u' in item_text:
                item_text = item_text.replace('https://github.com/kode4u/kwiz.git', '[Anonymized Repository URL for Double-Blind Review]')
            p = doc.add_paragraph(style='List Number')
            p.paragraph_format.space_before = Pt(1)
            p.paragraph_format.space_after = Pt(2)
            p.paragraph_format.line_spacing = 1.15
            add_formatted_text(p, convert_to_apa_citations(item_text), base_font_size=11)
            i += 1
            continue

        # Standard Paragraph
        p = doc.add_paragraph()
        p.paragraph_format.space_before = Pt(0)
        p.paragraph_format.space_after = Pt(6)
        p.paragraph_format.line_spacing = 1.15
        
        para_text = stripped
        if 'github.com/kode4u' in para_text:
            para_text = para_text.replace('https://github.com/kode4u/kwiz.git', '[Anonymized Repository URL for Double-Blind Review]')
            
        add_formatted_text(p, convert_to_apa_citations(para_text), base_font_size=11)
        i += 1

    doc.save(docx_path)
    print(f"Generated EAIT Blinded Manuscript: {docx_path} ({os.path.getsize(docx_path)} bytes)")

if __name__ == '__main__':
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    md_file = os.path.join(base_dir, 'papers', 'paper.md')
    blinded_docx = os.path.join(base_dir, 'papers', 'Blinded_Manuscript_EAIT.docx')
    create_blinded_manuscript(md_file, blinded_docx)
    
    # Also sync to root papers/
    root_blinded_docx = os.path.join(os.path.dirname(base_dir), 'papers', 'Blinded_Manuscript_EAIT.docx')
    import shutil
    shutil.copyfile(blinded_docx, root_blinded_docx)
