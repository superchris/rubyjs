/*
 *
 * Code mostly taken from:
 *
 *   http://www.mozilla.org/js/spidermonkey/tutorial.html
 */

#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#include <fcntl.h>
#include <unistd.h>

#define XP_UNIX
#include "jsapi.h"

static JSBool
println(JSContext *cx, JSObject *obj, uintN argc, jsval *argv, jsval *rval)
{
  /*
   * Look in argv for argc actual parameters, set *rval to return a
   * value to the caller.
   */
  if (argc == 1)
  {
    JSString *str = JS_ValueToString(cx, argv[0]);
    printf("%s\n", JS_GetStringBytes(str));
    *rval = JS_TRUE;
  }
  else
  {
    *rval = JS_FALSE;
  }
}

int main(int argc, char** argv)
{
  JSRuntime *rt;
  JSContext *cx;
  JSObject *global;
  JSClass global_class = {
    "global",0,
    JS_PropertyStub,JS_PropertyStub,JS_PropertyStub,JS_PropertyStub,
    JS_EnumerateStub,JS_ResolveStub,JS_ConvertStub,JS_FinalizeStub
  };

  /*
   * You always need:
   *        a runtime per process,
   *        a context per thread,
   *        a global object per context,
   *        standard classes (e.g. Date).
   */
  rt = JS_NewRuntime(0x100000);
  cx = JS_NewContext(rt, 0x1000);
  global = JS_NewObject(cx, &global_class, NULL, NULL);
  JS_InitStandardClasses(cx, global);

  /* 
   * Read in file
   */

  if (argc != 2) return -1; 

  char *filename = argv[1];

  char *script;
  int len;
  int fh;

  fh = open(filename, O_RDONLY);
  if (fh < 0) return -2;

  len = lseek(fh, 0, SEEK_END);
  if (len < 0) return -3;
  lseek(fh, 0, SEEK_SET);

  script = malloc(len+1);
  read(fh, script, len);

  close(fh);
  script[len] = 0;

  jsval rval;
  JSString *str;
  JSBool ok;

  ok = JS_DefineFunction(cx, global, "println", println, 1, 0);

  ok = JS_EvaluateScript(cx, global, script, len,
      filename, 0, &rval);
}
