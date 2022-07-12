// GULP

const { src, dest, watch, series, parallel} = require('gulp');

// CSS & SASS
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');

// IMAGENES

const imagemin = require('gulp-imagemin');


function css( done ) {
    // Compilar Sass
    // pasos : 
        // 1 - identificar archivo\

        src('./src/scss/app.scss')
        // 2- compilarla
            .pipe( sass() )
            .pipe( postcss( [autoprefixer() ] ) )
            // 3 - Guardar .css
                .pipe(dest('build/css'))

    done();
}

function imagenes( done ) {
    // 1 - identificar archivo\
    src('./src/img/**/*')
        // 2 - Optimizar imagenes
        .pipe( imagemin( {optoizationLevel: 3} ) )
            // 3 - Guardar imagenes
            .pipe(dest('build/img'))
    
    done();
}

function dev() {
    // Seleccionar todos los archivos que tengan .scss
    watch('./src/scss/**/*.scss', css )
    watch('./src/img/**/*', imagenes )
    // Seleccionar un archivo especifico
    // watch('./src/scss/app.scss', css )
}

exports.css = css;
exports.dev = dev;
exports.imagenes = imagenes;

// Tareas por default
exports.default = series( imagenes, css, dev);

// series - Incia una tarea, hasta que finaliza ejecuta la siguiente
// parallel - Todas inician al mismo tiempo