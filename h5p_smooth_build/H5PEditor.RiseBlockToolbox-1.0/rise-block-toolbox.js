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
    self.isOutlineOpen = true;

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
            id: "interactive_carousel",
            name: "Slideshow Carousel",
            badge: "Multi-Image",
            desc: "Multi-image carousel with slide navigation",
            iconSvg: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>',
            previewHtml: '<div style="background: #0f172a; border-radius: 6px; overflow: hidden; position: relative;"><img src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=400&q=80" style="width: 100%; height: 55px; object-fit: cover;"><div style="display: flex; justify-content: center; gap: 3px; padding: 3px; background: #0b1120;"><span style="width: 5px; height: 5px; border-radius: 50%; background: #38bdf8;"></span><span style="width: 5px; height: 5px; border-radius: 50%; background: #475569;"></span></div></div>',
            content: '<div class="rise-carousel-container" data-slide-index="0"><div class="rise-carousel-track"><div class="rise-carousel-slide is-active"><img src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80" alt="Slide 1"><div class="rise-carousel-slide-caption"><strong>1. Code Editor & IDE</strong> — បរិស្ថានសម្រាប់សរសេរកូដ Java ប្រកបដោយប្រសិទ្ធភាព</div></div><div class="rise-carousel-slide"><img src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80" alt="Slide 2"><div class="rise-carousel-slide-caption"><strong>2. Java Architecture</strong> — ដំណើរការ Java Bytecode នៅលើ JVM</div></div></div><button type="button" class="rise-carousel-btn prev" title="Previous Slide">‹</button><button type="button" class="rise-carousel-btn next" title="Next Slide">›</button><div class="rise-carousel-dots"><span class="rise-carousel-dot is-active" data-idx="0"></span><span class="rise-carousel-dot" data-idx="1"></span></div></div>'
          },
          {
            id: "image_slider_preview",
            name: "Image Showcase",
            badge: "Photo",
            desc: "Clean full-bleed showcase",
            iconSvg: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>',
            previewHtml: '<div style="border-radius: 6px; overflow: hidden; position: relative;"><img src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=400&q=80" style="width: 100%; height: 60px; object-fit: cover;"><div style="position: absolute; bottom: 0; left: 0; right: 0; background: rgba(0,0,0,0.6); color: #fff; padding: 2px 6px; font-size: 9px;">Image Showcase Slider</div></div>',
            content: '<div class="rise-image-hero"><img src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80" alt="Slider Image"><div class="rise-image-hero-caption"><strong>Image Showcase</strong> — បង្ហាញរូបភាព និង Diagram ស្ថាបត្យកម្មប្រព័ន្ធ</div></div>'
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
            id: "grid_gallery_3",
            name: "3-Column Grid",
            badge: "Gallery",
            desc: "3-Column multi-image gallery",
            iconSvg: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="5" height="18" rx="1"/><rect x="9.5" y="3" width="5" height="18" rx="1"/><rect x="17" y="3" width="5" height="18" rx="1"/></svg>',
            previewHtml: '<div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 3px;"><img src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=150&q=80" style="height: 40px; object-fit: cover; border-radius: 3px;"><img src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=150&q=80" style="height: 40px; object-fit: cover; border-radius: 3px;"><img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=150&q=80" style="height: 40px; object-fit: cover; border-radius: 3px;"></div>',
            content: '<div class="rise-image-grid-3"><div class="rise-image-card"><img src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80" alt="Item 1"><div class="rise-image-card-caption"><strong>JDK</strong> — Development Kit</div></div><div class="rise-image-card"><img src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80" alt="Item 2"><div class="rise-image-card-caption"><strong>JRE</strong> — Runtime Environment</div></div><div class="rise-image-card"><img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80" alt="Item 3"><div class="rise-image-card-caption"><strong>JVM</strong> — Virtual Machine</div></div></div>'
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
            id: "interactive_quiz_card",
            name: "Interactive Quiz",
            badge: "Quiz",
            desc: "Multiple choice check with instant scoring",
            iconSvg: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
            previewHtml: '<div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 4px; padding: 6px; font-size: 10px;"><strong>សំនួរ:</strong> តើ Java Bytecode ដំណើរការលើអ្វី?<div style="margin-top: 4px; color: #2563eb;">○ A. JVM (Java Virtual Machine)</div></div>',
            content: '<div class="rise-quiz-card" data-correct="0" data-explanation="JVM (Java Virtual Machine) គឺជាម៉ាស៊ីននិម្មិតដែលទទួលបន្ទុកដំណើរការ Bytecode របស់ Java នៅលើគ្រប់ OS។"><div class="rise-quiz-header"><div class="rise-quiz-tag">Knowledge Check</div><div class="rise-quiz-score-badge">1 Point</div></div><div class="rise-quiz-question">សំនួរត្រួតពិនិត្យការយល់ដឹង: តើកម្មវិធី Java Bytecode ដំណើរការនៅលើអ្វី?</div><div class="rise-quiz-options"><div class="rise-quiz-option" data-opt-idx="0"><span>A. JVM (Java Virtual Machine)</span><span class="rise-quiz-option-indicator"></span></div><div class="rise-quiz-option" data-opt-idx="1"><span>B. Operating System Kernel ផ្ទាល់</span><span class="rise-quiz-option-indicator"></span></div><div class="rise-quiz-option" data-opt-idx="2"><span>C. Web Browser JavaScript Engine</span><span class="rise-quiz-option-indicator"></span></div></div><div class="rise-quiz-feedback"></div><div class="rise-quiz-actions" style="display: none;"><button type="button" class="rise-quiz-retry-btn"><span>🔄 Try Again</span></button></div></div>'
          },
          {
            id: "moodle_quiz_activity",
            name: "Moodle Quiz Block",
            badge: "Moodle Plugin",
            desc: "Moodle Question Bank & Quiz activity embed",
            iconSvg: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>',
            previewHtml: '<div style="background: #0f172a; color: #fff; padding: 6px 10px; border-radius: 4px; font-size: 10px;"><div style="color: #f97316; font-weight: bold;">Moodle Quiz</div><div>Official Course Exam</div></div>',
            content: '<div class="rise-moodle-embed-card" data-quiz-id="1"><div class="rise-moodle-embed-badge">Moodle Quiz Plugin</div><div class="rise-moodle-embed-title">ការប្រឡងតេស្តពិន្ទុ (Official Moodle Quiz)</div><div class="rise-moodle-embed-desc">សូមចុចប៊ូតុងខាងក្រោមដើម្បីចូលរួមធ្វើតេស្តប្រឡងពិន្ទុផ្លូវការនៅក្នុងប្រព័ន្ធ Moodle Quiz។</div><a href="/mod/quiz/view.php?id=1" target="_blank" class="rise-moodle-embed-btn"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg><span>Open Moodle Quiz Test</span></a></div>'
          },
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
          }
        ]
      }
    ];

    /**
     * Initialize Studio
     */
    self.init = function (widgetInstance) {
      if (widgetInstance) {
        self.widget = widgetInstance;
      }
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
          '<div class="rise-top-left-group">' +
            '<button type="button" class="rise-visual-toggle-outline-btn is-active" title="Toggle Course Outline Sidebar">' +
              '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>' +
              '<span>Outline</span>' +
            '</button>' +
            '<div class="rise-visual-current-badge">' +
              '<span class="rise-current-badge-label">Active:</span>' +
              '<span class="rise-current-badge-title">Cover & Outline</span>' +
            '</div>' +
          '</div>' +
          '<div class="rise-top-right-group">' +
            '<button type="button" class="rise-visual-preview-mode-btn" title="Preview Student Experience">' +
              '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>' +
              '<span>Preview</span>' +
            '</button>' +
            '<button type="button" class="rise-visual-add-lesson-btn" title="Add a new lesson to course">' +
              '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>' +
              '<span>+ Add Lesson</span>' +
            '</button>' +
            '<button type="button" class="rise-visual-fullscreen-btn" title="Toggle Fullscreen Studio">' +
              '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/></svg>' +
              '<span>Fullscreen</span>' +
            '</button>' +
          '</div>' +
        '</div>' +
        '<div class="rise-visual-workspace">' +
          '<aside class="rise-visual-outline-sidebar">' +
            '<div class="rise-outline-header">' +
              '<div class="rise-outline-title">' +
                '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>' +
                '<span>Course Outline</span>' +
              '</div>' +
            '</div>' +
            '<div class="rise-outline-tree"></div>' +
          '</aside>' +
          '<div class="rise-visual-canvas-area"></div>' +
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
        '</div>' +
      '</div>');

      $mount.before($editorRoot);

      // Render Right Toolbox components
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
            self.insertBlock(item.content, "end");
          });

          // Drag Start
          $card.on("dragstart", function (e) {
            $previewTooltip.hide();
            $(this).addClass("is-dragging");
            $("body").addClass("is-rise-dragging");
            window.riseCurrentDraggedBlock = item;
            if (e.originalEvent && e.originalEvent.dataTransfer) {
              e.originalEvent.dataTransfer.effectAllowed = "copy";
              try {
                e.originalEvent.dataTransfer.setData("text/plain", JSON.stringify(item));
                e.originalEvent.dataTransfer.setData("application/json", JSON.stringify(item));
              } catch (err) {}
            }
          }).on("dragend", function () {
            $(this).removeClass("is-dragging");
            $("body").removeClass("is-rise-dragging");
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

      // Outline Sidebar Toggle
      $editorRoot.find(".rise-visual-toggle-outline-btn").on("click", function () {
        self.isOutlineOpen = !self.isOutlineOpen;
        $editorRoot.toggleClass("outline-collapsed", !self.isOutlineOpen);
        $(this).toggleClass("is-active", self.isOutlineOpen);
      });

      // Preview Mode Button
      $editorRoot.find(".rise-visual-preview-mode-btn").on("click", function () {
        self.openRealPreviewModal();
      });

      // Fullscreen Toggle
      var $spacer = $('<div class="rise-fullscreen-spacer"></div>');
      $editorRoot.after($spacer);

      function getFullscreenElement() {
        return document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement || null;
      }

      function updateFullscreenUI(isFs) {
        self.isFullscreen = isFs;
        $editorRoot.toggleClass("is-fullscreen", isFs);
        $("body").toggleClass("rise-studio-body-fullscreen", isFs);
        if (isFs) {
          $editorRoot.find(".rise-visual-fullscreen-btn span").text("Exit Fullscreen");
        } else {
          $editorRoot.find(".rise-visual-fullscreen-btn span").text("Fullscreen");
        }
      }

      $editorRoot.find(".rise-visual-fullscreen-btn").on("click", function () {
        var elem = $editorRoot[0];
        var isFs = !!getFullscreenElement() || self.isFullscreen;

        if (!isFs) {
          var req = elem.requestFullscreen || elem.webkitRequestFullscreen || elem.mozRequestFullScreen || elem.msRequestFullscreen;
          if (req) {
            try {
              var promise = req.call(elem);
              if (promise && promise.catch) {
                promise.catch(function () {
                  updateFullscreenUI(true);
                });
              } else {
                updateFullscreenUI(true);
              }
            } catch (err) {
              updateFullscreenUI(true);
            }
          } else {
            updateFullscreenUI(true);
          }
        } else {
          var exit = document.exitFullscreen || document.webkitExitFullscreen || document.mozCancelFullScreen || document.msExitFullscreen;
          if (getFullscreenElement() && exit) {
            try {
              var p = exit.call(document);
              if (p && p.catch) {
                p.catch(function () {
                  updateFullscreenUI(false);
                });
              } else {
                updateFullscreenUI(false);
              }
            } catch (err) {
              updateFullscreenUI(false);
            }
          } else {
            updateFullscreenUI(false);
          }
        }
      });

      $(document).on("fullscreenchange webkitfullscreenchange mozfullscreenchange MSFullscreenChange", function () {
        var isFs = !!getFullscreenElement();
        updateFullscreenUI(isFs);
      });

      // Navigation outline item switching
      $editorRoot.on("click", ".rise-outline-item", function () {
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
      $(".rise-outline-item").removeClass("is-active");
      $('.rise-outline-item[data-tab="' + tabId + '"]').addClass("is-active");
      self.updateTopBadge();
      self.renderActiveTabContent();
    };

    /**
     * Update active badge in top bar
     */
    self.updateTopBadge = function () {
      var params = self.getParams();
      var label = "Cover & Outline";
      if (self.activeTab !== "cover") {
        var parts = self.activeTab.split("_");
        var sIdx = parseInt(parts[0], 10) || 0;
        var lIdx = parseInt(parts[1], 10) || 0;
        var sec = (params.sections && params.sections[sIdx]) || {};
        var les = (sec.lessons && sec.lessons[lIdx]) || {};
        label = les.title || ("Lesson " + (lIdx + 1));
      }
      $(".rise-current-badge-title").text(label);
    };

    /**
     * Get Root H5P Parameters safely
     */
    self.getParams = function () {
      if (self.widget && self.widget.parent && self.widget.parent.parent && self.widget.parent.parent.params) {
        return self.widget.parent.parent.params;
      }
      if (window.H5PEditor && window.H5PEditor.instances && window.H5PEditor.instances.length > 0 && window.H5PEditor.instances[0].params) {
        return window.H5PEditor.instances[0].params;
      }
      if (!window.riseFallbackParams) {
        window.riseFallbackParams = {
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
                  content: {
                    library: "H5P.Column 1.22",
                    params: {
                      content: [
                        {
                          content: {
                            library: "H5P.AdvancedText 1.1",
                            params: {
                              text: '<div class="rise-header-block"><div class="rise-category-tag">Overview</div><h2 class="rise-main-title">ចំណងជើងមេរៀន (Lesson Title)</h2><p class="rise-main-desc">ការពិពណ៌នាសង្ខេបអំពីខ្លឹមសារមេរៀន...</p></div>'
                            }
                          }
                        }
                      ]
                    }
                  }
                }
              ]
            }
          ]
        };
      }
      return window.riseFallbackParams;
    };

    /**
     * Update Studio Navigation Outline Tree
     */
    self.updateStudio = function () {
      var params = self.getParams();
      var $tree = $(".rise-outline-tree");
      $tree.empty();

      // 1. Cover Item
      var isCoverAct = self.activeTab === "cover" ? "is-active" : "";
      var $coverItem = $('<div class="rise-outline-item is-cover ' + isCoverAct + '" data-tab="cover">' +
        '<div class="rise-outline-item-icon">' +
          '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>' +
        '</div>' +
        '<span class="rise-outline-item-title">Cover & Outline</span>' +
      '</div>');
      $tree.append($coverItem);

      // 2. Sections and Lessons
      var lessonCount = 0;
      if (params.sections && params.sections.length > 0) {
        params.sections.forEach(function (sec, sIdx) {
          var secTitle = sec.sectionTitle || ("Section " + (sIdx + 1));
          var $secLabel = $('<div class="rise-outline-section-label">' + secTitle + '</div>');
          $tree.append($secLabel);

          if (sec.lessons && sec.lessons.length > 0) {
            sec.lessons.forEach(function (les, lIdx) {
              var tabId = sIdx + "_" + lIdx;
              var isAct = self.activeTab === tabId ? "is-active" : "";
              var title = les.title || ("Lesson " + (lessonCount + 1));
              var $lessonItem = $('<div class="rise-outline-item is-lesson ' + isAct + '" data-tab="' + tabId + '" data-section-idx="' + sIdx + '" data-lesson-idx="' + lIdx + '" draggable="true">' +
                '<div class="rise-outline-drag-handle" title="Drag to reorder lesson">' +
                  '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="9" cy="6" r="1.5"/><circle cx="15" cy="6" r="1.5"/><circle cx="9" cy="12" r="1.5"/><circle cx="15" cy="12" r="1.5"/><circle cx="9" cy="18" r="1.5"/><circle cx="15" cy="18" r="1.5"/></svg>' +
                '</div>' +
                '<div class="rise-outline-item-icon">' +
                  '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>' +
                '</div>' +
                '<span class="rise-outline-item-title">' + title + '</span>' +
              '</div>');

              // Drag to reorder lesson items
              $lessonItem.on("dragstart", function (e) {
                e.stopPropagation();
                window.riseDraggedLesson = { sIdx: sIdx, lIdx: lIdx };
                $(this).addClass("is-reordering");
                if (e.originalEvent && e.originalEvent.dataTransfer) {
                  e.originalEvent.dataTransfer.effectAllowed = "move";
                  try {
                    e.originalEvent.dataTransfer.setData("text/plain", "reorder-lesson");
                  } catch (err) {}
                }
              });

              $lessonItem.on("dragover", function (e) {
                if (!window.riseDraggedLesson) return;
                e.preventDefault();
                e.stopPropagation();
                if (e.originalEvent && e.originalEvent.dataTransfer) {
                  e.originalEvent.dataTransfer.dropEffect = "move";
                }
                var rect = this.getBoundingClientRect();
                var relY = e.originalEvent.clientY - rect.top;
                var isTop = relY < (rect.height / 2);
                $(this).toggleClass("drag-over-top", isTop);
                $(this).toggleClass("drag-over-bottom", !isTop);
              });

              $lessonItem.on("dragleave", function (e) {
                $(this).removeClass("drag-over-top drag-over-bottom");
              });

              $lessonItem.on("drop", function (e) {
                if (!window.riseDraggedLesson) return;
                e.preventDefault();
                e.stopPropagation();
                var srcInfo = window.riseDraggedLesson;
                window.riseDraggedLesson = null;
                $(".rise-outline-item").removeClass("drag-over-top drag-over-bottom is-reordering");

                var targetSIdx = parseInt($(this).attr("data-section-idx"), 10);
                var targetLIdx = parseInt($(this).attr("data-lesson-idx"), 10);

                var rect = this.getBoundingClientRect();
                var relY = e.originalEvent.clientY - rect.top;
                var insertBefore = relY < (rect.height / 2);

                if (srcInfo.sIdx === targetSIdx && srcInfo.lIdx === targetLIdx) {
                  return;
                }

                var params = self.getParams();
                if (!params.sections || !params.sections[srcInfo.sIdx] || !params.sections[targetSIdx]) return;

                var movedLesson = params.sections[srcInfo.sIdx].lessons.splice(srcInfo.lIdx, 1)[0];
                if (!movedLesson) return;

                var targetLessons = params.sections[targetSIdx].lessons;
                var insertIdx = targetLIdx;
                if (srcInfo.sIdx === targetSIdx && srcInfo.lIdx < targetLIdx) {
                  insertIdx = insertBefore ? (targetLIdx - 1) : targetLIdx;
                } else {
                  insertIdx = insertBefore ? targetLIdx : (targetLIdx + 1);
                }

                if (insertIdx < 0) insertIdx = 0;
                if (insertIdx > targetLessons.length) insertIdx = targetLessons.length;

                targetLessons.splice(insertIdx, 0, movedLesson);

                self.activeTab = targetSIdx + "_" + insertIdx;
                self.updateStudio();
                self.showToast("Lesson reordered!");
              });

              $lessonItem.on("dragend", function (e) {
                window.riseDraggedLesson = null;
                $(".rise-outline-item").removeClass("drag-over-top drag-over-bottom is-reordering");
              });

              $tree.append($lessonItem);
              lessonCount++;
            });
          }
        });
      }

      self.updateTopBadge();
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
      $cover.find(".rise-canvas-change-cover-btn").on("click", function (e) {
        e.stopPropagation();
        self.openImageEditor({
          title: "Change Cover Photo",
          currentUrl: meta.coverImageUrl || coverImg,
          currentAlt: meta.title || "Course Cover",
          onApply: function (newUrl, newAlt) {
            meta.coverImageUrl = newUrl;
            $cover.find(".rise-canvas-cover-hero").css("background-image", "url('" + newUrl + "')");
            self.syncField("courseMeta/coverImageUrl", newUrl);
          }
        });
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

      if (!params.sections) params.sections = [];
      if (!params.sections[sIdx]) {
        params.sections[sIdx] = { sectionTitle: "មាតិកាមេរៀន", lessons: [] };
      }
      var sec = params.sections[sIdx];
      if (!sec.lessons) sec.lessons = [];
      if (!sec.lessons[lIdx]) {
        sec.lessons[lIdx] = { title: "មេរៀនទី " + (lIdx + 1), content: "" };
      }
      var lesson = sec.lessons[lIdx];

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
          '<span>Drop Component Here at Top</span>' +
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
      } else {
        $blocksList.html('<div style="color: #94a3b8; text-align: center; padding: 24px 0; font-size: 0.85rem;">No blocks added yet. Click or drag any component from the left toolbox!</div>');
      }

      $canvas.append($lessonView);
    };

    /**
     * Parse Lesson Content HTML reliably from all H5P representations
     */
    self.getLessonContentHtml = function (lesson) {
      if (!lesson) return "";
      if (typeof lesson.content === "string") return lesson.content;
      if (lesson.content && typeof lesson.content === "object") {
        if (lesson.content.params && lesson.content.params.content && Array.isArray(lesson.content.params.content)) {
          var htmlArr = [];
          lesson.content.params.content.forEach(function (item) {
            if (item.content && item.content.params && item.content.params.text) {
              htmlArr.push(item.content.params.text);
            } else if (item.params && item.params.text) {
              htmlArr.push(item.params.text);
            }
          });
          if (htmlArr.length > 0) return htmlArr.join("\n");
        }
        if (lesson.content.params && Array.isArray(lesson.content.params)) {
          var htmlArr2 = [];
          lesson.content.params.forEach(function (p) {
            if (p.content && p.content.params && p.content.params.text) {
              htmlArr2.push(p.content.params.text);
            } else if (p.params && p.params.text) {
              htmlArr2.push(p.params.text);
            }
          });
          if (htmlArr2.length > 0) return htmlArr2.join("\n");
        }
        if (lesson.content.text) return lesson.content.text;
      }
      return "";
    };

    /**
     * Store HTML back to lesson parameters in valid H5P Column schema
     */
    self.setLessonContentHtml = function (lesson, fullHtml) {
      if (!lesson) return;
      var subId = (lesson.content && lesson.content.subContentId) || ("rise-col-" + Math.random().toString(36).substr(2, 9));
      lesson.content = {
        library: "H5P.Column 1.22",
        params: {
          content: [
            {
              content: {
                library: "H5P.AdvancedText 1.1",
                params: {
                  text: fullHtml
                },
                subContentId: "rise-txt-" + Math.random().toString(36).substr(2, 9)
              },
              useSeparator: "auto"
            }
          ]
        },
        subContentId: subId
      };
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

      $container.empty();
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
          if ($container.find(".rise-canvas-block-wrapper").length === 0) {
            $container.html('<div style="color: #94a3b8; text-align: center; padding: 24px 0; font-size: 0.85rem;">No blocks added yet. Click or drag any component from the left toolbox!</div>');
          }
        });

        // 1. Process Carousel Slideshow Blocks (Multi-Image)
        $blockWrap.find(".rise-carousel-container").each(function () {
          var $car = $(this);
          var $track = $car.find(".rise-carousel-track");
          var $slides = $car.find(".rise-carousel-slide");
          var $dots = $car.find(".rise-carousel-dot");
          var slideIdx = parseInt($car.attr("data-slide-index"), 10) || 0;

          function setSlide(i) {
            if ($slides.length === 0) return;
            if (i < 0) i = $slides.length - 1;
            if (i >= $slides.length) i = 0;
            slideIdx = i;
            $car.attr("data-slide-index", slideIdx);
            $track.css("transform", "translateX(-" + (slideIdx * 100) + "%)");
            $slides.removeClass("is-active").eq(slideIdx).addClass("is-active");
            $dots.removeClass("is-active").eq(slideIdx).addClass("is-active");
          }

          setSlide(slideIdx);

          $car.find(".rise-carousel-btn.prev").off("click").on("click", function (e) {
            e.stopPropagation();
            setSlide(slideIdx - 1);
          });

          $car.find(".rise-carousel-btn.next").off("click").on("click", function (e) {
            e.stopPropagation();
            setSlide(slideIdx + 1);
          });

          $dots.off("click").on("click", function (e) {
            e.stopPropagation();
            var dIdx = parseInt($(this).attr("data-idx"), 10) || 0;
            setSlide(dIdx);
          });

          // Add Manage Slides action button to carousel
          if (!$car.find(".rise-carousel-manage-btn").length) {
            var $mBtn = $('<button type="button" class="rise-carousel-manage-btn" style="position: absolute; top: 12px; right: 12px; z-index: 20; background: rgba(15, 23, 42, 0.75); color: #fff; border: 1px solid rgba(255,255,255,0.2); border-radius: 6px; padding: 6px 12px; font-size: 0.75rem; font-weight: 700; cursor: pointer; backdrop-filter: blur(4px);">' +
              '<span>🖼️ Manage Slides (Multi-Upload)</span>' +
            '</button>');
            $car.append($mBtn);

            $mBtn.on("click", function (e) {
              e.stopPropagation();
              var existingImages = [];
              $slides.each(function () {
                var $s = $(this);
                var src = $s.find("img").attr("src");
                var cap = $s.find(".rise-carousel-slide-caption").text().trim();
                if (src) existingImages.push({ url: src, caption: cap });
              });

              self.openImageEditor({
                title: "Manage Slides & Multi-Image Upload",
                images: existingImages,
                layout: "carousel",
                onApply: function (pUrl, pAlt, imagesList, layout) {
                  if (layout === "carousel") {
                    var slidesHtml = "";
                    var dotsHtml = "";
                    imagesList.forEach(function (img, i) {
                      var isAct = i === 0 ? "is-active" : "";
                      slidesHtml += '<div class="rise-carousel-slide ' + isAct + '"><img src="' + img.url + '" alt="Slide ' + (i + 1) + '"><div class="rise-carousel-slide-caption">' + (img.caption || ('Slide ' + (i + 1))) + '</div></div>';
                      dotsHtml += '<span class="rise-carousel-dot ' + isAct + '" data-idx="' + i + '"></span>';
                    });
                    var newCarouselHtml = '<div class="rise-carousel-container" data-slide-index="0"><div class="rise-carousel-track">' + slidesHtml + '</div><button type="button" class="rise-carousel-btn prev" title="Previous Slide">‹</button><button type="button" class="rise-carousel-btn next" title="Next Slide">›</button><div class="rise-carousel-dots">' + dotsHtml + '</div></div>';
                    $blockWrap.find(".rise-canvas-block-inner").html(newCarouselHtml);
                  } else if (layout === "grid2" || layout === "grid3") {
                    var gridCls = layout === "grid2" ? "rise-image-grid-2" : "rise-image-grid-3";
                    var cardsHtml = "";
                    imagesList.forEach(function (img, i) {
                      cardsHtml += '<div class="rise-image-card"><img src="' + img.url + '" alt="Item ' + (i + 1) + '"><div class="rise-image-card-caption">' + (img.caption || ('Item ' + (i + 1))) + '</div></div>';
                    });
                    $blockWrap.find(".rise-canvas-block-inner").html('<div class="' + gridCls + '">' + cardsHtml + '</div>');
                  } else {
                    $blockWrap.find(".rise-canvas-block-inner").html('<div class="rise-image-hero"><img src="' + pUrl + '" alt="' + pAlt + '"><div class="rise-image-hero-caption">' + pAlt + '</div></div>');
                  }
                  self.saveAllBlocksFromCanvas($container, lesson);
                  self.renderActiveTabContent();
                }
              });
            });
          }
        });

        // 2. Process Interactive Quiz Cards
        $blockWrap.find(".rise-quiz-card").each(function () {
          var $qCard = $(this);
          var $options = $qCard.find(".rise-quiz-option");
          var $feedback = $qCard.find(".rise-quiz-feedback");
          var $actions = $qCard.find(".rise-quiz-actions");
          var $retryBtn = $qCard.find(".rise-quiz-retry-btn");
          var correctIdx = parseInt($qCard.attr("data-correct"), 10) || 0;
          var explanation = $qCard.attr("data-explanation") || "";

          $options.off("click").on("click", function (e) {
            e.stopPropagation();
            if ($options.hasClass("is-correct") || $options.hasClass("is-incorrect")) return;

            var chosenIdx = parseInt($(this).attr("data-opt-idx"), 10);
            if (chosenIdx === correctIdx) {
              $(this).addClass("is-correct");
              $qCard.find(".rise-quiz-score-badge").text("1/1 (Correct)").css({ background: "#dcfce7", color: "#166534" });
              $feedback.html('<strong>✓ Correct!</strong> ' + explanation).removeClass("is-incorrect").addClass("is-correct").slideDown(200);
            } else {
              $(this).addClass("is-incorrect");
              $options.filter('[data-opt-idx="' + correctIdx + '"]').addClass("is-correct");
              $qCard.find(".rise-quiz-score-badge").text("0/1 (Try Again)").css({ background: "#fee2e2", color: "#991b1b" });
              $feedback.html('<strong>✕ Incorrect.</strong> ' + explanation).removeClass("is-correct").addClass("is-incorrect").slideDown(200);
            }
            $actions.show();
          });

          $retryBtn.off("click").on("click", function (e) {
            e.stopPropagation();
            $options.removeClass("is-correct is-incorrect is-selected");
            $feedback.slideUp(150);
            $actions.hide();
            $qCard.find(".rise-quiz-score-badge").text("1 Point").css({ background: "#f1f5f9", color: "#64748b" });
          });

          // Add Edit Quiz button
          if (!$qCard.find(".rise-quiz-edit-btn").length) {
            var $qEditBtn = $('<button type="button" class="rise-quiz-edit-btn" style="position: absolute; top: 12px; right: 12px; z-index: 10; background: #eff6ff; color: #2563eb; border: 1px solid #bfdbfe; border-radius: 6px; padding: 4px 10px; font-size: 0.725rem; font-weight: 700; cursor: pointer;">' +
              '<span>✏️ Edit Quiz / Import Moodle</span>' +
            '</button>');
            $qCard.prepend($qEditBtn);

            $qEditBtn.on("click", function (e) {
              e.stopPropagation();
              var existingOpts = [];
              $options.each(function () {
                existingOpts.push($(this).find("span").first().text().trim());
              });

              self.openQuizEditor({
                category: $qCard.find(".rise-quiz-tag").text().trim(),
                question: $qCard.find(".rise-quiz-question").text().trim(),
                options: existingOpts,
                correctIndex: correctIdx,
                explanation: explanation,
                onApply: function (quizData) {
                  if (quizData.isActivity) {
                    var actHtml = '<div class="rise-moodle-embed-card" data-quiz-id="' + quizData.url + '"><div class="rise-moodle-embed-badge">Moodle Quiz Plugin</div><div class="rise-moodle-embed-title">' + quizData.title + '</div><div class="rise-moodle-embed-desc">' + quizData.desc + '</div><a href="' + quizData.url + '" target="_blank" class="rise-moodle-embed-btn"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg><span>Open Moodle Quiz Test</span></a></div>';
                    $blockWrap.find(".rise-canvas-block-inner").html(actHtml);
                  } else {
                    var optsHtml = "";
                    quizData.options.forEach(function (opt, oIdx) {
                      optsHtml += '<div class="rise-quiz-option" data-opt-idx="' + oIdx + '"><span>' + opt + '</span><span class="rise-quiz-option-indicator"></span></div>';
                    });
                    var newQuizHtml = '<div class="rise-quiz-card" data-correct="' + quizData.correctIndex + '" data-explanation="' + quizData.explanation + '"><div class="rise-quiz-header"><div class="rise-quiz-tag">' + quizData.category + '</div><div class="rise-quiz-score-badge">1 Point</div></div><div class="rise-quiz-question">' + quizData.question + '</div><div class="rise-quiz-options">' + optsHtml + '</div><div class="rise-quiz-feedback"></div><div class="rise-quiz-actions" style="display: none;"><button type="button" class="rise-quiz-retry-btn"><span>🔄 Try Again</span></button></div></div>';
                    $blockWrap.find(".rise-canvas-block-inner").html(newQuizHtml);
                  }
                  self.saveAllBlocksFromCanvas($container, lesson);
                  self.renderActiveTabContent();
                }
              });
            });
          }
        });

        // 3. Attach image editing triggers to every image in this block
        $blockWrap.find(".rise-canvas-block-inner img").each(function () {
          var $img = $(this);
          var $imgParent = $img.parent();
          if (!$imgParent.find(".rise-img-edit-trigger").length) {
            $imgParent.css("position", "relative");
            var $editBtn = $('<button type="button" class="rise-img-edit-trigger" title="Change / Upload Image">' +
              '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>' +
              '<span>Change / Upload</span>' +
            '</button>');
            $imgParent.append($editBtn);

            $editBtn.add($img).on("click", function (e) {
              e.preventDefault();
              e.stopPropagation();
              var existingCaption = "";
              var $captionEl = $img.siblings(".rise-image-card-caption, .rise-image-hero-caption, .rise-carousel-slide-caption");
              if ($captionEl.length) {
                existingCaption = $captionEl.text().trim();
              } else {
                existingCaption = $img.attr("alt") || "";
              }

              self.openImageEditor({
                title: "Edit & Upload Image",
                currentUrl: $img.attr("src"),
                currentAlt: existingCaption,
                onApply: function (newUrl, newAlt) {
                  $img.attr("src", newUrl);
                  $img.attr("alt", newAlt || "");
                  if ($captionEl.length) {
                    $captionEl.text(newAlt);
                  }
                  self.saveAllBlocksFromCanvas($container, lesson);
                }
              });
            });
          }
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

      self.setLessonContentHtml(lesson, fullHtml);

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
      var newLesson = {
        title: "មេរៀនទី" + newNum + ": ចំណងជើងមេរៀនថ្មី",
        iconType: "overview",
        content: ""
      };
      self.setLessonContentHtml(newLesson, '<div class="rise-header-block"><div class="rise-category-tag">Lesson ' + newNum + '</div><h2 class="rise-main-title">មេរៀនទី' + newNum + '</h2><p class="rise-main-desc">សូមបញ្ចូលខ្លឹមសារមេរៀននៅទីនេះ...</p></div>');
      sec.lessons.push(newLesson);

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

      if (!params.sections) params.sections = [];
      if (!params.sections[sIdx]) params.sections[sIdx] = { sectionTitle: "Section", lessons: [] };
      if (!params.sections[sIdx].lessons) params.sections[sIdx].lessons = [];
      if (!params.sections[sIdx].lessons[lIdx]) {
        params.sections[sIdx].lessons[lIdx] = { title: "Lesson", content: "" };
      }
      var lesson = params.sections[sIdx].lessons[lIdx];

      var currentHtml = self.getLessonContentHtml(lesson);
      var newHtml = "";

      if (targetIndex !== undefined && targetIndex !== null && targetIndex !== "end") {
        var $temp = $("<div>" + currentHtml + "</div>");
        var children = $temp.children();
        var insertIdx = parseInt(targetIndex, 10);
        if (insertIdx === 0) {
          newHtml = currentHtml ? (blockHtml + "\n" + currentHtml) : blockHtml;
        } else if (insertIdx > 0 && insertIdx <= children.length) {
          $(children[insertIdx - 1]).after(blockHtml);
          newHtml = $temp.html();
        } else {
          newHtml = currentHtml ? (currentHtml + "\n" + blockHtml) : blockHtml;
        }
      } else {
        newHtml = currentHtml ? (currentHtml + "\n" + blockHtml) : blockHtml;
      }

      self.setLessonContentHtml(lesson, newHtml);
      self.renderActiveTabContent();
      self.showToast("Block added! Click to edit text.");
    };

    /**
     * Setup Drag & Drop across Workspace with full delegation & bounds safety
     */
    self.setupDragAndDrop = function () {
      $(document).off(".riseStudioDnD");

      $(document).on("dragover.riseStudioDnD dragenter.riseStudioDnD", function (e) {
        var $target = $(e.target);
        if ($target.closest(".rise-visual-workspace").length) {
          e.preventDefault();
          if (e.originalEvent && e.originalEvent.dataTransfer) {
            e.originalEvent.dataTransfer.dropEffect = "copy";
          }
          var $dropZone = $target.closest(".rise-canvas-drop-zone, .rise-canvas-block-wrapper");
          if ($dropZone.length) {
            $(".rise-canvas-drop-zone, .rise-canvas-block-wrapper").not($dropZone).removeClass("rise-drop-target-active is-hovered");
            $dropZone.addClass("rise-drop-target-active is-hovered");
          }
        }
      });

      $(document).on("dragleave.riseStudioDnD", function (e) {
        var $target = $(e.target);
        if ($target.hasClass("rise-canvas-drop-zone") || $target.hasClass("rise-canvas-block-wrapper")) {
          $target.removeClass("rise-drop-target-active is-hovered");
        }
      });

      $(document).on("drop.riseStudioDnD", function (e) {
        var $target = $(e.target);
        if ($target.closest(".rise-visual-workspace").length) {
          e.preventDefault();
          e.stopPropagation();
          $("body").removeClass("is-rise-dragging");
          $(".rise-drop-target-active, .is-hovered, .is-dragging").removeClass("rise-drop-target-active is-hovered is-dragging");

          var item = window.riseCurrentDraggedBlock;
          if (!item && e.originalEvent && e.originalEvent.dataTransfer) {
            var raw = e.originalEvent.dataTransfer.getData("application/json") || e.originalEvent.dataTransfer.getData("text/plain");
            if (raw) {
              try { item = JSON.parse(raw); } catch (err) {}
            }
          }

          if (item && item.content) {
            var $zone = $target.closest(".rise-canvas-drop-zone");
            var $block = $target.closest(".rise-canvas-block-wrapper");
            var dropIdx = "end";

            if ($zone.length && $zone.attr("data-drop-index") !== undefined) {
              dropIdx = $zone.attr("data-drop-index");
            } else if ($block.length && $block.attr("data-block-index") !== undefined) {
              dropIdx = parseInt($block.attr("data-block-index"), 10) + 1;
            }

            self.insertBlock(item.content, dropIdx);
          }
        }
      });
    };

    /**
     * Upload Image File to H5P/Moodle Server with instant DataURL fallback
     */
    self.uploadImageFile = function (file, callback) {
      if (!file) return;

      var reader = new FileReader();
      reader.onload = function (e) {
        var dataUrl = e.target.result;

        try {
          var ajaxUrl = (window.H5PEditor && typeof window.H5PEditor.getAjaxUrl === "function")
            ? window.H5PEditor.getAjaxUrl("files")
            : null;

          if (ajaxUrl) {
            var formData = new FormData();
            formData.append("file", file, file.name);
            formData.append("field", JSON.stringify({ name: "image", type: "image" }));
            formData.append("contentId", (window.H5PEditor && window.H5PEditor.contentId) || 0);

            var xhr = new XMLHttpRequest();
            xhr.open("POST", ajaxUrl, true);
            xhr.onload = function () {
              if (xhr.status >= 200 && xhr.status < 300) {
                try {
                  var response = JSON.parse(xhr.responseText);
                  if (response && response.path) {
                    var serverPath = response.path;
                    if (window.H5P && typeof window.H5P.getPath === "function") {
                      serverPath = window.H5P.getPath(response.path, (window.H5PEditor && window.H5PEditor.contentId) || 0);
                    }
                    callback(null, serverPath, dataUrl);
                    return;
                  }
                } catch (err) {}
              }
              callback(null, dataUrl, dataUrl);
            };
            xhr.onerror = function () {
              callback(null, dataUrl, dataUrl);
            };
            xhr.send(formData);
            return;
          }
        } catch (err) {}

        callback(null, dataUrl, dataUrl);
      };
      reader.readAsDataURL(file);
    };

    /**
     * Open Image Settings and Multi-Image Upload Modal
     */
    self.openImageEditor = function (opts) {
      opts = opts || {};
      var currentUrl = opts.currentUrl || "";
      var currentAlt = opts.currentAlt || "";
      var modalTitle = opts.title || "Edit & Upload Images";
      var initialImages = opts.images || [];
      if (initialImages.length === 0 && currentUrl) {
        initialImages.push({ url: currentUrl, caption: currentAlt });
      }

      var imagesList = JSON.parse(JSON.stringify(initialImages));
      var selectedLayout = opts.layout || (imagesList.length > 1 ? "carousel" : "single");

      $(".rise-image-modal-backdrop").remove();

      var $modal = $('<div class="rise-image-modal-backdrop">' +
        '<div class="rise-image-modal-dialog" style="max-width: 640px;">' +
          '<div class="rise-image-modal-header">' +
            '<div class="rise-image-modal-title">' +
              '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>' +
              '<span>' + modalTitle + '</span>' +
            '</div>' +
            '<button type="button" class="rise-image-modal-close" title="Close">✕</button>' +
          '</div>' +
          '<div class="rise-image-modal-body">' +
            '<div class="rise-image-upload-dropzone">' +
              '<svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>' +
              '<div style="font-weight: 800; font-size: 0.95rem; color: #0f172a;">Upload images from computer (Multiple allowed)</div>' +
              '<div style="font-size: 0.78rem; color: #64748b;">Select or drag & drop multiple image files</div>' +
              '<input type="file" class="rise-image-file-input" accept="image/jpeg,image/png,image/gif,image/webp,image/svg+xml" multiple style="display: none;">' +
              '<button type="button" class="rise-image-browse-btn">' +
                '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>' +
                '<span>Choose Image Files</span>' +
              '</button>' +
              '<div class="rise-image-upload-status" style="font-size: 0.75rem; font-weight: 700; color: #16a34a; display: none;"></div>' +
            '</div>' +
            '<div class="rise-image-modal-field">' +
              '<label>Or Add Web Image URL</label>' +
              '<div style="display: flex; gap: 8px;">' +
                '<input type="text" class="rise-image-url-input" placeholder="https://images.unsplash.com/..." style="flex: 1;">' +
                '<button type="button" class="rise-image-add-url-btn" style="background: #1e293b; color: #38bdf8; border: 1px solid #38bdf8; border-radius: 6px; padding: 0 12px; font-weight: 700; cursor: pointer;">+ Add</button>' +
              '</div>' +
            '</div>' +
            '<div class="rise-image-modal-field">' +
              '<div style="display: flex; justify-content: space-between; align-items: center;">' +
                '<label>Images & Slides List (' + imagesList.length + ')</label>' +
                '<div style="display: flex; align-items: center; gap: 6px; font-size: 0.78rem;">' +
                  '<span>Layout:</span>' +
                  '<select class="rise-image-layout-select" style="font-size: 0.78rem; border-radius: 4px; border: 1px solid #cbd5e1; padding: 2px 6px;">' +
                    '<option value="carousel" ' + (selectedLayout === "carousel" ? "selected" : "") + '>Slideshow Carousel</option>' +
                    '<option value="grid2" ' + (selectedLayout === "grid2" ? "selected" : "") + '>2-Column Grid</option>' +
                    '<option value="grid3" ' + (selectedLayout === "grid3" ? "selected" : "") + '>3-Column Grid</option>' +
                    '<option value="single" ' + (selectedLayout === "single" ? "selected" : "") + '>Single Image</option>' +
                  '</select>' +
                '</div>' +
              '</div>' +
              '<div class="rise-multi-images-tray"></div>' +
            '</div>' +
          '</div>' +
          '<div class="rise-image-modal-footer">' +
            '<button type="button" class="rise-image-modal-btn cancel">Cancel</button>' +
            '<button type="button" class="rise-image-modal-btn apply">Apply Images</button>' +
          '</div>' +
        '</div>' +
      '</div>');

      $("body").append($modal);

      var $fileInput = $modal.find(".rise-image-file-input");
      var $urlInput = $modal.find(".rise-image-url-input");
      var $status = $modal.find(".rise-image-upload-status");
      var $tray = $modal.find(".rise-multi-images-tray");
      var $layoutSelect = $modal.find(".rise-image-layout-select");

      function renderTray() {
        $tray.empty();
        $modal.find(".rise-image-modal-field label").first().text('Images & Slides List (' + imagesList.length + ')');
        if (imagesList.length === 0) {
          $tray.html('<div style="color: #94a3b8; text-align: center; padding: 18px; font-size: 0.8rem;">No images uploaded yet. Upload or paste URL above.</div>');
          return;
        }

        imagesList.forEach(function (imgItem, idx) {
          var $row = $('<div class="rise-multi-image-item" data-idx="' + idx + '">' +
            '<img src="' + imgItem.url + '" class="rise-multi-image-thumb" alt="Thumb">' +
            '<div class="rise-multi-image-inputs">' +
              '<input type="text" class="rise-slide-caption-input" placeholder="Slide caption / title..." value="' + (imgItem.caption || '') + '">' +
              '<div style="font-size: 0.7rem; color: #64748b; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 380px;">' + imgItem.url + '</div>' +
            '</div>' +
            '<button type="button" class="rise-multi-image-del-btn" title="Remove image">✕</button>' +
          '</div>');

          $row.find(".rise-slide-caption-input").on("input blur", function () {
            imagesList[idx].caption = $(this).val().trim();
          });

          $row.find(".rise-multi-image-del-btn").on("click", function () {
            imagesList.splice(idx, 1);
            renderTray();
          });

          $tray.append($row);
        });
      }

      renderTray();

      $modal.find(".rise-image-add-url-btn").on("click", function () {
        var url = $urlInput.val().trim();
        if (url) {
          imagesList.push({ url: url, caption: "New Slide " + (imagesList.length + 1) });
          $urlInput.val("");
          renderTray();
        }
      });

      $modal.find(".rise-image-browse-btn, .rise-image-upload-dropzone").on("click", function (e) {
        if (e.target !== $fileInput[0] && !$(e.target).hasClass("rise-image-browse-btn")) {
          $fileInput.trigger("click");
        }
      });

      $modal.find(".rise-image-browse-btn").on("click", function (e) {
        e.stopPropagation();
        $fileInput.trigger("click");
      });

      function handleMultipleFiles(files) {
        if (!files || !files.length) return;
        var total = files.length;
        var completed = 0;
        $status.text("Uploading " + total + " image(s)...").css("color", "#2563eb").show();

        Array.from(files).forEach(function (file, fIdx) {
          self.uploadImageFile(file, function (err, serverUrl, dataUrl) {
            completed++;
            var finalUrl = serverUrl || dataUrl;
            imagesList.push({
              url: finalUrl,
              caption: file.name.replace(/\.[^/.]+$/, "")
            });
            $status.text("Uploaded " + completed + " of " + total + " images...").css("color", "#16a34a").show();
            if (completed === total) {
              renderTray();
              setTimeout(function () { $status.fadeOut(); }, 2500);
            }
          });
        });
      }

      $fileInput.on("change", function () {
        handleMultipleFiles(this.files);
      });

      var $dropzone = $modal.find(".rise-image-upload-dropzone");
      $dropzone.on("dragover dragenter", function (e) {
        e.preventDefault();
        e.stopPropagation();
        $dropzone.addClass("is-dragover");
      }).on("dragleave drop", function (e) {
        e.preventDefault();
        e.stopPropagation();
        $dropzone.removeClass("is-dragover");
        if (e.type === "drop") {
          var dt = e.originalEvent.dataTransfer;
          if (dt && dt.files && dt.files.length) {
            handleMultipleFiles(dt.files);
          }
        }
      });

      $modal.find(".rise-image-modal-close, .rise-image-modal-btn.cancel").on("click", function () {
        $modal.fadeOut(150, function () { $(this).remove(); });
      });

      $modal.on("click", function (e) {
        if ($(e.target).hasClass("rise-image-modal-backdrop")) {
          $modal.fadeOut(150, function () { $(this).remove(); });
        }
      });

      $modal.find(".rise-image-modal-btn.apply").on("click", function () {
        if (imagesList.length === 0) {
          alert("Please upload or add at least one image.");
          return;
        }

        var layout = $layoutSelect.val();
        var primaryUrl = imagesList[0].url;
        var primaryAlt = imagesList[0].caption || "";

        if (opts.onApply) {
          opts.onApply(primaryUrl, primaryAlt, imagesList, layout);
        }
        $modal.fadeOut(150, function () { $(this).remove(); });
        self.showToast("Images applied successfully!");
      });
    };

    /**
     * Open Quiz Editor and Moodle Question Bank Importer Modal
     */
    self.openQuizEditor = function (opts) {
      opts = opts || {};
      var questionText = opts.question || "សំនួរត្រួតពិនិត្យការយល់ដឹង:";
      var categoryTag = opts.category || "Knowledge Check";
      var options = opts.options || [
        "A. JVM (Java Virtual Machine)",
        "B. Operating System Kernel ផ្ទាល់",
        "C. Web Browser JavaScript Engine"
      ];
      var correctIndex = opts.correctIndex !== undefined ? opts.correctIndex : 0;
      var explanation = opts.explanation || "JVM (Java Virtual Machine) គឺជាម៉ាស៊ីននិម្មិតដែលដំណើរការ Java Bytecode នៅលើគ្រប់ OS។";

      $(".rise-quiz-modal-backdrop").remove();

      var $modal = $('<div class="rise-quiz-modal-backdrop">' +
        '<div class="rise-quiz-modal-dialog">' +
          '<div class="rise-quiz-modal-header">' +
            '<div class="rise-quiz-modal-title">' +
              '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>' +
              '<span>Quiz & Moodle Question Bank Editor</span>' +
            '</div>' +
            '<button type="button" class="rise-image-modal-close" title="Close" style="background:transparent;border:none;color:#fff;font-size:16px;cursor:pointer;">✕</button>' +
          '</div>' +
          '<div class="rise-quiz-modal-tabs">' +
            '<button type="button" class="rise-quiz-tab-btn is-active" data-tab="builder">✏️ Question Builder</button>' +
            '<button type="button" class="rise-quiz-tab-btn" data-tab="moodle">📥 Import from Moodle (Aiken/GIFT)</button>' +
            '<button type="button" class="rise-quiz-tab-btn" data-tab="activity">🔗 Link Moodle Activity</button>' +
          '</div>' +
          '<div class="rise-quiz-modal-body">' +
            '<div class="rise-quiz-tab-content is-builder">' +
              '<div class="rise-quiz-field">' +
                '<label>Quiz Category / Tag</label>' +
                '<input type="text" class="rise-quiz-cat-input" value="' + categoryTag + '" placeholder="e.g. Knowledge Check, Quiz 1">' +
              '</div>' +
              '<div class="rise-quiz-field">' +
                '<label>Question Text</label>' +
                '<textarea class="rise-quiz-q-input" rows="3" placeholder="Enter your question here...">' + questionText + '</textarea>' +
              '</div>' +
              '<div class="rise-quiz-field">' +
                '<label>Answer Choices (Select radio button for Correct Answer)</label>' +
                '<div class="rise-quiz-option-builder-list"></div>' +
                '<button type="button" class="rise-quiz-add-opt-btn" style="background: #eff6ff; color: #2563eb; border: 1.5px dashed #3b82f6; border-radius: 6px; padding: 6px 12px; font-weight: 700; cursor: pointer; margin-top: 6px;">+ Add Choice</button>' +
              '</div>' +
              '<div class="rise-quiz-field">' +
                '<label>Explanation / Feedback Message</label>' +
                '<textarea class="rise-quiz-exp-input" rows="2" placeholder="Explanation shown after answering...">' + explanation + '</textarea>' +
              '</div>' +
            '</div>' +
            '<div class="rise-quiz-tab-content is-moodle" style="display: none;">' +
              '<div class="rise-quiz-field">' +
                '<label>Paste Moodle Question Bank Format (Aiken / GIFT Format)</label>' +
                '<textarea class="rise-moodle-import-input" rows="7" placeholder="What is JVM in Java?\nA. Java Virtual Machine\nB. Java Visual Machine\nC. Just Virtual Memory\nANSWER: A\nEXPLANATION: JVM is the engine that executes bytecode."></textarea>' +
                '<div style="font-size: 0.78rem; color: #64748b; margin-top: 4px;">Supports standard Moodle Question Bank export format (Aiken or GIFT).</div>' +
                '<button type="button" class="rise-moodle-convert-btn" style="background: #2563eb; color: #fff; border: none; border-radius: 6px; padding: 8px 16px; font-weight: 700; cursor: pointer; margin-top: 8px; width: fit-content;">📥 Convert to Quiz</button>' +
              '</div>' +
            '</div>' +
            '<div class="rise-quiz-tab-content is-activity" style="display: none;">' +
              '<div class="rise-quiz-field">' +
                '<label>Moodle Quiz Activity URL / ID</label>' +
                '<input type="text" class="rise-moodle-act-url" placeholder="/mod/quiz/view.php?id=123" value="/mod/quiz/view.php?id=1">' +
              '</div>' +
              '<div class="rise-quiz-field">' +
                '<label>Activity Title</label>' +
                '<input type="text" class="rise-moodle-act-title" value="ការប្រឡងតេស្តពិន្ទុ (Official Moodle Quiz)">' +
              '</div>' +
              '<div class="rise-quiz-field">' +
                '<label>Instructions</label>' +
                '<textarea class="rise-moodle-act-desc" rows="3">សូមចុចប៊ូតុងខាងក្រោមដើម្បីចូលរួមធ្វើតេស្តប្រឡងពិន្ទុផ្លូវការនៅក្នុងប្រព័ន្ធ Moodle Quiz។</textarea>' +
              '</div>' +
            '</div>' +
          '</div>' +
          '<div class="rise-quiz-modal-footer">' +
            '<button type="button" class="rise-image-modal-btn cancel">Cancel</button>' +
            '<button type="button" class="rise-image-modal-btn apply">Apply to Lesson</button>' +
          '</div>' +
        '</div>' +
      '</div>');

      $("body").append($modal);

      var $optList = $modal.find(".rise-quiz-option-builder-list");

      function renderOptions() {
        $optList.empty();
        options.forEach(function (opt, idx) {
          var isCorr = idx === correctIndex ? 'checked="checked"' : '';
          var $optRow = $('<div class="rise-quiz-option-builder-row">' +
            '<input type="radio" name="rise_correct_choice" value="' + idx + '" ' + isCorr + ' title="Mark as correct answer">' +
            '<input type="text" class="rise-opt-text-input" value="' + opt + '" placeholder="Choice text...">' +
            '<button type="button" class="rise-opt-del-btn" style="background:#fee2e2;color:#dc2626;border:none;border-radius:4px;padding:4px 8px;font-size:11px;cursor:pointer;">✕</button>' +
          '</div>');

          $optRow.find(".rise-opt-text-input").on("input", function () {
            options[idx] = $(this).val();
          });

          $optRow.find('input[type="radio"]').on("change", function () {
            correctIndex = idx;
          });

          $optRow.find(".rise-opt-del-btn").on("click", function () {
            if (options.length <= 2) {
              alert("Quiz must have at least 2 choices.");
              return;
            }
            options.splice(idx, 1);
            if (correctIndex >= options.length) correctIndex = 0;
            renderOptions();
          });

          $optList.append($optRow);
        });
      }

      renderOptions();

      $modal.find(".rise-quiz-add-opt-btn").on("click", function () {
        var letter = String.fromCharCode(65 + options.length);
        options.push(letter + ". New Choice");
        renderOptions();
      });

      // Tabs switching
      $modal.find(".rise-quiz-tab-btn").on("click", function () {
        var tab = $(this).data("tab");
        $modal.find(".rise-quiz-tab-btn").removeClass("is-active");
        $(this).addClass("is-active");
        $modal.find(".rise-quiz-tab-content").hide();
        $modal.find(".rise-quiz-tab-content.is-" + tab).show();
      });

      // Moodle Aiken / GIFT Importer
      $modal.find(".rise-moodle-convert-btn").on("click", function () {
        var rawText = $modal.find(".rise-moodle-import-input").val().trim();
        if (!rawText) {
          alert("Please paste questions in Aiken or GIFT format.");
          return;
        }

        var lines = rawText.split("\n").map(function (l) { return l.trim(); }).filter(function (l) { return l.length > 0; });
        var parsedQ = "";
        var parsedOpts = [];
        var parsedAnsLetter = "A";
        var parsedExp = "";

        lines.forEach(function (line) {
          if (line.match(/^ANSWER:\s*([A-Z])/i)) {
            parsedAnsLetter = line.match(/^ANSWER:\s*([A-Z])/i)[1].toUpperCase();
          } else if (line.match(/^EXPLANATION:\s*(.*)/i) || line.match(/^FEEDBACK:\s*(.*)/i)) {
            parsedExp = line.replace(/^(EXPLANATION|FEEDBACK):\s*/i, "");
          } else if (line.match(/^[A-Z][\.\)]\s*(.*)/)) {
            parsedOpts.push(line);
          } else if (!parsedQ) {
            parsedQ = line;
          }
        });

        if (parsedQ && parsedOpts.length >= 2) {
          questionText = parsedQ;
          options = parsedOpts;
          correctIndex = Math.max(0, parsedAnsLetter.charCodeAt(0) - 65);
          if (parsedExp) explanation = parsedExp;

          $modal.find(".rise-quiz-q-input").val(questionText);
          $modal.find(".rise-quiz-exp-input").val(explanation);
          renderOptions();

          // Switch back to builder tab
          $modal.find('.rise-quiz-tab-btn[data-tab="builder"]').trigger("click");
          self.showToast("Moodle question imported successfully!");
        } else {
          alert("Could not parse question. Ensure format has question, choices (A., B., C.), and 'ANSWER: X'.");
        }
      });

      $modal.find(".rise-image-modal-close, .rise-image-modal-btn.cancel").on("click", function () {
        $modal.fadeOut(150, function () { $(this).remove(); });
      });

      $modal.find(".rise-image-modal-btn.apply").on("click", function () {
        var activeTab = $modal.find(".rise-quiz-tab-btn.is-active").data("tab");

        if (activeTab === "activity") {
          var actUrl = $modal.find(".rise-moodle-act-url").val().trim() || "/mod/quiz/view.php?id=1";
          var actTitle = $modal.find(".rise-moodle-act-title").val().trim() || "Official Moodle Quiz";
          var actDesc = $modal.find(".rise-moodle-act-desc").val().trim() || "Click below to attempt quiz.";

          if (opts.onApply) {
            opts.onApply({
              isActivity: true,
              url: actUrl,
              title: actTitle,
              desc: actDesc
            });
          }
        } else {
          var finalCat = $modal.find(".rise-quiz-cat-input").val().trim() || "Knowledge Check";
          var finalQ = $modal.find(".rise-quiz-q-input").val().trim() || "Question";
          var finalExp = $modal.find(".rise-quiz-exp-input").val().trim();

          if (opts.onApply) {
            opts.onApply({
              isActivity: false,
              category: finalCat,
              question: finalQ,
              options: options,
              correctIndex: correctIndex,
              explanation: finalExp
            });
          }
        }

        $modal.fadeOut(150, function () { $(this).remove(); });
        self.showToast("Quiz updated successfully!");
      });
    };

    /**
     * Open Real Student Preview Modal with Device Switcher & H5P.RiseCourse attachment
     */
    self.openRealPreviewModal = function () {
      $(".rise-real-preview-backdrop").remove();

      var $modal = $('<div class="rise-real-preview-backdrop">' +
        '<div class="rise-preview-top-toolbar">' +
          '<div class="rise-preview-toolbar-title">' +
            '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>' +
            '<span>Student Interactive Preview</span>' +
          '</div>' +
          '<div class="rise-preview-device-switcher">' +
            '<button type="button" class="rise-device-btn is-active" data-device="desktop">' +
              '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>' +
              '<span>Desktop</span>' +
            '</button>' +
            '<button type="button" class="rise-device-btn" data-device="tablet">' +
              '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>' +
              '<span>Tablet</span>' +
            '</button>' +
            '<button type="button" class="rise-device-btn" data-device="mobile">' +
              '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>' +
              '<span>Mobile</span>' +
            '</button>' +
          '</div>' +
          '<button type="button" class="rise-preview-close-btn" title="Exit Preview Mode">' +
            '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>' +
            '<span>Close Preview</span>' +
          '</button>' +
        '</div>' +
        '<div class="rise-preview-viewport-frame device-desktop">' +
          '<div class="rise-preview-h5p-mount"></div>' +
        '</div>' +
      '</div>');

      $("body").append($modal);

      var $frame = $modal.find(".rise-preview-viewport-frame");
      var $mount = $modal.find(".rise-preview-h5p-mount");

      // Device switcher handling
      $modal.find(".rise-device-btn").on("click", function () {
        var device = $(this).data("device");
        $modal.find(".rise-device-btn").removeClass("is-active");
        $(this).addClass("is-active");
        $frame.removeClass("device-desktop device-tablet device-mobile").addClass("device-" + device);
        $(window).trigger("resize");
      });

      // Close handling
      function closeModal() {
        $modal.fadeOut(150, function () { $(this).remove(); });
      }

      $modal.find(".rise-preview-close-btn").on("click", closeModal);

      // Keyboard Esc to exit
      $(document).on("keydown.risePreviewModal", function (e) {
        if (e.key === "Escape" || e.keyCode === 27) {
          closeModal();
          $(document).off("keydown.risePreviewModal");
        }
      });

      // Instantiate H5P.RiseCourse
      try {
        var paramsClone = JSON.parse(JSON.stringify(self.getParams()));
        var contentId = (window.H5PEditor && window.H5PEditor.contentId) || 0;

        if (window.H5P && typeof window.H5P.RiseCourse === "function") {
          var risePlayer = new window.H5P.RiseCourse(paramsClone, contentId);
          risePlayer.attach($mount);
        } else {
          $mount.html('<div style="padding: 60px 20px; text-align: center; color: #64748b; font-family: sans-serif;">' +
            '<div style="font-size: 1.2rem; font-weight: 700; color: #0f172a; margin-bottom: 8px;">Preview Unavailable</div>' +
            '<p>H5P.RiseCourse player library is initializing...</p>' +
          '</div>');
        }
      } catch (err) {
        console.error("Error rendering real preview modal:", err);
        $mount.html('<div style="padding: 40px; color: #ef4444; font-family: sans-serif;">Error initializing preview: ' + err.message + '</div>');
      }
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
    window.riseStudioInstance = window.riseStudioInstance || new RiseBlockToolbox();
    window.riseStudioInstance.init(widgetInstance);
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
