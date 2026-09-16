#!/usr/bin/env python3
import os
import zipfile
import sys

def package_h5p(build_dir, output_file):
    print(f"Packaging {build_dir} -> {output_file}...")
    with zipfile.ZipFile(output_file, "w", zipfile.ZIP_DEFLATED) as zf:
        for root, dirs, files in os.walk(build_dir):
            dirs[:] = [d for d in dirs if not d.startswith(".")]
            for f in files:
                if f.startswith(".") or f == ".DS_Store" or f.endswith(".patch"):
                    continue
                full_path = os.path.join(root, f)
                rel_path = os.path.relpath(full_path, build_dir)
                rel_path = rel_path.replace(os.sep, "/")
                zf.write(full_path, rel_path)
    print(f"Successfully created {output_file} ({os.path.getsize(output_file) / 1024 / 1024:.2f} MB)")

if __name__ == "__main__":
    base = os.path.dirname(os.path.abspath(__file__))
    build_dir = os.path.join(base, "h5p_smooth_build")
    out_file = os.path.join(base, "rise-smooth-course.h5p")
    package_h5p(build_dir, out_file)
