class Work
  include Mongoid::Document

  field :title, :type => String
  field :publication_year, :type => String
  field :cover_image_url, :type => String
  field :loc_class, :type => String

  field :course, :type => String
  field :course_index, :type => Integer

  field :wiki_url, :type => String

  field :permalink, :type => String

  has_many :sections, :dependent => :destroy
  has_many :notes, :through => :sections
  has_and_belongs_to_many :authors
  has_and_belongs_to_many :translators

  validate :course_and_course_id
  validates_presence_of :title, :publication_year, :cover_image_url
  validates_uniqueness_of :isbn

  attr_accessible :title, :isbn, :amazon_url, :year, :cover_image_url

  include Permalink

  before_save do
    self.permalink = Permalink.generate_permalink(
        lambda { |permalink| Work.find_by_permalink(permalink) },
        Permalink.to_permalink(self.title))
  end

  def course_and_course_id
    # Either both must be present or neither should
    !!self.course == !!self.course_id
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
