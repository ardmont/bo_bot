require 'wit'
require 'koala'

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
      setUserProfile: -> (request) {
        context = request["context"]
        entities = request["entities"]
        session = Session.find(session_id)

        user_profile = get_profile(sender_id)

        if user_profile
          context['name'] = user_profile['first_name']
          session.update(context: context)
        end

        return context
      },
      setViolence: -> (request) {
        context = request["context"]
        entities = request["entities"]
        session = Session.find(session_id)

        violence = first_entity_value(entities, "violence")
        
        if violence
          context['violence'] = violence
          context.delete("missingViolence")
        else
          context['missingViolence'] = true
        end

        session.update(context: context, violence_type: violence)

        return context
      },
      setLocation: -> (request){
        context = request["context"]
        entities = request["entities"]
        session = Session.find(session_id)

        coordenates = find_coordenates(entities)

        unless coordenates.nil?
            context['location'] = coordenates
            context.delete("missingLocation")
            session.update(context: context, latitude: coordenates[:latitude], longitude: coordenates[:longitude])
        else
            context['missingLocation'] = true
            session.update(context: context)
        end

        return context
      },
      setWhen: -> (request){
        context = request["context"]
        entities = request["entities"] 
        session = Session.find(session_id)
       
        whenValue = first_entity_value(entities, "datetime")

        if whenValue
          context['when'] = whenValue
          context.delete("missingWhen")
        else
          context['missingWhen'] = true
        end

        session.update(context: context, violence_date: whenValue)

        return context
      },
      setDescription: -> (request){
        context = request["context"]
        entities = request["entities"]
        session = Session.find(session_id)
        
        characteristics = get_characteristics(entities)

        if characteristics
          context['description'] = characteristics
          context.delete("missingDescription")
        else
          context['missingDescription'] = true
        end

        session.update(context: context, violence_description: characteristics)

        return context
      },
      setReason: -> (request){
        context = request["context"]
        entities = request["entities"]
        session = Session.find(session_id)
        
        reason = request["text"]

        if reason
          context['reason'] = reason
          context.delete("missingReason")
          new_context = {}
        else
          context['missingReason'] = true
          new_context = context
        end

        session.update(context: new_context, violence_reason: reason)

        return new_context
      }
    }
    @client ||= Wit.new(access_token: ENV['WIT_TOKEN'],actions: actions)
  end

  def client
    return @client
  end

  private 

    def first_entity_value(entities, entity)
      return nil unless entities
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
      return nil unless entities
      return nil unless entities.has_key? 'number'
      latitude = "#{entities['number'][0]['value']}.#{entities['number'][1]['value']}"
      longitude = "#{entities['number'][2]['value']}.#{entities['number'][3]['value']}"
      {latitude: latitude, longitude: longitude}
    end

    def get_profile(sender_id)
      graph = Koala::Facebook::API.new
      graph.get_object(sender_id)
    end

    def get_characteristics(entities)
      return nil unless entities
      keys = ['veiculo', 'cor_pele', 'arma_branca', 'violence']
      return entities.select{|k, v| keys.include?(k) }
    end

end