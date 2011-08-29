class Profile
  include Mongoid::Document

  field :points, :type => Integer

  belongs_to :user

end
