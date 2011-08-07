require 'spec_helper'

describe WorksController do

  describe "GET 'home'" do
    it "should be successful" do
      get 'home'
      response.should be_success
    end
  end

  describe "GET 'section'" do
    it "should be successful" do
      get 'section'
      response.should be_success
    end
  end

end
