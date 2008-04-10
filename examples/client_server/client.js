// declare nil
function NilClass() {}

// FIXME: remove
NilClass.prototype.toString = function() { return "nil"; };
nil = new NilClass();

//
// define a null-function (used by HTTPRequest)
//
function a$k()
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
function a$o(x) { throw(x); }

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
function a$p(o, m, i, a) 
{
  var r = o[m]; // method in current class
  var c = o.a$g.a$e;
  while (r === c.a$d.prototype[m])
    c = c.a$e;
  return c.a$d.prototype[m].apply(o, [i].concat(a));
}

function a$q(o, m, a) 
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

function a$m(c)
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
a$a.$A = function() { return this; };
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
function a$n(c)
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
var a$h = {"$b1":"end","$bx":"sub","$aY":"createTFoot","$v":"each","$b6":"new_from_jsobject","$x":"loop","$aa":"to_f","$aI":"setImgSrc","$V":"%","$b2":"member?","$E":"collect","$Z":"&","$b5":"new_from_key_value_list","$y":"to_json","$f":"===","$S":"==","$b0":"include?","$bL":"reverse","$P":"downto","$I":"map","$ab":"to_i","$aQ":"getAbsoluteLeft","$X":"times","$t":"p","$b3":"keys","$bi":"createTHead","$bf":"getCapture","$a1":"getAttribute","$s":"proc","$b":"allocate","$aS":"setOptionText","$K":"reject","$aH":"getEventsSunk","$ah":"setInnerHTML","$bz":"size","$bh":"createTable","$5":"*","$ak":"getNextSibling","$bJ":"delete","$be":"getChild","$O":"+","$aj":"getStyleAttribute","$b4":"values","$bS":"unshift","$bs":"getParent","$bj":"getChildCount","$aJ":"createTBody","$M":"upto","$bU":"dup","$bA":"rjust","$bk":"getPropertyBoolean","$R":"-","$ax":"getImgSrc","$ai":"getElementById","$q":"nil?","$aO":"createDiv","$aK":"scrollIntoView","$a":"new","$an":"compare","$bR":"push","$br":"changeToStaticPositioning","$bc":"removeEventListener","$aZ":"createInputCheck","$U":"/","$G":"call","$aR":"insertBefore","$_":"message","$z":"is_a?","$b7":"createXmlHTTPRequest","$bF":"split","$bv":"main","$aU":"getInnerHTML","$aN":"windowGetClientHeight","$aP":"getFirstChild","$a4":"createLabel","$e":"name","$l":"empty?","$bB":"length","$ac":"to_splat","$j":"raise","$aD":"sinkEvents","$o":"to_s","$bM":"clear","$bt":"getAbsoluteTop","$Q":">=","$aB":"getProperty","$b9":"asyncImpl","$bq":"createSelect","$bn":"getStyleAttributeBoolean","$W":"|","$aC":"windowGetClientWidth","$h":"kind_of?","$al":"releaseCapture","$bw":"asyncGet","$bm":"removeAttribute","$a7":"getChildIndex","$a2":"createForm","$aX":"createTextArea","$aE":"createCaption","$H":"find_all","$bC":"[]","$ba":"setInnerText","$0":"~","$ar":"createInputText","$bG":"strip","$aW":"createInputPassword","$ay":"setAbsolutePixelPosition","$3":"-@","$aM":"createFieldSet","$aF":"getPropertyInt","$9":"[]=","$T":"succ","$bT":"reverse!","$a8":"createCol","$a5":"isVisible","$C":"hash","$A":"class","$i":"inspect","$aV":"createTD","$az":"setStyleAttribute","$1":"^","$at":"getStyleAttributeInt","$ag":"setProperty","$b8":"asyncPost","$aq":"createElement","$aL":"createLegend","$bP":"pop","$p":"__send","$6":"_parse","$g":"eql?","$7":"dump","$D":"method","$Y":"<","$av":"getInnerText","$bZ":"begin","$bI":"first","$a6":"createTH","$bE":"ljust","$bg":"isOrHasChild","$a9":"createIFrame","$F":"<<","$d":"__invoke","$2":">","$N":"<=","$as":"createInput","$c":"initialize","$w":"send","$ao":"setVisible","$r":"respond_to?","$a$":"replace","$k":"shift","$8":"load","$aG":"setAttribute","$aT":"removeChild","$bY":"exclude_end?","$4":"+@","$ap":"createColGroup","$bl":"createSpan","$a_":"createOptions","$L":"select","$aw":"setCapture","$J":"to_a","$bH":"index","$bD":"=~","$bb":"createAnchor","$n":"method_missing","$au":"createInputRadio","$bO":"each_with_index","$bK":"join","$bp":"appendChild","$a0":"setEventListener","$B":"tap","$bN":"last","$bo":"insertChild","$a3":"createButton","$m":"instance_of?","$aA":"createTR","$bQ":"to_ary","$by":"gsub","$bd":"createImg","$u":"puts"};
var a$f = {};
for (var i in a$h) a$f[a$h[i]] = i;
$b = a$d({a$e: nil,a$f: {$a: function(_e,_a,_b,_c){var self,_d;self=this;try{if(arguments.length<3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));if(arguments.length>4)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 3)'));if(_c==null)_c=nil;;if((_d=_c,_d===false||_d===nil)){_c=(function() {})};return new self.a$d($b, _a, _b, _c);}catch(_f){if(_f instanceof a$c && (!_f.a$b || _f.a$b==2))return _f.a$a;throw(_f)}}},a$c: "Class",a$g: new a$a(a$a, nil, "Class", a$a),a$h: {$e: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;return self.a$c},$a: function(_c){var self,_a,_b,_d,_e,_f;_f=nil;self=this;_d=_c==null?nil:_c;try{_a=[];for(_b=1;_b<arguments.length;_b++)_a.push(arguments[_b]);;_e=self.$b();_e.$d(_d,'$c',a$b(_a));_f=_e;return _f}catch(_g){if(_g instanceof a$c && (!_g.a$b || _g.a$b==0))return _g.a$a;throw(_g)}},$f: function(_d,_a){var self,_b,_c;_c=nil;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;_c=(_b=self.$g(nil,_a), (_b!==false&&_b!==nil) ? _b : (_a.$h(nil,self)));return _c}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==1))return _e.a$a;throw(_e)}},$b: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;return (new self.a$d())},$i: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;return self.a$c}}});a$e($b);$i = a$d({a$j: [],a$e: nil,a$c: "Kernel",a$h: {$p: function(_d,_a){var self,_b,_c,_e;self=this;_e=_d==null?nil:_d;try{if(arguments.length<2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));_b=[];for(_c=2;_c<arguments.length;_c++)_b.push(arguments[_c]);;
    var m = self[a$f[_a]];
    if (m) 
      return m.apply(self, [_e].concat(_b));
    else
      return self.$n.apply(self, [_e].concat([_a]).concat(_b));}catch(_f){if(_f instanceof a$c && (!_f.a$b || _f.a$b==4))return _f.a$a;throw(_f)}},$n: function(_d,_a){var self,_b,_c,_e,_f;_f=nil;self=this;_e=_d==null?nil:_d;try{if(arguments.length<2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));_b=[];for(_c=2;_c<arguments.length;_c++)_b.push(arguments[_c]);;_f=self.$j(nil,$g,("undefined method `" + (_a).$o() + ("' for ").$o() + (self.$i()).$o()));return _f}catch(_g){if(_g instanceof a$c && (!_g.a$b || _g.a$b==3))return _g.a$a;throw(_g)}},$j: function(){var self,_a,_b,_c,_d;self=this;_a=[];for(_b=1;_b<arguments.length;_b++)_a.push(arguments[_b]);;_c=((_b=_a.$l(),_b!==false&&_b!==nil)?$c.$a(nil,""):(_d=_a.$k(),((_b=_d.$h(nil,$b),_b!==false&&_b!==nil)?_d.$d(nil,'$a',a$b(_a)):((_b=_d.$m(nil,$f),_b!==false&&_b!==nil)?((_b=_a.$l(),_b!==false&&_b!==nil)?_d:$a.$a(nil,"to many arguments given to raise")):((_b=_d.$m(nil,$e),_b!==false&&_b!==nil)?((_b=_a.$l(),_b!==false&&_b!==nil)?$c.$a(nil,_d):$a.$a(nil,"to many arguments given to raise")):$d.$a(nil,"exception class/object expected"))))));throw(_c)},$q: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=false;return _a},$s: function(_a){var self,_b,_c;_c=nil;self=this;_b=_a==null?nil:_a;try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_c=$h.$a(_b);return _c}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==6))return _d.a$a;throw(_d)}},$r: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;
    var m = a$f[_a]; 
    return (m !== undefined && self[m] !== undefined && !self[m].a$i)}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==5))return _c.a$a;throw(_c)}},$t: function(){var self,_a,_b,_f;_f=nil;self=this;_a=[];for(_b=1;_b<arguments.length;_b++)_a.push(arguments[_b]);;_a.$v(function(_c){var _d;var _e=nil;_d=_c==null?nil:_c;_e=self.$u(nil,_d.$i());return _e});_f=nil;return _f},$d: function(_c,_a,_b){var self,_d;self=this;_d=_c==null?nil:_c;try{if(arguments.length!=3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));;
    var m = self[_a];
    if (m)
      return m.apply(self, [_d].concat(_b));
    else
      return self.$n.apply(self, 
        [_d].concat([a$h[_a]]).concat(_b));}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==7))return _e.a$a;throw(_e)}},$x: function(_a){var self,_b;_b=nil;self=this;try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;while(true){_a()};_b=nil;;return _b}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==10))return _c.a$a;throw(_c)}},$u: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;_a=_a.$o();alert(_a); return nil}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==9))return _c.a$a;throw(_c)}},$w: function(_d,_a){var self,_b,_c,_e;self=this;_e=_d==null?nil:_d;try{if(arguments.length<2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));_b=[];for(_c=2;_c<arguments.length;_c++)_b.push(arguments[_c]);;
    var m = self[a$f[_a]];
    if (m) 
      return m.apply(self, [_e].concat(_b));
    else
      return self.$n.apply(self, [_e].concat([_a]).concat(_b));}catch(_f){if(_f instanceof a$c && (!_f.a$b || _f.a$b==8))return _f.a$a;throw(_f)}}}});$k = a$d({a$j: [$i],a$e: nil,a$c: "Object",a$h: {$h: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;return a$i(self, _a)}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==11))return _c.a$a;throw(_c)}},$z: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;return a$i(self, _a)}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==12))return _c.a$a;throw(_c)}},$y: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self.$j();return _a},$A: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;return self.a$g},$g: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;return (self.constructor == _a.constructor && self == _a)}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==13))return _c.a$a;throw(_c)}},$C: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;return self.toString()},$B: function(_a){var self,_b;_b=nil;self=this;try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a(self);_b=self;return _b}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==14))return _c.a$a;throw(_c)}},$o: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;return self.toString()},$c: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=nil;return _a},$D: function(_c,_a){var self,_b;_b=nil;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;_b=$j.$a(nil,self,_a);return _b}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==15))return _d.a$a;throw(_d)}},$f: function(_d,_a){var self,_b,_c;_c=nil;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;_c=(_b=self.$g(nil,_a), (_b!==false&&_b!==nil) ? _b : (self.$h(nil,_a)));return _c}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==16))return _e.a$a;throw(_e)}},$m: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;return (self.a$g === _a)}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==17))return _c.a$a;throw(_c)}},$i: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;return self.toString()}}});$l = a$d({a$j: [],a$e: nil,a$c: "Enumerable",a$h: {$E: function(_a){var self,_b,_c,_f,_h;_h=nil;self=this;_b=_a==null?nil:_a;try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_c=[];self.$v(function(_d){var _e;var _g=nil;_e=_d==null?nil:_d;_g=_c.$F(nil,((_f=_b,_f!==false&&_f!==nil)?_b.$G(nil,_e):_e));return _g});_h=_c;return _h}catch(_i){if(_i instanceof a$c && (!_i.a$b || _i.a$b==18))return _i.a$a;throw(_i)}},$H: function(_f){var self,_a,_e,_g;_g=nil;self=this;try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=[];self.$v(function(_b){var _c;var _d=nil;_c=_b==null?nil:_b;if((_e=_f(_c),_e!==false&&_e!==nil)){_d=_a.$F(nil,_c)}else{_d=nil};return _d});_g=_a;return _g}catch(_h){if(_h instanceof a$c && (!_h.a$b || _h.a$b==19))return _h.a$a;throw(_h)}},$I: function(_a){var self,_b,_c,_f,_h;_h=nil;self=this;_b=_a==null?nil:_a;try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_c=[];self.$v(function(_d){var _e;var _g=nil;_e=_d==null?nil:_d;_g=_c.$F(nil,((_f=_b,_f!==false&&_f!==nil)?_b.$G(nil,_e):_e));return _g});_h=_c;return _h}catch(_i){if(_i instanceof a$c && (!_i.a$b || _i.a$b==20))return _i.a$a;throw(_i)}},$J: function(){var self,_a,_e;_e=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=[];self.$v(function(_b){var _c;var _d=nil;_c=_b==null?nil:_b;_d=_a.$F(nil,_c);return _d});_e=_a;return _e},$K: function(_f){var self,_a,_e,_g;_g=nil;self=this;try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=[];self.$v(function(_b){var _c;var _d=nil;_c=_b==null?nil:_b;if((_e=_f(_c),_e===false||_e===nil)){_d=_a.$F(nil,_c)}else{_d=nil};return _d});_g=_a;return _g}catch(_h){if(_h instanceof a$c && (!_h.a$b || _h.a$b==21))return _h.a$a;throw(_h)}},$L: function(_f){var self,_a,_e,_g;_g=nil;self=this;try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=[];self.$v(function(_b){var _c;var _d=nil;_c=_b==null?nil:_b;if((_e=_f(_c),_e!==false&&_e!==nil)){_d=_a.$F(nil,_c)}else{_d=nil};return _d});_g=_a;return _g}catch(_h){if(_h instanceof a$c && (!_h.a$b || _h.a$b==22))return _h.a$a;throw(_h)}}}});$m = a$d({a$j: [],a$e: $k,a$c: "Number",a$d: Number,a$h: {$O: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;return self + _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==26))return _c.a$a;throw(_c)}},$S: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;return self == _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==25))return _c.a$a;throw(_c)}},$P: function(_d,_a){var self,_b,_c;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;_b=self;while((_c=_b.$Q(nil,_a),_c!==false&&_c!==nil)){_d(_b);_b=_b.$R(nil,1)};return self}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==24))return _e.a$a;throw(_e)}},$M: function(_d,_a){var self,_b,_c;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;_b=self;while((_c=_b.$N(nil,_a),_c!==false&&_c!==nil)){_d(_b);_b=_b.$O(nil,1)};return self}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==23))return _e.a$a;throw(_e)}},$N: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;return self <= _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==28))return _c.a$a;throw(_c)}},$y: function(_b,_a){var self;self=this;try{if(arguments.length>2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));if(_a==null)_a=10;;return self.toString(_a)}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==27))return _c.a$a;throw(_c)}},$R: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;return self - _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==29))return _c.a$a;throw(_c)}},$T: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;return self+1},$U: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;return self / _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==31))return _c.a$a;throw(_c)}},$o: function(_b,_a){var self;self=this;try{if(arguments.length>2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));if(_a==null)_a=10;;return self.toString(_a)}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==30))return _c.a$a;throw(_c)}},$V: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;return self % _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==32))return _c.a$a;throw(_c)}},$Z: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;return self & _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==36))return _c.a$a;throw(_c)}},$Y: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;return self < _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==35))return _c.a$a;throw(_c)}},$X: function(_c){var self,_a,_b;self=this;try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=0;while((_b=_a.$Y(nil,self),_b!==false&&_b!==nil)){_c(_a);_a=_a.$O(nil,1)};return self}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==34))return _d.a$a;throw(_d)}},$W: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;return self | _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==33))return _c.a$a;throw(_c)}},$3: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;return -self},$2: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;return self > _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==38))return _c.a$a;throw(_c)}},$1: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;return self ^ _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==37))return _c.a$a;throw(_c)}},$0: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;return ~self},$Q: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;return self >= _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==39))return _c.a$a;throw(_c)}},$i: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;return self.toString()},$5: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;return self * _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==40))return _c.a$a;throw(_c)}},$4: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;return self}}});$n = a$d({a$j: [],a$e: $k,a$c: "Regexp",a$d: RegExp});$q = a$d({a$j: [],a$e: $k,a$f: {$6: function(_c,_a){var self,_b;_b=nil;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;      if (/^[\],:{}\s]*$/.test(_a.replace(/\\./g, '@').
          replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(:?[eE][+\-]?\d+)?/g, ']').
          replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {
        return eval('(' + _a + ')');
      }
;_b=self.$j(nil,$o,_a);return _b}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==41))return _d.a$a;throw(_d)}},$7: function(_c,_a){var self,_b;_b=nil;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;_b=_a.$y();return _b}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==42))return _d.a$a;throw(_d)}},$8: function(_c,_a){var self,_b;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;_b=self.$6(nil,_a);
    var conv = function(obj) {
      if (obj==null) return nil;
      else if (obj instanceof Array) {
        for (var i=0; i<obj.length; i++) obj[i] = conv(obj[i]); 
      }
      else if (typeof(obj) == 'object') {
        var nobj = $p.$a();
        for (var i in obj) {
          nobj.$9(nil, conv(i), conv(obj[i]));
        }
        return nobj;
      }
      return obj;
    };
    return conv(_b);
   }catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==43))return _d.a$a;throw(_d)}}},a$c: "JSON"});$f = a$d({a$j: [],a$e: $k,a$c: "Exception",a$h: {$_: function(){var self,_a;_a=nil;self=this;if(self.$$==null)self.$$=nil;_a=self.$$;return _a},$o: function(){var self,_a;_a=nil;self=this;if(self.$$==null)self.$$=nil;_a=self.$$;return _a},$c: function(_d,_a){var self,_c,_b;_b=nil;self=this;try{if(arguments.length>2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));if(_a==null)_a=nil;;if((_c=_a.$q(),_c!==false&&_c!==nil)){_b=self.$$=self.$A().$e()}else{_b=self.$$=_a};return _b}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==44))return _e.a$a;throw(_e)}},$i: function(){var self,_a;_a=nil;self=this;if(self.$$==null)self.$$=nil;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=("#<" + (self.$A().$e()).$o() + (": ").$o() + (self.$$).$o() + (">").$o());return _a}}});$r = a$d({a$j: [],a$e: $f,a$c: "StandardError"});$c = a$d({a$j: [],a$e: $r,a$c: "RuntimeError"});$s = a$d({a$j: [],a$e: $m,a$c: "Fixnum",a$d: Number});$h = a$d({a$j: [],a$e: $k,a$f: {$a: function(_a){var self,_b,_c;self=this;_b=_a==null?nil:_a;try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;if((_c=_b,_c===false||_c===nil)){self.$j(nil,$a,"tried to create Proc object without a block")};return (function() {
      try {
        return _b.$G.apply(_b, arguments);
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
    })}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==45))return _d.a$a;throw(_d)}}},a$c: "Proc",a$d: Function,a$h: {$G: function(){var self,_a,_b;self=this;_a=[];for(_b=1;_b<arguments.length;_b++)_a.push(arguments[_b]);;
    // TODO: use switch/case
    if (_a.length == 0) return self();
    else if (_a.length == 1) return self(_a[0]);
    else return self(_a);}}});$t = a$d({a$j: [],a$e: $r,a$c: "LocalJumpError"});$u = a$d({a$j: [],a$e: $m,a$c: "Float",a$d: Number});$v = a$d({a$j: [],a$e: $k,a$c: "NilClass",a$d: NilClass,a$h: {$y: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a="null";return _a},$aa: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=0.0;return _a},$q: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=true;return _a},$o: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a="";return _a},$ab: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=0;return _a},$J: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=[];return _a},$ac: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=[];return _a},$i: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a="nil";return _a}}});$j = a$d({a$j: [],a$e: $k,a$c: "Method",a$h: {$c: function(_f,_a,_b){var self,_c,_d,_e;_e=nil;self=this;try{if(arguments.length!=3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));;(_c=[_a,_b],self.$ad=_c[0]==null?nil:_c[0],self.$ae=_c[1]==null?nil:_c[1],_c);_d=nil;_d = _a[a$f[_b]];
    if (_d==null) _d = nil;;if((_c=_d,_c!==false&&_c!==nil)){_e=self.$af=_d}else{_e=self.$j(nil,$w,("undefined method `" + (_b).$o() + ("' for class `").$o() + (_a.$A().$e()).$o() + ("'").$o()))};return _e}catch(_g){if(_g instanceof a$c && (!_g.a$b || _g.a$b==46))return _g.a$a;throw(_g)}},$G: function(_c){var self,_a,_b,_d;self=this;_d=_c==null?nil:_c;try{_a=[];for(_b=1;_b<arguments.length;_b++)_a.push(arguments[_b]);;return self.$af.apply(self.$ad, [_d].concat(_a))}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==47))return _e.a$a;throw(_e)}},$i: function(){var self,_a;_a=nil;self=this;if(self.$ad==null)self.$ad=nil;if(self.$ae==null)self.$ae=nil;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=("#<Method: " + (self.$ad.$A().$e()).$o() + ("#").$o() + (self.$ae).$o() + (">").$o());return _a}}});$x = a$d({a$j: [],a$e: $k,a$f: {$ah: function(_c,_a,_b){var self;self=this;try{if(arguments.length<2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));if(arguments.length>3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));if(_b==null)_b="";;
    _a.innerHTML = _b;
    return nil}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==50))return _d.a$a;throw(_d)}},$ai: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;return document.getElementById(_a) || nil}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==51))return _c.a$a;throw(_c)}},$ag: function(_d,_a,_b,_c){var self;self=this;try{if(arguments.length!=4)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 3)'));;_a[_b] = _c; return nil}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==49))return _e.a$a;throw(_e)}},$aj: function(_c,_a,_b){var self;self=this;try{if(arguments.length!=3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));;
    var ret = _a.style[_b];
    return (ret == null) ? nil : ret}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==52))return _d.a$a;throw(_d)}},$o: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;return _a.outerHTML}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==48))return _c.a$a;throw(_c)}},$ak: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;
    var sib = _a.nextSibling;
    while (sib && sib.nodeType != 1)
      sib = sib.nextSibling;
    return sib || nil}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==53))return _c.a$a;throw(_c)}},$al: function(_d,_a){var self,_b,_c;self=this;if(self.$am==null)self.$am=nil;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;if((_b=(_c=self.$am, (_c!==false&&_c!==nil) ? (self.$an(nil,_a,self.$am)) : _c),_b!==false&&_b!==nil)){self.$am=nil};if (_a == window.a$k) window.a$k = null;;return nil}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==54))return _e.a$a;throw(_e)}},$ao: function(_d,_a,_b){var self,_c;self=this;try{if(arguments.length<2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));if(arguments.length>3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));if(_b==null)_b=true;;if((_c=_b,_c!==false&&_c!==nil)){_a.style.display = ''}else{_a.style.display = 'none'};return nil}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==55))return _e.a$a;throw(_e)}},$an: function(_c,_a,_b){var self;self=this;try{if(arguments.length!=3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));;return (_a == _b)}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==56))return _d.a$a;throw(_d)}},$ap: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self.$aq(nil,"colgroup");return _a},$ar: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self.$as(nil,"text");return _a},$at: function(_c,_a,_b){var self;self=this;try{if(arguments.length!=3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));;
    var i = parseInt(_a.style[_b]);
    return ((!i) ? 0 : i)}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==57))return _d.a$a;throw(_d)}},$au: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;
    var e = document.createElement("INPUT");
    e.type = 'radio';
    e.name = _a;
    return e}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==58))return _c.a$a;throw(_c)}},$av: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;
    // To mimic IEs +innerText+ property in the W3C DOM, we need to recursively
    // concatenate all child text nodes (depth first).
    var text = '', child = _a.firstChild;
    while (child) {
      // 1 == Element node
      if (child.nodeType == 1) {
        text += this.$av(nil, child);
      } else if (child.nodeValue) {
        text += child.nodeValue;
      }
      child = child.nextSibling;
    }
    return text}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==59))return _c.a$a;throw(_c)}},$aw: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;self.$am=_a;window.a$k = _a;;return nil}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==60))return _c.a$a;throw(_c)}},$ax: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;
    var ret = _a.src;
    return (ret == null) ? nil : ret}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==61))return _c.a$a;throw(_c)}},$ay: function(_e,_a,_b,_c){var self,_d;_d=nil;self=this;try{if(arguments.length!=4)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 3)'));;self.$az(nil,_a,"position","absolute");self.$az(nil,_a,"left",_b.$O(nil,"px"));_d=self.$az(nil,_a,"top",_c.$O(nil,"px"));return _d}catch(_f){if(_f instanceof a$c && (!_f.a$b || _f.a$b==62))return _f.a$a;throw(_f)}},$aA: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self.$aq(nil,"tr");return _a},$aB: function(_c,_a,_b){var self;self=this;try{if(arguments.length!=3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));;
    var ret = _a[_b];
    return (ret == null) ? nil : String(ret)}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==63))return _d.a$a;throw(_d)}},$aE: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self.$aq(nil,"caption");return _a},$aF: function(_c,_a,_b){var self;self=this;try{if(arguments.length!=3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));;
    var i = parseInt(_a[_b]);
    return ((!i) ? 0 : i)}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==65))return _d.a$a;throw(_d)}},$aD: function(_c,_a,_b){var self;self=this;try{if(arguments.length!=3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));;
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
    
    return nil}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==64))return _d.a$a;throw(_d)}},$aG: function(_d,_a,_b,_c){var self;self=this;try{if(arguments.length!=4)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 3)'));;_a.setAttribute(_b, _c); return nil}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==66))return _e.a$a;throw(_e)}},$aC: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;return document.body.clientWidth},$aH: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;return _a.a$l || 0}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==67))return _c.a$a;throw(_c)}},$aJ: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self.$aq(nil,"tbody");return _a},$aI: function(_c,_a,_b){var self;self=this;try{if(arguments.length!=3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));;_a.src = _b; return nil}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==68))return _d.a$a;throw(_d)}},$as: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;
    var e = document.createElement("INPUT");
    e.type = _a;
    return e}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==69))return _c.a$a;throw(_c)}},$aK: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;
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
    return nil}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==70))return _c.a$a;throw(_c)}},$aL: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self.$aq(nil,"legend");return _a},$aM: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self.$aq(nil,"fieldset");return _a},$aq: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;return document.createElement(_a)}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==71))return _c.a$a;throw(_c)}},$aO: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self.$aq(nil,"div");return _a},$aP: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;
    var child = _a.firstChild;
    while (child && child.nodeType != 1)
      child = child.nextSibling;
    return child || nil}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==72))return _c.a$a;throw(_c)}},$aN: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;return document.body.clientHeight},$aQ: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;
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
    return left}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==73))return _c.a$a;throw(_c)}},$aR: function(_d,_a,_b,_c){var self;self=this;try{if(arguments.length!=4)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 3)'));;_a.insertBefore(_b, _c); return nil}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==74))return _e.a$a;throw(_e)}},$aS: function(_d,_a,_b,_c){var self;self=this;try{if(arguments.length!=4)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 3)'));;var option = _a.options[_c];
    option.text = _b;
    return nil}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==75))return _e.a$a;throw(_e)}},$aT: function(_c,_a,_b){var self;self=this;try{if(arguments.length!=3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));;_a.removeChild(_b); return nil}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==76))return _d.a$a;throw(_d)}},$aU: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;
    var ret = _a.innerHTML;
    return (ret == null) ? nil : ret}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==77))return _c.a$a;throw(_c)}},$aV: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self.$aq(nil,"td");return _a},$aW: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self.$as(nil,"password");return _a},$aX: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self.$aq(nil,"textarea");return _a},$aY: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self.$aq(nil,"tfoot");return _a},$aZ: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self.$as(nil,"checkbox");return _a},$a1: function(_c,_a,_b){var self;self=this;try{if(arguments.length!=3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));;
    var ret = _a.getAttribute(_b);
    return (ret == null) ? nil : ret}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==79))return _d.a$a;throw(_d)}},$a2: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self.$aq(nil,"form");return _a},$a3: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self.$aq(nil,"button");return _a},$a4: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self.$aq(nil,"label");return _a},$a0: function(_c,_a,_b){var self;self=this;try{if(arguments.length!=3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));;_a.a$n = (_b === nil) ? null : _b; return nil}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==78))return _d.a$a;throw(_d)}},$a5: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;return (_a.style.display != 'none')}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==80))return _c.a$a;throw(_c)}},$a6: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self.$aq(nil,"th");return _a},$a7: function(_c,_a,_b){var self;self=this;try{if(arguments.length!=3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));;
    var count = 0, child = _a.firstChild;
    while (child) {
      if (child == _b)
        return count;
      if (child.nodeType == 1)
        ++count;
      child = child.nextSibling;
    }

    return nil}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==81))return _d.a$a;throw(_d)}},$a8: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self.$aq(nil,"col");return _a},$a9: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self.$aq(nil,"iframe");return _a},$a_: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self.$aq(nil,"options");return _a},$a$: function(_c,_a,_b){var self;self=this;try{if(arguments.length!=3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));;
    var p = _a.parentNode;
    if (!p) return;
    p.insertBefore(_b, _a);
    p.removeChild(_a);
    return nil}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==82))return _d.a$a;throw(_d)}},$bb: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self.$aq(nil,"A");return _a},$bc: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;_a.a$n = null; return nil}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==84))return _c.a$a;throw(_c)}},$ba: function(_c,_a,_b){var self;self=this;try{if(arguments.length!=3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));;
    // Remove all children first.
    while (_a.firstChild) {
      _a.removeChild(_a.firstChild);
    }
    // Add a new text node.
    if (_b !== nil) {
      _a.appendChild(document.createTextNode(_b));
    }
    return nil}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==83))return _d.a$a;throw(_d)}},$bd: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self.$aq(nil,"img");return _a},$az: function(_d,_a,_b,_c){var self;self=this;try{if(arguments.length!=4)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 3)'));;_a.style[_b] = _c; return nil}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==85))return _e.a$a;throw(_e)}},$be: function(_c,_a,_b){var self;self=this;try{if(arguments.length!=3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));;
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

    return nil}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==86))return _d.a$a;throw(_d)}},$bf: function(){var self;self=this;if(self.$am==null)self.$am=nil;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;return self.$am},$bg: function(_c,_a,_b){var self;self=this;try{if(arguments.length!=3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));;
    while (_b) {
      if (_a == _b) {
        return true;
      }
      _b = _b.parentNode;
      if (_b && (_b.nodeType != 1)) {
        _b = null;
      }
    }
    return false}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==87))return _d.a$a;throw(_d)}},$bh: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self.$aq(nil,"table");return _a},$bi: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self.$aq(nil,"thead");return _a},$bk: function(_c,_a,_b){var self;self=this;try{if(arguments.length!=3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));;return !!_a[_b]}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==89))return _d.a$a;throw(_d)}},$bj: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;
    var count = 0, child = _a.firstChild;
    while (child) {
      if (child.nodeType == 1)
        ++count;
      child = child.nextSibling;
    }
    return count}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==88))return _c.a$a;throw(_c)}},$bn: function(_c,_a,_b){var self;self=this;try{if(arguments.length!=3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));;return !!_a.style[_b]}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==91))return _d.a$a;throw(_d)}},$bm: function(_c,_a,_b){var self;self=this;try{if(arguments.length!=3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));;_a.removeAttribute(_b); return nil}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==90))return _d.a$a;throw(_d)}},$bl: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self.$aq(nil,"span");return _a},$bt: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;
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
    return top}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==97))return _c.a$a;throw(_c)}},$bs: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;
    var parent = _a.parentNode;
    if(parent == null) {
      return nil;
    }
    if (parent.nodeType != 1)
      parent = null;
    return parent || nil}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==96))return _c.a$a;throw(_c)}},$br: function(_c,_a){var self,_b;_b=nil;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;self.$az(nil,_a,"left","");self.$az(nil,_a,"top","");_b=self.$az(nil,_a,"position","static");return _b}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==95))return _d.a$a;throw(_d)}},$bq: function(_d,_a){var self,_b,_c;self=this;try{if(arguments.length>2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));if(_a==null)_a=false;;_b=self.$aq(nil,"select");if((_c=_a,_c!==false&&_c!==nil)){self.$ag(nil,_b,"multiple",true)};return _b}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==94))return _e.a$a;throw(_e)}},$bp: function(_c,_a,_b){var self;self=this;try{if(arguments.length!=3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));;_a.appendChild(_b); return nil}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==93))return _d.a$a;throw(_d)}},$bo: function(_d,_a,_b,_c){var self;self=this;try{if(arguments.length!=4)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 3)'));;
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
    return nil}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==92))return _e.a$a;throw(_e)}}},a$c: "DOM"});$w = a$d({a$j: [],a$e: $r,a$c: "NameError"});$y = a$d({a$j: [],a$e: $k,a$c: "MatchData",a$h: {$c: function(_c,_a){var self,_b;_b=nil;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;_b=self.$bu=_a;return _b}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==98))return _d.a$a;throw(_d)}}}});$z = a$d({a$j: [],a$e: $k,a$c: "Boolean",a$d: Boolean,a$h: {$S: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;return (self == _a)}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==99))return _c.a$a;throw(_c)}},$y: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;return (self == true ? 'true' : 'false')},$o: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;return (self == true ? 'true' : 'false')},$i: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;return (self == true ? 'true' : 'false')}}});$a = a$d({a$j: [],a$e: $r,a$c: "ArgumentError"});$B = a$d({a$j: [],a$e: $k,a$f: {$bv: function(){var self,_a,_e;_e=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=$x.$ai(nil,"out");_e=$A.$bw(function(_b){var _c;var _d=nil;_c=_b==null?nil:_b;_d=$x.$ba(nil,_a,$q.$8(nil,_c).$i());return _d},"/json");return _e}},a$c: "Client"});$o = a$d({a$j: [],a$e: $c,a$c: "JSON::SyntaxError"});a$d({a$j: [],a$g: $b});$e = a$d({a$j: [],a$e: $k,a$c: "String",a$d: String,a$h: {$O: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;return(self + _a)}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==101))return _c.a$a;throw(_c)}},$bx: function(_c,_a,_b){var self;self=this;try{if(arguments.length!=3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));;self.replace(pattern, replacement)}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==100))return _d.a$a;throw(_d)}},$bD: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;
    var i = self.search(_a);
    return (i == -1 ? nil : i)}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==103))return _c.a$a;throw(_c)}},$bA: function(_f,_a,_b){var self,_c,_d,_e;self=this;try{if(arguments.length<2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));if(arguments.length>3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));if(_b==null)_b=" ";;if((_c=_b.$l(),_c!==false&&_c!==nil)){self.$j(nil,$a,"zero width padding")};_d=_a.$R(nil,self.$bB());if((_c=_d.$N(nil,0),_c!==false&&_c!==nil)){return self};_e="";while(_e.length < _d) _e += _b;;return _e.$bC(nil,0,_d).$O(nil,self)}catch(_g){if(_g instanceof a$c && (!_g.a$b || _g.a$b==102))return _g.a$a;throw(_g)}},$bz: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;return self.length},$y: function(){var self,_a,_b;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a={
      '\b': '\\b',
      '\t': '\\t',
      '\n': '\\n',
      '\f': '\\f',
      '\r': '\\r',
      '\\': '\\\\'
    };;_b=self.$by(function(_c){var _d,_e;_d=_c==null?nil:_c;_e=_a[_d];return _e ? _e : 
        '\\u00' + ("0" + _d.charCodeAt().toString(16)).substring(0,2);},/[\x00-\x1f\\]/);return ('"' + _b.replace(/"/g, '\\"') + '"');},$bC: function(_d,_a,_b){var self,_c;self=this;try{if(arguments.length<2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));if(arguments.length>3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));if(_b==null)_b=nil;;if((_c=_b.$q(),_c!==false&&_c!==nil)){return self.charAt(_a) || nil}else{if((_c=_b.$Y(nil,0),_c!==false&&_c!==nil)){return nil};return self.substring(_a, _a+_b)}}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==105))return _e.a$a;throw(_e)}},$bE: function(_f,_a,_b){var self,_c,_d,_e;self=this;try{if(arguments.length<2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));if(arguments.length>3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));if(_b==null)_b=" ";;if((_c=_b.$l(),_c!==false&&_c!==nil)){self.$j(nil,$a,"zero width padding")};_d=_a.$R(nil,self.$bB());if((_c=_d.$N(nil,0),_c!==false&&_c!==nil)){return self};_e="";while(_e.length < _d) _e += _b;;return self.$O(nil,_e.$bC(nil,0,_d))}catch(_g){if(_g instanceof a$c && (!_g.a$b || _g.a$b==104))return _g.a$a;throw(_g)}},$bF: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;return self.split(_a)}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==106))return _c.a$a;throw(_c)}},$o: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self;return _a},$bB: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;return self.length},$bG: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;return self.replace(/^\s+/, '').replace(/\s+$/, '')},$l: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;return(self === "")},$by: function(_g,_a,_b){var self,_c,_d,_e,_f;self=this;try{if(arguments.length<2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));if(arguments.length>3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));if(_b==null)_b=nil;;(_c=["",self,nil],_d=_c[0]==null?nil:_c[0],_e=_c[1]==null?nil:_c[1],_f=_c[2]==null?nil:_c[2],_c);while(_e.length > 0) {
      if (_f = _e.match(_a)) {
        _d += _e.slice(0, _f.index);;if((_c=_b,_c!==false&&_c!==nil)){_d=_d.$O(nil,_b)}else{_d=_d.$O(nil,_g(_f.$bI()).$o())};_e = _e.slice(_f.index + _f[0].length);
      } else {
        _d += _e; _e = '';
      }
    } return _d}catch(_h){if(_h instanceof a$c && (!_h.a$b || _h.a$b==108))return _h.a$a;throw(_h)}},$bH: function(_c,_a,_b){var self;self=this;try{if(arguments.length<2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));if(arguments.length>3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));if(_b==null)_b=0;;
    var i = self.indexOf(_a, _b);
    return (i == -1) ? nil : i}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==107))return _d.a$a;throw(_d)}},$i: function(){var self,_a,_b;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a={
      '\b': '\\b',
      '\t': '\\t',
      '\n': '\\n',
      '\f': '\\f',
      '\r': '\\r',
      '\\': '\\\\'
    };;_b=self.$by(function(_c){var _d,_e;_d=_c==null?nil:_c;_e=_a[_d];return _e ? _e : 
        '\\u00' + ("0" + _d.charCodeAt().toString(16)).substring(0,2);},/[\x00-\x1f\\]/);return ('"' + _b.replace(/"/g, '\\"') + '"');}}});$C = a$d({a$j: [$l],a$e: $k,a$f: {$a: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;return []}},a$c: "Array",a$d: Array,a$h: {$O: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;return self.concat(_a)}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==111))return _c.a$a;throw(_c)}},$F: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;self.push(_a); return self}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==110))return _c.a$a;throw(_c)}},$bJ: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;
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
    return del ? _a : nil}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==109))return _c.a$a;throw(_c)}},$bz: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;return self.length},$y: function(){var self,_d;_d=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_d=self.$I(function(_a){var _b;var _c=nil;_b=_a==null?nil:_a;_c=_b.$y();return _c}).$bK(nil,",");return _d},$bC: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;var v = self[_a]; return (v == null ? nil : v)}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==113))return _c.a$a;throw(_c)}},$bM: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;self.length=0; return self},$g: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;
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
    }catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==112))return _c.a$a;throw(_c)}},$bL: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;return self.concat().reverse()},$bN: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;var v = self[self.length - 1]; return (v == null ? nil : v)},$o: function(){var self,_d;_d=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_d=self.$I(function(_a){var _b;var _c=nil;_b=_a==null?nil:_a;_c=_b.$o();return _c}).$bK();return _d},$9: function(_c,_a,_b){var self;self=this;try{if(arguments.length!=3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));;return (self[_a] = _b)}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==116))return _d.a$a;throw(_d)}},$v: function(_a){var self;self=this;try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;
    var elem;
    for (var i=0; i < self.length; i++) {
      elem = self[i];;_a((elem == null ? nil : elem));}
    return self}catch(_b){if(_b instanceof a$c && (!_b.a$b || _b.a$b==115))return _b.a$a;throw(_b)}},$bO: function(_a){var self;self=this;try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;  
    var elem;
    for (var i=0; i < self.length; i++) {
      elem = self[i];;_a([(elem == null ? nil : elem),i]);}
    return self}catch(_b){if(_b instanceof a$c && (!_b.a$b || _b.a$b==114))return _b.a$a;throw(_b)}},$bI: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;var v = self[0]; return (v == null ? nil : v)},$bB: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;return self.length},$bP: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;
    var elem = self.pop();
    return (elem == null ? nil : elem)},$k: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;
    var elem = self.shift();
    return (elem == null ? nil : elem)},$l: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;return (self.length == 0)},$J: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self;return _a},$bR: function(){var self,_a,_b;self=this;_a=[];for(_b=1;_b<arguments.length;_b++)_a.push(arguments[_b]);;self.push.apply(self, _a); return self},$bQ: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self;return _a},$bU: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;return self.concat()},$i: function(){var self,_a,_e;_e=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a="[";_a=_a.$O(nil,self.$I(function(_b){var _c;var _d=nil;_c=_b==null?nil:_b;_d=_c.$i();return _d}).$bK(nil,", "));_a=_a.$O(nil,"]");_e=_a;return _e},$bT: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;self.reverse(); return self},$bS: function(){var self,_a,_b;self=this;_a=[];for(_b=1;_b<arguments.length;_b++)_a.push(arguments[_b]);;self.unshift.apply(self, _a); return self},$bK: function(_i,_a){var self,_b,_d,_h;_h=nil;self=this;try{if(arguments.length>2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));if(_a==null)_a="";;_b="";self.$bO(function(_c){var _e,_f;var _g=nil;(_d=a$j(_c),_e=_d[0]==null?nil:_d[0],_f=_d[1]==null?nil:_d[1],_d);_b=_b.$O(nil,_e.$o());if((_d=_f.$S(nil,self.$bB().$R(nil,1)),_d===false||_d===nil)){_g=_b=_b.$O(nil,_a)}else{_g=nil};return _g});_h=_b;return _h}catch(_j){if(_j instanceof a$c && (!_j.a$b || _j.a$b==117))return _j.a$a;throw(_j)}}}});$D = a$d({a$j: [],a$e: $k,a$c: "Range",a$h: {$S: function(_e,_a){var self,_b,_c,_d;_d=nil;self=this;if(self.$bV==null)self.$bV=nil;if(self.$bW==null)self.$bW=nil;if(self.$bX==null)self.$bX=nil;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;if (self.constructor != _a.constructor) return false;;_d=(_b=self.$bV.$S(nil,_a.$bI()), (_b!==false&&_b!==nil) ? ((_c=self.$bW.$S(nil,_a.$bN()), (_c!==false&&_c!==nil) ? (self.$bX.$S(nil,_a.$bY())) : _c)) : _b);return _d}catch(_f){if(_f instanceof a$c && (!_f.a$b || _f.a$b==118))return _f.a$a;throw(_f)}},$bZ: function(){var self,_a;_a=nil;self=this;if(self.$bV==null)self.$bV=nil;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self.$bV;return _a},$g: function(_e,_a){var self,_b,_c,_d;_d=nil;self=this;if(self.$bV==null)self.$bV=nil;if(self.$bW==null)self.$bW=nil;if(self.$bX==null)self.$bX=nil;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;if (self.constructor != _a.constructor) return false;;_d=(_b=self.$bV.$g(nil,_a.$bI()), (_b!==false&&_b!==nil) ? ((_c=self.$bW.$g(nil,_a.$bN()), (_c!==false&&_c!==nil) ? (self.$bX.$S(nil,_a.$bY())) : _c)) : _b);return _d}catch(_f){if(_f instanceof a$c && (!_f.a$b || _f.a$b==119))return _f.a$a;throw(_f)}},$bY: function(){var self,_a;_a=nil;self=this;if(self.$bX==null)self.$bX=nil;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self.$bX;return _a},$bN: function(){var self,_a;_a=nil;self=this;if(self.$bW==null)self.$bW=nil;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self.$bW;return _a},$o: function(){var self,_b,_a;_a=nil;self=this;if(self.$bV==null)self.$bV=nil;if(self.$bW==null)self.$bW=nil;if(self.$bX==null)self.$bX=nil;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;if((_b=self.$bX,_b!==false&&_b!==nil)){_a=("" + (self.$bV).$o() + ("...").$o() + (self.$bW).$o())}else{_a=("" + (self.$bV).$o() + ("..").$o() + (self.$bW).$o())};return _a},$v: function(_c){var self,_a,_b,_d;_d=nil;self=this;if(self.$bV==null)self.$bV=nil;if(self.$bW==null)self.$bW=nil;if(self.$bX==null)self.$bX=nil;try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self.$bV;if((_b=self.$bV.$2(nil,self.$bW),_b!==false&&_b!==nil)){return nil};if((_b=self.$bX,_b!==false&&_b!==nil)){while((_b=_a.$Y(nil,self.$bW),_b!==false&&_b!==nil)){_c(_a);_a=_a.$T()};_d=nil;}else{while((_b=_a.$N(nil,self.$bW),_b!==false&&_b!==nil)){_c(_a);_a=_a.$T()};_d=nil;};return _d}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==122))return _e.a$a;throw(_e)}},$b1: function(){var self,_a;_a=nil;self=this;if(self.$bW==null)self.$bW=nil;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self.$bW;return _a},$bI: function(){var self,_a;_a=nil;self=this;if(self.$bV==null)self.$bV=nil;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self.$bV;return _a},$b0: function(_d,_a){var self,_b,_c;_c=nil;self=this;if(self.$bV==null)self.$bV=nil;if(self.$bW==null)self.$bW=nil;if(self.$bX==null)self.$bX=nil;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;if((_b=_a.$Y(nil,self.$bV),_b!==false&&_b!==nil)){return false};if((_b=self.$bX,_b!==false&&_b!==nil)){_c=_a.$Y(nil,self.$bW)}else{_c=_a.$N(nil,self.$bW)};return _c}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==121))return _e.a$a;throw(_e)}},$c: function(_f,_a,_b,_c){var self,_d,_e;_e=nil;self=this;try{if(arguments.length<3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));if(arguments.length>4)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 3)'));if(_c==null)_c=false;;(_d=[_a,_b],self.$bV=_d[0]==null?nil:_d[0],self.$bW=_d[1]==null?nil:_d[1],_d);_e=self.$bX=((_d=_c,_d!==false&&_d!==nil)?true:false);return _e}catch(_g){if(_g instanceof a$c && (!_g.a$b || _g.a$b==120))return _g.a$a;throw(_g)}},$f: function(_d,_a){var self,_b,_c;_c=nil;self=this;if(self.$bV==null)self.$bV=nil;if(self.$bW==null)self.$bW=nil;if(self.$bX==null)self.$bX=nil;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;if((_b=_a.$Y(nil,self.$bV),_b!==false&&_b!==nil)){return false};if((_b=self.$bX,_b!==false&&_b!==nil)){_c=_a.$Y(nil,self.$bW)}else{_c=_a.$N(nil,self.$bW)};return _c}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==123))return _e.a$a;throw(_e)}},$J: function(){var self,_a,_b,_c;self=this;if(self.$bV==null)self.$bV=nil;if(self.$bW==null)self.$bW=nil;if(self.$bX==null)self.$bX=nil;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=[];if((_b=self.$bV.$2(nil,self.$bW),_b!==false&&_b!==nil)){return _a};_c=self.$bV;if((_b=self.$bX,_b!==false&&_b!==nil)){while((_b=_c.$Y(nil,self.$bW),_b!==false&&_b!==nil)){_a.$F(nil,_c);_c=_c.$T()}}else{while((_b=_c.$N(nil,self.$bW),_b!==false&&_b!==nil)){_a.$F(nil,_c);_c=_c.$T()}};return _a},$i: function(){var self,_b,_a;_a=nil;self=this;if(self.$bV==null)self.$bV=nil;if(self.$bW==null)self.$bW=nil;if(self.$bX==null)self.$bX=nil;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;if((_b=self.$bX,_b!==false&&_b!==nil)){_a=("" + (self.$bV.$i()).$o() + ("...").$o() + (self.$bW.$i()).$o())}else{_a=("" + (self.$bV.$i()).$o() + ("..").$o() + (self.$bW.$i()).$o())};return _a},$b2: function(_d,_a){var self,_b,_c;_c=nil;self=this;if(self.$bV==null)self.$bV=nil;if(self.$bW==null)self.$bW=nil;if(self.$bX==null)self.$bX=nil;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;if((_b=_a.$Y(nil,self.$bV),_b!==false&&_b!==nil)){return false};if((_b=self.$bX,_b!==false&&_b!==nil)){_c=_a.$Y(nil,self.$bW)}else{_c=_a.$N(nil,self.$bW)};return _c}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==124))return _e.a$a;throw(_e)}}}});$g = a$d({a$j: [],a$e: $w,a$c: "NoMethodError"});$d = a$d({a$j: [],a$e: $r,a$c: "TypeError"});$E = a$d({a$j: [],a$e: $m,a$c: "Bignum",a$d: Number});$p = a$d({a$j: [$l],a$e: $k,a$f: {$b5: function(){var self,_a,_b,_c;self=this;_a=[];for(_b=1;_b<arguments.length;_b++)_a.push(arguments[_b]);;if((_b=_a.$bB().$V(nil,2).$S(nil,0),_b===false||_b===nil)){self.$j(nil,$a)};_c=self.$b();
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
      hashed_key = ":" + current_key.$C();

      // make sure that a bucket exists
      if (!items[hashed_key]) items[hashed_key] = [];

      items[hashed_key].push(current_key, current_val);
    }

    _c.a$o = items; 
    _c.a$p = nil;
    return _c;
    },$b6: function(_d,_a){var self,_b,_c;_c=nil;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;_c=_b=self.$a();return _c}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==128))return _e.a$a;throw(_e)}}},a$c: "Hash",a$h: {$y: function(){var self,_a,_c,_g;_c=_g=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a="{";_a=_a.$O(nil,self.$I(function(_b){var _d,_e;var _f=nil;(_c=a$j(_b),_d=_c[0]==null?nil:_c[0],_e=_c[1]==null?nil:_c[1],_c);_f=_d.$y().$O(nil,":").$O(nil,_e.$y());return _f}).$bK(nil,","));_a=_a.$O(nil,"}");_g=_a;return _g},$bC: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;
    if (!self.a$o)
    {
      // this is a Javascript Object, not a RubyJS Hash object.
      // we directly look the key up. it's fast but not Ruby-like,
      // so be careful!
      
      var elem = self[_a];
      return (elem == null ? nil : elem);
    }

    var hashed_key = ":" + _a.$C();
    var bucket = self.a$o[hashed_key];

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
    return self.a$p;
    }catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==125))return _c.a$a;throw(_c)}},$b3: function(){var self,_b,_f;_b=_f=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_f=self.$I(function(_a){var _c,_d;var _e=nil;(_b=a$j(_a),_c=_b[0]==null?nil:_b[0],_d=_b[1]==null?nil:_b[1],_b);_e=_c;return _e});return _f},$o: function(){var self,_a,_c,_g;_c=_g=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=[];self.$v(function(_b){var _d,_e;var _f=nil;(_c=a$j(_b),_d=_c[0]==null?nil:_c[0],_e=_c[1]==null?nil:_c[1],_c);_a.$F(nil,_d);_f=_a.$F(nil,_e);return _f});_g=_a.$bK(nil,"");return _g},$9: function(_c,_a,_b){var self;self=this;try{if(arguments.length!=3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));;
    if (!self.a$o)
    {
      // this is a Javascript Object, not a RubyJS Hash object.
      // we directly look the key up. it's fast but not Ruby-like,
      // so be careful!
      
      self[_a] = _b;
      return _b; 
    }

    var hashed_key = ":" + _a.$C();
    var bucket = self.a$o[hashed_key];

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
      self.a$o[hashed_key] = [_a, _b];
    }
    return _b;
    }catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==127))return _d.a$a;throw(_d)}},$v: function(_a){var self;self=this;try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;
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
      if (key.charAt(0) == ":")
      {
        bucket = self.a$o[key];
        for (i=0; i<bucket.length; i+=2)
        {;_a([bucket[i],bucket[i+1]]);
        }
      }
    }
    return nil;
    }catch(_b){if(_b instanceof a$c && (!_b.a$b || _b.a$b==126))return _b.a$a;throw(_b)}},$c: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;
    self.a$o = {}; 
    self.a$p = nil;
    return nil},$b4: function(){var self,_b,_f;_b=_f=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_f=self.$I(function(_a){var _c,_d;var _e=nil;(_b=a$j(_a),_c=_b[0]==null?nil:_b[0],_d=_b[1]==null?nil:_b[1],_b);_e=_d;return _e});return _f},$i: function(){var self,_a,_c,_g;_c=_g=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a="{";_a=_a.$O(nil,self.$I(function(_b){var _d,_e;var _f=nil;(_c=a$j(_b),_d=_c[0]==null?nil:_c[0],_e=_c[1]==null?nil:_c[1],_c);_f=_d.$i().$O(nil,"=>").$O(nil,_e.$i());return _f}).$bK(nil,", "));_a=_a.$O(nil,"}");_g=_a;return _g}}});$A = a$d({a$j: [],a$e: $k,a$f: {$b7: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;return new XMLHttpRequest()},$b8: function(_e,_a,_b,_c,_d){var self,_f,_g;_g=nil;self=this;_f=_e==null?nil:_e;try{if(arguments.length<3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));if(arguments.length>5)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 4)'));if(_c==null)_c=nil;if(_d==null)_d=nil;;_g=self.$b9(_f,_a,"POST",_b,_c,_d);return _g}catch(_h){if(_h instanceof a$c && (!_h.a$b || _h.a$b==129))return _h.a$a;throw(_h)}},$bw: function(_d,_a,_b,_c){var self,_e,_f;_f=nil;self=this;_e=_d==null?nil:_d;try{if(arguments.length<2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));if(arguments.length>4)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 3)'));if(_b==null)_b=nil;if(_c==null)_c=nil;;_f=self.$b9(_e,_a,"GET","",_b,_c);return _f}catch(_g){if(_g instanceof a$c && (!_g.a$b || _g.a$b==130))return _g.a$a;throw(_g)}},$b9: function(_g,_a,_b,_c,_d,_e){var self,_f;self=this;try{if(arguments.length<3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));if(arguments.length>6)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 5)'));if(_c==null)_c="";if(_d==null)_d=nil;if(_e==null)_e=nil;;_f=self.$b7();
    try {
      _f.open(_b, _a, true);
      _f.setRequestHeader("Content-Type", "text/plain; charset=utf-8");
      _f.onreadystatechange = function() {
        if (_f.readyState == 4) {
          _f.onreadystatechange = a$k; ;_g((_f.responseText || ""));}
      };
      _f.send(_c);
      return true;
    } catch (e) {
      _f.onreadystatechange = a$k;
      return false;
    } }catch(_h){if(_h instanceof a$c && (!_h.a$b || _h.a$b==131))return _h.a$a;throw(_h)}}},a$c: "HTTPRequest"});      $b.a$e = $k;
var a$l = [$i,$k,$l,$m,$n,$q,$f,$r,$c,$s,$h,$t,$u,$v,$j,$x,$w,$y,$z,$a,$B,$o,$b,$e,$C,$D,$g,$d,$E,$p,$A];
a$m(a$l);
for (var i=0; i<a$l.length; i++) a$n(a$l[i]);
function main() { return $B.$bv.apply($B, arguments); }