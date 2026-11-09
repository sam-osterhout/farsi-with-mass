import csv, json

rows = []
with open('farsi_word_list.csv', 'r', encoding='utf-8-sig') as f:
    reader = csv.DictReader(f)
    for row in reader:
        word_id = row.get('id', list(row.values())[0])
        rows.append({
            'id': int(word_id),
            'mango_set': int(row.get('mango_set', 0) or 0),
            'theme': row.get('theme', ''),
            'english': row.get('english', ''),
            'persian_written': row.get('persian_written', ''),
            'pronunciation': row.get('mango_pronunciation', ''),
            'persian_spoken': row.get('persian_spoken', '') or row.get('persian_written', ''),
            'spoken_pronunciation': row.get('spoken_pronunciation', '') or row.get('mango_pronunciation', ''),
            'note': row.get('note', ''),
            'source': 'mango'
        })

with open('data/words.json', 'w', encoding='utf-8') as f:
    json.dump(rows, f, ensure_ascii=False, indent=2)

print('Converted %d words to data/words.json' % len(rows))
