class SectionsController < ApplicationController
  load_and_authorize_resource

  def show
    @work = Work.find(params[:work_id])
    sections = @work.sections.asc(:position).to_a
    index = sections.index(@section)
    @previous_section = sections[index - 1] if index > 0 # since negative indexes wrap
    @next_section = sections[index + 1] # returns nil if not found, so no need to guard
  end

  def index
  end

  def create
  end

  def edit
  end

  def update
  end

  def destroy
  end

end
