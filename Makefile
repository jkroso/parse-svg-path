REPORTER=dot

serve: node_modules
	@node_modules/serve/bin/serve -Sloj

test: node_modules
	@node_modules/mocha/bin/_mocha test/*.test.js \
		--reporter $(REPORTER) \
		--timeout 500 \
		--check-leaks \
		--bail
	@sed 's/parse-svg-path/.\//' < Readme.md | jsmd

node_modules: package.json
	@packin install -m $< -f $@

.PHONY: serve test