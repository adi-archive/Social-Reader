class SectionsController < ApplicationController

  #load_and_authorize_resource

  before_filter :get_section

  def get_section
    @work = Work.find_by_permalink(params[:work_id])
    @section = Section.find_by_permalink(@work.id, params[:id])
  end

  def show
    sections = @work.sections.asc(:position).to_a
    index = sections.index(@section)
    @previous_section = sections[index - 1] if index > 0 # since negative indexes wrap
    @next_section = sections[index + 1] # returns nil if not found, so no need to guard
  end

end
