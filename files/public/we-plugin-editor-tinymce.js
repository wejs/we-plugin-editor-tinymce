window.we.components.editor = {
  styles: {
    small: 'undo redo | insert | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
    medium: 'undo redo | insert | styleselect | bold italic forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image media'
  },
  init: function(selector, style) {
    window.tinymce.remove();

    var element = $(selector);
    var cfg = {
      target: element[0],
      lang: window.WE_BOOTSTRAP_CONFIG.locale,
      theme: 'modern',
      convert_urls: false,
      branding: false,

      min_height: element.attr('we-editor-height') || 400,
      theme: 'modern',
      extended_valid_elements: 'iframe[src|frameborder|style|scrolling|class|width|height|name|align]',
      plugins: [
        'advlist autolink lists link image charmap print hr anchor',
        'searchreplace visualblocks visualchars code fullscreen',
        'insertdatetime media nonbreaking save table contextmenu directionality',
        'emoticons paste textcolor colorpicker textpattern codesample'
      ],
      toolbar1: 'undo redo | insert | '+
        'styleselect | '+
        'bold italic forecolor backcolor | '+
        'alignleft aligncenter alignright alignjustify | '+
        'bullist numlist outdent indent | link image media | fullscreen',
      language: this.getEditorLocale(),
      language_url: this.getEditorLocaleUrl(),
      // settup the tiny editor to update on change:
      setup: function (editor) {
        editor.on('change', function () {
          editor.save();
        });
      },

      // file_browser_callback_types: 'image',
      // file_picker_callback: this.get('upload').get_file_picker_callback()
    };

    // support for focus:
    if (element.attr('id') && element.attr('we-editor-focus')) {
      cfg.auto_focus = element.attr('id');
    }

    // - set we-editor flag to use in form submit
    element.attr('we-editor', 'true');

    // get style config from we-editor-style atribute
    if (!style) style = (element.attr('we-editor-style') || 'medium');
    // add editor toobar config if style not is full
    cfg.toolbar = window.we.components.editor.styles[style];

    setTimeout(function() {
      window.tinymce.init(cfg);
    }, 200);
  },

  editorLocaleCache: null,
  editorLocaleUrlCache: null,

  getEditorLocale: function() {
   if (this.editorLocaleCache) {
      return this.editorLocaleCache;
    }

    var locale = window.we.config.locale;
    // use default en-us locale
    if (!locale || locale === 'en' || locale === 'en-us') {
      return null;
    }

    if (locale.indexOf('-') > -1) {
      var parts = locale.split('-');
      // Locales with more than 2 parts not are supported
      // TODO!
      if (parts.length > 2) {
        return null;
      }
      // Converts the seccond part of the locale to uppercase:
      parts[1] = parts[1].toUpperCase();
      // override the locale?
      locale = parts.join('_');
    } else {
      return null;
    }

    this.editorLocaleCache = locale;

    return this.editorLocaleCache;
  },
  getEditorLocaleUrl: function() {
    if (this.editorLocaleUrlCache) {
      return this.editorLocaleUrlCache;
    }

    var locale = this.getEditorLocale();

    this.editorLocaleUrlCache = '/public/plugin/we-plugin-editor-tinymce/files/langs/'+locale+'.js';

    return this.editorLocaleUrlCache;
  }
};



