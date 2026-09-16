/**
 * Articulate Rise Block Library & Drag-and-Drop Toolbox for H5P Editor
 * Clean, professional, pure SVG UI without emoji icons.
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

  function RiseBlockToolbox() {
    var self = this;

    self.blocks = [
      // 1. Text & Headings
      {
        category: "Text & Headers",
        catSvg: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h16M4 12h16M4 18h7"/></svg>',
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
            content: '<p style="font-size: 1.1rem; line-height: 1.75; color: #334155; margin: 16px 0;">សូមបញ្ចូលខ្លឹមសារមេរៀននៅទីនេះ។ អ្នកអាចសរសេរអក្សរដិត <em>ទ្រេត</em> ឬបន្ថែមតំណភ្ជាប់ (links) បានយ៉ាងងាយស្រួល។</p>'
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
        catSvg: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>',
        items: [
          {
            id: "callout_note",
            name: "Note Callout (Blue)",
            badge: "Note",
            desc: "Key takeaway info box",
            iconSvg: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>',
            previewHtml: '<div style="background: #eff6ff; border-left: 4px solid #3b82f6; padding: 6px 8px; border-radius: 4px; font-size: 11px; color: #1e3a8a;"><strong>ចំណាំ:</strong> គន្លឹះសំខាន់ក្នុងដំណើរការអនុវត្តជាក់ស្តែង។</div>',
            content: '<div class="rise-callout rise-callout-info"><div><strong>ចំណាំសំខាន់ (Key Note):</strong> សូមចងចាំចំណុចនេះ ពីព្រោះវាជាគន្លឹះសំខាន់ក្នុងដំណើរការអនុវត្តជាក់ស្តែង។</div></div>'
          },
          {
            id: "callout_warning",
            name: "Warning Callout (Amber)",
            badge: "Warning",
            desc: "Caution and alert card",
            iconSvg: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
            previewHtml: '<div style="background: #fffbeb; border-left: 4px solid #f59e0b; padding: 6px 8px; border-radius: 4px; font-size: 11px; color: #92400e;"><strong>ប្រយ័ត្ន:</strong> ត្រូវកំណត់ JAVA_HOME ឱ្យបានត្រឹមត្រូវ។</div>',
            content: '<div class="rise-callout-warning"><strong>ការប្រុងប្រយ័ត្ន (Warning):</strong> សូមប្រាកដថាអ្នកបានកំណត់ Path Environment Variable ត្រឹមត្រូវ មុននឹងចាប់ផ្តើមដំណើរការ Compile កូដ។</div>'
          },
          {
            id: "callout_success",
            name: "Success / Tip (Green)",
            badge: "Tip",
            desc: "Best practice pro tip",
            iconSvg: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',
            previewHtml: '<div style="background: #f0fdf4; border-left: 4px solid #10b981; padding: 6px 8px; border-radius: 4px; font-size: 11px; color: #065f46;"><strong>គន្លឹះល្អ:</strong> ប្រើប្រាស់ Shortcut Keys ដើម្បីបង្កើនល្បឿន។</div>',
            content: '<div class="rise-callout-success"><strong>គន្លឹះល្អ (Pro Tip):</strong> ការប្រើប្រាស់ IDE Shortcuts នឹងជួយបង្កើនល្បឿនក្នុងការសរសេរ និង Format កូដរបស់អ្នកបានលឿនជាងមុនទ្វេដង។</div>'
          },
          {
            id: "stat_big_number",
            name: "Big Stat / Metric",
            badge: "Stats",
            desc: "3-Column metric showcase",
            iconSvg: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>',
            previewHtml: '<div style="display: flex; gap: 4px; text-align: center;"><div style="background: #f1f5f9; padding: 4px; border-radius: 4px; flex: 1;"><div style="font-weight: 800; color: #2563eb; font-size: 12px;">100%</div><div style="font-size: 8px;">JVM</div></div><div style="background: #f1f5f9; padding: 4px; border-radius: 4px; flex: 1;"><div style="font-weight: 800; color: #2563eb; font-size: 12px;">3B+</div><div style="font-size: 8px;">Devices</div></div></div>',
            content: '<div class="rise-stat-grid"><div class="rise-stat-card"><div class="rise-stat-number">100%</div><div class="rise-stat-label">Cross-Platform (JVM)</div></div><div class="rise-stat-card"><div class="rise-stat-number">3B+</div><div class="rise-stat-label">Devices Running Java</div></div><div class="rise-stat-card"><div class="rise-stat-number">#1</div><div class="rise-stat-label">Enterprise Backend Choice</div></div></div>'
          }
        ]
      },
      // 3. Lists & Steps
      {
        category: "Lists & Steps",
        catSvg: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="10" y1="6" x2="21" y2="6"/><line x1="10" y1="12" x2="21" y2="12"/><line x1="10" y1="18" x2="21" y2="18"/><path d="M4 6h1v4M4 10h2M6 18H4c0-1 2-2 2-3s-1-1.5-2-1"/></svg>',
        items: [
          {
            id: "numbered_list",
            name: "Numbered List",
            badge: "Steps",
            desc: "Gradient number badges",
            iconSvg: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="10" y1="6" x2="21" y2="6"/><line x1="10" y1="12" x2="21" y2="12"/><line x1="10" y1="18" x2="21" y2="18"/><path d="M4 6h1v4M4 10h2M6 18H4c0-1 2-2 2-3s-1-1.5-2-1"/></svg>',
            previewHtml: '<div style="font-size: 11px; display: flex; flex-direction: column; gap: 4px;"><div style="display: flex; gap: 6px; align-items: center;"><span style="background: #2563eb; color: #fff; border-radius: 50%; width: 16px; height: 16px; display: inline-flex; align-items: center; justify-content: center; font-size: 9px; font-weight: 700;">1</span><span>ជំហានទី១: ដំឡើង JDK</span></div><div style="display: flex; gap: 6px; align-items: center;"><span style="background: #2563eb; color: #fff; border-radius: 50%; width: 16px; height: 16px; display: inline-flex; align-items: center; justify-content: center; font-size: 9px; font-weight: 700;">2</span><span>ជំហានទី២: បង្កើតគម្រោងថ្មី</span></div></div>',
            content: '<ol class="rise-numbered-list"><li>ជំហានទី១: ដំឡើង JDK និងផ្ទៀងផ្ទាត់ Environment Variables</li><li>ជំហានទី២: បង្កើតគម្រោងថ្មីនៅក្នុង Code Editor</li><li>ជំហានទី៣: សរសេរកូដ និងដំណើរការកម្មវិធី (Run & Debug)</li></ol>'
          },
          {
            id: "bullet_list",
            name: "Bullet List",
            badge: "Bullets",
            desc: "Glowing pill dot badges",
            iconSvg: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><circle cx="4" cy="6" r="1"/><circle cx="4" cy="12" r="1"/><circle cx="4" cy="18" r="1"/></svg>',
            previewHtml: '<div style="font-size: 11px; display: flex; flex-direction: column; gap: 4px;"><div style="display: flex; gap: 6px; align-items: center;"><span style="background: #3b82f6; width: 6px; height: 6px; border-radius: 50%;"></span><span>ភាសាកូដ Java មានលក្ខណៈ OOP</span></div><div style="display: flex; gap: 6px; align-items: center;"><span style="background: #3b82f6; width: 6px; height: 6px; border-radius: 50%;"></span><span>ដំណើរការបានលើគ្រប់ OS</span></div></div>',
            content: '<ul class="rise-bullet-list"><li>ចំណុចសំខាន់ទី១: ភាសាកូដ Java មានលក្ខណៈ Object-Oriented</li><li>ចំណុចសំខាន់ទី២: អាចដំណើរការបានលើគ្រប់ OS (Write Once, Run Anywhere)</li><li>ចំណុចសំខាន់ទី៣: មាន Class Libraries និង Community ធំទូលាយ</li></ul>'
          },
          {
            id: "check_list",
            name: "Checkmark List",
            badge: "Checklist",
            desc: "Green check task cards",
            iconSvg: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>',
            previewHtml: '<div style="font-size: 11px; display: flex; flex-direction: column; gap: 4px;"><div style="display: flex; gap: 6px; align-items: center;"><span style="color: #16a34a; font-weight: bold;">✓</span><span>បានអានពាក្យបច្ចេកទេស JDK</span></div><div style="display: flex; gap: 6px; align-items: center;"><span style="color: #16a34a; font-weight: bold;">✓</span><span>បានដំឡើង IntelliJ IDEA</span></div></div>',
            content: '<ul class="rise-check-list"><li>បានអាន និងយល់ច្បាស់អំពីពាក្យបច្ចេកទេស JDK, JRE, JVM</li><li>បានដំឡើងកម្មវិធី IntelliJ IDEA ឬ VS Code រួចរាល់</li><li>បានសរសេរកូដ Java ដំបូង និង Compile ជោគជ័យ</li></ul>'
          },
          {
            id: "timeline_stepper",
            name: "Timeline / Stepper",
            badge: "Timeline",
            desc: "Connected milestone line",
            iconSvg: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
            previewHtml: '<div style="border-left: 2px solid #2563eb; padding-left: 8px; font-size: 10px;"><div style="color: #2563eb; font-weight: bold;">ដំណាក់កាលទី១: Setup</div><div style="color: #64748b;">ដំឡើងបរិស្ថានកូដ</div></div>',
            content: '<div class="rise-timeline"><div class="rise-timeline-item"><div class="rise-timeline-dot"></div><div class="rise-timeline-title">ដំណាក់កាលទី១: Setup Environment</div><div class="rise-timeline-desc">ដំឡើង JDK និងផ្ទៀងផ្ទាត់ Path ដើម្បីឱ្យប្រព័ន្ធស្គាល់ javac និង java command។</div></div><div class="rise-timeline-item"><div class="rise-timeline-dot"></div><div class="rise-timeline-title">ដំណាក់កាលទី២: សរសេរ និង Compile កូដ</div><div class="rise-timeline-desc">បង្កើត Class Main.java និងធ្វើការ Compile ទៅជា .class bytecode តាមរយៈ javac។</div></div><div class="rise-timeline-item"><div class="rise-timeline-dot"></div><div class="rise-timeline-title">ដំណាក់កាលទី៣: ដំណើរការលើ JVM</div><div class="rise-timeline-desc">ដំណើរការកម្មវិធីដោយប្រើ java Main និងពិនិត្យលទ្ធផលក្នុង Console។</div></div></div>'
          }
        ]
      },
      // 4. Media & Galleries
      {
        category: "Media & Galleries",
        catSvg: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>',
        items: [
          {
            id: "image_slider_preview",
            name: "Image Slider",
            badge: "Slider",
            desc: "Clean full-bleed showcase",
            iconSvg: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>',
            previewHtml: '<div style="border-radius: 6px; overflow: hidden; position: relative;"><img src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=400&q=80" style="width: 100%; height: 60px; object-fit: cover;"><div style="position: absolute; bottom: 0; left: 0; right: 0; background: rgba(0,0,0,0.6); color: #fff; padding: 2px 6px; font-size: 9px;">Image Showcase Slider</div></div>',
            content: '<div class="rise-image-hero"><img src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80" alt="Slider Image"><div class="rise-image-hero-caption"><strong>Image Showcase & Slider</strong> — បង្ហាញស្លាយរូបភាព និង Diagram ស្ថាបត្យកម្មប្រព័ន្ធ</div></div>'
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
            badge: "Grid",
            desc: "Triple photo card showcase",
            iconSvg: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="5" height="18" rx="1"/><rect x="9.5" y="3" width="5" height="18" rx="1"/><rect x="17" y="3" width="5" height="18" rx="1"/></svg>',
            previewHtml: '<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 3px;"><div style="background: #cbd5e1; height: 35px; border-radius: 3px;"></div><div style="background: #94a3b8; height: 35px; border-radius: 3px;"></div><div style="background: #64748b; height: 35px; border-radius: 3px;"></div></div>',
            content: '<div class="rise-image-grid-3"><div class="rise-image-card"><img src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80" alt="Card 1"><div class="rise-image-card-caption"><strong>1. IntelliJ IDEA</strong><br>IDE សម័យទំនើប</div></div><div class="rise-image-card"><img src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80" alt="Card 2"><div class="rise-image-card-caption"><strong>2. Java JVM</strong><br>Bytecode Engine</div></div><div class="rise-image-card"><img src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&q=80" alt="Card 3"><div class="rise-image-card-caption"><strong>3. Clean Code</strong><br>ស្ថាបត្យកម្មកូដ</div></div></div>'
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
      // 5. Interactive & Code
      {
        category: "Interactive & Code",
        catSvg: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',
        items: [
          {
            id: "flip_flashcards",
            name: "3D Flip Cards",
            badge: "Cards",
            desc: "Word on front, definition on back",
            iconSvg: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="16" height="14" rx="2"/><path d="M6 3h14a2 2 0 0 1 2 2v12"/></svg>',
            previewHtml: '<div style="display: flex; gap: 4px;"><div style="background: #2563eb; color: #fff; padding: 10px 4px; border-radius: 4px; flex: 1; text-align: center; font-size: 10px; font-weight: bold;">JDK</div><div style="background: #0284c7; color: #fff; padding: 10px 4px; border-radius: 4px; flex: 1; text-align: center; font-size: 10px; font-weight: bold;">JRE</div><div style="background: #4f46e5; color: #fff; padding: 10px 4px; border-radius: 4px; flex: 1; text-align: center; font-size: 10px; font-weight: bold;">JVM</div></div>',
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
            desc: "Mac dots and Copy button",
            iconSvg: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',
            previewHtml: '<div style="background: #0f172a; border-radius: 4px; padding: 4px 6px; color: #38bdf8; font-family: monospace; font-size: 9px;"><span style="color: #f43f5e;">●</span> <span style="color: #f59e0b;">●</span> <span style="color: #10b981;">●</span><br>System.out.println("Hello");</div>',
            content: '<pre class="rise-code-block" data-lang="java"><code>public class HelloWorld {\n    public static void main(String[] args) {\n        System.out.println("ស្វាគមន៍មកកាន់ភាសា Java!");\n    }\n}</code></pre>'
          }
        ]
      },
      // 6. Knowledge Check & Quiz
      {
        category: "Knowledge Checks",
        catSvg: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',
        items: [
          {
            id: "quick_quiz_card",
            name: "Knowledge Check Card",
            badge: "Quiz",
            desc: "Instant check answer and feedback",
            iconSvg: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
            previewHtml: '<div style="border: 1px solid #3b82f6; border-radius: 6px; padding: 6px; font-size: 10px;"><div style="color: #2563eb; font-weight: bold;">Question Check:</div><div>○ JDK &nbsp; ● JVM &nbsp; ○ JRE</div></div>',
            content: '<div class="rise-quiz-card"><span class="rise-quiz-badge">Knowledge Check</span><div class="rise-quiz-question">តើឧបករណ៍មួយណាដែលទទួលខុសត្រូវក្នុងការដំណើរការ Java Bytecode ទៅជា Machine Code?</div><div class="rise-quiz-option" data-correct="false">A. JDK (Java Development Kit)</div><div class="rise-quiz-option" data-correct="true">B. JVM (Java Virtual Machine)</div><div class="rise-quiz-option" data-correct="false">C. JRE (Java Runtime Environment)</div><div class="rise-quiz-feedback" style="display: none;"></div><button type="button" class="rise-quiz-check-btn">ផ្ទៀងផ្ទាត់ចម្លើយ (Check Answer)</button></div>'
          }
        ]
      }
    ];

    self.init = function () {
      self.ensureStyles(document);
      try {
        if (window.parent && window.parent.document && window.parent.document !== document) {
          self.ensureStyles(window.parent.document);
        }
      } catch (e) {}

      self.renderDock();
      self.setupDragAndDrop();
    };

    /**
     * Inject Full CSS Stylesheet into Target Document
     */
    self.ensureStyles = function (targetDoc) {
      if (!targetDoc || targetDoc.getElementById("rise-toolbox-full-styles")) return;
      var style = targetDoc.createElement("style");
      style.id = "rise-toolbox-full-styles";
      style.textContent = `
        .rise-toolbox-dock {
          position: fixed !important;
          left: 0 !important;
          top: 0 !important;
          bottom: 0 !important;
          width: 320px !important;
          background: #0f172a !important;
          color: #f8fafc !important;
          z-index: 2147483640 !important;
          box-shadow: 4px 0 24px rgba(0, 0, 0, 0.5) !important;
          display: flex !important;
          flex-direction: column !important;
          transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1) !important;
          box-sizing: border-box !important;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif !important;
          user-select: none !important;
        }
        .rise-toolbox-dock.is-collapsed {
          transform: translateX(-320px) !important;
        }
        .rise-toolbox-toggle-btn {
          position: absolute !important;
          top: 160px !important;
          left: 320px !important;
          background: linear-gradient(135deg, #2563eb, #3b82f6) !important;
          color: #ffffff !important;
          border: 1px solid rgba(255, 255, 255, 0.35) !important;
          border-left: none !important;
          border-radius: 0 10px 10px 0 !important;
          padding: 12px 14px !important;
          cursor: pointer !important;
          display: flex !important;
          align-items: center !important;
          gap: 8px !important;
          font-size: 0.85rem !important;
          font-weight: 800 !important;
          letter-spacing: 0.05em !important;
          box-shadow: 4px 4px 18px rgba(0, 0, 0, 0.4) !important;
          transition: all 0.2s ease !important;
          z-index: 2147483645 !important;
          outline: none !important;
        }
        .rise-toolbox-dock.is-collapsed .rise-toolbox-toggle-btn {
          left: 320px !important;
          background: linear-gradient(135deg, #1d4ed8, #3b82f6) !important;
          color: #ffffff !important;
        }
        .rise-toolbox-toggle-btn:hover {
          background: #1d4ed8 !important;
          color: #ffffff !important;
          transform: scale(1.04) !important;
        }
        .rise-toolbox-header {
          padding: 18px 16px 14px 16px !important;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1) !important;
          display: flex !important;
          flex-direction: column !important;
          gap: 12px !important;
          background: #0b1120 !important;
        }
        .rise-toolbox-title-row {
          display: flex !important;
          align-items: center !important;
          justify-content: space-between !important;
        }
        .rise-toolbox-title {
          font-size: 0.95rem !important;
          font-weight: 800 !important;
          color: #ffffff !important;
          letter-spacing: 0.05em !important;
          text-transform: uppercase !important;
          display: flex !important;
          align-items: center !important;
          gap: 8px !important;
        }
        .rise-toolbox-badge {
          background: rgba(59, 130, 246, 0.25) !important;
          color: #60a5fa !important;
          border: 1px solid rgba(96, 165, 250, 0.4) !important;
          font-size: 0.7rem !important;
          padding: 3px 8px !important;
          border-radius: 12px !important;
          font-weight: 700 !important;
        }
        .rise-toolbox-search-wrapper {
          position: relative !important;
        }
        .rise-toolbox-search-input {
          width: 100% !important;
          background: #1e293b !important;
          border: 1px solid rgba(255, 255, 255, 0.15) !important;
          border-radius: 8px !important;
          padding: 9px 12px 9px 34px !important;
          color: #ffffff !important;
          font-size: 0.85rem !important;
          outline: none !important;
          box-sizing: border-box !important;
          transition: all 0.2s ease !important;
        }
        .rise-toolbox-search-input:focus {
          border-color: #3b82f6 !important;
          background: #1e293b !important;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.25) !important;
        }
        .rise-toolbox-search-icon {
          position: absolute !important;
          left: 10px !important;
          top: 50% !important;
          transform: translateY(-50%) !important;
          color: #94a3b8 !important;
          pointer-events: none !important;
        }
        .rise-toolbox-body {
          flex: 1 !important;
          overflow-y: auto !important;
          padding: 14px 12px !important;
          display: flex !important;
          flex-direction: column !important;
          gap: 16px !important;
        }
        .rise-toolbox-category {
          display: flex !important;
          flex-direction: column !important;
          gap: 8px !important;
        }
        .rise-toolbox-category-title {
          font-size: 0.725rem !important;
          font-weight: 800 !important;
          color: #94a3b8 !important;
          letter-spacing: 0.06em !important;
          text-transform: uppercase !important;
          padding-left: 4px !important;
          display: flex !important;
          align-items: center !important;
          gap: 6px !important;
        }
        .rise-toolbox-grid {
          display: grid !important;
          grid-template-columns: repeat(2, 1fr) !important;
          gap: 8px !important;
        }
        .rise-toolbox-block-card {
          background: #1e293b !important;
          border: 1px solid rgba(255, 255, 255, 0.1) !important;
          border-radius: 10px !important;
          padding: 10px 8px !important;
          display: flex !important;
          flex-direction: column !important;
          align-items: center !important;
          justify-content: center !important;
          text-align: center !important;
          gap: 6px !important;
          cursor: grab !important;
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1) !important;
          position: relative !important;
          box-sizing: border-box !important;
        }
        .rise-toolbox-block-card:hover {
          background: #273549 !important;
          border-color: #38bdf8 !important;
          transform: translateY(-2px) !important;
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.35) !important;
        }
        .rise-toolbox-block-card:active {
          cursor: grabbing !important;
          transform: scale(0.96) !important;
        }
        .rise-toolbox-block-icon {
          width: 32px !important;
          height: 32px !important;
          border-radius: 8px !important;
          background: rgba(59, 130, 246, 0.15) !important;
          color: #60a5fa !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          flex-shrink: 0 !important;
          transition: all 0.2s ease !important;
        }
        .rise-toolbox-block-card:hover .rise-toolbox-block-icon {
          background: #3b82f6 !important;
          color: #ffffff !important;
        }
        .rise-toolbox-block-name {
          font-size: 0.75rem !important;
          font-weight: 700 !important;
          color: #e2e8f0 !important;
          line-height: 1.25 !important;
        }
        .rise-toolbox-block-tag {
          font-size: 0.625rem !important;
          font-weight: 700 !important;
          color: #94a3b8 !important;
          text-transform: uppercase !important;
          letter-spacing: 0.04em !important;
        }
        .rise-toolbox-block-card.is-dragging {
          opacity: 0.4 !important;
          border: 1.5px dashed #38bdf8 !important;
        }
        .rise-drop-target-active {
          outline: 2px dashed #3b82f6 !important;
          outline-offset: 4px !important;
          background: rgba(59, 130, 246, 0.08) !important;
        }
        .rise-live-preview-tooltip {
          position: fixed !important;
          left: 330px !important;
          width: 340px !important;
          background: #0b1120 !important;
          border: 1px solid rgba(56, 189, 248, 0.4) !important;
          border-radius: 12px !important;
          padding: 14px !important;
          box-shadow: 0 16px 36px rgba(0, 0, 0, 0.6) !important;
          z-index: 2147483646 !important;
          pointer-events: none !important;
          display: flex !important;
          flex-direction: column !important;
          gap: 10px !important;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif !important;
          animation: riseTooltipFade 0.2s ease !important;
        }
        @keyframes riseTooltipFade {
          from { opacity: 0; transform: translateX(-8px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .rise-tooltip-header {
          display: flex !important;
          align-items: center !important;
          justify-content: space-between !important;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1) !important;
          padding-bottom: 6px !important;
        }
        .rise-tooltip-title {
          font-size: 0.85rem !important;
          font-weight: 800 !important;
          color: #ffffff !important;
        }
        .rise-tooltip-badge {
          font-size: 0.65rem !important;
          background: #1e3a8a !important;
          color: #93c5fd !important;
          padding: 2px 6px !important;
          border-radius: 4px !important;
          font-weight: 700 !important;
          text-transform: uppercase !important;
        }
        .rise-tooltip-preview-frame {
          background: #ffffff !important;
          color: #1e293b !important;
          border-radius: 8px !important;
          padding: 10px !important;
          max-height: 180px !important;
          overflow: hidden !important;
          font-size: 0.75rem !important;
          box-shadow: inset 0 2px 6px rgba(0,0,0,0.1) !important;
          line-height: 1.4 !important;
        }
        .rise-tooltip-preview-frame * {
          max-width: 100% !important;
          box-sizing: border-box !important;
        }
        .rise-tooltip-preview-frame img {
          height: 60px !important;
          width: 100% !important;
          object-fit: cover !important;
          border-radius: 4px !important;
        }
        .rise-tooltip-hint {
          font-size: 0.7rem !important;
          color: #38bdf8 !important;
          font-weight: 700 !important;
          text-align: center !important;
        }
        .field-name-content > .h5peditor-copypaste-wrap,
        .field-name-lessons .h5peditor-copypaste-wrap,
        .field-name-sections .h5peditor-copypaste-wrap,
        .h5p-editor-column .h5peditor-copypaste-wrap,
        .field-name-text .h5peditor-copypaste-wrap,
        .field-name-params .h5peditor-copypaste-wrap {
          display: none !important;
        }
      `;
      targetDoc.head.appendChild(style);
    };

    /**
     * Render Left Sidebar Toolbox Dock
     */
    self.renderDock = function () {
      var targetDoc = document;
      try {
        if (window.parent && window.parent.document && window.parent.document.body) {
          targetDoc = window.parent.document;
        }
      } catch (e) {
        targetDoc = document;
      }

      var $target = $(targetDoc.body || document.body);
      if ($target.find(".rise-toolbox-dock").length > 0) return;

      var $dock = $('<aside class="rise-toolbox-dock is-collapsed">' +
        '<button type="button" class="rise-toolbox-toggle-btn" title="Toggle Rise Block Library">' +
          '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>' +
          '<span>BLOCKS</span>' +
        '</button>' +
        '<div class="rise-toolbox-header">' +
          '<div class="rise-toolbox-title-row">' +
            '<div class="rise-toolbox-title">' +
              '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="2.5"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>' +
              'Rise Blocks' +
            '</div>' +
            '<span class="rise-toolbox-badge">Drag & Drop</span>' +
          '</div>' +
          '<div class="rise-toolbox-search-wrapper">' +
            '<svg class="rise-toolbox-search-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>' +
            '<input type="text" class="rise-toolbox-search-input" placeholder="Search components...">' +
          '</div>' +
        '</div>' +
        '<div class="rise-toolbox-body"></div>' +
      '</aside>');

      var $body = $dock.find(".rise-toolbox-body");

      // Shared live preview tooltip element
      var $previewTooltip = $('<div class="rise-live-preview-tooltip" style="display: none;"></div>');
      $target.append($previewTooltip);

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

          // Hover Live Preview Tooltip
          $card.on("mouseenter", function () {
            var offset = $card.offset();
            var topPos = Math.max(10, Math.min(offset.top - 20, $(window).height() - 240));
            $previewTooltip.html(
              '<div class="rise-tooltip-header">' +
                '<span class="rise-tooltip-title">' + item.name + '</span>' +
                '<span class="rise-tooltip-badge">' + (item.badge || "PREVIEW") + '</span>' +
              '</div>' +
              '<div class="rise-tooltip-preview-frame">' + item.previewHtml + '</div>' +
              '<div class="rise-tooltip-hint">Click or Drag to insert instantly</div>'
            ).css({ top: topPos + "px" }).stop(true, true).fadeIn(150);
          }).on("mouseleave", function () {
            $previewTooltip.stop(true, true).fadeOut(100);
          });

          // Click to insert directly
          $card.on("click", function (e) {
            e.preventDefault();
            $previewTooltip.hide();
            self.insertBlockContent(item.content);
          });

          // Drag Start
          $card.on("dragstart", function (e) {
            $previewTooltip.hide();
            $(this).addClass("is-dragging");
            var dt = e.originalEvent.dataTransfer;
            dt.effectAllowed = "copy";
            dt.setData("text/plain", JSON.stringify(item));
          }).on("dragend", function () {
            $(this).removeClass("is-dragging");
            $(".rise-drop-target-active").removeClass("rise-drop-target-active");
          });

          $grid.append($card);
        });

        $body.append($cat);
      });

      // Toggle drawer action
      $dock.find(".rise-toolbox-toggle-btn").on("click", function () {
        $dock.toggleClass("is-collapsed");
        $previewTooltip.hide();
      });

      // Search filter
      $dock.find(".rise-toolbox-search-input").on("input", function () {
        var query = $(this).val().toLowerCase().trim();
        $dock.find(".rise-toolbox-block-card").each(function () {
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

      $target.append($dock);
    };

    /**
     * Setup HTML5 Drag & Drop Zones across H5P Editor
     */
    self.setupDragAndDrop = function () {
      var eventTargets = [document];
      try {
        if (window.parent && window.parent.document && window.parent.document !== document) {
          eventTargets.push(window.parent.document);
        }
      } catch (e) {}

      eventTargets.forEach(function (doc) {
        $(doc).on("dragover", ".h5p-editor-column, .field-name-content, .h5peditor-ckeditor-container, .h5p-list-instances, [contenteditable='true']", function (e) {
          e.preventDefault();
          e.originalEvent.dataTransfer.dropEffect = "copy";
          $(this).addClass("rise-drop-target-active");
        });

        $(doc).on("dragleave", ".h5p-editor-column, .field-name-content, .h5peditor-ckeditor-container, .h5p-list-instances, [contenteditable='true']", function () {
          $(this).removeClass("rise-drop-target-active");
        });

        $(doc).on("drop", ".h5p-editor-column, .field-name-content, .h5peditor-ckeditor-container, .h5p-list-instances, [contenteditable='true']", function (e) {
          e.preventDefault();
          var $zone = $(this);
          $zone.removeClass("rise-drop-target-active");

          var rawData = e.originalEvent.dataTransfer.getData("text/plain");
          if (!rawData) return;

          try {
            var item = JSON.parse(rawData);
            if (item.content) {
              self.insertBlockContent(item.content, $zone);
            }
          } catch (err) {
            console.error("Drop error:", err);
          }
        });
      });
    };

    /**
     * Insert Block Content into active CKEditor or targeted Column container
     */
    self.insertBlockContent = function (contentHtml, $target) {
      var inserted = false;

      var checkInstances = [];
      try {
        if (window.CKEDITOR && window.CKEDITOR.instances) {
          for (var k in window.CKEDITOR.instances) checkInstances.push(window.CKEDITOR.instances[k]);
        }
        if (window.parent && window.parent.CKEDITOR && window.parent.CKEDITOR.instances) {
          for (var kp in window.parent.CKEDITOR.instances) checkInstances.push(window.parent.CKEDITOR.instances[kp]);
        }
      } catch (e) {}

      var activeInstance = null;
      for (var i = 0; i < checkInstances.length; i++) {
        if (checkInstances[i].focusManager && checkInstances[i].focusManager.hasFocus) {
          activeInstance = checkInstances[i];
          break;
        }
      }
      if (!activeInstance && checkInstances.length > 0) {
        activeInstance = checkInstances[0];
      }

      if (activeInstance) {
        activeInstance.insertHtml(contentHtml);
        inserted = true;
      }

      if (!inserted) {
        var $addBtn = $(".h5p-editor-column button, .field-name-content button.h5p-add-file, .field-name-content .h5p-add-author").first();
        if ($addBtn.length) {
          $addBtn.trigger("click");
          setTimeout(function () {
            self.insertBlockContent(contentHtml);
          }, 300);
        }
      }

      self.showToast("Block inserted! Click text to edit.");
    };

    /**
     * Display a floating feedback toast
     */
    self.showToast = function (msg) {
      var targetDoc = document;
      try {
        if (window.parent && window.parent.document && window.parent.document.body) {
          targetDoc = window.parent.document;
        }
      } catch (e) {}

      var $toast = $('<div style="position: fixed; bottom: 28px; right: 28px; background: #0b1120; color: #38bdf8; border: 1.5px solid #38bdf8; padding: 12px 24px; border-radius: 10px; font-weight: 800; font-size: 0.9rem; z-index: 2147483647; box-shadow: 0 10px 30px rgba(0,0,0,0.5); font-family: sans-serif;">' + msg + '</div>');
      $(targetDoc.body || document.body).append($toast);
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
    RiseBlockToolboxWidget.initDock();
  };

  RiseBlockToolboxWidget.prototype.createFieldMarkup = function () {
    return '<div class="rise-toolbox-widget-status" style="padding: 10px 14px; background: #f0fdf4; border: 1px solid #86efac; border-radius: 8px; color: #166534; font-size: 13px; margin: 10px 0; display: flex; align-items: center; gap: 8px;">' +
      '<span><strong>Articulate Rise Blocks Active</strong> — Drag blocks from the left drawer into your lesson.</span>' +
      '</div>';
  };

  RiseBlockToolboxWidget.prototype.validate = function () {
    return true;
  };

  RiseBlockToolboxWidget.prototype.remove = function () {};

  RiseBlockToolboxWidget.initDock = function () {
    fixCoreTranslations();
    var $jq = window.H5PEditor && window.H5PEditor.$ ? window.H5PEditor.$ : (window.H5P && window.H5P.jQuery ? window.H5P.jQuery : (window.jQuery || window.$));
    if (!$jq) return;
    if ($jq(".rise-toolbox-dock").length > 0) return;
    var toolbox = new RiseBlockToolbox();
    toolbox.init();
  };

  H5PEditor.widgets.riseBlockToolbox = H5PEditor.RiseBlockToolbox = RiseBlockToolboxWidget;

  if (typeof $ !== "undefined" && $) {
    $(function () {
      RiseBlockToolboxWidget.initDock();
      setTimeout(RiseBlockToolboxWidget.initDock, 300);
      setTimeout(RiseBlockToolboxWidget.initDock, 800);
      setTimeout(RiseBlockToolboxWidget.initDock, 1500);
      setTimeout(RiseBlockToolboxWidget.initDock, 3000);
    });
  } else {
    setTimeout(function () {
      RiseBlockToolboxWidget.initDock();
    }, 500);
  }

})(window.H5PEditor && window.H5PEditor.$ ? window.H5PEditor.$ : (window.H5P && window.H5P.jQuery ? window.H5P.jQuery : (window.jQuery || window.$)));
