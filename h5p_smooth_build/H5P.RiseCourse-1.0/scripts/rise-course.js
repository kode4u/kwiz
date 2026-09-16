var H5P = window.H5P = window.H5P || {};

// Global Polyfill for H5P.Components in Moodle and standalone environments
H5P.Components = H5P.Components || {};
if (!H5P.Components.Button) {
  H5P.Components.Button = function (opts) {
    opts = opts || {};
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'h5p-theme-button ' + (opts.classes || '') + (opts.styleType ? ' h5p-theme-' + opts.styleType : ' h5p-theme-primary');
    if (opts.disabled) {
      btn.disabled = true;
      btn.setAttribute('aria-disabled', 'true');
    }
    if (opts.tabIndex !== undefined) {
      btn.setAttribute('tabindex', opts.tabIndex);
    }
    if (opts.label) {
      btn.innerHTML = '<span class="h5p-theme-label">' + opts.label + '</span>';
      btn.setAttribute('aria-label', opts.label);
    }
    if (opts.icon) {
      btn.classList.add('h5p-theme-icon-' + opts.icon);
    }
    if (opts.onClick) {
      btn.addEventListener('click', opts.onClick);
    }
    return btn;
  };
}

if (!H5P.Components.Navigation) {
  H5P.Components.Navigation = function (opts) {
    opts = opts || {};
    var nav = document.createElement('div');
    nav.className = 'h5p-theme-navigation h5p-navigation ' + (opts.variant ? 'h5p-theme-' + opts.variant : '');

    var prevText = (opts.texts && opts.texts.previousButton) || (opts.texts && opts.texts.prevButton) || 'Previous';
    var nextText = (opts.texts && opts.texts.nextButton) || 'Next';
    var lastText = (opts.texts && opts.texts.lastButton) || 'Show Results';

    var prevBtn = document.createElement('button');
    prevBtn.type = 'button';
    prevBtn.className = 'h5p-theme-nav-button h5p-theme-previous';
    prevBtn.setAttribute('aria-label', (opts.texts && opts.texts.previousButtonAria) || prevText);
    prevBtn.innerHTML = '<span class="h5p-theme-label">' + prevText + '</span>';
    if (opts.handlePrevious || opts.handlePrev) {
      prevBtn.addEventListener('click', opts.handlePrevious || opts.handlePrev);
    }
    nav.appendChild(prevBtn);

    var nextBtn = document.createElement('button');
    nextBtn.type = 'button';
    nextBtn.className = 'h5p-theme-nav-button h5p-theme-next';
    nextBtn.setAttribute('aria-label', (opts.texts && opts.texts.nextButtonAria) || nextText);
    nextBtn.innerHTML = '<span class="h5p-theme-label">' + nextText + '</span>';
    if (opts.handleNext) {
      nextBtn.addEventListener('click', opts.handleNext);
    }
    nav.appendChild(nextBtn);

    if (opts.handleLast) {
      var lastBtn = document.createElement('button');
      lastBtn.type = 'button';
      lastBtn.className = 'h5p-theme-nav-button h5p-show-results';
      lastBtn.setAttribute('aria-label', lastText);
      lastBtn.innerHTML = '<span class="h5p-theme-label">' + lastText + '</span>';
      lastBtn.addEventListener('click', opts.handleLast);
      nav.appendChild(lastBtn);
    }

    var currentIndex = opts.index || 0;
    var navLength = opts.navigationLength || 1;

    nav.setCurrentIndex = function (idx) {
      currentIndex = idx;
      if (currentIndex <= 0) {
        prevBtn.classList.add('h5p-theme-disabled');
        prevBtn.disabled = true;
      } else {
        prevBtn.classList.remove('h5p-theme-disabled');
        prevBtn.disabled = false;
      }
      if (currentIndex >= navLength - 1) {
        nextBtn.classList.add('h5p-theme-disabled');
        nextBtn.disabled = true;
      } else {
        nextBtn.classList.remove('h5p-theme-disabled');
        nextBtn.disabled = false;
      }
    };
    nav.setDisabled = function (disabled) {
      prevBtn.disabled = disabled;
      nextBtn.disabled = disabled;
    };
    nav.setCurrentIndex(currentIndex);

    return nav;
  };
}

if (!H5P.Components.ResultScreen) {
  H5P.Components.ResultScreen = function (opts) {
    opts = opts || {};
    var div = document.createElement('div');
    div.className = 'h5p-theme-result-screen';
    var header = document.createElement('div');
    header.className = 'h5p-theme-result-header';
    header.textContent = opts.header || opts.scoreHeader || '';
    div.appendChild(header);
    return div;
  };
}

if (!H5P.Components.PlaceholderImg) {
  H5P.Components.PlaceholderImg = function (cls) {
    var div = document.createElement('div');
    div.className = 'h5p-placeholder-img ' + (cls || '');
    return div;
  };
}

if (!H5P.Components.Draggable) {
  H5P.Components.Draggable = function (opts) {
    opts = opts || {};
    var div = document.createElement('div');
    div.className = 'h5p-drag-draggable ' + (opts.hasHandle ? 'h5p-has-handle' : '');
    div.textContent = opts.label || '';
    return div;
  };
}

if (!H5P.Components.Dropzone) {
  H5P.Components.Dropzone = function (opts) {
    opts = opts || {};
    var div = document.createElement('div');
    div.className = 'h5p-drag-dropzone';
    div.setAttribute('aria-label', opts.ariaLabel || '');
    var inner = document.createElement('div');
    div.appendChild(inner);
    return div;
  };
}

H5P.RiseCourse = (function ($, EventDispatcher) {
  "use strict";

  /**
   * Articulate Rise Course Architecture for H5P
   */
  function RiseCourse(params, contentId, contentData) {
    var self = this;
    EventDispatcher.call(self);

    self.params = $.extend(true, {
      courseMeta: {
        title: "មេរៀនទី១ ការណែនាំអំពីភាសាJava",
        authorName: "",
        authorAvatarText: "",
        coverImageUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1600&q=80",
        description: "<p>នៅក្នុងមេរៀននេះ យើងនឹងសិក្សាអំពីចំណុចសំខាន់ៗមួយចំនួនដូចជា៖</p><ul><li>ភាសាកូដ Java</li><li>ពាក្យបច្ចេកទេស Syntax, Compiler, Interpreter, JVM, JRE, JDK</li><li>ដំណើរការ នៃការសរសេរកូដ Java</li><li>លក្ខណៈរបស់ភាសា Java</li></ul>",
        showCover: true,
        startButtonText: "START COURSE",
        exitButtonText: "EXIT COURSE"
      },
      sections: []
    }, params);

    self.contentId = contentId;
    self.currentLessonIndex = 0;
    self.completedLessons = {};
    self.isSidebarOpen = true;

    /**
     * Decode HTML entities safely so &amp; renders as &
     */
    self.decodeHtml = function (str) {
      if (!str || typeof str !== "string") return str || "";
      var txt = document.createElement("textarea");
      txt.innerHTML = str;
      var val = txt.value;
      if (val && (val.indexOf("&amp;") !== -1 || val.indexOf("&lt;") !== -1 || val.indexOf("&gt;") !== -1 || val.indexOf("&quot;") !== -1 || val.indexOf("&#") !== -1)) {
        txt.innerHTML = val;
        val = txt.value;
      }
      return val;
    };

    // Flatten lessons for easy indexed navigation
    self.lessons = [];
    if (self.params.sections && self.params.sections.length > 0) {
      self.params.sections.forEach(function (sec, sIdx) {
        if (sec.lessons && sec.lessons.length > 0) {
          sec.lessons.forEach(function (les, lIdx) {
            self.lessons.push({
              globalIndex: self.lessons.length,
              sectionIndex: sIdx,
              sectionTitle: self.decodeHtml(sec.sectionTitle) || ("Section " + (sIdx + 1)),
              lessonIndex: lIdx,
              title: self.decodeHtml(les.title) || ("Lesson " + (lIdx + 1)),
              iconType: les.iconType || "overview",
              content: les.content,
              nextButtonText: self.decodeHtml(les.nextButtonText) || "បន្ទាប់",
              instance: null,
              $wrapper: null
            });
          });
        }
      });
    }

    /**
     * Attach Rise Course to Container
     */
    self.attach = function ($container) {
      self.$container = $container;
      $container.addClass("h5p-rise-course-root");

      // Build DOM Structure
      self.buildDOM();

      if (self.params.courseMeta && self.params.courseMeta.showCover) {
        self.showCoverPage();
      } else {
        self.showLesson(0);
      }

      // Setup MutationObserver to continuously enhance any dynamically rendered elements
      if (window.MutationObserver && self.$container && self.$container[0]) {
        var enhanceTimer = null;
        var observer = new MutationObserver(function (mutations) {
          var shouldEnhance = false;
          for (var i = 0; i < mutations.length; i++) {
            if (mutations[i].addedNodes && mutations[i].addedNodes.length > 0) {
              for (var j = 0; j < mutations[i].addedNodes.length; j++) {
                var node = mutations[i].addedNodes[j];
                if (node.nodeType === 1 && !node.classList.contains("rise-number-badge") && !node.classList.contains("rise-bullet-badge")) {
                  shouldEnhance = true;
                  break;
                }
              }
            }
            if (shouldEnhance) break;
          }
          if (shouldEnhance) {
            clearTimeout(enhanceTimer);
            enhanceTimer = setTimeout(function () {
              self.enhanceContentBlocks(self.$container);
            }, 50);
          }
        });
        observer.observe(self.$container[0], { childList: true, subtree: true });
      }

      // Trigger resize for H5P iframe
      self.trigger("resize");
    };

    /**
     * Build Main DOM Nodes
     */
    self.buildDOM = function () {
      self.$wrapper = $("<div/>", { class: "rise-course-wrapper" });

      // 1. Cover Page
      self.$coverPage = self.createCoverPage();
      self.$wrapper.append(self.$coverPage);

      // 2. Course View (Sidebar + Main)
      self.$courseView = $("<div/>", { class: "rise-course-view" }).hide();

      // Sidebar Backdrop for Mobile
      self.$backdrop = $("<div/>", { class: "rise-sidebar-backdrop" }).on("click", function () {
        self.toggleSidebar(false);
      });
      self.$courseView.append(self.$backdrop);

      // Left Sidebar
      self.$sidebar = self.createSidebar();
      self.$courseView.append(self.$sidebar);

      // Main Content Area
      self.$mainArea = $("<div/>", { class: "rise-main-area" });
      self.$topHeader = self.createTopHeader();
      self.$lessonContainer = $("<div/>", { class: "rise-lesson-viewport" });
      self.$bottomActionBar = self.createBottomActionBar();

      self.$mainArea.append(self.$topHeader);
      self.$mainArea.append(self.$lessonContainer);
      self.$mainArea.append(self.$bottomActionBar);

      self.$courseView.append(self.$mainArea);
      self.$wrapper.append(self.$courseView);
      self.$container.html("").append(self.$wrapper);

      if ($(window).width() <= 768) {
        self.isSidebarOpen = false;
        self.$courseView.addClass("sidebar-collapsed");
      }
    };

    /**
     * Create Cover Page
     */
    self.createCoverPage = function () {
      var meta = self.params.courseMeta || {};
      var $cover = $("<div/>", { class: "rise-cover-page" });

      // Hero Banner with Background Image
      var $hero = $("<div/>", {
        class: "rise-cover-hero",
        css: { "background-image": "url(" + (meta.coverImageUrl || "") + ")" }
      });
      var $heroOverlay = $("<div/>", { class: "rise-cover-overlay" });
      var $heroContent = $("<div/>", { class: "rise-cover-hero-content" });

      // Author Badge (optional)
      if (meta.authorName && meta.authorName.trim() !== "") {
        var $authorBadge = $("<div/>", { class: "rise-cover-author" })
          .append($("<span/>", { class: "rise-author-avatar", text: self.decodeHtml(meta.authorAvatarText) || self.decodeHtml(meta.authorName).charAt(0) }))
          .append($("<span/>", { class: "rise-author-name", text: self.decodeHtml(meta.authorName) }));
        $heroContent.append($authorBadge);
      }

      // Main Big Title
      var $title = $("<h1/>", { class: "rise-cover-title", text: self.decodeHtml(meta.title || "Course") });

      // Start Course Button
      var $startBtn = $("<button/>", {
        class: "rise-start-course-btn",
        text: self.decodeHtml(meta.startButtonText || "START COURSE")
      }).on("click", function () {
        self.showLesson(0);
      });

      $heroContent.append($title).append($startBtn);
      $hero.append($heroOverlay).append($heroContent);
      $cover.append($hero);

      // Outline / Description Section
      if (meta.description) {
        var $desc = $("<div/>", { class: "rise-cover-description-container" })
          .append($("<div/>", { class: "rise-cover-description-body", html: meta.description }));
        $cover.append($desc);
      }

      return $cover;
    };

    /**
     * Create Left Sidebar
     */
    self.createSidebar = function () {
      var meta = self.params.courseMeta || {};
      var $sb = $("<aside/>", { class: "rise-sidebar" });

      // Sidebar Header Banner
      var $sbHeader = $("<div/>", { class: "rise-sidebar-header" });
      var $sbThumb = $("<div/>", {
        class: "rise-sidebar-thumb",
        css: { "background-image": "url(" + (meta.coverImageUrl || "") + ")" }
      });
      var $sbHeaderContent = $("<div/>", { class: "rise-sidebar-header-content" });
      var $sbTitle = $("<h3/>", { class: "rise-sidebar-title", text: self.decodeHtml(meta.title || "Course") });
      var $sbProgress = $("<div/>", { class: "rise-sidebar-progress" });
      self.$progressBar = $("<div/>", { class: "rise-sidebar-progress-bar", css: { width: "0%" } });
      self.$progressText = $("<span/>", { class: "rise-sidebar-progress-text", text: "0% COMPLETE" });

      $sbProgress.append($("<div/>", { class: "rise-sidebar-progress-track" }).append(self.$progressBar));
      $sbProgress.append(self.$progressText);
      $sbHeaderContent.append($sbTitle).append($sbProgress);
      $sbThumb.append($sbHeaderContent);

      // Close Button for Drawer (Mobile & Small Screen)
      var $closeBtn = $("<button/>", {
        class: "rise-sidebar-close-btn",
        attr: { "aria-label": "Close Sidebar" },
        html: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>'
      }).on("click", function (e) {
        e.stopPropagation();
        self.toggleSidebar(false);
      });
      $sbThumb.append($closeBtn);

      $sbHeader.append($sbThumb);
      $sb.append($sbHeader);

      // Sections & Lessons Navigation List
      var $sbNav = $("<nav/>", { class: "rise-sidebar-nav" });
      if (self.params.sections) {
        self.params.sections.forEach(function (sec, sIdx) {
          var $secGroup = $("<div/>", { class: "rise-sidebar-section-group" });
          var $secHeader = $("<div/>", { class: "rise-sidebar-section-title" })
            .append($("<span/>", { class: "rise-section-chevron", text: "▾" }))
            .append($("<span/>", { text: self.decodeHtml(sec.sectionTitle || ("Section " + (sIdx + 1))) }));

          var $lessonList = $("<ul/>", { class: "rise-sidebar-lesson-list" });
          if (sec.lessons) {
            sec.lessons.forEach(function (les, lIdx) {
              var gIdx = self.lessons.findIndex(function (item) {
                return item.sectionIndex === sIdx && item.lessonIndex === lIdx;
              });

              var $item = $("<li/>", {
                class: "rise-sidebar-lesson-item",
                "data-global-index": gIdx
              }).on("click", function () {
                self.showLesson(gIdx);
                if ($(window).width() <= 768) {
                  self.toggleSidebar(false);
                }
              });

              var iconSvg = self.getLessonIconSvg(les.iconType);
              var $icon = $("<span/>", { class: "rise-sidebar-lesson-icon", html: iconSvg });
              var $lesTitle = $("<span/>", { class: "rise-sidebar-lesson-text", text: self.decodeHtml(les.title) });
              var $statusRing = $("<span/>", { class: "rise-sidebar-status-ring" });

              $item.append($icon).append($lesTitle).append($statusRing);
              $lessonList.append($item);
            });
          }

          $secGroup.append($secHeader).append($lessonList);
          $sbNav.append($secGroup);
        });
      }

      $sb.append($sbNav);
      return $sb;
    };

    /**
     * Create Top Header
     */
    self.createTopHeader = function () {
      var meta = self.params.courseMeta || {};
      var $header = $("<header/>", { class: "rise-top-header" });

      // Left: Hamburger Toggle Button
      var $toggleBtn = $("<button/>", {
        class: "rise-hamburger-btn",
        attr: { "aria-label": "Toggle Sidebar Navigation" },
        html: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>'
      }).on("click", function () {
        self.toggleSidebar(!self.isSidebarOpen);
      });

      // Center: Counter & Title
      var $info = $("<div/>", { class: "rise-top-header-info" });
      self.$counter = $("<div/>", { class: "rise-lesson-counter", text: "Lesson 1 of " + Math.max(self.lessons.length, 1) });
      self.$topTitle = $("<h2/>", { class: "rise-top-lesson-title", text: "" });

      $info.append(self.$counter).append(self.$topTitle);

      // Right: Exit Course Button
      var $exitBtn = $("<button/>", {
        class: "rise-exit-course-btn",
        text: meta.exitButtonText || "EXIT COURSE"
      }).on("click", function () {
        self.showCoverPage();
      });

      $header.append($toggleBtn).append($info).append($exitBtn);
      return $header;
    };

    /**
     * Create Bottom Action Bar with Next Lesson Button
     */
    self.createBottomActionBar = function () {
      var $bar = $("<div/>", { class: "rise-bottom-action-bar" });
      self.$nextBtn = $("<button/>", {
        class: "rise-next-lesson-btn",
        text: "បន្ទាប់"
      }).on("click", function () {
        self.completeAndAdvance();
      });

      $bar.append(self.$nextBtn);
      return $bar;
    };

    /**
     * Switch to Cover View
     */
    self.showCoverPage = function () {
      self.$courseView.hide();
      self.$coverPage.show();
      var runCoverEnhance = function () {
        self.enhanceContentBlocks(self.$coverPage);
      };
      runCoverEnhance();
      setTimeout(runCoverEnhance, 50);
      setTimeout(runCoverEnhance, 150);
      setTimeout(runCoverEnhance, 300);
      window.scrollTo({ top: 0, behavior: "smooth" });
      self.trigger("resize");
    };

    /**
     * Show Lesson by Global Index
     */
    self.showLesson = function (index) {
      if (index < 0 || index >= self.lessons.length) return;

      self.currentLessonIndex = index;
      var les = self.lessons[index];

      // Hide cover and show course view
      self.$coverPage.hide();
      self.$courseView.show();

      // Update Top Header
      self.$counter.text("Lesson " + (index + 1) + " of " + self.lessons.length);
      self.$topTitle.text(les.title);

      // Update Bottom Next Button Text
      if (index === self.lessons.length - 1) {
        self.$nextBtn.text("បញ្ចប់មេរៀន (Complete Course)");
      } else {
        self.$nextBtn.text(les.nextButtonText || "បន្ទាប់");
      }

      // Render Lesson Content
      self.$lessonContainer.html("");
      if (!les.instance && les.content) {
        var $lesWrap = $("<div/>", { class: "rise-lesson-content-block" });
        les.instance = H5P.newRunnable(les.content, self.contentId, $lesWrap, true);
        les.$wrapper = $lesWrap;
      }

      if (les.$wrapper) {
        les.$wrapper.removeClass("rise-slide-up-active");
        self.$lessonContainer.append(les.$wrapper);
        // Force reflow and add animation class
        if (les.$wrapper[0]) {
          void les.$wrapper[0].offsetWidth;
        }
        les.$wrapper.addClass("rise-slide-up-active");

        var runEnhance = function () {
          self.enhanceContentBlocks(les.$wrapper);
          if (self.$container) {
            self.enhanceContentBlocks(self.$container);
          }
        };
        runEnhance();
        setTimeout(runEnhance, 50);
        setTimeout(runEnhance, 150);
        setTimeout(runEnhance, 300);
        setTimeout(runEnhance, 600);
        setTimeout(runEnhance, 1200);
      }

      // Update Sidebar Active state
      self.$sidebar.find(".rise-sidebar-lesson-item").removeClass("active");
      self.$sidebar.find('.rise-sidebar-lesson-item[data-global-index="' + index + '"]').addClass("active");

      // Scroll to top smoothly
      window.scrollTo({ top: 0, behavior: "smooth" });
      self.trigger("resize");
    };

    /**
     * Enhance Content Blocks (Code Highlighting, Terminology Cards, Callouts)
     */
    self.enhanceContentBlocks = function ($container) {
      if (!$container || !$container.length) return;

      // 1. Process Code Blocks
      $container.find("pre, code, .rise-code-block").each(function () {
        var $el = $(this);
        // Avoid double processing
        if ($el.closest(".rise-code-window").length > 0) return;
        if ($el.is("code") && $el.parent("pre").length > 0) {
          $el = $el.parent("pre");
        }

        var rawCode = $el.find("code").length ? $el.find("code").text() : $el.text();
        // Detect language
        var lang = "java"; // default
        var classAttr = ($el.attr("class") || "") + " " + ($el.find("code").attr("class") || "");
        var langMatch = classAttr.match(/language-([a-zA-Z0-9_\-]+)/);
        if (langMatch && langMatch[1]) {
          lang = langMatch[1].toLowerCase();
        } else if ($el.attr("data-lang")) {
          lang = $el.attr("data-lang").toLowerCase();
        }

        // Highlight syntax
        var highlightedHtml = self.highlightCode(rawCode.trim(), lang);

        // Build Rise Code Window
        var $window = $("<div/>", { class: "rise-code-window" });
        var $hdr = $('<div class="rise-code-header">' +
          '<div class="rise-code-dots">' +
            '<span class="rise-dot dot-red"></span>' +
            '<span class="rise-dot dot-yellow"></span>' +
            '<span class="rise-dot dot-green"></span>' +
          '</div>' +
          '<div class="rise-code-title"><span class="rise-lang-badge">' + lang.toUpperCase() + '</span></div>' +
          '<button type="button" class="rise-copy-code-btn" title="Copy code">' +
            '<svg class="copy-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>' +
            '<span class="copy-text">Copy</span>' +
          '</button>' +
        '</div>');

        var $codeContent = $('<pre class="rise-code-content"><code class="language-' + lang + '">' + highlightedHtml + '</code></pre>');

        // Copy button action
        $hdr.find(".rise-copy-code-btn").on("click", function () {
          var $btn = $(this);
          var originalText = $btn.find(".copy-text").text();
          var doSuccess = function () {
            $btn.addClass("copied");
            $btn.find(".copy-text").text("Copied! ✓");
            setTimeout(function () {
              $btn.removeClass("copied");
              $btn.find(".copy-text").text(originalText);
            }, 2000);
          };

          if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(rawCode.trim()).then(doSuccess).catch(function () {
              self.fallbackCopyText(rawCode.trim());
              doSuccess();
            });
          } else {
            self.fallbackCopyText(rawCode.trim());
            doSuccess();
          }
        });

        $window.append($hdr).append($codeContent);
        $el.replaceWith($window);
      });

      // 2. Process Interactive 3D Flip Cards (Articulate Rise Flashcards)
      $container.find(".rise-flip-card").each(function () {
        var $card = $(this);
        $card.attr("tabindex", "0");
        $card.off("click keydown").on("click", function (e) {
          if ($(e.target).closest("a, button").length) return;
          $card.toggleClass("is-flipped");
        }).on("keydown", function (e) {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            $card.toggleClass("is-flipped");
          }
        });
      });

      // 3. Process H5P.Dialogcards (Card body click to flip)
      $container.find(".h5p-dialogcards").each(function () {
        var $dc = $(this);
        $dc.find(".h5p-dialogcards-cardholder").off("click").on("click", function (e) {
          if ($(e.target).closest("button, a, .h5p-audio-inner").length) return;
          $dc.find(".h5p-dialogcards-card-footer button, .h5p-theme-button").first().trigger("click");
        });
      });

      // 4. Process Quiz Blocks (MultiChoice, SingleChoice, TrueFalse)
      $container.find(".h5p-multichoice, .h5p-single-choice-set, .h5p-true-false").each(function () {
        var $quiz = $(this);
        if ($quiz.find(".rise-quiz-header").length === 0) {
          var $qHeader = $('<div class="rise-quiz-header">' +
            '<div class="rise-quiz-category">Question</div>' +
            '<div class="rise-quiz-counter">01/01</div>' +
          '</div>');
          $quiz.prepend($qHeader);
        }

        // Add selection active class on click for options
        $quiz.find(".h5p-sc-alternative, .h5p-alternative-container, .h5p-answer, .h5p-true-false-answer").on("click", function () {
          $quiz.find(".h5p-sc-alternative, .h5p-alternative-container, .h5p-answer, .h5p-true-false-answer").removeClass("rise-quiz-selected");
          $(this).addClass("rise-quiz-selected");
        });

        // Ensure Retry button has text
        $quiz.find(".h5p-question-try-again, button.h5p-question-try-again").each(function () {
          var $btn = $(this);
          if (!$btn.text().trim()) {
            $btn.text("ព្យាយាមម្តងទៀត (Retry)");
          }
        });
      });

      // 5. Process Numbered and Bullet Lists Animation & Clean-up
      var $lists = $container.is("ol, ul, .rise-steps-list-clean, .rise-numbered-list, .rise-bullet-list") ?
        $container.add($container.find("ol, ul, .rise-steps-list-clean, .rise-numbered-list, .rise-bullet-list")) :
        $container.find("ol, ul, .rise-steps-list-clean, .rise-numbered-list, .rise-bullet-list");

      $lists.each(function () {
        var $list = $(this);
        if ($list.closest(".h5p-summary-list, .ui-autocomplete, .rise-course-sections, .rise-lesson-list, .h5p-image-slider-progress, .rise-code-dots, .h5p-audio-inner").length) return;
        $list.addClass("rise-has-dom-badges");
        var isOrdered = $list.is("ol") || $list.hasClass("rise-numbered-list") || $list.hasClass("rise-steps-list-clean");
        var counter = 1;
        var $items = $list.is(".rise-steps-list-clean") ? $list.find(".rise-clean-step-item") : $list.find("> li");
        $items.each(function (idx) {
          var $li = $(this);
          if ($li.hasClass("rise-list-item-enhanced")) return;
          $li.addClass("rise-list-item-enhanced");
          $li.css("animation-delay", ((idx + 1) * 0.08) + "s");

          var rawHtml = $li.html().trim();
          if (isOrdered) {
            var match = rawHtml.match(/^(\d+|[០-៩]+)[\.\s\-]+(.*)/s);
            var textContent = match && match[2] ? match[2] : rawHtml;
            var $badge = $('<span class="rise-number-badge">' + counter + '</span>');
            var $text = $('<span class="rise-item-text"></span>').html(textContent);
            $li.empty().append($badge).append($text);
            counter++;
          } else {
            var $bullet = $('<span class="rise-bullet-badge"><span class="rise-bullet-dot"></span></span>');
            var $text = $('<span class="rise-item-text"></span>').html(rawHtml);
            $li.empty().append($bullet).append($text);
          }
        });
      });

      // 5. Process Embedded Moodle Quizzes (Re-render Moodle Quiz into Rise Style)
      $container.find("iframe, .rise-moodle-quiz").each(function () {
        var $frame = $(this);
        var src = $frame.attr("src") || $frame.attr("data-quiz-url") || "";
        if (src.indexOf("mod/quiz") !== -1 || $frame.hasClass("rise-moodle-quiz")) {
          $frame.addClass("rise-moodle-quiz-frame");
          
          var applyRiseQuizTheme = function () {
            try {
              var frameDoc = $frame.get(0).contentDocument || ($frame.get(0).contentWindow && $frame.get(0).contentWindow.document);
              if (!frameDoc || !frameDoc.head) return;
              if (frameDoc.getElementById("rise-moodle-quiz-injected-style")) return;

              var styleEl = frameDoc.createElement("style");
              styleEl.id = "rise-moodle-quiz-injected-style";
              styleEl.textContent = `
                #page-header, #page-footer, #nav-drawer, .navbar, .drawer, .activity-header, 
                .secondary-navigation, .block, #region-main-settings-menu, .submitbtns .btn-secondary,
                .mod_quiz-prev-nav, .qn_buttons, .info, .accesshide, #nav-message-popover-container,
                .drawer-toggles, header#page-header, footer#page-footer {
                  display: none !important;
                }
                html, body {
                  background: transparent !important;
                  padding: 0 !important;
                  margin: 0 !important;
                  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif !important;
                  color: #1e293b !important;
                }
                #page, #page-content, #region-main, .region-main-wrapper, [role="main"] {
                  background: transparent !important;
                  padding: 0 !important;
                  margin: 0 !important;
                  border: none !important;
                }
                .que {
                  background: #ffffff !important;
                  border: 1px solid #e2e8f0 !important;
                  border-radius: 16px !important;
                  padding: 24px 28px !important;
                  margin: 0 0 28px 0 !important;
                  box-shadow: 0 4px 16px rgba(15, 23, 42, 0.05) !important;
                  transition: box-shadow 0.25s ease, border-color 0.25s ease !important;
                }
                .que:hover {
                  border-color: #cbd5e1 !important;
                  box-shadow: 0 6px 22px rgba(15, 23, 42, 0.08) !important;
                }
                .que .content {
                  margin: 0 !important;
                  padding: 0 !important;
                }
                .que .qtext {
                  font-size: 1.25rem !important;
                  font-weight: 700 !important;
                  color: #0f172a !important;
                  line-height: 1.6 !important;
                  border-bottom: 1.5px solid #f1f5f9 !important;
                  padding-bottom: 18px !important;
                  margin-bottom: 20px !important;
                }
                .que .answer {
                  display: flex !important;
                  flex-direction: column !important;
                  gap: 12px !important;
                  margin-top: 16px !important;
                }
                .que .answer .r0, .que .answer .r1, .que .form-check {
                  display: flex !important;
                  align-items: center !important;
                  padding: 14px 20px !important;
                  border-radius: 10px !important;
                  background: #f8fafc !important;
                  border: 1.5px solid #e2e8f0 !important;
                  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1) !important;
                  cursor: pointer !important;
                  margin: 0 !important;
                }
                .que .answer .r0:hover, .que .answer .r1:hover, .que .form-check:hover {
                  background: #f1f5f9 !important;
                  border-color: #94a3b8 !important;
                  transform: translateX(4px) !important;
                }
                .que .answer input[type="radio"]:checked + label,
                .que .answer input[type="checkbox"]:checked + label,
                .que .form-check:has(input:checked) {
                  background: #eff6ff !important;
                  border-color: #3b82f6 !important;
                  box-shadow: 0 0 0 1px #3b82f6, 0 4px 12px rgba(59, 130, 246, 0.12) !important;
                }
                .que .form-check-input, .que input[type="radio"], .que input[type="checkbox"] {
                  width: 20px !important;
                  height: 20px !important;
                  min-width: 20px !important;
                  margin-right: 14px !important;
                  cursor: pointer !important;
                  accent-color: #2563eb !important;
                }
                .que .form-check-label, .que label {
                  font-size: 1.05rem !important;
                  color: #334155 !important;
                  font-weight: 500 !important;
                  cursor: pointer !important;
                  margin: 0 !important;
                  line-height: 1.5 !important;
                }
                .que .outcome, .que .feedback, .que .specificfeedback, .que .rightanswer {
                  margin-top: 18px !important;
                  padding: 16px 20px !important;
                  border-radius: 10px !important;
                  font-size: 0.98rem !important;
                  line-height: 1.6 !important;
                }
                .que .outcome .feedback, .que.correct .outcome {
                  background: #f0fdf4 !important;
                  border: 1px solid #86efac !important;
                  color: #166534 !important;
                }
                .que.incorrect .outcome {
                  background: #fef2f2 !important;
                  border: 1px solid #fca5a5 !important;
                  color: #991b1b !important;
                }
                .submitbtns, .mod_quiz-next-nav {
                  margin-top: 24px !important;
                  display: flex !important;
                  justify-content: flex-end !important;
                }
                .submitbtns input[type="submit"], .mod_quiz-next-nav input[type="submit"], .btn-primary {
                  background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%) !important;
                  color: #ffffff !important;
                  border: none !important;
                  border-radius: 8px !important;
                  padding: 12px 32px !important;
                  font-size: 1.02rem !important;
                  font-weight: 700 !important;
                  cursor: pointer !important;
                  box-shadow: 0 4px 14px rgba(30, 58, 138, 0.28) !important;
                  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1) !important;
                }
                .submitbtns input[type="submit"]:hover, .btn-primary:hover {
                  background: linear-gradient(135deg, #1e40af 0%, #2563eb 100%) !important;
                  transform: translateY(-2px) !important;
                  box-shadow: 0 6px 20px rgba(30, 58, 138, 0.38) !important;
                }
              `;
              frameDoc.head.appendChild(styleEl);

              // Auto-adjust iframe height dynamically
              var adjustHeight = function () {
                var h = frameDoc.body.scrollHeight || frameDoc.documentElement.scrollHeight;
                if (h > 120) {
                  $frame.css("height", (h + 30) + "px");
                }
              };
              adjustHeight();
              setTimeout(adjustHeight, 400);
              setTimeout(adjustHeight, 1200);

              if (window.ResizeObserver) {
                new ResizeObserver(adjustHeight).observe(frameDoc.body);
              }
            } catch (e) {
              // Cross-origin fallback
            }
          };

          $frame.on("load", applyRiseQuizTheme);
          setTimeout(applyRiseQuizTheme, 500);
        }
      });

      // 6. Process Video and Iframe Embeds (Auto Fill Width & 16:9 Aspect Ratio)
      $container.find("iframe, video, .h5p-video").each(function () {
        var $media = $(this);
        if ($media.closest(".rise-code-window, .rise-moodle-quiz-frame, .h5p-audio-inner").length) return;
        var src = $media.attr("src") || "";
        // If it's YouTube / Vimeo / HTML5 video and NOT already inside .rise-video-wrapper
        if ($media.is("video, .h5p-video") || src.indexOf("youtube") !== -1 || src.indexOf("youtu.be") !== -1 || src.indexOf("vimeo") !== -1) {
          if (!$media.parent().hasClass("rise-video-wrapper") && !$media.hasClass("rise-video-wrapper") && !$media.closest(".rise-video-wrapper").length) {
            // If it's inside a .rise-video-card, ensure direct wrapper
            if ($media.parent().hasClass("rise-video-card")) {
              $media.wrap('<div class="rise-video-wrapper"></div>');
            } else if (!$media.hasClass("h5p-video")) {
              // Wrap standalone iframe/video in a responsive 16:9 wrapper
              $media.wrap('<div class="rise-video-wrapper" style="margin: 20px 0; border-radius: 14px; overflow: hidden;"></div>');
            }
          }
        }
      });
    };

    /**
     * Fallback Copy Text
     */
    self.fallbackCopyText = function (text) {
      var textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.position = "fixed";
      textArea.style.left = "-999999px";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand("copy");
      } catch (e) {}
      document.body.removeChild(textArea);
    };

    /**
     * Built-in Code Syntax Highlighter
     */
    self.highlightCode = function (code, lang) {
      if (!code) return "";

      // Escape HTML
      var escapeHtml = function (str) {
        return str
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;");
      };

      var tokens = [];
      var addToken = function (type, text) {
        tokens.push({ type: type, text: text });
      };

      var src = code;

      if (lang === "java" || lang === "c" || lang === "cpp" || lang === "cs" || lang === "javascript" || lang === "js" || lang === "ts") {
        var keywordList = [
          "public", "private", "protected", "class", "interface", "enum", "extends", "implements",
          "static", "final", "void", "return", "new", "this", "super", "package", "import",
          "if", "else", "for", "while", "do", "switch", "case", "default", "break", "continue",
          "try", "catch", "finally", "throw", "throws", "synchronized", "volatile", "transient",
          "const", "let", "var", "function", "async", "await", "yield", "typeof", "instanceof"
        ];
        var typeList = [
          "int", "long", "short", "byte", "float", "double", "boolean", "char",
          "String", "System", "Object", "Integer", "Double", "Boolean", "Scanner",
          "List", "ArrayList", "Map", "HashMap", "Set", "HashSet", "Exception", "Math",
          "Thread", "PrintStream", "Override", "Array", "Promise", "JSON", "console"
        ];
        var literalList = ["true", "false", "null", "undefined", "NaN"];

        // Tokenize character by character or regex
        var i = 0;
        var len = src.length;
        var out = "";

        while (i < len) {
          // Line comment //
          if (src.substr(i, 2) === "//") {
            var end = src.indexOf("\n", i);
            if (end === -1) end = len;
            out += '<span class="hl-comment">' + escapeHtml(src.substring(i, end)) + '</span>';
            i = end;
            continue;
          }
          // Block comment /* */
          if (src.substr(i, 2) === "/*") {
            var end = src.indexOf("*/", i + 2);
            if (end === -1) end = len;
            else end += 2;
            out += '<span class="hl-comment">' + escapeHtml(src.substring(i, end)) + '</span>';
            i = end;
            continue;
          }
          // String literal "..."
          if (src[i] === '"') {
            var j = i + 1;
            while (j < len && src[j] !== '"') {
              if (src[j] === '\\') j++;
              j++;
            }
            if (j < len) j++; // include closing quote
            out += '<span class="hl-string">' + escapeHtml(src.substring(i, j)) + '</span>';
            i = j;
            continue;
          }
          // Single quote char literal '...'
          if (src[i] === "'") {
            var j = i + 1;
            while (j < len && src[j] !== "'") {
              if (src[j] === '\\') j++;
              j++;
            }
            if (j < len) j++;
            out += '<span class="hl-string">' + escapeHtml(src.substring(i, j)) + '</span>';
            i = j;
            continue;
          }
          // Annotation @Override
          if (src[i] === "@") {
            var match = src.substr(i).match(/^@[a-zA-Z0-9_]+/);
            if (match) {
              out += '<span class="hl-annotation">' + escapeHtml(match[0]) + '</span>';
              i += match[0].length;
              continue;
            }
          }
          // Identifier or Keyword
          if (/[a-zA-Z_$]/.test(src[i])) {
            var match = src.substr(i).match(/^[a-zA-Z0-9_$]+/);
            if (match) {
              var word = match[0];
              var nextChar = src[i + word.length];
              if (keywordList.indexOf(word) !== -1) {
                out += '<span class="hl-keyword">' + escapeHtml(word) + '</span>';
              } else if (typeList.indexOf(word) !== -1) {
                out += '<span class="hl-type">' + escapeHtml(word) + '</span>';
              } else if (literalList.indexOf(word) !== -1) {
                out += '<span class="hl-literal">' + escapeHtml(word) + '</span>';
              } else if (nextChar === "(") {
                out += '<span class="hl-method">' + escapeHtml(word) + '</span>';
              } else {
                out += escapeHtml(word);
              }
              i += word.length;
              continue;
            }
          }
          // Numbers
          if (/[0-9]/.test(src[i])) {
            var match = src.substr(i).match(/^[0-9]+(\.[0-9]+)?([fFdDlL])?/);
            if (match) {
              out += '<span class="hl-number">' + escapeHtml(match[0]) + '</span>';
              i += match[0].length;
              continue;
            }
          }
          // Operators / punctuation
          if (/[{}()[\];,.<>!=+\-*/%&|^~?]/.test(src[i])) {
            out += '<span class="hl-operator">' + escapeHtml(src[i]) + '</span>';
            i++;
            continue;
          }

          out += escapeHtml(src[i]);
          i++;
        }
        return out;
      }

      // Default HTML Escaped fallback
      return escapeHtml(code);
    };

    /**
     * Mark Current Lesson Complete and Advance
     */
    self.completeAndAdvance = function () {
      self.completedLessons[self.currentLessonIndex] = true;

      // Update Sidebar completion ring
      var $item = self.$sidebar.find('.rise-sidebar-lesson-item[data-global-index="' + self.currentLessonIndex + '"]');
      $item.addClass("completed");

      // Update Progress Bar
      var completedCount = Object.keys(self.completedLessons).length;
      var percent = Math.round((completedCount / Math.max(self.lessons.length, 1)) * 100);
      self.$progressBar.css("width", percent + "%");
      self.$progressText.text(percent + "% COMPLETE");

      // Advance to Next Lesson or Complete
      if (self.currentLessonIndex < self.lessons.length - 1) {
        self.showLesson(self.currentLessonIndex + 1);
      } else {
        alert("សូមអបអរសាទរ! អ្នកបានបញ្ចប់មេរៀនទាំងអស់ហើយ (Congratulations! Course Completed).");
        self.showCoverPage();
      }
    };

    /**
     * Toggle Sidebar Collapsed State
     */
    self.toggleSidebar = function (open) {
      self.isSidebarOpen = open;
      if (open) {
        self.$courseView.removeClass("sidebar-collapsed");
        self.$backdrop.addClass("show");
      } else {
        self.$courseView.addClass("sidebar-collapsed");
        self.$backdrop.removeClass("show");
      }
      self.trigger("resize");
    };

    /**
     * Get SVG for Lesson Icon
     */
    self.getLessonIconSvg = function (type) {
      switch (type) {
        case "book":
          return '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>';
        case "video":
          return '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>';
        case "image":
        case "gallery":
          return '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>';
        case "document":
        case "file":
          return '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>';
        case "code":
          return '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>';
        case "cards":
        case "flashcards":
          return '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="16" height="14" rx="2" ry="2"/><path d="M6 3h14a2 2 0 0 1 2 2v12"/></svg>';
        case "quiz":
        case "question":
          return '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>';
        case "check":
        case "task":
          return '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>';
        case "lightbulb":
        case "idea":
          return '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18h6"/><path d="M10 22h4"/><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5.76.76 1.23 1.52 1.41 2.5"/></svg>';
        case "star":
          return '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>';
        case "target":
        case "goal":
          return '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>';
        case "award":
        case "trophy":
          return '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>';
        case "layers":
          return '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>';
        case "audio":
        case "sound":
          return '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>';
        case "chat":
          return '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>';
        case "link":
          return '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>';
        case "globe":
          return '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>';
        case "folder":
          return '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>';
        case "terminal":
          return '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>';
        case "clock":
          return '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>';
        case "user":
          return '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>';
        case "info":
          return '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>';
        case "settings":
          return '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>';
        case "overview":
        case "lines":
        case "list":
        default:
          return '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="15" y2="18"/></svg>';
      }
    };
  }

  RiseCourse.prototype = Object.create(EventDispatcher.prototype);
  RiseCourse.prototype.constructor = RiseCourse;

  return RiseCourse;
})(H5P.jQuery, H5P.EventDispatcher);
