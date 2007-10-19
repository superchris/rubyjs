// method map
var a$l = {"test":"$Y","sub":"$4","end":"$aO","each":"$w","m":"$X","loop":"$y","to_f":"$C","%":"$ao","collect":"$I","member?":"$aP","test_three_times_indirect":"$aX","&":"$ar","three_times_yield":"$a6","new_from_key_value_list":"$V","test_loop2":"$aT","===":"$g","three_times_block":"$aS","==":"$al","three_times_indirect":"$aY","reverse":"$ay","map":"$M","downto":"$aj","to_i":"$D","times":"$aq","p":"$u","include?":"$aN","proc":"$t","allocate":"$d","keys":"$P","reject":"$N","three_times_yield2":"$a1","size":"$5","*":"$ax","+":"$T","delete":"$Z","values":"$S","unshift":"$aD","return_in_block":"$aW","upto":"$ai","dup":"$aF","rjust":"$6","-":"$7","nil?":"$r","new":"$a","test_while_loop":"$aV","/":"$an","call":"$K","message":"$G","push":"$aC","is_a?":"$z","split":"$aa","main":"$W","name":"$b","empty?":"$m","to_splat":"$F","jage":"$aR","raise":"$k","length":"$8","to_s":"$p",">=":"$ak","|":"$ap","kind_of?":"$i","find_all":"$L","~":"$as","loop2":"$aU","[]":"$Q","test_three_times_yield2":"$a0","strip":"$ab","test_return_in_block":"$a5","-@":"$av","[]=":"$R","succ":"$am","hash":"$B","class":"$c","inspect":"$j","reverse!":"$aE","test_three_times_block":"$a2","^":"$at","test_three_times_yield":"$a4","__send":"$q","eql?":"$h","pop":"$aA","<":"$$","wau":"$aQ","first":"$ae","begin":"$aM","<<":"$J","ljust":"$_","__invoke":"$f",">":"$au","<=":"$9","initialize":"$e","send":"$x","a_method":"$3","respond_to?":"$s","test_loop":"$a3","shift":"$l","exclude_end?":"$aL","+@":"$aw","select":"$O","miau":"$2","to_a":"$E","method_missing":"$o","index":"$ac","test_proc":"$aZ","join":"$U","each_with_index":"$az","tap":"$A","last":"$aJ","instance_of?":"$n","gsub":"$ad","puts":"$v","match":"$af","to_ary":"$aB"};
// declare nil
function NilClass() {}

// FIXME: remove
NilClass.prototype.toString = function() { return "nil"; };
nil = new NilClass();

//
// r: return value
// s: scope (method scope)
//
function a$a(r,s)
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
function a$b(x) { throw(x); }

function a$c(a)
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
function a$d(a)
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
function a$e(o, m, i, a) 
{
  var r = o[m]; // method in current class
  var c = o.a$c.a$d;
  while (r === c.a$e.prototype[m])
    c = c.a$d;
  return c.a$e.prototype[m].apply(o, [i].concat(a));
}

function a$f(o, m, a) 
{
  var r = o[m]; // method in current class
  var c = o.a$c.a$d;
  while (r === c.a$e.prototype[m])
    c = c.a$d;
  return c.a$e.prototype[m].apply(o, a);
}

//
// Whether o.kind_of?(c)
//
function a$g(o, c)
{
  var k,i,m;

  k = o.a$c;

  while (k != nil)
  {
    if (k === c) return true;

    // check included modules
    m = k.a$f;
    for (i=0; i<m.length; i++)
    {
      if (m[i] === c) return true;
    }

    k = k.a$d; 
  }

  return false;
}

function a$h(c)
{
  for (var i=0; i<c.length; i++)
    a$i(c[i]);
}

function a$i(c)
{
  var k,i;

  //
  // include modules
  //
  // do that before, because when assigning instance methods of 
  // the super class, a check for === undefined prevents from
  // this method being overwritten.
  //
  for (i=0; i<c.a$f.length; i++)
  {
    for (k in c.a$f[i].a$e.prototype)
    {
      if (c.a$e.prototype[k]===undefined)
      {
        c.a$e.prototype[k] = c.a$f[i].a$e.prototype[k];
      }
    }
  }

  // instance methods
  if (c.a$d != nil)
  {
    for (k in c.a$d.a$e.prototype)
    {
      if (c.a$e.prototype[k]===undefined)
      {
        c.a$e.prototype[k] = c.a$d.a$e.prototype[k];
      }
    }
  }

  // inherit class methods from superclass
  if (c.a$d != nil)
  {
    for (k in c.a$d)
    {
      if (c[k]===undefined)
      {
        c[k] = c.a$d[k];
      }
    }
  }

  // set class for instanciated objects
  c.a$e.prototype.a$c = c;
}

function a$j(h)
{
  var c,k,i;
  c = h.a$c || $a.$a(nil, h.a$d, h.a$g, h.a$e);

  if (h.a$h)
  {
    for (k in h.a$h)
    {
      c.a$e.prototype[k] = h.a$h[k];
    }
  }

  if (h.a$i)
  {
    for (k in h.a$i) c[k] = h.a$i[k];
  }

  if (h.a$f)
  {
    for (i=0; i<h.a$f.length; i++)
    {
      c.a$f.push(h.a$f[i]);
    }
  }

  return c;
}

function a$k(_a, _b, _c, _d) 
{
  this.a$d = _b;
  this.a$g = _c;
  this.a$e = _d;
  this.a$f = [];
  this.a$c = _a;
  return this;
}

a$k.$b = function() { return "MetaClass"; };
a$k.$c = function() { return this; };
$a = a$j({a$d: nil,a$i: {$a: function(_e,_a,_b,_c){var self,_d;self=this;try{if(arguments.length<3)throw($b.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));if(arguments.length>4)throw($b.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 3)'));if(_c===undefined)_c=nil;;if((_d=_c,_d===false||_d===nil)){_c=(function() {})};return new self.a$e($a, _a, _b, _c);}catch(_f){if(_f instanceof a$a && (!_f.a$b || _f.a$b==2))return _f.a$a;throw(_f)}}},a$g: "Class",a$c: new a$k(a$k, nil, "Class", a$k),a$h: {$b: function(){var self;self=this;if(arguments.length>1)throw($b.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;return self.a$g;},$a: function(_c){var self,_a,_b,_d,_e,_f;_e=_f=nil;self=this;_d=_c===undefined?nil:_c;try{_a=[];for(_b=1;_b<arguments.length;_b++)_a.push(arguments[_b]);;_e=self.$d();_e.$f(_d,'$e',a$c(_a));_f=_e;return _f}catch(_g){if(_g instanceof a$a && (!_g.a$b || _g.a$b==0))return _g.a$a;throw(_g)}},$g: function(_d,_a){var self,_b,_c;_c=nil;self=this;try{if(arguments.length!=2)throw($b.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;_c=(_b=self.$h(nil,_a), (_b!==false&&_b!==nil) ? _b : (_a.$i(nil,self)));return _c}catch(_e){if(_e instanceof a$a && (!_e.a$b || _e.a$b==1))return _e.a$a;throw(_e)}},$d: function(){var self;self=this;if(arguments.length>1)throw($b.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;var o = new self.a$e();
       return o;},$j: function(){var self;self=this;if(arguments.length>1)throw($b.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;return self.a$g;}}});a$i($a);$h = a$j({a$f: [],a$d: nil,a$g: "Kernel",a$h: {$q: function(_d,_a){var self,_b,_c,_e;self=this;_e=_d===undefined?nil:_d;try{if(arguments.length<2)throw($b.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));_b=[];for(_c=2;_c<arguments.length;_c++)_b.push(arguments[_c]);;return self[a$l[_a]].apply(self, [_e].concat(_b))}catch(_f){if(_f instanceof a$a && (!_f.a$b || _f.a$b==4))return _f.a$a;throw(_f)}},$o: function(_d,_a){var self,_b,_c,_e,_f;_f=nil;self=this;_e=_d===undefined?nil:_d;try{if(arguments.length<2)throw($b.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));_b=[];for(_c=2;_c<arguments.length;_c++)_b.push(arguments[_c]);;_f=self.$k(nil,("NoMethodError: undefined method `" + (_a).$p() + ("' for ").$p() + (self.$j()).$p()));return _f}catch(_g){if(_g instanceof a$a && (!_g.a$b || _g.a$b==3))return _g.a$a;throw(_g)}},$k: function(){var self,_a,_b,_c,_d;_c=_d=nil;self=this;_a=[];for(_b=1;_b<arguments.length;_b++)_a.push(arguments[_b]);;_c=((_b=_a.$m(),_b!==false&&_b!==nil)?$c.$a(nil,""):(_d=_a.$l(),((_b=_d.$i(nil,$a),_b!==false&&_b!==nil)?_d.$f(nil,'$a',a$c(_a)):((_b=_d.$n(nil,$f),_b!==false&&_b!==nil)?((_b=_a.$m(),_b!==false&&_b!==nil)?_d:$b.$a(nil,"to many arguments given to raise")):((_b=_d.$n(nil,$e),_b!==false&&_b!==nil)?((_b=_a.$m(),_b!==false&&_b!==nil)?$c.$a(nil,_d):$b.$a(nil,"to many arguments given to raise")):$d.$a(nil,"exception class/object expected"))))));throw(_c)},$r: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($b.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=false;return _a},$t: function(_a){var self,_b,_c;_c=nil;self=this;_b=_a===undefined?nil:_a;try{if(arguments.length>1)throw($b.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_c=$g.$a(_b);return _c}catch(_d){if(_d instanceof a$a && (!_d.a$b || _d.a$b==6))return _d.a$a;throw(_d)}},$s: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($b.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;
      var m = a$l[_a]; 
      return (m !== undefined && self[m] !== undefined)}catch(_c){if(_c instanceof a$a && (!_c.a$b || _c.a$b==5))return _c.a$a;throw(_c)}},$u: function(){var self,_a,_b,_f;_f=nil;self=this;_a=[];for(_b=1;_b<arguments.length;_b++)_a.push(arguments[_b]);;_a.$w(function(_c){var _d;var _e=nil;_d=_c===undefined?nil:_c;_e=self.$v(nil,_d.$j());return _e});_f=nil;return _f},$f: function(_c,_a,_b){var self,_d;self=this;_d=_c===undefined?nil:_c;try{if(arguments.length!=3)throw($b.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));;return self[_a].apply(self, [_d].concat(_b))}catch(_e){if(_e instanceof a$a && (!_e.a$b || _e.a$b==7))return _e.a$a;throw(_e)}},$y: function(_a){var self,_b;_b=nil;self=this;try{if(arguments.length>1)throw($b.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;while(true){_a()};_b=nil;;return _b}catch(_c){if(_c instanceof a$a && (!_c.a$b || _c.a$b==10))return _c.a$a;throw(_c)}},$v: function(_b,_a){var self;self=this;try{if(arguments.length>2)throw($b.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));if(_a===undefined)_a="";;_a=_a.$p();STDOUT.push(_a)}catch(_c){if(_c instanceof a$a && (!_c.a$b || _c.a$b==9))return _c.a$a;throw(_c)}},$x: function(_d,_a){var self,_b,_c,_e;self=this;_e=_d===undefined?nil:_d;try{if(arguments.length<2)throw($b.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));_b=[];for(_c=2;_c<arguments.length;_c++)_b.push(arguments[_c]);;return self[a$l[_a]].apply(self, [_e].concat(_b))}catch(_f){if(_f instanceof a$a && (!_f.a$b || _f.a$b==8))return _f.a$a;throw(_f)}}}});$i = a$j({a$f: [$h],a$d: nil,a$g: "Object",a$h: {$i: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($b.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;return a$g(self, _a)}catch(_c){if(_c instanceof a$a && (!_c.a$b || _c.a$b==11))return _c.a$a;throw(_c)}},$z: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($b.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;return a$g(self, _a)}catch(_c){if(_c instanceof a$a && (!_c.a$b || _c.a$b==12))return _c.a$a;throw(_c)}},$c: function(){var self;self=this;if(arguments.length>1)throw($b.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;return self.a$c},$h: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($b.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;return (self.constructor == _a.constructor && self == _a)}catch(_c){if(_c instanceof a$a && (!_c.a$b || _c.a$b==13))return _c.a$a;throw(_c)}},$B: function(){var self;self=this;if(arguments.length>1)throw($b.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;return self.toString()},$A: function(_a){var self,_b;_b=nil;self=this;try{if(arguments.length>1)throw($b.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a(self);_b=self;return _b}catch(_c){if(_c instanceof a$a && (!_c.a$b || _c.a$b==14))return _c.a$a;throw(_c)}},$p: function(){var self;self=this;if(arguments.length>1)throw($b.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;return self.toString()},$e: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($b.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=nil;return _a},$g: function(_d,_a){var self,_b,_c;_c=nil;self=this;try{if(arguments.length!=2)throw($b.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;_c=(_b=self.$h(nil,_a), (_b!==false&&_b!==nil) ? _b : (self.$i(nil,_a)));return _c}catch(_e){if(_e instanceof a$a && (!_e.a$b || _e.a$b==15))return _e.a$a;throw(_e)}},$n: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($b.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;return (self.a$c === _a)}catch(_c){if(_c instanceof a$a && (!_c.a$b || _c.a$b==16))return _c.a$a;throw(_c)}},$j: function(){var self;self=this;if(arguments.length>1)throw($b.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;return self.toString()}}});$j = a$j({a$f: [],a$d: $i,a$g: "NilClass",a$e: NilClass,a$h: {$C: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($b.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=0.0;return _a},$r: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($b.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=true;return _a},$p: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($b.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a="";return _a},$D: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($b.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=0;return _a},$E: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($b.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=[];return _a},$F: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($b.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=[];return _a},$j: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($b.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a="nil";return _a}}});$f = a$j({a$f: [],a$d: $i,a$g: "Exception",a$h: {$G: function(){var self,_a;_a=nil;self=this;if(self.$H===undefined)self.$H=nil;_a=self.$H;return _a},$p: function(){var self,_a;_a=nil;self=this;if(self.$H===undefined)self.$H=nil;_a=self.$H;return _a},$e: function(_d,_a){var self,_c,_b;_b=nil;self=this;try{if(arguments.length>2)throw($b.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));if(_a===undefined)_a=nil;;if((_c=_a.$r(),_c!==false&&_c!==nil)){_b=self.$H=self.$c().$b()}else{_b=self.$H=_a};return _b}catch(_e){if(_e instanceof a$a && (!_e.a$b || _e.a$b==17))return _e.a$a;throw(_e)}},$j: function(){var self,_a;_a=nil;self=this;if(self.$H===undefined)self.$H=nil;if(arguments.length>1)throw($b.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=("#<" + (self.$c().$b()).$p() + (": ").$p() + (self.$H).$p() + (">").$p());return _a}}});$k = a$j({a$f: [],a$d: $f,a$g: "StandardError"});$b = a$j({a$f: [],a$d: $k,a$g: "ArgumentError"});$l = a$j({a$f: [],a$d: $i,a$g: "Regexp",a$e: RegExp});$m = a$j({a$f: [],a$d: nil,a$g: "Enumerable",a$h: {$I: function(_a){var self,_b,_c,_g,_h;_c=_h=nil;self=this;_b=_a===undefined?nil:_a;try{if(arguments.length>1)throw($b.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_c=[];self.$w(function(_d){var _e;var _f=nil;_e=_d===undefined?nil:_d;if((_g=_b,_g!==false&&_g!==nil)){_f=_c.$J(nil,_b.$K(nil,_e))}else{_f=_c.$J(nil,_e)};return _f});_h=_c;return _h}catch(_i){if(_i instanceof a$a && (!_i.a$b || _i.a$b==18))return _i.a$a;throw(_i)}},$L: function(_f){var self,_a,_e,_g;_a=_g=nil;self=this;try{if(arguments.length>1)throw($b.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=[];self.$w(function(_b){var _c;var _d=nil;_c=_b===undefined?nil:_b;if((_e=_f(_c),_e!==false&&_e!==nil)){_d=_a.$J(nil,_c)}else{_d=nil};return _d});_g=_a;return _g}catch(_h){if(_h instanceof a$a && (!_h.a$b || _h.a$b==19))return _h.a$a;throw(_h)}},$M: function(_a){var self,_b,_c,_g,_h;_c=_h=nil;self=this;_b=_a===undefined?nil:_a;try{if(arguments.length>1)throw($b.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_c=[];self.$w(function(_d){var _e;var _f=nil;_e=_d===undefined?nil:_d;if((_g=_b,_g!==false&&_g!==nil)){_f=_c.$J(nil,_b.$K(nil,_e))}else{_f=_c.$J(nil,_e)};return _f});_h=_c;return _h}catch(_i){if(_i instanceof a$a && (!_i.a$b || _i.a$b==20))return _i.a$a;throw(_i)}},$E: function(){var self,_a,_e;_a=_e=nil;self=this;if(arguments.length>1)throw($b.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=[];self.$w(function(_b){var _c;var _d=nil;_c=_b===undefined?nil:_b;_d=_a.$J(nil,_c);return _d});_e=_a;return _e},$N: function(_f){var self,_a,_e,_g;_a=_g=nil;self=this;try{if(arguments.length>1)throw($b.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=[];self.$w(function(_b){var _c;var _d=nil;_c=_b===undefined?nil:_b;if((_e=_f(_c),_e===false||_e===nil)){_d=_a.$J(nil,_c)}else{_d=nil};return _d});_g=_a;return _g}catch(_h){if(_h instanceof a$a && (!_h.a$b || _h.a$b==21))return _h.a$a;throw(_h)}},$O: function(_f){var self,_a,_e,_g;_a=_g=nil;self=this;try{if(arguments.length>1)throw($b.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=[];self.$w(function(_b){var _c;var _d=nil;_c=_b===undefined?nil:_b;if((_e=_f(_c),_e!==false&&_e!==nil)){_d=_a.$J(nil,_c)}else{_d=nil};return _d});_g=_a;return _g}catch(_h){if(_h instanceof a$a && (!_h.a$b || _h.a$b==22))return _h.a$a;throw(_h)}}}});$n = a$j({a$f: [$m],a$d: $i,a$i: {$V: function(){var self,_a,_b,_c;_c=nil;self=this;_a=[];for(_b=1;_b<arguments.length;_b++)_a.push(arguments[_b]);;_c=self.$d();
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

      _c.a$j = items; 
      _c.a$k = nil;
      return _c;
      }},a$g: "Hash",a$h: {$Q: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($b.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;
      var hashed_key = "1" + _a.$B();
      var bucket = self.a$j[hashed_key];

      if (bucket !== undefined)
      {
        //
        // find the matching element inside the bucket
        //

        for (var i = 0; i < bucket.length; i += 2)
        {
          if (bucket[i].$h(nil,_a))
            return bucket[i+1];
        }
      }

      // no matching key found -> return default value
      return self.a$k;
      }catch(_c){if(_c instanceof a$a && (!_c.a$b || _c.a$b==23))return _c.a$a;throw(_c)}},$P: function(){var self,_b,_f;_b=_f=nil;self=this;if(arguments.length>1)throw($b.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_f=self.$M(function(_a){var _c,_d;var _e=nil;(_b=a$d(_a),_c=_b[0]===undefined?nil:_b[0],_d=_b[1]===undefined?nil:_b[1],_b);_e=_c;return _e});return _f},$R: function(_c,_a,_b){var self;self=this;try{if(arguments.length!=3)throw($b.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));;
      var hashed_key = "1" + _a.$B();
      var bucket = self.a$j[hashed_key];

      if (bucket !== undefined)
      {
        //
        // find the matching element inside the bucket
        //

        for (var i = 0; i < bucket.length; i += 2)
        {
          if (bucket[i].$h(nil,_a))
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
        self.a$j[hashed_key] = [_a, _b];
        return _b;
      }
      }catch(_d){if(_d instanceof a$a && (!_d.a$b || _d.a$b==25))return _d.a$a;throw(_d)}},$w: function(_a){var self;self=this;try{if(arguments.length>1)throw($b.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;
      var key, bucket, i;
      for (key in self.a$j)
      {
        if (key[0] == "1")
        {
          bucket = self.a$j[key];
          for (i=0; i<bucket.length; i+=2)
          {;_a([bucket[i],bucket[i+1]]);
          }
        }
      }
      }catch(_b){if(_b instanceof a$a && (!_b.a$b || _b.a$b==24))return _b.a$a;throw(_b)}},$e: function(){var self;self=this;if(arguments.length>1)throw($b.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;
      self.a$j = {}; 
      self.a$k = nil;
      },$S: function(){var self,_b,_f;_b=_f=nil;self=this;if(arguments.length>1)throw($b.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_f=self.$M(function(_a){var _c,_d;var _e=nil;(_b=a$d(_a),_c=_b[0]===undefined?nil:_b[0],_d=_b[1]===undefined?nil:_b[1],_b);_e=_d;return _e});return _f},$j: function(){var self,_a,_c,_g;_a=_c=_g=nil;self=this;if(arguments.length>1)throw($b.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a="{";_a=_a.$T(nil,self.$M(function(_b){var _d,_e;var _f=nil;(_c=a$d(_b),_d=_c[0]===undefined?nil:_c[0],_e=_c[1]===undefined?nil:_c[1],_c);_f=_d.$j().$T(nil," => ").$T(nil,_e.$j());return _f}).$U(nil,", "));_a=_a.$T(nil,"}");_g=_a;return _g}}});$o = a$j({a$f: [],a$d: $i,a$i: {$W: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($b.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self.$v(nil,"Hello World from RubyJS");return _a}},a$g: "TestSimpleOutput"});$p = a$j({a$f: [],a$d: $k,a$g: "NameError"});$q = a$j({a$f: [],a$d: $p,a$g: "NoMethodError"});$r = a$j({a$f: [],a$d: $i,a$i: {$W: function(){var self,_a,_b;_a=_b=nil;self=this;if(arguments.length>1)throw($b.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self.$a();_a.$X();_a.$f(nil,'$X',a$c([]));_a.$X(nil,1);_a.$f(nil,'$X',a$c([1]));_a.$f(nil,'$X',[1].concat(a$c([])));_a.$X(nil,1,2);_a.$f(nil,'$X',a$c([1,2]));_a.$f(nil,'$X',[1].concat(a$c([2])));_b=_a.$f(nil,'$X',[1].concat(a$c([1,2])));return _b}},a$g: "TestSplat",a$h: {$X: function(){var self,_a,_b,_c;_c=nil;self=this;_a=[];for(_b=1;_b<arguments.length;_b++)_a.push(arguments[_b]);;_c=self.$u(nil,_a);return _c}}});$s = a$j({a$f: [],a$d: $i,a$i: {$W: function(){var self,_b,_c,_d;_b=_d=nil;self=this;if(arguments.length>1)throw($b.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;self.$u(nil,"before block");self.$u(nil,"in block");self.$u(nil,"after block");try{self.$u(nil,"block");self.$u(nil,"else")}catch(_a){if(_a instanceof a$a)throw(_a);if((_c=$k.$g(nil,_a),_c!==false&&_c!==nil)){self.$u(nil,"rescue")}else{if((_c=$f.$g(nil,_a),_c!==false&&_c!==nil)){_b=(typeof(_a)=='undefined'?nil:_a);self.$u(nil,"another rescue");self.$u(nil,_b)}else{throw(_a)}}};self.$u(nil,$c.$a(nil,"test"));self.$v(nil,"before begin");try{try{self.$v(nil,"before raise");self.$k(nil,$f,"blah");self.$v(nil,"after raise")}catch(_a){if(_a instanceof a$a)throw(_a);if((_c=$k.$g(nil,_a),_c!==false&&_c!==nil)){self.$v(nil,"noooo")}else{if((_c=$f.$g(nil,_a),_c!==false&&_c!==nil)){_b=(typeof(_a)=='undefined'?nil:_a);self.$u(nil,_b);self.$v(nil,"yes")}else{throw(_a)}}}}finally{self.$v(nil,"ensure")};self.$v(nil,"after begin");self.$v(nil,"--");try{try{self.$v(nil,"abc");self.$k(nil,"r")}catch(_a){if(_a instanceof a$a)throw(_a);if((_c=$k.$g(nil,_a),_c!==false&&_c!==nil)){self.$u(nil,(typeof(_a)=='undefined'?nil:_a));self.$v(nil,"b")}else{throw(_a)}}}finally{self.$v(nil,"e")};try{_d=self.$u(nil,"hallo".$p(nil,2))}catch(_a){if(_a instanceof a$a)throw(_a);if((_c=$b.$g(nil,_a),_c!==false&&_c!==nil)){_b=(typeof(_a)=='undefined'?nil:_a);_d=self.$u(nil,_b)}else{throw(_a)}};return _d}},a$g: "TestException"});$t = a$j({a$f: [],a$d: $i,a$i: {$W: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($b.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self.$a().$Y();return _a}},a$g: "TestArray",a$h: {$Y: function(){var self,_a,_b;_a=_b=nil;self=this;if(arguments.length>1)throw($b.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=["a","b","b","b","c"];self.$u(nil,_a.$Z(nil,"b"));self.$u(nil,_a);_b=self.$u(nil,_a.$Z(nil,"z"));return _b}}});$u = a$j({a$f: [],a$d: $i,a$g: "Lebewesen",a$h: {$e: function(_c,_a){var self,_b;_b=nil;self=this;try{if(arguments.length!=2)throw($b.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;_b=self.$0=_a;return _b}catch(_d){if(_d instanceof a$a && (!_d.a$b || _d.a$b==26))return _d.a$a;throw(_d)}}}});$v = a$j({a$f: [],a$d: $u,a$g: "Katze",a$h: {$b: function(){var self,_a;_a=nil;self=this;if(self.$1===undefined)self.$1=nil;_a=self.$1;return _a},$e: function(_d,_a,_b){var self,_c;_c=nil;self=this;try{if(arguments.length!=3)throw($b.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));;a$e(self,'$e',nil,[_a]);_c=self.$1=_b;return _c}catch(_e){if(_e instanceof a$a && (!_e.a$b || _e.a$b==27))return _e.a$a;throw(_e)}},$2: function(){var self,_a;_a=nil;self=this;if(self.$1===undefined)self.$1=nil;if(arguments.length>1)throw($b.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self.$v(nil,"miau, ich bin ".$T(nil,self.$1));return _a}}});$w = a$j({a$f: [],a$d: $i,a$i: {$W: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($b.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self.$a().$Y();return _a}},a$g: "TestExpr",a$h: {$Y: function(){var self,_a,_b,_c;_a=_c=nil;self=this;try{if(arguments.length>1)throw($b.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=(true?1:2);self.$u(nil,_a);(_b=_a=true, (_b!==false&&_b!==nil) ? _b : (a$b(new a$a(nil,null))));_c=self.$u(nil,_a);return _c}catch(_d){if(_d instanceof a$a && (!_d.a$b || _d.a$b==28))return _d.a$a;throw(_d)}}}});$x = a$j({a$f: [],a$d: nil,a$g: "X"});$y = a$j({a$f: [$x],a$d: $i,a$g: "A",a$h: {$3: function(_d,_a,_b){var self,_c;_c=nil;self=this;try{if(arguments.length!=3)throw($b.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));;_c=self.$u(nil,_a,_b);return _c}catch(_e){if(_e instanceof a$a && (!_e.a$b || _e.a$b==29))return _e.a$a;throw(_e)}}}});$z = a$j({a$f: [],a$d: $i,a$i: {$W: function(){var self,_a,_b;_a=_b=nil;self=this;if(arguments.length>1)throw($b.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self.$a();_a.$X(nil,0);self.$v(nil,"--");_a.$X(nil,1,2);self.$v(nil,"--");_a.$X(nil,1,2,9);self.$v(nil,"--");_a.$X(nil,1,2,9,5);self.$v(nil,"--");_a.$X(nil,1,2,9,5,6);self.$v(nil,"--");_b=_a.$X(nil,1,2,9,5,6,7,8,9,10,11,12);return _b}},a$g: "TestArgs",a$h: {$X: function(_g,_a,_b,_c){var self,_d,_e,_f;_f=nil;self=this;try{if(arguments.length<2)throw($b.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));if(_b===undefined)_b=1;if(_c===undefined)_c="hallo";_d=[];for(_e=4;_e<arguments.length;_e++)_d.push(arguments[_e]);;self.$u(nil,_a);self.$u(nil,_b);self.$u(nil,_c);_f=self.$u(nil,_d);return _f}catch(_h){if(_h instanceof a$a && (!_h.a$b || _h.a$b==30))return _h.a$a;throw(_h)}}}});$A = a$j({a$f: [],a$d: $y,a$g: "B",a$h: {$3: function(_d,_a,_b){var self;self=this;var _c=arguments;try{if(arguments.length!=3)throw($b.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));;self.$u(nil,"in B");a$f(self,'$3',_c)}catch(_e){if(_e instanceof a$a && (!_e.a$b || _e.a$b==31))return _e.a$a;throw(_e)}}}});$B = a$j({a$f: [],a$d: $A,a$g: "C"});$D = a$j({a$f: [],a$d: $i,a$i: {$W: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($b.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;self.$u(nil,$y.$a().$n(nil,$y));self.$u(nil,$y.$a().$n(nil,$A));self.$u(nil,$A.$a().$n(nil,$y));self.$u(nil,$y.$a().$n(nil,$x));self.$u(nil,$A.$a().$n(nil,$x));self.$u(nil,$y.$a().$i(nil,$y));self.$u(nil,$y.$a().$i(nil,$A));self.$u(nil,$A.$a().$i(nil,$y));self.$u(nil,$y.$a().$i(nil,$x));self.$u(nil,$A.$a().$i(nil,$x));self.$u(nil,$B.$a().$i(nil,$x));self.$u(nil,$B.$a().$i(nil,$y));self.$u(nil,$B.$a().$i(nil,$A));self.$u(nil,$B.$a().$i(nil,$B));self.$u(nil,$B.$a().$i(nil,$C));self.$u(nil,$B.$a().$i(nil,$i));self.$u(nil,$B.$a().$i(nil,$h));self.$u(nil,$B.$a().$i(nil,$a));self.$u(nil,"hallo".$c().$b());self.$u(nil,nil.$c().$b());self.$u(nil,nil.$n(nil,$j));self.$u(nil,"hallo".$n(nil,$e));self.$u(nil,"hallo".$c());self.$u(nil,$y);self.$u(nil,$A);self.$u(nil,$B);self.$u(nil,$C);self.$u(nil,$x);self.$u(nil,$x.$b());self.$u(nil,$y.$b());_a=self.$u(nil,$A.$b());return _a}},a$g: "TestClass"});$e = a$j({a$f: [],a$d: $i,a$g: "String",a$e: String,a$h: {$T: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($b.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;return(self + _a)}catch(_c){if(_c instanceof a$a && (!_c.a$b || _c.a$b==33))return _c.a$a;throw(_c)}},$4: function(_c,_a,_b){var self;self=this;try{if(arguments.length!=3)throw($b.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));;self.replace(pattern, replacement)}catch(_d){if(_d instanceof a$a && (!_d.a$b || _d.a$b==32))return _d.a$a;throw(_d)}},$6: function(_f,_a,_b){var self,_c,_d,_e;_d=_e=nil;self=this;try{if(arguments.length<2)throw($b.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));if(arguments.length>3)throw($b.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));if(_b===undefined)_b=" ";;if((_c=_b.$m(),_c!==false&&_c!==nil)){self.$k(nil,$b,"zero width padding")};_d=_a.$7(nil,self.$8());if((_c=_d.$9(nil,0),_c!==false&&_c!==nil)){return self};_e="";while(_e.length < _d) _e += _b;;return _e.$Q(nil,0,_d).$T(nil,self)}catch(_g){if(_g instanceof a$a && (!_g.a$b || _g.a$b==34))return _g.a$a;throw(_g)}},$5: function(){var self;self=this;if(arguments.length>1)throw($b.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;return self.length},$Q: function(_d,_a,_b){var self,_c;self=this;try{if(arguments.length<2)throw($b.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));if(arguments.length>3)throw($b.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));if(_b===undefined)_b=nil;;if((_c=_b.$r(),_c!==false&&_c!==nil)){return self.charAt(_a) || nil}else{if((_c=_b.$$(nil,0),_c!==false&&_c!==nil)){return nil};return self.substring(_a, _a+_b)}}catch(_e){if(_e instanceof a$a && (!_e.a$b || _e.a$b==36))return _e.a$a;throw(_e)}},$_: function(_f,_a,_b){var self,_c,_d,_e;_d=_e=nil;self=this;try{if(arguments.length<2)throw($b.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));if(arguments.length>3)throw($b.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));if(_b===undefined)_b=" ";;if((_c=_b.$m(),_c!==false&&_c!==nil)){self.$k(nil,$b,"zero width padding")};_d=_a.$7(nil,self.$8());if((_c=_d.$9(nil,0),_c!==false&&_c!==nil)){return self};_e="";while(_e.length < _d) _e += _b;;return self.$T(nil,_e.$Q(nil,0,_d))}catch(_g){if(_g instanceof a$a && (!_g.a$b || _g.a$b==35))return _g.a$a;throw(_g)}},$aa: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($b.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;return self.split(_a)}catch(_c){if(_c instanceof a$a && (!_c.a$b || _c.a$b==37))return _c.a$a;throw(_c)}},$p: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($b.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self;return _a},$8: function(){var self;self=this;if(arguments.length>1)throw($b.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;return self.length},$ab: function(){var self;self=this;if(arguments.length>1)throw($b.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;return self.replace(/^\s+/, '').replace(/\s+$/, '')},$m: function(){var self;self=this;if(arguments.length>1)throw($b.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;return(self === "")},$ad: function(_g,_a,_b){var self,_c,_d,_e,_f;_d=_e=_f=nil;self=this;try{if(arguments.length<2)throw($b.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));if(arguments.length>3)throw($b.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));if(_b===undefined)_b=nil;;(_c=["",self,nil],_d=_c[0]===undefined?nil:_c[0],_e=_c[1]===undefined?nil:_c[1],_f=_c[2]===undefined?nil:_c[2],_c);while(_e.length > 0) {
        if (_f = _e.match(_a)) {
          _d += _e.slice(0, _f.index);;if((_c=_b,_c!==false&&_c!==nil)){_d=_d.$T(nil,_b)}else{_d=_d.$T(nil,_g(_f.$ae()).$p())};_e = _e.slice(_f.index + _f[0].length);
        } else {
          _d += _e; _e = '';
        }
      } return _d}catch(_h){if(_h instanceof a$a && (!_h.a$b || _h.a$b==39))return _h.a$a;throw(_h)}},$ac: function(_c,_a,_b){var self;self=this;try{if(arguments.length<2)throw($b.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));if(arguments.length>3)throw($b.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));if(_b===undefined)_b=0;;
      var i = self.indexOf(_a, _b);
      return (i == -1) ? nil : i}catch(_d){if(_d instanceof a$a && (!_d.a$b || _d.a$b==38))return _d.a$a;throw(_d)}},$j: function(){var self,_a,_b;_a=_b=nil;self=this;if(arguments.length>1)throw($b.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a={
        '\b': '\\b',
        '\t': '\\t',
        '\n': '\\n',
        '\f': '\\f',
        '\r': '\\r',
        '\\': '\\\\'
      };;_b=self.$ad(function(_c){var _d,_e;_d=_c===undefined?nil:_c;_e=_a[_d];return _e ? _e : 
          '\\u00' + ("0" + _d.charCodeAt().toString(16)).substring(0,2);},/[\x00-\x1f\\]/);return ('"' + _b.replace(/"/g, '\\"') + '"');},$af: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($b.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;
      var i = self.match(_a);
      return (i === null) ? nil : i}catch(_c){if(_c instanceof a$a && (!_c.a$b || _c.a$b==40))return _c.a$a;throw(_c)}}}});$G = a$j({a$f: [],a$d: $i,a$i: {$W: function(){var self,_a,_b,_c,_d,_e,_f;_a=_b=_c=_d=_e=_f=nil;self=this;if(self.$ah===undefined)self.$ah=nil;if(self.$ag===undefined)self.$ag=nil;if(arguments.length>1)throw($b.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;(_a=[1,2],_b=_a[0]===undefined?nil:_a[0],_c=_a[1]===undefined?nil:_a[1],_a);self.$u(nil,_b);self.$u(nil,_c);self.$v(nil,"--");(_a=[1,2,3],_b=_a[0]===undefined?nil:_a[0],_c=_a[1]===undefined?nil:_a[1],_a);self.$u(nil,_b);self.$u(nil,_c);self.$v(nil,"--");_d=5;(_a=[1,2],_b=_a[0]===undefined?nil:_a[0],_c=_a[1]===undefined?nil:_a[1],_d=_a[2]===undefined?nil:_a[2],_a);self.$u(nil,_b);self.$u(nil,_c);self.$u(nil,_d);self.$v(nil,"--");(_a=[1,2,3],self.$ag=_a[0]===undefined?nil:_a[0],_c=_a[1]===undefined?nil:_a[1],self.$ah=_a[2]===undefined?nil:_a[2],_a);self.$u(nil,self.$ag);self.$u(nil,_c);self.$u(nil,self.$ah);self.$v(nil,"--");self.$v(nil,"swap");(_a=[1,2],_b=_a[0]===undefined?nil:_a[0],_c=_a[1]===undefined?nil:_a[1],_a);self.$u(nil,_b);self.$u(nil,_c);(_a=[_c,_b],_b=_a[0]===undefined?nil:_a[0],_c=_a[1]===undefined?nil:_a[1],_a);self.$u(nil,_b);self.$u(nil,_c);self.$v(nil,"--");self.$v(nil,"splat1");(_a=[1,2],_b=_a[0]===undefined?nil:_a[0],_c=_a[1]===undefined?nil:_a[1],_d=_a[2]===undefined?nil:_a[2],_e=_a.slice(3),_a);self.$u(nil,_b);self.$u(nil,_c);self.$u(nil,_d);self.$u(nil,_e);self.$v(nil,"--");self.$v(nil,"splat2");(_a=[1,2],_b=_a[0]===undefined?nil:_a[0],_c=_a.slice(1),_a);self.$u(nil,_b);self.$u(nil,_c);self.$v(nil,"--");self.$v(nil,"splat3");(_a=[1,2,3,4,5],_b=_a[0]===undefined?nil:_a[0],_c=_a.slice(1),_a);self.$u(nil,_b);self.$u(nil,_c);self.$v(nil,"--");self.$v(nil,"splat with globals");self.$u(nil,(typeof($E)=='undefined'?nil:$E));self.$u(nil,(typeof($F)=='undefined'?nil:$F));(_a=[1,2],$E=_a[0]===undefined?nil:_a[0],$F=_a[1]===undefined?nil:_a[1],_a);self.$u(nil,(typeof($E)=='undefined'?nil:$E));self.$u(nil,(typeof($F)=='undefined'?nil:$F));_f=self.$v(nil,"--");return _f}},a$g: "TestMassign"});$H = a$j({a$f: [],a$d: $i,a$i: {$W: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($b.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;self.$u(nil,$y.$a().$x(nil,"a_method",1,2));self.$u(nil,$A.$a().$x(nil,"a_method",1,2));self.$u(nil,$y.$a().$s(nil,"a_method"));self.$u(nil,$y.$a().$s(nil,"to_s"));self.$u(nil,$y.$a().$s(nil,"inspect"));_a=self.$u(nil,$y.$a().$s(nil,"b_method"));return _a}},a$g: "TestSend"});$g = a$j({a$f: [],a$d: $i,a$i: {$a: function(_a){var self,_b,_c;self=this;_b=_a===undefined?nil:_a;try{if(arguments.length>1)throw($b.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;if((_c=_b.$r(),_c!==false&&_c!==nil)){self.$k(nil,$b,"tried to create Proc object without a block")};return (function() {
        try {
          return _b.$K.apply(_b, arguments);
        } catch(e) 
        {
          if (e instanceof a$a) 
          {
            if (e.a$b == null)
            {;self.$k(nil,$I,"break from proc-closure");}
            return e.a$a;
          }
          else throw(e);
        }
      })}catch(_d){if(_d instanceof a$a && (!_d.a$b || _d.a$b==41))return _d.a$a;throw(_d)}}},a$g: "Proc",a$e: Function,a$h: {$K: function(){var self,_a,_b;self=this;_a=[];for(_b=1;_b<arguments.length;_b++)_a.push(arguments[_b]);;if (_a.length == 0) return self();
       else if (_a.length == 1) return self(_a[0]);
       else return self(_a);}}});$d = a$j({a$f: [],a$d: $k,a$g: "TypeError"});$J = a$j({a$f: [],a$d: $i,a$g: "Number",a$e: Number,a$h: {$T: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($b.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;return self + _a}catch(_c){if(_c instanceof a$a && (!_c.a$b || _c.a$b==45))return _c.a$a;throw(_c)}},$al: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($b.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;return self == _a}catch(_c){if(_c instanceof a$a && (!_c.a$b || _c.a$b==44))return _c.a$a;throw(_c)}},$aj: function(_d,_a){var self,_b,_c;_b=nil;self=this;try{if(arguments.length!=2)throw($b.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;_b=self;while((_c=_b.$ak(nil,_a),_c!==false&&_c!==nil)){_d(_b);_b=_b.$7(nil,1)};return self}catch(_e){if(_e instanceof a$a && (!_e.a$b || _e.a$b==43))return _e.a$a;throw(_e)}},$ai: function(_d,_a){var self,_b,_c;_b=nil;self=this;try{if(arguments.length!=2)throw($b.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;_b=self;while((_c=_b.$9(nil,_a),_c!==false&&_c!==nil)){_d(_b);_b=_b.$T(nil,1)};return self}catch(_e){if(_e instanceof a$a && (!_e.a$b || _e.a$b==42))return _e.a$a;throw(_e)}},$9: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($b.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;return self <= _a}catch(_c){if(_c instanceof a$a && (!_c.a$b || _c.a$b==46))return _c.a$a;throw(_c)}},$7: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($b.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;return self - _a}catch(_c){if(_c instanceof a$a && (!_c.a$b || _c.a$b==47))return _c.a$a;throw(_c)}},$am: function(){var self;self=this;if(arguments.length>1)throw($b.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;return self+1},$an: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($b.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;return self / _a}catch(_c){if(_c instanceof a$a && (!_c.a$b || _c.a$b==49))return _c.a$a;throw(_c)}},$p: function(_b,_a){var self;self=this;try{if(arguments.length>2)throw($b.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));if(_a===undefined)_a=10;;return self.toString(_a)}catch(_c){if(_c instanceof a$a && (!_c.a$b || _c.a$b==48))return _c.a$a;throw(_c)}},$ao: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($b.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;return self % _a}catch(_c){if(_c instanceof a$a && (!_c.a$b || _c.a$b==50))return _c.a$a;throw(_c)}},$ar: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($b.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;return self & _a}catch(_c){if(_c instanceof a$a && (!_c.a$b || _c.a$b==54))return _c.a$a;throw(_c)}},$$: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($b.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;return self < _a}catch(_c){if(_c instanceof a$a && (!_c.a$b || _c.a$b==53))return _c.a$a;throw(_c)}},$aq: function(_c){var self,_a,_b;_a=nil;self=this;try{if(arguments.length>1)throw($b.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=0;while((_b=_a.$$(nil,self),_b!==false&&_b!==nil)){_c(_a);_a=_a.$T(nil,1)};return self}catch(_d){if(_d instanceof a$a && (!_d.a$b || _d.a$b==52))return _d.a$a;throw(_d)}},$ap: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($b.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;return self | _a}catch(_c){if(_c instanceof a$a && (!_c.a$b || _c.a$b==51))return _c.a$a;throw(_c)}},$av: function(){var self;self=this;if(arguments.length>1)throw($b.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;return -self},$au: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($b.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;return self > _a}catch(_c){if(_c instanceof a$a && (!_c.a$b || _c.a$b==56))return _c.a$a;throw(_c)}},$at: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($b.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;return self ^ _a}catch(_c){if(_c instanceof a$a && (!_c.a$b || _c.a$b==55))return _c.a$a;throw(_c)}},$as: function(){var self;self=this;if(arguments.length>1)throw($b.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;return ~self},$ak: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($b.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;return self >= _a}catch(_c){if(_c instanceof a$a && (!_c.a$b || _c.a$b==57))return _c.a$a;throw(_c)}},$j: function(){var self;self=this;if(arguments.length>1)throw($b.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;return self.toString()},$ax: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($b.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;return self * _a}catch(_c){if(_c instanceof a$a && (!_c.a$b || _c.a$b==58))return _c.a$a;throw(_c)}},$aw: function(){var self;self=this;if(arguments.length>1)throw($b.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;return self}}});$K = a$j({a$f: [],a$d: $J,a$g: "Bignum",a$e: Number});$L = a$j({a$f: [],a$d: $i,a$i: {$W: function(){var self,_a,_b;_a=_b=nil;self=this;if(arguments.length>1)throw($b.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=$n.$V(nil,"a",6,"b",7,"1",1,1,2,"1,2","hello",[1,2],"good");self.$u(nil,_a.$Q(nil,"a"));self.$u(nil,_a.$Q(nil,"b"));self.$u(nil,_a.$Q(nil,"1"));self.$u(nil,_a.$Q(nil,1));self.$u(nil,_a.$Q(nil,"1,2"));_b=self.$u(nil,_a.$Q(nil,[1,2]));return _b}},a$g: "TestHash"});$M = a$j({a$f: [$m],a$d: $i,a$i: {$a: function(){var self;self=this;if(arguments.length>1)throw($b.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;return []}},a$g: "Array",a$e: Array,a$h: {$T: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($b.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;return self.concat(_a)}catch(_c){if(_c instanceof a$a && (!_c.a$b || _c.a$b==61))return _c.a$a;throw(_c)}},$J: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($b.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;self.push(_a); return self}catch(_c){if(_c instanceof a$a && (!_c.a$b || _c.a$b==60))return _c.a$a;throw(_c)}},$Z: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($b.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;
      var del = false;
      for (var i=0; i < self.length; i++)
      {
        if (_a.$h(nil, self[i]))
        {
          self.splice(i,1);
          del = true;
          // stay at the current index unless we are at the last element!
          if (i < self.length-1) --i; 
        }
      }
      return del ? _a : nil}catch(_c){if(_c instanceof a$a && (!_c.a$b || _c.a$b==59))return _c.a$a;throw(_c)}},$5: function(){var self;self=this;if(arguments.length>1)throw($b.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;return self.length},$Q: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($b.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;var v = self[_a]; return ((v === undefined || v === null) ? nil : v)}catch(_c){if(_c instanceof a$a && (!_c.a$b || _c.a$b==63))return _c.a$a;throw(_c)}},$h: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($b.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;
      if (!(_a instanceof Array)) return false;
      if (self.length != _a.length) return false;  
 
      //
      // compare element-wise
      //
      for (var i = 0; i < self.length; i++) 
      {
        if (! self[i].$h(nil, _a[i]))
        {
          // 
          // at least for one element #eql? holds not true
          //
          return false;
        }
      }
      
      return true;
      }catch(_c){if(_c instanceof a$a && (!_c.a$b || _c.a$b==62))return _c.a$a;throw(_c)}},$ay: function(){var self;self=this;if(arguments.length>1)throw($b.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;return self.concat().reverse()},$p: function(){var self;self=this;if(arguments.length>1)throw($b.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;return('[' + self.toString() + ']');},$R: function(_c,_a,_b){var self;self=this;try{if(arguments.length!=3)throw($b.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));;return (self[_a] = _b)}catch(_d){if(_d instanceof a$a && (!_d.a$b || _d.a$b==66))return _d.a$a;throw(_d)}},$w: function(_a){var self,_b;_b=nil;self=this;try{if(arguments.length>1)throw($b.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;for (var i=0; i < self.length; i++) {;_a(self[i]);};_b=self;return _b}catch(_c){if(_c instanceof a$a && (!_c.a$b || _c.a$b==65))return _c.a$a;throw(_c)}},$az: function(_a){var self,_b;_b=nil;self=this;try{if(arguments.length>1)throw($b.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;for (var i=0; i < self.length; i++) {;_a([self[i],i]);};_b=self;return _b}catch(_c){if(_c instanceof a$a && (!_c.a$b || _c.a$b==64))return _c.a$a;throw(_c)}},$ae: function(){var self;self=this;if(arguments.length>1)throw($b.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;var v = self[0]; return ((v === undefined || v === null) ? nil : v)},$8: function(){var self;self=this;if(arguments.length>1)throw($b.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;return self.length},$aA: function(){var self;self=this;if(arguments.length>1)throw($b.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;return self.pop()},$l: function(){var self;self=this;if(arguments.length>1)throw($b.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;return self.shift()},$m: function(){var self;self=this;if(arguments.length>1)throw($b.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;return (self.length == 0)},$E: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($b.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self;return _a},$aC: function(){var self,_a,_b;self=this;_a=[];for(_b=1;_b<arguments.length;_b++)_a.push(arguments[_b]);;self.push.apply(self, _a); return self},$aB: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($b.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self;return _a},$aF: function(){var self;self=this;if(arguments.length>1)throw($b.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;return self.concat()},$j: function(){var self,_a,_e;_a=_e=nil;self=this;if(arguments.length>1)throw($b.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a="[";_a=_a.$T(nil,self.$M(function(_b){var _c;var _d=nil;_c=_b===undefined?nil:_b;_d=_c.$j();return _d}).$U(nil,", "));_a=_a.$T(nil,"]");_e=_a;return _e},$aE: function(){var self;self=this;if(arguments.length>1)throw($b.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;self.reverse(); return self},$aD: function(){var self,_a,_b;self=this;_a=[];for(_b=1;_b<arguments.length;_b++)_a.push(arguments[_b]);;self.unshift.apply(self, _a); return self},$U: function(_i,_a){var self,_b,_d,_h;_b=_h=nil;self=this;try{if(arguments.length>2)throw($b.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));if(_a===undefined)_a="";;_b="";self.$az(function(_c){var _e,_f;var _g=nil;(_d=a$d(_c),_e=_d[0]===undefined?nil:_d[0],_f=_d[1]===undefined?nil:_d[1],_d);_b=_b.$T(nil,_e.$p());if((_d=_f.$al(nil,self.$8().$7(nil,1)),_d===false||_d===nil)){_g=_b=_b.$T(nil,_a)}else{_g=nil};return _g});_h=_b;return _h}catch(_j){if(_j instanceof a$a && (!_j.a$b || _j.a$b==67))return _j.a$a;throw(_j)}}}});$N = a$j({a$f: [],a$d: $i,a$i: {$W: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($b.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self.$a().$Y();return _a}},a$g: "TestString",a$h: {$Y: function(){var self,_a,_i;_a=_i=nil;self=this;if(self.$aG===undefined)self.$aG=nil;if(self.$ag===undefined)self.$ag=nil;if(arguments.length>1)throw($b.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;self.$u(nil,"hello");self.$u(nil,"hallo\b\t\n");self.$u(nil,"hallo\\leute");self.$u(nil,"\"super\"");self.$u(nil,"hello".$ac(nil,"e"));self.$u(nil,"hello".$ac(nil,"lo"));self.$u(nil,"hello".$ac(nil,"a"));self.$u(nil,"hello hello".$ac(nil,"ll"));self.$u(nil,"hello hello".$ac(nil,"ll",3));self.$u(nil,"hallo".$Q(nil,0,1));self.$u(nil,"hallo".$Q(nil,0,2));self.$u(nil,"hallo".$Q(nil,0,5));self.$u(nil,"10".$6(nil,10,"0"));self.$u(nil,"10".$6(nil,1,"blah"));self.$u(nil,"x".$6(nil,4,"()"));self.$u(nil,"10".$_(nil,10,"0"));self.$u(nil,"10".$_(nil,1,"blah"));self.$u(nil,"x".$_(nil,4,"()"));self.$u(nil,("abc " + ((1).$T(nil,2)).$p() + (" def").$p()));self.$ag="hallo".$j();self.$aG=4.5;self.$u(nil,("" + (self.$ag).$p() + (",").$p() + (self.$aG).$p()));_a="hallo".$ad(nil,"l","r");self.$u(nil,_a);_a="hallo".$ad(nil,/ll/,"rr");self.$u(nil,_a);_a="hallo".$ad(function(){var _c=nil;;_c="r";return _c},/l/);self.$u(nil,_a);_a="hallo".$ad(function(){var _e=nil;;_e="blah blah";return _e},/ll/);self.$u(nil,_a);_i="hallllllo".$ad(function(_f){var _g;var _h=nil;_g=_f===undefined?nil:_f;_h=self.$u(nil,_g);return _h},/(l)l/);return _i}}});$O = a$j({a$f: [],a$d: $i,a$g: "Range",a$h: {$al: function(_e,_a){var self,_b,_c,_d;_d=nil;self=this;if(self.$aH===undefined)self.$aH=nil;if(self.$aI===undefined)self.$aI=nil;if(self.$aK===undefined)self.$aK=nil;try{if(arguments.length!=2)throw($b.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;if (self.constructor != _a.constructor) return false;;_d=(_b=self.$aH.$al(nil,_a.$ae()), (_b!==false&&_b!==nil) ? ((_c=self.$aI.$al(nil,_a.$aJ()), (_c!==false&&_c!==nil) ? (self.$aK.$al(nil,_a.$aL())) : _c)) : _b);return _d}catch(_f){if(_f instanceof a$a && (!_f.a$b || _f.a$b==68))return _f.a$a;throw(_f)}},$aM: function(){var self,_a;_a=nil;self=this;if(self.$aH===undefined)self.$aH=nil;if(arguments.length>1)throw($b.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self.$aH;return _a},$h: function(_e,_a){var self,_b,_c,_d;_d=nil;self=this;if(self.$aH===undefined)self.$aH=nil;if(self.$aI===undefined)self.$aI=nil;if(self.$aK===undefined)self.$aK=nil;try{if(arguments.length!=2)throw($b.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;if (self.constructor != _a.constructor) return false;;_d=(_b=self.$aH.$h(nil,_a.$ae()), (_b!==false&&_b!==nil) ? ((_c=self.$aI.$h(nil,_a.$aJ()), (_c!==false&&_c!==nil) ? (self.$aK.$al(nil,_a.$aL())) : _c)) : _b);return _d}catch(_f){if(_f instanceof a$a && (!_f.a$b || _f.a$b==69))return _f.a$a;throw(_f)}},$aL: function(){var self,_a;_a=nil;self=this;if(self.$aK===undefined)self.$aK=nil;if(arguments.length>1)throw($b.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self.$aK;return _a},$aJ: function(){var self,_a;_a=nil;self=this;if(self.$aI===undefined)self.$aI=nil;if(arguments.length>1)throw($b.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self.$aI;return _a},$p: function(){var self,_b,_a;_a=nil;self=this;if(self.$aH===undefined)self.$aH=nil;if(self.$aI===undefined)self.$aI=nil;if(self.$aK===undefined)self.$aK=nil;if(arguments.length>1)throw($b.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;if((_b=self.$aK,_b!==false&&_b!==nil)){_a=("" + (self.$aH).$p() + ("...").$p() + (self.$aI).$p())}else{_a=("" + (self.$aH).$p() + ("..").$p() + (self.$aI).$p())};return _a},$w: function(_c){var self,_a,_b,_d;_a=_d=nil;self=this;if(self.$aH===undefined)self.$aH=nil;if(self.$aI===undefined)self.$aI=nil;if(self.$aK===undefined)self.$aK=nil;try{if(arguments.length>1)throw($b.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self.$aH;if((_b=self.$aH.$au(nil,self.$aI),_b!==false&&_b!==nil)){return nil};if((_b=self.$aK,_b!==false&&_b!==nil)){while((_b=_a.$$(nil,self.$aI),_b!==false&&_b!==nil)){_c(_a);_a=_a.$am()};_d=nil;}else{while((_b=_a.$9(nil,self.$aI),_b!==false&&_b!==nil)){_c(_a);_a=_a.$am()};_d=nil;};return _d}catch(_e){if(_e instanceof a$a && (!_e.a$b || _e.a$b==72))return _e.a$a;throw(_e)}},$aO: function(){var self,_a;_a=nil;self=this;if(self.$aI===undefined)self.$aI=nil;if(arguments.length>1)throw($b.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self.$aI;return _a},$ae: function(){var self,_a;_a=nil;self=this;if(self.$aH===undefined)self.$aH=nil;if(arguments.length>1)throw($b.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self.$aH;return _a},$aN: function(_d,_a){var self,_b,_c;_c=nil;self=this;if(self.$aH===undefined)self.$aH=nil;if(self.$aI===undefined)self.$aI=nil;if(self.$aK===undefined)self.$aK=nil;try{if(arguments.length!=2)throw($b.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;if((_b=_a.$$(nil,self.$aH),_b!==false&&_b!==nil)){return false};if((_b=self.$aK,_b!==false&&_b!==nil)){_c=_a.$$(nil,self.$aI)}else{_c=_a.$9(nil,self.$aI)};return _c}catch(_e){if(_e instanceof a$a && (!_e.a$b || _e.a$b==71))return _e.a$a;throw(_e)}},$e: function(_f,_a,_b,_c){var self,_d,_e;_e=nil;self=this;try{if(arguments.length<3)throw($b.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 2)'));if(arguments.length>4)throw($b.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 3)'));if(_c===undefined)_c=false;;(_d=[_a,_b],self.$aH=_d[0]===undefined?nil:_d[0],self.$aI=_d[1]===undefined?nil:_d[1],_d);_e=self.$aK=((_d=_c,_d!==false&&_d!==nil)?true:false);return _e}catch(_g){if(_g instanceof a$a && (!_g.a$b || _g.a$b==70))return _g.a$a;throw(_g)}},$g: function(_d,_a){var self,_b,_c;_c=nil;self=this;if(self.$aH===undefined)self.$aH=nil;if(self.$aI===undefined)self.$aI=nil;if(self.$aK===undefined)self.$aK=nil;try{if(arguments.length!=2)throw($b.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;if((_b=_a.$$(nil,self.$aH),_b!==false&&_b!==nil)){return false};if((_b=self.$aK,_b!==false&&_b!==nil)){_c=_a.$$(nil,self.$aI)}else{_c=_a.$9(nil,self.$aI)};return _c}catch(_e){if(_e instanceof a$a && (!_e.a$b || _e.a$b==73))return _e.a$a;throw(_e)}},$E: function(){var self,_a,_b,_c;_a=_c=nil;self=this;if(self.$aH===undefined)self.$aH=nil;if(self.$aI===undefined)self.$aI=nil;if(self.$aK===undefined)self.$aK=nil;if(arguments.length>1)throw($b.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=[];if((_b=self.$aH.$au(nil,self.$aI),_b!==false&&_b!==nil)){return _a};_c=self.$aH;if((_b=self.$aK,_b!==false&&_b!==nil)){while((_b=_c.$$(nil,self.$aI),_b!==false&&_b!==nil)){_a.$J(nil,_c);_c=_c.$am()}}else{while((_b=_c.$9(nil,self.$aI),_b!==false&&_b!==nil)){_a.$J(nil,_c);_c=_c.$am()}};return _a},$j: function(){var self,_b,_a;_a=nil;self=this;if(self.$aH===undefined)self.$aH=nil;if(self.$aI===undefined)self.$aI=nil;if(self.$aK===undefined)self.$aK=nil;if(arguments.length>1)throw($b.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;if((_b=self.$aK,_b!==false&&_b!==nil)){_a=("" + (self.$aH.$j()).$p() + ("...").$p() + (self.$aI.$j()).$p())}else{_a=("" + (self.$aH.$j()).$p() + ("..").$p() + (self.$aI.$j()).$p())};return _a},$aP: function(_d,_a){var self,_b,_c;_c=nil;self=this;if(self.$aH===undefined)self.$aH=nil;if(self.$aI===undefined)self.$aI=nil;if(self.$aK===undefined)self.$aK=nil;try{if(arguments.length!=2)throw($b.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;if((_b=_a.$$(nil,self.$aH),_b!==false&&_b!==nil)){return false};if((_b=self.$aK,_b!==false&&_b!==nil)){_c=_a.$$(nil,self.$aI)}else{_c=_a.$9(nil,self.$aI)};return _c}catch(_e){if(_e instanceof a$a && (!_e.a$b || _e.a$b==74))return _e.a$a;throw(_e)}}}});$c = a$j({a$f: [],a$d: $k,a$g: "RuntimeError"});$P = a$j({a$f: [],a$d: $J,a$g: "Fixnum",a$e: Number});$Q = a$j({a$f: [],a$d: $i,a$i: {$W: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($b.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self.$a().$Y();return _a}},a$g: "TestCase",a$h: {$Y: function(){var self,_a,_b,_c,_d;_d=nil;self=this;if(arguments.length>1)throw($b.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=(1).$T(nil,1); if((_b=(_c=(1).$g(nil,_a), (_c!==false&&_c!==nil) ? _c : ((3).$g(nil,_a))),_b!==false&&_b!==nil)){self.$v(nil,"NOT OKAY")}else{if((_b=(2).$g(nil,_a),_b!==false&&_b!==nil)){self.$v(nil,"OKAY")}else{self.$v(nil,"NOT OKAY")}};self.$u(nil,$M.$g(nil,[]));self.$u(nil,$c.$g(nil,$c.$a()));_a=1; if((_b=$P.$g(nil,_a),_b!==false&&_b!==nil)){self.$v(nil,"OK")}else{if((_b=(1).$g(nil,_a),_b!==false&&_b!==nil)){self.$v(nil,"OK")}};_a=_d=4; if((_b=$O.$a(nil,0,3,false).$g(nil,_a),_b!==false&&_b!==nil)){_d=self.$v(nil,"NOT OKAY")}else{if((_b=$O.$a(nil,1,4,true).$g(nil,_a),_b!==false&&_b!==nil)){_d=self.$v(nil,"NOT OKAY")}else{if((_b=$O.$a(nil,2,4,false).$g(nil,_a),_b!==false&&_b!==nil)){_d=self.$v(nil,"OKAY")}else{_d=nil}}};return _d}}});$X = a$j({a$f: [],a$d: $i,a$i: {$W: function(){var self,_c,_d,_b;_c=_b=nil;self=this;if(arguments.length>1)throw($b.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;try{self.$v(nil,"~~~~~~~~~~~~~~~~~~~~");self.$v(nil,"Test splat");self.$v(nil,"~~~~~~~~~~~~~~~~~~~~");$r.$W();self.$v(nil,"~~~~~~~~~~~~~~~~~~~~");self.$v(nil,"Test simple output");self.$v(nil,"~~~~~~~~~~~~~~~~~~~~");$o.$W();self.$v(nil,"~~~~~~~~~~~~~~~~~~~~");self.$v(nil,"Test new");self.$v(nil,"~~~~~~~~~~~~~~~~~~~~");$R.$W();self.$v(nil,"~~~~~~~~~~~~~~~~~~~~");self.$v(nil,"Test massign");self.$v(nil,"~~~~~~~~~~~~~~~~~~~~");$G.$W();self.$v(nil,"~~~~~~~~~~~~~~~~~~~~");self.$v(nil,"Test send");self.$v(nil,"~~~~~~~~~~~~~~~~~~~~");$H.$W();self.$v(nil,"~~~~~~~~~~~~~~~~~~~~");self.$v(nil,"Test if");self.$v(nil,"~~~~~~~~~~~~~~~~~~~~");$S.$W();self.$v(nil,"~~~~~~~~~~~~~~~~~~~~");self.$v(nil,"Test hash");self.$v(nil,"~~~~~~~~~~~~~~~~~~~~");$L.$W();self.$v(nil,"~~~~~~~~~~~~~~~~~~~~");self.$v(nil,"Test exception");self.$v(nil,"~~~~~~~~~~~~~~~~~~~~");$s.$W();self.$v(nil,"~~~~~~~~~~~~~~~~~~~~");self.$v(nil,"Test eql");self.$v(nil,"~~~~~~~~~~~~~~~~~~~~");$T.$W();self.$v(nil,"~~~~~~~~~~~~~~~~~~~~");self.$v(nil,"Test args");self.$v(nil,"~~~~~~~~~~~~~~~~~~~~");$z.$W();self.$v(nil,"~~~~~~~~~~~~~~~~~~~~");self.$v(nil,"Test yield");self.$v(nil,"~~~~~~~~~~~~~~~~~~~~");$U.$W();self.$v(nil,"~~~~~~~~~~~~~~~~~~~~");self.$v(nil,"Test string");self.$v(nil,"~~~~~~~~~~~~~~~~~~~~");$N.$W();self.$v(nil,"~~~~~~~~~~~~~~~~~~~~");self.$v(nil,"Test array");self.$v(nil,"~~~~~~~~~~~~~~~~~~~~");$t.$W();self.$v(nil,"~~~~~~~~~~~~~~~~~~~~");self.$v(nil,"Test lebewesen");self.$v(nil,"~~~~~~~~~~~~~~~~~~~~");$V.$W();self.$v(nil,"~~~~~~~~~~~~~~~~~~~~");self.$v(nil,"Test class");self.$v(nil,"~~~~~~~~~~~~~~~~~~~~");$D.$W();self.$v(nil,"~~~~~~~~~~~~~~~~~~~~");self.$v(nil,"Test case");self.$v(nil,"~~~~~~~~~~~~~~~~~~~~");$Q.$W();self.$v(nil,"~~~~~~~~~~~~~~~~~~~~");self.$v(nil,"Test expr");self.$v(nil,"~~~~~~~~~~~~~~~~~~~~");$w.$W();self.$v(nil,"~~~~~~~~~~~~~~~~~~~~");self.$v(nil,"Test range");self.$v(nil,"~~~~~~~~~~~~~~~~~~~~");_b=$W.$W()}catch(_a){if(_a instanceof a$a)throw(_a);if((_d=$f.$g(nil,_a),_d!==false&&_d!==nil)){_c=(typeof(_a)=='undefined'?nil:_a);self.$u(nil,"unhandled exception");_b=self.$u(nil,_c)}else{throw(_a)}};return _b}},a$g: "TestSuite"});$T = a$j({a$f: [],a$d: $i,a$i: {$W: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($b.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;self.$u(nil,"a".$h(nil,"a"));self.$u(nil,"a".$h(nil,1));self.$u(nil,"1".$h(nil,1));self.$u(nil,[1,2].$h(nil,[1,2]));_a=self.$u(nil,(1).$h(nil,"1"));return _a}},a$g: "TestEql"});$Y = a$j({a$f: [],a$d: $u,a$g: "Hund",a$h: {$aQ: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($b.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self.$v(nil,"wau wau");return _a},$aR: function(_c,_a){var self,_b;_b=nil;self=this;try{if(arguments.length!=2)throw($b.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;_b=self.$v(nil,"ich jage ".$T(nil,_a.$b()));return _b}catch(_d){if(_d instanceof a$a && (!_d.a$b || _d.a$b==75))return _d.a$a;throw(_d)}}}});$Z = a$j({a$f: [],a$d: $J,a$g: "Float",a$e: Number});$R = a$j({a$f: [],a$d: $i,a$i: {$W: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($b.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self.$a().$Y();return _a}},a$g: "TestNew",a$h: {$e: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($b.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=nil;return _a},$Y: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($b.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self.$v(nil,"test");return _a}}});$U = a$j({a$f: [],a$d: $i,a$i: {$W: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($b.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self.$a().$Y();return _a}},a$g: "TestYield",a$h: {$aT: function(){var self,_a,_b,_d,_f;_a=_b=_f=nil;self=this;try{if(arguments.length>1)throw($b.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;self.$v(nil,"loop2");_a=0;_b=self.$aU(function(){var _e=nil;;_a=_a.$T(nil,1);if((_d=_a.$ao(nil,2).$al(nil,1),_d!==false&&_d!==nil)){return nil};self.$u(nil,_a);if((_d=_a.$au(nil,8),_d!==false&&_d!==nil)){throw(new a$a(["out",_a],null))}else{_e=nil};return _e});self.$u(nil,_b);_f=self.$v(nil,"--");return _f}catch(_g){if(_g instanceof a$a && (!_g.a$b || _g.a$b==77))return _g.a$a;throw(_g)}},$aS: function(_a){var self,_b,_c;_c=nil;self=this;_b=_a===undefined?nil:_a;try{if(arguments.length>1)throw($b.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_b.$K(nil,1);_b.$K(nil,2);_c=_b.$K(nil,3);return _c}catch(_d){if(_d instanceof a$a && (!_d.a$b || _d.a$b==76))return _d.a$a;throw(_d)}},$aW: function(_a){var self,_b,_c;_c=nil;self=this;_b=_a===undefined?nil:_a;try{if(arguments.length>1)throw($b.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;self.$u(nil,"return_in_block before");_b.$K();_c=self.$u(nil,"return_in_block after");return _c}catch(_d){if(_d instanceof a$a && (!_d.a$b || _d.a$b==78))return _d.a$a;throw(_d)}},$aV: function(){var self,_a,_b,_c;_a=_c=nil;self=this;if(arguments.length>1)throw($b.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;self.$v(nil,"while-loop");_a=0;while(true){_a=_a.$T(nil,1);if((_b=_a.$ao(nil,2).$al(nil,1),_b!==false&&_b!==nil)){continue};self.$u(nil,_a);if((_b=_a.$au(nil,8),_b!==false&&_b!==nil)){break}};self.$v(nil,"----");while((_b=_a.$au(nil,0),_b!==false&&_b!==nil)){self.$u(nil,_a);_a=_a.$7(nil,1)};_c=self.$v(nil,"--");return _c},$aU: function(_a){var self,_b,_c;_c=nil;self=this;_b=_a===undefined?nil:_a;try{if(arguments.length>1)throw($b.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;while(true){_b.$K()};_c=self.$u(nil,"not reached");return _c}catch(_d){if(_d instanceof a$a && (!_d.a$b || _d.a$b==80))return _d.a$a;throw(_d)}},$aZ: function(){var self,_a,_d;_a=_d=nil;self=this;try{if(arguments.length>1)throw($b.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;self.$u(nil,"test_proc");_a=self.$t(function(){;throw(new a$a(0,79))});self.$u(nil,_a.$K());_a=$g.$a(function(){;throw(new a$a(3,null))});_d=self.$u(nil,_a.$K());return _d}catch(_e){if(_e instanceof a$a && (!_e.a$b || _e.a$b==79))return _e.a$a;throw(_e)}},$aX: function(){var self,_d;_d=nil;self=this;if(arguments.length>1)throw($b.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;self.$v(nil,"three_times_indirect");self.$aY(function(_a){var _b;var _c=nil;_b=_a===undefined?nil:_a;_c=self.$u(nil,_b);return _c});_d=self.$v(nil,"--");return _d},$a0: function(){var self,_d,_e;_e=nil;self=this;if(arguments.length>1)throw($b.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;self.$v(nil,"three_times_yield2");_e=self.$a1(function(_a){var _b;var _c=nil;_b=_a===undefined?nil:_a;if((_d=_b.$al(nil,1),_d!==false&&_d!==nil)){_c=_b}else{return _b.$T(nil,1)};return _c});return _e},$a3: function(){var self,_a,_b,_d,_f;_a=_b=_f=nil;self=this;try{if(arguments.length>1)throw($b.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;self.$v(nil,"loop");_a=0;_b=self.$y(function(){var _e=nil;;_a=_a.$T(nil,1);if((_d=_a.$ao(nil,2).$al(nil,1),_d!==false&&_d!==nil)){return nil};self.$u(nil,_a);if((_d=_a.$au(nil,8),_d!==false&&_d!==nil)){throw(new a$a(["out",_a],null))}else{_e=nil};return _e});self.$u(nil,_b);_f=self.$v(nil,"--");return _f}catch(_g){if(_g instanceof a$a && (!_g.a$b || _g.a$b==81))return _g.a$a;throw(_g)}},$a2: function(){var self,_d;_d=nil;self=this;if(arguments.length>1)throw($b.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;self.$v(nil,"three_times_block");self.$aS(function(_a){var _b;var _c=nil;_b=_a===undefined?nil:_a;_c=self.$u(nil,_b);return _c});_d=self.$v(nil,"--");return _d},$Y: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($b.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;self.$a4();self.$a2();self.$aX();self.$a0();self.$a3();self.$aT();self.$aV();self.$aZ();_a=self.$u(nil,self.$a5());return _a},$y: function(_a){var self,_b;_b=nil;self=this;try{if(arguments.length>1)throw($b.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;while(true){_a()};_b=self.$u(nil,"not reached");return _b}catch(_c){if(_c instanceof a$a && (!_c.a$b || _c.a$b==84))return _c.a$a;throw(_c)}},$aY: function(_a){var self,_b,_c;_c=nil;self=this;_b=_a===undefined?nil:_a;try{if(arguments.length>1)throw($b.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;self.$a6(_b);_c=self.$aS(_b);return _c}catch(_d){if(_d instanceof a$a && (!_d.a$b || _d.a$b==83))return _d.a$a;throw(_d)}},$a6: function(_a){var self,_b;_b=nil;self=this;try{if(arguments.length>1)throw($b.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a(1);_a(2);_b=_a(3);return _b}catch(_c){if(_c instanceof a$a && (!_c.a$b || _c.a$b==82))return _c.a$a;throw(_c)}},$a1: function(_a){var self,_b;_b=nil;self=this;try{if(arguments.length>1)throw($b.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;self.$u(nil,_a(1));self.$u(nil,_a(2));_b=self.$u(nil,_a(3));return _b}catch(_c){if(_c instanceof a$a && (!_c.a$b || _c.a$b==85))return _c.a$a;throw(_c)}},$a5: function(){var self,_b;_b=nil;self=this;try{if(arguments.length>1)throw($b.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;self.$u(nil,"before");self.$aW(function(){;throw(new a$a(4,86))});_b=self.$u(nil,"after (NOT)");return _b}catch(_c){if(_c instanceof a$a && (!_c.a$b || _c.a$b==86))return _c.a$a;throw(_c)}},$a4: function(){var self,_d;_d=nil;self=this;if(arguments.length>1)throw($b.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;self.$v(nil,"three_times_yield");self.$a6(function(_a){var _b;var _c=nil;_b=_a===undefined?nil:_a;_c=self.$u(nil,_b);return _c});_d=self.$v(nil,"--");return _d}}});$0 = a$j({a$f: [],a$d: $i,a$g: "Boolean",a$e: Boolean,a$h: {$al: function(_b,_a){var self;self=this;try{if(arguments.length!=2)throw($b.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 1)'));;return (self == _a)}catch(_c){if(_c instanceof a$a && (!_c.a$b || _c.a$b==87))return _c.a$a;throw(_c)}},$p: function(){var self;self=this;if(arguments.length>1)throw($b.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;return (self == true ? 'true' : 'false')},$j: function(){var self;self=this;if(arguments.length>1)throw($b.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;return (self == true ? 'true' : 'false')}}});$I = a$j({a$f: [],a$d: $k,a$g: "LocalJumpError"});$S = a$j({a$f: [],a$d: $i,a$i: {$W: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($b.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self.$a().$Y();return _a}},a$g: "TestIf",a$h: {$Y: function(){var self,_a,_b,_c,_d,_e,_f;_f=nil;self=this;if(arguments.length>1)throw($b.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;if(true){self.$v(nil,"OK")};if(false){self.$v(nil,"NOT OK")};if(true){self.$v(nil,"OK")};if(false){self.$v(nil,"NOT OK")};if((_a=(_b=true, (_b!==false&&_b!==nil) ? ((_c=true, (_c!==false&&_c!==nil) ? ((_d=(_e=true, (_e!==false&&_e!==nil) ? _e : (false)), (_d!==false&&_d!==nil) ? (true) : _d)) : _c)) : _b),_a!==false&&_a!==nil)){self.$v(nil,"OK")};if((_a=(_b=(5).$$(nil,6), (_b!==false&&_b!==nil) ? ((6).$$(nil,7)) : _b),_a!==false&&_a!==nil)){self.$v(nil,"OK")};self.$u(nil,(_a=false, (_a!==false&&_a!==nil) ? _a : ("a")));self.$u(nil,(_a=nil, (_a!==false&&_a!==nil) ? _a : ("a")));self.$u(nil,(_a=true, (_a!==false&&_a!==nil) ? _a : ("a")));self.$u(nil,(_a="b", (_a!==false&&_a!==nil) ? _a : ("a")));self.$u(nil,(_a=false, (_a!==false&&_a!==nil) ? ("a") : _a));self.$u(nil,(_a=nil, (_a!==false&&_a!==nil) ? ("a") : _a));self.$u(nil,(_a=true, (_a!==false&&_a!==nil) ? ("a") : _a));_f=self.$u(nil,(_a="b", (_a!==false&&_a!==nil) ? ("a") : _a));return _f}}});$V = a$j({a$f: [],a$d: $i,a$i: {$W: function(){var self,_a,_b,_c,_d;_a=_b=_c=_d=nil;self=this;if(arguments.length>1)throw($b.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=$v.$a(nil,"AA-BB","Leni");_b=$v.$a(nil,"AC-DC","Flocki");_c=$Y.$a(nil,"AA-ZZ");_a.$2();_c.$aQ();_d=_c.$aR(nil,_a);return _d}},a$g: "TestLebewesen"});$C = a$j({a$f: [],a$d: $i,a$g: "D"});$W = a$j({a$f: [],a$d: $i,a$i: {$W: function(){var self,_a;_a=nil;self=this;if(arguments.length>1)throw($b.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=self.$a().$Y();return _a}},a$g: "TestRange",a$h: {$Y: function(){var self,_a,_i,_j;_a=_i=_j=nil;self=this;if(arguments.length>1)throw($b.$a(nil,'wrong number of arguments ('+Math.max(0,arguments.length-1).toString()+' for 0)'));;_a=$O.$a(nil,0,2);self.$u(nil,_a.$ae());self.$u(nil,_a.$aJ());self.$u(nil,_a);self.$u(nil,$O.$a(nil,0,2,false).$p());self.$u(nil,$O.$a(nil,0,2,true).$p());$O.$a(nil,0,4,false).$w(function(_b){var _c;var _d=nil;_c=_b===undefined?nil:_b;_d=self.$u(nil,_c);return _d});$O.$a(nil,0,4,true).$w(function(_e){var _c;var _f=nil;_c=_e===undefined?nil:_e;_f=self.$u(nil,_c);return _f});$O.$a(nil,-1,-4,false).$w(function(_g){var _c;var _h=nil;_c=_g===undefined?nil:_g;_h=self.$u(nil,_c);return _h});self.$u(nil,$O.$a(nil,0,4,false).$aN(nil,4));self.$u(nil,$O.$a(nil,0,4,false).$aN(nil,5));self.$u(nil,$O.$a(nil,0,4,true).$aN(nil,5));self.$u(nil,$O.$a(nil,0,4,true).$aN(nil,4));self.$u(nil,$O.$a(nil,0,4,true).$aN(nil,3));self.$u(nil,$O.$a(nil,0,4,true).$aN(nil,0));self.$u(nil,$O.$a(nil,0,4,true).$aN(nil,-1));self.$u(nil,$O.$a(nil,-1,-5,false).$E());self.$u(nil,$O.$a(nil,-5,-1,false).$E());_i=$O.$a(nil,0,4);self.$u(nil,_i.$ae());self.$u(nil,_i.$aM());self.$u(nil,_i.$aJ());self.$u(nil,_i.$aO());self.$u(nil,_i.$aL());_i=$O.$a(nil,1,5,true);self.$u(nil,_i.$ae());self.$u(nil,_i.$aM());self.$u(nil,_i.$aJ());self.$u(nil,_i.$aO());self.$u(nil,_i.$aL());self.$u(nil,false.$al(nil,false));self.$u(nil,false.$al(nil,true));self.$u(nil,true.$al(nil,false));self.$u(nil,true.$al(nil,true));self.$u(nil,$O.$a(nil,0,2,false).$al(nil,$O.$a(nil,0,2,false)));self.$u(nil,$O.$a(nil,0,2,false).$al(nil,$O.$a(nil,0,2)));_j=self.$u(nil,$O.$a(nil,0,2,false).$al(nil,$O.$a(nil,0,2,true)));return _j}}});a$j({a$f: [],a$c: $a});      $a.a$d = $i;
a$h([$h,$i,$j,$f,$k,$b,$l,$m,$n,$o,$p,$q,$r,$s,$t,$u,$v,$w,$x,$y,$z,$A,$B,$D,$e,$G,$H,$g,$d,$J,$K,$L,$M,$N,$O,$c,$P,$Q,$X,$T,$Y,$Z,$R,$U,$0,$I,$S,$V,$C,$W,$a]);function main() { $X.$W() }
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
