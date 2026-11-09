"""Add Chapter 1 new words to the CSV and regenerate words.json."""
import csv, json, os

CSV_PATH = os.path.expanduser("~/Desktop/Farsi/farsi_word_list.csv")
JSON_PATH = "data/words.json"

new_words = [
    {"id": 1001, "chapter": 1, "source": "course", "theme": "Morning at Home",
     "english": "hungry", "persian_written": "گرسنه", "mango_pronunciation": "gorsneh",
     "persian_spoken": "گشنه", "spoken_pronunciation": "goshneh", "note": "spoken form drops the r"},
    {"id": 1002, "chapter": 1, "source": "course", "theme": "Morning at Home",
     "english": "thirsty", "persian_written": "تشنه", "mango_pronunciation": "teshneh",
     "persian_spoken": "تشنه", "spoken_pronunciation": "teshneh", "note": ""},
    {"id": 1003, "chapter": 1, "source": "course", "theme": "Morning at Home",
     "english": "happy", "persian_written": "خوشحال", "mango_pronunciation": "khosh-hahl",
     "persian_spoken": "خوشحال", "spoken_pronunciation": "khosh-hahl", "note": ""},
    {"id": 1004, "chapter": 1, "source": "course", "theme": "Morning at Home",
     "english": "upset, sad", "persian_written": "ناراحت", "mango_pronunciation": "nah-rah-hat",
     "persian_spoken": "ناراحت", "spoken_pronunciation": "nah-rah-hat", "note": ""},
    {"id": 1005, "chapter": 1, "source": "course", "theme": "Morning at Home",
     "english": "tired", "persian_written": "خسته", "mango_pronunciation": "khasteh",
     "persian_spoken": "خسته", "spoken_pronunciation": "khasteh", "note": ""},
    {"id": 1006, "chapter": 1, "source": "course", "theme": "Morning at Home",
     "english": "awake", "persian_written": "بیدار", "mango_pronunciation": "bee-dahr",
     "persian_spoken": "بیدار", "spoken_pronunciation": "bee-dahr", "note": ""},
    {"id": 1007, "chapter": 1, "source": "course", "theme": "Morning at Home",
     "english": "come!", "persian_written": "بیا", "mango_pronunciation": "bee-ah",
     "persian_spoken": "بیا", "spoken_pronunciation": "bee-ah", "note": "informal imperative"},
    {"id": 1008, "chapter": 1, "source": "course", "theme": "Morning at Home",
     "english": "go!", "persian_written": "برو", "mango_pronunciation": "boro",
     "persian_spoken": "برو", "spoken_pronunciation": "boro", "note": "informal imperative"},
    {"id": 1009, "chapter": 1, "source": "course", "theme": "Morning at Home",
     "english": "sit down!", "persian_written": "بشین", "mango_pronunciation": "beshin",
     "persian_spoken": "بشین", "spoken_pronunciation": "beshin", "note": "informal imperative"},
    {"id": 1010, "chapter": 1, "source": "course", "theme": "Morning at Home",
     "english": "get up!", "persian_written": "بلند شو", "mango_pronunciation": "boland sho",
     "persian_spoken": "بلند شو", "spoken_pronunciation": "boland sho", "note": "informal imperative"},
    {"id": 1011, "chapter": 1, "source": "course", "theme": "Morning at Home",
     "english": "wait!", "persian_written": "صبر کن", "mango_pronunciation": "sabr kon",
     "persian_spoken": "صبر کن", "spoken_pronunciation": "sabr kon", "note": "informal imperative"},
    {"id": 1012, "chapter": 1, "source": "course", "theme": "Morning at Home",
     "english": "look!", "persian_written": "ببین", "mango_pronunciation": "bebin",
     "persian_spoken": "ببین", "spoken_pronunciation": "bebin", "note": "informal imperative"},
    {"id": 1013, "chapter": 1, "source": "course", "theme": "Morning at Home",
     "english": "again", "persian_written": "دوباره", "mango_pronunciation": "dobah-reh",
     "persian_spoken": "دوباره", "spoken_pronunciation": "dobah-reh", "note": ""},
    {"id": 1014, "chapter": 1, "source": "course", "theme": "Morning at Home",
     "english": "a little", "persian_written": "یک کم", "mango_pronunciation": "yek kam",
     "persian_spoken": "یه کم", "spoken_pronunciation": "yeh kam", "note": "spoken: yeh not yek"},
    {"id": 1015, "chapter": 1, "source": "course", "theme": "Morning at Home",
     "english": "patience, mood", "persian_written": "حوصله", "mango_pronunciation": "howseleh",
     "persian_spoken": "حوصله", "spoken_pronunciation": "howseleh", "note": "howseleh nadahram = I'm bored"},
    {"id": 1016, "chapter": 1, "source": "course", "theme": "Morning at Home",
     "english": "hurry", "persian_written": "عجله", "mango_pronunciation": "ajaleh",
     "persian_spoken": "عجله", "spoken_pronunciation": "ajaleh", "note": "ajaleh nakon = don't hurry"},
    {"id": 1017, "chapter": 1, "source": "course", "theme": "Morning at Home",
     "english": "breakfast", "persian_written": "صبحانه", "mango_pronunciation": "sobhahneh",
     "persian_spoken": "صبحونه", "spoken_pronunciation": "sobhooneh", "note": "spoken form changes ah to oo"},
]

# Append to CSV
fieldnames = ["id", "mango_set", "theme", "english", "persian_written", "mango_pronunciation",
              "persian_spoken", "spoken_pronunciation", "note", "also_in_sets", "chapter", "source"]

with open(CSV_PATH, 'a', encoding='utf-8', newline='') as f:
    writer = csv.DictWriter(f, fieldnames=fieldnames)
    for w in new_words:
        row = {
            "id": w["id"],
            "mango_set": "",
            "theme": w["theme"],
            "english": w["english"],
            "persian_written": w["persian_written"],
            "mango_pronunciation": w["mango_pronunciation"],
            "persian_spoken": w["persian_spoken"],
            "spoken_pronunciation": w["spoken_pronunciation"],
            "note": w["note"],
            "also_in_sets": "",
            "chapter": w["chapter"],
            "source": w["source"],
        }
        writer.writerow(row)

print(f"Added {len(new_words)} words to CSV")

# Regenerate words.json
rows = []
with open(CSV_PATH, 'r', encoding='utf-8-sig') as f:
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
            'source': row.get('source', 'mango'),
            'chapter': int(row['chapter']) if row.get('chapter') else None,
        })

with open(JSON_PATH, 'w', encoding='utf-8') as f:
    json.dump(rows, f, ensure_ascii=False, indent=2)

print(f"Updated words.json with {len(rows)} total words")
