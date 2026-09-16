/**
 * Articulate Rise Fullscreen Live Studio & Component Toolbox for H5P
 * Pure SVG UI, full-screen WYSIWYG authoring studio with complete navigation.
 */
(function ($) {
  "use strict";

  var H5PEditor = window.H5PEditor = window.H5PEditor || {};

  function fixCoreTranslations() {
    var targets = [window];
    try {
      if (window.parent && window.parent !== window) targets.push(window.parent);
      if (window.top && window.top !== window) targets.push(window.top);
    } catch (e) {}

    var fallbackCore = {
      copyButton: "Copy",
      pasteButton: "Paste",
      pasteAndReplaceButton: "Paste & Replace",
      pasteContent: "Paste Content",
      confirmPasteContent: "Are you sure you want to replace current content?",
      confirmPasteButtonText: "Replace",
      copyToClipboard: "Copy to clipboard",
      pasteFromClipboard: "Paste from clipboard",
      copied: "Copied!",
      pasteError: "Cannot paste",
      expandAll: "Expand all",
      collapseAll: "Collapse all",
      inserted: "Inserted"
    };

    targets.forEach(function (win) {
      try {
        if (!win.H5PEditor) win.H5PEditor = {};
        if (!win.H5PEditor.language) win.H5PEditor.language = {};
        if (!win.H5PEditor.language.core) win.H5PEditor.language.core = {};
        for (var k in fallbackCore) {
          if (!win.H5PEditor.language.core[k]) {
            win.H5PEditor.language.core[k] = fallbackCore[k];
          }
        }
      } catch (err) {}
    });
  }
  fixCoreTranslations();

  /**
   * Main Studio Controller
   */
  function RiseBlockToolbox() {
    var self = this;

    self.activeTab = "cover"; // 'cover' or '0_0'
    self.isFullscreen = false;

    self.blocks = [
      // 1. Text & Headings
      {
        category: "Text & Headers",
        catSvg: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h16M4 12h16M4 18h7"/></svg>',
        items: [
          {
            id: "heading_hero",
            name: "Lesson Header",
            badge: "Header",
            desc: "Category tag, main title and description",
            iconSvg: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h16M4 12h16M4 18h7"/></svg>',
            previewHtml: '<div style="border-bottom: 2px solid #2563eb; padding-bottom: 6px;"><span style="background: #eff6ff; color: #2563eb; font-size: 10px; font-weight: 700; padding: 2px 6px; border-radius: 4px;">OVERVIEW</span><h4 style="margin: 4px 0 2px 0; font-size: 13px; color: #0f172a;">Lesson Title</h4><p style="margin: 0; font-size: 11px; color: #64748b;">Short lesson overview description...</p></div>',
            content: '<div class="rise-header-block"><div class="rise-category-tag">Overview</div><h2 class="rise-main-title">ចំណងជើងមេរៀន (Lesson Title)</h2><p class="rise-main-desc">ការពិពណ៌នាសង្ខេបអំពីខ្លឹមសារមេរៀន និងចំណុចសំខាន់ៗដែលត្រូវសិក្សា...</p></div>'
          },
          {
            id: "text_paragraph",
            name: "Rich Paragraph",
            badge: "Text",
            desc: "Clean styled body text",
            iconSvg: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="21" y1="6" x2="3" y2="6"/><line x1="15" y1="12" x2="3" y2="12"/><line x1="17" y1="18" x2="3" y2="18"/></svg>',
            previewHtml: '<p style="margin: 0; font-size: 11px; color: #334155; line-height: 1.4;">សូមបញ្ចូលខ្លឹមសារមេរៀននៅទីនេះ។ អ្នកអាចសរសេរអក្សរដិត <em>ទ្រេត</em> ឬបន្ថែមតំណភ្ជាប់បានយ៉ាងងាយស្រួល។</p>',
            content: '<p style="font-size: 1.05rem; line-height: 1.75; color: #334155; margin: 14px 0;">សូមបញ្ចូលខ្លឹមសារមេរៀននៅទីនេះ។ អ្នកអាចសរសេរអក្សរដិត <em>ទ្រេត</em> ឬបន្ថែមតំណភ្ជាប់ (links) បានយ៉ាងងាយស្រួល។</p>'
          },
          {
            id: "quote_testimonial",
            name: "Quote Block",
            badge: "Quote",
            desc: "Quote card with author and title",
            iconSvg: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.75-2-2-2H4c-1.25 0-2 .75-2 2v6c0 7 1 8 3 8z"/><path d="M17 21c3 0 7-1 7-8V5c0-1.25-.75-2-2-2h-4c-1.25 0-2 .75-2 2v6c0 7 1 8 3 8z"/></svg>',
            previewHtml: '<div style="background: #f8fafc; border-left: 3px solid #2563eb; padding: 6px 8px; font-size: 10px; font-style: italic;">"Clean Code makes systems scalable and easy to maintain." <br><strong style="font-style: normal; color: #0f172a;">— Lead Instructor</strong></div>',
            content: '<div class="rise-quote-block"><div class="rise-quote-text">"ការសរសេរកូដឱ្យស្អាត (Clean Code) គឺមិនត្រឹមតែសម្រាប់ម៉ាស៊ីនដំណើរការនោះទេ គឺសម្រាប់មនុស្សអាន និងអភិវឌ្ឍបន្ត។"</div><div class="rise-quote-author"><img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80" alt="Author" class="rise-quote-avatar"><div class="rise-quote-info"><div class="rise-quote-name">សាស្ត្រាចារ្យកុំព្យូទ័រ (Lead Instructor)</div><div class="rise-quote-title">Software Engineer & Educator</div></div></div></div>'
          }
        ]
      },
      // 2. Statements & Callouts
      {
        category: "Callouts & Stats",
        catSvg: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>',
        items: [
          {
            id: "callout_note",
            name: "Note (Blue)",
            badge: "Note",
            desc: "Key takeaway info box",
            iconSvg: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>',
            previewHtml: '<div style="background: #eff6ff; border-left: 4px solid #3b82f6; padding: 6px 8px; border-radius: 4px; font-size: 11px; color: #1e3a8a;"><strong>ចំណាំ:</strong> គន្លឹះសំខាន់ក្នុងដំណើរការអនុវត្តជាក់ស្តែង។</div>',
            content: '<div class="rise-callout rise-callout-info"><div><strong>ចំណាំសំខាន់ (Key Note):</strong> សូមចងចាំចំណុចនេះ ពីព្រោះវាជាគន្លឹះសំខាន់ក្នុងដំណើរការអនុវត្តជាក់ស្តែង។</div></div>'
          },
          {
            id: "callout_warning",
            name: "Warning (Amber)",
            badge: "Warning",
            desc: "Caution and alert card",
            iconSvg: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
            previewHtml: '<div style="background: #fffbeb; border-left: 4px solid #f59e0b; padding: 6px 8px; border-radius: 4px; font-size: 11px; color: #92400e;"><strong>ប្រយ័ត្ន:</strong> ត្រូវកំណត់ JAVA_HOME ឱ្យបានត្រឹមត្រូវ។</div>',
            content: '<div class="rise-callout-warning"><strong>ការប្រុងប្រយ័ត្ន (Warning):</strong> សូមប្រាកដថាអ្នកបានកំណត់ Path Environment Variable ត្រឹមត្រូវ មុននឹងចាប់ផ្តើមដំណើរការ Compile កូដ។</div>'
          },
          {
            id: "callout_success",
            name: "Success (Green)",
            badge: "Tip",
            desc: "Best practice pro tip",
            iconSvg: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',
            previewHtml: '<div style="background: #f0fdf4; border-left: 4px solid #10b981; padding: 6px 8px; border-radius: 4px; font-size: 11px; color: #065f46;"><strong>គន្លឹះល្អ:</strong> ប្រើប្រាស់ Shortcut Keys ដើម្បីបង្កើនល្បឿន។</div>',
            content: '<div class="rise-callout-success"><strong>គន្លឹះល្អ (Pro Tip):</strong> ការប្រើប្រាស់ IDE Shortcuts នឹងជួយបង្កើនល្បឿនក្នុងការសរសេរ និង Format កូដរបស់អ្នកបានលឿនជាងមុនទ្វេដង។</div>'
          },
          {
            id: "stat_big_number",
            name: "Big Stat Metric",
            badge: "Stats",
            desc: "3-Column metric showcase",
            iconSvg: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>',
            previewHtml: '<div style="display: flex; gap: 4px; text-align: center;"><div style="background: #f1f5f9; padding: 4px; border-radius: 4px; flex: 1;"><div style="font-weight: 800; color: #2563eb; font-size: 12px;">100%</div><div style="font-size: 8px;">JVM</div></div><div style="background: #f1f5f9; padding: 4px; border-radius: 4px; flex: 1;"><div style="font-weight: 800; color: #2563eb; font-size: 12px;">3B+</div><div style="font-size: 8px;">Devices</div></div></div>',
            content: '<div class="rise-stat-grid"><div class="rise-stat-card"><div class="rise-stat-number">100%</div><div class="rise-stat-label">Cross-Platform (JVM)</div></div><div class="rise-stat-card"><div class="rise-stat-number">3B+</div><div class="rise-stat-label">Devices Running Java</div></div><div class="rise-stat-card"><div class="rise-stat-number">#1</div><div class="rise-stat-label">Enterprise Choice</div></div></div>'
          }
        ]
      },
      // 3. Lists & Steps
      {
        category: "Lists & Steps",
        catSvg: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="10" y1="6" x2="21" y2="6"/><line x1="10" y1="12" x2="21" y2="12"/><line x1="10" y1="18" x2="21" y2="18"/><path d="M4 6h1v4M4 10h2M6 18H4c0-1 2-2 2-3s-1-1.5-2-1"/></svg>',
        items: [
          {
            id: "bullet_list_glowing",
            name: "Glowing Bullets",
            badge: "List",
            desc: "Card list with glowing blue dots",
            iconSvg: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><circle cx="4" cy="6" r="2"/><circle cx="4" cy="12" r="2"/><circle cx="4" cy="18" r="2"/></svg>',
            previewHtml: '<div style="font-size: 11px; display: flex; flex-direction: column; gap: 4px;"><div style="background: #f8fafc; padding: 4px; border-radius: 4px; display: flex; gap: 6px; align-items: center;"><span style="color: #2563eb;">●</span><span>ភាសាកូដ Java</span></div><div style="background: #f8fafc; padding: 4px; border-radius: 4px; display: flex; gap: 6px; align-items: center;"><span style="color: #2563eb;">●</span><span>ពាក្យបច្ចេកទេស Syntax</span></div></div>',
            content: '<ul class="rise-bullet-list"><li>ភាសាកូដ Java</li><li>ពាក្យបច្ចេកទេស Syntax, Compiler, Interpreter, JVM, JRE, JDK</li><li>ដំណើរការ នៃការសរសេរកូដ Java</li><li>លក្ខណៈរបស់ភាសា Java</li></ul>'
          },
          {
            id: "check_list",
            name: "Checkmark List",
            badge: "Checklist",
            desc: "Green check task cards",
            iconSvg: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>',
            previewHtml: '<div style="font-size: 11px; display: flex; flex-direction: column; gap: 4px;"><div style="display: flex; gap: 6px; align-items: center;"><span style="color: #16a34a; font-weight: bold;">✓</span><span>បានអានពាក្យបច្ចេកទេស JDK</span></div><div style="display: flex; gap: 6px; align-items: center;"><span style="color: #16a34a; font-weight: bold;">✓</span><span>បានដំឡើង IntelliJ IDEA</span></div></div>',
            content: '<ul class="rise-check-list"><li>បានអាន និងយល់ច្បាស់អំពីពាក្យបច្ចេកទេស JDK, JRE, JVM</li><li>បានដំឡើងកម្មវិធី IntelliJ IDEA ឬ VS Code រួចរាល់</li><li>បានសរសេរកូដ Java ដំបូង និង Compile ជោគជ័យ</li></ul>'
          }
        ]
      },
      // 4. Media & Galleries
      {
        category: "Media & Galleries",
        catSvg: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>',
        items: [
          {
            id: "image_slider_preview",
            name: "Image Showcase",
            badge: "Photo",
            desc: "Clean full-bleed showcase",
            iconSvg: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>',
            previewHtml: '<div style="border-radius: 6px; overflow: hidden; position: relative;"><img src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=400&q=80" style="width: 100%; height: 60px; object-fit: cover;"><div style="position: absolute; bottom: 0; left: 0; right: 0; background: rgba(0,0,0,0.6); color: #fff; padding: 2px 6px; font-size: 9px;">Image Showcase Slider</div></div>',
            content: '<div class="rise-image-hero"><img src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80" alt="Slider Image"><div class="rise-image-hero-caption"><strong>Image Showcase</strong> — បង្ហាញស្លាយរូបភាព និង Diagram ស្ថាបត្យកម្មប្រព័ន្ធ</div></div>'
          },
          {
            id: "grid_gallery_2",
            name: "2-Column Grid",
            badge: "Grid",
            desc: "Side-by-side card gallery",
            iconSvg: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="18" rx="1"/><rect x="14" y="3" width="7" height="18" rx="1"/></svg>',
            previewHtml: '<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 4px;"><img src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=200&q=80" style="height: 45px; object-fit: cover; border-radius: 4px;"><img src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=200&q=80" style="height: 45px; object-fit: cover; border-radius: 4px;"></div>',
            content: '<div class="rise-image-grid-2"><div class="rise-image-card"><img src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80" alt="Editor"><div class="rise-image-card-caption"><strong>1. Code Editor & IDE</strong><br>បរិស្ថានសម្រាប់សរសេរកូដ</div></div><div class="rise-image-card"><img src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80" alt="Java"><div class="rise-image-card-caption"><strong>2. Java Architecture</strong><br>ដំណើរការលើ JVM</div></div></div>'
          },
          {
            id: "video_lecture",
            name: "Video Card",
            badge: "Video",
            desc: "YouTube/Video with header",
            iconSvg: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>',
            previewHtml: '<div style="background: #0f172a; color: #fff; padding: 6px; border-radius: 6px; font-size: 10px; display: flex; align-items: center; justify-content: center; height: 50px;"><span style="color: #38bdf8;">YouTube Video 16:9</span></div>',
            content: '<div class="rise-video-card"><div class="rise-video-header"><div class="rise-section-label">Video Lecture</div><h3 class="rise-section-heading">ការណែនាំភាសា Java និងដំណើរការ Installation</h3></div><div class="rise-video-wrapper"><iframe src="https://www.youtube.com/embed/eIrMbAQSU34" allowfullscreen></iframe></div><div class="rise-video-caption">វីដេអូបង្រៀនលម្អិតអំពី Java Ecosystem និងការសរសេរកូដជំហានដំបូង។</div></div>'
          },
          {
            id: "audio_podcast",
            name: "Audio Card",
            badge: "Audio",
            desc: "Voiceover audio player card",
            iconSvg: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>',
            previewHtml: '<div style="background: #0f172a; color: #fff; padding: 6px 10px; border-radius: 6px; display: flex; align-items: center; gap: 6px; font-size: 10px;"><span style="background: #2563eb; border-radius: 50%; width: 18px; height: 18px; display: inline-flex; align-items: center; justify-content: center; color: #fff;">▶</span><span>Audio Lesson (5:30)</span></div>',
            content: '<div class="rise-audio-card"><div class="rise-audio-play-btn">▶</div><div class="rise-audio-info"><div class="rise-audio-title">ការសង្ខេបមេរៀនជាសំឡេង (Audio Podcast Overview)</div><div class="rise-audio-duration">រយៈពេល: 5 នាទី 30 វិនាទី • ដោយសាស្រ្តាចារ្យបង្រៀន</div></div></div>'
          }
        ]
      },
      // 5. Interactive & Quizzes
      {
        category: "Interactive & Quizzes",
        catSvg: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
        items: [
          {
            id: "flip_flashcards",
            name: "3D Flip Cards",
            badge: "Cards",
            desc: "Word on front, definition on back",
            iconSvg: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="16" height="14" rx="2"/><path d="M6 3h14a2 2 0 0 1 2 2v12"/></svg>',
            previewHtml: '<div style="display: flex; gap: 4px;"><div style="background: #2563eb; color: #fff; padding: 10px 4px; border-radius: 4px; flex: 1; text-align: center; font-size: 10px; font-weight: bold;">JDK</div><div style="background: #0284c7; color: #fff; padding: 10px 4px; border-radius: 4px; flex: 1; text-align: center; font-size: 10px; font-weight: bold;">JRE</div></div>',
            content: '<div class="rise-flashcard-grid"><div class="rise-flip-card"><div class="rise-flip-card-inner"><div class="rise-flip-card-front"><div class="rise-flip-word">JDK</div></div><div class="rise-flip-card-back"><div class="rise-flip-definition"><strong>JDK (Java Development Kit)</strong><br>កញ្ចប់ឧបករណ៍ពេញលេញសម្រាប់ Developer សរសេរ និង compile កូដ Java។</div></div></div></div><div class="rise-flip-card"><div class="rise-flip-card-inner"><div class="rise-flip-card-front"><div class="rise-flip-word">JRE</div></div><div class="rise-flip-card-back"><div class="rise-flip-definition"><strong>JRE (Java Runtime Environment)</strong><br>បរិស្ថានសម្រាប់ដំណើរការកម្មវិធី Java សម្រាប់ End-user។</div></div></div></div><div class="rise-flip-card"><div class="rise-flip-card-inner"><div class="rise-flip-card-front"><div class="rise-flip-word">JVM</div></div><div class="rise-flip-card-back"><div class="rise-flip-definition"><strong>JVM (Java Virtual Machine)</strong><br>ម៉ាស៊ីននិម្មិតដែលដំណើរការ Java Bytecode នៅលើគ្រប់ OS។</div></div></div></div></div>'
          },
          {
            id: "interactive_tabs",
            name: "Tab Switcher",
            badge: "Tabs",
            desc: "3 Clickable interactive tabs",
            iconSvg: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>',
            previewHtml: '<div style="border: 1px solid #cbd5e1; border-radius: 4px; font-size: 10px;"><div style="display: flex; background: #f1f5f9; padding: 2px 4px; gap: 4px;"><span style="background: #2563eb; color: #fff; padding: 1px 4px; border-radius: 2px;">Tab 1</span><span>Tab 2</span></div><div style="padding: 4px;">Tab Content Area</div></div>',
            content: '<div class="rise-tabs-container"><div class="rise-tabs-header"><button type="button" class="rise-tab-btn is-active">1. ទ្រឹស្តីទូទៅ</button><button type="button" class="rise-tab-btn">2. ការអនុវត្តជាក់ស្តែង</button><button type="button" class="rise-tab-btn">3. ចំណុចត្រូវប្រយ័ត្ន</button></div><div class="rise-tab-panel is-active"><p><strong>ទ្រឹស្តីមូលដ្ឋាន:</strong> ភាសា Java ត្រូវបានបង្កើតឡើងដោយលោក James Gosling ក្នុងឆ្នាំ 1995 នៅក្រុមហ៊ុន Sun Microsystems។</p></div><div class="rise-tab-panel"><p><strong>ការអនុវត្ត:</strong> បើក IDE បង្កើត File ឈ្មោះ <code>Main.java</code> និងសរសេរ Method <code>public static void main(String[] args)</code>។</p></div><div class="rise-tab-panel"><p><strong>ការប្រុងប្រយ័ត្ន:</strong> ឈ្មោះ Class ត្រូវតែដូចគ្នាបេះបិទនឹងឈ្មោះ File (Case-sensitive)។</p></div></div>'
          },
          {
            id: "code_window",
            name: "Code Window",
            badge: "Code",
            desc: "Dark IDE terminal snippet",
            iconSvg: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',
            previewHtml: '<div style="background: #0f172a; color: #38bdf8; border-radius: 4px; padding: 6px; font-family: monospace; font-size: 9px;">public class Main {<br>&nbsp;&nbsp;System.out.println("Hello");<br>}</div>',
            content: '<div class="rise-code-block"><div class="rise-code-header"><div class="rise-code-dots"><div class="rise-code-dot red"></div><div class="rise-code-dot amber"></div><div class="rise-code-dot green"></div></div><div class="rise-code-lang">Java</div></div><pre class="rise-code-body"><code>public class Main {\n    public static void main(String[] args) {\n        System.out.println("ស្វាគមន៍មកកាន់ការសិក្សាភាសា Java!");\n    }\n}</code></pre></div>'
          },
          {
            id: "quiz_check_card",
            name: "Knowledge Quiz",
            badge: "Quiz",
            desc: "Multiple choice check question",
            iconSvg: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
            previewHtml: '<div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 4px; padding: 6px; font-size: 10px;"><strong>សំនួរ:</strong> តើ Java Bytecode ដំណើរការលើអ្វី?<div style="margin-top: 4px; color: #2563eb;">○ JVM</div></div>',
            content: '<div class="rise-quiz-card"><div class="rise-quiz-tag">Knowledge Check</div><div class="rise-quiz-question">សំនួរត្រួតពិនិត្យការយល់ដឹង: តើកម្មវិធី Java Bytecode ដំណើរការនៅលើអ្វី?</div><div class="rise-quiz-options"><div class="rise-quiz-option">○ A. JVM (Java Virtual Machine)</div><div class="rise-quiz-option">○ B. Operating System Kernel ផ្ទាល់</div><div class="rise-quiz-option">○ C. Web Browser JavaScript Engine</div></div></div>'
          }
        ]
      }
    ];

    /**
     * Initialize Studio
     */
    self.init = function (widgetInstance) {
      self.widget = widgetInstance;
      self.renderStudio();
      self.setupDragAndDrop();
    };

    /**
     * Render Studio Container
     */
    self.renderStudio = function () {
      var $mount = $(".field-name-courseMeta, .h5peditor").first();
      if (!$mount.length) return;
      if ($(".rise-visual-editor-root").length > 0) {
        self.updateStudio();
        return;
      }

      var $editorRoot = $('<div class="rise-visual-editor-root">' +
        '<div class="rise-visual-top-bar">' +
          '<div class="rise-visual-nav-pills">' +
            '<button type="button" class="rise-visual-pill-btn is-active" data-tab="cover">' +
              '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>' +
              '<span>Cover & Outline</span>' +
            '</button>' +
            '<div class="rise-visual-lesson-pills" style="display: flex; gap: 8px;"></div>' +
            '<button type="button" class="rise-visual-add-lesson-btn" title="Add a new lesson to course">' +
              '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>' +
              '<span>+ Add Lesson</span>' +
            '</button>' +
          '</div>' +
          '<button type="button" class="rise-visual-fullscreen-btn" title="Toggle Fullscreen Studio">' +
            '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/></svg>' +
            '<span>Fullscreen</span>' +
          '</button>' +
        '</div>' +
        '<div class="rise-visual-workspace">' +
          '<aside class="rise-visual-sidebar-toolbox">' +
            '<div class="rise-toolbox-header">' +
              '<div class="rise-toolbox-title-row">' +
                '<div class="rise-toolbox-title">' +
                  '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="2.5"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>' +
                  'Components' +
                '</div>' +
                '<span class="rise-toolbox-badge">Drag & Drop</span>' +
              '</div>' +
              '<div class="rise-toolbox-search-wrapper">' +
                '<svg class="rise-toolbox-search-icon" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>' +
                '<input type="text" class="rise-toolbox-search-input" placeholder="Search blocks...">' +
              '</div>' +
            '</div>' +
            '<div class="rise-toolbox-body"></div>' +
          '</aside>' +
          '<div class="rise-visual-canvas-area"></div>' +
        '</div>' +
      '</div>');

      $mount.before($editorRoot);

      // Render Left Toolbox components
      var $toolboxBody = $editorRoot.find(".rise-toolbox-body");
      var $previewTooltip = $('<div class="rise-live-preview-tooltip" style="display: none;"></div>');
      $("body").append($previewTooltip);

      self.blocks.forEach(function (cat) {
        var $cat = $('<div class="rise-toolbox-category">' +
          '<div class="rise-toolbox-category-title">' + (cat.catSvg || '') + ' ' + cat.category + '</div>' +
          '<div class="rise-toolbox-grid"></div>' +
        '</div>');

        var $grid = $cat.find(".rise-toolbox-grid");

        cat.items.forEach(function (item) {
          var $card = $('<div class="rise-toolbox-block-card" draggable="true" data-block-id="' + item.id + '">' +
            '<div class="rise-toolbox-block-icon">' + item.iconSvg + '</div>' +
            '<div class="rise-toolbox-block-name">' + item.name + '</div>' +
            '<div class="rise-toolbox-block-tag">' + (item.badge || "BLOCK") + '</div>' +
          '</div>');

          // Hover Tooltip
          $card.on("mouseenter", function () {
            var offset = $card.offset();
            var topPos = Math.max(10, Math.min(offset.top - 20, $(window).height() - 240));
            $previewTooltip.html(
              '<div class="rise-tooltip-header">' +
                '<span class="rise-tooltip-title">' + item.name + '</span>' +
                '<span class="rise-tooltip-badge">' + (item.badge || "PREVIEW") + '</span>' +
              '</div>' +
              '<div class="rise-tooltip-preview-frame">' + item.previewHtml + '</div>' +
              '<div class="rise-tooltip-hint">Click or Drag to insert into lesson</div>'
            ).css({ top: topPos + "px" }).stop(true, true).fadeIn(150);
          }).on("mouseleave", function () {
            $previewTooltip.stop(true, true).fadeOut(100);
          });

          // Click to insert
          $card.on("click", function (e) {
            e.preventDefault();
            $previewTooltip.hide();
            self.insertBlock(item.content);
          });

          // Drag Start
          $card.on("dragstart", function (e) {
            $previewTooltip.hide();
            $(this).addClass("is-dragging");
            window.riseCurrentDraggedBlock = item;
            var dt = e.originalEvent.dataTransfer;
            dt.effectAllowed = "copy";
            dt.setData("text/plain", JSON.stringify(item));
          }).on("dragend", function () {
            $(this).removeClass("is-dragging");
            $(".rise-drop-target-active, .is-hovered").removeClass("rise-drop-target-active is-hovered");
          });

          $grid.append($card);
        });

        $toolboxBody.append($cat);
      });

      // Search filter
      $editorRoot.find(".rise-toolbox-search-input").on("input", function () {
        var query = $(this).val().toLowerCase().trim();
        $editorRoot.find(".rise-toolbox-block-card").each(function () {
          var $c = $(this);
          var name = $c.find(".rise-toolbox-block-name").text().toLowerCase();
          var tag = $c.find(".rise-toolbox-block-tag").text().toLowerCase();
          if (name.indexOf(query) !== -1 || tag.indexOf(query) !== -1 || query === "") {
            $c.show();
          } else {
            $c.hide();
          }
        });
      });

      // Fullscreen Toggle
      $editorRoot.find(".rise-visual-fullscreen-btn").on("click", function () {
        self.isFullscreen = !self.isFullscreen;
        $editorRoot.toggleClass("is-fullscreen", self.isFullscreen);
        if (self.isFullscreen) {
          $(this).find("span").text("Exit Fullscreen");
        } else {
          $(this).find("span").text("Fullscreen");
        }
      });

      // Navigation tab switching
      $editorRoot.on("click", ".rise-visual-pill-btn", function () {
        var tab = $(this).data("tab");
        self.switchTab(tab);
      });

      // Add lesson button
      $editorRoot.find(".rise-visual-add-lesson-btn").on("click", function () {
        self.addNewLesson();
      });

      self.updateStudio();
    };

    /**
     * Switch active tab cleanly
     */
    self.switchTab = function (tabId) {
      self.activeTab = tabId;
      $(".rise-visual-pill-btn").removeClass("is-active");
      $('.rise-visual-pill-btn[data-tab="' + tabId + '"]').addClass("is-active");
      self.renderActiveTabContent();
    };

    /**
     * Get Root H5P Parameters safely
     */
    self.getParams = function () {
      if (self.widget && self.widget.parent && self.widget.parent.parent && self.widget.parent.parent.params) {
        return self.widget.parent.parent.params;
      }
      if (window.H5PEditor && window.H5PEditor.instances && window.H5PEditor.instances.length > 0) {
        return window.H5PEditor.instances[0].params;
      }
      return {
        courseMeta: {
          title: "មេរៀនទី១ ការណែនាំអំពីភាសាJava",
          coverImageUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1600&q=80",
          description: "<p>នៅក្នុងមេរៀននេះ យើងនឹងសិក្សាអំពីចំណុចសំខាន់ៗមួយចំនួនដូចជា:</p><ul><li>ភាសាកូដ Java</li><li>ពាក្យបច្ចេកទេស Syntax, Compiler, Interpreter, JVM, JRE, JDK</li><li>ដំណើរការ នៃការសរសេរកូដ Java</li><li>លក្ខណៈរបស់ភាសា Java</li></ul>"
        },
        sections: [
          {
            sectionTitle: "ចាប់ផ្តើម",
            lessons: [
              {
                title: "មេរៀនទី១: ការណែនាំ",
                content: { params: [] }
              }
            ]
          }
        ]
      };
    };

    /**
     * Update Studio Navigation Tabs
     */
    self.updateStudio = function () {
      var params = self.getParams();
      var $pillsContainer = $(".rise-visual-lesson-pills");
      $pillsContainer.empty();

      var lessonCount = 0;
      if (params.sections && params.sections.length > 0) {
        params.sections.forEach(function (sec, sIdx) {
          if (sec.lessons && sec.lessons.length > 0) {
            sec.lessons.forEach(function (les, lIdx) {
              var tabId = sIdx + "_" + lIdx;
              var isAct = self.activeTab === tabId ? "is-active" : "";
              var title = les.title || ("Lesson " + (lessonCount + 1));
              var $pill = $('<button type="button" class="rise-visual-pill-btn ' + isAct + '" data-tab="' + tabId + '">' +
                '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>' +
                '<span>' + title + '</span>' +
              '</button>');
              $pillsContainer.append($pill);
              lessonCount++;
            });
          }
        });
      }

      self.renderActiveTabContent();
    };

    /**
     * Render Active Tab Content in Canvas Viewport
     */
    self.renderActiveTabContent = function () {
      var params = self.getParams();
      var $canvas = $(".rise-visual-canvas-area");
      $canvas.empty();

      if (self.activeTab === "cover") {
        self.renderCoverPage($canvas, params);
      } else {
        self.renderLessonPage($canvas, params, self.activeTab);
      }
    };

    /**
     * 1. Render Cover & Outline Page
     */
    self.renderCoverPage = function ($canvas, params) {
      var meta = (params && params.courseMeta) || {};
      var title = meta.title || "មេរៀនទី១ ការណែនាំអំពីភាសាJava";
      var coverImg = meta.coverImageUrl || "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1600&q=80";
      var desc = meta.description || "<p>នៅក្នុងមេរៀននេះ យើងនឹងសិក្សាអំពីចំណុចសំខាន់ៗមួយចំនួនដូចជា:</p><ul><li>ភាសាកូដ Java</li><li>ពាក្យបច្ចេកទេស Syntax, Compiler, Interpreter, JVM, JRE, JDK</li><li>ដំណើរការ នៃការសរសេរកូដ Java</li><li>លក្ខណៈរបស់ភាសា Java</li></ul>";

      var $temp = $("<div>" + desc + "</div>");
      var introText = $temp.find("p").first().text() || "នៅក្នុងមេរៀននេះ យើងនឹងសិក្សាអំពីចំណុចសំខាន់ៗមួយចំនួនដូចជា:";
      var items = [];
      $temp.find("li").each(function () {
        items.push($(this).text().trim());
      });
      if (items.length === 0) {
        items = [
          "ភាសាកូដ Java",
          "ពាក្យបច្ចេកទេស Syntax, Compiler, Interpreter, JVM, JRE, JDK",
          "ដំណើរការ នៃការសរសេរកូដ Java",
          "លក្ខណៈរបស់ភាសា Java"
        ];
      }

      var $cover = $('<div class="rise-canvas-cover-page">' +
        '<div class="rise-canvas-cover-hero" style="background-image: url(\'' + coverImg + '\');">' +
          '<button type="button" class="rise-canvas-change-cover-btn" title="Change Hero Image">' +
            '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>' +
            '<span>Change Cover Photo</span>' +
          '</button>' +
          '<div class="rise-canvas-hero-content">' +
            '<h1 class="rise-canvas-title-editable" contenteditable="true" title="Click to edit course title">' + title + '</h1>' +
            '<button type="button" class="rise-canvas-cover-btn" title="Click to go to Lesson 1">START COURSE →</button>' +
          '</div>' +
        '</div>' +
        '<div class="rise-canvas-outline-body">' +
          '<div class="rise-canvas-outline-intro" contenteditable="true" title="Click to edit introduction text">' + introText + '</div>' +
          '<div class="rise-canvas-takeaways-list"></div>' +
          '<button type="button" class="rise-canvas-add-takeaway-btn">' +
            '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>' +
            '<span>Add Key Topic / Takeaway</span>' +
          '</button>' +
          '<div class="rise-canvas-lesson-nav-footer">' +
            '<div></div>' +
            '<button type="button" class="rise-canvas-nav-btn is-next" data-goto="0_0">' +
              '<span>Go to Lesson 1 →</span>' +
            '</button>' +
          '</div>' +
        '</div>' +
      '</div>');

      var $list = $cover.find(".rise-canvas-takeaways-list");
      items.forEach(function (txt) {
        var $card = $('<div class="rise-canvas-takeaway-card">' +
          '<div class="rise-canvas-takeaway-dot"></div>' +
          '<div class="rise-canvas-takeaway-text" contenteditable="true">' + txt + '</div>' +
          '<button type="button" class="rise-canvas-takeaway-delete" title="Remove">✕</button>' +
        '</div>');
        $list.append($card);
      });

      // Event: Navigate to Lesson 1
      $cover.find(".rise-canvas-cover-btn, .rise-canvas-nav-btn.is-next").on("click", function () {
        self.switchTab("0_0");
      });

      // Sync Title
      $cover.find(".rise-canvas-title-editable").on("input blur", function () {
        var newTitle = $(this).text().trim();
        meta.title = newTitle;
        self.syncField("courseMeta/title", newTitle);
      });

      // Change Cover Image
      $cover.find(".rise-canvas-change-cover-btn").on("click", function () {
        var url = prompt("Enter cover image URL (e.g. Unsplash URL):", coverImg);
        if (url && url.trim()) {
          meta.coverImageUrl = url.trim();
          $cover.find(".rise-canvas-cover-hero").css("background-image", "url('" + url.trim() + "')");
          self.syncField("courseMeta/coverImageUrl", url.trim());
        }
      });

      function saveDescription() {
        var pText = $cover.find(".rise-canvas-outline-intro").text().trim();
        var html = "<p>" + pText + "</p><ul>";
        $cover.find(".rise-canvas-takeaway-text").each(function () {
          var val = $(this).text().trim();
          if (val) html += "<li>" + val + "</li>";
        });
        html += "</ul>";
        meta.description = html;
        self.syncField("courseMeta/description", html);
      }

      $cover.find(".rise-canvas-outline-intro").on("input blur", saveDescription);
      $cover.on("input blur", ".rise-canvas-takeaway-text", saveDescription);

      $cover.on("click", ".rise-canvas-takeaway-delete", function () {
        $(this).closest(".rise-canvas-takeaway-card").remove();
        saveDescription();
      });

      $cover.find(".rise-canvas-add-takeaway-btn").on("click", function () {
        var $newCard = $('<div class="rise-canvas-takeaway-card">' +
          '<div class="rise-canvas-takeaway-dot"></div>' +
          '<div class="rise-canvas-takeaway-text" contenteditable="true">ចំណុចសំខាន់ថ្មី (New Topic)</div>' +
          '<button type="button" class="rise-canvas-takeaway-delete" title="Remove">✕</button>' +
        '</div>');
        $list.append($newCard);
        $newCard.find(".rise-canvas-takeaway-text").focus();
        saveDescription();
      });

      $canvas.append($cover);
    };

    /**
     * 2. Render Lesson Content Canvas with Complete Page Navigation
     */
    self.renderLessonPage = function ($canvas, params, tabId) {
      var parts = tabId.split("_");
      var sIdx = parseInt(parts[0], 10) || 0;
      var lIdx = parseInt(parts[1], 10) || 0;

      var sec = (params.sections && params.sections[sIdx]) || {};
      var lesson = (sec.lessons && sec.lessons[lIdx]) || { title: "New Lesson", content: { params: [] } };

      var prevTab = "cover";
      var prevLabel = "← Cover & Outline";
      if (lIdx > 0) {
        prevTab = sIdx + "_" + (lIdx - 1);
        prevLabel = "← " + ((sec.lessons[lIdx - 1] && sec.lessons[lIdx - 1].title) || "Previous Lesson");
      }

      var nextTab = null;
      var nextLabel = null;
      if (sec.lessons && lIdx < sec.lessons.length - 1) {
        nextTab = sIdx + "_" + (lIdx + 1);
        nextLabel = ((sec.lessons[lIdx + 1] && sec.lessons[lIdx + 1].title) || "Next Lesson") + " →";
      }

      var $lessonView = $('<div class="rise-canvas-lesson-body">' +
        '<div class="rise-canvas-lesson-header-bar">' +
          '<div style="font-size: 0.75rem; font-weight: 800; color: #2563eb; text-transform: uppercase; letter-spacing: 0.05em;">' + (sec.sectionTitle || "SECTION") + '</div>' +
          '<h2 class="rise-canvas-lesson-title-editable" contenteditable="true" title="Click to edit lesson title">' + (lesson.title || "Lesson Title") + '</h2>' +
        '</div>' +
        '<div class="rise-canvas-drop-zone top-zone" data-drop-index="0">' +
          '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>' +
          '<span>Drop Component Here (or Click on Left Toolbox)</span>' +
        '</div>' +
        '<div class="rise-canvas-blocks-list"></div>' +
        '<div class="rise-canvas-drop-zone bottom-zone" data-drop-index="end">' +
          '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>' +
          '<span>+ Drop block here to append</span>' +
        '</div>' +
        '<div class="rise-canvas-lesson-nav-footer">' +
          '<button type="button" class="rise-canvas-nav-btn is-prev" data-goto="' + prevTab + '">' +
            '<span>' + prevLabel + '</span>' +
          '</button>' +
          (nextTab ?
            '<button type="button" class="rise-canvas-nav-btn is-next" data-goto="' + nextTab + '"><span>' + nextLabel + '</span></button>' :
            '<button type="button" class="rise-canvas-nav-btn is-next add-next-btn"><span>+ Add Next Lesson →</span></button>'
          ) +
        '</div>' +
      '</div>');

      // Edit Lesson Title
      $lessonView.find(".rise-canvas-lesson-title-editable").on("input blur", function () {
        var newTitle = $(this).text().trim();
        lesson.title = newTitle;
        self.updateStudio();
      });

      // Navigation footer actions
      $lessonView.find(".rise-canvas-nav-btn.is-prev, .rise-canvas-nav-btn.is-next:not(.add-next-btn)").on("click", function () {
        var target = $(this).data("goto");
        if (target) self.switchTab(target);
      });

      $lessonView.find(".add-next-btn").on("click", function () {
        self.addNewLesson();
      });

      var $blocksList = $lessonView.find(".rise-canvas-blocks-list");
      var rawContent = self.getLessonContentHtml(lesson);

      if (rawContent && rawContent.trim()) {
        self.renderRenderedBlocks($blocksList, rawContent, lesson);
      }

      $canvas.append($lessonView);
    };

    /**
     * Parse Lesson Content HTML
     */
    self.getLessonContentHtml = function (lesson) {
      if (!lesson.content) return "";
      if (typeof lesson.content === "string") return lesson.content;
      if (lesson.content.params && Array.isArray(lesson.content.params)) {
        var htmlArr = [];
        lesson.content.params.forEach(function (p) {
          if (p.content && p.content.params && p.content.params.text) {
            htmlArr.push(p.content.params.text);
          }
        });
        return htmlArr.join("\n");
      }
      return "";
    };

    /**
     * Render blocks with action toolbar
     */
    self.renderRenderedBlocks = function ($container, htmlContent, lesson) {
      var $temp = $("<div>" + htmlContent + "</div>");
      var children = $temp.children();

      if (children.length === 0) {
        $container.html('<div style="color: #94a3b8; text-align: center; padding: 24px 0; font-size: 0.85rem;">No blocks added yet. Click or drag any component from the left toolbox!</div>');
        return;
      }

      children.each(function (idx) {
        var blockOuterHtml = this.outerHTML;
        var $blockWrap = $('<div class="rise-canvas-block-wrapper" data-block-index="' + idx + '">' +
          '<div class="rise-canvas-block-actions">' +
            '<button type="button" class="rise-canvas-action-btn is-edit" title="Edit HTML">✏️ Edit</button>' +
            '<button type="button" class="rise-canvas-action-btn is-dup" title="Duplicate">📋 Copy</button>' +
            '<button type="button" class="rise-canvas-action-btn is-up" title="Move Up">⬆️</button>' +
            '<button type="button" class="rise-canvas-action-btn is-down" title="Move Down">⬇️</button>' +
            '<button type="button" class="rise-canvas-action-btn is-delete" title="Delete">🗑️</button>' +
          '</div>' +
          '<div class="rise-canvas-block-inner" contenteditable="true">' + blockOuterHtml + '</div>' +
          '<div class="rise-canvas-drop-zone mid-zone" data-drop-index="' + (idx + 1) + '">' +
            '<span>+ Drop block here</span>' +
          '</div>' +
        '</div>');

        $blockWrap.find(".rise-canvas-block-inner").on("blur", function () {
          self.saveAllBlocksFromCanvas($container, lesson);
        });

        $blockWrap.find(".is-edit").on("click", function (e) {
          e.stopPropagation();
          var currentHtml = $blockWrap.find(".rise-canvas-block-inner").html();
          var edited = prompt("Edit Block HTML / Text Content:", currentHtml);
          if (edited !== null) {
            $blockWrap.find(".rise-canvas-block-inner").html(edited);
            self.saveAllBlocksFromCanvas($container, lesson);
          }
        });

        $blockWrap.find(".is-dup").on("click", function (e) {
          e.stopPropagation();
          var cloneHtml = $blockWrap.find(".rise-canvas-block-inner").html();
          $blockWrap.after($blockWrap.clone(true));
          self.saveAllBlocksFromCanvas($container, lesson);
          self.renderActiveTabContent();
        });

        $blockWrap.find(".is-up").on("click", function (e) {
          e.stopPropagation();
          var $prev = $blockWrap.prev(".rise-canvas-block-wrapper");
          if ($prev.length) {
            $blockWrap.insertBefore($prev);
            self.saveAllBlocksFromCanvas($container, lesson);
          }
        });

        $blockWrap.find(".is-down").on("click", function (e) {
          e.stopPropagation();
          var $next = $blockWrap.next(".rise-canvas-block-wrapper");
          if ($next.length) {
            $blockWrap.insertAfter($next);
            self.saveAllBlocksFromCanvas($container, lesson);
          }
        });

        $blockWrap.find(".is-delete").on("click", function (e) {
          e.stopPropagation();
          $blockWrap.remove();
          self.saveAllBlocksFromCanvas($container, lesson);
        });

        $container.append($blockWrap);
      });
    };

    /**
     * Save all blocks back to H5P params & CKEditor
     */
    self.saveAllBlocksFromCanvas = function ($container, lesson) {
      var htmlParts = [];
      $container.find(".rise-canvas-block-inner").each(function () {
        htmlParts.push($(this).html());
      });
      var fullHtml = htmlParts.join("\n");

      if (typeof lesson.content === "string") {
        lesson.content = fullHtml;
      } else if (lesson.content && lesson.content.params) {
        lesson.content = {
          library: "H5P.Column 1.22",
          params: [
            {
              content: {
                library: "H5P.AdvancedText 1.1",
                params: { text: fullHtml }
              }
            }
          ]
        };
      }

      try {
        if (window.CKEDITOR && window.CKEDITOR.instances) {
          for (var k in window.CKEDITOR.instances) {
            window.CKEDITOR.instances[k].setData(fullHtml);
          }
        }
      } catch (e) {}

      self.showToast("Changes saved to lesson!");
    };

    /**
     * Add new lesson
     */
    self.addNewLesson = function () {
      var params = self.getParams();
      if (!params.sections) params.sections = [];
      if (params.sections.length === 0) {
        params.sections.push({ sectionTitle: "មាតិកាមេរៀន (Course Lessons)", lessons: [] });
      }

      var sec = params.sections[0];
      if (!sec.lessons) sec.lessons = [];

      var newNum = sec.lessons.length + 1;
      sec.lessons.push({
        title: "មេរៀនទី" + newNum + ": ចំណងជើងមេរៀនថ្មី",
        iconType: "overview",
        content: '<div class="rise-header-block"><div class="rise-category-tag">Lesson ' + newNum + '</div><h2 class="rise-main-title">មេរៀនទី' + newNum + '</h2><p class="rise-main-desc">សូមបញ្ចូលខ្លឹមសារមេរៀននៅទីនេះ...</p></div>'
      });

      self.activeTab = "0_" + (sec.lessons.length - 1);
      self.updateStudio();
      self.showToast("New Lesson added!");
    };

    /**
     * Insert Block Content into target index or append
     */
    self.insertBlock = function (blockHtml, targetIndex) {
      if (self.activeTab === "cover") {
        var params = self.getParams();
        if (!params.sections || !params.sections[0] || !params.sections[0].lessons || params.sections[0].lessons.length === 0) {
          self.addNewLesson();
        } else {
          self.activeTab = "0_0";
        }
      }

      var params = self.getParams();
      var parts = self.activeTab.split("_");
      var sIdx = parseInt(parts[0], 10) || 0;
      var lIdx = parseInt(parts[1], 10) || 0;

      var sec = (params.sections && params.sections[sIdx]) || {};
      var lesson = (sec.lessons && sec.lessons[lIdx]) || {};

      var currentHtml = self.getLessonContentHtml(lesson);
      var newHtml = "";

      if (targetIndex !== undefined && targetIndex !== null && targetIndex !== "end") {
        var $temp = $("<div>" + currentHtml + "</div>");
        var children = $temp.children();
        var insertIdx = parseInt(targetIndex, 10);
        if (insertIdx >= 0 && insertIdx < children.length) {
          $(children[insertIdx]).before(blockHtml);
          newHtml = $temp.html();
        } else {
          newHtml = currentHtml ? (currentHtml + "\n" + blockHtml) : blockHtml;
        }
      } else {
        newHtml = currentHtml ? (currentHtml + "\n" + blockHtml) : blockHtml;
      }

      lesson.content = newHtml;
      self.renderActiveTabContent();
      self.showToast("Block added! Click to edit text.");
    };

    /**
     * Setup Drag & Drop across Workspace
     */
    self.setupDragAndDrop = function () {
      $(document).on("dragover", ".rise-canvas-drop-zone, .rise-canvas-block-wrapper, .rise-visual-canvas-area", function (e) {
        e.preventDefault();
        e.originalEvent.dataTransfer.dropEffect = "copy";
        if ($(this).hasClass("rise-canvas-drop-zone") || $(this).hasClass("rise-canvas-block-wrapper")) {
          $(this).addClass("rise-drop-target-active is-hovered");
        }
      });

      $(document).on("dragleave", ".rise-canvas-drop-zone, .rise-canvas-block-wrapper, .rise-visual-canvas-area", function () {
        $(this).removeClass("rise-drop-target-active is-hovered");
      });

      $(document).on("drop", ".rise-canvas-drop-zone, .rise-canvas-block-wrapper, .rise-visual-canvas-area", function (e) {
        e.preventDefault();
        $(".rise-drop-target-active, .is-hovered").removeClass("rise-drop-target-active is-hovered");

        var item = window.riseCurrentDraggedBlock;
        if (!item) {
          var rawData = e.originalEvent.dataTransfer.getData("text/plain");
          if (rawData) {
            try { item = JSON.parse(rawData); } catch (err) {}
          }
        }

        if (item && item.content) {
          var dropIdx = $(this).data("drop-index");
          self.insertBlock(item.content, dropIdx);
        }
      });
    };

    /**
     * Sync value to underlying form inputs
     */
    self.syncField = function (path, val) {
      try {
        var inputName = path.split("/").pop();
        var $inp = $(".field-name-" + inputName + " input, .field-name-" + inputName + " textarea");
        if ($inp.length) {
          $inp.val(val).trigger("change");
        }
      } catch (e) {}
    };

    /**
     * Toast feedback
     */
    self.showToast = function (msg) {
      var $toast = $('<div style="position: fixed; bottom: 24px; right: 24px; background: #0f172a; color: #38bdf8; border: 1.5px solid #38bdf8; padding: 10px 20px; border-radius: 8px; font-weight: 800; font-size: 0.85rem; z-index: 2147483647; box-shadow: 0 10px 30px rgba(0,0,0,0.5); font-family: sans-serif;">' + msg + '</div>');
      $("body").append($toast);
      setTimeout(function () {
        $toast.fadeOut(300, function () { $(this).remove(); });
      }, 2000);
    };
  }

  // Register H5PEditor widget
  var $ = window.H5PEditor && window.H5PEditor.$ ? window.H5PEditor.$ : (window.H5P && window.H5P.jQuery ? window.H5P.jQuery : (window.jQuery || window.$));

  function RiseBlockToolboxWidget(parent, field, params, setValue) {
    this.parent = parent;
    this.field = field;
    this.params = params;
    this.setValue = setValue;
  }

  RiseBlockToolboxWidget.prototype.appendTo = function ($wrapper) {
    var self = this;
    self.$item = $(self.createFieldMarkup());
    $wrapper.append(self.$item);
    RiseBlockToolboxWidget.initStudio(self);
  };

  RiseBlockToolboxWidget.prototype.createFieldMarkup = function () {
    return '<div class="rise-toolbox-widget-status" style="display: none;"></div>';
  };

  RiseBlockToolboxWidget.prototype.validate = function () {
    return true;
  };

  RiseBlockToolboxWidget.prototype.remove = function () {};

  RiseBlockToolboxWidget.initStudio = function (widgetInstance) {
    fixCoreTranslations();
    var toolbox = new RiseBlockToolbox();
    toolbox.init(widgetInstance);
  };

  H5PEditor.widgets.riseBlockToolbox = H5PEditor.RiseBlockToolbox = RiseBlockToolboxWidget;

  if (typeof $ !== "undefined" && $) {
    $(function () {
      RiseBlockToolboxWidget.initStudio();
      setTimeout(RiseBlockToolboxWidget.initStudio, 400);
      setTimeout(RiseBlockToolboxWidget.initStudio, 1000);
      setTimeout(RiseBlockToolboxWidget.initStudio, 2000);
    });
  } else {
    setTimeout(function () {
      RiseBlockToolboxWidget.initStudio();
    }, 500);
  }

})(window.H5PEditor && window.H5PEditor.$ ? window.H5PEditor.$ : (window.H5P && window.H5P.jQuery ? window.H5P.jQuery : (window.jQuery || window.$)));
