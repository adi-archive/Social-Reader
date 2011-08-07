class Section
  include Mongoid::Document

  field :name, :type => String

  has_many :lines
  belongs_to :work

  attr_accessible :name, :lines

end
