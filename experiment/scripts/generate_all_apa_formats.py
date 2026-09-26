import os
import re
import subprocess
import shutil
import markdown

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
EXP_PAPERS = os.path.join(BASE_DIR, 'papers')
ROOT_PAPERS = os.path.join(os.path.dirname(BASE_DIR), 'papers')

CHROME_PATH = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"

HTML_STYLE = """
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- KaTeX for LaTeX math rendering -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css">
    <script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.js"></script>
    <script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/contrib/auto-render.min.js" onload="renderMathInElement(document.body, {delimiters: [{left: '$$', right: '$$', display: true}, {left: '$', right: '$', display: false}]});"></script>
    <style>
        @page {
            size: A4;
            margin: 20mm 15mm;
        }
        body {
            font-family: 'Times New Roman', Times, 'Liberation Serif', serif;
            font-size: 10.5pt;
            line-height: 1.55;
            color: #1a1a1a;
            background-color: #ffffff;
            max-width: 850px;
            margin: 0 auto;
            padding: 30px 20px;
        }
        h1 {
            font-family: 'Helvetica Neue', Arial, sans-serif;
            font-size: 18pt;
            font-weight: 700;
            text-align: center;
            margin-bottom: 12px;
            color: #0d2b45;
            line-height: 1.25;
        }
        .author-block {
            text-align: center;
            font-size: 11pt;
            font-weight: bold;
            margin-bottom: 4px;
        }
        .affil-block {
            text-align: center;
            font-size: 9.5pt;
            font-style: italic;
            color: #555;
            margin-bottom: 25px;
        }
        h2 {
            font-family: 'Helvetica Neue', Arial, sans-serif;
            font-size: 13pt;
            font-weight: bold;
            border-bottom: 1.5px solid #0d2b45;
            padding-bottom: 4px;
            margin-top: 26px;
            margin-bottom: 10px;
            color: #0d2b45;
        }
        h3 {
            font-family: 'Helvetica Neue', Arial, sans-serif;
            font-size: 11pt;
            font-weight: bold;
            margin-top: 18px;
            margin-bottom: 6px;
            color: #1a4a72;
        }
        h4 {
            font-family: 'Helvetica Neue', Arial, sans-serif;
            font-size: 10pt;
            font-weight: bold;
            margin-top: 14px;
            margin-bottom: 6px;
            color: #2c3e50;
        }
        h1, h2, h3, h4 {
            page-break-after: avoid;
            break-after: avoid;
        }
        p {
            text-align: justify;
            margin-bottom: 10px;
        }
        ul, ol {
            margin-top: 4px;
            margin-bottom: 10px;
            padding-left: 22px;
        }
        li {
            margin-bottom: 4px;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin: 16px 0;
            font-size: 9pt;
            font-family: 'Helvetica Neue', Arial, sans-serif;
            page-break-inside: avoid;
            break-inside: avoid;
        }
        th, td {
            border: 1px solid #d0d7de;
            padding: 7px 9px;
            text-align: left;
        }
        th {
            background-color: #f0f4f8;
            font-weight: bold;
            color: #0d2b45;
        }
        tr:nth-child(even) {
            background-color: #f9fbfd;
        }
        code {
            font-family: 'Courier New', Courier, monospace;
            background-color: #f4f6f8;
            padding: 1px 4px;
            border-radius: 3px;
            font-size: 9pt;
        }
        pre {
            background-color: #282c34;
            color: #abb2bf;
            padding: 12px;
            border-radius: 5px;
            overflow-x: auto;
            font-size: 8.5pt;
            line-height: 1.4;
        }
        pre code {
            background-color: transparent;
            color: inherit;
            padding: 0;
        }
        blockquote {
            border-left: 3.5px solid #0d2b45;
            margin: 12px 0;
            padding: 6px 14px;
            background-color: #f4f8fc;
            color: #333;
            font-style: italic;
        }
        hr {
            border: none;
            border-top: 1px solid #e1e4e8;
            margin: 20px 0;
        }
        img {
            max-width: 100%;
            height: auto;
            display: block;
            margin: 14px auto 6px auto;
        }
        p:has(> img) {
            text-align: center;
            margin-top: 18px;
            margin-bottom: 18px;
            page-break-inside: avoid;
            break-inside: avoid;
        }
        /* APA 7th Edition Reference List Hanging Indent */
        .apa-references {
            margin-top: 12px;
        }
        .apa-references p {
            padding-left: 2.5em !important;
            text-indent: -2.5em !important;
            margin-bottom: 8px !important;
            line-height: 1.45 !important;
            font-size: 9.5pt !important;
            text-align: left !important;
        }
    </style>
"""

def wrap_apa_references_in_html(html_body):
    """Wraps paragraphs after <h2>References</h2> in <div class="apa-references">"""
    ref_marker = '<h2>References</h2>'
    if ref_marker in html_body:
        parts = html_body.split(ref_marker)
        before = parts[0] + ref_marker
        after = parts[1]
        
        # Check if there is a subsequent <h2>
        next_h2 = after.find('<h2>')
        if next_h2 != -1:
            ref_content = after[:next_h2]
            rest = after[next_h2:]
            return before + '\n<div class="apa-references">\n' + ref_content + '\n</div>\n' + rest
        else:
            return before + '\n<div class="apa-references">\n' + after + '\n</div>\n'
    return html_body

def compile_html_to_pdf(html_path, pdf_path):
    cmd = [
        CHROME_PATH,
        "--headless",
        "--disable-gpu",
        "--no-pdf-header-footer",
        "--virtual-time-budget=4000",
        "--run-all-compositor-stages-before-draw",
        f"--print-to-pdf={pdf_path}",
        f"file://{html_path}"
    ]
    res = subprocess.run(cmd, capture_output=True, text=True)
    if res.returncode == 0 and os.path.exists(pdf_path):
        print(f"Compiled PDF: {pdf_path} ({os.path.getsize(pdf_path)} bytes)")
    else:
        print(f"Error compiling PDF {pdf_path}: {res.stderr[:300]}")

def build_paper_html_and_pdf():
    md_path = os.path.join(EXP_PAPERS, 'paper.md')
    html_path = os.path.join(EXP_PAPERS, 'paper.html')
    pdf_path = os.path.join(EXP_PAPERS, 'paper.pdf')
    
    with open(md_path, 'r', encoding='utf-8') as f:
        md_text = f.read()

    raw_html_body = markdown.markdown(md_text, extensions=['tables', 'fenced_code', 'nl2br'])
    formatted_html_body = wrap_apa_references_in_html(raw_html_body)

    full_html = f"""<!DOCTYPE html>
<html lang="en">
<head>
    <title>Toward Efficient Course-Grounded Programming MCQ Generation: An End-to-End Self-Hosted RAG Pipeline for Moodle</title>
    {HTML_STYLE}
</head>
<body>
{formatted_html_body}
</body>
</html>"""

    with open(html_path, 'w', encoding='utf-8') as f:
        f.write(full_html)
    print(f"Generated HTML: {html_path}")

    # Compile PDF
    compile_html_to_pdf(html_path, pdf_path)

    # Sync to root papers/
    root_html = os.path.join(ROOT_PAPERS, 'paper.html')
    root_pdf = os.path.join(ROOT_PAPERS, 'paper.pdf')
    shutil.copyfile(html_path, root_html)
    if os.path.exists(pdf_path):
        shutil.copyfile(pdf_path, root_pdf)
    print("Synced paper.html and paper.pdf to root papers/")

def build_blinded_manuscript_html_and_pdf():
    md_path = os.path.join(EXP_PAPERS, 'paper.md')
    html_path = os.path.join(EXP_PAPERS, 'Blinded_Manuscript_EAIT.html')
    pdf_path = os.path.join(EXP_PAPERS, 'Blinded_Manuscript_EAIT.pdf')

    with open(md_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    # Filter out author block and declarations for blinded version
    filtered = []
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
            filtered.append(line)
            continue
        if in_decl:
            continue
        if 'https://github.com/kode4u/kwiz.git' in line:
            line = line.replace('https://github.com/kode4u/kwiz.git', '[Anonymized Repository URL for Double-Blind Review]')
        filtered.append(line)

    blinded_md = "".join(filtered)
    raw_html_body = markdown.markdown(blinded_md, extensions=['tables', 'fenced_code', 'nl2br'])
    formatted_html_body = wrap_apa_references_in_html(raw_html_body)

    full_html = f"""<!DOCTYPE html>
<html lang="en">
<head>
    <title>Toward Efficient Course-Grounded Programming MCQ Generation [Blinded Manuscript for EAIT]</title>
    {HTML_STYLE}
</head>
<body>
{formatted_html_body}
</body>
</html>"""

    with open(html_path, 'w', encoding='utf-8') as f:
        f.write(full_html)
    print(f"Generated Blinded HTML: {html_path}")

    # Compile PDF
    compile_html_to_pdf(html_path, pdf_path)

    # Sync to root papers/
    root_html = os.path.join(ROOT_PAPERS, 'Blinded_Manuscript_EAIT.html')
    root_pdf = os.path.join(ROOT_PAPERS, 'Blinded_Manuscript_EAIT.pdf')
    shutil.copyfile(html_path, root_html)
    if os.path.exists(pdf_path):
        shutil.copyfile(pdf_path, root_pdf)
    print("Synced Blinded_Manuscript_EAIT.html and Blinded_Manuscript_EAIT.pdf to root papers/")

def build_title_page_html_and_pdf():
    html_path = os.path.join(EXP_PAPERS, 'Title_Page_EAIT.html')
    pdf_path = os.path.join(EXP_PAPERS, 'Title_Page_EAIT.pdf')

    title_html = f"""<!DOCTYPE html>
<html lang="en">
<head>
    <title>Title Page - Toward Efficient Course-Grounded Programming MCQ Generation</title>
    {HTML_STYLE}
</head>
<body style="max-width: 800px; padding: 40px 30px;">
    <h1>Toward Efficient Course-Grounded Programming MCQ Generation: An End-to-End Self-Hosted RAG Pipeline for Moodle</h1>
    <p style="text-align: center; color: #475569; font-style: italic; margin-bottom: 25px; font-size: 11pt;">
        <strong>Title Page for Double-Blind Review</strong><br>
        Target Journal: <em>Education and Information Technologies</em> (EAIT, Springer Nature)
    </p>

    <h2>Author Information</h2>
    <p>
        <strong>Author:</strong> ENG Titya<br>
        <strong>Affiliation:</strong> Faculty of Science and Technology, National University of Battambang, Battambang 020101, Cambodia<br>
        <strong>Corresponding Author:</strong> ENG Titya (Email: <code>eng.titya@nubb.edu.kh</code>)
    </p>

    <h2>Statements and Declarations</h2>
    <ul>
        <li><strong>Funding:</strong> This research was supported by INACON research funding.</li>
        <li><strong>Competing Interests:</strong> The author declares that they have no competing financial or non-financial interests that are directly or indirectly related to the work submitted for publication.</li>
        <li><strong>Ethics Approval:</strong> Not applicable. This investigation evaluates an automated computational software pipeline, local machine learning models, and synthetic assessment question generation. No human subjects, patients, or student academic records were involved, and no personal identifiable data were collected or processed.</li>
        <li><strong>Informed Consent to Participate:</strong> Not applicable.</li>
        <li><strong>Consent for Publication:</strong> Not applicable.</li>
        <li><strong>Data Availability:</strong> All course benchmark materials, configuration templates, rating rubrics, and empirical telemetry logs generated during the study are included in the companion open-source repository.</li>
        <li><strong>Code Availability:</strong> The complete self-hosted RAG pipeline, Moodle Question Bank integration plugin, Docker Compose multi-container orchestrations, and automated evaluation suites are publicly available at <code>https://github.com/kode4u/kwiz.git</code>.</li>
        <li><strong>Author Contributions:</strong> ENG Titya conceived and designed the study, implemented the RAG pipeline architecture and native Moodle plugin integration, performed the experimental benchmarks and statistical evaluations, analyzed the empirical results, and authored the complete manuscript.</li>
        <li><strong>Generative AI Disclosure:</strong> In accordance with Springer Nature editorial policy, the author confirms that large language models (local Qwen2.5-Coder-7B and frontier LLM judges) served as the operational subject of the research pipeline and that automated LLM evaluation was calibrated against deterministic AST verification. Generative tools were only utilized for minor English language proofreading; the author takes full personal responsibility for the accuracy and originality of all content.</li>
    </ul>

    <h2>Acknowledgments</h2>
    <p>The author acknowledges the institutional support provided by the National University of Battambang (NUBB) and the computational infrastructure provided for single-GPU experimental benchmarking.</p>
</body>
</html>"""

    with open(html_path, 'w', encoding='utf-8') as f:
        f.write(title_html)
    print(f"Generated Title Page HTML: {html_path}")

    # Compile PDF
    compile_html_to_pdf(html_path, pdf_path)

    # Sync to root papers/
    root_html = os.path.join(ROOT_PAPERS, 'Title_Page_EAIT.html')
    root_pdf = os.path.join(ROOT_PAPERS, 'Title_Page_EAIT.pdf')
    shutil.copyfile(html_path, root_html)
    if os.path.exists(pdf_path):
        shutil.copyfile(pdf_path, root_pdf)
    print("Synced Title_Page_EAIT.html and Title_Page_EAIT.pdf to root papers/")

if __name__ == '__main__':
    build_paper_html_and_pdf()
    build_blinded_manuscript_html_and_pdf()
    build_title_page_html_and_pdf()
