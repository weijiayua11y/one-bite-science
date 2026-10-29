"""Check local release assets and card data without changing the site."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit, unquote
import json

root = Path(__file__).resolve().parents[1] / 'dist'
errors = []
class LinkParser(HTMLParser):
    def __init__(self, filename):
        super().__init__()
        self.filename = filename
    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        for key in ('href', 'src', 'poster'):
            value = attrs.get(key)
            if not value or value.startswith(('#', 'data:', 'mailto:')):
                continue
            parts = urlsplit(value)
            if parts.scheme or parts.netloc:
                continue
            target = (self.filename.parent / unquote(parts.path)).resolve()
            if target != root and root not in target.parents:
                errors.append(f'Path outside release: {self.filename.name}: {value}')
            elif not target.exists():
                errors.append(f'Missing local asset: {self.filename.name}: {value}')
for file in root.rglob('*.html'):
    LinkParser(file).feed(file.read_text(encoding='utf-8'))
cards = json.loads((root / 'assets/science-cards.json').read_text(encoding='utf-8'))
assert len(cards) == 30
assert len({x['id'] for x in cards}) == 30
assert all(len(x['choices']) == 3 and 0 <= x['answerIndex'] < 3 for x in cards)
for kind in ('分子', '乳液', '研究证据'):
    assert sum(x['category'] == kind for x in cards) == 10
if errors:
    raise SystemExit('\n'.join(errors))
print(f'Release references OK: {len(list(root.rglob("*.html")))} pages; 30 cards valid.')
