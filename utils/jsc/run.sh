#!/bin/sh
base=`pwd`/`dirname $0`/../..
file=`mktemp /tmp/jsXXXX`
cat > "$file" 
if [ -x "$base/utils/jsc/RunScript" ]; then
else
  p=`pwd`
  cd "$base/utils/jsc" 
  make 1>/dev/null 2>/dev/null
  cd $p
fi

$base/utils/jsc/RunScript "$file"

rm -f "$file"
