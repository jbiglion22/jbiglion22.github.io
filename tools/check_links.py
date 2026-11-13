"""Check the generated site: every local link and picture must point to an existing file.

Run after tools/build_pages.py:  python tools/check_links.py
Exit code 0 = all good, 1 = something is missing (the list is printed).
"""
import pathlib
import re
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
SKIP = ('content', 'tools', 'data', '.idea', '.git', '자료실')


def target_file(page, ref):
    path = ref.split('#')[0].split('?')[0]
    if path.startswith('/'):
        f = ROOT / path.lstrip('/')
    else:
        f = (page.parent / path).resolve()
    if path.endswith('/') or f.is_dir() or path == '':
        f = f / 'index.html'
    return f


def main():
    pages = [p for p in ROOT.rglob('*.html') if not p.relative_to(ROOT).parts[0] in SKIP]
    broken, count = [], 0
    for page in pages:
        for ref in re.findall(r'(?:href|src)="([^"]+)"', page.read_text(encoding='utf8')):
            if ref.startswith(('http:', 'https:', '#', 'mailto:', 'data:')):
                continue
            count += 1
            if not target_file(page, ref).exists():
                broken.append(f'{page.relative_to(ROOT)} -> {ref}')
    print(f'{len(pages)} pages, {count} local links and pictures checked, {len(broken)} broken.')
    for b in broken:
        print('  BROKEN', b)
    return 1 if broken else 0


if __name__ == '__main__':
    sys.exit(main())
