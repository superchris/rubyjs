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
function a$k(x) { throw(x); }

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
  if (a==undefined) return [];
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
  while (r == c.a$d.prototype[m])
    c = c.a$e;
  return c.a$d.prototype[m].apply(o, [i].concat(a));
}

function a$l(o, m, a) 
{
  var r = o[m]; // method in current class
  var c = o.a$g.a$e;
  while (r == c.a$d.prototype[m])
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
    if (k == c) return true;

    // check included modules
    m = k.a$i;
    for (i=0; i<m.length; i++)
    {
      if (m[i] == c) return true;
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
  // the super class, a check for == undefined prevents this method 
  // from being overwritten.
  //
  for (i=0; i<c.a$i.length; i++)
  {
    for (k in c.a$i[i].a$d.prototype)
    {
      if (c.a$d.prototype[k]==undefined)
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
      if (c.a$d.prototype[k]==undefined)
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
      if (c[k]==undefined)
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
a$a.$H = function() { return this; };
//
// Generates a new method_missing function
// for the given symbol +sym+.
// 
var a$r = new Object; 
function a$s(sym)
{
  if (!a$r[sym])
  {
    var fn = function() {
      return a$t(this, arguments, sym);
    };
    fn.a$j = true;
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
  
  var m = obj.$w;

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
    if (c.a$d.prototype[i]==undefined)
    {
      c.a$d.prototype[i] = a$s(i);
    }
  }

  if (c.a$e != nil)
  {
    for (i in c.a$e)
    {
      if (c[i]==undefined)
      {
        c[i] = a$s(i);
      }
    }
  }
}
// method map
var a$h = ({"$ap":"test","$aq":"sub","$aS":"end","$m":"each","$bc":"new_from_jsobject","$M":"m","$F":"loop","$N":"to_f","$Z":"%","$a4":"member?","$j":"collect","$aD":"test_three_times_indirect","$3":"&","$aW":"new_from_key_value_list","$az":"test_loop2","$aM":"three_times_yield","$f":"===","$ay":"three_times_block","$W":"==","$aa":"reverse","$aE":"three_times_indirect","$T":"downto","$o":"map","$O":"to_i","$1":"times","$C":"p","$aQ":"include?","$ba":"keys","$B":"proc","$b":"allocate","$q":"reject","$aH":"three_times_yield2","$$":"size","$9":"*","$S":"+","$_":"delete","$bb":"values","$am":"unshift","$aC":"return_in_block","$Q":"upto","$ao":"dup","$ar":"rjust","$V":"-","$a$":"not_a_method","$z":"nil?","$a":"new","$aB":"test_while_loop","$Y":"/","$l":"call","$aO":"message","$al":"push","$G":"is_a?","$au":"split","$L":"main","$e":"name","$u":"empty?","$aZ":"jage","$P":"to_splat","$s":"raise","$aj":"length","$x":"to_s","$a6":"c_method","$U":">=","$ab":"clear","$bd":"array","$0":"|","$h":"kind_of?","$n":"find_all","$4":"~","$aA":"loop2","$ac":"[]","$av":"strip","$aG":"test_three_times_yield2","$7":"-@","$aL":"test_return_in_block","$ah":"[]=","$X":"succ","$J":"hash","$H":"class","$i":"inspect","$an":"reverse!","$5":"^","$aI":"test_three_times_block","$aK":"test_three_times_yield","$y":"__send","$g":"eql?","$ai":"pop","$K":"method","$2":"<","$aY":"wau","$af":"first","$aR":"begin","$k":"<<","$at":"ljust","$d":"__invoke","$6":">","$R":"<=","$a0":"a_method","$c":"initialize","$E":"send","$A":"respond_to?","$aJ":"test_loop","$t":"shift","$a_":"blah_blah","$aT":"exclude_end?","$8":"+@","$r":"select","$aX":"miau","$p":"to_a","$w":"method_missing","$aw":"index","$as":"=~","$ad":"join","$ag":"each_with_index","$aF":"test_proc","$I":"tap","$ae":"last","$v":"instance_of?","$ax":"gsub","$D":"puts","$ak":"to_ary"});
var a$g = new Object;
for (var i in a$h) a$g[a$h[i]] = i;
$b = a$d({a$e: nil,a$f: ({$a:
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

}),a$c: "Class",a$g: new a$a(a$a, nil, "Class", a$a),a$h: ({$e:
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

})});a$e($b);$c = a$d({a$i: [],a$e: nil,a$c: "Enumerable",a$h: ({$j:
/* Enumerable#collect */
function(_a){var self,_b,_c,_f,_h;
_h=nil;
self=this;
_b=_a==null?nil:_a;
try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_c=[];
self.$m(function(_d){var _e;
var _g=nil;
_e=_d==null?nil:_d;
_g=_c.$k(nil,((_f=_b,_f!==false&&_f!==nil)?_b.$l(nil,_e):_e));
return _g});
_h=_c;
return _h}catch(_i){if(_i instanceof a$c && (!_i.a$b || _i.a$b==3))return _i.a$a;
throw(_i)}}

,$n:
/* Enumerable#find_all */
function(_f){var self,_a,_e,_g;
_g=nil;
self=this;
try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=[];
self.$m(function(_b){var _c;
var _d=nil;
_c=_b==null?nil:_b;
if((_e=_f(_c),_e!==false&&_e!==nil)){_d=_a.$k(nil,_c)}else{_d=nil};
return _d});
_g=_a;
return _g}catch(_h){if(_h instanceof a$c && (!_h.a$b || _h.a$b==4))return _h.a$a;
throw(_h)}}

,$o:
/* Enumerable#map */
function(_a){var self,_b,_c,_f,_h;
_h=nil;
self=this;
_b=_a==null?nil:_a;
try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_c=[];
self.$m(function(_d){var _e;
var _g=nil;
_e=_d==null?nil:_d;
_g=_c.$k(nil,((_f=_b,_f!==false&&_f!==nil)?_b.$l(nil,_e):_e));
return _g});
_h=_c;
return _h}catch(_i){if(_i instanceof a$c && (!_i.a$b || _i.a$b==5))return _i.a$a;
throw(_i)}}

,$p:
/* Enumerable#to_a */
function(){var self,_a,_e;
_e=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=[];
self.$m(function(_b){var _c;
var _d=nil;
_c=_b==null?nil:_b;
_d=_a.$k(nil,_c);
return _d});
_e=_a;
return _e}

,$q:
/* Enumerable#reject */
function(_f){var self,_a,_e,_g;
_g=nil;
self=this;
try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=[];
self.$m(function(_b){var _c;
var _d=nil;
_c=_b==null?nil:_b;
if((_e=_f(_c),_e===false||_e===nil)){_d=_a.$k(nil,_c)}else{_d=nil};
return _d});
_g=_a;
return _g}catch(_h){if(_h instanceof a$c && (!_h.a$b || _h.a$b==6))return _h.a$a;
throw(_h)}}

,$r:
/* Enumerable#select */
function(_f){var self,_a,_e,_g;
_g=nil;
self=this;
try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=[];
self.$m(function(_b){var _c;
var _d=nil;
_c=_b==null?nil:_b;
if((_e=_f(_c),_e!==false&&_e!==nil)){_d=_a.$k(nil,_c)}else{_d=nil};
return _d});
_g=_a;
return _g}catch(_h){if(_h instanceof a$c && (!_h.a$b || _h.a$b==7))return _h.a$a;
throw(_h)}}

})});$j = a$d({a$i: [],a$e: nil,a$c: "Kernel",a$h: ({$y:
/* Kernel#__send */
function(_d,_a){var self,_b,_c,_e;
self=this;
_e=_d==null?nil:_d;
try{if(arguments.length<2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
_b=[];
for(_c=2;_c<arguments.length;_c++)_b.push(arguments[_c]);
;

    var m = self[a$g[_a]];
    if (m) 
      return m.apply(self, [_e].concat(_b));
    else
      return self.$w.apply(self, [_e].concat([_a]).concat(_b));}catch(_f){if(_f instanceof a$c && (!_f.a$b || _f.a$b==9))return _f.a$a;
throw(_f)}}

,$w:
/* Kernel#method_missing */
function(_d,_a){var self,_b,_c,_e,_f;
_f=nil;
self=this;
_e=_d==null?nil:_d;
try{if(arguments.length<2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
_b=[];
for(_c=2;_c<arguments.length;_c++)_b.push(arguments[_c]);
;
_f=self.$s(nil,$h,("undefined method `" + (_a).$x() + ("' for ").$x() + (self.$i()).$x()));
return _f}catch(_g){if(_g instanceof a$c && (!_g.a$b || _g.a$b==8))return _g.a$a;
throw(_g)}}

,$s:
/* Kernel#raise */
function(){var self,_a,_b,_c,_d;
self=this;
_a=[];
for(_b=1;_b<arguments.length;_b++)_a.push(arguments[_b]);
;
_c=((_b=_a.$u(),_b!==false&&_b!==nil)?$d.$a(nil,""):(_d=_a.$t(),((_b=_d.$h(nil,$b),_b!==false&&_b!==nil)?_d.$d(nil,'$a',a$b(_a)):((_b=_d.$v(nil,$g),_b!==false&&_b!==nil)?((_b=_a.$u(),_b!==false&&_b!==nil)?_d:$a.$a(nil,"to many arguments given to raise")):((_b=_d.$v(nil,$f),_b!==false&&_b!==nil)?((_b=_a.$u(),_b!==false&&_b!==nil)?$d.$a(nil,_d):$a.$a(nil,"to many arguments given to raise")):$e.$a(nil,"exception class/object expected"))))));
throw(_c)}

,$z:
/* Kernel#nil? */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=false;
return _a}

,$B:
/* Kernel#proc */
function(_a){var self,_b,_c;
_c=nil;
self=this;
_b=_a==null?nil:_a;
try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_c=$i.$a(_b);
return _c}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==11))return _d.a$a;
throw(_d)}}

,$A:
/* Kernel#respond_to? */
function(_b,_a){var self;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;

    var m = a$g[_a]; 
    return (m !== undefined && self[m] !== undefined && !self[m].a$j)}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==10))return _c.a$a;
throw(_c)}}

,$C:
/* Kernel#p */
function(){var self,_a,_b,_f;
_f=nil;
self=this;
_a=[];
for(_b=1;_b<arguments.length;_b++)_a.push(arguments[_b]);
;
_a.$m(function(_c){var _d;
var _e=nil;
_d=_c==null?nil:_c;
_e=self.$D(nil,_d.$i());
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
      return self.$w.apply(self, 
        [_d].concat([a$h[_a]]).concat(_b));}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==12))return _e.a$a;
throw(_e)}}

,$F:
/* Kernel#loop */
function(_a){var self,_b;
_b=nil;
self=this;
try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
while(true){_a()};
_b=nil;
;
return _b}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==15))return _c.a$a;
throw(_c)}}

,$D:
/* Kernel#puts */
function(_b,_a){var self;
self=this;
try{if(arguments.length>2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
if(_a==null)_a="";
;
_a=_a.$x();
STDOUT.push(_a)}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==14))return _c.a$a;
throw(_c)}}

,$E:
/* Kernel#send */
function(_d,_a){var self,_b,_c,_e;
self=this;
_e=_d==null?nil:_d;
try{if(arguments.length<2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
_b=[];
for(_c=2;_c<arguments.length;_c++)_b.push(arguments[_c]);
;

    var m = self[a$g[_a]];
    if (m) 
      return m.apply(self, [_e].concat(_b));
    else
      return self.$w.apply(self, [_e].concat([_a]).concat(_b));}catch(_f){if(_f instanceof a$c && (!_f.a$b || _f.a$b==13))return _f.a$a;
throw(_f)}}

})});$l = a$d({a$i: [$j],a$e: nil,a$c: "Object",a$h: ({$h:
/* Object#kind_of? */
function(_b,_a){var self;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
return a$i(self, _a)}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==16))return _c.a$a;
throw(_c)}}

,$G:
/* Object#is_a? */
function(_b,_a){var self;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
return a$i(self, _a)}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==17))return _c.a$a;
throw(_c)}}

,$H:
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
return (self.constructor == _a.constructor && self == _a)}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==18))return _c.a$a;
throw(_c)}}

,$J:
/* Object#hash */
function(){var self;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
return self.toString()}

,$I:
/* Object#tap */
function(_a){var self,_b;
_b=nil;
self=this;
try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a(self);
_b=self;
return _b}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==19))return _c.a$a;
throw(_c)}}

,$x:
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

,$K:
/* Object#method */
function(_c,_a){var self,_b;
_b=nil;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
_b=$k.$a(nil,self,_a);
return _b}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==20))return _d.a$a;
throw(_d)}}

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

,$v:
/* Object#instance_of? */
function(_b,_a){var self;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
return (self.a$g === _a)}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==22))return _c.a$a;
throw(_c)}}

,$i:
/* Object#inspect */
function(){var self;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
return self.toString()}

})});$G = a$d({a$i: [],a$e: $l,a$f: ({$L:
/* TestSuite.main */
function(){var self,_c,_d,_b;
_b=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
try{self.$D(nil,"~~~~~~~~~~~~~~~~~~~~");
self.$D(nil,"Test new");
self.$D(nil,"~~~~~~~~~~~~~~~~~~~~");
$m.$L();
self.$D(nil,"~~~~~~~~~~~~~~~~~~~~");
self.$D(nil,"Test array");
self.$D(nil,"~~~~~~~~~~~~~~~~~~~~");
$n.$L();
self.$D(nil,"~~~~~~~~~~~~~~~~~~~~");
self.$D(nil,"Test send");
self.$D(nil,"~~~~~~~~~~~~~~~~~~~~");
$o.$L();
self.$D(nil,"~~~~~~~~~~~~~~~~~~~~");
self.$D(nil,"Test eql");
self.$D(nil,"~~~~~~~~~~~~~~~~~~~~");
$p.$L();
self.$D(nil,"~~~~~~~~~~~~~~~~~~~~");
self.$D(nil,"Test range");
self.$D(nil,"~~~~~~~~~~~~~~~~~~~~");
$q.$L();
self.$D(nil,"~~~~~~~~~~~~~~~~~~~~");
self.$D(nil,"Test exception");
self.$D(nil,"~~~~~~~~~~~~~~~~~~~~");
$r.$L();
self.$D(nil,"~~~~~~~~~~~~~~~~~~~~");
self.$D(nil,"Test args");
self.$D(nil,"~~~~~~~~~~~~~~~~~~~~");
$s.$L();
self.$D(nil,"~~~~~~~~~~~~~~~~~~~~");
self.$D(nil,"Test regexp");
self.$D(nil,"~~~~~~~~~~~~~~~~~~~~");
$t.$L();
self.$D(nil,"~~~~~~~~~~~~~~~~~~~~");
self.$D(nil,"Test string");
self.$D(nil,"~~~~~~~~~~~~~~~~~~~~");
$u.$L();
self.$D(nil,"~~~~~~~~~~~~~~~~~~~~");
self.$D(nil,"Test case");
self.$D(nil,"~~~~~~~~~~~~~~~~~~~~");
$v.$L();
self.$D(nil,"~~~~~~~~~~~~~~~~~~~~");
self.$D(nil,"Test yield");
self.$D(nil,"~~~~~~~~~~~~~~~~~~~~");
$w.$L();
self.$D(nil,"~~~~~~~~~~~~~~~~~~~~");
self.$D(nil,"Test inspect");
self.$D(nil,"~~~~~~~~~~~~~~~~~~~~");
$x.$L();
self.$D(nil,"~~~~~~~~~~~~~~~~~~~~");
self.$D(nil,"Test if");
self.$D(nil,"~~~~~~~~~~~~~~~~~~~~");
$y.$L();
self.$D(nil,"~~~~~~~~~~~~~~~~~~~~");
self.$D(nil,"Test expr");
self.$D(nil,"~~~~~~~~~~~~~~~~~~~~");
$z.$L();
self.$D(nil,"~~~~~~~~~~~~~~~~~~~~");
self.$D(nil,"Test lebewesen");
self.$D(nil,"~~~~~~~~~~~~~~~~~~~~");
$A.$L();
self.$D(nil,"~~~~~~~~~~~~~~~~~~~~");
self.$D(nil,"Test class");
self.$D(nil,"~~~~~~~~~~~~~~~~~~~~");
$B.$L();
self.$D(nil,"~~~~~~~~~~~~~~~~~~~~");
self.$D(nil,"Test hash");
self.$D(nil,"~~~~~~~~~~~~~~~~~~~~");
$C.$L();
self.$D(nil,"~~~~~~~~~~~~~~~~~~~~");
self.$D(nil,"Test splat");
self.$D(nil,"~~~~~~~~~~~~~~~~~~~~");
$D.$L();
self.$D(nil,"~~~~~~~~~~~~~~~~~~~~");
self.$D(nil,"Test simple output");
self.$D(nil,"~~~~~~~~~~~~~~~~~~~~");
$E.$L();
self.$D(nil,"~~~~~~~~~~~~~~~~~~~~");
self.$D(nil,"Test massign");
self.$D(nil,"~~~~~~~~~~~~~~~~~~~~");
_b=$F.$L()}catch(_a){if(_a instanceof a$c)throw(_a);
if((_d=$g.$f(nil,_a),_d!==false&&_d!==nil)){_c=_a;
self.$C(nil,"unhandled exception");
_b=self.$C(nil,_c)}else{throw(_a)}};
return _b}

}),a$c: "TestSuite"});$D = a$d({a$i: [],a$e: $l,a$f: ({$L:
/* T_TestSplat::TestSplat.main */
function(){var self,_a,_b;
_b=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$a();
_a.$M();
_a.$d(nil,'$M',a$b([]));
_a.$M(nil,1);
_a.$d(nil,'$M',a$b([1]));
_a.$d(nil,'$M',[1].concat(a$b([])));
_a.$M(nil,1,2);
_a.$d(nil,'$M',a$b([1,2]));
_a.$d(nil,'$M',[1].concat(a$b([2])));
_b=_a.$d(nil,'$M',[1].concat(a$b([1,2])));
return _b}

}),a$c: "T_TestSplat::TestSplat",a$h: ({$M:
/* T_TestSplat::TestSplat#m */
function(){var self,_a,_b,_c;
_c=nil;
self=this;
_a=[];
for(_b=1;_b<arguments.length;_b++)_a.push(arguments[_b]);
;
_c=self.$C(nil,_a);
return _c}

})});$H = a$d({a$i: [],a$e: nil,a$c: "T_TestSend"});$I = a$d({a$i: [],a$e: $l,a$c: "NilClass",a$d: NilClass,a$h: ({$N:
/* NilClass#to_f */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=0.0;
return _a}

,$z:
/* NilClass#nil? */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=true;
return _a}

,$x:
/* NilClass#to_s */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a="";
return _a}

,$O:
/* NilClass#to_i */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=0;
return _a}

,$p:
/* NilClass#to_a */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=[];
return _a}

,$P:
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

})});$J = a$d({a$i: [],a$e: nil,a$c: "T_TestClass::X"});$K = a$d({a$i: [$J],a$e: $l,a$c: "T_TestClass::A"});$r = a$d({a$i: [],a$e: $l,a$f: ({$L:
/* T_TestException::TestException.main */
function(){var self,_b,_c,_d;
_d=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
self.$C(nil,"before block");
self.$C(nil,"in block");
self.$C(nil,"after block");
try{self.$C(nil,"block");
self.$C(nil,"else")}catch(_a){if(_a instanceof a$c)throw(_a);
if((_c=$L.$f(nil,_a),_c!==false&&_c!==nil)){self.$C(nil,"rescue")}else{if((_c=$g.$f(nil,_a),_c!==false&&_c!==nil)){_b=_a;
self.$C(nil,"another rescue");
self.$C(nil,_b)}else{throw(_a)}}};
self.$C(nil,$d.$a(nil,"test"));
self.$D(nil,"before begin");
try{try{self.$D(nil,"before raise");
self.$s(nil,$g,"blah");
self.$D(nil,"after raise")}catch(_a){if(_a instanceof a$c)throw(_a);
if((_c=$L.$f(nil,_a),_c!==false&&_c!==nil)){self.$D(nil,"noooo")}else{if((_c=$g.$f(nil,_a),_c!==false&&_c!==nil)){_b=_a;
self.$C(nil,_b);
self.$D(nil,"yes")}else{throw(_a)}}}}finally{self.$D(nil,"ensure")};
self.$D(nil,"after begin");
self.$D(nil,"--");
try{try{self.$D(nil,"abc");
self.$s(nil,"r")}catch(_a){if(_a instanceof a$c)throw(_a);
if((_c=$L.$f(nil,_a),_c!==false&&_c!==nil)){self.$C(nil,_a);
self.$D(nil,"b")}else{throw(_a)}}}finally{self.$D(nil,"e")};
try{_d=self.$C(nil,"hallo".$x(nil,2))}catch(_a){if(_a instanceof a$c)throw(_a);
if((_c=$a.$f(nil,_a),_c!==false&&_c!==nil)){_b=_a;
_d=self.$C(nil,_b)}else{throw(_a)}};
return _d}

}),a$c: "T_TestException::TestException"});$M = a$d({a$i: [],a$e: $l,a$c: "Number",a$d: Number,a$h: ({$S:
/* Number#+ */
function(_b,_a){var self;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
return self + _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==26))return _c.a$a;
throw(_c)}}

,$W:
/* Number#== */
function(_b,_a){var self;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
return self == _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==25))return _c.a$a;
throw(_c)}}

,$T:
/* Number#downto */
function(_d,_a){var self,_b,_c;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
_b=self;
while((_c=_b.$U(nil,_a),_c!==false&&_c!==nil)){_d(_b);
_b=_b.$V(nil,1)};
return self}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==24))return _e.a$a;
throw(_e)}}

,$Q:
/* Number#upto */
function(_d,_a){var self,_b,_c;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
_b=self;
while((_c=_b.$R(nil,_a),_c!==false&&_c!==nil)){_d(_b);
_b=_b.$S(nil,1)};
return self}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==23))return _e.a$a;
throw(_e)}}

,$R:
/* Number#<= */
function(_b,_a){var self;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
return self <= _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==27))return _c.a$a;
throw(_c)}}

,$V:
/* Number#- */
function(_b,_a){var self;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
return self - _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==28))return _c.a$a;
throw(_c)}}

,$X:
/* Number#succ */
function(){var self;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
return self+1}

,$Y:
/* Number#/ */
function(_b,_a){var self;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
return self / _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==30))return _c.a$a;
throw(_c)}}

,$x:
/* Number#to_s */
function(_b,_a){var self;
self=this;
try{if(arguments.length>2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
if(_a==null)_a=10;
;
return self.toString(_a)}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==29))return _c.a$a;
throw(_c)}}

,$Z:
/* Number#% */
function(_b,_a){var self;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
return self % _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==31))return _c.a$a;
throw(_c)}}

,$3:
/* Number#& */
function(_b,_a){var self;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
return self & _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==35))return _c.a$a;
throw(_c)}}

,$2:
/* Number#< */
function(_b,_a){var self;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
return self < _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==34))return _c.a$a;
throw(_c)}}

,$1:
/* Number#times */
function(_c){var self,_a,_b;
self=this;
try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=0;
while((_b=_a.$2(nil,self),_b!==false&&_b!==nil)){_c(_a);
_a=_a.$S(nil,1)};
return self}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==33))return _d.a$a;
throw(_d)}}

,$0:
/* Number#| */
function(_b,_a){var self;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
return self | _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==32))return _c.a$a;
throw(_c)}}

,$7:
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
return self > _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==37))return _c.a$a;
throw(_c)}}

,$5:
/* Number#^ */
function(_b,_a){var self;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
return self ^ _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==36))return _c.a$a;
throw(_c)}}

,$4:
/* Number#~ */
function(){var self;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
return ~self}

,$U:
/* Number#>= */
function(_b,_a){var self;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
return self >= _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==38))return _c.a$a;
throw(_c)}}

,$i:
/* Number#inspect */
function(){var self;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
return self.toString()}

,$9:
/* Number#* */
function(_b,_a){var self;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
return self * _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==39))return _c.a$a;
throw(_c)}}

,$8:
/* Number#+@ */
function(){var self;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
return self}

})});$N = a$d({a$i: [],a$e: $M,a$c: "Fixnum",a$d: Number});$O = a$d({a$i: [],a$e: $K,a$c: "T_TestClass::B"});$P = a$d({a$i: [],a$e: $O,a$c: "T_TestClass::C"});$Q = a$d({a$i: [],a$e: nil,a$c: "T_TestSimpleOutput"});$R = a$d({a$i: [$c],a$e: $l,a$f: ({$a:
/* Array.new */
function(){var self;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
return []}

}),a$c: "Array",a$d: Array,a$h: ({$S:
/* Array#+ */
function(_b,_a){var self;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
return self.concat(_a)}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==42))return _c.a$a;
throw(_c)}}

,$k:
/* Array#<< */
function(_b,_a){var self;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
self.push(_a); return self}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==41))return _c.a$a;
throw(_c)}}

,$_:
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
    return del ? _a : nil}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==40))return _c.a$a;
throw(_c)}}

,$$:
/* Array#size */
function(){var self;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
return self.length}

,$ac:
/* Array#[] */
function(_b,_a){var self;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
var v = self[_a]; return (v == null ? nil : v)}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==44))return _c.a$a;
throw(_c)}}

,$ab:
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
    }catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==43))return _c.a$a;
throw(_c)}}

,$aa:
/* Array#reverse */
function(){var self;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
return self.concat().reverse()}

,$ae:
/* Array#last */
function(){var self;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
var v = self[self.length - 1]; return (v == null ? nil : v)}

,$x:
/* Array#to_s */
function(){var self,_d;
_d=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_d=self.$o(function(_a){var _b;
var _c=nil;
_b=_a==null?nil:_a;
_c=_b.$x();
return _c}).$ad();
return _d}

,$ah:
/* Array#[]= */
function(_c,_a,_b){var self;
self=this;
try{if(arguments.length!=3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));
;
return (self[_a] = _b)}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==47))return _d.a$a;
throw(_d)}}

,$m:
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
    return self}catch(_b){if(_b instanceof a$c && (!_b.a$b || _b.a$b==46))return _b.a$a;
throw(_b)}}

,$ag:
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
    return self}catch(_b){if(_b instanceof a$c && (!_b.a$b || _b.a$b==45))return _b.a$a;
throw(_b)}}

,$af:
/* Array#first */
function(){var self;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
var v = self[0]; return (v == null ? nil : v)}

,$aj:
/* Array#length */
function(){var self;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
return self.length}

,$ai:
/* Array#pop */
function(){var self;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;

    var elem = self.pop();
    return (elem == null ? nil : elem)}

,$t:
/* Array#shift */
function(){var self;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;

    var elem = self.shift();
    return (elem == null ? nil : elem)}

,$u:
/* Array#empty? */
function(){var self;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
return (self.length == 0)}

,$p:
/* Array#to_a */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self;
return _a}

,$al:
/* Array#push */
function(){var self,_a,_b;
self=this;
_a=[];
for(_b=1;_b<arguments.length;_b++)_a.push(arguments[_b]);
;
self.push.apply(self, _a); return self}

,$ak:
/* Array#to_ary */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self;
return _a}

,$ao:
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
_a=_a.$S(nil,self.$o(function(_b){var _c;
var _d=nil;
_c=_b==null?nil:_b;
_d=_c.$i();
return _d}).$ad(nil,", "));
_a=_a.$S(nil,"]");
_e=_a;
return _e}

,$an:
/* Array#reverse! */
function(){var self;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
self.reverse(); return self}

,$am:
/* Array#unshift */
function(){var self,_a,_b;
self=this;
_a=[];
for(_b=1;_b<arguments.length;_b++)_a.push(arguments[_b]);
;
self.unshift.apply(self, _a); return self}

,$ad:
/* Array#join */
function(_i,_a){var self,_b,_d,_h;
_h=nil;
self=this;
try{if(arguments.length>2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
if(_a==null)_a="";
;
_b="";
self.$ag(function(_c){var _e,_f;
var _g=nil;
(_d=a$j(_c),_e=_d[0]==null?nil:_d[0],_f=_d[1]==null?nil:_d[1],_d);
_b=_b.$S(nil,_e.$x());
if((_d=_f.$W(nil,self.$aj().$V(nil,1)),_d===false||_d===nil)){_g=_b=_b.$S(nil,_a)}else{_g=nil};
return _g});
_h=_b;
return _h}catch(_j){if(_j instanceof a$c && (!_j.a$b || _j.a$b==48))return _j.a$a;
throw(_j)}}

})});$S = a$d({a$i: [],a$e: nil,a$c: "T_TestString"});$z = a$d({a$i: [],a$e: $l,a$f: ({$L:
/* T_TestExpr::TestExpr.main */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$a().$ap();
return _a}

}),a$c: "T_TestExpr::TestExpr",a$h: ({$ap:
/* T_TestExpr::TestExpr#test */
function(){var self,_a,_b,_c;
_c=nil;
self=this;
try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=(true?1:2);
self.$C(nil,_a);
(_b=_a=true, (_b!==false&&_b!==nil) ? _b : (a$k(new a$c(nil,null))));
_c=self.$C(nil,_a);
return _c}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==49))return _d.a$a;
throw(_d)}}

})});$f = a$d({a$i: [],a$e: $l,a$c: "String",a$d: String,a$h: ({$S:
/* String#+ */
function(_b,_a){var self;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
return(self + _a)}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==51))return _c.a$a;
throw(_c)}}

,$aq:
/* String#sub */
function(_c,_a,_b){var self;
self=this;
try{if(arguments.length!=3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));
;
self.replace(pattern, replacement)}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==50))return _d.a$a;
throw(_d)}}

,$as:
/* String#=~ */
function(_b,_a){var self;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;

    var i = self.search(_a);
    return (i == -1 ? nil : i)}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==53))return _c.a$a;
throw(_c)}}

,$ar:
/* String#rjust */
function(_f,_a,_b){var self,_c,_d,_e;
self=this;
try{if(arguments.length<2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
if(arguments.length>3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));
if(_b==null)_b=" ";
;
if((_c=_b.$u(),_c!==false&&_c!==nil)){self.$s(nil,$a,"zero width padding")};
_d=_a.$V(nil,self.$aj());
if((_c=_d.$R(nil,0),_c!==false&&_c!==nil)){return self};
_e="";
while(_e.length < _d) _e += _b;;
return _e.$ac(nil,0,_d).$S(nil,self)}catch(_g){if(_g instanceof a$c && (!_g.a$b || _g.a$b==52))return _g.a$a;
throw(_g)}}

,$$:
/* String#size */
function(){var self;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
return self.length}

,$ac:
/* String#[] */
function(_d,_a,_b){var self,_c;
self=this;
try{if(arguments.length<2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
if(arguments.length>3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));
if(_b==null)_b=nil;
;
if((_c=_b.$z(),_c!==false&&_c!==nil)){return self.charAt(_a) || nil}else{if((_c=_b.$2(nil,0),_c!==false&&_c!==nil)){return nil};
return self.substring(_a, _a+_b)}}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==55))return _e.a$a;
throw(_e)}}

,$at:
/* String#ljust */
function(_f,_a,_b){var self,_c,_d,_e;
self=this;
try{if(arguments.length<2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
if(arguments.length>3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));
if(_b==null)_b=" ";
;
if((_c=_b.$u(),_c!==false&&_c!==nil)){self.$s(nil,$a,"zero width padding")};
_d=_a.$V(nil,self.$aj());
if((_c=_d.$R(nil,0),_c!==false&&_c!==nil)){return self};
_e="";
while(_e.length < _d) _e += _b;;
return self.$S(nil,_e.$ac(nil,0,_d))}catch(_g){if(_g instanceof a$c && (!_g.a$b || _g.a$b==54))return _g.a$a;
throw(_g)}}

,$au:
/* String#split */
function(_b,_a){var self;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
return self.split(_a)}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==56))return _c.a$a;
throw(_c)}}

,$x:
/* String#to_s */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self;
return _a}

,$aj:
/* String#length */
function(){var self;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
return self.length}

,$av:
/* String#strip */
function(){var self;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
return self.replace(/^\s+/, '').replace(/\s+$/, '')}

,$u:
/* String#empty? */
function(){var self;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
return(self === "")}

,$ax:
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
if((_c=_b,_c!==false&&_c!==nil)){_d=_d.$S(nil,_b)}else{_d=_d.$S(nil,_g(_f.$af()).$x())};
_e = _e.slice(_f.index + _f[0].length);
      } else {
        _d += _e; _e = '';
      }
    } return _d}catch(_h){if(_h instanceof a$c && (!_h.a$b || _h.a$b==58))return _h.a$a;
throw(_h)}}

,$aw:
/* String#index */
function(_c,_a,_b){var self;
self=this;
try{if(arguments.length<2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
if(arguments.length>3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));
if(_b==null)_b=0;
;

    var i = self.indexOf(_a, _b);
    return (i == -1) ? nil : i}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==57))return _d.a$a;
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
_b=self.$ax(function(_c){var _d,_e;
_d=_c==null?nil:_c;
_e=_a[_d];
return _e ? _e : 
        '\\u00' + ("0" + _d.charCodeAt().toString(16)).substring(0,2);},/[\x00-\x1f\\]/);
return ('"' + _b.replace(/"/g, '\\"') + '"');}

})});$p = a$d({a$i: [],a$e: $l,a$f: ({$L:
/* T_TestEql::TestEql.main */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
self.$C(nil,"a".$g(nil,"a"));
self.$C(nil,"a".$g(nil,1));
self.$C(nil,"1".$g(nil,1));
self.$C(nil,[1,2].$g(nil,[1,2]));
_a=self.$C(nil,(1).$g(nil,"1"));
return _a}

}),a$c: "T_TestEql::TestEql"});$T = a$d({a$i: [],a$e: nil,a$c: "T_TestArgs"});$w = a$d({a$i: [],a$e: $l,a$f: ({$L:
/* T_TestYield::TestYield.main */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$a().$ap();
return _a}

}),a$c: "T_TestYield::TestYield",a$h: ({$az:
/* T_TestYield::TestYield#test_loop2 */
function(){var self,_a,_b,_d,_f;
_f=nil;
self=this;
try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
self.$D(nil,"loop2");
_a=0;
_b=self.$aA(function(){var _e=nil;
;
_a=_a.$S(nil,1);
if((_d=_a.$Z(nil,2).$W(nil,1),_d!==false&&_d!==nil)){return nil};
self.$C(nil,_a);
if((_d=_a.$6(nil,8),_d!==false&&_d!==nil)){throw(new a$c(["out",_a],null))}else{_e=nil};
return _e});
self.$C(nil,_b);
_f=self.$D(nil,"--");
return _f}catch(_g){if(_g instanceof a$c && (!_g.a$b || _g.a$b==60))return _g.a$a;
throw(_g)}}

,$ay:
/* T_TestYield::TestYield#three_times_block */
function(_a){var self,_b,_c;
_c=nil;
self=this;
_b=_a==null?nil:_a;
try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_b.$l(nil,1);
_b.$l(nil,2);
_c=_b.$l(nil,3);
return _c}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==59))return _d.a$a;
throw(_d)}}

,$aC:
/* T_TestYield::TestYield#return_in_block */
function(_a){var self,_b,_c;
_c=nil;
self=this;
_b=_a==null?nil:_a;
try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
self.$C(nil,"return_in_block before");
_b.$l();
_c=self.$C(nil,"return_in_block after");
return _c}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==61))return _d.a$a;
throw(_d)}}

,$aB:
/* T_TestYield::TestYield#test_while_loop */
function(){var self,_a,_b,_c;
_c=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
self.$D(nil,"while-loop");
_a=0;
while(true){_a=_a.$S(nil,1);
if((_b=_a.$Z(nil,2).$W(nil,1),_b!==false&&_b!==nil)){continue};
self.$C(nil,_a);
if((_b=_a.$6(nil,8),_b!==false&&_b!==nil)){break}};
self.$D(nil,"----");
while((_b=_a.$6(nil,0),_b!==false&&_b!==nil)){self.$C(nil,_a);
_a=_a.$V(nil,1)};
_c=self.$D(nil,"--");
return _c}

,$aA:
/* T_TestYield::TestYield#loop2 */
function(_a){var self,_b,_c;
_c=nil;
self=this;
_b=_a==null?nil:_a;
try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
while(true){_b.$l()};
_c=self.$C(nil,"not reached");
return _c}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==63))return _d.a$a;
throw(_d)}}

,$aF:
/* T_TestYield::TestYield#test_proc */
function(){var self,_a,_d;
_d=nil;
self=this;
try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
self.$C(nil,"test_proc");
_a=self.$B(function(){;
throw(new a$c(0,62))});
self.$C(nil,_a.$l());
_a=$i.$a(function(){;
throw(new a$c(3,null))});
_d=self.$C(nil,_a.$l());
return _d}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==62))return _e.a$a;
throw(_e)}}

,$aD:
/* T_TestYield::TestYield#test_three_times_indirect */
function(){var self,_d;
_d=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
self.$D(nil,"three_times_indirect");
self.$aE(function(_a){var _b;
var _c=nil;
_b=_a==null?nil:_a;
_c=self.$C(nil,_b);
return _c});
_d=self.$D(nil,"--");
return _d}

,$aG:
/* T_TestYield::TestYield#test_three_times_yield2 */
function(){var self,_d,_e;
_e=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
self.$D(nil,"three_times_yield2");
_e=self.$aH(function(_a){var _b;
var _c=nil;
_b=_a==null?nil:_a;
if((_d=_b.$W(nil,1),_d!==false&&_d!==nil)){_c=_b}else{return _b.$S(nil,1)};
return _c});
return _e}

,$aJ:
/* T_TestYield::TestYield#test_loop */
function(){var self,_a,_b,_d,_f;
_f=nil;
self=this;
try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
self.$D(nil,"loop");
_a=0;
_b=self.$F(function(){var _e=nil;
;
_a=_a.$S(nil,1);
if((_d=_a.$Z(nil,2).$W(nil,1),_d!==false&&_d!==nil)){return nil};
self.$C(nil,_a);
if((_d=_a.$6(nil,8),_d!==false&&_d!==nil)){throw(new a$c(["out",_a],null))}else{_e=nil};
return _e});
self.$C(nil,_b);
_f=self.$D(nil,"--");
return _f}catch(_g){if(_g instanceof a$c && (!_g.a$b || _g.a$b==64))return _g.a$a;
throw(_g)}}

,$aI:
/* T_TestYield::TestYield#test_three_times_block */
function(){var self,_d;
_d=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
self.$D(nil,"three_times_block");
self.$ay(function(_a){var _b;
var _c=nil;
_b=_a==null?nil:_a;
_c=self.$C(nil,_b);
return _c});
_d=self.$D(nil,"--");
return _d}

,$ap:
/* T_TestYield::TestYield#test */
function(){var self,_b,_c,_d;
_d=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
self.$aK();
self.$aI();
self.$aD();
self.$aG();
self.$aJ();
self.$az();
self.$aB();
try{self.$aF()}catch(_a){if(_a instanceof a$c)throw(_a);
if((_c=$U.$f(nil,_a),_c!==false&&_c!==nil)){_b=_a;
self.$C(nil,_b)}else{throw(_a)}};
_d=self.$C(nil,self.$aL());
return _d}

,$F:
/* T_TestYield::TestYield#loop */
function(_a){var self,_b;
_b=nil;
self=this;
try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
while(true){_a()};
_b=self.$C(nil,"not reached");
return _b}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==67))return _c.a$a;
throw(_c)}}

,$aE:
/* T_TestYield::TestYield#three_times_indirect */
function(_a){var self,_b,_c;
_c=nil;
self=this;
_b=_a==null?nil:_a;
try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
self.$aM(_b);
_c=self.$ay(_b);
return _c}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==66))return _d.a$a;
throw(_d)}}

,$aM:
/* T_TestYield::TestYield#three_times_yield */
function(_a){var self,_b;
_b=nil;
self=this;
try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a(1);
_a(2);
_b=_a(3);
return _b}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==65))return _c.a$a;
throw(_c)}}

,$aH:
/* T_TestYield::TestYield#three_times_yield2 */
function(_a){var self,_b;
_b=nil;
self=this;
try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
self.$C(nil,_a(1));
self.$C(nil,_a(2));
_b=self.$C(nil,_a(3));
return _b}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==68))return _c.a$a;
throw(_c)}}

,$aL:
/* T_TestYield::TestYield#test_return_in_block */
function(){var self,_b;
_b=nil;
self=this;
try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
self.$C(nil,"before");
self.$aC(function(){;
throw(new a$c(4,69))});
_b=self.$C(nil,"after (NOT)");
return _b}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==69))return _c.a$a;
throw(_c)}}

,$aK:
/* T_TestYield::TestYield#test_three_times_yield */
function(){var self,_d;
_d=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
self.$D(nil,"three_times_yield");
self.$aM(function(_a){var _b;
var _c=nil;
_b=_a==null?nil:_a;
_c=self.$C(nil,_b);
return _c});
_d=self.$D(nil,"--");
return _d}

})});$V = a$d({a$i: [],a$e: $l,a$c: "T_TestSend::C",a$h: ({$w:
/* T_TestSend::C#method_missing */
function(_d,_a){var self,_b,_c,_e,_f;
_f=nil;
self=this;
_e=_d==null?nil:_d;
try{if(arguments.length<2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
_b=[];
for(_c=2;_c<arguments.length;_c++)_b.push(arguments[_c]);
;
_f=self.$C(nil,("mm: " + (_a).$x() + (", ").$x() + (_b).$x()));
return _f}catch(_g){if(_g instanceof a$c && (!_g.a$b || _g.a$b==70))return _g.a$a;
throw(_g)}}

})});$W = a$d({a$i: [],a$e: $l,a$c: "T_TestLebewesen::Lebewesen",a$h: ({$c:
/* T_TestLebewesen::Lebewesen#initialize */
function(_c,_a){var self,_b;
_b=nil;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
_b=self.$aN=_a;
return _b}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==71))return _d.a$a;
throw(_d)}}

})});$X = a$d({a$i: [],a$e: nil,a$c: "T_TestRange"});$B = a$d({a$i: [],a$e: $l,a$f: ({$L:
/* T_TestClass::TestClass.main */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
self.$C(nil,$K.$a().$v(nil,$K));
self.$C(nil,$K.$a().$v(nil,$O));
self.$C(nil,$O.$a().$v(nil,$K));
self.$C(nil,$K.$a().$v(nil,$J));
self.$C(nil,$O.$a().$v(nil,$J));
self.$C(nil,$K.$a().$h(nil,$K));
self.$C(nil,$K.$a().$h(nil,$O));
self.$C(nil,$O.$a().$h(nil,$K));
self.$C(nil,$K.$a().$h(nil,$J));
self.$C(nil,$O.$a().$h(nil,$J));
self.$C(nil,$P.$a().$h(nil,$J));
self.$C(nil,$P.$a().$h(nil,$K));
self.$C(nil,$P.$a().$h(nil,$O));
self.$C(nil,$P.$a().$h(nil,$P));
self.$C(nil,$P.$a().$h(nil,$Y));
self.$C(nil,$P.$a().$h(nil,$l));
self.$C(nil,$P.$a().$h(nil,$j));
self.$C(nil,$P.$a().$h(nil,$b));
self.$C(nil,"hallo".$H().$e());
self.$C(nil,nil.$H().$e());
self.$C(nil,nil.$v(nil,$I));
self.$C(nil,"hallo".$v(nil,$f));
self.$C(nil,"hallo".$H());
self.$C(nil,$K);
self.$C(nil,$O);
self.$C(nil,$P);
self.$C(nil,$Y);
self.$C(nil,$J);
self.$C(nil,$J.$e());
self.$C(nil,$K.$e());
_a=self.$C(nil,$O.$e());
return _a}

}),a$c: "T_TestClass::TestClass"});$Z = a$d({a$i: [],a$e: nil,a$c: "T_TestInspect"});$g = a$d({a$i: [],a$e: $l,a$c: "Exception",a$h: ({$aO:
/* Exception#message */
function(){var self,_a;
_a=nil;
self=this;
if(self.$aP==null)self.$aP=nil;
_a=self.$aP;
return _a}

,$x:
/* Exception#to_s */
function(){var self,_a;
_a=nil;
self=this;
if(self.$aP==null)self.$aP=nil;
_a=self.$aP;
return _a}

,$c:
/* Exception#initialize */
function(_d,_a){var self,_c,_b;
_b=nil;
self=this;
try{if(arguments.length>2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
if(_a==null)_a=nil;
;
if((_c=_a.$z(),_c!==false&&_c!==nil)){_b=self.$aP=self.$H().$e()}else{_b=self.$aP=_a};
return _b}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==72))return _e.a$a;
throw(_e)}}

,$i:
/* Exception#inspect */
function(){var self,_a;
_a=nil;
self=this;
if(self.$aP==null)self.$aP=nil;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=("#<" + (self.$H().$e()).$x() + (": ").$x() + (self.$aP).$x() + (">").$x());
return _a}

})});$L = a$d({a$i: [],a$e: $g,a$c: "StandardError"});$a = a$d({a$i: [],a$e: $L,a$c: "ArgumentError"});$0 = a$d({a$i: [],a$e: nil,a$c: "T_TestLebewesen"});$q = a$d({a$i: [],a$e: $l,a$f: ({$L:
/* T_TestRange::TestRange.main */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$a().$ap();
return _a}

}),a$c: "T_TestRange::TestRange",a$h: ({$ap:
/* T_TestRange::TestRange#test */
function(){var self,_a,_i,_j;
_j=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=$1.$a(nil,0,2);
self.$C(nil,_a.$af());
self.$C(nil,_a.$ae());
self.$C(nil,_a);
self.$C(nil,$1.$a(nil,0,2,false).$x());
self.$C(nil,$1.$a(nil,0,2,true).$x());
$1.$a(nil,0,4,false).$m(function(_b){var _c;
var _d=nil;
_c=_b==null?nil:_b;
_d=self.$C(nil,_c);
return _d});
$1.$a(nil,0,4,true).$m(function(_e){var _c;
var _f=nil;
_c=_e==null?nil:_e;
_f=self.$C(nil,_c);
return _f});
$1.$a(nil,-1,-4,false).$m(function(_g){var _c;
var _h=nil;
_c=_g==null?nil:_g;
_h=self.$C(nil,_c);
return _h});
self.$C(nil,$1.$a(nil,0,4,false).$aQ(nil,4));
self.$C(nil,$1.$a(nil,0,4,false).$aQ(nil,5));
self.$C(nil,$1.$a(nil,0,4,true).$aQ(nil,5));
self.$C(nil,$1.$a(nil,0,4,true).$aQ(nil,4));
self.$C(nil,$1.$a(nil,0,4,true).$aQ(nil,3));
self.$C(nil,$1.$a(nil,0,4,true).$aQ(nil,0));
self.$C(nil,$1.$a(nil,0,4,true).$aQ(nil,-1));
self.$C(nil,$1.$a(nil,-1,-5,false).$p());
self.$C(nil,$1.$a(nil,-5,-1,false).$p());
_i=$1.$a(nil,0,4);
self.$C(nil,_i.$af());
self.$C(nil,_i.$aR());
self.$C(nil,_i.$ae());
self.$C(nil,_i.$aS());
self.$C(nil,_i.$aT());
_i=$1.$a(nil,1,5,true);
self.$C(nil,_i.$af());
self.$C(nil,_i.$aR());
self.$C(nil,_i.$ae());
self.$C(nil,_i.$aS());
self.$C(nil,_i.$aT());
self.$C(nil,false.$W(nil,false));
self.$C(nil,false.$W(nil,true));
self.$C(nil,true.$W(nil,false));
self.$C(nil,true.$W(nil,true));
self.$C(nil,$1.$a(nil,0,2,false).$W(nil,$1.$a(nil,0,2,false)));
self.$C(nil,$1.$a(nil,0,2,false).$W(nil,$1.$a(nil,0,2)));
_j=self.$C(nil,$1.$a(nil,0,2,false).$W(nil,$1.$a(nil,0,2,true)));
return _j}

})});$2 = a$d({a$i: [],a$e: $M,a$c: "Float",a$d: Number});$u = a$d({a$i: [],a$e: $l,a$f: ({$L:
/* T_TestString::TestString.main */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$a().$ap();
return _a}

}),a$c: "T_TestString::TestString",a$h: ({$ap:
/* T_TestString::TestString#test */
function(){var self,_a,_i;
_i=nil;
self=this;
if(self.$aU==null)self.$aU=nil;
if(self.$aV==null)self.$aV=nil;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
self.$C(nil,"hello");
self.$C(nil,"hallo\b\t\n");
self.$C(nil,"hallo\\leute");
self.$C(nil,"\"super\"");
self.$C(nil,"hello".$aw(nil,"e"));
self.$C(nil,"hello".$aw(nil,"lo"));
self.$C(nil,"hello".$aw(nil,"a"));
self.$C(nil,"hello hello".$aw(nil,"ll"));
self.$C(nil,"hello hello".$aw(nil,"ll",3));
self.$C(nil,"hallo".$ac(nil,0,1));
self.$C(nil,"hallo".$ac(nil,0,2));
self.$C(nil,"hallo".$ac(nil,0,5));
self.$C(nil,"10".$ar(nil,10,"0"));
self.$C(nil,"10".$ar(nil,1,"blah"));
self.$C(nil,"x".$ar(nil,4,"()"));
self.$C(nil,"10".$at(nil,10,"0"));
self.$C(nil,"10".$at(nil,1,"blah"));
self.$C(nil,"x".$at(nil,4,"()"));
self.$C(nil,("abc " + ((1).$S(nil,2)).$x() + (" def").$x()));
self.$aU="hallo".$i();
self.$aV=4.5;
self.$C(nil,("" + (self.$aU).$x() + (",").$x() + (self.$aV).$x()));
_a="hallo".$ax(nil,"l","r");
self.$C(nil,_a);
_a="hallo".$ax(nil,/ll/,"rr");
self.$C(nil,_a);
_a="hallo".$ax(function(){var _c=nil;
;
_c="r";
return _c},/l/);
self.$C(nil,_a);
_a="hallo".$ax(function(){var _e=nil;
;
_e="blah blah";
return _e},/ll/);
self.$C(nil,_a);
_i="hallllllo".$ax(function(_f){var _g;
var _h=nil;
_g=_f==null?nil:_f;
_h=self.$C(nil,_g);
return _h},/(l)l/);
return _i}

})});$3 = a$d({a$i: [],a$e: $L,a$c: "NameError"});$x = a$d({a$i: [],a$e: $l,a$f: ({$L:
/* T_TestInspect::TestInspect.main */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$a().$ap();
return _a}

}),a$c: "T_TestInspect::TestInspect",a$h: ({$ap:
/* T_TestInspect::TestInspect#test */
function(){var self,_a,_b;
_b=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=[$4.$aW(nil,"Hello","Rubyconf")];
_b=self.$D(nil,_a.$i());
return _b}

})});$U = a$d({a$i: [],a$e: $L,a$c: "LocalJumpError"});$A = a$d({a$i: [],a$e: $l,a$f: ({$L:
/* T_TestLebewesen::TestLebewesen.main */
function(){var self,_a,_b,_c,_d;
_d=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=$5.$a(nil,"AA-BB","Leni");
_b=$5.$a(nil,"AC-DC","Flocki");
_c=$6.$a(nil,"AA-ZZ");
_a.$aX();
_c.$aY();
_d=_c.$aZ(nil,_a);
return _d}

}),a$c: "T_TestLebewesen::TestLebewesen"});$E = a$d({a$i: [],a$e: $l,a$f: ({$L:
/* T_TestSimpleOutput::TestSimpleOutput.main */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$D(nil,"Hello World from RubyJS");
return _a}

}),a$c: "T_TestSimpleOutput::TestSimpleOutput"});$7 = a$d({a$i: [],a$e: nil,a$c: "T_TestException"});$8 = a$d({a$i: [],a$e: nil,a$c: "T_TestCase"});$9 = a$d({a$i: [],a$e: $l,a$c: "T_TestSend::A",a$h: ({$a0:
/* T_TestSend::A#a_method */
function(_d,_a,_b){var self,_c;
_c=nil;
self=this;
try{if(arguments.length!=3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));
;
_c=self.$C(nil,_a,_b);
return _c}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==73))return _e.a$a;
throw(_e)}}

})});$1 = a$d({a$i: [],a$e: $l,a$c: "Range",a$h: ({$W:
/* Range#== */
function(_e,_a){var self,_b,_c,_d;
_d=nil;
self=this;
if(self.$a3==null)self.$a3=nil;
if(self.$a1==null)self.$a1=nil;
if(self.$a2==null)self.$a2=nil;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
if (self.constructor != _a.constructor) return false;;
_d=(_b=self.$a1.$W(nil,_a.$af()), (_b!==false&&_b!==nil) ? ((_c=self.$a2.$W(nil,_a.$ae()), (_c!==false&&_c!==nil) ? (self.$a3.$W(nil,_a.$aT())) : _c)) : _b);
return _d}catch(_f){if(_f instanceof a$c && (!_f.a$b || _f.a$b==74))return _f.a$a;
throw(_f)}}

,$aR:
/* Range#begin */
function(){var self,_a;
_a=nil;
self=this;
if(self.$a1==null)self.$a1=nil;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$a1;
return _a}

,$g:
/* Range#eql? */
function(_e,_a){var self,_b,_c,_d;
_d=nil;
self=this;
if(self.$a3==null)self.$a3=nil;
if(self.$a1==null)self.$a1=nil;
if(self.$a2==null)self.$a2=nil;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
if (self.constructor != _a.constructor) return false;;
_d=(_b=self.$a1.$g(nil,_a.$af()), (_b!==false&&_b!==nil) ? ((_c=self.$a2.$g(nil,_a.$ae()), (_c!==false&&_c!==nil) ? (self.$a3.$W(nil,_a.$aT())) : _c)) : _b);
return _d}catch(_f){if(_f instanceof a$c && (!_f.a$b || _f.a$b==75))return _f.a$a;
throw(_f)}}

,$aT:
/* Range#exclude_end? */
function(){var self,_a;
_a=nil;
self=this;
if(self.$a3==null)self.$a3=nil;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$a3;
return _a}

,$ae:
/* Range#last */
function(){var self,_a;
_a=nil;
self=this;
if(self.$a2==null)self.$a2=nil;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$a2;
return _a}

,$x:
/* Range#to_s */
function(){var self,_b,_a;
_a=nil;
self=this;
if(self.$a3==null)self.$a3=nil;
if(self.$a1==null)self.$a1=nil;
if(self.$a2==null)self.$a2=nil;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
if((_b=self.$a3,_b!==false&&_b!==nil)){_a=("" + (self.$a1).$x() + ("...").$x() + (self.$a2).$x())}else{_a=("" + (self.$a1).$x() + ("..").$x() + (self.$a2).$x())};
return _a}

,$m:
/* Range#each */
function(_c){var self,_a,_b,_d;
_d=nil;
self=this;
if(self.$a3==null)self.$a3=nil;
if(self.$a1==null)self.$a1=nil;
if(self.$a2==null)self.$a2=nil;
try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$a1;
if((_b=self.$a1.$6(nil,self.$a2),_b!==false&&_b!==nil)){return nil};
if((_b=self.$a3,_b!==false&&_b!==nil)){while((_b=_a.$2(nil,self.$a2),_b!==false&&_b!==nil)){_c(_a);
_a=_a.$X()};
_d=nil;
}else{while((_b=_a.$R(nil,self.$a2),_b!==false&&_b!==nil)){_c(_a);
_a=_a.$X()};
_d=nil;
};
return _d}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==78))return _e.a$a;
throw(_e)}}

,$aS:
/* Range#end */
function(){var self,_a;
_a=nil;
self=this;
if(self.$a2==null)self.$a2=nil;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$a2;
return _a}

,$af:
/* Range#first */
function(){var self,_a;
_a=nil;
self=this;
if(self.$a1==null)self.$a1=nil;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$a1;
return _a}

,$aQ:
/* Range#include? */
function(_d,_a){var self,_b,_c;
_c=nil;
self=this;
if(self.$a3==null)self.$a3=nil;
if(self.$a1==null)self.$a1=nil;
if(self.$a2==null)self.$a2=nil;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
if((_b=_a.$2(nil,self.$a1),_b!==false&&_b!==nil)){return false};
if((_b=self.$a3,_b!==false&&_b!==nil)){_c=_a.$2(nil,self.$a2)}else{_c=_a.$R(nil,self.$a2)};
return _c}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==77))return _e.a$a;
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
(_d=[_a,_b],self.$a1=_d[0]==null?nil:_d[0],self.$a2=_d[1]==null?nil:_d[1],_d);
_e=self.$a3=((_d=_c,_d!==false&&_d!==nil)?true:false);
return _e}catch(_g){if(_g instanceof a$c && (!_g.a$b || _g.a$b==76))return _g.a$a;
throw(_g)}}

,$f:
/* Range#=== */
function(_d,_a){var self,_b,_c;
_c=nil;
self=this;
if(self.$a3==null)self.$a3=nil;
if(self.$a1==null)self.$a1=nil;
if(self.$a2==null)self.$a2=nil;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
if((_b=_a.$2(nil,self.$a1),_b!==false&&_b!==nil)){return false};
if((_b=self.$a3,_b!==false&&_b!==nil)){_c=_a.$2(nil,self.$a2)}else{_c=_a.$R(nil,self.$a2)};
return _c}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==79))return _e.a$a;
throw(_e)}}

,$p:
/* Range#to_a */
function(){var self,_a,_b,_c;
self=this;
if(self.$a3==null)self.$a3=nil;
if(self.$a1==null)self.$a1=nil;
if(self.$a2==null)self.$a2=nil;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=[];
if((_b=self.$a1.$6(nil,self.$a2),_b!==false&&_b!==nil)){return _a};
_c=self.$a1;
if((_b=self.$a3,_b!==false&&_b!==nil)){while((_b=_c.$2(nil,self.$a2),_b!==false&&_b!==nil)){_a.$k(nil,_c);
_c=_c.$X()}}else{while((_b=_c.$R(nil,self.$a2),_b!==false&&_b!==nil)){_a.$k(nil,_c);
_c=_c.$X()}};
return _a}

,$i:
/* Range#inspect */
function(){var self,_b,_a;
_a=nil;
self=this;
if(self.$a3==null)self.$a3=nil;
if(self.$a1==null)self.$a1=nil;
if(self.$a2==null)self.$a2=nil;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
if((_b=self.$a3,_b!==false&&_b!==nil)){_a=("" + (self.$a1.$i()).$x() + ("...").$x() + (self.$a2.$i()).$x())}else{_a=("" + (self.$a1.$i()).$x() + ("..").$x() + (self.$a2.$i()).$x())};
return _a}

,$a4:
/* Range#member? */
function(_d,_a){var self,_b,_c;
_c=nil;
self=this;
if(self.$a3==null)self.$a3=nil;
if(self.$a1==null)self.$a1=nil;
if(self.$a2==null)self.$a2=nil;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
if((_b=_a.$2(nil,self.$a1),_b!==false&&_b!==nil)){return false};
if((_b=self.$a3,_b!==false&&_b!==nil)){_c=_a.$2(nil,self.$a2)}else{_c=_a.$R(nil,self.$a2)};
return _c}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==80))return _e.a$a;
throw(_e)}}

})});$_ = a$d({a$i: [],a$e: nil,a$c: "T_TestMassign"});$d = a$d({a$i: [],a$e: $L,a$c: "RuntimeError"});$$ = a$d({a$i: [],a$e: $l,a$c: "MatchData",a$h: ({$c:
/* MatchData#initialize */
function(_c,_a){var self,_b;
_b=nil;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
_b=self.$a5=_a;
return _b}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==81))return _d.a$a;
throw(_d)}}

})});$aa = a$d({a$i: [],a$e: nil,a$c: "T_TestIf"});$ab = a$d({a$i: [],a$e: nil,a$c: "T_TestClass"});$ac = a$d({a$i: [],a$e: nil,a$c: "T_TestHash"});$i = a$d({a$i: [],a$e: $l,a$f: ({$a:
/* Proc.new */
function(_a){var self,_b,_c;
self=this;
_b=_a==null?nil:_a;
try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
if((_c=_b,_c===false||_c===nil)){self.$s(nil,$a,"tried to create Proc object without a block")};
return (function() {
      try {
        return _b.$l.apply(_b, arguments);
      } catch(e) 
      {
        if (e instanceof a$c) 
        {
          if (e.a$b == null)
          {;
self.$s(nil,$U,"break from proc-closure");
}
          return e.a$a;
        }
        else throw(e);
      }
    })}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==82))return _d.a$a;
throw(_d)}}

}),a$c: "Proc",a$d: Function,a$h: ({$l:
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

})});$ad = a$d({a$i: [],a$e: $9,a$c: "T_TestSend::B",a$h: ({$a0:
/* T_TestSend::B#a_method */
function(_d,_a,_b){var self;
self=this;
var _c=arguments;
try{if(arguments.length!=3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));
;
self.$C(nil,"in B");
a$l(self,'$a0',_c)}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==83))return _e.a$a;
throw(_e)}}

,$a6:
/* T_TestSend::B#c_method */
function(_c,_a){var self,_b;
_b=nil;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
_b=nil;
return _b}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==84))return _d.a$a;
throw(_d)}}

})});$6 = a$d({a$i: [],a$e: $W,a$c: "T_TestLebewesen::Hund",a$h: ({$aY:
/* T_TestLebewesen::Hund#wau */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$D(nil,"wau wau");
return _a}

,$aZ:
/* T_TestLebewesen::Hund#jage */
function(_c,_a){var self,_b;
_b=nil;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
_b=self.$D(nil,"ich jage ".$S(nil,_a.$e()));
return _b}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==85))return _d.a$a;
throw(_d)}}

})});$m = a$d({a$i: [],a$e: $l,a$f: ({$L:
/* T_TestNew::TestNew.main */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$a().$ap();
return _a}

}),a$c: "T_TestNew::TestNew",a$h: ({$c:
/* T_TestNew::TestNew#initialize */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=nil;
return _a}

,$ap:
/* T_TestNew::TestNew#test */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$D(nil,"test");
return _a}

})});$ae = a$d({a$i: [],a$e: nil,a$c: "T_TestEql"});a$d({a$i: [],a$g: $b});$k = a$d({a$i: [],a$e: $l,a$c: "Method",a$h: ({$c:
/* Method#initialize */
function(_f,_a,_b){var self,_c,_d,_e;
_e=nil;
self=this;
try{if(arguments.length!=3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));
;
(_c=[_a,_b],self.$a7=_c[0]==null?nil:_c[0],self.$a8=_c[1]==null?nil:_c[1],_c);
_d=nil;
_d = _a[a$g[_b]];
    if (_d==null) _d = nil;;
if((_c=_d,_c!==false&&_c!==nil)){_e=self.$a9=_d}else{_e=self.$s(nil,$3,("undefined method `" + (_b).$x() + ("' for class `").$x() + (_a.$H().$e()).$x() + ("'").$x()))};
return _e}catch(_g){if(_g instanceof a$c && (!_g.a$b || _g.a$b==86))return _g.a$a;
throw(_g)}}

,$l:
/* Method#call */
function(_c){var self,_a,_b,_d;
self=this;
_d=_c==null?nil:_c;
try{_a=[];
for(_b=1;_b<arguments.length;_b++)_a.push(arguments[_b]);
;
return self.$a9.apply(self.$a7, [_d].concat(_a))}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==87))return _e.a$a;
throw(_e)}}

,$i:
/* Method#inspect */
function(){var self,_a;
_a=nil;
self=this;
if(self.$a7==null)self.$a7=nil;
if(self.$a8==null)self.$a8=nil;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=("#<Method: " + (self.$a7.$H().$e()).$x() + ("#").$x() + (self.$a8).$x() + (">").$x());
return _a}

})});$s = a$d({a$i: [],a$e: $l,a$f: ({$L:
/* T_TestArgs::TestArgs.main */
function(){var self,_a,_b;
_b=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$a();
_a.$M(nil,0);
self.$D(nil,"--");
_a.$M(nil,1,2);
self.$D(nil,"--");
_a.$M(nil,1,2,9);
self.$D(nil,"--");
_a.$M(nil,1,2,9,5);
self.$D(nil,"--");
_a.$M(nil,1,2,9,5,6);
self.$D(nil,"--");
_b=_a.$M(nil,1,2,9,5,6,7,8,9,10,11,12);
return _b}

}),a$c: "T_TestArgs::TestArgs",a$h: ({$M:
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
self.$C(nil,_a);
self.$C(nil,_b);
self.$C(nil,_c);
_f=self.$C(nil,_d);
return _f}catch(_h){if(_h instanceof a$c && (!_h.a$b || _h.a$b==88))return _h.a$a;
throw(_h)}}

})});$af = a$d({a$i: [],a$e: nil,a$c: "T_TestRegexp"});$Y = a$d({a$i: [],a$e: $l,a$c: "T_TestClass::D"});$ag = a$d({a$i: [],a$e: $l,a$c: "Boolean",a$d: Boolean,a$h: ({$W:
/* Boolean#== */
function(_b,_a){var self;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
return (self == _a)}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==89))return _c.a$a;
throw(_c)}}

,$x:
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

})});$C = a$d({a$i: [],a$e: $l,a$f: ({$L:
/* T_TestHash::TestHash.main */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$a().$ap();
return _a}

}),a$c: "T_TestHash::TestHash",a$h: ({$J:
/* T_TestHash::TestHash#hash */
function(){var self;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
var el = {}; el["1"] = null; return el}

,$ap:
/* T_TestHash::TestHash#test */
function(){var self,_a,_b,_c;
_c=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=$4.$aW(nil,"a",6,"b",7,"1",1,1,2,"1,2","hello",[1,2],"good");
self.$C(nil,_a.$ac(nil,"a"));
self.$C(nil,_a.$ac(nil,"b"));
self.$C(nil,_a.$ac(nil,"1"));
self.$C(nil,_a.$ac(nil,1));
self.$C(nil,_a.$ac(nil,"1,2"));
self.$C(nil,_a.$ac(nil,[1,2]));
self.$D(nil,"test native JS hash");
_c=_b=self.$J();
return _c}

})});$ah = a$d({a$i: [],a$e: $M,a$c: "Bignum",a$d: Number});$v = a$d({a$i: [],a$e: $l,a$f: ({$L:
/* T_TestCase::TestCase.main */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$a().$ap();
return _a}

}),a$c: "T_TestCase::TestCase",a$h: ({$ap:
/* T_TestCase::TestCase#test */
function(){var self,_a,_b,_c,_d;
_d=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=(1).$S(nil,1);
if((_b=(_c=(1).$f(nil,_a), (_c!==false&&_c!==nil) ? _c : ((3).$f(nil,_a))),_b!==false&&_b!==nil)){self.$D(nil,"NOT OKAY")}else{if((_b=(2).$f(nil,_a),_b!==false&&_b!==nil)){self.$D(nil,"OKAY")}else{self.$D(nil,"NOT OKAY")}};
self.$C(nil,$R.$f(nil,[]));
self.$C(nil,$d.$f(nil,$d.$a()));
_a=1;
if((_b=$N.$f(nil,_a),_b!==false&&_b!==nil)){self.$D(nil,"OK")}else{if((_b=(1).$f(nil,_a),_b!==false&&_b!==nil)){self.$D(nil,"OK")}};
_a=_d=4;
if((_b=$1.$a(nil,0,3,false).$f(nil,_a),_b!==false&&_b!==nil)){_d=self.$D(nil,"NOT OKAY")}else{if((_b=$1.$a(nil,1,4,true).$f(nil,_a),_b!==false&&_b!==nil)){_d=self.$D(nil,"NOT OKAY")}else{if((_b=$1.$a(nil,2,4,false).$f(nil,_a),_b!==false&&_b!==nil)){_d=self.$D(nil,"OKAY")}else{_d=nil}}};
return _d}

})});$y = a$d({a$i: [],a$e: $l,a$f: ({$L:
/* T_TestIf::TestIf.main */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$a().$ap();
return _a}

}),a$c: "T_TestIf::TestIf",a$h: ({$ap:
/* T_TestIf::TestIf#test */
function(){var self,_a,_b,_c,_d,_e,_f;
_f=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
if(true){self.$D(nil,"OK")};
if(false){self.$D(nil,"NOT OK")};
if(true){self.$D(nil,"OK")};
if(false){self.$D(nil,"NOT OK")};
if((_a=(_b=true, (_b!==false&&_b!==nil) ? ((_c=true, (_c!==false&&_c!==nil) ? ((_d=(_e=true, (_e!==false&&_e!==nil) ? _e : (false)), (_d!==false&&_d!==nil) ? (true) : _d)) : _c)) : _b),_a!==false&&_a!==nil)){self.$D(nil,"OK")};
if((_a=(_b=(5).$2(nil,6), (_b!==false&&_b!==nil) ? ((6).$2(nil,7)) : _b),_a!==false&&_a!==nil)){self.$D(nil,"OK")};
self.$C(nil,(_a=false, (_a!==false&&_a!==nil) ? _a : ("a")));
self.$C(nil,(_a=nil, (_a!==false&&_a!==nil) ? _a : ("a")));
self.$C(nil,(_a=true, (_a!==false&&_a!==nil) ? _a : ("a")));
self.$C(nil,(_a="b", (_a!==false&&_a!==nil) ? _a : ("a")));
self.$C(nil,(_a=false, (_a!==false&&_a!==nil) ? ("a") : _a));
self.$C(nil,(_a=nil, (_a!==false&&_a!==nil) ? ("a") : _a));
self.$C(nil,(_a=true, (_a!==false&&_a!==nil) ? ("a") : _a));
_f=self.$C(nil,(_a="b", (_a!==false&&_a!==nil) ? ("a") : _a));
return _f}

})});$ai = a$d({a$i: [],a$e: nil,a$c: "T_TestArray"});$o = a$d({a$i: [],a$e: $l,a$f: ({$L:
/* T_TestSend::TestSend.main */
function(){var self,_b,_c,_d,_e;
_e=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
self.$D(nil,"send");
self.$C(nil,$9.$a().$E(nil,"a_method",1,2));
self.$C(nil,$ad.$a().$E(nil,"a_method",1,2));
self.$D(nil,"respond_to?");
self.$C(nil,$9.$a().$A(nil,"a_method"));
self.$C(nil,$9.$a().$A(nil,"to_s"));
self.$C(nil,$9.$a().$A(nil,"inspect"));
self.$C(nil,$9.$a().$A(nil,"b_method"));
self.$C(nil,$9.$a().$A(nil,"c_method"));
self.$D(nil,"method_missing");
self.$C(nil,$V.$a().$A(nil,"blah_blah"));
$V.$a().$a_(nil,1,2,3);
try{$9.$a().$a_();
self.$D(nil,"FAILURE?")}catch(_a){if(_a instanceof a$c)throw(_a);
if((_b=$h.$f(nil,_a),_b!==false&&_b!==nil)){self.$D(nil,"catched!!!")}else{throw(_a)}};
try{$9.$a$()}catch(_a){if(_a instanceof a$c)throw(_a);
if((_b=$h.$f(nil,_a),_b!==false&&_b!==nil)){self.$C(nil,"goood")}else{throw(_a)}};
self.$D(nil,"class Method");
_c="hallo".$K(nil,"to_s");
self.$C(nil,_c);
self.$C(nil,_c.$l());
_d=[1,2,3];
_c=_d.$K(nil,"+");
self.$C(nil,_c);
self.$C(nil,_c.$l(nil,[2,3]));
self.$C(nil,_c);
_e=self.$C(nil,_d);
return _e}

}),a$c: "T_TestSend::TestSend"});$4 = a$d({a$i: [$c],a$e: $l,a$f: ({$aW:
/* Hash.new_from_key_value_list */
function(){var self,_a,_b,_c;
self=this;
_a=[];
for(_b=1;_b<arguments.length;_b++)_a.push(arguments[_b]);
;
if((_b=_a.$aj().$Z(nil,2).$W(nil,0),_b===false||_b===nil)){self.$s(nil,$a)};
_c=self.$b();

    // 
    // we use an associate array to store the items. But unlike
    // Javascript, the entries are arrays which contain the collisions.
    // NOTE that we have to prefix the hash code with a prefix so that
    // there are no collisions with methods etc.   
    // I prefix it for now with ":".
    //
    var items = new Object;
    var hashed_key, current_key, current_val;
   
    for (var i = 0; i < _a.length; i += 2)
    {
      current_key = _a[i];
      current_val = _a[i+1];
      hashed_key = ":" + current_key.$J();

      // make sure that a bucket exists
      if (!items[hashed_key]) items[hashed_key] = [];

      items[hashed_key].push(current_key, current_val);
    }

    _c.a$k = items; 
    _c.a$l = nil;
    return _c;
    }

,$bc:
/* Hash.new_from_jsobject */
function(_d,_a){var self,_b,_c;
_c=nil;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
_c=_b=self.$a();
return _c}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==93))return _e.a$a;
throw(_e)}}

}),a$c: "Hash",a$h: ({$ac:
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

    var hashed_key = ":" + _a.$J();
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
    }catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==90))return _c.a$a;
throw(_c)}}

,$ba:
/* Hash#keys */
function(){var self,_b,_f;
_b=_f=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_f=self.$o(function(_a){var _c,_d;
var _e=nil;
(_b=a$j(_a),_c=_b[0]==null?nil:_b[0],_d=_b[1]==null?nil:_b[1],_b);
_e=_c;
return _e});
return _f}

,$x:
/* Hash#to_s */
function(){var self,_a,_c,_g;
_c=_g=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=[];
self.$m(function(_b){var _d,_e;
var _f=nil;
(_c=a$j(_b),_d=_c[0]==null?nil:_c[0],_e=_c[1]==null?nil:_c[1],_c);
_a.$k(nil,_d);
_f=_a.$k(nil,_e);
return _f});
_g=_a.$ad(nil,"");
return _g}

,$ah:
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

    var hashed_key = ":" + _a.$J();
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
    }catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==92))return _d.a$a;
throw(_d)}}

,$m:
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
    }catch(_b){if(_b instanceof a$c && (!_b.a$b || _b.a$b==91))return _b.a$a;
throw(_b)}}

,$c:
/* Hash#initialize */
function(){var self;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;

    self.a$k = new Object; 
    self.a$l = nil;
    return nil}

,$bb:
/* Hash#values */
function(){var self,_b,_f;
_b=_f=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_f=self.$o(function(_a){var _c,_d;
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
_a=_a.$S(nil,self.$o(function(_b){var _d,_e;
var _f=nil;
(_c=a$j(_b),_d=_c[0]==null?nil:_c[0],_e=_c[1]==null?nil:_c[1],_c);
_f=_d.$i().$S(nil,"=>").$S(nil,_e.$i());
return _f}).$ad(nil,", "));
_a=_a.$S(nil,"}");
_g=_a;
return _g}

})});$aj = a$d({a$i: [],a$e: nil,a$c: "T_TestYield"});$n = a$d({a$i: [],a$e: $l,a$f: ({$L:
/* T_TestArray::TestArray.main */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$a().$ap();
return _a}

}),a$c: "T_TestArray::TestArray",a$h: ({$bd:
/* T_TestArray::TestArray#array */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=[1,2,null,[null,null,4]];
return _a}

,$ap:
/* T_TestArray::TestArray#test */
function(){var self,_a,_b;
_b=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=["a","b","b","b","c"];
self.$C(nil,_a.$_(nil,"b"));
self.$C(nil,_a);
self.$C(nil,_a.$_(nil,"z"));
self.$D(nil,"test native JS array mapping");
_b=self.$C(nil,self.$bd());
return _b}

})});$ak = a$d({a$i: [],a$e: nil,a$c: "T_TestSplat"});$al = a$d({a$i: [],a$e: nil,a$c: "T_TestNew"});$F = a$d({a$i: [],a$e: $l,a$f: ({$L:
/* T_TestMassign::TestMassign.main */
function(){var self,_a,_b,_c,_d,_e,_f;
_a=_f=nil;
self=this;
if(self.$aU==null)self.$aU=nil;
if(self.$be==null)self.$be=nil;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
(_a=[1,2],_b=_a[0]==null?nil:_a[0],_c=_a[1]==null?nil:_a[1],_a);
self.$C(nil,_b);
self.$C(nil,_c);
self.$D(nil,"--");
(_a=[1,2,3],_b=_a[0]==null?nil:_a[0],_c=_a[1]==null?nil:_a[1],_a);
self.$C(nil,_b);
self.$C(nil,_c);
self.$D(nil,"--");
_d=5;
(_a=[1,2],_b=_a[0]==null?nil:_a[0],_c=_a[1]==null?nil:_a[1],_d=_a[2]==null?nil:_a[2],_a);
self.$C(nil,_b);
self.$C(nil,_c);
self.$C(nil,_d);
self.$D(nil,"--");
(_a=[1,2,3],self.$aU=_a[0]==null?nil:_a[0],_c=_a[1]==null?nil:_a[1],self.$be=_a[2]==null?nil:_a[2],_a);
self.$C(nil,self.$aU);
self.$C(nil,_c);
self.$C(nil,self.$be);
self.$D(nil,"--");
self.$D(nil,"swap");
(_a=[1,2],_b=_a[0]==null?nil:_a[0],_c=_a[1]==null?nil:_a[1],_a);
self.$C(nil,_b);
self.$C(nil,_c);
(_a=[_c,_b],_b=_a[0]==null?nil:_a[0],_c=_a[1]==null?nil:_a[1],_a);
self.$C(nil,_b);
self.$C(nil,_c);
self.$D(nil,"--");
self.$D(nil,"splat1");
(_a=[1,2],_b=_a[0]==null?nil:_a[0],_c=_a[1]==null?nil:_a[1],_d=_a[2]==null?nil:_a[2],_e=_a.slice(3),_a);
self.$C(nil,_b);
self.$C(nil,_c);
self.$C(nil,_d);
self.$C(nil,_e);
self.$D(nil,"--");
self.$D(nil,"splat2");
(_a=[1,2],_b=_a[0]==null?nil:_a[0],_c=_a.slice(1),_a);
self.$C(nil,_b);
self.$C(nil,_c);
self.$D(nil,"--");
self.$D(nil,"splat3");
(_a=[1,2,3,4,5],_b=_a[0]==null?nil:_a[0],_c=_a.slice(1),_a);
self.$C(nil,_b);
self.$C(nil,_c);
self.$D(nil,"--");
self.$D(nil,"splat with globals");
self.$C(nil,(typeof($am)=='undefined'?nil:$am));
self.$C(nil,(typeof($an)=='undefined'?nil:$an));
(_a=[1,2],$am=_a[0]==null?nil:_a[0],$an=_a[1]==null?nil:_a[1],_a);
self.$C(nil,(typeof($am)=='undefined'?nil:$am));
self.$C(nil,(typeof($an)=='undefined'?nil:$an));
_f=self.$D(nil,"--");
return _f}

}),a$c: "T_TestMassign::TestMassign"});$e = a$d({a$i: [],a$e: $L,a$c: "TypeError"});$ao = a$d({a$i: [],a$e: $l,a$c: "Regexp",a$d: RegExp});$h = a$d({a$i: [],a$e: $3,a$c: "NoMethodError"});$ap = a$d({a$i: [],a$e: nil,a$c: "T_TestExpr"});$5 = a$d({a$i: [],a$e: $W,a$c: "T_TestLebewesen::Katze",a$h: ({$e:
/* T_TestLebewesen::Katze#name */
function(){var self,_a;
_a=nil;
self=this;
if(self.$bf==null)self.$bf=nil;
_a=self.$bf;
return _a}

,$c:
/* T_TestLebewesen::Katze#initialize */
function(_d,_a,_b){var self,_c;
_c=nil;
self=this;
try{if(arguments.length!=3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));
;
a$m(self,'$c',nil,[_a]);
_c=self.$bf=_b;
return _c}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==94))return _e.a$a;
throw(_e)}}

,$aX:
/* T_TestLebewesen::Katze#miau */
function(){var self,_a;
_a=nil;
self=this;
if(self.$bf==null)self.$bf=nil;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$D(nil,"miau, ich bin ".$S(nil,self.$bf));
return _a}

})});$t = a$d({a$i: [],a$e: $l,a$f: ({$L:
/* T_TestRegexp::TestRegexp.main */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$a().$ap();
return _a}

}),a$c: "T_TestRegexp::TestRegexp",a$h: ({$ap:
/* T_TestRegexp::TestRegexp#test */
function(){var self,_a,_b,_c;
_c=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
if((_a="hallo".$as(nil,/ll/),_a!==false&&_a!==nil)){self.$C(nil,"okay")};
_b="hallo".$as(nil,/ll/);
self.$C(nil,_b);
"hallo".$as(nil,/(ll)/);
self.$C(nil,(RegExp.$1 || nil));
self.$C(nil,(RegExp.$2 || nil));
self.$C(nil,(RegExp.$3 || nil));
"hallo".$as(nil,/a(ll)(o)/);
self.$C(nil,(RegExp.$1 || nil));
self.$C(nil,(RegExp.$2 || nil));
self.$C(nil,(RegExp.$3 || nil));
_c=self.$C(nil,(RegExp.$4 || nil));
return _c}

})});      $b.a$e = $l;
var a$n = [$c,$j,$l,$G,$D,$H,$I,$J,$K,$r,$M,$N,$O,$P,$Q,$R,$S,$z,$f,$p,$T,$w,$V,$W,$X,$B,$Z,$g,$L,$a,$0,$q,$2,$u,$3,$x,$U,$A,$E,$7,$8,$9,$1,$_,$d,$$,$aa,$ab,$ac,$i,$ad,$6,$m,$ae,$b,$k,$s,$af,$Y,$ag,$C,$ah,$v,$y,$ai,$o,$4,$aj,$n,$ak,$al,$F,$e,$ao,$h,$ap,$5,$t];
a$o(a$n);
for (var i=0; i<a$n.length; i++) a$p(a$n[i]);
function main() { return $G.$L.apply($G, arguments); }
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
