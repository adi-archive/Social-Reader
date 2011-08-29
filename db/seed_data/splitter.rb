ARGV.each do |foldername|
  text = File.open(foldername + '/full_text.txt').read.to_s
  sections = text.split('----------------------------------------------------------------------')
  sections = sections[1..(sections.length - 2)]
  sections.map! { |text|
    text.gsub(/\n\nBOOK .{1,5}\n\n/, '').gsub(/\n\nTHE END\n\n/, '').strip
  }
  sections.map! { |text|
    text.gsub(/\n(\S)/, ' \1').gsub(/\n\n/, "\n")
  }

  sections.each_index do |i|
    File.open(foldername + '/' + (i + 1).to_s + '.txt', "w") do |f|
      f.write("{
                \"name\": \"Section #{(i + 1)}\",
                \"form\": \"verse\",
                \"raw_text\": #{sections[i].dump}
              }")
    end
  end
end
