class Line
  include Mongoid::Document

  field :words, :type => Array
  field :number, :type => Integer
  field :display_number, :type => Integer

  embedded_in :section

  attr_accessible :words

  def to_s
    words.join(' ')
  end

end
