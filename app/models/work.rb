class Work
  include Mongoid::Document

  field :title, :type => String
  field :isbn, :type => String
  field :amazon_url, :type => String
  field :authors, :type => Array

  has_many :sections
  has_many :notes, :through => :sections

  validates_length_of :authors, :minimum => 1
  validates_presence_of :title

  def get_byline_names
    return "" if authors.nil?
    len = authors.length
    if len == 0
      return ""
    elsif len == 1
      return authors.join(' and ')
    else
      first_authors = authors[0..(len - 2)].join(', ')
      last_author = self.authors.join(',')
      return "#{first_authors}, and #{last_author}"
    end
  end

  def get_byline
    return "by #{get_byline_names}"
  end

end
