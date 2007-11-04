class TestRegexp
  def test
    p "okay" if "hallo" =~ /ll/
    pos = "hallo" =~ /ll/
    p pos

    "hallo" =~ /(ll)/
    p $1
    p $2
    p $3

    "hallo" =~ /a(ll)(o)/
    p $1
    p $2
    p $3
    p $4
  end

  def self.main
    new.test
  end
end
