require 'wit'

class WitExtension

  def initialize(sender_id, session_id)
    actions = {
      send: -> (request, response) {        
        if response['quickreplies']
          if response['quickreplies'][0] == 'get_location'
            Messenger::Client.send(
              Messenger::Request.new(get_location,sender_id)
            ) 
          end
        else
          Messenger::Client.send(
            Messenger::Request.new(
              Messenger::Elements::Text.new(text: response['text']),
              sender_id
            )
          ) 
        end

      },
      setViolence: -> (request) {
        context = request["context"]
        entities = request["entities"]
        session = Session.find(session_id)

        violence = first_entity_value(entities, "violence") || context["violence"]
        
        if violence
          context['violence'] = violence
          session.update(context: {violence: violence}, violence_type: violence)
        else
          context['missingViolence'] = true
        end

        return context
      },
      setLocation: -> (request){
        context = request["context"]
        entities = request["entities"]
        session = Session.find(session_id)

        coordenates = find_coordenates(entities) || context["location"]

        if coordenates[:latitude] && coordenates[:longitude]
          context['location'] = coordenates
          session.update(context: {location: coordenates}, latitude: coordenates[:latitude], longitude: coordenates[:longitude])
        else
          context['missingLocation'] = true
        end
        
        return context
      },
      setWhen: -> (request){
        context = request["context"]
        entities = request["entities"] 
        session = Session.find(session_id)
       
        whenValue = first_entity_value(entities, "datetime") || context["when"]

        if whenValue
          context['when'] = whenValue
          session.update(context: {when: whenValue}, violence_date: whenValue)
        else
          context['missingWhen'] = true
        end

        return context
      },
      setReason: -> (request){
        context = request["context"]
        entities = request["entities"]
        session = Session.find(session_id)
        
        reason = request["text"] || context["reason"]

        if reason
          context['reason'] = reason
          session.update(context: {reason: reason}, violence_reason: reason)
        else
          context['missingReason'] = true
        end
  
        return context
      }
    }
    @client ||= Wit.new(access_token: ENV['WIT_TOKEN'],actions: actions)
  end

  def client
    return @client
  end

  def first_entity_value(entities, entity)
    return nil unless entities.has_key? entity
    val = entities[entity][0]['value']
    return nil if val.nil?
    return val.is_a?(Hash) ? val['value'] : val
  end

  def get_location
    location_element = Messenger::Templates::QuickReplies.new(
      text: "Por favor, informe no mapa o local aproximado onde a violência aconteceu.",
      quick_replies: [
          Messenger::Elements::QuickReply.new(
            content_type: 'location',
            title: 'Localização',
          )
      ]
    )
    location_element
  end

  def find_coordenates(entities)
    return nil unless entities.has_key? 'number'
    latitude = "#{entities['number'][0]['value']}.#{entities['number'][1]['value']}"
    longitude = "#{entities['number'][2]['value']}.#{entities['number'][3]['value']}"
    {latitude: latitude, longitude: longitude}
  end

end