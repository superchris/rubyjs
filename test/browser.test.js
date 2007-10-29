// declare nil
function NilClass() {}

// FIXME: remove
NilClass.prototype.toString = function() { return "nil"; };
nil = new NilClass();

 
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
function a$k(o, m, i, a) 
{
  var r = o[m]; // method in current class
  var c = o.a$g.a$e;
  while (r === c.a$d.prototype[m])
    c = c.a$e;
  return c.a$d.prototype[m].apply(o, [i].concat(a));
}

function a$m(o, m, a) 
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
    m = k.a$i;
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
  for (i=0; i<c.a$i.length; i++)
  {
    for (k in c.a$i[i].a$d.prototype)
    {
      if (c.a$d.prototype[k]===undefined)
      {
        c.a$d.prototype[k] = c.a$i[i].a$d.prototype[k];
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

  if (h.a$i)
  {
    for (i=0; i<h.a$i.length; i++)
    {
      c.a$i.push(h.a$i[i]);
    }
  }

  return c;
}

function a$a(_a, _b, _c, _d) 
{
  this.a$e = _b;
  this.a$c = _c;
  this.a$d = _d;
  this.a$i = [];
  this.a$g = _a;
  return this;
}

a$a.$e = function() { return "MetaClass"; };
a$a.$z = function() { return this; };
//
// Generates a new method_missing function
// for the given symbol +sym+.
// 
var a$q = {}; 
function a$r(sym)
{
  if (!a$q[sym])
  {
    var fn = function() {
      return a$s(this, arguments, sym);
    };
    fn.a$j = true;
    a$q[sym] = fn;
  }

  return a$q[sym];
}

function a$s(obj, args, sym)
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
      c.a$d.prototype[i] = a$r(i);
    }
  }

  if (c.a$e != nil)
  {
    for (i in c.a$e)
    {
      if (c[i]===undefined)
      {
        c[i] = a$r(i);
      }
    }
  }
}
// method map
var a$h = {"$a7":"sub","$G":"test","$aH":"end","$v":"each","$a1":"m","$1":"new_from_jsobject","$x":"loop","$aJ":"to_f","$4":"%","$N":"collect","$$":"test_three_times_indirect","$aI":"member?","$at":"&","$0":"new_from_key_value_list","$3":"test_loop2","$ai":"three_times_yield","$f":"===","$2":"three_times_block","$5":"==","$aR":"reverse","$aa":"three_times_indirect","$R":"map","$an":"downto","$aK":"to_i","$as":"times","$t":"p","$aG":"include?","$s":"proc","$b":"allocate","$V":"keys","$T":"reject","$ad":"three_times_yield2","$aQ":"size","$ay":"*","$F":"+","$aP":"delete","$aY":"unshift","$Z":"values","$_":"return_in_block","$al":"upto","$a3":"rjust","$a0":"dup","$9":"-","$q":"nil?","$aO":"not_a_method","$a":"new","$8":"test_while_loop","$aq":"/","$P":"call","$L":"message","$aX":"push","$y":"is_a?","$a8":"split","$I":"main","$e":"name","$l":"empty?","$aL":"to_splat","$E":"jage","$j":"raise","$aV":"length","$o":"to_s","$ba":"c_method","$ao":">=","$aS":"clear","$a$":"array","$ar":"|","$h":"kind_of?","$Q":"find_all","$au":"~","$7":"loop2","$W":"[]","$a9":"strip","$ac":"test_three_times_yield2","$aw":"-@","$ah":"test_return_in_block","$Y":"[]=","$ap":"succ","$aZ":"reverse!","$B":"hash","$z":"class","$i":"inspect","$av":"^","$ae":"test_three_times_block","$ag":"test_three_times_yield","$p":"__send","$g":"eql?","$aU":"pop","$H":"<","$D":"wau","$aA":"first","$aF":"begin","$a4":"ljust","$O":"<<","$d":"__invoke","$6":">","$am":"<=","$c":"initialize","$w":"send","$r":"respond_to?","$aM":"a_method","$af":"test_loop","$k":"shift","$aE":"exclude_end?","$ax":"+@","$aN":"blah_blah","$U":"select","$ak":"miau","$S":"to_a","$a2":"index","$n":"method_missing","$X":"join","$ab":"test_proc","$aT":"each_with_index","$A":"tap","$aC":"last","$m":"instance_of?","$a_":"match","$a6":"gsub","$u":"puts","$aW":"to_ary"};
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
_e=_f=nil;
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

}});a$e($b);$c = a$d({a$i: [],a$e: nil,a$c: "T_TestYield"});$j = a$d({a$i: [],a$e: nil,a$c: "Kernel",a$h: {$p:
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
_f=self.$j(nil,$h,("undefined method `" + (_a).$o() + ("' for ").$o() + (self.$i()).$o()));
return _f}catch(_g){if(_g instanceof a$c && (!_g.a$b || _g.a$b==3))return _g.a$a;
throw(_g)}}

,$j:
/* Kernel#raise */
function(){var self,_a,_b,_c,_d;
_c=_d=nil;
self=this;
_a=[];
for(_b=1;_b<arguments.length;_b++)_a.push(arguments[_b]);
;
_c=((_b=_a.$l(),_b!==false&&_b!==nil)?$d.$a(nil,""):(_d=_a.$k(),((_b=_d.$h(nil,$b),_b!==false&&_b!==nil)?_d.$d(nil,'$a',a$b(_a)):((_b=_d.$m(nil,$g),_b!==false&&_b!==nil)?((_b=_a.$l(),_b!==false&&_b!==nil)?_d:$a.$a(nil,"to many arguments given to raise")):((_b=_d.$m(nil,$f),_b!==false&&_b!==nil)?((_b=_a.$l(),_b!==false&&_b!==nil)?$d.$a(nil,_d):$a.$a(nil,"to many arguments given to raise")):$e.$a(nil,"exception class/object expected"))))));
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
_c=$i.$a(_b);
return _c}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==6))return _d.a$a;
throw(_d)}}

,$r:
/* Kernel#respond_to? */
function(_b,_a){var self;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;

    var m = a$f[_a]; 
    return (m !== undefined && self[m] !== undefined && !self[m].a$j)}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==5))return _c.a$a;
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
STDOUT.push(_a)}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==9))return _c.a$a;
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

}});$k = a$d({a$i: [$j],a$e: nil,a$c: "Object",a$h: {$h:
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

,$f:
/* Object#=== */
function(_d,_a){var self,_b,_c;
_c=nil;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
_c=(_b=self.$g(nil,_a), (_b!==false&&_b!==nil) ? _b : (self.$h(nil,_a)));
return _c}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==15))return _e.a$a;
throw(_e)}}

,$m:
/* Object#instance_of? */
function(_b,_a){var self;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
return (self.a$g === _a)}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==16))return _c.a$a;
throw(_c)}}

,$i:
/* Object#inspect */
function(){var self;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
return self.toString()}

}});$l = a$d({a$i: [],a$e: $k,a$c: "T_TestLebewesen::Lebewesen",a$h: {$c:
/* T_TestLebewesen::Lebewesen#initialize */
function(_c,_a){var self,_b;
_b=nil;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
_b=self.$C=_a;
return _b}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==17))return _d.a$a;
throw(_d)}}

}});$m = a$d({a$i: [],a$e: $l,a$c: "T_TestLebewesen::Hund",a$h: {$D:
/* T_TestLebewesen::Hund#wau */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$u(nil,"wau wau");
return _a}

,$E:
/* T_TestLebewesen::Hund#jage */
function(_c,_a){var self,_b;
_b=nil;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
_b=self.$u(nil,"ich jage ".$F(nil,_a.$e()));
return _b}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==18))return _d.a$a;
throw(_d)}}

}});$n = a$d({a$i: [],a$e: nil,a$c: "T_TestSimpleOutput"});$o = a$d({a$i: [],a$e: $k,a$f: {$I:
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
if((_a=(_b=(5).$H(nil,6), (_b!==false&&_b!==nil) ? ((6).$H(nil,7)) : _b),_a!==false&&_a!==nil)){self.$u(nil,"OK")};
self.$t(nil,(_a=false, (_a!==false&&_a!==nil) ? _a : ("a")));
self.$t(nil,(_a=nil, (_a!==false&&_a!==nil) ? _a : ("a")));
self.$t(nil,(_a=true, (_a!==false&&_a!==nil) ? _a : ("a")));
self.$t(nil,(_a="b", (_a!==false&&_a!==nil) ? _a : ("a")));
self.$t(nil,(_a=false, (_a!==false&&_a!==nil) ? ("a") : _a));
self.$t(nil,(_a=nil, (_a!==false&&_a!==nil) ? ("a") : _a));
self.$t(nil,(_a=true, (_a!==false&&_a!==nil) ? ("a") : _a));
_f=self.$t(nil,(_a="b", (_a!==false&&_a!==nil) ? ("a") : _a));
return _f}

}});$r = a$d({a$i: [],a$e: $k,a$f: {$I:
/* T_TestMassign::TestMassign.main */
function(){var self,_a,_b,_c,_d,_e,_f;
_a=_b=_c=_d=_e=_f=nil;
self=this;
if(self.$J==null)self.$J=nil;
if(self.$K==null)self.$K=nil;
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
(_a=[1,2,3],self.$J=_a[0]==null?nil:_a[0],_c=_a[1]==null?nil:_a[1],self.$K=_a[2]==null?nil:_a[2],_a);
self.$t(nil,self.$J);
self.$t(nil,_c);
self.$t(nil,self.$K);
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
self.$t(nil,(typeof($p)=='undefined'?nil:$p));
self.$t(nil,(typeof($q)=='undefined'?nil:$q));
(_a=[1,2],$p=_a[0]==null?nil:_a[0],$q=_a[1]==null?nil:_a[1],_a);
self.$t(nil,(typeof($p)=='undefined'?nil:$p));
self.$t(nil,(typeof($q)=='undefined'?nil:$q));
_f=self.$u(nil,"--");
return _f}

},a$c: "T_TestMassign::TestMassign"});$g = a$d({a$i: [],a$e: $k,a$c: "Exception",a$h: {$L:
/* Exception#message */
function(){var self,_a;
_a=nil;
self=this;
if(self.$M==null)self.$M=nil;
_a=self.$M;
return _a}

,$o:
/* Exception#to_s */
function(){var self,_a;
_a=nil;
self=this;
if(self.$M==null)self.$M=nil;
_a=self.$M;
return _a}

,$c:
/* Exception#initialize */
function(_d,_a){var self,_c,_b;
_b=nil;
self=this;
try{if(arguments.length>2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
if(_a==null)_a=nil;
;
if((_c=_a.$q(),_c!==false&&_c!==nil)){_b=self.$M=self.$z().$e()}else{_b=self.$M=_a};
return _b}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==19))return _e.a$a;
throw(_e)}}

,$i:
/* Exception#inspect */
function(){var self,_a;
_a=nil;
self=this;
if(self.$M==null)self.$M=nil;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=("#<" + (self.$z().$e()).$o() + (": ").$o() + (self.$M).$o() + (">").$o());
return _a}

}});$s = a$d({a$i: [],a$e: $g,a$c: "StandardError"});$t = a$d({a$i: [],a$e: $s,a$c: "NameError"});$h = a$d({a$i: [],a$e: $t,a$c: "NoMethodError"});$u = a$d({a$i: [],a$e: nil,a$c: "T_TestHash"});$v = a$d({a$i: [],a$e: nil,a$c: "Enumerable",a$h: {$N:
/* Enumerable#collect */
function(_a){var self,_b,_c,_f,_h;
_c=_h=nil;
self=this;
_b=_a==null?nil:_a;
try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_c=[];
self.$v(function(_d){var _e;
var _g=nil;
_e=_d==null?nil:_d;
_g=_c.$O(nil,((_f=_b,_f!==false&&_f!==nil)?_b.$P(nil,_e):_e));
return _g});
_h=_c;
return _h}catch(_i){if(_i instanceof a$c && (!_i.a$b || _i.a$b==20))return _i.a$a;
throw(_i)}}

,$Q:
/* Enumerable#find_all */
function(_f){var self,_a,_e,_g;
_a=_g=nil;
self=this;
try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=[];
self.$v(function(_b){var _c;
var _d=nil;
_c=_b==null?nil:_b;
if((_e=_f(_c),_e!==false&&_e!==nil)){_d=_a.$O(nil,_c)}else{_d=nil};
return _d});
_g=_a;
return _g}catch(_h){if(_h instanceof a$c && (!_h.a$b || _h.a$b==21))return _h.a$a;
throw(_h)}}

,$R:
/* Enumerable#map */
function(_a){var self,_b,_c,_f,_h;
_c=_h=nil;
self=this;
_b=_a==null?nil:_a;
try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_c=[];
self.$v(function(_d){var _e;
var _g=nil;
_e=_d==null?nil:_d;
_g=_c.$O(nil,((_f=_b,_f!==false&&_f!==nil)?_b.$P(nil,_e):_e));
return _g});
_h=_c;
return _h}catch(_i){if(_i instanceof a$c && (!_i.a$b || _i.a$b==22))return _i.a$a;
throw(_i)}}

,$S:
/* Enumerable#to_a */
function(){var self,_a,_e;
_a=_e=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=[];
self.$v(function(_b){var _c;
var _d=nil;
_c=_b==null?nil:_b;
_d=_a.$O(nil,_c);
return _d});
_e=_a;
return _e}

,$T:
/* Enumerable#reject */
function(_f){var self,_a,_e,_g;
_a=_g=nil;
self=this;
try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=[];
self.$v(function(_b){var _c;
var _d=nil;
_c=_b==null?nil:_b;
if((_e=_f(_c),_e===false||_e===nil)){_d=_a.$O(nil,_c)}else{_d=nil};
return _d});
_g=_a;
return _g}catch(_h){if(_h instanceof a$c && (!_h.a$b || _h.a$b==23))return _h.a$a;
throw(_h)}}

,$U:
/* Enumerable#select */
function(_f){var self,_a,_e,_g;
_a=_g=nil;
self=this;
try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=[];
self.$v(function(_b){var _c;
var _d=nil;
_c=_b==null?nil:_b;
if((_e=_f(_c),_e!==false&&_e!==nil)){_d=_a.$O(nil,_c)}else{_d=nil};
return _d});
_g=_a;
return _g}catch(_h){if(_h instanceof a$c && (!_h.a$b || _h.a$b==24))return _h.a$a;
throw(_h)}}

}});$w = a$d({a$i: [$v],a$e: $k,a$f: {$0:
/* Hash.new_from_key_value_list */
function(){var self,_a,_b,_c;
_c=nil;
self=this;
_a=[];
for(_b=1;_b<arguments.length;_b++)_a.push(arguments[_b]);
;
_c=self.$b();

    if (_a.length % 2 != 0) throw('ArgumentError');

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
      hashed_key = ":" + current_key.$B();
      current_val = _a[i+1];

      if (items[hashed_key] === undefined)
      {
        // 
        // create new bucket
        // a bucket stores all the elements with key collisions.
        //
        items[hashed_key] = [];
      }

      items[hashed_key].push(current_key, current_val);
    }

    _c.a$k = items; 
    _c.a$l = nil;
    return _c;
    }

,$1:
/* Hash.new_from_jsobject */
function(_d,_a){var self,_b,_c;
_b=_c=nil;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
_c=_b=self.$a();
return _c}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==28))return _e.a$a;
throw(_e)}}

},a$c: "Hash",a$h: {$W:
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

    if (bucket !== undefined)
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
    }catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==25))return _c.a$a;
throw(_c)}}

,$V:
/* Hash#keys */
function(){var self,_b,_f;
_b=_f=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_f=self.$R(function(_a){var _c,_d;
var _e=nil;
(_b=a$j(_a),_c=_b[0]==null?nil:_b[0],_d=_b[1]==null?nil:_b[1],_b);
_e=_c;
return _e});
return _f}

,$o:
/* Hash#to_s */
function(){var self,_a,_c,_g;
_a=_c=_g=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=[];
self.$v(function(_b){var _d,_e;
var _f=nil;
(_c=a$j(_b),_d=_c[0]==null?nil:_c[0],_e=_c[1]==null?nil:_c[1],_c);
_a.$O(nil,_d);
_f=_a.$O(nil,_e);
return _f});
_g=_a.$X(nil,"");
return _g}

,$Y:
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

    if (bucket !== undefined)
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
    }catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==27))return _d.a$a;
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
      if (key[0] == ":")
      {
        bucket = self.a$k[key];
        for (i=0; i<bucket.length; i+=2)
        {;
_a([bucket[i],bucket[i+1]]);

        }
      }
    }
    return nil;
    }catch(_b){if(_b instanceof a$c && (!_b.a$b || _b.a$b==26))return _b.a$a;
throw(_b)}}

,$c:
/* Hash#initialize */
function(){var self;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;

    self.a$k = {}; 
    self.a$l = nil;}

,$Z:
/* Hash#values */
function(){var self,_b,_f;
_b=_f=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_f=self.$R(function(_a){var _c,_d;
var _e=nil;
(_b=a$j(_a),_c=_b[0]==null?nil:_b[0],_d=_b[1]==null?nil:_b[1],_b);
_e=_d;
return _e});
return _f}

,$i:
/* Hash#inspect */
function(){var self,_a,_c,_g;
_a=_c=_g=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a="{";
_a=_a.$F(nil,self.$R(function(_b){var _d,_e;
var _f=nil;
(_c=a$j(_b),_d=_c[0]==null?nil:_c[0],_e=_c[1]==null?nil:_c[1],_c);
_f=_d.$i().$F(nil," => ").$F(nil,_e.$i());
return _f}).$X(nil,", "));
_a=_a.$F(nil,"}");
_g=_a;
return _g}

}});$x = a$d({a$i: [],a$e: nil,a$c: "T_TestSend"});a$d({a$i: [],a$g: $b});$y = a$d({a$i: [],a$e: $k,a$f: {$I:
/* T_TestYield::TestYield.main */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$a().$G();
return _a}

},a$c: "T_TestYield::TestYield",a$h: {$3:
/* T_TestYield::TestYield#test_loop2 */
function(){var self,_a,_b,_d,_f;
_a=_b=_f=nil;
self=this;
try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
self.$u(nil,"loop2");
_a=0;
_b=self.$7(function(){var _e=nil;
;
_a=_a.$F(nil,1);
if((_d=_a.$4(nil,2).$5(nil,1),_d!==false&&_d!==nil)){return nil};
self.$t(nil,_a);
if((_d=_a.$6(nil,8),_d!==false&&_d!==nil)){throw(new a$c(["out",_a],null))}else{_e=nil};
return _e});
self.$t(nil,_b);
_f=self.$u(nil,"--");
return _f}catch(_g){if(_g instanceof a$c && (!_g.a$b || _g.a$b==30))return _g.a$a;
throw(_g)}}

,$2:
/* T_TestYield::TestYield#three_times_block */
function(_a){var self,_b,_c;
_c=nil;
self=this;
_b=_a==null?nil:_a;
try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_b.$P(nil,1);
_b.$P(nil,2);
_c=_b.$P(nil,3);
return _c}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==29))return _d.a$a;
throw(_d)}}

,$_:
/* T_TestYield::TestYield#return_in_block */
function(_a){var self,_b,_c;
_c=nil;
self=this;
_b=_a==null?nil:_a;
try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
self.$t(nil,"return_in_block before");
_b.$P();
_c=self.$t(nil,"return_in_block after");
return _c}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==31))return _d.a$a;
throw(_d)}}

,$8:
/* T_TestYield::TestYield#test_while_loop */
function(){var self,_a,_b,_c;
_a=_c=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
self.$u(nil,"while-loop");
_a=0;
while(true){_a=_a.$F(nil,1);
if((_b=_a.$4(nil,2).$5(nil,1),_b!==false&&_b!==nil)){continue};
self.$t(nil,_a);
if((_b=_a.$6(nil,8),_b!==false&&_b!==nil)){break}};
self.$u(nil,"----");
while((_b=_a.$6(nil,0),_b!==false&&_b!==nil)){self.$t(nil,_a);
_a=_a.$9(nil,1)};
_c=self.$u(nil,"--");
return _c}

,$7:
/* T_TestYield::TestYield#loop2 */
function(_a){var self,_b,_c;
_c=nil;
self=this;
_b=_a==null?nil:_a;
try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
while(true){_b.$P()};
_c=self.$t(nil,"not reached");
return _c}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==33))return _d.a$a;
throw(_d)}}

,$ab:
/* T_TestYield::TestYield#test_proc */
function(){var self,_a,_d;
_a=_d=nil;
self=this;
try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
self.$t(nil,"test_proc");
_a=self.$s(function(){;
throw(new a$c(0,32))});
self.$t(nil,_a.$P());
_a=$i.$a(function(){;
throw(new a$c(3,null))});
_d=self.$t(nil,_a.$P());
return _d}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==32))return _e.a$a;
throw(_e)}}

,$$:
/* T_TestYield::TestYield#test_three_times_indirect */
function(){var self,_d;
_d=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
self.$u(nil,"three_times_indirect");
self.$aa(function(_a){var _b;
var _c=nil;
_b=_a==null?nil:_a;
_c=self.$t(nil,_b);
return _c});
_d=self.$u(nil,"--");
return _d}

,$ac:
/* T_TestYield::TestYield#test_three_times_yield2 */
function(){var self,_d,_e;
_e=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
self.$u(nil,"three_times_yield2");
_e=self.$ad(function(_a){var _b;
var _c=nil;
_b=_a==null?nil:_a;
if((_d=_b.$5(nil,1),_d!==false&&_d!==nil)){_c=_b}else{return _b.$F(nil,1)};
return _c});
return _e}

,$af:
/* T_TestYield::TestYield#test_loop */
function(){var self,_a,_b,_d,_f;
_a=_b=_f=nil;
self=this;
try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
self.$u(nil,"loop");
_a=0;
_b=self.$x(function(){var _e=nil;
;
_a=_a.$F(nil,1);
if((_d=_a.$4(nil,2).$5(nil,1),_d!==false&&_d!==nil)){return nil};
self.$t(nil,_a);
if((_d=_a.$6(nil,8),_d!==false&&_d!==nil)){throw(new a$c(["out",_a],null))}else{_e=nil};
return _e});
self.$t(nil,_b);
_f=self.$u(nil,"--");
return _f}catch(_g){if(_g instanceof a$c && (!_g.a$b || _g.a$b==34))return _g.a$a;
throw(_g)}}

,$ae:
/* T_TestYield::TestYield#test_three_times_block */
function(){var self,_d;
_d=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
self.$u(nil,"three_times_block");
self.$2(function(_a){var _b;
var _c=nil;
_b=_a==null?nil:_a;
_c=self.$t(nil,_b);
return _c});
_d=self.$u(nil,"--");
return _d}

,$G:
/* T_TestYield::TestYield#test */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
self.$ag();
self.$ae();
self.$$();
self.$ac();
self.$af();
self.$3();
self.$8();
self.$ab();
_a=self.$t(nil,self.$ah());
return _a}

,$x:
/* T_TestYield::TestYield#loop */
function(_a){var self,_b;
_b=nil;
self=this;
try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
while(true){_a()};
_b=self.$t(nil,"not reached");
return _b}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==37))return _c.a$a;
throw(_c)}}

,$aa:
/* T_TestYield::TestYield#three_times_indirect */
function(_a){var self,_b,_c;
_c=nil;
self=this;
_b=_a==null?nil:_a;
try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
self.$ai(_b);
_c=self.$2(_b);
return _c}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==36))return _d.a$a;
throw(_d)}}

,$ai:
/* T_TestYield::TestYield#three_times_yield */
function(_a){var self,_b;
_b=nil;
self=this;
try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a(1);
_a(2);
_b=_a(3);
return _b}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==35))return _c.a$a;
throw(_c)}}

,$ad:
/* T_TestYield::TestYield#three_times_yield2 */
function(_a){var self,_b;
_b=nil;
self=this;
try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
self.$t(nil,_a(1));
self.$t(nil,_a(2));
_b=self.$t(nil,_a(3));
return _b}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==38))return _c.a$a;
throw(_c)}}

,$ah:
/* T_TestYield::TestYield#test_return_in_block */
function(){var self,_b;
_b=nil;
self=this;
try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
self.$t(nil,"before");
self.$_(function(){;
throw(new a$c(4,39))});
_b=self.$t(nil,"after (NOT)");
return _b}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==39))return _c.a$a;
throw(_c)}}

,$ag:
/* T_TestYield::TestYield#test_three_times_yield */
function(){var self,_d;
_d=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
self.$u(nil,"three_times_yield");
self.$ai(function(_a){var _b;
var _c=nil;
_b=_a==null?nil:_a;
_c=self.$t(nil,_b);
return _c});
_d=self.$u(nil,"--");
return _d}

}});$z = a$d({a$i: [],a$e: $l,a$c: "T_TestLebewesen::Katze",a$h: {$e:
/* T_TestLebewesen::Katze#name */
function(){var self,_a;
_a=nil;
self=this;
if(self.$aj==null)self.$aj=nil;
_a=self.$aj;
return _a}

,$c:
/* T_TestLebewesen::Katze#initialize */
function(_d,_a,_b){var self,_c;
_c=nil;
self=this;
try{if(arguments.length!=3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));
;
a$k(self,'$c',nil,[_a]);
_c=self.$aj=_b;
return _c}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==40))return _e.a$a;
throw(_e)}}

,$ak:
/* T_TestLebewesen::Katze#miau */
function(){var self,_a;
_a=nil;
self=this;
if(self.$aj==null)self.$aj=nil;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$u(nil,"miau, ich bin ".$F(nil,self.$aj));
return _a}

}});$A = a$d({a$i: [],a$e: $k,a$c: "Number",a$d: Number,a$h: {$F:
/* Number#+ */
function(_b,_a){var self;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
return self + _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==44))return _c.a$a;
throw(_c)}}

,$5:
/* Number#== */
function(_b,_a){var self;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
return self == _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==43))return _c.a$a;
throw(_c)}}

,$an:
/* Number#downto */
function(_d,_a){var self,_b,_c;
_b=nil;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
_b=self;
while((_c=_b.$ao(nil,_a),_c!==false&&_c!==nil)){_d(_b);
_b=_b.$9(nil,1)};
return self}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==42))return _e.a$a;
throw(_e)}}

,$al:
/* Number#upto */
function(_d,_a){var self,_b,_c;
_b=nil;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
_b=self;
while((_c=_b.$am(nil,_a),_c!==false&&_c!==nil)){_d(_b);
_b=_b.$F(nil,1)};
return self}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==41))return _e.a$a;
throw(_e)}}

,$am:
/* Number#<= */
function(_b,_a){var self;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
return self <= _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==45))return _c.a$a;
throw(_c)}}

,$9:
/* Number#- */
function(_b,_a){var self;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
return self - _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==46))return _c.a$a;
throw(_c)}}

,$ap:
/* Number#succ */
function(){var self;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
return self+1}

,$aq:
/* Number#/ */
function(_b,_a){var self;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
return self / _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==48))return _c.a$a;
throw(_c)}}

,$o:
/* Number#to_s */
function(_b,_a){var self;
self=this;
try{if(arguments.length>2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
if(_a==null)_a=10;
;
return self.toString(_a)}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==47))return _c.a$a;
throw(_c)}}

,$4:
/* Number#% */
function(_b,_a){var self;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
return self % _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==49))return _c.a$a;
throw(_c)}}

,$at:
/* Number#& */
function(_b,_a){var self;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
return self & _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==53))return _c.a$a;
throw(_c)}}

,$H:
/* Number#< */
function(_b,_a){var self;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
return self < _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==52))return _c.a$a;
throw(_c)}}

,$as:
/* Number#times */
function(_c){var self,_a,_b;
_a=nil;
self=this;
try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=0;
while((_b=_a.$H(nil,self),_b!==false&&_b!==nil)){_c(_a);
_a=_a.$F(nil,1)};
return self}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==51))return _d.a$a;
throw(_d)}}

,$ar:
/* Number#| */
function(_b,_a){var self;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
return self | _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==50))return _c.a$a;
throw(_c)}}

,$aw:
/* Number#-@ */
function(){var self;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
return -self}

,$6:
/* Number#> */
function(_b,_a){var self;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
return self > _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==55))return _c.a$a;
throw(_c)}}

,$av:
/* Number#^ */
function(_b,_a){var self;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
return self ^ _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==54))return _c.a$a;
throw(_c)}}

,$au:
/* Number#~ */
function(){var self;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
return ~self}

,$ao:
/* Number#>= */
function(_b,_a){var self;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
return self >= _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==56))return _c.a$a;
throw(_c)}}

,$i:
/* Number#inspect */
function(){var self;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
return self.toString()}

,$ay:
/* Number#* */
function(_b,_a){var self;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
return self * _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==57))return _c.a$a;
throw(_c)}}

,$ax:
/* Number#+@ */
function(){var self;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
return self}

}});$B = a$d({a$i: [],a$e: $A,a$c: "Bignum",a$d: Number});$C = a$d({a$i: [],a$e: $s,a$c: "LocalJumpError"});$D = a$d({a$i: [],a$e: nil,a$c: "T_TestString"});$E = a$d({a$i: [],a$e: $k,a$c: "Range",a$h: {$5:
/* Range#== */
function(_e,_a){var self,_b,_c,_d;
_d=nil;
self=this;
if(self.$aB==null)self.$aB=nil;
if(self.$aD==null)self.$aD=nil;
if(self.$az==null)self.$az=nil;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
if (self.constructor != _a.constructor) return false;;
_d=(_b=self.$az.$5(nil,_a.$aA()), (_b!==false&&_b!==nil) ? ((_c=self.$aB.$5(nil,_a.$aC()), (_c!==false&&_c!==nil) ? (self.$aD.$5(nil,_a.$aE())) : _c)) : _b);
return _d}catch(_f){if(_f instanceof a$c && (!_f.a$b || _f.a$b==58))return _f.a$a;
throw(_f)}}

,$aF:
/* Range#begin */
function(){var self,_a;
_a=nil;
self=this;
if(self.$az==null)self.$az=nil;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$az;
return _a}

,$g:
/* Range#eql? */
function(_e,_a){var self,_b,_c,_d;
_d=nil;
self=this;
if(self.$aB==null)self.$aB=nil;
if(self.$aD==null)self.$aD=nil;
if(self.$az==null)self.$az=nil;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
if (self.constructor != _a.constructor) return false;;
_d=(_b=self.$az.$g(nil,_a.$aA()), (_b!==false&&_b!==nil) ? ((_c=self.$aB.$g(nil,_a.$aC()), (_c!==false&&_c!==nil) ? (self.$aD.$5(nil,_a.$aE())) : _c)) : _b);
return _d}catch(_f){if(_f instanceof a$c && (!_f.a$b || _f.a$b==59))return _f.a$a;
throw(_f)}}

,$aE:
/* Range#exclude_end? */
function(){var self,_a;
_a=nil;
self=this;
if(self.$aD==null)self.$aD=nil;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$aD;
return _a}

,$aC:
/* Range#last */
function(){var self,_a;
_a=nil;
self=this;
if(self.$aB==null)self.$aB=nil;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$aB;
return _a}

,$o:
/* Range#to_s */
function(){var self,_b,_a;
_a=nil;
self=this;
if(self.$aB==null)self.$aB=nil;
if(self.$aD==null)self.$aD=nil;
if(self.$az==null)self.$az=nil;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
if((_b=self.$aD,_b!==false&&_b!==nil)){_a=("" + (self.$az).$o() + ("...").$o() + (self.$aB).$o())}else{_a=("" + (self.$az).$o() + ("..").$o() + (self.$aB).$o())};
return _a}

,$v:
/* Range#each */
function(_c){var self,_a,_b,_d;
_a=_d=nil;
self=this;
if(self.$aB==null)self.$aB=nil;
if(self.$aD==null)self.$aD=nil;
if(self.$az==null)self.$az=nil;
try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$az;
if((_b=self.$az.$6(nil,self.$aB),_b!==false&&_b!==nil)){return nil};
if((_b=self.$aD,_b!==false&&_b!==nil)){while((_b=_a.$H(nil,self.$aB),_b!==false&&_b!==nil)){_c(_a);
_a=_a.$ap()};
_d=nil;
}else{while((_b=_a.$am(nil,self.$aB),_b!==false&&_b!==nil)){_c(_a);
_a=_a.$ap()};
_d=nil;
};
return _d}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==62))return _e.a$a;
throw(_e)}}

,$aH:
/* Range#end */
function(){var self,_a;
_a=nil;
self=this;
if(self.$aB==null)self.$aB=nil;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$aB;
return _a}

,$aA:
/* Range#first */
function(){var self,_a;
_a=nil;
self=this;
if(self.$az==null)self.$az=nil;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$az;
return _a}

,$aG:
/* Range#include? */
function(_d,_a){var self,_b,_c;
_c=nil;
self=this;
if(self.$aB==null)self.$aB=nil;
if(self.$aD==null)self.$aD=nil;
if(self.$az==null)self.$az=nil;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
if((_b=_a.$H(nil,self.$az),_b!==false&&_b!==nil)){return false};
if((_b=self.$aD,_b!==false&&_b!==nil)){_c=_a.$H(nil,self.$aB)}else{_c=_a.$am(nil,self.$aB)};
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
(_d=[_a,_b],self.$az=_d[0]==null?nil:_d[0],self.$aB=_d[1]==null?nil:_d[1],_d);
_e=self.$aD=((_d=_c,_d!==false&&_d!==nil)?true:false);
return _e}catch(_g){if(_g instanceof a$c && (!_g.a$b || _g.a$b==60))return _g.a$a;
throw(_g)}}

,$f:
/* Range#=== */
function(_d,_a){var self,_b,_c;
_c=nil;
self=this;
if(self.$aB==null)self.$aB=nil;
if(self.$aD==null)self.$aD=nil;
if(self.$az==null)self.$az=nil;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
if((_b=_a.$H(nil,self.$az),_b!==false&&_b!==nil)){return false};
if((_b=self.$aD,_b!==false&&_b!==nil)){_c=_a.$H(nil,self.$aB)}else{_c=_a.$am(nil,self.$aB)};
return _c}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==63))return _e.a$a;
throw(_e)}}

,$S:
/* Range#to_a */
function(){var self,_a,_b,_c;
_a=_c=nil;
self=this;
if(self.$aB==null)self.$aB=nil;
if(self.$aD==null)self.$aD=nil;
if(self.$az==null)self.$az=nil;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=[];
if((_b=self.$az.$6(nil,self.$aB),_b!==false&&_b!==nil)){return _a};
_c=self.$az;
if((_b=self.$aD,_b!==false&&_b!==nil)){while((_b=_c.$H(nil,self.$aB),_b!==false&&_b!==nil)){_a.$O(nil,_c);
_c=_c.$ap()}}else{while((_b=_c.$am(nil,self.$aB),_b!==false&&_b!==nil)){_a.$O(nil,_c);
_c=_c.$ap()}};
return _a}

,$i:
/* Range#inspect */
function(){var self,_b,_a;
_a=nil;
self=this;
if(self.$aB==null)self.$aB=nil;
if(self.$aD==null)self.$aD=nil;
if(self.$az==null)self.$az=nil;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
if((_b=self.$aD,_b!==false&&_b!==nil)){_a=("" + (self.$az.$i()).$o() + ("...").$o() + (self.$aB.$i()).$o())}else{_a=("" + (self.$az.$i()).$o() + ("..").$o() + (self.$aB.$i()).$o())};
return _a}

,$aI:
/* Range#member? */
function(_d,_a){var self,_b,_c;
_c=nil;
self=this;
if(self.$aB==null)self.$aB=nil;
if(self.$aD==null)self.$aD=nil;
if(self.$az==null)self.$az=nil;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
if((_b=_a.$H(nil,self.$az),_b!==false&&_b!==nil)){return false};
if((_b=self.$aD,_b!==false&&_b!==nil)){_c=_a.$H(nil,self.$aB)}else{_c=_a.$am(nil,self.$aB)};
return _c}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==64))return _e.a$a;
throw(_e)}}

}});$F = a$d({a$i: [],a$e: $k,a$c: "NilClass",a$d: NilClass,a$h: {$aJ:
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

,$aK:
/* NilClass#to_i */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=0;
return _a}

,$S:
/* NilClass#to_a */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=[];
return _a}

,$aL:
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

}});$G = a$d({a$i: [],a$e: $k,a$f: {$I:
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
_a=_b=_c=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=$w.$0(nil,"a",6,"b",7,"1",1,1,2,"1,2","hello",[1,2],"good");
self.$t(nil,_a.$W(nil,"a"));
self.$t(nil,_a.$W(nil,"b"));
self.$t(nil,_a.$W(nil,"1"));
self.$t(nil,_a.$W(nil,1));
self.$t(nil,_a.$W(nil,"1,2"));
self.$t(nil,_a.$W(nil,[1,2]));
self.$u(nil,"test native JS hash");
_c=_b=self.$B();
return _c}

}});$J = a$d({a$i: [],a$e: $k,a$f: {$I:
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
_a=(1).$F(nil,1);
if((_b=(_c=(1).$f(nil,_a), (_c!==false&&_c!==nil) ? _c : ((3).$f(nil,_a))),_b!==false&&_b!==nil)){self.$u(nil,"NOT OKAY")}else{if((_b=(2).$f(nil,_a),_b!==false&&_b!==nil)){self.$u(nil,"OKAY")}else{self.$u(nil,"NOT OKAY")}};
self.$t(nil,$H.$f(nil,[]));
self.$t(nil,$d.$f(nil,$d.$a()));
_a=1;
if((_b=$I.$f(nil,_a),_b!==false&&_b!==nil)){self.$u(nil,"OK")}else{if((_b=(1).$f(nil,_a),_b!==false&&_b!==nil)){self.$u(nil,"OK")}};
_a=_d=4;
if((_b=$E.$a(nil,0,3,false).$f(nil,_a),_b!==false&&_b!==nil)){_d=self.$u(nil,"NOT OKAY")}else{if((_b=$E.$a(nil,1,4,true).$f(nil,_a),_b!==false&&_b!==nil)){_d=self.$u(nil,"NOT OKAY")}else{if((_b=$E.$a(nil,2,4,false).$f(nil,_a),_b!==false&&_b!==nil)){_d=self.$u(nil,"OKAY")}else{_d=nil}}};
return _d}

}});$K = a$d({a$i: [],a$e: nil,a$c: "T_TestException"});$L = a$d({a$i: [],a$e: nil,a$c: "T_TestExpr"});$M = a$d({a$i: [],a$e: $k,a$c: "T_TestSend::A",a$h: {$aM:
/* T_TestSend::A#a_method */
function(_d,_a,_b){var self,_c;
_c=nil;
self=this;
try{if(arguments.length!=3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));
;
_c=self.$t(nil,_a,_b);
return _c}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==65))return _e.a$a;
throw(_e)}}

}});$N = a$d({a$i: [],a$e: $k,a$c: "Boolean",a$d: Boolean,a$h: {$5:
/* Boolean#== */
function(_b,_a){var self;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
return (self == _a)}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==66))return _c.a$a;
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

}});$O = a$d({a$i: [],a$e: nil,a$c: "T_TestIf"});$R = a$d({a$i: [],a$e: $k,a$f: {$I:
/* T_TestSend::TestSend.main */
function(){var self,_b,_c;
_c=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
self.$u(nil,"send");
self.$t(nil,$M.$a().$w(nil,"a_method",1,2));
self.$t(nil,$P.$a().$w(nil,"a_method",1,2));
self.$u(nil,"respond_to?");
self.$t(nil,$M.$a().$r(nil,"a_method"));
self.$t(nil,$M.$a().$r(nil,"to_s"));
self.$t(nil,$M.$a().$r(nil,"inspect"));
self.$t(nil,$M.$a().$r(nil,"b_method"));
self.$t(nil,$M.$a().$r(nil,"c_method"));
self.$u(nil,"method_missing");
self.$t(nil,$Q.$a().$r(nil,"blah_blah"));
$Q.$a().$aN(nil,1,2,3);
try{$M.$a().$aN();
self.$u(nil,"FAILURE?")}catch(_a){if(_a instanceof a$c)throw(_a);
if((_b=$h.$f(nil,_a),_b!==false&&_b!==nil)){self.$u(nil,"catched!!!")}else{throw(_a)}};
try{_c=$M.$aO()}catch(_a){if(_a instanceof a$c)throw(_a);
if((_b=$h.$f(nil,_a),_b!==false&&_b!==nil)){_c=self.$t(nil,"goood")}else{throw(_a)}};
return _c}

},a$c: "T_TestSend::TestSend"});$H = a$d({a$i: [$v],a$e: $k,a$f: {$a:
/* Array.new */
function(){var self;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
return []}

},a$c: "Array",a$d: Array,a$h: {$F:
/* Array#+ */
function(_b,_a){var self;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
return self.concat(_a)}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==69))return _c.a$a;
throw(_c)}}

,$O:
/* Array#<< */
function(_b,_a){var self;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
self.push(_a); return self}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==68))return _c.a$a;
throw(_c)}}

,$aP:
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
    return del ? _a : nil}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==67))return _c.a$a;
throw(_c)}}

,$aQ:
/* Array#size */
function(){var self;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
return self.length}

,$W:
/* Array#[] */
function(_b,_a){var self;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
var v = self[_a]; return (v == null ? nil : v)}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==71))return _c.a$a;
throw(_c)}}

,$aS:
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
    }catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==70))return _c.a$a;
throw(_c)}}

,$aR:
/* Array#reverse */
function(){var self;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
return self.concat().reverse()}

,$aC:
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
_d=self.$R(function(_a){var _b;
var _c=nil;
_b=_a==null?nil:_a;
_c=_b.$o();
return _c}).$X();
return _d}

,$Y:
/* Array#[]= */
function(_c,_a,_b){var self;
self=this;
try{if(arguments.length!=3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));
;
return (self[_a] = _b)}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==74))return _d.a$a;
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
    return self}catch(_b){if(_b instanceof a$c && (!_b.a$b || _b.a$b==73))return _b.a$a;
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
    return self}catch(_b){if(_b instanceof a$c && (!_b.a$b || _b.a$b==72))return _b.a$a;
throw(_b)}}

,$aA:
/* Array#first */
function(){var self;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
var v = self[0]; return (v == null ? nil : v)}

,$aV:
/* Array#length */
function(){var self;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
return self.length}

,$aU:
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

,$S:
/* Array#to_a */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self;
return _a}

,$aX:
/* Array#push */
function(){var self,_a,_b;
self=this;
_a=[];
for(_b=1;_b<arguments.length;_b++)_a.push(arguments[_b]);
;
self.push.apply(self, _a); return self}

,$aW:
/* Array#to_ary */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self;
return _a}

,$a0:
/* Array#dup */
function(){var self;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
return self.concat()}

,$i:
/* Array#inspect */
function(){var self,_a,_e;
_a=_e=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a="[";
_a=_a.$F(nil,self.$R(function(_b){var _c;
var _d=nil;
_c=_b==null?nil:_b;
_d=_c.$i();
return _d}).$X(nil,", "));
_a=_a.$F(nil,"]");
_e=_a;
return _e}

,$aZ:
/* Array#reverse! */
function(){var self;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
self.reverse(); return self}

,$aY:
/* Array#unshift */
function(){var self,_a,_b;
self=this;
_a=[];
for(_b=1;_b<arguments.length;_b++)_a.push(arguments[_b]);
;
self.unshift.apply(self, _a); return self}

,$X:
/* Array#join */
function(_i,_a){var self,_b,_d,_h;
_b=_h=nil;
self=this;
try{if(arguments.length>2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
if(_a==null)_a="";
;
_b="";
self.$aT(function(_c){var _e,_f;
var _g=nil;
(_d=a$j(_c),_e=_d[0]==null?nil:_d[0],_f=_d[1]==null?nil:_d[1],_d);
_b=_b.$F(nil,_e.$o());
if((_d=_f.$5(nil,self.$aV().$9(nil,1)),_d===false||_d===nil)){_g=_b=_b.$F(nil,_a)}else{_g=nil};
return _g});
_h=_b;
return _h}catch(_j){if(_j instanceof a$c && (!_j.a$b || _j.a$b==75))return _j.a$a;
throw(_j)}}

}});$I = a$d({a$i: [],a$e: $A,a$c: "Fixnum",a$d: Number});$S = a$d({a$i: [],a$e: nil,a$c: "T_TestClass::X"});$T = a$d({a$i: [$S],a$e: $k,a$c: "T_TestClass::A"});$U = a$d({a$i: [],a$e: $T,a$c: "T_TestClass::B"});$V = a$d({a$i: [],a$e: $k,a$f: {$I:
/* T_TestSplat::TestSplat.main */
function(){var self,_a,_b;
_a=_b=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$a();
_a.$a1();
_a.$d(nil,'$a1',a$b([]));
_a.$a1(nil,1);
_a.$d(nil,'$a1',a$b([1]));
_a.$d(nil,'$a1',[1].concat(a$b([])));
_a.$a1(nil,1,2);
_a.$d(nil,'$a1',a$b([1,2]));
_a.$d(nil,'$a1',[1].concat(a$b([2])));
_b=_a.$d(nil,'$a1',[1].concat(a$b([1,2])));
return _b}

},a$c: "T_TestSplat::TestSplat",a$h: {$a1:
/* T_TestSplat::TestSplat#m */
function(){var self,_a,_b,_c;
_c=nil;
self=this;
_a=[];
for(_b=1;_b<arguments.length;_b++)_a.push(arguments[_b]);
;
_c=self.$t(nil,_a);
return _c}

}});$W = a$d({a$i: [],a$e: $k,a$f: {$I:
/* T_TestException::TestException.main */
function(){var self,_b,_c,_d;
_b=_d=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
self.$t(nil,"before block");
self.$t(nil,"in block");
self.$t(nil,"after block");
try{self.$t(nil,"block");
self.$t(nil,"else")}catch(_a){if(_a instanceof a$c)throw(_a);
if((_c=$s.$f(nil,_a),_c!==false&&_c!==nil)){self.$t(nil,"rescue")}else{if((_c=$g.$f(nil,_a),_c!==false&&_c!==nil)){_b=(typeof(_a)=='undefined'?nil:_a);
self.$t(nil,"another rescue");
self.$t(nil,_b)}else{throw(_a)}}};
self.$t(nil,$d.$a(nil,"test"));
self.$u(nil,"before begin");
try{try{self.$u(nil,"before raise");
self.$j(nil,$g,"blah");
self.$u(nil,"after raise")}catch(_a){if(_a instanceof a$c)throw(_a);
if((_c=$s.$f(nil,_a),_c!==false&&_c!==nil)){self.$u(nil,"noooo")}else{if((_c=$g.$f(nil,_a),_c!==false&&_c!==nil)){_b=(typeof(_a)=='undefined'?nil:_a);
self.$t(nil,_b);
self.$u(nil,"yes")}else{throw(_a)}}}}finally{self.$u(nil,"ensure")};
self.$u(nil,"after begin");
self.$u(nil,"--");
try{try{self.$u(nil,"abc");
self.$j(nil,"r")}catch(_a){if(_a instanceof a$c)throw(_a);
if((_c=$s.$f(nil,_a),_c!==false&&_c!==nil)){self.$t(nil,(typeof(_a)=='undefined'?nil:_a));
self.$u(nil,"b")}else{throw(_a)}}}finally{self.$u(nil,"e")};
try{_d=self.$t(nil,"hallo".$o(nil,2))}catch(_a){if(_a instanceof a$c)throw(_a);
if((_c=$a.$f(nil,_a),_c!==false&&_c!==nil)){_b=(typeof(_a)=='undefined'?nil:_a);
_d=self.$t(nil,_b)}else{throw(_a)}};
return _d}

},a$c: "T_TestException::TestException"});$X = a$d({a$i: [],a$e: nil,a$c: "T_TestEql"});$Y = a$d({a$i: [],a$e: $k,a$f: {$I:
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
_a=_c=nil;
self=this;
try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=(true?1:2);
self.$t(nil,_a);
(_b=_a=true, (_b!==false&&_b!==nil) ? _b : (a$l(new a$c(nil,null))));
_c=self.$t(nil,_a);
return _c}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==76))return _d.a$a;
throw(_d)}}

}});$d = a$d({a$i: [],a$e: $s,a$c: "RuntimeError"});$Z = a$d({a$i: [],a$e: $k,a$f: {$I:
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
_a=_i=nil;
self=this;
if(self.$a5==null)self.$a5=nil;
if(self.$J==null)self.$J=nil;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
self.$t(nil,"hello");
self.$t(nil,"hallo\b\t\n");
self.$t(nil,"hallo\\leute");
self.$t(nil,"\"super\"");
self.$t(nil,"hello".$a2(nil,"e"));
self.$t(nil,"hello".$a2(nil,"lo"));
self.$t(nil,"hello".$a2(nil,"a"));
self.$t(nil,"hello hello".$a2(nil,"ll"));
self.$t(nil,"hello hello".$a2(nil,"ll",3));
self.$t(nil,"hallo".$W(nil,0,1));
self.$t(nil,"hallo".$W(nil,0,2));
self.$t(nil,"hallo".$W(nil,0,5));
self.$t(nil,"10".$a3(nil,10,"0"));
self.$t(nil,"10".$a3(nil,1,"blah"));
self.$t(nil,"x".$a3(nil,4,"()"));
self.$t(nil,"10".$a4(nil,10,"0"));
self.$t(nil,"10".$a4(nil,1,"blah"));
self.$t(nil,"x".$a4(nil,4,"()"));
self.$t(nil,("abc " + ((1).$F(nil,2)).$o() + (" def").$o()));
self.$J="hallo".$i();
self.$a5=4.5;
self.$t(nil,("" + (self.$J).$o() + (",").$o() + (self.$a5).$o()));
_a="hallo".$a6(nil,"l","r");
self.$t(nil,_a);
_a="hallo".$a6(nil,/ll/,"rr");
self.$t(nil,_a);
_a="hallo".$a6(function(){var _c=nil;
;
_c="r";
return _c},/l/);
self.$t(nil,_a);
_a="hallo".$a6(function(){var _e=nil;
;
_e="blah blah";
return _e},/ll/);
self.$t(nil,_a);
_i="hallllllo".$a6(function(_f){var _g;
var _h=nil;
_g=_f==null?nil:_f;
_h=self.$t(nil,_g);
return _h},/(l)l/);
return _i}

}});$2 = a$d({a$i: [],a$e: $k,a$f: {$I:
/* T_TestClass::TestClass.main */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
self.$t(nil,$T.$a().$m(nil,$T));
self.$t(nil,$T.$a().$m(nil,$U));
self.$t(nil,$U.$a().$m(nil,$T));
self.$t(nil,$T.$a().$m(nil,$S));
self.$t(nil,$U.$a().$m(nil,$S));
self.$t(nil,$T.$a().$h(nil,$T));
self.$t(nil,$T.$a().$h(nil,$U));
self.$t(nil,$U.$a().$h(nil,$T));
self.$t(nil,$T.$a().$h(nil,$S));
self.$t(nil,$U.$a().$h(nil,$S));
self.$t(nil,$0.$a().$h(nil,$S));
self.$t(nil,$0.$a().$h(nil,$T));
self.$t(nil,$0.$a().$h(nil,$U));
self.$t(nil,$0.$a().$h(nil,$0));
self.$t(nil,$0.$a().$h(nil,$1));
self.$t(nil,$0.$a().$h(nil,$k));
self.$t(nil,$0.$a().$h(nil,$j));
self.$t(nil,$0.$a().$h(nil,$b));
self.$t(nil,"hallo".$z().$e());
self.$t(nil,nil.$z().$e());
self.$t(nil,nil.$m(nil,$F));
self.$t(nil,"hallo".$m(nil,$f));
self.$t(nil,"hallo".$z());
self.$t(nil,$T);
self.$t(nil,$U);
self.$t(nil,$0);
self.$t(nil,$1);
self.$t(nil,$S);
self.$t(nil,$S.$e());
self.$t(nil,$T.$e());
_a=self.$t(nil,$U.$e());
return _a}

},a$c: "T_TestClass::TestClass"});$3 = a$d({a$i: [],a$e: nil,a$c: "T_TestRange"});$4 = a$d({a$i: [],a$e: nil,a$c: "T_TestSplat"});$Q = a$d({a$i: [],a$e: $k,a$c: "T_TestSend::C",a$h: {$n:
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
return _f}catch(_g){if(_g instanceof a$c && (!_g.a$b || _g.a$b==77))return _g.a$a;
throw(_g)}}

}});$5 = a$d({a$i: [],a$e: $A,a$c: "Float",a$d: Number});$6 = a$d({a$i: [],a$e: nil,a$c: "T_TestCase"});$7 = a$d({a$i: [],a$e: nil,a$c: "T_TestArray"});$i = a$d({a$i: [],a$e: $k,a$f: {$a:
/* Proc.new */
function(_a){var self,_b,_c;
self=this;
_b=_a==null?nil:_a;
try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
if((_c=_b,_c===false||_c===nil)){self.$j(nil,$a,"tried to create Proc object without a block")};
return (function() {
      try {
        return _b.$P.apply(_b, arguments);
      } catch(e) 
      {
        if (e instanceof a$c) 
        {
          if (e.a$b == null)
          {;
self.$j(nil,$C,"break from proc-closure");
}
          return e.a$a;
        }
        else throw(e);
      }
    })}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==78))return _d.a$a;
throw(_d)}}

},a$c: "Proc",a$d: Function,a$h: {$P:
/* Proc#call */
function(){var self,_a,_b;
self=this;
_a=[];
for(_b=1;_b<arguments.length;_b++)_a.push(arguments[_b]);
;

    if (_a.length == 0) return self();
    else if (_a.length == 1) return self(_a[0]);
    else return self(_a);}

}});$8 = a$d({a$i: [],a$e: $k,a$f: {$I:
/* T_TestSimpleOutput::TestSimpleOutput.main */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$u(nil,"Hello World from RubyJS");
return _a}

},a$c: "T_TestSimpleOutput::TestSimpleOutput"});$1 = a$d({a$i: [],a$e: $k,a$c: "T_TestClass::D"});$9 = a$d({a$i: [],a$e: nil,a$c: "T_TestNew"});$f = a$d({a$i: [],a$e: $k,a$c: "String",a$d: String,a$h: {$F:
/* String#+ */
function(_b,_a){var self;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
return(self + _a)}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==80))return _c.a$a;
throw(_c)}}

,$a7:
/* String#sub */
function(_c,_a,_b){var self;
self=this;
try{if(arguments.length!=3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));
;
self.replace(pattern, replacement)}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==79))return _d.a$a;
throw(_d)}}

,$a3:
/* String#rjust */
function(_f,_a,_b){var self,_c,_d,_e;
_d=_e=nil;
self=this;
try{if(arguments.length<2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
if(arguments.length>3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));
if(_b==null)_b=" ";
;
if((_c=_b.$l(),_c!==false&&_c!==nil)){self.$j(nil,$a,"zero width padding")};
_d=_a.$9(nil,self.$aV());
if((_c=_d.$am(nil,0),_c!==false&&_c!==nil)){return self};
_e="";
while(_e.length < _d) _e += _b;;
return _e.$W(nil,0,_d).$F(nil,self)}catch(_g){if(_g instanceof a$c && (!_g.a$b || _g.a$b==81))return _g.a$a;
throw(_g)}}

,$aQ:
/* String#size */
function(){var self;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
return self.length}

,$W:
/* String#[] */
function(_d,_a,_b){var self,_c;
self=this;
try{if(arguments.length<2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
if(arguments.length>3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));
if(_b==null)_b=nil;
;
if((_c=_b.$q(),_c!==false&&_c!==nil)){return self.charAt(_a) || nil}else{if((_c=_b.$H(nil,0),_c!==false&&_c!==nil)){return nil};
return self.substring(_a, _a+_b)}}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==83))return _e.a$a;
throw(_e)}}

,$a4:
/* String#ljust */
function(_f,_a,_b){var self,_c,_d,_e;
_d=_e=nil;
self=this;
try{if(arguments.length<2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
if(arguments.length>3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));
if(_b==null)_b=" ";
;
if((_c=_b.$l(),_c!==false&&_c!==nil)){self.$j(nil,$a,"zero width padding")};
_d=_a.$9(nil,self.$aV());
if((_c=_d.$am(nil,0),_c!==false&&_c!==nil)){return self};
_e="";
while(_e.length < _d) _e += _b;;
return self.$F(nil,_e.$W(nil,0,_d))}catch(_g){if(_g instanceof a$c && (!_g.a$b || _g.a$b==82))return _g.a$a;
throw(_g)}}

,$a8:
/* String#split */
function(_b,_a){var self;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
return self.split(_a)}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==84))return _c.a$a;
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

,$aV:
/* String#length */
function(){var self;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
return self.length}

,$a9:
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

,$a6:
/* String#gsub */
function(_g,_a,_b){var self,_c,_d,_e,_f;
_d=_e=_f=nil;
self=this;
try{if(arguments.length<2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
if(arguments.length>3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));
if(_b==null)_b=nil;
;
(_c=["",self,nil],_d=_c[0]==null?nil:_c[0],_e=_c[1]==null?nil:_c[1],_f=_c[2]==null?nil:_c[2],_c);
while(_e.length > 0) {
      if (_f = _e.match(_a)) {
        _d += _e.slice(0, _f.index);;
if((_c=_b,_c!==false&&_c!==nil)){_d=_d.$F(nil,_b)}else{_d=_d.$F(nil,_g(_f.$aA()).$o())};
_e = _e.slice(_f.index + _f[0].length);
      } else {
        _d += _e; _e = '';
      }
    } return _d}catch(_h){if(_h instanceof a$c && (!_h.a$b || _h.a$b==86))return _h.a$a;
throw(_h)}}

,$a2:
/* String#index */
function(_c,_a,_b){var self;
self=this;
try{if(arguments.length<2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
if(arguments.length>3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));
if(_b==null)_b=0;
;

    var i = self.indexOf(_a, _b);
    return (i == -1) ? nil : i}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==85))return _d.a$a;
throw(_d)}}

,$i:
/* String#inspect */
function(){var self,_a,_b;
_a=_b=nil;
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
_b=self.$a6(function(_c){var _d,_e;
_d=_c==null?nil:_c;
_e=_a[_d];
return _e ? _e : 
        '\\u00' + ("0" + _d.charCodeAt().toString(16)).substring(0,2);},/[\x00-\x1f\\]/);
return ('"' + _b.replace(/"/g, '\\"') + '"');}

,$a_:
/* String#match */
function(_b,_a){var self;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;

    var i = self.match(_a);
    return (i === null) ? nil : i}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==87))return _c.a$a;
throw(_c)}}

}});$_ = a$d({a$i: [],a$e: $k,a$f: {$I:
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

},a$c: "T_TestEql::TestEql"});$$ = a$d({a$i: [],a$e: $k,a$f: {$I:
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
function(){var self,_a,_i,_j;
_a=_i=_j=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=$E.$a(nil,0,2);
self.$t(nil,_a.$aA());
self.$t(nil,_a.$aC());
self.$t(nil,_a);
self.$t(nil,$E.$a(nil,0,2,false).$o());
self.$t(nil,$E.$a(nil,0,2,true).$o());
$E.$a(nil,0,4,false).$v(function(_b){var _c;
var _d=nil;
_c=_b==null?nil:_b;
_d=self.$t(nil,_c);
return _d});
$E.$a(nil,0,4,true).$v(function(_e){var _c;
var _f=nil;
_c=_e==null?nil:_e;
_f=self.$t(nil,_c);
return _f});
$E.$a(nil,-1,-4,false).$v(function(_g){var _c;
var _h=nil;
_c=_g==null?nil:_g;
_h=self.$t(nil,_c);
return _h});
self.$t(nil,$E.$a(nil,0,4,false).$aG(nil,4));
self.$t(nil,$E.$a(nil,0,4,false).$aG(nil,5));
self.$t(nil,$E.$a(nil,0,4,true).$aG(nil,5));
self.$t(nil,$E.$a(nil,0,4,true).$aG(nil,4));
self.$t(nil,$E.$a(nil,0,4,true).$aG(nil,3));
self.$t(nil,$E.$a(nil,0,4,true).$aG(nil,0));
self.$t(nil,$E.$a(nil,0,4,true).$aG(nil,-1));
self.$t(nil,$E.$a(nil,-1,-5,false).$S());
self.$t(nil,$E.$a(nil,-5,-1,false).$S());
_i=$E.$a(nil,0,4);
self.$t(nil,_i.$aA());
self.$t(nil,_i.$aF());
self.$t(nil,_i.$aC());
self.$t(nil,_i.$aH());
self.$t(nil,_i.$aE());
_i=$E.$a(nil,1,5,true);
self.$t(nil,_i.$aA());
self.$t(nil,_i.$aF());
self.$t(nil,_i.$aC());
self.$t(nil,_i.$aH());
self.$t(nil,_i.$aE());
self.$t(nil,false.$5(nil,false));
self.$t(nil,false.$5(nil,true));
self.$t(nil,true.$5(nil,false));
self.$t(nil,true.$5(nil,true));
self.$t(nil,$E.$a(nil,0,2,false).$5(nil,$E.$a(nil,0,2,false)));
self.$t(nil,$E.$a(nil,0,2,false).$5(nil,$E.$a(nil,0,2)));
_j=self.$t(nil,$E.$a(nil,0,2,false).$5(nil,$E.$a(nil,0,2,true)));
return _j}

}});$0 = a$d({a$i: [],a$e: $U,a$c: "T_TestClass::C"});$e = a$d({a$i: [],a$e: $s,a$c: "TypeError"});$aa = a$d({a$i: [],a$e: nil,a$c: "T_TestArgs"});$ab = a$d({a$i: [],a$e: $k,a$f: {$I:
/* T_TestArray::TestArray.main */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$a().$G();
return _a}

},a$c: "T_TestArray::TestArray",a$h: {$a$:
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
_a=_b=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=["a","b","b","b","c"];
self.$t(nil,_a.$aP(nil,"b"));
self.$t(nil,_a);
self.$t(nil,_a.$aP(nil,"z"));
self.$u(nil,"test native JS array mapping");
_b=self.$t(nil,self.$a$());
return _b}

}});$P = a$d({a$i: [],a$e: $M,a$c: "T_TestSend::B",a$h: {$aM:
/* T_TestSend::B#a_method */
function(_d,_a,_b){var self;
self=this;
var _c=arguments;
try{if(arguments.length!=3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));
;
self.$t(nil,"in B");
a$m(self,'$aM',_c)}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==88))return _e.a$a;
throw(_e)}}

,$ba:
/* T_TestSend::B#c_method */
function(_c,_a){var self,_b;
_b=nil;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
_b=nil;
return _b}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==89))return _d.a$a;
throw(_d)}}

}});$af = a$d({a$i: [],a$e: $k,a$f: {$I:
/* TestSuite.main */
function(){var self,_c,_d,_b;
_c=_b=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
try{self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
self.$u(nil,"Test splat");
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
$V.$I();
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
self.$u(nil,"Test simple output");
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
$8.$I();
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
self.$u(nil,"Test new");
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
$ac.$I();
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
self.$u(nil,"Test massign");
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
$r.$I();
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
self.$u(nil,"Test send");
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
$R.$I();
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
self.$u(nil,"Test if");
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
$o.$I();
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
self.$u(nil,"Test hash");
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
$G.$I();
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
self.$u(nil,"Test exception");
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
$W.$I();
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
self.$u(nil,"Test eql");
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
$_.$I();
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
self.$u(nil,"Test args");
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
$ad.$I();
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
self.$u(nil,"Test yield");
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
$y.$I();
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
self.$u(nil,"Test string");
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
$Z.$I();
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
self.$u(nil,"Test array");
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
$ab.$I();
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
self.$u(nil,"Test lebewesen");
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
$ae.$I();
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
self.$u(nil,"Test class");
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
$2.$I();
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
self.$u(nil,"Test case");
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
$J.$I();
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
self.$u(nil,"Test expr");
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
$Y.$I();
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
self.$u(nil,"Test range");
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
_b=$$.$I()}catch(_a){if(_a instanceof a$c)throw(_a);
if((_d=$g.$f(nil,_a),_d!==false&&_d!==nil)){_c=(typeof(_a)=='undefined'?nil:_a);
self.$t(nil,"unhandled exception");
_b=self.$t(nil,_c)}else{throw(_a)}};
return _b}

},a$c: "TestSuite"});$ag = a$d({a$i: [],a$e: nil,a$c: "T_TestLebewesen"});$ae = a$d({a$i: [],a$e: $k,a$f: {$I:
/* T_TestLebewesen::TestLebewesen.main */
function(){var self,_a,_b,_c,_d;
_a=_b=_c=_d=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=$z.$a(nil,"AA-BB","Leni");
_b=$z.$a(nil,"AC-DC","Flocki");
_c=$m.$a(nil,"AA-ZZ");
_a.$ak();
_c.$D();
_d=_c.$E(nil,_a);
return _d}

},a$c: "T_TestLebewesen::TestLebewesen"});$ac = a$d({a$i: [],a$e: $k,a$f: {$I:
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

}});$a = a$d({a$i: [],a$e: $s,a$c: "ArgumentError"});$ah = a$d({a$i: [],a$e: nil,a$c: "T_TestMassign"});$ai = a$d({a$i: [],a$e: $k,a$c: "Regexp",a$d: RegExp});$ad = a$d({a$i: [],a$e: $k,a$f: {$I:
/* T_TestArgs::TestArgs.main */
function(){var self,_a,_b;
_a=_b=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$a();
_a.$a1(nil,0);
self.$u(nil,"--");
_a.$a1(nil,1,2);
self.$u(nil,"--");
_a.$a1(nil,1,2,9);
self.$u(nil,"--");
_a.$a1(nil,1,2,9,5);
self.$u(nil,"--");
_a.$a1(nil,1,2,9,5,6);
self.$u(nil,"--");
_b=_a.$a1(nil,1,2,9,5,6,7,8,9,10,11,12);
return _b}

},a$c: "T_TestArgs::TestArgs",a$h: {$a1:
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
return _f}catch(_h){if(_h instanceof a$c && (!_h.a$b || _h.a$b==90))return _h.a$a;
throw(_h)}}

}});$aj = a$d({a$i: [],a$e: nil,a$c: "T_TestClass"});      $b.a$e = $k;
var a$n = [$c,$j,$k,$l,$m,$n,$o,$r,$g,$s,$t,$h,$u,$v,$w,$x,$b,$y,$z,$A,$B,$C,$D,$E,$F,$G,$J,$K,$L,$M,$N,$O,$R,$H,$I,$S,$T,$U,$V,$W,$X,$Y,$d,$Z,$2,$3,$4,$Q,$5,$6,$7,$i,$8,$1,$9,$f,$_,$$,$0,$e,$aa,$ab,$P,$af,$ag,$ae,$ac,$a,$ah,$ai,$ad,$aj];
a$o(a$n);
for (var i=0; i<a$n.length; i++) a$p(a$n[i]);
function main() { return $af.$I.apply($af, arguments); }
var STDOUT = [];

function flush()
{
  document.getElementById('out').innerHTML = 
    STDOUT.join('\n').replace(/[&]/g, "&amp;").replace(/[<]/g, "&lt;").replace(/[>]/g, "&gt;").replace(/\n/g, "<br/>");
}

function start()
{
  main(); flush();
  compare();
}

function compare()
{
  var out = document.getElementById('out');
  var expected = document.getElementById('expected');
  if (out.innerHTML == expected.innerHTML)
  {
    out.style.background = "green";
  }
  else
  {
    out.style.background = "red";
  }
}
