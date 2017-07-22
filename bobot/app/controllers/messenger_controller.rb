class MessengerController < Messenger::MessengerController

  def webhook
    if params['object'] == 'page'
      for entry in params['entry'] do
        for messaging_event in entry['messaging'] do
            sender_id = messaging_event['sender']['id']
            unless messaging_event['message']&.has_key?('is_echo') 
              sender_id = messaging_event['sender']['id']
              send_message(messaging_event)
            end
        end
      end      
    end
    head :ok 
  end

  def get_violence
    sessions = Session.all
    render json: sessions
  end

  def get_violence_by_type
    sessions = Session.find_by_violence_type(params[:violence_type])
    render json: sessions
  end

  private

  def send_message(messaging_event)
    sender_id = messaging_event['sender']['id']
    session = find_or_create_session(sender_id)
    if messaging_event['message']&.has_key?('text')
      WitExtension.new(sender_id, session.id).client.run_actions(session.id, messaging_event["message"]["text"], session.context)          
    elsif messaging_event['message']&.has_key?('attachments')
      if messaging_event['message']['attachments'][0]['type'] == 'location'
        lat = messaging_event['message']['attachments'][0]['payload']['coordinates']['lat']
        long = messaging_event['message']['attachments'][0]['payload']['coordinates']['long']
        WitExtension.new(sender_id, session.id).client.run_actions(session.id, "latitude: #{lat} longitude: #{long}", session.context)          
      end
    end
  end
  
  def find_or_create_session(facebook_id, max_age: 3.minutes)
    session ||= Session.find_by(["facebook_id = ? AND last_exchange >= ?", facebook_id, max_age.ago]) || Session.create(facebook_id: facebook_id, context: {})
    session.update(last_exchange: Time.now)
    session
  end

end