# encoding: utf-8

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ :name => 'Chicago' }, { :name => 'Copenhagen' }])
#   Mayor.create(:name => 'Daley', :city => cities.first)

# TODO - open directory, explore all works, which should have the following
# structure: main.txt (key value pairs), and 1...n.txt, which has section name
# as first line and then the text

ROOT = 'db/seed_data/'
AUTHORS_PATH = ROOT + 'authors/'
WORKS_PATH = ROOT + 'works/'

require 'json'

Dir.foreach(AUTHORS_PATH) do |author_filename|
  if author_filename.end_with? '.txt'
    File.open(AUTHORS_PATH + author_filename) do |file|
      author_json = JSON.parse(file.read)
      Author.create!(
        :first_name => author_json['first_name'],
        :last_name => author_json['last_name']
      )
    end
  end
end

Dir.foreach(WORKS_PATH) do |work_folder|
  # avoid . and ..
  if work_folder.length > 2
    work_path = WORKS_PATH + work_folder
    File.open(work_path + '/main.txt') do |file|
      work_json = JSON.parse(file.read)
      work = Work.new(
        :title => work_json['title'],
        :isbn => work_json['isbn'],
        :amazon_url => work_json['amazon_url'],
        :form => work_json['form'],
        :cover_image_url => '/images/works/' + work_folder + '.jpg'
      )

      authors = []
      work_json['authors'].each do |author|
        authors << Author.where(:first_name => author[0],
            :last_name => author[1]).first
      end
      work.authors = authors
      i = 1
      while File.exists?("#{work_path}/#{i}.txt")
        section = work.sections.build
        section.position = i
        if File.exists?("#{work_path}/#{i}.txt")
          File.open("#{work_path}/#{i}.txt") do |file|
            section_json = JSON.parse(file.read)
            section.name = section_json['name']
            section.form = section_json['form']
            section.raw_text = section_json['raw_text']
          end
        end
        section.save!
        i += 1
      end
      work.save!

    end
  end
end
