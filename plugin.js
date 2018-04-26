/**
 * We.js tinymce plugin main file
 *
 * see http://wejs.org/docs/we/plugin
 */
module.exports = function loadPlugin(projectPath, Plugin) {
  const plugin = new Plugin(__dirname);

  plugin.events.on('render-javascript-tags:before:render', function (data) {
    if (data.location == 'footer' ) {
      data.files.push('//cdn.tinymce.com/4/tinymce.min.js');
    }
  });

  plugin.addJs('we-plugin-editor-tinymce', {
    weight: 11, pluginName: 'we-plugin-editor-tinymce',
    path: 'files/public/we-plugin-editor-tinymce.js'
  });

  return plugin;
};