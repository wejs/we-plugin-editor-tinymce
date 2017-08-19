window.we.components.editor = {
  styles: {
    small: 'undo redo | insert | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
    medium: 'undo redo | insert | styleselect | bold italic forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image media'
  },
  init: function(selector, style) {
    var element = $(selector);
    var cfg = {
      selector: selector,
      lang: window.WE_BOOTSTRAP_CONFIG.locale,

      focus: element.attr('we-editor-focus'),

      min_height: element.attr('we-editor-height') || 400,
      theme: 'modern',
      plugins: [
        'advlist autolink lists link image charmap print preview hr anchor pagebreak',
        'searchreplace wordcount visualblocks visualchars code fullscreen',
        'insertdatetime media nonbreaking save table contextmenu directionality',
        'emoticons template paste textcolor colorpicker textpattern imagetools codesample'
      ],
      language: this.getEditorLocale(),
      language_url: this.getEditorLocaleUrl()
    };

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



