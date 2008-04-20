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
var a$h = {"$bd":"sort","$I":"test","$as":"sub","$aL":"end","$v":"each","$a0":"to_f","$G":"m","$aR":"new_from_jsobject","$x":"loop","$O":"%","$aX":"calc","$5":"collect","$V":"test_three_times_indirect","$aM":"member?","$am":"&","$J":"new_from_key_value_list","$M":"test_loop2","$4":"three_times_yield","$f":"===","$K":"three_times_block","$P":"==","$a6":"reverse","$a1":"to_i","$W":"three_times_indirect","$8":"map","$af":"downto","$ak":"times","$t":"p","$aK":"include?","$s":"proc","$b":"allocate","$aN":"keys","$_":"reject","$Z":"three_times_yield2","$at":"size","$ar":"*","$a3":"delete","$N":"+","$ba":"unshift","$aQ":"values","$U":"return_in_block","$ad":"upto","$bc":"dup","$au":"rjust","$T":"-","$bk":"not_a_method","$q":"nil?","$a":"new","$a$":"push","$S":"test_while_loop","$ai":"/","$L":"call","$D":"message","$y":"is_a?","$az":"split","$F":"main","$e":"name","$l":"empty?","$a2":"to_splat","$aS":"add_msg","$ac":"jage","$j":"raise","$av":"length","$o":"to_s","$a7":"clear","$aZ":"c_method","$ag":">=","$a4":"array","$aj":"|","$h":"kind_of?","$7":"find_all","$an":"~","$R":"loop2","$aw":"[]","$aA":"strip","$Y":"test_three_times_yield2","$ap":"-@","$3":"test_return_in_block","$aP":"[]=","$ah":"succ","$bb":"reverse!","$B":"hash","$z":"class","$i":"inspect","$ao":"^","$0":"test_three_times_block","$2":"test_three_times_yield","$a9":"pop","$p":"__send","$g":"eql?","$C":"method","$al":"<","$ab":"wau","$aD":"first","$aJ":"begin","$6":"<<","$ay":"ljust","$d":"__invoke","$Q":">","$ae":"<=","$aY":"a_method","$c":"initialize","$w":"send","$r":"respond_to?","$a5":"run","$1":"test_loop","$k":"shift","$bj":"blah_blah","$aI":"exclude_end?","$aq":"+@","$bh":"miau","$$":"select","$9":"to_a","$n":"method_missing","$aB":"index","$ax":"=~","$bl":"addPrint","$a8":"each_with_index","$aO":"join","$X":"test_proc","$A":"tap","$aG":"last","$m":"instance_of?","$a_":"to_ary","$aC":"gsub","$u":"puts"};
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
_f=self.$j(nil,$g,("undefined method `" + ((_a).$o()) + ("' for ") + ((self.$i()).$o())));
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
return a$i(self, _a)}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==14))return _c.a$a;
throw(_c)}}

,$n:
/* Object#method_missing */
function(_d,_a){var self,_b,_c,_e,_f;
_f=nil;
self=this;
_e=_d==null?nil:_d;
try{if(arguments.length<2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
_b=[];
for(_c=2;_c<arguments.length;_c++)_b.push(arguments[_c]);
;
_f=self.$j(nil,$g,("undefined method `" + ((_a).$o()) + ("' for ") + ((self.$i()).$o())));
return _f}catch(_g){if(_g instanceof a$c && (!_g.a$b || _g.a$b==13))return _g.a$a;
throw(_g)}}

,$p:
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
      return self.$n.apply(self, [_e].concat([_a]).concat(_b));}catch(_f){if(_f instanceof a$c && (!_f.a$b || _f.a$b==12))return _f.a$a;
throw(_f)}}

,$j:
/* Object#raise */
function(){var self,_a,_b,_c,_d;
self=this;
_a=[];
for(_b=1;_b<arguments.length;_b++)_a.push(arguments[_b]);
;
_c=((_b=_a.$l(),_b!==false&&_b!==nil)?$c.$a(nil,""):(_d=_a.$k(),((_b=_d.$h(nil,$b),_b!==false&&_b!==nil)?_d.$d(nil,'$a',a$b(_a)):((_b=_d.$m(nil,$f),_b!==false&&_b!==nil)?((_b=_a.$l(),_b!==false&&_b!==nil)?_d:$a.$a(nil,"to many arguments given to raise")):((_b=_d.$m(nil,$e),_b!==false&&_b!==nil)?((_b=_a.$l(),_b!==false&&_b!==nil)?$c.$a(nil,_d):$a.$a(nil,"to many arguments given to raise")):$d.$a(nil,"exception class/object expected"))))));
throw(_c)}

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
return (self.constructor == _a.constructor && self == _a)}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==15))return _c.a$a;
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
return _b}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==16))return _c.a$a;
throw(_c)}}

,$q:
/* Object#nil? */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=false;
return _a}

,$o:
/* Object#to_s */
function(){var self;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
return self.toString()}

,$r:
/* Object#respond_to? */
function(_b,_a){var self;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;

    var m = a$f[_a]; 
    return (m !== undefined && self[m] !== undefined && !self[m].a$i)}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==18))return _c.a$a;
throw(_c)}}

,$s:
/* Object#proc */
function(_a){var self,_b,_c;
_c=nil;
self=this;
_b=_a==null?nil:_a;
try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_c=$h.$a(_b);
return _c}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==17))return _d.a$a;
throw(_d)}}

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
return _b}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==19))return _d.a$a;
throw(_d)}}

,$t:
/* Object#p */
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
      return self.$n.apply(self, 
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

,$m:
/* Object#instance_of? */
function(_b,_a){var self;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
return (self.a$g === _a)}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==25))return _c.a$a;
throw(_c)}}

,$w:
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
      return self.$n.apply(self, [_e].concat([_a]).concat(_b));}catch(_f){if(_f instanceof a$c && (!_f.a$b || _f.a$b==24))return _f.a$a;
throw(_f)}}

,$x:
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

,$u:
/* Object#puts */
function(_b,_a){var self;
self=this;
try{if(arguments.length>2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
if(_a==null)_a="";
;
_a=_a.$o();
STDOUT_puts(_a)}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==22))return _c.a$a;
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
return _b}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==26))return _e.a$a;
throw(_e)}}

,$i:
/* Exception#inspect */
function(){var self,_a;
_a=nil;
self=this;
if(self.$E==null)self.$E=nil;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=("#<" + ((self.$z().$e()).$o()) + (": ") + ((self.$E).$o()) + (">"));
return _a}

}});$l = a$d({a$j: [],a$e: $f,a$c: "StandardError"});$m = a$d({a$j: [],a$e: $l,a$c: "NameError"});$g = a$d({a$j: [],a$e: $m,a$c: "NoMethodError"});$n = a$d({a$j: [],a$e: $k,a$f: {$F:
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

},a$c: "T_TestEql::TestEql"});$o = a$d({a$j: [],a$e: $k,a$f: {$F:
/* T_TestArgs::TestArgs.main */
function(){var self,_a,_b;
_b=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$a();
_a.$G(nil,0);
self.$u(nil,"--");
_a.$G(nil,1,2);
self.$u(nil,"--");
_a.$G(nil,1,2,9);
self.$u(nil,"--");
_a.$G(nil,1,2,9,5);
self.$u(nil,"--");
_a.$G(nil,1,2,9,5,6);
self.$u(nil,"--");
_b=_a.$G(nil,1,2,9,5,6,7,8,9,10,11,12);
return _b}

},a$c: "T_TestArgs::TestArgs",a$h: {$G:
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
return _f}catch(_h){if(_h instanceof a$c && (!_h.a$b || _h.a$b==27))return _h.a$a;
throw(_h)}}

}});$p = a$d({a$j: [],a$e: $k,a$c: "MatchData",a$h: {$c:
/* MatchData#initialize */
function(_c,_a){var self,_b;
_b=nil;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
_b=self.$H=_a;
return _b}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==28))return _d.a$a;
throw(_d)}}

}});$r = a$d({a$j: [],a$e: $k,a$f: {$F:
/* T_TestInspect::TestInspect.main */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$a().$I();
return _a}

},a$c: "T_TestInspect::TestInspect",a$h: {$I:
/* T_TestInspect::TestInspect#test */
function(){var self,_a,_b;
_b=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=[$q.$J(nil,"Hello","Rubyconf")];
_b=self.$u(nil,_a.$i());
return _b}

}});$t = a$d({a$j: [],a$e: $k,a$f: {$F:
/* T_TestYield::TestYield.main */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$a().$I();
return _a}

},a$c: "T_TestYield::TestYield",a$h: {$M:
/* T_TestYield::TestYield#test_loop2 */
function(){var self,_a,_b,_d,_f;
_f=nil;
self=this;
try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
self.$u(nil,"loop2");
_a=0;
_b=self.$R(function(){var _e=nil;
;
_a=_a.$N(nil,1);
if((_d=_a.$O(nil,2).$P(nil,1),_d!==false&&_d!==nil)){return nil};
self.$t(nil,_a);
if((_d=_a.$Q(nil,8),_d!==false&&_d!==nil)){throw(new a$c(["out",_a],null))}else{_e=nil};
return _e});
self.$t(nil,_b);
_f=self.$u(nil,"--");
return _f}catch(_g){if(_g instanceof a$c && (!_g.a$b || _g.a$b==30))return _g.a$a;
throw(_g)}}

,$K:
/* T_TestYield::TestYield#three_times_block */
function(_a){var self,_b,_c;
_c=nil;
self=this;
_b=_a==null?nil:_a;
try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_b.$L(nil,1);
_b.$L(nil,2);
_c=_b.$L(nil,3);
return _c}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==29))return _d.a$a;
throw(_d)}}

,$U:
/* T_TestYield::TestYield#return_in_block */
function(_a){var self,_b,_c;
_c=nil;
self=this;
_b=_a==null?nil:_a;
try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
self.$t(nil,"return_in_block before");
_b.$L();
_c=self.$t(nil,"return_in_block after");
return _c}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==31))return _d.a$a;
throw(_d)}}

,$S:
/* T_TestYield::TestYield#test_while_loop */
function(){var self,_a,_b,_c;
_c=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
self.$u(nil,"while-loop");
_a=0;
while(true){_a=_a.$N(nil,1);
if((_b=_a.$O(nil,2).$P(nil,1),_b!==false&&_b!==nil)){continue};
self.$t(nil,_a);
if((_b=_a.$Q(nil,8),_b!==false&&_b!==nil)){break}};
self.$u(nil,"----");
while((_b=_a.$Q(nil,0),_b!==false&&_b!==nil)){self.$t(nil,_a);
_a=_a.$T(nil,1)};
_c=self.$u(nil,"--");
return _c}

,$R:
/* T_TestYield::TestYield#loop2 */
function(_a){var self,_b,_c;
_c=nil;
self=this;
_b=_a==null?nil:_a;
try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
while(true){_b.$L()};
_c=self.$t(nil,"not reached");
return _c}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==33))return _d.a$a;
throw(_d)}}

,$X:
/* T_TestYield::TestYield#test_proc */
function(){var self,_a,_d;
_d=nil;
self=this;
try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
self.$t(nil,"test_proc");
_a=self.$s(function(){;
throw(new a$c(0,32))});
self.$t(nil,_a.$L());
_a=$h.$a(function(){;
throw(new a$c(3,null))});
_d=self.$t(nil,_a.$L());
return _d}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==32))return _e.a$a;
throw(_e)}}

,$V:
/* T_TestYield::TestYield#test_three_times_indirect */
function(){var self,_d;
_d=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
self.$u(nil,"three_times_indirect");
self.$W(function(_a){var _b;
var _c=nil;
_b=_a==null?nil:_a;
_c=self.$t(nil,_b);
return _c});
_d=self.$u(nil,"--");
return _d}

,$Y:
/* T_TestYield::TestYield#test_three_times_yield2 */
function(){var self,_d,_e;
_e=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
self.$u(nil,"three_times_yield2");
_e=self.$Z(function(_a){var _b;
var _c=nil;
_b=_a==null?nil:_a;
if((_d=_b.$P(nil,1),_d!==false&&_d!==nil)){_c=_b}else{return _b.$N(nil,1)};
return _c});
return _e}

,$1:
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
_a=_a.$N(nil,1);
if((_d=_a.$O(nil,2).$P(nil,1),_d!==false&&_d!==nil)){return nil};
self.$t(nil,_a);
if((_d=_a.$Q(nil,8),_d!==false&&_d!==nil)){throw(new a$c(["out",_a],null))}else{_e=nil};
return _e});
self.$t(nil,_b);
_f=self.$u(nil,"--");
return _f}catch(_g){if(_g instanceof a$c && (!_g.a$b || _g.a$b==34))return _g.a$a;
throw(_g)}}

,$0:
/* T_TestYield::TestYield#test_three_times_block */
function(){var self,_d;
_d=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
self.$u(nil,"three_times_block");
self.$K(function(_a){var _b;
var _c=nil;
_b=_a==null?nil:_a;
_c=self.$t(nil,_b);
return _c});
_d=self.$u(nil,"--");
return _d}

,$I:
/* T_TestYield::TestYield#test */
function(){var self,_c,_d,_e;
_e=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
self.$2();
self.$0();
self.$V();
self.$Y();
self.$1();
self.$M();
self.$S();
self.$s(function(){;
}).$L();
try{self.$X()}catch(_b){if(_b instanceof a$c)throw(_b);
if((_d=$s.$f(nil,_b),_d!==false&&_d!==nil)){_c=_b;
self.$t(nil,_c)}else{throw(_b)}};
_e=self.$t(nil,self.$3());
return _e}

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

,$W:
/* T_TestYield::TestYield#three_times_indirect */
function(_a){var self,_b,_c;
_c=nil;
self=this;
_b=_a==null?nil:_a;
try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
self.$4(_b);
_c=self.$K(_b);
return _c}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==36))return _d.a$a;
throw(_d)}}

,$4:
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

,$Z:
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

,$3:
/* T_TestYield::TestYield#test_return_in_block */
function(){var self,_b;
_b=nil;
self=this;
try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
self.$t(nil,"before");
self.$U(function(){;
throw(new a$c(4,39))});
_b=self.$t(nil,"after (NOT)");
return _b}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==39))return _c.a$a;
throw(_c)}}

,$2:
/* T_TestYield::TestYield#test_three_times_yield */
function(){var self,_d;
_d=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
self.$u(nil,"three_times_yield");
self.$4(function(_a){var _b;
var _c=nil;
_b=_a==null?nil:_a;
_c=self.$t(nil,_b);
return _c});
_d=self.$u(nil,"--");
return _d}

}});$u = a$d({a$j: [],a$e: nil,a$c: "Enumerable",a$h: {$5:
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
_g=_c.$6(nil,((_f=_b,_f!==false&&_f!==nil)?_b.$L(nil,_e):_e));
return _g});
_h=_c;
return _h}catch(_i){if(_i instanceof a$c && (!_i.a$b || _i.a$b==40))return _i.a$a;
throw(_i)}}

,$7:
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
if((_e=_f(_c),_e!==false&&_e!==nil)){_d=_a.$6(nil,_c)}else{_d=nil};
return _d});
_g=_a;
return _g}catch(_h){if(_h instanceof a$c && (!_h.a$b || _h.a$b==41))return _h.a$a;
throw(_h)}}

,$8:
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
_g=_c.$6(nil,((_f=_b,_f!==false&&_f!==nil)?_b.$L(nil,_e):_e));
return _g});
_h=_c;
return _h}catch(_i){if(_i instanceof a$c && (!_i.a$b || _i.a$b==42))return _i.a$a;
throw(_i)}}

,$9:
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
_d=_a.$6(nil,_c);
return _d});
_e=_a;
return _e}

,$_:
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
if((_e=_f(_c),_e===false||_e===nil)){_d=_a.$6(nil,_c)}else{_d=nil};
return _d});
_g=_a;
return _g}catch(_h){if(_h instanceof a$c && (!_h.a$b || _h.a$b==43))return _h.a$a;
throw(_h)}}

,$$:
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
if((_e=_f(_c),_e!==false&&_e!==nil)){_d=_a.$6(nil,_c)}else{_d=nil};
return _d});
_g=_a;
return _g}catch(_h){if(_h instanceof a$c && (!_h.a$b || _h.a$b==44))return _h.a$a;
throw(_h)}}

}});$c = a$d({a$j: [],a$e: $l,a$c: "RuntimeError"});$v = a$d({a$j: [],a$e: nil,a$c: "T_TestString"});$w = a$d({a$j: [],a$e: nil,a$c: "T_TestEql"});$x = a$d({a$j: [],a$e: nil,a$c: "T_TestSimpleOutput"});$E = a$d({a$j: [],a$e: $k,a$f: {$F:
/* T_TestClass::TestClass.main */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
self.$t(nil,$y.$a().$m(nil,$y));
self.$t(nil,$y.$a().$m(nil,$z));
self.$t(nil,$z.$a().$m(nil,$y));
self.$t(nil,$y.$a().$m(nil,$A));
self.$t(nil,$z.$a().$m(nil,$A));
self.$t(nil,$y.$a().$h(nil,$y));
self.$t(nil,$y.$a().$h(nil,$z));
self.$t(nil,$z.$a().$h(nil,$y));
self.$t(nil,$y.$a().$h(nil,$A));
self.$t(nil,$z.$a().$h(nil,$A));
self.$t(nil,$B.$a().$h(nil,$A));
self.$t(nil,$B.$a().$h(nil,$y));
self.$t(nil,$B.$a().$h(nil,$z));
self.$t(nil,$B.$a().$h(nil,$B));
self.$t(nil,$B.$a().$h(nil,$C));
self.$t(nil,$B.$a().$h(nil,$k));
self.$t(nil,$B.$a().$h(nil,$i));
self.$t(nil,$B.$a().$h(nil,$b));
self.$t(nil,"hallo".$z().$e());
self.$t(nil,nil.$z().$e());
self.$t(nil,nil.$m(nil,$D));
self.$t(nil,"hallo".$m(nil,$e));
self.$t(nil,"hallo".$z());
self.$t(nil,$y);
self.$t(nil,$z);
self.$t(nil,$B);
self.$t(nil,$C);
self.$t(nil,$A);
self.$t(nil,$A.$e());
self.$t(nil,$y.$e());
_a=self.$t(nil,$z.$e());
return _a}

},a$c: "T_TestClass::TestClass"});$I = a$d({a$j: [],a$e: $k,a$f: {$F:
/* T_TestCase::TestCase.main */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$a().$I();
return _a}

},a$c: "T_TestCase::TestCase",a$h: {$I:
/* T_TestCase::TestCase#test */
function(){var self,_a,_b,_c,_d;
_d=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=(1).$N(nil,1);
if((_b=(_c=(1).$f(nil,_a), (_c!==false&&_c!==nil) ? _c : ((3).$f(nil,_a))),_b!==false&&_b!==nil)){self.$u(nil,"NOT OKAY")}else{if((_b=(2).$f(nil,_a),_b!==false&&_b!==nil)){self.$u(nil,"OKAY")}else{self.$u(nil,"NOT OKAY")}};
self.$t(nil,$F.$f(nil,[]));
self.$t(nil,$c.$f(nil,$c.$a()));
_a=1;
if((_b=$G.$f(nil,_a),_b!==false&&_b!==nil)){self.$u(nil,"OK")}else{if((_b=(1).$f(nil,_a),_b!==false&&_b!==nil)){self.$u(nil,"OK")}};
_a=_d=4;
if((_b=$H.$a(nil,0,3,false).$f(nil,_a),_b!==false&&_b!==nil)){_d=self.$u(nil,"NOT OKAY")}else{if((_b=$H.$a(nil,1,4,true).$f(nil,_a),_b!==false&&_b!==nil)){_d=self.$u(nil,"NOT OKAY")}else{if((_b=$H.$a(nil,2,4,false).$f(nil,_a),_b!==false&&_b!==nil)){_d=self.$u(nil,"OKAY")}else{_d=nil}}};
return _d}

}});$J = a$d({a$j: [],a$e: $k,a$c: "T_TestLebewesen::Lebewesen",a$h: {$c:
/* T_TestLebewesen::Lebewesen#initialize */
function(_c,_a){var self,_b;
_b=nil;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
_b=self.$aa=_a;
return _b}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==45))return _d.a$a;
throw(_d)}}

}});$K = a$d({a$j: [],a$e: $J,a$c: "T_TestLebewesen::Hund",a$h: {$ab:
/* T_TestLebewesen::Hund#wau */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$u(nil,"wau wau");
return _a}

,$ac:
/* T_TestLebewesen::Hund#jage */
function(_c,_a){var self,_b;
_b=nil;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
_b=self.$u(nil,"ich jage ".$N(nil,_a.$e()));
return _b}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==46))return _d.a$a;
throw(_d)}}

}});$L = a$d({a$j: [],a$e: $k,a$c: "Boolean",a$d: Boolean,a$h: {$P:
/* Boolean#== */
function(_b,_a){var self;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
return (self == _a)}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==47))return _c.a$a;
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

}});$M = a$d({a$j: [],a$e: $k,a$c: "Number",a$d: Number,a$h: {$N:
/* Number#+ */
function(_b,_a){var self;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
return self + _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==51))return _c.a$a;
throw(_c)}}

,$P:
/* Number#== */
function(_b,_a){var self;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
return self == _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==50))return _c.a$a;
throw(_c)}}

,$af:
/* Number#downto */
function(_d,_a){var self,_b,_c;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
_b=self;
while((_c=_b.$ag(nil,_a),_c!==false&&_c!==nil)){_d(_b);
_b=_b.$T(nil,1)};
return self}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==49))return _e.a$a;
throw(_e)}}

,$ad:
/* Number#upto */
function(_d,_a){var self,_b,_c;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
_b=self;
while((_c=_b.$ae(nil,_a),_c!==false&&_c!==nil)){_d(_b);
_b=_b.$N(nil,1)};
return self}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==48))return _e.a$a;
throw(_e)}}

,$ae:
/* Number#<= */
function(_b,_a){var self;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
return self <= _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==52))return _c.a$a;
throw(_c)}}

,$T:
/* Number#- */
function(_b,_a){var self;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
return self - _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==53))return _c.a$a;
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
return self / _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==55))return _c.a$a;
throw(_c)}}

,$o:
/* Number#to_s */
function(_b,_a){var self;
self=this;
try{if(arguments.length>2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
if(_a==null)_a=10;
;
return self.toString(_a)}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==54))return _c.a$a;
throw(_c)}}

,$O:
/* Number#% */
function(_b,_a){var self;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
return self % _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==56))return _c.a$a;
throw(_c)}}

,$am:
/* Number#& */
function(_b,_a){var self;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
return self & _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==60))return _c.a$a;
throw(_c)}}

,$al:
/* Number#< */
function(_b,_a){var self;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
return self < _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==59))return _c.a$a;
throw(_c)}}

,$ak:
/* Number#times */
function(_c){var self,_a,_b;
self=this;
try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=0;
while((_b=_a.$al(nil,self),_b!==false&&_b!==nil)){_c(_a);
_a=_a.$N(nil,1)};
return self}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==58))return _d.a$a;
throw(_d)}}

,$aj:
/* Number#| */
function(_b,_a){var self;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
return self | _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==57))return _c.a$a;
throw(_c)}}

,$ap:
/* Number#-@ */
function(){var self;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
return -self}

,$Q:
/* Number#> */
function(_b,_a){var self;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
return self > _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==62))return _c.a$a;
throw(_c)}}

,$ao:
/* Number#^ */
function(_b,_a){var self;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
return self ^ _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==61))return _c.a$a;
throw(_c)}}

,$an:
/* Number#~ */
function(){var self;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
return ~self}

,$ag:
/* Number#>= */
function(_b,_a){var self;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
return self >= _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==63))return _c.a$a;
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
return self * _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==64))return _c.a$a;
throw(_c)}}

,$aq:
/* Number#+@ */
function(){var self;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
return self}

}});$N = a$d({a$j: [],a$e: $M,a$c: "Bignum",a$d: Number});$O = a$d({a$j: [],a$e: nil,a$c: "T_TestIf"});$P = a$d({a$j: [],a$e: nil,a$c: "T_TestRange"});$Q = a$d({a$j: [],a$e: nil,a$c: "T_TestInsertionSort"});$e = a$d({a$j: [],a$e: $k,a$c: "String",a$d: String,a$h: {$N:
/* String#+ */
function(_b,_a){var self;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
return(self + _a)}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==66))return _c.a$a;
throw(_c)}}

,$as:
/* String#sub */
function(_c,_a,_b){var self;
self=this;
try{if(arguments.length!=3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));
;
self.replace(pattern, replacement)}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==65))return _d.a$a;
throw(_d)}}

,$ax:
/* String#=~ */
function(_b,_a){var self;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;

    var i = self.search(_a);
    return (i == -1 ? nil : i)}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==68))return _c.a$a;
throw(_c)}}

,$au:
/* String#rjust */
function(_f,_a,_b){var self,_c,_d,_e;
self=this;
try{if(arguments.length<2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
if(arguments.length>3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));
if(_b==null)_b=" ";
;
if((_c=_b.$l(),_c!==false&&_c!==nil)){self.$j(nil,$a,"zero width padding")};
_d=_a.$T(nil,self.$av());
if((_c=_d.$ae(nil,0),_c!==false&&_c!==nil)){return self};
_e="";
while(_e.length < _d) _e += _b;;
return _e.$aw(nil,0,_d).$N(nil,self)}catch(_g){if(_g instanceof a$c && (!_g.a$b || _g.a$b==67))return _g.a$a;
throw(_g)}}

,$at:
/* String#size */
function(){var self;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
return self.length}

,$aw:
/* String#[] */
function(_d,_a,_b){var self,_c;
self=this;
try{if(arguments.length<2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
if(arguments.length>3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));
if(_b==null)_b=nil;
;
if((_c=_b.$q(),_c!==false&&_c!==nil)){return self.charAt(_a) || nil}else{if((_c=_b.$al(nil,0),_c!==false&&_c!==nil)){return nil};
return self.substring(_a, _a+_b)}}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==70))return _e.a$a;
throw(_e)}}

,$ay:
/* String#ljust */
function(_f,_a,_b){var self,_c,_d,_e;
self=this;
try{if(arguments.length<2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
if(arguments.length>3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));
if(_b==null)_b=" ";
;
if((_c=_b.$l(),_c!==false&&_c!==nil)){self.$j(nil,$a,"zero width padding")};
_d=_a.$T(nil,self.$av());
if((_c=_d.$ae(nil,0),_c!==false&&_c!==nil)){return self};
_e="";
while(_e.length < _d) _e += _b;;
return self.$N(nil,_e.$aw(nil,0,_d))}catch(_g){if(_g instanceof a$c && (!_g.a$b || _g.a$b==69))return _g.a$a;
throw(_g)}}

,$az:
/* String#split */
function(_b,_a){var self;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
return self.split(_a)}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==71))return _c.a$a;
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

,$av:
/* String#length */
function(){var self;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
return self.length}

,$aA:
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

,$aC:
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
if((_c=_b,_c!==false&&_c!==nil)){_d=_d.$N(nil,_b)}else{_d=_d.$N(nil,_g(_f.$aD()).$o())};
_e = _e.slice(_f.index + _f[0].length);
      } else {
        _d += _e; _e = '';
      }
    } return _d}catch(_h){if(_h instanceof a$c && (!_h.a$b || _h.a$b==73))return _h.a$a;
throw(_h)}}

,$aB:
/* String#index */
function(_c,_a,_b){var self;
self=this;
try{if(arguments.length<2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
if(arguments.length>3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));
if(_b==null)_b=0;
;

    var i = self.indexOf(_a, _b);
    return (i == -1) ? nil : i}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==72))return _d.a$a;
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
_b=self.$aC(function(_c){var _d,_e;
_d=_c==null?nil:_c;
_e=_a[_d];
return _e ? _e : 
        '\\u00' + ("0" + _d.charCodeAt().toString(16)).substring(0,2);},/[\x00-\x1f\\]/);
return ('"' + _b.replace(/"/g, '\\"') + '"');}

}});$R = a$d({a$j: [],a$e: nil,a$c: "T_TestRegexp"});$H = a$d({a$j: [],a$e: $k,a$c: "Range",a$h: {$P:
/* Range#== */
function(_e,_a){var self,_b,_c,_d;
_d=nil;
self=this;
if(self.$aH==null)self.$aH=nil;
if(self.$aE==null)self.$aE=nil;
if(self.$aF==null)self.$aF=nil;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
if (self.constructor != _a.constructor) return false;;
_d=(_b=self.$aE.$P(nil,_a.$aD()), (_b!==false&&_b!==nil) ? ((_c=self.$aF.$P(nil,_a.$aG()), (_c!==false&&_c!==nil) ? (self.$aH.$P(nil,_a.$aI())) : _c)) : _b);
return _d}catch(_f){if(_f instanceof a$c && (!_f.a$b || _f.a$b==74))return _f.a$a;
throw(_f)}}

,$aJ:
/* Range#begin */
function(){var self,_a;
_a=nil;
self=this;
if(self.$aE==null)self.$aE=nil;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$aE;
return _a}

,$g:
/* Range#eql? */
function(_e,_a){var self,_b,_c,_d;
_d=nil;
self=this;
if(self.$aH==null)self.$aH=nil;
if(self.$aE==null)self.$aE=nil;
if(self.$aF==null)self.$aF=nil;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
if (self.constructor != _a.constructor) return false;;
_d=(_b=self.$aE.$g(nil,_a.$aD()), (_b!==false&&_b!==nil) ? ((_c=self.$aF.$g(nil,_a.$aG()), (_c!==false&&_c!==nil) ? (self.$aH.$P(nil,_a.$aI())) : _c)) : _b);
return _d}catch(_f){if(_f instanceof a$c && (!_f.a$b || _f.a$b==75))return _f.a$a;
throw(_f)}}

,$aI:
/* Range#exclude_end? */
function(){var self,_a;
_a=nil;
self=this;
if(self.$aH==null)self.$aH=nil;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$aH;
return _a}

,$aG:
/* Range#last */
function(){var self,_a;
_a=nil;
self=this;
if(self.$aF==null)self.$aF=nil;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$aF;
return _a}

,$o:
/* Range#to_s */
function(){var self,_b,_a;
_a=nil;
self=this;
if(self.$aH==null)self.$aH=nil;
if(self.$aE==null)self.$aE=nil;
if(self.$aF==null)self.$aF=nil;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
if((_b=self.$aH,_b!==false&&_b!==nil)){_a=("" + ((self.$aE).$o()) + ("...") + ((self.$aF).$o()))}else{_a=("" + ((self.$aE).$o()) + ("..") + ((self.$aF).$o()))};
return _a}

,$v:
/* Range#each */
function(_c){var self,_a,_b,_d;
_d=nil;
self=this;
if(self.$aH==null)self.$aH=nil;
if(self.$aE==null)self.$aE=nil;
if(self.$aF==null)self.$aF=nil;
try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$aE;
if((_b=self.$aE.$Q(nil,self.$aF),_b!==false&&_b!==nil)){return nil};
if((_b=self.$aH,_b!==false&&_b!==nil)){while((_b=_a.$al(nil,self.$aF),_b!==false&&_b!==nil)){_c(_a);
_a=_a.$ah()};
_d=nil;
}else{while((_b=_a.$ae(nil,self.$aF),_b!==false&&_b!==nil)){_c(_a);
_a=_a.$ah()};
_d=nil;
};
return _d}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==78))return _e.a$a;
throw(_e)}}

,$aL:
/* Range#end */
function(){var self,_a;
_a=nil;
self=this;
if(self.$aF==null)self.$aF=nil;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$aF;
return _a}

,$aD:
/* Range#first */
function(){var self,_a;
_a=nil;
self=this;
if(self.$aE==null)self.$aE=nil;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$aE;
return _a}

,$aK:
/* Range#include? */
function(_d,_a){var self,_b,_c;
_c=nil;
self=this;
if(self.$aH==null)self.$aH=nil;
if(self.$aE==null)self.$aE=nil;
if(self.$aF==null)self.$aF=nil;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
if((_b=_a.$al(nil,self.$aE),_b!==false&&_b!==nil)){return false};
if((_b=self.$aH,_b!==false&&_b!==nil)){_c=_a.$al(nil,self.$aF)}else{_c=_a.$ae(nil,self.$aF)};
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
(_d=[_a,_b],self.$aE=_d[0]==null?nil:_d[0],self.$aF=_d[1]==null?nil:_d[1],_d);
_e=self.$aH=((_d=_c,_d!==false&&_d!==nil)?true:false);
return _e}catch(_g){if(_g instanceof a$c && (!_g.a$b || _g.a$b==76))return _g.a$a;
throw(_g)}}

,$f:
/* Range#=== */
function(_d,_a){var self,_b,_c;
_c=nil;
self=this;
if(self.$aH==null)self.$aH=nil;
if(self.$aE==null)self.$aE=nil;
if(self.$aF==null)self.$aF=nil;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
if((_b=_a.$al(nil,self.$aE),_b!==false&&_b!==nil)){return false};
if((_b=self.$aH,_b!==false&&_b!==nil)){_c=_a.$al(nil,self.$aF)}else{_c=_a.$ae(nil,self.$aF)};
return _c}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==79))return _e.a$a;
throw(_e)}}

,$9:
/* Range#to_a */
function(){var self,_a,_b,_c;
self=this;
if(self.$aH==null)self.$aH=nil;
if(self.$aE==null)self.$aE=nil;
if(self.$aF==null)self.$aF=nil;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=[];
if((_b=self.$aE.$Q(nil,self.$aF),_b!==false&&_b!==nil)){return _a};
_c=self.$aE;
if((_b=self.$aH,_b!==false&&_b!==nil)){while((_b=_c.$al(nil,self.$aF),_b!==false&&_b!==nil)){_a.$6(nil,_c);
_c=_c.$ah()}}else{while((_b=_c.$ae(nil,self.$aF),_b!==false&&_b!==nil)){_a.$6(nil,_c);
_c=_c.$ah()}};
return _a}

,$i:
/* Range#inspect */
function(){var self,_b,_a;
_a=nil;
self=this;
if(self.$aH==null)self.$aH=nil;
if(self.$aE==null)self.$aE=nil;
if(self.$aF==null)self.$aF=nil;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
if((_b=self.$aH,_b!==false&&_b!==nil)){_a=("" + ((self.$aE.$i()).$o()) + ("...") + ((self.$aF.$i()).$o()))}else{_a=("" + ((self.$aE.$i()).$o()) + ("..") + ((self.$aF.$i()).$o()))};
return _a}

,$aM:
/* Range#member? */
function(_d,_a){var self,_b,_c;
_c=nil;
self=this;
if(self.$aH==null)self.$aH=nil;
if(self.$aE==null)self.$aE=nil;
if(self.$aF==null)self.$aF=nil;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
if((_b=_a.$al(nil,self.$aE),_b!==false&&_b!==nil)){return false};
if((_b=self.$aH,_b!==false&&_b!==nil)){_c=_a.$al(nil,self.$aF)}else{_c=_a.$ae(nil,self.$aF)};
return _c}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==80))return _e.a$a;
throw(_e)}}

}});$q = a$d({a$j: [$u],a$e: $k,a$f: {$J:
/* Hash.new_from_key_value_list */
function(){var self,_a,_b,_c;
self=this;
_a=[];
for(_b=1;_b<arguments.length;_b++)_a.push(arguments[_b]);
;
if((_b=_a.$av().$O(nil,2).$P(nil,0),_b===false||_b===nil)){self.$j(nil,$a)};
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

,$aR:
/* Hash.new_from_jsobject */
function(_d,_a){var self,_b,_c;
_c=nil;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
_c=_b=self.$a();
return _c}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==89))return _e.a$a;
throw(_e)}}

},a$c: "Hash",a$h: {$aw:
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

,$aN:
/* Hash#keys */
function(){var self,_b,_f;
_b=_f=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_f=self.$8(function(_a){var _c,_d;
var _e=nil;
(_b=a$j(_a),_c=_b[0]==null?nil:_b[0],_d=_b[1]==null?nil:_b[1],_b);
_e=_c;
return _e});
return _f}

,$5:
/* Hash#collect */
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
_g=_c.$6(nil,((_f=_b,_f!==false&&_f!==nil)?_b.$L(nil,_e):_e));
return _g});
_h=_c;
return _h}catch(_i){if(_i instanceof a$c && (!_i.a$b || _i.a$b==82))return _i.a$a;
throw(_i)}}

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
_a.$6(nil,_d);
_f=_a.$6(nil,_e);
return _f});
_g=_a.$aO(nil,"");
return _g}

,$aP:
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
    }catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==85))return _d.a$a;
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
    }catch(_b){if(_b instanceof a$c && (!_b.a$b || _b.a$b==84))return _b.a$a;
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

,$7:
/* Hash#find_all */
function(_f){var self,_a,_e,_g;
_g=nil;
self=this;
try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=[];
self.$v(function(_b){var _c;
var _d=nil;
_c=_b==null?nil:_b;
if((_e=_f(_c),_e!==false&&_e!==nil)){_d=_a.$6(nil,_c)}else{_d=nil};
return _d});
_g=_a;
return _g}catch(_h){if(_h instanceof a$c && (!_h.a$b || _h.a$b==83))return _h.a$a;
throw(_h)}}

,$aQ:
/* Hash#values */
function(){var self,_b,_f;
_b=_f=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_f=self.$8(function(_a){var _c,_d;
var _e=nil;
(_b=a$j(_a),_c=_b[0]==null?nil:_b[0],_d=_b[1]==null?nil:_b[1],_b);
_e=_d;
return _e});
return _f}

,$8:
/* Hash#map */
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
_g=_c.$6(nil,((_f=_b,_f!==false&&_f!==nil)?_b.$L(nil,_e):_e));
return _g});
_h=_c;
return _h}catch(_i){if(_i instanceof a$c && (!_i.a$b || _i.a$b==86))return _i.a$a;
throw(_i)}}

,$9:
/* Hash#to_a */
function(){var self,_a,_e;
_e=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=[];
self.$v(function(_b){var _c;
var _d=nil;
_c=_b==null?nil:_b;
_d=_a.$6(nil,_c);
return _d});
_e=_a;
return _e}

,$i:
/* Hash#inspect */
function(){var self,_a,_c,_g;
_c=_g=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a="{";
_a=_a.$N(nil,self.$8(function(_b){var _d,_e;
var _f=nil;
(_c=a$j(_b),_d=_c[0]==null?nil:_c[0],_e=_c[1]==null?nil:_c[1],_c);
_f=_d.$i().$N(nil,"=>").$N(nil,_e.$i());
return _f}).$aO(nil,", "));
_a=_a.$N(nil,"}");
_g=_a;
return _g}

,$_:
/* Hash#reject */
function(_f){var self,_a,_e,_g;
_g=nil;
self=this;
try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=[];
self.$v(function(_b){var _c;
var _d=nil;
_c=_b==null?nil:_b;
if((_e=_f(_c),_e===false||_e===nil)){_d=_a.$6(nil,_c)}else{_d=nil};
return _d});
_g=_a;
return _g}catch(_h){if(_h instanceof a$c && (!_h.a$b || _h.a$b==87))return _h.a$a;
throw(_h)}}

,$$:
/* Hash#select */
function(_f){var self,_a,_e,_g;
_g=nil;
self=this;
try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=[];
self.$v(function(_b){var _c;
var _d=nil;
_c=_b==null?nil:_b;
if((_e=_f(_c),_e!==false&&_e!==nil)){_d=_a.$6(nil,_c)}else{_d=nil};
return _d});
_g=_a;
return _g}catch(_h){if(_h instanceof a$c && (!_h.a$b || _h.a$b==88))return _h.a$a;
throw(_h)}}

}});$S = a$d({a$j: [],a$e: $k,a$c: "T_TestHotRuby::Hoge",a$h: {$aS:
/* T_TestHotRuby::Hoge#add_msg */
function(_a){var self,_b,_c;
_c=nil;
self=this;
_b=_a==null?nil:_a;
try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_c=_b.$L(nil,"is");
return _c}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==90))return _d.a$a;
throw(_d)}}

}});$T = a$d({a$j: [],a$e: $k,a$f: {$F:
/* T_TestString::TestString.main */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$a().$I();
return _a}

},a$c: "T_TestString::TestString",a$h: {$I:
/* T_TestString::TestString#test */
function(){var self,_a,_i;
_i=nil;
self=this;
if(self.$aT==null)self.$aT=nil;
if(self.$aU==null)self.$aU=nil;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
self.$t(nil,"hello");
self.$t(nil,"hallo\b\t\n");
self.$t(nil,"hallo\\leute");
self.$t(nil,"\"super\"");
self.$t(nil,"hello".$aB(nil,"e"));
self.$t(nil,"hello".$aB(nil,"lo"));
self.$t(nil,"hello".$aB(nil,"a"));
self.$t(nil,"hello hello".$aB(nil,"ll"));
self.$t(nil,"hello hello".$aB(nil,"ll",3));
self.$t(nil,"hallo".$aw(nil,0,1));
self.$t(nil,"hallo".$aw(nil,0,2));
self.$t(nil,"hallo".$aw(nil,0,5));
self.$t(nil,"10".$au(nil,10,"0"));
self.$t(nil,"10".$au(nil,1,"blah"));
self.$t(nil,"x".$au(nil,4,"()"));
self.$t(nil,"10".$ay(nil,10,"0"));
self.$t(nil,"10".$ay(nil,1,"blah"));
self.$t(nil,"x".$ay(nil,4,"()"));
self.$t(nil,("abc " + (((1).$N(nil,2)).$o()) + (" def")));
self.$aT="hallo".$i();
self.$aU=4.5;
self.$t(nil,("" + ((self.$aT).$o()) + (",") + ((self.$aU).$o())));
_a="hallo".$aC(nil,"l","r");
self.$t(nil,_a);
_a="hallo".$aC(nil,/ll/,"rr");
self.$t(nil,_a);
_a="hallo".$aC(function(){var _c=nil;
;
_c="r";
return _c},/l/);
self.$t(nil,_a);
_a="hallo".$aC(function(){var _e=nil;
;
_e="blah blah";
return _e},/ll/);
self.$t(nil,_a);
_i="hallllllo".$aC(function(_f){var _g;
var _h=nil;
_g=_f==null?nil:_f;
_h=self.$t(nil,_g);
return _h},/(l)l/);
return _i}

}});$U = a$d({a$j: [],a$e: nil,a$c: "T_TestLebewesen"});$X = a$d({a$j: [],a$e: $k,a$f: {$F:
/* T_TestMassign::TestMassign.main */
function(){var self,_a,_b,_c,_d,_e,_f;
_a=_f=nil;
self=this;
if(self.$aT==null)self.$aT=nil;
if(self.$aV==null)self.$aV=nil;
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
(_a=[1,2,3],self.$aT=_a[0]==null?nil:_a[0],_c=_a[1]==null?nil:_a[1],self.$aV=_a[2]==null?nil:_a[2],_a);
self.$t(nil,self.$aT);
self.$t(nil,_c);
self.$t(nil,self.$aV);
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
self.$t(nil,(typeof($V)=='undefined'?nil:$V));
self.$t(nil,(typeof($W)=='undefined'?nil:$W));
(_a=[1,2],$V=_a[0]==null?nil:_a[0],$W=_a[1]==null?nil:_a[1],_a);
self.$t(nil,(typeof($V)=='undefined'?nil:$V));
self.$t(nil,(typeof($W)=='undefined'?nil:$W));
_f=self.$u(nil,"--");
return _f}

},a$c: "T_TestMassign::TestMassign"});$Y = a$d({a$j: [],a$e: $k,a$c: "T_TestHotRuby::Foo",a$h: {$F:
/* T_TestHotRuby::Foo#main */
function(){var self,_a,_f;
_f=nil;
self=this;
if(self.$aW==null)self.$aW=nil;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a="Action";
self.$aW=" ";
_f=$S.$a().$aS(function(_b){var _c,_d;
var _e=nil;
_c=_b==null?nil:_b;
_d="eloquence";
_e=self.$u(nil,_a.$N(nil,self.$aW).$N(nil,_c).$N(nil,self.$aW).$N(nil,_d).$N(nil," - William Shakespeare"));
return _e});
return _f}

}});$Z = a$d({a$j: [],a$e: nil,a$c: "T_TestMassign"});$0 = a$d({a$j: [],a$e: $k,a$c: "T_TestHotRuby::Pi",a$h: {$c:
/* T_TestHotRuby::Pi#initialize */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$aT=355.0;
return _a}

,$aX:
/* T_TestHotRuby::Pi#calc */
function(){var self,_a;
self=this;
if(self.$aT==null)self.$aT=nil;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=113.0;
return self.$aT.$ai(nil,_a)}

}});$1 = a$d({a$j: [],a$e: nil,a$c: "T_TestExpr"});$2 = a$d({a$j: [],a$e: $k,a$c: "T_TestHotRuby::Foo_"});$3 = a$d({a$j: [],a$e: $k,a$c: "T_TestHotRuby::Foo3"});$A = a$d({a$j: [],a$e: nil,a$c: "T_TestClass::X"});$4 = a$d({a$j: [],a$e: $k,a$f: {$F:
/* T_TestHash::TestHash.main */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$a().$I();
return _a}

},a$c: "T_TestHash::TestHash",a$h: {$B:
/* T_TestHash::TestHash#hash */
function(){var self;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
var el = {}; el["1"] = null; return el}

,$I:
/* T_TestHash::TestHash#test */
function(){var self,_a,_b,_c;
_c=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=$q.$J(nil,"a",6,"b",7,"1",1,1,2,"1,2","hello",[1,2],"good");
self.$t(nil,_a.$aw(nil,"a"));
self.$t(nil,_a.$aw(nil,"b"));
self.$t(nil,_a.$aw(nil,"1"));
self.$t(nil,_a.$aw(nil,1));
self.$t(nil,_a.$aw(nil,"1,2"));
self.$t(nil,_a.$aw(nil,[1,2]));
self.$u(nil,"test native JS hash");
_c=_b=self.$B();
return _c}

}});$5 = a$d({a$j: [],a$e: $k,a$f: {$F:
/* T_TestSplat::TestSplat.main */
function(){var self,_a,_b;
_b=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$a();
_a.$G();
_a.$d(nil,'$G',a$b([]));
_a.$G(nil,1);
_a.$d(nil,'$G',a$b([1]));
_a.$d(nil,'$G',[1].concat(a$b([])));
_a.$G(nil,1,2);
_a.$d(nil,'$G',a$b([1,2]));
_a.$d(nil,'$G',[1].concat(a$b([2])));
_b=_a.$d(nil,'$G',[1].concat(a$b([1,2])));
return _b}

},a$c: "T_TestSplat::TestSplat",a$h: {$G:
/* T_TestSplat::TestSplat#m */
function(){var self,_a,_b,_c;
_c=nil;
self=this;
_a=[];
for(_b=1;_b<arguments.length;_b++)_a.push(arguments[_b]);
;
_c=self.$t(nil,_a);
return _c}

}});$6 = a$d({a$j: [],a$e: nil,a$c: "T_TestInspect"});$7 = a$d({a$j: [],a$e: $k,a$f: {$F:
/* T_TestRegexp::TestRegexp.main */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$a().$I();
return _a}

},a$c: "T_TestRegexp::TestRegexp",a$h: {$I:
/* T_TestRegexp::TestRegexp#test */
function(){var self,_a,_b,_c;
_c=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
if((_a="hallo".$ax(nil,/ll/),_a!==false&&_a!==nil)){self.$t(nil,"okay")};
_b="hallo".$ax(nil,/ll/);
self.$t(nil,_b);
"hallo".$ax(nil,/(ll)/);
self.$t(nil,(RegExp.$1 || nil));
self.$t(nil,(RegExp.$2 || nil));
self.$t(nil,(RegExp.$3 || nil));
"hallo".$ax(nil,/a(ll)(o)/);
self.$t(nil,(RegExp.$1 || nil));
self.$t(nil,(RegExp.$2 || nil));
self.$t(nil,(RegExp.$3 || nil));
_c=self.$t(nil,(RegExp.$4 || nil));
return _c}

}});$8 = a$d({a$j: [],a$e: $k,a$c: "T_TestSend::A",a$h: {$aY:
/* T_TestSend::A#a_method */
function(_d,_a,_b){var self,_c;
_c=nil;
self=this;
try{if(arguments.length!=3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));
;
_c=self.$t(nil,_a,_b);
return _c}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==91))return _e.a$a;
throw(_e)}}

}});$9 = a$d({a$j: [],a$e: $8,a$c: "T_TestSend::B",a$h: {$aY:
/* T_TestSend::B#a_method */
function(_d,_a,_b){var self;
self=this;
var _c=arguments;
try{if(arguments.length!=3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));
;
self.$t(nil,"in B");
a$k(self,'$aY',_c)}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==92))return _e.a$a;
throw(_e)}}

,$aZ:
/* T_TestSend::B#c_method */
function(_c,_a){var self,_b;
_b=nil;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
_b=nil;
return _b}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==93))return _d.a$a;
throw(_d)}}

}});$_ = a$d({a$j: [],a$e: nil,a$c: "T_TestCase"});$y = a$d({a$j: [$A],a$e: $k,a$c: "T_TestClass::A"});$z = a$d({a$j: [],a$e: $y,a$c: "T_TestClass::B"});$B = a$d({a$j: [],a$e: $z,a$c: "T_TestClass::C"});$D = a$d({a$j: [],a$e: $k,a$c: "NilClass",a$d: NilClass,a$h: {$a0:
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

,$a1:
/* NilClass#to_i */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=0;
return _a}

,$9:
/* NilClass#to_a */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=[];
return _a}

,$a2:
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

}});$$ = a$d({a$j: [],a$e: $k,a$c: "Regexp",a$d: RegExp});$aa = a$d({a$j: [],a$e: nil,a$c: "T_TestHash"});$ab = a$d({a$j: [],a$e: $k,a$f: {$F:
/* T_TestArray::TestArray.main */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$a().$I();
return _a}

},a$c: "T_TestArray::TestArray",a$h: {$a4:
/* T_TestArray::TestArray#array */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=[1,2,null,[null,null,4]];
return _a}

,$I:
/* T_TestArray::TestArray#test */
function(){var self,_a,_b;
_b=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=["a","b","b","b","c"];
self.$t(nil,_a.$a3(nil,"b"));
self.$t(nil,_a);
self.$t(nil,_a.$a3(nil,"z"));
self.$u(nil,"test native JS array mapping");
_b=self.$t(nil,self.$a4());
return _b}

}});$ac = a$d({a$j: [],a$e: $k,a$f: {$F:
/* T_TestExpr::TestExpr.main */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$a().$I();
return _a}

},a$c: "T_TestExpr::TestExpr",a$h: {$I:
/* T_TestExpr::TestExpr#test */
function(){var self,_a,_b,_c;
_c=nil;
self=this;
try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=(true?1:2);
self.$t(nil,_a);
(_b=_a=true, (_b!==false&&_b!==nil) ? _b : (a$l(new a$c(nil,null))));
_c=self.$t(nil,_a);
return _c}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==94))return _d.a$a;
throw(_d)}}

}});$ad = a$d({a$j: [],a$e: nil,a$c: "T_TestNew"});$ae = a$d({a$j: [],a$e: nil,a$c: "T_TestArray"});$af = a$d({a$j: [],a$e: $3,a$c: "T_TestHotRuby::Bar3",a$h: {$a5:
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

}});$ag = a$d({a$j: [],a$e: nil,a$c: "T_TestSend"});$ah = a$d({a$j: [],a$e: nil,a$c: "T_TestArgs"});a$d({a$j: [],a$g: $b});$ai = a$d({a$j: [],a$e: $M,a$c: "Float",a$d: Number});$aj = a$d({a$j: [],a$e: $2,a$c: "T_TestHotRuby::Bar_::Baz_",a$h: {$a5:
/* T_TestHotRuby::Bar_::Baz_#run */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
self.$u(nil,"Foo");
_a=self.$u(nil,"Foo");
return _a}

}});$ak = a$d({a$j: [],a$e: $k,a$f: {$F:
/* T_TestSimpleOutput::TestSimpleOutput.main */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$u(nil,"Hello World from RubyJS");
return _a}

},a$c: "T_TestSimpleOutput::TestSimpleOutput"});$F = a$d({a$j: [$u],a$e: $k,a$f: {$a:
/* Array.new */
function(){var self;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
return []}

},a$c: "Array",a$d: Array,a$h: {$N:
/* Array#+ */
function(_b,_a){var self;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
return self.concat(_a)}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==97))return _c.a$a;
throw(_c)}}

,$6:
/* Array#<< */
function(_b,_a){var self;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
self.push(_a); return self}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==96))return _c.a$a;
throw(_c)}}

,$a3:
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
    return del ? _a : nil}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==95))return _c.a$a;
throw(_c)}}

,$at:
/* Array#size */
function(){var self;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
return self.length}

,$aw:
/* Array#[] */
function(_b,_a){var self;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
var v = self[_a]; return (v == null ? nil : v)}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==99))return _c.a$a;
throw(_c)}}

,$a7:
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
    }catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==98))return _c.a$a;
throw(_c)}}

,$a6:
/* Array#reverse */
function(){var self;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
return self.concat().reverse()}

,$5:
/* Array#collect */
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
_g=_c.$6(nil,((_f=_b,_f!==false&&_f!==nil)?_b.$L(nil,_e):_e));
return _g});
_h=_c;
return _h}catch(_i){if(_i instanceof a$c && (!_i.a$b || _i.a$b==100))return _i.a$a;
throw(_i)}}

,$aG:
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
_d=self.$8(function(_a){var _b;
var _c=nil;
_b=_a==null?nil:_a;
_c=_b.$o();
return _c}).$aO();
return _d}

,$aP:
/* Array#[]= */
function(_c,_a,_b){var self;
self=this;
try{if(arguments.length!=3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));
;
return (self[_a] = _b)}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==104))return _d.a$a;
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
    return self}catch(_b){if(_b instanceof a$c && (!_b.a$b || _b.a$b==103))return _b.a$a;
throw(_b)}}

,$a8:
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
    return self}catch(_b){if(_b instanceof a$c && (!_b.a$b || _b.a$b==102))return _b.a$a;
throw(_b)}}

,$aD:
/* Array#first */
function(){var self;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
var v = self[0]; return (v == null ? nil : v)}

,$7:
/* Array#find_all */
function(_f){var self,_a,_e,_g;
_g=nil;
self=this;
try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=[];
self.$v(function(_b){var _c;
var _d=nil;
_c=_b==null?nil:_b;
if((_e=_f(_c),_e!==false&&_e!==nil)){_d=_a.$6(nil,_c)}else{_d=nil};
return _d});
_g=_a;
return _g}catch(_h){if(_h instanceof a$c && (!_h.a$b || _h.a$b==101))return _h.a$a;
throw(_h)}}

,$av:
/* Array#length */
function(){var self;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
return self.length}

,$a9:
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

,$8:
/* Array#map */
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
_g=_c.$6(nil,((_f=_b,_f!==false&&_f!==nil)?_b.$L(nil,_e):_e));
return _g});
_h=_c;
return _h}catch(_i){if(_i instanceof a$c && (!_i.a$b || _i.a$b==105))return _i.a$a;
throw(_i)}}

,$l:
/* Array#empty? */
function(){var self;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
return (self.length == 0)}

,$9:
/* Array#to_a */
function(){var self,_a,_e;
_e=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=[];
self.$v(function(_b){var _c;
var _d=nil;
_c=_b==null?nil:_b;
_d=_a.$6(nil,_c);
return _d});
_e=_a;
return _e}

,$a$:
/* Array#push */
function(){var self,_a,_b;
self=this;
_a=[];
for(_b=1;_b<arguments.length;_b++)_a.push(arguments[_b]);
;
self.push.apply(self, _a); return self}

,$a_:
/* Array#to_ary */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self;
return _a}

,$bc:
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
_a=_a.$N(nil,self.$8(function(_b){var _c;
var _d=nil;
_c=_b==null?nil:_b;
_d=_c.$i();
return _d}).$aO(nil,", "));
_a=_a.$N(nil,"]");
_e=_a;
return _e}

,$bb:
/* Array#reverse! */
function(){var self;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
self.reverse(); return self}

,$ba:
/* Array#unshift */
function(){var self,_a,_b;
self=this;
_a=[];
for(_b=1;_b<arguments.length;_b++)_a.push(arguments[_b]);
;
self.unshift.apply(self, _a); return self}

,$_:
/* Array#reject */
function(_f){var self,_a,_e,_g;
_g=nil;
self=this;
try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=[];
self.$v(function(_b){var _c;
var _d=nil;
_c=_b==null?nil:_b;
if((_e=_f(_c),_e===false||_e===nil)){_d=_a.$6(nil,_c)}else{_d=nil};
return _d});
_g=_a;
return _g}catch(_h){if(_h instanceof a$c && (!_h.a$b || _h.a$b==106))return _h.a$a;
throw(_h)}}

,$aO:
/* Array#join */
function(_i,_a){var self,_b,_d,_h;
_h=nil;
self=this;
try{if(arguments.length>2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
if(_a==null)_a="";
;
_b="";
self.$a8(function(_c){var _e,_f;
var _g=nil;
(_d=a$j(_c),_e=_d[0]==null?nil:_d[0],_f=_d[1]==null?nil:_d[1],_d);
_b=_b.$N(nil,_e.$o());
if((_d=_f.$P(nil,self.$av().$T(nil,1)),_d===false||_d===nil)){_g=_b=_b.$N(nil,_a)}else{_g=nil};
return _g});
_h=_b;
return _h}catch(_j){if(_j instanceof a$c && (!_j.a$b || _j.a$b==108))return _j.a$a;
throw(_j)}}

,$$:
/* Array#select */
function(_f){var self,_a,_e,_g;
_g=nil;
self=this;
try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=[];
self.$v(function(_b){var _c;
var _d=nil;
_c=_b==null?nil:_b;
if((_e=_f(_c),_e!==false&&_e!==nil)){_d=_a.$6(nil,_c)}else{_d=nil};
return _d});
_g=_a;
return _g}catch(_h){if(_h instanceof a$c && (!_h.a$b || _h.a$b==107))return _h.a$a;
throw(_h)}}

}});$al = a$d({a$j: [],a$e: $k,a$c: "T_TestHotRuby::Object"});$am = a$d({a$j: [],a$e: $k,a$f: {$F:
/* T_TestNew::TestNew.main */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$a().$I();
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

,$I:
/* T_TestNew::TestNew#test */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$u(nil,"test");
return _a}

}});$an = a$d({a$j: [],a$e: $k,a$f: {$F:
/* T_TestInsertionSort::TestInsertionSort.main */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$a().$bd(nil,[3,6,2,5,3,7,1,8]);
return _a}

},a$c: "T_TestInsertionSort::TestInsertionSort",a$h: {$bd:
/* T_TestInsertionSort::TestInsertionSort#sort */
function(_j,_a){var self,_c,_d,_e,_f,_g,_i;
_i=nil;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
self.$u(nil,"Before insertion sort:");
self.$t(nil,_a);
$H.$a(nil,1,_a.$av().$T(nil,1),false).$v(function(_b){var _h=nil;
_c=_b==null?nil:_b;
_d=_c;
while((_e=(_f=_d.$ag(nil,1), (_f!==false&&_f!==nil) ? (_a.$aw(nil,_d).$al(nil,_a.$aw(nil,_d.$T(nil,1)))) : _f),_e!==false&&_e!==nil)){if((_e=_a.$aw(nil,_d).$al(nil,_a.$aw(nil,_d.$T(nil,1))),_e!==false&&_e!==nil)){_g=_a.$aw(nil,_d);
_a.$aP(nil,_d,_a.$aw(nil,_d.$T(nil,1)));
_a.$aP(nil,_d.$T(nil,1),_g)};
_d=_d.$T(nil,1)};
_h=nil;
;
return _h});
self.$u(nil,"After insertion sort:");
_i=self.$t(nil,_a);
return _i}catch(_k){if(_k instanceof a$c && (!_k.a$b || _k.a$b==109))return _k.a$a;
throw(_k)}}

}});$ao = a$d({a$j: [],a$e: nil,a$c: "T_TestSplat"});$ap = a$d({a$j: [],a$e: $k,a$c: "T_TestSend::C",a$h: {$n:
/* T_TestSend::C#method_missing */
function(_d,_a){var self,_b,_c,_e,_f;
_f=nil;
self=this;
_e=_d==null?nil:_d;
try{if(arguments.length<2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
_b=[];
for(_c=2;_c<arguments.length;_c++)_b.push(arguments[_c]);
;
_f=self.$t(nil,("mm: " + ((_a).$o()) + (", ") + ((_b).$o())));
return _f}catch(_g){if(_g instanceof a$c && (!_g.a$b || _g.a$b==110))return _g.a$a;
throw(_g)}}

}});$aq = a$d({a$j: [],a$e: nil,a$c: "T_TestException"});$h = a$d({a$j: [],a$e: $k,a$f: {$a:
/* Proc.new */
function(_a){var self,_b,_c;
self=this;
_b=_a==null?nil:_a;
try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
if((_c=_b,_c===false||_c===nil)){self.$j(nil,$a,"tried to create Proc object without a block")};
return (function() {
      try {
        return _b.$L.apply(_b, arguments);
      } catch(e) 
      {
        if (e instanceof a$c) 
        {
          if (e.a$b == null)
          {;
self.$j(nil,$s,"break from proc-closure");
}
          return e.a$a;
        }
        else throw(e);
      }
    })}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==111))return _d.a$a;
throw(_d)}}

},a$c: "Proc",a$d: Function,a$h: {$L:
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

}});$j = a$d({a$j: [],a$e: $k,a$c: "Method",a$h: {$c:
/* Method#initialize */
function(_f,_a,_b){var self,_c,_d,_e;
_e=nil;
self=this;
try{if(arguments.length!=3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));
;
(_c=[_a,_b],self.$be=_c[0]==null?nil:_c[0],self.$bf=_c[1]==null?nil:_c[1],_c);
_d=nil;
_d = _a[a$f[_b]];
    if (_d==null) _d = nil;;
if((_c=_d,_c!==false&&_c!==nil)){_e=self.$bg=_d}else{_e=self.$j(nil,$m,("undefined method `" + ((_b).$o()) + ("' for class `") + ((_a.$z().$e()).$o()) + ("'")))};
return _e}catch(_g){if(_g instanceof a$c && (!_g.a$b || _g.a$b==112))return _g.a$a;
throw(_g)}}

,$L:
/* Method#call */
function(_c){var self,_a,_b,_d;
self=this;
_d=_c==null?nil:_c;
try{_a=[];
for(_b=1;_b<arguments.length;_b++)_a.push(arguments[_b]);
;
return self.$bg.apply(self.$be, [_d].concat(_a))}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==113))return _e.a$a;
throw(_e)}}

,$i:
/* Method#inspect */
function(){var self,_a;
_a=nil;
self=this;
if(self.$be==null)self.$be=nil;
if(self.$bf==null)self.$bf=nil;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=("#<Method: " + ((self.$be.$z().$e()).$o()) + ("#") + ((self.$bf).$o()) + (">"));
return _a}

}});$s = a$d({a$j: [],a$e: $l,a$c: "LocalJumpError"});$ar = a$d({a$j: [],a$e: $k,a$c: "T_TestHotRuby::Bar_"});$C = a$d({a$j: [],a$e: $k,a$c: "T_TestClass::D"});$as = a$d({a$j: [],a$e: $k,a$c: "T_TestHotRuby::Foo2"});$at = a$d({a$j: [],a$e: $k,a$f: {$F:
/* T_TestRange::TestRange.main */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$a().$I();
return _a}

},a$c: "T_TestRange::TestRange",a$h: {$I:
/* T_TestRange::TestRange#test */
function(){var _j,self,_a,_b,_i,_n;
_n=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=$H.$a(nil,0,2);
self.$t(nil,_a.$aD());
self.$t(nil,_a.$aG());
self.$t(nil,_a);
_b=1;
self.$t(nil,$H.$a(nil,_b,_b.$N(nil,5),false).$o());
self.$t(nil,$H.$a(nil,_b,_b.$N(nil,_b),true).$o());
self.$t(nil,$H.$a(nil,0,2,false).$o());
self.$t(nil,$H.$a(nil,0,2,true).$o());
$H.$a(nil,0,4,false).$v(function(_c){var _d=nil;
_b=_c==null?nil:_c;
_d=self.$t(nil,_b);
return _d});
$H.$a(nil,0,4,true).$v(function(_e){var _f=nil;
_b=_e==null?nil:_e;
_f=self.$t(nil,_b);
return _f});
$H.$a(nil,-1,-4,false).$v(function(_g){var _h=nil;
_b=_g==null?nil:_g;
_h=self.$t(nil,_b);
return _h});
self.$t(nil,$H.$a(nil,0,4,false).$aK(nil,4));
self.$t(nil,$H.$a(nil,0,4,false).$aK(nil,5));
self.$t(nil,$H.$a(nil,0,4,true).$aK(nil,5));
self.$t(nil,$H.$a(nil,0,4,true).$aK(nil,4));
self.$t(nil,$H.$a(nil,0,4,true).$aK(nil,3));
self.$t(nil,$H.$a(nil,0,4,true).$aK(nil,0));
self.$t(nil,$H.$a(nil,0,4,true).$aK(nil,-1));
self.$t(nil,$H.$a(nil,-1,-5,false).$9());
self.$t(nil,$H.$a(nil,-5,-1,false).$9());
_i=$H.$a(nil,0,4);
self.$t(nil,_i.$aD());
self.$t(nil,_i.$aJ());
self.$t(nil,_i.$aG());
self.$t(nil,_i.$aL());
self.$t(nil,_i.$aI());
_i=$H.$a(nil,1,5,true);
self.$t(nil,_i.$aD());
self.$t(nil,_i.$aJ());
self.$t(nil,_i.$aG());
self.$t(nil,_i.$aL());
self.$t(nil,_i.$aI());
self.$t(nil,false.$P(nil,false));
self.$t(nil,false.$P(nil,true));
self.$t(nil,true.$P(nil,false));
self.$t(nil,true.$P(nil,true));
self.$t(nil,$H.$a(nil,0,2,false).$P(nil,$H.$a(nil,0,2,false)));
self.$t(nil,$H.$a(nil,0,2,false).$P(nil,$H.$a(nil,0,2)));
self.$t(nil,$H.$a(nil,0,2,false).$P(nil,$H.$a(nil,0,2,true)));
_j=55;
self.$t(nil,_j);
$H.$a(nil,1,100,false).$v(function(_k){var _l=nil;
_b=_k==null?nil:_k;
_l=_j=_b;
return _l});
self.$t(nil,_j);
_j=54;
self.$t(nil,_j);
$H.$a(nil,1,100,false).$v(function(_m){_j=_m==null?nil:_m;
});
_n=self.$t(nil,_j);
return _n}

}});$au = a$d({a$j: [],a$e: $as,a$c: "T_TestHotRuby::Bar2",a$h: {$a5:
/* T_TestHotRuby::Bar2#run */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$u(nil,"Foo");
return _a}

}});$aw = a$d({a$j: [],a$e: $k,a$f: {$F:
/* T_TestLebewesen::TestLebewesen.main */
function(){var self,_a,_b,_c,_d;
_d=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=$av.$a(nil,"AA-BB","Leni");
_b=$av.$a(nil,"AC-DC","Flocki");
_c=$K.$a(nil,"AA-ZZ");
_a.$bh();
_c.$ab();
_d=_c.$ac(nil,_a);
return _d}

},a$c: "T_TestLebewesen::TestLebewesen"});$ax = a$d({a$j: [],a$e: $k,a$f: {$F:
/* T_TestIf::TestIf.main */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$a().$I();
return _a}

},a$c: "T_TestIf::TestIf",a$h: {$I:
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
if((_a=(_b=(5).$al(nil,6), (_b!==false&&_b!==nil) ? ((6).$al(nil,7)) : _b),_a!==false&&_a!==nil)){self.$u(nil,"OK")};
self.$t(nil,(_a=false, (_a!==false&&_a!==nil) ? _a : ("a")));
self.$t(nil,(_a=nil, (_a!==false&&_a!==nil) ? _a : ("a")));
self.$t(nil,(_a=true, (_a!==false&&_a!==nil) ? _a : ("a")));
self.$t(nil,(_a="b", (_a!==false&&_a!==nil) ? _a : ("a")));
self.$t(nil,(_a=false, (_a!==false&&_a!==nil) ? ("a") : _a));
self.$t(nil,(_a=nil, (_a!==false&&_a!==nil) ? ("a") : _a));
self.$t(nil,(_a=true, (_a!==false&&_a!==nil) ? ("a") : _a));
_f=self.$t(nil,(_a="b", (_a!==false&&_a!==nil) ? ("a") : _a));
return _f}

}});$a = a$d({a$j: [],a$e: $l,a$c: "ArgumentError"});$G = a$d({a$j: [],a$e: $M,a$c: "Fixnum",a$d: Number});$ay = a$d({a$j: [],a$e: nil,a$c: "T_TestYield"});$az = a$d({a$j: [],a$e: $as,a$c: "T_TestHotRuby::Object::Bar2",a$h: {$a5:
/* T_TestHotRuby::Object::Bar2#run */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$u(nil,"Foo");
return _a}

}});$aA = a$d({a$j: [],a$e: $k,a$f: {$F:
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

},a$c: "T_TestException::TestException"});$aB = a$d({a$j: [],a$e: nil,a$c: "T_TestClass"});$aC = a$d({a$j: [],a$e: nil,a$c: "T_TestHotRuby"});$av = a$d({a$j: [],a$e: $J,a$c: "T_TestLebewesen::Katze",a$h: {$e:
/* T_TestLebewesen::Katze#name */
function(){var self,_a;
_a=nil;
self=this;
if(self.$bi==null)self.$bi=nil;
_a=self.$bi;
return _a}

,$c:
/* T_TestLebewesen::Katze#initialize */
function(_d,_a,_b){var self,_c;
_c=nil;
self=this;
try{if(arguments.length!=3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));
;
a$m(self,'$c',nil,[_a]);
_c=self.$bi=_b;
return _c}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==114))return _e.a$a;
throw(_e)}}

,$bh:
/* T_TestLebewesen::Katze#miau */
function(){var self,_a;
_a=nil;
self=this;
if(self.$bi==null)self.$bi=nil;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$u(nil,"miau, ich bin ".$N(nil,self.$bi));
return _a}

}});$aD = a$d({a$j: [],a$e: $k,a$f: {$F:
/* T_TestSend::TestSend.main */
function(){var self,_b,_c,_d,_e;
_e=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
self.$u(nil,"send");
self.$t(nil,$8.$a().$w(nil,"a_method",1,2));
self.$t(nil,$9.$a().$w(nil,"a_method",1,2));
self.$u(nil,"respond_to?");
self.$t(nil,$8.$a().$r(nil,"a_method"));
self.$t(nil,$8.$a().$r(nil,"to_s"));
self.$t(nil,$8.$a().$r(nil,"inspect"));
self.$t(nil,$8.$a().$r(nil,"b_method"));
self.$t(nil,$8.$a().$r(nil,"c_method"));
self.$u(nil,"method_missing");
self.$t(nil,$ap.$a().$r(nil,"blah_blah"));
$ap.$a().$bj(nil,1,2,3);
try{$8.$a().$bj();
self.$u(nil,"FAILURE?")}catch(_a){if(_a instanceof a$c)throw(_a);
if((_b=$g.$f(nil,_a),_b!==false&&_b!==nil)){self.$u(nil,"catched!!!")}else{throw(_a)}};
try{$8.$bk()}catch(_a){if(_a instanceof a$c)throw(_a);
if((_b=$g.$f(nil,_a),_b!==false&&_b!==nil)){self.$t(nil,"goood")}else{throw(_a)}};
self.$u(nil,"class Method");
_c="hallo".$C(nil,"to_s");
self.$t(nil,_c);
self.$t(nil,_c.$L());
_d=[1,2,3];
_c=_d.$C(nil,"+");
self.$t(nil,_c);
self.$t(nil,_c.$L(nil,[2,3]));
self.$t(nil,_c);
_e=self.$t(nil,_d);
return _e}

},a$c: "T_TestSend::TestSend"});$aF = a$d({a$j: [],a$e: $k,a$f: {$F:
/* TestSuite.main */
function(){var self,_c,_d,_b;
_b=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
try{self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
self.$u(nil,"Test hash");
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
$4.$F();
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
self.$u(nil,"Test yield");
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
$t.$F();
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
self.$u(nil,"Test insertion sort");
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
$an.$F();
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
self.$u(nil,"Test lebewesen");
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
$aw.$F();
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
self.$u(nil,"Test expr");
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
$ac.$F();
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
self.$u(nil,"Test simple output");
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
$ak.$F();
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
self.$u(nil,"Test if");
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
$ax.$F();
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
self.$u(nil,"Test class");
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
$E.$F();
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
self.$u(nil,"Test case");
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
$I.$F();
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
self.$u(nil,"Test splat");
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
$5.$F();
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
self.$u(nil,"Test string");
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
$T.$F();
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
self.$u(nil,"Test inspect");
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
$r.$F();
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
self.$u(nil,"Test regexp");
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
$7.$F();
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
self.$u(nil,"Test args");
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
$o.$F();
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
self.$u(nil,"Test array");
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
$ab.$F();
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
self.$u(nil,"Test eql");
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
$n.$F();
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
self.$u(nil,"Test send");
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
$aD.$F();
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
self.$u(nil,"Test range");
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
$at.$F();
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
self.$u(nil,"Test massign");
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
$X.$F();
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
self.$u(nil,"Test hot ruby");
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
$aE.$F();
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
self.$u(nil,"Test new");
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
$am.$F();
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
self.$u(nil,"Test exception");
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
_b=$aA.$F()}catch(_a){if(_a instanceof a$c)throw(_a);
if((_d=$f.$f(nil,_a),_d!==false&&_d!==nil)){_c=_a;
self.$t(nil,"unhandled exception");
_b=self.$t(nil,_c)}else{throw(_a)}};
return _b}

},a$c: "TestSuite"});$d = a$d({a$j: [],a$e: $l,a$c: "TypeError"});$aE = a$d({a$j: [],a$e: $k,a$f: {$F:
/* T_TestHotRuby::TestHotRuby.main */
function(){var self,_a,_b,_c;
_c=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$a();
self.$u(nil,"InsertionSort");
_a.$bd(nil,[3,6,2,5,3,7,1,8]);
self.$u(nil,"Array args");
_b=[" World ","!"];
_a.$d(nil,'$bl',["Hello"].concat(a$b(_b)));
self.$u(nil,"Block");
$Y.$a().$F();
self.$u(nil,"Class");
self.$u(nil,"PI is about");
self.$u(nil,$0.$a().$aX().$o().$aw(nil,0,13));
_c=self.$u(nil,"Const");
return _c}

},a$c: "T_TestHotRuby::TestHotRuby",a$h: {$bl:
/* T_TestHotRuby::TestHotRuby#addPrint */
function(_e,_a,_b,_c){var self,_d;
_d=nil;
self=this;
try{if(arguments.length!=4)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 3)'));
;
_d=self.$u(nil,_a.$N(nil,_b).$N(nil,_c));
return _d}catch(_f){if(_f instanceof a$c && (!_f.a$b || _f.a$b==115))return _f.a$a;
throw(_f)}}

,$bd:
/* T_TestHotRuby::TestHotRuby#sort */
function(_j,_a){var self,_c,_d,_e,_f,_g,_i;
_i=nil;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
self.$u(nil,"Before insertion sort:");
self.$t(nil,_a);
$H.$a(nil,1,_a.$av().$T(nil,1),false).$v(function(_b){var _h=nil;
_c=_b==null?nil:_b;
_d=_c;
while((_e=(_f=_d.$ag(nil,1), (_f!==false&&_f!==nil) ? (_a.$aw(nil,_d).$al(nil,_a.$aw(nil,_d.$T(nil,1)))) : _f),_e!==false&&_e!==nil)){if((_e=_a.$aw(nil,_d).$al(nil,_a.$aw(nil,_d.$T(nil,1))),_e!==false&&_e!==nil)){_g=_a.$aw(nil,_d);
_a.$aP(nil,_d,_a.$aw(nil,_d.$T(nil,1)));
_a.$aP(nil,_d.$T(nil,1),_g)};
_d=_d.$T(nil,1)};
_h=nil;
;
return _h});
self.$u(nil,"After insertion sort:");
_i=self.$t(nil,_a);
return _i}catch(_k){if(_k instanceof a$c && (!_k.a$b || _k.a$b==116))return _k.a$a;
throw(_k)}}

}});      $b.a$e = $k;
var a$n = [$i,$k,$f,$l,$m,$g,$n,$o,$p,$r,$t,$u,$c,$v,$w,$x,$E,$I,$J,$K,$L,$M,$N,$O,$P,$Q,$e,$R,$H,$q,$S,$T,$U,$X,$Y,$Z,$0,$1,$2,$3,$A,$4,$5,$6,$7,$8,$9,$_,$y,$z,$B,$D,$$,$aa,$ab,$ac,$ad,$ae,$af,$ag,$ah,$b,$ai,$aj,$ak,$F,$al,$am,$an,$ao,$ap,$aq,$h,$j,$s,$ar,$C,$as,$at,$au,$aw,$ax,$a,$G,$ay,$az,$aA,$aB,$aC,$av,$aD,$aF,$d,$aE];
a$o(a$n);
for (var i=0; i<a$n.length; i++) a$p(a$n[i]);
function main() { return $aF.$F.apply($aF, arguments); }var STDOUT_LINE_NO = 0;
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
