// declare nil
function NilClass() {}

// FIXME: remove
NilClass.prototype.toString = function() { return "nil"; };
nil = new NilClass();

//
// define a null-function (used by HTTPRequest)
//
function a$o()
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
function a$p(x) { throw(x); }

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
    m = k.a$i;
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
a$a.$C = function() { return this; };
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
  
  var m = obj.$q;

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
var a$h = {"$x":"puts","$a_":"addMouseWheelListener","$cd":"getClientY","$cT":"createTD","$bT":"checkWidgetParent","$I":"get","$c9":"getChild","$cs":"setInnerHTML","$bC":"to_i","$cn":"getTarget","$ca":"getCtrlKey","$b2":"sub","$cX":"createInputCheck","$bI":"pop","$_":"setTitle","$ad":"getStyleElement","$cf":"getToElement","$dd":"getPropertyBoolean","$c2":"createTH","$bh":"last","$at":"getEventsSunk","$c3":"getChildIndex","$cZ":"createForm","$N":"<<","$s":"__send","$K":"addClickListener","$cp":"getButton","$ac":"isVisible","$h":"kind_of?","$cR":"setOptionText","$p":"instance_of?","$bn":"<=","$aS":"onLoad","$l":"mapEvent","$c4":"createCol","$cH":"windowGetClientWidth","$bK":"push","$bj":"exclude_end?","$bc":"onClick","$be":"removeMouseListener","$8":"message","$M":"collect","$ag":"setStyleAttribute","$aA":"getOffsetWidth","$ct":"getElementById","$c5":"createIFrame","$r":"to_s","$G":"main","$bW":"changeToStaticPositioning","$Y":"values","$cm":"getAltKey","$cA":"createInputText","$ab":"removeAttribute","$k":"getType","$ah":"removeStyleName","$cI":"createCaption","$cG":"createTR","$b4":"ljust","$bX":"getWidgetTop","$aW":"isAttached","$bo":"end","$cc":"preventDefault","$v":"proc","$c_":"getCapture","$b7":"match","$u":"respond_to?","$bZ":"setWidgetPosition","$cC":"getStyleAttributeInt","$cx":"compare","$bE":"size","$cv":"releaseCapture","$A":"loop","$cq":"getRepeat","$$":"setAttribute","$am":"setProperty","$E":"hash","$cu":"getNextSibling","$aj":"getAbsoluteLeft","$cJ":"setImgSrc","$e":"name","$Q":"map","$a8":"setText","$X":"[]=","$av":"getPropertyInt","$bM":"reverse!","$aP":"setLayoutData","$aV":"setParent","$ce":"setKeyCode","$bx":"^","$ci":"dispatch","$aQ":"onAttach","$4":"new_from_jsobject","$O":"call","$df":"getStyleAttributeBoolean","$a7":"getInnerText","$bu":">=","$cg":"getMetaKey","$cl":"getMouseWheelVelocityY","$bz":"+@","$cO":"windowGetClientHeight","$b6":"gsub","$ar":"sinkEvents","$c1":"createLabel","$bd":"addMouseListener","$0":"new_from_key_value_list","$b_":"getScreenX","$aL":"onUnload","$aZ":"setWordWrap","$a$":"createDiv","$bQ":"disown","$bP":"appendChild","$b8":"getBodyElement","$co":"getShiftKey","$o":"empty?","$bL":"unshift","$bt":"downto","$b$":"getScreenY","$da":"createTable","$bb":"removeClickListener","$d":"__invoke","$U":"keys","$aR":"setEventListener","$b5":"index","$ck":"getTypeString","$b":"allocate","$2":"%","$bH":"each_with_index","$al":"strip","$a":"new","$aF":"&","$z":"send","$cN":"createFieldSet","$bS":"getWidgetLeft","$a5":"getStyleAttribute","$bl":"include?","$bF":"reverse","$bY":"setWidgetPositionToStatic","$cF":"getImgSrc","$aI":"setPixelSize","$a9":"setInnerText","$bA":"*","$Z":"+","$a2":"delete","$f":"===","$cU":"createInputPassword","$c":"initialize","$aE":"unsinkEvents","$m":"raise","$a0":"removeMouseWheelListener","$y":"each","$dc":"getChildCount","$cK":"createTBody","$bv":"-","$dg":"insertChild","$W":"join","$aC":"setElement","$ak":"getProperty","$L":"times","$q":"method_missing","$C":"class","$cj":"toString","$a4":"getWordWrap","$bw":"/","$aT":"getParent","$w":"p","$au":"getOffsetHeight","$bO":"adopt","$cW":"createTFoot","$cD":"createInputRadio","$i":"inspect","$de":"createSpan","$a6":"getText","$bV":"addStatic","$c$":"isOrHasChild","$bk":"begin","$az":"getElement","$cy":"createColGroup","$aY":"remove","$bq":"succ","$B":"is_a?","$ch":"getKeyCode","$bG":"clear","$af":"setHeight","$3":"==","$cQ":"insertBefore","$bJ":"to_ary","$cM":"createLegend","$cB":"createInput","$c8":"createImg","$cY":"getAttribute","$aX":"removeFromParent","$aJ":"onDetach","$aB":"setStyleName","$bD":"to_splat","$ax":"getTitle","$c0":"createButton","$ay":"getStyleName","$by":"-@","$P":"find_all","$bN":"dup","$br":"member?","$cS":"getInnerHTML","$F":"method","$j":"onBrowserEvent","$b0":"setAbsolutePixelPosition","$V":"[]","$H":"__init","$S":"reject","$cE":"setCapture","$D":"tap","$T":"select","$cr":"getFromElement","$ap":"setSize","$cV":"createTextArea","$R":"to_a","$as":"|","$b3":"rjust","$db":"createTHead","$c6":"createOptions","$ao":"first","$bm":"<","$b1":"addPositioned","$1":"length","$c7":"createAnchor","$cP":"getFirstChild","$aN":"getLayoutData","$ai":"styleNameHelper","$bR":"removeChild","$aD":"replace","$aG":"~","$ae":"getAbsoluteTop","$an":"split","$dh":"createSelect","$cL":"scrollIntoView","$aH":"setVisible","$bp":">","$g":"eql?","$aq":"setWidth","$J":"add","$bs":"upto","$cz":"createElement","$t":"nil?","$aM":"removeEventListener","$aw":"addStyleName","$n":"shift","$cb":"getClientX","$bB":"to_f"};
var a$f = {};
for (var i in a$h) a$f[a$h[i]] = i;
$b = a$d({a$e: nil,a$f: {$a: function(_e,_a,_b,_c){var self,_d;self=this;try{if(arguments.length<3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));if(arguments.length>4)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 3)'));if(_c==null)_c=nil;;if((_d=_c,_d===false||_d===nil)){_c=(function() {})};return new self.a$d($b, _a, _b, _c);}catch(_f){if(_f instanceof a$c && (!_f.a$b || _f.a$b==2))return _f.a$a;throw(_f)}}},a$c: "Class",a$g: new a$a(a$a, nil, "Class", a$a),a$h: {$e: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;return self.a$c},$a: function(_c){var self,_a,_b,_d,_e,_f;_f=nil;self=this;_d=_c==null?nil:_c;try{_a=[];for(_b=1;_b<arguments.length;_b++)_a.push(arguments[_b]);;_e=self.$b();_e.$d(_d,'$c',a$b(_a));_f=_e;return _f}catch(_g){if(_g instanceof a$c && (!_g.a$b || _g.a$b==0))return _g.a$a;throw(_g)}},$f: function(_d,_a){var self,_b,_c;_c=nil;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;_c=(_b=self.$g(nil,_a), (_b!==false&&_b!==nil) ? _b : (_a.$h(nil,self)));return _c}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==1))return _e.a$a;throw(_e)}},$b: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;return (new self.a$d())},$i: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;return self.a$c}}});a$e($b);$d = a$d({a$i: [],a$e: nil,a$c: "EventDispatchMap",a$h: {$j: function(_c,_a){var self,_b;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;_b=$c.$k(nil,_a);
    var cb = self[_b];
    if (cb) cb.apply(self, [nil, _a]);
    return nil
    }catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==3))return _d.a$a;throw(_d)}},$l: function(_c,_a,_b){var self;self=this;try{if(arguments.length!=3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));;self[_a] = _b}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==4))return _d.a$a;throw(_d)}}}});$k = a$d({a$i: [],a$e: nil,a$c: "Kernel",a$h: {$s: function(_d,_a){var self,_b,_c,_e;self=this;_e=_d==null?nil:_d;try{if(arguments.length<2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));_b=[];for(_c=2;_c<arguments.length;_c++)_b.push(arguments[_c]);;
    var m = self[a$f[_a]];
    if (m) 
      return m.apply(self, [_e].concat(_b));
    else
      return self.$q.apply(self, [_e].concat([_a]).concat(_b));}catch(_f){if(_f instanceof a$c && (!_f.a$b || _f.a$b==6))return _f.a$a;throw(_f)}},$q: function(_d,_a){var self,_b,_c,_e,_f;_f=nil;self=this;_e=_d==null?nil:_d;try{if(arguments.length<2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));_b=[];for(_c=2;_c<arguments.length;_c++)_b.push(arguments[_c]);;_f=self.$m(nil,$i,("undefined method `" + (_a).$r() + ("' for ").$r() + (self.$i()).$r()));return _f}catch(_g){if(_g instanceof a$c && (!_g.a$b || _g.a$b==5))return _g.a$a;throw(_g)}},$m: function(){var self,_a,_b,_c,_d;self=this;_a=[];for(_b=1;_b<arguments.length;_b++)_a.push(arguments[_b]);;_c=((_b=_a.$o(),_b!==false&&_b!==nil)?$e.$a(nil,""):(_d=_a.$n(),((_b=_d.$h(nil,$b),_b!==false&&_b!==nil)?_d.$d(nil,'$a',a$b(_a)):((_b=_d.$p(nil,$h),_b!==false&&_b!==nil)?((_b=_a.$o(),_b!==false&&_b!==nil)?_d:$a.$a(nil,"to many arguments given to raise")):((_b=_d.$p(nil,$g),_b!==false&&_b!==nil)?((_b=_a.$o(),_b!==false&&_b!==nil)?$e.$a(nil,_d):$a.$a(nil,"to many arguments given to raise")):$f.$a(nil,"exception class/object expected"))))));throw(_c)},$t: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=false;return _a},$v: function(_a){var self,_b,_c;_c=nil;self=this;_b=_a==null?nil:_a;try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_c=$j.$a(_b);return _c}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==8))return _d.a$a;throw(_d)}},$u: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;
    var m = a$f[_a]; 
    return (m !== undefined && self[m] !== undefined && !self[m].a$j)}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==7))return _c.a$a;throw(_c)}},$w: function(){var self,_a,_b,_f;_f=nil;self=this;_a=[];for(_b=1;_b<arguments.length;_b++)_a.push(arguments[_b]);;_a.$y(function(_c){var _d;var _e=nil;_d=_c==null?nil:_c;_e=self.$x(nil,_d.$i());return _e});_f=nil;return _f},$d: function(_c,_a,_b){var self,_d;self=this;_d=_c==null?nil:_c;try{if(arguments.length!=3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));;
    var m = self[_a];
    if (m)
      return m.apply(self, [_d].concat(_b));
    else
      return self.$q.apply(self, 
        [_d].concat([a$h[_a]]).concat(_b));}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==9))return _e.a$a;throw(_e)}},$A: function(_a){var self,_b;_b=nil;self=this;try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;while(true){_a()};_b=nil;;return _b}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==12))return _c.a$a;throw(_c)}},$x: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;_a=_a.$r();alert(_a); return nil}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==11))return _c.a$a;throw(_c)}},$z: function(_d,_a){var self,_b,_c,_e;self=this;_e=_d==null?nil:_d;try{if(arguments.length<2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));_b=[];for(_c=2;_c<arguments.length;_c++)_b.push(arguments[_c]);;
    var m = self[a$f[_a]];
    if (m) 
      return m.apply(self, [_e].concat(_b));
    else
      return self.$q.apply(self, [_e].concat([_a]).concat(_b));}catch(_f){if(_f instanceof a$c && (!_f.a$b || _f.a$b==10))return _f.a$a;throw(_f)}}}});$m = a$d({a$i: [$k],a$e: nil,a$c: "Object",a$h: {$h: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;return a$i(self, _a)}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==13))return _c.a$a;throw(_c)}},$B: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;return a$i(self, _a)}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==14))return _c.a$a;throw(_c)}},$C: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;return self.a$g},$g: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;return (self.constructor == _a.constructor && self == _a)}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==15))return _c.a$a;throw(_c)}},$E: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;return self.toString()},$D: function(_a){var self,_b;_b=nil;self=this;try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a(self);_b=self;return _b}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==16))return _c.a$a;throw(_c)}},$r: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;return self.toString()},$c: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=nil;return _a},$F: function(_c,_a){var self,_b;_b=nil;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;_b=$l.$a(nil,self,_a);return _b}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==17))return _d.a$a;throw(_d)}},$f: function(_d,_a){var self,_b,_c;_c=nil;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;_c=(_b=self.$g(nil,_a), (_b!==false&&_b!==nil) ? _b : (self.$h(nil,_a)));return _c}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==18))return _e.a$a;throw(_e)}},$p: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;return (self.a$g === _a)}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==19))return _c.a$a;throw(_c)}},$i: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;return self.toString()}}});$r = a$d({a$i: [],a$e: $m,a$f: {$G: function(){var self,_a,_e;_e=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;$c.$H();$n.$I().$J(nil,$o.$a());_a=$p.$a();_e=(10).$L(function(){var _c;var _d=nil;;_c=$q.$a(nil,"XXX");_c.$K(nil,_a);_d=$n.$I().$J(nil,_c);return _d});return _e}},a$c: "Main"});$s = a$d({a$i: [],a$e: nil,a$c: "Enumerable",a$h: {$M: function(_a){var self,_b,_c,_f,_h;_h=nil;self=this;_b=_a==null?nil:_a;try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_c=[];self.$y(function(_d){var _e;var _g=nil;_e=_d==null?nil:_d;_g=_c.$N(nil,((_f=_b,_f!==false&&_f!==nil)?_b.$O(nil,_e):_e));return _g});_h=_c;return _h}catch(_i){if(_i instanceof a$c && (!_i.a$b || _i.a$b==20))return _i.a$a;throw(_i)}},$P: function(_f){var self,_a,_e,_g;_g=nil;self=this;try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=[];self.$y(function(_b){var _c;var _d=nil;_c=_b==null?nil:_b;if((_e=_f(_c),_e!==false&&_e!==nil)){_d=_a.$N(nil,_c)}else{_d=nil};return _d});_g=_a;return _g}catch(_h){if(_h instanceof a$c && (!_h.a$b || _h.a$b==21))return _h.a$a;throw(_h)}},$Q: function(_a){var self,_b,_c,_f,_h;_h=nil;self=this;_b=_a==null?nil:_a;try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_c=[];self.$y(function(_d){var _e;var _g=nil;_e=_d==null?nil:_d;_g=_c.$N(nil,((_f=_b,_f!==false&&_f!==nil)?_b.$O(nil,_e):_e));return _g});_h=_c;return _h}catch(_i){if(_i instanceof a$c && (!_i.a$b || _i.a$b==22))return _i.a$a;throw(_i)}},$R: function(){var self,_a,_e;_e=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=[];self.$y(function(_b){var _c;var _d=nil;_c=_b==null?nil:_b;_d=_a.$N(nil,_c);return _d});_e=_a;return _e},$S: function(_f){var self,_a,_e,_g;_g=nil;self=this;try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=[];self.$y(function(_b){var _c;var _d=nil;_c=_b==null?nil:_b;if((_e=_f(_c),_e===false||_e===nil)){_d=_a.$N(nil,_c)}else{_d=nil};return _d});_g=_a;return _g}catch(_h){if(_h instanceof a$c && (!_h.a$b || _h.a$b==23))return _h.a$a;throw(_h)}},$T: function(_f){var self,_a,_e,_g;_g=nil;self=this;try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=[];self.$y(function(_b){var _c;var _d=nil;_c=_b==null?nil:_b;if((_e=_f(_c),_e!==false&&_e!==nil)){_d=_a.$N(nil,_c)}else{_d=nil};return _d});_g=_a;return _g}catch(_h){if(_h instanceof a$c && (!_h.a$b || _h.a$b==24))return _h.a$a;throw(_h)}}}});$t = a$d({a$i: [$s],a$e: $m,a$f: {$0: function(){var self,_a,_b,_c;self=this;_a=[];for(_b=1;_b<arguments.length;_b++)_a.push(arguments[_b]);;if((_b=_a.$1().$2(nil,2).$3(nil,0),_b===false||_b===nil)){self.$m(nil,$a)};_c=self.$b();
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
      hashed_key = ":" + current_key.$E();

      // make sure that a bucket exists
      if (!items[hashed_key]) items[hashed_key] = [];

      items[hashed_key].push(current_key, current_val);
    }

    _c.a$k = items; 
    _c.a$l = nil;
    return _c;
    },$4: function(_d,_a){var self,_b,_c;_c=nil;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;_c=_b=self.$a();return _c}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==28))return _e.a$a;throw(_e)}}},a$c: "Hash",a$h: {$V: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;
    if (!self.a$k)
    {
      // this is a Javascript Object, not a RubyJS Hash object.
      // we directly look the key up. it's fast but not Ruby-like,
      // so be careful!
      
      var elem = self[_a];
      return (elem == null ? nil : elem);
    }

    var hashed_key = ":" + _a.$E();
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
    }catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==25))return _c.a$a;throw(_c)}},$U: function(){var self,_b,_f;_b=_f=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_f=self.$Q(function(_a){var _c,_d;var _e=nil;(_b=a$j(_a),_c=_b[0]==null?nil:_b[0],_d=_b[1]==null?nil:_b[1],_b);_e=_c;return _e});return _f},$r: function(){var self,_a,_c,_g;_c=_g=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=[];self.$y(function(_b){var _d,_e;var _f=nil;(_c=a$j(_b),_d=_c[0]==null?nil:_c[0],_e=_c[1]==null?nil:_c[1],_c);_a.$N(nil,_d);_f=_a.$N(nil,_e);return _f});_g=_a.$W(nil,"");return _g},$X: function(_c,_a,_b){var self;self=this;try{if(arguments.length!=3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));;
    if (!self.a$k)
    {
      // this is a Javascript Object, not a RubyJS Hash object.
      // we directly look the key up. it's fast but not Ruby-like,
      // so be careful!
      
      self[_a] = _b;
      return _b; 
    }

    var hashed_key = ":" + _a.$E();
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
    }catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==27))return _d.a$a;throw(_d)}},$y: function(_a){var self;self=this;try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;
    if (!self.a$k)
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
    for (key in self.a$k)
    {
      if (key.charAt(0) == ":")
      {
        bucket = self.a$k[key];
        for (i=0; i<bucket.length; i+=2)
        {;_a([bucket[i],bucket[i+1]]);
        }
      }
    }
    return nil;
    }catch(_b){if(_b instanceof a$c && (!_b.a$b || _b.a$b==26))return _b.a$a;throw(_b)}},$c: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;
    self.a$k = {}; 
    self.a$l = nil;
    return nil},$Y: function(){var self,_b,_f;_b=_f=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_f=self.$Q(function(_a){var _c,_d;var _e=nil;(_b=a$j(_a),_c=_b[0]==null?nil:_b[0],_d=_b[1]==null?nil:_b[1],_b);_e=_d;return _e});return _f},$i: function(){var self,_a,_c,_g;_c=_g=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a="{";_a=_a.$Z(nil,self.$Q(function(_b){var _d,_e;var _f=nil;(_c=a$j(_b),_d=_c[0]==null?nil:_c[0],_e=_c[1]==null?nil:_c[1],_c);_f=_d.$i().$Z(nil,"=>").$Z(nil,_e.$i());return _f}).$W(nil,", "));_a=_a.$Z(nil,"}");_g=_a;return _g}}});$l = a$d({a$i: [],a$e: $m,a$c: "Method",a$h: {$c: function(_f,_a,_b){var self,_c,_d,_e;_e=nil;self=this;try{if(arguments.length!=3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));;(_c=[_a,_b],self.$5=_c[0]==null?nil:_c[0],self.$6=_c[1]==null?nil:_c[1],_c);_d=nil;_d = _a[a$f[_b]];
    if (_d==null) _d = nil;;if((_c=_d,_c!==false&&_c!==nil)){_e=self.$7=_d}else{_e=self.$m(nil,$u,("undefined method `" + (_b).$r() + ("' for class `").$r() + (_a.$C().$e()).$r() + ("'").$r()))};return _e}catch(_g){if(_g instanceof a$c && (!_g.a$b || _g.a$b==29))return _g.a$a;throw(_g)}},$O: function(_c){var self,_a,_b,_d;self=this;_d=_c==null?nil:_c;try{_a=[];for(_b=1;_b<arguments.length;_b++)_a.push(arguments[_b]);;return self.$7.apply(self.$5, [_d].concat(_a))}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==30))return _e.a$a;throw(_e)}},$i: function(){var self,_a;_a=nil;self=this;if(self.$5==null)self.$5=nil;if(self.$6==null)self.$6=nil;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=("#<Method: " + (self.$5.$C().$e()).$r() + ("#").$r() + (self.$6).$r() + (">").$r());return _a}}});$h = a$d({a$i: [],a$e: $m,a$c: "Exception",a$h: {$8: function(){var self,_a;_a=nil;self=this;if(self.$9==null)self.$9=nil;_a=self.$9;return _a},$r: function(){var self,_a;_a=nil;self=this;if(self.$9==null)self.$9=nil;_a=self.$9;return _a},$c: function(_d,_a){var self,_c,_b;_b=nil;self=this;try{if(arguments.length>2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));if(_a==null)_a=nil;;if((_c=_a.$t(),_c!==false&&_c!==nil)){_b=self.$9=self.$C().$e()}else{_b=self.$9=_a};return _b}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==31))return _e.a$a;throw(_e)}},$i: function(){var self,_a;_a=nil;self=this;if(self.$9==null)self.$9=nil;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=("#<" + (self.$C().$e()).$r() + (": ").$r() + (self.$9).$r() + (">").$r());return _a}}});$v = a$d({a$i: [],a$e: $h,a$c: "StandardError"});$u = a$d({a$i: [],a$e: $v,a$c: "NameError"});$x = a$d({a$i: [],a$e: $m,a$c: "UIObject",a$h: {$_: function(_d,_a){var self,_c,_b;_b=nil;self=this;if(self.$aa==null)self.$aa=nil;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;if((_c=_a,_c!==false&&_c!==nil)){_b=$w.$$(nil,self.$aa,"title",_a)}else{_b=$w.$ab(nil,self.$aa,"title")};return _b}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==32))return _e.a$a;throw(_e)}},$ae: function(){var self,_a;_a=nil;self=this;if(self.$aa==null)self.$aa=nil;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=$w.$ae(nil,self.$aa);return _a},$ad: function(){var self;self=this;if(self.$aa==null)self.$aa=nil;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;return self.$aa},$ac: function(){var self,_a;_a=nil;self=this;if(self.$aa==null)self.$aa=nil;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=$w.$ac(nil,self.$aa);return _a},$aj: function(){var self,_a;_a=nil;self=this;if(self.$aa==null)self.$aa=nil;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=$w.$aj(nil,self.$aa);return _a},$ah: function(_c,_a){var self,_b;_b=nil;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;_b=self.$ai(nil,(3),_a);return _b}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==34))return _d.a$a;throw(_d)}},$af: function(_c,_a){var self,_b;_b=nil;self=this;if(self.$aa==null)self.$aa=nil;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;_b=$w.$ag(nil,self.$aa,"height",_a);return _b}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==33))return _d.a$a;throw(_d)}},$ap: function(_d,_a,_b){var self,_c;_c=nil;self=this;try{if(arguments.length!=3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));;self.$aq(nil,_a);_c=self.$af(nil,_b);return _c}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==36))return _e.a$a;throw(_e)}},$ai: function(_k,_a,_b){var self,_c,_d,_e,_f,_g,_h,_i,_j;_j=nil;self=this;try{if(arguments.length<2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));if(arguments.length>3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));if(_b==null)_b=nil;;if((_c=_d=self.$ad(),_c===false||_c===nil)){self.$m(nil,"Null widget handle!")};_e=$w.$ak(nil,_d,"className").$al();if((_c=_e.$o(),_c!==false&&_c!==nil)){_e="rwt-nostyle";$w.$am(nil,_d,"className",_e)};if((_c=_a.$3(nil,(0)),_c===false||_c===nil)){_b=_b.$al();if((_c=_b.$o(),_c!==false&&_c!==nil)){self.$m(nil,"Style names cannot be empty")}};_f=_e.$an(nil," ");_g=_f.$ao();if((_c=_a.$3(nil,(0)),_c!==false&&_c!==nil)){return _g};if((_c=(_h=_a.$3(nil,(3)), (_h!==false&&_h!==nil) ? (_g.$3(nil,_b)) : _h),_c!==false&&_c!==nil)){self.$m(nil,"Cannot remove primary style name")};_i=[];var e, s;
    for (var i=0; i<_f.length; i++)
    {
      e = _f[i];
      if (e == '') continue;
      
      if (_a == (1))
      {
        // set primary name -> update all dependent style names
        if (e.indexOf(_g) != 0)
        {
          // +e+ doesnt start with the old primary style name 
          // -> we dont touch it and keep it!
          s = e;
        }
        else 
        {
          // replace +primary+ with +style+ 
          s = _b + e.substring(_g.length);
        }
      }
      else /* MODE_ADD or MODE_REM */
      {
        // remove the style. in case of MODE_ADD, we add it back later!
        s = (e == _b) ? null : e; 
      }
      
      if (s) _i.push(s);
    }

    if (_a == (2))
    {
      _i.push(_b);
    }

    _i = _i.join(" ");;_j=$w.$am(nil,_d,"className",_i);return _j}catch(_l){if(_l instanceof a$c && (!_l.a$b || _l.a$b==35))return _l.a$a;throw(_l)}},$aq: function(_c,_a){var self,_b;_b=nil;self=this;if(self.$aa==null)self.$aa=nil;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;_b=$w.$ag(nil,self.$aa,"width",_a);return _b}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==37))return _d.a$a;throw(_d)}},$r: function(){var self,_b,_a;_a=nil;self=this;if(self.$aa==null)self.$aa=nil;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;if((_b=self.$aa,_b!==false&&_b!==nil)){_a=$w.$r(nil,self.$aa)}else{_a="(null handle)"};return _a},$aw: function(_c,_a){var self,_b;_b=nil;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;_b=self.$ai(nil,(2),_a);return _b}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==39))return _d.a$a;throw(_d)}},$au: function(){var self,_a;_a=nil;self=this;if(self.$aa==null)self.$aa=nil;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=$w.$av(nil,self.$aa,"offsetHeight");return _a},$ar: function(_c,_a){var self,_b;_b=nil;self=this;if(self.$aa==null)self.$aa=nil;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;_b=$w.$ar(nil,self.$aa,_a.$as(nil,$w.$at(nil,self.$aa)));return _b}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==38))return _d.a$a;throw(_d)}},$az: function(){var self,_a;_a=nil;self=this;if(self.$aa==null)self.$aa=nil;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self.$aa;return _a},$ay: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self.$ai(nil,(0));return _a},$ax: function(){var self,_a;_a=nil;self=this;if(self.$aa==null)self.$aa=nil;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=$w.$ak(nil,self.$aa,"title");return _a},$aA: function(){var self,_a;_a=nil;self=this;if(self.$aa==null)self.$aa=nil;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=$w.$av(nil,self.$aa,"offsetWidth");return _a},$aC: function(_d,_a){var self,_b,_c;_c=nil;self=this;if(self.$aa==null)self.$aa=nil;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;if((_b=self.$aa,_b!==false&&_b!==nil)){$w.$aD(nil,self.$aa,_a)};_c=self.$aa=_a;return _c}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==41))return _e.a$a;throw(_e)}},$aB: function(_c,_a){var self,_b;_b=nil;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;_b=self.$ai(nil,(1),_a);return _b}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==40))return _d.a$a;throw(_d)}},$aI: function(_d,_a,_b){var self,_c;_c=nil;self=this;try{if(arguments.length!=3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));;self.$aq(nil,_a.$Z(nil,"px"));_c=self.$af(nil,_b.$Z(nil,"px"));return _c}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==44))return _e.a$a;throw(_e)}},$aH: function(_c,_a){var self,_b;_b=nil;self=this;if(self.$aa==null)self.$aa=nil;try{if(arguments.length>2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));if(_a==null)_a=true;;_b=$w.$aH(nil,self.$aa,_a);return _b}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==43))return _d.a$a;throw(_d)}},$aE: function(_c,_a){var self,_b;_b=nil;self=this;if(self.$aa==null)self.$aa=nil;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;_b=$w.$ar(nil,self.$aa,$w.$at(nil,self.$aa).$aF(nil,_a.$aG()));return _b}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==42))return _d.a$a;throw(_d)}}}});$y = a$d({a$i: [],a$e: $x,a$c: "Widget",a$h: {$aJ: function(){var self,_a,_b;_b=nil;self=this;if(self.$aK==null)self.$aK=nil;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;if((_a=self.$aK,_a===false||_a===nil)){self.$m(nil,"cannot detached unattached widget")};self.$aL();self.$aK=false;_b=$w.$aM(nil,self.$az());return _b},$aN: function(){var self,_a;_a=nil;self=this;if(self.$aO==null)self.$aO=nil;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self.$aO;return _a},$aT: function(){var self,_a;_a=nil;self=this;if(self.$aU==null)self.$aU=nil;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self.$aU;return _a},$aQ: function(){var self,_a,_b;_b=nil;self=this;if(self.$aK==null)self.$aK=nil;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;if((_a=self.$aK,_a!==false&&_a!==nil)){self.$m(nil,"already attached")};self.$aK=true;$w.$aR(nil,self.$az(),self);_b=self.$aS();return _b},$aP: function(_c,_a){var self,_b;_b=nil;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;_b=self.$aO=_a;return _b}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==45))return _d.a$a;throw(_d)}},$aV: function(_f,_a){var self,_b,_d,_e,_c;_c=nil;self=this;if(self.$aU==null)self.$aU=nil;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;_b=self.$aU;self.$aU=_a;if((_d=_a.$t(),_d!==false&&_d!==nil)){if((_d=(_e=_b, (_e!==false&&_e!==nil) ? (_b.$aW()) : _e),_d!==false&&_d!==nil)){_c=self.$aJ()}else{_c=nil}}else{if((_d=_a.$aW(),_d!==false&&_d!==nil)){_c=self.$aQ()}else{_c=nil}};return _c}catch(_g){if(_g instanceof a$c && (!_g.a$b || _g.a$b==46))return _g.a$a;throw(_g)}},$j: function(_c,_a){var self,_b;_b=nil;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;_b=nil;return _b}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==47))return _d.a$a;throw(_d)}},$aX: function(){var self,_b,_a;_a=nil;self=this;if(self.$aU==null)self.$aU=nil;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;if((_b=self.$aU,_b!==false&&_b!==nil)){_a=self.$aU.$aY(nil,self)}else{_a=nil};return _a},$aW: function(){var self,_a;_a=nil;self=this;if(self.$aK==null)self.$aK=nil;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self.$aK;return _a},$aL: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=nil;return _a},$aC: function(_d,_a){var self,_b,_c;_c=nil;self=this;if(self.$aK==null)self.$aK=nil;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;if((_b=self.$aK,_b!==false&&_b!==nil)){$w.$aM(nil,self.$az())};a$k(self,'$aC',nil,[_a]);if((_b=self.$aK,_b!==false&&_b!==nil)){_c=$w.$aR(nil,_a,self)}else{_c=nil};return _c}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==48))return _e.a$a;throw(_e)}},$aS: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=nil;return _a}}});$q = a$d({a$i: [],a$e: $y,a$c: "Label",a$h: {$aZ: function(_d,_a){var self,_b,_c;_c=nil;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;_c=$w.$ag(nil,self.$az(),"whiteSpace",((_b=_a,_b!==false&&_b!==nil)?"normal":"nowrap"));return _c}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==49))return _e.a$a;throw(_e)}},$a6: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=$w.$a7(nil,self.$az());return _a},$a4: function(){var self,_a,_b;_b=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_b=(_a=$w.$a5(nil,self.$az(),"whiteSpace").$3(nil,"nowrap"),_a===false||_a===nil);return _b},$a0: function(_d,_a){var self,_c,_b;_b=nil;self=this;if(self.$a3==null)self.$a3=nil;if(self.$a1==null)self.$a1=nil;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;if((_c=self.$a3,_c!==false&&_c!==nil)){_b=self.$a1.$a2(nil,_a)}else{_b=nil};return _b}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==50))return _e.a$a;throw(_e)}},$a_: function(_d,_a){var self,_b,_c;_c=nil;self=this;if(self.$a3==null)self.$a3=nil;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;self.$a3=(_b=self.$a3, (_b!==false&&_b!==nil) ? _b : ([]));_c=self.$a3.$N(nil,_a);return _c}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==52))return _e.a$a;throw(_e)}},$a8: function(_c,_a){var self,_b;_b=nil;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;_b=$w.$a9(nil,self.$az(),_a);return _b}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==51))return _d.a$a;throw(_d)}},$K: function(_d,_a){var self,_b,_c;_c=nil;self=this;if(self.$ba==null)self.$ba=nil;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;self.$ba=(_b=self.$ba, (_b!==false&&_b!==nil) ? _b : ([]));_c=self.$ba.$N(nil,_a);return _c}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==54))return _e.a$a;throw(_e)}},$c: function(_e,_a,_b){var self,_c,_d;_d=nil;self=this;try{if(arguments.length>3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));if(_a==null)_a=nil;if(_b==null)_b=nil;;self.$aC(nil,$w.$a$());self.$ar(nil,(1).$as(nil,(124)).$as(nil,(131072)));self.$aB(nil,"rwt-Label");if((_c=_a,_c!==false&&_c!==nil)){self.$a8(nil,_a)};if((_c=_b.$t(),_c===false||_c===nil)){_d=self.$aZ(nil,_b)}else{_d=nil};return _d}catch(_f){if(_f instanceof a$c && (!_f.a$b || _f.a$b==53))return _f.a$a;throw(_f)}},$bd: function(_d,_a){var self,_b,_c;_c=nil;self=this;if(self.$a1==null)self.$a1=nil;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;self.$a1=(_b=self.$a1, (_b!==false&&_b!==nil) ? _b : ([]));_c=self.$a1.$N(nil,_a);return _c}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==57))return _e.a$a;throw(_e)}},$j: function(_h,_a){var self,_b,_g,_f;_f=nil;self=this;if(self.$ba==null)self.$ba=nil;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;_b=$c.$k(nil,_a);if((_g=_b.$3(nil,(1)),_g!==false&&_g!==nil)){if((_g=self.$ba,_g!==false&&_g!==nil)){_f=self.$ba.$y(function(_c){var _d;var _e=nil;_d=_c==null?nil:_c;_e=_d.$bc(nil,self);return _e})}else{_f=nil}}else{_f=nil};return _f}catch(_i){if(_i instanceof a$c && (!_i.a$b || _i.a$b==56))return _i.a$a;throw(_i)}},$bb: function(_d,_a){var self,_c,_b;_b=nil;self=this;if(self.$ba==null)self.$ba=nil;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;if((_c=self.$ba,_c!==false&&_c!==nil)){_b=self.$ba.$a2(nil,_a)}else{_b=nil};return _b}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==55))return _e.a$a;throw(_e)}},$be: function(_d,_a){var self,_c,_b;_b=nil;self=this;if(self.$a1==null)self.$a1=nil;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;if((_c=self.$a1,_c!==false&&_c!==nil)){_b=self.$a1.$a2(nil,_a)}else{_b=nil};return _b}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==58))return _e.a$a;throw(_e)}}}});$z = a$d({a$i: [],a$e: $m,a$c: "Range",a$h: {$3: function(_e,_a){var self,_b,_c,_d;_d=nil;self=this;if(self.$bi==null)self.$bi=nil;if(self.$bf==null)self.$bf=nil;if(self.$bg==null)self.$bg=nil;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;if (self.constructor != _a.constructor) return false;;_d=(_b=self.$bf.$3(nil,_a.$ao()), (_b!==false&&_b!==nil) ? ((_c=self.$bg.$3(nil,_a.$bh()), (_c!==false&&_c!==nil) ? (self.$bi.$3(nil,_a.$bj())) : _c)) : _b);return _d}catch(_f){if(_f instanceof a$c && (!_f.a$b || _f.a$b==59))return _f.a$a;throw(_f)}},$bk: function(){var self,_a;_a=nil;self=this;if(self.$bf==null)self.$bf=nil;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self.$bf;return _a},$g: function(_e,_a){var self,_b,_c,_d;_d=nil;self=this;if(self.$bi==null)self.$bi=nil;if(self.$bf==null)self.$bf=nil;if(self.$bg==null)self.$bg=nil;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;if (self.constructor != _a.constructor) return false;;_d=(_b=self.$bf.$g(nil,_a.$ao()), (_b!==false&&_b!==nil) ? ((_c=self.$bg.$g(nil,_a.$bh()), (_c!==false&&_c!==nil) ? (self.$bi.$3(nil,_a.$bj())) : _c)) : _b);return _d}catch(_f){if(_f instanceof a$c && (!_f.a$b || _f.a$b==60))return _f.a$a;throw(_f)}},$bj: function(){var self,_a;_a=nil;self=this;if(self.$bi==null)self.$bi=nil;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self.$bi;return _a},$bh: function(){var self,_a;_a=nil;self=this;if(self.$bg==null)self.$bg=nil;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self.$bg;return _a},$r: function(){var self,_b,_a;_a=nil;self=this;if(self.$bi==null)self.$bi=nil;if(self.$bf==null)self.$bf=nil;if(self.$bg==null)self.$bg=nil;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;if((_b=self.$bi,_b!==false&&_b!==nil)){_a=("" + (self.$bf).$r() + ("...").$r() + (self.$bg).$r())}else{_a=("" + (self.$bf).$r() + ("..").$r() + (self.$bg).$r())};return _a},$y: function(_c){var self,_a,_b,_d;_d=nil;self=this;if(self.$bi==null)self.$bi=nil;if(self.$bf==null)self.$bf=nil;if(self.$bg==null)self.$bg=nil;try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self.$bf;if((_b=self.$bf.$bp(nil,self.$bg),_b!==false&&_b!==nil)){return nil};if((_b=self.$bi,_b!==false&&_b!==nil)){while((_b=_a.$bm(nil,self.$bg),_b!==false&&_b!==nil)){_c(_a);_a=_a.$bq()};_d=nil;}else{while((_b=_a.$bn(nil,self.$bg),_b!==false&&_b!==nil)){_c(_a);_a=_a.$bq()};_d=nil;};return _d}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==63))return _e.a$a;throw(_e)}},$bo: function(){var self,_a;_a=nil;self=this;if(self.$bg==null)self.$bg=nil;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self.$bg;return _a},$ao: function(){var self,_a;_a=nil;self=this;if(self.$bf==null)self.$bf=nil;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self.$bf;return _a},$bl: function(_d,_a){var self,_b,_c;_c=nil;self=this;if(self.$bi==null)self.$bi=nil;if(self.$bf==null)self.$bf=nil;if(self.$bg==null)self.$bg=nil;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;if((_b=_a.$bm(nil,self.$bf),_b!==false&&_b!==nil)){return false};if((_b=self.$bi,_b!==false&&_b!==nil)){_c=_a.$bm(nil,self.$bg)}else{_c=_a.$bn(nil,self.$bg)};return _c}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==62))return _e.a$a;throw(_e)}},$c: function(_f,_a,_b,_c){var self,_d,_e;_e=nil;self=this;try{if(arguments.length<3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));if(arguments.length>4)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 3)'));if(_c==null)_c=false;;(_d=[_a,_b],self.$bf=_d[0]==null?nil:_d[0],self.$bg=_d[1]==null?nil:_d[1],_d);_e=self.$bi=((_d=_c,_d!==false&&_d!==nil)?true:false);return _e}catch(_g){if(_g instanceof a$c && (!_g.a$b || _g.a$b==61))return _g.a$a;throw(_g)}},$f: function(_d,_a){var self,_b,_c;_c=nil;self=this;if(self.$bi==null)self.$bi=nil;if(self.$bf==null)self.$bf=nil;if(self.$bg==null)self.$bg=nil;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;if((_b=_a.$bm(nil,self.$bf),_b!==false&&_b!==nil)){return false};if((_b=self.$bi,_b!==false&&_b!==nil)){_c=_a.$bm(nil,self.$bg)}else{_c=_a.$bn(nil,self.$bg)};return _c}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==64))return _e.a$a;throw(_e)}},$R: function(){var self,_a,_b,_c;self=this;if(self.$bi==null)self.$bi=nil;if(self.$bf==null)self.$bf=nil;if(self.$bg==null)self.$bg=nil;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=[];if((_b=self.$bf.$bp(nil,self.$bg),_b!==false&&_b!==nil)){return _a};_c=self.$bf;if((_b=self.$bi,_b!==false&&_b!==nil)){while((_b=_c.$bm(nil,self.$bg),_b!==false&&_b!==nil)){_a.$N(nil,_c);_c=_c.$bq()}}else{while((_b=_c.$bn(nil,self.$bg),_b!==false&&_b!==nil)){_a.$N(nil,_c);_c=_c.$bq()}};return _a},$i: function(){var self,_b,_a;_a=nil;self=this;if(self.$bi==null)self.$bi=nil;if(self.$bf==null)self.$bf=nil;if(self.$bg==null)self.$bg=nil;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;if((_b=self.$bi,_b!==false&&_b!==nil)){_a=("" + (self.$bf.$i()).$r() + ("...").$r() + (self.$bg.$i()).$r())}else{_a=("" + (self.$bf.$i()).$r() + ("..").$r() + (self.$bg.$i()).$r())};return _a},$br: function(_d,_a){var self,_b,_c;_c=nil;self=this;if(self.$bi==null)self.$bi=nil;if(self.$bf==null)self.$bf=nil;if(self.$bg==null)self.$bg=nil;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;if((_b=_a.$bm(nil,self.$bf),_b!==false&&_b!==nil)){return false};if((_b=self.$bi,_b!==false&&_b!==nil)){_c=_a.$bm(nil,self.$bg)}else{_c=_a.$bn(nil,self.$bg)};return _c}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==65))return _e.a$a;throw(_e)}}}});$A = a$d({a$i: [],a$e: $v,a$c: "LocalJumpError"});$B = a$d({a$i: [],a$e: $m,a$c: "Number",a$d: Number,a$h: {$Z: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;return self + _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==69))return _c.a$a;throw(_c)}},$3: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;return self == _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==68))return _c.a$a;throw(_c)}},$bt: function(_d,_a){var self,_b,_c;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;_b=self;while((_c=_b.$bu(nil,_a),_c!==false&&_c!==nil)){_d(_b);_b=_b.$bv(nil,1)};return self}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==67))return _e.a$a;throw(_e)}},$bs: function(_d,_a){var self,_b,_c;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;_b=self;while((_c=_b.$bn(nil,_a),_c!==false&&_c!==nil)){_d(_b);_b=_b.$Z(nil,1)};return self}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==66))return _e.a$a;throw(_e)}},$bn: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;return self <= _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==70))return _c.a$a;throw(_c)}},$bv: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;return self - _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==71))return _c.a$a;throw(_c)}},$bq: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;return self+1},$bw: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;return self / _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==73))return _c.a$a;throw(_c)}},$r: function(_b,_a){var self;self=this;try{if(arguments.length>2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));if(_a==null)_a=10;;return self.toString(_a)}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==72))return _c.a$a;throw(_c)}},$2: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;return self % _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==74))return _c.a$a;throw(_c)}},$aF: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;return self & _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==78))return _c.a$a;throw(_c)}},$bm: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;return self < _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==77))return _c.a$a;throw(_c)}},$L: function(_c){var self,_a,_b;self=this;try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=0;while((_b=_a.$bm(nil,self),_b!==false&&_b!==nil)){_c(_a);_a=_a.$Z(nil,1)};return self}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==76))return _d.a$a;throw(_d)}},$as: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;return self | _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==75))return _c.a$a;throw(_c)}},$by: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;return -self},$bp: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;return self > _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==80))return _c.a$a;throw(_c)}},$bx: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;return self ^ _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==79))return _c.a$a;throw(_c)}},$aG: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;return ~self},$bu: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;return self >= _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==81))return _c.a$a;throw(_c)}},$i: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;return self.toString()},$bA: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;return self * _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==82))return _c.a$a;throw(_c)}},$bz: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;return self}}});$C = a$d({a$i: [],a$e: $B,a$c: "Bignum",a$d: Number});$p = a$d({a$i: [],a$e: $m,a$c: "MyEventListener",a$h: {$bc: function(_c,_a){var self,_b;_b=nil;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;_b=_a.$a8(nil,_a.$a6().$Z(nil,"-"));return _b}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==83))return _d.a$a;throw(_d)}}}});$D = a$d({a$i: [],a$e: $m,a$c: "Boolean",a$d: Boolean,a$h: {$3: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;return (self == _a)}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==84))return _c.a$a;throw(_c)}},$r: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;return (self == true ? 'true' : 'false')},$i: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;return (self == true ? 'true' : 'false')}}});$E = a$d({a$i: [],a$e: $m,a$c: "NilClass",a$d: NilClass,a$h: {$bB: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=0.0;return _a},$t: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=true;return _a},$r: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a="";return _a},$bC: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=0;return _a},$R: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=[];return _a},$bD: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=[];return _a},$i: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a="nil";return _a}}});$e = a$d({a$i: [],a$e: $v,a$c: "RuntimeError"});$i = a$d({a$i: [],a$e: $u,a$c: "NoMethodError"});$F = a$d({a$i: [$s],a$e: $m,a$f: {$a: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;return []}},a$c: "Array",a$d: Array,a$h: {$Z: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;return self.concat(_a)}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==87))return _c.a$a;throw(_c)}},$N: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;self.push(_a); return self}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==86))return _c.a$a;throw(_c)}},$a2: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;
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
    return del ? _a : nil}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==85))return _c.a$a;throw(_c)}},$bE: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;return self.length},$V: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;var v = self[_a]; return (v == null ? nil : v)}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==89))return _c.a$a;throw(_c)}},$bG: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;self.length=0; return self},$g: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;
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
    }catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==88))return _c.a$a;throw(_c)}},$bF: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;return self.concat().reverse()},$bh: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;var v = self[self.length - 1]; return (v == null ? nil : v)},$r: function(){var self,_d;_d=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_d=self.$Q(function(_a){var _b;var _c=nil;_b=_a==null?nil:_a;_c=_b.$r();return _c}).$W();return _d},$X: function(_c,_a,_b){var self;self=this;try{if(arguments.length!=3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));;return (self[_a] = _b)}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==92))return _d.a$a;throw(_d)}},$y: function(_a){var self;self=this;try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;
    var elem;
    for (var i=0; i < self.length; i++) {
      elem = self[i];;_a((elem == null ? nil : elem));}
    return self}catch(_b){if(_b instanceof a$c && (!_b.a$b || _b.a$b==91))return _b.a$a;throw(_b)}},$bH: function(_a){var self;self=this;try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;  
    var elem;
    for (var i=0; i < self.length; i++) {
      elem = self[i];;_a([(elem == null ? nil : elem),i]);}
    return self}catch(_b){if(_b instanceof a$c && (!_b.a$b || _b.a$b==90))return _b.a$a;throw(_b)}},$ao: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;var v = self[0]; return (v == null ? nil : v)},$1: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;return self.length},$bI: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;
    var elem = self.pop();
    return (elem == null ? nil : elem)},$n: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;
    var elem = self.shift();
    return (elem == null ? nil : elem)},$o: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;return (self.length == 0)},$R: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self;return _a},$bK: function(){var self,_a,_b;self=this;_a=[];for(_b=1;_b<arguments.length;_b++)_a.push(arguments[_b]);;self.push.apply(self, _a); return self},$bJ: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self;return _a},$bN: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;return self.concat()},$i: function(){var self,_a,_e;_e=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a="[";_a=_a.$Z(nil,self.$Q(function(_b){var _c;var _d=nil;_c=_b==null?nil:_b;_d=_c.$i();return _d}).$W(nil,", "));_a=_a.$Z(nil,"]");_e=_a;return _e},$bM: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;self.reverse(); return self},$bL: function(){var self,_a,_b;self=this;_a=[];for(_b=1;_b<arguments.length;_b++)_a.push(arguments[_b]);;self.unshift.apply(self, _a); return self},$W: function(_i,_a){var self,_b,_d,_h;_h=nil;self=this;try{if(arguments.length>2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));if(_a==null)_a="";;_b="";self.$bH(function(_c){var _e,_f;var _g=nil;(_d=a$j(_c),_e=_d[0]==null?nil:_d[0],_f=_d[1]==null?nil:_d[1],_d);_b=_b.$Z(nil,_e.$r());if((_d=_f.$3(nil,self.$1().$bv(nil,1)),_d===false||_d===nil)){_g=_b=_b.$Z(nil,_a)}else{_g=nil};return _g});_h=_b;return _h}catch(_j){if(_j instanceof a$c && (!_j.a$b || _j.a$b==93))return _j.a$a;throw(_j)}}}});$G = a$d({a$i: [],a$e: $y,a$c: "Panel",a$h: {$aJ: function(){var self,_d;_d=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;a$k(self,'$aJ',nil,[]);_d=self.$y(function(_a){var _b;var _c=nil;_b=_a==null?nil:_a;_c=_b.$aJ();return _c});return _d},$J: function(_c,_a){var self,_b;_b=nil;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;_b=self.$m(nil,"This panel does not support no-arg add()");return _b}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==94))return _d.a$a;throw(_d)}},$bG: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self.$m();return _a},$aQ: function(){var self,_d;_d=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;a$k(self,'$aQ',nil,[]);_d=self.$y(function(_a){var _b;var _c=nil;_b=_a==null?nil:_a;_c=_b.$aQ();return _c});return _d},$bO: function(_e,_a,_b){var self,_c,_d;_d=nil;self=this;try{if(arguments.length!=3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));;_a.$aX();if((_c=_b,_c!==false&&_c!==nil)){$w.$bP(nil,_b,_a.$az())};_d=_a.$aV(nil,self);return _d}catch(_f){if(_f instanceof a$c && (!_f.a$b || _f.a$b==95))return _f.a$a;throw(_f)}},$y: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self.$m();return _a},$bQ: function(_e,_a){var self,_b,_c,_d;_d=nil;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;if((_b=_a.$aT().$3(nil,self),_b===false||_b===nil)){self.$m(nil,"w is not a child of this panel")};_c=_a.$az();_a.$aV(nil,nil);_d=$w.$bR(nil,$w.$aT(nil,_c),_c);return _d}catch(_f){if(_f instanceof a$c && (!_f.a$b || _f.a$b==96))return _f.a$a;throw(_f)}}}});$H = a$d({a$i: [],a$e: $G,a$c: "AbsolutePanel",a$h: {$J: function(_d,_a){var self,_c,_b;_b=nil;self=this;if(self.$bU==null)self.$bU=nil;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;self.$bO(nil,_a,self.$az());if((_c=self.$bU,_c!==false&&_c!==nil)){_b=self.$bU.$N(nil,_a)}else{_b=nil};return _b}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==98))return _e.a$a;throw(_e)}},$bS: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;self.$bT(nil,_a);return $w.$aj(nil,_a.$az()).$bv(nil,$w.$aj(nil,self.$az()))}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==97))return _c.a$a;throw(_c)}},$bV: function(_c,_a){var self,_b;_b=nil;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;_a.$aX();$w.$bW(nil,_a.$az());_b=self.$J(nil,_a);return _b}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==100))return _d.a$a;throw(_d)}},$bT: function(_d,_a){var self,_c,_b;_b=nil;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;if((_c=_a.$aT().$3(nil,self),_c===false||_c===nil)){_b=self.$m(nil,"Widget must be a child of this panel")}else{_b=nil};return _b}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==99))return _e.a$a;throw(_e)}},$y: function(_a){var self,_b,_c;_c=nil;self=this;_b=_a==null?nil:_a;if(self.$bU==null)self.$bU=nil;try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_c=self.$bU.$y(_b);return _c}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==102))return _d.a$a;throw(_d)}},$bX: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;self.$bT(nil,_a);return $w.$ae(nil,_a.$az()).$bv(nil,$w.$ae(nil,self.$az()))}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==101))return _c.a$a;throw(_c)}},$c: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;self.$bU=[];self.$aC(nil,$w.$a$());$w.$ag(nil,self.$az(),"position","relative");_a=$w.$ag(nil,self.$az(),"overflow","hidden");return _a},$bQ: function(_c,_a){var self,_b;_b=nil;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;a$k(self,'$bQ',nil,[_a]);_b=$w.$bW(nil,_a.$az());return _b}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==104))return _d.a$a;throw(_d)}},$bY: function(_c,_a){var self,_b;_b=nil;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;self.$bT(nil,_a);_b=$w.$bW(nil,_a.$az());return _b}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==103))return _d.a$a;throw(_d)}},$bZ: function(_e,_a,_b,_c){var self,_d;_d=nil;self=this;try{if(arguments.length!=4)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 3)'));;self.$bT(nil,_a);_d=$w.$b0(nil,_a.$az(),_b,_c);return _d}catch(_f){if(_f instanceof a$c && (!_f.a$b || _f.a$b==105))return _f.a$a;throw(_f)}},$b1: function(_e,_a,_b,_c){var self,_d;_d=nil;self=this;try{if(arguments.length!=4)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 3)'));;_a.$aX();$w.$b0(nil,_a.$az(),_b,_c);_d=self.$J(nil,_a);return _d}catch(_f){if(_f instanceof a$c && (!_f.a$b || _f.a$b==106))return _f.a$a;throw(_f)}}}});a$d({a$i: [],a$g: $b});$g = a$d({a$i: [],a$e: $m,a$c: "String",a$d: String,a$h: {$Z: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;return(self + _a)}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==108))return _c.a$a;throw(_c)}},$b2: function(_c,_a,_b){var self;self=this;try{if(arguments.length!=3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));;self.replace(pattern, replacement)}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==107))return _d.a$a;throw(_d)}},$b3: function(_f,_a,_b){var self,_c,_d,_e;self=this;try{if(arguments.length<2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));if(arguments.length>3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));if(_b==null)_b=" ";;if((_c=_b.$o(),_c!==false&&_c!==nil)){self.$m(nil,$a,"zero width padding")};_d=_a.$bv(nil,self.$1());if((_c=_d.$bn(nil,0),_c!==false&&_c!==nil)){return self};_e="";while(_e.length < _d) _e += _b;;return _e.$V(nil,0,_d).$Z(nil,self)}catch(_g){if(_g instanceof a$c && (!_g.a$b || _g.a$b==109))return _g.a$a;throw(_g)}},$bE: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;return self.length},$V: function(_d,_a,_b){var self,_c;self=this;try{if(arguments.length<2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));if(arguments.length>3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));if(_b==null)_b=nil;;if((_c=_b.$t(),_c!==false&&_c!==nil)){return self.charAt(_a) || nil}else{if((_c=_b.$bm(nil,0),_c!==false&&_c!==nil)){return nil};return self.substring(_a, _a+_b)}}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==111))return _e.a$a;throw(_e)}},$b4: function(_f,_a,_b){var self,_c,_d,_e;self=this;try{if(arguments.length<2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));if(arguments.length>3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));if(_b==null)_b=" ";;if((_c=_b.$o(),_c!==false&&_c!==nil)){self.$m(nil,$a,"zero width padding")};_d=_a.$bv(nil,self.$1());if((_c=_d.$bn(nil,0),_c!==false&&_c!==nil)){return self};_e="";while(_e.length < _d) _e += _b;;return self.$Z(nil,_e.$V(nil,0,_d))}catch(_g){if(_g instanceof a$c && (!_g.a$b || _g.a$b==110))return _g.a$a;throw(_g)}},$an: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;return self.split(_a)}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==112))return _c.a$a;throw(_c)}},$r: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self;return _a},$1: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;return self.length},$al: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;return self.replace(/^\s+/, '').replace(/\s+$/, '')},$o: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;return(self === "")},$b6: function(_g,_a,_b){var self,_c,_d,_e,_f;self=this;try{if(arguments.length<2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));if(arguments.length>3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));if(_b==null)_b=nil;;(_c=["",self,nil],_d=_c[0]==null?nil:_c[0],_e=_c[1]==null?nil:_c[1],_f=_c[2]==null?nil:_c[2],_c);while(_e.length > 0) {
      if (_f = _e.match(_a)) {
        _d += _e.slice(0, _f.index);;if((_c=_b,_c!==false&&_c!==nil)){_d=_d.$Z(nil,_b)}else{_d=_d.$Z(nil,_g(_f.$ao()).$r())};_e = _e.slice(_f.index + _f[0].length);
      } else {
        _d += _e; _e = '';
      }
    } return _d}catch(_h){if(_h instanceof a$c && (!_h.a$b || _h.a$b==114))return _h.a$a;throw(_h)}},$b5: function(_c,_a,_b){var self;self=this;try{if(arguments.length<2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));if(arguments.length>3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));if(_b==null)_b=0;;
    var i = self.indexOf(_a, _b);
    return (i == -1) ? nil : i}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==113))return _d.a$a;throw(_d)}},$i: function(){var self,_a,_b;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a={
      '\b': '\\b',
      '\t': '\\t',
      '\n': '\\n',
      '\f': '\\f',
      '\r': '\\r',
      '\\': '\\\\'
    };;_b=self.$b6(function(_c){var _d,_e;_d=_c==null?nil:_c;_e=_a[_d];return _e ? _e : 
        '\\u00' + ("0" + _d.charCodeAt().toString(16)).substring(0,2);},/[\x00-\x1f\\]/);return ('"' + _b.replace(/"/g, '\\"') + '"');},$b7: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;
    var i = self.match(_a);
    return (i === null) ? nil : i}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==115))return _c.a$a;throw(_c)}}}});$I = a$d({a$i: [],a$e: $B,a$c: "Fixnum",a$d: Number});$n = a$d({a$i: [],a$e: $H,a$f: {$I: function(){var self,_a,_b;_b=nil;self=this;if(self.$b9==null)self.$b9=nil;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_b=self.$b9=(_a=self.$b9, (_a!==false&&_a!==nil) ? _a : (self.$a()));return _b}},a$c: "RootPanel",a$h: {$b8: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;return document.body},$y: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=nil;return _a},$c: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;self.$aC(nil,self.$b8());_a=self.$aQ();return _a}}});$J = a$d({a$i: [],a$e: $B,a$c: "Float",a$d: Number});$c = a$d({a$i: [],a$e: $m,a$f: {$b_: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;return _a.screenX}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==116))return _c.a$a;throw(_c)}},$cb: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;return _a.clientX}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==119))return _c.a$a;throw(_c)}},$ca: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;return _a.ctrlKey}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==118))return _c.a$a;throw(_c)}},$b$: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;return _a.screenY}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==117))return _c.a$a;throw(_c)}},$cd: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;return _a.clientY}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==121))return _c.a$a;throw(_c)}},$cc: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;_a.preventDefault(); return nil}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==120))return _c.a$a;throw(_c)}},$ce: function(_c,_a,_b){var self;self=this;try{if(arguments.length!=3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));;_a.keyCode = _b; return nil}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==122))return _d.a$a;throw(_d)}},$ci: function(_f,_a,_b,_c){var self,_e,_d;_d=nil;self=this;try{if(arguments.length!=4)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 3)'));;if((_e=_c,_e!==false&&_e!==nil)){_d=_c.$j(nil,_a)}else{_d=nil};return _d}catch(_g){if(_g instanceof a$c && (!_g.a$b || _g.a$b==126))return _g.a$a;throw(_g)}},$ch: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;return _a.which || _a.keyCode}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==125))return _c.a$a;throw(_c)}},$cg: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;return !!_a.getMetaKey}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==124))return _c.a$a;throw(_c)}},$cf: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;return _a.relatedTarget || nil}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==123))return _c.a$a;throw(_c)}},$cm: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;return _a.altKey}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==131))return _c.a$a;throw(_c)}},$cl: function(_c,_a){var self,_b;_b=nil;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;_b=self.$m();return _b}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==130))return _d.a$a;throw(_d)}},$k: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;
    switch (_a.type) {
      case "blur": return 0x01000;
      case "change": return 0x00400;
      case "click": return 0x00001;
      case "dblclick": return 0x00002;
      case "focus": return 0x00800;
      case "keydown": return 0x00080;
      case "keypress": return 0x00100;
      case "keyup": return 0x00200;
      case "load": return 0x08000;
      case "losecapture": return 0x02000;
      case "mousedown": return 0x00004;
      case "mousemove": return 0x00040;
      case "mouseout": return 0x00020;
      case "mouseover": return 0x00010;
      case "mouseup": return 0x00008;
      case "scroll": return 0x04000;
      case "error": return 0x10000;
      case "mousewheel": return 0x20000;
      case "DOMMouseScroll": return 0x20000;
    }}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==129))return _c.a$a;throw(_c)}},$ck: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;return _a.type}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==128))return _c.a$a;throw(_c)}},$cj: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;return _a.toString()}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==127))return _c.a$a;throw(_c)}},$cn: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;return _a.target || nil}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==132))return _c.a$a;throw(_c)}},$cp: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;return _a.button}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==134))return _c.a$a;throw(_c)}},$co: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;return _a.shiftKey}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==133))return _c.a$a;throw(_c)}},$H: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;
    // assign event dispatcher
    window.a$m = function(evt) {
      self.$ci(nil, evt, this, this.a$n || nil);
   };},$cr: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;return _a.relatedTarget || nil}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==136))return _c.a$a;throw(_c)}},$cq: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;return _a.repeat}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==135))return _c.a$a;throw(_c)}}},a$c: "Event"});$o = a$d({a$i: [],a$e: $y,a$c: "MyWidget",a$h: {$c: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;self.$aC(nil,$w.$a$());self.$ar(nil,(1));self.$_(nil,"test");_a=$w.$a9(nil,self.$az(),"click me");return _a},$j: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;alert('okay')}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==137))return _c.a$a;throw(_c)}}}});$a = a$d({a$i: [],a$e: $v,a$c: "ArgumentError"});$K = a$d({a$i: [],a$e: $m,a$c: "Regexp",a$d: RegExp});$f = a$d({a$i: [],a$e: $v,a$c: "TypeError"});$w = a$d({a$i: [],a$e: $m,a$f: {$cs: function(_d,_a,_b){var self,_c;self=this;try{if(arguments.length!=3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));;_b=(_c=_b, (_c!==false&&_c!==nil) ? _c : (""));_a.innerHTML = _b; return nil}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==140))return _e.a$a;throw(_e)}},$ct: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;return document.getElementById(_a) || nil}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==141))return _c.a$a;throw(_c)}},$am: function(_d,_a,_b,_c){var self;self=this;try{if(arguments.length!=4)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 3)'));;_a[_b] = _c; return nil}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==139))return _e.a$a;throw(_e)}},$a5: function(_c,_a,_b){var self;self=this;try{if(arguments.length!=3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));;
    var ret = _a.style[_b];
    return (ret == null) ? nil : ret}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==142))return _d.a$a;throw(_d)}},$r: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;return _a.outerHTML}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==138))return _c.a$a;throw(_c)}},$cu: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;
    var sib = _a.nextSibling;
    while (sib && sib.nodeType != 1)
      sib = sib.nextSibling;
    return sib || nil}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==143))return _c.a$a;throw(_c)}},$cv: function(_d,_a){var self,_b,_c;self=this;if(self.$cw==null)self.$cw=nil;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;if((_b=(_c=self.$cw, (_c!==false&&_c!==nil) ? (self.$cx(nil,_a,self.$cw)) : _c),_b!==false&&_b!==nil)){self.$cw=nil};if (_a == window.a$o) window.a$o = null;;return nil}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==144))return _e.a$a;throw(_e)}},$aH: function(_d,_a,_b){var self,_c;self=this;try{if(arguments.length<2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));if(arguments.length>3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));if(_b==null)_b=true;;if((_c=_b,_c!==false&&_c!==nil)){_a.style.display = ''}else{_a.style.display = 'none'};return nil}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==145))return _e.a$a;throw(_e)}},$cx: function(_c,_a,_b){var self;self=this;try{if(arguments.length!=3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));;return (_a == _b)}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==146))return _d.a$a;throw(_d)}},$cy: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self.$cz(nil,"colgroup");return _a},$cA: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self.$cB(nil,"text");return _a},$cC: function(_c,_a,_b){var self;self=this;try{if(arguments.length!=3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));;
    var i = parseInt(_a.style[_b]);
    return ((!i) ? 0 : i)}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==147))return _d.a$a;throw(_d)}},$cD: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;
    var e = document.createElement("INPUT");
    e.type = 'radio';
    e.name = _a;
    return e}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==148))return _c.a$a;throw(_c)}},$a7: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;
    // To mimic IEs +innerText+ property in the W3C DOM, we need to recursively
    // concatenate all child text nodes (depth first).
    var text = '', child = _a.firstChild;
    while (child) {
      // 1 == Element node
      if (child.nodeType == 1) {
        text += this.$a7(nil, child);
      } else if (child.nodeValue) {
        text += child.nodeValue;
      }
      child = child.nextSibling;
    }
    return text}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==149))return _c.a$a;throw(_c)}},$cE: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;self.$cw=_a;window.a$o = _a;;return nil}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==150))return _c.a$a;throw(_c)}},$cF: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;
    var ret = _a.src;
    return (ret == null) ? nil : ret}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==151))return _c.a$a;throw(_c)}},$b0: function(_e,_a,_b,_c){var self,_d;_d=nil;self=this;try{if(arguments.length!=4)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 3)'));;self.$ag(nil,_a,"position","absolute");self.$ag(nil,_a,"left",_b.$Z(nil,"px"));_d=self.$ag(nil,_a,"top",_c.$Z(nil,"px"));return _d}catch(_f){if(_f instanceof a$c && (!_f.a$b || _f.a$b==152))return _f.a$a;throw(_f)}},$cG: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self.$cz(nil,"tr");return _a},$ak: function(_c,_a,_b){var self;self=this;try{if(arguments.length!=3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));;
    var ret = _a[_b];
    return (ret == null) ? nil : String(ret)}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==153))return _d.a$a;throw(_d)}},$cI: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self.$cz(nil,"caption");return _a},$av: function(_c,_a,_b){var self;self=this;try{if(arguments.length!=3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));;
    var i = parseInt(_a[_b]);
    return ((!i) ? 0 : i)}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==155))return _d.a$a;throw(_d)}},$ar: function(_c,_a,_b){var self;self=this;try{if(arguments.length!=3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));;
    _a.a$p = _b;

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
    
    return nil}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==154))return _d.a$a;throw(_d)}},$$: function(_d,_a,_b,_c){var self;self=this;try{if(arguments.length!=4)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 3)'));;_a.setAttribute(_b, _c); return nil}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==156))return _e.a$a;throw(_e)}},$cH: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;return document.body.clientWidth},$at: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;return _a.a$p || 0}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==157))return _c.a$a;throw(_c)}},$cK: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self.$cz(nil,"tbody");return _a},$cJ: function(_c,_a,_b){var self;self=this;try{if(arguments.length!=3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));;_a.src = _b; return nil}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==158))return _d.a$a;throw(_d)}},$cB: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;
    var e = document.createElement("INPUT");
    e.type = _a;
    return e}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==159))return _c.a$a;throw(_c)}},$cL: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;
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
    return nil}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==160))return _c.a$a;throw(_c)}},$cM: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self.$cz(nil,"legend");return _a},$cN: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self.$cz(nil,"fieldset");return _a},$cz: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;return document.createElement(_a)}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==161))return _c.a$a;throw(_c)}},$a$: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self.$cz(nil,"div");return _a},$cP: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;
    var child = _a.firstChild;
    while (child && child.nodeType != 1)
      child = child.nextSibling;
    return child || nil}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==162))return _c.a$a;throw(_c)}},$cO: function(){var self;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;return document.body.clientHeight},$aj: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;
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
    return left}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==163))return _c.a$a;throw(_c)}},$cQ: function(_d,_a,_b,_c){var self;self=this;try{if(arguments.length!=4)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 3)'));;_a.insertBefore(_b, _c); return nil}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==164))return _e.a$a;throw(_e)}},$cR: function(_d,_a,_b,_c){var self;self=this;try{if(arguments.length!=4)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 3)'));;var option = _a.options[_c];
    option.text = _b;
    return nil}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==165))return _e.a$a;throw(_e)}},$bR: function(_c,_a,_b){var self;self=this;try{if(arguments.length!=3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));;_a.removeChild(_b); return nil}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==166))return _d.a$a;throw(_d)}},$cS: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;
    var ret = _a.innerHTML;
    return (ret == null) ? nil : ret}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==167))return _c.a$a;throw(_c)}},$cT: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self.$cz(nil,"td");return _a},$cU: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self.$cB(nil,"password");return _a},$cV: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self.$cz(nil,"textarea");return _a},$cW: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self.$cz(nil,"tfoot");return _a},$cX: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self.$cB(nil,"checkbox");return _a},$cY: function(_c,_a,_b){var self;self=this;try{if(arguments.length!=3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));;
    var ret = _a.getAttribute(_b);
    return (ret == null) ? nil : ret}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==169))return _d.a$a;throw(_d)}},$cZ: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self.$cz(nil,"form");return _a},$c0: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self.$cz(nil,"button");return _a},$c1: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self.$cz(nil,"label");return _a},$aR: function(_c,_a,_b){var self;self=this;try{if(arguments.length!=3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));;_a.a$n = (_b === nil) ? null : _b; return nil}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==168))return _d.a$a;throw(_d)}},$ac: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;return (_a.style.display != 'none')}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==170))return _c.a$a;throw(_c)}},$c2: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self.$cz(nil,"th");return _a},$c3: function(_c,_a,_b){var self;self=this;try{if(arguments.length!=3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));;
    var count = 0, child = _a.firstChild;
    while (child) {
      if (child == _b)
        return count;
      if (child.nodeType == 1)
        ++count;
      child = child.nextSibling;
    }

    return nil}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==171))return _d.a$a;throw(_d)}},$c4: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self.$cz(nil,"col");return _a},$c5: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self.$cz(nil,"iframe");return _a},$c6: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self.$cz(nil,"options");return _a},$aD: function(_c,_a,_b){var self;self=this;try{if(arguments.length!=3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));;
    var p = _a.parentNode;
    if (!p) return;
    p.insertBefore(_b, _a);
    p.removeChild(_a);
    return nil}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==172))return _d.a$a;throw(_d)}},$c7: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self.$cz(nil,"A");return _a},$aM: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;_a.a$n = null; return nil}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==174))return _c.a$a;throw(_c)}},$a9: function(_c,_a,_b){var self;self=this;try{if(arguments.length!=3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));;
    // Remove all children first.
    while (_a.firstChild) {
      _a.removeChild(_a.firstChild);
    }
    // Add a new text node.
    if (_b !== nil) {
      _a.appendChild(document.createTextNode(_b));
    }
    return nil}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==173))return _d.a$a;throw(_d)}},$c8: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self.$cz(nil,"img");return _a},$ag: function(_d,_a,_b,_c){var self;self=this;try{if(arguments.length!=4)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 3)'));;_a.style[_b] = _c; return nil}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==175))return _e.a$a;throw(_e)}},$c9: function(_c,_a,_b){var self;self=this;try{if(arguments.length!=3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));;
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

    return nil}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==176))return _d.a$a;throw(_d)}},$c_: function(){var self;self=this;if(self.$cw==null)self.$cw=nil;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;return self.$cw},$c$: function(_c,_a,_b){var self;self=this;try{if(arguments.length!=3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));;
    while (_b) {
      if (_a == _b) {
        return true;
      }
      _b = _b.parentNode;
      if (_b && (_b.nodeType != 1)) {
        _b = null;
      }
    }
    return false}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==177))return _d.a$a;throw(_d)}},$da: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self.$cz(nil,"table");return _a},$db: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self.$cz(nil,"thead");return _a},$dd: function(_c,_a,_b){var self;self=this;try{if(arguments.length!=3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));;return !!_a[_b]}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==179))return _d.a$a;throw(_d)}},$dc: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;
    var count = 0, child = _a.firstChild;
    while (child) {
      if (child.nodeType == 1)
        ++count;
      child = child.nextSibling;
    }
    return count}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==178))return _c.a$a;throw(_c)}},$df: function(_c,_a,_b){var self;self=this;try{if(arguments.length!=3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));;return !!_a.style[_b]}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==181))return _d.a$a;throw(_d)}},$ab: function(_c,_a,_b){var self;self=this;try{if(arguments.length!=3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));;_a.removeAttribute(_b); return nil}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==180))return _d.a$a;throw(_d)}},$de: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self.$cz(nil,"span");return _a},$ae: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;
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
    return top}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==187))return _c.a$a;throw(_c)}},$aT: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;
    var parent = _a.parentNode;
    if(parent == null) {
      return nil;
    }
    if (parent.nodeType != 1)
      parent = null;
    return parent || nil}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==186))return _c.a$a;throw(_c)}},$bW: function(_c,_a){var self,_b;_b=nil;self=this;try{if(arguments.length!=2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;self.$ag(nil,_a,"left","");self.$ag(nil,_a,"top","");_b=self.$ag(nil,_a,"position","static");return _b}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==185))return _d.a$a;throw(_d)}},$dh: function(_d,_a){var self,_b,_c;self=this;try{if(arguments.length>2)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));if(_a==null)_a=false;;_b=self.$cz(nil,"select");if((_c=_a,_c!==false&&_c!==nil)){self.$am(nil,_b,"multiple",true)};return _b}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==184))return _e.a$a;throw(_e)}},$bP: function(_c,_a,_b){var self;self=this;try{if(arguments.length!=3)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));;_a.appendChild(_b); return nil}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==183))return _d.a$a;throw(_d)}},$dg: function(_d,_a,_b,_c){var self;self=this;try{if(arguments.length!=4)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 3)'));;
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
    return nil}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==182))return _e.a$a;throw(_e)}}},a$c: "DOM"});$j = a$d({a$i: [],a$e: $m,a$f: {$a: function(_a){var self,_b,_c;self=this;_b=_a==null?nil:_a;try{if(arguments.length>1)throw($a.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;if((_c=_b,_c===false||_c===nil)){self.$m(nil,$a,"tried to create Proc object without a block")};return (function() {
      try {
        return _b.$O.apply(_b, arguments);
      } catch(e) 
      {
        if (e instanceof a$c) 
        {
          if (e.a$b == null)
          {;self.$m(nil,$A,"break from proc-closure");}
          return e.a$a;
        }
        else throw(e);
      }
    })}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==188))return _d.a$a;throw(_d)}}},a$c: "Proc",a$d: Function,a$h: {$O: function(){var self,_a,_b;self=this;_a=[];for(_b=1;_b<arguments.length;_b++)_a.push(arguments[_b]);;
    if (_a.length == 0) return self();
    else if (_a.length == 1) return self(_a[0]);
    else return self(_a);}}});      $b.a$e = $m;
var a$l = [$d,$k,$m,$r,$s,$t,$l,$h,$v,$u,$x,$y,$q,$z,$A,$B,$C,$p,$D,$E,$e,$i,$F,$G,$H,$b,$g,$I,$n,$J,$c,$o,$a,$K,$f,$w,$j];
a$m(a$l);
for (var i=0; i<a$l.length; i++) a$n(a$l[i]);
function main() { return $r.$G.apply($r, arguments); }