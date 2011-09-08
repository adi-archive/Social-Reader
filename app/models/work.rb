class Work
  include Mongoid::Document

  field :title, :type => String
  field :isbn, :type => String
  field :amazon_url, :type => String
  field :year
  field :cover_image_url, :type => String
  field :permalink, :type => String

  has_many :sections, :dependent => :destroy
  has_many :notes, :through => :sections
  has_and_belongs_to_many :authors
  has_and_belongs_to_many :translators

  validates_presence_of :title
  validates_uniqueness_of :isbn

  attr_accessible :title, :isbn, :amazon_url, :year, :cover_image_url

  include Permalink

  before_save do
    self.permalink = Permalink.generate_permalink(
        lambda { |permalink| Work.find_by_permalink(permalink) },
        Permalink.to_permalink(self.title))
  end

  def to_s
    title
  end

  def to_param
    permalink
  end

  def self.find_by_permalink(permalink)
    Work.where( { :permalink =>  permalink }).first
  end

end
