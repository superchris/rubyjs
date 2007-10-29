# 
# Evals into the given module_scope.
#
# Copyright (c) 2007 by Michael Neumann (mneumann@ntecs.de).
# All rights reserved.
#

def eval_into(module_scope, &block)
  $RUBYJS__MODULE_SCOPE = module_scope
  $RUBYJS__LOADED ||= [] # avoids recursive loads

  $RUBYJS__EVAL = proc {|str|
    $RUBYJS__MODULE_SCOPE.module_eval(str)
  }

  # install "require" handler
  alias old_require require
  def require(file)
    ($RUBYJS__LOAD_PATH||['.']).each do |path|
      name = File.expand_path(File.join(path, file + ".rb"))
      if File.exists?(name)
        if $RUBYJS__LOADED.include?(name)
          return false
        else
          $RUBYJS__LOADED << name
          STDERR.puts "loading file: #{name}" if $DEBUG
          $RUBYJS__EVAL.call(File.read(name)) 
          
          #
          # load also platform specific file
          # load first matching platform
          #

          ($RUBYJS__PLATFORM||[]).each do |plat|
            plat_name = File.expand_path(File.join(path, file + "." + plat + ".rb"))
            next unless File.exists?(plat_name)
            unless $RUBYJS__LOADED.include?(plat_name)
              $RUBYJS__LOADED << plat_name
              STDERR.puts "loading platform specific file: #{plat_name}" if $DEBUG
              $RUBYJS__EVAL.call(File.read(plat_name))
              break
            end
          end
  
          return true
        end
      else
	next
      end
    end
    raise ::RuntimeError, "require: #{file} not found"
  end


  block.call($RUBYJS__EVAL)

  # change "require" handler back to original
  alias require old_require
end
