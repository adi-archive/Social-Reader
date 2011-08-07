class WorksController < ApplicationController

  def home
    @work = Work.find(params[:id])
  end

  def section
  end

  def all
  end

end
