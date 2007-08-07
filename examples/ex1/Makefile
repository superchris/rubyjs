RUBYJS_GEN=../../rubyjs_gen
LIBDIR=../../src

code.js: ex1.rb
	$(RUBYJS_GEN) -I $(LIBDIR) -m Main -o code.js ex1.rb

clean:
	rm -f code.js
