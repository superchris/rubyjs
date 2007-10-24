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
// method map
var a$h = {"$X":"test","$G":"sub","$3":"end","$v":"each","$a2":"to_f","$al":"m","$x":"loop","$$":"%","$aN":"collect","$aw":"test_three_times_indirect","$aL":"member?","$ac":"&","$aG":"new_from_key_value_list","$as":"test_loop2","$aF":"three_times_yield","$f":"===","$aq":"three_times_block","$5":"==","$a3":"to_i","$aS":"reverse","$ax":"three_times_indirect","$7":"downto","$aP":"map","$ab":"times","$0":"include?","$t":"p","$a7":"keys","$s":"proc","$b":"allocate","$aQ":"reject","$aA":"three_times_yield2","$I":"size","$ai":"*","$H":"+","$Y":"delete","$a8":"values","$aZ":"unshift","$av":"return_in_block","$6":"upto","$a1":"dup","$J":"rjust","$K":"-","$a6":"not_a_method","$q":"nil?","$a":"new","$aY":"push","$au":"test_while_loop","$_":"/","$ar":"call","$E":"message","$y":"is_a?","$Q":"split","$W":"main","$e":"name","$l":"empty?","$a4":"to_splat","$ao":"jage","$j":"raise","$L":"length","$o":"to_s","$8":">=","$D":"c_method","$aa":"|","$h":"kind_of?","$aO":"find_all","$ad":"~","$at":"loop2","$N":"[]","$R":"strip","$az":"test_three_times_yield2","$ag":"-@","$aE":"test_return_in_block","$aV":"[]=","$9":"succ","$a0":"reverse!","$B":"hash","$z":"class","$i":"inspect","$ae":"^","$aB":"test_three_times_block","$aD":"test_three_times_yield","$p":"__send","$g":"eql?","$aW":"pop","$P":"<","$an":"wau","$U":"first","$2":"begin","$aK":"<<","$O":"ljust","$d":"__invoke","$af":">","$M":"<=","$c":"initialize","$w":"send","$C":"a_method","$r":"respond_to?","$aC":"test_loop","$k":"shift","$a5":"blah_blah","$4":"exclude_end?","$ah":"+@","$aR":"select","$am":"miau","$1":"to_a","$n":"method_missing","$S":"index","$aT":"join","$ay":"test_proc","$aU":"each_with_index","$A":"tap","$Z":"last","$m":"instance_of?","$T":"gsub","$u":"puts","$V":"match","$aX":"to_ary"};
var a$f = {};
for (var i in a$h) a$f[a$h[i]] = i;
$b = a$d({a$e: nil,a$f: {$a: function(_e,_a,_b,_c){var self,_d;self=this;try{if(arguments.length<3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));if(arguments.length>4)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 3)'));if(_c===undefined)_c=nil;;if((_d=_c,_d===false||_d===nil)){_c=(function() {})};return new self.a$d($b, _a, _b, _c);}catch(_f){if(_f instanceof a$c && (!_f.a$b || _f.a$b==2))return _f.a$a;throw(_f)}}},a$c: "Class",a$g: new a$a(a$a, nil, "Class", a$a),a$h: {$e: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;return self.a$c},$a: function(_c){var self,_a,_b,_d,_e,_f;_e=_f=nil;self=this;_d=_c===undefined?nil:_c;try{_a=[];for(_b=1;_b<arguments.length;_b++)_a.push(arguments[_b]);;_e=self.$b();_e.$d(_d,'$c',a$b(_a));_f=_e;return _f}catch(_g){if(_g instanceof a$c && (!_g.a$b || _g.a$b==0))return _g.a$a;throw(_g)}},$f: function(_d,_a){var self,_b,_c;_c=nil;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;_c=(_b=self.$g(nil,_a), (_b!==false&&_b!==nil) ? _b : (_a.$h(nil,self)));return _c}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==1))return _e.a$a;throw(_e)}},$b: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;return (new self.a$d())},$i: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;return self.a$c}}});a$e($b);$c = a$d({a$i: [],a$e: nil,a$c: "T_TestCase"});$j = a$d({a$i: [],a$e: nil,a$c: "Kernel",a$h: {$p: function(_d,_a){var self,_b,_c,_e;self=this;_e=_d===undefined?nil:_d;try{if(arguments.length<2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));_b=[];for(_c=2;_c<arguments.length;_c++)_b.push(arguments[_c]);;
      var m = self[a$f[_a]];
      if (m) 
        return m.apply(self, [_e].concat(_b));
      else
        return self.$n.apply(self, [_e].concat([_a]).concat(_b));}catch(_f){if(_f instanceof a$c && (!_f.a$b || _f.a$b==4))return _f.a$a;throw(_f)}},$n: function(_d,_a){var self,_b,_c,_e,_f;_f=nil;self=this;_e=_d===undefined?nil:_d;try{if(arguments.length<2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));_b=[];for(_c=2;_c<arguments.length;_c++)_b.push(arguments[_c]);;_f=self.$j(nil,$h,("undefined method `" + (_a).$o() + ("' for ").$o() + (self.$i()).$o()));return _f}catch(_g){if(_g instanceof a$c && (!_g.a$b || _g.a$b==3))return _g.a$a;throw(_g)}},$j: function(){var self,_a,_b,_c,_d;_c=_d=nil;self=this;_a=[];for(_b=1;_b<arguments.length;_b++)_a.push(arguments[_b]);;_c=((_b=_a.$l(),_b!==false&&_b!==nil)?$d.$a(nil,""):(_d=_a.$k(),((_b=_d.$h(nil,$b),_b!==false&&_b!==nil)?_d.$d(nil,'$a',a$b(_a)):((_b=_d.$m(nil,$g),_b!==false&&_b!==nil)?((_b=_a.$l(),_b!==false&&_b!==nil)?_d:$a.$a(nil,"to many arguments given to raise")):((_b=_d.$m(nil,$f),_b!==false&&_b!==nil)?((_b=_a.$l(),_b!==false&&_b!==nil)?$d.$a(nil,_d):$a.$a(nil,"to many arguments given to raise")):$e.$a(nil,"exception class/object expected"))))));throw(_c)},$q: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=false;return _a},$s: function(_a){var self,_b,_c;_c=nil;self=this;_b=_a===undefined?nil:_a;try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_c=$i.$a(_b);return _c}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==6))return _d.a$a;throw(_d)}},$r: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;
      var m = a$f[_a]; 
      return (m !== undefined && self[m] !== undefined && !self[m].a$j)}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==5))return _c.a$a;throw(_c)}},$t: function(){var self,_a,_b,_f;_f=nil;self=this;_a=[];for(_b=1;_b<arguments.length;_b++)_a.push(arguments[_b]);;_a.$v(function(_c){var _d;var _e=nil;_d=_c===undefined?nil:_c;_e=self.$u(nil,_d.$i());return _e});_f=nil;return _f},$d: function(_c,_a,_b){var self,_d;self=this;_d=_c===undefined?nil:_c;try{if(arguments.length!=3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));;
      var m = self[_a];
      if (m)
        return m.apply(self, [_d].concat(_b));
      else
        return self.$n.apply(self, 
          [_d].concat([a$h[_a]]).concat(_b));}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==7))return _e.a$a;throw(_e)}},$x: function(_a){var self,_b;_b=nil;self=this;try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;while(true){_a()};_b=nil;;return _b}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==10))return _c.a$a;throw(_c)}},$u: function(_b,_a){var self;self=this;try{if(arguments.length>2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));if(_a===undefined)_a="";;_a=_a.$o();STDOUT.push(_a)}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==9))return _c.a$a;throw(_c)}},$w: function(_d,_a){var self,_b,_c,_e;self=this;_e=_d===undefined?nil:_d;try{if(arguments.length<2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));_b=[];for(_c=2;_c<arguments.length;_c++)_b.push(arguments[_c]);;
      var m = self[a$f[_a]];
      if (m) 
        return m.apply(self, [_e].concat(_b));
      else
        return self.$n.apply(self, [_e].concat([_a]).concat(_b));}catch(_f){if(_f instanceof a$c && (!_f.a$b || _f.a$b==8))return _f.a$a;throw(_f)}}}});$k = a$d({a$i: [$j],a$e: nil,a$c: "Object",a$h: {$h: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;return a$i(self, _a)}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==11))return _c.a$a;throw(_c)}},$y: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;return a$i(self, _a)}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==12))return _c.a$a;throw(_c)}},$z: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;return self.a$g},$g: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;return (self.constructor == _a.constructor && self == _a)}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==13))return _c.a$a;throw(_c)}},$B: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;return self.toString()},$A: function(_a){var self,_b;_b=nil;self=this;try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a(self);_b=self;return _b}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==14))return _c.a$a;throw(_c)}},$o: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;return self.toString()},$c: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=nil;return _a},$f: function(_d,_a){var self,_b,_c;_c=nil;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;_c=(_b=self.$g(nil,_a), (_b!==false&&_b!==nil) ? _b : (self.$h(nil,_a)));return _c}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==15))return _e.a$a;throw(_e)}},$m: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;return (self.a$g === _a)}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==16))return _c.a$a;throw(_c)}},$i: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;return self.toString()}}});$l = a$d({a$i: [],a$e: $k,a$c: "T_TestSend::A",a$h: {$C: function(_d,_a,_b){var self,_c;_c=nil;self=this;try{if(arguments.length!=3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));;_c=self.$t(nil,_a,_b);return _c}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==17))return _e.a$a;throw(_e)}}}});$m = a$d({a$i: [],a$e: $l,a$c: "T_TestSend::B",a$h: {$C: function(_d,_a,_b){var self;self=this;var _c=arguments;try{if(arguments.length!=3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));;self.$t(nil,"in B");a$j(self,'$C',_c)}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==18))return _e.a$a;throw(_e)}},$D: function(_c,_a){var self,_b;_b=nil;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;_b=nil;return _b}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==19))return _d.a$a;throw(_d)}}}});$g = a$d({a$i: [],a$e: $k,a$c: "Exception",a$h: {$E: function(){var self,_a;_a=nil;self=this;if(self.$F===undefined)self.$F=nil;_a=self.$F;return _a},$o: function(){var self,_a;_a=nil;self=this;if(self.$F===undefined)self.$F=nil;_a=self.$F;return _a},$c: function(_d,_a){var self,_c,_b;_b=nil;self=this;try{if(arguments.length>2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));if(_a===undefined)_a=nil;;if((_c=_a.$q(),_c!==false&&_c!==nil)){_b=self.$F=self.$z().$e()}else{_b=self.$F=_a};return _b}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==20))return _e.a$a;throw(_e)}},$i: function(){var self,_a;_a=nil;self=this;if(self.$F===undefined)self.$F=nil;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=("#<" + (self.$z().$e()).$o() + (": ").$o() + (self.$F).$o() + (">").$o());return _a}}});$n = a$d({a$i: [],a$e: $g,a$c: "StandardError"});$d = a$d({a$i: [],a$e: $n,a$c: "RuntimeError"});$f = a$d({a$i: [],a$e: $k,a$c: "String",a$d: String,a$h: {$H: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;return(self + _a)}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==22))return _c.a$a;throw(_c)}},$G: function(_c,_a,_b){var self;self=this;try{if(arguments.length!=3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));;self.replace(pattern, replacement)}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==21))return _d.a$a;throw(_d)}},$J: function(_f,_a,_b){var self,_c,_d,_e;_d=_e=nil;self=this;try{if(arguments.length<2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));if(arguments.length>3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));if(_b===undefined)_b=" ";;if((_c=_b.$l(),_c!==false&&_c!==nil)){self.$j(nil,$a,"zero width padding")};_d=_a.$K(nil,self.$L());if((_c=_d.$M(nil,0),_c!==false&&_c!==nil)){return self};_e="";while(_e.length < _d) _e += _b;;return _e.$N(nil,0,_d).$H(nil,self)}catch(_g){if(_g instanceof a$c && (!_g.a$b || _g.a$b==23))return _g.a$a;throw(_g)}},$I: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;return self.length},$N: function(_d,_a,_b){var self,_c;self=this;try{if(arguments.length<2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));if(arguments.length>3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));if(_b===undefined)_b=nil;;if((_c=_b.$q(),_c!==false&&_c!==nil)){return self.charAt(_a) || nil}else{if((_c=_b.$P(nil,0),_c!==false&&_c!==nil)){return nil};return self.substring(_a, _a+_b)}}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==25))return _e.a$a;throw(_e)}},$O: function(_f,_a,_b){var self,_c,_d,_e;_d=_e=nil;self=this;try{if(arguments.length<2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));if(arguments.length>3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));if(_b===undefined)_b=" ";;if((_c=_b.$l(),_c!==false&&_c!==nil)){self.$j(nil,$a,"zero width padding")};_d=_a.$K(nil,self.$L());if((_c=_d.$M(nil,0),_c!==false&&_c!==nil)){return self};_e="";while(_e.length < _d) _e += _b;;return self.$H(nil,_e.$N(nil,0,_d))}catch(_g){if(_g instanceof a$c && (!_g.a$b || _g.a$b==24))return _g.a$a;throw(_g)}},$Q: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;return self.split(_a)}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==26))return _c.a$a;throw(_c)}},$o: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self;return _a},$L: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;return self.length},$R: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;return self.replace(/^\s+/, '').replace(/\s+$/, '')},$l: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;return(self === "")},$T: function(_g,_a,_b){var self,_c,_d,_e,_f;_d=_e=_f=nil;self=this;try{if(arguments.length<2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));if(arguments.length>3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));if(_b===undefined)_b=nil;;(_c=["",self,nil],_d=_c[0]===undefined?nil:_c[0],_e=_c[1]===undefined?nil:_c[1],_f=_c[2]===undefined?nil:_c[2],_c);while(_e.length > 0) {
        if (_f = _e.match(_a)) {
          _d += _e.slice(0, _f.index);;if((_c=_b,_c!==false&&_c!==nil)){_d=_d.$H(nil,_b)}else{_d=_d.$H(nil,_g(_f.$U()).$o())};_e = _e.slice(_f.index + _f[0].length);
        } else {
          _d += _e; _e = '';
        }
      } return _d}catch(_h){if(_h instanceof a$c && (!_h.a$b || _h.a$b==28))return _h.a$a;throw(_h)}},$S: function(_c,_a,_b){var self;self=this;try{if(arguments.length<2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));if(arguments.length>3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));if(_b===undefined)_b=0;;
      var i = self.indexOf(_a, _b);
      return (i == -1) ? nil : i}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==27))return _d.a$a;throw(_d)}},$i: function(){var self,_a,_b;_a=_b=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a={
        '\b': '\\b',
        '\t': '\\t',
        '\n': '\\n',
        '\f': '\\f',
        '\r': '\\r',
        '\\': '\\\\'
      };;_b=self.$T(function(_c){var _d,_e;_d=_c===undefined?nil:_c;_e=_a[_d];return _e ? _e : 
          '\\u00' + ("0" + _d.charCodeAt().toString(16)).substring(0,2);},/[\x00-\x1f\\]/);return ('"' + _b.replace(/"/g, '\\"') + '"');},$V: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;
      var i = self.match(_a);
      return (i === null) ? nil : i}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==29))return _c.a$a;throw(_c)}}}});$o = a$d({a$i: [],a$e: $k,a$c: "T_TestClass::D"});$p = a$d({a$i: [],a$e: $k,a$f: {$W: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;self.$t(nil,"a".$g(nil,"a"));self.$t(nil,"a".$g(nil,1));self.$t(nil,"1".$g(nil,1));self.$t(nil,[1,2].$g(nil,[1,2]));_a=self.$t(nil,(1).$g(nil,"1"));return _a}},a$c: "T_TestEql::TestEql"});$q = a$d({a$i: [],a$e: nil,a$c: "T_TestArgs"});$r = a$d({a$i: [],a$e: $k,a$f: {$W: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self.$a().$X();return _a}},a$c: "T_TestArray::TestArray",a$h: {$X: function(){var self,_a,_b;_a=_b=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=["a","b","b","b","c"];self.$t(nil,_a.$Y(nil,"b"));self.$t(nil,_a);_b=self.$t(nil,_a.$Y(nil,"z"));return _b}}});$t = a$d({a$i: [],a$e: $k,a$f: {$W: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self.$a().$X();return _a}},a$c: "T_TestRange::TestRange",a$h: {$X: function(){var self,_a,_i,_j;_a=_i=_j=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=$s.$a(nil,0,2);self.$t(nil,_a.$U());self.$t(nil,_a.$Z());self.$t(nil,_a);self.$t(nil,$s.$a(nil,0,2,false).$o());self.$t(nil,$s.$a(nil,0,2,true).$o());$s.$a(nil,0,4,false).$v(function(_b){var _c;var _d=nil;_c=_b===undefined?nil:_b;_d=self.$t(nil,_c);return _d});$s.$a(nil,0,4,true).$v(function(_e){var _c;var _f=nil;_c=_e===undefined?nil:_e;_f=self.$t(nil,_c);return _f});$s.$a(nil,-1,-4,false).$v(function(_g){var _c;var _h=nil;_c=_g===undefined?nil:_g;_h=self.$t(nil,_c);return _h});self.$t(nil,$s.$a(nil,0,4,false).$0(nil,4));self.$t(nil,$s.$a(nil,0,4,false).$0(nil,5));self.$t(nil,$s.$a(nil,0,4,true).$0(nil,5));self.$t(nil,$s.$a(nil,0,4,true).$0(nil,4));self.$t(nil,$s.$a(nil,0,4,true).$0(nil,3));self.$t(nil,$s.$a(nil,0,4,true).$0(nil,0));self.$t(nil,$s.$a(nil,0,4,true).$0(nil,-1));self.$t(nil,$s.$a(nil,-1,-5,false).$1());self.$t(nil,$s.$a(nil,-5,-1,false).$1());_i=$s.$a(nil,0,4);self.$t(nil,_i.$U());self.$t(nil,_i.$2());self.$t(nil,_i.$Z());self.$t(nil,_i.$3());self.$t(nil,_i.$4());_i=$s.$a(nil,1,5,true);self.$t(nil,_i.$U());self.$t(nil,_i.$2());self.$t(nil,_i.$Z());self.$t(nil,_i.$3());self.$t(nil,_i.$4());self.$t(nil,false.$5(nil,false));self.$t(nil,false.$5(nil,true));self.$t(nil,true.$5(nil,false));self.$t(nil,true.$5(nil,true));self.$t(nil,$s.$a(nil,0,2,false).$5(nil,$s.$a(nil,0,2,false)));self.$t(nil,$s.$a(nil,0,2,false).$5(nil,$s.$a(nil,0,2)));_j=self.$t(nil,$s.$a(nil,0,2,false).$5(nil,$s.$a(nil,0,2,true)));return _j}}});$u = a$d({a$i: [],a$e: nil,a$c: "T_TestClass::X"});$v = a$d({a$i: [$u],a$e: $k,a$c: "T_TestClass::A"});$w = a$d({a$i: [],a$e: $v,a$c: "T_TestClass::B"});$x = a$d({a$i: [],a$e: $w,a$c: "T_TestClass::C"});$y = a$d({a$i: [],a$e: $k,a$f: {$W: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self.$a().$X();return _a}},a$c: "T_TestNew::TestNew",a$h: {$c: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=nil;return _a},$X: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self.$u(nil,"test");return _a}}});$z = a$d({a$i: [],a$e: nil,a$c: "T_TestLebewesen"});$O = a$d({a$i: [],a$e: $k,a$f: {$W: function(){var self,_c,_d,_b;_c=_b=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;try{self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");self.$u(nil,"Test splat");self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");$A.$W();self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");self.$u(nil,"Test simple output");self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");$B.$W();self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");self.$u(nil,"Test new");self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");$y.$W();self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");self.$u(nil,"Test massign");self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");$C.$W();self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");self.$u(nil,"Test send");self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");$D.$W();self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");self.$u(nil,"Test if");self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");$E.$W();self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");self.$u(nil,"Test hash");self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");$F.$W();self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");self.$u(nil,"Test exception");self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");$G.$W();self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");self.$u(nil,"Test eql");self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");$p.$W();self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");self.$u(nil,"Test args");self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");$H.$W();self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");self.$u(nil,"Test yield");self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");$I.$W();self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");self.$u(nil,"Test string");self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");$J.$W();self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");self.$u(nil,"Test array");self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");$r.$W();self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");self.$u(nil,"Test lebewesen");self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");$K.$W();self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");self.$u(nil,"Test class");self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");$L.$W();self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");self.$u(nil,"Test case");self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");$M.$W();self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");self.$u(nil,"Test expr");self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");$N.$W();self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");self.$u(nil,"Test range");self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");_b=$t.$W()}catch(_a){if(_a instanceof a$c)throw(_a);if((_d=$g.$f(nil,_a),_d!==false&&_d!==nil)){_c=(typeof(_a)=='undefined'?nil:_a);self.$t(nil,"unhandled exception");_b=self.$t(nil,_c)}else{throw(_a)}};return _b}},a$c: "TestSuite"});$P = a$d({a$i: [],a$e: $n,a$c: "LocalJumpError"});$Q = a$d({a$i: [],a$e: nil,a$c: "T_TestMassign"});$R = a$d({a$i: [],a$e: $k,a$c: "Number",a$d: Number,a$h: {$H: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;return self + _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==33))return _c.a$a;throw(_c)}},$5: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;return self == _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==32))return _c.a$a;throw(_c)}},$7: function(_d,_a){var self,_b,_c;_b=nil;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;_b=self;while((_c=_b.$8(nil,_a),_c!==false&&_c!==nil)){_d(_b);_b=_b.$K(nil,1)};return self}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==31))return _e.a$a;throw(_e)}},$6: function(_d,_a){var self,_b,_c;_b=nil;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;_b=self;while((_c=_b.$M(nil,_a),_c!==false&&_c!==nil)){_d(_b);_b=_b.$H(nil,1)};return self}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==30))return _e.a$a;throw(_e)}},$M: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;return self <= _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==34))return _c.a$a;throw(_c)}},$K: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;return self - _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==35))return _c.a$a;throw(_c)}},$9: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;return self+1},$_: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;return self / _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==37))return _c.a$a;throw(_c)}},$o: function(_b,_a){var self;self=this;try{if(arguments.length>2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));if(_a===undefined)_a=10;;return self.toString(_a)}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==36))return _c.a$a;throw(_c)}},$$: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;return self % _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==38))return _c.a$a;throw(_c)}},$ac: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;return self & _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==42))return _c.a$a;throw(_c)}},$P: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;return self < _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==41))return _c.a$a;throw(_c)}},$ab: function(_c){var self,_a,_b;_a=nil;self=this;try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=0;while((_b=_a.$P(nil,self),_b!==false&&_b!==nil)){_c(_a);_a=_a.$H(nil,1)};return self}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==40))return _d.a$a;throw(_d)}},$aa: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;return self | _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==39))return _c.a$a;throw(_c)}},$ag: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;return -self},$af: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;return self > _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==44))return _c.a$a;throw(_c)}},$ae: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;return self ^ _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==43))return _c.a$a;throw(_c)}},$ad: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;return ~self},$8: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;return self >= _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==45))return _c.a$a;throw(_c)}},$i: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;return self.toString()},$ai: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;return self * _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==46))return _c.a$a;throw(_c)}},$ah: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;return self}}});$S = a$d({a$i: [],a$e: $R,a$c: "Float",a$d: Number});$T = a$d({a$i: [],a$e: nil,a$c: "T_TestSimpleOutput"});$C = a$d({a$i: [],a$e: $k,a$f: {$W: function(){var self,_a,_b,_c,_d,_e,_f;_a=_b=_c=_d=_e=_f=nil;self=this;if(self.$aj===undefined)self.$aj=nil;if(self.$ak===undefined)self.$ak=nil;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;(_a=[1,2],_b=_a[0]===undefined?nil:_a[0],_c=_a[1]===undefined?nil:_a[1],_a);self.$t(nil,_b);self.$t(nil,_c);self.$u(nil,"--");(_a=[1,2,3],_b=_a[0]===undefined?nil:_a[0],_c=_a[1]===undefined?nil:_a[1],_a);self.$t(nil,_b);self.$t(nil,_c);self.$u(nil,"--");_d=5;(_a=[1,2],_b=_a[0]===undefined?nil:_a[0],_c=_a[1]===undefined?nil:_a[1],_d=_a[2]===undefined?nil:_a[2],_a);self.$t(nil,_b);self.$t(nil,_c);self.$t(nil,_d);self.$u(nil,"--");(_a=[1,2,3],self.$aj=_a[0]===undefined?nil:_a[0],_c=_a[1]===undefined?nil:_a[1],self.$ak=_a[2]===undefined?nil:_a[2],_a);self.$t(nil,self.$aj);self.$t(nil,_c);self.$t(nil,self.$ak);self.$u(nil,"--");self.$u(nil,"swap");(_a=[1,2],_b=_a[0]===undefined?nil:_a[0],_c=_a[1]===undefined?nil:_a[1],_a);self.$t(nil,_b);self.$t(nil,_c);(_a=[_c,_b],_b=_a[0]===undefined?nil:_a[0],_c=_a[1]===undefined?nil:_a[1],_a);self.$t(nil,_b);self.$t(nil,_c);self.$u(nil,"--");self.$u(nil,"splat1");(_a=[1,2],_b=_a[0]===undefined?nil:_a[0],_c=_a[1]===undefined?nil:_a[1],_d=_a[2]===undefined?nil:_a[2],_e=_a.slice(3),_a);self.$t(nil,_b);self.$t(nil,_c);self.$t(nil,_d);self.$t(nil,_e);self.$u(nil,"--");self.$u(nil,"splat2");(_a=[1,2],_b=_a[0]===undefined?nil:_a[0],_c=_a.slice(1),_a);self.$t(nil,_b);self.$t(nil,_c);self.$u(nil,"--");self.$u(nil,"splat3");(_a=[1,2,3,4,5],_b=_a[0]===undefined?nil:_a[0],_c=_a.slice(1),_a);self.$t(nil,_b);self.$t(nil,_c);self.$u(nil,"--");self.$u(nil,"splat with globals");self.$t(nil,(typeof($U)=='undefined'?nil:$U));self.$t(nil,(typeof($V)=='undefined'?nil:$V));(_a=[1,2],$U=_a[0]===undefined?nil:_a[0],$V=_a[1]===undefined?nil:_a[1],_a);self.$t(nil,(typeof($U)=='undefined'?nil:$U));self.$t(nil,(typeof($V)=='undefined'?nil:$V));_f=self.$u(nil,"--");return _f}},a$c: "T_TestMassign::TestMassign"});$H = a$d({a$i: [],a$e: $k,a$f: {$W: function(){var self,_a,_b;_a=_b=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self.$a();_a.$al(nil,0);self.$u(nil,"--");_a.$al(nil,1,2);self.$u(nil,"--");_a.$al(nil,1,2,9);self.$u(nil,"--");_a.$al(nil,1,2,9,5);self.$u(nil,"--");_a.$al(nil,1,2,9,5,6);self.$u(nil,"--");_b=_a.$al(nil,1,2,9,5,6,7,8,9,10,11,12);return _b}},a$c: "T_TestArgs::TestArgs",a$h: {$al: function(_g,_a,_b,_c){var self,_d,_e,_f;_f=nil;self=this;try{if(arguments.length<2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));if(_b===undefined)_b=1;if(_c===undefined)_c="hallo";_d=[];for(_e=4;_e<arguments.length;_e++)_d.push(arguments[_e]);;self.$t(nil,_a);self.$t(nil,_b);self.$t(nil,_c);_f=self.$t(nil,_d);return _f}catch(_h){if(_h instanceof a$c && (!_h.a$b || _h.a$b==47))return _h.a$a;throw(_h)}}}});$K = a$d({a$i: [],a$e: $k,a$f: {$W: function(){var self,_a,_b,_c,_d;_a=_b=_c=_d=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=$W.$a(nil,"AA-BB","Leni");_b=$W.$a(nil,"AC-DC","Flocki");_c=$X.$a(nil,"AA-ZZ");_a.$am();_c.$an();_d=_c.$ao(nil,_a);return _d}},a$c: "T_TestLebewesen::TestLebewesen"});$e = a$d({a$i: [],a$e: $n,a$c: "TypeError"});$Y = a$d({a$i: [],a$e: $k,a$c: "Boolean",a$d: Boolean,a$h: {$5: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;return (self == _a)}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==48))return _c.a$a;throw(_c)}},$o: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;return (self == true ? 'true' : 'false')},$i: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;return (self == true ? 'true' : 'false')}}});$E = a$d({a$i: [],a$e: $k,a$f: {$W: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self.$a().$X();return _a}},a$c: "T_TestIf::TestIf",a$h: {$X: function(){var self,_a,_b,_c,_d,_e,_f;_f=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;if(true){self.$u(nil,"OK")};if(false){self.$u(nil,"NOT OK")};if(true){self.$u(nil,"OK")};if(false){self.$u(nil,"NOT OK")};if((_a=(_b=true, (_b!==false&&_b!==nil) ? ((_c=true, (_c!==false&&_c!==nil) ? ((_d=(_e=true, (_e!==false&&_e!==nil) ? _e : (false)), (_d!==false&&_d!==nil) ? (true) : _d)) : _c)) : _b),_a!==false&&_a!==nil)){self.$u(nil,"OK")};if((_a=(_b=(5).$P(nil,6), (_b!==false&&_b!==nil) ? ((6).$P(nil,7)) : _b),_a!==false&&_a!==nil)){self.$u(nil,"OK")};self.$t(nil,(_a=false, (_a!==false&&_a!==nil) ? _a : ("a")));self.$t(nil,(_a=nil, (_a!==false&&_a!==nil) ? _a : ("a")));self.$t(nil,(_a=true, (_a!==false&&_a!==nil) ? _a : ("a")));self.$t(nil,(_a="b", (_a!==false&&_a!==nil) ? _a : ("a")));self.$t(nil,(_a=false, (_a!==false&&_a!==nil) ? ("a") : _a));self.$t(nil,(_a=nil, (_a!==false&&_a!==nil) ? ("a") : _a));self.$t(nil,(_a=true, (_a!==false&&_a!==nil) ? ("a") : _a));_f=self.$t(nil,(_a="b", (_a!==false&&_a!==nil) ? ("a") : _a));return _f}}});$Z = a$d({a$i: [],a$e: nil,a$c: "T_TestSend"});$0 = a$d({a$i: [],a$e: nil,a$c: "T_TestYield"});$1 = a$d({a$i: [],a$e: nil,a$c: "T_TestClass"});$2 = a$d({a$i: [],a$e: nil,a$c: "T_TestHash"});$3 = a$d({a$i: [],a$e: $n,a$c: "NameError"});$a = a$d({a$i: [],a$e: $n,a$c: "ArgumentError"});$4 = a$d({a$i: [],a$e: $k,a$c: "T_TestLebewesen::Lebewesen",a$h: {$c: function(_c,_a){var self,_b;_b=nil;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;_b=self.$ap=_a;return _b}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==49))return _d.a$a;throw(_d)}}}});$X = a$d({a$i: [],a$e: $4,a$c: "T_TestLebewesen::Hund",a$h: {$an: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self.$u(nil,"wau wau");return _a},$ao: function(_c,_a){var self,_b;_b=nil;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;_b=self.$u(nil,"ich jage ".$H(nil,_a.$e()));return _b}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==50))return _d.a$a;throw(_d)}}}});$I = a$d({a$i: [],a$e: $k,a$f: {$W: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self.$a().$X();return _a}},a$c: "T_TestYield::TestYield",a$h: {$as: function(){var self,_a,_b,_d,_f;_a=_b=_f=nil;self=this;try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;self.$u(nil,"loop2");_a=0;_b=self.$at(function(){var _e=nil;;_a=_a.$H(nil,1);if((_d=_a.$$(nil,2).$5(nil,1),_d!==false&&_d!==nil)){return nil};self.$t(nil,_a);if((_d=_a.$af(nil,8),_d!==false&&_d!==nil)){throw(new a$c(["out",_a],null))}else{_e=nil};return _e});self.$t(nil,_b);_f=self.$u(nil,"--");return _f}catch(_g){if(_g instanceof a$c && (!_g.a$b || _g.a$b==52))return _g.a$a;throw(_g)}},$aq: function(_a){var self,_b,_c;_c=nil;self=this;_b=_a===undefined?nil:_a;try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_b.$ar(nil,1);_b.$ar(nil,2);_c=_b.$ar(nil,3);return _c}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==51))return _d.a$a;throw(_d)}},$av: function(_a){var self,_b,_c;_c=nil;self=this;_b=_a===undefined?nil:_a;try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;self.$t(nil,"return_in_block before");_b.$ar();_c=self.$t(nil,"return_in_block after");return _c}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==53))return _d.a$a;throw(_d)}},$au: function(){var self,_a,_b,_c;_a=_c=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;self.$u(nil,"while-loop");_a=0;while(true){_a=_a.$H(nil,1);if((_b=_a.$$(nil,2).$5(nil,1),_b!==false&&_b!==nil)){continue};self.$t(nil,_a);if((_b=_a.$af(nil,8),_b!==false&&_b!==nil)){break}};self.$u(nil,"----");while((_b=_a.$af(nil,0),_b!==false&&_b!==nil)){self.$t(nil,_a);_a=_a.$K(nil,1)};_c=self.$u(nil,"--");return _c},$at: function(_a){var self,_b,_c;_c=nil;self=this;_b=_a===undefined?nil:_a;try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;while(true){_b.$ar()};_c=self.$t(nil,"not reached");return _c}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==55))return _d.a$a;throw(_d)}},$ay: function(){var self,_a,_d;_a=_d=nil;self=this;try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;self.$t(nil,"test_proc");_a=self.$s(function(){;throw(new a$c(0,54))});self.$t(nil,_a.$ar());_a=$i.$a(function(){;throw(new a$c(3,null))});_d=self.$t(nil,_a.$ar());return _d}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==54))return _e.a$a;throw(_e)}},$aw: function(){var self,_d;_d=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;self.$u(nil,"three_times_indirect");self.$ax(function(_a){var _b;var _c=nil;_b=_a===undefined?nil:_a;_c=self.$t(nil,_b);return _c});_d=self.$u(nil,"--");return _d},$az: function(){var self,_d,_e;_e=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;self.$u(nil,"three_times_yield2");_e=self.$aA(function(_a){var _b;var _c=nil;_b=_a===undefined?nil:_a;if((_d=_b.$5(nil,1),_d!==false&&_d!==nil)){_c=_b}else{return _b.$H(nil,1)};return _c});return _e},$aC: function(){var self,_a,_b,_d,_f;_a=_b=_f=nil;self=this;try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;self.$u(nil,"loop");_a=0;_b=self.$x(function(){var _e=nil;;_a=_a.$H(nil,1);if((_d=_a.$$(nil,2).$5(nil,1),_d!==false&&_d!==nil)){return nil};self.$t(nil,_a);if((_d=_a.$af(nil,8),_d!==false&&_d!==nil)){throw(new a$c(["out",_a],null))}else{_e=nil};return _e});self.$t(nil,_b);_f=self.$u(nil,"--");return _f}catch(_g){if(_g instanceof a$c && (!_g.a$b || _g.a$b==56))return _g.a$a;throw(_g)}},$aB: function(){var self,_d;_d=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;self.$u(nil,"three_times_block");self.$aq(function(_a){var _b;var _c=nil;_b=_a===undefined?nil:_a;_c=self.$t(nil,_b);return _c});_d=self.$u(nil,"--");return _d},$X: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;self.$aD();self.$aB();self.$aw();self.$az();self.$aC();self.$as();self.$au();self.$ay();_a=self.$t(nil,self.$aE());return _a},$x: function(_a){var self,_b;_b=nil;self=this;try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;while(true){_a()};_b=self.$t(nil,"not reached");return _b}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==59))return _c.a$a;throw(_c)}},$ax: function(_a){var self,_b,_c;_c=nil;self=this;_b=_a===undefined?nil:_a;try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;self.$aF(_b);_c=self.$aq(_b);return _c}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==58))return _d.a$a;throw(_d)}},$aF: function(_a){var self,_b;_b=nil;self=this;try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a(1);_a(2);_b=_a(3);return _b}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==57))return _c.a$a;throw(_c)}},$aA: function(_a){var self,_b;_b=nil;self=this;try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;self.$t(nil,_a(1));self.$t(nil,_a(2));_b=self.$t(nil,_a(3));return _b}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==60))return _c.a$a;throw(_c)}},$aE: function(){var self,_b;_b=nil;self=this;try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;self.$t(nil,"before");self.$av(function(){;throw(new a$c(4,61))});_b=self.$t(nil,"after (NOT)");return _b}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==61))return _c.a$a;throw(_c)}},$aD: function(){var self,_d;_d=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;self.$u(nil,"three_times_yield");self.$aF(function(_a){var _b;var _c=nil;_b=_a===undefined?nil:_a;_c=self.$t(nil,_b);return _c});_d=self.$u(nil,"--");return _d}}});$F = a$d({a$i: [],a$e: $k,a$f: {$W: function(){var self,_a,_b;_a=_b=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=$5.$aG(nil,"a",6,"b",7,"1",1,1,2,"1,2","hello",[1,2],"good");self.$t(nil,_a.$N(nil,"a"));self.$t(nil,_a.$N(nil,"b"));self.$t(nil,_a.$N(nil,"1"));self.$t(nil,_a.$N(nil,1));self.$t(nil,_a.$N(nil,"1,2"));_b=self.$t(nil,_a.$N(nil,[1,2]));return _b}},a$c: "T_TestHash::TestHash"});$s = a$d({a$i: [],a$e: $k,a$c: "Range",a$h: {$5: function(_e,_a){var self,_b,_c,_d;_d=nil;self=this;if(self.$aH===undefined)self.$aH=nil;if(self.$aI===undefined)self.$aI=nil;if(self.$aJ===undefined)self.$aJ=nil;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;if (self.constructor != _a.constructor) return false;;_d=(_b=self.$aH.$5(nil,_a.$U()), (_b!==false&&_b!==nil) ? ((_c=self.$aI.$5(nil,_a.$Z()), (_c!==false&&_c!==nil) ? (self.$aJ.$5(nil,_a.$4())) : _c)) : _b);return _d}catch(_f){if(_f instanceof a$c && (!_f.a$b || _f.a$b==62))return _f.a$a;throw(_f)}},$2: function(){var self,_a;_a=nil;self=this;if(self.$aH===undefined)self.$aH=nil;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self.$aH;return _a},$g: function(_e,_a){var self,_b,_c,_d;_d=nil;self=this;if(self.$aH===undefined)self.$aH=nil;if(self.$aI===undefined)self.$aI=nil;if(self.$aJ===undefined)self.$aJ=nil;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;if (self.constructor != _a.constructor) return false;;_d=(_b=self.$aH.$g(nil,_a.$U()), (_b!==false&&_b!==nil) ? ((_c=self.$aI.$g(nil,_a.$Z()), (_c!==false&&_c!==nil) ? (self.$aJ.$5(nil,_a.$4())) : _c)) : _b);return _d}catch(_f){if(_f instanceof a$c && (!_f.a$b || _f.a$b==63))return _f.a$a;throw(_f)}},$4: function(){var self,_a;_a=nil;self=this;if(self.$aJ===undefined)self.$aJ=nil;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self.$aJ;return _a},$Z: function(){var self,_a;_a=nil;self=this;if(self.$aI===undefined)self.$aI=nil;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self.$aI;return _a},$o: function(){var self,_b,_a;_a=nil;self=this;if(self.$aH===undefined)self.$aH=nil;if(self.$aI===undefined)self.$aI=nil;if(self.$aJ===undefined)self.$aJ=nil;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;if((_b=self.$aJ,_b!==false&&_b!==nil)){_a=("" + (self.$aH).$o() + ("...").$o() + (self.$aI).$o())}else{_a=("" + (self.$aH).$o() + ("..").$o() + (self.$aI).$o())};return _a},$v: function(_c){var self,_a,_b,_d;_a=_d=nil;self=this;if(self.$aH===undefined)self.$aH=nil;if(self.$aI===undefined)self.$aI=nil;if(self.$aJ===undefined)self.$aJ=nil;try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self.$aH;if((_b=self.$aH.$af(nil,self.$aI),_b!==false&&_b!==nil)){return nil};if((_b=self.$aJ,_b!==false&&_b!==nil)){while((_b=_a.$P(nil,self.$aI),_b!==false&&_b!==nil)){_c(_a);_a=_a.$9()};_d=nil;}else{while((_b=_a.$M(nil,self.$aI),_b!==false&&_b!==nil)){_c(_a);_a=_a.$9()};_d=nil;};return _d}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==66))return _e.a$a;throw(_e)}},$3: function(){var self,_a;_a=nil;self=this;if(self.$aI===undefined)self.$aI=nil;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self.$aI;return _a},$U: function(){var self,_a;_a=nil;self=this;if(self.$aH===undefined)self.$aH=nil;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self.$aH;return _a},$0: function(_d,_a){var self,_b,_c;_c=nil;self=this;if(self.$aH===undefined)self.$aH=nil;if(self.$aI===undefined)self.$aI=nil;if(self.$aJ===undefined)self.$aJ=nil;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;if((_b=_a.$P(nil,self.$aH),_b!==false&&_b!==nil)){return false};if((_b=self.$aJ,_b!==false&&_b!==nil)){_c=_a.$P(nil,self.$aI)}else{_c=_a.$M(nil,self.$aI)};return _c}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==65))return _e.a$a;throw(_e)}},$c: function(_f,_a,_b,_c){var self,_d,_e;_e=nil;self=this;try{if(arguments.length<3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));if(arguments.length>4)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 3)'));if(_c===undefined)_c=false;;(_d=[_a,_b],self.$aH=_d[0]===undefined?nil:_d[0],self.$aI=_d[1]===undefined?nil:_d[1],_d);_e=self.$aJ=((_d=_c,_d!==false&&_d!==nil)?true:false);return _e}catch(_g){if(_g instanceof a$c && (!_g.a$b || _g.a$b==64))return _g.a$a;throw(_g)}},$f: function(_d,_a){var self,_b,_c;_c=nil;self=this;if(self.$aH===undefined)self.$aH=nil;if(self.$aI===undefined)self.$aI=nil;if(self.$aJ===undefined)self.$aJ=nil;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;if((_b=_a.$P(nil,self.$aH),_b!==false&&_b!==nil)){return false};if((_b=self.$aJ,_b!==false&&_b!==nil)){_c=_a.$P(nil,self.$aI)}else{_c=_a.$M(nil,self.$aI)};return _c}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==67))return _e.a$a;throw(_e)}},$1: function(){var self,_a,_b,_c;_a=_c=nil;self=this;if(self.$aH===undefined)self.$aH=nil;if(self.$aI===undefined)self.$aI=nil;if(self.$aJ===undefined)self.$aJ=nil;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=[];if((_b=self.$aH.$af(nil,self.$aI),_b!==false&&_b!==nil)){return _a};_c=self.$aH;if((_b=self.$aJ,_b!==false&&_b!==nil)){while((_b=_c.$P(nil,self.$aI),_b!==false&&_b!==nil)){_a.$aK(nil,_c);_c=_c.$9()}}else{while((_b=_c.$M(nil,self.$aI),_b!==false&&_b!==nil)){_a.$aK(nil,_c);_c=_c.$9()}};return _a},$i: function(){var self,_b,_a;_a=nil;self=this;if(self.$aH===undefined)self.$aH=nil;if(self.$aI===undefined)self.$aI=nil;if(self.$aJ===undefined)self.$aJ=nil;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;if((_b=self.$aJ,_b!==false&&_b!==nil)){_a=("" + (self.$aH.$i()).$o() + ("...").$o() + (self.$aI.$i()).$o())}else{_a=("" + (self.$aH.$i()).$o() + ("..").$o() + (self.$aI.$i()).$o())};return _a},$aL: function(_d,_a){var self,_b,_c;_c=nil;self=this;if(self.$aH===undefined)self.$aH=nil;if(self.$aI===undefined)self.$aI=nil;if(self.$aJ===undefined)self.$aJ=nil;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;if((_b=_a.$P(nil,self.$aH),_b!==false&&_b!==nil)){return false};if((_b=self.$aJ,_b!==false&&_b!==nil)){_c=_a.$P(nil,self.$aI)}else{_c=_a.$M(nil,self.$aI)};return _c}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==68))return _e.a$a;throw(_e)}}}});$6 = a$d({a$i: [],a$e: nil,a$c: "T_TestString"});$7 = a$d({a$i: [],a$e: $R,a$c: "Fixnum",a$d: Number});$W = a$d({a$i: [],a$e: $4,a$c: "T_TestLebewesen::Katze",a$h: {$e: function(){var self,_a;_a=nil;self=this;if(self.$aM===undefined)self.$aM=nil;_a=self.$aM;return _a},$c: function(_d,_a,_b){var self,_c;_c=nil;self=this;try{if(arguments.length!=3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));;a$k(self,'$c',nil,[_a]);_c=self.$aM=_b;return _c}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==69))return _e.a$a;throw(_e)}},$am: function(){var self,_a;_a=nil;self=this;if(self.$aM===undefined)self.$aM=nil;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self.$u(nil,"miau, ich bin ".$H(nil,self.$aM));return _a}}});$8 = a$d({a$i: [],a$e: nil,a$c: "Enumerable",a$h: {$aN: function(_a){var self,_b,_c,_f,_h;_c=_h=nil;self=this;_b=_a===undefined?nil:_a;try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_c=[];self.$v(function(_d){var _e;var _g=nil;_e=_d===undefined?nil:_d;_g=_c.$aK(nil,((_f=_b,_f!==false&&_f!==nil)?_b.$ar(nil,_e):_e));return _g});_h=_c;return _h}catch(_i){if(_i instanceof a$c && (!_i.a$b || _i.a$b==70))return _i.a$a;throw(_i)}},$aO: function(_f){var self,_a,_e,_g;_a=_g=nil;self=this;try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=[];self.$v(function(_b){var _c;var _d=nil;_c=_b===undefined?nil:_b;if((_e=_f(_c),_e!==false&&_e!==nil)){_d=_a.$aK(nil,_c)}else{_d=nil};return _d});_g=_a;return _g}catch(_h){if(_h instanceof a$c && (!_h.a$b || _h.a$b==71))return _h.a$a;throw(_h)}},$aP: function(_a){var self,_b,_c,_f,_h;_c=_h=nil;self=this;_b=_a===undefined?nil:_a;try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_c=[];self.$v(function(_d){var _e;var _g=nil;_e=_d===undefined?nil:_d;_g=_c.$aK(nil,((_f=_b,_f!==false&&_f!==nil)?_b.$ar(nil,_e):_e));return _g});_h=_c;return _h}catch(_i){if(_i instanceof a$c && (!_i.a$b || _i.a$b==72))return _i.a$a;throw(_i)}},$1: function(){var self,_a,_e;_a=_e=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=[];self.$v(function(_b){var _c;var _d=nil;_c=_b===undefined?nil:_b;_d=_a.$aK(nil,_c);return _d});_e=_a;return _e},$aQ: function(_f){var self,_a,_e,_g;_a=_g=nil;self=this;try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=[];self.$v(function(_b){var _c;var _d=nil;_c=_b===undefined?nil:_b;if((_e=_f(_c),_e===false||_e===nil)){_d=_a.$aK(nil,_c)}else{_d=nil};return _d});_g=_a;return _g}catch(_h){if(_h instanceof a$c && (!_h.a$b || _h.a$b==73))return _h.a$a;throw(_h)}},$aR: function(_f){var self,_a,_e,_g;_a=_g=nil;self=this;try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=[];self.$v(function(_b){var _c;var _d=nil;_c=_b===undefined?nil:_b;if((_e=_f(_c),_e!==false&&_e!==nil)){_d=_a.$aK(nil,_c)}else{_d=nil};return _d});_g=_a;return _g}catch(_h){if(_h instanceof a$c && (!_h.a$b || _h.a$b==74))return _h.a$a;throw(_h)}}}});$9 = a$d({a$i: [$8],a$e: $k,a$f: {$a: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;return []}},a$c: "Array",a$d: Array,a$h: {$H: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;return self.concat(_a)}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==77))return _c.a$a;throw(_c)}},$aK: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;self.push(_a); return self}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==76))return _c.a$a;throw(_c)}},$Y: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;
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
      return del ? _a : nil}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==75))return _c.a$a;throw(_c)}},$I: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;return self.length},$N: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;var v = self[_a]; return ((v === undefined || v === null) ? nil : v)}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==79))return _c.a$a;throw(_c)}},$g: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;
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
      }catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==78))return _c.a$a;throw(_c)}},$aS: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;return self.concat().reverse()},$o: function(){var self,_d;_d=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_d=self.$aP(function(_a){var _b;var _c=nil;_b=_a===undefined?nil:_a;_c=_b.$o();return _c}).$aT();return _d},$aV: function(_c,_a,_b){var self;self=this;try{if(arguments.length!=3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));;return (self[_a] = _b)}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==82))return _d.a$a;throw(_d)}},$v: function(_a){var self,_b;_b=nil;self=this;try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;for (var i=0; i < self.length; i++) {;_a(self[i]);};_b=self;return _b}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==81))return _c.a$a;throw(_c)}},$aU: function(_a){var self,_b;_b=nil;self=this;try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;for (var i=0; i < self.length; i++) {;_a([self[i],i]);};_b=self;return _b}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==80))return _c.a$a;throw(_c)}},$U: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;var v = self[0]; return ((v === undefined || v === null) ? nil : v)},$L: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;return self.length},$aW: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;return self.pop()},$k: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;return self.shift()},$l: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;return (self.length == 0)},$1: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self;return _a},$aY: function(){var self,_a,_b;self=this;_a=[];for(_b=1;_b<arguments.length;_b++)_a.push(arguments[_b]);;self.push.apply(self, _a); return self},$aX: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self;return _a},$a1: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;return self.concat()},$i: function(){var self,_a,_e;_a=_e=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a="[";_a=_a.$H(nil,self.$aP(function(_b){var _c;var _d=nil;_c=_b===undefined?nil:_b;_d=_c.$i();return _d}).$aT(nil,", "));_a=_a.$H(nil,"]");_e=_a;return _e},$a0: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;self.reverse(); return self},$aZ: function(){var self,_a,_b;self=this;_a=[];for(_b=1;_b<arguments.length;_b++)_a.push(arguments[_b]);;self.unshift.apply(self, _a); return self},$aT: function(_i,_a){var self,_b,_d,_h;_b=_h=nil;self=this;try{if(arguments.length>2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));if(_a===undefined)_a="";;_b="";self.$aU(function(_c){var _e,_f;var _g=nil;(_d=a$l(_c),_e=_d[0]===undefined?nil:_d[0],_f=_d[1]===undefined?nil:_d[1],_d);_b=_b.$H(nil,_e.$o());if((_d=_f.$5(nil,self.$L().$K(nil,1)),_d===false||_d===nil)){_g=_b=_b.$H(nil,_a)}else{_g=nil};return _g});_h=_b;return _h}catch(_j){if(_j instanceof a$c && (!_j.a$b || _j.a$b==83))return _j.a$a;throw(_j)}}}});$_ = a$d({a$i: [],a$e: $k,a$c: "NilClass",a$d: NilClass,a$h: {$a2: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=0.0;return _a},$q: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=true;return _a},$o: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a="";return _a},$a3: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=0;return _a},$1: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=[];return _a},$a4: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=[];return _a},$i: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a="nil";return _a}}});$$ = a$d({a$i: [],a$e: nil,a$c: "T_TestException"});$aa = a$d({a$i: [],a$e: nil,a$c: "T_TestIf"});$D = a$d({a$i: [],a$e: $k,a$f: {$W: function(){var self,_b,_c;_c=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;self.$u(nil,"send");self.$t(nil,$l.$a().$w(nil,"a_method",1,2));self.$t(nil,$m.$a().$w(nil,"a_method",1,2));self.$u(nil,"respond_to?");self.$t(nil,$l.$a().$r(nil,"a_method"));self.$t(nil,$l.$a().$r(nil,"to_s"));self.$t(nil,$l.$a().$r(nil,"inspect"));self.$t(nil,$l.$a().$r(nil,"b_method"));self.$t(nil,$l.$a().$r(nil,"c_method"));self.$u(nil,"method_missing");self.$t(nil,$ab.$a().$r(nil,"blah_blah"));$ab.$a().$a5(nil,1,2,3);try{$l.$a().$a5();self.$u(nil,"FAILURE?")}catch(_a){if(_a instanceof a$c)throw(_a);if((_b=$h.$f(nil,_a),_b!==false&&_b!==nil)){self.$u(nil,"catched!!!")}else{throw(_a)}};try{_c=$l.$a6()}catch(_a){if(_a instanceof a$c)throw(_a);if((_b=$h.$f(nil,_a),_b!==false&&_b!==nil)){_c=self.$t(nil,"goood")}else{throw(_a)}};return _c}},a$c: "T_TestSend::TestSend"});$A = a$d({a$i: [],a$e: $k,a$f: {$W: function(){var self,_a,_b;_a=_b=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self.$a();_a.$al();_a.$d(nil,'$al',a$b([]));_a.$al(nil,1);_a.$d(nil,'$al',a$b([1]));_a.$d(nil,'$al',[1].concat(a$b([])));_a.$al(nil,1,2);_a.$d(nil,'$al',a$b([1,2]));_a.$d(nil,'$al',[1].concat(a$b([2])));_b=_a.$d(nil,'$al',[1].concat(a$b([1,2])));return _b}},a$c: "T_TestSplat::TestSplat",a$h: {$al: function(){var self,_a,_b,_c;_c=nil;self=this;_a=[];for(_b=1;_b<arguments.length;_b++)_a.push(arguments[_b]);;_c=self.$t(nil,_a);return _c}}});$M = a$d({a$i: [],a$e: $k,a$f: {$W: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self.$a().$X();return _a}},a$c: "T_TestCase::TestCase",a$h: {$X: function(){var self,_a,_b,_c,_d;_d=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=(1).$H(nil,1); if((_b=(_c=(1).$f(nil,_a), (_c!==false&&_c!==nil) ? _c : ((3).$f(nil,_a))),_b!==false&&_b!==nil)){self.$u(nil,"NOT OKAY")}else{if((_b=(2).$f(nil,_a),_b!==false&&_b!==nil)){self.$u(nil,"OKAY")}else{self.$u(nil,"NOT OKAY")}};self.$t(nil,$9.$f(nil,[]));self.$t(nil,$d.$f(nil,$d.$a()));_a=1; if((_b=$7.$f(nil,_a),_b!==false&&_b!==nil)){self.$u(nil,"OK")}else{if((_b=(1).$f(nil,_a),_b!==false&&_b!==nil)){self.$u(nil,"OK")}};_a=_d=4; if((_b=$s.$a(nil,0,3,false).$f(nil,_a),_b!==false&&_b!==nil)){_d=self.$u(nil,"NOT OKAY")}else{if((_b=$s.$a(nil,1,4,true).$f(nil,_a),_b!==false&&_b!==nil)){_d=self.$u(nil,"NOT OKAY")}else{if((_b=$s.$a(nil,2,4,false).$f(nil,_a),_b!==false&&_b!==nil)){_d=self.$u(nil,"OKAY")}else{_d=nil}}};return _d}}});$5 = a$d({a$i: [$8],a$e: $k,a$f: {$aG: function(){var self,_a,_b,_c;_c=nil;self=this;_a=[];for(_b=1;_b<arguments.length;_b++)_a.push(arguments[_b]);;_c=self.$b();
      if (_a.length % 2 != 0) throw('ArgumentError');

      // 
      // we use an associate array to store the items. But unlike
      // Javascript, the entries are arrays which contain the collisions.
      // NOTE that we have to prefix the hash code with a prefix so that
      // there are no collisions with methods etc.   
      // I prefix it for now with 1.
      //
      var items = {};
      var hashed_key, current_key, current_val;
     
      for (var i = 0; i < _a.length; i += 2)
      {
        current_key = _a[i];
        hashed_key = "1" + current_key.$B();
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
      }},a$c: "Hash",a$h: {$N: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;
      var hashed_key = "1" + _a.$B();
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
      }catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==84))return _c.a$a;throw(_c)}},$a7: function(){var self,_b,_f;_b=_f=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_f=self.$aP(function(_a){var _c,_d;var _e=nil;(_b=a$l(_a),_c=_b[0]===undefined?nil:_b[0],_d=_b[1]===undefined?nil:_b[1],_b);_e=_c;return _e});return _f},$aV: function(_c,_a,_b){var self;self=this;try{if(arguments.length!=3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));;
      var hashed_key = "1" + _a.$B();
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
        return _b;
      }
      else 
      {
        //
        // create new bucket
        //
        self.a$k[hashed_key] = [_a, _b];
        return _b;
      }
      }catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==86))return _d.a$a;throw(_d)}},$v: function(_a){var self;self=this;try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;
      var key, bucket, i;
      for (key in self.a$k)
      {
        if (key[0] == "1")
        {
          bucket = self.a$k[key];
          for (i=0; i<bucket.length; i+=2)
          {;_a([bucket[i],bucket[i+1]]);
          }
        }
      }
      }catch(_b){if(_b instanceof a$c && (!_b.a$b || _b.a$b==85))return _b.a$a;throw(_b)}},$c: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;
      self.a$k = {}; 
      self.a$l = nil;
      },$a8: function(){var self,_b,_f;_b=_f=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_f=self.$aP(function(_a){var _c,_d;var _e=nil;(_b=a$l(_a),_c=_b[0]===undefined?nil:_b[0],_d=_b[1]===undefined?nil:_b[1],_b);_e=_d;return _e});return _f},$i: function(){var self,_a,_c,_g;_a=_c=_g=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a="{";_a=_a.$H(nil,self.$aP(function(_b){var _d,_e;var _f=nil;(_c=a$l(_b),_d=_c[0]===undefined?nil:_c[0],_e=_c[1]===undefined?nil:_c[1],_c);_f=_d.$i().$H(nil," => ").$H(nil,_e.$i());return _f}).$aT(nil,", "));_a=_a.$H(nil,"}");_g=_a;return _g}}});$ac = a$d({a$i: [],a$e: nil,a$c: "T_TestExpr"});$h = a$d({a$i: [],a$e: $3,a$c: "NoMethodError"});$G = a$d({a$i: [],a$e: $k,a$f: {$W: function(){var self,_b,_c,_d;_b=_d=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;self.$t(nil,"before block");self.$t(nil,"in block");self.$t(nil,"after block");try{self.$t(nil,"block");self.$t(nil,"else")}catch(_a){if(_a instanceof a$c)throw(_a);if((_c=$n.$f(nil,_a),_c!==false&&_c!==nil)){self.$t(nil,"rescue")}else{if((_c=$g.$f(nil,_a),_c!==false&&_c!==nil)){_b=(typeof(_a)=='undefined'?nil:_a);self.$t(nil,"another rescue");self.$t(nil,_b)}else{throw(_a)}}};self.$t(nil,$d.$a(nil,"test"));self.$u(nil,"before begin");try{try{self.$u(nil,"before raise");self.$j(nil,$g,"blah");self.$u(nil,"after raise")}catch(_a){if(_a instanceof a$c)throw(_a);if((_c=$n.$f(nil,_a),_c!==false&&_c!==nil)){self.$u(nil,"noooo")}else{if((_c=$g.$f(nil,_a),_c!==false&&_c!==nil)){_b=(typeof(_a)=='undefined'?nil:_a);self.$t(nil,_b);self.$u(nil,"yes")}else{throw(_a)}}}}finally{self.$u(nil,"ensure")};self.$u(nil,"after begin");self.$u(nil,"--");try{try{self.$u(nil,"abc");self.$j(nil,"r")}catch(_a){if(_a instanceof a$c)throw(_a);if((_c=$n.$f(nil,_a),_c!==false&&_c!==nil)){self.$t(nil,(typeof(_a)=='undefined'?nil:_a));self.$u(nil,"b")}else{throw(_a)}}}finally{self.$u(nil,"e")};try{_d=self.$t(nil,"hallo".$o(nil,2))}catch(_a){if(_a instanceof a$c)throw(_a);if((_c=$a.$f(nil,_a),_c!==false&&_c!==nil)){_b=(typeof(_a)=='undefined'?nil:_a);_d=self.$t(nil,_b)}else{throw(_a)}};return _d}},a$c: "T_TestException::TestException"});$ad = a$d({a$i: [],a$e: nil,a$c: "T_TestSplat"});a$d({a$i: [],a$g: $b});$ae = a$d({a$i: [],a$e: $R,a$c: "Bignum",a$d: Number});$ab = a$d({a$i: [],a$e: $k,a$c: "T_TestSend::C",a$h: {$n: function(_d,_a){var self,_b,_c,_e,_f;_f=nil;self=this;_e=_d===undefined?nil:_d;try{if(arguments.length<2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));_b=[];for(_c=2;_c<arguments.length;_c++)_b.push(arguments[_c]);;_f=self.$t(nil,("mm: " + (_a).$o() + (", ").$o() + (_b).$o()));return _f}catch(_g){if(_g instanceof a$c && (!_g.a$b || _g.a$b==87))return _g.a$a;throw(_g)}}}});$af = a$d({a$i: [],a$e: nil,a$c: "T_TestEql"});$B = a$d({a$i: [],a$e: $k,a$f: {$W: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self.$u(nil,"Hello World from RubyJS");return _a}},a$c: "T_TestSimpleOutput::TestSimpleOutput"});$J = a$d({a$i: [],a$e: $k,a$f: {$W: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self.$a().$X();return _a}},a$c: "T_TestString::TestString",a$h: {$X: function(){var self,_a,_i;_a=_i=nil;self=this;if(self.$aj===undefined)self.$aj=nil;if(self.$a9===undefined)self.$a9=nil;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;self.$t(nil,"hello");self.$t(nil,"hallo\b\t\n");self.$t(nil,"hallo\\leute");self.$t(nil,"\"super\"");self.$t(nil,"hello".$S(nil,"e"));self.$t(nil,"hello".$S(nil,"lo"));self.$t(nil,"hello".$S(nil,"a"));self.$t(nil,"hello hello".$S(nil,"ll"));self.$t(nil,"hello hello".$S(nil,"ll",3));self.$t(nil,"hallo".$N(nil,0,1));self.$t(nil,"hallo".$N(nil,0,2));self.$t(nil,"hallo".$N(nil,0,5));self.$t(nil,"10".$J(nil,10,"0"));self.$t(nil,"10".$J(nil,1,"blah"));self.$t(nil,"x".$J(nil,4,"()"));self.$t(nil,"10".$O(nil,10,"0"));self.$t(nil,"10".$O(nil,1,"blah"));self.$t(nil,"x".$O(nil,4,"()"));self.$t(nil,("abc " + ((1).$H(nil,2)).$o() + (" def").$o()));self.$aj="hallo".$i();self.$a9=4.5;self.$t(nil,("" + (self.$aj).$o() + (",").$o() + (self.$a9).$o()));_a="hallo".$T(nil,"l","r");self.$t(nil,_a);_a="hallo".$T(nil,/ll/,"rr");self.$t(nil,_a);_a="hallo".$T(function(){var _c=nil;;_c="r";return _c},/l/);self.$t(nil,_a);_a="hallo".$T(function(){var _e=nil;;_e="blah blah";return _e},/ll/);self.$t(nil,_a);_i="hallllllo".$T(function(_f){var _g;var _h=nil;_g=_f===undefined?nil:_f;_h=self.$t(nil,_g);return _h},/(l)l/);return _i}}});$N = a$d({a$i: [],a$e: $k,a$f: {$W: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self.$a().$X();return _a}},a$c: "T_TestExpr::TestExpr",a$h: {$X: function(){var self,_a,_b,_c;_a=_c=nil;self=this;try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=(true?1:2);self.$t(nil,_a);(_b=_a=true, (_b!==false&&_b!==nil) ? _b : (a$m(new a$c(nil,null))));_c=self.$t(nil,_a);return _c}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==88))return _d.a$a;throw(_d)}}}});$i = a$d({a$i: [],a$e: $k,a$f: {$a: function(_a){var self,_b,_c;self=this;_b=_a===undefined?nil:_a;try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;if((_c=_b,_c===false||_c===nil)){self.$j(nil,$a,"tried to create Proc object without a block")};return (function() {
        try {
          return _b.$ar.apply(_b, arguments);
        } catch(e) 
        {
          if (e instanceof a$c) 
          {
            if (e.a$b == null)
            {;self.$j(nil,$P,"break from proc-closure");}
            return e.a$a;
          }
          else throw(e);
        }
      })}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==89))return _d.a$a;throw(_d)}}},a$c: "Proc",a$d: Function,a$h: {$ar: function(){var self,_a,_b;self=this;_a=[];for(_b=1;_b<arguments.length;_b++)_a.push(arguments[_b]);;
      if (_a.length == 0) return self();
      else if (_a.length == 1) return self(_a[0]);
      else return self(_a);}}});$ag = a$d({a$i: [],a$e: nil,a$c: "T_TestNew"});$ah = a$d({a$i: [],a$e: $k,a$c: "Regexp",a$d: RegExp});$ai = a$d({a$i: [],a$e: nil,a$c: "T_TestArray"});$L = a$d({a$i: [],a$e: $k,a$f: {$W: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;self.$t(nil,$v.$a().$m(nil,$v));self.$t(nil,$v.$a().$m(nil,$w));self.$t(nil,$w.$a().$m(nil,$v));self.$t(nil,$v.$a().$m(nil,$u));self.$t(nil,$w.$a().$m(nil,$u));self.$t(nil,$v.$a().$h(nil,$v));self.$t(nil,$v.$a().$h(nil,$w));self.$t(nil,$w.$a().$h(nil,$v));self.$t(nil,$v.$a().$h(nil,$u));self.$t(nil,$w.$a().$h(nil,$u));self.$t(nil,$x.$a().$h(nil,$u));self.$t(nil,$x.$a().$h(nil,$v));self.$t(nil,$x.$a().$h(nil,$w));self.$t(nil,$x.$a().$h(nil,$x));self.$t(nil,$x.$a().$h(nil,$o));self.$t(nil,$x.$a().$h(nil,$k));self.$t(nil,$x.$a().$h(nil,$j));self.$t(nil,$x.$a().$h(nil,$b));self.$t(nil,"hallo".$z().$e());self.$t(nil,nil.$z().$e());self.$t(nil,nil.$m(nil,$_));self.$t(nil,"hallo".$m(nil,$f));self.$t(nil,"hallo".$z());self.$t(nil,$v);self.$t(nil,$w);self.$t(nil,$x);self.$t(nil,$o);self.$t(nil,$u);self.$t(nil,$u.$e());self.$t(nil,$v.$e());_a=self.$t(nil,$w.$e());return _a}},a$c: "T_TestClass::TestClass"});$aj = a$d({a$i: [],a$e: nil,a$c: "T_TestRange"});      $b.a$e = $k;
var a$n = [$c,$j,$k,$l,$m,$g,$n,$d,$f,$o,$p,$q,$r,$t,$u,$v,$w,$x,$y,$z,$O,$P,$Q,$R,$S,$T,$C,$H,$K,$e,$Y,$E,$Z,$0,$1,$2,$3,$a,$4,$X,$I,$F,$s,$6,$7,$W,$8,$9,$_,$$,$aa,$D,$A,$M,$5,$ac,$h,$G,$ad,$b,$ae,$ab,$af,$B,$J,$N,$i,$ag,$ah,$ai,$L,$aj];
a$o(a$n);
for (var i=0; i<a$n.length; i++) a$p(a$n[i]);
function main() { $O.$W() }
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
