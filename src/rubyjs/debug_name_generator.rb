#
# A NameGenerator that outputs readable, non-obfuscated names.
#
# Copyright (c) 2007 by Michael Neumann (mneumann@ntecs.de).
# All rights reserved.
#

class DebugNameGenerator

  def initialize
    @tmp_counter = 0
    @cache = {}
  end
  
  def fresh
    name = "tmp_" + @tmp_counter.to_s
    @tmp_counter += 1
    return name
  end

  MAP = [
    %w($ dollar),
    %w(? quest),
    %w(+ plus),
    %w(+@ uplus),
    %w(- minus),
    %w(-@ uminus),
    %w(@ ivar),
    %w(/ div),
    %w(% mod),
    %w(* mul),
    %w(~ neg),
    %w(^ xor),
    %w(&& and),
    %w(& band),
    %w(|| or),
    %w(| bor),
    %w(! not),
    %w(=== eqq),
    %w(== eq),
    %w(!== neqq),
    %w(!= neq),
    %w(=~ match),
    %w(!~ nmatch),
    %w(<<< lshift3),
    %w(>>> rshift3),
    %w(<< lshift),
    %w(>> rshift),
    %w(<= le),
    %w(>= ge),
    %w(> gt),
    %w(< lt),
    %w([]= set),
    %w([] at),
    %w(= eq)
  ]

  #
  # Generate a name for +name+. Return the same name for the same
  # +name+.
  #

  def get(name)
    raise unless name.is_a?(String)

    if @cache[name]
      return @cache[name]
    else
      name2 = name
      MAP.each do |pat, rep|
        name2 = name2.gsub(pat, "$" + rep)
      end

      if name2 !~ /^[A-Za-z_\$0-9]+$/
        STDERR.puts name2
      end

      @cache[name] = name2
      return name2
    end
  end

  def cache
    @cache
  end

  def reverse_lookup(encoded_name)
    @cache.index(encoded_name)
  end


end
