/**
 * Articulate Rise Block Library & Drag-and-Drop Toolbox for H5P Editor
 */
(function ($) {
  "use strict";

  var H5PEditor = window.H5PEditor = window.H5PEditor || {};

  function RiseBlockToolbox() {
    var self = this;

    self.blocks = [
      // 1. Text & Headings
      {
        category: "Text & Headers",
        icon: "📝",
        items: [
          {
            id: "heading_hero",
            name: "Lesson Header",
            desc: "Category tag, main title & description",
            type: "html",
            iconSvg: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h16M4 12h16M4 18h7"/></svg>',
            content: '<div class="rise-header-block"><div class="rise-category-tag">Overview</div><h2 class="rise-main-title">ចំណងជើងមេរៀន (Lesson Title)</h2><p class="rise-main-desc">ការពិពណ៌នាសង្ខេបអំពីខ្លឹមសារមេរៀន និងចំណុចសំខាន់ៗដែលត្រូវសិក្សា...</p></div>'
          },
          {
            id: "text_paragraph",
            name: "Rich Paragraph",
            desc: "Clean styled body text",
            type: "html",
            iconSvg: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="21" y1="6" x2="3" y2="6"/><line x1="15" y1="12" x2="3" y2="12"/><line x1="17" y1="18" x2="3" y2="18"/></svg>',
            content: '<p style="font-size: 1.1rem; line-height: 1.75; color: #334155; margin: 16px 0;">សូមបញ្ចូលខ្លឹមសារមេរៀននៅទីនេះ។ អ្នកអាចសរសេរអក្សរដិត <em>ទ្រេត</em> ឬបន្ថែមតំណភ្ជាប់ (links) បានយ៉ាងងាយស្រួល។</p>'
          },
          {
            id: "callout_note",
            name: "Callout Note",
            desc: "Key takeaway / Note box",
            type: "html",
            iconSvg: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>',
            content: '<div class="rise-callout rise-callout-info"><div><strong>ចំណាំសំខាន់ (Key Note):</strong> សូមចងចាំចំណុចនេះ ពីព្រោះវាជាគន្លឹះសំខាន់ក្នុងដំណើរការអនុវត្តជាក់ស្តែង។</div></div>'
          }
        ]
      },
      // 2. Lists & Steps
      {
        category: "Lists & Steps",
        icon: "🔢",
        items: [
          {
            id: "numbered_list",
            name: "Numbered List",
            desc: "Gradient number badges",
            type: "html",
            iconSvg: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="10" y1="6" x2="21" y2="6"/><line x1="10" y1="12" x2="21" y2="12"/><line x1="10" y1="18" x2="21" y2="18"/><path d="M4 6h1v4M4 10h2M6 18H4c0-1 2-2 2-3s-1-1.5-2-1"/></svg>',
            content: '<ol class="rise-numbered-list"><li>ជំហានទី១: ដំឡើង JDK និងផ្ទៀងផ្ទាត់ Environment Variables</li><li>ជំហានទី២: បង្កើតគម្រោងថ្មីនៅក្នុង Code Editor</li><li>ជំហានទី៣: សរសេរកូដ និងដំណើរការកម្មវិធី (Run & Debug)</li></ol>'
          },
          {
            id: "bullet_list",
            name: "Bullet List",
            desc: "Glowing pill dot badges",
            type: "html",
            iconSvg: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><circle cx="4" cy="6" r="1"/><circle cx="4" cy="12" r="1"/><circle cx="4" cy="18" r="1"/></svg>',
            content: '<ul class="rise-bullet-list"><li>ចំណុចសំខាន់ទី១: ភាសាកូដ Java មានលក្ខណៈ Object-Oriented</li><li>ចំណុចសំខាន់ទី២: អាចដំណើរការបានលើគ្រប់ OS (Write Once, Run Anywhere)</li><li>ចំណុចសំខាន់ទី៣: មាន Class Libraries និង Community ធំទូលាយ</li></ul>'
          },
          {
            id: "check_list",
            name: "Checkmark List",
            desc: "Green check task cards",
            type: "html",
            iconSvg: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>',
            content: '<ul class="rise-check-list"><li>បានអាន និងយល់ច្បាស់អំពីពាក្យបច្ចេកទេស JDK, JRE, JVM</li><li>បានដំឡើងកម្មវិធី IntelliJ IDEA ឬ VS Code រួចរាល់</li><li>បានសរសេរកូដ Java ដំបូង និង Compile ជោគជ័យ</li></ul>'
          }
        ]
      },
      // 3. Media & Galleries
      {
        category: "Media & Galleries",
        icon: "🖼️",
        items: [
          {
            id: "image_slider_studio",
            name: "Image Slider",
            desc: "Select style & preview before insert",
            type: "modal_gallery",
            iconSvg: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>'
          },
          {
            id: "grid_gallery_2",
            name: "2-Column Grid",
            desc: "Side-by-side card gallery",
            type: "html",
            iconSvg: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="18" rx="1"/><rect x="14" y="3" width="7" height="18" rx="1"/></svg>',
            content: '<div class="rise-image-grid-2"><div class="rise-image-card"><img src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80" alt="Editor"><div class="rise-image-card-caption"><strong>1. Code Editor & IDE</strong><br>បរិស្ថានសម្រាប់សរសេរកូដ</div></div><div class="rise-image-card"><img src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80" alt="Java"><div class="rise-image-card-caption"><strong>2. Java Architecture</strong><br>ដំណើរការលើ JVM</div></div></div>'
          },
          {
            id: "hero_banner",
            name: "Hero Banner",
            desc: "Wide image with bottom overlay",
            type: "html",
            iconSvg: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="5" width="20" height="14" rx="2"/><polyline points="2 15 8 9 15 16 19 12 22 15"/></svg>',
            content: '<div class="rise-image-hero"><img src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1400&q=80" alt="Banner"><div class="rise-image-hero-caption">រូបភាព Hero Banner បង្ហាញពីស្ថាបត្យកម្មប្រព័ន្ធ និងរចនាសម្ព័ន្ធកូដ</div></div>'
          },
          {
            id: "video_lecture",
            name: "Video Card",
            desc: "YouTube/Video with header",
            type: "html",
            iconSvg: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>',
            content: '<div class="rise-video-card"><div class="rise-video-header"><div class="rise-section-label">Video Lecture</div><h3 class="rise-section-heading">ការណែនាំភាសា Java និងដំណើរការ Installation</h3></div><div class="rise-video-wrapper"><iframe src="https://www.youtube.com/embed/eIrMbAQSU34" allowfullscreen></iframe></div><div class="rise-video-caption">វីដេអូបង្រៀនលម្អិតអំពី Java Ecosystem និងការសរសេរកូដជំហានដំបូង។</div></div>'
          }
        ]
      },
      // 4. Interactive & Code
      {
        category: "Interactive & Code",
        icon: "💡",
        items: [
          {
            id: "flip_flashcards",
            name: "3D Flip Cards",
            desc: "Word on front, definition on back",
            type: "html",
            iconSvg: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="16" height="14" rx="2"/><path d="M6 3h14a2 2 0 0 1 2 2v12"/></svg>',
            content: '<div class="rise-flashcard-grid"><div class="rise-flip-card"><div class="rise-flip-card-inner"><div class="rise-flip-card-front"><div class="rise-flip-word">JDK</div></div><div class="rise-flip-card-back"><div class="rise-flip-definition"><strong>JDK (Java Development Kit)</strong><br>កញ្ចប់ឧបករណ៍ពេញលេញសម្រាប់ Developer សរសេរ និង compile កូដ Java។</div></div></div></div><div class="rise-flip-card"><div class="rise-flip-card-inner"><div class="rise-flip-card-front"><div class="rise-flip-word">JRE</div></div><div class="rise-flip-card-back"><div class="rise-flip-definition"><strong>JRE (Java Runtime Environment)</strong><br>បរិស្ថានសម្រាប់ដំណើរការកម្មវិធី Java សម្រាប់ End-user។</div></div></div></div><div class="rise-flip-card"><div class="rise-flip-card-inner"><div class="rise-flip-card-front"><div class="rise-flip-word">JVM</div></div><div class="rise-flip-card-back"><div class="rise-flip-definition"><strong>JVM (Java Virtual Machine)</strong><br>ម៉ាស៊ីននិម្មិតដែលដំណើរការ Java Bytecode នៅលើគ្រប់ OS។</div></div></div></div></div>'
          },
          {
            id: "code_window",
            name: "Code Window",
            desc: "Mac dots & Copy button",
            type: "html",
            iconSvg: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',
            content: '<pre class="rise-code-block" data-lang="java"><code>public class HelloWorld {\n    public static void main(String[] args) {\n        System.out.println("ស្វាគមន៍មកកាន់ភាសា Java!");\n    }\n}</code></pre>'
          }
        ]
      }
    ];

    self.init = function () {
      if ($(".rise-toolbox-dock").length > 0) return;
      self.renderDock();
      self.setupDragAndDrop();
      self.renderGalleryStudioModal();
    };

    /**
     * Render Left Sidebar Toolbox Dock
     */
    self.renderDock = function () {
      var $dock = $('<aside class="rise-toolbox-dock">' +
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

      self.blocks.forEach(function (cat) {
        var $cat = $('<div class="rise-toolbox-category">' +
          '<div class="rise-toolbox-category-title">' + cat.icon + ' ' + cat.category + '</div>' +
          '<div class="rise-toolbox-grid"></div>' +
        '</div>');

        var $grid = $cat.find(".rise-toolbox-grid");

        cat.items.forEach(function (item) {
          var $card = $('<div class="rise-toolbox-block-card" draggable="true" data-block-id="' + item.id + '">' +
            '<div class="rise-toolbox-block-icon">' + item.iconSvg + '</div>' +
            '<div class="rise-toolbox-block-name">' + item.name + '</div>' +
          '</div>');

          // Store item data
          $card.data("blockData", item);

          // Click to insert or open modal
          $card.on("click", function (e) {
            e.preventDefault();
            if (item.type === "modal_gallery") {
              self.openGalleryStudioModal();
            } else {
              self.insertBlockContent(item.content);
            }
          });

          // Drag Start
          $card.on("dragstart", function (e) {
            $(this).addClass("is-dragging");
            var dt = e.originalEvent.dataTransfer;
            dt.effectAllowed = "copy";
            dt.setData("text/plain", JSON.stringify(item));
          }).on("dragend", function () {
            $(this).removeClass("is-dragging");
            $(".rise-drop-target-active").removeClass("rise-drop-target-active");
            $(".rise-drop-indicator").remove();
          });

          $grid.append($card);
        });

        $body.append($cat);
      });

      // Toggle drawer action
      $dock.find(".rise-toolbox-toggle-btn").on("click", function () {
        $dock.toggleClass("is-collapsed");
      });

      // Search filter
      $dock.find(".rise-toolbox-search-input").on("input", function () {
        var query = $(this).val().toLowerCase().trim();
        $dock.find(".rise-toolbox-block-card").each(function () {
          var $c = $(this);
          var name = $c.find(".rise-toolbox-block-name").text().toLowerCase();
          if (name.indexOf(query) !== -1 || query === "") {
            $c.show();
          } else {
            $c.hide();
          }
        });
      });

      $("body").append($dock);
    };

    /**
     * Setup HTML5 Drag & Drop Zones across H5P Editor
     */
    self.setupDragAndDrop = function () {
      $(document).on("dragover", ".h5p-editor-column, .field-name-content, .h5peditor-ckeditor-container, .h5p-list-instances", function (e) {
        e.preventDefault();
        e.originalEvent.dataTransfer.dropEffect = "copy";
        $(this).addClass("rise-drop-target-active");
      });

      $(document).on("dragleave", ".h5p-editor-column, .field-name-content, .h5peditor-ckeditor-container, .h5p-list-instances", function () {
        $(this).removeClass("rise-drop-target-active");
      });

      $(document).on("drop", ".h5p-editor-column, .field-name-content, .h5peditor-ckeditor-container, .h5p-list-instances", function (e) {
        e.preventDefault();
        var $zone = $(this);
        $zone.removeClass("rise-drop-target-active");

        var rawData = e.originalEvent.dataTransfer.getData("text/plain");
        if (!rawData) return;

        try {
          var item = JSON.parse(rawData);
          if (item.type === "modal_gallery") {
            self.openGalleryStudioModal();
          } else if (item.content) {
            self.insertBlockContent(item.content, $zone);
          }
        } catch (err) {
          console.error("Drop error:", err);
        }
      });
    };

    /**
     * Insert Block Content into active CKEditor or targeted Column container
     */
    self.insertBlockContent = function (contentHtml, $target) {
      // 1. Try to insert into active or last CKEditor
      var inserted = false;
      if (window.CKEDITOR && CKEDITOR.instances) {
        var activeInstance = null;
        for (var name in CKEDITOR.instances) {
          if (CKEDITOR.instances[name].focusManager && CKEDITOR.instances[name].focusManager.hasFocus) {
            activeInstance = CKEDITOR.instances[name];
            break;
          }
        }
        // Fallback to first visible instance
        if (!activeInstance) {
          for (var name in CKEDITOR.instances) {
            activeInstance = CKEDITOR.instances[name];
            break;
          }
        }
        if (activeInstance) {
          activeInstance.insertHtml(contentHtml);
          inserted = true;
        }
      }

      // 2. If no active CKEditor, try clicking "Add" button in targeted column list and insert
      if (!inserted) {
        var $addBtn = $(".h5p-editor-column button, .field-name-content button.h5p-add-file, .field-name-content .h5p-add-author").first();
        if ($addBtn.length) {
          $addBtn.trigger("click");
          setTimeout(function () {
            self.insertBlockContent(contentHtml);
          }, 300);
        }
      }

      // Visual success notification
      self.showToast("Block added successfully! ✓");
    };

    /**
     * Render Gallery & Slider Studio Modal
     */
    self.renderGalleryStudioModal = function () {
      var $modalOverlay = $('<div class="rise-gallery-studio-overlay" style="display: none;">' +
        '<div class="rise-gallery-studio-modal">' +
          '<div class="rise-gallery-studio-header">' +
            '<div class="rise-gallery-studio-title">🖼️ Articulate Rise Gallery Studio</div>' +
            '<button type="button" class="rise-gallery-studio-close-btn">&times;</button>' +
          '</div>' +
          '<div class="rise-gallery-studio-body">' +
            '<div class="rise-studio-form-row">' +
              '<label class="rise-studio-form-label">Choose Gallery Style (Live Preview):</label>' +
              '<div class="rise-studio-style-grid">' +
                '<div class="rise-studio-style-card is-selected" data-style="rise-cinema">' +
                  '<div class="rise-studio-preview-thumb" style="background-image: url(https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80); background-color: #0f172a;"></div>' +
                  '<div class="rise-studio-style-name">Cinematic Glass Dock</div>' +
                  '<div class="rise-studio-style-desc">Dark frame, floating glass buttons & glowing blue pill dock.</div>' +
                '</div>' +
                '<div class="rise-studio-style-card" data-style="rise-card">' +
                  '<div class="rise-studio-preview-thumb" style="background-image: url(https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80); background-color: #ffffff;"></div>' +
                  '<div class="rise-studio-style-name">Clean Minimalist Card</div>' +
                  '<div class="rise-studio-style-desc">Light card, soft shadow & crisp inset controls.</div>' +
                '</div>' +
                '<div class="rise-studio-style-card" data-style="rise-fullwidth">' +
                  '<div class="rise-studio-preview-thumb" style="background-image: url(https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&q=80); background-color: #020617;"></div>' +
                  '<div class="rise-studio-style-name">Full-Bleed Showcase</div>' +
                  '<div class="rise-studio-style-desc">Edge-to-edge frame with glass overlay badges.</div>' +
                '</div>' +
              '</div>' +
            '</div>' +
            '<div class="rise-studio-form-row">' +
              '<label class="rise-studio-form-label">Gallery Title / Heading (Optional):</label>' +
              '<input type="text" class="rise-studio-form-input rise-gallery-title-input" placeholder="ឧទាហរណ៍: រូបភាពបង្ហាញពីស្ថាបត្យកម្មប្រព័ន្ធ (Architecture Showcase)" value="រូបភាព និង Diagram សំខាន់ៗ">' +
            '</div>' +
            '<div class="rise-studio-form-row">' +
              '<label class="rise-studio-form-label">Sample Image 1 URL:</label>' +
              '<input type="text" class="rise-studio-form-input rise-gallery-img1-input" value="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80">' +
            '</div>' +
            '<div class="rise-studio-form-row">' +
              '<label class="rise-studio-form-label">Sample Image 2 URL:</label>' +
              '<input type="text" class="rise-studio-form-input rise-gallery-img2-input" value="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80">' +
            '</div>' +
          '</div>' +
          '<div class="rise-gallery-studio-footer">' +
            '<button type="button" class="rise-studio-cancel-btn">Cancel</button>' +
            '<button type="button" class="rise-studio-insert-btn">Insert Gallery Block</button>' +
          '</div>' +
        '</div>' +
      '</div>');

      // Style card selection
      $modalOverlay.find(".rise-studio-style-card").on("click", function () {
        $modalOverlay.find(".rise-studio-style-card").removeClass("is-selected");
        $(this).addClass("is-selected");
      });

      // Close actions
      $modalOverlay.find(".rise-gallery-studio-close-btn, .rise-studio-cancel-btn").on("click", function () {
        $modalOverlay.fadeOut(200);
      });

      // Insert Action
      $modalOverlay.find(".rise-studio-insert-btn").on("click", function () {
        var style = $modalOverlay.find(".rise-studio-style-card.is-selected").attr("data-style") || "rise-cinema";
        var title = $modalOverlay.find(".rise-gallery-title-input").val().trim();
        var img1 = $modalOverlay.find(".rise-gallery-img1-input").val().trim();
        var img2 = $modalOverlay.find(".rise-gallery-img2-input").val().trim();

        var generatedHtml = '<div class="rise-header-block" style="margin-top: 28px;">' +
          '<div class="rise-category-tag">Gallery Showcase</div>' +
          '<h2 class="rise-main-title">' + (title || "Image Gallery") + '</h2>' +
          '</div>' +
          '<div class="rise-image-grid-2">' +
            '<div class="rise-image-card"><img src="' + img1 + '" alt="Gallery Image 1"><div class="rise-image-card-caption"><strong>1. Code Editor & Setup</strong><br>បរិស្ថានសម្រាប់សរសេរកូដ Java</div></div>' +
            '<div class="rise-image-card"><img src="' + img2 + '" alt="Gallery Image 2"><div class="rise-image-card-caption"><strong>2. Java Architecture</strong><br>ដំណើរការលើ JVM Cross-Platform</div></div>' +
          '</div>';

        self.insertBlockContent(generatedHtml);
        $modalOverlay.fadeOut(200);
      });

      $("body").append($modalOverlay);
      self.$modalOverlay = $modalOverlay;
    };

    /**
     * Open Gallery Studio Modal
     */
    self.openGalleryStudioModal = function () {
      if (self.$modalOverlay) {
        self.$modalOverlay.fadeIn(200);
      }
    };

    /**
     * Display a floating feedback toast
     */
    self.showToast = function (msg) {
      var $toast = $('<div style="position: fixed; bottom: 24px; right: 24px; background: #0f172a; color: #38bdf8; border: 1px solid #38bdf8; padding: 12px 20px; border-radius: 8px; font-weight: 700; z-index: 10070; box-shadow: 0 4px 20px rgba(0,0,0,0.3); animation: riseModalPop 0.25s ease;">' + msg + '</div>');
      $("body").append($toast);
      setTimeout(function () {
        $toast.fadeOut(300, function () { $(this).remove(); });
      }, 2500);
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
      '<span>✨ <strong>Articulate Rise Block Toolbox Active</strong> (Click or drag blocks from the left drawer)</span>' +
      '</div>';
  };

  RiseBlockToolboxWidget.prototype.validate = function () {
    return true;
  };

  RiseBlockToolboxWidget.prototype.remove = function () {};

  RiseBlockToolboxWidget.initDock = function () {
    var $jq = window.H5PEditor && window.H5PEditor.$ ? window.H5PEditor.$ : (window.H5P && window.H5P.jQuery ? window.H5P.jQuery : (window.jQuery || window.$));
    if (!$jq) return;
    if ($jq(".rise-toolbox-dock").length > 0) return;
    var toolbox = new RiseBlockToolbox();
    toolbox.init();
  };

  H5PEditor.widgets.riseBlockToolbox = H5PEditor.RiseBlockToolbox = RiseBlockToolboxWidget;

  // Auto-initialize when DOM / H5PEditor is ready with multiple staggered intervals
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

