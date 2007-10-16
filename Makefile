PASSING_TESTS=args eql if massign new simple_output splat lebewesen hash string array yield case
FAILING_TESTS=kind_of exception

run_tests:
	ruby test.rb ${PASSING_TESTS}
