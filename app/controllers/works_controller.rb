require 'json'

class WorksController < ApplicationController

  load_and_authorize_resource :except => [:jump_sections_html]

  # show specific work
  def show
  end

  # find a work
  def index
  end

  def create
  end

  def edit
  end

  def update
    @work.title = params[:work][:title]
    @work.isbn = params[:work][:isbn]
    @work.amazon_url = params[:work][:amazon_url]
    @work.save!
    flash[:success] = "Work updated successfully!"
    redirect_to work_path(@work)
  end

  def destroy
  end

  def jump_sections_html
    @work = Work.find(params[:id])
    render :partial => "works/jump_sections"
  end

end
