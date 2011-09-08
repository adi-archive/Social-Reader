class TranslatorsController < ApplicationController

  before_filter :get_work

  def get_work
    @translator = Translator.find_by_permalink(params[:id])
  end

  def show
  end

  def index
  end

end
