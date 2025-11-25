# Upgrade Instructions

## How to Update the Gamified Quiz Plugin

### Step 1: Backup Your Data

Before upgrading, always backup your Moodle database:

```bash
# Using mysqldump
docker-compose exec db mysqldump -u moodle -pmoodlepass moodle > backup_$(date +%Y%m%d).sql

# Or backup the entire Docker volume
docker-compose down
# Copy the volume data
docker-compose up -d
```

### Step 2: Update Plugin Files

#### Option A: Using Git (Recommended)

```bash
# Navigate to project directory
cd C:\Users\engti\Desktop\kode4u_ai\kwiz

# Pull latest changes
git pull origin main

# Or if you're updating manually, ensure all files are copied
```

#### Option B: Manual Update

1. **Stop Docker containers:**
   ```powershell
   docker-compose down
   ```

2. **Copy updated files:**
   - Copy all files from `moodle-plugin/mod/gamifiedquiz/` to your Moodle installation
   - Ensure all new files are included (especially `styles.css`, `ajax/save_questions.php`)

3. **Update LLM API (if needed):**
   ```powershell
   # Rebuild LLM API container
   docker-compose build llmapi
   ```

### Step 3: Run Moodle Upgrade

```powershell
# Start containers
docker-compose up -d

# Wait for services to be ready
Start-Sleep -Seconds 10

# Run Moodle upgrade
docker-compose exec moodle php admin/cli/upgrade.php --non-interactive
```

### Step 4: Clear Moodle Cache

```powershell
# Purge all caches
docker-compose exec moodle php admin/cli/purge_caches.php

# Or via Moodle UI:
# Site administration → Development → Purge all caches
```

### Step 5: Verify Installation

1. **Check plugin version:**
   - Go to: Site administration → Plugins → Plugins overview → Activity modules
   - Verify "Gamified Quiz" shows version `2025010104` or higher

2. **Test new features:**
   - Create a new quiz and verify:
     - LLM backend selection dropdown appears
     - Template selection dropdown appears
     - Color palette selection dropdown appears
     - "Use Predefined Questions" checkbox appears
     - "Edit Questions" button appears in quiz view

3. **Check database:**
   ```powershell
   # Connect to MySQL
   docker-compose exec db mysql -u moodle -pmoodlepass moodle
   
   # Check table structure
   DESCRIBE mdl_gamifiedquiz;
   
   # Should show new fields:
   # - llm_backend
   # - template
   # - color_palette
   # - use_predefined
   # - predefined_data
   # - questions_data
   ```

## Troubleshooting

### Issue: "Plugin upgrade failed"

**Solution:**
```powershell
# Check Moodle error logs
docker-compose exec moodle tail -f /var/www/html/moodledata/error.log

# Try manual upgrade
docker-compose exec moodle php admin/cli/upgrade.php --non-interactive --verbose
```

### Issue: "New fields not appearing"

**Solution:**
1. Check if upgrade ran successfully
2. Verify `install.xml` has new fields
3. Manually add fields if needed:
   ```sql
   ALTER TABLE mdl_gamifiedquiz ADD COLUMN llm_backend VARCHAR(20) DEFAULT 'openai';
   ALTER TABLE mdl_gamifiedquiz ADD COLUMN template VARCHAR(50) DEFAULT 'default';
   ALTER TABLE mdl_gamifiedquiz ADD COLUMN color_palette VARCHAR(50) DEFAULT 'kahoot';
   ALTER TABLE mdl_gamifiedquiz ADD COLUMN use_predefined TINYINT(1) DEFAULT 0;
   ALTER TABLE mdl_gamifiedquiz ADD COLUMN predefined_data TEXT;
   ALTER TABLE mdl_gamifiedquiz ADD COLUMN questions_data TEXT;
   ```

### Issue: "Styles not loading"

**Solution:**
```powershell
# Clear browser cache (Ctrl+F5)
# Clear Moodle cache
docker-compose exec moodle php admin/cli/purge_caches.php

# Verify styles.css exists
docker-compose exec moodle ls -la /var/www/html/mod/gamifiedquiz/styles.css
```

### Issue: "Question editor not working"

**Solution:**
1. Check browser console for JavaScript errors
2. Verify `ajax/save_questions.php` exists and is accessible
3. Check file permissions:
   ```powershell
   docker-compose exec moodle chmod 644 /var/www/html/mod/gamifiedquiz/ajax/save_questions.php
   ```

## Configuration Updates

### For Gemini Support

Add to `docker/.env`:
```env
GEMINI_API_KEY=your-gemini-api-key-here
```

Then restart LLM API:
```powershell
docker-compose restart llmapi
```

### For Local LLM (Ollama)

1. Install Ollama: https://ollama.ai
2. Start Ollama service
3. Add to `docker/.env`:
```env
LOCAL_LLM_URL=http://host.docker.internal:11434
```

4. Restart LLM API:
```powershell
docker-compose restart llmapi
```

## Version History

- **2025010104**: Added LLM backend selection, templates, color palettes, question editor
- **2025010103**: Added JWT secret auto-sync from .env
- **2025010102**: Fixed database schema, added capabilities
- **2025010101**: Initial release

## Rollback Instructions

If you need to rollback:

```powershell
# Restore database backup
docker-compose exec db mysql -u moodle -pmoodlepass moodle < backup_YYYYMMDD.sql

# Or restore previous plugin version
# Copy previous version files
docker-compose exec moodle php admin/cli/purge_caches.php
```

## Post-Upgrade Checklist

- [ ] Plugin version updated correctly
- [ ] All new fields visible in quiz creation form
- [ ] LLM backend selection works
- [ ] Template selection works
- [ ] Color palette selection works
- [ ] Question editor opens and saves correctly
- [ ] Predefined questions option works
- [ ] Styles/CSS loading correctly
- [ ] No JavaScript errors in browser console
- [ ] No PHP errors in Moodle logs

