class Work
  include Mongoid::Document

  field :title, :type => String
  field :isbn, :type => String
  field :amazon_url, :type => String
  field :year
  field :cover_image_url, :type => String

  has_many :sections, :dependent => :destroy
  has_many :notes, :through => :sections
  has_and_belongs_to_many :authors

  validates_presence_of :title

  attr_accessible :title, :isbn, :amazon_url, :year, :cover_image_url

  def to_s
    title
  end

end
