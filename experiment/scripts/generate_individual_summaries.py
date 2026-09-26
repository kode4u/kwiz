import os
import subprocess
import markdown
from generate_reference_compendium import summaries

out_dir = "/Users/engtitya/Desktop/kwiz/experiment/papers/reference_summaries"
os.makedirs(out_dir, exist_ok=True)
chrome_path = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"

for s in summaries:
    safe_name = f"{int(s['id']):02d}_{s['title'][:35].replace(' ', '_').replace(':', '').replace('/', '_')}"
    md_file = os.path.join(out_dir, f"{safe_name}.md")
    html_file = os.path.join(out_dir, f"{safe_name}.html")
    pdf_file = os.path.join(out_dir, f"{safe_name}.pdf")

    md = f"""# [{s['id']}] {s['title']}
* **Authors:** {s['authors']}
* **Venue & Year:** {s['venue']}
* **Category:** `{s['category']}`
* **Associated Full Paper PDF:** `{s['pdf_file']}`

---

### ⚡ 1-Minute Executive Takeaway
> **Key Finding:** {s['takeaway']}

---

### 🎯 Core Research Objective
{s['objective']}

---

### 🔬 Methodology & Architecture
{s['methodology']}

---

### 📊 Key Empirical Findings & Evidence
{s['findings']}

---

### 🔗 Direct Relevance to Our Kwiz Paper
{s['relevance']}
"""
    with open(md_file, 'w', encoding='utf-8') as f:
        f.write(md)

    html_body = markdown.markdown(md, extensions=['tables', 'fenced_code', 'nl2br'])
    html = f"""<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
@page {{ size: A4; margin: 20mm 15mm; }}
body {{ font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; font-size: 10.5pt; line-height: 1.55; color: #1e293b; max-width: 800px; margin: 0 auto; padding: 20px; }}
h1 {{ font-size: 15pt; color: #0f172a; border-bottom: 2px solid #2563eb; padding-bottom: 6px; margin-bottom: 12px; }}
h3 {{ font-size: 11.5pt; color: #1e3a8a; margin-top: 14px; margin-bottom: 6px; }}
blockquote {{ background-color: #f0fdf4; border-left: 4px solid #16a34a; padding: 10px 14px; font-size: 10pt; color: #14532d; border-radius: 4px; margin: 10px 0; }}
ul {{ padding-left: 20px; margin: 6px 0; }}
li {{ margin-bottom: 4px; }}
code {{ background-color: #f1f5f9; padding: 2px 6px; border-radius: 4px; font-size: 9pt; }}
hr {{ border: 0; height: 1px; background: #e2e8f0; margin: 14px 0; }}
</style>
</head>
<body>{html_body}</body>
</html>"""
    with open(html_file, 'w', encoding='utf-8') as f:
        f.write(html)

    cmd = [
        chrome_path, "--headless", "--disable-gpu", "--no-pdf-header-footer",
        f"--print-to-pdf={pdf_file}", f"file://{html_file}"
    ]
    subprocess.run(cmd, capture_output=True)
    # Clean up intermediate html
    if os.path.exists(html_file):
        os.remove(html_file)

print(f"Generated all {len(summaries)} individual summary PDFs in {out_dir}")
