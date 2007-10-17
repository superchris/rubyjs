PASSING_TESTS=args eql if massign new simple_output splat lebewesen hash string array yield case range class send
FAILING_TESTS=exception

browser_test:
	ruby gen_browser_test_suite.rb ${PASSING_TESTS} > browser.test.html
