// declare nil
function NilClass() {}

// FIXME: remove
NilClass.prototype.toString = function() { return "nil"; };
nil = new NilClass();

//
// Generates a new method_missing function
// for the given symbol +sym+.
// 
var a$n = {}; 
function a$o(sym)
{
  if (!a$n[sym])
  {
    var fn = function() {
      return a$p(this, arguments, sym);
    };
    fn.a$i = true;
    a$n[sym] = fn;
  }

  return a$n[sym];
}

function a$p(obj, args, sym)
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
function a$q(x) { throw(x); }

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
function a$r(o, m, i, a) 
{
  var r = o[m]; // method in current class
  var c = o.a$g.a$e;
  while (r === c.a$d.prototype[m])
    c = c.a$e;
  return c.a$d.prototype[m].apply(o, [i].concat(a));
}

function a$s(o, m, a) 
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

function a$l(c)
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
function a$m(c)
{
  var i;

  for (i in a$h)  
  {
    if (c.a$d.prototype[i]===undefined)
    {
      c.a$d.prototype[i] = a$o(i);
    }
  }

  if (c.a$e != nil)
  {
    for (i in c.a$e)
    {
      if (c[i]===undefined)
      {
        c[i] = a$o(i);
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
var a$h = {"$a5":"createTFoot","$Y":"sub","$R":"end","$v":"each","$x":"loop","$C":"to_f","$aP":"setImgSrc","$ad":"%","$bB":"collect","$V":"member?","$ag":"&","$bM":"new_from_key_value_list","$f":"===","$G":"==","$bO":"reverse","$bE":"map","$aa":"downto","$D":"to_i","$aX":"getAbsoluteLeft","$af":"times","$O":"include?","$t":"p","$bI":"keys","$bF":"reject","$bo":"createTHead","$bl":"getCapture","$a7":"getAttribute","$aZ":"setOptionText","$s":"proc","$b":"allocate","$aO":"getEventsSunk","$an":"setInnerHTML","$bn":"createTable","$0":"size","$al":"*","$aq":"getNextSibling","$bN":"delete","$bk":"getChild","$Z":"+","$ap":"getStyleAttribute","$bU":"unshift","$bK":"values","$bz":"getParent","$bp":"getChildCount","$aQ":"createTBody","$$":"upto","$bW":"dup","$bq":"getPropertyBoolean","$1":"rjust","$2":"-","$aE":"getImgSrc","$ao":"getElementById","$q":"nil?","$aV":"createDiv","$aR":"scrollIntoView","$a":"new","$at":"compare","$bT":"push","$bC":"call","$by":"changeToStaticPositioning","$a6":"createInputCheck","$aY":"insertBefore","$ac":"/","$W":"message","$y":"is_a?","$bH":"main","$a1":"getInnerHTML","$6":"split","$aU":"windowGetClientHeight","$aW":"getFirstChild","$a_":"createLabel","$e":"name","$l":"empty?","$bx":"setElementPropertyBoolean","$F":"to_splat","$j":"raise","$3":"length","$aK":"sinkEvents","$o":"to_s","$bP":"clear","$bA":"getAbsoluteTop","$ab":">=","$aI":"getProperty","$bw":"createSelect","$bt":"getStyleAttributeBoolean","$ae":"|","$aJ":"windowGetClientWidth","$h":"kind_of?","$ar":"releaseCapture","$bD":"find_all","$bs":"removeAttribute","$bc":"getChildIndex","$a8":"createForm","$a4":"createTextArea","$aL":"createCaption","$bh":"setInnerText","$ah":"~","$ay":"createInputText","$4":"[]","$a3":"createInputPassword","$7":"strip","$aF":"setAbsolutePixelPosition","$bJ":"[]=","$aj":"-@","$aT":"createFieldSet","$aM":"getPropertyInt","$T":"succ","$au":"toString","$bV":"reverse!","$bd":"createCol","$a$":"isVisible","$a2":"createTD","$B":"hash","$z":"class","$i":"inspect","$aG":"setStyleAttribute","$ai":"^","$aA":"getStyleAttributeInt","$am":"setProperty","$ax":"createElement","$aS":"createLegend","$bR":"pop","$p":"__send","$g":"eql?","$P":"<","$aC":"getInnerText","$bb":"createTH","$I":"first","$N":"begin","$bm":"isOrHasChild","$be":"createIFrame","$U":"<<","$5":"ljust","$d":"__invoke","$S":">","$Q":"<=","$az":"createInput","$c":"initialize","$w":"send","$av":"setVisible","$r":"respond_to?","$bg":"replace","$k":"shift","$aN":"setAttribute","$a0":"removeChild","$M":"exclude_end?","$ak":"+@","$aw":"createColGroup","$bG":"select","$br":"createSpan","$bf":"createOptions","$aD":"setCapture","$E":"to_a","$bi":"createAnchor","$n":"method_missing","$8":"index","$aB":"createInputRadio","$bQ":"each_with_index","$bL":"join","$bv":"appendChild","$ba":"setEventListener","$A":"tap","$bu":"insertChild","$a9":"createButton","$K":"last","$m":"instance_of?","$aH":"createTR","$bS":"to_ary","$bj":"createImg","$9":"gsub","$u":"puts","$_":"match"};
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
          [_d].concat([a$h[_a]]).concat(_b));}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==7))return _e.a$a;throw(_e)}},$x: function(_a){var self,_b;_b=nil;self=this;try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;while(true){_a()};_b=nil;;return _b}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==10))return _c.a$a;throw(_c)}},$u: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;_a=_a.$o();alert(_a); return nil}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==9))return _c.a$a;throw(_c)}},$w: function(_d,_a){var self,_b,_c,_e;self=this;_e=_d===undefined?nil:_d;try{if(arguments.length<2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));_b=[];for(_c=2;_c<arguments.length;_c++)_b.push(arguments[_c]);;
      var m = self[a$f[_a]];
      if (m) 
        return m.apply(self, [_e].concat(_b));
      else
        return self.$n.apply(self, [_e].concat([_a]).concat(_b));}catch(_f){if(_f instanceof a$c && (!_f.a$b || _f.a$b==8))return _f.a$a;throw(_f)}}}});$j = a$d({a$j: [$i],a$e: nil,a$c: "Object",a$h: {$h: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;return a$i(self, _a)}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==11))return _c.a$a;throw(_c)}},$y: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;return a$i(self, _a)}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==12))return _c.a$a;throw(_c)}},$z: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;return self.a$g},$g: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;return (self.constructor == _a.constructor && self == _a)}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==13))return _c.a$a;throw(_c)}},$B: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;return self.toString()},$A: function(_a){var self,_b;_b=nil;self=this;try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a(self);_b=self;return _b}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==14))return _c.a$a;throw(_c)}},$o: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;return self.toString()},$c: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=nil;return _a},$f: function(_d,_a){var self,_b,_c;_c=nil;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;_c=(_b=self.$g(nil,_a), (_b!==false&&_b!==nil) ? _b : (self.$h(nil,_a)));return _c}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==15))return _e.a$a;throw(_e)}},$m: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;return (self.a$g === _a)}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==16))return _c.a$a;throw(_c)}},$i: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;return self.toString()}}});$k = a$d({a$j: [],a$e: $j,a$c: "NilClass",a$d: NilClass,a$h: {$C: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=0.0;return _a},$q: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=true;return _a},$o: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a="";return _a},$D: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=0;return _a},$E: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=[];return _a},$F: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=[];return _a},$i: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a="nil";return _a}}});$l = a$d({a$j: [],a$e: $j,a$c: "Range",a$h: {$G: function(_e,_a){var self,_b,_c,_d;_d=nil;self=this;if(self.$H===undefined)self.$H=nil;if(self.$J===undefined)self.$J=nil;if(self.$L===undefined)self.$L=nil;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;if (self.constructor != _a.constructor) return false;;_d=(_b=self.$H.$G(nil,_a.$I()), (_b!==false&&_b!==nil) ? ((_c=self.$J.$G(nil,_a.$K()), (_c!==false&&_c!==nil) ? (self.$L.$G(nil,_a.$M())) : _c)) : _b);return _d}catch(_f){if(_f instanceof a$c && (!_f.a$b || _f.a$b==17))return _f.a$a;throw(_f)}},$N: function(){var self,_a;_a=nil;self=this;if(self.$H===undefined)self.$H=nil;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self.$H;return _a},$g: function(_e,_a){var self,_b,_c,_d;_d=nil;self=this;if(self.$H===undefined)self.$H=nil;if(self.$J===undefined)self.$J=nil;if(self.$L===undefined)self.$L=nil;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;if (self.constructor != _a.constructor) return false;;_d=(_b=self.$H.$g(nil,_a.$I()), (_b!==false&&_b!==nil) ? ((_c=self.$J.$g(nil,_a.$K()), (_c!==false&&_c!==nil) ? (self.$L.$G(nil,_a.$M())) : _c)) : _b);return _d}catch(_f){if(_f instanceof a$c && (!_f.a$b || _f.a$b==18))return _f.a$a;throw(_f)}},$M: function(){var self,_a;_a=nil;self=this;if(self.$L===undefined)self.$L=nil;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self.$L;return _a},$K: function(){var self,_a;_a=nil;self=this;if(self.$J===undefined)self.$J=nil;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self.$J;return _a},$o: function(){var self,_b,_a;_a=nil;self=this;if(self.$H===undefined)self.$H=nil;if(self.$J===undefined)self.$J=nil;if(self.$L===undefined)self.$L=nil;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;if((_b=self.$L,_b!==false&&_b!==nil)){_a=("" + (self.$H).$o() + ("...").$o() + (self.$J).$o())}else{_a=("" + (self.$H).$o() + ("..").$o() + (self.$J).$o())};return _a},$v: function(_c){var self,_a,_b,_d;_a=_d=nil;self=this;if(self.$H===undefined)self.$H=nil;if(self.$J===undefined)self.$J=nil;if(self.$L===undefined)self.$L=nil;try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self.$H;if((_b=self.$H.$S(nil,self.$J),_b!==false&&_b!==nil)){return nil};if((_b=self.$L,_b!==false&&_b!==nil)){while((_b=_a.$P(nil,self.$J),_b!==false&&_b!==nil)){_c(_a);_a=_a.$T()};_d=nil;}else{while((_b=_a.$Q(nil,self.$J),_b!==false&&_b!==nil)){_c(_a);_a=_a.$T()};_d=nil;};return _d}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==21))return _e.a$a;throw(_e)}},$R: function(){var self,_a;_a=nil;self=this;if(self.$J===undefined)self.$J=nil;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self.$J;return _a},$I: function(){var self,_a;_a=nil;self=this;if(self.$H===undefined)self.$H=nil;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self.$H;return _a},$O: function(_d,_a){var self,_b,_c;_c=nil;self=this;if(self.$H===undefined)self.$H=nil;if(self.$J===undefined)self.$J=nil;if(self.$L===undefined)self.$L=nil;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;if((_b=_a.$P(nil,self.$H),_b!==false&&_b!==nil)){return false};if((_b=self.$L,_b!==false&&_b!==nil)){_c=_a.$P(nil,self.$J)}else{_c=_a.$Q(nil,self.$J)};return _c}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==20))return _e.a$a;throw(_e)}},$c: function(_f,_a,_b,_c){var self,_d,_e;_e=nil;self=this;try{if(arguments.length<3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));if(arguments.length>4)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 3)'));if(_c===undefined)_c=false;;(_d=[_a,_b],self.$H=_d[0]===undefined?nil:_d[0],self.$J=_d[1]===undefined?nil:_d[1],_d);_e=self.$L=((_d=_c,_d!==false&&_d!==nil)?true:false);return _e}catch(_g){if(_g instanceof a$c && (!_g.a$b || _g.a$b==19))return _g.a$a;throw(_g)}},$f: function(_d,_a){var self,_b,_c;_c=nil;self=this;if(self.$H===undefined)self.$H=nil;if(self.$J===undefined)self.$J=nil;if(self.$L===undefined)self.$L=nil;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;if((_b=_a.$P(nil,self.$H),_b!==false&&_b!==nil)){return false};if((_b=self.$L,_b!==false&&_b!==nil)){_c=_a.$P(nil,self.$J)}else{_c=_a.$Q(nil,self.$J)};return _c}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==22))return _e.a$a;throw(_e)}},$E: function(){var self,_a,_b,_c;_a=_c=nil;self=this;if(self.$H===undefined)self.$H=nil;if(self.$J===undefined)self.$J=nil;if(self.$L===undefined)self.$L=nil;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=[];if((_b=self.$H.$S(nil,self.$J),_b!==false&&_b!==nil)){return _a};_c=self.$H;if((_b=self.$L,_b!==false&&_b!==nil)){while((_b=_c.$P(nil,self.$J),_b!==false&&_b!==nil)){_a.$U(nil,_c);_c=_c.$T()}}else{while((_b=_c.$Q(nil,self.$J),_b!==false&&_b!==nil)){_a.$U(nil,_c);_c=_c.$T()}};return _a},$i: function(){var self,_b,_a;_a=nil;self=this;if(self.$H===undefined)self.$H=nil;if(self.$J===undefined)self.$J=nil;if(self.$L===undefined)self.$L=nil;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;if((_b=self.$L,_b!==false&&_b!==nil)){_a=("" + (self.$H.$i()).$o() + ("...").$o() + (self.$J.$i()).$o())}else{_a=("" + (self.$H.$i()).$o() + ("..").$o() + (self.$J.$i()).$o())};return _a},$V: function(_d,_a){var self,_b,_c;_c=nil;self=this;if(self.$H===undefined)self.$H=nil;if(self.$J===undefined)self.$J=nil;if(self.$L===undefined)self.$L=nil;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;if((_b=_a.$P(nil,self.$H),_b!==false&&_b!==nil)){return false};if((_b=self.$L,_b!==false&&_b!==nil)){_c=_a.$P(nil,self.$J)}else{_c=_a.$Q(nil,self.$J)};return _c}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==23))return _e.a$a;throw(_e)}}}});$f = a$d({a$j: [],a$e: $j,a$c: "Exception",a$h: {$W: function(){var self,_a;_a=nil;self=this;if(self.$X===undefined)self.$X=nil;_a=self.$X;return _a},$o: function(){var self,_a;_a=nil;self=this;if(self.$X===undefined)self.$X=nil;_a=self.$X;return _a},$c: function(_d,_a){var self,_c,_b;_b=nil;self=this;try{if(arguments.length>2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));if(_a===undefined)_a=nil;;if((_c=_a.$q(),_c!==false&&_c!==nil)){_b=self.$X=self.$z().$e()}else{_b=self.$X=_a};return _b}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==24))return _e.a$a;throw(_e)}},$i: function(){var self,_a;_a=nil;self=this;if(self.$X===undefined)self.$X=nil;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=("#<" + (self.$z().$e()).$o() + (": ").$o() + (self.$X).$o() + (">").$o());return _a}}});$m = a$d({a$j: [],a$e: $f,a$c: "StandardError"});$n = a$d({a$j: [],a$e: $m,a$c: "NameError"});$o = a$d({a$j: [],a$e: $j,a$c: "Regexp",a$d: RegExp});$p = a$d({a$j: [],a$e: $j,a$c: "Boolean",a$d: Boolean,a$h: {$G: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;return (self == _a)}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==25))return _c.a$a;throw(_c)}},$o: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;return (self == true ? 'true' : 'false')},$i: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;return (self == true ? 'true' : 'false')}}});$e = a$d({a$j: [],a$e: $j,a$c: "String",a$d: String,a$h: {$Z: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;return(self + _a)}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==27))return _c.a$a;throw(_c)}},$Y: function(_c,_a,_b){var self;self=this;try{if(arguments.length!=3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));;self.replace(pattern, replacement)}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==26))return _d.a$a;throw(_d)}},$1: function(_f,_a,_b){var self,_c,_d,_e;_d=_e=nil;self=this;try{if(arguments.length<2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));if(arguments.length>3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));if(_b===undefined)_b=" ";;if((_c=_b.$l(),_c!==false&&_c!==nil)){self.$j(nil,$a,"zero width padding")};_d=_a.$2(nil,self.$3());if((_c=_d.$Q(nil,0),_c!==false&&_c!==nil)){return self};_e="";while(_e.length < _d) _e += _b;;return _e.$4(nil,0,_d).$Z(nil,self)}catch(_g){if(_g instanceof a$c && (!_g.a$b || _g.a$b==28))return _g.a$a;throw(_g)}},$0: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;return self.length},$4: function(_d,_a,_b){var self,_c;self=this;try{if(arguments.length<2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));if(arguments.length>3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));if(_b===undefined)_b=nil;;if((_c=_b.$q(),_c!==false&&_c!==nil)){return self.charAt(_a) || nil}else{if((_c=_b.$P(nil,0),_c!==false&&_c!==nil)){return nil};return self.substring(_a, _a+_b)}}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==30))return _e.a$a;throw(_e)}},$5: function(_f,_a,_b){var self,_c,_d,_e;_d=_e=nil;self=this;try{if(arguments.length<2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));if(arguments.length>3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));if(_b===undefined)_b=" ";;if((_c=_b.$l(),_c!==false&&_c!==nil)){self.$j(nil,$a,"zero width padding")};_d=_a.$2(nil,self.$3());if((_c=_d.$Q(nil,0),_c!==false&&_c!==nil)){return self};_e="";while(_e.length < _d) _e += _b;;return self.$Z(nil,_e.$4(nil,0,_d))}catch(_g){if(_g instanceof a$c && (!_g.a$b || _g.a$b==29))return _g.a$a;throw(_g)}},$6: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;return self.split(_a)}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==31))return _c.a$a;throw(_c)}},$o: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self;return _a},$3: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;return self.length},$7: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;return self.replace(/^\s+/, '').replace(/\s+$/, '')},$l: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;return(self === "")},$9: function(_g,_a,_b){var self,_c,_d,_e,_f;_d=_e=_f=nil;self=this;try{if(arguments.length<2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));if(arguments.length>3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));if(_b===undefined)_b=nil;;(_c=["",self,nil],_d=_c[0]===undefined?nil:_c[0],_e=_c[1]===undefined?nil:_c[1],_f=_c[2]===undefined?nil:_c[2],_c);while(_e.length > 0) {
        if (_f = _e.match(_a)) {
          _d += _e.slice(0, _f.index);;if((_c=_b,_c!==false&&_c!==nil)){_d=_d.$Z(nil,_b)}else{_d=_d.$Z(nil,_g(_f.$I()).$o())};_e = _e.slice(_f.index + _f[0].length);
        } else {
          _d += _e; _e = '';
        }
      } return _d}catch(_h){if(_h instanceof a$c && (!_h.a$b || _h.a$b==33))return _h.a$a;throw(_h)}},$8: function(_c,_a,_b){var self;self=this;try{if(arguments.length<2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));if(arguments.length>3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));if(_b===undefined)_b=0;;
      var i = self.indexOf(_a, _b);
      return (i == -1) ? nil : i}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==32))return _d.a$a;throw(_d)}},$i: function(){var self,_a,_b;_a=_b=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a={
        '\b': '\\b',
        '\t': '\\t',
        '\n': '\\n',
        '\f': '\\f',
        '\r': '\\r',
        '\\': '\\\\'
      };;_b=self.$9(function(_c){var _d,_e;_d=_c===undefined?nil:_c;_e=_a[_d];return _e ? _e : 
          '\\u00' + ("0" + _d.charCodeAt().toString(16)).substring(0,2);},/[\x00-\x1f\\]/);return ('"' + _b.replace(/"/g, '\\"') + '"');},$_: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;
      var i = self.match(_a);
      return (i === null) ? nil : i}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==34))return _c.a$a;throw(_c)}}}});$q = a$d({a$j: [],a$e: $j,a$c: "Number",a$d: Number,a$h: {$Z: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;return self + _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==38))return _c.a$a;throw(_c)}},$G: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;return self == _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==37))return _c.a$a;throw(_c)}},$aa: function(_d,_a){var self,_b,_c;_b=nil;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;_b=self;while((_c=_b.$ab(nil,_a),_c!==false&&_c!==nil)){_d(_b);_b=_b.$2(nil,1)};return self}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==36))return _e.a$a;throw(_e)}},$$: function(_d,_a){var self,_b,_c;_b=nil;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;_b=self;while((_c=_b.$Q(nil,_a),_c!==false&&_c!==nil)){_d(_b);_b=_b.$Z(nil,1)};return self}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==35))return _e.a$a;throw(_e)}},$Q: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;return self <= _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==39))return _c.a$a;throw(_c)}},$2: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;return self - _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==40))return _c.a$a;throw(_c)}},$T: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;return self+1},$ac: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;return self / _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==42))return _c.a$a;throw(_c)}},$o: function(_b,_a){var self;self=this;try{if(arguments.length>2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));if(_a===undefined)_a=10;;return self.toString(_a)}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==41))return _c.a$a;throw(_c)}},$ad: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;return self % _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==43))return _c.a$a;throw(_c)}},$ag: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;return self & _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==47))return _c.a$a;throw(_c)}},$P: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;return self < _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==46))return _c.a$a;throw(_c)}},$af: function(_c){var self,_a,_b;_a=nil;self=this;try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=0;while((_b=_a.$P(nil,self),_b!==false&&_b!==nil)){_c(_a);_a=_a.$Z(nil,1)};return self}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==45))return _d.a$a;throw(_d)}},$ae: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;return self | _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==44))return _c.a$a;throw(_c)}},$aj: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;return -self},$S: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;return self > _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==49))return _c.a$a;throw(_c)}},$ai: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;return self ^ _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==48))return _c.a$a;throw(_c)}},$ah: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;return ~self},$ab: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;return self >= _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==50))return _c.a$a;throw(_c)}},$i: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;return self.toString()},$al: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;return self * _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==51))return _c.a$a;throw(_c)}},$ak: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;return self}}});$r = a$d({a$j: [],a$e: $q,a$c: "Fixnum",a$d: Number});$s = a$d({a$j: [],a$e: $q,a$c: "Float",a$d: Number});$t = a$d({a$j: [],a$e: $m,a$c: "LocalJumpError"});$u = a$d({a$j: [],a$e: $j,a$f: {$an: function(_d,_a,_b){var self,_c;self=this;try{if(arguments.length!=3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));;_b=(_c=_b, (_c!==false&&_c!==nil) ? _c : (""));_a.innerHTML = _b; return nil}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==53))return _e.a$a;throw(_e)}},$ao: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;return document.getElementById(_a) || nil}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==54))return _c.a$a;throw(_c)}},$am: function(_d,_a,_b,_c){var self;self=this;try{if(arguments.length!=4)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 3)'));;_a[_b] = _c; return nil}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==52))return _e.a$a;throw(_e)}},$ap: function(_c,_a,_b){var self;self=this;try{if(arguments.length!=3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));;
    var ret = _a.style[_b];
    return (ret == null) ? nil : ret}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==55))return _d.a$a;throw(_d)}},$aq: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;
    var sib = _a.nextSibling;
    while (sib && sib.nodeType != 1)
      sib = sib.nextSibling;
    return sib || nil}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==56))return _c.a$a;throw(_c)}},$ar: function(_d,_a){var self,_b,_c;self=this;if(self.$as===undefined)self.$as=nil;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;if((_b=(_c=self.$as, (_c!==false&&_c!==nil) ? (self.$at(nil,_a,self.$as)) : _c),_b!==false&&_b!==nil)){self.$as=nil};if (_a == window.a$k) window.a$k = null;;return nil}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==57))return _e.a$a;throw(_e)}},$av: function(_d,_a,_b){var self,_c;self=this;try{if(arguments.length<2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));if(arguments.length>3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));if(_b===undefined)_b=true;;if((_c=_b,_c!==false&&_c!==nil)){_a.style.display = ''}else{_a.style.display = 'none'};return nil}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==59))return _e.a$a;throw(_e)}},$at: function(_c,_a,_b){var self;self=this;try{if(arguments.length!=3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));;return (_a == _b)}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==60))return _d.a$a;throw(_d)}},$aw: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self.$ax(nil,"colgroup");return _a},$ay: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self.$az(nil,"text");return _a},$aA: function(_c,_a,_b){var self;self=this;try{if(arguments.length!=3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));;
    var i = parseInt(_a.style[_b]);
    return ((!i) ? 0 : i)}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==61))return _d.a$a;throw(_d)}},$aB: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;
    var e = document.createElement("INPUT");
    e.type = 'radio';
    e.name = _a;
    return e}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==62))return _c.a$a;throw(_c)}},$aC: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;
    // To mimic IEs +innerText+ property in the W3C DOM, we need to recursively
    // concatenate all child text nodes (depth first).
    var text = '', child = _a.firstChild;
    while (child) {
      // 1 == Element node
      if (child.nodeType == 1) {
        text += this.$aC(nil, child);
      } else if (child.nodeValue) {
        text += child.nodeValue;
      }
      child = child.nextSibling;
    }
    return text}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==63))return _c.a$a;throw(_c)}},$au: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;return _a.outerHTML}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==58))return _c.a$a;throw(_c)}},$aD: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;self.$as=_a;window.a$k = _a;;return nil}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==64))return _c.a$a;throw(_c)}},$aE: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;
    var ret = _a.src;
    return (ret == null) ? nil : ret}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==65))return _c.a$a;throw(_c)}},$aF: function(_e,_a,_b,_c){var self,_d;_d=nil;self=this;try{if(arguments.length!=4)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 3)'));;self.$aG(nil,_a,"position","absolute");self.$aG(nil,_a,"left",_b.$Z(nil,"px"));_d=self.$aG(nil,_a,"top",_c.$Z(nil,"px"));return _d}catch(_f){if(_f instanceof a$c && (!_f.a$b || _f.a$b==66))return _f.a$a;throw(_f)}},$aH: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self.$ax(nil,"tr");return _a},$aI: function(_c,_a,_b){var self;self=this;try{if(arguments.length!=3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));;
    var ret = _a[_b];
    return (ret == null) ? nil : String(ret)}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==67))return _d.a$a;throw(_d)}},$aL: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self.$ax(nil,"caption");return _a},$aM: function(_c,_a,_b){var self;self=this;try{if(arguments.length!=3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));;
    var i = parseInt(_a[_b]);
    return ((!i) ? 0 : i)}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==69))return _d.a$a;throw(_d)}},$aK: function(_c,_a,_b){var self;self=this;try{if(arguments.length!=3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));;
    _a.a$l = _b;

    _a.onclick       = (_b & 0x00001) ? window.a$m : null;
    _a.ondblclick    = (_b & 0x00002) ? window.a$m : null;
    _a.onmousedown   = (_b & 0x00004) ? window.a$m : null;
    _a.onmouseup     = (_b & 0x00008) ? window.a$m : null;
    _a.onmouseover   = (_b & 0x00010) ? window.a$m : null;
    _a.onmouseout    = (_b & 0x00020) ? window.a$m : null;
    _a.onmousemove   = (_b & 0x00040) ? window.a$m : null;
    _a.onkeydown     = (_b & 0x00080) ? window.a$m : null;
    _a.onkeypress    = (_b & 0x00100) ? window.a$m : null;
    _a.onkeyup       = (_b & 0x00200) ? window.a$m : null;
    _a.onchange      = (_b & 0x00400) ? window.a$m : null;
    _a.onfocus       = (_b & 0x00800) ? window.a$m : null;
    _a.onblur        = (_b & 0x01000) ? window.a$m : null;
    _a.onlosecapture = (_b & 0x02000) ? window.a$m : null;
    _a.onscroll      = (_b & 0x04000) ? window.a$m : null;
    _a.onload        = (_b & 0x08000) ? window.a$m : null;
    _a.onerror       = (_b & 0x10000) ? window.a$m : null;
    _a.onmousewheel  = (_b & 0x20000) ? window.a$m : null;
    
    return nil}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==68))return _d.a$a;throw(_d)}},$aN: function(_d,_a,_b,_c){var self;self=this;try{if(arguments.length!=4)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 3)'));;_a.setAttribute(_b, _c); return nil}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==70))return _e.a$a;throw(_e)}},$aJ: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;return document.body.clientWidth},$aO: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;return _a.a$l || 0}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==71))return _c.a$a;throw(_c)}},$aQ: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self.$ax(nil,"tbody");return _a},$aP: function(_c,_a,_b){var self;self=this;try{if(arguments.length!=3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));;_a.src = _b; return nil}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==72))return _d.a$a;throw(_d)}},$az: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;
    var e = document.createElement("INPUT");
    e.type = _a;
    return e}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==73))return _c.a$a;throw(_c)}},$aR: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;
    var left = _a.offsetLeft, top = _a.offsetTop;
    var width = _a.offsetWidth, height = _a.offsetHeight;

    if (_a.parentNode != _a.offsetParent) {
      left -= _a.parentNode.offsetLeft;
      top -= _a.parentNode.offsetTop;
    }

    var cur = _a.parentNode;
    while (cur && (cur.nodeType == 1)) {
      // body tags are implicitly scrollable
      if ((cur.style.overflow == 'auto') || (cur.style.overflow == 'scroll') ||
          (cur.tagName == 'BODY')) {
      
        if (left < cur.scrollLeft) {
          cur.scrollLeft = left;
        }
        if (left + width > cur.scrollLeft + cur.clientWidth) {
          cur.scrollLeft = (left + width) - cur.clientWidth;
        }
        if (top < cur.scrollTop) {
          cur.scrollTop = top;
        }
        if (top + height > cur.scrollTop + cur.clientHeight) {
          cur.scrollTop = (top + height) - cur.clientHeight;
        }
      }

      var offsetLeft = cur.offsetLeft, offsetTop = cur.offsetTop;
      if (cur.parentNode != cur.offsetParent) {
        offsetLeft -= cur.parentNode.offsetLeft;
        offsetTop -= cur.parentNode.offsetTop;
      }

      left += offsetLeft - cur.scrollLeft;
      top += offsetTop - cur.scrollTop;
      cur = cur.parentNode;
    }
    return nil}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==74))return _c.a$a;throw(_c)}},$aS: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self.$ax(nil,"legend");return _a},$aT: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self.$ax(nil,"fieldset");return _a},$ax: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;return document.createElement(_a)}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==75))return _c.a$a;throw(_c)}},$aV: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self.$ax(nil,"div");return _a},$aW: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;
    var child = _a.firstChild;
    while (child && child.nodeType != 1)
      child = child.nextSibling;
    return child || nil}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==76))return _c.a$a;throw(_c)}},$aU: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;return document.body.clientHeight},$aX: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;
    var left = 0;
    var curr = _a;
    // This intentionally excludes body which has a null offsetParent.    
    while (curr.offsetParent) {
      left -= curr.scrollLeft;
      curr = curr.parentNode;
    }
    while (_a) {
      left += _a.offsetLeft;
      _a = _a.offsetParent;
    }
    return left}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==77))return _c.a$a;throw(_c)}},$aY: function(_d,_a,_b,_c){var self;self=this;try{if(arguments.length!=4)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 3)'));;_a.insertBefore(_b, _c); return nil}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==78))return _e.a$a;throw(_e)}},$aZ: function(_d,_a,_b,_c){var self;self=this;try{if(arguments.length!=4)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 3)'));;var option = _a.options[_c];
    option.text = _b;
    return nil}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==79))return _e.a$a;throw(_e)}},$a0: function(_c,_a,_b){var self;self=this;try{if(arguments.length!=3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));;_a.removeChild(_b); return nil}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==80))return _d.a$a;throw(_d)}},$a1: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;
    var ret = _a.innerHTML;
    return (ret == null) ? nil : ret}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==81))return _c.a$a;throw(_c)}},$a2: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self.$ax(nil,"td");return _a},$a3: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self.$az(nil,"password");return _a},$a4: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self.$ax(nil,"textarea");return _a},$a5: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self.$ax(nil,"tfoot");return _a},$a6: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self.$az(nil,"checkbox");return _a},$a7: function(_c,_a,_b){var self;self=this;try{if(arguments.length!=3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));;
    var ret = _a.getAttribute(_b);
    return (ret == null) ? nil : ret}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==82))return _d.a$a;throw(_d)}},$a8: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self.$ax(nil,"form");return _a},$a9: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self.$ax(nil,"button");return _a},$a_: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self.$ax(nil,"label");return _a},$a$: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;return (_a.style.display != 'none')}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==83))return _c.a$a;throw(_c)}},$ba: function(_c,_a,_b){var self;self=this;try{if(arguments.length!=3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));;_a.a$n = (_b == nil) ? null : _b; return nil}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==84))return _d.a$a;throw(_d)}},$bb: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self.$ax(nil,"th");return _a},$bc: function(_c,_a,_b){var self;self=this;try{if(arguments.length!=3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));;
    var count = 0, child = _a.firstChild;
    while (child) {
      if (child == _b)
        return count;
      if (child.nodeType == 1)
        ++count;
      child = child.nextSibling;
    }

    return nil}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==85))return _d.a$a;throw(_d)}},$bd: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self.$ax(nil,"col");return _a},$be: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self.$ax(nil,"iframe");return _a},$bf: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self.$ax(nil,"options");return _a},$bg: function(_c,_a,_b){var self;self=this;try{if(arguments.length!=3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));;
    var p = _a.parentNode;
    if (!p) return;
    p.insertBefore(_b, _a);
    p.removeChild(_a);
    return nil}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==86))return _d.a$a;throw(_d)}},$bi: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self.$ax(nil,"A");return _a},$bh: function(_c,_a,_b){var self;self=this;try{if(arguments.length!=3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));;
    // Remove all children first.
    while (_a.firstChild) {
      _a.removeChild(_a.firstChild);
    }
    // Add a new text node.
    if (_b != nil) {
      _a.appendChild(document.createTextNode(_b));
    }
    return nil}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==87))return _d.a$a;throw(_d)}},$bj: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self.$ax(nil,"img");return _a},$aG: function(_d,_a,_b,_c){var self;self=this;try{if(arguments.length!=4)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 3)'));;_a.style[_b] = _c; return nil}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==88))return _e.a$a;throw(_e)}},$bk: function(_c,_a,_b){var self;self=this;try{if(arguments.length!=3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));;
    var count = 0, child = _a.firstChild;
    while (child) {
      var next = child.nextSibling;
      if (child.nodeType == 1) {
        if (_b == count)
          return child;
        ++count;
      }
      child = next;
    }

    return nil}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==89))return _d.a$a;throw(_d)}},$bl: function(){var self;self=this;if(self.$as===undefined)self.$as=nil;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;return self.$as},$bm: function(_c,_a,_b){var self;self=this;try{if(arguments.length!=3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));;
    while (_b) {
      if (_a == _b) {
        return true;
      }
      _b = _b.parentNode;
      if (_b && (_b.nodeType != 1)) {
        _b = null;
      }
    }
    return false}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==90))return _d.a$a;throw(_d)}},$bn: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self.$ax(nil,"table");return _a},$bo: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self.$ax(nil,"thead");return _a},$bq: function(_c,_a,_b){var self;self=this;try{if(arguments.length!=3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));;return !!_a[_b]}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==92))return _d.a$a;throw(_d)}},$bp: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;
    var count = 0, child = _a.firstChild;
    while (child) {
      if (child.nodeType == 1)
        ++count;
      child = child.nextSibling;
    }
    return count}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==91))return _c.a$a;throw(_c)}},$bt: function(_c,_a,_b){var self;self=this;try{if(arguments.length!=3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));;return !!_a.style[_b]}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==94))return _d.a$a;throw(_d)}},$bs: function(_c,_a,_b){var self;self=this;try{if(arguments.length!=3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));;_a.removeAttribute(_b); return nil}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==93))return _d.a$a;throw(_d)}},$br: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self.$ax(nil,"span");return _a},$bA: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;
    var top = 0;
    var curr = _a;
    // This intentionally excludes body which has a null offsetParent.    
    while (curr.offsetParent) {
      top -= curr.scrollTop;
      curr = curr.parentNode;
    }
    while (_a) {
      top += _a.offsetTop;
      _a = _a.offsetParent;
    }
    return top}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==100))return _c.a$a;throw(_c)}},$bz: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;
    var parent = _a.parentNode;
    if(parent == null) {
      return nil;
    }
    if (parent.nodeType != 1)
      parent = null;
    return parent || nil}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==99))return _c.a$a;throw(_c)}},$by: function(_c,_a){var self,_b;_b=nil;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;self.$aG(nil,_a,"left","");self.$aG(nil,_a,"top","");_b=self.$aG(nil,_a,"position","static");return _b}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==98))return _d.a$a;throw(_d)}},$bw: function(_d,_a){var self,_b,_c;_b=nil;self=this;try{if(arguments.length>2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));if(_a===undefined)_a=false;;_b=self.$ax(nil,"select");if((_c=_a,_c!==false&&_c!==nil)){self.$bx(nil,_b,"multiple",true)};return _b}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==97))return _e.a$a;throw(_e)}},$bv: function(_c,_a,_b){var self;self=this;try{if(arguments.length!=3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));;_a.appendChild(_b); return nil}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==96))return _d.a$a;throw(_d)}},$bu: function(_d,_a,_b,_c){var self;self=this;try{if(arguments.length!=4)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 3)'));;
    var count = 0, child = _a.firstChild, before = null;
    while (child) {
      if (child.nodeType == 1) {
        if (count == _c) {
          before = child;
          break;
        }
        ++count;
      }
      child = child.nextSibling;
    }

    _a.insertBefore(_b, before);
    return nil}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==95))return _e.a$a;throw(_e)}}},a$c: "DOM"});$v = a$d({a$j: [],a$e: nil,a$c: "Enumerable",a$h: {$bB: function(_a){var self,_b,_c,_f,_h;_c=_h=nil;self=this;_b=_a===undefined?nil:_a;try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_c=[];self.$v(function(_d){var _e;var _g=nil;_e=_d===undefined?nil:_d;_g=_c.$U(nil,((_f=_b,_f!==false&&_f!==nil)?_b.$bC(nil,_e):_e));return _g});_h=_c;return _h}catch(_i){if(_i instanceof a$c && (!_i.a$b || _i.a$b==101))return _i.a$a;throw(_i)}},$bD: function(_f){var self,_a,_e,_g;_a=_g=nil;self=this;try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=[];self.$v(function(_b){var _c;var _d=nil;_c=_b===undefined?nil:_b;if((_e=_f(_c),_e!==false&&_e!==nil)){_d=_a.$U(nil,_c)}else{_d=nil};return _d});_g=_a;return _g}catch(_h){if(_h instanceof a$c && (!_h.a$b || _h.a$b==102))return _h.a$a;throw(_h)}},$bE: function(_a){var self,_b,_c,_f,_h;_c=_h=nil;self=this;_b=_a===undefined?nil:_a;try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_c=[];self.$v(function(_d){var _e;var _g=nil;_e=_d===undefined?nil:_d;_g=_c.$U(nil,((_f=_b,_f!==false&&_f!==nil)?_b.$bC(nil,_e):_e));return _g});_h=_c;return _h}catch(_i){if(_i instanceof a$c && (!_i.a$b || _i.a$b==103))return _i.a$a;throw(_i)}},$E: function(){var self,_a,_e;_a=_e=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=[];self.$v(function(_b){var _c;var _d=nil;_c=_b===undefined?nil:_b;_d=_a.$U(nil,_c);return _d});_e=_a;return _e},$bF: function(_f){var self,_a,_e,_g;_a=_g=nil;self=this;try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=[];self.$v(function(_b){var _c;var _d=nil;_c=_b===undefined?nil:_b;if((_e=_f(_c),_e===false||_e===nil)){_d=_a.$U(nil,_c)}else{_d=nil};return _d});_g=_a;return _g}catch(_h){if(_h instanceof a$c && (!_h.a$b || _h.a$b==104))return _h.a$a;throw(_h)}},$bG: function(_f){var self,_a,_e,_g;_a=_g=nil;self=this;try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=[];self.$v(function(_b){var _c;var _d=nil;_c=_b===undefined?nil:_b;if((_e=_f(_c),_e!==false&&_e!==nil)){_d=_a.$U(nil,_c)}else{_d=nil};return _d});_g=_a;return _g}catch(_h){if(_h instanceof a$c && (!_h.a$b || _h.a$b==105))return _h.a$a;throw(_h)}}}});$a = a$d({a$j: [],a$e: $m,a$c: "ArgumentError"});$w = a$d({a$j: [],a$e: $j,a$f: {$bH: function(){var self,_a,_b;_a=_b=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=$u.$ao(nil,"out");_b=$u.$bh(nil,_a,"hello world");return _b}},a$c: "HelloWorld"});a$d({a$j: [],a$g: $b});$g = a$d({a$j: [],a$e: $n,a$c: "NoMethodError"});$x = a$d({a$j: [$v],a$e: $j,a$f: {$bM: function(){var self,_a,_b,_c;_c=nil;self=this;_a=[];for(_b=1;_b<arguments.length;_b++)_a.push(arguments[_b]);;_c=self.$b();
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

      _c.a$o = items; 
      _c.a$p = nil;
      return _c;
      }},a$c: "Hash",a$h: {$4: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;
      if (!self.a$o)
      {
        // this is a Javascript Object, not a RubyJS Hash object.
        // we directly look the key up. it's fast but not Ruby-like,
        // so be careful!
        
        var elem = self[_a];
        return (elem == null ? nil : elem);
      }

      var hashed_key = ":" + _a.$B();
      var bucket = self.a$o[hashed_key];

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
      return self.a$p;
      }catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==106))return _c.a$a;throw(_c)}},$bI: function(){var self,_b,_f;_b=_f=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_f=self.$bE(function(_a){var _c,_d;var _e=nil;(_b=a$j(_a),_c=_b[0]===undefined?nil:_b[0],_d=_b[1]===undefined?nil:_b[1],_b);_e=_c;return _e});return _f},$bJ: function(_c,_a,_b){var self;self=this;try{if(arguments.length!=3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));;
      if (!self.a$o)
      {
        // this is a Javascript Object, not a RubyJS Hash object.
        // we directly look the key up. it's fast but not Ruby-like,
        // so be careful!
        
        self[_a] = _b;
        return _b; 
      }

      var hashed_key = ":" + _a.$B();
      var bucket = self.a$o[hashed_key];

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
        self.a$o[hashed_key] = [_a, _b];
      }
      return _b;
      }catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==108))return _d.a$a;throw(_d)}},$v: function(_a){var self;self=this;try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;
      if (!self.a$o)
      {
        // this is a Javascript Object, not a RubyJS Hash object.
        // we directly look the key up. it's fast but not Ruby-like,
        // so be careful!
        var key, value;
        for (key in self)
        {
          value = self[key];;_a([(key == null ? nil : key),(value == null ? nil : value)]);
        }
        
        return nil;
      }

      var key, bucket, i;
      for (key in self.a$o)
      {
        if (key[0] == ":")
        {
          bucket = self.a$o[key];
          for (i=0; i<bucket.length; i+=2)
          {;_a([bucket[i],bucket[i+1]]);
          }
        }
      }
      return nil;
      }catch(_b){if(_b instanceof a$c && (!_b.a$b || _b.a$b==107))return _b.a$a;throw(_b)}},$c: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;
      self.a$o = {}; 
      self.a$p = nil;},$bK: function(){var self,_b,_f;_b=_f=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_f=self.$bE(function(_a){var _c,_d;var _e=nil;(_b=a$j(_a),_c=_b[0]===undefined?nil:_b[0],_d=_b[1]===undefined?nil:_b[1],_b);_e=_d;return _e});return _f},$i: function(){var self,_a,_c,_g;_a=_c=_g=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a="{";_a=_a.$Z(nil,self.$bE(function(_b){var _d,_e;var _f=nil;(_c=a$j(_b),_d=_c[0]===undefined?nil:_c[0],_e=_c[1]===undefined?nil:_c[1],_c);_f=_d.$i().$Z(nil," => ").$Z(nil,_e.$i());return _f}).$bL(nil,", "));_a=_a.$Z(nil,"}");_g=_a;return _g}}});$y = a$d({a$j: [],a$e: $q,a$c: "Bignum",a$d: Number});$z = a$d({a$j: [$v],a$e: $j,a$f: {$a: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;return []}},a$c: "Array",a$d: Array,a$h: {$Z: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;return self.concat(_a)}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==111))return _c.a$a;throw(_c)}},$U: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;self.push(_a); return self}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==110))return _c.a$a;throw(_c)}},$bN: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;
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
      return del ? _a : nil}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==109))return _c.a$a;throw(_c)}},$0: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;return self.length},$4: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;var v = self[_a]; return (v == null ? nil : v)}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==113))return _c.a$a;throw(_c)}},$bP: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;self.length=0; return self},$g: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;
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
      }catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==112))return _c.a$a;throw(_c)}},$bO: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;return self.concat().reverse()},$K: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;var v = self[self.length - 1]; return (v == null ? nil : v)},$o: function(){var self,_d;_d=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_d=self.$bE(function(_a){var _b;var _c=nil;_b=_a===undefined?nil:_a;_c=_b.$o();return _c}).$bL();return _d},$bJ: function(_c,_a,_b){var self;self=this;try{if(arguments.length!=3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));;return (self[_a] = _b)}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==116))return _d.a$a;throw(_d)}},$v: function(_a){var self;self=this;try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;
      var elem;
      for (var i=0; i < self.length; i++) {
        elem = self[i];;_a((elem == null ? nil : elem));}
      return self}catch(_b){if(_b instanceof a$c && (!_b.a$b || _b.a$b==115))return _b.a$a;throw(_b)}},$bQ: function(_a){var self;self=this;try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;  
      var elem;
      for (var i=0; i < self.length; i++) {
        elem = self[i];;_a([(elem == null ? nil : elem),i]);}
      return self}catch(_b){if(_b instanceof a$c && (!_b.a$b || _b.a$b==114))return _b.a$a;throw(_b)}},$I: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;var v = self[0]; return (v == null ? nil : v)},$3: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;return self.length},$bR: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;
      var elem = self.pop();
      return (elem == null ? nil : elem)},$k: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;
      var elem = self.shift();
      return (elem == null ? nil : elem)},$l: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;return (self.length == 0)},$E: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self;return _a},$bT: function(){var self,_a,_b;self=this;_a=[];for(_b=1;_b<arguments.length;_b++)_a.push(arguments[_b]);;self.push.apply(self, _a); return self},$bS: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self;return _a},$bW: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;return self.concat()},$i: function(){var self,_a,_e;_a=_e=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a="[";_a=_a.$Z(nil,self.$bE(function(_b){var _c;var _d=nil;_c=_b===undefined?nil:_b;_d=_c.$i();return _d}).$bL(nil,", "));_a=_a.$Z(nil,"]");_e=_a;return _e},$bV: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;self.reverse(); return self},$bU: function(){var self,_a,_b;self=this;_a=[];for(_b=1;_b<arguments.length;_b++)_a.push(arguments[_b]);;self.unshift.apply(self, _a); return self},$bL: function(_i,_a){var self,_b,_d,_h;_b=_h=nil;self=this;try{if(arguments.length>2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));if(_a===undefined)_a="";;_b="";self.$bQ(function(_c){var _e,_f;var _g=nil;(_d=a$j(_c),_e=_d[0]===undefined?nil:_d[0],_f=_d[1]===undefined?nil:_d[1],_d);_b=_b.$Z(nil,_e.$o());if((_d=_f.$G(nil,self.$3().$2(nil,1)),_d===false||_d===nil)){_g=_b=_b.$Z(nil,_a)}else{_g=nil};return _g});_h=_b;return _h}catch(_j){if(_j instanceof a$c && (!_j.a$b || _j.a$b==117))return _j.a$a;throw(_j)}}}});$h = a$d({a$j: [],a$e: $j,a$f: {$a: function(_a){var self,_b,_c;self=this;_b=_a===undefined?nil:_a;try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;if((_c=_b,_c===false||_c===nil)){self.$j(nil,$a,"tried to create Proc object without a block")};return (function() {
        try {
          return _b.$bC.apply(_b, arguments);
        } catch(e) 
        {
          if (e instanceof a$c) 
          {
            if (e.a$b == null)
            {;self.$j(nil,$t,"break from proc-closure");}
            return e.a$a;
          }
          else throw(e);
        }
      })}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==118))return _d.a$a;throw(_d)}}},a$c: "Proc",a$d: Function,a$h: {$bC: function(){var self,_a,_b;self=this;_a=[];for(_b=1;_b<arguments.length;_b++)_a.push(arguments[_b]);;
      if (_a.length == 0) return self();
      else if (_a.length == 1) return self(_a[0]);
      else return self(_a);}}});$d = a$d({a$j: [],a$e: $m,a$c: "TypeError"});$c = a$d({a$j: [],a$e: $m,a$c: "RuntimeError"});      $b.a$e = $j;
var a$k = [$i,$j,$k,$l,$f,$m,$n,$o,$p,$e,$q,$r,$s,$t,$u,$v,$a,$w,$b,$g,$x,$y,$z,$h,$d,$c];
a$l(a$k);
for (var i=0; i<a$k.length; i++) a$m(a$k[i]);
function main() { return $w.$bH.apply($w, arguments); }