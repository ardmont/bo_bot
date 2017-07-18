Messenger.configure do |config|
  config.verify_token      = 'bobot' 
  config.page_access_token = ENV['FACEBOOK_PAGE_TOKEN']
end