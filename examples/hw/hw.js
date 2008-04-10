// declare nil
function NilClass() {}

// FIXME: remove
NilClass.prototype.toString = function() { return "nil"; };
nil = new NilClass();

//
// define a null-function (used by HTTPRequest)
//
function a$m()
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
function a$n(x) { throw(x); }

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
function a$o(o, m, i, a) 
{
  var r = o[m]; // method in current class
  var c = o.a$g.a$e;
  while (r === c.a$d.prototype[m])
    c = c.a$e;
  return c.a$d.prototype[m].apply(o, [i].concat(a));
}

function a$p(o, m, a) 
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
$b = a$d({a$e: nil,a$f: {$a: function(_e,_a,_b,_c){var self,_d;self=this;try{if(_c==null)_c=nil;;if((_d=_c,_d===false||_d===nil)){_c=(function() {})};return new self.a$d($b, _a, _b, _c);}catch(_f){if(_f instanceof a$c && (!_f.a$b || _f.a$b==2))return _f.a$a;throw(_f)}}},a$c: "Class",a$g: new a$a(a$a, nil, "Class", a$a),a$h: {$e: function(){var self;self=this;return self.a$c},$a: function(_c){var self,_a,_b,_d,_e,_f;_f=nil;self=this;_d=_c==null?nil:_c;try{_a=[];for(_b=1;_b<arguments.length;_b++)_a.push(arguments[_b]);;_e=self.$b();_e.$d(_d,'$c',a$b(_a));_f=_e;return _f}catch(_g){if(_g instanceof a$c && (!_g.a$b || _g.a$b==0))return _g.a$a;throw(_g)}},$f: function(_d,_a){var self,_b,_c;_c=nil;self=this;try{_c=(_b=self.$g(nil,_a), (_b!==false&&_b!==nil) ? _b : (_a.$h(nil,self)));return _c}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==1))return _e.a$a;throw(_e)}},$b: function(){var self;self=this;return (new self.a$d())},$i: function(){var self;self=this;return self.a$c}}});a$e($b);$i = a$d({a$j: [],a$e: nil,a$c: "Kernel",a$h: {$p: function(_d,_a){var self,_b,_c,_e;self=this;_e=_d==null?nil:_d;try{_b=[];for(_c=2;_c<arguments.length;_c++)_b.push(arguments[_c]);;
    var m = self[a$f[_a]];
    if (m) 
      return m.apply(self, [_e].concat(_b));
    else
      return self.$n.apply(self, [_e].concat([_a]).concat(_b));}catch(_f){if(_f instanceof a$c && (!_f.a$b || _f.a$b==4))return _f.a$a;throw(_f)}},$n: function(_d,_a){var self,_b,_c,_e,_f;_f=nil;self=this;_e=_d==null?nil:_d;try{_b=[];for(_c=2;_c<arguments.length;_c++)_b.push(arguments[_c]);;_f=self.$j(nil,$g,("undefined method `" + (_a).$o() + ("' for ").$o() + (self.$i()).$o()));return _f}catch(_g){if(_g instanceof a$c && (!_g.a$b || _g.a$b==3))return _g.a$a;throw(_g)}},$j: function(){var self,_a,_b,_c,_d;self=this;_a=[];for(_b=1;_b<arguments.length;_b++)_a.push(arguments[_b]);;_c=((_b=_a.$l(),_b!==false&&_b!==nil)?$c.$a(nil,""):(_d=_a.$k(),((_b=_d.$h(nil,$b),_b!==false&&_b!==nil)?_d.$d(nil,'$a',a$b(_a)):((_b=_d.$m(nil,$f),_b!==false&&_b!==nil)?((_b=_a.$l(),_b!==false&&_b!==nil)?_d:$a.$a(nil,"to many arguments given to raise")):((_b=_d.$m(nil,$e),_b!==false&&_b!==nil)?((_b=_a.$l(),_b!==false&&_b!==nil)?$c.$a(nil,_d):$a.$a(nil,"to many arguments given to raise")):$d.$a(nil,"exception class/object expected"))))));throw(_c)},$q: function(){var self,_a;_a=nil;self=this;_a=false;return _a},$s: function(_a){var self,_b,_c;_c=nil;self=this;_b=_a==null?nil:_a;try{_c=$h.$a(_b);return _c}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==6))return _d.a$a;throw(_d)}},$r: function(_b,_a){var self;self=this;try{
    var m = a$f[_a]; 
    return (m !== undefined && self[m] !== undefined && !self[m].a$i)}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==5))return _c.a$a;throw(_c)}},$t: function(){var self,_a,_b,_f;_f=nil;self=this;_a=[];for(_b=1;_b<arguments.length;_b++)_a.push(arguments[_b]);;_a.$v(function(_c){var _d;var _e=nil;_d=_c==null?nil:_c;_e=self.$u(nil,_d.$i());return _e});_f=nil;return _f},$d: function(_c,_a,_b){var self,_d;self=this;_d=_c==null?nil:_c;try{
    var m = self[_a];
    if (m)
      return m.apply(self, [_d].concat(_b));
    else
      return self.$n.apply(self, 
        [_d].concat([a$h[_a]]).concat(_b));}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==7))return _e.a$a;throw(_e)}},$x: function(_a){var self,_b;_b=nil;self=this;try{while(true){_a()};_b=nil;;return _b}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==10))return _c.a$a;throw(_c)}},$u: function(_b,_a){var self;self=this;try{_a=_a.$o();alert(_a); return nil}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==9))return _c.a$a;throw(_c)}},$w: function(_d,_a){var self,_b,_c,_e;self=this;_e=_d==null?nil:_d;try{_b=[];for(_c=2;_c<arguments.length;_c++)_b.push(arguments[_c]);;
    var m = self[a$f[_a]];
    if (m) 
      return m.apply(self, [_e].concat(_b));
    else
      return self.$n.apply(self, [_e].concat([_a]).concat(_b));}catch(_f){if(_f instanceof a$c && (!_f.a$b || _f.a$b==8))return _f.a$a;throw(_f)}}}});$k = a$d({a$j: [$i],a$e: nil,a$c: "Object",a$h: {$h: function(_b,_a){var self;self=this;try{return a$i(self, _a)}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==11))return _c.a$a;throw(_c)}},$y: function(_b,_a){var self;self=this;try{return a$i(self, _a)}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==12))return _c.a$a;throw(_c)}},$z: function(){var self;self=this;return self.a$g},$g: function(_b,_a){var self;self=this;try{return (self.constructor == _a.constructor && self == _a)}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==13))return _c.a$a;throw(_c)}},$B: function(){var self;self=this;return self.toString()},$A: function(_a){var self,_b;_b=nil;self=this;try{_a(self);_b=self;return _b}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==14))return _c.a$a;throw(_c)}},$o: function(){var self;self=this;return self.toString()},$c: function(){var self,_a;_a=nil;self=this;_a=nil;return _a},$C: function(_c,_a){var self,_b;_b=nil;self=this;try{_b=$j.$a(nil,self,_a);return _b}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==15))return _d.a$a;throw(_d)}},$f: function(_d,_a){var self,_b,_c;_c=nil;self=this;try{_c=(_b=self.$g(nil,_a), (_b!==false&&_b!==nil) ? _b : (self.$h(nil,_a)));return _c}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==16))return _e.a$a;throw(_e)}},$m: function(_b,_a){var self;self=this;try{return (self.a$g === _a)}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==17))return _c.a$a;throw(_c)}},$i: function(){var self;self=this;return self.toString()}}});a$d({a$j: [],a$g: $b});$e = a$d({a$j: [],a$e: $k,a$c: "String",a$d: String,a$h: {$E: function(_b,_a){var self;self=this;try{return(self + _a)}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==19))return _c.a$a;throw(_c)}},$D: function(_c,_a,_b){var self;self=this;try{self.replace(pattern, replacement)}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==18))return _d.a$a;throw(_d)}},$J: function(_b,_a){var self;self=this;try{
    var i = self.search(_a);
    return (i == -1 ? nil : i)}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==21))return _c.a$a;throw(_c)}},$G: function(_f,_a,_b){var self,_c,_d,_e;self=this;try{if(_b==null)_b=" ";;if((_c=_b.$l(),_c!==false&&_c!==nil)){self.$j(nil,$a,"zero width padding")};_d=(_a)-(self.$H());if((_c=(_d)<=(0),_c!==false&&_c!==nil)){return self};_e="";while(_e.length < _d) _e += _b;;return (_e.$I(nil,0,_d))+(self)}catch(_g){if(_g instanceof a$c && (!_g.a$b || _g.a$b==20))return _g.a$a;throw(_g)}},$F: function(){var self;self=this;return self.length},$I: function(_d,_a,_b){var self,_c;self=this;try{if(_b==null)_b=nil;;if((_c=_b.$q(),_c!==false&&_c!==nil)){return self.charAt(_a) || nil}else{if((_c=(_b)<(0),_c!==false&&_c!==nil)){return nil};return self.substring(_a, _a+_b)}}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==23))return _e.a$a;throw(_e)}},$K: function(_f,_a,_b){var self,_c,_d,_e;self=this;try{if(_b==null)_b=" ";;if((_c=_b.$l(),_c!==false&&_c!==nil)){self.$j(nil,$a,"zero width padding")};_d=(_a)-(self.$H());if((_c=(_d)<=(0),_c!==false&&_c!==nil)){return self};_e="";while(_e.length < _d) _e += _b;;return (self)+(_e.$I(nil,0,_d))}catch(_g){if(_g instanceof a$c && (!_g.a$b || _g.a$b==22))return _g.a$a;throw(_g)}},$L: function(_b,_a){var self;self=this;try{return self.split(_a)}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==24))return _c.a$a;throw(_c)}},$o: function(){var self,_a;_a=nil;self=this;_a=self;return _a},$H: function(){var self;self=this;return self.length},$M: function(){var self;self=this;return self.replace(/^\s+/, '').replace(/\s+$/, '')},$l: function(){var self;self=this;return(self === "")},$O: function(_g,_a,_b){var self,_c,_d,_e,_f;self=this;try{if(_b==null)_b=nil;;(_c=["",self,nil],_d=_c[0]==null?nil:_c[0],_e=_c[1]==null?nil:_c[1],_f=_c[2]==null?nil:_c[2],_c);while(_e.length > 0) {
      if (_f = _e.match(_a)) {
        _d += _e.slice(0, _f.index);;if((_c=_b,_c!==false&&_c!==nil)){_d=(_d)+(_b)}else{_d=(_d)+(_g(_f.$P()).$o())};_e = _e.slice(_f.index + _f[0].length);
      } else {
        _d += _e; _e = '';
      }
    } return _d}catch(_h){if(_h instanceof a$c && (!_h.a$b || _h.a$b==26))return _h.a$a;throw(_h)}},$N: function(_c,_a,_b){var self;self=this;try{if(_b==null)_b=0;;
    var i = self.indexOf(_a, _b);
    return (i == -1) ? nil : i}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==25))return _d.a$a;throw(_d)}},$i: function(){var self,_a,_b;self=this;_a={
      '\b': '\\b',
      '\t': '\\t',
      '\n': '\\n',
      '\f': '\\f',
      '\r': '\\r',
      '\\': '\\\\'
    };;_b=self.$O(function(_c){var _d,_e;_d=_c==null?nil:_c;_e=_a[_d];return _e ? _e : 
        '\\u00' + ("0" + _d.charCodeAt().toString(16)).substring(0,2);},/[\x00-\x1f\\]/);return ('"' + _b.replace(/"/g, '\\"') + '"');}}});$l = a$d({a$j: [],a$e: nil,a$c: "Enumerable",a$h: {$Q: function(_a){var self,_b,_c,_f,_h;_h=nil;self=this;_b=_a==null?nil:_a;try{_c=[];self.$v(function(_d){var _e;var _g=nil;_e=_d==null?nil:_d;_g=_c.$R(nil,((_f=_b,_f!==false&&_f!==nil)?_b.$S(nil,_e):_e));return _g});_h=_c;return _h}catch(_i){if(_i instanceof a$c && (!_i.a$b || _i.a$b==27))return _i.a$a;throw(_i)}},$T: function(_f){var self,_a,_e,_g;_g=nil;self=this;try{_a=[];self.$v(function(_b){var _c;var _d=nil;_c=_b==null?nil:_b;if((_e=_f(_c),_e!==false&&_e!==nil)){_d=_a.$R(nil,_c)}else{_d=nil};return _d});_g=_a;return _g}catch(_h){if(_h instanceof a$c && (!_h.a$b || _h.a$b==28))return _h.a$a;throw(_h)}},$U: function(_a){var self,_b,_c,_f,_h;_h=nil;self=this;_b=_a==null?nil:_a;try{_c=[];self.$v(function(_d){var _e;var _g=nil;_e=_d==null?nil:_d;_g=_c.$R(nil,((_f=_b,_f!==false&&_f!==nil)?_b.$S(nil,_e):_e));return _g});_h=_c;return _h}catch(_i){if(_i instanceof a$c && (!_i.a$b || _i.a$b==29))return _i.a$a;throw(_i)}},$V: function(){var self,_a,_e;_e=nil;self=this;_a=[];self.$v(function(_b){var _c;var _d=nil;_c=_b==null?nil:_b;_d=_a.$R(nil,_c);return _d});_e=_a;return _e},$W: function(_f){var self,_a,_e,_g;_g=nil;self=this;try{_a=[];self.$v(function(_b){var _c;var _d=nil;_c=_b==null?nil:_b;if((_e=_f(_c),_e===false||_e===nil)){_d=_a.$R(nil,_c)}else{_d=nil};return _d});_g=_a;return _g}catch(_h){if(_h instanceof a$c && (!_h.a$b || _h.a$b==30))return _h.a$a;throw(_h)}},$X: function(_f){var self,_a,_e,_g;_g=nil;self=this;try{_a=[];self.$v(function(_b){var _c;var _d=nil;_c=_b==null?nil:_b;if((_e=_f(_c),_e!==false&&_e!==nil)){_d=_a.$R(nil,_c)}else{_d=nil};return _d});_g=_a;return _g}catch(_h){if(_h instanceof a$c && (!_h.a$b || _h.a$b==31))return _h.a$a;throw(_h)}}}});$m = a$d({a$j: [$l],a$e: $k,a$f: {$a: function(){var self;self=this;return []}},a$c: "Array",a$d: Array,a$h: {$E: function(_b,_a){var self;self=this;try{return self.concat(_a)}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==34))return _c.a$a;throw(_c)}},$R: function(_b,_a){var self;self=this;try{self.push(_a); return self}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==33))return _c.a$a;throw(_c)}},$Y: function(_b,_a){var self;self=this;try{
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
    return del ? _a : nil}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==32))return _c.a$a;throw(_c)}},$F: function(){var self;self=this;return self.length},$I: function(_b,_a){var self;self=this;try{var v = self[_a]; return (v == null ? nil : v)}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==36))return _c.a$a;throw(_c)}},$0: function(){var self;self=this;self.length=0; return self},$g: function(_b,_a){var self;self=this;try{
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
    }catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==35))return _c.a$a;throw(_c)}},$Z: function(){var self;self=this;return self.concat().reverse()},$2: function(){var self;self=this;var v = self[self.length - 1]; return (v == null ? nil : v)},$o: function(){var self,_d;_d=nil;self=this;_d=self.$U(function(_a){var _b;var _c=nil;_b=_a==null?nil:_a;_c=_b.$o();return _c}).$1();return _d},$4: function(_c,_a,_b){var self;self=this;try{return (self[_a] = _b)}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==39))return _d.a$a;throw(_d)}},$v: function(_a){var self;self=this;try{
    var elem;
    for (var i=0; i < self.length; i++) {
      elem = self[i];;_a((elem == null ? nil : elem));}
    return self}catch(_b){if(_b instanceof a$c && (!_b.a$b || _b.a$b==38))return _b.a$a;throw(_b)}},$3: function(_a){var self;self=this;try{  
    var elem;
    for (var i=0; i < self.length; i++) {
      elem = self[i];;_a([(elem == null ? nil : elem),i]);}
    return self}catch(_b){if(_b instanceof a$c && (!_b.a$b || _b.a$b==37))return _b.a$a;throw(_b)}},$P: function(){var self;self=this;var v = self[0]; return (v == null ? nil : v)},$H: function(){var self;self=this;return self.length},$5: function(){var self;self=this;
    var elem = self.pop();
    return (elem == null ? nil : elem)},$k: function(){var self;self=this;
    var elem = self.shift();
    return (elem == null ? nil : elem)},$l: function(){var self;self=this;return (self.length == 0)},$V: function(){var self,_a;_a=nil;self=this;_a=self;return _a},$7: function(){var self,_a,_b;self=this;_a=[];for(_b=1;_b<arguments.length;_b++)_a.push(arguments[_b]);;self.push.apply(self, _a); return self},$6: function(){var self,_a;_a=nil;self=this;_a=self;return _a},$_: function(){var self;self=this;return self.concat()},$i: function(){var self,_a,_e;_e=nil;self=this;_a="[";_a=(_a)+(self.$U(function(_b){var _c;var _d=nil;_c=_b==null?nil:_b;_d=_c.$i();return _d}).$1(nil,", "));_a=(_a)+("]");_e=_a;return _e},$9: function(){var self;self=this;self.reverse(); return self},$8: function(){var self,_a,_b;self=this;_a=[];for(_b=1;_b<arguments.length;_b++)_a.push(arguments[_b]);;self.unshift.apply(self, _a); return self},$1: function(_i,_a){var self,_b,_d,_h;_h=nil;self=this;try{if(_a==null)_a="";;_b="";self.$3(function(_c){var _e,_f;var _g=nil;(_d=a$j(_c),_e=_d[0]==null?nil:_d[0],_f=_d[1]==null?nil:_d[1],_d);_b=(_b)+(_e.$o());if((_d=_f.$$(nil,(self.$H())-(1)),_d===false||_d===nil)){_g=_b=(_b)+(_a)}else{_g=nil};return _g});_h=_b;return _h}catch(_j){if(_j instanceof a$c && (!_j.a$b || _j.a$b==40))return _j.a$a;throw(_j)}}}});$n = a$d({a$j: [],a$e: $k,a$f: {$ab: function(_c,_a,_b){var self;self=this;try{if(_b==null)_b="";;
    _a.innerHTML = _b;
    return nil}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==43))return _d.a$a;throw(_d)}},$ac: function(_b,_a){var self;self=this;try{return document.getElementById(_a) || nil}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==44))return _c.a$a;throw(_c)}},$aa: function(_d,_a,_b,_c){var self;self=this;try{_a[_b] = _c; return nil}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==42))return _e.a$a;throw(_e)}},$ad: function(_c,_a,_b){var self;self=this;try{
    var ret = _a.style[_b];
    return (ret == null) ? nil : ret}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==45))return _d.a$a;throw(_d)}},$o: function(_b,_a){var self;self=this;try{return _a.outerHTML}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==41))return _c.a$a;throw(_c)}},$ae: function(_b,_a){var self;self=this;try{
    var sib = _a.nextSibling;
    while (sib && sib.nodeType != 1)
      sib = sib.nextSibling;
    return sib || nil}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==46))return _c.a$a;throw(_c)}},$af: function(_d,_a){var self,_b,_c;self=this;if(self.$ag==null)self.$ag=nil;try{if((_b=(_c=self.$ag, (_c!==false&&_c!==nil) ? (self.$ah(nil,_a,self.$ag)) : _c),_b!==false&&_b!==nil)){self.$ag=nil};if (_a == window.a$k) window.a$k = null;;return nil}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==47))return _e.a$a;throw(_e)}},$ai: function(_d,_a,_b){var self,_c;self=this;try{if(_b==null)_b=true;;if((_c=_b,_c!==false&&_c!==nil)){_a.style.display = ''}else{_a.style.display = 'none'};return nil}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==48))return _e.a$a;throw(_e)}},$ah: function(_c,_a,_b){var self;self=this;try{return (_a == _b)}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==49))return _d.a$a;throw(_d)}},$aj: function(){var self,_a;_a=nil;self=this;_a=self.$ak(nil,"colgroup");return _a},$al: function(){var self,_a;_a=nil;self=this;_a=self.$am(nil,"text");return _a},$an: function(_c,_a,_b){var self;self=this;try{
    var i = parseInt(_a.style[_b]);
    return ((!i) ? 0 : i)}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==50))return _d.a$a;throw(_d)}},$ao: function(_b,_a){var self;self=this;try{
    var e = document.createElement("INPUT");
    e.type = 'radio';
    e.name = _a;
    return e}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==51))return _c.a$a;throw(_c)}},$ap: function(_b,_a){var self;self=this;try{
    // To mimic IEs +innerText+ property in the W3C DOM, we need to recursively
    // concatenate all child text nodes (depth first).
    var text = '', child = _a.firstChild;
    while (child) {
      // 1 == Element node
      if (child.nodeType == 1) {
        text += this.$ap(nil, child);
      } else if (child.nodeValue) {
        text += child.nodeValue;
      }
      child = child.nextSibling;
    }
    return text}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==52))return _c.a$a;throw(_c)}},$aq: function(_b,_a){var self;self=this;try{self.$ag=_a;window.a$k = _a;;return nil}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==53))return _c.a$a;throw(_c)}},$ar: function(_b,_a){var self;self=this;try{
    var ret = _a.src;
    return (ret == null) ? nil : ret}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==54))return _c.a$a;throw(_c)}},$as: function(_e,_a,_b,_c){var self,_d;_d=nil;self=this;try{self.$at(nil,_a,"position","absolute");self.$at(nil,_a,"left",(_b)+("px"));_d=self.$at(nil,_a,"top",(_c)+("px"));return _d}catch(_f){if(_f instanceof a$c && (!_f.a$b || _f.a$b==55))return _f.a$a;throw(_f)}},$au: function(){var self,_a;_a=nil;self=this;_a=self.$ak(nil,"tr");return _a},$av: function(_c,_a,_b){var self;self=this;try{
    var ret = _a[_b];
    return (ret == null) ? nil : String(ret)}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==56))return _d.a$a;throw(_d)}},$ay: function(){var self,_a;_a=nil;self=this;_a=self.$ak(nil,"caption");return _a},$az: function(_c,_a,_b){var self;self=this;try{
    var i = parseInt(_a[_b]);
    return ((!i) ? 0 : i)}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==58))return _d.a$a;throw(_d)}},$ax: function(_c,_a,_b){var self;self=this;try{
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
    
    return nil}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==57))return _d.a$a;throw(_d)}},$aA: function(_d,_a,_b,_c){var self;self=this;try{_a.setAttribute(_b, _c); return nil}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==59))return _e.a$a;throw(_e)}},$aw: function(){var self;self=this;return document.body.clientWidth},$aB: function(_b,_a){var self;self=this;try{return _a.a$l || 0}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==60))return _c.a$a;throw(_c)}},$aD: function(){var self,_a;_a=nil;self=this;_a=self.$ak(nil,"tbody");return _a},$aC: function(_c,_a,_b){var self;self=this;try{_a.src = _b; return nil}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==61))return _d.a$a;throw(_d)}},$am: function(_b,_a){var self;self=this;try{
    var e = document.createElement("INPUT");
    e.type = _a;
    return e}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==62))return _c.a$a;throw(_c)}},$aE: function(_b,_a){var self;self=this;try{
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
    return nil}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==63))return _c.a$a;throw(_c)}},$aF: function(){var self,_a;_a=nil;self=this;_a=self.$ak(nil,"legend");return _a},$aG: function(){var self,_a;_a=nil;self=this;_a=self.$ak(nil,"fieldset");return _a},$ak: function(_b,_a){var self;self=this;try{return document.createElement(_a)}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==64))return _c.a$a;throw(_c)}},$aI: function(){var self,_a;_a=nil;self=this;_a=self.$ak(nil,"div");return _a},$aJ: function(_b,_a){var self;self=this;try{
    var child = _a.firstChild;
    while (child && child.nodeType != 1)
      child = child.nextSibling;
    return child || nil}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==65))return _c.a$a;throw(_c)}},$aH: function(){var self;self=this;return document.body.clientHeight},$aK: function(_b,_a){var self;self=this;try{
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
    return left}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==66))return _c.a$a;throw(_c)}},$aL: function(_d,_a,_b,_c){var self;self=this;try{_a.insertBefore(_b, _c); return nil}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==67))return _e.a$a;throw(_e)}},$aM: function(_d,_a,_b,_c){var self;self=this;try{var option = _a.options[_c];
    option.text = _b;
    return nil}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==68))return _e.a$a;throw(_e)}},$aN: function(_c,_a,_b){var self;self=this;try{_a.removeChild(_b); return nil}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==69))return _d.a$a;throw(_d)}},$aO: function(_b,_a){var self;self=this;try{
    var ret = _a.innerHTML;
    return (ret == null) ? nil : ret}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==70))return _c.a$a;throw(_c)}},$aP: function(){var self,_a;_a=nil;self=this;_a=self.$ak(nil,"td");return _a},$aQ: function(){var self,_a;_a=nil;self=this;_a=self.$am(nil,"password");return _a},$aR: function(){var self,_a;_a=nil;self=this;_a=self.$ak(nil,"textarea");return _a},$aS: function(){var self,_a;_a=nil;self=this;_a=self.$ak(nil,"tfoot");return _a},$aT: function(){var self,_a;_a=nil;self=this;_a=self.$am(nil,"checkbox");return _a},$aV: function(_c,_a,_b){var self;self=this;try{
    var ret = _a.getAttribute(_b);
    return (ret == null) ? nil : ret}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==72))return _d.a$a;throw(_d)}},$aW: function(){var self,_a;_a=nil;self=this;_a=self.$ak(nil,"form");return _a},$aX: function(){var self,_a;_a=nil;self=this;_a=self.$ak(nil,"button");return _a},$aY: function(){var self,_a;_a=nil;self=this;_a=self.$ak(nil,"label");return _a},$aU: function(_c,_a,_b){var self;self=this;try{_a.a$n = (_b === nil) ? null : _b; return nil}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==71))return _d.a$a;throw(_d)}},$aZ: function(_b,_a){var self;self=this;try{return (_a.style.display != 'none')}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==73))return _c.a$a;throw(_c)}},$a0: function(){var self,_a;_a=nil;self=this;_a=self.$ak(nil,"th");return _a},$a1: function(_c,_a,_b){var self;self=this;try{
    var count = 0, child = _a.firstChild;
    while (child) {
      if (child == _b)
        return count;
      if (child.nodeType == 1)
        ++count;
      child = child.nextSibling;
    }

    return nil}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==74))return _d.a$a;throw(_d)}},$a2: function(){var self,_a;_a=nil;self=this;_a=self.$ak(nil,"col");return _a},$a3: function(){var self,_a;_a=nil;self=this;_a=self.$ak(nil,"iframe");return _a},$a4: function(){var self,_a;_a=nil;self=this;_a=self.$ak(nil,"options");return _a},$a5: function(_c,_a,_b){var self;self=this;try{
    var p = _a.parentNode;
    if (!p) return;
    p.insertBefore(_b, _a);
    p.removeChild(_a);
    return nil}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==75))return _d.a$a;throw(_d)}},$a7: function(){var self,_a;_a=nil;self=this;_a=self.$ak(nil,"A");return _a},$a8: function(_b,_a){var self;self=this;try{_a.a$n = null; return nil}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==77))return _c.a$a;throw(_c)}},$a6: function(_c,_a,_b){var self;self=this;try{
    // Remove all children first.
    while (_a.firstChild) {
      _a.removeChild(_a.firstChild);
    }
    // Add a new text node.
    if (_b !== nil) {
      _a.appendChild(document.createTextNode(_b));
    }
    return nil}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==76))return _d.a$a;throw(_d)}},$a9: function(){var self,_a;_a=nil;self=this;_a=self.$ak(nil,"img");return _a},$at: function(_d,_a,_b,_c){var self;self=this;try{_a.style[_b] = _c; return nil}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==78))return _e.a$a;throw(_e)}},$a_: function(_c,_a,_b){var self;self=this;try{
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

    return nil}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==79))return _d.a$a;throw(_d)}},$a$: function(){var self;self=this;if(self.$ag==null)self.$ag=nil;return self.$ag},$ba: function(_c,_a,_b){var self;self=this;try{
    while (_b) {
      if (_a == _b) {
        return true;
      }
      _b = _b.parentNode;
      if (_b && (_b.nodeType != 1)) {
        _b = null;
      }
    }
    return false}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==80))return _d.a$a;throw(_d)}},$bb: function(){var self,_a;_a=nil;self=this;_a=self.$ak(nil,"table");return _a},$bc: function(){var self,_a;_a=nil;self=this;_a=self.$ak(nil,"thead");return _a},$be: function(_c,_a,_b){var self;self=this;try{return !!_a[_b]}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==82))return _d.a$a;throw(_d)}},$bd: function(_b,_a){var self;self=this;try{
    var count = 0, child = _a.firstChild;
    while (child) {
      if (child.nodeType == 1)
        ++count;
      child = child.nextSibling;
    }
    return count}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==81))return _c.a$a;throw(_c)}},$bh: function(_c,_a,_b){var self;self=this;try{return !!_a.style[_b]}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==84))return _d.a$a;throw(_d)}},$bg: function(_c,_a,_b){var self;self=this;try{_a.removeAttribute(_b); return nil}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==83))return _d.a$a;throw(_d)}},$bf: function(){var self,_a;_a=nil;self=this;_a=self.$ak(nil,"span");return _a},$bn: function(_b,_a){var self;self=this;try{
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
    return top}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==90))return _c.a$a;throw(_c)}},$bm: function(_b,_a){var self;self=this;try{
    var parent = _a.parentNode;
    if(parent == null) {
      return nil;
    }
    if (parent.nodeType != 1)
      parent = null;
    return parent || nil}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==89))return _c.a$a;throw(_c)}},$bl: function(_c,_a){var self,_b;_b=nil;self=this;try{self.$at(nil,_a,"left","");self.$at(nil,_a,"top","");_b=self.$at(nil,_a,"position","static");return _b}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==88))return _d.a$a;throw(_d)}},$bk: function(_d,_a){var self,_b,_c;self=this;try{if(_a==null)_a=false;;_b=self.$ak(nil,"select");if((_c=_a,_c!==false&&_c!==nil)){self.$aa(nil,_b,"multiple",true)};return _b}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==87))return _e.a$a;throw(_e)}},$bj: function(_c,_a,_b){var self;self=this;try{_a.appendChild(_b); return nil}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==86))return _d.a$a;throw(_d)}},$bi: function(_d,_a,_b,_c){var self;self=this;try{
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
    return nil}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==85))return _e.a$a;throw(_e)}}},a$c: "DOM"});$o = a$d({a$j: [],a$e: $k,a$c: "Range",a$h: {$$: function(_e,_a){var self,_b,_c,_d;_d=nil;self=this;if(self.$bo==null)self.$bo=nil;if(self.$bp==null)self.$bp=nil;if(self.$bq==null)self.$bq=nil;try{if (self.constructor != _a.constructor) return false;;_d=(_b=self.$bo.$$(nil,_a.$P()), (_b!==false&&_b!==nil) ? ((_c=self.$bp.$$(nil,_a.$2()), (_c!==false&&_c!==nil) ? (self.$bq.$$(nil,_a.$br())) : _c)) : _b);return _d}catch(_f){if(_f instanceof a$c && (!_f.a$b || _f.a$b==91))return _f.a$a;throw(_f)}},$bs: function(){var self,_a;_a=nil;self=this;if(self.$bo==null)self.$bo=nil;_a=self.$bo;return _a},$g: function(_e,_a){var self,_b,_c,_d;_d=nil;self=this;if(self.$bo==null)self.$bo=nil;if(self.$bp==null)self.$bp=nil;if(self.$bq==null)self.$bq=nil;try{if (self.constructor != _a.constructor) return false;;_d=(_b=self.$bo.$g(nil,_a.$P()), (_b!==false&&_b!==nil) ? ((_c=self.$bp.$g(nil,_a.$2()), (_c!==false&&_c!==nil) ? (self.$bq.$$(nil,_a.$br())) : _c)) : _b);return _d}catch(_f){if(_f instanceof a$c && (!_f.a$b || _f.a$b==92))return _f.a$a;throw(_f)}},$br: function(){var self,_a;_a=nil;self=this;if(self.$bq==null)self.$bq=nil;_a=self.$bq;return _a},$2: function(){var self,_a;_a=nil;self=this;if(self.$bp==null)self.$bp=nil;_a=self.$bp;return _a},$o: function(){var self,_b,_a;_a=nil;self=this;if(self.$bo==null)self.$bo=nil;if(self.$bp==null)self.$bp=nil;if(self.$bq==null)self.$bq=nil;if((_b=self.$bq,_b!==false&&_b!==nil)){_a=("" + (self.$bo).$o() + ("...").$o() + (self.$bp).$o())}else{_a=("" + (self.$bo).$o() + ("..").$o() + (self.$bp).$o())};return _a},$v: function(_c){var self,_a,_b,_d;_d=nil;self=this;if(self.$bo==null)self.$bo=nil;if(self.$bp==null)self.$bp=nil;if(self.$bq==null)self.$bq=nil;try{_a=self.$bo;if((_b=(self.$bo)>(self.$bp),_b!==false&&_b!==nil)){return nil};if((_b=self.$bq,_b!==false&&_b!==nil)){while((_b=(_a)<(self.$bp),_b!==false&&_b!==nil)){_c(_a);_a=_a.$bv()};_d=nil;}else{while((_b=(_a)<=(self.$bp),_b!==false&&_b!==nil)){_c(_a);_a=_a.$bv()};_d=nil;};return _d}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==95))return _e.a$a;throw(_e)}},$bu: function(){var self,_a;_a=nil;self=this;if(self.$bp==null)self.$bp=nil;_a=self.$bp;return _a},$P: function(){var self,_a;_a=nil;self=this;if(self.$bo==null)self.$bo=nil;_a=self.$bo;return _a},$bt: function(_d,_a){var self,_b,_c;_c=nil;self=this;if(self.$bo==null)self.$bo=nil;if(self.$bp==null)self.$bp=nil;if(self.$bq==null)self.$bq=nil;try{if((_b=(_a)<(self.$bo),_b!==false&&_b!==nil)){return false};if((_b=self.$bq,_b!==false&&_b!==nil)){_c=(_a)<(self.$bp)}else{_c=(_a)<=(self.$bp)};return _c}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==94))return _e.a$a;throw(_e)}},$c: function(_f,_a,_b,_c){var self,_d,_e;_e=nil;self=this;try{if(_c==null)_c=false;;(_d=[_a,_b],self.$bo=_d[0]==null?nil:_d[0],self.$bp=_d[1]==null?nil:_d[1],_d);_e=self.$bq=((_d=_c,_d!==false&&_d!==nil)?true:false);return _e}catch(_g){if(_g instanceof a$c && (!_g.a$b || _g.a$b==93))return _g.a$a;throw(_g)}},$f: function(_d,_a){var self,_b,_c;_c=nil;self=this;if(self.$bo==null)self.$bo=nil;if(self.$bp==null)self.$bp=nil;if(self.$bq==null)self.$bq=nil;try{if((_b=(_a)<(self.$bo),_b!==false&&_b!==nil)){return false};if((_b=self.$bq,_b!==false&&_b!==nil)){_c=(_a)<(self.$bp)}else{_c=(_a)<=(self.$bp)};return _c}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==96))return _e.a$a;throw(_e)}},$V: function(){var self,_a,_b,_c;self=this;if(self.$bo==null)self.$bo=nil;if(self.$bp==null)self.$bp=nil;if(self.$bq==null)self.$bq=nil;_a=[];if((_b=(self.$bo)>(self.$bp),_b!==false&&_b!==nil)){return _a};_c=self.$bo;if((_b=self.$bq,_b!==false&&_b!==nil)){while((_b=(_c)<(self.$bp),_b!==false&&_b!==nil)){_a.$R(nil,_c);_c=_c.$bv()}}else{while((_b=(_c)<=(self.$bp),_b!==false&&_b!==nil)){_a.$R(nil,_c);_c=_c.$bv()}};return _a},$i: function(){var self,_b,_a;_a=nil;self=this;if(self.$bo==null)self.$bo=nil;if(self.$bp==null)self.$bp=nil;if(self.$bq==null)self.$bq=nil;if((_b=self.$bq,_b!==false&&_b!==nil)){_a=("" + (self.$bo.$i()).$o() + ("...").$o() + (self.$bp.$i()).$o())}else{_a=("" + (self.$bo.$i()).$o() + ("..").$o() + (self.$bp.$i()).$o())};return _a},$bw: function(_d,_a){var self,_b,_c;_c=nil;self=this;if(self.$bo==null)self.$bo=nil;if(self.$bp==null)self.$bp=nil;if(self.$bq==null)self.$bq=nil;try{if((_b=(_a)<(self.$bo),_b!==false&&_b!==nil)){return false};if((_b=self.$bq,_b!==false&&_b!==nil)){_c=(_a)<(self.$bp)}else{_c=(_a)<=(self.$bp)};return _c}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==97))return _e.a$a;throw(_e)}}}});$f = a$d({a$j: [],a$e: $k,a$c: "Exception",a$h: {$bx: function(){var self,_a;_a=nil;self=this;if(self.$by==null)self.$by=nil;_a=self.$by;return _a},$o: function(){var self,_a;_a=nil;self=this;if(self.$by==null)self.$by=nil;_a=self.$by;return _a},$c: function(_d,_a){var self,_c,_b;_b=nil;self=this;try{if(_a==null)_a=nil;;if((_c=_a.$q(),_c!==false&&_c!==nil)){_b=self.$by=self.$z().$e()}else{_b=self.$by=_a};return _b}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==98))return _e.a$a;throw(_e)}},$i: function(){var self,_a;_a=nil;self=this;if(self.$by==null)self.$by=nil;_a=("#<" + (self.$z().$e()).$o() + (": ").$o() + (self.$by).$o() + (">").$o());return _a}}});$p = a$d({a$j: [],a$e: $f,a$c: "StandardError"});$q = a$d({a$j: [],a$e: $p,a$c: "NameError"});$g = a$d({a$j: [],a$e: $q,a$c: "NoMethodError"});$d = a$d({a$j: [],a$e: $p,a$c: "TypeError"});$r = a$d({a$j: [],a$e: $k,a$c: "Number",a$d: Number,a$h: {$E: function(_b,_a){var self;self=this;try{return self + _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==102))return _c.a$a;throw(_c)}},$$: function(_b,_a){var self;self=this;try{return self == _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==101))return _c.a$a;throw(_c)}},$bA: function(_d,_a){var self,_b,_c;self=this;try{_b=self;while((_c=(_b)>=(_a),_c!==false&&_c!==nil)){_d(_b);_b=(_b)-(1)};return self}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==100))return _e.a$a;throw(_e)}},$bz: function(_d,_a){var self,_b,_c;self=this;try{_b=self;while((_c=(_b)<=(_a),_c!==false&&_c!==nil)){_d(_b);_b=(_b)+(1)};return self}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==99))return _e.a$a;throw(_e)}},$bB: function(_b,_a){var self;self=this;try{return self <= _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==103))return _c.a$a;throw(_c)}},$bC: function(_b,_a){var self;self=this;try{return self - _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==104))return _c.a$a;throw(_c)}},$bv: function(){var self;self=this;return self+1},$bD: function(_b,_a){var self;self=this;try{return self / _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==106))return _c.a$a;throw(_c)}},$o: function(_b,_a){var self;self=this;try{if(_a==null)_a=10;;return self.toString(_a)}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==105))return _c.a$a;throw(_c)}},$bE: function(_b,_a){var self;self=this;try{return self % _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==107))return _c.a$a;throw(_c)}},$bI: function(_b,_a){var self;self=this;try{return self & _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==111))return _c.a$a;throw(_c)}},$bH: function(_b,_a){var self;self=this;try{return self < _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==110))return _c.a$a;throw(_c)}},$bG: function(_c){var self,_a,_b;self=this;try{_a=0;while((_b=(_a)<(self),_b!==false&&_b!==nil)){_c(_a);_a=(_a)+(1)};return self}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==109))return _d.a$a;throw(_d)}},$bF: function(_b,_a){var self;self=this;try{return self | _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==108))return _c.a$a;throw(_c)}},$bM: function(){var self;self=this;return -self},$bL: function(_b,_a){var self;self=this;try{return self > _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==113))return _c.a$a;throw(_c)}},$bK: function(_b,_a){var self;self=this;try{return self ^ _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==112))return _c.a$a;throw(_c)}},$bJ: function(){var self;self=this;return ~self},$bN: function(_b,_a){var self;self=this;try{return self >= _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==114))return _c.a$a;throw(_c)}},$i: function(){var self;self=this;return self.toString()},$bP: function(_b,_a){var self;self=this;try{return self * _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==115))return _c.a$a;throw(_c)}},$bO: function(){var self;self=this;return self}}});$s = a$d({a$j: [],a$e: $r,a$c: "Bignum",a$d: Number});$t = a$d({a$j: [$l],a$e: $k,a$f: {$bS: function(){var self,_a,_b,_c;self=this;_a=[];for(_b=1;_b<arguments.length;_b++)_a.push(arguments[_b]);;if((_b=_a.$H().$bE(nil,2).$$(nil,0),_b===false||_b===nil)){self.$j(nil,$a)};_c=self.$b();
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

    _c.a$o = items; 
    _c.a$p = nil;
    return _c;
    },$bT: function(_d,_a){var self,_b,_c;_c=nil;self=this;try{_c=_b=self.$a();return _c}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==119))return _e.a$a;throw(_e)}}},a$c: "Hash",a$h: {$I: function(_b,_a){var self;self=this;try{
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
    }catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==116))return _c.a$a;throw(_c)}},$bQ: function(){var self,_b,_f;_b=_f=nil;self=this;_f=self.$U(function(_a){var _c,_d;var _e=nil;(_b=a$j(_a),_c=_b[0]==null?nil:_b[0],_d=_b[1]==null?nil:_b[1],_b);_e=_c;return _e});return _f},$o: function(){var self,_a,_c,_g;_c=_g=nil;self=this;_a=[];self.$v(function(_b){var _d,_e;var _f=nil;(_c=a$j(_b),_d=_c[0]==null?nil:_c[0],_e=_c[1]==null?nil:_c[1],_c);_a.$R(nil,_d);_f=_a.$R(nil,_e);return _f});_g=_a.$1(nil,"");return _g},$4: function(_c,_a,_b){var self;self=this;try{
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
    }catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==118))return _d.a$a;throw(_d)}},$v: function(_a){var self;self=this;try{
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
    }catch(_b){if(_b instanceof a$c && (!_b.a$b || _b.a$b==117))return _b.a$a;throw(_b)}},$c: function(){var self;self=this;
    self.a$o = {}; 
    self.a$p = nil;
    return nil},$bR: function(){var self,_b,_f;_b=_f=nil;self=this;_f=self.$U(function(_a){var _c,_d;var _e=nil;(_b=a$j(_a),_c=_b[0]==null?nil:_b[0],_d=_b[1]==null?nil:_b[1],_b);_e=_d;return _e});return _f},$i: function(){var self,_a,_c,_g;_c=_g=nil;self=this;_a="{";_a=(_a)+(self.$U(function(_b){var _d,_e;var _f=nil;(_c=a$j(_b),_d=_c[0]==null?nil:_c[0],_e=_c[1]==null?nil:_c[1],_c);_f=((_d.$i())+("=>"))+(_e.$i());return _f}).$1(nil,", "));_a=(_a)+("}");_g=_a;return _g}}});$u = a$d({a$j: [],a$e: $k,a$c: "Regexp",a$d: RegExp});$c = a$d({a$j: [],a$e: $p,a$c: "RuntimeError"});$v = a$d({a$j: [],a$e: $r,a$c: "Fixnum",a$d: Number});$h = a$d({a$j: [],a$e: $k,a$f: {$a: function(_a){var self,_b,_c;self=this;_b=_a==null?nil:_a;try{if((_c=_b,_c===false||_c===nil)){self.$j(nil,$a,"tried to create Proc object without a block")};return (function() {
      try {
        return _b.$S.apply(_b, arguments);
      } catch(e) 
      {
        if (e instanceof a$c) 
        {
          if (e.a$b == null)
          {;self.$j(nil,$w,"break from proc-closure");}
          return e.a$a;
        }
        else throw(e);
      }
    })}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==120))return _d.a$a;throw(_d)}}},a$c: "Proc",a$d: Function,a$h: {$S: function(){var self,_a,_b;self=this;_a=[];for(_b=1;_b<arguments.length;_b++)_a.push(arguments[_b]);;
    // TODO: use switch/case
    if (_a.length == 0) return self();
    else if (_a.length == 1) return self(_a[0]);
    else return self(_a);}}});$w = a$d({a$j: [],a$e: $p,a$c: "LocalJumpError"});$x = a$d({a$j: [],a$e: $r,a$c: "Float",a$d: Number});$y = a$d({a$j: [],a$e: $k,a$c: "NilClass",a$d: NilClass,a$h: {$bU: function(){var self,_a;_a=nil;self=this;_a=0.0;return _a},$q: function(){var self,_a;_a=nil;self=this;_a=true;return _a},$o: function(){var self,_a;_a=nil;self=this;_a="";return _a},$bV: function(){var self,_a;_a=nil;self=this;_a=0;return _a},$V: function(){var self,_a;_a=nil;self=this;_a=[];return _a},$bW: function(){var self,_a;_a=nil;self=this;_a=[];return _a},$i: function(){var self,_a;_a=nil;self=this;_a="nil";return _a}}});$j = a$d({a$j: [],a$e: $k,a$c: "Method",a$h: {$c: function(_f,_a,_b){var self,_c,_d,_e;_e=nil;self=this;try{(_c=[_a,_b],self.$bX=_c[0]==null?nil:_c[0],self.$bY=_c[1]==null?nil:_c[1],_c);_d=nil;_d = _a[a$f[_b]];
    if (_d==null) _d = nil;;if((_c=_d,_c!==false&&_c!==nil)){_e=self.$bZ=_d}else{_e=self.$j(nil,$q,("undefined method `" + (_b).$o() + ("' for class `").$o() + (_a.$z().$e()).$o() + ("'").$o()))};return _e}catch(_g){if(_g instanceof a$c && (!_g.a$b || _g.a$b==121))return _g.a$a;throw(_g)}},$S: function(_c){var self,_a,_b,_d;self=this;_d=_c==null?nil:_c;try{_a=[];for(_b=1;_b<arguments.length;_b++)_a.push(arguments[_b]);;return self.$bZ.apply(self.$bX, [_d].concat(_a))}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==122))return _e.a$a;throw(_e)}},$i: function(){var self,_a;_a=nil;self=this;if(self.$bX==null)self.$bX=nil;if(self.$bY==null)self.$bY=nil;_a=("#<Method: " + (self.$bX.$z().$e()).$o() + ("#").$o() + (self.$bY).$o() + (">").$o());return _a}}});$z = a$d({a$j: [],a$e: $k,a$c: "MatchData",a$h: {$c: function(_c,_a){var self,_b;_b=nil;self=this;try{_b=self.$b0=_a;return _b}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==123))return _d.a$a;throw(_d)}}}});$A = a$d({a$j: [],a$e: $k,a$f: {$b1: function(){var self,_a,_b;_b=nil;self=this;_a=$n.$ac(nil,"out");_b=$n.$a6(nil,_a,"hello world");return _b}},a$c: "HelloWorld"});$B = a$d({a$j: [],a$e: $k,a$c: "Boolean",a$d: Boolean,a$h: {$$: function(_b,_a){var self;self=this;try{return (self == _a)}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==124))return _c.a$a;throw(_c)}},$o: function(){var self;self=this;return (self == true ? 'true' : 'false')},$i: function(){var self;self=this;return (self == true ? 'true' : 'false')}}});$a = a$d({a$j: [],a$e: $p,a$c: "ArgumentError"});      $b.a$e = $k;
var a$k = [$i,$k,$b,$e,$l,$m,$n,$o,$f,$p,$q,$g,$d,$r,$s,$t,$u,$c,$v,$h,$w,$x,$y,$j,$z,$A,$B,$a];
a$l(a$k);
function main() { return $A.$b1.apply($A, arguments); }