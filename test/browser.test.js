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
var a$h = {"$ah":"test","$Q":"sub","$aT":"end","$v":"each","$au":"m","$x":"loop","$aM":"to_f","$6":"%","$aY":"member?","$C":"collect","$aa":"test_three_times_indirect","$aG":"&","$P":"new_from_key_value_list","$5":"test_loop2","$ak":"three_times_yield","$f":"===","$4":"three_times_block","$7":"==","$a2":"reverse","$ab":"three_times_indirect","$G":"map","$az":"downto","$aN":"to_i","$aF":"times","$t":"p","$aR":"include?","$s":"proc","$b":"allocate","$K":"keys","$I":"reject","$ae":"three_times_yield2","$S":"size","$aL":"*","$R":"+","$aP":"delete","$a7":"unshift","$N":"values","$$":"return_in_block","$ay":"upto","$a9":"dup","$T":"rjust","$aC":"-","$q":"nil?","$at":"not_a_method","$a":"new","$a6":"push","$_":"test_while_loop","$aD":"/","$E":"call","$am":"message","$y":"is_a?","$Y":"split","$al":"main","$e":"name","$l":"empty?","$a1":"jage","$aO":"to_splat","$j":"raise","$U":"length","$o":"to_s","$aA":">=","$ax":"c_method","$aE":"|","$h":"kind_of?","$F":"find_all","$aH":"~","$9":"loop2","$L":"[]","$Z":"strip","$ad":"test_three_times_yield2","$aJ":"-@","$aj":"test_return_in_block","$M":"[]=","$aB":"succ","$a8":"reverse!","$B":"hash","$z":"class","$i":"inspect","$aI":"^","$af":"test_three_times_block","$ai":"test_three_times_yield","$a4":"pop","$p":"__send","$g":"eql?","$X":"<","$a0":"wau","$2":"first","$aS":"begin","$D":"<<","$W":"ljust","$d":"__invoke","$8":">","$V":"<=","$c":"initialize","$w":"send","$r":"respond_to?","$ao":"a_method","$ag":"test_loop","$k":"shift","$aU":"exclude_end?","$aK":"+@","$as":"blah_blah","$J":"select","$ar":"miau","$H":"to_a","$n":"method_missing","$0":"index","$a3":"each_with_index","$O":"join","$ac":"test_proc","$A":"tap","$aQ":"last","$m":"instance_of?","$a5":"to_ary","$1":"gsub","$u":"puts","$3":"match"};
var a$f = {};
for (var i in a$h) a$f[a$h[i]] = i;
$b = a$d({a$e: nil,a$f: {$a: function(_e,_a,_b,_c){var self,_d;self=this;try{if(arguments.length<3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));if(arguments.length>4)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 3)'));if(_c===undefined)_c=nil;;if((_d=_c,_d===false||_d===nil)){_c=(function() {})};return new self.a$d($b, _a, _b, _c);}catch(_f){if(_f instanceof a$c && (!_f.a$b || _f.a$b==2))return _f.a$a;throw(_f)}}},a$c: "Class",a$g: new a$a(a$a, nil, "Class", a$a),a$h: {$e: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;return self.a$c},$a: function(_c){var self,_a,_b,_d,_e,_f;_e=_f=nil;self=this;_d=_c===undefined?nil:_c;try{_a=[];for(_b=1;_b<arguments.length;_b++)_a.push(arguments[_b]);;_e=self.$b();_e.$d(_d,'$c',a$b(_a));_f=_e;return _f}catch(_g){if(_g instanceof a$c && (!_g.a$b || _g.a$b==0))return _g.a$a;throw(_g)}},$f: function(_d,_a){var self,_b,_c;_c=nil;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;_c=(_b=self.$g(nil,_a), (_b!==false&&_b!==nil) ? _b : (_a.$h(nil,self)));return _c}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==1))return _e.a$a;throw(_e)}},$b: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;return (new self.a$d())},$i: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;return self.a$c}}});a$e($b);$i = a$d({a$j: [],a$e: nil,a$c: "Kernel",a$h: {$p: function(_d,_a){var self,_b,_c,_e;self=this;_e=_d===undefined?nil:_d;try{if(arguments.length<2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));_b=[];for(_c=2;_c<arguments.length;_c++)_b.push(arguments[_c]);;
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
        return self.$n.apply(self, [_e].concat([_a]).concat(_b));}catch(_f){if(_f instanceof a$c && (!_f.a$b || _f.a$b==8))return _f.a$a;throw(_f)}}}});$j = a$d({a$j: [$i],a$e: nil,a$c: "Object",a$h: {$h: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;return a$i(self, _a)}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==11))return _c.a$a;throw(_c)}},$y: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;return a$i(self, _a)}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==12))return _c.a$a;throw(_c)}},$z: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;return self.a$g},$g: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;return (self.constructor == _a.constructor && self == _a)}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==13))return _c.a$a;throw(_c)}},$B: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;return self.toString()},$A: function(_a){var self,_b;_b=nil;self=this;try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a(self);_b=self;return _b}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==14))return _c.a$a;throw(_c)}},$o: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;return self.toString()},$c: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=nil;return _a},$f: function(_d,_a){var self,_b,_c;_c=nil;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;_c=(_b=self.$g(nil,_a), (_b!==false&&_b!==nil) ? _b : (self.$h(nil,_a)));return _c}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==15))return _e.a$a;throw(_e)}},$m: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;return (self.a$g === _a)}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==16))return _c.a$a;throw(_c)}},$i: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;return self.toString()}}});$k = a$d({a$j: [],a$e: nil,a$c: "Enumerable",a$h: {$C: function(_a){var self,_b,_c,_f,_h;_c=_h=nil;self=this;_b=_a===undefined?nil:_a;try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_c=[];self.$v(function(_d){var _e;var _g=nil;_e=_d===undefined?nil:_d;_g=_c.$D(nil,((_f=_b,_f!==false&&_f!==nil)?_b.$E(nil,_e):_e));return _g});_h=_c;return _h}catch(_i){if(_i instanceof a$c && (!_i.a$b || _i.a$b==17))return _i.a$a;throw(_i)}},$F: function(_f){var self,_a,_e,_g;_a=_g=nil;self=this;try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=[];self.$v(function(_b){var _c;var _d=nil;_c=_b===undefined?nil:_b;if((_e=_f(_c),_e!==false&&_e!==nil)){_d=_a.$D(nil,_c)}else{_d=nil};return _d});_g=_a;return _g}catch(_h){if(_h instanceof a$c && (!_h.a$b || _h.a$b==18))return _h.a$a;throw(_h)}},$G: function(_a){var self,_b,_c,_f,_h;_c=_h=nil;self=this;_b=_a===undefined?nil:_a;try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_c=[];self.$v(function(_d){var _e;var _g=nil;_e=_d===undefined?nil:_d;_g=_c.$D(nil,((_f=_b,_f!==false&&_f!==nil)?_b.$E(nil,_e):_e));return _g});_h=_c;return _h}catch(_i){if(_i instanceof a$c && (!_i.a$b || _i.a$b==19))return _i.a$a;throw(_i)}},$H: function(){var self,_a,_e;_a=_e=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=[];self.$v(function(_b){var _c;var _d=nil;_c=_b===undefined?nil:_b;_d=_a.$D(nil,_c);return _d});_e=_a;return _e},$I: function(_f){var self,_a,_e,_g;_a=_g=nil;self=this;try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=[];self.$v(function(_b){var _c;var _d=nil;_c=_b===undefined?nil:_b;if((_e=_f(_c),_e===false||_e===nil)){_d=_a.$D(nil,_c)}else{_d=nil};return _d});_g=_a;return _g}catch(_h){if(_h instanceof a$c && (!_h.a$b || _h.a$b==20))return _h.a$a;throw(_h)}},$J: function(_f){var self,_a,_e,_g;_a=_g=nil;self=this;try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=[];self.$v(function(_b){var _c;var _d=nil;_c=_b===undefined?nil:_b;if((_e=_f(_c),_e!==false&&_e!==nil)){_d=_a.$D(nil,_c)}else{_d=nil};return _d});_g=_a;return _g}catch(_h){if(_h instanceof a$c && (!_h.a$b || _h.a$b==21))return _h.a$a;throw(_h)}}}});$l = a$d({a$j: [$k],a$e: $j,a$f: {$P: function(){var self,_a,_b,_c;_c=nil;self=this;_a=[];for(_b=1;_b<arguments.length;_b++)_a.push(arguments[_b]);;_c=self.$b();
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
      }},a$c: "Hash",a$h: {$L: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;
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
      }catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==22))return _c.a$a;throw(_c)}},$K: function(){var self,_b,_f;_b=_f=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_f=self.$G(function(_a){var _c,_d;var _e=nil;(_b=a$j(_a),_c=_b[0]===undefined?nil:_b[0],_d=_b[1]===undefined?nil:_b[1],_b);_e=_c;return _e});return _f},$M: function(_c,_a,_b){var self;self=this;try{if(arguments.length!=3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));;
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
      }catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==24))return _d.a$a;throw(_d)}},$v: function(_a){var self;self=this;try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;
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
      }catch(_b){if(_b instanceof a$c && (!_b.a$b || _b.a$b==23))return _b.a$a;throw(_b)}},$c: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;
      self.a$k = {}; 
      self.a$l = nil;
      },$N: function(){var self,_b,_f;_b=_f=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_f=self.$G(function(_a){var _c,_d;var _e=nil;(_b=a$j(_a),_c=_b[0]===undefined?nil:_b[0],_d=_b[1]===undefined?nil:_b[1],_b);_e=_d;return _e});return _f},$i: function(){var self,_a,_c,_g;_a=_c=_g=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a="{";_a=(_a)+(self.$G(function(_b){var _d,_e;var _f=nil;(_c=a$j(_b),_d=_c[0]===undefined?nil:_c[0],_e=_c[1]===undefined?nil:_c[1],_c);_f=((_d.$i())+(" => "))+(_e.$i());return _f}).$O(nil,", "));_a=(_a)+("}");_g=_a;return _g}}});$e = a$d({a$j: [],a$e: $j,a$c: "String",a$d: String,a$h: {$R: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;return(self + _a)}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==26))return _c.a$a;throw(_c)}},$Q: function(_c,_a,_b){var self;self=this;try{if(arguments.length!=3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));;self.replace(pattern, replacement)}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==25))return _d.a$a;throw(_d)}},$T: function(_f,_a,_b){var self,_c,_d,_e;_d=_e=nil;self=this;try{if(arguments.length<2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));if(arguments.length>3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));if(_b===undefined)_b=" ";;if((_c=_b.$l(),_c!==false&&_c!==nil)){self.$j(nil,$a,"zero width padding")};_d=(_a)-(self.$U());if((_c=_d.$V(nil,0),_c!==false&&_c!==nil)){return self};_e="";while(_e.length < _d) _e += _b;;return (_e.$L(nil,0,_d))+(self)}catch(_g){if(_g instanceof a$c && (!_g.a$b || _g.a$b==27))return _g.a$a;throw(_g)}},$S: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;return self.length},$L: function(_d,_a,_b){var self,_c;self=this;try{if(arguments.length<2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));if(arguments.length>3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));if(_b===undefined)_b=nil;;if((_c=_b.$q(),_c!==false&&_c!==nil)){return self.charAt(_a) || nil}else{if((_c=_b.$X(nil,0),_c!==false&&_c!==nil)){return nil};return self.substring(_a, _a+_b)}}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==29))return _e.a$a;throw(_e)}},$W: function(_f,_a,_b){var self,_c,_d,_e;_d=_e=nil;self=this;try{if(arguments.length<2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));if(arguments.length>3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));if(_b===undefined)_b=" ";;if((_c=_b.$l(),_c!==false&&_c!==nil)){self.$j(nil,$a,"zero width padding")};_d=(_a)-(self.$U());if((_c=_d.$V(nil,0),_c!==false&&_c!==nil)){return self};_e="";while(_e.length < _d) _e += _b;;return (self)+(_e.$L(nil,0,_d))}catch(_g){if(_g instanceof a$c && (!_g.a$b || _g.a$b==28))return _g.a$a;throw(_g)}},$Y: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;return self.split(_a)}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==30))return _c.a$a;throw(_c)}},$o: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self;return _a},$U: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;return self.length},$Z: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;return self.replace(/^\s+/, '').replace(/\s+$/, '')},$l: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;return(self === "")},$1: function(_g,_a,_b){var self,_c,_d,_e,_f;_d=_e=_f=nil;self=this;try{if(arguments.length<2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));if(arguments.length>3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));if(_b===undefined)_b=nil;;(_c=["",self,nil],_d=_c[0]===undefined?nil:_c[0],_e=_c[1]===undefined?nil:_c[1],_f=_c[2]===undefined?nil:_c[2],_c);while(_e.length > 0) {
        if (_f = _e.match(_a)) {
          _d += _e.slice(0, _f.index);;if((_c=_b,_c!==false&&_c!==nil)){_d=(_d)+(_b)}else{_d=(_d)+(_g(_f.$2()).$o())};_e = _e.slice(_f.index + _f[0].length);
        } else {
          _d += _e; _e = '';
        }
      } return _d}catch(_h){if(_h instanceof a$c && (!_h.a$b || _h.a$b==32))return _h.a$a;throw(_h)}},$0: function(_c,_a,_b){var self;self=this;try{if(arguments.length<2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));if(arguments.length>3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));if(_b===undefined)_b=0;;
      var i = self.indexOf(_a, _b);
      return (i == -1) ? nil : i}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==31))return _d.a$a;throw(_d)}},$i: function(){var self,_a,_b;_a=_b=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a={
        '\b': '\\b',
        '\t': '\\t',
        '\n': '\\n',
        '\f': '\\f',
        '\r': '\\r',
        '\\': '\\\\'
      };;_b=self.$1(function(_c){var _d,_e;_d=_c===undefined?nil:_c;_e=_a[_d];return _e ? _e : 
          '\\u00' + ("0" + _d.charCodeAt().toString(16)).substring(0,2);},/[\x00-\x1f\\]/);return ('"' + _b.replace(/"/g, '\\"') + '"');},$3: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;
      var i = self.match(_a);
      return (i === null) ? nil : i}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==33))return _c.a$a;throw(_c)}}}});$m = a$d({a$j: [],a$e: $j,a$f: {$al: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self.$a().$ah();return _a}},a$c: "T_TestYield::TestYield",a$h: {$5: function(){var self,_a,_b,_d,_f;_a=_b=_f=nil;self=this;try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;self.$u(nil,"loop2");_a=0;_b=self.$9(function(){var _e=nil;;_a=(_a)+(1);if((_d=_a.$6(nil,2).$7(nil,1),_d!==false&&_d!==nil)){return nil};self.$t(nil,_a);if((_d=_a.$8(nil,8),_d!==false&&_d!==nil)){throw(new a$c(["out",_a],null))}else{_e=nil};return _e});self.$t(nil,_b);_f=self.$u(nil,"--");return _f}catch(_g){if(_g instanceof a$c && (!_g.a$b || _g.a$b==35))return _g.a$a;throw(_g)}},$4: function(_a){var self,_b,_c;_c=nil;self=this;_b=_a===undefined?nil:_a;try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_b.$E(nil,1);_b.$E(nil,2);_c=_b.$E(nil,3);return _c}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==34))return _d.a$a;throw(_d)}},$$: function(_a){var self,_b,_c;_c=nil;self=this;_b=_a===undefined?nil:_a;try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;self.$t(nil,"return_in_block before");_b.$E();_c=self.$t(nil,"return_in_block after");return _c}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==36))return _d.a$a;throw(_d)}},$_: function(){var self,_a,_b,_c;_a=_c=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;self.$u(nil,"while-loop");_a=0;while(true){_a=(_a)+(1);if((_b=_a.$6(nil,2).$7(nil,1),_b!==false&&_b!==nil)){continue};self.$t(nil,_a);if((_b=_a.$8(nil,8),_b!==false&&_b!==nil)){break}};self.$u(nil,"----");while((_b=_a.$8(nil,0),_b!==false&&_b!==nil)){self.$t(nil,_a);_a=(_a)-(1)};_c=self.$u(nil,"--");return _c},$9: function(_a){var self,_b,_c;_c=nil;self=this;_b=_a===undefined?nil:_a;try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;while(true){_b.$E()};_c=self.$t(nil,"not reached");return _c}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==38))return _d.a$a;throw(_d)}},$ac: function(){var self,_a,_d;_a=_d=nil;self=this;try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;self.$t(nil,"test_proc");_a=self.$s(function(){;throw(new a$c(0,37))});self.$t(nil,_a.$E());_a=$h.$a(function(){;throw(new a$c(3,null))});_d=self.$t(nil,_a.$E());return _d}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==37))return _e.a$a;throw(_e)}},$aa: function(){var self,_d;_d=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;self.$u(nil,"three_times_indirect");self.$ab(function(_a){var _b;var _c=nil;_b=_a===undefined?nil:_a;_c=self.$t(nil,_b);return _c});_d=self.$u(nil,"--");return _d},$ad: function(){var self,_d,_e;_e=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;self.$u(nil,"three_times_yield2");_e=self.$ae(function(_a){var _b;var _c=nil;_b=_a===undefined?nil:_a;if((_d=_b.$7(nil,1),_d!==false&&_d!==nil)){_c=_b}else{return (_b)+(1)};return _c});return _e},$ag: function(){var self,_a,_b,_d,_f;_a=_b=_f=nil;self=this;try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;self.$u(nil,"loop");_a=0;_b=self.$x(function(){var _e=nil;;_a=(_a)+(1);if((_d=_a.$6(nil,2).$7(nil,1),_d!==false&&_d!==nil)){return nil};self.$t(nil,_a);if((_d=_a.$8(nil,8),_d!==false&&_d!==nil)){throw(new a$c(["out",_a],null))}else{_e=nil};return _e});self.$t(nil,_b);_f=self.$u(nil,"--");return _f}catch(_g){if(_g instanceof a$c && (!_g.a$b || _g.a$b==39))return _g.a$a;throw(_g)}},$af: function(){var self,_d;_d=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;self.$u(nil,"three_times_block");self.$4(function(_a){var _b;var _c=nil;_b=_a===undefined?nil:_a;_c=self.$t(nil,_b);return _c});_d=self.$u(nil,"--");return _d},$ah: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;self.$ai();self.$af();self.$aa();self.$ad();self.$ag();self.$5();self.$_();self.$ac();_a=self.$t(nil,self.$aj());return _a},$x: function(_a){var self,_b;_b=nil;self=this;try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;while(true){_a()};_b=self.$t(nil,"not reached");return _b}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==42))return _c.a$a;throw(_c)}},$ab: function(_a){var self,_b,_c;_c=nil;self=this;_b=_a===undefined?nil:_a;try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;self.$ak(_b);_c=self.$4(_b);return _c}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==41))return _d.a$a;throw(_d)}},$ak: function(_a){var self,_b;_b=nil;self=this;try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a(1);_a(2);_b=_a(3);return _b}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==40))return _c.a$a;throw(_c)}},$ae: function(_a){var self,_b;_b=nil;self=this;try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;self.$t(nil,_a(1));self.$t(nil,_a(2));_b=self.$t(nil,_a(3));return _b}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==43))return _c.a$a;throw(_c)}},$aj: function(){var self,_b;_b=nil;self=this;try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;self.$t(nil,"before");self.$$(function(){;throw(new a$c(4,44))});_b=self.$t(nil,"after (NOT)");return _b}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==44))return _c.a$a;throw(_c)}},$ai: function(){var self,_d;_d=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;self.$u(nil,"three_times_yield");self.$ak(function(_a){var _b;var _c=nil;_b=_a===undefined?nil:_a;_c=self.$t(nil,_b);return _c});_d=self.$u(nil,"--");return _d}}});$n = a$d({a$j: [],a$e: $j,a$f: {$al: function(){var self,_a,_b;_a=_b=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=$l.$P(nil,"a",6,"b",7,"1",1,1,2,"1,2","hello",[1,2],"good");self.$t(nil,_a.$L(nil,"a"));self.$t(nil,_a.$L(nil,"b"));self.$t(nil,_a.$L(nil,"1"));self.$t(nil,_a.$L(nil,1));self.$t(nil,_a.$L(nil,"1,2"));_b=self.$t(nil,_a.$L(nil,[1,2]));return _b}},a$c: "T_TestHash::TestHash"});$o = a$d({a$j: [],a$e: nil,a$c: "T_TestException"});$f = a$d({a$j: [],a$e: $j,a$c: "Exception",a$h: {$am: function(){var self,_a;_a=nil;self=this;if(self.$an===undefined)self.$an=nil;_a=self.$an;return _a},$o: function(){var self,_a;_a=nil;self=this;if(self.$an===undefined)self.$an=nil;_a=self.$an;return _a},$c: function(_d,_a){var self,_c,_b;_b=nil;self=this;try{if(arguments.length>2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));if(_a===undefined)_a=nil;;if((_c=_a.$q(),_c!==false&&_c!==nil)){_b=self.$an=self.$z().$e()}else{_b=self.$an=_a};return _b}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==45))return _e.a$a;throw(_e)}},$i: function(){var self,_a;_a=nil;self=this;if(self.$an===undefined)self.$an=nil;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=("#<" + (self.$z().$e()).$o() + (": ").$o() + (self.$an).$o() + (">").$o());return _a}}});$p = a$d({a$j: [],a$e: $f,a$c: "StandardError"});$q = a$d({a$j: [],a$e: $p,a$c: "NameError"});$g = a$d({a$j: [],a$e: $q,a$c: "NoMethodError"});$r = a$d({a$j: [],a$e: $j,a$c: "T_TestSend::A",a$h: {$ao: function(_d,_a,_b){var self,_c;_c=nil;self=this;try{if(arguments.length!=3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));;_c=self.$t(nil,_a,_b);return _c}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==46))return _e.a$a;throw(_e)}}}});$s = a$d({a$j: [],a$e: nil,a$c: "T_TestString"});$t = a$d({a$j: [],a$e: $j,a$c: "T_TestLebewesen::Lebewesen",a$h: {$c: function(_c,_a){var self,_b;_b=nil;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;_b=self.$ap=_a;return _b}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==47))return _d.a$a;throw(_d)}}}});$u = a$d({a$j: [],a$e: $t,a$c: "T_TestLebewesen::Katze",a$h: {$e: function(){var self,_a;_a=nil;self=this;if(self.$aq===undefined)self.$aq=nil;_a=self.$aq;return _a},$c: function(_d,_a,_b){var self,_c;_c=nil;self=this;try{if(arguments.length!=3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));;a$k(self,'$c',nil,[_a]);_c=self.$aq=_b;return _c}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==48))return _e.a$a;throw(_e)}},$ar: function(){var self,_a;_a=nil;self=this;if(self.$aq===undefined)self.$aq=nil;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self.$u(nil,("miau, ich bin ")+(self.$aq));return _a}}});$x = a$d({a$j: [],a$e: $j,a$f: {$al: function(){var self,_b,_c;_c=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;self.$u(nil,"send");self.$t(nil,$r.$a().$w(nil,"a_method",1,2));self.$t(nil,$v.$a().$w(nil,"a_method",1,2));self.$u(nil,"respond_to?");self.$t(nil,$r.$a().$r(nil,"a_method"));self.$t(nil,$r.$a().$r(nil,"to_s"));self.$t(nil,$r.$a().$r(nil,"inspect"));self.$t(nil,$r.$a().$r(nil,"b_method"));self.$t(nil,$r.$a().$r(nil,"c_method"));self.$u(nil,"method_missing");self.$t(nil,$w.$a().$r(nil,"blah_blah"));$w.$a().$as(nil,1,2,3);try{$r.$a().$as();self.$u(nil,"FAILURE?")}catch(_a){if(_a instanceof a$c)throw(_a);if((_b=$g.$f(nil,_a),_b!==false&&_b!==nil)){self.$u(nil,"catched!!!")}else{throw(_a)}};try{_c=$r.$at()}catch(_a){if(_a instanceof a$c)throw(_a);if((_b=$g.$f(nil,_a),_b!==false&&_b!==nil)){_c=self.$t(nil,"goood")}else{throw(_a)}};return _c}},a$c: "T_TestSend::TestSend"});$y = a$d({a$j: [],a$e: nil,a$c: "T_TestIf"});$z = a$d({a$j: [],a$e: $j,a$f: {$al: function(){var self,_a,_b;_a=_b=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self.$a();_a.$au();_a.$d(nil,'$au',a$b([]));_a.$au(nil,1);_a.$d(nil,'$au',a$b([1]));_a.$d(nil,'$au',[1].concat(a$b([])));_a.$au(nil,1,2);_a.$d(nil,'$au',a$b([1,2]));_a.$d(nil,'$au',[1].concat(a$b([2])));_b=_a.$d(nil,'$au',[1].concat(a$b([1,2])));return _b}},a$c: "T_TestSplat::TestSplat",a$h: {$au: function(){var self,_a,_b,_c;_c=nil;self=this;_a=[];for(_b=1;_b<arguments.length;_b++)_a.push(arguments[_b]);;_c=self.$t(nil,_a);return _c}}});$D = a$d({a$j: [],a$e: $j,a$f: {$al: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self.$a().$ah();return _a}},a$c: "T_TestCase::TestCase",a$h: {$ah: function(){var self,_a,_b,_c,_d;_d=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=(1)+(1); if((_b=(_c=(1).$f(nil,_a), (_c!==false&&_c!==nil) ? _c : ((3).$f(nil,_a))),_b!==false&&_b!==nil)){self.$u(nil,"NOT OKAY")}else{if((_b=(2).$f(nil,_a),_b!==false&&_b!==nil)){self.$u(nil,"OKAY")}else{self.$u(nil,"NOT OKAY")}};self.$t(nil,$A.$f(nil,[]));self.$t(nil,$c.$f(nil,$c.$a()));_a=1; if((_b=$B.$f(nil,_a),_b!==false&&_b!==nil)){self.$u(nil,"OK")}else{if((_b=(1).$f(nil,_a),_b!==false&&_b!==nil)){self.$u(nil,"OK")}};_a=_d=4; if((_b=$C.$a(nil,0,3,false).$f(nil,_a),_b!==false&&_b!==nil)){_d=self.$u(nil,"NOT OKAY")}else{if((_b=$C.$a(nil,1,4,true).$f(nil,_a),_b!==false&&_b!==nil)){_d=self.$u(nil,"NOT OKAY")}else{if((_b=$C.$a(nil,2,4,false).$f(nil,_a),_b!==false&&_b!==nil)){_d=self.$u(nil,"OKAY")}else{_d=nil}}};return _d}}});$E = a$d({a$j: [],a$e: nil,a$c: "T_TestExpr"});$F = a$d({a$j: [],a$e: nil,a$c: "T_TestClass::X"});$G = a$d({a$j: [$F],a$e: $j,a$c: "T_TestClass::A"});$H = a$d({a$j: [],a$e: $G,a$c: "T_TestClass::B"});$I = a$d({a$j: [],a$e: $j,a$f: {$al: function(){var self,_b,_c,_d;_b=_d=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;self.$t(nil,"before block");self.$t(nil,"in block");self.$t(nil,"after block");try{self.$t(nil,"block");self.$t(nil,"else")}catch(_a){if(_a instanceof a$c)throw(_a);if((_c=$p.$f(nil,_a),_c!==false&&_c!==nil)){self.$t(nil,"rescue")}else{if((_c=$f.$f(nil,_a),_c!==false&&_c!==nil)){_b=(typeof(_a)=='undefined'?nil:_a);self.$t(nil,"another rescue");self.$t(nil,_b)}else{throw(_a)}}};self.$t(nil,$c.$a(nil,"test"));self.$u(nil,"before begin");try{try{self.$u(nil,"before raise");self.$j(nil,$f,"blah");self.$u(nil,"after raise")}catch(_a){if(_a instanceof a$c)throw(_a);if((_c=$p.$f(nil,_a),_c!==false&&_c!==nil)){self.$u(nil,"noooo")}else{if((_c=$f.$f(nil,_a),_c!==false&&_c!==nil)){_b=(typeof(_a)=='undefined'?nil:_a);self.$t(nil,_b);self.$u(nil,"yes")}else{throw(_a)}}}}finally{self.$u(nil,"ensure")};self.$u(nil,"after begin");self.$u(nil,"--");try{try{self.$u(nil,"abc");self.$j(nil,"r")}catch(_a){if(_a instanceof a$c)throw(_a);if((_c=$p.$f(nil,_a),_c!==false&&_c!==nil)){self.$t(nil,(typeof(_a)=='undefined'?nil:_a));self.$u(nil,"b")}else{throw(_a)}}}finally{self.$u(nil,"e")};try{_d=self.$t(nil,"hallo".$o(nil,2))}catch(_a){if(_a instanceof a$c)throw(_a);if((_c=$a.$f(nil,_a),_c!==false&&_c!==nil)){_b=(typeof(_a)=='undefined'?nil:_a);_d=self.$t(nil,_b)}else{throw(_a)}};return _d}},a$c: "T_TestException::TestException"});$J = a$d({a$j: [],a$e: nil,a$c: "T_TestSplat"});$K = a$d({a$j: [],a$e: nil,a$c: "T_TestEql"});$a = a$d({a$j: [],a$e: $p,a$c: "ArgumentError"});$w = a$d({a$j: [],a$e: $j,a$c: "T_TestSend::C",a$h: {$n: function(_d,_a){var self,_b,_c,_e,_f;_f=nil;self=this;_e=_d===undefined?nil:_d;try{if(arguments.length<2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));_b=[];for(_c=2;_c<arguments.length;_c++)_b.push(arguments[_c]);;_f=self.$t(nil,("mm: " + (_a).$o() + (", ").$o() + (_b).$o()));return _f}catch(_g){if(_g instanceof a$c && (!_g.a$b || _g.a$b==49))return _g.a$a;throw(_g)}}}});$L = a$d({a$j: [],a$e: $j,a$f: {$al: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self.$u(nil,"Hello World from RubyJS");return _a}},a$c: "T_TestSimpleOutput::TestSimpleOutput"});$M = a$d({a$j: [],a$e: $j,a$f: {$al: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self.$a().$ah();return _a}},a$c: "T_TestString::TestString",a$h: {$ah: function(){var self,_a,_i;_a=_i=nil;self=this;if(self.$av===undefined)self.$av=nil;if(self.$aw===undefined)self.$aw=nil;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;self.$t(nil,"hello");self.$t(nil,"hallo\b\t\n");self.$t(nil,"hallo\\leute");self.$t(nil,"\"super\"");self.$t(nil,"hello".$0(nil,"e"));self.$t(nil,"hello".$0(nil,"lo"));self.$t(nil,"hello".$0(nil,"a"));self.$t(nil,"hello hello".$0(nil,"ll"));self.$t(nil,"hello hello".$0(nil,"ll",3));self.$t(nil,"hallo".$L(nil,0,1));self.$t(nil,"hallo".$L(nil,0,2));self.$t(nil,"hallo".$L(nil,0,5));self.$t(nil,"10".$T(nil,10,"0"));self.$t(nil,"10".$T(nil,1,"blah"));self.$t(nil,"x".$T(nil,4,"()"));self.$t(nil,"10".$W(nil,10,"0"));self.$t(nil,"10".$W(nil,1,"blah"));self.$t(nil,"x".$W(nil,4,"()"));self.$t(nil,("abc " + ((1)+(2)).$o() + (" def").$o()));self.$av="hallo".$i();self.$aw=4.5;self.$t(nil,("" + (self.$av).$o() + (",").$o() + (self.$aw).$o()));_a="hallo".$1(nil,"l","r");self.$t(nil,_a);_a="hallo".$1(nil,/ll/,"rr");self.$t(nil,_a);_a="hallo".$1(function(){var _c=nil;;_c="r";return _c},/l/);self.$t(nil,_a);_a="hallo".$1(function(){var _e=nil;;_e="blah blah";return _e},/ll/);self.$t(nil,_a);_i="hallllllo".$1(function(_f){var _g;var _h=nil;_g=_f===undefined?nil:_f;_h=self.$t(nil,_g);return _h},/(l)l/);return _i}}});$N = a$d({a$j: [],a$e: $j,a$f: {$al: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self.$a().$ah();return _a}},a$c: "T_TestExpr::TestExpr",a$h: {$ah: function(){var self,_a,_b,_c;_a=_c=nil;self=this;try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=(true?1:2);self.$t(nil,_a);(_b=_a=true, (_b!==false&&_b!==nil) ? _b : (a$l(new a$c(nil,null))));_c=self.$t(nil,_a);return _c}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==50))return _d.a$a;throw(_d)}}}});$O = a$d({a$j: [],a$e: nil,a$c: "T_TestNew"});$c = a$d({a$j: [],a$e: $p,a$c: "RuntimeError"});$P = a$d({a$j: [],a$e: nil,a$c: "T_TestRange"});$Q = a$d({a$j: [],a$e: $j,a$c: "Boolean",a$d: Boolean,a$h: {$7: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;return (self == _a)}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==51))return _c.a$a;throw(_c)}},$o: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;return (self == true ? 'true' : 'false')},$i: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;return (self == true ? 'true' : 'false')}}});$R = a$d({a$j: [],a$e: nil,a$c: "T_TestArray"});$V = a$d({a$j: [],a$e: $j,a$f: {$al: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;self.$t(nil,$G.$a().$m(nil,$G));self.$t(nil,$G.$a().$m(nil,$H));self.$t(nil,$H.$a().$m(nil,$G));self.$t(nil,$G.$a().$m(nil,$F));self.$t(nil,$H.$a().$m(nil,$F));self.$t(nil,$G.$a().$h(nil,$G));self.$t(nil,$G.$a().$h(nil,$H));self.$t(nil,$H.$a().$h(nil,$G));self.$t(nil,$G.$a().$h(nil,$F));self.$t(nil,$H.$a().$h(nil,$F));self.$t(nil,$S.$a().$h(nil,$F));self.$t(nil,$S.$a().$h(nil,$G));self.$t(nil,$S.$a().$h(nil,$H));self.$t(nil,$S.$a().$h(nil,$S));self.$t(nil,$S.$a().$h(nil,$T));self.$t(nil,$S.$a().$h(nil,$j));self.$t(nil,$S.$a().$h(nil,$i));self.$t(nil,$S.$a().$h(nil,$b));self.$t(nil,"hallo".$z().$e());self.$t(nil,nil.$z().$e());self.$t(nil,nil.$m(nil,$U));self.$t(nil,"hallo".$m(nil,$e));self.$t(nil,"hallo".$z());self.$t(nil,$G);self.$t(nil,$H);self.$t(nil,$S);self.$t(nil,$T);self.$t(nil,$F);self.$t(nil,$F.$e());self.$t(nil,$G.$e());_a=self.$t(nil,$H.$e());return _a}},a$c: "T_TestClass::TestClass"});$v = a$d({a$j: [],a$e: $r,a$c: "T_TestSend::B",a$h: {$ao: function(_d,_a,_b){var self;self=this;var _c=arguments;try{if(arguments.length!=3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));;self.$t(nil,"in B");a$m(self,'$ao',_c)}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==52))return _e.a$a;throw(_e)}},$ax: function(_c,_a){var self,_b;_b=nil;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;_b=nil;return _b}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==53))return _d.a$a;throw(_d)}}}});$W = a$d({a$j: [],a$e: nil,a$c: "T_TestCase"});$T = a$d({a$j: [],a$e: $j,a$c: "T_TestClass::D"});$X = a$d({a$j: [],a$e: $j,a$f: {$al: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;self.$t(nil,"a".$g(nil,"a"));self.$t(nil,"a".$g(nil,1));self.$t(nil,"1".$g(nil,1));self.$t(nil,[1,2].$g(nil,[1,2]));_a=self.$t(nil,(1).$g(nil,"1"));return _a}},a$c: "T_TestEql::TestEql"});$Y = a$d({a$j: [],a$e: $j,a$c: "Number",a$d: Number,a$h: {$R: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;return self + _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==57))return _c.a$a;throw(_c)}},$7: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;return self == _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==56))return _c.a$a;throw(_c)}},$az: function(_d,_a){var self,_b,_c;_b=nil;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;_b=self;while((_c=_b.$aA(nil,_a),_c!==false&&_c!==nil)){_d(_b);_b=(_b)-(1)};return self}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==55))return _e.a$a;throw(_e)}},$ay: function(_d,_a){var self,_b,_c;_b=nil;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;_b=self;while((_c=_b.$V(nil,_a),_c!==false&&_c!==nil)){_d(_b);_b=(_b)+(1)};return self}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==54))return _e.a$a;throw(_e)}},$V: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;return self <= _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==58))return _c.a$a;throw(_c)}},$aC: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;return self - _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==59))return _c.a$a;throw(_c)}},$aB: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;return self+1},$aD: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;return self / _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==61))return _c.a$a;throw(_c)}},$o: function(_b,_a){var self;self=this;try{if(arguments.length>2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));if(_a===undefined)_a=10;;return self.toString(_a)}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==60))return _c.a$a;throw(_c)}},$6: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;return self % _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==62))return _c.a$a;throw(_c)}},$aG: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;return self & _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==66))return _c.a$a;throw(_c)}},$X: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;return self < _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==65))return _c.a$a;throw(_c)}},$aF: function(_c){var self,_a,_b;_a=nil;self=this;try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=0;while((_b=_a.$X(nil,self),_b!==false&&_b!==nil)){_c(_a);_a=(_a)+(1)};return self}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==64))return _d.a$a;throw(_d)}},$aE: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;return self | _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==63))return _c.a$a;throw(_c)}},$aJ: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;return -self},$8: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;return self > _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==68))return _c.a$a;throw(_c)}},$aI: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;return self ^ _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==67))return _c.a$a;throw(_c)}},$aH: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;return ~self},$aA: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;return self >= _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==69))return _c.a$a;throw(_c)}},$i: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;return self.toString()},$aL: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;return self * _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==70))return _c.a$a;throw(_c)}},$aK: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;return self}}});$Z = a$d({a$j: [],a$e: $Y,a$c: "Float",a$d: Number});$U = a$d({a$j: [],a$e: $j,a$c: "NilClass",a$d: NilClass,a$h: {$aM: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=0.0;return _a},$q: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=true;return _a},$o: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a="";return _a},$aN: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=0;return _a},$H: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=[];return _a},$aO: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=[];return _a},$i: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a="nil";return _a}}});$0 = a$d({a$j: [],a$e: nil,a$c: "T_TestArgs"});$1 = a$d({a$j: [],a$e: $j,a$f: {$al: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self.$a().$ah();return _a}},a$c: "T_TestArray::TestArray",a$h: {$ah: function(){var self,_a,_b;_a=_b=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=["a","b","b","b","c"];self.$t(nil,_a.$aP(nil,"b"));self.$t(nil,_a);_b=self.$t(nil,_a.$aP(nil,"z"));return _b}}});$h = a$d({a$j: [],a$e: $j,a$f: {$a: function(_a){var self,_b,_c;self=this;_b=_a===undefined?nil:_a;try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;if((_c=_b,_c===false||_c===nil)){self.$j(nil,$a,"tried to create Proc object without a block")};return (function() {
        try {
          return _b.$E.apply(_b, arguments);
        } catch(e) 
        {
          if (e instanceof a$c) 
          {
            if (e.a$b == null)
            {;self.$j(nil,$2,"break from proc-closure");}
            return e.a$a;
          }
          else throw(e);
        }
      })}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==71))return _d.a$a;throw(_d)}}},a$c: "Proc",a$d: Function,a$h: {$E: function(){var self,_a,_b;self=this;_a=[];for(_b=1;_b<arguments.length;_b++)_a.push(arguments[_b]);;
      if (_a.length == 0) return self();
      else if (_a.length == 1) return self(_a[0]);
      else return self(_a);}}});$2 = a$d({a$j: [],a$e: $p,a$c: "LocalJumpError"});$3 = a$d({a$j: [],a$e: $j,a$f: {$al: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self.$a().$ah();return _a}},a$c: "T_TestRange::TestRange",a$h: {$ah: function(){var self,_a,_i,_j;_a=_i=_j=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=$C.$a(nil,0,2);self.$t(nil,_a.$2());self.$t(nil,_a.$aQ());self.$t(nil,_a);self.$t(nil,$C.$a(nil,0,2,false).$o());self.$t(nil,$C.$a(nil,0,2,true).$o());$C.$a(nil,0,4,false).$v(function(_b){var _c;var _d=nil;_c=_b===undefined?nil:_b;_d=self.$t(nil,_c);return _d});$C.$a(nil,0,4,true).$v(function(_e){var _c;var _f=nil;_c=_e===undefined?nil:_e;_f=self.$t(nil,_c);return _f});$C.$a(nil,-1,-4,false).$v(function(_g){var _c;var _h=nil;_c=_g===undefined?nil:_g;_h=self.$t(nil,_c);return _h});self.$t(nil,$C.$a(nil,0,4,false).$aR(nil,4));self.$t(nil,$C.$a(nil,0,4,false).$aR(nil,5));self.$t(nil,$C.$a(nil,0,4,true).$aR(nil,5));self.$t(nil,$C.$a(nil,0,4,true).$aR(nil,4));self.$t(nil,$C.$a(nil,0,4,true).$aR(nil,3));self.$t(nil,$C.$a(nil,0,4,true).$aR(nil,0));self.$t(nil,$C.$a(nil,0,4,true).$aR(nil,-1));self.$t(nil,$C.$a(nil,-1,-5,false).$H());self.$t(nil,$C.$a(nil,-5,-1,false).$H());_i=$C.$a(nil,0,4);self.$t(nil,_i.$2());self.$t(nil,_i.$aS());self.$t(nil,_i.$aQ());self.$t(nil,_i.$aT());self.$t(nil,_i.$aU());_i=$C.$a(nil,1,5,true);self.$t(nil,_i.$2());self.$t(nil,_i.$aS());self.$t(nil,_i.$aQ());self.$t(nil,_i.$aT());self.$t(nil,_i.$aU());self.$t(nil,false.$7(nil,false));self.$t(nil,false.$7(nil,true));self.$t(nil,true.$7(nil,false));self.$t(nil,true.$7(nil,true));self.$t(nil,$C.$a(nil,0,2,false).$7(nil,$C.$a(nil,0,2,false)));self.$t(nil,$C.$a(nil,0,2,false).$7(nil,$C.$a(nil,0,2)));_j=self.$t(nil,$C.$a(nil,0,2,false).$7(nil,$C.$a(nil,0,2,true)));return _j}}});$9 = a$d({a$j: [],a$e: $j,a$f: {$al: function(){var self,_c,_d,_b;_c=_b=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;try{self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");self.$u(nil,"Test splat");self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");$z.$al();self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");self.$u(nil,"Test simple output");self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");$L.$al();self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");self.$u(nil,"Test new");self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");$4.$al();self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");self.$u(nil,"Test massign");self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");$5.$al();self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");self.$u(nil,"Test send");self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");$x.$al();self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");self.$u(nil,"Test if");self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");$6.$al();self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");self.$u(nil,"Test hash");self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");$n.$al();self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");self.$u(nil,"Test exception");self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");$I.$al();self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");self.$u(nil,"Test eql");self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");$X.$al();self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");self.$u(nil,"Test args");self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");$7.$al();self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");self.$u(nil,"Test yield");self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");$m.$al();self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");self.$u(nil,"Test string");self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");$M.$al();self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");self.$u(nil,"Test array");self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");$1.$al();self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");self.$u(nil,"Test lebewesen");self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");$8.$al();self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");self.$u(nil,"Test class");self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");$V.$al();self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");self.$u(nil,"Test case");self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");$D.$al();self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");self.$u(nil,"Test expr");self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");$N.$al();self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");self.$u(nil,"Test range");self.$u(nil,"~~~~~~~~~~~~~~~~~~~~");_b=$3.$al()}catch(_a){if(_a instanceof a$c)throw(_a);if((_d=$f.$f(nil,_a),_d!==false&&_d!==nil)){_c=(typeof(_a)=='undefined'?nil:_a);self.$t(nil,"unhandled exception");_b=self.$t(nil,_c)}else{throw(_a)}};return _b}},a$c: "TestSuite"});$S = a$d({a$j: [],a$e: $H,a$c: "T_TestClass::C"});$4 = a$d({a$j: [],a$e: $j,a$f: {$al: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self.$a().$ah();return _a}},a$c: "T_TestNew::TestNew",a$h: {$c: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=nil;return _a},$ah: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self.$u(nil,"test");return _a}}});$_ = a$d({a$j: [],a$e: $Y,a$c: "Bignum",a$d: Number});$$ = a$d({a$j: [],a$e: nil,a$c: "T_TestLebewesen"});$aa = a$d({a$j: [],a$e: nil,a$c: "T_TestMassign"});$d = a$d({a$j: [],a$e: $p,a$c: "TypeError"});$C = a$d({a$j: [],a$e: $j,a$c: "Range",a$h: {$7: function(_e,_a){var self,_b,_c,_d;_d=nil;self=this;if(self.$aV===undefined)self.$aV=nil;if(self.$aW===undefined)self.$aW=nil;if(self.$aX===undefined)self.$aX=nil;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;if (self.constructor != _a.constructor) return false;;_d=(_b=self.$aV.$7(nil,_a.$2()), (_b!==false&&_b!==nil) ? ((_c=self.$aW.$7(nil,_a.$aQ()), (_c!==false&&_c!==nil) ? (self.$aX.$7(nil,_a.$aU())) : _c)) : _b);return _d}catch(_f){if(_f instanceof a$c && (!_f.a$b || _f.a$b==72))return _f.a$a;throw(_f)}},$aS: function(){var self,_a;_a=nil;self=this;if(self.$aV===undefined)self.$aV=nil;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self.$aV;return _a},$g: function(_e,_a){var self,_b,_c,_d;_d=nil;self=this;if(self.$aV===undefined)self.$aV=nil;if(self.$aW===undefined)self.$aW=nil;if(self.$aX===undefined)self.$aX=nil;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;if (self.constructor != _a.constructor) return false;;_d=(_b=self.$aV.$g(nil,_a.$2()), (_b!==false&&_b!==nil) ? ((_c=self.$aW.$g(nil,_a.$aQ()), (_c!==false&&_c!==nil) ? (self.$aX.$7(nil,_a.$aU())) : _c)) : _b);return _d}catch(_f){if(_f instanceof a$c && (!_f.a$b || _f.a$b==73))return _f.a$a;throw(_f)}},$aU: function(){var self,_a;_a=nil;self=this;if(self.$aX===undefined)self.$aX=nil;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self.$aX;return _a},$aQ: function(){var self,_a;_a=nil;self=this;if(self.$aW===undefined)self.$aW=nil;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self.$aW;return _a},$o: function(){var self,_b,_a;_a=nil;self=this;if(self.$aV===undefined)self.$aV=nil;if(self.$aW===undefined)self.$aW=nil;if(self.$aX===undefined)self.$aX=nil;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;if((_b=self.$aX,_b!==false&&_b!==nil)){_a=("" + (self.$aV).$o() + ("...").$o() + (self.$aW).$o())}else{_a=("" + (self.$aV).$o() + ("..").$o() + (self.$aW).$o())};return _a},$v: function(_c){var self,_a,_b,_d;_a=_d=nil;self=this;if(self.$aV===undefined)self.$aV=nil;if(self.$aW===undefined)self.$aW=nil;if(self.$aX===undefined)self.$aX=nil;try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self.$aV;if((_b=self.$aV.$8(nil,self.$aW),_b!==false&&_b!==nil)){return nil};if((_b=self.$aX,_b!==false&&_b!==nil)){while((_b=_a.$X(nil,self.$aW),_b!==false&&_b!==nil)){_c(_a);_a=_a.$aB()};_d=nil;}else{while((_b=_a.$V(nil,self.$aW),_b!==false&&_b!==nil)){_c(_a);_a=_a.$aB()};_d=nil;};return _d}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==76))return _e.a$a;throw(_e)}},$aT: function(){var self,_a;_a=nil;self=this;if(self.$aW===undefined)self.$aW=nil;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self.$aW;return _a},$2: function(){var self,_a;_a=nil;self=this;if(self.$aV===undefined)self.$aV=nil;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self.$aV;return _a},$aR: function(_d,_a){var self,_b,_c;_c=nil;self=this;if(self.$aV===undefined)self.$aV=nil;if(self.$aW===undefined)self.$aW=nil;if(self.$aX===undefined)self.$aX=nil;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;if((_b=_a.$X(nil,self.$aV),_b!==false&&_b!==nil)){return false};if((_b=self.$aX,_b!==false&&_b!==nil)){_c=_a.$X(nil,self.$aW)}else{_c=_a.$V(nil,self.$aW)};return _c}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==75))return _e.a$a;throw(_e)}},$c: function(_f,_a,_b,_c){var self,_d,_e;_e=nil;self=this;try{if(arguments.length<3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));if(arguments.length>4)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 3)'));if(_c===undefined)_c=false;;(_d=[_a,_b],self.$aV=_d[0]===undefined?nil:_d[0],self.$aW=_d[1]===undefined?nil:_d[1],_d);_e=self.$aX=((_d=_c,_d!==false&&_d!==nil)?true:false);return _e}catch(_g){if(_g instanceof a$c && (!_g.a$b || _g.a$b==74))return _g.a$a;throw(_g)}},$f: function(_d,_a){var self,_b,_c;_c=nil;self=this;if(self.$aV===undefined)self.$aV=nil;if(self.$aW===undefined)self.$aW=nil;if(self.$aX===undefined)self.$aX=nil;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;if((_b=_a.$X(nil,self.$aV),_b!==false&&_b!==nil)){return false};if((_b=self.$aX,_b!==false&&_b!==nil)){_c=_a.$X(nil,self.$aW)}else{_c=_a.$V(nil,self.$aW)};return _c}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==77))return _e.a$a;throw(_e)}},$H: function(){var self,_a,_b,_c;_a=_c=nil;self=this;if(self.$aV===undefined)self.$aV=nil;if(self.$aW===undefined)self.$aW=nil;if(self.$aX===undefined)self.$aX=nil;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=[];if((_b=self.$aV.$8(nil,self.$aW),_b!==false&&_b!==nil)){return _a};_c=self.$aV;if((_b=self.$aX,_b!==false&&_b!==nil)){while((_b=_c.$X(nil,self.$aW),_b!==false&&_b!==nil)){_a.$D(nil,_c);_c=_c.$aB()}}else{while((_b=_c.$V(nil,self.$aW),_b!==false&&_b!==nil)){_a.$D(nil,_c);_c=_c.$aB()}};return _a},$i: function(){var self,_b,_a;_a=nil;self=this;if(self.$aV===undefined)self.$aV=nil;if(self.$aW===undefined)self.$aW=nil;if(self.$aX===undefined)self.$aX=nil;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;if((_b=self.$aX,_b!==false&&_b!==nil)){_a=("" + (self.$aV.$i()).$o() + ("...").$o() + (self.$aW.$i()).$o())}else{_a=("" + (self.$aV.$i()).$o() + ("..").$o() + (self.$aW.$i()).$o())};return _a},$aY: function(_d,_a){var self,_b,_c;_c=nil;self=this;if(self.$aV===undefined)self.$aV=nil;if(self.$aW===undefined)self.$aW=nil;if(self.$aX===undefined)self.$aX=nil;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;if((_b=_a.$X(nil,self.$aV),_b!==false&&_b!==nil)){return false};if((_b=self.$aX,_b!==false&&_b!==nil)){_c=_a.$X(nil,self.$aW)}else{_c=_a.$V(nil,self.$aW)};return _c}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==78))return _e.a$a;throw(_e)}}}});$ab = a$d({a$j: [],a$e: nil,a$c: "T_TestSimpleOutput"});$5 = a$d({a$j: [],a$e: $j,a$f: {$al: function(){var self,_a,_b,_c,_d,_e,_f;_a=_b=_c=_d=_e=_f=nil;self=this;if(self.$av===undefined)self.$av=nil;if(self.$aZ===undefined)self.$aZ=nil;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;(_a=[1,2],_b=_a[0]===undefined?nil:_a[0],_c=_a[1]===undefined?nil:_a[1],_a);self.$t(nil,_b);self.$t(nil,_c);self.$u(nil,"--");(_a=[1,2,3],_b=_a[0]===undefined?nil:_a[0],_c=_a[1]===undefined?nil:_a[1],_a);self.$t(nil,_b);self.$t(nil,_c);self.$u(nil,"--");_d=5;(_a=[1,2],_b=_a[0]===undefined?nil:_a[0],_c=_a[1]===undefined?nil:_a[1],_d=_a[2]===undefined?nil:_a[2],_a);self.$t(nil,_b);self.$t(nil,_c);self.$t(nil,_d);self.$u(nil,"--");(_a=[1,2,3],self.$av=_a[0]===undefined?nil:_a[0],_c=_a[1]===undefined?nil:_a[1],self.$aZ=_a[2]===undefined?nil:_a[2],_a);self.$t(nil,self.$av);self.$t(nil,_c);self.$t(nil,self.$aZ);self.$u(nil,"--");self.$u(nil,"swap");(_a=[1,2],_b=_a[0]===undefined?nil:_a[0],_c=_a[1]===undefined?nil:_a[1],_a);self.$t(nil,_b);self.$t(nil,_c);(_a=[_c,_b],_b=_a[0]===undefined?nil:_a[0],_c=_a[1]===undefined?nil:_a[1],_a);self.$t(nil,_b);self.$t(nil,_c);self.$u(nil,"--");self.$u(nil,"splat1");(_a=[1,2],_b=_a[0]===undefined?nil:_a[0],_c=_a[1]===undefined?nil:_a[1],_d=_a[2]===undefined?nil:_a[2],_e=_a.slice(3),_a);self.$t(nil,_b);self.$t(nil,_c);self.$t(nil,_d);self.$t(nil,_e);self.$u(nil,"--");self.$u(nil,"splat2");(_a=[1,2],_b=_a[0]===undefined?nil:_a[0],_c=_a.slice(1),_a);self.$t(nil,_b);self.$t(nil,_c);self.$u(nil,"--");self.$u(nil,"splat3");(_a=[1,2,3,4,5],_b=_a[0]===undefined?nil:_a[0],_c=_a.slice(1),_a);self.$t(nil,_b);self.$t(nil,_c);self.$u(nil,"--");self.$u(nil,"splat with globals");self.$t(nil,(typeof($ac)=='undefined'?nil:$ac));self.$t(nil,(typeof($ad)=='undefined'?nil:$ad));(_a=[1,2],$ac=_a[0]===undefined?nil:_a[0],$ad=_a[1]===undefined?nil:_a[1],_a);self.$t(nil,(typeof($ac)=='undefined'?nil:$ac));self.$t(nil,(typeof($ad)=='undefined'?nil:$ad));_f=self.$u(nil,"--");return _f}},a$c: "T_TestMassign::TestMassign"});$B = a$d({a$j: [],a$e: $Y,a$c: "Fixnum",a$d: Number});$7 = a$d({a$j: [],a$e: $j,a$f: {$al: function(){var self,_a,_b;_a=_b=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self.$a();_a.$au(nil,0);self.$u(nil,"--");_a.$au(nil,1,2);self.$u(nil,"--");_a.$au(nil,1,2,9);self.$u(nil,"--");_a.$au(nil,1,2,9,5);self.$u(nil,"--");_a.$au(nil,1,2,9,5,6);self.$u(nil,"--");_b=_a.$au(nil,1,2,9,5,6,7,8,9,10,11,12);return _b}},a$c: "T_TestArgs::TestArgs",a$h: {$au: function(_g,_a,_b,_c){var self,_d,_e,_f;_f=nil;self=this;try{if(arguments.length<2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));if(_b===undefined)_b=1;if(_c===undefined)_c="hallo";_d=[];for(_e=4;_e<arguments.length;_e++)_d.push(arguments[_e]);;self.$t(nil,_a);self.$t(nil,_b);self.$t(nil,_c);_f=self.$t(nil,_d);return _f}catch(_h){if(_h instanceof a$c && (!_h.a$b || _h.a$b==79))return _h.a$a;throw(_h)}}}});$ae = a$d({a$j: [],a$e: $j,a$c: "Regexp",a$d: RegExp});$8 = a$d({a$j: [],a$e: $j,a$f: {$al: function(){var self,_a,_b,_c,_d;_a=_b=_c=_d=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=$u.$a(nil,"AA-BB","Leni");_b=$u.$a(nil,"AC-DC","Flocki");_c=$af.$a(nil,"AA-ZZ");_a.$ar();_c.$a0();_d=_c.$a1(nil,_a);return _d}},a$c: "T_TestLebewesen::TestLebewesen"});$6 = a$d({a$j: [],a$e: $j,a$f: {$al: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self.$a().$ah();return _a}},a$c: "T_TestIf::TestIf",a$h: {$ah: function(){var self,_a,_b,_c,_d,_e,_f;_f=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;if(true){self.$u(nil,"OK")};if(false){self.$u(nil,"NOT OK")};if(true){self.$u(nil,"OK")};if(false){self.$u(nil,"NOT OK")};if((_a=(_b=true, (_b!==false&&_b!==nil) ? ((_c=true, (_c!==false&&_c!==nil) ? ((_d=(_e=true, (_e!==false&&_e!==nil) ? _e : (false)), (_d!==false&&_d!==nil) ? (true) : _d)) : _c)) : _b),_a!==false&&_a!==nil)){self.$u(nil,"OK")};if((_a=(_b=(5).$X(nil,6), (_b!==false&&_b!==nil) ? ((6).$X(nil,7)) : _b),_a!==false&&_a!==nil)){self.$u(nil,"OK")};self.$t(nil,(_a=false, (_a!==false&&_a!==nil) ? _a : ("a")));self.$t(nil,(_a=nil, (_a!==false&&_a!==nil) ? _a : ("a")));self.$t(nil,(_a=true, (_a!==false&&_a!==nil) ? _a : ("a")));self.$t(nil,(_a="b", (_a!==false&&_a!==nil) ? _a : ("a")));self.$t(nil,(_a=false, (_a!==false&&_a!==nil) ? ("a") : _a));self.$t(nil,(_a=nil, (_a!==false&&_a!==nil) ? ("a") : _a));self.$t(nil,(_a=true, (_a!==false&&_a!==nil) ? ("a") : _a));_f=self.$t(nil,(_a="b", (_a!==false&&_a!==nil) ? ("a") : _a));return _f}}});$ag = a$d({a$j: [],a$e: nil,a$c: "T_TestHash"});a$d({a$j: [],a$g: $b});$ah = a$d({a$j: [],a$e: nil,a$c: "T_TestSend"});$ai = a$d({a$j: [],a$e: nil,a$c: "T_TestYield"});$aj = a$d({a$j: [],a$e: nil,a$c: "T_TestClass"});$af = a$d({a$j: [],a$e: $t,a$c: "T_TestLebewesen::Hund",a$h: {$a0: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self.$u(nil,"wau wau");return _a},$a1: function(_c,_a){var self,_b;_b=nil;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;_b=self.$u(nil,("ich jage ")+(_a.$e()));return _b}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==80))return _d.a$a;throw(_d)}}}});$A = a$d({a$j: [$k],a$e: $j,a$f: {$a: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;return []}},a$c: "Array",a$d: Array,a$h: {$R: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;return self.concat(_a)}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==83))return _c.a$a;throw(_c)}},$D: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;self.push(_a); return self}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==82))return _c.a$a;throw(_c)}},$aP: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;
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
      return del ? _a : nil}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==81))return _c.a$a;throw(_c)}},$S: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;return self.length},$L: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;var v = self[_a]; return ((v === undefined || v === null) ? nil : v)}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==85))return _c.a$a;throw(_c)}},$g: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;
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
      }catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==84))return _c.a$a;throw(_c)}},$a2: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;return self.concat().reverse()},$o: function(){var self,_d;_d=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_d=self.$G(function(_a){var _b;var _c=nil;_b=_a===undefined?nil:_a;_c=_b.$o();return _c}).$O();return _d},$M: function(_c,_a,_b){var self;self=this;try{if(arguments.length!=3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));;return (self[_a] = _b)}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==88))return _d.a$a;throw(_d)}},$v: function(_a){var self,_b;_b=nil;self=this;try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;for (var i=0; i < self.length; i++) {;_a(self[i]);};_b=self;return _b}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==87))return _c.a$a;throw(_c)}},$a3: function(_a){var self,_b;_b=nil;self=this;try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;for (var i=0; i < self.length; i++) {;_a([self[i],i]);};_b=self;return _b}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==86))return _c.a$a;throw(_c)}},$2: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;var v = self[0]; return ((v === undefined || v === null) ? nil : v)},$U: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;return self.length},$a4: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;return self.pop()},$k: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;return self.shift()},$l: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;return (self.length == 0)},$H: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self;return _a},$a6: function(){var self,_a,_b;self=this;_a=[];for(_b=1;_b<arguments.length;_b++)_a.push(arguments[_b]);;self.push.apply(self, _a); return self},$a5: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self;return _a},$a9: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;return self.concat()},$i: function(){var self,_a,_e;_a=_e=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a="[";_a=(_a)+(self.$G(function(_b){var _c;var _d=nil;_c=_b===undefined?nil:_b;_d=_c.$i();return _d}).$O(nil,", "));_a=(_a)+("]");_e=_a;return _e},$a8: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;self.reverse(); return self},$a7: function(){var self,_a,_b;self=this;_a=[];for(_b=1;_b<arguments.length;_b++)_a.push(arguments[_b]);;self.unshift.apply(self, _a); return self},$O: function(_i,_a){var self,_b,_d,_h;_b=_h=nil;self=this;try{if(arguments.length>2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));if(_a===undefined)_a="";;_b="";self.$a3(function(_c){var _e,_f;var _g=nil;(_d=a$j(_c),_e=_d[0]===undefined?nil:_d[0],_f=_d[1]===undefined?nil:_d[1],_d);_b=(_b)+(_e.$o());if((_d=_f.$7(nil,(self.$U())-(1)),_d===false||_d===nil)){_g=_b=(_b)+(_a)}else{_g=nil};return _g});_h=_b;return _h}catch(_j){if(_j instanceof a$c && (!_j.a$b || _j.a$b==89))return _j.a$a;throw(_j)}}}});      $b.a$e = $j;
var a$n = [$i,$j,$k,$l,$e,$m,$n,$o,$f,$p,$q,$g,$r,$s,$t,$u,$x,$y,$z,$D,$E,$F,$G,$H,$I,$J,$K,$a,$w,$L,$M,$N,$O,$c,$P,$Q,$R,$V,$v,$W,$T,$X,$Y,$Z,$U,$0,$1,$h,$2,$3,$9,$S,$4,$_,$$,$aa,$d,$C,$ab,$5,$B,$7,$ae,$8,$6,$ag,$b,$ah,$ai,$aj,$af,$A];
a$o(a$n);
for (var i=0; i<a$n.length; i++) a$p(a$n[i]);
function main() { return $9.$al.apply($9, arguments); }
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
