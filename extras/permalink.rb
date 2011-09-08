module Permalink

  def self.generate_permalink(find_function, key)
    trailing = nil
    while find_function.call(trailing.nil? ? key : "#{key}-#{trailing}")
      trailing = trailing.nil? ? 1 : (trailing + 1)
    end
    trailing.nil? ? key : "#{key}-#{trailing}"
  end

  def self.to_permalink(str)
    str.gsub(/\s/, '-').downcase
  end

end
