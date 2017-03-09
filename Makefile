
build:
	rm -rf libs
	npm run build

publish: build
	rm -rf boilerplates/app/dist
	rm -rf boilerplates/demo/dist
	npm publish

publish-sync: publish
	cnpm sync dvax-cli
	tnpm sync dvax-cli
