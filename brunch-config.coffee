module.exports =
  files:
    javascripts:
      joinTo:
        'vendor.js': /^(bower_components|(\/usr\/lib\/)?node_modules)/
        'app.js': /^app\//
    stylesheets:
      joinTo: "app.css"
    templates:
      joinTo: "app.js": /.+\.jade$/
  plugins:
    jade:
      options:
        pretty: true
    static_jade:
      extension: ".jade"
      path: [/app/]
    sass:
      mode: "native"
  npm:
    styles:
      "angular-material": ["angular-material.min.css"]
      "angular-material-data-table": ["dist/md-data-table.min.css"]
