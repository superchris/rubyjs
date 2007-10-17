PASSING_TESTS=args eql if massign new simple_output splat lebewesen hash string array yield case range
FAILING_TESTS=kind_of exception

all: run_tests gen_browser_test

run_tests:
	ruby test.rb ${PASSING_TESTS}

browser_test:
	ruby gen_browser_test_suite.rb ${PASSING_TESTS} > browser.test.html

