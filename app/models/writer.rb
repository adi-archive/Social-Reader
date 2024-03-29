class Writer
  include Mongoid::Document

  field :first_name, :type => String
  field :last_name, :type => String
  field :blurb, :type => String
  field :years_lived, :type => String
  field :wiki_url, :type => String
  field :permalink, :type => String
  field :writer_image_url, :type => String

  has_and_belongs_to_many :works

  # Don't check both since authors such as "Homer" don't have
  # non-empty first and last names
  validate :has_name, :blurb, :years_lived, :wiki_url

  attr_accessible :first_name, :last_name

  include Permalink

  before_save do
    self.permalink = Permalink.generate_permalink(
        lambda { |permalink| Writer.find_by_permalink(permalink) },
        Permalink.to_permalink(self.to_s))
  end

  def has_name
    errors.add(:base, "Must have first or last name.") if to_s.blank?
  end

  def to_s
    # Strip in case either the first or last name is "".
    return "#{first_name} #{last_name}".strip
  end

  def self.find_by_permalink(permalink)
    Writer.where( { :permalink =>  permalink }).first
  end

  def to_param
    permalink
  end

end
