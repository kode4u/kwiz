import markdown
import os
import subprocess

md_path = '/Users/engtitya/Desktop/kwiz/papers/paper.md'
html_path = '/Users/engtitya/Desktop/kwiz/papers/paper.html'
pdf_path = '/Users/engtitya/Desktop/kwiz/papers/paper.pdf'

with open(md_path, 'r', encoding='utf-8') as f:
    text = f.read()

# Convert markdown to html with table and code extensions
html_body = markdown.markdown(text, extensions=['tables', 'fenced_code', 'nl2br'])

html_template = f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Toward Efficient Course-Grounded Programming MCQ Generation: An End-to-End Self-Hosted RAG Pipeline for Moodle</title>
    <!-- KaTeX for LaTeX math rendering -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css">
    <script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.js"></script>
    <script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/contrib/auto-render.min.js" onload="renderMathInElement(document.body, {{delimiters: [{{left: '$$', right: '$$', display: true}}, {{left: '$', right: '$', display: false}}]}});"></script>
    <style>
        @page {{
            size: A4;
            margin: 20mm 15mm;
        }}
        body {{
            font-family: 'Times New Roman', Times, 'Liberation Serif', serif;
            font-size: 10.5pt;
            line-height: 1.55;
            color: #1a1a1a;
            background-color: #ffffff;
            max-width: 850px;
            margin: 0 auto;
            padding: 30px 20px;
        }}
        h1 {{
            font-family: 'Helvetica Neue', Arial, sans-serif;
            font-size: 19pt;
            font-weight: 700;
            text-align: center;
            margin-bottom: 12px;
            color: #0d2b45;
            line-height: 1.25;
        }}
        .author-block {{
            text-align: center;
            font-size: 11pt;
            font-weight: bold;
            margin-bottom: 4px;
        }}
        .affil-block {{
            text-align: center;
            font-size: 9.5pt;
            font-style: italic;
            color: #555;
            margin-bottom: 25px;
        }}
        h2 {{
            font-family: 'Helvetica Neue', Arial, sans-serif;
            font-size: 13pt;
            font-weight: bold;
            border-bottom: 1.5px solid #0d2b45;
            padding-bottom: 4px;
            margin-top: 26px;
            margin-bottom: 10px;
            color: #0d2b45;
        }}
        h3 {{
            font-family: 'Helvetica Neue', Arial, sans-serif;
            font-size: 11pt;
            font-weight: bold;
            margin-top: 18px;
            margin-bottom: 6px;
            color: #1a4a72;
        }}
        h1, h2, h3, h4 {{
            page-break-after: avoid;
            break-after: avoid;
        }}
        h4 {{
            font-family: 'Helvetica Neue', Arial, sans-serif;
            font-size: 10pt;
            font-weight: bold;
            margin-top: 14px;
            margin-bottom: 6px;
            color: #2c3e50;
            page-break-after: avoid;
            break-after: avoid;
        }}
        p {{
            text-align: justify;
            margin-bottom: 10px;
        }}
        ul, ol {{
            margin-top: 4px;
            margin-bottom: 10px;
            padding-left: 22px;
        }}
        li {{
            margin-bottom: 4px;
        }}
        table {{
            width: 100%;
            border-collapse: collapse;
            margin: 16px 0;
            font-size: 9pt;
            font-family: 'Helvetica Neue', Arial, sans-serif;
            page-break-inside: avoid;
            break-inside: avoid;
        }}
        th, td {{
            border: 1px solid #d0d7de;
            padding: 7px 9px;
            text-align: left;
        }}
        th {{
            background-color: #f0f4f8;
            font-weight: bold;
            color: #0d2b45;
        }}
        tr:nth-child(even) {{
            background-color: #f9fbfd;
        }}
        code {{
            font-family: 'Courier New', Courier, monospace;
            background-color: #f4f6f8;
            padding: 1px 4px;
            border-radius: 3px;
            font-size: 9pt;
        }}
        pre {{
            background-color: #282c34;
            color: #abb2bf;
            padding: 12px;
            border-radius: 5px;
            overflow-x: auto;
            font-size: 8.5pt;
            line-height: 1.4;
        }}
        pre code {{
            background-color: transparent;
            color: inherit;
            padding: 0;
        }}
        blockquote {{
            border-left: 3.5px solid #0d2b45;
            margin: 12px 0;
            padding: 6px 14px;
            background-color: #f4f8fc;
            color: #333;
            font-style: italic;
        }}
        hr {{
            border: none;
            border-top: 1px solid #e1e4e8;
            margin: 20px 0;
        }}
        figure, .academic-figure {{
            margin: 20px auto;
            text-align: center;
            page-break-inside: avoid;
            break-inside: avoid;
        }}
        img {{
            max-width: 100%;
            height: auto;
            display: block;
            margin: 14px auto 6px auto;
            border: none;
            box-shadow: none;
        }}
        p:has(> img) {{
            text-align: center;
            margin-top: 18px;
            margin-bottom: 18px;
            page-break-inside: avoid;
            break-inside: avoid;
        }}
        p:has(> img) em, figcaption {{
            display: block;
            text-align: justify;
            font-size: 9pt;
            line-height: 1.4;
            color: #222222;
            margin-top: 6px;
            padding: 0 10px;
        }}
    </style>
</head>
<body>
{html_body}
</body>
</html>
"""

with open(html_path, 'w', encoding='utf-8') as f:
    f.write(html_template)
print(f"Generated {html_path} ({len(html_template)} bytes)")

# Compile to PDF using headless Chrome
chrome_path = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
cmd = [
    chrome_path,
    "--headless",
    "--disable-gpu",
    "--no-pdf-header-footer",
    f"--print-to-pdf={pdf_path}",
    f"file://{html_path}"
]

print("Compiling PDF with headless Chrome...")
res = subprocess.run(cmd, capture_output=True, text=True)
if res.returncode == 0 and os.path.exists(pdf_path):
    print(f"Compiled {pdf_path} successfully ({os.path.getsize(pdf_path)} bytes)")
else:
    print(f"Chrome PDF exit code: {res.returncode}")
    print("Stderr:", res.stderr[:500])
