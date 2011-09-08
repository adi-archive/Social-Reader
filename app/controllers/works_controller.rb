require 'json'

class WorksController < ApplicationController

  before_filter :get_work
  load_and_authorize_resource :except => [:jump_sections_html, :download]


  def get_work
    @work = Work.find_by_permalink(params[:id])
  end

  # show specific work
  def show
  end

  # find a work
  def index
  end

  def update
    @work.title = params[:work][:title]
    @work.isbn = params[:work][:isbn]
    @work.amazon_url = params[:work][:amazon_url]
    @work.save!
    flash[:success] = "Work updated successfully!"
    redirect_to work_path(@work)
  end

  def jump_sections_html
    render :partial => "works/jump_sections"
  end

  def download
    render :partial => "works/jump_sections"
  end

end
