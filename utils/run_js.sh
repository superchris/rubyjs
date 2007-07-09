#!/bin/sh
base=`pwd`/`dirname $0`/..
java -cp $base/utils/js/js.jar:$base/utils/js RunScript
