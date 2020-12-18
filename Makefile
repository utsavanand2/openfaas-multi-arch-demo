.PHONY: install-dep
install-dep:
	npm install --save

.PHONY: build-react-app
build-react-app:
	./node_modules/.bin/react-scripts build && \
	mv build ./birthday-func/birthday-func/
