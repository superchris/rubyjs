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
function a$l(o, m, i, a) 
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
var a$h = {"$K":"test","$aM":"end","$aO":"sub","$v":"each","$3":"m","$2":"new_from_jsobject","$x":"loop","$8":"to_f","$1":"%","$bd":"member?","$M":"collect","$aX":"test_three_times_indirect","$al":"&","$a6":"three_times_yield","$Z":"new_from_key_value_list","$aT":"test_loop2","$f":"===","$aS":"three_times_block","$D":"==","$aY":"three_times_indirect","$at":"reverse","$Q":"map","$ae":"downto","$9":"to_i","$ak":"times","$t":"p","$aK":"include?","$s":"proc","$b":"allocate","$U":"keys","$S":"reject","$a1":"three_times_yield2","$as":"size","$ar":"*","$L":"+","$aa":"delete","$Y":"values","$aB":"unshift","$aW":"return_in_block","$ac":"upto","$aD":"dup","$aF":"rjust","$ag":"-","$bf":"not_a_method","$q":"nil?","$a":"new","$aV":"test_while_loop","$ai":"/","$O":"call","$E":"message","$aA":"push","$y":"is_a?","$aQ":"split","$G":"main","$e":"name","$l":"empty?","$_":"to_splat","$J":"jage","$j":"raise","$0":"length","$o":"to_s","$af":">=","$au":"clear","$7":"c_method","$ab":"array","$aj":"|","$h":"kind_of?","$P":"find_all","$am":"~","$aU":"loop2","$V":"[]","$a0":"test_three_times_yield2","$aR":"strip","$a5":"test_return_in_block","$ap":"-@","$X":"[]=","$ah":"succ","$B":"hash","$z":"class","$i":"inspect","$aC":"reverse!","$a2":"test_three_times_block","$an":"^","$a4":"test_three_times_yield","$p":"__send","$g":"eql?","$ay":"pop","$C":"method","$5":"<","$I":"wau","$aw":"first","$aL":"begin","$N":"<<","$aG":"ljust","$d":"__invoke","$ao":">","$ad":"<=","$c":"initialize","$w":"send","$6":"a_method","$r":"respond_to?","$a3":"test_loop","$k":"shift","$be":"blah_blah","$aN":"exclude_end?","$aq":"+@","$T":"select","$H":"miau","$R":"to_a","$n":"method_missing","$aE":"index","$aP":"=~","$aZ":"test_proc","$W":"join","$ax":"each_with_index","$A":"tap","$av":"last","$m":"instance_of?","$aJ":"gsub","$u":"puts","$az":"to_ary"};
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

}});$l = a$d({a$j: [],a$e: $k,a$c: "Boolean",a$d: Boolean,a$h: {$D:
/* Boolean#== */
function(_b,_a){var self;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
return (self == _a)}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==18))return _c.a$a;
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

}});$m = a$d({a$j: [],a$e: $k,a$c: "T_TestSend::C",a$h: {$n:
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
return _f}catch(_g){if(_g instanceof a$c && (!_g.a$b || _g.a$b==19))return _g.a$a;
throw(_g)}}

}});$f = a$d({a$j: [],a$e: $k,a$c: "Exception",a$h: {$E:
/* Exception#message */
function(){var self,_a;
_a=nil;
self=this;
if(self.$F==null)self.$F=nil;
_a=self.$F;
return _a}

,$o:
/* Exception#to_s */
function(){var self,_a;
_a=nil;
self=this;
if(self.$F==null)self.$F=nil;
_a=self.$F;
return _a}

,$c:
/* Exception#initialize */
function(_d,_a){var self,_c,_b;
_b=nil;
self=this;
try{if(arguments.length>2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
if(_a==null)_a=nil;
;
if((_c=_a.$q(),_c!==false&&_c!==nil)){_b=self.$F=self.$z().$e()}else{_b=self.$F=_a};
return _b}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==20))return _e.a$a;
throw(_e)}}

,$i:
/* Exception#inspect */
function(){var self,_a;
_a=nil;
self=this;
if(self.$F==null)self.$F=nil;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=("#<" + (self.$z().$e()).$o() + (": ").$o() + (self.$F).$o() + (">").$o());
return _a}

}});$n = a$d({a$j: [],a$e: $f,a$c: "StandardError"});$o = a$d({a$j: [],a$e: $n,a$c: "NameError"});$g = a$d({a$j: [],a$e: $o,a$c: "NoMethodError"});$r = a$d({a$j: [],a$e: $k,a$f: {$G:
/* T_TestLebewesen::TestLebewesen.main */
function(){var self,_a,_b,_c,_d;
_d=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=$p.$a(nil,"AA-BB","Leni");
_b=$p.$a(nil,"AC-DC","Flocki");
_c=$q.$a(nil,"AA-ZZ");
_a.$H();
_c.$I();
_d=_c.$J(nil,_a);
return _d}

},a$c: "T_TestLebewesen::TestLebewesen"});$s = a$d({a$j: [],a$e: nil,a$c: "T_TestException"});$w = a$d({a$j: [],a$e: $k,a$f: {$G:
/* T_TestCase::TestCase.main */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$a().$K();
return _a}

},a$c: "T_TestCase::TestCase",a$h: {$K:
/* T_TestCase::TestCase#test */
function(){var self,_a,_b,_c,_d;
_d=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=(1).$L(nil,1);
if((_b=(_c=(1).$f(nil,_a), (_c!==false&&_c!==nil) ? _c : ((3).$f(nil,_a))),_b!==false&&_b!==nil)){self.$u(nil,"NOT OKAY")}else{if((_b=(2).$f(nil,_a),_b!==false&&_b!==nil)){self.$u(nil,"OKAY")}else{self.$u(nil,"NOT OKAY")}};
self.$t(nil,$t.$f(nil,[]));
self.$t(nil,$c.$f(nil,$c.$a()));
_a=1;
if((_b=$u.$f(nil,_a),_b!==false&&_b!==nil)){self.$u(nil,"OK")}else{if((_b=(1).$f(nil,_a),_b!==false&&_b!==nil)){self.$u(nil,"OK")}};
_a=_d=4;
if((_b=$v.$a(nil,0,3,false).$f(nil,_a),_b!==false&&_b!==nil)){_d=self.$u(nil,"NOT OKAY")}else{if((_b=$v.$a(nil,1,4,true).$f(nil,_a),_b!==false&&_b!==nil)){_d=self.$u(nil,"NOT OKAY")}else{if((_b=$v.$a(nil,2,4,false).$f(nil,_a),_b!==false&&_b!==nil)){_d=self.$u(nil,"OKAY")}else{_d=nil}}};
return _d}

}});$x = a$d({a$j: [],a$e: nil,a$c: "Enumerable",a$h: {$M:
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
_g=_c.$N(nil,((_f=_b,_f!==false&&_f!==nil)?_b.$O(nil,_e):_e));
return _g});
_h=_c;
return _h}catch(_i){if(_i instanceof a$c && (!_i.a$b || _i.a$b==21))return _i.a$a;
throw(_i)}}

,$P:
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
if((_e=_f(_c),_e!==false&&_e!==nil)){_d=_a.$N(nil,_c)}else{_d=nil};
return _d});
_g=_a;
return _g}catch(_h){if(_h instanceof a$c && (!_h.a$b || _h.a$b==22))return _h.a$a;
throw(_h)}}

,$Q:
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
_g=_c.$N(nil,((_f=_b,_f!==false&&_f!==nil)?_b.$O(nil,_e):_e));
return _g});
_h=_c;
return _h}catch(_i){if(_i instanceof a$c && (!_i.a$b || _i.a$b==23))return _i.a$a;
throw(_i)}}

,$R:
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
_d=_a.$N(nil,_c);
return _d});
_e=_a;
return _e}

,$S:
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
if((_e=_f(_c),_e===false||_e===nil)){_d=_a.$N(nil,_c)}else{_d=nil};
return _d});
_g=_a;
return _g}catch(_h){if(_h instanceof a$c && (!_h.a$b || _h.a$b==24))return _h.a$a;
throw(_h)}}

,$T:
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
if((_e=_f(_c),_e!==false&&_e!==nil)){_d=_a.$N(nil,_c)}else{_d=nil};
return _d});
_g=_a;
return _g}catch(_h){if(_h instanceof a$c && (!_h.a$b || _h.a$b==25))return _h.a$a;
throw(_h)}}

}});$y = a$d({a$j: [$x],a$e: $k,a$f: {$Z:
/* Hash.new_from_key_value_list */
function(){var self,_a,_b,_c;
self=this;
_a=[];
for(_b=1;_b<arguments.length;_b++)_a.push(arguments[_b]);
;
if((_b=_a.$0().$1(nil,2).$D(nil,0),_b===false||_b===nil)){self.$j(nil,$a)};
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

,$2:
/* Hash.new_from_jsobject */
function(_d,_a){var self,_b,_c;
_c=nil;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
_c=_b=self.$a();
return _c}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==29))return _e.a$a;
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
    }catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==26))return _c.a$a;
throw(_c)}}

,$U:
/* Hash#keys */
function(){var self,_b,_f;
_b=_f=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_f=self.$Q(function(_a){var _c,_d;
var _e=nil;
(_b=a$j(_a),_c=_b[0]==null?nil:_b[0],_d=_b[1]==null?nil:_b[1],_b);
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
(_c=a$j(_b),_d=_c[0]==null?nil:_c[0],_e=_c[1]==null?nil:_c[1],_c);
_a.$N(nil,_d);
_f=_a.$N(nil,_e);
return _f});
_g=_a.$W(nil,"");
return _g}

,$X:
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
    }catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==28))return _d.a$a;
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
    }catch(_b){if(_b instanceof a$c && (!_b.a$b || _b.a$b==27))return _b.a$a;
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

,$Y:
/* Hash#values */
function(){var self,_b,_f;
_b=_f=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_f=self.$Q(function(_a){var _c,_d;
var _e=nil;
(_b=a$j(_a),_c=_b[0]==null?nil:_b[0],_d=_b[1]==null?nil:_b[1],_b);
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
_a=_a.$L(nil,self.$Q(function(_b){var _d,_e;
var _f=nil;
(_c=a$j(_b),_d=_c[0]==null?nil:_c[0],_e=_c[1]==null?nil:_c[1],_c);
_f=_d.$i().$L(nil,"=>").$L(nil,_e.$i());
return _f}).$W(nil,", "));
_a=_a.$L(nil,"}");
_g=_a;
return _g}

}});$z = a$d({a$j: [],a$e: nil,a$c: "T_TestExpr"});$A = a$d({a$j: [],a$e: $k,a$f: {$G:
/* T_TestArgs::TestArgs.main */
function(){var self,_a,_b;
_b=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$a();
_a.$3(nil,0);
self.$u(nil,"--");
_a.$3(nil,1,2);
self.$u(nil,"--");
_a.$3(nil,1,2,9);
self.$u(nil,"--");
_a.$3(nil,1,2,9,5);
self.$u(nil,"--");
_a.$3(nil,1,2,9,5,6);
self.$u(nil,"--");
_b=_a.$3(nil,1,2,9,5,6,7,8,9,10,11,12);
return _b}

},a$c: "T_TestArgs::TestArgs",a$h: {$3:
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
return _f}catch(_h){if(_h instanceof a$c && (!_h.a$b || _h.a$b==30))return _h.a$a;
throw(_h)}}

}});$B = a$d({a$j: [],a$e: nil,a$c: "T_TestYield"});$C = a$d({a$j: [],a$e: $k,a$c: "T_TestLebewesen::Lebewesen",a$h: {$c:
/* T_TestLebewesen::Lebewesen#initialize */
function(_c,_a){var self,_b;
_b=nil;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
_b=self.$4=_a;
return _b}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==31))return _d.a$a;
throw(_d)}}

}});$q = a$d({a$j: [],a$e: $C,a$c: "T_TestLebewesen::Hund",a$h: {$I:
/* T_TestLebewesen::Hund#wau */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$u(nil,"wau wau");
return _a}

,$J:
/* T_TestLebewesen::Hund#jage */
function(_c,_a){var self,_b;
_b=nil;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
_b=self.$u(nil,"ich jage ".$L(nil,_a.$e()));
return _b}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==32))return _d.a$a;
throw(_d)}}

}});$D = a$d({a$j: [],a$e: nil,a$c: "T_TestSplat"});$E = a$d({a$j: [],a$e: $k,a$f: {$G:
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
if((_c=$n.$f(nil,_a),_c!==false&&_c!==nil)){self.$t(nil,"rescue")}else{if((_c=$f.$f(nil,_a),_c!==false&&_c!==nil)){_b=_a;
self.$t(nil,"another rescue");
self.$t(nil,_b)}else{throw(_a)}}};
self.$t(nil,$c.$a(nil,"test"));
self.$u(nil,"before begin");
try{try{self.$u(nil,"before raise");
self.$j(nil,$f,"blah");
self.$u(nil,"after raise")}catch(_a){if(_a instanceof a$c)throw(_a);
if((_c=$n.$f(nil,_a),_c!==false&&_c!==nil)){self.$u(nil,"noooo")}else{if((_c=$f.$f(nil,_a),_c!==false&&_c!==nil)){_b=_a;
self.$t(nil,_b);
self.$u(nil,"yes")}else{throw(_a)}}}}finally{self.$u(nil,"ensure")};
self.$u(nil,"after begin");
self.$u(nil,"--");
try{try{self.$u(nil,"abc");
self.$j(nil,"r")}catch(_a){if(_a instanceof a$c)throw(_a);
if((_c=$n.$f(nil,_a),_c!==false&&_c!==nil)){self.$t(nil,_a);
self.$u(nil,"b")}else{throw(_a)}}}finally{self.$u(nil,"e")};
try{_d=self.$t(nil,"hallo".$o(nil,2))}catch(_a){if(_a instanceof a$c)throw(_a);
if((_c=$a.$f(nil,_a),_c!==false&&_c!==nil)){_b=_a;
_d=self.$t(nil,_b)}else{throw(_a)}};
return _d}

},a$c: "T_TestException::TestException"});$F = a$d({a$j: [],a$e: $k,a$f: {$G:
/* T_TestIf::TestIf.main */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$a().$K();
return _a}

},a$c: "T_TestIf::TestIf",a$h: {$K:
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
if((_a=(_b=(5).$5(nil,6), (_b!==false&&_b!==nil) ? ((6).$5(nil,7)) : _b),_a!==false&&_a!==nil)){self.$u(nil,"OK")};
self.$t(nil,(_a=false, (_a!==false&&_a!==nil) ? _a : ("a")));
self.$t(nil,(_a=nil, (_a!==false&&_a!==nil) ? _a : ("a")));
self.$t(nil,(_a=true, (_a!==false&&_a!==nil) ? _a : ("a")));
self.$t(nil,(_a="b", (_a!==false&&_a!==nil) ? _a : ("a")));
self.$t(nil,(_a=false, (_a!==false&&_a!==nil) ? ("a") : _a));
self.$t(nil,(_a=nil, (_a!==false&&_a!==nil) ? ("a") : _a));
self.$t(nil,(_a=true, (_a!==false&&_a!==nil) ? ("a") : _a));
_f=self.$t(nil,(_a="b", (_a!==false&&_a!==nil) ? ("a") : _a));
return _f}

}});$G = a$d({a$j: [],a$e: nil,a$c: "T_TestClass"});$H = a$d({a$j: [],a$e: nil,a$c: "T_TestClass::X"});$I = a$d({a$j: [$H],a$e: $k,a$c: "T_TestClass::A"});$J = a$d({a$j: [],a$e: $I,a$c: "T_TestClass::B"});$K = a$d({a$j: [],a$e: nil,a$c: "T_TestArray"});$0 = a$d({a$j: [],a$e: $k,a$f: {$G:
/* TestSuite.main */
function(){var self,_c,_d,_b;
_b=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
try{self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
self.$u(nil,"Test hash");
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
$L.$G();
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
self.$u(nil,"Test yield");
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
$M.$G();
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
self.$u(nil,"Test lebewesen");
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
$r.$G();
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
self.$u(nil,"Test expr");
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
$N.$G();
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
self.$u(nil,"Test simple output");
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
$O.$G();
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
self.$u(nil,"Test if");
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
$F.$G();
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
self.$u(nil,"Test class");
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
$P.$G();
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
self.$u(nil,"Test case");
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
$w.$G();
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
self.$u(nil,"Test splat");
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
$Q.$G();
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
self.$u(nil,"Test string");
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
$R.$G();
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
self.$u(nil,"Test inspect");
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
$S.$G();
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
self.$u(nil,"Test regexp");
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
$T.$G();
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
self.$u(nil,"Test args");
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
$A.$G();
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
self.$u(nil,"Test array");
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
$U.$G();
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
self.$u(nil,"Test eql");
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
$V.$G();
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
self.$u(nil,"Test send");
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
$W.$G();
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
self.$u(nil,"Test range");
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
$X.$G();
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
self.$u(nil,"Test massign");
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
$Y.$G();
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
self.$u(nil,"Test new");
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
$Z.$G();
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
self.$u(nil,"Test exception");
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
_b=$E.$G()}catch(_a){if(_a instanceof a$c)throw(_a);
if((_d=$f.$f(nil,_a),_d!==false&&_d!==nil)){_c=_a;
self.$t(nil,"unhandled exception");
_b=self.$t(nil,_c)}else{throw(_a)}};
return _b}

},a$c: "TestSuite"});$1 = a$d({a$j: [],a$e: $k,a$c: "T_TestSend::A",a$h: {$6:
/* T_TestSend::A#a_method */
function(_d,_a,_b){var self,_c;
_c=nil;
self=this;
try{if(arguments.length!=3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));
;
_c=self.$t(nil,_a,_b);
return _c}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==33))return _e.a$a;
throw(_e)}}

}});$2 = a$d({a$j: [],a$e: $1,a$c: "T_TestSend::B",a$h: {$6:
/* T_TestSend::B#a_method */
function(_d,_a,_b){var self;
self=this;
var _c=arguments;
try{if(arguments.length!=3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));
;
self.$t(nil,"in B");
a$k(self,'$6',_c)}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==34))return _e.a$a;
throw(_e)}}

,$7:
/* T_TestSend::B#c_method */
function(_c,_a){var self,_b;
_b=nil;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
_b=nil;
return _b}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==35))return _d.a$a;
throw(_d)}}

}});$3 = a$d({a$j: [],a$e: $k,a$c: "NilClass",a$d: NilClass,a$h: {$8:
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

,$9:
/* NilClass#to_i */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=0;
return _a}

,$R:
/* NilClass#to_a */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=[];
return _a}

,$_:
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

}});$Q = a$d({a$j: [],a$e: $k,a$f: {$G:
/* T_TestSplat::TestSplat.main */
function(){var self,_a,_b;
_b=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$a();
_a.$3();
_a.$d(nil,'$3',a$b([]));
_a.$3(nil,1);
_a.$d(nil,'$3',a$b([1]));
_a.$d(nil,'$3',[1].concat(a$b([])));
_a.$3(nil,1,2);
_a.$d(nil,'$3',a$b([1,2]));
_a.$d(nil,'$3',[1].concat(a$b([2])));
_b=_a.$d(nil,'$3',[1].concat(a$b([1,2])));
return _b}

},a$c: "T_TestSplat::TestSplat",a$h: {$3:
/* T_TestSplat::TestSplat#m */
function(){var self,_a,_b,_c;
_c=nil;
self=this;
_a=[];
for(_b=1;_b<arguments.length;_b++)_a.push(arguments[_b]);
;
_c=self.$t(nil,_a);
return _c}

}});$4 = a$d({a$j: [],a$e: $k,a$c: "Regexp",a$d: RegExp});$p = a$d({a$j: [],a$e: $C,a$c: "T_TestLebewesen::Katze",a$h: {$e:
/* T_TestLebewesen::Katze#name */
function(){var self,_a;
_a=nil;
self=this;
if(self.$$==null)self.$$=nil;
_a=self.$$;
return _a}

,$c:
/* T_TestLebewesen::Katze#initialize */
function(_d,_a,_b){var self,_c;
_c=nil;
self=this;
try{if(arguments.length!=3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));
;
a$l(self,'$c',nil,[_a]);
_c=self.$$=_b;
return _c}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==36))return _e.a$a;
throw(_e)}}

,$H:
/* T_TestLebewesen::Katze#miau */
function(){var self,_a;
_a=nil;
self=this;
if(self.$$==null)self.$$=nil;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$u(nil,"miau, ich bin ".$L(nil,self.$$));
return _a}

}});$P = a$d({a$j: [],a$e: $k,a$f: {$G:
/* T_TestClass::TestClass.main */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
self.$t(nil,$I.$a().$m(nil,$I));
self.$t(nil,$I.$a().$m(nil,$J));
self.$t(nil,$J.$a().$m(nil,$I));
self.$t(nil,$I.$a().$m(nil,$H));
self.$t(nil,$J.$a().$m(nil,$H));
self.$t(nil,$I.$a().$h(nil,$I));
self.$t(nil,$I.$a().$h(nil,$J));
self.$t(nil,$J.$a().$h(nil,$I));
self.$t(nil,$I.$a().$h(nil,$H));
self.$t(nil,$J.$a().$h(nil,$H));
self.$t(nil,$5.$a().$h(nil,$H));
self.$t(nil,$5.$a().$h(nil,$I));
self.$t(nil,$5.$a().$h(nil,$J));
self.$t(nil,$5.$a().$h(nil,$5));
self.$t(nil,$5.$a().$h(nil,$6));
self.$t(nil,$5.$a().$h(nil,$k));
self.$t(nil,$5.$a().$h(nil,$i));
self.$t(nil,$5.$a().$h(nil,$b));
self.$t(nil,"hallo".$z().$e());
self.$t(nil,nil.$z().$e());
self.$t(nil,nil.$m(nil,$3));
self.$t(nil,"hallo".$m(nil,$e));
self.$t(nil,"hallo".$z());
self.$t(nil,$I);
self.$t(nil,$J);
self.$t(nil,$5);
self.$t(nil,$6);
self.$t(nil,$H);
self.$t(nil,$H.$e());
self.$t(nil,$I.$e());
_a=self.$t(nil,$J.$e());
return _a}

},a$c: "T_TestClass::TestClass"});$U = a$d({a$j: [],a$e: $k,a$f: {$G:
/* T_TestArray::TestArray.main */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$a().$K();
return _a}

},a$c: "T_TestArray::TestArray",a$h: {$ab:
/* T_TestArray::TestArray#array */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=[1,2,null,[null,null,4]];
return _a}

,$K:
/* T_TestArray::TestArray#test */
function(){var self,_a,_b;
_b=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=["a","b","b","b","c"];
self.$t(nil,_a.$aa(nil,"b"));
self.$t(nil,_a);
self.$t(nil,_a.$aa(nil,"z"));
self.$u(nil,"test native JS array mapping");
_b=self.$t(nil,self.$ab());
return _b}

}});$7 = a$d({a$j: [],a$e: nil,a$c: "T_TestString"});$8 = a$d({a$j: [],a$e: nil,a$c: "T_TestCase"});$9 = a$d({a$j: [],a$e: $k,a$c: "Number",a$d: Number,a$h: {$L:
/* Number#+ */
function(_b,_a){var self;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
return self + _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==40))return _c.a$a;
throw(_c)}}

,$D:
/* Number#== */
function(_b,_a){var self;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
return self == _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==39))return _c.a$a;
throw(_c)}}

,$ae:
/* Number#downto */
function(_d,_a){var self,_b,_c;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
_b=self;
while((_c=_b.$af(nil,_a),_c!==false&&_c!==nil)){_d(_b);
_b=_b.$ag(nil,1)};
return self}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==38))return _e.a$a;
throw(_e)}}

,$ac:
/* Number#upto */
function(_d,_a){var self,_b,_c;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
_b=self;
while((_c=_b.$ad(nil,_a),_c!==false&&_c!==nil)){_d(_b);
_b=_b.$L(nil,1)};
return self}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==37))return _e.a$a;
throw(_e)}}

,$ad:
/* Number#<= */
function(_b,_a){var self;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
return self <= _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==41))return _c.a$a;
throw(_c)}}

,$ag:
/* Number#- */
function(_b,_a){var self;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
return self - _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==42))return _c.a$a;
throw(_c)}}

,$ah:
/* Number#succ */
function(){var self;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
return self+1}

,$ai:
/* Number#/ */
function(_b,_a){var self;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
return self / _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==44))return _c.a$a;
throw(_c)}}

,$o:
/* Number#to_s */
function(_b,_a){var self;
self=this;
try{if(arguments.length>2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
if(_a==null)_a=10;
;
return self.toString(_a)}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==43))return _c.a$a;
throw(_c)}}

,$1:
/* Number#% */
function(_b,_a){var self;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
return self % _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==45))return _c.a$a;
throw(_c)}}

,$al:
/* Number#& */
function(_b,_a){var self;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
return self & _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==49))return _c.a$a;
throw(_c)}}

,$5:
/* Number#< */
function(_b,_a){var self;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
return self < _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==48))return _c.a$a;
throw(_c)}}

,$ak:
/* Number#times */
function(_c){var self,_a,_b;
self=this;
try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=0;
while((_b=_a.$5(nil,self),_b!==false&&_b!==nil)){_c(_a);
_a=_a.$L(nil,1)};
return self}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==47))return _d.a$a;
throw(_d)}}

,$aj:
/* Number#| */
function(_b,_a){var self;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
return self | _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==46))return _c.a$a;
throw(_c)}}

,$ap:
/* Number#-@ */
function(){var self;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
return -self}

,$ao:
/* Number#> */
function(_b,_a){var self;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
return self > _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==51))return _c.a$a;
throw(_c)}}

,$an:
/* Number#^ */
function(_b,_a){var self;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
return self ^ _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==50))return _c.a$a;
throw(_c)}}

,$am:
/* Number#~ */
function(){var self;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
return ~self}

,$af:
/* Number#>= */
function(_b,_a){var self;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
return self >= _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==52))return _c.a$a;
throw(_c)}}

,$i:
/* Number#inspect */
function(){var self;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
return self.toString()}

,$ar:
/* Number#* */
function(_b,_a){var self;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
return self * _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==53))return _c.a$a;
throw(_c)}}

,$aq:
/* Number#+@ */
function(){var self;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
return self}

}});$_ = a$d({a$j: [],a$e: nil,a$c: "T_TestEql"});$t = a$d({a$j: [$x],a$e: $k,a$f: {$a:
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
return self.concat(_a)}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==56))return _c.a$a;
throw(_c)}}

,$N:
/* Array#<< */
function(_b,_a){var self;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
self.push(_a); return self}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==55))return _c.a$a;
throw(_c)}}

,$aa:
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
    return del ? _a : nil}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==54))return _c.a$a;
throw(_c)}}

,$as:
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
var v = self[_a]; return (v == null ? nil : v)}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==58))return _c.a$a;
throw(_c)}}

,$au:
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
    }catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==57))return _c.a$a;
throw(_c)}}

,$at:
/* Array#reverse */
function(){var self;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
return self.concat().reverse()}

,$av:
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
_d=self.$Q(function(_a){var _b;
var _c=nil;
_b=_a==null?nil:_a;
_c=_b.$o();
return _c}).$W();
return _d}

,$X:
/* Array#[]= */
function(_c,_a,_b){var self;
self=this;
try{if(arguments.length!=3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));
;
return (self[_a] = _b)}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==61))return _d.a$a;
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
    return self}catch(_b){if(_b instanceof a$c && (!_b.a$b || _b.a$b==60))return _b.a$a;
throw(_b)}}

,$ax:
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
    return self}catch(_b){if(_b instanceof a$c && (!_b.a$b || _b.a$b==59))return _b.a$a;
throw(_b)}}

,$aw:
/* Array#first */
function(){var self;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
var v = self[0]; return (v == null ? nil : v)}

,$0:
/* Array#length */
function(){var self;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
return self.length}

,$ay:
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

,$R:
/* Array#to_a */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self;
return _a}

,$aA:
/* Array#push */
function(){var self,_a,_b;
self=this;
_a=[];
for(_b=1;_b<arguments.length;_b++)_a.push(arguments[_b]);
;
self.push.apply(self, _a); return self}

,$az:
/* Array#to_ary */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self;
return _a}

,$aD:
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
_a=_a.$L(nil,self.$Q(function(_b){var _c;
var _d=nil;
_c=_b==null?nil:_b;
_d=_c.$i();
return _d}).$W(nil,", "));
_a=_a.$L(nil,"]");
_e=_a;
return _e}

,$aC:
/* Array#reverse! */
function(){var self;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
self.reverse(); return self}

,$aB:
/* Array#unshift */
function(){var self,_a,_b;
self=this;
_a=[];
for(_b=1;_b<arguments.length;_b++)_a.push(arguments[_b]);
;
self.unshift.apply(self, _a); return self}

,$W:
/* Array#join */
function(_i,_a){var self,_b,_d,_h;
_h=nil;
self=this;
try{if(arguments.length>2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
if(_a==null)_a="";
;
_b="";
self.$ax(function(_c){var _e,_f;
var _g=nil;
(_d=a$j(_c),_e=_d[0]==null?nil:_d[0],_f=_d[1]==null?nil:_d[1],_d);
_b=_b.$L(nil,_e.$o());
if((_d=_f.$D(nil,self.$0().$ag(nil,1)),_d===false||_d===nil)){_g=_b=_b.$L(nil,_a)}else{_g=nil};
return _g});
_h=_b;
return _h}catch(_j){if(_j instanceof a$c && (!_j.a$b || _j.a$b==62))return _j.a$a;
throw(_j)}}

}});$6 = a$d({a$j: [],a$e: $k,a$c: "T_TestClass::D"});$V = a$d({a$j: [],a$e: $k,a$f: {$G:
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

},a$c: "T_TestEql::TestEql"});$R = a$d({a$j: [],a$e: $k,a$f: {$G:
/* T_TestString::TestString.main */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$a().$K();
return _a}

},a$c: "T_TestString::TestString",a$h: {$K:
/* T_TestString::TestString#test */
function(){var self,_a,_i;
_i=nil;
self=this;
if(self.$aH==null)self.$aH=nil;
if(self.$aI==null)self.$aI=nil;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
self.$t(nil,"hello");
self.$t(nil,"hallo\b\t\n");
self.$t(nil,"hallo\\leute");
self.$t(nil,"\"super\"");
self.$t(nil,"hello".$aE(nil,"e"));
self.$t(nil,"hello".$aE(nil,"lo"));
self.$t(nil,"hello".$aE(nil,"a"));
self.$t(nil,"hello hello".$aE(nil,"ll"));
self.$t(nil,"hello hello".$aE(nil,"ll",3));
self.$t(nil,"hallo".$V(nil,0,1));
self.$t(nil,"hallo".$V(nil,0,2));
self.$t(nil,"hallo".$V(nil,0,5));
self.$t(nil,"10".$aF(nil,10,"0"));
self.$t(nil,"10".$aF(nil,1,"blah"));
self.$t(nil,"x".$aF(nil,4,"()"));
self.$t(nil,"10".$aG(nil,10,"0"));
self.$t(nil,"10".$aG(nil,1,"blah"));
self.$t(nil,"x".$aG(nil,4,"()"));
self.$t(nil,("abc " + ((1).$L(nil,2)).$o() + (" def").$o()));
self.$aH="hallo".$i();
self.$aI=4.5;
self.$t(nil,("" + (self.$aH).$o() + (",").$o() + (self.$aI).$o()));
_a="hallo".$aJ(nil,"l","r");
self.$t(nil,_a);
_a="hallo".$aJ(nil,/ll/,"rr");
self.$t(nil,_a);
_a="hallo".$aJ(function(){var _c=nil;
;
_c="r";
return _c},/l/);
self.$t(nil,_a);
_a="hallo".$aJ(function(){var _e=nil;
;
_e="blah blah";
return _e},/ll/);
self.$t(nil,_a);
_i="hallllllo".$aJ(function(_f){var _g;
var _h=nil;
_g=_f==null?nil:_f;
_h=self.$t(nil,_g);
return _h},/(l)l/);
return _i}

}});$X = a$d({a$j: [],a$e: $k,a$f: {$G:
/* T_TestRange::TestRange.main */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$a().$K();
return _a}

},a$c: "T_TestRange::TestRange",a$h: {$K:
/* T_TestRange::TestRange#test */
function(){var self,_a,_i,_j;
_j=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=$v.$a(nil,0,2);
self.$t(nil,_a.$aw());
self.$t(nil,_a.$av());
self.$t(nil,_a);
self.$t(nil,$v.$a(nil,0,2,false).$o());
self.$t(nil,$v.$a(nil,0,2,true).$o());
$v.$a(nil,0,4,false).$v(function(_b){var _c;
var _d=nil;
_c=_b==null?nil:_b;
_d=self.$t(nil,_c);
return _d});
$v.$a(nil,0,4,true).$v(function(_e){var _c;
var _f=nil;
_c=_e==null?nil:_e;
_f=self.$t(nil,_c);
return _f});
$v.$a(nil,-1,-4,false).$v(function(_g){var _c;
var _h=nil;
_c=_g==null?nil:_g;
_h=self.$t(nil,_c);
return _h});
self.$t(nil,$v.$a(nil,0,4,false).$aK(nil,4));
self.$t(nil,$v.$a(nil,0,4,false).$aK(nil,5));
self.$t(nil,$v.$a(nil,0,4,true).$aK(nil,5));
self.$t(nil,$v.$a(nil,0,4,true).$aK(nil,4));
self.$t(nil,$v.$a(nil,0,4,true).$aK(nil,3));
self.$t(nil,$v.$a(nil,0,4,true).$aK(nil,0));
self.$t(nil,$v.$a(nil,0,4,true).$aK(nil,-1));
self.$t(nil,$v.$a(nil,-1,-5,false).$R());
self.$t(nil,$v.$a(nil,-5,-1,false).$R());
_i=$v.$a(nil,0,4);
self.$t(nil,_i.$aw());
self.$t(nil,_i.$aL());
self.$t(nil,_i.$av());
self.$t(nil,_i.$aM());
self.$t(nil,_i.$aN());
_i=$v.$a(nil,1,5,true);
self.$t(nil,_i.$aw());
self.$t(nil,_i.$aL());
self.$t(nil,_i.$av());
self.$t(nil,_i.$aM());
self.$t(nil,_i.$aN());
self.$t(nil,false.$D(nil,false));
self.$t(nil,false.$D(nil,true));
self.$t(nil,true.$D(nil,false));
self.$t(nil,true.$D(nil,true));
self.$t(nil,$v.$a(nil,0,2,false).$D(nil,$v.$a(nil,0,2,false)));
self.$t(nil,$v.$a(nil,0,2,false).$D(nil,$v.$a(nil,0,2)));
_j=self.$t(nil,$v.$a(nil,0,2,false).$D(nil,$v.$a(nil,0,2,true)));
return _j}

}});$e = a$d({a$j: [],a$e: $k,a$c: "String",a$d: String,a$h: {$L:
/* String#+ */
function(_b,_a){var self;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
return(self + _a)}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==64))return _c.a$a;
throw(_c)}}

,$aO:
/* String#sub */
function(_c,_a,_b){var self;
self=this;
try{if(arguments.length!=3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));
;
self.replace(pattern, replacement)}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==63))return _d.a$a;
throw(_d)}}

,$aP:
/* String#=~ */
function(_b,_a){var self;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;

    var i = self.search(_a);
    return (i == -1 ? nil : i)}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==66))return _c.a$a;
throw(_c)}}

,$aF:
/* String#rjust */
function(_f,_a,_b){var self,_c,_d,_e;
self=this;
try{if(arguments.length<2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
if(arguments.length>3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));
if(_b==null)_b=" ";
;
if((_c=_b.$l(),_c!==false&&_c!==nil)){self.$j(nil,$a,"zero width padding")};
_d=_a.$ag(nil,self.$0());
if((_c=_d.$ad(nil,0),_c!==false&&_c!==nil)){return self};
_e="";
while(_e.length < _d) _e += _b;;
return _e.$V(nil,0,_d).$L(nil,self)}catch(_g){if(_g instanceof a$c && (!_g.a$b || _g.a$b==65))return _g.a$a;
throw(_g)}}

,$as:
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
if((_c=_b.$q(),_c!==false&&_c!==nil)){return self.charAt(_a) || nil}else{if((_c=_b.$5(nil,0),_c!==false&&_c!==nil)){return nil};
return self.substring(_a, _a+_b)}}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==68))return _e.a$a;
throw(_e)}}

,$aG:
/* String#ljust */
function(_f,_a,_b){var self,_c,_d,_e;
self=this;
try{if(arguments.length<2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
if(arguments.length>3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));
if(_b==null)_b=" ";
;
if((_c=_b.$l(),_c!==false&&_c!==nil)){self.$j(nil,$a,"zero width padding")};
_d=_a.$ag(nil,self.$0());
if((_c=_d.$ad(nil,0),_c!==false&&_c!==nil)){return self};
_e="";
while(_e.length < _d) _e += _b;;
return self.$L(nil,_e.$V(nil,0,_d))}catch(_g){if(_g instanceof a$c && (!_g.a$b || _g.a$b==67))return _g.a$a;
throw(_g)}}

,$aQ:
/* String#split */
function(_b,_a){var self;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
return self.split(_a)}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==69))return _c.a$a;
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

,$0:
/* String#length */
function(){var self;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
return self.length}

,$aR:
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

,$aJ:
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
if((_c=_b,_c!==false&&_c!==nil)){_d=_d.$L(nil,_b)}else{_d=_d.$L(nil,_g(_f.$aw()).$o())};
_e = _e.slice(_f.index + _f[0].length);
      } else {
        _d += _e; _e = '';
      }
    } return _d}catch(_h){if(_h instanceof a$c && (!_h.a$b || _h.a$b==71))return _h.a$a;
throw(_h)}}

,$aE:
/* String#index */
function(_c,_a,_b){var self;
self=this;
try{if(arguments.length<2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
if(arguments.length>3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));
if(_b==null)_b=0;
;

    var i = self.indexOf(_a, _b);
    return (i == -1) ? nil : i}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==70))return _d.a$a;
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
_b=self.$aJ(function(_c){var _d,_e;
_d=_c==null?nil:_c;
_e=_a[_d];
return _e ? _e : 
        '\\u00' + ("0" + _d.charCodeAt().toString(16)).substring(0,2);},/[\x00-\x1f\\]/);
return ('"' + _b.replace(/"/g, '\\"') + '"');}

}});$L = a$d({a$j: [],a$e: $k,a$f: {$G:
/* T_TestHash::TestHash.main */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$a().$K();
return _a}

},a$c: "T_TestHash::TestHash",a$h: {$B:
/* T_TestHash::TestHash#hash */
function(){var self;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
var el = {}; el["1"] = null; return el}

,$K:
/* T_TestHash::TestHash#test */
function(){var self,_a,_b,_c;
_c=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=$y.$Z(nil,"a",6,"b",7,"1",1,1,2,"1,2","hello",[1,2],"good");
self.$t(nil,_a.$V(nil,"a"));
self.$t(nil,_a.$V(nil,"b"));
self.$t(nil,_a.$V(nil,"1"));
self.$t(nil,_a.$V(nil,1));
self.$t(nil,_a.$V(nil,"1,2"));
self.$t(nil,_a.$V(nil,[1,2]));
self.$u(nil,"test native JS hash");
_c=_b=self.$B();
return _c}

}});$$ = a$d({a$j: [],a$e: $9,a$c: "Float",a$d: Number});$aa = a$d({a$j: [],a$e: nil,a$c: "T_TestSend"});$ab = a$d({a$j: [],a$e: nil,a$c: "T_TestInspect"});$ac = a$d({a$j: [],a$e: nil,a$c: "T_TestMassign"});$5 = a$d({a$j: [],a$e: $J,a$c: "T_TestClass::C"});$h = a$d({a$j: [],a$e: $k,a$f: {$a:
/* Proc.new */
function(_a){var self,_b,_c;
self=this;
_b=_a==null?nil:_a;
try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
if((_c=_b,_c===false||_c===nil)){self.$j(nil,$a,"tried to create Proc object without a block")};
return (function() {
      try {
        return _b.$O.apply(_b, arguments);
      } catch(e) 
      {
        if (e instanceof a$c) 
        {
          if (e.a$b == null)
          {;
self.$j(nil,$ad,"break from proc-closure");
}
          return e.a$a;
        }
        else throw(e);
      }
    })}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==72))return _d.a$a;
throw(_d)}}

},a$c: "Proc",a$d: Function,a$h: {$O:
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

}});$ae = a$d({a$j: [],a$e: $9,a$c: "Bignum",a$d: Number});$ad = a$d({a$j: [],a$e: $n,a$c: "LocalJumpError"});$M = a$d({a$j: [],a$e: $k,a$f: {$G:
/* T_TestYield::TestYield.main */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$a().$K();
return _a}

},a$c: "T_TestYield::TestYield",a$h: {$aT:
/* T_TestYield::TestYield#test_loop2 */
function(){var self,_a,_b,_d,_f;
_f=nil;
self=this;
try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
self.$u(nil,"loop2");
_a=0;
_b=self.$aU(function(){var _e=nil;
;
_a=_a.$L(nil,1);
if((_d=_a.$1(nil,2).$D(nil,1),_d!==false&&_d!==nil)){return nil};
self.$t(nil,_a);
if((_d=_a.$ao(nil,8),_d!==false&&_d!==nil)){throw(new a$c(["out",_a],null))}else{_e=nil};
return _e});
self.$t(nil,_b);
_f=self.$u(nil,"--");
return _f}catch(_g){if(_g instanceof a$c && (!_g.a$b || _g.a$b==74))return _g.a$a;
throw(_g)}}

,$aS:
/* T_TestYield::TestYield#three_times_block */
function(_a){var self,_b,_c;
_c=nil;
self=this;
_b=_a==null?nil:_a;
try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_b.$O(nil,1);
_b.$O(nil,2);
_c=_b.$O(nil,3);
return _c}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==73))return _d.a$a;
throw(_d)}}

,$aW:
/* T_TestYield::TestYield#return_in_block */
function(_a){var self,_b,_c;
_c=nil;
self=this;
_b=_a==null?nil:_a;
try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
self.$t(nil,"return_in_block before");
_b.$O();
_c=self.$t(nil,"return_in_block after");
return _c}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==75))return _d.a$a;
throw(_d)}}

,$aV:
/* T_TestYield::TestYield#test_while_loop */
function(){var self,_a,_b,_c;
_c=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
self.$u(nil,"while-loop");
_a=0;
while(true){_a=_a.$L(nil,1);
if((_b=_a.$1(nil,2).$D(nil,1),_b!==false&&_b!==nil)){continue};
self.$t(nil,_a);
if((_b=_a.$ao(nil,8),_b!==false&&_b!==nil)){break}};
self.$u(nil,"----");
while((_b=_a.$ao(nil,0),_b!==false&&_b!==nil)){self.$t(nil,_a);
_a=_a.$ag(nil,1)};
_c=self.$u(nil,"--");
return _c}

,$aU:
/* T_TestYield::TestYield#loop2 */
function(_a){var self,_b,_c;
_c=nil;
self=this;
_b=_a==null?nil:_a;
try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
while(true){_b.$O()};
_c=self.$t(nil,"not reached");
return _c}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==77))return _d.a$a;
throw(_d)}}

,$aZ:
/* T_TestYield::TestYield#test_proc */
function(){var self,_a,_d;
_d=nil;
self=this;
try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
self.$t(nil,"test_proc");
_a=self.$s(function(){;
throw(new a$c(0,76))});
self.$t(nil,_a.$O());
_a=$h.$a(function(){;
throw(new a$c(3,null))});
_d=self.$t(nil,_a.$O());
return _d}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==76))return _e.a$a;
throw(_e)}}

,$aX:
/* T_TestYield::TestYield#test_three_times_indirect */
function(){var self,_d;
_d=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
self.$u(nil,"three_times_indirect");
self.$aY(function(_a){var _b;
var _c=nil;
_b=_a==null?nil:_a;
_c=self.$t(nil,_b);
return _c});
_d=self.$u(nil,"--");
return _d}

,$a0:
/* T_TestYield::TestYield#test_three_times_yield2 */
function(){var self,_d,_e;
_e=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
self.$u(nil,"three_times_yield2");
_e=self.$a1(function(_a){var _b;
var _c=nil;
_b=_a==null?nil:_a;
if((_d=_b.$D(nil,1),_d!==false&&_d!==nil)){_c=_b}else{return _b.$L(nil,1)};
return _c});
return _e}

,$a3:
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
_a=_a.$L(nil,1);
if((_d=_a.$1(nil,2).$D(nil,1),_d!==false&&_d!==nil)){return nil};
self.$t(nil,_a);
if((_d=_a.$ao(nil,8),_d!==false&&_d!==nil)){throw(new a$c(["out",_a],null))}else{_e=nil};
return _e});
self.$t(nil,_b);
_f=self.$u(nil,"--");
return _f}catch(_g){if(_g instanceof a$c && (!_g.a$b || _g.a$b==78))return _g.a$a;
throw(_g)}}

,$a2:
/* T_TestYield::TestYield#test_three_times_block */
function(){var self,_d;
_d=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
self.$u(nil,"three_times_block");
self.$aS(function(_a){var _b;
var _c=nil;
_b=_a==null?nil:_a;
_c=self.$t(nil,_b);
return _c});
_d=self.$u(nil,"--");
return _d}

,$K:
/* T_TestYield::TestYield#test */
function(){var self,_b,_c,_d;
_d=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
self.$a4();
self.$a2();
self.$aX();
self.$a0();
self.$a3();
self.$aT();
self.$aV();
try{self.$aZ()}catch(_a){if(_a instanceof a$c)throw(_a);
if((_c=$ad.$f(nil,_a),_c!==false&&_c!==nil)){_b=_a;
self.$t(nil,_b)}else{throw(_a)}};
_d=self.$t(nil,self.$a5());
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
return _b}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==81))return _c.a$a;
throw(_c)}}

,$aY:
/* T_TestYield::TestYield#three_times_indirect */
function(_a){var self,_b,_c;
_c=nil;
self=this;
_b=_a==null?nil:_a;
try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
self.$a6(_b);
_c=self.$aS(_b);
return _c}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==80))return _d.a$a;
throw(_d)}}

,$a6:
/* T_TestYield::TestYield#three_times_yield */
function(_a){var self,_b;
_b=nil;
self=this;
try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a(1);
_a(2);
_b=_a(3);
return _b}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==79))return _c.a$a;
throw(_c)}}

,$a1:
/* T_TestYield::TestYield#three_times_yield2 */
function(_a){var self,_b;
_b=nil;
self=this;
try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
self.$t(nil,_a(1));
self.$t(nil,_a(2));
_b=self.$t(nil,_a(3));
return _b}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==82))return _c.a$a;
throw(_c)}}

,$a5:
/* T_TestYield::TestYield#test_return_in_block */
function(){var self,_b;
_b=nil;
self=this;
try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
self.$t(nil,"before");
self.$aW(function(){;
throw(new a$c(4,83))});
_b=self.$t(nil,"after (NOT)");
return _b}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==83))return _c.a$a;
throw(_c)}}

,$a4:
/* T_TestYield::TestYield#test_three_times_yield */
function(){var self,_d;
_d=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
self.$u(nil,"three_times_yield");
self.$a6(function(_a){var _b;
var _c=nil;
_b=_a==null?nil:_a;
_c=self.$t(nil,_b);
return _c});
_d=self.$u(nil,"--");
return _d}

}});$N = a$d({a$j: [],a$e: $k,a$f: {$G:
/* T_TestExpr::TestExpr.main */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$a().$K();
return _a}

},a$c: "T_TestExpr::TestExpr",a$h: {$K:
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
return _c}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==84))return _d.a$a;
throw(_d)}}

}});$af = a$d({a$j: [],a$e: nil,a$c: "T_TestHash"});$S = a$d({a$j: [],a$e: $k,a$f: {$G:
/* T_TestInspect::TestInspect.main */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$a().$K();
return _a}

},a$c: "T_TestInspect::TestInspect",a$h: {$K:
/* T_TestInspect::TestInspect#test */
function(){var self,_a,_b;
_b=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=[$y.$Z(nil,"Hello","Rubyconf")];
_b=self.$u(nil,_a.$i());
return _b}

}});$d = a$d({a$j: [],a$e: $n,a$c: "TypeError"});$Y = a$d({a$j: [],a$e: $k,a$f: {$G:
/* T_TestMassign::TestMassign.main */
function(){var self,_a,_b,_c,_d,_e,_f;
_a=_f=nil;
self=this;
if(self.$aH==null)self.$aH=nil;
if(self.$a7==null)self.$a7=nil;
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
(_a=[1,2,3],self.$aH=_a[0]==null?nil:_a[0],_c=_a[1]==null?nil:_a[1],self.$a7=_a[2]==null?nil:_a[2],_a);
self.$t(nil,self.$aH);
self.$t(nil,_c);
self.$t(nil,self.$a7);
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
self.$t(nil,(typeof($ag)=='undefined'?nil:$ag));
self.$t(nil,(typeof($ah)=='undefined'?nil:$ah));
(_a=[1,2],$ag=_a[0]==null?nil:_a[0],$ah=_a[1]==null?nil:_a[1],_a);
self.$t(nil,(typeof($ag)=='undefined'?nil:$ag));
self.$t(nil,(typeof($ah)=='undefined'?nil:$ah));
_f=self.$u(nil,"--");
return _f}

},a$c: "T_TestMassign::TestMassign"});$ai = a$d({a$j: [],a$e: nil,a$c: "T_TestLebewesen"});$aj = a$d({a$j: [],a$e: $k,a$c: "MatchData",a$h: {$c:
/* MatchData#initialize */
function(_c,_a){var self,_b;
_b=nil;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
_b=self.$a8=_a;
return _b}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==85))return _d.a$a;
throw(_d)}}

}});$ak = a$d({a$j: [],a$e: nil,a$c: "T_TestSimpleOutput"});$j = a$d({a$j: [],a$e: $k,a$c: "Method",a$h: {$c:
/* Method#initialize */
function(_f,_a,_b){var self,_c,_d,_e;
_e=nil;
self=this;
try{if(arguments.length!=3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));
;
(_c=[_a,_b],self.$a9=_c[0]==null?nil:_c[0],self.$a_=_c[1]==null?nil:_c[1],_c);
_d=nil;
_d = _a[a$f[_b]];
    if (_d==null) _d = nil;;
if((_c=_d,_c!==false&&_c!==nil)){_e=self.$a$=_d}else{_e=self.$j(nil,$o,("undefined method `" + (_b).$o() + ("' for class `").$o() + (_a.$z().$e()).$o() + ("'").$o()))};
return _e}catch(_g){if(_g instanceof a$c && (!_g.a$b || _g.a$b==86))return _g.a$a;
throw(_g)}}

,$O:
/* Method#call */
function(_c){var self,_a,_b,_d;
self=this;
_d=_c==null?nil:_c;
try{_a=[];
for(_b=1;_b<arguments.length;_b++)_a.push(arguments[_b]);
;
return self.$a$.apply(self.$a9, [_d].concat(_a))}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==87))return _e.a$a;
throw(_e)}}

,$i:
/* Method#inspect */
function(){var self,_a;
_a=nil;
self=this;
if(self.$a_==null)self.$a_=nil;
if(self.$a9==null)self.$a9=nil;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=("#<Method: " + (self.$a9.$z().$e()).$o() + ("#").$o() + (self.$a_).$o() + (">").$o());
return _a}

}});$v = a$d({a$j: [],a$e: $k,a$c: "Range",a$h: {$D:
/* Range#== */
function(_e,_a){var self,_b,_c,_d;
_d=nil;
self=this;
if(self.$ba==null)self.$ba=nil;
if(self.$bb==null)self.$bb=nil;
if(self.$bc==null)self.$bc=nil;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
if (self.constructor != _a.constructor) return false;;
_d=(_b=self.$ba.$D(nil,_a.$aw()), (_b!==false&&_b!==nil) ? ((_c=self.$bb.$D(nil,_a.$av()), (_c!==false&&_c!==nil) ? (self.$bc.$D(nil,_a.$aN())) : _c)) : _b);
return _d}catch(_f){if(_f instanceof a$c && (!_f.a$b || _f.a$b==88))return _f.a$a;
throw(_f)}}

,$aL:
/* Range#begin */
function(){var self,_a;
_a=nil;
self=this;
if(self.$ba==null)self.$ba=nil;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$ba;
return _a}

,$g:
/* Range#eql? */
function(_e,_a){var self,_b,_c,_d;
_d=nil;
self=this;
if(self.$ba==null)self.$ba=nil;
if(self.$bb==null)self.$bb=nil;
if(self.$bc==null)self.$bc=nil;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
if (self.constructor != _a.constructor) return false;;
_d=(_b=self.$ba.$g(nil,_a.$aw()), (_b!==false&&_b!==nil) ? ((_c=self.$bb.$g(nil,_a.$av()), (_c!==false&&_c!==nil) ? (self.$bc.$D(nil,_a.$aN())) : _c)) : _b);
return _d}catch(_f){if(_f instanceof a$c && (!_f.a$b || _f.a$b==89))return _f.a$a;
throw(_f)}}

,$aN:
/* Range#exclude_end? */
function(){var self,_a;
_a=nil;
self=this;
if(self.$bc==null)self.$bc=nil;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$bc;
return _a}

,$av:
/* Range#last */
function(){var self,_a;
_a=nil;
self=this;
if(self.$bb==null)self.$bb=nil;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$bb;
return _a}

,$o:
/* Range#to_s */
function(){var self,_b,_a;
_a=nil;
self=this;
if(self.$ba==null)self.$ba=nil;
if(self.$bb==null)self.$bb=nil;
if(self.$bc==null)self.$bc=nil;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
if((_b=self.$bc,_b!==false&&_b!==nil)){_a=("" + (self.$ba).$o() + ("...").$o() + (self.$bb).$o())}else{_a=("" + (self.$ba).$o() + ("..").$o() + (self.$bb).$o())};
return _a}

,$v:
/* Range#each */
function(_c){var self,_a,_b,_d;
_d=nil;
self=this;
if(self.$ba==null)self.$ba=nil;
if(self.$bb==null)self.$bb=nil;
if(self.$bc==null)self.$bc=nil;
try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$ba;
if((_b=self.$ba.$ao(nil,self.$bb),_b!==false&&_b!==nil)){return nil};
if((_b=self.$bc,_b!==false&&_b!==nil)){while((_b=_a.$5(nil,self.$bb),_b!==false&&_b!==nil)){_c(_a);
_a=_a.$ah()};
_d=nil;
}else{while((_b=_a.$ad(nil,self.$bb),_b!==false&&_b!==nil)){_c(_a);
_a=_a.$ah()};
_d=nil;
};
return _d}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==92))return _e.a$a;
throw(_e)}}

,$aM:
/* Range#end */
function(){var self,_a;
_a=nil;
self=this;
if(self.$bb==null)self.$bb=nil;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$bb;
return _a}

,$aw:
/* Range#first */
function(){var self,_a;
_a=nil;
self=this;
if(self.$ba==null)self.$ba=nil;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$ba;
return _a}

,$aK:
/* Range#include? */
function(_d,_a){var self,_b,_c;
_c=nil;
self=this;
if(self.$ba==null)self.$ba=nil;
if(self.$bb==null)self.$bb=nil;
if(self.$bc==null)self.$bc=nil;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
if((_b=_a.$5(nil,self.$ba),_b!==false&&_b!==nil)){return false};
if((_b=self.$bc,_b!==false&&_b!==nil)){_c=_a.$5(nil,self.$bb)}else{_c=_a.$ad(nil,self.$bb)};
return _c}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==91))return _e.a$a;
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
(_d=[_a,_b],self.$ba=_d[0]==null?nil:_d[0],self.$bb=_d[1]==null?nil:_d[1],_d);
_e=self.$bc=((_d=_c,_d!==false&&_d!==nil)?true:false);
return _e}catch(_g){if(_g instanceof a$c && (!_g.a$b || _g.a$b==90))return _g.a$a;
throw(_g)}}

,$f:
/* Range#=== */
function(_d,_a){var self,_b,_c;
_c=nil;
self=this;
if(self.$ba==null)self.$ba=nil;
if(self.$bb==null)self.$bb=nil;
if(self.$bc==null)self.$bc=nil;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
if((_b=_a.$5(nil,self.$ba),_b!==false&&_b!==nil)){return false};
if((_b=self.$bc,_b!==false&&_b!==nil)){_c=_a.$5(nil,self.$bb)}else{_c=_a.$ad(nil,self.$bb)};
return _c}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==93))return _e.a$a;
throw(_e)}}

,$R:
/* Range#to_a */
function(){var self,_a,_b,_c;
self=this;
if(self.$ba==null)self.$ba=nil;
if(self.$bb==null)self.$bb=nil;
if(self.$bc==null)self.$bc=nil;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=[];
if((_b=self.$ba.$ao(nil,self.$bb),_b!==false&&_b!==nil)){return _a};
_c=self.$ba;
if((_b=self.$bc,_b!==false&&_b!==nil)){while((_b=_c.$5(nil,self.$bb),_b!==false&&_b!==nil)){_a.$N(nil,_c);
_c=_c.$ah()}}else{while((_b=_c.$ad(nil,self.$bb),_b!==false&&_b!==nil)){_a.$N(nil,_c);
_c=_c.$ah()}};
return _a}

,$i:
/* Range#inspect */
function(){var self,_b,_a;
_a=nil;
self=this;
if(self.$ba==null)self.$ba=nil;
if(self.$bb==null)self.$bb=nil;
if(self.$bc==null)self.$bc=nil;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
if((_b=self.$bc,_b!==false&&_b!==nil)){_a=("" + (self.$ba.$i()).$o() + ("...").$o() + (self.$bb.$i()).$o())}else{_a=("" + (self.$ba.$i()).$o() + ("..").$o() + (self.$bb.$i()).$o())};
return _a}

,$bd:
/* Range#member? */
function(_d,_a){var self,_b,_c;
_c=nil;
self=this;
if(self.$ba==null)self.$ba=nil;
if(self.$bb==null)self.$bb=nil;
if(self.$bc==null)self.$bc=nil;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
if((_b=_a.$5(nil,self.$ba),_b!==false&&_b!==nil)){return false};
if((_b=self.$bc,_b!==false&&_b!==nil)){_c=_a.$5(nil,self.$bb)}else{_c=_a.$ad(nil,self.$bb)};
return _c}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==94))return _e.a$a;
throw(_e)}}

}});$al = a$d({a$j: [],a$e: nil,a$c: "T_TestRegexp"});$am = a$d({a$j: [],a$e: nil,a$c: "T_TestNew"});$an = a$d({a$j: [],a$e: nil,a$c: "T_TestRange"});$W = a$d({a$j: [],a$e: $k,a$f: {$G:
/* T_TestSend::TestSend.main */
function(){var self,_b,_c,_d,_e;
_e=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
self.$u(nil,"send");
self.$t(nil,$1.$a().$w(nil,"a_method",1,2));
self.$t(nil,$2.$a().$w(nil,"a_method",1,2));
self.$u(nil,"respond_to?");
self.$t(nil,$1.$a().$r(nil,"a_method"));
self.$t(nil,$1.$a().$r(nil,"to_s"));
self.$t(nil,$1.$a().$r(nil,"inspect"));
self.$t(nil,$1.$a().$r(nil,"b_method"));
self.$t(nil,$1.$a().$r(nil,"c_method"));
self.$u(nil,"method_missing");
self.$t(nil,$m.$a().$r(nil,"blah_blah"));
$m.$a().$be(nil,1,2,3);
try{$1.$a().$be();
self.$u(nil,"FAILURE?")}catch(_a){if(_a instanceof a$c)throw(_a);
if((_b=$g.$f(nil,_a),_b!==false&&_b!==nil)){self.$u(nil,"catched!!!")}else{throw(_a)}};
try{$1.$bf()}catch(_a){if(_a instanceof a$c)throw(_a);
if((_b=$g.$f(nil,_a),_b!==false&&_b!==nil)){self.$t(nil,"goood")}else{throw(_a)}};
self.$u(nil,"class Method");
_c="hallo".$C(nil,"to_s");
self.$t(nil,_c);
self.$t(nil,_c.$O());
_d=[1,2,3];
_c=_d.$C(nil,"+");
self.$t(nil,_c);
self.$t(nil,_c.$O(nil,[2,3]));
self.$t(nil,_c);
_e=self.$t(nil,_d);
return _e}

},a$c: "T_TestSend::TestSend"});$a = a$d({a$j: [],a$e: $n,a$c: "ArgumentError"});$O = a$d({a$j: [],a$e: $k,a$f: {$G:
/* T_TestSimpleOutput::TestSimpleOutput.main */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$u(nil,"Hello World from RubyJS");
return _a}

},a$c: "T_TestSimpleOutput::TestSimpleOutput"});a$d({a$j: [],a$g: $b});$c = a$d({a$j: [],a$e: $n,a$c: "RuntimeError"});$T = a$d({a$j: [],a$e: $k,a$f: {$G:
/* T_TestRegexp::TestRegexp.main */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$a().$K();
return _a}

},a$c: "T_TestRegexp::TestRegexp",a$h: {$K:
/* T_TestRegexp::TestRegexp#test */
function(){var self,_a,_b,_c;
_c=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
if((_a="hallo".$aP(nil,/ll/),_a!==false&&_a!==nil)){self.$t(nil,"okay")};
_b="hallo".$aP(nil,/ll/);
self.$t(nil,_b);
"hallo".$aP(nil,/(ll)/);
self.$t(nil,(RegExp.$1 || nil));
self.$t(nil,(RegExp.$2 || nil));
self.$t(nil,(RegExp.$3 || nil));
"hallo".$aP(nil,/a(ll)(o)/);
self.$t(nil,(RegExp.$1 || nil));
self.$t(nil,(RegExp.$2 || nil));
self.$t(nil,(RegExp.$3 || nil));
_c=self.$t(nil,(RegExp.$4 || nil));
return _c}

}});$ao = a$d({a$j: [],a$e: nil,a$c: "T_TestIf"});$u = a$d({a$j: [],a$e: $9,a$c: "Fixnum",a$d: Number});$ap = a$d({a$j: [],a$e: nil,a$c: "T_TestArgs"});$Z = a$d({a$j: [],a$e: $k,a$f: {$G:
/* T_TestNew::TestNew.main */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$a().$K();
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

,$K:
/* T_TestNew::TestNew#test */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$u(nil,"test");
return _a}

}});      $b.a$e = $k;
var a$n = [$i,$k,$l,$m,$f,$n,$o,$g,$r,$s,$w,$x,$y,$z,$A,$B,$C,$q,$D,$E,$F,$G,$H,$I,$J,$K,$0,$1,$2,$3,$Q,$4,$p,$P,$U,$7,$8,$9,$_,$t,$6,$V,$R,$X,$e,$L,$$,$aa,$ab,$ac,$5,$h,$ae,$ad,$M,$N,$af,$S,$d,$Y,$ai,$aj,$ak,$j,$v,$al,$am,$an,$W,$a,$O,$b,$c,$T,$ao,$u,$ap,$Z];
a$o(a$n);
for (var i=0; i<a$n.length; i++) a$p(a$n[i]);
function main() { return $0.$G.apply($0, arguments); }var STDOUT_LINE_NO = 0;
var FAILURES = 0; 
var TOTAL = 393;

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
