var args = require('yargs').argv;
var gulp = require('gulp');
var jeditor = require('gulp-json-editor');
var merge = require('merge-stream');
var zip = require('gulp-zip');

gulp.task('build', function() {
	var manifest = gulp.src('manifest.json', { base: './' })
		.pipe(jeditor(
			function(json)
			{
                if (args.url) {              
				    json.resources[0].url = args.url;
                }
				
				return json;
			}));	
	
	var assets = gulp.src('icons/*', { base: './' });
	
	return merge(manifest, assets)
		.pipe(zip('<%= name %>.webtile'))
		.pipe(gulp.dest('out'));
});

gulp.task('default', [ 'build' ]);