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
function a$m(a)
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
var a$h = {"$J":"test","$am":"end","$aQ":"sub","$v":"each","$C":"m","$x":"loop","$S":"to_f","$3":"%","$aH":"collect","$ao":"member?","$ax":"test_three_times_indirect","$7":"&","$E":"new_from_key_value_list","$at":"test_loop2","$aG":"three_times_yield","$f":"===","$ar":"three_times_block","$R":"==","$aY":"reverse","$ay":"three_times_indirect","$Y":"downto","$aJ":"map","$T":"to_i","$5":"times","$t":"p","$al":"include?","$a8":"keys","$s":"proc","$b":"allocate","$aK":"reject","$aB":"three_times_yield2","$aR":"size","$ab":"*","$N":"+","$aO":"delete","$a9":"values","$a5":"unshift","$aw":"return_in_block","$W":"upto","$a7":"dup","$L":"rjust","$0":"-","$q":"nil?","$aX":"not_a_method","$a":"new","$a4":"push","$av":"test_while_loop","$2":"/","$as":"call","$G":"message","$y":"is_a?","$aT":"split","$D":"main","$e":"name","$l":"empty?","$V":"to_splat","$aq":"jage","$j":"raise","$aS":"length","$o":"to_s","$Z":">=","$aN":"c_method","$4":"|","$h":"kind_of?","$aI":"find_all","$8":"~","$au":"loop2","$F":"[]","$aU":"strip","$aA":"test_three_times_yield2","$a1":"[]=","$$":"-@","$aF":"test_return_in_block","$1":"succ","$a6":"reverse!","$B":"hash","$z":"class","$i":"inspect","$9":"^","$aC":"test_three_times_block","$aE":"test_three_times_yield","$a2":"pop","$p":"__send","$g":"eql?","$6":"<","$ap":"wau","$af":"first","$ak":"begin","$an":"<<","$M":"ljust","$d":"__invoke","$_":">","$X":"<=","$c":"initialize","$w":"send","$I":"a_method","$r":"respond_to?","$aD":"test_loop","$k":"shift","$aj":"exclude_end?","$aa":"+@","$aW":"blah_blah","$aL":"select","$aM":"miau","$U":"to_a","$n":"method_missing","$K":"index","$a0":"each_with_index","$aZ":"join","$az":"test_proc","$A":"tap","$ah":"last","$m":"instance_of?","$a3":"to_ary","$Q":"gsub","$u":"puts","$aV":"match"};
var a$f = {};
for (var i in a$h) a$f[a$h[i]] = i;
$b = a$d({a$e: nil,a$f: {$a: function(_e,_a,_b,_c){var self,_d;self=this;try{if(arguments.length<3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));if(arguments.length>4)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 3)'));if(_c===undefined)_c=nil;;if((_d=_c,_d===false||_d===nil)){_c=(function() {})};return new self.a$d($b, _a, _b, _c);}catch(_f){if(_f instanceof a$c && (!_f.a$b || _f.a$b==2))return _f.a$a;throw(_f)}}},a$c: "Class",a$g: new a$a(a$a, nil, "Class", a$a),a$h: {$e: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;return self.a$c;},$a: function(_c){var self,_a,_b,_d,_e,_f;_e=_f=nil;self=this;_d=_c===undefined?nil:_c;try{_a=[];for(_b=1;_b<arguments.length;_b++)_a.push(arguments[_b]);;_e=self.$b();_e.$d(_d,'$c',a$b(_a));_f=_e;return _f}catch(_g){if(_g instanceof a$c && (!_g.a$b || _g.a$b==0))return _g.a$a;throw(_g)}},$f: function(_d,_a){var self,_b,_c;_c=nil;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;_c=(_b=self.$g(nil,_a), (_b!==false&&_b!==nil) ? _b : (_a.$h(nil,self)));return _c}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==1))return _e.a$a;throw(_e)}},$b: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;var o = new self.a$d();
       return o;},$i: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;return self.a$c;}}});a$e($b);$i = a$d({a$j: [],a$e: nil,a$c: "Kernel",a$h: {$p: function(_d,_a){var self,_b,_c,_e;self=this;_e=_d===undefined?nil:_d;try{if(arguments.length<2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));_b=[];for(_c=2;_c<arguments.length;_c++)_b.push(arguments[_c]);;
      var m = self[a$f[_a]];
      if (m) 
        return m.apply(self, [_e].concat(_b));
      else
        return self.$n.apply(self, [_e].concat([_a]).concat(_b));}catch(_f){if(_f instanceof a$c && (!_f.a$b || _f.a$b==4))return _f.a$a;throw(_f)}},$n: function(_d,_a){var self,_b,_c,_e,_f;_f=nil;self=this;_e=_d===undefined?nil:_d;try{if(arguments.length<2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));_b=[];for(_c=2;_c<arguments.length;_c++)_b.push(arguments[_c]);;_f=self.$j(nil,$g,("undefined method `" + (_a).$o() + ("' for ").$o() + (self.$i()).$o()));return _f}catch(_g){if(_g instanceof a$c && (!_g.a$b || _g.a$b==3))return _g.a$a;throw(_g)}},$j: function(){var self,_a,_b,_c,_d;_c=_d=nil;self=this;_a=[];for(_b=1;_b<arguments.length;_b++)_a.push(arguments[_b]);;_c=((_b=_a.$l(),_b!==false&&_b!==nil)?$c.$a(nil,""):(_d=_a.$k(),((_b=_d.$h(nil,$b),_b!==false&&_b!==nil)?_d.$d(nil,'$a',a$b(_a)):((_b=_d.$m(nil,$f),_b!==false&&_b!==nil)?((_b=_a.$l(),_b!==false&&_b!==nil)?_d:$a.$a(nil,"to many arguments given to raise")):((_b=_d.$m(nil,$e),_b!==false&&_b!==nil)?((_b=_a.$l(),_b!==false&&_b!==nil)?$c.$a(nil,_d):$a.$a(nil,"to many arguments given to raise")):$d.$a(nil,"exception class/object expected"))))));throw(_c)},$q: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=false;return _a},$s: function(_a){var self,_b,_c;_c=nil;self=this;_b=_a===undefined?nil:_a;try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_c=$h.$a(_b);return _c}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==6))return _d.a$a;throw(_d)}},$r: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;
      var m = a$f[_a]; 
      return (m !== undefined && self[m] !== undefined && !self[m].a$i)}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==5))return _c.a$a;throw(_c)}},$t: function(){var self,_a,_b,_f;_f=nil;self=this;_a=[];for(_b=1;_b<arguments.length;_b++)_a.push(arguments[_b]);;_a.$v(function(_c){var _d;var _e=nil;_d=_c===undefined?nil:_c;_e=self.$u(nil,_d.$i());return _e});_f=nil;return _f},$d: function(_c,_a,_b){var self,_d;self=this;_d=_c===undefined?nil:_c;try{if(arguments.length!=3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));;
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
        return self.$n.apply(self, [_e].concat([_a]).concat(_b));}catch(_f){if(_f instanceof a$c && (!_f.a$b || _f.a$b==8))return _f.a$a;throw(_f)}}}});$j = a$d({a$j: [$i],a$e: nil,a$c: "Object",a$h: {$h: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;return a$i(self, _a)}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==11))return _c.a$a;throw(_c)}},$y: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;return a$i(self, _a)}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==12))return _c.a$a;throw(_c)}},$z: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;return self.a$g},$g: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;return (self.constructor == _a.constructor && self == _a)}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==13))return _c.a$a;throw(_c)}},$B: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;return self.toString()},$A: function(_a){var self,_b;_b=nil;self=this;try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a(self);_b=self;return _b}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==14))return _c.a$a;throw(_c)}},$o: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;return self.toString()},$c: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=nil;return _a},$f: function(_d,_a){var self,_b,_c;_c=nil;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;_c=(_b=self.$g(nil,_a), (_b!==false&&_b!==nil) ? _b : (self.$h(nil,_a)));return _c}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==15))return _e.a$a;throw(_e)}},$m: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;return (self.a$g === _a)}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==16))return _c.a$a;throw(_c)}},$i: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;return self.toString()}}});$k = a$d({a$j: [],a$e: $j,a$f: {$D: function(){var self,_a,_b;_a=_b=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self.$a();_a.$C();_a.$d(nil,'$C',a$b([]));_a.$C(nil,1);_a.$d(nil,'$C',a$b([1]));_a.$d(nil,'$C',[1].concat(a$b([])));_a.$C(nil,1,2);_a.$d(nil,'$C',a$b([1,2]));_a.$d(nil,'$C',[1].concat(a$b([2])));_b=_a.$d(nil,'$C',[1].concat(a$b([1,2])));return _b}},a$c: "TestSplat",a$h: {$C: function(){var self,_a,_b,_c;_c=nil;self=this;_a=[];for(_b=1;_b<arguments.length;_b++)_a.push(arguments[_b]);;_c=self.$t(nil,_a);return _c}}});$m = a$d({a$j: [],a$e: $j,a$f: {$D: function(){var self,_a,_b;_a=_b=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=$l.$E(nil,"a",6,"b",7,"1",1,1,2,"1,2","hello",[1,2],"good");self.$t(nil,_a.$F(nil,"a"));self.$t(nil,_a.$F(nil,"b"));self.$t(nil,_a.$F(nil,"1"));self.$t(nil,_a.$F(nil,1));self.$t(nil,_a.$F(nil,"1,2"));_b=self.$t(nil,_a.$F(nil,[1,2]));return _b}},a$c: "TestHash"});$f = a$d({a$j: [],a$e: $j,a$c: "Exception",a$h: {$G: function(){var self,_a;_a=nil;self=this;if(self.$H===undefined)self.$H=nil;_a=self.$H;return _a},$o: function(){var self,_a;_a=nil;self=this;if(self.$H===undefined)self.$H=nil;_a=self.$H;return _a},$c: function(_d,_a){var self,_c,_b;_b=nil;self=this;try{if(arguments.length>2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));if(_a===undefined)_a=nil;;if((_c=_a.$q(),_c!==false&&_c!==nil)){_b=self.$H=self.$z().$e()}else{_b=self.$H=_a};return _b}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==17))return _e.a$a;throw(_e)}},$i: function(){var self,_a;_a=nil;self=this;if(self.$H===undefined)self.$H=nil;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=("#<" + (self.$z().$e()).$o() + (": ").$o() + (self.$H).$o() + (">").$o());return _a}}});$n = a$d({a$j: [],a$e: $f,a$c: "StandardError"});$d = a$d({a$j: [],a$e: $n,a$c: "TypeError"});$o = a$d({a$j: [],a$e: nil,a$c: "X"});$p = a$d({a$j: [$o],a$e: $j,a$c: "A",a$h: {$I: function(_d,_a,_b){var self,_c;_c=nil;self=this;try{if(arguments.length!=3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));;_c=self.$t(nil,_a,_b);return _c}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==18))return _e.a$a;throw(_e)}}}});$q = a$d({a$j: [],a$e: $j,a$f: {$D: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self.$a().$J();return _a}},a$c: "TestString",a$h: {$J: function(){var self,_a,_i;_a=_i=nil;self=this;if(self.$O===undefined)self.$O=nil;if(self.$P===undefined)self.$P=nil;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;self.$t(nil,"hello");self.$t(nil,"hallo\b\t\n");self.$t(nil,"hallo\\leute");self.$t(nil,"\"super\"");self.$t(nil,"hello".$K(nil,"e"));self.$t(nil,"hello".$K(nil,"lo"));self.$t(nil,"hello".$K(nil,"a"));self.$t(nil,"hello hello".$K(nil,"ll"));self.$t(nil,"hello hello".$K(nil,"ll",3));self.$t(nil,"hallo".$F(nil,0,1));self.$t(nil,"hallo".$F(nil,0,2));self.$t(nil,"hallo".$F(nil,0,5));self.$t(nil,"10".$L(nil,10,"0"));self.$t(nil,"10".$L(nil,1,"blah"));self.$t(nil,"x".$L(nil,4,"()"));self.$t(nil,"10".$M(nil,10,"0"));self.$t(nil,"10".$M(nil,1,"blah"));self.$t(nil,"x".$M(nil,4,"()"));self.$t(nil,("abc " + ((1).$N(nil,2)).$o() + (" def").$o()));self.$O="hallo".$i();self.$P=4.5;self.$t(nil,("" + (self.$O).$o() + (",").$o() + (self.$P).$o()));_a="hallo".$Q(nil,"l","r");self.$t(nil,_a);_a="hallo".$Q(nil,/ll/,"rr");self.$t(nil,_a);_a="hallo".$Q(function(){var _c=nil;;_c="r";return _c},/l/);self.$t(nil,_a);_a="hallo".$Q(function(){var _e=nil;;_e="blah blah";return _e},/ll/);self.$t(nil,_a);_i="hallllllo".$Q(function(_f){var _g;var _h=nil;_g=_f===undefined?nil:_f;_h=self.$t(nil,_g);return _h},/(l)l/);return _i}}});$r = a$d({a$j: [],a$e: $j,a$c: "Boolean",a$d: Boolean,a$h: {$R: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;return (self == _a)}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==19))return _c.a$a;throw(_c)}},$o: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;return (self == true ? 'true' : 'false')},$i: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;return (self == true ? 'true' : 'false')}}});$s = a$d({a$j: [],a$e: $j,a$c: "NilClass",a$d: NilClass,a$h: {$S: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=0.0;return _a},$q: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=true;return _a},$o: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a="";return _a},$T: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=0;return _a},$U: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=[];return _a},$V: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=[];return _a},$i: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a="nil";return _a}}});$c = a$d({a$j: [],a$e: $n,a$c: "RuntimeError"});$t = a$d({a$j: [],a$e: $j,a$c: "Number",a$d: Number,a$h: {$N: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;return self + _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==23))return _c.a$a;throw(_c)}},$R: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;return self == _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==22))return _c.a$a;throw(_c)}},$Y: function(_d,_a){var self,_b,_c;_b=nil;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;_b=self;while((_c=_b.$Z(nil,_a),_c!==false&&_c!==nil)){_d(_b);_b=_b.$0(nil,1)};return self}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==21))return _e.a$a;throw(_e)}},$W: function(_d,_a){var self,_b,_c;_b=nil;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;_b=self;while((_c=_b.$X(nil,_a),_c!==false&&_c!==nil)){_d(_b);_b=_b.$N(nil,1)};return self}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==20))return _e.a$a;throw(_e)}},$X: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;return self <= _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==24))return _c.a$a;throw(_c)}},$0: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;return self - _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==25))return _c.a$a;throw(_c)}},$1: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;return self+1},$2: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;return self / _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==27))return _c.a$a;throw(_c)}},$o: function(_b,_a){var self;self=this;try{if(arguments.length>2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));if(_a===undefined)_a=10;;return self.toString(_a)}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==26))return _c.a$a;throw(_c)}},$3: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;return self % _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==28))return _c.a$a;throw(_c)}},$7: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;return self & _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==32))return _c.a$a;throw(_c)}},$6: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;return self < _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==31))return _c.a$a;throw(_c)}},$5: function(_c){var self,_a,_b;_a=nil;self=this;try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=0;while((_b=_a.$6(nil,self),_b!==false&&_b!==nil)){_c(_a);_a=_a.$N(nil,1)};return self}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==30))return _d.a$a;throw(_d)}},$4: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;return self | _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==29))return _c.a$a;throw(_c)}},$$: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;return -self},$_: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;return self > _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==34))return _c.a$a;throw(_c)}},$9: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;return self ^ _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==33))return _c.a$a;throw(_c)}},$8: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;return ~self},$Z: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;return self >= _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==35))return _c.a$a;throw(_c)}},$i: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;return self.toString()},$ab: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;return self * _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==36))return _c.a$a;throw(_c)}},$aa: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;return self}}});$u = a$d({a$j: [],a$e: $t,a$c: "Bignum",a$d: Number});$x = a$d({a$j: [],a$e: $j,a$f: {$D: function(){var self,_a,_b,_c,_d,_e,_f;_a=_b=_c=_d=_e=_f=nil;self=this;if(self.$O===undefined)self.$O=nil;if(self.$ac===undefined)self.$ac=nil;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;(_a=[1,2],_b=_a[0]===undefined?nil:_a[0],_c=_a[1]===undefined?nil:_a[1],_a);self.$t(nil,_b);self.$t(nil,_c);self.$u(nil,"--");(_a=[1,2,3],_b=_a[0]===undefined?nil:_a[0],_c=_a[1]===undefined?nil:_a[1],_a);self.$t(nil,_b);self.$t(nil,_c);self.$u(nil,"--");_d=5;(_a=[1,2],_b=_a[0]===undefined?nil:_a[0],_c=_a[1]===undefined?nil:_a[1],_d=_a[2]===undefined?nil:_a[2],_a);self.$t(nil,_b);self.$t(nil,_c);self.$t(nil,_d);self.$u(nil,"--");(_a=[1,2,3],self.$O=_a[0]===undefined?nil:_a[0],_c=_a[1]===undefined?nil:_a[1],self.$ac=_a[2]===undefined?nil:_a[2],_a);self.$t(nil,self.$O);self.$t(nil,_c);self.$t(nil,self.$ac);self.$u(nil,"--");self.$u(nil,"swap");(_a=[1,2],_b=_a[0]===undefined?nil:_a[0],_c=_a[1]===undefined?nil:_a[1],_a);self.$t(nil,_b);self.$t(nil,_c);(_a=[_c,_b],_b=_a[0]===undefined?nil:_a[0],_c=_a[1]===undefined?nil:_a[1],_a);self.$t(nil,_b);self.$t(nil,_c);self.$u(nil,"--");self.$u(nil,"splat1");(_a=[1,2],_b=_a[0]===undefined?nil:_a[0],_c=_a[1]===undefined?nil:_a[1],_d=_a[2]===undefined?nil:_a[2],_e=_a.slice(3),_a);self.$t(nil,_b);self.$t(nil,_c);self.$t(nil,_d);self.$t(nil,_e);self.$u(nil,"--");self.$u(nil,"splat2");(_a=[1,2],_b=_a[0]===undefined?nil:_a[0],_c=_a.slice(1),_a);self.$t(nil,_b);self.$t(nil,_c);self.$u(nil,"--");self.$u(nil,"splat3");(_a=[1,2,3,4,5],_b=_a[0]===undefined?nil:_a[0],_c=_a.slice(1),_a);self.$t(nil,_b);self.$t(nil,_c);self.$u(nil,"--");self.$u(nil,"splat with globals");self.$t(nil,(typeof($v)=='undefined'?nil:$v));self.$t(nil,(typeof($w)=='undefined'?nil:$w));(_a=[1,2],$v=_a[0]===undefined?nil:_a[0],$w=_a[1]===undefined?nil:_a[1],_a);self.$t(nil,(typeof($v)=='undefined'?nil:$v));self.$t(nil,(typeof($w)=='undefined'?nil:$w));_f=self.$u(nil,"--");return _f}},a$c: "TestMassign"});$y = a$d({a$j: [],a$e: $j,a$c: "CCC",a$h: {$n: function(_d,_a){var self,_b,_c,_e,_f;_f=nil;self=this;_e=_d===undefined?nil:_d;try{if(arguments.length<2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));_b=[];for(_c=2;_c<arguments.length;_c++)_b.push(arguments[_c]);;_f=self.$t(nil,("mm: " + (_a).$o() + (", ").$o() + (_b).$o()));return _f}catch(_g){if(_g instanceof a$c && (!_g.a$b || _g.a$b==37))return _g.a$a;throw(_g)}}}});$z = a$d({a$j: [],a$e: $j,a$c: "Lebewesen",a$h: {$c: function(_c,_a){var self,_b;_b=nil;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;_b=self.$ad=_a;return _b}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==38))return _d.a$a;throw(_d)}}}});$D = a$d({a$j: [],a$e: $j,a$f: {$D: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self.$a().$J();return _a}},a$c: "TestCase",a$h: {$J: function(){var self,_a,_b,_c,_d;_d=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=(1).$N(nil,1); if((_b=(_c=(1).$f(nil,_a), (_c!==false&&_c!==nil) ? _c : ((3).$f(nil,_a))),_b!==false&&_b!==nil)){self.$u(nil,"NOT OKAY")}else{if((_b=(2).$f(nil,_a),_b!==false&&_b!==nil)){self.$u(nil,"OKAY")}else{self.$u(nil,"NOT OKAY")}};self.$t(nil,$A.$f(nil,[]));self.$t(nil,$c.$f(nil,$c.$a()));_a=1; if((_b=$B.$f(nil,_a),_b!==false&&_b!==nil)){self.$u(nil,"OK")}else{if((_b=(1).$f(nil,_a),_b!==false&&_b!==nil)){self.$u(nil,"OK")}};_a=_d=4; if((_b=$C.$a(nil,0,3,false).$f(nil,_a),_b!==false&&_b!==nil)){_d=self.$u(nil,"NOT OKAY")}else{if((_b=$C.$a(nil,1,4,true).$f(nil,_a),_b!==false&&_b!==nil)){_d=self.$u(nil,"NOT OKAY")}else{if((_b=$C.$a(nil,2,4,false).$f(nil,_a),_b!==false&&_b!==nil)){_d=self.$u(nil,"OKAY")}else{_d=nil}}};return _d}}});$R = a$d({a$j: [],a$e: $j,a$f: {$D: function(){var self,_c,_d,_b;_c=_b=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;try{self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");self.$u(nil,"Test splat");self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");$k.$D();self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");self.$u(nil,"Test simple output");self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");$E.$D();self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");self.$u(nil,"Test new");self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");$F.$D();self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");self.$u(nil,"Test massign");self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");$x.$D();self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");self.$u(nil,"Test send");self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");$G.$D();self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");self.$u(nil,"Test if");self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");$H.$D();self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");self.$u(nil,"Test hash");self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");$m.$D();self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");self.$u(nil,"Test exception");self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");$I.$D();self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");self.$u(nil,"Test eql");self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");$J.$D();self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");self.$u(nil,"Test args");self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");$K.$D();self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");self.$u(nil,"Test yield");self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");$L.$D();self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");self.$u(nil,"Test string");self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");$q.$D();self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");self.$u(nil,"Test array");self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");$M.$D();self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");self.$u(nil,"Test lebewesen");self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");$N.$D();self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");self.$u(nil,"Test class");self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");$O.$D();self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");self.$u(nil,"Test case");self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");$D.$D();self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");self.$u(nil,"Test expr");self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");$P.$D();self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");self.$u(nil,"Test range");self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");_b=$Q.$D()}catch(_a){if(_a instanceof a$c)throw(_a);if((_d=$f.$f(nil,_a),_d!==false&&_d!==nil)){_c=(typeof(_a)=='undefined'?nil:_a);self.$t(nil,"unhandled exception");_b=self.$t(nil,_c)}else{throw(_a)}};return _b}},a$c: "TestSuite"});$C = a$d({a$j: [],a$e: $j,a$c: "Range",a$h: {$R: function(_e,_a){var self,_b,_c,_d;_d=nil;self=this;if(self.$ai===undefined)self.$ai=nil;if(self.$ae===undefined)self.$ae=nil;if(self.$ag===undefined)self.$ag=nil;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;if (self.constructor != _a.constructor) return false;;_d=(_b=self.$ae.$R(nil,_a.$af()), (_b!==false&&_b!==nil) ? ((_c=self.$ag.$R(nil,_a.$ah()), (_c!==false&&_c!==nil) ? (self.$ai.$R(nil,_a.$aj())) : _c)) : _b);return _d}catch(_f){if(_f instanceof a$c && (!_f.a$b || _f.a$b==39))return _f.a$a;throw(_f)}},$ak: function(){var self,_a;_a=nil;self=this;if(self.$ae===undefined)self.$ae=nil;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self.$ae;return _a},$g: function(_e,_a){var self,_b,_c,_d;_d=nil;self=this;if(self.$ai===undefined)self.$ai=nil;if(self.$ae===undefined)self.$ae=nil;if(self.$ag===undefined)self.$ag=nil;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;if (self.constructor != _a.constructor) return false;;_d=(_b=self.$ae.$g(nil,_a.$af()), (_b!==false&&_b!==nil) ? ((_c=self.$ag.$g(nil,_a.$ah()), (_c!==false&&_c!==nil) ? (self.$ai.$R(nil,_a.$aj())) : _c)) : _b);return _d}catch(_f){if(_f instanceof a$c && (!_f.a$b || _f.a$b==40))return _f.a$a;throw(_f)}},$aj: function(){var self,_a;_a=nil;self=this;if(self.$ai===undefined)self.$ai=nil;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self.$ai;return _a},$ah: function(){var self,_a;_a=nil;self=this;if(self.$ag===undefined)self.$ag=nil;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self.$ag;return _a},$o: function(){var self,_b,_a;_a=nil;self=this;if(self.$ai===undefined)self.$ai=nil;if(self.$ae===undefined)self.$ae=nil;if(self.$ag===undefined)self.$ag=nil;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;if((_b=self.$ai,_b!==false&&_b!==nil)){_a=("" + (self.$ae).$o() + ("...").$o() + (self.$ag).$o())}else{_a=("" + (self.$ae).$o() + ("..").$o() + (self.$ag).$o())};return _a},$v: function(_c){var self,_a,_b,_d;_a=_d=nil;self=this;if(self.$ai===undefined)self.$ai=nil;if(self.$ae===undefined)self.$ae=nil;if(self.$ag===undefined)self.$ag=nil;try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self.$ae;if((_b=self.$ae.$_(nil,self.$ag),_b!==false&&_b!==nil)){return nil};if((_b=self.$ai,_b!==false&&_b!==nil)){while((_b=_a.$6(nil,self.$ag),_b!==false&&_b!==nil)){_c(_a);_a=_a.$1()};_d=nil;}else{while((_b=_a.$X(nil,self.$ag),_b!==false&&_b!==nil)){_c(_a);_a=_a.$1()};_d=nil;};return _d}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==43))return _e.a$a;throw(_e)}},$am: function(){var self,_a;_a=nil;self=this;if(self.$ag===undefined)self.$ag=nil;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self.$ag;return _a},$af: function(){var self,_a;_a=nil;self=this;if(self.$ae===undefined)self.$ae=nil;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self.$ae;return _a},$al: function(_d,_a){var self,_b,_c;_c=nil;self=this;if(self.$ai===undefined)self.$ai=nil;if(self.$ae===undefined)self.$ae=nil;if(self.$ag===undefined)self.$ag=nil;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;if((_b=_a.$6(nil,self.$ae),_b!==false&&_b!==nil)){return false};if((_b=self.$ai,_b!==false&&_b!==nil)){_c=_a.$6(nil,self.$ag)}else{_c=_a.$X(nil,self.$ag)};return _c}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==42))return _e.a$a;throw(_e)}},$c: function(_f,_a,_b,_c){var self,_d,_e;_e=nil;self=this;try{if(arguments.length<3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));if(arguments.length>4)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 3)'));if(_c===undefined)_c=false;;(_d=[_a,_b],self.$ae=_d[0]===undefined?nil:_d[0],self.$ag=_d[1]===undefined?nil:_d[1],_d);_e=self.$ai=((_d=_c,_d!==false&&_d!==nil)?true:false);return _e}catch(_g){if(_g instanceof a$c && (!_g.a$b || _g.a$b==41))return _g.a$a;throw(_g)}},$f: function(_d,_a){var self,_b,_c;_c=nil;self=this;if(self.$ai===undefined)self.$ai=nil;if(self.$ae===undefined)self.$ae=nil;if(self.$ag===undefined)self.$ag=nil;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;if((_b=_a.$6(nil,self.$ae),_b!==false&&_b!==nil)){return false};if((_b=self.$ai,_b!==false&&_b!==nil)){_c=_a.$6(nil,self.$ag)}else{_c=_a.$X(nil,self.$ag)};return _c}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==44))return _e.a$a;throw(_e)}},$U: function(){var self,_a,_b,_c;_a=_c=nil;self=this;if(self.$ai===undefined)self.$ai=nil;if(self.$ae===undefined)self.$ae=nil;if(self.$ag===undefined)self.$ag=nil;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=[];if((_b=self.$ae.$_(nil,self.$ag),_b!==false&&_b!==nil)){return _a};_c=self.$ae;if((_b=self.$ai,_b!==false&&_b!==nil)){while((_b=_c.$6(nil,self.$ag),_b!==false&&_b!==nil)){_a.$an(nil,_c);_c=_c.$1()}}else{while((_b=_c.$X(nil,self.$ag),_b!==false&&_b!==nil)){_a.$an(nil,_c);_c=_c.$1()}};return _a},$i: function(){var self,_b,_a;_a=nil;self=this;if(self.$ai===undefined)self.$ai=nil;if(self.$ae===undefined)self.$ae=nil;if(self.$ag===undefined)self.$ag=nil;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;if((_b=self.$ai,_b!==false&&_b!==nil)){_a=("" + (self.$ae.$i()).$o() + ("...").$o() + (self.$ag.$i()).$o())}else{_a=("" + (self.$ae.$i()).$o() + ("..").$o() + (self.$ag.$i()).$o())};return _a},$ao: function(_d,_a){var self,_b,_c;_c=nil;self=this;if(self.$ai===undefined)self.$ai=nil;if(self.$ae===undefined)self.$ae=nil;if(self.$ag===undefined)self.$ag=nil;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;if((_b=_a.$6(nil,self.$ae),_b!==false&&_b!==nil)){return false};if((_b=self.$ai,_b!==false&&_b!==nil)){_c=_a.$6(nil,self.$ag)}else{_c=_a.$X(nil,self.$ag)};return _c}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==45))return _e.a$a;throw(_e)}}}});$S = a$d({a$j: [],a$e: $n,a$c: "NameError"});$J = a$d({a$j: [],a$e: $j,a$f: {$D: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;self.$t(nil,"a".$g(nil,"a"));self.$t(nil,"a".$g(nil,1));self.$t(nil,"1".$g(nil,1));self.$t(nil,[1,2].$g(nil,[1,2]));_a=self.$t(nil,(1).$g(nil,"1"));return _a}},a$c: "TestEql"});$T = a$d({a$j: [],a$e: $z,a$c: "Hund",a$h: {$ap: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self.$u(nil,"wau wau");return _a},$aq: function(_c,_a){var self,_b;_b=nil;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;_b=self.$u(nil,"ich jage ".$N(nil,_a.$e()));return _b}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==46))return _d.a$a;throw(_d)}}}});$L = a$d({a$j: [],a$e: $j,a$f: {$D: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self.$a().$J();return _a}},a$c: "TestYield",a$h: {$at: function(){var self,_a,_b,_d,_f;_a=_b=_f=nil;self=this;try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;self.$u(nil,"loop2");_a=0;_b=self.$au(function(){var _e=nil;;_a=_a.$N(nil,1);if((_d=_a.$3(nil,2).$R(nil,1),_d!==false&&_d!==nil)){return nil};self.$t(nil,_a);if((_d=_a.$_(nil,8),_d!==false&&_d!==nil)){throw(new a$c(["out",_a],null))}else{_e=nil};return _e});self.$t(nil,_b);_f=self.$u(nil,"--");return _f}catch(_g){if(_g instanceof a$c && (!_g.a$b || _g.a$b==48))return _g.a$a;throw(_g)}},$ar: function(_a){var self,_b,_c;_c=nil;self=this;_b=_a===undefined?nil:_a;try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_b.$as(nil,1);_b.$as(nil,2);_c=_b.$as(nil,3);return _c}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==47))return _d.a$a;throw(_d)}},$aw: function(_a){var self,_b,_c;_c=nil;self=this;_b=_a===undefined?nil:_a;try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;self.$t(nil,"return_in_block before");_b.$as();_c=self.$t(nil,"return_in_block after");return _c}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==49))return _d.a$a;throw(_d)}},$av: function(){var self,_a,_b,_c;_a=_c=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;self.$u(nil,"while-loop");_a=0;while(true){_a=_a.$N(nil,1);if((_b=_a.$3(nil,2).$R(nil,1),_b!==false&&_b!==nil)){continue};self.$t(nil,_a);if((_b=_a.$_(nil,8),_b!==false&&_b!==nil)){break}};self.$u(nil,"----");while((_b=_a.$_(nil,0),_b!==false&&_b!==nil)){self.$t(nil,_a);_a=_a.$0(nil,1)};_c=self.$u(nil,"--");return _c},$au: function(_a){var self,_b,_c;_c=nil;self=this;_b=_a===undefined?nil:_a;try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;while(true){_b.$as()};_c=self.$t(nil,"not reached");return _c}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==51))return _d.a$a;throw(_d)}},$az: function(){var self,_a,_d;_a=_d=nil;self=this;try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;self.$t(nil,"test_proc");_a=self.$s(function(){;throw(new a$c(0,50))});self.$t(nil,_a.$as());_a=$h.$a(function(){;throw(new a$c(3,null))});_d=self.$t(nil,_a.$as());return _d}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==50))return _e.a$a;throw(_e)}},$ax: function(){var self,_d;_d=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;self.$u(nil,"three_times_indirect");self.$ay(function(_a){var _b;var _c=nil;_b=_a===undefined?nil:_a;_c=self.$t(nil,_b);return _c});_d=self.$u(nil,"--");return _d},$aA: function(){var self,_d,_e;_e=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;self.$u(nil,"three_times_yield2");_e=self.$aB(function(_a){var _b;var _c=nil;_b=_a===undefined?nil:_a;if((_d=_b.$R(nil,1),_d!==false&&_d!==nil)){_c=_b}else{return _b.$N(nil,1)};return _c});return _e},$aD: function(){var self,_a,_b,_d,_f;_a=_b=_f=nil;self=this;try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;self.$u(nil,"loop");_a=0;_b=self.$x(function(){var _e=nil;;_a=_a.$N(nil,1);if((_d=_a.$3(nil,2).$R(nil,1),_d!==false&&_d!==nil)){return nil};self.$t(nil,_a);if((_d=_a.$_(nil,8),_d!==false&&_d!==nil)){throw(new a$c(["out",_a],null))}else{_e=nil};return _e});self.$t(nil,_b);_f=self.$u(nil,"--");return _f}catch(_g){if(_g instanceof a$c && (!_g.a$b || _g.a$b==52))return _g.a$a;throw(_g)}},$aC: function(){var self,_d;_d=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;self.$u(nil,"three_times_block");self.$ar(function(_a){var _b;var _c=nil;_b=_a===undefined?nil:_a;_c=self.$t(nil,_b);return _c});_d=self.$u(nil,"--");return _d},$J: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;self.$aE();self.$aC();self.$ax();self.$aA();self.$aD();self.$at();self.$av();self.$az();_a=self.$t(nil,self.$aF());return _a},$x: function(_a){var self,_b;_b=nil;self=this;try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;while(true){_a()};_b=self.$t(nil,"not reached");return _b}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==55))return _c.a$a;throw(_c)}},$ay: function(_a){var self,_b,_c;_c=nil;self=this;_b=_a===undefined?nil:_a;try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;self.$aG(_b);_c=self.$ar(_b);return _c}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==54))return _d.a$a;throw(_d)}},$aG: function(_a){var self,_b;_b=nil;self=this;try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a(1);_a(2);_b=_a(3);return _b}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==53))return _c.a$a;throw(_c)}},$aB: function(_a){var self,_b;_b=nil;self=this;try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;self.$t(nil,_a(1));self.$t(nil,_a(2));_b=self.$t(nil,_a(3));return _b}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==56))return _c.a$a;throw(_c)}},$aF: function(){var self,_b;_b=nil;self=this;try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;self.$t(nil,"before");self.$aw(function(){;throw(new a$c(4,57))});_b=self.$t(nil,"after (NOT)");return _b}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==57))return _c.a$a;throw(_c)}},$aE: function(){var self,_d;_d=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;self.$u(nil,"three_times_yield");self.$aG(function(_a){var _b;var _c=nil;_b=_a===undefined?nil:_a;_c=self.$t(nil,_b);return _c});_d=self.$u(nil,"--");return _d}}});$U = a$d({a$j: [],a$e: nil,a$c: "Enumerable",a$h: {$aH: function(_a){var self,_b,_c,_g,_h;_c=_h=nil;self=this;_b=_a===undefined?nil:_a;try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_c=[];self.$v(function(_d){var _e;var _f=nil;_e=_d===undefined?nil:_d;if((_g=_b,_g!==false&&_g!==nil)){_f=_c.$an(nil,_b.$as(nil,_e))}else{_f=_c.$an(nil,_e)};return _f});_h=_c;return _h}catch(_i){if(_i instanceof a$c && (!_i.a$b || _i.a$b==58))return _i.a$a;throw(_i)}},$aI: function(_f){var self,_a,_e,_g;_a=_g=nil;self=this;try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=[];self.$v(function(_b){var _c;var _d=nil;_c=_b===undefined?nil:_b;if((_e=_f(_c),_e!==false&&_e!==nil)){_d=_a.$an(nil,_c)}else{_d=nil};return _d});_g=_a;return _g}catch(_h){if(_h instanceof a$c && (!_h.a$b || _h.a$b==59))return _h.a$a;throw(_h)}},$aJ: function(_a){var self,_b,_c,_g,_h;_c=_h=nil;self=this;_b=_a===undefined?nil:_a;try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_c=[];self.$v(function(_d){var _e;var _f=nil;_e=_d===undefined?nil:_d;if((_g=_b,_g!==false&&_g!==nil)){_f=_c.$an(nil,_b.$as(nil,_e))}else{_f=_c.$an(nil,_e)};return _f});_h=_c;return _h}catch(_i){if(_i instanceof a$c && (!_i.a$b || _i.a$b==60))return _i.a$a;throw(_i)}},$U: function(){var self,_a,_e;_a=_e=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=[];self.$v(function(_b){var _c;var _d=nil;_c=_b===undefined?nil:_b;_d=_a.$an(nil,_c);return _d});_e=_a;return _e},$aK: function(_f){var self,_a,_e,_g;_a=_g=nil;self=this;try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=[];self.$v(function(_b){var _c;var _d=nil;_c=_b===undefined?nil:_b;if((_e=_f(_c),_e===false||_e===nil)){_d=_a.$an(nil,_c)}else{_d=nil};return _d});_g=_a;return _g}catch(_h){if(_h instanceof a$c && (!_h.a$b || _h.a$b==61))return _h.a$a;throw(_h)}},$aL: function(_f){var self,_a,_e,_g;_a=_g=nil;self=this;try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=[];self.$v(function(_b){var _c;var _d=nil;_c=_b===undefined?nil:_b;if((_e=_f(_c),_e!==false&&_e!==nil)){_d=_a.$an(nil,_c)}else{_d=nil};return _d});_g=_a;return _g}catch(_h){if(_h instanceof a$c && (!_h.a$b || _h.a$b==62))return _h.a$a;throw(_h)}}}});$V = a$d({a$j: [],a$e: $n,a$c: "LocalJumpError"});$H = a$d({a$j: [],a$e: $j,a$f: {$D: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self.$a().$J();return _a}},a$c: "TestIf",a$h: {$J: function(){var self,_a,_b,_c,_d,_e,_f;_f=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;if(true){self.$u(nil,"OK")};if(false){self.$u(nil,"NOT OK")};if(true){self.$u(nil,"OK")};if(false){self.$u(nil,"NOT OK")};if((_a=(_b=true, (_b!==false&&_b!==nil) ? ((_c=true, (_c!==false&&_c!==nil) ? ((_d=(_e=true, (_e!==false&&_e!==nil) ? _e : (false)), (_d!==false&&_d!==nil) ? (true) : _d)) : _c)) : _b),_a!==false&&_a!==nil)){self.$u(nil,"OK")};if((_a=(_b=(5).$6(nil,6), (_b!==false&&_b!==nil) ? ((6).$6(nil,7)) : _b),_a!==false&&_a!==nil)){self.$u(nil,"OK")};self.$t(nil,(_a=false, (_a!==false&&_a!==nil) ? _a : ("a")));self.$t(nil,(_a=nil, (_a!==false&&_a!==nil) ? _a : ("a")));self.$t(nil,(_a=true, (_a!==false&&_a!==nil) ? _a : ("a")));self.$t(nil,(_a="b", (_a!==false&&_a!==nil) ? _a : ("a")));self.$t(nil,(_a=false, (_a!==false&&_a!==nil) ? ("a") : _a));self.$t(nil,(_a=nil, (_a!==false&&_a!==nil) ? ("a") : _a));self.$t(nil,(_a=true, (_a!==false&&_a!==nil) ? ("a") : _a));_f=self.$t(nil,(_a="b", (_a!==false&&_a!==nil) ? ("a") : _a));return _f}}});$N = a$d({a$j: [],a$e: $j,a$f: {$D: function(){var self,_a,_b,_c,_d;_a=_b=_c=_d=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=$W.$a(nil,"AA-BB","Leni");_b=$W.$a(nil,"AC-DC","Flocki");_c=$T.$a(nil,"AA-ZZ");_a.$aM();_c.$ap();_d=_c.$aq(nil,_a);return _d}},a$c: "TestLebewesen"});$X = a$d({a$j: [],a$e: $j,a$c: "D"});$Q = a$d({a$j: [],a$e: $j,a$f: {$D: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self.$a().$J();return _a}},a$c: "TestRange",a$h: {$J: function(){var self,_a,_i,_j;_a=_i=_j=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=$C.$a(nil,0,2);self.$t(nil,_a.$af());self.$t(nil,_a.$ah());self.$t(nil,_a);self.$t(nil,$C.$a(nil,0,2,false).$o());self.$t(nil,$C.$a(nil,0,2,true).$o());$C.$a(nil,0,4,false).$v(function(_b){var _c;var _d=nil;_c=_b===undefined?nil:_b;_d=self.$t(nil,_c);return _d});$C.$a(nil,0,4,true).$v(function(_e){var _c;var _f=nil;_c=_e===undefined?nil:_e;_f=self.$t(nil,_c);return _f});$C.$a(nil,-1,-4,false).$v(function(_g){var _c;var _h=nil;_c=_g===undefined?nil:_g;_h=self.$t(nil,_c);return _h});self.$t(nil,$C.$a(nil,0,4,false).$al(nil,4));self.$t(nil,$C.$a(nil,0,4,false).$al(nil,5));self.$t(nil,$C.$a(nil,0,4,true).$al(nil,5));self.$t(nil,$C.$a(nil,0,4,true).$al(nil,4));self.$t(nil,$C.$a(nil,0,4,true).$al(nil,3));self.$t(nil,$C.$a(nil,0,4,true).$al(nil,0));self.$t(nil,$C.$a(nil,0,4,true).$al(nil,-1));self.$t(nil,$C.$a(nil,-1,-5,false).$U());self.$t(nil,$C.$a(nil,-5,-1,false).$U());_i=$C.$a(nil,0,4);self.$t(nil,_i.$af());self.$t(nil,_i.$ak());self.$t(nil,_i.$ah());self.$t(nil,_i.$am());self.$t(nil,_i.$aj());_i=$C.$a(nil,1,5,true);self.$t(nil,_i.$af());self.$t(nil,_i.$ak());self.$t(nil,_i.$ah());self.$t(nil,_i.$am());self.$t(nil,_i.$aj());self.$t(nil,false.$R(nil,false));self.$t(nil,false.$R(nil,true));self.$t(nil,true.$R(nil,false));self.$t(nil,true.$R(nil,true));self.$t(nil,$C.$a(nil,0,2,false).$R(nil,$C.$a(nil,0,2,false)));self.$t(nil,$C.$a(nil,0,2,false).$R(nil,$C.$a(nil,0,2)));_j=self.$t(nil,$C.$a(nil,0,2,false).$R(nil,$C.$a(nil,0,2,true)));return _j}}});$Y = a$d({a$j: [],a$e: $j,a$c: "Regexp",a$d: RegExp});$a = a$d({a$j: [],a$e: $n,a$c: "ArgumentError"});$Z = a$d({a$j: [],a$e: $t,a$c: "Float",a$d: Number});$F = a$d({a$j: [],a$e: $j,a$f: {$D: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self.$a().$J();return _a}},a$c: "TestNew",a$h: {$c: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=nil;return _a},$J: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self.$u(nil,"test");return _a}}});$0 = a$d({a$j: [],a$e: $p,a$c: "B",a$h: {$I: function(_d,_a,_b){var self;self=this;var _c=arguments;try{if(arguments.length!=3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));;self.$t(nil,"in B");a$j(self,'$I',_c)}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==63))return _e.a$a;throw(_e)}},$aN: function(_c,_a){var self,_b;_b=nil;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;_b=nil;return _b}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==64))return _d.a$a;throw(_d)}}}});a$d({a$j: [],a$g: $b});$g = a$d({a$j: [],a$e: $S,a$c: "NoMethodError"});$I = a$d({a$j: [],a$e: $j,a$f: {$D: function(){var self,_b,_c,_d;_b=_d=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;self.$t(nil,"before block");self.$t(nil,"in block");self.$t(nil,"after block");try{self.$t(nil,"block");self.$t(nil,"else")}catch(_a){if(_a instanceof a$c)throw(_a);if((_c=$n.$f(nil,_a),_c!==false&&_c!==nil)){self.$t(nil,"rescue")}else{if((_c=$f.$f(nil,_a),_c!==false&&_c!==nil)){_b=(typeof(_a)=='undefined'?nil:_a);self.$t(nil,"another rescue");self.$t(nil,_b)}else{throw(_a)}}};self.$t(nil,$c.$a(nil,"test"));self.$u(nil,"before begin");try{try{self.$u(nil,"before raise");self.$j(nil,$f,"blah");self.$u(nil,"after raise")}catch(_a){if(_a instanceof a$c)throw(_a);if((_c=$n.$f(nil,_a),_c!==false&&_c!==nil)){self.$u(nil,"noooo")}else{if((_c=$f.$f(nil,_a),_c!==false&&_c!==nil)){_b=(typeof(_a)=='undefined'?nil:_a);self.$t(nil,_b);self.$u(nil,"yes")}else{throw(_a)}}}}finally{self.$u(nil,"ensure")};self.$u(nil,"after begin");self.$u(nil,"--");try{try{self.$u(nil,"abc");self.$j(nil,"r")}catch(_a){if(_a instanceof a$c)throw(_a);if((_c=$n.$f(nil,_a),_c!==false&&_c!==nil)){self.$t(nil,(typeof(_a)=='undefined'?nil:_a));self.$u(nil,"b")}else{throw(_a)}}}finally{self.$u(nil,"e")};try{_d=self.$t(nil,"hallo".$o(nil,2))}catch(_a){if(_a instanceof a$c)throw(_a);if((_c=$a.$f(nil,_a),_c!==false&&_c!==nil)){_b=(typeof(_a)=='undefined'?nil:_a);_d=self.$t(nil,_b)}else{throw(_a)}};return _d}},a$c: "TestException"});$M = a$d({a$j: [],a$e: $j,a$f: {$D: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self.$a().$J();return _a}},a$c: "TestArray",a$h: {$J: function(){var self,_a,_b;_a=_b=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=["a","b","b","b","c"];self.$t(nil,_a.$aO(nil,"b"));self.$t(nil,_a);_b=self.$t(nil,_a.$aO(nil,"z"));return _b}}});$W = a$d({a$j: [],a$e: $z,a$c: "Katze",a$h: {$e: function(){var self,_a;_a=nil;self=this;if(self.$aP===undefined)self.$aP=nil;_a=self.$aP;return _a},$c: function(_d,_a,_b){var self,_c;_c=nil;self=this;try{if(arguments.length!=3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));;a$k(self,'$c',nil,[_a]);_c=self.$aP=_b;return _c}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==65))return _e.a$a;throw(_e)}},$aM: function(){var self,_a;_a=nil;self=this;if(self.$aP===undefined)self.$aP=nil;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self.$u(nil,"miau, ich bin ".$N(nil,self.$aP));return _a}}});$P = a$d({a$j: [],a$e: $j,a$f: {$D: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self.$a().$J();return _a}},a$c: "TestExpr",a$h: {$J: function(){var self,_a,_b,_c;_a=_c=nil;self=this;try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=(true?1:2);self.$t(nil,_a);(_b=_a=true, (_b!==false&&_b!==nil) ? _b : (a$l(new a$c(nil,null))));_c=self.$t(nil,_a);return _c}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==66))return _d.a$a;throw(_d)}}}});$h = a$d({a$j: [],a$e: $j,a$f: {$a: function(_a){var self,_b,_c;self=this;_b=_a===undefined?nil:_a;try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;if((_c=_b.$q(),_c!==false&&_c!==nil)){self.$j(nil,$a,"tried to create Proc object without a block")};return (function() {
        try {
          return _b.$as.apply(_b, arguments);
        } catch(e) 
        {
          if (e instanceof a$c) 
          {
            if (e.a$b == null)
            {;self.$j(nil,$V,"break from proc-closure");}
            return e.a$a;
          }
          else throw(e);
        }
      })}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==67))return _d.a$a;throw(_d)}}},a$c: "Proc",a$d: Function,a$h: {$as: function(){var self,_a,_b;self=this;_a=[];for(_b=1;_b<arguments.length;_b++)_a.push(arguments[_b]);;if (_a.length == 0) return self();
       else if (_a.length == 1) return self(_a[0]);
       else return self(_a);}}});$K = a$d({a$j: [],a$e: $j,a$f: {$D: function(){var self,_a,_b;_a=_b=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self.$a();_a.$C(nil,0);self.$u(nil,"--");_a.$C(nil,1,2);self.$u(nil,"--");_a.$C(nil,1,2,9);self.$u(nil,"--");_a.$C(nil,1,2,9,5);self.$u(nil,"--");_a.$C(nil,1,2,9,5,6);self.$u(nil,"--");_b=_a.$C(nil,1,2,9,5,6,7,8,9,10,11,12);return _b}},a$c: "TestArgs",a$h: {$C: function(_g,_a,_b,_c){var self,_d,_e,_f;_f=nil;self=this;try{if(arguments.length<2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));if(_b===undefined)_b=1;if(_c===undefined)_c="hallo";_d=[];for(_e=4;_e<arguments.length;_e++)_d.push(arguments[_e]);;self.$t(nil,_a);self.$t(nil,_b);self.$t(nil,_c);_f=self.$t(nil,_d);return _f}catch(_h){if(_h instanceof a$c && (!_h.a$b || _h.a$b==68))return _h.a$a;throw(_h)}}}});$1 = a$d({a$j: [],a$e: $0,a$c: "C"});$O = a$d({a$j: [],a$e: $j,a$f: {$D: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;self.$t(nil,$p.$a().$m(nil,$p));self.$t(nil,$p.$a().$m(nil,$0));self.$t(nil,$0.$a().$m(nil,$p));self.$t(nil,$p.$a().$m(nil,$o));self.$t(nil,$0.$a().$m(nil,$o));self.$t(nil,$p.$a().$h(nil,$p));self.$t(nil,$p.$a().$h(nil,$0));self.$t(nil,$0.$a().$h(nil,$p));self.$t(nil,$p.$a().$h(nil,$o));self.$t(nil,$0.$a().$h(nil,$o));self.$t(nil,$1.$a().$h(nil,$o));self.$t(nil,$1.$a().$h(nil,$p));self.$t(nil,$1.$a().$h(nil,$0));self.$t(nil,$1.$a().$h(nil,$1));self.$t(nil,$1.$a().$h(nil,$X));self.$t(nil,$1.$a().$h(nil,$j));self.$t(nil,$1.$a().$h(nil,$i));self.$t(nil,$1.$a().$h(nil,$b));self.$t(nil,"hallo".$z().$e());self.$t(nil,nil.$z().$e());self.$t(nil,nil.$m(nil,$s));self.$t(nil,"hallo".$m(nil,$e));self.$t(nil,"hallo".$z());self.$t(nil,$p);self.$t(nil,$0);self.$t(nil,$1);self.$t(nil,$X);self.$t(nil,$o);self.$t(nil,$o.$e());self.$t(nil,$p.$e());_a=self.$t(nil,$0.$e());return _a}},a$c: "TestClass"});$e = a$d({a$j: [],a$e: $j,a$c: "String",a$d: String,a$h: {$N: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;return(self + _a)}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==70))return _c.a$a;throw(_c)}},$aQ: function(_c,_a,_b){var self;self=this;try{if(arguments.length!=3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));;self.replace(pattern, replacement)}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==69))return _d.a$a;throw(_d)}},$L: function(_f,_a,_b){var self,_c,_d,_e;_d=_e=nil;self=this;try{if(arguments.length<2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));if(arguments.length>3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));if(_b===undefined)_b=" ";;if((_c=_b.$l(),_c!==false&&_c!==nil)){self.$j(nil,$a,"zero width padding")};_d=_a.$0(nil,self.$aS());if((_c=_d.$X(nil,0),_c!==false&&_c!==nil)){return self};_e="";while(_e.length < _d) _e += _b;;return _e.$F(nil,0,_d).$N(nil,self)}catch(_g){if(_g instanceof a$c && (!_g.a$b || _g.a$b==71))return _g.a$a;throw(_g)}},$aR: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;return self.length},$F: function(_d,_a,_b){var self,_c;self=this;try{if(arguments.length<2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));if(arguments.length>3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));if(_b===undefined)_b=nil;;if((_c=_b.$q(),_c!==false&&_c!==nil)){return self.charAt(_a) || nil}else{if((_c=_b.$6(nil,0),_c!==false&&_c!==nil)){return nil};return self.substring(_a, _a+_b)}}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==73))return _e.a$a;throw(_e)}},$M: function(_f,_a,_b){var self,_c,_d,_e;_d=_e=nil;self=this;try{if(arguments.length<2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));if(arguments.length>3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));if(_b===undefined)_b=" ";;if((_c=_b.$l(),_c!==false&&_c!==nil)){self.$j(nil,$a,"zero width padding")};_d=_a.$0(nil,self.$aS());if((_c=_d.$X(nil,0),_c!==false&&_c!==nil)){return self};_e="";while(_e.length < _d) _e += _b;;return self.$N(nil,_e.$F(nil,0,_d))}catch(_g){if(_g instanceof a$c && (!_g.a$b || _g.a$b==72))return _g.a$a;throw(_g)}},$aT: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;return self.split(_a)}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==74))return _c.a$a;throw(_c)}},$o: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self;return _a},$aS: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;return self.length},$aU: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;return self.replace(/^\s+/, '').replace(/\s+$/, '')},$l: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;return(self === "")},$Q: function(_g,_a,_b){var self,_c,_d,_e,_f;_d=_e=_f=nil;self=this;try{if(arguments.length<2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));if(arguments.length>3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));if(_b===undefined)_b=nil;;(_c=["",self,nil],_d=_c[0]===undefined?nil:_c[0],_e=_c[1]===undefined?nil:_c[1],_f=_c[2]===undefined?nil:_c[2],_c);while(_e.length > 0) {
        if (_f = _e.match(_a)) {
          _d += _e.slice(0, _f.index);;if((_c=_b,_c!==false&&_c!==nil)){_d=_d.$N(nil,_b)}else{_d=_d.$N(nil,_g(_f.$af()).$o())};_e = _e.slice(_f.index + _f[0].length);
        } else {
          _d += _e; _e = '';
        }
      } return _d}catch(_h){if(_h instanceof a$c && (!_h.a$b || _h.a$b==76))return _h.a$a;throw(_h)}},$K: function(_c,_a,_b){var self;self=this;try{if(arguments.length<2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));if(arguments.length>3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));if(_b===undefined)_b=0;;
      var i = self.indexOf(_a, _b);
      return (i == -1) ? nil : i}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==75))return _d.a$a;throw(_d)}},$i: function(){var self,_a,_b;_a=_b=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a={
        '\b': '\\b',
        '\t': '\\t',
        '\n': '\\n',
        '\f': '\\f',
        '\r': '\\r',
        '\\': '\\\\'
      };;_b=self.$Q(function(_c){var _d,_e;_d=_c===undefined?nil:_c;_e=_a[_d];return _e ? _e : 
          '\\u00' + ("0" + _d.charCodeAt().toString(16)).substring(0,2);},/[\x00-\x1f\\]/);return ('"' + _b.replace(/"/g, '\\"') + '"');},$aV: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;
      var i = self.match(_a);
      return (i === null) ? nil : i}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==77))return _c.a$a;throw(_c)}}}});$E = a$d({a$j: [],a$e: $j,a$f: {$D: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self.$u(nil,"Hello World from RubyJS");return _a}},a$c: "TestSimpleOutput"});$G = a$d({a$j: [],a$e: $j,a$f: {$D: function(){var self,_b,_c;_c=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;self.$u(nil,"send");self.$t(nil,$p.$a().$w(nil,"a_method",1,2));self.$t(nil,$0.$a().$w(nil,"a_method",1,2));self.$u(nil,"respond_to?");self.$t(nil,$p.$a().$r(nil,"a_method"));self.$t(nil,$p.$a().$r(nil,"to_s"));self.$t(nil,$p.$a().$r(nil,"inspect"));self.$t(nil,$p.$a().$r(nil,"b_method"));self.$t(nil,$p.$a().$r(nil,"c_method"));self.$u(nil,"method_missing");self.$t(nil,$y.$a().$r(nil,"blah_blah"));$y.$a().$aW(nil,1,2,3);try{$p.$a().$aW();self.$u(nil,"FAILURE?")}catch(_a){if(_a instanceof a$c)throw(_a);if((_b=$g.$f(nil,_a),_b!==false&&_b!==nil)){self.$u(nil,"catched!!!")}else{throw(_a)}};try{_c=$p.$aX()}catch(_a){if(_a instanceof a$c)throw(_a);if((_b=$g.$f(nil,_a),_b!==false&&_b!==nil)){_c=self.$t(nil,"goood")}else{throw(_a)}};return _c}},a$c: "TestSend"});$B = a$d({a$j: [],a$e: $t,a$c: "Fixnum",a$d: Number});$A = a$d({a$j: [$U],a$e: $j,a$f: {$a: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;return []}},a$c: "Array",a$d: Array,a$h: {$N: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;return self.concat(_a)}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==80))return _c.a$a;throw(_c)}},$an: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;self.push(_a); return self}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==79))return _c.a$a;throw(_c)}},$aO: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;
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
      return del ? _a : nil}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==78))return _c.a$a;throw(_c)}},$aR: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;return self.length},$F: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;var v = self[_a]; return ((v === undefined || v === null) ? nil : v)}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==82))return _c.a$a;throw(_c)}},$g: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;
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
      }catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==81))return _c.a$a;throw(_c)}},$aY: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;return self.concat().reverse()},$o: function(){var self,_d;_d=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_d=self.$aJ(function(_a){var _b;var _c=nil;_b=_a===undefined?nil:_a;_c=_b.$o();return _c}).$aZ();return _d},$a1: function(_c,_a,_b){var self;self=this;try{if(arguments.length!=3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));;return (self[_a] = _b)}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==85))return _d.a$a;throw(_d)}},$v: function(_a){var self,_b;_b=nil;self=this;try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;for (var i=0; i < self.length; i++) {;_a(self[i]);};_b=self;return _b}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==84))return _c.a$a;throw(_c)}},$a0: function(_a){var self,_b;_b=nil;self=this;try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;for (var i=0; i < self.length; i++) {;_a([self[i],i]);};_b=self;return _b}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==83))return _c.a$a;throw(_c)}},$af: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;var v = self[0]; return ((v === undefined || v === null) ? nil : v)},$aS: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;return self.length},$a2: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;return self.pop()},$k: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;return self.shift()},$l: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;return (self.length == 0)},$U: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self;return _a},$a4: function(){var self,_a,_b;self=this;_a=[];for(_b=1;_b<arguments.length;_b++)_a.push(arguments[_b]);;self.push.apply(self, _a); return self},$a3: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self;return _a},$a7: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;return self.concat()},$i: function(){var self,_a,_e;_a=_e=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a="[";_a=_a.$N(nil,self.$aJ(function(_b){var _c;var _d=nil;_c=_b===undefined?nil:_b;_d=_c.$i();return _d}).$aZ(nil,", "));_a=_a.$N(nil,"]");_e=_a;return _e},$a6: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;self.reverse(); return self},$a5: function(){var self,_a,_b;self=this;_a=[];for(_b=1;_b<arguments.length;_b++)_a.push(arguments[_b]);;self.unshift.apply(self, _a); return self},$aZ: function(_i,_a){var self,_b,_d,_h;_b=_h=nil;self=this;try{if(arguments.length>2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));if(_a===undefined)_a="";;_b="";self.$a0(function(_c){var _e,_f;var _g=nil;(_d=a$m(_c),_e=_d[0]===undefined?nil:_d[0],_f=_d[1]===undefined?nil:_d[1],_d);_b=_b.$N(nil,_e.$o());if((_d=_f.$R(nil,self.$aS().$0(nil,1)),_d===false||_d===nil)){_g=_b=_b.$N(nil,_a)}else{_g=nil};return _g});_h=_b;return _h}catch(_j){if(_j instanceof a$c && (!_j.a$b || _j.a$b==86))return _j.a$a;throw(_j)}}}});$l = a$d({a$j: [$U],a$e: $j,a$f: {$E: function(){var self,_a,_b,_c;_c=nil;self=this;_a=[];for(_b=1;_b<arguments.length;_b++)_a.push(arguments[_b]);;_c=self.$b();
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
      }},a$c: "Hash",a$h: {$F: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;
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
      }catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==87))return _c.a$a;throw(_c)}},$a8: function(){var self,_b,_f;_b=_f=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_f=self.$aJ(function(_a){var _c,_d;var _e=nil;(_b=a$m(_a),_c=_b[0]===undefined?nil:_b[0],_d=_b[1]===undefined?nil:_b[1],_b);_e=_c;return _e});return _f},$a1: function(_c,_a,_b){var self;self=this;try{if(arguments.length!=3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));;
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
      }catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==89))return _d.a$a;throw(_d)}},$v: function(_a){var self;self=this;try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;
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
      }catch(_b){if(_b instanceof a$c && (!_b.a$b || _b.a$b==88))return _b.a$a;throw(_b)}},$c: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;
      self.a$k = {}; 
      self.a$l = nil;
      },$a9: function(){var self,_b,_f;_b=_f=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_f=self.$aJ(function(_a){var _c,_d;var _e=nil;(_b=a$m(_a),_c=_b[0]===undefined?nil:_b[0],_d=_b[1]===undefined?nil:_b[1],_b);_e=_d;return _e});return _f},$i: function(){var self,_a,_c,_g;_a=_c=_g=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a="{";_a=_a.$N(nil,self.$aJ(function(_b){var _d,_e;var _f=nil;(_c=a$m(_b),_d=_c[0]===undefined?nil:_c[0],_e=_c[1]===undefined?nil:_c[1],_c);_f=_d.$i().$N(nil," => ").$N(nil,_e.$i());return _f}).$aZ(nil,", "));_a=_a.$N(nil,"}");_g=_a;return _g}}});      $b.a$e = $j;
var a$n = [$i,$j,$k,$m,$f,$n,$d,$o,$p,$q,$r,$s,$c,$t,$u,$x,$y,$z,$D,$R,$C,$S,$J,$T,$L,$U,$V,$H,$N,$X,$Q,$Y,$a,$Z,$F,$0,$b,$g,$I,$M,$W,$P,$h,$K,$1,$O,$e,$E,$G,$B,$A,$l];
a$o(a$n);
for (var i=0; i<a$n.length; i++) a$p(a$n[i]);
function main() { $R.$D() }
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
