// declare nil
function NilClass() {}

// FIXME: remove
NilClass.prototype.toString = function() { return "nil"; };
nil = new NilClass();

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
    fn.a$i = true;
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
function a$k(a)
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
// method map
var a$h = {"$F":"test","$L":"end","$aq":"sub","$v":"each","$aD":"m","$x":"loop","$aE":"to_f","$ah":"%","$1":"collect","$0":"member?","$aP":"test_three_times_indirect","$ak":"&","$aY":"three_times_yield","$ab":"new_from_key_value_list","$aL":"test_loop2","$f":"===","$aK":"three_times_block","$N":"==","$a0":"reverse","$aQ":"three_times_indirect","$4":"map","$ad":"downto","$aF":"to_i","$aj":"times","$I":"include?","$t":"p","$s":"proc","$b":"allocate","$7":"keys","$5":"reject","$aT":"three_times_yield2","$ar":"size","$ap":"*","$$":"+","$O":"delete","$a6":"unshift","$_":"values","$aO":"return_in_block","$ac":"upto","$a8":"dup","$as":"rjust","$af":"-","$a_":"not_a_method","$q":"nil?","$a":"new","$a5":"push","$aN":"test_while_loop","$ag":"/","$2":"call","$D":"message","$y":"is_a?","$av":"split","$C":"main","$e":"name","$l":"empty?","$aG":"to_splat","$aC":"jage","$j":"raise","$at":"length","$o":"to_s","$a1":"clear","$ae":">=","$R":"c_method","$P":"array","$ai":"|","$h":"kind_of?","$3":"find_all","$al":"~","$aM":"loop2","$8":"[]","$aw":"strip","$aS":"test_three_times_yield2","$an":"-@","$aX":"test_return_in_block","$9":"[]=","$Y":"succ","$a7":"reverse!","$B":"hash","$z":"class","$i":"inspect","$am":"^","$aU":"test_three_times_block","$aW":"test_three_times_yield","$a3":"pop","$p":"__send","$g":"eql?","$V":"<","$aB":"wau","$G":"first","$K":"begin","$Z":"<<","$au":"ljust","$d":"__invoke","$X":">","$W":"<=","$c":"initialize","$w":"send","$Q":"a_method","$r":"respond_to?","$aV":"test_loop","$k":"shift","$a9":"blah_blah","$M":"exclude_end?","$ao":"+@","$6":"select","$aA":"miau","$J":"to_a","$n":"method_missing","$ax":"index","$a2":"each_with_index","$aa":"join","$aR":"test_proc","$A":"tap","$H":"last","$m":"instance_of?","$a4":"to_ary","$ay":"gsub","$u":"puts","$az":"match"};
var a$f = {};
for (var i in a$h) a$f[a$h[i]] = i;
$b = a$d({a$e: nil,a$f: {$a:
/* Class.new */
function(_e,_a,_b,_c){var self,_d;
self=this;
try{if(arguments.length<3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));
if(arguments.length>4)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 3)'));
if(_c===undefined)_c=nil;
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
_d=_c===undefined?nil:_c;
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
_e=_d===undefined?nil:_d;
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
_e=_d===undefined?nil:_d;
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
_c=_d=nil;
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
_b=_a===undefined?nil:_a;
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
_d=_c===undefined?nil:_c;
_e=self.$u(nil,_d.$i());
return _e});
_f=nil;
return _f}

,$d:
/* Kernel#__invoke */
function(_c,_a,_b){var self,_d;
self=this;
_d=_c===undefined?nil:_c;
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
if(_a===undefined)_a="";
;
_a=_a.$o();
STDOUT.push(_a)}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==9))return _c.a$a;
throw(_c)}}

,$w:
/* Kernel#send */
function(_d,_a){var self,_b,_c,_e;
self=this;
_e=_d===undefined?nil:_d;
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

}});$j = a$d({a$j: [$i],a$e: nil,a$c: "Object",a$h: {$h:
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

}});$k = a$d({a$j: [],a$e: $j,a$f: {$C:
/* T_TestSimpleOutput::TestSimpleOutput.main */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$u(nil,"Hello World from RubyJS");
return _a}

},a$c: "T_TestSimpleOutput::TestSimpleOutput"});$l = a$d({a$j: [],a$e: $j,a$c: "Regexp",a$d: RegExp});$m = a$d({a$j: [],a$e: $j,a$c: "T_TestClass::D"});$n = a$d({a$j: [],a$e: nil,a$c: "T_TestNew"});$o = a$d({a$j: [],a$e: $j,a$f: {$C:
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

},a$c: "T_TestEql::TestEql"});$f = a$d({a$j: [],a$e: $j,a$c: "Exception",a$h: {$D:
/* Exception#message */
function(){var self,_a;
_a=nil;
self=this;
if(self.$E===undefined)self.$E=nil;
_a=self.$E;
return _a}

,$o:
/* Exception#to_s */
function(){var self,_a;
_a=nil;
self=this;
if(self.$E===undefined)self.$E=nil;
_a=self.$E;
return _a}

,$c:
/* Exception#initialize */
function(_d,_a){var self,_c,_b;
_b=nil;
self=this;
try{if(arguments.length>2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
if(_a===undefined)_a=nil;
;
if((_c=_a.$q(),_c!==false&&_c!==nil)){_b=self.$E=self.$z().$e()}else{_b=self.$E=_a};
return _b}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==17))return _e.a$a;
throw(_e)}}

,$i:
/* Exception#inspect */
function(){var self,_a;
_a=nil;
self=this;
if(self.$E===undefined)self.$E=nil;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=("#<" + (self.$z().$e()).$o() + (": ").$o() + (self.$E).$o() + (">").$o());
return _a}

}});$p = a$d({a$j: [],a$e: $f,a$c: "StandardError"});$r = a$d({a$j: [],a$e: $j,a$f: {$C:
/* T_TestRange::TestRange.main */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$a().$F();
return _a}

},a$c: "T_TestRange::TestRange",a$h: {$F:
/* T_TestRange::TestRange#test */
function(){var self,_a,_i,_j;
_a=_i=_j=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=$q.$a(nil,0,2);
self.$t(nil,_a.$G());
self.$t(nil,_a.$H());
self.$t(nil,_a);
self.$t(nil,$q.$a(nil,0,2,false).$o());
self.$t(nil,$q.$a(nil,0,2,true).$o());
$q.$a(nil,0,4,false).$v(function(_b){var _c;
var _d=nil;
_c=_b===undefined?nil:_b;
_d=self.$t(nil,_c);
return _d});
$q.$a(nil,0,4,true).$v(function(_e){var _c;
var _f=nil;
_c=_e===undefined?nil:_e;
_f=self.$t(nil,_c);
return _f});
$q.$a(nil,-1,-4,false).$v(function(_g){var _c;
var _h=nil;
_c=_g===undefined?nil:_g;
_h=self.$t(nil,_c);
return _h});
self.$t(nil,$q.$a(nil,0,4,false).$I(nil,4));
self.$t(nil,$q.$a(nil,0,4,false).$I(nil,5));
self.$t(nil,$q.$a(nil,0,4,true).$I(nil,5));
self.$t(nil,$q.$a(nil,0,4,true).$I(nil,4));
self.$t(nil,$q.$a(nil,0,4,true).$I(nil,3));
self.$t(nil,$q.$a(nil,0,4,true).$I(nil,0));
self.$t(nil,$q.$a(nil,0,4,true).$I(nil,-1));
self.$t(nil,$q.$a(nil,-1,-5,false).$J());
self.$t(nil,$q.$a(nil,-5,-1,false).$J());
_i=$q.$a(nil,0,4);
self.$t(nil,_i.$G());
self.$t(nil,_i.$K());
self.$t(nil,_i.$H());
self.$t(nil,_i.$L());
self.$t(nil,_i.$M());
_i=$q.$a(nil,1,5,true);
self.$t(nil,_i.$G());
self.$t(nil,_i.$K());
self.$t(nil,_i.$H());
self.$t(nil,_i.$L());
self.$t(nil,_i.$M());
self.$t(nil,false.$N(nil,false));
self.$t(nil,false.$N(nil,true));
self.$t(nil,true.$N(nil,false));
self.$t(nil,true.$N(nil,true));
self.$t(nil,$q.$a(nil,0,2,false).$N(nil,$q.$a(nil,0,2,false)));
self.$t(nil,$q.$a(nil,0,2,false).$N(nil,$q.$a(nil,0,2)));
_j=self.$t(nil,$q.$a(nil,0,2,false).$N(nil,$q.$a(nil,0,2,true)));
return _j}

}});$s = a$d({a$j: [],a$e: $p,a$c: "NameError"});$g = a$d({a$j: [],a$e: $s,a$c: "NoMethodError"});$t = a$d({a$j: [],a$e: nil,a$c: "T_TestClass::X"});$u = a$d({a$j: [$t],a$e: $j,a$c: "T_TestClass::A"});$v = a$d({a$j: [],a$e: $u,a$c: "T_TestClass::B"});$w = a$d({a$j: [],a$e: $v,a$c: "T_TestClass::C"});$x = a$d({a$j: [],a$e: nil,a$c: "T_TestArgs"});$y = a$d({a$j: [],a$e: $j,a$f: {$C:
/* T_TestArray::TestArray.main */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$a().$F();
return _a}

},a$c: "T_TestArray::TestArray",a$h: {$P:
/* T_TestArray::TestArray#array */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=[1,2,null,[null,null,4]];
return _a}

,$F:
/* T_TestArray::TestArray#test */
function(){var self,_a,_b;
_a=_b=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=["a","b","b","b","c"];
self.$t(nil,_a.$O(nil,"b"));
self.$t(nil,_a);
self.$t(nil,_a.$O(nil,"z"));
self.$u(nil,"test native JS array mapping");
_b=self.$t(nil,self.$P());
return _b}

}});$z = a$d({a$j: [],a$e: $j,a$c: "T_TestSend::A",a$h: {$Q:
/* T_TestSend::A#a_method */
function(_d,_a,_b){var self,_c;
_c=nil;
self=this;
try{if(arguments.length!=3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));
;
_c=self.$t(nil,_a,_b);
return _c}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==18))return _e.a$a;
throw(_e)}}

}});$A = a$d({a$j: [],a$e: $z,a$c: "T_TestSend::B",a$h: {$Q:
/* T_TestSend::B#a_method */
function(_d,_a,_b){var self;
self=this;
var _c=arguments;
try{if(arguments.length!=3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));
;
self.$t(nil,"in B");
a$j(self,'$Q',_c)}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==19))return _e.a$a;
throw(_e)}}

,$R:
/* T_TestSend::B#c_method */
function(_c,_a){var self,_b;
_b=nil;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
_b=nil;
return _b}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==20))return _d.a$a;
throw(_d)}}

}});$P = a$d({a$j: [],a$e: $j,a$f: {$C:
/* TestSuite.main */
function(){var self,_c,_d,_b;
_c=_b=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
try{self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
self.$u(nil,"Test splat");
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
$B.$C();
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
self.$u(nil,"Test simple output");
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
$k.$C();
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
self.$u(nil,"Test new");
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
$C.$C();
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
self.$u(nil,"Test massign");
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
$D.$C();
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
self.$u(nil,"Test send");
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
$E.$C();
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
self.$u(nil,"Test if");
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
$F.$C();
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
self.$u(nil,"Test hash");
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
$G.$C();
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
self.$u(nil,"Test exception");
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
$H.$C();
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
self.$u(nil,"Test eql");
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
$o.$C();
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
self.$u(nil,"Test args");
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
$I.$C();
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
self.$u(nil,"Test yield");
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
$J.$C();
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
self.$u(nil,"Test string");
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
$K.$C();
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
self.$u(nil,"Test array");
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
$y.$C();
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
self.$u(nil,"Test lebewesen");
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
$L.$C();
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
self.$u(nil,"Test class");
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
$M.$C();
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
self.$u(nil,"Test case");
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
$N.$C();
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
self.$u(nil,"Test expr");
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
$O.$C();
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
self.$u(nil,"Test range");
self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");
_b=$r.$C()}catch(_a){if(_a instanceof a$c)throw(_a);
if((_d=$f.$f(nil,_a),_d!==false&&_d!==nil)){_c=(typeof(_a)=='undefined'?nil:_a);
self.$t(nil,"unhandled exception");
_b=self.$t(nil,_c)}else{throw(_a)}};
return _b}

},a$c: "TestSuite"});$q = a$d({a$j: [],a$e: $j,a$c: "Range",a$h: {$N:
/* Range#== */
function(_e,_a){var self,_b,_c,_d;
_d=nil;
self=this;
if(self.$S===undefined)self.$S=nil;
if(self.$T===undefined)self.$T=nil;
if(self.$U===undefined)self.$U=nil;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
if (self.constructor != _a.constructor) return false;;
_d=(_b=self.$S.$N(nil,_a.$G()), (_b!==false&&_b!==nil) ? ((_c=self.$T.$N(nil,_a.$H()), (_c!==false&&_c!==nil) ? (self.$U.$N(nil,_a.$M())) : _c)) : _b);
return _d}catch(_f){if(_f instanceof a$c && (!_f.a$b || _f.a$b==21))return _f.a$a;
throw(_f)}}

,$K:
/* Range#begin */
function(){var self,_a;
_a=nil;
self=this;
if(self.$S===undefined)self.$S=nil;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$S;
return _a}

,$g:
/* Range#eql? */
function(_e,_a){var self,_b,_c,_d;
_d=nil;
self=this;
if(self.$S===undefined)self.$S=nil;
if(self.$T===undefined)self.$T=nil;
if(self.$U===undefined)self.$U=nil;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
if (self.constructor != _a.constructor) return false;;
_d=(_b=self.$S.$g(nil,_a.$G()), (_b!==false&&_b!==nil) ? ((_c=self.$T.$g(nil,_a.$H()), (_c!==false&&_c!==nil) ? (self.$U.$N(nil,_a.$M())) : _c)) : _b);
return _d}catch(_f){if(_f instanceof a$c && (!_f.a$b || _f.a$b==22))return _f.a$a;
throw(_f)}}

,$M:
/* Range#exclude_end? */
function(){var self,_a;
_a=nil;
self=this;
if(self.$U===undefined)self.$U=nil;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$U;
return _a}

,$H:
/* Range#last */
function(){var self,_a;
_a=nil;
self=this;
if(self.$T===undefined)self.$T=nil;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$T;
return _a}

,$o:
/* Range#to_s */
function(){var self,_b,_a;
_a=nil;
self=this;
if(self.$S===undefined)self.$S=nil;
if(self.$T===undefined)self.$T=nil;
if(self.$U===undefined)self.$U=nil;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
if((_b=self.$U,_b!==false&&_b!==nil)){_a=("" + (self.$S).$o() + ("...").$o() + (self.$T).$o())}else{_a=("" + (self.$S).$o() + ("..").$o() + (self.$T).$o())};
return _a}

,$v:
/* Range#each */
function(_c){var self,_a,_b,_d;
_a=_d=nil;
self=this;
if(self.$S===undefined)self.$S=nil;
if(self.$T===undefined)self.$T=nil;
if(self.$U===undefined)self.$U=nil;
try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$S;
if((_b=self.$S.$X(nil,self.$T),_b!==false&&_b!==nil)){return nil};
if((_b=self.$U,_b!==false&&_b!==nil)){while((_b=_a.$V(nil,self.$T),_b!==false&&_b!==nil)){_c(_a);
_a=_a.$Y()};
_d=nil;
}else{while((_b=_a.$W(nil,self.$T),_b!==false&&_b!==nil)){_c(_a);
_a=_a.$Y()};
_d=nil;
};
return _d}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==25))return _e.a$a;
throw(_e)}}

,$L:
/* Range#end */
function(){var self,_a;
_a=nil;
self=this;
if(self.$T===undefined)self.$T=nil;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$T;
return _a}

,$G:
/* Range#first */
function(){var self,_a;
_a=nil;
self=this;
if(self.$S===undefined)self.$S=nil;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$S;
return _a}

,$I:
/* Range#include? */
function(_d,_a){var self,_b,_c;
_c=nil;
self=this;
if(self.$S===undefined)self.$S=nil;
if(self.$T===undefined)self.$T=nil;
if(self.$U===undefined)self.$U=nil;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
if((_b=_a.$V(nil,self.$S),_b!==false&&_b!==nil)){return false};
if((_b=self.$U,_b!==false&&_b!==nil)){_c=_a.$V(nil,self.$T)}else{_c=_a.$W(nil,self.$T)};
return _c}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==24))return _e.a$a;
throw(_e)}}

,$c:
/* Range#initialize */
function(_f,_a,_b,_c){var self,_d,_e;
_e=nil;
self=this;
try{if(arguments.length<3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));
if(arguments.length>4)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 3)'));
if(_c===undefined)_c=false;
;
(_d=[_a,_b],self.$S=_d[0]===undefined?nil:_d[0],self.$T=_d[1]===undefined?nil:_d[1],_d);
_e=self.$U=((_d=_c,_d!==false&&_d!==nil)?true:false);
return _e}catch(_g){if(_g instanceof a$c && (!_g.a$b || _g.a$b==23))return _g.a$a;
throw(_g)}}

,$f:
/* Range#=== */
function(_d,_a){var self,_b,_c;
_c=nil;
self=this;
if(self.$S===undefined)self.$S=nil;
if(self.$T===undefined)self.$T=nil;
if(self.$U===undefined)self.$U=nil;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
if((_b=_a.$V(nil,self.$S),_b!==false&&_b!==nil)){return false};
if((_b=self.$U,_b!==false&&_b!==nil)){_c=_a.$V(nil,self.$T)}else{_c=_a.$W(nil,self.$T)};
return _c}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==26))return _e.a$a;
throw(_e)}}

,$J:
/* Range#to_a */
function(){var self,_a,_b,_c;
_a=_c=nil;
self=this;
if(self.$S===undefined)self.$S=nil;
if(self.$T===undefined)self.$T=nil;
if(self.$U===undefined)self.$U=nil;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=[];
if((_b=self.$S.$X(nil,self.$T),_b!==false&&_b!==nil)){return _a};
_c=self.$S;
if((_b=self.$U,_b!==false&&_b!==nil)){while((_b=_c.$V(nil,self.$T),_b!==false&&_b!==nil)){_a.$Z(nil,_c);
_c=_c.$Y()}}else{while((_b=_c.$W(nil,self.$T),_b!==false&&_b!==nil)){_a.$Z(nil,_c);
_c=_c.$Y()}};
return _a}

,$i:
/* Range#inspect */
function(){var self,_b,_a;
_a=nil;
self=this;
if(self.$S===undefined)self.$S=nil;
if(self.$T===undefined)self.$T=nil;
if(self.$U===undefined)self.$U=nil;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
if((_b=self.$U,_b!==false&&_b!==nil)){_a=("" + (self.$S.$i()).$o() + ("...").$o() + (self.$T.$i()).$o())}else{_a=("" + (self.$S.$i()).$o() + ("..").$o() + (self.$T.$i()).$o())};
return _a}

,$0:
/* Range#member? */
function(_d,_a){var self,_b,_c;
_c=nil;
self=this;
if(self.$S===undefined)self.$S=nil;
if(self.$T===undefined)self.$T=nil;
if(self.$U===undefined)self.$U=nil;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
if((_b=_a.$V(nil,self.$S),_b!==false&&_b!==nil)){return false};
if((_b=self.$U,_b!==false&&_b!==nil)){_c=_a.$V(nil,self.$T)}else{_c=_a.$W(nil,self.$T)};
return _c}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==27))return _e.a$a;
throw(_e)}}

}});$Q = a$d({a$j: [],a$e: $j,a$c: "Boolean",a$d: Boolean,a$h: {$N:
/* Boolean#== */
function(_b,_a){var self;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
return (self == _a)}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==28))return _c.a$a;
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

}});$d = a$d({a$j: [],a$e: $p,a$c: "TypeError"});$R = a$d({a$j: [],a$e: nil,a$c: "T_TestLebewesen"});$S = a$d({a$j: [],a$e: nil,a$c: "Enumerable",a$h: {$1:
/* Enumerable#collect */
function(_a){var self,_b,_c,_f,_h;
_c=_h=nil;
self=this;
_b=_a===undefined?nil:_a;
try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_c=[];
self.$v(function(_d){var _e;
var _g=nil;
_e=_d===undefined?nil:_d;
_g=_c.$Z(nil,((_f=_b,_f!==false&&_f!==nil)?_b.$2(nil,_e):_e));
return _g});
_h=_c;
return _h}catch(_i){if(_i instanceof a$c && (!_i.a$b || _i.a$b==29))return _i.a$a;
throw(_i)}}

,$3:
/* Enumerable#find_all */
function(_f){var self,_a,_e,_g;
_a=_g=nil;
self=this;
try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=[];
self.$v(function(_b){var _c;
var _d=nil;
_c=_b===undefined?nil:_b;
if((_e=_f(_c),_e!==false&&_e!==nil)){_d=_a.$Z(nil,_c)}else{_d=nil};
return _d});
_g=_a;
return _g}catch(_h){if(_h instanceof a$c && (!_h.a$b || _h.a$b==30))return _h.a$a;
throw(_h)}}

,$4:
/* Enumerable#map */
function(_a){var self,_b,_c,_f,_h;
_c=_h=nil;
self=this;
_b=_a===undefined?nil:_a;
try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_c=[];
self.$v(function(_d){var _e;
var _g=nil;
_e=_d===undefined?nil:_d;
_g=_c.$Z(nil,((_f=_b,_f!==false&&_f!==nil)?_b.$2(nil,_e):_e));
return _g});
_h=_c;
return _h}catch(_i){if(_i instanceof a$c && (!_i.a$b || _i.a$b==31))return _i.a$a;
throw(_i)}}

,$J:
/* Enumerable#to_a */
function(){var self,_a,_e;
_a=_e=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=[];
self.$v(function(_b){var _c;
var _d=nil;
_c=_b===undefined?nil:_b;
_d=_a.$Z(nil,_c);
return _d});
_e=_a;
return _e}

,$5:
/* Enumerable#reject */
function(_f){var self,_a,_e,_g;
_a=_g=nil;
self=this;
try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=[];
self.$v(function(_b){var _c;
var _d=nil;
_c=_b===undefined?nil:_b;
if((_e=_f(_c),_e===false||_e===nil)){_d=_a.$Z(nil,_c)}else{_d=nil};
return _d});
_g=_a;
return _g}catch(_h){if(_h instanceof a$c && (!_h.a$b || _h.a$b==32))return _h.a$a;
throw(_h)}}

,$6:
/* Enumerable#select */
function(_f){var self,_a,_e,_g;
_a=_g=nil;
self=this;
try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=[];
self.$v(function(_b){var _c;
var _d=nil;
_c=_b===undefined?nil:_b;
if((_e=_f(_c),_e!==false&&_e!==nil)){_d=_a.$Z(nil,_c)}else{_d=nil};
return _d});
_g=_a;
return _g}catch(_h){if(_h instanceof a$c && (!_h.a$b || _h.a$b==33))return _h.a$a;
throw(_h)}}

}});$T = a$d({a$j: [$S],a$e: $j,a$f: {$ab:
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

},a$c: "Hash",a$h: {$8:
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
      }catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==34))return _c.a$a;
throw(_c)}}

,$7:
/* Hash#keys */
function(){var self,_b,_f;
_b=_f=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_f=self.$4(function(_a){var _c,_d;
var _e=nil;
(_b=a$k(_a),_c=_b[0]===undefined?nil:_b[0],_d=_b[1]===undefined?nil:_b[1],_b);
_e=_c;
return _e});
return _f}

,$9:
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
      }catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==36))return _d.a$a;
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
      }catch(_b){if(_b instanceof a$c && (!_b.a$b || _b.a$b==35))return _b.a$a;
throw(_b)}}

,$c:
/* Hash#initialize */
function(){var self;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;

      self.a$k = {}; 
      self.a$l = nil;}

,$_:
/* Hash#values */
function(){var self,_b,_f;
_b=_f=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_f=self.$4(function(_a){var _c,_d;
var _e=nil;
(_b=a$k(_a),_c=_b[0]===undefined?nil:_b[0],_d=_b[1]===undefined?nil:_b[1],_b);
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
_a=_a.$$(nil,self.$4(function(_b){var _d,_e;
var _f=nil;
(_c=a$k(_b),_d=_c[0]===undefined?nil:_c[0],_e=_c[1]===undefined?nil:_c[1],_c);
_f=_d.$i().$$(nil," => ").$$(nil,_e.$i());
return _f}).$aa(nil,", "));
_a=_a.$$(nil,"}");
_g=_a;
return _g}

}});$U = a$d({a$j: [],a$e: $j,a$c: "Number",a$d: Number,a$h: {$$:
/* Number#+ */
function(_b,_a){var self;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
return self + _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==40))return _c.a$a;
throw(_c)}}

,$N:
/* Number#== */
function(_b,_a){var self;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
return self == _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==39))return _c.a$a;
throw(_c)}}

,$ad:
/* Number#downto */
function(_d,_a){var self,_b,_c;
_b=nil;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
_b=self;
while((_c=_b.$ae(nil,_a),_c!==false&&_c!==nil)){_d(_b);
_b=_b.$af(nil,1)};
return self}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==38))return _e.a$a;
throw(_e)}}

,$ac:
/* Number#upto */
function(_d,_a){var self,_b,_c;
_b=nil;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
_b=self;
while((_c=_b.$W(nil,_a),_c!==false&&_c!==nil)){_d(_b);
_b=_b.$$(nil,1)};
return self}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==37))return _e.a$a;
throw(_e)}}

,$W:
/* Number#<= */
function(_b,_a){var self;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
return self <= _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==41))return _c.a$a;
throw(_c)}}

,$af:
/* Number#- */
function(_b,_a){var self;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
return self - _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==42))return _c.a$a;
throw(_c)}}

,$Y:
/* Number#succ */
function(){var self;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
return self+1}

,$ag:
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
if(_a===undefined)_a=10;
;
return self.toString(_a)}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==43))return _c.a$a;
throw(_c)}}

,$ah:
/* Number#% */
function(_b,_a){var self;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
return self % _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==45))return _c.a$a;
throw(_c)}}

,$ak:
/* Number#& */
function(_b,_a){var self;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
return self & _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==49))return _c.a$a;
throw(_c)}}

,$V:
/* Number#< */
function(_b,_a){var self;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
return self < _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==48))return _c.a$a;
throw(_c)}}

,$aj:
/* Number#times */
function(_c){var self,_a,_b;
_a=nil;
self=this;
try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=0;
while((_b=_a.$V(nil,self),_b!==false&&_b!==nil)){_c(_a);
_a=_a.$$(nil,1)};
return self}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==47))return _d.a$a;
throw(_d)}}

,$ai:
/* Number#| */
function(_b,_a){var self;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
return self | _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==46))return _c.a$a;
throw(_c)}}

,$an:
/* Number#-@ */
function(){var self;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
return -self}

,$X:
/* Number#> */
function(_b,_a){var self;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
return self > _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==51))return _c.a$a;
throw(_c)}}

,$am:
/* Number#^ */
function(_b,_a){var self;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
return self ^ _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==50))return _c.a$a;
throw(_c)}}

,$al:
/* Number#~ */
function(){var self;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
return ~self}

,$ae:
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

,$ap:
/* Number#* */
function(_b,_a){var self;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
return self * _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==53))return _c.a$a;
throw(_c)}}

,$ao:
/* Number#+@ */
function(){var self;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
return self}

}});$e = a$d({a$j: [],a$e: $j,a$c: "String",a$d: String,a$h: {$$:
/* String#+ */
function(_b,_a){var self;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
return(self + _a)}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==55))return _c.a$a;
throw(_c)}}

,$aq:
/* String#sub */
function(_c,_a,_b){var self;
self=this;
try{if(arguments.length!=3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));
;
self.replace(pattern, replacement)}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==54))return _d.a$a;
throw(_d)}}

,$as:
/* String#rjust */
function(_f,_a,_b){var self,_c,_d,_e;
_d=_e=nil;
self=this;
try{if(arguments.length<2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
if(arguments.length>3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));
if(_b===undefined)_b=" ";
;
if((_c=_b.$l(),_c!==false&&_c!==nil)){self.$j(nil,$a,"zero width padding")};
_d=_a.$af(nil,self.$at());
if((_c=_d.$W(nil,0),_c!==false&&_c!==nil)){return self};
_e="";
while(_e.length < _d) _e += _b;;
return _e.$8(nil,0,_d).$$(nil,self)}catch(_g){if(_g instanceof a$c && (!_g.a$b || _g.a$b==56))return _g.a$a;
throw(_g)}}

,$ar:
/* String#size */
function(){var self;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
return self.length}

,$8:
/* String#[] */
function(_d,_a,_b){var self,_c;
self=this;
try{if(arguments.length<2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
if(arguments.length>3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));
if(_b===undefined)_b=nil;
;
if((_c=_b.$q(),_c!==false&&_c!==nil)){return self.charAt(_a) || nil}else{if((_c=_b.$V(nil,0),_c!==false&&_c!==nil)){return nil};
return self.substring(_a, _a+_b)}}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==58))return _e.a$a;
throw(_e)}}

,$au:
/* String#ljust */
function(_f,_a,_b){var self,_c,_d,_e;
_d=_e=nil;
self=this;
try{if(arguments.length<2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
if(arguments.length>3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));
if(_b===undefined)_b=" ";
;
if((_c=_b.$l(),_c!==false&&_c!==nil)){self.$j(nil,$a,"zero width padding")};
_d=_a.$af(nil,self.$at());
if((_c=_d.$W(nil,0),_c!==false&&_c!==nil)){return self};
_e="";
while(_e.length < _d) _e += _b;;
return self.$$(nil,_e.$8(nil,0,_d))}catch(_g){if(_g instanceof a$c && (!_g.a$b || _g.a$b==57))return _g.a$a;
throw(_g)}}

,$av:
/* String#split */
function(_b,_a){var self;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
return self.split(_a)}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==59))return _c.a$a;
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

,$at:
/* String#length */
function(){var self;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
return self.length}

,$aw:
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

,$ay:
/* String#gsub */
function(_g,_a,_b){var self,_c,_d,_e,_f;
_d=_e=_f=nil;
self=this;
try{if(arguments.length<2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
if(arguments.length>3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));
if(_b===undefined)_b=nil;
;
(_c=["",self,nil],_d=_c[0]===undefined?nil:_c[0],_e=_c[1]===undefined?nil:_c[1],_f=_c[2]===undefined?nil:_c[2],_c);
while(_e.length > 0) {
        if (_f = _e.match(_a)) {
          _d += _e.slice(0, _f.index);;
if((_c=_b,_c!==false&&_c!==nil)){_d=_d.$$(nil,_b)}else{_d=_d.$$(nil,_g(_f.$G()).$o())};
_e = _e.slice(_f.index + _f[0].length);
        } else {
          _d += _e; _e = '';
        }
      } return _d}catch(_h){if(_h instanceof a$c && (!_h.a$b || _h.a$b==61))return _h.a$a;
throw(_h)}}

,$ax:
/* String#index */
function(_c,_a,_b){var self;
self=this;
try{if(arguments.length<2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
if(arguments.length>3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));
if(_b===undefined)_b=0;
;

      var i = self.indexOf(_a, _b);
      return (i == -1) ? nil : i}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==60))return _d.a$a;
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
_b=self.$ay(function(_c){var _d,_e;
_d=_c===undefined?nil:_c;
_e=_a[_d];
return _e ? _e : 
          '\\u00' + ("0" + _d.charCodeAt().toString(16)).substring(0,2);},/[\x00-\x1f\\]/);
return ('"' + _b.replace(/"/g, '\\"') + '"');}

,$az:
/* String#match */
function(_b,_a){var self;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;

      var i = self.match(_a);
      return (i === null) ? nil : i}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==62))return _c.a$a;
throw(_c)}}

}});$L = a$d({a$j: [],a$e: $j,a$f: {$C:
/* T_TestLebewesen::TestLebewesen.main */
function(){var self,_a,_b,_c,_d;
_a=_b=_c=_d=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=$V.$a(nil,"AA-BB","Leni");
_b=$V.$a(nil,"AC-DC","Flocki");
_c=$W.$a(nil,"AA-ZZ");
_a.$aA();
_c.$aB();
_d=_c.$aC(nil,_a);
return _d}

},a$c: "T_TestLebewesen::TestLebewesen"});$X = a$d({a$j: [],a$e: $U,a$c: "Float",a$d: Number});$C = a$d({a$j: [],a$e: $j,a$f: {$C:
/* T_TestNew::TestNew.main */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$a().$F();
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

,$F:
/* T_TestNew::TestNew#test */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$u(nil,"test");
return _a}

}});$Y = a$d({a$j: [],a$e: nil,a$c: "T_TestMassign"});$I = a$d({a$j: [],a$e: $j,a$f: {$C:
/* T_TestArgs::TestArgs.main */
function(){var self,_a,_b;
_a=_b=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$a();
_a.$aD(nil,0);
self.$u(nil,"--");
_a.$aD(nil,1,2);
self.$u(nil,"--");
_a.$aD(nil,1,2,9);
self.$u(nil,"--");
_a.$aD(nil,1,2,9,5);
self.$u(nil,"--");
_a.$aD(nil,1,2,9,5,6);
self.$u(nil,"--");
_b=_a.$aD(nil,1,2,9,5,6,7,8,9,10,11,12);
return _b}

},a$c: "T_TestArgs::TestArgs",a$h: {$aD:
/* T_TestArgs::TestArgs#m */
function(_g,_a,_b,_c){var self,_d,_e,_f;
_f=nil;
self=this;
try{if(arguments.length<2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
if(_b===undefined)_b=1;
if(_c===undefined)_c="hallo";
_d=[];
for(_e=4;_e<arguments.length;_e++)_d.push(arguments[_e]);
;
self.$t(nil,_a);
self.$t(nil,_b);
self.$t(nil,_c);
_f=self.$t(nil,_d);
return _f}catch(_h){if(_h instanceof a$c && (!_h.a$b || _h.a$b==63))return _h.a$a;
throw(_h)}}

}});$Z = a$d({a$j: [],a$e: nil,a$c: "T_TestClass"});$0 = a$d({a$j: [],a$e: $j,a$c: "NilClass",a$d: NilClass,a$h: {$aE:
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

,$aF:
/* NilClass#to_i */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=0;
return _a}

,$J:
/* NilClass#to_a */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=[];
return _a}

,$aG:
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

}});$1 = a$d({a$j: [],a$e: nil,a$c: "T_TestYield"});$2 = a$d({a$j: [],a$e: $j,a$c: "T_TestLebewesen::Lebewesen",a$h: {$c:
/* T_TestLebewesen::Lebewesen#initialize */
function(_c,_a){var self,_b;
_b=nil;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
_b=self.$aH=_a;
return _b}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==64))return _d.a$a;
throw(_d)}}

}});$W = a$d({a$j: [],a$e: $2,a$c: "T_TestLebewesen::Hund",a$h: {$aB:
/* T_TestLebewesen::Hund#wau */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$u(nil,"wau wau");
return _a}

,$aC:
/* T_TestLebewesen::Hund#jage */
function(_c,_a){var self,_b;
_b=nil;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
_b=self.$u(nil,"ich jage ".$$(nil,_a.$e()));
return _b}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==65))return _d.a$a;
throw(_d)}}

}});$3 = a$d({a$j: [],a$e: nil,a$c: "T_TestSimpleOutput"});$F = a$d({a$j: [],a$e: $j,a$f: {$C:
/* T_TestIf::TestIf.main */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$a().$F();
return _a}

},a$c: "T_TestIf::TestIf",a$h: {$F:
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
if((_a=(_b=(5).$V(nil,6), (_b!==false&&_b!==nil) ? ((6).$V(nil,7)) : _b),_a!==false&&_a!==nil)){self.$u(nil,"OK")};
self.$t(nil,(_a=false, (_a!==false&&_a!==nil) ? _a : ("a")));
self.$t(nil,(_a=nil, (_a!==false&&_a!==nil) ? _a : ("a")));
self.$t(nil,(_a=true, (_a!==false&&_a!==nil) ? _a : ("a")));
self.$t(nil,(_a="b", (_a!==false&&_a!==nil) ? _a : ("a")));
self.$t(nil,(_a=false, (_a!==false&&_a!==nil) ? ("a") : _a));
self.$t(nil,(_a=nil, (_a!==false&&_a!==nil) ? ("a") : _a));
self.$t(nil,(_a=true, (_a!==false&&_a!==nil) ? ("a") : _a));
_f=self.$t(nil,(_a="b", (_a!==false&&_a!==nil) ? ("a") : _a));
return _f}

}});$c = a$d({a$j: [],a$e: $p,a$c: "RuntimeError"});$D = a$d({a$j: [],a$e: $j,a$f: {$C:
/* T_TestMassign::TestMassign.main */
function(){var self,_a,_b,_c,_d,_e,_f;
_a=_b=_c=_d=_e=_f=nil;
self=this;
if(self.$aI===undefined)self.$aI=nil;
if(self.$aJ===undefined)self.$aJ=nil;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
(_a=[1,2],_b=_a[0]===undefined?nil:_a[0],_c=_a[1]===undefined?nil:_a[1],_a);
self.$t(nil,_b);
self.$t(nil,_c);
self.$u(nil,"--");
(_a=[1,2,3],_b=_a[0]===undefined?nil:_a[0],_c=_a[1]===undefined?nil:_a[1],_a);
self.$t(nil,_b);
self.$t(nil,_c);
self.$u(nil,"--");
_d=5;
(_a=[1,2],_b=_a[0]===undefined?nil:_a[0],_c=_a[1]===undefined?nil:_a[1],_d=_a[2]===undefined?nil:_a[2],_a);
self.$t(nil,_b);
self.$t(nil,_c);
self.$t(nil,_d);
self.$u(nil,"--");
(_a=[1,2,3],self.$aI=_a[0]===undefined?nil:_a[0],_c=_a[1]===undefined?nil:_a[1],self.$aJ=_a[2]===undefined?nil:_a[2],_a);
self.$t(nil,self.$aI);
self.$t(nil,_c);
self.$t(nil,self.$aJ);
self.$u(nil,"--");
self.$u(nil,"swap");
(_a=[1,2],_b=_a[0]===undefined?nil:_a[0],_c=_a[1]===undefined?nil:_a[1],_a);
self.$t(nil,_b);
self.$t(nil,_c);
(_a=[_c,_b],_b=_a[0]===undefined?nil:_a[0],_c=_a[1]===undefined?nil:_a[1],_a);
self.$t(nil,_b);
self.$t(nil,_c);
self.$u(nil,"--");
self.$u(nil,"splat1");
(_a=[1,2],_b=_a[0]===undefined?nil:_a[0],_c=_a[1]===undefined?nil:_a[1],_d=_a[2]===undefined?nil:_a[2],_e=_a.slice(3),_a);
self.$t(nil,_b);
self.$t(nil,_c);
self.$t(nil,_d);
self.$t(nil,_e);
self.$u(nil,"--");
self.$u(nil,"splat2");
(_a=[1,2],_b=_a[0]===undefined?nil:_a[0],_c=_a.slice(1),_a);
self.$t(nil,_b);
self.$t(nil,_c);
self.$u(nil,"--");
self.$u(nil,"splat3");
(_a=[1,2,3,4,5],_b=_a[0]===undefined?nil:_a[0],_c=_a.slice(1),_a);
self.$t(nil,_b);
self.$t(nil,_c);
self.$u(nil,"--");
self.$u(nil,"splat with globals");
self.$t(nil,(typeof($4)=='undefined'?nil:$4));
self.$t(nil,(typeof($5)=='undefined'?nil:$5));
(_a=[1,2],$4=_a[0]===undefined?nil:_a[0],$5=_a[1]===undefined?nil:_a[1],_a);
self.$t(nil,(typeof($4)=='undefined'?nil:$4));
self.$t(nil,(typeof($5)=='undefined'?nil:$5));
_f=self.$u(nil,"--");
return _f}

},a$c: "T_TestMassign::TestMassign"});$6 = a$d({a$j: [],a$e: nil,a$c: "T_TestHash"});$7 = a$d({a$j: [],a$e: nil,a$c: "T_TestSend"});$J = a$d({a$j: [],a$e: $j,a$f: {$C:
/* T_TestYield::TestYield.main */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$a().$F();
return _a}

},a$c: "T_TestYield::TestYield",a$h: {$aL:
/* T_TestYield::TestYield#test_loop2 */
function(){var self,_a,_b,_d,_f;
_a=_b=_f=nil;
self=this;
try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
self.$u(nil,"loop2");
_a=0;
_b=self.$aM(function(){var _e=nil;
;
_a=_a.$$(nil,1);
if((_d=_a.$ah(nil,2).$N(nil,1),_d!==false&&_d!==nil)){return nil};
self.$t(nil,_a);
if((_d=_a.$X(nil,8),_d!==false&&_d!==nil)){throw(new a$c(["out",_a],null))}else{_e=nil};
return _e});
self.$t(nil,_b);
_f=self.$u(nil,"--");
return _f}catch(_g){if(_g instanceof a$c && (!_g.a$b || _g.a$b==67))return _g.a$a;
throw(_g)}}

,$aK:
/* T_TestYield::TestYield#three_times_block */
function(_a){var self,_b,_c;
_c=nil;
self=this;
_b=_a===undefined?nil:_a;
try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_b.$2(nil,1);
_b.$2(nil,2);
_c=_b.$2(nil,3);
return _c}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==66))return _d.a$a;
throw(_d)}}

,$aO:
/* T_TestYield::TestYield#return_in_block */
function(_a){var self,_b,_c;
_c=nil;
self=this;
_b=_a===undefined?nil:_a;
try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
self.$t(nil,"return_in_block before");
_b.$2();
_c=self.$t(nil,"return_in_block after");
return _c}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==68))return _d.a$a;
throw(_d)}}

,$aN:
/* T_TestYield::TestYield#test_while_loop */
function(){var self,_a,_b,_c;
_a=_c=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
self.$u(nil,"while-loop");
_a=0;
while(true){_a=_a.$$(nil,1);
if((_b=_a.$ah(nil,2).$N(nil,1),_b!==false&&_b!==nil)){continue};
self.$t(nil,_a);
if((_b=_a.$X(nil,8),_b!==false&&_b!==nil)){break}};
self.$u(nil,"----");
while((_b=_a.$X(nil,0),_b!==false&&_b!==nil)){self.$t(nil,_a);
_a=_a.$af(nil,1)};
_c=self.$u(nil,"--");
return _c}

,$aM:
/* T_TestYield::TestYield#loop2 */
function(_a){var self,_b,_c;
_c=nil;
self=this;
_b=_a===undefined?nil:_a;
try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
while(true){_b.$2()};
_c=self.$t(nil,"not reached");
return _c}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==70))return _d.a$a;
throw(_d)}}

,$aR:
/* T_TestYield::TestYield#test_proc */
function(){var self,_a,_d;
_a=_d=nil;
self=this;
try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
self.$t(nil,"test_proc");
_a=self.$s(function(){;
throw(new a$c(0,69))});
self.$t(nil,_a.$2());
_a=$h.$a(function(){;
throw(new a$c(3,null))});
_d=self.$t(nil,_a.$2());
return _d}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==69))return _e.a$a;
throw(_e)}}

,$aP:
/* T_TestYield::TestYield#test_three_times_indirect */
function(){var self,_d;
_d=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
self.$u(nil,"three_times_indirect");
self.$aQ(function(_a){var _b;
var _c=nil;
_b=_a===undefined?nil:_a;
_c=self.$t(nil,_b);
return _c});
_d=self.$u(nil,"--");
return _d}

,$aS:
/* T_TestYield::TestYield#test_three_times_yield2 */
function(){var self,_d,_e;
_e=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
self.$u(nil,"three_times_yield2");
_e=self.$aT(function(_a){var _b;
var _c=nil;
_b=_a===undefined?nil:_a;
if((_d=_b.$N(nil,1),_d!==false&&_d!==nil)){_c=_b}else{return _b.$$(nil,1)};
return _c});
return _e}

,$aV:
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
_a=_a.$$(nil,1);
if((_d=_a.$ah(nil,2).$N(nil,1),_d!==false&&_d!==nil)){return nil};
self.$t(nil,_a);
if((_d=_a.$X(nil,8),_d!==false&&_d!==nil)){throw(new a$c(["out",_a],null))}else{_e=nil};
return _e});
self.$t(nil,_b);
_f=self.$u(nil,"--");
return _f}catch(_g){if(_g instanceof a$c && (!_g.a$b || _g.a$b==71))return _g.a$a;
throw(_g)}}

,$aU:
/* T_TestYield::TestYield#test_three_times_block */
function(){var self,_d;
_d=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
self.$u(nil,"three_times_block");
self.$aK(function(_a){var _b;
var _c=nil;
_b=_a===undefined?nil:_a;
_c=self.$t(nil,_b);
return _c});
_d=self.$u(nil,"--");
return _d}

,$F:
/* T_TestYield::TestYield#test */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
self.$aW();
self.$aU();
self.$aP();
self.$aS();
self.$aV();
self.$aL();
self.$aN();
self.$aR();
_a=self.$t(nil,self.$aX());
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
return _b}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==74))return _c.a$a;
throw(_c)}}

,$aQ:
/* T_TestYield::TestYield#three_times_indirect */
function(_a){var self,_b,_c;
_c=nil;
self=this;
_b=_a===undefined?nil:_a;
try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
self.$aY(_b);
_c=self.$aK(_b);
return _c}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==73))return _d.a$a;
throw(_d)}}

,$aY:
/* T_TestYield::TestYield#three_times_yield */
function(_a){var self,_b;
_b=nil;
self=this;
try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a(1);
_a(2);
_b=_a(3);
return _b}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==72))return _c.a$a;
throw(_c)}}

,$aT:
/* T_TestYield::TestYield#three_times_yield2 */
function(_a){var self,_b;
_b=nil;
self=this;
try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
self.$t(nil,_a(1));
self.$t(nil,_a(2));
_b=self.$t(nil,_a(3));
return _b}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==75))return _c.a$a;
throw(_c)}}

,$aX:
/* T_TestYield::TestYield#test_return_in_block */
function(){var self,_b;
_b=nil;
self=this;
try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
self.$t(nil,"before");
self.$aO(function(){;
throw(new a$c(4,76))});
_b=self.$t(nil,"after (NOT)");
return _b}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==76))return _c.a$a;
throw(_c)}}

,$aW:
/* T_TestYield::TestYield#test_three_times_yield */
function(){var self,_d;
_d=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
self.$u(nil,"three_times_yield");
self.$aY(function(_a){var _b;
var _c=nil;
_b=_a===undefined?nil:_a;
_c=self.$t(nil,_b);
return _c});
_d=self.$u(nil,"--");
return _d}

}});$V = a$d({a$j: [],a$e: $2,a$c: "T_TestLebewesen::Katze",a$h: {$e:
/* T_TestLebewesen::Katze#name */
function(){var self,_a;
_a=nil;
self=this;
if(self.$aZ===undefined)self.$aZ=nil;
_a=self.$aZ;
return _a}

,$c:
/* T_TestLebewesen::Katze#initialize */
function(_d,_a,_b){var self,_c;
_c=nil;
self=this;
try{if(arguments.length!=3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));
;
a$l(self,'$c',nil,[_a]);
_c=self.$aZ=_b;
return _c}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==77))return _e.a$a;
throw(_e)}}

,$aA:
/* T_TestLebewesen::Katze#miau */
function(){var self,_a;
_a=nil;
self=this;
if(self.$aZ===undefined)self.$aZ=nil;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$u(nil,"miau, ich bin ".$$(nil,self.$aZ));
return _a}

}});$8 = a$d({a$j: [],a$e: nil,a$c: "T_TestString"});$G = a$d({a$j: [],a$e: $j,a$f: {$C:
/* T_TestHash::TestHash.main */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$a().$F();
return _a}

},a$c: "T_TestHash::TestHash",a$h: {$B:
/* T_TestHash::TestHash#hash */
function(){var self;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
var el = {}; el["1"] = null; return el}

,$F:
/* T_TestHash::TestHash#test */
function(){var self,_a,_b,_c;
_a=_b=_c=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=$T.$ab(nil,"a",6,"b",7,"1",1,1,2,"1,2","hello",[1,2],"good");
self.$t(nil,_a.$8(nil,"a"));
self.$t(nil,_a.$8(nil,"b"));
self.$t(nil,_a.$8(nil,"1"));
self.$t(nil,_a.$8(nil,1));
self.$t(nil,_a.$8(nil,"1,2"));
self.$t(nil,_a.$8(nil,[1,2]));
self.$u(nil,"test native JS hash");
_c=_b=self.$B();
return _c}

}});$9 = a$d({a$j: [$S],a$e: $j,a$f: {$a:
/* Array.new */
function(){var self;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
return []}

},a$c: "Array",a$d: Array,a$h: {$$:
/* Array#+ */
function(_b,_a){var self;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
return self.concat(_a)}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==80))return _c.a$a;
throw(_c)}}

,$Z:
/* Array#<< */
function(_b,_a){var self;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
self.push(_a); return self}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==79))return _c.a$a;
throw(_c)}}

,$O:
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
      return del ? _a : nil}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==78))return _c.a$a;
throw(_c)}}

,$ar:
/* Array#size */
function(){var self;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
return self.length}

,$8:
/* Array#[] */
function(_b,_a){var self;
self=this;
try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
;
var v = self[_a]; return (v == null ? nil : v)}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==82))return _c.a$a;
throw(_c)}}

,$a1:
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
      }catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==81))return _c.a$a;
throw(_c)}}

,$a0:
/* Array#reverse */
function(){var self;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
return self.concat().reverse()}

,$H:
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
_d=self.$4(function(_a){var _b;
var _c=nil;
_b=_a===undefined?nil:_a;
_c=_b.$o();
return _c}).$aa();
return _d}

,$9:
/* Array#[]= */
function(_c,_a,_b){var self;
self=this;
try{if(arguments.length!=3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));
;
return (self[_a] = _b)}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==85))return _d.a$a;
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
      return self}catch(_b){if(_b instanceof a$c && (!_b.a$b || _b.a$b==84))return _b.a$a;
throw(_b)}}

,$a2:
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
      return self}catch(_b){if(_b instanceof a$c && (!_b.a$b || _b.a$b==83))return _b.a$a;
throw(_b)}}

,$G:
/* Array#first */
function(){var self;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
var v = self[0]; return (v == null ? nil : v)}

,$at:
/* Array#length */
function(){var self;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
return self.length}

,$a3:
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

,$J:
/* Array#to_a */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self;
return _a}

,$a5:
/* Array#push */
function(){var self,_a,_b;
self=this;
_a=[];
for(_b=1;_b<arguments.length;_b++)_a.push(arguments[_b]);
;
self.push.apply(self, _a); return self}

,$a4:
/* Array#to_ary */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self;
return _a}

,$a8:
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
_a=_a.$$(nil,self.$4(function(_b){var _c;
var _d=nil;
_c=_b===undefined?nil:_b;
_d=_c.$i();
return _d}).$aa(nil,", "));
_a=_a.$$(nil,"]");
_e=_a;
return _e}

,$a7:
/* Array#reverse! */
function(){var self;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
self.reverse(); return self}

,$a6:
/* Array#unshift */
function(){var self,_a,_b;
self=this;
_a=[];
for(_b=1;_b<arguments.length;_b++)_a.push(arguments[_b]);
;
self.unshift.apply(self, _a); return self}

,$aa:
/* Array#join */
function(_i,_a){var self,_b,_d,_h;
_b=_h=nil;
self=this;
try{if(arguments.length>2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
if(_a===undefined)_a="";
;
_b="";
self.$a2(function(_c){var _e,_f;
var _g=nil;
(_d=a$k(_c),_e=_d[0]===undefined?nil:_d[0],_f=_d[1]===undefined?nil:_d[1],_d);
_b=_b.$$(nil,_e.$o());
if((_d=_f.$N(nil,self.$at().$af(nil,1)),_d===false||_d===nil)){_g=_b=_b.$$(nil,_a)}else{_g=nil};
return _g});
_h=_b;
return _h}catch(_j){if(_j instanceof a$c && (!_j.a$b || _j.a$b==86))return _j.a$a;
throw(_j)}}

}});$N = a$d({a$j: [],a$e: $j,a$f: {$C:
/* T_TestCase::TestCase.main */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$a().$F();
return _a}

},a$c: "T_TestCase::TestCase",a$h: {$F:
/* T_TestCase::TestCase#test */
function(){var self,_a,_b,_c,_d;
_d=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=(1).$$(nil,1);
if((_b=(_c=(1).$f(nil,_a), (_c!==false&&_c!==nil) ? _c : ((3).$f(nil,_a))),_b!==false&&_b!==nil)){self.$u(nil,"NOT OKAY")}else{if((_b=(2).$f(nil,_a),_b!==false&&_b!==nil)){self.$u(nil,"OKAY")}else{self.$u(nil,"NOT OKAY")}};
self.$t(nil,$9.$f(nil,[]));
self.$t(nil,$c.$f(nil,$c.$a()));
_a=1;
if((_b=$_.$f(nil,_a),_b!==false&&_b!==nil)){self.$u(nil,"OK")}else{if((_b=(1).$f(nil,_a),_b!==false&&_b!==nil)){self.$u(nil,"OK")}};
_a=_d=4;
if((_b=$q.$a(nil,0,3,false).$f(nil,_a),_b!==false&&_b!==nil)){_d=self.$u(nil,"NOT OKAY")}else{if((_b=$q.$a(nil,1,4,true).$f(nil,_a),_b!==false&&_b!==nil)){_d=self.$u(nil,"NOT OKAY")}else{if((_b=$q.$a(nil,2,4,false).$f(nil,_a),_b!==false&&_b!==nil)){_d=self.$u(nil,"OKAY")}else{_d=nil}}};
return _d}

}});$$ = a$d({a$j: [],a$e: nil,a$c: "T_TestException"});$aa = a$d({a$j: [],a$e: nil,a$c: "T_TestExpr"});$E = a$d({a$j: [],a$e: $j,a$f: {$C:
/* T_TestSend::TestSend.main */
function(){var self,_b,_c;
_c=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
self.$u(nil,"send");
self.$t(nil,$z.$a().$w(nil,"a_method",1,2));
self.$t(nil,$A.$a().$w(nil,"a_method",1,2));
self.$u(nil,"respond_to?");
self.$t(nil,$z.$a().$r(nil,"a_method"));
self.$t(nil,$z.$a().$r(nil,"to_s"));
self.$t(nil,$z.$a().$r(nil,"inspect"));
self.$t(nil,$z.$a().$r(nil,"b_method"));
self.$t(nil,$z.$a().$r(nil,"c_method"));
self.$u(nil,"method_missing");
self.$t(nil,$ab.$a().$r(nil,"blah_blah"));
$ab.$a().$a9(nil,1,2,3);
try{$z.$a().$a9();
self.$u(nil,"FAILURE?")}catch(_a){if(_a instanceof a$c)throw(_a);
if((_b=$g.$f(nil,_a),_b!==false&&_b!==nil)){self.$u(nil,"catched!!!")}else{throw(_a)}};
try{_c=$z.$a_()}catch(_a){if(_a instanceof a$c)throw(_a);
if((_b=$g.$f(nil,_a),_b!==false&&_b!==nil)){_c=self.$t(nil,"goood")}else{throw(_a)}};
return _c}

},a$c: "T_TestSend::TestSend"});$h = a$d({a$j: [],a$e: $j,a$f: {$a:
/* Proc.new */
function(_a){var self,_b,_c;
self=this;
_b=_a===undefined?nil:_a;
try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
if((_c=_b,_c===false||_c===nil)){self.$j(nil,$a,"tried to create Proc object without a block")};
return (function() {
        try {
          return _b.$2.apply(_b, arguments);
        } catch(e) 
        {
          if (e instanceof a$c) 
          {
            if (e.a$b == null)
            {;
self.$j(nil,$ac,"break from proc-closure");
}
            return e.a$a;
          }
          else throw(e);
        }
      })}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==87))return _d.a$a;
throw(_d)}}

},a$c: "Proc",a$d: Function,a$h: {$2:
/* Proc#call */
function(){var self,_a,_b;
self=this;
_a=[];
for(_b=1;_b<arguments.length;_b++)_a.push(arguments[_b]);
;

      if (_a.length == 0) return self();
      else if (_a.length == 1) return self(_a[0]);
      else return self(_a);}

}});$ad = a$d({a$j: [],a$e: nil,a$c: "T_TestIf"});$B = a$d({a$j: [],a$e: $j,a$f: {$C:
/* T_TestSplat::TestSplat.main */
function(){var self,_a,_b;
_a=_b=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$a();
_a.$aD();
_a.$d(nil,'$aD',a$b([]));
_a.$aD(nil,1);
_a.$d(nil,'$aD',a$b([1]));
_a.$d(nil,'$aD',[1].concat(a$b([])));
_a.$aD(nil,1,2);
_a.$d(nil,'$aD',a$b([1,2]));
_a.$d(nil,'$aD',[1].concat(a$b([2])));
_b=_a.$d(nil,'$aD',[1].concat(a$b([1,2])));
return _b}

},a$c: "T_TestSplat::TestSplat",a$h: {$aD:
/* T_TestSplat::TestSplat#m */
function(){var self,_a,_b,_c;
_c=nil;
self=this;
_a=[];
for(_b=1;_b<arguments.length;_b++)_a.push(arguments[_b]);
;
_c=self.$t(nil,_a);
return _c}

}});$_ = a$d({a$j: [],a$e: $U,a$c: "Fixnum",a$d: Number});$a = a$d({a$j: [],a$e: $p,a$c: "ArgumentError"});$H = a$d({a$j: [],a$e: $j,a$f: {$C:
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
if((_c=$p.$f(nil,_a),_c!==false&&_c!==nil)){self.$t(nil,"rescue")}else{if((_c=$f.$f(nil,_a),_c!==false&&_c!==nil)){_b=(typeof(_a)=='undefined'?nil:_a);
self.$t(nil,"another rescue");
self.$t(nil,_b)}else{throw(_a)}}};
self.$t(nil,$c.$a(nil,"test"));
self.$u(nil,"before begin");
try{try{self.$u(nil,"before raise");
self.$j(nil,$f,"blah");
self.$u(nil,"after raise")}catch(_a){if(_a instanceof a$c)throw(_a);
if((_c=$p.$f(nil,_a),_c!==false&&_c!==nil)){self.$u(nil,"noooo")}else{if((_c=$f.$f(nil,_a),_c!==false&&_c!==nil)){_b=(typeof(_a)=='undefined'?nil:_a);
self.$t(nil,_b);
self.$u(nil,"yes")}else{throw(_a)}}}}finally{self.$u(nil,"ensure")};
self.$u(nil,"after begin");
self.$u(nil,"--");
try{try{self.$u(nil,"abc");
self.$j(nil,"r")}catch(_a){if(_a instanceof a$c)throw(_a);
if((_c=$p.$f(nil,_a),_c!==false&&_c!==nil)){self.$t(nil,(typeof(_a)=='undefined'?nil:_a));
self.$u(nil,"b")}else{throw(_a)}}}finally{self.$u(nil,"e")};
try{_d=self.$t(nil,"hallo".$o(nil,2))}catch(_a){if(_a instanceof a$c)throw(_a);
if((_c=$a.$f(nil,_a),_c!==false&&_c!==nil)){_b=(typeof(_a)=='undefined'?nil:_a);
_d=self.$t(nil,_b)}else{throw(_a)}};
return _d}

},a$c: "T_TestException::TestException"});$ae = a$d({a$j: [],a$e: nil,a$c: "T_TestEql"});$O = a$d({a$j: [],a$e: $j,a$f: {$C:
/* T_TestExpr::TestExpr.main */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$a().$F();
return _a}

},a$c: "T_TestExpr::TestExpr",a$h: {$F:
/* T_TestExpr::TestExpr#test */
function(){var self,_a,_b,_c;
_a=_c=nil;
self=this;
try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=(true?1:2);
self.$t(nil,_a);
(_b=_a=true, (_b!==false&&_b!==nil) ? _b : (a$m(new a$c(nil,null))));
_c=self.$t(nil,_a);
return _c}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==88))return _d.a$a;
throw(_d)}}

}});$af = a$d({a$j: [],a$e: $U,a$c: "Bignum",a$d: Number});$K = a$d({a$j: [],a$e: $j,a$f: {$C:
/* T_TestString::TestString.main */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
_a=self.$a().$F();
return _a}

},a$c: "T_TestString::TestString",a$h: {$F:
/* T_TestString::TestString#test */
function(){var self,_a,_i;
_a=_i=nil;
self=this;
if(self.$aI===undefined)self.$aI=nil;
if(self.$a$===undefined)self.$a$=nil;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
self.$t(nil,"hello");
self.$t(nil,"hallo\b\t\n");
self.$t(nil,"hallo\\leute");
self.$t(nil,"\"super\"");
self.$t(nil,"hello".$ax(nil,"e"));
self.$t(nil,"hello".$ax(nil,"lo"));
self.$t(nil,"hello".$ax(nil,"a"));
self.$t(nil,"hello hello".$ax(nil,"ll"));
self.$t(nil,"hello hello".$ax(nil,"ll",3));
self.$t(nil,"hallo".$8(nil,0,1));
self.$t(nil,"hallo".$8(nil,0,2));
self.$t(nil,"hallo".$8(nil,0,5));
self.$t(nil,"10".$as(nil,10,"0"));
self.$t(nil,"10".$as(nil,1,"blah"));
self.$t(nil,"x".$as(nil,4,"()"));
self.$t(nil,"10".$au(nil,10,"0"));
self.$t(nil,"10".$au(nil,1,"blah"));
self.$t(nil,"x".$au(nil,4,"()"));
self.$t(nil,("abc " + ((1).$$(nil,2)).$o() + (" def").$o()));
self.$aI="hallo".$i();
self.$a$=4.5;
self.$t(nil,("" + (self.$aI).$o() + (",").$o() + (self.$a$).$o()));
_a="hallo".$ay(nil,"l","r");
self.$t(nil,_a);
_a="hallo".$ay(nil,/ll/,"rr");
self.$t(nil,_a);
_a="hallo".$ay(function(){var _c=nil;
;
_c="r";
return _c},/l/);
self.$t(nil,_a);
_a="hallo".$ay(function(){var _e=nil;
;
_e="blah blah";
return _e},/ll/);
self.$t(nil,_a);
_i="hallllllo".$ay(function(_f){var _g;
var _h=nil;
_g=_f===undefined?nil:_f;
_h=self.$t(nil,_g);
return _h},/(l)l/);
return _i}

}});$M = a$d({a$j: [],a$e: $j,a$f: {$C:
/* T_TestClass::TestClass.main */
function(){var self,_a;
_a=nil;
self=this;
if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));
;
self.$t(nil,$u.$a().$m(nil,$u));
self.$t(nil,$u.$a().$m(nil,$v));
self.$t(nil,$v.$a().$m(nil,$u));
self.$t(nil,$u.$a().$m(nil,$t));
self.$t(nil,$v.$a().$m(nil,$t));
self.$t(nil,$u.$a().$h(nil,$u));
self.$t(nil,$u.$a().$h(nil,$v));
self.$t(nil,$v.$a().$h(nil,$u));
self.$t(nil,$u.$a().$h(nil,$t));
self.$t(nil,$v.$a().$h(nil,$t));
self.$t(nil,$w.$a().$h(nil,$t));
self.$t(nil,$w.$a().$h(nil,$u));
self.$t(nil,$w.$a().$h(nil,$v));
self.$t(nil,$w.$a().$h(nil,$w));
self.$t(nil,$w.$a().$h(nil,$m));
self.$t(nil,$w.$a().$h(nil,$j));
self.$t(nil,$w.$a().$h(nil,$i));
self.$t(nil,$w.$a().$h(nil,$b));
self.$t(nil,"hallo".$z().$e());
self.$t(nil,nil.$z().$e());
self.$t(nil,nil.$m(nil,$0));
self.$t(nil,"hallo".$m(nil,$e));
self.$t(nil,"hallo".$z());
self.$t(nil,$u);
self.$t(nil,$v);
self.$t(nil,$w);
self.$t(nil,$m);
self.$t(nil,$t);
self.$t(nil,$t.$e());
self.$t(nil,$u.$e());
_a=self.$t(nil,$v.$e());
return _a}

},a$c: "T_TestClass::TestClass"});$ac = a$d({a$j: [],a$e: $p,a$c: "LocalJumpError"});$ag = a$d({a$j: [],a$e: nil,a$c: "T_TestRange"});$ah = a$d({a$j: [],a$e: nil,a$c: "T_TestSplat"});$ai = a$d({a$j: [],a$e: nil,a$c: "T_TestCase"});$aj = a$d({a$j: [],a$e: nil,a$c: "T_TestArray"});a$d({a$j: [],a$g: $b});$ab = a$d({a$j: [],a$e: $j,a$c: "T_TestSend::C",a$h: {$n:
/* T_TestSend::C#method_missing */
function(_d,_a){var self,_b,_c,_e,_f;
_f=nil;
self=this;
_e=_d===undefined?nil:_d;
try{if(arguments.length<2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));
_b=[];
for(_c=2;_c<arguments.length;_c++)_b.push(arguments[_c]);
;
_f=self.$t(nil,("mm: " + (_a).$o() + (", ").$o() + (_b).$o()));
return _f}catch(_g){if(_g instanceof a$c && (!_g.a$b || _g.a$b==89))return _g.a$a;
throw(_g)}}

}});      $b.a$e = $j;
var a$n = [$i,$j,$k,$l,$m,$n,$o,$f,$p,$r,$s,$g,$t,$u,$v,$w,$x,$y,$z,$A,$P,$q,$Q,$d,$R,$S,$T,$U,$e,$L,$X,$C,$Y,$I,$Z,$0,$1,$2,$W,$3,$F,$c,$D,$6,$7,$J,$V,$8,$G,$9,$N,$$,$aa,$E,$h,$ad,$B,$_,$a,$H,$ae,$O,$af,$K,$M,$ac,$ag,$ah,$ai,$aj,$b,$ab];
a$o(a$n);
for (var i=0; i<a$n.length; i++) a$p(a$n[i]);
function main() { return $P.$C.apply($P, arguments); }
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
