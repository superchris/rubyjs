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
var a$h = {"$G":"test","$Q":"sub","$aI":"end","$v":"each","$ak":"sort","$a_":"to_f","$a8":"new_from_jsobject","$at":"m","$x":"loop","$$":"%","$am":"calc","$I":"collect","$aJ":"member?","$aU":"test_three_times_indirect","$ac":"&","$a3":"three_times_yield","$aK":"new_from_key_value_list","$aQ":"test_loop2","$f":"===","$aP":"three_times_block","$8":"==","$bd":"reverse","$a$":"to_i","$aV":"three_times_indirect","$6":"downto","$M":"map","$ab":"times","$t":"p","$aH":"include?","$a5":"keys","$s":"proc","$b":"allocate","$O":"reject","$aY":"three_times_yield2","$S":"size","$ai":"*","$R":"+","$aN":"delete","$bj":"unshift","$a7":"values","$aT":"return_in_block","$5":"upto","$bl":"dup","$T":"rjust","$U":"-","$bc":"not_a_method","$q":"nil?","$a":"new","$bi":"push","$aS":"test_while_loop","$_":"/","$K":"call","$D":"message","$y":"is_a?","$0":"split","$F":"main","$e":"name","$l":"empty?","$ba":"to_splat","$as":"add_msg","$aq":"jage","$j":"raise","$V":"length","$o":"to_s","$be":"clear","$7":">=","$ax":"c_method","$aO":"array","$aa":"|","$h":"kind_of?","$L":"find_all","$ad":"~","$aR":"loop2","$X":"[]","$1":"strip","$aX":"test_three_times_yield2","$a2":"test_return_in_block","$ag":"-@","$al":"[]=","$9":"succ","$bk":"reverse!","$B":"hash","$z":"class","$i":"inspect","$aZ":"test_three_times_block","$ae":"^","$a1":"test_three_times_yield","$bg":"pop","$p":"__send","$g":"eql?","$C":"method","$Z":"<","$ap":"wau","$4":"first","$aG":"begin","$J":"<<","$Y":"ljust","$d":"__invoke","$af":">","$W":"<=","$c":"initialize","$w":"send","$r":"respond_to?","$aw":"a_method","$a0":"test_loop","$k":"shift","$aM":"run","$bb":"blah_blah","$aF":"exclude_end?","$ah":"+@","$P":"select","$ao":"miau","$N":"to_a","$n":"method_missing","$2":"index","$H":"=~","$bf":"each_with_index","$a6":"join","$aW":"test_proc","$A":"tap","$aj":"addPrint","$aD":"last","$m":"instance_of?","$bh":"to_ary","$3":"gsub","$u":"puts"};
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

}});$l = a$d({a$j: [],a$e: $f,a$c: "StandardError"});$m = a$d({a$j: [],a$e: nil,a$c: "T_TestYield"});$n = a$d({a$j: [],a$e: nil,a$c: "T_TestIf"});$o = a$d({a$j: [],a$e: $k,a$f: {$F:
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

},a$c: "T_TestException::TestException"});$p = a$d({a$j: [],a$e: $k,a$c: "T_TestHotRuby::Foo2"});$q = a$d({a$j: [],a$e: $k,a$f: {$F:
/* T_TestRegexp::TestRegexp.main */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$a().$G();
return _a}

},a$c: "T_TestRegexp::TestRegexp",a$h: {$G:
/* T_TestRegexp::TestRegexp#test */
function(){var self,_a,_b,_c;
_c=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
if((_a="hallo".$H(nil,/ll/),_a!==false&&_a!==nil)){self.$t(nil,"okay")};
_b="hallo".$H(nil,/ll/);
self.$t(nil,_b);
"hallo".$H(nil,/(ll)/);
self.$t(nil,(RegExp.$1 || nil));
self.$t(nil,(RegExp.$2 || nil));
self.$t(nil,(RegExp.$3 || nil));
"hallo".$H(nil,/a(ll)(o)/);
self.$t(nil,(RegExp.$1 || nil));
self.$t(nil,(RegExp.$2 || nil));
self.$t(nil,(RegExp.$3 || nil));
_c=self.$t(nil,(RegExp.$4 || nil));
return _c}

}});$r = a$d({a$j: [],a$e: nil,a$c: "Enumerable",a$h: {$I:
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
_g=_c.$J(nil,((_f=_b,_f!==false&&_f!==nil)?_b.$K(nil,_e):_e));
return _g});
_h=_c;
return _h}catch(_i){if(_i instanceof a$c && (!_i.a$b || _i.a$b==19))return _i.a$a;
throw(_i)}}

,$L:
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
if((_e=_f(_c),_e!==false&&_e!==nil)){_d=_a.$J(nil,_c)}else{_d=nil};
return _d});
_g=_a;
return _g}catch(_h){if(_h instanceof a$c && (!_h.a$b || _h.a$b==20))return _h.a$a;
throw(_h)}}

,$M:
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
_g=_c.$J(nil,((_f=_b,_f!==false&&_f!==nil)?_b.$K(nil,_e):_e));
return _g});
_h=_c;
return _h}catch(_i){if(_i instanceof a$c && (!_i.a$b || _i.a$b==21))return _i.a$a;
throw(_i)}}

,$N:
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
_d=_a.$J(nil,_c);
return _d});
_e=_a;
return _e}

,$O:
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
if((_e=_f(_c),_e===false||_e===nil)){_d=_a.$J(nil,_c)}else{_d=nil};
return _d});
_g=_a;
return _g}catch(_h){if(_h instanceof a$c && (!_h.a$b || _h.a$b==22))return _h.a$a;
throw(_h)}}

,$P:
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
if((_e=_f(_c),_e!==false&&_e!==nil)){_d=_a.$J(nil,_c)}else{_d=nil};
return _d});
_g=_a;
return _g}catch(_h){if(_h instanceof a$c && (!_h.a$b || _h.a$b==23))return _h.a$a;
throw(_h)}}

}});$e = a$d({a$j: [],a$e: $k,a$c: "String",a$d: String,a$h: {$R:
/* String#+ */
function(_b,_a){var self;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
return(self + _a)}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==25))return _c.a$a;
throw(_c)}}

,$Q:
/* String#sub */
function(_c,_a,_b){var self;
self=this;
try{if(arguments.length!=3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));
;
self.replace(pattern, replacement)}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==24))return _d.a$a;
throw(_d)}}

,$H:
/* String#=~ */
function(_b,_a){var self;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;

    var i = self.search(_a);
    return (i == -1 ? nil : i)}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==27))return _c.a$a;
throw(_c)}}

,$T:
/* String#rjust */
function(_f,_a,_b){var self,_c,_d,_e;
self=this;
try{if(arguments.length<2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
if(arguments.length>3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));
if(_b==null)_b=" ";
;
if((_c=_b.$l(),_c!==false&&_c!==nil)){self.$j(nil,$a,"zero width padding")};
_d=_a.$U(nil,self.$V());
if((_c=_d.$W(nil,0),_c!==false&&_c!==nil)){return self};
_e="";
while(_e.length < _d) _e += _b;;
return _e.$X(nil,0,_d).$R(nil,self)}catch(_g){if(_g instanceof a$c && (!_g.a$b || _g.a$b==26))return _g.a$a;
throw(_g)}}

,$S:
/* String#size */
function(){var self;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
return self.length}

,$X:
/* String#[] */
function(_d,_a,_b){var self,_c;
self=this;
try{if(arguments.length<2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
if(arguments.length>3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));
if(_b==null)_b=nil;
;
if((_c=_b.$q(),_c!==false&&_c!==nil)){return self.charAt(_a) || nil}else{if((_c=_b.$Z(nil,0),_c!==false&&_c!==nil)){return nil};
return self.substring(_a, _a+_b)}}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==29))return _e.a$a;
throw(_e)}}

,$Y:
/* String#ljust */
function(_f,_a,_b){var self,_c,_d,_e;
self=this;
try{if(arguments.length<2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
if(arguments.length>3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));
if(_b==null)_b=" ";
;
if((_c=_b.$l(),_c!==false&&_c!==nil)){self.$j(nil,$a,"zero width padding")};
_d=_a.$U(nil,self.$V());
if((_c=_d.$W(nil,0),_c!==false&&_c!==nil)){return self};
_e="";
while(_e.length < _d) _e += _b;;
return self.$R(nil,_e.$X(nil,0,_d))}catch(_g){if(_g instanceof a$c && (!_g.a$b || _g.a$b==28))return _g.a$a;
throw(_g)}}

,$0:
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

,$V:
/* String#length */
function(){var self;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
return self.length}

,$1:
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

,$3:
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
if((_c=_b,_c!==false&&_c!==nil)){_d=_d.$R(nil,_b)}else{_d=_d.$R(nil,_g(_f.$4()).$o())};
_e = _e.slice(_f.index + _f[0].length);
      } else {
        _d += _e; _e = '';
      }
    } return _d}catch(_h){if(_h instanceof a$c && (!_h.a$b || _h.a$b==32))return _h.a$a;
throw(_h)}}

,$2:
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
_b=self.$3(function(_c){var _d,_e;
_d=_c==null?nil:_c;
_e=_a[_d];
return _e ? _e : 
        '\\u00' + ("0" + _d.charCodeAt().toString(16)).substring(0,2);},/[\x00-\x1f\\]/);
return ('"' + _b.replace(/"/g, '\\"') + '"');}

}});$s = a$d({a$j: [],a$e: $k,a$c: "Number",a$d: Number,a$h: {$R:
/* Number#+ */
function(_b,_a){var self;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
return self + _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==36))return _c.a$a;
throw(_c)}}

,$8:
/* Number#== */
function(_b,_a){var self;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
return self == _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==35))return _c.a$a;
throw(_c)}}

,$6:
/* Number#downto */
function(_d,_a){var self,_b,_c;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
_b=self;
while((_c=_b.$7(nil,_a),_c!==false&&_c!==nil)){_d(_b);
_b=_b.$U(nil,1)};
return self}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==34))return _e.a$a;
throw(_e)}}

,$5:
/* Number#upto */
function(_d,_a){var self,_b,_c;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
_b=self;
while((_c=_b.$W(nil,_a),_c!==false&&_c!==nil)){_d(_b);
_b=_b.$R(nil,1)};
return self}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==33))return _e.a$a;
throw(_e)}}

,$W:
/* Number#<= */
function(_b,_a){var self;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
return self <= _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==37))return _c.a$a;
throw(_c)}}

,$U:
/* Number#- */
function(_b,_a){var self;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
return self - _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==38))return _c.a$a;
throw(_c)}}

,$9:
/* Number#succ */
function(){var self;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
return self+1}

,$_:
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

,$$:
/* Number#% */
function(_b,_a){var self;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
return self % _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==41))return _c.a$a;
throw(_c)}}

,$ac:
/* Number#& */
function(_b,_a){var self;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
return self & _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==45))return _c.a$a;
throw(_c)}}

,$Z:
/* Number#< */
function(_b,_a){var self;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
return self < _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==44))return _c.a$a;
throw(_c)}}

,$ab:
/* Number#times */
function(_c){var self,_a,_b;
self=this;
try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=0;
while((_b=_a.$Z(nil,self),_b!==false&&_b!==nil)){_c(_a);
_a=_a.$R(nil,1)};
return self}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==43))return _d.a$a;
throw(_d)}}

,$aa:
/* Number#| */
function(_b,_a){var self;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
return self | _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==42))return _c.a$a;
throw(_c)}}

,$ag:
/* Number#-@ */
function(){var self;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
return -self}

,$af:
/* Number#> */
function(_b,_a){var self;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
return self > _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==47))return _c.a$a;
throw(_c)}}

,$ae:
/* Number#^ */
function(_b,_a){var self;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
return self ^ _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==46))return _c.a$a;
throw(_c)}}

,$ad:
/* Number#~ */
function(){var self;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
return ~self}

,$7:
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

,$ai:
/* Number#* */
function(_b,_a){var self;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
return self * _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==49))return _c.a$a;
throw(_c)}}

,$ah:
/* Number#+@ */
function(){var self;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
return self}

}});$t = a$d({a$j: [],a$e: $s,a$c: "Float",a$d: Number});$u = a$d({a$j: [],a$e: $k,a$c: "T_TestHotRuby::Object"});$y = a$d({a$j: [],a$e: $k,a$f: {$F:
/* T_TestHotRuby::TestHotRuby.main */
function(){var self,_a,_b,_c;
_c=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$a();
self.$u(nil,"InsertionSort");
_a.$ak(nil,[3,6,2,5,3,7,1,8]);
self.$u(nil,"Array args");
_b=[" World ","!"];
_a.$d(nil,'$aj',["Hello"].concat(a$b(_b)));
self.$u(nil,"Block");
$w.$a().$F();
self.$u(nil,"Class");
self.$u(nil,"PI is about");
self.$u(nil,$x.$a().$am().$o().$X(nil,0,13));
_c=self.$u(nil,"Const");
return _c}

},a$c: "T_TestHotRuby::TestHotRuby",a$h: {$aj:
/* T_TestHotRuby::TestHotRuby#addPrint */
function(_e,_a,_b,_c){var self,_d;
_d=nil;
self=this;
try{if(arguments.length!=4)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 3)'));
;
_d=self.$u(nil,_a.$R(nil,_b).$R(nil,_c));
return _d}catch(_f){if(_f instanceof a$c && (!_f.a$b || _f.a$b==50))return _f.a$a;
throw(_f)}}

,$ak:
/* T_TestHotRuby::TestHotRuby#sort */
function(_j,_a){var self,_c,_d,_e,_f,_g,_i;
_i=nil;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
self.$u(nil,"Before insertion sort:");
self.$t(nil,_a);
$v.$a(nil,1,_a.$V().$U(nil,1),false).$v(function(_b){var _h=nil;
_c=_b==null?nil:_b;
_d=_c;
while((_e=(_f=_d.$7(nil,1), (_f!==false&&_f!==nil) ? (_a.$X(nil,_d).$Z(nil,_a.$X(nil,_d.$U(nil,1)))) : _f),_e!==false&&_e!==nil)){if((_e=_a.$X(nil,_d).$Z(nil,_a.$X(nil,_d.$U(nil,1))),_e!==false&&_e!==nil)){_g=_a.$X(nil,_d);
_a.$al(nil,_d,_a.$X(nil,_d.$U(nil,1)));
_a.$al(nil,_d.$U(nil,1),_g)};
_d=_d.$U(nil,1)};
_h=nil;
;
return _h});
self.$u(nil,"After insertion sort:");
_i=self.$t(nil,_a);
return _i}catch(_k){if(_k instanceof a$c && (!_k.a$b || _k.a$b==51))return _k.a$a;
throw(_k)}}

}});$x = a$d({a$j: [],a$e: $k,a$c: "T_TestHotRuby::Pi",a$h: {$c:
/* T_TestHotRuby::Pi#initialize */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$an=355.0;
return _a}

,$am:
/* T_TestHotRuby::Pi#calc */
function(){var self,_a;
self=this;
if(self.$an==null)self.$an=nil;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=113.0;
return self.$an.$_(nil,_a)}

}});$S = a$d({a$j: [],a$e: $k,a$f: {$F:
/* TestSuite.main */
function(){var self,_c,_d,_b;
_b=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
try{self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
self.$u(nil,"Test hash");
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
$z.$F();
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
self.$u(nil,"Test yield");
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
$A.$F();
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
self.$u(nil,"Test insertion sort");
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
$B.$F();
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
self.$u(nil,"Test lebewesen");
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
$C.$F();
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
self.$u(nil,"Test expr");
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
$D.$F();
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
self.$u(nil,"Test simple output");
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
$E.$F();
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
self.$u(nil,"Test if");
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
$F.$F();
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
self.$u(nil,"Test class");
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
$G.$F();
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
self.$u(nil,"Test case");
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
$H.$F();
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
self.$u(nil,"Test splat");
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
$I.$F();
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
self.$u(nil,"Test string");
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
$J.$F();
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
self.$u(nil,"Test inspect");
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
$K.$F();
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
self.$u(nil,"Test regexp");
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
$q.$F();
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
self.$u(nil,"Test args");
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
$L.$F();
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
self.$u(nil,"Test array");
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
$M.$F();
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
self.$u(nil,"Test eql");
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
$N.$F();
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
self.$u(nil,"Test send");
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
$O.$F();
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
self.$u(nil,"Test range");
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
$P.$F();
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
self.$u(nil,"Test massign");
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
$Q.$F();
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
self.$u(nil,"Test hot ruby");
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
$y.$F();
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
self.$u(nil,"Test new");
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
$R.$F();
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
self.$u(nil,"Test exception");
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
_b=$o.$F()}catch(_a){if(_a instanceof a$c)throw(_a);
if((_d=$f.$f(nil,_a),_d!==false&&_d!==nil)){_c=_a;
self.$t(nil,"unhandled exception");
_b=self.$t(nil,_c)}else{throw(_a)}};
return _b}

},a$c: "TestSuite"});$T = a$d({a$j: [],a$e: nil,a$c: "T_TestArgs"});$C = a$d({a$j: [],a$e: $k,a$f: {$F:
/* T_TestLebewesen::TestLebewesen.main */
function(){var self,_a,_b,_c,_d;
_d=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=$U.$a(nil,"AA-BB","Leni");
_b=$U.$a(nil,"AC-DC","Flocki");
_c=$V.$a(nil,"AA-ZZ");
_a.$ao();
_c.$ap();
_d=_c.$aq(nil,_a);
return _d}

},a$c: "T_TestLebewesen::TestLebewesen"});$W = a$d({a$j: [],a$e: nil,a$c: "T_TestNew"});$X = a$d({a$j: [],a$e: $k,a$c: "T_TestSend::C",a$h: {$n:
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
return _f}catch(_g){if(_g instanceof a$c && (!_g.a$b || _g.a$b==52))return _g.a$a;
throw(_g)}}

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
        return _b.$K.apply(_b, arguments);
      } catch(e) 
      {
        if (e instanceof a$c) 
        {
          if (e.a$b == null)
          {;
self.$j(nil,$Y,"break from proc-closure");
}
          return e.a$a;
        }
        else throw(e);
      }
    })}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==53))return _d.a$a;
throw(_d)}}

},a$c: "Proc",a$d: Function,a$h: {$K:
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

}});$Y = a$d({a$j: [],a$e: $l,a$c: "LocalJumpError"});$Z = a$d({a$j: [],a$e: $s,a$c: "Bignum",a$d: Number});$0 = a$d({a$j: [],a$e: nil,a$c: "T_TestExpr"});$H = a$d({a$j: [],a$e: $k,a$f: {$F:
/* T_TestCase::TestCase.main */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$a().$G();
return _a}

},a$c: "T_TestCase::TestCase",a$h: {$G:
/* T_TestCase::TestCase#test */
function(){var self,_a,_b,_c,_d;
_d=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=(1).$R(nil,1);
if((_b=(_c=(1).$f(nil,_a), (_c!==false&&_c!==nil) ? _c : ((3).$f(nil,_a))),_b!==false&&_b!==nil)){self.$u(nil,"NOT OKAY")}else{if((_b=(2).$f(nil,_a),_b!==false&&_b!==nil)){self.$u(nil,"OKAY")}else{self.$u(nil,"NOT OKAY")}};
self.$t(nil,$1.$f(nil,[]));
self.$t(nil,$c.$f(nil,$c.$a()));
_a=1;
if((_b=$2.$f(nil,_a),_b!==false&&_b!==nil)){self.$u(nil,"OK")}else{if((_b=(1).$f(nil,_a),_b!==false&&_b!==nil)){self.$u(nil,"OK")}};
_a=_d=4;
if((_b=$v.$a(nil,0,3,false).$f(nil,_a),_b!==false&&_b!==nil)){_d=self.$u(nil,"NOT OKAY")}else{if((_b=$v.$a(nil,1,4,true).$f(nil,_a),_b!==false&&_b!==nil)){_d=self.$u(nil,"NOT OKAY")}else{if((_b=$v.$a(nil,2,4,false).$f(nil,_a),_b!==false&&_b!==nil)){_d=self.$u(nil,"OKAY")}else{_d=nil}}};
return _d}

}});$w = a$d({a$j: [],a$e: $k,a$c: "T_TestHotRuby::Foo",a$h: {$F:
/* T_TestHotRuby::Foo#main */
function(){var self,_a,_f;
_f=nil;
self=this;
if(self.$ar==null)self.$ar=nil;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a="Action";
self.$ar=" ";
_f=$3.$a().$as(function(_b){var _c,_d;
var _e=nil;
_c=_b==null?nil:_b;
_d="eloquence";
_e=self.$u(nil,_a.$R(nil,self.$ar).$R(nil,_c).$R(nil,self.$ar).$R(nil,_d).$R(nil," - William Shakespeare"));
return _e});
return _f}

}});$F = a$d({a$j: [],a$e: $k,a$f: {$F:
/* T_TestIf::TestIf.main */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$a().$G();
return _a}

},a$c: "T_TestIf::TestIf",a$h: {$G:
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
if((_a=(_b=(5).$Z(nil,6), (_b!==false&&_b!==nil) ? ((6).$Z(nil,7)) : _b),_a!==false&&_a!==nil)){self.$u(nil,"OK")};
self.$t(nil,(_a=false, (_a!==false&&_a!==nil) ? _a : ("a")));
self.$t(nil,(_a=nil, (_a!==false&&_a!==nil) ? _a : ("a")));
self.$t(nil,(_a=true, (_a!==false&&_a!==nil) ? _a : ("a")));
self.$t(nil,(_a="b", (_a!==false&&_a!==nil) ? _a : ("a")));
self.$t(nil,(_a=false, (_a!==false&&_a!==nil) ? ("a") : _a));
self.$t(nil,(_a=nil, (_a!==false&&_a!==nil) ? ("a") : _a));
self.$t(nil,(_a=true, (_a!==false&&_a!==nil) ? ("a") : _a));
_f=self.$t(nil,(_a="b", (_a!==false&&_a!==nil) ? ("a") : _a));
return _f}

}});$L = a$d({a$j: [],a$e: $k,a$f: {$F:
/* T_TestArgs::TestArgs.main */
function(){var self,_a,_b;
_b=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$a();
_a.$at(nil,0);
self.$u(nil,"--");
_a.$at(nil,1,2);
self.$u(nil,"--");
_a.$at(nil,1,2,9);
self.$u(nil,"--");
_a.$at(nil,1,2,9,5);
self.$u(nil,"--");
_a.$at(nil,1,2,9,5,6);
self.$u(nil,"--");
_b=_a.$at(nil,1,2,9,5,6,7,8,9,10,11,12);
return _b}

},a$c: "T_TestArgs::TestArgs",a$h: {$at:
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
return _f}catch(_h){if(_h instanceof a$c && (!_h.a$b || _h.a$b==54))return _h.a$a;
throw(_h)}}

}});$4 = a$d({a$j: [],a$e: $k,a$c: "T_TestLebewesen::Lebewesen",a$h: {$c:
/* T_TestLebewesen::Lebewesen#initialize */
function(_c,_a){var self,_b;
_b=nil;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
_b=self.$au=_a;
return _b}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==55))return _d.a$a;
throw(_d)}}

}});$V = a$d({a$j: [],a$e: $4,a$c: "T_TestLebewesen::Hund",a$h: {$ap:
/* T_TestLebewesen::Hund#wau */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$u(nil,"wau wau");
return _a}

,$aq:
/* T_TestLebewesen::Hund#jage */
function(_c,_a){var self,_b;
_b=nil;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
_b=self.$u(nil,"ich jage ".$R(nil,_a.$e()));
return _b}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==56))return _d.a$a;
throw(_d)}}

}});$5 = a$d({a$j: [],a$e: nil,a$c: "T_TestSplat"});$d = a$d({a$j: [],a$e: $l,a$c: "TypeError"});$6 = a$d({a$j: [],a$e: $k,a$c: "MatchData",a$h: {$c:
/* MatchData#initialize */
function(_c,_a){var self,_b;
_b=nil;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
_b=self.$av=_a;
return _b}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==57))return _d.a$a;
throw(_d)}}

}});$7 = a$d({a$j: [],a$e: $k,a$c: "T_TestSend::A",a$h: {$aw:
/* T_TestSend::A#a_method */
function(_d,_a,_b){var self,_c;
_c=nil;
self=this;
try{if(arguments.length!=3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));
;
_c=self.$t(nil,_a,_b);
return _c}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==58))return _e.a$a;
throw(_e)}}

}});$8 = a$d({a$j: [],a$e: $7,a$c: "T_TestSend::B",a$h: {$aw:
/* T_TestSend::B#a_method */
function(_d,_a,_b){var self;
self=this;
var _c=arguments;
try{if(arguments.length!=3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));
;
self.$t(nil,"in B");
a$j(self,'$aw',_c)}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==59))return _e.a$a;
throw(_e)}}

,$ax:
/* T_TestSend::B#c_method */
function(_c,_a){var self,_b;
_b=nil;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
_b=nil;
return _b}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==60))return _d.a$a;
throw(_d)}}

}});$9 = a$d({a$j: [],a$e: nil,a$c: "T_TestClass"});$_ = a$d({a$j: [],a$e: nil,a$c: "T_TestClass::X"});$$ = a$d({a$j: [$_],a$e: $k,a$c: "T_TestClass::A"});$aa = a$d({a$j: [],a$e: $$,a$c: "T_TestClass::B"});$ab = a$d({a$j: [],a$e: nil,a$c: "T_TestArray"});$j = a$d({a$j: [],a$e: $k,a$c: "Method",a$h: {$c:
/* Method#initialize */
function(_f,_a,_b){var self,_c,_d,_e;
_e=nil;
self=this;
try{if(arguments.length!=3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));
;
(_c=[_a,_b],self.$ay=_c[0]==null?nil:_c[0],self.$az=_c[1]==null?nil:_c[1],_c);
_d=nil;
_d = _a[a$f[_b]];
    if (_d==null) _d = nil;;
if((_c=_d,_c!==false&&_c!==nil)){_e=self.$aA=_d}else{_e=self.$j(nil,$ac,("undefined method `" + (_b).$o() + ("' for class `").$o() + (_a.$z().$e()).$o() + ("'").$o()))};
return _e}catch(_g){if(_g instanceof a$c && (!_g.a$b || _g.a$b==61))return _g.a$a;
throw(_g)}}

,$K:
/* Method#call */
function(_c){var self,_a,_b,_d;
self=this;
_d=_c==null?nil:_c;
try{_a=[];
for(_b=1;_b<arguments.length;_b++)_a.push(arguments[_b]);
;
return self.$aA.apply(self.$ay, [_d].concat(_a))}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==62))return _e.a$a;
throw(_e)}}

,$i:
/* Method#inspect */
function(){var self,_a;
_a=nil;
self=this;
if(self.$ay==null)self.$ay=nil;
if(self.$az==null)self.$az=nil;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=("#<Method: " + (self.$ay.$z().$e()).$o() + ("#").$o() + (self.$az).$o() + (">").$o());
return _a}

}});$v = a$d({a$j: [],a$e: $k,a$c: "Range",a$h: {$8:
/* Range#== */
function(_e,_a){var self,_b,_c,_d;
_d=nil;
self=this;
if(self.$aB==null)self.$aB=nil;
if(self.$aC==null)self.$aC=nil;
if(self.$aE==null)self.$aE=nil;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
if (self.constructor != _a.constructor) return false;;
_d=(_b=self.$aB.$8(nil,_a.$4()), (_b!==false&&_b!==nil) ? ((_c=self.$aC.$8(nil,_a.$aD()), (_c!==false&&_c!==nil) ? (self.$aE.$8(nil,_a.$aF())) : _c)) : _b);
return _d}catch(_f){if(_f instanceof a$c && (!_f.a$b || _f.a$b==63))return _f.a$a;
throw(_f)}}

,$aG:
/* Range#begin */
function(){var self,_a;
_a=nil;
self=this;
if(self.$aB==null)self.$aB=nil;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$aB;
return _a}

,$g:
/* Range#eql? */
function(_e,_a){var self,_b,_c,_d;
_d=nil;
self=this;
if(self.$aB==null)self.$aB=nil;
if(self.$aC==null)self.$aC=nil;
if(self.$aE==null)self.$aE=nil;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
if (self.constructor != _a.constructor) return false;;
_d=(_b=self.$aB.$g(nil,_a.$4()), (_b!==false&&_b!==nil) ? ((_c=self.$aC.$g(nil,_a.$aD()), (_c!==false&&_c!==nil) ? (self.$aE.$8(nil,_a.$aF())) : _c)) : _b);
return _d}catch(_f){if(_f instanceof a$c && (!_f.a$b || _f.a$b==64))return _f.a$a;
throw(_f)}}

,$aF:
/* Range#exclude_end? */
function(){var self,_a;
_a=nil;
self=this;
if(self.$aE==null)self.$aE=nil;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$aE;
return _a}

,$aD:
/* Range#last */
function(){var self,_a;
_a=nil;
self=this;
if(self.$aC==null)self.$aC=nil;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$aC;
return _a}

,$o:
/* Range#to_s */
function(){var self,_b,_a;
_a=nil;
self=this;
if(self.$aB==null)self.$aB=nil;
if(self.$aC==null)self.$aC=nil;
if(self.$aE==null)self.$aE=nil;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
if((_b=self.$aE,_b!==false&&_b!==nil)){_a=("" + (self.$aB).$o() + ("...").$o() + (self.$aC).$o())}else{_a=("" + (self.$aB).$o() + ("..").$o() + (self.$aC).$o())};
return _a}

,$v:
/* Range#each */
function(_c){var self,_a,_b,_d;
_d=nil;
self=this;
if(self.$aB==null)self.$aB=nil;
if(self.$aC==null)self.$aC=nil;
if(self.$aE==null)self.$aE=nil;
try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$aB;
if((_b=self.$aB.$af(nil,self.$aC),_b!==false&&_b!==nil)){return nil};
if((_b=self.$aE,_b!==false&&_b!==nil)){while((_b=_a.$Z(nil,self.$aC),_b!==false&&_b!==nil)){_c(_a);
_a=_a.$9()};
_d=nil;
}else{while((_b=_a.$W(nil,self.$aC),_b!==false&&_b!==nil)){_c(_a);
_a=_a.$9()};
_d=nil;
};
return _d}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==67))return _e.a$a;
throw(_e)}}

,$aI:
/* Range#end */
function(){var self,_a;
_a=nil;
self=this;
if(self.$aC==null)self.$aC=nil;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$aC;
return _a}

,$4:
/* Range#first */
function(){var self,_a;
_a=nil;
self=this;
if(self.$aB==null)self.$aB=nil;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$aB;
return _a}

,$aH:
/* Range#include? */
function(_d,_a){var self,_b,_c;
_c=nil;
self=this;
if(self.$aB==null)self.$aB=nil;
if(self.$aC==null)self.$aC=nil;
if(self.$aE==null)self.$aE=nil;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
if((_b=_a.$Z(nil,self.$aB),_b!==false&&_b!==nil)){return false};
if((_b=self.$aE,_b!==false&&_b!==nil)){_c=_a.$Z(nil,self.$aC)}else{_c=_a.$W(nil,self.$aC)};
return _c}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==66))return _e.a$a;
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
(_d=[_a,_b],self.$aB=_d[0]==null?nil:_d[0],self.$aC=_d[1]==null?nil:_d[1],_d);
_e=self.$aE=((_d=_c,_d!==false&&_d!==nil)?true:false);
return _e}catch(_g){if(_g instanceof a$c && (!_g.a$b || _g.a$b==65))return _g.a$a;
throw(_g)}}

,$f:
/* Range#=== */
function(_d,_a){var self,_b,_c;
_c=nil;
self=this;
if(self.$aB==null)self.$aB=nil;
if(self.$aC==null)self.$aC=nil;
if(self.$aE==null)self.$aE=nil;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
if((_b=_a.$Z(nil,self.$aB),_b!==false&&_b!==nil)){return false};
if((_b=self.$aE,_b!==false&&_b!==nil)){_c=_a.$Z(nil,self.$aC)}else{_c=_a.$W(nil,self.$aC)};
return _c}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==68))return _e.a$a;
throw(_e)}}

,$N:
/* Range#to_a */
function(){var self,_a,_b,_c;
self=this;
if(self.$aB==null)self.$aB=nil;
if(self.$aC==null)self.$aC=nil;
if(self.$aE==null)self.$aE=nil;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=[];
if((_b=self.$aB.$af(nil,self.$aC),_b!==false&&_b!==nil)){return _a};
_c=self.$aB;
if((_b=self.$aE,_b!==false&&_b!==nil)){while((_b=_c.$Z(nil,self.$aC),_b!==false&&_b!==nil)){_a.$J(nil,_c);
_c=_c.$9()}}else{while((_b=_c.$W(nil,self.$aC),_b!==false&&_b!==nil)){_a.$J(nil,_c);
_c=_c.$9()}};
return _a}

,$i:
/* Range#inspect */
function(){var self,_b,_a;
_a=nil;
self=this;
if(self.$aB==null)self.$aB=nil;
if(self.$aC==null)self.$aC=nil;
if(self.$aE==null)self.$aE=nil;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
if((_b=self.$aE,_b!==false&&_b!==nil)){_a=("" + (self.$aB.$i()).$o() + ("...").$o() + (self.$aC.$i()).$o())}else{_a=("" + (self.$aB.$i()).$o() + ("..").$o() + (self.$aC.$i()).$o())};
return _a}

,$aJ:
/* Range#member? */
function(_d,_a){var self,_b,_c;
_c=nil;
self=this;
if(self.$aB==null)self.$aB=nil;
if(self.$aC==null)self.$aC=nil;
if(self.$aE==null)self.$aE=nil;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
if((_b=_a.$Z(nil,self.$aB),_b!==false&&_b!==nil)){return false};
if((_b=self.$aE,_b!==false&&_b!==nil)){_c=_a.$Z(nil,self.$aC)}else{_c=_a.$W(nil,self.$aC)};
return _c}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==69))return _e.a$a;
throw(_e)}}

}});$a = a$d({a$j: [],a$e: $l,a$c: "ArgumentError"});$z = a$d({a$j: [],a$e: $k,a$f: {$F:
/* T_TestHash::TestHash.main */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$a().$G();
return _a}

},a$c: "T_TestHash::TestHash",a$h: {$B:
/* T_TestHash::TestHash#hash */
function(){var self;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
var el = {}; el["1"] = null; return el}

,$G:
/* T_TestHash::TestHash#test */
function(){var self,_a,_b,_c;
_c=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=$ad.$aK(nil,"a",6,"b",7,"1",1,1,2,"1,2","hello",[1,2],"good");
self.$t(nil,_a.$X(nil,"a"));
self.$t(nil,_a.$X(nil,"b"));
self.$t(nil,_a.$X(nil,"1"));
self.$t(nil,_a.$X(nil,1));
self.$t(nil,_a.$X(nil,"1,2"));
self.$t(nil,_a.$X(nil,[1,2]));
self.$u(nil,"test native JS hash");
_c=_b=self.$B();
return _c}

}});$U = a$d({a$j: [],a$e: $4,a$c: "T_TestLebewesen::Katze",a$h: {$e:
/* T_TestLebewesen::Katze#name */
function(){var self,_a;
_a=nil;
self=this;
if(self.$aL==null)self.$aL=nil;
_a=self.$aL;
return _a}

,$c:
/* T_TestLebewesen::Katze#initialize */
function(_d,_a,_b){var self,_c;
_c=nil;
self=this;
try{if(arguments.length!=3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));
;
a$k(self,'$c',nil,[_a]);
_c=self.$aL=_b;
return _c}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==70))return _e.a$a;
throw(_e)}}

,$ao:
/* T_TestLebewesen::Katze#miau */
function(){var self,_a;
_a=nil;
self=this;
if(self.$aL==null)self.$aL=nil;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$u(nil,"miau, ich bin ".$R(nil,self.$aL));
return _a}

}});$I = a$d({a$j: [],a$e: $k,a$f: {$F:
/* T_TestSplat::TestSplat.main */
function(){var self,_a,_b;
_b=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$a();
_a.$at();
_a.$d(nil,'$at',a$b([]));
_a.$at(nil,1);
_a.$d(nil,'$at',a$b([1]));
_a.$d(nil,'$at',[1].concat(a$b([])));
_a.$at(nil,1,2);
_a.$d(nil,'$at',a$b([1,2]));
_a.$d(nil,'$at',[1].concat(a$b([2])));
_b=_a.$d(nil,'$at',[1].concat(a$b([1,2])));
return _b}

},a$c: "T_TestSplat::TestSplat",a$h: {$at:
/* T_TestSplat::TestSplat#m */
function(){var self,_a,_b,_c;
_c=nil;
self=this;
_a=[];
for(_b=1;_b<arguments.length;_b++)_a.push(arguments[_b]);
;
_c=self.$t(nil,_a);
return _c}

}});$ae = a$d({a$j: [],a$e: $k,a$c: "T_TestHotRuby::Foo_"});$af = a$d({a$j: [],a$e: $ae,a$c: "T_TestHotRuby::Bar_::Baz_",a$h: {$aM:
/* T_TestHotRuby::Bar_::Baz_#run */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
self.$u(nil,"Foo");
_a=self.$u(nil,"Foo");
return _a}

}});$G = a$d({a$j: [],a$e: $k,a$f: {$F:
/* T_TestClass::TestClass.main */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
self.$t(nil,$$.$a().$m(nil,$$));
self.$t(nil,$$.$a().$m(nil,$aa));
self.$t(nil,$aa.$a().$m(nil,$$));
self.$t(nil,$$.$a().$m(nil,$_));
self.$t(nil,$aa.$a().$m(nil,$_));
self.$t(nil,$$.$a().$h(nil,$$));
self.$t(nil,$$.$a().$h(nil,$aa));
self.$t(nil,$aa.$a().$h(nil,$$));
self.$t(nil,$$.$a().$h(nil,$_));
self.$t(nil,$aa.$a().$h(nil,$_));
self.$t(nil,$ag.$a().$h(nil,$_));
self.$t(nil,$ag.$a().$h(nil,$$));
self.$t(nil,$ag.$a().$h(nil,$aa));
self.$t(nil,$ag.$a().$h(nil,$ag));
self.$t(nil,$ag.$a().$h(nil,$ah));
self.$t(nil,$ag.$a().$h(nil,$k));
self.$t(nil,$ag.$a().$h(nil,$i));
self.$t(nil,$ag.$a().$h(nil,$b));
self.$t(nil,"hallo".$z().$e());
self.$t(nil,nil.$z().$e());
self.$t(nil,nil.$m(nil,$ai));
self.$t(nil,"hallo".$m(nil,$e));
self.$t(nil,"hallo".$z());
self.$t(nil,$$);
self.$t(nil,$aa);
self.$t(nil,$ag);
self.$t(nil,$ah);
self.$t(nil,$_);
self.$t(nil,$_.$e());
self.$t(nil,$$.$e());
_a=self.$t(nil,$aa.$e());
return _a}

},a$c: "T_TestClass::TestClass"});$M = a$d({a$j: [],a$e: $k,a$f: {$F:
/* T_TestArray::TestArray.main */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$a().$G();
return _a}

},a$c: "T_TestArray::TestArray",a$h: {$aO:
/* T_TestArray::TestArray#array */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=[1,2,null,[null,null,4]];
return _a}

,$G:
/* T_TestArray::TestArray#test */
function(){var self,_a,_b;
_b=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=["a","b","b","b","c"];
self.$t(nil,_a.$aN(nil,"b"));
self.$t(nil,_a);
self.$t(nil,_a.$aN(nil,"z"));
self.$u(nil,"test native JS array mapping");
_b=self.$t(nil,self.$aO());
return _b}

}});$aj = a$d({a$j: [],a$e: nil,a$c: "T_TestString"});a$d({a$j: [],a$g: $b});$c = a$d({a$j: [],a$e: $l,a$c: "RuntimeError"});$3 = a$d({a$j: [],a$e: $k,a$c: "T_TestHotRuby::Hoge",a$h: {$as:
/* T_TestHotRuby::Hoge#add_msg */
function(_a){var self,_b,_c;
_c=nil;
self=this;
_b=_a==null?nil:_a;
try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_c=_b.$K(nil,"is");
return _c}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==71))return _d.a$a;
throw(_d)}}

}});$ak = a$d({a$j: [],a$e: nil,a$c: "T_TestCase"});$al = a$d({a$j: [],a$e: nil,a$c: "T_TestEql"});$2 = a$d({a$j: [],a$e: $s,a$c: "Fixnum",a$d: Number});$am = a$d({a$j: [],a$e: nil,a$c: "T_TestHash"});$ah = a$d({a$j: [],a$e: $k,a$c: "T_TestClass::D"});$A = a$d({a$j: [],a$e: $k,a$f: {$F:
/* T_TestYield::TestYield.main */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$a().$G();
return _a}

},a$c: "T_TestYield::TestYield",a$h: {$aQ:
/* T_TestYield::TestYield#test_loop2 */
function(){var self,_a,_b,_d,_f;
_f=nil;
self=this;
try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
self.$u(nil,"loop2");
_a=0;
_b=self.$aR(function(){var _e=nil;
;
_a=_a.$R(nil,1);
if((_d=_a.$$(nil,2).$8(nil,1),_d!==false&&_d!==nil)){return nil};
self.$t(nil,_a);
if((_d=_a.$af(nil,8),_d!==false&&_d!==nil)){throw(new a$c(["out",_a],null))}else{_e=nil};
return _e});
self.$t(nil,_b);
_f=self.$u(nil,"--");
return _f}catch(_g){if(_g instanceof a$c && (!_g.a$b || _g.a$b==73))return _g.a$a;
throw(_g)}}

,$aP:
/* T_TestYield::TestYield#three_times_block */
function(_a){var self,_b,_c;
_c=nil;
self=this;
_b=_a==null?nil:_a;
try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_b.$K(nil,1);
_b.$K(nil,2);
_c=_b.$K(nil,3);
return _c}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==72))return _d.a$a;
throw(_d)}}

,$aT:
/* T_TestYield::TestYield#return_in_block */
function(_a){var self,_b,_c;
_c=nil;
self=this;
_b=_a==null?nil:_a;
try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
self.$t(nil,"return_in_block before");
_b.$K();
_c=self.$t(nil,"return_in_block after");
return _c}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==74))return _d.a$a;
throw(_d)}}

,$aS:
/* T_TestYield::TestYield#test_while_loop */
function(){var self,_a,_b,_c;
_c=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
self.$u(nil,"while-loop");
_a=0;
while(true){_a=_a.$R(nil,1);
if((_b=_a.$$(nil,2).$8(nil,1),_b!==false&&_b!==nil)){continue};
self.$t(nil,_a);
if((_b=_a.$af(nil,8),_b!==false&&_b!==nil)){break}};
self.$u(nil,"----");
while((_b=_a.$af(nil,0),_b!==false&&_b!==nil)){self.$t(nil,_a);
_a=_a.$U(nil,1)};
_c=self.$u(nil,"--");
return _c}

,$aR:
/* T_TestYield::TestYield#loop2 */
function(_a){var self,_b,_c;
_c=nil;
self=this;
_b=_a==null?nil:_a;
try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
while(true){_b.$K()};
_c=self.$t(nil,"not reached");
return _c}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==76))return _d.a$a;
throw(_d)}}

,$aW:
/* T_TestYield::TestYield#test_proc */
function(){var self,_a,_d;
_d=nil;
self=this;
try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
self.$t(nil,"test_proc");
_a=self.$s(function(){;
throw(new a$c(0,75))});
self.$t(nil,_a.$K());
_a=$h.$a(function(){;
throw(new a$c(3,null))});
_d=self.$t(nil,_a.$K());
return _d}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==75))return _e.a$a;
throw(_e)}}

,$aU:
/* T_TestYield::TestYield#test_three_times_indirect */
function(){var self,_d;
_d=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
self.$u(nil,"three_times_indirect");
self.$aV(function(_a){var _b;
var _c=nil;
_b=_a==null?nil:_a;
_c=self.$t(nil,_b);
return _c});
_d=self.$u(nil,"--");
return _d}

,$aX:
/* T_TestYield::TestYield#test_three_times_yield2 */
function(){var self,_d,_e;
_e=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
self.$u(nil,"three_times_yield2");
_e=self.$aY(function(_a){var _b;
var _c=nil;
_b=_a==null?nil:_a;
if((_d=_b.$8(nil,1),_d!==false&&_d!==nil)){_c=_b}else{return _b.$R(nil,1)};
return _c});
return _e}

,$a0:
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
_a=_a.$R(nil,1);
if((_d=_a.$$(nil,2).$8(nil,1),_d!==false&&_d!==nil)){return nil};
self.$t(nil,_a);
if((_d=_a.$af(nil,8),_d!==false&&_d!==nil)){throw(new a$c(["out",_a],null))}else{_e=nil};
return _e});
self.$t(nil,_b);
_f=self.$u(nil,"--");
return _f}catch(_g){if(_g instanceof a$c && (!_g.a$b || _g.a$b==77))return _g.a$a;
throw(_g)}}

,$aZ:
/* T_TestYield::TestYield#test_three_times_block */
function(){var self,_d;
_d=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
self.$u(nil,"three_times_block");
self.$aP(function(_a){var _b;
var _c=nil;
_b=_a==null?nil:_a;
_c=self.$t(nil,_b);
return _c});
_d=self.$u(nil,"--");
return _d}

,$G:
/* T_TestYield::TestYield#test */
function(){var self,_b,_c,_d;
_d=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
self.$a1();
self.$aZ();
self.$aU();
self.$aX();
self.$a0();
self.$aQ();
self.$aS();
try{self.$aW()}catch(_a){if(_a instanceof a$c)throw(_a);
if((_c=$Y.$f(nil,_a),_c!==false&&_c!==nil)){_b=_a;
self.$t(nil,_b)}else{throw(_a)}};
_d=self.$t(nil,self.$a2());
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
return _b}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==80))return _c.a$a;
throw(_c)}}

,$aV:
/* T_TestYield::TestYield#three_times_indirect */
function(_a){var self,_b,_c;
_c=nil;
self=this;
_b=_a==null?nil:_a;
try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
self.$a3(_b);
_c=self.$aP(_b);
return _c}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==79))return _d.a$a;
throw(_d)}}

,$a3:
/* T_TestYield::TestYield#three_times_yield */
function(_a){var self,_b;
_b=nil;
self=this;
try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a(1);
_a(2);
_b=_a(3);
return _b}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==78))return _c.a$a;
throw(_c)}}

,$aY:
/* T_TestYield::TestYield#three_times_yield2 */
function(_a){var self,_b;
_b=nil;
self=this;
try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
self.$t(nil,_a(1));
self.$t(nil,_a(2));
_b=self.$t(nil,_a(3));
return _b}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==81))return _c.a$a;
throw(_c)}}

,$a2:
/* T_TestYield::TestYield#test_return_in_block */
function(){var self,_b;
_b=nil;
self=this;
try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
self.$t(nil,"before");
self.$aT(function(){;
throw(new a$c(4,82))});
_b=self.$t(nil,"after (NOT)");
return _b}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==82))return _c.a$a;
throw(_c)}}

,$a1:
/* T_TestYield::TestYield#test_three_times_yield */
function(){var self,_d;
_d=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
self.$u(nil,"three_times_yield");
self.$a3(function(_a){var _b;
var _c=nil;
_b=_a==null?nil:_a;
_c=self.$t(nil,_b);
return _c});
_d=self.$u(nil,"--");
return _d}

}});$an = a$d({a$j: [],a$e: $k,a$c: "Boolean",a$d: Boolean,a$h: {$8:
/* Boolean#== */
function(_b,_a){var self;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
return (self == _a)}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==83))return _c.a$a;
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

}});$ac = a$d({a$j: [],a$e: $l,a$c: "NameError"});$g = a$d({a$j: [],a$e: $ac,a$c: "NoMethodError"});$P = a$d({a$j: [],a$e: $k,a$f: {$F:
/* T_TestRange::TestRange.main */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$a().$G();
return _a}

},a$c: "T_TestRange::TestRange",a$h: {$G:
/* T_TestRange::TestRange#test */
function(){var _j,self,_a,_b,_i,_n;
_n=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=$v.$a(nil,0,2);
self.$t(nil,_a.$4());
self.$t(nil,_a.$aD());
self.$t(nil,_a);
_b=1;
self.$t(nil,$v.$a(nil,_b,_b.$R(nil,5),false).$o());
self.$t(nil,$v.$a(nil,_b,_b.$R(nil,_b),true).$o());
self.$t(nil,$v.$a(nil,0,2,false).$o());
self.$t(nil,$v.$a(nil,0,2,true).$o());
$v.$a(nil,0,4,false).$v(function(_c){var _d=nil;
_b=_c==null?nil:_c;
_d=self.$t(nil,_b);
return _d});
$v.$a(nil,0,4,true).$v(function(_e){var _f=nil;
_b=_e==null?nil:_e;
_f=self.$t(nil,_b);
return _f});
$v.$a(nil,-1,-4,false).$v(function(_g){var _h=nil;
_b=_g==null?nil:_g;
_h=self.$t(nil,_b);
return _h});
self.$t(nil,$v.$a(nil,0,4,false).$aH(nil,4));
self.$t(nil,$v.$a(nil,0,4,false).$aH(nil,5));
self.$t(nil,$v.$a(nil,0,4,true).$aH(nil,5));
self.$t(nil,$v.$a(nil,0,4,true).$aH(nil,4));
self.$t(nil,$v.$a(nil,0,4,true).$aH(nil,3));
self.$t(nil,$v.$a(nil,0,4,true).$aH(nil,0));
self.$t(nil,$v.$a(nil,0,4,true).$aH(nil,-1));
self.$t(nil,$v.$a(nil,-1,-5,false).$N());
self.$t(nil,$v.$a(nil,-5,-1,false).$N());
_i=$v.$a(nil,0,4);
self.$t(nil,_i.$4());
self.$t(nil,_i.$aG());
self.$t(nil,_i.$aD());
self.$t(nil,_i.$aI());
self.$t(nil,_i.$aF());
_i=$v.$a(nil,1,5,true);
self.$t(nil,_i.$4());
self.$t(nil,_i.$aG());
self.$t(nil,_i.$aD());
self.$t(nil,_i.$aI());
self.$t(nil,_i.$aF());
self.$t(nil,false.$8(nil,false));
self.$t(nil,false.$8(nil,true));
self.$t(nil,true.$8(nil,false));
self.$t(nil,true.$8(nil,true));
self.$t(nil,$v.$a(nil,0,2,false).$8(nil,$v.$a(nil,0,2,false)));
self.$t(nil,$v.$a(nil,0,2,false).$8(nil,$v.$a(nil,0,2)));
self.$t(nil,$v.$a(nil,0,2,false).$8(nil,$v.$a(nil,0,2,true)));
_j=55;
self.$t(nil,_j);
$v.$a(nil,1,100,false).$v(function(_k){var _l=nil;
_b=_k==null?nil:_k;
_l=_j=_b;
return _l});
self.$t(nil,_j);
_j=54;
self.$t(nil,_j);
$v.$a(nil,1,100,false).$v(function(_m){_j=_m==null?nil:_m;
});
_n=self.$t(nil,_j);
return _n}

}});$ao = a$d({a$j: [],a$e: nil,a$c: "T_TestInsertionSort"});$N = a$d({a$j: [],a$e: $k,a$f: {$F:
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

},a$c: "T_TestEql::TestEql"});$J = a$d({a$j: [],a$e: $k,a$f: {$F:
/* T_TestString::TestString.main */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$a().$G();
return _a}

},a$c: "T_TestString::TestString",a$h: {$G:
/* T_TestString::TestString#test */
function(){var self,_a,_i;
_i=nil;
self=this;
if(self.$a4==null)self.$a4=nil;
if(self.$an==null)self.$an=nil;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
self.$t(nil,"hello");
self.$t(nil,"hallo\b\t\n");
self.$t(nil,"hallo\\leute");
self.$t(nil,"\"super\"");
self.$t(nil,"hello".$2(nil,"e"));
self.$t(nil,"hello".$2(nil,"lo"));
self.$t(nil,"hello".$2(nil,"a"));
self.$t(nil,"hello hello".$2(nil,"ll"));
self.$t(nil,"hello hello".$2(nil,"ll",3));
self.$t(nil,"hallo".$X(nil,0,1));
self.$t(nil,"hallo".$X(nil,0,2));
self.$t(nil,"hallo".$X(nil,0,5));
self.$t(nil,"10".$T(nil,10,"0"));
self.$t(nil,"10".$T(nil,1,"blah"));
self.$t(nil,"x".$T(nil,4,"()"));
self.$t(nil,"10".$Y(nil,10,"0"));
self.$t(nil,"10".$Y(nil,1,"blah"));
self.$t(nil,"x".$Y(nil,4,"()"));
self.$t(nil,("abc " + ((1).$R(nil,2)).$o() + (" def").$o()));
self.$an="hallo".$i();
self.$a4=4.5;
self.$t(nil,("" + (self.$an).$o() + (",").$o() + (self.$a4).$o()));
_a="hallo".$3(nil,"l","r");
self.$t(nil,_a);
_a="hallo".$3(nil,/ll/,"rr");
self.$t(nil,_a);
_a="hallo".$3(function(){var _c=nil;
;
_c="r";
return _c},/l/);
self.$t(nil,_a);
_a="hallo".$3(function(){var _e=nil;
;
_e="blah blah";
return _e},/ll/);
self.$t(nil,_a);
_i="hallllllo".$3(function(_f){var _g;
var _h=nil;
_g=_f==null?nil:_f;
_h=self.$t(nil,_g);
return _h},/(l)l/);
return _i}

}});$ad = a$d({a$j: [$r],a$e: $k,a$f: {$aK:
/* Hash.new_from_key_value_list */
function(){var self,_a,_b,_c;
self=this;
_a=[];
for(_b=1;_b<arguments.length;_b++)_a.push(arguments[_b]);
;
if((_b=_a.$V().$$(nil,2).$8(nil,0),_b===false||_b===nil)){self.$j(nil,$a)};
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

,$a8:
/* Hash.new_from_jsobject */
function(_d,_a){var self,_b,_c;
_c=nil;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
_c=_b=self.$a();
return _c}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==87))return _e.a$a;
throw(_e)}}

},a$c: "Hash",a$h: {$X:
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
    }catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==84))return _c.a$a;
throw(_c)}}

,$a5:
/* Hash#keys */
function(){var self,_b,_f;
_b=_f=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_f=self.$M(function(_a){var _c,_d;
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
_a.$J(nil,_d);
_f=_a.$J(nil,_e);
return _f});
_g=_a.$a6(nil,"");
return _g}

,$al:
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
    }catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==86))return _d.a$a;
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
    }catch(_b){if(_b instanceof a$c && (!_b.a$b || _b.a$b==85))return _b.a$a;
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

,$a7:
/* Hash#values */
function(){var self,_b,_f;
_b=_f=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_f=self.$M(function(_a){var _c,_d;
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
_a=_a.$R(nil,self.$M(function(_b){var _d,_e;
var _f=nil;
(_c=a$l(_b),_d=_c[0]==null?nil:_c[0],_e=_c[1]==null?nil:_c[1],_c);
_f=_d.$i().$R(nil,"=>").$R(nil,_e.$i());
return _f}).$a6(nil,", "));
_a=_a.$R(nil,"}");
_g=_a;
return _g}

}});$ap = a$d({a$j: [],a$e: $k,a$c: "T_TestHotRuby::Bar_"});$aq = a$d({a$j: [],a$e: nil,a$c: "T_TestMassign"});$ar = a$d({a$j: [],a$e: $p,a$c: "T_TestHotRuby::Bar2",a$h: {$aM:
/* T_TestHotRuby::Bar2#run */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$u(nil,"Foo");
return _a}

}});$ag = a$d({a$j: [],a$e: $aa,a$c: "T_TestClass::C"});$as = a$d({a$j: [],a$e: $k,a$c: "T_TestHotRuby::Foo3"});$at = a$d({a$j: [],a$e: $as,a$c: "T_TestHotRuby::Bar3",a$h: {$aM:
/* T_TestHotRuby::Bar3#run */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
self.$u(nil,"Foo");
self.$u(nil,"Foo");
_a=self.$u(nil,"Foo");
return _a}

}});$au = a$d({a$j: [],a$e: nil,a$c: "T_TestSend"});$av = a$d({a$j: [],a$e: nil,a$c: "T_TestInspect"});$D = a$d({a$j: [],a$e: $k,a$f: {$F:
/* T_TestExpr::TestExpr.main */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$a().$G();
return _a}

},a$c: "T_TestExpr::TestExpr",a$h: {$G:
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
return _c}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==88))return _d.a$a;
throw(_d)}}

}});$Q = a$d({a$j: [],a$e: $k,a$f: {$F:
/* T_TestMassign::TestMassign.main */
function(){var self,_a,_b,_c,_d,_e,_f;
_a=_f=nil;
self=this;
if(self.$a9==null)self.$a9=nil;
if(self.$an==null)self.$an=nil;
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
(_a=[1,2,3],self.$an=_a[0]==null?nil:_a[0],_c=_a[1]==null?nil:_a[1],self.$a9=_a[2]==null?nil:_a[2],_a);
self.$t(nil,self.$an);
self.$t(nil,_c);
self.$t(nil,self.$a9);
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
self.$t(nil,(typeof($aw)=='undefined'?nil:$aw));
self.$t(nil,(typeof($ax)=='undefined'?nil:$ax));
(_a=[1,2],$aw=_a[0]==null?nil:_a[0],$ax=_a[1]==null?nil:_a[1],_a);
self.$t(nil,(typeof($aw)=='undefined'?nil:$aw));
self.$t(nil,(typeof($ax)=='undefined'?nil:$ax));
_f=self.$u(nil,"--");
return _f}

},a$c: "T_TestMassign::TestMassign"});$ay = a$d({a$j: [],a$e: nil,a$c: "T_TestSimpleOutput"});$K = a$d({a$j: [],a$e: $k,a$f: {$F:
/* T_TestInspect::TestInspect.main */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$a().$G();
return _a}

},a$c: "T_TestInspect::TestInspect",a$h: {$G:
/* T_TestInspect::TestInspect#test */
function(){var self,_a,_b;
_b=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=[$ad.$aK(nil,"Hello","Rubyconf")];
_b=self.$u(nil,_a.$i());
return _b}

}});$ai = a$d({a$j: [],a$e: $k,a$c: "NilClass",a$d: NilClass,a$h: {$a_:
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

,$a$:
/* NilClass#to_i */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=0;
return _a}

,$N:
/* NilClass#to_a */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=[];
return _a}

,$ba:
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

}});$az = a$d({a$j: [],a$e: $k,a$c: "Regexp",a$d: RegExp});$aA = a$d({a$j: [],a$e: nil,a$c: "T_TestHotRuby"});$aB = a$d({a$j: [],a$e: $p,a$c: "T_TestHotRuby::Object::Bar2",a$h: {$aM:
/* T_TestHotRuby::Object::Bar2#run */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$u(nil,"Foo");
return _a}

}});$R = a$d({a$j: [],a$e: $k,a$f: {$F:
/* T_TestNew::TestNew.main */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$a().$G();
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

,$G:
/* T_TestNew::TestNew#test */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$u(nil,"test");
return _a}

}});$aC = a$d({a$j: [],a$e: nil,a$c: "T_TestRegexp"});$O = a$d({a$j: [],a$e: $k,a$f: {$F:
/* T_TestSend::TestSend.main */
function(){var self,_b,_c,_d,_e;
_e=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
self.$u(nil,"send");
self.$t(nil,$7.$a().$w(nil,"a_method",1,2));
self.$t(nil,$8.$a().$w(nil,"a_method",1,2));
self.$u(nil,"respond_to?");
self.$t(nil,$7.$a().$r(nil,"a_method"));
self.$t(nil,$7.$a().$r(nil,"to_s"));
self.$t(nil,$7.$a().$r(nil,"inspect"));
self.$t(nil,$7.$a().$r(nil,"b_method"));
self.$t(nil,$7.$a().$r(nil,"c_method"));
self.$u(nil,"method_missing");
self.$t(nil,$X.$a().$r(nil,"blah_blah"));
$X.$a().$bb(nil,1,2,3);
try{$7.$a().$bb();
self.$u(nil,"FAILURE?")}catch(_a){if(_a instanceof a$c)throw(_a);
if((_b=$g.$f(nil,_a),_b!==false&&_b!==nil)){self.$u(nil,"catched!!!")}else{throw(_a)}};
try{$7.$bc()}catch(_a){if(_a instanceof a$c)throw(_a);
if((_b=$g.$f(nil,_a),_b!==false&&_b!==nil)){self.$t(nil,"goood")}else{throw(_a)}};
self.$u(nil,"class Method");
_c="hallo".$C(nil,"to_s");
self.$t(nil,_c);
self.$t(nil,_c.$K());
_d=[1,2,3];
_c=_d.$C(nil,"+");
self.$t(nil,_c);
self.$t(nil,_c.$K(nil,[2,3]));
self.$t(nil,_c);
_e=self.$t(nil,_d);
return _e}

},a$c: "T_TestSend::TestSend"});$B = a$d({a$j: [],a$e: $k,a$f: {$F:
/* T_TestInsertionSort::TestInsertionSort.main */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$a().$ak(nil,[3,6,2,5,3,7,1,8]);
return _a}

},a$c: "T_TestInsertionSort::TestInsertionSort",a$h: {$ak:
/* T_TestInsertionSort::TestInsertionSort#sort */
function(_j,_a){var self,_c,_d,_e,_f,_g,_i;
_i=nil;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
self.$u(nil,"Before insertion sort:");
self.$t(nil,_a);
$v.$a(nil,1,_a.$V().$U(nil,1),false).$v(function(_b){var _h=nil;
_c=_b==null?nil:_b;
_d=_c;
while((_e=(_f=_d.$7(nil,1), (_f!==false&&_f!==nil) ? (_a.$X(nil,_d).$Z(nil,_a.$X(nil,_d.$U(nil,1)))) : _f),_e!==false&&_e!==nil)){if((_e=_a.$X(nil,_d).$Z(nil,_a.$X(nil,_d.$U(nil,1))),_e!==false&&_e!==nil)){_g=_a.$X(nil,_d);
_a.$al(nil,_d,_a.$X(nil,_d.$U(nil,1)));
_a.$al(nil,_d.$U(nil,1),_g)};
_d=_d.$U(nil,1)};
_h=nil;
;
return _h});
self.$u(nil,"After insertion sort:");
_i=self.$t(nil,_a);
return _i}catch(_k){if(_k instanceof a$c && (!_k.a$b || _k.a$b==89))return _k.a$a;
throw(_k)}}

}});$aD = a$d({a$j: [],a$e: nil,a$c: "T_TestException"});$aE = a$d({a$j: [],a$e: nil,a$c: "T_TestRange"});$1 = a$d({a$j: [$r],a$e: $k,a$f: {$a:
/* Array.new */
function(){var self;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
return []}

},a$c: "Array",a$d: Array,a$h: {$R:
/* Array#+ */
function(_b,_a){var self;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
return self.concat(_a)}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==92))return _c.a$a;
throw(_c)}}

,$J:
/* Array#<< */
function(_b,_a){var self;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
self.push(_a); return self}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==91))return _c.a$a;
throw(_c)}}

,$aN:
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
    return del ? _a : nil}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==90))return _c.a$a;
throw(_c)}}

,$S:
/* Array#size */
function(){var self;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
return self.length}

,$X:
/* Array#[] */
function(_b,_a){var self;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
var v = self[_a]; return (v == null ? nil : v)}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==94))return _c.a$a;
throw(_c)}}

,$be:
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
    }catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==93))return _c.a$a;
throw(_c)}}

,$bd:
/* Array#reverse */
function(){var self;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
return self.concat().reverse()}

,$aD:
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
_d=self.$M(function(_a){var _b;
var _c=nil;
_b=_a==null?nil:_a;
_c=_b.$o();
return _c}).$a6();
return _d}

,$al:
/* Array#[]= */
function(_c,_a,_b){var self;
self=this;
try{if(arguments.length!=3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));
;
return (self[_a] = _b)}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==97))return _d.a$a;
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
    return self}catch(_b){if(_b instanceof a$c && (!_b.a$b || _b.a$b==96))return _b.a$a;
throw(_b)}}

,$bf:
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
    return self}catch(_b){if(_b instanceof a$c && (!_b.a$b || _b.a$b==95))return _b.a$a;
throw(_b)}}

,$4:
/* Array#first */
function(){var self;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
var v = self[0]; return (v == null ? nil : v)}

,$V:
/* Array#length */
function(){var self;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
return self.length}

,$bg:
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

,$N:
/* Array#to_a */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self;
return _a}

,$bi:
/* Array#push */
function(){var self,_a,_b;
self=this;
_a=[];
for(_b=1;_b<arguments.length;_b++)_a.push(arguments[_b]);
;
self.push.apply(self, _a); return self}

,$bh:
/* Array#to_ary */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self;
return _a}

,$bl:
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
_a=_a.$R(nil,self.$M(function(_b){var _c;
var _d=nil;
_c=_b==null?nil:_b;
_d=_c.$i();
return _d}).$a6(nil,", "));
_a=_a.$R(nil,"]");
_e=_a;
return _e}

,$bk:
/* Array#reverse! */
function(){var self;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
self.reverse(); return self}

,$bj:
/* Array#unshift */
function(){var self,_a,_b;
self=this;
_a=[];
for(_b=1;_b<arguments.length;_b++)_a.push(arguments[_b]);
;
self.unshift.apply(self, _a); return self}

,$a6:
/* Array#join */
function(_i,_a){var self,_b,_d,_h;
_h=nil;
self=this;
try{if(arguments.length>2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
if(_a==null)_a="";
;
_b="";
self.$bf(function(_c){var _e,_f;
var _g=nil;
(_d=a$l(_c),_e=_d[0]==null?nil:_d[0],_f=_d[1]==null?nil:_d[1],_d);
_b=_b.$R(nil,_e.$o());
if((_d=_f.$8(nil,self.$V().$U(nil,1)),_d===false||_d===nil)){_g=_b=_b.$R(nil,_a)}else{_g=nil};
return _g});
_h=_b;
return _h}catch(_j){if(_j instanceof a$c && (!_j.a$b || _j.a$b==98))return _j.a$a;
throw(_j)}}

}});$E = a$d({a$j: [],a$e: $k,a$f: {$F:
/* T_TestSimpleOutput::TestSimpleOutput.main */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$u(nil,"Hello World from RubyJS");
return _a}

},a$c: "T_TestSimpleOutput::TestSimpleOutput"});$aF = a$d({a$j: [],a$e: nil,a$c: "T_TestLebewesen"});      $b.a$e = $k;
var a$n = [$i,$k,$f,$l,$m,$n,$o,$p,$q,$r,$e,$s,$t,$u,$y,$x,$S,$T,$C,$W,$X,$h,$Y,$Z,$0,$H,$w,$F,$L,$4,$V,$5,$d,$6,$7,$8,$9,$_,$$,$aa,$ab,$j,$v,$a,$z,$U,$I,$ae,$af,$G,$M,$aj,$b,$c,$3,$ak,$al,$2,$am,$ah,$A,$an,$ac,$g,$P,$ao,$N,$J,$ad,$ap,$aq,$ar,$ag,$as,$at,$au,$av,$D,$Q,$ay,$K,$ai,$az,$aA,$aB,$R,$aC,$O,$B,$aD,$aE,$1,$E,$aF];
a$o(a$n);
for (var i=0; i<a$n.length; i++) a$p(a$n[i]);
function main() { return $S.$F.apply($S, arguments); }var STDOUT_LINE_NO = 0;
var FAILURES = 0; 
var TOTAL = 422;

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
