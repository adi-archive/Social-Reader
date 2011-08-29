module WorksHelper

  def get_byline_names(work)
    authors = work.authors.map { |a|
      link_to(a, author_path(a))
    }
    return "" if authors.nil?
    len = authors.length
    if len < 3
      return authors.join(' and ').html_safe
    else
      first_authors = authors[0..(len - 2)].join(', ')
      last_author = authors.last
      return "#{first_authors}, and #{last_author}".html_safe
    end
  end

  def get_byline(work)
    return "by #{get_byline_names(work)}".html_safe
  end

  def sections_to_dropdown_options(work)
    dropdown_sections = []
    work.sections.each do |s|
      dropdown_sections << {
        :text => s.name,
        :href => work_section_path(work, s)
      }
    end
    dropdown_sections
  end

end
