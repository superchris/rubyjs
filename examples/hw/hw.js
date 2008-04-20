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
      return self.$n.apply(self, [_e].concat([_a]).concat(_b));}catch(_f){if(_f instanceof a$c && (!_f.a$b || _f.a$b==4))return _f.a$a;throw(_f)}},$n: function(_d,_a){var self,_b,_c,_e,_f;_f=nil;self=this;_e=_d==null?nil:_d;try{_b=[];for(_c=2;_c<arguments.length;_c++)_b.push(arguments[_c]);;_f=self.$j(nil,$g,("undefined method `" + ((_a).$o()) + ("' for ") + ((self.$i()).$o())));return _f}catch(_g){if(_g instanceof a$c && (!_g.a$b || _g.a$b==3))return _g.a$a;throw(_g)}},$j: function(){var self,_a,_b,_c,_d;self=this;_a=[];for(_b=1;_b<arguments.length;_b++)_a.push(arguments[_b]);;_c=((_b=_a.$l(),_b!==false&&_b!==nil)?$c.$a(nil,""):(_d=_a.$k(),((_b=_d.$h(nil,$b),_b!==false&&_b!==nil)?_d.$d(nil,'$a',a$b(_a)):((_b=_d.$m(nil,$f),_b!==false&&_b!==nil)?((_b=_a.$l(),_b!==false&&_b!==nil)?_d:$a.$a(nil,"to many arguments given to raise")):((_b=_d.$m(nil,$e),_b!==false&&_b!==nil)?((_b=_a.$l(),_b!==false&&_b!==nil)?$c.$a(nil,_d):$a.$a(nil,"to many arguments given to raise")):$d.$a(nil,"exception class/object expected"))))));throw(_c)},$q: function(){var self,_a;_a=nil;self=this;_a=false;return _a},$s: function(_a){var self,_b,_c;_c=nil;self=this;_b=_a==null?nil:_a;try{_c=$h.$a(_b);return _c}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==6))return _d.a$a;throw(_d)}},$r: function(_b,_a){var self;self=this;try{
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
      return self.$n.apply(self, [_e].concat([_a]).concat(_b));}catch(_f){if(_f instanceof a$c && (!_f.a$b || _f.a$b==8))return _f.a$a;throw(_f)}}}});$k = a$d({a$j: [$i],a$e: nil,a$c: "Object",a$h: {$h: function(_b,_a){var self;self=this;try{return a$i(self, _a)}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==11))return _c.a$a;throw(_c)}},$y: function(_b,_a){var self;self=this;try{return a$i(self, _a)}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==14))return _c.a$a;throw(_c)}},$n: function(_d,_a){var self,_b,_c,_e,_f;_f=nil;self=this;_e=_d==null?nil:_d;try{_b=[];for(_c=2;_c<arguments.length;_c++)_b.push(arguments[_c]);;_f=self.$j(nil,$g,("undefined method `" + ((_a).$o()) + ("' for ") + ((self.$i()).$o())));return _f}catch(_g){if(_g instanceof a$c && (!_g.a$b || _g.a$b==13))return _g.a$a;throw(_g)}},$p: function(_d,_a){var self,_b,_c,_e;self=this;_e=_d==null?nil:_d;try{_b=[];for(_c=2;_c<arguments.length;_c++)_b.push(arguments[_c]);;
    var m = self[a$f[_a]];
    if (m) 
      return m.apply(self, [_e].concat(_b));
    else
      return self.$n.apply(self, [_e].concat([_a]).concat(_b));}catch(_f){if(_f instanceof a$c && (!_f.a$b || _f.a$b==12))return _f.a$a;throw(_f)}},$j: function(){var self,_a,_b,_c,_d;self=this;_a=[];for(_b=1;_b<arguments.length;_b++)_a.push(arguments[_b]);;_c=((_b=_a.$l(),_b!==false&&_b!==nil)?$c.$a(nil,""):(_d=_a.$k(),((_b=_d.$h(nil,$b),_b!==false&&_b!==nil)?_d.$d(nil,'$a',a$b(_a)):((_b=_d.$m(nil,$f),_b!==false&&_b!==nil)?((_b=_a.$l(),_b!==false&&_b!==nil)?_d:$a.$a(nil,"to many arguments given to raise")):((_b=_d.$m(nil,$e),_b!==false&&_b!==nil)?((_b=_a.$l(),_b!==false&&_b!==nil)?$c.$a(nil,_d):$a.$a(nil,"to many arguments given to raise")):$d.$a(nil,"exception class/object expected"))))));throw(_c)},$z: function(){var self;self=this;return self.a$g},$g: function(_b,_a){var self;self=this;try{return (self.constructor == _a.constructor && self == _a)}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==15))return _c.a$a;throw(_c)}},$B: function(){var self;self=this;return self.toString()},$A: function(_a){var self,_b;_b=nil;self=this;try{_a(self);_b=self;return _b}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==16))return _c.a$a;throw(_c)}},$q: function(){var self,_a;_a=nil;self=this;_a=false;return _a},$o: function(){var self;self=this;return self.toString()},$r: function(_b,_a){var self;self=this;try{
    var m = a$f[_a]; 
    return (m !== undefined && self[m] !== undefined && !self[m].a$i)}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==18))return _c.a$a;throw(_c)}},$s: function(_a){var self,_b,_c;_c=nil;self=this;_b=_a==null?nil:_a;try{_c=$h.$a(_b);return _c}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==17))return _d.a$a;throw(_d)}},$c: function(){var self,_a;_a=nil;self=this;_a=nil;return _a},$C: function(_c,_a){var self,_b;_b=nil;self=this;try{_b=$j.$a(nil,self,_a);return _b}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==19))return _d.a$a;throw(_d)}},$t: function(){var self,_a,_b,_f;_f=nil;self=this;_a=[];for(_b=1;_b<arguments.length;_b++)_a.push(arguments[_b]);;_a.$v(function(_c){var _d;var _e=nil;_d=_c==null?nil:_c;_e=self.$u(nil,_d.$i());return _e});_f=nil;return _f},$d: function(_c,_a,_b){var self,_d;self=this;_d=_c==null?nil:_c;try{
    var m = self[_a];
    if (m)
      return m.apply(self, [_d].concat(_b));
    else
      return self.$n.apply(self, 
        [_d].concat([a$h[_a]]).concat(_b));}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==20))return _e.a$a;throw(_e)}},$f: function(_d,_a){var self,_b,_c;_c=nil;self=this;try{_c=(_b=self.$g(nil,_a), (_b!==false&&_b!==nil) ? _b : (self.$h(nil,_a)));return _c}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==21))return _e.a$a;throw(_e)}},$m: function(_b,_a){var self;self=this;try{return (self.a$g === _a)}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==25))return _c.a$a;throw(_c)}},$w: function(_d,_a){var self,_b,_c,_e;self=this;_e=_d==null?nil:_d;try{_b=[];for(_c=2;_c<arguments.length;_c++)_b.push(arguments[_c]);;
    var m = self[a$f[_a]];
    if (m) 
      return m.apply(self, [_e].concat(_b));
    else
      return self.$n.apply(self, [_e].concat([_a]).concat(_b));}catch(_f){if(_f instanceof a$c && (!_f.a$b || _f.a$b==24))return _f.a$a;throw(_f)}},$x: function(_a){var self,_b;_b=nil;self=this;try{while(true){_a()};_b=nil;;return _b}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==23))return _c.a$a;throw(_c)}},$u: function(_b,_a){var self;self=this;try{_a=_a.$o();alert(_a); return nil}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==22))return _c.a$a;throw(_c)}},$i: function(){var self;self=this;return self.toString()}}});$l = a$d({a$j: [],a$e: nil,a$c: "Enumerable",a$h: {$D: function(_a){var self,_b,_c,_f,_h;_h=nil;self=this;_b=_a==null?nil:_a;try{_c=[];self.$v(function(_d){var _e;var _g=nil;_e=_d==null?nil:_d;_g=_c.$E(nil,((_f=_b,_f!==false&&_f!==nil)?_b.$F(nil,_e):_e));return _g});_h=_c;return _h}catch(_i){if(_i instanceof a$c && (!_i.a$b || _i.a$b==26))return _i.a$a;throw(_i)}},$G: function(_f){var self,_a,_e,_g;_g=nil;self=this;try{_a=[];self.$v(function(_b){var _c;var _d=nil;_c=_b==null?nil:_b;if((_e=_f(_c),_e!==false&&_e!==nil)){_d=_a.$E(nil,_c)}else{_d=nil};return _d});_g=_a;return _g}catch(_h){if(_h instanceof a$c && (!_h.a$b || _h.a$b==27))return _h.a$a;throw(_h)}},$H: function(_a){var self,_b,_c,_f,_h;_h=nil;self=this;_b=_a==null?nil:_a;try{_c=[];self.$v(function(_d){var _e;var _g=nil;_e=_d==null?nil:_d;_g=_c.$E(nil,((_f=_b,_f!==false&&_f!==nil)?_b.$F(nil,_e):_e));return _g});_h=_c;return _h}catch(_i){if(_i instanceof a$c && (!_i.a$b || _i.a$b==28))return _i.a$a;throw(_i)}},$I: function(){var self,_a,_e;_e=nil;self=this;_a=[];self.$v(function(_b){var _c;var _d=nil;_c=_b==null?nil:_b;_d=_a.$E(nil,_c);return _d});_e=_a;return _e},$J: function(_f){var self,_a,_e,_g;_g=nil;self=this;try{_a=[];self.$v(function(_b){var _c;var _d=nil;_c=_b==null?nil:_b;if((_e=_f(_c),_e===false||_e===nil)){_d=_a.$E(nil,_c)}else{_d=nil};return _d});_g=_a;return _g}catch(_h){if(_h instanceof a$c && (!_h.a$b || _h.a$b==29))return _h.a$a;throw(_h)}},$K: function(_f){var self,_a,_e,_g;_g=nil;self=this;try{_a=[];self.$v(function(_b){var _c;var _d=nil;_c=_b==null?nil:_b;if((_e=_f(_c),_e!==false&&_e!==nil)){_d=_a.$E(nil,_c)}else{_d=nil};return _d});_g=_a;return _g}catch(_h){if(_h instanceof a$c && (!_h.a$b || _h.a$b==30))return _h.a$a;throw(_h)}}}});$m = a$d({a$j: [$l],a$e: $k,a$f: {$Q: function(){var self,_a,_b,_c;self=this;_a=[];for(_b=1;_b<arguments.length;_b++)_a.push(arguments[_b]);;if((_b=_a.$R().$S(nil,2).$T(nil,0),_b===false||_b===nil)){self.$j(nil,$a)};_c=self.$b();
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
    },$U: function(_d,_a){var self,_b,_c;_c=nil;self=this;try{_c=_b=self.$a();return _c}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==39))return _e.a$a;throw(_e)}}},a$c: "Hash",a$h: {$M: function(_b,_a){var self;self=this;try{
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
    }catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==31))return _c.a$a;throw(_c)}},$L: function(){var self,_b,_f;_b=_f=nil;self=this;_f=self.$H(function(_a){var _c,_d;var _e=nil;(_b=a$j(_a),_c=_b[0]==null?nil:_b[0],_d=_b[1]==null?nil:_b[1],_b);_e=_c;return _e});return _f},$D: function(_a){var self,_b,_c,_f,_h;_h=nil;self=this;_b=_a==null?nil:_a;try{_c=[];self.$v(function(_d){var _e;var _g=nil;_e=_d==null?nil:_d;_g=_c.$E(nil,((_f=_b,_f!==false&&_f!==nil)?_b.$F(nil,_e):_e));return _g});_h=_c;return _h}catch(_i){if(_i instanceof a$c && (!_i.a$b || _i.a$b==32))return _i.a$a;throw(_i)}},$o: function(){var self,_a,_c,_g;_c=_g=nil;self=this;_a=[];self.$v(function(_b){var _d,_e;var _f=nil;(_c=a$j(_b),_d=_c[0]==null?nil:_c[0],_e=_c[1]==null?nil:_c[1],_c);_a.$E(nil,_d);_f=_a.$E(nil,_e);return _f});_g=_a.$N(nil,"");return _g},$O: function(_c,_a,_b){var self;self=this;try{
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
    }catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==35))return _d.a$a;throw(_d)}},$v: function(_a){var self;self=this;try{
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
    }catch(_b){if(_b instanceof a$c && (!_b.a$b || _b.a$b==34))return _b.a$a;throw(_b)}},$c: function(){var self;self=this;
    self.a$k = {}; 
    self.a$l = nil;
    return nil},$G: function(_f){var self,_a,_e,_g;_g=nil;self=this;try{_a=[];self.$v(function(_b){var _c;var _d=nil;_c=_b==null?nil:_b;if((_e=_f(_c),_e!==false&&_e!==nil)){_d=_a.$E(nil,_c)}else{_d=nil};return _d});_g=_a;return _g}catch(_h){if(_h instanceof a$c && (!_h.a$b || _h.a$b==33))return _h.a$a;throw(_h)}},$P: function(){var self,_b,_f;_b=_f=nil;self=this;_f=self.$H(function(_a){var _c,_d;var _e=nil;(_b=a$j(_a),_c=_b[0]==null?nil:_b[0],_d=_b[1]==null?nil:_b[1],_b);_e=_d;return _e});return _f},$H: function(_a){var self,_b,_c,_f,_h;_h=nil;self=this;_b=_a==null?nil:_a;try{_c=[];self.$v(function(_d){var _e;var _g=nil;_e=_d==null?nil:_d;_g=_c.$E(nil,((_f=_b,_f!==false&&_f!==nil)?_b.$F(nil,_e):_e));return _g});_h=_c;return _h}catch(_i){if(_i instanceof a$c && (!_i.a$b || _i.a$b==36))return _i.a$a;throw(_i)}},$I: function(){var self,_a,_e;_e=nil;self=this;_a=[];self.$v(function(_b){var _c;var _d=nil;_c=_b==null?nil:_b;_d=_a.$E(nil,_c);return _d});_e=_a;return _e},$i: function(){var self,_a,_c,_g;_c=_g=nil;self=this;_a="{";_a=(_a)+(self.$H(function(_b){var _d,_e;var _f=nil;(_c=a$j(_b),_d=_c[0]==null?nil:_c[0],_e=_c[1]==null?nil:_c[1],_c);_f=((_d.$i())+("=>"))+(_e.$i());return _f}).$N(nil,", "));_a=(_a)+("}");_g=_a;return _g},$J: function(_f){var self,_a,_e,_g;_g=nil;self=this;try{_a=[];self.$v(function(_b){var _c;var _d=nil;_c=_b==null?nil:_b;if((_e=_f(_c),_e===false||_e===nil)){_d=_a.$E(nil,_c)}else{_d=nil};return _d});_g=_a;return _g}catch(_h){if(_h instanceof a$c && (!_h.a$b || _h.a$b==37))return _h.a$a;throw(_h)}},$K: function(_f){var self,_a,_e,_g;_g=nil;self=this;try{_a=[];self.$v(function(_b){var _c;var _d=nil;_c=_b==null?nil:_b;if((_e=_f(_c),_e!==false&&_e!==nil)){_d=_a.$E(nil,_c)}else{_d=nil};return _d});_g=_a;return _g}catch(_h){if(_h instanceof a$c && (!_h.a$b || _h.a$b==38))return _h.a$a;throw(_h)}}}});$n = a$d({a$j: [],a$e: $k,a$c: "Range",a$h: {$T: function(_e,_a){var self,_b,_c,_d;_d=nil;self=this;if(self.$Z==null)self.$Z=nil;if(self.$V==null)self.$V=nil;if(self.$X==null)self.$X=nil;try{if (self.constructor != _a.constructor) return false;;_d=(_b=self.$V.$T(nil,_a.$W()), (_b!==false&&_b!==nil) ? ((_c=self.$X.$T(nil,_a.$Y()), (_c!==false&&_c!==nil) ? (self.$Z.$T(nil,_a.$0())) : _c)) : _b);return _d}catch(_f){if(_f instanceof a$c && (!_f.a$b || _f.a$b==40))return _f.a$a;throw(_f)}},$1: function(){var self,_a;_a=nil;self=this;if(self.$V==null)self.$V=nil;_a=self.$V;return _a},$g: function(_e,_a){var self,_b,_c,_d;_d=nil;self=this;if(self.$Z==null)self.$Z=nil;if(self.$V==null)self.$V=nil;if(self.$X==null)self.$X=nil;try{if (self.constructor != _a.constructor) return false;;_d=(_b=self.$V.$g(nil,_a.$W()), (_b!==false&&_b!==nil) ? ((_c=self.$X.$g(nil,_a.$Y()), (_c!==false&&_c!==nil) ? (self.$Z.$T(nil,_a.$0())) : _c)) : _b);return _d}catch(_f){if(_f instanceof a$c && (!_f.a$b || _f.a$b==41))return _f.a$a;throw(_f)}},$0: function(){var self,_a;_a=nil;self=this;if(self.$Z==null)self.$Z=nil;_a=self.$Z;return _a},$Y: function(){var self,_a;_a=nil;self=this;if(self.$X==null)self.$X=nil;_a=self.$X;return _a},$o: function(){var self,_b,_a;_a=nil;self=this;if(self.$Z==null)self.$Z=nil;if(self.$V==null)self.$V=nil;if(self.$X==null)self.$X=nil;if((_b=self.$Z,_b!==false&&_b!==nil)){_a=("" + ((self.$V).$o()) + ("...") + ((self.$X).$o()))}else{_a=("" + ((self.$V).$o()) + ("..") + ((self.$X).$o()))};return _a},$v: function(_c){var self,_a,_b,_d;_d=nil;self=this;if(self.$Z==null)self.$Z=nil;if(self.$V==null)self.$V=nil;if(self.$X==null)self.$X=nil;try{_a=self.$V;if((_b=(self.$V)>(self.$X),_b!==false&&_b!==nil)){return nil};if((_b=self.$Z,_b!==false&&_b!==nil)){while((_b=(_a)<(self.$X),_b!==false&&_b!==nil)){_c(_a);_a=_a.$4()};_d=nil;}else{while((_b=(_a)<=(self.$X),_b!==false&&_b!==nil)){_c(_a);_a=_a.$4()};_d=nil;};return _d}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==44))return _e.a$a;throw(_e)}},$3: function(){var self,_a;_a=nil;self=this;if(self.$X==null)self.$X=nil;_a=self.$X;return _a},$W: function(){var self,_a;_a=nil;self=this;if(self.$V==null)self.$V=nil;_a=self.$V;return _a},$2: function(_d,_a){var self,_b,_c;_c=nil;self=this;if(self.$Z==null)self.$Z=nil;if(self.$V==null)self.$V=nil;if(self.$X==null)self.$X=nil;try{if((_b=(_a)<(self.$V),_b!==false&&_b!==nil)){return false};if((_b=self.$Z,_b!==false&&_b!==nil)){_c=(_a)<(self.$X)}else{_c=(_a)<=(self.$X)};return _c}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==43))return _e.a$a;throw(_e)}},$c: function(_f,_a,_b,_c){var self,_d,_e;_e=nil;self=this;try{if(_c==null)_c=false;;(_d=[_a,_b],self.$V=_d[0]==null?nil:_d[0],self.$X=_d[1]==null?nil:_d[1],_d);_e=self.$Z=((_d=_c,_d!==false&&_d!==nil)?true:false);return _e}catch(_g){if(_g instanceof a$c && (!_g.a$b || _g.a$b==42))return _g.a$a;throw(_g)}},$f: function(_d,_a){var self,_b,_c;_c=nil;self=this;if(self.$Z==null)self.$Z=nil;if(self.$V==null)self.$V=nil;if(self.$X==null)self.$X=nil;try{if((_b=(_a)<(self.$V),_b!==false&&_b!==nil)){return false};if((_b=self.$Z,_b!==false&&_b!==nil)){_c=(_a)<(self.$X)}else{_c=(_a)<=(self.$X)};return _c}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==45))return _e.a$a;throw(_e)}},$I: function(){var self,_a,_b,_c;self=this;if(self.$Z==null)self.$Z=nil;if(self.$V==null)self.$V=nil;if(self.$X==null)self.$X=nil;_a=[];if((_b=(self.$V)>(self.$X),_b!==false&&_b!==nil)){return _a};_c=self.$V;if((_b=self.$Z,_b!==false&&_b!==nil)){while((_b=(_c)<(self.$X),_b!==false&&_b!==nil)){_a.$E(nil,_c);_c=_c.$4()}}else{while((_b=(_c)<=(self.$X),_b!==false&&_b!==nil)){_a.$E(nil,_c);_c=_c.$4()}};return _a},$i: function(){var self,_b,_a;_a=nil;self=this;if(self.$Z==null)self.$Z=nil;if(self.$V==null)self.$V=nil;if(self.$X==null)self.$X=nil;if((_b=self.$Z,_b!==false&&_b!==nil)){_a=("" + ((self.$V.$i()).$o()) + ("...") + ((self.$X.$i()).$o()))}else{_a=("" + ((self.$V.$i()).$o()) + ("..") + ((self.$X.$i()).$o()))};return _a},$5: function(_d,_a){var self,_b,_c;_c=nil;self=this;if(self.$Z==null)self.$Z=nil;if(self.$V==null)self.$V=nil;if(self.$X==null)self.$X=nil;try{if((_b=(_a)<(self.$V),_b!==false&&_b!==nil)){return false};if((_b=self.$Z,_b!==false&&_b!==nil)){_c=(_a)<(self.$X)}else{_c=(_a)<=(self.$X)};return _c}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==46))return _e.a$a;throw(_e)}}}});$o = a$d({a$j: [$l],a$e: $k,a$f: {$a: function(){var self;self=this;return []}},a$c: "Array",a$d: Array,a$h: {$7: function(_b,_a){var self;self=this;try{return self.concat(_a)}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==49))return _c.a$a;throw(_c)}},$E: function(_b,_a){var self;self=this;try{self.push(_a); return self}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==48))return _c.a$a;throw(_c)}},$6: function(_b,_a){var self;self=this;try{
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
    return del ? _a : nil}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==47))return _c.a$a;throw(_c)}},$8: function(){var self;self=this;return self.length},$M: function(_b,_a){var self;self=this;try{var v = self[_a]; return (v == null ? nil : v)}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==51))return _c.a$a;throw(_c)}},$_: function(){var self;self=this;self.length=0; return self},$g: function(_b,_a){var self;self=this;try{
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
    }catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==50))return _c.a$a;throw(_c)}},$9: function(){var self;self=this;return self.concat().reverse()},$D: function(_a){var self,_b,_c,_f,_h;_h=nil;self=this;_b=_a==null?nil:_a;try{_c=[];self.$v(function(_d){var _e;var _g=nil;_e=_d==null?nil:_d;_g=_c.$E(nil,((_f=_b,_f!==false&&_f!==nil)?_b.$F(nil,_e):_e));return _g});_h=_c;return _h}catch(_i){if(_i instanceof a$c && (!_i.a$b || _i.a$b==52))return _i.a$a;throw(_i)}},$Y: function(){var self;self=this;var v = self[self.length - 1]; return (v == null ? nil : v)},$o: function(){var self,_d;_d=nil;self=this;_d=self.$H(function(_a){var _b;var _c=nil;_b=_a==null?nil:_a;_c=_b.$o();return _c}).$N();return _d},$O: function(_c,_a,_b){var self;self=this;try{return (self[_a] = _b)}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==56))return _d.a$a;throw(_d)}},$v: function(_a){var self;self=this;try{
    var elem;
    for (var i=0; i < self.length; i++) {
      elem = self[i];;_a((elem == null ? nil : elem));}
    return self}catch(_b){if(_b instanceof a$c && (!_b.a$b || _b.a$b==55))return _b.a$a;throw(_b)}},$$: function(_a){var self;self=this;try{  
    var elem;
    for (var i=0; i < self.length; i++) {
      elem = self[i];;_a([(elem == null ? nil : elem),i]);}
    return self}catch(_b){if(_b instanceof a$c && (!_b.a$b || _b.a$b==54))return _b.a$a;throw(_b)}},$W: function(){var self;self=this;var v = self[0]; return (v == null ? nil : v)},$G: function(_f){var self,_a,_e,_g;_g=nil;self=this;try{_a=[];self.$v(function(_b){var _c;var _d=nil;_c=_b==null?nil:_b;if((_e=_f(_c),_e!==false&&_e!==nil)){_d=_a.$E(nil,_c)}else{_d=nil};return _d});_g=_a;return _g}catch(_h){if(_h instanceof a$c && (!_h.a$b || _h.a$b==53))return _h.a$a;throw(_h)}},$R: function(){var self;self=this;return self.length},$aa: function(){var self;self=this;
    var elem = self.pop();
    return (elem == null ? nil : elem)},$k: function(){var self;self=this;
    var elem = self.shift();
    return (elem == null ? nil : elem)},$H: function(_a){var self,_b,_c,_f,_h;_h=nil;self=this;_b=_a==null?nil:_a;try{_c=[];self.$v(function(_d){var _e;var _g=nil;_e=_d==null?nil:_d;_g=_c.$E(nil,((_f=_b,_f!==false&&_f!==nil)?_b.$F(nil,_e):_e));return _g});_h=_c;return _h}catch(_i){if(_i instanceof a$c && (!_i.a$b || _i.a$b==57))return _i.a$a;throw(_i)}},$l: function(){var self;self=this;return (self.length == 0)},$I: function(){var self,_a,_e;_e=nil;self=this;_a=[];self.$v(function(_b){var _c;var _d=nil;_c=_b==null?nil:_b;_d=_a.$E(nil,_c);return _d});_e=_a;return _e},$ac: function(){var self,_a,_b;self=this;_a=[];for(_b=1;_b<arguments.length;_b++)_a.push(arguments[_b]);;self.push.apply(self, _a); return self},$ab: function(){var self,_a;_a=nil;self=this;_a=self;return _a},$af: function(){var self;self=this;return self.concat()},$i: function(){var self,_a,_e;_e=nil;self=this;_a="[";_a=(_a)+(self.$H(function(_b){var _c;var _d=nil;_c=_b==null?nil:_b;_d=_c.$i();return _d}).$N(nil,", "));_a=(_a)+("]");_e=_a;return _e},$ae: function(){var self;self=this;self.reverse(); return self},$ad: function(){var self,_a,_b;self=this;_a=[];for(_b=1;_b<arguments.length;_b++)_a.push(arguments[_b]);;self.unshift.apply(self, _a); return self},$J: function(_f){var self,_a,_e,_g;_g=nil;self=this;try{_a=[];self.$v(function(_b){var _c;var _d=nil;_c=_b==null?nil:_b;if((_e=_f(_c),_e===false||_e===nil)){_d=_a.$E(nil,_c)}else{_d=nil};return _d});_g=_a;return _g}catch(_h){if(_h instanceof a$c && (!_h.a$b || _h.a$b==58))return _h.a$a;throw(_h)}},$N: function(_i,_a){var self,_b,_d,_h;_h=nil;self=this;try{if(_a==null)_a="";;_b="";self.$$(function(_c){var _e,_f;var _g=nil;(_d=a$j(_c),_e=_d[0]==null?nil:_d[0],_f=_d[1]==null?nil:_d[1],_d);_b=(_b)+(_e.$o());if((_d=_f.$T(nil,(self.$R())-(1)),_d===false||_d===nil)){_g=_b=(_b)+(_a)}else{_g=nil};return _g});_h=_b;return _h}catch(_j){if(_j instanceof a$c && (!_j.a$b || _j.a$b==60))return _j.a$a;throw(_j)}},$K: function(_f){var self,_a,_e,_g;_g=nil;self=this;try{_a=[];self.$v(function(_b){var _c;var _d=nil;_c=_b==null?nil:_b;if((_e=_f(_c),_e!==false&&_e!==nil)){_d=_a.$E(nil,_c)}else{_d=nil};return _d});_g=_a;return _g}catch(_h){if(_h instanceof a$c && (!_h.a$b || _h.a$b==59))return _h.a$a;throw(_h)}}}});$p = a$d({a$j: [],a$e: $k,a$c: "Boolean",a$d: Boolean,a$h: {$T: function(_b,_a){var self;self=this;try{return (self == _a)}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==61))return _c.a$a;throw(_c)}},$o: function(){var self;self=this;return (self == true ? 'true' : 'false')},$i: function(){var self;self=this;return (self == true ? 'true' : 'false')}}});$q = a$d({a$j: [],a$e: $k,a$c: "Number",a$d: Number,a$h: {$7: function(_b,_a){var self;self=this;try{return self + _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==65))return _c.a$a;throw(_c)}},$T: function(_b,_a){var self;self=this;try{return self == _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==64))return _c.a$a;throw(_c)}},$ah: function(_d,_a){var self,_b,_c;self=this;try{_b=self;while((_c=(_b)>=(_a),_c!==false&&_c!==nil)){_d(_b);_b=(_b)-(1)};return self}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==63))return _e.a$a;throw(_e)}},$ag: function(_d,_a){var self,_b,_c;self=this;try{_b=self;while((_c=(_b)<=(_a),_c!==false&&_c!==nil)){_d(_b);_b=(_b)+(1)};return self}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==62))return _e.a$a;throw(_e)}},$ai: function(_b,_a){var self;self=this;try{return self <= _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==66))return _c.a$a;throw(_c)}},$aj: function(_b,_a){var self;self=this;try{return self - _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==67))return _c.a$a;throw(_c)}},$4: function(){var self;self=this;return self+1},$ak: function(_b,_a){var self;self=this;try{return self / _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==69))return _c.a$a;throw(_c)}},$o: function(_b,_a){var self;self=this;try{if(_a==null)_a=10;;return self.toString(_a)}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==68))return _c.a$a;throw(_c)}},$S: function(_b,_a){var self;self=this;try{return self % _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==70))return _c.a$a;throw(_c)}},$ao: function(_b,_a){var self;self=this;try{return self & _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==74))return _c.a$a;throw(_c)}},$an: function(_b,_a){var self;self=this;try{return self < _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==73))return _c.a$a;throw(_c)}},$am: function(_c){var self,_a,_b;self=this;try{_a=0;while((_b=(_a)<(self),_b!==false&&_b!==nil)){_c(_a);_a=(_a)+(1)};return self}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==72))return _d.a$a;throw(_d)}},$al: function(_b,_a){var self;self=this;try{return self | _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==71))return _c.a$a;throw(_c)}},$as: function(){var self;self=this;return -self},$ar: function(_b,_a){var self;self=this;try{return self > _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==76))return _c.a$a;throw(_c)}},$aq: function(_b,_a){var self;self=this;try{return self ^ _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==75))return _c.a$a;throw(_c)}},$ap: function(){var self;self=this;return ~self},$at: function(_b,_a){var self;self=this;try{return self >= _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==77))return _c.a$a;throw(_c)}},$i: function(){var self;self=this;return self.toString()},$av: function(_b,_a){var self;self=this;try{return self * _a}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==78))return _c.a$a;throw(_c)}},$au: function(){var self;self=this;return self}}});$r = a$d({a$j: [],a$e: $q,a$c: "Bignum",a$d: Number});$s = a$d({a$j: [],a$e: $q,a$c: "Float",a$d: Number});$h = a$d({a$j: [],a$e: $k,a$f: {$a: function(_a){var self,_b,_c;self=this;_b=_a==null?nil:_a;try{if((_c=_b,_c===false||_c===nil)){self.$j(nil,$a,"tried to create Proc object without a block")};return (function() {
      try {
        return _b.$F.apply(_b, arguments);
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
    })}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==79))return _d.a$a;throw(_d)}}},a$c: "Proc",a$d: Function,a$h: {$F: function(){var self,_a,_b;self=this;_a=[];for(_b=1;_b<arguments.length;_b++)_a.push(arguments[_b]);;
    // TODO: use switch/case
    if (_a.length == 0) return self();
    else if (_a.length == 1) return self(_a[0]);
    else return self(_a);}}});$f = a$d({a$j: [],a$e: $k,a$c: "Exception",a$h: {$aw: function(){var self,_a;_a=nil;self=this;if(self.$ax==null)self.$ax=nil;_a=self.$ax;return _a},$o: function(){var self,_a;_a=nil;self=this;if(self.$ax==null)self.$ax=nil;_a=self.$ax;return _a},$c: function(_d,_a){var self,_c,_b;_b=nil;self=this;try{if(_a==null)_a=nil;;if((_c=_a.$q(),_c!==false&&_c!==nil)){_b=self.$ax=self.$z().$e()}else{_b=self.$ax=_a};return _b}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==80))return _e.a$a;throw(_e)}},$i: function(){var self,_a;_a=nil;self=this;if(self.$ax==null)self.$ax=nil;_a=("#<" + ((self.$z().$e()).$o()) + (": ") + ((self.$ax).$o()) + (">"));return _a}}});$u = a$d({a$j: [],a$e: $f,a$c: "StandardError"});$v = a$d({a$j: [],a$e: $u,a$c: "NameError"});$g = a$d({a$j: [],a$e: $v,a$c: "NoMethodError"});$w = a$d({a$j: [],a$e: $k,a$c: "MatchData",a$h: {$c: function(_c,_a){var self,_b;_b=nil;self=this;try{_b=self.$ay=_a;return _b}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==81))return _d.a$a;throw(_d)}}}});a$d({a$j: [],a$g: $b});$e = a$d({a$j: [],a$e: $k,a$c: "String",a$d: String,a$h: {$7: function(_b,_a){var self;self=this;try{return(self + _a)}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==83))return _c.a$a;throw(_c)}},$az: function(_c,_a,_b){var self;self=this;try{self.replace(pattern, replacement)}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==82))return _d.a$a;throw(_d)}},$aB: function(_b,_a){var self;self=this;try{
    var i = self.search(_a);
    return (i == -1 ? nil : i)}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==85))return _c.a$a;throw(_c)}},$aA: function(_f,_a,_b){var self,_c,_d,_e;self=this;try{if(_b==null)_b=" ";;if((_c=_b.$l(),_c!==false&&_c!==nil)){self.$j(nil,$a,"zero width padding")};_d=(_a)-(self.$R());if((_c=(_d)<=(0),_c!==false&&_c!==nil)){return self};_e="";while(_e.length < _d) _e += _b;;return (_e.$M(nil,0,_d))+(self)}catch(_g){if(_g instanceof a$c && (!_g.a$b || _g.a$b==84))return _g.a$a;throw(_g)}},$8: function(){var self;self=this;return self.length},$M: function(_d,_a,_b){var self,_c;self=this;try{if(_b==null)_b=nil;;if((_c=_b.$q(),_c!==false&&_c!==nil)){return self.charAt(_a) || nil}else{if((_c=(_b)<(0),_c!==false&&_c!==nil)){return nil};return self.substring(_a, _a+_b)}}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==87))return _e.a$a;throw(_e)}},$aC: function(_f,_a,_b){var self,_c,_d,_e;self=this;try{if(_b==null)_b=" ";;if((_c=_b.$l(),_c!==false&&_c!==nil)){self.$j(nil,$a,"zero width padding")};_d=(_a)-(self.$R());if((_c=(_d)<=(0),_c!==false&&_c!==nil)){return self};_e="";while(_e.length < _d) _e += _b;;return (self)+(_e.$M(nil,0,_d))}catch(_g){if(_g instanceof a$c && (!_g.a$b || _g.a$b==86))return _g.a$a;throw(_g)}},$aD: function(_b,_a){var self;self=this;try{return self.split(_a)}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==88))return _c.a$a;throw(_c)}},$o: function(){var self,_a;_a=nil;self=this;_a=self;return _a},$R: function(){var self;self=this;return self.length},$aE: function(){var self;self=this;return self.replace(/^\s+/, '').replace(/\s+$/, '')},$l: function(){var self;self=this;return(self === "")},$aG: function(_g,_a,_b){var self,_c,_d,_e,_f;self=this;try{if(_b==null)_b=nil;;(_c=["",self,nil],_d=_c[0]==null?nil:_c[0],_e=_c[1]==null?nil:_c[1],_f=_c[2]==null?nil:_c[2],_c);while(_e.length > 0) {
      if (_f = _e.match(_a)) {
        _d += _e.slice(0, _f.index);;if((_c=_b,_c!==false&&_c!==nil)){_d=(_d)+(_b)}else{_d=(_d)+(_g(_f.$W()).$o())};_e = _e.slice(_f.index + _f[0].length);
      } else {
        _d += _e; _e = '';
      }
    } return _d}catch(_h){if(_h instanceof a$c && (!_h.a$b || _h.a$b==90))return _h.a$a;throw(_h)}},$aF: function(_c,_a,_b){var self;self=this;try{if(_b==null)_b=0;;
    var i = self.indexOf(_a, _b);
    return (i == -1) ? nil : i}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==89))return _d.a$a;throw(_d)}},$i: function(){var self,_a,_b;self=this;_a={
      '\b': '\\b',
      '\t': '\\t',
      '\n': '\\n',
      '\f': '\\f',
      '\r': '\\r',
      '\\': '\\\\'
    };;_b=self.$aG(function(_c){var _d,_e;_d=_c==null?nil:_c;_e=_a[_d];return _e ? _e : 
        '\\u00' + ("0" + _d.charCodeAt().toString(16)).substring(0,2);},/[\x00-\x1f\\]/);return ('"' + _b.replace(/"/g, '\\"') + '"');}}});$c = a$d({a$j: [],a$e: $u,a$c: "RuntimeError"});$x = a$d({a$j: [],a$e: $k,a$c: "NilClass",a$d: NilClass,a$h: {$aH: function(){var self,_a;_a=nil;self=this;_a=0.0;return _a},$q: function(){var self,_a;_a=nil;self=this;_a=true;return _a},$o: function(){var self,_a;_a=nil;self=this;_a="";return _a},$aI: function(){var self,_a;_a=nil;self=this;_a=0;return _a},$I: function(){var self,_a;_a=nil;self=this;_a=[];return _a},$aJ: function(){var self,_a;_a=nil;self=this;_a=[];return _a},$i: function(){var self,_a;_a=nil;self=this;_a="nil";return _a}}});$j = a$d({a$j: [],a$e: $k,a$c: "Method",a$h: {$c: function(_f,_a,_b){var self,_c,_d,_e;_e=nil;self=this;try{(_c=[_a,_b],self.$aK=_c[0]==null?nil:_c[0],self.$aL=_c[1]==null?nil:_c[1],_c);_d=nil;_d = _a[a$f[_b]];
    if (_d==null) _d = nil;;if((_c=_d,_c!==false&&_c!==nil)){_e=self.$aM=_d}else{_e=self.$j(nil,$v,("undefined method `" + ((_b).$o()) + ("' for class `") + ((_a.$z().$e()).$o()) + ("'")))};return _e}catch(_g){if(_g instanceof a$c && (!_g.a$b || _g.a$b==91))return _g.a$a;throw(_g)}},$F: function(_c){var self,_a,_b,_d;self=this;_d=_c==null?nil:_c;try{_a=[];for(_b=1;_b<arguments.length;_b++)_a.push(arguments[_b]);;return self.$aM.apply(self.$aK, [_d].concat(_a))}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==92))return _e.a$a;throw(_e)}},$i: function(){var self,_a;_a=nil;self=this;if(self.$aK==null)self.$aK=nil;if(self.$aL==null)self.$aL=nil;_a=("#<Method: " + ((self.$aK.$z().$e()).$o()) + ("#") + ((self.$aL).$o()) + (">"));return _a}}});$a = a$d({a$j: [],a$e: $u,a$c: "ArgumentError"});$y = a$d({a$j: [],a$e: $q,a$c: "Fixnum",a$d: Number});$d = a$d({a$j: [],a$e: $u,a$c: "TypeError"});$A = a$d({a$j: [],a$e: $k,a$f: {$aN: function(){var self,_a,_b;_b=nil;self=this;_a=$z.$aO(nil,"out");_b=$z.$aP(nil,_a,"hello world");return _b}},a$c: "HelloWorld"});$z = a$d({a$j: [],a$e: $k,a$f: {$aR: function(_c,_a,_b){var self;self=this;try{if(_b==null)_b="";;
    _a.innerHTML = _b;
    return nil}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==95))return _d.a$a;throw(_d)}},$aO: function(_b,_a){var self;self=this;try{return document.getElementById(_a) || nil}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==96))return _c.a$a;throw(_c)}},$aQ: function(_d,_a,_b,_c){var self;self=this;try{_a[_b] = _c; return nil}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==94))return _e.a$a;throw(_e)}},$aS: function(_c,_a,_b){var self;self=this;try{
    var ret = _a.style[_b];
    return (ret == null) ? nil : ret}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==97))return _d.a$a;throw(_d)}},$o: function(_b,_a){var self;self=this;try{return _a.outerHTML}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==93))return _c.a$a;throw(_c)}},$aT: function(_b,_a){var self;self=this;try{
    var sib = _a.nextSibling;
    while (sib && sib.nodeType != 1)
      sib = sib.nextSibling;
    return sib || nil}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==98))return _c.a$a;throw(_c)}},$aU: function(_d,_a){var self,_b,_c;self=this;if(self.$aV==null)self.$aV=nil;try{if((_b=(_c=self.$aV, (_c!==false&&_c!==nil) ? (self.$aW(nil,_a,self.$aV)) : _c),_b!==false&&_b!==nil)){self.$aV=nil};if (_a == window.a$m) window.a$m = null;;return nil}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==99))return _e.a$a;throw(_e)}},$aX: function(_d,_a,_b){var self,_c;self=this;try{if(_b==null)_b=true;;if((_c=_b,_c!==false&&_c!==nil)){_a.style.display = ''}else{_a.style.display = 'none'};return nil}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==100))return _e.a$a;throw(_e)}},$aW: function(_c,_a,_b){var self;self=this;try{return (_a == _b)}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==101))return _d.a$a;throw(_d)}},$aY: function(){var self,_a;_a=nil;self=this;_a=self.$aZ(nil,"colgroup");return _a},$a0: function(){var self,_a;_a=nil;self=this;_a=self.$a1(nil,"text");return _a},$a2: function(_c,_a,_b){var self;self=this;try{
    var i = parseInt(_a.style[_b]);
    return ((!i) ? 0 : i)}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==102))return _d.a$a;throw(_d)}},$a3: function(_b,_a){var self;self=this;try{
    var e = document.createElement("INPUT");
    e.type = 'radio';
    e.name = _a;
    return e}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==103))return _c.a$a;throw(_c)}},$a4: function(_b,_a){var self;self=this;try{
    // To mimic IEs +innerText+ property in the W3C DOM, we need to recursively
    // concatenate all child text nodes (depth first).
    var text = '', child = _a.firstChild;
    while (child) {
      // 1 == Element node
      if (child.nodeType == 1) {
        text += this.$a4(nil, child);
      } else if (child.nodeValue) {
        text += child.nodeValue;
      }
      child = child.nextSibling;
    }
    return text}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==104))return _c.a$a;throw(_c)}},$a5: function(_b,_a){var self;self=this;try{self.$aV=_a;window.a$m = _a;;return nil}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==105))return _c.a$a;throw(_c)}},$a6: function(_b,_a){var self;self=this;try{
    var ret = _a.src;
    return (ret == null) ? nil : ret}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==106))return _c.a$a;throw(_c)}},$a7: function(_e,_a,_b,_c){var self,_d;_d=nil;self=this;try{self.$a8(nil,_a,"position","absolute");self.$a8(nil,_a,"left",(_b)+("px"));_d=self.$a8(nil,_a,"top",(_c)+("px"));return _d}catch(_f){if(_f instanceof a$c && (!_f.a$b || _f.a$b==107))return _f.a$a;throw(_f)}},$a9: function(){var self,_a;_a=nil;self=this;_a=self.$aZ(nil,"tr");return _a},$a_: function(_c,_a,_b){var self;self=this;try{
    var ret = _a[_b];
    return (ret == null) ? nil : String(ret)}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==108))return _d.a$a;throw(_d)}},$bb: function(){var self,_a;_a=nil;self=this;_a=self.$aZ(nil,"caption");return _a},$bc: function(_c,_a,_b){var self;self=this;try{
    var i = parseInt(_a[_b]);
    return ((!i) ? 0 : i)}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==110))return _d.a$a;throw(_d)}},$ba: function(_c,_a,_b){var self;self=this;try{
    _a.a$n = _b;

    _a.onclick       = (_b & 0x00001) ? window.a$o : null;
    _a.ondblclick    = (_b & 0x00002) ? window.a$o : null;
    _a.onmousedown   = (_b & 0x00004) ? window.a$o : null;
    _a.onmouseup     = (_b & 0x00008) ? window.a$o : null;
    _a.onmouseover   = (_b & 0x00010) ? window.a$o : null;
    _a.onmouseout    = (_b & 0x00020) ? window.a$o : null;
    _a.onmousemove   = (_b & 0x00040) ? window.a$o : null;
    _a.onkeydown     = (_b & 0x00080) ? window.a$o : null;
    _a.onkeypress    = (_b & 0x00100) ? window.a$o : null;
    _a.onkeyup       = (_b & 0x00200) ? window.a$o : null;
    _a.onchange      = (_b & 0x00400) ? window.a$o : null;
    _a.onfocus       = (_b & 0x00800) ? window.a$o : null;
    _a.onblur        = (_b & 0x01000) ? window.a$o : null;
    _a.onlosecapture = (_b & 0x02000) ? window.a$o : null;
    _a.onscroll      = (_b & 0x04000) ? window.a$o : null;
    _a.onload        = (_b & 0x08000) ? window.a$o : null;
    _a.onerror       = (_b & 0x10000) ? window.a$o : null;
    _a.onmousewheel  = (_b & 0x20000) ? window.a$o : null;
    
    return nil}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==109))return _d.a$a;throw(_d)}},$bd: function(_d,_a,_b,_c){var self;self=this;try{_a.setAttribute(_b, _c); return nil}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==111))return _e.a$a;throw(_e)}},$a$: function(){var self;self=this;return document.body.clientWidth},$be: function(_b,_a){var self;self=this;try{return _a.a$n || 0}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==112))return _c.a$a;throw(_c)}},$bg: function(){var self,_a;_a=nil;self=this;_a=self.$aZ(nil,"tbody");return _a},$bf: function(_c,_a,_b){var self;self=this;try{_a.src = _b; return nil}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==113))return _d.a$a;throw(_d)}},$a1: function(_b,_a){var self;self=this;try{
    var e = document.createElement("INPUT");
    e.type = _a;
    return e}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==114))return _c.a$a;throw(_c)}},$bh: function(_b,_a){var self;self=this;try{
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
    return nil}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==115))return _c.a$a;throw(_c)}},$bi: function(){var self,_a;_a=nil;self=this;_a=self.$aZ(nil,"legend");return _a},$bj: function(){var self,_a;_a=nil;self=this;_a=self.$aZ(nil,"fieldset");return _a},$aZ: function(_b,_a){var self;self=this;try{return document.createElement(_a)}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==116))return _c.a$a;throw(_c)}},$bl: function(){var self,_a;_a=nil;self=this;_a=self.$aZ(nil,"div");return _a},$bm: function(_b,_a){var self;self=this;try{
    var child = _a.firstChild;
    while (child && child.nodeType != 1)
      child = child.nextSibling;
    return child || nil}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==117))return _c.a$a;throw(_c)}},$bk: function(){var self;self=this;return document.body.clientHeight},$bn: function(_b,_a){var self;self=this;try{
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
    return left}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==118))return _c.a$a;throw(_c)}},$bo: function(_d,_a,_b,_c){var self;self=this;try{_a.insertBefore(_b, _c); return nil}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==119))return _e.a$a;throw(_e)}},$bp: function(_d,_a,_b,_c){var self;self=this;try{var option = _a.options[_c];
    option.text = _b;
    return nil}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==120))return _e.a$a;throw(_e)}},$bq: function(_c,_a,_b){var self;self=this;try{_a.removeChild(_b); return nil}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==121))return _d.a$a;throw(_d)}},$br: function(_b,_a){var self;self=this;try{
    var ret = _a.innerHTML;
    return (ret == null) ? nil : ret}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==122))return _c.a$a;throw(_c)}},$bs: function(){var self,_a;_a=nil;self=this;_a=self.$aZ(nil,"td");return _a},$bt: function(){var self,_a;_a=nil;self=this;_a=self.$a1(nil,"password");return _a},$bu: function(){var self,_a;_a=nil;self=this;_a=self.$aZ(nil,"textarea");return _a},$bv: function(){var self,_a;_a=nil;self=this;_a=self.$aZ(nil,"tfoot");return _a},$bw: function(){var self,_a;_a=nil;self=this;_a=self.$a1(nil,"checkbox");return _a},$by: function(_c,_a,_b){var self;self=this;try{
    var ret = _a.getAttribute(_b);
    return (ret == null) ? nil : ret}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==124))return _d.a$a;throw(_d)}},$bz: function(){var self,_a;_a=nil;self=this;_a=self.$aZ(nil,"form");return _a},$bA: function(){var self,_a;_a=nil;self=this;_a=self.$aZ(nil,"button");return _a},$bB: function(){var self,_a;_a=nil;self=this;_a=self.$aZ(nil,"label");return _a},$bx: function(_c,_a,_b){var self;self=this;try{_a.a$p = (_b === nil) ? null : _b; return nil}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==123))return _d.a$a;throw(_d)}},$bC: function(_b,_a){var self;self=this;try{return (_a.style.display != 'none')}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==125))return _c.a$a;throw(_c)}},$bD: function(){var self,_a;_a=nil;self=this;_a=self.$aZ(nil,"th");return _a},$bE: function(_c,_a,_b){var self;self=this;try{
    var count = 0, child = _a.firstChild;
    while (child) {
      if (child == _b)
        return count;
      if (child.nodeType == 1)
        ++count;
      child = child.nextSibling;
    }

    return nil}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==126))return _d.a$a;throw(_d)}},$bF: function(){var self,_a;_a=nil;self=this;_a=self.$aZ(nil,"col");return _a},$bG: function(){var self,_a;_a=nil;self=this;_a=self.$aZ(nil,"iframe");return _a},$bH: function(){var self,_a;_a=nil;self=this;_a=self.$aZ(nil,"options");return _a},$bI: function(_c,_a,_b){var self;self=this;try{
    var p = _a.parentNode;
    if (!p) return;
    p.insertBefore(_b, _a);
    p.removeChild(_a);
    return nil}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==127))return _d.a$a;throw(_d)}},$bJ: function(){var self,_a;_a=nil;self=this;_a=self.$aZ(nil,"A");return _a},$bK: function(_b,_a){var self;self=this;try{_a.a$p = null; return nil}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==129))return _c.a$a;throw(_c)}},$aP: function(_c,_a,_b){var self;self=this;try{
    // Remove all children first.
    while (_a.firstChild) {
      _a.removeChild(_a.firstChild);
    }
    // Add a new text node.
    if (_b !== nil) {
      _a.appendChild(document.createTextNode(_b));
    }
    return nil}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==128))return _d.a$a;throw(_d)}},$bL: function(){var self,_a;_a=nil;self=this;_a=self.$aZ(nil,"img");return _a},$a8: function(_d,_a,_b,_c){var self;self=this;try{_a.style[_b] = _c; return nil}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==130))return _e.a$a;throw(_e)}},$bM: function(_c,_a,_b){var self;self=this;try{
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

    return nil}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==131))return _d.a$a;throw(_d)}},$bN: function(){var self;self=this;if(self.$aV==null)self.$aV=nil;return self.$aV},$bO: function(_c,_a,_b){var self;self=this;try{
    while (_b) {
      if (_a == _b) {
        return true;
      }
      _b = _b.parentNode;
      if (_b && (_b.nodeType != 1)) {
        _b = null;
      }
    }
    return false}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==132))return _d.a$a;throw(_d)}},$bP: function(){var self,_a;_a=nil;self=this;_a=self.$aZ(nil,"table");return _a},$bQ: function(){var self,_a;_a=nil;self=this;_a=self.$aZ(nil,"thead");return _a},$bS: function(_c,_a,_b){var self;self=this;try{return !!_a[_b]}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==134))return _d.a$a;throw(_d)}},$bR: function(_b,_a){var self;self=this;try{
    var count = 0, child = _a.firstChild;
    while (child) {
      if (child.nodeType == 1)
        ++count;
      child = child.nextSibling;
    }
    return count}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==133))return _c.a$a;throw(_c)}},$bV: function(_c,_a,_b){var self;self=this;try{return !!_a.style[_b]}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==136))return _d.a$a;throw(_d)}},$bU: function(_c,_a,_b){var self;self=this;try{_a.removeAttribute(_b); return nil}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==135))return _d.a$a;throw(_d)}},$bT: function(){var self,_a;_a=nil;self=this;_a=self.$aZ(nil,"span");return _a},$b1: function(_b,_a){var self;self=this;try{
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
    return top}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==142))return _c.a$a;throw(_c)}},$b0: function(_b,_a){var self;self=this;try{
    var parent = _a.parentNode;
    if(parent == null) {
      return nil;
    }
    if (parent.nodeType != 1)
      parent = null;
    return parent || nil}catch(_c){if(_c instanceof a$c && (!_c.a$b || _c.a$b==141))return _c.a$a;throw(_c)}},$bZ: function(_c,_a){var self,_b;_b=nil;self=this;try{self.$a8(nil,_a,"left","");self.$a8(nil,_a,"top","");_b=self.$a8(nil,_a,"position","static");return _b}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==140))return _d.a$a;throw(_d)}},$bY: function(_d,_a){var self,_b,_c;self=this;try{if(_a==null)_a=false;;_b=self.$aZ(nil,"select");if((_c=_a,_c!==false&&_c!==nil)){self.$aQ(nil,_b,"multiple",true)};return _b}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==139))return _e.a$a;throw(_e)}},$bX: function(_c,_a,_b){var self;self=this;try{_a.appendChild(_b); return nil}catch(_d){if(_d instanceof a$c && (!_d.a$b || _d.a$b==138))return _d.a$a;throw(_d)}},$bW: function(_d,_a,_b,_c){var self;self=this;try{
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
    return nil}catch(_e){if(_e instanceof a$c && (!_e.a$b || _e.a$b==137))return _e.a$a;throw(_e)}}},a$c: "DOM"});$B = a$d({a$j: [],a$e: $k,a$c: "Regexp",a$d: RegExp});$t = a$d({a$j: [],a$e: $u,a$c: "LocalJumpError"});      $b.a$e = $k;
var a$k = [$i,$k,$l,$m,$n,$o,$p,$q,$r,$s,$h,$f,$u,$v,$g,$w,$b,$e,$c,$x,$j,$a,$y,$d,$A,$z,$B,$t];
a$l(a$k);
function main() { return $A.$aN.apply($A, arguments); }