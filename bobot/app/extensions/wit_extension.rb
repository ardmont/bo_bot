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
      setViolencia: -> (request) {
        context = request["context"]
        entities = request["entities"]

        session = Session.find(session_id)
        violencia = first_entity_value(entities, "violencia") || context["violencia"]
        session.update(context: {violencia: violencia}, violence_type: violencia)
        return context
      },
      setOnde: -> (request){
        context = request["context"]
        entities = request["entities"]
        session = Session.find(session_id)
        onde = first_entity_value(entities, "location") || context["onde"]
        session.update(context: {onde: onde}, latitude: '-7.1668063', longitude: '-34.8348208')
        return context
      },
      setQuando: -> (request){
        context = request["context"]
        entities = request["entities"]
        
        session = Session.find(session_id)
        quando = first_entity_value(entities, "datetime") || context["quando"]
        session.update(context: {quando: quando}, violence_date: quando)
        return context
      },
      setCausa: -> (request){
        puts "***********************************************************************************"
        puts request
        context = request["context"]
        entities = request["entities"]
        
        session = Session.find(session_id)
        causa = request["text"]
        session.update(context: {causa: causa}, violence_reason: causa)
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
      text: "Em qual rua, avenida ou ponto de referência isso aconteceu?",
      quick_replies: [
          Messenger::Elements::QuickReply.new(
            content_type: 'location',
            title: 'Localização',
          )
      ]
    )
    location_element
  end

end