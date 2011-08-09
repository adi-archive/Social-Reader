class WorksController < ApplicationController

  load_and_authorize_resource

  # show specific work
  def show 
    @work = Work.find(params[:id])
  end

  # find a work
  def index
  end

  def create
  end

  def edit
    # @work = Work.find(params[:id])
  end

  def update
  end

  def destroy
  end

end
