class SectionsController < ApplicationController
  load_and_authorize_resource

  def show
    @work = Work.find(params[:work_id])
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
