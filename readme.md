
Документация к архитектуре проектов Zero Wheel

Содержание:
1. Архитектура проекта
2. Gulp Tasks 
3. Pug
4. Sass
5. .gitignore


1. Архитектура проекта
	--static_start
		.gitignore
		bower.json
		gulpfile.js
		package-lock.json
		package.json
		--src
	    	index.html
		    --css
		    	main.css
		    	reset.css
		    --images
		    	pug.png
		    --js
		    	main.js
		    --pug
		    	index.pug
		    	--blocks
		    		footer.pug
		    		header.pug
		    	--templates
		    		sheme.pug
		    		common.pug
		    		cloneThisForNewPage.pug
		    		--mixins
		    			css-mix.pug
		    			js-mix.pug
		    --sass
		    	reset.sass
		    	main.sass
		    	--mixins
		    		_font-generator.sass
		    --vendor
		--build
2. Gulp Tasks
	2.1 List of gulp packages:
			gulp
			gulp-sass
			gulp-autoprefixer
			browser-sync
			del
			gulp-postcss
			postcss-sorting
			gulp-pug
			gulp-imagemin
	2.2
		List of tasks:
			sass
			pug
			delClone
			clearPugDir
			del
			destroy
			fly
			build
	2.3
		Tasks description.
		sass
			Компиляци *.sass файлов в *.css
		pug
			Компиляция *.pug файлов в *.html
		delClone
			Удаляет шаблонный файл cloneThisForNewPage.html
		clearPugDir
			В папке src/pug/ удаляет все файлы, кроме файлов в папке template
		del
			Удаляет все файлы из папки build
		destroy
			Удаляет все файлы из проекта кроме:
				app/sass/mixins/*, 
				app/sass/reset.sass, 
				app/pug/templates
		fly
			Запускает дефолтные таски наблюдения за изменениями в файлах *.html, *.js, *.css, *.pug, *.sass, *.fonts.
			Вместе с таском fly цепляются следующие задачи:
				1) Запуск локального сервера пакета browser-sync
				2) Таск pug
				3) Таск delClone
				4) Таск sass
		build
			Сборщик проекта. Используется для сборки проекта в продакшн.
			Перенос файлов:
			1) app/*.html ------> build/
			2) app/css/**/*.css ------> build/css/
			3) app/js/**/*.js ------> build/js/
			4) app/images/**/* ------> build/images/
			5) app/fonts/**/* ------> build/fonts/
			6) app/vendor/**/* ------> build/vendor/
			Картинки при перемещении подвергаются сжатию по средствам пакета gulp-imagemin.
3. Pug
	Шаблонизация проекта учитывает частичное использование методолгии БЭМ(ЭТОТ БЛОК ДОКУМЕНТАЦИИ В РЕДАКТИРОВАНИИ).
	3.1 Архитектура PUG в проекте
	--app/pug
		index.pug
    	--blocks
    		footer.pug
    		header.pug
    	--templates
    		sheme.pug
    		common.pug
    		cloneThisForNewPage.pug
    		--mixins
    			css-mix.pug
    			js-mix.pug
	3.1 Папка --templates
		Содержит файлы, не изменяемые в процессе разработки проекта.