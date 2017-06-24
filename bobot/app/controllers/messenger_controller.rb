class MessengerController < Messenger::MessengerController

  def webhook
    if params['object'] == 'page'
      for entry in params['entry'] do
        for messaging_event in entry['messaging'] do
            sender_id = messaging_event['sender']['id']
			      recipient_id = messaging_event['recipient']['id']
            unless messaging_event['message']&.has_key?('is_echo') || !messaging_event['message']&.has_key?('text')
              sender_id = messaging_event['sender']['id']
              recipient_id = messaging_event['recipient']['id']
              message(messaging_event,sender_id)
            end
        end
      end
    else
      
    end
    head :ok 
  end

  def get_violence
    violence = Session.all
    render json: violence
  end

  private

  def message(event, sender_id)
    session = find_or_create_session(sender_id)
    WitExtension.new(sender_id, session.id).client.run_actions(session.id, event["message"]["text"], session.context)   
  end
  
  private

  def find_or_create_session(facebook_id, max_age: 3.minutes)
    session ||= Session.find_by(["facebook_id = ? AND last_exchange >= ?", facebook_id, max_age.ago]) || Session.create(facebook_id: facebook_id, context: {})
    session.update(last_exchange: Time.now)
    session
  end

  
end