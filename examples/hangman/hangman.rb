require 'dom_element'

class Hangman
  
  attr_accessor :word, :letters, :misses
  
  MAX_MISSES = 6
  
  def initialize
    @word = "snail"
    @letters = @word.split ""
    @guessed_letters = {}
    @letters.each { |letter| @guessed_letters[letter] = false }
    @misses = 0
    @scaffold_div = DOMElement.find("scaffold_div")
    @letters_div = DOMElement.find("letters")
    @guess_input = DOMElement.find("letter")
    @guess_button = DOMElement.find("guess")
    @guess_button.observe("click") do 
      guess(@guess_input["value"])
    end
    @letters_div.inner_html = display_word    
  end
  
  def display_word
    letters.collect do |letter|
      @guessed_letters[letter] ? letter : "_"
    end.join
  end
  
  def guess(letter)
    if letters.include?(letter)
      @guessed_letters[letter] = true
      @letters_div.inner_html = display_word
      puts "You win!" if won? 
    else
      @misses += 1
      @scaffold_div.inner_html = "<img src='scaffold-#{@misses}.png' />"
      if lost? 
        puts "You lost!" 
        @guess_button["disabled"] = true
      end
    end
    @guess_input["value"] = ""
  end
  
  def lost?
    @misses >= 6
  end
  
  def won?
    @guessed_letters.values.each do |guessed|
      return false unless guessed
    end
    return true
  end

  def self.main
    hangman = Hangman.new
  rescue StandardError => ex
    puts ex
  end
end
