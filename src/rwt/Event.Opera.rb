#--
# Copyright (c) 2007 by Michael Neumann (mneumann@ntecs.de)
#
# Copyright 2007 Google Inc.
#
# Licensed under the Apache License, Version 2.0 (the "License"); you may not
# use this file except in compliance with the License. You may obtain a copy of
# the License at
#
# http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
# WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
# License for the specific language governing permissions and limitations under
# the License.
#++

#
# Opera specific overrides.
#
class Event

  def self.eventGetButton(evt)
    # Opera and IE disagree on what the button codes for left button should be.
    # Translating to match IE standard.
    `var button = #<evt>.button;
    return (button == 0) ? 1 : button`
  end

  def self.eventGetMouseWheelVelocityY(evt)
    `return #<evt>.detail * 4`
  end

end
