class CreateSessions < ActiveRecord::Migration[5.0]
  def change
    create_table :sessions do |t|
      t.string :facebook_id
      t.datetime :last_exchange
      t.text :context
      t.string :violence_type
      t.string :violence_date, default: "UTC"
      t.text :violence_description
      t.text :violence_reason
      t.string :latitude
      t.string :longitude
      t.timestamps
    end
  end
end
