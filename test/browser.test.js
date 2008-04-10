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
function a$m(x) { throw(x); }

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
function a$l(a)
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
function a$k(o, m, i, a) 
{
  var r = o[m]; // method in current class
  var c = o.a$g.a$e;
  while (r === c.a$d.prototype[m])
    c = c.a$e;
  return c.a$d.prototype[m].apply(o, [i].concat(a));
}

function a$j(o, m, a) 
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
a$a.$z = function() { return this; };
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
  
  var m = obj.$n;

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
var a$h = {"$a9":"sort","$ai":"test","$O":"sub","$az":"end","$v":"each","$a3":"to_f","$a0":"new_from_jsobject","$an":"m","$x":"loop","$_":"%","$G":"collect","$aA":"member?","$aM":"test_three_times_indirect","$ab":"&","$aD":"new_from_key_value_list","$aI":"test_loop2","$aV":"three_times_yield","$f":"===","$aH":"three_times_block","$7":"==","$a_":"reverse","$a4":"to_i","$aN":"three_times_indirect","$5":"downto","$K":"map","$aa":"times","$t":"p","$ay":"include?","$s":"proc","$b":"allocate","$aW":"keys","$M":"reject","$aQ":"three_times_yield2","$Q":"size","$ah":"*","$P":"+","$aF":"delete","$be":"unshift","$aZ":"values","$aL":"return_in_block","$4":"upto","$bg":"dup","$R":"rjust","$S":"-","$a8":"not_a_method","$q":"nil?","$a":"new","$bd":"push","$aK":"test_while_loop","$9":"/","$I":"call","$D":"message","$y":"is_a?","$Z":"split","$F":"main","$e":"name","$l":"empty?","$a5":"to_splat","$al":"jage","$j":"raise","$T":"length","$o":"to_s","$a$":"clear","$6":">=","$aC":"c_method","$aG":"array","$$":"|","$h":"kind_of?","$J":"find_all","$ac":"~","$aJ":"loop2","$V":"[]","$0":"strip","$aP":"test_three_times_yield2","$aY":"[]=","$af":"-@","$aU":"test_return_in_block","$8":"succ","$bf":"reverse!","$B":"hash","$z":"class","$i":"inspect","$ad":"^","$aR":"test_three_times_block","$aT":"test_three_times_yield","$bb":"pop","$p":"__send","$g":"eql?","$C":"method","$Y":"<","$ak":"wau","$3":"first","$ax":"begin","$H":"<<","$X":"ljust","$d":"__invoke","$ae":">","$U":"<=","$c":"initialize","$w":"send","$r":"respond_to?","$aB":"a_method","$aS":"test_loop","$k":"shift","$a7":"blah_blah","$aw":"exclude_end?","$ag":"+@","$N":"select","$aj":"miau","$L":"to_a","$n":"method_missing","$1":"index","$W":"=~","$ba":"each_with_index","$aX":"join","$aO":"test_proc","$A":"tap","$au":"last","$m":"instance_of?","$bc":"to_ary","$2":"gsub","$u":"puts"};
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
/* Class#inspect */
function(){var self;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
return self.a$c}

}});a$e($b);$i = a$d({a$j: [],a$e: nil,a$c: "Kernel",a$h: {$p:
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
      return self.$n.apply(self, [_e].concat([_a]).concat(_b));}catch(_f){if(_f instanceof a$c && (!_f.a$b || _f.a$b==4))return _f.a$a;
throw(_f)}}

,$n:
/* Kernel#method_missing */
function(_d,_a){var self,_b,_c,_e,_f;
_f=nil;
self=this;
_e=_d==null?nil:_d;
try{if(arguments.length<2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
_b=[];
for(_c=2;_c<arguments.length;_c++)_b.push(arguments[_c]);
;
_f=self.$j(nil,$g,("undefined method `" + (_a).$o() + ("' for ").$o() + (self.$i()).$o()));
return _f}catch(_g){if(_g instanceof a$c && (!_g.a$b || _g.a$b==3))return _g.a$a;
throw(_g)}}

,$j:
/* Kernel#raise */
function(){var self,_a,_b,_c,_d;
self=this;
_a=[];
for(_b=1;_b<arguments.length;_b++)_a.push(arguments[_b]);
;
_c=((_b=_a.$l(),_b!==false&&_b!==nil)?$c.$a(nil,""):(_d=_a.$k(),((_b=_d.$h(nil,$b),_b!==false&&_b!==nil)?_d.$d(nil,'$a',a$b(_a)):((_b=_d.$m(nil,$f),_b!==false&&_b!==nil)?((_b=_a.$l(),_b!==false&&_b!==nil)?_d:$a.$a(nil,"to many arguments given to raise")):((_b=_d.$m(nil,$e),_b!==false&&_b!==nil)?((_b=_a.$l(),_b!==false&&_b!==nil)?$c.$a(nil,_d):$a.$a(nil,"to many arguments given to raise")):$d.$a(nil,"exception class/object expected"))))));
throw(_c)}

,$q:
/* Kernel#nil? */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=false;
return _a}

,$s:
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

,$r:
/* Kernel#respond_to? */
function(_b,_a){var self;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;

    var m = a$f[_a]; 
    return (m !== undefined && self[m] !== undefined && !self[m].a$i)}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==5))return _c.a$a;
throw(_c)}}

,$t:
/* Kernel#p */
function(){var self,_a,_b,_f;
_f=nil;
self=this;
_a=[];
for(_b=1;_b<arguments.length;_b++)_a.push(arguments[_b]);
;
_a.$v(function(_c){var _d;
var _e=nil;
_d=_c==null?nil:_c;
_e=self.$u(nil,_d.$i());
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
      return self.$n.apply(self, 
        [_d].concat([a$h[_a]]).concat(_b));}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==7))return _e.a$a;
throw(_e)}}

,$x:
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

,$u:
/* Kernel#puts */
function(_b,_a){var self;
self=this;
try{if(arguments.length>2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
if(_a==null)_a="";
;
_a=_a.$o();
STDOUT_puts(_a)}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==9))return _c.a$a;
throw(_c)}}

,$w:
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
      return self.$n.apply(self, [_e].concat([_a]).concat(_b));}catch(_f){if(_f instanceof a$c && (!_f.a$b || _f.a$b==8))return _f.a$a;
throw(_f)}}

}});$k = a$d({a$j: [$i],a$e: nil,a$c: "Object",a$h: {$h:
/* Object#kind_of? */
function(_b,_a){var self;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
return a$i(self, _a)}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==11))return _c.a$a;
throw(_c)}}

,$y:
/* Object#is_a? */
function(_b,_a){var self;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
return a$i(self, _a)}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==12))return _c.a$a;
throw(_c)}}

,$z:
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
return (self.constructor == _a.constructor && self == _a)}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==13))return _c.a$a;
throw(_c)}}

,$B:
/* Object#hash */
function(){var self;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
return self.toString()}

,$A:
/* Object#tap */
function(_a){var self,_b;
_b=nil;
self=this;
try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a(self);
_b=self;
return _b}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==14))return _c.a$a;
throw(_c)}}

,$o:
/* Object#to_s */
function(){var self;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
return self.toString()}

,$c:
/* Object#initialize */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=nil;
return _a}

,$C:
/* Object#method */
function(_c,_a){var self,_b;
_b=nil;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
_b=$j.$a(nil,self,_a);
return _b}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==15))return _d.a$a;
throw(_d)}}

,$f:
/* Object#=== */
function(_d,_a){var self,_b,_c;
_c=nil;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
_c=(_b=self.$g(nil,_a), (_b!==false&&_b!==nil) ? _b : (self.$h(nil,_a)));
return _c}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==16))return _e.a$a;
throw(_e)}}

,$m:
/* Object#instance_of? */
function(_b,_a){var self;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
return (self.a$g === _a)}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==17))return _c.a$a;
throw(_c)}}

,$i:
/* Object#inspect */
function(){var self;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
return self.toString()}

}});$f = a$d({a$j: [],a$e: $k,a$c: "Exception",a$h: {$D:
/* Exception#message */
function(){var self,_a;
_a=nil;
self=this;
if(self.$E==null)self.$E=nil;
_a=self.$E;
return _a}

,$o:
/* Exception#to_s */
function(){var self,_a;
_a=nil;
self=this;
if(self.$E==null)self.$E=nil;
_a=self.$E;
return _a}

,$c:
/* Exception#initialize */
function(_d,_a){var self,_c,_b;
_b=nil;
self=this;
try{if(arguments.length>2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
if(_a==null)_a=nil;
;
if((_c=_a.$q(),_c!==false&&_c!==nil)){_b=self.$E=self.$z().$e()}else{_b=self.$E=_a};
return _b}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==18))return _e.a$a;
throw(_e)}}

,$i:
/* Exception#inspect */
function(){var self,_a;
_a=nil;
self=this;
if(self.$E==null)self.$E=nil;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=("#<" + (self.$z().$e()).$o() + (": ").$o() + (self.$E).$o() + (">").$o());
return _a}

}});$l = a$d({a$j: [],a$e: $f,a$c: "StandardError"});$m = a$d({a$j: [],a$e: $k,a$f: {$F:
/* T_TestSimpleOutput::TestSimpleOutput.main */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$u(nil,"Hello World from RubyJS");
return _a}

},a$c: "T_TestSimpleOutput::TestSimpleOutput"});$n = a$d({a$j: [],a$e: nil,a$c: "T_TestLebewesen"});$o = a$d({a$j: [],a$e: nil,a$c: "Enumerable",a$h: {$G:
/* Enumerable#collect */
function(_a){var self,_b,_c,_f,_h;
_h=nil;
self=this;
_b=_a==null?nil:_a;
try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_c=[];
self.$v(function(_d){var _e;
var _g=nil;
_e=_d==null?nil:_d;
_g=_c.$H(nil,((_f=_b,_f!==false&&_f!==nil)?_b.$I(nil,_e):_e));
return _g});
_h=_c;
return _h}catch(_i){if(_i instanceof a$c && (!_i.a$b || _i.a$b==19))return _i.a$a;
throw(_i)}}

,$J:
/* Enumerable#find_all */
function(_f){var self,_a,_e,_g;
_g=nil;
self=this;
try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=[];
self.$v(function(_b){var _c;
var _d=nil;
_c=_b==null?nil:_b;
if((_e=_f(_c),_e!==false&&_e!==nil)){_d=_a.$H(nil,_c)}else{_d=nil};
return _d});
_g=_a;
return _g}catch(_h){if(_h instanceof a$c && (!_h.a$b || _h.a$b==20))return _h.a$a;
throw(_h)}}

,$K:
/* Enumerable#map */
function(_a){var self,_b,_c,_f,_h;
_h=nil;
self=this;
_b=_a==null?nil:_a;
try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_c=[];
self.$v(function(_d){var _e;
var _g=nil;
_e=_d==null?nil:_d;
_g=_c.$H(nil,((_f=_b,_f!==false&&_f!==nil)?_b.$I(nil,_e):_e));
return _g});
_h=_c;
return _h}catch(_i){if(_i instanceof a$c && (!_i.a$b || _i.a$b==21))return _i.a$a;
throw(_i)}}

,$L:
/* Enumerable#to_a */
function(){var self,_a,_e;
_e=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=[];
self.$v(function(_b){var _c;
var _d=nil;
_c=_b==null?nil:_b;
_d=_a.$H(nil,_c);
return _d});
_e=_a;
return _e}

,$M:
/* Enumerable#reject */
function(_f){var self,_a,_e,_g;
_g=nil;
self=this;
try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=[];
self.$v(function(_b){var _c;
var _d=nil;
_c=_b==null?nil:_b;
if((_e=_f(_c),_e===false||_e===nil)){_d=_a.$H(nil,_c)}else{_d=nil};
return _d});
_g=_a;
return _g}catch(_h){if(_h instanceof a$c && (!_h.a$b || _h.a$b==22))return _h.a$a;
throw(_h)}}

,$N:
/* Enumerable#select */
function(_f){var self,_a,_e,_g;
_g=nil;
self=this;
try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=[];
self.$v(function(_b){var _c;
var _d=nil;
_c=_b==null?nil:_b;
if((_e=_f(_c),_e!==false&&_e!==nil)){_d=_a.$H(nil,_c)}else{_d=nil};
return _d});
_g=_a;
return _g}catch(_h){if(_h instanceof a$c && (!_h.a$b || _h.a$b==23))return _h.a$a;
throw(_h)}}

}});$e = a$d({a$j: [],a$e: $k,a$c: "String",a$d: String,a$h: {$P:
/* String#+ */
function(_b,_a){var self;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
return(self + _a)}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==25))return _c.a$a;
throw(_c)}}

,$O:
/* String#sub */
function(_c,_a,_b){var self;
self=this;
try{if(arguments.length!=3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));
;
self.replace(pattern, replacement)}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==24))return _d.a$a;
throw(_d)}}

,$W:
/* String#=~ */
function(_b,_a){var self;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;

    var i = self.search(_a);
    return (i == -1 ? nil : i)}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==27))return _c.a$a;
throw(_c)}}

,$R:
/* String#rjust */
function(_f,_a,_b){var self,_c,_d,_e;
self=this;
try{if(arguments.length<2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
if(arguments.length>3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));
if(_b==null)_b=" ";
;
if((_c=_b.$l(),_c!==false&&_c!==nil)){self.$j(nil,$a,"zero width padding")};
_d=_a.$S(nil,self.$T());
if((_c=_d.$U(nil,0),_c!==false&&_c!==nil)){return self};
_e="";
while(_e.length < _d) _e += _b;;
return _e.$V(nil,0,_d).$P(nil,self)}catch(_g){if(_g instanceof a$c && (!_g.a$b || _g.a$b==26))return _g.a$a;
throw(_g)}}

,$Q:
/* String#size */
function(){var self;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
return self.length}

,$V:
/* String#[] */
function(_d,_a,_b){var self,_c;
self=this;
try{if(arguments.length<2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
if(arguments.length>3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));
if(_b==null)_b=nil;
;
if((_c=_b.$q(),_c!==false&&_c!==nil)){return self.charAt(_a) || nil}else{if((_c=_b.$Y(nil,0),_c!==false&&_c!==nil)){return nil};
return self.substring(_a, _a+_b)}}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==29))return _e.a$a;
throw(_e)}}

,$X:
/* String#ljust */
function(_f,_a,_b){var self,_c,_d,_e;
self=this;
try{if(arguments.length<2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
if(arguments.length>3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));
if(_b==null)_b=" ";
;
if((_c=_b.$l(),_c!==false&&_c!==nil)){self.$j(nil,$a,"zero width padding")};
_d=_a.$S(nil,self.$T());
if((_c=_d.$U(nil,0),_c!==false&&_c!==nil)){return self};
_e="";
while(_e.length < _d) _e += _b;;
return self.$P(nil,_e.$V(nil,0,_d))}catch(_g){if(_g instanceof a$c && (!_g.a$b || _g.a$b==28))return _g.a$a;
throw(_g)}}

,$Z:
/* String#split */
function(_b,_a){var self;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
return self.split(_a)}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==30))return _c.a$a;
throw(_c)}}

,$o:
/* String#to_s */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self;
return _a}

,$T:
/* String#length */
function(){var self;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
return self.length}

,$0:
/* String#strip */
function(){var self;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
return self.replace(/^\s+/, '').replace(/\s+$/, '')}

,$l:
/* String#empty? */
function(){var self;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
return(self === "")}

,$2:
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
if((_c=_b,_c!==false&&_c!==nil)){_d=_d.$P(nil,_b)}else{_d=_d.$P(nil,_g(_f.$3()).$o())};
_e = _e.slice(_f.index + _f[0].length);
      } else {
        _d += _e; _e = '';
      }
    } return _d}catch(_h){if(_h instanceof a$c && (!_h.a$b || _h.a$b==32))return _h.a$a;
throw(_h)}}

,$1:
/* String#index */
function(_c,_a,_b){var self;
self=this;
try{if(arguments.length<2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
if(arguments.length>3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));
if(_b==null)_b=0;
;

    var i = self.indexOf(_a, _b);
    return (i == -1) ? nil : i}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==31))return _d.a$a;
throw(_d)}}

,$i:
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
_b=self.$2(function(_c){var _d,_e;
_d=_c==null?nil:_c;
_e=_a[_d];
return _e ? _e : 
        '\\u00' + ("0" + _d.charCodeAt().toString(16)).substring(0,2);},/[\x00-\x1f\\]/);
return ('"' + _b.replace(/"/g, '\\"') + '"');}

}});$p = a$d({a$j: [],a$e: nil,a$c: "T_TestIf"});$q = a$d({a$j: [],a$e: $k,a$c: "Number",a$d: Number,a$h: {$P:
/* Number#+ */
function(_b,_a){var self;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
return self + _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==36))return _c.a$a;
throw(_c)}}

,$7:
/* Number#== */
function(_b,_a){var self;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
return self == _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==35))return _c.a$a;
throw(_c)}}

,$5:
/* Number#downto */
function(_d,_a){var self,_b,_c;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
_b=self;
while((_c=_b.$6(nil,_a),_c!==false&&_c!==nil)){_d(_b);
_b=_b.$S(nil,1)};
return self}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==34))return _e.a$a;
throw(_e)}}

,$4:
/* Number#upto */
function(_d,_a){var self,_b,_c;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
_b=self;
while((_c=_b.$U(nil,_a),_c!==false&&_c!==nil)){_d(_b);
_b=_b.$P(nil,1)};
return self}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==33))return _e.a$a;
throw(_e)}}

,$U:
/* Number#<= */
function(_b,_a){var self;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
return self <= _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==37))return _c.a$a;
throw(_c)}}

,$S:
/* Number#- */
function(_b,_a){var self;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
return self - _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==38))return _c.a$a;
throw(_c)}}

,$8:
/* Number#succ */
function(){var self;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
return self+1}

,$9:
/* Number#/ */
function(_b,_a){var self;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
return self / _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==40))return _c.a$a;
throw(_c)}}

,$o:
/* Number#to_s */
function(_b,_a){var self;
self=this;
try{if(arguments.length>2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
if(_a==null)_a=10;
;
return self.toString(_a)}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==39))return _c.a$a;
throw(_c)}}

,$_:
/* Number#% */
function(_b,_a){var self;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
return self % _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==41))return _c.a$a;
throw(_c)}}

,$ab:
/* Number#& */
function(_b,_a){var self;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
return self & _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==45))return _c.a$a;
throw(_c)}}

,$Y:
/* Number#< */
function(_b,_a){var self;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
return self < _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==44))return _c.a$a;
throw(_c)}}

,$aa:
/* Number#times */
function(_c){var self,_a,_b;
self=this;
try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=0;
while((_b=_a.$Y(nil,self),_b!==false&&_b!==nil)){_c(_a);
_a=_a.$P(nil,1)};
return self}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==43))return _d.a$a;
throw(_d)}}

,$$:
/* Number#| */
function(_b,_a){var self;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
return self | _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==42))return _c.a$a;
throw(_c)}}

,$af:
/* Number#-@ */
function(){var self;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
return -self}

,$ae:
/* Number#> */
function(_b,_a){var self;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
return self > _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==47))return _c.a$a;
throw(_c)}}

,$ad:
/* Number#^ */
function(_b,_a){var self;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
return self ^ _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==46))return _c.a$a;
throw(_c)}}

,$ac:
/* Number#~ */
function(){var self;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
return ~self}

,$6:
/* Number#>= */
function(_b,_a){var self;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
return self >= _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==48))return _c.a$a;
throw(_c)}}

,$i:
/* Number#inspect */
function(){var self;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
return self.toString()}

,$ah:
/* Number#* */
function(_b,_a){var self;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
return self * _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==49))return _c.a$a;
throw(_c)}}

,$ag:
/* Number#+@ */
function(){var self;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
return self}

}});$r = a$d({a$j: [],a$e: $q,a$c: "Float",a$d: Number});$s = a$d({a$j: [],a$e: $k,a$f: {$F:
/* T_TestRegexp::TestRegexp.main */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$a().$ai();
return _a}

},a$c: "T_TestRegexp::TestRegexp",a$h: {$ai:
/* T_TestRegexp::TestRegexp#test */
function(){var self,_a,_b,_c;
_c=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
if((_a="hallo".$W(nil,/ll/),_a!==false&&_a!==nil)){self.$t(nil,"okay")};
_b="hallo".$W(nil,/ll/);
self.$t(nil,_b);
"hallo".$W(nil,/(ll)/);
self.$t(nil,(RegExp.$1 || nil));
self.$t(nil,(RegExp.$2 || nil));
self.$t(nil,(RegExp.$3 || nil));
"hallo".$W(nil,/a(ll)(o)/);
self.$t(nil,(RegExp.$1 || nil));
self.$t(nil,(RegExp.$2 || nil));
self.$t(nil,(RegExp.$3 || nil));
_c=self.$t(nil,(RegExp.$4 || nil));
return _c}

}});$t = a$d({a$j: [],a$e: nil,a$c: "T_TestYield"});$u = a$d({a$j: [],a$e: nil,a$c: "T_TestArgs"});$v = a$d({a$j: [],a$e: $k,a$f: {$F:
/* T_TestNew::TestNew.main */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$a().$ai();
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

,$ai:
/* T_TestNew::TestNew#test */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$u(nil,"test");
return _a}

}});$h = a$d({a$j: [],a$e: $k,a$f: {$a:
/* Proc.new */
function(_a){var self,_b,_c;
self=this;
_b=_a==null?nil:_a;
try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
if((_c=_b,_c===false||_c===nil)){self.$j(nil,$a,"tried to create Proc object without a block")};
return (function() {
      try {
        return _b.$I.apply(_b, arguments);
      } catch(e) 
      {
        if (e instanceof a$c) 
        {
          if (e.a$b == null)
          {;
self.$j(nil,$w,"break from proc-closure");
}
          return e.a$a;
        }
        else throw(e);
      }
    })}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==50))return _d.a$a;
throw(_d)}}

},a$c: "Proc",a$d: Function,a$h: {$I:
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

}});$x = a$d({a$j: [],a$e: $k,a$c: "T_TestSend::C",a$h: {$n:
/* T_TestSend::C#method_missing */
function(_d,_a){var self,_b,_c,_e,_f;
_f=nil;
self=this;
_e=_d==null?nil:_d;
try{if(arguments.length<2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
_b=[];
for(_c=2;_c<arguments.length;_c++)_b.push(arguments[_c]);
;
_f=self.$t(nil,("mm: " + (_a).$o() + (", ").$o() + (_b).$o()));
return _f}catch(_g){if(_g instanceof a$c && (!_g.a$b || _g.a$b==51))return _g.a$a;
throw(_g)}}

}});$y = a$d({a$j: [],a$e: $q,a$c: "Bignum",a$d: Number});$B = a$d({a$j: [],a$e: $k,a$f: {$F:
/* T_TestLebewesen::TestLebewesen.main */
function(){var self,_a,_b,_c,_d;
_d=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=$z.$a(nil,"AA-BB","Leni");
_b=$z.$a(nil,"AC-DC","Flocki");
_c=$A.$a(nil,"AA-ZZ");
_a.$aj();
_c.$ak();
_d=_c.$al(nil,_a);
return _d}

},a$c: "T_TestLebewesen::TestLebewesen"});$C = a$d({a$j: [],a$e: nil,a$c: "T_TestException"});$w = a$d({a$j: [],a$e: $l,a$c: "LocalJumpError"});$D = a$d({a$j: [],a$e: nil,a$c: "T_TestExpr"});$H = a$d({a$j: [],a$e: $k,a$f: {$F:
/* T_TestCase::TestCase.main */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$a().$ai();
return _a}

},a$c: "T_TestCase::TestCase",a$h: {$ai:
/* T_TestCase::TestCase#test */
function(){var self,_a,_b,_c,_d;
_d=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=(1).$P(nil,1);
if((_b=(_c=(1).$f(nil,_a), (_c!==false&&_c!==nil) ? _c : ((3).$f(nil,_a))),_b!==false&&_b!==nil)){self.$u(nil,"NOT OKAY")}else{if((_b=(2).$f(nil,_a),_b!==false&&_b!==nil)){self.$u(nil,"OKAY")}else{self.$u(nil,"NOT OKAY")}};
self.$t(nil,$E.$f(nil,[]));
self.$t(nil,$c.$f(nil,$c.$a()));
_a=1;
if((_b=$F.$f(nil,_a),_b!==false&&_b!==nil)){self.$u(nil,"OK")}else{if((_b=(1).$f(nil,_a),_b!==false&&_b!==nil)){self.$u(nil,"OK")}};
_a=_d=4;
if((_b=$G.$a(nil,0,3,false).$f(nil,_a),_b!==false&&_b!==nil)){_d=self.$u(nil,"NOT OKAY")}else{if((_b=$G.$a(nil,1,4,true).$f(nil,_a),_b!==false&&_b!==nil)){_d=self.$u(nil,"NOT OKAY")}else{if((_b=$G.$a(nil,2,4,false).$f(nil,_a),_b!==false&&_b!==nil)){_d=self.$u(nil,"OKAY")}else{_d=nil}}};
return _d}

}});$I = a$d({a$j: [],a$e: nil,a$c: "T_TestSplat"});$d = a$d({a$j: [],a$e: $l,a$c: "TypeError"});$J = a$d({a$j: [],a$e: $k,a$f: {$F:
/* T_TestException::TestException.main */
function(){var self,_b,_c,_d;
_d=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
self.$t(nil,"before block");
self.$t(nil,"in block");
self.$t(nil,"after block");
try{self.$t(nil,"block");
self.$t(nil,"else")}catch(_a){if(_a instanceof a$c)throw(_a);
if((_c=$l.$f(nil,_a),_c!==false&&_c!==nil)){self.$t(nil,"rescue")}else{if((_c=$f.$f(nil,_a),_c!==false&&_c!==nil)){_b=_a;
self.$t(nil,"another rescue");
self.$t(nil,_b)}else{throw(_a)}}};
self.$t(nil,$c.$a(nil,"test"));
self.$u(nil,"before begin");
try{try{self.$u(nil,"before raise");
self.$j(nil,$f,"blah");
self.$u(nil,"after raise")}catch(_a){if(_a instanceof a$c)throw(_a);
if((_c=$l.$f(nil,_a),_c!==false&&_c!==nil)){self.$u(nil,"noooo")}else{if((_c=$f.$f(nil,_a),_c!==false&&_c!==nil)){_b=_a;
self.$t(nil,_b);
self.$u(nil,"yes")}else{throw(_a)}}}}finally{self.$u(nil,"ensure")};
self.$u(nil,"after begin");
self.$u(nil,"--");
try{try{self.$u(nil,"abc");
self.$j(nil,"r")}catch(_a){if(_a instanceof a$c)throw(_a);
if((_c=$l.$f(nil,_a),_c!==false&&_c!==nil)){self.$t(nil,_a);
self.$u(nil,"b")}else{throw(_a)}}}finally{self.$u(nil,"e")};
try{_d=self.$t(nil,"hallo".$o(nil,2))}catch(_a){if(_a instanceof a$c)throw(_a);
if((_c=$a.$f(nil,_a),_c!==false&&_c!==nil)){_b=_a;
_d=self.$t(nil,_b)}else{throw(_a)}};
return _d}

},a$c: "T_TestException::TestException"});$K = a$d({a$j: [],a$e: $k,a$f: {$F:
/* T_TestIf::TestIf.main */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$a().$ai();
return _a}

},a$c: "T_TestIf::TestIf",a$h: {$ai:
/* T_TestIf::TestIf#test */
function(){var self,_a,_b,_c,_d,_e,_f;
_f=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
if(true){self.$u(nil,"OK")};
if(false){self.$u(nil,"NOT OK")};
if(true){self.$u(nil,"OK")};
if(false){self.$u(nil,"NOT OK")};
if((_a=(_b=true, (_b!==false&&_b!==nil) ? ((_c=true, (_c!==false&&_c!==nil) ? ((_d=(_e=true, (_e!==false&&_e!==nil) ? _e : (false)), (_d!==false&&_d!==nil) ? (true) : _d)) : _c)) : _b),_a!==false&&_a!==nil)){self.$u(nil,"OK")};
if((_a=(_b=(5).$Y(nil,6), (_b!==false&&_b!==nil) ? ((6).$Y(nil,7)) : _b),_a!==false&&_a!==nil)){self.$u(nil,"OK")};
self.$t(nil,(_a=false, (_a!==false&&_a!==nil) ? _a : ("a")));
self.$t(nil,(_a=nil, (_a!==false&&_a!==nil) ? _a : ("a")));
self.$t(nil,(_a=true, (_a!==false&&_a!==nil) ? _a : ("a")));
self.$t(nil,(_a="b", (_a!==false&&_a!==nil) ? _a : ("a")));
self.$t(nil,(_a=false, (_a!==false&&_a!==nil) ? ("a") : _a));
self.$t(nil,(_a=nil, (_a!==false&&_a!==nil) ? ("a") : _a));
self.$t(nil,(_a=true, (_a!==false&&_a!==nil) ? ("a") : _a));
_f=self.$t(nil,(_a="b", (_a!==false&&_a!==nil) ? ("a") : _a));
return _f}

}});$L = a$d({a$j: [],a$e: $k,a$c: "MatchData",a$h: {$c:
/* MatchData#initialize */
function(_c,_a){var self,_b;
_b=nil;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
_b=self.$am=_a;
return _b}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==52))return _d.a$a;
throw(_d)}}

}});$M = a$d({a$j: [],a$e: $k,a$f: {$F:
/* T_TestArgs::TestArgs.main */
function(){var self,_a,_b;
_b=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$a();
_a.$an(nil,0);
self.$u(nil,"--");
_a.$an(nil,1,2);
self.$u(nil,"--");
_a.$an(nil,1,2,9);
self.$u(nil,"--");
_a.$an(nil,1,2,9,5);
self.$u(nil,"--");
_a.$an(nil,1,2,9,5,6);
self.$u(nil,"--");
_b=_a.$an(nil,1,2,9,5,6,7,8,9,10,11,12);
return _b}

},a$c: "T_TestArgs::TestArgs",a$h: {$an:
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
self.$t(nil,_a);
self.$t(nil,_b);
self.$t(nil,_c);
_f=self.$t(nil,_d);
return _f}catch(_h){if(_h instanceof a$c && (!_h.a$b || _h.a$b==53))return _h.a$a;
throw(_h)}}

}});$N = a$d({a$j: [],a$e: $k,a$c: "T_TestLebewesen::Lebewesen",a$h: {$c:
/* T_TestLebewesen::Lebewesen#initialize */
function(_c,_a){var self,_b;
_b=nil;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
_b=self.$ao=_a;
return _b}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==54))return _d.a$a;
throw(_d)}}

}});$A = a$d({a$j: [],a$e: $N,a$c: "T_TestLebewesen::Hund",a$h: {$ak:
/* T_TestLebewesen::Hund#wau */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$u(nil,"wau wau");
return _a}

,$al:
/* T_TestLebewesen::Hund#jage */
function(_c,_a){var self,_b;
_b=nil;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
_b=self.$u(nil,"ich jage ".$P(nil,_a.$e()));
return _b}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==55))return _d.a$a;
throw(_d)}}

}});$j = a$d({a$j: [],a$e: $k,a$c: "Method",a$h: {$c:
/* Method#initialize */
function(_f,_a,_b){var self,_c,_d,_e;
_e=nil;
self=this;
try{if(arguments.length!=3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));
;
(_c=[_a,_b],self.$ap=_c[0]==null?nil:_c[0],self.$aq=_c[1]==null?nil:_c[1],_c);
_d=nil;
_d = _a[a$f[_b]];
    if (_d==null) _d = nil;;
if((_c=_d,_c!==false&&_c!==nil)){_e=self.$ar=_d}else{_e=self.$j(nil,$O,("undefined method `" + (_b).$o() + ("' for class `").$o() + (_a.$z().$e()).$o() + ("'").$o()))};
return _e}catch(_g){if(_g instanceof a$c && (!_g.a$b || _g.a$b==56))return _g.a$a;
throw(_g)}}

,$I:
/* Method#call */
function(_c){var self,_a,_b,_d;
self=this;
_d=_c==null?nil:_c;
try{_a=[];
for(_b=1;_b<arguments.length;_b++)_a.push(arguments[_b]);
;
return self.$ar.apply(self.$ap, [_d].concat(_a))}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==57))return _e.a$a;
throw(_e)}}

,$i:
/* Method#inspect */
function(){var self,_a;
_a=nil;
self=this;
if(self.$ap==null)self.$ap=nil;
if(self.$aq==null)self.$aq=nil;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=("#<Method: " + (self.$ap.$z().$e()).$o() + ("#").$o() + (self.$aq).$o() + (">").$o());
return _a}

}});$G = a$d({a$j: [],a$e: $k,a$c: "Range",a$h: {$7:
/* Range#== */
function(_e,_a){var self,_b,_c,_d;
_d=nil;
self=this;
if(self.$as==null)self.$as=nil;
if(self.$at==null)self.$at=nil;
if(self.$av==null)self.$av=nil;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
if (self.constructor != _a.constructor) return false;;
_d=(_b=self.$as.$7(nil,_a.$3()), (_b!==false&&_b!==nil) ? ((_c=self.$at.$7(nil,_a.$au()), (_c!==false&&_c!==nil) ? (self.$av.$7(nil,_a.$aw())) : _c)) : _b);
return _d}catch(_f){if(_f instanceof a$c && (!_f.a$b || _f.a$b==58))return _f.a$a;
throw(_f)}}

,$ax:
/* Range#begin */
function(){var self,_a;
_a=nil;
self=this;
if(self.$as==null)self.$as=nil;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$as;
return _a}

,$g:
/* Range#eql? */
function(_e,_a){var self,_b,_c,_d;
_d=nil;
self=this;
if(self.$as==null)self.$as=nil;
if(self.$at==null)self.$at=nil;
if(self.$av==null)self.$av=nil;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
if (self.constructor != _a.constructor) return false;;
_d=(_b=self.$as.$g(nil,_a.$3()), (_b!==false&&_b!==nil) ? ((_c=self.$at.$g(nil,_a.$au()), (_c!==false&&_c!==nil) ? (self.$av.$7(nil,_a.$aw())) : _c)) : _b);
return _d}catch(_f){if(_f instanceof a$c && (!_f.a$b || _f.a$b==59))return _f.a$a;
throw(_f)}}

,$aw:
/* Range#exclude_end? */
function(){var self,_a;
_a=nil;
self=this;
if(self.$av==null)self.$av=nil;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$av;
return _a}

,$au:
/* Range#last */
function(){var self,_a;
_a=nil;
self=this;
if(self.$at==null)self.$at=nil;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$at;
return _a}

,$o:
/* Range#to_s */
function(){var self,_b,_a;
_a=nil;
self=this;
if(self.$as==null)self.$as=nil;
if(self.$at==null)self.$at=nil;
if(self.$av==null)self.$av=nil;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
if((_b=self.$av,_b!==false&&_b!==nil)){_a=("" + (self.$as).$o() + ("...").$o() + (self.$at).$o())}else{_a=("" + (self.$as).$o() + ("..").$o() + (self.$at).$o())};
return _a}

,$v:
/* Range#each */
function(_c){var self,_a,_b,_d;
_d=nil;
self=this;
if(self.$as==null)self.$as=nil;
if(self.$at==null)self.$at=nil;
if(self.$av==null)self.$av=nil;
try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$as;
if((_b=self.$as.$ae(nil,self.$at),_b!==false&&_b!==nil)){return nil};
if((_b=self.$av,_b!==false&&_b!==nil)){while((_b=_a.$Y(nil,self.$at),_b!==false&&_b!==nil)){_c(_a);
_a=_a.$8()};
_d=nil;
}else{while((_b=_a.$U(nil,self.$at),_b!==false&&_b!==nil)){_c(_a);
_a=_a.$8()};
_d=nil;
};
return _d}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==62))return _e.a$a;
throw(_e)}}

,$az:
/* Range#end */
function(){var self,_a;
_a=nil;
self=this;
if(self.$at==null)self.$at=nil;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$at;
return _a}

,$3:
/* Range#first */
function(){var self,_a;
_a=nil;
self=this;
if(self.$as==null)self.$as=nil;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$as;
return _a}

,$ay:
/* Range#include? */
function(_d,_a){var self,_b,_c;
_c=nil;
self=this;
if(self.$as==null)self.$as=nil;
if(self.$at==null)self.$at=nil;
if(self.$av==null)self.$av=nil;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
if((_b=_a.$Y(nil,self.$as),_b!==false&&_b!==nil)){return false};
if((_b=self.$av,_b!==false&&_b!==nil)){_c=_a.$Y(nil,self.$at)}else{_c=_a.$U(nil,self.$at)};
return _c}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==61))return _e.a$a;
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
(_d=[_a,_b],self.$as=_d[0]==null?nil:_d[0],self.$at=_d[1]==null?nil:_d[1],_d);
_e=self.$av=((_d=_c,_d!==false&&_d!==nil)?true:false);
return _e}catch(_g){if(_g instanceof a$c && (!_g.a$b || _g.a$b==60))return _g.a$a;
throw(_g)}}

,$f:
/* Range#=== */
function(_d,_a){var self,_b,_c;
_c=nil;
self=this;
if(self.$as==null)self.$as=nil;
if(self.$at==null)self.$at=nil;
if(self.$av==null)self.$av=nil;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
if((_b=_a.$Y(nil,self.$as),_b!==false&&_b!==nil)){return false};
if((_b=self.$av,_b!==false&&_b!==nil)){_c=_a.$Y(nil,self.$at)}else{_c=_a.$U(nil,self.$at)};
return _c}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==63))return _e.a$a;
throw(_e)}}

,$L:
/* Range#to_a */
function(){var self,_a,_b,_c;
self=this;
if(self.$as==null)self.$as=nil;
if(self.$at==null)self.$at=nil;
if(self.$av==null)self.$av=nil;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=[];
if((_b=self.$as.$ae(nil,self.$at),_b!==false&&_b!==nil)){return _a};
_c=self.$as;
if((_b=self.$av,_b!==false&&_b!==nil)){while((_b=_c.$Y(nil,self.$at),_b!==false&&_b!==nil)){_a.$H(nil,_c);
_c=_c.$8()}}else{while((_b=_c.$U(nil,self.$at),_b!==false&&_b!==nil)){_a.$H(nil,_c);
_c=_c.$8()}};
return _a}

,$i:
/* Range#inspect */
function(){var self,_b,_a;
_a=nil;
self=this;
if(self.$as==null)self.$as=nil;
if(self.$at==null)self.$at=nil;
if(self.$av==null)self.$av=nil;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
if((_b=self.$av,_b!==false&&_b!==nil)){_a=("" + (self.$as.$i()).$o() + ("...").$o() + (self.$at.$i()).$o())}else{_a=("" + (self.$as.$i()).$o() + ("..").$o() + (self.$at.$i()).$o())};
return _a}

,$aA:
/* Range#member? */
function(_d,_a){var self,_b,_c;
_c=nil;
self=this;
if(self.$as==null)self.$as=nil;
if(self.$at==null)self.$at=nil;
if(self.$av==null)self.$av=nil;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
if((_b=_a.$Y(nil,self.$as),_b!==false&&_b!==nil)){return false};
if((_b=self.$av,_b!==false&&_b!==nil)){_c=_a.$Y(nil,self.$at)}else{_c=_a.$U(nil,self.$at)};
return _c}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==64))return _e.a$a;
throw(_e)}}

}});$P = a$d({a$j: [],a$e: nil,a$c: "T_TestArray"});$3 = a$d({a$j: [],a$e: $k,a$f: {$F:
/* TestSuite.main */
function(){var self,_c,_d,_b;
_b=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
try{self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
self.$u(nil,"Test hash");
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
$Q.$F();
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
self.$u(nil,"Test yield");
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
$R.$F();
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
self.$u(nil,"Test insertion sort");
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
$S.$F();
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
self.$u(nil,"Test lebewesen");
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
$B.$F();
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
self.$u(nil,"Test expr");
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
$T.$F();
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
self.$u(nil,"Test simple output");
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
$m.$F();
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
self.$u(nil,"Test if");
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
$K.$F();
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
self.$u(nil,"Test class");
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
$U.$F();
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
self.$u(nil,"Test case");
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
$H.$F();
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
self.$u(nil,"Test splat");
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
$V.$F();
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
self.$u(nil,"Test string");
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
$W.$F();
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
self.$u(nil,"Test inspect");
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
$X.$F();
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
self.$u(nil,"Test regexp");
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
$s.$F();
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
self.$u(nil,"Test args");
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
$M.$F();
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
self.$u(nil,"Test array");
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
$Y.$F();
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
self.$u(nil,"Test eql");
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
$Z.$F();
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
self.$u(nil,"Test send");
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
$0.$F();
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
self.$u(nil,"Test range");
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
$1.$F();
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
self.$u(nil,"Test massign");
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
$2.$F();
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
self.$u(nil,"Test new");
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
$v.$F();
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
self.$u(nil,"Test exception");
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
_b=$J.$F()}catch(_a){if(_a instanceof a$c)throw(_a);
if((_d=$f.$f(nil,_a),_d!==false&&_d!==nil)){_c=_a;
self.$t(nil,"unhandled exception");
_b=self.$t(nil,_c)}else{throw(_a)}};
return _b}

},a$c: "TestSuite"});$4 = a$d({a$j: [],a$e: $k,a$c: "T_TestSend::A",a$h: {$aB:
/* T_TestSend::A#a_method */
function(_d,_a,_b){var self,_c;
_c=nil;
self=this;
try{if(arguments.length!=3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));
;
_c=self.$t(nil,_a,_b);
return _c}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==65))return _e.a$a;
throw(_e)}}

}});$5 = a$d({a$j: [],a$e: $4,a$c: "T_TestSend::B",a$h: {$aB:
/* T_TestSend::B#a_method */
function(_d,_a,_b){var self;
self=this;
var _c=arguments;
try{if(arguments.length!=3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));
;
self.$t(nil,"in B");
a$j(self,'$aB',_c)}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==66))return _e.a$a;
throw(_e)}}

,$aC:
/* T_TestSend::B#c_method */
function(_c,_a){var self,_b;
_b=nil;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
_b=nil;
return _b}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==67))return _d.a$a;
throw(_d)}}

}});$6 = a$d({a$j: [],a$e: nil,a$c: "T_TestClass"});$7 = a$d({a$j: [],a$e: nil,a$c: "T_TestClass::X"});$8 = a$d({a$j: [$7],a$e: $k,a$c: "T_TestClass::A"});$9 = a$d({a$j: [],a$e: $8,a$c: "T_TestClass::B"});$a = a$d({a$j: [],a$e: $l,a$c: "ArgumentError"});$Q = a$d({a$j: [],a$e: $k,a$f: {$F:
/* T_TestHash::TestHash.main */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$a().$ai();
return _a}

},a$c: "T_TestHash::TestHash",a$h: {$B:
/* T_TestHash::TestHash#hash */
function(){var self;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
var el = {}; el["1"] = null; return el}

,$ai:
/* T_TestHash::TestHash#test */
function(){var self,_a,_b,_c;
_c=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=$_.$aD(nil,"a",6,"b",7,"1",1,1,2,"1,2","hello",[1,2],"good");
self.$t(nil,_a.$V(nil,"a"));
self.$t(nil,_a.$V(nil,"b"));
self.$t(nil,_a.$V(nil,"1"));
self.$t(nil,_a.$V(nil,1));
self.$t(nil,_a.$V(nil,"1,2"));
self.$t(nil,_a.$V(nil,[1,2]));
self.$u(nil,"test native JS hash");
_c=_b=self.$B();
return _c}

}});$z = a$d({a$j: [],a$e: $N,a$c: "T_TestLebewesen::Katze",a$h: {$e:
/* T_TestLebewesen::Katze#name */
function(){var self,_a;
_a=nil;
self=this;
if(self.$aE==null)self.$aE=nil;
_a=self.$aE;
return _a}

,$c:
/* T_TestLebewesen::Katze#initialize */
function(_d,_a,_b){var self,_c;
_c=nil;
self=this;
try{if(arguments.length!=3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));
;
a$k(self,'$c',nil,[_a]);
_c=self.$aE=_b;
return _c}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==68))return _e.a$a;
throw(_e)}}

,$aj:
/* T_TestLebewesen::Katze#miau */
function(){var self,_a;
_a=nil;
self=this;
if(self.$aE==null)self.$aE=nil;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$u(nil,"miau, ich bin ".$P(nil,self.$aE));
return _a}

}});$V = a$d({a$j: [],a$e: $k,a$f: {$F:
/* T_TestSplat::TestSplat.main */
function(){var self,_a,_b;
_b=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$a();
_a.$an();
_a.$d(nil,'$an',a$b([]));
_a.$an(nil,1);
_a.$d(nil,'$an',a$b([1]));
_a.$d(nil,'$an',[1].concat(a$b([])));
_a.$an(nil,1,2);
_a.$d(nil,'$an',a$b([1,2]));
_a.$d(nil,'$an',[1].concat(a$b([2])));
_b=_a.$d(nil,'$an',[1].concat(a$b([1,2])));
return _b}

},a$c: "T_TestSplat::TestSplat",a$h: {$an:
/* T_TestSplat::TestSplat#m */
function(){var self,_a,_b,_c;
_c=nil;
self=this;
_a=[];
for(_b=1;_b<arguments.length;_b++)_a.push(arguments[_b]);
;
_c=self.$t(nil,_a);
return _c}

}});a$d({a$j: [],a$g: $b});$c = a$d({a$j: [],a$e: $l,a$c: "RuntimeError"});$$ = a$d({a$j: [],a$e: nil,a$c: "T_TestString"});$U = a$d({a$j: [],a$e: $k,a$f: {$F:
/* T_TestClass::TestClass.main */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
self.$t(nil,$8.$a().$m(nil,$8));
self.$t(nil,$8.$a().$m(nil,$9));
self.$t(nil,$9.$a().$m(nil,$8));
self.$t(nil,$8.$a().$m(nil,$7));
self.$t(nil,$9.$a().$m(nil,$7));
self.$t(nil,$8.$a().$h(nil,$8));
self.$t(nil,$8.$a().$h(nil,$9));
self.$t(nil,$9.$a().$h(nil,$8));
self.$t(nil,$8.$a().$h(nil,$7));
self.$t(nil,$9.$a().$h(nil,$7));
self.$t(nil,$aa.$a().$h(nil,$7));
self.$t(nil,$aa.$a().$h(nil,$8));
self.$t(nil,$aa.$a().$h(nil,$9));
self.$t(nil,$aa.$a().$h(nil,$aa));
self.$t(nil,$aa.$a().$h(nil,$ab));
self.$t(nil,$aa.$a().$h(nil,$k));
self.$t(nil,$aa.$a().$h(nil,$i));
self.$t(nil,$aa.$a().$h(nil,$b));
self.$t(nil,"hallo".$z().$e());
self.$t(nil,nil.$z().$e());
self.$t(nil,nil.$m(nil,$ac));
self.$t(nil,"hallo".$m(nil,$e));
self.$t(nil,"hallo".$z());
self.$t(nil,$8);
self.$t(nil,$9);
self.$t(nil,$aa);
self.$t(nil,$ab);
self.$t(nil,$7);
self.$t(nil,$7.$e());
self.$t(nil,$8.$e());
_a=self.$t(nil,$9.$e());
return _a}

},a$c: "T_TestClass::TestClass"});$Y = a$d({a$j: [],a$e: $k,a$f: {$F:
/* T_TestArray::TestArray.main */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$a().$ai();
return _a}

},a$c: "T_TestArray::TestArray",a$h: {$aG:
/* T_TestArray::TestArray#array */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=[1,2,null,[null,null,4]];
return _a}

,$ai:
/* T_TestArray::TestArray#test */
function(){var self,_a,_b;
_b=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=["a","b","b","b","c"];
self.$t(nil,_a.$aF(nil,"b"));
self.$t(nil,_a);
self.$t(nil,_a.$aF(nil,"z"));
self.$u(nil,"test native JS array mapping");
_b=self.$t(nil,self.$aG());
return _b}

}});$ad = a$d({a$j: [],a$e: nil,a$c: "T_TestEql"});$ae = a$d({a$j: [],a$e: nil,a$c: "T_TestCase"});$F = a$d({a$j: [],a$e: $q,a$c: "Fixnum",a$d: Number});$af = a$d({a$j: [],a$e: $k,a$c: "Boolean",a$d: Boolean,a$h: {$7:
/* Boolean#== */
function(_b,_a){var self;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
return (self == _a)}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==69))return _c.a$a;
throw(_c)}}

,$o:
/* Boolean#to_s */
function(){var self;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
return (self == true ? 'true' : 'false')}

,$i:
/* Boolean#inspect */
function(){var self;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
return (self == true ? 'true' : 'false')}

}});$O = a$d({a$j: [],a$e: $l,a$c: "NameError"});$g = a$d({a$j: [],a$e: $O,a$c: "NoMethodError"});$ab = a$d({a$j: [],a$e: $k,a$c: "T_TestClass::D"});$R = a$d({a$j: [],a$e: $k,a$f: {$F:
/* T_TestYield::TestYield.main */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$a().$ai();
return _a}

},a$c: "T_TestYield::TestYield",a$h: {$aI:
/* T_TestYield::TestYield#test_loop2 */
function(){var self,_a,_b,_d,_f;
_f=nil;
self=this;
try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
self.$u(nil,"loop2");
_a=0;
_b=self.$aJ(function(){var _e=nil;
;
_a=_a.$P(nil,1);
if((_d=_a.$_(nil,2).$7(nil,1),_d!==false&&_d!==nil)){return nil};
self.$t(nil,_a);
if((_d=_a.$ae(nil,8),_d!==false&&_d!==nil)){throw(new a$c(["out",_a],null))}else{_e=nil};
return _e});
self.$t(nil,_b);
_f=self.$u(nil,"--");
return _f}catch(_g){if(_g instanceof a$c && (!_g.a$b || _g.a$b==71))return _g.a$a;
throw(_g)}}

,$aH:
/* T_TestYield::TestYield#three_times_block */
function(_a){var self,_b,_c;
_c=nil;
self=this;
_b=_a==null?nil:_a;
try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_b.$I(nil,1);
_b.$I(nil,2);
_c=_b.$I(nil,3);
return _c}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==70))return _d.a$a;
throw(_d)}}

,$aL:
/* T_TestYield::TestYield#return_in_block */
function(_a){var self,_b,_c;
_c=nil;
self=this;
_b=_a==null?nil:_a;
try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
self.$t(nil,"return_in_block before");
_b.$I();
_c=self.$t(nil,"return_in_block after");
return _c}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==72))return _d.a$a;
throw(_d)}}

,$aK:
/* T_TestYield::TestYield#test_while_loop */
function(){var self,_a,_b,_c;
_c=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
self.$u(nil,"while-loop");
_a=0;
while(true){_a=_a.$P(nil,1);
if((_b=_a.$_(nil,2).$7(nil,1),_b!==false&&_b!==nil)){continue};
self.$t(nil,_a);
if((_b=_a.$ae(nil,8),_b!==false&&_b!==nil)){break}};
self.$u(nil,"----");
while((_b=_a.$ae(nil,0),_b!==false&&_b!==nil)){self.$t(nil,_a);
_a=_a.$S(nil,1)};
_c=self.$u(nil,"--");
return _c}

,$aJ:
/* T_TestYield::TestYield#loop2 */
function(_a){var self,_b,_c;
_c=nil;
self=this;
_b=_a==null?nil:_a;
try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
while(true){_b.$I()};
_c=self.$t(nil,"not reached");
return _c}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==74))return _d.a$a;
throw(_d)}}

,$aO:
/* T_TestYield::TestYield#test_proc */
function(){var self,_a,_d;
_d=nil;
self=this;
try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
self.$t(nil,"test_proc");
_a=self.$s(function(){;
throw(new a$c(0,73))});
self.$t(nil,_a.$I());
_a=$h.$a(function(){;
throw(new a$c(3,null))});
_d=self.$t(nil,_a.$I());
return _d}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==73))return _e.a$a;
throw(_e)}}

,$aM:
/* T_TestYield::TestYield#test_three_times_indirect */
function(){var self,_d;
_d=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
self.$u(nil,"three_times_indirect");
self.$aN(function(_a){var _b;
var _c=nil;
_b=_a==null?nil:_a;
_c=self.$t(nil,_b);
return _c});
_d=self.$u(nil,"--");
return _d}

,$aP:
/* T_TestYield::TestYield#test_three_times_yield2 */
function(){var self,_d,_e;
_e=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
self.$u(nil,"three_times_yield2");
_e=self.$aQ(function(_a){var _b;
var _c=nil;
_b=_a==null?nil:_a;
if((_d=_b.$7(nil,1),_d!==false&&_d!==nil)){_c=_b}else{return _b.$P(nil,1)};
return _c});
return _e}

,$aS:
/* T_TestYield::TestYield#test_loop */
function(){var self,_a,_b,_d,_f;
_f=nil;
self=this;
try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
self.$u(nil,"loop");
_a=0;
_b=self.$x(function(){var _e=nil;
;
_a=_a.$P(nil,1);
if((_d=_a.$_(nil,2).$7(nil,1),_d!==false&&_d!==nil)){return nil};
self.$t(nil,_a);
if((_d=_a.$ae(nil,8),_d!==false&&_d!==nil)){throw(new a$c(["out",_a],null))}else{_e=nil};
return _e});
self.$t(nil,_b);
_f=self.$u(nil,"--");
return _f}catch(_g){if(_g instanceof a$c && (!_g.a$b || _g.a$b==75))return _g.a$a;
throw(_g)}}

,$aR:
/* T_TestYield::TestYield#test_three_times_block */
function(){var self,_d;
_d=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
self.$u(nil,"three_times_block");
self.$aH(function(_a){var _b;
var _c=nil;
_b=_a==null?nil:_a;
_c=self.$t(nil,_b);
return _c});
_d=self.$u(nil,"--");
return _d}

,$ai:
/* T_TestYield::TestYield#test */
function(){var self,_b,_c,_d;
_d=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
self.$aT();
self.$aR();
self.$aM();
self.$aP();
self.$aS();
self.$aI();
self.$aK();
try{self.$aO()}catch(_a){if(_a instanceof a$c)throw(_a);
if((_c=$w.$f(nil,_a),_c!==false&&_c!==nil)){_b=_a;
self.$t(nil,_b)}else{throw(_a)}};
_d=self.$t(nil,self.$aU());
return _d}

,$x:
/* T_TestYield::TestYield#loop */
function(_a){var self,_b;
_b=nil;
self=this;
try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
while(true){_a()};
_b=self.$t(nil,"not reached");
return _b}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==78))return _c.a$a;
throw(_c)}}

,$aN:
/* T_TestYield::TestYield#three_times_indirect */
function(_a){var self,_b,_c;
_c=nil;
self=this;
_b=_a==null?nil:_a;
try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
self.$aV(_b);
_c=self.$aH(_b);
return _c}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==77))return _d.a$a;
throw(_d)}}

,$aV:
/* T_TestYield::TestYield#three_times_yield */
function(_a){var self,_b;
_b=nil;
self=this;
try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a(1);
_a(2);
_b=_a(3);
return _b}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==76))return _c.a$a;
throw(_c)}}

,$aQ:
/* T_TestYield::TestYield#three_times_yield2 */
function(_a){var self,_b;
_b=nil;
self=this;
try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
self.$t(nil,_a(1));
self.$t(nil,_a(2));
_b=self.$t(nil,_a(3));
return _b}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==79))return _c.a$a;
throw(_c)}}

,$aU:
/* T_TestYield::TestYield#test_return_in_block */
function(){var self,_b;
_b=nil;
self=this;
try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
self.$t(nil,"before");
self.$aL(function(){;
throw(new a$c(4,80))});
_b=self.$t(nil,"after (NOT)");
return _b}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==80))return _c.a$a;
throw(_c)}}

,$aT:
/* T_TestYield::TestYield#test_three_times_yield */
function(){var self,_d;
_d=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
self.$u(nil,"three_times_yield");
self.$aV(function(_a){var _b;
var _c=nil;
_b=_a==null?nil:_a;
_c=self.$t(nil,_b);
return _c});
_d=self.$u(nil,"--");
return _d}

}});$ag = a$d({a$j: [],a$e: nil,a$c: "T_TestHash"});$_ = a$d({a$j: [$o],a$e: $k,a$f: {$aD:
/* Hash.new_from_key_value_list */
function(){var self,_a,_b,_c;
self=this;
_a=[];
for(_b=1;_b<arguments.length;_b++)_a.push(arguments[_b]);
;
if((_b=_a.$T().$_(nil,2).$7(nil,0),_b===false||_b===nil)){self.$j(nil,$a)};
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
      hashed_key = ":" + current_key.$B();

      // make sure that a bucket exists
      if (!items[hashed_key]) items[hashed_key] = [];

      items[hashed_key].push(current_key, current_val);
    }

    _c.a$k = items; 
    _c.a$l = nil;
    return _c;
    }

,$a0:
/* Hash.new_from_jsobject */
function(_d,_a){var self,_b,_c;
_c=nil;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
_c=_b=self.$a();
return _c}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==84))return _e.a$a;
throw(_e)}}

},a$c: "Hash",a$h: {$V:
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

    var hashed_key = ":" + _a.$B();
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
    }catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==81))return _c.a$a;
throw(_c)}}

,$aW:
/* Hash#keys */
function(){var self,_b,_f;
_b=_f=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_f=self.$K(function(_a){var _c,_d;
var _e=nil;
(_b=a$l(_a),_c=_b[0]==null?nil:_b[0],_d=_b[1]==null?nil:_b[1],_b);
_e=_c;
return _e});
return _f}

,$o:
/* Hash#to_s */
function(){var self,_a,_c,_g;
_c=_g=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=[];
self.$v(function(_b){var _d,_e;
var _f=nil;
(_c=a$l(_b),_d=_c[0]==null?nil:_c[0],_e=_c[1]==null?nil:_c[1],_c);
_a.$H(nil,_d);
_f=_a.$H(nil,_e);
return _f});
_g=_a.$aX(nil,"");
return _g}

,$aY:
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

    var hashed_key = ":" + _a.$B();
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
    }catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==83))return _d.a$a;
throw(_d)}}

,$v:
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
    }catch(_b){if(_b instanceof a$c && (!_b.a$b || _b.a$b==82))return _b.a$a;
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

,$aZ:
/* Hash#values */
function(){var self,_b,_f;
_b=_f=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_f=self.$K(function(_a){var _c,_d;
var _e=nil;
(_b=a$l(_a),_c=_b[0]==null?nil:_b[0],_d=_b[1]==null?nil:_b[1],_b);
_e=_d;
return _e});
return _f}

,$i:
/* Hash#inspect */
function(){var self,_a,_c,_g;
_c=_g=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a="{";
_a=_a.$P(nil,self.$K(function(_b){var _d,_e;
var _f=nil;
(_c=a$l(_b),_d=_c[0]==null?nil:_c[0],_e=_c[1]==null?nil:_c[1],_c);
_f=_d.$i().$P(nil,"=>").$P(nil,_e.$i());
return _f}).$aX(nil,", "));
_a=_a.$P(nil,"}");
_g=_a;
return _g}

}});$1 = a$d({a$j: [],a$e: $k,a$f: {$F:
/* T_TestRange::TestRange.main */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$a().$ai();
return _a}

},a$c: "T_TestRange::TestRange",a$h: {$ai:
/* T_TestRange::TestRange#test */
function(){var _j,self,_a,_b,_i,_n;
_n=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=$G.$a(nil,0,2);
self.$t(nil,_a.$3());
self.$t(nil,_a.$au());
self.$t(nil,_a);
_b=1;
self.$t(nil,$G.$a(nil,_b,_b.$P(nil,5),false).$o());
self.$t(nil,$G.$a(nil,_b,_b.$P(nil,_b),true).$o());
self.$t(nil,$G.$a(nil,0,2,false).$o());
self.$t(nil,$G.$a(nil,0,2,true).$o());
$G.$a(nil,0,4,false).$v(function(_c){var _d=nil;
_b=_c==null?nil:_c;
_d=self.$t(nil,_b);
return _d});
$G.$a(nil,0,4,true).$v(function(_e){var _f=nil;
_b=_e==null?nil:_e;
_f=self.$t(nil,_b);
return _f});
$G.$a(nil,-1,-4,false).$v(function(_g){var _h=nil;
_b=_g==null?nil:_g;
_h=self.$t(nil,_b);
return _h});
self.$t(nil,$G.$a(nil,0,4,false).$ay(nil,4));
self.$t(nil,$G.$a(nil,0,4,false).$ay(nil,5));
self.$t(nil,$G.$a(nil,0,4,true).$ay(nil,5));
self.$t(nil,$G.$a(nil,0,4,true).$ay(nil,4));
self.$t(nil,$G.$a(nil,0,4,true).$ay(nil,3));
self.$t(nil,$G.$a(nil,0,4,true).$ay(nil,0));
self.$t(nil,$G.$a(nil,0,4,true).$ay(nil,-1));
self.$t(nil,$G.$a(nil,-1,-5,false).$L());
self.$t(nil,$G.$a(nil,-5,-1,false).$L());
_i=$G.$a(nil,0,4);
self.$t(nil,_i.$3());
self.$t(nil,_i.$ax());
self.$t(nil,_i.$au());
self.$t(nil,_i.$az());
self.$t(nil,_i.$aw());
_i=$G.$a(nil,1,5,true);
self.$t(nil,_i.$3());
self.$t(nil,_i.$ax());
self.$t(nil,_i.$au());
self.$t(nil,_i.$az());
self.$t(nil,_i.$aw());
self.$t(nil,false.$7(nil,false));
self.$t(nil,false.$7(nil,true));
self.$t(nil,true.$7(nil,false));
self.$t(nil,true.$7(nil,true));
self.$t(nil,$G.$a(nil,0,2,false).$7(nil,$G.$a(nil,0,2,false)));
self.$t(nil,$G.$a(nil,0,2,false).$7(nil,$G.$a(nil,0,2)));
self.$t(nil,$G.$a(nil,0,2,false).$7(nil,$G.$a(nil,0,2,true)));
_j=55;
self.$t(nil,_j);
$G.$a(nil,1,100,false).$v(function(_k){var _l=nil;
_b=_k==null?nil:_k;
_l=_j=_b;
return _l});
self.$t(nil,_j);
_j=54;
self.$t(nil,_j);
$G.$a(nil,1,100,false).$v(function(_m){_j=_m==null?nil:_m;
});
_n=self.$t(nil,_j);
return _n}

}});$ah = a$d({a$j: [],a$e: nil,a$c: "T_TestInsertionSort"});$Z = a$d({a$j: [],a$e: $k,a$f: {$F:
/* T_TestEql::TestEql.main */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
self.$t(nil,"a".$g(nil,"a"));
self.$t(nil,"a".$g(nil,1));
self.$t(nil,"1".$g(nil,1));
self.$t(nil,[1,2].$g(nil,[1,2]));
_a=self.$t(nil,(1).$g(nil,"1"));
return _a}

},a$c: "T_TestEql::TestEql"});$W = a$d({a$j: [],a$e: $k,a$f: {$F:
/* T_TestString::TestString.main */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$a().$ai();
return _a}

},a$c: "T_TestString::TestString",a$h: {$ai:
/* T_TestString::TestString#test */
function(){var self,_a,_i;
_i=nil;
self=this;
if(self.$a1==null)self.$a1=nil;
if(self.$a2==null)self.$a2=nil;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
self.$t(nil,"hello");
self.$t(nil,"hallo\b\t\n");
self.$t(nil,"hallo\\leute");
self.$t(nil,"\"super\"");
self.$t(nil,"hello".$1(nil,"e"));
self.$t(nil,"hello".$1(nil,"lo"));
self.$t(nil,"hello".$1(nil,"a"));
self.$t(nil,"hello hello".$1(nil,"ll"));
self.$t(nil,"hello hello".$1(nil,"ll",3));
self.$t(nil,"hallo".$V(nil,0,1));
self.$t(nil,"hallo".$V(nil,0,2));
self.$t(nil,"hallo".$V(nil,0,5));
self.$t(nil,"10".$R(nil,10,"0"));
self.$t(nil,"10".$R(nil,1,"blah"));
self.$t(nil,"x".$R(nil,4,"()"));
self.$t(nil,"10".$X(nil,10,"0"));
self.$t(nil,"10".$X(nil,1,"blah"));
self.$t(nil,"x".$X(nil,4,"()"));
self.$t(nil,("abc " + ((1).$P(nil,2)).$o() + (" def").$o()));
self.$a1="hallo".$i();
self.$a2=4.5;
self.$t(nil,("" + (self.$a1).$o() + (",").$o() + (self.$a2).$o()));
_a="hallo".$2(nil,"l","r");
self.$t(nil,_a);
_a="hallo".$2(nil,/ll/,"rr");
self.$t(nil,_a);
_a="hallo".$2(function(){var _c=nil;
;
_c="r";
return _c},/l/);
self.$t(nil,_a);
_a="hallo".$2(function(){var _e=nil;
;
_e="blah blah";
return _e},/ll/);
self.$t(nil,_a);
_i="hallllllo".$2(function(_f){var _g;
var _h=nil;
_g=_f==null?nil:_f;
_h=self.$t(nil,_g);
return _h},/(l)l/);
return _i}

}});$ai = a$d({a$j: [],a$e: nil,a$c: "T_TestInspect"});$aj = a$d({a$j: [],a$e: nil,a$c: "T_TestMassign"});$aa = a$d({a$j: [],a$e: $9,a$c: "T_TestClass::C"});$ak = a$d({a$j: [],a$e: nil,a$c: "T_TestSend"});$T = a$d({a$j: [],a$e: $k,a$f: {$F:
/* T_TestExpr::TestExpr.main */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$a().$ai();
return _a}

},a$c: "T_TestExpr::TestExpr",a$h: {$ai:
/* T_TestExpr::TestExpr#test */
function(){var self,_a,_b,_c;
_c=nil;
self=this;
try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=(true?1:2);
self.$t(nil,_a);
(_b=_a=true, (_b!==false&&_b!==nil) ? _b : (a$m(new a$c(nil,null))));
_c=self.$t(nil,_a);
return _c}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==85))return _d.a$a;
throw(_d)}}

}});$ac = a$d({a$j: [],a$e: $k,a$c: "NilClass",a$d: NilClass,a$h: {$a3:
/* NilClass#to_f */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=0.0;
return _a}

,$q:
/* NilClass#nil? */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=true;
return _a}

,$o:
/* NilClass#to_s */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a="";
return _a}

,$a4:
/* NilClass#to_i */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=0;
return _a}

,$L:
/* NilClass#to_a */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=[];
return _a}

,$a5:
/* NilClass#to_splat */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=[];
return _a}

,$i:
/* NilClass#inspect */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a="nil";
return _a}

}});$2 = a$d({a$j: [],a$e: $k,a$f: {$F:
/* T_TestMassign::TestMassign.main */
function(){var self,_a,_b,_c,_d,_e,_f;
_a=_f=nil;
self=this;
if(self.$a6==null)self.$a6=nil;
if(self.$a1==null)self.$a1=nil;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
(_a=[1,2],_b=_a[0]==null?nil:_a[0],_c=_a[1]==null?nil:_a[1],_a);
self.$t(nil,_b);
self.$t(nil,_c);
self.$u(nil,"--");
(_a=[1,2,3],_b=_a[0]==null?nil:_a[0],_c=_a[1]==null?nil:_a[1],_a);
self.$t(nil,_b);
self.$t(nil,_c);
self.$u(nil,"--");
_d=5;
(_a=[1,2],_b=_a[0]==null?nil:_a[0],_c=_a[1]==null?nil:_a[1],_d=_a[2]==null?nil:_a[2],_a);
self.$t(nil,_b);
self.$t(nil,_c);
self.$t(nil,_d);
self.$u(nil,"--");
(_a=[1,2,3],self.$a1=_a[0]==null?nil:_a[0],_c=_a[1]==null?nil:_a[1],self.$a6=_a[2]==null?nil:_a[2],_a);
self.$t(nil,self.$a1);
self.$t(nil,_c);
self.$t(nil,self.$a6);
self.$u(nil,"--");
self.$u(nil,"swap");
(_a=[1,2],_b=_a[0]==null?nil:_a[0],_c=_a[1]==null?nil:_a[1],_a);
self.$t(nil,_b);
self.$t(nil,_c);
(_a=[_c,_b],_b=_a[0]==null?nil:_a[0],_c=_a[1]==null?nil:_a[1],_a);
self.$t(nil,_b);
self.$t(nil,_c);
self.$u(nil,"--");
self.$u(nil,"splat1");
(_a=[1,2],_b=_a[0]==null?nil:_a[0],_c=_a[1]==null?nil:_a[1],_d=_a[2]==null?nil:_a[2],_e=_a.slice(3),_a);
self.$t(nil,_b);
self.$t(nil,_c);
self.$t(nil,_d);
self.$t(nil,_e);
self.$u(nil,"--");
self.$u(nil,"splat2");
(_a=[1,2],_b=_a[0]==null?nil:_a[0],_c=_a.slice(1),_a);
self.$t(nil,_b);
self.$t(nil,_c);
self.$u(nil,"--");
self.$u(nil,"splat3");
(_a=[1,2,3,4,5],_b=_a[0]==null?nil:_a[0],_c=_a.slice(1),_a);
self.$t(nil,_b);
self.$t(nil,_c);
self.$u(nil,"--");
self.$u(nil,"splat with globals");
self.$t(nil,(typeof($al)=='undefined'?nil:$al));
self.$t(nil,(typeof($am)=='undefined'?nil:$am));
(_a=[1,2],$al=_a[0]==null?nil:_a[0],$am=_a[1]==null?nil:_a[1],_a);
self.$t(nil,(typeof($al)=='undefined'?nil:$al));
self.$t(nil,(typeof($am)=='undefined'?nil:$am));
_f=self.$u(nil,"--");
return _f}

},a$c: "T_TestMassign::TestMassign"});$an = a$d({a$j: [],a$e: nil,a$c: "T_TestSimpleOutput"});$X = a$d({a$j: [],a$e: $k,a$f: {$F:
/* T_TestInspect::TestInspect.main */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$a().$ai();
return _a}

},a$c: "T_TestInspect::TestInspect",a$h: {$ai:
/* T_TestInspect::TestInspect#test */
function(){var self,_a,_b;
_b=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=[$_.$aD(nil,"Hello","Rubyconf")];
_b=self.$u(nil,_a.$i());
return _b}

}});$ao = a$d({a$j: [],a$e: $k,a$c: "Regexp",a$d: RegExp});$ap = a$d({a$j: [],a$e: nil,a$c: "T_TestRegexp"});$aq = a$d({a$j: [],a$e: nil,a$c: "T_TestNew"});$ar = a$d({a$j: [],a$e: nil,a$c: "T_TestRange"});$0 = a$d({a$j: [],a$e: $k,a$f: {$F:
/* T_TestSend::TestSend.main */
function(){var self,_b,_c,_d,_e;
_e=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
self.$u(nil,"send");
self.$t(nil,$4.$a().$w(nil,"a_method",1,2));
self.$t(nil,$5.$a().$w(nil,"a_method",1,2));
self.$u(nil,"respond_to?");
self.$t(nil,$4.$a().$r(nil,"a_method"));
self.$t(nil,$4.$a().$r(nil,"to_s"));
self.$t(nil,$4.$a().$r(nil,"inspect"));
self.$t(nil,$4.$a().$r(nil,"b_method"));
self.$t(nil,$4.$a().$r(nil,"c_method"));
self.$u(nil,"method_missing");
self.$t(nil,$x.$a().$r(nil,"blah_blah"));
$x.$a().$a7(nil,1,2,3);
try{$4.$a().$a7();
self.$u(nil,"FAILURE?")}catch(_a){if(_a instanceof a$c)throw(_a);
if((_b=$g.$f(nil,_a),_b!==false&&_b!==nil)){self.$u(nil,"catched!!!")}else{throw(_a)}};
try{$4.$a8()}catch(_a){if(_a instanceof a$c)throw(_a);
if((_b=$g.$f(nil,_a),_b!==false&&_b!==nil)){self.$t(nil,"goood")}else{throw(_a)}};
self.$u(nil,"class Method");
_c="hallo".$C(nil,"to_s");
self.$t(nil,_c);
self.$t(nil,_c.$I());
_d=[1,2,3];
_c=_d.$C(nil,"+");
self.$t(nil,_c);
self.$t(nil,_c.$I(nil,[2,3]));
self.$t(nil,_c);
_e=self.$t(nil,_d);
return _e}

},a$c: "T_TestSend::TestSend"});$S = a$d({a$j: [],a$e: $k,a$f: {$F:
/* T_TestInsertionSort::TestInsertionSort.main */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$a().$a9(nil,[3,6,2,5,3,7,1,8]);
return _a}

},a$c: "T_TestInsertionSort::TestInsertionSort",a$h: {$a9:
/* T_TestInsertionSort::TestInsertionSort#sort */
function(_j,_a){var self,_c,_d,_e,_f,_g,_i;
_i=nil;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
self.$u(nil,"Before insertion sort:");
self.$t(nil,_a);
$G.$a(nil,1,_a.$T().$S(nil,1),false).$v(function(_b){var _h=nil;
_c=_b==null?nil:_b;
_d=_c;
while((_e=(_f=_d.$6(nil,1), (_f!==false&&_f!==nil) ? (_a.$V(nil,_d).$Y(nil,_a.$V(nil,_d.$S(nil,1)))) : _f),_e!==false&&_e!==nil)){if((_e=_a.$V(nil,_d).$Y(nil,_a.$V(nil,_d.$S(nil,1))),_e!==false&&_e!==nil)){_g=_a.$V(nil,_d);
_a.$aY(nil,_d,_a.$V(nil,_d.$S(nil,1)));
_a.$aY(nil,_d.$S(nil,1),_g)};
_d=_d.$S(nil,1)};
_h=nil;
;
return _h});
self.$u(nil,"After insertion sort:");
_i=self.$t(nil,_a);
return _i}catch(_k){if(_k instanceof a$c && (!_k.a$b || _k.a$b==86))return _k.a$a;
throw(_k)}}

}});$E = a$d({a$j: [$o],a$e: $k,a$f: {$a:
/* Array.new */
function(){var self;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
return []}

},a$c: "Array",a$d: Array,a$h: {$P:
/* Array#+ */
function(_b,_a){var self;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
return self.concat(_a)}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==89))return _c.a$a;
throw(_c)}}

,$H:
/* Array#<< */
function(_b,_a){var self;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
self.push(_a); return self}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==88))return _c.a$a;
throw(_c)}}

,$aF:
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
    return del ? _a : nil}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==87))return _c.a$a;
throw(_c)}}

,$Q:
/* Array#size */
function(){var self;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
return self.length}

,$V:
/* Array#[] */
function(_b,_a){var self;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
var v = self[_a]; return (v == null ? nil : v)}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==91))return _c.a$a;
throw(_c)}}

,$a$:
/* Array#clear */
function(){var self;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
self.length=0; return self}

,$g:
/* Array#eql? */
function(_b,_a){var self;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;

    if (!(_a instanceof Array)) return false;
    if (self.length != _a.length) return false;  

    //
    // compare element-wise
    //
    for (var i = 0; i < self.length; i++) 
    {
      if (! self[i].$g(nil, _a[i]))
      {
        // 
        // at least for one element #eql? holds not true
        //
        return false;
      }
    }
    
    return true;
    }catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==90))return _c.a$a;
throw(_c)}}

,$a_:
/* Array#reverse */
function(){var self;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
return self.concat().reverse()}

,$au:
/* Array#last */
function(){var self;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
var v = self[self.length - 1]; return (v == null ? nil : v)}

,$o:
/* Array#to_s */
function(){var self,_d;
_d=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_d=self.$K(function(_a){var _b;
var _c=nil;
_b=_a==null?nil:_a;
_c=_b.$o();
return _c}).$aX();
return _d}

,$aY:
/* Array#[]= */
function(_c,_a,_b){var self;
self=this;
try{if(arguments.length!=3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));
;
return (self[_a] = _b)}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==94))return _d.a$a;
throw(_d)}}

,$v:
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
    return self}catch(_b){if(_b instanceof a$c && (!_b.a$b || _b.a$b==93))return _b.a$a;
throw(_b)}}

,$ba:
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
    return self}catch(_b){if(_b instanceof a$c && (!_b.a$b || _b.a$b==92))return _b.a$a;
throw(_b)}}

,$3:
/* Array#first */
function(){var self;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
var v = self[0]; return (v == null ? nil : v)}

,$T:
/* Array#length */
function(){var self;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
return self.length}

,$bb:
/* Array#pop */
function(){var self;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;

    var elem = self.pop();
    return (elem == null ? nil : elem)}

,$k:
/* Array#shift */
function(){var self;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;

    var elem = self.shift();
    return (elem == null ? nil : elem)}

,$l:
/* Array#empty? */
function(){var self;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
return (self.length == 0)}

,$L:
/* Array#to_a */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self;
return _a}

,$bd:
/* Array#push */
function(){var self,_a,_b;
self=this;
_a=[];
for(_b=1;_b<arguments.length;_b++)_a.push(arguments[_b]);
;
self.push.apply(self, _a); return self}

,$bc:
/* Array#to_ary */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self;
return _a}

,$bg:
/* Array#dup */
function(){var self;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
return self.concat()}

,$i:
/* Array#inspect */
function(){var self,_a,_e;
_e=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a="[";
_a=_a.$P(nil,self.$K(function(_b){var _c;
var _d=nil;
_c=_b==null?nil:_b;
_d=_c.$i();
return _d}).$aX(nil,", "));
_a=_a.$P(nil,"]");
_e=_a;
return _e}

,$bf:
/* Array#reverse! */
function(){var self;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
self.reverse(); return self}

,$be:
/* Array#unshift */
function(){var self,_a,_b;
self=this;
_a=[];
for(_b=1;_b<arguments.length;_b++)_a.push(arguments[_b]);
;
self.unshift.apply(self, _a); return self}

,$aX:
/* Array#join */
function(_i,_a){var self,_b,_d,_h;
_h=nil;
self=this;
try{if(arguments.length>2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
if(_a==null)_a="";
;
_b="";
self.$ba(function(_c){var _e,_f;
var _g=nil;
(_d=a$l(_c),_e=_d[0]==null?nil:_d[0],_f=_d[1]==null?nil:_d[1],_d);
_b=_b.$P(nil,_e.$o());
if((_d=_f.$7(nil,self.$T().$S(nil,1)),_d===false||_d===nil)){_g=_b=_b.$P(nil,_a)}else{_g=nil};
return _g});
_h=_b;
return _h}catch(_j){if(_j instanceof a$c && (!_j.a$b || _j.a$b==95))return _j.a$a;
throw(_j)}}

}});      $b.a$e = $k;
var a$n = [$i,$k,$f,$l,$m,$n,$o,$e,$p,$q,$r,$s,$t,$u,$v,$h,$x,$y,$B,$C,$w,$D,$H,$I,$d,$J,$K,$L,$M,$N,$A,$j,$G,$P,$3,$4,$5,$6,$7,$8,$9,$a,$Q,$z,$V,$b,$c,$$,$U,$Y,$ad,$ae,$F,$af,$O,$g,$ab,$R,$ag,$_,$1,$ah,$Z,$W,$ai,$aj,$aa,$ak,$T,$ac,$2,$an,$X,$ao,$ap,$aq,$ar,$0,$S,$E];
a$o(a$n);
for (var i=0; i<a$n.length; i++) a$p(a$n[i]);
function main() { return $3.$F.apply($3, arguments); }var STDOUT_LINE_NO = 0;
var FAILURES = 0; 
var TOTAL = 406;

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
