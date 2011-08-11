class Author
  include Mongoid::Document

  field :first_name, :type => String
  field :last_name, :type => String
  field :about, :type => String

  has_and_belongs_to_many :works

  # Don't check both since authors such as "Homer" don't have
  # non-empty first and last names
  validate :must_have_name

  def must_have_name
    errors.add(:base, "Must have first or last name.") if to_s.blank?
  end

  def to_s
    # Strip in case either the first or last name is "".
    return "#{first_name} #{last_name}".strip
  end

end
