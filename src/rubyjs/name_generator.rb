#
# Generate unique names from a (custom) alphabet.
#
# Copyright (c) 2007 by Michael Neumann (mneumann@ntecs.de).
# All rights reserved.
#

class NameGenerator

  DEFAULT_ALPHABET = ('a' .. 'z').to_a + ('A' .. 'Z').to_a + ('0' .. '9').to_a + ['_', '$']
  RESERVED_WORDS = %w(this self new break continue if then else while true false null undefined function document window) 

  def initialize(alphabet=DEFAULT_ALPHABET, reserved_words=RESERVED_WORDS)
    @alphabet = alphabet
    @reserved_words = reserved_words
    @digits = [0]
    @cache = {}
  end
  
  # 
  # We generate names using a g-adic development (where g=alphabet.size)
  #
  # The least significant digit is the first. If you think of it as a 
  # bit-string, then bit 0 would be @digits[0].
  #
  # In each call to next we try to increase the least significant digit.
  # If it overflows, then we reset it to zero and increase the next digit.
  # This continues up to the most significant digit. If this overflows,
  # we introduce a new most significant digit and set this to "zero".
  #

  def fresh
    loop do
      value = @digits.reverse.map {|d| @alphabet[d] }.join("")
      sz = @alphabet.size

      i = 0
      loop do
        # increase or initialize with 0
        @digits[i] = @digits[i] ? @digits[i]+1 : 0

        if @digits[i] >= sz
          @digits[i] = 0
          i += 1
        else
          break
        end
      end

      return value unless @reserved_words.include?(value)
    end
  end

  #
  # Generate a name for +name+. Return the same name for the same
  # +name+.
  #

  def get(name)
    raise unless name.is_a?(String)
    @cache[name] ||= self.fresh
  end

  def reverse_lookup(encoded_name)
    @cache.index(encoded_name)
  end

  def cache
    @cache
  end
end
