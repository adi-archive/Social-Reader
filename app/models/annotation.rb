class Annotation
  include Mongoid::Document

  field :content, :type => String
  field :annotated_text, :type => String
  field :start_line, :type => Integer
  field :end_line, :type => Integer
  field :start_word_number, :type => Integer
  field :end_word_number, :type => Integer

  belongs_to :user
  belongs_to :section

  attr_accessible :content, :annotated_text, :start_line, :end_line,
      :start_word_number, :end_word_number

end
