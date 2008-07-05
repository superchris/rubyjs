// declare nil
function NilClass() {}

// FIXME: remove
NilClass.prototype.toString = function() { return "nil"; };
nil = new NilClass();

//
// define a null-function (used by HTTPRequest)
//
function a$q()
{
}

//
// r: return value
// s: scope (method scope)
//
function a$c(r,s)
{
  this.a$a = r;
  this.a$b = s; 
  return this;
}

//
// Throw in Javascript is a statement.
//
// This function can be used to overcome
// that limitation.
//
function a$l(x) { throw(x); }

function a$b(a)
{
  // TODO
  return a;
}

// 
// helper function for multiple assignment in 
// iterator parameters.
// 
//   undefined -> []
//   1         -> [1]
//   [1]       -> [[1]]
//   []        -> [[]]
//   [1,2]     -> [1,2]
// 
function a$j(a)
{
  if (a===undefined) return [];
  if (a.constructor!=Array || a.length<2) return [a];
  return a;
}

//
// Call the method in the superclass.
//
// As super is used quite rarely, we dont optimize for it.
// 
// object, method, iterator, arguments
//
function a$m(o, m, i, a) 
{
  var r = o[m]; // method in current class
  var c = o.a$g.a$e;
  while (r === c.a$d.prototype[m])
    c = c.a$e;
  return c.a$d.prototype[m].apply(o, [i].concat(a));
}

function a$k(o, m, a) 
{
  var r = o[m]; // method in current class
  var c = o.a$g.a$e;
  while (r === c.a$d.prototype[m])
    c = c.a$e;
  return c.a$d.prototype[m].apply(o, a);
}

//
// Whether o.kind_of?(c)
//
function a$i(o, c)
{
  var k,i,m;

  k = o.a$g;

  while (k != nil)
  {
    if (k === c) return true;

    // check included modules
    m = k.a$j;
    for (i=0; i<m.length; i++)
    {
      if (m[i] === c) return true;
    }

    k = k.a$e; 
  }

  return false;
}

function a$o(c)
{
  for (var i=0; i<c.length; i++)
    a$e(c[i]);
}

function a$e(c)
{
  var k,i;

  //
  // include modules
  //
  // do that before, because when assigning instance methods of 
  // the super class, a check for === undefined prevents this method 
  // from being overwritten.
  //
  for (i=0; i<c.a$j.length; i++)
  {
    for (k in c.a$j[i].a$d.prototype)
    {
      if (c.a$d.prototype[k]===undefined)
      {
        c.a$d.prototype[k] = c.a$j[i].a$d.prototype[k];
      }
    }
  }

  // instance methods
  if (c.a$e != nil)
  {
    for (k in c.a$e.a$d.prototype)
    {
      if (c.a$d.prototype[k]===undefined)
      {
        c.a$d.prototype[k] = c.a$e.a$d.prototype[k];
      }
    }
  }

  // inherit class methods from superclass
  if (c.a$e != nil)
  {
    for (k in c.a$e)
    {
      if (c[k]===undefined)
      {
        c[k] = c.a$e[k];
      }
    }
  }

  // set class for instanciated objects
  c.a$d.prototype.a$g = c;
}

function a$d(h)
{
  var c,k,i;
  c = h.a$g || $b.$a(nil, h.a$e, h.a$c, h.a$d);

  if (h.a$h)
  {
    for (k in h.a$h)
    {
      c.a$d.prototype[k] = h.a$h[k];
    }
  }

  if (h.a$f)
  {
    for (k in h.a$f) c[k] = h.a$f[k];
  }

  if (h.a$j)
  {
    for (i=0; i<h.a$j.length; i++)
    {
      c.a$j.push(h.a$j[i]);
    }
  }

  return c;
}

function a$a(_a, _b, _c, _d) 
{
  this.a$e = _b;
  this.a$c = _c;
  this.a$d = _d;
  this.a$j = [];
  this.a$g = _a;
  return this;
}

a$a.$e = function() { return "MetaClass"; };
a$a.$B = function() { return this; };
//
// Generates a new method_missing function
// for the given symbol +sym+.
// 
var a$r = {}; 
function a$s(sym)
{
  if (!a$r[sym])
  {
    var fn = function() {
      return a$t(this, arguments, sym);
    };
    fn.a$i = true;
    a$r[sym] = fn;
  }

  return a$r[sym];
}

function a$t(obj, args, sym)
{
  var i, a;
  a = [];
  if (args.length == 0)
    a.push(nil);
  else
    a.push(args[0]);

  a.push(a$h[sym] || nil);

  for (i=1; i<args.length; i++)
    a.push(args[i]);
  
  var m = obj.$p;

  if (m)
    return m.apply(obj, a);
  else
    throw "FATAL: method_missing missing";
}

//
// assign method_missing stubs
//
function a$p(c)
{
  var i;

  for (i in a$h)  
  {
    if (c.a$d.prototype[i]===undefined)
    {
      c.a$d.prototype[i] = a$s(i);
    }
  }

  if (c.a$e != nil)
  {
    for (i in c.a$e)
    {
      if (c[i]===undefined)
      {
        c[i] = a$s(i);
      }
    }
  }
}
// method map
var a$h = {"$N":"test","$aF":"end","$aH":"sub","$x":"each","$aw":"sort","$j":"methods","$bC":"test_array","$by":"to_f","$bi":"new_from_jsobject","$Y":"m","$z":"loop","$6":"%","$bm":"member?","$a7":"test_three_times_indirect","$az":"calc","$aL":"collect","$9":"&","$bh":"new_from_key_value_list","$be":"three_times_yield","$a3":"test_loop2","$a2":"three_times_block","$f":"===","$Q":"==","$bz":"to_i","$a8":"three_times_indirect","$aS":"reverse","$1":"downto","$aO":"map","$8":"times","$v":"p","$aC":"include?","$bf":"keys","$u":"proc","$b":"allocate","$aP":"reject","$a$":"three_times_yield2","$i":"instance_methods","$aI":"size","$ad":"*","$L":"+","$aR":"delete","$bg":"values","$a6":"return_in_block","$aZ":"unshift","$Z":"upto","$a1":"dup","$ar":"rjust","$3":"-","$bs":"assert_equal","$s":"nil?","$ao":"not_a_method","$a":"new","$a5":"test_while_loop","$aY":"push","$5":"/","$U":"call","$F":"message","$A":"is_a?","$aJ":"split","$H":"main","$e":"name","$n":"empty?","$bA":"to_splat","$M":"add_msg","$X":"jage","$l":"raise","$ay":"length","$q":"to_s","$bx":"c_method","$2":">=","$aj":"puke","$aU":"clear","$7":"|","$h":"kind_of?","$bn":"_increment_assertions","$aN":"find_all","$a4":"loop2","$_":"~","$aq":"[]","$a_":"test_three_times_yield2","$aK":"strip","$bv":"test_good","$br":"_assertions=","$bd":"test_return_in_block","$ab":"-@","$ax":"[]=","$4":"succ","$a0":"reverse!","$D":"hash","$B":"class","$k":"inspect","$ba":"test_three_times_block","$$":"^","$bc":"test_three_times_yield","$bq":"assert","$r":"__send","$g":"eql?","$aW":"pop","$E":"method","$O":"<","$ak":"teardown","$W":"wau","$aA":"first","$aE":"begin","$aM":"<<","$as":"ljust","$d":"__invoke","$aa":">","$0":"<=","$al":"_assertions","$bw":"a_method","$c":"initialize","$y":"send","$t":"respond_to?","$bE":"test_include","$bb":"test_loop","$m":"shift","$ae":"run","$bD":"test_delete","$aG":"exclude_end?","$ac":"+@","$an":"blah_blah","$aQ":"select","$V":"miau","$ai":"setup","$aD":"to_a","$p":"method_missing","$ap":"index","$am":"=~","$a9":"test_proc","$aV":"join","$aT":"each_with_index","$C":"tap","$av":"addPrint","$bp":"assert_block","$aB":"last","$o":"instance_of?","$bu":"test_assert_equal","$bt":"test_four","$au":"gsub","$w":"puts","$aX":"to_ary"};
var a$f = {};
for (var i in a$h) a$f[a$h[i]] = i;
$b = a$d({a$e: nil,a$f: {$a:
/* Class.new */
function(_e,_a,_b,_c){var self,_d;
self=this;
try{if(arguments.length<3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));
if(arguments.length>4)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 3)'));
if(_c==null)_c=nil;
;
if((_d=_c,_d===false||_d===nil)){_c=(function() {})};
return new self.a$d($b, _a, _b, _c);}catch(_f){if(_f instanceof a$c && (!_f.a$b || _f.a$b==2))return _f.a$a;
throw(_f)}}

},a$c: "Class",a$g: new a$a(a$a, nil, "Class", a$a),a$h: {$e:
/* Class#name */
function(){var self;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
return self.a$c}

,$a:
/* Class#new */
function(_c){var self,_a,_b,_d,_e,_f;
_f=nil;
self=this;
_d=_c==null?nil:_c;
try{_a=[];
for(_b=1;_b<arguments.length;_b++)_a.push(arguments[_b]);
;
_e=self.$b();
_e.$d(_d,'$c',a$b(_a));
_f=_e;
return _f}catch(_g){if(_g instanceof a$c && (!_g.a$b || _g.a$b==0))return _g.a$a;
throw(_g)}}

,$f:
/* Class#=== */
function(_d,_a){var self,_b,_c;
_c=nil;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
_c=(_b=self.$g(nil,_a), (_b!==false&&_b!==nil) ? _b : (_a.$h(nil,self)));
return _c}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==1))return _e.a$a;
throw(_e)}}

,$b:
/* Class#allocate */
function(){var self;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
return (new self.a$d())}

,$i:
/* Class#instance_methods */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$b().$j();
return _a}

,$k:
/* Class#inspect */
function(){var self;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
return self.a$c}

}});a$e($b);$i = a$d({a$j: [],a$e: nil,a$c: "Kernel",a$h: {$r:
/* Kernel#__send */
function(_d,_a){var self,_b,_c,_e;
self=this;
_e=_d==null?nil:_d;
try{if(arguments.length<2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
_b=[];
for(_c=2;_c<arguments.length;_c++)_b.push(arguments[_c]);
;

    var m = self[a$f[_a]];
    if (m) 
      return m.apply(self, [_e].concat(_b));
    else
      return self.$p.apply(self, [_e].concat([_a]).concat(_b));}catch(_f){if(_f instanceof a$c && (!_f.a$b || _f.a$b==4))return _f.a$a;
throw(_f)}}

,$p:
/* Kernel#method_missing */
function(_d,_a){var self,_b,_c,_e,_f;
_f=nil;
self=this;
_e=_d==null?nil:_d;
try{if(arguments.length<2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
_b=[];
for(_c=2;_c<arguments.length;_c++)_b.push(arguments[_c]);
;
_f=self.$l(nil,$g,("undefined method `" + ((_a).$q()) + ("' for ") + ((self.$k()).$q())));
return _f}catch(_g){if(_g instanceof a$c && (!_g.a$b || _g.a$b==3))return _g.a$a;
throw(_g)}}

,$l:
/* Kernel#raise */
function(){var self,_a,_b,_c,_d;
self=this;
_a=[];
for(_b=1;_b<arguments.length;_b++)_a.push(arguments[_b]);
;
_c=((_b=_a.$n(),_b!==false&&_b!==nil)?$c.$a(nil,""):(_d=_a.$m(),((_b=_d.$h(nil,$b),_b!==false&&_b!==nil)?_d.$d(nil,'$a',a$b(_a)):((_b=_d.$o(nil,$f),_b!==false&&_b!==nil)?((_b=_a.$n(),_b!==false&&_b!==nil)?_d:$a.$a(nil,"to many arguments given to raise")):((_b=_d.$o(nil,$e),_b!==false&&_b!==nil)?((_b=_a.$n(),_b!==false&&_b!==nil)?$c.$a(nil,_d):$a.$a(nil,"to many arguments given to raise")):$d.$a(nil,"exception class/object expected"))))));
throw(_c)}

,$s:
/* Kernel#nil? */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=false;
return _a}

,$u:
/* Kernel#proc */
function(_a){var self,_b,_c;
_c=nil;
self=this;
_b=_a==null?nil:_a;
try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_c=$h.$a(_b);
return _c}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==6))return _d.a$a;
throw(_d)}}

,$t:
/* Kernel#respond_to? */
function(_b,_a){var self;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;

    var m = a$f[_a]; 
    return (m !== undefined && self[m] !== undefined && !self[m].a$i)}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==5))return _c.a$a;
throw(_c)}}

,$v:
/* Kernel#p */
function(){var self,_a,_b,_f;
_f=nil;
self=this;
_a=[];
for(_b=1;_b<arguments.length;_b++)_a.push(arguments[_b]);
;
_a.$x(function(_c){var _d;
var _e=nil;
_d=_c==null?nil:_c;
_e=self.$w(nil,_d.$k());
return _e});
_f=nil;
return _f}

,$d:
/* Kernel#__invoke */
function(_c,_a,_b){var self,_d;
self=this;
_d=_c==null?nil:_c;
try{if(arguments.length!=3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));
;

    var m = self[_a];
    if (m)
      return m.apply(self, [_d].concat(_b));
    else
      return self.$p.apply(self, 
        [_d].concat([a$h[_a]]).concat(_b));}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==7))return _e.a$a;
throw(_e)}}

,$z:
/* Kernel#loop */
function(_a){var self,_b;
_b=nil;
self=this;
try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
while(true){_a()};
_b=nil;
;
return _b}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==10))return _c.a$a;
throw(_c)}}

,$w:
/* Kernel#puts */
function(_b,_a){var self;
self=this;
try{if(arguments.length>2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
if(_a==null)_a="";
;
_a=_a.$q();
STDOUT_puts(_a)}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==9))return _c.a$a;
throw(_c)}}

,$y:
/* Kernel#send */
function(_d,_a){var self,_b,_c,_e;
self=this;
_e=_d==null?nil:_d;
try{if(arguments.length<2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
_b=[];
for(_c=2;_c<arguments.length;_c++)_b.push(arguments[_c]);
;

    var m = self[a$f[_a]];
    if (m) 
      return m.apply(self, [_e].concat(_b));
    else
      return self.$p.apply(self, [_e].concat([_a]).concat(_b));}catch(_f){if(_f instanceof a$c && (!_f.a$b || _f.a$b==8))return _f.a$a;
throw(_f)}}

}});$k = a$d({a$j: [$i],a$e: nil,a$c: "Object",a$h: {$h:
/* Object#kind_of? */
function(_b,_a){var self;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
return a$i(self, _a)}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==11))return _c.a$a;
throw(_c)}}

,$j:
/* Object#methods */
function(){var self,_a,_b;
_b=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=[];
for (meth in self) {
       if (typeof self[meth] == "function") {
         _a.push(a$h[meth]);
       }
    };
_b=_a;
return _b}

,$A:
/* Object#is_a? */
function(_b,_a){var self;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
return a$i(self, _a)}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==14))return _c.a$a;
throw(_c)}}

,$r:
/* Object#__send */
function(_d,_a){var self,_b,_c,_e;
self=this;
_e=_d==null?nil:_d;
try{if(arguments.length<2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
_b=[];
for(_c=2;_c<arguments.length;_c++)_b.push(arguments[_c]);
;

    var m = self[a$f[_a]];
    if (m) 
      return m.apply(self, [_e].concat(_b));
    else
      return self.$p.apply(self, [_e].concat([_a]).concat(_b));}catch(_f){if(_f instanceof a$c && (!_f.a$b || _f.a$b==13))return _f.a$a;
throw(_f)}}

,$p:
/* Object#method_missing */
function(_d,_a){var self,_b,_c,_e,_f;
_f=nil;
self=this;
_e=_d==null?nil:_d;
try{if(arguments.length<2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
_b=[];
for(_c=2;_c<arguments.length;_c++)_b.push(arguments[_c]);
;
_f=self.$l(nil,$g,("undefined method `" + ((_a).$q()) + ("' for ") + ((self.$k()).$q())));
return _f}catch(_g){if(_g instanceof a$c && (!_g.a$b || _g.a$b==12))return _g.a$a;
throw(_g)}}

,$l:
/* Object#raise */
function(){var self,_a,_b,_c,_d;
self=this;
_a=[];
for(_b=1;_b<arguments.length;_b++)_a.push(arguments[_b]);
;
_c=((_b=_a.$n(),_b!==false&&_b!==nil)?$c.$a(nil,""):(_d=_a.$m(),((_b=_d.$h(nil,$b),_b!==false&&_b!==nil)?_d.$d(nil,'$a',a$b(_a)):((_b=_d.$o(nil,$f),_b!==false&&_b!==nil)?((_b=_a.$n(),_b!==false&&_b!==nil)?_d:$a.$a(nil,"to many arguments given to raise")):((_b=_d.$o(nil,$e),_b!==false&&_b!==nil)?((_b=_a.$n(),_b!==false&&_b!==nil)?$c.$a(nil,_d):$a.$a(nil,"to many arguments given to raise")):$d.$a(nil,"exception class/object expected"))))));
throw(_c)}

,$B:
/* Object#class */
function(){var self;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
return self.a$g}

,$g:
/* Object#eql? */
function(_b,_a){var self;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
return (self.constructor == _a.constructor && self == _a)}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==15))return _c.a$a;
throw(_c)}}

,$D:
/* Object#hash */
function(){var self;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
return self.toString()}

,$C:
/* Object#tap */
function(_a){var self,_b;
_b=nil;
self=this;
try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a(self);
_b=self;
return _b}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==16))return _c.a$a;
throw(_c)}}

,$s:
/* Object#nil? */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=false;
return _a}

,$q:
/* Object#to_s */
function(){var self;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
return self.toString()}

,$u:
/* Object#proc */
function(_a){var self,_b,_c;
_c=nil;
self=this;
_b=_a==null?nil:_a;
try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_c=$h.$a(_b);
return _c}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==18))return _d.a$a;
throw(_d)}}

,$t:
/* Object#respond_to? */
function(_b,_a){var self;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;

    var m = a$f[_a]; 
    return (m !== undefined && self[m] !== undefined && !self[m].a$i)}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==17))return _c.a$a;
throw(_c)}}

,$c:
/* Object#initialize */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=nil;
return _a}

,$E:
/* Object#method */
function(_c,_a){var self,_b;
_b=nil;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
_b=$j.$a(nil,self,_a);
return _b}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==19))return _d.a$a;
throw(_d)}}

,$v:
/* Object#p */
function(){var self,_a,_b,_f;
_f=nil;
self=this;
_a=[];
for(_b=1;_b<arguments.length;_b++)_a.push(arguments[_b]);
;
_a.$x(function(_c){var _d;
var _e=nil;
_d=_c==null?nil:_c;
_e=self.$w(nil,_d.$k());
return _e});
_f=nil;
return _f}

,$d:
/* Object#__invoke */
function(_c,_a,_b){var self,_d;
self=this;
_d=_c==null?nil:_c;
try{if(arguments.length!=3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));
;

    var m = self[_a];
    if (m)
      return m.apply(self, [_d].concat(_b));
    else
      return self.$p.apply(self, 
        [_d].concat([a$h[_a]]).concat(_b));}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==20))return _e.a$a;
throw(_e)}}

,$f:
/* Object#=== */
function(_d,_a){var self,_b,_c;
_c=nil;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
_c=(_b=self.$g(nil,_a), (_b!==false&&_b!==nil) ? _b : (self.$h(nil,_a)));
return _c}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==21))return _e.a$a;
throw(_e)}}

,$o:
/* Object#instance_of? */
function(_b,_a){var self;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
return (self.a$g === _a)}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==25))return _c.a$a;
throw(_c)}}

,$y:
/* Object#send */
function(_d,_a){var self,_b,_c,_e;
self=this;
_e=_d==null?nil:_d;
try{if(arguments.length<2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
_b=[];
for(_c=2;_c<arguments.length;_c++)_b.push(arguments[_c]);
;

    var m = self[a$f[_a]];
    if (m) 
      return m.apply(self, [_e].concat(_b));
    else
      return self.$p.apply(self, [_e].concat([_a]).concat(_b));}catch(_f){if(_f instanceof a$c && (!_f.a$b || _f.a$b==24))return _f.a$a;
throw(_f)}}

,$z:
/* Object#loop */
function(_a){var self,_b;
_b=nil;
self=this;
try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
while(true){_a()};
_b=nil;
;
return _b}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==23))return _c.a$a;
throw(_c)}}

,$w:
/* Object#puts */
function(_b,_a){var self;
self=this;
try{if(arguments.length>2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
if(_a==null)_a="";
;
_a=_a.$q();
STDOUT_puts(_a)}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==22))return _c.a$a;
throw(_c)}}

,$k:
/* Object#inspect */
function(){var self;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
return self.toString()}

}});$f = a$d({a$j: [],a$e: $k,a$c: "Exception",a$h: {$F:
/* Exception#message */
function(){var self,_a;
_a=nil;
self=this;
if(self.$G==null)self.$G=nil;
_a=self.$G;
return _a}

,$q:
/* Exception#to_s */
function(){var self,_a;
_a=nil;
self=this;
if(self.$G==null)self.$G=nil;
_a=self.$G;
return _a}

,$c:
/* Exception#initialize */
function(_d,_a){var self,_c,_b;
_b=nil;
self=this;
try{if(arguments.length>2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
if(_a==null)_a=nil;
;
if((_c=_a.$s(),_c!==false&&_c!==nil)){_b=self.$G=self.$B().$e()}else{_b=self.$G=_a};
return _b}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==26))return _e.a$a;
throw(_e)}}

,$k:
/* Exception#inspect */
function(){var self,_a;
_a=nil;
self=this;
if(self.$G==null)self.$G=nil;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=("#<" + ((self.$B().$e()).$q()) + (": ") + ((self.$G).$q()) + (">"));
return _a}

}});$l = a$d({a$j: [],a$e: $f,a$c: "StandardError"});$m = a$d({a$j: [],a$e: $l,a$c: "NameError"});$g = a$d({a$j: [],a$e: $m,a$c: "NoMethodError"});$p = a$d({a$j: [],a$e: $k,a$f: {$H:
/* T_TestMassign::TestMassign.main */
function(){var self,_a,_b,_c,_d,_e,_f;
_a=_f=nil;
self=this;
if(self.$I==null)self.$I=nil;
if(self.$J==null)self.$J=nil;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
(_a=[1,2],_b=_a[0]==null?nil:_a[0],_c=_a[1]==null?nil:_a[1],_a);
self.$v(nil,_b);
self.$v(nil,_c);
self.$w(nil,"--");
(_a=[1,2,3],_b=_a[0]==null?nil:_a[0],_c=_a[1]==null?nil:_a[1],_a);
self.$v(nil,_b);
self.$v(nil,_c);
self.$w(nil,"--");
_d=5;
(_a=[1,2],_b=_a[0]==null?nil:_a[0],_c=_a[1]==null?nil:_a[1],_d=_a[2]==null?nil:_a[2],_a);
self.$v(nil,_b);
self.$v(nil,_c);
self.$v(nil,_d);
self.$w(nil,"--");
(_a=[1,2,3],self.$I=_a[0]==null?nil:_a[0],_c=_a[1]==null?nil:_a[1],self.$J=_a[2]==null?nil:_a[2],_a);
self.$v(nil,self.$I);
self.$v(nil,_c);
self.$v(nil,self.$J);
self.$w(nil,"--");
self.$w(nil,"swap");
(_a=[1,2],_b=_a[0]==null?nil:_a[0],_c=_a[1]==null?nil:_a[1],_a);
self.$v(nil,_b);
self.$v(nil,_c);
(_a=[_c,_b],_b=_a[0]==null?nil:_a[0],_c=_a[1]==null?nil:_a[1],_a);
self.$v(nil,_b);
self.$v(nil,_c);
self.$w(nil,"--");
self.$w(nil,"splat1");
(_a=[1,2],_b=_a[0]==null?nil:_a[0],_c=_a[1]==null?nil:_a[1],_d=_a[2]==null?nil:_a[2],_e=_a.slice(3),_a);
self.$v(nil,_b);
self.$v(nil,_c);
self.$v(nil,_d);
self.$v(nil,_e);
self.$w(nil,"--");
self.$w(nil,"splat2");
(_a=[1,2],_b=_a[0]==null?nil:_a[0],_c=_a.slice(1),_a);
self.$v(nil,_b);
self.$v(nil,_c);
self.$w(nil,"--");
self.$w(nil,"splat3");
(_a=[1,2,3,4,5],_b=_a[0]==null?nil:_a[0],_c=_a.slice(1),_a);
self.$v(nil,_b);
self.$v(nil,_c);
self.$w(nil,"--");
self.$w(nil,"splat with globals");
self.$v(nil,(typeof($n)=='undefined'?nil:$n));
self.$v(nil,(typeof($o)=='undefined'?nil:$o));
(_a=[1,2],$n=_a[0]==null?nil:_a[0],$o=_a[1]==null?nil:_a[1],_a);
self.$v(nil,(typeof($n)=='undefined'?nil:$n));
self.$v(nil,(typeof($o)=='undefined'?nil:$o));
_f=self.$w(nil,"--");
return _f}

},a$c: "T_TestMassign::TestMassign"});$q = a$d({a$j: [],a$e: nil,a$c: "T_TestClass::X"});$r = a$d({a$j: [$q],a$e: $k,a$c: "T_TestClass::A"});$s = a$d({a$j: [],a$e: $k,a$c: "T_TestClass::D"});$t = a$d({a$j: [],a$e: $k,a$c: "T_TestHotRuby::Foo3"});$u = a$d({a$j: [],a$e: nil,a$c: "T_TestTest"});$w = a$d({a$j: [],a$e: $k,a$c: "T_TestHotRuby::Foo",a$h: {$H:
/* T_TestHotRuby::Foo#main */
function(){var self,_a,_f;
_f=nil;
self=this;
if(self.$K==null)self.$K=nil;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a="Action";
self.$K=" ";
_f=$v.$a().$M(function(_b){var _c,_d;
var _e=nil;
_c=_b==null?nil:_b;
_d="eloquence";
_e=self.$w(nil,_a.$L(nil,self.$K).$L(nil,_c).$L(nil,self.$K).$L(nil,_d).$L(nil," - William Shakespeare"));
return _e});
return _f}

}});$x = a$d({a$j: [],a$e: nil,a$c: "T_TestNew"});$y = a$d({a$j: [],a$e: $k,a$f: {$H:
/* T_TestIf::TestIf.main */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$a().$N();
return _a}

},a$c: "T_TestIf::TestIf",a$h: {$N:
/* T_TestIf::TestIf#test */
function(){var self,_a,_b,_c,_d,_e,_f;
_f=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
if(true){self.$w(nil,"OK")};
if(false){self.$w(nil,"NOT OK")};
if(true){self.$w(nil,"OK")};
if(false){self.$w(nil,"NOT OK")};
if((_a=(_b=true, (_b!==false&&_b!==nil) ? ((_c=true, (_c!==false&&_c!==nil) ? ((_d=(_e=true, (_e!==false&&_e!==nil) ? _e : (false)), (_d!==false&&_d!==nil) ? (true) : _d)) : _c)) : _b),_a!==false&&_a!==nil)){self.$w(nil,"OK")};
if((_a=(_b=(5).$O(nil,6), (_b!==false&&_b!==nil) ? ((6).$O(nil,7)) : _b),_a!==false&&_a!==nil)){self.$w(nil,"OK")};
self.$v(nil,(_a=false, (_a!==false&&_a!==nil) ? _a : ("a")));
self.$v(nil,(_a=nil, (_a!==false&&_a!==nil) ? _a : ("a")));
self.$v(nil,(_a=true, (_a!==false&&_a!==nil) ? _a : ("a")));
self.$v(nil,(_a="b", (_a!==false&&_a!==nil) ? _a : ("a")));
self.$v(nil,(_a=false, (_a!==false&&_a!==nil) ? ("a") : _a));
self.$v(nil,(_a=nil, (_a!==false&&_a!==nil) ? ("a") : _a));
self.$v(nil,(_a=true, (_a!==false&&_a!==nil) ? ("a") : _a));
_f=self.$v(nil,(_a="b", (_a!==false&&_a!==nil) ? ("a") : _a));
return _f}

}});$z = a$d({a$j: [],a$e: $k,a$c: "T_TestLebewesen::Lebewesen",a$h: {$c:
/* T_TestLebewesen::Lebewesen#initialize */
function(_c,_a){var self,_b;
_b=nil;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
_b=self.$P=_a;
return _b}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==27))return _d.a$a;
throw(_d)}}

}});$A = a$d({a$j: [],a$e: $k,a$c: "Boolean",a$d: Boolean,a$h: {$Q:
/* Boolean#== */
function(_b,_a){var self;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
return (self == _a)}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==28))return _c.a$a;
throw(_c)}}

,$q:
/* Boolean#to_s */
function(){var self;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
return (self == true ? 'true' : 'false')}

,$k:
/* Boolean#inspect */
function(){var self;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
return (self == true ? 'true' : 'false')}

}});$j = a$d({a$j: [],a$e: $k,a$c: "Method",a$h: {$c:
/* Method#initialize */
function(_f,_a,_b){var self,_c,_d,_e;
_e=nil;
self=this;
try{if(arguments.length!=3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));
;
(_c=[_a,_b],self.$R=_c[0]==null?nil:_c[0],self.$S=_c[1]==null?nil:_c[1],_c);
_d=nil;
_d = _a[a$f[_b]];
    if (_d==null) _d = nil;;
if((_c=_d,_c!==false&&_c!==nil)){_e=self.$T=_d}else{_e=self.$l(nil,$m,("undefined method `" + ((_b).$q()) + ("' for class `") + ((_a.$B().$e()).$q()) + ("'")))};
return _e}catch(_g){if(_g instanceof a$c && (!_g.a$b || _g.a$b==29))return _g.a$a;
throw(_g)}}

,$U:
/* Method#call */
function(_c){var self,_a,_b,_d;
self=this;
_d=_c==null?nil:_c;
try{_a=[];
for(_b=1;_b<arguments.length;_b++)_a.push(arguments[_b]);
;
return self.$T.apply(self.$R, [_d].concat(_a))}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==30))return _e.a$a;
throw(_e)}}

,$k:
/* Method#inspect */
function(){var self,_a;
_a=nil;
self=this;
if(self.$R==null)self.$R=nil;
if(self.$S==null)self.$S=nil;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=("#<Method: " + ((self.$R.$B().$e()).$q()) + ("#") + ((self.$S).$q()) + (">"));
return _a}

}});$B = a$d({a$j: [],a$e: $r,a$c: "T_TestClass::B"});$C = a$d({a$j: [],a$e: $B,a$c: "T_TestClass::C"});$F = a$d({a$j: [],a$e: $k,a$f: {$H:
/* T_TestLebewesen::TestLebewesen.main */
function(){var self,_a,_b,_c,_d;
_d=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=$D.$a(nil,"AA-BB","Leni");
_b=$D.$a(nil,"AC-DC","Flocki");
_c=$E.$a(nil,"AA-ZZ");
_a.$V();
_c.$W();
_d=_c.$X(nil,_a);
return _d}

},a$c: "T_TestLebewesen::TestLebewesen"});$G = a$d({a$j: [],a$e: $k,a$c: "T_TestHotRuby::Object"});$H = a$d({a$j: [],a$e: nil,a$c: "T_TestExpr"});$I = a$d({a$j: [],a$e: nil,a$c: "T_TestEql"});$J = a$d({a$j: [],a$e: $k,a$c: "T_TestHotRuby::Foo2"});$h = a$d({a$j: [],a$e: $k,a$f: {$a:
/* Proc.new */
function(_a){var self,_b,_c;
self=this;
_b=_a==null?nil:_a;
try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
if((_c=_b,_c===false||_c===nil)){self.$l(nil,$a,"tried to create Proc object without a block")};
return (function() {
      try {
        return _b.$U.apply(_b, arguments);
      } catch(e) 
      {
        if (e instanceof a$c) 
        {
          if (e.a$b == null)
          {;
self.$l(nil,$K,"break from proc-closure");
}
          return e.a$a;
        }
        else throw(e);
      }
    })}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==31))return _d.a$a;
throw(_d)}}

},a$c: "Proc",a$d: Function,a$h: {$U:
/* Proc#call */
function(){var self,_a,_b;
self=this;
_a=[];
for(_b=1;_b<arguments.length;_b++)_a.push(arguments[_b]);
;

    // TODO: use switch/case
    if (_a.length == 0) return self();
    else if (_a.length == 1) return self(_a[0]);
    else return self(_a);}

}});$L = a$d({a$j: [],a$e: $k,a$f: {$H:
/* T_TestSplat::TestSplat.main */
function(){var self,_a,_b;
_b=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$a();
_a.$Y();
_a.$d(nil,'$Y',a$b([]));
_a.$Y(nil,1);
_a.$d(nil,'$Y',a$b([1]));
_a.$d(nil,'$Y',[1].concat(a$b([])));
_a.$Y(nil,1,2);
_a.$d(nil,'$Y',a$b([1,2]));
_a.$d(nil,'$Y',[1].concat(a$b([2])));
_b=_a.$d(nil,'$Y',[1].concat(a$b([1,2])));
return _b}

},a$c: "T_TestSplat::TestSplat",a$h: {$Y:
/* T_TestSplat::TestSplat#m */
function(){var self,_a,_b,_c;
_c=nil;
self=this;
_a=[];
for(_b=1;_b<arguments.length;_b++)_a.push(arguments[_b]);
;
_c=self.$v(nil,_a);
return _c}

}});$M = a$d({a$j: [],a$e: nil,a$c: "T_TestMassign"});$a = a$d({a$j: [],a$e: $l,a$c: "ArgumentError"});$N = a$d({a$j: [],a$e: $k,a$c: "Number",a$d: Number,a$h: {$L:
/* Number#+ */
function(_b,_a){var self;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
return self + _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==35))return _c.a$a;
throw(_c)}}

,$Q:
/* Number#== */
function(_b,_a){var self;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
return self == _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==34))return _c.a$a;
throw(_c)}}

,$1:
/* Number#downto */
function(_d,_a){var self,_b,_c;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
_b=self;
while((_c=_b.$2(nil,_a),_c!==false&&_c!==nil)){_d(_b);
_b=_b.$3(nil,1)};
return self}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==33))return _e.a$a;
throw(_e)}}

,$Z:
/* Number#upto */
function(_d,_a){var self,_b,_c;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
_b=self;
while((_c=_b.$0(nil,_a),_c!==false&&_c!==nil)){_d(_b);
_b=_b.$L(nil,1)};
return self}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==32))return _e.a$a;
throw(_e)}}

,$0:
/* Number#<= */
function(_b,_a){var self;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
return self <= _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==36))return _c.a$a;
throw(_c)}}

,$3:
/* Number#- */
function(_b,_a){var self;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
return self - _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==37))return _c.a$a;
throw(_c)}}

,$4:
/* Number#succ */
function(){var self;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
return self+1}

,$5:
/* Number#/ */
function(_b,_a){var self;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
return self / _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==39))return _c.a$a;
throw(_c)}}

,$q:
/* Number#to_s */
function(_b,_a){var self;
self=this;
try{if(arguments.length>2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
if(_a==null)_a=10;
;
return self.toString(_a)}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==38))return _c.a$a;
throw(_c)}}

,$6:
/* Number#% */
function(_b,_a){var self;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
return self % _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==40))return _c.a$a;
throw(_c)}}

,$9:
/* Number#& */
function(_b,_a){var self;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
return self & _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==44))return _c.a$a;
throw(_c)}}

,$O:
/* Number#< */
function(_b,_a){var self;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
return self < _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==43))return _c.a$a;
throw(_c)}}

,$8:
/* Number#times */
function(_c){var self,_a,_b;
self=this;
try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=0;
while((_b=_a.$O(nil,self),_b!==false&&_b!==nil)){_c(_a);
_a=_a.$L(nil,1)};
return self}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==42))return _d.a$a;
throw(_d)}}

,$7:
/* Number#| */
function(_b,_a){var self;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
return self | _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==41))return _c.a$a;
throw(_c)}}

,$ab:
/* Number#-@ */
function(){var self;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
return -self}

,$aa:
/* Number#> */
function(_b,_a){var self;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
return self > _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==46))return _c.a$a;
throw(_c)}}

,$$:
/* Number#^ */
function(_b,_a){var self;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
return self ^ _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==45))return _c.a$a;
throw(_c)}}

,$_:
/* Number#~ */
function(){var self;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
return ~self}

,$2:
/* Number#>= */
function(_b,_a){var self;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
return self >= _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==47))return _c.a$a;
throw(_c)}}

,$k:
/* Number#inspect */
function(){var self;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
return self.toString()}

,$ad:
/* Number#* */
function(_b,_a){var self;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
return self * _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==48))return _c.a$a;
throw(_c)}}

,$ac:
/* Number#+@ */
function(){var self;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
return self}

}});$O = a$d({a$j: [],a$e: $N,a$c: "Fixnum",a$d: Number});$P = a$d({a$j: [],a$e: $k,a$c: "Regexp",a$d: RegExp});$Q = a$d({a$j: [],a$e: nil,a$c: "T_TestString"});$R = a$d({a$j: [],a$e: nil,a$c: "T_TestLebewesen"});$S = a$d({a$j: [],a$e: $k,a$f: {$ae:
/* TestRunner.run */
function(_j,_a){var self,_b,_i;
_i=nil;
self=this;
if(self.$ah==null)self.$ah=nil;
if(self.$af==null)self.$af=nil;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
(_b=[0,0,0],self.$af=_b[0]==null?nil:_b[0],self.$ag=_b[1]==null?nil:_b[1],self.$ah=_b[2]==null?nil:_b[2],_b);
_a.$i().$x(function(_c){var _d,_e,_g;
var _h=nil;
_d=_c==null?nil:_c;
if((_b=_d.$am(nil,/^test/),_b!==false&&_b!==nil)){_e=_a.$a();
try{try{_e.$ai();
_e.$y(nil,_d);
self.$w(nil,".")}catch(_f){if(_f instanceof a$c)throw(_f);
if((_b=$f.$f(nil,_f),_b!==false&&_b!==nil)){_g=_f;
self.$aj(nil,_a,_d,_g)}else{throw(_f)}}}finally{try{_e.$ak()}catch(_f){if(_f instanceof a$c)throw(_f);
if((_b=$f.$f(nil,_f),_b!==false&&_b!==nil)){_g=_f;
self.$aj(nil,_a,_d,_g)}else{throw(_f)}}};
_h=self.$ah=self.$ah.$L(nil,_e.$al())}else{_h=nil};
return _h});
self.$w(nil,"<br/>");
_i=self.$w(nil,("Assertions: " + ((self.$ah).$q()) + (" Failures: ") + ((self.$af).$q())));
return _i}catch(_f){if(_f instanceof a$c && (!_f.a$b || _f.a$b==49))return _f.a$a;
throw(_f)}}

,$aj:
/* TestRunner.puke */
function(_e,_a,_b,_c){var self,_d;
_d=nil;
self=this;
if(self.$af==null)self.$af=nil;
try{if(arguments.length!=4)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 3)'));
;
self.$w(nil,_c);
_d=self.$af=self.$af.$L(nil,1);
return _d}catch(_f){if(_f instanceof a$c && (!_f.a$b || _f.a$b==50))return _f.a$a;
throw(_f)}}

,$w:
/* TestRunner.puts */
function(_c,_a){var self,_b;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
_b=_a.$q();
document.write(_b);}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==51))return _d.a$a;
throw(_d)}}

},a$c: "TestRunner"});$W = a$d({a$j: [],a$e: $k,a$f: {$H:
/* T_TestSend::TestSend.main */
function(){var self,_b,_c,_d,_e;
_e=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
self.$w(nil,"send");
self.$v(nil,$T.$a().$y(nil,"a_method",1,2));
self.$v(nil,$U.$a().$y(nil,"a_method",1,2));
self.$w(nil,"respond_to?");
self.$v(nil,$T.$a().$t(nil,"a_method"));
self.$v(nil,$T.$a().$t(nil,"to_s"));
self.$v(nil,$T.$a().$t(nil,"inspect"));
self.$v(nil,$T.$a().$t(nil,"b_method"));
self.$v(nil,$T.$a().$t(nil,"c_method"));
self.$w(nil,"method_missing");
self.$v(nil,$V.$a().$t(nil,"blah_blah"));
$V.$a().$an(nil,1,2,3);
try{$T.$a().$an();
self.$w(nil,"FAILURE?")}catch(_a){if(_a instanceof a$c)throw(_a);
if((_b=$g.$f(nil,_a),_b!==false&&_b!==nil)){self.$w(nil,"catched!!!")}else{throw(_a)}};
try{$T.$ao()}catch(_a){if(_a instanceof a$c)throw(_a);
if((_b=$g.$f(nil,_a),_b!==false&&_b!==nil)){self.$v(nil,"goood")}else{throw(_a)}};
self.$w(nil,"class Method");
_c="hallo".$E(nil,"to_s");
self.$v(nil,_c);
self.$v(nil,_c.$U());
_d=[1,2,3];
_c=_d.$E(nil,"+");
self.$v(nil,_c);
self.$v(nil,_c.$U(nil,[2,3]));
self.$v(nil,_c);
_e=self.$v(nil,_d);
return _e}

},a$c: "T_TestSend::TestSend"});$X = a$d({a$j: [],a$e: nil,a$c: "T_TestHash"});$Y = a$d({a$j: [],a$e: $k,a$c: "T_TestHotRuby::Bar_"});$af = a$d({a$j: [],a$e: $k,a$f: {$H:
/* TestSuite.main */
function(){var self,_c,_d,_b;
_b=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
try{self.$w(nil,"~~~~~~~~~~~~~~~~~~~~");
self.$w(nil,"Test args");
self.$w(nil,"~~~~~~~~~~~~~~~~~~~~");
$Z.$H();
self.$w(nil,"~~~~~~~~~~~~~~~~~~~~");
self.$w(nil,"Test array");
self.$w(nil,"~~~~~~~~~~~~~~~~~~~~");
$0.$H();
self.$w(nil,"~~~~~~~~~~~~~~~~~~~~");
self.$w(nil,"Test case");
self.$w(nil,"~~~~~~~~~~~~~~~~~~~~");
$1.$H();
self.$w(nil,"~~~~~~~~~~~~~~~~~~~~");
self.$w(nil,"Test class");
self.$w(nil,"~~~~~~~~~~~~~~~~~~~~");
$2.$H();
self.$w(nil,"~~~~~~~~~~~~~~~~~~~~");
self.$w(nil,"Test eql");
self.$w(nil,"~~~~~~~~~~~~~~~~~~~~");
$3.$H();
self.$w(nil,"~~~~~~~~~~~~~~~~~~~~");
self.$w(nil,"Test exception");
self.$w(nil,"~~~~~~~~~~~~~~~~~~~~");
$4.$H();
self.$w(nil,"~~~~~~~~~~~~~~~~~~~~");
self.$w(nil,"Test expr");
self.$w(nil,"~~~~~~~~~~~~~~~~~~~~");
$5.$H();
self.$w(nil,"~~~~~~~~~~~~~~~~~~~~");
self.$w(nil,"Test hash");
self.$w(nil,"~~~~~~~~~~~~~~~~~~~~");
$6.$H();
self.$w(nil,"~~~~~~~~~~~~~~~~~~~~");
self.$w(nil,"Test hot ruby");
self.$w(nil,"~~~~~~~~~~~~~~~~~~~~");
$7.$H();
self.$w(nil,"~~~~~~~~~~~~~~~~~~~~");
self.$w(nil,"Test if");
self.$w(nil,"~~~~~~~~~~~~~~~~~~~~");
$y.$H();
self.$w(nil,"~~~~~~~~~~~~~~~~~~~~");
self.$w(nil,"Test insertion sort");
self.$w(nil,"~~~~~~~~~~~~~~~~~~~~");
$8.$H();
self.$w(nil,"~~~~~~~~~~~~~~~~~~~~");
self.$w(nil,"Test inspect");
self.$w(nil,"~~~~~~~~~~~~~~~~~~~~");
$9.$H();
self.$w(nil,"~~~~~~~~~~~~~~~~~~~~");
self.$w(nil,"Test lebewesen");
self.$w(nil,"~~~~~~~~~~~~~~~~~~~~");
$F.$H();
self.$w(nil,"~~~~~~~~~~~~~~~~~~~~");
self.$w(nil,"Test massign");
self.$w(nil,"~~~~~~~~~~~~~~~~~~~~");
$p.$H();
self.$w(nil,"~~~~~~~~~~~~~~~~~~~~");
self.$w(nil,"Test new");
self.$w(nil,"~~~~~~~~~~~~~~~~~~~~");
$_.$H();
self.$w(nil,"~~~~~~~~~~~~~~~~~~~~");
self.$w(nil,"Test range");
self.$w(nil,"~~~~~~~~~~~~~~~~~~~~");
$$.$H();
self.$w(nil,"~~~~~~~~~~~~~~~~~~~~");
self.$w(nil,"Test regexp");
self.$w(nil,"~~~~~~~~~~~~~~~~~~~~");
$aa.$H();
self.$w(nil,"~~~~~~~~~~~~~~~~~~~~");
self.$w(nil,"Test send");
self.$w(nil,"~~~~~~~~~~~~~~~~~~~~");
$W.$H();
self.$w(nil,"~~~~~~~~~~~~~~~~~~~~");
self.$w(nil,"Test simple output");
self.$w(nil,"~~~~~~~~~~~~~~~~~~~~");
$ab.$H();
self.$w(nil,"~~~~~~~~~~~~~~~~~~~~");
self.$w(nil,"Test splat");
self.$w(nil,"~~~~~~~~~~~~~~~~~~~~");
$L.$H();
self.$w(nil,"~~~~~~~~~~~~~~~~~~~~");
self.$w(nil,"Test string");
self.$w(nil,"~~~~~~~~~~~~~~~~~~~~");
$ac.$H();
self.$w(nil,"~~~~~~~~~~~~~~~~~~~~");
self.$w(nil,"Test yield");
self.$w(nil,"~~~~~~~~~~~~~~~~~~~~");
$ad.$H();
self.$w(nil,"~~~~~~~~~~~~~~~~~~~~");
self.$w(nil,"Test test");
self.$w(nil,"~~~~~~~~~~~~~~~~~~~~");
_b=$ae.$H()}catch(_a){if(_a instanceof a$c)throw(_a);
if((_d=$f.$f(nil,_a),_d!==false&&_d!==nil)){_c=_a;
self.$v(nil,"unhandled exception");
_b=self.$v(nil,_c)}else{throw(_a)}};
return _b}

},a$c: "TestSuite"});$ac = a$d({a$j: [],a$e: $k,a$f: {$H:
/* T_TestString::TestString.main */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$a().$N();
return _a}

},a$c: "T_TestString::TestString",a$h: {$N:
/* T_TestString::TestString#test */
function(){var self,_a,_i;
_i=nil;
self=this;
if(self.$at==null)self.$at=nil;
if(self.$I==null)self.$I=nil;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
self.$v(nil,"hello");
self.$v(nil,"hallo\b\t\n");
self.$v(nil,"hallo\\leute");
self.$v(nil,"\"super\"");
self.$v(nil,"hello".$ap(nil,"e"));
self.$v(nil,"hello".$ap(nil,"lo"));
self.$v(nil,"hello".$ap(nil,"a"));
self.$v(nil,"hello hello".$ap(nil,"ll"));
self.$v(nil,"hello hello".$ap(nil,"ll",3));
self.$v(nil,"hallo".$aq(nil,0,1));
self.$v(nil,"hallo".$aq(nil,0,2));
self.$v(nil,"hallo".$aq(nil,0,5));
self.$v(nil,"10".$ar(nil,10,"0"));
self.$v(nil,"10".$ar(nil,1,"blah"));
self.$v(nil,"x".$ar(nil,4,"()"));
self.$v(nil,"10".$as(nil,10,"0"));
self.$v(nil,"10".$as(nil,1,"blah"));
self.$v(nil,"x".$as(nil,4,"()"));
self.$v(nil,("abc " + (((1).$L(nil,2)).$q()) + (" def")));
self.$I="hallo".$k();
self.$at=4.5;
self.$v(nil,("" + ((self.$I).$q()) + (",") + ((self.$at).$q())));
_a="hallo".$au(nil,"l","r");
self.$v(nil,_a);
_a="hallo".$au(nil,/ll/,"rr");
self.$v(nil,_a);
_a="hallo".$au(function(){var _c=nil;
;
_c="r";
return _c},/l/);
self.$v(nil,_a);
_a="hallo".$au(function(){var _e=nil;
;
_e="blah blah";
return _e},/ll/);
self.$v(nil,_a);
_i="hallllllo".$au(function(_f){var _g;
var _h=nil;
_g=_f==null?nil:_f;
_h=self.$v(nil,_g);
return _h},/(l)l/);
return _i}

}});$7 = a$d({a$j: [],a$e: $k,a$f: {$H:
/* T_TestHotRuby::TestHotRuby.main */
function(){var self,_a,_b,_c;
_c=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$a();
self.$w(nil,"InsertionSort");
_a.$aw(nil,[3,6,2,5,3,7,1,8]);
self.$w(nil,"Array args");
_b=[" World ","!"];
_a.$d(nil,'$av',["Hello"].concat(a$b(_b)));
self.$w(nil,"Block");
$w.$a().$H();
self.$w(nil,"Class");
self.$w(nil,"PI is about");
self.$w(nil,$ah.$a().$az().$q().$aq(nil,0,13));
_c=self.$w(nil,"Const");
return _c}

},a$c: "T_TestHotRuby::TestHotRuby",a$h: {$av:
/* T_TestHotRuby::TestHotRuby#addPrint */
function(_e,_a,_b,_c){var self,_d;
_d=nil;
self=this;
try{if(arguments.length!=4)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 3)'));
;
_d=self.$w(nil,_a.$L(nil,_b).$L(nil,_c));
return _d}catch(_f){if(_f instanceof a$c && (!_f.a$b || _f.a$b==52))return _f.a$a;
throw(_f)}}

,$aw:
/* T_TestHotRuby::TestHotRuby#sort */
function(_j,_a){var self,_c,_d,_e,_f,_g,_i;
_i=nil;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
self.$w(nil,"Before insertion sort:");
self.$v(nil,_a);
$ag.$a(nil,1,_a.$ay().$3(nil,1),false).$x(function(_b){var _h=nil;
_c=_b==null?nil:_b;
_d=_c;
while((_e=(_f=_d.$2(nil,1), (_f!==false&&_f!==nil) ? (_a.$aq(nil,_d).$O(nil,_a.$aq(nil,_d.$3(nil,1)))) : _f),_e!==false&&_e!==nil)){if((_e=_a.$aq(nil,_d).$O(nil,_a.$aq(nil,_d.$3(nil,1))),_e!==false&&_e!==nil)){_g=_a.$aq(nil,_d);
_a.$ax(nil,_d,_a.$aq(nil,_d.$3(nil,1)));
_a.$ax(nil,_d.$3(nil,1),_g)};
_d=_d.$3(nil,1)};
_h=nil;
;
return _h});
self.$w(nil,"After insertion sort:");
_i=self.$v(nil,_a);
return _i}catch(_k){if(_k instanceof a$c && (!_k.a$b || _k.a$b==53))return _k.a$a;
throw(_k)}}

}});$ai = a$d({a$j: [],a$e: nil,a$c: "T_TestHotRuby"});$$ = a$d({a$j: [],a$e: $k,a$f: {$H:
/* T_TestRange::TestRange.main */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$a().$N();
return _a}

},a$c: "T_TestRange::TestRange",a$h: {$N:
/* T_TestRange::TestRange#test */
function(){var _j,self,_a,_b,_i,_n;
_n=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=$ag.$a(nil,0,2);
self.$v(nil,_a.$aA());
self.$v(nil,_a.$aB());
self.$v(nil,_a);
_b=1;
self.$v(nil,$ag.$a(nil,_b,_b.$L(nil,5),false).$q());
self.$v(nil,$ag.$a(nil,_b,_b.$L(nil,_b),true).$q());
self.$v(nil,$ag.$a(nil,0,2,false).$q());
self.$v(nil,$ag.$a(nil,0,2,true).$q());
$ag.$a(nil,0,4,false).$x(function(_c){var _d=nil;
_b=_c==null?nil:_c;
_d=self.$v(nil,_b);
return _d});
$ag.$a(nil,0,4,true).$x(function(_e){var _f=nil;
_b=_e==null?nil:_e;
_f=self.$v(nil,_b);
return _f});
$ag.$a(nil,-1,-4,false).$x(function(_g){var _h=nil;
_b=_g==null?nil:_g;
_h=self.$v(nil,_b);
return _h});
self.$v(nil,$ag.$a(nil,0,4,false).$aC(nil,4));
self.$v(nil,$ag.$a(nil,0,4,false).$aC(nil,5));
self.$v(nil,$ag.$a(nil,0,4,true).$aC(nil,5));
self.$v(nil,$ag.$a(nil,0,4,true).$aC(nil,4));
self.$v(nil,$ag.$a(nil,0,4,true).$aC(nil,3));
self.$v(nil,$ag.$a(nil,0,4,true).$aC(nil,0));
self.$v(nil,$ag.$a(nil,0,4,true).$aC(nil,-1));
self.$v(nil,$ag.$a(nil,-1,-5,false).$aD());
self.$v(nil,$ag.$a(nil,-5,-1,false).$aD());
_i=$ag.$a(nil,0,4);
self.$v(nil,_i.$aA());
self.$v(nil,_i.$aE());
self.$v(nil,_i.$aB());
self.$v(nil,_i.$aF());
self.$v(nil,_i.$aG());
_i=$ag.$a(nil,1,5,true);
self.$v(nil,_i.$aA());
self.$v(nil,_i.$aE());
self.$v(nil,_i.$aB());
self.$v(nil,_i.$aF());
self.$v(nil,_i.$aG());
self.$v(nil,false.$Q(nil,false));
self.$v(nil,false.$Q(nil,true));
self.$v(nil,true.$Q(nil,false));
self.$v(nil,true.$Q(nil,true));
self.$v(nil,$ag.$a(nil,0,2,false).$Q(nil,$ag.$a(nil,0,2,false)));
self.$v(nil,$ag.$a(nil,0,2,false).$Q(nil,$ag.$a(nil,0,2)));
self.$v(nil,$ag.$a(nil,0,2,false).$Q(nil,$ag.$a(nil,0,2,true)));
_j=55;
self.$v(nil,_j);
$ag.$a(nil,1,100,false).$x(function(_k){var _l=nil;
_b=_k==null?nil:_k;
_l=_j=_b;
return _l});
self.$v(nil,_j);
_j=54;
self.$v(nil,_j);
$ag.$a(nil,1,100,false).$x(function(_m){_j=_m==null?nil:_m;
});
_n=self.$v(nil,_j);
return _n}

}});$e = a$d({a$j: [],a$e: $k,a$c: "String",a$d: String,a$h: {$L:
/* String#+ */
function(_b,_a){var self;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
return(self + _a)}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==55))return _c.a$a;
throw(_c)}}

,$aH:
/* String#sub */
function(_c,_a,_b){var self;
self=this;
try{if(arguments.length!=3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));
;
self.replace(pattern, replacement)}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==54))return _d.a$a;
throw(_d)}}

,$am:
/* String#=~ */
function(_b,_a){var self;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;

    var i = self.search(_a);
    return (i == -1 ? nil : i)}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==57))return _c.a$a;
throw(_c)}}

,$ar:
/* String#rjust */
function(_f,_a,_b){var self,_c,_d,_e;
self=this;
try{if(arguments.length<2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
if(arguments.length>3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));
if(_b==null)_b=" ";
;
if((_c=_b.$n(),_c!==false&&_c!==nil)){self.$l(nil,$a,"zero width padding")};
_d=_a.$3(nil,self.$ay());
if((_c=_d.$0(nil,0),_c!==false&&_c!==nil)){return self};
_e="";
while(_e.length < _d) _e += _b;;
return _e.$aq(nil,0,_d).$L(nil,self)}catch(_g){if(_g instanceof a$c && (!_g.a$b || _g.a$b==56))return _g.a$a;
throw(_g)}}

,$aI:
/* String#size */
function(){var self;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
return self.length}

,$aq:
/* String#[] */
function(_d,_a,_b){var self,_c;
self=this;
try{if(arguments.length<2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
if(arguments.length>3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));
if(_b==null)_b=nil;
;
if((_c=_b.$s(),_c!==false&&_c!==nil)){return self.charAt(_a) || nil}else{if((_c=_b.$O(nil,0),_c!==false&&_c!==nil)){return nil};
return self.substring(_a, _a+_b)}}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==59))return _e.a$a;
throw(_e)}}

,$as:
/* String#ljust */
function(_f,_a,_b){var self,_c,_d,_e;
self=this;
try{if(arguments.length<2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
if(arguments.length>3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));
if(_b==null)_b=" ";
;
if((_c=_b.$n(),_c!==false&&_c!==nil)){self.$l(nil,$a,"zero width padding")};
_d=_a.$3(nil,self.$ay());
if((_c=_d.$0(nil,0),_c!==false&&_c!==nil)){return self};
_e="";
while(_e.length < _d) _e += _b;;
return self.$L(nil,_e.$aq(nil,0,_d))}catch(_g){if(_g instanceof a$c && (!_g.a$b || _g.a$b==58))return _g.a$a;
throw(_g)}}

,$aJ:
/* String#split */
function(_b,_a){var self;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
return self.split(_a)}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==60))return _c.a$a;
throw(_c)}}

,$q:
/* String#to_s */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self;
return _a}

,$ay:
/* String#length */
function(){var self;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
return self.length}

,$aK:
/* String#strip */
function(){var self;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
return self.replace(/^\s+/, '').replace(/\s+$/, '')}

,$n:
/* String#empty? */
function(){var self;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
return(self === "")}

,$au:
/* String#gsub */
function(_g,_a,_b){var self,_c,_d,_e,_f;
self=this;
try{if(arguments.length<2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
if(arguments.length>3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));
if(_b==null)_b=nil;
;
(_c=["",self,nil],_d=_c[0]==null?nil:_c[0],_e=_c[1]==null?nil:_c[1],_f=_c[2]==null?nil:_c[2],_c);
while(_e.length > 0) {
      if (_f = _e.match(_a)) {
        _d += _e.slice(0, _f.index);;
if((_c=_b,_c!==false&&_c!==nil)){_d=_d.$L(nil,_b)}else{_d=_d.$L(nil,_g(_f.$aA()).$q())};
_e = _e.slice(_f.index + _f[0].length);
      } else {
        _d += _e; _e = '';
      }
    } return _d}catch(_h){if(_h instanceof a$c && (!_h.a$b || _h.a$b==62))return _h.a$a;
throw(_h)}}

,$ap:
/* String#index */
function(_c,_a,_b){var self;
self=this;
try{if(arguments.length<2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
if(arguments.length>3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));
if(_b==null)_b=0;
;

    var i = self.indexOf(_a, _b);
    return (i == -1) ? nil : i}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==61))return _d.a$a;
throw(_d)}}

,$k:
/* String#inspect */
function(){var self,_a,_b;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a={
      '\b': '\\b',
      '\t': '\\t',
      '\n': '\\n',
      '\f': '\\f',
      '\r': '\\r',
      '\\': '\\\\'
    };;
_b=self.$au(function(_c){var _d,_e;
_d=_c==null?nil:_c;
_e=_a[_d];
return _e ? _e : 
        '\\u00' + ("0" + _d.charCodeAt().toString(16)).substring(0,2);},/[\x00-\x1f\\]/);
return ('"' + _b.replace(/"/g, '\\"') + '"');}

}});$aj = a$d({a$j: [],a$e: nil,a$c: "Enumerable",a$h: {$aL:
/* Enumerable#collect */
function(_a){var self,_b,_c,_f,_h;
_h=nil;
self=this;
_b=_a==null?nil:_a;
try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_c=[];
self.$x(function(_d){var _e;
var _g=nil;
_e=_d==null?nil:_d;
_g=_c.$aM(nil,((_f=_b,_f!==false&&_f!==nil)?_b.$U(nil,_e):_e));
return _g});
_h=_c;
return _h}catch(_i){if(_i instanceof a$c && (!_i.a$b || _i.a$b==63))return _i.a$a;
throw(_i)}}

,$aN:
/* Enumerable#find_all */
function(_f){var self,_a,_e,_g;
_g=nil;
self=this;
try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=[];
self.$x(function(_b){var _c;
var _d=nil;
_c=_b==null?nil:_b;
if((_e=_f(_c),_e!==false&&_e!==nil)){_d=_a.$aM(nil,_c)}else{_d=nil};
return _d});
_g=_a;
return _g}catch(_h){if(_h instanceof a$c && (!_h.a$b || _h.a$b==64))return _h.a$a;
throw(_h)}}

,$aO:
/* Enumerable#map */
function(_a){var self,_b,_c,_f,_h;
_h=nil;
self=this;
_b=_a==null?nil:_a;
try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_c=[];
self.$x(function(_d){var _e;
var _g=nil;
_e=_d==null?nil:_d;
_g=_c.$aM(nil,((_f=_b,_f!==false&&_f!==nil)?_b.$U(nil,_e):_e));
return _g});
_h=_c;
return _h}catch(_i){if(_i instanceof a$c && (!_i.a$b || _i.a$b==65))return _i.a$a;
throw(_i)}}

,$aD:
/* Enumerable#to_a */
function(){var self,_a,_e;
_e=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=[];
self.$x(function(_b){var _c;
var _d=nil;
_c=_b==null?nil:_b;
_d=_a.$aM(nil,_c);
return _d});
_e=_a;
return _e}

,$aP:
/* Enumerable#reject */
function(_f){var self,_a,_e,_g;
_g=nil;
self=this;
try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=[];
self.$x(function(_b){var _c;
var _d=nil;
_c=_b==null?nil:_b;
if((_e=_f(_c),_e===false||_e===nil)){_d=_a.$aM(nil,_c)}else{_d=nil};
return _d});
_g=_a;
return _g}catch(_h){if(_h instanceof a$c && (!_h.a$b || _h.a$b==66))return _h.a$a;
throw(_h)}}

,$aQ:
/* Enumerable#select */
function(_f){var self,_a,_e,_g;
_g=nil;
self=this;
try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=[];
self.$x(function(_b){var _c;
var _d=nil;
_c=_b==null?nil:_b;
if((_e=_f(_c),_e!==false&&_e!==nil)){_d=_a.$aM(nil,_c)}else{_d=nil};
return _d});
_g=_a;
return _g}catch(_h){if(_h instanceof a$c && (!_h.a$b || _h.a$b==67))return _h.a$a;
throw(_h)}}

}});$ak = a$d({a$j: [$aj],a$e: $k,a$f: {$a:
/* Array.new */
function(){var self;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
return []}

},a$c: "Array",a$d: Array,a$h: {$L:
/* Array#+ */
function(_b,_a){var self;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
return self.concat(_a)}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==71))return _c.a$a;
throw(_c)}}

,$aM:
/* Array#<< */
function(_b,_a){var self;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
self.push(_a); return self}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==70))return _c.a$a;
throw(_c)}}

,$Q:
/* Array#== */
function(_c,_a){var self,_b;
_b=nil;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
_b=self.$g(nil,_a);
return _b}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==69))return _d.a$a;
throw(_d)}}

,$aR:
/* Array#delete */
function(_b,_a){var self;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;

    var del = false;
    for (var i=0; i < self.length; i++)
    {
      if (_a.$g(nil, self[i]))
      {
        self.splice(i,1);
        del = true;
        // stay at the current index unless we are at the last element!
        if (i < self.length-1) --i; 
      }
    }
    return del ? _a : nil}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==68))return _c.a$a;
throw(_c)}}

,$aI:
/* Array#size */
function(){var self;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
return self.length}

,$aq:
/* Array#[] */
function(_b,_a){var self;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
var v = self[_a]; return (v == null ? nil : v)}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==73))return _c.a$a;
throw(_c)}}

,$aU:
/* Array#clear */
function(){var self;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
self.length=0; return self}

,$g:
/* Array#eql? */
function(_h,_a){var self,_c,_g;
_g=nil;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
_g=self.$aT(function(_b){var _d,_e;
var _f=nil;
(_c=a$j(_b),_d=_c[0]==null?nil:_c[0],_e=_c[1]==null?nil:_c[1],_c);
if((_c=_d.$g(nil,_a.$aq(nil,_e)),_c===false||_c===nil)){throw(new a$c(false,72))}else{_f=nil};
return _f});
return _g}catch(_i){if(_i instanceof a$c && (!_i.a$b || _i.a$b==72))return _i.a$a;
throw(_i)}}

,$aS:
/* Array#reverse */
function(){var self;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
return self.concat().reverse()}

,$aL:
/* Array#collect */
function(_a){var self,_b,_c,_f,_h;
_h=nil;
self=this;
_b=_a==null?nil:_a;
try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_c=[];
self.$x(function(_d){var _e;
var _g=nil;
_e=_d==null?nil:_d;
_g=_c.$aM(nil,((_f=_b,_f!==false&&_f!==nil)?_b.$U(nil,_e):_e));
return _g});
_h=_c;
return _h}catch(_i){if(_i instanceof a$c && (!_i.a$b || _i.a$b==74))return _i.a$a;
throw(_i)}}

,$aB:
/* Array#last */
function(){var self;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
var v = self[self.length - 1]; return (v == null ? nil : v)}

,$q:
/* Array#to_s */
function(){var self,_d;
_d=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_d=self.$aO(function(_a){var _b;
var _c=nil;
_b=_a==null?nil:_a;
_c=_b.$q();
return _c}).$aV();
return _d}

,$ax:
/* Array#[]= */
function(_c,_a,_b){var self;
self=this;
try{if(arguments.length!=3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));
;
return (self[_a] = _b)}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==79))return _d.a$a;
throw(_d)}}

,$x:
/* Array#each */
function(_a){var self;
self=this;
try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;

    var elem;
    for (var i=0; i < self.length; i++) {
      elem = self[i];;
_a((elem == null ? nil : elem));
}
    return self}catch(_b){if(_b instanceof a$c && (!_b.a$b || _b.a$b==78))return _b.a$a;
throw(_b)}}

,$aT:
/* Array#each_with_index */
function(_a){var self;
self=this;
try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
  
    var elem;
    for (var i=0; i < self.length; i++) {
      elem = self[i];;
_a([(elem == null ? nil : elem),i]);
}
    return self}catch(_b){if(_b instanceof a$c && (!_b.a$b || _b.a$b==77))return _b.a$a;
throw(_b)}}

,$aA:
/* Array#first */
function(){var self;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
var v = self[0]; return (v == null ? nil : v)}

,$aC:
/* Array#include? */
function(_g,_a){var self,_d,_f;
_f=nil;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
self.$x(function(_b){var _c;
var _e=nil;
_c=_b==null?nil:_b;
if((_d=_c.$g(nil,_a),_d!==false&&_d!==nil)){throw(new a$c(true,76))}else{_e=nil};
return _e});
_f=false;
return _f}catch(_h){if(_h instanceof a$c && (!_h.a$b || _h.a$b==76))return _h.a$a;
throw(_h)}}

,$aN:
/* Array#find_all */
function(_f){var self,_a,_e,_g;
_g=nil;
self=this;
try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=[];
self.$x(function(_b){var _c;
var _d=nil;
_c=_b==null?nil:_b;
if((_e=_f(_c),_e!==false&&_e!==nil)){_d=_a.$aM(nil,_c)}else{_d=nil};
return _d});
_g=_a;
return _g}catch(_h){if(_h instanceof a$c && (!_h.a$b || _h.a$b==75))return _h.a$a;
throw(_h)}}

,$ay:
/* Array#length */
function(){var self;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
return self.length}

,$aW:
/* Array#pop */
function(){var self;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;

    var elem = self.pop();
    return (elem == null ? nil : elem)}

,$m:
/* Array#shift */
function(){var self;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;

    var elem = self.shift();
    return (elem == null ? nil : elem)}

,$aO:
/* Array#map */
function(_a){var self,_b,_c,_f,_h;
_h=nil;
self=this;
_b=_a==null?nil:_a;
try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_c=[];
self.$x(function(_d){var _e;
var _g=nil;
_e=_d==null?nil:_d;
_g=_c.$aM(nil,((_f=_b,_f!==false&&_f!==nil)?_b.$U(nil,_e):_e));
return _g});
_h=_c;
return _h}catch(_i){if(_i instanceof a$c && (!_i.a$b || _i.a$b==80))return _i.a$a;
throw(_i)}}

,$n:
/* Array#empty? */
function(){var self;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
return (self.length == 0)}

,$aD:
/* Array#to_a */
function(){var self,_a,_e;
_e=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=[];
self.$x(function(_b){var _c;
var _d=nil;
_c=_b==null?nil:_b;
_d=_a.$aM(nil,_c);
return _d});
_e=_a;
return _e}

,$aY:
/* Array#push */
function(){var self,_a,_b;
self=this;
_a=[];
for(_b=1;_b<arguments.length;_b++)_a.push(arguments[_b]);
;
self.push.apply(self, _a); return self}

,$aX:
/* Array#to_ary */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self;
return _a}

,$a1:
/* Array#dup */
function(){var self;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
return self.concat()}

,$k:
/* Array#inspect */
function(){var self,_a,_e;
_e=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a="[";
_a=_a.$L(nil,self.$aO(function(_b){var _c;
var _d=nil;
_c=_b==null?nil:_b;
_d=_c.$k();
return _d}).$aV(nil,", "));
_a=_a.$L(nil,"]");
_e=_a;
return _e}

,$a0:
/* Array#reverse! */
function(){var self;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
self.reverse(); return self}

,$aZ:
/* Array#unshift */
function(){var self,_a,_b;
self=this;
_a=[];
for(_b=1;_b<arguments.length;_b++)_a.push(arguments[_b]);
;
self.unshift.apply(self, _a); return self}

,$aP:
/* Array#reject */
function(_f){var self,_a,_e,_g;
_g=nil;
self=this;
try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=[];
self.$x(function(_b){var _c;
var _d=nil;
_c=_b==null?nil:_b;
if((_e=_f(_c),_e===false||_e===nil)){_d=_a.$aM(nil,_c)}else{_d=nil};
return _d});
_g=_a;
return _g}catch(_h){if(_h instanceof a$c && (!_h.a$b || _h.a$b==81))return _h.a$a;
throw(_h)}}

,$aV:
/* Array#join */
function(_i,_a){var self,_b,_d,_h;
_h=nil;
self=this;
try{if(arguments.length>2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
if(_a==null)_a="";
;
_b="";
self.$aT(function(_c){var _e,_f;
var _g=nil;
(_d=a$j(_c),_e=_d[0]==null?nil:_d[0],_f=_d[1]==null?nil:_d[1],_d);
_b=_b.$L(nil,_e.$q());
if((_d=_f.$Q(nil,self.$ay().$3(nil,1)),_d===false||_d===nil)){_g=_b=_b.$L(nil,_a)}else{_g=nil};
return _g});
_h=_b;
return _h}catch(_j){if(_j instanceof a$c && (!_j.a$b || _j.a$b==83))return _j.a$a;
throw(_j)}}

,$aQ:
/* Array#select */
function(_f){var self,_a,_e,_g;
_g=nil;
self=this;
try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=[];
self.$x(function(_b){var _c;
var _d=nil;
_c=_b==null?nil:_b;
if((_e=_f(_c),_e!==false&&_e!==nil)){_d=_a.$aM(nil,_c)}else{_d=nil};
return _d});
_g=_a;
return _g}catch(_h){if(_h instanceof a$c && (!_h.a$b || _h.a$b==82))return _h.a$a;
throw(_h)}}

}});$al = a$d({a$j: [],a$e: nil,a$c: "T_TestArgs"});$am = a$d({a$j: [],a$e: nil,a$c: "T_TestRegexp"});$an = a$d({a$j: [],a$e: nil,a$c: "T_TestYield"});$ao = a$d({a$j: [],a$e: nil,a$c: "T_TestIf"});$ap = a$d({a$j: [],a$e: $J,a$c: "T_TestHotRuby::Object::Bar2",a$h: {$ae:
/* T_TestHotRuby::Object::Bar2#run */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$w(nil,"Foo");
return _a}

}});$ad = a$d({a$j: [],a$e: $k,a$f: {$H:
/* T_TestYield::TestYield.main */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$a().$N();
return _a}

},a$c: "T_TestYield::TestYield",a$h: {$a3:
/* T_TestYield::TestYield#test_loop2 */
function(){var self,_a,_b,_d,_f;
_f=nil;
self=this;
try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
self.$w(nil,"loop2");
_a=0;
_b=self.$a4(function(){var _e=nil;
;
_a=_a.$L(nil,1);
if((_d=_a.$6(nil,2).$Q(nil,1),_d!==false&&_d!==nil)){return nil};
self.$v(nil,_a);
if((_d=_a.$aa(nil,8),_d!==false&&_d!==nil)){throw(new a$c(["out",_a],null))}else{_e=nil};
return _e});
self.$v(nil,_b);
_f=self.$w(nil,"--");
return _f}catch(_g){if(_g instanceof a$c && (!_g.a$b || _g.a$b==85))return _g.a$a;
throw(_g)}}

,$a2:
/* T_TestYield::TestYield#three_times_block */
function(_a){var self,_b,_c;
_c=nil;
self=this;
_b=_a==null?nil:_a;
try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_b.$U(nil,1);
_b.$U(nil,2);
_c=_b.$U(nil,3);
return _c}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==84))return _d.a$a;
throw(_d)}}

,$a6:
/* T_TestYield::TestYield#return_in_block */
function(_a){var self,_b,_c;
_c=nil;
self=this;
_b=_a==null?nil:_a;
try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
self.$v(nil,"return_in_block before");
_b.$U();
_c=self.$v(nil,"return_in_block after");
return _c}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==86))return _d.a$a;
throw(_d)}}

,$a5:
/* T_TestYield::TestYield#test_while_loop */
function(){var self,_a,_b,_c;
_c=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
self.$w(nil,"while-loop");
_a=0;
while(true){_a=_a.$L(nil,1);
if((_b=_a.$6(nil,2).$Q(nil,1),_b!==false&&_b!==nil)){continue};
self.$v(nil,_a);
if((_b=_a.$aa(nil,8),_b!==false&&_b!==nil)){break}};
self.$w(nil,"----");
while((_b=_a.$aa(nil,0),_b!==false&&_b!==nil)){self.$v(nil,_a);
_a=_a.$3(nil,1)};
_c=self.$w(nil,"--");
return _c}

,$a4:
/* T_TestYield::TestYield#loop2 */
function(_a){var self,_b,_c;
_c=nil;
self=this;
_b=_a==null?nil:_a;
try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
while(true){_b.$U()};
_c=self.$v(nil,"not reached");
return _c}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==88))return _d.a$a;
throw(_d)}}

,$a9:
/* T_TestYield::TestYield#test_proc */
function(){var self,_a,_d;
_d=nil;
self=this;
try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
self.$v(nil,"test_proc");
_a=self.$u(function(){;
throw(new a$c(0,87))});
self.$v(nil,_a.$U());
_a=$h.$a(function(){;
throw(new a$c(3,null))});
_d=self.$v(nil,_a.$U());
return _d}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==87))return _e.a$a;
throw(_e)}}

,$a7:
/* T_TestYield::TestYield#test_three_times_indirect */
function(){var self,_d;
_d=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
self.$w(nil,"three_times_indirect");
self.$a8(function(_a){var _b;
var _c=nil;
_b=_a==null?nil:_a;
_c=self.$v(nil,_b);
return _c});
_d=self.$w(nil,"--");
return _d}

,$a_:
/* T_TestYield::TestYield#test_three_times_yield2 */
function(){var self,_d,_e;
_e=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
self.$w(nil,"three_times_yield2");
_e=self.$a$(function(_a){var _b;
var _c=nil;
_b=_a==null?nil:_a;
if((_d=_b.$Q(nil,1),_d!==false&&_d!==nil)){_c=_b}else{return _b.$L(nil,1)};
return _c});
return _e}

,$bb:
/* T_TestYield::TestYield#test_loop */
function(){var self,_a,_b,_d,_f;
_f=nil;
self=this;
try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
self.$w(nil,"loop");
_a=0;
_b=self.$z(function(){var _e=nil;
;
_a=_a.$L(nil,1);
if((_d=_a.$6(nil,2).$Q(nil,1),_d!==false&&_d!==nil)){return nil};
self.$v(nil,_a);
if((_d=_a.$aa(nil,8),_d!==false&&_d!==nil)){throw(new a$c(["out",_a],null))}else{_e=nil};
return _e});
self.$v(nil,_b);
_f=self.$w(nil,"--");
return _f}catch(_g){if(_g instanceof a$c && (!_g.a$b || _g.a$b==89))return _g.a$a;
throw(_g)}}

,$ba:
/* T_TestYield::TestYield#test_three_times_block */
function(){var self,_d;
_d=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
self.$w(nil,"three_times_block");
self.$a2(function(_a){var _b;
var _c=nil;
_b=_a==null?nil:_a;
_c=self.$v(nil,_b);
return _c});
_d=self.$w(nil,"--");
return _d}

,$N:
/* T_TestYield::TestYield#test */
function(){var self,_c,_d,_e;
_e=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
self.$bc();
self.$ba();
self.$a7();
self.$a_();
self.$bb();
self.$a3();
self.$a5();
self.$u(function(){;
}).$U();
try{self.$a9()}catch(_b){if(_b instanceof a$c)throw(_b);
if((_d=$K.$f(nil,_b),_d!==false&&_d!==nil)){_c=_b;
self.$v(nil,_c)}else{throw(_b)}};
_e=self.$v(nil,self.$bd());
return _e}

,$z:
/* T_TestYield::TestYield#loop */
function(_a){var self,_b;
_b=nil;
self=this;
try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
while(true){_a()};
_b=self.$v(nil,"not reached");
return _b}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==92))return _c.a$a;
throw(_c)}}

,$a8:
/* T_TestYield::TestYield#three_times_indirect */
function(_a){var self,_b,_c;
_c=nil;
self=this;
_b=_a==null?nil:_a;
try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
self.$be(_b);
_c=self.$a2(_b);
return _c}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==91))return _d.a$a;
throw(_d)}}

,$be:
/* T_TestYield::TestYield#three_times_yield */
function(_a){var self,_b;
_b=nil;
self=this;
try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a(1);
_a(2);
_b=_a(3);
return _b}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==90))return _c.a$a;
throw(_c)}}

,$a$:
/* T_TestYield::TestYield#three_times_yield2 */
function(_a){var self,_b;
_b=nil;
self=this;
try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
self.$v(nil,_a(1));
self.$v(nil,_a(2));
_b=self.$v(nil,_a(3));
return _b}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==93))return _c.a$a;
throw(_c)}}

,$bd:
/* T_TestYield::TestYield#test_return_in_block */
function(){var self,_b;
_b=nil;
self=this;
try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
self.$v(nil,"before");
self.$a6(function(){;
throw(new a$c(4,94))});
_b=self.$v(nil,"after (NOT)");
return _b}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==94))return _c.a$a;
throw(_c)}}

,$bc:
/* T_TestYield::TestYield#test_three_times_yield */
function(){var self,_d;
_d=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
self.$w(nil,"three_times_yield");
self.$be(function(_a){var _b;
var _c=nil;
_b=_a==null?nil:_a;
_c=self.$v(nil,_b);
return _c});
_d=self.$w(nil,"--");
return _d}

}});$1 = a$d({a$j: [],a$e: $k,a$f: {$H:
/* T_TestCase::TestCase.main */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$a().$N();
return _a}

},a$c: "T_TestCase::TestCase",a$h: {$N:
/* T_TestCase::TestCase#test */
function(){var self,_a,_b,_c,_d;
_d=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=(1).$L(nil,1);
if((_b=(_c=(1).$f(nil,_a), (_c!==false&&_c!==nil) ? _c : ((3).$f(nil,_a))),_b!==false&&_b!==nil)){self.$w(nil,"NOT OKAY")}else{if((_b=(2).$f(nil,_a),_b!==false&&_b!==nil)){self.$w(nil,"OKAY")}else{self.$w(nil,"NOT OKAY")}};
self.$v(nil,$ak.$f(nil,[]));
self.$v(nil,$c.$f(nil,$c.$a()));
_a=1;
if((_b=$O.$f(nil,_a),_b!==false&&_b!==nil)){self.$w(nil,"OK")}else{if((_b=(1).$f(nil,_a),_b!==false&&_b!==nil)){self.$w(nil,"OK")}};
_a=_d=4;
if((_b=$ag.$a(nil,0,3,false).$f(nil,_a),_b!==false&&_b!==nil)){_d=self.$w(nil,"NOT OKAY")}else{if((_b=$ag.$a(nil,1,4,true).$f(nil,_a),_b!==false&&_b!==nil)){_d=self.$w(nil,"NOT OKAY")}else{if((_b=$ag.$a(nil,2,4,false).$f(nil,_a),_b!==false&&_b!==nil)){_d=self.$w(nil,"OKAY")}else{_d=nil}}};
return _d}

}});$ab = a$d({a$j: [],a$e: $k,a$f: {$H:
/* T_TestSimpleOutput::TestSimpleOutput.main */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$w(nil,"Hello World from RubyJS");
return _a}

},a$c: "T_TestSimpleOutput::TestSimpleOutput"});$aq = a$d({a$j: [],a$e: nil,a$c: "T_TestClass"});$K = a$d({a$j: [],a$e: $l,a$c: "LocalJumpError"});$ar = a$d({a$j: [$aj],a$e: $k,a$f: {$bh:
/* Hash.new_from_key_value_list */
function(){var self,_a,_b,_c;
self=this;
_a=[];
for(_b=1;_b<arguments.length;_b++)_a.push(arguments[_b]);
;
if((_b=_a.$ay().$6(nil,2).$Q(nil,0),_b===false||_b===nil)){self.$l(nil,$a)};
_c=self.$b();

    // 
    // we use an associate array to store the items. But unlike
    // Javascript, the entries are arrays which contain the collisions.
    // NOTE that we have to prefix the hash code with a prefix so that
    // there are no collisions with methods etc.   
    // I prefix it for now with ":".
    //
    var items = {};
    var hashed_key, current_key, current_val;
   
    for (var i = 0; i < _a.length; i += 2)
    {
      current_key = _a[i];
      current_val = _a[i+1];
      hashed_key = ":" + current_key.$D();

      // make sure that a bucket exists
      if (!items[hashed_key]) items[hashed_key] = [];

      items[hashed_key].push(current_key, current_val);
    }

    _c.a$k = items; 
    _c.a$l = nil;
    return _c;
    }

,$bi:
/* Hash.new_from_jsobject */
function(_d,_a){var self,_b,_c;
_c=nil;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
_c=_b=self.$a();
return _c}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==103))return _e.a$a;
throw(_e)}}

},a$c: "Hash",a$h: {$aq:
/* Hash#[] */
function(_b,_a){var self;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;

    if (!self.a$k)
    {
      // this is a Javascript Object, not a RubyJS Hash object.
      // we directly look the key up. it's fast but not Ruby-like,
      // so be careful!
      
      var elem = self[_a];
      return (elem == null ? nil : elem);
    }

    var hashed_key = ":" + _a.$D();
    var bucket = self.a$k[hashed_key];

    if (bucket)
    {
      //
      // find the matching element inside the bucket
      //

      for (var i = 0; i < bucket.length; i += 2)
      {
        if (bucket[i].$g(nil,_a))
          return bucket[i+1];
      }
    }

    // no matching key found -> return default value
    return self.a$l;
    }catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==95))return _c.a$a;
throw(_c)}}

,$bf:
/* Hash#keys */
function(){var self,_b,_f;
_b=_f=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_f=self.$aO(function(_a){var _c,_d;
var _e=nil;
(_b=a$j(_a),_c=_b[0]==null?nil:_b[0],_d=_b[1]==null?nil:_b[1],_b);
_e=_c;
return _e});
return _f}

,$aL:
/* Hash#collect */
function(_a){var self,_b,_c,_f,_h;
_h=nil;
self=this;
_b=_a==null?nil:_a;
try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_c=[];
self.$x(function(_d){var _e;
var _g=nil;
_e=_d==null?nil:_d;
_g=_c.$aM(nil,((_f=_b,_f!==false&&_f!==nil)?_b.$U(nil,_e):_e));
return _g});
_h=_c;
return _h}catch(_i){if(_i instanceof a$c && (!_i.a$b || _i.a$b==96))return _i.a$a;
throw(_i)}}

,$q:
/* Hash#to_s */
function(){var self,_a,_c,_g;
_c=_g=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=[];
self.$x(function(_b){var _d,_e;
var _f=nil;
(_c=a$j(_b),_d=_c[0]==null?nil:_c[0],_e=_c[1]==null?nil:_c[1],_c);
_a.$aM(nil,_d);
_f=_a.$aM(nil,_e);
return _f});
_g=_a.$aV(nil,"");
return _g}

,$ax:
/* Hash#[]= */
function(_c,_a,_b){var self;
self=this;
try{if(arguments.length!=3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));
;

    if (!self.a$k)
    {
      // this is a Javascript Object, not a RubyJS Hash object.
      // we directly look the key up. it's fast but not Ruby-like,
      // so be careful!
      
      self[_a] = _b;
      return _b; 
    }

    var hashed_key = ":" + _a.$D();
    var bucket = self.a$k[hashed_key];

    if (bucket)
    {
      //
      // find the matching element inside the bucket
      //

      for (var i = 0; i < bucket.length; i += 2)
      {
        if (bucket[i].$g(nil,_a))
        {
          // overwrite value
          bucket[i+1] = _b;
          return _b;
        }
      }
      // key not found in this bucket. append key, value pair to bucket
      bucket.push(_a, _b);
    }
    else 
    {
      //
      // create new bucket
      //
      self.a$k[hashed_key] = [_a, _b];
    }
    return _b;
    }catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==99))return _d.a$a;
throw(_d)}}

,$x:
/* Hash#each */
function(_a){var self;
self=this;
try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;

    if (!self.a$k)
    {
      // this is a Javascript Object, not a RubyJS Hash object.
      // we directly look the key up. it's fast but not Ruby-like,
      // so be careful!
      var key, value;
      for (key in self)
      {
        value = self[key];;
_a([(key == null ? nil : key),(value == null ? nil : value)]);

      }
      
      return nil;
    }

    var key, bucket, i;
    for (key in self.a$k)
    {
      if (key.charAt(0) == ":")
      {
        bucket = self.a$k[key];
        for (i=0; i<bucket.length; i+=2)
        {;
_a([bucket[i],bucket[i+1]]);

        }
      }
    }
    return nil;
    }catch(_b){if(_b instanceof a$c && (!_b.a$b || _b.a$b==98))return _b.a$a;
throw(_b)}}

,$c:
/* Hash#initialize */
function(){var self;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;

    self.a$k = {}; 
    self.a$l = nil;
    return nil}

,$aN:
/* Hash#find_all */
function(_f){var self,_a,_e,_g;
_g=nil;
self=this;
try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=[];
self.$x(function(_b){var _c;
var _d=nil;
_c=_b==null?nil:_b;
if((_e=_f(_c),_e!==false&&_e!==nil)){_d=_a.$aM(nil,_c)}else{_d=nil};
return _d});
_g=_a;
return _g}catch(_h){if(_h instanceof a$c && (!_h.a$b || _h.a$b==97))return _h.a$a;
throw(_h)}}

,$bg:
/* Hash#values */
function(){var self,_b,_f;
_b=_f=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_f=self.$aO(function(_a){var _c,_d;
var _e=nil;
(_b=a$j(_a),_c=_b[0]==null?nil:_b[0],_d=_b[1]==null?nil:_b[1],_b);
_e=_d;
return _e});
return _f}

,$aO:
/* Hash#map */
function(_a){var self,_b,_c,_f,_h;
_h=nil;
self=this;
_b=_a==null?nil:_a;
try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_c=[];
self.$x(function(_d){var _e;
var _g=nil;
_e=_d==null?nil:_d;
_g=_c.$aM(nil,((_f=_b,_f!==false&&_f!==nil)?_b.$U(nil,_e):_e));
return _g});
_h=_c;
return _h}catch(_i){if(_i instanceof a$c && (!_i.a$b || _i.a$b==100))return _i.a$a;
throw(_i)}}

,$aD:
/* Hash#to_a */
function(){var self,_a,_e;
_e=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=[];
self.$x(function(_b){var _c;
var _d=nil;
_c=_b==null?nil:_b;
_d=_a.$aM(nil,_c);
return _d});
_e=_a;
return _e}

,$k:
/* Hash#inspect */
function(){var self,_a,_c,_g;
_c=_g=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a="{";
_a=_a.$L(nil,self.$aO(function(_b){var _d,_e;
var _f=nil;
(_c=a$j(_b),_d=_c[0]==null?nil:_c[0],_e=_c[1]==null?nil:_c[1],_c);
_f=_d.$k().$L(nil,"=>").$L(nil,_e.$k());
return _f}).$aV(nil,", "));
_a=_a.$L(nil,"}");
_g=_a;
return _g}

,$aP:
/* Hash#reject */
function(_f){var self,_a,_e,_g;
_g=nil;
self=this;
try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=[];
self.$x(function(_b){var _c;
var _d=nil;
_c=_b==null?nil:_b;
if((_e=_f(_c),_e===false||_e===nil)){_d=_a.$aM(nil,_c)}else{_d=nil};
return _d});
_g=_a;
return _g}catch(_h){if(_h instanceof a$c && (!_h.a$b || _h.a$b==101))return _h.a$a;
throw(_h)}}

,$aQ:
/* Hash#select */
function(_f){var self,_a,_e,_g;
_g=nil;
self=this;
try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=[];
self.$x(function(_b){var _c;
var _d=nil;
_c=_b==null?nil:_b;
if((_e=_f(_c),_e!==false&&_e!==nil)){_d=_a.$aM(nil,_c)}else{_d=nil};
return _d});
_g=_a;
return _g}catch(_h){if(_h instanceof a$c && (!_h.a$b || _h.a$b==102))return _h.a$a;
throw(_h)}}

}});$V = a$d({a$j: [],a$e: $k,a$c: "T_TestSend::C",a$h: {$p:
/* T_TestSend::C#method_missing */
function(_d,_a){var self,_b,_c,_e,_f;
_f=nil;
self=this;
_e=_d==null?nil:_d;
try{if(arguments.length<2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
_b=[];
for(_c=2;_c<arguments.length;_c++)_b.push(arguments[_c]);
;
_f=self.$v(nil,("mm: " + ((_a).$q()) + (", ") + ((_b).$q())));
return _f}catch(_g){if(_g instanceof a$c && (!_g.a$b || _g.a$b==104))return _g.a$a;
throw(_g)}}

}});$as = a$d({a$j: [],a$e: nil,a$c: "T_TestSplat"});$8 = a$d({a$j: [],a$e: $k,a$f: {$H:
/* T_TestInsertionSort::TestInsertionSort.main */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$a().$aw(nil,[3,6,2,5,3,7,1,8]);
return _a}

},a$c: "T_TestInsertionSort::TestInsertionSort",a$h: {$aw:
/* T_TestInsertionSort::TestInsertionSort#sort */
function(_j,_a){var self,_c,_d,_e,_f,_g,_i;
_i=nil;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
self.$w(nil,"Before insertion sort:");
self.$v(nil,_a);
$ag.$a(nil,1,_a.$ay().$3(nil,1),false).$x(function(_b){var _h=nil;
_c=_b==null?nil:_b;
_d=_c;
while((_e=(_f=_d.$2(nil,1), (_f!==false&&_f!==nil) ? (_a.$aq(nil,_d).$O(nil,_a.$aq(nil,_d.$3(nil,1)))) : _f),_e!==false&&_e!==nil)){if((_e=_a.$aq(nil,_d).$O(nil,_a.$aq(nil,_d.$3(nil,1))),_e!==false&&_e!==nil)){_g=_a.$aq(nil,_d);
_a.$ax(nil,_d,_a.$aq(nil,_d.$3(nil,1)));
_a.$ax(nil,_d.$3(nil,1),_g)};
_d=_d.$3(nil,1)};
_h=nil;
;
return _h});
self.$w(nil,"After insertion sort:");
_i=self.$v(nil,_a);
return _i}catch(_k){if(_k instanceof a$c && (!_k.a$b || _k.a$b==105))return _k.a$a;
throw(_k)}}

}});$at = a$d({a$j: [],a$e: nil,a$c: "T_TestException"});$au = a$d({a$j: [],a$e: $N,a$c: "Float",a$d: Number});$av = a$d({a$j: [],a$e: $t,a$c: "T_TestHotRuby::Bar3",a$h: {$ae:
/* T_TestHotRuby::Bar3#run */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
self.$w(nil,"Foo");
self.$w(nil,"Foo");
_a=self.$w(nil,"Foo");
return _a}

}});$4 = a$d({a$j: [],a$e: $k,a$f: {$H:
/* T_TestException::TestException.main */
function(){var self,_b,_c,_d;
_d=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
self.$v(nil,"before block");
self.$v(nil,"in block");
self.$v(nil,"after block");
try{self.$v(nil,"block");
self.$v(nil,"else")}catch(_a){if(_a instanceof a$c)throw(_a);
if((_c=$l.$f(nil,_a),_c!==false&&_c!==nil)){self.$v(nil,"rescue")}else{if((_c=$f.$f(nil,_a),_c!==false&&_c!==nil)){_b=_a;
self.$v(nil,"another rescue");
self.$v(nil,_b)}else{throw(_a)}}};
self.$v(nil,$c.$a(nil,"test"));
self.$w(nil,"before begin");
try{try{self.$w(nil,"before raise");
self.$l(nil,$f,"blah");
self.$w(nil,"after raise")}catch(_a){if(_a instanceof a$c)throw(_a);
if((_c=$l.$f(nil,_a),_c!==false&&_c!==nil)){self.$w(nil,"noooo")}else{if((_c=$f.$f(nil,_a),_c!==false&&_c!==nil)){_b=_a;
self.$v(nil,_b);
self.$w(nil,"yes")}else{throw(_a)}}}}finally{self.$w(nil,"ensure")};
self.$w(nil,"after begin");
self.$w(nil,"--");
try{try{self.$w(nil,"abc");
self.$l(nil,"r")}catch(_a){if(_a instanceof a$c)throw(_a);
if((_c=$l.$f(nil,_a),_c!==false&&_c!==nil)){self.$v(nil,_a);
self.$w(nil,"b")}else{throw(_a)}}}finally{self.$w(nil,"e")};
try{_d=self.$v(nil,"hallo".$q(nil,2))}catch(_a){if(_a instanceof a$c)throw(_a);
if((_c=$a.$f(nil,_a),_c!==false&&_c!==nil)){_b=_a;
_d=self.$v(nil,_b)}else{throw(_a)}};
return _d}

},a$c: "T_TestException::TestException"});$aw = a$d({a$j: [],a$e: $k,a$c: "T_TestHotRuby::Foo_"});$ax = a$d({a$j: [],a$e: $aw,a$c: "T_TestHotRuby::Bar_::Baz_",a$h: {$ae:
/* T_TestHotRuby::Bar_::Baz_#run */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
self.$w(nil,"Foo");
_a=self.$w(nil,"Foo");
return _a}

}});$ay = a$d({a$j: [],a$e: nil,a$c: "T_TestInspect"});$aa = a$d({a$j: [],a$e: $k,a$f: {$H:
/* T_TestRegexp::TestRegexp.main */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$a().$N();
return _a}

},a$c: "T_TestRegexp::TestRegexp",a$h: {$N:
/* T_TestRegexp::TestRegexp#test */
function(){var self,_a,_b,_c;
_c=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
if((_a="hallo".$am(nil,/ll/),_a!==false&&_a!==nil)){self.$v(nil,"okay")};
_b="hallo".$am(nil,/ll/);
self.$v(nil,_b);
"hallo".$am(nil,/(ll)/);
self.$v(nil,(RegExp.$1 || nil));
self.$v(nil,(RegExp.$2 || nil));
self.$v(nil,(RegExp.$3 || nil));
"hallo".$am(nil,/a(ll)(o)/);
self.$v(nil,(RegExp.$1 || nil));
self.$v(nil,(RegExp.$2 || nil));
self.$v(nil,(RegExp.$3 || nil));
_c=self.$v(nil,(RegExp.$4 || nil));
return _c}

}});$d = a$d({a$j: [],a$e: $l,a$c: "TypeError"});$az = a$d({a$j: [],a$e: nil,a$c: "T_TestSend"});$E = a$d({a$j: [],a$e: $z,a$c: "T_TestLebewesen::Hund",a$h: {$W:
/* T_TestLebewesen::Hund#wau */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$w(nil,"wau wau");
return _a}

,$X:
/* T_TestLebewesen::Hund#jage */
function(_c,_a){var self,_b;
_b=nil;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
_b=self.$w(nil,"ich jage ".$L(nil,_a.$e()));
return _b}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==106))return _d.a$a;
throw(_d)}}

}});$aA = a$d({a$j: [],a$e: nil,a$c: "T_TestInsertionSort"});a$d({a$j: [],a$g: $b});$ag = a$d({a$j: [],a$e: $k,a$c: "Range",a$h: {$Q:
/* Range#== */
function(_e,_a){var self,_b,_c,_d;
_d=nil;
self=this;
if(self.$bj==null)self.$bj=nil;
if(self.$bk==null)self.$bk=nil;
if(self.$bl==null)self.$bl=nil;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
if (self.constructor != _a.constructor) return false;;
_d=(_b=self.$bj.$Q(nil,_a.$aA()), (_b!==false&&_b!==nil) ? ((_c=self.$bk.$Q(nil,_a.$aB()), (_c!==false&&_c!==nil) ? (self.$bl.$Q(nil,_a.$aG())) : _c)) : _b);
return _d}catch(_f){if(_f instanceof a$c && (!_f.a$b || _f.a$b==107))return _f.a$a;
throw(_f)}}

,$aE:
/* Range#begin */
function(){var self,_a;
_a=nil;
self=this;
if(self.$bj==null)self.$bj=nil;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$bj;
return _a}

,$g:
/* Range#eql? */
function(_e,_a){var self,_b,_c,_d;
_d=nil;
self=this;
if(self.$bj==null)self.$bj=nil;
if(self.$bk==null)self.$bk=nil;
if(self.$bl==null)self.$bl=nil;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
if (self.constructor != _a.constructor) return false;;
_d=(_b=self.$bj.$g(nil,_a.$aA()), (_b!==false&&_b!==nil) ? ((_c=self.$bk.$g(nil,_a.$aB()), (_c!==false&&_c!==nil) ? (self.$bl.$Q(nil,_a.$aG())) : _c)) : _b);
return _d}catch(_f){if(_f instanceof a$c && (!_f.a$b || _f.a$b==108))return _f.a$a;
throw(_f)}}

,$aG:
/* Range#exclude_end? */
function(){var self,_a;
_a=nil;
self=this;
if(self.$bl==null)self.$bl=nil;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$bl;
return _a}

,$aB:
/* Range#last */
function(){var self,_a;
_a=nil;
self=this;
if(self.$bk==null)self.$bk=nil;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$bk;
return _a}

,$q:
/* Range#to_s */
function(){var self,_b,_a;
_a=nil;
self=this;
if(self.$bj==null)self.$bj=nil;
if(self.$bk==null)self.$bk=nil;
if(self.$bl==null)self.$bl=nil;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
if((_b=self.$bl,_b!==false&&_b!==nil)){_a=("" + ((self.$bj).$q()) + ("...") + ((self.$bk).$q()))}else{_a=("" + ((self.$bj).$q()) + ("..") + ((self.$bk).$q()))};
return _a}

,$x:
/* Range#each */
function(_c){var self,_a,_b,_d;
_d=nil;
self=this;
if(self.$bj==null)self.$bj=nil;
if(self.$bk==null)self.$bk=nil;
if(self.$bl==null)self.$bl=nil;
try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$bj;
if((_b=self.$bj.$aa(nil,self.$bk),_b!==false&&_b!==nil)){return nil};
if((_b=self.$bl,_b!==false&&_b!==nil)){while((_b=_a.$O(nil,self.$bk),_b!==false&&_b!==nil)){_c(_a);
_a=_a.$4()};
_d=nil;
}else{while((_b=_a.$0(nil,self.$bk),_b!==false&&_b!==nil)){_c(_a);
_a=_a.$4()};
_d=nil;
};
return _d}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==111))return _e.a$a;
throw(_e)}}

,$aF:
/* Range#end */
function(){var self,_a;
_a=nil;
self=this;
if(self.$bk==null)self.$bk=nil;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$bk;
return _a}

,$aA:
/* Range#first */
function(){var self,_a;
_a=nil;
self=this;
if(self.$bj==null)self.$bj=nil;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$bj;
return _a}

,$aC:
/* Range#include? */
function(_d,_a){var self,_b,_c;
_c=nil;
self=this;
if(self.$bj==null)self.$bj=nil;
if(self.$bk==null)self.$bk=nil;
if(self.$bl==null)self.$bl=nil;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
if((_b=_a.$O(nil,self.$bj),_b!==false&&_b!==nil)){return false};
if((_b=self.$bl,_b!==false&&_b!==nil)){_c=_a.$O(nil,self.$bk)}else{_c=_a.$0(nil,self.$bk)};
return _c}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==110))return _e.a$a;
throw(_e)}}

,$c:
/* Range#initialize */
function(_f,_a,_b,_c){var self,_d,_e;
_e=nil;
self=this;
try{if(arguments.length<3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));
if(arguments.length>4)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 3)'));
if(_c==null)_c=false;
;
(_d=[_a,_b],self.$bj=_d[0]==null?nil:_d[0],self.$bk=_d[1]==null?nil:_d[1],_d);
_e=self.$bl=((_d=_c,_d!==false&&_d!==nil)?true:false);
return _e}catch(_g){if(_g instanceof a$c && (!_g.a$b || _g.a$b==109))return _g.a$a;
throw(_g)}}

,$f:
/* Range#=== */
function(_d,_a){var self,_b,_c;
_c=nil;
self=this;
if(self.$bj==null)self.$bj=nil;
if(self.$bk==null)self.$bk=nil;
if(self.$bl==null)self.$bl=nil;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
if((_b=_a.$O(nil,self.$bj),_b!==false&&_b!==nil)){return false};
if((_b=self.$bl,_b!==false&&_b!==nil)){_c=_a.$O(nil,self.$bk)}else{_c=_a.$0(nil,self.$bk)};
return _c}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==112))return _e.a$a;
throw(_e)}}

,$aD:
/* Range#to_a */
function(){var self,_a,_b,_c;
self=this;
if(self.$bj==null)self.$bj=nil;
if(self.$bk==null)self.$bk=nil;
if(self.$bl==null)self.$bl=nil;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=[];
if((_b=self.$bj.$aa(nil,self.$bk),_b!==false&&_b!==nil)){return _a};
_c=self.$bj;
if((_b=self.$bl,_b!==false&&_b!==nil)){while((_b=_c.$O(nil,self.$bk),_b!==false&&_b!==nil)){_a.$aM(nil,_c);
_c=_c.$4()}}else{while((_b=_c.$0(nil,self.$bk),_b!==false&&_b!==nil)){_a.$aM(nil,_c);
_c=_c.$4()}};
return _a}

,$k:
/* Range#inspect */
function(){var self,_b,_a;
_a=nil;
self=this;
if(self.$bj==null)self.$bj=nil;
if(self.$bk==null)self.$bk=nil;
if(self.$bl==null)self.$bl=nil;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
if((_b=self.$bl,_b!==false&&_b!==nil)){_a=("" + ((self.$bj.$k()).$q()) + ("...") + ((self.$bk.$k()).$q()))}else{_a=("" + ((self.$bj.$k()).$q()) + ("..") + ((self.$bk.$k()).$q()))};
return _a}

,$bm:
/* Range#member? */
function(_d,_a){var self,_b,_c;
_c=nil;
self=this;
if(self.$bj==null)self.$bj=nil;
if(self.$bk==null)self.$bk=nil;
if(self.$bl==null)self.$bl=nil;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
if((_b=_a.$O(nil,self.$bj),_b!==false&&_b!==nil)){return false};
if((_b=self.$bl,_b!==false&&_b!==nil)){_c=_a.$O(nil,self.$bk)}else{_c=_a.$0(nil,self.$bk)};
return _c}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==113))return _e.a$a;
throw(_e)}}

}});$Z = a$d({a$j: [],a$e: $k,a$f: {$H:
/* T_TestArgs::TestArgs.main */
function(){var self,_a,_b;
_b=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$a();
_a.$Y(nil,0);
self.$w(nil,"--");
_a.$Y(nil,1,2);
self.$w(nil,"--");
_a.$Y(nil,1,2,9);
self.$w(nil,"--");
_a.$Y(nil,1,2,9,5);
self.$w(nil,"--");
_a.$Y(nil,1,2,9,5,6);
self.$w(nil,"--");
_b=_a.$Y(nil,1,2,9,5,6,7,8,9,10,11,12);
return _b}

},a$c: "T_TestArgs::TestArgs",a$h: {$Y:
/* T_TestArgs::TestArgs#m */
function(_g,_a,_b,_c){var self,_d,_e,_f;
_f=nil;
self=this;
try{if(arguments.length<2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
if(_b==null)_b=1;
if(_c==null)_c="hallo";
_d=[];
for(_e=4;_e<arguments.length;_e++)_d.push(arguments[_e]);
;
self.$v(nil,_a);
self.$v(nil,_b);
self.$v(nil,_c);
_f=self.$v(nil,_d);
return _f}catch(_h){if(_h instanceof a$c && (!_h.a$b || _h.a$b==114))return _h.a$a;
throw(_h)}}

}});$9 = a$d({a$j: [],a$e: $k,a$f: {$H:
/* T_TestInspect::TestInspect.main */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$a().$N();
return _a}

},a$c: "T_TestInspect::TestInspect",a$h: {$N:
/* T_TestInspect::TestInspect#test */
function(){var self,_a,_b;
_b=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=[$ar.$bh(nil,"Hello","Rubyconf")];
_b=self.$w(nil,_a.$k());
return _b}

}});$aB = a$d({a$j: [],a$e: $k,a$f: {$H:
/* TestCase.main */
function(){var self,_c,_d,_b;
_b=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
try{_b=$S.$ae(nil,self)}catch(_a){if(_a instanceof a$c)throw(_a);
if((_d=$l.$f(nil,_a),_d!==false&&_d!==nil)){_c=_a;
_b=self.$w(nil,_c)}else{throw(_a)}};
return _b}

},a$c: "TestCase",a$h: {$bn:
/* TestCase#_increment_assertions */
function(){var self,_a,_b;
_b=nil;
self=this;
if(self.$bo==null)self.$bo=nil;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
self.$bo=(_a=self.$bo, (_a!==false&&_a!==nil) ? _a : (0));
_b=self.$bo=self.$bo.$L(nil,1);
return _b}

,$br:
/* TestCase#_assertions= */
function(_c,_a){var self,_b;
_b=nil;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
_b=self.$bo=_a;
return _b}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==116))return _d.a$a;
throw(_d)}}

,$bp:
/* TestCase#assert_block */
function(_b,_a){var self,_c;
_c=nil;
self=this;
try{if(arguments.length>2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
if(_a==null)_a="assert_block failed.";
;
_c=self.$bq(nil,_b(),_a);
return _c}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==115))return _d.a$a;
throw(_d)}}

,$ak:
/* TestCase#teardown */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=nil;
return _a}

,$bs:
/* TestCase#assert_equal */
function(_f,_a,_b,_c){var self,_d,_e;
_e=nil;
self=this;
try{if(arguments.length<3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));
if(arguments.length>4)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 3)'));
if(_c==null)_c="";
;
if((_d=_c.$n(),_d===false||_d===nil)){_c=_c.$L(nil,".")};
_e=self.$bq(nil,_a.$Q(nil,_b),("" + ((_c).$q()) + ("\n<") + ((_a.$k()).$q()) + ("> expected but was\n<") + ((_b.$k()).$q()) + (">.")).$aK());
return _e}catch(_g){if(_g instanceof a$c && (!_g.a$b || _g.a$b==117))return _g.a$a;
throw(_g)}}

,$bq:
/* TestCase#assert */
function(_e,_a,_b){var self,_d,_c;
_c=nil;
self=this;
try{if(arguments.length<2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
if(arguments.length>3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));
if(_b==null)_b="failed assertion (no message given)";
;
self.$bn();
if((_d=_a,_d===false||_d===nil)){_c=self.$l(nil,$l,_b)}else{_c=nil};
return _c}catch(_f){if(_f instanceof a$c && (!_f.a$b || _f.a$b==118))return _f.a$a;
throw(_f)}}

,$ai:
/* TestCase#setup */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=nil;
return _a}

,$al:
/* TestCase#_assertions */
function(){var self,_a;
_a=nil;
self=this;
if(self.$bo==null)self.$bo=nil;
_a=self.$bo;
return _a}

}});$ae = a$d({a$j: [],a$e: $aB,a$c: "T_TestTest::TestTest",a$h: {$bu:
/* T_TestTest::TestTest#test_assert_equal */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$bs(nil,(1).$L(nil,1),2,"1 + 1 == 2");
return _a}

,$bt:
/* T_TestTest::TestTest#test_four */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$bq(nil,(2).$L(nil,2).$Q(nil,4),"2 + 2 is four");
return _a}

,$bv:
/* T_TestTest::TestTest#test_good */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$bq(nil,true);
return _a}

}});$T = a$d({a$j: [],a$e: $k,a$c: "T_TestSend::A",a$h: {$bw:
/* T_TestSend::A#a_method */
function(_d,_a,_b){var self,_c;
_c=nil;
self=this;
try{if(arguments.length!=3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));
;
_c=self.$v(nil,_a,_b);
return _c}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==119))return _e.a$a;
throw(_e)}}

}});$U = a$d({a$j: [],a$e: $T,a$c: "T_TestSend::B",a$h: {$bw:
/* T_TestSend::B#a_method */
function(_d,_a,_b){var self;
self=this;
var _c=arguments;
try{if(arguments.length!=3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));
;
self.$v(nil,"in B");
a$k(self,'$bw',_c)}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==120))return _e.a$a;
throw(_e)}}

,$bx:
/* T_TestSend::B#c_method */
function(_c,_a){var self,_b;
_b=nil;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
_b=nil;
return _b}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==121))return _d.a$a;
throw(_d)}}

}});$aC = a$d({a$j: [],a$e: $k,a$c: "NilClass",a$d: NilClass,a$h: {$by:
/* NilClass#to_f */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=0.0;
return _a}

,$s:
/* NilClass#nil? */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=true;
return _a}

,$q:
/* NilClass#to_s */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a="";
return _a}

,$bz:
/* NilClass#to_i */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=0;
return _a}

,$aD:
/* NilClass#to_a */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=[];
return _a}

,$bA:
/* NilClass#to_splat */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=[];
return _a}

,$k:
/* NilClass#inspect */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a="nil";
return _a}

}});$aD = a$d({a$j: [],a$e: $N,a$c: "Bignum",a$d: Number});$aE = a$d({a$j: [],a$e: $k,a$c: "MatchData",a$h: {$c:
/* MatchData#initialize */
function(_c,_a){var self,_b;
_b=nil;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
_b=self.$bB=_a;
return _b}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==122))return _d.a$a;
throw(_d)}}

}});$5 = a$d({a$j: [],a$e: $k,a$f: {$H:
/* T_TestExpr::TestExpr.main */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$a().$N();
return _a}

},a$c: "T_TestExpr::TestExpr",a$h: {$N:
/* T_TestExpr::TestExpr#test */
function(){var self,_a,_b,_c;
_c=nil;
self=this;
try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=(true?1:2);
self.$v(nil,_a);
(_b=_a=true, (_b!==false&&_b!==nil) ? _b : (a$l(new a$c(nil,null))));
_c=self.$v(nil,_a);
return _c}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==123))return _d.a$a;
throw(_d)}}

}});$_ = a$d({a$j: [],a$e: $k,a$f: {$H:
/* T_TestNew::TestNew.main */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$a().$N();
return _a}

},a$c: "T_TestNew::TestNew",a$h: {$c:
/* T_TestNew::TestNew#initialize */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=nil;
return _a}

,$N:
/* T_TestNew::TestNew#test */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$w(nil,"test");
return _a}

}});$aF = a$d({a$j: [],a$e: $J,a$c: "T_TestHotRuby::Bar2",a$h: {$ae:
/* T_TestHotRuby::Bar2#run */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$w(nil,"Foo");
return _a}

}});$aG = a$d({a$j: [],a$e: nil,a$c: "T_TestCase"});$ah = a$d({a$j: [],a$e: $k,a$c: "T_TestHotRuby::Pi",a$h: {$c:
/* T_TestHotRuby::Pi#initialize */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$I=355.0;
return _a}

,$az:
/* T_TestHotRuby::Pi#calc */
function(){var self,_a;
self=this;
if(self.$I==null)self.$I=nil;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=113.0;
return self.$I.$5(nil,_a)}

}});$aH = a$d({a$j: [],a$e: nil,a$c: "T_TestRange"});$6 = a$d({a$j: [],a$e: $k,a$f: {$H:
/* T_TestHash::TestHash.main */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$a().$N();
return _a}

},a$c: "T_TestHash::TestHash",a$h: {$D:
/* T_TestHash::TestHash#hash */
function(){var self;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
var el = {}; el["1"] = null; return el}

,$N:
/* T_TestHash::TestHash#test */
function(){var self,_a,_b,_c;
_c=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=$ar.$bh(nil,"a",6,"b",7,"1",1,1,2,"1,2","hello",[1,2],"good");
self.$v(nil,_a.$aq(nil,"a"));
self.$v(nil,_a.$aq(nil,"b"));
self.$v(nil,_a.$aq(nil,"1"));
self.$v(nil,_a.$aq(nil,1));
self.$v(nil,_a.$aq(nil,"1,2"));
self.$v(nil,_a.$aq(nil,[1,2]));
self.$w(nil,"test native JS hash");
_c=_b=self.$D();
return _c}

}});$v = a$d({a$j: [],a$e: $k,a$c: "T_TestHotRuby::Hoge",a$h: {$M:
/* T_TestHotRuby::Hoge#add_msg */
function(_a){var self,_b,_c;
_c=nil;
self=this;
_b=_a==null?nil:_a;
try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_c=_b.$U(nil,"is");
return _c}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==124))return _d.a$a;
throw(_d)}}

}});$0 = a$d({a$j: [],a$e: $aB,a$c: "T_TestArray::TestArray",a$h: {$bC:
/* T_TestArray::TestArray#test_array */
function(){var self,_a,_b;
_b=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=[1,2,null,[null,null,4]];
self.$bs(nil,_a,[1,2,nil,[nil,nil,4]]);
_b=self.$bq(nil,_a.$g(nil,[1,2,nil,[nil,nil,4]]));
return _b}

,$bD:
/* T_TestArray::TestArray#test_delete */
function(){var self,_a,_b;
_b=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=["a","b","b","b","c"];
_a.$aR(nil,"b");
_b=self.$bs(nil,_a,["a","c"]);
return _b}

,$bE:
/* T_TestArray::TestArray#test_include */
function(){var self,_a,_b;
_b=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
self.$bq(nil,[1,2,3].$aC(nil,2));
_b=self.$bq(nil,(_a=[1,3].$aC(nil,2),_a===false||_a===nil));
return _b}

}});$aI = a$d({a$j: [],a$e: nil,a$c: "T_TestSimpleOutput"});$2 = a$d({a$j: [],a$e: $k,a$f: {$H:
/* T_TestClass::TestClass.main */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
self.$v(nil,$r.$a().$o(nil,$r));
self.$v(nil,$r.$a().$o(nil,$B));
self.$v(nil,$B.$a().$o(nil,$r));
self.$v(nil,$r.$a().$o(nil,$q));
self.$v(nil,$B.$a().$o(nil,$q));
self.$v(nil,$r.$a().$h(nil,$r));
self.$v(nil,$r.$a().$h(nil,$B));
self.$v(nil,$B.$a().$h(nil,$r));
self.$v(nil,$r.$a().$h(nil,$q));
self.$v(nil,$B.$a().$h(nil,$q));
self.$v(nil,$C.$a().$h(nil,$q));
self.$v(nil,$C.$a().$h(nil,$r));
self.$v(nil,$C.$a().$h(nil,$B));
self.$v(nil,$C.$a().$h(nil,$C));
self.$v(nil,$C.$a().$h(nil,$s));
self.$v(nil,$C.$a().$h(nil,$k));
self.$v(nil,$C.$a().$h(nil,$i));
self.$v(nil,$C.$a().$h(nil,$b));
self.$v(nil,"hallo".$B().$e());
self.$v(nil,nil.$B().$e());
self.$v(nil,nil.$o(nil,$aC));
self.$v(nil,"hallo".$o(nil,$e));
self.$v(nil,"hallo".$B());
self.$v(nil,$r);
self.$v(nil,$B);
self.$v(nil,$C);
self.$v(nil,$s);
self.$v(nil,$q);
self.$v(nil,$q.$e());
self.$v(nil,$r.$e());
_a=self.$v(nil,$B.$e());
return _a}

},a$c: "T_TestClass::TestClass"});$c = a$d({a$j: [],a$e: $l,a$c: "RuntimeError"});$aJ = a$d({a$j: [],a$e: nil,a$c: "T_TestArray"});$D = a$d({a$j: [],a$e: $z,a$c: "T_TestLebewesen::Katze",a$h: {$e:
/* T_TestLebewesen::Katze#name */
function(){var self,_a;
_a=nil;
self=this;
if(self.$bF==null)self.$bF=nil;
_a=self.$bF;
return _a}

,$c:
/* T_TestLebewesen::Katze#initialize */
function(_d,_a,_b){var self,_c;
_c=nil;
self=this;
try{if(arguments.length!=3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));
;
a$m(self,'$c',nil,[_a]);
_c=self.$bF=_b;
return _c}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==125))return _e.a$a;
throw(_e)}}

,$V:
/* T_TestLebewesen::Katze#miau */
function(){var self,_a;
_a=nil;
self=this;
if(self.$bF==null)self.$bF=nil;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$w(nil,"miau, ich bin ".$L(nil,self.$bF));
return _a}

}});$3 = a$d({a$j: [],a$e: $k,a$f: {$H:
/* T_TestEql::TestEql.main */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
self.$v(nil,"a".$g(nil,"a"));
self.$v(nil,"a".$g(nil,1));
self.$v(nil,"1".$g(nil,1));
self.$v(nil,[1,2].$g(nil,[1,2]));
_a=self.$v(nil,(1).$g(nil,"1"));
return _a}

},a$c: "T_TestEql::TestEql"});      $b.a$e = $k;
var a$n = [$i,$k,$f,$l,$m,$g,$p,$q,$r,$s,$t,$u,$w,$x,$y,$z,$A,$j,$B,$C,$F,$G,$H,$I,$J,$h,$L,$M,$a,$N,$O,$P,$Q,$R,$S,$W,$X,$Y,$af,$ac,$7,$ai,$$,$e,$aj,$ak,$al,$am,$an,$ao,$ap,$ad,$1,$ab,$aq,$K,$ar,$V,$as,$8,$at,$au,$av,$4,$aw,$ax,$ay,$aa,$d,$az,$E,$aA,$b,$ag,$Z,$9,$aB,$ae,$T,$U,$aC,$aD,$aE,$5,$_,$aF,$aG,$ah,$aH,$6,$v,$0,$aI,$2,$c,$aJ,$D,$3];
a$o(a$n);
for (var i=0; i<a$n.length; i++) a$p(a$n[i]);
$af.$H.apply($af); var STDOUT_LINE_NO = 0;
var FAILURES = 0; 
var TOTAL = 0;

function STDOUT_puts(str)
{
  var out = document.getElementById('out_' + STDOUT_LINE_NO);
  var expected = document.getElementById('exp_' + STDOUT_LINE_NO);

  out.innerHTML = str.replace(/[&]/g, "&amp;").replace(/[<]/g, "&lt;").replace(/[>]/g, "&gt;");

  if (out.innerHTML === expected.innerHTML)
  {
    document.getElementById('line_' + STDOUT_LINE_NO).style.background = '#aaffaa';
  }
  else
  {
    FAILURES += 1;
  }

  STDOUT_LINE_NO += 1;

  document.getElementById('status').innerHTML = 
  "<b>" + STDOUT_LINE_NO + "</b> / " + TOTAL + " (" + FAILURES + " failures)";
}

function start()
{
  main();
}
