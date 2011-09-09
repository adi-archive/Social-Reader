class Section
  include Mongoid::Document

  field :name, :type => String
  field :position, :type => Integer
  field :form, :type => String
  field :raw_text, :type => String
  field :summary, :type => String
  field :permalink, :type => String

  embeds_many :lines, :dependent => :destroy
  has_many :annotations, :dependent => :destroy
  belongs_to :work

  validate :form_fits_enum
  validates_presence_of :name, :position, :raw_text, :form

  attr_accessible :name, :lines, :position, :raw_text, :form

  VERSE = 'verse'
  PROSE = 'prose'

  before_save do
    self.permalink = Permalink.generate_permalink(
        lambda { |permalink|
          Section.find_by_permalink(self.work_id, permalink)
        },
        self.position)
  end

  before_save do
=begin
    if form == VERSE
      lines_text = raw_text.split("\n")
    else #form == PROSE
      lines_text = wrap_text(raw_text).split("\n")
    end
=end
    lines_text = raw_text.split("\n")
    self.lines = []
    line_number = 0
    lines_text.each_index do |i|
      line_number += 1 unless lines_text[i].blank?
      # Split by a specific type of whitespace so that recreation later is
      # easy.
      line_words = lines_text[i].split(" ")
      line = self.lines.build
      line.words = line_words
      line.number = i + 1
      line.display_number = line_number
    end
  end

=begin
  def wrap_text(txt, col = 80)
    txt.gsub(/(.{1,#{col}})( +|$\n?)|(.{1,#{col}})/, "\\1\\3\n")
  end
=end

  def form_fits_enum
    return form == VERSE || form == PROSE
  end

  def to_s
    return name
  end

  def to_param
    permalink
  end

  def self.find_by_permalink(work_id, permalink)
    Section.where({ :permalink =>  permalink, :work_id => work_id }).first
  end

end
