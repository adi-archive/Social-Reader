class Line
  include Mongoid::Document

  field :words, :type => Array

  attr_accessible :words

end
