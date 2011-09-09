class Annotation
  include Mongoid::Document

  field :title, :type => String
  field :content, :type => String
  field :privacy, :type => String

  field :annotated_text, :type => String
  field :start_line, :type => Integer
  field :end_line, :type => Integer
  field :start_word_number, :type => Integer
  field :end_word_number, :type => Integer

  PRIVACY_SETTINGS = [:Public, :Private]

  belongs_to :user
  belongs_to :section

  attr_accessible :content, :annotated_text, :start_line, :end_line,
      :start_word_number, :end_word_number

end
