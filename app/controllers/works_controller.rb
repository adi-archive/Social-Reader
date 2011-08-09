class WorksController < ApplicationController

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
  end

  def update
  end

  def destroy
  end

end
