# Quick Upgrade Guide

## ✅ All Features Implemented!

### New Features Added:

1. **LLM Backend Selection** - Choose between OpenAI, Gemini, or Local LLM
2. **Template Selection** - Choose from Default, Kahoot, Minimal, or Modern templates
3. **Color Palette** - Select from Kahoot, Blue, Green, Purple, Orange, Red, or Custom
4. **Predefined Questions** - Option to use predefined questions instead of AI generation
5. **Question Editor** - Full-featured editor to add/edit questions manually
6. **Kahoot-style UI** - Beautiful, modern interface inspired by Kahoot

## 🚀 How to Update

### Quick Update Steps:

```powershell
# 1. Stop containers
docker-compose down

# 2. Pull latest code (if using git) or copy updated files manually

# 3. Rebuild LLM API (for Gemini support)
docker-compose build llmapi

# 4. Start containers
docker-compose up -d

# 5. Run Moodle upgrade
docker-compose exec moodle php admin/cli/upgrade.php --non-interactive

# 6. Clear cache
docker-compose exec moodle php admin/cli/purge_caches.php
```

### Verify Update:

1. **Check Plugin Version:**
   - Go to: Site administration → Plugins → Plugins overview → Activity modules
   - Should show version `2025010104`

2. **Test New Features:**
   - Create a new quiz
   - Verify you see:
     - ✅ LLM Backend dropdown
     - ✅ Template dropdown
     - ✅ Color Palette dropdown
     - ✅ "Use Predefined Questions" checkbox
   - Open an existing quiz
   - Verify you see:
     - ✅ "Edit Questions" button
     - ✅ Template and colors applied

## 📋 Configuration

### For Gemini Support:

Add to `docker/.env`:
```env
GEMINI_API_KEY=your-gemini-api-key
```

Get API key from: https://makersuite.google.com/app/apikey

### For Local LLM (Ollama):

1. Install Ollama: https://ollama.ai
2. Start Ollama service
3. Add to `docker/.env`:
```env
LOCAL_LLM_URL=http://host.docker.internal:11434
```

## 🎨 Using New Features

### Creating a Quiz with Custom Settings:

1. **Add Activity** → Gamified Quiz
2. **Fill in basic info:**
   - Quiz Name
   - Topic
   - Difficulty
   - Language

3. **Select LLM Backend:**
   - OpenAI (default) - Requires OPENAI_API_KEY
   - Gemini - Requires GEMINI_API_KEY
   - Local LLM - Requires Ollama running

4. **Choose Template:**
   - Default - Standard Moodle style
   - Kahoot Style - Colorful, game-like
   - Minimal - Clean and simple
   - Modern - Contemporary design

5. **Select Color Palette:**
   - Kahoot - Purple/blue theme
   - Blue, Green, Purple, Orange, Red - Solid colors
   - Custom - Use your own colors

6. **Predefined Questions (Optional):**
   - Check "Use Predefined Questions"
   - Enter JSON format questions in textarea
   - Or use the question editor after generating

### Editing Questions:

1. Open your quiz
2. Click **"Generate Questions"** (or use predefined)
3. Click **"Edit Questions"**
4. In the editor:
   - Edit question text
   - Add/remove/edit choices
   - Mark correct answer (radio button)
   - Add new questions
   - Remove questions
5. Click **"Save Questions"**

### Question JSON Format:

```json
[
  {
    "question": "What is 2+2?",
    "choices": [
      {"text": "3", "is_correct": false},
      {"text": "4", "is_correct": true},
      {"text": "5", "is_correct": false},
      {"text": "6", "is_correct": false}
    ],
    "correct_index": 1,
    "difficulty": "easy"
  }
]
```

## 🐛 Troubleshooting

### Styles not loading?
```powershell
docker-compose exec moodle php admin/cli/purge_caches.php
# Then hard refresh browser (Ctrl+F5)
```

### Question editor not opening?
- Check browser console for errors
- Verify `ajax/save_questions.php` exists
- Check file permissions

### LLM backend not working?
- Verify API key in `docker/.env`
- Check LLM API logs: `docker-compose logs llmapi`
- Restart LLM API: `docker-compose restart llmapi`

## 📝 Files Changed

### New Files:
- `moodle-plugin/mod/gamifiedquiz/styles.css` - Template and color styles
- `moodle-plugin/mod/gamifiedquiz/ajax/save_questions.php` - Save edited questions
- `UPGRADE_INSTRUCTIONS.md` - Detailed upgrade guide
- `FEATURE_IMPLEMENTATION_SUMMARY.md` - Feature documentation

### Modified Files:
- `moodle-plugin/mod/gamifiedquiz/db/install.xml` - Added new fields
- `moodle-plugin/mod/gamifiedquiz/db/upgrade.php` - Upgrade script
- `moodle-plugin/mod/gamifiedquiz/mod_form.php` - Added form fields
- `moodle-plugin/mod/gamifiedquiz/view.php` - Added template/color support
- `moodle-plugin/mod/gamifiedquiz/js/app.js` - Added question editor
- `moodle-plugin/mod/gamifiedquiz/lib.php` - Added backend parameter
- `moodle-plugin/mod/gamifiedquiz/ajax/generate.php` - Uses backend
- `llmapi/app.py` - Added Gemini and Local LLM support
- `llmapi/requirements.txt` - Added google-generativeai

## ✨ What's Next?

All requested features are now implemented! You can:
- ✅ Select LLM backend (OpenAI/Gemini/Local)
- ✅ Choose templates and color palettes
- ✅ Use predefined questions
- ✅ Edit questions with full editor
- ✅ Enjoy Kahoot-style UI

Enjoy your enhanced Gamified Quiz! 🎉

